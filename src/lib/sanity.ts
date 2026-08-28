import { LoanProduct, LoanCategory } from '../types';

export const SANITY_CONFIG = {
  projectId: 'd1cwze7g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
};

/**
 * Focused GROQ query for active Loan Products sorted by displayOrder
 */
export const LOAN_PRODUCTS_QUERY = `*[_type == "loanProduct" && isActive == true] | order(displayOrder asc) {
  _id,
  name,
  "slug": slug.current,
  category,
  badge,
  tagline,
  description,
  displayAmount,
  minAmount,
  maxAmount,
  displayTenure,
  minTenure,
  maxTenure,
  tenureUnit,
  interestRate,
  interestRateType,
  repaymentFrequency,
  processingFee,
  otherFees,
  eligibilitySummary,
  eligibleApplicantTypes,
  "features": features[]{
    title,
    shortDescription,
    icon
  },
  "requirements": requirements[]{
    title,
    description,
    documentType,
    isMandatory
  },
  popular,
  calculatorEnabled,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  displayOrder,
  isActive,
  "iconImageUrl": iconImage.asset->url
}`;

export interface SanityLoanProductRaw {
  _id: string;
  name: string;
  slug?: string;
  category?: string;
  badge?: string;
  tagline?: string;
  description?: any;
  displayAmount?: string;
  minAmount?: number;
  maxAmount?: number;
  displayTenure?: string;
  minTenure?: number;
  maxTenure?: number;
  tenureUnit?: string;
  interestRate?: string;
  interestRateType?: string;
  repaymentFrequency?: string;
  processingFee?: string;
  otherFees?: string;
  eligibilitySummary?: string;
  eligibleApplicantTypes?: string[];
  features?: Array<{ title?: string; shortDescription?: string; icon?: string } | string>;
  requirements?: Array<{ title?: string; description?: string; documentType?: string; isMandatory?: boolean } | string>;
  popular?: boolean;
  calculatorEnabled?: boolean;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  displayOrder?: number;
  isActive?: boolean;
  iconImageUrl?: string;
}

/**
 * Maps raw Sanity document data into the frontend's LoanProduct interface
 */
export function mapSanityLoanProduct(doc: SanityLoanProductRaw): LoanProduct {
  // Extract text from portable text array if description is block content
  let descriptionText = '';
  if (Array.isArray(doc.description)) {
    descriptionText = doc.description
      .map((block: any) =>
        block.children ? block.children.map((c: any) => c.text).join('') : ''
      )
      .filter(Boolean)
      .join('\n\n');
  } else if (typeof doc.description === 'string') {
    descriptionText = doc.description;
  }

  // Format features
  const features: string[] = Array.isArray(doc.features)
    ? doc.features
        .map((f: any) => (typeof f === 'string' ? f : f?.title || ''))
        .filter((f: string) => f.trim().length > 0)
    : [];

  // Format requirements
  const requirements: string[] = Array.isArray(doc.requirements)
    ? doc.requirements
        .map((r: any) => (typeof r === 'string' ? r : r?.title || ''))
        .filter((r: string) => r.trim().length > 0)
    : [];

  // Determine category
  const validCategory: LoanCategory = ['ippis', 'collateral', 'business', 'personal'].includes(
    doc.category as any
  )
    ? (doc.category as LoanCategory)
    : 'ippis';

  return {
    id: doc.slug || doc._id,
    category: validCategory,
    name: doc.name || 'Loan Facility',
    badge: doc.badge || (validCategory === 'ippis' ? 'Most Popular' : 'Facility'),
    tagline: doc.tagline || '',
    description: descriptionText || '',
    maxAmount:
      doc.displayAmount ||
      (doc.maxAmount ? `Up to ₦${doc.maxAmount.toLocaleString()}` : 'Asset Value Dependent'),
    maxTenure:
      doc.displayTenure ||
      (doc.maxTenure ? `Up to ${doc.maxTenure} ${doc.tenureUnit || 'Months'}` : 'Flexible'),
    targetAudience:
      doc.eligibilitySummary ||
      (doc.eligibleApplicantTypes && doc.eligibleApplicantTypes.length > 0
        ? doc.eligibleApplicantTypes.join(', ')
        : 'Eligible Borrowers'),
    features: features.length > 0 ? features : ['Competitive interest rates', 'Fast processing'],
    requirements:
      requirements.length > 0 ? requirements : ['Valid Government ID', 'Recent Bank Statements'],
    ctaText: doc.ctaText || 'Apply for Loan',
    popular: Boolean(doc.popular),
  };
}

/**
 * Generic Sanity fetch utility with multi-endpoint failover
 */
export async function fetchSanity<T = any>(query: string): Promise<T | null> {
  const queryParam = `query=${encodeURIComponent(query)}`;
  const endpoints: string[] = [
    // 1. Direct Sanity API CDN
    `https://${SANITY_CONFIG.projectId}.apicdn.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?${queryParam}`,
    // 2. Direct Sanity API
    `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?${queryParam}`,
    // 3. Local Vite dev proxy
    `/api/sanity/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?${queryParam}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          return data.result as T;
        }
      }
    } catch (err) {
      // Continue to next endpoint attempt
    }
  }

  console.warn('[Sanity] All endpoints failed to fetch data.');
  return null;
}

/**
 * Fetches all active loan products from Sanity
 */
export async function getSanityLoanProducts(): Promise<LoanProduct[] | null> {
  const rawProducts = await fetchSanity<SanityLoanProductRaw[]>(LOAN_PRODUCTS_QUERY);
  if (!rawProducts || !Array.isArray(rawProducts) || rawProducts.length === 0) {
    return null;
  }
  return rawProducts.map(mapSanityLoanProduct);
}
