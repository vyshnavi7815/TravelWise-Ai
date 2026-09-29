import React, { useState } from 'react';
import { 
  Utensils, 
  ShoppingBag, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Leaf, 
  Flame, 
  Tag, 
  Sparkles,
  Gift
} from 'lucide-react';
import { 
  FoodItem, 
  ShoppingPlace, 
  DayItinerary, 
  LanguageCode 
} from '../types/travel';
import { getTranslation } from '../data/translations';

interface MasterStep4FoodItineraryProps {
  foods: FoodItem[];
  shopping: ShoppingPlace[];
  itineraries: DayItinerary[];
  days: number;
  travellers: number;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const MasterStep4FoodItinerary: React.FC<MasterStep4FoodItineraryProps> = ({
  foods,
  shopping,
  itineraries,
  days,
  travellers,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'food' | 'shopping'>('itinerary');
  const [activeDay, setActiveDay] = useState(1);

  const currentDay = itineraries.find(d => d.dayNumber === activeDay) || itineraries[0];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 4 OF 5 · CUISINE, BAZAARS & ITINERARY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Daily Itinerary & Cultural Delights
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Optimized hour-by-hour schedule, authentic local dishes, and famous shopping bazaars without exceeding your daily budget.
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-black border border-cyan-500/40 max-w-lg mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('itinerary')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'itinerary'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]'
              : 'text-cyan-400 hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Daily Schedule ({itineraries.length} Days)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('food')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'food'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]'
              : 'text-cyan-400 hover:text-white'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Local Food ({foods.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shopping')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'shopping'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]'
              : 'text-cyan-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Shopping Bazaars ({shopping.length})</span>
        </button>
      </div>

      {/* TAB 1: DAILY ITINERARY */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6 pt-2">
          {/* Day Selector Buttons */}
          <div className="flex items-center justify-center gap-2">
            {itineraries.map((day) => (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setActiveDay(day.dayNumber)}
                className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                  day.dayNumber === activeDay
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_12px_#06b6d4]'
                    : 'bg-black border-cyan-900 text-cyan-400 hover:border-cyan-700'
                }`}
              >
                DAY {day.dayNumber} · ₹{day.dayTotal.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Active Day Header */}
          <div className="p-4 rounded-2xl bg-black/80 border border-cyan-500/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-cyan-500 uppercase">{currentDay.date}</span>
              <h3 className="text-base font-bold text-white">{currentDay.theme}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-cyan-500">DAY ESTIMATE</span>
              <div className="text-lg font-mono font-bold text-cyan-300">₹{currentDay.dayTotal.toLocaleString()}</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            {currentDay.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-black/80 border border-cyan-900/60 hover:border-cyan-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {item.time}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">{item.activity}</div>
                  <div className="text-xs text-cyan-400/80 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.locationName}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-sm font-mono font-bold text-cyan-300">
                    {item.cost === 0 ? 'FREE' : `₹${item.cost}`}
                  </div>
                  <div className="text-[10px] text-cyan-500 font-mono">est. expense</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LOCAL FOODS */}
      {activeTab === 'food' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {foods.map((food) => (
            <div
              key={food.id}
              className="rounded-3xl bg-black/90 border border-cyan-900/60 hover:border-cyan-400 p-2 flex flex-col justify-between group shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <div className="relative h-44 overflow-hidden rounded-2xl bg-black">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 border ${
                    food.isVegetarian 
                      ? 'bg-black/90 text-emerald-300 border-emerald-500' 
                      : 'bg-black/90 text-rose-300 border-rose-500'
                  }`}>
                    {food.isVegetarian ? <Leaf className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
                    {food.isVegetarian ? 'VEG' : 'NON-VEG'}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/95 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                  ~₹{food.approxPrice}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {food.name}
                </h3>
                <p className="text-xs text-cyan-200/80 leading-relaxed">{food.description}</p>
                <div className="text-[11px] text-cyan-400">Famous at: {food.famousAt}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: SHOPPING */}
      {activeTab === 'shopping' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {shopping.map((shop) => (
            <div
              key={shop.id}
              className="rounded-3xl bg-black/90 border border-cyan-900/60 hover:border-cyan-400 p-2 flex flex-col justify-between group shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <div className="relative h-44 overflow-hidden rounded-2xl bg-black">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/95 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                  {shop.estimatedPriceRange}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {shop.name}
                </h3>
                <div className="text-xs text-cyan-400">{shop.location}</div>
                <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs text-cyan-200">
                  <strong>Famous For:</strong> {shop.famousFor}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-cyan-950/60">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sights & Stays</span>
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          <span>View Final Travel Pass & Safety →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
