import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Gallery Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Gallery',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Select Images Manually', value: 'manual' },
        { label: 'From Gallery Collection', value: 'collection' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      admin: {
        condition: (_data, siblingData) => siblingData?.source === 'manual',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'gallery',
      admin: {
        condition: (_data, siblingData) => siblingData?.source === 'collection',
        description: 'Select a gallery from the Gallery collection',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
      ],
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
    },
    ...visibilityFields,
  ],
}
