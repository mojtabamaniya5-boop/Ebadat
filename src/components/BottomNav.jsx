import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Sparkles, BarChart2, User } from 'lucide-react'

export default function BottomNav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const items = [
    { path: '/', label: 'داشبورد', icon: Home },
    { path: '/track', label: 'ثبت اعمال', icon: BookOpen },
    { path: '/coach', label: 'مربی AI', icon: Sparkles },
    { path: '/analytics', label: 'کارنامه', icon: BarChart2 },
    { path: '/profile', label: 'پروفایل', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-3 shadow-lg z-50">
      {items.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={`flex flex-col items-center transition ${
            isActive(path) ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'
          }`}
        >
          <Icon size={22} />
          <span className="text-xs mt-1">{label}</span>
        </Link>
      ))}
    </nav>
  )
}
