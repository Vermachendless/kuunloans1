import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight, 
  Calculator,
  ArrowRight,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenApplicationModal: (loanType?: string) => void;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenApplicationModal, onOpenCalculator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Services', href: '#services' },
    { name: 'Loans', href: '#loan-products' },
    { name: 'Financial Aid', href: '#financial-aid' },
    { name: 'Savings & Investments', href: '#investments-savings' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification & Quick Contact Bar */}
      <div className={`bg-black text-zinc-300 text-xs transition-all duration-300 border-b border-zinc-800 ${isScrolled ? 'hidden md:block py-1.5' : 'py-2.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-4 sm:gap-6 text-zinc-300">
            <span className="flex items-center gap-1.5 font-semibold text-yellow-400">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>SilverKuun Cooperative Multipurpose Society</span>
            </span>
            <span className="hidden sm:inline-block text-zinc-700">|</span>
            <a 
              href="tel:+2347015292816" 
              className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-yellow-400" />
              <span>+234 701 529 2816</span>
            </a>
            <a 
              href="mailto:info@silverkuunloans.com" 
              className="hidden lg:flex items-center gap-1.5 hover:text-yellow-400 transition-colors"
            >
              <Mail className="w-3 h-3 text-yellow-400" />
              <span>info@silverkuunloans.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span>Mon - Fri: 8am - 5pm</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-400 text-black text-[11px] font-bold">
              IPPIS Max: ₦5M
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-zinc-200' 
          : 'bg-white py-4 sm:py-5 border-b border-zinc-200/80 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black flex items-center justify-center shadow-md text-white border-2 border-yellow-400 group-hover:scale-105 transition-transform duration-200">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white flex items-center font-heading">
                  <span className="text-yellow-400">S</span>K
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-black font-heading">
                    SilverKuun
                  </span>
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-yellow-500 font-heading">
                    Loans
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-bold text-zinc-600">
                  Financial & Cooperative Services
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-semibold text-zinc-800 hover:text-black hover:bg-yellow-400/20 rounded-lg transition-all duration-150"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Header CTAs */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenCalculator}
                className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-zinc-300 text-black bg-white hover:bg-zinc-100 text-sm font-bold transition-colors shadow-xs"
              >
                <Calculator className="w-4 h-4 text-black" />
                <span>Calculate Repayment</span>
              </button>

              <button
                type="button"
                id="header-unlock-loans-cta"
                onClick={() => onOpenApplicationModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-black shadow-md active:scale-95 transition-all duration-150 border border-yellow-500/50"
              >
                <span>Unlock Loans</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden gap-2">
              <button
                type="button"
                onClick={() => onOpenApplicationModal()}
                className="px-3 py-1.5 rounded-lg bg-yellow-400 text-black text-xs font-black shadow-sm"
              >
                Unlock Loans
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-black hover:bg-zinc-100 focus:outline-hidden"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-black" />
                ) : (
                  <Menu className="w-6 h-6 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-white border-b border-zinc-200 shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-base font-semibold text-zinc-900 hover:text-black hover:bg-yellow-50 rounded-lg transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </a>
              ))}

              <div className="pt-4 border-t border-zinc-100 mt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCalculator();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-300 text-black bg-zinc-50 font-bold text-sm"
                >
                  <Calculator className="w-4 h-4 text-black" />
                  <span>Calculate Monthly Repayment</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenApplicationModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yellow-400 text-black font-black text-sm shadow-md"
                >
                  <span>Unlock Loans Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 mt-2 text-xs text-zinc-600 flex flex-col gap-1.5 border-t border-zinc-100">
                <p className="font-bold text-black">Need Immediate Assistance?</p>
                <a href="tel:+2347015292816" className="flex items-center gap-1.5 text-black font-bold">
                  <Phone className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Call: +234 701 529 2816</span>
                </a>
                <p className="text-zinc-500">Offices in Abuja (Utako, Mabushi, Kubwa) & Lagos</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
