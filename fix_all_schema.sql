-- =============================================================================
-- COMPREHENSIVE SCHEMA FIX V3 - Creates ALL missing _pages_v versioning tables
-- This covers EVERY block type registered in the Pages collection.
-- All statements use IF NOT EXISTS so they are safe to re-run.
-- =============================================================================

-- =============================================================================
-- A. SERVICES TABLE - Missing columns
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
-- B. PAGES/VERSIONS RELS - Missing columns
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

-- pages_rels: lawyers_id
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_rels' AND column_name='lawyers_id') THEN
    ALTER TABLE "pages_rels" ADD COLUMN "lawyers_id" integer;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_rels' AND column_name='lawyers_id') THEN
    ALTER TABLE "_pages_v_rels" ADD COLUMN "lawyers_id" integer;
  END IF;
END $$;

-- pages_rels: blogs_id
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_rels' AND column_name='blogs_id') THEN
    ALTER TABLE "pages_rels" ADD COLUMN "blogs_id" integer;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_rels' AND column_name='blogs_id') THEN
    ALTER TABLE "_pages_v_rels" ADD COLUMN "blogs_id" integer;
  END IF;
END $$;

-- pages_rels: news_id
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_rels' AND column_name='news_id') THEN
    ALTER TABLE "pages_rels" ADD COLUMN "news_id" integer;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_rels' AND column_name='news_id') THEN
    ALTER TABLE "_pages_v_rels" ADD COLUMN "news_id" integer;
  END IF;
END $$;

-- pages_rels: testimonials_id
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_rels' AND column_name='testimonials_id') THEN
    ALTER TABLE "pages_rels" ADD COLUMN "testimonials_id" integer;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_rels' AND column_name='testimonials_id') THEN
    ALTER TABLE "_pages_v_rels" ADD COLUMN "testimonials_id" integer;
  END IF;
END $$;

-- services_rels: lawyers_id (for LawyersCarousel block relationships)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_rels' AND column_name='gallery_id') THEN
    ALTER TABLE "pages_rels" ADD COLUMN "gallery_id" integer;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_rels' AND column_name='gallery_id') THEN
    ALTER TABLE "_pages_v_rels" ADD COLUMN "gallery_id" integer;
  END IF;
END $$;

-- =============================================================================
-- C. HIGHLIGHTS BLOCK - Missing columns
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
-- D. HERO BLOCK - Missing columns
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
-- E. WHY CHOOSE US - Versioning tables
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
-- F. REGISTRATION & LICENSES - Versioning tables
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
-- G. HOW IT WORKS - Versioning tables
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
-- H. CONSULTATION - Versioning tables
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
-- I. LAWYERS CAROUSEL - Versioning tables (THE CURRENTLY FAILING ONE)
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_lawyers_carousel" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "autoplay" boolean DEFAULT true,
  "interval" numeric DEFAULT 5000,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_lawyers_carousel" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "autoplay" boolean DEFAULT true,
  "interval" numeric DEFAULT 5000,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- J. SERVICES CAROUSEL - Versioning tables (3 levels deep)
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_carousel" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_carousel_items" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "service_id" integer,
  "custom_icon_id" integer,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_carousel_items_highlights" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "text" varchar,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_services_carousel" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_services_carousel_items" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "service_id" integer,
  "custom_icon_id" integer,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_services_carousel_items_highlights" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "text" varchar,
  "_uuid" varchar
);

-- =============================================================================
-- K. CODE SNIPPET - Versioning tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_code_snippet" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "identifier" varchar,
  "html_code" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_code_snippet" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "identifier" varchar,
  "html_code" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- L. LOGOS - Versioning tables (with nested logos array)
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_logos" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_logos_logos" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "image_id" integer,
  "link" varchar,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_logos" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_logos_logos" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "image_id" integer,
  "link" varchar,
  "_uuid" varchar
);

