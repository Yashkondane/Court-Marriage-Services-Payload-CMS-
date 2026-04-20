import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isPublic } from '@/access/index'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: isPublic,
    update: isAdmin,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Footer Links',
          description: 'Manage the quick static links shown in the third column of the footer.',
          fields: [
            {
              name: 'quickLinks',
              type: 'array',
              label: 'Quick Links',
              minRows: 0,
              maxRows: 15,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'The text that users will click on.',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'The relative URL (e.g. /about) or absolute URL.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Contact Info',
          description: 'Manage business address, phone, email, and opening hours shown in the footer.',
          fields: [
            {
              name: 'officeAddress',
              type: 'text',
              label: 'Head Office Address',
            },
            {
              name: 'phoneNumber',
              type: 'text',
              label: 'Contact Phone Number',
            },
            {
              name: 'emailAddress',
              type: 'text',
              label: 'Support Email',
            },
            {
              name: 'openingHours',
              type: 'text',
              label: 'Opening Hours',
            },
          ],
        },
      ],
    },
  ],
}
