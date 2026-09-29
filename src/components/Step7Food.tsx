import React from 'react';
import { 
  Utensils, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Leaf, 
  Flame,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { FoodItem, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step7Props {
  foods: FoodItem[];
  days: number;
  travellers: number;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step7Food: React.FC<Step7Props> = ({
  foods,
  days,
  travellers,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);
  const [showAllFoods, setShowAllFoods] = React.useState(false);

  const mealAverages = {
    breakfast: 80,
    lunch: 180,
    dinner: 220,
    snacks: 70
  };

  const dailyPerPerson = mealAverages.breakfast + mealAverages.lunch + mealAverages.dinner + mealAverages.snacks; // ₹550
  const totalFoodBudget = dailyPerPerson * days * travellers;

  const INITIAL_FOODS_COUNT = 4;
  const visibleFoods = showAllFoods ? foods : foods.slice(0, INITIAL_FOODS_COUNT);
  const remainingFoodsCount = Math.max(0, foods.length - INITIAL_FOODS_COUNT);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Utensils className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 7 · CULINARY DISCOVERY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.foodRecommendations}
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Iconic regional dishes that travelers love, calculated with everyday street dining rates to keep you well fed and on budget.
        </p>
      </div>

      {/* Daily Budget Breakdown Banner */}
      <div className="p-6 rounded-2xl bg-black/90 border border-cyan-500/40 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-cyan-950/80">
          <div>
            <h3 className="text-base font-bold text-white">
              Estimated Meal Budget Blueprint
            </h3>
            <p className="text-xs text-cyan-400/80">
              For {travellers} traveller(s) across {days} days
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-cyan-500">TOTAL FOOD ESTIMATE</div>
            <div className="text-2xl font-mono font-extrabold text-cyan-300">
              ₹{totalFoodBudget.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Meal cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/60 text-center">
            <span className="text-[10px] font-mono text-cyan-500">BREAKFAST</span>
            <div className="font-bold text-cyan-300 text-sm mt-0.5">~₹{mealAverages.breakfast}</div>
            <span className="text-[10px] text-cyan-600">Omelettes / Poori / Chai</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/60 text-center">
            <span className="text-[10px] font-mono text-cyan-500">TRADITIONAL LUNCH</span>
            <div className="font-bold text-cyan-300 text-sm mt-0.5">~₹{mealAverages.lunch}</div>
            <span className="text-[10px] text-cyan-600">Thali / Biryani / Curry</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/60 text-center">
            <span className="text-[10px] font-mono text-cyan-500">EVENING SNACKS</span>
            <div className="font-bold text-cyan-300 text-sm mt-0.5">~₹{mealAverages.snacks}</div>
            <span className="text-[10px] text-cyan-600">Local sweets / Street bites</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/60 text-center">
            <span className="text-[10px] font-mono text-cyan-500">DINNER</span>
            <div className="font-bold text-cyan-300 text-sm mt-0.5">~₹{mealAverages.dinner}</div>
            <span className="text-[10px] text-cyan-600">Cafe dining / Grills</span>
          </div>
        </div>
      </div>

      {/* Featured Food Items Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {visibleFoods.map((food) => (
          <div
            key={food.id}
            className="rounded-2xl bg-black/80 border border-cyan-900/60 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:shadow-[0_0_18px_rgba(6,182,212,0.2)]"
          >
            {/* White Monochrome filtered image */}
            <div className="relative h-44 overflow-hidden bg-black">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              {/* Veg / Non-veg badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 border ${
                  food.isVegetarian 
                    ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500' 
                    : 'bg-rose-950/90 text-rose-300 border-rose-500'
                }`}>
                  {food.isVegetarian ? <Leaf className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
                  {food.isVegetarian ? 'VEGETARIAN' : 'NON-VEG'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono capitalize">
                  {food.mealType}
                </span>
              </div>

              {/* Price pill */}
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/90 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                ~₹{food.approxPrice}
              </div>
            </div>

            {/* Food Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {food.name}
                </h3>
                <p className="text-xs text-cyan-200/80 mb-3 leading-relaxed">
                  {food.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-cyan-400 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{food.famousAt}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/60 text-xs text-cyan-300 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{food.aiRecommendation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW MORE FOODS & STREET SPECIALTIES BUTTON */}
      {remainingFoodsCount > 0 && (
        <div className="text-center mb-8">
          {!showAllFoods ? (
            <button
              onClick={() => setShowAllFoods(true)}
              className="px-6 py-3 rounded-2xl bg-cyan-950/70 border border-cyan-400 hover:border-cyan-300 text-cyan-200 hover:text-white font-bold text-xs transition-all cyan-glow flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-cyan-400" />
              <span>Show More Foods & Street Delicacies ({remainingFoodsCount} More Dishes) 🍲</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAllFoods(false)}
              className="px-5 py-2 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white text-xs font-medium transition-all mx-auto cursor-pointer"
            >
              <span>Show Top Signature Dishes Only</span>
            </button>
          )}
        </div>
      )}

      {/* TOP RECOMMENDED RESTAURANTS & EATERIES */}
      <div className="mt-8 pt-6 border-t border-cyan-900/60">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Utensils className="w-4 h-4 text-cyan-400" />
              <span>Top Vetted Restaurants & Dining Spots</span>
            </h3>
            <p className="text-xs text-cyan-400/80">
              Verified hygienic dining options within comfortable distance of your stay and attractions.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-500">AI Curated · Budget Checked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/80 border border-cyan-900/60 hover:border-cyan-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-white">Vinayak Family Restaurant</h4>
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500 text-cyan-300 text-[10px] font-mono font-bold">⭐ 4.8</span>
              </div>
              <p className="text-xs text-cyan-400/80 font-mono mb-2">Authentic Local Thali & Fish Curry</p>
              <p className="text-xs text-cyan-200/70 mb-3 leading-relaxed">
                Crowd-favorite iconic eatery known for fresh catch, homely masala recipes, and lightning-fast service.
              </p>
            </div>
            <div className="pt-2 border-t border-cyan-950 flex items-center justify-between text-xs">
              <span className="text-cyan-500 font-mono">~₹400 for two</span>
              <span className="text-emerald-400 font-bold">🟢 Budget Friendly</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/80 border border-cyan-900/60 hover:border-cyan-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-white">Govinda's Pure Veg Haven</h4>
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500 text-cyan-300 text-[10px] font-mono font-bold">⭐ 4.9</span>
              </div>
              <p className="text-xs text-emerald-400/80 font-mono mb-2">100% Pure Veg & Sattvic Meals</p>
              <p className="text-xs text-cyan-200/70 mb-3 leading-relaxed">
                Ideal for devotional travelers and families. Clean kitchen, organic ghee dosas, thalis, and fresh fruit lassi.
              </p>
            </div>
            <div className="pt-2 border-t border-cyan-950 flex items-center justify-between text-xs">
              <span className="text-cyan-500 font-mono">~₹350 for two</span>
              <span className="text-emerald-400 font-bold">🟢 Super Affordable</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/80 border border-cyan-900/60 hover:border-cyan-400 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-white">Sunset Promenade Cafe & Grill</h4>
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500 text-cyan-300 text-[10px] font-mono font-bold">⭐ 4.7</span>
              </div>
              <p className="text-xs text-cyan-400/80 font-mono mb-2">Continental & Seaside Chilling</p>
              <p className="text-xs text-cyan-200/70 mb-3 leading-relaxed">
                Stunning golden hour vistas, wood-fired thin crust pizza, cold brew coffees, and chill acoustic music.
              </p>
            </div>
            <div className="pt-2 border-t border-cyan-950 flex items-center justify-between text-xs">
              <span className="text-cyan-500 font-mono">~₹700 for two</span>
              <span className="text-yellow-400 font-bold">🟡 Moderate</span>
            </div>
          </div>
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
