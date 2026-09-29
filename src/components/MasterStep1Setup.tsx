import React from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Wallet, 
  Users, 
  Plus, 
  Minus,
  Sparkles,
  Plane,
  Train,
  Bus,
  Car,
  Bike,
  Check,
  Globe
} from 'lucide-react';
import { 
  PassengerDetails, 
  TransportType, 
  TripPurpose, 
  LanguageCode 
} from '../types/travel';
import { getTranslation, SUPPORTED_LANGUAGES } from '../data/translations';
import { POPULAR_ORIGIN_CITIES, POPULAR_DESTINATIONS } from '../data/destinations';

interface MasterStep1SetupProps {
  details: PassengerDetails;
  onChangeDetails: (details: PassengerDetails) => void;
  selectedTransports: TransportType[];
  onSelectTransportMode: (type: TransportType) => void;
  tripPurpose: TripPurpose;
  onSelectTripPurpose: (purpose: TripPurpose) => void;
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onNext: () => void;
}

export const MasterStep1Setup: React.FC<MasterStep1SetupProps> = ({
  details,
  onChangeDetails,
  selectedTransports,
  onSelectTransportMode,
  tripPurpose,
  onSelectTripPurpose,
  currentLanguage,
  onSelectLanguage,
  onNext
}) => {
  const t = getTranslation(currentLanguage);

  const updateField = <K extends keyof PassengerDetails>(
    field: K,
    val: PassengerDetails[K]
  ) => {
    onChangeDetails({ ...details, [field]: val });
  };

  const handleAdultsChange = (delta: number) => {
    const nextAdults = Math.max(1, details.adults + delta);
    const nextTotal = nextAdults + details.children + details.seniors;
    onChangeDetails({
      ...details,
      adults: nextAdults,
      totalTravellers: nextTotal
    });
  };

  const handleChildrenChange = (delta: number) => {
    const nextChildren = Math.max(0, details.children + delta);
    const nextTotal = details.adults + nextChildren + details.seniors;
    onChangeDetails({
      ...details,
      children: nextChildren,
      totalTravellers: nextTotal
    });
  };

  const handleSeniorsChange = (delta: number) => {
    const nextSeniors = Math.max(0, details.seniors + delta);
    const nextTotal = details.adults + details.children + nextSeniors;
    onChangeDetails({
      ...details,
      seniors: nextSeniors,
      totalTravellers: nextTotal
    });
  };

  const tripPurposes = [
    {
      id: 'devotional' as TripPurpose,
      name: 'Devotional & Pilgrimage',
      emoji: '🛕',
      tagline: 'Temples & Spiritual Peace',
      desc: 'Sacred shrines, morning darshan timings, serene atmosphere, and pure vegetarian dining.'
    },
    {
      id: 'chilling' as TripPurpose,
      name: 'Chilling & Leisure',
      emoji: '🌴',
      tagline: 'Beaches & Relaxation',
      desc: 'Sunset points, coastal shacks, scenic views, and an unhurried, relaxing pace.'
    },
    {
      id: 'family' as TripPurpose,
      name: 'Family Vacation',
      emoji: '👨‍👩‍👧‍👦',
      tagline: 'Comfort & Multi-Gen',
      desc: 'Kid and senior-friendly attractions, comfortable transit, and spacious lodging.'
    },
    {
      id: 'adventure' as TripPurpose,
      name: 'Adventure & Thrills',
      emoji: '🧗',
      tagline: 'Trekking & Water Sports',
      desc: 'Mountain trails, river rafting, water sports, and high-energy excursions.'
    },
    {
      id: 'heritage' as TripPurpose,
      name: 'Heritage & Culture',
      emoji: '🏛️',
      tagline: 'Forts, Palaces & Arts',
      desc: 'Historic forts, royal palaces, UNESCO monuments, and artisan handicraft bazaars.'
    },
    {
      id: 'solo' as TripPurpose,
      name: 'Solo Backpacking',
      emoji: '🎒',
      tagline: 'Freedom & Budget Agility',
      desc: 'Backpacker hostels, two-wheeler rentals, flexibility, and meeting fellow travelers.'
    }
  ];

  const transportModes = [
    {
      type: 'flight' as TransportType,
      name: 'Flight',
      emoji: '✈️',
      desc: 'Fastest arrival · Best for long distances'
    },
    {
      type: 'train' as TransportType,
      name: 'Train',
      emoji: '🚆',
      desc: 'Superfast / 3AC Sleeper · High value & comfort'
    },
    {
      type: 'bus' as TransportType,
      name: 'Bus',
      emoji: '🚌',
      desc: 'AC Multi-Axle Sleeper · Economical'
    },
    {
      type: 'cab' as TransportType,
      name: 'Outstation Cab',
      emoji: '🚕',
      desc: 'Private Chauffeur · Door-to-door'
    },
    {
      type: 'car_rental' as TransportType,
      name: 'Rental Car',
      emoji: '🚗',
      desc: 'Self-drive freedom · Road trip privacy'
    },
    {
      type: 'bike_scooter' as TransportType,
      name: 'Bike / Scooter',
      emoji: '🛵',
      desc: 'Adventure touring · Scenic coastal/hills'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 1 OF 5 · COMPLETE TRIP & VIBE SETUP</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Tell Us About Your Journey
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Set your route, budget limit, travel purpose, and preferred transport. TravelWise AI personalizes the entire trip without exceeding your funds.
        </p>
      </div>

      {/* Language Quick Bar */}
      <div className="p-3.5 rounded-2xl bg-black/80 border border-cyan-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-mono">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Language:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {SUPPORTED_LANGUAGES.slice(0, 8).map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => onSelectLanguage(l.code)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                currentLanguage === l.code
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_#06b6d4]'
                  : 'bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/50'
              }`}
            >
              {l.flag} {l.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section A: Passenger & Route Details */}
      <div className="p-6 rounded-3xl bg-black/80 border border-cyan-900/60 backdrop-blur-md space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-950/80">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Passenger & Route Details</span>
          </h3>
          <span className="text-xs font-mono text-cyan-500">Origin to Destination</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-1.5">
              Passenger Name
            </label>
            <input
              type="text"
              value={details.passengerName}
              onChange={(e) => updateField('passengerName', e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-1.5">
              From / Starting Location
            </label>
            <input
              type="text"
              list="origin-list-1"
              value={details.fromLocation}
              onChange={(e) => updateField('fromLocation', e.target.value)}
              placeholder="City (e.g. Mumbai)"
              className="w-full px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-sm focus:outline-none focus:border-cyan-400"
            />
            <datalist id="origin-list-1">
              {POPULAR_ORIGIN_CITIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-1.5">
              Destination / To
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

        {/* Dates & Trip Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
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
                    : 'bg-black border-cyan-900/80 text-cyan-600'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => updateField('tripType', 'one_way')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  details.tripType === 'one_way'
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-black border-cyan-900/80 text-cyan-600'
                }`}
              >
                One-way
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-1.5">
              Travel Date
            </label>
            <input
              type="date"
              value={details.travelDate}
              onChange={(e) => updateField('travelDate', e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-400 mb-1.5">
              Return Date
            </label>
            <input
              type="date"
              value={details.returnDate}
              onChange={(e) => updateField('returnDate', e.target.value)}
              disabled={details.tripType === 'one_way'}
              className="w-full px-4 py-2 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400 disabled:opacity-40"
            />
          </div>
        </div>

        {/* Travellers breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-cyan-950/60">
          <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
            <div>
              <div className="text-xs font-medium text-white">Adults (12+)</div>
              <div className="text-[10px] text-cyan-500">Regular fare</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAdultsChange(-1)}
                className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-bold text-cyan-300">{details.adults}</span>
              <button
                type="button"
                onClick={() => handleAdultsChange(1)}
                className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
            <div>
              <div className="text-xs font-medium text-white">Children (2-11)</div>
              <div className="text-[10px] text-cyan-500">Half fare</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleChildrenChange(-1)}
                className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-bold text-cyan-300">{details.children}</span>
              <button
                type="button"
                onClick={() => handleChildrenChange(1)}
                className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
            <div>
              <div className="text-xs font-medium text-white">Seniors (60+)</div>
              <div className="text-[10px] text-cyan-500">Concession tier</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSeniorsChange(-1)}
                className="w-7 h-7 rounded-lg bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center hover:border-cyan-400"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-bold text-cyan-300">{details.seniors}</span>
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

      {/* Section B: Total Budget */}
      <div className="p-6 rounded-3xl bg-black/80 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wallet className="w-4 h-4 text-cyan-400" />
            <span>Total Travel Budget (₹)</span>
          </h3>
          <span className="text-xs font-mono text-cyan-400">Strict Cap Guarantee</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Low Budget', amt: 5000 },
            { label: 'Medium Budget', amt: 15000 },
            { label: 'Flexible', amt: 35000 }
          ].map((b) => (
            <button
              key={b.amt}
              type="button"
              onClick={() => updateField('totalBudget', b.amt)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                details.totalBudget === b.amt
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-black border-cyan-900/60 text-cyan-500 hover:border-cyan-700'
              }`}
            >
              <div className="text-[11px] font-semibold text-white">{b.label}</div>
              <div className="text-sm font-mono font-bold text-cyan-400">₹{b.amt.toLocaleString()}</div>
            </button>
          ))}
          <div className="p-2.5 rounded-xl bg-black border border-cyan-900/60 text-left">
            <div className="text-[11px] font-semibold text-cyan-500">Custom Amount:</div>
            <div className="text-xs font-mono text-cyan-300 mt-0.5">Editable below</div>
          </div>
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-lg">
            ₹
          </span>
          <input
            type="number"
            min={1000}
            step={500}
            value={details.totalBudget}
            onChange={(e) => updateField('totalBudget', Number(e.target.value))}
            placeholder="e.g. 15000"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black border border-cyan-600 text-cyan-200 text-lg font-mono font-bold focus:outline-none focus:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
          />
        </div>
      </div>

      {/* Section C: Trip Purpose / Vibe (Devotional, Chilling, Family, Adventure, etc.) */}
      <div className="p-6 rounded-3xl bg-black/80 border border-cyan-900/60 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-950/80">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Why Are You Travelling? (Trip Purpose)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500 text-black font-bold uppercase">
                Vibe Tuning
              </span>
            </h3>
            <p className="text-xs text-cyan-400/80">
              Personalizes temple darshans vs beach sunset shacks vs family comfort.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tripPurposes.map((p) => {
            const isSelected = tripPurpose === p.id;
            return (
              <div
                key={p.id}
                onClick={() => onSelectTripPurpose(p.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400 scale-[1.01]'
                    : 'bg-black/70 border-cyan-900/60 hover:border-cyan-600 hover:bg-cyan-950/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{p.emoji}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  <div className="text-[11px] font-mono text-cyan-400 mb-1">{p.tagline}</div>
                  <p className="text-xs text-cyan-200/80 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section D: Transport Preference */}
      <div className="p-6 rounded-3xl bg-black/80 border border-cyan-900/60 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-950/80">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Preferred Mode of Transportation</span>
            </h3>
            <p className="text-xs text-cyan-400/80">
              Pick your mode directly (e.g. Flight or Bike) or select Let AI Decide.
            </p>
          </div>
        </div>

        {/* "Let AI Decide" full width button */}
        <button
          type="button"
          onClick={() => onSelectTransportMode('ai_decide')}
          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
            selectedTransports.includes('ai_decide')
              ? 'bg-gradient-to-r from-cyan-950 via-cyan-900/40 to-black border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
              : 'bg-black/80 border-cyan-900/60 hover:border-cyan-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Let AI Decide (Best Price-Comfort Match)</div>
              <div className="text-xs text-cyan-300/80">Automatically balances flight vs train vs bus based on your budget limit</div>
            </div>
          </div>
          {selectedTransports.includes('ai_decide') && (
            <span className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xs font-bold">
              ✓
            </span>
          )}
        </button>

        {/* 6 Transport Mode Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {transportModes.map((m) => {
            const isSelected = selectedTransports.includes(m.type);
            return (
              <div
                key={m.type}
                onClick={() => onSelectTransportMode(m.type)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
                    : 'bg-black border-cyan-900/60 hover:border-cyan-600 hover:bg-cyan-950/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">{m.emoji}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{m.name}</h4>
                  <p className="text-[11px] text-cyan-300/80 mt-0.5 leading-relaxed">{m.desc}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-cyan-950 text-[10px] text-cyan-500 font-mono">
                  {isSelected ? '✓ Mode Locked' : 'Tap to select'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="px-10 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer"
        >
          <span>Calculate AI Budget Plan →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
