import { useState, useEffect } from 'react'
import { CheckCircle2, BookOpen, Heart, Sparkles, Check } from 'lucide-react'
import { getTodayData, saveTodayData } from '../utils/storage'

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

  if (data === null) return <div className="p-8 text-center">در حال بارگذاری...</div>

  const names = { fajr: 'نماز صبح', dhuhr: 'نماز ظهر', asr: 'نماز عصر', maghrib: 'نماز مغرب', isha: 'نماز عشا' }
  const options = [
    { label: 'اول وقت', value: 'ontime', color: 'bg-emerald-500' },
    { label: 'میان وقت', value: 'mid', color: 'bg-yellow-500' },
    { label: 'آخر وقت', value: 'late', color: 'bg-orange-500' },
    { label: 'قضا', value: 'qaza', color: 'bg-red-500' },
  ]

  const updatePrayer = (key, value) => {
    setData(prev => ({
      ...prev,
      prayers: { ...prev.prayers, [key]: prev.prayers[key] === value ? '' : value }
    }))
  }

  const updateQuran = (delta) => {
    setData(prev => ({ ...prev, quran: Math.max(0, prev.quran + delta) }))
  }

  const updateSalawat = (delta) => {
    setData(prev => ({ ...prev, salawat: Math.max(0, prev.salawat + delta) }))
  }

  const totalPrayers = Object.values(data.prayers).filter(v => v && v !== 'qaza').length

  return (
    <main className="p-4 max-w-md mx-auto pb-24">
      {/* نشانگر ذخیره */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        saved ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm">
          <Check size={16} />
          ذخیره شد
        </div>
      </div>

      <h1 className="text-2xl font-bold text-emerald-800 text-center mt-6 mb-2">ثبت اعمال روزانه</h1>
      <p className="text-center text-sm text-gray-500 mb-8">
        {totalPrayers} از ۵ نماز ثبت شده ✨
      </p>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-500" />
          نمازهای واجب
        </h2>
        {Object.keys(data.prayers).map((key) => (
          <div key={key} className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-3">
            <p className="font-medium text-gray-700 mb-3 text-sm">{names[key]}</p>
            <div className="flex justify-between gap-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updatePrayer(key, opt.value)}
                  className={`flex-1 py-2 text-xs rounded-lg text-white font-medium transition-all ${
                    data.prayers[key] === opt.value
                      ? opt.color + ' shadow-md scale-105'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-amber-500" />
          تلاوت قرآن
        </h2>
        <div className="flex items-center justify-between bg-amber-50 p-4 rounded-xl">
          <span className="text-sm font-medium text-amber-700">صفحات:</span>
          <div className="flex items-center gap-4">
            <button onClick={() => updateQuran(-1)} className="w-8 h-8 bg-white rounded-full shadow text-amber-600 font-bold">−</button>
            <span className="text-lg font-bold text-amber-800 w-8 text-center">{data.quran}</span>
            <button onClick={() => updateQuran(1)} className="w-8 h-8 bg-white rounded-full shadow text-amber-600 font-bold">+</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Heart size={20} className="text-rose-500" />
          صلوات
        </h2>
        <div className="flex items-center justify-between bg-rose-50 p-4 rounded-xl">
          <span className="text-sm font-medium text-rose-700">تعداد:</span>
          <div className="flex items-center gap-4">
            <button onClick={() => updateSalawat(-10)} className="px-2 h-8 bg-white rounded-full shadow text-rose-600 font-bold text-xs">−۱۰</button>
            <span className="text-lg font-bold text-rose-800 w-10 text-center">{data.salawat}</span>
            <button onClick={() => updateSalawat(10)} className="px-2 h-8 bg-white rounded-full shadow text-rose-600 font-bold text-xs">+۱۰</button>
          </div>
        </div>
      </div>
    </main>
  )
}
