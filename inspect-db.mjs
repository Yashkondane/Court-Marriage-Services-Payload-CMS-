import dotenv from 'dotenv'
dotenv.config()
import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function inspectSchema() {
  const payload = await getPayload({ config: configPromise })
  const db = payload.db
  
  try {
    // We can run a raw SQL query to get column names for the 'leads' table
    const result = await db.drizzle.execute('SELECT column_name FROM information_schema.columns WHERE table_name = \'leads\';')
    console.log('Columns in "leads" table:')
    console.log(JSON.stringify(result.rows, null, 2))
  } catch (error) {
    console.error('Error inspecting schema:', error)
  }
  process.exit(0)
}

inspectSchema()
