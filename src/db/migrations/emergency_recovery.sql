-- ULTIMATE RECOVERY SQL (Run this in the Supabase SQL Editor)
-- This script fixes all recent blocks (Documents, Gallery, Testimonials, Logos)
-- resolving "relation does not exist", "id violations", and "_uuid missing" errors.

-- 1. CLEANUP (Drop all recent custom tables to start fresh)
DROP TABLE IF EXISTS "pages_blocks_documents_items";
DROP TABLE IF EXISTS "pages_blocks_documents";
DROP TABLE IF EXISTS "_pages_v_blocks_documents_items";
DROP TABLE IF EXISTS "_pages_v_blocks_documents";
DROP TABLE IF EXISTS "pages_blocks_gallery_block_images";
DROP TABLE IF EXISTS "pages_blocks_gallery_block";
DROP TABLE IF EXISTS "_pages_v_blocks_gallery_block_images";
DROP TABLE IF EXISTS "_pages_v_blocks_gallery_block";
DROP TABLE IF EXISTS "pages_blocks_testimonials_block";
DROP TABLE IF EXISTS "_pages_v_blocks_testimonials_block";
DROP TABLE IF EXISTS "pages_blocks_logos_logos";
DROP TABLE IF EXISTS "pages_blocks_logos";
DROP TABLE IF EXISTS "_pages_v_blocks_logos_logos";
DROP TABLE IF EXISTS "_pages_v_blocks_logos";

-- 2. DOCUMENTS BLOCK
CREATE TABLE "pages_blocks_documents" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" text PRIMARY KEY,
	"heading" text,
	"description" text,
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_uuid" text,
	"block_name" text
);
CREATE TABLE "pages_blocks_documents_items" (
	"_order" integer NOT NULL,
	"_parent_id" text NOT NULL REFERENCES "pages_blocks_documents" ("id") ON DELETE CASCADE,
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"icon" text DEFAULT 'document',
	"content" jsonb NOT NULL,
	"note" text,
	"_uuid" text
);
CREATE TABLE "_pages_v_blocks_documents" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY,
	"heading" text,
	"description" text,
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_uuid" text,
	"block_name" text
);
CREATE TABLE "_pages_v_blocks_documents_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL REFERENCES "_pages_v_blocks_documents" ("id") ON DELETE CASCADE,
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"icon" text DEFAULT 'document',
	"content" jsonb NOT NULL,
	"note" text,
	"_uuid" text
);

-- 3. GALLERY BLOCK
CREATE TABLE "pages_blocks_gallery_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" text PRIMARY KEY,
	"heading" text,
	"source" text DEFAULT 'manual',
	"gallery_id" integer,
	"layout" text DEFAULT 'grid',
	"columns" text DEFAULT '3',
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_uuid" text,
	"block_name" text
);
CREATE TABLE "pages_blocks_gallery_block_images" (
	"_order" integer NOT NULL,
	"_parent_id" text NOT NULL REFERENCES "pages_blocks_gallery_block" ("id") ON DELETE CASCADE,
	"id" text PRIMARY KEY,
	"image_id" integer NOT NULL,
	"caption" text,
	"_uuid" text
);
CREATE TABLE "_pages_v_blocks_gallery_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY,
	"heading" text,
	"source" text DEFAULT 'manual',
	"gallery_id" integer,
	"layout" text DEFAULT 'grid',
	"columns" text DEFAULT '3',
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_uuid" text,
	"block_name" text
);
CREATE TABLE "_pages_v_blocks_gallery_block_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL REFERENCES "_pages_v_blocks_gallery_block" ("id") ON DELETE CASCADE,
	"id" serial PRIMARY KEY,
	"image_id" integer NOT NULL,
	"caption" text,
	"_uuid" text
);

-- 4. TESTIMONIALS BLOCK
CREATE TABLE "pages_blocks_testimonials_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" text PRIMARY KEY,
	"heading" text,
	"description" text,
	"limit" integer DEFAULT 6,
	"layout" text DEFAULT 'grid',
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_uuid" text,
	"block_name" text
);
CREATE TABLE "_pages_v_blocks_testimonials_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY,
	"heading" text,
	"description" text,
	"limit" integer DEFAULT 6,
	"layout" text DEFAULT 'grid',
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_uuid" text,
	"block_name" text
);

-- 5. LOGOS BLOCK
CREATE TABLE "pages_blocks_logos" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" text PRIMARY KEY,
	"heading" text,
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_uuid" text,
	"block_name" text
);
CREATE TABLE "pages_blocks_logos_logos" (
	"_order" integer NOT NULL,
	"_parent_id" text NOT NULL REFERENCES "pages_blocks_logos" ("id") ON DELETE CASCADE,
	"id" text PRIMARY KEY,
	"image_id" integer NOT NULL,
	"link" text,
	"_uuid" text
);
CREATE TABLE "_pages_v_blocks_logos" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY,
	"heading" text,
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_uuid" text,
	"block_name" text
);
CREATE TABLE "_pages_v_blocks_logos_logos" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL REFERENCES "_pages_v_blocks_logos" ("id") ON DELETE CASCADE,
	"id" serial PRIMARY KEY,
	"image_id" integer NOT NULL,
	"link" text,
	"_uuid" text
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS "idx_doc_parent" ON "pages_blocks_documents" ("_parent_id");
CREATE INDEX IF NOT EXISTS "idx_gal_parent" ON "pages_blocks_gallery_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "idx_tes_parent" ON "pages_blocks_testimonials_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "idx_logos_parent" ON "pages_blocks_logos" ("_parent_id");
