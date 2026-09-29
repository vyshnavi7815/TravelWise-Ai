import React, { useState } from 'react';
import { Globe, ArrowRight, Check, Search } from 'lucide-react';
import { LanguageCode, LanguageOption } from '../types/travel';
import { SUPPORTED_LANGUAGES, getTranslation } from '../data/translations';

interface Step0LanguageProps {
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onContinue: () => void;
}

export const Step0Language: React.FC<Step0LanguageProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onContinue
}) => {
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const t = getTranslation(selectedLanguage);

  const mainLanguages = SUPPORTED_LANGUAGES.slice(0, 11);
  const additionalLanguages = SUPPORTED_LANGUAGES.slice(11);

  const filteredLanguages = (showMore ? SUPPORTED_LANGUAGES : mainLanguages).filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-4 cyan-glow-sm">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 0 · LOCALIZATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          {t.chooseLanguage}
        </h2>
        <p className="text-sm sm:text-base text-cyan-300/80 max-w-xl mx-auto">
          {t.chooseLanguageSubtitle}
        </p>
      </div>

      {/* Search Input if needed */}
      {showMore && (
        <div className="max-w-md mx-auto mb-6 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-500" />
          <input
            type="text"
            placeholder="Search language..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black border border-cyan-800 text-cyan-200 placeholder:text-cyan-700 text-sm focus:outline-none focus:border-cyan-400"
          />
        </div>
      )}

      {/* Language Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 mb-8">
        {filteredLanguages.map((lang: LanguageOption) => {
          const isSelected = selectedLanguage === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 relative group flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]'
                  : 'bg-black/70 border-cyan-900/60 hover:border-cyan-500/60 hover:bg-cyan-950/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{lang.flag}</span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <div className={`font-semibold text-sm ${isSelected ? 'text-cyan-200' : 'text-white'}`}>
                  {lang.name}
                </div>
                <div className="text-xs text-cyan-400/80 font-sans">
                  {lang.nativeName}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* More Languages Toggle */}
      {!showMore && additionalLanguages.length > 0 && (
        <div className="text-center mb-8">
          <button
            onClick={() => setShowMore(true)}
            className="text-xs font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
          >
            + {t.moreLanguages}
          </button>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={onContinue}
          className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all cyan-glow flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          <span>{t.continue}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
