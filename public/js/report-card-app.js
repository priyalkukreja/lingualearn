(function () {
  if (!requireAuth()) return;
  startSession();

  const student = getStudent();
  if (student) {
    document.getElementById('navXP').textContent = (student.total_xp || 0) + ' XP';
  }

  loadReportCard();
  checkPendingTests();

  async function loadReportCard() {
    try {
      const data = await apiGet('/api/scheduled-tests/report-card');
      if (data?.reportCard) {
        renderReportCard(data.reportCard);
      }
    } catch (err) {
      console.log('Report card API not available, showing empty state');
    }
  }

  function renderReportCard(rc) {
    // Overall score ring
    const pct = rc.avgPercentage || 0;
    const circumference = 2 * Math.PI * 58;
    const offset = circumference * (1 - pct / 100);

    const ring = document.getElementById('overallRing');
    const color = pct >= 80 ? '#059669' : pct >= 60 ? '#f59e0b' : pct >= 40 ? '#5b5ef4' : '#ef4444';
    ring.style.stroke = color;
    setTimeout(() => { ring.style.strokeDashoffset = offset; }, 200);

    document.getElementById('overallPct').textContent = pct ? pct + '%' : '—';
    document.getElementById('overallGrade').textContent = rc.overallGrade || '—';
    document.getElementById('totalTestsLabel').textContent = (rc.totalTests || 0) + ' tests taken';

    // Mini stats
    document.getElementById('rcStreak').textContent = rc.streak || 0;
    document.getElementById('rcXP').textContent = rc.xp || 0;

    if (rc.attendance) {
      document.getElementById('rcAttendance').textContent = rc.attendance.percentage + '%';
    }

    if (rc.improvement !== null && rc.improvement !== undefined) {
      const trendEl = document.getElementById('rcTrend');
      if (rc.improvement > 0) {
        trendEl.textContent = '+' + rc.improvement + '%';
        trendEl.style.color = '#059669';
      } else if (rc.improvement < 0) {
        trendEl.textContent = rc.improvement + '%';
        trendEl.style.color = '#ef4444';
      } else {
        trendEl.textContent = '0%';
      }
    }

    // Section bars
    const sections = rc.sections || {};
    renderSectionBar('Grammar', sections.grammar, 'secGrammar', 'secGrammarBar');
    renderSectionBar('Vocabulary', sections.vocabulary, 'secVocab', 'secVocabBar');
    renderSectionBar('Writing', sections.writing, 'secWriting', 'secWritingBar');
    renderSectionBar('Comprehension', sections.comprehension, 'secComp', 'secCompBar');

    // Trend chart
    if (rc.trend && rc.trend.length) {
      document.getElementById('trendEmpty').style.display = 'none';
      renderTrendChart(rc.trend);
    }

    // Strengths
    if (rc.strongSkills?.length) {
      const list = document.getElementById('strongList');
      list.innerHTML = rc.strongSkills.map(s => `
        <div class="rc-skill-item">
          <span class="rc-skill-name">${s.name}</span>
          <span class="rc-skill-pct good">${s.accuracy}%</span>
        </div>
      `).join('');
    }

    // Weaknesses
    if (rc.weakSkills?.length) {
      const list = document.getElementById('weakList');
      list.innerHTML = rc.weakSkills.map(s => `
        <div class="rc-skill-item">
          <span class="rc-skill-name">${s.name}</span>
          <span class="rc-skill-pct bad">${s.accuracy}%</span>
        </div>
      `).join('');
    }

    // Past tests
    renderPastTests(rc);
  }

  function renderSectionBar(name, val, labelId, barId) {
    const label = document.getElementById(labelId);
    const bar = document.getElementById(barId);
    if (val !== null && val !== undefined) {
      label.textContent = val + '%';
      setTimeout(() => { bar.style.width = val + '%'; }, 300);
      const color = val >= 80 ? '#059669' : val >= 60 ? '#f59e0b' : '#ef4444';
      bar.style.background = color;
    }
  }

  function renderTrendChart(trend) {
    const container = document.getElementById('trendBars');
    const reversed = [...trend].reverse();
    const maxPct = 100;

    container.innerHTML = reversed.map(t => {
      const h = Math.max(10, (t.pct / maxPct) * 130);
      const cls = t.pct >= 80 ? 'high' : t.pct >= 60 ? 'mid' : 'low';
      const typeLabels = { weekly: 'W', monthly: 'M', half_yearly: 'HY', annual: 'A' };
      return `
        <div class="rc-trend-bar-wrap">
          <div class="rc-trend-bar ${cls}" style="height:${h}px">
            <span class="rc-trend-bar-pct">${t.pct}%</span>
          </div>
          <span class="rc-trend-bar-type">${typeLabels[t.type] || t.type}</span>
          <span class="rc-trend-bar-date">${t.date?.slice(5) || ''}</span>
        </div>
      `;
    }).join('');
  }

  function renderPastTests(rc) {
    // Fetch from API if not embedded
    fetchPastTests();
  }

  async function fetchPastTests() {
    try {
      const data = await apiGet('/api/scheduled-tests/pending');
      if (data?.pastResults?.length) {
        const list = document.getElementById('pastTestList');
        const icons = { weekly: '📝', monthly: '📋', half_yearly: '📋', annual: '🏆' };
        const labels = { weekly: 'Weekly Test', monthly: 'Monthly Assessment', half_yearly: 'Half Yearly Mock', annual: 'Annual Mock' };

        list.innerHTML = data.pastResults.map(r => {
          const scoreClass = r.percentage >= 80 ? 'high' : r.percentage >= 60 ? 'mid' : 'low';
          const date = r.taken_at ? new Date(r.taken_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '';
          return `
            <div class="rc-past-item">
              <div class="rc-past-icon">${icons[r.test_type] || '📝'}</div>
              <div class="rc-past-info">
                <div class="rc-past-type">${labels[r.test_type] || r.test_type}</div>
                <div class="rc-past-date">${date} · ${r.score}/${r.total_marks} marks · ${r.time_taken_sec ? Math.round(r.time_taken_sec / 60) + ' min' : ''}</div>
              </div>
              <div class="rc-past-score ${scoreClass}">${r.percentage}%</div>
              <div class="rc-past-grade">${r.grade}</div>
            </div>
          `;
        }).join('');
      }
    } catch (err) {
      console.log('Past tests fetch failed');
    }
  }

  async function checkPendingTests() {
    try {
      const data = await apiGet('/api/scheduled-tests/pending');
      if (data?.tests?.length) {
        const test = data.tests[0];
        const banner = document.getElementById('pendingBanner');
        banner.style.display = '';
        document.getElementById('pendingTitle').textContent = test.label + ' Available!';
        document.getElementById('pendingSub').textContent = `${test.totalMarks} marks · ${test.timeMin} minutes · Take it to update your report card`;

        document.getElementById('takeTestBtn').addEventListener('click', () => {
          window.location.href = '/writing-test';
        });
      }
    } catch (err) {
      console.log('Pending tests check failed');
    }
  }

  // Share report with parent
  document.getElementById('shareReportBtn').addEventListener('click', async () => {
    const btn = document.getElementById('shareReportBtn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      await apiPost('/api/notifications/send-weekly');
      btn.textContent = '✅ Sent to Parent!';
      btn.style.background = '#ecfdf5';
      btn.style.color = '#059669';
      btn.style.borderColor = '#6ee7b7';
    } catch (err) {
      btn.textContent = '❌ Failed';
      btn.style.color = '#ef4444';
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = '📤 Share with Parent';
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 3000);
  });
})();