-- =============================================================================
-- M. LAWYER LIST - Versioning tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_lawyer_list" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "subheading" varchar,
  "limit" numeric,
  "show_bio" boolean DEFAULT true,
  "show_contact" boolean DEFAULT true,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_lawyer_list" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "subheading" varchar,
  "limit" numeric,
  "show_bio" boolean DEFAULT true,
  "show_contact" boolean DEFAULT true,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- N. DOCUMENTS - Versioning tables (with nested items)
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_documents" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "description" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_documents_items" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "icon" varchar DEFAULT 'document',
  "content" jsonb,
  "note" varchar,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_documents" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "description" varchar,
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_documents_items" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "icon" varchar DEFAULT 'document',
  "content" jsonb,
  "note" varchar,
  "_uuid" varchar
);

-- =============================================================================
-- O. GALLERY BLOCK - Versioning tables (with nested images)
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gallery_block" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "source" varchar DEFAULT 'manual',
  "gallery_id" integer,
  "layout" varchar DEFAULT 'grid',
  "columns" varchar DEFAULT '3',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gallery_block_images" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "image_id" integer,
  "caption" varchar,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_gallery_block" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "source" varchar DEFAULT 'manual',
  "gallery_id" integer,
  "layout" varchar DEFAULT 'grid',
  "columns" varchar DEFAULT '3',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_gallery_block_images" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "image_id" integer,
  "caption" varchar,
  "_uuid" varchar
);

-- =============================================================================
-- P. TESTIMONIALS BLOCK - Versioning tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials_block" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "description" varchar,
  "limit" numeric DEFAULT 6,
  "layout" varchar DEFAULT 'grid',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials_block" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "description" varchar,
  "limit" numeric DEFAULT 6,
  "layout" varchar DEFAULT 'grid',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- Q. BLOG FEED - Versioning tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_blog_feed" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "source" varchar DEFAULT 'latest',
  "service_id" integer,
  "location_id" integer,
  "category" varchar,
  "limit" numeric DEFAULT 6,
  "layout" varchar DEFAULT 'grid',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_blog_feed" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "source" varchar DEFAULT 'latest',
  "service_id" integer,
  "location_id" integer,
  "category" varchar,
  "limit" numeric DEFAULT 6,
  "layout" varchar DEFAULT 'grid',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- R. NEWS FEED - Versioning tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_news_feed" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "source" varchar DEFAULT 'latest',
  "service_id" integer,
  "location_id" integer,
  "category" varchar,
  "limit" numeric DEFAULT 6,
  "layout" varchar DEFAULT 'grid',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_news_feed" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "source" varchar DEFAULT 'latest',
  "service_id" integer,
  "location_id" integer,
  "category" varchar,
  "limit" numeric DEFAULT 6,
  "layout" varchar DEFAULT 'grid',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- S. CTA - Versioning tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "description" varchar,
  "primary_button_text" varchar,
  "primary_button_link" varchar,
  "secondary_button_text" varchar,
  "secondary_button_link" varchar,
  "background_image_id" integer,
  "style" varchar DEFAULT 'default',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_cta" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "description" varchar,
  "primary_button_text" varchar,
  "primary_button_link" varchar,
  "secondary_button_text" varchar,
  "secondary_button_link" varchar,
  "background_image_id" integer,
  "style" varchar DEFAULT 'default',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- T. RICH CONTENT - Versioning tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_rich_content" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "content" jsonb,
  "max_width" varchar DEFAULT 'default',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_rich_content" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "content" jsonb,
  "max_width" varchar DEFAULT 'default',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- U. FAQ - Versioning tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "description" varchar,
  "source" varchar DEFAULT 'manual',
  "auto_scope" varchar,
  "style" varchar DEFAULT 'accordion',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_faq" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "heading" varchar,
  "description" varchar,
  "source" varchar DEFAULT 'manual',
  "auto_scope" varchar,
  "style" varchar DEFAULT 'accordion',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- V. HERO - Versioning tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "layout_style" varchar DEFAULT 'standard',
  "heading" varchar,
  "subheading" varchar,
  "background_type" varchar DEFAULT 'color',
  "background_color" varchar,
  "text_color_theme" varchar DEFAULT 'dark',
  "background_image_id" integer,
  "cta_text" varchar,
  "cta_link" varchar,
  "secondary_cta_text" varchar,
  "secondary_cta_link" varchar,
  "style" varchar DEFAULT 'default',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_hero" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "layout_style" varchar DEFAULT 'standard',
  "heading" varchar,
  "subheading" varchar,
  "background_type" varchar DEFAULT 'color',
  "background_color" varchar,
  "text_color_theme" varchar DEFAULT 'dark',
  "background_image_id" integer,
  "cta_text" varchar,
  "cta_link" varchar,
  "secondary_cta_text" varchar,
  "secondary_cta_link" varchar,
  "style" varchar DEFAULT 'default',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

