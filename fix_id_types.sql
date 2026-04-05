-- =============================================================================
-- FIX ID TYPES: Drop all manually created tables and recreate with varchar IDs
-- Payload CMS uses hex string IDs (e.g. "69d23146005ce34ac2d29449"), not serial integers.
-- These tables are empty so DROP is safe.
-- =============================================================================

-- Drop child tables first (FK dependencies), then parent tables

-- Why Choose Us
DROP TABLE IF EXISTS "_pages_v_blocks_why_choose_us_trust_badges" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_why_choose_us_benefits" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_why_choose_us" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_why_choose_us_trust_badges" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_why_choose_us_benefits" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_why_choose_us" CASCADE;

-- Registration Licenses
DROP TABLE IF EXISTS "_pages_v_blocks_registration_licenses_cards" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_registration_licenses" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_registration_licenses_cards" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_registration_licenses" CASCADE;

-- How It Works
DROP TABLE IF EXISTS "_pages_v_blocks_how_it_works_steps" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_how_it_works" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_how_it_works_steps" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_how_it_works" CASCADE;

-- Consultation
DROP TABLE IF EXISTS "_pages_v_blocks_consultation" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_consultation" CASCADE;

-- Lawyers Carousel
DROP TABLE IF EXISTS "_pages_v_blocks_lawyers_carousel" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_lawyers_carousel" CASCADE;

-- Services Carousel
DROP TABLE IF EXISTS "_pages_v_blocks_services_carousel_items_highlights" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_services_carousel_items" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_services_carousel" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_services_carousel_items_highlights" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_services_carousel_items" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_services_carousel" CASCADE;

-- Code Snippet
DROP TABLE IF EXISTS "_pages_v_blocks_code_snippet" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_code_snippet" CASCADE;

-- Logos
DROP TABLE IF EXISTS "_pages_v_blocks_logos_logos" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_logos" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_logos_logos" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_logos" CASCADE;

-- Lawyer List
DROP TABLE IF EXISTS "_pages_v_blocks_lawyer_list" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_lawyer_list" CASCADE;

-- Documents
DROP TABLE IF EXISTS "_pages_v_blocks_documents_items" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_documents" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_documents_items" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_documents" CASCADE;

-- Gallery Block
DROP TABLE IF EXISTS "_pages_v_blocks_gallery_block_images" CASCADE;
DROP TABLE IF EXISTS "_pages_v_blocks_gallery_block" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_gallery_block_images" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_gallery_block" CASCADE;

-- Testimonials Block
DROP TABLE IF EXISTS "_pages_v_blocks_testimonials_block" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_testimonials_block" CASCADE;

-- Blog Feed
DROP TABLE IF EXISTS "_pages_v_blocks_blog_feed" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_blog_feed" CASCADE;

-- News Feed
DROP TABLE IF EXISTS "_pages_v_blocks_news_feed" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_news_feed" CASCADE;

-- CTA
DROP TABLE IF EXISTS "_pages_v_blocks_cta" CASCADE;
DROP TABLE IF EXISTS "pages_blocks_cta" CASCADE;

-- Lawyers sub-tables
DROP TABLE IF EXISTS "lawyers_specializations" CASCADE;
DROP TABLE IF EXISTS "lawyers_rels" CASCADE;

-- =============================================================================
-- RECREATE ALL TABLES WITH VARCHAR IDs
-- =============================================================================

-- ===================== WHY CHOOSE US =====================

CREATE TABLE "pages_blocks_why_choose_us" (
  "id" varchar PRIMARY KEY NOT NULL,
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
CREATE INDEX "p_blk_wcu_order" ON "pages_blocks_why_choose_us" ("_order");
CREATE INDEX "p_blk_wcu_parent" ON "pages_blocks_why_choose_us" ("_parent_id");
CREATE INDEX "p_blk_wcu_path" ON "pages_blocks_why_choose_us" ("_path");

CREATE TABLE "pages_blocks_why_choose_us_benefits" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'gavel',
  "_uuid" varchar
);
CREATE INDEX "p_blk_wcu_ben_order" ON "pages_blocks_why_choose_us_benefits" ("_order");
CREATE INDEX "p_blk_wcu_ben_parent" ON "pages_blocks_why_choose_us_benefits" ("_parent_id");

