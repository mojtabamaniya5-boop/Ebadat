import { useState, useEffect } from 'react'
import { Sparkles, Droplets } from 'lucide-react'
import { getTodayData } from '../utils/storage'
import { calculateTodayScore, getGardenStage, getProgress, getGardenHealth } from '../utils/garden'

export default function SpiritualGarden() {
  const [score, setScore] = useState(0)
  const [stage, setStage] = useState(null)
  const [progress, setProgress] = useState({ current: 0, next: 0, progress: 0 })
  const [health, setHealth] = useState(0)
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    const update = () => {
      const data = getTodayData()
      const s = calculateTodayScore(data)
      setScore(s)
      setStage(getGardenStage(s))
      setProgress(getProgress(s))
      setHealth(getGardenHealth())
      const h = new Date().getHours()
      setIsNight(h >= 19 || h < 6)
    }
    update()
    const interval = setInterval(update, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!stage) return null

  const stageKey = stage.stage
  const treeScale = {
    empty: 0,
    seed: 0.15,
    sprout: 0.3,
    plant: 0.55,
    tree: 0.75,
    blooming: 0.9,
    paradise: 1,
  }[stageKey] || 0

  const fireflies = {
    empty: 0, seed: 0, sprout: 1, plant: 2, tree: 3, blooming: 5, paradise: 8,
  }[stageKey] || 0

  const butterflies = {
    empty: 0, seed: 0, sprout: 0, plant: 1, tree: 1, blooming: 2, paradise: 3,
  }[stageKey] || 0

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

        {/* SVG Garden */}
        <div className="relative h-52 rounded-2xl overflow-hidden">
          <GardenSVG stage={stageKey} isNight={isNight} fireflies={fireflies} butterflies={butterflies} />
        </div>

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

function GardenSVG({ stage, isNight, fireflies, butterflies }) {
  const showTree = ['tree', 'blooming', 'paradise'].includes(stage)
  const showPlant = ['plant', 'tree', 'blooming', 'paradise'].includes(stage)
  const showSprout = ['sprout', 'plant', 'tree', 'blooming', 'paradise'].includes(stage)
  const showSeed = stage === 'seed'

  // رنگ آسمون
  const skyGradient = isNight
    ? { from: '#0a1128', via: '#1a1f3a', to: '#2d1b4e' }
    : { from: '#87CEEB', via: '#B0E0E6', to: '#FFF8DC' }

  return (
    <svg viewBox="0 0 400 208" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyGradient.from} />
          <stop offset="50%" stopColor={skyGradient.via} />
          <stop offset="100%" stopColor={skyGradient.to} />
        </linearGradient>
        <radialGradient id="sunGlow">
          <stop offset="0%" stopColor={isNight ? '#fff8dc' : '#FFD700'} stopOpacity="0.9" />
          <stop offset="40%" stopColor={isNight ? '#e0e0e0' : '#FFA500'} stopOpacity="0.5" />
          <stop offset="100%" stopColor={isNight ? '#e0e0e0' : '#FFA500'} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fireflyGlow">
          <stop offset="0%" stopColor="#FFEB3B" stopOpacity="1" />
          <stop offset="50%" stopColor="#FFC107" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFC107" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5D4037" />
          <stop offset="50%" stopColor="#8D6E63" />
          <stop offset="100%" stopColor="#4E342E" />
        </linearGradient>
        <radialGradient id="foliage">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="60%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </radialGradient>
        <radialGradient id="foliageLight">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="100%" stopColor="#388E3C" />
        </radialGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4E342E" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>
      </defs>

      {/* آسمون */}
      <rect width="400" height="208" fill="url(#sky)" />

      {/* ستاره‌ها (شب) */}
      {isNight && (
        <g>
          {[...Array(25)].map((_, i) => (
            <circle
              key={i}
              cx={(i * 17 + 13) % 400}
              cy={(i * 11 + 5) % 90}
              r={i % 3 === 0 ? 1.5 : 1}
              fill="white"
              opacity={0.3 + (i % 5) * 0.15}
              className="animate-pulse"
              style={{ animationDelay: `${(i % 7) * 0.3}s` }}
            />
          ))}
        </g>
      )}

      {/* خورشید / ماه */}
      <circle cx="340" cy="45" r="50" fill="url(#sunGlow)" opacity="0.7" />
      <circle cx="340" cy="45" r="18" fill={isNight ? '#F5F5DC' : '#FFD700'} />
      {isNight && (
        <circle cx="348" cy="42" r="18" fill={skyGradient.from} opacity="0.9" />
      )}

      {/* ابر */}
      <g opacity="0.7">
        <ellipse cx="70" cy="35" rx="25" ry="8" fill="white" opacity="0.8" />
        <ellipse cx="85" cy="32" rx="18" ry="10" fill="white" opacity="0.9" />
        <ellipse cx="55" cy="33" rx="15" ry="7" fill="white" opacity="0.85" />
      </g>
      <g opacity="0.5">
        <ellipse cx="200" cy="55" rx="20" ry="6" fill="white" opacity="0.7" />
        <ellipse cx="215" cy="52" rx="14" ry="8" fill="white" opacity="0.8" />
      </g>

      {/* تپه‌های پس‌زمینه */}
      <path d="M0,160 Q100,120 200,150 T400,140 L400,208 L0,208 Z" fill="#2E5D3A" opacity="0.5" />

      {/* زمین */}
      <path d="M0,170 Q200,150 400,170 L400,208 L0,208 Z" fill="#2E7D32" />
      <path d="M0,180 Q200,168 400,180 L400,208 L0,208 Z" fill="url(#ground)" />

      {/* چمن */}
      {[30, 70, 120, 180, 240, 300, 350].map((x, i) => (
        <g key={i}>
          <path d={`M${x},180 Q${x + 2},172 ${x + 4},180`} stroke="#66BB6A" strokeWidth="1.5" fill="none" />
          <path d={`M${x + 5},180 Q${x + 7},174 ${x + 9},180`} stroke="#81C784" strokeWidth="1" fill="none" />
        </g>
      ))}

      {/* بذر */}
      {showSeed && (
        <ellipse cx="200" cy="175" rx="6" ry="4" fill="#8D6E63" />
      )}

      {/* جوانه */}
      {showSprout && (
        <g>
          <path d="M200,180 Q198,165 200,155" stroke="#66BB6A" strokeWidth="2" fill="none" />
          <ellipse cx="194" cy="160" rx="5" ry="3" fill="#81C784" transform="rotate(-30 194 160)" />
          <ellipse cx="206" cy="158" rx="5" ry="3" fill="#A5D6A7" transform="rotate(30 206 158)" />
        </g>
      )}

      {/* درخت کامل */}
      {showTree && (
        <g className="animate-sway" style={{ transformOrigin: '200px 180px' }}>
          {/* ریشه */}
          <path d="M190,180 Q200,175 210,180" stroke="#4E342E" strokeWidth="3" fill="none" />
          {/* تنه */}
          <path d="M197,178 L196,145 Q200,140 204,145 L203,178 Z" fill="url(#trunk)" />
          {/* شاخه‌ها */}
          <path d="M199,155 Q190,145 185,140" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M201,155 Q210,148 215,142" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M199,148 Q193,142 190,138" stroke="#5D4037" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* برگ‌ها - لایه‌های مختلف */}
          <circle cx="185" cy="135" r="14" fill="url(#foliage)" />
          <circle cx="215" cy="135" r="13" fill="url(#foliage)" />
          <circle cx="200" cy="125" r="16" fill="url(#foliageLight)" />
          <circle cx="188" cy="120" r="12" fill="url(#foliage)" />
          <circle cx="212" cy="122" r="11" fill="url(#foliageLight)" />
          <circle cx="200" cy="115" r="10" fill="url(#foliageLight)" />
          <circle cx="175" cy="140" r="9" fill="url(#foliage)" opacity="0.9" />
          <circle cx="225" cy="140" r="9" fill="url(#foliage)" opacity="0.9" />
          {/* شکوفه‌ها برای مرحله blooming و paradise */}
          {(stage === 'blooming' || stage === 'paradise') && (
            <>
              <circle cx="180" cy="125" r="3" fill="#FFB6C1" />
              <circle cx="218" cy="130" r="2.5" fill="#FFB6C1" />
              <circle cx="195" cy="118" r="2.5" fill="#FFC1CC" />
              <circle cx="210" cy="115" r="3" fill="#FFB6C1" />
              <circle cx="188" cy="132" r="2" fill="#FFC1CC" />
              <circle cx="203" cy="128" r="2" fill="#FFB6C1" />
            </>
          )}
        </g>
      )}

      {/* گل‌های روی زمین */}
      {(stage === 'plant' || stage === 'tree' || stage === 'blooming' || stage === 'paradise') && (
        <g>
          {[
            { x: 120, y: 178, color: '#FF6B9D' },
            { x: 280, y: 178, color: '#FFC107' },
            { x: 100, y: 180, color: '#9C27B0' },
          ].map((f, i) => (
            <g key={i}>
              <circle cx={f.x} cy={f.y - 4} r="3" fill={f.color} />
              <circle cx={f.x} cy={f.y - 4} r="1.5" fill="#FFEB3B" />
              <path d={`M${f.x},${f.y} L${f.x},${f.y - 1}`} stroke="#4CAF50" strokeWidth="1" />
            </g>
          ))}
        </g>
      )}

      {/* کرم شب‌تاب */}
      {[...Array(fireflies)].map((_, i) => {
        const x = 60 + (i * 45) % 280
        const y = 90 + (i * 25) % 60
        const delay = (i * 0.4) % 2
        return (
          <g key={i} className="animate-float" style={{ animationDelay: `${delay}s` }}>
            <circle cx={x} cy={y} r="8" fill="url(#fireflyGlow)" opacity="0.5" className="animate-pulse" style={{ animationDelay: `${delay}s` }} />
            <circle cx={x} cy={y} r="2" fill="#FFEB3B" />
          </g>
        )
      })}

      {/* پروانه‌ها */}
      {[...Array(butterflies)].map((_, i) => {
        const x = 80 + (i * 90) % 240
        const y = 80 + (i * 15) % 40
        const delay = i * 0.8
        return (
          <g key={i} className="animate-fly" style={{ animationDelay: `${delay}s` }}>
            <ellipse cx={x - 3} cy={y} rx="4" ry="6" fill="#FF6B9D" opacity="0.85" className="animate-flap" />
            <ellipse cx={x + 3} cy={y} rx="4" ry="6" fill="#FF6B9D" opacity="0.85" className="animate-flap" style={{ animationDelay: '0.1s' }} />
            <ellipse cx={x} cy={y} rx="1" ry="5" fill="#333" />
          </g>
        )
      })}

      {/* استایل انیمیشن‌ها */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-4px) translateX(3px); }
          50% { transform: translateY(-6px) translateX(-2px); }
          75% { transform: translateY(-3px) translateX(4px); }
        }
        @keyframes fly {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -8px); }
          50% { transform: translate(40px, 0); }
          75% { transform: translate(20px, 8px); }
        }
        @keyframes flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fly { animation: fly 6s ease-in-out infinite; }
        .animate-flap { animation: flap 0.3s ease-in-out infinite; }
        .animate-sway { animation: sway 4s ease-in-out infinite; }
      `}</style>
    </svg>
  )
}
