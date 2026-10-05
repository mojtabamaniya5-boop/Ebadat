import { useState } from 'react'
import { Sparkles, Heart, RefreshCw, ChevronDown, BookOpen, Star } from 'lucide-react'

const zikrList = [
  { id: 'salawat', name: 'صلوات', target: 100, emoji: '💚', color: 'rose' },
  { id: 'istighfar', name: 'استغفار', target: 100, emoji: '🤲', color: 'sky' },
  { id: 'tahlil', name: 'لا اله الا الله', target: 100, emoji: '☪️', color: 'emerald' },
  { id: 'tasbihat', name: 'تسبیحات حضرت زهرا (س)', target: 34, emoji: '💎', color: 'purple' },
  { id: 'younesi', name: 'ذکر یونسیه', target: 400, emoji: '🐋', color: 'cyan' },
  { id: 'faraj', name: 'دعای فرج', target: 10, emoji: '✨', color: 'amber' },
]

const prayersList = [
  { id: 'komail', name: 'دعای کمیل', time: 'شب جمعه', color: 'emerald' },
  { id: 'tavasol', name: 'دعای توسل', time: 'شب سه‌شنبه', color: 'sky' },
  { id: 'nudbe', name: 'دعای ندبه', time: 'صبح جمعه', color: 'amber' },
  { id: 'ashura', name: 'زیارت عاشورا', time: 'هر روز', color: 'rose' },
  { id: 'ahd', name: 'دعای عهد', time: 'صبح‌ها', color: 'purple' },
  { id: 'yasin', name: 'آل یاسین', time: 'هر روز', color: 'cyan' },
]

function ZikrCard({ zikr }) {
  const [count, setCount] = useState(0)
  const [showTarget, setShowTarget] = useState(false)

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
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 mb-3 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{zikr.emoji}</span>
          <div>
            <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">{zikr.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">هدف: {zikr.target}</p>
          </div>
        </div>
        <button
          onClick={() => { setCount(0) }}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center"
        >
          <RefreshCw size={14} className="text-gray-500 dark:text-gray-300" />
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
          <div className="bg-gray-100 dark:bg-slate-700 rounded-xl px-4 py-3 min-w-[60px] text-center">
            <p className="font-bold text-gray-800 dark:text-gray-100">{count}</p>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-l from-emerald-500 to-teal-600 text-white rounded-xl py-3 text-center font-bold flex items-center justify-center gap-2 shadow-sm">
          <Sparkles size={18} />
          تکمیل شد! ({count})
        </div>
      )}

      {!isComplete && count > 0 && (
        <div className="mt-3 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
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
  const colorMap = {
    emerald: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300',
    sky: 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300',
    amber: 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300',
    rose: 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300',
    purple: 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
    cyan: 'bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300',
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-3 overflow-hidden transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center justify-between text-right"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${colorMap[prayer.color]} flex items-center justify-center`}>
            <BookOpen size={18} />
          </div>
          <div>
            <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">{prayer.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{prayer.time}</p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            متن کامل این دعا به زودی در این بخش قرار می‌گیرد. در حال حاضر می‌توانید با نیت خالص آن را از روی مفاتیح‌الجنان یا اپلیکیشن‌های مذهبی بخوانید. 🌱
          </p>
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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-l from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-3">
          <Heart className="text-white" size={28} />
        </div>
        <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">دعا و اذکار</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">قلبت را با یاد او روشن کن</p>
      </div>

      {/* تب‌ها */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-1.5 flex gap-1.5 mb-6 shadow-sm border border-gray-100 dark:border-slate-700">
        <button
          onClick={() => setTab('zikr')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
            tab === 'zikr'
              ? 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          📿 اذکار
        </button>
        <button
          onClick={() => setTab('prayers')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
            tab === 'prayers'
              ? 'bg-gradient-to-l from-emerald-500 to-teal-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          🤲 ادعیه و زیارات
        </button>
      </div>

      {/* محتوا */}
      {tab === 'zikr' ? (
        <div className="animate-fade-in">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 px-1 flex items-center gap-1">
            <Star size={12} />
            هدف را کامل کن تا پاداش بگیری
          </p>
          {zikrList.map((z) => <ZikrCard key={z.id} zikr={z} />)}
        </div>
      ) : (
        <div className="animate-fade-in">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 px-1 flex items-center gap-1">
            <Star size={12} />
            روی هر دعا بزن تا متن آن را ببینی
          </p>
          {prayersList.map((p) => <PrayerItem key={p.id} prayer={p} />)}
        </div>
      )}
    </main>
  )
}
