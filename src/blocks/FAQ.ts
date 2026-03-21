import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const FAQ: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Select FAQs Manually', value: 'manual' },
        { label: 'Auto-fetch by Scope', value: 'auto' },
      ],
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: {
        condition: (_data, siblingData) => siblingData?.source === 'manual',
        description: 'Manually select which FAQs to display',
      },
    },
    {
      name: 'autoScope',
      type: 'select',
      admin: {
        condition: (_data, siblingData) => siblingData?.source === 'auto',
        description: 'Auto-fetch FAQs matching this scope',
      },
      options: [
        { label: 'Global', value: 'global' },
        { label: 'Service', value: 'service' },
        { label: 'Location', value: 'location' },
        { label: 'Page', value: 'page' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'accordion',
      options: [
        { label: 'Accordion', value: 'accordion' },
        { label: 'List', value: 'list' },
      ],
    },
    ...visibilityFields,
  ],
}