CREATE TABLE "pages_blocks_why_choose_us_trust_badges" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "badge_text" varchar,
  "_uuid" varchar
);
CREATE INDEX "p_blk_wcu_tb_order" ON "pages_blocks_why_choose_us_trust_badges" ("_order");
CREATE INDEX "p_blk_wcu_tb_parent" ON "pages_blocks_why_choose_us_trust_badges" ("_parent_id");

-- Versioning
CREATE TABLE "_pages_v_blocks_why_choose_us" (
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
CREATE INDEX "pv_blk_wcu_order" ON "_pages_v_blocks_why_choose_us" ("_order");
CREATE INDEX "pv_blk_wcu_parent" ON "_pages_v_blocks_why_choose_us" ("_parent_id");
CREATE INDEX "pv_blk_wcu_path" ON "_pages_v_blocks_why_choose_us" ("_path");

CREATE TABLE "_pages_v_blocks_why_choose_us_benefits" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'gavel',
  "_uuid" varchar
);
CREATE INDEX "pv_blk_wcu_ben_order" ON "_pages_v_blocks_why_choose_us_benefits" ("_order");
CREATE INDEX "pv_blk_wcu_ben_parent" ON "_pages_v_blocks_why_choose_us_benefits" ("_parent_id");

CREATE TABLE "_pages_v_blocks_why_choose_us_trust_badges" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "badge_text" varchar,
  "_uuid" varchar
);
CREATE INDEX "pv_blk_wcu_tb_order" ON "_pages_v_blocks_why_choose_us_trust_badges" ("_order");
CREATE INDEX "pv_blk_wcu_tb_parent" ON "_pages_v_blocks_why_choose_us_trust_badges" ("_parent_id");

-- ===================== REGISTRATION LICENSES =====================

CREATE TABLE "pages_blocks_registration_licenses" (
  "id" varchar PRIMARY KEY NOT NULL,
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
CREATE INDEX "p_blk_rl_order" ON "pages_blocks_registration_licenses" ("_order");
CREATE INDEX "p_blk_rl_parent" ON "pages_blocks_registration_licenses" ("_parent_id");
CREATE INDEX "p_blk_rl_path" ON "pages_blocks_registration_licenses" ("_path");

CREATE TABLE "pages_blocks_registration_licenses_cards" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'wallet',
  "link" varchar,
  "_uuid" varchar
);
CREATE INDEX "p_blk_rl_cards_order" ON "pages_blocks_registration_licenses_cards" ("_order");
CREATE INDEX "p_blk_rl_cards_parent" ON "pages_blocks_registration_licenses_cards" ("_parent_id");

-- Versioning
CREATE TABLE "_pages_v_blocks_registration_licenses" (
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
CREATE INDEX "pv_blk_rl_order" ON "_pages_v_blocks_registration_licenses" ("_order");
CREATE INDEX "pv_blk_rl_parent" ON "_pages_v_blocks_registration_licenses" ("_parent_id");
CREATE INDEX "pv_blk_rl_path" ON "_pages_v_blocks_registration_licenses" ("_path");

CREATE TABLE "_pages_v_blocks_registration_licenses_cards" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'wallet',
  "link" varchar,
  "_uuid" varchar
);
CREATE INDEX "pv_blk_rl_cards_order" ON "_pages_v_blocks_registration_licenses_cards" ("_order");
CREATE INDEX "pv_blk_rl_cards_parent" ON "_pages_v_blocks_registration_licenses_cards" ("_parent_id");

-- ===================== HOW IT WORKS =====================

