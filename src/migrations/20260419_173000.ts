import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration: Add missing relationship columns to services_rels
 *
 * The services_rels table existed with only (parent_id, path, faqs_id).
 * The new layout blocks need pages_id, services_id, locations_id, etc.
 *
 * Each ALTER runs in its own execute() call because pg's prepared-statement
 * protocol does not reliably handle multiple DDL statements in one query string.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "pages_id" integer`)
  await db.execute(sql`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "services_id" integer`)
  await db.execute(sql`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "locations_id" integer`)
  await db.execute(sql`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "faqs_id" integer`)
  await db.execute(sql`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "blogs_id" integer`)
  await db.execute(sql`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "news_id" integer`)
  await db.execute(sql`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "testimonials_id" integer`)
  await db.execute(sql`ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "lawyers_id" integer`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // No-op: removing columns is destructive, intentionally left empty
}
