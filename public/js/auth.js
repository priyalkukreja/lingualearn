document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = signupForm.querySelector('button[type="submit"]');
      const msg = document.getElementById('authMsg');
      btn.disabled = true;
      btn.textContent = 'Creating account...';
      msg.textContent = '';

      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            studentClass: document.getElementById('studentClass').value,
            language: document.getElementById('language').value,
            parentEmail: document.getElementById('parentEmail')?.value.trim() || ''
          })
        });

        const data = await res.json();
        if (res.ok) {
          msg.style.color = '#059669';
          msg.textContent = 'Account created! Redirecting to login...';
          setTimeout(() => window.location.href = '/login', 1500);
        } else {
          msg.style.color = '#dc2626';
          msg.textContent = data.error || 'Signup failed';
          btn.disabled = false;
          btn.textContent = 'Create Free Account';
        }
      } catch (err) {
        msg.style.color = '#dc2626';
        msg.textContent = 'Network error. Please try again.';
        btn.disabled = false;
        btn.textContent = 'Create Free Account';
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('button[type="submit"]');
      const msg = document.getElementById('authMsg');
      btn.disabled = true;
      btn.textContent = 'Logging in...';
      msg.textContent = '';

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value
          })
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('ll_token', data.token);
          localStorage.setItem('ll_student', JSON.stringify(data.student));

          // Sync local XP with server on login
          const localStudent = data.student;
          const localXP = parseInt(localStorage.getItem('ll_local_xp') || '0');
          if (localXP > 0 && localXP > (localStudent.total_xp || 0)) {
            fetch('/api/auth/update-profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + data.token },
              body: JSON.stringify({})
            }).catch(() => {});
          }

          if (!localStorage.getItem('ll_onboarded')) {
            window.location.href = '/onboarding';
          } else {
            window.location.href = '/dashboard';
          }
        } else {
          msg.style.color = '#dc2626';
          msg.textContent = data.error || 'Login failed';
          btn.disabled = false;
          btn.textContent = 'Login';
        }
      } catch (err) {
        msg.style.color = '#dc2626';
        msg.textContent = 'Network error. Please try again.';
        btn.disabled = false;
        btn.textContent = 'Login';
      }
    });
  }
});
