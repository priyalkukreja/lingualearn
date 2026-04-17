const supabase = require('../services/supabase');

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Login required' });

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Invalid session' });

    const { data: student } = await supabase
      .from('students')
      .select('*')
      .eq('id', user.id)
      .single();

    req.user = user;
    req.student = student;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authentication failed' });
  }
}

module.exports = authMiddleware;
