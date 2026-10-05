import { useState, useEffect } from 'react'
import * as jalaali from 'jalaali-js'
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react'
import { getTodayKey } from '../utils/storage'

const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

export default function Calendar() {
  const today = new Date()
  const todayJ = jalaali.toJalaali(today)

  const [viewYear, setViewYear] = useState(todayJ.jy)
  const [viewMonth, setViewMonth] = useState(todayJ.jm)
  const [selectedDay, setSelectedDay] = useState(todayJ.jd)
  const [selectedData, setSelectedData] = useState(null)

  // محاسبه داده‌های ماه
  const monthLength = jalaali.jalaaliMonthLength(viewYear, viewMonth)
  const firstDayG = jalaali.toGregorian(viewYear, viewMonth, 1)
  const firstDay = new Date(firstDayG.gy, firstDayG.gm - 1, firstDayG.gd)
  // شنبه = 0 (در تقویم ایرانی), جمعه = 6
  // getDay در جاوااسکریپت: یکشنبه=0, شنبه=6
  const startOffset = (firstDay.getDay() + 1) % 7

  useEffect(() => {
    loadDayData(selectedDay)
  }, [selectedDay, viewMonth, viewYear])

  const loadDayData = (day) => {
    const g = jalaali.toGregorian(viewYear, viewMonth, day)
    const key = `ebadat-log-${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const data = JSON.parse(stored)
        const validPrayers = Object.values(data.prayers || {}).filter(v => v && v !== 'qaza').length
        const score = validPrayers * 10 + (data.quran || 0) * 5 + Math.floor((data.salawat || 0) / 10) * 2
        setSelectedData({ ...data, prayersCount: validPrayers, score })
      } else {
        setSelectedData(null)
      }
    } catch {
      setSelectedData(null)
    }
  }

  const prevMonth = () => {
    if (viewMonth === 1) { setViewMonth(12); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
    setSelectedDay(1)
  }

  const nextMonth = () => {
    if (viewMonth === 12) { setViewMonth(1); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
    setSelectedDay(1)
  }

  const isToday = (day) => day === todayJ.jd && viewMonth === todayJ.jm && viewYear === todayJ.jy

  const getDayScore = (day) => {
    const g = jalaali.toGregorian(viewYear, viewMonth, day)
    const key = `ebadat-log-${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const data = JSON.parse(stored)
        const validPrayers = Object.values(data.prayers || {}).filter(v => v && v !== 'qaza').length
        return validPrayers * 10 + (data.quran || 0) * 5 + Math.floor((data.salawat || 0) / 10) * 2
      }
    } catch {}
    return 0
  }

  const getScoreColor = (score) => {
    if (score >= 50) return 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white'
    if (score >= 30) return 'bg-amber-400 text-white'
    if (score >= 10) return 'bg-amber-200 text-amber-900'
    if (score > 0) return 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200'
    return 'bg-gray-50 dark:bg-slate-800 text-gray-400'
  }

  // ساخت آرایه روزها
  const days = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= monthLength; d++) days.push(d)

  return (
    <main className="p-4 max-w-md mx-auto pb-24 animate-fade-in">
      <div className="text-center mt-6 mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-l from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-3">
          <CalIcon className="text-white" size={28} />
        </div>
        <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">تقویم معنوی</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">مسیر رشدت رو ببین</p>
      </div>

      {/* ماه */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 mb-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center active:scale-95 transition">
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-200" />
          </button>
          <div className="text-center">
            <p className="font-bold text-lg text-gray-800 dark:text-gray-100">{monthNames[viewMonth - 1]}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{viewYear}</p>
          </div>
          <button onClick={nextMonth} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center active:scale-95 transition">
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-200" />
          </button>
        </div>

        {/* روزهای هفته */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((d, i) => (
            <div key={i} className="text-center text-xs font-bold text-gray-400 py-2">{d}</div>
          ))}
        </div>

        {/* روزها */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (day === null) return <div key={i} />
            const score = getDayScore(day)
            const isSel = day === selectedDay
            const isT = isToday(day)
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold relative transition-all ${getScoreColor(score)} ${
                  isSel ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-800 scale-105' : ''
                } ${isT ? 'ring-2 ring-rose-400' : ''}`}
              >
                {day}
                {score > 0 && !isSel && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        {/* راهنما */}
        <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-gradient-to-l from-emerald-500 to-teal-600" />عالی</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-400" />خوب</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-gray-200 dark:bg-slate-600" />کم</div>
        </div>
      </div>

      {/* جزئیات روز انتخاب‌شده */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm">
          {selectedDay} {monthNames[viewMonth - 1]} {viewYear}
        </h3>
        {selectedData ? (
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl py-3">
              <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{selectedData.prayersCount}</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">نماز</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950 rounded-xl py-3">
              <p className="text-xl font-bold text-amber-700 dark:text-amber-300">{selectedData.quran || 0}</p>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">صفحه قرآن</p>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950 rounded-xl py-3">
              <p className="text-xl font-bold text-rose-700 dark:text-rose-300">{selectedData.salawat || 0}</p>
              <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-1">صلوات</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
            برای این روز چیزی ثبت نشده
          </p>
        )}
      </div>
    </main>
  )
}
