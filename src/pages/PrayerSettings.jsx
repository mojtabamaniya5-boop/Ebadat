import { useState, useEffect } from 'react'
import { MapPin, Navigation, Search, Check, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cities, getSavedCity, saveCity } from '../utils/prayerTimes'

export default function PrayerSettings() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(getSavedCity())
  const [search, setSearch] = useState('')
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')

  const filtered = cities.filter(c => c.name.includes(search))

  const handleSelect = (city) => {
    setSelected(city)
    saveCity(city)
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
        // پیدا کردن نزدیک‌ترین شهر
        let nearest = cities[0]
        let minDist = Infinity
        cities.forEach(c => {
          const d = Math.sqrt((c.lat - latitude) ** 2 + (c.lng - longitude) ** 2)
          if (d < minDist) { minDist = d; nearest = c }
        })
        handleSelect(nearest)
        setLocating(false)
      },
      (err) => {
        setLocationError('دسترسی به موقعیت مکانی داده نشد')
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <main className="p-4 max-w-md mx-auto pb-24 animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      <div className="flex items-center gap-3 mt-4 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white dark:bg-dark-surface shadow-soft flex items-center justify-center border border-light-border dark:border-dark-border">
          <ChevronLeft className="text-main" size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-brand-600 dark:text-brand-400">تنظیمات اوقات شرعی</h1>
          <p className="text-xs text-sub mt-0.5">شهر خودت رو انتخاب کن</p>
        </div>
      </div>

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
            <p className="font-bold text-sm">{locating ? 'در حال یافتن موقعیت...' : 'تشخیص خودکار با GPS'}</p>
            <p className="text-xs text-white/80 mt-0.5">سریع‌ترین راه</p>
          </div>
        </div>
        <MapPin size={20} />
      </button>

      {locationError && (
        <p className="text-xs text-red-500 text-center mb-3">⚠️ {locationError}</p>
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

      <p className="text-center text-xs text-sub mt-4">
        💡 شهر انتخابی برای محاسبه اوقات شرعی استفاده می‌شود
      </p>
    </main>
  )
}
