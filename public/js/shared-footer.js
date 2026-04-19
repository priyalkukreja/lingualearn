(function () {
  if (document.querySelector('.ll-footer')) return;

  const footer = document.createElement('footer');
  footer.className = 'll-footer';
  footer.innerHTML = `
    <div class="ll-footer-inner">
      <div class="ll-footer-brand">
        <span class="ll-footer-logo">L</span>
        <span>LinguaLearn</span>
      </div>
      <div class="ll-footer-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/tutor">AI Tutor</a>
        <a href="/writing-test">Writing</a>
        <a href="/revision-games">Games</a>
        <a href="/report-card">Report Card</a>
        <a href="/pricing">Pricing</a>
      </div>
      <div class="ll-footer-copy">&copy; 2026 LinguaLearn. Built for CBSE students.</div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .ll-footer {
      background: #0f172a; color: #94a3b8;
      padding: 2rem 1.5rem 1.5rem; margin-top: 3rem;
      font-family: 'Nunito', 'Inter', sans-serif;
    }
    .ll-footer-inner {
      max-width: 900px; margin: 0 auto; text-align: center;
    }
    .ll-footer-brand {
      display: flex; align-items: center; justify-content: center;
      gap: 0.5rem; margin-bottom: 1rem;
      font-weight: 800; font-size: 1.1rem; color: white;
    }
    .ll-footer-logo {
      width: 28px; height: 28px; border-radius: 8px;
      background: linear-gradient(135deg, #5b5ef4, #7209b7);
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 900; font-size: 0.85rem;
    }
    .ll-footer-links {
      display: flex; flex-wrap: wrap; justify-content: center;
      gap: 0.5rem 1.25rem; margin-bottom: 1rem;
    }
    .ll-footer-links a {
      color: #94a3b8; text-decoration: none; font-size: 0.82rem;
      font-weight: 600; transition: color 0.2s;
    }
    .ll-footer-links a:hover { color: #e2e8f0; }
    .ll-footer-copy {
      font-size: 0.72rem; color: #475569;
      border-top: 1px solid #1e293b;
      padding-top: 1rem;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(footer);
})();
