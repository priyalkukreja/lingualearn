(function () {
  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'AI Tutor', href: '/tutor' },
    { label: 'Homework', href: '/my-homework' },
    { label: 'Exam Prep', href: '/exam-prep' },
    { label: 'Writing Test', href: '/writing-test' },
    { label: 'Voice Lab', href: '/voice-lab' },
    { label: 'Games', href: '/revision-games' },
    { label: 'Weak Areas', href: '/weakness' },
    { label: 'Report Card', href: '/report-card' },
  ];

  const currentPath = window.location.pathname;

  const nav = document.querySelector('.navbar');
  if (!nav) return;

  const student = JSON.parse(localStorage.getItem('ll_student') || 'null');
  const xp = student?.total_xp || 0;

  nav.innerHTML = `
    <a href="/" class="nav-brand">
      <span class="brand-icon">🌐</span><span>LinguaLearn</span>
    </a>
    <ul class="nav-links" id="sharedNavLinks">
      ${navLinks.map(l =>
        `<li><a href="${l.href}"${currentPath === l.href ? ' style="color:var(--primary);font-weight:800"' : ''}>${l.label}</a></li>`
      ).join('')}
    </ul>
    <div class="nav-actions">
      <span class="nav-xp" id="navXP">${xp} XP</span>
      <button class="nav-toggle" id="navHamburger" onclick="toggleSharedNav()" aria-label="Toggle menu">
        <span class="hamburger-icon" id="hamburgerIcon">☰</span>
      </button>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .nav-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #1a1a2e;
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
      transition: background 0.2s;
    }
    .nav-toggle:hover { background: rgba(99,102,241,0.08); }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 0.75rem 1rem;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        border-radius: 0 0 16px 16px;
        z-index: 999;
        gap: 0;
      }
      .nav-links.open {
        display: flex;
      }
      .nav-links li { width: 100%; }
      .nav-links li a {
        display: block;
        padding: 0.65rem 0.75rem;
        border-radius: 10px;
        transition: background 0.15s;
        font-size: 0.92rem;
      }
      .nav-links li a:hover { background: rgba(99,102,241,0.06); }
      .nav-toggle { display: flex; align-items: center; }
    }
  `;
  document.head.appendChild(style);

  window.toggleSharedNav = function () {
    const links = document.getElementById('sharedNavLinks');
    const icon = document.getElementById('hamburgerIcon');
    const isOpen = links.classList.toggle('open');
    icon.textContent = isOpen ? '✕' : '☰';
  };

  document.addEventListener('click', (e) => {
    const links = document.getElementById('sharedNavLinks');
    const hamburger = document.getElementById('navHamburger');
    if (links && links.classList.contains('open') && !links.contains(e.target) && !hamburger.contains(e.target)) {
      links.classList.remove('open');
      document.getElementById('hamburgerIcon').textContent = '☰';
    }
  });

  const navAnchors = document.querySelectorAll('#sharedNavLinks a');
  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      const links = document.getElementById('sharedNavLinks');
      if (links.classList.contains('open')) {
        links.classList.remove('open');
        document.getElementById('hamburgerIcon').textContent = '☰';
      }
    });
  });
})();
