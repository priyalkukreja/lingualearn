const LottieAnims = {
  urls: {
    heroLearn: 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189571e43d20/qwpOAMOAtY.json',
    confetti: 'https://lottie.host/5e929668-7bdf-4108-aa34-92b4e5b0e1a3/IgaNmaFMRA.json',
    trophy: 'https://lottie.host/c1c9e78d-4c3c-4083-b2dc-95e9ac2f2827/7IvuHKETPi.json',
    rocket: 'https://lottie.host/e82cf022-0ec3-468f-b09f-30c498b7a11b/J2yx2ZB5xa.json',
    writing: 'https://lottie.host/a63ab4ab-ab7c-4ef5-be84-78dbc0382082/dTKK3pMw2x.json',
    aiThinking: 'https://lottie.host/cc218af0-e3e4-4bc4-b3d7-1e5b0b0b0b0b/brain-thinking.json',
    fire: 'https://lottie.host/38c20f51-c26e-46df-8e18-8a31aa6e7a38/MCAIe6HW9Z.json',
    success: 'https://lottie.host/27799a07-eba2-4ea5-8b47-5b7cd8c7dfdc/NJRnJiFMpf.json',
    loading: 'https://lottie.host/b6fb680e-ac70-4c0d-bcdb-8f26c8c30f55/l5lK6B3JIz.json',
    empty: 'https://lottie.host/ef0c36fc-b775-411e-98b3-2c0f43dfe9e2/QkJH4M3dUE.json',
    books: 'https://lottie.host/27291402-e430-4c34-9d6e-34ebc0eb0f4b/G2q4TiGp7Q.json',
    gamepad: 'https://lottie.host/86d3f5e4-79d7-4c43-bef7-ce43f9a3fd0b/IvRCFZpnTI.json',
    star: 'https://lottie.host/9bd6c73e-0887-4455-b5b0-59f26d2e0cb3/4Cz2o3j2Hy.json',
  },

  create(src, opts = {}) {
    const el = document.createElement('dotlottie-player');
    el.setAttribute('src', src);
    el.setAttribute('background', opts.background || 'transparent');
    el.setAttribute('speed', opts.speed || '1');
    el.setAttribute('direction', '1');
    if (opts.loop !== false) el.setAttribute('loop', '');
    if (opts.autoplay !== false) el.setAttribute('autoplay', '');
    if (opts.mode) el.setAttribute('mode', opts.mode);
    el.style.width = opts.width || '200px';
    el.style.height = opts.height || '200px';
    if (opts.className) el.className = opts.className;
    if (opts.style) Object.assign(el.style, opts.style);
    return el;
  },

  inject(container, animKey, opts = {}) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return null;
    const src = this.urls[animKey];
    if (!src) return null;
    const player = this.create(src, opts);
    if (opts.prepend) {
      el.prepend(player);
    } else if (opts.replace) {
      el.innerHTML = '';
      el.appendChild(player);
    } else {
      el.appendChild(player);
    }
    return player;
  },

  playOnce(container, animKey, opts = {}) {
    opts.loop = false;
    const player = this.inject(container, animKey, opts);
    if (player) {
      player.addEventListener('complete', () => {
        if (opts.removeOnComplete) player.remove();
      });
    }
    return player;
  },

  showCelebration(container, duration) {
    const player = this.playOnce(container, 'confetti', {
      width: '300px', height: '300px',
      style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: '100' }
    });
    if (duration && player) {
      setTimeout(() => player.remove(), duration);
    }
    return player;
  }
};
