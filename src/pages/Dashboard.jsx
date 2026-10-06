import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Sparkles, ChevronLeft, CheckCircle2, BookMarked, BarChart2, MessageCircle } from 'lucide-react'
import { getTodayData, saveTodayData } from '../utils/storage'
import ThemeToggle from '../components/ThemeToggle'
import PrayerTimesCard from '../components/PrayerTimesCard'
import SpiritualGarden from '../components/SpiritualGarden'
import HadithCard from '../components/HadithCard'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [userName, setUserName] = useState('کاربر همراه')

  useEffect(() => {
    setData(getTodayData())
    const savedName = localStorage.getItem('ebadat-user-name')
    if (savedName) setUserName(savedName)
  }, [])

  const toggleChallenge = () => {
    const newData = { ...data, challengeDone: !data.challengeDone }
    setData(newData)
    saveTodayData(newData)
  }

  if (data === null) return <div className="p-8 text-center text-sub">در حال بارگذاری...</div>

  const totalPrayers = Object.values(data.prayers).filter(v => v && v !== 'qaza').length
  const qazaCount = Object.values(data.prayers).filter(v => v === 'qaza').length

  const dailyProgress = Math.min(
    (totalPrayers / 5) * 60 +
    Math.min(data.quran / 5, 1) * 20 +
    Math.min(data.salawat / 100, 1) * 20,
    100
  )

  return (
    <main className="p-4 max-w-md mx-auto animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      <div className="flex justify-between items-center mb-6 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-600 dark:text-brand-400">سلام، {userName} 👋</h1>
          <p className="text-sm text-sub mt-1">امروز، یک روز جدید</p>
        </div>
        <div className="flex gap-2">
          <Link to="/calendar">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-dark-surface shadow-soft flex items-center justify-center border border-light-border dark:border-dark-border active:scale-95 transition">
              <Calendar className="text-brand-500" size={22} />
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <PrayerTimesCard />

      {/* ✨ دسترسی سریع به بخش‌های فرعی */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <Link
          to="/calendar"
          className="relative overflow-hidden rounded-2xl p-3 bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-soft active:scale-95 transition group"
        >
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-sky-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-bl from-sky-400 to-blue-600 flex items-center justify-center shadow-glow-sm">
              <Calendar size={18} className="text-white" />
            </div>
            <span className="text-xs font-bold text-main">تقویم</span>
          </div>
        </Link>

        <Link
          to="/hadiths"
          className="relative overflow-hidden rounded-2xl p-3 bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-soft active:scale-95 transition group"
        >
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-bl from-amber-400 to-orange-600 flex items-center justify-center shadow-glow-sm">
              <BookMarked size={18} className="text-white" />
            </div>
            <span className="text-xs font-bold text-main">احادیث</span>
          </div>
        </Link>

        <Link
          to="/analytics"
          className="relative overflow-hidden rounded-2xl p-3 bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-soft active:scale-95 transition group"
        >
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-violet-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          <div className="relative flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-bl from-violet-400 to-purple-600 flex items-center justify-center shadow-glow-sm">
              <BarChart2 size={18} className="text-white" />
            </div>
            <span className="text-xs font-bold text-main">کارنامه</span>
          </div>
        </Link>
      </div>

      {/* چالش */}
      <div className="relative overflow-hidden rounded-2xl p-5 text-white shadow-glow mb-6 bg-gradient-to-bl from-brand-400 via-brand-500 to-brand-700">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <span className="bg-white/20 backdrop-blur-sm text-xs px-3 py-1 rounded-full mb-3 inline-block">✨ چالش امروز</span>
          <h2 className="text-lg font-bold mb-2">به یک نیازمند کمک کن</h2>
          <p className="text-white/85 text-sm mb-4">امروز یک کار نیک انجام بده و ۱۰ امتیاز بگیر.</p>
          <button
            onClick={toggleChallenge}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
              data.challengeDone
                ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                : 'bg-white text-brand-600 shadow-lg'
            }`}
          >
            {data.challengeDone ? '✓ انجام شد' : 'انجام دادم'}
          </button>
        </div>
      </div>

      <Link to="/coach" className="relative overflow-hidden rounded-2xl p-4 mb-6 bg-gradient-to-bl from-violet-500 via-purple-500 to-indigo-600 text-white shadow-glow-sm active:scale-[0.98] transition group">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <MessageCircle size={22} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">رفیق معنوی 🤝</p>
            <p className="text-[11px] text-white/80 mt-0.5">سوالی داری؟ باهاش حرف بزن</p>
          </div>
          <ChevronLeft size={20} className="text-white/60 group-hover:-translate-x-1 transition" />
        </div>
      </Link>

      {/* حدیث امروز */}
      <HadithCard />

      {/* خلاصه امروز */}
      <div className="relative overflow-hidden rounded-3xl p-5 mb-6 bg-gradient-to-bl from-slate-900 via-slate-800 to-slate-900 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface border border-slate-700/50 shadow-soft-lg">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-bl from-brand-400 to-brand-600 flex items-center justify-center shadow-glow-sm">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">خلاصه امروز</h3>
                <p className="text-[10px] text-white/50">پیشرفت معنوی تو</p>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-xs font-bold text-brand-400">{Math.round(dailyProgress)}%</span>
            </div>
          </div>

          <div className="mb-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-brand-400 via-emerald-400 to-teal-400 rounded-full transition-all duration-1000 shadow-glow"
              style={{ width: `${dailyProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <StatCard icon="🕌" value={totalPrayers} total={5} label="نماز" color="from-emerald-500 to-teal-600" progress={(totalPrayers / 5) * 100} />
            <StatCard icon="📖" value={data.quran} total={5} label="قرآن" color="from-amber-500 to-orange-600" progress={Math.min((data.quran / 5) * 100, 100)} />
            <StatCard icon="💚" value={data.salawat} total={100} label="صلوات" color="from-rose-500 to-pink-600" progress={Math.min((data.salawat / 100) * 100, 100)} />
          </div>

          {qazaCount > 0 && (
            <div className="mt-4 flex items-center gap-2 bg-red-500/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-red-500/30">
              <span className="text-sm">⚠️</span>
              <p className="text-xs text-red-300">{qazaCount} نماز قضا داری، جبران کن!</p>
            </div>
          )}
        </div>
      </div>

      {/* باغ معنوی */}
      <SpiritualGarden />

      {/* ثبت سریع اعمال */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-main flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} className="text-brand-500" />
            ثبت سریع اعمال
          </h3>
          <span className="text-[10px] text-sub">با یک لمس</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <QuickButton to="/track" emoji="🕌" label="ثبت نماز" subtitle="۵ نماز واجب" gradient="from-emerald-500 via-teal-500 to-cyan-600" delay={0} />
          <QuickButton to="/track" emoji="📖" label="تلاوت قرآن" subtitle="صفحه به صفحه" gradient="from-amber-500 via-orange-500 to-red-500" delay={0.05} />
          <QuickButton to="/prayers" emoji="📿" label="صلوات و ذکر" subtitle="شمارنده هوشمند" gradient="from-rose-500 via-pink-500 to-fuchsia-500" delay={0.1} />
          <QuickButton to="/prayers" emoji="🤲" label="دعا و زیارت" subtitle="ادعیه کامل" gradient="from-violet-500 via-purple-500 to-indigo-600" delay={0.15} />
        </div>
      </div>
    </main>
  )
}

function StatCard({ icon, value, total, label, color, progress }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-3 bg-white/5 backdrop-blur-sm border border-white/10">
      <div className={`absolute inset-0 bg-gradient-to-bl ${color} opacity-10`} />
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-2xl mb-1">{icon}</span>
        <p className="text-2xl font-bold text-white leading-none">{value}</p>
        <p className="text-[10px] text-white/50 mt-1">از {total} {label}</p>
        <div className="w-full mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-l ${color} rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}

function QuickButton({ to, emoji, label, subtitle, gradient, delay }) {
  return (
    <Link
      to={to}
      className="relative overflow-hidden rounded-2xl p-4 shadow-soft-lg active:scale-95 transition-all duration-300 animate-slide-up group"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-bl ${gradient}`} />
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-black/20 rounded-full blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-60" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center text-2xl shadow-inner border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            {emoji}
          </div>
          <ChevronLeft size={20} className="text-white/60 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
        </div>

        <p className="text-white font-bold text-sm mb-0.5 drop-shadow-sm">{label}</p>
        <p className="text-white/70 text-[10px]">{subtitle}</p>
      </div>

      <div className="absolute inset-0 bg-white/0 group-active:bg-white/20 transition-colors duration-300" />
    </Link>
  )
}
