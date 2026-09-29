import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { PassengerDetails, DestinationData, BudgetBreakdown, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AiChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  details: PassengerDetails;
  destination: DestinationData;
  budget: BudgetBreakdown;
  lang: LanguageCode;
}

export const AiChatAssistant: React.FC<AiChatAssistantProps> = ({
  isOpen,
  onClose,
  details,
  destination,
  budget,
  lang
}) => {
  const t = getTranslation(lang);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello ${details.passengerName || 'there'}! I am TravelWise AI, your budget-first travel copilot for ${destination.name}. Your total budget is ₹${details.totalBudget.toLocaleString()} with ₹${budget.remainingBudget.toLocaleString()} currently left as buffer. How can I assist your journey?`,
      timestamp: 'Just now'
    }
  ]);

  const quickQuestions = [
    'Can I visit this place under ₹5,000?',
    'Which transport is cheapest?',
    'Show me cheaper hotels.',
    'Where can I get good food?',
    'Reduce my trip cost.',
    'I have only ₹3,000 left. What can I do?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (queryText?: string) => {
    const q = (queryText || input).trim();
    if (!q || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Attempt backend Gemini call first
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: q,
          context: {
            destination: destination.name,
            totalBudget: details.totalBudget,
            travellers: details.totalTravellers,
            remainingBudget: budget.remainingBudget,
            language: lang
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          setLoading(false);
          return;
        }
      }
    } catch {
      // fallback to rich domain engine
    }

    // Local AI reasoning response
    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('cheapest') && lower.includes('transport')) {
        reply = `The most budget-friendly transport is the Government Bus / Superfast Sleeper Train. It costs around ₹650 - ₹800 per person round trip, leaving you with ₹${(details.totalBudget - 1500).toLocaleString()} for lodging and food!`;
      } else if (lower.includes('cheaper hotel') || lower.includes('hotel') || lower.includes('stay')) {
        const cheap = destination.accommodations[0];
        reply = `For maximum savings, check out ${cheap.name} at only ₹${cheap.pricePerNight}/night. It has a high ${cheap.rating} rating and is just ${cheap.distanceFromSights}.`;
      } else if (lower.includes('food') || lower.includes('eat')) {
        const food = destination.foods[0];
        reply = `You must try the ${food.name} at ${food.famousAt.split(',')[0]} for approx ₹${food.approxPrice}. For breakfast, local street stalls offer breakfast for just ₹60-₹80!`;
      } else if (lower.includes('reduce') || lower.includes('cost') || lower.includes('save')) {
        reply = `To immediately reduce trip cost by up to ₹3,500:\n1. Choose Sleeper Train over Flights.\n2. Rent a local scooter (₹350/day) instead of point-to-point private cabs.\n3. Book ${destination.accommodations[0].name} (₹${destination.accommodations[0].pricePerNight}/night).`;
      } else if (lower.includes('3,000') || lower.includes('left') || lower.includes('afford')) {
        reply = `With ₹3,000 left, you can easily cover 1 night stay (₹700), 3 hearty traditional meals (₹600), entry tickets to all local monuments, and rent a two-wheeler for 2 full days with petrol!`;
      } else if (lower.includes('5,000')) {
        reply = `Yes! A 3-day trip to ${destination.name} is fully achievable under ₹5,000 per person if you use Sleeper class trains, stay in vetted backpacker hostels (₹550/night), and dine at authentic local thali spots.`;
      } else {
        reply = `Based on your ₹${details.totalBudget.toLocaleString()} budget and current plan for ${destination.name}, you have ₹${budget.remainingBudget.toLocaleString()} remaining. Your transport and accommodation are safe. Let me know if you would like me to adjust any activities or reduce costs further!`;
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setLoading(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full sm:w-96 max-h-[85vh] rounded-3xl bg-black border-2 border-cyan-400 shadow-2xl cyan-glow flex flex-col overflow-hidden backdrop-blur-2xl">
      {/* Header */}
      <div className="p-4 bg-cyan-950/80 border-b border-cyan-500/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500 text-black flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 fill-black" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Ask TravelWise AI
            </h4>
            <span className="text-[10px] font-mono text-cyan-300">
              Context-Aware · Budget ₹{details.totalBudget.toLocaleString()}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-black border border-cyan-800 text-cyan-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[260px] max-h-[380px] bg-black/90 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-black font-medium rounded-tr-none'
                  : 'bg-cyan-950/40 border border-cyan-900/80 text-cyan-100 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <div className={`text-[9px] mt-1 text-right font-mono ${
                msg.sender === 'user' ? 'text-black/60' : 'text-cyan-600'
              }`}>
                {msg.timestamp}
              </div>
            </div>
            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-lg bg-cyan-500 text-black flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>TravelWise AI is formulating plan...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="p-2 bg-black/95 border-t border-cyan-950/80 overflow-x-auto flex gap-1.5 scrollbar-none">
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800 text-[11px] text-cyan-300 whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-black border-t border-cyan-500/30 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about this trip or budget..."
          className="flex-1 px-3 py-2 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400 placeholder:text-cyan-800"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-bold transition-all shrink-0 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
