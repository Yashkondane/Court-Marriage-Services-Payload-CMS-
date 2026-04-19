/**
 * fix-services-rels.mjs
 * 
 * Directly connects to the DB via pg and adds the missing columns to services_rels.
 * This runs BEFORE next build as a prebuild step, bypassing Payload's migration system.
 * Safe to run multiple times — uses ADD COLUMN IF NOT EXISTS.
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

const columns = [
  'pages_id',
  'services_id',
  'locations_id',
  'faqs_id',
  'blogs_id',
  'news_id',
  'testimonials_id',
  'lawyers_id',
]

for (const col of columns) {
  await client.query(`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "${col}" integer`)
  console.log(`  ✓ services_rels.${col}`)
}

await client.end()
console.log('✅ services_rels columns patched successfully')
