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
    <nav className="fixed bottom-0 w-full bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-t border-light-border dark:border-dark-border flex justify-around items-center py-3 shadow-soft-lg z-50 transition-colors">
      {items.map(({ path, label, icon: Icon }) => {
        const active = isActive(path)
        return (
          <Link
            key={path}
            to={path}
            className="flex flex-col items-center px-2 py-1 relative"
          >
            {active && (
              <div className="absolute -top-3 w-10 h-1 bg-brand-500 rounded-full shadow-glow" />
            )}
            <Icon
              size={20}
              strokeWidth={active ? 2.5 : 2}
              className={`transition-colors ${active ? 'text-brand-500' : 'text-gray-400 dark:text-dark-textSecondary'}`}
            />
            <span className={`text-[10px] mt-1 font-medium transition-colors ${active ? 'text-brand-500' : 'text-gray-400 dark:text-dark-textSecondary'}`}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
