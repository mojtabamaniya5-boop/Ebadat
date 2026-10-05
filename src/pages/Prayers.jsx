import { useState } from 'react'
import { Sparkles, Heart, RefreshCw, ChevronDown, BookOpen, Star, Copy, Check } from 'lucide-react'
import { prayersData } from '../data/prayers'

const zikrList = [
  { id: 'salawat', name: 'صلوات', target: 100, emoji: '💚', color: 'rose' },
  { id: 'istighfar', name: 'استغفار', target: 100, emoji: '🤲', color: 'sky' },
  { id: 'tahlil', name: 'لا اله الا الله', target: 100, emoji: '☪️', color: 'emerald' },
  { id: 'tasbihat', name: 'تسبیحات حضرت زهرا (س)', target: 34, emoji: '💎', color: 'purple' },
  { id: 'younesi', name: 'ذکر یونسیه', target: 400, emoji: '🐋', color: 'cyan' },
  { id: 'faraj', name: 'دعای فرج', target: 10, emoji: '✨', color: 'amber' },
]

function ZikrCard({ zikr }) {
  const [count, setCount] = useState(0)

  const progress = Math.min((count / zikr.target) * 100, 100)
  const isComplete = count >= zikr.target

  const colorMap = {
    rose: 'from-rose-500 to-pink-600',
    sky: 'from-sky-500 to-blue-600',
    emerald: 'from-emerald-500 to-teal-600',
    purple: 'from-purple-500 to-indigo-600',
    cyan: 'from-cyan-500 to-teal-600',
    amber: 'from-amber-500 to-orange-600',
  }

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl p-4 shadow-soft border border-light-border dark:border-dark-border mb-3 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{zikr.emoji}</span>
          <div>
            <p className="font-bold text-main text-sm">{zikr.name}</p>
            <p className="text-xs text-sub">هدف: {zikr.target}</p>
          </div>
        </div>
        <button
          onClick={() => setCount(0)}
          className="w-8 h-8 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center"
        >
          <RefreshCw size={14} className="text-sub" />
        </button>
      </div>

      {!isComplete ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCount(count + 1)}
            className={`flex-1 bg-gradient-to-l ${colorMap[zikr.color]} text-white py-3 rounded-xl font-bold text-lg shadow-sm active:scale-95 transition-transform`}
          >
            +1
          </button>
          <button
            onClick={() => setCount(count + 10)}
            className={`px-4 bg-gradient-to-l ${colorMap[zikr.color]} text-white py-3 rounded-xl font-bold shadow-sm active:scale-95 transition-transform opacity-90`}
          >
            +۱۰
          </button>
          <div className="bg-light-bg dark:bg-dark-bg rounded-xl px-4 py-3 min-w-[60px] text-center">
            <p className="font-bold text-main">{count}</p>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-l from-emerald-500 to-teal-600 text-white rounded-xl py-3 text-center font-bold flex items-center justify-center gap-2 shadow-sm">
          <Sparkles size={18} />
          تکمیل شد! ({count})
        </div>
      )}

      {!isComplete && count > 0 && (
        <div className="mt-3 h-1.5 bg-light-bg dark:bg-dark-bg rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-l ${colorMap[zikr.color]} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

function PrayerItem({ prayer }) {
  const [open, setOpen] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState(null)

  const colorMap = {
    emerald: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300',
    sky: 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300',
    amber: 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300',
    rose: 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300',
    purple: 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
    cyan: 'bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300',
  }

  const copyText = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-soft border border-light-border dark:border-dark-border mb-3 overflow-hidden transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center justify-between text-right"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${colorMap[prayer.color]} flex items-center justify-center`}>
            <BookOpen size={18} />
          </div>
          <div>
            <p className="font-bold text-main text-sm">{prayer.name}</p>
            <p className="text-xs text-sub">{prayer.time}</p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-sub transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-light-border dark:border-dark-border">
          {prayer.sections.map((section, idx) => (
            <div key={idx} className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-brand-600 dark:text-brand-400 text-xs">
                  ● {section.title}
                </h4>
                <button
                  onClick={() => copyText(section.text, idx)}
                  className="flex items-center gap-1 text-[10px] text-sub bg-light-bg dark:bg-dark-bg px-2 py-1 rounded-lg"
                >
                  {copiedIdx === idx ? <><Check size={10} /> کپی شد</> : <><Copy size={10} /> کپی</>}
                </button>
              </div>
              <p className="text-sm text-main leading-loose text-justify bg-light-bg dark:bg-dark-bg p-3 rounded-xl" dir="rtl" style={{ fontFamily: 'Vazirmatn, serif' }}>
                {section.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Prayers() {
  const [tab, setTab] = useState('zikr')

  return (
    <main className="p-4 max-w-md mx-auto pb-24 animate-fade-in">
      <div className="text-center mt-6 mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-l from-emerald-500 to-teal-600 rounded-2xl shadow-glow-sm mb-3">
          <Heart className="text-white" size={28} />
        </div>
        <h1 className="text-2xl font-bold text-brand-600 dark:text-brand-400">دعا و اذکار</h1>
        <p className="text-sm text-sub mt-1">قلبت را با یاد او روشن کن</p>
      </div>

      <div className="bg-white dark:bg-dark-surface rounded-2xl p-1.5 flex gap-1.5 mb-6 shadow-soft border border-light-border dark:border-dark-border">
        <button
          onClick={() => setTab('zikr')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
            tab === 'zikr'
              ? 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white shadow-glow-sm'
              : 'text-sub'
          }`}
        >
          📿 اذکار
        </button>
        <button
          onClick={() => setTab('prayers')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
            tab === 'prayers'
              ? 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white shadow-glow-sm'
              : 'text-sub'
          }`}
        >
          🤲 ادعیه
        </button>
      </div>

      {tab === 'zikr' ? (
        <div className="animate-fade-in">
          <p className="text-xs text-sub mb-3 px-1 flex items-center gap-1">
            <Star size={12} />
            هدف را کامل کن تا پاداش بگیری
          </p>
          {zikrList.map((z) => <ZikrCard key={z.id} zikr={z} />)}
        </div>
      ) : (
        <div className="animate-fade-in">
          <p className="text-xs text-sub mb-3 px-1 flex items-center gap-1">
            <Star size={12} />
            روی هر دعا بزن تا متن کامل باز شود
          </p>
          {prayersData.map((p) => <PrayerItem key={p.id} prayer={p} />)}
        </div>
      )}
    </main>
  )
}
