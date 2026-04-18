const router = require('express').Router();
const { askGroq } = require('../services/groq');
const supabase = require('../services/supabase');
const authMiddleware = require('../middleware/auth');
const planGuard = require('../middleware/planGuard');

function buildSystemPrompt(student, method) {
  const methodInstructions = {
    visual: 'Use diagrams, flowcharts, and visual representations. Format tables clearly. Use arrows (→) and boxes to show relationships.',
    story: 'Teach through short engaging stories set in India. Weave vocabulary and grammar into narrative. Make characters relatable to Indian students.',
    pattern: 'Show clear pattern tables. Highlight regularities. Use side-by-side comparisons. Great for analytical minds.',
    mnemonic: 'Create memorable tricks, acronyms, and associations. Connect new words to Hindi/English similar-sounding words.',
    micro: 'Break into tiny 2-minute chunks. One concept at a time. Test immediately after each micro-lesson.',
    game: 'Make it fun! Use challenges, fill-in-the-blanks puzzles, word associations. Encourage the student.',
    default: 'Explain clearly with Indian examples. Use tables for grammar. Be encouraging.'
  };

  return `You are LinguaLearn AI — an expert ${student.language} tutor for CBSE Class ${student.class} students in India.

RULES:
- Explain in simple English (mix Hindi words if helpful)
- Use examples from Indian daily life
- After explaining, give 2-3 quick check questions
- For grammar: ALWAYS show a clear table
- For vocabulary: show the word, pronunciation, meaning, and example sentence
- Be encouraging — say "Great!" "Well done!" "Almost there!"
- Keep responses focused and not too long
- If the student is wrong, explain WHY gently and give a similar practice question

TEACHING METHOD: ${methodInstructions[method] || methodInstructions.default}

STUDENT INFO: ${student.name}, Class ${student.class}, learning ${student.language}, Board: CBSE`;
}

router.post('/explain', authMiddleware, planGuard, async (req, res) => {
  try {
    const { topic, method } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    const systemPrompt = buildSystemPrompt(req.student, method || 'default');

    const response = await askGroq([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Explain this topic: ${topic}` }
    ]);

    await supabase.from('students').update({
      total_xp: (req.student.total_xp || 0) + 15
    }).eq('id', req.user.id);

    res.json({ explanation: response, xpEarned: 15, usage: req.usage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/quiz', authMiddleware, planGuard, async (req, res) => {
  try {
    const { topic, difficulty, count } = req.body;

    const response = await askGroq([
      { role: 'system', content: buildSystemPrompt(req.student, 'default') },
      { role: 'user', content: `Generate ${count || 5} ${difficulty || 'medium'} difficulty quiz questions about "${topic}" for CBSE Class ${req.student.class} ${req.student.language}.

Return ONLY valid JSON in this exact format:
{"questions": [{"q": "question text", "options": ["A", "B", "C", "D"], "correct": 0, "explanation": "why this is correct", "skill": "skill_name"}]}

Where "correct" is the index (0-3) of the right answer and "skill" is a category like "grammar_articles", "vocabulary_food", etc.` }
    ], { temperature: 0.8 });

    let quiz;
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      quiz = JSON.parse(jsonMatch[0]);
    } catch {
      quiz = { questions: [], raw: response };
    }

    quiz.usage = req.usage;
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/check', authMiddleware, planGuard, async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) return res.status(400).json({ error: 'Answers array required' });

    let totalCorrect = 0;
    const results = [];

    for (const a of answers) {
      const isCorrect = a.selected === a.correct;
      if (isCorrect) totalCorrect++;

      results.push({
        question: a.question,
        isCorrect,
        selected: a.selected,
        correct: a.correct,
        explanation: a.explanation
      });

      if (a.skill) {
        const { data: existing } = await supabase
          .from('skill_map')
          .select('*')
          .eq('student_id', req.user.id)
          .eq('skill_name', a.skill)
          .eq('language', req.student.language)
          .single();

        if (existing) {
          const newTotal = existing.total_questions + 1;
          const newCorrect = existing.correct_answers + (isCorrect ? 1 : 0);
          const accuracy = (newCorrect / newTotal) * 100;
          let mastery = 'weak';
          if (accuracy >= 80) mastery = 'mastered';
          else if (accuracy >= 60) mastery = 'proficient';
          else if (accuracy >= 40) mastery = 'developing';

          await supabase.from('skill_map').update({
            total_questions: newTotal,
            correct_answers: newCorrect,
            accuracy,
            mastery_level: mastery,
            updated_at: new Date().toISOString()
          }).eq('id', existing.id);
        } else {
          await supabase.from('skill_map').insert({
            student_id: req.user.id,
            skill_name: a.skill,
            language: req.student.language,
            total_questions: 1,
            correct_answers: isCorrect ? 1 : 0,
            accuracy: isCorrect ? 100 : 0,
            mastery_level: isCorrect ? 'proficient' : 'weak',
            updated_at: new Date().toISOString()
          });
        }
      }
    }

    const xp = totalCorrect * 10 + (answers.length - totalCorrect) * 5;
    await supabase.from('students').update({
      total_xp: (req.student.total_xp || 0) + xp
    }).eq('id', req.user.id);

    res.json({
      score: totalCorrect,
      total: answers.length,
      percentage: Math.round((totalCorrect / answers.length) * 100),
      xpEarned: xp,
      results
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/chat', authMiddleware, planGuard, async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const messages = [
      { role: 'system', content: buildSystemPrompt(req.student, 'default') },
      ...(history || []),
      { role: 'user', content: message }
    ];

    const response = await askGroq(messages);
    res.json({ reply: response, usage: req.usage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/revision', authMiddleware, planGuard, async (req, res) => {
  try {
    const { lastTopics } = req.body;

    const response = await askGroq([
      { role: 'system', content: buildSystemPrompt(req.student, 'default') },
      { role: 'user', content: `Give a quick 2-minute revision summary of these topics the student covered in their last class: ${(lastTopics || []).join(', ')}.

Format:
- 5-6 bullet points of key things to remember
- 2 quick recall questions
- One encouraging line to motivate the student

Keep it short and crisp.` }
    ]);

    res.json({ revision: response, usage: req.usage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
