import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp,
  Heart,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO, OFFICE_LOCATIONS } from '../data/mockData';

interface FooterProps {
  onOpenApplicationModal: (loanType?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApplicationModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-zinc-400 text-sm border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md bg-yellow-400 border border-yellow-500">
                <img src="/logo.jpg" alt="SilverKuun Loans Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-black tracking-tight text-white font-heading">
                    SilverKuun
                  </span>
                  <span className="text-xl font-black tracking-tight text-yellow-400 font-heading">
                    Loans
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-bold text-zinc-400">
                  Cooperative Multipurpose Society Ltd
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              A trusted Nigerian cooperative organisation delivering low-interest loan products, IPPIS civil servant salary facilities, collateral financing, and structured financial aid with transparency and ethical excellence.
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium bg-zinc-900 p-3 rounded-xl border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>10+ Years of Cooperative Excellence in Nigeria</span>
            </div>
          </div>

          {/* Col 2: Loan Solutions */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
              Loan Products
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenApplicationModal('ippis')}
                  className="hover:text-yellow-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>IPPIS Civil Service Loan (₦5M)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenApplicationModal('collateral')}
                  className="hover:text-yellow-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Collateral-Backed Loan</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenApplicationModal('business')}
                  className="hover:text-yellow-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>SME & Business Capital</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenApplicationModal('personal')}
                  className="hover:text-yellow-400 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Personal Emergency Loans</span>
                </button>
              </li>
              <li>
                <a href="#loan-calculator" className="hover:text-yellow-400 transition-colors">
                  Repayment Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Financial Aid & Savings */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
              Financial Aid
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#financial-aid" className="hover:text-yellow-400 transition-colors">
                  Business Financing
                </a>
              </li>
              <li>
                <a href="#financial-aid" className="hover:text-yellow-400 transition-colors">
                  Project Financing
                </a>
              </li>
              <li>
                <a href="#financial-aid" className="hover:text-yellow-400 transition-colors">
                  Building Financing
                </a>
              </li>
              <li>
                <a href="#financial-aid" className="hover:text-yellow-400 transition-colors">
                  Contract / LPO Financing
                </a>
              </li>
              <li>
                <a href="#investments-savings" className="hover:text-yellow-400 transition-colors">
                  Quantum Zenith Savings
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Branches */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
              Headquarters & Offices
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200 block">Abuja (Utako District)</strong>
                  <span>Plot 418, Utako Commercial Hub, FCT</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200 block">Lagos (Ikoyi / Yaba)</strong>
                  <span>Awolowo Road, Ikoyi & Commercial Ave, Yaba</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <a href="tel:+2347015292816" className="text-zinc-300 hover:text-yellow-400">
                    +234 701 529 2816
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <a href="mailto:info@silverkuunloans.com" className="text-zinc-300 hover:text-yellow-400">
                    info@silverkuunloans.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Disclaimers & Copyright */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-center md:text-left text-zinc-500">
            <p>© {new Date().getFullYear()} SilverKuun Loans. Operating under SilverKuun Cooperative Multipurpose Society Limited.</p>
            <p className="mt-1 text-[11px]">
              All loans are subject to verified credit assessment and eligibility confirmation.
            </p>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <a href="#help" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#help" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
            <a href="#help" className="hover:text-yellow-400 transition-colors">Cooperative Bylaws</a>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-yellow-400 hover:text-black text-zinc-300 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
