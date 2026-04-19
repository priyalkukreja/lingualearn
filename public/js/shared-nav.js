(function () {
  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'AI Tutor', href: '/tutor', icon: '🤖' },
    { label: 'Homework', href: '/my-homework', icon: '📝' },
    { label: 'Exam Prep', href: '/exam-prep', icon: '📚' },
    { label: 'Writing Test', href: '/writing-test', icon: '✍️' },
    { label: 'Voice Lab', href: '/voice-lab', icon: '🎙️' },
    { label: 'Games', href: '/revision-games', icon: '🎮' },
    { label: 'Weak Areas', href: '/weakness', icon: '🎯' },
    { label: 'Report Card', href: '/report-card', icon: '📋' },
    { label: 'Quiz Battle', href: '/quiz-battle', icon: '⚔️' },
    { label: 'Mock Test', href: '/mock-test', icon: '📄' },
  ];

  const bottomTabs = [
    { label: 'Home', href: '/dashboard', icon: '🏠' },
    { label: 'Tutor', href: '/tutor', icon: '🤖' },
    { label: 'Write', href: '/writing-test', icon: '✍️' },
    { label: 'Games', href: '/revision-games', icon: '🎮' },
    { label: 'More', href: '#more', icon: '☰' },
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

  // Bottom tab bar for mobile
  const bottomBar = document.createElement('div');
  bottomBar.className = 'bottom-tab-bar';
  bottomBar.id = 'bottomTabBar';
  bottomBar.innerHTML = bottomTabs.map(t => {
    const isActive = t.href !== '#more' && currentPath === t.href;
    if (t.href === '#more') {
      return `<button class="bottom-tab" onclick="toggleBottomMore()" aria-label="More pages">
        <span class="bottom-tab-icon">${t.icon}</span>
        <span class="bottom-tab-label">${t.label}</span>
      </button>`;
    }
    return `<a href="${t.href}" class="bottom-tab${isActive ? ' active' : ''}">
      <span class="bottom-tab-icon">${t.icon}</span>
      <span class="bottom-tab-label">${t.label}</span>
    </a>`;
  }).join('');
  document.body.appendChild(bottomBar);

  // "More" drawer
  const moreLinks = navLinks.filter(l => !bottomTabs.some(t => t.href === l.href));
  const moreDrawer = document.createElement('div');
  moreDrawer.className = 'bottom-more-drawer';
  moreDrawer.id = 'bottomMoreDrawer';
  moreDrawer.innerHTML = `
    <div class="bottom-more-grid">
      ${moreLinks.map(l => {
        const isActive = currentPath === l.href;
        return `<a href="${l.href}" class="bottom-more-item${isActive ? ' active' : ''}">
          <span class="bottom-more-icon">${l.icon}</span>
          <span class="bottom-more-label">${l.label}</span>
        </a>`;
      }).join('')}
    </div>
  `;
  document.body.appendChild(moreDrawer);

  // Add bottom padding to body so content isn't hidden behind the bar
  const spacer = document.createElement('div');
  spacer.className = 'bottom-tab-spacer';
  document.body.appendChild(spacer);

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

    /* Bottom tab bar — hidden on desktop */
    .bottom-tab-bar { display: none; }
    .bottom-more-drawer { display: none; }
    .bottom-tab-spacer { display: none; }

    @media (max-width: 768px) {
      .nav-links { display: none !important; }
      .nav-toggle { display: none !important; }

      /* Bottom tab bar */
      .bottom-tab-bar {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
        z-index: 9999;
        justify-content: space-around;
        align-items: center;
        padding: 0.35rem 0 calc(0.35rem + env(safe-area-inset-bottom, 0px));
      }
      .bottom-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: #9ca3af;
        font-size: 0.65rem;
        font-weight: 700;
        font-family: 'Nunito', sans-serif;
        gap: 0.15rem;
        padding: 0.25rem 0.5rem;
        border-radius: 10px;
        transition: all 0.2s;
        border: none;
        background: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .bottom-tab-icon { font-size: 1.3rem; line-height: 1; }
      .bottom-tab-label { line-height: 1; }
      .bottom-tab.active {
        color: #6366f1;
      }
      .bottom-tab.active .bottom-tab-icon {
        transform: scale(1.15);
      }
      .bottom-tab:active { transform: scale(0.92); }

      /* More drawer */
      .bottom-more-drawer {
        display: none;
        position: fixed;
        bottom: 64px;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 -8px 32px rgba(0,0,0,0.1);
        border-radius: 20px 20px 0 0;
        z-index: 9998;
        padding: 1.25rem 1rem 1rem;
        animation: slideDrawerUp 0.25s ease;
      }
      .bottom-more-drawer.open { display: block; }
      @keyframes slideDrawerUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .bottom-more-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
      }
      .bottom-more-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
        padding: 0.75rem 0.25rem;
        border-radius: 14px;
        text-decoration: none;
        color: #4b5563;
        font-weight: 700;
        font-size: 0.72rem;
        font-family: 'Nunito', sans-serif;
        transition: all 0.15s;
        -webkit-tap-highlight-color: transparent;
      }
      .bottom-more-item:active { transform: scale(0.93); background: rgba(99,102,241,0.06); }
      .bottom-more-item.active { color: #6366f1; background: rgba(99,102,241,0.06); }
      .bottom-more-icon { font-size: 1.5rem; }
      .bottom-more-label { line-height: 1.2; text-align: center; }

      .bottom-tab-spacer { display: block; height: 70px; }
    }
  `;
  document.head.appendChild(style);

  window.toggleSharedNav = function () {
    const links = document.getElementById('sharedNavLinks');
    const icon = document.getElementById('hamburgerIcon');
    const isOpen = links.classList.toggle('open');
    icon.textContent = isOpen ? '✕' : '☰';
  };

  window.toggleBottomMore = function () {
    const drawer = document.getElementById('bottomMoreDrawer');
    drawer.classList.toggle('open');
  };

  document.addEventListener('click', (e) => {
    // Close hamburger dropdown
    const links = document.getElementById('sharedNavLinks');
    const hamburger = document.getElementById('navHamburger');
    if (links && hamburger && links.classList.contains('open') && !links.contains(e.target) && !hamburger.contains(e.target)) {
      links.classList.remove('open');
      document.getElementById('hamburgerIcon').textContent = '☰';
    }

    // Close "More" drawer when tapping outside
    const drawer = document.getElementById('bottomMoreDrawer');
    const moreBtn = document.querySelector('.bottom-tab[onclick*="toggleBottomMore"]');
    if (drawer && drawer.classList.contains('open') && !drawer.contains(e.target) && (!moreBtn || !moreBtn.contains(e.target))) {
      drawer.classList.remove('open');
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
