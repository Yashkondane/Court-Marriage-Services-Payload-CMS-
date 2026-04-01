import pg from 'pg';
import fs from 'fs';

const client = new pg.Client({
  connectionString: process.env.DATABASE_URI,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to DB');
    const sql = fs.readFileSync('fix_hero.sql', 'utf8');
    await client.query(sql);
    console.log('✅ Executed fix_hero.sql successfully!');
  } catch (err) {
    console.error('❌ Error executing SQL:', err.message);
  } finally {
    await client.end();
  }
}

run();
