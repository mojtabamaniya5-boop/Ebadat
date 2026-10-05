// اوقات شرعی با Aladhan API (رایگان، بدون کلید)
const CACHE_KEY = 'ebadat-prayer-cache'

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
  return cities[15]
}

export const saveCity = (city) => {
  localStorage.setItem('ebadat-city', JSON.stringify(city))
}

// تبدیل "HH:MM" به Date
const timeStringToDate = (str, baseDate) => {
  if (!str) return null
  const [h, m] = str.split(':').map(Number)
  const d = new Date(baseDate)
  d.setHours(h, m, 0, 0)
  return d
}

// محاسبه تقریبی (fallback وقتی اینترنت نیست)
const fallbackTimes = (city, date = new Date()) => {
  const base = new Date(date)
  const tzOffset = 3.5 // ایران
  const month = date.getMonth() + 1
  // تقریب ساده بر اساس ماه
  const seasonal = month >= 4 && month <= 9 ? 0 : 1
  const times = {
    fajr: seasonal ? '05:15' : '04:30',
    sunrise: seasonal ? '06:45' : '06:00',
    dhuhr: '12:05',
    asr: seasonal ? '15:45' : '15:00',
    maghrib: seasonal ? '18:00' : '17:30',
    isha: seasonal ? '19:15' : '18:45',
  }
  return {
    fajr: timeStringToDate(times.fajr, base),
    sunrise: timeStringToDate(times.sunrise, base),
    dhuhr: timeStringToDate(times.dhuhr, base),
    asr: timeStringToDate(times.asr, base),
    maghrib: timeStringToDate(times.maghrib, base),
    isha: timeStringToDate(times.isha, base),
  }
}

// محاسبه با API
export const calculatePrayerTimes = (city, date = new Date()) => {
  // اول cache امروز رو چک کن
  try {
    const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const data = JSON.parse(cached)
      if (data.date === today && data.city === city.name) {
        return {
          fajr: timeStringToDate(data.times.Fajr, date),
          sunrise: timeStringToDate(data.times.Sunrise, date),
          dhuhr: timeStringToDate(data.times.Dhuhr, date),
          asr: timeStringToDate(data.times.Asr, date),
          maghrib: timeStringToDate(data.times.Maghrib, date),
          isha: timeStringToDate(data.times.Isha, date),
        }
      }
    }
  } catch {}

  // اگه cache نبود، fallback بده (بعداً async از API بگیر)
  return fallbackTimes(city, date)
}

// گرفتن از API به صورت async
export const fetchPrayerTimes = async (city, date = new Date()) => {
  try {
    const today = `${date.getDate()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
    const url = `https://api.aladhan.com/v1/timings/${today}?latitude=${city.lat}&longitude=${city.lng}&method=7&school=0`
    const res = await fetch(url)
    const json = await res.json()
    if (json.code === 200 && json.data?.timings) {
      // ذخیره در cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        city: city.name,
        times: json.data.timings,
      }))
      return json.data.timings
    }
  } catch (e) {
    console.error('API error:', e)
  }
  return null
}

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
  // اگه همه گذشتن، فردا صبح رو بده
  const tomorrow = new Date(times.fajr)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return { ...order[0], time: tomorrow, tomorrow: true }
}

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
