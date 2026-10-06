import { useState } from 'react'
import { ChevronLeft, Sparkles, X } from 'lucide-react'

const slides = [
  {
    icon: '🌱',
    title: 'به همراه معنوی خوش آمدی',
    subtitle: 'رفیق معنوی تو، هر روز کنارت',
    description: 'یه اپ ساده برای اینکه بتونی مسیر رشد معنوی‌ات رو راحت پیگیری کنی.',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
  },
  {
    icon: '📿',
    title: 'همه چیز یه جا',
    subtitle: 'عبادت، دعا، حدیث، باغ معنوی',
    description: 'نمازهات رو ثبت کن، دعای کمیل بخون، حدیث روز رو ببین و باغت رو رشد بده.',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    features: [
      { icon: '🕌', text: 'ثبت نماز و اوقات شرعی' },
      { icon: '🤲', text: 'ادعیه و زیارات کامل' },
      { icon: '🌳', text: 'باغ معنوی که رشد می‌کنه' },
      { icon: '🏆', text: 'مدال و دستاورد' },
    ],
  },
  {
    icon: '🚀',
    title: 'بریم شروع کنیم',
    subtitle: 'اولین قدم، ثبت اولین نمازه',
    description: 'هر روز که عبادتت رو ثبت کنی، باغت سبزتر می‌شه. آماده‌ای؟',
    gradient: 'from-brand-400 via-brand-500 to-brand-700',
  },
]

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0)
  const slide = slides[step]
  const isLast = step === slides.length - 1

  const next = () => {
    if (isLast) {
      onFinish()
    } else {
      setStep(step + 1)
    }
  }

  return (
    <div className="fixed inset-0 z-[300] flex flex-col bg-white dark:bg-slate-900 transition-all duration-500" dir="rtl">
      {/* دکمه بستن */}
      <div className="flex justify-between items-center p-4 pt-6">
        <button
          onClick={onFinish}
          className="text-xs text-sub font-medium px-3 py-1.5 rounded-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border"
        >
          رد کردن
        </button>
        <button
          onClick={onFinish}
          className="w-8 h-8 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center border border-light-border dark:border-dark-border active:scale-90 transition"
          aria-label="بستن"
        >
          <X size={16} className="text-sub" />
        </button>
      </div>

      {/* محتوا */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* آیکون اصلی */}
        <div className="relative mb-10">
          <div className={`absolute inset-0 bg-gradient-to-bl ${slide.gradient} opacity-40 blur-3xl rounded-full scale-150`} />
          <div className={`relative w-32 h-32 rounded-full bg-gradient-to-bl ${slide.gradient} flex items-center justify-center shadow-glow-lg animate-float-slow`}>
            <span className="text-7xl">{slide.icon}</span>
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
          <div className="absolute -bottom-2 -left-2 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
        </div>

        {/* عنوان */}
        <h1 className="text-3xl font-bold text-main mb-3 leading-tight">
          {slide.title}
        </h1>

        {/* زیرعنوان */}
        <p className={`text-base font-bold mb-3 bg-gradient-to-bl ${slide.gradient} bg-clip-text text-transparent`}>
          {slide.subtitle}
        </p>

        {/* توضیحات */}
        <p className="text-sm text-sub leading-relaxed max-w-sm mb-6">
          {slide.description}
        </p>

        {/* ویژگی‌ها */}
        {slide.features && (
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-4">
            {slide.features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-light-bg dark:bg-dark-bg rounded-xl p-3 border border-light-border dark:border-dark-border animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-xs font-medium text-main text-right leading-tight">{f.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* پایین */}
      <div className="p-6 pb-8">
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-brand-500' : 'w-2 bg-gray-300 dark:bg-slate-700'
              }`}
              aria-label={`اسلاید ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className={`relative w-full py-4 rounded-2xl bg-gradient-to-l ${slide.gradient} text-white font-bold text-base shadow-glow-lg active:scale-95 transition-all overflow-hidden group`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative flex items-center justify-center gap-2">
            {isLast ? (
              <>
                <Sparkles size={20} />
                بریم شروع کنیم
              </>
            ) : (
              <>
                بعدی
                <ChevronLeft size={20} />
              </>
            )}
          </div>
        </button>

        {isLast && (
          <p className="text-center text-[10px] text-sub mt-4">
            💡 می‌تونی همه چیز رو از تنظیمات پروفایل تغییر بدی
          </p>
        )}
      </div>
    </div>
  )
}
