// کلید ذخیره‌سازی بر اساس تاریخ امروز
export const getTodayKey = () => {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `ebadat-log-${y}-${m}-${day}`
}

export const getTodayData = () => {
  try {
    const stored = localStorage.getItem(getTodayKey())
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.error('خطا در خواندن:', e)
  }
  return {
    prayers: { fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '' },
    quran: 0,
    salawat: 0,
    challengeDone: false,
  }
}

export const saveTodayData = (data) => {
  try {
    localStorage.setItem(getTodayKey(), JSON.stringify(data))
    return true
  } catch (e) {
    console.error('خطا در ذخیره:', e)
    return false
  }
}
