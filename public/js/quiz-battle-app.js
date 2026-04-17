(function () {
  if (typeof requireAuth === 'function' && !requireAuth()) return;
  if (typeof startSession === 'function') startSession();

  const student = typeof getStudent === 'function' ? getStudent() : null;
  const lang = student?.language || 'french';
  const cls = student?.class || 8;
  if (student) document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';

  const LB_KEY = 'll_quiz_leaderboard';

  // Sample questions per language
  const QUESTIONS_BANK = {
    french: [
      { q: 'What does "Bonjour" mean?', options: ['Goodbye', 'Hello', 'Thank you', 'Please'], correct: 1 },
      { q: '"Je suis" means...', options: ['I have', 'I am', 'I go', 'I want'], correct: 1 },
      { q: 'The feminine article in French is:', options: ['le', 'la', 'les', 'un'], correct: 1 },
      { q: '"Merci beaucoup" translates to:', options: ['See you soon', 'Thank you very much', 'Good night', 'Excuse me'], correct: 1 },
      { q: 'Choose the correct: "Elle ___ une fille"', options: ['est', 'es', 'suis', 'sont'], correct: 0 },
      { q: 'Plural of "le livre" is:', options: ['la livres', 'les livres', 'des livre', 'les livre'], correct: 1 },
      { q: '"Comment ça va?" is asking about:', options: ['Name', 'Age', 'Health/wellbeing', 'Address'], correct: 2 },
      { q: '"Avoir" means:', options: ['To be', 'To have', 'To go', 'To do'], correct: 1 },
      { q: 'Which is NOT a French color?', options: ['Rouge', 'Bleu', 'Verde', 'Noir'], correct: 2 },
      { q: '"Ma mère" means:', options: ['My father', 'My mother', 'My sister', 'My aunt'], correct: 1 },
    ],
    german: [
      { q: '"Guten Tag" means:', options: ['Good night', 'Good day', 'Goodbye', 'Good morning'], correct: 1 },
      { q: '"Ich bin" translates to:', options: ['I have', 'I am', 'I go', 'I can'], correct: 1 },
      { q: 'The German word for "school" is:', options: ['Schule', 'Stuhl', 'Schloss', 'Straße'], correct: 0 },
      { q: '"Danke schön" means:', options: ['Excuse me', 'Please', 'Thank you very much', 'Sorry'], correct: 2 },
      { q: 'Which article is feminine?', options: ['der', 'die', 'das', 'den'], correct: 1 },
      { q: '"Wie heißt du?" asks your:', options: ['Age', 'Name', 'Address', 'Class'], correct: 1 },
      { q: '"Mein Bruder" means:', options: ['My sister', 'My brother', 'My father', 'My friend'], correct: 1 },
      { q: 'German for "water" is:', options: ['Wasser', 'Wetter', 'Wunder', 'Wolke'], correct: 0 },
      { q: '"Ich habe" means:', options: ['I am', 'I have', 'I go', 'I see'], correct: 1 },
      { q: 'Plural of "das Buch":', options: ['die Bücher', 'das Bücher', 'die Buchs', 'den Buch'], correct: 0 },
    ],
    sanskrit: [
      { q: '"नमस्ते" is used for:', options: ['Goodbye', 'Greeting', 'Thank you', 'Sorry'], correct: 1 },
      { q: '"अहम्" means:', options: ['You', 'He', 'I', 'She'], correct: 2 },
      { q: 'The Sanskrit word for student is:', options: ['गुरुः', 'छात्रः', 'पुस्तकम्', 'विद्यालयः'], correct: 1 },
      { q: '"गच्छति" means:', options: ['Eats', 'Goes', 'Reads', 'Writes'], correct: 1 },
      { q: 'Which is the correct verb form for "we"?', options: ['गच्छामि', 'गच्छावः', 'गच्छामः', 'गच्छति'], correct: 2 },
      { q: '"फलम्" means:', options: ['Flower', 'Fruit', 'Leaf', 'Tree'], correct: 1 },
      { q: 'Sanskrit word for "water":', options: ['अग्निः', 'जलम्', 'वायुः', 'पृथ्वी'], correct: 1 },
      { q: '"पठति" means:', options: ['Writes', 'Reads', 'Plays', 'Sleeps'], correct: 1 },
      { q: 'Dual number form of "बालकः":', options: ['बालकाः', 'बालकौ', 'बालकः', 'बालकान्'], correct: 1 },
      { q: '"सूर्यः" means:', options: ['Moon', 'Star', 'Sun', 'Sky'], correct: 2 },
    ],
    spanish: [
      { q: '"Hola" means:', options: ['Goodbye', 'Hello', 'Sorry', 'Thanks'], correct: 1 },
      { q: '"Yo soy" translates to:', options: ['I have', 'I am', 'I go', 'I want'], correct: 1 },
      { q: 'The Spanish word for "house" is:', options: ['casa', 'cosa', 'clase', 'cama'], correct: 0 },
      { q: '"Gracias" means:', options: ['Please', 'Sorry', 'Thank you', 'Hello'], correct: 2 },
      { q: 'Feminine article in Spanish:', options: ['el', 'la', 'los', 'un'], correct: 1 },
      { q: '"¿Cómo te llamas?" asks your:', options: ['Age', 'Name', 'Address', 'School'], correct: 1 },
      { q: '"Mi hermano" means:', options: ['My sister', 'My brother', 'My friend', 'My father'], correct: 1 },
      { q: '"Tengo" means:', options: ['I am', 'I have', 'I go', 'I eat'], correct: 1 },
      { q: 'Spanish for "book" is:', options: ['libro', 'libra', 'libre', 'labor'], correct: 0 },
      { q: '"Buenos días" means:', options: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'], correct: 1 },
    ]
  };

  // Fill remaining languages with generic questions
  ['japanese', 'korean', 'mandarin', 'russian'].forEach(l => {
    if (!QUESTIONS_BANK[l]) {
      QUESTIONS_BANK[l] = Array.from({ length: 10 }, (_, i) => ({
        q: `${l.charAt(0).toUpperCase() + l.slice(1)} Class ${cls} — Question ${i + 1}`,
        options: ['Option A', 'Option B (Correct)', 'Option C', 'Option D'],
        correct: 1
      }));
    }
  });

  let battle = { mode: null, round: 0, p1Score: 0, p2Score: 0, questions: [], timer: null, timePerQ: 10 };

  loadLeaderboard();

  window.startBattle = function (mode) {
    if (mode === 'random') { alert('Online matchmaking coming soon! Try vs AI Bot for now.'); return; }
    battle = { mode, round: 0, p1Score: 0, p2Score: 0, questions: shuffleArray([...QUESTIONS_BANK[lang] || QUESTIONS_BANK.french]).slice(0, 10), timer: null, timePerQ: 10 };

    document.getElementById('lobbyScreen').style.display = 'none';
    document.getElementById('battleScreen').style.display = 'block';

    document.getElementById('p1Name').textContent = student?.name?.split(' ')[0] || 'You';
    document.getElementById('p2Name').textContent = mode === 'ai' ? 'Gyani Bot 🤖' : 'Player 2';
    document.getElementById('p2Avatar').textContent = mode === 'ai' ? '🤖' : '👤';
    document.getElementById('p1Score').textContent = '0';
    document.getElementById('p2Score').textContent = '0';

    nextQuestion();
  };

  function nextQuestion() {
    if (battle.round >= battle.questions.length) { endBattle(); return; }

    const q = battle.questions[battle.round];
    document.getElementById('roundNum').textContent = `${battle.round + 1}/${battle.questions.length}`;
    document.getElementById('battleQuestion').textContent = q.q;
    document.getElementById('battleFeedback').style.display = 'none';

    const letters = ['A', 'B', 'C', 'D'];
    document.getElementById('battleOptions').innerHTML = q.options.map((opt, i) =>
      `<div class="qb-opt" onclick="answerBattle(${i})">${letters[i]}. ${opt}</div>`
    ).join('');

    startQuestionTimer();
  }

  function startQuestionTimer() {
    let time = battle.timePerQ;
    const timerEl = document.getElementById('battleTimer');
    timerEl.textContent = time;
    timerEl.classList.remove('low');

    clearInterval(battle.timer);
    battle.timer = setInterval(() => {
      time--;
      timerEl.textContent = time;
      if (time <= 3) timerEl.classList.add('low');
      if (time <= 0) {
        clearInterval(battle.timer);
        answerBattle(-1); // timeout
      }
    }, 1000);
  }

  window.answerBattle = function (chosen) {
    clearInterval(battle.timer);
    const q = battle.questions[battle.round];
    const isCorrect = chosen === q.correct;

    // Show correct/wrong
    const options = document.querySelectorAll('.qb-opt');
    options.forEach((o, i) => {
      o.style.pointerEvents = 'none';
      if (i === q.correct) o.classList.add('correct');
      else if (i === chosen) o.classList.add('wrong');
    });

    // Score
    if (isCorrect) battle.p1Score++;
    document.getElementById('p1Score').textContent = battle.p1Score;

    // AI opponent answer (simulated)
    if (battle.mode === 'ai') {
      const aiCorrect = Math.random() < 0.6; // 60% accuracy
      if (aiCorrect) battle.p2Score++;
      document.getElementById('p2Score').textContent = battle.p2Score;
    }

    // Feedback
    const fb = document.getElementById('battleFeedback');
    fb.style.display = 'block';
    fb.className = `qb-feedback ${isCorrect ? 'correct' : 'wrong'}`;
    fb.textContent = isCorrect ? '✅ Correct! +1 point' : chosen === -1 ? '⏰ Time\'s up!' : '❌ Wrong answer';

    battle.round++;
    setTimeout(nextQuestion, 1500);
  };

  function endBattle() {
    clearInterval(battle.timer);
    document.getElementById('battleScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';

    const won = battle.p1Score > battle.p2Score;
    const tied = battle.p1Score === battle.p2Score;
    const xpEarned = won ? 50 : tied ? 25 : 10;
    const pct = Math.round((battle.p1Score / battle.questions.length) * 100);

    document.getElementById('battleResults').innerHTML = `
      <div style="font-size:4rem;margin-bottom:0.5rem">${won ? '🏆' : tied ? '🤝' : '💪'}</div>
      <div style="font-size:2rem;font-weight:900;color:${won ? '#22c55e' : tied ? '#5b5ef4' : '#f97316'}">${won ? 'YOU WIN!' : tied ? 'IT\'S A TIE!' : 'NICE TRY!'}</div>
      <div style="display:flex;justify-content:center;gap:3rem;margin:1.5rem 0">
        <div><div style="font-size:2.5rem;font-weight:900;color:#5b5ef4">${battle.p1Score}</div><div style="font-size:0.82rem;font-weight:800;color:#64748b">You</div></div>
        <div style="font-size:1.5rem;font-weight:900;color:#e2e8f0;align-self:center">vs</div>
        <div><div style="font-size:2.5rem;font-weight:900;color:#64748b">${battle.p2Score}</div><div style="font-size:0.82rem;font-weight:800;color:#64748b">${battle.mode === 'ai' ? 'Gyani' : 'P2'}</div></div>
      </div>
      <div style="font-size:0.9rem;color:#64748b;margin-bottom:0.5rem">Accuracy: ${pct}%</div>
      <div style="display:inline-block;padding:0.5rem 1.5rem;border-radius:12px;background:#eef0ff;font-weight:800;font-size:0.9rem;color:#5b5ef4;margin-bottom:1.5rem">+${xpEarned} XP</div>
      <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="location.reload()">Play Again</button>
        <a href="/weakness" class="btn btn-outline">Practice Weak Areas</a>
        <a href="/dashboard" class="btn btn-outline">Dashboard</a>
      </div>
    `;

    // Save to leaderboard
    saveToLeaderboard(battle.p1Score, pct);

    if (typeof WeaknessEngine !== 'undefined') {
      WeaknessEngine.recordScore('quiz', 'battle_' + lang, battle.p1Score, battle.questions.length);
    }
  }

  function saveToLeaderboard(score, pct) {
    const lb = JSON.parse(localStorage.getItem(LB_KEY) || '[]');
    lb.push({ name: student?.name || 'Student', score, pct, date: new Date().toISOString(), lang, cls });
    lb.sort((a, b) => b.score - a.score);
    localStorage.setItem(LB_KEY, JSON.stringify(lb.slice(0, 50)));
    loadLeaderboard();
  }

  function loadLeaderboard() {
    const el = document.getElementById('leaderboard');
    if (!el) return;
    const lb = JSON.parse(localStorage.getItem(LB_KEY) || '[]');
    const top10 = lb.slice(0, 10);

    if (!top10.length) {
      el.innerHTML = '<div style="text-align:center;padding:1rem;color:#64748b;font-size:0.85rem">Play a quiz battle to appear on the leaderboard!</div>';
      return;
    }

    const medals = ['gold', 'silver', 'bronze'];
    el.innerHTML = top10.map((entry, i) => {
      const isYou = entry.name === (student?.name || '');
      return `<div class="qb-lb-item ${isYou ? 'you' : ''}">
        <div class="qb-lb-rank ${medals[i] || ''}">${i + 1}</div>
        <div class="qb-lb-name">${entry.name}${isYou ? ' (You)' : ''}</div>
        <div class="qb-lb-score">${entry.score}/10 · ${entry.pct}%</div>
      </div>`;
    }).join('');
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
})();
