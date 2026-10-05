import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('ebadat-theme')
    const isDark = saved === 'dark'
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const newDark = !dark
    setDark(newDark)
    localStorage.setItem('ebadat-theme', newDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newDark)
  }

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-14 rounded-2xl bg-white dark:bg-dark-surface shadow-soft dark:shadow-glow-sm flex items-center justify-center border border-light-border dark:border-dark-border active:scale-95 transition-all overflow-hidden group"
      aria-label="تغییر تم"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent dark:from-brand-900/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        {dark ? (
          <Sun className="text-amber-400 transition-transform group-hover:rotate-90 duration-500" size={22} />
        ) : (
          <Moon className="text-brand-500 transition-transform group-hover:-rotate-12 duration-500" size={22} />
        )}
      </div>
    </button>
  )
}
