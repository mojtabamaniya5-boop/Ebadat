import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Award, TrendingUp, Lock, CheckCircle2 } from 'lucide-react'
import { calculateTotalXP, getStats, getStreak, getTitle, getNextTitleProgress, getMedals } from '../utils/achievements'

export default function Achievements() {
  const navigate = useNavigate()
  const [xp, setXp] = useState(0)
  const [title, setTitle] = useState(null)
  const [progress, setProgress] = useState(null)
  const [medals, setMedals] = useState([])
  const [stats, setStats] = useState(null)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const x = calculateTotalXP()
    setXp(x)
    setTitle(getTitle(x))
    setProgress(getNextTitleProgress(x))
    setMedals(getMedals())
    setStats(getStats())
    setStreak(getStreak())
  }, [])

  if (!title || !stats) return <div className="p-8 text-center text-sub">در حال بارگذاری...</div>

  const unlocked = medals.filter(m => m.unlocked).length

  return (
    <main className="p-4 max-w-md mx-auto pb-24 animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      {/* هدر */}
      <div className="flex items-center gap-3 mt-4 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white dark:bg-dark-surface shadow-soft flex items-center justify-center border border-light-border dark:border-dark-border active:scale-95 transition">
          <ChevronLeft className="text-main" size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-brand-600 dark:text-brand-400">دستاوردها</h1>
          <p className="text-xs text-sub mt-0.5">مسیر رشد تو</p>
        </div>
      </div>

      {/* کارت لقب */}
      <div className={`relative overflow-hidden rounded-3xl p-6 mb-5 bg-gradient-to-bl ${title.color} shadow-glow-lg text-white`}>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-white/70 mb-1">لقب فعلی تو</p>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <span>{title.emoji}</span>
                {title.name}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
              {title.emoji}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/80">XP کل</span>
              <span className="font-bold text-lg">{xp.toLocaleString('fa-IR')}</span>
            </div>
            {progress && progress.remaining > 0 && (
              <>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${progress.progress}%` }} />
                </div>
                <p className="text-[10px] text-white/70 text-center">{progress.remaining} XP تا لقب بعدی</p>
              </>
            )}
            {progress && progress.remaining === 0 && (
              <p className="text-xs text-center text-white font-bold">🌟 بالاترین لقب را داری!</p>
            )}
          </div>
        </div>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="card p-4 text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-xl">🔥</div>
          <p className="text-2xl font-bold text-main">{streak}</p>
          <p className="text-xs text-sub mt-1">روز پیوسته</p>
        </div>
        <div className="card p-4 text-center">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <Award className="text-amber-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-main">{unlocked}/{medals.length}</p>
          <p className="text-xs text-sub mt-1">مدال‌ها</p>
        </div>
      </div>

      {/* مدال‌ها */}
      <div className="mb-3 px-1 flex items-center justify-between">
        <h3 className="text-sm font-bold text-main flex items-center gap-2">
          <Award size={16} className="text-brand-500" />
          مدال‌ها
        </h3>
        <span className="text-xs text-sub">{unlocked} از {medals.length}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {medals.map((medal) => (
          <div
            key={medal.id}
            className={`relative overflow-hidden rounded-2xl p-4 border transition-all ${
              medal.unlocked
                ? `bg-gradient-to-bl ${medal.color} text-white border-transparent shadow-glow-sm`
                : 'bg-white dark:bg-dark-surface border-light-border dark:border-dark-border opacity-60'
            }`}
          >
            {/* آیکون قفل برای مدال‌های قفل */}
            {!medal.unlocked && (
              <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                <Lock size={12} className="text-gray-500 dark:text-gray-400" />
              </div>
            )}
            {medal.unlocked && (
              <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                <CheckCircle2 size={14} className="text-white" />
              </div>
            )}

            <div className="text-center">
              <div className={`text-3xl mb-2 ${medal.unlocked ? '' : 'grayscale'}`}>{medal.emoji}</div>
              <p className={`font-bold text-xs mb-1 ${medal.unlocked ? 'text-white' : 'text-main'}`}>
                {medal.name}
              </p>
              <p className={`text-[10px] leading-relaxed ${medal.unlocked ? 'text-white/80' : 'text-sub'}`}>
                {medal.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* راهنمای XP */}
      <div className="card p-4 mt-5">
        <h4 className="text-xs font-bold text-main mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-brand-500" />
          چطور XP بگیریم؟
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-sub">🕌 نماز اول وقت</span>
            <span className="font-bold text-brand-500">+۱۰ XP</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sub">🕌 نماز میان/آخر وقت</span>
            <span className="font-bold text-brand-500">+۷ XP</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sub">📖 هر صفحه قرآن</span>
            <span className="font-bold text-brand-500">+۵ XP</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sub">💚 هر ۱۰ صلوات</span>
            <span className="font-bold text-brand-500">+۲ XP</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sub">🤝 چالش روزانه</span>
            <span className="font-bold text-brand-500">+۱۰ XP</span>
          </div>
        </div>
      </div>
    </main>
  )
}
