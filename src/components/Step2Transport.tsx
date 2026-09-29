import React from 'react';
import { 
  Plane, 
  Train, 
  Bus, 
  Car, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Bike,
  Heart,
  Palmtree,
  Users2,
  Mountain,
  Landmark,
  Compass
} from 'lucide-react';
import { TransportType, TripPurpose, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step2Props {
  tripPurpose: TripPurpose;
  onSelectTripPurpose: (purpose: TripPurpose) => void;
  selectedTransports: TransportType[];
  onToggleTransport: (type: TransportType) => void;
  onSelectAiDecide: () => void;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step2Transport: React.FC<Step2Props> = ({
  tripPurpose,
  onSelectTripPurpose,
  selectedTransports,
  onToggleTransport,
  onSelectAiDecide,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);
  const isAiDecide = selectedTransports.includes('ai_decide');

  const tripPurposes = [
    {
      id: 'devotional' as TripPurpose,
      name: 'Devotional / Pilgrimage',
      emoji: '🛕',
      tagline: 'Temples & Spiritual Peace',
      desc: 'Prioritizes sacred shrines, early morning darshan timings, peaceful atmosphere, and pure vegetarian dining.'
    },
    {
      id: 'chilling' as TripPurpose,
      name: 'Chilling & Leisure',
      emoji: '🌴',
      tagline: 'Beaches & Relaxation',
      desc: 'Focuses on scenic sunsets, coastal shacks, relaxing cafe walks, and a zero-rush, laid-back travel pace.'
    },
    {
      id: 'family' as TripPurpose,
      name: 'Family Vacation',
      emoji: '👨‍👩‍👧‍👦',
      tagline: 'Comfort & Multi-generation',
      desc: 'Curated for kids and senior citizens with spacious lodging, gentle walking distances, and safe, comfortable transit.'
    },
    {
      id: 'adventure' as TripPurpose,
      name: 'Adventure & Thrills',
      emoji: '🧗',
      tagline: 'Trekking & Water Sports',
      desc: 'Geared towards high-energy trails, paragliding, river rafting, scuba diving, and wilderness exploration.'
    },
    {
      id: 'heritage' as TripPurpose,
      name: 'Heritage & Culture',
      emoji: '🏛️',
      tagline: 'Forts, Palaces & Arts',
      desc: 'Deep dive into royal monuments, UNESCO archaeological sites, local folk music, and traditional artisan bazaars.'
    },
    {
      id: 'solo' as TripPurpose,
      name: 'Solo Backpacking',
      emoji: '🎒',
      tagline: 'Freedom & Budget Agility',
      desc: 'Ultra cost-efficient backpacker hostels, bike rentals, spontaneous hidden gems, and meeting fellow travelers.'
    }
  ];

  const transportCards = [
    {
      type: 'flight' as TransportType,
      name: 'Flight',
      icon: Plane,
      emoji: '✈️',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
      tagline: 'Fastest arrival',
      desc: 'Ideal for long distances, saves maximum travel hours.'
    },
    {
      type: 'train' as TransportType,
      name: 'Train',
      icon: Train,
      emoji: '🚆',
      image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=600&q=80',
      tagline: 'Highest comfort vs budget ratio',
      desc: 'Scenic, spacious sleeper berths, and low carbon footprint.'
    },
    {
      type: 'bus' as TransportType,
      name: 'Bus',
      icon: Bus,
      emoji: '🚌',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      tagline: 'Economical sleeper pods',
      desc: 'Frequent overnight routes with central boarding points.'
    },
    {
      type: 'cab' as TransportType,
      name: 'Outstation Cab',
      icon: Car,
      emoji: '🚕',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
      tagline: 'Door-to-door flexibility',
      desc: 'Private air-conditioned chauffeur, stop wherever you desire.'
    },
    {
      type: 'car_rental' as TransportType,
      name: 'Rental Car',
      icon: Car,
      emoji: '🚗',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
      tagline: 'Self-drive freedom',
      desc: 'Full autonomy for road trip lovers with private privacy.'
    },
    {
      type: 'bike_scooter' as TransportType,
      name: 'Bike / Scooter',
      icon: Bike,
      emoji: '🛵',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
      tagline: 'Adventure touring',
      desc: 'Thrilling mountain/coastal breeze, ideal for solo & duo riders.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 2 · PURPOSE & TRANSIT PREFERENCES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Why Are You Travelling?
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Tell us the soul of your trip (devotional, chilling, family, or adventure). TravelWise AI will tune temples, beaches, food, and timing accordingly.
        </p>
      </div>

      {/* SECTION 1: TRIP PURPOSE SELECTION (User Request point 3) */}
      <div className="mb-10 p-6 rounded-3xl bg-black/90 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-950/80">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Select Your Trip Purpose / Vibe</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500 text-black font-bold uppercase">
                Required
              </span>
            </h3>
            <p className="text-xs text-cyan-400/80">
              This customizes which attractions, dining styles, and itinerary pacing the AI selects for you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {tripPurposes.map((p) => {
            const isSelected = tripPurpose === p.id;
            return (
              <div
                key={p.id}
                onClick={() => onSelectTripPurpose(p.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400 scale-[1.02]'
                    : 'bg-black/80 border-cyan-900/60 hover:border-cyan-500/60 hover:bg-cyan-950/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{p.emoji}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected ? 'bg-cyan-400 border-cyan-300 text-black' : 'border-cyan-800'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {p.name}
                  </h4>
                  <div className="text-[11px] font-mono text-cyan-400 mb-1.5">
                    {p.tagline}
                  </div>
                  <p className="text-xs text-cyan-200/80 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-cyan-950/60 flex items-center justify-between text-[10px] text-cyan-500">
                  <span>AI Tuning: Active</span>
                  <span className={isSelected ? 'text-cyan-300 font-bold' : ''}>
                    {isSelected ? '✓ Chosen Vibe' : 'Click to select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: TRANSPORT PREFERENCES */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              {t.howToTravel}
            </h3>
            <p className="text-xs text-cyan-400/80">
              Select one, multiple, or let AI calculate the best price-to-comfort match.
            </p>
          </div>
        </div>

        {/* "Let AI Decide" Card */}
        <div className="mb-5">
          <button
            type="button"
            onClick={onSelectAiDecide}
            className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 ${
              isAiDecide
                ? 'bg-gradient-to-r from-cyan-950 via-cyan-900/40 to-black border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] scale-[1.01]'
                : 'bg-black/80 border-cyan-500/30 hover:border-cyan-400/80 hover:bg-cyan-950/20'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shrink-0 cyan-glow-sm">
                <Sparkles className="w-6 h-6 text-cyan-300 fill-cyan-400/30" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white font-sans">
                    {t.letAiDecide}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500 text-black font-extrabold uppercase">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-cyan-300/80 mt-0.5">
                  Compares Train, Flight, Bus, and Cabs automatically to maximize your remaining holiday budget.
                </p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
              isAiDecide ? 'bg-cyan-400 border-cyan-300 text-black' : 'border-cyan-800'
            }`}>
              {isAiDecide && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </button>
        </div>

        {/* Transport Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {transportCards.map((card) => {
            const isSelected = selectedTransports.includes(card.type);
            return (
              <div
                key={card.type}
                onClick={() => onToggleTransport(card.type)}
                className={`rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-[1.02]'
                    : 'bg-black/80 border-cyan-900/60 hover:border-cyan-500/60 hover:bg-cyan-950/20'
                }`}
              >
                {/* White-filtered crisp picture */}
                <div className="relative h-32 overflow-hidden bg-black">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5">
                    <span>{card.emoji}</span>
                    <span>{card.name}</span>
                  </div>
                  <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected ? 'bg-cyan-400 border-cyan-300 text-black' : 'bg-black/60 border-cyan-800'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-cyan-400 mb-1">
                      {card.tagline}
                    </div>
                    <p className="text-xs text-cyan-200/80 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-cyan-950/60 flex items-center justify-between text-[11px] text-cyan-500">
                    <span>Tap to toggle</span>
                    <span className={isSelected ? 'text-cyan-300 font-bold' : ''}>
                      {isSelected ? '✓ Selected' : 'Not chosen'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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
