import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, BellOff, Volume2, VolumeX, ChevronLeft, Play, Check, AlertCircle } from 'lucide-react'

const ADHANS = [
  { key: 'fajr', name: 'اذان صبح', icon: '🌅' },
  { key: 'dhuhr', name: 'اذان ظهر', icon: '🌞' },
  { key: 'maghrib', name: 'اذان مغرب', icon: '🌆' },
]

// فایل‌های صوتی اذان (از اینترنت رایگان)
const ADHAN_SOUNDS = {
  default: {
    name: 'اذان کامل (مکشوف)',
    url: 'https://www.islamcan.com/audio/adhan/azan1.mp3',
  },
  short: {
    name: 'اذان کوتاه',
    url: 'https://www.islamcan.com/audio/adhan/azan2.mp3',
  },
}

export default function AdhanSettings() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
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
      if (saved) setSettings({ ...settings, ...JSON.parse(saved) })
      if ('Notification' in window) setNotifPermission(Notification.permission)
    } catch {}
  }, [])

  const save = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem('ebadat-adhan', JSON.stringify(newSettings))
  }

  const requestNotification = async () => {
    if (!('Notification' in window)) {
      alert('مرورگر شما از اعلان پشتیبانی نمی‌کنه')
      return
    }
    const perm = await Notification.requestPermission()
    setNotifPermission(perm)
    if (perm === 'granted') {
      new Notification('همراه معنوی', {
        body: 'اعلان‌ها فعال شد! 🌱',
        icon: '/Ebadat/icon.svg',
      })
    }
  }

  const previewSound = () => {
    const audio = new Audio(ADHAN_SOUNDS[settings.sound].url)
    audio.volume = settings.volume
    audio.play().then(() => setPreviewing(true)).catch(() => {})
    audio.onended = () => setPreviewing(false)
  }

  const toggleAdhan = (key) => {
    save({
      ...settings,
      perAdhan: { ...settings.perAdhan, [key]: !settings.perAdhan[key] },
    })
  }

  return (
    <main className="p-4 max-w-md mx-auto pb-24 animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      <div className="flex items-center gap-3 mt-4 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white dark:bg-dark-surface shadow-soft flex items-center justify-center border border-light-border dark:border-dark-border">
          <ChevronLeft className="text-main" size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-brand-600 dark:text-brand-400">تنظیمات اذان</h1>
          <p className="text-xs text-sub mt-0.5">صدای اذان و اعلان‌ها</p>
        </div>
      </div>

      {/* کلید اصلی */}
      <div className="card p-4 mb-4">
        <button onClick={() => save({ ...settings, enabled: !settings.enabled })} className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.enabled ? 'bg-brand-500 text-white' : 'bg-light-bg dark:bg-dark-bg text-sub'}`}>
              {settings.enabled ? <Bell size={20} /> : <BellOff size={20} />}
            </div>
            <div className="text-right">
              <p className="font-bold text-main text-sm">فعال‌سازی اذان</p>
              <p className="text-xs text-sub mt-0.5">پخش صدا سر وقت اذان</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors relative ${settings.enabled ? 'bg-brand-500' : 'bg-gray-300 dark:bg-slate-700'}`}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings.enabled ? 'right-0.5' : 'left-0.5'}`} />
          </div>
        </button>
      </div>

      {settings.enabled && (
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
                  <p className="text-xs text-sub mt-0.5">نمایش اعلان روی گوشی</p>
                </div>
              </div>
              {notifPermission === 'granted' ? (
                <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                  <Check size={16} /> فعال
                </div>
              ) : (
                <button onClick={requestNotification} className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  فعال کن
                </button>
              )}
            </div>
            {notifPermission === 'denied' && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
                <AlertCircle size={12} /> اعلان مسدود شده - از تنظیمات مرورگر اجازه بده
              </p>
            )}
          </div>

          {/* انتخاب صدا */}
          <div className="card p-4 mb-4">
            <p className="font-bold text-main text-sm mb-3">صدای اذان</p>
            {Object.entries(ADHAN_SOUNDS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => save({ ...settings, sound: key })}
                className={`w-full flex items-center justify-between p-3 rounded-xl mb-2 transition ${
                  settings.sound === key
                    ? 'bg-brand-50 dark:bg-brand-900/20 border-2 border-brand-500'
                    : 'bg-light-bg dark:bg-dark-bg border-2 border-transparent'
                }`}
              >
                <span className="text-sm font-medium text-main">{val.name}</span>
                {settings.sound === key && (
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

          {/* انتخاب اذان‌ها */}
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
                <div className={`w-11 h-6 rounded-full transition-colors relative ${settings.perAdhan[a.key] ? 'bg-brand-500' : 'bg-gray-300 dark:bg-slate-700'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings.perAdhan[a.key] ? 'right-0.5' : 'left-0.5'}`} />
                </div>
              </button>
            ))}
          </div>

          {/* حجم صدا */}
          <div className="card p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {settings.volume === 0 ? <VolumeX size={18} className="text-sub" /> : <Volume2 size={18} className="text-brand-500" />}
                <span className="font-bold text-main text-sm">حجم صدا</span>
              </div>
              <span className="text-sm font-bold text-brand-500">{Math.round(settings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => save({ ...settings, volume: parseFloat(e.target.value) })}
              className="w-full accent-brand-500"
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4">
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              💡 <strong>نکته:</strong> برای پخش دقیق اذان، اپلیکیشن باید در حال اجرا باشه (حتی توی پس‌زمینه). 
              اگه اپ بسته باشه، اعلان میاد ولی صدا پخش نمی‌شه.
            </p>
          </div>
        </>
      )}
    </main>
  )
}
