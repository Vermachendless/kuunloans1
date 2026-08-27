import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Company Info',
  type: 'document',
  groups: [
    {name: 'company', title: 'Company Identity'},
    {name: 'contact', title: 'Contact & Hours'},
    {name: 'stats', title: 'Statistics & Achievements'},
    {name: 'offices', title: 'Office Locations'},
    {name: 'whyChoose', title: 'Why SilverKuun'},
    {name: 'process', title: 'How It Works Steps'},
  ],
  fields: [
    // ─── Company Identity ────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Business / Brand Name',
      type: 'string',
      group: 'company',
      description: 'Main display name (e.g. SilverKuun Loans)',
      initialValue: 'SilverKuun Loans',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legalName',
      title: 'Legal / Registered Name',
      type: 'string',
      group: 'company',
      description: 'e.g. SilverKuun Cooperative Society Limited',
      initialValue: 'SilverKuun Cooperative Society Limited',
    }),
    defineField({
      name: 'groupName',
      title: 'Group / Parent Entity Name',
      type: 'string',
      group: 'company',
      description: 'e.g. SilverKuun Group',
      initialValue: 'SilverKuun Group',
    }),
    defineField({
      name: 'tagline',
      title: 'Brand Tagline',
      type: 'string',
      group: 'company',
      description: 'Main marketing tagline',
      initialValue: 'Reliable, Low-Interest Financial Solutions Tailored for Every Ambition',
    }),
    defineField({
      name: 'establishedYear',
      title: 'Year Established',
      type: 'string',
      group: 'company',
      initialValue: '2014',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      group: 'company',
      options: {
        hotspot: true,
      },
    }),
    // ─── Statistics & Achievements ───────────────────────────────────────────
    defineField({
      name: 'yearsOfExcellence',
      title: 'Years of Excellence (Display)',
      type: 'string',
      group: 'stats',
      description: 'Displayed in Hero and About sections (e.g. 10+)',
      initialValue: '10+',
    }),
    defineField({
      name: 'totalDisbursed',
      title: 'Total Amount Disbursed (Display)',
      type: 'string',
      group: 'stats',
      description: 'Displayed in trust signals (e.g. ₦2.5B+)',
      initialValue: '₦2.5B+',
    }),
    defineField({
      name: 'satisfiedMembers',
      title: 'Satisfied Members (Display)',
      type: 'string',
      group: 'stats',
      description: 'Displayed in Hero stats (e.g. Thousands+)',
      initialValue: 'Thousands+',
    }),
    defineField({
      name: 'ippisMaxLimit',
      title: 'IPPIS Maximum Loan Limit (Display)',
      type: 'string',
      group: 'stats',
      description: 'Displayed prominently throughout site (e.g. ₦5,000,000)',
      initialValue: '₦5,000,000',
    }),
    // ─── Contact & Hours ─────────────────────────────────────────────────────
    defineField({
      name: 'phones',
      title: 'Customer Hotline Numbers',
      type: 'array',
      group: 'contact',
      description: 'Add all active phone numbers (used in Header, Footer, Contact section)',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'emails',
      title: 'Official Email Addresses',
      type: 'array',
      group: 'contact',
      description: 'Add all official contact email addresses',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'string',
      group: 'contact',
      description: 'Displayed in contact and header sections',
      initialValue: 'Monday – Friday: 9:00 AM – 4:30 PM',
    }),
    defineField({
      name: 'supportHours',
      title: 'Support / Helpdesk Hours',
      type: 'string',
      group: 'contact',
      description: 'e.g. 24/7 Dedicated Support Helpdesk',
      initialValue: '24/7 Dedicated Support Helpdesk',
    }),
    // ─── Office Locations ────────────────────────────────────────────────────
    defineField({
      name: 'officeLocations',
      title: 'Branch Office Locations',
      type: 'array',
      group: 'offices',
      description: 'All physical branch locations (Abuja & Lagos). Used in ContactSection and Footer.',
      of: [defineArrayMember({type: 'officeLocation'})],
    }),
    // ─── Why Choose Points ───────────────────────────────────────────────────
    defineField({
      name: 'whyChoosePoints',
      title: 'Why SilverKuun — Trust Points',
      type: 'array',
      group: 'whyChoose',
      description: 'The 6 cooperative heritage and trust pillars displayed in the WhySilverkuun section',
      of: [defineArrayMember({type: 'whyChoosePoint'})],
    }),
    // ─── How It Works Steps ──────────────────────────────────────────────────
    defineField({
      name: 'processSteps',
      title: 'How It Works — Process Steps',
      type: 'array',
      group: 'process',
      description: 'The 4-step application journey displayed in the HowItWorks section',
      of: [defineArrayMember({type: 'processStep'})],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      legalName: 'legalName',
    },
    prepare({name, legalName}) {
      return {
        title: name || 'SilverKuun Loans',
        subtitle: legalName || 'Site Settings & Company Information',
      }
    },
  },
})
