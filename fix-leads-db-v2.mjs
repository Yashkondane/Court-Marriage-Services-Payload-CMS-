import dotenv from 'dotenv'
dotenv.config()
import { getPayload } from 'payload'
import configPromise from './src/payload.config.js' // Check extension

async function inspect() {
  try {
    const payload = await getPayload({ config: configPromise })
    const db = payload.db
    
    console.log('Inspecting "leads" table columns...')
    const result = await db.drizzle.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'leads';")
    console.log('Columns found:', result.rows)
    
    const queries = [
       'ALTER TABLE "leads" RENAME COLUMN "service" TO "service_id";',
       'ALTER TABLE "leads" RENAME COLUMN "location" TO "location_id";',
       'ALTER TABLE "leads" RENAME COLUMN "lawyer" TO "lawyer_id";'
    ]
    
    for (const q of queries) {
      try {
        console.log(`Executing: ${q}`)
        await db.drizzle.execute(q)
        console.log('Success')
      } catch (e) {
        console.log(`Failed: ${e.message}`)
      }
    }

  } catch (error) {
    console.error('Error:', error)
  }
  process.exit(0)
}

inspect()
