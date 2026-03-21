import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const CTA: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Call to Actions',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        { name: 'text', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Banner', value: 'banner' },
        { label: 'Card', value: 'card' },
      ],
    },
    ...visibilityFields,
  ],
}
