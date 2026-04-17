(function () {
  if (typeof requireAuth === 'function' && !requireAuth()) return;
  if (typeof startSession === 'function') startSession();

  const student = typeof getStudent === 'function' ? getStudent() : null;
  const lang = student?.language || 'french';
  const cls = student?.class || 8;

  if (student) {
    document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';
    document.getElementById('navStreak').textContent = '🔥 ' + (student.current_streak || 0);
  }

  // Seed demo data if empty (so new users see the feature)
  seedDemoDataIfEmpty();

  loadWeaknessCards('all');
  loadSummaryStats();
  loadPeerComparisons();
  loadChallenges();
  loadWeeklyReport();

  function seedDemoDataIfEmpty() {
    const existing = WeaknessEngine.getAllWeaknesses();
    if (existing.length > 0) return;

    const demoScores = [
      { cat: 'grammar', topic: 'verb_conjugation', scores: [[3,10],[4,10],[3,10]] },
      { cat: 'grammar', topic: 'articles', scores: [[5,10],[6,10],[4,10]] },
      { cat: 'grammar', topic: 'tenses', scores: [[2,10],[3,10],[2,10]] },
      { cat: 'vocabulary', topic: 'thematic_words', scores: [[6,10],[5,10],[7,10]] },
      { cat: 'writing', topic: 'essay', scores: [[4,10],[5,10],[4,10]] },
      { cat: 'reading', topic: 'comprehension', scores: [[7,10],[6,10],[8,10]] },
      { cat: 'pronunciation', topic: 'basic_sounds', scores: [[5,10],[4,10],[5,10]] },
      { cat: 'grammar', topic: 'adjective_agreement', scores: [[8,10],[7,10],[9,10]] },
      { cat: 'vocabulary', topic: 'basic_words', scores: [[9,10],[8,10],[9,10]] },
      { cat: 'culture', topic: 'festivals', scores: [[8,10],[9,10],[8,10]] },
    ];
    demoScores.forEach(d => {
      d.scores.forEach(([s, t]) => WeaknessEngine.recordScore(d.cat, d.topic, s, t));
    });
  }

  window.filterWeakness = function (filter) {
    document.querySelectorAll('.wp-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    loadWeaknessCards(filter);
  };

  function loadWeaknessCards(filter) {
    const container = document.getElementById('weaknessCards');
    let weaknesses = WeaknessEngine.getAllWeaknesses();

    if (filter !== 'all') {
      weaknesses = weaknesses.filter(w => w.severity.level === filter);
    }

    if (!weaknesses.length) {
      container.innerHTML = filter === 'all'
        ? '<div class="no-data">🎉 No weak areas! You\'re doing great — keep practicing!</div>'
        : '<div class="no-data">No topics in this category</div>';
      return;
    }

    container.innerHTML = weaknesses.map(w => {
      const trendIcon = w.trend === 'improving' ? '📈' : w.trend === 'declining' ? '📉' : w.trend === 'new' ? '🆕' : '➡️';
      const trendLabel = w.trend === 'improving' ? 'Getting better!' : w.trend === 'declining' ? 'Needs attention' : w.trend === 'new' ? 'New topic' : 'Stable';
      return `
        <div class="wk-card ${w.severity.level}">
          <div class="wk-severity">${w.severity.icon}</div>
          <div class="wk-info">
            <div class="wk-topic">${w.topic.replace(/_/g, ' ')}</div>
            <div class="wk-category">${w.category} · ${w.severity.label}</div>
          </div>
          <div class="wk-meta">
            <div class="wk-trend ${w.trend}">
              <span>${trendIcon}</span>
              <span>${trendLabel}</span>
            </div>
            <div class="wk-score" style="color:${w.severity.color}">${w.accuracy}%</div>
            <button class="wk-action" onclick="startDrill('${w.category}','${w.topic}')">Practice Now</button>
          </div>
        </div>`;
    }).join('');
  }

  function loadSummaryStats() {
    const all = WeaknessEngine.getAllWeaknesses();
    const strengths = WeaknessEngine.getStrengths();
    const challenges = WeaknessEngine.getActiveChallenges();
    const drills = JSON.parse(localStorage.getItem('ll_drill_history') || '[]');

    document.getElementById('criticalCount').textContent = all.filter(w => w.accuracy < 40).length;
    document.getElementById('weakCount').textContent = all.filter(w => w.accuracy >= 40 && w.accuracy < 60).length;
    document.getElementById('strongCount').textContent = strengths.length;
    document.getElementById('drillsDone').textContent = drills.length;
    document.getElementById('badgesEarned').textContent = challenges.filter(c => c.completed).length;
  }

  function loadPeerComparisons() {
    const container = document.getElementById('peerComparisons');
    const weaknesses = WeaknessEngine.getTopWeaknesses(5);

    if (!weaknesses.length) {
      container.innerHTML = '<div class="no-data">Complete some quizzes to see peer comparisons</div>';
      return;
    }

    container.innerHTML = weaknesses.map(w => {
      const peer = WeaknessEngine.getPeerComparison(w.category, w.topic);
      if (!peer) return '';

      const peerPct = peer.percentStudentsStruggle;
      const youColor = w.accuracy >= peer.peerAverage ? '#22c55e' : '#f97316';
      const msg = peer.comparison === 'above'
        ? `You're doing better than average! Keep it up 💪`
        : peer.comparison === 'below'
          ? `${peerPct}% of students find this tough too — you're not alone! Practice more to get ahead 🚀`
          : `You're at the same level as most students. A little more practice will put you ahead! ⭐`;

      return `
        <div class="peer-card">
          <div class="peer-icon">${peer.comparison === 'above' ? '🌟' : peer.comparison === 'below' ? '💪' : '🤝'}</div>
          <div class="peer-info">
            <div class="peer-msg">${w.topic.replace(/_/g, ' ')} — ${w.category}</div>
            <div class="peer-sub">${msg}</div>
            <div class="peer-bar-wrap">
              <span class="peer-label" style="color:${youColor}">You: ${w.accuracy}%</span>
              <div class="peer-bar">
                <div class="peer-bar-avg" style="width:${peer.peerAverage}%;background:#94a3b8"></div>
                <div class="peer-bar-you" style="width:${w.accuracy}%;background:${youColor}"></div>
              </div>
              <span class="peer-label" style="color:#94a3b8">Avg: ${peer.peerAverage}%</span>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  window.loadExamPriority = function (examType) {
    const container = document.getElementById('examPriorityView');
    const prioritized = WeaknessEngine.getWeaknessExamPriority(lang, cls, examType);

    if (!prioritized.length) {
      container.innerHTML = '<div class="no-data">No syllabus data found for this exam. Make sure your language and class are set.</div>';
      return;
    }

    const examNames = { ut1: 'Unit Test 1', ut2: 'Unit Test 2', half_yearly: 'Half-Yearly', annual: 'Annual Exam' };
    let totalMarks = 0;
    let weakMarks = 0;

    container.innerHTML = `
      <div style="margin-bottom:1rem;padding:0.75rem 1rem;border-radius:12px;background:#eef0ff;font-weight:700;font-size:0.9rem">
        📋 ${examNames[examType]} — Topics ordered by YOUR weakness (weakest first = study these more!)
      </div>
      <div class="exam-priority-list">
        ${prioritized.map((t, i) => {
          totalMarks += t.marks;
          if (t.accuracy < 60) weakMarks += t.marks;
          const urgency = t.accuracy < 40 ? 'urgent' : t.accuracy < 60 ? 'focus' : '';
          const timeHint = t.accuracy < 40 ? '~20 min' : t.accuracy < 60 ? '~12 min' : t.accuracy < 75 ? '~8 min' : '~5 min (review)';
          return `
            <div class="ep-item ${urgency}">
              <div class="ep-rank ${t.severity.level}">${i + 1}</div>
              <div class="ep-topic">${t.name}</div>
              <div class="ep-marks">${t.marks} marks</div>
              <div class="ep-time">${timeHint}</div>
              <div class="wk-score" style="color:${t.severity.color};font-size:0.85rem">${t.accuracy}%</div>
            </div>`;
        }).join('')}
      </div>
      <div style="margin-top:1rem;padding:1rem;border-radius:12px;background:${weakMarks > totalMarks/2 ? '#fef2f2;border:1.5px solid #fecaca' : '#f0fdf4;border:1.5px solid #86efac'}">
        <span style="font-weight:900;font-size:0.9rem">
          ${weakMarks > totalMarks/2
            ? `⚠️ ${weakMarks} out of ${totalMarks} marks are in your weak areas — focus your study time here!`
            : `✅ Most of your marks (${totalMarks - weakMarks}/${totalMarks}) are in topics you know well. Great position!`}
        </span>
      </div>`;
  };

  function loadChallenges() {
    const container = document.getElementById('challengeGrid');
    const challenges = WeaknessEngine.getActiveChallenges();

    container.innerHTML = challenges.map(ch => `
      <div class="ch-card ${ch.completed ? 'completed' : ''}">
        ${ch.completed ? '<div class="ch-completed-tag">EARNED ✓</div>' : ''}
        <div class="ch-header">
          <div class="ch-icon">${ch.icon}</div>
          <div class="ch-name">${ch.name}</div>
          <div class="ch-xp">+${ch.xp} XP</div>
        </div>
        <div class="ch-desc">${ch.desc}</div>
        <div class="ch-progress-bar">
          <div class="ch-progress-fill" style="width:${ch.pct}%"></div>
        </div>
        <div class="ch-progress-text">${ch.progress}/${ch.target} (${ch.pct}%)</div>
      </div>
    `).join('');
  }

  function loadWeeklyReport() {
    const container = document.getElementById('weeklyReport');
    const report = WeaknessEngine.getWeeklyWeaknessReport();
    const hasData = report.improved.length || report.declined.length || report.newWeaknesses.length;

    if (!hasData) {
      container.innerHTML = '<div class="no-data">Practice for a week to see your progress report!</div>';
      return;
    }

    let html = '<div style="display:flex;flex-direction:column;gap:0.75rem">';

    if (report.improved.length) {
      html += `<div style="padding:1rem;border-radius:12px;background:#f0fdf4;border:1.5px solid #86efac">
        <div style="font-weight:900;color:#16a34a;margin-bottom:0.5rem">📈 Improving (${report.improved.length} topics)</div>
        ${report.improved.map(t => `<div style="font-size:0.9rem;font-weight:700;padding:0.3rem 0">✅ ${t.topic.replace(/_/g,' ')} — ${t.accuracy}% (${t.attempts} attempts this week)</div>`).join('')}
      </div>`;
    }

    if (report.declined.length) {
      html += `<div style="padding:1rem;border-radius:12px;background:#fef2f2;border:1.5px solid #fecaca">
        <div style="font-weight:900;color:#dc2626;margin-bottom:0.5rem">📉 Needs More Practice (${report.declined.length} topics)</div>
        ${report.declined.map(t => `<div style="font-size:0.9rem;font-weight:700;padding:0.3rem 0">⚠️ ${t.topic.replace(/_/g,' ')} — ${t.accuracy}% (practice more!)</div>`).join('')}
      </div>`;
    }

    if (report.newWeaknesses.length) {
      html += `<div style="padding:1rem;border-radius:12px;background:#fff7ed;border:1.5px solid #fed7aa">
        <div style="font-weight:900;color:#ea580c;margin-bottom:0.5rem">🆕 New Weak Areas Found (${report.newWeaknesses.length})</div>
        ${report.newWeaknesses.map(t => `<div style="font-size:0.9rem;font-weight:700;padding:0.3rem 0">🟠 ${t.topic.replace(/_/g,' ')} — ${t.accuracy}%</div>`).join('')}
      </div>`;
    }

    html += '</div>';
    container.innerHTML = html;
  }

  // === Feature 2: AI-Powered Drills ===
  let currentDrill = { questions: [], current: 0, score: 0, topic: '', category: '' };

  window.startDrill = function (category, topic) {
    currentDrill = {
      questions: WeaknessEngine.generateDrillQuestions(lang, category, topic, 10),
      current: 0,
      score: 0,
      topic,
      category
    };
    document.getElementById('drillTitle').textContent = `${topic.replace(/_/g, ' ')} — ${category} Drill`;
    document.getElementById('drillOverlay').classList.add('active');
    showDrillQuestion();

    if (typeof RobotTutor !== 'undefined') RobotTutor.onQuiz();
  };

  window.startSmartDrill = function () {
    const top = WeaknessEngine.getTopWeaknesses(1);
    if (top.length) {
      startDrill(top[0].category, top[0].topic);
    } else {
      alert('No weak areas detected yet! Complete some quizzes first.');
    }
  };

  window.closeDrill = function () {
    document.getElementById('drillOverlay').classList.remove('active');
    loadWeaknessCards('all');
    loadSummaryStats();
    loadChallenges();
  };

  function showDrillQuestion() {
    const q = currentDrill.questions[currentDrill.current];
    if (!q) { showDrillResult(); return; }

    const pct = ((currentDrill.current) / currentDrill.questions.length) * 100;
    document.getElementById('drillProgressFill').style.width = pct + '%';
    document.getElementById('drillCount').textContent = `Question ${currentDrill.current + 1} of ${currentDrill.questions.length}`;

    const content = document.getElementById('drillContent');
    const actions = document.getElementById('drillActions');

    if (q.type === 'mcq') {
      const options = generateMCQOptions(q);
      content.innerHTML = `
        <div class="drill-question">
          <div class="drill-q-type">${q.type.toUpperCase()} · ${q.difficulty}</div>
          <div class="drill-q-text">${q.prompt}</div>
        </div>
        <div class="drill-options">
          ${options.map((opt, i) => `<div class="drill-option" onclick="selectOption(this, ${i})" data-correct="${opt.correct ? 1 : 0}">${opt.text}</div>`).join('')}
        </div>`;
      actions.innerHTML = `<button class="drill-btn drill-btn-primary" onclick="checkMCQ()">Check Answer</button>`;
    } else {
      content.innerHTML = `
        <div class="drill-question">
          <div class="drill-q-type">${q.type.toUpperCase()} · ${q.difficulty}</div>
          <div class="drill-q-text">${q.prompt}</div>
        </div>
        <textarea class="drill-input" id="drillAnswer" rows="3" placeholder="Type your answer here..."></textarea>`;
      actions.innerHTML = `<button class="drill-btn drill-btn-primary" onclick="submitTextAnswer()">Submit Answer</button>`;
    }
  }

  function generateMCQOptions(q) {
    const options = [
      { text: `Correct answer for ${q.topic.replace(/_/g, ' ')}`, correct: true },
      { text: `Close but incorrect option A`, correct: false },
      { text: `Incorrect option B`, correct: false },
      { text: `Incorrect option C`, correct: false },
    ];
    return options.sort(() => Math.random() - 0.5);
  }

  window.selectOption = function (el, idx) {
    document.querySelectorAll('.drill-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
  };

  window.checkMCQ = function () {
    const selected = document.querySelector('.drill-option.selected');
    if (!selected) { alert('Please select an answer!'); return; }

    const isCorrect = selected.dataset.correct === '1';
    document.querySelectorAll('.drill-option').forEach(o => {
      if (o.dataset.correct === '1') o.classList.add('correct');
      else if (o.classList.contains('selected')) o.classList.add('wrong');
    });

    if (isCorrect) {
      currentDrill.score++;
      if (typeof RobotTutor !== 'undefined') RobotTutor.onCorrectAnswer();
    } else {
      if (typeof RobotTutor !== 'undefined') RobotTutor.onWrongAnswer();
    }

    document.getElementById('drillActions').innerHTML = `<button class="drill-btn drill-btn-primary" onclick="nextDrillQuestion()">Next →</button>`;
  };

  window.submitTextAnswer = function () {
    const answer = document.getElementById('drillAnswer')?.value?.trim();
    if (!answer) { alert('Please type your answer!'); return; }

    // For text answers, auto-score based on length/effort (real scoring would use AI)
    const hasContent = answer.length > 10;
    if (hasContent) currentDrill.score++;

    const content = document.getElementById('drillContent');
    content.innerHTML += `<div style="padding:1rem;border-radius:12px;margin-top:0.5rem;background:${hasContent ? '#f0fdf4' : '#fef2f2'};border:1.5px solid ${hasContent ? '#86efac' : '#fecaca'}">
      <div style="font-weight:800;font-size:0.9rem">${hasContent ? '✅ Good attempt! Keep practicing.' : '⚠️ Try writing a more detailed answer next time.'}</div>
    </div>`;

    if (hasContent && typeof RobotTutor !== 'undefined') RobotTutor.onCorrectAnswer();
    else if (typeof RobotTutor !== 'undefined') RobotTutor.onWrongAnswer();

    document.getElementById('drillActions').innerHTML = `<button class="drill-btn drill-btn-primary" onclick="nextDrillQuestion()">Next →</button>`;
  };

  window.nextDrillQuestion = function () {
    currentDrill.current++;
    showDrillQuestion();
  };

  function showDrillResult() {
    const pct = Math.round((currentDrill.score / currentDrill.questions.length) * 100);
    const content = document.getElementById('drillContent');
    const actions = document.getElementById('drillActions');

    document.getElementById('drillProgressFill').style.width = '100%';
    document.getElementById('drillCount').textContent = 'Drill Complete!';

    WeaknessEngine.recordDrill(
      `${currentDrill.category}_${currentDrill.topic}`,
      currentDrill.score,
      currentDrill.questions.length
    );

    const msgs = {
      low: { text: 'Keep practicing! Every attempt makes you stronger 💪', color: '#dc2626' },
      mid: { text: 'Good progress! You\'re getting better 📈', color: '#f97316' },
      high: { text: 'Excellent work! Almost mastered this topic 🌟', color: '#22c55e' },
      perfect: { text: 'PERFECT SCORE! You\'ve conquered this weakness! 🏆', color: '#5b5ef4' }
    };
    const level = pct === 100 ? 'perfect' : pct >= 70 ? 'high' : pct >= 40 ? 'mid' : 'low';
    const msg = msgs[level];

    content.innerHTML = `
      <div class="drill-result">
        <div class="drill-result-score" style="color:${msg.color}">${pct}%</div>
        <div class="drill-result-msg">${msg.text}</div>
        <div style="font-size:0.9rem;color:#64748b;margin-bottom:1rem">
          ${currentDrill.score}/${currentDrill.questions.length} correct
        </div>
        <div style="display:inline-block;padding:0.5rem 1rem;border-radius:12px;background:#eef0ff;font-weight:800;font-size:0.85rem;color:#5b5ef4">
          +${currentDrill.score * 5} XP earned from this drill
        </div>
      </div>`;

    actions.innerHTML = `
      <button class="drill-btn drill-btn-secondary" onclick="closeDrill()">Back to Dashboard</button>
      <button class="drill-btn drill-btn-primary" onclick="startDrill('${currentDrill.category}','${currentDrill.topic}')">Try Again</button>
    `;

    if (pct >= 80 && typeof RobotTutor !== 'undefined') RobotTutor.onCelebrate();
    else if (typeof RobotTutor !== 'undefined') RobotTutor.onTalking();
  }
})();
