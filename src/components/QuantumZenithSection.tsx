import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  PiggyBank, 
  LineChart, 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  Lock
} from 'lucide-react';

interface QuantumZenithSectionProps {
  onOpenSavingsInquiry: () => void;
}

export const QuantumZenithSection: React.FC<QuantumZenithSectionProps> = ({ 
  onOpenSavingsInquiry 
}) => {
  return (
    <section id="investments-savings" className="py-20 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-zinc-50 rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-black text-xs font-black uppercase tracking-wider mb-4 border border-yellow-400/50">
                <TrendingUp className="w-3.5 h-3.5 text-yellow-600" />
                <span>Wealth Management & Fixed Savings</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-heading">
                High-Yield Cooperative Savings & Asset Management
              </h2>

              <p className="mt-4 text-base text-zinc-600 leading-relaxed">
                Grow your capital securely. In addition to our internal cooperative fixed savings programs, SilverKuun collaborates with <strong className="text-black font-black">Quantum Zenith Asset Management</strong> to provide our members with institutional-grade investment management, wealth preservation, and regulated treasury solutions.
              </p>

              {/* Verified Relationship Bullet Points */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-black">Cooperative Fixed Savings</h3>
                    <p className="text-xs text-zinc-600">Enjoy predictable, competitive yields with flexible lock-in periods designed for disciplined wealth creation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-xs">
                    <Building2 className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-black">Quantum Zenith Asset Management Access</h3>
                    <p className="text-xs text-zinc-600">Strategic partnership offering access to institutional treasury bills, money market funds, and regulated asset structures.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-xs">
                    <Lock className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-black">Security & Transparent Yield Reporting</h3>
                    <p className="text-xs text-zinc-600">Regular account statements and clear maturity timelines with zero hidden management deduction fees.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenSavingsInquiry}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm transition-colors shadow-md border border-yellow-500"
                >
                  <span>Inquire About Fixed Savings</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            {/* Right Card / Visual Breakdown */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200 shadow-md">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center shadow-xs">
                      <PiggyBank className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-black text-black text-sm">Savings Portfolio Plan</h3>
                      <p className="text-[11px] text-zinc-500">Cooperative Society Tier</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-black text-xs font-black">
                    High Yield
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Minimum Deposit
                    </span>
                    <span className="text-xl font-black text-black font-heading">
                      ₦50,000
                    </span>
                    <span className="text-[11px] text-zinc-500 block mt-0.5">Flexible monthly top-up options available</span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Tenure Options
                    </span>
                    <span className="text-sm font-bold text-zinc-800">
                      3 Months • 6 Months • 12 Months
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-100 text-black border border-zinc-200 text-xs flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-black mt-0.5 shrink-0" />
                    <span className="font-medium">
                      Funds managed under strict cooperative fiduciary guidelines and institutional custodianship.
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
