const router = require('express').Router();
const supabase = require('../services/supabase');
const { askGroq } = require('../services/groq');
const authMiddleware = require('../middleware/auth');

const EXAM_Q_DEFAULTS = {
  weekly: { totalMarks: 15, timeMin: 20 },
  monthly: { totalMarks: 30, timeMin: 40 },
  half_yearly: { totalMarks: 40, timeMin: 90 },
  annual: { totalMarks: 50, timeMin: 120 },
};

function getExamConfig(testType, customSettings) {
  const defaults = EXAM_Q_DEFAULTS[testType] || EXAM_Q_DEFAULTS.weekly;
  const totalMarks = customSettings?.totalMarks || defaults.totalMarks;
  const timeMin = customSettings?.timeMin || defaults.timeMin;

  const mcqs = Math.max(3, Math.round(totalMarks * 0.25));
  const shortCount = Math.max(1, Math.round(totalMarks * 0.30 / 2));
  const longCount = Math.max(0, Math.round(totalMarks * 0.20 / 3));
  const writingCount = Math.max(1, Math.round(totalMarks * 0.25 / 5));

  const sections = [
    { name: 'Section A — MCQs', type: 'mcq', count: mcqs, marksEach: 1, totalMarks: mcqs, timePct: 0.20 },
    { name: 'Section B — Short Answers', type: 'short', count: shortCount, marksEach: 2, totalMarks: shortCount * 2, timePct: 0.30 },
    { name: 'Section C — Long Answers', type: 'long', count: longCount, marksEach: 3, totalMarks: longCount * 3, timePct: 0.25 },
    { name: 'Section D — Writing', type: 'writing', count: writingCount, marksEach: 5, totalMarks: writingCount * 5, timePct: 0.25 },
  ];

  const sectionTimeMin = sections.map(s => Math.round(timeMin * s.timePct));

  return { totalMarks, timeMin, mcqs, short: shortCount, long: longCount, writing: writingCount, sections, sectionTimeMin };
}

