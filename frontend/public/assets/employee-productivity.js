/* =====================================================================
   Zenve BI — Employee Productivity Dashboard
   Sidebar Subcategory: Employees & HR > Employee Productivity
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var teams = [
    { team: 'Koramangala Outpatient Veterinary Care', activeHours: '8.4 hrs/day', tasksDone: '420 Consults/wk', turnaround: '22 Mins', idlePct: '2.8%', efficiency: '98.5%', status: 'Optimal' },
    { team: 'Indiranagar Surgical Theater Unit', activeHours: '8.6 hrs/day', tasksDone: '36 Surgeries/wk', turnaround: '75 Mins', idlePct: '3.1%', efficiency: '97.2%', status: 'Optimal' },
    { team: 'Whitefield Central Compounding Pharmacy', activeHours: '8.2 hrs/day', tasksDone: '1,420 Orders/wk', turnaround: '14 Mins', idlePct: '1.9%', efficiency: '99.6%', status: 'High Velocity' },
    { team: 'Bellandur Core AI & Platform Engineering', activeHours: '8.5 hrs/day', tasksDone: '68 Story Pts/sprint', turnaround: '2.4 Days', idlePct: '2.2%', efficiency: '98.0%', status: 'Optimal' },
    { team: 'HSR Hyperlocal Rider Dispatch Node', activeHours: '8.1 hrs/day', tasksDone: '3,840 Drops/wk', turnaround: '31 Mins', idlePct: '4.2%', efficiency: '96.8%', status: 'Optimal' },
    { team: 'Electronic City Fulfillment Dark Store', activeHours: '8.3 hrs/day', tasksDone: '8,400 Picks/wk', turnaround: '18 Mins', idlePct: '3.5%', efficiency: '97.5%', status: 'Optimal' },
    { team: 'Jayanagar Specialized Diagnostics Lab', activeHours: '8.4 hrs/day', tasksDone: '940 Panels/wk', turnaround: '28 Mins', idlePct: '2.4%', efficiency: '99.1%', status: 'High Velocity' },
    { team: 'Customer Delight Concierge Support', activeHours: '8.0 hrs/day', tasksDone: '1,820 Tickets/wk', turnaround: '4.5 Mins', idlePct: '3.8%', efficiency: '98.4%', status: 'Optimal' },
    { team: 'Emergency 24/7 Critical Trauma Unit', activeHours: '8.8 hrs/day', tasksDone: '85 Admissions/wk', turnaround: '12 Mins', idlePct: '2.1%', efficiency: '99.0%', status: 'High Velocity' },
    { team: 'Talent Acquisition & HR Operations', activeHours: '8.1 hrs/day', tasksDone: '32 Interviews/wk', turnaround: '4.8 Days', idlePct: '4.0%', efficiency: '96.2%', status: 'Optimal' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = teams.map(function (t) {
      return [
        '<tr>',
        '  <td style="font-weight:600;color:#f8fafc;">' + t.team + '</td>',
        '  <td style="font-family:monospace;color:#cbd5e1;">' + t.activeHours + '</td>',
        '  <td style="font-family:monospace;color:#38bdf8;">' + t.tasksDone + '</td>',
        '  <td style="font-family:monospace;color:#94a3b8;">' + t.turnaround + '</td>',
        '  <td style="font-family:monospace;color:#f59e0b;">' + t.idlePct + '</td>',
        '  <td>',
        '    <div style="display:flex;align-items:center;gap:8px;">',
        '      <div style="width:70px;height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;"><div style="width:' + t.efficiency + ';height:100%;background:#10b981;"></div></div>',
        '      <span style="font-family:monospace;font-weight:700;color:#10b981;">' + t.efficiency + '</span>',
        '    </div>',
        '  </td>',
        '  <td style="text-align:right;"><span class="zhr-badge zhr-badge-success">● ' + t.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>⚡</span> Workforce Productivity & Velocity Telemetry</h1>',
      '    <div class="zhr-sub">Active hours utilization, unit handling throughput, clinical consult velocity, and idle capacity tracking</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● 97.8% Org Efficiency</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Active Shift Time</div><div class="zhr-card-value">8.4 hrs/day</div><div class="zhr-card-sub">Top decile utilization</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Efficiency Index</div><div class="zhr-card-value">97.8%</div><div class="zhr-card-sub">+2.4% vs benchmark</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Daily Unit Throughput</div><div class="zhr-card-value">1,280 Units/day</div><div class="zhr-card-sub">Aggregated operations</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Idle Capacity</div><div class="zhr-card-value">3.2%</div><div class="zhr-card-sub">Lowest industry loss</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Functional Unit Throughput Benchmarks</h3>',
      '      <span style="font-size:11px;color:#94a3b8;">Real-time IoT biometric & POS stream</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Operational Unit</th><th>Active Hours / Shift</th><th>Daily Unit Output</th><th>Avg Turnaround</th><th>Idle Capacity</th><th>Efficiency</th><th style="text-align:right;">Status</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:36px 16px;color:#94a3b8;">No operational unit productivity records found</td></tr>') + '</tbody>',
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
    window.location.hash = '#employee-productivity';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#employee-productivity') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-productivity-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-productivity-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveEmployeeProductivity = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'employee productivity') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#employee-productivity') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#employee-productivity') setTimeout(open, 150);
  }
})();