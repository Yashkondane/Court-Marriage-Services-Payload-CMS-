-- =============================================================================
-- V4.0 - LAWYERS COLLECTION: Extended fields for self-registration system
-- =============================================================================
-- Run this AFTER fix_all_schema.sql

-- Add new columns to lawyers table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='supabase_id') THEN
    ALTER TABLE "lawyers" ADD COLUMN "supabase_id" varchar;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='status') THEN
    ALTER TABLE "lawyers" ADD COLUMN "status" varchar DEFAULT 'pending_review';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='status_note') THEN
    ALTER TABLE "lawyers" ADD COLUMN "status_note" varchar;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='bar_council_id') THEN
    ALTER TABLE "lawyers" ADD COLUMN "bar_council_id" varchar;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='consultation_fee') THEN
    ALTER TABLE "lawyers" ADD COLUMN "consultation_fee" varchar;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='available_hours') THEN
    ALTER TABLE "lawyers" ADD COLUMN "available_hours" varchar;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='location_id') THEN
    ALTER TABLE "lawyers" ADD COLUMN "location_id" integer;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='profile_views') THEN
    ALTER TABLE "lawyers" ADD COLUMN "profile_views" numeric DEFAULT 0;
  END IF;
END $$;

-- Create unique index on supabase_id
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'lawyers_supabase_id_idx') THEN
    CREATE UNIQUE INDEX "lawyers_supabase_id_idx" ON "lawyers" ("supabase_id");
  END IF;
END $$;

-- Create unique index on email
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'lawyers_email_idx') THEN
    CREATE UNIQUE INDEX "lawyers_email_idx" ON "lawyers" ("email");
  END IF;
END $$;

-- =============================================================================
-- LANGUAGES sub-table
-- =============================================================================
CREATE TABLE IF NOT EXISTS "lawyers_languages" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "language" varchar
);
CREATE INDEX IF NOT EXISTS "lawyers_languages_order_idx" ON "lawyers_languages" ("_order");
CREATE INDEX IF NOT EXISTS "lawyers_languages_parent_idx" ON "lawyers_languages" ("_parent_id");

-- =============================================================================
-- EDUCATION sub-table
-- =============================================================================
CREATE TABLE IF NOT EXISTS "lawyers_education" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "degree" varchar,
  "college" varchar,
  "year" numeric
);
CREATE INDEX IF NOT EXISTS "lawyers_education_order_idx" ON "lawyers_education" ("_order");
CREATE INDEX IF NOT EXISTS "lawyers_education_parent_idx" ON "lawyers_education" ("_parent_id");

-- =============================================================================
-- SPECIALIZATIONS sub-table (replaces old simple specializations)
-- First drop old table if it exists with simple schema, then create new one
-- =============================================================================

-- Check if the old specializations table has a 'service_id' column
-- If not, we need to drop and recreate it
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='lawyers_specializations')
  AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers_specializations' AND column_name='service_id') THEN
    DROP TABLE "lawyers_specializations";
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "lawyers_specializations" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "service_id" integer,
  "title" varchar,
  "description" varchar,
  "years_in_field" numeric
);
CREATE INDEX IF NOT EXISTS "lawyers_specs_order_idx" ON "lawyers_specializations" ("_order");
CREATE INDEX IF NOT EXISTS "lawyers_specs_parent_idx" ON "lawyers_specializations" ("_parent_id");
CREATE INDEX IF NOT EXISTS "lawyers_specs_service_idx" ON "lawyers_specializations" ("service_id");

-- =============================================================================
-- Update the rels table for service relationships
-- =============================================================================
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers_rels' AND column_name='services_id') THEN
    ALTER TABLE "lawyers_rels" ADD COLUMN "services_id" integer;
  END IF;
END $$;

-- =============================================================================
-- DONE! V4.0 - Lawyer self-registration schema ready
-- =============================================================================
SELECT 'V4.0 COMPLETE - Lawyer registration schema ready!' AS status;
