import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  ChevronRight, 
  Shuffle 
} from 'lucide-react';
import { DayItinerary, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step11Props {
  itineraries: DayItinerary[];
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step11Itinerary: React.FC<Step11Props> = ({
  itineraries,
  onNext,
  onBack,
  lang
}) => {
  const [activeDay, setActiveDay] = useState(1);
  const t = getTranslation(lang);

  const currentDay = itineraries.find(d => d.dayNumber === activeDay) || itineraries[0];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 11 · DAY-BY-DAY TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.aiDailyItinerary}
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Optimized geographic sequencing eliminates zigzag travel, saving up to 2.5 hours of transit and ₹600 in cab surges per day.
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
        {itineraries.map((day) => {
          const isActive = day.dayNumber === activeDay;
          return (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => setActiveDay(day.dayNumber)}
              className={`px-5 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                  : 'bg-black border-cyan-900/60 text-cyan-400 hover:border-cyan-600'
              }`}
            >
              <span>DAY {day.dayNumber}</span>
              <span className={`text-[10px] font-normal ${isActive ? 'text-black/80' : 'text-cyan-600'}`}>
                (₹{day.dayTotal.toLocaleString()})
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Day Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/90 border border-cyan-500/40 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
            {currentDay.date} THEMATIC FOCUS
          </span>
          <h3 className="text-lg font-bold text-white">
            {currentDay.theme}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-cyan-500 uppercase">DAY TOTAL ESTIMATE</span>
          <div className="text-xl font-mono font-extrabold text-cyan-300">
            ₹{currentDay.dayTotal.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Hour-by-Hour Timeline List */}
      <div className="relative border-l-2 border-cyan-900/60 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-6 mb-8">
        {currentDay.items.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-black border border-cyan-400 text-cyan-300 flex items-center justify-center text-xs group-hover:scale-110 transition-transform cyan-glow-sm">
              <span className="text-[11px]">{item.icon}</span>
            </div>

            {/* Event Card */}
            <div className="p-4 rounded-xl bg-black/80 border border-cyan-900/60 hover:border-cyan-500/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group-hover:bg-cyan-950/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {item.time}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-900/60 text-cyan-300">
                    {item.category}
                  </span>
                </div>

                <div className="text-sm font-bold text-white">
                  {item.activity}
                </div>

                <div className="text-xs text-cyan-400/80 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{item.locationName}</span>
                </div>

                <div className="text-[11px] text-cyan-300/70 italic pt-1">
                  💡 {item.tips}
                </div>
              </div>

              {/* Cost pill */}
              <div className="text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-cyan-950/60">
                <div className="text-sm font-mono font-bold text-cyan-300">
                  {item.cost === 0 ? 'FREE' : `₹${item.cost}`}
                </div>
                <div className="text-[10px] text-cyan-600 font-mono">est. expense</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Route Optimization Note */}
      <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-xs text-cyan-200 flex items-center gap-2.5 mb-8">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>AI Sequence Optimizer:</strong> Sights and dining stops have been ordered by latitude/longitude clusters so you never need to backtrack across town.
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
          <span>{t.continue}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
