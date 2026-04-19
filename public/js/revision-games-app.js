(function () {
  if (!requireAuth()) return;
  startSession();

  const student = getStudent();
  const lang = student?.language || 'french';
  const cls = student?.class || 8;
  if (student) {
    document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';
  }

  // Game data per language
  const VOCAB = {
    french: [
      { word: 'Bonjour', meaning: 'Hello' }, { word: 'Merci', meaning: 'Thank you' },
      { word: 'Maison', meaning: 'House' }, { word: 'Ecole', meaning: 'School' },
      { word: 'Livre', meaning: 'Book' }, { word: 'Ami', meaning: 'Friend' },
      { word: 'Manger', meaning: 'To eat' }, { word: 'Boire', meaning: 'To drink' },
      { word: 'Famille', meaning: 'Family' }, { word: 'Jardin', meaning: 'Garden' },
      { word: 'Chien', meaning: 'Dog' }, { word: 'Chat', meaning: 'Cat' },
      { word: 'Fleur', meaning: 'Flower' }, { word: 'Soleil', meaning: 'Sun' },
      { word: 'Lune', meaning: 'Moon' }, { word: 'Enfant', meaning: 'Child' },
    ],
    german: [
      { word: 'Guten Tag', meaning: 'Good day' }, { word: 'Danke', meaning: 'Thank you' },
      { word: 'Haus', meaning: 'House' }, { word: 'Schule', meaning: 'School' },
      { word: 'Buch', meaning: 'Book' }, { word: 'Freund', meaning: 'Friend' },
      { word: 'Essen', meaning: 'To eat' }, { word: 'Trinken', meaning: 'To drink' },
      { word: 'Familie', meaning: 'Family' }, { word: 'Garten', meaning: 'Garden' },
      { word: 'Hund', meaning: 'Dog' }, { word: 'Katze', meaning: 'Cat' },
      { word: 'Blume', meaning: 'Flower' }, { word: 'Sonne', meaning: 'Sun' },
      { word: 'Mond', meaning: 'Moon' }, { word: 'Kind', meaning: 'Child' },
    ],
    sanskrit: [
      { word: 'नमस्ते', meaning: 'Hello' }, { word: 'धन्यवाद:', meaning: 'Thank you' },
      { word: 'गृहम्', meaning: 'House' }, { word: 'विद्यालय:', meaning: 'School' },
      { word: 'पुस्तकम्', meaning: 'Book' }, { word: 'मित्रम्', meaning: 'Friend' },
      { word: 'खादति', meaning: 'Eats' }, { word: 'पिबति', meaning: 'Drinks' },
      { word: 'परिवार:', meaning: 'Family' }, { word: 'उद्यानम्', meaning: 'Garden' },
      { word: 'श्वान:', meaning: 'Dog' }, { word: 'मार्जार:', meaning: 'Cat' },
      { word: 'पुष्पम्', meaning: 'Flower' }, { word: 'सूर्य:', meaning: 'Sun' },
      { word: 'चन्द्र:', meaning: 'Moon' }, { word: 'बालक:', meaning: 'Child' },
    ],
    spanish: [
      { word: 'Hola', meaning: 'Hello' }, { word: 'Gracias', meaning: 'Thank you' },
      { word: 'Casa', meaning: 'House' }, { word: 'Escuela', meaning: 'School' },
      { word: 'Libro', meaning: 'Book' }, { word: 'Amigo', meaning: 'Friend' },
      { word: 'Comer', meaning: 'To eat' }, { word: 'Beber', meaning: 'To drink' },
      { word: 'Familia', meaning: 'Family' }, { word: 'Jardín', meaning: 'Garden' },
      { word: 'Perro', meaning: 'Dog' }, { word: 'Gato', meaning: 'Cat' },
      { word: 'Flor', meaning: 'Flower' }, { word: 'Sol', meaning: 'Sun' },
      { word: 'Luna', meaning: 'Moon' }, { word: 'Niño', meaning: 'Child' },
    ],
  };

  const GRAMMAR = {
    french: [
      { sentence: 'Je ___ à l\'école.', options: ['vais', 'vas', 'va', 'allons'], correct: 0 },
      { sentence: 'Nous ___ français.', options: ['parle', 'parles', 'parlons', 'parlez'], correct: 2 },
      { sentence: 'Elle ___ un livre.', options: ['lis', 'lit', 'lire', 'lisent'], correct: 1 },
      { sentence: 'Ils ___ du football.', options: ['joue', 'joues', 'jouent', 'jouez'], correct: 2 },
      { sentence: 'Tu ___ content.', options: ['es', 'est', 'suis', 'sont'], correct: 0 },
      { sentence: '___ pommes sont rouges.', options: ['Le', 'La', 'Les', 'Un'], correct: 2 },
      { sentence: 'Je ___ mangé une pomme.', options: ['ai', 'as', 'a', 'avons'], correct: 0 },
      { sentence: 'Nous ___ au cinéma hier.', options: ['allons', 'sommes allés', 'va', 'irons'], correct: 1 },
    ],
    german: [
      { sentence: 'Ich ___ Deutsch.', options: ['spreche', 'sprichst', 'spricht', 'sprechen'], correct: 0 },
      { sentence: 'Er ___ ein Buch.', options: ['lese', 'liest', 'lesen', 'lest'], correct: 1 },
      { sentence: 'Wir ___ nach Berlin.', options: ['fahre', 'fährst', 'fahren', 'fahrt'], correct: 2 },
      { sentence: '___ Hund ist groß.', options: ['Der', 'Die', 'Das', 'Den'], correct: 0 },
      { sentence: 'Ich ___ einen Hund.', options: ['habe', 'hast', 'hat', 'haben'], correct: 0 },
      { sentence: 'Sie ___ gern Musik.', options: ['höre', 'hörst', 'hört', 'hören'], correct: 2 },
    ],
    sanskrit: [
      { sentence: 'बालक: विद्यालयं ___ ।', options: ['गच्छति', 'गच्छसि', 'गच्छामि', 'गच्छन्ति'], correct: 0 },
      { sentence: 'अहं संस्कृतं ___ ।', options: ['पठति', 'पठसि', 'पठामि', 'पठन्ति'], correct: 2 },
      { sentence: 'ते फलानि ___ ।', options: ['खादति', 'खादसि', 'खादामि', 'खादन्ति'], correct: 3 },
      { sentence: 'सा गीतं ___ ।', options: ['गायति', 'गायसि', 'गायामि', 'गायन्ति'], correct: 0 },
    ],
    spanish: [
      { sentence: 'Yo ___ español.', options: ['hablo', 'hablas', 'habla', 'hablamos'], correct: 0 },
      { sentence: 'Ella ___ un libro.', options: ['leo', 'lees', 'lee', 'leemos'], correct: 2 },
      { sentence: 'Nosotros ___ al cine.', options: ['voy', 'vas', 'vamos', 'van'], correct: 2 },
      { sentence: 'Tú ___ muy bien.', options: ['cocino', 'cocinas', 'cocina', 'cocinan'], correct: 1 },
    ],
  };

  const SENTENCES = {
    french: [
      { words: ['Je', 'vais', 'à', 'l\'école', 'tous', 'les', 'jours'], correct: 'Je vais à l\'école tous les jours' },
      { words: ['Nous', 'aimons', 'manger', 'des', 'fruits'], correct: 'Nous aimons manger des fruits' },
      { words: ['Elle', 'lit', 'un', 'livre', 'intéressant'], correct: 'Elle lit un livre intéressant' },
      { words: ['Ils', 'jouent', 'au', 'football', 'le', 'samedi'], correct: 'Ils jouent au football le samedi' },
    ],
    german: [
      { words: ['Ich', 'gehe', 'in', 'die', 'Schule'], correct: 'Ich gehe in die Schule' },
      { words: ['Er', 'liest', 'ein', 'gutes', 'Buch'], correct: 'Er liest ein gutes Buch' },
      { words: ['Wir', 'fahren', 'nach', 'Berlin', 'morgen'], correct: 'Wir fahren nach Berlin morgen' },
    ],
    sanskrit: [
      { words: ['बालक:', 'विद्यालयं', 'गच्छति'], correct: 'बालक: विद्यालयं गच्छति' },
      { words: ['अहं', 'पुस्तकं', 'पठामि'], correct: 'अहं पुस्तकं पठामि' },
      { words: ['सा', 'गीतं', 'गायति'], correct: 'सा गीतं गायति' },
    ],
    spanish: [
      { words: ['Yo', 'hablo', 'español', 'muy', 'bien'], correct: 'Yo hablo español muy bien' },
      { words: ['Ella', 'come', 'una', 'manzana', 'roja'], correct: 'Ella come una manzana roja' },
    ],
  };

  function getVocab() { return VOCAB[lang] || VOCAB.french; }
  function getGrammar() { return GRAMMAR[lang] || GRAMMAR.french; }
  function getSentences() { return SENTENCES[lang] || SENTENCES.french; }
  function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  let currentGame = null;
  let gameTimer = null;
  let gameState = {};

  window.startGame = function (type) {
    currentGame = type;
    document.getElementById('gameArena').style.display = '';
    document.getElementById('gameArena').scrollIntoView({ behavior: 'smooth' });

    if (type === 'vocab-match') startVocabMatch();
    else if (type === 'grammar-race') startGrammarRace();
    else if (type === 'sentence-scramble') startSentenceScramble();
    else if (type === 'flashcard-flip') startFlashcardFlip();
  };

  window.quitGame = function () {
    if (gameTimer) clearInterval(gameTimer);
    document.getElementById('gameArena').style.display = 'none';
    currentGame = null;
  };

  window.backToGames = function () {
    document.getElementById('gameOverlay').style.display = 'none';
    document.getElementById('gameArena').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function startTimer(seconds, onTick, onDone) {
    let remaining = seconds;
    const timerEl = document.getElementById('arenaTimer');
    const progressEl = document.getElementById('arenaProgress');
    timerEl.textContent = remaining;
    timerEl.classList.remove('warning');

    if (gameTimer) clearInterval(gameTimer);
    gameTimer = setInterval(() => {
      remaining--;
      timerEl.textContent = remaining;
      progressEl.style.width = (remaining / seconds * 100) + '%';
      if (remaining <= 10) timerEl.classList.add('warning');
      if (onTick) onTick(remaining);
      if (remaining <= 0) {
        clearInterval(gameTimer);
        if (onDone) onDone();
      }
    }, 1000);
  }

  function showGameOver(score, correct, wrong, xp) {
    const overlay = document.getElementById('gameOverlay');
    overlay.style.display = '';

    const emoji = score >= 80 ? '🏆' : score >= 50 ? '⭐' : '👍';
    document.getElementById('goEmoji').textContent = emoji;
    document.getElementById('goTitle').textContent = score >= 80 ? 'Amazing!' : score >= 50 ? 'Good job!' : 'Keep practicing!';
    document.getElementById('goScore').textContent = score;
    document.getElementById('goCorrect').textContent = correct;
    document.getElementById('goWrong').textContent = wrong;
    document.getElementById('goXP').textContent = '+' + xp + ' XP';

    // Award XP
    const s = getStudent();
    if (s) {
      s.total_xp = (s.total_xp || 0) + xp;
      localStorage.setItem('ll_student', JSON.stringify(s));
      document.getElementById('navXP').textContent = s.total_xp + ' XP';
    }

    // Save stats
    saveGameStats(score, xp);

    document.getElementById('goPlayAgain').onclick = () => {
      overlay.style.display = 'none';
      startGame(currentGame);
    };
  }

  function saveGameStats(score, xp) {
    const today = new Date().toISOString().slice(0, 10);
    const stats = JSON.parse(localStorage.getItem('ll_game_stats') || '{}');
    if (!stats[today]) stats[today] = { games: 0, xp: 0, highScore: 0, bestCombo: 0 };
    stats[today].games++;
    stats[today].xp += xp;
    if (score > stats[today].highScore) stats[today].highScore = score;
    if (gameState.bestCombo > stats[today].bestCombo) stats[today].bestCombo = gameState.bestCombo;
    localStorage.setItem('ll_game_stats', JSON.stringify(stats));
    updateTodayStats();
  }

  function updateTodayStats() {
    const today = new Date().toISOString().slice(0, 10);
    const stats = JSON.parse(localStorage.getItem('ll_game_stats') || '{}');
    const s = stats[today] || { games: 0, xp: 0, highScore: 0, bestCombo: 0 };
    document.getElementById('tsGamesPlayed').textContent = s.games;
    document.getElementById('tsXPEarned').textContent = s.xp;
    document.getElementById('tsHighScore').textContent = s.highScore;
    document.getElementById('tsBestCombo').textContent = s.bestCombo;
  }

  updateTodayStats();

  // ===== GAME 1: VOCABULARY MATCH =====
  function startVocabMatch() {
    document.getElementById('arenaTitle').textContent = '🔤 Vocabulary Match';
    gameState = { score: 0, correct: 0, wrong: 0, combo: 0, bestCombo: 0, selectedWord: null };

    const vocab = shuffle(getVocab()).slice(0, 6);
    const words = shuffle(vocab.map(v => ({ id: v.word, text: v.word, type: 'word' })));
    const meanings = shuffle(vocab.map(v => ({ id: v.word, text: v.meaning, type: 'meaning' })));

    const body = document.getElementById('arenaBody');
    body.innerHTML = `
      <div class="vm-grid">
        <div class="vm-column">
          <div class="vm-col-title">Word</div>
          ${words.map(w => `<div class="vm-item vm-word" data-id="${w.id}" onclick="vmSelect(this, 'word')">${w.text}</div>`).join('')}
        </div>
        <div class="vm-column">
          <div class="vm-col-title">Meaning</div>
          ${meanings.map(m => `<div class="vm-item vm-meaning" data-id="${m.id}" onclick="vmSelect(this, 'meaning')">${m.text}</div>`).join('')}
        </div>
      </div>
    `;

    updateCombo();
    startTimer(60, null, () => {
      const xp = Math.max(5, gameState.correct * 3);
      showGameOver(gameState.score, gameState.correct, gameState.wrong, xp);
    });
  }

  window.vmSelect = function (el, type) {
    if (el.classList.contains('matched')) return;

    if (type === 'word') {
      document.querySelectorAll('.vm-word').forEach(w => w.classList.remove('selected'));
      el.classList.add('selected');
      gameState.selectedWord = el;
    } else if (type === 'meaning' && gameState.selectedWord) {
      const wordId = gameState.selectedWord.dataset.id;
      const meaningId = el.dataset.id;

      if (wordId === meaningId) {
        gameState.selectedWord.classList.add('correct', 'matched');
        el.classList.add('correct', 'matched');
        gameState.correct++;
        gameState.combo++;
        if (gameState.combo > gameState.bestCombo) gameState.bestCombo = gameState.combo;
        gameState.score += 10 * Math.min(gameState.combo, 5);
        updateCombo();

        setTimeout(() => {
          gameState.selectedWord.classList.remove('correct');
          el.classList.remove('correct');
        }, 500);

        if (gameState.correct >= 6) {
          clearInterval(gameTimer);
          setTimeout(() => {
            const xp = Math.max(10, gameState.correct * 3);
            showGameOver(gameState.score, gameState.correct, gameState.wrong, xp);
          }, 600);
        }
      } else {
        gameState.selectedWord.classList.add('wrong');
        el.classList.add('wrong');
        gameState.wrong++;
        gameState.combo = 0;
        updateCombo();
        setTimeout(() => {
          gameState.selectedWord.classList.remove('wrong', 'selected');
          el.classList.remove('wrong');
        }, 500);
      }
      gameState.selectedWord = null;
      document.getElementById('arenaScore').innerHTML = 'Score: <strong>' + gameState.score + '</strong>';
    }
  };

  function updateCombo() {
    const comboEl = document.getElementById('arenaCombo');
    if (gameState.combo >= 2) {
      comboEl.style.display = '';
      document.getElementById('comboCount').textContent = gameState.combo;
      comboEl.style.animation = 'none';
      comboEl.offsetHeight;
      comboEl.style.animation = '';
    } else {
      comboEl.style.display = 'none';
    }
  }

  // ===== GAME 2: GRAMMAR RACE =====
  function startGrammarRace() {
    document.getElementById('arenaTitle').textContent = '🏎️ Grammar Race';
    gameState = { score: 0, correct: 0, wrong: 0, combo: 0, bestCombo: 0, qIndex: 0 };

    const questions = shuffle(getGrammar());
    gameState.questions = questions;

    showGrammarQ(0);
    startTimer(90, null, () => {
      const xp = Math.max(5, gameState.correct * 4);
      showGameOver(gameState.score, gameState.correct, gameState.wrong, xp);
    });
  }

  function showGrammarQ(idx) {
    if (idx >= gameState.questions.length) {
      clearInterval(gameTimer);
      const xp = Math.max(10, gameState.correct * 4);
      showGameOver(gameState.score, gameState.correct, gameState.wrong, xp);
      return;
    }

    const q = gameState.questions[idx];
    const parts = q.sentence.split('___');
    const body = document.getElementById('arenaBody');
    body.innerHTML = `
      <div class="gr-sentence">${parts[0]}<span class="gr-blank" id="grBlank">?</span>${parts[1] || ''}</div>
      <div class="gr-options">
        ${q.options.map((opt, i) => `<button class="gr-option" onclick="grAnswer(${i})">${opt}</button>`).join('')}
      </div>
      <div class="gr-feedback" id="grFeedback"></div>
    `;
  }

  window.grAnswer = function (idx) {
    const q = gameState.questions[gameState.qIndex];
    const options = document.querySelectorAll('.gr-option');
    const feedback = document.getElementById('grFeedback');

    options.forEach(o => o.style.pointerEvents = 'none');

    if (idx === q.correct) {
      options[idx].classList.add('correct');
      document.getElementById('grBlank').textContent = q.options[q.correct];
      gameState.correct++;
      gameState.combo++;
      if (gameState.combo > gameState.bestCombo) gameState.bestCombo = gameState.combo;
      gameState.score += 10 * Math.min(gameState.combo, 5);
      feedback.innerHTML = '<span style="color:#059669">✅ Correct!</span>';
      updateCombo();
    } else {
      options[idx].classList.add('wrong');
      options[q.correct].classList.add('correct');
      document.getElementById('grBlank').textContent = q.options[q.correct];
      gameState.wrong++;
      gameState.combo = 0;
      feedback.innerHTML = '<span style="color:#ef4444">❌ The answer is: ' + q.options[q.correct] + '</span>';
      updateCombo();
    }

    document.getElementById('arenaScore').innerHTML = 'Score: <strong>' + gameState.score + '</strong>';

    setTimeout(() => {
      gameState.qIndex++;
      showGrammarQ(gameState.qIndex);
    }, 1200);
  };

  // ===== GAME 3: SENTENCE SCRAMBLE =====
  function startSentenceScramble() {
    document.getElementById('arenaTitle').textContent = '🧩 Sentence Scramble';
    gameState = { score: 0, correct: 0, wrong: 0, combo: 0, bestCombo: 0, sIndex: 0, placed: [] };

    const sentences = shuffle(getSentences());
    gameState.sentences = sentences;

    showScrambleQ(0);
    startTimer(120, null, () => {
      const xp = Math.max(5, gameState.correct * 5);
      showGameOver(gameState.score, gameState.correct, gameState.wrong, xp);
    });
  }

  function showScrambleQ(idx) {
    if (idx >= gameState.sentences.length) {
      clearInterval(gameTimer);
      const xp = Math.max(10, gameState.correct * 5);
      showGameOver(gameState.score, gameState.correct, gameState.wrong, xp);
      return;
    }

    gameState.placed = [];
    const s = gameState.sentences[idx];
    const scrambled = shuffle(s.words);
    const body = document.getElementById('arenaBody');
    body.innerHTML = `
      <div class="ss-target">Arrange these words into a correct sentence:</div>
      <div class="ss-dropzone" id="ssDropzone"></div>
      <div class="ss-words" id="ssWords">
        ${scrambled.map((w, i) => `<div class="ss-word" data-idx="${i}" onclick="ssToggle(this)">${w}</div>`).join('')}
      </div>
      <button class="btn btn-primary ss-check-btn" onclick="ssCheck()">Check Sentence</button>
      <div class="gr-feedback" id="ssFeedback"></div>
    `;
  }

  window.ssToggle = function (el) {
    const word = el.textContent;
    const dropzone = document.getElementById('ssDropzone');

    if (el.classList.contains('placed')) {
      el.classList.remove('placed');
      gameState.placed = gameState.placed.filter(w => w !== word);
      const clone = dropzone.querySelector(`[data-word="${word}"]`);
      if (clone) clone.remove();
    } else {
      el.classList.add('placed');
      gameState.placed.push(word);
      const chip = document.createElement('div');
      chip.className = 'ss-word placed';
      chip.dataset.word = word;
      chip.textContent = word;
      chip.onclick = () => {
        el.classList.remove('placed');
        gameState.placed = gameState.placed.filter(w => w !== word);
        chip.remove();
      };
      dropzone.appendChild(chip);
    }
  };

  window.ssCheck = function () {
    const s = gameState.sentences[gameState.sIndex];
    const answer = gameState.placed.join(' ');
    const feedback = document.getElementById('ssFeedback');

    if (answer === s.correct) {
      gameState.correct++;
      gameState.combo++;
      if (gameState.combo > gameState.bestCombo) gameState.bestCombo = gameState.combo;
      gameState.score += 15 * Math.min(gameState.combo, 3);
      feedback.innerHTML = '<span style="color:#059669">✅ Perfect!</span>';
      updateCombo();
    } else {
      gameState.wrong++;
      gameState.combo = 0;
      feedback.innerHTML = '<span style="color:#ef4444">❌ Correct: ' + s.correct + '</span>';
      updateCombo();
    }

    document.getElementById('arenaScore').innerHTML = 'Score: <strong>' + gameState.score + '</strong>';

    setTimeout(() => {
      gameState.sIndex++;
      showScrambleQ(gameState.sIndex);
    }, 1500);
  };

  // ===== GAME 4: FLASHCARD FLIP (Memory) =====
  function startFlashcardFlip() {
    document.getElementById('arenaTitle').textContent = '🃏 Flashcard Flip';
    gameState = { score: 0, correct: 0, wrong: 0, combo: 0, bestCombo: 0, flipped: [], matched: 0, locked: false };

    const vocab = shuffle(getVocab()).slice(0, 8);
    const cards = shuffle([
      ...vocab.map(v => ({ id: v.word, text: v.word, type: 'word' })),
      ...vocab.map(v => ({ id: v.word, text: v.meaning, type: 'meaning' })),
    ]);

    const body = document.getElementById('arenaBody');
    body.innerHTML = `
      <div class="ff-grid">
        ${cards.map((c, i) => `
          <div class="ff-card" data-idx="${i}" data-id="${c.id}" data-type="${c.type}" onclick="ffFlip(this)">
            <div class="ff-card-inner">
              <div class="ff-card-front">?</div>
              <div class="ff-card-back">${c.text}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('arenaTimer').textContent = '—';
    document.getElementById('arenaProgress').style.width = '100%';
    if (gameTimer) clearInterval(gameTimer);
  }

  window.ffFlip = function (el) {
    if (gameState.locked || el.classList.contains('flipped') || el.classList.contains('matched')) return;

    el.classList.add('flipped');
    gameState.flipped.push(el);

    if (gameState.flipped.length === 2) {
      gameState.locked = true;
      const [a, b] = gameState.flipped;
      const match = a.dataset.id === b.dataset.id && a.dataset.type !== b.dataset.type;

      setTimeout(() => {
        if (match) {
          a.classList.add('matched');
          b.classList.add('matched');
          gameState.correct++;
          gameState.combo++;
          if (gameState.combo > gameState.bestCombo) gameState.bestCombo = gameState.combo;
          gameState.score += 10 * Math.min(gameState.combo, 4);
          gameState.matched++;
          updateCombo();

          if (gameState.matched >= 8) {
            setTimeout(() => {
              const xp = Math.max(10, gameState.correct * 2);
              showGameOver(gameState.score, gameState.correct, gameState.wrong, xp);
            }, 500);
          }
        } else {
          a.classList.add('wrong');
          b.classList.add('wrong');
          gameState.wrong++;
          gameState.combo = 0;
          updateCombo();
          setTimeout(() => {
            a.classList.remove('flipped', 'wrong');
            b.classList.remove('flipped', 'wrong');
          }, 600);
        }

        document.getElementById('arenaScore').innerHTML = 'Score: <strong>' + gameState.score + '</strong>';
        gameState.flipped = [];
        gameState.locked = false;
      }, 700);
    }
  };
})();
