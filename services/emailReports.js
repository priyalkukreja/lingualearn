/**
 * Email Reports Service
 * Sends daily/weekly reports to parents using Resend (free: 100 emails/day)
 * Also supports scheduled cron-style calling from routes
 */

const supabase = require('./supabase');

// Resend API (free tier: 100 emails/day, 3000/month)
// Sign up at resend.com and get API key
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'LinguaLearn <noreply@lingualearn.app>';

async function sendEmail(to, subject, html) {
  if (!RESEND_API_KEY) {
    console.log('[Email] Resend API key not set. Skipping email to:', to);
    console.log('[Email] Subject:', subject);
    return { success: false, reason: 'no_api_key' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html })
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (err) {
    console.error('[Email] Send failed:', err.message);
    return { success: false, error: err.message };
  }
}

// ===== DAILY REPORT (sent at 8 PM to parent) =====
async function sendDailyReport(studentId) {
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .single();

  if (!student?.parent_email) return { skipped: true, reason: 'no_parent_email' };

  // Get today's sessions
  const today = new Date().toISOString().slice(0, 10);
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('student_id', studentId)
    .gte('started_at', today + 'T00:00:00')
    .lte('started_at', today + 'T23:59:59');

  const totalMinutes = (sessions || []).reduce((sum, s) => sum + (s.duration_min || 0), 0);
  const sessionCount = (sessions || []).length;

  const langName = student.language.charAt(0).toUpperCase() + student.language.slice(1);
  const studentName = student.name.split(' ')[0];

  const html = buildDailyHTML({
    studentName,
    langName,
    cls: student.class,
    totalMinutes,
    sessionCount,
    streak: student.streak_days || 0,
    xp: student.total_xp || 0,
    date: new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  });

  return sendEmail(
    student.parent_email,
    `${studentName}'s Daily Study Report — ${today}`,
    html
  );
}

// ===== WEEKLY REPORT (sent every Sunday) =====
async function sendWeeklyReport(studentId) {
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .single();

  if (!student?.parent_email) return { skipped: true, reason: 'no_parent_email' };

  // Get this week's data
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (now.getDay() || 7) + 1);
  const weekStart = monday.toISOString().slice(0, 10);

  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('student_id', studentId)
    .gte('started_at', weekStart + 'T00:00:00');

  const { data: skills } = await supabase
    .from('skill_map')
    .select('*')
    .eq('student_id', studentId)
    .order('accuracy', { ascending: true })
    .limit(5);

  const totalMinutes = (sessions || []).reduce((sum, s) => sum + (s.duration_min || 0), 0);
  const totalSessions = (sessions || []).length;
  const avgDaily = Math.round(totalMinutes / 7);
  const daysActive = new Set((sessions || []).map(s => s.started_at?.slice(0, 10))).size;

  const weakSkills = (skills || []).filter(s => s.accuracy < 60);
  const weakAreas = weakSkills.map(s => s.skill_name.replace(/_/g, ' '));
  const strongAreas = (skills || []).filter(s => s.accuracy >= 80)
    .map(s => s.skill_name.replace(/_/g, ' '));
  const criticalAreas = (skills || []).filter(s => s.accuracy < 40);
  const weaknessImprovedCount = weakSkills.filter(s => s.accuracy > (s.prev_accuracy || 0)).length;

  const langName = student.language.charAt(0).toUpperCase() + student.language.slice(1);
  const studentName = student.name.split(' ')[0];

  const html = buildWeeklyHTML({
    studentName,
    langName,
    cls: student.class,
    totalMinutes,
    totalSessions,
    avgDaily,
    daysActive,
    streak: student.streak_days || 0,
    xp: student.total_xp || 0,
    weakAreas,
    strongAreas,
    criticalAreas: criticalAreas.map(s => ({ name: s.skill_name.replace(/_/g, ' '), accuracy: s.accuracy, attempts: s.total_questions })),
    weaknessImprovedCount,
    weekStart: monday.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    weekEnd: now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
  });

  return sendEmail(
    student.parent_email,
    `${studentName}'s Weekly Report — ${monday.toLocaleDateString('en-IN')}`,
    html
  );
}

