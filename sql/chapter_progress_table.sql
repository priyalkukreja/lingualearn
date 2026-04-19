-- Chapter progress tracking table
CREATE TABLE IF NOT EXISTS chapter_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  class INTEGER NOT NULL,
  section_name TEXT NOT NULL,
  chapter_name TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, language, class, chapter_name)
);

CREATE INDEX IF NOT EXISTS idx_chapter_progress_student ON chapter_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_chapter_progress_completed ON chapter_progress(completed_at);
