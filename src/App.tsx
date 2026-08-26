import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FinancialSolutions } from './components/FinancialSolutions';
import { LoanProducts } from './components/LoanProducts';
import { LoanCalculator } from './components/LoanCalculator';
import { WhySilverkuun } from './components/WhySilverkuun';
import { HowItWorks } from './components/HowItWorks';
import { FinancialAidSection } from './components/FinancialAidSection';
import { QuantumZenithSection } from './components/QuantumZenithSection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { LoanApplicationModal } from './components/LoanApplicationModal';
import { FinancialAidModal } from './components/FinancialAidModal';
import { FinancialAidCategory, LoanCategory } from './types';

export default function App() {
  // Modal states
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isFinancialAidModalOpen, setIsFinancialAidModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState<string>('ippis');
  const [selectedLoanAmount, setSelectedLoanAmount] = useState<number>(1000000);
  const [selectedLoanTenure, setSelectedLoanTenure] = useState<number>(12);
  const [selectedAidCategory, setSelectedAidCategory] = useState<FinancialAidCategory | undefined>(undefined);

  const handleOpenApplicationModal = (loanType?: string) => {
    if (loanType) {
      setSelectedLoanType(loanType);
    } else {
      setSelectedLoanType('ippis');
    }
    setIsApplicationModalOpen(true);
  };

  const handleApplyWithPlan = (category: string, amount: number, tenure: number) => {
    setSelectedLoanType(category);
    setSelectedLoanAmount(amount);
    setSelectedLoanTenure(tenure);
    setIsApplicationModalOpen(true);
  };

  const handleOpenFinancialAidModal = (category?: FinancialAidCategory) => {
    setSelectedAidCategory(category);
    setIsFinancialAidModalOpen(true);
  };

  const smoothScrollToElement = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 80;
      const elementRect = el.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const targetScrollTop = Math.max(0, absoluteElementTop - headerHeight - 16);

      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  };

  const scrollToCalculator = () => smoothScrollToElement('loan-calculator');
  const scrollToLoans = () => smoothScrollToElement('loan-products');
  const scrollToFinancialAid = () => smoothScrollToElement('financial-aid');
  const scrollToSavings = () => smoothScrollToElement('investments-savings');
  const scrollToContact = () => smoothScrollToElement('contact');

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-black selection:bg-yellow-400 selection:text-black">
      {/* Header */}
      <Header 
        onOpenApplicationModal={handleOpenApplicationModal}
        onOpenCalculator={scrollToCalculator}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero 
          onOpenApplicationModal={handleOpenApplicationModal}
          onExploreLoans={scrollToLoans}
        />

        {/* 2. Financial Solutions Overview */}
        <FinancialSolutions 
          onOpenApplicationModal={handleOpenApplicationModal}
          onExploreFinancialAid={scrollToFinancialAid}
          onExploreSavings={scrollToSavings}
        />

        {/* 3. Loan Products */}
        <LoanProducts 
          onOpenApplicationModal={handleOpenApplicationModal}
          onOpenCalculatorWithCategory={(cat: LoanCategory) => {
            setSelectedLoanType(cat);
            scrollToCalculator();
          }}
        />

        {/* 4. Interactive Loan Repayment Calculator */}
        <LoanCalculator 
          initialCategory={selectedLoanType as LoanCategory || 'ippis'}
          onApplyWithPlan={handleApplyWithPlan}
        />

        {/* 5. Why SilverKuun (Trust & Cooperative Heritage) */}
        <WhySilverkuun 
          onOpenApplicationModal={() => handleOpenApplicationModal('ippis')}
        />

        {/* 6. How It Works (4-Step Process) */}
        <HowItWorks 
          onOpenApplicationModal={() => handleOpenApplicationModal('ippis')}
        />

        {/* 7. Financial Aid (Business, Project, Building, Contract Financing) */}
        <FinancialAidSection 
          onOpenFinancialAidModal={handleOpenFinancialAidModal}
        />

        {/* 8. Quantum Zenith & Savings Partnership (Wealth Management & Fixed Savings) */}
        {/* <QuantumZenithSection 
          onOpenSavingsInquiry={scrollToContact}
        /> */}

        {/* 9. Testimonials & Member Stories */}
        <Testimonials />

        {/* 10. Frequently Asked Questions */}
        <FAQSection 
          onOpenQuickContact={scrollToContact}
        />

        {/* 11. Branch Network & Contact Channels */}
        <ContactSection />

        {/* 12. Final CTA Banner */}
        <CTASection 
          onOpenApplicationModal={() => handleOpenApplicationModal('ippis')}
          onScrollToContact={scrollToContact}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenApplicationModal={handleOpenApplicationModal}
      />

      {/* Interactive Modals */}
      <LoanApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        initialLoanType={selectedLoanType}
        initialAmount={selectedLoanAmount}
        initialTenure={selectedLoanTenure}
      />

      <FinancialAidModal
        isOpen={isFinancialAidModalOpen}
        onClose={() => setIsFinancialAidModalOpen(false)}
        selectedCategory={selectedAidCategory}
      />
    </div>
  );
}
