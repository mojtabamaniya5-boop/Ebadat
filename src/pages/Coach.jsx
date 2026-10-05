import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { getTodayData } from '../utils/storage'

const ATRIA_API_KEY = 'atr_9YUiFbZJD_QGOdlx5sanX8VxOhOrD4D_';
const API_URL = 'https://api.atria-asi.ai/v1/chat/completions';
const MODEL_NAME = 'Atria-Dawn-Preview';

// پاسخ‌های محلی برای سوالات مربوط به وضعیت کاربر
function getLocalStatusReply(text, userData) {
  const clean = text.replace(/[؟?!.،,]/g, '');
  const prayerNames = { fajr: 'صبح', dhuhr: 'ظهر', asr: 'عصر', maghrib: 'مغرب', isha: 'عشا' };
  
  const qazaList = Object.entries(userData.prayers || {})
    .filter(([k, v]) => v === 'qaza')
    .map(([k]) => prayerNames[k]);
  const doneList = Object.entries(userData.prayers || {})
    .filter(([k, v]) => v && v !== 'qaza')
    .map(([k]) => prayerNames[k]);

  // سوال درباره قضا
  if (clean.includes('قضا') && (clean.includes('چند') || clean.includes('چندتا') || clean.includes('چند تا'))) {
    if (qazaList.length === 0) return 'امروز هیچ نماز قضایی نداری! آفرین رفیق 🌱';
    return `امروز ${qazaList.length} نماز قضا داری: ${qazaList.join('، ')}. نگران نباش، می‌تونی جبران کنی 💚`;
  }
  
  // سوال درباره تعداد نماز
  if ((clean.includes('چند') || clean.includes('چندتا')) && clean.includes('نماز') && !clean.includes('قضا')) {
    return `امروز ${doneList.length} از ۵ نماز رو خوندی. ${doneList.length === 5 ? 'عالی بود! 🌟' : 'ادامه بده رفیق!'}`;
  }

  // سوال درباره قرآن
  if (clean.includes('قرآن') && (clean.includes('چند') || clean.includes('چقدر'))) {
    return `امروز ${userData.quran || 0} صفحه قرآن خوندی. ${userData.quran > 0 ? 'بارک‌الله! 🌿' : 'بیا یه صفحه هم بخونیم؟'}`;
  }

  // سوال درباره صلوات
  if (clean.includes('صلوات') && (clean.includes('چند') || clean.includes('چقدر'))) {
    return `امروز ${userData.salawat || 0} صلوات فرستادی. ${userData.salawat > 0 ? 'قبول باشه 🌸' : 'بیا چند تا بفرستیم؟'}`;
  }

  // سوال کلی درباره عملکرد
  if (clean.includes('چطور') && (clean.includes('بودم') || clean.includes('عملکرد'))) {
    const total = doneList.length;
    let emoji = total >= 5 ? '🌟' : total >= 3 ? '🌿' : '🌱';
    return `امروز ${total} نماز، ${userData.quran || 0} صفحه قرآن و ${userData.salawat || 0} صلوات. ${emoji}${qazaList.length > 0 ? ` فقط ${qazaList.length} قضا داری.` : ''}`;
  }

  // احوال‌پرسی ساده
  if (clean.includes('خوبی') || clean.includes('چطوری')) {
    return 'ممنون رفیق، خوبم! تو چطوری؟ 🌱';
  }
  if (clean === 'سلام' || clean.startsWith('سلام ')) {
    return 'سلام رفیق! خوبی؟ چه خبر؟ 🌱';
  }
  if (clean.includes('ممنون') || clean.includes('مرسی')) {
    return 'خواهش می‌کنم رفیق 🌱';
  }
  if (clean.includes('خداحافظ') || clean.includes('خدافظ') || clean.includes('بای')) {
    return 'خدانگهدار رفیق! مراقب خودت باش 🌱';
  }

  return null; // اگه هیچ‌کدوم نبود، برو AI
}

const SYSTEM_PROMPT = `تو "رفیق" هستی، یک همراه معنوی صمیمی و همدل.

قوانین فوق‌سخت:
- پاسخ کوتاه (حداکثر ۲۵ کلمه، ۱-۲ خط).
- لحن دوستانه، نه واعظانه.
- بدون شعار و کلیشه.
- اگه کاربر سوال احساسی/شخصی پرسید، همدلی کن و یه راهکار کوچیک بده.
- هرگز از خودت یا کد یا برنامه‌نویس حرف نزن.`;

export default function Coach() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'سلام رفیق! خوبی؟ چه خبر؟ 🌱' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const userData = getTodayData();
    
    // اول چک کن ببین پاسخ محلی داریم
    const localReply = getLocalStatusReply(input, userData);
    if (localReply) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: localReply }]);
      }, 400);
      return;
    }

    // اگه نه، بفرست به AI
    setLoading(true);
    const recentHistory = [...messages, userMessage].slice(-3);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ATRIA_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...recentHistory,
          ],
          max_tokens: 50,
          temperature: 0.8,
        }),
      });
      const data = await response.json();
      let content = data.choices?.[0]?.message?.content || 'یه لحظه مشکل خورد، دوباره بپرس.';
      if (content.length > 100) content = content.split(/[.!؟\n]/)[0] + '.';
      setMessages((prev) => [...prev, { role: 'assistant', content }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'اینترنت قطع شد، دوباره بزن.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-80px)] bg-mesh-light dark:bg-mesh-dark">
      {/* هدر */}
      <div className="flex-shrink-0 bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-b border-light-border dark:border-dark-border px-4 py-3 shadow-soft">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-l from-brand-400 to-brand-600 flex items-center justify-center shadow-glow-sm">
            <span className="text-white text-sm">🌱</span>
          </div>
          <div className="text-center">
            <h1 className="text-base font-bold text-brand-600 dark:text-brand-400">رفیق معنوی</h1>
            <p className="text-[10px] text-sub">آنلاین • همراهت هستم</p>
          </div>
        </div>
      </div>

      {/* پیام‌ها */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              msg.role === 'user'
                ? 'bg-gradient-to-l from-brand-500 to-brand-600 text-white shadow-glow-sm rounded-br-md'
                : 'bg-white dark:bg-dark-surface text-main shadow-soft border border-light-border dark:border-dark-border rounded-bl-md'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-dark-surface rounded-2xl px-4 py-3 shadow-soft border border-light-border dark:border-dark-border flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* کادر تایپ */}
      <div className="flex-shrink-0 bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-t border-light-border dark:border-dark-border px-3 py-2.5">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="بگو چی تو دلت هست..."
            className="flex-1 bg-light-bg dark:bg-dark-surface rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500 text-main border border-light-border dark:border-dark-border"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-l from-brand-500 to-brand-600 text-white p-2.5 rounded-xl shadow-glow-sm active:scale-95 transition disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}