CREATE TABLE "pages_blocks_how_it_works" (
  "id" varchar PRIMARY KEY NOT NULL,
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
CREATE INDEX "p_blk_hiw_order" ON "pages_blocks_how_it_works" ("_order");
CREATE INDEX "p_blk_hiw_parent" ON "pages_blocks_how_it_works" ("_parent_id");
CREATE INDEX "p_blk_hiw_path" ON "pages_blocks_how_it_works" ("_path");

CREATE TABLE "pages_blocks_how_it_works_steps" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'gavel',
  "_uuid" varchar
);
CREATE INDEX "p_blk_hiw_steps_order" ON "pages_blocks_how_it_works_steps" ("_order");
CREATE INDEX "p_blk_hiw_steps_parent" ON "pages_blocks_how_it_works_steps" ("_parent_id");

-- Versioning
CREATE TABLE "_pages_v_blocks_how_it_works" (
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
CREATE INDEX "pv_blk_hiw_order" ON "_pages_v_blocks_how_it_works" ("_order");
CREATE INDEX "pv_blk_hiw_parent" ON "_pages_v_blocks_how_it_works" ("_parent_id");
CREATE INDEX "pv_blk_hiw_path" ON "_pages_v_blocks_how_it_works" ("_path");

CREATE TABLE "_pages_v_blocks_how_it_works_steps" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "description" varchar,
  "icon" varchar DEFAULT 'gavel',
  "_uuid" varchar
);
CREATE INDEX "pv_blk_hiw_steps_order" ON "_pages_v_blocks_how_it_works_steps" ("_order");
CREATE INDEX "pv_blk_hiw_steps_parent" ON "_pages_v_blocks_how_it_works_steps" ("_parent_id");

-- ===================== CONSULTATION =====================

