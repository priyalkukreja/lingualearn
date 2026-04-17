const router = require('express').Router();
const supabase = require('../services/supabase');
const authMiddleware = require('../middleware/auth');

router.get('/map', authMiddleware, async (req, res) => {
  try {
    const { data } = await supabase
      .from('skill_map')
      .select('*')
      .eq('student_id', req.user.id)
      .eq('language', req.student.language);

    const categories = {};
    (data || []).forEach(s => {
      const cat = s.skill_name.split('_')[0];
      if (!categories[cat]) categories[cat] = { total: 0, correct: 0, skills: [] };
      categories[cat].total += s.total_questions;
      categories[cat].correct += s.correct_answers;
      categories[cat].skills.push(s);
    });

    const radar = Object.entries(categories).map(([name, d]) => ({
      category: name,
      accuracy: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0,
      totalQuestions: d.total,
      skills: d.skills
    }));

    res.json({ skillMap: data || [], radar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/weaknesses', authMiddleware, async (req, res) => {
  try {
    const { data } = await supabase
      .from('skill_map')
      .select('*')
      .eq('student_id', req.user.id)
      .eq('language', req.student.language)
      .lt('accuracy', 60)
      .order('accuracy', { ascending: true });

    res.json({ weaknesses: data || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const { data } = await supabase
      .from('learning_profile')
      .select('*')
      .eq('student_id', req.user.id)
      .single();

    res.json({ profile: data || null });
  } catch (err) {
    res.json({ profile: null });
  }
});

module.exports = router;
