import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Building2, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ApplicationFormData } from '../types';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLoanType?: string;
  initialAmount?: number;
  initialTenure?: number;
}

export const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({
  isOpen,
  onClose,
  initialLoanType = 'ippis',
  initialAmount = 1000000,
  initialTenure = 12
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ApplicationFormData>({
    loanType: initialLoanType,
    requestedAmount: initialAmount,
    tenureMonths: initialTenure,
    fullName: '',
    email: '',
    phone: '',
    state: 'FCT Abuja',
    city: 'Abuja Municipal',
    employmentType: initialLoanType === 'ippis' ? 'civil_servant' : 'private_sector',
    ippisNumber: '',
    ministryDepartmentAgency: '',
    collateralDescription: '',
    purpose: '',
    agreedToTerms: false
  });

  const [applicationRef, setApplicationRef] = useState<string>('');

  // Lock background body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      if (!formData.requestedAmount || formData.requestedAmount <= 0) return;
      setStep(2);
    } else if (step === 2) {
      if (!formData.fullName || !formData.phone) return;
      setStep(3);
    } else if (step === 3) {
      if (!formData.agreedToTerms) return;
      // Generate reference
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const ref = `SKL-${new Date().getFullYear()}-${randomNum}`;
      setApplicationRef(ref);
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetAndClose = () => {
    setStep(1);
    setApplicationRef('');
    onClose();
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(val).replace('NGN', '₦');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-2xl max-h-[calc(100dvh-24px)] sm:max-h-[calc(100dvh-40px)] md:max-h-[min(90vh,820px)] rounded-3xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden relative"
      >
        {/* Modal Header (Non-scrolling / Sticky at top) */}
        <div className="shrink-0 bg-black text-white p-5 sm:p-6 md:p-7 flex items-center justify-between border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>SilverKuun Secure Application Portal</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
              {step === 4 ? 'Application Received' : 'Unlock Your Loan Facility'}
            </h3>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 3, Non-scrolling) */}
        {step < 4 && (
          <div className="shrink-0 bg-zinc-50 px-5 sm:px-7 py-3 border-b border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
            <span className="font-bold text-black">
              Step {step} of 3:{' '}
              {step === 1 && 'Facility & Amount'}
              {step === 2 && 'Personal Contact Details'}
              {step === 3 && 'Employment & Eligibility Verification'}
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full ${
                    i <= step ? 'bg-yellow-400' : 'bg-zinc-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Body (Scrollable Form Content Area) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 md:p-8 overscroll-contain">
          
          {/* STEP 1: Facility Selection & Amount */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                  Select Loan Facility
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'ippis', name: 'IPPIS Civil Service Loan', desc: 'Up to ₦5M for Federal MDA staff' },
                    { id: 'collateral', name: 'Collateral-Backed Loan', desc: 'Car or real estate asset security' },
                    { id: 'business', name: 'SME & Business Loan', desc: 'Working capital for registered MSMEs' },
                    { id: 'personal', name: 'Personal Emergency Loan', desc: 'Quick funds for urgent expenses' }
                  ].map((facility) => (
                    <div
                      key={facility.id}
                      onClick={() => setFormData({ ...formData, loanType: facility.id })}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.loanType === facility.id
                          ? 'border-yellow-400 bg-yellow-400/20'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <span className="text-sm font-black text-black block font-heading">
                        {facility.name}
                      </span>
                      <span className="text-xs text-zinc-500 block mt-0.5 font-medium">
                        {facility.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Requested Amount (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">₦</span>
                  <input
                    type="number"
                    min={50000}
                    max={15000000}
                    step={50000}
                    value={formData.requestedAmount}
                    onChange={(e) => setFormData({ ...formData, requestedAmount: Number(e.target.value) })}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-zinc-300 font-black text-black text-lg focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {[500000, 1000000, 2000000, 3500000, 5000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFormData({ ...formData, requestedAmount: preset })}
                      className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-zinc-100 text-black hover:bg-yellow-400/40 border border-zinc-200 transition-colors"
                    >
                      {formatCurrency(preset)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Repayment Tenure: <span className="font-black text-black">{formData.tenureMonths} Months</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={formData.loanType === 'ippis' ? 24 : 36}
                  value={formData.tenureMonths}
                  onChange={(e) => setFormData({ ...formData, tenureMonths: Number(e.target.value) })}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-medium">
                  <span>1 Month</span>
                  <span>{formData.loanType === 'ippis' ? '24 Months Max (IPPIS)' : '36 Months Max'}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Primary Purpose of Loan
                </label>
                <input
                  type="text"
                  placeholder="e.g. Home Improvement, School Fees, Business Inventory"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Personal Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="As it appears on your official BVN / ID"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Phone Number (WhatsApp Active) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0803 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    State of Residence
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black"
                  >
                    <option value="FCT Abuja">FCT Abuja</option>
                    <option value="Lagos State">Lagos State</option>
                    <option value="Kaduna State">Kaduna State</option>
                    <option value="Kano State">Kano State</option>
                    <option value="Rivers State">Rivers State</option>
                    <option value="Oyo State">Oyo State</option>
                    <option value="Enugu State">Enugu State</option>
                    <option value="Other State">Other State in Nigeria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Town / District
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Utako, Garki, Ikeja, Yaba"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Employment / Verification */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Employment / Sector Status
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black"
                >
                  <option value="civil_servant">Federal Civil Servant (IPPIS Enrolled)</option>
                  <option value="private_sector">Private Sector Professional</option>
                  <option value="business_owner">Business Owner / Entrepreneur (MSME)</option>
                  <option value="contractor">Contractor / Vendor</option>
                  <option value="other">Self-Employed / Other</option>
                </select>
              </div>

              {/* Conditional fields based on employment type */}
              {formData.employmentType === 'civil_servant' && (
                <div className="p-4 rounded-2xl bg-yellow-400/20 border border-yellow-400/50 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-black text-black">
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>IPPIS Verification Details</span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                      IPPIS Number (Optional for Initial Check)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 123456"
                      value={formData.ippisNumber}
                      onChange={(e) => setFormData({ ...formData, ippisNumber: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                      Ministry, Department or Agency (MDA)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Federal Ministry of Health"
                      value={formData.ministryDepartmentAgency}
                      onChange={(e) => setFormData({ ...formData, ministryDepartmentAgency: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black"
                    />
                  </div>
                </div>
              )}

              {formData.loanType === 'collateral' && (
                <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-200 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-black">
                    Collateral Asset Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2018 Toyota Camry (Customs Cleared) or Titled Property in Abuja"
                    value={formData.collateralDescription}
                    onChange={(e) => setFormData({ ...formData, collateralDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black"
                  />
                </div>
              )}

              {/* Agreement checkbox */}
              <div className="pt-3 border-t border-zinc-200">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-700 font-medium">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="w-4 h-4 text-black rounded mt-0.5 border-zinc-300 focus:ring-black accent-yellow-400"
                  />
                  <span>
                    I confirm that the details provided are genuine, and I authorize SilverKuun Cooperative Multipurpose Society credit officers to contact me and verify my eligibility.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Success / Confirmation */}
          {step === 4 && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-black font-heading">
                  Application Submitted Successfully!
                </h4>
                <p className="text-sm text-zinc-600 mt-1">
                  Your loan pre-qualification request is now in queue with our credit officers.
                </p>
              </div>

              {/* Reference Card */}
              <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                  <span className="text-zinc-500 font-medium">Tracking Reference:</span>
                  <span className="font-mono font-black text-black text-sm">{applicationRef}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 font-medium">Facility Type:</span>
                  <span className="font-bold text-black uppercase">{formData.loanType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 font-medium">Amount:</span>
                  <span className="font-black text-black">{formatCurrency(formData.requestedAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 font-medium">Applicant:</span>
                  <span className="font-bold text-black">{formData.fullName} ({formData.phone})</span>
                </div>
              </div>

              {/* Important Advisory */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-yellow-400/40 text-zinc-300 text-xs text-left flex items-start gap-2.5 max-w-md mx-auto">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-white">Security Advisory:</strong> SilverKuun Loans never asks for cash deposits to private personal accounts before assessment. Official correspondence comes strictly from our verified hotlines and domain emails.
                </span>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-8 py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-black text-sm transition-colors shadow-md"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (Steps 1 to 3, Non-scrolling pinned at bottom) */}
        {step < 4 && (
          <div className="shrink-0 bg-zinc-50 p-4 sm:p-5 md:p-6 border-t border-zinc-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 text-black hover:bg-zinc-100 font-bold text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={step === 3 && !formData.agreedToTerms}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all shadow-md ${
                step === 3 && !formData.agreedToTerms
                  ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                  : 'bg-yellow-400 hover:bg-yellow-300 text-black border border-yellow-500'
              }`}
            >
              <span>{step === 3 ? 'Submit Application' : 'Proceed to Next Step'}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
