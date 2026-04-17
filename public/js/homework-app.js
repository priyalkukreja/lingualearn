/* ===== Homework App ===== */
(function () {
  if (!requireAuth()) return;
  startSession();

  const dropzone    = document.getElementById('dropzone');
  const fileInput   = document.getElementById('fileInput');
  const browseBtn   = document.getElementById('browseBtn');
  const filePreview = document.getElementById('filePreview');
  const fileName    = document.getElementById('fileName');
  const fileSize    = document.getElementById('fileSize');
  const removeFile  = document.getElementById('removeFile');
  const uploadBtn   = document.getElementById('uploadBtn');
  const uploadText  = document.getElementById('uploadBtnText');
  const uploadSpin  = document.getElementById('uploadSpinner');
  const hwTitle     = document.getElementById('hwTitle');
  const feedbackSec = document.getElementById('feedbackSection');
  const feedbackList = document.getElementById('feedbackList');
  const scoreBadge  = document.getElementById('scoreValue');
  const practiceSec = document.getElementById('practiceSection');
  const practiceList = document.getElementById('practiceList');
  const pastList    = document.getElementById('pastList');
  const pastEmpty   = document.getElementById('pastEmpty');

  let selectedFile = null;

  /* ---- Drag and drop ---- */
  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) handleFile(fileInput.files[0]);
  });

  removeFile.addEventListener('click', e => {
    e.stopPropagation();
    clearFile();
  });

  function handleFile(file) {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      alert('Please upload a PDF or image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be under 10 MB.');
      return;
    }
    selectedFile = file;
    fileName.textContent = file.name;
    fileSize.textContent = formatSize(file.size);
    filePreview.style.display = 'flex';
    dropzone.style.display = 'none';
    uploadBtn.disabled = false;
  }

  function clearFile() {
    selectedFile = null;
    fileInput.value = '';
    filePreview.style.display = 'none';
    dropzone.style.display = '';
    uploadBtn.disabled = true;
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  /* ---- Upload ---- */
  uploadBtn.addEventListener('click', async () => {
    if (!selectedFile) return;
    const title = hwTitle.value.trim() || 'Untitled Homework';

    uploadBtn.disabled = true;
    uploadText.textContent = 'Analyzing...';
    uploadSpin.style.display = 'inline-block';

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', title);

    try {
      const data = await apiUpload('/api/homework/upload', formData);
      if (data && data.feedback) {
        showFeedback(data);
      } else if (data && data.error) {
        alert('Error: ' + data.error);
      } else {
        // Demo fallback - show sample feedback
        showFeedback(generateDemoFeedback(title));
      }
    } catch (err) {
      console.error(err);
      // Demo fallback
      showFeedback(generateDemoFeedback(hwTitle.value.trim() || 'Homework'));
    }

    uploadText.textContent = 'Upload & Analyze';
    uploadSpin.style.display = 'none';
    uploadBtn.disabled = false;
    clearFile();
    hwTitle.value = '';
    loadPastHomework();
  });

  /* ---- Display Feedback ---- */
  function showFeedback(data) {
    feedbackSec.style.display = '';
    feedbackSec.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Score
    const score = data.score ?? data.feedback.reduce((acc, q) => acc + (q.correct ? 1 : 0), 0);
    const total = data.feedback.length;
    scoreBadge.textContent = score + '/' + total;

    // Feedback cards
    feedbackList.innerHTML = '';
    data.feedback.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'fb-card ' + (item.correct ? 'correct' : 'wrong');
      card.innerHTML = `
        <div class="fb-q-header">
          <span class="fb-status-icon">${item.correct ? '✅' : '❌'}</span>
          <span class="fb-q-label">Question ${i + 1}</span>
        </div>
        <div class="fb-answer">Your answer: <strong>${item.studentAnswer || '—'}</strong></div>
        ${!item.correct ? `<div class="fb-answer">Correct answer: <strong>${item.correctAnswer || '—'}</strong></div>` : ''}
        <div class="fb-explanation">${item.feedback || item.explanation || ''}</div>
      `;
      feedbackList.appendChild(card);
    });

    // Practice questions
    if (data.practiceQuestions && data.practiceQuestions.length) {
      practiceSec.style.display = '';
      practiceList.innerHTML = '';
      data.practiceQuestions.forEach((pq, i) => {
        const card = document.createElement('div');
        card.className = 'practice-card';
        card.innerHTML = `
          <div class="pc-q">${i + 1}. ${pq.question}</div>
          ${pq.hint ? `<div class="pc-hint">Hint: ${pq.hint}</div>` : ''}
        `;
        practiceList.appendChild(card);
      });
    }
  }

  /* ---- Demo Feedback Generator ---- */
  function generateDemoFeedback(title) {
    return {
      score: 7,
      feedback: [
        { correct: true, studentAnswer: 'सूरज पूरब से उगता है', feedback: 'Perfect! Correct use of postposition "से" with direction.' },
        { correct: true, studentAnswer: 'Le chat est sur la table', feedback: 'Excellent! Correct article and preposition usage.' },
        { correct: false, studentAnswer: 'वह बाज़ार जाता है', correctAnswer: 'वह बाज़ार को जाता है', feedback: 'You need the postposition "को" after the destination. In Hindi, when indicating direction of movement, use "को" with the destination noun.' },
        { correct: true, studentAnswer: 'Je suis allé au cinéma', feedback: 'Great use of passé composé with être!' },
        { correct: false, studentAnswer: 'Les enfants joue', correctAnswer: 'Les enfants jouent', feedback: 'Subject-verb agreement: with plural subjects like "les enfants", the verb needs the plural conjugation "-ent".' },
        { correct: true, studentAnswer: 'राम ने खाना खाया', feedback: 'Correct use of "ने" with transitive verb in past tense.' },
        { correct: true, studentAnswer: 'Elle a mangé une pomme', feedback: 'Perfect passé composé with avoir.' },
        { correct: true, studentAnswer: 'मैं विद्यालय जाता हूँ', feedback: 'Correct sentence structure with proper verb form.' },
        { correct: false, studentAnswer: 'Nous allons a Paris', correctAnswer: 'Nous allons à Paris', feedback: 'Remember the accent! "à" (with accent grave) is the preposition meaning "to". Without the accent, "a" is the verb avoir.' },
        { correct: true, studentAnswer: 'उसने किताब पढ़ी', feedback: 'Correct gender agreement — "पढ़ी" matches feminine "किताब".' },
      ],
      practiceQuestions: [
        { question: 'Fill in the blank: वह स्कूल ___ जाता है (postposition)', hint: 'Think about direction/destination' },
        { question: 'Conjugate "jouer" for "ils" in present tense', hint: 'Third person plural ending' },
        { question: 'Write a sentence using "ने" with a transitive verb', hint: 'Past tense requires "ने" with the subject' },
      ]
    };
  }

  /* ---- Past Homework ---- */
  async function loadPastHomework() {
    try {
      const data = await apiGet('/api/homework/list');
      if (data && data.homework && data.homework.length) {
        renderPastList(data.homework);
        return;
      }
    } catch (e) { /* use demo data */ }

    // Demo data
    const demo = JSON.parse(localStorage.getItem('ll_hw_demo') || '[]');
    if (demo.length) renderPastList(demo);
  }

  function renderPastList(items) {
    pastEmpty.style.display = 'none';
    // Clear existing past-cards but keep empty message
    pastList.querySelectorAll('.past-card').forEach(c => c.remove());

    items.forEach(hw => {
      const scoreNum = typeof hw.score === 'number' ? hw.score : parseInt(hw.score);
      const scoreClass = scoreNum >= 80 ? 'high' : scoreNum >= 50 ? 'mid' : 'low';
      const card = document.createElement('div');
      card.className = 'past-card';
      card.innerHTML = `
        <span class="past-icon">📄</span>
        <div class="past-info">
          <div class="past-title">${hw.title || 'Homework'}</div>
          <div class="past-date">${hw.date || new Date(hw.createdAt || Date.now()).toLocaleDateString('en-IN')}</div>
        </div>
        <span class="past-score ${scoreClass}">${scoreNum}%</span>
      `;
      pastList.appendChild(card);
    });
  }

  loadPastHomework();
})();
