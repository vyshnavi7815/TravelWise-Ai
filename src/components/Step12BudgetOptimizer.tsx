import React, { useState } from 'react';
import { 
  TrendingDown, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  ArrowDownRight, 
  Coins, 
  Zap, 
  Layers 
} from 'lucide-react';
import { OptimizationSuggestion, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step12Props {
  suggestions: OptimizationSuggestion[];
  originalTotal: number;
  onApplyOptimization: (id: string) => void;
  onApplyAll: () => void;
  appliedCount: number;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step12BudgetOptimizer: React.FC<Step12Props> = ({
  suggestions,
  originalTotal,
  onApplyOptimization,
  onApplyAll,
  appliedCount,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);

  const totalPossibleSavings = suggestions.reduce((acc, s) => acc + s.savings, 0);
  const totalAppliedSavings = suggestions
    .filter(s => s.applied)
    .reduce((acc, s) => acc + s.savings, 0);

  const currentOptimizedCost = originalTotal - totalAppliedSavings;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <TrendingDown className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 12 · SMART FISCAL OPTIMIZER</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.budgetOptimizer}
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          AI detects high-expenditure bottlenecks and swaps them for high-value alternatives without compromising travel enjoyment.
        </p>
      </div>

      {/* Prominent Savings Scoreboard Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950 via-black to-cyan-950 border border-cyan-400 mb-8 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {/* Original Cost */}
          <div>
            <span className="text-[11px] font-mono text-cyan-500 uppercase">
              {t.originalCost}
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-gray-400 line-through mt-1">
              ₹{originalTotal.toLocaleString()}
            </div>
            <span className="text-[10px] text-cyan-700">Baseline before tuning</span>
          </div>

          {/* You Save (Prominent!) */}
          <div className="p-4 rounded-xl bg-black/80 border border-cyan-400 cyan-glow-sm">
            <span className="text-xs font-mono text-cyan-300 uppercase font-bold flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              <span>{t.youSave}</span>
            </span>
            <div className="text-3xl sm:text-4xl font-mono font-extrabold text-cyan-300 mt-0.5">
              ₹{(totalAppliedSavings || totalPossibleSavings).toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-400 font-mono font-bold">
              {Math.round(((totalAppliedSavings || totalPossibleSavings) / originalTotal) * 100)}% Cost Reduction
            </span>
          </div>

          {/* Optimized Cost */}
          <div>
            <span className="text-[11px] font-mono text-cyan-500 uppercase">
              {t.optimizedCost}
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white mt-1">
              ₹{(totalAppliedSavings > 0 ? currentOptimizedCost : originalTotal - totalPossibleSavings).toLocaleString()}
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">Guaranteed within funds</span>
          </div>
        </div>

        {/* 1-Click Apply All Button */}
        {appliedCount < suggestions.length && (
          <div className="mt-6 pt-4 border-t border-cyan-950/80 flex items-center justify-center">
            <button
              onClick={onApplyAll}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Apply All Recommended Savings (Save ₹{totalPossibleSavings.toLocaleString()})</span>
            </button>
          </div>
        )}
      </div>

      {/* Optimization Cards List */}
      <div className="space-y-4 mb-8">
        {suggestions.map((sug) => (
          <div
            key={sug.id}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              sug.applied
                ? 'bg-cyan-950/40 border-cyan-400/80 ring-1 ring-cyan-500/40'
                : 'bg-black/80 border-cyan-900/60 hover:border-cyan-500/50'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  {sug.category.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Saves ₹{sug.savings.toLocaleString()}
                </span>
              </div>

              {/* Before vs After comparison */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-gray-400 line-through">
                  {sug.originalChoice} (₹{sug.originalCost.toLocaleString()})
                </span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold">
                  {sug.recommendedChoice} (₹{sug.recommendedCost.toLocaleString()})
                </span>
              </div>

              <p className="text-xs text-cyan-200/80 leading-relaxed max-w-xl">
                {sug.reason}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-cyan-950/60">
              <button
                onClick={() => onApplyOptimization(sug.id)}
                className={`w-full md:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  sug.applied
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-300'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black cyan-glow hover:scale-105 active:scale-95'
                }`}
              >
                {sug.applied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Applied</span>
                  </>
                ) : (
                  <>
                    <Coins className="w-3.5 h-3.5" />
                    <span>Apply Switch</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Smart Budget Reallocation Concept (Hackathon Special) */}
      <div className="p-4 rounded-xl bg-black border border-cyan-500/30 flex items-start gap-3 text-xs text-cyan-300 mb-8">
        <Layers className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Smart Budget Reallocation:</strong> The ₹{(totalAppliedSavings || totalPossibleSavings).toLocaleString()} saved has automatically expanded your dining and souvenir budget, allowing you to try more authentic cuisine with zero out-of-pocket strain.
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
