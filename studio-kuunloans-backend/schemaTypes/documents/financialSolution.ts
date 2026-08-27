import {defineArrayMember, defineField, defineType} from 'sanity'

export const financialSolution = defineType({
  name: 'financialSolution',
  title: 'Financial Solution (Overview)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Solution Title',
      type: 'string',
      description: 'e.g. Loan Products, Financial Aid & Financing, Business Financing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / ID',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Label',
      type: 'string',
      description: 'Top badge text (e.g. Personal & Enterprise, Structured Support, Enterprise Scaling)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Summary of the financial solution category',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Bullet Points / Highlights',
      type: 'array',
      description: 'Key checklist items shown inside the solution card',
      of: [defineArrayMember({type: 'string'})],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'iconName',
      title: 'Card Icon Name',
      type: 'string',
      description: 'Lucide icon identifier',
      options: {
        list: [
          {title: 'Banknote (Loans)', value: 'Banknote'},
          {title: 'HandHeart (Financial Aid / Support)', value: 'HandHeart'},
          {title: 'TrendingUp (Savings / Growth)', value: 'TrendingUp'},
          {title: 'Briefcase (Business / Enterprise)', value: 'Briefcase'},
        ],
      },
      initialValue: 'Banknote',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'actionText',
      title: 'CTA Action Text',
      type: 'string',
      description: 'e.g. Unlock Loans, Explore Financial Aid, Get Business Financing',
      initialValue: 'Explore Solution',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'actionTarget',
      title: 'Action Target / Scroll Anchor',
      type: 'string',
      description: 'Target section ID (e.g. #loan-products, #financial-aid, #investments-savings)',
      initialValue: '#loan-products',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      initialValue: 'yellow',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active / Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      iconName: 'iconName',
      isActive: 'isActive',
    },
    prepare({title, category, iconName, isActive}) {
      return {
        title,
        subtitle: `${category || ''} • Icon: ${iconName || 'Banknote'} ${!isActive ? '(Inactive)' : ''}`,
      }
    },
  },
})
