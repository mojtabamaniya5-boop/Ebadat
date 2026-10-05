import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

const ATRIA_API_KEY = 'atr_9YUiFbZJD_QGOdlx5sanX8VxOhOrD4D_';
const API_URL = 'https://api.atria-asi.ai/v1/chat/completions';
const MODEL_NAME = 'Atria-Dawn-Preview';

const SYSTEM_PROMPT = `تو "رفیق" هستی، یک همراه معنوی صمیمی و همدل برای جوانان ایرانی.

قوانین سخت‌گیرانه:
- خیلی کوتاه جواب بده (حداکثر ۱-۲ خط، نهایتاً ۲۰-۳۰ کلمه).
- از شعار، کلیشه، و جمله‌های طولانی پرهیز کن.
- شبیه یک دوست واقعی حرف بزن، نه یک واعظ.
- حداکثر ۱ ایموجی در پاسخ.
- اگه مشکل گفت، اول همدلی کوتاه، بعد یه راهکار عملی کوچیک.`;

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
    setLoading(true);
    const recentHistory = [...messages, userMessage].slice(-4);

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
          max_tokens: 80,
          temperature: 0.85,
        }),
      });
      const data = await response.json();
      const botMessage = {
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || 'یه لحظه مشکل خورد، دوباره بپرس.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'اینترنت قطع شد، دوباره بزن.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen pb-20 bg-mesh-light dark:bg-mesh-dark">
      <div className="bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-b border-light-border dark:border-dark-border p-4 shadow-soft">
        <h1 className="text-xl font-bold text-brand-600 dark:text-brand-400 text-center">رفیق معنوی</h1>
        <p className="text-xs text-center text-sub mt-1">همراه همیشگی تو</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              msg.role === 'user'
                ? 'bg-gradient-to-l from-brand-500 to-brand-600 text-white shadow-glow-sm'
                : 'bg-white dark:bg-dark-surface text-main shadow-soft border border-light-border dark:border-dark-border'
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

      <div className="bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-t border-light-border dark:border-dark-border p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="بگو چی تو دلت هست..."
            className="flex-1 bg-light-bg dark:bg-dark-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500 text-main border border-light-border dark:border-dark-border"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-l from-brand-500 to-brand-600 text-white p-3 rounded-xl shadow-glow-sm active:scale-95 transition disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
