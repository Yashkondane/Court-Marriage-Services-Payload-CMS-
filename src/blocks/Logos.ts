import { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const Logos: Block = {
  slug: 'logos',
  interfaceName: 'LogosBlockType',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Recognized by leading media outlets'
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Please upload an image with a 1:1 aspect ratio (Square) for the best visual display.',
          },
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
    ...visibilityFields,
  ],
}
