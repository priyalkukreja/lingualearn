const router = require('express').Router();
const supabase = require('../services/supabase');
const authMiddleware = require('../middleware/auth');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, studentClass, language, parentEmail } = req.body;

    if (!name || !email || !password || !studentClass || !language) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name }
    });

    if (authError) return res.status(400).json({ error: authError.message });

    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 30);

    const { error: insertError } = await supabase.from('students').insert({
      id: authData.user.id,
      name,
      email,
      class: parseInt(studentClass),
      board: 'CBSE',
      language,
      plan: 'explorer_trial',
      trial_ends_at: trialEnds.toISOString(),
      parent_email: parentEmail || null,
      total_xp: 0,
      current_streak: 0
    });

    if (insertError) return res.status(400).json({ error: insertError.message });

    res.json({
      message: 'Account created! Your free trial starts now (30 days).',
      user: { id: authData.user.id, name, email }
    });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed: ' + err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });

    const { data: student } = await supabase
      .from('students')
      .select('*')
      .eq('id', data.user.id)
      .single();

    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const lastActive = student?.last_active_date;
    let streak = student?.current_streak || 0;

    if (!lastActive) {
      streak = 1;
    } else if (lastActive !== today) {
      const last = new Date(lastActive);
      const diff = Math.round((new Date(today) - last) / 86400000);
      streak = diff === 1 ? streak + 1 : 1;
    }

    const longestStreak = Math.max(streak, student?.longest_streak || 0);
    await supabase.from('students').update({
      last_active_date: today,
      current_streak: streak,
      longest_streak: longestStreak
    }).eq('id', data.user.id);

    res.json({
      token: data.session.access_token,
      student: { ...student, current_streak: streak }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed: ' + err.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: (process.env.APP_URL || 'https://padhlo.life') + '/login'
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Password reset email sent! Check your inbox.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send reset email: ' + err.message });
  }
});

router.post('/update-profile', authMiddleware, async (req, res) => {
  try {
    const { language, studentClass, textbook, level, goals } = req.body;
    const updates = {};
    if (language) updates.language = language;
    if (studentClass) updates.class = parseInt(studentClass);
    if (textbook) updates.textbook = textbook;
    if (level) updates.level = level;
    if (goals) updates.goals = goals;

    const { data, error } = await supabase.from('students')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ student: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/fix-account', async (req, res) => {
  try {
    const { email, password, adminKey } = req.body;
    if (adminKey !== process.env.ADMIN_KEY) return res.status(403).json({ error: 'Unauthorized' });
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const existing = users.find(u => u.email === email);
    if (existing) {
      await supabase.from('students').delete().eq('id', existing.id);
      await supabase.auth.admin.deleteUser(existing.id);
    }
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email, password, email_confirm: true
    });
    if (authError) return res.status(400).json({ error: authError.message });
    res.json({ message: 'Account fixed', userId: authData.user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  await supabase.auth.signOut();
  res.json({ message: 'Logged out' });
});

router.get('/me', authMiddleware, async (req, res) => {
  res.json({ student: req.student });
});

router.post('/claim-daily', authMiddleware, async (req, res) => {
  try {
    const { xp } = req.body;
    const reward = Math.min(Math.max(parseInt(xp) || 15, 15), 100);

    const today = new Date().toISOString().slice(0, 10);
    const lastClaim = req.student.last_daily_claim;
    if (lastClaim === today) {
      return res.json({ student: req.student, message: 'Already claimed today' });
    }

    const newXP = (req.student.total_xp || 0) + reward;
    const { data: updated } = await supabase.from('students').update({
      total_xp: newXP,
      last_daily_claim: today
    }).eq('id', req.user.id).select().single();

    res.json({ student: updated, xpAwarded: reward });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/use-freeze', authMiddleware, async (req, res) => {
  try {
    const freezes = req.student.streak_freezes || 0;
    if (freezes <= 0) {
      return res.status(400).json({ error: 'No streak freezes available' });
    }

    const today = new Date().toISOString().slice(0, 10);
    const { data: updated } = await supabase.from('students').update({
      streak_freezes: freezes - 1,
      last_active_date: today
    }).eq('id', req.user.id).select().single();

    res.json({ student: updated, freezesLeft: updated.streak_freezes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
