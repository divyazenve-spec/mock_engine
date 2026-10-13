/* =====================================================================
   Zenve BI — Salary Cost Dashboard
   Sidebar Subcategory: Employees & HR > Salary Cost
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var deptCosts = [
    { dept: 'Clinical Services', color: '#3b82f6', staff: 64, monthly: '₹52,40,000', annual: '₹6.28 Cr', pct: 35.4 },
    { dept: 'Technology & AI Core', color: '#ec4899', staff: 22, monthly: '₹28,60,000', annual: '₹3.43 Cr', pct: 19.3 },
    { dept: 'Hyperlocal Logistics', color: '#f59e0b', staff: 48, monthly: '₹21,80,000', annual: '₹2.61 Cr', pct: 14.7 },
    { dept: 'Pharmacy & Therapeutics', color: '#10b981', staff: 26, monthly: '₹19,40,000', annual: '₹2.32 Cr', pct: 13.1 },
    { dept: 'Emergency & Critical ICU', color: '#ef4444', staff: 14, monthly: '₹15,20,000', annual: '₹1.82 Cr', pct: 10.3 },
    { dept: 'Dark Store Fulfillment', color: '#6366f1', staff: 20, monthly: '₹12,60,000', annual: '₹1.51 Cr', pct: 8.5 },
    { dept: 'Diagnostics & Pathology', color: '#8b5cf6', staff: 12, monthly: '₹9,80,000', annual: '₹1.17 Cr', pct: 6.6 },
    { dept: 'Customer Delight', color: '#14b8a6', staff: 18, monthly: '₹8,50,000', annual: '₹1.02 Cr', pct: 5.7 },
    { dept: 'People, Culture & HR', color: '#f43f5e', staff: 8, monthly: '₹5,40,000', annual: '₹0.64 Cr', pct: 3.6 },
    { dept: 'Finance & Compliance', color: '#06b6d4', staff: 6, monthly: '₹4,90,000', annual: '₹0.58 Cr', pct: 3.3 }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = deptCosts.map(function (d) {
      return [
        '<tr>',
        '  <td style="font-weight:600;color:' + d.color + ';">' + d.dept + '</td>',
        '  <td style="font-family:monospace;">' + d.staff + ' staff</td>',
        '  <td style="font-family:monospace;font-weight:600;color:#f8fafc;">' + d.monthly + '</td>',
        '  <td style="font-family:monospace;color:#38bdf8;">' + d.annual + '</td>',
        '  <td>',
        '    <div style="display:flex;align-items:center;gap:8px;">',
        '      <div style="width:100px;height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;"><div style="width:' + d.pct + '%;height:100%;background:' + d.color + ';"></div></div>',
        '      <span style="font-family:monospace;font-weight:700;color:' + d.color + ';">' + d.pct + '%</span>',
        '    </div>',
        '  </td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>💰</span> Workforce CTC & Salary Cost Analytics</h1>',
      '    <div class="zhr-sub">Executive Cost-to-Company (CTC) breakdown, department spend, salary bands, and employer liabilities</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● ₹17.76 Cr Annualized CTC</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Monthly CTC Burn</div><div class="zhr-card-value">₹1.48 Cr</div><div class="zhr-card-sub">208 headcount</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Annualized Commitment</div><div class="zhr-card-value">₹17.76 Cr</div><div class="zhr-card-sub">94.2% budget allocation</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Avg CTC per Employee</div><div class="zhr-card-value">₹8.54 LPA</div><div class="zhr-card-sub">Blended across clinical & ops</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Employer PF Match</div><div class="zhr-card-value">₹17.76L / mo</div><div class="zhr-card-sub">Statutory compliance 12%</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Departmental Salary Cost Stratification</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">FY 2026-2027 Projections</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Department</th><th>Headcount</th><th>Monthly CTC</th><th>Annualized Commitment</th><th>Budget Share</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="5" style="text-align:center;padding:36px 16px;color:#94a3b8;">No department cost records found</td></tr>') + '</tbody>',
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
    window.location.hash = '#salary-cost';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#salary-cost') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-salary-cost-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-salary-cost-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveSalaryCost = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'salary cost') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#salary-cost') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#salary-cost') setTimeout(open, 150);
  }
})();
