"use client";
import { useRef, useState } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";

const SYSTEM_PROMPT = `Ты — вежливый и энергичный ИИ-ассистент тренажёрного зала. Твоя задача — помогать посетителям сайта быстро находить нужную информацию и мотивировать их записаться на тренировку.\n\nВсегда пиши дружелюбно, чётко и с уважением. Используй короткие, понятные ответы. Если что-то не входит в твои полномочия — предложи оставить заявку или связаться с менеджером.\n\nТы можешь помогать с:\n- выбором абонемента;\n- подбором тренера;\n- расписанием тренировок;\n- акциями и скидками;\n- записью на бесплатную пробную тренировку;\n- адресом, временем работы и контактами.\n\nЕсли пользователь просто зашёл посмотреть — поприветствуй его, предложи помощь, но не будь навязчивым.\n\nВот как можешь начинать разговор:\n«Привет! Я — твой ИИ-ассистент. Помочь выбрать подходящий абонемент или рассказать о тренерах?»\n«Добро пожаловать в PowerFit Gym! Хочешь узнать расписание или записаться на пробную тренировку?»\n\nНикогда не выдумывай информацию. Если вопрос не входит в твою компетенцию, скажи:\n«Давайте я передам этот вопрос администратору — он скоро свяжется с вами!»`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: SYSTEM_PROMPT }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          model: "gpt-4-turbo",
          max_tokens: 500,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages([...newMessages, { role: "assistant", content: `Ошибка: ${data.error}` }]);
      } else if (data.result) {
        setMessages([...newMessages, { role: "assistant", content: data.result }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: "Извините, не удалось получить ответ." }]);
      }
    } catch (e: any) {
      setMessages([...newMessages, { role: "assistant", content: `Произошла ошибка: ${e.message}` }]);
    } finally {
      setLoading(false);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  return (
    <>
      {/* Кнопка чата */}
      <button
        className="fixed z-[9999] bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Открыть чат"
        style={{ pointerEvents: 'auto' }}
      >
        <FaComments size={28} />
      </button>
      {/* Окно чата */}
      {open && (
        <div className="fixed z-[9999] bottom-24 right-6 w-80 max-w-[95vw] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-fade-in"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="bg-red-600 text-white px-4 py-3 font-bold flex items-center justify-between">
            <span>ИИ-консультант</span>
            <button onClick={() => setOpen(false)} className="text-white text-xl leading-none">×</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto max-h-96" style={{ minHeight: 200 }}>
            {messages
              .filter(msg => msg.role !== "system")
              .map((msg, i) => (
                <div key={i} className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`rounded-lg px-3 py-2 text-sm ${msg.role === "user" ? "bg-red-100 text-gray-900" : "bg-gray-100 text-gray-800"}`}>{msg.content}</div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            className="flex border-t border-gray-200"
            onSubmit={e => { e.preventDefault(); sendMessage(); }}
          >
            <input
              className="flex-1 px-3 py-2 text-sm outline-none"
              type="text"
              placeholder="Ваш вопрос..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="p-3 text-red-600 hover:text-red-800 disabled:opacity-50"
              disabled={loading || !input.trim()}
              aria-label="Отправить"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s;
        }
      `}</style>
    </>
  );
} 