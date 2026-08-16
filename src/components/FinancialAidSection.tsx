import React from 'react';
import { 
  Store, 
  HardHat, 
  Building2, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { FINANCIAL_AID_CATEGORIES } from '../data/mockData';
import { FinancialAidCategory } from '../types';

interface FinancialAidSectionProps {
  onOpenFinancialAidModal: (category?: FinancialAidCategory) => void;
}

export const FinancialAidSection: React.FC<FinancialAidSectionProps> = ({ 
  onOpenFinancialAidModal 
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store':
        return <Store className="w-6 h-6 text-black" />;
      case 'HardHat':
        return <HardHat className="w-6 h-6 text-black" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-black" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-black" />;
      default:
        return <Store className="w-6 h-6 text-black" />;
    }
  };

  return (
    <section id="financial-aid" className="py-20 sm:py-24 bg-black text-white relative overflow-hidden">
      {/* Subtle background gradient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-yellow-400 text-xs font-black uppercase tracking-wider mb-3 border border-yellow-400/50">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Specialized Capital Support</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-heading text-white">
              SilverKuun Financial Aid & Structured Financing
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-300">
              Targeted financial assistance programs engineered to support enterprises, contractors, and builders across Nigeria.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenFinancialAidModal()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm transition-colors shadow-lg shadow-yellow-500/20 whitespace-nowrap self-start md:self-auto border border-yellow-500"
          >
            <span>Explore Financial Aid</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* 4 Aid Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FINANCIAL_AID_CATEGORIES.map((aid) => (
            <div
              key={aid.id}
              className="bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800 flex flex-col justify-between hover:border-yellow-400/60 transition-all duration-200 backdrop-blur-xs"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center border border-yellow-500 shadow-xs">
                    {getIcon(aid.iconName)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                    {aid.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white font-heading mb-2">
                  {aid.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {aid.description}
                </p>

                {/* Scope Box */}
                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Coverage & Scope
                  </span>
                  <p className="text-xs text-zinc-200">
                    {aid.scope}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Program Benefits
                  </span>
                  {aid.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Eligibility note */}
                <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-400">
                  <strong className="text-zinc-300">Eligibility requirement:</strong> {aid.eligibility}
                </div>
              </div>

              {/* Card Action */}
              <div className="mt-8 pt-5 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => onOpenFinancialAidModal(aid)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-yellow-400 hover:text-black text-white font-bold text-sm transition-all border border-zinc-700"
                >
                  <span>Apply for {aid.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
