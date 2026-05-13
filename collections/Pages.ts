import type { Block, CollectionConfig, Field } from 'payload'
import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'

const bodyEditor = lexicalEditor({
  features: () => [
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    LinkFeature({ enabledCollections: ['pages'] }),
  ],
})

const bodyEditorWithHeadings = lexicalEditor({
  features: () => [
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    LinkFeature({ enabledCollections: ['pages'] }),
  ],
})

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
  { label: 'White (default)', value: 'background' },
  { label: 'Light grey', value: 'muted' },
  { label: 'Dark navy (brand)', value: 'brand' },
]

const buttonFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
    admin: {
      description: 'Text displayed on the button.',
      placeholder: 'e.g. Get in touch',
    },
  },
  {
    name: 'url',
    type: 'text',
    required: true,
    admin: {
      description: 'Use a relative path for internal pages (e.g. /contact) or a full URL for external links.',
      placeholder: 'e.g. /contact or https://example.com',
    },
  },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'primary',
    options: [
      { label: 'Primary (filled)', value: 'primary' },
      { label: 'Outline (border only)', value: 'outline' },
      { label: 'Ghost (text only)', value: 'ghost' },
    ],
    admin: {
      description: 'Visual style of the button.',
    },
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Opens the link in a new browser tab. Recommended for external URLs.',
    },
  },
]

const heroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main headline displayed over the hero image.',
        placeholder: 'e.g. Inclusive Training for Every Setting',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional supporting text shown below the heading.',
        placeholder: 'e.g. Specialist training designed to build confidence and capability.',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Background image for the hero. If left blank the default hero image from Site Settings is used.',
      },
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'page',
      options: [
        { label: 'Full hero (85vh) — homepage banners', value: 'hero' },
        { label: 'Page header (50vh) — standard inner pages', value: 'page' },
        { label: 'Compact (38vh) — smaller intro banners', value: 'compact' },
      ],
      admin: {
        description: 'Controls how tall the hero section is.',
      },
    },
    {
      name: 'headerVariant',
      type: 'select',
      defaultValue: 'transparent',
      options: [
        { label: 'Transparent — overlays the hero image', value: 'transparent' },
        { label: 'Solid — dark bar above the hero', value: 'solid' },
      ],
      admin: {
        description: 'Style of the navigation bar on this page. "Transparent" works best with a background image.',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      fields: buttonFields,
      admin: {
        description: 'Optional call-to-action buttons displayed in the hero.',
      },
    },
  ],
}

const contentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Content Section', plural: 'Content Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional section heading.',
        placeholder: 'e.g. About This Training',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional introductory text shown below the heading.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Content',
      editor: bodyEditorWithHeadings,
      admin: {
        description: 'Body copy. Supports H2–H4 headings, bold, italic, underline, strikethrough, lists, and links.',
      },
    },
    {
      name: 'centered',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Centre-align all text in this section.',
      },
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: '5xl',
      options: [
        { label: 'Narrow (3XL) — ideal for long-form reading', value: '3xl' },
        { label: 'Standard (5XL) — default width', value: '5xl' },
        { label: 'Full width', value: 'none' },
      ],
      admin: {
        description: 'Maximum content width. Narrower widths improve readability for long text.',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'plain',
      options: [
        { label: 'Plain', value: 'plain' },
        { label: 'Card (bordered box)', value: 'card' },
      ],
      admin: {
        description: 'Visual treatment for this section.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour for this section.',
      },
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
      admin: {
        description: 'Profile or feature photo displayed alongside the text.',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Optional fallback image URL if no media upload is selected.',
        placeholder: 'https://example.com/photo.jpg',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
      defaultValue: 'Profile image',
      admin: {
        description: 'Alt text for the image (important for accessibility and SEO).',
        placeholder: 'e.g. Justin Axon speaking at a training event',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Text',
      required: true,
      editor: bodyEditorWithHeadings,
      admin: {
        description: 'Text displayed beside the profile image. Supports H3–H4 headings, bold, italic, lists, and links.',
      },
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: '5xl',
      options: [
        { label: 'Narrow (3XL)', value: '3xl' },
        { label: 'Standard (5XL) — default', value: '5xl' },
        { label: 'Full width', value: 'none' },
      ],
      admin: {
        description: 'Maximum width of the profile intro content. Standard (5XL) matches most other sections.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour for this section.',
      },
    },
  ],
}

