import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'defaultHeroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'footerDescription',
      type: 'textarea',
      defaultValue:
        'Creating emotionally safe, inclusive experiences for neurodiverse children, young people, adults and their families.',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'Justin.Axon@outlook.com',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '07534 845 636',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      defaultValue: 'https://www.linkedin.com/in/justinaxon/',
    },
    {
      name: 'availabilityText',
      type: 'textarea',
      defaultValue:
        'I offer weekday sessions and limited weekend availability for community providers. I aim to respond to enquiries within 48 hours.',
    },
    {
      name: 'feedbackFormUrl',
      type: 'text',
      defaultValue: 'https://forms.office.com/r/8r4t69HCeN',
    },
  ],
}
