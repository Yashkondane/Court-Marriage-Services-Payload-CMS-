import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const LawyersCarousel: Block = {
  slug: 'lawyersCarousel',
  labels: {
    singular: 'Lawyers Carousel',
    plural: 'Lawyers Carousels',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Top Rated Lawyers',
    },
    {
      name: 'lawyers',
      type: 'relationship',
      relationTo: 'lawyers',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select and reorder the lawyers you want to feature in this carousel.',
      },
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Auto-play',
    },
    {
      name: 'interval',
      type: 'number',
      defaultValue: 5000,
      admin: {
        description: 'Transition interval in milliseconds (e.g., 5000 for 5 seconds)',
        condition: (data) => data.autoplay,
      },
    },
    ...visibilityFields,
  ],
}
