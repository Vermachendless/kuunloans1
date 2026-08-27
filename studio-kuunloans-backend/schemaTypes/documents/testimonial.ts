import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer / Member Name',
      type: 'string',
      description: 'e.g. Musa Abdullahi, Chioma Okonkwo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Designation / Profession',
      type: 'string',
      description: 'e.g. Senior Administrative Officer, Managing Director, Civil Engineer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Organization / Company',
      type: 'string',
      description: 'e.g. Federal Ministry of Education, Haven Built Structures',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Abuja, FCT or Ikeja, Lagos',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loanType',
      title: 'Facility / Loan Type Accessed',
      type: 'string',
      description: 'e.g. IPPIS Civil Service Loan, Contract / LPO Financing, Collateral-Backed Loan',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Member Photo',
      type: 'image',
      description: 'Customer portrait image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'avatarUrl',
      title: 'Photo URL (Optional Fallback)',
      type: 'url',
      description: 'External image URL if not uploading directly to Sanity',
    }),
    defineField({
      name: 'content',
      title: 'Testimonial Review',
      type: 'text',
      rows: 4,
      description: 'The testimonial quote written by or on behalf of the customer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (Stars 1 - 5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'featured',
      title: 'Is Featured?',
      type: 'boolean',
      initialValue: false,
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
      name: 'name',
      role: 'role',
      location: 'location',
      loanType: 'loanType',
      media: 'avatar',
      rating: 'rating',
    },
    prepare({name, role, location, loanType, media, rating}) {
      const stars = '★'.repeat(rating || 5)
      return {
        title: `${name} (${stars})`,
        subtitle: `${role || ''} • ${location || ''} [${loanType || ''}]`,
        media,
      }
    },
  },
})
