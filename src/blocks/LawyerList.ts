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
      name: 'filterBySpecialty',
      type: 'text',
      admin: {
        description: 'Optional: Type a specialty (e.g., "Criminal", "Family") to only show lawyers with that specialty. Leave empty to show all.',
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
