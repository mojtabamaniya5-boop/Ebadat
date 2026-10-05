/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { vazir: ['Vazirmatn', 'sans-serif'] },
      colors: {
        // پالت تم روشن: نسیم صبح
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          text: '#1E293B',
          textSecondary: '#64748B',
        },
        // پالت تم تاریک: شب آرام
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          border: '#334155',
          text: '#F1F5F9',
          textSecondary: '#94A3B8',
        },
        // رنگ تاکیدی
        brand: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 24px rgba(20, 184, 166, 0.35)',
        'glow-sm': '0 0 12px rgba(20, 184, 166, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(12px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(20, 184, 166, 0.25)' },
          '50%': { boxShadow: '0 0 24px rgba(20, 184, 166, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