-- =============================================================================
-- W. HIGHLIGHTS - Versioning tables (with nested items)
-- =============================================================================

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_highlights" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "section_style" varchar DEFAULT 'cards',
  "heading" varchar,
  "description" varchar,
  "columns" varchar DEFAULT '3',
  "layout_style" varchar DEFAULT 'cards',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_highlights_items" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon_id" integer,
  "_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_highlights" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "_path" text NOT NULL,
  "section_style" varchar DEFAULT 'cards',
  "heading" varchar,
  "description" varchar,
  "columns" varchar DEFAULT '3',
  "layout_style" varchar DEFAULT 'cards',
  "visibility_show_on_desktop" boolean DEFAULT true,
  "visibility_show_on_mobile" boolean DEFAULT true,
  "visibility_target_type" varchar DEFAULT 'all',
  "_uuid" varchar,
  "block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_highlights_items" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon_id" integer,
  "_uuid" varchar
);

-- =============================================================================
-- X. INDEXES for ALL versioning tables
-- =============================================================================

-- Lawyers Carousel
CREATE INDEX IF NOT EXISTS "pv_blk_law_car_order" ON "_pages_v_blocks_lawyers_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_law_car_parent" ON "_pages_v_blocks_lawyers_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_law_car_path" ON "_pages_v_blocks_lawyers_carousel" ("_path");
CREATE INDEX IF NOT EXISTS "p_blk_law_car_order" ON "pages_blocks_lawyers_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "p_blk_law_car_parent" ON "pages_blocks_lawyers_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "p_blk_law_car_path" ON "pages_blocks_lawyers_carousel" ("_path");

-- Services Carousel
CREATE INDEX IF NOT EXISTS "pv_blk_svc_car_order" ON "_pages_v_blocks_services_carousel" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_svc_car_parent" ON "_pages_v_blocks_services_carousel" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_svc_car_path" ON "_pages_v_blocks_services_carousel" ("_path");
CREATE INDEX IF NOT EXISTS "pv_blk_svc_car_items_order" ON "_pages_v_blocks_services_carousel_items" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_svc_car_items_parent" ON "_pages_v_blocks_services_carousel_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_svc_car_items_hl_order" ON "_pages_v_blocks_services_carousel_items_highlights" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_svc_car_items_hl_parent" ON "_pages_v_blocks_services_carousel_items_highlights" ("_parent_id");

-- Code Snippet
CREATE INDEX IF NOT EXISTS "pv_blk_code_order" ON "_pages_v_blocks_code_snippet" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_code_parent" ON "_pages_v_blocks_code_snippet" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_code_path" ON "_pages_v_blocks_code_snippet" ("_path");

-- Logos
CREATE INDEX IF NOT EXISTS "pv_blk_logos_order" ON "_pages_v_blocks_logos" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_logos_parent" ON "_pages_v_blocks_logos" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_logos_path" ON "_pages_v_blocks_logos" ("_path");
CREATE INDEX IF NOT EXISTS "pv_blk_logos_logos_order" ON "_pages_v_blocks_logos_logos" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_logos_logos_parent" ON "_pages_v_blocks_logos_logos" ("_parent_id");

-- Lawyer List
CREATE INDEX IF NOT EXISTS "pv_blk_law_list_order" ON "_pages_v_blocks_lawyer_list" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_law_list_parent" ON "_pages_v_blocks_lawyer_list" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_law_list_path" ON "_pages_v_blocks_lawyer_list" ("_path");

-- Documents
CREATE INDEX IF NOT EXISTS "pv_blk_docs_order" ON "_pages_v_blocks_documents" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_docs_parent" ON "_pages_v_blocks_documents" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_docs_path" ON "_pages_v_blocks_documents" ("_path");
CREATE INDEX IF NOT EXISTS "pv_blk_docs_items_order" ON "_pages_v_blocks_documents_items" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_docs_items_parent" ON "_pages_v_blocks_documents_items" ("_parent_id");

