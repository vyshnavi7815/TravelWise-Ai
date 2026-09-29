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
  Plane,
  Hotel,
  Utensils,
  Car,
  ShoppingBag,
  LifeBuoy
} from 'lucide-react';
import { 
  PassengerDetails, 
  TransportComparisonItem, 
  BudgetBreakdown, 
  LanguageCode 
} from '../types/travel';
import { getTranslation } from '../data/translations';
import { getAiTransportRecommendation } from '../utils/aiBudgetEngine';

interface MasterStep2BudgetProps {
  details: PassengerDetails;
  options: TransportComparisonItem[];
  selectedTransportId: string;
  onSelectTransportId: (id: string) => void;
  budget: BudgetBreakdown;
  onBookTicketNow: (item: TransportComparisonItem) => void;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const MasterStep2Budget: React.FC<MasterStep2BudgetProps> = ({
  details,
  options,
  selectedTransportId,
  onSelectTransportId,
  budget,
  onBookTicketNow,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);
  const recommendation = getAiTransportRecommendation(
    options, 
    details.totalBudget,
    details.tripPurpose ? (details as any).preferredTransport : undefined
  );

  const selectedOpt = options.find(o => o.id === selectedTransportId) || options[0];
  const remainingAfterTransport = Math.max(0, details.totalBudget - selectedOpt.totalCost);

  const categories = [
    { name: 'Transportation', amount: budget.transportation, icon: Plane, bar: 'bg-cyan-400' },
    { name: 'Accommodation', amount: budget.accommodation, icon: Hotel, bar: 'bg-teal-400' },
    { name: 'Food & Dining', amount: budget.food, icon: Utensils, bar: 'bg-sky-400' },
    { name: 'Local Transport', amount: budget.localTransport, icon: Car, bar: 'bg-blue-400' },
    { name: 'Sightseeing & Entry', amount: budget.attractions, icon: Ticket, bar: 'bg-indigo-400' },
    { name: 'Shopping & Gifts', amount: budget.shopping, icon: ShoppingBag, bar: 'bg-purple-400' },
    { name: 'Emergency Buffer (8%)', amount: budget.emergencyBuffer, icon: LifeBuoy, bar: 'bg-emerald-400' }
  ];

  const isOver = budget.status === 'over_budget';
  const isClose = budget.status === 'close_to_budget';

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 2 OF 5 · TRANSPORT COMPARISON & COMPLETE BUDGET</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Compare Transit & Trip Budget
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Here is your transport feasibility comparison for {details.fromLocation} → {details.toDestination} and the resulting complete 7-pillar budget breakdown.
        </p>
      </div>

      {/* Active Mode Highlight Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950 via-black to-cyan-950/60 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-cyan-500 uppercase">ACTIVE TRANSIT SELECTION</span>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{selectedOpt.name}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500 text-black font-extrabold">
              ₹{selectedOpt.totalCost.toLocaleString()} Total
            </span>
          </h3>
          <p className="text-xs text-cyan-300/80 mt-0.5">
            Leaves ₹{remainingAfterTransport.toLocaleString()} safe cash buffer for your hotel stay, local food, and sights.
          </p>
        </div>

        <button
          onClick={() => onBookTicketNow(selectedOpt)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow flex items-center gap-1.5 shrink-0 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.4)]"
        >
          <Ticket className="w-4 h-4 fill-black" />
          <span>Book Tickets for {selectedOpt.name} 🎫</span>
        </button>
      </div>

      {/* Transport Comparison Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            All Practical Transit Modes ({details.totalTravellers} Travellers)
          </h4>
          <span className="text-xs text-cyan-500">Tap to switch selection</span>
        </div>

        {options.map((opt) => {
          const isSelected = selectedTransportId === opt.id;
          const remainingWithOpt = details.totalBudget - opt.totalCost;

          return (
            <div
              key={opt.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400 scale-[1.01]'
                  : 'bg-black/80 border-cyan-900/60 hover:border-cyan-600 hover:bg-cyan-950/20'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className="text-2xl p-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-400 shrink-0">
                  {opt.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{opt.name}</span>
                    {isSelected && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold uppercase">
                        ✓ Selected
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-400/80 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {opt.travelTime}
                    </span>
                    <span>·</span>
                    <span>{opt.comfort} Comfort</span>
                    <span>·</span>
                    <span className={remainingWithOpt >= 0 ? 'text-emerald-400' : 'text-rose-400 font-mono'}>
                      {remainingWithOpt >= 0 ? `Leaves ₹${remainingWithOpt.toLocaleString()} buffer` : `Exceeds by ₹${Math.abs(remainingWithOpt).toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-cyan-950">
                <div className="text-left sm:text-right">
                  <div className="text-lg font-mono font-extrabold text-cyan-300">
                    ₹{opt.totalCost.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-cyan-500">
                    ₹{opt.costPerPerson.toLocaleString()} / person
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectTransportId(opt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-400 text-black'
                        : 'bg-black border border-cyan-700 text-cyan-300 hover:border-cyan-400'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : 'Select'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookTicketNow(opt)}
                    className="px-2.5 py-1.5 rounded-xl bg-cyan-950 border border-cyan-600 hover:border-cyan-400 text-cyan-300 text-xs font-semibold cursor-pointer"
                    title="Book tickets"
                  >
                    Book 🎫
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Trip Budget 7 Pillars */}
      <div className="p-6 rounded-3xl bg-black/90 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-950/80">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Your Complete Trip Budget Breakdown</span>
            </h3>
            <p className="text-xs text-cyan-400/80">
              Covers transit, hotel, food, local transit, attractions, and emergency safety reserve.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono text-cyan-500 uppercase">ESTIMATED TOTAL EXPENSE</span>
            <div className="text-2xl font-mono font-extrabold text-cyan-300">
              ₹{budget.totalEstimatedCost.toLocaleString()}
            </div>
            <div className={`text-xs font-mono font-bold ${isOver ? 'text-rose-400' : 'text-emerald-400'}`}>
              {isOver ? `🔴 Over Budget by ₹${Math.abs(budget.remainingBudget).toLocaleString()}` : `🟢 ₹${budget.remainingBudget.toLocaleString()} Remaining Safe Buffer`}
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-3 rounded-full bg-cyan-950/60 overflow-hidden relative flex">
          {categories.map((c, i) => {
            const pct = Math.max(1, (c.amount / Math.max(1, budget.totalEstimatedCost)) * budget.percentageUsed);
            return (
              <div
                key={i}
                style={{ width: `${pct}%` }}
                className={`${c.bar} h-full border-r border-black/40`}
                title={`${c.name}: ₹${c.amount}`}
              />
            );
          })}
        </div>

        {/* 7 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-white truncate">{cat.name.split(' ')[0]}</span>
                </div>
                <span className="font-mono text-cyan-300 font-bold">₹{cat.amount.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-cyan-950/60">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Setup</span>
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          <span>Explore Sights & Stays →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
