import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  Ticket, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Download, 
  QrCode, 
  Clock, 
  Calendar, 
  User, 
  ShieldCheck, 
  Sparkles,
  Train,
  Plane,
  Bus,
  Car,
  Armchair,
  ArrowRight,
  RotateCcw,
  Luggage,
  Utensils
} from 'lucide-react';
import { BookedTicket, PassengerDetails } from '../types/travel';

interface TicketBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: PassengerDetails;
  transportItem?: {
    id: string;
    name: string;
    type: string;
    costPerPerson: number;
    totalCost: number;
  };
  onBookingSuccess: (ticket: BookedTicket) => void;
}

export const TicketBookingModal: React.FC<TicketBookingModalProps> = ({
  isOpen,
  onClose,
  details,
  transportItem,
  onBookingSuccess
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');

  // Mode detection
  const rawType = (transportItem?.type || '').toLowerCase();
  const itemName = (transportItem?.name || '').toLowerCase();
  const isFlight = rawType.includes('flight') || rawType.includes('air') || itemName.includes('flight') || itemName.includes('indigo') || itemName.includes('air india') || itemName.includes('akasa');
  const isTrain = rawType.includes('train') || itemName.includes('train') || itemName.includes('vande') || itemName.includes('shatabdi') || itemName.includes('rajdhani') || itemName.includes('express');
  const isBus = rawType.includes('bus') || itemName.includes('kaveri') || itemName.includes('superfast') || itemName.includes('vrl') || itemName.includes('travels') || itemName.includes('ksrtc');
  const isHotel = rawType.includes('hotel') || itemName.includes('resort') || itemName.includes('hotel') || itemName.includes('suite') || itemName.includes('villa');
  const isCab = rawType.includes('cab') || rawType.includes('bike') || rawType.includes('car');

  // Default mode-specific options
  const defaultClassTier = isFlight 
    ? 'Economy (Standard Class)' 
    : isTrain 
    ? 'AC 3-Tier (3AC Economy Sleeper)' 
    : isBus 
    ? 'AC Multi-Axle Sleeper (2+1 Luxury Pods)' 
    : isHotel 
    ? 'Deluxe AC Room with Balcony' 
    : 'AC Sedan (Toyota Etios / Dzire)';

  const defaultSeatPreference = isFlight 
    ? 'Window Seat (14A - Panoramic Views)' 
    : isTrain 
    ? 'Lower Berth (LB - Easy Access)' 
    : isBus 
    ? 'Lower Deck Single Sleeper (Window L3)' 
    : isHotel 
    ? 'King Size Double Bed' 
    : 'Front Co-Passenger Seat';

  // Onward ("TO") Journey States
  const [toSlot, setToSlot] = useState(isFlight ? '09:40 AM · Direct Non-Stop Flight' : '07:30 AM · Morning Superfast');
  const [toClassTier, setToClassTier] = useState(defaultClassTier);
  const [toSeatPref, setToSeatPref] = useState(defaultSeatPreference);
  const [toFlightMeal, setToFlightMeal] = useState('Complimentary Veg Hot Meal');

  // Return ("FRO") Journey States (for round trips)
  const isRoundTrip = details.tripType === 'round_trip';
  const [froSlot, setFroSlot] = useState(isFlight ? '05:30 PM · Return Direct Flight' : '08:45 PM · Return Evening Service');
  const [froClassTier, setFroClassTier] = useState(defaultClassTier);
  const [froSeatPref, setFroSeatPref] = useState(
    isFlight 
      ? 'Window Seat (18F - Cloud View)' 
      : isTrain 
      ? 'Lower Berth (LB - Comfort)' 
      : isBus 
      ? 'Lower Deck Single Sleeper (Window L5)' 
      : defaultSeatPreference
  );
  const [froFlightMeal, setFroFlightMeal] = useState('Complimentary Veg Hot Meal');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('traveller@oksbi');

  // Confirmed tickets states
  const [toTicket, setToTicket] = useState<BookedTicket | null>(null);
  const [froTicket, setFroTicket] = useState<BookedTicket | null>(null);

  if (!isOpen) return null;

  const totalFare = transportItem?.totalCost || 2400;
  const convenienceFee = Math.round(totalFare * 0.02);
  const grandTotal = totalFare + convenienceFee;

  const handleConfirmPayment = () => {
    const toPnr = `TW-TO-${Math.floor(100000 + Math.random() * 900000)}`;
    const froPnr = `TW-FRO-${Math.floor(100000 + Math.random() * 900000)}`;
    const commonRef = `BK-${Math.floor(10000 + Math.random() * 90000)}`;

    // Generate "TO" (Onward) Ticket
    const onwardTicket: BookedTicket = {
      id: `${Date.now()}-to`,
      bookingRef: commonRef,
      pnrNumber: toPnr,
      type: 'transport',
      title: `${transportItem?.name || (isFlight ? 'IndiGo Airlines' : isBus ? 'Kaveri Travels' : 'Superfast Express')} (TO Leg)`,
      subtitle: `${toClassTier} · ${toSlot}`,
      passengerNames: [
        details.passengerName || 'Rahul Sharma',
        ...(details.totalTravellers > 1 ? [`Companion (${details.totalTravellers - 1} Person(s))`] : [])
      ],
      travelDate: details.travelDate || '2026-10-15',
      seatsOrRooms: `${toSeatPref} ${isFlight ? '(Seat 14A)' : isTrain ? '(Coach B3, Berth 21)' : '(Berth L3)'}`,
      totalPaid: isRoundTrip ? Math.round(grandTotal / 2) : grandTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      status: 'CONFIRMED',
      issuedAt: new Date().toLocaleString(),
      departureTime: toSlot.split('·')[0].trim(),
      arrivalTime: isFlight ? '11:00 AM' : '04:45 PM',
      origin: details.fromLocation,
      destination: details.toDestination,
      gateOrPlatform: isFlight ? 'Terminal 2 / Gate 14B' : isTrain ? 'Platform 4' : 'Bus Bay #3',
      qrCodeData: `TRAVELWISE-PNR:${toPnr}-TO:${details.fromLocation}➔${details.toDestination}-PAID:₹${grandTotal}`
    };

    setToTicket(onwardTicket);
    onBookingSuccess(onwardTicket);

    // If Round Trip, generate "FRO" (Return) Ticket - Kept at last
    let returnTicket: BookedTicket | null = null;
    if (isRoundTrip) {
      returnTicket = {
        id: `${Date.now()}-fro`,
        bookingRef: commonRef,
        pnrNumber: froPnr,
        type: 'transport',
        title: `${transportItem?.name || (isFlight ? 'IndiGo Airlines Return' : isBus ? 'Kaveri Travels Return' : 'Superfast Express Return')} (FRO Return Leg)`,
        subtitle: `${froClassTier} · ${froSlot}`,
        passengerNames: [
          details.passengerName || 'Rahul Sharma',
          ...(details.totalTravellers > 1 ? [`Companion (${details.totalTravellers - 1} Person(s))`] : [])
        ],
        travelDate: details.returnDate || '2026-10-19',
        seatsOrRooms: `${froSeatPref} ${isFlight ? '(Seat 18F)' : isTrain ? '(Coach B2, Berth 24)' : '(Berth L5)'}`,
        totalPaid: Math.round(grandTotal / 2),
        paymentMethod: paymentMethod.toUpperCase(),
        status: 'CONFIRMED',
        issuedAt: new Date().toLocaleString(),
        departureTime: froSlot.split('·')[0].trim(),
        arrivalTime: isFlight ? '07:15 PM' : '06:30 AM (Next Day)',
        origin: details.toDestination,
        destination: details.fromLocation,
        gateOrPlatform: isFlight ? 'Terminal 1 / Gate 4A' : isTrain ? 'Platform 1' : 'Return Bay #2',
        qrCodeData: `TRAVELWISE-PNR:${froPnr}-FRO:${details.toDestination}➔${details.fromLocation}-PAID:₹${grandTotal}`
      };

      setFroTicket(returnTicket);
      onBookingSuccess(returnTicket);
    }

    setStep('confirmed');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#22d3ee', '#ffffff', '#10b981']
      });
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-black border-2 border-cyan-400 p-6 shadow-2xl cyan-glow overflow-y-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-400 text-black flex items-center justify-center font-bold">
              {isFlight ? <Plane className="w-4 h-4" /> : isTrain ? <Train className="w-4 h-4" /> : isBus ? <Bus className="w-4 h-4" /> : <Car className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {step === 'confirmed' ? 'Official Tickets Confirmed! 🎫' : `Book ${isFlight ? 'Flight Seats' : isTrain ? 'Train Berths' : isBus ? 'Bus Sleeper / Seats' : 'Tickets'}`}
              </h3>
              <p className="text-[11px] text-cyan-400 font-mono">
                {isRoundTrip ? 'Round Trip Ticket Pass (Onward "TO" + Return "FRO")' : 'One-Way Ticket Pass'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-cyan-950 border border-cyan-600 text-cyan-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: DETAILS & SEAT PLANS */}
        {step === 'details' && (
          <div className="space-y-5">
            {/* Mode & Fare Summary */}
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  SELECTED OPERATOR & MODE
                </span>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>{transportItem?.name || (isFlight ? 'IndiGo Airlines 6E' : isBus ? 'Kaveri Travels Volvo' : 'Superfast Express')}</span>
                  <span className="px-2 py-0.5 rounded bg-black border border-cyan-400 text-cyan-300 text-[10px] font-mono uppercase">
                    {isFlight ? '✈️ Flight' : isTrain ? '🚆 Train' : isBus ? '🚌 Bus' : '🚗 Cab'}
                  </span>
                </div>
                <div className="text-xs text-cyan-300 mt-0.5">
                  Route: <strong className="text-white capitalize">{details.fromLocation}</strong> ↔ <strong className="text-white capitalize">{details.toDestination}</strong>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono text-cyan-400 uppercase">
                  {isRoundTrip ? 'ROUND TRIP TOTAL' : 'TOTAL FARE'}
                </span>
                <div className="text-xl font-mono font-extrabold text-cyan-300">
                  ₹{totalFare.toLocaleString()}
                </div>
                <div className="text-[10px] text-cyan-500 font-mono">
                  {details.totalTravellers} Traveller(s) · {isRoundTrip ? 'To & Fro Included' : 'One Way'}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 1: "TO" JOURNEY (ONWARD / OUTBOUND) SEAT PLAN */}
            {/* ======================================================== */}
            <div className="p-4 rounded-2xl bg-black border border-cyan-800/80 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-cyan-900/60">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-400 text-black text-[10px] font-mono font-extrabold">
                    "TO" JOURNEY
                  </span>
                  <span className="text-xs font-bold text-white">
                    {details.fromLocation} ➔ {details.toDestination}
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  Date: {details.travelDate || '2026-10-15'}
                </span>
              </div>

              {/* Outbound Departure Schedule Slot */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Outbound Departure Schedule:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isFlight
                    ? ['09:40 AM · Morning Non-Stop (Fastest)', '03:15 PM · Afternoon Direct Flight']
                    : isTrain
                    ? ['05:25 AM · Vande Bharat Express', '11:05 PM · Overnight Sleeper Express']
                    : ['08:30 PM · Kaveri AC Sleeper', '09:15 PM · Superfast Express']
                  ).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setToSlot(slot)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        toSlot === slot
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : 'bg-black border-cyan-900/60 text-cyan-400/80 hover:border-cyan-700'
                      }`}
                    >
                      <div className="font-semibold truncate">{slot}</div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Seats Available</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* FLIGHT SPECIFIC SEAT PLANS */}
              {isFlight && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-cyan-400 mb-1">
                        Cabin Class:
                      </label>
                      <select
                        value={toClassTier}
                        onChange={(e) => setToClassTier(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Economy (Standard Class)">Economy (Standard Class)</option>
                        <option value="Premium Economy (Extra Legroom)">Premium Economy (Extra Legroom)</option>
                        <option value="Business Class (Priority Boarding)">Business Class (Priority Boarding)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyan-400 mb-1">
                        Aircraft Seat Preference:
                      </label>
                      <select
                        value={toSeatPref}
                        onChange={(e) => setToSeatPref(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Window Seat (14A - Panoramic Views)">Window Seat (14A - Panoramic Cloud View)</option>
                        <option value="Aisle Seat (14C - Easy Corridor Access)">Aisle Seat (14C - Quick Exit)</option>
                        <option value="Front Row Extra Legroom (12A / 12F)">Front Row Extra Legroom (Row 12 Exit)</option>
                        <option value="Middle Seat (14B)">Middle Seat (14B)</option>
                      </select>
                    </div>
                  </div>

                  {/* Flight Cabin Seat Layout Map */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/60">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                      AIRBUS A321 CABIN SEAT MAP PREVIEW
                    </span>
                    <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                      <span className="p-1 rounded bg-cyan-400 text-black font-bold">14A [Win]</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">14B</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">14C [Aisle]</span>
                      <span className="p-1 text-cyan-600">| AISLE |</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">14D [Aisle]</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">14E</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">14F [Win]</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-cyan-300/80 pt-2 mt-2 border-t border-cyan-950">
                      <span className="flex items-center gap-1">
                        <Luggage className="w-3.5 h-3.5 text-cyan-400" />
                        <span>15 kg Check-in + 7 kg Cabin Included</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Hot In-Flight Meal Box Included</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TRAIN SPECIFIC SEAT PLANS */}
              {isTrain && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-cyan-400 mb-1">
                        Train Coach Class:
                      </label>
                      <select
                        value={toClassTier}
                        onChange={(e) => setToClassTier(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option value="AC 3-Tier (3AC Economy Sleeper)">AC 3-Tier (3AC Economy Sleeper)</option>
                        <option value="AC 2-Tier (2AC Comfort Sleeper)">AC 2-Tier (2AC Comfort Sleeper)</option>
                        <option value="AC Chair Car (CC Executive)">AC Chair Car (CC Executive)</option>
                        <option value="AC First Class (1AC Coupe)">AC First Class (1AC Coupe)</option>
                        <option value="Sleeper Class (SL Non-AC)">Sleeper Class (SL Non-AC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyan-400 mb-1">
                        Berth / Seat Preference:
                      </label>
                      <select
                        value={toSeatPref}
                        onChange={(e) => setToSeatPref(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Lower Berth (LB - Easy Access)">Lower Berth (LB - Easy Access for Elders)</option>
                        <option value="Side Lower (SL - Window View)">Side Lower (SL - Window View & Table)</option>
                        <option value="Middle Berth (MB - Quiet)">Middle Berth (MB - Quiet Overnight)</option>
                        <option value="Upper Berth (UB - Maximum Privacy)">Upper Berth (UB - Maximum Privacy)</option>
                        <option value="Side Upper (SU)">Side Upper (SU)</option>
                      </select>
                    </div>
                  </div>

                  {/* Coach Berth Grid */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/60 font-mono text-[10px]">
                    <span className="text-cyan-400 uppercase tracking-widest block mb-1.5">
                      COACH B3 BERTH ALLOCATION
                    </span>
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      <span className="p-1 rounded bg-cyan-400 text-black font-bold">LB 21 [Selected]</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">MB 22</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">UB 23</span>
                      <span className="p-1 text-cyan-600">| AISLE |</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">SL 27 [Win]</span>
                    </div>
                  </div>
                </div>
              )}

              {/* BUS SPECIFIC SEAT PLANS */}
              {isBus && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-cyan-400 mb-1">
                        Bus Sleeper Class:
                      </label>
                      <select
                        value={toClassTier}
                        onChange={(e) => setToClassTier(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option value="AC Multi-Axle Sleeper (2+1 Luxury Pods)">AC Multi-Axle Sleeper (2+1 Luxury Pods)</option>
                        <option value="Semi-Sleeper AC Recliner">Semi-Sleeper AC Recliner</option>
                        <option value="Volvo Luxury Club Class">Volvo Luxury Club Class</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyan-400 mb-1">
                        Berth / Deck Preference:
                      </label>
                      <select
                        value={toSeatPref}
                        onChange={(e) => setToSeatPref(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Lower Deck Single Sleeper (Window L3)">Lower Deck Single Sleeper (Window L3)</option>
                        <option value="Lower Deck Double Sleeper (Berth L7-L8)">Lower Deck Double Sleeper (Berth L7-L8)</option>
                        <option value="Upper Deck Single Window Sleeper (Berth U3)">Upper Deck Single Window Sleeper (Berth U3)</option>
                        <option value="Front Row Recliner (Seat 4)">Front Row Recliner (Seat 4)</option>
                      </select>
                    </div>
                  </div>

                  {/* Bus Deck Layout */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/60 font-mono text-[10px]">
                    <span className="text-cyan-400 uppercase tracking-widest block mb-1.5">
                      KAVERI / SUPERFAST BUS POD LAYOUT
                    </span>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <span className="p-1 rounded bg-cyan-400 text-black font-bold">L3 [Single Win]</span>
                      <span className="p-1 text-cyan-600">| AISLE |</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">L4 [Double]</span>
                      <span className="p-1 rounded bg-cyan-950/60 text-cyan-400">L5 [Double]</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CAB / CAR RENTAL SPECIFIC SEAT PLANS */}
              {isCab && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-mono text-cyan-400 mb-1">
                      Vehicle Type:
                    </label>
                    <select
                      value={toClassTier}
                      onChange={(e) => setToClassTier(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-700 text-white text-xs"
                    >
                      <option value="AC Sedan (Toyota Etios / Dzire)">AC Sedan (Toyota Etios / Dzire)</option>
                      <option value="Premium SUV (Innova Crysta)">Premium SUV (Innova Crysta)</option>
                      <option value="Self-Drive Rental">Self-Drive Rental</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-cyan-400 mb-1">
                      Seat Preference:
                    </label>
                    <select
                      value={toSeatPref}
                      onChange={(e) => setToSeatPref(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-700 text-white text-xs"
                    >
                      <option value="Front Co-Passenger Seat">Front Co-Passenger Seat</option>
                      <option value="Rear Executive Window Seat">Rear Executive Window Seat</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* SECTION 2: "FRO" JOURNEY (RETURN / INBOUND) - KEPT AT LAST */}
            {/* ======================================================== */}
            {isRoundTrip && (
              <div className="p-4 rounded-2xl bg-cyan-950/20 border-2 border-cyan-500/60 space-y-3.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <div className="flex items-center justify-between pb-2 border-b border-cyan-900/60">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-400 text-black text-[10px] font-mono font-extrabold flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" />
                      "FRO" RETURN JOURNEY (KEPT AT LAST)
                    </span>
                    <span className="text-xs font-bold text-white capitalize">
                      {details.toDestination} ➔ {details.fromLocation}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    Return Date: {details.returnDate || '2026-10-19'}
                  </span>
                </div>

                {/* Return Schedule Selection */}
                <div>
                  <label className="block text-xs font-mono text-cyan-400 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Return ("FRO") Departure Schedule:</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(isFlight
                      ? ['05:30 PM · Return Direct Evening Flight', '08:45 PM · Night Non-Stop Flight']
                      : isTrain
                      ? ['02:15 PM · Afternoon Return Express', '10:30 PM · Overnight Return Sleeper']
                      : ['07:45 PM · Kaveri Return Luxury Sleeper', '09:00 PM · Superfast Return Service']
                    ).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFroSlot(slot)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          froSlot === slot
                            ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                            : 'bg-black border-cyan-900/60 text-cyan-400/80 hover:border-cyan-700'
                        }`}
                      >
                        <div className="font-semibold truncate">{slot}</div>
                        <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Return Seats Confirmed</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Return Seat Selection (Mode-specific) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-cyan-400 mb-1">
                      Return Class / Coach Tier:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={toClassTier}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-cyan-900 text-cyan-200 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyan-400 mb-1">
                      Return ("FRO") Seat Allocation:
                    </label>
                    <select
                      value={froSeatPref}
                      onChange={(e) => setFroSeatPref(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      {isFlight ? (
                        <>
                          <option value="Window Seat (18F - Cloud View)">Window Seat (18F - Cloud View)</option>
                          <option value="Aisle Seat (18D - Corridor)">Aisle Seat (18D - Fast De-boarding)</option>
                          <option value="Front Row (12F Extra Legroom)">Front Row (12F Extra Legroom)</option>
                        </>
                      ) : isTrain ? (
                        <>
                          <option value="Lower Berth (LB - Comfort)">Lower Berth (LB - Comfort)</option>
                          <option value="Side Lower (SL - Window View)">Side Lower (SL - Window View)</option>
                          <option value="Upper Berth (UB - Quiet Sleep)">Upper Berth (UB - Quiet Sleep)</option>
                        </>
                      ) : (
                        <>
                          <option value="Lower Deck Single Sleeper (Window L5)">Lower Deck Single Sleeper (Window L5)</option>
                          <option value="Upper Deck Single Sleeper (Window U5)">Upper Deck Single Sleeper (Window U5)</option>
                          <option value="Front Reclining Seat (Seat 2)">Front Reclining Seat (Seat 2)</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Passenger Manifest */}
            <div className="p-3.5 rounded-xl bg-black border border-cyan-900/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-[10px] font-mono text-cyan-500 uppercase block">PRIMARY PASSENGER</span>
                  <span className="font-bold text-white">{details.passengerName || 'Rahul Sharma'}</span>
                  {details.totalTravellers > 1 && (
                    <span className="text-cyan-400/80 ml-1.5">
                      (+{details.totalTravellers - 1} Traveller(s) allocated adjacent seats)
                    </span>
                  )}
                </div>
              </div>
              <span className="text-emerald-400 font-mono text-xs font-bold">ID Verified</span>
            </div>

            {/* Submit Action */}
            <button
              onClick={() => setStep('payment')}
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm transition-all cyan-glow cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.45)] flex items-center justify-center gap-2"
            >
              <span>Proceed to Payment for {isRoundTrip ? 'Both To & Fro Tickets' : 'Ticket'} (₹{grandTotal.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT */}
        {step === 'payment' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-cyan-400 font-bold block mb-0.5">
                  {isRoundTrip ? 'Round Trip (TO + FRO Tickets)' : 'One-Way Ticket'}
                </span>
                <span className="text-cyan-500">Base Transportation:</span> ₹{totalFare.toLocaleString()} <br />
                <span className="text-cyan-500">Regulated Taxes & GST:</span> ₹{convenienceFee}
              </div>
              <div className="text-right">
                <span className="text-cyan-500 text-[10px] font-mono uppercase">TOTAL AMOUNT DUE</span>
                <div className="text-2xl font-mono font-extrabold text-cyan-300">
                  ₹{grandTotal.toLocaleString()}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-2">
                Choose Instant Payment Method:
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'upi' ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-black border-cyan-900 text-cyan-600'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'card' ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-black border-cyan-900 text-cyan-600'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'netbanking' ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-black border-cyan-900 text-cyan-600'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>NetBank</span>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="p-3.5 rounded-xl bg-black border border-cyan-800 space-y-2">
                  <div className="text-xs text-cyan-300">Enter Virtual Payment Address (VPA / UPI ID):</div>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-3 py-2 rounded-lg bg-black border border-cyan-700 text-cyan-200 text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                  <div className="text-[11px] text-cyan-500">Instant validation with Google Pay, PhonePe, Paytm, BHIM</div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-3.5 rounded-xl bg-black border border-cyan-800 space-y-2 text-xs">
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 4242"
                    className="w-full px-3 py-2 rounded-lg bg-black border border-cyan-700 text-cyan-200 text-xs font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="px-3 py-2 rounded-lg bg-black border border-cyan-700 text-cyan-200 text-xs font-mono"
                    />
                    <input
                      type="password"
                      defaultValue="•••"
                      className="px-3 py-2 rounded-lg bg-black border border-cyan-700 text-cyan-200 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="p-3.5 rounded-xl bg-black border border-cyan-800 text-xs space-y-2">
                  <select className="w-full px-3 py-2 rounded-lg bg-black border border-cyan-700 text-cyan-200 text-xs">
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep('details')}
                className="px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-400 text-xs font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Issue {isRoundTrip ? 'Both To & Fro Tickets' : 'Official Ticket'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMED TICKETS (SHOWS BOTH TO AND FRO PASSES, WITH FRO AT LAST) */}
        {step === 'confirmed' && toTicket && (
          <div className="space-y-4">
            {/* Success Alert */}
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-400 flex items-center justify-between text-xs text-emerald-300">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isRoundTrip ? 'Both "TO" and "FRO" Boarding Passes Confirmed!' : 'Official Boarding Pass Issued!'}</span>
              </span>
              <span className="font-mono text-[11px] text-emerald-200">Ref: {toTicket.bookingRef}</span>
            </div>

            {/* CARD 1: "TO" JOURNEY PASS (OUTBOUND) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black border-2 border-cyan-400 relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.25)] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-cyan-900/80">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-400 text-black text-[10px] font-mono font-extrabold uppercase">
                    "TO" PASS (ONWARD)
                  </span>
                  <span className="text-xs font-bold text-white truncate max-w-[200px]">
                    {toTicket.title}
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan-400 font-bold">
                  PNR: {toTicket.pnrNumber}
                </div>
              </div>

              {/* Transit Route */}
              <div className="grid grid-cols-3 gap-2 text-center py-2 bg-cyan-950/20 rounded-xl border border-cyan-900/40">
                <div>
                  <div className="text-[10px] font-mono text-cyan-500">FROM</div>
                  <div className="text-sm sm:text-base font-bold text-white capitalize">{toTicket.origin}</div>
                  <div className="text-[10px] text-cyan-400 font-mono">{toTicket.departureTime}</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[10px] font-mono text-cyan-400">Direct Route</span>
                  <div className="w-16 h-0.5 bg-cyan-500 my-1 relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute right-0 -top-0.5" />
                  </div>
                  <span className="text-[9px] text-emerald-400 font-mono">Confirmed</span>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-500">TO</div>
                  <div className="text-sm sm:text-base font-bold text-white capitalize">{toTicket.destination}</div>
                  <div className="text-[10px] text-cyan-400 font-mono">{toTicket.arrivalTime}</div>
                </div>
              </div>

              {/* Data Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                  <div className="text-[9px] font-mono text-cyan-500">PASSENGER</div>
                  <div className="font-bold text-white truncate">{toTicket.passengerNames[0]}</div>
                </div>
                <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                  <div className="text-[9px] font-mono text-cyan-500">DATE</div>
                  <div className="font-bold text-white">{toTicket.travelDate}</div>
                </div>
                <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                  <div className="text-[9px] font-mono text-cyan-500">SEAT / BERTH</div>
                  <div className="font-bold text-cyan-300 truncate">{toTicket.seatsOrRooms}</div>
                </div>
                <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                  <div className="text-[9px] font-mono text-cyan-500">GATE / PLATFORM</div>
                  <div className="font-bold text-cyan-300 truncate">{toTicket.gateOrPlatform}</div>
                </div>
              </div>

              {/* QR row */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                <div className="text-[11px] text-cyan-300">
                  <span className="font-bold text-white">Digital Onward Pass:</span> Scan at entry gates
                </div>
                <QrCode className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            {/* CARD 2: "FRO" JOURNEY PASS (RETURN / INBOUND) - KEPT AT LAST AS REQUESTED */}
            {isRoundTrip && froTicket && (
              <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/30 border-2 border-emerald-400 relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.2)] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-cyan-900/80">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-400 text-black text-[10px] font-mono font-extrabold uppercase">
                      "FRO" PASS (RETURN TICKET - KEPT AT LAST)
                    </span>
                    <span className="text-xs font-bold text-white truncate max-w-[200px]">
                      {froTicket.title}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-emerald-300 font-bold">
                    PNR: {froTicket.pnrNumber}
                  </div>
                </div>

                {/* Return Route */}
                <div className="grid grid-cols-3 gap-2 text-center py-2 bg-black rounded-xl border border-cyan-900/40">
                  <div>
                    <div className="text-[10px] font-mono text-cyan-500">RETURN FROM</div>
                    <div className="text-sm sm:text-base font-bold text-white capitalize">{froTicket.origin}</div>
                    <div className="text-[10px] text-cyan-400 font-mono">{froTicket.departureTime}</div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[10px] font-mono text-emerald-400">Return Route</span>
                    <div className="w-16 h-0.5 bg-emerald-400 my-1 relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-white absolute right-0 -top-0.5" />
                    </div>
                    <span className="text-[9px] text-emerald-400 font-mono">Confirmed</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-cyan-500">RETURN TO</div>
                    <div className="text-sm sm:text-base font-bold text-white capitalize">{froTicket.destination}</div>
                    <div className="text-[10px] text-cyan-400 font-mono">{froTicket.arrivalTime}</div>
                  </div>
                </div>

                {/* Return Data Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                    <div className="text-[9px] font-mono text-cyan-500">PASSENGER</div>
                    <div className="font-bold text-white truncate">{froTicket.passengerNames[0]}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                    <div className="text-[9px] font-mono text-cyan-500">RETURN DATE</div>
                    <div className="font-bold text-white">{froTicket.travelDate}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                    <div className="text-[9px] font-mono text-cyan-500">RETURN SEAT</div>
                    <div className="font-bold text-emerald-300 truncate">{froTicket.seatsOrRooms}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                    <div className="text-[9px] font-mono text-cyan-500">PLATFORM / GATE</div>
                    <div className="font-bold text-emerald-300 truncate">{froTicket.gateOrPlatform}</div>
                  </div>
                </div>

                {/* Return QR row */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black border border-emerald-500/40">
                  <div className="text-[11px] text-emerald-300">
                    <span className="font-bold text-white">Digital Return Pass:</span> Valid for return journey on {froTicket.travelDate}
                  </div>
                  <QrCode className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-all cyan-glow flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                <Download className="w-4 h-4" />
                <span>Print / Download {isRoundTrip ? 'Both To & Fro Tickets' : 'Ticket Pass'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3.5 rounded-xl bg-black border border-cyan-800 text-cyan-300 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