-- Gallery Block
CREATE INDEX IF NOT EXISTS "pv_blk_gallery_order" ON "_pages_v_blocks_gallery_block" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_gallery_parent" ON "_pages_v_blocks_gallery_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_gallery_path" ON "_pages_v_blocks_gallery_block" ("_path");
CREATE INDEX IF NOT EXISTS "pv_blk_gallery_imgs_order" ON "_pages_v_blocks_gallery_block_images" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_gallery_imgs_parent" ON "_pages_v_blocks_gallery_block_images" ("_parent_id");

-- Testimonials Block
CREATE INDEX IF NOT EXISTS "pv_blk_test_order" ON "_pages_v_blocks_testimonials_block" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_test_parent" ON "_pages_v_blocks_testimonials_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_test_path" ON "_pages_v_blocks_testimonials_block" ("_path");

-- Blog Feed
CREATE INDEX IF NOT EXISTS "pv_blk_blog_order" ON "_pages_v_blocks_blog_feed" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_blog_parent" ON "_pages_v_blocks_blog_feed" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_blog_path" ON "_pages_v_blocks_blog_feed" ("_path");

-- News Feed
CREATE INDEX IF NOT EXISTS "pv_blk_news_order" ON "_pages_v_blocks_news_feed" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_news_parent" ON "_pages_v_blocks_news_feed" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_news_path" ON "_pages_v_blocks_news_feed" ("_path");

-- CTA
CREATE INDEX IF NOT EXISTS "pv_blk_cta_order" ON "_pages_v_blocks_cta" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_cta_parent" ON "_pages_v_blocks_cta" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_cta_path" ON "_pages_v_blocks_cta" ("_path");

-- Rich Content
CREATE INDEX IF NOT EXISTS "pv_blk_rc_order" ON "_pages_v_blocks_rich_content" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_rc_parent" ON "_pages_v_blocks_rich_content" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_rc_path" ON "_pages_v_blocks_rich_content" ("_path");

-- FAQ
CREATE INDEX IF NOT EXISTS "pv_blk_faq_order" ON "_pages_v_blocks_faq" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_faq_parent" ON "_pages_v_blocks_faq" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_faq_path" ON "_pages_v_blocks_faq" ("_path");

-- Hero
CREATE INDEX IF NOT EXISTS "pv_blk_hero_order" ON "_pages_v_blocks_hero" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_hero_parent" ON "_pages_v_blocks_hero" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_hero_path" ON "_pages_v_blocks_hero" ("_path");

-- Highlights
CREATE INDEX IF NOT EXISTS "pv_blk_hl_order" ON "_pages_v_blocks_highlights" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_hl_parent" ON "_pages_v_blocks_highlights" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_hl_path" ON "_pages_v_blocks_highlights" ("_path");
CREATE INDEX IF NOT EXISTS "pv_blk_hl_items_order" ON "_pages_v_blocks_highlights_items" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_hl_items_parent" ON "_pages_v_blocks_highlights_items" ("_parent_id");

-- Why Choose Us
CREATE INDEX IF NOT EXISTS "pv_blk_wcu_order" ON "_pages_v_blocks_why_choose_us" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_wcu_parent" ON "_pages_v_blocks_why_choose_us" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_wcu_path" ON "_pages_v_blocks_why_choose_us" ("_path");
CREATE INDEX IF NOT EXISTS "pv_blk_wcu_ben_order" ON "_pages_v_blocks_why_choose_us_benefits" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_wcu_ben_parent" ON "_pages_v_blocks_why_choose_us_benefits" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_wcu_tb_order" ON "_pages_v_blocks_why_choose_us_trust_badges" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_wcu_tb_parent" ON "_pages_v_blocks_why_choose_us_trust_badges" ("_parent_id");

-- Registration Licenses
CREATE INDEX IF NOT EXISTS "pv_blk_rl_order" ON "_pages_v_blocks_registration_licenses" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_rl_parent" ON "_pages_v_blocks_registration_licenses" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_rl_path" ON "_pages_v_blocks_registration_licenses" ("_path");
CREATE INDEX IF NOT EXISTS "pv_blk_rl_cards_order" ON "_pages_v_blocks_registration_licenses_cards" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_rl_cards_parent" ON "_pages_v_blocks_registration_licenses_cards" ("_parent_id");

