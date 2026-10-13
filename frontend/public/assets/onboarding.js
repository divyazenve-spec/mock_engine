/* =====================================================================
   Zenve BI — Onboarding Dashboard
   Sidebar Subcategory: Employees & HR > Onboarding
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var recruits = [
    { name: 'Dr. Arvind Swaminathan', role: 'Associate Veterinary Surgeon', dept: 'Clinical Care', date: '2026-10-15', buddy: 'Dr. Priya Nair', hardware: 'MacBook Pro M3 + iPad', bvg: 'Verified (SpringVerify)', pct: 90, status: 'In Progress' },
    { name: 'Pooja Hegde', role: 'Senior Pathologist', dept: 'Clinical Care', date: '2026-10-01', buddy: 'Dr. Rajesh Varma', hardware: 'ThinkPad P16s + Lab Terminal', bvg: 'Verified (SpringVerify)', pct: 100, status: 'Completed' },
    { name: 'Divya Nambiar', role: 'Junior Clinical Associate', dept: 'Clinical Care', date: '2026-10-06', buddy: 'Pooja Hegde', hardware: 'Dell Latitude 7440', bvg: 'Verified (SpringVerify)', pct: 100, status: 'Completed' },
    { name: 'Rohan Shenoy', role: 'Emergency Critical Care Vet', dept: 'Emergency & ICU', date: '2026-10-18', buddy: 'Dr. Rajesh Varma', hardware: 'MacBook Air M3', bvg: 'Verified (SpringVerify)', pct: 75, status: 'In Progress' },
    { name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', dept: 'People & HR', date: '2026-09-28', buddy: 'Vikramaditya Rao', hardware: 'MacBook Air M3', bvg: 'Verified (SpringVerify)', pct: 100, status: 'Completed' },
    { name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', dept: 'Customer Delight', date: '2026-10-03', buddy: 'Sneha Kulkarni', hardware: 'MacBook Air M3', bvg: 'Verified (SpringVerify)', pct: 100, status: 'Completed' },
    { name: 'Sumitra Banerjee', role: 'Compounding Pharmacist', dept: 'Pharmacy & OTC', date: '2026-10-20', buddy: 'Sneha Kulkarni', hardware: 'Dell OptiPlex Pharma Terminal', bvg: 'Under Review', pct: 60, status: 'In Progress' },
    { name: 'Tanmay Joshi', role: 'Full-Stack Telehealth Engineer', dept: 'Technology & AI', date: '2026-10-22', buddy: 'Vikramaditya Rao', hardware: 'MacBook Pro M3 Max', bvg: 'Verified (SpringVerify)', pct: 50, status: 'In Progress' },
    { name: 'Farooq Abdullah', role: 'Cold-Chain Logistics Executive', dept: 'Supply Chain & Ops', date: '2026-10-08', buddy: 'Karthik Subramaniam', hardware: 'Samsung Galaxy Tab Active', bvg: 'Verified (SpringVerify)', pct: 100, status: 'Completed' },
    { name: 'Meera Krishnan', role: 'Feline Behavioral Specialist', dept: 'Clinical Care', date: '2026-10-25', buddy: 'Dr. Priya Nair', hardware: 'iPad Air + Apple Pencil', bvg: 'Under Review', pct: 40, status: 'In Progress' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = recruits.map(function (r) {
      var isDone = r.pct === 100;
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + r.name + '</div><div style="font-size:11px;color:#94a3b8;">' + r.role + ' · ' + r.dept + '</div></td>',
        '  <td style="font-family:monospace;">' + r.date + '</td>',
        '  <td style="color:#93c5fd;">🤝 ' + r.buddy + '</td>',
        '  <td style="color:#cbd5e1;">' + r.hardware + '</td>',
        '  <td style="color:' + (r.bvg.indexOf('Verified') >= 0 ? '#34d399' : '#f59e0b') + ';font-weight:600;">' + r.bvg + '</td>',
        '  <td>',
        '    <div style="display:flex;align-items:center;gap:8px;">',
        '      <div style="width:70px;height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;"><div style="width:' + r.pct + '%;height:100%;background:' + (isDone ? '#10b981' : '#38bdf8') + ';"></div></div>',
        '      <span style="font-family:monospace;font-weight:700;color:' + (isDone ? '#10b981' : '#38bdf8') + ';">' + r.pct + '%</span>',
        '    </div>',
        '  </td>',
        '  <td style="text-align:right;"><span class="zhr-badge ' + (isDone ? 'zhr-badge-success' : 'zhr-badge-info') + '">● ' + r.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🐣</span> New Hire Onboarding & Day-1 Readiness</h1>',
      '    <div class="zhr-sub">Recruit integration journeys, hardware provisioning, background checks, medical council verification, and buddy assignments</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● 98.5% SLA Adherence</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Active Cohort</div><div class="zhr-card-value">10 Recruits</div><div class="zhr-card-sub">Clinical & tech joiners</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Day-1 Readiness</div><div class="zhr-card-value">98.5%</div><div class="zhr-card-sub">Zero IT downtime</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Background Checks</div><div class="zhr-card-value">100% Verified</div><div class="zhr-card-sub">SpringVerify certified</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Buddy Allocation</div><div class="zhr-card-value">100% Assigned</div><div class="zhr-card-sub">10 / 10 paired</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Onboarding Cohort Progress</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Automated HRIS milestone triggers</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>New Team Member</th><th>Joined Date</th><th>Buddy</th><th>Hardware Issued</th><th>BGV Status</th><th>Readiness</th><th style="text-align:right;">Status</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:36px 16px;color:#94a3b8;">No onboarding records found</td></tr>') + '</tbody>',
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
    window.location.hash = '#onboarding';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#onboarding') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-onboarding-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-onboarding-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveOnboarding = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'onboarding') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#onboarding') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#onboarding') setTimeout(open, 150);
  }
})();
