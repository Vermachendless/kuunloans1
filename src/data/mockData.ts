import { LoanProduct, FinancialAidCategory, FinancialSolution, Testimonial, OfficeLocation, FAQItem } from '../types';

export const COMPANY_INFO = {
  name: 'SilverKuun Loans',
  legalName: 'SilverKuun Cooperative Society Limited',
  groupName: 'SilverKuun Group',
  tagline: 'Reliable, Low-Interest Financial Solutions Tailored for Every Ambition',
  establishedYear: '2014',
  yearsOfExcellence: '10+',
  totalDisbursed: '₦2.5B+',
  satisfiedMembers: 'Thousands+',
  ippisMaxLimit: '₦5,000,000',
  phones: [
    '+234 701 529 2816',
    '+234 201 700 3150',
    '+234 803 794 2635'
  ],
  emails: [
    'info@silverkuunloans.com',
    'silverkuun@gmail.com'
  ],
  workingHours: 'Monday – Friday: 9:00 AM – 4:30 PM',
  supportHours: '24/7 Dedicated Support Helpdesk'
};

export const FINANCIAL_SOLUTIONS: FinancialSolution[] = [
  {
    id: 'loans',
    title: 'Loan Products',
    category: 'Personal & Enterprise',
    description: 'Fast, structured credit facilities including IPPIS salary loans for civil servants, collateral-backed facilities, and business working capital.',
    bulletPoints: [
      'IPPIS Loans up to ₦5,000,000 for Federal Civil Servants',
      'Asset & Collateral-backed loans with secure custody',
      'Flexible tenors from 3 to 24 months',
      'Zero hidden management charges or prepayment penalties'
    ],
    iconName: 'Banknote',
    actionText: 'Unlock Loans',
    actionTarget: '#loan-products',
    accentColor: 'yellow'
  },
  {
    id: 'financial-aid',
    title: 'Financial Aid & Financing',
    category: 'Structured Support',
    description: 'Specialized financial assistance programs designed to alleviate financial burdens, fund milestone projects, and execute supply contracts.',
    bulletPoints: [
      'Business & SME growth financing',
      'Milestone-based Project Financing',
      'Building & Real Estate Development funding',
      'Contract & LPO Execution financing'
    ],
    iconName: 'HandHeart',
    actionText: 'Explore Financial Aid',
    actionTarget: '#financial-aid',
    accentColor: 'yellow'
  },
  {
    id: 'savings-investment',
    title: 'Savings & Investments',
    category: 'Wealth Growth',
    description: 'High-yield fixed savings and wealth management solutions provided through strategic collaboration with Quantum Zenith Asset Management.',
    bulletPoints: [
      'Competitive returns on fixed cooperative savings',
      'Institutional asset management by Quantum Zenith',
      'Disciplined wealth preservation and growth',
      'Regular statement reporting and transparent yield tracking'
    ],
    iconName: 'TrendingUp',
    actionText: 'Learn About Savings',
    actionTarget: '#investments-savings',
    accentColor: 'yellow'
  },
  {
    id: 'business-financing',
    title: 'Business Financing',
    category: 'Enterprise Scaling',
    description: 'Tailored capital injections for registered Nigerian businesses, entrepreneurs, and distributors seeking inventory and operational scale.',
    bulletPoints: [
      'Customized repayment structured to cash flow cycles',
      'Quick review process for active businesses',
      'Equipment, stock, and expansion financing',
      'Dedicated relationship managers for corporate accounts'
    ],
    iconName: 'Briefcase',
    actionText: 'Get Business Financing',
    actionTarget: '#loan-products',
    accentColor: 'yellow'
  }
];

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'ippis-loan',
    category: 'ippis',
    name: 'IPPIS Civil Service Loan',
    badge: 'Most Popular',
    tagline: 'Exclusive credit solution for Federal Civil Servants on the IPPIS payroll',
    description: 'A purpose-designed salary loan facility tailored specifically for verified Federal Civil Servants enrolled on the Integrated Personnel and Payroll Information System (IPPIS). Enjoy stress-free payroll deduction, low interest rates, and no cumbersome collateral requirements.',
    maxAmount: 'Up to ₦5,000,000',
    maxTenure: 'Up to 24 Months',
    targetAudience: 'Federal Ministry, Department & Agency (MDA) Staff',
    popular: true,
    features: [
      'Maximum loan ceiling of ₦5,000,000',
      'Affordable, competitive interest rates',
      'Seamless deduction directly via IPPIS payroll',
      'Zero upfront administrative collateral required',
      'Fast verification and transparent loan schedule'
    ],
    requirements: [
      'Active IPPIS Number & recent payslips (last 3 months)',
      'Valid Federal MDA Staff ID Card & National ID (NIN/Voters/Passport)',
      'Duly completed SilverKuun loan application form',
      'Letter of Introduction from employer/MDA where required'
    ],
    ctaText: 'Apply for IPPIS Loan'
  },
  {
    id: 'collateral-loan',
    category: 'collateral',
    name: 'Collateral-Backed Loan',
    badge: 'High Value Facility',
    tagline: 'Access higher capital by leveraging your verifiable personal or commercial assets',
    description: 'Designed for individuals and business owners requiring substantial capital beyond standard unsecured limits. Pledge eligible assets—such as automobiles or titled property—with guaranteed asset security and prompt professional valuation.',
    maxAmount: 'Asset Value Dependent',
    maxTenure: 'Flexible (Up to 36 Months)',
    targetAudience: 'Individuals, Property Owners & Business Executives',
    popular: false,
    features: [
      'Higher loan sums matching appraised collateral worth',
      'Guaranteed safe and insured custody of collateralized assets',
      'Flexible repayment structures customized to your income streams',
      'Option to refinance or top-up upon prompt servicing',
      'Clear, legal documentation without hidden charges'
    ],
    requirements: [
      'Proof of asset ownership (Original Title Document / Vehicle Registration / Proof of Purchase)',
      'Valid government-issued identification (NIN, Drivers License, or International Passport)',
      'Proof of regular income or active business operations',
      'Physical inspection and valuation consent'
    ],
    ctaText: 'Apply for Collateral Loan'
  },
  {
    id: 'business-loan',
    category: 'business',
    name: 'SME & Business Loan',
    badge: 'Growth Capital',
    tagline: 'Fuel your enterprise growth, restock inventory, or finance operational capital',
    description: 'Empower your enterprise with reliable working capital. Whether you run a retail enterprise, wholesale distribution, or service business, SilverKuun provides structured funds to help you seize seasonal market opportunities.',
    maxAmount: 'Up to ₦10,000,000',
    maxTenure: '3 – 18 Months',
    targetAudience: 'Registered MSMEs, Traders & Corporate Entities',
    popular: false,
    features: [
      'Tailored repayment tied to business turnover cycles',
      'Fast track processing for verified recurring bank inflows',
      'Supports inventory purchases, machinery, and workspace expansion',
      'Dedicated SME advisory support throughout tenure'
    ],
    requirements: [
      'CAC Business Registration documents (Certificate & Status Report)',
      '6 months active corporate bank statements',
      'Valid Director/Owner ID and BVN confirmation',
      'Brief description of business operations and loan utility'
    ],
    ctaText: 'Apply for Business Loan'
  },
  {
    id: 'personal-loan',
    category: 'personal',
    name: 'Personal Emergency Loan',
    badge: 'Fast Support',
    tagline: 'Address urgent personal commitments, school fees, or medical needs with ease',
    description: 'A swift, accessible financial cushion for unexpected expenses. From educational fees and healthcare to home refurbishment, access immediate cash flow with transparent terms and manageable monthly installments.',
    maxAmount: 'Up to ₦1,500,000',
    maxTenure: '1 – 12 Months',
    targetAudience: 'Salary Earners & Confirmed Professionals',
    popular: false,
    features: [
      'Rapid assessment and friendly verification process',
      'No complex documentation or hidden processing markups',
      'Comfortable fixed monthly repayments',
      'Early liquidation without penalty'
    ],
    requirements: [
      'Proof of regular employment or steady monthly income',
      '3 months stamped personal bank statements',
      'Valid national identification (NIN / Voter ID / Passport)',
      'Utility bill / proof of residential address'
    ],
    ctaText: 'Apply for Personal Loan'
  }
];

