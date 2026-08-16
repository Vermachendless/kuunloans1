import React, { useState, useId } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Info, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { LoanCategory } from '../types';

interface LoanCalculatorProps {
  initialCategory?: LoanCategory;
  onApplyWithPlan: (category: string, amount: number, tenure: number) => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ 
  initialCategory = 'ippis',
  onApplyWithPlan 
}) => {
  const [category, setCategory] = useState<LoanCategory>(initialCategory);
  const [amount, setAmount] = useState<number>(1000000);
  const [tenure, setTenure] = useState<number>(12);
  const amountSliderId = useId();
  const tenureSliderId = useId();

  // Category specific configurations & illustrative rate multipliers
  const categoryConfig: Record<LoanCategory, { maxAmount: number; minAmount: number; maxTenure: number; rate: number; name: string }> = {
    ippis: {
      name: 'IPPIS Civil Service Loan',
      minAmount: 100000,
      maxAmount: 5000000,
      maxTenure: 24,
      rate: 0.025 // 2.5% monthly cooperative interest benchmark
    },
    collateral: {
      name: 'Collateral-Backed Loan',
      minAmount: 500000,
      maxAmount: 15000000,
      maxTenure: 36,
      rate: 0.028 // 2.8%
    },
    business: {
      name: 'Business & SME Loan',
      minAmount: 200000,
      maxAmount: 10000000,
      maxTenure: 18,
      rate: 0.030 // 3.0%
    },
    personal: {
      name: 'Personal Emergency Loan',
      minAmount: 50000,
      maxAmount: 1500000,
      maxTenure: 12,
      rate: 0.032 // 3.2%
    }
  };

  const currentConfig = categoryConfig[category];

  // Adjust amount or tenure when category changes
  const handleCategoryChange = (newCat: LoanCategory) => {
    setCategory(newCat);
    const newConf = categoryConfig[newCat];
    if (amount > newConf.maxAmount) {
      setAmount(newConf.maxAmount);
    } else if (amount < newConf.minAmount) {
      setAmount(newConf.minAmount);
    }
    if (tenure > newConf.maxTenure) {
      setTenure(newConf.maxTenure);
    }
  };

  // Monthly installment calculation: simple amortized interest
  const totalInterest = amount * currentConfig.rate * tenure;
  const totalPayable = amount + totalInterest;
  const monthlyRepayment = Math.round(totalPayable / tenure);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(val).replace('NGN', '₦');
  };

  return (
    <section id="loan-calculator" className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-yellow-400/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3 border border-yellow-400/50">
            <Calculator className="w-3.5 h-3.5 text-yellow-400" />
            <span>Interactive Repayment Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-heading text-white">
            Calculate Your Estimated Monthly Repayment
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-400">
            Plan your financing with complete transparency. Select your facility type, loan amount, and preferred repayment tenor.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl backdrop-blur-md flex flex-col justify-between">
            
            <div>
              {/* Product Category Selector */}
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-3">
                1. Select Facility Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {(['ippis', 'collateral', 'business', 'personal'] as LoanCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      category === cat
                        ? 'bg-yellow-400 text-black shadow-md font-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    {cat === 'ippis' && 'IPPIS Loan'}
                    {cat === 'collateral' && 'Collateral'}
                    {cat === 'business' && 'Business'}
                    {cat === 'personal' && 'Personal'}
                  </button>
                ))}
              </div>

              {/* Amount Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={amountSliderId} className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    2. Loan Amount (₦)
                  </label>
                  <span className="text-xl font-black text-yellow-400 font-heading">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <input
                  id={amountSliderId}
                  type="range"
                  min={currentConfig.minAmount}
                  max={currentConfig.maxAmount}
                  step={category === 'ippis' ? 50000 : 100000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-hidden"
                />
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2 font-medium">
                  <span>Min: {formatCurrency(currentConfig.minAmount)}</span>
                  <span>Max: {formatCurrency(currentConfig.maxAmount)}</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={tenureSliderId} className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    3. Repayment Period (Months)
                  </label>
                  <span className="text-xl font-black text-yellow-400 font-heading">
                    {tenure} {tenure === 1 ? 'Month' : 'Months'}
                  </span>
                </div>
                <input
                  id={tenureSliderId}
                  type="range"
                  min={1}
                  max={currentConfig.maxTenure}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-hidden"
                />
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2 font-medium">
                  <span>1 Month</span>
                  <span>Max: {currentConfig.maxTenure} Months</span>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <span className="font-semibold text-zinc-300">Quick Tenor Presets:</span>
              <div className="flex items-center gap-1.5">
                {[3, 6, 12, 18, 24].filter(t => t <= currentConfig.maxTenure).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenure(t)}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                      tenure === t 
                        ? 'bg-yellow-400 text-black font-black' 
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {t}M
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results & Summary Card */}
          <div className="lg:col-span-5 bg-zinc-900 p-6 sm:p-8 rounded-3xl border-2 border-yellow-400/50 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-400 block">
                    Estimated Summary
                  </span>
                  <h3 className="text-base font-bold text-white font-heading">
                    {currentConfig.name}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4 text-black" />
                </div>
              </div>

              {/* Monthly Repayment Hero Block */}
              <div className="p-5 rounded-2xl bg-yellow-400 text-black mb-6 text-center border border-yellow-500 shadow-md">
                <span className="text-xs font-black uppercase tracking-wider text-black block mb-1">
                  Estimated Monthly Installment
                </span>
                <span className="text-3xl sm:text-4xl font-black text-black font-heading block">
                  {formatCurrency(monthlyRepayment)}
                </span>
                <span className="text-[11px] text-zinc-900 font-semibold mt-1 block">
                  {category === 'ippis' ? 'Via Direct IPPIS Salary Deduction' : 'Flexible Monthly Amortization'}
                </span>
              </div>

              {/* Breakdown Details */}
              <div className="space-y-3 text-xs mb-6">
                <div className="flex items-center justify-between text-zinc-300 py-1.5 border-b border-zinc-800">
                  <span>Principal Amount:</span>
                  <span className="font-bold text-white">{formatCurrency(amount)}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300 py-1.5 border-b border-zinc-800">
                  <span>Repayment Tenure:</span>
                  <span className="font-bold text-white">{tenure} Months</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300 py-1.5 border-b border-zinc-800">
                  <span>Total Estimated Repayment:</span>
                  <span className="font-black text-yellow-400">{formatCurrency(totalPayable)}</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 text-[11px] text-zinc-400 bg-black/60 p-3 rounded-xl border border-zinc-800 mb-6">
                <Info className="w-3.5 h-3.5 text-yellow-400 mt-0.5 shrink-0" />
                <span className="leading-tight">
                  Calculation provided for transparent planning. Final loan offer and exact schedule are confirmed upon verification by a credit officer.
                </span>
              </div>
            </div>

            {/* Apply with Plan CTA */}
            <button
              type="button"
              onClick={() => onApplyWithPlan(category, amount, tenure)}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm transition-colors shadow-lg border border-yellow-500"
            >
              <span>Apply with this Plan</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
