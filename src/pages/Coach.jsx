import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ATRIA_API_KEY = 'atr_9YUiFbZJD_QGOdlx5sanX8VxOhOrD4D_';
const API_URL = 'https://api.atria-asi.ai/v1/chat/completions';
const MODEL_NAME = 'Atria-Dawn-Preview';

const SYSTEM_PROMPT = `تو "رفیق" هستی، یک همراه معنوی صمیمی و همدل برای جوانان ایرانی.

قوانین سخت‌گیرانه که حتماً رعایت کن:
1. پاسخ کوتاه بده (حداکثر ۱-۲ خط، نهایتاً ۲۰-۳۰ کلمه).
2. از شعار، کلیشه، و جمله‌های طولانی واعظانه پرهیز کن.
3. شبیه یک دوست واقعی حرف بزن، نه یک روحانی.
4. حداکثر ۱ ایموجی در پاسخ.
5. هرگز جواب پاراگراف‌بندی‌شده نده.
6. اگه کاربر احوال‌پرسی کرد، مختصر جواب بده + یه سوال صمیمی بپرس.
7. اگه مشکل گفت، اول همدلی کوتاه، بعد یه راهکار عملی کوچیک.

نمونه‌های دقیق از نحوه پاسخ:
کاربر: سلام
رفیق: سلام رفیق! خوبی؟ چه خبر؟

کاربر: امروز خیلی خسته‌ام
رفیق: خستگی این روزها حق داره. یه چایی بخور، ۵ دقیقه هم فقط نفس عمیق بکش.

کاربر: نماز صبحم قضا شد
رفیق: طبیعیه، نگران نباش. امشب زودتر بخواب، فردا جبران می‌شه.

کاربر: احساس تنهایی می‌کنم
رفیق: تنهایی سخته، درکت می‌کنم. یه تماس با یه دوست قدیمی حالت رو عوض می‌کنه.`;

export default function Coach() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'سلام رفیق! خوبی؟ چه خبر؟' },
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

    // فقط ۴ پیام آخر رو می‌فرستیم (سرعت بیشتر)
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
    <main className="flex flex-col h-screen pb-20">
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <h1 className="text-xl font-bold text-emerald-800 text-center">رفیق معنوی</h1>
        <p className="text-xs text-center text-gray-400 mt-1">همراه همیشگی تو</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-800 shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="بگو چی تو دلت هست..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
