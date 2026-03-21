import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  imageAltText: 'Hero section block',
  fields: [
    {
      name: 'layoutStyle',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Standard (Text & Buttons)', value: 'standard' },
        { label: 'With Lead Capture Form', value: 'withLeadForm' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: 'Main headline' },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: { description: 'Supporting text below the headline' },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      admin: { description: 'e.g., "Book a Consultation"' },
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Button Link',
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      fields: [
        { name: 'text', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'fullWidth',
      options: [
        { label: 'Full Width', value: 'fullWidth' },
        { label: 'Split (Image + Text)', value: 'split' },
        { label: 'Centered', value: 'centered' },
      ],
    },
    ...visibilityFields,
  ],
}
