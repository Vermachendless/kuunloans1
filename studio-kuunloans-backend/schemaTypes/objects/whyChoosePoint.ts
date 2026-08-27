import {defineField, defineType} from 'sanity'

export const whyChoosePoint = defineType({
  name: 'whyChoosePoint',
  title: 'Why Choose Feature',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. 10+ Years Cooperative Heritage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief explanation of this trust factor',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon identifier (e.g. ShieldCheck, Eye, CalendarClock, UserCheck, Lock, MapPin)',
      options: {
        list: [
          {title: 'Shield Check (Trust / Security)', value: 'ShieldCheck'},
          {title: 'Eye (Transparency)', value: 'Eye'},
          {title: 'Calendar Clock (Flexible Schedule)', value: 'CalendarClock'},
          {title: 'User Check (Advisory / Prudence)', value: 'UserCheck'},
          {title: 'Lock (Confidentiality / Custody)', value: 'Lock'},
          {title: 'Map Pin (Locations / Nationwide)', value: 'MapPin'},
          {title: 'Award (Excellence)', value: 'Award'},
          {title: 'Sparkles (Ethical Commitment)', value: 'Sparkles'},
        ],
      },
      initialValue: 'ShieldCheck',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare({title, icon}) {
      return {
        title,
        subtitle: `Icon: ${icon || 'ShieldCheck'}`,
      }
    },
  },
})
