-- Recovery SQL for "Documents" Block
-- Run this in the Supabase SQL Editor to fix "relation does not exist" errors on Vercel.

-- 1. Create the main Documents block table
CREATE TABLE IF NOT EXISTS "pages_blocks_documents" (
	"_order" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY,
	"heading" text,
	"description" text,
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_parent_id" integer NOT NULL,
	"_uuid" text NOT NULL,
	"block_name" text
);

-- 2. Create the items array for the main block
CREATE TABLE IF NOT EXISTS "pages_blocks_documents_items" (
	"_order" integer NOT NULL,
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"icon" text DEFAULT 'document',
	"content" jsonb NOT NULL,
	"note" text,
	"_parent_id" integer NOT NULL,
	"_uuid" text NOT NULL
);

-- 3. Create the Versioned Documents block table (Crucial for Drafts/Versions)
CREATE TABLE IF NOT EXISTS "_pages_v_blocks_documents" (
	"_order" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY,
	"heading" text,
	"description" text,
	"visibility_show_on_desktop" boolean DEFAULT true,
	"visibility_show_on_mobile" boolean DEFAULT true,
	"visibility_target_type" text DEFAULT 'global',
	"_parent_id" integer NOT NULL,
	"_uuid" text NOT NULL,
	"block_name" text
);

-- 4. Create the items array for the versioned block
CREATE TABLE IF NOT EXISTS "_pages_v_blocks_documents_items" (
	"_order" integer NOT NULL,
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"icon" text DEFAULT 'document',
	"content" jsonb NOT NULL,
	"note" text,
	"_parent_id" integer NOT NULL,
	"_uuid" text NOT NULL
);

-- Add secondary relationships (for targeting fields if used)
CREATE TABLE IF NOT EXISTS "pages_blocks_documents_visibility_target_pages" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"pages_id" integer NOT NULL,
	"id" serial PRIMARY KEY
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS "pages_blocks_documents_parent_id_idx" ON "pages_blocks_documents" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_documents_items_parent_id_idx" ON "pages_blocks_documents_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_documents_parent_id_idx" ON "_pages_v_blocks_documents" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_documents_items_parent_id_idx" ON "_pages_v_blocks_documents_items" ("_parent_id");
