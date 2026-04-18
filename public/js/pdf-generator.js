// ===== PDF NOTES GENERATOR — AGE-APPROPRIATE CBSE CHAPTER PDFs =====

function getAgeTheme(cls) {
  if (cls <= 7) return 'young';
  if (cls === 8) return 'mid';
  return 'senior';
}

const themeColors = {
  young: { primary: '#6366f1', secondary: '#f472b6', accent: '#06d6a0', bg: '#fef9ff', cardBg: '#f0e6ff', headerBg: 'linear-gradient(135deg, #6366f1 0%, #f472b6 100%)', text: '#1e1b4b' },
  mid: { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#14b8a6', bg: '#f8faff', cardBg: '#eef2ff', headerBg: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', text: '#1e293b' },
  senior: { primary: '#1e40af', secondary: '#7c3aed', accent: '#059669', bg: '#ffffff', cardBg: '#f1f5f9', headerBg: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)', text: '#0f172a' }
};

const funCharacters = {
  french: { emoji: '🥖', mascot: 'Pierre the Parrot 🦜', greeting: 'Bonjour, mon ami!' },
  german: { emoji: '🥨', mascot: 'Fritz the Fox 🦊', greeting: 'Hallo, mein Freund!' },
  sanskrit: { emoji: '🪷', mascot: 'Guru the Owl 🦉', greeting: 'नमस्ते मित्र!' },
  japanese: { emoji: '🌸', mascot: 'Sakura the Cat 🐱', greeting: 'こんにちは！' },
  spanish: { emoji: '💃', mascot: 'Luna the Butterfly 🦋', greeting: '¡Hola, amigo!' }
};

function buildPDFHtml(lang, cls, idx) {
  const langData = syllabusData[lang];
  const ch = langData.classes[cls].chapters[idx];
  const textbook = langData.classes[cls].textbook;
  const content = getChapterContent(lang, cls, idx);
  const theme = getAgeTheme(cls);
  const colors = themeColors[theme];
  const character = funCharacters[lang] || funCharacters.french;

  let mascotHtml = '';
  if (theme === 'young') {
    mascotHtml = `
      <div style="background:${colors.cardBg};border-radius:16px;padding:16px 20px;margin:12px 0 20px;display:flex;align-items:center;gap:12px;border:2px dashed ${colors.primary}">
        <span style="font-size:2.5rem">${character.mascot.split(' ').pop()}</span>
        <div>
          <div style="font-weight:800;color:${colors.primary};font-size:1rem">${character.mascot.replace(/\s*\S+$/, '')} says:</div>
          <div style="font-size:0.92rem;color:${colors.text}">"${character.greeting} Let's learn Chapter ${ch.num} together! It's going to be super fun! 🎉"</div>
        </div>
      </div>`;
  }

  let vocabHtml = '';
  if (content && content.vocab && content.vocab.length) {
    const rows = content.vocab.map((v, i) => {
      const bg = i % 2 === 0 ? colors.cardBg : '#ffffff';
      return `<tr style="background:${bg}"><td style="padding:8px 12px;font-weight:700;color:${colors.primary};border-bottom:1px solid #e2e8f0">${v.word}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${v.meaning}</td><td style="padding:8px 12px;font-style:italic;color:#64748b;border-bottom:1px solid #e2e8f0">${v.example}</td></tr>`;
    }).join('');
    const icon = theme === 'young' ? '📚 ' : '';
    vocabHtml = `
      <div style="margin:20px 0">
        <h3 style="color:${colors.primary};font-size:1.1rem;margin-bottom:8px;border-bottom:3px solid ${colors.secondary};display:inline-block;padding-bottom:4px">${icon}Vocabulary / शब्दावली</h3>
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem;margin-top:8px;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
          <thead><tr style="background:${colors.primary};color:white"><th style="padding:10px 12px;text-align:left">Word</th><th style="padding:10px 12px;text-align:left">Meaning</th><th style="padding:10px 12px;text-align:left">Example</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  let grammarHtml = '';
  if (content && content.grammar && content.grammar.length) {
    const rules = content.grammar.map((g, i) => {
      const borderColor = [colors.primary, colors.secondary, colors.accent][i % 3];
      const icon = theme === 'young' ? ['⭐', '🌟', '✨'][i % 3] + ' ' : '';
      return `
        <div style="background:${colors.cardBg};border-left:4px solid ${borderColor};border-radius:0 12px 12px 0;padding:14px 16px;margin:10px 0">
          <div style="font-weight:800;color:${borderColor};font-size:0.95rem;margin-bottom:4px">${icon}${g.rule}</div>
          <div style="font-size:0.88rem;color:${colors.text};line-height:1.6">${g.explanation}</div>
        </div>`;
    }).join('');
    const icon = theme === 'young' ? '🧠 ' : '';
    grammarHtml = `
      <div style="margin:20px 0">
        <h3 style="color:${colors.primary};font-size:1.1rem;margin-bottom:8px;border-bottom:3px solid ${colors.secondary};display:inline-block;padding-bottom:4px">${icon}Grammar Rules / व्याकरण</h3>
        ${rules}
      </div>`;
  }

  let qaHtml = '';
  if (content && content.importantQA && content.importantQA.length) {
    const qas = content.importantQA.map((qa, i) => {
      const num = i + 1;
      return `
        <div style="margin:12px 0;padding:12px 16px;background:white;border-radius:12px;border:1px solid #e2e8f0">
          <div style="font-weight:700;color:${colors.primary};font-size:0.9rem;margin-bottom:6px">Q${num}. ${qa.q}</div>
          <div style="font-size:0.88rem;color:${colors.accent};font-weight:600;background:${colors.cardBg};padding:8px 12px;border-radius:8px"><strong>Ans:</strong> ${qa.a}</div>
        </div>`;
    }).join('');
    const icon = theme === 'young' ? '🎯 ' : '';
    qaHtml = `
      <div style="margin:20px 0">
        <h3 style="color:${colors.primary};font-size:1.1rem;margin-bottom:8px;border-bottom:3px solid ${colors.secondary};display:inline-block;padding-bottom:4px">${icon}Important Questions / महत्त्वपूर्ण प्रश्न</h3>
        ${qas}
      </div>`;
  }

  let exerciseHtml = '';
  if (content && content.exercises && content.exercises.length) {
    const exs = content.exercises.map((ex, i) => {
      return `
        <div style="margin:10px 0;padding:12px 16px;background:white;border-radius:12px;border:1px solid #e2e8f0">
          <div style="font-weight:700;color:${colors.secondary};font-size:0.9rem;margin-bottom:6px">Ex ${i + 1}. ${ex.q}</div>
          <div style="font-size:0.88rem;color:#059669;font-weight:600;background:#ecfdf5;padding:8px 12px;border-radius:8px"><strong>Solution:</strong> ${ex.a}</div>
        </div>`;
    }).join('');
    const icon = theme === 'young' ? '✏️ ' : '';
    exerciseHtml = `
      <div style="margin:20px 0">
        <h3 style="color:${colors.primary};font-size:1.1rem;margin-bottom:8px;border-bottom:3px solid ${colors.secondary};display:inline-block;padding-bottom:4px">${icon}Back Exercise Solutions / अभ्यास हल</h3>
        ${exs}
      </div>`;
  }

  let noContentMsg = '';
  if (!content) {
    noContentMsg = `
      <div style="text-align:center;padding:40px 20px;color:#64748b">
        <div style="font-size:3rem;margin-bottom:12px">${theme === 'young' ? '🚧' : '📝'}</div>
        <div style="font-size:1.1rem;font-weight:700;margin-bottom:8px">Detailed content coming soon!</div>
        <div style="font-size:0.9rem">We're preparing comprehensive notes with vocabulary, grammar, and solved exercises for this chapter. Check back soon!</div>
      </div>`;
  }

  const topicsStr = ch.topics.map(t => `<span style="display:inline-block;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:20px;font-size:0.78rem;margin:2px">${t}</span>`).join(' ');

  let funFooter = '';
  if (theme === 'young') {
    funFooter = `
      <div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:12px;padding:14px 18px;margin:20px 0;text-align:center;border:2px solid #f59e0b">
        <div style="font-size:1.5rem">🌟 Great job studying! 🌟</div>
        <div style="font-size:0.88rem;color:#92400e;margin-top:4px;font-weight:600">Remember: Practice makes perfect! Try the worksheet too! ${character.emoji}</div>
      </div>`;
  }

  return `
    <div id="pdfContent" style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:800px;margin:0 auto;color:${colors.text};background:${colors.bg};padding:0">
      <!-- Header -->
      <div style="background:${colors.headerBg};color:white;padding:28px 32px;border-radius:0 0 24px 24px;margin-bottom:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="font-size:0.8rem;opacity:0.9;font-weight:600">LinguaLearn — CBSE ${langData.name} Notes</div>
          <div style="font-size:0.8rem;opacity:0.9;font-weight:600">Class ${cls}</div>
        </div>
        <div style="font-size:1.6rem;font-weight:900;margin-bottom:6px">${character.emoji} Chapter ${ch.num}: ${ch.title}</div>
        <div style="font-size:0.85rem;opacity:0.85;margin-bottom:10px">📖 ${textbook} — ${langData.classes[cls].publisher}</div>
        <div>${topicsStr}</div>
      </div>

      <div style="padding:0 24px 24px">
        ${mascotHtml}
        ${vocabHtml || ''}
        ${grammarHtml || ''}
        ${qaHtml || ''}
        ${exerciseHtml || ''}
        ${noContentMsg}
        ${funFooter}

        <!-- Footer -->
        <div style="margin-top:24px;padding-top:16px;border-top:2px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;color:#94a3b8">
          <div>Generated by LinguaLearn — padhlo.life</div>
          <div>${langData.name} Class ${cls} — Ch. ${ch.num}</div>
        </div>
      </div>
    </div>`;
}

function downloadChapterPDF(lang, cls, idx) {
  const langData = syllabusData[lang];
  const ch = langData.classes[cls].chapters[idx];
  const html = buildPDFHtml(lang, cls, idx);

  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '800px';
  container.style.background = 'white';
  document.body.appendChild(container);

  const filename = `${langData.name}_Class${cls}_Ch${ch.num}_${ch.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}.pdf`;

  const opt = {
    margin: [0.3, 0.3, 0.5, 0.3],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(opt).from(container.firstElementChild).save().then(() => {
    document.body.removeChild(container);
    addXP(25, 'pdf');
    showToast(`PDF downloaded: ${langData.name} Ch. ${ch.num}`, 'success');
  }).catch(err => {
    document.body.removeChild(container);
    showToast('PDF generation failed. Please try again.', 'error');
    console.error('PDF error:', err);
  });
}

function previewChapterPDF(lang, cls, idx) {
  const html = buildPDFHtml(lang, cls, idx);
  const langData = syllabusData[lang];
  const ch = langData.classes[cls].chapters[idx];

  addXP(15, 'notes');
  awardBadge('notes');
  updateDashNotesViewed();

  showContentModal({
    tag: `📘 Detailed Notes — ${langData.name} Class ${cls}`,
    title: `Ch. ${ch.num}: ${ch.title}`,
    print: true,
    html: `
      <div style="margin-bottom:16px;display:flex;gap:8px;justify-content:center">
        <button onclick="downloadChapterPDF('${lang}', ${cls}, ${idx})" style="background:linear-gradient(135deg,#6366f1,#7c3aed);color:white;border:none;padding:10px 24px;border-radius:10px;font-weight:800;font-size:0.9rem;cursor:pointer;font-family:inherit">⬇️ Download PDF</button>
      </div>
      ${html}
    `
  });
}

function showToast(msg, type) {
  const existing = document.querySelector('.pdf-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'pdf-toast';
  toast.textContent = msg;
  const bg = type === 'success' ? '#06d6a0' : type === 'error' ? '#ef4444' : '#6366f1';
  toast.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:${bg};color:white;padding:12px 24px;border-radius:12px;font-weight:700;font-size:0.9rem;z-index:99999;box-shadow:0 8px 24px rgba(0,0,0,0.2);animation:toastIn 0.3s ease`;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}
