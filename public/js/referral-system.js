/**
 * Feature 10: Referral System
 * "Invite a friend, both get 7 days free Topper plan"
 */
const ReferralSystem = (() => {
  const KEY = 'll_referral';

  function getData() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { code: null, referred: [], rewards: 0 }; } catch { return { code: null, referred: [], rewards: 0 }; }
  }
  function save(d) { localStorage.setItem(KEY, JSON.stringify(d)); }

  function generateCode() {
    const student = typeof getStudent === 'function' ? getStudent() : null;
    const name = (student?.name || 'user').split(' ')[0].toUpperCase().slice(0, 4);
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `LL-${name}-${rand}`;
  }

  function getOrCreateCode() {
    const data = getData();
    if (!data.code) {
      data.code = generateCode();
      save(data);
    }
    return data.code;
  }

  function applyReferral(code) {
    if (!code || code.length < 5) return { success: false, msg: 'Invalid referral code' };
    const data = getData();
    if (data.appliedCode) return { success: false, msg: 'You already used a referral code' };
    if (code === data.code) return { success: false, msg: 'You can\'t use your own code!' };

    data.appliedCode = code;
    data.rewardDays = 7;
    save(data);

    return { success: true, msg: '🎉 Referral applied! You got 7 days free Topper access!' };
  }

  function recordReferralUse(friendName) {
    const data = getData();
    data.referred.push({ name: friendName, date: new Date().toISOString() });
    data.rewards += 7;
    save(data);
  }

  function getShareLinks() {
    const code = getOrCreateCode();
    const msg = encodeURIComponent(`Hey! I'm using LinguaLearn to ace my CBSE language exam. Use my code ${code} to get 7 days FREE Topper plan! 🚀\n\nhttps://lingualearn.app/signup?ref=${code}`);
    return {
      whatsapp: `https://wa.me/?text=${msg}`,
      copy: `Use my code ${code} to get 7 days FREE Topper plan on LinguaLearn! https://lingualearn.app/signup?ref=${code}`
    };
  }

  function renderWidget(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const data = getData();
    const code = getOrCreateCode();
    const links = getShareLinks();

    el.innerHTML = `
      <div style="background:linear-gradient(135deg,#eef0ff,#fce7ff);border-radius:20px;padding:1.5rem;border:2px solid #e8eaff">
        <div style="text-align:center;margin-bottom:1rem">
          <div style="font-size:2rem">🎁</div>
          <div style="font-weight:900;font-size:1.1rem;margin:0.3rem 0">Invite Friends, Get Free Topper!</div>
          <div style="font-size:0.85rem;color:#64748b">Both you and your friend get 7 days free Topper plan</div>
        </div>

        <div style="background:white;border-radius:14px;padding:1rem;text-align:center;margin-bottom:1rem;border:2px dashed #5b5ef4">
          <div style="font-size:0.75rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Your Referral Code</div>
          <div style="font-size:1.5rem;font-weight:900;color:#5b5ef4;letter-spacing:2px" id="refCode">${code}</div>
        </div>

        <div style="display:flex;gap:0.5rem;margin-bottom:1rem">
          <a href="${links.whatsapp}" target="_blank" style="flex:1;padding:0.6rem;border-radius:12px;background:#25d366;color:white;font-weight:800;font-size:0.85rem;text-align:center;text-decoration:none">📱 Share on WhatsApp</a>
          <button onclick="copyRefCode()" style="flex:1;padding:0.6rem;border-radius:12px;background:#5b5ef4;color:white;font-weight:800;font-size:0.85rem;border:none;cursor:pointer">📋 Copy Code</button>
        </div>

        <div style="font-size:0.82rem;font-weight:700;color:#64748b;text-align:center">
          👥 ${data.referred.length} friends invited · 🎁 ${data.rewards} bonus days earned
        </div>
      </div>
    `;
  }

  window.copyRefCode = function () {
    const code = getOrCreateCode();
    const links = getShareLinks();
    navigator.clipboard.writeText(links.copy).then(() => {
      const btn = event.target;
      btn.textContent = '✅ Copied!';
      setTimeout(() => btn.textContent = '📋 Copy Code', 2000);
    });
  };

  return { getOrCreateCode, applyReferral, recordReferralUse, getShareLinks, renderWidget, getData };
})();
