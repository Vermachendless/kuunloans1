import React from 'react';
import { 
  Layers, 
  FileText, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';

interface HowItWorksProps {
  onOpenApplicationModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenApplicationModal }) => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-black" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-black" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-black" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-black" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-black" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-black text-xs font-black uppercase tracking-wider mb-3 border border-yellow-400/50">
            <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
            <span>Simple 4-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-heading">
            How to Access SilverKuun Financial Solutions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600">
            A straightforward, transparent process designed to give you clarity and swift service every step of the way.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-zinc-50 rounded-2xl p-6 sm:p-7 border border-zinc-200 flex flex-col justify-between hover:border-black hover:bg-white hover:shadow-lg transition-all duration-200"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-zinc-300 font-heading">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-yellow-400 border border-yellow-500/40 shadow-xs flex items-center justify-center">
                    {getStepIcon(step.icon)}
                  </div>
                </div>

                <h3 className="text-lg font-black text-black font-heading mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress pill indicator */}
              <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-500">Phase {idx + 1} of 4</span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onOpenApplicationModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-base shadow-md active:scale-98 transition-all border border-yellow-500"
          >
            <span>Begin Application Online</span>
            <ArrowRight className="w-5 h-5 text-black" />
          </button>
          <p className="text-xs text-zinc-500 mt-3 font-medium">
            Takes less than 3 minutes to submit an initial inquiry
          </p>
        </div>

      </div>
    </section>
  );
};
