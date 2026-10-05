// محاسبه اوقات شرعی با فرمول نجومی (بدون کتابخانه)
// روش: محاسبه زاویه خورشید و تبدیل به وقت محلی

const toRad = (d) => (d * Math.PI) / 180
const toDeg = (r) => (r * 180) / Math.PI

function julianDate(date) {
  return date.getTime() / 86400000 + 2440587.5
}

function sunPosition(jd) {
  const D = jd - 2451545.0
  const g = (357.529 + 0.98560028 * D) % 360
  const q = (280.459 + 0.98564736 * D) % 360
  const L = (q + 1.915 * Math.sin(toRad(g)) + 0.020 * Math.sin(toRad(2 * g))) % 360
  const e = 23.439 - 0.00000036 * D
  const RA = toDeg(Math.atan2(Math.cos(toRad(e)) * Math.sin(toRad(L)), Math.cos(toRad(L)))) / 15
  const dec = toDeg(Math.asin(Math.sin(toRad(e)) * Math.sin(toRad(L))))
  return { RA: ((RA % 24) + 24) % 24, dec, L }
}

function equationOfTime(jd) {
  const { RA, L } = sunPosition(jd)
  let eqt = L / 15 - RA
  while (eqt > 12) eqt -= 24
  while (eqt < -12) eqt += 24
  return eqt
}

function hourAngle(angle, lat, dec) {
  const cosH = (Math.sin(toRad(-angle)) - Math.sin(toRad(lat)) * Math.sin(toRad(dec))) / (Math.cos(toRad(lat)) * Math.cos(toRad(dec)))
  if (cosH > 1 || cosH < -1) return null
  return toDeg(Math.acos(cosH))
}

function sunTime(angle, lat, lng, jd, tz, direction) {
  const { dec } = sunPosition(jd)
  const eqt = equationOfTime(jd)
  const ha = hourAngle(angle, lat, dec)
  if (ha === null) return null
  const time = 12 + direction * (ha / 15) + tz - lng / 15 - eqt
  return ((time % 24) + 24) % 24
}

function asrTime(lat, lng, jd, tz) {
  const { dec } = sunPosition(jd)
  const angle = -toDeg(Math.atan(1 / (1 + Math.tan(toRad(Math.abs(lat - dec))))))
  const eqt = equationOfTime(jd)
  const cosH = (Math.sin(toRad(angle)) - Math.sin(toRad(lat)) * Math.sin(toRad(dec))) / (Math.cos(toRad(lat)) * Math.cos(toRad(dec)))
  if (cosH > 1 || cosH < -1) return null
  const ha = toDeg(Math.acos(cosH))
  const time = 12 + ha / 15 + tz - lng / 15 - eqt
  return ((time % 24) + 24) % 24
}

function hoursToDate(hours, baseDate) {
  if (hours === null) return null
  const h = Math.floor(hours)
  const m = Math.floor((hours - h) * 60)
  const date = new Date(baseDate)
  date.setHours(h, m, 0, 0)
  return date
}

export const cities = [
  { name: 'تهران', lat: 35.6892, lng: 51.3890, tz: 3.5 },
  { name: 'مشهد', lat: 36.2605, lng: 59.6168, tz: 3.5 },
  { name: 'اصفهان', lat: 32.6546, lng: 51.6680, tz: 3.5 },
  { name: 'شیراز', lat: 29.5918, lng: 52.5837, tz: 3.5 },
  { name: 'تبریز', lat: 38.0800, lng: 46.2919, tz: 3.5 },
  { name: 'کرج', lat: 35.8400, lng: 50.9391, tz: 3.5 },
  { name: 'اهواز', lat: 31.3183, lng: 48.6706, tz: 3.5 },
  { name: 'قم', lat: 34.6416, lng: 50.8746, tz: 3.5 },
  { name: 'کرمانشاه', lat: 34.3142, lng: 47.0650, tz: 3.5 },
  { name: 'ارومیه', lat: 37.5527, lng: 45.0761, tz: 3.5 },
  { name: 'زاهدان', lat: 29.4963, lng: 60.8629, tz: 3.5 },
  { name: 'رشت', lat: 37.2808, lng: 49.5832, tz: 3.5 },
  { name: 'یزد', lat: 31.8974, lng: 54.3569, tz: 3.5 },
  { name: 'بندرعباس', lat: 27.1832, lng: 56.2666, tz: 3.5 },
  { name: 'اراک', lat: 34.0917, lng: 49.6892, tz: 3.5 },
  { name: 'بوشهر', lat: 28.9234, lng: 50.8200, tz: 3.5 },
  { name: 'قزوین', lat: 36.2670, lng: 50.0040, tz: 3.5 },
  { name: 'گرگان', lat: 36.8456, lng: 54.4393, tz: 3.5 },
  { name: 'ساری', lat: 36.5633, lng: 53.0601, tz: 3.5 },
  { name: 'کرمان', lat: 30.2839, lng: 57.0834, tz: 3.5 },
  { name: 'همدان', lat: 34.7983, lng: 48.5147, tz: 3.5 },
  { name: 'سنندج', lat: 35.3147, lng: 46.9988, tz: 3.5 },
  { name: 'بیرجند', lat: 32.8660, lng: 59.2211, tz: 3.5 },
  { name: 'یاسوج', lat: 30.6682, lng: 51.5880, tz: 3.5 },
  { name: 'ایلام', lat: 33.6374, lng: 46.4226, tz: 3.5 },
  { name: 'سمنان', lat: 35.5729, lng: 53.3971, tz: 3.5 },
  { name: 'اردبیل', lat: 38.2498, lng: 48.2933, tz: 3.5 },
  { name: 'زنجان', lat: 36.6769, lng: 48.4963, tz: 3.5 },
  { name: 'خرم‌آباد', lat: 33.4878, lng: 48.3558, tz: 3.5 },
  { name: 'اسلامشهر', lat: 35.5628, lng: 51.2368, tz: 3.5 },
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

export const calculatePrayerTimes = (city, date = new Date()) => {
  try {
    const jd = julianDate(date) + 0.5
    const tz = city.tz || 3.5
    const lat = city.lat
    const lng = city.lng

    const fajr = sunTime(18, lat, lng, jd, tz, -1)
    const sunrise = sunTime(0.833, lat, lng, jd, tz, -1)
    const dhuhr = 12 + tz - lng / 15 - equationOfTime(jd)
    const asr = asrTime(lat, lng, jd, tz)
    const maghrib = sunTime(4.5, lat, lng, jd, tz, 1)
    const isha = sunTime(14, lat, lng, jd, tz, 1)

    return {
      fajr: hoursToDate(fajr, date),
      sunrise: hoursToDate(sunrise, date),
      dhuhr: hoursToDate(dhuhr, date),
      asr: hoursToDate(asr, date),
      maghrib: hoursToDate(maghrib, date),
      isha: hoursToDate(isha, date),
    }
  } catch (e) {
    console.error('Prayer times error:', e)
    return null
  }
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
  return null
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
