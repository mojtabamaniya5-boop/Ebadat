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

// خواندن همه داده‌های ذخیره شده
export const getAllLogs = () => {
  const logs = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('ebadat-log-')) {
        try {
          const data = JSON.parse(localStorage.getItem(key))
          logs.push({ key, ...data })
        } catch {}
      }
    }
  } catch {}
  return logs.sort((a, b) => b.key.localeCompare(a.key))
}

// آمار کلی کاربر
export const getGlobalStats = () => {
  const logs = getAllLogs()
  let totalPrayers = 0
  let totalQuran = 0
  let totalSalawat = 0
  let totalQaza = 0
  let totalChallenges = 0
  let activeDays = 0

  logs.forEach(log => {
    const prayers = log.prayers || {}
    const done = Object.values(prayers).filter(v => v && v !== 'qaza').length
    const qaza = Object.values(prayers).filter(v => v === 'qaza').length
    if (done > 0 || qaza > 0 || log.quran > 0 || log.salawat > 0) {
      activeDays++
      totalPrayers += done
      totalQaza += qaza
      totalQuran += log.quran || 0
      totalSalawat += log.salawat || 0
      if (log.challengeDone) totalChallenges++
    }
  })

  // محاسبه streak
  const today = new Date()
  let streak = 0
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = `ebadat-log-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const dayLog = logs.find(l => l.key === key)
    if (dayLog) {
      const done = Object.values(dayLog.prayers || {}).filter(v => v && v !== 'qaza').length
      if (done > 0 || dayLog.quran > 0 || dayLog.salawat > 0) {
        streak++
      } else {
        break
      }
    } else {
      if (i === 0) continue // اگه امروز خالیه، streak رو نشکن
      break
    }
  }

  return {
    activeDays,
    totalPrayers,
    totalQaza,
    totalQuran,
    totalSalawat,
    totalChallenges,
    streak,
    firstDay: logs.length > 0 ? logs[logs.length - 1].key.replace('ebadat-log-', '') : null,
  }
}

// پشتیبان‌گیری
export const exportAllData = () => {
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    logs: getAllLogs(),
    city: localStorage.getItem('ebadat-city'),
    theme: localStorage.getItem('ebadat-theme'),
    adhan: localStorage.getItem('ebadat-adhan'),
  }
  return JSON.stringify(data, null, 2)
}

// بازیابی از پشتیبان
export const importAllData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString)
    if (data.logs && Array.isArray(data.logs)) {
      data.logs.forEach(log => {
        const { key, ...rest } = log
        localStorage.setItem(key, JSON.stringify(rest))
      })
    }
    if (data.city) localStorage.setItem('ebadat-city', data.city)
    if (data.theme) localStorage.setItem('ebadat-theme', data.theme)
    if (data.adhan) localStorage.setItem('ebadat-adhan', data.adhan)
    return true
  } catch (e) {
    console.error('Import error:', e)
    return false
  }
}

// ریست همه داده‌ها
export const resetAllData = () => {
  try {
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('ebadat-')) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k))
    return true
  } catch (e) {
    return false
  }
}
