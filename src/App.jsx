import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Dashboard from './pages/Dashboard'
import Track from './pages/Track'
import Prayers from './pages/Prayers'
import Coach from './pages/Coach'
import Calendar from './pages/Calendar'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'

export default function App() {
  useEffect(() => {
    const saved = localStorage.getItem('ebadat-theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
    }

    let lastDay = new Date().toDateString()
    const interval = setInterval(() => {
      const now = new Date().toDateString()
      if (now !== lastDay) {
        lastDay = now
        window.location.reload()
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen pb-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300" dir="rtl">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/track" element={<Track />} />
        <Route path="/prayers" element={<Prayers />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
