import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Heart, Calendar, BarChart2, Sparkles, User } from 'lucide-react'

export default function BottomNav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const items = [
    { path: '/', label: 'داشبورد', icon: Home },
    { path: '/track', label: 'ثبت', icon: BookOpen },
    { path: '/prayers', label: 'دعا', icon: Heart },
    { path: '/coach', label: 'مربی', icon: Sparkles },
    { path: '/calendar', label: 'تقویم', icon: Calendar },
    { path: '/analytics', label: 'کارنامه', icon: BarChart2 },
    { path: '/profile', label: 'من', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 w-full bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-t border-light-border dark:border-dark-border flex justify-around items-center py-2 shadow-soft-lg z-50 transition-colors">
      {items.map(({ path, label, icon: Icon }) => {
        const active = isActive(path)
        return (
          <Link
            key={path}
            to={path}
            className="flex flex-col items-center px-1 py-1 relative flex-1"
          >
            {active && (
              <div className="absolute -top-1.5 w-6 h-0.5 bg-brand-500 rounded-full shadow-glow" />
            )}
            <Icon
              size={18}
              strokeWidth={active ? 2.5 : 2}
              className={`transition-colors ${
                active ? 'text-brand-500' : 'text-gray-400 dark:text-dark-textSecondary'
              }`}
            />
            <span className={`text-[9px] mt-0.5 font-medium transition-colors ${
              active ? 'text-brand-500' : 'text-gray-400 dark:text-dark-textSecondary'
            }`}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
