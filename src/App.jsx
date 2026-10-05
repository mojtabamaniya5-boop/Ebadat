import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import AdhanPlayer from './components/AdhanPlayer'
import Dashboard from './pages/Dashboard'
import Track from './pages/Track'
import Prayers from './pages/Prayers'
import Coach from './pages/Coach'
import Calendar from './pages/Calendar'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import PrayerSettings from './pages/PrayerSettings'
import Hadiths from './pages/Hadiths'
import Achievements from './pages/Achievements'

function AppContent() {
  const location = useLocation()
  const hideNav = ['/coach', '/prayer-settings'].includes(location.pathname)

  return (
    <div className={`min-h-screen ${hideNav ? '' : 'pb-20'} bg-light-bg dark:bg-dark-bg transition-colors duration-300`} dir="rtl">
      <AdhanPlayer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/track" element={<Track />} />
        <Route path="/prayers" element={<Prayers />} />
        <Route path="/hadiths" element={<Hadiths />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/prayer-settings" element={<PrayerSettings />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const saved = localStorage.getItem('ebadat-theme')
    if (saved === 'dark') document.documentElement.classList.add('dark')
    let lastDay = new Date().toDateString()
    const interval = setInterval(() => {
      const now = new Date().toDateString()
      if (now !== lastDay) { lastDay = now; window.location.reload() }
    }, 60000)
    return () => clearInterval(interval)
  }, [])
  return <AppContent />
}
