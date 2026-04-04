-- =============================================================================
-- COMPREHENSIVE SCHEMA FIX for VakilFirst / Payload CMS
-- Adds ALL missing columns to both main tables and versioning (_v) tables.
-- Safe to run multiple times - uses DO blocks with IF NOT EXISTS checks.
-- =============================================================================

-- =============================================================================
-- 1. HIGHLIGHTS BLOCK - Fix "section_style" (renamed from "layout_style")
--    The versioning table never got either column.
-- =============================================================================

-- Main table: pages_blocks_highlights
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_highlights' AND column_name='section_style') THEN
    ALTER TABLE "pages_blocks_highlights" ADD COLUMN "section_style" text DEFAULT 'cards';
  END IF;
END $$;

-- Versioning table: _pages_v_blocks_highlights
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_highlights' AND column_name='section_style') THEN
    ALTER TABLE "_pages_v_blocks_highlights" ADD COLUMN "section_style" text DEFAULT 'cards';
  END IF;
END $$;

-- Also add the OLD "layout_style" column in case Payload references it during transition
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_highlights' AND column_name='layout_style') THEN
    ALTER TABLE "pages_blocks_highlights" ADD COLUMN "layout_style" text DEFAULT 'cards';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_highlights' AND column_name='layout_style') THEN
    ALTER TABLE "_pages_v_blocks_highlights" ADD COLUMN "layout_style" text DEFAULT 'cards';
  END IF;
END $$;

-- =============================================================================
-- 2. HERO BLOCK - Ensure "layout_style" exists in versioning table
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_hero' AND column_name='layout_style') THEN
    ALTER TABLE "pages_blocks_hero" ADD COLUMN "layout_style" text DEFAULT 'standard';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_hero' AND column_name='layout_style') THEN
    ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "layout_style" text DEFAULT 'standard';
  END IF;
END $$;

-- =============================================================================
-- 3. SERVICES RELS - Add "locations_id" to the services relationship table
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services_rels' AND column_name='locations_id') THEN
    ALTER TABLE "services_rels" ADD COLUMN "locations_id" integer;
  END IF;
END $$;

-- =============================================================================
-- 4. PAGES RELS (versioning) - Add "locations_id" to the pages_v rels table
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_rels' AND column_name='locations_id') THEN
    ALTER TABLE "_pages_v_rels" ADD COLUMN "locations_id" integer;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_rels' AND column_name='locations_id') THEN
    ALTER TABLE "pages_rels" ADD COLUMN "locations_id" integer;
  END IF;
END $$;

-- =============================================================================
-- 5. WHY CHOOSE US BLOCK - Ensure versioning tables exist with all columns
-- =============================================================================

-- These were newly added blocks, their _v tables may be incomplete
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_why_choose_us' AND column_name='heading') THEN
    ALTER TABLE "_pages_v_blocks_why_choose_us" ADD COLUMN "heading" text;
  END IF;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- =============================================================================
-- 6. REGISTRATION LICENSES BLOCK - Ensure versioning table columns
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_registration_licenses' AND column_name='badge') THEN
    ALTER TABLE "_pages_v_blocks_registration_licenses" ADD COLUMN "badge" text;
  END IF;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- =============================================================================
-- 7. HOW IT WORKS BLOCK - Ensure versioning table columns
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_how_it_works' AND column_name='process_label') THEN
    ALTER TABLE "_pages_v_blocks_how_it_works" ADD COLUMN "process_label" text;
  END IF;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- =============================================================================
-- 8. CONSULTATION BLOCK - Ensure versioning table columns
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_consultation' AND column_name='form_heading') THEN
    ALTER TABLE "_pages_v_blocks_consultation" ADD COLUMN "form_heading" text;
  END IF;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- =============================================================================
-- 9. HIGHLIGHTS "columns" field in versioning
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_highlights' AND column_name='columns') THEN
    ALTER TABLE "_pages_v_blocks_highlights" ADD COLUMN "columns" text DEFAULT '3';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_highlights' AND column_name='columns') THEN
    ALTER TABLE "pages_blocks_highlights" ADD COLUMN "columns" text DEFAULT '3';
  END IF;
END $$;

-- =============================================================================
-- DONE! All missing columns should now exist.
-- =============================================================================
SELECT 'Schema fix complete!' AS status;
