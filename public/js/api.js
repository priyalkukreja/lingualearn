const API_BASE = '';

function getToken() {
  return localStorage.getItem('ll_token');
}

function isLoggedIn() {
  return !!getToken();
}

function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return headers;
}

async function apiGet(url) {
  const res = await fetch(API_BASE + url, { headers: getHeaders() });
  if (res.status === 401) { logout(); return null; }
  return res.json();
}

async function apiPost(url, body) {
  const res = await fetch(API_BASE + url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  });
  if (res.status === 401) { logout(); return null; }
  return res.json();
}

async function apiUpload(url, formData) {
  const headers = {};
  const token = getToken();
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API_BASE + url, { method: 'POST', headers, body: formData });
  if (res.status === 401) { logout(); return null; }
  return res.json();
}

function logout() {
  localStorage.removeItem('ll_token');
  localStorage.removeItem('ll_student');
  window.location.href = '/login';
}

function getStudent() {
  try {
    return JSON.parse(localStorage.getItem('ll_student'));
  } catch { return null; }
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = '/login';
    return false;
  }
  return true;
}

let sessionId = null;
let heartbeatInterval = null;

async function startSession() {
  if (!isLoggedIn()) return;
  const data = await apiPost('/api/sessions/start', {});
  if (data?.session) {
    sessionId = data.session.id;
    heartbeatInterval = setInterval(() => {
      apiPost('/api/sessions/heartbeat', {
        sessionId,
        lastChapter: document.title,
        lastPosition: { page: window.location.pathname, scroll: window.scrollY }
      });
    }, 60000);
  }
}

async function endSession(topics, xp) {
  if (!sessionId) return;
  clearInterval(heartbeatInterval);
  await apiPost('/api/sessions/end', {
    sessionId,
    topicsCovered: topics || [],
    xpEarned: xp || 0,
    lastChapter: document.title,
    lastPosition: { page: window.location.pathname }
  });
}

window.addEventListener('beforeunload', () => {
  if (sessionId) {
    navigator.sendBeacon('/api/sessions/end', JSON.stringify({
      sessionId,
      topicsCovered: [],
      xpEarned: 0
    }));
  }
});
