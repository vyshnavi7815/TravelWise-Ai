import React from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  TrendingDown, 
  ShieldCheck, 
  Download, 
  Share2, 
  RefreshCw, 
  Ticket,
  User,
  MapPin,
  Calendar,
  Train,
  Hotel,
  LifeBuoy
} from 'lucide-react';
import { 
  PassengerDetails, 
  DestinationData, 
  BudgetBreakdown, 
  EmergencyContact, 
  OptimizationSuggestion, 
  LanguageCode 
} from '../types/travel';
import { InteractiveRouteMap } from './InteractiveRouteMap';

interface MasterStep5FinalOptimizerProps {
  details: PassengerDetails;
  destination: DestinationData;
  budget: BudgetBreakdown;
  emergencyContact: EmergencyContact;
  onUpdateEmergencyContact: (contact: EmergencyContact) => void;
  selectedTransportName: string;
  selectedStayName: string;
  optimizations: OptimizationSuggestion[];
  onApplyOptimization: (id: string) => void;
  onApplyAllOptimizations: () => void;
  onOpenBookingModal: () => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
  onReset: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const MasterStep5FinalOptimizer: React.FC<MasterStep5FinalOptimizerProps> = ({
  details,
  destination,
  budget,
  emergencyContact,
  onUpdateEmergencyContact,
  selectedTransportName,
  selectedStayName,
  optimizations,
  onApplyOptimization,
  onApplyAllOptimizations,
  onOpenBookingModal,
  onOpenMyBookings,
  bookingsCount,
  onReset,
  onBack,
  lang
}) => {
  const totalPossibleSavings = optimizations.reduce((acc, s) => acc + s.savings, 0);
  const totalAppliedSavings = optimizations
    .filter(s => s.applied)
    .reduce((acc, s) => acc + s.savings, 0);

  const purposeLabels: Record<string, string> = {
    devotional: 'Devotional & Pilgrimage 🛕',
    chilling: 'Chilling & Leisure 🌴',
    family: 'Family Vacation 👨‍👩‍👧‍👦',
    adventure: 'Adventure & Thrills 🧗',
    heritage: 'Heritage & Culture 🏛️',
    solo: 'Solo Backpacking 🎒'
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 5 OF 5 · FINAL ITINERARY PASS & OPTIMIZER</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
          Your Personalized Travel Pass
        </h2>
        <p className="text-sm text-cyan-300/80 max-w-xl mx-auto">
          Tailored exclusively for <strong className="text-white">{details.passengerName || 'Traveller'}</strong> to explore{' '}
          <strong className="text-cyan-300">{destination.name}</strong> while keeping ₹{budget.remainingBudget.toLocaleString()} safely unspent.
        </p>
      </div>

      {/* Direct Booking Highlight Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-950/90 via-black to-cyan-950/60 border-2 border-cyan-400 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-black flex items-center justify-center font-bold text-xl shadow-[0_0_15px_#06b6d4]">
            <Ticket className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Instant Ticket & Pass Booking
            </h3>
            <p className="text-xs text-cyan-300/90 mt-0.5">
              Lock in your transport seats and generate confirmed digital boarding passes with PNR right now!
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

      {/* Main Boarding Pass Card */}
      <div className="rounded-3xl bg-black border-2 border-cyan-400 p-6 sm:p-8 shadow-[0_0_35px_rgba(6,182,212,0.3)] relative overflow-hidden backdrop-blur-xl">
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

        {/* Manifest details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <span className="text-cyan-500 font-mono text-[10px] block">PASSENGER & ROUTE</span>
              <div className="text-sm font-bold text-white capitalize mt-0.5">
                {details.passengerName || 'Rahul Sharma'} · {details.fromLocation} → {destination.name}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <span className="text-cyan-500 font-mono text-[10px] block">DATES & PARTY</span>
              <div className="text-sm font-bold text-white mt-0.5">
                {details.travelDate} to {details.returnDate} ({details.totalTravellers} Travellers)
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <span className="text-cyan-500 font-mono text-[10px] block">TRANSIT & LODGING</span>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">
                {selectedTransportName} · {selectedStayName}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40">
              <span className="text-cyan-500 font-mono text-[10px] block">TOTAL COST & SAVINGS</span>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                Est. Total: ₹{budget.totalEstimatedCost.toLocaleString()} · Safe Balance: ₹{budget.remainingBudget.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* AI Note */}
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-xs text-cyan-200">
          <strong>AI Personal Guarantee:</strong> Your trip is locked inside your ₹{details.totalBudget.toLocaleString()} ceiling, leaving ample funds for authentic regional cuisine, transport, and memories.
        </div>
      </div>

      {/* Embedded Route Map */}
      <InteractiveRouteMap
        destination={destination}
        details={details}
        selectedStayName={selectedStayName}
      />

      {/* AI Budget Optimizer Scoreboard (if savings available) */}
      <div className="p-6 rounded-3xl bg-black/90 border border-cyan-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">AI Budget Optimizer</h3>
          </div>
          <span className="text-xs font-mono text-cyan-300">
            Total Possible Savings: ₹{totalPossibleSavings.toLocaleString()}
          </span>
        </div>

        <div className="space-y-3">
          {optimizations.map((sug) => (
            <div
              key={sug.id}
              className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="text-cyan-400 font-mono font-bold">Save ₹{sug.savings.toLocaleString()}</span>
                <div className="text-white font-medium mt-0.5">{sug.recommendedChoice}</div>
                <div className="text-cyan-500 text-[11px]">{sug.reason}</div>
              </div>
              <button
                onClick={() => onApplyOptimization(sug.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  sug.applied ? 'bg-cyan-950 border border-cyan-400 text-cyan-300' : 'bg-cyan-500 text-black'
                }`}
              >
                {sug.applied ? '✓ Applied' : 'Apply Switch'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Helplines Quick Banner */}
      <div className="p-5 rounded-3xl bg-black border border-cyan-900/60 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-cyan-300">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Emergency Helplines: National <strong>112</strong> · Police <strong>100</strong> · Ambulance <strong>108</strong> · Tourist <strong>1363</strong></span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cursor-pointer"
          >
            Download / Print Plan
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-xl bg-black border border-cyan-800 text-cyan-400 hover:text-white text-xs cursor-pointer"
          >
            Plan Another Trip
          </button>
        </div>
      </div>

      {/* Back button */}
      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="text-xs text-cyan-500 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Food & Itinerary</span>
        </button>
      </div>
    </div>
  );
};
