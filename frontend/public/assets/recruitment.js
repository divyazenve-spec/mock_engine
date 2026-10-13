/* =====================================================================
   Zenve BI — Recruitment Dashboard
   Sidebar Subcategory: Employees & HR > Recruitment
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var jobs = [
    { id: 'REQ-2026-081', title: 'Consultant Veterinary Surgeon', dept: 'Clinical Care', loc: 'Whitefield Hub', openings: 2, applicants: 28, screened: 12, interview: 4, offer: 1, priority: 'Urgent', recruiter: 'Ananya Sen' },
    { id: 'REQ-2026-082', title: 'Critical Care ICU Veterinarian', dept: 'Clinical Care', loc: 'Koramangala Central', openings: 2, applicants: 19, screened: 8, interview: 3, offer: 1, priority: 'Urgent', recruiter: 'Ananya Sen' },
    { id: 'REQ-2026-083', title: 'Senior Compounding Pharmacist', dept: 'Pharmacy', loc: 'Whitefield Central', openings: 1, applicants: 14, screened: 6, interview: 2, offer: 1, priority: 'High', recruiter: 'Sneha Kulkarni' },
    { id: 'REQ-2026-084', title: 'Lead AI Computer Vision Engineer', dept: 'Technology & AI', loc: 'Bellandur Tech Park', openings: 2, applicants: 42, screened: 18, interview: 5, offer: 2, priority: 'High', recruiter: 'Vikramaditya Rao' },
    { id: 'REQ-2026-085', title: 'Veterinary Pathologist (Histology)', dept: 'Diagnostics', loc: 'Jayanagar Lab', openings: 1, applicants: 11, screened: 5, interview: 2, offer: 0, priority: 'Normal', recruiter: 'Ananya Sen' },
    { id: 'REQ-2026-086', title: 'Hyperlocal EV Dispatch Supervisor', dept: 'Logistics', loc: 'HSR Layout Node', openings: 2, applicants: 31, screened: 14, interview: 4, offer: 1, priority: 'Urgent', recruiter: 'Karthik S.' },
    { id: 'REQ-2026-087', title: 'Dark Store Shift Lead', dept: 'Warehouse', loc: 'Electronic City DC', openings: 1, applicants: 16, screened: 7, interview: 2, offer: 1, priority: 'Normal', recruiter: 'Rahul D.' },
    { id: 'REQ-2026-088', title: 'Customer Experience Escalation Lead', dept: 'Customer Delight', loc: 'Support Node', openings: 1, applicants: 22, screened: 9, interview: 3, offer: 1, priority: 'Normal', recruiter: 'Mohammed Z.' },
    { id: 'REQ-2026-089', title: 'Senior Talent Acquisition Specialist', dept: 'People & HR', loc: 'Koramangala HQ', openings: 1, applicants: 25, screened: 11, interview: 3, offer: 1, priority: 'Normal', recruiter: 'Ananya Sen' },
    { id: 'REQ-2026-090', title: 'Emergency Trauma Nursing Associate', dept: 'Clinical Care', loc: 'Indiranagar Hub', openings: 2, applicants: 17, screened: 8, interview: 2, offer: 1, priority: 'Urgent', recruiter: 'Dr. Rajesh Varma' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = jobs.map(function (j) {
      var badgeClass = j.priority === 'Urgent' ? 'zhr-badge-danger' : j.priority === 'High' ? 'zhr-badge-warning' : 'zhr-badge-info';
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + j.title + '</div><div style="font-size:11px;font-family:monospace;color:#94a3b8;">' + j.id + ' · Lead: ' + j.recruiter + '</div></td>',
        '  <td><span class="zhr-badge zhr-badge-info">' + j.dept + '</span></td>',
        '  <td>' + j.loc + '</td>',
        '  <td style="font-family:monospace;font-weight:600;">' + j.openings + '</td>',
        '  <td style="font-family:monospace;color:#38bdf8;">' + j.applicants + '</td>',
        '  <td style="font-family:monospace;color:#cbd5e1;">' + j.screened + '</td>',
        '  <td style="font-family:monospace;color:#f59e0b;">' + j.interview + '</td>',
        '  <td style="font-family:monospace;font-weight:700;color:#34d399;">' + j.offer + '</td>',
        '  <td style="text-align:right;"><span class="zhr-badge ' + badgeClass + '">● ' + j.priority + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>📢</span> Talent Acquisition & Pipeline Governance</h1>',
      '    <div class="zhr-sub">Open requisitions, applicant funnel progression, interview scheduling, offer letters, and time-to-hire telemetry</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <button class="zhr-btn zhr-btn-primary" onclick="alert(\'Post New Requisition dialog initiated.\');">➕ Post Requisition</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Open Requisitions</div><div class="zhr-card-value">15 Vacancies</div><div class="zhr-card-sub">Across 10 job postings</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Applicant Funnel</div><div class="zhr-card-value">236 Candidates</div><div class="zhr-card-sub">98 screened</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Interviews in Flight</div><div class="zhr-card-value">29 Scheduled</div><div class="zhr-card-sub">10 offer letters out</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Avg Time-to-Hire</div><div class="zhr-card-value">17.4 Days</div><div class="zhr-card-sub">-3.6 days vs benchmark</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Requisition Sourcing Funnel</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Active pipeline tracking</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Requisition & Role</th><th>Department</th><th>Location</th><th>Vacancies</th><th>Applicants</th><th>Screened</th><th>Interview</th><th>Offers</th><th style="text-align:right;">Priority</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
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
    window.location.hash = '#recruitment';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#recruitment') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-recruitment-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-recruitment-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveRecruitment = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'recruitment') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#recruitment') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#recruitment') setTimeout(open, 150);
  }
})();
