import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface CTASectionProps {
  onOpenApplicationModal: () => void;
  onScrollToContact: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ 
  onOpenApplicationModal, 
  onScrollToContact 
}) => {
  return (
    <section className="py-20 sm:py-24 bg-black text-white relative overflow-hidden border-t border-yellow-400/30">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-yellow-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-yellow-400/50 text-yellow-400 text-xs font-black uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Take Action Today</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-heading max-w-3xl mx-auto leading-tight text-white">
          Ready to take the next step?
        </h2>

        <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Access low-interest credit tailored to your goals. Apply online now or speak with a SilverKuun credit advisor at our Abuja or Lagos offices.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            id="bottom-unlock-loans-cta"
            onClick={onOpenApplicationModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-base transition-all shadow-xl shadow-yellow-500/20 active:scale-98 border border-yellow-500"
          >
            <span>Unlock Loans</span>
            <ArrowRight className="w-5 h-5 text-black" />
          </button>

          <button
            type="button"
            onClick={onScrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base border border-zinc-700 transition-all"
          >
            <Phone className="w-4 h-4 text-yellow-400" />
            <span>Contact Us</span>
          </button>
        </div>

        {/* Verification Footer Text */}
        <div className="mt-10 pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>Licensed Cooperative Society</span>
          </span>
          <span>•</span>
          <span>Over 10 Years of Member Trust</span>
          <span>•</span>
          <span>Prompt Enquiry Feedback</span>
        </div>

      </div>
    </section>
  );
};
