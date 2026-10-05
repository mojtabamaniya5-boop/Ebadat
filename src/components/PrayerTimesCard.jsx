import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Settings, AlertCircle } from 'lucide-react'
import { getSavedCity, calculatePrayerTimes, getNextPrayer, formatTime, getCountdown } from '../utils/prayerTimes'

export default function PrayerTimesCard() {
  const [city, setCity] = useState(getSavedCity())
  const [next, setNext] = useState(null)
  const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0 })
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      const update = () => {
        const c = getSavedCity()
        setCity(c)
        const times = calculatePrayerTimes(c)
        if (!times) { setError(true); return }
        const n = getNextPrayer(times)
        if (!n) { setError(true); return }
        setNext(n)
        setCountdown(getCountdown(n.time))
      }
      update()
      const interval = setInterval(update, 1000)
      return () => clearInterval(interval)
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  // حالت خطا
  if (error || !next) {
    return (
      <Link
        to="/prayer-settings"
        className="block rounded-2xl p-5 mb-6 bg-gradient-to-bl from-amber-500 to-amber-600 text-white shadow-glow-sm active:scale-[0.98] transition"
      >
        <div className="flex items-center gap-3">
          <AlertCircle size={24} />
          <div className="flex-1">
            <p className="font-bold text-sm">شهرت رو انتخاب کن</p>
            <p className="text-xs text-white/80 mt-0.5">برای دیدن اوقات شرعی</p>
          </div>
          <Settings size={20} className="text-white/80" />
        </div>
      </Link>
    )
  }

  return (
    <div className="mb-6 relative overflow-hidden rounded-3xl bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-800 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface border border-slate-700/50 shadow-soft-lg">
      {/* هاله‌های نوری */}
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-brand-500/25 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl" />

      <div className="relative z-10 p-5">
        {/* ردیف بالا: شهر + دکمه تنظیمات */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            <MapPin size={13} className="text-brand-400" />
            <span className="text-xs font-medium text-white/90">{city.name}</span>
          </div>

          <Link
            to="/prayer-settings"
            className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 text-white/90 text-xs font-medium active:bg-white/20 transition"
          >
            <Settings size={13} />
            تنظیمات
          </Link>
        </div>

        {/* نمایش نماز بعدی */}
        <div className="text-center mb-5">
          <p className="text-xs text-white/50 mb-2">نماز بعدی</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl">{next.icon}</span>
            <div className="text-right">
              <p className="text-lg font-bold text-white">{next.name}</p>
              <p className="text-3xl font-bold text-brand-400 leading-none mt-1">{formatTime(next.time)}</p>
            </div>
          </div>
        </div>

        {/* شمارش معکوس */}
        <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <Clock size={14} />
            <span>باقی‌مانده</span>
          </div>
          <div className="flex items-center gap-1 text-white font-mono font-bold text-lg">
            <span className="bg-white/10 rounded-lg px-2 py-1 min-w-[38px] text-center">{pad(countdown.h)}</span>
            <span className="text-white/40">:</span>
            <span className="bg-white/10 rounded-lg px-2 py-1 min-w-[38px] text-center">{pad(countdown.m)}</span>
            <span className="text-white/40">:</span>
            <span className="bg-brand-500/20 rounded-lg px-2 py-1 min-w-[38px] text-center text-brand-400">{pad(countdown.s)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
