/* =====================================================================
   Zenve BI — Attendance Dashboard
   Sidebar Subcategory: Employees & HR > Attendance
   ===================================================================== */
(function () {
  'use strict';

  var root = null;
  var isOpen = false;

  var punches = [
    { id: 'EMP-1001', name: 'Dr. Priya Nair', shift: '08:00 - 17:00 (General)', punchIn: '07:54 AM', punchOut: '17:15 PM', loc: 'FaceID · Koramangala Central', ot: '1.2h', status: 'On Time' },
    { id: 'EMP-1002', name: 'Dr. Rajesh Varma', shift: '09:00 - 18:00 (Surgical)', punchIn: '08:48 AM', punchOut: '18:30 PM', loc: 'FaceID · Indiranagar Hub', ot: '1.5h', status: 'On Time' },
    { id: 'EMP-1003', name: 'Sneha Kulkarni', shift: '08:30 - 17:30 (Morning)', punchIn: '08:22 AM', punchOut: '17:40 PM', loc: 'Biometric Palm · Whitefield', ot: '0.8h', status: 'On Time' },
    { id: 'EMP-1004', name: 'Vikramaditya Rao', shift: '10:00 - 19:00 (Flexible)', punchIn: '09:50 AM', punchOut: '19:20 PM', loc: 'Geofence App · Bellandur Tech Park', ot: '0.5h', status: 'On Time' },
    { id: 'EMP-1005', name: 'Ananya Sen', shift: '09:30 - 18:30 (HQ)', punchIn: '09:15 AM', punchOut: '18:45 PM', loc: 'FaceID · Koramangala HQ', ot: '0.2h', status: 'On Time' },
    { id: 'EMP-1006', name: 'Karthik Subramaniam', shift: '07:00 - 16:00 (Early Shift)', punchIn: '06:45 AM', punchOut: '16:30 PM', loc: 'RFID Terminal · HSR Layout', ot: '1.0h', status: 'On Time' },
    { id: 'EMP-1007', name: 'Pooja Hegde', shift: '08:00 - 17:00 (Lab Shift)', punchIn: '07:52 AM', punchOut: '17:10 PM', loc: 'Biometric Palm · Jayanagar Lab', ot: '0.5h', status: 'On Time' },
    { id: 'EMP-1008', name: 'Mohammed Zeeshan', shift: '09:00 - 18:00 (Support)', punchIn: '08:55 AM', punchOut: '18:15 PM', loc: 'Geofence App · Support Node', ot: '0.5h', status: 'On Time' },
    { id: 'EMP-1009', name: 'Rahul Deshmukh', shift: '06:00 - 15:00 (DC Shift)', punchIn: '—', punchOut: '—', loc: 'HR Leave Record · Electronic City', ot: '0.0h', status: 'Approved Leave' },
    { id: 'EMP-1010', name: 'Divya Nambiar', shift: '08:30 - 17:30 (OPD Shift)', punchIn: '08:42 AM', punchOut: '17:35 PM', loc: 'FaceID · Koramangala Central', ot: '0.0h', status: 'Late Mark' }
  ];

  function closeOthers() {
    document.querySelectorAll('.zpanel-root').forEach(function (el) {
      el.classList.remove('zpanel-open');
    });
  }

  function render() {
    if (!root) return;
    var rows = punches.map(function (p) {
      var badgeClass = p.status === 'On Time' ? 'zhr-badge-success' : p.status === 'Late Mark' ? 'zhr-badge-danger' : 'zhr-badge-warning';
      return [
        '<tr>',
        '  <td><div style="font-weight:600;color:#f8fafc;">' + p.name + '</div><div style="font-size:11px;font-family:monospace;color:#94a3b8;">' + p.id + '</div></td>',
        '  <td style="color:#cbd5e1;">' + p.shift + '</td>',
        '  <td style="font-family:monospace;font-weight:600;color:' + (p.punchIn === '—' ? '#64748b' : '#34d399') + ';">' + p.punchIn + '</td>',
        '  <td style="font-family:monospace;color:#94a3b8;">' + p.punchOut + '</td>',
        '  <td style="font-size:11px;color:#94a3b8;">' + p.loc + '</td>',
        '  <td style="font-family:monospace;color:' + (p.ot !== '0.0h' ? '#f59e0b' : '#64748b') + ';">' + p.ot + '</td>',
        '  <td style="text-align:right;"><span class="zhr-badge ' + badgeClass + '">● ' + p.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<div class="zhr-head">',
      '  <div class="zhr-head-left">',
      '    <h1 class="zhr-title"><span>⏰</span> Attendance Telemetry & Shift Roster</h1>',
      '    <div class="zhr-sub">Live biometric terminal clock-in stream, geo-fenced mobile punches, shift rosters, and punctuality monitoring</div>',
      '  </div>',
      '  <div style="display:flex;align-items:center;gap:10px;">',
      '    <span class="zhr-badge zhr-badge-success">● 9 Clocked In Today</span>',
      '  </div>',
      '</div>',
      '<div class="zhr-body">',
      '  <div class="zhr-kpi-grid">',
      '    <div class="zhr-card"><div class="zhr-card-label">Present on Duty</div><div class="zhr-card-value">9 Staff</div><div class="zhr-card-sub">90% daily roster</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Punctuality Rate</div><div class="zhr-card-value">98.2%</div><div class="zhr-card-sub">+1.2% this month</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Late Marks Today</div><div class="zhr-card-value">1 Staff</div><div class="zhr-card-sub">Grace period applied</div></div>',
      '    <div class="zhr-card"><div class="zhr-card-label">Approved Off / Leave</div><div class="zhr-card-value">1 Staff</div><div class="zhr-card-sub">Rahul Deshmukh</div></div>',
      '  </div>',
      '  <div class="zhr-table-container">',
      '    <div class="zhr-table-head">',
      '      <h3 style="margin:0;font-size:14px;font-weight:700;">Live Biometric Punch Ledger</h3>',
      '      <span style="font-size:11px;color:#34d399;font-weight:600;">Hardware Synced: Koramangala, Indiranagar, Bandra, Bhiwandi</span>',
      '    </div>',
      '    <table class="zhr-table">',
      '      <thead><tr><th>Employee</th><th>Assigned Shift</th><th>Punch In</th><th>Punch Out</th><th>Terminal Verification</th><th>Overtime</th><th style="text-align:right;">Status</th></tr></thead>',
      '      <tbody>' + (rows || '<tr><td colspan="7" style="text-align:center;padding:36px 16px;color:#94a3b8;">No clock-in records found</td></tr>') + '</tbody>',
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
    window.location.hash = '#attendance';
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    isOpen = false;
    if (window.location.hash === '#attendance') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  function init() {
    root = document.getElementById('zhr-attendance-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zhr-attendance-root';
      root.className = 'zpanel-root zhr-root';
      document.body.appendChild(root);
    }
  }

  window.ZenveAttendance = { open: open, close: close };

  document.addEventListener('click', function (e) {
    var it = e.target.closest('button, a, li');
    if (it && it.textContent && it.textContent.trim().toLowerCase() === 'attendance') {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      open();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      if (window.location.hash === '#attendance') setTimeout(open, 150);
    });
  } else {
    init();
    if (window.location.hash === '#attendance') setTimeout(open, 150);
  }
})();
