import { useEffect, useRef } from 'react'
import { getSavedCity, calculatePrayerTimes } from '../utils/prayerTimes'

const ADHAN_SOUNDS = {
  default: 'https://www.islamcan.com/audio/adhan/azan1.mp3',
  short: 'https://www.islamcan.com/audio/adhan/azan2.mp3',
}

export default function AdhanPlayer() {
  const lastPlayedRef = useRef({})
  const audioRef = useRef(null)

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('ebadat-adhan') || '{}')
    if (!settings.enabled) return

    const interval = setInterval(() => {
      try {
        const city = getSavedCity()
        const times = calculatePrayerTimes(city)
        if (!times) return

        const now = new Date()
        const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()

        const adhans = [
          { key: 'fajr', time: times.fajr },
          { key: 'dhuhr', time: times.dhuhr },
          { key: 'maghrib', time: times.maghrib },
        ]

        adhans.forEach(({ key, time }) => {
          if (!settings.perAdhan?.[key]) return
          const t = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()
          const diff = Math.abs(currentSeconds - t)
          const today = new Date().toDateString()
          const lastKey = `${key}-${today}`

          // اگه توی ۱۰ ثانیه اول اذان باشیم و قبلاً پخش نشده باشه
          if (diff < 5 && lastPlayedRef.current[lastKey] !== true) {
            lastPlayedRef.current[lastKey] = true

            // اعلان
            if ('Notification' in window && Notification.permission === 'granted') {
              const names = { fajr: 'اذان صبح', dhuhr: 'اذان ظهر', maghrib: 'اذان مغرب' }
              new Notification('🕌 ' + names[key], {
                body: 'وقت نماز رسید',
                icon: '/Ebadat/icon.svg',
                tag: key,
              })
            }

            // پخش صدا
            if (audioRef.current) {
              audioRef.current.src = ADHAN_SOUNDS[settings.sound || 'default']
              audioRef.current.volume = settings.volume ?? 0.7
              audioRef.current.play().catch(() => {})
            }
          }
        })
      } catch (e) {
        console.error('Adhan check error:', e)
      }
    }, 10000) // هر ۱۰ ثانیه چک کن

    return () => clearInterval(interval)
  }, [])

  return <audio ref={audioRef} preload="none" />
}
