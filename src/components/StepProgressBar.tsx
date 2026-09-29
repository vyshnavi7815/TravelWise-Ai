import React from 'react';
import { 
  Compass, 
  BarChart3, 
  MapPin, 
  Utensils, 
  CheckCircle2 
} from 'lucide-react';
import { LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  lang: LanguageCode;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  totalSteps,
  onStepClick,
  lang
}) => {
  const t = getTranslation(lang);

  const stepsMeta = [
    { num: 1, title: '1. Passenger', subtitle: 'Trip Foundation', icon: Compass },
    { num: 2, title: '2. Purpose & Mode', subtitle: 'Devotional / Tour', icon: BarChart3 },
    { num: 3, title: '3. Available Transport', subtitle: 'Kaveri, Superfast, Book', icon: CheckCircle2 },
    { num: 4, title: '4. Book Hotel', subtitle: 'Stays & Rooms', icon: MapPin },
    { num: 5, title: '5. Station Transit', subtitle: 'Pre-book Cabs & Metro', icon: Compass },
    { num: 6, title: '6. Best Places', subtitle: 'Attractions & Budget', icon: MapPin },
    { num: 7, title: '7. Food & Dining', subtitle: 'Dishes & Restaurants', icon: Utensils },
    { num: 8, title: '8. Complete Plan', subtitle: 'Budget, Days & Tickets', icon: CheckCircle2 }
  ];

  const progressPercent = Math.min(100, Math.round(((currentStep - 1) / (totalSteps - 1)) * 100));

  return (
    <div className="w-full bg-black/90 border-b border-cyan-900/40 py-3.5 px-4 overflow-x-auto scrollbar-none sticky top-[65px] z-30 backdrop-blur-md">
      <div className="max-w-5xl mx-auto">
        {/* Continuous progress bar line */}
        <div className="w-full bg-cyan-950/60 h-1.5 rounded-full mb-3 relative overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_#06b6d4]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 5 Master Step Pills */}
        <div className="flex items-center justify-between gap-2">
          {stepsMeta.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            const isClickable = s.num <= Math.max(currentStep, 1);

            return (
              <button
                key={s.num}
                disabled={!isClickable}
                onClick={() => onStepClick(s.num)}
                className={`flex-1 flex items-center gap-2.5 p-2 rounded-xl transition-all text-left ${
                  isCurrent
                    ? 'bg-cyan-950/80 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                    : isCompleted
                    ? 'bg-black/60 border border-cyan-900/60 hover:border-cyan-600 cursor-pointer'
                    : 'bg-black/40 border border-transparent opacity-40 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-cyan-400 text-black font-bold shadow-[0_0_10px_#06b6d4]'
                      : isCompleted
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60'
                      : 'bg-black text-cyan-700 border border-cyan-950'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="hidden sm:block overflow-hidden">
                  <div className={`text-xs font-bold truncate ${isCurrent ? 'text-white' : 'text-cyan-400/80'}`}>
                    {s.title}
                  </div>
                  <div className="text-[10px] text-cyan-500/80 truncate font-mono">
                    {s.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
