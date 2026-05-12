import type { Field, GlobalConfig } from 'payload'

const createMenuItemFields = (level: number, nestedFieldNames: string[]): Field[] => {
  const fields: Field[] = [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'linkType',
      type: 'radio',
      defaultValue: 'page',
      options: [
        { label: 'Page', value: 'page' },
        { label: 'Custom URL', value: 'custom' },
      ],
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === 'page',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === 'custom',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ]

  const nestedFieldName = nestedFieldNames[level]
  if (nestedFieldName) {
    fields.push({
      name: nestedFieldName,
      type: 'array',
      fields: createMenuItemFields(level + 1, nestedFieldNames),
    })
  }

  return fields
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'headerMenu',
      type: 'array',
      fields: createMenuItemFields(0, ['childItems', 'subItems']),
    },
    {
      name: 'footerColumns',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: createMenuItemFields(0, ['childItems']),
        },
      ],
    },
  ],
}
