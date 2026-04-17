const supabase = require('../services/supabase');

async function planGuard(req, res, next) {
  const student = req.student;
  if (!student) return res.status(401).json({ error: 'Login required' });

  const now = new Date();
  const trialEnd = new Date(student.trial_ends_at);

  if (student.plan === 'explorer_trial' && now <= trialEnd) {
    return next();
  }

  if (student.plan === 'topper') {
    return next();
  }

  if (student.plan === 'explorer') {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const { data: sessions } = await supabase
      .from('sessions')
      .select('start_time, end_time')
      .eq('student_id', student.id)
      .gte('start_time', monthStart);

    let totalMinutes = 0;
    if (sessions) {
      sessions.forEach(s => {
        if (s.end_time) {
          totalMinutes += (new Date(s.end_time) - new Date(s.start_time)) / 60000;
        }
      });
    }

    if (totalMinutes >= 300) {
      return res.status(403).json({
        error: 'Monthly limit reached',
        message: 'You have used your 5 hours this month. Upgrade to Topper for unlimited access!',
        minutesUsed: Math.round(totalMinutes),
        limit: 300
      });
    }
    return next();
  }

  if (student.plan === 'explorer_trial' && now > trialEnd) {
    return res.status(403).json({
      error: 'Trial expired',
      message: 'Your free trial has ended. Choose a plan to continue learning!'
    });
  }

  next();
}

module.exports = planGuard;
