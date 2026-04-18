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
  }

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

function updateGyaniMood(mood) {
  const moodEl = document.getElementById('gyaniMood');
  const statusEl = document.getElementById('gyaniStatus');
  if (!moodEl) return;

  const moods = {
    happy: { emoji: '😊', text: 'Feeling great!' },
    excited: { emoji: '🤩', text: 'You\'re on fire!' },
    thinking: { emoji: '🤔', text: 'Thinking...' },
    proud: { emoji: '🥳', text: 'So proud of you!' },
    encouraging: { emoji: '💪', text: 'You got this!' },
    neutral: { emoji: '😊', text: 'Ready to teach!' },
  };
  const m = moods[mood] || moods.neutral;
  moodEl.textContent = m.emoji;
  if (statusEl) {
    statusEl.innerHTML = `<span class="status-dot"></span> ${m.text}`;
  }
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

  chatHistory.push({ role: 'user', content: message });
  trackWeeklyMessage();
  addLoading();
  if (typeof RobotTutor !== 'undefined') RobotTutor.onThinking();

  try {
    const method = document.getElementById('methodSelect')?.value || 'default';

    let data;
    if (message.toLowerCase().includes('quiz') || message.toLowerCase().includes('test me')) {
      data = await apiPost('/api/ai/quiz', {
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
      data = await apiPost('/api/ai/revision', { lastTopics: [message] });
      removeLoading();
      addBubble('ai', data?.revision || 'Could not generate revision.');
    } else {
      data = await apiPost('/api/ai/chat', {
        message,
        history: chatHistory.slice(-10)
      });
      removeLoading();
      const reply = data?.reply || 'Sorry, I could not process that. Please try again.';
      addBubble('ai', reply);
      chatHistory.push({ role: 'assistant', content: reply });
      updateGyaniMood('happy');
      if (typeof RobotTutor !== 'undefined') RobotTutor.onTalking();
    }
  } catch (err) {
    removeLoading();
    addBubble('ai', 'Oops! Something went wrong. Please try again.');
    updateGyaniMood('encouraging');
    if (typeof RobotTutor !== 'undefined') RobotTutor.onWrongAnswer('Oops! Let me try again...');
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

  if (isCorrect) {
    updateGyaniMood(comboCount >= 3 ? 'excited' : 'proud');
  } else {
    updateGyaniMood('encouraging');
  }

  if (typeof RobotTutor !== 'undefined') {
    if (isCorrect) RobotTutor.onCorrectAnswer('Brilliant! 🎉');
    else RobotTutor.onWrongAnswer("No worries, you'll get the next one! 💪");
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
