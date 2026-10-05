import { Calendar, CheckCircle2, Sparkles } from 'lucide-react'

export default function Dashboard() {
  return (
    <main className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">سلام، مجتبی 👋</h1>
          <p className="text-sm text-gray-500 mt-1">امروز ۱۳ مهر ۱۴۰۵</p>
        </div>
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
          <Calendar className="text-emerald-600" size={22} />
        </div>
      </div>

      <div className="bg-gradient-to-l from-emerald-500 to-emerald-700 rounded-2xl p-5 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full mb-3 inline-block">چالش امروز</span>
          <h2 className="text-lg font-bold mb-2">به یک نیازمند کمک کن</h2>
          <p className="text-emerald-50 text-sm mb-4">امروز یک کار نیک انجام بده و امتیاز ۱۰ واحد بگیر.</p>
          <button className="bg-white text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-emerald-50 transition">
            انجام دادم
          </button>
        </div>
        <Sparkles className="absolute -left-4 -bottom-4 text-emerald-400/30" size={96} />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-500" />
          ثبت سریع اعمال
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-emerald-50 text-emerald-700 py-3 rounded-xl font-medium text-sm">ثبت نماز</button>
          <button className="bg-amber-50 text-amber-700 py-3 rounded-xl font-medium text-sm">تلاوت قرآن</button>
          <button className="bg-blue-50 text-blue-700 py-3 rounded-xl font-medium text-sm">صلوات و ذکر</button>
          <button className="bg-purple-50 text-purple-700 py-3 rounded-xl font-medium text-sm">دعا و زیارت</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3">باغ معنوی شما 🌱</h3>
        <div className="h-32 bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200 border-dashed">
          <p className="text-emerald-600 text-sm font-medium">باغ شما در حال رشد است...</p>
        </div>
      </div>
    </main>
  )
}
