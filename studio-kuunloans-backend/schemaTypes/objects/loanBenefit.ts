import {defineField, defineType} from 'sanity'

export const loanBenefit = defineType({
  name: 'loanBenefit',
  title: 'Loan Feature / Benefit',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature / Benefit Title',
      type: 'string',
      description: 'e.g. Maximum loan ceiling of ₦5,000,000, Affordable interest rates, Zero collateral',
      validation: (Rule) => Rule.required().error('Benefit title is required'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Optional brief elaboration for detailed card views or modal popups',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Identifier',
      type: 'string',
      description: 'Lucide icon name (e.g. CheckCircle2, ShieldCheck, Sparkles, Banknote, Clock, Percent)',
      options: {
        list: [
          {title: 'Check Circle (Standard Checkmark)', value: 'CheckCircle2'},
          {title: 'Shield Check (Trust / Security)', value: 'ShieldCheck'},
          {title: 'Sparkles (Advantage / Highlight)', value: 'Sparkles'},
          {title: 'Banknote (Funds / Cash)', value: 'Banknote'},
          {title: 'Clock (Speed / Rapid Disbursement)', value: 'Clock'},
          {title: 'Percent (Competitive Rate)', value: 'Percent'},
          {title: 'Lock (Asset Custody)', value: 'Lock'},
          {title: 'TrendingUp (Growth / Business)', value: 'TrendingUp'},
        ],
      },
      initialValue: 'CheckCircle2',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Optional sorting order within the benefits list',
      initialValue: 0,
      validation: (Rule) => Rule.min(0).error('Display order cannot be negative'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'shortDescription',
      icon: 'icon',
    },
    prepare({title, description, icon}) {
      return {
        title: title || 'Untitled Benefit',
        subtitle: description ? description : `Icon: ${icon || 'CheckCircle2'}`,
      }
    },
  },
})
