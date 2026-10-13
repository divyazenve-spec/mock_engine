/* =====================================================================
   Zenve BI — Leave Management Dashboard
   Sidebar Subcategory: Employees & HR > Leave Management
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var leaveRequests = [
    { id: 'LV-2026-101', name: 'Rahul Deshmukh', role: 'Dark Store Warehouse Supervisor', type: 'Annual Leave', dates: '12 Oct - 15 Oct 2026', reason: 'Family wedding ceremony', bal: '14 Days Left', status: 'Pending' },
    { id: 'LV-2026-102', name: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', type: 'Conference Leave', dates: '22 Oct - 24 Oct 2026', reason: 'Indian Veterinary Congress Mumbai', bal: '8 Days Left', status: 'Approved' },
    { id: 'LV-2026-103', name: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', type: 'Casual Leave', dates: '19 Oct 2026 (1 Day)', reason: 'Personal dental appointment', bal: '11 Days Left', status: 'Pending' },
    { id: 'LV-2026-104', name: 'Karthik Subramaniam', role: 'Hyperlocal Fleet Operations Mgr', type: 'Sick Leave', dates: '08 Oct - 09 Oct 2026', reason: 'Viral fever recuperation', bal: '10 Days Left', status: 'Approved' },
    { id: 'LV-2026-105', name: 'Divya Nambiar', role: 'Junior Clinical Associate', type: 'Casual Leave', dates: '28 Oct 2026 (1 Day)', reason: 'Family event', bal: '12 Days Left', status: 'Pending' },
    { id: 'LV-2026-106', name: 'Vikramaditya Rao', role: 'Director of Engineering & AI', type: 'Paternity Leave', dates: '01 Nov - 14 Nov 2026', reason: 'Childbirth support', bal: '15 Days Left', status: 'Approved' },
    { id: 'LV-2026-107', name: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', type: 'Annual Leave', dates: '26 Oct - 30 Oct 2026', reason: 'Diwali festive vacation', bal: '9 Days Left', status: 'Pending' },
    { id: 'LV-2026-108', name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', type: 'Compensatory Off', dates: '16 Oct 2026 (1 Day)', reason: 'Overtime worked during weekend camp', bal: '3 Days Left', status: 'Approved' },
    { id: 'LV-2026-109', name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', type: 'Conference Leave', dates: '05 Nov - 07 Nov 2026', reason: 'World Small Animal Vet Association (WSAVA)', bal: '16 Days Left', status: 'Pending' },
    { id: 'LV-2026-110', name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', type: 'Casual Leave', dates: '23 Oct 2026 (1 Day)', reason: 'Personal errands', bal: '13 Days Left', status: 'Pending' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = leaveRequests.map(function (lr) {
      var badgeClass = lr.status === 'Approved' ? 'zhr-badge-success' : lr.status === 'Pending' ? 'zhr-badge-warning' : 'zhr-badge-danger';
      var actionBtn = lr.status === 'Pending'
        ? '<button class="zhr-btn zhr-btn-success" style="height:24px;font-size:10px;padding:0 8px;" onclick="window.ZenveLeaveManagement.approve(\'' + lr.id + '\');">Approve</button> <button class="zhr-btn" style="height:24px;font-size:10px;padding:0 8px;color:#f87171;" onclick="window.ZenveLeaveManagement.reject(\'' + lr.id + '\');">Reject</button>'
        : '<span style="font-size:11px;color:#94a3b8;">Processed</span>';

      return [
        '<tr>',
        '  <td style="font-family:monospace;color:#93c5fd;">' + lr.id + '</td>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + lr.name + '</div><div style="font-size:11px;color:#94a3b8;">' + lr.role + '</div></td>',
        '  <td style="color:#cbd5e1;">' + lr.type + '</td>',
        '  <td style="font-family:monospace;color:#f8fafc;">' + lr.dates + '</td>',
        '  <td style="color:#94a3b8;">' + lr.reason + '</td>',
        '  <td style="font-family:monospace;color:#34d399;">' + lr.bal + '</td>',
        '  <td><span class="zhr-badge ' + badgeClass + '">● ' + lr.status + '</span></td>',
        '  <td style="text-align:right;">' + actionBtn + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🏖️</span> Leave Management & Time-Off Governance</h1>',
      '    <div class="zhr-sub">PTO balances, pending managerial signoffs, sick leaves, and public holiday calendars</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-warning">● 6 Pending Approvals</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Currently on Leave</div><div class="zhr-card-value">1 Staff</div><div class="zhr-card-sub">Rahul Deshmukh</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Pending Approval</div><div class="zhr-card-value">6 Staff</div><div class="zhr-card-sub">Manager review pending</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Avg Org PTO Balance</div><div class="zhr-card-value">14.2 Days</div><div class="zhr-card-sub">Adequate coverage</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Upcoming Q4 Holidays</div><div class="zhr-card-value">4 Days</div><div class="zhr-card-sub">Karnataka state gazetted</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Leave Requests Approval Ledger</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Direct manager workflow queue</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Request ID</th><th>Employee</th><th>Leave Type</th><th>Duration & Dates</th><th>Reason</th><th>Balance</th><th>Status</th><th style="text-align:right;">Actions</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');

  }

  function approve(id) {
    leaveRequests.forEach(function (lr) {
      if (lr.id === id) lr.status = 'Approved';
    });
    render();
  }

  function reject(id) {
    leaveRequests.forEach(function (lr) {
      if (lr.id === id) lr.status = 'Rejected';
    });
    render();
  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#leave-management';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#leave-management') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-leave-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-leave-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveLeaveManagement = { open: open, close: close, approve: approve, reject: reject };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'leave management') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#leave-management') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#leave-management') setTimeout(open, 150);
  }
})();
