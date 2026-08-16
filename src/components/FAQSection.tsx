import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles,
  Phone,
  MessageCircle
} from 'lucide-react';
import { FAQS } from '../data/mockData';

interface FAQSectionProps {
  onOpenQuickContact: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenQuickContact }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="help" className="py-20 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-black text-xs font-black uppercase tracking-wider mb-3 border border-yellow-400/50">
            <HelpCircle className="w-3.5 h-3.5 text-yellow-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-heading">
            Clear Answers to Your Financing Questions
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            Everything you need to know about our IPPIS loans, collateral facilities, documentation, and cooperative terms.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'ippis', label: 'IPPIS Loans' },
            { id: 'collateral', label: 'Collateral Facilities' },
            { id: 'financial_aid', label: 'Financial Aid' },
            { id: 'savings', label: 'Savings & Investments' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === tab.id
                  ? 'bg-yellow-400 text-black shadow-xs font-black'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-zinc-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-zinc-50 transition-colors"
                >
                  <span className="text-base font-black text-black pr-4 font-heading">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-yellow-400 text-black' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 bg-zinc-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-black shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-black">Have a specific question not listed here?</h4>
              <p className="text-xs text-zinc-600">Our credit officers in Abuja and Lagos are on standby to guide you.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenQuickContact}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs transition-colors border border-yellow-500 shadow-xs"
          >
            Speak with an Advisor
          </button>
        </div>

      </div>
    </section>
  );
};
