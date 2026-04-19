import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create ENUMs for services blocks — idempotent (skip if already exists)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_hero_stats_icon" AS ENUM('scale', 'check', 'users', 'clock', 'shield', 'star', 'file', 'trophy');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_hero_layout_style" AS ENUM('standard', 'withLeadForm');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_hero_background_type" AS ENUM('image', 'color');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_hero_background_color" AS ENUM('white', 'black', 'gold');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_hero_text_color_theme" AS ENUM('auto', 'light', 'dark');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_hero_style" AS ENUM('fullWidth', 'split', 'centered');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_rich_content_max_width" AS ENUM('narrow', 'default', 'wide', 'full');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_faq_source" AS ENUM('manual', 'auto');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_faq_auto_scope" AS ENUM('global', 'service', 'location', 'page');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_faq_style" AS ENUM('accordion', 'list');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_highlights_section_style" AS ENUM('cards', 'statsBar');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_highlights_columns" AS ENUM('2', '3', '4');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_why_choose_us_benefits_icon" AS ENUM('phone', 'strategy', 'gavel', 'trending', 'laptop', 'payments', 'shield', 'users');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_registration_licenses_cards_icon" AS ENUM('wallet', 'corporate', 'restaurant', 'business', 'public', 'verified', 'premium', 'policy', 'shield', 'gavel', 'speed');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_how_it_works_steps_icon" AS ENUM('document', 'handshake', 'gavel', 'scale', 'shield');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_cta_style" AS ENUM('default', 'banner', 'card');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_blog_feed_source" AS ENUM('latest', 'byService', 'byLocation', 'byCategory', 'manual');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_blog_feed_layout" AS ENUM('grid', 'list', 'carousel');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_news_feed_source" AS ENUM('latest', 'byService', 'byLocation', 'byCategory', 'manual');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_news_feed_layout" AS ENUM('grid', 'list', 'carousel');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_gallery_block_source" AS ENUM('manual', 'collection');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_gallery_block_layout" AS ENUM('grid', 'masonry', 'carousel');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_gallery_block_columns" AS ENUM('2', '3', '4');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_testimonials_block_layout" AS ENUM('grid', 'carousel');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_services_carousel_items_override_icon" AS ENUM('', 'gavel', 'handshake', 'scale', 'building', 'file-contract', 'shield', 'user-tie', 'users', 'calculator', 'home', 'briefcase', 'landmark', 'money-bill', 'book', 'stamp');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum_services_blocks_documents_items_icon" AS ENUM('document', 'location', 'calendar', 'camera', 'users', 'shield');
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  // Create services_blocks_* tables — all idempotent with IF NOT EXISTS
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "services_blocks_hero_stats" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" "enum_services_blocks_hero_stats_icon" DEFAULT 'scale',
      "value" varchar,
      "label" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "layout_style" "enum_services_blocks_hero_layout_style" DEFAULT 'withLeadForm' NOT NULL,
      "heading" varchar NOT NULL,
      "subheading" varchar,
      "background_type" "enum_services_blocks_hero_background_type" DEFAULT 'image',
      "background_image_id" integer,
      "background_color" "enum_services_blocks_hero_background_color" DEFAULT 'black',
      "text_color_theme" "enum_services_blocks_hero_text_color_theme" DEFAULT 'light',
      "show_search_bar" boolean DEFAULT true,
      "cta_text" varchar DEFAULT 'Book Free Consultation',
      "cta_link" varchar DEFAULT '/consultation',
      "secondary_cta_text" varchar DEFAULT 'WhatsApp Us',
      "secondary_cta_link" varchar DEFAULT 'https://wa.me/919650515469',
      "style" "enum_services_blocks_hero_style" DEFAULT 'fullWidth',
      "show_stats_bar" boolean DEFAULT true,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_rich_content" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "content" jsonb NOT NULL,
      "max_width" "enum_services_blocks_rich_content_max_width" DEFAULT 'default',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_faq" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Frequently Asked Questions',
      "description" varchar,
      "source" "enum_services_blocks_faq_source" DEFAULT 'manual',
      "auto_scope" "enum_services_blocks_faq_auto_scope",
      "style" "enum_services_blocks_faq_style" DEFAULT 'accordion',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_highlights_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar,
      "icon_id" integer
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "section_style" "enum_services_blocks_highlights_section_style" DEFAULT 'cards',
      "heading" varchar DEFAULT 'Why Choose Us',
      "description" varchar,
      "columns" "enum_services_blocks_highlights_columns" DEFAULT '3',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_why_choose_us_benefits" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "icon" "enum_services_blocks_why_choose_us_benefits_icon" DEFAULT 'gavel'
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_why_choose_us_trust_badges" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "badge_text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_why_choose_us" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Why Choose VakilFirst?' NOT NULL,
      "subheading" varchar DEFAULT 'Experience unparalleled legal expertise and modern strategic solutions designed for your success.',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_registration_licenses_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "icon" "enum_services_blocks_registration_licenses_cards_icon" DEFAULT 'wallet',
      "link" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_registration_licenses" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "badge" varchar DEFAULT 'Business Compliance',
      "heading" varchar DEFAULT 'Registration & Licenses' NOT NULL,
      "subheading" varchar DEFAULT 'Seamless legal onboarding and regulatory compliance for modern enterprises.',
      "cta_section_cta_heading" varchar DEFAULT 'Unsure about your requirements?',
      "cta_section_cta_subheading" varchar DEFAULT 'Consult our senior legal partners for a custom compliance roadmap.',
      "cta_section_cta_button_text" varchar DEFAULT 'Talk to a Lawyer',
      "cta_section_cta_link" varchar DEFAULT '/consultation',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_how_it_works_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "icon" "enum_services_blocks_how_it_works_steps_icon" DEFAULT 'gavel'
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_how_it_works" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "process_label" varchar DEFAULT 'THE PROCESS',
      "heading" varchar DEFAULT 'How It Works' NOT NULL,
      "background_image_id" integer NOT NULL,
      "quote_text" varchar DEFAULT '"Justice delayed is justice denied. We ensure precision at every step of your legal journey."',
      "cta_text" varchar DEFAULT 'GET LEGAL HELP',
      "cta_link" varchar DEFAULT '/consultation',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_consultation" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "form_heading" varchar DEFAULT 'Book Your Consultation',
      "form_subheading" varchar DEFAULT 'Take the first step toward editorial-grade legal curatorship.',
      "image_id" integer NOT NULL,
      "image_heading" varchar DEFAULT 'Commanding Legal Excellence.',
      "image_subheading" varchar DEFAULT 'Connect with our expert legal advisors for a curated strategy session tailored to your complex requirements.',
      "trust_text" varchar DEFAULT 'Trusted by 10,000+ Clients',
      "cta_button_text" varchar DEFAULT 'Confirm Consultation',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar NOT NULL,
      "description" varchar,
      "primary_button_text" varchar NOT NULL,
      "primary_button_link" varchar NOT NULL,
      "secondary_button_text" varchar,
      "secondary_button_link" varchar,
      "background_image_id" integer,
      "style" "enum_services_blocks_cta_style" DEFAULT 'default',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_blog_feed" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Latest Blog Posts',
      "source" "enum_services_blocks_blog_feed_source" DEFAULT 'latest',
      "service_id" integer,
      "location_id" integer,
      "category" varchar,
      "limit" numeric DEFAULT 6,
      "layout" "enum_services_blocks_blog_feed_layout" DEFAULT 'grid',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_news_feed" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Latest News',
      "source" "enum_services_blocks_news_feed_source" DEFAULT 'latest',
      "service_id" integer,
      "location_id" integer,
      "category" varchar,
      "limit" numeric DEFAULT 6,
      "layout" "enum_services_blocks_news_feed_layout" DEFAULT 'grid',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_gallery_block_images" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "caption" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_gallery_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Gallery',
      "source" "enum_services_blocks_gallery_block_source" DEFAULT 'manual',
      "gallery_id" integer,
      "layout" "enum_services_blocks_gallery_block_layout" DEFAULT 'grid',
      "columns" "enum_services_blocks_gallery_block_columns" DEFAULT '3',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_testimonials_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'What Our Clients Say',
      "description" varchar,
      "limit" numeric DEFAULT 6,
      "layout" "enum_services_blocks_testimonials_block_layout" DEFAULT 'grid',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_services_carousel_items_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_services_carousel_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "service_id" integer NOT NULL,
      "override_icon" "enum_services_blocks_services_carousel_items_override_icon",
      "background_image_id" integer
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_services_carousel" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Lead India Services' NOT NULL,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_lawyers_carousel" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Our Top Rated Lawyers' NOT NULL,
      "autoplay" boolean DEFAULT true,
      "interval" numeric DEFAULT 5000,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_code_snippet" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "identifier" varchar NOT NULL,
      "html_code" varchar NOT NULL,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_logos_logos" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL,
      "link" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Recognized by leading media outlets',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_documents_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "icon" "enum_services_blocks_documents_items_icon" DEFAULT 'document',
      "content" jsonb NOT NULL,
      "note" varchar
    );

    CREATE TABLE IF NOT EXISTS "services_blocks_documents" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar DEFAULT 'Documents Required for Court Marriage',
      "description" varchar DEFAULT 'Ensuring all paperwork is accurate and complete helps make the process smooth and hassle-free.',
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_target_type" "tgt" DEFAULT 'global',
      "block_name" varchar
    );

    -- services_rels already exists; just add the missing columns from the new layout blocks
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "pages_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "services_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "locations_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "faqs_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "blogs_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "testimonials_id" integer;
    ALTER TABLE "services_rels" ADD COLUMN IF NOT EXISTS "lawyers_id" integer;
  `)

  // Indexes for services_blocks_* tables — idempotent
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "services_blocks_hero_stats_order_idx" ON "services_blocks_hero_stats" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_hero_stats_parent_id_idx" ON "services_blocks_hero_stats" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_rich_content_order_idx" ON "services_blocks_rich_content" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_rich_content_parent_id_idx" ON "services_blocks_rich_content" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_highlights_items_order_idx" ON "services_blocks_highlights_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_highlights_items_parent_id_idx" ON "services_blocks_highlights_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_highlights_order_idx" ON "services_blocks_highlights" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_highlights_parent_id_idx" ON "services_blocks_highlights" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_why_choose_us_benefits_order_idx" ON "services_blocks_why_choose_us_benefits" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_why_choose_us_benefits_parent_id_idx" ON "services_blocks_why_choose_us_benefits" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_why_choose_us_trust_badges_order_idx" ON "services_blocks_why_choose_us_trust_badges" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_why_choose_us_trust_badges_parent_id_idx" ON "services_blocks_why_choose_us_trust_badges" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_why_choose_us_order_idx" ON "services_blocks_why_choose_us" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_why_choose_us_parent_id_idx" ON "services_blocks_why_choose_us" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_how_it_works_order_idx" ON "services_blocks_how_it_works" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_how_it_works_parent_id_idx" ON "services_blocks_how_it_works" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_consultation_order_idx" ON "services_blocks_consultation" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_consultation_parent_id_idx" ON "services_blocks_consultation" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_testimonials_block_order_idx" ON "services_blocks_testimonials_block" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_testimonials_block_parent_id_idx" ON "services_blocks_testimonials_block" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_lawyers_carousel_order_idx" ON "services_blocks_lawyers_carousel" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_lawyers_carousel_parent_id_idx" ON "services_blocks_lawyers_carousel" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_logos_order_idx" ON "services_blocks_logos" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_logos_parent_id_idx" ON "services_blocks_logos" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_blocks_documents_order_idx" ON "services_blocks_documents" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "services_blocks_documents_parent_id_idx" ON "services_blocks_documents" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "services_rels_order_idx" ON "services_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "services_rels_path_idx" ON "services_rels" USING btree ("path");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "services_rels";
    DROP TABLE IF EXISTS "services_blocks_documents";
    DROP TABLE IF EXISTS "services_blocks_documents_items";
    DROP TABLE IF EXISTS "services_blocks_logos";
    DROP TABLE IF EXISTS "services_blocks_logos_logos";
    DROP TABLE IF EXISTS "services_blocks_code_snippet";
    DROP TABLE IF EXISTS "services_blocks_lawyers_carousel";
    DROP TABLE IF EXISTS "services_blocks_services_carousel";
    DROP TABLE IF EXISTS "services_blocks_services_carousel_items";
    DROP TABLE IF EXISTS "services_blocks_services_carousel_items_highlights";
    DROP TABLE IF EXISTS "services_blocks_testimonials_block";
    DROP TABLE IF EXISTS "services_blocks_gallery_block";
    DROP TABLE IF EXISTS "services_blocks_gallery_block_images";
    DROP TABLE IF EXISTS "services_blocks_news_feed";
    DROP TABLE IF EXISTS "services_blocks_blog_feed";
    DROP TABLE IF EXISTS "services_blocks_cta";
    DROP TABLE IF EXISTS "services_blocks_consultation";
    DROP TABLE IF EXISTS "services_blocks_how_it_works";
    DROP TABLE IF EXISTS "services_blocks_how_it_works_steps";
    DROP TABLE IF EXISTS "services_blocks_registration_licenses";
    DROP TABLE IF EXISTS "services_blocks_registration_licenses_cards";
    DROP TABLE IF EXISTS "services_blocks_why_choose_us";
    DROP TABLE IF EXISTS "services_blocks_why_choose_us_trust_badges";
    DROP TABLE IF EXISTS "services_blocks_why_choose_us_benefits";
    DROP TABLE IF EXISTS "services_blocks_highlights";
    DROP TABLE IF EXISTS "services_blocks_highlights_items";
    DROP TABLE IF EXISTS "services_blocks_faq";
    DROP TABLE IF EXISTS "services_blocks_rich_content";
    DROP TABLE IF EXISTS "services_blocks_hero";
    DROP TABLE IF EXISTS "services_blocks_hero_stats";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_hero_stats_icon";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_hero_layout_style";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_hero_background_type";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_hero_background_color";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_hero_text_color_theme";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_hero_style";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_rich_content_max_width";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_faq_source";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_faq_auto_scope";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_faq_style";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_highlights_section_style";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_highlights_columns";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_why_choose_us_benefits_icon";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_registration_licenses_cards_icon";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_how_it_works_steps_icon";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_cta_style";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_blog_feed_source";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_blog_feed_layout";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_news_feed_source";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_news_feed_layout";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_gallery_block_source";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_gallery_block_layout";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_gallery_block_columns";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_testimonials_block_layout";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_services_carousel_items_override_icon";
    DROP TYPE IF EXISTS "public"."enum_services_blocks_documents_items_icon";
  `)
}
