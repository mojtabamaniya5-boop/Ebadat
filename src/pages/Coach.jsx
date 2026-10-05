import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

const ATRIA_API_KEY = 'atr_9YUiFbZJD_QGOdlx5sanX8VxOhOrD4D_';
const API_URL = 'https://api.atria-asi.ai/v1/chat/completions';
const MODEL_NAME = 'Atria-Dawn-Preview';

export default function Coach() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'سلام! من مربی معنوی تو هستم. چطور می‌تونم کمکت کنم؟' },
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
            { role: 'system', content: 'تو یک مربی معنوی مهربان و آگاه به متون اسلامی هستی. پاسخ‌ها را کوتاه، امیدبخش و همراه با یک راهکار عملی بده. از سرزنش کردن کاربر خودداری کن.' },
            ...messages,
            userMessage,
          ],
        }),
      });

      const data = await response.json();
      const botMessage = {
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || 'متاسفم، پاسخی دریافت نکردم.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ خطا در ارتباط با سرور. لطفاً دوباره تلاش کن.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen pb-20">
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <h1 className="text-xl font-bold text-emerald-800 text-center">مربی معنوی</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 flex items-start gap-2 ${
              msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-800 shadow-sm'
            }`}>
              {msg.role === 'assistant' && <Bot size={18} className="mt-1 flex-shrink-0 text-emerald-600" />}
              <p className="text-sm leading-relaxed">{msg.content}</p>
              {msg.role === 'user' && <User size={18} className="mt-1 flex-shrink-0" />}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200" />
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
            placeholder="پیام خود را بنویسید..."
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
