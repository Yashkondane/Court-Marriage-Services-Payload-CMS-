-- =============================================================================
-- COMPREHENSIVE SCHEMA FIX V2 - Creates ALL missing tables AND columns
-- =============================================================================

-- =============================================================================
-- A. SERVICES TABLE - Missing columns: ui_icon, menu_order, active_locations
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='ui_icon') THEN
    ALTER TABLE "services" ADD COLUMN "ui_icon" varchar;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='menu_order') THEN
    ALTER TABLE "services" ADD COLUMN "menu_order" numeric;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services_rels' AND column_name='locations_id') THEN
    ALTER TABLE "services_rels" ADD COLUMN "locations_id" integer;
  END IF;
END $$;

-- =============================================================================
-- B. PAGES RELS - Missing columns
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_rels' AND column_name='locations_id') THEN
    ALTER TABLE "pages_rels" ADD COLUMN "locations_id" integer;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_rels' AND column_name='locations_id') THEN
    ALTER TABLE "_pages_v_rels" ADD COLUMN "locations_id" integer;
  END IF;
END $$;

-- =============================================================================
-- C. HIGHLIGHTS BLOCK - Missing columns in versioning table
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_highlights' AND column_name='section_style') THEN
    ALTER TABLE "pages_blocks_highlights" ADD COLUMN "section_style" varchar DEFAULT 'cards';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_highlights' AND column_name='section_style') THEN
    ALTER TABLE "_pages_v_blocks_highlights" ADD COLUMN "section_style" varchar DEFAULT 'cards';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_highlights' AND column_name='layout_style') THEN
    ALTER TABLE "pages_blocks_highlights" ADD COLUMN "layout_style" varchar DEFAULT 'cards';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_highlights' AND column_name='layout_style') THEN
    ALTER TABLE "_pages_v_blocks_highlights" ADD COLUMN "layout_style" varchar DEFAULT 'cards';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_highlights' AND column_name='columns') THEN
    ALTER TABLE "_pages_v_blocks_highlights" ADD COLUMN "columns" varchar DEFAULT '3';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_highlights' AND column_name='columns') THEN
    ALTER TABLE "pages_blocks_highlights" ADD COLUMN "columns" varchar DEFAULT '3';
  END IF;
END $$;

-- =============================================================================
-- D. HERO BLOCK - Missing columns in versioning table
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_hero' AND column_name='layout_style') THEN
    ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "layout_style" varchar DEFAULT 'standard';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_hero' AND column_name='layout_style') THEN
    ALTER TABLE "pages_blocks_hero" ADD COLUMN "layout_style" varchar DEFAULT 'standard';
  END IF;
END $$;

-- =============================================================================
-- E. WHY CHOOSE US - CREATE ENTIRE VERSIONING TABLES
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_why_choose_us" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "subheading" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_why_choose_us_benefits" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'gavel',
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_why_choose_us_trust_badges" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "badge_text" varchar,
  "_uuid" varchar
);

-- Also create main tables if missing
CREATE TABLE IF NOT EXISTS "pages_blocks_why_choose_us" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "subheading" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_why_choose_us_benefits" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'gavel',
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_why_choose_us_trust_badges" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "badge_text" varchar,
  "_uuid" varchar
);

-- =============================================================================
-- F. REGISTRATION & LICENSES - CREATE ENTIRE VERSIONING TABLES
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_registration_licenses" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "badge" varchar,
  "heading" varchar,
  "subheading" varchar,
  "cta_section_cta_heading" varchar,
  "cta_section_cta_subheading" varchar,
  "cta_section_cta_button_text" varchar,
  "cta_section_cta_link" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_registration_licenses_cards" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'wallet',
  "link" varchar,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_registration_licenses" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "badge" varchar,
  "heading" varchar,
  "subheading" varchar,
  "cta_section_cta_heading" varchar,
  "cta_section_cta_subheading" varchar,
  "cta_section_cta_button_text" varchar,
  "cta_section_cta_link" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_registration_licenses_cards" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'wallet',
  "link" varchar,
  "_uuid" varchar
);

-- =============================================================================
-- G. HOW IT WORKS - CREATE ENTIRE VERSIONING TABLES
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_how_it_works" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "process_label" varchar,
  "heading" varchar,
  "background_image_id" integer,
  "quote_text" varchar,
  "cta_text" varchar,
  "cta_link" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_how_it_works_steps" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'gavel',
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_how_it_works" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "process_label" varchar,
  "heading" varchar,
  "background_image_id" integer,
  "quote_text" varchar,
  "cta_text" varchar,
  "cta_link" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_how_it_works_steps" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'gavel',
  "_uuid" varchar
);

