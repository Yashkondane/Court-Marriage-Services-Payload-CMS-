import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isPublic } from '@/access/index'

export const Lawyers: CollectionConfig = {
  slug: 'lawyers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'updatedAt'],
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'designation',
      type: 'text',
      admin: {
        description: 'e.g., "Senior Advocate", "Family Law Expert"',
      },
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'specializations',
      type: 'array',
      fields: [
        {
          name: 'specialization',
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
        description: 'Services this lawyer specializes in',
      },
    },
    {
      name: 'experience',
      type: 'number',
      admin: {
        description: 'Years of experience',
      },
    },
    {
      name: 'locationText',
      type: 'text',
      admin: {
        description: 'Specific location to show on the card (e.g., "Barakhamba Road, Delhi")',
      },
    },
    {
      name: 'isSponsored',
      type: 'checkbox',
      defaultValue: false,
      label: 'Sponsored Status',
    },
    {
      name: 'isPremiumPartner',
      type: 'checkbox',
      defaultValue: false,
      label: 'Premium Partner Status',
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 4.5,
      admin: {
        step: 0.1,
      },
    },
    {
      name: 'ratingCount',
      type: 'number',
      defaultValue: 100,
    },
    {
      name: 'responseTime',
      type: 'text',
      defaultValue: 'Typically responds in 1 hour',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
  ],
}
