import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin, Search, Check, ChevronLeft,
  Bell, BellOff, Volume2, VolumeX, Play, AlertCircle
} from 'lucide-react'
import { cities, getSavedCity, saveCity, calculatePrayerTimes, getAllTimes, formatTime } from '../utils/prayerTimes'

const ADHANS = [
  { key: 'fajr', name: 'اذان صبح', icon: '🌅' },
  { key: 'dhuhr', name: 'اذان ظهر', icon: '🌞' },
  { key: 'maghrib', name: 'اذان مغرب', icon: '🌆' },
]

const ADHAN_SRC = '/Ebadat/sounds/adhan.mp3'

export default function PrayerSettings() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('city')

  const [selected, setSelected] = useState(getSavedCity())
  const [search, setSearch] = useState('')
  const [times, setTimes] = useState([])

  const [adhan, setAdhan] = useState({
    enabled: false,
    volume: 0.8,
    perAdhan: { fajr: true, dhuhr: true, maghrib: true },
  })
  const [notifPermission, setNotifPermission] = useState('default')
  const [previewing, setPreviewing] = useState(false)
  const [previewError, setPreviewError] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ebadat-adhan')
      if (saved) setAdhan(prev => ({ ...prev, ...JSON.parse(saved) }))
      if ('Notification' in window) setNotifPermission(Notification.permission)
    } catch {}
    updateTimes(selected)
  }, [])

  const updateTimes = (city) => {
    const t = calculatePrayerTimes(city)
    if (t) setTimes(getAllTimes(t))
  }

  const filtered = search.trim() ? cities.filter(c => c.name.includes(search.trim())) : []

  const handleSelect = (city) => {
    setSelected(city)
    saveCity(city)
    updateTimes(city)
    setSearch('')
  }

  const saveAdhan = (newSettings) => {
    setAdhan(newSettings)
    localStorage.setItem('ebadat-adhan', JSON.stringify(newSettings))
  }

  const requestNotification = async () => {
    if (!('Notification' in window)) {
      alert('مرورگر شما از اعلان پشتیبانی نمی‌کنه')
      return
    }
    const perm = await Notification.requestPermission()
    setNotifPermission(perm)
  }

  const previewSound = async () => {
    setPreviewError('')
    setPreviewing(true)
    try {
      const audio = new Audio(ADHAN_SRC)
      audio.volume = adhan.volume
      audio.onended = () => setPreviewing(false)
      audio.onerror = () => {
        setPreviewing(false)
        setPreviewError('خطا در بارگذاری. یک بار دیگه امتحان کن.')
      }
      await audio.play()
      setTimeout(() => {
        audio.pause()
        setPreviewing(false)
      }, 10000)
    } catch (e) {
      console.error(e)
      setPreviewing(false)
      setPreviewError('برای پخش، یک بار دیگه روی دکمه بزن.')
    }
  }

  const toggleAdhan = (key) => {
    saveAdhan({ ...adhan, perAdhan: { ...adhan.perAdhan, [key]: !adhan.perAdhan[key] } })
  }

  return (
    <main className="max-w-md mx-auto pb-24 animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      <div className="flex items-center gap-3 p-4 pt-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white dark:bg-dark-surface shadow-soft flex items-center justify-center border border-light-border dark:border-dark-border active:scale-95 transition">
          <ChevronLeft className="text-main" size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-brand-600 dark:text-brand-400">تنظیمات اوقات شرعی</h1>
          <p className="text-xs text-sub mt-0.5">شهر و اذان</p>
        </div>
      </div>

      <div className="mx-4 mb-4 bg-white dark:bg-dark-surface rounded-2xl p-1.5 flex gap-1.5 shadow-soft border border-light-border dark:border-dark-border">
        <button onClick={() => setTab('city')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${tab === 'city' ? 'bg-gradient-to-l from-brand-500 to-brand-600 text-white shadow-glow-sm' : 'text-sub'}`}>
          <MapPin size={16} />
          شهر
        </button>
        <button onClick={() => setTab('adhan')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${tab === 'adhan' ? 'bg-gradient-to-l from-brand-500 to-brand-600 text-white shadow-glow-sm' : 'text-sub'}`}>
          <Bell size={16} />
          اذان
        </button>
      </div>

      {tab === 'city' && (
        <div className="px-4 animate-fade-in">
          {/* 🌟 اوقات شرعی امروز - بالا */}
          {times.length > 0 && (
            <div className="card p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-sub">اوقات شرعی امروز</p>
                <div className="flex items-center gap-1 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-full">
                  <MapPin size={11} className="text-brand-500" />
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">{selected.name}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {times.map((item, i) => {
                  const isAdhan = item.name.startsWith('اذان')
                  return (
                    <div key={i} className={`flex items-center justify-between rounded-lg px-3 py-2 ${isAdhan ? 'bg-brand-50 dark:bg-brand-900/20' : 'bg-light-bg dark:bg-dark-bg opacity-60'}`}>
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className={`text-sm ${isAdhan ? 'font-bold text-brand-700 dark:text-brand-300' : 'text-sub'}`}>{item.name}</span>
                      </div>
                      <span className={`text-sm font-mono ${isAdhan ? 'font-bold text-brand-600 dark:text-brand-400' : 'text-sub'}`}>{formatTime(item.time)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 🔍 کادر جستجو - وسط */}
          <div className="relative mb-3">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-sub" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی شهر، شهرستان، بخش..."
              className="w-full bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl pr-10 pl-4 py-3.5 text-sm text-main outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>

          {/* 📋 نتایج جستجو - پایین */}
          {search.trim() && (
            <div className="card overflow-hidden max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-sub py-8 text-sm">
                  شهر «{search}» پیدا نشد
                  <br />
                  <span className="text-xs opacity-70 mt-1 block">فقط شهرهای بزرگ و شهرستان‌ها موجودن</span>
                </p>
              ) : (
                filtered.map((city, i) => {
                  const isSelected = selected.name === city.name
                  return (
                    <button
                      key={city.name}
                      onClick={() => handleSelect(city)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 text-right active:bg-brand-50 dark:active:bg-brand-900/20 transition ${i !== filtered.length - 1 ? 'border-b border-light-border dark:border-dark-border' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${isSelected ? 'bg-brand-500 text-white' : 'bg-light-bg dark:bg-dark-bg text-sub'}`}>
                          <MapPin size={16} />
                        </div>
                        <span className={`text-sm font-medium ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-main'}`}>{city.name}</span>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  )
                })
              )}
            </div>
          )}

          {/* اگه جستجو خالیه، راهنما نشون بده */}
          {!search.trim() && (
            <div className="bg-gradient-to-l from-brand-500 to-brand-600 rounded-2xl p-4 text-white">
              <p className="text-sm font-bold mb-1">📍 شهر خودت رو پیدا کن</p>
              <p className="text-xs text-white/80 leading-relaxed">
                اسم شهرت رو توی کادر بالا بنویس و انتخاب کن. اوقات شرعی خودکار آپدیت می‌شه.
              </p>
              <p className="text-[10px] text-white/60 mt-2">
                بیش از ۲۰۰ شهر و شهرستان ایران
              </p>
            </div>
          )}
        </div>
      )}

      {tab === 'adhan' && (
        <div className="px-4 animate-fade-in">
          <div className="card p-4 mb-4">
            <button onClick={() => saveAdhan({ ...adhan, enabled: !adhan.enabled })} className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${adhan.enabled ? 'bg-brand-500 text-white' : 'bg-light-bg dark:bg-dark-bg text-sub'}`}>
                  {adhan.enabled ? <Bell size={20} /> : <BellOff size={20} />}
                </div>
                <div className="text-right">
                  <p className="font-bold text-main text-sm">فعال‌سازی اذان</p>
                  <p className="text-xs text-sub mt-0.5">پخش صدا سر وقت اذان</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors relative ${adhan.enabled ? 'bg-brand-500' : 'bg-gray-300 dark:bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${adhan.enabled ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </button>
          </div>

          {adhan.enabled && (
            <>
              <div className="card p-4 mb-4">
                <p className="font-bold text-main text-sm mb-3">پیش‌نمایش اذان</p>
                <button onClick={previewSound} disabled={previewing} className="w-full bg-gradient-to-l from-brand-500 to-brand-600 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition disabled:opacity-50">
                  {previewing ? 'در حال پخش...' : <><Play size={16} /> پخش نمونه اذان</>}
                </button>
                {previewError && <p className="text-xs text-red-500 text-center mt-2">⚠️ {previewError}</p>}
                <p className="text-[10px] text-sub text-center mt-2">فقط ۱۰ ثانیه اول پخش می‌شه</p>
              </div>

              <div className="card p-4 mb-4">
                <p className="font-bold text-main text-sm mb-3">کدوم اذان‌ها پخش بشه؟</p>
                {ADHANS.map((a) => (
                  <button key={a.key} onClick={() => toggleAdhan(a.key)} className="w-full flex items-center justify-between p-3 rounded-xl bg-light-bg dark:bg-dark-bg mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{a.icon}</span>
                      <span className="text-sm font-medium text-main">{a.name}</span>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors relative ${adhan.perAdhan[a.key] ? 'bg-brand-500' : 'bg-gray-300 dark:bg-slate-700'}`}>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${adhan.perAdhan[a.key] ? 'right-0.5' : 'left-0.5'}`} />
                    </div>
                  </button>
                ))}
              </div>

              <div className="card p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {adhan.volume === 0 ? <VolumeX size={18} className="text-sub" /> : <Volume2 size={18} className="text-brand-500" />}
                    <span className="font-bold text-main text-sm">حجم صدا</span>
                  </div>
                  <span className="text-sm font-bold text-brand-500">{Math.round(adhan.volume * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.1" value={adhan.volume} onChange={(e) => saveAdhan({ ...adhan, volume: parseFloat(e.target.value) })} className="w-full accent-brand-500" />
              </div>
            </>
          )}
        </div>
      )}
    </main>
  )
}
