import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const RichContent: Block = {
  slug: 'richContent',
  labels: {
    singular: 'Rich Content',
    plural: 'Rich Content Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full-featured editor supporting headings, lists, formatting, links, and inline images.',
      },
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Narrow (640px)', value: 'narrow' },
        { label: 'Default (768px)', value: 'default' },
        { label: 'Wide (1024px)', value: 'wide' },
        { label: 'Full Width', value: 'full' },
      ],
    },
    ...visibilityFields,
  ],
}
