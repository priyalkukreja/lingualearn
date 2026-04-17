const supabase = require('./supabase');

async function analyzeSkills(studentId, language) {
  const { data: skills } = await supabase
    .from('skill_map')
    .select('*')
    .eq('student_id', studentId)
    .eq('language', language);

  if (!skills?.length) return { overall: 0, categories: {}, weak: [], strong: [] };

  const categories = {};
  let totalQ = 0, totalC = 0;

  skills.forEach(s => {
    const cat = s.skill_name.split('_')[0];
    if (!categories[cat]) categories[cat] = { total: 0, correct: 0, skills: [] };
    categories[cat].total += s.total_questions;
    categories[cat].correct += s.correct_answers;
    categories[cat].skills.push(s);
    totalQ += s.total_questions;
    totalC += s.correct_answers;
  });

  const weak = skills.filter(s => s.accuracy < 60 && s.total_questions >= 3);
  const strong = skills.filter(s => s.accuracy >= 80);

  return {
    overall: totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0,
    categories,
    weak: weak.sort((a, b) => a.accuracy - b.accuracy),
    strong: strong.sort((a, b) => b.accuracy - a.accuracy)
  };
}

async function buildLearningProfile(studentId, language) {
  const analysis = await analyzeSkills(studentId, language);

  const { data: sessions } = await supabase
    .from('sessions')
    .select('start_time, end_time')
    .eq('student_id', studentId);

  let totalMinutes = 0;
  const durations = [];
  (sessions || []).forEach(s => {
    if (s.end_time) {
      const mins = (new Date(s.end_time) - new Date(s.start_time)) / 60000;
      totalMinutes += mins;
      durations.push(mins);
    }
  });

  const avgSession = durations.length ? Math.round(totalMinutes / durations.length) : 0;

  const profileData = {
    student_id: studentId,
    weak_skills: analysis.weak.map(s => ({ name: s.skill_name, accuracy: s.accuracy })),
    strong_skills: analysis.strong.map(s => ({ name: s.skill_name, accuracy: s.accuracy })),
    total_study_minutes: Math.round(totalMinutes),
    avg_session_length: avgSession,
    updated_at: new Date().toISOString()
  };

  const { data: existing } = await supabase
    .from('learning_profile')
    .select('id')
    .eq('student_id', studentId)
    .single();

  if (existing) {
    await supabase.from('learning_profile').update(profileData).eq('student_id', studentId);
  } else {
    profileData.recommended_methods = {};
    await supabase.from('learning_profile').insert(profileData);
  }

  return { ...profileData, analysis };
}

module.exports = { analyzeSkills, buildLearningProfile };
