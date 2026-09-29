import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Bus, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Info 
} from 'lucide-react';
import { LocalTransportOption, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step9Props {
  options: LocalTransportOption[];
  destinationName: string;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step9LocalTransport: React.FC<Step9Props> = ({
  options,
  destinationName,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);
  const [prebookModalOpen, setPrebookModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <Car className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 9 · INTRA-CITY TRANSIT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.localTransport} in <span className="capitalize text-cyan-400">{destinationName}</span>
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Explore local transit choices: government buses, verified prepaid autos, two-wheeler rentals, and digital taxi networks.
        </p>
      </div>

      {/* "Can I Pre-book a Cab?" Interactive Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-black to-cyan-950/40 border border-cyan-400 mb-8 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 shrink-0">
              <Car className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-0.5">
                Cab Inquiry Service
              </div>
              <h3 className="text-base font-bold text-white">
                Can I Pre-book a Cab in {destinationName}?
              </h3>
              <p className="text-xs text-cyan-200/80 mt-1 max-w-xl">
                Check ride-hailing availability, prepaid airport counters, and verified local operator rates.
              </p>
            </div>
          </div>

          <button
            onClick={() => setPrebookModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all cyan-glow shrink-0 cursor-pointer"
          >
            Check Cab Availability
          </button>
        </div>
      </div>

      {/* Transparent Disclaimer Box (Requirement: Clearly state live booking status) */}
      <div className="p-4 rounded-xl bg-black border border-cyan-800 mb-6 flex items-start gap-3 text-xs text-cyan-400/90">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-cyan-300">Data Integrity Policy:</strong> Live direct API booking is currently in beta for this region. Displayed prices reflect verified government-metered baseline rates and sample peak estimates. Never will an unconfirmed booking be misrepresented as live.
        </div>
      </div>

      {/* Transit Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="p-5 rounded-2xl bg-black/80 border border-cyan-900/60 hover:border-cyan-500/60 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {opt.name}
                    </h4>
                    <span className="text-[11px] text-cyan-500 font-mono capitalize">
                      {opt.mode.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-mono font-bold text-cyan-300">
                    ~₹{opt.estimatedFare}
                  </div>
                  <span className="text-[10px] text-cyan-500 font-mono">avg. fare</span>
                </div>
              </div>

              <p className="text-xs text-cyan-200/80 mb-4 leading-relaxed">
                {opt.providerNote}
              </p>
            </div>

            <div className="pt-3 border-t border-cyan-950/60 flex items-center justify-between text-xs">
              <span className="text-cyan-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                {opt.travelTime}
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-[10px] font-mono">
                Availability: {opt.availability}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pre-book Cab Modal */}
      {prebookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-black border border-cyan-400 p-6 shadow-2xl cyan-glow">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-900/60">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">
                  Cab Pre-Booking & Dispatch Status
                </h3>
              </div>
              <button
                onClick={() => setPrebookModalOpen(false)}
                className="text-cyan-500 hover:text-cyan-300 text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            {/* Clear Transparency Banner */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/50 mb-4 text-xs text-cyan-200 leading-relaxed">
              <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-cyan-400" />
                <span>Live Status Statement</span>
              </div>
              “Live instant ride hailing API integration is currently simulated with verified regulated fares. Here are the active transit counters and verified contact points for {destinationName}.”
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl bg-black border border-cyan-900/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Airport Prepaid Taxi Booth</div>
                  <div className="text-[11px] text-cyan-500">Fixed rate counter inside terminal arrivals</div>
                </div>
                <div className="font-mono text-cyan-300 font-bold">~₹600 - ₹900</div>
              </div>

              <div className="p-3 rounded-xl bg-black border border-cyan-900/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">State Tourist App / GoaMiles / FastTrack</div>
                  <div className="text-[11px] text-cyan-500">Government authorized digital app booking</div>
                </div>
                <div className="font-mono text-cyan-300 font-bold">Meter regulated</div>
              </div>

              <div className="p-3 rounded-xl bg-black border border-cyan-900/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Railway Station Auto Stand</div>
                  <div className="text-[11px] text-cyan-500">Official police prepaid booth outside station</div>
                </div>
                <div className="font-mono text-cyan-300 font-bold">~₹100 - ₹250</div>
              </div>
            </div>

            <button
              onClick={() => setPrebookModalOpen(false)}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow"
            >
              Acknowledged & Continue
            </button>
          </div>
        </div>
      )}

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
