import React, { useState } from 'react';
import { 
  Calculator, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Coins, 
  Sliders, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { DestinationData } from '../types/travel';
import { solveWhatCanIAfford } from '../utils/aiBudgetEngine';

interface SmartAffordSimulatorProps {
  destination: DestinationData;
  isOpen: boolean;
  onClose: () => void;
}

export const SmartAffordSimulator: React.FC<SmartAffordSimulatorProps> = ({
  destination,
  isOpen,
  onClose
}) => {
  const [tab, setTab] = useState<'afford' | 'simulator'>('afford');
  const [amount, setAmount] = useState<number>(2000);

  // Simulator controls
  const [simDays, setSimDays] = useState(3);
  const [simTravellers, setSimTravellers] = useState(2);
  const [simTransitTier, setSimTransitTier] = useState<'train' | 'bus' | 'flight'>('train');
  const [simStayTier, setSimStayTier] = useState<'budget' | 'comfort' | 'luxury'>('budget');

  if (!isOpen) return null;

  const affordResult = solveWhatCanIAfford(amount, destination);

  // Compute live simulator cost
  const transitCostPerHead = simTransitTier === 'flight' ? 4200 : simTransitTier === 'train' ? 1200 : 800;
  const stayCostPerNight = simStayTier === 'luxury' ? 3500 : simStayTier === 'comfort' ? 1600 : 700;
  const mealsPerDayPerHead = 500;
  const localTransitPerDay = 250;

  const totalSimulatedCost = 
    (transitCostPerHead * simTravellers * 2) + 
    (stayCostPerNight * simDays) + 
    (mealsPerDayPerHead * simTravellers * simDays) + 
    (localTransitPerDay * simDays);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl bg-black border-2 border-cyan-400 p-6 shadow-2xl cyan-glow overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-900/60">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              Smart Travel Simulator & Affordability
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-cyan-950 border border-cyan-600 text-cyan-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
          <button
            onClick={() => setTab('afford')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'afford'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-cyan-400 hover:text-cyan-200'
            }`}
          >
            🔥 “What Can I Afford?”
          </button>
          <button
            onClick={() => setTab('simulator')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'simulator'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-cyan-400 hover:text-cyan-200'
            }`}
          >
            ⚡ Live Trip Cost Simulator
          </button>
        </div>

        {/* Tab 1: What Can I Afford? */}
        {tab === 'afford' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-2">
                Enter any amount in ₹ you have left:
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  step={200}
                  min={100}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-black border border-cyan-500 text-cyan-200 font-mono font-bold text-lg focus:outline-none focus:border-cyan-300"
                />
              </div>

              {/* Quick pills */}
              <div className="flex gap-2 mt-2">
                {[500, 1000, 2000, 5000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800 hover:border-cyan-500 text-cyan-300 text-xs font-mono"
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Recommendation Outcome Card */}
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.2)]">
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI AFFORDABILITY PLAN FOR {destination.name.toUpperCase()}</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                {affordResult.title}
              </h4>
              <p className="text-xs text-cyan-200/90 leading-relaxed mb-4">
                {affordResult.description}
              </p>

              <div className="space-y-1.5 mb-3">
                <span className="text-[10px] font-mono text-cyan-500 uppercase">
                  Activities Included:
                </span>
                {affordResult.activities.map((act, i) => (
                  <div key={i} className="text-xs text-cyan-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-cyan-400/80 italic pt-2 border-t border-cyan-900/60">
                💡 Tip: {affordResult.savingsTip}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Trip Cost Simulator */}
        {tab === 'simulator' && (
          <div className="space-y-4">
            <p className="text-xs text-cyan-400/80">
              Drag parameters to immediately observe total cost fluctuations across transit, hotel tier, and duration.
            </p>

            <div className="space-y-3 bg-cyan-950/20 p-4 rounded-2xl border border-cyan-900/60">
              {/* Days Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-cyan-400">Duration (Days):</span>
                  <span className="font-mono text-white font-bold">{simDays} Days</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={simDays}
                  onChange={(e) => setSimDays(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Travellers Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-cyan-400">Travellers:</span>
                  <span className="font-mono text-white font-bold">{simTravellers} People</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={simTravellers}
                  onChange={(e) => setSimTravellers(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Transit Tier Buttons */}
              <div>
                <span className="block text-xs text-cyan-400 mb-1.5">Transit Mode:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['bus', 'train', 'flight'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setSimTransitTier(m)}
                      className={`py-1.5 rounded-lg border text-xs font-mono font-bold capitalize transition-all ${
                        simTransitTier === m
                          ? 'bg-cyan-500 text-black border-cyan-400'
                          : 'bg-black border-cyan-900 text-cyan-500'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stay Tier */}
              <div>
                <span className="block text-xs text-cyan-400 mb-1.5">Lodging Tier:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['budget', 'comfort', 'luxury'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSimStayTier(s)}
                      className={`py-1.5 rounded-lg border text-xs font-mono font-bold capitalize transition-all ${
                        simStayTier === s
                          ? 'bg-cyan-500 text-black border-cyan-400'
                          : 'bg-black border-cyan-900 text-cyan-500'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recalculated Total Card */}
            <div className="p-4 rounded-xl bg-black border border-cyan-400 text-center cyan-glow-sm">
              <span className="text-[11px] font-mono text-cyan-500 uppercase">
                INSTANT RECALCULATED ESTIMATE
              </span>
              <div className="text-3xl font-mono font-extrabold text-cyan-300 mt-1">
                ₹{totalSimulatedCost.toLocaleString()}
              </div>
              <span className="text-[10px] text-cyan-500">
                Covers Round Transit + Hotel + Daily Meals + Local Auto/Cabs
              </span>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow"
        >
          Close Simulator
        </button>
      </div>
    </div>
  );
};
