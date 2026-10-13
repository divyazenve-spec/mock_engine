/* =====================================================================
   Zenve BI — Employee Expenses Dashboard
   Sidebar Subcategory: Employees & HR > Employee Expenses
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var claims = [
    { id: 'EXP-2026-501', name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', cat: 'Medical Consumables', date: '2026-10-10', merchant: 'Surgical Supplies Bangalore Pvt Ltd', amt: '₹14,500', receipt: 'INV-SSB-88392.pdf', status: 'Approved' },
    { id: 'EXP-2026-502', name: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', cat: 'Travel & Conveyance', date: '2026-10-09', merchant: 'IndiGo Airlines (BLR-BOM Vet Summit)', amt: '₹18,450', receipt: '6E-TKT-99231.pdf', status: 'Approved' },
    { id: 'EXP-2026-503', name: 'Karthik Subramaniam', role: 'Fleet Operations Mgr', cat: 'Fuel & EV Charging', date: '2026-10-11', merchant: 'Shell Koramangala Station', amt: '₹8,650', receipt: 'SHL-REC-11204.pdf', status: 'Pending' },
    { id: 'EXP-2026-504', name: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', cat: 'Medical Consumables', date: '2026-10-08', merchant: 'ColdChain MedTech Solutions', amt: '₹22,800', receipt: 'CCM-INV-4412.pdf', status: 'Approved' },
    { id: 'EXP-2026-505', name: 'Vikramaditya Rao', role: 'Director of Engineering & AI', cat: 'Software Subscriptions', date: '2026-10-05', merchant: 'Amazon Web Services India', amt: '₹84,200', receipt: 'AWS-INV-77319.pdf', status: 'Approved' },
    { id: 'EXP-2026-506', name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', cat: 'Meals & Offsite', date: '2026-10-07', merchant: 'Third Wave Coffee HSR Layout', amt: '₹3,450', receipt: 'TWC-BILL-9012.pdf', status: 'Approved' },
    { id: 'EXP-2026-507', name: 'Pooja Hegde', role: 'Senior Pathologist', cat: 'Medical Consumables', date: '2026-10-12', merchant: 'Bio-Rad Laboratories India', amt: '₹36,700', receipt: 'BR-INV-55102.pdf', status: 'Pending' },
    { id: 'EXP-2026-508', name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', cat: 'Software Subscriptions', date: '2026-10-04', merchant: 'Freshdesk / Freshworks Inc', amt: '₹16,500', receipt: 'FW-INV-66190.pdf', status: 'Approved' },
    { id: 'EXP-2026-509', name: 'Rahul Deshmukh', role: 'Warehouse Supervisor', cat: 'Travel & Conveyance', date: '2026-10-11', merchant: 'Uber India (Inter-DC Audit)', amt: '₹2,600', receipt: 'UBR-TRIP-3321.pdf', status: 'Pending' },
    { id: 'EXP-2026-510', name: 'Divya Nambiar', role: 'Junior Clinical Associate', cat: 'Meals & Catering', date: '2026-10-06', merchant: 'Swiggy Gourmet (Clinic Overtime)', amt: '₹4,250', receipt: 'SWG-ODR-8841.pdf', status: 'Pending' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = claims.map(function (c) {
      var badgeClass = c.status === 'Approved' ? 'zhr-badge-success' : c.status === 'Pending' ? 'zhr-badge-warning' : 'zhr-badge-danger';
      var actionBtn = c.status === 'Pending'
        ? '<button class="zhr-btn zhr-btn-success" style="height:24px;font-size:10px;padding:0 8px;" onclick="window.ZenveEmployeeExpenses.approve(\'' + c.id + '\');">Approve</button> <button class="zhr-btn" style="height:24px;font-size:10px;padding:0 8px;color:#f87171;" onclick="window.ZenveEmployeeExpenses.reject(\'' + c.id + '\');">Reject</button>'
        : '<span style="font-size:11px;color:#94a3b8;">Reimbursed</span>';

      return [
        '<tr>',
        '  <td style="font-family:monospace;color:#93c5fd;">' + c.id + '</td>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + c.name + '</div><div style="font-size:11px;color:#94a3b8;">' + c.role + '</div></td>',
        '  <td style="color:#cbd5e1;">' + c.cat + '</td>',
        '  <td style="font-family:monospace;color:#94a3b8;">' + c.date + '</td>',
        '  <td style="color:#cbd5e1;">' + c.merchant + '</td>',
        '  <td style="font-family:monospace;font-weight:700;color:#34d399;">' + c.amt + '</td>',
        '  <td style="font-size:11px;color:#93c5fd;">' + c.receipt + '</td>',
        '  <td><span class="zhr-badge ' + badgeClass + '">● ' + c.status + '</span></td>',
        '  <td style="text-align:right;">' + actionBtn + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🧾</span> Employee Expenses & Claims Settlement</h1>',
      '    <div class="zhr-sub">Corporate travel, clinical consumable claims, fuel stipends, software subscriptions, and tax invoice audits</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <button class="zhr-btn zhr-btn-primary" onclick="alert(\'Submit Expense Claim modal launched.\');">➕ New Claim</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Monthly Claims Disbursed</div><div class="zhr-card-value">₹2,10,750</div><div class="zhr-card-sub">+12.4% vs Sep</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Pending Approval</div><div class="zhr-card-value">4 Claims</div><div class="zhr-card-sub">₹52,200 in queue</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">GST Input Reclaimed</div><div class="zhr-card-value">₹37,935</div><div class="zhr-card-sub">18.0% GST Avg</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Policy Compliance</div><div class="zhr-card-value">99.4%</div><div class="zhr-card-sub">Zero fraud detected</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Reimbursement Claims Ledger</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Audited for IT & GST compliance</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Claim ID</th><th>Employee</th><th>Category</th><th>Date</th><th>Merchant / Vendor</th><th>Amount</th><th>Receipt Proof</th><th>Status</th><th style="text-align:right;">Actions</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');

  }

  function approve(id) {
    claims.forEach(function (c) {
      if (c.id === id) c.status = 'Approved';
    });
    render();
  }

  function reject(id) {
    claims.forEach(function (c) {
      if (c.id === id) c.status = 'Rejected';
    });
    render();
  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#employee-expenses';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#employee-expenses') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-expenses-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-expenses-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveEmployeeExpenses = { open: open, close: close, approve: approve, reject: reject };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'employee expenses') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#employee-expenses') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#employee-expenses') setTimeout(open, 150);
  }
})();
