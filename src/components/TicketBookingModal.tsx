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
  Armchair
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
  const [selectedSlot, setSelectedSlot] = useState('07:30 AM · Morning Superfast');
  const [seatPreference, setSeatPreference] = useState('Lower Berth / Window');
  const [classTier, setClassTier] = useState('Standard AC (3AC / Economy)');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('traveller@oksbi');
  const [confirmedTicket, setConfirmedTicket] = useState<BookedTicket | null>(null);

  if (!isOpen) return null;

  const totalFare = transportItem?.totalCost || 2400;
  const convenienceFee = Math.round(totalFare * 0.02);
  const grandTotal = totalFare + convenienceFee;

  const handleConfirmPayment = () => {
    const pnr = `TW-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const ticket: BookedTicket = {
      id: Date.now().toString(),
      bookingRef: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      pnrNumber: pnr,
      type: 'transport',
      title: transportItem?.name || 'Superfast Express',
      subtitle: `${classTier} · ${selectedSlot}`,
      passengerNames: [
        details.passengerName || 'Rahul Sharma',
        ...(details.totalTravellers > 1 ? [`Companion (${details.totalTravellers - 1} Traveller(s))`] : [])
      ],
      travelDate: details.travelDate || '2026-10-15',
      seatsOrRooms: `${seatPreference} (Coach B2, Seats 23 & 24)`,
      totalPaid: grandTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      status: 'CONFIRMED',
      issuedAt: new Date().toLocaleString(),
      departureTime: selectedSlot.split('·')[0].trim(),
      arrivalTime: '04:45 PM',
      origin: details.fromLocation,
      destination: details.toDestination,
      gateOrPlatform: 'Platform 4 / Gate 2B',
      qrCodeData: `TRAVELWISE-PNR:${pnr}-PAID:₹${grandTotal}`
    };

    setConfirmedTicket(ticket);
    onBookingSuccess(ticket);
    setStep('confirmed');

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#22d3ee', '#ffffff']
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
      <div className="relative w-full max-w-xl rounded-3xl bg-black border-2 border-cyan-400 p-6 shadow-2xl cyan-glow overflow-y-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-900/60">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              {step === 'confirmed' ? 'Booking Confirmed! 🎫' : 'Book Transport Tickets'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-cyan-950 border border-cyan-600 text-cyan-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: TRAVEL & SEAT DETAILS */}
        {step === 'details' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-500 uppercase">SELECTED MODE</span>
                <div className="text-base font-bold text-white">{transportItem?.name || 'Superfast Express'}</div>
                <div className="text-xs text-cyan-300 capitalize">{details.fromLocation} → {details.toDestination}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-cyan-500 uppercase">BASE FARE</span>
                <div className="text-lg font-mono font-bold text-cyan-400">₹{totalFare.toLocaleString()}</div>
                <div className="text-[10px] text-cyan-600 font-mono">{details.totalTravellers} Traveller(s)</div>
              </div>
            </div>

            {/* Departure slot */}
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Select Departure Schedule:</span>
              </label>
              <div className="space-y-2">
                {[
                  '06:30 AM · Morning Express (Fastest)',
                  '01:15 PM · Afternoon Scenic Service',
                  '09:45 PM · Overnight Sleeper Pod'
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      selectedSlot === slot
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                        : 'bg-black border-cyan-900/60 text-cyan-400/80 hover:border-cyan-700'
                    }`}
                  >
                    <span>{slot}</span>
                    <span className="font-mono text-[11px] text-cyan-500">Seats Available</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Class & Seat Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-1.5">
                  Class / Coach Tier:
                </label>
                <select
                  value={classTier}
                  onChange={(e) => setClassTier(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Standard AC (3AC / Economy)">Standard AC (3AC / Economy)</option>
                  <option value="Premium Sleeper (2AC)">Premium Sleeper (2AC)</option>
                  <option value="Executive Chair Car">Executive Chair Car</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-1.5">
                  Seat Preference:
                </label>
                <select
                  value={seatPreference}
                  onChange={(e) => setSeatPreference(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Lower Berth / Window">Lower Berth / Window</option>
                  <option value="Aisle Seat">Aisle Seat</option>
                  <option value="Two Adjacent Seats">Two Adjacent Seats</option>
                </select>
              </div>
            </div>

            {/* Passenger Manifest Preview */}
            <div className="p-3 rounded-xl bg-black border border-cyan-900/60">
              <span className="text-[10px] font-mono text-cyan-500 uppercase block mb-1">
                PASSENGER MANIFEST
              </span>
              <div className="text-xs text-white font-medium">
                1. {details.passengerName || 'Rahul Sharma'} (Primary Contact)
              </div>
              {details.totalTravellers > 1 && (
                <div className="text-xs text-cyan-400/80 mt-0.5">
                  + {details.totalTravellers - 1} Co-traveller(s) allocated in same coach
                </div>
              )}
            </div>

            <button
              onClick={() => setStep('payment')}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow cursor-pointer mt-2"
            >
              Proceed to Instant Payment (₹{grandTotal.toLocaleString()})
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT SIMULATION */}
        {step === 'payment' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-900/60 flex items-center justify-between text-xs">
              <div>
                <span className="text-cyan-500">Base Fare:</span> ₹{totalFare.toLocaleString()} <br />
                <span className="text-cyan-500">Govt Regulated Fee & GST:</span> ₹{convenienceFee}
              </div>
              <div className="text-right">
                <span className="text-cyan-500 text-[10px] font-mono">TOTAL AMOUNT DUE</span>
                <div className="text-xl font-mono font-bold text-cyan-300">₹{grandTotal.toLocaleString()}</div>
              </div>
            </div>

            {/* Payment method tabs */}
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-2">
                Choose Instant Payment Method:
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                      : 'bg-black border-cyan-900 text-cyan-600'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                      : 'bg-black border-cyan-900 text-cyan-600'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'netbanking'
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                      : 'bg-black border-cyan-900 text-cyan-600'
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
                  <div className="text-[11px] text-cyan-500">Supported: Google Pay, PhonePe, Paytm, BHIM</div>
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
                className="px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-400 text-xs font-medium"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Generate Official Ticket</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMED TICKET BOARDING PASS */}
        {step === 'confirmed' && confirmedTicket && (
          <div className="space-y-4">
            {/* Themed Boarding Pass */}
            <div className="p-5 rounded-2xl bg-black border-2 border-cyan-400 relative overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.25)]">
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-900/80">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-widest uppercase">
                    TRAVELWISE PASS
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold">
                    ✓ CONFIRMED
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan-400 font-bold">
                  PNR: {confirmedTicket.pnrNumber}
                </div>
              </div>

              {/* Transit Route */}
              <div className="grid grid-cols-3 gap-2 text-center py-2 mb-3 bg-cyan-950/20 rounded-xl border border-cyan-900/40">
                <div>
                  <div className="text-[10px] font-mono text-cyan-500">ORIGIN</div>
                  <div className="text-base font-bold text-white capitalize">{confirmedTicket.origin}</div>
                  <div className="text-[10px] text-cyan-400 font-mono">{confirmedTicket.departureTime}</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[10px] font-mono text-cyan-400">Direct Route</span>
                  <div className="w-16 h-0.5 bg-cyan-500 my-1 relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute right-0 -top-0.5" />
                  </div>
                  <span className="text-[9px] text-cyan-600 font-mono">Confirmed</span>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-500">DESTINATION</div>
                  <div className="text-base font-bold text-white capitalize">{confirmedTicket.destination}</div>
                  <div className="text-[10px] text-cyan-400 font-mono">{confirmedTicket.arrivalTime}</div>
                </div>
              </div>

              {/* Passenger & Seat Data */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
                <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                  <div className="text-[9px] font-mono text-cyan-500">PRIMARY PASSENGER</div>
                  <div className="font-bold text-white truncate">{confirmedTicket.passengerNames[0]}</div>
                </div>
                <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                  <div className="text-[9px] font-mono text-cyan-500">DATE</div>
                  <div className="font-bold text-white">{confirmedTicket.travelDate}</div>
                </div>
                <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                  <div className="text-[9px] font-mono text-cyan-500">SEAT ALLOCATION</div>
                  <div className="font-bold text-cyan-300 truncate">{confirmedTicket.seatsOrRooms}</div>
                </div>
                <div className="p-2 rounded-lg bg-black border border-cyan-900/60">
                  <div className="text-[9px] font-mono text-cyan-500">PLATFORM / GATE</div>
                  <div className="font-bold text-cyan-300">{confirmedTicket.gateOrPlatform}</div>
                </div>
              </div>

              {/* QR Code Barcode Representation */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">DIGITAL BOARDING QR PASS</div>
                  <div className="text-[11px] text-white">Scan at Station Validator / Gate Turnstiles</div>
                  <div className="text-[10px] text-cyan-600 font-mono">Total Paid: ₹{confirmedTicket.totalPaid.toLocaleString()} ({confirmedTicket.paymentMethod})</div>
                </div>
                <div className="p-2 rounded-lg bg-black border border-cyan-400 text-cyan-300 flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download / Print Ticket Pass</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-black border border-cyan-800 text-cyan-300 hover:text-white text-xs font-semibold"
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
