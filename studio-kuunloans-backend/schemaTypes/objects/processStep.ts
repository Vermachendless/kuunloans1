import {defineField, defineType} from 'sanity'

export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'object',
  fields: [
    defineField({
      name: 'step',
      title: 'Step Number',
      type: 'string',
      description: 'e.g. 01, 02, 03, 04',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      description: 'e.g. Select Your Solution, Submit Application & KYC',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Guidance on what happens in this phase',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon identifier (e.g. Layers, FileText, UserCheck, CheckCircle2)',
      options: {
        list: [
          {title: 'Layers (Select Solution)', value: 'Layers'},
          {title: 'File Text (Submit KYC)', value: 'FileText'},
          {title: 'User Check (Review & Assessment)', value: 'UserCheck'},
          {title: 'Check Circle (Decision & Disbursement)', value: 'CheckCircle2'},
        ],
      },
      initialValue: 'Layers',
    }),
  ],
  preview: {
    select: {
      step: 'step',
      title: 'title',
    },
    prepare({step, title}) {
      return {
        title: `Step ${step}: ${title}`,
      }
    },
  },
})
