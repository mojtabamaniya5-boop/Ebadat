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
    <div className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-bl from-slate-800 via-slate-900 to-slate-800 dark:from-dark-surface dark:via-dark-bg dark:to-dark-surface border border-slate-700/50 shadow-soft-lg">
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-brand-500/25 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl" />

      <div className="relative z-10 p-5">
        {/* ردیف بالا: شهر (راست) + تنظیمات (چپ) */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/prayer-settings" className="flex items-center gap-2 text-white/90 active:opacity-70">
            <MapPin size={14} />
            <span className="text-xs font-medium">{city.name}</span>
          </Link>
          <Link
            to="/prayer-settings"
            className="flex items-center gap-1 text-white/60 text-[10px]"
          >
            <span>تنظیمات</span>
            <Settings size={12} />
          </Link>
        </div>

        {/* نماز بعدی: عنوان راست، زمان چپ */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs text-white/60 mb-1">نماز بعدی</p>
            <p className="text-xl font-bold text-white flex items-center gap-2">
              <span>{next.icon}</span>
              {next.name}
            </p>
          </div>
          <p className="text-3xl font-bold text-brand-400 font-mono">{formatTime(next.time)}</p>
        </div>

        {/* شمارش معکوس: برچسب راست، زمان چپ - با ترتیب صحیح */}
        <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
          <div className="flex items-center gap-2 text-white/70 text-xs">
            <Clock size={14} />
            <span>باقی‌مانده</span>
          </div>
          {/* چپ‌چین: ساعت (چپ) - دقیقه - ثانیه (راست) */}
          <div className="flex items-center gap-1 text-white font-mono font-bold" dir="ltr">
            <span className="bg-white/10 rounded-lg px-2 py-1 min-w-[34px] text-center">{pad(countdown.h)}</span>
            <span className="text-white/50">:</span>
            <span className="bg-white/10 rounded-lg px-2 py-1 min-w-[34px] text-center">{pad(countdown.m)}</span>
            <span className="text-white/50">:</span>
            <span className="bg-white/10 rounded-lg px-2 py-1 min-w-[34px] text-center text-brand-400">{pad(countdown.s)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
