import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isPublic } from '@/access/index'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'scope', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: isAdmin,
    read: isPublic,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'scope',
      type: 'select',
      required: true,
      defaultValue: 'global',
      options: [
        { label: 'Global', value: 'global' },
        { label: 'Service', value: 'service' },
        { label: 'Location', value: 'location' },
        { label: 'Page', value: 'page' },
      ],
      admin: {
        description: 'Where this FAQ applies. Global FAQs can be reused everywhere.',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        condition: (data) => data?.scope === 'service',
        description: 'Assign to a specific service',
      },
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      admin: {
        condition: (data) => data?.scope === 'location',
        description: 'Assign to a specific location',
      },
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        condition: (data) => data?.scope === 'page',
        description: 'Assign to a specific page',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
        position: 'sidebar',
      },
    },
  ],
}
