let chatHistory = [];
let comboCount = 0;
let bestCombo = 0;
let sessionXP = 0;
let correctCount = 0;
let weeklyMessageCount = 0;

document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth()) return;

  const student = getStudent();
  if (student) {
    document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';
    loadQuickTopics(student);
  }

  if (typeof RobotTutor !== 'undefined') {
    RobotTutor.init('sidebarRobot');
    RobotTutor.onGreet(student?.name?.split(' ')[0]);

    const profile = RobotTutor.getProfile();
    const nameTag = document.getElementById('gyaniNameTag');
    const titleEl = document.getElementById('gyaniTitle');
    if (nameTag) nameTag.textContent = profile.name;
    if (titleEl) titleEl.textContent = profile.tagline;
  }

  resetIdleTimer();
  initEyeFollow();

  await startSession();
  loadWeakAreas();
  initWeeklyUsage();

  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
});

function setMethod(btn) {
  document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('methodSelect').value = btn.dataset.method;
}

function reactToMessage(btn, emoji) {
  btn.classList.toggle('reacted');
  btn.textContent = btn.classList.contains('reacted') ? emoji + ' 1' : emoji;
}

function updateSessionStats() {
  const xpEl = document.getElementById('sessionXP');
  const correctEl = document.getElementById('sessionCorrect');
  const comboEl = document.getElementById('sessionCombo');
  const headerXP = document.getElementById('headerXP');
  if (xpEl) xpEl.textContent = sessionXP;
  if (correctEl) correctEl.textContent = correctCount;
  if (comboEl) comboEl.textContent = bestCombo;
  if (headerXP) headerXP.textContent = sessionXP + ' XP';
}

function showXPPopup(amount) {
  const popup = document.getElementById('xpPopup');
  popup.textContent = `+${amount} XP`;
  popup.classList.remove('show');
  void popup.offsetWidth;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 1200);
}

function updateCombo(correct) {
  const counter = document.getElementById('comboCounter');
  const numEl = document.getElementById('comboNumber');
  const fireEl = document.getElementById('comboFire');

  if (correct) {
    comboCount++;
    if (comboCount > bestCombo) bestCombo = comboCount;
    if (comboCount >= 2) {
      counter.classList.add('show');
      numEl.textContent = comboCount;
      fireEl.textContent = '🔥'.repeat(Math.min(comboCount, 5));
    }
  } else {
    comboCount = 0;
    counter.classList.remove('show');
  }
  updateSessionStats();
}

let idleTimer = null;
const IDLE_NUDGE_MS = 120000;

function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (typeof RobotTutor !== 'undefined') {
      RobotTutor.setState('wave', 'Still there? Ask me anything! 👋');
      setTimeout(() => RobotTutor.setState('idle'), 4000);
    }
    updateGyaniMood('encouraging');
  }, IDLE_NUDGE_MS);
}

function updateGyaniMood(mood) {
  const moodEl = document.getElementById('gyaniMood');
  const moodTextEl = document.getElementById('gyaniMoodText');
  const statusTextEl = document.getElementById('gyaniStatusText');
  if (!moodEl) return;

  const moods = {
    happy:       { emoji: '😊', text: 'Happy', status: 'Feeling great!' },
    excited:     { emoji: '🤩', text: 'Excited', status: 'You\'re on fire!' },
    thinking:    { emoji: '🤔', text: 'Thinking', status: 'Processing your question...' },
    proud:       { emoji: '🥳', text: 'Proud', status: 'So proud of you!' },
    encouraging: { emoji: '💪', text: 'Motivated', status: 'You got this!' },
    teaching:    { emoji: '📚', text: 'Teaching', status: 'Explaining...' },
    celebrating: { emoji: '🎉', text: 'Celebrating', status: 'Amazing work!' },
    sad:         { emoji: '😢', text: 'Worried', status: 'Let\'s try again!' },
    neutral:     { emoji: '😊', text: 'Ready', status: 'Ready to teach!' },
  };
  const m = moods[mood] || moods.neutral;
  moodEl.textContent = m.emoji;
  if (moodTextEl) moodTextEl.textContent = m.text;
  if (statusTextEl) statusTextEl.textContent = m.status;
}

