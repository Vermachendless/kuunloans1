import type {StructureResolver} from 'sanity/structure'
import {
  FileTextIcon,
  HelpCircleIcon,
  UsersIcon,
  CogIcon,
  CreditCardIcon,
  MailIcon,
  HeartHandshakeIcon,
  BriefcaseIcon,
  LayoutDashboardIcon,
  FolderIcon,
} from './components/Icons'
import {DashboardOverview} from './components/DashboardOverview'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('KuunLoans Admin')
    .items([
      // 1. Dashboard Overview
      S.listItem()
        .title('Dashboard Overview')
        .id('dashboard-overview')
        .icon(LayoutDashboardIcon)
        .child(
          S.component()
            .id('dashboard')
            .title('Dashboard Overview')
            .component(DashboardOverview)
        ),

      S.divider(),

      // 2. Section: Loan Applications (Primary Business Function with Status Sub-Views)
      S.listItem()
        .title('Loan Applications')
        .id('loanApplicationsGroup')
        .icon(FileTextIcon)
        .child(
          S.list()
            .title('Loan Applications Management')
            .items([
              S.listItem()
                .title('All Applications')
                .id('allLoanApplications')
                .icon(FileTextIcon)
                .child(
                  S.documentList()
                    .title('All Loan Applications')
                    .schemaType('loanApplication')
                    .filter('_type == "loanApplication"')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('🆕 New Submissions')
                .id('newLoanApplications')
                .child(
                  S.documentList()
                    .title('New Applications (Awaiting Review)')
                    .schemaType('loanApplication')
                    .filter('_type == "loanApplication" && status == "new"')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('⚙️ Under Review & Processing')
                .id('processingLoanApplications')
                .child(
                  S.documentList()
                    .title('Applications in Verification')
                    .schemaType('loanApplication')
                    .filter('_type == "loanApplication" && (status == "reviewed" || status == "processing")')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('✅ Approved Applications')
                .id('approvedLoanApplications')
                .child(
                  S.documentList()
                    .title('Approved Loan Facilities')
                    .schemaType('loanApplication')
                    .filter('_type == "loanApplication" && status == "approved"')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('❌ Rejected / Closed')
                .id('rejectedLoanApplications')
                .child(
                  S.documentList()
                    .title('Rejected Applications')
                    .schemaType('loanApplication')
                    .filter('_type == "loanApplication" && status == "rejected"')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                ),
            ])
        ),

      // 3. Section: Inquiries & Messages
      S.listItem()
        .title('Inquiries & Messages')
        .id('inquiriesGroup')
        .icon(MailIcon)
        .child(
          S.list()
            .title('Inquiries & Customer Messages')
            .items([
              S.listItem()
                .title('Financial Aid Inquiries')
                .id('financialAidInquiries')
                .icon(HeartHandshakeIcon)
                .child(
                  S.documentList()
                    .title('Financial Aid Inquiries')
                    .schemaType('financialAidInquiry')
                    .filter('_type == "financialAidInquiry"')
                    .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('General Contact Enquiries (All)')
                .id('contactEnquiries')
                .icon(MailIcon)
                .child(
                  S.documentList()
                    .title('All Contact Enquiries')
                    .schemaType('contactEnquiry')
                    .filter('_type == "contactEnquiry"')
                    .defaultOrdering([
                      {field: 'submittedAt', direction: 'desc'},
                      {field: '_createdAt', direction: 'desc'},
                    ])
                ),
              S.listItem()
                .title('🤖 Chatbot Escalations')
                .id('chatbotEscalations')
                .icon(MailIcon)
                .child(
                  S.documentList()
                    .title('Website Chatbot Escalations')
                    .schemaType('contactEnquiry')
                    .filter('_type == "contactEnquiry" && (source == "website-chatbot" || source == "chatbot")')
                    .defaultOrdering([
                      {field: 'submittedAt', direction: 'desc'},
                      {field: '_createdAt', direction: 'desc'},
                    ])
                ),
              S.listItem()
                .title('🌐 Website Contact Forms')
                .id('webContactForms')
                .icon(MailIcon)
                .child(
                  S.documentList()
                    .title('Website Contact Form Submissions')
                    .schemaType('contactEnquiry')
                    .filter('_type == "contactEnquiry" && (source == "website" || !defined(source))')
                    .defaultOrdering([
                      {field: 'submittedAt', direction: 'desc'},
                      {field: '_createdAt', direction: 'desc'},
                    ])
                ),
            ])
        ),

      S.divider(),

      // 4. Section: Loan Products
      S.listItem()
        .title('Loan Products')
        .id('loanProductsGroup')
        .icon(CreditCardIcon)
        .child(
          S.documentList()
            .title('Active Loan Products')
            .schemaType('loanProduct')
            .filter('_type == "loanProduct"')
            .defaultOrdering([{field: 'displayOrder', direction: 'asc'}])
        ),

      S.divider(),

      // 5. Section: Website Content
      S.listItem()
        .title('Website Content')
        .id('websiteContentGroup')
        .icon(FolderIcon)
        .child(
          S.list()
            .title('Website Content Management')
            .items([
              S.listItem()
                .title('Frequently Asked Questions')
                .id('faqs')
                .icon(HelpCircleIcon)
                .child(
                  S.documentList()
                    .title('Frequently Asked Questions (FAQs)')
                    .schemaType('faq')
                    .filter('_type == "faq"')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              S.listItem()
                .title('Customer Testimonials')
                .id('testimonials')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Customer Testimonials')
                    .schemaType('testimonial')
                    .filter('_type == "testimonial"')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              S.listItem()
                .title('Financial Solutions')
                .id('financialSolutions')
                .icon(BriefcaseIcon)
                .child(
                  S.documentList()
                    .title('Financial Solutions (Overview)')
                    .schemaType('financialSolution')
                    .filter('_type == "financialSolution"')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
              S.listItem()
                .title('Financial Aid Programs')
                .id('financialAidPrograms')
                .icon(HeartHandshakeIcon)
                .child(
                  S.documentList()
                    .title('Financial Aid Programs')
                    .schemaType('financialAid')
                    .filter('_type == "financialAid"')
                ),
            ])
        ),

      S.divider(),

      // 6. Section: Company Information & Settings (Singleton)
      S.listItem()
        .title('Company Information & Settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Company Information & Site Settings')
        ),
    ])
