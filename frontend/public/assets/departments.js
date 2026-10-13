/* =====================================================================
   Zenve BI — Departments Dashboard
   Sidebar Subcategory: Employees & HR > Departments
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var departments = [
    { id: 'DEPT-01', name: 'Clinical Services', color: '#3b82f6', staff: 64, desc: 'Primary & specialized veterinary medicine, soft tissue and orthopedic surgery, emergency intensive care.', lead: 'Dr. Priya Nair', budget: '₹52,40,000', openings: 3 },
    { id: 'DEPT-02', name: 'Pharmacy & Therapeutics', color: '#10b981', staff: 26, desc: 'Central veterinary pharmacy, temperature-sensitive cold chain drugs, prescription validation.', lead: 'Sneha Kulkarni', budget: '₹19,40,000', openings: 1 },
    { id: 'DEPT-03', name: 'Hyperlocal Logistics', color: '#f59e0b', staff: 48, desc: '45-minute pet medicine express dispatch fleet, temperature-monitored smart delivery pods.', lead: 'Karthik Subramaniam', budget: '₹21,80,000', openings: 2 },
    { id: 'DEPT-04', name: 'Dark Store Fulfillment', color: '#6366f1', staff: 20, desc: 'Micro-fulfillment centers across Bangalore micro-markets, automated inventory pick and pack.', lead: 'Rahul Deshmukh', budget: '₹12,60,000', openings: 1 },
    { id: 'DEPT-05', name: 'Technology & AI Core', color: '#ec4899', staff: 22, desc: 'Pet electronic health records, AI radiology assistance, telehealth streaming platform.', lead: 'Vikramaditya Rao', budget: '₹28,60,000', openings: 2 },
    { id: 'DEPT-06', name: 'Customer Delight', color: '#14b8a6', staff: 18, desc: '24/7 pet parent support helpline, post-op consultation follow-ups, concierge appointment scheduling.', lead: 'Mohammed Zeeshan', budget: '₹8,50,000', openings: 1 },
    { id: 'DEPT-07', name: 'Diagnostics & Pathology', color: '#8b5cf6', staff: 12, desc: 'In-house diagnostic laboratory, hematology, PCR panels, biochemical assays, cytopathology.', lead: 'Pooja Hegde', budget: '₹9,80,000', openings: 1 },
    { id: 'DEPT-08', name: 'People, Culture & HR', color: '#f43f5e', staff: 8, desc: 'Clinical talent acquisition, veterinarian credential verification, payroll, employee welfare.', lead: 'Ananya Sen', budget: '₹5,40,000', openings: 0 },
    { id: 'DEPT-09', name: 'Emergency & Critical ICU', color: '#ef4444', staff: 14, desc: 'Round-the-clock ventilator support, trauma resuscitation, post-operative oxygen therapy.', lead: 'Dr. Rajesh Varma', budget: '₹15,20,000', openings: 2 },
    { id: 'DEPT-10', name: 'Finance & Compliance', color: '#06b6d4', staff: 6, desc: 'Financial audit, GST invoicing, statutory compliances, vendor payables and CAPEX.', lead: 'Suresh Gopalan', budget: '₹4,90,000', openings: 1 }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var cards = departments.map(function (d) {
      return [
        '<div class="zhr-card" style="display:flex;flex-direction:column;justify-content:space-between;">',
        '  <div>',
        '    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">',
        '      <div>',
        '        <span style="font-size:10px;font-family:monospace;color:' + d.color + ';font-weight:700;">' + d.id + '</span>',
        '        <h3 style="margin:4px 0 0;font-size:16px;font-weight:700;color:#f8fafc;">' + d.name + '</h3>',
        '      </div>',
        '      <span class="zhr-badge" style="background:' + d.color + '22;color:' + d.color + ';">' + d.staff + ' Staff</span>',
        '    </div>',
        '    <p style="font-size:12px;color:#94a3b8;line-height:1.5;margin-bottom:14px;">' + d.desc + '</p>',
        '    <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px;margin-bottom:14px;">',
        '      <div><span style="color:#94a3b8;">Department Head</span><div style="color:#f8fafc;font-weight:600;margin-top:2px;">' + d.lead + '</div></div>',
        '      <div><span style="color:#94a3b8;">Monthly Budget</span><div style="color:#34d399;font-weight:600;font-family:monospace;margin-top:2px;">' + d.budget + '</div></div>',
        '      <div><span style="color:#94a3b8;">Open Roles</span><div style="color:#f59e0b;font-weight:600;margin-top:2px;">' + d.openings + ' Vacancies</div></div>',
        '      <div><span style="color:#94a3b8;">Retention</span><div style="color:' + d.color + ';font-weight:600;margin-top:2px;">97.8%</div></div>',
        '    </div>',
        '  </div>',
        '  <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:10px;display:flex;justify-content:space-between;align-items:center;">',
        '    <span style="font-size:11px;color:#94a3b8;">Roster synced</span>',
        '    <button class="zhr-btn" style="height:26px;font-size:11px;" onclick="alert(\'Department View: ' + d.name + '\\nHead: ' + d.lead + '\\nStaff: ' + d.staff + '\\nMonthly CTC: ' + d.budget + '\');">Department 360°</button>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>🏢</span> Departmental Hierarchy & Capacity</h1>',
      '    <div class="zhr-sub">Operational divisions, divisional leadership, monthly payroll allocation, and team capacity</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● 10 Operational Divisions</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Divisions Operating</div><div class="zhr-card-value">10</div><div class="zhr-card-sub">All active in Bangalore</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Total Monthly Budget</div><div class="zhr-card-value">₹1.77 Cr</div><div class="zhr-card-sub">94.2% budget utilization</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Open Requisitions</div><div class="zhr-card-value">14 Roles</div><div class="zhr-card-sub">Across 8 departments</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Avg Dept Health Score</div><div class="zhr-card-value">98.4%</div><div class="zhr-card-sub">Top decile efficiency</div></div>',
      '  </div>',
      '  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(350px, 1fr));gap:16px;">' + cards + '</div>',
      '</div>'
    ].join('');

  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#departments';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#departments') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-departments-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-departments-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveDepartments = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'departments') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#departments') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#departments') setTimeout(open, 150);
  }
})();