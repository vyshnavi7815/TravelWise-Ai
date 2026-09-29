import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Compass } from 'lucide-react';

interface AiLoadingScreenProps {
  onComplete: () => void;
  destinationName: string;
}

export const AiLoadingScreen: React.FC<AiLoadingScreenProps> = ({
  onComplete,
  destinationName
}) => {
  const steps = [
    'Analyzing your budget limit...',
    'Comparing flight, train & bus fares...',
    'Finding the best places to visit...',
    'Filtering high-rated budget stays...',
    'Curating regional cuisines & street bites...',
    'Calculating point-to-point transit routes...',
    'Optimizing day-by-day travel sequence...',
    'Your Trip Is Ready ✨'
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 cyber-grid backdrop-blur-2xl">
      <div className="relative w-full max-w-md text-center">
        {/* Animated Radar Glow */}
        <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/50 animate-pulse" />
          <div className="w-20 h-20 rounded-2xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center shadow-[0_0_30px_#06b6d4]">
            <Compass className="w-10 h-10 text-cyan-300 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-4 cyan-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI AGENT WORKING · DESTINATION: {destinationName.toUpperCase()}</span>
        </div>

        {/* Current status line */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 h-12 flex items-center justify-center">
          {steps[currentStepIndex]}
        </h3>

        {/* Progress Bar */}
        <div className="w-full bg-cyan-950/60 h-2 rounded-full overflow-hidden mb-3 border border-cyan-900/60">
          <div
            className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full rounded-full transition-all duration-300 shadow-[0_0_12px_#06b6d4]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs font-mono text-cyan-500">
          <span>Processing constraints</span>
          <span className="text-cyan-300 font-bold">{progressPercent}%</span>
        </div>
      </div>
    </div>
  );
};
