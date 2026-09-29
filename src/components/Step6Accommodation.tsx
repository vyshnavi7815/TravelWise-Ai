import React from 'react';
import { 
  Hotel, 
  Star, 
  MapPin, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { AccommodationOption, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step6Props {
  accommodations: AccommodationOption[];
  selectedStayId: string;
  onSelectStayId: (id: string) => void;
  onBookStayNow?: (stay: AccommodationOption) => void;
  nights: number;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step6Accommodation: React.FC<Step6Props> = ({
  accommodations,
  selectedStayId,
  onSelectStayId,
  onBookStayNow,
  nights,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);

  const renderBadge = (cat: AccommodationOption['category']) => {
    switch (cat) {
      case 'cheapest':
        return (
          <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-[10px] font-mono font-bold uppercase">
            Cheapest Option
          </span>
        );
      case 'best_value':
        return (
          <span className="px-2 py-0.5 rounded bg-sky-950/90 border border-sky-500/60 text-sky-300 text-[10px] font-mono font-bold uppercase">
            Best Value
          </span>
        );
      case 'best_comfort':
        return (
          <span className="px-2 py-0.5 rounded bg-purple-950/90 border border-purple-500/60 text-purple-300 text-[10px] font-mono font-bold uppercase">
            Best Comfort
          </span>
        );
      case 'ai_pick':
        return (
          <span className="px-2 py-0.5 rounded bg-cyan-400 text-black text-[10px] font-mono font-extrabold uppercase cyan-glow-sm">
            AI Top Pick ⭐
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Hotel className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 6 · STAYS & ACCOMMODATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.accommodation} ({nights} Nights)
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Vetted hotels, boutique havelis, and backpacker suites within comfortable proximity to tourist attractions.
        </p>
      </div>

      {/* Accommodations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {accommodations.map((stay) => {
          const isSelected = selectedStayId === stay.id;
          const totalCost = stay.pricePerNight * nights;

          return (
            <div
              key={stay.id}
              onClick={() => onSelectStayId(stay.id)}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_22px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400 scale-[1.01]'
                  : 'bg-black/80 border-cyan-900/60 hover:border-cyan-500/60 hover:bg-cyan-950/20'
              }`}
            >
              {/* White-filtered crisp picture */}
              <div className="relative h-44 overflow-hidden bg-black">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {renderBadge(stay.category)}
                  <span className="px-2 py-0.5 rounded-lg bg-black/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-1 font-bold">
                    <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                    {stay.rating}
                  </span>
                </div>

                {/* Selection circle */}
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  isSelected ? 'bg-cyan-400 border-cyan-300 text-black' : 'bg-black/60 border-cyan-800'
                }`}>
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                {/* Nightly price pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/90 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                  ₹{stay.pricePerNight.toLocaleString()} / night
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {stay.name}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400/80 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{stay.distanceFromSights}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {stay.amenities.map((a, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-900/60 text-cyan-300 text-[11px]"
                      >
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Total stay calculation & cancellation & Book button */}
                <div className="pt-3 border-t border-cyan-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-cyan-500 font-mono">
                      {nights} Nights Total:
                    </span>{' '}
                    <strong className="text-cyan-300 font-mono text-sm">
                      ₹{totalCost.toLocaleString()}
                    </strong>
                    <div className="text-cyan-400/70 text-[10px] mt-0.5">
                      {stay.cancellationPolicy}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStayId(stay.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
                          : 'bg-black border border-cyan-700 text-cyan-300 hover:border-cyan-400'
                      }`}
                    >
                      {isSelected ? '✓ Selected Stay' : 'Select'}
                    </button>

                    {onBookStayNow && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStayId(stay.id);
                          onBookStayNow(stay);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500 text-cyan-300 hover:text-white hover:bg-cyan-900 text-xs font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                      >
                        Book Room 🏨
                      </button>
                    )}
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
