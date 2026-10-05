import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, CheckCircle2, Sparkles, ChevronLeft } from 'lucide-react'
import { getTodayData, saveTodayData } from '../utils/storage'
import ThemeToggle from '../components/ThemeToggle'
import PrayerTimesCard from '../components/PrayerTimesCard'
import SpiritualGarden from '../components/SpiritualGarden'

export default function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(getTodayData())
  }, [])

  const toggleChallenge = () => {
    const newData = { ...data, challengeDone: !data.challengeDone }
    setData(newData)
    saveTodayData(newData)
  }

  if (data === null) return <div className="p-8 text-center text-sub">در حال بارگذاری...</div>

  const totalPrayers = Object.values(data.prayers).filter(v => v && v !== 'qaza').length
  const qazaCount = Object.values(data.prayers).filter(v => v === 'qaza').length

  return (
    <main className="p-4 max-w-md mx-auto animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      <div className="flex justify-between items-center mb-6 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-600 dark:text-brand-400">سلام، مجتبی 👋</h1>
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

      <PrayerTimesCard />

      {/* خلاصه */}
      <div className="card p-5 mb-6">
        <h3 className="font-bold text-main mb-4 text-sm">خلاصه امروز</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl py-3 border border-brand-100 dark:border-brand-900/40">
            <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{totalPrayers}</p>
            <p className="text-xs text-brand-500 mt-1">نماز</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl py-3 border border-amber-100 dark:border-amber-900/40">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{data.quran}</p>
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">قرآن</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl py-3 border border-rose-100 dark:border-rose-900/40">
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{data.salawat}</p>
            <p className="text-xs text-rose-600 dark:text-rose-500 mt-1">صلوات</p>
          </div>
        </div>
        {qazaCount > 0 && (
          <p className="text-xs text-red-600 dark:text-red-400 text-center mt-3">⚠️ {qazaCount} نماز قضا داری</p>
        )}
      </div>

      {/* دسترسی سریع */}
      <Link to="/track" className="card p-5 mb-6 active:scale-[0.98] transition-all block">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-main flex items-center gap-2 text-sm">
            <CheckCircle2 size={18} className="text-brand-500" />
            ثبت سریع اعمال
          </h3>
          <ChevronLeft className="text-sub" size={20} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 py-3 rounded-xl font-medium text-sm text-center border border-brand-100 dark:border-brand-900/40">ثبت نماز</div>
          <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 py-3 rounded-xl font-medium text-sm text-center border border-amber-100 dark:border-amber-900/40">تلاوت قرآن</div>
          <div className="bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 py-3 rounded-xl font-medium text-sm text-center border border-sky-100 dark:border-sky-900/40">صلوات و ذکر</div>
          <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 py-3 rounded-xl font-medium text-sm text-center border border-purple-100 dark:border-purple-900/40">دعا و زیارت</div>
        </div>
      </Link>


      {/* باغ معنوی جدید */}
      <SpiritualGarden />
    </main>
  )
}
