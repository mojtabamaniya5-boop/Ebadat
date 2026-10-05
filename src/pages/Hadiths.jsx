import { useState } from 'react'
import { BookOpen, Star, Copy, Check, Quote } from 'lucide-react'
import { hadiths, categories } from '../data/hadiths'

export default function Hadiths() {
  const [filter, setFilter] = useState('همه')
  const [copiedId, setCopiedId] = useState(null)

  const filtered = filter === 'همه' ? hadiths : hadiths.filter(h => h.category === filter)

  const copyHadith = (h) => {
    const text = `${h.text}\n\n${h.translation}\n\n— ${h.source}`
    navigator.clipboard.writeText(text)
    setCopiedId(h.id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <main className="p-4 max-w-md mx-auto pb-24 animate-fade-in bg-mesh-light dark:bg-mesh-dark min-h-screen">
      <div className="text-center mt-6 mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-l from-amber-500 to-orange-600 rounded-2xl shadow-glow-sm mb-3">
          <BookOpen className="text-white" size={28} />
        </div>
        <h1 className="text-2xl font-bold text-brand-600 dark:text-brand-400">کتابخانه احادیث</h1>
        <p className="text-sm text-sub mt-1">از کلام معصومین (ع)</p>
      </div>

      {/* فیلتر دسته‌بندی */}
      <div className="overflow-x-auto mb-4 -mx-4 px-4">
        <div className="flex gap-2 pb-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setFilter(cat.name)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat.name
                  ? 'bg-gradient-to-l from-brand-500 to-brand-600 text-white shadow-glow-sm'
                  : 'bg-white dark:bg-dark-surface text-sub border border-light-border dark:border-dark-border'
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* تعداد */}
      <p className="text-xs text-sub mb-3 px-1">{filtered.length} حدیث</p>

      {/* لیست احادیث */}
      <div className="space-y-4">
        {filtered.map((h) => (
          <div
            key={h.id}
            className="relative bg-white dark:bg-dark-surface rounded-2xl p-5 shadow-soft border border-light-border dark:border-dark-border transition-colors overflow-hidden"
          >
            {/* علامت نقل قول */}
            <Quote className="absolute -top-2 -right-2 text-brand-100 dark:text-brand-900/30" size={60} />

            <div className="relative z-10">
              {/* هدر */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{h.emoji}</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-bold">
                    {h.category}
                  </span>
                </div>
                <button
                  onClick={() => copyHadith(h)}
                  className="w-8 h-8 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center active:scale-90 transition"
                >
                  {copiedId === h.id ? (
                    <Check size={14} className="text-brand-500" />
                  ) : (
                    <Copy size={14} className="text-sub" />
                  )}
                </button>
              </div>

              {/* متن عربی */}
              <p
                className="text-main text-base leading-loose text-right mb-3 font-medium"
                dir="rtl"
                style={{ fontFamily: 'Vazirmatn, serif' }}
              >
                «{h.text}»
              </p>

              {/* ترجمه */}
              <div className="bg-brand-50/50 dark:bg-brand-900/10 rounded-xl p-3 border-r-4 border-brand-500">
                <p className="text-sm text-main leading-relaxed">{h.translation}</p>
              </div>

              {/* منبع */}
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-sub">
                <Star size={10} className="text-amber-500" fill="currentColor" />
                <span>{h.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
