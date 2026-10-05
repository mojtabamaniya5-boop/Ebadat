import { useState, useEffect } from 'react'
import { Sparkles, Droplets } from 'lucide-react'
import { getTodayData } from '../utils/storage'
import { calculateTodayScore, getGardenStage, getProgress, getGardenHealth } from '../utils/garden'

export default function SpiritualGarden() {
  const [score, setScore] = useState(0)
  const [stage, setStage] = useState(null)
  const [progress, setProgress] = useState({ current: 0, next: 0, progress: 0 })
  const [health, setHealth] = useState(0)

  useEffect(() => {
    const update = () => {
      const data = getTodayData()
      const s = calculateTodayScore(data)
      setScore(s)
      setStage(getGardenStage(s))
      setProgress(getProgress(s))
      setHealth(getGardenHealth())
    }
    update()
    const interval = setInterval(update, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!stage) return null

  return (
    <div className="card p-5 mb-6 overflow-hidden relative">
      {/* هاله پس‌زمینه */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* هدر */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-brand-500" />
            <h3 className="font-bold text-main text-sm">باغ معنوی شما</h3>
          </div>
          <div className="flex items-center gap-1 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-full">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{score}</span>
            <span className="text-[10px] text-brand-500">امتیاز</span>
          </div>
        </div>

        {/* باغ SVG */}
        <GardenVisual stage={stage.stage} />

        {/* اطلاعات */}
        <div className="text-center mt-4">
          <p className="text-sm font-bold text-main">
            {stage.emoji} {stage.title}
          </p>
          {progress.current < progress.next ? (
            <>
              <p className="text-xs text-sub mt-1">
                {progress.next - score} امتیاز تا مرحله بعد
              </p>
              {/* نوار پیشرفت */}
              <div className="mt-3 bg-light-bg dark:bg-dark-bg rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-l from-brand-400 to-brand-600 transition-all duration-1000 shadow-glow-sm"
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
            </>
          ) : (
            <p className="text-xs text-brand-500 mt-1 font-bold">🌟 باغ تو کامل شد!</p>
          )}
        </div>

        {/* سلامت باغ */}
        {health > 0 && (
          <div className="mt-3 flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl py-2 px-3">
            <Droplets size={14} className="text-emerald-500" />
            <span className="text-xs text-emerald-700 dark:text-emerald-300">
              <strong>{health}</strong> روز پشت هم آبیاری کردی 🌿
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function GardenVisual({ stage }) {
  return (
    <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900">
      {/* آسمان - خورشید */}
      <div className="absolute top-3 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg shadow-amber-400/50 animate-pulse" />

      {/* ابرها */}
      <div className="absolute top-5 left-4 w-12 h-3 bg-white/70 rounded-full blur-[2px]" />
      <div className="absolute top-6 left-6 w-8 h-3 bg-white/60 rounded-full blur-[2px]" />
      <div className="absolute top-8 left-2 w-10 h-2 bg-white/50 rounded-full blur-[2px]" />

      {/* زمین */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500 dark:from-amber-900 dark:via-amber-800 dark:to-amber-700" />

      {/* خاک سبز روشن */}
      <div className="absolute bottom-8 left-0 right-0 h-4 bg-gradient-to-t from-emerald-600 to-emerald-500 dark:from-emerald-900 dark:to-emerald-800 rounded-t-full opacity-60" />

      {/* گیاه و درخت */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        {stage === 'empty' && (
          <div className="text-center">
            <p className="text-3xl">🏜️</p>
            <p className="text-[10px] text-amber-800 dark:text-amber-400 mt-1">زمین تشنه</p>
          </div>
        )}

        {stage === 'seed' && (
          <div className="relative animate-bounce" style={{ animationDuration: '2s' }}>
            <div className="w-6 h-4 bg-amber-800 rounded-full mx-auto shadow-md" />
            <div className="w-8 h-2 bg-amber-700/50 rounded-full mx-auto -mt-1 blur-sm" />
            <p className="text-[10px] text-amber-800 dark:text-amber-400 mt-2 text-center">🌰 بذر</p>
          </div>
        )}

        {stage === 'sprout' && (
          <div className="relative">
            <div className="w-1 h-6 bg-emerald-600 mx-auto rounded-full" />
            <div className="text-2xl -mt-2">🌱</div>
          </div>
        )}

        {stage === 'plant' && (
          <div className="relative animate-sway">
            <div className="w-1.5 h-10 bg-emerald-700 mx-auto rounded-full" />
            <div className="text-3xl -mt-4">🌿</div>
          </div>
        )}

        {stage === 'tree' && (
          <div className="relative">
            <div className="text-5xl animate-sway" style={{ animationDuration: '4s' }}>🌳</div>
          </div>
        )}

        {stage === 'blooming' && (
          <div className="relative">
            <div className="text-5xl animate-sway" style={{ animationDuration: '4s' }}>🌸</div>
            <div className="absolute -top-2 -right-4 text-lg animate-pulse">✨</div>
          </div>
        )}

        {stage === 'paradise' && (
          <div className="relative">
            <div className="text-5xl animate-sway" style={{ animationDuration: '3s' }}>🌳</div>
            <div className="absolute -top-4 -left-6 text-2xl animate-bounce" style={{ animationDuration: '3s' }}>🦋</div>
            <div className="absolute -top-2 -right-4 text-lg animate-pulse">🌸</div>
            <div className="absolute -bottom-1 -left-2 text-base">🌷</div>
            <div className="absolute -bottom-1 -right-2 text-base">🌻</div>
          </div>
        )}
      </div>

      {/* ابرهای پایین برای حال و هوا */}
      <div className="absolute bottom-10 left-0 right-0 h-0.5 bg-white/20" />
    </div>
  )
}