const cardGridBlock: Block = {
  slug: 'cardGrid',
  labels: { singular: 'Card Grid', plural: 'Card Grids' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional section heading above the card grid.',
        placeholder: 'e.g. What We Offer',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional introductory text below the heading.',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Number of columns on desktop. Cards stack to a single column on mobile.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour for this section.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'anchorId',
          type: 'text',
          admin: {
            description: 'Optional ID used to link directly to this card (e.g. "first-aid"). Leave blank if not needed.',
            placeholder: 'e.g. first-aid',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g. First Aid Awareness',
          },
        },
        {
          name: 'body',
          type: 'richText',
          label: 'Card Body',
          editor: bodyEditor,
          admin: {
            description: 'Card content. Write a description, add a bullet list for key points, and use a final paragraph for any outcome or note. Supports bold, italic, lists, and links.',
          },
        },
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
          admin: {
            description: 'Icon displayed at the top of the card.',
          },
        },
        {
          name: 'href',
          type: 'text',
          admin: {
            description: 'Makes the card clickable. Use a relative path (e.g. /training/first-aid) or a full URL.',
            placeholder: 'e.g. /training/first-aid',
          },
        },
        {
          name: 'linkLabel',
          type: 'text',
          admin: {
            description: 'Text for the link shown at the bottom of the card. Only displayed when "href" is set.',
            placeholder: 'e.g. Learn more',
          },
        },
      ],
      admin: {
        description: 'Add one item per card. Drag to reorder.',
      },
    },
    {
      name: 'bottomNote',
      type: 'text',
      admin: {
        description: 'Optional small-print note displayed below the grid.',
        placeholder: 'e.g. All training can be tailored to your setting.',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      admin: {
        description: 'Label for an optional call-to-action button below the grid.',
        placeholder: 'e.g. View all training',
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      admin: {
        description: 'URL for the call-to-action button. Required if "CTA Label" is set.',
        placeholder: 'e.g. /training',
      },
    },
  ],
}

const bulletListBlock: Block = {
  slug: 'bulletList',
  labels: { singular: 'Bullet List', plural: 'Bullet Lists' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the list.',
        placeholder: 'e.g. What You Will Learn',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional introductory text below the heading.',
      },
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'CheckCircle',
      options: iconOptions,
      admin: {
        description: 'Icon displayed next to each bullet point.',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: { placeholder: 'e.g. Understand de-escalation strategies' },
        },
      ],
      admin: {
        description: 'List items. Add one per row.',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      admin: {
        description: 'Optional pull-quote displayed below the list. Leave blank to hide.',
        placeholder: 'e.g. "This training changed how I support my students."',
      },
    },
    {
      name: 'quoteAuthor',
      type: 'text',
      admin: {
        description: 'Name and/or role of the person quoted.',
        placeholder: 'e.g. Sarah T., SENCO',
        condition: (_, siblingData) => !!siblingData?.quote,
      },
    },
    {
      name: 'quoteBackground',
      type: 'select',
      defaultValue: 'gradient',
      options: [
        { label: 'Gradient', value: 'gradient' },
        { label: 'Dark navy (brand)', value: 'brand' },
        { label: 'Light grey', value: 'muted' },
        { label: 'White', value: 'background' },
      ],
      admin: {
        description: 'Background style for the pull-quote box.',
        condition: (_, siblingData) => !!siblingData?.quote,
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour for this section.',
      },
    },
  ],
}

const quoteBlock: Block = {
  slug: 'quote',
  labels: { singular: 'Quote', plural: 'Quotes' },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The testimonial or pull-quote text.',
        placeholder: 'e.g. "Justin\'s training gave our whole team a shared language for supporting pupils."',
      },
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        description: 'Name and/or role of the person quoted.',
        placeholder: 'e.g. Deputy Headteacher, Sheffield',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'gradient',
      options: [
        { label: 'Gradient', value: 'gradient' },
        { label: 'Dark navy (brand)', value: 'brand' },
        { label: 'Light grey', value: 'muted' },
        { label: 'White', value: 'background' },
      ],
      admin: {
        description: 'Background style for the quote block.',
      },
    },
  ],
}

const ctaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call To Action', plural: 'Call To Actions' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main CTA heading.',
        placeholder: 'e.g. Ready to Book Training?',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional supporting text below the heading.',
        placeholder: 'e.g. Get in touch to discuss your requirements.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'brand',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour. "Dark navy" works well for high-visibility CTAs.',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      fields: buttonFields,
      admin: {
        description: 'Add one or more action buttons.',
      },
    },
  ],
}

const trainingAreaBlock: Block = {
  slug: 'trainingAreas',
  labels: { singular: 'Training Areas Feed', plural: 'Training Areas Feeds' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the training areas list.',
        placeholder: 'e.g. Training by Sector',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional introductory text below the heading.',
      },
    },
    {
      name: 'showCategoryDescriptions',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show the category description text above each group of training areas.',
      },
    },
    {
      name: 'showAudience',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show the target audience line on each training card.',
      },
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
          admin: {
            description: 'The category to override.',
          },
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Custom heading for this category (replaces the default category name).',
            placeholder: 'e.g. School & Education Settings',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Custom description text shown beneath the category heading.',
          },
        },
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
          admin: {
            description: 'Icon displayed next to the category heading.',
          },
        },
      ],
      admin: {
        description: 'Override the title, description, or icon for specific training categories. Only add overrides for categories you want to customise — others will use defaults.',
      },
    },
    {
      name: 'bottomNote',
      type: 'text',
      admin: {
        description: 'Optional small-print note displayed below the training list.',
        placeholder: 'e.g. All training is bespoke and can be adapted to your needs.',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      admin: {
        description: 'Label for an optional button below the training list.',
        placeholder: 'e.g. Enquire about training',
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      admin: {
        description: 'URL for the button. Required if "CTA Label" is set.',
        placeholder: 'e.g. /contact',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour for this section.',
      },
    },
  ],
}

const testimonialsFeedBlock: Block = {
  slug: 'testimonialsFeed',
  labels: { singular: 'Testimonials Feed', plural: 'Testimonials Feeds' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the testimonials.',
        placeholder: 'e.g. What People Are Saying',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional introductory text below the heading.',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 50,
      admin: {
        description: 'Maximum number of testimonials to display. Set to 50 to show all.',
      },
    },
    {
      name: 'showFeedbackCta',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show a "leave feedback" prompt for visitors to submit their own testimonial.',
      },
    },
    {
      name: 'feedbackTitle',
      type: 'text',
      admin: {
        description: 'Heading for the feedback prompt.',
        placeholder: 'e.g. Share Your Experience',
        condition: (_, siblingData) => siblingData?.showFeedbackCta === true,
      },
    },
    {
      name: 'feedbackText',
      type: 'textarea',
      admin: {
        description: 'Supporting text for the feedback prompt.',
        placeholder: 'e.g. We would love to hear about your experience with our training.',
        condition: (_, siblingData) => siblingData?.showFeedbackCta === true,
      },
    },
    {
      name: 'feedbackButtonLabel',
      type: 'text',
      admin: {
        description: 'Button label for the feedback prompt.',
        placeholder: 'e.g. Leave Feedback',
        condition: (_, siblingData) => siblingData?.showFeedbackCta === true,
      },
    },
    {
      name: 'showBottomCta',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show a call-to-action section below the testimonials.',
      },
    },
    {
      name: 'bottomCtaHeading',
      type: 'text',
      admin: {
        description: 'Heading for the bottom CTA section.',
        placeholder: 'e.g. Ready to Get Started?',
        condition: (_, siblingData) => siblingData?.showBottomCta === true,
      },
    },
    {
      name: 'bottomCtaText',
      type: 'textarea',
      admin: {
        description: 'Supporting text for the bottom CTA section.',
        condition: (_, siblingData) => siblingData?.showBottomCta === true,
      },
    },
    {
      name: 'bottomCtaButtons',
      type: 'array',
      fields: buttonFields,
      admin: {
        description: 'Buttons for the bottom CTA section.',
        condition: (_, siblingData) => siblingData?.showBottomCta === true,
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour for this section.',
      },
    },
  ],
}

