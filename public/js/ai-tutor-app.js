let chatHistory = [];

document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth()) return;

  const student = getStudent();
  if (student) {
    document.getElementById('tsInfo').textContent =
      `Class ${student.class} · ${student.language.charAt(0).toUpperCase() + student.language.slice(1)}`;
    document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';
    loadQuickTopics(student);
  }

  // Initialize Robot Tutor
  if (typeof RobotTutor !== 'undefined') {
    RobotTutor.init('chatRobot');
    RobotTutor.onGreet(student?.name?.split(' ')[0]);
  }

  await startSession();
  loadWeakAreas();

  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
});

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
      `<div class="ts-weak-item" onclick="quickSend('Help me improve: ${w.skill_name.replace(/_/g, ' ')}')">
        <span>${w.skill_name.replace(/_/g, ' ')}</span>
        <span class="ts-weak-pct">${Math.round(w.accuracy)}%</span>
      </div>`
    ).join('');
  } else {
    container.innerHTML = '<div style="font-size:0.82rem;color:#64748b">No weak areas yet!</div>';
  }
}

function addBubble(role, content) {
  const container = document.getElementById('chatMessages');
  const icon = role === 'ai' ? '🤖' : '👤';

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;
  bubble.innerHTML = `
    <div class="cb-icon">${icon}</div>
    <div class="cb-content">${formatContent(content)}</div>
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
    <div class="cb-icon">🤖</div>
    <div class="cb-content">
      <div class="cb-loading"><span></span><span></span><span></span></div>
    </div>
  `;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function removeLoading() {
  document.getElementById('loadingBubble')?.remove();
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
      if (typeof RobotTutor !== 'undefined') RobotTutor.onTalking();
    }
  } catch (err) {
    removeLoading();
    addBubble('ai', 'Oops! Something went wrong. Please try again.');
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
      <div class="cb-icon">🧩</div>
      <div class="cb-content">
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

async function checkQuizAnswer(btn, qi, selected, correct, explanation, skill) {
  const allBtns = document.querySelectorAll(`[data-qi="${qi}"]`);
  allBtns.forEach(b => {
    b.disabled = true;
    b.style.cursor = 'default';
    const oi = parseInt(b.dataset.oi);
    if (oi === correct) {
      b.style.background = '#ecfdf5';
      b.style.borderColor = '#34d399';
    }
    if (oi === selected && oi !== correct) {
      b.style.background = '#fef2f2';
      b.style.borderColor = '#f87171';
    }
  });

  const isCorrect = selected === correct;
  const feedback = isCorrect
    ? `✅ Correct! ${explanation} (+10 XP)`
    : `❌ Not quite. ${explanation} (+5 XP)`;

  addBubble('ai', feedback);
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
