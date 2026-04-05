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
      defaultValue: 'withLeadForm',
      options: [
        { label: 'Standard (Text & Buttons)', value: 'standard' },
        { label: 'With Lead Capture Form', value: 'withLeadForm' },
      ],
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
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image Background', value: 'image' },
        { label: 'Solid Color Background', value: 'color' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a background image for the hero section.',
        condition: (_data, siblingData) => siblingData?.backgroundType === 'image',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'black',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
        { label: 'Gold', value: 'gold' },
      ],
      admin: {
        condition: (_data, siblingData) => siblingData?.backgroundType === 'color',
      },
    },
    {
      name: 'textColorTheme',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Auto (High Contrast)', value: 'auto' },
        { label: 'Light Text (White)', value: 'light' },
        { label: 'Dark Text (Black)', value: 'dark' },
      ],
    },
    {
      name: 'showSearchBar',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Search Bar',
      admin: {
        description: 'Display the City + Legal Matter search bar below the hero text.',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Book Free Consultation',
      admin: { description: 'e.g., "Book a Consultation"' },
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Button Link',
      defaultValue: '/consultation',
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      fields: [
        { name: 'text', type: 'text', defaultValue: 'WhatsApp Us' },
        { name: 'link', type: 'text', defaultValue: 'https://wa.me/919650515469' },
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
      admin: {
        condition: (_data, siblingData) => siblingData?.layoutStyle === 'standard',
        description: 'Choose the layout style for the standard hero section.',
      },
    },
    ...visibilityFields,
  ],
}
