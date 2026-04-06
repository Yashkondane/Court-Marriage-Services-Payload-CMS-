-- =============================================================================
-- V4.0 - LAWYERS COLLECTION: Extended fields for self-registration system
-- =============================================================================

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

-- Create unique index on email (skip if already exists)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'lawyers_email_idx') THEN
    CREATE UNIQUE INDEX "lawyers_email_idx" ON "lawyers" ("email");
  END IF;
END $$;

-- =============================================================================
-- LANGUAGES sub-table
-- _parent_id must be INTEGER to match lawyers.id
-- =============================================================================
DROP TABLE IF EXISTS "lawyers_languages";
CREATE TABLE "lawyers_languages" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "language" varchar
);
CREATE INDEX "lawyers_languages_order_idx" ON "lawyers_languages" ("_order");
CREATE INDEX "lawyers_languages_parent_idx" ON "lawyers_languages" ("_parent_id");

-- =============================================================================
-- EDUCATION sub-table
-- _parent_id must be INTEGER to match lawyers.id
-- =============================================================================
DROP TABLE IF EXISTS "lawyers_education";
CREATE TABLE "lawyers_education" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "degree" varchar,
  "college" varchar,
  "year" numeric
);
CREATE INDEX "lawyers_education_order_idx" ON "lawyers_education" ("_order");
CREATE INDEX "lawyers_education_parent_idx" ON "lawyers_education" ("_parent_id");

-- =============================================================================
-- SPECIALIZATIONS sub-table (service-linked)
-- _parent_id must be INTEGER to match lawyers.id
-- =============================================================================
DROP TABLE IF EXISTS "lawyers_specializations";
CREATE TABLE "lawyers_specializations" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "service_id" integer,
  "title" varchar,
  "description" varchar,
  "years_in_field" numeric
);
CREATE INDEX "lawyers_specs_order_idx" ON "lawyers_specializations" ("_order");
CREATE INDEX "lawyers_specs_parent_idx" ON "lawyers_specializations" ("_parent_id");
CREATE INDEX "lawyers_specs_service_idx" ON "lawyers_specializations" ("service_id");

-- =============================================================================
-- Ensure rels table has services_id column
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
