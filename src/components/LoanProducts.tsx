import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Sparkles,
  HelpCircle,
  Clock,
  Banknote,
  Sliders
} from 'lucide-react';
import { LOAN_PRODUCTS } from '../data/mockData';
import { LoanProduct, LoanCategory } from '../types';

interface LoanProductsProps {
  onOpenApplicationModal: (loanType?: string) => void;
  onOpenCalculatorWithCategory?: (category: LoanCategory) => void;
}

export const LoanProducts: React.FC<LoanProductsProps> = ({ 
  onOpenApplicationModal,
  onOpenCalculatorWithCategory 
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | LoanCategory>('all');

  const filteredProducts = activeFilter === 'all' 
    ? LOAN_PRODUCTS 
    : LOAN_PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <section id="loan-products" className="py-20 sm:py-24 bg-white relative">
      <div id="loans" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-black text-xs font-bold uppercase tracking-wider mb-3 border border-yellow-400/50">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-600" />
              <span>Verified Credit Facilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-heading">
              Flexible Loan Products Built Around You
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600">
              Explore our core credit solutions designed with competitive rates, flexible repayment structures, and straightforward terms.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'ippis', label: 'IPPIS Civil Service' },
              { id: 'collateral', label: 'Collateral' },
              { id: 'business', label: 'Business & SME' },
              { id: 'personal', label: 'Personal' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 ${
                  activeFilter === tab.id
                    ? 'bg-black text-yellow-400 shadow-sm border border-black'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-yellow-400/20 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loan Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-200 ${
                product.popular
                  ? 'bg-white border-2 border-yellow-400 shadow-xl'
                  : 'bg-zinc-50 border border-zinc-200 shadow-xs hover:shadow-md hover:border-black'
              }`}
            >
              {/* Product Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  product.popular
                    ? 'bg-yellow-400 text-black shadow-xs'
                    : 'bg-zinc-200 text-zinc-800'
                }`}>
                  {product.badge}
                </span>

                <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Tenure: {product.maxTenure}</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl font-black text-black font-heading">
                  {product.name}
                </h3>
                <p className="text-xs font-bold text-yellow-600 mt-1 mb-3">
                  {product.tagline}
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Key Spec Box */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-zinc-200 mb-6 shadow-2xs">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Maximum Amount
                    </span>
                    <span className="text-base sm:text-lg font-black text-black font-heading">
                      {product.maxAmount}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Target Eligibility
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-700 line-clamp-1">
                      {product.targetAudience}
                    </span>
                  </div>
                </div>

                {/* Verified Highlights */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                    <span>Product Highlights</span>
                  </h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700">
                        <CheckCircle2 className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements accordion/preview */}
                <div className="pt-4 border-t border-zinc-200 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Key Requirements</span>
                  </h4>
                  <div className="space-y-1.5 text-xs text-zinc-600">
                    {product.requirements.slice(0, 2).map((req, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                    {product.requirements.length > 2 && (
                      <p className="text-[11px] text-zinc-900 font-bold pl-3.5">
                        + {product.requirements.length - 2} more verification items
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenApplicationModal(product.category)}
                  className={`w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-black text-sm transition-all shadow-sm ${
                    product.popular
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-black border border-yellow-500/60'
                      : 'bg-black hover:bg-zinc-800 text-white'
                  }`}
                >
                  <span>{product.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenCalculatorWithCategory && (
                  <button
                    type="button"
                    onClick={() => onOpenCalculatorWithCategory(product.category)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-black text-xs font-bold transition-colors"
                    title="Estimate monthly repayment"
                  >
                    <Sliders className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Calculate</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Civil Service / Notice Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-black text-white border border-yellow-400/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center shrink-0 text-black">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Are You an IPPIS-Enrolled Civil Servant?</h4>
              <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                Enjoy hassle-free documentation, rapid processing, and direct payroll deductions up to ₦5,000,000.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenApplicationModal('ippis')}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm transition-colors shadow-md border border-yellow-500"
          >
            Apply for IPPIS Loan
          </button>
        </div>

      </div>
    </section>
  );
};
