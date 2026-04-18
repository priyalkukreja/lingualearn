-- LinguaLearn Database Setup
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- Copy-paste this ENTIRE file and click "Run"

-- 1. Students table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  class INTEGER NOT NULL CHECK (class BETWEEN 6 AND 10),
  board TEXT NOT NULL DEFAULT 'CBSE',
  language TEXT NOT NULL CHECK (language IN ('french','german','sanskrit','spanish','japanese','korean','mandarin','russian')),
  parent_email TEXT,
  plan TEXT NOT NULL DEFAULT 'explorer_trial' CHECK (plan IN ('explorer_trial','explorer','topper')),
  trial_ends_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  total_xp INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  last_active_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Sessions table (tracks study time)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  topics_covered JSONB DEFAULT '[]',
  xp_earned INTEGER DEFAULT 0,
  last_chapter TEXT,
  last_position JSONB
);

-- 3. Skill map (micro-skill tracking for adaptive learning)
CREATE TABLE IF NOT EXISTS skill_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  language TEXT NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  accuracy DECIMAL(5,2) DEFAULT 0,
  mastery_level TEXT DEFAULT 'weak' CHECK (mastery_level IN ('weak','developing','proficient','mastered')),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, skill_name, language)
);

-- 4. Progress table (lesson/chapter completion)
CREATE TABLE IF NOT EXISTS progress (
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

-- 5. Learning profile (which teaching method works best per skill)
CREATE TABLE IF NOT EXISTS learning_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  best_method TEXT NOT NULL DEFAULT 'default',
  method_scores JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, skill_name)
);

-- 6. Homework table
CREATE TABLE IF NOT EXISTS homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT,
  extracted_text TEXT,
  ai_feedback TEXT,
  score INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','graded','reviewed')),
  assigned_date DATE DEFAULT CURRENT_DATE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Exam schedule
CREATE TABLE IF NOT EXISTS exam_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL CHECK (exam_type IN ('ut1','ut2','half_yearly','annual')),
  exam_date DATE NOT NULL,
  syllabus JSONB DEFAULT '[]',
  revision_plan JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Mock tests
CREATE TABLE IF NOT EXISTS mock_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  exam_type TEXT NOT NULL,
  questions JSONB NOT NULL DEFAULT '[]',
  answers JSONB DEFAULT '[]',
  score INTEGER,
  total INTEGER DEFAULT 30,
  taken_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Parent reports
CREATE TABLE IF NOT EXISTS parent_reports (
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
CREATE INDEX IF NOT EXISTS idx_sessions_student ON sessions(student_id, start_time DESC);
CREATE INDEX IF NOT EXISTS idx_skill_map_student ON skill_map(student_id);
CREATE INDEX IF NOT EXISTS idx_skill_map_accuracy ON skill_map(student_id, accuracy);
CREATE INDEX IF NOT EXISTS idx_progress_student ON progress(student_id);
CREATE INDEX IF NOT EXISTS idx_homework_student ON homework(student_id, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_exam_schedule_student ON exam_schedule(student_id);
CREATE INDEX IF NOT EXISTS idx_mock_tests_student ON mock_tests(student_id);

-- Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies: students see only their own data
-- Using DO block to avoid errors if policies already exist
DO $$
BEGIN
  -- Students
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'students_own_data' AND tablename = 'students') THEN
    CREATE POLICY students_own_data ON students FOR ALL USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'students_service' AND tablename = 'students') THEN
    CREATE POLICY students_service ON students FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;

  -- Sessions
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'sessions_own_data' AND tablename = 'sessions') THEN
    CREATE POLICY sessions_own_data ON sessions FOR ALL USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'sessions_service' AND tablename = 'sessions') THEN
    CREATE POLICY sessions_service ON sessions FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;

  -- Progress
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'progress_own_data' AND tablename = 'progress') THEN
    CREATE POLICY progress_own_data ON progress FOR ALL USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'progress_service' AND tablename = 'progress') THEN
    CREATE POLICY progress_service ON progress FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;

  -- Skill map
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'skill_map_own_data' AND tablename = 'skill_map') THEN
    CREATE POLICY skill_map_own_data ON skill_map FOR ALL USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'skill_map_service' AND tablename = 'skill_map') THEN
    CREATE POLICY skill_map_service ON skill_map FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;

  -- Learning profile
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'learning_profile_own_data' AND tablename = 'learning_profile') THEN
    CREATE POLICY learning_profile_own_data ON learning_profile FOR ALL USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'learning_profile_service' AND tablename = 'learning_profile') THEN
    CREATE POLICY learning_profile_service ON learning_profile FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;

  -- Homework
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'homework_own_data' AND tablename = 'homework') THEN
    CREATE POLICY homework_own_data ON homework FOR ALL USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'homework_service' AND tablename = 'homework') THEN
    CREATE POLICY homework_service ON homework FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;

  -- Exam schedule
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'exam_schedule_own_data' AND tablename = 'exam_schedule') THEN
    CREATE POLICY exam_schedule_own_data ON exam_schedule FOR ALL USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'exam_schedule_service' AND tablename = 'exam_schedule') THEN
    CREATE POLICY exam_schedule_service ON exam_schedule FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;

  -- Mock tests
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'mock_tests_own_data' AND tablename = 'mock_tests') THEN
    CREATE POLICY mock_tests_own_data ON mock_tests FOR ALL USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'mock_tests_service' AND tablename = 'mock_tests') THEN
    CREATE POLICY mock_tests_service ON mock_tests FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;

  -- Parent reports
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'parent_reports_own_data' AND tablename = 'parent_reports') THEN
    CREATE POLICY parent_reports_own_data ON parent_reports FOR ALL USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'parent_reports_service' AND tablename = 'parent_reports') THEN
    CREATE POLICY parent_reports_service ON parent_reports FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;
