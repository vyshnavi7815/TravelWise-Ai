import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Bus, 
  Footprints, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Train 
} from 'lucide-react';
import { TouristPlace, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step10Props {
  places: TouristPlace[];
  destinationName: string;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step10FromMyLocation: React.FC<Step10Props> = ({
  places,
  destinationName,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);
  const [currentLocation, setCurrentLocation] = useState('My Hotel / City Center');
  const [isGpsActive, setIsGpsActive] = useState(false);

  const handleUseGps = () => {
    setIsGpsActive(true);
    setCurrentLocation('Live GPS: 15.4989° N, 73.8278° E (Panaji Center)');
  };

  const commonLandmarks = [
    'My Hotel Stay',
    'Main Railway Station',
    'City Central Bus Terminal',
    'Airport Arrival Terminal'
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 10 · POINT-TO-POINT TRANSIT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.fromMyLocation}
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          AI calculates optimal routing from your pickup point to every key destination, prioritizing cost against travel time.
        </p>
      </div>

      {/* Origin Picker / GPS Bar */}
      <div className="p-5 rounded-2xl bg-black/90 border border-cyan-500/40 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:flex-1">
            <label className="block text-xs font-mono text-cyan-400 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Current Starting Landmark or GPS</span>
            </label>
            <input
              type="text"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-cyan-700 text-cyan-200 text-sm focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleUseGps}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                isGpsActive
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-black border-cyan-800 text-cyan-400 hover:border-cyan-500'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${isGpsActive ? 'animate-spin' : ''}`} />
              <span>Use Current GPS</span>
            </button>
          </div>
        </div>

        {/* Quick Landmark Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-cyan-950/60 text-xs">
          <span className="text-cyan-500 font-mono text-[11px]">Quick Jump:</span>
          {commonLandmarks.map((lm, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setCurrentLocation(lm);
                setIsGpsActive(false);
              }}
              className="px-2.5 py-1 rounded-lg bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-900/60 text-cyan-300 text-[11px] transition-colors"
            >
              {lm}
            </button>
          ))}
        </div>
      </div>

      {/* Routes Grid from Location to each Attraction */}
      <div className="space-y-4 mb-8">
        {places.map((place, idx) => {
          const busFare = 30 + idx * 10;
          const busTime = 35 + idx * 15;
          const cabFare = 280 + idx * 70;
          const cabTime = 18 + idx * 8;
          const walkDist = (2.2 + idx * 1.8).toFixed(1);

          return (
            <div
              key={place.id}
              className="p-5 rounded-2xl bg-black/80 border border-cyan-900/60 hover:border-cyan-500/60 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-cyan-950/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold font-mono">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-cyan-500">
                      ROUTE FROM {currentLocation.split('(')[0].trim().toUpperCase()}
                    </div>
                    <h3 className="text-base font-bold text-white">
                      → {place.name}
                    </h3>
                  </div>
                </div>

                {/* AI Optimal Pick for this route */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI BEST UNDER BUDGET: Bus (₹{busFare})</span>
                </div>
              </div>

              {/* Transit Modes Multi-Column */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cab */}
                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Car className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Direct Cab</div>
                      <div className="text-[11px] text-cyan-500">{cabTime} mins</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-cyan-300">₹{cabFare}</div>
                    <div className="text-[10px] text-cyan-600">Door-to-door</div>
                  </div>
                </div>

                {/* Bus / Shuttle (AI Winner) */}
                <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/60 ring-1 ring-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Bus className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Public / AC Bus</div>
                      <div className="text-[11px] text-cyan-400 font-medium">{busTime} mins</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">₹{busFare}</div>
                    <div className="text-[10px] text-emerald-500 font-mono">Best Value</div>
                  </div>
                </div>

                {/* Walking */}
                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Footprints className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Walking Tour</div>
                      <div className="text-[11px] text-cyan-500">{walkDist} km</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-cyan-300">FREE</div>
                    <div className="text-[10px] text-cyan-600">Zero cost</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
