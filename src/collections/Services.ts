import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isPublic } from '@/access/index'
import { Hero } from '@/blocks/Hero'
import { RichContent } from '@/blocks/RichContent'
import { FAQ } from '@/blocks/FAQ'
import { Highlights } from '@/blocks/Highlights'
import { WhyChooseUs } from '@/blocks/WhyChooseUs'
import { RegistrationLicenses } from '@/blocks/RegistrationLicenses'
import { HowItWorks } from '@/blocks/HowItWorks'
import { Consultation } from '@/blocks/Consultation'
import { CTA } from '@/blocks/CTA'
import { BlogFeed } from '@/blocks/BlogFeed'
import { NewsFeed } from '@/blocks/NewsFeed'
import { GalleryBlock } from '@/blocks/GalleryBlock'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock'
import { ServicesCarousel } from '@/blocks/ServicesCarousel'
import { LawyersCarousel } from '@/blocks/LawyersCarousel'
import { CodeSnippet } from '@/blocks/CodeSnippet'
import { Logos } from '@/blocks/Logos'
import { Documents } from '@/blocks/Documents'
import { LawyersList } from '@/blocks/LawyersList'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Legal Services',
  },
  access: {
    create: isAdmin,
    read: isPublic,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    // ── Tabs ────────────────────────────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        // ── Content Tab ─────────────────────────────────────────────────────
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description: 'URL-friendly identifier (e.g., "court-marriage-lawyer")',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Hero,
                RichContent,
                FAQ,
                Highlights,
                WhyChooseUs,
                RegistrationLicenses,
                HowItWorks,
                Consultation,
                CTA,
                BlogFeed,
                NewsFeed,
                GalleryBlock,
                TestimonialsBlock,
                ServicesCarousel,
                LawyersCarousel,
                LawyersList,
                CodeSnippet,
                Logos,
                Documents,
              ],
              admin: {
                description: '🎨 Build this service page using flexible blocks — just like Pages.',
              },
            },
          ],
        },

        // ── Relations Tab ───────────────────────────────────────────────────
        {
          label: 'Relations',
          fields: [
            {
              name: 'assignedFAQs',
              type: 'relationship',
              relationTo: 'faqs',
              hasMany: true,
              admin: {
                description: '📋 Assign FAQs to show on this service page (used by the FAQ block in auto mode).',
              },
            },
            {
              name: 'assignedBlogs',
              type: 'relationship',
              relationTo: 'blogs',
              hasMany: true,
              admin: {
                description: '📰 Manually assign blog posts to feature on this service page.',
              },
            },
            {
              name: 'assignedNews',
              type: 'relationship',
              relationTo: 'news',
              hasMany: true,
              admin: {
                description: '📣 Manually assign news articles to feature on this service page.',
              },
            },
            {
              name: 'assignedTestimonials',
              type: 'relationship',
              relationTo: 'testimonials',
              hasMany: true,
              admin: {
                description: '⭐ Manually assign testimonials to feature on this service page.',
              },
            },
            {
              name: 'assignedLawyers',
              type: 'relationship',
              relationTo: 'lawyers',
              hasMany: true,
              admin: {
                description: '👨‍⚖️ Highlight specific lawyers for this service.',
              },
            },
          ],
        },

        // ── SEO Tab ─────────────────────────────────────────────────────────
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: [
                { name: 'metaTitle', type: 'text', label: 'Meta Title' },
                { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
                { name: 'keywords', type: 'text', label: 'Keywords (comma separated)' },
                { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'OG Image' },
                { name: 'canonicalUrl', type: 'text', label: 'Canonical URL' },
                {
                  name: 'robotsMeta',
                  type: 'select',
                  label: 'Robots Meta',
                  defaultValue: 'index,follow',
                  options: [
                    { label: 'Index, Follow', value: 'index,follow' },
                    { label: 'No Index, Follow', value: 'noindex,follow' },
                    { label: 'Index, No Follow', value: 'index,nofollow' },
                    { label: 'No Index, No Follow', value: 'noindex,nofollow' },
                  ],
                },
                { name: 'schemaMarkup', type: 'json', label: 'Schema Markup (JSON-LD)' },
              ],
            },
          ],
        },
      ],
    },

    // ── Sidebar fields ───────────────────────────────────────────────────────
    {
      name: 'activeLocations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Select the cities where this service is actively offered.',
      },
    },
    {
      name: 'showInHeader',
      type: 'checkbox',
      label: 'Show in Main Navigation Dropdown',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'If enabled, this service will appear in the "Services" menu in the header.',
      },
    },
    {
      name: 'showInFooter',
      type: 'checkbox',
      label: 'Show in Footer Links',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'If enabled, this service will appear in the footer links.',
      },
    },
    {
      name: 'footerOrder',
      type: 'number',
      label: 'Footer Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        condition: (data) => data.showInFooter,
      },
    },
    {
      name: 'showInHeroForm',
      type: 'checkbox',
      label: 'Show in Hero Lead/Search Forms',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'If disabled, this service will NOT appear in the hero search bar or lead capture dropdowns.',
      },
    },
    {
      name: 'menuOrder',
      type: 'number',
      label: 'Menu Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first in the dropdown.',
        condition: (data) => data.showInHeader,
      },
    },
    {
      name: 'navDropdown',
      type: 'select',
      label: 'Dropdown Menu',
      admin: {
        position: 'sidebar',
        description: 'Which mega-dropdown should this appear in?',
        condition: (data) => data.showInHeader,
      },
      options: [
        { label: 'Find A Lawyer', value: 'find-a-lawyer' },
        { label: 'Legal Matter', value: 'legal-matter' },
        { label: 'None (simple link)', value: 'none' },
      ],
    },
    {
      name: 'navCategory',
      type: 'text',
      label: 'Category Heading',
      admin: {
        position: 'sidebar',
        description: 'Group heading inside the dropdown (e.g. "Family / Personal").',
        condition: (data) => data.showInHeader && data.navDropdown && data.navDropdown !== 'none',
      },
    },
    {
      name: 'navCategoryOrder',
      type: 'number',
      label: 'Category Sort Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Controls the order of categories in the dropdown. Lower = first.',
        condition: (data) => data.showInHeader && data.navDropdown && data.navDropdown !== 'none',
      },
    },
    {
      name: 'navLabel',
      type: 'text',
      label: 'Custom Nav Label',
      admin: {
        position: 'sidebar',
        description: 'Custom label shown in the dropdown (leave blank to use the service title).',
        condition: (data) => data.showInHeader,
      },
    },
    {
      name: 'uiIcon',
      type: 'select',
      label: 'Native Legal Icon',
      admin: {
        description: 'Select a highly optimized SVG icon for navigation cards.',
        position: 'sidebar',
      },
      options: [
        { label: 'Gavel (Judge/Court)', value: 'gavel' },
        { label: 'Handshake (Agreement/Marriage)', value: 'handshake' },
        { label: 'Scale (Justice/Balance)', value: 'scale' },
        { label: 'Building (Corporate/Property)', value: 'building' },
        { label: 'File Contract (Agreements/Documentation)', value: 'file-contract' },
        { label: 'Shield (Defense/Protection)', value: 'shield' },
        { label: 'User Tie (Professional/Consultation)', value: 'user-tie' },
        { label: 'Users (Family/Custody)', value: 'users' },
        { label: 'Calculator (Tax/Finance)', value: 'calculator' },
        { label: 'Home (Real Estate)', value: 'home' },
        { label: 'Briefcase (Business)', value: 'briefcase' },
        { label: 'Landmark (Government/Tax)', value: 'landmark' },
        { label: 'Money Bill (Finance)', value: 'money-bill' },
        { label: 'Book (Education/Law Book)', value: 'book' },
        { label: 'Stamp (Certification)', value: 'stamp' },
      ],
    },
  ],
}
