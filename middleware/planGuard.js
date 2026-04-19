const supabase = require('../services/supabase');

const DAILY_LIMITS = {
  free: 10,
  explorer_trial: 10,
  explorer: 20,
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

async function planGuard(req, res, next) {
  const student = req.student;
  if (!student) return res.status(401).json({ error: 'Login required' });

  const plan = student.plan || 'free';
  const limit = DAILY_LIMITS[plan] || 10;
  const today = getTodayKey();

  // Check trial expiry
  if (plan === 'explorer_trial' && student.trial_ends_at) {
    const now = new Date();
    const trialEnd = new Date(student.trial_ends_at);
    if (now > trialEnd) {
      return res.status(403).json({
        error: 'trial_expired',
        message: 'Your free trial has ended. Choose a plan to continue learning!',
      });
    }
  }

  // Count today's messages
  const { count } = await supabase
    .from('daily_messages')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', student.id)
    .eq('date', today);

  const used = count || 0;

  if (used >= limit) {
    return res.status(429).json({
      error: 'daily_limit',
      message: `You've used all ${limit} messages for today! Come back tomorrow or upgrade to Pro Student for more.`,
      used,
      limit,
      plan,
    });
  }

  // Log this message
  await supabase.from('daily_messages').insert({
    student_id: student.id,
    date: today,
  });

  // Attach usage info to request for frontend
  req.usage = { used: used + 1, limit, plan };
  next();
}

module.exports = planGuard;
