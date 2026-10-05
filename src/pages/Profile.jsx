import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  User, Moon, Sun, Download, Upload, Trash2, Info,
  Heart, Award, Flame, BookOpen, CheckCircle2, AlertCircle,
  ChevronLeft, Shield, X, Check, Trophy, Sparkles
} from 'lucide-react'
import { getGlobalStats, exportAllData, importAllData, resetAllData } from '../utils/storage'
import { calculateTotalXP, getTitle, getStreak } from '../utils/achievements'

export default function Profile() {
  const [dark, setDark] = useState(false)
  const [stats, setStats] = useState(null)
  const [xp, setXp] = useState(0)
  const [title, setTitle] = useState(null)
  const [streak, setStreak] = useState(0)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [toast, setToast] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    setDark(localStorage.getItem('ebadat-theme') === 'dark')
    setStats(getGlobalStats())
    const x = calculateTotalXP()
    setXp(x)
    setTitle(getTitle(x))
    setStreak(getStreak())
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2500)
  }

  const toggleTheme = () => {
    const newDark = !dark
    setDark(newDark)
    localStorage.setItem('ebadat-theme', newDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newDark)
  }

  const handleExport = () => {
    try {
      const json = exportAllData()
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const date = new Date().toISOString().split('T')[0]
      a.download = `ebadat-backup-${date}.json`
      a.click()
      URL.revokeObjectURL(url)
      showToast('پشتیبان دانلود شد ✅')
    } catch (e) {
      showToast('خطا در پشتیبان‌گیری', 'error')
    }
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const success = importAllData(event.target.result)
      if (success) {
        showToast('بازیابی موفق بود ✅')
        setTimeout(() => window.location.reload(), 1500)
      } else {
        showToast('فایل نامعتبر است', 'error')
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (resetAllData()) {
      showToast('همه داده‌ها پاک شد')
      setTimeout(() => window.location.reload(), 1500)
    } else {
      showToast('خطا در پاک کردن', 'error')
    }
    setShowResetConfirm(false)
  }

  return (
    <main className="p-4 max-w-md mx-auto pb-24 animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-glow flex items-center gap-2 text-sm text-white ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-brand-500'
        }`}>
          {toast.type === 'error' ? <AlertCircle size={16} /> : <Check size={16} />}
          {toast.msg}
        </div>
      )}

      {/* هدر پروفایل */}
      <div className="text-center mt-6 mb-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-bl from-brand-400 via-brand-500 to-brand-700 flex items-center justify-center shadow-glow-lg">
            <User className="text-white" size={44} />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white dark:bg-dark-surface border-2 border-brand-500 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-brand-500 animate-pulse" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-brand-600 dark:text-brand-400 mt-3">کاربر همراه</h1>
        {title && (
          <p className="text-sm text-sub mt-1 flex items-center justify-center gap-1">
            <span>{title.emoji}</span>
            <span className="font-bold">{title.name}</span>
            <span className="text-xs">·</span>
            <span className="text-xs">{xp.toLocaleString('fa-IR')} XP</span>
          </p>
        )}
        <p className="text-xs text-sub mt-1">نسخه ۱.۰.۰</p>
      </div>

      {/* کارت دستاوردها */}
      <Link to="/achievements" className="block mb-5 active:scale-[0.98] transition">
        <div className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-bl ${title?.color || 'from-brand-500 to-brand-700'} text-white shadow-glow-sm`}>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={18} />
                <span className="font-bold text-sm">دستاوردهای من</span>
              </div>
              <p className="text-2xl font-bold flex items-center gap-2">
                <span>{title?.emoji}</span>
                {title?.name}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span>🔥 {streak} روز پیوسته</span>
                <span>·</span>
                <span>💫 {xp.toLocaleString('fa-IR')} XP</span>
              </div>
            </div>
            <ChevronLeft size={24} className="text-white/70" />
          </div>
        </div>
      </Link>

      {/* کارت‌های آماری */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="card p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
              <Flame className="text-amber-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-main">{stats.streak || streak}</p>
            <p className="text-xs text-sub mt-1">روز پیوسته</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center">
              <CheckCircle2 className="text-brand-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-main">{stats.totalPrayers}</p>
            <p className="text-xs text-sub mt-1">نماز خوانده</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center">
              <BookOpen className="text-sky-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-main">{stats.totalQuran}</p>
            <p className="text-xs text-sub mt-1">صفحه قرآن</p>
          </div>
          <div className="card p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
              <Heart className="text-rose-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-main">{stats.totalSalawat}</p>
            <p className="text-xs text-sub mt-1">صلوات</p>
          </div>
        </div>
      )}

      {/* آمار تکمیلی */}
      {stats && (
        <div className="card p-4 mb-5">
          <div className="flex items-center justify-between py-2 border-b border-light-border dark:border-dark-border">
            <span className="text-sm text-sub">روزهای فعال</span>
            <span className="text-sm font-bold text-main">{stats.activeDays} روز</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-light-border dark:border-dark-border">
            <span className="text-sm text-sub">روزهای کامل (۵ نماز)</span>
            <span className="text-sm font-bold text-brand-500">{stats.perfectDays || 0}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-light-border dark:border-dark-border">
            <span className="text-sm text-sub">نمازهای قضا</span>
            <span className={`text-sm font-bold ${stats.totalQaza > 0 ? 'text-red-500' : 'text-brand-500'}`}>
              {stats.totalQaza}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-light-border dark:border-dark-border">
            <span className="text-sm text-sub">چالش‌های انجام شده</span>
            <span className="text-sm font-bold text-main">{stats.totalChallenges}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-sub">شروع سفر معنوی</span>
            <span className="text-sm font-bold text-main">{stats.firstDay || 'امروز'}</span>
          </div>
        </div>
      )}

      {/* تم */}
      <div className="card overflow-hidden mb-4">
        <button onClick={toggleTheme} className="w-full p-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-slate-700 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
              {dark ? <Moon className="text-amber-500" size={20} /> : <Sun className="text-amber-500" size={20} />}
            </div>
            <div className="text-right">
              <p className="font-bold text-main text-sm">حالت {dark ? 'تاریک' : 'روشن'}</p>
              <p className="text-xs text-sub mt-0.5">تغییر تم اپلیکیشن</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors relative ${dark ? 'bg-brand-500' : 'bg-gray-300 dark:bg-slate-700'}`}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${dark ? 'right-0.5' : 'left-0.5'}`} />
          </div>
        </button>
      </div>

      {/* مدیریت داده */}
      <div className="mb-4">
        <p className="text-xs font-bold text-sub mb-2 px-1">مدیریت داده‌ها</p>
        <div className="card overflow-hidden">
          <button onClick={handleExport} className="w-full p-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-slate-700 transition border-b border-light-border dark:border-dark-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center">
                <Download className="text-brand-500" size={20} />
              </div>
              <div className="text-right">
                <p className="font-bold text-main text-sm">پشتیبان‌گیری</p>
                <p className="text-xs text-sub mt-0.5">ذخیره داده‌ها در فایل</p>
              </div>
            </div>
            <ChevronLeft className="text-sub" size={18} />
          </button>

          <button onClick={() => fileInputRef.current?.click()} className="w-full p-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-slate-700 transition border-b border-light-border dark:border-dark-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center">
                <Upload className="text-sky-500" size={20} />
              </div>
              <div className="text-right">
                <p className="font-bold text-main text-sm">بازیابی</p>
                <p className="text-xs text-sub mt-0.5">بارگذاری از فایل</p>
              </div>
            </div>
            <ChevronLeft className="text-sub" size={18} />
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />

          <button onClick={() => setShowResetConfirm(true)} className="w-full p-4 flex items-center justify-between active:bg-red-50 dark:active:bg-red-900/20 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <Trash2 className="text-red-500" size={20} />
              </div>
              <div className="text-right">
                <p className="font-bold text-red-500 text-sm">حذف همه داده‌ها</p>
                <p className="text-xs text-sub mt-0.5">غیرقابل بازگشت</p>
              </div>
            </div>
            <ChevronLeft className="text-red-400" size={18} />
          </button>
        </div>
      </div>

      {/* درباره اپ */}
      <div className="card overflow-hidden mb-4">
        <button onClick={() => setShowAbout(true)} className="w-full p-4 flex items-center justify-between active:bg-gray-50 dark:active:bg-slate-700 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
              <Info className="text-purple-500" size={20} />
            </div>
            <div className="text-right">
              <p className="font-bold text-main text-sm">درباره اپلیکیشن</p>
              <p className="text-xs text-sub mt-0.5">نسخه، سازنده، حریم خصوصی</p>
            </div>
          </div>
          <ChevronLeft className="text-sub" size={18} />
        </button>
      </div>

      <p className="text-center text-xs text-sub mt-8 flex items-center justify-center gap-1">
        ساخته شده با <Heart size={12} className="text-rose-500" fill="currentColor" /> در ایران
      </p>

      {/* مودال تأیید ریست */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowResetConfirm(false)}>
          <div className="bg-white dark:bg-dark-surface rounded-3xl p-6 max-w-sm w-full shadow-glow-lg animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <AlertCircle className="text-red-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-main text-center mb-2">مطمئنی؟</h3>
            <p className="text-sm text-sub text-center mb-5 leading-relaxed">
              همه داده‌هایت (نمازها، قرآن، صلوات، چالش‌ها) حذف می‌شود. این عملیات <strong className="text-red-500">غیرقابل بازگشت</strong> است.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-3 rounded-xl bg-light-bg dark:bg-dark-bg text-main font-bold text-sm active:scale-95 transition">
                انصراف
              </button>
              <button onClick={handleReset} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm active:scale-95 transition shadow-md">
                حذف کن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال درباره */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowAbout(false)}>
          <div className="bg-white dark:bg-dark-surface rounded-3xl p-6 max-w-sm w-full shadow-glow-lg animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-main">درباره اپلیکیشن</h3>
              <button onClick={() => setShowAbout(false)} className="w-8 h-8 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center">
                <X size={16} className="text-sub" />
              </button>
            </div>
            <div className="text-center mb-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-bl from-brand-400 to-brand-700 flex items-center justify-center shadow-glow-sm mb-3">
                <span className="text-3xl">🌱</span>
              </div>
              <p className="font-bold text-main">همراه معنوی</p>
              <p className="text-xs text-sub mt-1">نسخه ۱.۰.۰</p>
            </div>
            <p className="text-sm text-sub leading-relaxed text-center mb-4">
              دستیار رشد معنوی روزانه برای ثبت عبادات، دعاها، اذکار و پیگیری مسیر معنوی.
            </p>
            <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-3 flex items-center gap-2 mb-3">
              <Shield size={18} className="text-brand-500 flex-shrink-0" />
              <p className="text-xs text-brand-700 dark:text-brand-300 leading-relaxed">
                همه داده‌های شما فقط روی گوشی خودتان ذخیره می‌شود و به هیچ سروری ارسال نمی‌شود.
              </p>
            </div>
            <p className="text-center text-xs text-sub">🇮🇷 ساخته شده در ایران</p>
          </div>
        </div>
      )}
    </main>
  )
}
