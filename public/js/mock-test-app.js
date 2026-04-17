(function () {
  if (typeof requireAuth === 'function' && !requireAuth()) return;
  if (typeof startSession === 'function') startSession();

  const student = typeof getStudent === 'function' ? getStudent() : null;
  const lang = student?.language || 'french';
  const cls = student?.class || 8;
  if (student) document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';

  let selectedExam = 'ut1';
  let testData = null;
  let answers = {};
  let timerInterval = null;
  let timeLeft = 0;

  // CBSE actual exam durations
  const EXAM_DURATIONS = {
    ut1:         { total: 40, label: '40 minutes', sections: { mcq: 10, short: 15, long: 15 } },
    ut2:         { total: 40, label: '40 minutes', sections: { mcq: 10, short: 15, long: 15 } },
    half_yearly: { total: 90, label: '1 hour 30 minutes', sections: { mcq: 15, short: 30, long: 45 } },
    annual:      { total: 180, label: '3 hours', sections: { mcq: 20, short: 50, long: 70, reading: 20, writing: 20 } }
  };

  let sectionTimers = {};
  let currentSection = null;

  window.selectExam = function (el, type) {
    document.querySelectorAll('.mt-opt').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
    selectedExam = type;

    // Auto-set duration based on CBSE exam type
    const dur = EXAM_DURATIONS[type];
    const sel = document.getElementById('timeLimit');
    sel.value = String(dur.total);
    // If exact value not in dropdown, find nearest
    if (sel.value !== String(dur.total)) {
      const opt = document.createElement('option');
      opt.value = dur.total;
      opt.textContent = `${dur.label} (CBSE Standard)`;
      opt.selected = true;
      sel.appendChild(opt);
    }

    // Show section time breakdown
    let info = document.getElementById('sectionTimeInfo');
    if (!info) {
      info = document.createElement('div');
      info.id = 'sectionTimeInfo';
      info.style.cssText = 'margin-top:0.75rem;padding:0.75rem 1rem;border-radius:12px;background:#eef0ff;font-size:0.82rem;font-weight:700;color:#5b5ef4';
      document.getElementById('timeLimit').parentElement.appendChild(info);
    }
    const parts = Object.entries(dur.sections).map(([s, m]) => `${s.charAt(0).toUpperCase() + s.slice(1)}: ${m} min`);
    info.innerHTML = `⏱️ CBSE ${type.replace('_', ' ').toUpperCase()} = ${dur.label}<br>Suggested per section: ${parts.join(' · ')}`;
  };

  window.generateTest = async function () {
    const difficulty = document.getElementById('difficulty').value;
    const focusWeak = document.getElementById('focusWeak').value;
    const timeMins = parseInt(document.getElementById('timeLimit').value);

    document.getElementById('loadingOverlay').style.display = 'flex';

    // Try API first
    const data = await apiPost('/api/exam/mock-test', { examType: selectedExam, difficulty, focusWeak });

    if (data?.test?.mcqs) {
      testData = data.test;
    } else {
      // Fallback: generate locally
      testData = generateLocalTest(selectedExam, difficulty, focusWeak, timeMins);
    }

    testData.timeMinutes = timeMins;
    document.getElementById('loadingOverlay').style.display = 'none';
    startTest();
  };

  function generateLocalTest(examType, difficulty, focusWeak, timeMins) {
    const langNames = { french:'French', german:'German', sanskrit:'Sanskrit', spanish:'Spanish', japanese:'Japanese', korean:'Korean', mandarin:'Mandarin', russian:'Russian' };
    const langName = langNames[lang] || lang;
    const syllabus = typeof getSyllabus === 'function' ? getSyllabus(lang, cls) : null;

    const weakTopics = typeof WeaknessEngine !== 'undefined' ? WeaknessEngine.getTopWeaknesses(3).map(w => w.topic) : [];

    const mcqs = [];
    for (let i = 0; i < 10; i++) {
      const isWeak = focusWeak === 'yes' && i < 4 && weakTopics[i % weakTopics.length];
      const topic = isWeak ? weakTopics[i % weakTopics.length] : `${langName} Topic ${i + 1}`;
      mcqs.push({
        q: `[${langName} Class ${cls}] Question ${i + 1} on ${topic.replace(/_/g, ' ')}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: Math.floor(Math.random() * 4),
        skill: topic,
        marks: 1
      });
    }

    const shortAnswers = [];
    for (let i = 0; i < 5; i++) {
      shortAnswers.push({
        q: `[${langName}] Short answer question ${i + 1} — Write your answer in ${langName}`,
        expectedAnswer: `Expected answer for question ${i + 1}`,
        marks: 2
      });
    }

    const longAnswers = [];
    for (let i = 0; i < 2; i++) {
      longAnswers.push({
        q: `[${langName}] Write a detailed answer (80-100 words) on topic ${i + 1}`,
        rubric: 'Content: 2, Language: 1.5, Organization: 1, Accuracy: 0.5',
        marks: 5
      });
    }

    return { mcqs, shortAnswers, longAnswers, totalMarks: 30, timeMinutes: timeMins };
  }

  function startTest() {
    document.getElementById('setupScreen').style.display = 'none';
    document.getElementById('testScreen').style.display = 'block';
    answers = {};

    const examNames = { ut1: 'Unit Test 1', ut2: 'Unit Test 2', half_yearly: 'Half-Yearly', annual: 'Annual Exam' };
    document.getElementById('testTitle').textContent = `${examNames[selectedExam]} — Mock Test`;

    const total = (testData.mcqs?.length || 0) + (testData.shortAnswers?.length || 0) + (testData.longAnswers?.length || 0);
    document.getElementById('totalCount').textContent = total;

    renderSections();
    startTimer(testData.timeMinutes || 45);
  }

  function renderSections() {
    const container = document.getElementById('testSections');
    let html = '';
    let qNum = 0;

    // Section A: MCQs
    if (testData.mcqs?.length) {
      const sectionMarks = testData.mcqs.reduce((s, q) => s + (q.marks || 1), 0);
      html += `<div class="mt-section">
        <div class="mt-section-header">
          <div>📘</div>
          <div class="mt-section-title">Section A — Multiple Choice Questions</div>
          <div class="mt-section-marks">${sectionMarks} marks</div>
        </div>`;

      testData.mcqs.forEach((q, i) => {
        qNum++;
        const letters = ['A', 'B', 'C', 'D'];
        html += `<div class="mt-question" id="q${qNum}">
          <div class="mt-q-header">
            <div class="mt-q-num">${qNum}</div>
            <div class="mt-q-marks">${q.marks || 1} mark</div>
          </div>
          <div class="mt-q-text">${q.q}</div>
          <div class="mt-options">
            ${(q.options || []).map((opt, oi) => `
              <div class="mt-option" onclick="selectMCQ(${qNum},'mcq_${i}',${oi})">
                <div class="mt-option-letter">${letters[oi]}</div>
                <span>${opt}</span>
              </div>
            `).join('')}
          </div>
        </div>`;
      });
      html += '</div>';
    }

    // Section B: Short Answers
    if (testData.shortAnswers?.length) {
      const sectionMarks = testData.shortAnswers.reduce((s, q) => s + (q.marks || 2), 0);
      html += `<div class="mt-section">
        <div class="mt-section-header">
          <div>📗</div>
          <div class="mt-section-title">Section B — Short Answer Questions</div>
          <div class="mt-section-marks">${sectionMarks} marks</div>
        </div>`;

      testData.shortAnswers.forEach((q, i) => {
        qNum++;
        html += `<div class="mt-question" id="q${qNum}">
          <div class="mt-q-header">
            <div class="mt-q-num">${qNum}</div>
            <div class="mt-q-marks">${q.marks || 2} marks</div>
          </div>
          <div class="mt-q-text">${q.q}</div>
          <textarea class="mt-textarea" placeholder="Write your answer here..." oninput="saveText(${qNum},'short_${i}',this.value)"></textarea>
        </div>`;
      });
      html += '</div>';
    }

    // Section C: Long Answers
    if (testData.longAnswers?.length) {
      const sectionMarks = testData.longAnswers.reduce((s, q) => s + (q.marks || 5), 0);
      html += `<div class="mt-section">
        <div class="mt-section-header">
          <div>📕</div>
          <div class="mt-section-title">Section C — Long Answer Questions</div>
          <div class="mt-section-marks">${sectionMarks} marks</div>
        </div>`;

      testData.longAnswers.forEach((q, i) => {
        qNum++;
        html += `<div class="mt-question" id="q${qNum}">
          <div class="mt-q-header">
            <div class="mt-q-num">${qNum}</div>
            <div class="mt-q-marks">${q.marks || 5} marks</div>
          </div>
          <div class="mt-q-text">${q.q}</div>
          <textarea class="mt-textarea long" placeholder="Write a detailed answer (80-100 words)..." oninput="saveText(${qNum},'long_${i}',this.value)"></textarea>
        </div>`;
      });
      html += '</div>';
    }

    container.innerHTML = html;
  }

  window.selectMCQ = function (qNum, key, optIdx) {
    answers[key] = optIdx;
    const qEl = document.getElementById('q' + qNum);
    qEl.querySelectorAll('.mt-option').forEach((o, i) => {
      o.classList.toggle('selected', i === optIdx);
    });
    qEl.classList.add('answered');
    updateProgress();
  };

  window.saveText = function (qNum, key, val) {
    if (val.trim()) {
      answers[key] = val;
      document.getElementById('q' + qNum).classList.add('answered');
    } else {
      delete answers[key];
      document.getElementById('q' + qNum).classList.remove('answered');
    }
    updateProgress();
  };

  function updateProgress() {
    const total = (testData.mcqs?.length || 0) + (testData.shortAnswers?.length || 0) + (testData.longAnswers?.length || 0);
    const answered = Object.keys(answers).length;
    document.getElementById('answeredCount').textContent = answered;
    document.getElementById('testProgressFill').style.width = ((answered / total) * 100) + '%';
    document.getElementById('submitInfo').textContent = answered === total
      ? '✅ All questions answered — ready to submit!'
      : `${total - answered} question(s) remaining`;
  }

  function startTimer(minutes) {
    timeLeft = minutes * 60;
    const timerEl = document.getElementById('testTimer');

    // Section time tracking
    const dur = EXAM_DURATIONS[selectedExam];
    sectionTimers = {};
    for (const [sec, mins] of Object.entries(dur.sections)) {
      sectionTimers[sec] = { allocated: mins * 60, spent: 0 };
    }
    currentSection = Object.keys(dur.sections)[0];

    timerInterval = setInterval(() => {
      timeLeft--;

      // Track which section user is viewing
      const sections = document.querySelectorAll('.mt-section');
      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          const secName = i === 0 ? 'mcq' : i === 1 ? 'short' : 'long';
          if (sectionTimers[secName]) {
            sectionTimers[secName].spent++;
            currentSection = secName;
          }
        }
      });

      const m = Math.floor(timeLeft / 60);
      const s = timeLeft % 60;
      timerEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;

      // Time management alerts
      if (currentSection && sectionTimers[currentSection]) {
        const st = sectionTimers[currentSection];
        if (st.spent === st.allocated) {
          showTimeAlert(`⏰ Suggested time for ${currentSection.toUpperCase()} section is up! Move to the next section.`);
        }
      }

      if (timeLeft <= 300) timerEl.className = 'mt-timer danger';
      else if (timeLeft <= 600) timerEl.className = 'mt-timer warning';

      // Update section time indicators
      updateSectionTimeIndicators();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('⏰ Time\'s up! Submitting your test automatically.');
        submitTest();
      }
    }, 1000);
  }

  function showTimeAlert(msg) {
    const alert = document.createElement('div');
    alert.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#fff7ed;border:2px solid #fed7aa;padding:0.75rem 1.5rem;border-radius:14px;font-weight:800;font-size:0.85rem;color:#ea580c;z-index:100;animation:slideDown 0.3s ease;box-shadow:0 8px 24px rgba(0,0,0,0.1)';
    alert.textContent = msg;
    document.body.appendChild(alert);
    setTimeout(() => { alert.style.opacity = '0'; alert.style.transition = 'opacity 0.5s'; setTimeout(() => alert.remove(), 500); }, 4000);
  }

  function updateSectionTimeIndicators() {
    document.querySelectorAll('.mt-section-time-tag').forEach(el => el.remove());
    document.querySelectorAll('.mt-section-header').forEach((header, i) => {
      const secName = i === 0 ? 'mcq' : i === 1 ? 'short' : 'long';
      const st = sectionTimers[secName];
      if (!st) return;
      const spentMin = Math.floor(st.spent / 60);
      const allocMin = Math.floor(st.allocated / 60);
      const isOver = st.spent > st.allocated;
      const tag = document.createElement('div');
      tag.className = 'mt-section-time-tag';
      tag.style.cssText = `font-size:0.72rem;font-weight:800;padding:0.2rem 0.6rem;border-radius:50px;margin-left:0.5rem;${isOver ? 'background:#fef2f2;color:#dc2626' : 'background:#f0fdf4;color:#16a34a'}`;
      tag.textContent = `${spentMin}/${allocMin} min`;
      header.appendChild(tag);
    });
  }

  window.submitTest = function () {
    clearInterval(timerInterval);
    const results = gradeTest();
    showResults(results);
  };

  function gradeTest() {
    let totalMarks = 0;
    let scored = 0;
    const details = [];

    // Grade MCQs
    (testData.mcqs || []).forEach((q, i) => {
      const key = 'mcq_' + i;
      const marks = q.marks || 1;
      totalMarks += marks;
      const chosen = answers[key];
      const isCorrect = chosen === q.correct;
      if (isCorrect) scored += marks;

      details.push({
        type: 'MCQ', q: q.q, marks, scored: isCorrect ? marks : 0,
        yourAnswer: chosen !== undefined ? q.options[chosen] : 'Not answered',
        correctAnswer: q.options[q.correct],
        correct: isCorrect,
        explanation: q.explanation || `Correct answer: ${q.options[q.correct]}`
      });
    });

    // Grade Short Answers (effort-based for now)
    (testData.shortAnswers || []).forEach((q, i) => {
      const key = 'short_' + i;
      const marks = q.marks || 2;
      totalMarks += marks;
      const answer = answers[key] || '';
      const words = answer.trim().split(/\s+/).filter(w => w).length;
      let earnedMarks = 0;
      if (words >= 15) earnedMarks = marks;
      else if (words >= 8) earnedMarks = Math.ceil(marks * 0.7);
      else if (words >= 3) earnedMarks = Math.ceil(marks * 0.4);
      scored += earnedMarks;

      details.push({
        type: 'Short', q: q.q, marks, scored: earnedMarks,
        yourAnswer: answer || 'Not answered',
        correctAnswer: q.expectedAnswer || 'See model answer',
        correct: earnedMarks === marks,
        partial: earnedMarks > 0 && earnedMarks < marks
      });
    });

    // Grade Long Answers (effort-based)
    (testData.longAnswers || []).forEach((q, i) => {
      const key = 'long_' + i;
      const marks = q.marks || 5;
      totalMarks += marks;
      const answer = answers[key] || '';
      const words = answer.trim().split(/\s+/).filter(w => w).length;
      let earnedMarks = 0;
      if (words >= 60) earnedMarks = marks;
      else if (words >= 40) earnedMarks = Math.ceil(marks * 0.8);
      else if (words >= 20) earnedMarks = Math.ceil(marks * 0.5);
      else if (words >= 5) earnedMarks = Math.ceil(marks * 0.2);
      scored += earnedMarks;

      details.push({
        type: 'Long', q: q.q, marks, scored: earnedMarks,
        yourAnswer: answer || 'Not answered',
        correctAnswer: q.rubric || 'See rubric',
        correct: earnedMarks === marks,
        partial: earnedMarks > 0 && earnedMarks < marks
      });
    });

    const pct = Math.round((scored / totalMarks) * 100);
    return { scored, totalMarks, pct, details };
  }

  function showResults(results) {
    document.getElementById('testScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';

    // Record in weakness engine
    if (typeof WeaknessEngine !== 'undefined') {
      WeaknessEngine.recordScore('exam', selectedExam + '_mock', results.scored, results.totalMarks);
    }

    const xpEarned = Math.round(results.pct * 2);

    // Grade label
    let grade, gradeColor, msg;
    if (results.pct >= 90) { grade = 'A+'; gradeColor = '#5b5ef4'; msg = 'Outstanding! You\'re board-exam ready! 🏆'; }
    else if (results.pct >= 75) { grade = 'A'; gradeColor = '#22c55e'; msg = 'Excellent performance! Keep it up! 🌟'; }
    else if (results.pct >= 60) { grade = 'B'; gradeColor = '#f97316'; msg = 'Good effort! Focus on weak areas to reach 90%+ 📈'; }
    else if (results.pct >= 40) { grade = 'C'; gradeColor = '#eab308'; msg = 'You have potential! More practice on weak topics will help 💪'; }
    else { grade = 'D'; gradeColor = '#dc2626'; msg = 'Don\'t worry! Use weakness drills to improve quickly 🚀'; }

    const predictedBoard = Math.min(95, results.pct + Math.floor(Math.random() * 8) + 3);

    document.getElementById('resultHero').innerHTML = `
      <div class="mt-result-score" style="background:linear-gradient(135deg,${gradeColor},${gradeColor}88);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${results.scored}/${results.totalMarks}</div>
      <div class="mt-result-grade" style="color:${gradeColor}">Grade: ${grade} (${results.pct}%)</div>
      <div style="font-weight:800;font-size:1rem;margin:0.5rem 0">${msg}</div>
      <div class="mt-result-pred">📊 Predicted Board Score: <strong style="color:#5b5ef4">${predictedBoard}%</strong> (with consistent practice)</div>
      <div style="margin-top:1rem;display:inline-block;padding:0.5rem 1.2rem;border-radius:12px;background:#eef0ff;font-weight:800;color:#5b5ef4">+${xpEarned} XP earned</div>
    `;

    // Breakdown
    const mcqScored = results.details.filter(d => d.type === 'MCQ').reduce((s, d) => s + d.scored, 0);
    const mcqTotal = results.details.filter(d => d.type === 'MCQ').reduce((s, d) => s + d.marks, 0);
    const shortScored = results.details.filter(d => d.type === 'Short').reduce((s, d) => s + d.scored, 0);
    const shortTotal = results.details.filter(d => d.type === 'Short').reduce((s, d) => s + d.marks, 0);
    const longScored = results.details.filter(d => d.type === 'Long').reduce((s, d) => s + d.scored, 0);
    const longTotal = results.details.filter(d => d.type === 'Long').reduce((s, d) => s + d.marks, 0);

    document.getElementById('resultBreakdown').innerHTML = `
      <div class="mt-rb-card"><div class="mt-rb-value" style="color:#5b5ef4">${mcqScored}/${mcqTotal}</div><div class="mt-rb-label">MCQs</div></div>
      <div class="mt-rb-card"><div class="mt-rb-value" style="color:#f97316">${shortScored}/${shortTotal}</div><div class="mt-rb-label">Short Answers</div></div>
      <div class="mt-rb-card"><div class="mt-rb-value" style="color:#7209b7">${longScored}/${longTotal}</div><div class="mt-rb-label">Long Answers</div></div>
      <div class="mt-rb-card"><div class="mt-rb-value" style="color:#22c55e">${results.pct}%</div><div class="mt-rb-label">Overall</div></div>
    `;

    // Time management analysis
    const dur = EXAM_DURATIONS[selectedExam];
    const totalExamTime = dur.total * 60;
    const timeTaken = totalExamTime - timeLeft;
    const timeTakenMin = Math.floor(timeTaken / 60);
    let timeAdvice = '';
    const sectionAnalysis = Object.entries(sectionTimers).map(([sec, st]) => {
      const allocMin = Math.floor(st.allocated / 60);
      const spentMin = Math.floor(st.spent / 60);
      const status = st.spent > st.allocated * 1.2 ? '🔴 Over time' : st.spent < st.allocated * 0.5 ? '🟡 Too fast' : '🟢 Good pace';
      return `<div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid #eeeeff">
        <span style="font-weight:800;text-transform:capitalize">${sec}</span>
        <span>${spentMin} min / ${allocMin} min</span>
        <span>${status}</span>
      </div>`;
    }).join('');

    if (timeTaken > totalExamTime) timeAdvice = '⚠️ You went over time. Practice time management — try finishing 5 minutes early.';
    else if (timeTaken < totalExamTime * 0.5) timeAdvice = '💡 You finished very fast! Take time to review answers before submitting.';
    else timeAdvice = '✅ Good time management! You used your time well.';

    document.getElementById('resultBreakdown').innerHTML += `
      <div class="mt-rb-card" style="grid-column:1/-1;text-align:left">
        <div style="font-weight:900;font-size:1rem;margin-bottom:0.5rem">⏱️ Time Management Report</div>
        <div style="margin-bottom:0.5rem;font-size:0.9rem;font-weight:700">${timeAdvice}</div>
        <div style="font-size:0.85rem;color:#64748b;margin-bottom:0.5rem">Total time: ${timeTakenMin} min out of ${dur.total} min</div>
        ${sectionAnalysis}
      </div>
    `;

    // Detailed answers
    document.getElementById('resultAnswers').innerHTML = `
      <h3 style="font-size:1.1rem;font-weight:900;margin:1.5rem 0 1rem">📋 Detailed Answer Review</h3>
      ${results.details.map((d, i) => `
        <div class="mt-ra-item ${d.correct ? 'correct' : d.partial ? 'partial' : 'wrong'}">
          <div class="mt-ra-q"><strong>Q${i + 1} (${d.type}, ${d.marks} marks):</strong> ${d.q}</div>
          <div class="mt-ra-answer">
            <strong>Your answer:</strong> ${d.yourAnswer?.substring(0, 200) || 'Not answered'}${d.yourAnswer?.length > 200 ? '...' : ''}
          </div>
          <div class="mt-ra-explain">
            ${d.correct ? '✅' : d.partial ? '⚠️' : '❌'} <strong>${d.scored}/${d.marks}</strong> — ${d.explanation || 'Correct: ' + d.correctAnswer}
          </div>
        </div>
      `).join('')}
    `;

    // Save to localStorage
    const history = JSON.parse(localStorage.getItem('ll_mock_tests') || '[]');
    history.push({ exam: selectedExam, scored: results.scored, total: results.totalMarks, pct: results.pct, grade, date: new Date().toISOString() });
    localStorage.setItem('ll_mock_tests', JSON.stringify(history.slice(-20)));

    if (typeof RobotTutor !== 'undefined') {
      if (results.pct >= 75) RobotTutor.onCelebrate();
      else RobotTutor.onTalking();
    }
  }
})();
