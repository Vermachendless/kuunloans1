import {defineField, defineType} from 'sanity'

export const loanRequirement = defineType({
  name: 'loanRequirement',
  title: 'Loan Requirement',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Requirement Title',
      type: 'string',
      description: 'e.g. Active IPPIS Number & recent payslips (last 3 months), Valid Federal MDA Staff ID Card',
      validation: (Rule) => Rule.required().error('Requirement title is required'),
    }),
    defineField({
      name: 'description',
      title: 'Guidance / Details',
      type: 'text',
      rows: 2,
      description: 'Helpful instructions for the applicant on what constitutes valid documentation',
    }),
    defineField({
      name: 'documentType',
      title: 'Document Type Category',
      type: 'string',
      description: 'Classification for verification checklist',
      options: {
        list: [
          {title: 'Identification (NIN, Staff ID, Voter Card, Passport)', value: 'identification'},
          {title: 'Income & Salary (Payslips, Bank Statements)', value: 'income'},
          {title: 'Employment (Letter of Introduction, Work ID)', value: 'employment'},
          {title: 'Business & Legal (CAC Certificate, Status Report)', value: 'business'},
          {title: 'Collateral & Title (Vehicle Reg, C of O, R of O)', value: 'collateral'},
          {title: 'Address Verification (Utility Bill, Tenancy)', value: 'address'},
          {title: 'Other Verification', value: 'other'},
        ],
      },
      initialValue: 'identification',
    }),
    defineField({
      name: 'isMandatory',
      title: 'Is Strictly Mandatory?',
      type: 'boolean',
      description: 'Whether this requirement is strictly required before loan approval',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      docType: 'documentType',
      isMandatory: 'isMandatory',
    },
    prepare({title, docType, isMandatory}) {
      const typeLabels: Record<string, string> = {
        identification: 'ID Document',
        income: 'Income / Bank Statement',
        employment: 'Employment Verification',
        business: 'CAC / Business Document',
        collateral: 'Collateral / Title Document',
        address: 'Proof of Address',
        other: 'General Requirement',
      }
      return {
        title: `${title || 'Untitled Requirement'} ${isMandatory ? '(Mandatory)' : '(Optional)'}`,
        subtitle: typeLabels[docType] || docType || 'Requirement',
      }
    },
  },
})
