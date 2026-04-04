import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const WhyChooseUs: Block = {
  slug: 'whyChooseUs',
  labels: {
    singular: 'Why Choose Us',
    plural: 'Why Choose Us Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Why Choose VakilFirst?',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'Experience unparalleled legal expertise and modern strategic solutions designed for your success.',
    },
    {
      name: 'benefits',
      type: 'array',
      minRows: 1,
      maxRows: 12,
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
            { label: 'Phone/Callback', value: 'phone' },
            { label: 'Strategy/Plan', value: 'strategy' },
            { label: 'Gavel/Law', value: 'gavel' },
            { label: 'Growth/Trending', value: 'trending' },
            { label: 'Laptop/Digital', value: 'laptop' },
            { label: 'Payments/Affordable', value: 'payments' },
            { label: 'Shield/Security', value: 'shield' },
            { label: 'Users/Team', value: 'users' },
          ],
        },
      ],
      admin: {
        description: 'Add or manage the benefit cards in this section.',
      },
    },
    {
      name: 'trustBadges',
      type: 'array',
      fields: [
        {
          name: 'badgeText',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Subtle trust indicators shown at the bottom of the section.',
      },
    },
    ...visibilityFields,
  ],
}
