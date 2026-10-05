import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { getTodayData, getLast7Days } from '../utils/storage'
import * as jalaali from 'jalaali-js'

const ATRIA_API_KEY = 'atr_9YUiFbZJD_QGOdlx5sanX8VxOhOrD4D_';
const API_URL = 'https://api.atria-asi.ai/v1/chat/completions';
const MODEL_NAME = 'Atria-Dawn-Preview';

// محاسبه فاصله تا مناسبت‌های مذهبی
function daysUntilEvent(eventName, targetMonth, targetDay) {
  const today = new Date()
  const todayJ = jalaali.toJalaali(today)
  let year = todayJ.jy
  if (todayJ.jm > targetMonth || (todayJ.jm === targetMonth && todayJ.jd > targetDay)) year++
  const targetG = jalaali.toGregorian(year, targetMonth, targetDay)
  const target = new Date(targetG.gy, targetG.gm - 1, targetG.gd)
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
  return diff
}

function getLocalStatusReply(text, userData, weekData) {
  const clean = text.replace(/[؟?!.،,]/g, '').trim()
  const prayerNames = { fajr: 'صبح', dhuhr: 'ظهر', asr: 'عصر', maghrib: 'مغرب', isha: 'عشا' };

  const qazaList = Object.entries(userData.prayers || {}).filter(([k, v]) => v === 'qaza').map(([k]) => prayerNames[k]);
  const doneList = Object.entries(userData.prayers || {}).filter(([k, v]) => v && v !== 'qaza').map(([k]) => prayerNames[k]);
  const totalWeekScore = weekData.reduce((s, d) => s + d.score, 0);

  // قضا
  if (clean.includes('قضا') && /چند|چندتا|چند تا/.test(clean)) {
    if (qazaList.length === 0) return 'امروز هیچ قضایی نداری رفیق! 🌱 عالی بودی.';
    return `امروز ${qazaList.length} نماز قضا داری (${qazaList.join('، ')}). نگران نباش، می‌تونی جبران کنی 💚`;
  }

  // نمازها
  if (/چند|چندتا|چند تا/.test(clean) && clean.includes('نماز') && !clean.includes('قضا')) {
    return `امروز ${doneList.length} از ۵ نماز رو خوندی${qazaList.length ? ` (${qazaList.length} قضا)` : ''}. ${doneList.length === 5 ? 'عالی بودی 🌟' : 'ادامه بده!'}`;
  }

  // قرآن
  if (clean.includes('قرآن') && /چند|چقدر/.test(clean)) {
    return `امروز ${userData.quran || 0} صفحه قرآن خوندی. ${userData.quran > 0 ? 'بارک‌الله 🌿' : 'بیا یه صفحه بخونیم؟'}`;
  }

  // صلوات
  if (clean.includes('صلوات') && /چند|چقدر/.test(clean)) {
    return `امروز ${userData.salawat || 0} صلوات فرستادی. ${userData.salawat > 0 ? 'قبول باشه 🌸' : 'بیا چند تا بفرستیم؟'}`;
  }

  // ذکر استغفار
  if (clean.includes('استغفار') && /چند|چقدر/.test(clean)) {
    return 'ذکر استغفار رو می‌تونی از صفحه «دعا و ذکر» ثبت کنی. اونجا شمارنده داره 🌱';
  }

  // محرم
  if (clean.includes('محرم') && /چند|چقدر|چند روز/.test(clean)) {
    const days = daysUntilEvent('محرم', 1, 1);
    if (days <= 0) return 'ماه محرم شروع شده. التماس دعا 🤲';
    return `${days} روز تا ماه محرم مونده. خودت رو آماده کن 🖤`;
  }

  // رمضان
  if (clean.includes('رمضان') && /چند|چقدر|چند روز/.test(clean)) {
    const days = daysUntilEvent('رمضان', 1, 1);
    if (days <= 0) return 'ماه رمضان شروع شده. ان‌شاءالله روزه‌هات قبول 🌙';
    return `${days} روز تا رمضان مونده. آماده‌ای؟ 🌙`;
  }

  // عملکرد کلی
  if (/چطور|چگونه/.test(clean) && /بودم|عملکرد/.test(clean)) {
    const total = doneList.length;
    const emoji = total >= 5 ? '🌟' : total >= 3 ? '🌿' : '🌱';
    return `امروز ${total} نماز، ${userData.quran || 0} صفحه قرآن و ${userData.salawat || 0} صلوات. ${emoji}${qazaList.length ? ` ${qazaList.length} قضا داری.` : ''}`;
  }

  // امتیاز هفته
  if (clean.includes('امتیاز') && /چند|چقدر/.test(clean)) {
    return `این هفته ${totalWeekScore} امتیاز جمع کردی. ${totalWeekScore > 300 ? 'فوق‌العاده بودی 🏆' : 'ادامه بده، بهتر می‌شه 💪'}`;
  }

  // احوال‌پرسی
  if (clean.includes('خوبی') || clean.includes('چطوری') || clean.includes('حالت')) {
    return 'ممنون رفیق، خوبم! تو چطوری؟ 🌱';
  }
  if (clean === 'سلام' || clean.startsWith('سلام ')) return 'سلام رفیق! خوبی؟ چه خبر؟ 🌱';
  if (/ممنون|مرسی/.test(clean)) return 'خواهش می‌کنم 🌱';
  if (/خداحافظ|خدافظ|بای/.test(clean)) return 'خدانگهدار رفیق! مراقب خودت باش 🌱';

  return null;
}

const SYSTEM_PROMPT = `تو "رفیق" هستی، همراه معنوی صمیمی.

قوانین فوق‌سخت:
- پاسخ حداکثر ۲۵ کلمه، ۱-۲ خط.
- لحن دوستانه، نه واعظانه.
- بدون شعار و کلیشه.
- هرگز از خودت یا کد یا برنامه‌نویس حرف نزن.
- اگه جواب رو نمی‌دونی، ساده بگو "نمی‌دونم" و پیشنهاد بده.`;

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

  const callAI = async (userMessage, retries = 2) => {
    const recentHistory = [...messages, userMessage].slice(-3);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ATRIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...recentHistory],
        max_tokens: 80,
        temperature: 0.8,
      }),
    });
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content && retries > 0) return callAI(userMessage, retries - 1);
    return content;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const userData = getTodayData();
    const weekData = getLast7Days();
    const localReply = getLocalStatusReply(input, userData, weekData);

    if (localReply) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: localReply }]);
      }, 400);
      return;
    }

    setLoading(true);
    try {
      const reply = await callAI(userMessage);
      const finalReply = reply || 'یه لحظه نت قطع شد. دوباره بپرس رفیق 🙏';
      setMessages((prev) => [...prev, { role: 'assistant', content: finalReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'ارتباط برقرار نشد. یه بار دیگه امتحان کن 🙏' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-80px)] bg-mesh-light dark:bg-mesh-dark">
      <div className="flex-shrink-0 bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-b border-light-border dark:border-dark-border px-4 py-3 shadow-soft">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-l from-brand-400 to-brand-600 flex items-center justify-center shadow-glow-sm">
            <span className="text-white text-sm">🌱</span>
          </div>
          <div className="text-center">
            <h1 className="text-base font-bold text-brand-600 dark:text-brand-400">رفیق معنوی</h1>
            <p className="text-[10px] text-sub">از وضعیت امروزت باخبرم</p>
          </div>
        </div>
      </div>

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
