import React from 'react';
import { 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldCheck,
  Clock,
  Armchair,
  Ticket,
  Wallet,
  TrendingDown,
  Info
} from 'lucide-react';
import { 
  PassengerDetails, 
  TransportComparisonItem, 
  LanguageCode 
} from '../types/travel';
import { getTranslation } from '../data/translations';
import { getAiTransportRecommendation } from '../utils/aiBudgetEngine';

interface Step3Props {
  details: PassengerDetails;
  options: TransportComparisonItem[];
  selectedTransportId: string;
  onSelectTransportId: (id: string) => void;
  onBookTicketNow: (item: TransportComparisonItem) => void;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step3AiBudgetAnalysis: React.FC<Step3Props> = ({
  details,
  options,
  selectedTransportId,
  onSelectTransportId,
  onBookTicketNow,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);
  const recommendation = getAiTransportRecommendation(options, details.totalBudget);

  const selectedOpt = options.find(o => o.id === selectedTransportId) || options[0];
  const remainingAfterTransport = Math.max(0, details.totalBudget - selectedOpt.totalCost);

  const renderBudgetBadge = (status: TransportComparisonItem['budgetStatus']) => {
    switch (status) {
      case 'within_budget':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>🟢 Within Budget</span>
          </span>
        );
      case 'slightly_expensive':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>🟡 Moderate Spend</span>
          </span>
        );
      case 'over_budget':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>🔴 Over Budget</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 3 · COMPARE & CHOOSE YOUR TRANSPORT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.aiBudgetAnalysis}
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-2xl mx-auto">
          We compared all practical ways to travel from <strong className="text-white">{details.fromLocation}</strong> to{' '}
          <strong className="text-white capitalize">{details.toDestination}</strong> for{' '}
          <strong className="text-white">{details.totalTravellers} traveller(s)</strong>.
        </p>
      </div>

      {/* CLARITY GUIDE BANNER (fixes user confusion) */}
      <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-400 text-cyan-300 shrink-0">
            <Info className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">
              Quick Guide: How to use this step
            </div>
            <div className="text-cyan-200/90 mt-0.5">
              1. Review the comparison table below. <br />
              2. Click <span className="text-cyan-300 font-bold">"Select This Mode"</span> to lock in your transport for the budget plan. <br />
              3. You can also click <span className="text-cyan-300 font-bold">"Book Ticket Now 🎫"</span> to generate official confirmed boarding passes!
            </div>
          </div>
        </div>

        {/* Current Active Selection Pill */}
        <div className="p-3 rounded-xl bg-black border border-cyan-400 shrink-0 text-right w-full sm:w-auto">
          <span className="text-[10px] font-mono text-cyan-500 uppercase block">CURRENT SELECTION</span>
          <div className="text-sm font-bold text-white flex items-center gap-1.5 sm:justify-end">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{selectedOpt.name}</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            Leaves ₹{remainingAfterTransport.toLocaleString()} for Stay & Food
          </div>
        </div>
      </div>

