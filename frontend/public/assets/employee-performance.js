/* =====================================================================
   Zenve BI — Employee Performance Dashboard
   Sidebar Subcategory: Employees & HR > Employee Performance
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var performers = [
    { name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', dept: 'Clinical Care', score: 98.5, rating: '5★ Elite', cases: '542 Consults', csat: '4.95', sla: '99.2%', status: 'Appraised' },
    { name: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', dept: 'Clinical Care', score: 96.2, rating: '5★ Elite', cases: '184 Surgeries', csat: '4.92', sla: '98.5%', status: 'Appraised' },
    { name: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', dept: 'Pharmacy', score: 94.8, rating: '4★ Strong', cases: '4,280 Orders', csat: '4.88', sla: '99.5%', status: 'Appraised' },
    { name: 'Vikramaditya Rao', role: 'Director of Engineering & AI', dept: 'Technology & AI', score: 99.1, rating: '5★ Elite', cases: '48 Deployments', csat: '4.98', sla: '99.9%', status: 'Appraised' },
    { name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', dept: 'People & HR', score: 92.4, rating: '4★ Strong', cases: '24 Hires', csat: '4.85', sla: '96.4%', status: 'Appraised' },
    { name: 'Karthik Subramaniam', role: 'Hyperlocal Fleet Operations Mgr', dept: 'Logistics', score: 95.0, rating: '5★ Elite', cases: '18,420 Drops', csat: '4.90', sla: '98.8%', status: 'Appraised' },
    { name: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', dept: 'Diagnostics', score: 93.7, rating: '4★ Strong', cases: '1,420 Panels', csat: '4.89', sla: '97.6%', status: 'In Review' },
    { name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', dept: 'Customer Delight', score: 96.8, rating: '5★ Elite', cases: '2,940 Tickets', csat: '4.93', sla: '99.1%', status: 'Appraised' },
    { name: 'Rahul Deshmukh', role: 'Dark Store Warehouse Supervisor', dept: 'Warehouse', score: 88.5, rating: '3★ Meets Expectations', cases: '34,200 Picks', csat: '4.82', sla: '95.2%', status: 'In Review' },
    { name: 'Divya Nambiar', role: 'Junior Clinical Associate', dept: 'Clinical Care', score: 91.2, rating: '4★ Strong', cases: '380 Consults', csat: '4.80', sla: '96.0%', status: 'Appraised' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = performers.map(function (p) {
      var badgeClass = p.rating.indexOf('5★') >= 0 ? 'zhr-badge-success' : p.rating.indexOf('4★') >= 0 ? 'zhr-badge-info' : 'zhr-badge-warning';
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + p.name + '</div><div style="font-size:11px;color:#94a3b8;">' + p.role + '</div></td>',
        '  <td><span class="zhr-badge zhr-badge-info">' + p.dept + '</span></td>',
        '  <td><strong style="font-family:monospace;color:#34d399;font-size:13px;">' + p.score + '%</strong></td>',
        '  <td><span class="zhr-badge ' + badgeClass + '">' + p.rating + '</span></td>',
        '  <td style="font-family:monospace;">' + p.cases + '</td>',
        '  <td style="color:#fcd34d;font-weight:600;">⭐ ' + p.csat + '</td>',
        '  <td style="color:#34d399;font-family:monospace;">' + p.sla + '</td>',
        '  <td><span class="zhr-badge ' + (p.status === 'Appraised' ? 'zhr-badge-success' : 'zhr-badge-warning') + '">● ' + p.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>⭐</span> Employee Performance & Appraisals</h1>',
      '    <div class="zhr-sub">Quarterly review cycles, clinical and operational KPI delivery, customer CSAT, and merit ratings</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● Q3 2026 Cycle</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Average KPI Score</div><div class="zhr-card-value">94.8%</div><div class="zhr-card-sub">+3.2% vs Q2</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Top Performers (5★)</div><div class="zhr-card-value">6 Staff</div><div class="zhr-card-sub">Eligible for bonuses</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Client CSAT Rating</div><div class="zhr-card-value">4.91 / 5.0</div><div class="zhr-card-sub">Top decile rating</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Appraisals Completed</div><div class="zhr-card-value">100%</div><div class="zhr-card-sub">10 / 10 scorecards ready</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Employee Scorecard Matrix</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Sorted by weighted performance</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>KPI Score</th><th>Rating Tier</th><th>Workload / Output</th><th>CSAT</th><th>SLA Adherence</th><th>Status</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="8" style="text-align:center;padding:36px 16px;color:#94a3b8;">No appraisal scorecards found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');

  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#employee-performance';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#employee-performance') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-performance-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-performance-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveEmployeePerformance = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'employee performance') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#employee-performance') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#employee-performance') setTimeout(open, 150);
  }
})();