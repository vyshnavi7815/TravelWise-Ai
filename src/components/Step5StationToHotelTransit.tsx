import React, { useState } from 'react';
import { 
  Car, 
  Train, 
  Bus, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Smartphone, 
  Navigation, 
  Check, 
  Ticket,
  AlertCircle
} from 'lucide-react';
import { LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step5StationToHotelTransitProps {
  hotelName: string;
  hotelAddress: string;
  destinationName: string;
  arrivalStation: string;
  transportMode: string;
  travellers: number;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step5StationToHotelTransit: React.FC<Step5StationToHotelTransitProps> = ({
  hotelName,
  hotelAddress,
  destinationName,
  arrivalStation,
  transportMode,
  travellers,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);

  // Selected transit option
  const [selectedTransit, setSelectedTransit] = useState<'cab' | 'metro' | 'bus' | 'auto'>('cab');
  const [isPrebooked, setIsPrebooked] = useState(false);
  const [cabBookingReference, setCabBookingReference] = useState<string | null>(null);
  const [showPrebookModal, setShowPrebookModal] = useState(false);
  const [driverName, setDriverName] = useState('Ramesh Patil (Toyota Etios - MH 09 CC 3411)');
  const [pickupTime, setPickupTime] = useState('Synchronized with Arrival');

  // Realistic station names based on transport mode
  const resolvedStation = arrivalStation || (
    transportMode === 'flight' 
      ? `${destinationName} International Airport (Terminal 1 / 2)` 
      : transportMode === 'bus' 
      ? `${destinationName} Central Bus Terminus` 
      : `${destinationName} Central Railway Junction`
  );

  const handleConfirmPrebookCab = () => {
    const refCode = `CAB-STN-${Math.floor(100000 + Math.random() * 900000)}`;
    setCabBookingReference(refCode);
    setIsPrebooked(true);
    setShowPrebookModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 5 OF 8 · STATION-TO-HOTEL TRANSIT & PRE-BOOKING CABS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Reach Your Hotel from the Station
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Seamless connection from your arrival terminus to <strong className="text-white">{hotelName}</strong>. Pre-book vetted cabs, check direct metro lines, or hop on station shuttles.
        </p>
      </div>

      {/* Origin -> Destination Route Visualizer Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950 via-black to-cyan-950/80 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Origin */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-black border border-cyan-400 text-cyan-300 flex items-center justify-center shrink-0">
              {transportMode === 'flight' ? <Navigation className="w-5 h-5 text-cyan-400" /> : <Train className="w-5 h-5 text-cyan-400" />}
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
                YOUR ARRIVAL TERMINAL
              </span>
              <div className="text-sm sm:text-base font-bold text-white">
                {resolvedStation}
              </div>
              <span className="text-xs text-cyan-400/70">Scheduled Arrival Point</span>
            </div>
          </div>

          {/* Transfer Arrow & Stats */}
          <div className="flex flex-col items-center justify-center px-4 py-2 rounded-xl bg-black/60 border border-cyan-900/60 text-center shrink-0">
            <div className="text-[11px] font-mono text-cyan-300 font-bold flex items-center gap-1.5">
              <span>~12.8 km</span>
              <span className="text-cyan-500">·</span>
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>25-35 mins</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
              ✓ Direct Route Available
            </div>
          </div>

          {/* Destination Hotel */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            <div className="text-left md:text-right">
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
                YOUR BOOKED HOTEL
              </span>
              <div className="text-sm sm:text-base font-bold text-white">
                {hotelName}
              </div>
              <span className="text-xs text-cyan-400/70">{hotelAddress || 'Downtown / Beachside Area'}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-400 text-black flex items-center justify-center shrink-0 shadow-[0_0_10px_#06b6d4]">
              <MapPin className="w-5 h-5 font-bold" />
            </div>
          </div>
        </div>
      </div>

      {/* Pre-booked Cab Confirmation Banner (if pre-booked) */}
      {isPrebooked && cabBookingReference && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/70 border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-400 text-black flex items-center justify-center font-bold shrink-0">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-400 text-black">
                  PRE-BOOKED & CONFIRMED
                </span>
                <span className="text-xs font-mono text-emerald-300">
                  Ref: {cabBookingReference}
                </span>
              </div>
              <div className="text-sm font-bold text-white mt-1">
                Dedicated Chauffeur Cab: {driverName}
              </div>
              <div className="text-xs text-emerald-200/80">
                Driver will hold name placard outside Exit Gate #2. 45-minute complimentary delay wait time included.
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs font-mono text-emerald-400">FARED LOCKED</div>
            <div className="text-lg font-mono font-extrabold text-white">₹450 Total</div>
          </div>
        </div>
      )}

      {/* Transit Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* OPTION 1: PRE-BOOKING CAB */}
        <div
          onClick={() => setSelectedTransit('cab')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedTransit === 'cab'
              ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
              : 'bg-black/90 border-cyan-900/60 hover:border-cyan-600'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-black border border-cyan-400 text-cyan-300 flex items-center justify-center">
                  <Car className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Pre-Booked Private Cab</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-400 text-black text-[10px] font-mono font-extrabold">
                      RECOMMENDED
                    </span>
                  </h3>
                  <div className="text-xs text-cyan-400/80 font-mono">
                    Ola / Uber Verified / Airport Prepaid Network
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-extrabold text-cyan-300">₹450</div>
                <div className="text-[10px] text-cyan-500 font-mono">Guaranteed No-Surge</div>
              </div>
            </div>

            <p className="text-xs text-cyan-200/80 leading-relaxed">
              Skip the chaotic station queues. Driver meets you at the exit gate with your name placard. Luggage assistance, air conditioning, and GPS live tracking included.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ Doorstep Hotel Drop
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ Flight/Train Delay Buffer
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ Fits {travellers} Travellers + Bags
              </span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-cyan-950 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400">
              ETA: 25 mins direct
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPrebookModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.4)]"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>{isPrebooked ? 'Update Pre-Booked Cab' : 'Pre-Book Cab Online 🚖'}</span>
            </button>
          </div>
        </div>

        {/* OPTION 2: DIRECT METRO LINE */}
        <div
          onClick={() => setSelectedTransit('metro')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedTransit === 'metro'
              ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
              : 'bg-black/90 border-cyan-900/60 hover:border-cyan-600'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-black border border-cyan-400 text-cyan-300 flex items-center justify-center">
                  <Train className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Direct Metro Line</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 text-[10px] font-mono">
                      FASTEST IN TRAFFIC
                    </span>
                  </h3>
                  <div className="text-xs text-cyan-400/80 font-mono">
                    Station Metro Hub ➔ Line 1 (Blue Line)
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-extrabold text-cyan-300">
                  ₹{(40 * travellers).toLocaleString()}
                </div>
                <div className="text-[10px] text-cyan-500 font-mono">₹40 / person</div>
              </div>
            </div>

            <p className="text-xs text-cyan-200/80 leading-relaxed">
              Board the air-conditioned Metro directly from Platform 1 exit. Alight at Central Coastal Station, just 300 meters (4 min walk) from {hotelName}.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ Every 4 mins departure
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ Zero traffic congestion
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ QR Token Smart Entry
              </span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-cyan-950 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400">
              Travel Time: 18 mins
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTransit('metro');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTransit === 'metro'
                  ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
                  : 'bg-black border border-cyan-700 text-cyan-300 hover:border-cyan-400'
              }`}
            >
              {selectedTransit === 'metro' ? '✓ Selected Metro' : 'Select Metro Route'}
            </button>
          </div>
        </div>

        {/* OPTION 3: CITY FEEDER SHUTTLE BUS */}
        <div
          onClick={() => setSelectedTransit('bus')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedTransit === 'bus'
              ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
              : 'bg-black/90 border-cyan-900/60 hover:border-cyan-600'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-black border border-cyan-400 text-cyan-300 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Station Feeder Shuttle Bus</span>
                    <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-500 text-sky-300 text-[10px] font-mono">
                      BUDGET PICK
                    </span>
                  </h3>
                  <div className="text-xs text-cyan-400/80 font-mono">
                    Bus Bay #3 ➔ Express Route #108
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-extrabold text-cyan-300">
                  ₹{(25 * travellers).toLocaleString()}
                </div>
                <div className="text-[10px] text-cyan-500 font-mono">₹25 / person</div>
              </div>
            </div>

            <p className="text-xs text-cyan-200/80 leading-relaxed">
              Frequent electric low-floor municipal feeder bus departs every 15 minutes right from the terminus bus bay. Drops directly at the Hotel Promenade stop.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ Ultra economical
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ Large luggage rack
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ AC Electric Fleet
              </span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-cyan-950 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400">
              Travel Time: 32 mins
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTransit('bus');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTransit === 'bus'
                  ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
                  : 'bg-black border border-cyan-700 text-cyan-300 hover:border-cyan-400'
              }`}
            >
              {selectedTransit === 'bus' ? '✓ Selected Bus' : 'Select Shuttle Bus'}
            </button>
          </div>
        </div>

        {/* OPTION 4: PREPAID AUTO RICKSHAW BOOTH */}
        <div
          onClick={() => setSelectedTransit('auto')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedTransit === 'auto'
              ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400'
              : 'bg-black/90 border-cyan-900/60 hover:border-cyan-600'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-black border border-cyan-400 text-cyan-300 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Prepaid Auto Rickshaw</span>
                    <span className="px-2 py-0.5 rounded bg-yellow-950 border border-yellow-500 text-yellow-300 text-[10px] font-mono">
                      QUICK HOP
                    </span>
                  </h3>
                  <div className="text-xs text-cyan-400/80 font-mono">
                    Traffic Police Prepaid Counter (Exit 2)
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-extrabold text-cyan-300">₹180</div>
                <div className="text-[10px] text-cyan-500 font-mono">Fixed Government Fare</div>
              </div>
            </div>

            <p className="text-xs text-cyan-200/80 leading-relaxed">
              Official police-regulated counter. Collect your receipt slip from the booth and pay zero bargaining or overcharges. Ideal for up to 3 travellers with light bags.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ Official regulated receipt
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ 24x7 Counter availability
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900 text-cyan-300 text-[10px]">
                ✓ Instant departure
              </span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-cyan-950 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400">
              Travel Time: 26 mins
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTransit('auto');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTransit === 'auto'
                  ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
                  : 'bg-black border border-cyan-700 text-cyan-300 hover:border-cyan-400'
              }`}
            >
              {selectedTransit === 'auto' ? '✓ Selected Auto' : 'Select Auto Rickshaw'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-cyan-950/60">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hotel Booking</span>
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          <span>Explore Best Places to Visit →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* PRE-BOOK CAB MODAL */}
      {showPrebookModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-black border-2 border-cyan-400 rounded-3xl p-6 shadow-[0_0_30px_rgba(6,182,212,0.5)] space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-cyan-900 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-400 text-black flex items-center justify-center font-bold">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Pre-Book Station Cab</h3>
                  <p className="text-[11px] text-cyan-400">Guaranteed Door-to-Door Hotel Drop</p>
                </div>
              </div>
              <button
                onClick={() => setShowPrebookModal(false)}
                className="text-cyan-500 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-cyan-400 font-mono block mb-1">PICKUP LOCATION</label>
                <input
                  type="text"
                  readOnly
                  value={resolvedStation}
                  className="w-full bg-cyan-950/40 border border-cyan-900 text-cyan-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-cyan-400 font-mono block mb-1">DROP-OFF HOTEL</label>
                <input
                  type="text"
                  readOnly
                  value={hotelName}
                  className="w-full bg-cyan-950/40 border border-cyan-900 text-cyan-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-cyan-400 font-mono block mb-1">VEHICLE CLASS</label>
                  <select
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full bg-black border border-cyan-700 text-white rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="Ramesh Patil (Toyota Etios Sedan - MH 09 CC 3411)">AC Sedan (Dzire / Etios) - ₹450</option>
                    <option value="Sanjay Shinde (Innova Crysta SUV - MH 09 VIP 7007)">Premium SUV (Innova) - ₹750</option>
                    <option value="Vikas More (WagonR Mini - MH 09 BK 2210)">Economy Mini (WagonR) - ₹350</option>
                  </select>
                </div>

                <div>
                  <label className="text-cyan-400 font-mono block mb-1">ARRIVAL SYNC</label>
                  <input
                    type="text"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    placeholder="Train/Flight Arrival Time"
                    className="w-full bg-black border border-cyan-700 text-white rounded-xl px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-900 flex items-start gap-2 text-[11px] text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Zero cancellation fee up to 1 hour before pickup. Driver will track flight / train delays automatically.</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-cyan-950">
              <div>
                <span className="text-[10px] text-cyan-500 font-mono">LOCKED FARE</span>
                <div className="text-lg font-mono font-extrabold text-cyan-300">₹450</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPrebookModal(false)}
                  className="px-3 py-2 rounded-xl text-xs text-cyan-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPrebookCab}
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 cyan-glow cursor-pointer"
                >
                  Confirm Pre-Booking 🚖
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
