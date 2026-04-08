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

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Web Page',
    plural: 'Web Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Web Pages',
  },
  versions: false,
  access: {
    create: isAdmin,
    read: isPublic,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeOperation: [
      async ({ operation, req }) => {
        // Auto-heal ALL Postgres sequences for pages + block/array sub-tables
        // before every create/update. This prevents the "Value must be unique: id"
        // error caused by desynchronized auto-increment counters after partial
        // transaction rollbacks.
        if (operation === 'create' || operation === 'update') {
          try {
            const pool = (req.payload.db as any).pool;
            if (pool?.query) {
              await pool.query(`
                DO $$
                DECLARE
                  r RECORD;
                  tbl TEXT;
                  max_val BIGINT;
                BEGIN
                  FOR r IN
                    SELECT c.relname AS seqname
                    FROM pg_class c
                    WHERE c.relkind = 'S'
                      AND c.relname LIKE 'pages%'
                  LOOP
                    tbl := replace(r.seqname, '_id_seq', '');
                    BEGIN
                      EXECUTE format(
                        'SELECT COALESCE(MAX(id), 0) FROM %I', tbl
                      ) INTO max_val;
                      PERFORM setval(r.seqname, max_val + 1, false);
                    EXCEPTION WHEN OTHERS THEN
                      NULL;
                    END;
                  END LOOP;
                END $$;
              `);
            }
          } catch (_e) {
            // Non-fatal: sequence might already be correct
          }
        }
      },
    ],
    beforeValidate: [
      ({ data }) => {
        const { randomUUID } = require('crypto');
        const seen = new Set<string>();

        // Recursively walk any object/array and regenerate every `id` field
        // that Payload uses for blocks and array items (string UUIDs).
        function sanitize(obj: any): void {
          if (!obj || typeof obj !== 'object') return;

          if (Array.isArray(obj)) {
            for (const item of obj) {
              if (item && typeof item === 'object') {
                // Every Payload array-item / block has a string `id`
                if (typeof item.id === 'string') {
                  if (!item.id || seen.has(item.id)) {
                    item.id = randomUUID();
                  }
                  seen.add(item.id);
                }
                // Recurse into all nested fields
                sanitize(item);
              }
            }
          } else {
            for (const key of Object.keys(obj)) {
              if (key === 'id') continue; // already handled above
              const val = obj[key];
              if (Array.isArray(val)) {
                sanitize(val);
              } else if (val && typeof val === 'object' && !Buffer.isBuffer(val)) {
                sanitize(val);
              }
            }
          }
        }

        if (data?.layout) {
          sanitize(data.layout);
        }
        return data;
      },
    ],
  },
  fields: [

    {
      type: 'tabs',
      tabs: [
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
                description: 'URL path for this page. For dynamic pages, this is auto-generated.',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              required: true,
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
                CodeSnippet,
                Logos,

                Documents,
              ],
              admin: {
                description: '🎨 Build your webpage here! Click "Add Block" below to stack sections. ⚠️ CRITICAL WARNING: If you forget a required field, hit Save, and get an error, DO NOT hit save again. Delete the blocks and re-add them, or start a new page, otherwise it will crash the save pipeline!',
              },
            },
          ],
        },
        {
          label: 'Relations',
          fields: [
            {
              name: 'service',
              type: 'relationship',
              relationTo: 'services',
              admin: {
                description: '🔗 Only fill this out if this is a dedicated Service Page (e.g., "Court Marriage Services"). Links this page to that parent service.',
              },
            },
            {
              name: 'location',
              type: 'relationship',
              relationTo: 'locations',
              admin: {
                description: '📍 Only fill this out if this is a dedicated Location Page (e.g., "Lawyers in Delhi").',
              },
            },
            {
              name: 'assignedBlogs',
              type: 'relationship',
              relationTo: 'blogs',
              hasMany: true,
              admin: {
                description: 'Manually assign blogs to show on this page',
              },
            },
            {
              name: 'assignedNews',
              type: 'relationship',
              relationTo: 'news',
              hasMany: true,
              admin: {
                description: 'Manually assign news to show on this page',
              },
            },
            {
              name: 'assignedFAQs',
              type: 'relationship',
              relationTo: 'faqs',
              hasMany: true,
              admin: {
                description: 'Manually assign FAQs to show on this page',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: [
                { name: 'metaTitle', type: 'text', label: 'Meta Title' },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: 'Meta Description',
                },
                {
                  name: 'keywords',
                  type: 'text',
                  label: 'Keywords (comma separated)',
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'OG Image',
                },
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
                {
                  name: 'schemaMarkup',
                  type: 'json',
                  label: 'Schema Markup (JSON-LD)',
                },
              ],
            },
          ],
        },
      ],
    },
    // Sidebar
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'pageType',
      type: 'select',
      defaultValue: 'custom',
      options: [
        { label: 'Custom Page', value: 'custom' },
        { label: 'Service Page', value: 'service' },
        { label: 'Location Page', value: 'location' },
        { label: 'Service + Location', value: 'serviceLocation' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Use Custom Page for Homepage, About, Contact, etc.',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
}
