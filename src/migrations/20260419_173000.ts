import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration: Add missing relationship columns to services_rels
 *
 * The services_rels table already existed with only basic columns (parent_id, path, faqs_id).
 * The new layout blocks in the Services collection require additional relationship columns.
 * We use ADD COLUMN IF NOT EXISTS so this is safe to run multiple times.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "pages_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "services_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "locations_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "faqs_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "blogs_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "testimonials_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "lawyers_id" integer;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // No-op: removing columns is destructive, skip
}