function loadQuickTopics(student) {
  const topics = {
    french: ['Articles (le, la, les)', 'Verb conjugation', 'Greetings & introductions', 'Family vocabulary', 'Past tense (passé composé)'],
    german: ['Verb conjugation', 'Cases (Nominativ, Akkusativ)', 'Greetings', 'Numbers & colors', 'Daily routine vocabulary'],
    sanskrit: ['Dhatu Roop (verb forms)', 'Shabd Roop (noun forms)', 'Vibhakti (cases)', 'Sandhi (joining rules)', 'Lat Lakar (present tense)'],
    spanish: ['Ser vs Estar', 'Basic greetings', 'Family vocabulary', 'Present tense verbs', 'Food & restaurant phrases'],
    japanese: ['Hiragana chart', 'Katakana basics', 'Self introduction (Jikoshoukai)', 'Numbers 1-100', 'Greetings (Aisatsu)'],
    korean: ['Hangul alphabet', 'Basic greetings', 'Self introduction', 'Numbers (Native & Sino)', 'Family vocabulary'],
    mandarin: ['Pinyin tones', 'Basic greetings (Ni hao)', 'Numbers 1-100', 'Self introduction', 'Family members'],
    russian: ['Cyrillic alphabet', 'Basic greetings', 'Numbers', 'Family vocabulary', 'Present tense verbs']
  };

  const container = document.getElementById('quickTopics');
  const langTopics = topics[student.language] || topics.french;
  container.innerHTML = langTopics.map(t =>
    `<button class="ts-topic-btn" onclick="quickSend('Explain: ${t}')">${t}</button>`
  ).join('');
}

async function loadWeakAreas() {
  const data = await apiGet('/api/skills/weaknesses');
  const container = document.getElementById('weakAreas');
  if (data?.weaknesses?.length) {
    container.innerHTML = data.weaknesses.slice(0, 5).map(w =>
      `<div class="ts-weak-item-v2" onclick="quickSend('Help me improve: ${w.skill_name.replace(/_/g, ' ')}')">
        <span>${w.skill_name.replace(/_/g, ' ')}</span>
        <span class="ts-weak-pct">${Math.round(w.accuracy)}%</span>
      </div>`
    ).join('');
  } else {
    container.innerHTML = '<div style="font-size:0.82rem;color:#64748b;text-align:center;padding:0.5rem">No weak areas yet! Keep learning 🚀</div>';
  }
}

function addBubble(role, content) {
  const container = document.getElementById('chatMessages');
  const icon = role === 'ai' ? '🤖' : '👤';
  const name = role === 'ai' ? 'Gyani' : 'You';

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;

  const reactionsHTML = role === 'ai' ? `
    <div class="cb-reactions">
      <button class="reaction-btn" onclick="reactToMessage(this, '👍')">👍</button>
      <button class="reaction-btn" onclick="reactToMessage(this, '❤️')">❤️</button>
      <button class="reaction-btn" onclick="reactToMessage(this, '🔥')">🔥</button>
    </div>` : '';

  bubble.innerHTML = `
    <div class="cb-avatar">${icon}</div>
    <div class="cb-content-v2">
      <div class="cb-name">${name}</div>
      ${formatContent(content)}
      ${reactionsHTML}
    </div>
  `;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return bubble;
}

function addLoading() {
  const container = document.getElementById('chatMessages');
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble ai';
  bubble.id = 'loadingBubble';
  bubble.innerHTML = `
    <div class="cb-avatar">🤖</div>
    <div class="cb-content-v2">
      <div class="cb-name">Gyani</div>
      <div class="cb-loading"><span></span><span></span><span></span></div>
    </div>
  `;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;

  updateGyaniMood('thinking');
  const typingEl = document.getElementById('gyaniTypingStatus');
  if (typingEl) typingEl.textContent = 'Gyani is typing...';
}

