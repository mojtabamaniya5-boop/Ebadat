// تولید صدای اذان با Web Audio API - بدون نیاز به فایل
export const playAdhanTone = (volume = 0.7, duration = 5) => {
  return new Promise((resolve, reject) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioContext()
      
      // نت‌های شبیه اذان (مقام‌های عربی)
      const notes = [
        { freq: 293.66, dur: 0.6 }, // D4
        { freq: 349.23, dur: 0.4 }, // F4
        { freq: 440.00, dur: 0.8 }, // A4
        { freq: 392.00, dur: 0.6 }, // G4
        { freq: 349.23, dur: 0.4 }, // F4
        { freq: 293.66, dur: 1.0 }, // D4
        { freq: 261.63, dur: 0.6 }, // C4
        { freq: 293.66, dur: 1.2 }, // D4
      ]
      
      const masterGain = ctx.createGain()
      masterGain.gain.value = volume
      masterGain.connect(ctx.destination)
      
      let currentTime = ctx.currentTime
      
      // پخش هر نت با fade in/out
      notes.forEach((note) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        
        osc.type = 'sine'
        osc.frequency.value = note.freq
        
        // fade in/out برای جلوگیری از کلیک
        gain.gain.setValueAtTime(0, currentTime)
        gain.gain.linearRampToValueAtTime(0.4, currentTime + 0.05)
        gain.gain.linearRampToValueAtTime(0.4, currentTime + note.dur - 0.05)
        gain.gain.linearRampToValueAtTime(0, currentTime + note.dur)
        
        osc.connect(gain)
        gain.connect(masterGain)
        
        osc.start(currentTime)
        osc.stop(currentTime + note.dur)
        
        currentTime += note.dur
      })
      
      // پایان
      setTimeout(() => {
        ctx.close()
        resolve(true)
      }, duration * 1000)
      
    } catch (e) {
      console.error('Sound error:', e)
      reject(e)
    }
  })
}

// زنگ ساده کوتاه
export const playBell = (volume = 0.7) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'sine'
    osc.frequency.value = 880
    
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 0.5)
    
    setTimeout(() => ctx.close(), 1000)
  } catch (e) {
    console.error(e)
  }
}
