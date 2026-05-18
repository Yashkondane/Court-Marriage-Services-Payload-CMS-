import type { Block } from 'payload'
import { visibilityFields } from './shared/visibilityFields'

export const LawyersList: Block = {
  slug: 'lawyersList',
  labels: {
    singular: 'Lawyers List Directory',
    plural: 'Lawyers List Directories',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Consult with the Best Lawyers & Advocates in India',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'Navigating legal matters can be daunting, but with the best lawyers in India, you can secure the expert guidance you need. We connect individuals and businesses with top-rated advocates and legal experts.',
    },
    {
      name: 'onlineCountText',
      type: 'text',
      defaultValue: '104+ Lawyers Online',
    },
    {
      name: 'accentImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Right Accent Image (Hero Card)',
      admin: {
        description: 'Upload a custom premium transparent/dark accent image to display on the right of the directory hero card. Fallback is the golden Scales of Justice.',
      },
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: true,
    },
    // Left bottom choice section
    {
      name: 'whyChooseHeading',
      type: 'text',
      defaultValue: "Why Choose Our Lawyers & Advocates?",
    },
    {
      name: 'whyChoosePoints',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    // Left bottom FAQs
    {
      name: 'faqsHeading',
      type: 'text',
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
    // Left bottom Testimonials
    {
      name: 'reviewsHeading',
      type: 'text',
      defaultValue: "Client's Reviews",
    },
    {
      name: 'reviews',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
    // Sidebar Group 1: Consultation Pricing
    {
      name: 'consultationWidget',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Consult a Lawyer' },
        { name: 'subheading', type: 'text', defaultValue: 'No Minutes Limit' },
        { name: 'price', type: 'text', defaultValue: '1000' },
        { name: 'originalPrice', type: 'text', defaultValue: '2000' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    // Sidebar Group 2: Help & Contacts
    {
      name: 'helpContactWidget',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Need Help?' },
        { name: 'phone', type: 'text', defaultValue: '+91-8800 788 535' },
        { name: 'timings', type: 'text', defaultValue: 'Timing: 9AM to 8PM' },
        { name: 'callbackText', type: 'text', defaultValue: 'Arrange a Callback' },
      ],
    },
    ...visibilityFields,
  ],
}
