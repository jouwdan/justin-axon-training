import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Images and files used across the site. Alt text is required for every upload — this is important for accessibility and SEO.',
  },
  access: {
    read: () => true,
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for screen readers and search engines. Be specific (e.g. "Justin Axon leading a workshop with school staff") rather than generic ("photo").',
        placeholder: 'e.g. Justin Axon leading a first aid training session',
      },
    },
  ],
}