function removeLoading() {
  document.getElementById('loadingBubble')?.remove();
  const typingEl = document.getElementById('gyaniTypingStatus');
  if (typingEl) typingEl.textContent = 'Your AI study buddy — always ready!';
  updateGyaniMood('neutral');
}

function formatContent(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/g, '<pre>$1</pre>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const btn = document.getElementById('sendBtn');
  const message = input.value.trim();
  if (!message) return;

  input.value = '';
  btn.disabled = true;
  addBubble('user', message);
  resetIdleTimer();

  chatHistory.push({ role: 'user', content: message });
  trackWeeklyMessage();
  addLoading();
  if (typeof RobotTutor !== 'undefined') RobotTutor.onThinking();
  updateGyaniMood('thinking');

  try {
    const method = document.getElementById('methodSelect')?.value || 'default';

    let data;
    let rawRes;
    if (message.toLowerCase().includes('quiz') || message.toLowerCase().includes('test me')) {
      data = await apiPostWithLimit('/api/ai/quiz', {
        topic: message,
        difficulty: 'medium',
        count: 5
      });
      removeLoading();
      updateGyaniMood('excited');
      if (typeof RobotTutor !== 'undefined') RobotTutor.onQuiz();
      if (data?.questions?.length) {
        renderQuiz(data.questions);
      } else {
        addBubble('ai', data?.raw || 'Here are some practice questions for you!');
      }
    } else if (message.toLowerCase().includes('revis')) {
      data = await apiPostWithLimit('/api/ai/revision', { lastTopics: [message] });
      removeLoading();
      addBubble('ai', data?.revision || 'Could not generate revision.');
    } else {
      data = await apiPostWithLimit('/api/ai/chat', {
        message,
        history: chatHistory.slice(-10)
      });
      removeLoading();
      const reply = data?.reply || 'Sorry, I could not process that. Please try again.';
      if (typeof RobotTutor !== 'undefined') RobotTutor.onTalking();
      updateGyaniMood('teaching');
      addBubble('ai', reply);
      chatHistory.push({ role: 'assistant', content: reply });
      setTimeout(() => {
        updateGyaniMood('happy');
        if (typeof RobotTutor !== 'undefined') RobotTutor.setState('idle');
      }, 3000);
    }
  } catch (err) {
    removeLoading();
    if (err.limitReached) {
      showLimitBanner(err.used, err.limit);
    } else {
      addBubble('ai', 'Oops! Something went wrong. Please try again.');
      updateGyaniMood('encouraging');
      if (typeof RobotTutor !== 'undefined') RobotTutor.onWrongAnswer('Oops! Let me try again...');
    }
  }

  btn.disabled = false;
  input.focus();
}

function quickSend(text) {
  document.getElementById('chatInput').value = text;
  sendMessage();
}

