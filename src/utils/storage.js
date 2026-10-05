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

// خواندن داده‌های ۷ روز اخیر
export const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const key = `ebadat-log-${y}-${m}-${day}`
    
    let data = {
      prayers: { fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '' },
      quran: 0,
      salawat: 0,
      challengeDone: false,
    }
    
    try {
      const stored = localStorage.getItem(key)
      if (stored) data = JSON.parse(stored)
    } catch (e) {}
    
    // محاسبه امتیاز روز
    const validPrayers = Object.values(data.prayers).filter(v => v && v !== 'qaza').length
    const score = validPrayers * 10 + data.quran * 5 + Math.floor(data.salawat / 10) * 2 + (data.challengeDone ? 10 : 0)
    
    days.push({
      date: `${day}/${m}`,
      score,
      prayers: validPrayers,
      quran: data.quran,
      salawat: data.salawat,
      raw: data,
    })
  }
  return days
}
