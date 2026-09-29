import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  Wallet, 
  Train, 
  MapPin, 
  UtensilsCrossed, 
  ShoppingBag, 
  Car, 
  Globe2, 
  ShieldCheck,
  CheckCircle,
  TrendingDown
} from 'lucide-react';
import { LanguageCode } from '../types/travel';
import { getTranslation } from '../data/translations';

interface LandingHeroProps {
  onStartPlanning: () => void;
  onExploreDestinations: () => void;
  lang: LanguageCode;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartPlanning,
  onExploreDestinations,
  lang
}) => {
  const t = getTranslation(lang);

  const features = [
    {
      icon: BrainCircuit,
      title: 'AI Trip Planning',
      desc: 'Autonomous trip architect that balances route, comfort, and timing.'
    },
    {
      icon: Wallet,
      title: 'Budget Optimization',
      desc: 'Guaranteed spending ceiling — never suggests plans beyond your funds.'
    },
    {
      icon: Train,
      title: 'Smart Transport',
      desc: 'Comparative matrix across Flight, Train, Bus, Cabs & Rentals.'
    },
    {
      icon: MapPin,
      title: 'Personalized Places',
      desc: 'Curated attractions filtered by visit duration and entry costs.'
    },
    {
      icon: UtensilsCrossed,
      title: 'Local Food Discovery',
      desc: 'Authentic regional culinary highlights with dish price tracking.'
    },
    {
      icon: ShoppingBag,
      title: 'Smart Shopping',
      desc: 'Famous indigenous markets with realistic price estimations.'
    },
    {
      icon: Car,
      title: 'Local Cab Assistance',
      desc: 'Transparent transit fares from your live GPS location to spots.'
    },
    {
      icon: Globe2,
      title: '11+ Languages',
      desc: 'Full-spectrum multilingual translation across every step.'
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 cyber-grid">
      {/* Subtle Cyan ambient glow rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full text-center relative z-10">
        {/* Hackathon / Competition Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-6 cyan-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Gen Agentic Travel Planner · Budget-First Architecture</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-sans">
          Travel Smarter. <br />
          <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            Spend Better.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-cyan-200/90 font-normal mb-8 leading-relaxed">
          {t.heroSubheadline}
        </p>

        {/* Core USP Highlight Banner */}
        <div className="max-w-3xl mx-auto mb-10 p-4 rounded-xl bg-black/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] text-left flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 shrink-0">
            <TrendingDown className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-0.5">
              The TravelWise AI Promise
            </div>
            <p className="text-sm text-cyan-100">
              “Most travel websites help you book a trip. <strong className="text-cyan-300">TravelWise AI</strong> helps you decide the entire journey according to what you can actually afford without surprise expenses.”
            </p>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartPlanning}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-base transition-all cyan-glow flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.5)]"
          >
            <span>{t.planMyTrip}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreDestinations}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/80 hover:bg-cyan-950/50 text-cyan-300 border border-cyan-500/50 hover:border-cyan-400 font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          >
            <span>{t.exploreDestinations}</span>
            <MapPin className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/70 border border-cyan-900/60 hover:border-cyan-500/60 transition-all duration-300 hover:bg-black/90 group"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-cyan-400/80 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer reassurance banner */}
      <div className="max-w-6xl mx-auto w-full mt-12 pt-6 border-t border-cyan-950/60 flex flex-col sm:flex-row items-center justify-between text-xs text-cyan-500/70 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Real-time Budget Guard: Guaranteed zero overspending recommendations</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-cyan-400" /> Live GPS Transit</span>
          <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-cyan-400" /> 100% Free Planner</span>
        </div>
      </div>
    </div>
  );
};
