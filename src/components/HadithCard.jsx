import { Link } from 'react-router-dom'
import { BookMarked, ChevronLeft, Quote } from 'lucide-react'
import { getTodayHadith } from '../data/hadiths'

export default function HadithCard() {
  const hadith = getTodayHadith()

  return (
    <Link
      to="/hadiths"
      className="block relative overflow-hidden rounded-2xl p-5 mb-6 bg-gradient-to-bl from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900/40 shadow-soft active:scale-[0.98] transition"
    >
      <Quote className="absolute -top-2 -left-2 text-amber-200 dark:text-amber-900/30" size={70} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <BookMarked size={16} className="text-white" />
            </div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300">حدیث امروز</span>
          </div>
          <ChevronLeft className="text-amber-500" size={18} />
        </div>

        <p className="text-main text-sm leading-loose text-right mb-2 font-medium" dir="rtl">
          «{hadith.text}»
        </p>

        <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed mb-2">
          {hadith.translation}
        </p>

        <p className="text-[10px] text-sub">— {hadith.source}</p>
      </div>
    </Link>
  )
}
