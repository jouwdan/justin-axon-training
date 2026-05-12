import type { Block, CollectionConfig, Field } from 'payload'

const iconOptions = [
  { label: 'Arrow Right', value: 'ArrowRight' },
  { label: 'Bar Chart 3', value: 'BarChart3' },
  { label: 'Brain', value: 'Brain' },
  { label: 'Briefcase', value: 'Briefcase' },
  { label: 'Building 2', value: 'Building2' },
  { label: 'Calendar', value: 'Calendar' },
  { label: 'Check Circle', value: 'CheckCircle' },
  { label: 'Clipboard Check', value: 'ClipboardCheck' },
  { label: 'Clock', value: 'Clock' },
  { label: 'Eye', value: 'Eye' },
  { label: 'File Text', value: 'FileText' },
  { label: 'Graduation Cap', value: 'GraduationCap' },
  { label: 'Heart', value: 'Heart' },
  { label: 'Home', value: 'Home' },
  { label: 'Lightbulb', value: 'Lightbulb' },
  { label: 'Mail', value: 'Mail' },
  { label: 'Map Pin', value: 'MapPin' },
  { label: 'Message Circle', value: 'MessageCircle' },
  { label: 'Phone', value: 'Phone' },
  { label: 'Quote', value: 'Quote' },
  { label: 'Shield', value: 'Shield' },
  { label: 'Target', value: 'Target' },
  { label: 'Users', value: 'Users' },
  { label: 'Video', value: 'Video' },
]

const sectionBackgroundOptions = [
  { label: 'Background', value: 'background' },
  { label: 'Muted', value: 'muted' },
  { label: 'Brand', value: 'brand' },
]

const buttonFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'url', type: 'text', required: true },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'primary',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
    ],
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    defaultValue: false,
  },
]

const heroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'page',
      options: [
        { label: 'Hero (85vh)', value: 'hero' },
        { label: 'Page Header (50vh)', value: 'page' },
        { label: 'Compact (38vh)', value: 'compact' },
      ],
    },
    {
      name: 'headerVariant',
      type: 'select',
      defaultValue: 'transparent',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'Solid', value: 'solid' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      fields: buttonFields,
    },
  ],
}

const contentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Content Section', plural: 'Content Sections' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'paragraphs',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'centered',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: '5xl',
      options: [
        { label: '3XL', value: '3xl' },
        { label: '5XL', value: '5xl' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'plain',
      options: [
        { label: 'Plain', value: 'plain' },
        { label: 'Card (Bordered)', value: 'card' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
    },
  ],
}

const profileIntroBlock: Block = {
  slug: 'profileIntro',
  labels: { singular: 'Profile Intro', plural: 'Profile Intros' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Optional fallback URL if no media upload is selected.',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
      defaultValue: 'Profile image',
    },
    {
      name: 'paragraphs',
      type: 'array',
      required: true,
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
    },
  ],
}

const cardGridBlock: Block = {
  slug: 'cardGrid',
  labels: { singular: 'Card Grid', plural: 'Card Grids' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'anchorId', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
        },
        { name: 'href', type: 'text' },
        { name: 'linkLabel', type: 'text' },
        {
          name: 'bullets',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'outcome', type: 'textarea' },
      ],
    },
    { name: 'bottomNote', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
  ],
}

const bulletListBlock: Block = {
  slug: 'bulletList',
  labels: { singular: 'Bullet List', plural: 'Bullet Lists' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'CheckCircle',
      options: iconOptions,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'quote', type: 'textarea' },
    { name: 'quoteAuthor', type: 'text' },
    {
      name: 'quoteBackground',
      type: 'select',
      defaultValue: 'gradient',
      options: [
        { label: 'Gradient', value: 'gradient' },
        { label: 'Brand', value: 'brand' },
        { label: 'Muted', value: 'muted' },
        { label: 'Background', value: 'background' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
    },
  ],
}

const quoteBlock: Block = {
  slug: 'quote',
  labels: { singular: 'Quote', plural: 'Quotes' },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'author', type: 'text' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'gradient',
      options: [
        { label: 'Gradient', value: 'gradient' },
        { label: 'Brand', value: 'brand' },
        { label: 'Muted', value: 'muted' },
        { label: 'Background', value: 'background' },
      ],
    },
  ],
}

const ctaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call To Action', plural: 'Call To Actions' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'brand',
      options: sectionBackgroundOptions,
    },
    {
      name: 'buttons',
      type: 'array',
      fields: buttonFields,
    },
  ],
}

const trainingAreaBlock: Block = {
  slug: 'trainingAreas',
  labels: { singular: 'Training Areas Feed', plural: 'Training Areas Feeds' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'showCategoryDescriptions',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showAudience',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'categoryOverrides',
      type: 'array',
      fields: [
        {
          name: 'key',
          type: 'select',
          required: true,
          options: [
            { label: 'Education', value: 'education' },
            { label: 'Public Sector, Health & Social Care', value: 'public-sector-health' },
            { label: 'Activity, Youth & Community', value: 'activity-youth-community' },
            { label: 'Emergency & Frontline Services', value: 'emergency-frontline' },
            { label: 'Customer Experience & Public-Facing Teams', value: 'customer-experience' },
            { label: 'Parents & Carers', value: 'parents-carers' },
            { label: 'Corporate & Business', value: 'corporate-business' },
            { label: 'Supply, Staffing & Workforce Agencies', value: 'workforce-agencies' },
          ],
        },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'select', options: iconOptions },
      ],
    },
    { name: 'bottomNote', type: 'text' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
    },
  ],
}

const testimonialsFeedBlock: Block = {
  slug: 'testimonialsFeed',
  labels: { singular: 'Testimonials Feed', plural: 'Testimonials Feeds' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 50,
    },
    {
      name: 'showFeedbackCta',
      type: 'checkbox',
      defaultValue: true,
    },
    { name: 'feedbackTitle', type: 'text' },
    { name: 'feedbackText', type: 'textarea' },
    { name: 'feedbackButtonLabel', type: 'text' },
    {
      name: 'showBottomCta',
      type: 'checkbox',
      defaultValue: false,
    },
    { name: 'bottomCtaHeading', type: 'text' },
    { name: 'bottomCtaText', type: 'textarea' },
    {
      name: 'bottomCtaButtons',
      type: 'array',
      fields: buttonFields,
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
    },
  ],
}

const pricingTableBlock: Block = {
  slug: 'pricingTable',
  labels: { singular: 'Pricing Table', plural: 'Pricing Tables' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'price', type: 'text', required: true },
            { name: 'note', type: 'textarea' },
          ],
        },
      ],
    },
    { name: 'additionalCostsHeading', type: 'text' },
    {
      name: 'additionalCosts',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
    },
  ],
}

const contactSectionBlock: Block = {
  slug: 'contactSection',
  labels: { singular: 'Contact Section', plural: 'Contact Sections' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'showContactInfo',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showForm',
      type: 'checkbox',
      defaultValue: true,
    },
    { name: 'contactInfoTitle', type: 'text' },
    { name: 'availabilityHeading', type: 'text' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
    },
  ],
}

const stepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Steps', plural: 'Steps' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
        },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'published'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'path',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Route path, e.g. "/" or "/about".',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Path is required.'
        if (!value.startsWith('/')) return 'Path must start with "/".'
        if (value !== '/' && value.endsWith('/')) return 'Remove trailing slash from non-root paths.'
        return true
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        heroBlock,
        profileIntroBlock,
        contentBlock,
        cardGridBlock,
        bulletListBlock,
        quoteBlock,
        ctaBlock,
        trainingAreaBlock,
        testimonialsFeedBlock,
        pricingTableBlock,
        contactSectionBlock,
        stepsBlock,
      ],
    },
  ],
  timestamps: true,
}
