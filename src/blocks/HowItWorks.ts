import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const HowItWorks: Block = {
  slug: 'howItWorks',
  labels: {
    singular: 'How It Works',
    plural: 'How It Works Sections',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'processLabel',
          type: 'text',
          defaultValue: 'THE PROCESS',
          admin: { width: '50%' },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          defaultValue: 'How It Works',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'quoteText',
      type: 'textarea',
      defaultValue: '"Justice delayed is justice denied. We ensure precision at every step of your legal journey."',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'gavel',
          options: [
            { label: 'Document/Sheet', value: 'document' },
            { label: 'Handshake/Deal', value: 'handshake' },
            { label: 'Gavel/Law', value: 'gavel' },
            { label: 'Scale/Balance', value: 'scale' },
            { label: 'Shield/Secure', value: 'shield' },
          ],
        },
      ],
      admin: {
        description: 'Manage exactly 3 steps to guide the user through the process.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ctaText',
          type: 'text',
          defaultValue: 'GET LEGAL HELP',
          admin: { width: '50%' },
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/consultation',
          admin: { width: '50%' },
        },
      ],
    },
    ...visibilityFields,
  ],
}
