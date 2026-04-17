const router = require('express').Router();
const supabase = require('../services/supabase');
const authMiddleware = require('../middleware/auth');
const { sendDailyReport, sendWeeklyReport, sendDailyReportsToAll, sendWeeklyReportsToAll } = require('../services/emailReports');

// Get student's notification stats (for stats bar)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    // Today's sessions
    const { data: todaySessions } = await supabase
      .from('sessions')
      .select('duration_min')
      .eq('student_id', req.user.id)
      .gte('started_at', today + 'T00:00:00');

    const todayMinutes = (todaySessions || []).reduce((sum, s) => sum + (s.duration_min || 0), 0);

    // This week's sessions
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (now.getDay() || 7) + 1);
    const weekStart = monday.toISOString().slice(0, 10);

    const { data: weekSessions } = await supabase
      .from('sessions')
      .select('duration_min')
      .eq('student_id', req.user.id)
      .gte('started_at', weekStart + 'T00:00:00');

    const weekMinutes = (weekSessions || []).reduce((sum, s) => sum + (s.duration_min || 0), 0);

    res.json({
      todayMinutes,
      weekMinutes,
      streak: req.student.streak_days || 0,
      xp: req.student.total_xp || 0,
      plan: req.student.plan || 'trial',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Trigger daily report for current student (student can request)
router.post('/send-daily', authMiddleware, async (req, res) => {
  try {
    const result = await sendDailyReport(req.user.id);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Trigger weekly report for current student
router.post('/send-weekly', authMiddleware, async (req, res) => {
  try {
    const result = await sendWeeklyReport(req.user.id);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: send daily reports to all students (call via cron/scheduler)
router.post('/admin/daily-all', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const result = await sendDailyReportsToAll();
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: send weekly reports to all students
router.post('/admin/weekly-all', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const result = await sendWeeklyReportsToAll();
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: update stats bar config for all users
router.post('/admin/config', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // Store config in a simple key-value approach
  // In production, use a config table in Supabase
  const config = req.body;
  global.statsBarConfig = { ...global.statsBarConfig, ...config };
  res.json({ success: true, config: global.statsBarConfig });
});

// Get current stats bar config
router.get('/config', (req, res) => {
  res.json({ config: global.statsBarConfig || {} });
});

module.exports = router;
