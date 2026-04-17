const router = require('express').Router();
const supabase = require('../services/supabase');
const authMiddleware = require('../middleware/auth');

const PLANS = {
  explorer_trial: {
    name: 'Free Trial',
    price: 0,
    duration: '30 days',
    features: ['Unlimited access for 30 days', 'All languages', 'AI tutoring', 'Voice lab', 'Homework check', 'Exam prep']
  },
  explorer: {
    name: 'Explorer',
    price: 199,
    duration: 'per month',
    features: ['5 hours/month AI tutoring', 'All languages & classes', 'AI homework check', 'Flashcards & quizzes', 'Progress tracking', 'Revision summaries']
  },
  topper: {
    name: 'Topper',
    price: 349,
    duration: 'per month',
    features: ['Unlimited AI tutoring', 'Everything in Explorer', 'Personalized weak-area practice', 'Detailed monthly report card', 'Board exam prep mode', 'Priority AI responses', 'Certificate of completion']
  }
};

router.get('/plans', (req, res) => {
  res.json({ plans: PLANS });
});

router.get('/status', authMiddleware, async (req, res) => {
  try {
    const student = req.student;
    const now = new Date();
    const trialEnd = new Date(student.trial_ends_at);
    const trialActive = student.plan === 'explorer_trial' && now <= trialEnd;
    const trialDaysLeft = trialActive ? Math.ceil((trialEnd - now) / 86400000) : 0;

    let minutesUsed = 0;
    if (student.plan === 'explorer') {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const { data: sessions } = await supabase
        .from('sessions')
        .select('start_time, end_time')
        .eq('student_id', student.id)
        .gte('start_time', monthStart);

      (sessions || []).forEach(s => {
        if (s.end_time) {
          minutesUsed += (new Date(s.end_time) - new Date(s.start_time)) / 60000;
        }
      });
    }

    res.json({
      currentPlan: student.plan,
      planDetails: PLANS[student.plan],
      trialActive,
      trialDaysLeft,
      minutesUsed: Math.round(minutesUsed),
      minutesLimit: student.plan === 'explorer' ? 300 : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