export const FINANCIAL_AID_CATEGORIES: FinancialAidCategory[] = [
  {
    id: 'business-financing',
    title: 'Business Financing',
    subtitle: 'Working Capital & Capacity Building',
    description: 'Structured capital assistance for growing commercial businesses facing temporary liquidity hurdles, supply chain bottlenecks, or market expansion demands.',
    scope: 'Working capital injections, inventory bulk purchase, and retail replenishment.',
    benefits: [
      'Cash flow stabilization during high-demand cycles',
      'Structured repayment aligned with sales receipts',
      'Custom terms for high-volume traders and manufacturers'
    ],
    iconName: 'Store',
    eligibility: 'Operating business with at least 12 months verified operational track record in Nigeria.'
  },
  {
    id: 'project-financing',
    title: 'Project Financing',
    subtitle: 'Milestone-Based Capital Delivery',
    description: 'End-to-end financial funding for capital projects, infrastructure upgrades, and medium-scale industrial ventures with structured milestone disbursements.',
    scope: 'Infrastructure, industrial equipment installation, and turnkey facility delivery.',
    benefits: [
      'Tranche-based disbursements tied directly to project phases',
      'Comprehensive project risk assessment and advisory',
      'Extended grace periods during execution stages'
    ],
    iconName: 'HardHat',
    eligibility: 'Validated project scope of work, bill of quantities, and execution timeline.'
  },
  {
    id: 'building-financing',
    title: 'Building Financing',
    subtitle: 'Real Estate & Construction Support',
    description: 'Dedicated financial support for property development, residential construction, structural renovations, and building material procurement.',
    scope: 'Commercial developments, private residential builds, and comprehensive renovations.',
    benefits: [
      'Direct-to-supplier material disbursement options',
      'Long-term structured amortization schedules',
      'Collateralized against the underlying development or alternative assets'
    ],
    iconName: 'Building2',
    eligibility: 'Approved building plans, verifiable land title documentation, and contractor estimates.'
  },
  {
    id: 'contract-financing',
    title: 'Contract & LPO Financing',
    subtitle: 'Local Purchase Order (LPO) Execution',
    description: 'Immediate liquidity to fulfill confirmed supply orders, government contracts, and corporate vendor tenders without stalling due to capital constraints.',
    scope: 'Supply contracts, corporate procurement, and government vendor tenders.',
    benefits: [
      'Up to 80% financing of the confirmed purchase order value',
      'Direct payment to verified material manufacturers/vendors',
      'Repayment liquidated directly from contract proceeds upon delivery'
    ],
    iconName: 'FileCheck',
    eligibility: 'Verified, authentic Local Purchase Order (LPO) or awarded contract from reputable client.'
  }
];

