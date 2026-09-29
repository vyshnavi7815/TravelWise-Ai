import React from 'react';
import { 
  Ticket, 
  X, 
  QrCode, 
  Download, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Plane,
  Train,
  Building2
} from 'lucide-react';
import { BookedTicket } from '../types/travel';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookedTicket[];
  onOpenBookingModal: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onOpenBookingModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-black border-2 border-cyan-400 p-6 shadow-2xl cyan-glow overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-900/60">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              My Booked Tickets & Boarding Passes ({bookings.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-cyan-950 border border-cyan-600 text-cyan-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
              <Ticket className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white">No Tickets Booked Yet</h4>
            <p className="text-xs text-cyan-400/80 max-w-sm mx-auto">
              You can instantly book verified transport tickets, stays, and attraction passes directly in TravelWise AI!
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenBookingModal();
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow cursor-pointer mt-2"
            >
              Book Transport Ticket Now 🎫
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-black border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-900/60">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                      TRAVELWISE VERIFIED PASS
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">{b.title}</h4>
                    <div className="text-xs text-cyan-300 font-mono">{b.subtitle}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 text-[10px] font-mono font-bold">
                      ✓ {b.status}
                    </span>
                    <div className="text-xs font-mono text-cyan-400 mt-1 font-bold">
                      PNR: {b.pnrNumber}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
                  <div className="p-2 rounded-lg bg-cyan-950/20 border border-cyan-900/60">
                    <div className="text-[9px] font-mono text-cyan-500">PASSENGER</div>
                    <div className="font-bold text-white truncate">{b.passengerNames[0]}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-950/20 border border-cyan-900/60">
                    <div className="text-[9px] font-mono text-cyan-500">TRAVEL DATE</div>
                    <div className="font-bold text-white">{b.travelDate}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-950/20 border border-cyan-900/60">
                    <div className="text-[9px] font-mono text-cyan-500">SEAT / BERTH</div>
                    <div className="font-bold text-cyan-300 truncate">{b.seatsOrRooms}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-950/20 border border-cyan-900/60">
                    <div className="text-[9px] font-mono text-cyan-500">FARE PAID</div>
                    <div className="font-bold text-emerald-400 font-mono">₹{b.totalPaid.toLocaleString()}</div>
                  </div>
                </div>

                {/* QR and Print */}
                <div className="flex items-center justify-between pt-2 border-t border-cyan-950/60 text-xs">
                  <div className="flex items-center gap-2 text-cyan-400/80">
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    <span className="text-[11px] font-mono">Barcode Validated · Gate Ready</span>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print Ticket</span>
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                onClose();
                onOpenBookingModal();
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500 text-cyan-300 text-xs font-bold transition-all"
            >
              + Book Another Ticket or Accommodation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
