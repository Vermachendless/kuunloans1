import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2,
  Headphones
} from 'lucide-react';
import { OFFICE_LOCATIONS, COMPANY_INFO } from '../data/mockData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Loan Inquiry',
    location: 'Abuja (Utako)',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-black text-xs font-black uppercase tracking-wider mb-3 border border-yellow-400/50">
            <Headphones className="w-3.5 h-3.5 text-yellow-600" />
            <span>Customer Care & Branch Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-heading">
            Connect with SilverKuun Loans
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600">
            Reach out via phone, email, or visit any of our physical branches in Abuja and Lagos for personalized financial advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contacts & Branch Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-zinc-50 p-6 sm:p-7 rounded-2xl border border-zinc-200 shadow-xs">
              <h3 className="text-xl font-black text-black font-heading mb-4">
                Direct Contact Channels
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
                    <Phone className="w-3.5 h-3.5 text-yellow-600" />
                    <span>Customer Hotlines</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {COMPANY_INFO.phones.map((phone, idx) => (
                      <a 
                        key={idx} 
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="block text-xs sm:text-sm font-bold text-black hover:text-yellow-600 transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
                    <Mail className="w-3.5 h-3.5 text-yellow-600" />
                    <span>Official Email Inquiries</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {COMPANY_INFO.emails.map((email, idx) => (
                      <a 
                        key={idx} 
                        href={`mailto:${email}`}
                        className="block text-xs sm:text-sm font-bold text-black hover:text-yellow-600 transition-colors break-all"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-yellow-400/20 text-black border border-yellow-400/40 text-xs flex items-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-black shrink-0" />
                <span>{COMPANY_INFO.workingHours} • 24/7 Digital Helpdesk</span>
              </div>
            </div>

            {/* Branch Locations List */}
            <div className="bg-zinc-50 p-6 sm:p-7 rounded-2xl border border-zinc-200 shadow-xs">
              <h3 className="text-lg font-black text-black font-heading mb-4 flex items-center justify-between">
                <span>Branch Network</span>
                <span className="text-xs font-bold text-zinc-500">Abuja & Lagos Offices</span>
              </h3>

              <div className="space-y-3">
                {OFFICE_LOCATIONS.map((loc, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-zinc-200 text-xs shadow-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-black flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-black" />
                        {loc.city} — {loc.district}
                      </span>
                      {loc.isMainBranch && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-yellow-400 text-black">
                          Main Branch
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-600 mb-1 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-yellow-600 mt-0.5 shrink-0" />
                      <span>{loc.address}</span>
                    </p>
                    <div className="flex items-center gap-4 text-zinc-500 pt-1 border-t border-zinc-100 mt-1.5 font-medium">
                      <span>Tel: {loc.phone}</span>
                      <span>•</span>
                      <span>{loc.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-zinc-50 p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-xs h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black text-black font-heading mb-1">
                  Send an Enquiry
                </h3>
                <p className="text-xs text-zinc-500 mb-6 font-medium">
                  Fill in your details below and a loan relationship officer will respond promptly.
                </p>

                {isSubmitted ? (
                  <div className="p-8 rounded-2xl bg-yellow-400/20 border border-yellow-400/50 text-center my-6">
                    <div className="w-12 h-12 rounded-full bg-black text-yellow-400 flex items-center justify-center mx-auto mb-3 shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-black text-black font-heading">
                      Enquiry Received!
                    </h4>
                    <p className="text-xs text-zinc-700 mt-2 max-w-sm mx-auto">
                      Thank you for contacting SilverKuun Loans. A financial officer will reach out to <strong className="text-black font-black">{formData.phone}</strong> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-5 px-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-800 text-xs font-bold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ibrahim Abubakar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0803 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                          Inquiry Type
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black"
                        >
                          <option value="IPPIS Civil Service Loan">IPPIS Civil Service Loan</option>
                          <option value="Collateral-Backed Loan">Collateral-Backed Loan</option>
                          <option value="Business & SME Loan">Business & SME Loan</option>
                          <option value="Contract / LPO Financing">Contract / LPO Financing</option>
                          <option value="Project & Building Financing">Project & Building Financing</option>
                          <option value="Savings & Investment Inquiry">Savings & Investment Inquiry</option>
                          <option value="General Information">General Information</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                          Preferred Office
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black"
                        >
                          <option value="Abuja (Utako)">Abuja (Utako District)</option>
                          <option value="Abuja (Mabushi)">Abuja (Mabushi)</option>
                          <option value="Abuja (Kubwa)">Abuja (Kubwa)</option>
                          <option value="Lagos (Ikoyi)">Lagos (Ikoyi)</option>
                          <option value="Lagos (Yaba)">Lagos (Yaba)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                        Your Message / Loan Request Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your required facility amount, timeline, or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm transition-colors shadow-md border border-yellow-500"
                    >
                      <Send className="w-4 h-4 text-black" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center gap-2 text-zinc-500 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-yellow-600 shrink-0" />
                <span>Your information is protected under strict cooperative confidentiality protocols.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
