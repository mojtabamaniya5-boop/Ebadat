import { useState, useEffect } from 'react'
import {
  Sparkles, Heart, RefreshCw, ChevronDown, BookOpen, Star,
  Copy, Check, Plus, X, Trash2, ExternalLink
} from 'lucide-react'
import { prayersData } from '../data/prayers'

const DEFAULT_ZIKRS = [
  { id: 'salawat', name: 'صلوات', target: 100, emoji: '💚', color: 'rose', custom: false },
  { id: 'istighfar', name: 'استغفار', target: 100, emoji: '🤲', color: 'sky', custom: false },
  { id: 'tahlil', name: 'لا اله الا الله', target: 100, emoji: '☪️', color: 'emerald', custom: false },
  { id: 'tasbihat', name: 'تسبیحات حضرت زهرا (س)', target: 34, emoji: '💎', color: 'purple', custom: false },
  { id: 'younesi', name: 'ذکر یونسیه', target: 400, emoji: '🐋', color: 'cyan', custom: false },
  { id: 'faraj', name: 'دعای فرج', target: 10, emoji: '✨', color: 'amber', custom: false },
]

const COLORS = ['rose', 'sky', 'emerald', 'purple', 'cyan', 'amber', 'pink', 'indigo']
const EMOJIS = ['📿', '💚', '✨', '🌟', '🤲', '💎', '🌸', '☪️', '🕋', '🕌', '💫', '🌙', '⭐', '🔥']

const colorMap = {
  rose: 'from-rose-500 to-pink-600',
  sky: 'from-sky-500 to-blue-600',
  emerald: 'from-emerald-500 to-teal-600',
  purple: 'from-purple-500 to-indigo-600',
  cyan: 'from-cyan-500 to-teal-600',
  amber: 'from-amber-500 to-orange-600',
  pink: 'from-pink-500 to-rose-600',
  indigo: 'from-indigo-500 to-purple-600',
}

