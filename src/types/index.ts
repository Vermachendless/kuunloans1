export type LoanCategory = 'ippis' | 'collateral' | 'business' | 'personal';

export interface LoanProduct {
  id: string;
  category: LoanCategory;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  maxAmount: string;
  maxTenure: string;
  targetAudience: string;
  features: string[];
  requirements: string[];
  ctaText: string;
  popular?: boolean;
}

export interface FinancialAidCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  scope: string;
  benefits: string[];
  iconName: string;
  eligibility: string;
}

export interface FinancialSolution {
  id: string;
  title: string;
  category: string;
  description: string;
  bulletPoints: string[];
  iconName: string;
  actionText: string;
  actionTarget: string;
  accentColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  loanType: string;
  avatarUrl: string;
  content: string;
  rating: number;
}

export interface OfficeLocation {
  city: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  isMainBranch?: boolean;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'ippis' | 'collateral' | 'financial_aid' | 'savings';
  question: string;
  answer: string;
}

export interface ApplicationFormData {
  loanType: string;
  requestedAmount: number;
  tenureMonths: number;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  employmentType: 'civil_servant' | 'private_sector' | 'business_owner' | 'contractor' | 'other';
  ippisNumber?: string;
  ministryDepartmentAgency?: string;
  collateralDescription?: string;
  purpose: string;
  agreedToTerms: boolean;
}
