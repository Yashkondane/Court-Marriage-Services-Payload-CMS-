import { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const ServicesCarousel: Block = {
  slug: 'servicesCarousel',
  interfaceName: 'ServicesCarouselBlockType',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Lead India Services',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add and reorder services for the carousel. You can also override the default service icon here.',
      },
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
        },
        {
          name: 'overrideIcon',
          type: 'select',
          label: 'Card Icon',
          admin: {
            description: 'Pick a React icon for this card. Leave empty to use the service\'s default icon.',
          },
          options: [
            { label: '— Use Service Default —', value: '' },
            { label: 'Gavel (Judge/Court)', value: 'gavel' },
            { label: 'Handshake (Agreement/Marriage)', value: 'handshake' },
            { label: 'Scale (Justice/Balance)', value: 'scale' },
            { label: 'Building (Corporate/Property)', value: 'building' },
            { label: 'File Contract (Agreements)', value: 'file-contract' },
            { label: 'Shield (Defense/Protection)', value: 'shield' },
            { label: 'User Tie (Professional)', value: 'user-tie' },
            { label: 'Users (Family/Custody)', value: 'users' },
            { label: 'Calculator (Tax/Finance)', value: 'calculator' },
            { label: 'Home (Real Estate)', value: 'home' },
            { label: 'Briefcase (Business)', value: 'briefcase' },
            { label: 'Landmark (Government)', value: 'landmark' },
            { label: 'Money Bill (Finance)', value: 'money-bill' },
            { label: 'Book (Education/Law)', value: 'book' },
            { label: 'Stamp (Certification)', value: 'stamp' },
          ],
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Background Image',
          admin: {
            description: 'Optional: Override the default service banner for this card.',
          },
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'Custom Highlights',
          admin: {
            description: 'Optional: Override the default highlights. If left empty, highlights from the service will be used.',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    ...visibilityFields,
  ],
}
