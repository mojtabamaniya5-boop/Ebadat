import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, ChevronLeft, AlertCircle } from 'lucide-react'
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

  // نمایش خطا در صورت مشکل
  if (error || !next) {
    return (
      <Link
        to="/prayer-settings"
        className="block rounded-2xl p-4 mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 active:scale-[0.98] transition"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="text-amber-500" size={20} />
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300">تنظیم شهر</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">برای دیدن اوقات شرعی، شهرت رو انتخاب کن</p>
          </div>
          <ChevronLeft className="text-amber-500" size={20} />
        </div>
      </Link>
    )
  }

  return (
    <Link
      to="/prayer-settings"
      className="block relative overflow-hidden rounded-2xl p-5 mb-6 bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-800 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface border border-slate-700 shadow-soft-lg active:scale-[0.98] transition"
    >
      <div className="absolute -top-8 -left-8 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white/90">
            <MapPin size={14} />
            <span className="text-xs font-medium">{city.name}</span>
          </div>
          <div className="flex items-center gap-1 text-white/60">
            <span className="text-[10px]">تنظیمات</span>
            <ChevronLeft size={14} />
          </div>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs text-white/60 mb-1">نماز بعدی</p>
            <p className="text-xl font-bold text-white flex items-center gap-2">
              <span>{next.icon}</span>
              {next.name}
            </p>
          </div>
          <p className="text-3xl font-bold text-brand-400">{formatTime(next.time)}</p>
        </div>

        <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
          <div className="flex items-center gap-2 text-white/70 text-xs">
            <Clock size={14} />
            <span>باقی‌مانده</span>
          </div>
          <div className="flex items-center gap-1 text-white font-mono font-bold">
            <div className="bg-white/10 rounded-lg px-2 py-1 min-w-[34px] text-center">{pad(countdown.h)}</div>
            <span className="text-white/50">:</span>
            <div className="bg-white/10 rounded-lg px-2 py-1 min-w-[34px] text-center">{pad(countdown.m)}</div>
            <span className="text-white/50">:</span>
            <div className="bg-white/10 rounded-lg px-2 py-1 min-w-[34px] text-center text-brand-400">{pad(countdown.s)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
