// run_db.js - Uses the pg package bundled with @payloadcms/db-postgres
// Run: node --env-file=.env run_db.js [optional_sql_file]

import { createRequire } from 'module';
import fs from 'fs';

// Try multiple ways to load pg
let pg;
try {
  // Direct import
  pg = await import('pg');
} catch {
  try {
    // Try from payload's postgres adapter
    const require = createRequire(import.meta.url);
    pg = require('pg');
  } catch {
    console.error('❌ Could not find pg module. Run: npm install pg');
    process.exit(1);
  }
}

const Client = pg.default?.Client || pg.Client;

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

async function run() {
  try {
    await client.connect();
    console.log('✅ Connected to Supabase PostgreSQL');
    
    // Accept SQL file as CLI argument, default to fix_all_schema.sql
    const sqlFile = process.argv[2] || 'fix_all_schema.sql';
    const sql = fs.readFileSync(sqlFile, 'utf8');
    console.log(`📄 Executing ${sqlFile}...`);
    
    const result = await client.query(sql);
    console.log('✅ Schema fix executed successfully!');
    console.log('Result:', JSON.stringify(result?.rows || 'Done'));
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.detail) console.error('Detail:', err.detail);
  } finally {
    await client.end();
    console.log('🔌 Disconnected');
  }
}

run();
