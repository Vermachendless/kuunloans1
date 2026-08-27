import {defineArrayMember, defineField, defineType} from 'sanity'

export const financialAid = defineType({
  name: 'financialAid',
  title: 'Financial Aid Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      description: 'e.g. Business Financing, Project Financing, Building Financing, Contract & LPO Financing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / Identifier',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Focus Area',
      type: 'string',
      description: 'e.g. Working Capital & Capacity Building, Milestone-Based Capital Delivery',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Full Program Description',
      type: 'text',
      rows: 3,
      description: 'Detailed summary of this structured capital assistance program',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scope',
      title: 'Coverage & Scope',
      type: 'text',
      rows: 2,
      description: 'Specific use-cases covered (e.g. Working capital injections, inventory bulk purchase...)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Program Benefits',
      type: 'array',
      description: 'Key checklist benefits displayed on the program card',
      of: [defineArrayMember({type: 'string'})],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'iconName',
      title: 'Program Icon',
      type: 'string',
      description: 'Lucide icon identifier',
      options: {
        list: [
          {title: 'Store (Business / Retail)', value: 'Store'},
          {title: 'HardHat (Project / Industrial)', value: 'HardHat'},
          {title: 'Building2 (Building / Real Estate)', value: 'Building2'},
          {title: 'FileCheck (Contract / LPO)', value: 'FileCheck'},
        ],
      },
      initialValue: 'Store',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eligibility',
      title: 'Eligibility Requirements',
      type: 'text',
      rows: 2,
      description: 'Qualifications needed to apply for this financing aid',
      validation: (Rule) => Rule.required(),
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
      subtitle: 'subtitle',
      iconName: 'iconName',
      isActive: 'isActive',
    },
    prepare({title, subtitle, iconName, isActive}) {
      return {
        title,
        subtitle: `${subtitle || ''} • Icon: ${iconName || 'Store'} ${!isActive ? '(Inactive)' : ''}`,
      }
    },
  },
})
