import { getAllLogs } from './storage'

// محاسبه XP کل
export const calculateTotalXP = () => {
  const logs = getAllLogs()
  let xp = 0
  logs.forEach(log => {
    const prayers = log.prayers || {}
    Object.values(prayers).forEach(v => {
      if (v === 'ontime') xp += 10
      else if (v === 'mid' || v === 'late') xp += 7
      else if (v === 'qaza') xp += 2
    })
    xp += (log.quran || 0) * 5
    xp += Math.floor((log.salawat || 0) / 10) * 2
    if (log.challengeDone) xp += 10
  })
  return xp
}

// محاسبه آمار کلی
export const getStats = () => {
  const logs = getAllLogs()
  let totalPrayers = 0, totalOntime = 0, totalQuran = 0, totalSalawat = 0
  let totalChallenges = 0, activeDays = 0, perfectDays = 0

  logs.forEach(log => {
    const prayers = log.prayers || {}
    const valid = Object.values(prayers).filter(v => v && v !== 'qaza').length
    const ontime = Object.values(prayers).filter(v => v === 'ontime').length
    totalPrayers += valid
    totalOntime += ontime
    totalQuran += log.quran || 0
    totalSalawat += log.salawat || 0
    if (log.challengeDone) totalChallenges++
    if (valid > 0) activeDays++
    if (valid === 5) perfectDays++
  })

  return { totalPrayers, totalOntime, totalQuran, totalSalawat, totalChallenges, activeDays, perfectDays }
}

