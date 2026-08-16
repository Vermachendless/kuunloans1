import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  TrendingUp, 
  Clock, 
  CreditCard,
  FileCheck2,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/mockData';

interface HeroProps {
  onOpenApplicationModal: (loanType?: string) => void;
  onExploreLoans: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApplicationModal, onExploreLoans }) => {
  return (
    <section className="relative overflow-hidden bg-black text-white pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
      {/* Background Decorative Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Top Cooperative Authority Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-yellow-400/50 text-yellow-400 text-xs font-bold mb-6 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>SilverKuun Cooperative Multipurpose Society Limited</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] font-heading">
              Accessible Financial Solutions,{' '}
              <span className="text-yellow-400">
                Low-Interest Loans
              </span>{' '}
              for Every Ambition.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Empowering Nigerian civil servants, entrepreneurs, and individuals with structured IPPIS salary loans up to ₦5,000,000, collateral-backed facilities, and dedicated financial aid programs—backed by over a decade of cooperative integrity.
            </p>

            {/* Key Pillars Checklist */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl text-sm text-zinc-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>IPPIS Loans up to ₦5M for Civil Servants</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Collateral Facilities with Asset Security</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Zero Hidden Charges & Transparent Rates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Direct Payroll or Cashflow Amortization</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                id="hero-unlock-loans-btn"
                onClick={() => onOpenApplicationModal()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-base shadow-lg shadow-yellow-500/20 active:scale-98 transition-all duration-150 border border-yellow-500/60"
              >
                <span>Unlock Loans</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </button>

              <button
                type="button"
                id="hero-explore-loans-btn"
                onClick={onExploreLoans}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base border border-zinc-700 transition-all duration-150"
              >
                <span>Explore Loans & Aid</span>
              </button>
            </div>

            {/* Trust Signals & Quick Stats */}
            <div className="mt-12 pt-8 border-t border-zinc-800 grid grid-cols-3 gap-4 sm:gap-8 w-full">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-heading">
                  10+
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-medium">
                  Years of Cooperative Trust
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-yellow-400 font-heading">
                  ₦5M
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-medium">
                  Max IPPIS Civil Service Loan
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-heading">
                  15k+
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-medium">
                  Satisfied Nigerian Members
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Card & Visual Presentation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Glass Container with Loan Highlights */}
            <div className="relative rounded-3xl bg-zinc-900/90 p-6 sm:p-8 border border-zinc-800 shadow-2xl backdrop-blur-xl">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center border border-yellow-400/30">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Instant Credit Access</h3>
                    <p className="text-xs text-zinc-400">Civil Servants & Enterprises</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold">
                  Active Disbursals
                </span>
              </div>

              {/* Product Quick Cards */}
              <div className="mt-5 space-y-3.5">
                
                {/* IPPIS Quick Box */}
                <div 
                  onClick={() => onOpenApplicationModal('ippis')}
                  className="p-4 rounded-xl bg-black/60 hover:bg-black border border-zinc-800 hover:border-yellow-400/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Federal Civil Service</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 font-semibold">Verified</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1 group-hover:text-yellow-400 transition-colors">
                        IPPIS Salary Loan (Up to ₦5,000,000)
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Direct monthly payroll deductions with flexible tenors up to 24 months.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </div>

                {/* Collateral Quick Box */}
                <div 
                  onClick={() => onOpenApplicationModal('collateral')}
                  className="p-4 rounded-xl bg-black/60 hover:bg-black border border-zinc-800 hover:border-yellow-400/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Asset-Backed</span>
                      <h4 className="text-sm font-bold text-white mt-1 group-hover:text-yellow-400 transition-colors">
                        Collateral Loan Facility
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Leverage property, cars, or commercial assets for high-value funding.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </div>

                {/* Financial Aid Quick Box */}
                <div 
                  onClick={() => onOpenApplicationModal('business')}
                  className="p-4 rounded-xl bg-black/60 hover:bg-black border border-zinc-800 hover:border-yellow-400/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Financial Aid</span>
                      <h4 className="text-sm font-bold text-white mt-1 group-hover:text-yellow-400 transition-colors">
                        Contract & Project Financing
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Liquidity to execute corporate contracts, LPOs, and building developments.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </div>

              </div>

              {/* Bottom Direct CTA in Hero Card */}
              <div className="mt-6 pt-5 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span>Prompt enquiry review</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenApplicationModal()}
                  className="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 group"
                >
                  <span>Start Application</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Floating Trust Pill */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 bg-white text-black p-3.5 rounded-2xl shadow-xl border border-zinc-200">
              <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-xs font-black text-black">Cooperative Society Member</p>
                <p className="text-[11px] text-zinc-600 font-medium">Regulated & Member-Owned</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
