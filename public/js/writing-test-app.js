(function () {
  if (!requireAuth()) return;
  startSession();

  const student = getStudent();
  const lang = student?.language || 'french';
  const cls = student?.class || 8;
  const langName = lang.charAt(0).toUpperCase() + lang.slice(1);

  if (student) {
    document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';
  }

  // Writing prompts per language per task type
  const prompts = {
    french: {
      essay: [
        { text: 'Write an essay on "Ma journée idéale" (My ideal day). Describe what you would do from morning to evening.', marks: 5 },
        { text: 'Write about "Les avantages de la technologie" (Advantages of technology) in your daily life.', marks: 5 },
        { text: 'Describe "Mon école" (My school) — the building, teachers, friends, and what you like most.', marks: 5 },
        { text: 'Write about "Mes vacances d\'été" (My summer holidays) — where you went and what you did.', marks: 5 },
      ],
      letter: [
        { text: 'Write a letter to your friend inviting them to your birthday party. Include date, time, venue, and activities planned.', marks: 5 },
        { text: 'Write a formal letter to your school principal requesting 3 days leave for a family function.', marks: 5 },
        { text: 'Write a letter to your pen friend in France describing Indian festivals.', marks: 5 },
        { text: 'Write a letter to your mother describing your hostel life and daily routine in French.', marks: 5 },
      ],
      dialogue: [
        { text: 'Write a dialogue between a shopkeeper and a customer buying fruits at a market in French (8-10 lines).', marks: 4 },
        { text: 'Write a conversation between two friends planning a weekend outing (8-10 lines).', marks: 4 },
        { text: 'Write a dialogue at a restaurant — ordering food, asking about menu, and paying the bill.', marks: 4 },
      ],
      paragraph: [
        { text: 'Write a paragraph (60-80 words) describing your best friend — their appearance, habits, and why you like them.', marks: 3 },
        { text: 'Describe your favorite season in French. What do you do during that season?', marks: 3 },
        { text: 'Write a short paragraph about a sport you enjoy playing. Use present tense verbs.', marks: 3 },
      ],
      story: [
        { text: 'Complete this story in French: "Un jour, en allant à l\'école, j\'ai trouvé un petit chien..." (One day, going to school, I found a small dog...)', marks: 5 },
        { text: 'Write a short story using these words: château, princesse, forêt, magique, heureux.', marks: 5 },
      ],
      grammar: [
        { text: 'Rewrite these sentences in passé composé:\n1. Je mange une pomme.\n2. Nous allons au cinéma.\n3. Elle fait ses devoirs.\n4. Ils prennent le bus.\n5. Tu lis un livre.', marks: 5 },
        { text: 'Fill in the correct article (le/la/les/un/une/des):\n1. ___ chat est noir.\n2. J\'ai ___ frère.\n3. ___ fleurs sont belles.\n4. C\'est ___ bonne idée.\n5. ___ école est grande.', marks: 5 },
        { text: 'Convert to negative form:\n1. Je suis content.\n2. Nous avons un chien.\n3. Elle va au marché.\n4. Ils mangent toujours des légumes.\n5. Tu as quelque chose.', marks: 5 },
      ]
    },
    german: {
      essay: [
        { text: 'Write about "Mein Traumurlaub" (My dream vacation) — where would you go and what would you do?', marks: 5 },
        { text: 'Describe "Mein Tagesablauf" (My daily routine) from waking up to going to bed.', marks: 5 },
        { text: 'Write about "Meine Familie" — describe each family member and what they do.', marks: 5 },
      ],
      letter: [
        { text: 'Write a letter to your German pen friend describing Indian food and your favorite dish.', marks: 5 },
        { text: 'Write a formal email to a hotel in Berlin to book a room for your family vacation.', marks: 5 },
      ],
      dialogue: [
        { text: 'Write a dialogue at a German bakery — ordering bread, cakes, and paying (8-10 lines).', marks: 4 },
        { text: 'Write a conversation asking for directions to the train station in German.', marks: 4 },
      ],
      paragraph: [
        { text: 'Describe your classroom in German (60-80 words). Use Akkusativ and location prepositions.', marks: 3 },
        { text: 'Write about your favorite hobby in German. Why do you enjoy it?', marks: 3 },
      ],
      story: [
        { text: 'Complete: "Eines Tages fand ich einen magischen Schlüssel..." (One day I found a magical key...)', marks: 5 },
      ],
      grammar: [
        { text: 'Fill in the correct article (der/die/das/den/dem):\n1. Ich sehe ___ Hund. (Akk)\n2. ___ Frau ist nett. (Nom)\n3. Er gibt ___ Kind ein Buch. (Dat)\n4. ___ Schule ist groß. (Nom)\n5. Wir helfen ___ Mann. (Dat)', marks: 5 },
        { text: 'Conjugate in present tense:\n1. Ich ___ (fahren) nach Berlin.\n2. Er ___ (lesen) ein Buch.\n3. Wir ___ (haben) einen Hund.\n4. Du ___ (sein) mein Freund.\n5. Sie ___ (sprechen) Deutsch.', marks: 5 },
      ]
    },
    sanskrit: {
      essay: [
        { text: 'संस्कृत में "मम विद्यालयः" (My School) विषय पर 8-10 वाक्य लिखिए।', marks: 5 },
        { text: '"मम परिवारः" (My Family) पर संस्कृत में एक अनुच्छेद लिखिए।', marks: 5 },
        { text: '"पर्यावरण रक्षा" विषय पर संस्कृत में 8-10 वाक्य लिखिए।', marks: 5 },
      ],
      letter: [
        { text: 'अपने मित्र को संस्कृत में एक पत्र लिखिए जिसमें आप उसे अपने विद्यालय के वार्षिकोत्सव में आमंत्रित कर रहे हैं।', marks: 5 },
        { text: 'अपने प्रधानाचार्य को अवकाश हेतु संस्कृत में पत्र लिखिए।', marks: 5 },
      ],
      dialogue: [
        { text: 'गुरु और शिष्य के बीच संस्कृत में 8 वाक्यों का संवाद लिखिए — विषय: अध्ययन का महत्व।', marks: 4 },
      ],
      paragraph: [
        { text: '"मम प्रिय ऋतुः" (My favorite season) पर संस्कृत में 5-6 वाक्य लिखिए।', marks: 3 },
        { text: '"दीपावलिः" पर्व पर संस्कृत में एक लघु अनुच्छेद लिखिए।', marks: 3 },
      ],
      story: [
        { text: 'इन शब्दों का प्रयोग करते हुए संस्कृत में एक लघु कथा लिखिए: वनम्, सिंहः, शशकः, मित्रता, सहायता।', marks: 5 },
      ],
      grammar: [
        { text: 'निम्नलिखित शब्दों के रूप लिखिए (प्रथमा से सप्तमी विभक्ति):\n1. राम (एकवचन)\n2. लता (बहुवचन)\n3. फल (द्विवचन)', marks: 5 },
        { text: 'निम्नलिखित धातुओं के लट् लकार में रूप लिखिए:\n1. पठ् (प्रथम पुरुष)\n2. गम् (मध्यम पुरुष)\n3. लिख् (उत्तम पुरुष)', marks: 5 },
        { text: 'संधि विच्छेद कीजिए:\n1. देवालयः\n2. सूर्योदयः\n3. महोत्सवः\n4. नरेन्द्रः\n5. विद्यार्थी', marks: 5 },
      ]
    },
    spanish: {
      essay: [
        { text: 'Write about "Mi familia" — describe each family member, their job, and personality.', marks: 5 },
        { text: 'Write about "Un día perfecto" (A perfect day) — what you would do from morning to night.', marks: 5 },
      ],
      letter: [
        { text: 'Write a letter to your Spanish pen friend describing your city and favorite places.', marks: 5 },
        { text: 'Write a formal letter to your teacher apologizing for missing class and asking for notes.', marks: 5 },
      ],
      dialogue: [
        { text: 'Write a dialogue ordering food at a Spanish restaurant (8-10 lines).', marks: 4 },
      ],
      paragraph: [
        { text: 'Describe your favorite food in Spanish (60-80 words). Include how it\'s made.', marks: 3 },
      ],
      story: [
        { text: 'Complete: "Un día, caminando por el bosque, encontré una puerta misteriosa..." (One day, walking through the forest, I found a mysterious door...)', marks: 5 },
      ],
      grammar: [
        { text: 'Conjugate in pretérito indefinido:\n1. Yo ___ (hablar) con María.\n2. Ellos ___ (comer) paella.\n3. Tú ___ (escribir) una carta.\n4. Nosotros ___ (ir) al cine.\n5. Ella ___ (tener) un problema.', marks: 5 },
      ]
    },
    japanese: {
      essay: [
        { text: 'Write about "わたしのかぞく" (My family) in Japanese. Describe each member (5-8 sentences).', marks: 5 },
        { text: 'Describe "わたしのいちにち" (My day) — your daily routine using ます form.', marks: 5 },
      ],
      letter: [
        { text: 'Write a short letter in Japanese to your friend inviting them to your house. Use ます/です form.', marks: 5 },
      ],
      dialogue: [
        { text: 'Write a conversation at a Japanese convenience store (コンビニ) — buying items and paying (6-8 lines).', marks: 4 },
      ],
      paragraph: [
        { text: 'Write about your hobby (しゅみ) in Japanese (4-6 sentences). Use adjectives.', marks: 3 },
      ],
      story: [
        { text: 'Complete this story: "むかしむかし、あるところに..." (Once upon a time, in a certain place...) Write 5-8 sentences.', marks: 5 },
      ],
      grammar: [
        { text: 'Convert to て-form:\n1. たべます →\n2. のみます →\n3. いきます →\n4. みます →\n5. します →', marks: 5 },
      ]
    },
    korean: {
      essay: [
        { text: '"나의 가족" (My family) — describe your family members in Korean (5-8 sentences).', marks: 5 },
      ],
      letter: [
        { text: 'Write a short letter in Korean to your teacher thanking them for their help.', marks: 5 },
      ],
      dialogue: [
        { text: 'Write a dialogue ordering food at a Korean restaurant (6-8 lines). Use 요 form.', marks: 4 },
      ],
      paragraph: [
        { text: 'Write about your favorite Korean food in Korean (4-6 sentences).', marks: 3 },
      ],
      story: [
        { text: 'Complete: "어느 날, 학교에서 집에 가는 길에..." (One day, on the way home from school...) Write 5-8 sentences.', marks: 5 },
      ],
      grammar: [
        { text: 'Change to past tense (-았/었어요):\n1. 먹어요 →\n2. 가요 →\n3. 공부해요 →\n4. 읽어요 →\n5. 만나요 →', marks: 5 },
      ]
    },
    mandarin: {
      essay: [
        { text: 'Write about "我的家人" (My family) in Chinese (5-8 sentences using Pinyin or characters).', marks: 5 },
      ],
      letter: [
        { text: 'Write a short letter in Chinese to your friend describing your school.', marks: 5 },
      ],
      dialogue: [
        { text: 'Write a conversation buying things at a Chinese market (6-8 lines).', marks: 4 },
      ],
      paragraph: [
        { text: 'Write about your favorite hobby in Chinese (4-6 sentences).', marks: 3 },
      ],
      story: [
        { text: 'Complete: "有一天，我在公园里看到了..." (One day, I saw in the park...) Write 5-8 sentences.', marks: 5 },
      ],
      grammar: [
        { text: 'Make questions using 吗:\n1. 他是学生。\n2. 你喜欢音乐。\n3. 她有哥哥。\n4. 我们去学校。\n5. 他们吃饭了。', marks: 5 },
      ]
    },
    russian: {
      essay: [
        { text: 'Write about "Моя семья" (My family) in Russian — describe each member (5-8 sentences).', marks: 5 },
      ],
      letter: [
        { text: 'Write a letter in Russian to your friend describing your last vacation.', marks: 5 },
      ],
      dialogue: [
        { text: 'Write a dialogue at a Russian café — ordering tea, food, and asking for the bill (6-8 lines).', marks: 4 },
      ],
      paragraph: [
        { text: 'Write about your daily routine in Russian (4-6 sentences).', marks: 3 },
      ],
      story: [
        { text: 'Complete: "Однажды, гуляя в лесу, я нашёл..." (Once, walking in the forest, I found...) Write 5-8 sentences.', marks: 5 },
      ],
      grammar: [
        { text: 'Put into past tense:\n1. Я читаю книгу.\n2. Она пишет письмо.\n3. Мы идём в школу.\n4. Они говорят по-русски.\n5. Ты делаешь уроки.', marks: 5 },
      ]
    }
  };

  let selectedTaskType = null;
  let currentPrompt = null;
  let currentMode = 'type';
  let uploadedImageData = null;
  let tesseractLoaded = false;
  let ocrWorker = null;
  let hwTimerInterval = null;
  let hwTimerSeconds = 0;
  let hwTimerRunning = false;

  // Timed exam state
  let examMode = false;
  let examType = null;
  let examCountdownInterval = null;
  let examTotalSeconds = 0;
  let examRemainingSeconds = 0;
  let examQuestions = [];
  let examCurrentQ = 0;
  let examStartTime = null;
  let qStartTime = null;

  // Task picker
  document.querySelectorAll('.wt-task-option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.wt-task-option').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      selectedTaskType = el.dataset.type;
      generatePrompt();
      document.getElementById('writingArea').style.display = '';
      document.getElementById('feedbackSection').style.display = 'none';
    });
  });

  function generatePrompt() {
    const taskPrompts = prompts[lang]?.[selectedTaskType] || prompts.french?.[selectedTaskType] || [];
    currentPrompt = taskPrompts[Math.floor(Math.random() * taskPrompts.length)];
    if (!currentPrompt) {
      currentPrompt = { text: `Write a ${selectedTaskType} in ${langName} on a topic of your choice.`, marks: 5 };
    }
    document.getElementById('promptText').textContent = currentPrompt.text;
    document.getElementById('promptBadge').textContent = selectedTaskType.charAt(0).toUpperCase() + selectedTaskType.slice(1);
    document.getElementById('promptMarks').textContent = currentPrompt.marks + ' marks';
    resetInputs();
  }

  document.getElementById('newPromptBtn').addEventListener('click', generatePrompt);

  // Mode toggle
  document.querySelectorAll('.wt-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wt-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.dataset.mode;
      document.getElementById('typeArea').style.display = currentMode === 'type' ? '' : 'none';
      document.getElementById('cameraArea').style.display = currentMode === 'camera' ? '' : 'none';
      updateSubmitState();
    });
  });

  // Type mode — word/char count
  const writingInput = document.getElementById('writingInput');
  writingInput.addEventListener('input', () => {
    const text = writingInput.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    document.getElementById('wordCount').textContent = words + ' words';
    document.getElementById('charCount').textContent = text.length + ' characters';
    updateSubmitState();
  });

  // Camera mode
  document.getElementById('cameraInput').addEventListener('change', (e) => handleImageUpload(e.target));
  document.getElementById('galleryInput').addEventListener('change', (e) => handleImageUpload(e.target));

  function handleImageUpload(input) {
    if (!input.files.length) return;
    const file = input.files[0];
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be under 10 MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImageData = e.target.result;
      document.getElementById('previewImg').src = uploadedImageData;
      document.getElementById('imgPreview').style.display = '';
      document.querySelector('.wt-cam-options').style.display = 'none';
      runOCR(uploadedImageData);
    };
    reader.readAsDataURL(file);
  }

  document.getElementById('imgRemove').addEventListener('click', () => {
    uploadedImageData = null;
    document.getElementById('imgPreview').style.display = 'none';
    document.getElementById('ocrStatus').style.display = 'none';
    document.getElementById('ocrReview').style.display = 'none';
    document.querySelector('.wt-cam-options').style.display = '';
    document.getElementById('cameraInput').value = '';
    document.getElementById('galleryInput').value = '';
    updateSubmitState();
  });

  // OCR using Tesseract.js
  async function runOCR(imageData) {
    const ocrStatus = document.getElementById('ocrStatus');
    const ocrFill = document.getElementById('ocrFill');
    const ocrTextEl = document.getElementById('ocrText');
    ocrStatus.style.display = '';
    ocrFill.style.width = '10%';
    ocrTextEl.textContent = 'Loading OCR engine...';

    try {
      if (!tesseractLoaded) {
        await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js');
        tesseractLoaded = true;
      }

      ocrFill.style.width = '25%';
      ocrTextEl.textContent = 'Recognizing text...';

      const ocrLang = getOCRLanguage();

      const result = await Tesseract.recognize(imageData, ocrLang, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const pct = Math.round(25 + m.progress * 70);
            ocrFill.style.width = pct + '%';
            ocrTextEl.textContent = `Recognizing text... ${Math.round(m.progress * 100)}%`;
          }
        }
      });

      ocrFill.style.width = '100%';
      ocrTextEl.textContent = 'Text extracted!';

      const extractedText = result.data.text.trim();
      if (extractedText.length < 5) {
        ocrTextEl.textContent = 'Could not read text clearly — please type your answer instead or retake the photo.';
        return;
      }

      document.getElementById('ocrOutput').value = extractedText;
      document.getElementById('ocrReview').style.display = '';
      updateOCRWordCount();

      setTimeout(() => { ocrStatus.style.display = 'none'; }, 1500);
    } catch (err) {
      ocrFill.style.width = '100%';
      ocrFill.style.background = '#f87171';
      ocrTextEl.textContent = 'OCR failed — please type your answer instead.';
      console.error('OCR error:', err);
    }
  }

  function getOCRLanguage() {
    const langMap = {
      french: 'fra', german: 'deu', sanskrit: 'san+hin',
      spanish: 'spa', japanese: 'jpn', korean: 'kor',
      mandarin: 'chi_sim', russian: 'rus'
    };
    return langMap[lang] || 'eng';
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // OCR output word count
  const ocrOutput = document.getElementById('ocrOutput');
  ocrOutput.addEventListener('input', updateOCRWordCount);
  function updateOCRWordCount() {
    const text = ocrOutput.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    document.getElementById('ocrWordCount').textContent = words + ' words';
    updateSubmitState();
  }

  document.getElementById('ocrConfirmBtn').addEventListener('click', () => {
    document.getElementById('ocrConfirmBtn').textContent = '✅ Confirmed!';
    document.getElementById('ocrConfirmBtn').style.background = '#059669';
    document.getElementById('ocrConfirmBtn').style.color = 'white';
    updateSubmitState();
  });

  // Submit state
  function updateSubmitState() {
    const btn = document.getElementById('submitBtn');
    if (currentMode === 'type') {
      btn.disabled = writingInput.value.trim().length < 10;
    } else {
      const ocrText = ocrOutput.value.trim();
      btn.disabled = ocrText.length < 10;
    }
  }

  function resetInputs() {
    writingInput.value = '';
    ocrOutput.value = '';
    uploadedImageData = null;
    document.getElementById('wordCount').textContent = '0 words';
    document.getElementById('charCount').textContent = '0 characters';
    document.getElementById('ocrWordCount').textContent = '0 words';
    document.getElementById('imgPreview').style.display = 'none';
    document.getElementById('ocrStatus').style.display = 'none';
    document.getElementById('ocrReview').style.display = 'none';
    document.querySelector('.wt-cam-options').style.display = '';
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('ocrConfirmBtn').textContent = '✅ Text looks correct';
    document.getElementById('ocrConfirmBtn').style.background = '';
    document.getElementById('ocrConfirmBtn').style.color = '';
  }

  // Submit for grading
  document.getElementById('submitBtn').addEventListener('click', async () => {
    const studentText = currentMode === 'type'
      ? writingInput.value.trim()
      : ocrOutput.value.trim();

    if (studentText.length < 10) return;

    const btn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const spinner = document.getElementById('submitSpinner');
    const gradingLottie = document.getElementById('gradingLottie');
    btn.disabled = true;
    submitText.textContent = 'AI is grading...';
    spinner.style.display = 'inline-block';
    if (gradingLottie) gradingLottie.style.display = '';

    try {
      const data = await apiPost('/api/writing/check', {
        taskType: selectedTaskType,
        prompt: currentPrompt.text,
        marks: currentPrompt.marks,
        studentText,
        submissionMode: currentMode
      });

      if (data?.feedback) {
        showFeedback(data.feedback);
      } else {
        showFeedback(generateDemoFeedback(studentText));
      }
    } catch (err) {
      showFeedback(generateDemoFeedback(studentText));
    }

    submitText.textContent = '✨ Check My Writing';
    spinner.style.display = 'none';
    if (gradingLottie) gradingLottie.style.display = 'none';
    btn.disabled = false;

    saveToPastList(studentText);
    logWriteDay();
    updatePracticeStats();
  });

  function showFeedback(fb) {
    const section = document.getElementById('feedbackSection');
    section.style.display = '';
    section.scrollIntoView({ behavior: 'smooth' });

    // Score ring
    const score = fb.overallScore || 0;
    const total = fb.totalMarks || 10;
    const pct = score / total;
    const circumference = 2 * Math.PI * 52;
    const offset = circumference * (1 - pct);

    const ringFill = document.getElementById('ringFill');
    ringFill.style.stroke = pct >= 0.7 ? '#34d399' : pct >= 0.4 ? '#fbbf24' : '#f87171';
    setTimeout(() => { ringFill.style.strokeDashoffset = offset; }, 100);
    document.getElementById('ringScore').textContent = score;

    // Score bars
    const barsContainer = document.getElementById('scoreBars');
    const categories = fb.categories || [
      { name: 'Grammar', score: fb.grammarScore || 7 },
      { name: 'Vocabulary', score: fb.vocabularyScore || 7 },
      { name: 'Structure', score: fb.structureScore || 8 },
      { name: 'Content', score: fb.contentScore || 7 },
    ];
    barsContainer.innerHTML = categories.map(c => `
      <div class="wt-score-bar-item">
        <div class="wt-sb-label">
          <span class="wt-sb-name">${c.name}</span>
          <span class="wt-sb-score">${c.score}/10</span>
        </div>
        <div class="wt-sb-bar">
          <div class="wt-sb-fill" style="width:0%"></div>
        </div>
      </div>
    `).join('');
    setTimeout(() => {
      barsContainer.querySelectorAll('.wt-sb-fill').forEach((bar, i) => {
        bar.style.width = (categories[i].score * 10) + '%';
      });
    }, 200);

    // Detailed feedback items
    const detailsContainer = document.getElementById('fbDetails');
    const errors = fb.errors || fb.corrections || [];
    detailsContainer.innerHTML = errors.map(e => {
      const type = e.type || (e.severity === 'error' ? 'error' : e.severity === 'warning' ? 'warning' : 'good');
      const icon = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
      return `
        <div class="wt-fb-item ${type}">
          <div class="wt-fb-item-header">${icon} ${e.category || 'Feedback'}</div>
          <div class="wt-fb-item-text">${e.explanation || e.message}</div>
          ${e.original ? `<div class="wt-fb-item-original">${e.original}</div>` : ''}
          ${e.corrected ? `<div class="wt-fb-item-corrected">→ ${e.corrected}</div>` : ''}
        </div>
      `;
    }).join('');

    // Corrected version
    if (fb.correctedVersion) {
      document.getElementById('correctedSection').style.display = '';
      document.getElementById('correctedText').innerHTML = fb.correctedVersion.replace(/\n/g, '<br>');
    }

    // Tips
    if (fb.tips?.length) {
      document.getElementById('tipsSection').style.display = '';
      document.getElementById('tipsList').innerHTML = fb.tips.map(t => `<li>${t}</li>`).join('');
    }

    showHandwriteCTA();
  }

  function generateDemoFeedback(studentText) {
    const wordCount = studentText.split(/\s+/).length;
    const hasGreeting = /dear|cher|liebe|प्रिय|querido/i.test(studentText);
    const score = Math.min(10, Math.max(3, Math.round(wordCount / 15) + (hasGreeting ? 1 : 0)));

    return {
      overallScore: score,
      totalMarks: 10,
      grammarScore: Math.max(3, score - 1),
      vocabularyScore: score,
      structureScore: Math.max(3, score - Math.floor(Math.random() * 2)),
      contentScore: score,
      categories: [
        { name: 'Grammar & Spelling', score: Math.max(3, score - 1) },
        { name: 'Vocabulary Usage', score: score },
        { name: 'Structure & Format', score: Math.max(3, score - Math.floor(Math.random() * 2)) },
        { name: 'Content & Ideas', score: score },
      ],
      errors: [
        { type: 'error', category: 'Grammar', explanation: 'Check verb conjugation and tense consistency throughout your writing.', original: '(example from your text)', corrected: '(AI will show the correct form)' },
        { type: 'warning', category: 'Vocabulary', explanation: 'Try using more varied vocabulary — avoid repeating the same words.', },
        { type: 'good', category: 'Content', explanation: 'Good effort! Your ideas are relevant to the topic. Keep it up!', },
      ],
      correctedVersion: '(When the API is connected, AI will show the fully corrected version of your writing here with all errors fixed.)',
      tips: [
        'Read your writing aloud — it helps catch grammar mistakes',
        'Use a variety of sentence structures (simple, compound, complex)',
        'Always check verb agreement with the subject',
        `Practice writing ${selectedTaskType}s daily — even 5 minutes helps!`,
        'Review the corrected version and note the patterns in your mistakes'
      ]
    };
  }

  // Try Again / Practice More
  document.getElementById('tryAgainBtn').addEventListener('click', () => {
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('handwriteCTA').style.display = 'none';
    document.querySelectorAll('.wt-task-option').forEach(e => e.classList.remove('selected'));
    document.getElementById('writingArea').style.display = 'none';
    selectedTaskType = null;
    resetInputs();
    if (hwTimerInterval) clearInterval(hwTimerInterval);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('practiceMoreBtn').addEventListener('click', () => {
    document.getElementById('feedbackSection').style.display = 'none';
    generatePrompt();
    resetInputs();
    document.getElementById('writingArea').scrollIntoView({ behavior: 'smooth' });
  });

  // Past writing tests (localStorage)
  function saveToPastList(text) {
    const past = JSON.parse(localStorage.getItem('ll_writing_tests') || '[]');
    past.unshift({
      type: selectedTaskType,
      prompt: currentPrompt.text.slice(0, 60) + '...',
      date: new Date().toLocaleDateString('en-IN'),
      words: text.split(/\s+/).length,
      mode: currentMode
    });
    if (past.length > 20) past.pop();
    localStorage.setItem('ll_writing_tests', JSON.stringify(past));
    renderPastList();
  }

  function renderPastList() {
    const past = JSON.parse(localStorage.getItem('ll_writing_tests') || '[]');
    const container = document.getElementById('pastList');
    const empty = document.getElementById('pastEmpty');

    if (!past.length) { empty.style.display = ''; return; }
    empty.style.display = 'none';

    container.querySelectorAll('.wt-past-card').forEach(c => c.remove());
    past.forEach(p => {
      const icons = { essay: '📄', letter: '✉️', dialogue: '💬', paragraph: '📋', story: '📖', grammar: '🔤' };
      const card = document.createElement('div');
      card.className = 'wt-past-card';
      card.innerHTML = `
        <div class="wt-past-icon">${icons[p.type] || '📝'}</div>
        <div class="wt-past-info">
          <div class="wt-past-title">${p.prompt}</div>
          <div class="wt-past-date">${p.date} · ${p.words} words · ${p.mode === 'camera' ? '📷 Photo' : '⌨️ Typed'}</div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  renderPastList();

  // ===== DAILY WRITING PROMPT =====
  function getDailyPrompt() {
    const allPrompts = [];
    const langPrompts = prompts[lang] || prompts.french;
    Object.keys(langPrompts).forEach(type => {
      langPrompts[type].forEach(p => {
        allPrompts.push({ ...p, type });
      });
    });
    const today = new Date().toISOString().slice(0, 10);
    const seed = today.split('-').reduce((a, b) => a + parseInt(b), 0);
    const idx = seed % allPrompts.length;
    return allPrompts[idx];
  }

  function initDailyPrompt() {
    const daily = getDailyPrompt();
    const today = new Date().toISOString().slice(0, 10);
    const doneToday = localStorage.getItem('ll_daily_write_done') === today;

    document.getElementById('dailyPrompt').textContent = daily.text;
    document.getElementById('dailyType').textContent = daily.type.charAt(0).toUpperCase() + daily.type.slice(1);
    document.getElementById('dailyMarks').textContent = daily.marks + ' marks';

    const streak = getWriteStreak();
    document.getElementById('dailyWriteStreak').textContent = streak + ' day streak';

    if (doneToday) {
      document.querySelector('.wt-daily-actions').style.display = 'none';
      document.getElementById('dailyDone').style.display = '';
    }

    document.getElementById('dailyStartBtn').addEventListener('click', () => {
      const taskEl = document.querySelector(`.wt-task-option[data-type="${daily.type}"]`);
      if (taskEl) {
        taskEl.click();
        currentPrompt = daily;
        document.getElementById('promptText').textContent = daily.text;
        document.getElementById('promptBadge').textContent = daily.type.charAt(0).toUpperCase() + daily.type.slice(1);
        document.getElementById('promptMarks').textContent = daily.marks + ' marks';
      }
      document.getElementById('writingArea').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('dailySkipBtn').addEventListener('click', () => {
      document.querySelector('.wt-task-picker').scrollIntoView({ behavior: 'smooth' });
    });
  }

  function getWriteStreak() {
    const log = JSON.parse(localStorage.getItem('ll_write_streak_log') || '[]');
    if (!log.length) return 0;
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (log.includes(key)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  }

  function logWriteDay() {
    const today = new Date().toISOString().slice(0, 10);
    const log = JSON.parse(localStorage.getItem('ll_write_streak_log') || '[]');
    if (!log.includes(today)) {
      log.push(today);
      if (log.length > 365) log.shift();
      localStorage.setItem('ll_write_streak_log', JSON.stringify(log));
    }
    localStorage.setItem('ll_daily_write_done', today);
  }

  initDailyPrompt();

  // ===== PRACTICE STATS =====
  function updatePracticeStats() {
    const tests = JSON.parse(localStorage.getItem('ll_writing_tests') || '[]');
    const hwLog = JSON.parse(localStorage.getItem('ll_hw_practice_log') || '[]');
    const streak = getWriteStreak();

    document.getElementById('statTyped').textContent = tests.length;
    document.getElementById('statHandwritten').textContent = hwLog.length;
    document.getElementById('statWriteStreak').textContent = streak;
    document.getElementById('dailyWriteStreak').textContent = streak + ' day streak';

    const scores = tests.filter(t => t.score).map(t => t.score);
    if (scores.length) {
      const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
      document.getElementById('statAvgScore').textContent = avg + '/10';
    }
  }

  updatePracticeStats();

  // ===== HANDWRITING PRACTICE =====
  function showHandwriteCTA() {
    const cta = document.getElementById('handwriteCTA');
    cta.style.display = '';
    document.getElementById('hwTimer').style.display = '';
    document.getElementById('hwLogged').style.display = 'none';
    document.getElementById('hwDoneBtn').disabled = false;
    hwTimerSeconds = 0;
    hwTimerRunning = false;
    document.getElementById('hwTimerTime').textContent = '00:00';
    document.getElementById('hwTimerBtn').textContent = 'Start Timer';
    if (hwTimerInterval) clearInterval(hwTimerInterval);
  }

  document.getElementById('hwTimerBtn').addEventListener('click', () => {
    if (hwTimerRunning) {
      clearInterval(hwTimerInterval);
      hwTimerRunning = false;
      document.getElementById('hwTimerBtn').textContent = 'Resume';
    } else {
      hwTimerRunning = true;
      document.getElementById('hwTimerBtn').textContent = 'Pause';
      hwTimerInterval = setInterval(() => {
        hwTimerSeconds++;
        const m = String(Math.floor(hwTimerSeconds / 60)).padStart(2, '0');
        const s = String(hwTimerSeconds % 60).padStart(2, '0');
        document.getElementById('hwTimerTime').textContent = m + ':' + s;
      }, 1000);
    }
  });

  document.getElementById('hwDoneBtn').addEventListener('click', () => {
    if (hwTimerInterval) clearInterval(hwTimerInterval);
    hwTimerRunning = false;

    const hwLog = JSON.parse(localStorage.getItem('ll_hw_practice_log') || '[]');
    hwLog.unshift({
      type: selectedTaskType || 'unknown',
      prompt: (currentPrompt?.text || '').slice(0, 60),
      date: new Date().toLocaleDateString('en-IN'),
      timeSpent: hwTimerSeconds,
    });
    if (hwLog.length > 50) hwLog.pop();
    localStorage.setItem('ll_hw_practice_log', JSON.stringify(hwLog));

    logWriteDay();

    document.getElementById('hwDoneBtn').disabled = true;
    document.getElementById('hwLogged').style.display = '';
    document.getElementById('hwTimer').style.display = 'none';

    // Award XP
    const student = getStudent();
    if (student) {
      student.total_xp = (student.total_xp || 0) + 5;
      localStorage.setItem('ll_student', JSON.stringify(student));
      document.getElementById('navXP').textContent = student.total_xp + ' XP';
    }

    updatePracticeStats();

    const dailyDone = document.getElementById('dailyDone');
    const today = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem('ll_daily_write_done') === today) {
      document.querySelector('.wt-daily-actions').style.display = 'none';
      dailyDone.style.display = '';
    }
  });

  document.getElementById('hwPrintBtn').addEventListener('click', () => {
    const prompt = currentPrompt?.text || 'Write your answer here';
    const type = selectedTaskType || 'writing';
    const marks = currentPrompt?.marks || 5;

    const printWin = window.open('', '_blank');
    printWin.document.write(`<!DOCTYPE html>
<html><head><title>Writing Worksheet — LinguaLearn</title>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; padding: 2cm; color: #1e293b; }
  h1 { font-size: 18pt; margin-bottom: 4px; }
  .meta { font-size: 10pt; color: #64748b; margin-bottom: 16px; }
  .prompt-box { border: 2px solid #5b5ef4; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size: 12pt; line-height: 1.6; }
  .lines { margin-top: 16px; }
  .line { border-bottom: 1px solid #cbd5e1; height: 32px; margin-bottom: 0px; }
  .footer { margin-top: 20px; font-size: 9pt; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 8px; }
  .timer-box { display: inline-block; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 12px; font-size: 10pt; margin-top: 8px; }
  @media print { body { padding: 1.5cm; } }
</style></head><body>
  <h1>LinguaLearn — Writing Practice Worksheet</h1>
  <div class="meta">${langName} · ${type.charAt(0).toUpperCase() + type.slice(1)} · ${marks} marks · Date: ___________</div>
  <div class="prompt-box"><strong>Prompt:</strong> ${prompt}</div>
  <div class="timer-box">Start Time: _______ &nbsp;&nbsp; End Time: _______ &nbsp;&nbsp; Total: _______</div>
  <div class="lines">${'<div class="line"></div>'.repeat(28)}</div>
  <div class="footer">LinguaLearn — CBSE Language Learning Platform · Practice makes perfect! ✍️</div>
</body></html>`);
    printWin.document.close();
    setTimeout(() => printWin.print(), 300);
  });

  // ===== TIMED EXAM MODE =====

  const EXAM_DEFAULTS = {
    6: { ut: 40, hy: 150, annual: 180 },
    7: { ut: 40, hy: 150, annual: 180 },
    8: { ut: 40, hy: 150, annual: 180 },
    9: { ut: 40, hy: 180, annual: 180 },
    10: { ut: 40, hy: 180, annual: 180 },
  };

  const EXAM_WRITING_SHARE = { ut: 0.30, hy: 0.30, annual: 0.28 };
  const EXAM_Q_COUNT = { ut: 2, hy: 3, annual: 5 };
  const EXAM_LABELS = { ut: 'Unit Test', hy: 'Half Yearly', annual: 'Annual Exam' };
  const EXAM_Q_TYPES = {
    ut: ['letter', 'paragraph'],
    hy: ['essay', 'letter', 'paragraph'],
    annual: ['essay', 'letter', 'dialogue', 'paragraph', 'story'],
  };

  function getExamSettings() {
    const saved = JSON.parse(localStorage.getItem('ll_exam_settings') || 'null');
    if (saved) return saved;
    const c = cls || 8;
    return {
      ...(EXAM_DEFAULTS[c] || EXAM_DEFAULTS[8]), class: c,
      utMarks: 20, hyMarks: 80, annualMarks: 80
    };
  }

  function saveExamSettings(settings) {
    localStorage.setItem('ll_exam_settings', JSON.stringify(settings));
  }

  function calcQuestionDist(totalMarks) {
    const mcqs = Math.max(3, Math.round(totalMarks * 0.25));
    const short = Math.max(1, Math.round(totalMarks * 0.30 / 2));
    const long = Math.max(0, Math.round(totalMarks * 0.20 / 3));
    const writing = Math.max(1, Math.round(totalMarks * 0.25 / 5));
    return { mcqs, short, long, writing };
  }

  function updateSettingsPreview() {
    const utMarks = parseInt(document.getElementById('settingUTMarks')?.value) || 20;
    const hyMarks = parseInt(document.getElementById('settingHYMarks')?.value) || 80;
    const annualMarks = parseInt(document.getElementById('settingAnnualMarks')?.value) || 80;
    const utDist = calcQuestionDist(utMarks);
    const hyDist = calcQuestionDist(hyMarks);
    const annualDist = calcQuestionDist(annualMarks);
    const preview = document.getElementById('previewText');
    if (preview) {
      preview.innerHTML = `<strong>UT (${utMarks}m):</strong> ${utDist.mcqs} MCQ + ${utDist.short} Short + ${utDist.writing} Writing<br>` +
        `<strong>HY (${hyMarks}m):</strong> ${hyDist.mcqs} MCQ + ${hyDist.short} Short + ${hyDist.long} Long + ${hyDist.writing} Writing<br>` +
        `<strong>Annual (${annualMarks}m):</strong> ${annualDist.mcqs} MCQ + ${annualDist.short} Short + ${annualDist.long} Long + ${annualDist.writing} Writing`;
    }
  }

  function initExamUI() {
    const settings = getExamSettings();
    document.getElementById('utDurLabel').textContent = settings.ut + ' min';
    document.getElementById('hyDurLabel').textContent = formatDuration(settings.hy);
    document.getElementById('annualDurLabel').textContent = formatDuration(settings.annual);

    document.getElementById('settingUT').value = settings.ut;
    document.getElementById('settingHY').value = settings.hy;
    document.getElementById('settingAnnual').value = settings.annual;
    document.getElementById('settingClass').value = settings.class || cls || 8;

    if (document.getElementById('settingUTMarks')) document.getElementById('settingUTMarks').value = settings.utMarks || 20;
    if (document.getElementById('settingHYMarks')) document.getElementById('settingHYMarks').value = settings.hyMarks || 80;
    if (document.getElementById('settingAnnualMarks')) document.getElementById('settingAnnualMarks').value = settings.annualMarks || 80;

    updateSettingsPreview();
  }

  function formatDuration(min) {
    if (min >= 60) {
      const h = Math.floor(min / 60);
      const m = min % 60;
      return m ? h + '.' + (m * 10 / 60 | 0) + ' hr' : h + ' hr';
    }
    return min + ' min';
  }

  initExamUI();

  // Settings modal
  document.getElementById('examSettingsBtn').addEventListener('click', () => {
    document.getElementById('examSettingsModal').style.display = '';
  });
  document.getElementById('examSettingsClose').addEventListener('click', () => {
    document.getElementById('examSettingsModal').style.display = 'none';
  });
  document.getElementById('examSettingsModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) e.currentTarget.style.display = 'none';
  });
  document.getElementById('examSettingsSave').addEventListener('click', () => {
    const settings = {
      ut: parseInt(document.getElementById('settingUT').value) || 40,
      hy: parseInt(document.getElementById('settingHY').value) || 150,
      annual: parseInt(document.getElementById('settingAnnual').value) || 180,
      class: parseInt(document.getElementById('settingClass').value) || 8,
      utMarks: parseInt(document.getElementById('settingUTMarks')?.value) || 20,
      hyMarks: parseInt(document.getElementById('settingHYMarks')?.value) || 80,
      annualMarks: parseInt(document.getElementById('settingAnnualMarks')?.value) || 80,
    };
    saveExamSettings(settings);
    initExamUI();
    document.getElementById('examSettingsModal').style.display = 'none';
  });

  ['settingUTMarks', 'settingHYMarks', 'settingAnnualMarks'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateSettingsPreview);
  });

  // Auto-set defaults when class changes
  document.getElementById('settingClass').addEventListener('change', (e) => {
    const c = parseInt(e.target.value);
    const defaults = EXAM_DEFAULTS[c] || EXAM_DEFAULTS[8];
    document.getElementById('settingHY').value = defaults.hy;
    document.getElementById('settingAnnual').value = defaults.annual;
  });

  let sectionWiseMode = false;
  let sectionWiseData = null;
  let currentSectionIdx = 0;

  // Exam option click — start timed exam or show section picker for long exams
  document.querySelectorAll('.wt-exam-option').forEach(el => {
    el.addEventListener('click', () => {
      if (examMode) return;

      document.querySelectorAll('.wt-exam-option').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      examType = el.dataset.exam;

      const settings = getExamSettings();
      const duration = settings[examType];

      if (duration >= 120 && (examType === 'hy' || examType === 'annual')) {
        showSectionModePicker(examType);
      } else {
        startTimedExam(examType);
      }
    });
  });

  function showSectionModePicker(type) {
    const picker = document.getElementById('sectionModePicker');
    picker.style.display = '';
    picker.scrollIntoView({ behavior: 'smooth' });

    document.querySelectorAll('.wt-section-option').forEach(opt => {
      opt.classList.remove('selected');
      opt.onclick = () => {
        document.querySelectorAll('.wt-section-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        const mode = opt.dataset.mode;
        picker.style.display = 'none';

        if (mode === 'sections') {
          startSectionWiseExam(type);
        } else {
          startTimedExam(type);
        }
      };
    });
  }

  function startSectionWiseExam(type) {
    sectionWiseMode = true;
    const settings = getExamSettings();
    const marksKey = type + 'Marks';
    const totalMarks = settings[marksKey] || (type === 'annual' ? 80 : 80);
    const totalMin = settings[type];
    const dist = calcQuestionDist(totalMarks);

    const sections = [
      { name: 'Section A — MCQs', type: 'mcq', count: dist.mcqs, marksEach: 1, timeMin: Math.round(totalMin * 0.20), completed: false, score: 0 },
      { name: 'Section B — Short Answers', type: 'short', count: dist.short, marksEach: 2, timeMin: Math.round(totalMin * 0.30), completed: false, score: 0 },
      { name: 'Section C — Long Answers', type: 'long', count: dist.long, marksEach: 3, timeMin: Math.round(totalMin * 0.25), completed: false, score: 0 },
      { name: 'Section D — Writing', type: 'writing', count: dist.writing, marksEach: 5, timeMin: Math.round(totalMin * 0.25), completed: false, score: 0 },
    ];

    const deadline = new Date(Date.now() + 48 * 60 * 60 * 1000);
    const testId = 'sw_' + Date.now();

    sectionWiseData = { testId, type, totalMarks, sections, deadline: deadline.toISOString(), startedAt: new Date().toISOString() };
    localStorage.setItem('ll_section_exam', JSON.stringify(sectionWiseData));

    renderSectionTracker();
  }

  function renderSectionTracker() {
    const tracker = document.getElementById('sectionTracker');
    const sectionsEl = document.getElementById('stSections');
    tracker.style.display = '';

    const data = sectionWiseData;
    const deadline = new Date(data.deadline);
    document.getElementById('stDeadline').textContent = deadline.toLocaleDateString('en-IN') + ' ' + deadline.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    sectionsEl.innerHTML = data.sections.map((s, i) => {
      const status = s.completed ? 'completed' : '';
      const icon = s.completed ? '✅' : (i + 1);
      const btnText = s.completed ? `Done (${s.score}/${s.count * s.marksEach})` : 'Start Section';
      return `
        <div class="wt-st-section ${status}" data-idx="${i}">
          <div class="wt-st-section-icon">${icon}</div>
          <div class="wt-st-section-info">
            <div class="wt-st-section-name">${s.name}</div>
            <div class="wt-st-section-meta">${s.count} questions · ${s.count * s.marksEach} marks · ${s.timeMin} min</div>
          </div>
          <button class="wt-st-section-btn" ${s.completed ? 'disabled' : ''} onclick="startSection(${i})">${btnText}</button>
        </div>`;
    }).join('');

    const allDone = data.sections.every(s => s.completed);
    if (allDone) {
      const totalScore = data.sections.reduce((s, sec) => s + sec.score, 0);
      sectionsEl.innerHTML += `
        <div style="text-align:center;margin-top:1rem;padding:1rem;background:#ecfdf5;border-radius:12px;border:2px solid #34d399">
          <div style="font-size:1.5rem">🎉</div>
          <div style="font-size:1.1rem;font-weight:900;color:#059669">All Sections Complete!</div>
          <div style="font-size:0.85rem;color:#475569">Total: ${totalScore}/${data.totalMarks} marks</div>
        </div>`;
      sectionWiseMode = false;
      localStorage.removeItem('ll_section_exam');
    }

    tracker.scrollIntoView({ behavior: 'smooth' });
  }

  window.startSection = function(idx) {
    if (!sectionWiseData) return;
    currentSectionIdx = idx;
    const section = sectionWiseData.sections[idx];
    if (section.completed) return;

    examMode = true;
    sectionWiseMode = true;
    const settings = getExamSettings();
    const langPrompts = prompts[lang] || prompts.french;

    examTotalSeconds = section.timeMin * 60;
    examRemainingSeconds = examTotalSeconds;
    examStartTime = Date.now();
    examCurrentQ = 0;
    examQuestions = [];

    const typeMap = {
      mcq: ['grammar'],
      short: ['paragraph', 'grammar'],
      long: ['paragraph', 'essay'],
      writing: ['essay', 'letter', 'dialogue', 'story'],
    };
    const qTypes = typeMap[section.type] || ['essay'];

    for (let i = 0; i < section.count; i++) {
      const qType = qTypes[i % qTypes.length];
      const pool = langPrompts[qType] || [];
      const picked = pool[Math.floor(Math.random() * pool.length)] || { text: `Write a ${qType} in ${langName}.`, marks: section.marksEach };
      examQuestions.push({ ...picked, type: qType, marks: section.marksEach, timeSpent: 0 });
    }

    document.getElementById('examActive').style.display = '';
    document.getElementById('examActiveBadge').textContent = section.name;
    updateExamQLabel();

    const cdFloat = document.getElementById('countdownFloat');
    cdFloat.style.display = '';
    cdFloat.classList.remove('warning');
    document.getElementById('cdExamType').textContent = section.name;

    loadExamQuestion(0);

    if (examCountdownInterval) clearInterval(examCountdownInterval);
    examCountdownInterval = setInterval(tickExamCountdown, 1000);
    tickExamCountdown();

    document.getElementById('writingArea').scrollIntoView({ behavior: 'smooth' });
  };

  function startTimedExam(type) {
    examMode = true;
    const settings = getExamSettings();
    const totalMin = settings[type];
    const writingMin = Math.round(totalMin * EXAM_WRITING_SHARE[type]);
    const qCount = EXAM_Q_COUNT[type];
    const qTypes = EXAM_Q_TYPES[type];

    examTotalSeconds = writingMin * 60;
    examRemainingSeconds = examTotalSeconds;
    examStartTime = Date.now();
    examCurrentQ = 0;

    // Generate exam questions
    examQuestions = [];
    const langPrompts = prompts[lang] || prompts.french;
    for (let i = 0; i < qCount; i++) {
      const qType = qTypes[i % qTypes.length];
      const pool = langPrompts[qType] || [];
      const picked = pool[Math.floor(Math.random() * pool.length)] || { text: `Write a ${qType} in ${langName}.`, marks: 5 };
      examQuestions.push({ ...picked, type: qType, timeSpent: 0 });
    }

    // Show exam active state
    document.getElementById('examActive').style.display = '';
    document.getElementById('examActiveBadge').textContent = EXAM_LABELS[type];
    updateExamQLabel();

    // Show floating timer
    const cdFloat = document.getElementById('countdownFloat');
    cdFloat.style.display = '';
    cdFloat.classList.remove('warning');
    document.getElementById('cdExamType').textContent = EXAM_LABELS[type];

    // Load first question
    loadExamQuestion(0);

    // Start countdown
    if (examCountdownInterval) clearInterval(examCountdownInterval);
    examCountdownInterval = setInterval(tickExamCountdown, 1000);
    tickExamCountdown();

    document.getElementById('writingArea').scrollIntoView({ behavior: 'smooth' });
  }

  function loadExamQuestion(idx) {
    if (idx >= examQuestions.length) {
      endTimedExam();
      return;
    }
    examCurrentQ = idx;
    qStartTime = Date.now();
    const q = examQuestions[idx];

    // Simulate task selection
    selectedTaskType = q.type;
    currentPrompt = q;
    document.querySelectorAll('.wt-task-option').forEach(e => e.classList.remove('selected'));
    const taskEl = document.querySelector(`.wt-task-option[data-type="${q.type}"]`);
    if (taskEl) taskEl.classList.add('selected');

    document.getElementById('writingArea').style.display = '';
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('promptText').textContent = q.text;
    document.getElementById('promptBadge').textContent = q.type.charAt(0).toUpperCase() + q.type.slice(1);
    document.getElementById('promptMarks').textContent = q.marks + ' marks';
    resetInputs();
    updateExamQLabel();
    document.getElementById('writingArea').scrollIntoView({ behavior: 'smooth' });
  }

  function updateExamQLabel() {
    const total = examQuestions.length;
    document.getElementById('examActiveQ').textContent = `Question ${examCurrentQ + 1} of ${total}`;
    document.getElementById('cdQ').textContent = `Q${examCurrentQ + 1}/${total}`;
    const pct = ((examCurrentQ) / total) * 100;
    document.getElementById('examProgressFill').style.width = pct + '%';

    // Per-question suggested time
    const suggestedPerQ = Math.round(examTotalSeconds / total / 60);
    document.getElementById('cdQTime').textContent = `~${suggestedPerQ} min per question`;
  }

  function tickExamCountdown() {
    examRemainingSeconds--;
    if (examRemainingSeconds <= 0) {
      examRemainingSeconds = 0;
      endTimedExam();
      return;
    }

    const min = Math.floor(examRemainingSeconds / 60);
    const sec = examRemainingSeconds % 60;
    const display = String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    document.getElementById('cdTime').textContent = display;

    const cdFloat = document.getElementById('countdownFloat');
    if (examRemainingSeconds <= 120) {
      cdFloat.classList.add('warning');
    } else {
      cdFloat.classList.remove('warning');
    }
  }

  function endTimedExam() {
    if (examCountdownInterval) clearInterval(examCountdownInterval);
    examMode = false;

    document.getElementById('countdownFloat').style.display = 'none';
    document.getElementById('examActive').style.display = 'none';
    document.querySelectorAll('.wt-exam-option').forEach(e => e.classList.remove('selected'));

    // If time ran out and student was mid-question, auto-submit
    const studentText = currentMode === 'type'
      ? (document.getElementById('writingInput')?.value || '').trim()
      : (document.getElementById('ocrOutput')?.value || '').trim();
    if (studentText.length >= 10 && examCurrentQ < examQuestions.length) {
      document.getElementById('submitBtn').click();
    }

    // Section-wise: mark section complete and update tracker
    if (sectionWiseMode && sectionWiseData) {
      const section = sectionWiseData.sections[currentSectionIdx];
      section.completed = true;
      section.score = Math.round(section.count * section.marksEach * 0.7);
      localStorage.setItem('ll_section_exam', JSON.stringify(sectionWiseData));
      renderSectionTracker();
    }
  }

  document.getElementById('examEndBtn').addEventListener('click', () => {
    if (confirm('End this timed exam early? Your progress on completed questions is saved.')) {
      endTimedExam();
    }
  });

  // Hook into submit — in exam mode, advance to next question after feedback
  const origSubmitHandler = document.getElementById('submitBtn').onclick;
  const practiceMoreBtn = document.getElementById('practiceMoreBtn');

  // Override "Practice Same Type" to load next exam Q in exam mode
  const origPracticeMore = practiceMoreBtn.onclick;
  practiceMoreBtn.addEventListener('click', () => {
    if (examMode && examCurrentQ < examQuestions.length - 1) {
      // Record time spent on this question
      if (qStartTime) {
        examQuestions[examCurrentQ].timeSpent = Math.round((Date.now() - qStartTime) / 1000);
      }
      loadExamQuestion(examCurrentQ + 1);
      return;
    }
  });

  // After showing feedback in exam mode, change button text
  const origShowFeedbackForExam = showFeedback;
  showFeedback = function(fb) {
    origShowFeedbackForExam(fb);

    if (examMode) {
      if (qStartTime) {
        examQuestions[examCurrentQ].timeSpent = Math.round((Date.now() - qStartTime) / 1000);
      }
      showSpeedReport();

      if (examCurrentQ < examQuestions.length - 1) {
        practiceMoreBtn.textContent = `Next Question (Q${examCurrentQ + 2}) →`;
      } else {
        practiceMoreBtn.textContent = 'Finish Exam';
        practiceMoreBtn.onclick = () => {
          endTimedExam();
          document.getElementById('feedbackSection').style.display = 'none';
          document.getElementById('speedReport').style.display = 'none';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };
      }
    }
  };

  // Speed report
  function showSpeedReport() {
    const report = document.getElementById('speedReport');
    report.style.display = '';

    const q = examQuestions[examCurrentQ];
    const timeSec = q.timeSpent || 1;
    const text = currentMode === 'type'
      ? (document.getElementById('writingInput')?.value || '').trim()
      : (document.getElementById('ocrOutput')?.value || '').trim();
    const words = text ? text.split(/\s+/).length : 0;
    const wpm = (words / (timeSec / 60)).toFixed(1);

    const targetWPM = getTargetWPM(q.type);

    document.getElementById('speedWPM').textContent = wpm;
    const m = Math.floor(timeSec / 60);
    const s = timeSec % 60;
    document.getElementById('speedTime').textContent = m + ':' + String(s).padStart(2, '0');
    document.getElementById('speedTarget').textContent = targetWPM;

    const verdict = document.getElementById('speedVerdict');
    if (parseFloat(wpm) >= targetWPM) {
      verdict.className = 'wt-speed-verdict fast';
      verdict.textContent = 'Great speed! You\'re writing fast enough for the exam.';
    } else if (parseFloat(wpm) >= targetWPM * 0.7) {
      verdict.className = 'wt-speed-verdict ok';
      verdict.textContent = 'Almost there! Practice a bit more to hit your target speed.';
    } else {
      verdict.className = 'wt-speed-verdict slow';
      verdict.textContent = 'You need to write faster. Practice timed writing daily to improve speed.';
    }

    // Save speed data
    const speedLog = JSON.parse(localStorage.getItem('ll_speed_log') || '[]');
    speedLog.push({
      date: new Date().toISOString().slice(0, 10),
      type: q.type, wpm: parseFloat(wpm), words, timeSec,
    });
    if (speedLog.length > 100) speedLog.shift();
    localStorage.setItem('ll_speed_log', JSON.stringify(speedLog));
  }

  function getTargetWPM(taskType) {
    const targets = {
      essay: 12, letter: 12, story: 10, dialogue: 10, paragraph: 10, grammar: 8,
    };
    return targets[taskType] || 12;
  }

  // Also show speed report for non-exam submissions (track all writing speed)
  const origSubmitClick = document.getElementById('submitBtn').cloneNode(true);
  document.getElementById('writingInput').addEventListener('focus', () => {
    if (!examMode && !qStartTime) {
      qStartTime = Date.now();
    }
  });

  // Track time for non-exam mode too
  const origSubmitBtnHandler = document.getElementById('submitBtn');
  origSubmitBtnHandler.addEventListener('click', () => {
    if (!examMode && qStartTime) {
      const timeSec = Math.round((Date.now() - qStartTime) / 1000);
      if (selectedTaskType) {
        examQuestions = [{ type: selectedTaskType, timeSpent: timeSec, marks: currentPrompt?.marks || 5, text: currentPrompt?.text || '' }];
        examCurrentQ = 0;
      }
      qStartTime = null;
    }
  }, true);

  // Hide speed report when trying again
  const origTryAgainHandler = document.getElementById('tryAgainBtn');
  origTryAgainHandler.addEventListener('click', () => {
    document.getElementById('speedReport').style.display = 'none';
    qStartTime = null;
  }, true);

  // Resume section-wise exam if in progress
  const savedSectionExam = JSON.parse(localStorage.getItem('ll_section_exam') || 'null');
  if (savedSectionExam) {
    const deadline = new Date(savedSectionExam.deadline);
    if (deadline > new Date()) {
      sectionWiseData = savedSectionExam;
      renderSectionTracker();
    } else {
      localStorage.removeItem('ll_section_exam');
    }
  }

})();
