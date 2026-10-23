/* =====================================================================
   Zenve BI — All Employees Dashboard
   Sidebar Subcategory: Employees & HR > All Employees
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;
  var employees = [
    { id: 'EMP-1001', name: 'Dr. Priya Nair', role: 'Chief Veterinary Officer', dept: 'Clinical', loc: 'Koramangala Central', email: 'priya.nair@zenvepet.in', phone: '+91 98450 11001', joined: '2023-01-15', status: 'Active', salary: '₹24,00,000' },
    { id: 'EMP-1002', name: 'Dr. Rajesh Varma', role: 'Lead Veterinary Surgeon', dept: 'Clinical', loc: 'Indiranagar Hub', email: 'rajesh.varma@zenvepet.in', phone: '+91 98450 11002', joined: '2023-03-01', status: 'Active', salary: '₹21,50,000' },
    { id: 'EMP-1003', name: 'Sneha Kulkarni', role: 'Head of Central Pharmacy', dept: 'Pharmacy', loc: 'Whitefield Annex', email: 'sneha.kulkarni@zenvepet.in', phone: '+91 98450 11003', joined: '2023-04-10', status: 'Active', salary: '₹16,80,000' },
    { id: 'EMP-1004', name: 'Vikramaditya Rao', role: 'Director of Engineering & AI', dept: 'Technology', loc: 'Bellandur Tech Park', email: 'vikram.rao@zenvepet.in', phone: '+91 98450 11004', joined: '2023-02-15', status: 'Active', salary: '₹34,00,000' },
    { id: 'EMP-1005', name: 'Ananya Sen', role: 'Lead Talent Acquisition & HR', dept: 'HR & People', loc: 'Koramangala HQ', email: 'ananya.sen@zenvepet.in', phone: '+91 98450 11005', joined: '2023-06-20', status: 'Active', salary: '₹14,50,000' },
    { id: 'EMP-1006', name: 'Karthik Subramaniam', role: 'Hyperlocal Fleet Operations Mgr', dept: 'Logistics', loc: 'HSR Layout Node', email: 'karthik.s@zenvepet.in', phone: '+91 98450 11006', joined: '2023-05-12', status: 'Active', salary: '₹13,20,000' },
    { id: 'EMP-1007', name: 'Pooja Hegde', role: 'Senior Veterinary Pathologist', dept: 'Clinical', loc: 'Jayanagar Specialty', email: 'pooja.hegde@zenvepet.in', phone: '+91 98450 11007', joined: '2023-08-01', status: 'Active', salary: '₹15,60,000' },
    { id: 'EMP-1008', name: 'Mohammed Zeeshan', role: 'Lead Customer Experience', dept: 'Customer Delight', loc: 'Support Node Central', email: 'm.zeeshan@zenvepet.in', phone: '+91 98450 11008', joined: '2023-07-15', status: 'Active', salary: '₹12,40,000' },
    { id: 'EMP-1009', name: 'Rahul Deshmukh', role: 'Dark Store Warehouse Supervisor', dept: 'Warehouse', loc: 'Electronic City DC', email: 'rahul.d@zenvepet.in', phone: '+91 98450 11009', joined: '2023-09-01', status: 'On Leave', salary: '₹9,80,000' },
    { id: 'EMP-1010', name: 'Edwin Nambiar', role: 'Junior Clinical Associate', dept: 'Clinical', loc: 'Koramangala Central', email: 'Edwin.n@zenvepet.in', phone: '+91 98450 11010', joined: '2024-01-10', status: 'Active', salary: '₹8,50,000' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render(filter) {
    if (!root) return;
    var list = employees;
    if (filter) {
      filter = filter.toLowerCase();
      list = employees.filter(function (e) {
        return (e.name + ' ' + e.role + ' ' + e.dept + ' ' + e.loc + ' ' + e.id).toLowerCase().indexOf(filter) >= 0;
      });
    }

    var rows = list.map(function (e) {
      var badgeClass = e.status === 'Active' ? 'zhr-badge-success' : e.status === 'On Leave' ? 'zhr-badge-warning' : 'zhr-badge-info';
      return [
        '<tr>',
        '  <td>',
        '    <div style="font-weight:600;color:#f8fafc;">' + e.name + '</div>',
        '    <div style="font-size:11px;color:#94a3b8;">' + e.role + ' · <span style="font-family:monospace;">' + e.id + '</span></div>',
        '  </td>',
        '  <td><span class="zhr-badge zhr-badge-info">' + e.dept + '</span></td>',
        '  <td>' + e.loc + '</td>',
        '  <td>' + e.email + '<br/><small style="color:#64748b;">' + e.phone + '</small></td>',
        '  <td style="font-family:monospace;">' + e.joined + '</td>',
        '  <td><span class="zhr-badge ' + badgeClass + '">● ' + e.status + '</span></td>',
        '  <td style="text-align:right;"><button class="zhr-btn" style="height:26px;font-size:11px;" onclick="alert(\'Employee Profile: ' + e.name + '\\nRole: ' + e.role + '\\nDepartment: ' + e.dept + '\\nCTC: ' + e.salary + '\');">View 360°</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>👥</span> All Employees Master Directory</h1>',
      '    <div class="zhr-sub">Centralized workforce database across all hospital branches, dark stores, and logistics nodes</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <button class="zhr-btn zhr-btn-primary" id="zhr-add-emp-btn">➕ Add Employee</button>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Total Roster</div><div class="zhr-card-value">10 Staff</div><div class="zhr-card-sub">Core roster tracked</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Active on Duty</div><div class="zhr-card-value">9 Staff</div><div class="zhr-card-sub">90% operational coverage</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">On Approved Leave</div><div class="zhr-card-value">1 Staff</div><div class="zhr-card-sub">Approved casual leave</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Probation / Training</div><div class="zhr-card-value">1 Staff</div><div class="zhr-card-sub">Edwin Nambiar (Q4)</div></div>',
      '  </div>',
      '  <div class="zhr-card" style="padding:12px 18px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">',
      '    <input type="text" id="zhr-search-input" placeholder="Search by name, role, department, location, ID..." style="flex:1;max-width:450px;padding:8px 14px;border-radius:7px;border:1px solid rgba(255,255,255,0.12);background:rgba(0,0,0,0.3);color:#fff;font-size:12px;outline:none;" />',
      '    <span style="font-size:11px;color:#94a3b8;">Showing ' + list.length + ' entries</span>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <table class="zhr-table">',
      '      <thead>',
      '        <tr><th>Employee Name</th><th>Department</th><th>Location</th><th>Contact Info</th><th>Joined Date</th><th>Status</th><th style="text-align:right;">Actions</th></tr>',
      '      </thead>',
      '      <tbody>' + rows + '</tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');


    var addBtn = root.querySelector('#zhr-add-emp-btn');
    if (addBtn) addBtn.onclick = function () {
      var name = prompt('Enter new employee full name:');
      if (name) {
        employees.unshift({
          id: 'EMP-' + Math.floor(1000 + Math.random() * 9000),
          name: name,
          role: 'Staff Member',
          dept: 'Clinical',
          loc: 'Bengaluru Flagship',
          email: name.toLowerCase().replace(/ /g, '.') + '@zenve.in',
          phone: '+91 98000 00000',
          joined: 'Today',
          status: 'Active',
          salary: '₹85,000/mo'
        });
        render();
      }
    };

    var searchInput = root.querySelector('#zhr-search-input');
    if (searchInput) {
      searchInput.oninput = function () {
        render(searchInput.value);
        var inputNow = root.querySelector('#zhr-search-input');
        if (inputNow) {
          inputNow.focus();
          inputNow.value = searchInput.value;
        }
      };
    }
  }

  function open() {
    closeOthers();
    init();
    render();
    root.classList.add('zpanel-open');
    isOpen = true;
    window.location.hash = '#all-employees';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#all-employees') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-all-employees-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-all-employees-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveAllEmployees = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'all employees') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#all-employees') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#all-employees') setTimeout(open, 150);
  }
})();