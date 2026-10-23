/* =====================================================================
   Zenve BI — Human Resources Executive Control Center
   Sidebar: Employees & HR > HR Dashboard
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var root = null;
  var S = {
    open: false,
    tab: 'overview',
    deptFilter: 'ALL',
    searchQuery: '',
    toastTimeout: null
  };

  /* ── 13 Modules matching Employees & HR Suite ─────────────────────── */
  var MODULES = [
    { id: 'overview', label: 'Executive Overview', icon: '📊', hash: '#hr-dashboard' },
    { id: 'directory', label: 'All Employees', icon: '👥', hash: '#all-employees' },
    { id: 'departments', label: 'Departments', icon: '🏢', hash: '#departments' },
    { id: 'performance', label: 'Employee Performance', icon: '⭐', hash: '#employee-performance' },
    { id: 'targets', label: 'Employee Targets', icon: '🎯', hash: '#employee-targets' },
    { id: 'productivity', label: 'Employee Productivity', icon: '📈', hash: '#employee-productivity' },
    { id: 'attendance', label: 'Attendance', icon: '⏰', hash: '#attendance' },
    { id: 'leaves', label: 'Leave Management', icon: '🏖️', hash: '#leave-management' },
    { id: 'payroll', label: 'Payroll', icon: '💵', hash: '#payroll' },
    { id: 'salary-cost', label: 'Salary Cost', icon: '💰', hash: '#salary-cost' },
    { id: 'recruitment', label: 'Recruitment', icon: '📢', hash: '#recruitment' },
    { id: 'onboarding', label: 'Onboarding', icon: '🚀', hash: '#onboarding' },
    { id: 'expenses', label: 'Employee Expenses', icon: '🧾', hash: '#employee-expenses' }
  ];

  /* ── Datasets ─────────────────────────────────────────────────────── */
  var DEPARTMENTS = [
    { name: 'Clinical Services', count: 64, lead: 'Dr. Priya Nair', budget: '₹52,40,000', attendance: '98.5%', vacancies: 3, color: '#3b82f6' },
    { name: 'Pharmacy & Therapeutics', count: 26, lead: 'Sneha Kulkarni', budget: '₹19,40,000', attendance: '99.1%', vacancies: 1, color: '#10b981' },
    { name: 'Hyperlocal Logistics', count: 48, lead: 'Karthik Subramaniam', budget: '₹21,80,000', attendance: '97.4%', vacancies: 2, color: '#f59e0b' },
    { name: 'Dark Store Fulfillment', count: 20, lead: 'Rahul Deshmukh', budget: '₹12,60,000', attendance: '96.8%', vacancies: 1, color: '#6366f1' },
    { name: 'Technology & AI Core', count: 22, lead: 'Vikramaditya Rao', budget: '₹28,60,000', attendance: '99.4%', vacancies: 2, color: '#ec4899' },
    { name: 'Customer Delight', count: 18, lead: 'Mohammed Zeeshan', budget: '₹8,50,000', attendance: '98.0%', vacancies: 1, color: '#14b8a6' },
    { name: 'Diagnostics & Pathology', count: 12, lead: 'Pooja Hegde', budget: '₹9,80,000', attendance: '99.2%', vacancies: 1, color: '#8b5cf6' },
    { name: 'People, Culture & HR', count: 8, lead: 'Ananya Sen', budget: '₹5,40,000', attendance: '100%', vacancies: 0, color: '#f43f5e' },
    { name: 'Emergency & Critical ICU', count: 14, lead: 'Dr. Rajesh Varma', budget: '₹15,20,000', attendance: '98.8%', vacancies: 2, color: '#ef4444' },
    { name: 'Finance & Compliance', count: 6, lead: 'Suresh Gopalan', budget: '₹4,90,000', attendance: '99.5%', vacancies: 0, color: '#06b6d4' }
  ];

  var EMPLOYEES = [
    { id: 'EMP-1001', name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', dept: 'Clinical', loc: 'Koramangala Central', email: 'priya.nair@zenvepet.in', phone: '+91 98450 11001', joined: '2023-01-15', status: 'Active', rating: '4.95 ★', salary: '₹24,00,000' },
    { id: 'EMP-1002', name: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', dept: 'Clinical', loc: 'Indiranagar Hub', email: 'rajesh.varma@zenvepet.in', phone: '+91 98450 11002', joined: '2023-03-01', status: 'Active', rating: '4.92 ★', salary: '₹21,50,000' },
    { id: 'EMP-1003', name: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', dept: 'Pharmacy', loc: 'Whitefield Annex', email: 'sneha.kulkarni@zenvepet.in', phone: '+91 98450 11003', joined: '2023-04-10', status: 'Active', rating: '4.88 ★', salary: '₹16,80,000' },
    { id: 'EMP-1004', name: 'Vikramaditya Rao', role: 'Director of Engineering & AI', dept: 'Technology', loc: 'Bellandur Tech Park', email: 'vikram.rao@zenvepet.in', phone: '+91 98450 11004', joined: '2023-02-15', status: 'Active', rating: '4.98 ★', salary: '₹34,00,000' },
    { id: 'EMP-1005', name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', dept: 'Customer Delight', loc: 'Koramangala HQ', email: 'ananya.sen@zenvepet.in', phone: '+91 98450 11005', joined: '2023-06-20', status: 'Active', rating: '4.85 ★', salary: '₹14,50,000' },
    { id: 'EMP-1006', name: 'Karthik Subramaniam', role: 'Hyperlocal Fleet Operations Mgr', dept: 'Logistics', loc: 'HSR Layout Node', email: 'karthik.s@zenvepet.in', phone: '+91 98450 11006', joined: '2023-05-12', status: 'Active', rating: '4.90 ★', salary: '₹13,20,000' },
    { id: 'EMP-1007', name: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', dept: 'Clinical', loc: 'Jayanagar Specialty', email: 'pooja.hegde@zenvepet.in', phone: '+91 98450 11007', joined: '2023-08-01', status: 'Active', rating: '4.89 ★', salary: '₹15,60,000' },
    { id: 'EMP-1008', name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', dept: 'Customer Delight', loc: 'Support Node Central', email: 'm.zeeshan@zenvepet.in', phone: '+91 98450 11008', joined: '2023-07-15', status: 'Active', rating: '4.93 ★', salary: '₹12,40,000' },
    { id: 'EMP-1009', name: 'Rahul Deshmukh', role: 'Dark Store Warehouse Supervisor', dept: 'Warehouse', loc: 'Electronic City DC', email: 'rahul.d@zenvepet.in', phone: '+91 98450 11009', joined: '2023-09-01', status: 'On Leave', rating: '4.82 ★', salary: '₹9,80,000' },
    { id: 'EMP-1010', name: 'Edwin Nambiar', role: 'Junior Clinical Associate', dept: 'Clinical', loc: 'Koramangala Central', email: 'Edwin.n@zenvepet.in', phone: '+91 98450 11010', joined: '2024-01-10', status: 'Active', rating: '4.80 ★', salary: '₹8,50,000' }
  ];

  var LEAVE_REQUESTS = [
    { id: 'LV-2026-101', name: 'Rahul Deshmukh', role: 'Dark Store Warehouse Supervisor', type: 'Annual Leave', dates: '12 Oct - 15 Oct 2026', reason: 'Family wedding ceremony', bal: '14 Days Left', status: 'Pending' },
    { id: 'LV-2026-102', name: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', type: 'Conference Leave', dates: '22 Oct - 24 Oct 2026', reason: 'Indian Veterinary Congress Mumbai', bal: '8 Days Left', status: 'Approved' },
    { id: 'LV-2026-103', name: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', type: 'Casual Leave', dates: '19 Oct 2026 (1 Day)', reason: 'Personal dental appointment', bal: '11 Days Left', status: 'Pending' },
    { id: 'LV-2026-104', name: 'Karthik Subramaniam', role: 'Hyperlocal Fleet Operations Mgr', type: 'Sick Leave', dates: '08 Oct - 09 Oct 2026', reason: 'Viral fever recuperation', bal: '10 Days Left', status: 'Approved' },
    { id: 'LV-2026-105', name: 'Edwin Nambiar', role: 'Junior Clinical Associate', type: 'Casual Leave', dates: '28 Oct 2026 (1 Day)', reason: 'Family event', bal: '12 Days Left', status: 'Pending' },
    { id: 'LV-2026-106', name: 'Vikramaditya Rao', role: 'Director of Engineering & AI', type: 'Paternity Leave', dates: '01 Nov - 14 Nov 2026', reason: 'Childbirth support', bal: '15 Days Left', status: 'Approved' },
    { id: 'LV-2026-107', name: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', type: 'Annual Leave', dates: '26 Oct - 30 Oct 2026', reason: 'Diwali festive vacation', bal: '9 Days Left', status: 'Pending' },
    { id: 'LV-2026-108', name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', type: 'Compensatory Off', dates: '16 Oct 2026 (1 Day)', reason: 'Overtime worked during weekend camp', bal: '3 Days Left', status: 'Approved' },
    { id: 'LV-2026-109', name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', type: 'Conference Leave', dates: '05 Nov - 07 Nov 2026', reason: 'World Small Animal Vet Association (WSAVA)', bal: '16 Days Left', status: 'Pending' },
    { id: 'LV-2026-110', name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', type: 'Casual Leave', dates: '23 Oct 2026 (1 Day)', reason: 'Personal errands', bal: '13 Days Left', status: 'Pending' }
  ];

  var OPEN_JOBS = [
    { id: 'REQ-2026-081', title: 'Consultant Veterinary Surgeon', dept: 'Clinical Care', loc: 'Whitefield Hub', openings: 2, applicants: 28, interview: 4, priority: 'Urgent' },
    { id: 'REQ-2026-082', title: 'Critical Care ICU Veterinarian', dept: 'Clinical Care', loc: 'Koramangala Central', openings: 2, applicants: 19, interview: 3, priority: 'Urgent' },
    { id: 'REQ-2026-083', title: 'Senior Compounding Pharmacist', dept: 'Pharmacy', loc: 'Whitefield Central', openings: 1, applicants: 14, interview: 2, priority: 'High' },
    { id: 'REQ-2026-084', title: 'Lead AI Computer Vision Engineer', dept: 'Technology & AI', loc: 'Bellandur Tech Park', openings: 2, applicants: 42, interview: 5, priority: 'High' },
    { id: 'REQ-2026-085', title: 'Veterinary Pathologist (Histology)', dept: 'Diagnostics', loc: 'Jayanagar Lab', openings: 1, applicants: 11, interview: 2, priority: 'Normal' },
    { id: 'REQ-2026-086', title: 'Hyperlocal EV Dispatch Supervisor', dept: 'Logistics', loc: 'HSR Layout Node', openings: 2, applicants: 31, interview: 4, priority: 'Urgent' },
    { id: 'REQ-2026-087', title: 'Dark Store Shift Lead', dept: 'Warehouse', loc: 'Electronic City DC', openings: 1, applicants: 16, interview: 2, priority: 'Normal' },
    { id: 'REQ-2026-088', title: 'Customer Experience Escalation Lead', dept: 'Customer Delight', loc: 'Support Node', openings: 1, applicants: 22, interview: 3, priority: 'Normal' },
    { id: 'REQ-2026-089', title: 'Senior Talent Acquisition Specialist', dept: 'People & HR', loc: 'Koramangala HQ', openings: 1, applicants: 25, interview: 3, priority: 'Normal' },
    { id: 'REQ-2026-090', title: 'Emergency Trauma Nursing Associate', dept: 'Clinical Care', loc: 'Indiranagar Hub', openings: 2, applicants: 17, interview: 2, priority: 'Urgent' }
  ];

  var EXPENSES = [
    { id: 'EXP-2026-501', name: 'Dr. Priya Nair', dept: 'Clinical', category: 'Medical Consumables', amount: '₹14,500', date: '2026-10-10', status: 'Approved' },
    { id: 'EXP-2026-502', name: 'Dr. Rajesh Varma', dept: 'Clinical', category: 'Travel & Flights', amount: '₹18,450', date: '2026-10-09', status: 'Approved' },
    { id: 'EXP-2026-503', name: 'Karthik Subramaniam', dept: 'Logistics', category: 'Fuel & EV Charging', amount: '₹8,650', date: '2026-10-11', status: 'Pending' },
    { id: 'EXP-2026-504', name: 'Sneha Kulkarni', dept: 'Pharmacy', category: 'Medical Consumables', amount: '₹22,800', date: '2026-10-08', status: 'Approved' },
    { id: 'EXP-2026-505', name: 'Vikramaditya Rao', dept: 'Technology', category: 'Software Subscriptions', amount: '₹84,200', date: '2026-10-05', status: 'Approved' },
    { id: 'EXP-2026-506', name: 'Ananya Sen', dept: 'HR & People', category: 'Meals & Offsite', amount: '₹3,450', date: '2026-10-07', status: 'Approved' },
    { id: 'EXP-2026-507', name: 'Pooja Hegde', dept: 'Diagnostics', category: 'Medical Consumables', amount: '₹36,700', date: '2026-10-12', status: 'Pending' },
    { id: 'EXP-2026-508', name: 'Mohammed Zeeshan', dept: 'Customer Delight', category: 'Software Subscriptions', amount: '₹16,500', date: '2026-10-04', status: 'Approved' },
    { id: 'EXP-2026-509', name: 'Rahul Deshmukh', dept: 'Warehouse', category: 'Travel & Conveyance', amount: '₹2,600', date: '2026-10-11', status: 'Pending' },
    { id: 'EXP-2026-510', name: 'Edwin Nambiar', dept: 'Clinical', category: 'Meals & Catering', amount: '₹4,250', date: '2026-10-06', status: 'Pending' }
  ];

  function showToast(msg) {
    var el = document.getElementById('zhr-toast');
    if (el) el.remove();
    if (S.toastTimeout) clearTimeout(S.toastTimeout);

    el = document.createElement('div');
    el.id = 'zhr-toast';
    el.innerHTML = '<span>⚡</span> <span>' + msg + '</span>';
    document.body.appendChild(el);

    S.toastTimeout = setTimeout(function () {
      if (el && el.parentNode) el.remove();
    }, 2800);
  }

  function closeOthers() {
    document.querySelectorAll('.zpanel-root, #zset-root, #zod-root, #zsd-root, #zph-root, #zch-root, #zalt-root, #zrep-root, #zsh-root').forEach(function (p) {
      p.classList.remove('zpanel-open');
      p.classList.remove('zset-open');
      p.classList.remove('zod-open');
      p.classList.remove('zsd-open');
      p.classList.remove('zph-open');
      p.classList.remove('zch-open');
      p.classList.remove('zalt-open');
      p.classList.remove('zrep-open');
      p.classList.remove('zsh-open');
    });
    if (window.ZenveSettingsDashboard && window.ZenveSettingsDashboard.close) {
      try { window.ZenveSettingsDashboard.close(); } catch (err) { }
    }
  }

  /* ── Tab Helpers ──────────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = (hash.startsWith('#') ? hash : '#' + hash).toLowerCase().trim();
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].hash === clean || clean === '#' + MODULES[i].id) {
        return MODULES[i].id;
      }
    }
    if (clean === '#hr-dashboard' || clean === '#hr' || clean === '#human-resources') return 'overview';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var t = text.trim().toLowerCase();
    if (t === 'hr dashboard' || t === 'hr' || t === 'human resources') return 'overview';
    if (t === 'all employees' || t === 'employees' || t === 'staff directory') return 'directory';
    if (t === 'departments' || t === 'org structure') return 'departments';
    if (t === 'employee performance' || t === 'performance') return 'performance';
    if (t === 'employee targets' || t === 'targets') return 'targets';
    if (t === 'employee productivity' || t === 'productivity') return 'productivity';
    if (t === 'attendance' || t === 'biometric attendance') return 'attendance';
    if (t === 'leave management' || t === 'leaves') return 'leaves';
    if (t === 'payroll' || t === 'ctc') return 'payroll';
    if (t === 'salary cost' || t === 'salary') return 'salary-cost';
    if (t === 'recruitment' || t === 'talent acquisition' || t === 'jobs') return 'recruitment';
    if (t === 'onboarding') return 'onboarding';
    if (t === 'employee expenses' || t === 'expenses') return 'expenses';
    return null;
  }

  /* ── Shell Renderer ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;

    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];

    // Build chip navigation
    var chipsHtml = MODULES.map(function (m) {
      var isActive = S.tab === m.id;
      var count = '';
      if (m.id === 'directory') count = '<span class="zhr-chip-count">' + EMPLOYEES.length + '</span>';
      else if (m.id === 'leaves') count = '<span class="zhr-chip-count">' + LEAVE_REQUESTS.length + '</span>';
      else if (m.id === 'recruitment') count = '<span class="zhr-chip-count">' + OPEN_JOBS.length + '</span>';

      return [
        '<button type="button" class="zhr-chip ' + (isActive ? 'active' : '') + '" data-tab="' + m.id + '">',
        '  <span>' + m.icon + '</span>',
        '  <span>' + m.label + '</span>',
        count,
        '</button>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<header class="zhr-header">',
      '  <div class="zhr-header-left">',
      '    <div class="zhr-brand-badge">🧑‍💼</div>',
      '    <div class="zhr-title-group">',
      '      <div class="zhr-title-row">',
      '        <h1 class="zhr-main-title">HR Dashboard</h1>',
      '        <span class="zhr-env-pill">PRODUCTION • ACTIVE</span>',
      '      </div>',
      '      <div class="zhr-breadcrumbs">',
      '        <span>Zenve System</span>',
      '        <span>/</span>',
      '        <span>Employees &amp; HR</span>',
      '        <span>/</span>',
      '        <span class="active">' + curMod.label + '</span>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="zhr-header-actions">',
      '    <button type="button" class="zhr-btn zhr-btn-primary" id="zhr-add-btn">',
      '      <span>➕</span> Onboard Staff',
      '    </button>',
      '    <button type="button" class="zhr-btn zhr-btn-secondary" id="zhr-sync-btn">',
      '      <span>🔄</span> Sync HRIS',
      '    </button>',
      '  </div>',
      '</header>',
      '<div class="zhr-chip-bar">' + chipsHtml + '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-section-header">',
      '    <h2 class="zhr-section-title">' + curMod.icon + ' ' + curMod.label + '</h2>',
      '    <p class="zhr-section-desc">Real-time people operations, headcount governance, payroll allocation and talent tracking across Zenve clinics &amp; hubs.</p>',
      '  </div>',
      '  <div id="zhr-tab-container"></div>',
      '</div>'
    ].join('');

    renderTabContent();
    wireEvents();
  }

  function renderTabContent() {
    var container = root.querySelector('#zhr-tab-container');
    if (!container) return;

    if (S.tab === 'overview') container.innerHTML = renderOverviewTab();
    else if (S.tab === 'directory') container.innerHTML = renderDirectoryTab();
    else if (S.tab === 'departments') container.innerHTML = renderDepartmentsTab();
    else if (S.tab === 'performance') container.innerHTML = renderPerformanceTab();
    else if (S.tab === 'targets') container.innerHTML = renderTargetsTab();
    else if (S.tab === 'productivity') container.innerHTML = renderProductivityTab();
    else if (S.tab === 'attendance') container.innerHTML = renderAttendanceTab();
    else if (S.tab === 'leaves') container.innerHTML = renderLeavesTab();
    else if (S.tab === 'payroll') container.innerHTML = renderPayrollTab();
    else if (S.tab === 'salary-cost') container.innerHTML = renderSalaryCostTab();
    else if (S.tab === 'recruitment') container.innerHTML = renderRecruitmentTab();
    else if (S.tab === 'onboarding') container.innerHTML = renderOnboardingTab();
    else if (S.tab === 'expenses') container.innerHTML = renderExpensesTab();
    else container.innerHTML = renderOverviewTab();

    wireTabSpecificEvents();
  }

  /* ── Tab 1: Executive Overview ────────────────────────────────────── */
  function renderOverviewTab() {
    var deptBars = DEPARTMENTS.map(function (d) {
      var pct = Math.round((d.count / 208) * 100);
      return [
        '<div style="margin-bottom:12px;">',
        '  <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">',
        '    <span style="font-weight:600;color:#0f172a;">' + d.name + '</span>',
        '    <span style="color:#64748b;font-family:monospace;">' + d.count + ' staff · ' + pct + '% (' + d.budget + ')</span>',
        '  </div>',
        '  <div style="height:6px;background:#e2e8f0;border-radius:99px;overflow:hidden;">',
        '    <div style="width:' + pct + '%;height:100%;background:' + d.color + ';border-radius:99px;"></div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    var leaveRows = LEAVE_REQUESTS.map(function (l) {
      var actions = l.status === 'Pending'
        ? '<button type="button" class="zhr-btn zhr-btn-primary" style="height:26px;font-size:11px;padding:0 10px;" onclick="ZenveHRDashboard.approveLeave(\'' + l.id + '\');">Approve</button> ' +
        '<button type="button" class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;padding:0 10px;color:#dc2626;" onclick="ZenveHRDashboard.rejectLeave(\'' + l.id + '\');">Reject</button>'
        : '<span class="zhr-pill ' + (l.status === 'Approved' ? 'zhr-pill-success' : 'zhr-pill-danger') + '">' + l.status + '</span>';

      return [
        '<tr>',
        '  <td><strong>' + l.name + '</strong><br/><small style="color:#64748b;">' + l.role + '</small></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + l.type + '</span></td>',
        '  <td>' + l.dates + '<br/><small style="color:#64748b;">' + l.reason + '</small></td>',
        '  <td>' + l.bal + '</td>',
        '  <td style="text-align:right;">' + actions + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-kpi-grid">',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>Active Workforce</span><span>👥</span></div><div class="zhr-kpi-value">208 Staff</div><div class="zhr-kpi-sub">+14 net additions this quarter</div></div>',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>Monthly Payroll</span><span>💵</span></div><div class="zhr-kpi-value">₹1.48 Cr</div><div class="zhr-kpi-sub">94.2% budget allocation</div></div>',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>Retention Rate</span><span>🤝</span></div><div class="zhr-kpi-value">96.4%</div><div class="zhr-kpi-sub">+3.8% YoY healthcare gain</div></div>',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>eNPS Pulse Score</span><span>❤️</span></div><div class="zhr-kpi-value">+72 eNPS</div><div class="zhr-kpi-sub">Staff morale top-decile</div></div>',
      '  <div class="zhr-kpi-card"><div class="zhr-kpi-label"><span>Open Requisitions</span><span>📢</span></div><div class="zhr-kpi-value">10 Roles</div><div class="zhr-kpi-sub">18 in interview stage</div></div>',
      '</div>',

      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">',
      '  <div class="zhr-card" style="margin-bottom:0;">',
      '    <div class="zhr-card-head">',
      '      <h3 class="zhr-card-title">🏢 Department Headcount &amp; Budget</h3>',
      '      <span class="zhr-pill zhr-pill-info">10 Divisions</span>',
      '    </div>',
      '    <div>' + (deptBars || '<div style="padding:24px 16px;text-align:center;color:#94a3b8;font-size:12px;">No department records found</div>') + '</div>',
      '  </div>',
      '  <div class="zhr-card" style="margin-bottom:0;">',
      '    <div class="zhr-card-head">',
      '      <h3 class="zhr-card-title">⚡ Quick HR Actions</h3>',
      '      <span class="zhr-pill zhr-pill-success">HRIS Live</span>',
      '    </div>',
      '    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '      <button class="zhr-btn zhr-btn-secondary" style="height:48px;justify-content:center;" onclick="ZenveHRDashboard.switchTab(\'directory\');">👥 Master Directory</button>',
      '      <button class="zhr-btn zhr-btn-secondary" style="height:48px;justify-content:center;" onclick="ZenveHRDashboard.switchTab(\'attendance\');">⏰ Biometric Logs</button>',
      '      <button class="zhr-btn zhr-btn-secondary" style="height:48px;justify-content:center;" onclick="ZenveHRDashboard.switchTab(\'payroll\');">💵 Run Payroll</button>',
      '      <button class="zhr-btn zhr-btn-secondary" style="height:48px;justify-content:center;" onclick="ZenveHRDashboard.switchTab(\'recruitment\');">📢 Post New Role</button>',
      '    </div>',
      '    <div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:12px;color:#475569;">',
      '      <strong>🏥 Clinical Staff Availability:</strong> 98.2% coverage today. 14 active surgeons across clinics.',
      '    </div>',
      '  </div>',
      '</div>',

      '<div class="zhr-card">',
      '  <div class="zhr-card-head">',
      '    <h3 class="zhr-card-title">🏖️ Pending Leave Authorizations</h3>',
      '    <button class="zhr-btn zhr-btn-secondary" onclick="ZenveHRDashboard.switchTab(\'leaves\');">View All Leaves →</button>',
      '  </div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Type</th><th>Dates / Reason</th><th>Balance</th><th style="text-align:right;">Decision</th></tr></thead>',
      '      <tbody>' + (leaveRows || '<tr><td colspan="5" style="text-align:center;padding:36px 16px;color:#94a3b8;">No pending leave authorizations found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 2: All Employees ─────────────────────────────────────────── */
  function renderDirectoryTab() {
    var filtered = EMPLOYEES.filter(function (e) {
      var matchQ = (e.name + ' ' + e.role + ' ' + e.dept + ' ' + e.loc + ' ' + e.id).toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0;
      var matchD = S.deptFilter === 'ALL' || e.dept === S.deptFilter;
      return matchQ && matchD;
    });

    var rows = filtered.map(function (e) {
      var badgeClass = e.status === 'Active' ? 'zhr-pill-success' : e.status === 'On Leave' ? 'zhr-pill-warning' : 'zhr-pill-info';
      return [
        '<tr>',
        '  <td><strong>' + e.name + '</strong><br/><small style="color:#64748b;">' + e.role + ' · <code style="font-size:11px;">' + e.id + '</code></small></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + e.dept + '</span></td>',
        '  <td>' + e.loc + '</td>',
        '  <td>' + e.email + '<br/><small style="color:#64748b;">' + e.phone + '</small></td>',
        '  <td>' + e.joined + '</td>',
        '  <td><span class="zhr-pill ' + badgeClass + '">' + e.status + '</span></td>',
        '  <td><strong>' + e.rating + '</strong></td>',
        '  <td style="text-align:right;"><button class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;" onclick="ZenveHRDashboard.viewStaff(\'' + e.id + '\');">View 360°</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-filter-row">',
      '    <input class="zhr-search-input" id="zhr-dir-search" placeholder="🔍 Search staff by name, role, ID, or clinic..." value="' + S.searchQuery + '">',
      '    <div style="display:flex;gap:10px;">',
      '      <select class="zhr-select" id="zhr-dir-dept">',
      '        <option value="ALL"' + (S.deptFilter === 'ALL' ? ' selected' : '') + '>All Departments</option>',
      '        <option value="Clinical"' + (S.deptFilter === 'Clinical' ? ' selected' : '') + '>Clinical Services</option>',
      '        <option value="Pharmacy"' + (S.deptFilter === 'Pharmacy' ? ' selected' : '') + '>Pharmacy</option>',
      '        <option value="Logistics"' + (S.deptFilter === 'Logistics' ? ' selected' : '') + '>Logistics</option>',
      '        <option value="Warehouse"' + (S.deptFilter === 'Warehouse' ? ' selected' : '') + '>Warehouse</option>',
      '        <option value="Technology"' + (S.deptFilter === 'Technology' ? ' selected' : '') + '>Technology</option>',
      '        <option value="Customer Delight"' + (S.deptFilter === 'Customer Delight' ? ' selected' : '') + '>Customer Delight</option>',
      '      </select>',
      '      <button class="zhr-btn zhr-btn-primary" onclick="ZenveHRDashboard.showOnboardModal();">➕ New Staff</button>',
      '    </div>',
      '  </div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Location</th><th>Contact</th><th>Joined</th><th>Status</th><th>Rating</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;">No staff members matched your query.</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 3: Departments ───────────────────────────────────────────── */
  function renderDepartmentsTab() {
    var cards = DEPARTMENTS.map(function (d) {
      return [
        '<div class="zhr-card" style="margin-bottom:0;">',
        '  <div class="zhr-card-head">',
        '    <h3 class="zhr-card-title"><span style="color:' + d.color + ';">●</span> ' + d.name + '</h3>',
        '    <span class="zhr-pill zhr-pill-info">' + d.count + ' Staff</span>',
        '  </div>',
        '  <div style="font-size:13px;color:#475569;margin-bottom:12px;">',
        '    <div><strong>Department Lead:</strong> ' + d.lead + '</div>',
        '    <div><strong>Monthly Budget:</strong> ' + d.budget + '</div>',
        '    <div><strong>Attendance Rate:</strong> <span style="color:#16a34a;font-weight:600;">' + d.attendance + '</span></div>',
        '    <div><strong>Open Vacancies:</strong> <span style="color:#2563eb;font-weight:600;">' + d.vacancies + ' Open Roles</span></div>',
        '  </div>',
        '  <button class="zhr-btn zhr-btn-secondary" style="width:100%;justify-content:center;" onclick="ZenveHRDashboard.filterDept(\'' + d.name.split(' ')[0] + '\');">View Department Staff</button>',
        '</div>'
      ].join('');
    }).join('');

    return '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:20px;">' + (cards || '<div class="zhr-card" style="padding:36px;text-align:center;color:#94a3b8;grid-column:1 / -1;">No department records found</div>') + '</div>';
  }

  /* ── Tab 4: Performance ───────────────────────────────────────────── */
  function renderPerformanceTab() {
    var perfData = [
      { name: 'Dr. Priya Nair', dept: 'Clinical Care', role: 'Chief Veterinary Officer', okrs: '98.5% (Exceeded)', rating: '4.95 ★', status: 'Promoted to L7 Partner' },
      { name: 'Dr. Rajesh Varma', dept: 'Clinical Care', role: 'Lead Veterinary Surgeon', okrs: '96.2% (Exceeded)', rating: '4.92 ★', status: 'Eligible for Performance Bonus' },
      { name: 'Sneha Kulkarni', dept: 'Pharmacy', role: 'Head of Central Pharmacy', okrs: '94.8% (Achieved)', rating: '4.88 ★', status: 'Annual CTC Increment +15%' },
      { name: 'Vikramaditya Rao', dept: 'Technology & AI', role: 'Director of Engineering', okrs: '99.1% (Exceeded)', rating: '4.98 ★', status: 'ESOP Refresh Approved' },
      { name: 'Ananya Sen', dept: 'People & HR', role: 'Lead Talent Acquisition', okrs: '92.4% (Achieved)', rating: '4.85 ★', status: 'Standard Increment Tier' },
      { name: 'Karthik Subramaniam', dept: 'Logistics', role: 'Fleet Operations Mgr', okrs: '95.0% (Achieved)', rating: '4.90 ★', status: 'Retention Incentive Allocated' },
      { name: 'Pooja Hegde', dept: 'Clinical Care', role: 'Senior Pathologist', okrs: '93.7% (Achieved)', rating: '4.89 ★', status: 'Performance Bonus Confirmed' },
      { name: 'Mohammed Zeeshan', dept: 'Customer Delight', role: 'Lead Customer Exp.', okrs: '96.8% (Exceeded)', rating: '4.93 ★', status: 'Promotion to Lead Associate' },
      { name: 'Rahul Deshmukh', dept: 'Warehouse', role: 'Dark Store Supervisor', okrs: '88.5% (On Track)', rating: '4.82 ★', status: 'Review in Q4' },
      { name: 'Edwin Nambiar', dept: 'Clinical Care', role: 'Junior Clinical Assoc.', okrs: '91.2% (Achieved)', rating: '4.80 ★', status: 'Probation Confirmed' }
    ];

    var rows = perfData.map(function (p) {
      return [
        '<tr>',
        '  <td><strong>' + p.name + '</strong></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + p.dept + '</span></td>',
        '  <td>' + p.role + '</td>',
        '  <td><strong style="color:#10b981;">' + p.okrs + '</strong></td>',
        '  <td>' + p.rating + '</td>',
        '  <td><span class="zhr-pill zhr-pill-success">' + p.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">⭐ Employee Performance Scorecards (Q3)</h3><span class="zhr-pill zhr-pill-info">10 Evaluated</span></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Role</th><th>OKRs Achieved</th><th>Client / Patient Rating</th><th>Appraisal Readiness</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 5: Targets ───────────────────────────────────────────────── */
  function renderTargetsTab() {
    var targets = [
      { div: 'Clinical Services', metric: '600 Specialized Surgeries / mo', current: '574 Surgeries', pacing: '95.7%', status: 'On Track' },
      { div: 'Emergency & ICU', metric: '24/7 Critical Trauma Intake (< 5 min triage)', current: '4.2 min avg triage', pacing: '100%', status: 'Exceeded' },
      { div: 'Pharmacy & Therapeutics', metric: '45,000 Prescriptions Dispatched', current: '43,890 Dispatches', pacing: '97.5%', status: 'On Track' },
      { div: 'Hyperlocal Logistics', metric: '98.5% Deliveries < 45 Mins', current: '98.8% Delivered', pacing: '100.3%', status: 'Exceeded' },
      { div: 'Dark Store Fulfillment', metric: '99.5% Inventory Pick Accuracy', current: '99.4% Accuracy', pacing: '99.9%', status: 'On Track' },
      { div: 'Diagnostics & Pathology', metric: '10,000 Blood & PCR Panels', current: '9,640 Panels', pacing: '96.4%', status: 'On Track' },
      { div: 'Technology & AI Core', metric: '99.95% App & Telehealth Uptime', current: '99.98% Uptime', pacing: '100%', status: 'Exceeded' },
      { div: 'Customer Delight', metric: 'CSAT Rating >= 4.90 / 5.00', current: '4.92 CSAT', pacing: '100%', status: 'Exceeded' },
      { div: 'Talent Acquisition & HR', metric: 'Time-to-Hire <= 21 Calendar Days', current: '17.4 Days Avg', pacing: '100%', status: 'Exceeded' },
      { div: 'Corporate Finance', metric: '100% Tax / PF / ESI Compliance', current: '100% Compliant', pacing: '100%', status: 'Exceeded' }
    ];

    var rows = targets.map(function (t) {
      return [
        '<tr>',
        '  <td><strong>' + t.div + '</strong></td>',
        '  <td>' + t.metric + '</td>',
        '  <td><strong>' + t.current + '</strong></td>',
        '  <td><span style="font-family:monospace;font-weight:700;color:#10b981;">' + t.pacing + '</span></td>',
        '  <td><span class="zhr-pill ' + (t.status === 'Exceeded' ? 'zhr-pill-success' : 'zhr-pill-info') + '">' + t.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">🎯 Monthly Division Targets &amp; KPI Milestones</h3><span class="zhr-pill zhr-pill-info">10 Division Targets</span></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Division</th><th>Target Metric</th><th>Current Achievement</th><th>Pacing</th><th>Status</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 6: Productivity ─────────────────────────────────────────── */
  function renderProductivityTab() {
    var prodUnits = [
      { unit: 'Koramangala Central Clinic', lead: 'Dr. Priya Nair', metric: 'Consultation Velocity', output: '16.4 Consults / Vet / day', eff: '98.5%' },
      { unit: 'Indiranagar Hub Clinic', lead: 'Dr. Rajesh Varma', metric: 'Surgical Procedures', output: '4.2 Surgeries / day', eff: '97.2%' },
      { unit: 'Whitefield Central Pharmacy', lead: 'Sneha Kulkarni', metric: 'Rx Compounding & Dispense', output: '184 Rxs / Pharmacist / day', eff: '99.6%' },
      { unit: 'Bellandur AI Tech Pod', lead: 'Vikramaditya Rao', metric: 'Sprint Velocity Points', output: '68 Story Pts / Sprint', eff: '98.0%' },
      { unit: 'HSR Hyperlocal Node', lead: 'Karthik Subramaniam', metric: 'Fleet Deliveries / Rider', output: '31.2 Drops / Shift', eff: '96.8%' },
      { unit: 'Electronic City DC', lead: 'Rahul Deshmukh', metric: 'Fulfillment Pick Rate', output: '210 Items / Hour', eff: '97.5%' },
      { unit: 'Jayanagar Specialty Lab', lead: 'Pooja Hegde', metric: 'Sample Turnaround Time', output: '24 Min Avg Turnaround', eff: '99.1%' },
      { unit: 'Customer Delight Cell', lead: 'Mohammed Zeeshan', metric: 'First Contact Resolution', output: '94.2% FCR', eff: '98.4%' },
      { unit: 'Emergency Critical ICU', lead: 'Dr. Rajesh Varma', metric: 'ICU Patient Bed Pacing', output: '92% Bed Turnover', eff: '99.0%' },
      { unit: 'People Operations Cell', lead: 'Ananya Sen', metric: 'Onboarding Velocity', output: '4.8 Days Offer-to-Join', eff: '100%' }
    ];

    var rows = prodUnits.map(function (u) {
      return [
        '<tr>',
        '  <td><strong>' + u.unit + '</strong><br/><small style="color:#64748b;">Lead: ' + u.lead + '</small></td>',
        '  <td>' + u.metric + '</td>',
        '  <td><strong style="color:#0f172a;">' + u.output + '</strong></td>',
        '  <td><span style="font-family:monospace;font-weight:700;color:#10b981;">' + u.eff + '</span></td>',
        '  <td><span class="zhr-pill zhr-pill-success">High Velocity</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">📈 Staff Productivity &amp; Output Indices</h3></div>',
      '  <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;margin-bottom:20px;">',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Avg Consults / Vet</div><div class="zhr-kpi-value">14.2 / day</div><div class="zhr-kpi-sub">+18% vs industry benchmark</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Rx Accuracy Rate</div><div class="zhr-kpi-value">99.8%</div><div class="zhr-kpi-sub">Zero compounding errors</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Deliveries / Rider</div><div class="zhr-kpi-value">28.6 / day</div><div class="zhr-kpi-sub">&lt; 38 min SLA adherence</div></div>',
      '  </div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Operational Unit</th><th>Key Benchmark</th><th>Output Pacing</th><th>Efficiency</th><th>Status</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 7: Attendance ────────────────────────────────────────────── */
  function renderAttendanceTab() {
    var logs = [
      { name: 'Dr. Priya Nair', dept: 'Clinical Care', shift: '08:00 - 17:00 (General)', punch: '07:54 AM', status: 'FaceID Verified' },
      { name: 'Dr. Rajesh Varma', dept: 'Clinical Care', shift: '09:00 - 18:00 (Surgical)', punch: '08:48 AM', status: 'FaceID Verified' },
      { name: 'Sneha Kulkarni', dept: 'Pharmacy', shift: '08:30 - 17:30 (Morning)', punch: '08:22 AM', status: 'Biometric Palm' },
      { name: 'Vikramaditya Rao', dept: 'Technology & AI', shift: '10:00 - 19:00 (Flexible)', punch: '09:50 AM', status: 'Geofence App' },
      { name: 'Ananya Sen', dept: 'People & HR', shift: '09:30 - 18:30 (HQ)', punch: '09:15 AM', status: 'FaceID Verified' },
      { name: 'Karthik Subramaniam', dept: 'Logistics', shift: '07:00 - 16:00 (Early)', punch: '06:45 AM', status: 'RFID Terminal' },
      { name: 'Pooja Hegde', dept: 'Diagnostics', shift: '08:00 - 17:00 (Lab A)', punch: '07:52 AM', status: 'Biometric Palm' },
      { name: 'Mohammed Zeeshan', dept: 'Customer Delight', shift: '09:00 - 18:00 (Support)', punch: '08:55 AM', status: 'Geofence App' },
      { name: 'Rahul Deshmukh', dept: 'Warehouse', shift: '06:00 - 15:00 (DC Shift)', punch: '-- (On Leave)', status: 'Approved Leave' },
      { name: 'Edwin Nambiar', dept: 'Clinical Care', shift: '08:30 - 17:30 (OPD)', punch: '08:25 AM', status: 'FaceID Verified' }
    ];

    var rows = logs.map(function (l) {
      return [
        '<tr>',
        '  <td><strong>' + l.name + '</strong></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + l.dept + '</span></td>',
        '  <td>' + l.shift + '</td>',
        '  <td><strong style="font-family:monospace;color:#0f172a;">' + l.punch + '</strong></td>',
        '  <td><span class="zhr-pill ' + (l.status.includes('Verified') || l.status.includes('Palm') || l.status.includes('App') ? 'zhr-pill-success' : 'zhr-pill-warning') + '">' + l.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">⏰ Live Biometric Attendance Monitoring</h3><span class="zhr-pill zhr-pill-info">98.1% Today Present</span></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Shift</th><th>Punch-In Time</th><th>Biometric Status</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 8: Leaves ────────────────────────────────────────────────── */
  function renderLeavesTab() {
    var leaveRows = LEAVE_REQUESTS.map(function (l) {
      var actions = l.status === 'Pending'
        ? '<button type="button" class="zhr-btn zhr-btn-primary" style="height:26px;font-size:11px;padding:0 10px;" onclick="ZenveHRDashboard.approveLeave(\'' + l.id + '\');">Approve</button> ' +
        '<button type="button" class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;padding:0 10px;color:#dc2626;" onclick="ZenveHRDashboard.rejectLeave(\'' + l.id + '\');">Reject</button>'
        : '<span class="zhr-pill ' + (l.status === 'Approved' ? 'zhr-pill-success' : 'zhr-pill-danger') + '">' + l.status + '</span>';

      return [
        '<tr>',
        '  <td><strong>' + l.name + '</strong><br/><small style="color:#64748b;">' + l.role + '</small></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + l.type + '</span></td>',
        '  <td>' + l.dates + '<br/><small style="color:#64748b;">' + l.reason + '</small></td>',
        '  <td>' + l.bal + '</td>',
        '  <td style="text-align:right;">' + actions + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">🏖️ Leave Applications &amp; Approvals</h3></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Type</th><th>Dates / Reason</th><th>Balance</th><th style="text-align:right;">Decision</th></tr></thead>',
      '      <tbody>' + (leaveRows || '<tr><td colspan="5" style="text-align:center;padding:36px 16px;color:#94a3b8;">No pending leave authorizations found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 9: Payroll ───────────────────────────────────────────────── */
  function renderPayrollTab() {
    var payrollData = [
      { name: 'Dr. Priya Nair', dept: 'Clinical Care', gross: '₹2,00,000', ded: '₹28,400', net: '₹1,71,600', status: 'Processed' },
      { name: 'Dr. Rajesh Varma', dept: 'Clinical Care', gross: '₹1,79,166', ded: '₹24,800', net: '₹1,54,366', status: 'Processed' },
      { name: 'Sneha Kulkarni', dept: 'Pharmacy', gross: '₹1,40,000', ded: '₹18,200', net: '₹1,21,800', status: 'Processed' },
      { name: 'Vikramaditya Rao', dept: 'Technology & AI', gross: '₹2,83,333', ded: '₹42,500', net: '₹2,40,833', status: 'Processed' },
      { name: 'Ananya Sen', dept: 'People & HR', gross: '₹1,20,833', ded: '₹14,900', net: '₹1,05,933', status: 'Processed' },
      { name: 'Karthik Subramaniam', dept: 'Logistics', gross: '₹1,10,000', ded: '₹12,800', net: '₹97,200', status: 'Processed' },
      { name: 'Pooja Hegde', dept: 'Diagnostics', gross: '₹1,30,000', ded: '₹16,400', net: '₹1,13,600', status: 'Processed' },
      { name: 'Mohammed Zeeshan', dept: 'Customer Delight', gross: '₹1,03,333', ded: '₹11,600', net: '₹91,733', status: 'Processed' },
      { name: 'Rahul Deshmukh', dept: 'Warehouse', gross: '₹81,666', ded: '₹8,900', net: '₹72,766', status: 'Processed' },
      { name: 'Edwin Nambiar', dept: 'Clinical Care', gross: '₹70,833', ded: '₹7,500', net: '₹63,333', status: 'Processed' }
    ];

    var rows = payrollData.map(function (p) {
      return [
        '<tr>',
        '  <td><strong>' + p.name + '</strong></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + p.dept + '</span></td>',
        '  <td>' + p.gross + '</td>',
        '  <td style="color:#ef4444;">' + p.ded + '</td>',
        '  <td><strong style="color:#10b981;">' + p.net + '</strong></td>',
        '  <td><span class="zhr-pill zhr-pill-success">● ' + p.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">💵 Monthly Salary &amp; CTC Disbursement Ledger</h3><button class="zhr-btn zhr-btn-primary" onclick="alert(\'✓ Payroll batch verified for 10 employees. Bank direct transfer file generated.\');">Disburse Payroll</button></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Gross Monthly</th><th>PF &amp; TDS</th><th>Net Payable</th><th>Status</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 10: Salary Cost ──────────────────────────────────── */
  function renderSalaryCostTab() {
    var deptCosts = [
      { dept: 'Clinical Services', headcount: '64 Staff', monthly: '₹52,40,000', annual: '₹6.28 Cr', pct: '35.4%' },
      { dept: 'Technology & AI Core', headcount: '22 Staff', monthly: '₹28,60,000', annual: '₹3.43 Cr', pct: '19.3%' },
      { dept: 'Hyperlocal Logistics', headcount: '48 Staff', monthly: '₹21,80,000', annual: '₹2.61 Cr', pct: '14.7%' },
      { dept: 'Pharmacy & Therapeutics', headcount: '26 Staff', monthly: '₹19,40,000', annual: '₹2.32 Cr', pct: '13.1%' },
      { dept: 'Emergency & Critical ICU', headcount: '14 Staff', monthly: '₹15,20,000', annual: '₹1.82 Cr', pct: '10.3%' },
      { dept: 'Dark Store Fulfillment', headcount: '20 Staff', monthly: '₹12,60,000', annual: '₹1.51 Cr', pct: '8.5%' },
      { dept: 'Diagnostics & Pathology', headcount: '12 Staff', monthly: '₹9,80,000', annual: '₹1.17 Cr', pct: '6.6%' },
      { dept: 'Customer Delight', headcount: '18 Staff', monthly: '₹8,50,000', annual: '₹1.02 Cr', pct: '5.7%' },
      { dept: 'People, Culture & HR', headcount: '8 Staff', monthly: '₹5,40,000', annual: '₹0.64 Cr', pct: '3.6%' },
      { dept: 'Finance & Compliance', headcount: '6 Staff', monthly: '₹4,90,000', annual: '₹0.58 Cr', pct: '3.3%' }
    ];

    var rows = deptCosts.map(function (c) {
      return [
        '<tr>',
        '  <td><strong>' + c.dept + '</strong></td>',
        '  <td>' + c.headcount + '</td>',
        '  <td><strong>' + c.monthly + '</strong></td>',
        '  <td>' + c.annual + '</td>',
        '  <td><span style="font-family:monospace;font-weight:700;color:#10b981;">' + c.pct + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">💰 Organizational Salary Cost Breakdown</h3><span class="zhr-pill zhr-pill-info">Annualized ₹17.76 Cr</span></div>',
      '  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:16px;margin-bottom:20px;">',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Clinical Dept CTC</div><div class="zhr-kpi-value">₹52.4L / mo</div><div class="zhr-kpi-sub">64 Staff · 35.4% of total</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Tech &amp; AI CTC</div><div class="zhr-kpi-value">₹28.6L / mo</div><div class="zhr-kpi-sub">22 Staff · 19.3% of total</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Logistics Fleet CTC</div><div class="zhr-kpi-value">₹21.8L / mo</div><div class="zhr-kpi-sub">48 Staff · 14.7% of total</div></div>',
      '    <div class="zhr-kpi-card"><div class="zhr-kpi-label">Pharmacy Operations</div><div class="zhr-kpi-value">₹19.4L / mo</div><div class="zhr-kpi-sub">26 Staff · 13.1% of total</div></div>',
      '  </div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Department</th><th>Headcount</th><th>Monthly CTC</th><th>Annualized CTC</th><th>Budget Share</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 11: Recruitment ──────────────────────────────────────────── */
  function renderRecruitmentTab() {
    var jobRows = OPEN_JOBS.map(function (j) {
      return [
        '<tr>',
        '  <td><strong>' + j.title + '</strong><br/><small style="color:#64748b;">' + j.id + ' · ' + j.loc + '</small></td>',
        '  <td><span class="zhr-pill zhr-pill-info">' + j.dept + '</span></td>',
        '  <td>' + j.openings + ' Vacancies</td>',
        '  <td>' + j.applicants + ' Applicants (' + j.interview + ' in final interview)</td>',
        '  <td><span class="zhr-pill ' + (j.priority === 'Urgent' ? 'zhr-pill-danger' : 'zhr-pill-warning') + '">' + j.priority + '</span></td>',
        '  <td style="text-align:right;"><button class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;" onclick="alert(\'Candidate pipeline for ' + j.title + ' opened.\');">View Candidates</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">📢 Talent Acquisition &amp; Active Job Postings</h3><button class="zhr-btn zhr-btn-primary" onclick="ZenveHRDashboard.showNewReqModal();">➕ Post Job Requisition</button></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Position Title</th><th>Department</th><th>Openings</th><th>Candidate Pipeline</th><th>Priority</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + (jobRows || '<tr><td colspan="6" style="text-align:center;padding:36px 16px;color:#94a3b8;">No job requisitions found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 12: Onboarding ───────────────────────────────────── */
  function renderOnboardingTab() {
    var onboardingRecruits = [
      { name: 'Dr. Arvind Swaminathan', role: 'Associate Veterinary Surgeon', start: '15 Oct 2026', progress: '90%', it: 'MacBook Pro M3 + iPad', mentor: 'Dr. Priya Nair' },
      { name: 'Pooja Hegde', role: 'Senior Pathologist', start: '01 Oct 2026', progress: '100%', it: 'ThinkPad P16s + Lab Terminal', mentor: 'Dr. Rajesh Varma' },
      { name: 'Edwin Nambiar', role: 'Junior Clinical Associate', start: '06 Oct 2026', progress: '100%', it: 'Dell Latitude 7440', mentor: 'Pooja Hegde' },
      { name: 'Rohan Shenoy', role: 'Emergency Critical Care Vet', start: '18 Oct 2026', progress: '75%', it: 'MacBook Air M3', mentor: 'Dr. Rajesh Varma' },
      { name: 'Ananya Sen', role: 'Lead Talent Acquisition', start: '28 Sep 2026', progress: '100%', it: 'MacBook Air M3', mentor: 'Vikramaditya Rao' },
      { name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', start: '03 Oct 2026', progress: '100%', it: 'MacBook Air M3', mentor: 'Sneha Kulkarni' },
      { name: 'Sumitra Banerjee', role: 'Compounding Pharmacist', start: '20 Oct 2026', progress: '60%', it: 'Dell OptiPlex Pharma Terminal', mentor: 'Sneha Kulkarni' },
      { name: 'Tanmay Joshi', role: 'Full-Stack Telehealth Eng.', start: '22 Oct 2026', progress: '50%', it: 'MacBook Pro M3 Max', mentor: 'Vikramaditya Rao' },
      { name: 'Farooq Abdullah', role: 'Cold-Chain Logistics Exec.', start: '08 Oct 2026', progress: '100%', it: 'Samsung Galaxy Tab Active', mentor: 'Karthik Subramaniam' },
      { name: 'Meera Krishnan', role: 'Feline Behavioral Specialist', start: '25 Oct 2026', progress: '40%', it: 'iPad Air + Apple Pencil', mentor: 'Dr. Priya Nair' }
    ];

    var rows = onboardingRecruits.map(function (o) {
      return [
        '<tr>',
        '  <td><strong>' + o.name + '</strong></td>',
        '  <td>' + o.role + '</td>',
        '  <td>' + o.start + '</td>',
        '  <td><span style="font-family:monospace;font-weight:700;color:#10b981;">' + o.progress + '</span></td>',
        '  <td>' + o.it + '</td>',
        '  <td>🤝 ' + o.mentor + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">🚀 New Joiner Onboarding Pacing</h3><span class="zhr-pill zhr-pill-info">10 Active Recruits</span></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>New Joiner</th><th>Role</th><th>Start Date</th><th>Checklist Progress</th><th>IT Provisioning</th><th>Mentor</th></tr></thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 13: Expenses ─────────────────────────────────────────────── */
  function renderExpensesTab() {
    var rows = EXPENSES.map(function (x) {
      return [
        '<tr>',
        '  <td><strong>' + x.name + '</strong><br/><small style="color:#64748b;">' + x.id + '</small></td>',
        '  <td>' + x.dept + '</td>',
        '  <td>' + x.category + '</td>',
        '  <td><strong>' + x.amount + '</strong></td>',
        '  <td>' + x.date + '</td>',
        '  <td><span class="zhr-pill ' + (x.status === 'Approved' ? 'zhr-pill-success' : 'zhr-pill-warning') + '">' + x.status + '</span></td>',
        '  <td style="text-align:right;"><button class="zhr-btn zhr-btn-secondary" style="height:26px;font-size:11px;" onclick="ZenveHRDashboard.approveExpense(\'' + x.id + '\');">' + (x.status === 'Pending' ? 'Approve Claim' : 'View Receipt') + '</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zhr-card">',
      '  <div class="zhr-card-head"><h3 class="zhr-card-title">🧾 Employee Reimbursements &amp; Claims</h3></div>',
      '  <div class="zhr-table-wrap">',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Department</th><th>Category</th><th>Amount</th><th>Date</th><th>Status</th><th style="text-align:right;">Action</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:36px 16px;color:#94a3b8;">No employee expense records found</td></tr>') + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  /* ── Event Listeners ──────────────────────────────────────────────── */
  function wireEvents() {
    // Tab switching
    root.querySelectorAll('.zhr-chip').forEach(function (btn) {
      btn.onclick = function () {
        var t = btn.getAttribute('data-tab');
        switchTab(t);
      };
    });

    // Close button
    var closeBtn = root.querySelector('#zhr-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function () {
        close();
      };
    }

    // Onboard Staff button
    var addBtn = root.querySelector('#zhr-add-btn');
    if (addBtn) {
      addBtn.onclick = function () {
        showOnboardModal();
      };
    }

    // Sync button
    var syncBtn = root.querySelector('#zhr-sync-btn');
    if (syncBtn) {
      syncBtn.onclick = function () {
        syncBtn.innerHTML = '<span>⏳</span> Syncing...';
        setTimeout(function () {
          syncBtn.innerHTML = '<span>✓</span> HRIS Synced';
          showToast('Zenve HRIS master records synced with biometric clocks.');
          setTimeout(function () {
            syncBtn.innerHTML = '<span>🔄</span> Sync HRIS';
          }, 2000);
        }, 800);
      };
    }
  }

  function wireTabSpecificEvents() {
    // Search input in directory
    var searchInp = root.querySelector('#zhr-dir-search');
    if (searchInp) {
      searchInp.oninput = function () {
        S.searchQuery = searchInp.value;
        renderTabContent();
        // Restore focus
        var newInp = root.querySelector('#zhr-dir-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }

    // Department select in directory
    var deptSel = root.querySelector('#zhr-dir-dept');
    if (deptSel) {
      deptSel.onchange = function () {
        S.deptFilter = deptSel.value;
        renderTabContent();
      };
    }
  }

  /* ── Modals & Actions ─────────────────────────────────────────────── */
  function showOnboardModal() {
    var modal = document.createElement('div');
    modal.className = 'zhr-modal-backdrop';
    modal.innerHTML = [
      '<div class="zhr-modal-box">',
      '  <div class="zhr-modal-head">',
      '    <h3>➕ Onboard New Staff Member</h3>',
      '    <button type="button" class="zhr-close-btn" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zhr-modal-body">',
      '    <div class="zhr-form-group"><label class="zhr-label">Full Name</label><input class="zhr-input" id="m-name" placeholder="e.g. Dr. Sunita Sen" required></div>',
      '    <div class="zhr-form-group"><label class="zhr-label">Role / Designation</label><input class="zhr-input" id="m-role" placeholder="e.g. Senior Surgeon" required></div>',
      '    <div class="zhr-form-group"><label class="zhr-label">Department</label><select class="zhr-select" id="m-dept" style="width:100%;"><option value="Clinical">Clinical</option><option value="Pharmacy">Pharmacy</option><option value="Logistics">Logistics</option><option value="Warehouse">Warehouse</option><option value="Technology">Technology</option><option value="Customer Delight">Customer Delight</option></select></div>',
      '    <div class="zhr-form-group"><label class="zhr-label">Facility Location</label><input class="zhr-input" id="m-loc" placeholder="e.g. Bengaluru Flagship" required></div>',
      '  </div>',
      '  <div class="zhr-modal-foot">',
      '    <button type="button" class="zhr-btn zhr-btn-secondary" id="m-cancel">Cancel</button>',
      '    <button type="button" class="zhr-btn zhr-btn-primary" id="m-save">Save Staff</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#m-close').onclick = closeM;
    modal.querySelector('#m-cancel').onclick = closeM;
    modal.querySelector('#m-save').onclick = function () {
      var name = document.getElementById('m-name').value;
      var role = document.getElementById('m-role').value;
      var dept = document.getElementById('m-dept').value;
      var loc = document.getElementById('m-loc').value;
      if (!name || !role) { alert('Please enter staff name and designation.'); return; }

      EMPLOYEES.unshift({
        id: 'EMP-' + (1000 + EMPLOYEES.length + 1),
        name: name,
        role: role,
        dept: dept,
        loc: loc || 'HQ Flagship',
        email: name.toLowerCase().replace(/[^a-z]/g, '.') + '@zenve.in',
        phone: '+91 98000 00000',
        joined: 'Today',
        status: 'Active',
        salary: '₹85,000/mo',
        rating: '5.0★'
      });
      showToast('Staff member ' + name + ' onboarded.');
      closeM();
      S.tab = 'directory';
      render();
    };
  }

  function showNewReqModal() {
    var title = prompt('Enter new position title:');
    if (title) {
      OPEN_JOBS.unshift({
        id: 'REQ-' + Math.floor(100 + Math.random() * 900),
        title: title,
        dept: 'Clinical',
        loc: 'Bengaluru Flagship',
        openings: 1,
        applicants: 0,
        interview: 0,
        priority: 'High'
      });
      showToast('Position "' + title + '" posted to career portal.');
      renderTabContent();
    }
  }

  function viewStaff(id) {
    var s = EMPLOYEES.find(function (e) { return e.id === id; });
    if (!s) return;
    alert('👤 Staff Profile 360°:\n\n' +
      'ID: ' + s.id + '\n' +
      'Name: ' + s.name + '\n' +
      'Role: ' + s.role + '\n' +
      'Department: ' + s.dept + '\n' +
      'Facility: ' + s.loc + '\n' +
      'Contact: ' + s.email + ' | ' + s.phone + '\n' +
      'Joining Date: ' + s.joined + '\n' +
      'Monthly CTC: ' + s.salary + '\n' +
      'Performance Rating: ' + s.rating + '\n' +
      'Status: ' + s.status
    );
  }

  function approveLeave(id) {
    LEAVE_REQUESTS.forEach(function (l) {
      if (l.id === id) l.status = 'Approved';
    });
    showToast('Leave request ' + id + ' approved.');
    renderTabContent();
  }

  function rejectLeave(id) {
    LEAVE_REQUESTS.forEach(function (l) {
      if (l.id === id) l.status = 'Rejected';
    });
    showToast('Leave request ' + id + ' rejected.');
    renderTabContent();
  }

  function approveExpense(id) {
    EXPENSES.forEach(function (x) {
      if (x.id === id) x.status = 'Approved';
    });
    showToast('Expense claim ' + id + ' approved for reimbursement.');
    renderTabContent();
  }

  function filterDept(dept) {
    S.deptFilter = dept;
    switchTab('directory');
  }

  /* ── Navigation & Control ─────────────────────────────────────────── */
  function open(tab) {
    closeOthers();
    init();
    if (tab) S.tab = tab;
    S.open = true;
    render();
    root.classList.add('zpanel-open');
    var targetHash = (MODULES.find(function (m) { return m.id === S.tab; }) || {}).hash || '#hr-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    if (window.location.hash.startsWith('#hr-') || window.location.hash.startsWith('#employee-') || window.location.hash === '#attendance' || window.location.hash === '#departments' || window.location.hash === '#payroll' || window.location.hash === '#recruitment' || window.location.hash === '#onboarding' || window.location.hash === '#all-employees') {
      try { history.pushState(null, '', window.location.pathname + window.location.search); } catch (e) { }
    }
  }

  function switchTab(tab) {
    if (!tab) return;
    S.tab = tab;
    var targetHash = (MODULES.find(function (m) { return m.id === tab; }) || {}).hash || '#hr-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
    render();
  }

  function init() {
    root = document.getElementById('zhr-dashboard-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-dashboard-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  /* ── Interceptor for Sidebar ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent);
      if (tab) {
        if (!t.closest('#zhr-dashboard-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }
    }
  }, true);

  // Keyboard Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) close();
  });

  // Hashchange Listener
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(window.location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && !window.location.hash.startsWith('#hr') && !window.location.hash.startsWith('#employee') && !window.location.hash.startsWith('#all-employees') && !window.location.hash.startsWith('#departments') && !window.location.hash.startsWith('#attendance') && !window.location.hash.startsWith('#payroll') && !window.location.hash.startsWith('#recruitment') && !window.location.hash.startsWith('#onboarding')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenveHRDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    showOnboardModal: showOnboardModal,
    showNewReqModal: showNewReqModal,
    viewStaff: viewStaff,
    approveLeave: approveLeave,
    rejectLeave: rejectLeave,
    approveExpense: approveExpense,
    filterDept: filterDept
  };

  /* ── Boot ─────────────────────────────────────────────────────────── */
  function boot() {
    init();
    var initialTab = tabFromHash(window.location.hash);
    if (initialTab) {
      setTimeout(function () { open(initialTab); }, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();