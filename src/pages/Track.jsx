import { useState, useEffect } from 'react'
import { CheckCircle2, BookOpen, Heart, Check } from 'lucide-react'
import { getTodayData, saveTodayData } from '../utils/storage'
import EmptyState from '../components/EmptyState'

export default function Track() {
  const [data, setData] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setData(getTodayData())
  }, [])

  useEffect(() => {
    if (data === null) return
    saveTodayData(data)
    setSaved(true)
    const t = setTimeout(() => setSaved(false), 1500)
    return () => clearTimeout(t)
  }, [data])

  if (data === null) return <div className="p-8 text-center text-sub">در حال بارگذاری...</div>

  const names = { fajr: 'نماز صبح', dhuhr: 'نماز ظهر', asr: 'نماز عصر', maghrib: 'نماز مغرب', isha: 'نماز عشا' }
  const options = [
    { label: 'اول وقت', value: 'ontime', color: 'bg-brand-500 shadow-glow-sm' },
    { label: 'میان وقت', value: 'mid', color: 'bg-amber-400 shadow-md' },
    { label: 'آخر وقت', value: 'late', color: 'bg-orange-500 shadow-md' },
    { label: 'قضا', value: 'qaza', color: 'bg-red-500 shadow-md' },
  ]

  const updatePrayer = (key, value) => {
    setData(prev => ({
      ...prev,
      prayers: { ...prev.prayers, [key]: prev.prayers[key] === value ? '' : value }
    }))
  }

  const updateQuran = (delta) => setData(prev => ({ ...prev, quran: Math.max(0, prev.quran + delta) }))
  const updateSalawat = (delta) => setData(prev => ({ ...prev, salawat: Math.max(0, prev.salawat + delta) }))

  const totalPrayers = Object.values(data.prayers).filter(v => v && v !== 'qaza').length

  return (
    <main className="p-4 max-w-md mx-auto pb-28 animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        saved ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-brand-500 text-white px-4 py-2 rounded-full shadow-glow flex items-center gap-2 text-sm">
          <Check size={16} />
          ذخیره شد
        </div>
      </div>

      <h1 className="text-2xl font-bold text-brand-600 dark:text-brand-400 text-center mt-6 mb-2">ثبت اعمال روزانه</h1>
      <p className="text-center text-sm text-sub mb-8">{totalPrayers} از ۵ نماز ثبت شده ✨</p>

      <div className="card p-5 mb-6">
        <h2 className="font-bold text-main mb-4 flex items-center gap-2 text-sm">
          <CheckCircle2 size={20} className="text-brand-500" />
          نمازهای واجب
        </h2>
        {Object.keys(data.prayers).map((key) => (
          <div key={key} className="bg-light-bg dark:bg-dark-bg p-3 rounded-xl border border-light-border dark:border-dark-border mb-3">
            <p className="font-medium text-main mb-3 text-sm">{names[key]}</p>
            <div className="flex justify-between gap-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updatePrayer(key, opt.value)}
                  className={`flex-1 py-2 text-xs rounded-lg text-white font-medium transition-all ${
                    data.prayers[key] === opt.value
                      ? opt.color + ' scale-105'
                      : 'bg-gray-300 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card p-5 mb-6">
        <h2 className="font-bold text-main mb-4 flex items-center gap-2 text-sm">
          <BookOpen size={20} className="text-amber-500" />
          تلاوت قرآن
        </h2>
        <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/40">
          <span className="text-sm font-medium text-amber-700 dark:text-amber-400">صفحات:</span>
          <div className="flex items-center gap-4">
            <button onClick={() => updateQuran(-1)} className="w-9 h-9 bg-white dark:bg-dark-surface rounded-full shadow text-amber-600 font-bold active:scale-95 transition">−</button>
            <span className="text-lg font-bold text-amber-800 dark:text-amber-300 w-8 text-center">{data.quran}</span>
            <button onClick={() => updateQuran(1)} className="w-9 h-9 bg-white dark:bg-dark-surface rounded-full shadow text-amber-600 font-bold active:scale-95 transition">+</button>
          </div>
        </div>
      </div>

      <div className="card p-5 mb-6">
        <h2 className="font-bold text-main mb-4 flex items-center gap-2 text-sm">
          <Heart size={20} className="text-rose-500" />
          صلوات
        </h2>
        <div className="flex items-center justify-between bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 dark:border-rose-900/40">
          <span className="text-sm font-medium text-rose-700 dark:text-rose-400">تعداد:</span>
          <div className="flex items-center gap-4">
            <button onClick={() => updateSalawat(-10)} className="px-3 h-9 bg-white dark:bg-dark-surface rounded-full shadow text-rose-600 font-bold text-xs active:scale-95 transition">−۱۰</button>
            <span className="text-lg font-bold text-rose-800 dark:text-rose-300 w-10 text-center">{data.salawat}</span>
            <button onClick={() => updateSalawat(10)} className="px-3 h-9 bg-white dark:bg-dark-surface rounded-full shadow text-rose-600 font-bold text-xs active:scale-95 transition">+۱۰</button>
          </div>
        </div>
      </div>
    </main>
  )
}
