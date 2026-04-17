const router = require('express').Router();
const supabase = require('../services/supabase');
const authMiddleware = require('../middleware/auth');

router.post('/start', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase.from('sessions').insert({
      student_id: req.user.id,
      start_time: new Date().toISOString(),
      topics_covered: [],
      xp_earned: 0
    }).select().single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ session: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/end', authMiddleware, async (req, res) => {
  try {
    const { sessionId, topicsCovered, xpEarned, lastChapter, lastPosition } = req.body;

    const { data, error } = await supabase.from('sessions').update({
      end_time: new Date().toISOString(),
      topics_covered: topicsCovered || [],
      xp_earned: xpEarned || 0,
      last_chapter: lastChapter || null,
      last_position: lastPosition || null
    }).eq('id', sessionId).eq('student_id', req.user.id).select().single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ session: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/heartbeat', authMiddleware, async (req, res) => {
  try {
    const { sessionId, lastChapter, lastPosition } = req.body;

    await supabase.from('sessions').update({
      last_chapter: lastChapter,
      last_position: lastPosition
    }).eq('id', sessionId).eq('student_id', req.user.id);

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/current', authMiddleware, async (req, res) => {
  try {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('student_id', req.user.id)
      .order('start_time', { ascending: false })
      .limit(1)
      .single();

    res.json({ session: data || null });
  } catch (err) {
    res.json({ session: null });
  }
});

router.get('/history', authMiddleware, async (req, res) => {
  try {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('student_id', req.user.id)
      .order('start_time', { ascending: false })
      .limit(20);

    res.json({ sessions: data || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
