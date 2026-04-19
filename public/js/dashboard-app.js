const MOTIVATIONAL_QUOTES = [
  '"The expert in anything was once a beginner." — Keep going! 💪',
  '"Small daily improvements are the key to staggering long-term results." 🚀',
  '"You don\'t have to be great to start, but you have to start to be great." ⭐',
  '"Every champion was once a contender who refused to give up." 🏆',
  '"Your brain is a muscle. The more you use it, the stronger it gets." 🧠',
  '"Consistency beats intensity. Show up every day!" 🔥',
  '"Mistakes are proof that you are trying." 💡',
  '"You\'re not behind. You\'re on your own path." 🌟',
];

const LEVEL_THRESHOLDS = [
  { xp: 0, name: 'Newbie', emoji: '🌱' },
  { xp: 50, name: 'Learner', emoji: '📚' },
  { xp: 150, name: 'Explorer', emoji: '🧭' },
  { xp: 300, name: 'Warrior', emoji: '⚔️' },
  { xp: 500, name: 'Scholar', emoji: '🎓' },
  { xp: 800, name: 'Champion', emoji: '🏆' },
  { xp: 1200, name: 'Master', emoji: '👑' },
  { xp: 2000, name: 'Legend', emoji: '🌟' },
];

function getLevel(xp) {
  let level = LEVEL_THRESHOLDS[0];
  let levelNum = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i].xp) {
      level = LEVEL_THRESHOLDS[i];
      levelNum = i + 1;
    }
  }
  const nextIdx = Math.min(levelNum, LEVEL_THRESHOLDS.length - 1);
  const nextXP = LEVEL_THRESHOLDS[nextIdx].xp;
  const prevXP = level.xp;
  const progress = nextXP > prevXP ? ((xp - prevXP) / (nextXP - prevXP)) * 100 : 100;
  return { ...level, levelNum, progress, xpToNext: Math.max(0, nextXP - xp) };
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth()) return;

  const student = getStudent();
  if (student) {
    const name = student.name || 'Student';
    const hour = new Date().getHours();
    let greeting = 'Hey';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    document.getElementById('welcomeMsg').textContent = `${greeting}, ${name}! 👋`;
    document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';
    document.getElementById('navStreak').textContent = '🔥 ' + (student.current_streak || 0);
    document.getElementById('pmName').textContent = name;

    const plans = { explorer_trial: 'Free Trial', explorer: 'Explorer', topper: 'Topper' };
    document.getElementById('pmPlan').textContent = plans[student.plan] || student.plan;
    document.getElementById('totalXP').textContent = student.total_xp || 0;
    document.getElementById('streak').textContent = student.current_streak || 0;
    document.getElementById('planName').textContent = plans[student.plan] || 'Trial';

    const xp = student.total_xp || 0;
    const lvl = getLevel(xp);

    document.getElementById('xpLevel').textContent = `${lvl.emoji} ${lvl.name}`;
    document.getElementById('xpToNext').textContent = lvl.xpToNext > 0 ? `${lvl.xpToNext} XP to next level` : 'Max level!';
    document.getElementById('avatarLevel').textContent = lvl.levelNum;
    document.getElementById('heroXP').textContent = xp;
    document.getElementById('heroStreak').textContent = student.current_streak || 0;
    document.getElementById('heroRank').textContent = lvl.name;

    setTimeout(() => {
      document.getElementById('xpLevelFill').style.width = lvl.progress + '%';
      const ring = document.getElementById('xpRingProgress');
      const circumference = 339.3;
      ring.style.strokeDashoffset = circumference - (circumference * lvl.progress / 100);
      ring.style.transition = 'stroke-dashoffset 1.5s ease';
    }, 300);

    const streakCount = student.current_streak || 0;
    const flamesContainer = document.getElementById('streakFlames');
    const flameCount = Math.min(streakCount, 10);
    flamesContainer.innerHTML = Array(flameCount).fill(0).map((_, i) =>
      `<span class="streak-flame" style="animation-delay:${i * 0.1}s">🔥</span>`
    ).join('');

    checkLevelUp(student);
    showDailyReward(student);

    if (typeof StreakRewards !== 'undefined') {
      StreakRewards.renderStreakWidget('streakWidgetContainer');
    }
  }

  const quoteEl = document.getElementById('motivationText');
  quoteEl.textContent = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  updateMissionTimer();
  setInterval(updateMissionTimer, 60000);

  await startSession();
  loadLastSession();
  loadPricingStatus();
  loadSessions();
  loadSkills();
  loadHomework();
  loadDashboardWeakness();
  loadDashboardChallenges();
});

function showDailyReward(student) {
  const today = new Date().toDateString();
  const lastClaimed = localStorage.getItem('ll_daily_claimed');
  if (lastClaimed === today) return;

  const overlay = document.getElementById('dailyRewardOverlay');
  overlay.classList.add('show');

  const streak = student.current_streak || 0;
  const dayInWeek = (streak % 7) || 0;

  for (let i = 1; i <= 7; i++) {
    const el = document.getElementById('drDay' + i);
    if (i <= dayInWeek) el.classList.add('claimed');
    if (i === dayInWeek + 1) el.classList.add('today');
  }

  const rewards = [15, 20, 25, 30, 35, 50, 100];
  const todayReward = rewards[Math.min(dayInWeek, 6)];
  document.getElementById('drPrize').querySelector('.dr-prize-text').textContent = `+${todayReward} XP`;
}

