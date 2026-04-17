/**
 * Feature 9: Exam Countdown Mode
 * 15 days before exam: switches to intensive revision mode
 * Only revision, mock tests, and weakness drills
 */
const ExamCountdown = (() => {
  const KEY = 'll_exam_countdown';

  const EXAM_DATES = {
    ut1:         { month: 6, day: 20, label: 'Unit Test 1' },
    ut2:         { month: 8, day: 25, label: 'Unit Test 2' },
    half_yearly: { month: 10, day: 15, label: 'Half-Yearly Exam' },
    annual:      { month: 1, day: 20, label: 'Annual Exam' }
  };

  function getNextExam() {
    const now = new Date();
    const year = now.getFullYear();
    let nearest = null;
    let nearestDays = Infinity;

    for (const [key, exam] of Object.entries(EXAM_DATES)) {
      let examDate = new Date(year, exam.month, exam.day);
      if (examDate < now) examDate = new Date(year + 1, exam.month, exam.day);

      const days = Math.ceil((examDate - now) / 86400000);
      if (days < nearestDays) {
        nearestDays = days;
        nearest = { key, ...exam, date: examDate, daysLeft: days };
      }
    }
    return nearest;
  }

  function isCountdownActive() {
    const exam = getNextExam();
    return exam && exam.daysLeft <= 15;
  }

  function getCountdownData() {
    const exam = getNextExam();
    if (!exam) return null;

    const phase = exam.daysLeft <= 3 ? 'final_sprint' : exam.daysLeft <= 7 ? 'intensive' : exam.daysLeft <= 15 ? 'active' : 'normal';

    const dailyPlan = {
      final_sprint: { focus: 'Quick revision + mock tests only', minStudy: 60, mockTests: 2, drills: 5, newContent: false },
      intensive: { focus: 'Weakness drills + revision sheets', minStudy: 45, mockTests: 1, drills: 10, newContent: false },
      active: { focus: 'Balanced revision + weakness practice', minStudy: 30, mockTests: 1, drills: 5, newContent: true }
    };

    return {
      exam,
      phase,
      plan: dailyPlan[phase] || dailyPlan.active,
      isActive: exam.daysLeft <= 15,
      urgency: phase === 'final_sprint' ? 'critical' : phase === 'intensive' ? 'high' : 'moderate'
    };
  }

  function renderBanner(containerId) {
    const el = containerId ? document.getElementById(containerId) : null;
    const data = getCountdownData();
    if (!data || !data.isActive) {
      if (el) el.style.display = 'none';
      return;
    }

    const colors = {
      final_sprint: { bg: 'linear-gradient(135deg,#dc2626,#b91c1c)', border: '#fecaca', text: '#fff' },
      intensive: { bg: 'linear-gradient(135deg,#f97316,#ea580c)', border: '#fed7aa', text: '#fff' },
      active: { bg: 'linear-gradient(135deg,#5b5ef4,#7209b7)', border: '#c7d2fe', text: '#fff' }
    };
    const c = colors[data.phase] || colors.active;

    const banner = document.createElement('div');
    banner.className = 'exam-countdown-banner';
    banner.style.cssText = `background:${c.bg};color:${c.text};padding:0.75rem 2rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:center;font-family:'Nunito',sans-serif`;
    banner.innerHTML = `
      <span style="font-size:1.3rem">📅</span>
      <span style="font-weight:900;font-size:1rem">${data.exam.label} in ${data.exam.daysLeft} day${data.exam.daysLeft !== 1 ? 's' : ''}!</span>
      <span style="font-weight:700;font-size:0.85rem;opacity:0.9">${data.plan.focus}</span>
      <a href="/mock-test" style="background:rgba(255,255,255,0.2);color:white;padding:0.3rem 1rem;border-radius:50px;font-weight:800;font-size:0.82rem;text-decoration:none;border:1.5px solid rgba(255,255,255,0.3)">Take Mock Test →</a>
      <a href="/weakness" style="background:rgba(255,255,255,0.2);color:white;padding:0.3rem 1rem;border-radius:50px;font-weight:800;font-size:0.82rem;text-decoration:none;border:1.5px solid rgba(255,255,255,0.3)">Practice Weak Areas →</a>
    `;

    if (el) {
      el.innerHTML = '';
      el.appendChild(banner);
      el.style.display = 'block';
    } else {
      const nav = document.querySelector('.navbar');
      if (nav) nav.after(banner);
    }
  }

  function renderCountdownWidget(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const data = getCountdownData();

    if (!data) {
      el.innerHTML = '<div style="text-align:center;padding:1rem;color:#64748b;font-size:0.9rem">No upcoming exams in the next 30 days</div>';
      return;
    }

    const examDate = data.exam.date;
    const hours = Math.floor((examDate - new Date()) / 3600000) % 24;

    el.innerHTML = `
      <div style="text-align:center;padding:1.5rem">
        <div style="font-size:0.8rem;font-weight:800;color:#5b5ef4;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.5rem">${data.exam.label}</div>
        <div style="display:flex;justify-content:center;gap:1rem;margin:1rem 0">
          <div style="text-align:center">
            <div style="font-size:2.5rem;font-weight:900;background:linear-gradient(135deg,${data.urgency === 'critical' ? '#dc2626,#b91c1c' : data.urgency === 'high' ? '#f97316,#ea580c' : '#5b5ef4,#7209b7'});-webkit-background-clip:text;-webkit-text-fill-color:transparent">${data.exam.daysLeft}</div>
            <div style="font-size:0.72rem;font-weight:800;color:#64748b">DAYS</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:2.5rem;font-weight:900;color:#64748b">${hours}</div>
            <div style="font-size:0.72rem;font-weight:800;color:#64748b">HOURS</div>
          </div>
        </div>
        <div style="font-size:0.85rem;font-weight:700;color:#64748b;margin-bottom:1rem">${data.plan.focus}</div>
        <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap">
          <div style="padding:0.3rem 0.8rem;border-radius:50px;background:#eef0ff;font-weight:800;font-size:0.75rem;color:#5b5ef4">📝 ${data.plan.mockTests} mock test/day</div>
          <div style="padding:0.3rem 0.8rem;border-radius:50px;background:#fff7ed;font-weight:800;font-size:0.75rem;color:#ea580c">🎯 ${data.plan.drills} drills/day</div>
          <div style="padding:0.3rem 0.8rem;border-radius:50px;background:#f0fdf4;font-weight:800;font-size:0.75rem;color:#16a34a">⏱️ ${data.plan.minStudy} min/day</div>
        </div>
      </div>
    `;
  }

  return { getNextExam, isCountdownActive, getCountdownData, renderBanner, renderCountdownWidget };
})();

if (typeof isLoggedIn === 'function' && isLoggedIn()) {
  ExamCountdown.renderBanner();
}
