import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const RawImage: Block = {
  slug: 'rawImage',
  labels: {
    singular: 'Raw Image',
    plural: 'Raw Images',
  },

  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload any image. It will be served exactly as-is.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for accessibility and SEO.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Optional caption displayed below the image.',
      },
    },
    {
      name: 'width',
      type: 'select',
      label: 'Width',
      defaultValue: 'content',
      options: [
        { label: 'Content Width (max 768px)', value: 'content' },
        { label: 'Wide (max 1024px)', value: 'wide' },
        { label: 'Full Width', value: 'full' },
        { label: 'Custom px (enter below)', value: 'custom' },
      ],
    },
    {
      name: 'customWidth',
      type: 'number',
      label: 'Custom Width (px)',
      admin: {
        description: 'Only used when Width is set to "Custom px".',
        condition: (_data, siblingData) => siblingData?.width === 'custom',
      },
    },
    {
      name: 'align',
      type: 'select',
      label: 'Alignment',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    ...visibilityFields,
  ],
}
