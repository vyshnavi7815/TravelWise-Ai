import React from 'react';
import { 
  DollarSign, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Plane, 
  Hotel, 
  Utensils, 
  Car, 
  Ticket, 
  ShoppingBag, 
  LifeBuoy,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { BudgetBreakdown, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step5Props {
  budget: BudgetBreakdown;
  onNext: () => void;
  onBack: () => void;
  onJumpToOptimizer: () => void;
  lang: LanguageCode;
}

export const Step5CompleteBudget: React.FC<Step5Props> = ({
  budget,
  onNext,
  onBack,
  onJumpToOptimizer,
  lang
}) => {
  const t = getTranslation(lang);

  const categories = [
    { name: 'Transportation', amount: budget.transportation, icon: Plane, color: 'text-cyan-400', bar: 'bg-cyan-400' },
    { name: 'Accommodation', amount: budget.accommodation, icon: Hotel, color: 'text-teal-400', bar: 'bg-teal-400' },
    { name: 'Food & Dining', amount: budget.food, icon: Utensils, color: 'text-sky-400', bar: 'bg-sky-400' },
    { name: 'Local Transport', amount: budget.localTransport, icon: Car, color: 'text-blue-400', bar: 'bg-blue-400' },
    { name: 'Sightseeing & Entry', amount: budget.attractions, icon: Ticket, color: 'text-indigo-400', bar: 'bg-indigo-400' },
    { name: 'Shopping & Gifts', amount: budget.shopping, icon: ShoppingBag, color: 'text-purple-400', bar: 'bg-purple-400' },
    { name: 'Emergency Buffer (8%)', amount: budget.emergencyBuffer, icon: LifeBuoy, color: 'text-emerald-400', bar: 'bg-emerald-400' }
  ];

  const isOver = budget.status === 'over_budget';
  const isClose = budget.status === 'close_to_budget';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 5 · FISCAL ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.completeTripBudget}
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Comprehensive financial allocation across all 7 essential trip pillars with an integrated contingency safety cushion.
        </p>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Your Budget */}
        <div className="p-5 rounded-2xl bg-black/80 border border-cyan-900/60 text-center">
          <div className="text-xs font-mono text-cyan-500 mb-1">YOUR BUDGET TARGET</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
            ₹{budget.userBudget.toLocaleString()}
          </div>
          <div className="text-[11px] text-cyan-400/80 mt-1">100% Total Funds</div>
        </div>

        {/* Estimated Cost */}
        <div className="p-5 rounded-2xl bg-black/80 border border-cyan-500/40 text-center cyan-glow-sm">
          <div className="text-xs font-mono text-cyan-400 mb-1">TOTAL ESTIMATED TRIP COST</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300">
            ₹{budget.totalEstimatedCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-cyan-400/80 mt-1">
            {budget.percentageUsed}% of planned budget
          </div>
        </div>

        {/* Remaining Budget */}
        <div className={`p-5 rounded-2xl border text-center ${
          isOver 
            ? 'bg-rose-950/30 border-rose-500 text-rose-300' 
            : 'bg-emerald-950/30 border-emerald-500 text-emerald-300'
        }`}>
          <div className="text-xs font-mono uppercase tracking-wider mb-1">
            {isOver ? 'DEFICIT / OVER BUDGET' : 'REMAINING SAVINGS BUFFER'}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono">
            {isOver ? '-' : '+'}₹{Math.abs(budget.remainingBudget).toLocaleString()}
          </div>
          <div className="text-[11px] mt-1">
            {isOver ? '⚠️ Needs Cost Optimization' : '🟢 Fully Funded & Safe'}
          </div>
        </div>
      </div>

      {/* Visual Budget Progress Bar */}
      <div className="p-6 rounded-2xl bg-black/90 border border-cyan-900/60 mb-8 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-cyan-400">Budget Consumption: {budget.percentageUsed}%</span>
          <span className={isOver ? 'text-rose-400 font-bold' : isClose ? 'text-amber-400' : 'text-emerald-400'}>
            {isOver ? '🔴 OVER BUDGET' : isClose ? '🟡 CLOSE TO CEILING' : '🟢 WITHIN BUDGET'}
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-cyan-950/60 overflow-hidden relative flex">
          {categories.map((c, i) => {
            const pct = Math.max(1, (c.amount / Math.max(1, budget.totalEstimatedCost)) * budget.percentageUsed);
            return (
              <div
                key={i}
                style={{ width: `${pct}%` }}
                className={`${c.bar} h-full transition-all duration-500 border-r border-black/40`}
                title={`${c.name}: ₹${c.amount}`}
              />
            );
          })}
        </div>

        {/* Status Callout if over budget */}
        {isOver && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-rose-200 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Current plan exceeds budget by ₹{Math.abs(budget.remainingBudget).toLocaleString()}. AI Optimizer can reduce this instantly!</span>
            </div>
            <button
              onClick={onJumpToOptimizer}
              className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-black text-xs font-bold shrink-0 transition-colors"
            >
              Optimize Now
            </button>
          </div>
        )}
      </div>

      {/* Category Breakdown Table */}
      <div className="p-6 rounded-2xl bg-black/80 border border-cyan-900/60 mb-8">
        <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
          <span>Itemized Trip Cost Allocation</span>
          <span className="text-xs font-mono text-cyan-400">7 Core Categories</span>
        </h3>

        <div className="space-y-3">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const percentage = Math.round((cat.amount / Math.max(1, budget.totalEstimatedCost)) * 100);

            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-black border border-cyan-900/80 ${cat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {cat.name}
                    </div>
                    <div className="text-[11px] text-cyan-500 font-mono">
                      {percentage}% of total estimated trip
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-cyan-300">
                    ₹{cat.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary Row */}
        <div className="mt-4 pt-4 border-t border-cyan-500/40 flex items-center justify-between">
          <div className="text-base font-bold text-white">
            TOTAL TRIP ESTIMATE
          </div>
          <div className="text-xl font-mono font-extrabold text-cyan-300">
            ₹{budget.totalEstimatedCost.toLocaleString()}
          </div>
        </div>
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
          <span>{t.continue}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
