import type { CollectionConfig } from 'payload'
import { isPublic } from '@/access/index'

export const LawyerMedia: CollectionConfig = {
  slug: 'lawyer-media',
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 432, position: 'centre' },
    ],
  },
  // Keep it hidden from the admin sidebar to avoid cluttering the main media library
  admin: {
    hidden: true,
    useAsTitle: 'alt',
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        if ((operation === 'create' || operation === 'update') && args.req?.file) {
          const file = args.req.file
          // Convert to WebP for high performance
          if (
            file.mimetype?.startsWith('image/') &&
            !['image/webp', 'image/svg+xml', 'image/gif'].includes(file.mimetype)
          ) {
            try {
              const sharp = require('sharp')
              
              // Process image: Resize to 800px, Sharpen, and Crush to WebP
              const processedBuffer = await sharp(file.data)
                .resize({ 
                  width: 800, 
                  withoutEnlargement: true,
                  fit: 'inside' 
                })
                .sharpen({ sigma: 0.5 }) 
                .webp({ 
                  quality: 78, 
                  effort: 6,
                  smartSubsample: true 
                })
                .toBuffer()

              file.data = processedBuffer
              file.mimetype = 'image/webp'
              file.size = processedBuffer.length

              const nameParts = file.name.split('.')
              nameParts.pop()
              file.name = `${nameParts.join('.')}.webp`
            } catch (err) {
              console.error('Pro LawyerMedia conversion failed', err)
            }
          }
        }
        return args
      },
    ],
  },
  access: {
    // Only admins can see this collection in the API/Admin, but public can read (for the site)
    create: () => true, // Allow programmatic creation via API routes (admin context)
    read: isPublic,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      defaultValue: 'Lawyer profile photo',
    },
  ],
}
