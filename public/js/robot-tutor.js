/**
 * Robot Tutor — Lottie-powered animated AI buddy
 * 3 age-appropriate characters:
 *   Class 6-7 (age 11-12): "Gyani" — cute, playful, colorful robot buddy
 *   Class 8 (age 13):      "Gyani" — cool, friendly teen robot
 *   Class 9-10 (age 14-16): "Gyani" — sleek, smart, mature AI assistant
 *
 * States: idle, talking, happy, thinking, celebrate, sad, quiz, wave
 */

const RobotTutor = (() => {

  // Detect student class from localStorage
  function getStudentClass() {
    try {
      const student = JSON.parse(localStorage.getItem('ll_student'));
      return student?.class || 8;
    } catch { return 8; }
  }

  // Age group: junior (6-7), mid (8), senior (9-10)
  function getAgeGroup(cls) {
    if (cls <= 7) return 'junior';
    if (cls <= 8) return 'mid';
    return 'senior';
  }

  // Different Lottie animations per age group
  // junior = cute/playful, mid = friendly, senior = sleek/minimal
  const ANIMATION_SETS = {
    junior: {
      idle:      'https://lottie.host/e59bf845-1a8c-4e59-8ae6-09b891cbf994/cBMfpIqxNo.json',
      talking:   'https://lottie.host/b1a2c5a6-2b44-4e4f-88ea-7f39e4f0bb65/umDMKDsYsp.json',
      happy:     'https://lottie.host/8d870a9e-72bc-451b-aab2-53a3c1356be0/OvnHGlIwYP.json',
      thinking:  'https://lottie.host/dce5e921-e121-465d-89ff-1a9208f5d230/K1WLQbSfZR.json',
      celebrate: 'https://lottie.host/1d8865e6-6eda-4080-9424-56dabb9c4708/BIYtc9J12S.json',
      sad:       'https://lottie.host/4ae2d48b-b073-4e04-87f9-2729e2896087/WUlHVFOeWH.json',
      wave:      'https://lottie.host/dd3a74b3-f4fe-4fb4-9f79-72ad428a5f94/Lj7FgRuXIh.json',
    },
    mid: {
      idle:      'https://lottie.host/e59bf845-1a8c-4e59-8ae6-09b891cbf994/cBMfpIqxNo.json',
      talking:   'https://lottie.host/b1a2c5a6-2b44-4e4f-88ea-7f39e4f0bb65/umDMKDsYsp.json',
      happy:     'https://lottie.host/8d870a9e-72bc-451b-aab2-53a3c1356be0/OvnHGlIwYP.json',
      thinking:  'https://lottie.host/dce5e921-e121-465d-89ff-1a9208f5d230/K1WLQbSfZR.json',
      celebrate: 'https://lottie.host/1d8865e6-6eda-4080-9424-56dabb9c4708/BIYtc9J12S.json',
      sad:       'https://lottie.host/4ae2d48b-b073-4e04-87f9-2729e2896087/WUlHVFOeWH.json',
      wave:      'https://lottie.host/dd3a74b3-f4fe-4fb4-9f79-72ad428a5f94/Lj7FgRuXIh.json',
    },
    senior: {
      idle:      'https://lottie.host/e59bf845-1a8c-4e59-8ae6-09b891cbf994/cBMfpIqxNo.json',
      talking:   'https://lottie.host/b1a2c5a6-2b44-4e4f-88ea-7f39e4f0bb65/umDMKDsYsp.json',
      happy:     'https://lottie.host/8d870a9e-72bc-451b-aab2-53a3c1356be0/OvnHGlIwYP.json',
      thinking:  'https://lottie.host/dce5e921-e121-465d-89ff-1a9208f5d230/K1WLQbSfZR.json',
      celebrate: 'https://lottie.host/1d8865e6-6eda-4080-9424-56dabb9c4708/BIYtc9J12S.json',
      sad:       'https://lottie.host/4ae2d48b-b073-4e04-87f9-2729e2896087/WUlHVFOeWH.json',
      wave:      'https://lottie.host/dd3a74b3-f4fe-4fb4-9f79-72ad428a5f94/Lj7FgRuXIh.json',
    }
  };

  // Different speech styles per age group
  const SPEECH_STYLES = {
    junior: {
      greet:        (name) => name ? `Hii ${name}! Let's have fun learning! 🎮` : 'Hii buddy! Ready for fun? 🎮',
      correct:      ['Woohoo! You\'re a star! ⭐', 'Super duper! 🎉', 'You nailed it! 🏆', 'Amazing job, champ! 💪'],
      wrong:        ['Oopsie! Try again, you got this! 🦸', 'Almost! One more try! 🌟', 'Don\'t worry, heroes make mistakes too! 💪'],
      thinking:     ['Hmm let me think... 🤔', 'Gyani is thinking... 🧠', 'Working on it! ⚡'],
      quiz:         ['Quiz time! Game on! 🧩', 'Challenge accepted! 🎯', 'Let\'s play a quiz game! 🎮'],
      xp:           (amt) => `+${amt} XP! You\'re leveling up! 🚀`,
      celebrate:    ['Party time! 🎊', 'You\'re on fire! 🔥', 'Unstoppable! 💫'],
    },
    mid: {
      greet:        (name) => name ? `Hey ${name}! Ready to learn? 😊` : 'Hey there! Let\'s go! 😊',
      correct:      ['Correct! Great job! 🎉', 'Nailed it! 👏', 'You got it! 🔥', 'Well done! ⭐'],
      wrong:        ['Not quite, try again! 💪', 'Close! You\'ll get it next time 🤞', 'Don\'t worry, let\'s figure it out! 🧠'],
      thinking:     ['Let me think... 🤔', 'Processing... 🧠', 'Hmm, good question! 💭'],
      quiz:         ['Quiz time! Let\'s go! 🧩', 'Ready for a challenge? 🎯', 'Test your skills! 💡'],
      xp:           (amt) => `+${amt} XP! Keep going! ⭐`,
      celebrate:    ['Awesome! 🎉', 'Brilliant work! ✨', 'Keep it up! 🔥'],
    },
    senior: {
      greet:        (name) => name ? `Hi ${name}, ready to study? 📚` : 'Hi! Let\'s get started 📚',
      correct:      ['Correct! ✅', 'Well done! 👍', 'Right answer! ⭐', 'Excellent! 🎯'],
      wrong:        ['Not quite. Let\'s review this. 📖', 'Almost there. Try again! 💡', 'Good attempt. Here\'s a hint... 🔍'],
      thinking:     ['Analyzing... 🧠', 'Let me check... 📋', 'Thinking... 💭'],
      quiz:         ['Quick assessment! 📝', 'Let\'s test your knowledge 🎯', 'Time for practice! 💡'],
      xp:           (amt) => `+${amt} XP earned 📊`,
      celebrate:    ['Excellent performance! 🏆', 'Outstanding! 📈', 'Well prepared! ✅'],
    }
  };

  // Age-appropriate names and descriptions
  const TUTOR_PROFILES = {
    junior: { name: 'Gyani', tagline: 'Your fun learning buddy!', emoji: '🤖' },
    mid:    { name: 'Gyani', tagline: 'Your AI study buddy', emoji: '🤖' },
    senior: { name: 'Gyani', tagline: 'Your AI study assistant', emoji: '🤖' },
  };

  // CSS color themes per age group
  const COLOR_THEMES = {
    junior: { primary: '#5b5ef4', accent: '#f97316', glow: 'rgba(249,115,22,0.3)' },
    mid:    { primary: '#5b5ef4', accent: '#7209b7', glow: 'rgba(91,94,244,0.3)' },
    senior: { primary: '#334155', accent: '#5b5ef4', glow: 'rgba(51,65,85,0.2)' },
  };

  let container = null;
  let currentState = 'idle';
  let lottieLoaded = false;
  let speechBubble = null;
  let stateQueue = [];
  let isTransitioning = false;
  let ageGroup = 'mid';
  let animations = {};
  let speech = {};
  let profile = {};

  function init(containerId) {
    container = document.getElementById(containerId);
    if (!container) return;

    const cls = getStudentClass();
    ageGroup = getAgeGroup(cls);
    animations = ANIMATION_SETS[ageGroup];
    speech = SPEECH_STYLES[ageGroup];
    profile = TUTOR_PROFILES[ageGroup];

    // Apply age-appropriate theme
    const theme = COLOR_THEMES[ageGroup];
    container.dataset.ageGroup = ageGroup;

    container.innerHTML = `
      <div class="robot-wrapper robot-${ageGroup}">
        <div class="robot-anim" id="robotAnim"></div>
        <div class="robot-speech-bubble" id="robotSpeech" style="display:none">
          <span id="robotSpeechText"></span>
        </div>
        <div class="robot-name-tag">${profile.name}</div>
      </div>
    `;

    speechBubble = document.getElementById('robotSpeech');
    loadLottie();
  }

  // CSS-only fallback robots per age group
  function getCSSRobot() {
    if (ageGroup === 'junior') {
      return `<div class="robot-css-fallback robot-css-junior">
        <div class="robot-head" style="background:linear-gradient(135deg,#f97316,#f59e0b);border-radius:20px">
          <div class="robot-eye left" style="width:14px;height:14px"></div>
          <div class="robot-eye right" style="width:14px;height:14px"></div>
          <div class="robot-mouth" style="width:20px;height:6px;border-radius:0 0 10px 10px;bottom:7px"></div>
          <div style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);font-size:12px">🎓</div>
        </div>
        <div class="robot-body" style="background:linear-gradient(135deg,#fb923c,#fbbf24)">
          <div class="robot-arm left"></div><div class="robot-arm right"></div>
        </div>
      </div>`;
    }
    if (ageGroup === 'senior') {
      return `<div class="robot-css-fallback robot-css-senior">
        <div class="robot-head" style="background:linear-gradient(135deg,#334155,#475569);border-radius:14px">
          <div class="robot-eye left" style="width:10px;height:10px;background:#60a5fa"></div>
          <div class="robot-eye right" style="width:10px;height:10px;background:#60a5fa"></div>
          <div class="robot-mouth" style="width:12px;height:2px;background:#60a5fa"></div>
        </div>
        <div class="robot-body" style="background:linear-gradient(135deg,#475569,#64748b)">
          <div class="robot-arm left"></div><div class="robot-arm right"></div>
        </div>
      </div>`;
    }
    // mid (default)
    return `<div class="robot-css-fallback">
      <div class="robot-head">
        <div class="robot-eye left"></div><div class="robot-eye right"></div>
        <div class="robot-mouth"></div>
      </div>
      <div class="robot-body">
        <div class="robot-arm left"></div><div class="robot-arm right"></div>
      </div>
    </div>`;
  }

  async function loadLottie() {
    try {
      await loadScript('https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs', 'module');
      lottieLoaded = true;
      setState('wave');
      setTimeout(() => setState('idle'), 3000);
    } catch (e) {
      document.getElementById('robotAnim').innerHTML = getCSSRobot();
      setState('idle');
    }
  }

  function loadScript(src, type) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src;
      if (type) s.type = type;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function setState(state, message) {
    if (!container) return;
    if (isTransitioning) {
      stateQueue.push({ state, message });
      return;
    }

    currentState = state;
    isTransitioning = true;

    const animContainer = document.getElementById('robotAnim');
    if (!animContainer) { isTransitioning = false; return; }

    const wrapper = container.querySelector('.robot-wrapper');
    if (wrapper) wrapper.className = `robot-wrapper robot-${ageGroup} robot-state-${state}`;

    if (lottieLoaded) {
      const url = animations[state] || animations.idle;
      const loop = (state === 'idle' || state === 'thinking' || state === 'talking');
      animContainer.innerHTML = `
        <dotlottie-player
          src="${url}"
          background="transparent"
          speed="1"
          style="width:100%;height:100%"
          ${loop ? 'loop' : ''}
          autoplay
        ></dotlottie-player>
      `;
    } else {
      const robot = animContainer.querySelector('.robot-css-fallback');
      if (robot) {
        robot.className = robot.className.replace(/robot-css-\w+/g, '').trim() +
          ` robot-css-${state} robot-css-${ageGroup}`;
      }
    }

    if (message) {
      showSpeech(message);
    } else {
      hideSpeech();
    }

    setTimeout(() => {
      isTransitioning = false;
      if (stateQueue.length) {
        const next = stateQueue.shift();
        setState(next.state, next.message);
      }
    }, 300);
  }

  function showSpeech(text, duration) {
    if (!speechBubble) return;
    document.getElementById('robotSpeechText').textContent = text;
    speechBubble.style.display = '';
    speechBubble.classList.add('speech-pop');
    if (duration) setTimeout(() => hideSpeech(), duration);
  }

  function hideSpeech() {
    if (!speechBubble) return;
    speechBubble.style.display = 'none';
    speechBubble.classList.remove('speech-pop');
  }

  // Convenience methods — auto-picks age-appropriate messages
  function onCorrectAnswer(msg) {
    setState('celebrate', msg || randomPick(speech.correct));
    setTimeout(() => setState('happy'), 2500);
    setTimeout(() => setState('idle'), 4500);
  }

  function onWrongAnswer(msg) {
    setState('sad', msg || randomPick(speech.wrong));
    setTimeout(() => setState('idle'), 3500);
  }

  function onThinking() {
    setState('thinking', randomPick(speech.thinking));
  }

  function onTalking(msg) {
    setState('talking', msg || '');
  }

  function onQuiz() {
    setState('happy', randomPick(speech.quiz));
    setTimeout(() => setState('idle'), 2500);
  }

  function onGreet(name) {
    setState('wave', speech.greet(name));
    setTimeout(() => setState('idle'), 3500);
  }

  function onXP(amount) {
    setState('celebrate', speech.xp(amount));
    setTimeout(() => setState('idle'), 3000);
  }

  function onCelebrate(msg) {
    setState('celebrate', msg || randomPick(speech.celebrate));
    setTimeout(() => setState('idle'), 3500);
  }

  return {
    init,
    setState,
    showSpeech,
    hideSpeech,
    onCorrectAnswer,
    onWrongAnswer,
    onThinking,
    onTalking,
    onQuiz,
    onGreet,
    onXP,
    onCelebrate,
    getState: () => currentState,
    getAgeGroup: () => ageGroup,
    getProfile: () => profile
  };
})();
