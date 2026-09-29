import React, { useState } from 'react';
import { 
  Globe, 
  Sparkles, 
  HelpCircle, 
  Compass, 
  Calculator,
  ChevronDown,
  Ticket
} from 'lucide-react';
import { LanguageCode, LanguageOption } from '../types/travel';
import { SUPPORTED_LANGUAGES, getTranslation } from '../data/translations';

interface NavbarProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenAiChat: () => void;
  onOpenSimulator: () => void;
  onOpenBookings: () => void;
  bookingsCount: number;
  currentStep: number;
  totalSteps: number;
  onNavigateHome: () => void;
  userBudget: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenAiChat,
  onOpenSimulator,
  onOpenBookings,
  bookingsCount,
  currentStep,
  totalSteps,
  onNavigateHome,
  userBudget
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = getTranslation(currentLanguage);

  const selectedLang = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-black border border-cyan-400 flex items-center justify-center cyan-glow group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Travel<span className="text-cyan-400">Wise</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 uppercase tracking-widest">
                AI Agent
              </span>
            </div>
            <p className="text-[11px] text-cyan-500/80 hidden sm:block">
              Budget-First Intelligent Planner
            </p>
          </div>
        </div>

        {/* Step Indicator (when in planning flow) */}
        {currentStep > 0 && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-mono">
              {t.step} {currentStep} {t.of} {totalSteps}
            </span>
            {userBudget > 0 && (
              <>
                <span className="text-cyan-600">|</span>
                <span className="text-white font-medium">₹{userBudget.toLocaleString()}</span>
              </>
            )}
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* My Bookings Button */}
          <button
            onClick={onOpenBookings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-medium transition-all cursor-pointer"
            title="View booked passes"
          >
            <Ticket className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">My Tickets</span>
            {bookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-400 text-black font-mono font-bold text-[10px] flex items-center justify-center">
                {bookingsCount}
              </span>
            )}
          </button>

          {/* What can I afford / Simulator button */}
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-medium transition-all hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer"
            title={t.whatCanIAfford}
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{t.whatCanIAfford}</span>
          </button>

          {/* Ask AI button (Highly visible at Top Right) */}
          <button
            onClick={onOpenAiChat}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-black font-extrabold text-xs transition-all cyan-glow shadow-[0_0_18px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/60"
            title="Open TravelWise AI Chatbot"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <Sparkles className="w-3.5 h-3.5 fill-black text-black" />
            <span>AI Chatbot 🤖</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/80 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-medium transition-all cursor-pointer"
              aria-expanded={langMenuOpen}
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-sans font-medium">{selectedLang.flag} {selectedLang.name}</span>
              <ChevronDown className={`w-3 h-3 text-cyan-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-52 max-h-80 overflow-y-auto rounded-xl bg-black/95 border border-cyan-500/40 shadow-2xl z-50 p-1.5 backdrop-blur-xl">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-cyan-500 uppercase tracking-wider border-b border-cyan-900/50 mb-1">
                    {t.chooseLanguage}
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang: LanguageOption) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                        currentLanguage === lang.code
                          ? 'bg-cyan-950/80 text-cyan-300 font-semibold border border-cyan-500/40'
                          : 'text-cyan-100 hover:bg-cyan-950/40 hover:text-cyan-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      <span className="text-[11px] text-cyan-400/70 font-sans">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
