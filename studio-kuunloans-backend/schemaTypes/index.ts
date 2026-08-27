// ─── Object Types ────────────────────────────────────────────────────────────
import {officeLocation} from './objects/officeLocation'
import {whyChoosePoint} from './objects/whyChoosePoint'
import {processStep} from './objects/processStep'

// ─── Document Types ──────────────────────────────────────────────────────────
import {loanProduct} from './documents/loanProduct'
import {loanApplication} from './documents/loanApplication'
import {faq} from './documents/faq'
import {testimonial} from './documents/testimonial'
import {financialSolution} from './documents/financialSolution'
import {financialAid} from './documents/financialAid'
import {financialAidInquiry} from './documents/financialAidInquiry'
import {contactEnquiry} from './documents/contactEnquiry'
import {siteSettings} from './documents/siteSettings'

// ─── Schema Registry ─────────────────────────────────────────────────────────
// Objects are registered first so document schemas that reference them resolve correctly
export const schemaTypes = [
  // Objects / Reusable types
  officeLocation,
  whyChoosePoint,
  processStep,

  // Content documents
  loanProduct,
  loanApplication,
  faq,
  testimonial,
  financialSolution,
  financialAid,

  // Submission / Inquiry documents
  financialAidInquiry,
  contactEnquiry,

  // Global settings (singleton)
  siteSettings,
]

