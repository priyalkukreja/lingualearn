/**
 * Feature 5: Daily Streak Rewards System
 * Tracks consecutive study days, awards badges & XP milestones
 */
const StreakRewards = (() => {
  const KEY = 'll_streak_rewards';

  const MILESTONES = [
    { days: 3,   badge: '🔥', name: 'Fire Starter',     xp: 50,  color: '#f97316' },
    { days: 7,   badge: '⭐', name: 'Weekly Warrior',    xp: 100, color: '#eab308' },
    { days: 14,  badge: '💪', name: 'Two-Week Titan',    xp: 200, color: '#22c55e' },
    { days: 21,  badge: '🎯', name: 'Three-Week Master', xp: 300, color: '#5b5ef4' },
    { days: 30,  badge: '👑', name: 'Monthly Champion',  xp: 500, color: '#7209b7', avatar: 'golden_crown' },
    { days: 50,  badge: '💎', name: 'Diamond Learner',   xp: 750, color: '#06b6d4' },
    { days: 100, badge: '🏆', name: 'CBSE Champion',     xp: 1500, color: '#f72585', title: 'CBSE Champion' },
    { days: 200, badge: '🌟', name: 'Language Legend',    xp: 3000, color: '#5b5ef4' },
    { days: 365, badge: '🎓', name: 'Annual Achiever',   xp: 5000, color: '#dc2626' },
  ];

  const FREEZE_SHIELDS = {
    free: 0,
    explorer: 1,
    topper: 3
  };

  function getData() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { streak: 0, lastDate: null, earned: [], freezes: 0, totalDays: 0, longestStreak: 0 }; } catch { return { streak: 0, lastDate: null, earned: [], freezes: 0, totalDays: 0, longestStreak: 0 }; }
  }
  function save(d) { localStorage.setItem(KEY, JSON.stringify(d)); }

  function checkIn() {
    const data = getData();
    const today = new Date().toISOString().split('T')[0];
    if (data.lastDate === today) return { alreadyChecked: true, streak: data.streak };

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (data.lastDate === yesterday) {
      data.streak++;
    } else if (data.lastDate && data.lastDate !== yesterday) {
      if (data.freezes > 0) {
        data.freezes--;
        data.streak++;
      } else {
        data.streak = 1;
      }
    } else {
      data.streak = 1;
    }

    data.lastDate = today;
    data.totalDays++;
    if (data.streak > data.longestStreak) data.longestStreak = data.streak;

    const newBadges = [];
    MILESTONES.forEach(m => {
      if (data.streak >= m.days && !data.earned.includes(m.name)) {
        data.earned.push(m.name);
        newBadges.push(m);
      }
    });

    save(data);
    newBadges.forEach(b => showStreakBadge(b));
    return { streak: data.streak, newBadges, data };
  }

  function getStatus() {
    const data = getData();
    const nextMilestone = MILESTONES.find(m => data.streak < m.days);
    return {
      streak: data.streak,
      totalDays: data.totalDays,
      longestStreak: data.longestStreak,
      freezesLeft: data.freezes,
      earnedBadges: data.earned,
      nextMilestone,
      daysToNext: nextMilestone ? nextMilestone.days - data.streak : 0,
      allMilestones: MILESTONES.map(m => ({ ...m, earned: data.earned.includes(m.name), current: data.streak >= m.days }))
    };
  }

  function addFreeze(plan) {
    const data = getData();
    data.freezes += (FREEZE_SHIELDS[plan] || 0);
    save(data);
  }

  async function useFreeze() {
    const data = getData();
    if (data.freezes <= 0) return { success: false, message: 'No freezes left' };
    data.freezes--;
    data.lastDate = new Date().toISOString().split('T')[0];
    save(data);
    if (typeof apiPost === 'function') {
      await apiPost('/api/auth/use-freeze', {});
    }
    return { success: true, freezesLeft: data.freezes };
  }

  function showStreakBadge(milestone) {
    const popup = document.createElement('div');
    popup.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.8);z-index:2000;opacity:0;transition:all 0.5s cubic-bezier(0.34,1.56,0.64,1);pointer-events:none';
    popup.innerHTML = `
      <div style="background:white;border-radius:24px;padding:2rem 3rem;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.25);border:3px solid ${milestone.color}">
        <div style="font-size:4rem;animation:bounce 0.5s ease 0.3s">${milestone.badge}</div>
        <div style="font-size:0.8rem;font-weight:800;color:${milestone.color};text-transform:uppercase;letter-spacing:1px">🔥 ${milestone.days}-Day Streak!</div>
        <div style="font-size:1.3rem;font-weight:900;margin:0.3rem 0">${milestone.name}</div>
        <div style="font-weight:900;color:white;background:linear-gradient(135deg,${milestone.color},${milestone.color}88);padding:0.3rem 1rem;border-radius:50px;display:inline-block;font-size:0.9rem;margin-top:0.5rem">+${milestone.xp} XP</div>
        ${milestone.title ? `<div style="margin-top:0.5rem;font-size:0.82rem;font-weight:800;color:#64748b">You earned the title: "${milestone.title}"!</div>` : ''}
      </div>
    `;
    document.body.appendChild(popup);
    requestAnimationFrame(() => { popup.style.opacity = '1'; popup.style.transform = 'translate(-50%,-50%) scale(1)'; });
    setTimeout(() => { popup.style.opacity = '0'; setTimeout(() => popup.remove(), 500); }, 4000);

    const student = typeof getStudent === 'function' ? getStudent() : null;
    if (student) {
      student.total_xp = (student.total_xp || 0) + milestone.xp;
      localStorage.setItem('ll_student', JSON.stringify(student));
    }
  }

  function renderStreakWidget(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const status = getStatus();

    el.innerHTML = `
      <div style="background:linear-gradient(135deg,#fff7ed,#fef3c7);border-radius:16px;padding:1rem;border:2px solid #fed7aa">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem">
          <div style="font-size:2rem">🔥</div>
          <div>
            <div style="font-weight:900;font-size:1.3rem;color:#ea580c">${status.streak} Day Streak</div>
            <div style="font-size:0.78rem;font-weight:700;color:#92400e">Longest: ${status.longestStreak} days · Total: ${status.totalDays} days studied</div>
          </div>
        </div>
        ${status.nextMilestone ? `
          <div style="font-size:0.82rem;font-weight:700;color:#78350f;margin-bottom:0.5rem">
            ${status.nextMilestone.badge} Next: ${status.nextMilestone.name} in ${status.daysToNext} days (+${status.nextMilestone.xp} XP)
          </div>
          <div style="height:6px;background:#fde68a;border-radius:50px;overflow:hidden">
            <div style="height:100%;width:${Math.min(100, (status.streak / status.nextMilestone.days) * 100)}%;background:linear-gradient(90deg,#f97316,#ea580c);border-radius:50px;transition:width 0.5s"></div>
          </div>
        ` : '<div style="font-size:0.85rem;font-weight:800;color:#ea580c">🏆 All streak milestones reached! You\'re a legend!</div>'}
        <div style="display:flex;gap:0.5rem;margin-top:0.75rem;flex-wrap:wrap">
          ${status.allMilestones.slice(0, 7).map(m => `
            <div style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;${m.earned ? 'background:' + m.color + '22;border:2px solid ' + m.color : 'background:#f5f5f5;border:2px solid #e5e5e5;opacity:0.4'}" title="${m.name} (${m.days} days)">
              ${m.badge}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return { checkIn, getStatus, addFreeze, useFreeze, renderStreakWidget, MILESTONES };
})();

if (typeof isLoggedIn === 'function' && isLoggedIn()) {
  StreakRewards.checkIn();
}
