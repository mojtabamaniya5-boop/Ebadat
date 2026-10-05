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
      className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 border border-gray-100 dark:border-slate-700"
      aria-label="تغییر تم"
    >
      {dark ? (
        <Sun className="text-amber-400" size={22} />
      ) : (
        <Moon className="text-emerald-600" size={22} />
      )}
    </button>
  )
}
