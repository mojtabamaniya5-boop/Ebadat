import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Heart, Trophy, User } from 'lucide-react'

export default function BottomNav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const items = [
    { path: '/', label: 'خانه', icon: Home },
    { path: '/track', label: 'اعمال', icon: BookOpen },
    { path: '/prayers', label: 'دعا و ذکر', icon: Heart },
    { path: '/achievements', label: 'دستاورد', icon: Trophy },
    { path: '/profile', label: 'پروفایل', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 w-full bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl border-t border-light-border dark:border-dark-border flex justify-around items-center py-2 shadow-soft-lg z-50 transition-colors">
      {items.map(({ path, label, icon: Icon }) => {
        const active = isActive(path)
        return (
          <Link key={path} to={path} className="flex flex-col items-center px-2 py-1 relative flex-1">
            {active && (
              <div className="absolute -top-2 w-8 h-1 bg-brand-500 rounded-full shadow-glow" />
            )}
            <Icon
              size={20}
              strokeWidth={active ? 2.5 : 2}
              className={`transition-all ${active ? 'text-brand-500 scale-110' : 'text-gray-400 dark:text-dark-textSecondary'}`}
            />
            <span className={`text-[10px] mt-1 font-medium transition-colors ${
              active ? 'text-brand-500 font-bold' : 'text-gray-400 dark:text-dark-textSecondary'
            }`}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