const pricingTableBlock: Block = {
  slug: 'pricingTable',
  labels: { singular: 'Pricing Table', plural: 'Pricing Tables' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the pricing table.',
        placeholder: 'e.g. Training Investment',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional introductory text below the heading.',
      },
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          admin: {
            description: 'Category heading (e.g. "Half Day" or "Awareness Sessions").',
            placeholder: 'e.g. Half Day Training',
          },
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'e.g. Up to 15 participants',
              },
            },
            {
              name: 'price',
              type: 'text',
              required: true,
              admin: {
                description: 'Price as text (e.g. "£850" or "POA").',
                placeholder: 'e.g. £850',
              },
            },
            {
              name: 'note',
              type: 'textarea',
              admin: {
                description: 'Optional note or caveat for this price.',
                placeholder: 'e.g. Travel expenses charged at cost.',
              },
            },
          ],
          admin: {
            description: 'Individual pricing rows for this category.',
          },
        },
      ],
      admin: {
        description: 'Group pricing into categories (e.g. Half Day, Full Day). Add one row per group.',
      },
    },
    {
      name: 'additionalCostsHeading',
      type: 'text',
      admin: {
        description: 'Heading for the additional costs section (e.g. travel, materials).',
        placeholder: 'e.g. Additional Costs',
      },
    },
    {
      name: 'additionalCosts',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: { placeholder: 'e.g. Travel expenses charged at HMRC approved rate' },
        },
      ],
      admin: {
        description: 'List any additional costs or pricing notes (travel, materials, etc.).',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour for this section.',
      },
    },
  ],
}

const contactSectionBlock: Block = {
  slug: 'contactSection',
  labels: { singular: 'Contact Section', plural: 'Contact Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading for the contact section.',
        placeholder: 'e.g. Get In Touch',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional introductory text below the heading.',
        placeholder: 'e.g. Use the form below to enquire about training.',
      },
    },
    {
      name: 'showContactInfo',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show the contact details sidebar (email, phone, availability) alongside the form.',
      },
    },
    {
      name: 'contactInfoTitle',
      type: 'text',
      admin: {
        description: 'Heading for the contact info sidebar. Defaults to "Get In Touch" if left blank.',
        placeholder: 'e.g. Contact Details',
        condition: (_, siblingData) => siblingData?.showContactInfo === true,
      },
    },
    {
      name: 'availabilityHeading',
      type: 'text',
      admin: {
        description: 'Heading above the availability text from Site Settings.',
        placeholder: 'e.g. Availability',
        condition: (_, siblingData) => siblingData?.showContactInfo === true,
      },
    },
    {
      name: 'showForm',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show the contact form. Uncheck to display contact info only.',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        description: 'Select the form to display. The "Contact Enquiry Form" is created by the seed endpoint.',
        condition: (_, siblingData) => siblingData?.showForm !== false,
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour for this section.',
      },
    },
  ],
}

const stepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Steps', plural: 'Steps' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional heading above the steps.',
        placeholder: 'e.g. How It Works',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional introductory text below the heading.',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Number of step columns on desktop. Steps stack on mobile.',
      },
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { placeholder: 'e.g. Initial Consultation' },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Brief description of this step.',
            placeholder: 'e.g. We discuss your setting, goals, and the needs of your group.',
          },
        },
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
          admin: {
            description: 'Icon representing this step.',
          },
        },
      ],
      admin: {
        description: 'Add one item per step. Drag to reorder.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'background',
      options: sectionBackgroundOptions,
      admin: {
        description: 'Background colour for this section.',
      },
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'published', 'updatedAt'],
    description: 'Each page is built from a flexible set of sections (blocks). Add, reorder, and configure blocks using the Layout field below.',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const path = typeof (data as { path?: string })?.path === 'string' ? (data as { path?: string }).path : '/'
        return `${baseUrl}${path}`
      },
    },
    preview: (data) => {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      const path = typeof (data as { path?: string })?.path === 'string' ? (data as { path?: string }).path : '/'
      return `${baseUrl}${path}`
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Page title shown in the browser tab and used as the default meta title.',
        placeholder: 'e.g. About Justin Axon',
      },
    },
    {
      name: 'path',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL path for this page. Must start with "/". Use "/" for the homepage. No trailing slash.',
        placeholder: 'e.g. /about or /training/mental-health',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Path is required.'
        if (!value.startsWith('/')) return 'Path must start with "/".'
        if (value !== '/' && value.endsWith('/')) return 'Remove the trailing slash from non-root paths.'
        return true
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Unpublished pages return a 404 for visitors but remain visible in the admin.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      admin: {
        description: 'Build the page by adding blocks below. Each block is a self-contained section. Drag to reorder.',
      },
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
