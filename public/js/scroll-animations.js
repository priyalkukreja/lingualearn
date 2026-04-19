(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  function initScrollAnimations() {
    document.querySelectorAll('[data-animate]').forEach(el => {
      const anim = el.dataset.animate || 'fade-in-up';
      const delay = el.dataset.delay || '0';
      el.style.animationDelay = delay + 's';
      el.classList.add(anim);
      el.classList.add('scroll-anim');
      observer.observe(el);
    });

    document.querySelectorAll('.dash-section, .wt-card, .rg-game-card, .gs-card, .qa-card, .mission-card, .wt-stat-card, .rg-ts-card, .bento-card, .pricing-card').forEach((el, i) => {
      if (!el.dataset.animate) {
        el.style.animationDelay = (i % 6) * 0.08 + 's';
        el.classList.add('fade-in-up', 'scroll-anim');
        observer.observe(el);
      }
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    .scroll-anim { opacity: 0; transition: none; }
    .scroll-anim.revealed {
      animation-fill-mode: both;
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