// محاسبه streak
export const getStreak = () => {
  const logs = getAllLogs()
  const today = new Date()
  let streak = 0
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = `ebadat-log-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const log = logs.find(l => l.key === key)
    if (log) {
      const valid = Object.values(log.prayers || {}).filter(v => v && v !== 'qaza').length
      if (valid > 0 || (log.quran || 0) > 0 || (log.salawat || 0) > 0) {
        streak++
      } else if (i > 0) break
    } else if (i > 0) break
  }
  return streak
}

// لقب‌ها
export const getTitle = (xp) => {
  if (xp >= 10000) return { name: 'واصل', emoji: '🌟', color: 'from-yellow-400 to-amber-600', min: 10000, max: null }
  if (xp >= 5000) return { name: 'سالک', emoji: '✨', color: 'from-purple-400 to-indigo-600', min: 5000, max: 10000 }
  if (xp >= 2500) return { name: 'عارف', emoji: '💎', color: 'from-cyan-400 to-blue-600', min: 2500, max: 5000 }
  if (xp >= 1000) return { name: 'مخلص', emoji: '💚', color: 'from-emerald-400 to-teal-600', min: 1000, max: 2500 }
  if (xp >= 500) return { name: 'کوشا', emoji: '🌿', color: 'from-green-400 to-emerald-600', min: 500, max: 1000 }
  if (xp >= 100) return { name: 'رهرو', emoji: '🌱', color: 'from-lime-400 to-green-600', min: 100, max: 500 }
  return { name: 'تازه‌کار', emoji: '🌰', color: 'from-gray-400 to-gray-600', min: 0, max: 100 }
}

// پیشرفت تا لقب بعدی
export const getNextTitleProgress = (xp) => {
  const titles = [
    { min: 0, max: 100 },
    { min: 100, max: 500 },
    { min: 500, max: 1000 },
    { min: 1000, max: 2500 },
    { min: 2500, max: 5000 },
    { min: 5000, max: 10000 },
    { min: 10000, max: 10000 },
  ]
  for (const t of titles) {
    if (xp < t.max) {
      const progress = ((xp - t.min) / (t.max - t.min)) * 100
      return { current: t.min, next: t.max, progress: Math.max(0, Math.min(100, progress)), remaining: t.max - xp }
    }
  }
  return { current: 10000, next: 10000, progress: 100, remaining: 0 }
}

// لیست مدال‌ها
export const getMedals = () => {
  const stats = getStats()
  const streak = getStreak()
  const xp = calculateTotalXP()

  return [
    { id: 'first_step', name: 'اولین قدم', desc: 'اولین نمازت رو ثبت کردی', emoji: '👶', color: 'from-sky-400 to-blue-500', unlocked: stats.totalPrayers >= 1 },
    { id: 'streak_7', name: 'هفت روز پیوسته', desc: '۷ روز پشت هم عبادت', emoji: '🔥', color: 'from-orange-400 to-red-500', unlocked: streak >= 7 },
    { id: 'streak_30', name: 'یک ماه کامل', desc: '۳۰ روز پیوسته', emoji: '💪', color: 'from-amber-400 to-orange-500', unlocked: streak >= 30 },
    { id: 'streak_100', name: 'صد روز پیوسته', desc: '۱۰۰ روز بدون قطعی', emoji: '🏆', color: 'from-yellow-400 to-amber-600', unlocked: streak >= 100 },
    { id: 'prayers_100', name: 'صد نماز', desc: '۱۰۰ نماز خواندی', emoji: '🕌', color: 'from-emerald-400 to-teal-600', unlocked: stats.totalPrayers >= 100 },
    { id: 'prayers_500', name: 'پانصد نماز', desc: '۵۰۰ نماز خواندی', emoji: '💎', color: 'from-cyan-400 to-blue-600', unlocked: stats.totalPrayers >= 500 },
    { id: 'ontime_100', name: 'اول وقت‌خوان', desc: '۱۰۰ نماز اول وقت', emoji: '⏰', color: 'from-green-400 to-emerald-600', unlocked: stats.totalOntime >= 100 },
    { id: 'quran_100', name: 'انس با قرآن', desc: '۱۰۰ صفحه قرآن', emoji: '📖', color: 'from-amber-400 to-yellow-600', unlocked: stats.totalQuran >= 100 },
    { id: 'quran_1000', name: 'قاری', desc: '۱۰۰۰ صفحه قرآن', emoji: '🌟', color: 'from-yellow-400 to-amber-600', unlocked: stats.totalQuran >= 1000 },
    { id: 'salawat_1000', name: 'صلوات‌گفتار', desc: '۱۰۰۰ صلوات', emoji: '💚', color: 'from-rose-400 to-pink-600', unlocked: stats.totalSalawat >= 1000 },
    { id: 'salawat_10000', name: 'عاشق پیامبر', desc: '۱۰۰۰۰ صلوات', emoji: '🌸', color: 'from-pink-400 to-rose-600', unlocked: stats.totalSalawat >= 10000 },
    { id: 'perfect_day', name: 'روز کامل', desc: 'یک روز، ۵ نماز', emoji: '⭐', color: 'from-yellow-400 to-amber-500', unlocked: stats.perfectDays >= 1 },
    { id: 'perfect_10', name: 'ده روز کامل', desc: '۱۰ روز با ۵ نماز', emoji: '🌈', color: 'from-purple-400 to-pink-500', unlocked: stats.perfectDays >= 10 },
    { id: 'challenge_10', name: 'کارنیک‌کن', desc: '۱۰ چالش انجام دادی', emoji: '🤝', color: 'from-teal-400 to-emerald-600', unlocked: stats.totalChallenges >= 10 },
    { id: 'challenge_50', name: 'نیکوکار', desc: '۵۰ چالش', emoji: '🎗️', color: 'from-indigo-400 to-purple-600', unlocked: stats.totalChallenges >= 50 },
    { id: 'active_30', name: 'فعال', desc: '۳۰ روز فعال', emoji: '🌿', color: 'from-lime-400 to-green-600', unlocked: stats.activeDays >= 30 },
    { id: 'active_100', name: 'پیوسته', desc: '۱۰۰ روز فعال', emoji: '🌳', color: 'from-emerald-400 to-teal-600', unlocked: stats.activeDays >= 100 },
    { id: 'xp_1000', name: 'هزار امتیاز', desc: '۱۰۰۰ XP', emoji: '💫', color: 'from-violet-400 to-purple-600', unlocked: xp >= 1000 },
    { id: 'xp_5000', name: 'پنج هزار امتیاز', desc: '۵۰۰۰ XP', emoji: '👑', color: 'from-yellow-400 to-orange-600', unlocked: xp >= 5000 },
  ]
}
