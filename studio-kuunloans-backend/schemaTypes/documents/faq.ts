import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The frequently asked question',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description: 'Clear, informative answer for website visitors',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'FAQ section filter category',
      options: {
        list: [
          {title: 'General Inquiries & Terms', value: 'general'},
          {title: 'IPPIS Civil Service Loans', value: 'ippis'},
          {title: 'Collateral Facilities', value: 'collateral'},
          {title: 'Financial Aid & Financing', value: 'financial_aid'},
          {title: 'Savings & Investments', value: 'savings'},
        ],
      },
      initialValue: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Published / Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      question: 'question',
      category: 'category',
      isActive: 'isActive',
    },
    prepare({question, category, isActive}) {
      const catMap: Record<string, string> = {
        general: 'General',
        ippis: 'IPPIS Loans',
        collateral: 'Collateral',
        financial_aid: 'Financial Aid',
        savings: 'Savings',
      }
      return {
        title: question,
        subtitle: `Category: ${catMap[category] || category} ${!isActive ? '(Inactive)' : ''}`,
      }
    },
  },
})
