import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  labels: {
    singular: 'Testimonials Section',
    plural: 'Testimonials Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'What Our Clients Say',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        description: 'Select testimonials to display',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        description: 'Max testimonials to show (if none selected manually, fetches latest)',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    ...visibilityFields,
  ],
}
