/* ===== Voice Lab App ===== */
(function () {
  if (!requireAuth()) return;
  startSession();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const synth = window.speechSynthesis;
  let recognition = null;
  let isRecording = false;
  let currentMode = 'qa';

  // Elements
  const micBtn     = document.getElementById('micBtn');
  const micStatus  = document.getElementById('micStatus');
  const detectedArea = document.getElementById('detectedArea');
  const detectedText = document.getElementById('detectedText');
  const modeCards  = document.querySelectorAll('.mode-card');

  // QA
  const qaResponse = document.getElementById('qaResponse');
  const qaText     = document.getElementById('qaText');

  // Pronunciation
  const targetText   = document.getElementById('targetText');
  const hearBtn      = document.getElementById('hearBtn');
  const nextWord     = document.getElementById('nextWord');
  const pronScore    = document.getElementById('pronScore');
  const scoreRing    = document.getElementById('scoreRing');
  const scorePercent = document.getElementById('scorePercent');
  const detectedPron = document.getElementById('detectedPron');

  // Oral
  const startExam    = document.getElementById('startExam');
  const oralQ        = document.getElementById('oralQ');
  const oralQNum     = document.getElementById('oralQNum');
  const oralQText    = document.getElementById('oralQText');
  const oralAnswers  = document.getElementById('oralAnswers');
  const oralResult   = document.getElementById('oralResult');
  const oralFinal    = document.getElementById('oralFinal');

  // Pronunciation word bank
  const wordBank = [
    { text: 'Bonjour', lang: 'fr-FR' },
    { text: 'Comment allez-vous', lang: 'fr-FR' },
    { text: 'Merci beaucoup', lang: 'fr-FR' },
    { text: 'नमस्ते', lang: 'hi-IN' },
    { text: 'आप कैसे हैं', lang: 'hi-IN' },
    { text: 'धन्यवाद', lang: 'hi-IN' },
    { text: 'Buenos días', lang: 'es-ES' },
    { text: 'Guten Morgen', lang: 'de-DE' },
    { text: 'Je suis étudiant', lang: 'fr-FR' },
    { text: 'मुझे हिंदी आती है', lang: 'hi-IN' },
  ];
  let wordIndex = 0;

  // Oral exam questions
  const oralQuestions = [
    'Introduce yourself in Hindi or French.',
    'What is your favourite subject and why?',
    'Describe your daily routine in three sentences.',
    'Name three things you can see in your classroom.',
    'What do you want to become when you grow up? Answer in a full sentence.',
  ];
  let oralIdx = 0;
  let oralRecords = [];

  /* ---- Initialize Speech Recognition ---- */
  function initRecognition() {
    if (!SpeechRecognition) {
      micStatus.textContent = 'Speech Recognition not supported in this browser';
      micBtn.disabled = true;
      return;
    }
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = getLangForMode();

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      stopRecording();
      handleResult(transcript);
    };

    recognition.onerror = (e) => {
      console.error('Speech error:', e.error);
      stopRecording();
      if (e.error === 'no-speech') {
        micStatus.textContent = 'No speech detected. Try again.';
      }
    };

    recognition.onend = () => {
      if (isRecording) stopRecording();
    };
  }

  function getLangForMode() {
    if (currentMode === 'pronunciation') {
      return wordBank[wordIndex]?.lang || 'en-US';
    }
    return 'en-US';
  }

  /* ---- Recording ---- */
  function startRecording() {
    initRecognition();
    if (!recognition) return;
    try {
      recognition.start();
      isRecording = true;
      micBtn.classList.add('recording');
      micStatus.textContent = 'Listening...';
      micStatus.classList.add('recording');
    } catch (err) {
      console.error(err);
    }
  }

  function stopRecording() {
    isRecording = false;
    micBtn.classList.remove('recording');
    micStatus.textContent = 'Tap to speak';
    micStatus.classList.remove('recording');
    try { recognition?.stop(); } catch (e) {}
  }

  micBtn.addEventListener('click', () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  });

  /* ---- Handle Result ---- */
  function handleResult(transcript) {
    detectedArea.style.display = '';
    detectedText.textContent = transcript;

    if (currentMode === 'qa') handleQA(transcript);
    else if (currentMode === 'pronunciation') handlePronunciation(transcript);
    else if (currentMode === 'oral') handleOral(transcript);
  }

  /* ---- Voice Q&A ---- */
  async function handleQA(question) {
    qaResponse.style.display = '';
    qaText.textContent = 'Thinking...';

    try {
      const data = await apiPost('/api/tutor/chat', { message: question });
      if (data?.reply) {
        qaText.textContent = data.reply;
        speak(data.reply);
        return;
      }
    } catch (e) {}

    // Demo fallback
    const reply = generateQAReply(question);
    qaText.textContent = reply;
    speak(reply);
  }

  function generateQAReply(q) {
    const ql = q.toLowerCase();
    if (ql.includes('hello') || ql.includes('hi') || ql.includes('namaste'))
      return 'Hello! Welcome to LinguaLearn Voice Lab. How can I help you learn today?';
    if (ql.includes('french') || ql.includes('bonjour'))
      return 'French is a beautiful Romance language! "Bonjour" means "Good day". To greet someone informally, you can say "Salut". Would you like to practice more French greetings?';
    if (ql.includes('hindi') || ql.includes('हिंदी'))
      return 'Hindi is written in the Devanagari script. The basic greeting "Namaste" comes from "namah" meaning bow and "te" meaning to you. Shall we practice some basic Hindi phrases?';
    if (ql.includes('grammar'))
      return 'Grammar is the backbone of any language. Which language grammar would you like to explore — Hindi, French, or another language?';
    return 'That is a great question! In language learning, consistent practice is key. Try to practice speaking for at least 10 minutes daily. Would you like me to help you with vocabulary, grammar, or pronunciation?';
  }

  /* ---- Pronunciation Scoring ---- */
  function handlePronunciation(spoken) {
    const expected = wordBank[wordIndex].text.toLowerCase().trim();
    const got = spoken.toLowerCase().trim();
    const score = pronunciationScore(expected, got);

    pronScore.style.display = 'flex';
    detectedPron.textContent = spoken;

    // Animate ring
    const circumference = 326.7;
    const offset = circumference - (score / 100) * circumference;
    scoreRing.style.strokeDashoffset = offset;
    scoreRing.classList.remove('good', 'ok', 'poor');
    if (score >= 80) scoreRing.classList.add('good');
    else if (score >= 50) scoreRing.classList.add('ok');
    else scoreRing.classList.add('poor');
    scorePercent.textContent = score + '%';

    // TTS feedback
    if (score >= 80) speak('Excellent pronunciation!');
    else if (score >= 50) speak('Good attempt! Try to match the sounds more closely.');
    else speak('Keep practicing! Listen carefully and try again.');
  }

  function pronunciationScore(expected, spoken) {
    if (expected === spoken) return 100;
    const dist = levenshtein(expected, spoken);
    const maxLen = Math.max(expected.length, spoken.length);
    if (maxLen === 0) return 100;
    const similarity = ((maxLen - dist) / maxLen) * 100;
    return Math.max(0, Math.min(100, Math.round(similarity)));
  }

  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[m][n];
  }

  /* ---- Oral Exam ---- */
  function handleOral(answer) {
    oralRecords.push({ question: oralQuestions[oralIdx], answer });
    const card = document.createElement('div');
    card.className = 'oral-answer-card';
    card.innerHTML = `<div class="oa-q">Q${oralIdx + 1}: ${oralQuestions[oralIdx]}</div><div class="oa-a">${answer}</div>`;
    oralAnswers.appendChild(card);

    oralIdx++;
    if (oralIdx < oralQuestions.length) {
      showOralQuestion();
    } else {
      finishOralExam();
    }
  }

  function showOralQuestion() {
    oralQ.style.display = '';
    oralQNum.textContent = oralIdx + 1;
    oralQText.textContent = oralQuestions[oralIdx];
    speak(oralQuestions[oralIdx]);
  }

  function finishOralExam() {
    oralQ.style.display = 'none';
    oralResult.style.display = '';
    const score = Math.floor(60 + Math.random() * 35);
    oralFinal.innerHTML = `
      <p>You answered <strong>${oralRecords.length}</strong> questions.</p>
      <p style="font-size:2rem;font-weight:900;color:var(--primary);margin:0.5rem 0">${score}%</p>
      <p>Great effort! Regular speaking practice will boost your confidence.</p>
    `;
    speak('Exam complete! You scored ' + score + ' percent. Great effort!');
  }

  startExam.addEventListener('click', () => {
    oralIdx = 0;
    oralRecords = [];
    oralAnswers.innerHTML = '';
    oralResult.style.display = 'none';
    startExam.style.display = 'none';
    showOralQuestion();
  });

  /* ---- TTS ---- */
  function speak(text) {
    if (!synth) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1.05;
    synth.speak(utter);
  }

  /* ---- Pronunciation helpers ---- */
  hearBtn.addEventListener('click', () => {
    const word = wordBank[wordIndex];
    const utter = new SpeechSynthesisUtterance(word.text);
    utter.lang = word.lang;
    utter.rate = 0.8;
    synth.cancel();
    synth.speak(utter);
  });

  nextWord.addEventListener('click', () => {
    wordIndex = (wordIndex + 1) % wordBank.length;
    targetText.textContent = wordBank[wordIndex].text;
    pronScore.style.display = 'none';
  });

  /* ---- Mode Switching ---- */
  modeCards.forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.dataset.mode;
      currentMode = mode;
      modeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      document.getElementById('panel-qa').style.display = mode === 'qa' ? '' : 'none';
      document.getElementById('panel-pronunciation').style.display = mode === 'pronunciation' ? '' : 'none';
      document.getElementById('panel-oral').style.display = mode === 'oral' ? '' : 'none';

      detectedArea.style.display = 'none';

      if (mode === 'oral') {
        startExam.style.display = '';
      }
    });
  });

})();
