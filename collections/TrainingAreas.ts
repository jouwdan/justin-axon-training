import type { CollectionConfig } from 'payload'

export const TrainingAreas: CollectionConfig = {
  slug: 'training-areas',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'updatedAt'],
    description: 'Individual training offerings grouped by sector. These appear automatically in the Training Areas Feed block on any page.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the training course or programme.',
        placeholder: 'e.g. Mental Health First Aid Awareness',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier used in the training detail page path (e.g. "mental-health-first-aid"). Auto-generated from the title when creating a new record — only change if you need a custom URL.',
        placeholder: 'e.g. mental-health-first-aid',
      },
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
      admin: {
        description: 'The sector this training belongs to. Determines which group it appears under on the Training page.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Sort order within this category. Lower numbers appear first. Use multiples of 10 (e.g. 10, 20, 30) to leave room for future additions.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description of the training displayed on the training card and detail page.',
        placeholder: 'e.g. A practical introduction to recognising and responding to mental health challenges in educational settings.',
      },
    },
    {
      name: 'audience',
      type: 'text',
      required: true,
      admin: {
        description: 'Who this training is designed for, shown as a badge on the detail page.',
        placeholder: 'e.g. Teaching staff, TAs, and support staff',
      },
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
          admin: {
            placeholder: 'e.g. Identify early signs of anxiety and low mood in young people',
          },
        },
      ],
      admin: {
        description: 'Bullet points listing the practical outcomes of this training. Displayed on the detail page.',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === 'create' && data?.title && !data?.slug) {
          data.slug = (data.title as string)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        }
        return data
      },
    ],
  },
  timestamps: true,
}
