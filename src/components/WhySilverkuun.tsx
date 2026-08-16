import React from 'react';
import { 
  ShieldCheck, 
  Eye, 
  CalendarClock, 
  UserCheck, 
  Lock, 
  MapPin, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WHY_SILVERKUUN_POINTS, COMPANY_INFO } from '../data/mockData';

interface WhySilverkuunProps {
  onOpenApplicationModal: () => void;
}

export const WhySilverkuun: React.FC<WhySilverkuunProps> = ({ onOpenApplicationModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-black" />;
      case 'Eye':
        return <Eye className="w-6 h-6 text-black" />;
      case 'CalendarClock':
        return <CalendarClock className="w-6 h-6 text-black" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-black" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-black" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-black" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-black" />;
    }
  };

  return (
    <section id="about-us" className="py-20 sm:py-24 bg-white border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-black text-xs font-black uppercase tracking-wider mb-3 border border-yellow-400/50">
            <Award className="w-3.5 h-3.5 text-yellow-600" />
            <span>Cooperative Trust & Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-heading">
            Why Thousands of Nigerians Trust SilverKuun
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
            As a licensed Cooperative Multipurpose Society operating for over 10 years, our foundational mission is genuine financial inclusion, mutual growth, and transparent stewardship.
          </p>
        </div>

        {/* 6 Grid Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_SILVERKUUN_POINTS.map((point, idx) => (
            <div
              key={idx}
              className="bg-zinc-50 rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-xs hover:shadow-lg hover:border-black hover:bg-white transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center mb-5 shadow-xs">
                  {getIcon(point.icon)}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-black font-heading mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition Callout Box */}
        <div className="mt-14 bg-black rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-yellow-400/40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Ethical Lending Commitment</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading leading-snug text-white">
              Responsible Financing That Protects Your Future
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
              We do not promote predatory debt or unmanageable borrowing. Every loan facility is structured with verified affordability assessments, clear repayment schedules, and dedicated advisory.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenApplicationModal}
            className="whitespace-nowrap px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm transition-colors shadow-md flex items-center gap-2 shrink-0 border border-yellow-500"
          >
            <span>Start Your Application</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

      </div>
    </section>
  );
};
