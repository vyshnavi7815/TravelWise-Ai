import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  Building2, 
  Pill, 
  CloudLightning, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  UserPlus, 
  HeartHandshake 
} from 'lucide-react';
import { SafetyInfo, EmergencyContact, LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface Step13Props {
  safety: SafetyInfo;
  emergencyContact: EmergencyContact;
  onUpdateEmergencyContact: (contact: EmergencyContact) => void;
  destinationName: string;
  onNext: () => void;
  onBack: () => void;
  lang: LanguageCode;
}

export const Step13Safety: React.FC<Step13Props> = ({
  safety,
  emergencyContact,
  onUpdateEmergencyContact,
  destinationName,
  onNext,
  onBack,
  lang
}) => {
  const t = getTranslation(lang);
  const [saved, setSaved] = useState(false);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 cyan-glow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 13 · HEALTH & CONTINGENCY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          {t.travelSafety} in <span className="capitalize text-cyan-400">{destinationName}</span>
        </h2>
        <p className="text-sm text-cyan-400/80 max-w-xl mx-auto">
          Verified emergency response contacts, nearest hospitals, 24/7 pharmacies, and localized safety protocols.
        </p>
      </div>

      {/* 4 Emergency Helplines quick dials */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="p-4 rounded-xl bg-black border border-cyan-500/40 text-center cyan-glow-sm">
          <span className="text-[10px] font-mono text-cyan-500">NATIONAL EMERGENCY</span>
          <div className="text-2xl font-mono font-extrabold text-cyan-300 mt-1">
            {safety.generalHelpline}
          </div>
          <span className="text-[11px] text-cyan-600">All-in-one response</span>
        </div>

        <div className="p-4 rounded-xl bg-black border border-cyan-900/80 text-center">
          <span className="text-[10px] font-mono text-cyan-500">POLICE HELPLINE</span>
          <div className="text-lg font-mono font-bold text-white mt-1 truncate">
            {safety.policeNumber.split('/')[0]}
          </div>
          <span className="text-[11px] text-cyan-600">Tourist assistance</span>
        </div>

        <div className="p-4 rounded-xl bg-black border border-cyan-900/80 text-center">
          <span className="text-[10px] font-mono text-cyan-500">AMBULANCE</span>
          <div className="text-2xl font-mono font-extrabold text-cyan-300 mt-1">
            {safety.ambulanceNumber}
          </div>
          <span className="text-[11px] text-cyan-600">Medical emergency</span>
        </div>

        <div className="p-4 rounded-xl bg-black border border-cyan-900/80 text-center">
          <span className="text-[10px] font-mono text-cyan-500">TOURIST DESK</span>
          <div className="text-2xl font-mono font-extrabold text-cyan-300 mt-1">
            {safety.touristHelpline.split(' ')[0]}
          </div>
          <span className="text-[11px] text-cyan-600">Multilingual 24/7</span>
        </div>
      </div>

      {/* Emergency Contact Card */}
      <div className="p-6 rounded-2xl bg-black/90 border border-cyan-500/40 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="flex items-center gap-2 mb-4 text-cyan-300 font-bold text-base">
          <UserPlus className="w-5 h-5 text-cyan-400" />
          <span>Save Your Primary Emergency Contact</span>
        </div>
        <p className="text-xs text-cyan-400/80 mb-4">
          This number will be embedded on your digital travel plan pass for 1-tap dial in case of emergency.
        </p>

        <form onSubmit={handleSaveContact} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Contact Name (e.g. Brother)"
            value={emergencyContact.name}
            onChange={(e) => onUpdateEmergencyContact({ ...emergencyContact, name: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400"
          />
          <input
            type="text"
            placeholder="Relation (e.g. Family)"
            value={emergencyContact.relation}
            onChange={(e) => onUpdateEmergencyContact({ ...emergencyContact, relation: e.target.value })}
            className="px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400"
          />
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="+91 Phone Number"
              value={emergencyContact.phone}
              onChange={(e) => onUpdateEmergencyContact({ ...emergencyContact, phone: e.target.value })}
              className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-cyan-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              {saved ? 'Saved ✓' : 'Save'}
            </button>
          </div>
        </form>
      </div>

      {/* Hospitals & Police Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Hospitals */}
        <div className="p-5 rounded-2xl bg-black/80 border border-cyan-900/60">
          <div className="flex items-center gap-2 mb-3 text-cyan-300 font-bold text-sm">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Nearby Verified Hospitals</span>
          </div>
          <div className="space-y-2.5">
            {safety.nearbyHospitals.map((h, i) => (
              <div key={i} className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{h.name}</div>
                  <div className="text-[11px] text-cyan-500">{h.distance}</div>
                </div>
                <div className="font-mono text-cyan-400 font-semibold">{h.contact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 24/7 Pharmacies */}
        <div className="p-5 rounded-2xl bg-black/80 border border-cyan-900/60">
          <div className="flex items-center gap-2 mb-3 text-cyan-300 font-bold text-sm">
            <Pill className="w-4 h-4 text-cyan-400" />
            <span>24/7 Duty Chemists & Medical Stores</span>
          </div>
          <div className="space-y-2.5">
            {safety.pharmacies24x7.map((p, i) => (
              <div key={i} className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{p.name}</div>
                  <div className="text-[11px] text-cyan-500">{p.distance}</div>
                </div>
                <div className="font-mono text-cyan-400 font-semibold">{p.contact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-900/60 mb-8">
        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>Local Safety Advisory</span>
        </h4>
        <ul className="space-y-2">
          {safety.safetyTips.map((tip, idx) => (
            <li key={idx} className="text-xs text-cyan-200/90 flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

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
