import React from 'react';
import { 
  Banknote, 
  HandHeart, 
  TrendingUp, 
  Briefcase, 
  ArrowRight, 
  Check, 
  Sparkles
} from 'lucide-react';
import { FINANCIAL_SOLUTIONS } from '../data/mockData';

interface FinancialSolutionsProps {
  onOpenApplicationModal: (loanType?: string) => void;
  onExploreFinancialAid: () => void;
  onExploreSavings: () => void;
}

export const FinancialSolutions: React.FC<FinancialSolutionsProps> = ({
  onOpenApplicationModal,
  onExploreFinancialAid,
  onExploreSavings
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Banknote':
        return <Banknote className="w-6 h-6 text-black" />;
      case 'HandHeart':
        return <HandHeart className="w-6 h-6 text-black" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-black" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-black" />;
      default:
        return <Banknote className="w-6 h-6 text-black" />;
    }
  };

  const handleAction = (id: string) => {
    if (id === 'loans') {
      onOpenApplicationModal();
    } else if (id === 'financial-aid') {
      onExploreFinancialAid();
    } else if (id === 'savings-investment') {
      onExploreSavings();
    } else {
      onOpenApplicationModal('business');
    }
  };

  return (
    <section id="services" className="py-20 bg-white border-b border-zinc-200 relative">
      <div id="financial-solutions" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-black text-xs font-extrabold uppercase tracking-wider mb-3 border border-yellow-400/50">
            <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
            <span>Comprehensive Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-heading">
            Tailored Financial Solutions for Individuals & Businesses
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
            From flexible salary loans for public servants to strategic financing for large-scale projects and high-yield cooperative savings.
          </p>
        </div>

        {/* 3 Major Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FINANCIAL_SOLUTIONS.map((solution) => {
            return (
              <div
                key={solution.id}
                className="flex flex-col justify-between bg-zinc-50 rounded-2xl p-6 sm:p-7 border border-zinc-200 shadow-xs hover:border-black hover:bg-white hover:shadow-xl transition-all duration-200"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center shadow-xs">
                      {getIcon(solution.iconName)}
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white text-black border border-zinc-200">
                      {solution.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-black font-heading mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-zinc-200">
                    {solution.bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                        <Check className="w-3.5 h-3.5 text-yellow-500 mt-0.5 shrink-0" />
                        <span className="leading-tight font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-zinc-200">
                  <button
                    type="button"
                    onClick={() => handleAction(solution.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm transition-all bg-yellow-400 hover:bg-yellow-300 text-black border border-yellow-500/50 shadow-xs"
                  >
                    <span>{solution.actionText}</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
