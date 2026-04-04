import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const Highlights: Block = {
  slug: 'highlights',
  labels: {
    singular: 'Highlights Section',
    plural: 'Highlights Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Why Choose Us',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'layoutStyle',
      type: 'select',
      dbName: 'layout_style',
      defaultValue: 'cards',
      options: [
        { label: 'Standard Cards (Vertical)', value: 'cards' },
        { label: 'Stats Bar (Horizontal)', value: 'statsBar' },
      ],
      admin: {
        description: 'Choose if this section looks like feature cards or a trust/stats bar.',
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
        condition: (data) => data.layoutStyle === 'cards',
      },
    },
    ...visibilityFields,
  ],
}
