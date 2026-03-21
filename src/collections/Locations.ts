import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isPublic } from '@/access/index'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'slug', 'parent'],
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
      admin: {
        description: 'URL-friendly name (e.g., "delhi", "saket")',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Country', value: 'country' },
        { label: 'State', value: 'state' },
        { label: 'City', value: 'city' },
        { label: 'Area', value: 'area' },
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'locations',
      admin: {
        description: 'Parent location (e.g., City → State, Area → City)',
      },
      filterOptions: ({ relationTo, data }) => {
        // Only allow selecting a parent of a higher level type
        const typeHierarchy: Record<string, string[]> = {
          state: ['country'],
          city: ['state'],
          area: ['city'],
        }
        const currentType = data?.type as string
        const allowedParentTypes = typeHierarchy[currentType]
        if (!allowedParentTypes) return true
        return {
          type: { in: allowedParentTypes },
        }
      },
    },
  ],
}