      {/* AI Recommendation Highlight Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-black to-cyan-950/40 border-2 border-cyan-400 mb-8 shadow-[0_0_25px_rgba(6,182,212,0.25)] relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-cyan-950/80">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shrink-0 cyan-glow-sm">
              <Sparkles className="w-6 h-6 text-cyan-300 fill-cyan-400/30" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500 text-black font-extrabold uppercase">
                  {t.aiRecommendation}
                </span>
                <span className="text-xs text-cyan-400 font-mono">
                  Best Value for ₹{details.totalBudget.toLocaleString()} Budget
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {recommendation.headline}
              </h3>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <button
              onClick={() => onSelectTransportId(recommendation.recommended.id)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.4)]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Adopt AI Pick ({recommendation.recommended.name})</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-cyan-200/90 leading-relaxed mb-4">
          {recommendation.explanation}
        </p>

        {/* 4 Pillars why AI selected this */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-cyan-300 bg-black/60 px-3 py-2 rounded-xl border border-cyan-900/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Lowest suitable fare</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300 bg-black/60 px-3 py-2 rounded-xl border border-cyan-900/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Good travel duration</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300 bg-black/60 px-3 py-2 rounded-xl border border-cyan-900/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Sleeper Comfort</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300 bg-black/60 px-3 py-2 rounded-xl border border-cyan-900/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Keeps Stay Liquidity</span>
          </div>
        </div>
      </div>

      {/* CLEAR COMPARISON CARDS */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span>Choose One Transport Mode for Your Itinerary</span>
          </h4>
          <span className="text-xs font-mono text-cyan-400">
            Party Size: {details.totalTravellers} Traveller(s)
          </span>
        </div>

        {options.map((opt) => {
          const isSelected = selectedTransportId === opt.id;
          const isAiPick = recommendation.recommended.id === opt.id;
          const remainingWithOpt = details.totalBudget - opt.totalCost;

          return (
            <div
              key={opt.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] ring-2 ring-cyan-400 scale-[1.01]'
                  : 'bg-black/80 border-cyan-900/60 hover:border-cyan-500/60 hover:bg-cyan-950/20'
              }`}
            >
              {/* Left Column: Icon + Name + Travel Duration + Comfort */}
              <div className="flex items-start gap-4">
                <div className="text-3xl p-3 rounded-2xl bg-black border border-cyan-800 text-cyan-400 shrink-0">
                  {opt.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">
                      {opt.name}
                    </span>
                    {isAiPick && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400 text-black font-extrabold uppercase">
                        AI Recommended
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold uppercase">
                        ✓ Selected
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-cyan-300/80">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {opt.travelTime}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Armchair className="w-3.5 h-3.5 text-cyan-400" />
                      {opt.comfort} Comfort
                    </span>
                    <span>·</span>
                    <span className="text-cyan-500 font-mono">
                      {opt.features.slice(0, 2).join(', ')}
                    </span>
                  </div>

                  {/* Impact on Remaining Budget */}
                  <div className="text-xs pt-1 flex items-center gap-2">
                    <span className="text-cyan-500">Remaining Holiday Funds:</span>
                    <span className={`font-mono font-bold ${
                      remainingWithOpt >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {remainingWithOpt >= 0 ? `₹${remainingWithOpt.toLocaleString()} left` : `Exceeds by ₹${Math.abs(remainingWithOpt).toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing & Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center justify-between gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-cyan-950/60 shrink-0">
                <div className="text-left md:text-right">
                  <div className="text-xl font-mono font-extrabold text-cyan-300">
                    ₹{opt.totalCost.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-cyan-500 font-mono">
                    ₹{opt.costPerPerson.toLocaleString()} / person {details.tripType === 'round_trip' ? '(Round-trip)' : '(One-way)'}
                  </div>
                  <div className="mt-1">
                    {renderBudgetBadge(opt.budgetStatus)}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onSelectTransportId(opt.id)}
                    className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-400 text-black shadow-[0_0_12px_#06b6d4]'
                        : 'bg-black border border-cyan-700 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/40'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isSelected ? 'Selected Mode' : 'Select This Mode'}</span>
                  </button>

                  {/* Instant Booking Trigger Button (User Request point 1) */}
                  <button
                    type="button"
                    onClick={() => onBookTicketNow(opt)}
                    className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-cyan-950 border border-cyan-500/60 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                    title="Book tickets for this transport"
                  >
                    <Ticket className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Book Tickets 🎫</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Guarantee */}
      <div className="p-4 rounded-xl bg-black border border-cyan-900/60 text-xs text-cyan-400/80 flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>Budget Safe Guarantee:</strong> Choosing a cheaper option leaves more room in your budget for nice hotel rooms, traditional dishes, and shopping.
        </span>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-cyan-950/60">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white hover:border-cyan-600 font-medium text-sm transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          <span>Continue with {selectedOpt.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
