import React, { useState } from 'react';
import { 
  MapPin, 
  Hotel, 
  Navigation, 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  Clock, 
  Bus, 
  Eye, 
  X, 
  Sparkles, 
  Check, 
  Car, 
  Footprints, 
  CheckCircle2 
} from 'lucide-react';
import { 
  TouristPlace, 
  AccommodationOption, 
  LocalTransportOption, 
  LanguageCode 
} from '../types/travel';
import { getTranslation } from '../data/translations';

interface MasterStep3PlacesStaysProps {
  places: TouristPlace[];
  accommodations: AccommodationOption[];
  localTransports: LocalTransportOption[];
  selectedStayId: string;
  onSelectStayId: (id: string) => void;
  destinationName: string;
  recommendedDays: number;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const MasterStep3PlacesStays: React.FC<MasterStep3PlacesStaysProps> = ({
  places,
  accommodations,
  localTransports,
  selectedStayId,
  onSelectStayId,
  destinationName,
  recommendedDays,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);
  const [activeTab, setActiveTab] = useState<'places' | 'stays' | 'transit'>('places');
  const [selectedPlaceModal, setSelectedPlaceModal] = useState<TouristPlace | null>(null);

  // Transit from location state
  const [currentLocation, setCurrentLocation] = useState('My Hotel / City Center');

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 3 OF 5 · SIGHTS, STAYS & LOCAL TRANSIT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Discover <span className="capitalize text-cyan-400">{destinationName}</span>
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Explore curated places to visit, handpicked hotels within your budget, and seamless ways to get around.
        </p>
      </div>

      {/* Clean Sub-navigation Tabs */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-black border border-cyan-500/40 max-w-lg mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('places')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'places'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]'
              : 'text-cyan-400 hover:text-white'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Places to Visit ({places.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stays')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'stays'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]'
              : 'text-cyan-400 hover:text-white'
          }`}
        >
          <Hotel className="w-3.5 h-3.5" />
          <span>Stays & Hotels ({accommodations.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('transit')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'transit'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_#06b6d4]'
              : 'text-cyan-400 hover:text-white'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Getting Around</span>
        </button>
      </div>

      {/* TAB 1: PLACES TO VISIT */}
      {activeTab === 'places' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {places.map((place) => (
            <div
              key={place.id}
              className="rounded-3xl bg-black/90 border border-cyan-900/60 hover:border-cyan-400 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              {/* Bright, clearly illuminated picture with clean white frame */}
              <div className="relative h-48 overflow-hidden bg-black p-2">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/90 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                    {place.category}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-black/90 border border-cyan-400 text-cyan-200 text-xs font-mono flex items-center gap-1 font-bold">
                    <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                    {place.aiRating}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/95 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                  {place.entryFee === 0 ? 'FREE ENTRY' : `Entry: ₹${place.entryFee}`}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-xs text-cyan-200/90 line-clamp-2 mt-1 leading-relaxed">
                    {place.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-cyan-400 mt-3 p-2 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{place.estimatedVisitingTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bus className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Transit ~₹{place.localTransportCost}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlaceModal(place)}
                  className="w-full py-2.5 px-4 rounded-xl bg-black border border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-950/40 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Place Details & Photos</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: STAYS & HOTELS */}
      {activeTab === 'stays' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {accommodations.map((stay) => {
            const isSelected = selectedStayId === stay.id;
            const totalCost = stay.pricePerNight * recommendedDays;

            return (
              <div
                key={stay.id}
                onClick={() => onSelectStayId(stay.id)}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group p-2 ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
                    : 'bg-black/90 border-cyan-900/60 hover:border-cyan-500'
                }`}
              >
                <div className="relative h-44 overflow-hidden rounded-2xl bg-black">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-black/90 border border-cyan-400 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                      {stay.category.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-black/90 border border-cyan-400 text-cyan-200 text-xs font-mono flex items-center gap-1 font-bold">
                      <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                      {stay.rating}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/95 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                    ₹{stay.pricePerNight.toLocaleString()} / night
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {stay.name}
                      </h3>
                      {isSelected && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400 text-black font-extrabold uppercase">
                          ✓ Selected
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-cyan-400/80 mt-1">{stay.distanceFromSights}</div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {stay.amenities.slice(0, 3).map((a, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-900/60 text-cyan-300 text-[10px]">
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-cyan-950/80 flex items-center justify-between text-xs">
                    <span className="text-cyan-500 font-mono">{recommendedDays} Nights Total:</span>
                    <span className="font-mono text-cyan-300 font-bold text-sm">₹{totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: GETTING AROUND & POINT-TO-POINT TRANSIT */}
      {activeTab === 'transit' && (
        <div className="space-y-6 pt-2">
          {/* Location Picker */}
          <div className="p-5 rounded-2xl bg-black/90 border border-cyan-500/40">
            <label className="block text-xs font-mono text-cyan-400 mb-1.5">
              Select Starting Point to Sights:
            </label>
            <div className="flex flex-wrap gap-2">
              {['My Hotel Stay', 'Central Station', 'Airport Terminal', 'City Center'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setCurrentLocation(l)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                    currentLocation === l
                      ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                      : 'bg-black border-cyan-800 text-cyan-400 hover:border-cyan-600'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Transit options list to places */}
          <div className="space-y-3">
            {places.slice(0, 3).map((p, i) => (
              <div key={p.id} className="p-4 rounded-2xl bg-black/80 border border-cyan-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-cyan-500 uppercase">
                    From {currentLocation} →
                  </span>
                  <h4 className="text-base font-bold text-white">{p.name}</h4>
                  <div className="text-xs text-cyan-400/80 mt-0.5">
                    Recommended: Public AC Bus (₹{30 + i * 15} · 25 mins) or Cab (₹{240 + i * 60})
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <div className="text-sm font-mono font-bold text-emerald-400">Best: ~₹{30 + i * 15}</div>
                  <span className="text-[10px] text-cyan-600 font-mono">Within budget</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Place Details Modal */}
      {selectedPlaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-black border-2 border-cyan-400 p-6 shadow-2xl cyan-glow overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedPlaceModal(null)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-cyan-950 border border-cyan-600 text-cyan-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-black p-1.5">
              <img
                src={selectedPlaceModal.image}
                alt={selectedPlaceModal.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <h3 className="text-xl font-bold text-white mb-1.5">
              {selectedPlaceModal.name}
            </h3>
            <p className="text-xs text-cyan-200/90 leading-relaxed mb-4">
              {selectedPlaceModal.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-900/60">
                <span className="text-[10px] font-mono text-cyan-500">ENTRY TICKET</span>
                <div className="font-bold text-cyan-300">{selectedPlaceModal.entryFee === 0 ? 'FREE' : `₹${selectedPlaceModal.entryFee}`}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-900/60">
                <span className="text-[10px] font-mono text-cyan-500">VISIT DURATION</span>
                <div className="font-bold text-cyan-300">{selectedPlaceModal.estimatedVisitingTime}</div>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlaceModal(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-cyan-950/60">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Budget</span>
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          <span>Continue to Food & Itinerary →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
