import type { GlobalConfig } from 'payload'

export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    { name: 'heroTitle', type: 'text', defaultValue: 'Pricing' },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      defaultValue:
        'I keep pricing simple and transparent so you can see exactly what you need at a glance. These are the standard costs for all training, consultancy and audit services.',
    },
    {
      name: 'pricingCategories',
      type: 'array',
      fields: [
        { name: 'category', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'price', type: 'text', required: true },
            { name: 'note', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'additionalCosts',
      type: 'array',
      label: 'Additional Cost Notes',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'ctaTitle', type: 'text', defaultValue: 'Request a Quote' },
    {
      name: 'ctaSubtitle',
      type: 'textarea',
      defaultValue:
        'Share a little about the support you are looking for and any details that will help me understand what you need, such as your setting, focus areas or preferred dates. I will be in touch as soon as possible.',
    },
  ],
}
