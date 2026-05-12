import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'sector', 'createdAt'],
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
    },
    {
      name: 'organisation',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'service',
      type: 'select',
      options: [
        { label: 'Training', value: 'training' },
        { label: 'Consultancy', value: 'consultancy' },
        { label: 'Other', value: 'other' },
      ],
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
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'preferredContact',
      type: 'text',
      label: 'Preferred Contact Times',
    },
  ],
  timestamps: true,
}
