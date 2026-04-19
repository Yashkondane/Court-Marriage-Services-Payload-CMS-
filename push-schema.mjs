/**
 * push-schema.mjs
 * 
 * Pre-build script that forces Payload's Drizzle adapter to push the latest
 * schema to the production database BEFORE `next build` starts.
 * 
 * This is needed because Next.js static generation queries the DB during
 * the build, before Payload's runtime initialization can push the schema.
 */
import { getPayload } from 'payload'
import config from './src/payload.config.ts'

async function pushSchema() {
  console.log('🔄 Pushing Payload schema to database...')
  try {
    // Initializing Payload with push:true will apply the schema before we exit
    const payload = await getPayload({ config })
    console.log('✅ Schema pushed successfully.')
    process.exit(0)
  } catch (err) {
    console.error('❌ Schema push failed:', err)
    process.exit(1)
  }
}

pushSchema()
