import {defineField, defineType} from 'sanity'

export const officeLocation = defineType({
  name: 'officeLocation',
  title: 'Office Location',
  type: 'object',
  fields: [
    defineField({
      name: 'city',
      title: 'City / State',
      type: 'string',
      description: 'e.g. Abuja (FCT) or Lagos State',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'district',
      title: 'District / Area',
      type: 'string',
      description: 'e.g. Utako District, Mabushi, Kubwa, Ikoyi, Yaba',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'string',
      description: 'Full street / building address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Branch contact telephone number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Branch email address',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'isMainBranch',
      title: 'Is Main Branch / Headquarters?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      city: 'city',
      district: 'district',
      isMain: 'isMainBranch',
    },
    prepare({city, district, isMain}) {
      return {
        title: `${city} — ${district}`,
        subtitle: isMain ? '★ Main Branch / Headquarters' : 'Branch Office',
      }
    },
  },
})
