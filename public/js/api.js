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
  try {
    const res = await fetch(API_BASE + url, { headers: getHeaders() });
    if (res.status === 401) { logout(); return null; }
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Request failed' }));
      console.error('[API GET]', url, err);
      return { error: err.error || 'Something went wrong' };
    }
    return res.json();
  } catch (err) {
    console.error('[API GET]', url, err);
    return { error: 'Network error — check your connection' };
  }
}

async function apiPost(url, body) {
  try {
    const res = await fetch(API_BASE + url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    if (res.status === 401) { logout(); return null; }
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Request failed' }));
      console.error('[API POST]', url, err);
      return { error: err.error || 'Something went wrong' };
    }
    return res.json();
  } catch (err) {
    console.error('[API POST]', url, err);
    return { error: 'Network error — check your connection' };
  }
}

async function apiUpload(url, formData) {
  try {
    const headers = {};
    const token = getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const res = await fetch(API_BASE + url, { method: 'POST', headers, body: formData });
    if (res.status === 401) { logout(); return null; }
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Upload failed' }));
      console.error('[API UPLOAD]', url, err);
      return { error: err.error || 'Upload failed' };
    }
    return res.json();
  } catch (err) {
    console.error('[API UPLOAD]', url, err);
    return { error: 'Network error — check your connection' };
  }
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
    }, 30000);
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
