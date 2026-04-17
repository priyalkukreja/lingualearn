const supabase = require('./supabase');
const { askGroq } = require('./groq');

const METHODS = ['visual', 'story', 'pattern', 'mnemonic', 'micro', 'game', 'default'];

async function selectMethod(studentId, skill) {
  const { data: profile } = await supabase
    .from('learning_profile')
    .select('*')
    .eq('student_id', studentId)
    .single();

  if (profile?.recommended_methods?.[skill]) {
    return profile.recommended_methods[skill];
  }

  const { data: sessions } = await supabase
    .from('sessions')
    .select('start_time, end_time')
    .eq('student_id', studentId)
    .order('start_time', { ascending: false })
    .limit(10);

  let avgSessionMinutes = 15;
  if (sessions?.length) {
    const durations = sessions
      .filter(s => s.end_time)
      .map(s => (new Date(s.end_time) - new Date(s.start_time)) / 60000);
    if (durations.length) avgSessionMinutes = durations.reduce((a, b) => a + b, 0) / durations.length;
  }

  if (avgSessionMinutes < 8) return 'micro';

  const category = skill.split('_')[0];
  if (['grammar', 'tenses', 'conjugation'].includes(category)) return 'pattern';
  if (['vocabulary', 'words'].includes(category)) return 'game';
  if (['pronunciation', 'speaking'].includes(category)) return 'story';

  return 'visual';
}

async function updateMethodSuccess(studentId, skill, method, improved) {
  const { data: profile } = await supabase
    .from('learning_profile')
    .select('*')
    .eq('student_id', studentId)
    .single();

  const methods = profile?.recommended_methods || {};

  if (improved) {
    methods[skill] = method;
  } else {
    const currentIdx = METHODS.indexOf(method);
    const nextIdx = (currentIdx + 1) % METHODS.length;
    methods[skill] = METHODS[nextIdx];
  }

  if (profile) {
    await supabase.from('learning_profile').update({
      recommended_methods: methods,
      updated_at: new Date().toISOString()
    }).eq('student_id', studentId);
  } else {
    await supabase.from('learning_profile').insert({
      student_id: studentId,
      recommended_methods: methods,
      weak_skills: [],
      strong_skills: [],
      total_study_minutes: 0,
      avg_session_length: 0,
      updated_at: new Date().toISOString()
    });
  }
}

module.exports = { selectMethod, updateMethodSuccess, METHODS };
