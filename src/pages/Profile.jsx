import { useState, useEffect } from 'react'
import { User, Moon, Sun, Info, Heart } from 'lucide-react'

export default function Profile() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(localStorage.getItem('ebadat-theme') === 'dark')
  }, [])

  const toggleTheme = () => {
    const newDark = !dark
    setDark(newDark)
    localStorage.setItem('ebadat-theme', newDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newDark)
  }

  return (
    <main className="p-4 max-w-md mx-auto pb-24 animate-fade-in">
      <div className="text-center mt-6 mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-l from-emerald-500 to-teal-600 rounded-full shadow-lg mb-3">
          <User className="text-white" size={36} />
        </div>
        <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">کاربر مهمان</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">نسخه ۱.۰.۰</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden mb-4 transition-colors">
        <button
          onClick={toggleTheme}
          className="w-full p-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-slate-700 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center">
              {dark ? <Moon className="text-amber-500" size={20} /> : <Sun className="text-amber-500" size={20} />}
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">حالت {dark ? 'تاریک' : 'روشن'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">تغییر تم اپلیکیشن</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors relative ${dark ? 'bg-emerald-500' : 'bg-gray-300'}`}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${dark ? 'right-0.5' : 'left-0.5'}`} />
          </div>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
            <Info className="text-emerald-600 dark:text-emerald-400" size={20} />
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">درباره اپلیکیشن</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">همراه معنوی - دستیار رشد روزانه</p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8 flex items-center justify-center gap-1">
        ساخته شده با <Heart size={12} className="text-rose-500" fill="currentColor" /> در ایران
      </p>
    </main>
  )
}
