import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ChevronDown, 
  ChevronUp, 
  X, 
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

interface TopAiAssistantProps {
  details: PassengerDetails;
  destination: DestinationData;
  budget: BudgetBreakdown;
  lang: LanguageCode;
  selectedStayName: string;
}

export const TopAiAssistant: React.FC<TopAiAssistantProps> = ({
  details,
  destination,
  budget,
  lang,
  selectedStayName
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello ${details.passengerName || 'Traveller'}! I'm TravelWise AI stationed at your command for ${destination.name}. Your budget is ₹${details.totalBudget.toLocaleString()} (₹${budget.remainingBudget.toLocaleString()} left). Ask me about buses like Kaveri Travels, station-to-hotel cabs, or cheap food!`,
      timestamp: 'Active'
    }
  ]);

  const quickPrompts = [
    'How do I reach my hotel from the station?',
    'Show me Kaveri Travels bus timings',
    'Which hotel fits my budget best?',
    'What authentic local food should I try?',
    'Is my trip currently within budget?'
  ];

  useEffect(() => {
    if (isExpanded) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded]);

  const handleSend = async (queryText?: string) => {
    const q = (queryText || input).trim();
    if (!q || loading) return;

    if (!isExpanded) setIsExpanded(true);

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
            hotel: selectedStayName,
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
      // fallback
    }

    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('hotel') && (lower.includes('station') || lower.includes('reach') || lower.includes('cab'))) {
        reply = `To reach ${selectedStayName} from the station/airport, you have 3 options:\n1. Prepaid AC Taxi (approx ₹450, 30 mins) with direct luggage assistance.\n2. Official Station Auto Rickshaw (₹160, 25 mins).\n3. City Electric AC Shuttle Bus (₹35, 45 mins) which stops 200m from the hotel.`;
      } else if (lower.includes('bus') || lower.includes('kaveri')) {
        reply = `Kaveri Travels Volvo Multi-Axle AC Sleeper departs at 08:30 PM (₹850/seat) with 7 seats available, featuring charging ports and clean blankets. You also have Superfast Express (09:15 PM, ₹750) and VRL Travels (07:45 PM, ₹920).`;
      } else if (lower.includes('budget') || lower.includes('within')) {
        reply = `Your total budget is ₹${details.totalBudget.toLocaleString()} and your current trip cost is estimated at ₹${budget.totalEstimatedCost.toLocaleString()}. You have a safe surplus of ₹${budget.remainingBudget.toLocaleString()} for contingency!`;
      } else if (lower.includes('food') || lower.includes('eat')) {
        reply = `Try ${destination.foods[0]?.name} (₹${destination.foods[0]?.approxPrice}) at ${destination.foods[0]?.famousAt.split(',')[0]}! Average meal budget is ₹80 breakfast, ₹180 lunch, and ₹220 dinner.`;
      } else {
        reply = `For your trip to ${destination.name}, everything is mapped to keep your spend below ₹${details.totalBudget.toLocaleString()}. You can select your bus, lock your hotel, pre-book station transit, and explore sights step-by-step.`;
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setLoading(false);
    }, 550);
  };

  return (
    <div className="w-full bg-black/95 border-b border-cyan-500/40 text-cyan-300 relative z-30 transition-all shadow-[0_4px_20px_rgba(6,182,212,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        {/* Top Mini Bar */}
        <div className="flex items-center justify-between gap-3">
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-lg bg-cyan-500 text-black flex items-center justify-center font-bold text-xs cyan-glow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-3.5 h-3.5 fill-black" />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-white tracking-wide">
                TravelWise AI Assistant (Top Command)
              </span>
              <span className="hidden md:inline text-[11px] text-cyan-400/80 font-mono">
                · Budget ₹{details.totalBudget.toLocaleString()} (₹{budget.remainingBudget.toLocaleString()} buffer)
              </span>
            </div>
          </div>

          {/* Quick inline prompt input & expand toggle */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex-1 relative flex items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Kaveri bus, station cabs, hotels..."
                className="w-full pl-3 pr-8 py-1.5 rounded-lg bg-black border border-cyan-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400 placeholder:text-cyan-800"
              />
              <button
                type="submit"
                className="absolute right-2 text-cyan-400 hover:text-white"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>{isExpanded ? 'Minimize' : 'Open Chat'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips (when collapsed) */}
        {!isExpanded && (
          <div className="flex items-center gap-2 mt-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            <span className="text-cyan-600 font-mono text-[10px] shrink-0">Ask AI:</span>
            {quickPrompts.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-0.5 rounded-md bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-900 text-cyan-300/90 whitespace-nowrap transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Expanded Top Chat Drawer */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-cyan-900/60 max-h-80 flex flex-col">
            <div className="flex items-center justify-between text-[11px] text-cyan-500 mb-2">
              <span>Context: {destination.name} · Selected Stay: {selectedStayName}</span>
              <button onClick={() => setIsExpanded(false)} className="text-cyan-400 hover:text-white">Close ×</button>
            </div>

            {/* Messages box */}
            <div className="overflow-y-auto max-h-52 space-y-2 p-2 rounded-xl bg-black border border-cyan-900/80 text-xs">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'ai' && (
                    <div className="w-5 h-5 rounded-md bg-cyan-950 border border-cyan-500 text-cyan-300 flex items-center justify-center shrink-0 text-[10px]">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}
                  <div className={`p-2.5 rounded-xl max-w-[85%] whitespace-pre-line ${
                    m.sender === 'user' ? 'bg-cyan-500 text-black font-medium' : 'bg-cyan-950/40 border border-cyan-900 text-cyan-100'
                  }`}>
                    {m.text}
                  </div>
                  {m.sender === 'user' && (
                    <div className="w-5 h-5 rounded-md bg-cyan-500 text-black flex items-center justify-center shrink-0 text-[10px] font-bold">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs py-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>AI Assistant analyzing query...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips inside expanded panel */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800 text-[10px] text-cyan-300 hover:border-cyan-500 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
