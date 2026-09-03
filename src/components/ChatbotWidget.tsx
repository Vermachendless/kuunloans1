import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  ShieldAlert, 
  PhoneCall, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ChevronRight, 
  RefreshCw,
  Clock,
  HelpCircle,
  CreditCard,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { getSanityLoanProducts, submitContactEnquiry } from '../lib/sanity';
import { LOAN_PRODUCTS, COMPANY_INFO, FAQS, PROCESS_STEPS } from '../data/mockData';
import { LoanProduct } from '../types';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'system';
  text: string;
  timestamp: string;
  isEscalationPrompt?: boolean;
  escalationTrigger?: string;
  quickReplies?: Array<{ label: string; action: () => void }>;
}

const ESCALATION_KEYWORDS = [
  'agent',
  'admin',
  'human',
  'speak to someone',
  'call me',
  'contact me',
  'complaint',
  'urgent',
  'problem',
  'help me',
  'representative',
  'fraud',
  'scam',
  'payment problem',
  'application problem',
  'application failed',
  'not received',
  'wrong amount',
  'speak to admin',
  'talk to admin',
  'manager',
  'dispute',
  'emergency assistance'
];

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>(LOAN_PRODUCTS);

  // Escalation form modal state inside widget
  const [isEscalating, setIsEscalating] = useState(false);
  const [escalationReason, setEscalationReason] = useState<string>('');
  const [escalationForm, setEscalationForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmittingEscalation, setIsSubmittingEscalation] = useState(false);
  const [escalationSuccess, setEscalationSuccess] = useState(false);
  const [escalationError, setEscalationError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch live loan products from Sanity on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const liveProducts = await getSanityLoanProducts();
        if (liveProducts && liveProducts.length > 0) {
          setLoanProducts(liveProducts);
        }
      } catch (err) {
        // Fallback to mockData LOAN_PRODUCTS
      }
    }
    loadProducts();
  }, []);

  // Initialize greeting on first open
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'msg-greeting',
        sender: 'bot',
        text: 'Hello! 👋 How can I help you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: [
          { label: '💳 Loan Products', action: () => handleSelectOption('Loan Products') },
          { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
          { label: '📋 Requirements', action: () => handleSelectOption('Requirements') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('User selected Talk to Admin') },
        ]
      };
      setMessages([initialGreeting]);
    }
  }, [messages.length]);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const addMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMsg]);
    if (!isOpen) {
      setHasUnread(true);
    }
  };

  // Check if text triggers admin escalation
  const detectEscalationKeyword = (text: string): string | null => {
    const lower = text.toLowerCase();
    for (const kw of ESCALATION_KEYWORDS) {
      if (lower.includes(kw)) {
        return kw;
      }
    }
    return null;
  };

  // Handle user sending text message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    // Add user message
    addMessage({ sender: 'user', text });
    setInputText('');

    // Check escalation keywords
    const matchedKw = detectEscalationKeyword(text);
    if (matchedKw) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({
          sender: 'bot',
          text: 'This may require assistance from our administration team. Would you like me to send your message to an administrator?',
          isEscalationPrompt: true,
          escalationTrigger: `Keyword detected: "${matchedKw}"`
        });
      }, 600);
      return;
    }

    // Process automated answers
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const answer = generateAutomatedAnswer(text);
      addMessage({
        sender: 'bot',
        text: answer.text,
        quickReplies: answer.quickReplies
      });
    }, 700);
  };

  // Generate automated answers based on knowledge base & Sanity products
  const generateAutomatedAnswer = (query: string): { text: string; quickReplies?: Array<{ label: string; action: () => void }> } => {
    const q = query.toLowerCase();

    // 1. Loan Products Query
    if (q.includes('loan product') || q.includes('offer') || q.includes('types of loan') || q.includes('facilities') || q.includes('packages')) {
      const productLines = loanProducts.map((p, idx) => 
        `• **${p.name}** (${p.badge || 'Facility'}): ${p.maxAmount}, tenure ${p.maxTenure}.`
      ).join('\n');

      return {
        text: `KuunLoans provides structured, low-interest credit facilities tailored for Nigerian individuals and enterprises:\n\n${productLines}\n\nWould you like to know the requirements or how to apply for any of these?`,
        quickReplies: [
          { label: '📋 Requirements', action: () => handleSelectOption('Requirements') },
          { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('Loan product inquiry') },
        ]
      };
    }

    // 2. How to Apply Query
    if (q.includes('how to apply') || q.includes('how do i apply') || q.includes('application process') || q.includes('apply')) {
      const stepsText = PROCESS_STEPS.map((s) => `**Step ${s.step}: ${s.title}** — ${s.description}`).join('\n\n');
      return {
        text: `Applying with SilverKuun Loans is straightforward and 100% digital:\n\n${stepsText}\n\nYou can start directly by clicking "Apply for Loan" on the website navigation or selecting your preferred loan product above!`,
        quickReplies: [
          { label: '💳 Loan Products', action: () => handleSelectOption('Loan Products') },
          { label: '📄 Documents Needed', action: () => handleSelectOption('What documents do I need?') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('Application inquiry') },
        ]
      };
    }

    // 3. Requirements / Documents Needed
    if (q.includes('requirement') || q.includes('document') || q.includes('need') || q.includes('eligible') || q.includes('eligibility')) {
      return {
        text: `Here are the general requirements for SilverKuun loan facilities:\n\n` +
          `• **IPPIS Civil Service Loans**: Active Federal Civil Service appointment, confirmed IPPIS number, and 3 recent verifiable payslips.\n\n` +
          `• **Collateral-Backed Loans**: Valid Government-issued ID, proof of asset ownership (Vehicle documents / Land C of O / R of O), and inspection/valuation report.\n\n` +
          `• **SME / Business Loans**: CAC business registration certificate, 6 months bank statement, and tax identification.\n\n` +
          `• **Contract / LPO Financing**: Verified Purchase Order or awarded corporate contract letter.`,
        quickReplies: [
          { label: '⏱️ Approval Timeline', action: () => handleSelectOption('How long does approval take?') },
          { label: '💳 Loan Products', action: () => handleSelectOption('Loan Products') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('Requirements inquiry') },
        ]
      };
    }

    // 4. Approval Timeline
    if (q.includes('how long') || q.includes('time') || q.includes('duration') || q.includes('timeline') || q.includes('disbursement') || q.includes('fast') || q.includes('approval')) {
      return {
        text: `**Approval & Disbursement Timeline**:\n\n` +
          `• **IPPIS Civil Service Loans**: Typically reviewed, verified, and disbursed within **24 to 48 hours** upon document submission.\n` +
          `• **Collateral Facilities**: **24 to 72 hours**, following asset physical verification and documentation.\n` +
          `• **Business & Project Financing**: 3 to 5 business days depending on facility evaluation.`,
        quickReplies: [
          { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('Timeline inquiry') },
        ]
      };
    }

    // 5. Contact Channels & Branches
    if (q.includes('contact') || q.includes('branch') || q.includes('office') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('location')) {
      return {
        text: `**Official SilverKuun Contact Channels**:\n\n` +
          `📞 **Hotlines**: ${COMPANY_INFO.phones.join(' • ')}\n` +
          `✉️ **Email**: ${COMPANY_INFO.emails.join(' • ')}\n` +
          `⏰ **Hours**: ${COMPANY_INFO.workingHours}\n\n` +
          `📍 **Main Abuja Branch**: Plot 418, Utako Commercial Hub, FCT Abuja\n` +
          `📍 **Lagos Branch**: Awolowo Road, Ikoyi & Commercial Ave, Yaba\n\n` +
          `Would you like to speak directly with an officer?`,
        quickReplies: [
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('Contact details request') },
          { label: '💳 Loan Products', action: () => handleSelectOption('Loan Products') },
        ]
      };
    }

    // 6. Borrowing Limits / How much can I borrow
    if (q.includes('how much') || q.includes('borrow') || q.includes('limit') || q.includes('max amount')) {
      return {
        text: `Here are the borrowing limits for KuunLoans facilities:\n\n` +
          `• **IPPIS Civil Service Loan**: Up to ₦5,000,000 (subject to monthly take-home salary and statutory debt-service ratios).\n` +
          `• **Collateral-Backed Loan**: Asset-dependent (up to 70% – 80% of verified professional appraisal value).\n` +
          `• **SME & Business Loan**: Up to ₦10,000,000 for registered commercial enterprises.\n` +
          `• **Personal Emergency Loan**: Up to ₦1,500,000 with tenors from 1 to 12 months.\n\n` +
          `Would you like to calculate estimated monthly payments or view requirements?`,
        quickReplies: [
          { label: '📋 Requirements', action: () => handleSelectOption('Requirements') },
          { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('Borrowing limit inquiry') },
        ]
      };
    }

    // 7. IPPIS Civil Service Loans
    if (q.includes('ippis')) {
      return {
        text: `**IPPIS Civil Service Loans**:\n\n` +
          `• **Eligible Borrowers**: Confirmed Federal Government employees paid via the IPPIS payroll platform.\n` +
          `• **Facility Amount**: Up to ₦5,000,000.\n` +
          `• **Tenure**: 3 to 24 Months flexible repayment.\n` +
          `• **Deduction**: Automated monthly deduction from IPPIS salary.\n` +
          `• **Required Documents**: Staff ID Card, recent 3 months IPPIS payslips, and verified appointment letter.\n` +
          `• **Turnaround**: 24 – 48 hours to account credit.`,
        quickReplies: [
          { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
          { label: '📋 Requirements', action: () => handleSelectOption('Requirements') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('IPPIS loan inquiry') },
        ]
      };
    }

    // 8. Collateral-Backed Facilities
    if (q.includes('collateral') || q.includes('asset')) {
      return {
        text: `**Collateral-Backed Facilities**:\n\n` +
          `• **Acceptable Pledges**: Clean motor vehicles with genuine registration, titled real estate (C of O / R of O in Abuja or Lagos), and industrial machinery.\n` +
          `• **Facility Amount**: Determined by valuation (up to 70% - 80% of current market value).\n` +
          `• **Tenure**: Flexible terms up to 36 Months.\n` +
          `• **Custody & Security**: Insured, monitored custody with signed release covenants upon full liquidation.`,
        quickReplies: [
          { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('Collateral facility inquiry') },
        ]
      };
    }

    // 9. SME & Business Loans
    if (q.includes('sme') || q.includes('business') || q.includes('company') || q.includes('enterprise') || q.includes('contract') || q.includes('lpo')) {
      return {
        text: `**SME, Business & Contract Financing**:\n\n` +
          `• **SME Growth Capital**: Up to ₦10,000,000 for inventory, equipment purchase, and working capital.\n` +
          `• **Contract / LPO Execution**: Up to 80% supplier financing for verified corporate or government supply contracts.\n` +
          `• **Repayments**: Aligned with business revenue cycles or liquidated directly upon contract client settlement.\n` +
          `• **Requirements**: Valid CAC registration, 6 months bank statements, and tax clearance.`,
        quickReplies: [
          { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('SME financing inquiry') },
        ]
      };
    }

    // 10. Eligibility Check
    if (q.includes('who is eligible') || q.includes('eligible') || q.includes('qualify') || q.includes('qualification')) {
      return {
        text: `**Eligibility Criteria by Product**:\n\n` +
          `• **IPPIS Loans**: Any confirmed Federal Civil Servant or public sector employee with verifiable IPPIS salary pay-slips.\n` +
          `• **Collateral Loans**: Any individual or business owner with clear, unencumbered ownership of verifiable assets.\n` +
          `• **SME Loans**: Active, registered Nigerian businesses (CAC) with 6+ months operational cash flow.\n` +
          `• **Personal Loans**: Verified salaried professionals or structured cooperative members.`,
        quickReplies: [
          { label: '💳 Loan Products', action: () => handleSelectOption('Loan Products') },
          { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('Eligibility consultation') },
        ]
      };
    }

    // 11. Interest Rate / Charges / Hidden Fees
    if (q.includes('interest') || q.includes('rate') || q.includes('fee') || q.includes('charges') || q.includes('hidden')) {
      return {
        text: `SilverKuun operates with guaranteed transparency:\n\n` +
          `• Zero hidden management charges or early prepayment penalties.\n` +
          `• IPPIS Civil Service loans feature competitive cooperative interest rates calculated on monthly reducing balance.\n` +
          `• All repayments and terms are fully disclosed before agreement execution.`,
        quickReplies: [
          { label: '💳 Loan Products', action: () => handleSelectOption('Loan Products') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('Interest rate inquiry') },
        ]
      };
    }

    // Fallback: General helpful answer with escalation option
    return {
      text: `I'm here to assist with any information on KuunLoans facilities, application requirements, and advisory. You can select one of the common topics below, or I can connect you directly with a loan relationship officer!`,
      quickReplies: [
        { label: '💳 Loan Products', action: () => handleSelectOption('Loan Products') },
        { label: '📋 Requirements', action: () => handleSelectOption('Requirements') },
        { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
        { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('General inquiry / User prompt') },
      ]
    };
  };

  // Quick Option Button Handler
  const handleSelectOption = (option: string) => {
    addMessage({ sender: 'user', text: option });
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const answer = generateAutomatedAnswer(option);
      addMessage({
        sender: 'bot',
        text: answer.text,
        quickReplies: answer.quickReplies
      });
    }, 500);
  };

  // Trigger Admin Escalation Confirmation
  const handleTriggerAdminEscalation = (reason?: string) => {
    const trigger = reason || 'User requested human assistance';
    addMessage({
      sender: 'bot',
      text: 'This may require assistance from our administration team. Would you like me to send your message to an administrator?',
      isEscalationPrompt: true,
      escalationTrigger: trigger
    });
  };

  // Handle Confirmation of Escalation
  const handleConfirmEscalation = (trigger?: string) => {
    // Collect the user's latest message if available
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
    setEscalationReason(trigger || 'User confirmed escalation to administrator');
    setEscalationForm((prev) => ({
      ...prev,
      message: prev.message || lastUserMsg || 'Inquiry escalated via KuunLoans Website Chatbot'
    }));
    setIsEscalating(true);
    setEscalationError(null);
    setEscalationSuccess(false);
  };

  // Handle Continuing Chat without Escalation
  const handleCancelEscalation = () => {
    addMessage({
      sender: 'bot',
      text: 'Understood! I will not submit anything. How else can I assist you today?',
      quickReplies: [
        { label: '💳 Loan Products', action: () => handleSelectOption('Loan Products') },
        { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
        { label: '📋 Requirements', action: () => handleSelectOption('Requirements') },
      ]
    });
  };

  // Format full chat dialogue transcript
  const getFormattedTranscript = (): string => {
    return messages
      .map((m) => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`)
      .join('\n\n');
  };

  // Submit Escalation to Sanity
  const handleSubmitEscalation = async (e: React.FormEvent) => {
    e.preventDefault();
    setEscalationError(null);

    if (!escalationForm.name.trim()) {
      setEscalationError('Please provide your full name.');
      return;
    }

    if (!escalationForm.phone.trim() && !escalationForm.email.trim()) {
      setEscalationError('Please provide either a phone number or an email address.');
      return;
    }

    setIsSubmittingEscalation(true);
    try {
      const transcript = getFormattedTranscript();
      const res = await submitContactEnquiry({
        name: escalationForm.name.trim(),
        phone: escalationForm.phone.trim() || '(Not provided)',
        email: escalationForm.email.trim() || undefined,
        subject: 'Chatbot Admin Escalation',
        location: 'Abuja (Utako)',
        message: escalationForm.message.trim() || 'Inquiry escalated via KuunLoans Assistant',
        source: 'website-chatbot',
        escalationReason: escalationReason || 'Chatbot visitor escalation',
        chatTranscript: transcript,
      });

      if (res.success) {
        setEscalationSuccess(true);
        setTimeout(() => {
          setIsEscalating(false);
          addMessage({
            sender: 'bot',
            text: `Thank you, ${escalationForm.name.trim()}. Your inquiry has been securely sent to our administration team (Ref ID: ${res.documentId || 'Recorded'}). A loan relationship officer will reach out to you shortly.`,
            quickReplies: [
              { label: '💳 View Loan Products', action: () => handleSelectOption('Loan Products') },
              { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
            ]
          });
          // Reset form
          setEscalationForm({ name: '', email: '', phone: '', message: '' });
        }, 1200);
      } else {
        setEscalationError(res.error || 'Failed to send your request. Please try again.');
      }
    } catch (err: any) {
      setEscalationError(err.message || 'A network error occurred. Please try again.');
    } finally {
      setIsSubmittingEscalation(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'bot',
        text: 'Chat restarted! Hello! 👋 How can I help you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: [
          { label: '💳 Loan Products', action: () => handleSelectOption('Loan Products') },
          { label: '📝 How to Apply', action: () => handleSelectOption('How to Apply') },
          { label: '📋 Requirements', action: () => handleSelectOption('Requirements') },
          { label: '📞 Talk to Admin', action: () => handleTriggerAdminEscalation('User selected Talk to Admin') },
        ]
      }
    ]);
    setIsEscalating(false);
  };

  return (
    <>
      {/* Floating Chatbot Toggle Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            id="chatbot-launcher-button"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open KuunLoans Assistant Chat"
            className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-black shadow-xl hover:shadow-2xl border-2 border-yellow-500 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-black" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-600 border-2 border-white animate-pulse" />
              )}
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
              Chat Assistant
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
          </button>
        )}
      </div>

      {/* Chatbot Window Panel */}
      {isOpen && (
        <div 
          id="chatbot-widget-panel"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[88vh] h-[640px] bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-zinc-900 text-white px-5 py-4 flex items-center justify-between border-b border-zinc-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold shadow-sm">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm text-white tracking-tight">
                    KuunLoans Assistant
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-yellow-400 text-black uppercase">
                    AI Online
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  Financial Support & Smart Advisory
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart chat"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Chat Stream or Escalation Form */}
          {isEscalating ? (
            /* Escalation Form Modal View */
            <div className="flex-1 p-5 overflow-y-auto bg-zinc-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-zinc-900 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400/30 border border-yellow-400 flex items-center justify-center text-black">
                    <ShieldAlert className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-black">
                      Contact Administrator
                    </h4>
                    <p className="text-[11px] text-zinc-500">
                      Your inquiry will be logged directly in the administrative desk.
                    </p>
                  </div>
                </div>

                {escalationError && (
                  <div className="my-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{escalationError}</span>
                  </div>
                )}

                {escalationSuccess ? (
                  <div className="p-6 rounded-xl bg-yellow-400/20 border border-yellow-400/50 text-center my-6">
                    <CheckCircle2 className="w-10 h-10 text-black mx-auto mb-2" />
                    <h5 className="text-sm font-black text-black">
                      Escalation Sent Successfully!
                    </h5>
                    <p className="text-xs text-zinc-700 mt-1">
                      Returning you to the assistant in a moment...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEscalation} className="space-y-3.5 mt-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ibrahim Abubakar"
                        value={escalationForm.name}
                        onChange={(e) => setEscalationForm({ ...escalationForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs bg-white focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 0803 123 4567"
                          value={escalationForm.phone}
                          onChange={(e) => setEscalationForm({ ...escalationForm, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs bg-white focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={escalationForm.email}
                          onChange={(e) => setEscalationForm({ ...escalationForm, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs bg-white focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
                        Message / Specific Issue *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Please describe what you need human assistance with..."
                        value={escalationForm.message}
                        onChange={(e) => setEscalationForm({ ...escalationForm, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs bg-white focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-100 border border-zinc-200 text-[11px] text-zinc-600">
                      <strong>Escalation Trigger:</strong> {escalationReason}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEscalating(false)}
                        className="flex-1 py-2.5 px-3 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-bold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingEscalation}
                        className="flex-1 py-2.5 px-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black transition-colors border border-yellow-500 flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-60"
                      >
                        {isSubmittingEscalation ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send to Admin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            /* Regular Chat History */
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-zinc-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-end gap-1.5 max-w-[88%]">
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-md bg-yellow-400 flex items-center justify-center text-black shrink-0 shadow-xs mb-1">
                        <Bot className="w-3.5 h-3.5 text-black" />
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-black text-white rounded-br-xs shadow-xs'
                          : 'bg-white text-zinc-900 border border-zinc-200 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line font-medium">{msg.text}</div>

                      {/* Escalation Prompt Confirmation Buttons */}
                      {msg.isEscalationPrompt && (
                        <div className="mt-3 pt-3 border-t border-zinc-200 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleConfirmEscalation(msg.escalationTrigger)}
                            className="px-3 py-1.5 rounded-lg bg-black text-yellow-400 hover:bg-zinc-800 text-xs font-black flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>Contact Admin</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEscalation}
                            className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors"
                          >
                            Continue Chat
                          </button>
                        </div>
                      )}

                      {/* Quick Option Chips */}
                      {msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-zinc-100 flex flex-wrap gap-1.5">
                          {msg.quickReplies.map((reply, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={reply.action}
                              className="px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-yellow-400 text-black border border-zinc-200 text-[11px] font-bold transition-all"
                            >
                              {reply.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] text-zinc-400 px-1 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-yellow-400 flex items-center justify-center text-black shrink-0">
                    <Bot className="w-3.5 h-3.5 text-black" />
                  </div>
                  <div className="px-3 py-2 rounded-2xl bg-white border border-zinc-200 rounded-bl-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Footer Input Bar */}
          {!isEscalating && (
            <div className="p-3 bg-white border-t border-zinc-200 shrink-0">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask a question or type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs bg-zinc-50 focus:bg-white focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black disabled:opacity-40 disabled:hover:bg-yellow-400 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </form>

              <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400 px-1">
                <span>SilverKuun Financial Advisory</span>
                <button
                  type="button"
                  onClick={() => handleTriggerAdminEscalation('Manual escalate link')}
                  className="hover:text-black font-bold underline transition-colors"
                >
                  Need an Administrator?
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
