import { Link } from 'react-router-dom'

export default function EmptyState({ icon, title, description, actionLabel, actionTo, onAction }) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-8 text-center bg-gradient-to-bl from-brand-50 via-white to-cyan-50 dark:from-brand-950/30 dark:via-dark-surface dark:to-cyan-950/20 border border-brand-100 dark:border-brand-900/40 my-4">
      {/* هاله‌های رنگی */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-bl from-brand-400 to-brand-600 shadow-glow-sm mb-4 animate-float-slow">
          <span className="text-4xl">{icon}</span>
        </div>
        <h3 className="text-lg font-bold text-main mb-2">{title}</h3>
        <p className="text-sm text-sub leading-relaxed max-w-xs mx-auto mb-5">{description}</p>
        {actionLabel && (actionTo || onAction) && (
          actionTo ? (
            <Link
              to={actionTo}
              className="inline-flex items-center gap-2 bg-gradient-to-l from-brand-500 to-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-glow-sm active:scale-95 transition"
            >
              {actionLabel}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 bg-gradient-to-l from-brand-500 to-brand-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-glow-sm active:scale-95 transition"
            >
              {actionLabel}
            </button>
          )
        )}
      </div>
    </div>
  )
}
