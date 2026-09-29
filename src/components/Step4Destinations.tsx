import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  X, 
  Bus, 
  CheckCircle2, 
  Eye,
  Landmark,
  ChevronDown,
  ChevronUp,
  Compass
} from 'lucide-react';
import { TouristPlace, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step4Props {
  places: TouristPlace[];
  destinationName: string;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step4Destinations: React.FC<Step4Props> = ({
  places,
  destinationName,
  onNext,
  onBack,
  lang
}) => {
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'historical' | 'temple' | 'beach_nature'>('all');
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const t = getTranslation(lang);

  // Filter places based on selected category tab
  const filteredPlaces = places.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'historical') return p.category === 'Historical' || p.category === 'Museum';
    if (activeCategory === 'temple') return p.category === 'Temple';
    if (activeCategory === 'beach_nature') return p.category === 'Beach' || p.category === 'Nature' || p.category === 'Viewpoint';
    return true;
  });

  const INITIAL_COUNT = 4;
  const isFiltering = activeCategory !== 'all';
  const visiblePlaces = (showAllPlaces || isFiltering) 
    ? filteredPlaces 
    : filteredPlaces.slice(0, INITIAL_COUNT);

  const remainingCount = Math.max(0, filteredPlaces.length - INITIAL_COUNT);
  const historicalCount = places.filter(p => p.category === 'Historical' || p.category === 'Museum').length;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Step Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 6 OF 8 · BEST PLACES & HISTORICAL SIGHTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.placesToVisit} & Historical Sights in <span className="capitalize text-cyan-400">{destinationName}</span>
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Explore iconic beaches, ancient Portuguese forts, sacred devotional shrines, and hidden coastal viewpoints within your budget.
        </p>
      </div>

      {/* Historical Sights Spotlight Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950 via-black to-cyan-950/70 border border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-400 text-black flex items-center justify-center shrink-0 shadow-[0_0_10px_#06b6d4]">
            <Landmark className="w-5 h-5 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                HISTORICAL PLACES & HERITAGE
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 text-[10px] font-mono">
                {historicalCount} Historical Monuments
              </span>
            </div>
            <p className="text-xs text-cyan-200/80 mt-0.5 max-w-xl">
              Discover centuries-old forts (Aguada, Chapora, Reis Magos), UNESCO Baroque cathedrals, and Latin Quarter heritage walks with minimal entry fees.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveCategory('historical');
            setShowAllPlaces(true);
          }}
          className="px-4 py-2 rounded-xl bg-black border border-cyan-400 text-cyan-300 hover:text-white hover:bg-cyan-950 text-xs font-bold transition-all cyan-glow shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <span>View Historical Forts 🏛️</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-black border border-cyan-900/60 max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => {
            setActiveCategory('all');
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
              : 'text-cyan-400 hover:text-white hover:bg-cyan-950/40'
          }`}
        >
          🌟 All Sights ({places.length})
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('historical');
            setShowAllPlaces(true);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeCategory === 'historical'
              ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
              : 'text-cyan-400 hover:text-white hover:bg-cyan-950/40'
          }`}
        >
          <span>🏛️ Historical & Forts</span>
          <span className="text-[10px] px-1 rounded bg-black/60">{historicalCount}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('temple');
            setShowAllPlaces(true);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeCategory === 'temple'
              ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
              : 'text-cyan-400 hover:text-white hover:bg-cyan-950/40'
          }`}
        >
          <span>🛕 Temples & Spiritual</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('beach_nature');
            setShowAllPlaces(true);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeCategory === 'beach_nature'
              ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
              : 'text-cyan-400 hover:text-white hover:bg-cyan-950/40'
          }`}
        >
          <span>🏖️ Beaches & Nature</span>
        </button>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visiblePlaces.map((place) => {
          const totalCostToVisit = place.entryFee + place.localTransportCost;
          const isUnderBudget = totalCostToVisit <= 250;
          const isModerate = totalCostToVisit > 250 && totalCostToVisit <= 600;

          return (
            <div
              key={place.id}
              className="rounded-2xl bg-black/90 border border-cyan-900/60 hover:border-cyan-400 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:shadow-[0_0_22px_rgba(6,182,212,0.3)]"
            >
              {/* Picture with clean white borders and crisp lighting */}
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Category & Rating */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 border shadow-md ${
                    place.category === 'Historical'
                      ? 'bg-amber-950/90 text-amber-300 border-amber-500'
                      : place.category === 'Temple'
                      ? 'bg-orange-950/90 text-orange-300 border-orange-500'
                      : 'bg-black/90 text-cyan-300 border-cyan-500/60'
                  }`}>
                    {place.category === 'Historical' && '🏛️ '}
                    {place.category === 'Temple' && '🛕 '}
                    {place.category}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-black/90 border border-cyan-400 text-cyan-200 text-xs font-mono flex items-center gap-1 font-bold">
                    <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                    {place.aiRating}
                  </span>
                </div>

                {/* Entry fee pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/90 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                  {place.entryFee === 0 ? 'FREE ENTRY' : `Entry: ₹${place.entryFee}`}
                </div>
              </div>

              {/* Place Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-xs text-cyan-200/80 line-clamp-2 mb-3 leading-relaxed">
                    {place.description}
                  </p>

                  {/* Metadata row */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-cyan-400/90 mb-3 bg-cyan-950/20 p-2.5 rounded-xl border border-cyan-900/40">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{place.estimatedVisitingTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bus className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Transit ~₹{place.localTransportCost}</span>
                    </div>
                  </div>

                  {/* Is it under budget & Price to go there check */}
                  <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-800/60">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 block">TOTAL EXPENSE TO VISIT</span>
                      <span className="text-xs font-mono font-bold text-white">
                        ₹{totalCostToVisit} <span className="text-[10px] text-cyan-500">(Entry + Cab/Bus)</span>
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isUnderBudget
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' 
                        : isModerate
                        ? 'bg-yellow-950 text-yellow-300 border border-yellow-500'
                        : 'bg-rose-950 text-rose-300 border border-rose-500'
                    }`}>
                      {isUnderBudget ? '🟢 Under Budget' : isModerate ? '🟡 Moderate' : '🔴 Higher Cost'}
                    </span>
                  </div>

                  {/* Why AI Selected */}
                  <div className="border-t border-cyan-950/60 pt-3 mb-4">
                    <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>{t.whyAiSelected}:</span>
                    </div>
                    <ul className="space-y-1">
                      {place.whyAiSelected.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="text-xs text-cyan-300/80 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* View Place Details Modal Trigger */}
                <button
                  type="button"
                  onClick={() => setSelectedPlace(place)}
                  className="w-full py-2.5 px-4 rounded-xl bg-black border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-950/30 text-cyan-300 text-xs font-semibold transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.viewPlace}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SHOW MORE PLACES TO VISIT BUTTON AT THE END OF THE LIST */}
      {!isFiltering && remainingCount > 0 && (
        <div className="text-center pt-2">
          {!showAllPlaces ? (
            <button
              onClick={() => setShowAllPlaces(true)}
              className="px-8 py-4 rounded-2xl bg-cyan-950/80 border-2 border-cyan-400 hover:border-cyan-300 text-white font-bold text-sm transition-all cyan-glow flex items-center justify-center gap-2.5 mx-auto hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Show More Places to Visit ({remainingCount} More Historic Sights & Hidden Gems) 🏛️</span>
              <ChevronDown className="w-4 h-4 text-cyan-400" />
            </button>
          ) : (
            <button
              onClick={() => setShowAllPlaces(false)}
              className="px-6 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <span>Show Top Recommendations Only</span>
              <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          )}
        </div>
      )}

      {/* Place Details Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl bg-black border border-cyan-400 p-6 shadow-2xl cyan-glow overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-cyan-950 border border-cyan-500 text-cyan-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="relative h-56 rounded-xl overflow-hidden mb-4 bg-black border border-cyan-800">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-mono px-2.5 py-1 rounded bg-black/90 border border-cyan-500 text-cyan-300 font-bold">
                {selectedPlace.category} · Rating {selectedPlace.aiRating}/5
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{selectedPlace.name}</h3>
            <p className="text-xs text-cyan-200/90 leading-relaxed mb-4">{selectedPlace.description}</p>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
                <span className="text-cyan-500 font-mono text-[10px] block">BEST TIME TO VISIT</span>
                <span className="text-white font-medium">{selectedPlace.bestTimeToVisit}</span>
              </div>
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
                <span className="text-cyan-500 font-mono text-[10px] block">ESTIMATED TIME</span>
                <span className="text-white font-medium">{selectedPlace.estimatedVisitingTime}</span>
              </div>
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
                <span className="text-cyan-500 font-mono text-[10px] block">ENTRY TICKET FEE</span>
                <span className="text-white font-bold">{selectedPlace.entryFee === 0 ? 'FREE ENTRY' : `₹${selectedPlace.entryFee}`}</span>
              </div>
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
                <span className="text-cyan-500 font-mono text-[10px] block">CAB / BUS TRANSIT</span>
                <span className="text-white font-medium">~₹{selectedPlace.localTransportCost}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-4">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider mb-2">Key Highlights</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedPlace.highlights.map((h, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-xs">
                    ★ {h}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedPlace(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-all cyan-glow cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-cyan-950/60">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Station Transit</span>
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          <span>Continue to Food & Restaurants →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
