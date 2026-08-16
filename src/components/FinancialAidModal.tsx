import React, { useState } from 'react';
import { 
  X, 
  HandHeart, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Building2, 
  FileCheck2,
  HardHat,
  Store
} from 'lucide-react';
import { motion } from 'motion/react';
import { FinancialAidCategory } from '../types';

interface FinancialAidModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory?: FinancialAidCategory;
}

export const FinancialAidModal: React.FC<FinancialAidModalProps> = ({
  isOpen,
  onClose,
  selectedCategory
}) => {
  const [category, setCategory] = useState<string>(
    selectedCategory?.id || 'business-financing'
  );
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectValue, setProjectValue] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-black text-white p-6 sm:p-7 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center border border-yellow-500 shadow-md">
              <HandHeart className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-yellow-400 block">
                Structured Capital Support
              </span>
              <h3 className="text-xl font-black font-heading text-white">
                Financial Aid Application
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-black font-heading">
                Financial Aid Enquiry Received
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto">
                Thank you, <strong className="text-black font-black">{name}</strong>. A corporate financing manager from SilverKuun will review your project parameters and reach out within 24 hours.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Financing Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black"
                >
                  <option value="business-financing">Business Financing & Working Capital</option>
                  <option value="project-financing">Project Financing (Milestone Based)</option>
                  <option value="building-financing">Building & Real Estate Development Financing</option>
                  <option value="contract-financing">Contract / Local Purchase Order (LPO) Financing</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Registered Business / Entity
                  </label>
                  <input
                    type="text"
                    placeholder="Company or Enterprise Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                    Estimated Capital Required (₦)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₦10,000,000"
                    value={projectValue}
                    onChange={(e) => setProjectValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Brief Project or Contract Scope
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline the nature of the project, contract issuance, delivery timeline, or supply details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm transition-colors shadow-md border border-yellow-500"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Submit Financial Aid Request</span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
