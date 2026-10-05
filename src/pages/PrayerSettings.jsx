import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin, Navigation, Search, Check, ChevronLeft,
  Bell, BellOff, Volume2, VolumeX, Play, AlertCircle
} from 'lucide-react'
import { cities, getSavedCity, saveCity, calculatePrayerTimes, getAllTimes, formatTime } from '../utils/prayerTimes'

const ADHANS = [
  { key: 'fajr', name: 'اذان صبح', icon: '🌅' },
  { key: 'dhuhr', name: 'اذان ظهر', icon: '🌞' },
  { key: 'maghrib', name: 'اذان مغرب', icon: '🌆' },
]

const ADHAN_SOUNDS = {
  default: { name: 'اذان کامل', url: 'https://www.islamcan.com/audio/adhan/azan1.mp3' },
  short: { name: 'اذان کوتاه', url: 'https://www.islamcan.com/audio/adhan/azan2.mp3' },
}

export default function PrayerSettings() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('city')

  // شهر
  const [selected, setSelected] = useState(getSavedCity())
  const [search, setSearch] = useState('')
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [times, setTimes] = useState([])

  // اذان
  const [adhan, setAdhan] = useState({
    enabled: false,
    sound: 'default',
    volume: 0.7,
    perAdhan: { fajr: true, dhuhr: true, maghrib: true },
  })
  const [notifPermission, setNotifPermission] = useState('default')
  const [previewing, setPreviewing] = useState(false)

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

  const filtered = cities.filter(c => c.name.includes(search))

  const handleSelect = (city) => {
    setSelected(city)
    saveCity(city)
    updateTimes(city)
  }

  const handleGPS = () => {
    if (!navigator.geolocation) {
      setLocationError('مرورگر شما از GPS پشتیبانی نمی‌کنه')
      return
    }
    setLocating(true)
    setLocationError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        let nearest = cities[0]
        let minDist = Infinity
        cities.forEach(c => {
          const d = Math.sqrt((c.lat - latitude) ** 2 + (c.lng - longitude) ** 2)
          if (d < minDist) { minDist = d; nearest = c }
        })
        handleSelect(nearest)
        setLocating(false)
      },
      () => {
        setLocationError('دسترسی به موقعیت مکانی داده نشد')
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
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

  const previewSound = () => {
    const audio = new Audio(ADHAN_SOUNDS[adhan.sound].url)
    audio.volume = adhan.volume
    audio.play().then(() => setPreviewing(true)).catch(() => {})
    audio.onended = () => setPreviewing(false)
  }

  const toggleAdhan = (key) => {
    saveAdhan({ ...adhan, perAdhan: { ...adhan.perAdhan, [key]: !adhan.perAdhan[key] } })
  }

  return (
    <main className="max-w-md mx-auto pb-24 animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      {/* هدر */}
      <div className="flex items-center gap-3 p-4 pt-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white dark:bg-dark-surface shadow-soft flex items-center justify-center border border-light-border dark:border-dark-border active:scale-95 transition">
          <ChevronLeft className="text-main" size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-brand-600 dark:text-brand-400">تنظیمات اوقات شرعی</h1>
          <p className="text-xs text-sub mt-0.5">شهر و اذان</p>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="mx-4 mb-4 bg-white dark:bg-dark-surface rounded-2xl p-1.5 flex gap-1.5 shadow-soft border border-light-border dark:border-dark-border">
        <button
          onClick={() => setTab('city')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            tab === 'city' ? 'bg-gradient-to-l from-brand-500 to-brand-600 text-white shadow-glow-sm' : 'text-sub'
          }`}
        >
          <MapPin size={16} />
          شهر
        </button>
        <button
          onClick={() => setTab('adhan')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            tab === 'adhan' ? 'bg-gradient-to-l from-brand-500 to-brand-600 text-white shadow-glow-sm' : 'text-sub'
          }`}
        >
          <Bell size={16} />
          اذان
        </button>
      </div>

      {/* تب شهر */}
      {tab === 'city' && (
        <div className="px-4 animate-fade-in">
          {/* GPS */}
          <button
            onClick={handleGPS}
            disabled={locating}
            className="w-full bg-gradient-to-l from-brand-500 to-brand-600 text-white p-4 rounded-2xl shadow-glow-sm flex items-center justify-between mb-4 active:scale-[0.98] transition disabled:opacity-70"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Navigation size={20} className={locating ? 'animate-spin' : ''} />
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">{locating ? 'در حال یافتن...' : 'تشخیص خودکار'}</p>
                <p className="text-xs text-white/80 mt-0.5">با GPS گوشی</p>
              </div>
            </div>
          </button>

          {locationError && (
            <p className="text-xs text-red-500 text-center mb-3">⚠️ {locationError}</p>
          )}

          {/* نمایش اوقات امروز */}
          {times.length > 0 && (
            <div className="card p-4 mb-4">
              <p className="text-xs font-bold text-sub mb-3">اوقات شرعی امروز - {selected.name}</p>
              <div className="space-y-1.5">
                {times.map((item, i) => {
                  const isAdhan = item.name.startsWith('اذان')
                  return (
                    <div key={i} className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                      isAdhan ? 'bg-brand-50 dark:bg-brand-900/20' : 'bg-light-bg dark:bg-dark-bg opacity-60'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className={`text-sm ${isAdhan ? 'font-bold text-brand-700 dark:text-brand-300' : 'text-sub'}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className={`text-sm font-mono ${isAdhan ? 'font-bold text-brand-600 dark:text-brand-400' : 'text-sub'}`}>
                        {formatTime(item.time)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* جستجو */}
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-sub" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی شهر..."
              className="w-full bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl pr-10 pl-4 py-3 text-sm text-main outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>

          {/* لیست شهرها */}
          <div className="card overflow-hidden">
            {filtered.length === 0 ? (
              <p className="text-center text-sub py-8 text-sm">شهری پیدا نشد</p>
            ) : (
              filtered.map((city, i) => {
                const isSelected = selected.name === city.name
                return (
                  <button
                    key={city.name}
                    onClick={() => handleSelect(city)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-right active:bg-brand-50 dark:active:bg-brand-900/20 transition ${
                      i !== filtered.length - 1 ? 'border-b border-light-border dark:border-dark-border' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                        isSelected ? 'bg-brand-500 text-white' : 'bg-light-bg dark:bg-dark-bg text-sub'
                      }`}>
                        <MapPin size={16} />
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-main'}`}>
                        {city.name}
                      </span>
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
        </div>
      )}

      {/* تب اذان */}
      {tab === 'adhan' && (
        <div className="px-4 animate-fade-in">
          {/* کلید اصلی */}
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
              {/* اعلان */}
              <div className="card p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                      <Bell className="text-amber-500" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-main text-sm">اعلان مرورگر</p>
                      <p className="text-xs text-sub mt-0.5">نمایش روی گوشی</p>
                    </div>
                  </div>
                  {notifPermission === 'granted' ? (
                    <div className="flex items-center gap-1 text-brand-500 text-xs font-bold">
                      <Check size={16} /> فعال
                    </div>
                  ) : (
                    <button onClick={requestNotification} className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition">
                      فعال کن
                    </button>
                  )}
                </div>
                {notifPermission === 'denied' && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
                    <AlertCircle size={12} /> اعلان مسدود شده
                  </p>
                )}
              </div>

              {/* انتخاب صدا */}
              <div className="card p-4 mb-4">
                <p className="font-bold text-main text-sm mb-3">صدای اذان</p>
                {Object.entries(ADHAN_SOUNDS).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => saveAdhan({ ...adhan, sound: key })}
                    className={`w-full flex items-center justify-between p-3 rounded-xl mb-2 transition ${
                      adhan.sound === key
                        ? 'bg-brand-50 dark:bg-brand-900/20 border-2 border-brand-500'
                        : 'bg-light-bg dark:bg-dark-bg border-2 border-transparent'
                    }`}
                  >
                    <span className="text-sm font-medium text-main">{val.name}</span>
                    {adhan.sound === key && (
                      <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
                <button
                  onClick={previewSound}
                  disabled={previewing}
                  className="w-full bg-gradient-to-l from-brand-500 to-brand-600 text-white py-2.5 rounded-xl text-sm font-bold mt-2 flex items-center justify-center gap-2 active:scale-95 transition disabled:opacity-50"
                >
                  {previewing ? 'در حال پخش...' : <><Play size={16} /> پخش نمونه</>}
                </button>
              </div>

              {/* کدوم اذان‌ها */}
              <div className="card p-4 mb-4">
                <p className="font-bold text-main text-sm mb-3">کدوم اذان‌ها پخش بشه؟</p>
                {ADHANS.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => toggleAdhan(a.key)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-light-bg dark:bg-dark-bg mb-2"
                  >
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

              {/* حجم صدا */}
              <div className="card p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {adhan.volume === 0 ? <VolumeX size={18} className="text-sub" /> : <Volume2 size={18} className="text-brand-500" />}
                    <span className="font-bold text-main text-sm">حجم صدا</span>
                  </div>
                  <span className="text-sm font-bold text-brand-500">{Math.round(adhan.volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={adhan.volume}
                  onChange={(e) => saveAdhan({ ...adhan, volume: parseFloat(e.target.value) })}
                  className="w-full accent-brand-500"
                />
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4">
                <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                  💡 <strong>نکته:</strong> برای پخش دقیق اذان، اپ باید در حال اجرا باشه.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  )
}
