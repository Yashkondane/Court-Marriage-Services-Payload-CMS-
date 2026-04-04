import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const Consultation: Block = {
  slug: 'consultation',
  labels: {
    singular: 'Book Consultation',
    plural: 'Consultation Sections',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'formHeading',
          type: 'text',
          defaultValue: 'Book Your Consultation',
          admin: { width: '50%' },
        },
        {
          name: 'formSubheading',
          type: 'text',
          defaultValue: 'Take the first step toward editorial-grade legal curatorship.',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageHeading',
      type: 'text',
      defaultValue: 'Commanding Legal Excellence.',
    },
    {
      name: 'imageSubheading',
      type: 'textarea',
      defaultValue: 'Connect with our expert legal advisors for a curated strategy session tailored to your complex requirements.',
    },
    {
      name: 'trustText',
      type: 'text',
      defaultValue: 'Trusted by 10,000+ Clients',
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      defaultValue: 'Confirm Consultation',
    },
    ...visibilityFields,
  ],
}
