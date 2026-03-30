-- Recovery SQL for "Documents" Block (FINAL VERSION)
-- Run this in the Supabase SQL Editor to fix "relation does not exist", "integer syntax", or "_uuid missing" errors.

-- 1. Drop old tables if they exist
DROP TABLE IF EXISTS "pages_blocks_documents_items";
DROP TABLE IF EXISTS "pages_blocks_documents";
DROP TABLE IF EXISTS "_pages_v_blocks_documents_items";
DROP TABLE IF EXISTS "_pages_v_blocks_documents";

-- 2. Create the main Documents block table
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

-- 3. Create the items array for the main block
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

-- 4. Create the Versioned Documents block table
CREATE TABLE "_pages_v_blocks_documents" (
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

-- 5. Create the items array for the versioned block
CREATE TABLE "_pages_v_blocks_documents_items" (
	"_order" integer NOT NULL,
	"_parent_id" text NOT NULL REFERENCES "_pages_v_blocks_documents" ("id") ON DELETE CASCADE,
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"icon" text DEFAULT 'document',
	"content" jsonb NOT NULL,
	"note" text,
	"_uuid" text
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS "pages_blocks_documents_parent_id_idx" ON "pages_blocks_documents" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_documents_parent_id_idx" ON "_pages_v_blocks_documents" ("_parent_id");
