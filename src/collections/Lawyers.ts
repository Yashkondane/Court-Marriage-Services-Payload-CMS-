import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isPublic } from '@/access/index'

export const Lawyers: CollectionConfig = {
  slug: 'lawyers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'designation', 'isSponsored', 'updatedAt'],
    group: 'Lawyer Management',
    description: 'Manage lawyer profiles, approvals, and sponsored status.',
  },
  access: {
    create: isAdmin, // Only via API or Admin — public registration goes through API route
    read: isPublic,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    // =========================================================================
    // IDENTITY & AUTH
    // =========================================================================
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            width: '50%',
            description: 'URL-friendly name (auto-generated from name)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'text',
          required: true,
          unique: true,
          admin: { 
            width: '50%',
            description: 'Email address (must be unique)',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'supabaseId',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Supabase Auth user ID (auto-linked)',
      },
    },

    // =========================================================================
    // STATUS & ADMIN CONTROLS (Sidebar)
    // =========================================================================
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending_review',
      options: [
        { label: '⏳ Pending Review', value: 'pending_review' },
        { label: '✅ Approved', value: 'approved' },
        { label: '❌ Rejected', value: 'rejected' },
        { label: '🚫 Suspended', value: 'suspended' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Only approved lawyers appear on the public site.',
      },
    },
    {
      name: 'statusNote',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal note (e.g., rejection reason). Not shown to public.',
      },
    },
    {
      name: 'isSponsored',
      type: 'checkbox',
      defaultValue: false,
      label: '⭐ Sponsored',
      admin: {
        position: 'sidebar',
        description: 'Sponsored lawyers get premium placement and a gold badge.',
      },
    },
    {
      name: 'isPremiumPartner',
      type: 'checkbox',
      defaultValue: false,
      label: '💎 Premium Partner',
      admin: {
        position: 'sidebar',
        description: 'Premium partners get additional visibility & branding.',
      },
    },

    // =========================================================================
    // PROFILE
    // =========================================================================
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'lawyer-media',
    },
    {
      name: 'designation',
      type: 'text',
      admin: {
        description: 'e.g., "Senior Advocate", "Family Law Expert"',
      },
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'barCouncilId',
      type: 'text',
      label: 'Bar Council Enrollment No.',
      admin: {
        description: 'Bar Council registration/enrollment number for verification.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'experience',
          type: 'number',
          admin: {
            width: '33%',
            description: 'Years of experience',
          },
        },
        {
          name: 'consultationFee',
          type: 'text',
          admin: {
            width: '33%',
            description: 'e.g., "₹500 - ₹2000"',
          },
        },
        {
          name: 'availableHours',
          type: 'text',
          admin: {
            width: '33%',
            description: 'e.g., "Mon-Fri, 9AM-6PM"',
          },
        },
      ],
    },
    {
      name: 'locationText',
      type: 'text',
      admin: {
        description: 'Display location (e.g., "Connaught Place, New Delhi")',
      },
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      admin: {
        description: 'Link to a city/location for filtering.',
      },
    },

    // =========================================================================
    // LANGUAGES
    // =========================================================================
    {
      name: 'languages',
      type: 'array',
      label: 'Languages Spoken',
      admin: {
        description: 'Languages this lawyer can communicate in.',
      },
      fields: [
        {
          name: 'language',
          type: 'text',
          required: true,
        },
      ],
    },

    // =========================================================================
    // EDUCATION
    // =========================================================================
    {
      name: 'education',
      type: 'array',
      label: 'Education',
      admin: {
        description: 'Law degrees and qualifications.',
      },
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
          admin: { description: 'e.g., "LLB", "LLM", "BA LLB"' },
        },
        {
          name: 'college',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'number',
          admin: { description: 'Year of graduation' },
        },
      ],
    },

    // =========================================================================
    // SPECIALIZATIONS — Linked to Services for filtering
    // =========================================================================
    {
      name: 'specializations',
      type: 'array',
      label: 'Practice Areas / Specializations',
      admin: {
        description: 'Each specialization links to a service. This determines which service pages show this lawyer.',
      },
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
          admin: {
            description: 'Link to a service (e.g., Divorce, Property, Criminal Law)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Custom title (e.g., "Divorce Lawyer", "Property Dispute Expert")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Describe your expertise in this area.',
          },
        },
        {
          name: 'yearsInField',
          type: 'number',
          admin: {
            description: 'Years specializing in this area.',
          },
        },
      ],
    },

    // =========================================================================
    // STATS
    // =========================================================================
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '25%',
            step: 0.1,
            description: 'Average rating (0-5)',
          },
        },
        {
          name: 'ratingCount',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '25%',
            description: 'Total number of reviews',
          },
        },
        {
          name: 'profileViews',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '25%',
            description: 'Total profile page views',
          },
        },
        {
          name: 'responseTime',
          type: 'text',
          defaultValue: 'Typically responds in 1 hour',
          admin: { width: '25%' },
        },
      ],
    },
  ],
}