function ZikrCard({ zikr, onDelete }) {
  const [count, setCount] = useState(0)
  const [bubbles, setBubbles] = useState([])
  const progress = Math.min((count / zikr.target) * 100, 100)
  const isComplete = count >= zikr.target

  const handleDelete = () => {
    if (window.confirm(`ذکر «${zikr.name}» حذف بشه؟`)) {
      onDelete(zikr.id)
    }
  }

  const handleCount = (amount) => {
    setCount(prev => prev + amount)
    // اضافه کردن بادکنک
    const newBubbles = []
    for (let i = 0; i < Math.min(amount, 5); i++) {
      newBubbles.push({
        id: Date.now() + i,
        x: 20 + Math.random() * 60,
        size: 30 + Math.random() * 30,
        delay: i * 0.05,
      })
    }
    setBubbles(prev => [...prev, ...newBubbles])
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => !newBubbles.find(nb => nb.id === b.id)))
    }, 1500)
  }

  return (
    <div className="relative bg-white dark:bg-dark-surface rounded-2xl p-4 shadow-soft border border-light-border dark:border-dark-border mb-3 transition-colors overflow-hidden">
      {/* افکت لیکوئید پس‌زمینه */}
      <div className={`absolute inset-0 bg-gradient-to-bl ${colorMap[zikr.color]} opacity-[0.03] dark:opacity-[0.06] pointer-events-none`} />

      {/* بادکنک‌های شناور */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map(b => (
          <div
            key={b.id}
            className="absolute animate-balloon-up"
            style={{
              left: `${b.x}%`,
              bottom: '20%',
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
            }}
          >
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${colorMap[zikr.color]} opacity-60 shadow-lg`}>
              <div className="w-1/3 h-1/4 bg-white/60 rounded-full mt-1 ml-1 blur-[1px]" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{zikr.emoji}</span>
            <div>
              <p className="font-bold text-main text-sm flex items-center gap-1.5">
                {zikr.name}
                {zikr.custom && (
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 font-bold">
                    شخصی
                  </span>
                )}
              </p>
              <p className="text-xs text-sub">هدف: {zikr.target}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCount(0)}
              className="w-8 h-8 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center"
            >
              <RefreshCw size={14} className="text-sub" />
            </button>
            {zikr.custom && (
              <button
                onClick={handleDelete}
                className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center"
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            )}
          </div>
        </div>

        {!isComplete ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCount(1)}
              className={`flex-1 relative bg-gradient-to-l ${colorMap[zikr.color]} text-white py-3 rounded-xl font-bold text-lg shadow-sm active:scale-95 transition-transform overflow-hidden group`}
            >
              {/* افکت لیکوئید روی دکمه */}
              <span className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity" />
              <span className="relative">+1</span>
            </button>
            <button
              onClick={() => handleCount(10)}
              className={`px-4 bg-gradient-to-l ${colorMap[zikr.color]} text-white py-3 rounded-xl font-bold shadow-sm active:scale-95 transition-transform opacity-90`}
            >
              +۱۰
            </button>
            <div className="relative bg-light-bg dark:bg-dark-bg rounded-xl px-4 py-3 min-w-[60px] text-center overflow-hidden">
              <div
                className={`absolute bottom-0 right-0 left-0 bg-gradient-to-t ${colorMap[zikr.color]} opacity-20 transition-all duration-700`}
                style={{ height: `${progress}%` }}
              />
              <p className="relative font-bold text-main">{count}</p>
            </div>
          </div>
        ) : (
          <div className="relative bg-gradient-to-l from-emerald-500 to-teal-600 text-white rounded-xl py-3 text-center font-bold flex items-center justify-center gap-2 shadow-sm overflow-hidden">
            <div className="absolute inset-0 animate-shimmer" />
            <Sparkles size={18} className="relative z-10" />
            <span className="relative z-10">تکمیل شد! ({count})</span>
          </div>
        )}

        {!isComplete && count > 0 && (
          <div className="mt-3 h-1.5 bg-light-bg dark:bg-dark-bg rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-l ${colorMap[zikr.color]} transition-all duration-500 relative`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AddZikrModal({ onClose, onAdd }) {
  const [name, setName] = useState('')
  const [target, setTarget] = useState(33)
  const [emoji, setEmoji] = useState('📿')
  const [color, setColor] = useState('emerald')

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('اسم ذکر رو بنویس')
      return
    }
    onAdd({
      id: 'custom_' + Date.now(),
      name: name.trim(),
      target: Number(target) || 33,
      emoji,
      color,
      custom: true,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-dark-surface rounded-t-3xl sm:rounded-3xl p-5 pb-28 sm:pb-5 w-full sm:max-w-sm shadow-glow-lg animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* دستگیره */}
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-main flex items-center gap-2">
            <Plus size={20} className="text-brand-500" />
            ذکر جدید
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center">
            <X size={16} className="text-sub" />
          </button>
        </div>

        {/* پیش‌نمایش */}
        <div className={`relative overflow-hidden rounded-2xl p-4 mb-5 bg-gradient-to-bl ${colorMap[color]} text-white shadow-glow-sm`}>
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/20 rounded-full blur-xl" />
          <div className="relative flex items-center gap-3">
            <span className="text-3xl">{emoji}</span>
            <div>
              <p className="font-bold text-sm">{name || 'اسم ذکر'}</p>
              <p className="text-xs text-white/80">هدف: {target}</p>
            </div>
          </div>
        </div>

        {/* اسم */}
        <label className="block text-xs font-bold text-sub mb-2">اسم ذکر</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلاً: یا رب، یا غفور، ..."
          className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-sm text-main outline-none focus:ring-2 focus:ring-brand-500 mb-4"
          autoFocus
        />

        {/* هدف */}
        <label className="block text-xs font-bold text-sub mb-2">تعداد هدف</label>
        <div className="flex gap-2 mb-2">
          {[10, 33, 100, 500].map(n => (
            <button
              key={n}
              onClick={() => setTarget(n)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                target === n
                  ? 'bg-brand-500 text-white shadow-glow-sm'
                  : 'bg-light-bg dark:bg-dark-bg text-sub'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl px-4 py-3 text-sm text-main outline-none focus:ring-2 focus:ring-brand-500 mb-4"
        />

        {/* ایموجی */}
        <label className="block text-xs font-bold text-sub mb-2">آیکون</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {EMOJIS.map(e => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              className={`w-10 h-10 rounded-xl text-xl transition ${
                emoji === e ? 'bg-brand-100 dark:bg-brand-900/40 ring-2 ring-brand-500 scale-110' : 'bg-light-bg dark:bg-dark-bg'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        {/* رنگ */}
        <label className="block text-xs font-bold text-sub mb-2">رنگ</label>
        <div className="flex flex-wrap gap-2 mb-5">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-10 h-10 rounded-xl bg-gradient-to-l ${colorMap[c]} transition ${
                color === c ? 'ring-2 ring-offset-2 ring-brand-500 scale-110' : ''
              }`}
            />
          ))}
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-light-bg dark:bg-dark-bg text-main font-bold text-sm active:scale-95 transition"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-gradient-to-l from-brand-500 to-brand-600 text-white font-bold text-sm shadow-glow-sm active:scale-95 transition"
          >
            افزودن ذکر
          </button>
        </div>
      </div>
    </div>
  )
}

function PrayerItem({ prayer }) {
  const [open, setOpen] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState(null)

  const pColorMap = {
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
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-center justify-between text-right">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${pColorMap[prayer.color]} flex items-center justify-center`}>
            <BookOpen size={18} />
          </div>
          <div>
            <p className="font-bold text-main text-sm">{prayer.name}</p>
            <p className="text-xs text-sub">{prayer.time}</p>
          </div>
        </div>
        <ChevronDown size={20} className={`text-sub transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-light-border dark:border-dark-border">
          {prayer.sections.map((section, idx) => (
            <div key={idx} className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-brand-600 dark:text-brand-400 text-xs">● {section.title}</h4>
                <button onClick={() => copyText(section.text, idx)} className="flex items-center gap-1 text-[10px] text-sub bg-light-bg dark:bg-dark-bg px-2 py-1 rounded-lg">
                  {copiedIdx === idx ? <><Check size={10} /> کپی شد</> : <><Copy size={10} /> کپی</>}
                </button>
              </div>
              <p className="text-sm text-main leading-loose text-justify bg-light-bg dark:bg-dark-bg p-3 rounded-xl" dir="rtl">
                {section.text}
              </p>
            </div>
          ))}
          <a
            href={prayer.fullLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-l from-brand-500 to-brand-600 text-white py-3 rounded-xl font-bold text-sm shadow-glow-sm active:scale-95 transition"
          >
            <ExternalLink size={16} />
            متن کامل در سایت عرفان
          </a>
        </div>
      )}
    </div>
  )
}

export default function Prayers() {
  const [tab, setTab] = useState('zikr')
  const [zikrs, setZikrs] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ebadat-custom-zikrs') || '[]')
      setZikrs([...DEFAULT_ZIKRS, ...saved])
    } catch {
      setZikrs(DEFAULT_ZIKRS)
    }
  }, [])

  const addZikr = (newZikr) => {
    const custom = zikrs.filter(z => z.custom)
    const updated = [...custom, newZikr]
    localStorage.setItem('ebadat-custom-zikrs', JSON.stringify(updated))
    setZikrs([...DEFAULT_ZIKRS, ...updated])
  }

  const deleteZikr = (id) => {
    const custom = zikrs.filter(z => z.custom && z.id !== id)
    localStorage.setItem('ebadat-custom-zikrs', JSON.stringify(custom))
    setZikrs([...DEFAULT_ZIKRS, ...custom])
  }

  return (
    <main className="p-4 max-w-md mx-auto pb-28 animate-fade-in">
      <div className="text-center mt-6 mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-l from-emerald-500 to-teal-600 rounded-2xl shadow-glow-sm mb-3 animate-float-slow">
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
          {zikrs.map((z) => (
            <ZikrCard key={z.id} zikr={z} onDelete={deleteZikr} />
          ))}

          {/* راهنما */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-bl from-brand-50 to-teal-50 dark:from-brand-950/30 dark:to-teal-950/20 border border-brand-200 dark:border-brand-900/40 text-center">
            <p className="text-xs text-brand-700 dark:text-brand-300 leading-relaxed">
              ✨ با دکمه‌ی <strong>پایین-راست</strong> می‌تونی ذکر شخصی خودت رو اضافه کنی
            </p>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <p className="text-xs text-sub mb-3 px-1 flex items-center gap-1">
            <Star size={12} />
            برای متن کامل روی دکمه پایین هر دعا بزن
          </p>
          {prayersData.map((p) => <PrayerItem key={p.id} prayer={p} />)}
        </div>
      )}

      {/* دکمه شناور افزودن ذکر */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 left-4 z-40 flex items-center gap-2 bg-gradient-to-l from-brand-500 to-brand-600 text-white pl-4 pr-5 py-3.5 rounded-full shadow-glow active:scale-95 transition animate-pulse-glow"
        aria-label="افزودن ذکر جدید"
      >
        <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center">
          <Plus size={20} strokeWidth={3} />
        </div>
        <span className="text-sm font-bold">ذکر جدید</span>
      </button>

      {showAddModal && (
        <AddZikrModal
          onClose={() => setShowAddModal(false)}
          onAdd={addZikr}
        />
      )}
    </main>
  )
}