CREATE TABLE "pages_blocks_consultation" (
  "id" varchar PRIMARY KEY NOT NULL,
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
CREATE INDEX "p_blk_consult_order" ON "pages_blocks_consultation" ("_order");
CREATE INDEX "p_blk_consult_parent" ON "pages_blocks_consultation" ("_parent_id");
CREATE INDEX "p_blk_consult_path" ON "pages_blocks_consultation" ("_path");

CREATE TABLE "_pages_v_blocks_consultation" (
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
CREATE INDEX "pv_blk_consult_order" ON "_pages_v_blocks_consultation" ("_order");
CREATE INDEX "pv_blk_consult_parent" ON "_pages_v_blocks_consultation" ("_parent_id");
CREATE INDEX "pv_blk_consult_path" ON "_pages_v_blocks_consultation" ("_path");

-- ===================== LAWYERS CAROUSEL =====================

CREATE TABLE "pages_blocks_lawyers_carousel" (
  "id" varchar PRIMARY KEY NOT NULL,
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
CREATE INDEX "p_blk_law_car_order" ON "pages_blocks_lawyers_carousel" ("_order");
CREATE INDEX "p_blk_law_car_parent" ON "pages_blocks_lawyers_carousel" ("_parent_id");
CREATE INDEX "p_blk_law_car_path" ON "pages_blocks_lawyers_carousel" ("_path");

CREATE TABLE "_pages_v_blocks_lawyers_carousel" (
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
CREATE INDEX "pv_blk_law_car_order" ON "_pages_v_blocks_lawyers_carousel" ("_order");
CREATE INDEX "pv_blk_law_car_parent" ON "_pages_v_blocks_lawyers_carousel" ("_parent_id");
CREATE INDEX "pv_blk_law_car_path" ON "_pages_v_blocks_lawyers_carousel" ("_path");

-- ===================== SERVICES CAROUSEL =====================

CREATE TABLE "pages_blocks_services_carousel" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "pages_blocks_services_carousel_items" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "service_id" integer,
  "custom_icon_id" integer,
  "_uuid" varchar
);

CREATE TABLE "pages_blocks_services_carousel_items_highlights" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "text" varchar,
  "_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_services_carousel" (
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

CREATE TABLE "_pages_v_blocks_services_carousel_items" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "service_id" integer,
  "custom_icon_id" integer,
  "_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_services_carousel_items_highlights" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "text" varchar,
  "_uuid" varchar
);

CREATE INDEX "pv_blk_svc_car_order" ON "_pages_v_blocks_services_carousel" ("_order");
CREATE INDEX "pv_blk_svc_car_parent" ON "_pages_v_blocks_services_carousel" ("_parent_id");
CREATE INDEX "pv_blk_svc_car_path" ON "_pages_v_blocks_services_carousel" ("_path");
CREATE INDEX "pv_blk_svc_car_items_order" ON "_pages_v_blocks_services_carousel_items" ("_order");
CREATE INDEX "pv_blk_svc_car_items_parent" ON "_pages_v_blocks_services_carousel_items" ("_parent_id");
CREATE INDEX "pv_blk_svc_car_items_hl_order" ON "_pages_v_blocks_services_carousel_items_highlights" ("_order");
CREATE INDEX "pv_blk_svc_car_items_hl_parent" ON "_pages_v_blocks_services_carousel_items_highlights" ("_parent_id");

-- ===================== CODE SNIPPET =====================

CREATE TABLE "pages_blocks_code_snippet" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "_pages_v_blocks_code_snippet" (
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

CREATE INDEX "pv_blk_code_order" ON "_pages_v_blocks_code_snippet" ("_order");
CREATE INDEX "pv_blk_code_parent" ON "_pages_v_blocks_code_snippet" ("_parent_id");
CREATE INDEX "pv_blk_code_path" ON "_pages_v_blocks_code_snippet" ("_path");

-- ===================== LOGOS =====================

CREATE TABLE "pages_blocks_logos" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "pages_blocks_logos_logos" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "image_id" integer,
  "link" varchar,
  "_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_logos" (
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

CREATE TABLE "_pages_v_blocks_logos_logos" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "image_id" integer,
  "link" varchar,
  "_uuid" varchar
);

CREATE INDEX "pv_blk_logos_order" ON "_pages_v_blocks_logos" ("_order");
CREATE INDEX "pv_blk_logos_parent" ON "_pages_v_blocks_logos" ("_parent_id");
CREATE INDEX "pv_blk_logos_path" ON "_pages_v_blocks_logos" ("_path");
CREATE INDEX "pv_blk_logos_logos_order" ON "_pages_v_blocks_logos_logos" ("_order");
CREATE INDEX "pv_blk_logos_logos_parent" ON "_pages_v_blocks_logos_logos" ("_parent_id");

-- ===================== LAWYER LIST =====================

CREATE TABLE "pages_blocks_lawyer_list" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "_pages_v_blocks_lawyer_list" (
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

CREATE INDEX "pv_blk_law_list_order" ON "_pages_v_blocks_lawyer_list" ("_order");
CREATE INDEX "pv_blk_law_list_parent" ON "_pages_v_blocks_lawyer_list" ("_parent_id");
CREATE INDEX "pv_blk_law_list_path" ON "_pages_v_blocks_lawyer_list" ("_path");

-- ===================== DOCUMENTS =====================

CREATE TABLE "pages_blocks_documents" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "pages_blocks_documents_items" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "title" varchar,
  "icon" varchar DEFAULT 'document',
  "content" jsonb,
  "note" varchar,
  "_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_documents" (
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

CREATE TABLE "_pages_v_blocks_documents_items" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "title" varchar,
  "icon" varchar DEFAULT 'document',
  "content" jsonb,
  "note" varchar,
  "_uuid" varchar
);

CREATE INDEX "pv_blk_docs_order" ON "_pages_v_blocks_documents" ("_order");
CREATE INDEX "pv_blk_docs_parent" ON "_pages_v_blocks_documents" ("_parent_id");
CREATE INDEX "pv_blk_docs_path" ON "_pages_v_blocks_documents" ("_path");
CREATE INDEX "pv_blk_docs_items_order" ON "_pages_v_blocks_documents_items" ("_order");
CREATE INDEX "pv_blk_docs_items_parent" ON "_pages_v_blocks_documents_items" ("_parent_id");

-- ===================== GALLERY BLOCK =====================

CREATE TABLE "pages_blocks_gallery_block" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "pages_blocks_gallery_block_images" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "image_id" integer,
  "caption" varchar,
  "_uuid" varchar
);

CREATE TABLE "_pages_v_blocks_gallery_block" (
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

CREATE TABLE "_pages_v_blocks_gallery_block_images" (
  "id" serial PRIMARY KEY,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "image_id" integer,
  "caption" varchar,
  "_uuid" varchar
);

CREATE INDEX "pv_blk_gallery_order" ON "_pages_v_blocks_gallery_block" ("_order");
CREATE INDEX "pv_blk_gallery_parent" ON "_pages_v_blocks_gallery_block" ("_parent_id");
CREATE INDEX "pv_blk_gallery_path" ON "_pages_v_blocks_gallery_block" ("_path");
CREATE INDEX "pv_blk_gallery_imgs_order" ON "_pages_v_blocks_gallery_block_images" ("_order");
CREATE INDEX "pv_blk_gallery_imgs_parent" ON "_pages_v_blocks_gallery_block_images" ("_parent_id");

-- ===================== TESTIMONIALS BLOCK =====================

CREATE TABLE "pages_blocks_testimonials_block" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "_pages_v_blocks_testimonials_block" (
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

CREATE INDEX "pv_blk_test_order" ON "_pages_v_blocks_testimonials_block" ("_order");
CREATE INDEX "pv_blk_test_parent" ON "_pages_v_blocks_testimonials_block" ("_parent_id");
CREATE INDEX "pv_blk_test_path" ON "_pages_v_blocks_testimonials_block" ("_path");

-- ===================== BLOG FEED =====================

CREATE TABLE "pages_blocks_blog_feed" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "_pages_v_blocks_blog_feed" (
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

CREATE INDEX "pv_blk_blog_order" ON "_pages_v_blocks_blog_feed" ("_order");
CREATE INDEX "pv_blk_blog_parent" ON "_pages_v_blocks_blog_feed" ("_parent_id");
CREATE INDEX "pv_blk_blog_path" ON "_pages_v_blocks_blog_feed" ("_path");

-- ===================== NEWS FEED =====================

CREATE TABLE "pages_blocks_news_feed" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "_pages_v_blocks_news_feed" (
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

CREATE INDEX "pv_blk_news_order" ON "_pages_v_blocks_news_feed" ("_order");
CREATE INDEX "pv_blk_news_parent" ON "_pages_v_blocks_news_feed" ("_parent_id");
CREATE INDEX "pv_blk_news_path" ON "_pages_v_blocks_news_feed" ("_path");

-- ===================== CTA =====================

CREATE TABLE "pages_blocks_cta" (
  "id" varchar PRIMARY KEY NOT NULL,
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

CREATE TABLE "_pages_v_blocks_cta" (
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

CREATE INDEX "pv_blk_cta_order" ON "_pages_v_blocks_cta" ("_order");
CREATE INDEX "pv_blk_cta_parent" ON "_pages_v_blocks_cta" ("_parent_id");
CREATE INDEX "pv_blk_cta_path" ON "_pages_v_blocks_cta" ("_path");

-- ===================== LAWYERS COLLECTION SUB-TABLES =====================

CREATE TABLE "lawyers_specializations" (
  "id" varchar PRIMARY KEY NOT NULL,
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "specialization" varchar,
  "_uuid" varchar
);
CREATE INDEX "lawyers_spec_order" ON "lawyers_specializations" ("_order");
CREATE INDEX "lawyers_spec_parent" ON "lawyers_specializations" ("_parent_id");

CREATE TABLE "lawyers_rels" (
  "id" serial PRIMARY KEY,
  "order" integer,
  "parent_id" integer NOT NULL,
  "path" varchar NOT NULL,
  "services_id" integer
);
CREATE INDEX "lawyers_rels_order" ON "lawyers_rels" ("order");
CREATE INDEX "lawyers_rels_parent" ON "lawyers_rels" ("parent_id");
CREATE INDEX "lawyers_rels_path" ON "lawyers_rels" ("path");

-- =============================================================================
SELECT 'ID TYPE FIX COMPLETE - All tables recreated with varchar IDs!' AS status;
