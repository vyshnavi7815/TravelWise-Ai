import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Sparkles, 
  User, 
  MapPin, 
  Calendar, 
  Users, 
  Train, 
  Hotel, 
  Utensils, 
  ShoppingBag, 
  Car, 
  Download, 
  Share2, 
  RefreshCw, 
  ArrowLeft,
  DollarSign,
  LifeBuoy,
  Ticket,
  Compass
} from 'lucide-react';
import { 
  PassengerDetails, 
  DestinationData, 
  BudgetBreakdown, 
  EmergencyContact, 
  LanguageCode 
} from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step14Props {
  details: PassengerDetails;
  destination: DestinationData;
  budget: BudgetBreakdown;
  emergencyContact: EmergencyContact;
  selectedTransportName: string;
  selectedStayName: string;
  onOpenBookingModal: () => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
  onReset: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step14FinalPlan: React.FC<Step14Props> = ({
  details,
  destination,
  budget,
  emergencyContact,
  selectedTransportName,
  selectedStayName,
  onOpenBookingModal,
  onOpenMyBookings,
  bookingsCount,
  onReset,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);

  const purposeLabels: Record<string, string> = {
    devotional: 'Devotional & Pilgrimage 🛕',
    chilling: 'Chilling & Leisure 🌴',
    family: 'Family Vacation 👨‍👩‍👧‍👦',
    adventure: 'Adventure & Thrills 🧗',
    heritage: 'Heritage & Culture 🏛️',
    solo: 'Solo Backpacking 🎒'
  };

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#22d3ee', '#ffffff', '#0891b2']
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `TravelWise AI Plan: ${destination.name}`,
        text: `Check out my optimized trip to ${destination.name} planned by TravelWise AI under ₹${details.totalBudget.toLocaleString()}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Trip plan URL copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>YOUR TRIP IS READY ✨</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
          {t.finalTravelPlan}
        </h2>
        <p className="text-sm text-cyan-300/80 max-w-xl mx-auto">
          Tailored exclusively for <strong className="text-white">{details.passengerName || 'Traveller'}</strong> to explore{' '}
          <strong className="text-cyan-300">{destination.name}</strong> while keeping ₹{budget.remainingBudget.toLocaleString()} safely unspent.
        </p>
      </div>

      {/* Direct Booking Highlight Banner (User Request point 1) */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-950/90 via-black to-cyan-950/60 border-2 border-cyan-400 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-black flex items-center justify-center font-bold text-xl shadow-[0_0_15px_#06b6d4]">
            <Ticket className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Instant Ticket & Pass Booking
            </h3>
            <p className="text-xs text-cyan-300/90 mt-0.5">
              Lock in your transport seats and generate confirmed digital boarding passes right now!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onOpenBookingModal}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          >
            <Ticket className="w-4 h-4 fill-black" />
            <span>Book Tickets Now 🎫</span>
          </button>

          {bookingsCount > 0 && (
            <button
              onClick={onOpenMyBookings}
              className="px-4 py-3 rounded-xl bg-black border border-cyan-500 text-cyan-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              View Passes ({bookingsCount})
            </button>
          )}
        </div>
      </div>

      {/* Main Executive Summary Travel Pass Card */}
      <div className="rounded-3xl bg-black border-2 border-cyan-400 p-6 sm:p-8 shadow-[0_0_35px_rgba(6,182,212,0.3)] mb-8 relative overflow-hidden backdrop-blur-xl">
        {/* Top Branding Bar */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-5 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 text-black flex items-center justify-center font-bold text-lg font-mono">
              TW
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wider">
                TRAVELWISE AI ITINERARY PASS
              </div>
              <div className="text-[10px] font-mono text-cyan-400">
                VERIFIED BUDGET CONSTRAINED ITINERARY
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-cyan-500">TRIP VIBE</span>
            <div className="text-xs font-mono font-bold text-cyan-300">
              {purposeLabels[details.tripPurpose || 'chilling'] || 'Leisure Tour'}
            </div>
          </div>
        </div>

        {/* 2-Column Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs">
          {/* Passenger Info */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div className="text-cyan-500 font-mono text-[10px] mb-0.5 flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>PASSENGER</span>
              </div>
              <div className="text-sm font-bold text-white">
                {details.passengerName || 'Rahul Sharma'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div className="text-cyan-500 font-mono text-[10px] mb-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>ROUTE</span>
              </div>
              <div className="text-sm font-bold text-white capitalize">
                {details.fromLocation} → {destination.name}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div className="text-cyan-500 font-mono text-[10px] mb-0.5 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>TRAVEL DATES & PARTY</span>
              </div>
              <div className="text-sm font-bold text-white">
                {details.travelDate} {details.tripType === 'round_trip' ? `to ${details.returnDate}` : '(One-way)'} · {details.totalTravellers} Person(s)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div className="text-cyan-500 font-mono text-[10px] mb-0.5 flex items-center gap-1">
                <Train className="w-3 h-3" />
                <span>RECOMMENDED TRANSIT</span>
              </div>
              <div className="text-sm font-bold text-cyan-300">
                {selectedTransportName}
              </div>
            </div>
          </div>

          {/* Stays & Activities */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div className="text-cyan-500 font-mono text-[10px] mb-0.5 flex items-center gap-1">
                <Hotel className="w-3 h-3" />
                <span>RECOMMENDED STAY</span>
              </div>
              <div className="text-sm font-bold text-white">
                {selectedStayName}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div className="text-cyan-500 font-mono text-[10px] mb-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>BEST PLACES TO VISIT</span>
              </div>
              <div className="text-sm font-bold text-white">
                {destination.places.slice(0, 3).map(p => p.name).join(' · ')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <div className="text-cyan-500 font-mono text-[10px] mb-0.5 flex items-center gap-1">
                <Utensils className="w-3 h-3" />
                <span>FEATURED FOOD & SHOPPING</span>
              </div>
              <div className="text-sm font-bold text-white">
                {destination.foods[0]?.name} · {destination.shopping[0]?.name}
              </div>
            </div>

            {emergencyContact.phone && (
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
                <div className="text-cyan-500 font-mono text-[10px] mb-0.5 flex items-center gap-1">
                  <LifeBuoy className="w-3 h-3" />
                  <span>EMERGENCY CONTACT</span>
                </div>
                <div className="text-sm font-bold text-white">
                  {emergencyContact.name} ({emergencyContact.relation}): {emergencyContact.phone}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Financial Bottom Bar */}
        <div className="pt-6 border-t border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-500">ESTIMATED TOTAL EXPENSE</div>
            <div className="text-3xl font-mono font-extrabold text-cyan-300">
              ₹{budget.totalEstimatedCost.toLocaleString()}
            </div>
            <div className="text-xs text-cyan-400/80">
              Target Budget: ₹{budget.userBudget.toLocaleString()}
            </div>
          </div>

          <div className="text-right p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50">
            <span className="text-[10px] font-mono text-emerald-400 uppercase">
              Remaining Saved Balance
            </span>
            <div className="text-2xl font-mono font-extrabold text-emerald-300">
              ₹{budget.remainingBudget.toLocaleString()}
            </div>
          </div>
        </div>

        {/* AI Final Personalized Explanation */}
        <div className="mt-6 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-xs text-cyan-200 leading-relaxed flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-300">AI Personal Recommendation:</strong> By aligning with your <strong>{purposeLabels[details.tripPurpose || 'chilling']}</strong> vibe and pairing efficient transit with centrally located lodging, you maintain ample liquidity for authentic cuisine, attraction tickets, and local souvenirs without exceeding your ₹{details.totalBudget.toLocaleString()} limit.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download & Print PDF Pass</span>
        </button>

        <button
          onClick={handleShare}
          className="px-5 py-3 rounded-xl bg-black border border-cyan-600 text-cyan-300 hover:text-white hover:border-cyan-400 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Travel Plan</span>
        </button>

        <button
          onClick={onReset}
          className="px-5 py-3 rounded-xl bg-black border border-cyan-900 text-cyan-500 hover:text-cyan-300 text-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Plan Another Trip</span>
        </button>
      </div>

      {/* Back button */}
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="text-xs text-cyan-500 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Safety & Emergency details</span>
        </button>
      </div>
    </div>
  );
};