// Get pending/upcoming scheduled tests for current student
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    const student = req.student;
    const today = new Date().toISOString().slice(0, 10);
    const dayOfWeek = new Date().getDay();

    const tests = [];
    const customSettings = req.query.customMarks ? JSON.parse(req.query.customMarks) : null;

    // Check if weekly test is due (every Saturday)
    const weeklyDone = await isTestDoneThisWeek(student.id, 'weekly');
    const weeklyConfig = getExamConfig('weekly', customSettings?.weekly);
    if (dayOfWeek >= 6 && !weeklyDone) {
      tests.push({ type: 'weekly', label: 'Weekly Mini Test', dueDate: today, totalMarks: weeklyConfig.totalMarks, timeMin: weeklyConfig.timeMin });
    } else if (!weeklyDone) {
      const satDate = new Date();
      satDate.setDate(satDate.getDate() + (6 - dayOfWeek));
      tests.push({ type: 'weekly', label: 'Weekly Mini Test', dueDate: satDate.toISOString().slice(0, 10), totalMarks: weeklyConfig.totalMarks, timeMin: weeklyConfig.timeMin });
    }

    // Check monthly test (last 3 days of month)
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const dayOfMonth = new Date().getDate();
    const monthlyDone = await isTestDoneThisMonth(student.id, 'monthly');
    const monthlyConfig = getExamConfig('monthly', customSettings?.monthly);
    if (dayOfMonth >= daysInMonth - 2 && !monthlyDone) {
      tests.push({ type: 'monthly', label: 'Monthly Assessment', dueDate: today, totalMarks: monthlyConfig.totalMarks, timeMin: monthlyConfig.timeMin });
    }

    // Get past test results for report card
    const { data: pastResults } = await supabase
      .from('test_results')
      .select('*')
      .eq('student_id', student.id)
      .order('taken_at', { ascending: false })
      .limit(10);

    res.json({ tests, pastResults: pastResults || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate a scheduled test
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { testType, customMarks, sectionWise } = req.body;
    const config = getExamConfig(testType, customMarks);
    if (!config) return res.status(400).json({ error: 'Invalid test type' });

    const student = req.student;
    const langName = student.language.charAt(0).toUpperCase() + student.language.slice(1);

    const { data: weaknesses } = await supabase
      .from('skill_map')
      .select('skill_name, accuracy')
      .eq('student_id', student.id)
      .lt('accuracy', 70);

    const weakContext = weaknesses?.length
      ? `Weak areas (ask more questions on these): ${weaknesses.map(w => w.skill_name.replace(/_/g, ' ') + ' (' + Math.round(w.accuracy) + '%)'). join(', ')}`
      : '';

    const chaptersContext = testType === 'weekly' ? 'chapters covered this week' : 'all chapters covered so far';

    const longLine = config.long > 0 ? `\n- ${config.long} long answer questions (3 marks each)` : '';

    const response = await askGroq([
      { role: 'system', content: `You are a CBSE ${langName} exam paper setter for Class ${student.class}. Generate balanced test papers.` },
      { role: 'user', content: `Generate a ${testType.replace('_', ' ')} test paper for ${langName} Class ${student.class}.

Requirements:
- ${config.mcqs} MCQs (1 mark each)
- ${config.short} short answer questions (2 marks each)${longLine}
- ${config.writing} writing tasks (5 marks each)
- Total: ${config.totalMarks} marks, Time: ${config.timeMin} minutes
- Cover ${chaptersContext}
${weakContext}

Return JSON only:
{
  "title": "...",
  "mcqs": [{"q":"...", "options":["A","B","C","D"], "correct":0, "skill":"...", "marks":1}],
  "shortAnswers": [{"q":"...", "expectedAnswer":"...", "marks":2, "skill":"..."}],
  ${config.long > 0 ? '"longAnswers": [{"q":"...", "expectedAnswer":"...", "marks":3, "skill":"..."}],' : ''}
  "writingTasks": [{"q":"...", "type":"essay|letter|paragraph|dialogue", "marks":5, "rubric":"..."}],
  "totalMarks": ${config.totalMarks},
  "timeMinutes": ${config.timeMin}
}` }
    ], { max_tokens: 4000 });

    let test;
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      test = JSON.parse(jsonMatch[0]);
    } catch {
      test = { raw: response };
    }

    test.testType = testType;
    test.generatedAt = new Date().toISOString();

    if (sectionWise) {
      test.sectionWise = true;
      test.sections = config.sections.map((s, i) => ({
        ...s,
        timeMin: config.sectionTimeMin[i],
        questions: s.type === 'mcq' ? (test.mcqs || []) :
                   s.type === 'short' ? (test.shortAnswers || []) :
                   s.type === 'long' ? (test.longAnswers || []) :
                   (test.writingTasks || []),
        completed: false,
      }));
      test.deadline = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    }

    res.json({ test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a single section (section-wise mode)
router.post('/submit-section', authMiddleware, async (req, res) => {
  try {
    const { testId, sectionIndex, sectionScore, sectionTotal, timeTaken, answers } = req.body;
    const student = req.student;

    const progressKey = `section_progress_${testId}`;
    const { data: existing } = await supabase
      .from('test_results')
      .select('*')
      .eq('student_id', student.id)
      .eq('test_type', progressKey)
      .single();

    const progress = existing?.breakdown || { sections: [], totalScore: 0, totalMarks: 0, totalTime: 0 };
    progress.sections[sectionIndex] = { score: sectionScore, total: sectionTotal, timeTaken, answers, completedAt: new Date().toISOString() };
    progress.totalScore = progress.sections.reduce((s, sec) => s + (sec?.score || 0), 0);
    progress.totalMarks = progress.sections.reduce((s, sec) => s + (sec?.total || 0), 0);
    progress.totalTime += timeTaken;

    if (existing) {
      await supabase.from('test_results').update({ breakdown: progress }).eq('id', existing.id);
    } else {
      await supabase.from('test_results').insert({
        student_id: student.id, test_type: progressKey,
        score: progress.totalScore, total_marks: progress.totalMarks,
        percentage: 0, grade: 'IP', time_taken_sec: progress.totalTime,
        breakdown: progress, taken_at: new Date().toISOString(),
      });
    }

    const completedCount = progress.sections.filter(s => s).length;
    res.json({ progress, completedCount, sectionIndex });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Finalize section-wise test (all sections done)
router.post('/finalize-sections', authMiddleware, async (req, res) => {
  try {
    const { testId, testType } = req.body;
    const student = req.student;

    const progressKey = `section_progress_${testId}`;
    const { data: progress } = await supabase
      .from('test_results')
      .select('*')
      .eq('student_id', student.id)
      .eq('test_type', progressKey)
      .single();

    if (!progress) return res.status(404).json({ error: 'No section progress found' });

    const totalScore = progress.breakdown.totalScore;
    const totalMarks = progress.breakdown.totalMarks;
    const percentage = Math.round((totalScore / totalMarks) * 100);
    const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' :
                  percentage >= 60 ? 'B' : percentage >= 50 ? 'C' : percentage >= 40 ? 'D' : 'E';

    await supabase.from('test_results').update({
      test_type: testType, score: totalScore, total_marks: totalMarks,
      percentage, grade, time_taken_sec: progress.breakdown.totalTime,
    }).eq('id', progress.id);

    req.body = { testType, scores: totalScore, totalMarks, timeTaken: progress.breakdown.totalTime, breakdown: progress.breakdown };
    return submitTestResult(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit test results and generate report card
router.post('/submit', authMiddleware, async (req, res) => {
  return submitTestResult(req, res);
});

async function submitTestResult(req, res) {
  try {
    const { testType, scores, totalMarks, timeTaken, breakdown } = req.body;
    const student = req.student;

    const percentage = Math.round((scores / totalMarks) * 100);
    const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' :
                  percentage >= 60 ? 'B' : percentage >= 50 ? 'C' : percentage >= 40 ? 'D' : 'E';

    // Save result
    const { data: result, error } = await supabase.from('test_results').insert({
      student_id: student.id,
      test_type: testType,
      score: scores,
      total_marks: totalMarks,
      percentage,
      grade,
      time_taken_sec: timeTaken,
      breakdown: breakdown || {},
      taken_at: new Date().toISOString(),
    }).select().single();

    if (error) throw error;

    // Award XP based on performance
    let xpEarned = 10;
    if (percentage >= 90) xpEarned = 30;
    else if (percentage >= 80) xpEarned = 25;
    else if (percentage >= 70) xpEarned = 20;
    else if (percentage >= 60) xpEarned = 15;

    await supabase.from('students').update({
      total_xp: (student.total_xp || 0) + xpEarned,
    }).eq('id', student.id);

    // Generate report card data
    const { data: allResults } = await supabase
      .from('test_results')
      .select('*')
      .eq('student_id', student.id)
      .order('taken_at', { ascending: false })
      .limit(20);

    const { data: skills } = await supabase
      .from('skill_map')
      .select('*')
      .eq('student_id', student.id)
      .order('accuracy', { ascending: true });

    const reportCard = buildReportCard(student, allResults || [], skills || [], result);

    // Send report card email to parent
    if (student.parent_email) {
      const { sendEmail } = require('../services/emailReports');
      const studentName = student.name.split(' ')[0];
      const langName = student.language.charAt(0).toUpperCase() + student.language.slice(1);
      const html = buildReportCardEmail(studentName, langName, student.class, reportCard, result);
      sendEmail(
        student.parent_email,
        `${studentName}'s ${testType.replace('_', ' ')} Report Card — ${percentage}% (${grade})`,
        html
      ).catch(err => console.error('[Report Card Email] Failed:', err));
    }

    res.json({ result, reportCard, xpEarned });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get full report card
router.get('/report-card', authMiddleware, async (req, res) => {
  try {
    const student = req.student;

    const { data: results } = await supabase
      .from('test_results')
      .select('*')
      .eq('student_id', student.id)
      .order('taken_at', { ascending: false })
      .limit(30);

    const { data: skills } = await supabase
      .from('skill_map')
      .select('*')
      .eq('student_id', student.id)
      .order('accuracy', { ascending: true });

    const { data: sessions } = await supabase
      .from('sessions')
      .select('started_at, duration_min')
      .eq('student_id', student.id)
      .order('started_at', { ascending: false })
      .limit(90);

    const reportCard = buildReportCard(student, results || [], skills || []);
    reportCard.attendance = calculateAttendance(sessions || []);

    res.json({ reportCard });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function buildReportCard(student, results, skills, latestResult) {
  const testsByType = {};
  for (const r of results) {
    if (!testsByType[r.test_type]) testsByType[r.test_type] = [];
    testsByType[r.test_type].push(r);
  }

  // Trend: last 5 tests
  const last5 = results.slice(0, 5);
  const trend = last5.map(r => ({ date: r.taken_at?.slice(0, 10), pct: r.percentage, type: r.test_type }));
  const avgPct = last5.length ? Math.round(last5.reduce((s, r) => s + r.percentage, 0) / last5.length) : 0;

  // Improvement
  let improvement = null;
  if (last5.length >= 2) {
    improvement = last5[0].percentage - last5[last5.length - 1].percentage;
  }

  // Skills breakdown
  const weakSkills = skills.filter(s => s.accuracy < 50).map(s => ({
    name: s.skill_name.replace(/_/g, ' '), accuracy: Math.round(s.accuracy), attempts: s.total_questions || 0,
  }));
  const strongSkills = skills.filter(s => s.accuracy >= 80).map(s => ({
    name: s.skill_name.replace(/_/g, ' '), accuracy: Math.round(s.accuracy),
  }));

  // Section-wise (grammar, vocabulary, writing, comprehension)
  const sections = {
    grammar: calcSectionAvg(skills, 'grammar'),
    vocabulary: calcSectionAvg(skills, 'vocabulary'),
    writing: calcSectionAvg(skills, 'writing'),
    comprehension: calcSectionAvg(skills, 'comprehension'),
  };

  // Overall grade
  const overallGrade = avgPct >= 90 ? 'A+' : avgPct >= 80 ? 'A' : avgPct >= 70 ? 'B+' :
                       avgPct >= 60 ? 'B' : avgPct >= 50 ? 'C' : avgPct >= 40 ? 'D' : 'E';

  return {
    studentName: student.name,
    className: student.class,
    language: student.language,
    totalTests: results.length,
    avgPercentage: avgPct,
    overallGrade,
    trend,
    improvement,
    weakSkills,
    strongSkills,
    sections,
    latestTest: latestResult || results[0] || null,
    streak: student.current_streak || student.streak_days || 0,
    xp: student.total_xp || 0,
    plan: student.plan,
  };
}

function calcSectionAvg(skills, sectionKeyword) {
  const matched = skills.filter(s => s.skill_name.toLowerCase().includes(sectionKeyword));
  if (!matched.length) return null;
  return Math.round(matched.reduce((s, sk) => s + sk.accuracy, 0) / matched.length);
}

function calculateAttendance(sessions) {
  const last30 = new Set();
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (sessions.some(s => s.started_at?.startsWith(key))) {
      last30.add(key);
    }
  }
  return { daysActive: last30.size, totalDays: 30, percentage: Math.round((last30.size / 30) * 100) };
}

async function isTestDoneThisWeek(studentId, testType) {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (now.getDay() || 7) + 1);
  const weekStart = monday.toISOString().slice(0, 10);

  const { count } = await supabase
    .from('test_results')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', studentId)
    .eq('test_type', testType)
    .gte('taken_at', weekStart + 'T00:00:00');

  return (count || 0) > 0;
}

async function isTestDoneThisMonth(studentId, testType) {
  const now = new Date();
  const monthStart = now.toISOString().slice(0, 7) + '-01';

  const { count } = await supabase
    .from('test_results')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', studentId)
    .eq('test_type', testType)
    .gte('taken_at', monthStart + 'T00:00:00');

  return (count || 0) > 0;
}

function buildReportCardEmail(studentName, langName, cls, report, latestTest) {
  const pct = latestTest?.percentage || 0;
  const grade = latestTest?.grade || '—';
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '👍' : '📌';
  const testLabel = (latestTest?.test_type || 'test').replace('_', ' ');
  const testDate = latestTest?.taken_at ? new Date(latestTest.taken_at).toLocaleDateString('en-IN') : 'Today';

  const sectionBars = Object.entries(report.sections || {}).filter(([,v]) => v !== null).map(([name, val]) => {
    const color = val >= 80 ? '#059669' : val >= 60 ? '#f59e0b' : '#ef4444';
    return `
      <div style="margin-bottom:0.5rem">
        <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;color:#334155;margin-bottom:3px">
          <span>${name.charAt(0).toUpperCase() + name.slice(1)}</span>
          <span style="color:${color}">${val}%</span>
        </div>
        <div style="height:8px;background:#eeeeff;border-radius:50px;overflow:hidden">
          <div style="height:100%;width:${val}%;background:${color};border-radius:50px"></div>
        </div>
      </div>`;
  }).join('');

  const trendArrow = report.improvement > 0 ? '📈' : report.improvement < 0 ? '📉' : '➡️';
  const trendText = report.improvement > 0
    ? `Improved by ${report.improvement}% from previous tests!`
    : report.improvement < 0
    ? `Dropped by ${Math.abs(report.improvement)}% — needs more practice.`
    : 'Consistent performance.';

  const weakList = (report.weakSkills || []).slice(0, 4).map(w =>
    `<div style="font-size:0.82rem;color:#991b1b;font-weight:700;padding:0.2rem 0">• ${w.name} — ${w.accuracy}%</div>`
  ).join('');

  const strongList = (report.strongSkills || []).slice(0, 4).map(s =>
    `<div style="font-size:0.82rem;color:#065f46;font-weight:700;padding:0.2rem 0">• ${s.name} — ${s.accuracy}%</div>`
  ).join('');

  return `
  <div style="font-family:'Nunito',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fafbff;border-radius:20px;overflow:hidden;border:2px solid #eeeeff">
    <div style="background:linear-gradient(135deg,#5b5ef4,#7209b7);padding:1.5rem 2rem;color:white;text-align:center">
      <h1 style="margin:0;font-size:1.4rem">📋 Report Card</h1>
      <p style="margin:0.3rem 0 0;opacity:0.85;font-size:0.88rem">${studentName} · ${langName} · Class ${cls}</p>
      <p style="margin:0.2rem 0 0;opacity:0.7;font-size:0.78rem">${testLabel.charAt(0).toUpperCase() + testLabel.slice(1)} — ${testDate}</p>
    </div>

    <div style="padding:1.5rem 2rem">
      <!-- Score Banner -->
      <div style="background:white;border-radius:18px;padding:1.25rem;text-align:center;border:2px solid #eeeeff;margin-bottom:1.25rem">
        <div style="font-size:2.5rem">${emoji}</div>
        <div style="font-size:2.2rem;font-weight:900;color:#5b5ef4">${pct}%</div>
        <div style="font-size:1.1rem;font-weight:900;color:#334155">Grade: ${grade}</div>
        <div style="font-size:0.82rem;color:#64748b;margin-top:0.3rem">${latestTest?.score || 0} / ${latestTest?.total_marks || 0} marks</div>
      </div>

      <!-- Trend -->
      <div style="background:white;border-radius:14px;padding:1rem;border:2px solid #eeeeff;margin-bottom:1rem;text-align:center">
        <div style="font-size:1.2rem">${trendArrow}</div>
        <div style="font-size:0.85rem;font-weight:800;color:#334155">${trendText}</div>
        <div style="font-size:0.72rem;color:#94a3b8;margin-top:0.2rem">Average across ${report.totalTests} tests: ${report.avgPercentage}%</div>
      </div>

      <!-- Section-wise Performance -->
      <div style="background:white;border-radius:14px;padding:1rem;border:2px solid #eeeeff;margin-bottom:1rem">
        <div style="font-size:0.75rem;font-weight:900;text-transform:uppercase;letter-spacing:1px;color:#5b5ef4;margin-bottom:0.6rem">Section-wise Performance</div>
        ${sectionBars || '<div style="font-size:0.82rem;color:#94a3b8">Take more tests to see section breakdown</div>'}
      </div>

      <!-- Strengths & Weaknesses -->
      <div style="display:flex;gap:0.75rem;margin-bottom:1rem;flex-wrap:wrap">
        <div style="flex:1;min-width:140px;background:white;border-radius:14px;padding:1rem;border:2px solid #eeeeff">
          <div style="font-size:0.72rem;font-weight:900;color:#059669;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.4rem">✅ Strong Areas</div>
          ${strongList || '<div style="font-size:0.82rem;color:#94a3b8">Keep practicing!</div>'}
        </div>
        <div style="flex:1;min-width:140px;background:white;border-radius:14px;padding:1rem;border:2px solid #eeeeff">
          <div style="font-size:0.72rem;font-weight:900;color:#dc2626;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.4rem">⚠️ Needs Work</div>
          ${weakList || '<div style="font-size:0.82rem;color:#94a3b8">No weak areas!</div>'}
        </div>
      </div>

      <!-- Activity Stats -->
      <div style="background:#f5f6ff;border-radius:14px;padding:1rem;text-align:center">
        <span style="font-size:0.82rem;font-weight:700;color:#64748b">🔥 Streak: <strong style="color:#f97316">${report.streak} days</strong></span>
        <span style="margin:0 0.5rem;color:#e2e8f0">|</span>
        <span style="font-size:0.82rem;font-weight:700;color:#64748b">⭐ XP: <strong style="color:#5b5ef4">${report.xp}</strong></span>
        <span style="margin:0 0.5rem;color:#e2e8f0">|</span>
        <span style="font-size:0.82rem;font-weight:700;color:#64748b">📊 Tests: <strong style="color:#7c3aed">${report.totalTests}</strong></span>
      </div>

      ${report.plan === 'explorer_trial' || report.plan === 'free' ? `
      <div style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border:2px solid #fde68a;border-radius:14px;padding:1rem;margin-top:1rem;text-align:center">
        <div style="font-size:0.88rem;font-weight:800;color:#92400e">
          🎓 Upgrade to Pro Student for full mock tests, all chapters, and personalized revision plans!
        </div>
        <div style="font-size:0.78rem;color:#b45309;margin-top:0.3rem">Just ₹350/month — cheaper than tuition classes</div>
      </div>` : ''}
    </div>

    <div style="background:#f0f2ff;padding:1rem 2rem;text-align:center;font-size:0.75rem;color:#94a3b8">
      Sent by LinguaLearn — AI Language Tutor for CBSE Students
    </div>
  </div>`;
}

module.exports = router;
