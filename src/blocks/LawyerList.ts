import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const LawyerList: Block = {
  slug: 'lawyerList',
  labels: {
    singular: 'Lawyer List',
    plural: 'Lawyer Lists',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Expert Legal Team',
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Brief description of the legal team',
      },
    },
    {
      name: 'selectedLawyers',
      type: 'relationship',
      relationTo: 'lawyers',
      hasMany: true,
      admin: {
        description: 'Manually select specific lawyers to display. If left empty, the most recent lawyers will be shown automatically.',
      },
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        description: 'Maximum number of auto-fetched lawyers to show (only applies if no specific lawyers are selected above)',
      },
    },
    {
      name: 'showBio',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Short Bio',
    },
    {
      name: 'showContact',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Contact Info (Email/Phone)',
    },
    ...visibilityFields,
  ],
}
