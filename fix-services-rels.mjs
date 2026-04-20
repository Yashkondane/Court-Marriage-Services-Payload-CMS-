/**
 * fix-services-rels.mjs
 *
 * Directly connects to the DB via pg and:
 * 1. Adds missing columns to services_rels
 * 2. Creates block tables for any new blocks added to Services or Pages
 *
 * Safe to run multiple times — uses IF NOT EXISTS throughout.
 */
import pg from 'pg'
const { Client } = pg

const client = new Client({
  connectionString: process.env.DATABASE_URI,
  ssl: process.env.DATABASE_URI?.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
})

await client.connect()
console.log('🔌 Connected to database')

await client.query(`
  ALTER TABLE locations 
  ADD COLUMN IF NOT EXISTS show_in_footer boolean,
  ADD COLUMN IF NOT EXISTS footer_order numeric
`);
console.log('Successfully checked/added footer columns to locations.');

// ── 1. services_rels: add missing relationship columns ─────────────────────
const rels_columns = [
  'pages_id',
  'services_id',
  'locations_id',
  'faqs_id',
  'assigned_fa_qs_id',
  'assigned_blogs_id',
  'assigned_news_id',
  'assigned_testimonials_id',
  'assigned_lawyers_id',
  'blogs_id',
  'news_id',
  'testimonials_id',
  'lawyers_id',
]

for (const col of rels_columns) {
  await client.query(`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "${col}" integer`)
  console.log(`  ✓ services_rels.${col}`)
}

// ── 1b. Add new columns to existing hero block tables ──────────────────────
await client.query(`ALTER TABLE "services_blocks_hero" ADD COLUMN IF NOT EXISTS "show_lead_form" boolean DEFAULT false`)
await client.query(`ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "show_lead_form" boolean DEFAULT false`)
console.log('  ✓ *_blocks_hero.show_lead_form columns ready')

// ── 1c. Add search visibility column to services ───────────────────────────
await client.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS show_in_hero_form boolean DEFAULT true`);
await client.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS show_in_footer boolean`);
await client.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS footer_order numeric`);
console.log('Successfully checked/added show_in_hero_form, show_in_footer, and footer_order columns to services.');



// ── 2. Create services_blocks_raw_image if missing ─────────────────────────
await client.query(`
  CREATE TABLE IF NOT EXISTS "services_blocks_raw_image" (
    "_order"                    integer        NOT NULL,
    "_parent_id"                integer        NOT NULL REFERENCES "services"("id") ON DELETE CASCADE,
    "_path"                     text           NOT NULL,
    "id"                        uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
    "image_id"                  integer        REFERENCES "media"("id") ON DELETE SET NULL,
    "alt"                       text,
    "caption"                   text,
    "width"                     varchar(10)    DEFAULT 'content',
    "custom_width"              integer,
    "align"                     varchar(10)    DEFAULT 'center',
    "visibility_show_on_desktop" boolean       DEFAULT true,
    "visibility_show_on_mobile"  boolean       DEFAULT true,
    "visibility_target_type"    text           DEFAULT 'global',
    "block_name"                text
  )
`)
console.log('  ✓ services_blocks_raw_image table ready')

// ── 3. Create pages_blocks_raw_image if missing ────────────────────────────
await client.query(`
  CREATE TABLE IF NOT EXISTS "pages_blocks_raw_image" (
    "_order"                    integer        NOT NULL,
    "_parent_id"                integer        NOT NULL REFERENCES "pages"("id") ON DELETE CASCADE,
    "_path"                     text           NOT NULL,
    "id"                        uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
    "image_id"                  integer        REFERENCES "media"("id") ON DELETE SET NULL,
    "alt"                       text,
    "caption"                   text,
    "width"                     varchar(10)    DEFAULT 'content',
    "custom_width"              integer,
    "align"                     varchar(10)    DEFAULT 'center',
    "visibility_show_on_desktop" boolean       DEFAULT true,
    "visibility_show_on_mobile"  boolean       DEFAULT true,
    "visibility_target_type"    text           DEFAULT 'global',
    "block_name"                text
  )
`)
console.log('  ✓ pages_blocks_raw_image table ready')

await client.end()
console.log('✅ Database patched successfully')
