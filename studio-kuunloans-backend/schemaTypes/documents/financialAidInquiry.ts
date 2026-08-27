import {defineField, defineType} from 'sanity'

export const financialAidInquiry = defineType({
  name: 'financialAidInquiry',
  title: 'Financial Aid Inquiry',
  type: 'document',
  groups: [
    {name: 'contact', title: 'Contact Details'},
    {name: 'request', title: 'Project / Request Details'},
    {name: 'admin', title: 'Staff & Status'},
  ],
  fields: [
    defineField({
      name: 'status',
      title: 'Inquiry Status',
      type: 'string',
      group: 'admin',
      options: {
        list: [
          {title: '🆕 New / Pending', value: 'pending'},
          {title: '🔍 Under Review', value: 'reviewing'},
          {title: '📞 Client Contacted', value: 'contacted'},
          {title: '✅ Approved for Financing', value: 'approved'},
          {title: '❌ Declined', value: 'declined'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submission Date & Time',
      type: 'datetime',
      group: 'admin',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'adminNotes',
      title: 'Internal Staff Notes',
      type: 'text',
      group: 'admin',
      rows: 4,
      description: 'Confidential notes from credit managers reviewing this inquiry',
    }),
    defineField({
      name: 'name',
      title: 'Contact Person Full Name',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
      description: 'Active WhatsApp / call number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'companyName',
      title: 'Registered Business / Entity Name',
      type: 'string',
      group: 'contact',
      description: 'Company or enterprise name',
    }),
    defineField({
      name: 'category',
      title: 'Financing Category',
      type: 'string',
      group: 'request',
      description: 'Type of financial aid requested',
      options: {
        list: [
          {title: 'Business Financing & Working Capital', value: 'business-financing'},
          {title: 'Project Financing (Milestone Based)', value: 'project-financing'},
          {title: 'Building & Real Estate Development Financing', value: 'building-financing'},
          {title: 'Contract / Local Purchase Order (LPO) Financing', value: 'contract-financing'},
        ],
      },
      initialValue: 'business-financing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectValue',
      title: 'Estimated Capital Required',
      type: 'string',
      group: 'request',
      description: 'Approximate funding needed (e.g. ₦10,000,000)',
    }),
    defineField({
      name: 'description',
      title: 'Brief Project / Contract Scope',
      type: 'text',
      group: 'request',
      rows: 4,
      description: 'Nature of the project, LPO, delivery timeline, or supply details',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      companyName: 'companyName',
      category: 'category',
      status: 'status',
      projectValue: 'projectValue',
    },
    prepare({name, companyName, category, status, projectValue}) {
      const catMap: Record<string, string> = {
        'business-financing': 'Business',
        'project-financing': 'Project',
        'building-financing': 'Building',
        'contract-financing': 'Contract/LPO',
      }
      const statusMap: Record<string, string> = {
        pending: '🆕',
        reviewing: '🔍',
        contacted: '📞',
        approved: '✅',
        declined: '❌',
      }
      return {
        title: `${name || 'Unnamed'} ${companyName ? `(${companyName})` : ''}`,
        subtitle: `${statusMap[status] || ''} ${catMap[category] || category || ''} ${projectValue ? `• ${projectValue}` : ''}`,
      }
    },
  },
})
