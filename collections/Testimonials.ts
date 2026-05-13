import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'role', 'featured', 'order'],
    description: 'Client testimonials displayed on the website. Use the "Featured" checkbox and "Order" field to control which testimonials appear most prominently.',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The testimonial text. Use the person\'s own words where possible.',
        placeholder: 'e.g. "Justin\'s training completely changed how our team approaches challenging behaviour. Highly recommended."',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the person giving the testimonial.',
        placeholder: 'e.g. Sarah Thompson',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title and/or organisation. Provides context for the reader.',
        placeholder: 'e.g. SENCO, Meadowbrook Primary School',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Featured testimonials may be highlighted or shown first depending on the block settings.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order within the testimonials feed. Lower numbers appear first. Use multiples of 10 (e.g. 10, 20) to leave room for future entries.',
      },
    },
  ],
  timestamps: true,
}
