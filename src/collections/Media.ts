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
          // Convert if it's an image (but not already svg or gif)
          if (
            file.mimetype?.startsWith('image/') &&
            !['image/svg+xml', 'image/gif'].includes(file.mimetype)
          ) {
            try {
              const sharp = require('sharp')
              
              // Process image: Resize, Sharpen, and Crush to WebP
              // 1440px is perfect for modern desktops without being excessively large
              const processedBuffer = await sharp(file.data)
                .resize({ 
                  width: 1440, 
                  withoutEnlargement: true,
                  fit: 'inside' 
                })
                .sharpen({ sigma: 0.5 }) // Subtle sharpen to keep details crisp
                .webp({ 
                  quality: 78, // High-quality sweet spot
                  effort: 6,   // Maximum computational compression
                  smartSubsample: true 
                })
                .toBuffer()

              // Update the payload internal file object
              file.data = processedBuffer
              file.mimetype = 'image/webp'
              file.size = processedBuffer.length

              // Correctly swap the extension to .webp
              const nameParts = file.name.split('.')
              nameParts.pop()
              file.name = `${nameParts.join('.')}.webp`
            } catch (err) {
              console.error('Pro Media conversion failed', err)
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
