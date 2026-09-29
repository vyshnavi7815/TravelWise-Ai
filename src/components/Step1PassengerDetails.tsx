import React from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Wallet, 
  Users, 
  Plus, 
  Minus 
} from 'lucide-react';
import { PassengerDetails, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';
import { POPULAR_ORIGIN_CITIES, POPULAR_DESTINATIONS } from '../data/destinations';

interface Step1Props {
  details: PassengerDetails;
  onChange: (details: PassengerDetails) => void;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step1PassengerDetails: React.FC<Step1Props> = ({
  details,
  onChange,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);

  const updateField = <K extends keyof PassengerDetails>(
    field: K,
    val: PassengerDetails[K]
  ) => {
    onChange({ ...details, [field]: val });
  };

  const handleAdultsChange = (delta: number) => {
    const nextAdults = Math.max(1, details.adults + delta);
    const nextTotal = nextAdults + details.children + details.seniors;
    onChange({
      ...details,
      adults: nextAdults,
      totalTravellers: nextTotal
    });
  };

  const handleChildrenChange = (delta: number) => {
    const nextChildren = Math.max(0, details.children + delta);
    const nextTotal = details.adults + nextChildren + details.seniors;
    onChange({
      ...details,
      children: nextChildren,
      totalTravellers: nextTotal
    });
  };

  const handleSeniorsChange = (delta: number) => {
    const nextSeniors = Math.max(0, details.seniors + delta);
    const nextTotal = details.adults + details.children + nextSeniors;
    onChange({
      ...details,
      seniors: nextSeniors,
      totalTravellers: nextTotal
    });
  };

  const setBudgetPreset = (tier: PassengerDetails['budgetTier'], amt: number) => {
    onChange({
      ...details,
      budgetTier: tier,
      totalBudget: amt
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 1 · TRIP FOUNDATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.tellUsTrip}
        </h2>
        <p className="text-sm text-cyan-400/80">
          Provide your party size, route, and budget ceiling. TravelWise AI will tailor every rupee.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Passenger & Party Details */}
        <div className="p-6 rounded-2xl bg-black/80 border border-cyan-900/60 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 text-cyan-300 font-semibold text-base">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Passenger Information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1.5">
                {t.fullName}
              </label>
              <input
                type="text"
                required
                value={details.passengerName}
                onChange={(e) => updateField('passengerName', e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 placeholder:text-cyan-800 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1.5">
                Trip Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('tripType', 'round_trip')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    details.tripType === 'round_trip'
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-black border-cyan-900/80 text-cyan-600 hover:text-cyan-400'
                  }`}
                >
                  {t.roundTrip}
                </button>
                <button
                  type="button"
                  onClick={() => updateField('tripType', 'one_way')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    details.tripType === 'one_way'
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-black border-cyan-900/80 text-cyan-600 hover:text-cyan-400'
                  }`}
                >
                  {t.oneWay}
                </button>
              </div>
            </div>
          </div>

          {/* Passenger counters: Adults, Children, Seniors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-cyan-950/60">
            {/* Adults */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div>
                <div className="text-xs font-medium text-white">{t.adults}</div>
                <div className="text-[11px] text-cyan-500/80">Age 12+</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAdultsChange(-1)}
                  className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-cyan-300">{details.adults}</span>
                <button
                  type="button"
                  onClick={() => handleAdultsChange(1)}
                  className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div>
                <div className="text-xs font-medium text-white">{t.children}</div>
                <div className="text-[11px] text-cyan-500/80">Age 2-11</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleChildrenChange(-1)}
                  className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-cyan-300">{details.children}</span>
                <button
                  type="button"
                  onClick={() => handleChildrenChange(1)}
                  className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Seniors */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div>
                <div className="text-xs font-medium text-white">{t.seniors}</div>
                <div className="text-[11px] text-cyan-500/80">Age 60+</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSeniorsChange(-1)}
                  className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-cyan-300">{details.seniors}</span>
                <button
                  type="button"
                  onClick={() => handleSeniorsChange(1)}
                  className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Journey Route & Dates */}
        <div className="p-6 rounded-2xl bg-black/80 border border-cyan-900/60 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 text-cyan-300 font-semibold text-base">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Journey Details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Origin */}
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1.5">
                {t.fromLocation}
              </label>
              <input
                type="text"
                list="origin-list"
                value={details.fromLocation}
                onChange={(e) => updateField('fromLocation', e.target.value)}
                placeholder="City or Airport (e.g. Mumbai)"
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 placeholder:text-cyan-800 text-sm focus:outline-none focus:border-cyan-400"
              />
              <datalist id="origin-list">
                {POPULAR_ORIGIN_CITIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1.5">
                {t.toDestination}
              </label>
              <select
                value={details.toDestination.toLowerCase()}
                onChange={(e) => updateField('toDestination', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-sm focus:outline-none focus:border-cyan-400"
              >
                {POPULAR_DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.emoji} {d.name}, {d.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1.5">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-cyan-400" />
                {t.travelDate}
              </label>
              <input
                type="date"
                value={details.travelDate}
                onChange={(e) => updateField('travelDate', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            {details.tripType === 'round_trip' && (
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 inline mr-1 text-cyan-400" />
                  {t.returnDate}
                </label>
                <input
                  type="date"
                  value={details.returnDate}
                  onChange={(e) => updateField('returnDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Total Travel Budget */}
        <div className="p-6 rounded-2xl bg-black/80 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <div className="flex items-center gap-2 mb-2 text-cyan-300 font-semibold text-base">
            <Wallet className="w-4 h-4 text-cyan-400" />
            <span>{t.totalBudget}</span>
          </div>
          <p className="text-xs text-cyan-400/80 mb-4">
            TravelWise AI will strictly constrain all recommendations inside this limit.
          </p>

          {/* Quick Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            <button
              type="button"
              onClick={() => setBudgetPreset('low', 5000)}
              className={`p-3 rounded-xl border text-left transition-all ${
                details.budgetTier === 'low' && details.totalBudget === 5000
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-black border-cyan-900/60 text-cyan-500 hover:border-cyan-700'
              }`}
            >
              <div className="text-xs font-semibold text-white">Low Budget</div>
              <div className="text-sm font-mono font-bold text-cyan-400">₹5,000</div>
            </button>

            <button
              type="button"
              onClick={() => setBudgetPreset('medium', 15000)}
              className={`p-3 rounded-xl border text-left transition-all ${
                details.budgetTier === 'medium' && details.totalBudget === 15000
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-black border-cyan-900/60 text-cyan-500 hover:border-cyan-700'
              }`}
            >
              <div className="text-xs font-semibold text-white">Medium Budget</div>
              <div className="text-sm font-mono font-bold text-cyan-400">₹15,000</div>
            </button>

            <button
              type="button"
              onClick={() => setBudgetPreset('flexible', 35000)}
              className={`p-3 rounded-xl border text-left transition-all ${
                details.budgetTier === 'flexible' && details.totalBudget === 35000
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-black border-cyan-900/60 text-cyan-500 hover:border-cyan-700'
              }`}
            >
              <div className="text-xs font-semibold text-white">Flexible</div>
              <div className="text-sm font-mono font-bold text-cyan-400">₹35,000+</div>
            </button>

            <button
              type="button"
              onClick={() => setBudgetPreset('custom', details.totalBudget || 12000)}
              className={`p-3 rounded-xl border text-left transition-all ${
                details.budgetTier === 'custom'
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-black border-cyan-900/60 text-cyan-500 hover:border-cyan-700'
              }`}
            >
              <div className="text-xs font-semibold text-white">Custom Amount</div>
              <div className="text-sm font-mono font-bold text-cyan-400">₹ Custom</div>
            </button>
          </div>

          {/* Custom Budget Amount input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-lg">
              ₹
            </span>
            <input
              type="number"
              min={1000}
              step={500}
              value={details.totalBudget}
              onChange={(e) => {
                const val = Number(e.target.value);
                onChange({ ...details, totalBudget: val, budgetTier: 'custom' });
              }}
              placeholder="e.g. 15000"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black border border-cyan-600 text-cyan-200 text-lg font-mono font-bold focus:outline-none focus:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            />
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
