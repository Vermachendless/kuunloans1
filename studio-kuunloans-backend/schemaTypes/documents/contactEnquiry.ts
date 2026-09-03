import {defineField, defineType} from 'sanity'

export const contactEnquiry = defineType({
  name: 'contactEnquiry',
  title: 'Contact Enquiry',
  type: 'document',
  groups: [
    {name: 'sender', title: 'Sender Details'},
    {name: 'message', title: 'Message'},
    {name: 'admin', title: 'Staff & Status'},
  ],
  fields: [
    defineField({
      name: 'status',
      title: 'Enquiry Status',
      type: 'string',
      group: 'admin',
      options: {
        list: [
          {title: '🆕 New / Unread', value: 'new'},
          {title: '📞 Officer Contacted Client', value: 'contacted'},
          {title: '✅ Resolved / Closed', value: 'resolved'},
          {title: '🗂 Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
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
      name: 'source',
      title: 'Submission Source',
      type: 'string',
      group: 'admin',
      initialValue: 'website',
    }),
    defineField({
      name: 'adminNotes',
      title: 'Internal Staff Notes',
      type: 'text',
      group: 'admin',
      rows: 3,
      description: 'Follow-up notes from loan relationship officers',
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'sender',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'sender',
      description: 'Active WhatsApp / call contact number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'sender',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'subject',
      title: 'Inquiry Type / Subject',
      type: 'string',
      group: 'message',
      description: 'Category of the enquiry',
      options: {
        list: [
          {title: 'IPPIS Civil Service Loan', value: 'IPPIS Civil Service Loan'},
          {title: 'Collateral-Backed Loan', value: 'Collateral-Backed Loan'},
          {title: 'Business & SME Loan', value: 'Business & SME Loan'},
          {title: 'Contract / LPO Financing', value: 'Contract / LPO Financing'},
          {title: 'Project & Building Financing', value: 'Project & Building Financing'},
          {title: 'Savings & Investment Inquiry', value: 'Savings & Investment Inquiry'},
          {title: 'General Information', value: 'General Information'},
        ],
      },
      initialValue: 'General Information',
    }),
    defineField({
      name: 'location',
      title: 'Preferred Office / Branch',
      type: 'string',
      group: 'message',
      description: 'Branch the enquirer would prefer to visit',
      options: {
        list: [
          {title: 'Abuja — Utako District (Main Branch)', value: 'Abuja (Utako)'},
          {title: 'Abuja — Mabushi', value: 'Abuja (Mabushi)'},
          {title: 'Abuja — Kubwa', value: 'Abuja (Kubwa)'},
          {title: 'Lagos — Ikoyi / Lagos Island', value: 'Lagos (Ikoyi)'},
          {title: 'Lagos — Yaba', value: 'Lagos (Yaba)'},
        ],
      },
      initialValue: 'Abuja (Utako)',
    }),
    defineField({
      name: 'message',
      title: 'Message / Loan Request Details',
      type: 'text',
      group: 'message',
      rows: 4,
      description: 'Client message, requirements, facility amount, or questions',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      phone: 'phone',
      subject: 'subject',
      status: 'status',
    },
    prepare({name, phone, subject, status}) {
      const statusMap: Record<string, string> = {
        new: '🆕',
        contacted: '📞',
        resolved: '✅',
        archived: '🗂',
      }
      return {
        title: `${name || 'Unknown'} — ${phone || ''}`,
        subtitle: `${statusMap[status] || ''} ${subject || 'General Inquiry'}`,
      }
    },
  },
})
