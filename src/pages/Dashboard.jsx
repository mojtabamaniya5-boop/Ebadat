import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, CheckCircle2, Sparkles, ChevronLeft } from 'lucide-react'
import { getTodayData, saveTodayData } from '../utils/storage'
import ThemeToggle from '../components/ThemeToggle'

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

  if (data === null) return <div className="p-8 text-center">در حال بارگذاری...</div>

  const totalPrayers = Object.values(data.prayers).filter(v => v && v !== 'qaza').length
  const qazaCount = Object.values(data.prayers).filter(v => v === 'qaza').length

  return (
    <main className="p-4 max-w-md mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">سلام، مجتبی 👋</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">امروز، یک روز جدید</p>
        </div>
        <div className="flex gap-2">
          <Link to="/calendar">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 shadow-md rounded-2xl flex items-center justify-center border border-gray-100 dark:border-slate-700">
              <Calendar className="text-emerald-600 dark:text-emerald-400" size={22} />
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* چالش */}
      <div className="bg-gradient-to-l from-emerald-500 to-teal-700 rounded-2xl p-5 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 text-xs px-3 py-1 rounded-full mb-3 inline-block">چالش امروز</span>
          <h2 className="text-lg font-bold mb-2">به یک نیازمند کمک کن</h2>
          <p className="text-emerald-50 text-sm mb-4">امروز یک کار نیک انجام بده و ۱۰ امتیاز بگیر.</p>
          <button
            onClick={toggleChallenge}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 ${
              data.challengeDone ? 'bg-emerald-900 text-white' : 'bg-white text-emerald-700'
            }`}
          >
            {data.challengeDone ? '✓ انجام شد' : 'انجام دادم'}
          </button>
        </div>
        <Sparkles className="absolute -left-4 -bottom-4 text-emerald-400/20" size={120} />
      </div>

      {/* خلاصه */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm mb-6 border border-gray-100 dark:border-slate-700 transition-colors">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">خلاصه امروز</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl py-3">
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{totalPrayers}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">نماز</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950 rounded-xl py-3">
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{data.quran}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">قرآن</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950 rounded-xl py-3">
            <p className="text-2xl font-bold text-rose-700 dark:text-rose-300">{data.salawat}</p>
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">صلوات</p>
          </div>
        </div>
        {qazaCount > 0 && (
          <p className="text-xs text-red-600 dark:text-red-400 text-center mt-3">⚠️ {qazaCount} نماز قضا داری</p>
        )}
      </div>

      {/* دسترسی سریع */}
      <Link to="/track" className="block bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm mb-6 border border-gray-100 dark:border-slate-700 active:scale-[0.98] transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-500" />
            ثبت سریع اعمال
          </h3>
          <ChevronLeft className="text-gray-400" size={20} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 py-3 rounded-xl font-medium text-sm text-center">ثبت نماز</div>
          <div className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 py-3 rounded-xl font-medium text-sm text-center">تلاوت قرآن</div>
          <div className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 py-3 rounded-xl font-medium text-sm text-center">صلوات و ذکر</div>
          <div className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 py-3 rounded-xl font-medium text-sm text-center">دعا و زیارت</div>
        </div>
      </Link>

      {/* باغ معنوی */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">باغ معنوی شما 🌱</h3>
        <div className="h-32 bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-slate-900 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-800 border-dashed">
          <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            {totalPrayers >= 5 ? '🌟 باغ تو شکوفه داده!' : totalPrayers > 0 ? '🌿 باغت در حال رشد...' : '🌱 باغت منتظر توئه...'}
          </p>
        </div>
      </div>
    </main>
  )
}
