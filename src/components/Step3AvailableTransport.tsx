import React from 'react';
import { 
  Bus, 
  Train, 
  Plane, 
  Car, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight, 
  ArrowLeft, 
  Ticket, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { PassengerDetails, VehicleSchedule, TransportType } from '../types/travel';
import { VEHICLE_SCHEDULES } from '../data/vehicleSchedules';

interface Step3AvailableTransportProps {
  details: PassengerDetails;
  selectedTransportType: TransportType;
  selectedVehicleId: string;
  onSelectVehicle: (schedule: VehicleSchedule) => void;
  onBookTicketNow: (schedule: VehicleSchedule) => void;
  onSwitchMode?: (mode: TransportType) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3AvailableTransport: React.FC<Step3AvailableTransportProps> = ({
  details,
  selectedTransportType,
  selectedVehicleId,
  onSelectVehicle,
  onBookTicketNow,
  onSwitchMode,
  onNext,
  onBack
}) => {
  // Get vehicles for selected type (bus, train, flight, cab, bike_scooter, car_rental)
  const modeKey = selectedTransportType === 'ai_decide' ? 'bus' : selectedTransportType;
  const availableVehicles: VehicleSchedule[] = VEHICLE_SCHEDULES[modeKey] || VEHICLE_SCHEDULES.bus;

  const currentVehicle = availableVehicles.find(v => v.id === selectedVehicleId) || availableVehicles[0];

  const availableModes: { type: TransportType; label: string; icon: string }[] = [
    { type: 'bus', label: 'Buses (Kaveri / Superfast)', icon: '🚌' },
    { type: 'train', label: 'Trains (Vande Bharat / Express)', icon: '🚆' },
    { type: 'flight', label: 'Flights (IndiGo / Air India)', icon: '✈️' },
    { type: 'cab', label: 'Private Cabs', icon: '🚕' },
    { type: 'bike_scooter', label: 'Bike / Scooter', icon: '🛵' },
    { type: 'car_rental', label: 'Self-Drive Car', icon: '🚗' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Ticket className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 3 OF 8 · LIVE VEHICLE AVAILABILITY & BOOKING</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Available {selectedTransportType.toUpperCase()} Services
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Showing real operators including <strong className="text-white">Kaveri Travels</strong>, <strong className="text-white">Superfast Express</strong>, and <strong className="text-white">VRL Travels</strong> from {details.fromLocation} to {details.toDestination}.
        </p>
      </div>

      {/* Quick Mode Switcher Tabs */}
      {onSwitchMode && (
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-black border border-cyan-900/60 max-w-3xl mx-auto">
          {availableModes.map((m) => {
            const isActive = selectedTransportType === m.type || (selectedTransportType === 'ai_decide' && m.type === 'bus');
            return (
              <button
                key={m.type}
                type="button"
                onClick={() => onSwitchMode(m.type)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-black shadow-[0_0_12px_#06b6d4]'
                    : 'text-cyan-400 hover:text-white hover:bg-cyan-950/40'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Vehicle Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950 via-black to-cyan-950/60 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
            SELECTED VEHICLE SCHEDULE
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mt-0.5">
            <span>{currentVehicle.operatorName}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-400 text-black font-extrabold">
              ₹{(currentVehicle.farePerPerson * details.totalTravellers * (details.tripType === 'round_trip' ? 2 : 1)).toLocaleString()} Total
            </span>
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-300/80 mt-1">
            <span>Departs: {currentVehicle.departureTime}</span>
            <span>·</span>
            <span>Duration: {currentVehicle.duration}</span>
            <span>·</span>
            <span className="text-emerald-400 font-bold">{currentVehicle.availableSeats} Seats Left</span>
          </div>
        </div>

        <button
          onClick={() => onBookTicketNow(currentVehicle)}
          className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow flex items-center gap-2 shrink-0 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          <Ticket className="w-4 h-4 fill-black" />
          <span>Book Tickets Online 🎫</span>
        </button>
      </div>

      {/* List of Available Vehicles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Available Scheduled Departures ({availableVehicles.length} Found)
          </h4>
          <span className="text-xs text-cyan-500">Regulated Fares · Verified Operators</span>
        </div>

        {availableVehicles.map((vehicle) => {
          const isSelected = selectedVehicleId === vehicle.id;
          const totalPartyFare = vehicle.farePerPerson * details.totalTravellers * (details.tripType === 'round_trip' ? 2 : 1);

          return (
            <div
              key={vehicle.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400 scale-[1.01]'
                  : 'bg-black/90 border-cyan-900/60 hover:border-cyan-600'
              }`}
            >
              {/* Left Column: Operator & Timing */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-black border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold">
                    {vehicle.vehicleType === 'bus' ? <Bus className="w-5 h-5" /> : vehicle.vehicleType === 'train' ? <Train className="w-5 h-5" /> : <Plane className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{vehicle.operatorName}</span>
                      <span className="px-2 py-0.5 rounded bg-black border border-cyan-400 text-cyan-200 text-xs font-mono font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                        {vehicle.rating}
                      </span>
                    </h3>
                    <div className="text-xs text-cyan-500 font-mono">
                      Vehicle #{vehicle.vehicleNumber} · {vehicle.boardingPoint}
                    </div>
                  </div>
                </div>

                {/* Timing schedule row */}
                <div className="flex flex-wrap items-center gap-3 text-xs bg-cyan-950/20 p-2.5 rounded-xl border border-cyan-900/40">
                  <div className="flex items-center gap-1 text-white font-mono font-bold">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{vehicle.departureTime}</span>
                  </div>
                  <span className="text-cyan-600">→</span>
                  <div className="text-cyan-300 font-mono font-bold">
                    {vehicle.arrivalTime} ({vehicle.duration})
                  </div>
                  <span className="text-cyan-600">·</span>
                  <div className="text-emerald-400 font-mono font-bold">
                    {vehicle.availableSeats} Seats Available ({vehicle.liveStatus})
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {vehicle.amenities.map((am, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-900/60 text-cyan-300 text-[10px]"
                    >
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Pricing & Booking actions */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center justify-between gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-cyan-950 shrink-0">
                <div className="text-left md:text-right">
                  <div className="text-xl font-mono font-extrabold text-cyan-300">
                    ₹{totalPartyFare.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-cyan-500 font-mono">
                    ₹{vehicle.farePerPerson.toLocaleString()} / seat · {details.totalTravellers} Person(s)
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(vehicle)}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-400 text-black shadow-[0_0_10px_#06b6d4]'
                        : 'bg-black border border-cyan-700 text-cyan-300 hover:border-cyan-400'
                    }`}
                  >
                    {isSelected ? '✓ Selected Vehicle' : 'Select'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookTicketNow(vehicle)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500 text-cyan-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Book Tickets 🎫
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* "FRO" RETURN JOURNEY SCHEDULE & TICKET SECTION - KEPT AT LAST AS REQUESTED */}
      {details.tripType === 'round_trip' && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-black to-cyan-950/40 border-2 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)] space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-400 text-black flex items-center justify-center font-bold text-base shadow-[0_0_10px_#10b981]">
                ↩️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400 text-black uppercase font-extrabold tracking-widest">
                    "FRO" RETURN JOURNEY (KEPT AT LAST)
                  </span>
                  <span className="text-xs font-mono text-emerald-300">
                    Return Date: {details.returnDate || '2026-10-19'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white capitalize mt-0.5">
                  {details.toDestination} ➔ {details.fromLocation}
                </h4>
                <div className="text-xs text-cyan-300/80">
                  Return operator scheduled automatically · Both "TO" and "FRO" tickets issued together
                </div>
              </div>
            </div>

            <button
              onClick={() => onBookTicketNow(currentVehicle)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Ticket className="w-3.5 h-3.5 fill-black" />
              <span>Book Both To & Fro Tickets 🎫</span>
            </button>
          </div>
          <p className="text-xs text-cyan-200/80 pt-1 border-t border-cyan-950">
            ✓ Your round-trip booking reserves your outbound ("to") seat and your return ("fro") seat with individual PNR confirmation and boarding passes.
          </p>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-cyan-950/60">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Transport Modes</span>
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          <span>Choose Hotel / Stay →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
