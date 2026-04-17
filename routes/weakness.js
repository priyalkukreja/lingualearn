const router = require('express').Router();
const supabase = require('../services/supabase');
const authMiddleware = require('../middleware/auth');
const groq = require('../services/groq');

router.post('/drill-questions', authMiddleware, async (req, res) => {
  try {
    const { category, topic, count = 10, difficulty = 'mixed' } = req.body;
    const lang = req.student.language;
    const cls = req.student.class;

    const prompt = `Generate exactly ${count} practice questions for a CBSE Class ${cls} ${lang} student.
Topic: ${topic} (Category: ${category})
Difficulty: ${difficulty}

Return a JSON array of questions. Each question should have:
- "type": one of "mcq", "fill", "transform", "match"
- "prompt": the question text in ${lang} (with English translation for lower classes)
- "options": array of 4 strings (for mcq type only)
- "answer": correct answer
- "explanation": brief explanation why this is correct
- "difficulty": "easy", "medium", or "hard"

Focus on the student's weak area. Start with easier questions and gradually increase difficulty.
Return ONLY the JSON array, no other text.`;

    const response = await groq.chat(prompt);
    let questions;
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      questions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      questions = [];
    }

    res.json({ questions, topic, category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/record', authMiddleware, async (req, res) => {
  try {
    const { category, topic, score, total } = req.body;
    const accuracy = Math.round((score / total) * 100);

    const { data: existing } = await supabase
      .from('skill_map')
      .select('*')
      .eq('student_id', req.user.id)
      .eq('skill_name', `${category}_${topic}`)
      .single();

    if (existing) {
      await supabase
        .from('skill_map')
        .update({
          total_questions: existing.total_questions + total,
          correct_answers: existing.correct_answers + score,
          accuracy,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('skill_map')
        .insert({
          student_id: req.user.id,
          language: req.student.language,
          skill_name: `${category}_${topic}`,
          total_questions: total,
          correct_answers: score,
          accuracy
        });
    }

    const xpEarned = score * 5;
    await supabase
      .from('students')
      .update({ total_xp: (req.student.total_xp || 0) + xpEarned })
      .eq('id', req.user.id);

    res.json({ recorded: true, accuracy, xpEarned });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/report', authMiddleware, async (req, res) => {
  try {
    const { data: skills } = await supabase
      .from('skill_map')
      .select('*')
      .eq('student_id', req.user.id)
      .eq('language', req.student.language)
      .order('accuracy', { ascending: true });

    const critical = (skills || []).filter(s => s.accuracy < 40);
    const weak = (skills || []).filter(s => s.accuracy >= 40 && s.accuracy < 60);
    const average = (skills || []).filter(s => s.accuracy >= 60 && s.accuracy < 75);
    const strong = (skills || []).filter(s => s.accuracy >= 75);

    res.json({ critical, weak, average, strong, total: (skills || []).length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/peer-stats', authMiddleware, async (req, res) => {
  try {
    const { category, topic } = req.query;
    const lang = req.student.language;

    const { data } = await supabase
      .from('skill_map')
      .select('accuracy')
      .eq('language', lang)
      .eq('skill_name', `${category}_${topic}`);

    if (!data || !data.length) {
      return res.json({ peerAverage: 55, totalStudents: 0, yourRank: 0 });
    }

    const avgAccuracy = Math.round(data.reduce((s, d) => s + d.accuracy, 0) / data.length);
    const studentAcc = data.find(d => d.student_id === req.user.id)?.accuracy || 0;
    const rank = data.filter(d => d.accuracy > studentAcc).length + 1;

    res.json({ peerAverage: avgAccuracy, totalStudents: data.length, yourRank: rank });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/parent-weakness-report', authMiddleware, async (req, res) => {
  try {
    const { data: skills } = await supabase
      .from('skill_map')
      .select('*')
      .eq('student_id', req.user.id)
      .eq('language', req.student.language)
      .order('accuracy', { ascending: true });

    const weakAreas = (skills || []).filter(s => s.accuracy < 60);
    const strongAreas = (skills || []).filter(s => s.accuracy >= 75);

    const report = {
      studentName: req.student.name,
      language: req.student.language,
      class: req.student.class,
      weakAreas: weakAreas.map(s => ({
        topic: s.skill_name.replace(/_/g, ' '),
        accuracy: s.accuracy,
        attempts: s.total_questions,
        status: s.accuracy < 40 ? 'Needs urgent attention' : 'Improving'
      })),
      strongAreas: strongAreas.map(s => ({
        topic: s.skill_name.replace(/_/g, ' '),
        accuracy: s.accuracy
      })),
      recommendation: weakAreas.length > 3
        ? `${req.student.name} has ${weakAreas.length} weak areas that need focused practice. We recommend 30 minutes of daily targeted drills.`
        : weakAreas.length > 0
          ? `${req.student.name} is doing well overall with just ${weakAreas.length} area(s) to improve. Regular practice will help.`
          : `${req.student.name} is performing excellently across all areas! Keep up the great work.`
    };

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
