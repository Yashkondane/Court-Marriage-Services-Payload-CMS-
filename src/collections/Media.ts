import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isPublic } from '@/access/index'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 432, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        if ((operation === 'create' || operation === 'update') && args.req?.file) {
          const file = args.req.file
          // Convert if it's an image (but not already webp, svg, or gif)
          if (
            file.mimetype?.startsWith('image/') &&
            !['image/webp', 'image/svg+xml', 'image/gif'].includes(file.mimetype)
          ) {
            try {
              const sharp = require('sharp')
              // Crush it to webp
              const webpBuffer = await sharp(file.data)
                .webp({ quality: 80 })
                .toBuffer()

              // Update the payload internal file object explicitly to webp
              file.data = webpBuffer
              file.mimetype = 'image/webp'
              file.size = webpBuffer.length

              // Correctly swap the string extension (.jpg / .png -> .webp)
              const nameParts = file.name.split('.')
              nameParts.pop()
              file.name = `${nameParts.join('.')}.webp`
            } catch (err) {
              console.error('WebP conversion failed', err)
            }
          }
        }
        return args
      },
    ],
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'filename', 'mimeType', 'updatedAt'],
    group: 'Media',
  },
  access: {
    create: isAdmin,
    read: isPublic,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for SEO and accessibility. Describe what the image shows.',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'seoTitle',
      type: 'text',
      admin: {
        description: 'Optional SEO-optimized title for the media asset.',
      },
    },
  ],
}
