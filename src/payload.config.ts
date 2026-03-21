import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Services } from '@/collections/Services'
import { Locations } from '@/collections/Locations'
import { Leads } from '@/collections/Leads'
import { Blogs } from '@/collections/Blogs'
import { News } from '@/collections/News'
import { FAQs } from '@/collections/FAQs'
import { Testimonials } from '@/collections/Testimonials'
import { Gallery } from '@/collections/Gallery'
import { Lawyers } from '@/collections/Lawyers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Court Marriage Services CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Media,
    Pages,
    Services,
    Locations,
    Leads,
    Blogs,
    News,
    FAQs,
    Testimonials,
    Gallery,
    Lawyers,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-PAYLOAD-SECRET',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: process.env.DATABASE_URI?.includes('localhost') ? false : {
        rejectUnauthorized: false,
      },
    },
  }),

  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || 'media',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],

  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ],

  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ],
})
