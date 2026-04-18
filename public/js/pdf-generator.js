// ===== PDF NOTES GENERATOR — SIMPLE, KID-FRIENDLY, WITH TRICKS =====

function getAgeTheme(cls) {
  if (cls <= 7) return 'young';
  if (cls === 8) return 'mid';
  return 'senior';
}

const themeColors = {
  young: { primary: '#6366f1', secondary: '#f472b6', accent: '#06d6a0', bg: '#fef9ff', cardBg: '#f0e6ff', tipBg: '#fef3c7', tipBorder: '#f59e0b', headerBg: 'linear-gradient(135deg, #6366f1 0%, #f472b6 100%)', text: '#1e1b4b' },
  mid: { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#14b8a6', bg: '#f8faff', cardBg: '#eef2ff', tipBg: '#ecfdf5', tipBorder: '#10b981', headerBg: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', text: '#1e293b' },
  senior: { primary: '#1e40af', secondary: '#7c3aed', accent: '#059669', bg: '#ffffff', cardBg: '#f1f5f9', tipBg: '#eff6ff', tipBorder: '#3b82f6', headerBg: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)', text: '#0f172a' }
};

const funCharacters = {
  french: { emoji: '🥖', mascot: 'Pierre the Parrot', icon: '🦜', greeting: 'Bonjour!' },
  german: { emoji: '🥨', mascot: 'Fritz the Fox', icon: '🦊', greeting: 'Hallo!' },
  sanskrit: { emoji: '🪷', mascot: 'Guru the Owl', icon: '🦉', greeting: 'नमस्ते!' },
  japanese: { emoji: '🌸', mascot: 'Sakura the Cat', icon: '🐱', greeting: 'こんにちは!' },
  spanish: { emoji: '💃', mascot: 'Luna the Butterfly', icon: '🦋', greeting: '¡Hola!' }
};

function nl2br(text) {
  return text.replace(/\n/g, '<br>');
}

function buildPDFHtml(lang, cls, idx) {
  const langData = syllabusData[lang];
  const ch = langData.classes[cls].chapters[idx];
  const textbook = langData.classes[cls].textbook;
  const content = getChapterContent(lang, cls, idx);
  const theme = getAgeTheme(cls);
  const colors = themeColors[theme];
  const character = funCharacters[lang] || funCharacters.french;
  const isYoung = theme === 'young';

  const topicsStr = ch.topics.map(t => `<span style="display:inline-block;background:rgba(255,255,255,0.25);padding:3px 10px;border-radius:20px;font-size:0.78rem;margin:2px">${t}</span>`).join(' ');

  let sections = '';

  if (content) {
    // 1. MASCOT + SUMMARY
    if (content.summary) {
      const mascotIcon = isYoung ? `<span style="font-size:2.2rem;flex-shrink:0">${character.icon}</span>` : '';
      const mascotLabel = isYoung
        ? `<div style="font-weight:800;color:${colors.primary};font-size:0.95rem;margin-bottom:4px">${character.mascot} says:</div>`
        : `<div style="font-weight:800;color:${colors.primary};font-size:1rem;margin-bottom:4px">What This Chapter is About</div>`;
      sections += `
        <div style="background:${colors.cardBg};border-radius:14px;padding:16px 18px;margin:16px 0 22px;display:flex;align-items:flex-start;gap:12px;border:2px ${isYoung ? 'dashed' : 'solid'} ${colors.primary}">
          ${mascotIcon}
          <div>
            ${mascotLabel}
            <div style="font-size:0.9rem;color:${colors.text};line-height:1.65">${content.summary}</div>
          </div>
        </div>`;
    }

    // 2. FULL CHAPTER EXPLANATION
    if (content.explain && content.explain.length) {
      const explainBlocks = content.explain.map((section, i) => {
        const borderColor = [colors.primary, colors.secondary, colors.accent, '#f59e0b'][i % 4];
        const icon = isYoung ? ['📖', '📝', '💡', '🔍'][i % 4] + ' ' : '';
        return `
          <div style="margin:14px 0;page-break-inside:avoid">
            <div style="font-weight:800;color:${borderColor};font-size:1.05rem;margin-bottom:8px;padding-bottom:4px;border-bottom:3px solid ${borderColor};display:inline-block">${icon}${section.heading}</div>
            <div style="font-size:0.88rem;color:${colors.text};line-height:1.75;background:white;padding:14px 16px;border-radius:10px;border:1px solid #e2e8f0;border-left:4px solid ${borderColor}">${nl2br(section.text)}</div>
          </div>`;
      }).join('');
      sections += `
        <div style="margin:22px 0">
          <h3 style="color:${colors.primary};font-size:1.15rem;margin-bottom:10px">${isYoung ? '📚 ' : ''}Full Chapter Explanation</h3>
          ${explainBlocks}
        </div>`;
    }

    // 3. MEMORY TRICKS
    if (content.tricks && content.tricks.length) {
      const trickCards = content.tricks.map((t, i) => {
        const bg = isYoung ? ['#fef3c7', '#dbeafe', '#d1fae5', '#fce7f3'][i % 4] : colors.cardBg;
        const border = isYoung ? ['#f59e0b', '#3b82f6', '#10b981', '#ec4899'][i % 4] : colors.secondary;
        const emoji = isYoung ? ['🧠', '💡', '⚡', '🎯'][i % 4] : '→';
        return `
          <div style="background:${bg};border:2px solid ${border};border-radius:12px;padding:14px 16px;margin:8px 0;page-break-inside:avoid">
            <div style="font-weight:800;color:${border};font-size:0.92rem;margin-bottom:4px">${emoji} ${t.title}</div>
            <div style="font-size:0.86rem;color:${colors.text};line-height:1.6">${nl2br(t.trick)}</div>
          </div>`;
      }).join('');
      sections += `
        <div style="margin:22px 0">
          <h3 style="color:${colors.secondary};font-size:1.15rem;margin-bottom:10px">${isYoung ? '🧠 ' : ''}Memory Tricks & Tips</h3>
          ${trickCards}
        </div>`;
    }

    // 4. VOCABULARY TABLE
    if (content.vocab && content.vocab.length) {
      const rows = content.vocab.map((v, i) => {
        const bg = i % 2 === 0 ? colors.cardBg : '#ffffff';
        return `<tr style="background:${bg}"><td style="padding:8px 12px;font-weight:700;color:${colors.primary};border-bottom:1px solid #e2e8f0">${v.word}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${v.meaning}</td><td style="padding:8px 12px;font-style:italic;color:#64748b;border-bottom:1px solid #e2e8f0;font-size:0.82rem">${v.example}</td></tr>`;
      }).join('');
      sections += `
        <div style="margin:22px 0;page-break-inside:avoid">
          <h3 style="color:${colors.primary};font-size:1.15rem;margin-bottom:10px">${isYoung ? '📚 ' : ''}Word List</h3>
          <table style="width:100%;border-collapse:collapse;font-size:0.86rem;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0">
            <thead><tr style="background:${colors.primary};color:white"><th style="padding:10px 12px;text-align:left">Word</th><th style="padding:10px 12px;text-align:left">Meaning</th><th style="padding:10px 12px;text-align:left">Example</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;
    }

    // 5. IMPORTANT QUESTIONS & ANSWERS
    if (content.importantQA && content.importantQA.length) {
      const qas = content.importantQA.map((qa, i) => {
        return `
          <div style="margin:10px 0;padding:12px 14px;background:white;border-radius:10px;border:1px solid #e2e8f0;page-break-inside:avoid">
            <div style="font-weight:700;color:${colors.primary};font-size:0.88rem;margin-bottom:6px">${isYoung ? '❓ ' : ''}Q${i + 1}. ${qa.q}</div>
            <div style="font-size:0.86rem;color:${colors.accent};font-weight:600;background:${colors.cardBg};padding:8px 12px;border-radius:8px">${isYoung ? '✅ ' : ''}<strong>Ans:</strong> ${qa.a}</div>
          </div>`;
      }).join('');
      sections += `
        <div style="margin:22px 0">
          <h3 style="color:${colors.primary};font-size:1.15rem;margin-bottom:10px">${isYoung ? '🎯 ' : ''}Important Questions for Exams</h3>
          ${qas}
        </div>`;
    }

    // 6. SOLVED EXERCISES
    if (content.exercises && content.exercises.length) {
      const exs = content.exercises.map((ex, i) => {
        return `
          <div style="margin:10px 0;padding:12px 14px;background:white;border-radius:10px;border:1px solid #e2e8f0;page-break-inside:avoid">
            <div style="font-weight:700;color:${colors.secondary};font-size:0.88rem;margin-bottom:6px">${isYoung ? '✏️ ' : ''}Exercise ${i + 1}. ${ex.q}</div>
            <div style="font-size:0.86rem;color:#059669;font-weight:600;background:#ecfdf5;padding:8px 12px;border-radius:8px"><strong>Answer:</strong> ${ex.a}</div>
          </div>`;
      }).join('');
      sections += `
        <div style="margin:22px 0">
          <h3 style="color:${colors.secondary};font-size:1.15rem;margin-bottom:10px">${isYoung ? '✏️ ' : ''}Solved Textbook Exercises</h3>
          ${exs}
        </div>`;
    }

    // 7. FUN FOOTER FOR YOUNG KIDS
    if (isYoung) {
      sections += `
        <div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:12px;padding:16px 20px;margin:22px 0;text-align:center;border:2px solid #f59e0b;page-break-inside:avoid">
          <div style="font-size:1.5rem">🌟 Amazing work studying this chapter! 🌟</div>
          <div style="font-size:0.88rem;color:#92400e;margin-top:6px;font-weight:600">Revise this chapter once more, then try the worksheet on LinguaLearn! ${character.emoji}</div>
          <div style="font-size:0.82rem;color:#a16207;margin-top:4px">Tip: Read the tricks 3 times before your exam — they really help!</div>
        </div>`;
    }
  } else {
    sections = `
      <div style="text-align:center;padding:50px 20px;color:#64748b">
        <div style="font-size:3.5rem;margin-bottom:16px">${isYoung ? '🚧' : '📝'}</div>
        <div style="font-size:1.15rem;font-weight:700;margin-bottom:10px">Detailed Notes Coming Soon!</div>
        <div style="font-size:0.95rem;line-height:1.6">We're preparing simple, easy-to-understand notes with full chapter explanation, memory tricks, vocabulary, and solved exercises for this chapter.<br>Meanwhile, you can use the Worksheet feature to practice!</div>
      </div>`;
  }

  return `
    <div id="pdfContent" style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:780px;margin:0 auto;color:${colors.text};background:${colors.bg};padding:0">
      <div style="background:${colors.headerBg};color:white;padding:26px 28px;border-radius:0 0 20px 20px;margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="font-size:0.78rem;opacity:0.9;font-weight:600">LinguaLearn — CBSE ${langData.name} Notes</div>
          <div style="font-size:0.78rem;opacity:0.9;font-weight:600">Class ${cls}</div>
        </div>
        <div style="font-size:1.5rem;font-weight:900;margin-bottom:6px">${character.emoji} Chapter ${ch.num}: ${ch.title}</div>
        <div style="font-size:0.82rem;opacity:0.85;margin-bottom:8px">📖 ${textbook} — ${langData.classes[cls].publisher}</div>
        <div>${topicsStr}</div>
      </div>
      <div style="padding:0 22px 22px">
        ${sections}
        <div style="margin-top:20px;padding-top:14px;border-top:2px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;font-size:0.72rem;color:#94a3b8">
          <div>Generated by LinguaLearn — padhlo.life</div>
          <div>${langData.name} Class ${cls} — Ch. ${ch.num}</div>
        </div>
      </div>
    </div>`;
}

function downloadChapterPDF(lang, cls, idx) {
  const langData = syllabusData[lang];
  const ch = langData.classes[cls].chapters[idx];

  showToast('Generating PDF... please wait', 'info');

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:absolute;left:0;top:0;width:800px;background:white;z-index:-1;opacity:0;pointer-events:none';
  wrapper.innerHTML = buildPDFHtml(lang, cls, idx);
  document.body.appendChild(wrapper);

  const el = wrapper.querySelector('#pdfContent');
  if (!el) {
    document.body.removeChild(wrapper);
    showToast('PDF generation failed — no content found.', 'error');
    return;
  }

  const filename = `${langData.name}_Class${cls}_Ch${ch.num}_Notes.pdf`;

  setTimeout(function () {
    html2pdf().set({
      margin: [0.2, 0.2, 0.4, 0.2],
      filename: filename,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 800 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'], avoid: ['tr', 'td'] }
    }).from(el).save().then(function () {
      document.body.removeChild(wrapper);
      if (typeof addXP === 'function') addXP(25, 'pdf');
      showToast('PDF downloaded: ' + langData.name + ' Ch. ' + ch.num, 'success');
    }).catch(function (err) {
      document.body.removeChild(wrapper);
      showToast('PDF generation failed. Try again.', 'error');
      console.error('PDF error:', err);
    });
  }, 300);
}

function previewChapterPDF(lang, cls, idx) {
  const html = buildPDFHtml(lang, cls, idx);
  const langData = syllabusData[lang];
  const ch = langData.classes[cls].chapters[idx];

  if (typeof addXP === 'function') addXP(15, 'notes');
  if (typeof awardBadge === 'function') awardBadge('notes');
  if (typeof updateDashNotesViewed === 'function') updateDashNotesViewed();

  showContentModal({
    tag: '📘 Chapter Notes — ' + langData.name + ' Class ' + cls,
    title: 'Ch. ' + ch.num + ': ' + ch.title,
    print: true,
    html: '<div style="margin-bottom:16px;display:flex;gap:8px;justify-content:center">' +
      '<button onclick="downloadChapterPDF(\'' + lang + '\', ' + cls + ', ' + idx + ')" style="background:linear-gradient(135deg,#6366f1,#7c3aed);color:white;border:none;padding:10px 24px;border-radius:10px;font-weight:800;font-size:0.9rem;cursor:pointer;font-family:inherit">⬇️ Download as PDF</button>' +
      '</div>' + html
  });
}

function showToast(msg, type) {
  var existing = document.querySelector('.pdf-toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'pdf-toast';
  toast.textContent = msg;
  var bg = type === 'success' ? '#06d6a0' : type === 'error' ? '#ef4444' : '#6366f1';
  toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:' + bg + ';color:white;padding:12px 24px;border-radius:12px;font-weight:700;font-size:0.9rem;z-index:99999;box-shadow:0 8px 24px rgba(0,0,0,0.2)';
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(function () { toast.remove(); }, 300);
  }, 3000);
}
