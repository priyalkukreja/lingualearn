const router = require('express').Router();
const supabase = require('../services/supabase');
const { askGroq } = require('../services/groq');
const authMiddleware = require('../middleware/auth');
const planGuard = require('../middleware/planGuard');

router.post('/schedule', authMiddleware, async (req, res) => {
  try {
    const { examType, examDate, chaptersIncluded } = req.body;

    const { data, error } = await supabase.from('exam_schedule').insert({
      student_id: req.user.id,
      exam_type: examType,
      exam_date: examDate,
      syllabus: chaptersIncluded || []
    }).select().single();

    if (error) throw error;

    const daysLeft = Math.max(1, Math.ceil((new Date(examDate) - new Date()) / 86400000));

    const { data: weaknesses } = await supabase
      .from('skill_map')
      .select('skill_name, accuracy')
      .eq('student_id', req.user.id)
      .lt('accuracy', 60);

    const langName = req.student.language.charAt(0).toUpperCase() + req.student.language.slice(1);
    const syllabusStr = (chaptersIncluded || []).join(', ');

    const plan = await askGroq([
      { role: 'system', content: `You are a CBSE exam preparation expert for ${langName} Class ${req.student.class}. Create practical, day-by-day revision plans.` },
      { role: 'user', content: `Create a ${Math.min(daysLeft, 14)}-day revision plan for ${examType.replace('_', ' ')} exam.

Language: ${langName}, Class: ${req.student.class}
Syllabus: ${syllabusStr || 'Full syllabus for this exam type'}
Weak areas: ${(weaknesses || []).map(w => w.skill_name.replace(/_/g, ' ') + ' (' + Math.round(w.accuracy) + '%)').join(', ') || 'None detected yet'}

Return JSON only: {"days": [{"title": "...", "description": "...", "tag": "Reading|Grammar|Vocabulary|Practice|Writing|Revision|Mock Test|Analysis|Quick Rev|Rest Day"}], "motivation": "one encouraging line"}` }
    ], { max_tokens: 2000 });

    let parsedPlan;
    try {
      const jsonMatch = plan.match(/\{[\s\S]*\}/);
      parsedPlan = JSON.parse(jsonMatch[0]);
    } catch {
      parsedPlan = null;
    }

    res.json({ exam: data, plan: parsedPlan, daysLeft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/revision-plan', authMiddleware, planGuard, async (req, res) => {
  try {
    const { data: exams } = await supabase
      .from('exam_schedule')
      .select('*')
      .eq('student_id', req.user.id)
      .gte('exam_date', new Date().toISOString().slice(0, 10))
      .order('exam_date', { ascending: true })
      .limit(1);

    if (!exams?.length) return res.json({ plan: null, message: 'No upcoming exams scheduled' });

    const exam = exams[0];
    const daysLeft = Math.ceil((new Date(exam.exam_date) - new Date()) / 86400000);

    const { data: weaknesses } = await supabase
      .from('skill_map')
      .select('skill_name, accuracy')
      .eq('student_id', req.user.id)
      .lt('accuracy', 60);

    const langName = req.student.language.charAt(0).toUpperCase() + req.student.language.slice(1);

    const plan = await askGroq([
      { role: 'system', content: `You are a CBSE exam preparation expert for ${langName} Class ${req.student.class}.` },
      { role: 'user', content: `Create a ${Math.min(daysLeft, 14)}-day revision plan for ${exam.exam_type.replace('_', ' ')} exam.

Syllabus: ${(exam.syllabus || []).join(', ') || 'Full syllabus'}
Weak areas: ${(weaknesses || []).map(w => w.skill_name.replace(/_/g, ' ') + ' (' + Math.round(w.accuracy) + '%)').join(', ') || 'None detected yet'}

Return JSON only: {"days": [{"title": "...", "description": "...", "tag": "..."}], "motivation": "..."}` }
    ], { max_tokens: 2000 });

    let parsedPlan;
    try {
      const jsonMatch = plan.match(/\{[\s\S]*\}/);
      parsedPlan = JSON.parse(jsonMatch[0]);
    } catch {
      parsedPlan = { raw: plan };
    }

    res.json({ plan: parsedPlan, exam, daysLeft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/mock-test', authMiddleware, planGuard, async (req, res) => {
  try {
    const langName = req.student.language.charAt(0).toUpperCase() + req.student.language.slice(1);

    const { data: weaknesses } = await supabase
      .from('skill_map')
      .select('skill_name, accuracy')
      .eq('student_id', req.user.id)
      .lt('accuracy', 60);

    const weakContext = weaknesses?.length
      ? `Focus MORE questions on weak areas: ${weaknesses.map(w => w.skill_name.replace(/_/g, ' ')).join(', ')}`
      : '';

    const response = await askGroq([
      { role: 'system', content: `You are a CBSE ${langName} exam paper setter for Class ${req.student.class}.` },
      { role: 'user', content: `Generate a mock test with 10 MCQs, 5 short answer (2 marks), 2 long answer (5 marks). Total: 30 marks. ${weakContext}

Return JSON only: {"mcqs": [{"q":"...", "options":["A","B","C","D"], "correct":0, "skill":"..."}], "shortAnswers": [{"q":"...", "expectedAnswer":"...", "marks":2}], "longAnswers": [{"q":"...", "rubric":"...", "marks":5}], "totalMarks": 30, "timeMinutes": 45}` }
    ], { max_tokens: 3000 });

    let test;
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      test = JSON.parse(jsonMatch[0]);
    } catch {
      test = { raw: response };
    }

    res.json({ test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
