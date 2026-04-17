const router = require('express').Router();
const supabase = require('../services/supabase');
const { askGroq } = require('../services/groq');
const authMiddleware = require('../middleware/auth');

router.get('/monthly', authMiddleware, async (req, res) => {
  try {
    const student = req.student;
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const { data: sessions } = await supabase
      .from('sessions')
      .select('*')
      .eq('student_id', student.id)
      .gte('start_time', monthStart);

    let totalMinutes = 0;
    (sessions || []).forEach(s => {
      if (s.end_time) {
        totalMinutes += (new Date(s.end_time) - new Date(s.start_time)) / 60000;
      }
    });

    const { data: skills } = await supabase
      .from('skill_map')
      .select('*')
      .eq('student_id', student.id);

    const strong = (skills || []).filter(s => s.accuracy >= 70);
    const weak = (skills || []).filter(s => s.accuracy < 60);

    const { data: homeworks } = await supabase
      .from('homework')
      .select('status')
      .eq('student_id', student.id)
      .gte('assigned_date', monthStart);

    const hwCompleted = (homeworks || []).filter(h => h.status === 'graded').length;
    const hwTotal = (homeworks || []).length;

    const aiSummary = await askGroq([
      { role: 'system', content: 'You are a friendly school counselor writing a monthly progress report for parents. Be encouraging but honest.' },
      { role: 'user', content: `Write a brief parent-friendly report for:
Student: ${student.name}, Class ${student.class}, ${student.language}
Sessions this month: ${(sessions || []).length} (${Math.round(totalMinutes)} minutes)
XP earned: ${student.total_xp}
Current streak: ${student.current_streak} days
Strong areas: ${strong.map(s => s.skill_name).join(', ') || 'Still building data'}
Weak areas: ${weak.map(s => s.skill_name + ' (' + Math.round(s.accuracy) + '%)').join(', ') || 'None'}
Homework: ${hwCompleted}/${hwTotal} completed

Write 3-4 sentences summary, then 2 specific recommendations. Keep it warm and positive.` }
    ]);

    const report = {
      studentName: student.name,
      class: student.class,
      language: student.language,
      month: now.toLocaleString('en-IN', { month: 'long', year: 'numeric' }),
      totalSessions: (sessions || []).length,
      totalMinutes: Math.round(totalMinutes),
      totalXP: student.total_xp,
      streak: student.current_streak,
      strongAreas: strong.map(s => ({ name: s.skill_name, accuracy: Math.round(s.accuracy) })),
      weakAreas: weak.map(s => ({ name: s.skill_name, accuracy: Math.round(s.accuracy) })),
      homeworkCompleted: hwCompleted,
      homeworkTotal: hwTotal,
      aiSummary
    };

    res.json({ report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