-- =============================================================================
-- H. CONSULTATION - CREATE ENTIRE VERSIONING TABLES
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_consultation" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "form_heading" varchar,
  "form_subheading" varchar,
  "image_id" integer,
  "image_heading" varchar,
  "image_subheading" varchar,
  "trust_text" varchar,
  "cta_button_text" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_consultation" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "form_heading" varchar,
  "form_subheading" varchar,
  "image_id" integer,
  "image_heading" varchar,
  "image_subheading" varchar,
  "trust_text" varchar,
  "cta_button_text" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- I. CREATE INDEXES for the new versioning tables (Payload needs these)
-- =============================================================================

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_order_idx" ON "_pages_v_blocks_why_choose_us" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_parent_id_idx" ON "_pages_v_blocks_why_choose_us" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_path_idx" ON "_pages_v_blocks_why_choose_us" ("_path");

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_wcu_benefits_order_idx" ON "_pages_v_blocks_why_choose_us_benefits" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_wcu_benefits_parent_id_idx" ON "_pages_v_blocks_why_choose_us_benefits" ("_parent_id");

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_wcu_badges_order_idx" ON "_pages_v_blocks_why_choose_us_trust_badges" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_wcu_badges_parent_id_idx" ON "_pages_v_blocks_why_choose_us_trust_badges" ("_parent_id");

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reg_lic_order_idx" ON "_pages_v_blocks_registration_licenses" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reg_lic_parent_id_idx" ON "_pages_v_blocks_registration_licenses" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reg_lic_path_idx" ON "_pages_v_blocks_registration_licenses" ("_path");

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reg_lic_cards_order_idx" ON "_pages_v_blocks_registration_licenses_cards" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reg_lic_cards_parent_idx" ON "_pages_v_blocks_registration_licenses_cards" ("_parent_id");

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiw_order_idx" ON "_pages_v_blocks_how_it_works" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiw_parent_id_idx" ON "_pages_v_blocks_how_it_works" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiw_path_idx" ON "_pages_v_blocks_how_it_works" ("_path");

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiw_steps_order_idx" ON "_pages_v_blocks_how_it_works_steps" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hiw_steps_parent_idx" ON "_pages_v_blocks_how_it_works_steps" ("_parent_id");

CREATE INDEX IF NOT EXISTS "_pages_v_blocks_consult_order_idx" ON "_pages_v_blocks_consultation" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_consult_parent_id_idx" ON "_pages_v_blocks_consultation" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_consult_path_idx" ON "_pages_v_blocks_consultation" ("_path");

-- Also indexes for main block tables
CREATE INDEX IF NOT EXISTS "pages_blocks_wcu_order_idx" ON "pages_blocks_why_choose_us" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_wcu_parent_id_idx" ON "pages_blocks_why_choose_us" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_wcu_path_idx" ON "pages_blocks_why_choose_us" ("_path");

CREATE INDEX IF NOT EXISTS "pages_blocks_wcu_benefits_order_idx" ON "pages_blocks_why_choose_us_benefits" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_wcu_benefits_parent_idx" ON "pages_blocks_why_choose_us_benefits" ("_parent_id");

CREATE INDEX IF NOT EXISTS "pages_blocks_wcu_badges_order_idx" ON "pages_blocks_why_choose_us_trust_badges" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_wcu_badges_parent_idx" ON "pages_blocks_why_choose_us_trust_badges" ("_parent_id");

CREATE INDEX IF NOT EXISTS "pages_blocks_reg_lic_order_idx" ON "pages_blocks_registration_licenses" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_reg_lic_parent_id_idx" ON "pages_blocks_registration_licenses" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_reg_lic_path_idx" ON "pages_blocks_registration_licenses" ("_path");

CREATE INDEX IF NOT EXISTS "pages_blocks_reg_lic_cards_order_idx" ON "pages_blocks_registration_licenses_cards" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_reg_lic_cards_parent_idx" ON "pages_blocks_registration_licenses_cards" ("_parent_id");

CREATE INDEX IF NOT EXISTS "pages_blocks_hiw_order_idx" ON "pages_blocks_how_it_works" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_hiw_parent_id_idx" ON "pages_blocks_how_it_works" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_hiw_path_idx" ON "pages_blocks_how_it_works" ("_path");

CREATE INDEX IF NOT EXISTS "pages_blocks_hiw_steps_order_idx" ON "pages_blocks_how_it_works_steps" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_hiw_steps_parent_idx" ON "pages_blocks_how_it_works_steps" ("_parent_id");

CREATE INDEX IF NOT EXISTS "pages_blocks_consult_order_idx" ON "pages_blocks_consultation" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_consult_parent_id_idx" ON "pages_blocks_consultation" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_consult_path_idx" ON "pages_blocks_consultation" ("_path");

-- =============================================================================
-- DONE!
-- =============================================================================
SELECT 'V2 Schema fix complete - all tables and columns created!' AS status;
