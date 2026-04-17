document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth()) return;

  const student = getStudent();
  if (student) {
    document.getElementById('welcomeMsg').textContent = `Welcome back, ${student.name}! 👋`;
    document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';
    document.getElementById('navStreak').textContent = '🔥 ' + (student.current_streak || 0);
    document.getElementById('pmName').textContent = student.name;

    const plans = { explorer_trial: 'Free Trial', explorer: 'Explorer', topper: 'Topper' };
    document.getElementById('pmPlan').textContent = plans[student.plan] || student.plan;
    document.getElementById('totalXP').textContent = student.total_xp || 0;
    document.getElementById('streak').textContent = student.current_streak || 0;
    document.getElementById('planName').textContent = plans[student.plan] || 'Trial';

    const xp = student.total_xp || 0;
    let level = 'Beginner';
    if (xp >= 1000) level = 'Master';
    else if (xp >= 600) level = 'Scholar';
    else if (xp >= 300) level = 'Explorer';
    else if (xp >= 100) level = 'Learner';
    document.getElementById('xpLevel').textContent = level;
  }

  await startSession();
  loadLastSession();
  loadPricingStatus();
  loadSessions();
  loadSkills();
  loadHomework();
  loadDashboardWeakness();
  loadDashboardChallenges();
});

async function loadLastSession() {
  const data = await apiGet('/api/sessions/current');
  if (data?.session?.last_chapter) {
    document.getElementById('resumeMsg').textContent =
      `You left off at "${data.session.last_chapter}". Ready to continue?`;
  } else {
    document.getElementById('resumeMsg').textContent =
      "Start a new learning session — your AI tutor is waiting!";
  }
}

async function loadPricingStatus() {
  const data = await apiGet('/api/pricing/status');
  if (data) {
    const detail = document.getElementById('planDetail');
    if (data.trialActive) {
      detail.textContent = data.trialDaysLeft + ' days left';
    } else if (data.minutesLimit) {
      detail.textContent = Math.round(data.minutesUsed) + '/' + data.minutesLimit + ' min';
    } else {
      detail.textContent = 'Unlimited';
    }
  }
}

async function loadSessions() {
  const data = await apiGet('/api/sessions/history');
  const container = document.getElementById('recentSessions');
  const countEl = document.getElementById('sessionsCount');
  const hoursEl = document.getElementById('studyHours');

  if (data?.sessions?.length) {
    let totalMin = 0;
    countEl.textContent = data.sessions.length;

    container.innerHTML = data.sessions.slice(0, 5).map(s => {
      const duration = s.end_time
        ? Math.round((new Date(s.end_time) - new Date(s.start_time)) / 60000)
        : 0;
      totalMin += duration;
      const date = new Date(s.start_time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      return `<div class="session-item">
        <span class="si-date">${date} · ${duration} min</span>
        <span class="si-xp">+${s.xp_earned || 0} XP</span>
      </div>`;
    }).join('');

    const hours = Math.round(totalMin / 60 * 10) / 10;
    hoursEl.textContent = hours + 'h';
  }
}

async function loadSkills() {
  const data = await apiGet('/api/skills/map');
  if (!data?.radar?.length) return;

  const list = document.getElementById('skillList');
  const colors = {
    grammar: '#5b5ef4', vocabulary: '#f72585', pronunciation: '#06d6a0',
    reading: '#f97316', writing: '#7209b7', culture: '#0ea5e9'
  };

  list.innerHTML = data.radar.map(r => {
    const color = colors[r.category] || '#5b5ef4';
    return `<div class="skill-item">
      <span class="skill-name">${r.category}</span>
      <div class="skill-bar">
        <div class="skill-bar-fill" style="width:${r.accuracy}%;background:${color}"></div>
      </div>
      <span class="skill-pct" style="color:${color}">${r.accuracy}%</span>
    </div>`;
  }).join('');

  const weakData = await apiGet('/api/skills/weaknesses');
  const weakContainer = document.getElementById('weaknesses');
  if (weakData?.weaknesses?.length) {
    weakContainer.innerHTML = weakData.weaknesses.map(w =>
      `<div class="weak-item">
        <span class="wi-icon">⚠️</span>
        <span class="wi-name">${w.skill_name.replace(/_/g, ' ')}</span>
        <span class="wi-pct">${Math.round(w.accuracy)}%</span>
      </div>`
    ).join('');
  }
}

async function loadHomework() {
  const data = await apiGet('/api/homework/list');
  const container = document.getElementById('homeworkList');
  const countEl = document.getElementById('hwCompleted');

  if (data?.homeworks?.length) {
    const graded = data.homeworks.filter(h => h.status === 'graded').length;
    countEl.textContent = graded;

    container.innerHTML = data.homeworks.slice(0, 4).map(h => {
      const date = new Date(h.assigned_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      return `<div class="hw-item">
        <span>${h.title} · ${date}</span>
        <span class="hw-status ${h.status}">${h.status}</span>
      </div>`;
    }).join('');
  }
}

async function loadRevision() {
  const area = document.getElementById('revisionArea');
  area.innerHTML = '<div style="text-align:center;padding:1rem;color:#5b5ef4;font-weight:700">Generating revision...</div>';

  const sessionData = await apiGet('/api/sessions/current');
  const topics = sessionData?.session?.topics_covered || ['General vocabulary', 'Basic grammar'];

  const data = await apiPost('/api/ai/revision', { lastTopics: topics });
  if (data?.revision) {
    area.innerHTML = `<div class="revision-content">${data.revision}</div>`;
  } else {
    area.innerHTML = '<div class="no-data">Could not generate revision. Try again later.</div>';
  }
}

function loadDashboardWeakness() {
  if (typeof WeaknessEngine === 'undefined') return;
  const container = document.getElementById('weaknesses');
  const top = WeaknessEngine.getTopWeaknesses(3);

  if (!top.length) {
    container.innerHTML = '<div class="no-data">Complete quizzes to see weak areas!</div>';
    return;
  }

  container.innerHTML = top.map(w => `
    <div class="wk-card ${w.severity.level}" style="cursor:default">
      <div class="wk-severity">${w.severity.icon}</div>
      <div class="wk-info">
        <div class="wk-topic">${w.topic.replace(/_/g, ' ')}</div>
        <div class="wk-category">${w.category} · ${w.severity.label}</div>
      </div>
      <div class="wk-score" style="color:${w.severity.color}">${w.accuracy}%</div>
    </div>
  `).join('');
}

function loadDashboardChallenges() {
  if (typeof WeaknessEngine === 'undefined') return;
  const container = document.getElementById('dashChallenges');
  const challenges = WeaknessEngine.getActiveChallenges().filter(c => !c.completed).slice(0, 2);

  if (!challenges.length) {
    container.innerHTML = '<div class="no-data">All challenges completed! 🏆</div>';
    return;
  }

  container.innerHTML = challenges.map(ch => `
    <div class="ch-card">
      <div class="ch-header">
        <div class="ch-icon">${ch.icon}</div>
        <div class="ch-name">${ch.name}</div>
        <div class="ch-xp">+${ch.xp} XP</div>
      </div>
      <div class="ch-desc">${ch.desc}</div>
      <div class="ch-progress-bar"><div class="ch-progress-fill" style="width:${ch.pct}%"></div></div>
      <div class="ch-progress-text">${ch.progress}/${ch.target}</div>
    </div>
  `).join('');
}

function toggleProfileMenu() {
  document.getElementById('profileMenu').classList.toggle('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-profile-btn') && !e.target.closest('.profile-menu')) {
    document.getElementById('profileMenu')?.classList.remove('open');
  }
});
