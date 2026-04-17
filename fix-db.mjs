import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

async function fixDB() {
  try {
    await client.connect();
    console.log('Connected. Cleaning up orphaned foreign keys...');

    // Delete orphaned trust badges
    const res1 = await client.query(`
      DELETE FROM "pages_blocks_why_choose_us_trust_badges";
    `);
    console.log(`Deleted ${res1.rowCount} orphaned trust badges.`);

    // Delete orphaned benefits
    const res2 = await client.query(`
      DELETE FROM "pages_blocks_why_choose_us_benefits";
    `);
    console.log(`Deleted ${res2.rowCount} orphaned benefits.`);

    // Delete orphaned service highlights (just in case)
    const res3 = await client.query(`
      DELETE FROM "services_highlights";
    `);
    console.log(`Deleted ${res3.rowCount} orphaned services highlights.`);

    const res4 = await client.query(`DELETE FROM "pages_blocks_registration_licenses_cards"`);
    console.log(`Deleted ${res4.rowCount} orphaned registration licenses cards.`);

    const res5 = await client.query(`DELETE FROM "pages_blocks_how_it_works_steps"`);
    console.log(`Deleted ${res5.rowCount} orphaned how it works steps.`);

    const res6 = await client.query(`DELETE FROM "pages_blocks_services_carousel_items_highlights"`);
    console.log(`Deleted ${res6.rowCount} orphaned carousel highlights.`);

    const res7 = await client.query(`DELETE FROM "pages_blocks_services_carousel_items"`);
    console.log(`Deleted ${res7.rowCount} orphaned carousel items.`);

    const res8 = await client.query(`
      UPDATE "lawyers" 
      SET "photo_id" = NULL 
      WHERE "photo_id" IS NOT NULL 
      AND "photo_id" NOT IN (SELECT "id" FROM "lawyer_media");
    `);
    console.log(`Set ${res8.rowCount} orphaned lawyer photo_ids to NULL.`);

    await client.end();
    console.log('Cleanup complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error fixing DB:', err);
    process.exit(1);
  }
}

fixDB();
