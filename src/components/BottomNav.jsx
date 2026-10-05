import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Heart, Calendar, BarChart2, Sparkles } from 'lucide-react'

export default function BottomNav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const items = [
    { path: '/', label: 'داشبورد', icon: Home },
    { path: '/track', label: 'ثبت', icon: BookOpen },
    { path: '/prayers', label: 'دعا', icon: Heart },
    { path: '/coach', label: 'مربی AI', icon: Sparkles, special: true },
    { path: '/calendar', label: 'تقویم', icon: Calendar },
    { path: '/analytics', label: 'کارنامه', icon: BarChart2 },
  ]

  return (
    <nav className="fixed bottom-0 w-full bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-t border-light-border dark:border-dark-border flex justify-around items-center py-2.5 shadow-soft-lg z-50 transition-colors">
      {items.map(({ path, label, icon: Icon, special }) => {
        const active = isActive(path)
        return (
          <Link
            key={path}
            to={path}
            className="flex flex-col items-center px-1 py-1 relative"
          >
            {active && (
              <div className="absolute -top-2.5 w-8 h-0.5 bg-brand-500 rounded-full shadow-glow" />
            )}
            <Icon
              size={special ? 22 : 19}
              strokeWidth={active ? 2.5 : 2}
              className={`transition-colors ${
                active
                  ? special
                    ? 'text-amber-500'
                    : 'text-brand-500'
                  : special
                    ? 'text-amber-400/70 dark:text-amber-500/70'
                    : 'text-gray-400 dark:text-dark-textSecondary'
              }`}
            />
            <span
              className={`text-[9px] mt-1 font-medium transition-colors ${
                active
                  ? special
                    ? 'text-amber-500'
                    : 'text-brand-500'
                  : 'text-gray-400 dark:text-dark-textSecondary'
              }`}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