-- How It Works
CREATE INDEX IF NOT EXISTS "pv_blk_hiw_order" ON "_pages_v_blocks_how_it_works" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_hiw_parent" ON "_pages_v_blocks_how_it_works" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_hiw_path" ON "_pages_v_blocks_how_it_works" ("_path");
CREATE INDEX IF NOT EXISTS "pv_blk_hiw_steps_order" ON "_pages_v_blocks_how_it_works_steps" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_hiw_steps_parent" ON "_pages_v_blocks_how_it_works_steps" ("_parent_id");

-- Consultation
CREATE INDEX IF NOT EXISTS "pv_blk_consult_order" ON "_pages_v_blocks_consultation" ("_order");
CREATE INDEX IF NOT EXISTS "pv_blk_consult_parent" ON "_pages_v_blocks_consultation" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pv_blk_consult_path" ON "_pages_v_blocks_consultation" ("_path");

-- =============================================================================
-- Y. LAWYERS COLLECTION - Missing columns and sub-tables
-- =============================================================================

-- The lawyers table may exist but be missing newer columns
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='location_text') THEN
    ALTER TABLE "lawyers" ADD COLUMN "location_text" varchar;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='is_sponsored') THEN
    ALTER TABLE "lawyers" ADD COLUMN "is_sponsored" boolean DEFAULT false;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='is_premium_partner') THEN
    ALTER TABLE "lawyers" ADD COLUMN "is_premium_partner" boolean DEFAULT false;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='rating') THEN
    ALTER TABLE "lawyers" ADD COLUMN "rating" numeric DEFAULT 4.5;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='rating_count') THEN
    ALTER TABLE "lawyers" ADD COLUMN "rating_count" numeric DEFAULT 100;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='response_time') THEN
    ALTER TABLE "lawyers" ADD COLUMN "response_time" varchar DEFAULT 'Typically responds in 1 hour';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='email') THEN
    ALTER TABLE "lawyers" ADD COLUMN "email" varchar;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='phone') THEN
    ALTER TABLE "lawyers" ADD COLUMN "phone" varchar;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='experience') THEN
    ALTER TABLE "lawyers" ADD COLUMN "experience" numeric;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='bio') THEN
    ALTER TABLE "lawyers" ADD COLUMN "bio" jsonb;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lawyers' AND column_name='photo_id') THEN
    ALTER TABLE "lawyers" ADD COLUMN "photo_id" integer;
  END IF;
END $$;

-- Lawyers specializations sub-table
CREATE TABLE IF NOT EXISTS "lawyers_specializations" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "specialization" varchar,
  "_uuid" varchar
);
CREATE INDEX IF NOT EXISTS "lawyers_spec_order" ON "lawyers_specializations" ("_order");
CREATE INDEX IF NOT EXISTS "lawyers_spec_parent" ON "lawyers_specializations" ("_parent_id");

-- Lawyers rels table (for relationship fields like services)
CREATE TABLE IF NOT EXISTS "lawyers_rels" (
  "id" serial PRIMARY KEY,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" varchar NOT NULL,
  "services_id" integer
);
CREATE INDEX IF NOT EXISTS "lawyers_rels_order" ON "lawyers_rels" ("order");
CREATE INDEX IF NOT EXISTS "lawyers_rels_parent" ON "lawyers_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "lawyers_rels_path" ON "lawyers_rels" ("path");

-- =============================================================================
-- Z. HERO BLOCK - New showSearchBar column
-- =============================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='pages_blocks_hero' AND column_name='show_search_bar') THEN
    ALTER TABLE "pages_blocks_hero" ADD COLUMN "show_search_bar" boolean DEFAULT true;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='_pages_v_blocks_hero' AND column_name='show_search_bar') THEN
    ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "show_search_bar" boolean DEFAULT true;
  END IF;
END $$;

-- =============================================================================
-- DONE! V3.3 - ALL block types + lawyers + hero search bar
-- =============================================================================
SELECT 'V3.3 COMPLETE!' AS status;
