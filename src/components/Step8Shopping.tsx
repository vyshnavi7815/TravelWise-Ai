import React from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Tag, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Shirt, 
  Gift 
} from 'lucide-react';
import { ShoppingPlace, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step8Props {
  shoppingPlaces: ShoppingPlace[];
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step8Shopping: React.FC<Step8Props> = ({
  shoppingPlaces,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 8 · BAZAARS & HANDICRAFTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.shopping}
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Explore local artisan markets, traditional apparel, and handcrafted souvenirs within budgeted price limits.
        </p>
      </div>

      {/* Suggested Shopping Allowance card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/80 border border-cyan-500/40 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300">
            <Gift className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">
              Recommended Shopping Allowance
            </div>
            <div className="text-xs text-cyan-400/80">
              Allocated ~₹400 - ₹800 per person for authentic local keepsakes.
            </div>
          </div>
        </div>
        <div className="px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-800 text-right">
          <span className="text-[10px] font-mono text-cyan-500">REPRESENTATIVE SPEND</span>
          <div className="text-lg font-mono font-bold text-cyan-300">₹800 Total</div>
        </div>
      </div>

      {/* Shopping Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {shoppingPlaces.map((shop) => (
          <div
            key={shop.id}
            className="rounded-2xl bg-black/80 border border-cyan-900/60 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:shadow-[0_0_18px_rgba(6,182,212,0.2)]"
          >
            {/* White Monochrome filtered picture */}
            <div className="relative h-44 overflow-hidden bg-black">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono capitalize">
                {shop.category.replace('_', ' ')}
              </div>

              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/90 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                {shop.estimatedPriceRange}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {shop.name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-xs text-cyan-400 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{shop.location} ({shop.distance})</span>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 mb-3">
                  <div className="text-[10px] font-mono text-cyan-500 mb-1">FAMOUS FOR:</div>
                  <p className="text-xs text-cyan-200/90 leading-relaxed">
                    {shop.famousFor}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-cyan-950/60 flex items-center justify-between text-xs">
                <span className="text-cyan-500 font-mono">Affordability:</span>
                <span className="text-cyan-300 font-semibold">{shop.budgetSuitability}</span>
              </div>
            </div>
          </div>
        ))}
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
