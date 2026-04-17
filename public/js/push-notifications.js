/**
 * Browser Push Notifications — Study reminders & streak alerts
 * Uses Notification API (free, no server needed for basic notifications)
 * Uses scheduled local reminders via setTimeout
 */

const PushNotify = (() => {
  const CONFIG = {
    enabled: true,
    reminderHour: 18,         // 6 PM — "Haven't studied today" reminder
    streakReminderHour: 20,   // 8 PM — streak about to break warning
    celebrateGoal: true,      // notify when daily goal reached
    appName: 'LinguaLearn',
    icon: '/favicon.ico',
  };

  let permission = 'default';

  function init() {
    if (!CONFIG.enabled) return;
    if (!('Notification' in window)) return;

    permission = Notification.permission;

    if (permission === 'default') {
      showPermissionPrompt();
    } else if (permission === 'granted') {
      scheduleReminders();
    }
  }

  // Beautiful in-app prompt before browser prompt
  function showPermissionPrompt() {
    const prompt = document.createElement('div');
    prompt.id = 'pushPrompt';
    prompt.className = 'push-prompt';
    prompt.innerHTML = `
      <div class="push-prompt-inner">
        <div class="push-prompt-icon">🔔</div>
        <div class="push-prompt-text">
          <strong>Stay on track!</strong>
          <p>Get study reminders & streak alerts so you never miss a day.</p>
        </div>
        <div class="push-prompt-btns">
          <button class="push-yes" id="pushYes">Enable Reminders</button>
          <button class="push-no" id="pushNo">Not now</button>
        </div>
      </div>
    `;
    document.body.appendChild(prompt);

    // Show after 10 seconds
    setTimeout(() => {
      prompt.classList.add('push-prompt-show');
    }, 10000);

    document.getElementById('pushYes').addEventListener('click', async () => {
      const result = await Notification.requestPermission();
      permission = result;
      prompt.remove();
      if (result === 'granted') {
        showNotification('Reminders On! 🔔', 'You\'ll get gentle nudges to keep studying. Let\'s go!');
        scheduleReminders();
      }
    });

    document.getElementById('pushNo').addEventListener('click', () => {
      prompt.remove();
      localStorage.setItem('ll_push_declined', Date.now());
    });
  }

  function showNotification(title, body, options = {}) {
    if (permission !== 'granted') return;

    try {
      const notif = new Notification(title, {
        body,
        icon: options.icon || CONFIG.icon,
        badge: CONFIG.icon,
        tag: options.tag || 'lingualearn-' + Date.now(),
        requireInteraction: false,
        silent: false,
      });

      notif.onclick = () => {
        window.focus();
        notif.close();
        if (options.url) window.location.href = options.url;
      };

      setTimeout(() => notif.close(), 8000);
    } catch (e) {
      console.log('Notification error:', e);
    }
  }

  function scheduleReminders() {
    scheduleDaily(CONFIG.reminderHour, checkStudyReminder);
    scheduleDaily(CONFIG.streakReminderHour, checkStreakReminder);
  }

  function scheduleDaily(hour, callback) {
    const now = new Date();
    const target = new Date();
    target.setHours(hour, 0, 0, 0);

    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    const delay = target - now;
    setTimeout(() => {
      callback();
      // Reschedule for next day
      setInterval(callback, 24 * 60 * 60 * 1000);
    }, delay);
  }

  function checkStudyReminder() {
    const stats = JSON.parse(localStorage.getItem('ll_daily_stats') || '{}');
    const today = new Date().toISOString().slice(0, 10);

    if (stats.date !== today || (stats.todayMinutes || 0) < 5) {
      showNotification(
        'Time to study! 📚',
        'You haven\'t studied today yet. Even 15 minutes makes a difference!',
        { tag: 'study-reminder', url: '/tutor' }
      );
    } else if ((stats.todayMinutes || 0) < 30) {
      showNotification(
        'Almost there! 💪',
        `You've studied ${stats.todayMinutes} min today. A few more minutes to hit your goal!`,
        { tag: 'study-reminder', url: '/tutor' }
      );
    }
  }

  function checkStreakReminder() {
    try {
      const student = JSON.parse(localStorage.getItem('ll_student'));
      const stats = JSON.parse(localStorage.getItem('ll_daily_stats') || '{}');
      const today = new Date().toISOString().slice(0, 10);

      if (student?.streak_days > 0 && (stats.date !== today || (stats.todayMinutes || 0) < 5)) {
        showNotification(
          `Your ${student.streak_days}-day streak is at risk! 🔥`,
          'Study for just 5 minutes to keep your streak alive!',
          { tag: 'streak-reminder', url: '/tutor' }
        );
      }
    } catch (e) {}
  }

  // Public: trigger notifications from other parts of the app
  function onGoalReached(minutes) {
    if (!CONFIG.celebrateGoal) return;
    showNotification(
      'Daily Goal Reached! 🏆',
      `You studied ${minutes} minutes today. Amazing dedication!`,
      { tag: 'goal-reached' }
    );
  }

  function onStreakUpdate(days) {
    if (days > 0 && days % 7 === 0) {
      showNotification(
        `${days}-Day Streak! 🔥`,
        `You've been studying for ${days} days straight. Incredible!`,
        { tag: 'streak-milestone' }
      );
    }
  }

  function onXPMilestone(xp) {
    const milestones = [100, 250, 500, 1000, 2500, 5000, 10000];
    if (milestones.includes(xp)) {
      showNotification(
        `${xp} XP Milestone! ⭐`,
        'Your hard work is paying off. Keep learning!',
        { tag: 'xp-milestone' }
      );
    }
  }

  function onNewBadge(badgeName) {
    showNotification(
      `New Badge: ${badgeName} 🏅`,
      'Check your dashboard to see your new achievement!',
      { tag: 'new-badge', url: '/dashboard' }
    );
  }

  return {
    init,
    showNotification,
    onGoalReached,
    onStreakUpdate,
    onXPMilestone,
    onNewBadge,
    getPermission: () => permission,
  };
})();

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('ll_token')) {
    PushNotify.init();
  }
});