function renderQuiz(questions) {
  const container = document.getElementById('chatMessages');
  questions.forEach((q, qi) => {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ai';
    bubble.innerHTML = `
      <div class="cb-avatar">🧩</div>
      <div class="cb-content-v2">
        <div class="cb-name">Quiz</div>
        <p><strong>Q${qi + 1}:</strong> ${q.q}</p>
        <div style="display:flex;flex-direction:column;gap:0.4rem;margin-top:0.5rem">
          ${q.options.map((opt, i) =>
            `<button class="ts-topic-btn quiz-opt-btn" data-qi="${qi}" data-oi="${i}" onclick="checkQuizAnswer(this,${qi},${i},${q.correct},'${(q.explanation || '').replace(/'/g, "\\'")}','${q.skill || ''}')">${['A','B','C','D'][i]}. ${opt}</button>`
          ).join('')}
        </div>
      </div>
    `;
    container.appendChild(bubble);
  });
  container.scrollTop = container.scrollHeight;
}

function getWeekKey() {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  return 'wu_' + monday.toISOString().slice(0, 10);
}

function getWeeklyData() {
  const key = getWeekKey();
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  return { sessions: 0, messages: 0, startTime: null, totalMinutes: 0, days: [false, false, false, false, false, false, false] };
}

function saveWeeklyData(data) {
  localStorage.setItem(getWeekKey(), JSON.stringify(data));
}

function initWeeklyUsage() {
  const data = getWeeklyData();
  const today = (new Date().getDay() + 6) % 7;
  if (!data.days[today]) {
    data.days[today] = true;
    data.sessions++;
    data.startTime = Date.now();
    saveWeeklyData(data);
  } else if (!data.startTime) {
    data.startTime = Date.now();
    saveWeeklyData(data);
  }
  updateWeeklyUI(data);

  setInterval(function () {
    const d = getWeeklyData();
    if (d.startTime) {
      const elapsed = Math.round((Date.now() - d.startTime) / 60000);
      document.getElementById('wuMinutes').textContent = d.totalMinutes + elapsed;
    }
  }, 30000);
}

function trackWeeklyMessage() {
  const data = getWeeklyData();
  data.messages++;
  saveWeeklyData(data);
  weeklyMessageCount = data.messages;
  updateWeeklyUI(data);
}

function updateWeeklyUI(data) {
  const sessEl = document.getElementById('wuSessions');
  const msgEl = document.getElementById('wuMessages');
  const minEl = document.getElementById('wuMinutes');
  const goalEl = document.getElementById('wuGoalText');
  const fillEl = document.getElementById('wuProgressFill');

  if (sessEl) sessEl.textContent = data.sessions;
  if (msgEl) msgEl.textContent = data.messages;
  if (minEl) {
    let mins = data.totalMinutes;
    if (data.startTime) mins += Math.round((Date.now() - data.startTime) / 60000);
    minEl.textContent = mins;
  }
  if (goalEl) goalEl.textContent = data.sessions + ' / 7 sessions';
  if (fillEl) fillEl.style.width = Math.min(100, (data.sessions / 7) * 100) + '%';

  for (let i = 0; i < 7; i++) {
    const dayEl = document.getElementById('wuDay' + i);
    if (dayEl) {
      if (data.days[i]) dayEl.classList.add('active');
      else dayEl.classList.remove('active');
    }
  }

  const tipEl = document.getElementById('wuTip');
  if (tipEl) {
    let tip = '';
    const activeDays = data.days.filter(Boolean).length;
    let mins = data.totalMinutes;
    if (data.startTime) mins += Math.round((Date.now() - data.startTime) / 60000);

    if (activeDays >= 7) {
      tip = '🏆 Perfect week! You used Gyani every single day!';
    } else if (activeDays >= 5) {
      tip = '🔥 Great streak! Just ' + (7 - activeDays) + ' more day(s) for a perfect week!';
    } else if (data.messages > 0 && data.messages < 10) {
      tip = '💬 Try asking ' + (10 - data.messages) + ' more questions this session!';
    } else if (mins > 0 && mins < 15) {
      tip = '⏱️ ' + (15 - mins) + ' more min today to hit the recommended 15 min!';
    } else if (activeDays === 0) {
      tip = '🚀 Start your week strong — ask Gyani anything!';
    } else if (activeDays < 4) {
      tip = '📅 You\'ve practised ' + activeDays + ' day(s) — aim for at least 5 this week!';
    } else if (data.messages >= 10) {
      tip = '⭐ ' + data.messages + ' messages this week — you\'re doing amazing!';
    }

    if (tip) {
      tipEl.textContent = tip;
      tipEl.classList.add('show');
    } else {
      tipEl.classList.remove('show');
    }
  }
}

async function apiPostWithLimit(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  });
  if (res.status === 401) { logout(); return null; }
  const data = await res.json();
  if (res.status === 429) {
    const err = new Error(data.message);
    err.limitReached = true;
    err.used = data.used;
    err.limit = data.limit;
    throw err;
  }
  if (data.usage) updateUsageCounter(data.usage);
  return data;
}

function updateUsageCounter(usage) {
  const fill = document.getElementById('ucFill');
  const text = document.getElementById('ucText');
  const counter = document.getElementById('usageCounter');
  if (!fill || !text) return;

  const pct = Math.min(100, (usage.used / usage.limit) * 100);
  fill.style.width = pct + '%';
  text.textContent = usage.used + ' / ' + usage.limit + ' messages today';

  if (pct >= 80) fill.style.background = 'linear-gradient(90deg, #f97316, #ef4444)';
  else if (pct >= 50) fill.style.background = 'linear-gradient(90deg, #fbbf24, #f97316)';
  else fill.style.background = 'linear-gradient(90deg, #818cf8, #c084fc)';

  if (counter) counter.style.display = 'flex';
}

function showLimitBanner(used, limit) {
  const banner = document.getElementById('dailyLimitBanner');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  if (banner) banner.style.display = 'flex';
  if (input) { input.disabled = true; input.placeholder = 'Daily limit reached — come back tomorrow!'; }
  if (sendBtn) sendBtn.disabled = true;

  removeLoading();
  addBubble('ai', '⏰ You\'ve used all ' + limit + ' messages for today! Great effort though — come back tomorrow or upgrade your plan for more daily messages. Keep up the amazing work! 🌟');
  updateGyaniMood('encouraging');
}

window.addEventListener('beforeunload', function () {
  const data = getWeeklyData();
  if (data.startTime) {
    data.totalMinutes += Math.round((Date.now() - data.startTime) / 60000);
    data.startTime = null;
    saveWeeklyData(data);
  }
});

async function checkQuizAnswer(btn, qi, selected, correct, explanation, skill) {
  const allBtns = document.querySelectorAll(`[data-qi="${qi}"]`);
  allBtns.forEach(b => {
    b.disabled = true;
    b.style.cursor = 'default';
    const oi = parseInt(b.dataset.oi);
    if (oi === correct) {
      b.style.background = '#ecfdf5';
      b.style.borderColor = '#34d399';
      b.style.color = '#059669';
    }
    if (oi === selected && oi !== correct) {
      b.style.background = '#fef2f2';
      b.style.borderColor = '#f87171';
      b.style.color = '#ef4444';
    }
  });

  const isCorrect = selected === correct;
  const xpGain = isCorrect ? 10 : 5;
  sessionXP += xpGain;
  if (isCorrect) correctCount++;

  updateCombo(isCorrect);

  const comboBonus = isCorrect && comboCount >= 3 ? ` (🔥 ${comboCount}x combo!)` : '';
  const feedback = isCorrect
    ? `✅ Correct! ${explanation} (+${xpGain} XP)${comboBonus}`
    : `❌ Not quite. ${explanation} (+${xpGain} XP for trying!)`;

  addBubble('ai', feedback);
  showXPPopup(xpGain);
  updateSessionStats();

  resetIdleTimer();

  if (isCorrect) {
    updateGyaniMood(comboCount >= 3 ? 'excited' : 'proud');
  } else {
    updateGyaniMood('encouraging');
  }

  if (typeof RobotTutor !== 'undefined') {
    if (isCorrect) {
      RobotTutor.onCorrectAnswer(comboCount >= 3 ? `${comboCount}x combo! Unstoppable! 🔥` : 'Brilliant! 🎉');
    } else {
      RobotTutor.onWrongAnswer("No worries, you'll get the next one! 💪");
    }
  }

  await apiPost('/api/ai/check', {
    answers: [{
      question: `Q${qi + 1}`,
      selected,
      correct,
      explanation,
      skill
    }]
  });
}

function initEyeFollow() {
  document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.robot-eye::after, .robot-eye');
    const avatar = document.getElementById('gyaniAvatar');
    if (!avatar) return;

    const rect = avatar.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(3, Math.sqrt(dx * dx + dy * dy) / 80);

    const eyeEls = avatar.querySelectorAll('.robot-eye');
    eyeEls.forEach(eye => {
      const pupil = eye.querySelector('::after') || eye;
      eye.style.setProperty('--eye-x', `${Math.cos(angle) * dist}px`);
      eye.style.setProperty('--eye-y', `${Math.sin(angle) * dist}px`);
    });
  });
}
