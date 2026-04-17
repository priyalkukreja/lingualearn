/**
 * Weakness Detection & Targeted Practice Engine
 * Features: weakness tracking, drills, peer comparison, gamified challenges
 */

const WeaknessEngine = (() => {
  const STORAGE_KEY = 'll_weakness_data';
  const CHALLENGES_KEY = 'll_weakness_challenges';
  const DRILLS_KEY = 'll_drill_history';

  const SEVERITY = {
    critical: { min: 0, max: 39, color: '#dc2626', bg: '#fef2f2', label: 'Needs Urgent Practice', icon: '🔴' },
    weak:     { min: 40, max: 59, color: '#f97316', bg: '#fff7ed', label: 'Improving', icon: '🟠' },
    average:  { min: 60, max: 74, color: '#eab308', bg: '#fefce8', label: 'Almost There', icon: '🟡' },
    strong:   { min: 75, max: 89, color: '#22c55e', bg: '#f0fdf4', label: 'Good', icon: '🟢' },
    master:   { min: 90, max: 100, color: '#5b5ef4', bg: '#eef0ff', label: 'Mastered', icon: '💎' }
  };

  // Simulated peer data (anonymized averages per topic)
  const PEER_DIFFICULTY = {
    grammar: { articles: 62, verbs: 55, tenses: 48, pronouns: 65, adjectives: 58, negation: 70, prepositions: 60, cases: 45 },
    vocabulary: { basic: 75, thematic: 60, idioms: 42, expressions: 55 },
    writing: { essay: 50, letter: 58, dialogue: 62, paragraph: 68, story: 45, grammar_writing: 55 },
    reading: { comprehension: 65, inference: 48, mcq: 72 },
    pronunciation: { basic: 60, advanced: 40, tones: 35 },
    culture: { festivals: 70, geography: 55, traditions: 60 }
  };

  const CHALLENGE_BADGES = [
    { id: 'weakness_warrior', name: 'Weakness Warrior', desc: 'Score 80%+ on a weak topic 3 times', icon: '⚔️', xp: 100 },
    { id: 'comeback_king', name: 'Comeback King', desc: 'Improve a critical topic to strong', icon: '👑', xp: 200 },
    { id: 'drill_master', name: 'Drill Master', desc: 'Complete 50 weakness drills', icon: '🎯', xp: 150 },
    { id: 'perfect_drill', name: 'Perfect Drill', desc: 'Score 100% on a weakness drill', icon: '💯', xp: 75 },
    { id: 'streak_fixer', name: 'Streak Fixer', desc: '5-day streak of weakness practice', icon: '🔥', xp: 120 },
    { id: 'all_clear', name: 'All Clear', desc: 'No more critical weak areas', icon: '✨', xp: 250 }
  ];

  function getData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  }
  function saveData(d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }

  function getChallenges() {
    try { return JSON.parse(localStorage.getItem(CHALLENGES_KEY)) || {}; } catch { return {}; }
  }
  function saveChallenges(c) { localStorage.setItem(CHALLENGES_KEY, JSON.stringify(c)); }

  function getDrills() {
    try { return JSON.parse(localStorage.getItem(DRILLS_KEY)) || []; } catch { return []; }
  }
  function saveDrills(d) { localStorage.setItem(DRILLS_KEY, JSON.stringify(d)); }

  function getSeverity(accuracy) {
    for (const [key, s] of Object.entries(SEVERITY)) {
      if (accuracy >= s.min && accuracy <= s.max) return { level: key, ...s };
    }
    return SEVERITY.average;
  }

  function recordScore(category, topic, score, total) {
    const data = getData();
    const key = `${category}_${topic}`;
    if (!data[key]) data[key] = { category, topic, scores: [], totalAttempts: 0, totalCorrect: 0, history: [] };

    data[key].scores.push(score);
    data[key].totalAttempts += total;
    data[key].totalCorrect += score;
    data[key].history.push({ date: new Date().toISOString(), score, total, pct: Math.round((score / total) * 100) });

    if (data[key].scores.length > 20) data[key].scores = data[key].scores.slice(-20);
    if (data[key].history.length > 30) data[key].history = data[key].history.slice(-30);

    saveData(data);
    checkChallengeProgress(key, Math.round((score / total) * 100));
    return getSeverity(getAccuracy(key));
  }

  function getAccuracy(key) {
    const data = getData();
    if (!data[key] || !data[key].scores.length) return 0;
    const recent = data[key].scores.slice(-5);
    return Math.round(recent.reduce((a, b) => a + b, 0) / recent.length);
  }

  function getAllWeaknesses() {
    const data = getData();
    const weaknesses = [];
    for (const [key, val] of Object.entries(data)) {
      const acc = getAccuracy(key);
      const sev = getSeverity(acc);
      if (acc < 75) {
        const trend = getTrend(val.history);
        weaknesses.push({
          key,
          category: val.category,
          topic: val.topic,
          accuracy: acc,
          severity: sev,
          trend,
          attempts: val.totalAttempts,
          lastPracticed: val.history.length ? val.history[val.history.length - 1].date : null
        });
      }
    }
    return weaknesses.sort((a, b) => a.accuracy - b.accuracy);
  }

  function getTopWeaknesses(count = 5) {
    return getAllWeaknesses().slice(0, count);
  }

  function getStrengths() {
    const data = getData();
    const strengths = [];
    for (const [key, val] of Object.entries(data)) {
      const acc = getAccuracy(key);
      if (acc >= 75) {
        strengths.push({ key, category: val.category, topic: val.topic, accuracy: acc, severity: getSeverity(acc) });
      }
    }
    return strengths.sort((a, b) => b.accuracy - a.accuracy);
  }

  function getTrend(history) {
    if (!history || history.length < 2) return 'new';
    const recent = history.slice(-3);
    const older = history.slice(-6, -3);
    if (!older.length) return 'new';
    const recentAvg = recent.reduce((a, b) => a + b.pct, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b.pct, 0) / older.length;
    if (recentAvg > olderAvg + 5) return 'improving';
    if (recentAvg < olderAvg - 5) return 'declining';
    return 'stable';
  }

  function getPeerComparison(category, topic) {
    const catData = PEER_DIFFICULTY[category];
    if (!catData) return null;
    let peerAvg = null;
    for (const [key, val] of Object.entries(catData)) {
      if (topic.toLowerCase().includes(key)) { peerAvg = val; break; }
    }
    if (!peerAvg) {
      const vals = Object.values(catData);
      peerAvg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    }
    const studentAcc = getAccuracy(`${category}_${topic}`);
    return {
      peerAverage: peerAvg,
      studentScore: studentAcc,
      percentStudentsStruggle: 100 - peerAvg,
      comparison: studentAcc > peerAvg ? 'above' : studentAcc < peerAvg - 10 ? 'below' : 'similar'
    };
  }

  function getWeaknessExamPriority(language, cls, examType) {
    if (typeof getExamTopics !== 'function') return [];
    const examTopics = getExamTopics(language, cls, examType);
    const data = getData();

    const prioritized = examTopics.map(topic => {
      let matchKey = null;
      let bestMatch = 0;
      for (const key of Object.keys(data)) {
        const topicLower = topic.name.toLowerCase();
        const keyLower = key.toLowerCase();
        const words = topicLower.split(/[\s()—,]+/).filter(w => w.length > 2);
        const matchCount = words.filter(w => keyLower.includes(w)).length;
        if (matchCount > bestMatch) { bestMatch = matchCount; matchKey = key; }
      }

      const acc = matchKey ? getAccuracy(matchKey) : 50;
      const sev = getSeverity(acc);
      return { ...topic, accuracy: acc, severity: sev, priority: 100 - acc, matchKey };
    });

    return prioritized.sort((a, b) => b.priority - a.priority);
  }

  function generateDrillPlan(weaknesses) {
    const plan = { urgent: [], focus: [], review: [], totalTime: 0 };
    weaknesses.forEach(w => {
      const item = {
        topic: w.topic,
        category: w.category,
        accuracy: w.accuracy,
        suggestedQuestions: w.accuracy < 40 ? 15 : w.accuracy < 60 ? 10 : 5,
        estimatedMinutes: w.accuracy < 40 ? 20 : w.accuracy < 60 ? 12 : 8,
        drillType: w.accuracy < 40 ? 'basics' : w.accuracy < 60 ? 'practice' : 'challenge'
      };
      plan.totalTime += item.estimatedMinutes;
      if (w.accuracy < 40) plan.urgent.push(item);
      else if (w.accuracy < 60) plan.focus.push(item);
      else plan.review.push(item);
    });
    return plan;
  }

  // --- Gamified Challenges ---
  function checkChallengeProgress(topicKey, scorePct) {
    const challenges = getChallenges();
    const data = getData();
    const earned = [];

    // Weakness Warrior: 80%+ on weak topic 3 times
    if (scorePct >= 80 && data[topicKey]) {
      const recent = (data[topicKey].history || []).slice(-5);
      const highScores = recent.filter(h => h.pct >= 80).length;
      if (highScores >= 3 && !challenges.weakness_warrior?.[topicKey]) {
        if (!challenges.weakness_warrior) challenges.weakness_warrior = {};
        challenges.weakness_warrior[topicKey] = new Date().toISOString();
        earned.push(CHALLENGE_BADGES.find(b => b.id === 'weakness_warrior'));
      }
    }

    // Perfect Drill
    if (scorePct === 100 && !challenges.perfect_drill) {
      challenges.perfect_drill = new Date().toISOString();
      earned.push(CHALLENGE_BADGES.find(b => b.id === 'perfect_drill'));
    }

    // All Clear
    const allWeak = getAllWeaknesses().filter(w => w.accuracy < 40);
    if (allWeak.length === 0 && Object.keys(data).length >= 3 && !challenges.all_clear) {
      challenges.all_clear = new Date().toISOString();
      earned.push(CHALLENGE_BADGES.find(b => b.id === 'all_clear'));
    }

    // Drill Master
    const drills = getDrills();
    if (drills.length >= 50 && !challenges.drill_master) {
      challenges.drill_master = new Date().toISOString();
      earned.push(CHALLENGE_BADGES.find(b => b.id === 'drill_master'));
    }

    saveChallenges(challenges);

    earned.forEach(badge => {
      if (badge) showBadgePopup(badge);
    });
    return earned;
  }

  function recordDrill(topic, score, total) {
    const drills = getDrills();
    drills.push({ topic, score, total, date: new Date().toISOString() });
    saveDrills(drills);
    return recordScore(topic.split('_')[0] || 'general', topic, score, total);
  }

  function getActiveChallenges() {
    const challenges = getChallenges();
    const drills = getDrills();
    const weaknesses = getAllWeaknesses();

    return CHALLENGE_BADGES.map(badge => {
      let progress = 0, target = 1, completed = false;

      switch (badge.id) {
        case 'weakness_warrior': {
          const topics = Object.keys(challenges.weakness_warrior || {});
          progress = topics.length;
          target = 1;
          completed = progress >= target;
          break;
        }
        case 'comeback_king': {
          completed = !!challenges.comeback_king;
          progress = completed ? 1 : 0;
          break;
        }
        case 'drill_master': {
          progress = drills.length;
          target = 50;
          completed = progress >= target;
          break;
        }
        case 'perfect_drill': {
          completed = !!challenges.perfect_drill;
          progress = completed ? 1 : 0;
          break;
        }
        case 'streak_fixer': {
          const days = new Set(drills.map(d => d.date.split('T')[0]));
          const sorted = [...days].sort().reverse();
          let streak = 0;
          const today = new Date().toISOString().split('T')[0];
          for (let i = 0; i < sorted.length; i++) {
            const expected = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
            if (sorted[i] === expected) streak++;
            else break;
          }
          progress = streak;
          target = 5;
          completed = streak >= 5;
          break;
        }
        case 'all_clear': {
          const critical = weaknesses.filter(w => w.accuracy < 40);
          progress = critical.length === 0 ? 1 : 0;
          completed = !!challenges.all_clear;
          break;
        }
      }

      return { ...badge, progress, target, completed, pct: Math.min(100, Math.round((progress / target) * 100)) };
    });
  }

  function getWeeklyWeaknessReport() {
    const data = getData();
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    const report = { improved: [], declined: [], unchanged: [], newWeaknesses: [] };

    for (const [key, val] of Object.entries(data)) {
      const recentHistory = val.history.filter(h => h.date >= weekAgo);
      if (!recentHistory.length) continue;

      const currentAcc = getAccuracy(key);
      const trend = getTrend(val.history);
      const item = { key, category: val.category, topic: val.topic, accuracy: currentAcc, trend, attempts: recentHistory.length };

      if (trend === 'improving') report.improved.push(item);
      else if (trend === 'declining') report.declined.push(item);
      else if (trend === 'new' && currentAcc < 60) report.newWeaknesses.push(item);
      else report.unchanged.push(item);
    }
    return report;
  }

  function showBadgePopup(badge) {
    const popup = document.createElement('div');
    popup.className = 'badge-popup';
    popup.innerHTML = `
      <div class="badge-popup-inner">
        <div class="badge-popup-icon">${badge.icon}</div>
        <div class="badge-popup-title">Badge Earned!</div>
        <div class="badge-popup-name">${badge.name}</div>
        <div class="badge-popup-desc">${badge.desc}</div>
        <div class="badge-popup-xp">+${badge.xp} XP</div>
      </div>
    `;
    document.body.appendChild(popup);
    requestAnimationFrame(() => popup.classList.add('show'));
    setTimeout(() => { popup.classList.remove('show'); setTimeout(() => popup.remove(), 500); }, 4000);

    if (typeof RobotTutor !== 'undefined') RobotTutor.onCelebrate();
    const student = typeof getStudent === 'function' ? getStudent() : null;
    if (student) {
      student.total_xp = (student.total_xp || 0) + badge.xp;
      localStorage.setItem('ll_student', JSON.stringify(student));
    }
  }

  // --- Drill Question Generator ---
  function generateDrillQuestions(language, category, topic, count = 10) {
    const templates = {
      grammar: {
        fill: (t) => ({ type: 'fill', prompt: `Fill in the blank with the correct form of ${t}:`, difficulty: 'medium' }),
        choose: (t) => ({ type: 'mcq', prompt: `Choose the correct ${t}:`, difficulty: 'easy' }),
        transform: (t) => ({ type: 'transform', prompt: `Transform the sentence using ${t}:`, difficulty: 'hard' }),
        error: (t) => ({ type: 'error', prompt: `Find and correct the error related to ${t}:`, difficulty: 'medium' })
      },
      vocabulary: {
        match: (t) => ({ type: 'match', prompt: `Match the ${t} word to its meaning:`, difficulty: 'easy' }),
        use: (t) => ({ type: 'sentence', prompt: `Use the following ${t} word in a sentence:`, difficulty: 'hard' }),
        fill: (t) => ({ type: 'fill', prompt: `Fill the blank with the correct ${t} word:`, difficulty: 'medium' })
      },
      writing: {
        practice: (t) => ({ type: 'write', prompt: `Write a short ${t} (50-80 words):`, difficulty: 'hard' }),
        outline: (t) => ({ type: 'outline', prompt: `Create an outline for a ${t}:`, difficulty: 'medium' })
      },
      reading: {
        comprehension: (t) => ({ type: 'read', prompt: `Read the passage and answer questions about ${t}:`, difficulty: 'medium' })
      }
    };

    const catTemplates = templates[category] || templates.grammar;
    const keys = Object.keys(catTemplates);
    const questions = [];
    for (let i = 0; i < count; i++) {
      const tKey = keys[i % keys.length];
      questions.push({ id: i + 1, ...catTemplates[tKey](topic), topic, category });
    }
    return questions;
  }

  return {
    recordScore,
    getAccuracy,
    getAllWeaknesses,
    getTopWeaknesses,
    getStrengths,
    getSeverity,
    getPeerComparison,
    getWeaknessExamPriority,
    generateDrillPlan,
    generateDrillQuestions,
    recordDrill,
    getActiveChallenges,
    getWeeklyWeaknessReport,
    checkChallengeProgress,
    SEVERITY,
    CHALLENGE_BADGES
  };
})();
