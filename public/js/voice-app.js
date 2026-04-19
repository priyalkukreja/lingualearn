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

  // Pronunciation word bank — filtered by student's language
  const PRON_BANKS = {
    french: [
      { text: 'Bonjour', lang: 'fr-FR' },
      { text: 'Comment allez-vous', lang: 'fr-FR' },
      { text: 'Merci beaucoup', lang: 'fr-FR' },
      { text: 'Je suis étudiant', lang: 'fr-FR' },
      { text: 'S\'il vous plaît', lang: 'fr-FR' },
      { text: 'Bonne journée', lang: 'fr-FR' },
      { text: 'Je m\'appelle', lang: 'fr-FR' },
      { text: 'Au revoir', lang: 'fr-FR' },
      { text: 'Excusez-moi', lang: 'fr-FR' },
      { text: 'Très bien', lang: 'fr-FR' },
    ],
    german: [
      { text: 'Guten Morgen', lang: 'de-DE' },
      { text: 'Wie geht es Ihnen', lang: 'de-DE' },
      { text: 'Danke schön', lang: 'de-DE' },
      { text: 'Ich heiße', lang: 'de-DE' },
      { text: 'Auf Wiedersehen', lang: 'de-DE' },
      { text: 'Bitte schön', lang: 'de-DE' },
      { text: 'Entschuldigung', lang: 'de-DE' },
      { text: 'Guten Abend', lang: 'de-DE' },
      { text: 'Ich verstehe', lang: 'de-DE' },
      { text: 'Sehr gut', lang: 'de-DE' },
    ],
    hindi: [
      { text: 'नमस्ते', lang: 'hi-IN' },
      { text: 'आप कैसे हैं', lang: 'hi-IN' },
      { text: 'धन्यवाद', lang: 'hi-IN' },
      { text: 'मुझे हिंदी आती है', lang: 'hi-IN' },
      { text: 'मेरा नाम है', lang: 'hi-IN' },
      { text: 'शुभ प्रभात', lang: 'hi-IN' },
      { text: 'कृपया', lang: 'hi-IN' },
      { text: 'माफ़ कीजिए', lang: 'hi-IN' },
      { text: 'बहुत अच्छा', lang: 'hi-IN' },
      { text: 'अलविदा', lang: 'hi-IN' },
    ],
    sanskrit: [
      { text: 'नमस्ते', lang: 'hi-IN' },
      { text: 'धन्यवादः', lang: 'hi-IN' },
      { text: 'कथं अस्ति', lang: 'hi-IN' },
      { text: 'मम नाम अस्ति', lang: 'hi-IN' },
      { text: 'अहं गच्छामि', lang: 'hi-IN' },
      { text: 'सर्वं कुशलम्', lang: 'hi-IN' },
      { text: 'शुभं भवतु', lang: 'hi-IN' },
      { text: 'पुनः मिलामः', lang: 'hi-IN' },
    ],
    spanish: [
      { text: 'Buenos días', lang: 'es-ES' },
      { text: 'Cómo estás', lang: 'es-ES' },
      { text: 'Muchas gracias', lang: 'es-ES' },
      { text: 'Me llamo', lang: 'es-ES' },
      { text: 'Por favor', lang: 'es-ES' },
      { text: 'Hasta luego', lang: 'es-ES' },
      { text: 'Disculpe', lang: 'es-ES' },
      { text: 'Buenas noches', lang: 'es-ES' },
      { text: 'Muy bien', lang: 'es-ES' },
      { text: 'De nada', lang: 'es-ES' },
    ],
  };
  const wordBank = PRON_BANKS[studentLang] || PRON_BANKS.french;
  let wordIndex = 0;

  const student = getStudent();
  const studentLang = student?.language || 'french';

  // Language-specific oral exam questions with expected keywords for real scoring
  const ORAL_BANKS = {
    french: [
      { q: 'Introduce yourself in French. Say your name and age.', keywords: ['je', 'appelle', 'suis', 'ans', 'nom', 'bonjour', 'salut', 'ai', 'mon', 'moi'], minWords: 4 },
      { q: 'Describe your family in French.', keywords: ['famille', 'père', 'mère', 'frère', 'soeur', 'parents', 'grand', 'mon', 'ma', 'mes', 'il', 'elle'], minWords: 5 },
      { q: 'What do you like to eat? Answer in French.', keywords: ['aime', 'manger', 'adore', 'préfère', 'nourriture', 'poulet', 'riz', 'fruit', 'pain', 'fromage', 'gâteau', 'chocolat'], minWords: 4 },
      { q: 'Describe your school in French.', keywords: ['école', 'lycée', 'collège', 'classe', 'professeur', 'élève', 'grande', 'belle', 'matière', 'aime', 'étudie'], minWords: 4 },
      { q: 'What is your daily routine? Answer in French.', keywords: ['matin', 'lève', 'mange', 'vais', 'école', 'étudie', 'soir', 'dors', 'joue', 'heure', 'après', 'midi'], minWords: 5 },
    ],
    german: [
      { q: 'Introduce yourself in German. Say your name and where you live.', keywords: ['ich', 'heiße', 'bin', 'wohne', 'name', 'jahre', 'alt', 'guten', 'tag', 'mein'], minWords: 4 },
      { q: 'Describe your family in German.', keywords: ['familie', 'vater', 'mutter', 'bruder', 'schwester', 'eltern', 'groß', 'mein', 'meine'], minWords: 5 },
      { q: 'What are your hobbies? Answer in German.', keywords: ['hobby', 'spiele', 'lese', 'gern', 'gerne', 'fußball', 'musik', 'sport', 'mag', 'liebe', 'schwimmen'], minWords: 4 },
      { q: 'Describe your school in German.', keywords: ['schule', 'klasse', 'lehrer', 'fach', 'schüler', 'groß', 'lernen', 'lerne', 'deutsch', 'mathe'], minWords: 4 },
      { q: 'What do you eat for breakfast? Answer in German.', keywords: ['frühstück', 'esse', 'trinke', 'brot', 'milch', 'ei', 'morgen', 'morgens', 'kaffee', 'saft'], minWords: 4 },
    ],
    sanskrit: [
      { q: 'Introduce yourself in Sanskrit.', keywords: ['अहं', 'मम', 'नाम', 'नमस्ते', 'अस्ति', 'पठामि', 'वदामि'], minWords: 3 },
      { q: 'Describe your family in Sanskrit.', keywords: ['परिवार', 'पिता', 'माता', 'भ्राता', 'भगिनी', 'मम', 'अस्ति', 'सन्ति'], minWords: 3 },
      { q: 'Name things in your classroom in Sanskrit.', keywords: ['कक्षा', 'पुस्तकम्', 'लेखनी', 'पीठम्', 'फलकम्', 'शिक्षक', 'अस्ति', 'सन्ति'], minWords: 3 },
      { q: 'What do you do daily? Answer in Sanskrit.', keywords: ['प्रतिदिनं', 'उत्तिष्ठामि', 'पठामि', 'खादामि', 'गच्छामि', 'क्रीडामि', 'विद्यालयं'], minWords: 3 },
      { q: 'Which subject do you like? Answer in Sanskrit.', keywords: ['विषय', 'रोचते', 'मम', 'गणितम्', 'संस्कृतम्', 'विज्ञानम्', 'प्रिय'], minWords: 3 },
    ],
    spanish: [
      { q: 'Introduce yourself in Spanish. Say your name and age.', keywords: ['me', 'llamo', 'soy', 'tengo', 'años', 'hola', 'nombre', 'mi'], minWords: 4 },
      { q: 'Describe your family in Spanish.', keywords: ['familia', 'padre', 'madre', 'hermano', 'hermana', 'mi', 'mis', 'tiene', 'es'], minWords: 5 },
      { q: 'What do you like to do? Answer in Spanish.', keywords: ['gusta', 'gustan', 'jugar', 'leer', 'comer', 'estudiar', 'música', 'deporte', 'me'], minWords: 4 },
      { q: 'Describe your school in Spanish.', keywords: ['escuela', 'colegio', 'clase', 'profesor', 'grande', 'bonita', 'estudio', 'aprendo', 'materia'], minWords: 4 },
      { q: 'What did you eat today? Answer in Spanish.', keywords: ['comí', 'comido', 'desayuno', 'almuerzo', 'arroz', 'pan', 'fruta', 'leche', 'como', 'hoy'], minWords: 4 },
    ],
    hindi: [
      { q: 'Introduce yourself in Hindi.', keywords: ['मेरा', 'नाम', 'है', 'मैं', 'हूँ', 'हूं', 'कक्षा', 'में', 'पढ़ता', 'पढ़ती', 'नमस्ते'], minWords: 4 },
      { q: 'Describe your family in Hindi.', keywords: ['परिवार', 'पिता', 'माता', 'भाई', 'बहन', 'मेरे', 'मेरी', 'हैं', 'है'], minWords: 5 },
      { q: 'What is your favourite subject? Answer in Hindi.', keywords: ['विषय', 'पसंद', 'पसन्द', 'मुझे', 'अच्छा', 'लगता', 'लगती', 'गणित', 'हिंदी', 'विज्ञान', 'प्रिय'], minWords: 4 },
      { q: 'Describe your school in Hindi.', keywords: ['विद्यालय', 'स्कूल', 'कक्षा', 'शिक्षक', 'बड़ा', 'सुंदर', 'पढ़ाई', 'छात्र', 'में'], minWords: 4 },
      { q: 'What do you do after school? Answer in Hindi.', keywords: ['बाद', 'खेलता', 'खेलती', 'पढ़ता', 'पढ़ती', 'खाना', 'घर', 'शाम', 'दोस्त', 'करता', 'करती'], minWords: 4 },
    ],
  };

  function getOralQuestions() {
    return ORAL_BANKS[studentLang] || ORAL_BANKS.french;
  }

  const oralQuestions = getOralQuestions();
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
      const confidence = e.results[0][0].confidence || 0;
      stopRecording();
      handleResult(transcript, confidence);
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

  const LANG_CODES = {
    french: 'fr-FR', german: 'de-DE', hindi: 'hi-IN', sanskrit: 'hi-IN',
    spanish: 'es-ES', japanese: 'ja-JP', korean: 'ko-KR', mandarin: 'zh-CN', russian: 'ru-RU'
  };

  function getLangForMode() {
    if (currentMode === 'pronunciation') {
      return wordBank[wordIndex]?.lang || 'en-US';
    }
    if (currentMode === 'oral') {
      return LANG_CODES[studentLang] || 'en-US';
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
  let lastConfidence = 0;
  function handleResult(transcript, confidence) {
    lastConfidence = confidence;
    detectedArea.style.display = '';
    detectedText.textContent = transcript;

    if (currentMode === 'qa') handleQA(transcript);
    else if (currentMode === 'pronunciation') handlePronunciation(transcript);
    else if (currentMode === 'oral') handleOral(transcript, confidence);
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

  /* ---- Oral Exam — Real Scoring ---- */

  function scoreOralAnswer(answer, confidence, questionData) {
    const words = answer.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const keywords = questionData.keywords || [];
    const minWords = questionData.minWords || 4;

    // 1. Keyword score (0-40): how many expected keywords appeared
    let keywordHits = 0;
    keywords.forEach(kw => {
      if (words.some(w => w.includes(kw.toLowerCase()) || kw.toLowerCase().includes(w))) {
        keywordHits++;
      }
    });
    const keywordRatio = Math.min(1, keywordHits / Math.max(1, Math.min(5, keywords.length)));
    const keywordScore = Math.round(keywordRatio * 40);

    // 2. Fluency / length score (0-25): did they say enough words?
    const lengthRatio = Math.min(1, wordCount / (minWords * 1.5));
    const lengthScore = Math.round(lengthRatio * 25);

    // 3. Confidence score (0-25): how clearly the browser understood them
    const confScore = Math.round(Math.min(1, confidence) * 25);

    // 4. Attempt bonus (10): they spoke something (not empty)
    const attemptBonus = wordCount >= 2 ? 10 : (wordCount >= 1 ? 5 : 0);

    const total = Math.min(100, keywordScore + lengthScore + confScore + attemptBonus);

    return {
      total,
      keywordScore,
      keywordHits,
      keywordTotal: Math.min(5, keywords.length),
      lengthScore,
      wordCount,
      confScore,
      confidence: Math.round(confidence * 100),
      attemptBonus
    };
  }

  function handleOral(answer, confidence) {
    const qData = oralQuestions[oralIdx];
    const scores = scoreOralAnswer(answer, confidence, qData);

    oralRecords.push({
      question: qData.q,
      answer,
      scores
    });

    const gradeColor = scores.total >= 70 ? '#059669' : scores.total >= 45 ? '#d97706' : '#dc2626';
    const gradeLabel = scores.total >= 70 ? 'Good' : scores.total >= 45 ? 'Fair' : 'Needs Practice';

    const card = document.createElement('div');
    card.className = 'oral-answer-card';
    card.innerHTML = `
      <div class="oa-q">Q${oralIdx + 1}: ${qData.q}</div>
      <div class="oa-a">${answer}</div>
      <div class="oa-score-bar" style="display:flex;gap:0.5rem;align-items:center;margin-top:0.5rem;flex-wrap:wrap">
        <span style="background:${gradeColor};color:white;padding:0.2rem 0.6rem;border-radius:8px;font-size:0.78rem;font-weight:800">${scores.total}% — ${gradeLabel}</span>
        <span style="font-size:0.72rem;color:#6b7280" title="Keywords matched">🔑 ${scores.keywordHits}/${scores.keywordTotal}</span>
        <span style="font-size:0.72rem;color:#6b7280" title="Words spoken">💬 ${scores.wordCount} words</span>
        <span style="font-size:0.72rem;color:#6b7280" title="Speech clarity">🎯 ${scores.confidence}% clear</span>
      </div>
    `;
    oralAnswers.appendChild(card);

    if (scores.total >= 70) speak('Good answer!');
    else if (scores.total >= 45) speak('Fair attempt. Try using more vocabulary.');
    else speak('Try again with more detail.');

    oralIdx++;
    if (oralIdx < oralQuestions.length) {
      setTimeout(() => showOralQuestion(), 1500);
    } else {
      setTimeout(() => finishOralExam(), 1500);
    }
  }

  function showOralQuestion() {
    oralQ.style.display = '';
    oralQNum.textContent = oralIdx + 1;
    oralQText.textContent = oralQuestions[oralIdx].q;
    speak(oralQuestions[oralIdx].q);
  }

  function finishOralExam() {
    oralQ.style.display = 'none';
    oralResult.style.display = '';

    const totalScore = Math.round(oralRecords.reduce((sum, r) => sum + r.scores.total, 0) / oralRecords.length);
    const totalKeywords = oralRecords.reduce((sum, r) => sum + r.scores.keywordHits, 0);
    const totalWords = oralRecords.reduce((sum, r) => sum + r.scores.wordCount, 0);
    const avgClarity = Math.round(oralRecords.reduce((sum, r) => sum + r.scores.confidence, 0) / oralRecords.length);

    const grade = totalScore >= 80 ? 'Excellent' : totalScore >= 60 ? 'Good' : totalScore >= 40 ? 'Needs Improvement' : 'Keep Practicing';
    const gradeColor = totalScore >= 80 ? '#059669' : totalScore >= 60 ? '#2563eb' : totalScore >= 40 ? '#d97706' : '#dc2626';
    const tip = totalScore >= 80
      ? 'Outstanding! Your vocabulary and fluency are strong.'
      : totalScore >= 60
        ? 'Good job! Try using more keywords and longer sentences to improve.'
        : totalScore >= 40
          ? 'You\'re getting there. Focus on using the target language instead of English.'
          : 'Regular speaking practice will help. Try listening to the question carefully and using key vocabulary.';

    oralFinal.innerHTML = `
      <div style="text-align:center">
        <p style="font-size:2.5rem;font-weight:900;color:${gradeColor};margin:0.5rem 0">${totalScore}%</p>
        <p style="font-size:1.1rem;font-weight:800;color:${gradeColor};margin-bottom:1rem">${grade}</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.5rem;margin:1rem 0">
        <div style="text-align:center;padding:0.6rem;background:#f3f4f6;border-radius:10px">
          <div style="font-size:1.2rem;font-weight:900;color:#1a1a2e">🔑 ${totalKeywords}</div>
          <div style="font-size:0.72rem;color:#6b7280;font-weight:700">Keywords Used</div>
        </div>
        <div style="text-align:center;padding:0.6rem;background:#f3f4f6;border-radius:10px">
          <div style="font-size:1.2rem;font-weight:900;color:#1a1a2e">💬 ${totalWords}</div>
          <div style="font-size:0.72rem;color:#6b7280;font-weight:700">Total Words</div>
        </div>
        <div style="text-align:center;padding:0.6rem;background:#f3f4f6;border-radius:10px">
          <div style="font-size:1.2rem;font-weight:900;color:#1a1a2e">🎯 ${avgClarity}%</div>
          <div style="font-size:0.72rem;color:#6b7280;font-weight:700">Speech Clarity</div>
        </div>
        <div style="text-align:center;padding:0.6rem;background:#f3f4f6;border-radius:10px">
          <div style="font-size:1.2rem;font-weight:900;color:#1a1a2e">📝 ${oralRecords.length}</div>
          <div style="font-size:0.72rem;color:#6b7280;font-weight:700">Questions</div>
        </div>
      </div>
      <p style="font-size:0.88rem;color:#4b5563;line-height:1.5;font-weight:600">${tip}</p>
      <button class="btn btn-primary" style="width:100%;margin-top:1rem" onclick="document.getElementById('startExam').style.display='';document.getElementById('oralResult').style.display='none';document.getElementById('oralAnswers').innerHTML=''">Try Again</button>
    `;
    speak('Exam complete! You scored ' + totalScore + ' percent. ' + grade + '!');

    // Save oral exam result
    const pastOral = JSON.parse(localStorage.getItem('ll_oral_exams') || '[]');
    pastOral.unshift({
      date: new Date().toLocaleDateString('en-IN'),
      score: totalScore,
      keywords: totalKeywords,
      words: totalWords,
      clarity: avgClarity,
      lang: studentLang
    });
    if (pastOral.length > 20) pastOral.pop();
    localStorage.setItem('ll_oral_exams', JSON.stringify(pastOral));
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
