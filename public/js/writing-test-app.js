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
    btn.disabled = true;
    submitText.textContent = 'AI is grading...';
    spinner.style.display = 'inline-block';

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
    btn.disabled = false;

    saveToPastList(studentText);
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
    document.querySelectorAll('.wt-task-option').forEach(e => e.classList.remove('selected'));
    document.getElementById('writingArea').style.display = 'none';
    selectedTaskType = null;
    resetInputs();
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
})();
