import { useState, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { TrendingUp, Award, BookOpen, Heart } from 'lucide-react'
import { getLast7Days } from '../utils/storage'

const COLORS = {
  ontime: '#10b981',
  mid: '#eab308',
  late: '#f97316',
  qaza: '#ef4444',
  empty: '#e5e7eb',
}

export default function Analytics() {
  const [days, setDays] = useState([])

  useEffect(() => {
    setDays(getLast7Days())
  }, [])

  if (days.length === 0) return <div className="p-8 text-center">در حال بارگذاری...</div>

  // آمار کل هفته
  const totalScore = days.reduce((s, d) => s + d.score, 0)
  const bestDay = days.reduce((best, d) => d.score > best.score ? d : best, days[0])
  const totalQuran = days.reduce((s, d) => s + d.quran, 0)
  const totalSalawat = days.reduce((s, d) => s + d.salawat, 0)

  // داده‌های نمودار دایره‌ای (کیفیت نمازها در ۷ روز)
  let ontime = 0, mid = 0, late = 0, qaza = 0
  days.forEach(d => {
    Object.values(d.raw.prayers).forEach(v => {
      if (v === 'ontime') ontime++
      else if (v === 'mid') mid++
      else if (v === 'late') late++
      else if (v === 'qaza') qaza++
    })
  })

  const pieData = [
    { name: 'اول وقت', value: ontime, color: COLORS.ontime },
    { name: 'میان وقت', value: mid, color: COLORS.mid },
    { name: 'آخر وقت', value: late, color: COLORS.late },
    { name: 'قضا', value: qaza, color: COLORS.qaza },
  ].filter(d => d.value > 0)

  const pieEmpty = pieData.length === 0

  return (
    <main className="p-4 max-w-md mx-auto pb-24">
      <h1 className="text-2xl font-bold text-emerald-800 text-center mt-6 mb-8">کارنامه و تحلیل</h1>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gradient-to-l from-emerald-500 to-emerald-700 rounded-2xl p-4 text-white shadow-lg">
          <TrendingUp size={20} className="mb-2" />
          <p className="text-2xl font-bold">{totalScore}</p>
          <p className="text-xs opacity-90 mt-1">امتیاز هفته</p>
        </div>
        <div className="bg-gradient-to-l from-amber-500 to-amber-700 rounded-2xl p-4 text-white shadow-lg">
          <Award size={20} className="mb-2" />
          <p className="text-2xl font-bold">{bestDay.score}</p>
          <p className="text-xs opacity-90 mt-1">بهترین روز ({bestDay.date})</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <BookOpen size={18} className="text-amber-500 mb-2" />
          <p className="text-2xl font-bold text-gray-800">{totalQuran}</p>
          <p className="text-xs text-gray-500 mt-1">صفحه قرآن</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <Heart size={18} className="text-rose-500 mb-2" />
          <p className="text-2xl font-bold text-gray-800">{totalSalawat}</p>
          <p className="text-xs text-gray-500 mt-1">صلوات</p>
        </div>
      </div>

      {/* نمودار خطی ۷ روز اخیر */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-bold text-gray-800 mb-4">عملکرد ۷ روز اخیر</h3>
        <div style={{ width: '100%', height: 220 }} dir="ltr">
          <ResponsiveContainer>
            <LineChart data={days} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fontFamily: 'Vazirmatn' }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ fontFamily: 'Vazirmatn', direction: 'rtl', borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(v) => [`${v} امتیاز`, 'امتیاز']}
                labelFormatter={(l) => `تاریخ: ${l}`}
              />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* نمودار دایره‌ای کیفیت نماز */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-bold text-gray-800 mb-4">کیفیت نمازهای هفته</h3>
        {pieEmpty ? (
          <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
            هنوز نمازی ثبت نشده
          </div>
        ) : (
          <div style={{ width: '100%', height: 240 }} dir="ltr">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontFamily: 'Vazirmatn', direction: 'rtl', borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(v, n) => [`${v} نماز`, n]}
                />
                <Legend
                  wrapperStyle={{ fontFamily: 'Vazirmatn', fontSize: 12, direction: 'rtl' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* جدول روزها */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">جزئیات روزها</h3>
        <div className="space-y-2">
          {[...days].reverse().map((d, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
              <span className="text-sm text-gray-600 font-medium">{d.date}</span>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-emerald-600">{d.prayers} نماز</span>
                <span className="text-amber-600">{d.quran} قرآن</span>
                <span className="text-rose-600">{d.salawat} صلوات</span>
                <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded-lg">{d.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
