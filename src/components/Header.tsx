import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown,
  Calculator,
  ArrowRight,
  Clock,
  HandHeart,
  TrendingUp,
  Sparkles,
  Layers
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
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(true);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 150);
  };

  const serviceSubItems = [
    {
      name: 'Financial Aid',
      href: '#financial-aid',
      description: 'Business, project, building & LPO contract grant assistance',
      icon: HandHeart,
      badge: 'Grants & Aid'
    },
    {
      name: 'Savings & Investments',
      href: '#investments-savings',
      description: 'Quantum Zenith cooperative high-yield savings & wealth building',
      icon: TrendingUp,
      badge: 'High Yield'
    },
    {
      name: 'All Financial Services',
      href: '#services',
      description: 'Overview of our complete cooperative financing solutions',
      icon: Layers,
      badge: 'Portfolio'
    }
  ];

  const standardNavLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Loans', href: '#loan-products' },
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
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-md border-2 border-yellow-400 group-hover:scale-105 transition-transform duration-200 bg-yellow-400">
                <img src="/logo.jpg" alt="SilverKuun Loans Logo" className="w-full h-full object-cover" />
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
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <a
                href="#"
                className="px-3 py-2 text-sm font-semibold text-zinc-800 hover:text-black hover:bg-yellow-400/20 rounded-lg transition-all duration-150"
              >
                Home
              </a>
              <a
                href="#about-us"
                className="px-3 py-2 text-sm font-semibold text-zinc-800 hover:text-black hover:bg-yellow-400/20 rounded-lg transition-all duration-150"
              >
                About Us
              </a>

              {/* Services with Sub-Menu Dropdown */}
              <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                    isServicesDropdownOpen 
                      ? 'text-black bg-yellow-400/30' 
                      : 'text-zinc-800 hover:text-black hover:bg-yellow-400/20'
                  }`}
                  aria-expanded={isServicesDropdownOpen}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180 text-black' : 'text-zinc-500'}`} />
                </button>

                {/* Dropdown Menu Card */}
                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-0 mt-1 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-zinc-200/90 p-2.5 z-50 backdrop-blur-lg"
                    >
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 px-3 py-1.5 border-b border-zinc-100 flex items-center justify-between">
                        <span>Cooperative Services</span>
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                      </div>

                      <div className="mt-1.5 space-y-1">
                        {serviceSubItems.map((subItem) => {
                          const IconComponent = subItem.icon;
                          return (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setIsServicesDropdownOpen(false)}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-yellow-50/80 transition-all duration-150 border border-transparent hover:border-yellow-200"
                            >
                              <div className="w-9 h-9 rounded-lg bg-yellow-100 group-hover:bg-yellow-400 flex items-center justify-center text-zinc-900 group-hover:text-black shrink-0 transition-colors shadow-xs">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-sm font-bold text-black group-hover:text-yellow-600 transition-colors">
                                    {subItem.name}
                                  </span>
                                  {subItem.badge && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-zinc-100 group-hover:bg-yellow-200 text-zinc-600 group-hover:text-black">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mt-0.5">
                                  {subItem.description}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>

                      <div className="mt-2 pt-2 border-t border-zinc-100 px-2 pb-1">
                        <a
                          href="#services"
                          onClick={() => setIsServicesDropdownOpen(false)}
                          className="text-xs font-bold text-yellow-600 hover:text-black flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-yellow-50 transition-colors"
                        >
                          <span>Explore All Solutions</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#loan-products"
                className="px-3 py-2 text-sm font-semibold text-zinc-800 hover:text-black hover:bg-yellow-400/20 rounded-lg transition-all duration-150"
              >
                Loans
              </a>
              <a
                href="#how-it-works"
                className="px-3 py-2 text-sm font-semibold text-zinc-800 hover:text-black hover:bg-yellow-400/20 rounded-lg transition-all duration-150"
              >
                How It Works
              </a>
              <a
                href="#contact"
                className="px-3 py-2 text-sm font-semibold text-zinc-800 hover:text-black hover:bg-yellow-400/20 rounded-lg transition-all duration-150"
              >
                Contact
              </a>
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
            className="lg:hidden bg-white border-b border-zinc-200 shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-1">
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-base font-semibold text-zinc-900 hover:text-black hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>

              <a
                href="#about-us"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-base font-semibold text-zinc-900 hover:text-black hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <span>About Us</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>

              {/* Mobile Services Accordion */}
              <div className="border border-zinc-100 rounded-xl bg-zinc-50/70 overflow-hidden my-1">
                <button
                  type="button"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 text-base font-bold text-zinc-900 hover:text-black"
                >
                  <span className="flex items-center gap-2">
                    <span>Services</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-black">
                      3 solutions
                    </span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 pb-2.5 pt-1 space-y-1.5 border-t border-zinc-100"
                    >
                      {serviceSubItems.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-lg bg-white border border-zinc-200/80 hover:bg-yellow-50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center text-black shrink-0">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-black">{item.name}</p>
                              <p className="text-[11px] text-zinc-500 truncate">{item.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-400" />
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#loan-products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-base font-semibold text-zinc-900 hover:text-black hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <span>Loans</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>

              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-base font-semibold text-zinc-900 hover:text-black hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <span>How It Works</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>

              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-base font-semibold text-zinc-900 hover:text-black hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <span>Contact</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>

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
