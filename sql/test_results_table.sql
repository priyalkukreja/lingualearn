-- Test Results table for scheduled tests & report cards
CREATE TABLE IF NOT EXISTS test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL, -- weekly, monthly, half_yearly, annual
  score INTEGER NOT NULL,
  total_marks INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  grade TEXT NOT NULL, -- A+, A, B+, B, C, D, E
  time_taken_sec INTEGER,
  breakdown JSONB DEFAULT '{}',
  taken_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_test_results_student ON test_results(student_id);
CREATE INDEX IF NOT EXISTS idx_test_results_type ON test_results(student_id, test_type);
CREATE INDEX IF NOT EXISTS idx_test_results_date ON test_results(student_id, taken_at DESC);

-- Enable RLS
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can read own results"
  ON test_results FOR SELECT
  USING (auth.uid()::text = student_id::text);

CREATE POLICY "Students can insert own results"
  ON test_results FOR INSERT
  WITH CHECK (auth.uid()::text = student_id::text);