function checkLevelUp(student) {
  const xp = student.total_xp || 0;
  const currentLevel = getLevel(xp);
  const lastLevel = parseInt(localStorage.getItem('ll_last_level') || '1');

  if (currentLevel.levelNum > lastLevel) {
    localStorage.setItem('ll_last_level', currentLevel.levelNum);
    setTimeout(() => {
      document.getElementById('levelUpEmoji').textContent = currentLevel.emoji;
      document.getElementById('levelUpName').textContent = currentLevel.name;
      document.getElementById('levelUpSub').textContent = `Level ${currentLevel.levelNum} unlocked!`;
      document.getElementById('levelUpOverlay').classList.add('show');
    }, 1500);
  } else {
    localStorage.setItem('ll_last_level', currentLevel.levelNum);
  }
}

window.closeLevelUp = function() {
  document.getElementById('levelUpOverlay').classList.remove('show');
};

window.claimDailyReward = async function() {
  localStorage.setItem('ll_daily_claimed', new Date().toDateString());
  document.getElementById('dailyRewardOverlay').classList.remove('show');

  const student = getStudent();
  const streak = student?.current_streak || 0;
  const rewards = [15, 20, 25, 30, 35, 50, 100];
  const reward = rewards[Math.min((streak % 7) || 0, 6)];

  showXPFloat(`+${reward} XP`);

  const data = await apiPost('/api/auth/claim-daily', { xp: reward });
  if (data?.student) {
    localStorage.setItem('ll_student', JSON.stringify(data.student));
    document.getElementById('navXP').textContent = data.student.total_xp + ' XP';
    document.getElementById('totalXP').textContent = data.student.total_xp;
    const lvl = getLevel(data.student.total_xp);
    document.getElementById('xpLevel').textContent = `${lvl.emoji} ${lvl.name}`;
    document.getElementById('xpToNext').textContent = lvl.xpToNext > 0 ? `${lvl.xpToNext} XP to next level` : 'Max level!';
    checkLevelUp(data.student);
  }
};

function showXPFloat(text) {
  const container = document.getElementById('xpFloatContainer');
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = text;
  el.style.left = (window.innerWidth / 2 - 30) + 'px';
  el.style.top = (window.innerHeight / 2) + 'px';
  container.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

function updateMissionTimer() {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const diff = endOfDay - now;
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const el = document.getElementById('missionTimer');
  if (el) el.textContent = `${hours}h ${mins}m`;
}

async function loadLastSession() {
  const data = await apiGet('/api/sessions/current');
  if (data?.session?.last_chapter) {
    document.getElementById('resumeMsg').textContent =
      `You left off at "${data.session.last_chapter}". Let's crush it!`;
  } else {
    document.getElementById('resumeMsg').textContent =
      "Your adventure awaits — let's learn something awesome!";
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
      return `<div class="session-item-v2">
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
    return `<div class="skill-item-v2">
      <span class="skill-name">${r.category}</span>
      <div class="skill-bar">
        <div class="skill-bar-fill" style="width:${r.accuracy}%;background:${color}"></div>
      </div>
      <span class="skill-pct" style="color:${color}">${r.accuracy}%</span>
    </div>`;
  }).join('');
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
  area.innerHTML = '<div style="text-align:center;padding:1rem;color:#5b5ef4;font-weight:700">⚡ Generating revision...</div>';

  const sessionData = await apiGet('/api/sessions/current');
  const topics = sessionData?.session?.topics_covered || ['General vocabulary', 'Basic grammar'];

  const data = await apiPost('/api/ai/revision', { lastTopics: topics });
  if (data?.revision) {
    area.innerHTML = `<div class="revision-content">${data.revision}</div>`;
  } else {
    area.innerHTML = '<div class="no-data-v2">Could not generate revision. Try again later.</div>';
  }
}

function loadDashboardWeakness() {
  if (typeof WeaknessEngine === 'undefined') return;
  const container = document.getElementById('weaknesses');
  const top = WeaknessEngine.getTopWeaknesses(3);

  if (!top.length) {
    container.innerHTML = '<div class="no-data-v2">Complete quizzes to unlock boss battles! 👾</div>';
    return;
  }

  const bossEmojis = ['👾', '🐉', '👿', '🤖', '💀'];
  container.innerHTML = top.map((w, i) => `
    <div class="boss-card">
      <span class="boss-icon">${bossEmojis[i % bossEmojis.length]}</span>
      <span class="boss-name">${w.topic.replace(/_/g, ' ')}</span>
      <span class="boss-hp">${w.accuracy}% HP</span>
      <a href="/weakness" class="boss-attack-btn">Attack!</a>
    </div>
  `).join('');
}

function loadDashboardChallenges() {
  if (typeof WeaknessEngine === 'undefined') return;
  const container = document.getElementById('dashChallenges');
  const challenges = WeaknessEngine.getActiveChallenges().filter(c => !c.completed).slice(0, 2);

  if (!challenges.length) {
    container.innerHTML = '<div class="no-data-v2">All quests completed! 🏆 You\'re a legend!</div>';
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
