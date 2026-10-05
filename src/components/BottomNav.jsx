import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Calendar, Heart, BarChart2 } from 'lucide-react'

export default function BottomNav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const items = [
    { path: '/', label: 'داشبورد', icon: Home },
    { path: '/track', label: 'ثبت', icon: BookOpen },
    { path: '/prayers', label: 'دعا و ذکر', icon: Heart },
    { path: '/calendar', label: 'تقویم', icon: Calendar },
    { path: '/analytics', label: 'کارنامه', icon: BarChart2 },
  ]

  return (
    <nav className="fixed bottom-0 w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-t border-gray-200 dark:border-slate-700 flex justify-around items-center py-2.5 shadow-2xl z-50 transition-colors">
      {items.map(({ path, label, icon: Icon }) => {
        const active = isActive(path)
        return (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center px-2 py-1 rounded-xl transition-all ${
              active ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-medium">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
