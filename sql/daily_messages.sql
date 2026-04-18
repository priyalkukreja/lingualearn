-- Daily message tracking for usage limits
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS daily_messages (
  id BIGSERIAL PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups by student + date
CREATE INDEX idx_daily_messages_student_date ON daily_messages(student_id, date);

-- Auto-cleanup: delete records older than 7 days (saves storage)
-- Run this as a Supabase cron job or manually weekly
-- DELETE FROM daily_messages WHERE date < CURRENT_DATE - INTERVAL '7 days';
