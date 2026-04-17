/**
 * Live Stats Bar — shows real-time study stats on every page
 * Updates every 30 seconds (configurable)
 * Sits below navbar, always visible
 */

const StatsBar = (() => {
  // ===== ADMIN CONFIG (change these anytime) =====
  const CONFIG = {
    updateInterval: 30,       // seconds between updates
    showToday: true,           // show today's study time
    showWeek: true,            // show this week's total
    showStreak: true,          // show day streak
    showXP: true,              // show total XP
    showGoalBar: true,         // show progress bar toward daily goal
    dailyGoalMinutes: 45,      // daily target (adjustable per plan)
    enabled: true,             // global toggle — set false to hide everywhere

    // Milestone messages (triggered at these minute marks)
    milestones: {
      5:   { msg: 'Good start! Keep going! 🌱', color: '#94a3b8' },
      15:  { msg: 'Warming up nicely! 🔥', color: '#f59e0b' },
      30:  { msg: 'Half-way to your goal! 💪', color: '#f97316' },
      45:  { msg: 'Daily goal reached! Champion! 🏆', color: '#16a34a' },
      60:  { msg: 'Over 1 hour! Superstar! ⭐', color: '#5b5ef4' },
      90:  { msg: 'Incredible dedication! 🔥🔥', color: '#7209b7' },
      120: { msg: 'Study machine! 2 hours! 💎', color: '#dc2626' },
    },

    // Plan-specific goals
    planGoals: {
      trial:    45,
      explorer: 45,
      topper:   60,
    }
  };

  let barElement = null;
  let updateTimer = null;
  let sessionStartTime = null;
  let todayMinutes = 0;
  let weekMinutes = 0;
  let lastMilestone = 0;

  function init() {
    if (!CONFIG.enabled) return;

    const student = getStudentData();
    if (!student) return;

    // Adjust goal based on plan
    if (student.plan && CONFIG.planGoals[student.plan]) {
      CONFIG.dailyGoalMinutes = CONFIG.planGoals[student.plan];
    }

    sessionStartTime = Date.now();
    createBar();
    updateStats();
    updateTimer = setInterval(updateStats, CONFIG.updateInterval * 1000);
  }

  function getStudentData() {
    try {
      return JSON.parse(localStorage.getItem('ll_student'));
    } catch { return null; }
  }

  function createBar() {
    // Don't duplicate
    if (document.getElementById('liveStatsBar')) return;

    barElement = document.createElement('div');
    barElement.id = 'liveStatsBar';
    barElement.className = 'stats-bar';
    barElement.innerHTML = `
      <div class="sb-inner">
        <div class="sb-stats">
          ${CONFIG.showToday ? '<div class="sb-stat" id="sbToday"><span class="sb-icon">🕐</span> Today: <strong id="sbTodayVal">0 min</strong></div>' : ''}
          ${CONFIG.showWeek ? '<div class="sb-stat" id="sbWeek"><span class="sb-icon">📅</span> Week: <strong id="sbWeekVal">0h 0m</strong></div>' : ''}
          ${CONFIG.showStreak ? '<div class="sb-stat" id="sbStreak"><span class="sb-icon">🔥</span> Streak: <strong id="sbStreakVal">0 days</strong></div>' : ''}
          ${CONFIG.showXP ? '<div class="sb-stat" id="sbXP"><span class="sb-icon">⭐</span> <strong id="sbXPVal">0 XP</strong></div>' : ''}
        </div>
        ${CONFIG.showGoalBar ? `
        <div class="sb-goal">
          <div class="sb-goal-bar">
            <div class="sb-goal-fill" id="sbGoalFill"></div>
          </div>
          <span class="sb-goal-text" id="sbGoalText">0/${CONFIG.dailyGoalMinutes} min</span>
        </div>
        ` : ''}
        <div class="sb-message" id="sbMessage" style="display:none"></div>
      </div>
    `;

    // Insert after navbar
    const navbar = document.querySelector('.navbar');
    if (navbar && navbar.nextSibling) {
      navbar.parentNode.insertBefore(barElement, navbar.nextSibling);
    } else {
      document.body.prepend(barElement);
    }
  }

  function updateStats() {
    if (!barElement) return;

    // Calculate current session time
    const sessionMinutes = Math.floor((Date.now() - sessionStartTime) / 60000);

    // Get stored data
    const stored = getStoredStats();
    todayMinutes = stored.todayMinutes + sessionMinutes;
    weekMinutes = stored.weekMinutes + sessionMinutes;

    // Update display
    if (CONFIG.showToday) {
      const el = document.getElementById('sbTodayVal');
      if (el) {
        if (todayMinutes >= 60) {
          el.textContent = Math.floor(todayMinutes / 60) + 'h ' + (todayMinutes % 60) + 'm';
        } else {
          el.textContent = todayMinutes + ' min';
        }
      }
    }

    if (CONFIG.showWeek) {
      const el = document.getElementById('sbWeekVal');
      if (el) {
        const h = Math.floor(weekMinutes / 60);
        const m = weekMinutes % 60;
        el.textContent = h + 'h ' + m + 'm';
      }
    }

    if (CONFIG.showStreak) {
      const el = document.getElementById('sbStreakVal');
      if (el) el.textContent = (stored.streak || 0) + ' days';
    }

    if (CONFIG.showXP) {
      const el = document.getElementById('sbXPVal');
      if (el) el.textContent = (stored.xp || 0) + ' XP';
    }

    // Goal progress bar
    if (CONFIG.showGoalBar) {
      const fill = document.getElementById('sbGoalFill');
      const text = document.getElementById('sbGoalText');
      if (fill && text) {
        const pct = Math.min(100, (todayMinutes / CONFIG.dailyGoalMinutes) * 100);
        fill.style.width = pct + '%';

        // Color changes based on progress
        if (pct >= 100) {
          fill.style.background = 'linear-gradient(90deg, #16a34a, #22c55e)';
          text.textContent = '✅ Goal reached!';
          text.style.color = '#16a34a';
        } else if (pct >= 60) {
          fill.style.background = 'linear-gradient(90deg, #f97316, #fbbf24)';
          text.textContent = todayMinutes + '/' + CONFIG.dailyGoalMinutes + ' min';
          text.style.color = '#f97316';
        } else {
          fill.style.background = 'linear-gradient(90deg, #5b5ef4, #7209b7)';
          text.textContent = todayMinutes + '/' + CONFIG.dailyGoalMinutes + ' min';
          text.style.color = '#5b5ef4';
        }
      }
    }

    // Check milestones
    checkMilestones(todayMinutes);

    // Save current session progress
    saveSessionProgress(sessionMinutes);
  }

  function checkMilestones(minutes) {
    const milestoneKeys = Object.keys(CONFIG.milestones)
      .map(Number).sort((a, b) => a - b);

    for (const min of milestoneKeys) {
      if (minutes >= min && lastMilestone < min) {
        lastMilestone = min;
        showMilestone(CONFIG.milestones[min]);
        break;
      }
    }
  }

  function showMilestone(milestone) {
    const msgEl = document.getElementById('sbMessage');
    if (!msgEl) return;

    msgEl.textContent = milestone.msg;
    msgEl.style.color = milestone.color;
    msgEl.style.display = '';
    msgEl.classList.add('sb-msg-pop');

    // Notify robot tutor if available
    if (typeof RobotTutor !== 'undefined') {
      RobotTutor.onCelebrate(milestone.msg);
    }

    setTimeout(() => {
      msgEl.style.display = 'none';
      msgEl.classList.remove('sb-msg-pop');
    }, 5000);
  }

  function getStoredStats() {
    const today = new Date().toISOString().slice(0, 10);
    const stored = JSON.parse(localStorage.getItem('ll_daily_stats') || '{}');

    // Reset if new day
    if (stored.date !== today) {
      stored.date = today;
      stored.todayMinutes = 0;
    }

    // Reset week if Monday
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (now.getDay() || 7) + 1);
    const weekKey = monday.toISOString().slice(0, 10);
    if (stored.weekKey !== weekKey) {
      stored.weekKey = weekKey;
      stored.weekMinutes = 0;
    }

    const student = getStudentData();
    stored.streak = student?.streak_days || stored.streak || 0;
    stored.xp = student?.total_xp || stored.xp || 0;

    return stored;
  }

  function saveSessionProgress(sessionMinutes) {
    const stored = getStoredStats();
    stored.sessionMinutes = sessionMinutes;
    localStorage.setItem('ll_daily_stats', JSON.stringify(stored));
  }

  // Called when session ends (page unload or explicit end)
  function commitSession() {
    const sessionMinutes = Math.floor((Date.now() - sessionStartTime) / 60000);
    const stored = getStoredStats();
    stored.todayMinutes = (stored.todayMinutes || 0) + sessionMinutes;
    stored.weekMinutes = (stored.weekMinutes || 0) + sessionMinutes;
    stored.sessionMinutes = 0;
    localStorage.setItem('ll_daily_stats', JSON.stringify(stored));
  }

  // Admin: update config at runtime
  function updateConfig(newConfig) {
    Object.assign(CONFIG, newConfig);
    if (barElement) {
      barElement.remove();
      barElement = null;
    }
    createBar();
    updateStats();
  }

  function destroy() {
    if (updateTimer) clearInterval(updateTimer);
    commitSession();
    if (barElement) barElement.remove();
  }

  // Commit session on page unload
  window.addEventListener('beforeunload', commitSession);

  return {
    init,
    updateConfig,
    updateStats,
    commitSession,
    destroy,
    getConfig: () => ({ ...CONFIG }),
  };
})();

// Auto-initialize if user is logged in
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('ll_token')) {
    StatsBar.init();
  }
});
