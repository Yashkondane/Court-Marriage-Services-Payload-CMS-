import type { CollectionConfig } from 'payload'
import { ROLE_OPTIONS } from '@/access/roles'
import { isDeveloper } from '@/access/isDeveloper'
import { isAdmin } from '@/access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Admin',
  },
  access: {
    create: isDeveloper,
    read: isAdmin,
    update: isAdmin,
    delete: isDeveloper,
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'blogManager',
      options: ROLE_OPTIONS,
      access: {
        update: ({ req: { user } }) => Boolean(user?.role === 'developer'),
      },
      admin: {
        description: 'Only developers can change user roles.',
      },
    },
    {
      name: 'supabaseId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-synced Supabase Auth user ID',
      },
    },
  ],
}
