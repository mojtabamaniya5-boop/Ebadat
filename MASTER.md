# 📘 سند مادر — نسخه ۴.۰ (نسخه نهایی)

> این سند حاصل ۵ ساعت جنگیدن با Next.js و یادگیری از شکست‌هاست.
> تاریخ: ۱۴۰۵/۰۷/۱۳

## ⚖️ ۶ قانون طلایی (The Golden Rules)

1. **هرگز Next.js. فقط Vite + React + JavaScript.**
2. **هرگز TypeScript. فقط JavaScript خالص.**
3. **بیلد روی گوشی فقط با Vite (۳ ثانیه). بقیه ابزارها ممنوع.**
4. **هرگز GitHub Actions. فقط push مستقیم.**
5. **خروجی بیلد = پوشه `docs/` در شاخه `main`.**
6. **همیشه در مرورگر Incognito تست کن.**

## 🧰 Tech Stack نهایی

| لایه | تکنولوژی |
|------|----------|
| Build Tool | Vite 5+ |
| UI Library | React 18 (JavaScript فقط) |
| Styling | Tailwind CSS 3 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |
| Deploy | GitHub Pages (main/docs) |
| Version Control | Git + GitHub |

## 🚀 چرخه کار (The Workflow)

1. کد جدید رو توی `src/` بنویس.
2. `npm run build` (فقط ۳ ثانیه).
3. `git add docs -f && git commit -m "..." && git push`
4. ۱ دقیقه صبر کن.
5. `username.github.io/Ebadat/` رو رفرش کن.

## ⚠️ اشتباهات تاریخی (درس‌های خونین)

- ❌ Next.js روی ARM64 = Turbopack crash
- ❌ TypeScript Strict = رد شدن تمام کدها
- ❌ `next dev` = WebSocket مشکل در مرورگر موبایل
- ❌ GitHub Actions = نیاز به توکن workflow
- ❌ بیلد ۵۶ ثانیه‌ای Next.js روی گوشی
- ✅ Vite: بیلد ۳ ثانیه، بدون هیچ مشکلی

## 📋 بلوپرینت پروژه: همراه معنوی

**فازها:**
- [x] فاز ۰: راه‌اندازی (Next.js - شکست خورد)
- [ ] فاز ۰ جدید: راه‌اندازی Vite (تمیز)
- [ ] فاز ۱: کامپوننت‌ها (BottomNav, Dashboard, Track, Coach, Analytics, Profile)
- [ ] فاز ۲: PWA + آفلاین
- [ ] فاز ۳: بک‌اند + هوش مصنوعی
- [ ] فاز ۴: انتشار در کافه بازار

**صفحات مورد نیاز:**
1. `/` — Dashboard (چالش، ثبت سریع، باغ معنوی)
2. `/track` — ثبت نماز، قرآن، صلوات
3. `/coach` — چت‌بات AI
4. `/analytics` — نمودارها
5. `/profile` — پروفایل

## 📝 لاگ کارها

### فاز ۰ قدیم: Next.js (۱۴۰۵/۰۷/۱۲) — ❌ شکست خورد
- ۲۲ دقیقه نصب اولیه
- Turbopack کرش روی ARM64
- TypeScript Strict همه کدها رو رد کرد
- GitHub Actions نیاز به توکن workflow
- بیلد ۵۶ ثانیه طول کشید

### فاز ۰ جدید: Vite (۱۴۰۵/۰۷/۱۳) — در حال انجام
- تصمیم به ریست کامل
- معماری جدید: Vite + React + JS
- Deploy: main/docs (بدون Actions)

**آخرین آپدیت:** ۱۴۰۵/۰۷/۱۳
**نسخه:** ۴.۰ (Final)
