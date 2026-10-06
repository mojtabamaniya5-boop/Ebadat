import { useState, useEffect } from 'react'
import { Download, X, Sparkles } from 'lucide-react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // چک کن کاربر قبلاً رد کرده یا نه
    const dismissed = localStorage.getItem('ebadat-install-dismissed')
    if (dismissed) return

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // ۳۰ ثانیه بعد از ورود نشون بده
      setTimeout(() => setShow(true), 30000)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // اگه نصب شده باشه نشون نده
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShow(false)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      localStorage.setItem('ebadat-install-dismissed', 'true')
    }
    setDeferredPrompt(null)
    setShow(false)
  }

  const handleDismiss = () => {
    localStorage.setItem('ebadat-install-dismissed', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[90] animate-slide-up max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-bl from-brand-500 via-brand-600 to-brand-700 text-white shadow-glow-lg border border-brand-400">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Sparkles size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm mb-0.5">نصب همراه معنوی</p>
            <p className="text-[11px] text-white/80">دسترسی سریع از صفحه اصلی گوشی</p>
          </div>
          <button
            onClick={handleDismiss}
            className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center active:scale-90 transition flex-shrink-0"
            aria-label="بستن"
          >
            <X size={14} />
          </button>
        </div>
        <button
          onClick={handleInstall}
          className="relative z-10 w-full mt-3 bg-white text-brand-600 py-2.5 rounded-xl font-bold text-sm active:scale-95 transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Download size={16} />
          نصب کن
        </button>
      </div>
    </div>
  )
}
