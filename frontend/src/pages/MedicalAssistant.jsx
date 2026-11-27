import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MedicalAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: 'Hello. I am your specialized PCOS AI assistant. How can I support your health journey today? You can ask about symptoms, diet, or review your recent scan results.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = { role: 'user', text: textToSend.trim() };
    const newHistory = [...messages, userMessage];
    
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      // Connect to Python FastAPI Gemini /chat endpoint
      const response = await axios.post('http://localhost:8000/chat', {
        message: textToSend.trim(),
        history: messages
      });

      if (response.data && response.data.reply) {
        setMessages([...newHistory, { role: 'model', text: response.data.reply }]);
      } else {
        throw new Error('No reply received from AI service');
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = 
        err.response?.data?.reply || 
        err.response?.data?.error || 
        '⚠️ Could not connect to the medical AI service. Please make sure the Python backend is running on http://localhost:8000.';
      
      setMessages([
        ...newHistory,
        {
          role: 'model',
          text: errorMsg
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-1 max-w-container-max mx-auto w-full min-h-screen bg-mesh">
      {/* NavigationDrawer */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-[calc(100vh-100px)] sticky top-24 bg-surface-container-low/90 backdrop-blur-md rounded-r-xl border-r border-white/20 p-4 shadow-xl shadow-primary/5">
        <div className="px-6 mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold">
              <span className="material-symbols-outlined text-2xl">clinical_notes</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm font-bold text-primary">Health Dashboard</p>
              <p className="font-body-md text-body-md text-on-surface-variant opacity-70">PCOS Analysis Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all duration-300">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link to="/history" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all duration-300">
            <span className="material-symbols-outlined">history</span>
            <span className="font-label-md text-label-md">Scan History</span>
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl mx-2 my-1 transition-all duration-300 cursor-pointer">
            <span className="material-symbols-outlined" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
            <span className="font-label-md text-label-md">AI Insights</span>
          </div>
          <Link to="/what-is-pcos" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all duration-300">
            <span className="material-symbols-outlined">menu_book</span>
            <span className="font-label-md text-label-md">What is PCOS</span>
          </Link>
          <Link to="/upload" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all duration-300">
            <span className="material-symbols-outlined">upload_file</span>
            <span className="font-label-md text-label-md">Upload Scan</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all">
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-md text-label-md">Patient Profile</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col h-[calc(100vh-80px)]">
        <div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop py-8 space-y-6">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-4 max-w-3xl ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-secondary-container shadow-secondary/20 text-on-secondary-container' 
                    : 'bg-primary shadow-primary/20 text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>
                  {msg.role === 'user' ? 'person' : 'psychology'}
                </span>
              </div>
              <div 
                className={`p-6 rounded-2xl shadow-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-tr-none shadow-md'
                    : 'bg-white text-on-surface rounded-tl-none border border-outline-variant/30'
                }`}
              >
                <p className="font-body-md text-body-md">{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[20px] animate-pulse">psychology</span>
              </div>
              <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-outline-variant/30 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-xs text-on-surface-variant ml-2 font-medium">Medical AI is preparing guidance...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Chat Interaction Area */}
        <div className="px-margin-mobile md:px-margin-desktop py-6 bg-transparent">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Quick Prompts (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button 
                onClick={() => handleSend("What are some common symptoms of PCOS I should look out for?")}
                disabled={loading}
                className="p-4 bg-white/60 hover:bg-white border border-outline-variant/20 rounded-2xl text-left transition-all hover:shadow-md group disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-primary mb-2 block group-hover:scale-110 transition-transform">symptoms</span>
                <p className="font-label-md text-label-md text-on-surface">What are symptoms of PCOS?</p>
              </button>
              
              <button 
                onClick={() => handleSend("What are the best evidence-based diet and nutrition recommendations for managing PCOS?")}
                disabled={loading}
                className="p-4 bg-white/60 hover:bg-white border border-outline-variant/20 rounded-2xl text-left transition-all hover:shadow-md group disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-primary mb-2 block group-hover:scale-110 transition-transform">restaurant</span>
                <p className="font-label-md text-label-md text-on-surface">Diet recommendations for PCOS</p>
              </button>
              
              <button 
                onClick={() => handleSend("Can you explain what the Rotterdam criteria and 'string of pearls' ultrasound sign mean for PCOS diagnosis?")}
                disabled={loading}
                className="p-4 bg-white/60 hover:bg-white border border-outline-variant/20 rounded-2xl text-left transition-all hover:shadow-md group disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-primary mb-2 block group-hover:scale-110 transition-transform">description</span>
                <p className="font-label-md text-label-md text-on-surface">Explain my scan result</p>
              </button>
            </div>

            {/* Input Field with Form / Enter / Click support */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative group"
            >
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="w-full pl-6 pr-16 py-5 rounded-2xl glass-input focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-body-md text-body-md shadow-xl shadow-primary/5 disabled:opacity-60" 
                placeholder={loading ? "Medical AI is thinking..." : "Ask anything about your PCOS health..."} 
                type="text"
              />
              <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
                title="Send message"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}