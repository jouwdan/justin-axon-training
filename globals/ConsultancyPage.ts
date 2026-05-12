import type { GlobalConfig } from 'payload'

export const ConsultancyPage: GlobalConfig = {
  slug: 'consultancy-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    { name: 'heroTitle', type: 'text', defaultValue: 'Consultancy' },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      defaultValue:
        'Supporting leaders, teams and organisations to embed inclusive practice, strengthen culture and create sustainable change.',
    },
    {
      name: 'introText',
      type: 'textarea',
      defaultValue:
        'Every organisation is different. Your people, your pressures, your culture and your community shape what inclusive practice really needs to look like. My consultancy work is relational, practical and grounded in real-world experience. Whether you are developing strategy, reviewing systems or supporting teams through change, I work alongside you to create solutions that are realistic, implementable and emotionally safe.',
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        { name: 'id', type: 'text', required: true, admin: { description: 'Used for anchor links, e.g. "audits"' } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'includes',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'outcome', type: 'text', required: true },
      ],
    },
    {
      name: 'howItWorks',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
      ],
    },
    {
      name: 'ctaTitle',
      type: 'text',
      defaultValue: "Let's Have a Conversation",
    },
    {
      name: 'ctaSubtitle',
      type: 'textarea',
      defaultValue:
        'I am always happy to have a short, no-pressure conversation. Get in touch via the contact page or email directly.',
    },
  ],
}
