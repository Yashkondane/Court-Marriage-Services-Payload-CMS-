import { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const ServicesCarousel: Block = {
  slug: 'servicesCarousel',
  interfaceName: 'ServicesCarouselBlockType',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Lead India Services',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add and reorder services for the carousel. You can also override the default service icon here.',
      },
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
        },
        {
          name: 'customIcon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional: Override the default service icon.',
          },
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'Custom Highlights',
          admin: {
            description: 'Optional: Override the default highlights. If left empty, highlights from the service will be used.',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    ...visibilityFields,
  ],
}
