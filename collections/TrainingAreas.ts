import type { CollectionConfig } from 'payload'

export const TrainingAreas: CollectionConfig = {
  slug: 'training-areas',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Education', value: 'education' },
        { label: 'Public Sector, Health & Social Care', value: 'public-sector-health' },
        { label: 'Activity, Youth & Community', value: 'activity-youth-community' },
        { label: 'Emergency & Frontline Services', value: 'emergency-frontline' },
        { label: 'Customer Experience & Public-Facing', value: 'customer-experience' },
        { label: 'Parents & Carers', value: 'parents-carers' },
        { label: 'Corporate & Business', value: 'corporate-business' },
        { label: 'Supply, Staffing & Workforce Agencies', value: 'workforce-agencies' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order within category (lower = first)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'audience',
      type: 'text',
      required: true,
    },
    {
      name: 'helpItems',
      type: 'array',
      label: 'What This Training Helps You Do',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
