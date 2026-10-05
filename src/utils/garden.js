// محاسبه امتیاز امروز
export const calculateTodayScore = (data) => {
  if (!data) return 0
  const prayers = data.prayers || {}
  const validPrayers = Object.values(prayers).filter(v => v && v !== 'qaza').length
  const score = 
    validPrayers * 10 +           // هر نماز ۱۰ امتیاز
    (data.quran || 0) * 5 +       // هر صفحه ۵ امتیاز
    Math.floor((data.salawat || 0) / 10) * 2 +  // هر ۱۰ صلوات ۲ امتیاز
    (data.challengeDone ? 10 : 0) // چالش ۱۰ امتیاز
  return score
}

// تعیین مرحله باغ
export const getGardenStage = (score) => {
  if (score === 0) return { stage: 'empty', title: 'خاک تشنه', emoji: '🏜️', color: '#92400E' }
  if (score <= 15) return { stage: 'seed', title: 'بذر کاشته شد', emoji: '🌰', color: '#78716C' }
  if (score <= 30) return { stage: 'sprout', title: 'جوانه زد', emoji: '🌱', color: '#65A30D' }
  if (score <= 50) return { stage: 'plant', title: 'گیاه کوچک', emoji: '🌿', color: '#16A34A' }
  if (score <= 70) return { stage: 'tree', title: 'درخت سبز', emoji: '🌳', color: '#15803D' }
  if (score <= 90) return { stage: 'blooming', title: 'درخت شکوفه‌دار', emoji: '🌸', color: '#DB2777' }
  return { stage: 'paradise', title: 'باغ بهشتی', emoji: '🌈', color: '#7C3AED' }
}

// پیشرفت تا مرحله بعدی
export const getProgress = (score) => {
  const stages = [0, 15, 30, 50, 70, 90, 120]
  for (let i = 0; i < stages.length - 1; i++) {
    if (score <= stages[i + 1]) {
      const current = stages[i]
      const next = stages[i + 1]
      const progress = ((score - current) / (next - current)) * 100
      return { current, next, progress: Math.max(0, Math.min(100, progress)) }
    }
  }
  return { current: 120, next: 120, progress: 100 }
}

// آمار کل باغ (چند روز پشت هم فعال بوده)
export const getGardenHealth = () => {
  const logs = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('ebadat-log-')) {
        try {
          logs.push({ key, ...JSON.parse(localStorage.getItem(key)) })
        } catch {}
      }
    }
  } catch {}

  // شمارش روزهای پشت هم با امتیاز بالا
  const today = new Date()
  let healthyDays = 0
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = `ebadat-log-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const log = logs.find(l => l.key === key)
    if (log) {
      const score = calculateTodayScore(log)
      if (score > 20) healthyDays++
      else break
    } else if (i > 0) {
      break
    }
  }
  return healthyDays
}
