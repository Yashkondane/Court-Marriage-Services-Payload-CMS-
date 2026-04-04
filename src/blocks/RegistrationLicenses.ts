import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const RegistrationLicenses: Block = {
  slug: 'registrationLicenses',
  labels: {
    singular: 'Registration & Licenses',
    plural: 'Registration & Licenses Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'Business Compliance',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Registration & Licenses',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'Seamless legal onboarding and regulatory compliance for modern enterprises. Guided by elite legal expertise.',
    },
    {
      name: 'cards',
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
          defaultValue: 'wallet',
          options: [
            { label: 'Wallet/Account', value: 'wallet' },
            { label: 'Corporate/Building', value: 'corporate' },
            { label: 'Restaurant/Food', value: 'restaurant' },
            { label: 'Business/Suitcase', value: 'business' },
            { label: 'Globe/Public', value: 'public' },
            { label: 'Verified/Check', value: 'verified' },
            { label: 'Premium/Crown', value: 'premium' },
            { label: 'Policy/Contract', value: 'policy' },
            { label: 'Security/Shield', value: 'shield' },
            { label: 'Gavel/Law', value: 'gavel' },
            { label: 'Speed/Flash', value: 'speed' },
          ],
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'URL or path to redirect when clicked (e.g., /services/gst-registration)',
          },
        },
      ],
      admin: {
        description: 'Dynamic grid of registration service cards.',
      },
    },
    {
      name: 'ctaSection',
      type: 'group',
      fields: [
        {
          name: 'ctaHeading',
          type: 'text',
          defaultValue: 'Unsure about your requirements?',
        },
        {
          name: 'ctaSubheading',
          type: 'text',
          defaultValue: 'Consult our senior legal partners for a custom compliance roadmap.',
        },
        {
          name: 'ctaButtonText',
          type: 'text',
          defaultValue: 'Talk to a Lawyer',
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/consultation',
        },
      ],
    },
    ...visibilityFields,
  ],
}
