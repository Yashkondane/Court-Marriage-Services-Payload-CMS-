-- Migration: Add 'courts' column to 'lawyers' table to fix build error
-- Run this in your Supabase SQL Editor

ALTER TABLE "lawyers" ADD COLUMN IF NOT EXISTS "courts" text;
