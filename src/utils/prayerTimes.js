let adhan
try { adhan = require('adhan') } catch (e) { adhan = null }

export const cities = [
  { name: 'تهران', lat: 35.6892, lng: 51.3890 },
  { name: 'مشهد', lat: 36.2605, lng: 59.6168 },
  { name: 'اصفهان', lat: 32.6546, lng: 51.6680 },
  { name: 'شیراز', lat: 29.5918, lng: 52.5837 },
  { name: 'تبریز', lat: 38.0800, lng: 46.2919 },
  { name: 'کرج', lat: 35.8400, lng: 50.9391 },
  { name: 'اهواز', lat: 31.3183, lng: 48.6706 },
  { name: 'قم', lat: 34.6416, lng: 50.8746 },
  { name: 'کرمانشاه', lat: 34.3142, lng: 47.0650 },
  { name: 'ارومیه', lat: 37.5527, lng: 45.0761 },
  { name: 'زاهدان', lat: 29.4963, lng: 60.8629 },
  { name: 'رشت', lat: 37.2808, lng: 49.5832 },
  { name: 'یزد', lat: 31.8974, lng: 54.3569 },
  { name: 'بندرعباس', lat: 27.1832, lng: 56.2666 },
  { name: 'اراک', lat: 34.0917, lng: 49.6892 },
  { name: 'بوشهر', lat: 28.9234, lng: 50.8200 },
  { name: 'قزوین', lat: 36.2670, lng: 50.0040 },
  { name: 'گرگان', lat: 36.8456, lng: 54.4393 },
  { name: 'ساری', lat: 36.5633, lng: 53.0601 },
  { name: 'کرمان', lat: 30.2839, lng: 57.0834 },
  { name: 'همدان', lat: 34.7983, lng: 48.5147 },
  { name: 'سنندج', lat: 35.3147, lng: 46.9988 },
  { name: 'بیرجند', lat: 32.8660, lng: 59.2211 },
  { name: 'یاسوج', lat: 30.6682, lng: 51.5880 },
  { name: 'ایلام', lat: 33.6374, lng: 46.4226 },
  { name: 'سمنان', lat: 35.5729, lng: 53.3971 },
  { name: 'اردبیل', lat: 38.2498, lng: 48.2933 },
  { name: 'زنجان', lat: 36.6769, lng: 48.4963 },
  { name: 'خرم‌آباد', lat: 33.4878, lng: 48.3558 },
  { name: 'اسلامشهر', lat: 35.5628, lng: 51.2368 },
]

export const getSavedCity = () => {
  try {
    const saved = localStorage.getItem('ebadat-city')
    if (saved) return JSON.parse(saved)
  } catch {}
  return cities[0]
}

export const saveCity = (city) => {
  localStorage.setItem('ebadat-city', JSON.stringify(city))
}

export const calculatePrayerTimes = (city, date = new Date()) => {
  if (!adhan) return null
  try {
    const coordinates = new adhan.Coordinates(city.lat, city.lng)
    const params = adhan.CalculationMethod.Tehran()
    if (adhan.Madhab && adhan.Madhab.Jafari) params.madhab = adhan.Madhab.Jafari
    const pt = new adhan.PrayerTimes(coordinates, date, params)
    return {
      fajr: pt.fajr,
      sunrise: pt.sunrise,
      dhuhr: pt.dhuhr,
      asr: pt.asr,
      maghrib: pt.maghrib,
      isha: pt.isha,
    }
  } catch (e) {
    console.error('Prayer times error:', e)
    return null
  }
}

// فقط ۳ اذان شیعه
export const getNextPrayer = (times) => {
  if (!times) return null
  const now = new Date()
  const order = [
    { key: 'fajr', name: 'اذان صبح', icon: '🌅' },
    { key: 'dhuhr', name: 'اذان ظهر', icon: '🌞' },
    { key: 'maghrib', name: 'اذان مغرب', icon: '🌆' },
  ]
  for (const p of order) {
    if (times[p.key] && times[p.key] > now) return { ...p, time: times[p.key] }
  }
  return null
}

// لیست کامل اوقات (برای صفحه تنظیمات یا نمایش جزئیات)
export const getAllTimes = (times) => {
  if (!times) return []
  return [
    { name: 'اذان صبح', time: times.fajr, icon: '🌅' },
    { name: 'طلوع آفتاب', time: times.sunrise, icon: '☀️' },
    { name: 'اذان ظهر', time: times.dhuhr, icon: '🌞' },
    { name: 'نماز عصر', time: times.asr, icon: '🌤️' },
    { name: 'اذان مغرب', time: times.maghrib, icon: '🌆' },
    { name: 'نماز عشا', time: times.isha, icon: '🌙' },
  ]
}

export const formatTime = (date) => {
  if (!date) return '--:--'
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export const getCountdown = (targetTime) => {
  if (!targetTime) return { h: 0, m: 0, s: 0 }
  const now = new Date()
  let diff = targetTime - now
  if (diff < 0) diff += 24 * 60 * 60 * 1000
  return {
    h: Math.floor(diff / (1000 * 60 * 60)),
    m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((diff % (1000 * 60)) / 1000),
  }
}
