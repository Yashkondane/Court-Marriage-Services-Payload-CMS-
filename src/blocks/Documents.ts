import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const Documents: Block = {
  slug: 'documents',
  labels: {
    singular: 'Documents Section',
    plural: 'Documents Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Documents Required for Court Marriage',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Ensuring all paperwork is accurate and complete helps make the process smooth and hassle-free.',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'document',
          options: [
            { label: 'Identity / Document', value: 'document' },
            { label: 'Address / Location', value: 'location' },
            { label: 'Age / Calendar', value: 'calendar' },
            { label: 'Photo / Camera', value: 'camera' },
            { label: 'Witness / Users', value: 'users' },
            { label: 'Caution / Shield', value: 'shield' },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'note',
          type: 'text',
          admin: {
            description: 'Optional small note at the bottom (e.g., "Important: ...")',
          },
        },
      ],
    },
    ...visibilityFields,
  ],
}
