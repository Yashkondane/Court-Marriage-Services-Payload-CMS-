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
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select the services to display in the carousel. You can drag and drop to reorder.',
      },
    },
    ...visibilityFields,
  ],
}