export const WHY_SILVERKUUN_POINTS = [
  {
    title: '10+ Years Cooperative Heritage',
    description: 'Established as a trusted cooperative society, prioritizing the long-term financial security and prosperity of members and Nigerian communities.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Guaranteed Transparent Terms',
    description: 'Zero hidden management fees, obscure deductions, or surprise interest rate hikes. Everything is clearly disclosed before signing.',
    icon: 'Eye'
  },
  {
    title: 'Flexible Repayment Structures',
    description: 'Repayment schedules designed around your real cash flows—whether via direct IPPIS salary payroll deduction or milestone installment plans.',
    icon: 'CalendarClock'
  },
  {
    title: 'Responsible Financial Guidance',
    description: 'Our advisors conduct prudent financial health checks to ensure you borrow responsibly, protecting you from unmanageable debt burdens.',
    icon: 'UserCheck'
  },
  {
    title: 'Asset Security & Confidentiality',
    description: 'Pledged assets for collateral facilities are secured in monitored, insured custody with strict non-disclosure legal agreements.',
    icon: 'Lock'
  },
  {
    title: 'Accessible Nationwide Offices',
    description: 'Physical service centers across Abuja (Utako, Mabushi, Kubwa) and Lagos (Ikoyi, Yaba) alongside a 24/7 digital helpdesk.',
    icon: 'MapPin'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Select Your Solution',
    description: 'Choose the loan product or financial aid category that best aligns with your personal or business capital requirement.',
    icon: 'Layers'
  },
  {
    step: '02',
    title: 'Submit Application & KYC',
    description: 'Fill out our streamlined online enquiry form with your basic details, IPPIS number (if civil servant), or collateral particulars.',
    icon: 'FileText'
  },
  {
    step: '03',
    title: 'Review & Assessment',
    description: 'Our dedicated credit officers review your documentation, verify eligibility, and structure the optimal repayment schedule.',
    icon: 'UserCheck'
  },
  {
    step: '04',
    title: 'Decision & Disbursement',
    description: 'Upon approval and agreement execution, funds are promptly credited directly into your verified Nigerian bank account.',
    icon: 'CheckCircle2'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Musa Abdullahi',
    role: 'Senior Administrative Officer',
    organization: 'Federal Ministry of Education',
    location: 'Abuja, FCT',
    loanType: 'IPPIS Civil Service Loan',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    content: 'As a civil servant, securing a loan without stressful collateral was a major challenge until I applied with SilverKuun Loans. The IPPIS deduction process is transparent, and getting ₦3.5M for my family home project was seamless. Highly recommended!',
    rating: 5
  },
  {
    id: '2',
    name: 'Chioma Okonkwo',
    role: 'Managing Director',
    organization: 'Prime Logistics & Distribution',
    location: 'Ikeja, Lagos',
    loanType: 'Contract / LPO Financing',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
    content: 'We had an urgent corporate supply contract that required instant liquidity. SilverKuun provided timely contract financing that allowed us to procure inventory without delay. Their professional team understands Nigerian business dynamics.',
    rating: 5
  },
  {
    id: '3',
    name: 'Babatunde Adebayo',
    role: 'Civil Engineer & Contractor',
    organization: 'Haven Built Structures',
    location: 'Utako, Abuja',
    loanType: 'Collateral-Backed Loan',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    content: 'The collateral evaluation was swift, fair, and documented with absolute legal clarity. Their repayment schedule allowed our site construction to continue uninterrupted. SilverKuun stands out in trust and integrity.',
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'ippis',
    question: 'Who is eligible for SilverKuun IPPIS Loans?',
    answer: 'Any confirmed Federal Civil Servant or public sector employee whose salary is currently processed and paid through the Federal Government Integrated Personnel and Payroll Information System (IPPIS). You must have active service status and at least 3 months of recent verifiable payslips.'
  },
  {
    id: 'faq-2',
    category: 'ippis',
    question: 'What is the maximum loan amount available under IPPIS?',
    answer: 'Eligible civil servants can access loans up to ₦5,000,000, subject to monthly salary debt-service ratio limits, ensuring that your monthly net take-home pay remains compliant with civil service regulations.'
  },
  {
    id: 'faq-3',
    category: 'collateral',
    question: 'What types of assets can be used for Collateral Loans?',
    answer: 'We accept verifiable movable and immovable assets including motor vehicles with valid registration and ownership documents, titled residential or commercial real estate (C of O / R of O), and high-grade heavy machinery. All assets undergo physical inspection and independent professional valuation.'
  },
  {
    id: 'faq-4',
    category: 'financial_aid',
    question: 'How does Contract & Project Financing work?',
    answer: 'Contract/LPO financing provides working capital to execute verified purchase orders from approved corporate or government clients. We finance up to 80% of the material cost, paying suppliers directly where appropriate, and the loan is liquidated once the client pays the contract invoice.'
  },
  {
    id: 'faq-5',
    category: 'savings',
    question: 'What is the connection between SilverKuun and Quantum Zenith?',
    answer: 'SilverKuun collaborates with Quantum Zenith Asset Management to provide our cooperative members with institutional-grade investment management, high-yield fixed treasury options, and regulated wealth management services alongside our internal cooperative savings accounts.'
  },
  {
    id: 'faq-6',
    category: 'general',
    question: 'Are there any hidden processing charges or early repayment penalties?',
    answer: 'No. SilverKuun operates strictly on principles of transparency and cooperative ethics. All interest rates, management fees, and repayment schedules are fully disclosed before agreement execution. You are free to liquidate your loan early without punitive charges.'
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'Abuja (FCT)',
    district: 'Utako District',
    address: 'Plot 418, Utako Commercial Hub, FCT Abuja',
    phone: '+234 701 529 2816',
    email: 'utako@silverkuunloans.com',
    isMainBranch: true
  },
  {
    city: 'Abuja (FCT)',
    district: 'Mabushi',
    address: 'Mabushi Business Complex, FCT Abuja',
    phone: '+234 201 700 3150',
    email: 'mabushi@silverkuunloans.com'
  },
  {
    city: 'Abuja (FCT)',
    district: 'Kubwa',
    address: 'Gado Nasko Road, Kubwa Extension, Abuja',
    phone: '+234 803 794 2635',
    email: 'kubwa@silverkuunloans.com'
  },
  {
    city: 'Lagos State',
    district: 'Ikoyi / Lagos Island',
    address: 'Awolowo Road, Ikoyi, Lagos State',
    phone: '+234 701 529 2816',
    email: 'lagos@silverkuunloans.com'
  },
  {
    city: 'Lagos State',
    district: 'Yaba',
    address: 'Commercial Avenue, Sabo Yaba, Lagos State',
    phone: '+234 201 700 3150',
    email: 'yaba@silverkuunloans.com'
  }
];
