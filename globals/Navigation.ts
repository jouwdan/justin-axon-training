import type { Field, GlobalConfig } from 'payload'

const createMenuItemFields = (level: number, nestedFieldNames: string[]): Field[] => {
  const fields: Field[] = [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Text displayed in the navigation menu.',
        placeholder: 'e.g. Training',
      },
    },
    {
      name: 'linkType',
      type: 'radio',
      defaultValue: 'page',
      options: [
        { label: 'Page (from CMS)', value: 'page' },
        { label: 'Custom URL', value: 'custom' },
      ],
      admin: {
        description: 'Choose "Page" to link to a page managed in this CMS, or "Custom URL" for any other destination.',
      },
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        description: 'Select the page this menu item links to.',
        condition: (_, siblingData) => siblingData?.linkType === 'page',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'Enter a relative path (e.g. /contact) or a full URL (e.g. https://example.com).',
        placeholder: 'e.g. /contact or https://example.com',
        condition: (_, siblingData) => siblingData?.linkType === 'custom',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Open this link in a new browser tab. Recommended for external URLs.',
      },
    },
  ]

  const nestedFieldName = nestedFieldNames[level]
  if (nestedFieldName) {
    fields.push({
      name: nestedFieldName,
      type: 'array',
      label: level === 0 ? 'Sub-menu Items' : 'Nested Items',
      fields: createMenuItemFields(level + 1, nestedFieldNames),
      admin: {
        description: level === 0
          ? 'Optional dropdown items shown when this menu item is hovered.'
          : 'Optional third-level items nested within this sub-menu item.',
      },
    })
  }

  return fields
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'Site Settings',
    description: 'Manage the header navigation and footer link columns. Changes take effect immediately on the live site.',
  },
  fields: [
    {
      name: 'headerMenu',
      type: 'array',
      label: 'Header Menu',
      fields: createMenuItemFields(0, ['childItems', 'subItems']),
      admin: {
        description: 'Top-level navigation items shown in the site header. Supports up to two levels of dropdowns. Drag to reorder.',
      },
    },
    {
      name: 'footerColumns',
      type: 'array',
      label: 'Footer Columns',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Heading for this footer column.',
            placeholder: 'e.g. Training',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Links',
          fields: createMenuItemFields(0, ['childItems']),
          admin: {
            description: 'Links displayed in this footer column.',
          },
        },
      ],
      admin: {
        description: 'Link columns displayed in the site footer. Drag to reorder columns.',
      },
    },
  ],
}
