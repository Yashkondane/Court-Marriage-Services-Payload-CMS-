import pg from 'pg';
import fs from 'fs';
import path from 'path';

// Manually parse .env file since dotenv isn't installed
const envPath = path.resolve('.env');
let dbUri = process.env.DATABASE_URI;
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const match = envFile.match(/^DATABASE_URI=(.*)$/m);
  if (match) {
    dbUri = match[1].trim().replace(/['"]/g, '');
  }
}

const { Client } = pg;

const client = new Client({
  connectionString: dbUri,
  ssl: dbUri?.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
});

async function run() {
  await client.connect();
  console.log('🔌 Connected to database');

  const ghostCols = [
    'assigned_fa_qs_id',
    'assigned_blogs_id',
    'assigned_news_id',
    'assigned_testimonials_id',
    'assigned_lawyers_id'
  ];
  
  console.log('🗑️ Removing empty ghost columns so Payload stops warning you...');
  
  for (const col of ghostCols) {
    try {
      await client.query(`ALTER TABLE "services_rels" DROP COLUMN IF EXISTS "${col}"`);
      console.log(`✅ Dropped column: ${col}`);
    } catch(e) {
      console.log(`⚠️ Could not drop ${col}: ${e.message}`);
    }
  }

  // Drop ghost column from pages_blocks_lawyers_list
  console.log('\n🗑️ Removing ghost selection_source column from pages_blocks_lawyers_list...');
  try {
    await client.query(`ALTER TABLE "pages_blocks_lawyers_list" DROP COLUMN IF EXISTS "selection_source"`);
    console.log('✅ Dropped column: selection_source from pages_blocks_lawyers_list');
  } catch(e) {
    console.log(`⚠️ Could not drop selection_source: ${e.message}`);
  }

  console.log('\n🎉 ALL DONE! The ghost columns are gone. You can now run your push command and the warning will not appear!');
  await client.end();
}

run().catch(console.error);
