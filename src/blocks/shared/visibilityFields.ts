import type { Field } from 'payload'

/**
 * Shared visibility and targeting fields added to every block.
 * Controls where and on which devices a block appears.
 */
export const visibilityFields: Field[] = [
  {
    name: 'visibility',
    type: 'group',
    label: 'Visibility & Targeting',
    admin: {
      description: 'Control where and on which devices this block appears.',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'showOnDesktop',
            type: 'checkbox',
            defaultValue: true,
            label: 'Show on Desktop',
            admin: { width: '50%' },
          },
          {
            name: 'showOnMobile',
            type: 'checkbox',
            defaultValue: true,
            label: 'Show on Mobile',
            admin: { width: '50%' },
          },
        ],
      },
      {
        name: 'targetType',
        type: 'select',
        defaultValue: 'global',
        label: 'Show On',
        options: [
          { label: 'All Pages (Global)', value: 'global' },
          { label: 'Selected Pages', value: 'selectedPages' },
          { label: 'Selected Services', value: 'selectedServices' },
          { label: 'Selected Locations', value: 'selectedLocations' },
        ],
      },
      {
        name: 'targetPages',
        type: 'relationship',
        relationTo: 'pages',
        hasMany: true,
        admin: {
          condition: (_data, siblingData) => siblingData?.targetType === 'selectedPages',
        },
      },
      {
        name: 'targetServices',
        type: 'relationship',
        relationTo: 'services',
        hasMany: true,
        admin: {
          condition: (_data, siblingData) => siblingData?.targetType === 'selectedServices',
        },
      },
      {
        name: 'targetLocations',
        type: 'relationship',
        relationTo: 'locations',
        hasMany: true,
        admin: {
          condition: (_data, siblingData) => siblingData?.targetType === 'selectedLocations',
        },
      },
    ],
  },
]
