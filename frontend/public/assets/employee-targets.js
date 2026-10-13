/* =====================================================================
   Zenve BI — Employee Targets Dashboard
   Sidebar Subcategory: Employees & HR > Employee Targets
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var targets = [
    { name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', metric: 'Complex Surgeries & Consultations', target: '500 Cases', achieved: '542 Cases', pct: 108.4, status: 'Target Exceeded', tier: 'Tier 1 Alpha' },
    { name: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', metric: 'Orthopedic & Soft Tissue Surgeries', target: '160 Surgeries', achieved: '184 Surgeries', pct: 115.0, status: 'Target Exceeded', tier: 'Tier 1 Alpha' },
    { name: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', metric: 'Prescription Order Fulfillment', target: '4,000 Dispenses', achieved: '4,280 Dispenses', pct: 107.0, status: 'Target Exceeded', tier: 'Tier 1 Alpha' },
    { name: 'Vikramaditya Rao', role: 'Director of Engineering & AI', metric: 'Core AI Models & System Uptime', target: '99.9% SLA', achieved: '99.98% SLA', pct: 100.1, status: 'Target Achieved', tier: 'Tier 2 Beta' },
    { name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', metric: 'Clinical Onboarding Cohorts', target: '20 Hires', achieved: '24 Hires', pct: 120.0, status: 'Target Exceeded', tier: 'Tier 1 Alpha' },
    { name: 'Karthik Subramaniam', role: 'Hyperlocal Fleet Operations Mgr', metric: 'Hyperlocal Deliveries Under 45 Mins', target: '16,000 Drops', achieved: '18,420 Drops', pct: 115.1, status: 'Target Exceeded', tier: 'Tier 1 Alpha' },
    { name: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', metric: 'Pathology Diagnostics Processed', target: '1,300 Panels', achieved: '1,420 Panels', pct: 109.2, status: 'Target Exceeded', tier: 'Tier 1 Alpha' },
    { name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', metric: 'CSAT & Resolution Volume', target: '2,800 Tickets', achieved: '2,940 Tickets', pct: 105.0, status: 'Target Exceeded', tier: 'Tier 1 Alpha' },
    { name: 'Rahul Deshmukh', role: 'Dark Store Warehouse Supervisor', metric: 'Warehouse Dispatches (No Stockouts)', target: '35,000 Units', achieved: '34,200 Units', pct: 97.7, status: 'On Track', tier: 'Tier 2 Beta' },
    { name: 'Divya Nambiar', role: 'Junior Clinical Associate', metric: 'Outpatient Consultations Supported', target: '350 Cases', achieved: '380 Cases', pct: 108.5, status: 'Target Exceeded', tier: 'Tier 1 Alpha' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = targets.map(function (t) {
      var isOver = t.pct >= 100;
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + t.name + '</div><div style="font-size:11px;color:#94a3b8;">' + t.role + '</div></td>',
        '  <td style="color:#cbd5e1;">' + t.metric + '</td>',
        '  <td style="font-family:monospace;color:#94a3b8;">' + t.target + '</td>',
        '  <td style="font-family:monospace;font-weight:600;color:#f8fafc;">' + t.achieved + '</td>',
        '  <td>',
        '    <div style="display:flex;align-items:center;gap:8px;">',
        '      <div style="flex:1;height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;"><div style="width:' + Math.min(100, t.pct) + '%;height:100%;background:' + (isOver ? '#10b981' : '#f59e0b') + ';"></div></div>',
        '      <span style="font-family:monospace;font-weight:700;color:' + (isOver ? '#10b981' : '#f59e0b') + ';">' + t.pct + '%</span>',
        '    </div>',
        '  </td>',
        '  <td><span class="zhr-badge ' + (isOver ? 'zhr-badge-success' : 'zhr-badge-warning') + '">● ' + t.status + '</span></td>',
        '  <td style="text-align:right;font-weight:600;color:#93c5fd;">' + t.tier + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🎯</span> Employee Quota & Targets Leaderboard</h1>',
      '    <div class="zhr-sub">Monthly and quarterly revenue quotas, clinical case targets, operational delivery SLAs, and incentive tiers</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● Active Incentive Matrix</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Blended Attainment</div><div class="zhr-card-value">108.6%</div><div class="zhr-card-sub">+8.6% above budget quota</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Exceeding Target</div><div class="zhr-card-value">8 Staff</div><div class="zhr-card-sub">Tier 1 Alpha qualification</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Incentive Pool</div><div class="zhr-card-value">₹14,50,000</div><div class="zhr-card-sub">Accrued Q3 payout</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Deficit Attainment</div><div class="zhr-card-value">0 Staff</div><div class="zhr-card-sub">Zero critical underperformers</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Quota Delivery Matrix</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">October 2026 Target Cycle</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Team Member</th><th>Target Metric</th><th>Set Quota</th><th>Achieved</th><th>Attainment %</th><th>Status</th><th style="text-align:right;">Incentive Tier</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No quota records found</td></tr>') + '</tbody>',
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
    window.location.hash = '#employee-targets';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#employee-targets') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-targets-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-targets-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveEmployeeTargets = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'employee targets') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#employee-targets') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#employee-targets') setTimeout(open, 150);
  }
})();