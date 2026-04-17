-- LinguaLearn Database Setup
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Students table (extends Supabase auth.users)
CREATE TABLE students (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  class INTEGER NOT NULL CHECK (class BETWEEN 6 AND 10),
  language TEXT NOT NULL CHECK (language IN ('french','german','sanskrit','spanish','japanese','korean','mandarin','russian')),
  parent_email TEXT,
  plan TEXT NOT NULL DEFAULT 'trial' CHECK (plan IN ('trial','explorer','topper')),
  trial_ends_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  total_xp INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_login DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Sessions table (tracks study time)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_min INTEGER DEFAULT 0,
  topic TEXT,
  method TEXT,
  xp_earned INTEGER DEFAULT 0
);

-- 3. Progress table (lesson/chapter completion)
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  chapter TEXT NOT NULL,
  lesson TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, chapter, lesson)
);

-- 4. Skill map (micro-skill tracking for adaptive learning)
CREATE TABLE skill_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  category TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  correct INTEGER NOT NULL DEFAULT 0,
  accuracy DECIMAL(5,2) DEFAULT 0,
  last_tested TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, skill_name)
);

-- 5. Learning profile (which teaching method works best per skill)
CREATE TABLE learning_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  best_method TEXT NOT NULL DEFAULT 'default',
  method_scores JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, skill_name)
);

-- 6. Homework table
CREATE TABLE homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT,
  extracted_text TEXT,
  ai_feedback TEXT,
  score INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','graded','reviewed')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Homework submissions (individual answers within homework)
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  homework_id UUID NOT NULL REFERENCES homework(id) ON DELETE CASCADE,
  question TEXT,
  student_answer TEXT,
  correct_answer TEXT,
  is_correct BOOLEAN,
  feedback TEXT
);

-- 8. Exam schedule
CREATE TABLE exam_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL CHECK (exam_type IN ('ut1','ut2','half_yearly','annual')),
  exam_date DATE NOT NULL,
  syllabus JSONB DEFAULT '[]',
  revision_plan JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Mock tests
CREATE TABLE mock_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL,
  questions JSONB NOT NULL DEFAULT '[]',
  answers JSONB DEFAULT '[]',
  score INTEGER,
  total INTEGER DEFAULT 30,
  taken_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Parent reports
CREATE TABLE parent_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  total_minutes INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  skills_improved JSONB DEFAULT '[]',
  weak_areas JSONB DEFAULT '[]',
  ai_summary TEXT,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, month)
);

-- Indexes for fast queries
CREATE INDEX idx_sessions_student ON sessions(student_id, started_at DESC);
CREATE INDEX idx_skill_map_student ON skill_map(student_id);
CREATE INDEX idx_skill_map_accuracy ON skill_map(student_id, accuracy);
CREATE INDEX idx_progress_student ON progress(student_id);
CREATE INDEX idx_homework_student ON homework(student_id, submitted_at DESC);
CREATE INDEX idx_exam_schedule_student ON exam_schedule(student_id);
CREATE INDEX idx_mock_tests_student ON mock_tests(student_id);

-- Row Level Security (RLS) — students can only see their own data
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies: each student sees only their rows
CREATE POLICY "Students see own data" ON students FOR ALL USING (auth.uid() = id);
CREATE POLICY "Students see own sessions" ON sessions FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Students see own progress" ON progress FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Students see own skills" ON skill_map FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Students see own profile" ON learning_profile FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Students see own homework" ON homework FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Students see own submissions" ON submissions FOR ALL USING (
  homework_id IN (SELECT id FROM homework WHERE student_id = auth.uid())
);
CREATE POLICY "Students see own exams" ON exam_schedule FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Students see own mock tests" ON mock_tests FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Students see own reports" ON parent_reports FOR ALL USING (auth.uid() = student_id);

-- Service role bypass (for our backend API)
CREATE POLICY "Service full access students" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access sessions" ON sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access progress" ON progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access skill_map" ON skill_map FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access learning_profile" ON learning_profile FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access homework" ON homework FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access submissions" ON submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access exam_schedule" ON exam_schedule FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access mock_tests" ON mock_tests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full access parent_reports" ON parent_reports FOR ALL USING (true) WITH CHECK (true);
