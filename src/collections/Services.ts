import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isPublic } from '@/access/index'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Legal Services',
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
      name: 'showInHeader',
      type: 'checkbox',
      label: 'Show in Main Navigation Dropdown',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'If enabled, this service will appear in the "Services" menu in the header.',
      },
    },
    {
      name: 'menuOrder',
      type: 'number',
      label: 'Menu Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first in the dropdown.',
        condition: (data) => data.showInHeader,
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Legacy icon upload (optional). Prefer using the Native Legal Icon below.',
      }
    },
    {
      name: 'uiIcon',
      type: 'select',
      label: 'Native Legal Icon',
      admin: {
        description: 'Select a highly optimized SVG icon to use for standard layout cards.',
        position: 'sidebar',
      },
      options: [
        { label: 'Gavel (Judge/Court)', value: 'gavel' },
        { label: 'Handshake (Agreement/Marriage)', value: 'handshake' },
        { label: 'Scale (Justice/Balance)', value: 'scale' },
        { label: 'Building (Corporate/Property)', value: 'building' },
        { label: 'File Contract (Agreements/Documentation)', value: 'file-contract' },
        { label: 'Shield (Defense/Protection)', value: 'shield' },
        { label: 'User Tie (Professional/Consultation)', value: 'user-tie' },
        { label: 'Users (Family/Custody)', value: 'users' },
        { label: 'Calculator (Tax/Finance)', value: 'calculator' },
        { label: 'Home (Real Estate)', value: 'home' },
        { label: 'Briefcase (Business)', value: 'briefcase' },
        { label: 'Landmark (Government/Tax)', value: 'landmark' },
        { label: 'Money Bill (Finance)', value: 'money-bill' },
        { label: 'Book (Education/Law Book)', value: 'book' },
        { label: 'Stamp (Certification)', value: 'stamp' },
      ],
    },
    {
      name: 'supportedLocations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Select the cities where this service is actively offered. Only selected cities will generate live landing pages.',
      },
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
