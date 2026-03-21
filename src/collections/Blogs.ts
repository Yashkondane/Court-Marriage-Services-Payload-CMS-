import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isBlogManager } from '@/access/isBlogManager'
import { isPublic } from '@/access/index'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'author', 'updatedAt'],
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  access: {
    create: isBlogManager,
    read: isPublic,
    update: isBlogManager,
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
        description: 'URL-friendly blog identifier',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary for listing pages and SEO',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Assign blog to specific services for smart targeting',
      },
    },
    {
      name: 'locations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        description: 'Assign blog to specific locations for smart targeting',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
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
