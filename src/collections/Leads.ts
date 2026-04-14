import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isDeveloper } from '@/access/isDeveloper'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'lawyer', 'createdAt'],
    group: 'Submissions',
  },
  access: {
    create: () => true, // Publicly accessible to allow form submissions
    read: isAdmin,
    update: isDeveloper,
    delete: isDeveloper,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    ({
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      dbName: 'service',
      admin: {
        description: 'The service they are inquiring about',
      },
    } as any),
    ({
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      dbName: 'location',
      admin: {
        description: 'The city/location they searched from',
      },
    } as any),
    {
      name: 'message',
      type: 'textarea',
    },
    ({
      name: 'lawyer',
      type: 'relationship',
      relationTo: 'lawyers',
      required: true,
      dbName: 'lawyer',
      admin: {
        description: 'The lawyer this enquiry is for',
      },
    } as any),
    {
      name: 'sourceUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'The URL from which this lead was generated',
      },
    },
  ],
}
