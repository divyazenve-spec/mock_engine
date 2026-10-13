/* =====================================================================
   Zenve BI — Payroll Dashboard
   Sidebar Subcategory: Employees & HR > Payroll
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var payrollRecords = [
    { id: 'EMP-1001', name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', basic: '₹1,00,000', hra: '₹50,000', pf: '₹12,000', tds: '₹16,400', net: '₹1,71,600', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' },
    { id: 'EMP-1002', name: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', basic: '₹89,583', hra: '₹44,791', pf: '₹10,750', tds: '₹14,050', net: '₹1,54,366', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' },
    { id: 'EMP-1003', name: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', basic: '₹70,000', hra: '₹35,000', pf: '₹8,400', tds: '₹9,800', net: '₹1,21,800', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' },
    { id: 'EMP-1004', name: 'Vikramaditya Rao', role: 'Director of Engineering & AI', basic: '₹1,41,666', hra: '₹70,833', pf: '₹17,000', tds: '₹25,500', net: '₹2,40,833', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' },
    { id: 'EMP-1005', name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', basic: '₹60,416', hra: '₹30,208', pf: '₹7,250', tds: '₹7,650', net: '₹1,05,933', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' },
    { id: 'EMP-1006', name: 'Karthik Subramaniam', role: 'Hyperlocal Fleet Operations Mgr', basic: '₹55,000', hra: '₹27,500', pf: '₹6,600', tds: '₹6,200', net: '₹97,200', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' },
    { id: 'EMP-1007', name: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', basic: '₹65,000', hra: '₹32,500', pf: '₹7,800', tds: '₹8,600', net: '₹1,13,600', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' },
    { id: 'EMP-1008', name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', basic: '₹51,666', hra: '₹25,833', pf: '₹6,200', tds: '₹5,400', net: '₹91,733', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' },
    { id: 'EMP-1009', name: 'Rahul Deshmukh', role: 'Dark Store Warehouse Supervisor', basic: '₹40,833', hra: '₹20,416', pf: '₹4,900', tds: '₹4,000', net: '₹72,766', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' },
    { id: 'EMP-1010', name: 'Divya Nambiar', role: 'Junior Clinical Associate', basic: '₹35,416', hra: '₹17,708', pf: '₹4,250', tds: '₹3,250', net: '₹63,333', status: 'Disbursed', batch: 'BATCH-HDFC-SEP-001' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = payrollRecords.map(function (p) {
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + p.name + '</div><div style="font-size:11px;font-family:monospace;color:#94a3b8;">' + p.id + ' · ' + p.role + '</div></td>',
        '  <td style="font-family:monospace;color:#cbd5e1;">' + p.basic + '</td>',
        '  <td style="font-family:monospace;color:#cbd5e1;">' + p.hra + '</td>',
        '  <td style="font-family:monospace;color:#f87171;">-' + p.pf + '</td>',
        '  <td style="font-family:monospace;color:#f87171;">-' + p.tds + '</td>',
        '  <td style="font-family:monospace;font-weight:700;color:#34d399;">' + p.net + '</td>',
        '  <td><span class="zhr-badge zhr-badge-success">● ' + p.status + '</span></td>',
        '  <td style="text-align:right;"><button class="zhr-btn" style="height:26px;font-size:11px;" onclick="alert(\'Payslip for ' + p.name + '\\nBasic: ' + p.basic + '\\nHRA: ' + p.hra + '\\nPF: ' + p.pf + '\\nTDS: ' + p.tds + '\\nNet Take-Home: ' + p.net + '\\nBank Batch: ' + p.batch + '\');">Payslip 📄</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>💵</span> Payroll Register & Direct Bank Batches</h1>',
      '    <div class="zhr-sub">Monthly salary processing, PF, ESI, professional tax, TDS deductions, and automated corporate NEFT transfers</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <button class="zhr-btn zhr-btn-success" onclick="alert(\'Corporate NEFT Batch XML downloaded successfully for HDFC/ICICI gateway.\');">🏦 Export Bank Batch</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Gross Payroll Run</div><div class="zhr-card-value">₹14,50,000</div><div class="zhr-card-sub">10 staff monthly CTC</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">PF & ESI Remittances</div><div class="zhr-card-value">₹1,74,000</div><div class="zhr-card-sub">EPFO statutory deposit</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">TDS Tax Deducted</div><div class="zhr-card-value">₹1,08,750</div><div class="zhr-card-sub">TRACES Section 192</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Net Disbursed to Bank</div><div class="zhr-card-value">₹11,67,250</div><div class="zhr-card-sub">100% direct salary credit</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">September 2026 Disbursal Register</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">HDFC Corporate Banking Gateway</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Basic Pay</th><th>HRA</th><th>PF (12%)</th><th>TDS Tax</th><th>Net Disbursed</th><th>Status</th><th style="text-align:right;">Actions</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="8" style="text-align:center;padding:36px 16px;color:#94a3b8;">No payroll records found</td></tr>') + '</tbody>',
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
    window.location.hash = '#payroll';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#payroll') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-payroll-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-payroll-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenvePayroll = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'payroll') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#payroll') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#payroll') setTimeout(open, 150);
  }
})();
