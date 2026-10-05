import { useState } from 'react'
import { CheckCircle2, BookOpen, Heart, Sparkles } from 'lucide-react'

export default function Track() {
  const [prayers, setPrayers] = useState({ fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '' })
  const [quran, setQuran] = useState(0)
  const [salawat, setSalawat] = useState(0)

  const names = { fajr: 'نماز صبح', dhuhr: 'نماز ظهر', asr: 'نماز عصر', maghrib: 'نماز مغرب', isha: 'نماز عشا' }
  const options = [
    { label: 'اول وقت', value: 'ontime', color: 'bg-emerald-500' },
    { label: 'میان وقت', value: 'mid', color: 'bg-yellow-500' },
    { label: 'آخر وقت', value: 'late', color: 'bg-orange-500' },
    { label: 'قضا', value: 'qaza', color: 'bg-red-500' },
  ]

  return (
    <main className="p-4 max-w-md mx-auto pb-24">
      <h1 className="text-2xl font-bold text-emerald-800 text-center mt-6 mb-8">ثبت اعمال روزانه</h1>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-500" />
          نمازهای واجب
        </h2>
        {Object.keys(prayers).map((key) => (
          <div key={key} className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-3">
            <p className="font-medium text-gray-700 mb-3 text-sm">{names[key]}</p>
            <div className="flex justify-between gap-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPrayers({ ...prayers, [key]: opt.value })}
                  className={`flex-1 py-2 text-xs rounded-lg text-white font-medium transition-all ${
                    prayers[key] === opt.value ? opt.color + ' shadow-md scale-105' : 'bg-gray-300'
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
            <button onClick={() => setQuran(Math.max(0, quran - 1))} className="w-8 h-8 bg-white rounded-full shadow text-amber-600 font-bold">-</button>
            <span className="text-lg font-bold text-amber-800 w-6 text-center">{quran}</span>
            <button onClick={() => setQuran(quran + 1)} className="w-8 h-8 bg-white rounded-full shadow text-amber-600 font-bold">+</button>
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
            <button onClick={() => setSalawat(Math.max(0, salawat - 1))} className="w-8 h-8 bg-white rounded-full shadow text-rose-600 font-bold">-</button>
            <span className="text-lg font-bold text-rose-800 w-6 text-center">{salawat}</span>
            <button onClick={() => setSalawat(salawat + 1)} className="w-8 h-8 bg-white rounded-full shadow text-rose-600 font-bold">+</button>
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-l from-emerald-500 to-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2">
        <Sparkles size={20} />
        ثبت نهایی
      </button>
    </main>
  )
}
