import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isPublic } from '@/access/index'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "court-marriage-lawyer")',
      },
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'highlights',
      type: 'array',
      admin: {
        description: 'Key highlights / features of this service',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: {
        description: 'Assign existing FAQs to this service',
      },
    },
    // SEO Group
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: {
        description: 'Search engine optimization fields',
      },
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
        { name: 'keywords', type: 'text', label: 'Keywords (comma separated)' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'OG Image' },
        { name: 'canonicalUrl', type: 'text', label: 'Canonical URL' },
        {
          name: 'robotsMeta',
          type: 'select',
          label: 'Robots Meta',
          defaultValue: 'index,follow',
          options: [
            { label: 'Index, Follow', value: 'index,follow' },
            { label: 'No Index, Follow', value: 'noindex,follow' },
            { label: 'Index, No Follow', value: 'index,nofollow' },
            { label: 'No Index, No Follow', value: 'noindex,nofollow' },
          ],
        },
        { name: 'schemaMarkup', type: 'json', label: 'Schema Markup (JSON-LD)' },
      ],
    },
  ],
}
