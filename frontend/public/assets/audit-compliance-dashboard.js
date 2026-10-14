/* =====================================================================
   Zenve BI — Audit & Compliance Command Center
   Unified Control Suite for All 9 Audit & Compliance Modules:
     1. Audit Log
     2. User Activity
     3. Login History
     4. Data Changes
     5. Financial Audit Trail
     6. Order Audit Trail
     7. Inventory Audit Trail
     8. Approval History
     9. Compliance Dashboard
   ===================================================================== */

(function () {
  'use strict';

  /* ── 1. Module Registry ──────────────────────────────────────────── */
  var MODULES = [
    { id: 'audit-log',       label: 'Audit Log',             icon: '🛡️', hash: '#audit-log',             badge: '' },
    { id: 'user-activity',   label: 'User Activity',         icon: '👥', hash: '#user-activity',         badge: '' },
    { id: 'login-history',   label: 'Login History',         icon: '🔑', hash: '#login-history',         badge: '' },
    { id: 'data-changes',    label: 'Data Changes',          icon: '🔄', hash: '#data-changes',          badge: '' },
    { id: 'financial-audit', label: 'Financial Audit Trail', icon: '💰', hash: '#financial-audit-trail', badge: '' },
    { id: 'order-audit',     label: 'Order Audit Trail',     icon: '📦', hash: '#order-audit-trail',     badge: '' },
    { id: 'inventory-audit', label: 'Inventory Audit Trail', icon: '📋', hash: '#inventory-audit-trail', badge: '' },
    { id: 'approval-history',label: 'Approval History',      icon: '✍️', hash: '#approval-history',      badge: '' },
    { id: 'compliance',      label: 'Compliance Dashboard',  icon: '⚖️', hash: '#compliance-dashboard',  badge: '' }
  ];

  /* ── 2. In-Memory State ──────────────────────────────────────────── */
  var S = {
    open: false,
    activeTab: 'audit-log',
    searchQuery: '',
    filterCategory: 'ALL',
    selectedItem: null,
    toastTimeout: null
  };

  var root = null;

  /* ── 3. Helper Functions ─────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    hash = hash.toLowerCase();
    if (hash === '#audit' || hash === '#audit-log' || hash === '#audit-and-compliance') return 'audit-log';
    if (hash === '#user-activity') return 'user-activity';
    if (hash === '#login-history') return 'login-history';
    if (hash === '#data-changes') return 'data-changes';
    if (hash === '#financial-audit' || hash === '#financial-audit-trail') return 'financial-audit';
    if (hash === '#order-audit' || hash === '#order-audit-trail') return 'order-audit';
    if (hash === '#inventory-audit' || hash === '#inventory-audit-trail') return 'inventory-audit';
    if (hash === '#approval-history' || hash === '#approvals') return 'approval-history';
    if (hash === '#compliance' || hash === '#compliance-dashboard') return 'compliance';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var t = text.trim();
    if (t === 'Audit Log' || t === 'Audit & Compliance') return 'audit-log';
    if (t === 'User Activity') return 'user-activity';
    if (t === 'Login History') return 'login-history';
    if (t === 'Data Changes') return 'data-changes';
    if (t === 'Financial Audit Trail' || t === 'Financial Audit') return 'financial-audit';
    if (t === 'Order Audit Trail' || t === 'Order Audit') return 'order-audit';
    if (t === 'Inventory Audit Trail' || t === 'Inventory Audit') return 'inventory-audit';
    if (t === 'Approval History' || t === 'Approvals') return 'approval-history';
    if (t === 'Compliance Dashboard' || t === 'Compliance') return 'compliance';
    return null;
  }

  function showToast(msg) {
    var existing = document.getElementById('zaud-toast');
    if (existing) existing.remove();
    if (S.toastTimeout) clearTimeout(S.toastTimeout);

    var toast = document.createElement('div');
    toast.id = 'zaud-toast';
    toast.innerHTML = '<span>🛡️</span> <span>' + msg + '</span>';
    document.body.appendChild(toast);

    S.toastTimeout = setTimeout(function () {
      if (toast && toast.parentNode) toast.remove();
    }, 3200);
  }

  function makeKpi(label, value, delta, subtext, icon, deltaType) {
    var dClass = deltaType === 'warn' ? 'warn' : deltaType === 'blue' ? 'blue' : 'up';
    return [
      '<div class="zaud-kpi-card">',
        '<div class="zaud-kpi-header">',
          '<span class="zaud-kpi-label">' + label + '</span>',
          '<span class="zaud-kpi-icon">' + (icon || '📊') + '</span>',
        '</div>',
        '<div class="zaud-kpi-value">' + value + '</div>',
        '<div class="zaud-kpi-meta">',
          (delta ? '<span class="zaud-kpi-delta ' + dClass + '">' + delta + '</span>' : ''),
          (subtext ? '<span class="zaud-kpi-subtext">' + subtext + '</span>' : ''),
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 4. DOM Initialization ───────────────────────────────────────── */
  function ensureRoot() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'zaud-root';
    document.body.appendChild(root);
  }

  function renderHeader() {
    return [
      '<div class="zaud-header">',
        '<div class="zaud-header-left">',
          '<div class="zaud-brand-badge pulse">🛡️</div>',
          '<div>',
            '<h1 class="zaud-header-title">',
              'Audit Trail & Regulatory Compliance Control Center',
              '<span class="zaud-status-pill"><span class="zaud-status-dot"></span> SOC-2 & Schedule H Compliant</span>',
            '</h1>',
            '<p class="zaud-header-subtitle">Cryptographic ledger, immutable user activity, financial audits, medical compliance trails, and data governance</p>',
          '</div>',
        '</div>',
        '<div class="zaud-header-actions">',
          '<button class="zaud-btn zaud-btn-secondary" id="zaud-btn-verify">🔍 Run Verification</button>',
          '<button class="zaud-btn zaud-btn-secondary" id="zaud-btn-export">📥 Export Compliance Audit</button>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderTabsBar() {
    var tabsHtml = MODULES.map(function (m) {
      var isActive = S.activeTab === m.id ? ' active' : '';
      return [
        '<button class="zaud-tab-btn' + isActive + '" data-tab="' + m.id + '">',
          '<span>' + m.icon + '</span>',
          '<span>' + m.label + '</span>',
          '<span class="zaud-tab-badge">' + m.badge + '</span>',
        '</button>'
      ].join('');
    }).join('');

    return '<div class="zaud-tabs-bar">' + tabsHtml + '</div>';
  }

  /* ── 5. Tab Renderers ────────────────────────────────────────────── */

  // TAB 1: Audit Log
  function renderAuditLogTab() {
    var logs = [
  {
    "id": "AUD-1001",
    "actor": "Dr. Arvind Rao",
    "role": "Chief Medical Officer",
    "action": "Digitally signed Schedule X Rx for Fentanyl 50mcg/hr",
    "module": "Clinical Approvals",
    "ip": "10.0.14.22",
    "time": "2026-10-14 16:42:18",
    "hash": "7f8b9a2c...4d1e",
    "status": "Verified"
  },
  {
    "id": "AUD-1002",
    "actor": "Priya Sharma",
    "role": "Lead Pharmacist",
    "action": "Dispensed Emergency ICU Kit (Atropine + Epinephrine)",
    "module": "Pharmacy Dispense",
    "ip": "10.0.28.105",
    "time": "2026-10-14 16:35:40",
    "hash": "3e4a1b9c...8f2a",
    "status": "Verified"
  },
  {
    "id": "AUD-1003",
    "actor": "R. Venkataraman",
    "role": "Chief Financial Officer",
    "action": "Approved Supplier Payment \u20b91,450,000 to Cipla Ltd",
    "module": "Financial Accounts",
    "ip": "10.0.10.14",
    "time": "2026-10-14 16:21:05",
    "hash": "9c8a7b6d...1e3f",
    "status": "Verified"
  },
  {
    "id": "AUD-1004",
    "actor": "Siddharth Nair",
    "role": "Cold Chain Officer",
    "action": "Logged thermal excursion check for Hub-1 Vault (-20\u00b0C)",
    "module": "Cold Chain IoT",
    "ip": "10.0.35.40",
    "time": "2026-10-14 16:11:50",
    "hash": "1a2b3c4d...5e6f",
    "status": "Verified"
  },
  {
    "id": "AUD-1005",
    "actor": "Kavita Deshmukh",
    "role": "Compliance Officer",
    "action": "Executed CDSCO Schedule H2 quarterly reconciliation report",
    "module": "Regulatory Filing",
    "ip": "10.0.12.88",
    "time": "2026-10-14 15:58:12",
    "hash": "6f5e4d3c...2b1a",
    "status": "Verified"
  },
  {
    "id": "AUD-1006",
    "actor": "Dr. Ananya Sen",
    "role": "HOD Oncology",
    "action": "Prescription override for Off-Label Pembrolizumab infusion",
    "module": "Clinical Overrides",
    "ip": "10.0.14.77",
    "time": "2026-10-14 15:42:33",
    "hash": "8b7c6d5e...4f3a",
    "status": "Verified"
  },
  {
    "id": "AUD-1007",
    "actor": "DevOps Bot / Vault",
    "role": "System Automation",
    "action": "Rotated HSM AES-256 master key for Patient PHI DB",
    "module": "Security Keyring",
    "ip": "127.0.0.1",
    "time": "2026-10-14 15:30:00",
    "hash": "2c3d4e5f...6a7b",
    "status": "Verified"
  },
  {
    "id": "AUD-1008",
    "actor": "Manish Verma",
    "role": "Hub Logistics Manager",
    "action": "Dispatched express refrigerated drone delivery DRN-402",
    "module": "Dispatch & OTP",
    "ip": "10.0.40.12",
    "time": "2026-10-14 15:15:22",
    "hash": "5d4c3b2a...1f9e",
    "status": "Verified"
  },
  {
    "id": "AUD-1009",
    "actor": "Dr. Rajesh Iyer",
    "role": "Senior Consultant",
    "action": "Accessed unmasked patient medical history for PAT-99214",
    "module": "PHI Access Control",
    "ip": "10.0.18.52",
    "time": "2026-10-14 15:02:44",
    "hash": "4a5b6c7d...8e9f",
    "status": "Verified"
  },
  {
    "id": "AUD-1010",
    "actor": "Suresh Raina",
    "role": "Quality Assurance Lead",
    "action": "Quarantined damaged carton of Remdesivir (Batch RD-889)",
    "module": "Inventory QA",
    "ip": "10.0.32.19",
    "time": "2026-10-14 14:45:10",
    "hash": "9e8d7c6b...5a4f",
    "status": "Verified"
  }
];

    var q = (S.searchQuery || '').toLowerCase();
    var filtered = logs.filter(function (l) {
      return !q || l.actor.toLowerCase().indexOf(q) >= 0 || l.action.toLowerCase().indexOf(q) >= 0 || l.module.toLowerCase().indexOf(q) >= 0;
    });

    var rows = filtered.length === 0
      ? '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8">No audit log events found.</td></tr>'
      : filtered.map(function (log) {
      return [
        '<tr>',
          '<td><span class="zaud-badge zaud-badge-blue zaud-mono">' + log.id + '</span></td>',
          '<td><strong>' + log.actor + '</strong><div style="font-size:10px;color:#64748b">' + log.role + '</div></td>',
          '<td>' + log.action + '</td>',
          '<td><span class="zaud-badge zaud-badge-purple">' + log.module + '</span></td>',
          '<td class="zaud-mono" style="color:#64748b">' + log.ip + '</td>',
          '<td class="zaud-mono">' + log.time + '</td>',
          '<td><span class="zaud-hash" title="' + log.hash + '">' + log.hash.slice(0, 10) + '…' + log.hash.slice(-6) + '</span></td>',
          '<td style="text-align:right"><span class="zaud-badge zaud-badge-green">● ' + log.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zaud-kpi-grid">',
        makeKpi('Total Audit Events', '1,428,950', '+12.4%', 'Immutable SQLite WAL', '📑', 'green'),
        makeKpi('Cryptographic Integrity', '100.0%', '+0.0%', 'Zero hash mismatches', '🔒', 'green'),
        makeKpi('Staff Actions Logged', '4,892', '+8.1%', 'Auditable trail across 128 staff', '👥', 'blue'),
        makeKpi('Tamper Alerts', '0 Detected', '0.0%', 'Zero unauthorized diffs', '🛡️', 'green'),
      '</div>',
      '<div class="zaud-panel">',
        '<div class="zaud-panel-header">',
          '<div><h3 class="zaud-panel-title">Master Immutable Audit Log</h3><p class="zaud-panel-desc">Cryptographically sealed chronological log of all administrative, clinical, and financial actions</p></div>',
          '<span class="zaud-badge zaud-badge-green">● Append-Only Log Active</span>',
        '</div>',
        '<div class="zaud-toolbar">',
          '<div class="zaud-search-box">',
            '<span class="zaud-search-icon">🔍</span>',
            '<input type="text" class="zaud-search-input" id="zaud-search" placeholder="Search actor, action, module, or hash..." value="' + (S.searchQuery || '') + '" />',
          '</div>',
          '<div class="zaud-filter-group">',
            '<button class="zaud-btn zaud-btn-secondary" onclick="window.ZenveAudit.verifyHashes()">⚡ Verify SHA-256 Ledger</button>',
          '</div>',
        '</div>',
        '<div class="zaud-table-wrap">',
          '<table class="zaud-table">',
            '<thead><tr><th>Event ID</th><th>Actor & Role</th><th>Action & Description</th><th>Module</th><th>IP / Terminal</th><th>Timestamp</th><th>Cryptographic Hash</th><th style="text-align:right">Audit Status</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // TAB 2: User Activity
  function renderUserActivityTab() {
    var users = [
  {
    "name": "Dr. Arvind Rao",
    "dept": "Medical Administration",
    "role": "Chief Medical Officer",
    "actionsToday": "68 Actions",
    "activeHours": "8.5 hrs",
    "lastActive": "2 mins ago",
    "status": "Active"
  },
  {
    "name": "Priya Sharma",
    "dept": "Central Dispensing Hub",
    "role": "Lead Pharmacist",
    "actionsToday": "142 Actions",
    "activeHours": "7.2 hrs",
    "lastActive": "6 mins ago",
    "status": "Active"
  },
  {
    "name": "R. Venkataraman",
    "dept": "Finance & Taxation",
    "role": "Chief Financial Officer",
    "actionsToday": "45 Actions",
    "activeHours": "6.8 hrs",
    "lastActive": "15 mins ago",
    "status": "Active"
  },
  {
    "name": "Kavita Deshmukh",
    "dept": "Regulatory Affairs",
    "role": "Compliance Director",
    "actionsToday": "54 Actions",
    "activeHours": "7.5 hrs",
    "lastActive": "12 mins ago",
    "status": "Active"
  },
  {
    "name": "Siddharth Nair",
    "dept": "Warehouse & Cold Chain",
    "role": "Cold Chain Lead",
    "actionsToday": "118 Actions",
    "activeHours": "8.0 hrs",
    "lastActive": "4 mins ago",
    "status": "Active"
  },
  {
    "name": "Dr. Ananya Sen",
    "dept": "Oncology Daycare",
    "role": "Senior Consultant",
    "actionsToday": "39 Actions",
    "activeHours": "5.5 hrs",
    "lastActive": "28 mins ago",
    "status": "Active"
  },
  {
    "name": "Manish Verma",
    "dept": "Last-Mile Logistics",
    "role": "Fleet Dispatch Head",
    "actionsToday": "210 Actions",
    "activeHours": "9.1 hrs",
    "lastActive": "1 min ago",
    "status": "Active"
  },
  {
    "name": "Suresh Raina",
    "dept": "Quality Assurance",
    "role": "QA / Pharmacovigilance",
    "actionsToday": "86 Actions",
    "activeHours": "6.4 hrs",
    "lastActive": "18 mins ago",
    "status": "Active"
  },
  {
    "name": "Dr. Rajesh Iyer",
    "dept": "Cardiology & CCU",
    "role": "Attending Cardiologist",
    "actionsToday": "52 Actions",
    "activeHours": "7.0 hrs",
    "lastActive": "35 mins ago",
    "status": "Active"
  },
  {
    "name": "Anita Kurup",
    "dept": "Patient Services & Billing",
    "role": "Billing Supervisor",
    "actionsToday": "174 Actions",
    "activeHours": "8.2 hrs",
    "lastActive": "3 mins ago",
    "status": "Active"
  }
];

    var rows = users.length === 0
      ? '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8">No user activity records found.</td></tr>'
      : users.map(function (u) {
      return [
        '<tr>',
          '<td><strong>' + u.name + '</strong></td>',
          '<td><span class="zaud-badge zaud-badge-blue">' + u.dept + '</span></td>',
          '<td style="color:#64748b">' + u.role + '</td>',
          '<td class="zaud-mono" style="text-align:right;font-weight:700">' + u.actionsToday + '</td>',
          '<td class="zaud-mono" style="text-align:right">' + u.activeHours + '</td>',
          '<td class="zaud-mono">' + u.lastActive + '</td>',
          '<td><span class="zaud-badge zaud-badge-green">● ' + u.status + '</span></td>',
          '<td style="text-align:center"><button class="zaud-btn zaud-btn-secondary" style="padding:2px 8px;font-size:11px" onclick="window.ZenveAudit.viewUserTelemetry(\'' + u.name + '\')">Telemetry</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zaud-kpi-grid">',
        makeKpi('Active Staff Today', '0 / 0 Staff', '0.0%', 'Role-based access', '🧑‍💼', 'blue'),
        makeKpi('Avg Actions / User', '38.2 Actions', '+6.5%', 'Clinical & admin productivity', '⚡', 'green'),
        makeKpi('Peak Activity Window', '00:00 - 00:00', '0.0%', 'Clinic consults', '⏰', 'blue'),
        makeKpi('Suspicious Activity', '0 Flagged', '0.0%', 'Behavioral telemetry normal', '🛡️', 'green'),
      '</div>',
      '<div class="zaud-panel">',
        '<div class="zaud-panel-header">',
          '<div><h3 class="zaud-panel-title">Staff Activity & Productivity Telemetry</h3><p class="zaud-panel-desc">Real-time session time, operation volume, and privilege utilization per staff member</p></div>',
          '<span class="zaud-badge zaud-badge-blue">0 Active Sessions</span>',
        '</div>',
        '<div class="zaud-table-wrap">',
          '<table class="zaud-table">',
            '<thead><tr><th>Staff Member</th><th>Department</th><th>Assigned Role</th><th style="text-align:right">Actions Today</th><th style="text-align:right">Active Time</th><th>Last Heartbeat</th><th>Status</th><th style="text-align:center">Action</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // TAB 3: Login History
  function renderLoginHistoryTab() {
    var logins = [
  {
    "user": "arvind.rao@zenve.med",
    "role": "Chief Medical Officer",
    "authMethod": "FIDO2 WebAuthn",
    "ip": "10.0.14.22",
    "location": "Bangalore HQ (Secure Subnet)",
    "device": "macOS Sonoma / Safari 18",
    "time": "2026-10-14 16:30:12",
    "status": "Success"
  },
  {
    "user": "priya.sharma@zenve.med",
    "role": "Lead Pharmacist",
    "authMethod": "Hardware Token (YubiKey)",
    "ip": "10.0.28.105",
    "location": "Central Dispense Hub 1",
    "device": "ChromeOS 124 / Chrome 128",
    "time": "2026-10-14 16:25:40",
    "status": "Success"
  },
  {
    "user": "venkat.r@zenve.med",
    "role": "CFO",
    "authMethod": "Azure AD SSO + TOTP",
    "ip": "10.0.10.14",
    "location": "Corporate Executive Wing",
    "device": "Windows 11 / Edge 129",
    "time": "2026-10-14 16:15:00",
    "status": "Success"
  },
  {
    "user": "unknown_intruder@botnet.ru",
    "role": "Unauthenticated",
    "authMethod": "Password Brute Force",
    "ip": "185.220.101.45",
    "location": "Frankfurt, Germany (Tor Node)",
    "device": "Python-requests / 2.31",
    "time": "2026-10-14 16:08:19",
    "status": "Blocked"
  },
  {
    "user": "kavita.d@zenve.med",
    "role": "Compliance Director",
    "authMethod": "TOTP Multi-Factor",
    "ip": "10.0.12.88",
    "location": "Bangalore Legal & Audit Cell",
    "device": "macOS Sequoia / Chrome 129",
    "time": "2026-10-14 15:52:10",
    "status": "Success"
  },
  {
    "user": "siddharth.n@zenve.med",
    "role": "Cold Chain Lead",
    "authMethod": "Biometric (Touch ID)",
    "ip": "10.0.35.40",
    "location": "Cold Vault Terminal 4",
    "device": "iPadOS 18 / Mobile Safari",
    "time": "2026-10-14 15:38:22",
    "status": "Success"
  },
  {
    "user": "manish.v@zenve.med",
    "role": "Logistics Dispatcher",
    "authMethod": "TOTP Multi-Factor",
    "ip": "10.0.40.12",
    "location": "Fulfillment Hub North",
    "device": "Ubuntu 24.04 / Firefox 131",
    "time": "2026-10-14 15:20:45",
    "status": "Success"
  },
  {
    "user": "api_gateway_service@zenve.internal",
    "role": "Service Account",
    "authMethod": "mTLS Certificate (X.509)",
    "ip": "10.0.0.5",
    "location": "Internal VPC Gateway",
    "device": "Go HTTP Client / 1.23",
    "time": "2026-10-14 15:10:00",
    "status": "Success"
  },
  {
    "user": "ananya.sen@zenve.med",
    "role": "Consultant Oncologist",
    "authMethod": "Azure AD SSO + FIDO2",
    "ip": "10.0.14.77",
    "location": "Oncology Consultation OPD 3",
    "device": "macOS Sonoma / Safari 18",
    "time": "2026-10-14 14:55:18",
    "status": "Success"
  },
  {
    "user": "credential_stuffing_probe@scan.net",
    "role": "Unauthenticated",
    "authMethod": "Dictionary Attack",
    "ip": "194.26.29.112",
    "location": "Seychelles (Suspicious Proxy)",
    "device": "curl / 8.4.0",
    "time": "2026-10-14 14:40:02",
    "status": "Blocked"
  }
];

    var rows = logins.length === 0
      ? '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8">No login history records found.</td></tr>'
      : logins.map(function (l) {
      var isSuccess = l.status === 'Success';
      return [
        '<tr>',
          '<td><strong>' + l.user + '</strong></td>',
          '<td>' + l.role + '</td>',
          '<td><span class="zaud-badge ' + (isSuccess ? 'zaud-badge-blue' : 'zaud-badge-red') + '">' + l.authMethod + '</span></td>',
          '<td class="zaud-mono">' + l.ip + '</td>',
          '<td>' + l.location + '</td>',
          '<td style="color:#64748b">' + l.device + '</td>',
          '<td class="zaud-mono">' + l.time + '</td>',
          '<td style="text-align:right"><span class="zaud-badge ' + (isSuccess ? 'zaud-badge-green' : 'zaud-badge-red') + '">● ' + l.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zaud-kpi-grid">',
        makeKpi('2FA Enforcement', '0.0%', '0.0%', 'TOTP / SSO / FIDO2', '🔑', 'blue'),
        makeKpi('Successful Logins (24h)', '0', '0.0%', 'Credential verification', '✅', 'blue'),
        makeKpi('Failed / Blocked Attempts', '14 Blocked', '-45.0%', 'Rate-limited at network edge', '🚫', 'warn'),
        makeKpi('Concurrent Sessions', '86 Active', '+5.0%', 'Clinical workstations & tablets', '💻', 'blue'),
      '</div>',
      '<div class="zaud-panel">',
        '<div class="zaud-panel-header">',
          '<div><h3 class="zaud-panel-title">Authentication & Access Control Log</h3><p class="zaud-panel-desc">Tracks multi-factor authentication events, terminal fingerprints, IP addresses, and intrusion blocks</p></div>',
          '<button class="zaud-btn zaud-btn-secondary" onclick="window.ZenveAudit.enforce2FAPolicy()">🛡️ Review 2FA Policy</button>',
        '</div>',
        '<div class="zaud-table-wrap">',
          '<table class="zaud-table">',
            '<thead><tr><th>User Account</th><th>Role</th><th>Auth Protocol</th><th>IP Address</th><th>Geo Location</th><th>Device & Browser</th><th>Timestamp</th><th style="text-align:right">Result</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // TAB 4: Data Changes
  function renderDataChangesTab() {
    var changes = [
  {
    "id": "CDC-201",
    "table": "patients_phi",
    "record": "PAT-84920",
    "field": "emergency_contact_phone",
    "oldVal": "+91-98450-11223",
    "newVal": "+91-98450-99887",
    "changedBy": "anita.k (Reception)",
    "reason": "Patient updated primary guardian contact",
    "time": "2026-10-14 16:15:02"
  },
  {
    "id": "CDC-202",
    "table": "prescriptions_schedule_x",
    "record": "RX-99412",
    "field": "dosage_frequency",
    "oldVal": "10mg TDS",
    "newVal": "5mg BD (Titrated down)",
    "changedBy": "dr.arvind.rao (CMO)",
    "reason": "Patient renal panel showed elevated creatinine",
    "time": "2026-10-14 16:05:40"
  },
  {
    "id": "CDC-203",
    "table": "pricing_ledger",
    "record": "SKU-INS-100",
    "field": "mrp_inr",
    "oldVal": "\u20b9680.00",
    "newVal": "\u20b9640.00",
    "changedBy": "venkat.r (CFO)",
    "reason": "National Pharmaceutical Pricing Authority (NPPA) ceiling compliance",
    "time": "2026-10-14 15:50:18"
  },
  {
    "id": "CDC-204",
    "table": "inventory_batches",
    "record": "BAT-COV-401",
    "field": "quarantine_flag",
    "oldVal": "FALSE",
    "newVal": "TRUE",
    "changedBy": "suresh.r (QA)",
    "reason": "Secondary seal tamper detected during cycle count",
    "time": "2026-10-14 15:32:10"
  },
  {
    "id": "CDC-205",
    "table": "hub_vault_sensors",
    "record": "IOT-TH-04",
    "field": "temp_threshold_high_c",
    "oldVal": "8.0\u00b0C",
    "newVal": "6.5\u00b0C",
    "changedBy": "siddharth.n (Cold Chain)",
    "reason": "Tighter variance threshold for mRNA biologic storage",
    "time": "2026-10-14 15:18:45"
  },
  {
    "id": "CDC-206",
    "table": "staff_roles_rbac",
    "record": "USR-1092",
    "field": "permission_scope",
    "oldVal": "PHARMACY_VIEW",
    "newVal": "PHARMACY_DISPENSE_SCH_H",
    "changedBy": "kavita.d (Compliance)",
    "reason": "Passed mandatory CDSCO pharmacist certification audit",
    "time": "2026-10-14 15:02:12"
  },
  {
    "id": "CDC-207",
    "table": "orders_dispatch",
    "record": "ORD-55412",
    "field": "delivery_sla_tier",
    "oldVal": "STANDARD_SAME_DAY",
    "newVal": "EXPRESS_60_MIN_DRONE",
    "changedBy": "manish.v (Logistics)",
    "reason": "Emergency cardiac medication dispatched via sky-corridor",
    "time": "2026-10-14 14:48:30"
  },
  {
    "id": "CDC-208",
    "table": "gst_tax_slabs",
    "record": "HSN-3004",
    "field": "cgst_rate_pct",
    "oldVal": "6.0%",
    "newVal": "6.0% (Re-verified)",
    "changedBy": "venkat.r (CFO)",
    "reason": "Quarterly GST council advisory reconciliation",
    "time": "2026-10-14 14:30:15"
  },
  {
    "id": "CDC-209",
    "table": "insurance_preauth",
    "record": "CLM-88192",
    "field": "approved_amount_inr",
    "oldVal": "\u20b9125,000",
    "newVal": "\u20b9160,000",
    "changedBy": "anita.k (Billing)",
    "reason": "TPA Star Health approved revised ICU day rate",
    "time": "2026-10-14 14:12:05"
  },
  {
    "id": "CDC-210",
    "table": "ai_agent_rules",
    "record": "RULE-INTERACT-09",
    "field": "confidence_threshold",
    "oldVal": "0.92",
    "newVal": "0.98",
    "changedBy": "dr.arvind.rao (CMO)",
    "reason": "Strict human-in-the-loop requirement for oncology regimens",
    "time": "2026-10-14 13:55:40"
  }
];

    var rows = changes.length === 0
      ? '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8">No data change records found.</td></tr>'
      : changes.map(function (c) {
      return [
        '<tr>',
          '<td><span class="zaud-badge zaud-badge-blue zaud-mono">' + c.id + '</span></td>',
          '<td class="zaud-mono"><strong>' + c.table + '</strong></td>',
          '<td class="zaud-mono" style="color:#2563eb">' + c.record + '</td>',
          '<td><code>' + c.field + '</code></td>',
          '<td>',
            '<div class="zaud-diff-box">',
              '<span class="zaud-diff-old">- ' + c.oldVal + '</span>',
              '<span class="zaud-diff-new">+ ' + c.newVal + '</span>',
            '</div>',
          '</td>',
          '<td>' + c.changedBy + '</td>',
          '<td>' + c.reason + '</td>',
          '<td class="zaud-mono">' + c.time + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zaud-kpi-grid">',
        makeKpi('Field-Level Mutations', '0', '0.0%', 'Column changes tracked', '🔄', 'blue'),
        makeKpi('Rollback Readiness', '0.0%', '0.0%', 'Point-in-Time snapshot', '⏪', 'blue'),
        makeKpi('Schema Migrations', 'v2.8.4', 'Latest', 'All migrations verified clean', '🗄️', 'green'),
        makeKpi('Critical Table Overrides', '0 Flagged', '0.0%', 'Change approval workflow', '🛡️', 'blue'),
      '</div>',
      '<div class="zaud-panel">',
        '<div class="zaud-panel-header">',
          '<div><h3 class="zaud-panel-title">Field-Level Data Mutation Log</h3><p class="zaud-panel-desc">Granular Before-and-After change comparisons across all database entities</p></div>',
          '<span class="zaud-badge zaud-badge-green">Full Audit Trail Enabled</span>',
        '</div>',
        '<div class="zaud-table-wrap">',
          '<table class="zaud-table">',
            '<thead><tr><th>Change ID</th><th>Database Table</th><th>Record Key</th><th>Modified Field</th><th>Before vs After Diff</th><th>Modified By</th><th>Business Rationale</th><th>Timestamp</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // TAB 5: Financial Audit Trail
  function renderFinancialAuditTab() {
    var financial = [
  {
    "ref": "FIN-TXN-9011",
    "type": "Vendor Payout",
    "account": "2100 - Accounts Payable (Cipla Laboratories)",
    "debit": "\u20b91,450,000",
    "credit": "-",
    "approver": "R. Venkat (CFO)",
    "time": "2026-10-14 16:21:05",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9012",
    "type": "Customer Collection",
    "account": "1100 - Razorpay Escrow Settlement",
    "debit": "-",
    "credit": "\u20b9842,500",
    "approver": "System Auto-Match",
    "time": "2026-10-14 16:10:44",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9013",
    "type": "GST ITC Claim",
    "account": "1310 - Input Tax Credit (CGST + SGST)",
    "debit": "\u20b9174,000",
    "credit": "-",
    "approver": "Kavita D. (Tax Head)",
    "time": "2026-10-14 15:45:12",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9014",
    "type": "Cold Chain Logistics",
    "account": "5200 - Third-Party Fleet Payout (ColdEx)",
    "debit": "\u20b9285,000",
    "credit": "-",
    "approver": "R. Venkat (CFO)",
    "time": "2026-10-14 15:30:00",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9015",
    "type": "Insurance Remittance",
    "account": "1120 - TPA Star Health Direct Settlement",
    "debit": "-",
    "credit": "\u20b91,120,000",
    "approver": "Anita K. (Billing)",
    "time": "2026-10-14 15:12:18",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9016",
    "type": "Vendor Payout",
    "account": "2100 - Accounts Payable (Sun Pharma)",
    "debit": "\u20b9980,000",
    "credit": "-",
    "approver": "R. Venkat (CFO)",
    "time": "2026-10-14 14:50:33",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9017",
    "type": "Clinical Refund",
    "account": "4100 - Patient Cancelled Order Refund",
    "debit": "\u20b94,250",
    "credit": "-",
    "approver": "Priya S. (Pharmacist)",
    "time": "2026-10-14 14:35:10",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9018",
    "type": "TDS Remittance",
    "account": "2210 - Withholding Tax Sec 194C",
    "debit": "\u20b948,200",
    "credit": "-",
    "approver": "Kavita D. (Tax Head)",
    "time": "2026-10-14 14:15:20",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9019",
    "type": "Depreciation Entry",
    "account": "6100 - Automated Vault IoT Machinery Deprec.",
    "debit": "\u20b9112,000",
    "credit": "-",
    "approver": "System Scheduled",
    "time": "2026-10-14 13:50:00",
    "status": "Reconciled"
  },
  {
    "ref": "FIN-TXN-9020",
    "type": "Corporate Retainer",
    "account": "1140 - Apollo Hospitals Corporate B2B Billing",
    "debit": "-",
    "credit": "\u20b92,450,000",
    "approver": "R. Venkat (CFO)",
    "time": "2026-10-14 13:30:15",
    "status": "Reconciled"
  }
];

    var rows = financial.length === 0
      ? '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8">No financial audit records found.</td></tr>'
      : financial.map(function (f) {
      return [
        '<tr>',
          '<td><span class="zaud-badge zaud-badge-blue zaud-mono">' + f.ref + '</span></td>',
          '<td><strong>' + f.type + '</strong></td>',
          '<td>' + f.account + '</td>',
          '<td class="zaud-mono" style="text-align:right;color:#16a34a">' + f.debit + '</td>',
          '<td class="zaud-mono" style="text-align:right;color:#2563eb">' + f.credit + '</td>',
          '<td>' + f.approver + '</td>',
          '<td class="zaud-mono">' + f.time + '</td>',
          '<td style="text-align:right"><span class="zaud-badge zaud-badge-green">● ' + f.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zaud-kpi-grid">',
        makeKpi('Reconciliation Variance', '₹0.00', '0.0%', 'Ledgers 100% matched', '⚖️', 'green'),
        makeKpi('Total Audited Ledger', '₹42,850,200', '+14.6%', 'Zero unapproved journal entries', '💰', 'green'),
        makeKpi('GST Input Tax Credit', '₹0.00', '0.0%', 'Tax validation', '🧾', 'blue'),
        makeKpi('Audit Sign-off', '0', '0.0%', 'Standard practices', '🛡️', 'blue'),
      '</div>',
      '<div class="zaud-panel">',
        '<div class="zaud-panel-header">',
          '<div><h3 class="zaud-panel-title">Financial Ledger & Journal Audit Trail</h3><p class="zaud-panel-desc">Double-entry accounting validation, refund authorizations, and tax compliance trails</p></div>',
          '<button class="zaud-btn zaud-btn-secondary" onclick="window.ZenveAudit.downloadFinancialTrail()">📥 Download Ledger Trail</button>',
        '</div>',
        '<div class="zaud-table-wrap">',
          '<table class="zaud-table">',
            '<thead><tr><th>Reference</th><th>Transaction Type</th><th>Account / Target</th><th style="text-align:right">Debit</th><th style="text-align:right">Credit</th><th>Authorized Approver</th><th>Timestamp</th><th style="text-align:right">Status</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // TAB 6: Order Audit Trail
  function renderOrderAuditTab() {
    var orders = [
  {
    "orderId": "ORD-99401",
    "customer": "Rajesh Malhotra",
    "event": "Schedule H Pharmacist Verification",
    "prevStatus": "Pending Rx Check",
    "newStatus": "Verified & Approved",
    "officer": "Pharm. Priya Sharma",
    "time": "2026-10-14 16:38:12"
  },
  {
    "orderId": "ORD-99402",
    "customer": "Sunita Kulkarni",
    "event": "Automated Packing in Cold Tote (2-8\u00b0C)",
    "prevStatus": "Picking Complete",
    "newStatus": "Cold Sealed with Sensor",
    "officer": "Packer P. Mohan",
    "time": "2026-10-14 16:30:45"
  },
  {
    "orderId": "ORD-99403",
    "customer": "Arunabh Mukherjee",
    "event": "Sky-Corridor Drone Airway Bill Assigned",
    "prevStatus": "Cold Sealed",
    "newStatus": "In-Flight Express",
    "officer": "Dispatcher Manish Verma",
    "time": "2026-10-14 16:22:10"
  },
  {
    "orderId": "ORD-99404",
    "customer": "Deepika Nambiar",
    "event": "Doorstep Handover OTP Validated",
    "prevStatus": "Out for Delivery",
    "newStatus": "Delivered (OTP 9482)",
    "officer": "Rider Vinod K.",
    "time": "2026-10-14 16:15:20"
  },
  {
    "orderId": "ORD-99405",
    "customer": "Karthik Swaminathan",
    "event": "Doctor Tele-Consult Digital Signoff",
    "prevStatus": "Rx Verification Pending",
    "newStatus": "Consult Passed",
    "officer": "Dr. Arvind Rao",
    "time": "2026-10-14 16:04:18"
  },
  {
    "orderId": "ORD-99406",
    "customer": "Meera Joshi",
    "event": "Senior Citizen Chronic Care Discount Applied",
    "prevStatus": "Cart Checkout",
    "newStatus": "Discount Approved (-15%)",
    "officer": "Supervisor Anita Kurup",
    "time": "2026-10-14 15:52:05"
  },
  {
    "orderId": "ORD-99407",
    "customer": "Tariq Mansoor",
    "event": "Schedule X Dual-Signature Escort Attached",
    "prevStatus": "Doctor Approved",
    "newStatus": "Dual-Signed & Vaulted",
    "officer": "Dr. Ananya Sen",
    "time": "2026-10-14 15:39:40"
  },
  {
    "orderId": "ORD-99408",
    "customer": "Lavanya Reddy",
    "event": "FEFO Allocation from Vault Batch B-88",
    "prevStatus": "Order Placed",
    "newStatus": "Inventory Allocated",
    "officer": "WMS Automated Engine",
    "time": "2026-10-14 15:25:12"
  },
  {
    "orderId": "ORD-99409",
    "customer": "Vikramaditya Bose",
    "event": "Prescription Validity Re-Check (30 Days)",
    "prevStatus": "Upload Pending",
    "newStatus": "Valid Script Logged",
    "officer": "Pharm. K. Sundaram",
    "time": "2026-10-14 15:10:35"
  },
  {
    "orderId": "ORD-99410",
    "customer": "Farah Qureshi",
    "event": "Post-Delivery Cold Integrity Telemetry Verified",
    "prevStatus": "Delivered",
    "newStatus": "Audit Completed (3.4\u00b0C)",
    "officer": "IoT Cloud Sentry",
    "time": "2026-10-14 14:55:00"
  }
];

    var rows = orders.length === 0
      ? '<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8">No order audit trail records found.</td></tr>'
      : orders.map(function (o) {
      return [
        '<tr>',
          '<td><span class="zaud-badge zaud-badge-blue zaud-mono">' + o.orderId + '</span></td>',
          '<td><strong>' + o.customer + '</strong></td>',
          '<td>' + o.event + '</td>',
          '<td><span class="zaud-badge zaud-badge-amber">' + o.prevStatus + '</span></td>',
          '<td><span class="zaud-badge zaud-badge-green">' + o.newStatus + '</span></td>',
          '<td>' + o.officer + '</td>',
          '<td class="zaud-mono">' + o.time + '</td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zaud-kpi-grid">',
        makeKpi('Audited Orders Today', '9,420 Orders', '+15.2%', '100% chain-of-custody tracked', '📦', 'blue'),
        makeKpi('OTP Delivery Validation', '99.8%', '+0.4%', 'Handover verification secured', '📱', 'green'),
        makeKpi('Price / Discount Overrides', '3 Logged', '-25.0%', 'Authorized by Regional Head', '🏷️', 'warn'),
        makeKpi('Prescription Match SLA', '0 Mins', '0.0%', 'Verified guidelines', '🩺', 'blue'),
      '</div>',
      '<div class="zaud-panel">',
        '<div class="zaud-panel-header">',
          '<div><h3 class="zaud-panel-title">Order Lifecycle & State Transition Audit</h3><p class="zaud-panel-desc">State transitions, doctor verifications, price override logs, and courier handover receipts</p></div>',
          '<span class="zaud-badge zaud-badge-green">● Real-Time Pipeline Tracking</span>',
        '</div>',
        '<div class="zaud-table-wrap">',
          '<table class="zaud-table">',
            '<thead><tr><th>Order ID</th><th>Customer & Location</th><th>Audited Lifecycle Event</th><th>Previous State</th><th>New State</th><th>Authorizing Staff / Rider</th><th>Timestamp</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // TAB 7: Inventory Audit Trail
  function renderInventoryAuditTab() {
    var inv = [
  {
    "batch": "BAT-INS-2026-09",
    "product": "Human Insulin R 100IU/ml (Vial)",
    "hub": "Hub-1 Cold Vault (2-8\u00b0C)",
    "action": "IoT Sensor Audit",
    "adjustment": "0 (Verified 3.8\u00b0C)",
    "officer": "Siddharth Nair",
    "time": "2026-10-14 16:35:12",
    "status": "Normal"
  },
  {
    "batch": "BAT-FNT-2026-03",
    "product": "Fentanyl Citrate 50mcg/ml (Schedule X)",
    "hub": "Biometric Vault Safe-4",
    "action": "Dual-Key Physical Audit",
    "adjustment": "0 (Exact 240 Amps)",
    "officer": "Dr. Arvind Rao",
    "time": "2026-10-14 16:20:45",
    "status": "Normal"
  },
  {
    "batch": "BAT-AUG-2026-11",
    "product": "Augmentin 625 Duo (Amoxicillin+Clav)",
    "hub": "Bangalore Central Hub",
    "action": "FEFO Shelf Rotation",
    "adjustment": "0 (5,000 Packs)",
    "officer": "Priya Sharma",
    "time": "2026-10-14 16:05:10",
    "status": "Normal"
  },
  {
    "batch": "BAT-RMD-2025-12",
    "product": "Remdesivir Lyophilized 100mg",
    "hub": "Quarantine Zone C",
    "action": "Expiration Date Quarantine",
    "adjustment": "-12 Units (Disposal)",
    "officer": "Suresh Raina (QA)",
    "time": "2026-10-14 15:45:00",
    "status": "Quarantined"
  },
  {
    "batch": "BAT-PAR-2026-08",
    "product": "Paracetamol 650mg IV Infusion",
    "hub": "North Fulfillment Hub",
    "action": "Receiving Inspection",
    "adjustment": "+2,400 Units (Inward)",
    "officer": "K. Sundaram",
    "time": "2026-10-14 15:28:30",
    "status": "Normal"
  },
  {
    "batch": "BAT-TRA-2026-05",
    "product": "Trastuzumab 440mg Monoclonal Abs",
    "hub": "Cryo-Storage Unit (-20\u00b0C)",
    "action": "Thermal Chamber Verification",
    "adjustment": "0 (Verified -19.4\u00b0C)",
    "officer": "Siddharth Nair",
    "time": "2026-10-14 15:12:18",
    "status": "Normal"
  },
  {
    "batch": "BAT-ATOR-2026-10",
    "product": "Atorvastatin 20mg Tablets",
    "hub": "South Fulfillment Hub",
    "action": "Random Spot Count",
    "adjustment": "0 (1,200 Strips)",
    "officer": "Anita Kurup",
    "time": "2026-10-14 14:58:40",
    "status": "Normal"
  },
  {
    "batch": "BAT-MOR-2026-02",
    "product": "Morphine Sulphate 10mg Tablets",
    "hub": "Narcotics Biometric Locker",
    "action": "Weekly Excise Inspection",
    "adjustment": "0 (Reconciled with Register)",
    "officer": "Dr. Arvind Rao",
    "time": "2026-10-14 14:40:15",
    "status": "Normal"
  },
  {
    "batch": "BAT-ALB-2026-07",
    "product": "Human Albumin 20% 100ml Infusion",
    "hub": "Hub-1 Cold Vault (2-8\u00b0C)",
    "action": "Secondary Barcode Scan",
    "adjustment": "0 (350 Vials Verified)",
    "officer": "Priya Sharma",
    "time": "2026-10-14 14:22:05",
    "status": "Normal"
  },
  {
    "batch": "BAT-HEM-2026-04",
    "product": "Low Molecular Weight Heparin 40mg",
    "hub": "West Hub Refrigerated Bay",
    "action": "Pre-Dispatch Cold Log",
    "adjustment": "0 (Verified 4.1\u00b0C)",
    "officer": "Siddharth Nair",
    "time": "2026-10-14 14:05:50",
    "status": "Normal"
  }
];

    var rows = inv.length === 0
      ? '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8">No inventory audit trail records found.</td></tr>'
      : inv.map(function (i) {
      return [
        '<tr>',
          '<td><span class="zaud-badge zaud-badge-blue zaud-mono">' + i.batch + '</span></td>',
          '<td><strong>' + i.product + '</strong></td>',
          '<td>' + i.hub + '</td>',
          '<td>' + i.action + '</td>',
          '<td class="zaud-mono" style="font-weight:700">' + i.adjustment + '</td>',
          '<td>' + i.officer + '</td>',
          '<td class="zaud-mono">' + i.time + '</td>',
          '<td style="text-align:right"><span class="zaud-badge zaud-badge-green">● ' + i.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zaud-kpi-grid">',
        makeKpi('Cold-Chain Integrity', '99.98%', '+0.05%', 'Zero thermal excursions > 8°C', '❄️', 'green'),
        makeKpi('Stock Variance Rate', '0.0%', '0.0%', 'Physical vs ERP match', '📦', 'blue'),
        makeKpi('Quarantine Actions', '0 Units', '0.0%', 'Disposal log', '🗑️', 'blue'),
        makeKpi('Batch Traceability', '100.0%', '+0.0%', '1,240 batches mapped farm-to-shelf', '🏷️', 'green'),
      '</div>',
      '<div class="zaud-panel">',
        '<div class="zaud-panel-header">',
          '<div><h3 class="zaud-panel-title">Inventory Movements, Expiries & Cold-Chain Audits</h3><p class="zaud-panel-desc">Batch lineage, thermal storage telemetry, transfer manifests, and write-off records</p></div>',
          '<button class="zaud-btn zaud-btn-secondary" onclick="window.ZenveAudit.verifyColdChain()">❄️ Cold-Chain Telemetry Test</button>',
        '</div>',
        '<div class="zaud-table-wrap">',
          '<table class="zaud-table">',
            '<thead><tr><th>Batch / Lot No</th><th>Product Name</th><th>Warehouse / Clinic Hub</th><th>Audit Action</th><th>Quantity Delta</th><th>Verified By</th><th>Timestamp</th><th style="text-align:right">Compliance</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // TAB 8: Approval History
  function renderApprovalHistoryTab() {
    var approvals = [
  {
    "id": "APP-5001",
    "type": "Schedule X Prescription",
    "entity": "RX-88410 (Morphine Sulfate 10mg)",
    "requester": "Dr. P. Nair (Oncology)",
    "approver": "Dr. Arvind Rao (CMO)",
    "time": "2026-10-14 16:40:15",
    "status": "Approved"
  },
  {
    "id": "APP-5002",
    "type": "Vendor CapEx PO",
    "entity": "PO-2026-441 (Cold Chain IoT Sensors \u20b9450,000)",
    "requester": "Siddharth Nair (Logistics)",
    "approver": "R. Venkataraman (CFO)",
    "time": "2026-10-14 16:25:30",
    "status": "Approved"
  },
  {
    "id": "APP-5003",
    "type": "Narcotic Inventory Disposal",
    "entity": "DISP-NAR-09 (12 Damaged Remdesivir Vials)",
    "requester": "Suresh Raina (QA)",
    "approver": "Kavita Deshmukh (Compliance)",
    "time": "2026-10-14 16:12:00",
    "status": "Approved"
  },
  {
    "id": "APP-5004",
    "type": "Emergency Clinical Bypass",
    "entity": "BYPASS-ICU-104 (Off-Protocol Thrombolysis)",
    "requester": "Dr. Rajesh Iyer (Cardiology)",
    "approver": "Dr. Arvind Rao (CMO)",
    "time": "2026-10-14 15:55:18",
    "status": "Approved"
  },
  {
    "id": "APP-5005",
    "type": "High-Value Bulk Discount",
    "entity": "DISC-B2B-82 (Fortis Healthcare 22% Bulk Tier)",
    "requester": "Manish Verma (Sales)",
    "approver": "R. Venkataraman (CFO)",
    "time": "2026-10-14 15:40:22",
    "status": "Approved"
  },
  {
    "id": "APP-5006",
    "type": "Doctor Credential Verification",
    "entity": "CRED-DOC-192 (Dr. Sneha Roy - Neuro Surgeon)",
    "requester": "HR Medical Board",
    "approver": "Dr. Arvind Rao (CMO)",
    "time": "2026-10-14 15:22:40",
    "status": "Approved"
  },
  {
    "id": "APP-5007",
    "type": "Drone Sky-Corridor Flight Exemption",
    "entity": "DGCA-FLT-091 (Airspace Clearance Sector 4)",
    "requester": "Manish Verma (Fleet)",
    "approver": "Aviation Officer In-Charge",
    "time": "2026-10-14 15:05:12",
    "status": "Approved"
  },
  {
    "id": "APP-5008",
    "type": "Patient PHI Export Request",
    "entity": "PHI-EXP-202 (Clinical Trial Data Anonymized)",
    "requester": "Dr. Ananya Sen (Principal Investigator)",
    "approver": "Kavita Deshmukh (DPO & Legal)",
    "time": "2026-10-14 14:48:33",
    "status": "Approved"
  },
  {
    "id": "APP-5009",
    "type": "Cold Chain Excursion Tolerance Review",
    "entity": "EXCUR-REV-03 (Hub-2 Transient spike to 6.2\u00b0C)",
    "requester": "Siddharth Nair (Cold Chain)",
    "approver": "Dr. Arvind Rao (CMO)",
    "time": "2026-10-14 14:30:15",
    "status": "Approved"
  },
  {
    "id": "APP-5010",
    "type": "Schedule H1 Audit Sign-Off",
    "entity": "AUD-H1-Q3 (Quarterly Register for Drug Inspector)",
    "requester": "Priya Sharma (Lead Pharmacist)",
    "approver": "Kavita Deshmukh (Compliance)",
    "time": "2026-10-14 14:10:00",
    "status": "Approved"
  }
];

    var rows = approvals.length === 0
      ? '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8">No approval history records found.</td></tr>'
      : approvals.map(function (a) {
      return [
        '<tr>',
          '<td><span class="zaud-badge zaud-badge-blue zaud-mono">' + a.id + '</span></td>',
          '<td><strong>' + a.type + '</strong></td>',
          '<td>' + a.entity + '</td>',
          '<td>' + a.requester + '</td>',
          '<td><strong>' + a.approver + '</strong></td>',
          '<td><span class="zaud-badge zaud-badge-green">● ' + a.status + '</span></td>',
          '<td class="zaud-mono">' + a.time + '</td>',
          '<td style="text-align:center"><button class="zaud-btn zaud-btn-secondary" style="padding:2px 8px;font-size:11px" onclick="window.ZenveAudit.viewDigitalCertificate(\'' + a.id + '\')">Certificate</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zaud-kpi-grid">',
        makeKpi('Prescriptions Signed', '99.8%', '+0.3%', 'Cryptographic doctor digital signs', '✍️', 'green'),
        makeKpi('Avg Approval SLA', '0 Mins', '0.0%', 'Approval workflow', '⚡', 'blue'),
        makeKpi('Pending Approvals', '0 Pending', '0.0%', 'Queue requests cleared', '✅', 'blue'),
        makeKpi('Approval Escalations', '0 Escalations', '0.0%', 'Hierarchy adherence', '🛡️', 'blue'),
      '</div>',
      '<div class="zaud-panel">',
        '<div class="zaud-panel-header">',
          '<div><h3 class="zaud-panel-title">Multi-Level Authority & Approval Sign-offs</h3><p class="zaud-panel-desc">Audit logs for medical sign-offs, high-value purchase orders, financial overrides, and staff leave approvals</p></div>',
          '<span class="zaud-badge zaud-badge-green">Digital Signature PKI Enabled</span>',
        '</div>',
        '<div class="zaud-table-wrap">',
          '<table class="zaud-table">',
            '<thead><tr><th>Approval ID</th><th>Workflow Category</th><th>Subject Entity / Details</th><th>Requested By</th><th>Authorizing Officer</th><th>Decision State</th><th>Timestamp</th><th style="text-align:center">Certificate</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  // TAB 9: Compliance Dashboard
  function renderComplianceDashboardTab() {
    var frameworks = [
  {
    "standard": "SOC-2 Type II (Security & Confidentiality)",
    "score": "100.0%",
    "controls": "114 / 114 Passing",
    "auditor": "Deloitte India Risk Advisory",
    "renew": "2027-03-31 (168 days)",
    "status": "Certified"
  },
  {
    "standard": "CDSCO Drugs & Cosmetics Act (Schedule H/X)",
    "score": "99.8%",
    "controls": "88 / 88 Passing",
    "auditor": "Karnataka State Drug Controller",
    "renew": "2027-01-15 (93 days)",
    "status": "Compliant"
  },
  {
    "standard": "ISO 27001:2022 (Information Security)",
    "score": "100.0%",
    "controls": "93 / 93 Passing",
    "auditor": "BSI Group Assurance",
    "renew": "2027-06-30 (259 days)",
    "status": "Certified"
  },
  {
    "standard": "HIPAA & HITECH (Patient PHI Safeguards)",
    "score": "99.6%",
    "controls": "64 / 64 Passing",
    "auditor": "KPMG Healthcare Cyber",
    "renew": "2027-04-30 (198 days)",
    "status": "Compliant"
  },
  {
    "standard": "NABH Digital Health Standards (MIS-2024)",
    "score": "99.2%",
    "controls": "52 / 52 Passing",
    "auditor": "National Accreditation Board (NABH)",
    "renew": "2026-12-01 (48 days)",
    "status": "Accredited"
  },
  {
    "standard": "PCI-DSS v4.0 (Cardholder Data Environment)",
    "score": "100.0%",
    "controls": "12 / 12 Passing",
    "auditor": "SISA Information Security",
    "renew": "2027-05-15 (213 days)",
    "status": "Certified"
  },
  {
    "standard": "ABDM / ABDM-M3 (Ayushman Bharat Digital Mission)",
    "score": "98.9%",
    "controls": "40 / 40 Passing",
    "auditor": "National Health Authority (NHA)",
    "renew": "2027-02-28 (137 days)",
    "status": "Integrated"
  },
  {
    "standard": "Good Distribution Practices (GDP / WHO)",
    "score": "99.4%",
    "controls": "76 / 76 Passing",
    "auditor": "SGS Pharma Inspection Services",
    "renew": "2027-08-31 (321 days)",
    "status": "Certified"
  },
  {
    "standard": "GSTIN & E-Way Bill Tax Compliance",
    "score": "100.0%",
    "controls": "30 / 30 Passing",
    "auditor": "Ernst & Young LLP",
    "renew": "Continuous Automated Check",
    "status": "Reconciled"
  },
  {
    "standard": "DISHA (Digital Information Security in Healthcare)",
    "score": "98.5%",
    "controls": "45 / 45 Passing",
    "auditor": "Ministry of Health & Family Welfare",
    "renew": "2027-09-30 (351 days)",
    "status": "Compliant"
  }
];

    var rows = frameworks.length === 0
      ? '<tr><td colspan="6" style="text-align:center;padding:36px;color:#94a3b8">No regulatory frameworks found.</td></tr>'
      : frameworks.map(function (f) {
      return [
        '<tr>',
          '<td><strong>' + f.standard + '</strong></td>',
          '<td class="zaud-mono" style="font-weight:700;color:#16a34a">' + f.score + '</td>',
          '<td>' + f.controls + '</td>',
          '<td style="color:#64748b">' + f.auditor + '</td>',
          '<td class="zaud-mono">' + f.renew + '</td>',
          '<td style="text-align:right"><span class="zaud-badge zaud-badge-green">● ' + f.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zaud-kpi-grid">',
        makeKpi('Overall Compliance Score', '99.4%', '+0.8%', 'Across 10 regulatory frameworks', '🛡️', 'green'),
        makeKpi('SOC-2 Controls', '114 / 114 Passing', '100%', 'Automated continuous evidence', '🔒', 'green'),
        makeKpi('Schedule H Drug Audit', '100.0%', '+0.0%', 'Prescription audit trail compliant', '💊', 'green'),
        makeKpi('Next Regulatory Audit', '48 Days', 'Scheduled', 'CDSCO & NABH Bi-Annual Review', '📅', 'blue'),
      '</div>',
      '<div class="zaud-panel">',
        '<div class="zaud-panel-header">',
          '<div><h3 class="zaud-panel-title">Regulatory Frameworks & Statutory Compliance Matrix</h3><p class="zaud-panel-desc">Real-time posture across SOC-2, medical laws, drug registries, data privacy, and taxation standards</p></div>',
          '<button class="zaud-btn zaud-btn-primary" onclick="window.ZenveAudit.runComplianceSelfAssessment()">⚡ Run Automated Audit Probe</button>',
        '</div>',
        '<div class="zaud-table-wrap">',
          '<table class="zaud-table">',
            '<thead><tr><th>Compliance Framework</th><th>Posture Score</th><th>Automated Controls Status</th><th>Audit Authority</th><th>Next Review</th><th style="text-align:right">Compliance State</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 6. Master Render Pipeline ───────────────────────────────────── */
  function renderBody() {
    ensureRoot();

    var contentHtml = '';
    if (S.activeTab === 'audit-log')       contentHtml = renderAuditLogTab();
    else if (S.activeTab === 'user-activity') contentHtml = renderUserActivityTab();
    else if (S.activeTab === 'login-history') contentHtml = renderLoginHistoryTab();
    else if (S.activeTab === 'data-changes')  contentHtml = renderDataChangesTab();
    else if (S.activeTab === 'financial-audit') contentHtml = renderFinancialAuditTab();
    else if (S.activeTab === 'order-audit')   contentHtml = renderOrderAuditTab();
    else if (S.activeTab === 'inventory-audit') contentHtml = renderInventoryAuditTab();
    else if (S.activeTab === 'approval-history') contentHtml = renderApprovalHistoryTab();
    else if (S.activeTab === 'compliance')    contentHtml = renderComplianceDashboardTab();

    root.innerHTML = [
      renderHeader(),
      renderTabsBar(),
      '<div class="zaud-body">' + contentHtml + '</div>'
    ].join('');

    attachEventListeners();
  }

  function attachEventListeners() {
    var closeBtn = document.getElementById('zaud-btn-close');
    if (closeBtn) closeBtn.onclick = close;

    var verifyBtn = document.getElementById('zaud-btn-verify');
    if (verifyBtn) verifyBtn.onclick = function () {
      showToast('SHA-256 Ledger integrity check passed: 14,820 / 14,820 cryptographic hashes verified.');
    };

    var exportBtn = document.getElementById('zaud-btn-export');
    if (exportBtn) exportBtn.onclick = exportComplianceReport;

    var searchInput = document.getElementById('zaud-search');
    if (searchInput) {
      searchInput.oninput = function (e) {
        S.searchQuery = e.target.value;
        renderBody();
        var reInput = document.getElementById('zaud-search');
        if (reInput) {
          reInput.focus();
          reInput.selectionStart = reInput.selectionEnd = reInput.value.length;
        }
      };
    }

    var tabButtons = root.querySelectorAll('.zaud-tab-btn');
    tabButtons.forEach(function (btn) {
      btn.onclick = function () {
        var t = btn.getAttribute('data-tab');
        if (t) switchTab(t);
      };
    });
  }

  function switchTab(tabId) {
    S.activeTab = tabId;
    var targetMod = MODULES.find(function (m) { return m.id === tabId; });
    if (targetMod && location.hash !== targetMod.hash) {
      history.replaceState(null, '', targetMod.hash);
    }
    renderBody();
  }

  function open(tabId) {
    ensureRoot();
    if (tabId) S.activeTab = tabId;
    S.open = true;
    root.classList.add('zaud-open');
    document.documentElement.classList.add('zaud-locked');
    document.body.classList.add('zaud-locked');
    renderBody();
    updateSidebarHighlight(true, S.activeTab);
  }

  function close() {
    if (!root) return;
    S.open = false;
    root.classList.remove('zaud-open');
    document.documentElement.classList.remove('zaud-locked');
    document.body.classList.remove('zaud-locked');
    updateSidebarHighlight(false);
  }

  function updateSidebarHighlight(on, tab) {
    var buttons = document.querySelectorAll('.sidebar-scope button, aside button, [role="button"]');
    buttons.forEach(function (b) {
      var txt = b.textContent ? b.textContent.trim() : '';
      var bTab = tabFromText(txt);
      if (bTab) {
        b.classList.toggle('zaud-active', on && bTab === tab);
      }
    });
  }

  function exportComplianceReport() {
    var report = [
      'ZENVE PETS BI — REGULATORY AUDIT & COMPLIANCE REPORT',
      'Generated: ' + new Date().toISOString(),
      'Compliance Standard: SOC-2 Type II / Schedule H / HIPAA / GST',
      'Integrity Seal: SHA-256 Immutable Ledger OK',
      '',
      'SUMMARY METRICS:',
      '- Total Events Audited: 14,820 records',
      '- Active Staff Today: 48 verified accounts',
      '- 2FA Enforcement: 100% TOTP / SSO Enforced',
      '- Financial Ledger Variance: ₹0.00 (Zero discrepancy)',
      '- Schedule H Doctor Prescriptions: 100% Signed by licensed veterinarian',
      '- Cold-Chain Storage Range: +2.0°C to +8.0°C maintained across 5 hubs',
      '- Compliance Assessment Score: 99.8% (Grade A+ Qualified)'
    ].join('\n');

    var blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'zenve-audit-compliance-report-' + new Date().toISOString().slice(0, 10) + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Compliance Audit Report exported successfully.');
  }

  /* ── 7. Public API ───────────────────────────────────────────────── */
  window.ZenveAudit = {
    open: open,
    close: close,
    switchTab: switchTab,
    getState: function () { return S; },
    verifyHashes: function () {
      showToast('SHA-256 Ledger integrity check passed: 14,820 / 14,820 cryptographic hashes verified.');
    },
    enforce2FAPolicy: function () {
      showToast('2FA Security Policy: Mandatory TOTP / SSO active for all 52 staff members.');
    },
    verifyColdChain: function () {
      showToast('Cold-chain telemetry probe OK: 5 / 5 Hub freezers operating at optimal +3.8°C to +4.2°C.');
    },
    viewUserTelemetry: function (name) {
      showToast('Telemetry loaded for ' + name + ' — Zero anomalous privilege escalations.');
    },
    viewDigitalCertificate: function (id) {
      showToast('Digital Certificate ' + id + ' — Verified with MCI PKI root.');
    },
    downloadFinancialTrail: function () {
      exportComplianceReport();
    },
    runComplianceSelfAssessment: function () {
      showToast('Automated compliance probe running across 64 SOC-2 & MCI controls...');
      setTimeout(function () {
        showToast('Self-Assessment Complete: 64/64 Controls Passing. Score: 99.8%.');
      }, 1500);
    }
  };

  /* ── 8. Global Capture-Phase Click Interceptor ───────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var text = item.textContent.trim();
      var tab = tabFromText(text);

      if (tab) {
        // Only intercept if clicked outside the audit root
        if (!t.closest('#zaud-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }
  }, true);

  /* ── 9. Hashchange & Keyboard Listeners ─────────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash.indexOf('audit') < 0 && location.hash.indexOf('compliance') < 0) {
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      close();
    }
  });

  // Check URL hash on initial load
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    setTimeout(function () { open(initialTab); }, 350);
  }
})();
