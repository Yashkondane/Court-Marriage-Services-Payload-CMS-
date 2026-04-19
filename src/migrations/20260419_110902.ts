import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('developer', 'admin', 'blogManager');
  CREATE TYPE "public"."enum_pages_blocks_hero_stats_icon" AS ENUM('scale', 'check', 'users', 'clock', 'shield', 'star', 'file', 'trophy');
  CREATE TYPE "public"."enum_pages_blocks_hero_layout_style" AS ENUM('standard', 'withLeadForm');
  CREATE TYPE "public"."enum_pages_blocks_hero_background_type" AS ENUM('image', 'color');
  CREATE TYPE "public"."enum_pages_blocks_hero_background_color" AS ENUM('white', 'black', 'gold');
  CREATE TYPE "public"."enum_pages_blocks_hero_text_color_theme" AS ENUM('auto', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_hero_style" AS ENUM('fullWidth', 'split', 'centered');
  CREATE TYPE "public"."tgt" AS ENUM('global', 'selectedPages', 'selectedServices', 'selectedLocations');
  CREATE TYPE "public"."enum_pages_blocks_rich_content_max_width" AS ENUM('narrow', 'default', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_faq_source" AS ENUM('manual', 'auto');
  CREATE TYPE "public"."enum_pages_blocks_faq_auto_scope" AS ENUM('global', 'service', 'location', 'page');
  CREATE TYPE "public"."enum_pages_blocks_faq_style" AS ENUM('accordion', 'list');
  CREATE TYPE "public"."enum_pages_blocks_highlights_section_style" AS ENUM('cards', 'statsBar');
  CREATE TYPE "public"."enum_pages_blocks_highlights_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_why_choose_us_benefits_icon" AS ENUM('phone', 'strategy', 'gavel', 'trending', 'laptop', 'payments', 'shield', 'users');
  CREATE TYPE "public"."enum_pages_blocks_registration_licenses_cards_icon" AS ENUM('wallet', 'corporate', 'restaurant', 'business', 'public', 'verified', 'premium', 'policy', 'shield', 'gavel', 'speed');
  CREATE TYPE "public"."enum_pages_blocks_how_it_works_steps_icon" AS ENUM('document', 'handshake', 'gavel', 'scale', 'shield');
  CREATE TYPE "public"."enum_pages_blocks_cta_style" AS ENUM('default', 'banner', 'card');
  CREATE TYPE "public"."enum_pages_blocks_blog_feed_source" AS ENUM('latest', 'byService', 'byLocation', 'byCategory', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_blog_feed_layout" AS ENUM('grid', 'list', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_news_feed_source" AS ENUM('latest', 'byService', 'byLocation', 'byCategory', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_news_feed_layout" AS ENUM('grid', 'list', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_gallery_block_source" AS ENUM('manual', 'collection');
  CREATE TYPE "public"."enum_pages_blocks_gallery_block_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_gallery_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_block_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_services_carousel_items_override_icon" AS ENUM('', 'gavel', 'handshake', 'scale', 'building', 'file-contract', 'shield', 'user-tie', 'users', 'calculator', 'home', 'briefcase', 'landmark', 'money-bill', 'book', 'stamp');
  CREATE TYPE "public"."enum_pages_blocks_documents_items_icon" AS ENUM('document', 'location', 'calendar', 'camera', 'users', 'shield');
  CREATE TYPE "public"."enum_pages_seo_robots_meta" AS ENUM('index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('custom', 'service', 'location', 'serviceLocation');
  CREATE TYPE "public"."enum_services_blocks_hero_stats_icon" AS ENUM('scale', 'check', 'users', 'clock', 'shield', 'star', 'file', 'trophy');
  CREATE TYPE "public"."enum_services_blocks_hero_layout_style" AS ENUM('standard', 'withLeadForm');
  CREATE TYPE "public"."enum_services_blocks_hero_background_type" AS ENUM('image', 'color');
  CREATE TYPE "public"."enum_services_blocks_hero_background_color" AS ENUM('white', 'black', 'gold');
  CREATE TYPE "public"."enum_services_blocks_hero_text_color_theme" AS ENUM('auto', 'light', 'dark');
  CREATE TYPE "public"."enum_services_blocks_hero_style" AS ENUM('fullWidth', 'split', 'centered');
  CREATE TYPE "public"."enum_services_blocks_rich_content_max_width" AS ENUM('narrow', 'default', 'wide', 'full');
  CREATE TYPE "public"."enum_services_blocks_faq_source" AS ENUM('manual', 'auto');
  CREATE TYPE "public"."enum_services_blocks_faq_auto_scope" AS ENUM('global', 'service', 'location', 'page');
  CREATE TYPE "public"."enum_services_blocks_faq_style" AS ENUM('accordion', 'list');
  CREATE TYPE "public"."enum_services_blocks_highlights_section_style" AS ENUM('cards', 'statsBar');
  CREATE TYPE "public"."enum_services_blocks_highlights_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_blocks_why_choose_us_benefits_icon" AS ENUM('phone', 'strategy', 'gavel', 'trending', 'laptop', 'payments', 'shield', 'users');
  CREATE TYPE "public"."enum_services_blocks_registration_licenses_cards_icon" AS ENUM('wallet', 'corporate', 'restaurant', 'business', 'public', 'verified', 'premium', 'policy', 'shield', 'gavel', 'speed');
  CREATE TYPE "public"."enum_services_blocks_how_it_works_steps_icon" AS ENUM('document', 'handshake', 'gavel', 'scale', 'shield');
  CREATE TYPE "public"."enum_services_blocks_cta_style" AS ENUM('default', 'banner', 'card');
  CREATE TYPE "public"."enum_services_blocks_blog_feed_source" AS ENUM('latest', 'byService', 'byLocation', 'byCategory', 'manual');
  CREATE TYPE "public"."enum_services_blocks_blog_feed_layout" AS ENUM('grid', 'list', 'carousel');
  CREATE TYPE "public"."enum_services_blocks_news_feed_source" AS ENUM('latest', 'byService', 'byLocation', 'byCategory', 'manual');
  CREATE TYPE "public"."enum_services_blocks_news_feed_layout" AS ENUM('grid', 'list', 'carousel');
  CREATE TYPE "public"."enum_services_blocks_gallery_block_source" AS ENUM('manual', 'collection');
  CREATE TYPE "public"."enum_services_blocks_gallery_block_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum_services_blocks_gallery_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_blocks_testimonials_block_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_services_blocks_services_carousel_items_override_icon" AS ENUM('', 'gavel', 'handshake', 'scale', 'building', 'file-contract', 'shield', 'user-tie', 'users', 'calculator', 'home', 'briefcase', 'landmark', 'money-bill', 'book', 'stamp');
  CREATE TYPE "public"."enum_services_blocks_documents_items_icon" AS ENUM('document', 'location', 'calendar', 'camera', 'users', 'shield');
  CREATE TYPE "public"."enum_services_nav_dropdown" AS ENUM('find-a-lawyer', 'legal-matter', 'none');
  CREATE TYPE "public"."enum_services_ui_icon" AS ENUM('gavel', 'handshake', 'scale', 'building', 'file-contract', 'shield', 'user-tie', 'users', 'calculator', 'home', 'briefcase', 'landmark', 'money-bill', 'book', 'stamp');
  CREATE TYPE "public"."enum_services_seo_robots_meta" AS ENUM('index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow');
  CREATE TYPE "public"."enum_locations_type" AS ENUM('country', 'state', 'city', 'area');
  CREATE TYPE "public"."enum_blogs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blogs_seo_robots_meta" AS ENUM('index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow');
  CREATE TYPE "public"."enum__blogs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blogs_v_version_seo_robots_meta" AS ENUM('index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_news_seo_robots_meta" AS ENUM('index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_seo_robots_meta" AS ENUM('index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow');
  CREATE TYPE "public"."enum_faqs_scope" AS ENUM('global', 'service', 'location', 'page');
  CREATE TYPE "public"."enum_lawyers_status" AS ENUM('pending_review', 'approved', 'rejected', 'suspended');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'blogManager' NOT NULL,
  	"supabase_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"seo_title" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_hero_stats_icon" DEFAULT 'scale',
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout_style" "enum_pages_blocks_hero_layout_style" DEFAULT 'withLeadForm' NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"background_type" "enum_pages_blocks_hero_background_type" DEFAULT 'image',
  	"background_image_id" integer,
  	"background_color" "enum_pages_blocks_hero_background_color" DEFAULT 'black',
  	"text_color_theme" "enum_pages_blocks_hero_text_color_theme" DEFAULT 'light',
  	"show_search_bar" boolean DEFAULT true,
  	"cta_text" varchar DEFAULT 'Book Free Consultation',
  	"cta_link" varchar DEFAULT '/consultation',
  	"secondary_cta_text" varchar DEFAULT 'WhatsApp Us',
  	"secondary_cta_link" varchar DEFAULT 'https://wa.me/919650515469',
  	"style" "enum_pages_blocks_hero_style" DEFAULT 'fullWidth',
  	"show_stats_bar" boolean DEFAULT true,
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"max_width" "enum_pages_blocks_rich_content_max_width" DEFAULT 'default',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Frequently Asked Questions',
  	"description" varchar,
  	"source" "enum_pages_blocks_faq_source" DEFAULT 'manual',
  	"auto_scope" "enum_pages_blocks_faq_auto_scope",
  	"style" "enum_pages_blocks_faq_style" DEFAULT 'accordion',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_style" "enum_pages_blocks_highlights_section_style" DEFAULT 'cards',
  	"heading" varchar DEFAULT 'Why Choose Us',
  	"description" varchar,
  	"columns" "enum_pages_blocks_highlights_columns" DEFAULT '3',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_choose_us_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_pages_blocks_why_choose_us_benefits_icon" DEFAULT 'gavel'
  );
  
  CREATE TABLE "pages_blocks_why_choose_us_trust_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_why_choose_us" (
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
  
  CREATE TABLE "pages_blocks_registration_licenses_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_pages_blocks_registration_licenses_cards_icon" DEFAULT 'wallet',
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_registration_licenses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Business Compliance',
  	"heading" varchar DEFAULT 'Registration & Licenses' NOT NULL,
  	"subheading" varchar DEFAULT 'Seamless legal onboarding and regulatory compliance for modern enterprises. Guided by elite legal expertise.',
  	"cta_section_cta_heading" varchar DEFAULT 'Unsure about your requirements?',
  	"cta_section_cta_subheading" varchar DEFAULT 'Consult our senior legal partners for a custom compliance roadmap.',
  	"cta_section_cta_button_text" varchar DEFAULT 'Talk to a Lawyer',
  	"cta_section_cta_link" varchar DEFAULT '/consultation',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_pages_blocks_how_it_works_steps_icon" DEFAULT 'gavel'
  );
  
  CREATE TABLE "pages_blocks_how_it_works" (
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
  
  CREATE TABLE "pages_blocks_consultation" (
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
  
  CREATE TABLE "pages_blocks_cta" (
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
  	"style" "enum_pages_blocks_cta_style" DEFAULT 'default',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Latest Blog Posts',
  	"source" "enum_pages_blocks_blog_feed_source" DEFAULT 'latest',
  	"service_id" integer,
  	"location_id" integer,
  	"category" varchar,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_blog_feed_layout" DEFAULT 'grid',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_news_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Latest News',
  	"source" "enum_pages_blocks_news_feed_source" DEFAULT 'latest',
  	"service_id" integer,
  	"location_id" integer,
  	"category" varchar,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_news_feed_layout" DEFAULT 'grid',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_block_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Gallery',
  	"source" "enum_pages_blocks_gallery_block_source" DEFAULT 'manual',
  	"gallery_id" integer,
  	"layout" "enum_pages_blocks_gallery_block_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_gallery_block_columns" DEFAULT '3',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'What Our Clients Say',
  	"description" varchar,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_testimonials_block_layout" DEFAULT 'grid',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_carousel_items_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service_id" integer NOT NULL,
  	"override_icon" "enum_pages_blocks_services_carousel_items_override_icon",
  	"background_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_services_carousel" (
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
  
  CREATE TABLE "pages_blocks_lawyers_carousel" (
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
  
  CREATE TABLE "pages_blocks_code_snippet" (
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
  
  CREATE TABLE "pages_blocks_logos_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_logos" (
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
  
  CREATE TABLE "pages_blocks_documents_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_pages_blocks_documents_items_icon" DEFAULT 'document',
  	"content" jsonb NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE "pages_blocks_documents" (
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
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"service_id" integer,
  	"location_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_robots_meta" "enum_pages_seo_robots_meta" DEFAULT 'index,follow',
  	"seo_schema_markup" jsonb,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"page_type" "enum_pages_page_type" DEFAULT 'custom',
  	"published_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"locations_id" integer,
  	"faqs_id" integer,
  	"blogs_id" integer,
  	"news_id" integer,
  	"testimonials_id" integer,
  	"lawyers_id" integer
  );
  
  CREATE TABLE "services_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_blocks_hero_stats_icon" DEFAULT 'scale',
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "services_blocks_hero" (
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
  
  CREATE TABLE "services_blocks_rich_content" (
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
  
  CREATE TABLE "services_blocks_faq" (
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
  
  CREATE TABLE "services_blocks_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "services_blocks_highlights" (
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
  
  CREATE TABLE "services_blocks_why_choose_us_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_services_blocks_why_choose_us_benefits_icon" DEFAULT 'gavel'
  );
  
  CREATE TABLE "services_blocks_why_choose_us_trust_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_why_choose_us" (
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
  
  CREATE TABLE "services_blocks_registration_licenses_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_services_blocks_registration_licenses_cards_icon" DEFAULT 'wallet',
  	"link" varchar
  );
  
  CREATE TABLE "services_blocks_registration_licenses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Business Compliance',
  	"heading" varchar DEFAULT 'Registration & Licenses' NOT NULL,
  	"subheading" varchar DEFAULT 'Seamless legal onboarding and regulatory compliance for modern enterprises. Guided by elite legal expertise.',
  	"cta_section_cta_heading" varchar DEFAULT 'Unsure about your requirements?',
  	"cta_section_cta_subheading" varchar DEFAULT 'Consult our senior legal partners for a custom compliance roadmap.',
  	"cta_section_cta_button_text" varchar DEFAULT 'Talk to a Lawyer',
  	"cta_section_cta_link" varchar DEFAULT '/consultation',
  	"visibility_show_on_desktop" boolean DEFAULT true,
  	"visibility_show_on_mobile" boolean DEFAULT true,
  	"visibility_target_type" "tgt" DEFAULT 'global',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_services_blocks_how_it_works_steps_icon" DEFAULT 'gavel'
  );
  
  CREATE TABLE "services_blocks_how_it_works" (
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
  
  CREATE TABLE "services_blocks_consultation" (
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
  
  CREATE TABLE "services_blocks_cta" (
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
  
  CREATE TABLE "services_blocks_blog_feed" (
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
  
  CREATE TABLE "services_blocks_news_feed" (
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
  
  CREATE TABLE "services_blocks_gallery_block_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "services_blocks_gallery_block" (
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
  
  CREATE TABLE "services_blocks_testimonials_block" (
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
  
  CREATE TABLE "services_blocks_services_carousel_items_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_services_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service_id" integer NOT NULL,
  	"override_icon" "enum_services_blocks_services_carousel_items_override_icon",
  	"background_image_id" integer
  );
  
  CREATE TABLE "services_blocks_services_carousel" (
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
  
  CREATE TABLE "services_blocks_lawyers_carousel" (
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
  
  CREATE TABLE "services_blocks_code_snippet" (
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
  
  CREATE TABLE "services_blocks_logos_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "services_blocks_logos" (
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
  
  CREATE TABLE "services_blocks_documents_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"icon" "enum_services_blocks_documents_items_icon" DEFAULT 'document',
  	"content" jsonb NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE "services_blocks_documents" (
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
  
  CREATE TABLE "services_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"banner_id" integer,
  	"show_in_header" boolean DEFAULT false,
  	"menu_order" numeric DEFAULT 0,
  	"nav_dropdown" "enum_services_nav_dropdown",
  	"nav_category" varchar,
  	"nav_category_order" numeric DEFAULT 0,
  	"nav_label" varchar,
  	"icon_id" integer,
  	"ui_icon" "enum_services_ui_icon",
  	"content" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_robots_meta" "enum_services_seo_robots_meta" DEFAULT 'index,follow',
  	"seo_schema_markup" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer,
  	"locations_id" integer,
  	"faqs_id" integer,
  	"blogs_id" integer,
  	"news_id" integer,
  	"testimonials_id" integer,
  	"lawyers_id" integer
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_locations_type" NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"service_id" integer,
  	"location_id" integer,
  	"message" varchar,
  	"lawyer_id" integer,
  	"source_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blogs_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "blogs_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"content" jsonb,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"author_id" integer,
  	"status" "enum_blogs_status" DEFAULT 'draft',
  	"published_date" timestamp(3) with time zone,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_robots_meta" "enum_blogs_seo_robots_meta" DEFAULT 'index,follow',
  	"seo_schema_markup" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blogs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "blogs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"locations_id" integer
  );
  
  CREATE TABLE "_blogs_v_version_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blogs_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blogs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_content" jsonb,
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_author_id" integer,
  	"version_status" "enum__blogs_v_version_status" DEFAULT 'draft',
  	"version_published_date" timestamp(3) with time zone,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_keywords" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_canonical_url" varchar,
  	"version_seo_robots_meta" "enum__blogs_v_version_seo_robots_meta" DEFAULT 'index,follow',
  	"version_seo_schema_markup" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blogs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_blogs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"locations_id" integer
  );
  
  CREATE TABLE "news_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "news_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"content" jsonb,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"author_id" integer,
  	"status" "enum_news_status" DEFAULT 'draft',
  	"published_date" timestamp(3) with time zone,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_robots_meta" "enum_news_seo_robots_meta" DEFAULT 'index,follow',
  	"seo_schema_markup" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"locations_id" integer
  );
  
  CREATE TABLE "_news_v_version_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_content" jsonb,
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_author_id" integer,
  	"version_status" "enum__news_v_version_status" DEFAULT 'draft',
  	"version_published_date" timestamp(3) with time zone,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_keywords" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_canonical_url" varchar,
  	"version_seo_robots_meta" "enum__news_v_version_seo_robots_meta" DEFAULT 'index,follow',
  	"version_seo_schema_markup" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"locations_id" integer
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"scope" "enum_faqs_scope" DEFAULT 'global' NOT NULL,
  	"service_id" integer,
  	"location_id" integer,
  	"page_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"designation" varchar,
  	"content" varchar NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"photo_id" integer,
  	"service_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "lawyers_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar NOT NULL
  );
  
  CREATE TABLE "lawyers_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"degree" varchar NOT NULL,
  	"college" varchar NOT NULL,
  	"year" numeric
  );
  
  CREATE TABLE "lawyers_specializations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"years_in_field" numeric
  );
  
  CREATE TABLE "lawyers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"supabase_id" varchar,
  	"status" "enum_lawyers_status" DEFAULT 'pending_review' NOT NULL,
  	"status_note" varchar,
  	"is_sponsored" boolean DEFAULT false,
  	"is_premium_partner" boolean DEFAULT false,
  	"photo_id" integer,
  	"designation" varchar,
  	"bio" varchar,
  	"bar_council_id" varchar,
  	"experience" numeric,
  	"consultation_fee" varchar,
  	"available_hours" varchar,
  	"location_text" varchar,
  	"courts" varchar,
  	"location_id" integer,
  	"rating" numeric DEFAULT 0,
  	"rating_count" numeric DEFAULT 0,
  	"profile_views" numeric DEFAULT 0,
  	"response_time" varchar DEFAULT 'Typically responds in 1 hour',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "lawyer_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar DEFAULT 'Lawyer profile photo' NOT NULL,
  	"prefix" varchar DEFAULT 'lawyers',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"locations_id" integer,
  	"leads_id" integer,
  	"blogs_id" integer,
  	"news_id" integer,
  	"faqs_id" integer,
  	"testimonials_id" integer,
  	"gallery_id" integer,
  	"lawyers_id" integer,
  	"lawyer_media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_stats" ADD CONSTRAINT "pages_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_content" ADD CONSTRAINT "pages_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlights_items" ADD CONSTRAINT "pages_blocks_highlights_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlights_items" ADD CONSTRAINT "pages_blocks_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlights" ADD CONSTRAINT "pages_blocks_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_us_benefits" ADD CONSTRAINT "pages_blocks_why_choose_us_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_us_trust_badges" ADD CONSTRAINT "pages_blocks_why_choose_us_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_us" ADD CONSTRAINT "pages_blocks_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_registration_licenses_cards" ADD CONSTRAINT "pages_blocks_registration_licenses_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_registration_licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_registration_licenses" ADD CONSTRAINT "pages_blocks_registration_licenses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_steps" ADD CONSTRAINT "pages_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works" ADD CONSTRAINT "pages_blocks_how_it_works_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works" ADD CONSTRAINT "pages_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation" ADD CONSTRAINT "pages_blocks_consultation_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation" ADD CONSTRAINT "pages_blocks_consultation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_feed" ADD CONSTRAINT "pages_blocks_blog_feed_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_feed" ADD CONSTRAINT "pages_blocks_blog_feed_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_feed" ADD CONSTRAINT "pages_blocks_blog_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed" ADD CONSTRAINT "pages_blocks_news_feed_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed" ADD CONSTRAINT "pages_blocks_news_feed_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_feed" ADD CONSTRAINT "pages_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_block_images" ADD CONSTRAINT "pages_blocks_gallery_block_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_block_images" ADD CONSTRAINT "pages_blocks_gallery_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_block" ADD CONSTRAINT "pages_blocks_gallery_block_gallery_id_gallery_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_block" ADD CONSTRAINT "pages_blocks_gallery_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_block" ADD CONSTRAINT "pages_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_carousel_items_highlights" ADD CONSTRAINT "pages_blocks_services_carousel_items_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_carousel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_carousel_items" ADD CONSTRAINT "pages_blocks_services_carousel_items_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_carousel_items" ADD CONSTRAINT "pages_blocks_services_carousel_items_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_carousel_items" ADD CONSTRAINT "pages_blocks_services_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_carousel" ADD CONSTRAINT "pages_blocks_services_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lawyers_carousel" ADD CONSTRAINT "pages_blocks_lawyers_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_code_snippet" ADD CONSTRAINT "pages_blocks_code_snippet_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logos_logos" ADD CONSTRAINT "pages_blocks_logos_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logos_logos" ADD CONSTRAINT "pages_blocks_logos_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logos" ADD CONSTRAINT "pages_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_documents_items" ADD CONSTRAINT "pages_blocks_documents_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_documents" ADD CONSTRAINT "pages_blocks_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_lawyers_fk" FOREIGN KEY ("lawyers_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_stats" ADD CONSTRAINT "services_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_content" ADD CONSTRAINT "services_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_highlights_items" ADD CONSTRAINT "services_blocks_highlights_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_highlights_items" ADD CONSTRAINT "services_blocks_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_highlights" ADD CONSTRAINT "services_blocks_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_why_choose_us_benefits" ADD CONSTRAINT "services_blocks_why_choose_us_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_why_choose_us_trust_badges" ADD CONSTRAINT "services_blocks_why_choose_us_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_why_choose_us" ADD CONSTRAINT "services_blocks_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_registration_licenses_cards" ADD CONSTRAINT "services_blocks_registration_licenses_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_registration_licenses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_registration_licenses" ADD CONSTRAINT "services_blocks_registration_licenses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_how_it_works_steps" ADD CONSTRAINT "services_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_how_it_works" ADD CONSTRAINT "services_blocks_how_it_works_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_how_it_works" ADD CONSTRAINT "services_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_consultation" ADD CONSTRAINT "services_blocks_consultation_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_consultation" ADD CONSTRAINT "services_blocks_consultation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_blog_feed" ADD CONSTRAINT "services_blocks_blog_feed_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_blog_feed" ADD CONSTRAINT "services_blocks_blog_feed_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_blog_feed" ADD CONSTRAINT "services_blocks_blog_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_news_feed" ADD CONSTRAINT "services_blocks_news_feed_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_news_feed" ADD CONSTRAINT "services_blocks_news_feed_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_news_feed" ADD CONSTRAINT "services_blocks_news_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_block_images" ADD CONSTRAINT "services_blocks_gallery_block_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_block_images" ADD CONSTRAINT "services_blocks_gallery_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_block" ADD CONSTRAINT "services_blocks_gallery_block_gallery_id_gallery_id_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_gallery_block" ADD CONSTRAINT "services_blocks_gallery_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonials_block" ADD CONSTRAINT "services_blocks_testimonials_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_carousel_items_highlights" ADD CONSTRAINT "services_blocks_services_carousel_items_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_services_carousel_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_carousel_items" ADD CONSTRAINT "services_blocks_services_carousel_items_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_services_carousel_items" ADD CONSTRAINT "services_blocks_services_carousel_items_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_services_carousel_items" ADD CONSTRAINT "services_blocks_services_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_services_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_carousel" ADD CONSTRAINT "services_blocks_services_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_lawyers_carousel" ADD CONSTRAINT "services_blocks_lawyers_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_code_snippet" ADD CONSTRAINT "services_blocks_code_snippet_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_logos_logos" ADD CONSTRAINT "services_blocks_logos_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_logos_logos" ADD CONSTRAINT "services_blocks_logos_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_logos" ADD CONSTRAINT "services_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_documents_items" ADD CONSTRAINT "services_blocks_documents_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_documents" ADD CONSTRAINT "services_blocks_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_highlights" ADD CONSTRAINT "services_highlights_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_highlights" ADD CONSTRAINT "services_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_lawyers_fk" FOREIGN KEY ("lawyers_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_lawyer_id_lawyers_id_fk" FOREIGN KEY ("lawyer_id") REFERENCES "public"."lawyers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs_categories" ADD CONSTRAINT "blogs_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_tags" ADD CONSTRAINT "blogs_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_categories" ADD CONSTRAINT "_blogs_v_version_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_version_tags" ADD CONSTRAINT "_blogs_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_parent_id_blogs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_categories" ADD CONSTRAINT "news_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_tags" ADD CONSTRAINT "news_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_categories" ADD CONSTRAINT "_news_v_version_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_tags" ADD CONSTRAINT "_news_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_languages" ADD CONSTRAINT "lawyers_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_education" ADD CONSTRAINT "lawyers_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers_specializations" ADD CONSTRAINT "lawyers_specializations_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lawyers_specializations" ADD CONSTRAINT "lawyers_specializations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lawyers" ADD CONSTRAINT "lawyers_photo_id_lawyer_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."lawyer_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lawyers" ADD CONSTRAINT "lawyers_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lawyers_fk" FOREIGN KEY ("lawyers_id") REFERENCES "public"."lawyers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lawyer_media_fk" FOREIGN KEY ("lawyer_media_id") REFERENCES "public"."lawyer_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "pages_blocks_hero_stats_order_idx" ON "pages_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_stats_parent_id_idx" ON "pages_blocks_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_rich_content_order_idx" ON "pages_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_content_parent_id_idx" ON "pages_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_content_path_idx" ON "pages_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_highlights_items_order_idx" ON "pages_blocks_highlights_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_highlights_items_parent_id_idx" ON "pages_blocks_highlights_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_highlights_items_icon_idx" ON "pages_blocks_highlights_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_highlights_order_idx" ON "pages_blocks_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_highlights_parent_id_idx" ON "pages_blocks_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_highlights_path_idx" ON "pages_blocks_highlights" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_choose_us_benefits_order_idx" ON "pages_blocks_why_choose_us_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_choose_us_benefits_parent_id_idx" ON "pages_blocks_why_choose_us_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_choose_us_trust_badges_order_idx" ON "pages_blocks_why_choose_us_trust_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_choose_us_trust_badges_parent_id_idx" ON "pages_blocks_why_choose_us_trust_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_choose_us_order_idx" ON "pages_blocks_why_choose_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_choose_us_parent_id_idx" ON "pages_blocks_why_choose_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_choose_us_path_idx" ON "pages_blocks_why_choose_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_registration_licenses_cards_order_idx" ON "pages_blocks_registration_licenses_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_registration_licenses_cards_parent_id_idx" ON "pages_blocks_registration_licenses_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_registration_licenses_order_idx" ON "pages_blocks_registration_licenses" USING btree ("_order");
  CREATE INDEX "pages_blocks_registration_licenses_parent_id_idx" ON "pages_blocks_registration_licenses" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_registration_licenses_path_idx" ON "pages_blocks_registration_licenses" USING btree ("_path");
  CREATE INDEX "pages_blocks_how_it_works_steps_order_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_steps_parent_id_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_order_idx" ON "pages_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_parent_id_idx" ON "pages_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_path_idx" ON "pages_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "pages_blocks_how_it_works_background_image_idx" ON "pages_blocks_how_it_works" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_consultation_order_idx" ON "pages_blocks_consultation" USING btree ("_order");
  CREATE INDEX "pages_blocks_consultation_parent_id_idx" ON "pages_blocks_consultation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_consultation_path_idx" ON "pages_blocks_consultation" USING btree ("_path");
  CREATE INDEX "pages_blocks_consultation_image_idx" ON "pages_blocks_consultation" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_background_image_idx" ON "pages_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_blog_feed_order_idx" ON "pages_blocks_blog_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_feed_parent_id_idx" ON "pages_blocks_blog_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_feed_path_idx" ON "pages_blocks_blog_feed" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_feed_service_idx" ON "pages_blocks_blog_feed" USING btree ("service_id");
  CREATE INDEX "pages_blocks_blog_feed_location_idx" ON "pages_blocks_blog_feed" USING btree ("location_id");
  CREATE INDEX "pages_blocks_news_feed_order_idx" ON "pages_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_feed_parent_id_idx" ON "pages_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_feed_path_idx" ON "pages_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "pages_blocks_news_feed_service_idx" ON "pages_blocks_news_feed" USING btree ("service_id");
  CREATE INDEX "pages_blocks_news_feed_location_idx" ON "pages_blocks_news_feed" USING btree ("location_id");
  CREATE INDEX "pages_blocks_gallery_block_images_order_idx" ON "pages_blocks_gallery_block_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_block_images_parent_id_idx" ON "pages_blocks_gallery_block_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_block_images_image_idx" ON "pages_blocks_gallery_block_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_block_order_idx" ON "pages_blocks_gallery_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_block_parent_id_idx" ON "pages_blocks_gallery_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_block_path_idx" ON "pages_blocks_gallery_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_block_gallery_idx" ON "pages_blocks_gallery_block" USING btree ("gallery_id");
  CREATE INDEX "pages_blocks_testimonials_block_order_idx" ON "pages_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_block_parent_id_idx" ON "pages_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_block_path_idx" ON "pages_blocks_testimonials_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_carousel_items_highlights_order_idx" ON "pages_blocks_services_carousel_items_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_carousel_items_highlights_parent_id_idx" ON "pages_blocks_services_carousel_items_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_carousel_items_order_idx" ON "pages_blocks_services_carousel_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_carousel_items_parent_id_idx" ON "pages_blocks_services_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_carousel_items_service_idx" ON "pages_blocks_services_carousel_items" USING btree ("service_id");
  CREATE INDEX "pages_blocks_services_carousel_items_background_image_idx" ON "pages_blocks_services_carousel_items" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_services_carousel_order_idx" ON "pages_blocks_services_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_carousel_parent_id_idx" ON "pages_blocks_services_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_carousel_path_idx" ON "pages_blocks_services_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_lawyers_carousel_order_idx" ON "pages_blocks_lawyers_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_lawyers_carousel_parent_id_idx" ON "pages_blocks_lawyers_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lawyers_carousel_path_idx" ON "pages_blocks_lawyers_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_code_snippet_order_idx" ON "pages_blocks_code_snippet" USING btree ("_order");
  CREATE INDEX "pages_blocks_code_snippet_parent_id_idx" ON "pages_blocks_code_snippet" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_code_snippet_path_idx" ON "pages_blocks_code_snippet" USING btree ("_path");
  CREATE INDEX "pages_blocks_logos_logos_order_idx" ON "pages_blocks_logos_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logos_logos_parent_id_idx" ON "pages_blocks_logos_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logos_logos_image_idx" ON "pages_blocks_logos_logos" USING btree ("image_id");
  CREATE INDEX "pages_blocks_logos_order_idx" ON "pages_blocks_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logos_parent_id_idx" ON "pages_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logos_path_idx" ON "pages_blocks_logos" USING btree ("_path");
  CREATE INDEX "pages_blocks_documents_items_order_idx" ON "pages_blocks_documents_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_documents_items_parent_id_idx" ON "pages_blocks_documents_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_documents_order_idx" ON "pages_blocks_documents" USING btree ("_order");
  CREATE INDEX "pages_blocks_documents_parent_id_idx" ON "pages_blocks_documents" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_documents_path_idx" ON "pages_blocks_documents" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_service_idx" ON "pages" USING btree ("service_id");
  CREATE INDEX "pages_location_idx" ON "pages" USING btree ("location_id");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_locations_id_idx" ON "pages_rels" USING btree ("locations_id");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "pages_rels_blogs_id_idx" ON "pages_rels" USING btree ("blogs_id");
  CREATE INDEX "pages_rels_news_id_idx" ON "pages_rels" USING btree ("news_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_lawyers_id_idx" ON "pages_rels" USING btree ("lawyers_id");
  CREATE INDEX "services_blocks_hero_stats_order_idx" ON "services_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_stats_parent_id_idx" ON "services_blocks_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_background_image_idx" ON "services_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "services_blocks_rich_content_order_idx" ON "services_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_content_parent_id_idx" ON "services_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_content_path_idx" ON "services_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE INDEX "services_blocks_highlights_items_order_idx" ON "services_blocks_highlights_items" USING btree ("_order");
  CREATE INDEX "services_blocks_highlights_items_parent_id_idx" ON "services_blocks_highlights_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_highlights_items_icon_idx" ON "services_blocks_highlights_items" USING btree ("icon_id");
  CREATE INDEX "services_blocks_highlights_order_idx" ON "services_blocks_highlights" USING btree ("_order");
  CREATE INDEX "services_blocks_highlights_parent_id_idx" ON "services_blocks_highlights" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_highlights_path_idx" ON "services_blocks_highlights" USING btree ("_path");
  CREATE INDEX "services_blocks_why_choose_us_benefits_order_idx" ON "services_blocks_why_choose_us_benefits" USING btree ("_order");
  CREATE INDEX "services_blocks_why_choose_us_benefits_parent_id_idx" ON "services_blocks_why_choose_us_benefits" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_why_choose_us_trust_badges_order_idx" ON "services_blocks_why_choose_us_trust_badges" USING btree ("_order");
  CREATE INDEX "services_blocks_why_choose_us_trust_badges_parent_id_idx" ON "services_blocks_why_choose_us_trust_badges" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_why_choose_us_order_idx" ON "services_blocks_why_choose_us" USING btree ("_order");
  CREATE INDEX "services_blocks_why_choose_us_parent_id_idx" ON "services_blocks_why_choose_us" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_why_choose_us_path_idx" ON "services_blocks_why_choose_us" USING btree ("_path");
  CREATE INDEX "services_blocks_registration_licenses_cards_order_idx" ON "services_blocks_registration_licenses_cards" USING btree ("_order");
  CREATE INDEX "services_blocks_registration_licenses_cards_parent_id_idx" ON "services_blocks_registration_licenses_cards" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_registration_licenses_order_idx" ON "services_blocks_registration_licenses" USING btree ("_order");
  CREATE INDEX "services_blocks_registration_licenses_parent_id_idx" ON "services_blocks_registration_licenses" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_registration_licenses_path_idx" ON "services_blocks_registration_licenses" USING btree ("_path");
  CREATE INDEX "services_blocks_how_it_works_steps_order_idx" ON "services_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_how_it_works_steps_parent_id_idx" ON "services_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_how_it_works_order_idx" ON "services_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "services_blocks_how_it_works_parent_id_idx" ON "services_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_how_it_works_path_idx" ON "services_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "services_blocks_how_it_works_background_image_idx" ON "services_blocks_how_it_works" USING btree ("background_image_id");
  CREATE INDEX "services_blocks_consultation_order_idx" ON "services_blocks_consultation" USING btree ("_order");
  CREATE INDEX "services_blocks_consultation_parent_id_idx" ON "services_blocks_consultation" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_consultation_path_idx" ON "services_blocks_consultation" USING btree ("_path");
  CREATE INDEX "services_blocks_consultation_image_idx" ON "services_blocks_consultation" USING btree ("image_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE INDEX "services_blocks_cta_background_image_idx" ON "services_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "services_blocks_blog_feed_order_idx" ON "services_blocks_blog_feed" USING btree ("_order");
  CREATE INDEX "services_blocks_blog_feed_parent_id_idx" ON "services_blocks_blog_feed" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_blog_feed_path_idx" ON "services_blocks_blog_feed" USING btree ("_path");
  CREATE INDEX "services_blocks_blog_feed_service_idx" ON "services_blocks_blog_feed" USING btree ("service_id");
  CREATE INDEX "services_blocks_blog_feed_location_idx" ON "services_blocks_blog_feed" USING btree ("location_id");
  CREATE INDEX "services_blocks_news_feed_order_idx" ON "services_blocks_news_feed" USING btree ("_order");
  CREATE INDEX "services_blocks_news_feed_parent_id_idx" ON "services_blocks_news_feed" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_news_feed_path_idx" ON "services_blocks_news_feed" USING btree ("_path");
  CREATE INDEX "services_blocks_news_feed_service_idx" ON "services_blocks_news_feed" USING btree ("service_id");
  CREATE INDEX "services_blocks_news_feed_location_idx" ON "services_blocks_news_feed" USING btree ("location_id");
  CREATE INDEX "services_blocks_gallery_block_images_order_idx" ON "services_blocks_gallery_block_images" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_block_images_parent_id_idx" ON "services_blocks_gallery_block_images" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_block_images_image_idx" ON "services_blocks_gallery_block_images" USING btree ("image_id");
  CREATE INDEX "services_blocks_gallery_block_order_idx" ON "services_blocks_gallery_block" USING btree ("_order");
  CREATE INDEX "services_blocks_gallery_block_parent_id_idx" ON "services_blocks_gallery_block" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_gallery_block_path_idx" ON "services_blocks_gallery_block" USING btree ("_path");
  CREATE INDEX "services_blocks_gallery_block_gallery_idx" ON "services_blocks_gallery_block" USING btree ("gallery_id");
  CREATE INDEX "services_blocks_testimonials_block_order_idx" ON "services_blocks_testimonials_block" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonials_block_parent_id_idx" ON "services_blocks_testimonials_block" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonials_block_path_idx" ON "services_blocks_testimonials_block" USING btree ("_path");
  CREATE INDEX "services_blocks_services_carousel_items_highlights_order_idx" ON "services_blocks_services_carousel_items_highlights" USING btree ("_order");
  CREATE INDEX "services_blocks_services_carousel_items_highlights_parent_id_idx" ON "services_blocks_services_carousel_items_highlights" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_carousel_items_order_idx" ON "services_blocks_services_carousel_items" USING btree ("_order");
  CREATE INDEX "services_blocks_services_carousel_items_parent_id_idx" ON "services_blocks_services_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_carousel_items_service_idx" ON "services_blocks_services_carousel_items" USING btree ("service_id");
  CREATE INDEX "services_blocks_services_carousel_items_background_image_idx" ON "services_blocks_services_carousel_items" USING btree ("background_image_id");
  CREATE INDEX "services_blocks_services_carousel_order_idx" ON "services_blocks_services_carousel" USING btree ("_order");
  CREATE INDEX "services_blocks_services_carousel_parent_id_idx" ON "services_blocks_services_carousel" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_carousel_path_idx" ON "services_blocks_services_carousel" USING btree ("_path");
  CREATE INDEX "services_blocks_lawyers_carousel_order_idx" ON "services_blocks_lawyers_carousel" USING btree ("_order");
  CREATE INDEX "services_blocks_lawyers_carousel_parent_id_idx" ON "services_blocks_lawyers_carousel" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_lawyers_carousel_path_idx" ON "services_blocks_lawyers_carousel" USING btree ("_path");
  CREATE INDEX "services_blocks_code_snippet_order_idx" ON "services_blocks_code_snippet" USING btree ("_order");
  CREATE INDEX "services_blocks_code_snippet_parent_id_idx" ON "services_blocks_code_snippet" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_code_snippet_path_idx" ON "services_blocks_code_snippet" USING btree ("_path");
  CREATE INDEX "services_blocks_logos_logos_order_idx" ON "services_blocks_logos_logos" USING btree ("_order");
  CREATE INDEX "services_blocks_logos_logos_parent_id_idx" ON "services_blocks_logos_logos" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_logos_logos_image_idx" ON "services_blocks_logos_logos" USING btree ("image_id");
  CREATE INDEX "services_blocks_logos_order_idx" ON "services_blocks_logos" USING btree ("_order");
  CREATE INDEX "services_blocks_logos_parent_id_idx" ON "services_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_logos_path_idx" ON "services_blocks_logos" USING btree ("_path");
  CREATE INDEX "services_blocks_documents_items_order_idx" ON "services_blocks_documents_items" USING btree ("_order");
  CREATE INDEX "services_blocks_documents_items_parent_id_idx" ON "services_blocks_documents_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_documents_order_idx" ON "services_blocks_documents" USING btree ("_order");
  CREATE INDEX "services_blocks_documents_parent_id_idx" ON "services_blocks_documents" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_documents_path_idx" ON "services_blocks_documents" USING btree ("_path");
  CREATE INDEX "services_highlights_order_idx" ON "services_highlights" USING btree ("_order");
  CREATE INDEX "services_highlights_parent_id_idx" ON "services_highlights" USING btree ("_parent_id");
  CREATE INDEX "services_highlights_icon_idx" ON "services_highlights" USING btree ("icon_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_banner_idx" ON "services" USING btree ("banner_id");
  CREATE INDEX "services_icon_idx" ON "services" USING btree ("icon_id");
  CREATE INDEX "services_seo_seo_og_image_idx" ON "services" USING btree ("seo_og_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_locations_id_idx" ON "services_rels" USING btree ("locations_id");
  CREATE INDEX "services_rels_faqs_id_idx" ON "services_rels" USING btree ("faqs_id");
  CREATE INDEX "services_rels_blogs_id_idx" ON "services_rels" USING btree ("blogs_id");
  CREATE INDEX "services_rels_news_id_idx" ON "services_rels" USING btree ("news_id");
  CREATE INDEX "services_rels_testimonials_id_idx" ON "services_rels" USING btree ("testimonials_id");
  CREATE INDEX "services_rels_lawyers_id_idx" ON "services_rels" USING btree ("lawyers_id");
  CREATE INDEX "locations_parent_idx" ON "locations" USING btree ("parent_id");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "leads_service_idx" ON "leads" USING btree ("service_id");
  CREATE INDEX "leads_location_idx" ON "leads" USING btree ("location_id");
  CREATE INDEX "leads_lawyer_idx" ON "leads" USING btree ("lawyer_id");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "blogs_categories_order_idx" ON "blogs_categories" USING btree ("_order");
  CREATE INDEX "blogs_categories_parent_id_idx" ON "blogs_categories" USING btree ("_parent_id");
  CREATE INDEX "blogs_tags_order_idx" ON "blogs_tags" USING btree ("_order");
  CREATE INDEX "blogs_tags_parent_id_idx" ON "blogs_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "blogs_featured_image_idx" ON "blogs" USING btree ("featured_image_id");
  CREATE INDEX "blogs_author_idx" ON "blogs" USING btree ("author_id");
  CREATE INDEX "blogs_seo_seo_og_image_idx" ON "blogs" USING btree ("seo_og_image_id");
  CREATE INDEX "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
  CREATE INDEX "blogs__status_idx" ON "blogs" USING btree ("_status");
  CREATE INDEX "blogs_rels_order_idx" ON "blogs_rels" USING btree ("order");
  CREATE INDEX "blogs_rels_parent_idx" ON "blogs_rels" USING btree ("parent_id");
  CREATE INDEX "blogs_rels_path_idx" ON "blogs_rels" USING btree ("path");
  CREATE INDEX "blogs_rels_services_id_idx" ON "blogs_rels" USING btree ("services_id");
  CREATE INDEX "blogs_rels_locations_id_idx" ON "blogs_rels" USING btree ("locations_id");
  CREATE INDEX "_blogs_v_version_categories_order_idx" ON "_blogs_v_version_categories" USING btree ("_order");
  CREATE INDEX "_blogs_v_version_categories_parent_id_idx" ON "_blogs_v_version_categories" USING btree ("_parent_id");
  CREATE INDEX "_blogs_v_version_tags_order_idx" ON "_blogs_v_version_tags" USING btree ("_order");
  CREATE INDEX "_blogs_v_version_tags_parent_id_idx" ON "_blogs_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_blogs_v_parent_idx" ON "_blogs_v" USING btree ("parent_id");
  CREATE INDEX "_blogs_v_version_version_slug_idx" ON "_blogs_v" USING btree ("version_slug");
  CREATE INDEX "_blogs_v_version_version_featured_image_idx" ON "_blogs_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blogs_v_version_version_author_idx" ON "_blogs_v" USING btree ("version_author_id");
  CREATE INDEX "_blogs_v_version_seo_version_seo_og_image_idx" ON "_blogs_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_blogs_v_version_version_updated_at_idx" ON "_blogs_v" USING btree ("version_updated_at");
  CREATE INDEX "_blogs_v_version_version_created_at_idx" ON "_blogs_v" USING btree ("version_created_at");
  CREATE INDEX "_blogs_v_version_version__status_idx" ON "_blogs_v" USING btree ("version__status");
  CREATE INDEX "_blogs_v_created_at_idx" ON "_blogs_v" USING btree ("created_at");
  CREATE INDEX "_blogs_v_updated_at_idx" ON "_blogs_v" USING btree ("updated_at");
  CREATE INDEX "_blogs_v_latest_idx" ON "_blogs_v" USING btree ("latest");
  CREATE INDEX "_blogs_v_rels_order_idx" ON "_blogs_v_rels" USING btree ("order");
  CREATE INDEX "_blogs_v_rels_parent_idx" ON "_blogs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blogs_v_rels_path_idx" ON "_blogs_v_rels" USING btree ("path");
  CREATE INDEX "_blogs_v_rels_services_id_idx" ON "_blogs_v_rels" USING btree ("services_id");
  CREATE INDEX "_blogs_v_rels_locations_id_idx" ON "_blogs_v_rels" USING btree ("locations_id");
  CREATE INDEX "news_categories_order_idx" ON "news_categories" USING btree ("_order");
  CREATE INDEX "news_categories_parent_id_idx" ON "news_categories" USING btree ("_parent_id");
  CREATE INDEX "news_tags_order_idx" ON "news_tags" USING btree ("_order");
  CREATE INDEX "news_tags_parent_id_idx" ON "news_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_featured_image_idx" ON "news" USING btree ("featured_image_id");
  CREATE INDEX "news_author_idx" ON "news" USING btree ("author_id");
  CREATE INDEX "news_seo_seo_og_image_idx" ON "news" USING btree ("seo_og_image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_services_id_idx" ON "news_rels" USING btree ("services_id");
  CREATE INDEX "news_rels_locations_id_idx" ON "news_rels" USING btree ("locations_id");
  CREATE INDEX "_news_v_version_categories_order_idx" ON "_news_v_version_categories" USING btree ("_order");
  CREATE INDEX "_news_v_version_categories_parent_id_idx" ON "_news_v_version_categories" USING btree ("_parent_id");
  CREATE INDEX "_news_v_version_tags_order_idx" ON "_news_v_version_tags" USING btree ("_order");
  CREATE INDEX "_news_v_version_tags_parent_id_idx" ON "_news_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_featured_image_idx" ON "_news_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_news_v_version_version_author_idx" ON "_news_v" USING btree ("version_author_id");
  CREATE INDEX "_news_v_version_seo_version_seo_og_image_idx" ON "_news_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
  CREATE INDEX "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
  CREATE INDEX "_news_v_rels_services_id_idx" ON "_news_v_rels" USING btree ("services_id");
  CREATE INDEX "_news_v_rels_locations_id_idx" ON "_news_v_rels" USING btree ("locations_id");
  CREATE INDEX "faqs_service_idx" ON "faqs" USING btree ("service_id");
  CREATE INDEX "faqs_location_idx" ON "faqs" USING btree ("location_id");
  CREATE INDEX "faqs_page_idx" ON "faqs" USING btree ("page_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_service_idx" ON "testimonials" USING btree ("service_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "gallery_images_order_idx" ON "gallery_images" USING btree ("_order");
  CREATE INDEX "gallery_images_parent_id_idx" ON "gallery_images" USING btree ("_parent_id");
  CREATE INDEX "gallery_images_image_idx" ON "gallery_images" USING btree ("image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE INDEX "lawyers_languages_order_idx" ON "lawyers_languages" USING btree ("_order");
  CREATE INDEX "lawyers_languages_parent_id_idx" ON "lawyers_languages" USING btree ("_parent_id");
  CREATE INDEX "lawyers_education_order_idx" ON "lawyers_education" USING btree ("_order");
  CREATE INDEX "lawyers_education_parent_id_idx" ON "lawyers_education" USING btree ("_parent_id");
  CREATE INDEX "lawyers_specializations_order_idx" ON "lawyers_specializations" USING btree ("_order");
  CREATE INDEX "lawyers_specializations_parent_id_idx" ON "lawyers_specializations" USING btree ("_parent_id");
  CREATE INDEX "lawyers_specializations_service_idx" ON "lawyers_specializations" USING btree ("service_id");
  CREATE UNIQUE INDEX "lawyers_slug_idx" ON "lawyers" USING btree ("slug");
  CREATE UNIQUE INDEX "lawyers_email_idx" ON "lawyers" USING btree ("email");
  CREATE UNIQUE INDEX "lawyers_supabase_id_idx" ON "lawyers" USING btree ("supabase_id");
  CREATE INDEX "lawyers_photo_idx" ON "lawyers" USING btree ("photo_id");
  CREATE INDEX "lawyers_location_idx" ON "lawyers" USING btree ("location_id");
  CREATE INDEX "lawyers_updated_at_idx" ON "lawyers" USING btree ("updated_at");
  CREATE INDEX "lawyers_created_at_idx" ON "lawyers" USING btree ("created_at");
  CREATE INDEX "lawyer_media_updated_at_idx" ON "lawyer_media" USING btree ("updated_at");
  CREATE INDEX "lawyer_media_created_at_idx" ON "lawyer_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "lawyer_media_filename_idx" ON "lawyer_media" USING btree ("filename");
  CREATE INDEX "lawyer_media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "lawyer_media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "lawyer_media_sizes_card_sizes_card_filename_idx" ON "lawyer_media" USING btree ("sizes_card_filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_lawyers_id_idx" ON "payload_locked_documents_rels" USING btree ("lawyers_id");
  CREATE INDEX "payload_locked_documents_rels_lawyer_media_id_idx" ON "payload_locked_documents_rels" USING btree ("lawyer_media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_stats" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_content" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_highlights_items" CASCADE;
  DROP TABLE "pages_blocks_highlights" CASCADE;
  DROP TABLE "pages_blocks_why_choose_us_benefits" CASCADE;
  DROP TABLE "pages_blocks_why_choose_us_trust_badges" CASCADE;
  DROP TABLE "pages_blocks_why_choose_us" CASCADE;
  DROP TABLE "pages_blocks_registration_licenses_cards" CASCADE;
  DROP TABLE "pages_blocks_registration_licenses" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "pages_blocks_how_it_works" CASCADE;
  DROP TABLE "pages_blocks_consultation" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_blog_feed" CASCADE;
  DROP TABLE "pages_blocks_news_feed" CASCADE;
  DROP TABLE "pages_blocks_gallery_block_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_block" CASCADE;
  DROP TABLE "pages_blocks_testimonials_block" CASCADE;
  DROP TABLE "pages_blocks_services_carousel_items_highlights" CASCADE;
  DROP TABLE "pages_blocks_services_carousel_items" CASCADE;
  DROP TABLE "pages_blocks_services_carousel" CASCADE;
  DROP TABLE "pages_blocks_lawyers_carousel" CASCADE;
  DROP TABLE "pages_blocks_code_snippet" CASCADE;
  DROP TABLE "pages_blocks_logos_logos" CASCADE;
  DROP TABLE "pages_blocks_logos" CASCADE;
  DROP TABLE "pages_blocks_documents_items" CASCADE;
  DROP TABLE "pages_blocks_documents" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "services_blocks_hero_stats" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_rich_content" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_highlights_items" CASCADE;
  DROP TABLE "services_blocks_highlights" CASCADE;
  DROP TABLE "services_blocks_why_choose_us_benefits" CASCADE;
  DROP TABLE "services_blocks_why_choose_us_trust_badges" CASCADE;
  DROP TABLE "services_blocks_why_choose_us" CASCADE;
  DROP TABLE "services_blocks_registration_licenses_cards" CASCADE;
  DROP TABLE "services_blocks_registration_licenses" CASCADE;
  DROP TABLE "services_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "services_blocks_how_it_works" CASCADE;
  DROP TABLE "services_blocks_consultation" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_blog_feed" CASCADE;
  DROP TABLE "services_blocks_news_feed" CASCADE;
  DROP TABLE "services_blocks_gallery_block_images" CASCADE;
  DROP TABLE "services_blocks_gallery_block" CASCADE;
  DROP TABLE "services_blocks_testimonials_block" CASCADE;
  DROP TABLE "services_blocks_services_carousel_items_highlights" CASCADE;
  DROP TABLE "services_blocks_services_carousel_items" CASCADE;
  DROP TABLE "services_blocks_services_carousel" CASCADE;
  DROP TABLE "services_blocks_lawyers_carousel" CASCADE;
  DROP TABLE "services_blocks_code_snippet" CASCADE;
  DROP TABLE "services_blocks_logos_logos" CASCADE;
  DROP TABLE "services_blocks_logos" CASCADE;
  DROP TABLE "services_blocks_documents_items" CASCADE;
  DROP TABLE "services_blocks_documents" CASCADE;
  DROP TABLE "services_highlights" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "blogs_categories" CASCADE;
  DROP TABLE "blogs_tags" CASCADE;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "blogs_rels" CASCADE;
  DROP TABLE "_blogs_v_version_categories" CASCADE;
  DROP TABLE "_blogs_v_version_tags" CASCADE;
  DROP TABLE "_blogs_v" CASCADE;
  DROP TABLE "_blogs_v_rels" CASCADE;
  DROP TABLE "news_categories" CASCADE;
  DROP TABLE "news_tags" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "_news_v_version_categories" CASCADE;
  DROP TABLE "_news_v_version_tags" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_rels" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "gallery_images" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "lawyers_languages" CASCADE;
  DROP TABLE "lawyers_education" CASCADE;
  DROP TABLE "lawyers_specializations" CASCADE;
  DROP TABLE "lawyers" CASCADE;
  DROP TABLE "lawyer_media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_blocks_hero_stats_icon";
  DROP TYPE "public"."enum_pages_blocks_hero_layout_style";
  DROP TYPE "public"."enum_pages_blocks_hero_background_type";
  DROP TYPE "public"."enum_pages_blocks_hero_background_color";
  DROP TYPE "public"."enum_pages_blocks_hero_text_color_theme";
  DROP TYPE "public"."enum_pages_blocks_hero_style";
  DROP TYPE "public"."tgt";
  DROP TYPE "public"."enum_pages_blocks_rich_content_max_width";
  DROP TYPE "public"."enum_pages_blocks_faq_source";
  DROP TYPE "public"."enum_pages_blocks_faq_auto_scope";
  DROP TYPE "public"."enum_pages_blocks_faq_style";
  DROP TYPE "public"."enum_pages_blocks_highlights_section_style";
  DROP TYPE "public"."enum_pages_blocks_highlights_columns";
  DROP TYPE "public"."enum_pages_blocks_why_choose_us_benefits_icon";
  DROP TYPE "public"."enum_pages_blocks_registration_licenses_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_how_it_works_steps_icon";
  DROP TYPE "public"."enum_pages_blocks_cta_style";
  DROP TYPE "public"."enum_pages_blocks_blog_feed_source";
  DROP TYPE "public"."enum_pages_blocks_blog_feed_layout";
  DROP TYPE "public"."enum_pages_blocks_news_feed_source";
  DROP TYPE "public"."enum_pages_blocks_news_feed_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_block_source";
  DROP TYPE "public"."enum_pages_blocks_gallery_block_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_block_columns";
  DROP TYPE "public"."enum_pages_blocks_testimonials_block_layout";
  DROP TYPE "public"."enum_pages_blocks_services_carousel_items_override_icon";
  DROP TYPE "public"."enum_pages_blocks_documents_items_icon";
  DROP TYPE "public"."enum_pages_seo_robots_meta";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum_services_blocks_hero_stats_icon";
  DROP TYPE "public"."enum_services_blocks_hero_layout_style";
  DROP TYPE "public"."enum_services_blocks_hero_background_type";
  DROP TYPE "public"."enum_services_blocks_hero_background_color";
  DROP TYPE "public"."enum_services_blocks_hero_text_color_theme";
  DROP TYPE "public"."enum_services_blocks_hero_style";
  DROP TYPE "public"."enum_services_blocks_rich_content_max_width";
  DROP TYPE "public"."enum_services_blocks_faq_source";
  DROP TYPE "public"."enum_services_blocks_faq_auto_scope";
  DROP TYPE "public"."enum_services_blocks_faq_style";
  DROP TYPE "public"."enum_services_blocks_highlights_section_style";
  DROP TYPE "public"."enum_services_blocks_highlights_columns";
  DROP TYPE "public"."enum_services_blocks_why_choose_us_benefits_icon";
  DROP TYPE "public"."enum_services_blocks_registration_licenses_cards_icon";
  DROP TYPE "public"."enum_services_blocks_how_it_works_steps_icon";
  DROP TYPE "public"."enum_services_blocks_cta_style";
  DROP TYPE "public"."enum_services_blocks_blog_feed_source";
  DROP TYPE "public"."enum_services_blocks_blog_feed_layout";
  DROP TYPE "public"."enum_services_blocks_news_feed_source";
  DROP TYPE "public"."enum_services_blocks_news_feed_layout";
  DROP TYPE "public"."enum_services_blocks_gallery_block_source";
  DROP TYPE "public"."enum_services_blocks_gallery_block_layout";
  DROP TYPE "public"."enum_services_blocks_gallery_block_columns";
  DROP TYPE "public"."enum_services_blocks_testimonials_block_layout";
  DROP TYPE "public"."enum_services_blocks_services_carousel_items_override_icon";
  DROP TYPE "public"."enum_services_blocks_documents_items_icon";
  DROP TYPE "public"."enum_services_nav_dropdown";
  DROP TYPE "public"."enum_services_ui_icon";
  DROP TYPE "public"."enum_services_seo_robots_meta";
  DROP TYPE "public"."enum_locations_type";
  DROP TYPE "public"."enum_blogs_status";
  DROP TYPE "public"."enum_blogs_seo_robots_meta";
  DROP TYPE "public"."enum__blogs_v_version_status";
  DROP TYPE "public"."enum__blogs_v_version_seo_robots_meta";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum_news_seo_robots_meta";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_version_seo_robots_meta";
  DROP TYPE "public"."enum_faqs_scope";
  DROP TYPE "public"."enum_lawyers_status";`)
}
