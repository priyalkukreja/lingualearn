-- Add streak & level columns to students table
-- Run this in Supabase SQL Editor

ALTER TABLE students ADD COLUMN IF NOT EXISTS streak_freezes INTEGER DEFAULT 0;
ALTER TABLE students ADD COLUMN IF NOT EXISTS last_daily_claim DATE;
ALTER TABLE students ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0;
