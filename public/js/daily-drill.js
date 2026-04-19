/**
 * Daily Weakness Drill — Real questions targeting student's weakest topics
 * Zero API calls, all content pre-built matching CBSE syllabus
 */
(function () {
  const DRILL_KEY = 'll_daily_drill';
  const DRILL_HISTORY_KEY = 'll_drill_scores';

  const student = typeof getStudent === 'function' ? getStudent() : null;
  const lang = student?.language || 'french';

  // Real question banks per language per topic
  const QUESTION_BANKS = {
    french: {
      articles: [
        { q: '___ maison est grande.', options: ['La', 'Le', 'Les', 'Un'], answer: 0 },
        { q: 'J\'ai ___ livre intéressant.', options: ['un', 'une', 'des', 'le'], answer: 0 },
        { q: '___ enfants jouent dehors.', options: ['Les', 'Le', 'La', 'Des'], answer: 0 },
        { q: 'Elle mange ___ pomme.', options: ['une', 'un', 'le', 'des'], answer: 0 },
        { q: '___ école est fermée.', options: ['L\'', 'Le', 'La', 'Un'], answer: 0 },
        { q: 'Nous avons ___ amis.', options: ['des', 'un', 'une', 'le'], answer: 0 },
        { q: 'Il porte ___ chapeau.', options: ['un', 'une', 'la', 'des'], answer: 0 },
        { q: '___ fleurs sont belles.', options: ['Les', 'La', 'Le', 'Des'], answer: 0 },
      ],
      verb_conjugation: [
        { q: 'Je ___ français. (parler)', options: ['parle', 'parles', 'parlons', 'parlez'], answer: 0 },
        { q: 'Nous ___ au cinéma. (aller)', options: ['allons', 'vais', 'allez', 'vont'], answer: 0 },
        { q: 'Elle ___ un gâteau. (faire)', options: ['fait', 'fais', 'faisons', 'font'], answer: 0 },
        { q: 'Ils ___ du café. (boire)', options: ['boivent', 'bois', 'boit', 'buvons'], answer: 0 },
        { q: 'Tu ___ la musique. (écouter)', options: ['écoutes', 'écoute', 'écoutons', 'écoutez'], answer: 0 },
        { q: 'Vous ___ le journal. (lire)', options: ['lisez', 'lis', 'lit', 'lisons'], answer: 0 },
        { q: 'Je ___ un livre. (lire)', options: ['lis', 'lit', 'lisez', 'lisons'], answer: 0 },
        { q: 'Nous ___ contents. (être)', options: ['sommes', 'suis', 'êtes', 'sont'], answer: 0 },
      ],
      tenses: [
        { q: 'Hier, j\'___ au marché. (aller, passé composé)', options: ['suis allé', 'ai allé', 'vais', 'allais'], answer: 0 },
        { q: 'Demain, nous ___ à Paris. (aller, futur)', options: ['irons', 'allons', 'sommes allés', 'allions'], answer: 0 },
        { q: 'Elle ___ un film hier soir. (regarder, passé composé)', options: ['a regardé', 'regarde', 'regardait', 'regardera'], answer: 0 },
        { q: 'Quand j\'étais petit, je ___ beaucoup. (jouer, imparfait)', options: ['jouais', 'joue', 'ai joué', 'jouerai'], answer: 0 },
        { q: 'Ils ___ leurs devoirs ce soir. (finir, futur)', options: ['finiront', 'finissent', 'ont fini', 'finissaient'], answer: 0 },
        { q: 'Tu ___ déjà mangé? (avoir, passé composé)', options: ['as', 'a', 'ai', 'avez'], answer: 0 },
      ],
      adjectives: [
        { q: 'La fille est ___ (intelligent)', options: ['intelligente', 'intelligent', 'intelligents', 'intelligentes'], answer: 0 },
        { q: 'Les garçons sont ___ (heureux)', options: ['heureux', 'heureuse', 'heureuses', 'heureus'], answer: 0 },
        { q: 'C\'est une ___ maison. (beau)', options: ['belle', 'beau', 'bel', 'beaux'], answer: 0 },
        { q: 'Les fleurs sont ___ (blanc)', options: ['blanches', 'blanc', 'blanche', 'blancs'], answer: 0 },
        { q: 'Elle a une ___ robe. (nouveau)', options: ['nouvelle', 'nouveau', 'nouvel', 'nouveaux'], answer: 0 },
      ],
      negation: [
        { q: 'Je ___ mange ___ de viande.', options: ['ne...pas', 'ne...plus', 'ne...jamais', 'ne...rien'], answer: 0 },
        { q: 'Il ___ va ___ à l\'école. (plus)', options: ['ne...plus', 'ne...pas', 'ne...jamais', 'n\'...rien'], answer: 0 },
        { q: 'Choose the negative: "Je mange" → ?', options: ['Je ne mange pas', 'Je mange ne pas', 'Ne je mange pas', 'Je pas mange'], answer: 0 },
        { q: 'Nous n\'avons ___ d\'argent.', options: ['pas', 'plus', 'ne', 'rien'], answer: 0 },
        { q: 'Elle ne boit ___.', options: ['rien', 'pas', 'ne', 'plus'], answer: 0 },
      ],
      prepositions: [
        { q: 'Je vais ___ Paris.', options: ['à', 'en', 'de', 'dans'], answer: 0 },
        { q: 'Il vient ___ France.', options: ['de', 'à', 'en', 'dans'], answer: 0 },
        { q: 'Le chat est ___ la table.', options: ['sur', 'à', 'de', 'en'], answer: 0 },
        { q: 'Elle habite ___ France.', options: ['en', 'à', 'de', 'dans'], answer: 0 },
        { q: 'Le livre est ___ le sac.', options: ['dans', 'sur', 'en', 'à'], answer: 0 },
      ],
      vocabulary: [
        { q: '"La bibliothèque" means:', options: ['Library', 'Book', 'School', 'Office'], answer: 0 },
        { q: '"Le médecin" means:', options: ['Doctor', 'Teacher', 'Student', 'Nurse'], answer: 0 },
        { q: 'How do you say "Monday" in French?', options: ['Lundi', 'Mardi', 'Mercredi', 'Dimanche'], answer: 0 },
        { q: '"La pluie" means:', options: ['Rain', 'Snow', 'Sun', 'Wind'], answer: 0 },
        { q: '"Acheter" means:', options: ['To buy', 'To sell', 'To eat', 'To drink'], answer: 0 },
        { q: '"Le petit-déjeuner" means:', options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], answer: 0 },
      ],
    },
    german: {
      articles: [
        { q: '___ Hund ist groß.', options: ['Der', 'Die', 'Das', 'Den'], answer: 0 },
        { q: 'Ich sehe ___ Katze.', options: ['die', 'der', 'das', 'dem'], answer: 0 },
        { q: '___ Buch ist interessant.', options: ['Das', 'Der', 'Die', 'Den'], answer: 0 },
        { q: '___ Kinder spielen.', options: ['Die', 'Der', 'Das', 'Den'], answer: 0 },
        { q: 'Er hat ___ Bruder.', options: ['einen', 'eine', 'ein', 'der'], answer: 0 },
      ],
      verb_conjugation: [
        { q: 'Ich ___ Deutsch. (sprechen)', options: ['spreche', 'sprichst', 'spricht', 'sprechen'], answer: 0 },
        { q: 'Er ___ ein Buch. (lesen)', options: ['liest', 'lese', 'lesen', 'lest'], answer: 0 },
        { q: 'Wir ___ nach Hause. (gehen)', options: ['gehen', 'gehe', 'gehst', 'geht'], answer: 0 },
        { q: 'Du ___ sehr gut. (singen)', options: ['singst', 'singe', 'singt', 'singen'], answer: 0 },
        { q: 'Sie ___ einen Kuchen. (backen)', options: ['backt', 'backe', 'backst', 'backen'], answer: 0 },
      ],
      cases: [
        { q: 'Ich gebe ___ Mann das Buch. (dative)', options: ['dem', 'der', 'den', 'das'], answer: 0 },
        { q: 'Er sieht ___ Hund. (accusative)', options: ['den', 'der', 'dem', 'des'], answer: 0 },
        { q: 'Das Buch ___ Frau. (genitive)', options: ['der', 'die', 'dem', 'den'], answer: 0 },
        { q: '___ Junge spielt. (nominative)', options: ['Der', 'Den', 'Dem', 'Des'], answer: 0 },
      ],
      vocabulary: [
        { q: '"Die Schule" means:', options: ['School', 'House', 'Garden', 'Room'], answer: 0 },
        { q: '"Der Bruder" means:', options: ['Brother', 'Sister', 'Father', 'Mother'], answer: 0 },
        { q: 'How do you say "Thank you" in German?', options: ['Danke', 'Bitte', 'Hallo', 'Tschüss'], answer: 0 },
        { q: '"Mittwoch" means:', options: ['Wednesday', 'Monday', 'Friday', 'Sunday'], answer: 0 },
        { q: '"Spielen" means:', options: ['To play', 'To eat', 'To sleep', 'To read'], answer: 0 },
      ],
    },
    sanskrit: {
      verb_conjugation: [
        { q: 'बालकः विद्यालयं ___ (गम् लट्)', options: ['गच्छति', 'गच्छसि', 'गच्छामि', 'गच्छन्ति'], answer: 0 },
        { q: 'अहं फलं ___ (खाद् लट्)', options: ['खादामि', 'खादति', 'खादसि', 'खादन्ति'], answer: 0 },
        { q: 'त्वं पुस्तकं ___ (पठ् लट्)', options: ['पठसि', 'पठति', 'पठामि', 'पठन्ति'], answer: 0 },
        { q: 'ते क्रीडाङ्गणे ___ (क्रीड् लट्)', options: ['क्रीडन्ति', 'क्रीडति', 'क्रीडसि', 'क्रीडामि'], answer: 0 },
        { q: 'सा गीतं ___ (गा लट्)', options: ['गायति', 'गायसि', 'गायामि', 'गायन्ति'], answer: 0 },
      ],
      vocabulary: [
        { q: '"पुस्तकम्" means:', options: ['Book', 'Pen', 'School', 'Garden'], answer: 0 },
        { q: '"विद्यालयः" means:', options: ['School', 'Temple', 'House', 'Market'], answer: 0 },
        { q: '"जलम्" means:', options: ['Water', 'Fire', 'Air', 'Earth'], answer: 0 },
        { q: '"वृक्षः" means:', options: ['Tree', 'Flower', 'Fruit', 'River'], answer: 0 },
        { q: '"नगरम्" means:', options: ['City', 'Village', 'Country', 'Forest'], answer: 0 },
      ],
      grammar: [
        { q: '"रामः" is in which vibhakti?', options: ['Prathamā', 'Dvitīyā', 'Tṛtīyā', 'Caturthī'], answer: 0 },
        { q: '"रामं" is in which vibhakti?', options: ['Dvitīyā', 'Prathamā', 'Tṛtīyā', 'Pañcamī'], answer: 0 },
        { q: '"रामेण" is in which vibhakti?', options: ['Tṛtīyā', 'Dvitīyā', 'Caturthī', 'Ṣaṣṭhī'], answer: 0 },
        { q: '"रामाय" is in which vibhakti?', options: ['Caturthī', 'Tṛtīyā', 'Pañcamī', 'Saptamī'], answer: 0 },
      ],
    },
    spanish: {
      verb_conjugation: [
        { q: 'Yo ___ español. (hablar)', options: ['hablo', 'hablas', 'habla', 'hablamos'], answer: 0 },
        { q: 'Ella ___ un libro. (leer)', options: ['lee', 'leo', 'lees', 'leemos'], answer: 0 },
        { q: 'Nosotros ___ al cine. (ir)', options: ['vamos', 'voy', 'vas', 'van'], answer: 0 },
        { q: 'Tú ___ música. (escuchar)', options: ['escuchas', 'escucho', 'escucha', 'escuchamos'], answer: 0 },
        { q: 'Ellos ___ en Madrid. (vivir)', options: ['viven', 'vivo', 'vives', 'vivimos'], answer: 0 },
      ],
      articles: [
        { q: '___ casa es grande.', options: ['La', 'El', 'Los', 'Un'], answer: 0 },
        { q: 'Tengo ___ perro.', options: ['un', 'una', 'el', 'los'], answer: 0 },
        { q: '___ niños juegan.', options: ['Los', 'La', 'El', 'Las'], answer: 0 },
        { q: 'Ella tiene ___ amiga.', options: ['una', 'un', 'el', 'la'], answer: 0 },
      ],
      vocabulary: [
        { q: '"La cocina" means:', options: ['Kitchen', 'Bedroom', 'Bathroom', 'Garden'], answer: 0 },
        { q: '"El hermano" means:', options: ['Brother', 'Sister', 'Father', 'Friend'], answer: 0 },
        { q: '"Martes" means:', options: ['Tuesday', 'Monday', 'Wednesday', 'Thursday'], answer: 0 },
        { q: '"Comer" means:', options: ['To eat', 'To drink', 'To play', 'To sleep'], answer: 0 },
        { q: '"La iglesia" means:', options: ['Church', 'School', 'Hospital', 'Market'], answer: 0 },
      ],
    },
    hindi: {
      grammar: [
        { q: '"राम ने सेब ___।" (खाना, past)', options: ['खाया', 'खाता', 'खाएगा', 'खा रहा'], answer: 0 },
        { q: '"वह स्कूल ___ है।" (जाना, present continuous)', options: ['जा रहा', 'गया', 'जाएगा', 'जाता'], answer: 0 },
        { q: '"मैं कल दिल्ली ___।" (जाना, future)', options: ['जाऊँगा', 'गया', 'जाता हूँ', 'जा रहा'], answer: 0 },
        { q: '"लड़कियाँ खेल ___ हैं।" (present continuous)', options: ['रही', 'रहा', 'रहे', 'चुकी'], answer: 0 },
        { q: '"उसने पत्र ___।" (लिखना, past)', options: ['लिखा', 'लिखता', 'लिखेगा', 'लिख रहा'], answer: 0 },
      ],
      vocabulary: [
        { q: '"पुस्तकालय" means:', options: ['Library', 'School', 'Temple', 'Market'], answer: 0 },
        { q: '"चिकित्सक" means:', options: ['Doctor', 'Teacher', 'Lawyer', 'Engineer'], answer: 0 },
        { q: '"आकाश" means:', options: ['Sky', 'Water', 'Earth', 'Fire'], answer: 0 },
        { q: '"परिश्रम" means:', options: ['Hard work', 'Laziness', 'Study', 'Play'], answer: 0 },
        { q: '"विद्यार्थी" means:', options: ['Student', 'Teacher', 'Principal', 'Clerk'], answer: 0 },
      ],
      verb_conjugation: [
        { q: '"मैं पानी ___।" (पीना, present)', options: ['पीता हूँ', 'पीया', 'पीऊँगा', 'पी रहा'], answer: 0 },
        { q: '"वे गाना ___।" (गाना, present)', options: ['गाते हैं', 'गाया', 'गाएँगे', 'गा रहे'], answer: 0 },
        { q: '"तुम क्या ___?" (करना, present)', options: ['करते हो', 'किया', 'करोगे', 'कर रहे'], answer: 0 },
        { q: '"हम खाना ___।" (खाना, future)', options: ['खाएँगे', 'खाते हैं', 'खाया', 'खा रहे'], answer: 0 },
      ],
    },
  };

  function getQuestionsForTopic(topic) {
    const bank = QUESTION_BANKS[lang] || QUESTION_BANKS.french;
    const cleanTopic = topic.replace(/\s+/g, '_').toLowerCase();
    if (bank[cleanTopic]) return bank[cleanTopic];
    for (const [key, qs] of Object.entries(bank)) {
      if (cleanTopic.includes(key) || key.includes(cleanTopic)) return qs;
    }
    return bank[Object.keys(bank)[0]] || [];
  }

  function getTodayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function getTodayDrill() {
    try { return JSON.parse(localStorage.getItem(DRILL_KEY)); } catch { return null; }
  }

  function getDrillHistory() {
    try { return JSON.parse(localStorage.getItem(DRILL_HISTORY_KEY) || '[]'); } catch { return []; }
  }

  function pickWeakestTopic() {
    if (typeof WeaknessEngine !== 'undefined') {
      const top = WeaknessEngine.getTopWeaknesses(3);
      if (top.length) {
        const picked = top[Math.floor(Math.random() * Math.min(2, top.length))];
        return { category: picked.category, topic: picked.topic, accuracy: picked.accuracy };
      }
    }
    const bank = QUESTION_BANKS[lang] || QUESTION_BANKS.french;
    const topics = Object.keys(bank);
    const topic = topics[Math.floor(Math.random() * topics.length)];
    return { category: 'general', topic, accuracy: 50 };
  }

  function generateDailyDrill() {
    const existing = getTodayDrill();
    if (existing && existing.date === getTodayKey()) return existing;

    const weakness = pickWeakestTopic();
    const allQs = getQuestionsForTopic(weakness.topic);
    const shuffled = [...allQs].sort(() => Math.random() - 0.5);
    const questions = shuffled.slice(0, 5);

    const drill = {
      date: getTodayKey(),
      topic: weakness.topic,
      category: weakness.category,
      accuracy: weakness.accuracy,
      questions,
      answers: [],
      completed: false,
      score: 0,
    };

    localStorage.setItem(DRILL_KEY, JSON.stringify(drill));
    return drill;
  }

  // Render the daily drill card on the dashboard
  function renderDailyDrill(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const drill = generateDailyDrill();

    if (drill.completed) {
      const pct = Math.round((drill.score / drill.questions.length) * 100);
      const color = pct >= 80 ? '#059669' : pct >= 50 ? '#d97706' : '#dc2626';
      container.innerHTML = `
        <div class="dd-completed">
          <div class="dd-done-icon">✅</div>
          <div class="dd-done-text">Today's drill completed!</div>
          <div class="dd-done-score" style="color:${color}">${drill.score}/${drill.questions.length} correct (${pct}%)</div>
          <div class="dd-done-topic">${drill.topic.replace(/_/g, ' ')}</div>
          <div class="dd-streak-info">${getDrillStreak()} day drill streak</div>
        </div>
      `;
      return;
    }

    const topicLabel = drill.topic.replace(/_/g, ' ');
    const sevColor = drill.accuracy < 40 ? '#dc2626' : drill.accuracy < 60 ? '#f97316' : '#eab308';
    const sevLabel = drill.accuracy < 40 ? 'Critical' : drill.accuracy < 60 ? 'Weak' : 'Improving';

    container.innerHTML = `
      <div class="dd-card">
        <div class="dd-header">
          <span class="dd-badge" style="background:${sevColor}15;color:${sevColor}">${sevLabel}</span>
          <span class="dd-qcount">5 questions</span>
        </div>
        <div class="dd-topic">${topicLabel}</div>
        <div class="dd-desc">Practice your weakest topic to boost your exam score</div>
        <button class="btn btn-primary dd-start-btn" onclick="DailyDrill.start()">Start Today's Drill</button>
      </div>
    `;
  }

  // Start the drill — show questions one by one
  let currentQ = 0;

  function startDrill() {
    const drill = getTodayDrill();
    if (!drill || drill.completed) return;
    currentQ = 0;
    drill.answers = [];
    localStorage.setItem(DRILL_KEY, JSON.stringify(drill));
    showQuestion(0);
  }

  function showQuestion(idx) {
    const drill = getTodayDrill();
    if (!drill || idx >= drill.questions.length) {
      finishDrill();
      return;
    }

    const q = drill.questions[idx];
    const container = document.getElementById('dailyDrillArea');
    if (!container) return;

    container.innerHTML = `
      <div class="dd-quiz">
        <div class="dd-progress">
          <div class="dd-progress-fill" style="width:${(idx / drill.questions.length) * 100}%"></div>
        </div>
        <div class="dd-q-counter">Question ${idx + 1} of ${drill.questions.length}</div>
        <div class="dd-q-text">${q.q}</div>
        <div class="dd-options">
          ${q.options.map((opt, i) => `
            <button class="dd-option" onclick="DailyDrill.answer(${idx}, ${i})" data-idx="${i}">${opt}</button>
          `).join('')}
        </div>
        <div class="dd-feedback" id="ddFeedback" style="display:none"></div>
      </div>
    `;
  }

  function handleAnswer(qIdx, optIdx) {
    const drill = getTodayDrill();
    if (!drill) return;

    const q = drill.questions[qIdx];
    const isCorrect = optIdx === q.answer;

    drill.answers.push({ qIdx, selected: optIdx, correct: isCorrect });
    if (isCorrect) drill.score++;
    localStorage.setItem(DRILL_KEY, JSON.stringify(drill));

    // Show feedback
    const options = document.querySelectorAll('.dd-option');
    options.forEach(o => {
      o.disabled = true;
      o.style.pointerEvents = 'none';
    });

    options[q.answer].classList.add('dd-correct');
    if (!isCorrect) options[optIdx].classList.add('dd-wrong');

    const feedback = document.getElementById('ddFeedback');
    feedback.style.display = '';
    feedback.innerHTML = isCorrect
      ? '<span style="color:#059669;font-weight:800">✅ Correct!</span>'
      : `<span style="color:#dc2626;font-weight:800">❌ Wrong — correct answer: ${q.options[q.answer]}</span>`;

    setTimeout(() => {
      if (qIdx + 1 < drill.questions.length) {
        showQuestion(qIdx + 1);
      } else {
        finishDrill();
      }
    }, 1200);
  }

  function finishDrill() {
    const drill = getTodayDrill();
    if (!drill) return;

    drill.completed = true;
    localStorage.setItem(DRILL_KEY, JSON.stringify(drill));

    // Save to history
    const history = getDrillHistory();
    history.unshift({
      date: drill.date,
      topic: drill.topic,
      category: drill.category,
      score: drill.score,
      total: drill.questions.length,
      pct: Math.round((drill.score / drill.questions.length) * 100)
    });
    if (history.length > 60) history.pop();
    localStorage.setItem(DRILL_HISTORY_KEY, JSON.stringify(history));

    // Record into weakness engine
    if (typeof WeaknessEngine !== 'undefined') {
      WeaknessEngine.recordDrill(`${drill.category}_${drill.topic}`, drill.score, drill.questions.length);
    }

    // Award XP
    const xpEarned = drill.score * 5;
    const s = typeof getStudent === 'function' ? getStudent() : null;
    if (s) {
      s.total_xp = (s.total_xp || 0) + xpEarned;
      localStorage.setItem('ll_student', JSON.stringify(s));
      const navXP = document.getElementById('navXP');
      if (navXP) navXP.textContent = s.total_xp + ' XP';
    }

    const pct = Math.round((drill.score / drill.questions.length) * 100);
    const color = pct >= 80 ? '#059669' : pct >= 50 ? '#d97706' : '#dc2626';
    const msg = pct >= 80 ? 'Excellent! You\'re getting stronger!' : pct >= 50 ? 'Good effort! Keep practicing!' : 'Don\'t give up! Practice makes perfect!';
    const streak = getDrillStreak();

    const container = document.getElementById('dailyDrillArea');
    if (!container) return;

    container.innerHTML = `
      <div class="dd-result">
        <div class="dd-result-score" style="color:${color}">${pct}%</div>
        <div class="dd-result-detail">${drill.score}/${drill.questions.length} correct</div>
        <div class="dd-result-msg">${msg}</div>
        <div class="dd-result-xp">+${xpEarned} XP earned</div>
        <div class="dd-result-streak">${streak} day drill streak</div>
        <div class="dd-result-history">${renderMiniHistory()}</div>
        <button class="btn btn-primary" onclick="DailyDrill.render('dailyDrillArea')" style="margin-top:1rem;width:100%">Done</button>
      </div>
    `;
  }

  function getDrillStreak() {
    const history = getDrillHistory();
    if (!history.length) return 0;
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (history.some(h => h.date === key)) streak++;
      else if (i > 0) break;
    }
    return streak;
  }

  function renderMiniHistory() {
    const history = getDrillHistory().slice(0, 7);
    if (history.length < 2) return '';
    return `
      <div class="dd-mini-chart">
        ${history.reverse().map(h => {
          const height = Math.max(8, h.pct * 0.4);
          const color = h.pct >= 80 ? '#059669' : h.pct >= 50 ? '#d97706' : '#dc2626';
          return `<div class="dd-bar" style="height:${height}px;background:${color}" title="${h.date}: ${h.pct}%"></div>`;
        }).join('')}
      </div>
    `;
  }

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    .dd-card { text-align: center; }
    .dd-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
    .dd-badge { font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 6px; }
    .dd-qcount { font-size: 0.75rem; font-weight: 700; color: #9ca3af; }
    .dd-topic { font-size: 1.1rem; font-weight: 900; color: #1a1a2e; text-transform: capitalize; margin-bottom: 0.3rem; }
    .dd-desc { font-size: 0.82rem; color: #6b7280; font-weight: 600; margin-bottom: 1rem; }
    .dd-start-btn { width: 100%; font-size: 0.92rem; }

    .dd-completed { text-align: center; padding: 0.5rem 0; }
    .dd-done-icon { font-size: 1.5rem; margin-bottom: 0.3rem; }
    .dd-done-text { font-size: 0.92rem; font-weight: 800; color: #059669; }
    .dd-done-score { font-size: 1.1rem; font-weight: 900; margin: 0.3rem 0; }
    .dd-done-topic { font-size: 0.82rem; font-weight: 700; color: #6b7280; text-transform: capitalize; }
    .dd-streak-info { font-size: 0.78rem; font-weight: 800; color: #f97316; margin-top: 0.4rem; }

    .dd-quiz { }
    .dd-progress { height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; margin-bottom: 1rem; }
    .dd-progress-fill { height: 100%; background: linear-gradient(90deg, #6366f1, #8b5cf6); border-radius: 3px; transition: width 0.4s ease; }
    .dd-q-counter { font-size: 0.75rem; font-weight: 800; color: #9ca3af; margin-bottom: 0.5rem; }
    .dd-q-text { font-size: 1rem; font-weight: 800; color: #1a1a2e; margin-bottom: 1rem; line-height: 1.5; }
    .dd-options { display: flex; flex-direction: column; gap: 0.5rem; }
    .dd-option {
      padding: 0.75rem 1rem; border-radius: 12px; border: 2px solid #e5e7eb;
      background: white; font-weight: 700; font-size: 0.88rem; cursor: pointer;
      text-align: left; transition: all 0.2s; font-family: inherit; color: #374151;
    }
    .dd-option:hover { border-color: #6366f1; background: #f5f3ff; }
    .dd-option.dd-correct { border-color: #059669; background: #ecfdf5; color: #059669; }
    .dd-option.dd-wrong { border-color: #dc2626; background: #fef2f2; color: #dc2626; }
    .dd-feedback { margin-top: 0.75rem; font-size: 0.88rem; padding: 0.5rem; border-radius: 8px; }

    .dd-result { text-align: center; padding: 0.5rem 0; }
    .dd-result-score { font-size: 2rem; font-weight: 900; }
    .dd-result-detail { font-size: 0.88rem; font-weight: 700; color: #6b7280; }
    .dd-result-msg { font-size: 0.92rem; font-weight: 800; color: #374151; margin: 0.5rem 0; }
    .dd-result-xp { font-size: 0.85rem; font-weight: 800; color: #6366f1; background: #eef0ff; padding: 0.3rem 0.8rem; border-radius: 8px; display: inline-block; margin: 0.3rem 0; }
    .dd-result-streak { font-size: 0.82rem; font-weight: 800; color: #f97316; margin-top: 0.3rem; }
    .dd-mini-chart { display: flex; align-items: flex-end; justify-content: center; gap: 4px; margin-top: 0.75rem; height: 45px; }
    .dd-bar { width: 18px; border-radius: 3px 3px 0 0; transition: height 0.3s; }
  `;
  document.head.appendChild(style);

  window.DailyDrill = {
    render: renderDailyDrill,
    start: startDrill,
    answer: handleAnswer,
    getStreak: getDrillStreak,
    getHistory: getDrillHistory,
  };
})();
