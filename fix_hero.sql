-- Add new columns to the Hero block tables
ALTER TABLE "pages_blocks_hero" ADD COLUMN "background_type" text DEFAULT 'image';
ALTER TABLE "pages_blocks_hero" ADD COLUMN "background_color" text DEFAULT 'white';
ALTER TABLE "pages_blocks_hero" ADD COLUMN "text_color_theme" text DEFAULT 'auto';

-- Add new columns to the Hero block drafts tables
ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "background_type" text DEFAULT 'image';
ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "background_color" text DEFAULT 'white';
ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "text_color_theme" text DEFAULT 'auto';