// ===== SEND TO ALL STUDENTS =====
async function sendDailyReportsToAll() {
  const { data: students } = await supabase
    .from('students')
    .select('id, parent_email')
    .not('parent_email', 'is', null);

  let sent = 0, skipped = 0;
  for (const s of (students || [])) {
    const result = await sendDailyReport(s.id);
    if (result?.success) sent++;
    else skipped++;
    // Rate limit: small delay between emails
    await new Promise(r => setTimeout(r, 200));
  }
  return { sent, skipped, total: (students || []).length };
}

async function sendWeeklyReportsToAll() {
  const { data: students } = await supabase
    .from('students')
    .select('id, parent_email')
    .not('parent_email', 'is', null);

  let sent = 0, skipped = 0;
  for (const s of (students || [])) {
    const result = await sendWeeklyReport(s.id);
    if (result?.success) sent++;
    else skipped++;
    await new Promise(r => setTimeout(r, 200));
  }
  return { sent, skipped, total: (students || []).length };
}

// ===== HTML TEMPLATES =====

function buildDailyHTML({ studentName, langName, cls, totalMinutes, sessionCount, streak, xp, date }) {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins} minutes`;
  const emoji = totalMinutes >= 45 ? '🏆' : totalMinutes >= 15 ? '👍' : '📌';

  return `
  <div style="font-family:'Nunito',Arial,sans-serif;max-width:520px;margin:0 auto;background:#fafbff;border-radius:20px;overflow:hidden;border:2px solid #eeeeff">
    <div style="background:linear-gradient(135deg,#5b5ef4,#7209b7);padding:1.5rem 2rem;color:white;text-align:center">
      <h1 style="margin:0;font-size:1.4rem">📊 Daily Study Report</h1>
      <p style="margin:0.3rem 0 0;opacity:0.85;font-size:0.85rem">${date}</p>
    </div>
    <div style="padding:1.5rem 2rem">
      <p style="font-size:1rem;color:#334155">Dear Parent,</p>
      <p style="font-size:0.92rem;color:#64748b;line-height:1.7">
        Here's ${studentName}'s ${langName} (Class ${cls}) study summary for today:
      </p>

      <div style="display:flex;gap:0.75rem;margin:1.25rem 0;flex-wrap:wrap">
        <div style="flex:1;min-width:100px;background:white;border-radius:14px;padding:1rem;text-align:center;border:2px solid #eeeeff">
          <div style="font-size:1.5rem">${emoji}</div>
          <div style="font-size:1.3rem;font-weight:900;color:#1e293b">${timeStr}</div>
          <div style="font-size:0.72rem;color:#94a3b8;font-weight:700">Study Time</div>
        </div>
        <div style="flex:1;min-width:100px;background:white;border-radius:14px;padding:1rem;text-align:center;border:2px solid #eeeeff">
          <div style="font-size:1.5rem">📖</div>
          <div style="font-size:1.3rem;font-weight:900;color:#1e293b">${sessionCount}</div>
          <div style="font-size:0.72rem;color:#94a3b8;font-weight:700">Sessions</div>
        </div>
        <div style="flex:1;min-width:100px;background:white;border-radius:14px;padding:1rem;text-align:center;border:2px solid #eeeeff">
          <div style="font-size:1.5rem">🔥</div>
          <div style="font-size:1.3rem;font-weight:900;color:#1e293b">${streak}</div>
          <div style="font-size:0.72rem;color:#94a3b8;font-weight:700">Day Streak</div>
        </div>
      </div>

      ${totalMinutes < 15 ?
        '<p style="background:#fef2f2;border-left:4px solid #f87171;padding:0.75rem 1rem;border-radius:0 10px 10px 0;font-size:0.85rem;color:#dc2626;font-weight:700">⚠️ ' + studentName + ' studied less than 15 minutes today. A gentle reminder might help!</p>'
        : totalMinutes >= 45 ?
        '<p style="background:#ecfdf5;border-left:4px solid #34d399;padding:0.75rem 1rem;border-radius:0 10px 10px 0;font-size:0.85rem;color:#059669;font-weight:700">✅ ' + studentName + ' hit the daily study goal! Great discipline!</p>'
        :
        '<p style="background:#fffbeb;border-left:4px solid #fbbf24;padding:0.75rem 1rem;border-radius:0 10px 10px 0;font-size:0.85rem;color:#b45309;font-weight:700">👍 ' + studentName + ' is making progress. Encourage them to study a bit more!</p>'
      }

      <p style="font-size:0.82rem;color:#94a3b8;margin-top:1.5rem;text-align:center">
        Total XP earned: <strong style="color:#5b5ef4">${xp} XP</strong>
      </p>
    </div>
    <div style="background:#f0f2ff;padding:1rem 2rem;text-align:center;font-size:0.75rem;color:#94a3b8">
      Sent by LinguaLearn — AI Language Tutor for CBSE Students
    </div>
  </div>`;
}

function buildWeeklyHTML({ studentName, langName, cls, totalMinutes, totalSessions, avgDaily, daysActive, streak, xp, weakAreas, strongAreas, criticalAreas, weaknessImprovedCount, weekStart, weekEnd }) {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins} minutes`;

  return `
  <div style="font-family:'Nunito',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fafbff;border-radius:20px;overflow:hidden;border:2px solid #eeeeff">
    <div style="background:linear-gradient(135deg,#5b5ef4,#7209b7);padding:1.5rem 2rem;color:white;text-align:center">
      <h1 style="margin:0;font-size:1.4rem">📅 Weekly Study Report</h1>
      <p style="margin:0.3rem 0 0;opacity:0.85;font-size:0.85rem">${weekStart} — ${weekEnd}</p>
    </div>
    <div style="padding:1.5rem 2rem">
      <p style="font-size:1rem;color:#334155">Dear Parent,</p>
      <p style="font-size:0.92rem;color:#64748b;line-height:1.7">
        Here's ${studentName}'s weekly summary for ${langName} (Class ${cls}):
      </p>

      <div style="display:flex;gap:0.75rem;margin:1.25rem 0;flex-wrap:wrap">
        <div style="flex:1;min-width:80px;background:white;border-radius:14px;padding:0.85rem;text-align:center;border:2px solid #eeeeff">
          <div style="font-size:1.2rem;font-weight:900;color:#1e293b">${timeStr}</div>
          <div style="font-size:0.68rem;color:#94a3b8;font-weight:700">Total Time</div>
        </div>
        <div style="flex:1;min-width:80px;background:white;border-radius:14px;padding:0.85rem;text-align:center;border:2px solid #eeeeff">
          <div style="font-size:1.2rem;font-weight:900;color:#1e293b">${daysActive}/7</div>
          <div style="font-size:0.68rem;color:#94a3b8;font-weight:700">Days Active</div>
        </div>
        <div style="flex:1;min-width:80px;background:white;border-radius:14px;padding:0.85rem;text-align:center;border:2px solid #eeeeff">
          <div style="font-size:1.2rem;font-weight:900;color:#1e293b">${avgDaily}m</div>
          <div style="font-size:0.68rem;color:#94a3b8;font-weight:700">Avg/Day</div>
        </div>
        <div style="flex:1;min-width:80px;background:white;border-radius:14px;padding:0.85rem;text-align:center;border:2px solid #eeeeff">
          <div style="font-size:1.2rem;font-weight:900;color:#1e293b">${totalSessions}</div>
          <div style="font-size:0.68rem;color:#94a3b8;font-weight:700">Sessions</div>
        </div>
      </div>

      <div style="display:flex;gap:0.75rem;margin:1rem 0;flex-wrap:wrap">
        <div style="flex:1;min-width:140px;background:white;border-radius:14px;padding:1rem;border:2px solid #eeeeff">
          <div style="font-size:0.75rem;font-weight:900;color:#059669;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.4rem">✅ Strong Areas</div>
          ${strongAreas.length ?
            strongAreas.map(a => `<div style="font-size:0.82rem;color:#334155;font-weight:700;padding:0.2rem 0">• ${a}</div>`).join('')
            : '<div style="font-size:0.82rem;color:#94a3b8">Keep practicing to see strengths!</div>'
          }
        </div>
        <div style="flex:1;min-width:140px;background:white;border-radius:14px;padding:1rem;border:2px solid #eeeeff">
          <div style="font-size:0.75rem;font-weight:900;color:#dc2626;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.4rem">⚠️ Needs Practice</div>
          ${weakAreas.length ?
            weakAreas.map(a => `<div style="font-size:0.82rem;color:#334155;font-weight:700;padding:0.2rem 0">• ${a}</div>`).join('')
            : '<div style="font-size:0.82rem;color:#94a3b8">No weak areas detected!</div>'
          }
        </div>
      </div>

      ${criticalAreas && criticalAreas.length ? `
      <div style="background:#fef2f2;border:2px solid #fecaca;border-radius:14px;padding:1rem;margin-top:1rem">
        <div style="font-size:0.78rem;font-weight:900;color:#dc2626;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.5rem">🎯 Weakness Focus — Action Needed</div>
        <p style="font-size:0.85rem;color:#7f1d1d;margin:0 0 0.5rem;line-height:1.6">
          ${studentName} has <strong>${criticalAreas.length} critical area(s)</strong> scoring below 40%.
          Our AI tutor is generating targeted drills to help improve these specific topics.
        </p>
        ${criticalAreas.map(a => `
          <div style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0;border-top:1px solid #fecaca">
            <span style="font-weight:800;font-size:0.85rem;color:#991b1b;flex:1">${a.name}</span>
            <span style="font-weight:900;font-size:0.85rem;color:#dc2626">${a.accuracy}%</span>
            <span style="font-size:0.72rem;color:#94a3b8">${a.attempts} Qs attempted</span>
          </div>
        `).join('')}
        <p style="font-size:0.82rem;color:#991b1b;margin:0.5rem 0 0;font-weight:700">
          💡 Tip: Encourage ${studentName} to use the "Beat Your Weakness" drills for 15 minutes daily.
          Expected improvement: 2-3 weeks with consistent practice.
        </p>
      </div>` : ''}

      ${weaknessImprovedCount > 0 ? `
      <div style="background:#f0fdf4;border:2px solid #86efac;border-radius:14px;padding:1rem;margin-top:0.75rem">
        <div style="font-size:0.85rem;font-weight:800;color:#16a34a">
          📈 Good news! ${weaknessImprovedCount} weak area(s) showed improvement this week!
        </div>
      </div>` : ''}

      <div style="background:#f5f6ff;border-radius:14px;padding:1rem;text-align:center;margin-top:1rem">
        <span style="font-size:0.82rem;font-weight:700;color:#64748b">🔥 Streak: <strong style="color:#f97316">${streak} days</strong></span>
        <span style="margin:0 0.75rem;color:#e2e8f0">|</span>
        <span style="font-size:0.82rem;font-weight:700;color:#64748b">⭐ XP: <strong style="color:#5b5ef4">${xp}</strong></span>
      </div>
    </div>
    <div style="background:#f0f2ff;padding:1rem 2rem;text-align:center;font-size:0.75rem;color:#94a3b8">
      Sent by LinguaLearn — AI Language Tutor for CBSE Students
    </div>
  </div>`;
}

module.exports = {
  sendEmail,
  sendDailyReport,
  sendWeeklyReport,
  sendDailyReportsToAll,
  sendWeeklyReportsToAll,
};
