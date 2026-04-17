const router = require('express').Router();
const supabase = require('../services/supabase');
const { askGroq } = require('../services/groq');
const authMiddleware = require('../middleware/auth');
const planGuard = require('../middleware/planGuard');

router.post('/check', authMiddleware, planGuard, async (req, res) => {
  try {
    const { taskType, prompt, marks, studentText, submissionMode } = req.body;

    if (!studentText || studentText.trim().length < 10) {
      return res.status(400).json({ error: 'Please write at least a few sentences.' });
    }

    const langName = req.student.language.charAt(0).toUpperCase() + req.student.language.slice(1);

    const response = await askGroq([
      { role: 'system', content: `You are an expert CBSE ${langName} teacher for Class ${req.student.class}. A student has submitted a ${taskType} writing assignment. Grade it thoroughly but kindly.

Evaluate on 4 criteria (each out of 10):
1. Grammar & Spelling — correct verb forms, agreements, accents, spelling
2. Vocabulary Usage — variety, appropriateness, avoiding repetition
3. Structure & Format — proper format (letter/essay/dialogue format), paragraphing, flow
4. Content & Ideas — relevance to prompt, creativity, completeness

For each error found:
- Classify as "error" (serious mistake), "warning" (minor issue), or "good" (praise)
- Show the original incorrect text and the corrected version
- Explain WHY it's wrong in simple terms a student would understand

Also provide:
- A fully corrected version of the student's writing
- 3-5 specific tips to improve

Return JSON only:
{
  "overallScore": <number out of ${marks || 10}>,
  "totalMarks": ${marks || 10},
  "categories": [
    {"name": "Grammar & Spelling", "score": <1-10>},
    {"name": "Vocabulary Usage", "score": <1-10>},
    {"name": "Structure & Format", "score": <1-10>},
    {"name": "Content & Ideas", "score": <1-10>}
  ],
  "errors": [
    {"type": "error|warning|good", "category": "Grammar|Vocabulary|Structure|Content", "explanation": "...", "original": "...", "corrected": "..."}
  ],
  "correctedVersion": "full corrected text...",
  "tips": ["tip1", "tip2", "tip3"]
}` },
      { role: 'user', content: `Writing Prompt: ${prompt}\n\nTask Type: ${taskType}\nSubmission Mode: ${submissionMode}\n\nStudent's Writing:\n${studentText}` }
    ], { max_tokens: 3000 });

    let feedback;
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      feedback = JSON.parse(jsonMatch[0]);
    } catch {
      feedback = { raw: response, overallScore: null };
    }

    // Update skill map
    if (feedback.categories) {
      for (const cat of feedback.categories) {
        const skillName = `writing_${taskType}_${cat.name.toLowerCase().replace(/[^a-z]/g, '_')}`;
        const isCorrect = cat.score >= 7;

        const { data: existing } = await supabase
          .from('skill_map')
          .select('*')
          .eq('student_id', req.user.id)
          .eq('skill_name', skillName)
          .single();

        if (existing) {
          await supabase.from('skill_map').update({
            attempts: existing.attempts + 1,
            correct: existing.correct + (isCorrect ? 1 : 0),
            accuracy: ((existing.correct + (isCorrect ? 1 : 0)) / (existing.attempts + 1) * 100).toFixed(2),
            last_tested: new Date().toISOString()
          }).eq('id', existing.id);
        } else {
          await supabase.from('skill_map').insert({
            student_id: req.user.id,
            skill_name: skillName,
            category: 'writing',
            attempts: 1,
            correct: isCorrect ? 1 : 0,
            accuracy: isCorrect ? 100 : 0
          });
        }
      }
    }

    // Award XP
    const avgScore = feedback.categories
      ? feedback.categories.reduce((sum, c) => sum + c.score, 0) / feedback.categories.length
      : 5;
    const xp = Math.round(avgScore * 2);
    await supabase.from('students').update({
      total_xp: (req.student.total_xp || 0) + xp
    }).eq('id', req.user.id);

    res.json({ feedback, xpEarned: xp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/history', authMiddleware, async (req, res) => {
  try {
    const { data } = await supabase
      .from('homework')
      .select('*')
      .eq('student_id', req.user.id)
      .order('submitted_at', { ascending: false })
      .limit(20);

    res.json({ history: data || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
