import {defineArrayMember, defineField, defineType} from 'sanity'

export const loanProduct = defineType({
  name: 'loanProduct',
  title: 'Loan Product',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Information'},
    {name: 'terms', title: 'Loan Terms & Limits'},
    {name: 'features', title: 'Features & Benefits'},
    {name: 'eligibility', title: 'Eligibility & Requirements'},
    {name: 'display', title: 'Display & CTA Settings'},
  ],
  fields: [
    // ─── Group 1: Basic Information ──────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      group: 'basic',
      description: 'The official public name of the credit facility (e.g. IPPIS Civil Service Loan, Collateral-Backed Loan, SME & Business Loan)',
      validation: (Rule) => Rule.required().error('Product name is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / URL Identifier',
      type: 'slug',
      group: 'basic',
      description: 'Unique URL identifier used for frontend routing and queries (e.g. ippis-loan, collateral-loan)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'string',
      group: 'basic',
      description: 'Primary category used by the frontend filters, calculator bindings, and application workflows',
      options: {
        list: [
          {title: 'IPPIS Civil Service Loan (Federal Public Sector)', value: 'ippis'},
          {title: 'Collateral-Backed Loan (Asset Secured)', value: 'collateral'},
          {title: 'Business & SME Loan (Commercial Capital)', value: 'business'},
          {title: 'Personal Emergency Loan (Salary / Individual)', value: 'personal'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Product category is required'),
    }),
    defineField({
      name: 'badge',
      title: 'Product Badge',
      type: 'string',
      group: 'basic',
      description: 'Highlight badge displayed above the product title (e.g. Most Popular, High Value Facility, Growth Capital, Fast Support)',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Subtitle',
      type: 'string',
      group: 'basic',
      description: 'Short promotional subtitle summarizing the facility value (e.g. Exclusive credit solution for Federal Civil Servants on the IPPIS payroll)',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      group: 'basic',
      description: 'Comprehensive explanation of the credit facility, value proposition, and how it works',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
        }),
      ],
      validation: (Rule) => Rule.required().error('Full description is required'),
    }),
    defineField({
      name: 'iconImage',
      title: 'Product Icon / Image',
      type: 'image',
      group: 'basic',
      description: 'Visual icon or representative photo for card displays and promotional materials',
      options: {
        hotspot: true,
      },
    }),

    // ─── Group 2: Loan Terms & Limits ────────────────────────────────────────
    defineField({
      name: 'displayAmount',
      title: 'Display Amount (Card String)',
      type: 'string',
      group: 'terms',
      description: 'Visual text displayed on the product card (e.g. Up to ₦5,000,000, Asset Value Dependent, Up to ₦10,000,000)',
      validation: (Rule) => Rule.required().error('Display amount is required for card presentation'),
    }),
    defineField({
      name: 'minAmount',
      title: 'Minimum Loan Amount (₦ Numeric)',
      type: 'number',
      group: 'terms',
      description: 'Minimum principal amount in Naira (used for calculator minimum boundary, e.g. 100000)',
      validation: (Rule) => Rule.min(0).error('Minimum loan amount cannot be negative'),
    }),
    defineField({
      name: 'maxAmount',
      title: 'Maximum Loan Amount (₦ Numeric)',
      type: 'number',
      group: 'terms',
      description: 'Maximum principal ceiling in Naira (used for calculator maximum boundary, e.g. 5000000)',
      validation: (Rule) =>
        Rule.min(0)
          .error('Maximum loan amount cannot be negative')
          .custom((max, context) => {
            const min = (context.document as any)?.minAmount
            if (max !== undefined && min !== undefined && max < min) {
              return 'Maximum loan amount must be greater than or equal to minimum loan amount'
            }
            return true
          }),
    }),
    defineField({
      name: 'displayTenure',
      title: 'Display Tenure (Card String)',
      type: 'string',
      group: 'terms',
      description: 'Visual tenure text displayed on the product card (e.g. Up to 24 Months, Flexible (Up to 36 Months), 3 – 18 Months)',
      validation: (Rule) => Rule.required().error('Display tenure is required for card presentation'),
    }),
    defineField({
      name: 'minTenure',
      title: 'Minimum Loan Tenure',
      type: 'number',
      group: 'terms',
      description: 'Shortest loan duration (e.g. 3)',
      validation: (Rule) => Rule.min(1).error('Minimum tenure must be at least 1'),
    }),
    defineField({
      name: 'maxTenure',
      title: 'Maximum Loan Tenure',
      type: 'number',
      group: 'terms',
      description: 'Longest loan duration (e.g. 24 or 36)',
      validation: (Rule) =>
        Rule.min(1)
          .error('Maximum tenure must be at least 1')
          .custom((max, context) => {
            const min = (context.document as any)?.minTenure
            if (max !== undefined && min !== undefined && max < min) {
              return 'Maximum tenure must be greater than or equal to minimum tenure'
            }
            return true
          }),
    }),
    defineField({
      name: 'tenureUnit',
      title: 'Tenure Unit',
      type: 'string',
      group: 'terms',
      description: 'Time measurement unit for loan duration',
      options: {
        list: [
          {title: 'Months', value: 'Months'},
          {title: 'Years', value: 'Years'},
        ],
        layout: 'radio',
      },
      initialValue: 'Months',
    }),
    defineField({
      name: 'interestRate',
      title: 'Interest Rate',
      type: 'string',
      group: 'terms',
      description: 'Benchmark rate representation (e.g. 2.5% monthly or 2.5)',
      initialValue: '2.5% monthly',
    }),
    defineField({
      name: 'interestRateType',
      title: 'Interest Rate Type',
      type: 'string',
      group: 'terms',
      description: 'Structure of the interest calculation',
      options: {
        list: [
          {title: 'Monthly (Monthly Flat Benchmark)', value: 'monthly'},
          {title: 'Annual (Annual Percentage Rate)', value: 'annual'},
          {title: 'Flat (Fixed Flat Rate)', value: 'flat'},
          {title: 'Reducing Balance', value: 'reducing_balance'},
        ],
      },
      initialValue: 'monthly',
    }),
    defineField({
      name: 'repaymentFrequency',
      title: 'Repayment Frequency',
      type: 'string',
      group: 'terms',
      description: 'Scheduled deduction and repayment interval',
      options: {
        list: [
          {title: 'Monthly (Standard Payroll / Inflow)', value: 'monthly'},
          {title: 'Weekly', value: 'weekly'},
          {title: 'Quarterly', value: 'quarterly'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'monthly',
    }),
    defineField({
      name: 'processingFee',
      title: 'Processing Fee Note',
      type: 'string',
      group: 'terms',
      description: 'Processing fee or administration disclosure (e.g. Zero hidden processing charges or prepayment penalties)',
      initialValue: 'Zero hidden processing charges or prepayment penalties',
    }),
    defineField({
      name: 'otherFees',
      title: 'Other Fees / Charges Description',
      type: 'text',
      group: 'terms',
      rows: 2,
      description: 'Detailed terms on insurance, valuation, or administrative considerations where applicable',
    }),

    // ─── Group 3: Features & Benefits ────────────────────────────────────────
    defineField({
      name: 'features',
      title: 'Features & Benefits',
      type: 'array',
      group: 'features',
      description: 'Key bullet points rendered under "Product Highlights" on the product card',
      of: [
        defineArrayMember({type: 'loanBenefit'}),
      ],
      validation: (Rule) => Rule.min(1).error('At least one feature or benefit is required'),
    }),

    // ─── Group 4: Eligibility & Requirements ──────────────────────────────────
    defineField({
      name: 'eligibilitySummary',
      title: 'Eligibility Summary (Target Demographic)',
      type: 'text',
      group: 'eligibility',
      rows: 2,
      description: 'Summary of eligible applicants (e.g. Federal Ministry, Department & Agency (MDA) Staff on IPPIS)',
      validation: (Rule) => Rule.required().error('Eligibility summary is required'),
    }),
    defineField({
      name: 'eligibleApplicantTypes',
      title: 'Eligible Applicant Categories',
      type: 'array',
      group: 'eligibility',
      description: 'List of applicant demographics qualifying for this facility',
      of: [defineArrayMember({type: 'string'})],
      initialValue: ['Federal Civil Servants', 'Public Sector Workers'],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements & KYC Checklist',
      type: 'array',
      group: 'eligibility',
      description: 'Checklist of documentation and criteria shown under "Key Requirements"',
      of: [
        defineArrayMember({type: 'loanRequirement'}),
      ],
      validation: (Rule) => Rule.min(1).error('At least one requirement is required'),
    }),

    // ─── Group 5: Display & CTA Settings ─────────────────────────────────────
    defineField({
      name: 'popular',
      title: 'Featured / Popular Product',
      type: 'boolean',
      group: 'display',
      description: 'If enabled, highlights this product card with a distinctive border and prominent visual emphasis',
      initialValue: false,
    }),
    defineField({
      name: 'calculatorEnabled',
      title: 'Enable in Loan Calculator',
      type: 'boolean',
      group: 'display',
      description: 'Allow users to select and calculate repayment for this product in the interactive calculator',
      initialValue: true,
    }),
    defineField({
      name: 'ctaText',
      title: 'Primary CTA Button Label',
      type: 'string',
      group: 'display',
      description: 'Action button text (e.g. Apply for IPPIS Loan, Apply for Collateral Loan)',
      initialValue: 'Apply for Loan',
      validation: (Rule) => Rule.required().error('Primary CTA button label is required'),
    }),
    defineField({
      name: 'ctaLink',
      title: 'Primary CTA Link / URL',
      type: 'string',
      group: 'display',
      description: 'Destination URL or modal trigger anchor (e.g. #apply)',
      initialValue: '#apply',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Button Label',
      type: 'string',
      group: 'display',
      description: 'Optional secondary action label (e.g. Calculate Repayment)',
      initialValue: 'Calculate Repayment',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link / URL',
      type: 'string',
      group: 'display',
      description: 'Optional secondary destination anchor (e.g. #loan-calculator)',
      initialValue: '#loan-calculator',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'display',
      description: 'Sort priority on the frontend (lower numbers appear first)',
      initialValue: 0,
      validation: (Rule) => Rule.min(0).error('Display order cannot be negative'),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active / Published',
      type: 'boolean',
      group: 'display',
      description: 'Uncheck to hide this product from the website without deleting the record',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      badge: 'badge',
      displayAmount: 'displayAmount',
      maxAmount: 'maxAmount',
      popular: 'popular',
      isActive: 'isActive',
      media: 'iconImage',
    },
    prepare({title, category, badge, displayAmount, maxAmount, popular, isActive, media}) {
      const categoryLabels: Record<string, string> = {
        ippis: 'IPPIS Civil Service',
        collateral: 'Collateral-Backed',
        business: 'Business & SME',
        personal: 'Personal Emergency',
      }
      const catLabel = categoryLabels[category] || category || 'Loan'
      const amount = displayAmount || (maxAmount ? `Up to ₦${maxAmount.toLocaleString()}` : '')
      const featured = popular ? ' ⭐' : ''
      const status = !isActive ? ' (Inactive)' : ''

      return {
        title: `${title || 'Untitled Loan Product'}${featured}${status}`,
        subtitle: `${catLabel}${badge ? ` • [${badge}]` : ''}${amount ? ` • ${amount}` : ''}`,
        media,
      }
    },
  },
})
