import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Site Settings',
    description: 'Global site configuration — branding, contact details, and availability messaging used across all pages.',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      label: 'Site Logo',
      relationTo: 'media',
      admin: {
        description: 'Logo displayed in the header and footer. Use a PNG or SVG with a transparent background.',
      },
    },
    {
      name: 'defaultHeroImage',
      type: 'upload',
      label: 'Default Hero Background',
      relationTo: 'media',
      admin: {
        description: 'Fallback background image used on hero sections that do not have their own image set.',
      },
    },
    {
      name: 'footerDescription',
      type: 'textarea',
      label: 'Footer Tagline',
      defaultValue:
        'Creating emotionally safe, inclusive experiences for neurodiverse children, young people, adults and their families.',
      admin: {
        description: 'Short description displayed in the site footer beneath the logo.',
      },
    },
    {
      name: 'email',
      type: 'text',
      label: 'Contact Email',
      defaultValue: 'Justin.Axon@outlook.com',
      admin: {
        description: 'Primary contact email address displayed on the site and in the contact section.',
        placeholder: 'e.g. Justin.Axon@outlook.com',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Contact Phone',
      defaultValue: '07534 845 636',
      admin: {
        description: 'Contact phone number displayed on the site.',
        placeholder: 'e.g. 07534 845 636',
      },
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      label: 'LinkedIn Profile URL',
      defaultValue: 'https://www.linkedin.com/in/justinaxon/',
      admin: {
        description: 'Full URL of the LinkedIn profile linked in the footer.',
        placeholder: 'https://www.linkedin.com/in/justinaxon/',
      },
    },
    {
      name: 'availabilityText',
      type: 'textarea',
      label: 'Availability Message',
      defaultValue:
        'I offer weekday sessions and limited weekend availability for community providers. I aim to respond to enquiries within 48 hours.',
      admin: {
        description: 'Availability and response-time message displayed in the contact section.',
      },
    },
    {
      name: 'feedbackFormUrl',
      type: 'text',
      label: 'Feedback Form URL',
      defaultValue: 'https://forms.office.com/r/8r4t69HCeN',
      admin: {
        description: 'URL of the external feedback form (e.g. Microsoft Forms). Used in the Testimonials Feed block when the feedback prompt is enabled.',
        placeholder: 'https://forms.office.com/r/…',
      },
    },
  ],
}
