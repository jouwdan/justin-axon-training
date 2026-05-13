import type { CollectionConfig } from 'payload'

const SECTOR_LABELS: Record<string, string> = {
  'early-years': 'Early Years',
  primary: 'Primary Schools',
  secondary: 'Secondary Schools',
  'special-schools': 'Special Schools',
  'post-16': 'Post-16',
  'alternative-provision': 'Alternative Provision',
  'local-authority': 'Local Authority Services',
  'health-clinical': 'Health & Clinical Services',
  'social-care': 'Social Care, Residential & Fostering',
  'activity-providers': 'Activity Providers',
  'family-community': 'Family & Community Hubs',
  'emergency-services': 'Emergency & Frontline Services',
  'customer-experience': 'Customer Experience & Public-Facing',
  'parents-carers': 'Parents & Carers',
  'corporate-business': 'Corporate & Business',
  'workforce-agencies': 'Supply, Staffing & Workforce Agencies',
  other: 'Other',
}

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'sector', 'createdAt'],
    description: 'Enquiries submitted via the website contact form. These records are read-only — edit enquiries are not expected. An email notification is sent automatically on each new submission.',
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'organisation',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'phone',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'service',
      type: 'select',
      options: [
        { label: 'Training', value: 'training' },
        { label: 'Consultancy', value: 'consultancy' },
        { label: 'Other', value: 'other' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'sector',
      type: 'select',
      options: [
        { label: 'Early Years', value: 'early-years' },
        { label: 'Primary Schools', value: 'primary' },
        { label: 'Secondary Schools', value: 'secondary' },
        { label: 'Special Schools', value: 'special-schools' },
        { label: 'Post-16', value: 'post-16' },
        { label: 'Alternative Provision', value: 'alternative-provision' },
        { label: 'Local Authority Services', value: 'local-authority' },
        { label: 'Health & Clinical Services', value: 'health-clinical' },
        { label: 'Social Care, Residential & Fostering', value: 'social-care' },
        { label: 'Activity Providers', value: 'activity-providers' },
        { label: 'Family & Community Hubs', value: 'family-community' },
        { label: 'Emergency & Frontline Services', value: 'emergency-services' },
        { label: 'Customer Experience & Public-Facing', value: 'customer-experience' },
        { label: 'Parents & Carers', value: 'parents-carers' },
        { label: 'Corporate & Business', value: 'corporate-business' },
        { label: 'Supply, Staffing & Workforce Agencies', value: 'workforce-agencies' },
        { label: 'Other', value: 'other' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'preferredContact',
      type: 'text',
      label: 'Preferred Contact Times',
      admin: { readOnly: true },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return

        const notifyAddress = process.env.CONTACT_NOTIFY_EMAIL || 'Justin.Axon@outlook.com'
        const sector = SECTOR_LABELS[doc.sector as string] || doc.sector || '—'
        const service = doc.service ? (doc.service as string).charAt(0).toUpperCase() + (doc.service as string).slice(1) : '—'

        await req.payload.sendEmail({
          to: notifyAddress,
          subject: `New enquiry from ${doc.name}`,
          html: `
            <h2>New enquiry via justinaxontraining.co.uk</h2>
            <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
              <tr><td><strong>Name</strong></td><td>${doc.name}</td></tr>
              ${doc.organisation ? `<tr><td><strong>Organisation</strong></td><td>${doc.organisation}</td></tr>` : ''}
              <tr><td><strong>Email</strong></td><td><a href="mailto:${doc.email}">${doc.email}</a></td></tr>
              ${doc.phone ? `<tr><td><strong>Phone</strong></td><td>${doc.phone}</td></tr>` : ''}
              <tr><td><strong>Service</strong></td><td>${service}</td></tr>
              <tr><td><strong>Sector</strong></td><td>${sector}</td></tr>
              ${doc.preferredContact ? `<tr><td><strong>Preferred contact times</strong></td><td>${doc.preferredContact}</td></tr>` : ''}
              <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${doc.message}</td></tr>
            </table>
            <p style="margin-top:16px;font-size:12px;color:#666">
              View all submissions in the
              <a href="${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/contact-submissions">Payload admin</a>.
            </p>
          `,
        })
      },
    ],
  },
  timestamps: true,
}
