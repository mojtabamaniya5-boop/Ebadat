import { useEffect, useRef } from 'react'
import { getSavedCity, calculatePrayerTimes } from '../utils/prayerTimes'

const ADHAN_SRC = '/Ebadat/sounds/adhan.mp3'

export default function AdhanPlayer() {
  const lastPlayedRef = useRef({})
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(ADHAN_SRC)
    audio.preload = 'auto'
    audioRef.current = audio

    const getSettings = () => {
      try { return JSON.parse(localStorage.getItem('ebadat-adhan') || '{}') }
      catch { return {} }
    }

    const interval = setInterval(() => {
      const settings = getSettings()
      if (!settings.enabled) return

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
          if (!time) return
          const t = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()
          const diff = Math.abs(currentSeconds - t)
          const today = new Date().toDateString()
          const lastKey = `${key}-${today}`

          if (diff < 5 && lastPlayedRef.current[lastKey] !== true) {
            lastPlayedRef.current[lastKey] = true

            if ('Notification' in window && Notification.permission === 'granted') {
              const names = { fajr: 'اذان صبح', dhuhr: 'اذان ظهر', maghrib: 'اذان مغرب' }
              new Notification('🕌 ' + names[key], { body: 'وقت نماز رسید', icon: '/Ebadat/icon.svg', tag: key })
            }

            if (audioRef.current) {
              audioRef.current.volume = settings.volume ?? 0.8
              audioRef.current.currentTime = 0
              audioRef.current.play().catch((e) => console.warn('Autoplay blocked:', e))
            }
          }
        })
      } catch (e) { console.error('Adhan check error:', e) }
    }, 5000)

    return () => {
      clearInterval(interval)
      if (audioRef.current) audioRef.current.pause()
    }
  }, [])

  return null
}
