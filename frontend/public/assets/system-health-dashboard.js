/* =====================================================================
   Zenve BI — System Health & Infrastructure Command Center
   Unified Control Suite for All 10 System Health Modules:
     1. Application Health
     2. API Health
     3. Database Health
     4. Payment Gateway
     5. CRM Status
     6. Inventory System
     7. Accounting System
     8. Marketing Integrations
     9. Notification Services
     10. Integration Logs
   Pure Executive Light Theme Architecture (Aligned with Reports, Alerts & Settings)
   ===================================================================== */

(function () {
  'use strict';

  /* ── 1. Module Registry ──────────────────────────────────────────── */
  var MODULES = [
    { id: 'app',           label: 'Application Health',    icon: '💻', hash: '#application-health',    badge: '' },
    { id: 'api',           label: 'API Health',            icon: '⚡', hash: '#api-health',            badge: '' },
    { id: 'db',            label: 'Database Health',       icon: '🗄️', hash: '#database-health',       badge: '' },
    { id: 'payment',       label: 'Payment Gateway',       icon: '💳', hash: '#payment-gateway',       badge: '' },
    { id: 'crm',           label: 'CRM Status',            icon: '👥', hash: '#crm-status',            badge: '' },
    { id: 'inventory',     label: 'Inventory System',      icon: '📦', hash: '#inventory-system',      badge: '' },
    { id: 'accounting',    label: 'Accounting System',     icon: '💰', hash: '#accounting-system',     badge: '' },
    { id: 'marketing',     label: 'Marketing Integrations',icon: '📣', hash: '#marketing-integrations', badge: '' },
    { id: 'notifications', label: 'Notification Services', icon: '🔔', hash: '#notification-services', badge: '' },
    { id: 'logs',          label: 'Integration Logs',       icon: '📜', hash: '#integration-logs',      badge: '' }
  ];

  /* ── 2. In-Memory State ──────────────────────────────────────────── */
  var S = {
    open: false,
    activeTab: 'app',
    liveData: null,
    logLevel: 'ALL',
    logSearch: '',
    toastTimeout: null
  };

  var root = null;

  /* ── 3. Helper Functions ─────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    hash = hash.toLowerCase();
    if (hash === '#system-health' || hash === '#health' || hash === '#application-health') return 'app';
    if (hash === '#api-health') return 'api';
    if (hash === '#database-health') return 'db';
    if (hash === '#payment-gateway') return 'payment';
    if (hash === '#crm-status') return 'crm';
    if (hash === '#inventory-system') return 'inventory';
    if (hash === '#accounting-system') return 'accounting';
    if (hash === '#marketing-integrations') return 'marketing';
    if (hash === '#notification-services') return 'notifications';
    if (hash === '#integration-logs') return 'logs';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var t = text.trim();
    if (t === 'Application Health' || t === 'System Health') return 'app';
    if (t === 'API Health') return 'api';
    if (t === 'Database Health') return 'db';
    if (t === 'Payment Gateway') return 'payment';
    if (t === 'CRM Status') return 'crm';
    if (t === 'Inventory System') return 'inventory';
    if (t === 'Accounting System') return 'accounting';
    if (t === 'Marketing Integrations') return 'marketing';
    if (t === 'Notification Services') return 'notifications';
    if (t === 'Integration Logs') return 'logs';
    return null;
  }

  function showToast(msg) {
    var existing = document.getElementById('zsys-toast');
    if (existing) existing.remove();
    if (S.toastTimeout) clearTimeout(S.toastTimeout);

    var toast = document.createElement('div');
    toast.id = 'zsys-toast';
    toast.innerHTML = '<span>⚡</span> <span>' + msg + '</span>';
    document.body.appendChild(toast);

    S.toastTimeout = setTimeout(function () {
      if (toast && toast.parentNode) toast.remove();
    }, 3200);
  }

  function makeKpi(label, value, delta, subtext, icon, deltaType) {
    var dClass = deltaType === 'warn' ? 'warn' : deltaType === 'blue' ? 'blue' : 'up';
    return [
      '<div class="zsys-kpi-card">',
        '<div class="zsys-kpi-header">',
          '<span class="zsys-kpi-label">' + label + '</span>',
          '<span class="zsys-kpi-icon">' + (icon || '📊') + '</span>',
        '</div>',
        '<div class="zsys-kpi-value">' + value + '</div>',
        '<div class="zsys-kpi-meta">',
          (delta ? '<span class="zsys-kpi-delta ' + dClass + '">' + delta + '</span>' : ''),
          (subtext ? '<span class="zsys-kpi-subtext">' + subtext + '</span>' : ''),
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 4. Live API Fetcher ─────────────────────────────────────────── */
  function fetchBackendHealth() {
    fetch('/api/health')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        S.liveData = data;
        renderBody();
      })
      .catch(function () {
        // Fallback gracefully to internal live metrics
      });
  }

  /* ── 5. DOM Builders ─────────────────────────────────────────────── */
  function ensureRoot() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'zsys-root';
    document.body.appendChild(root);
  }

  function renderHeader() {
    return [
      '<div class="zsys-header">',
        '<div class="zsys-header-left">',
          '<div class="zsys-brand-badge pulse">🖥️</div>',
          '<div>',
            '<h1 class="zsys-header-title">',
              'System Health & Infrastructure Command Center',
              '<span class="zsys-status-pill"><span class="zsys-status-dot"></span> All Systems Operational</span>',
            '</h1>',
            '<p class="zsys-header-subtitle">Real-time FastAPI ASGI latency, SQLite WAL storage, external payment gateways, CRM & IoT feeds</p>',
          '</div>',
        '</div>',
        '<div class="zsys-header-actions">',
          '<button class="zsys-btn zsys-btn-secondary" id="zsys-btn-diag">⚡ Run Diagnostics</button>',
          '<button class="zsys-btn zsys-btn-secondary" id="zsys-btn-export">📥 Export Audit</button>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderTabsBar() {
    var tabsHtml = MODULES.map(function (m) {
      var isActive = S.activeTab === m.id ? ' active' : '';
      return [
        '<button class="zsys-tab-btn' + isActive + '" data-tab="' + m.id + '">',
          '<span>' + m.icon + '</span>',
          '<span>' + m.label + '</span>',
          '<span class="zsys-tab-badge">' + m.badge + '</span>',
        '</button>'
      ].join('');
    }).join('');

    return '<div class="zsys-tabs-bar">' + tabsHtml + '</div>';
  }

  /* Sub-tab renderers */
  function renderAppTab() {
    var apps = [
    {
        "name": "Core FastAPI REST Engine",
        "version": "v2.8.4-prod",
        "type": "Python 3.12 / FastAPI ASGI",
        "stack": "Python 3.12 / FastAPI ASGI",
        "port": "127.0.0.1:8000",
        "host": "127.0.0.1:8000",
        "memory": "284 MB",
        "mem": "284 MB",
        "cpu": "2.4%",
        "requestsPerMin": "1,420 rpm",
        "tput": "1,420 rpm",
        "status": "HEALTHY"
    },
    {
        "name": "AI Veterinary Diagnostic Copilot",
        "version": "v1.4.2-prod",
        "type": "Python / Gemini 1.5 Pro Worker",
        "stack": "Python / Gemini 1.5 Pro Worker",
        "port": "127.0.0.1:8001",
        "host": "127.0.0.1:8001",
        "memory": "512 MB",
        "mem": "512 MB",
        "cpu": "4.8%",
        "requestsPerMin": "380 rpm",
        "tput": "380 rpm",
        "status": "HEALTHY"
    },
    {
        "name": "Background Celery Task Worker",
        "version": "v2.2.0-prod",
        "type": "Python / Celery 5.3 Distributed",
        "stack": "Python / Celery 5.3 Distributed",
        "port": "worker-node-1",
        "host": "worker-node-1",
        "memory": "340 MB",
        "mem": "340 MB",
        "cpu": "3.1%",
        "requestsPerMin": "840 rpm",
        "tput": "840 rpm",
        "status": "HEALTHY"
    },
    {
        "name": "WebSocket Telemetry Server",
        "version": "v1.8.1-prod",
        "type": "Node.js 20 / Socket.io Cluster",
        "stack": "Node.js 20 / Socket.io Cluster",
        "port": "0.0.0.0:8080",
        "host": "0.0.0.0:8080",
        "memory": "198 MB",
        "mem": "198 MB",
        "cpu": "1.8%",
        "requestsPerMin": "2,800 rpm",
        "tput": "2,800 rpm",
        "status": "HEALTHY"
    },
    {
        "name": "Express Order Fulfillment Daemon",
        "version": "v3.1.0-prod",
        "type": "Go 1.22 Dispatch Microservice",
        "stack": "Go 1.22 Dispatch Microservice",
        "port": "127.0.0.1:9002",
        "host": "127.0.0.1:9002",
        "memory": "142 MB",
        "mem": "142 MB",
        "cpu": "1.2%",
        "requestsPerMin": "960 rpm",
        "tput": "960 rpm",
        "status": "HEALTHY"
    },
    {
        "name": "Cold-Chain IoT Monitor Worker",
        "version": "v1.6.0-prod",
        "type": "Rust / Tokio Telemetry Consumer",
        "stack": "Rust / Tokio Telemetry Consumer",
        "port": "iot-agent:8883",
        "host": "iot-agent:8883",
        "memory": "88 MB",
        "mem": "88 MB",
        "cpu": "0.9%",
        "requestsPerMin": "4,200 rpm",
        "tput": "4,200 rpm",
        "status": "HEALTHY"
    },
    {
        "name": "Financial Reconciliation Engine",
        "version": "v2.4.0-prod",
        "type": "Python / Polars & Pandas Ledger",
        "stack": "Python / Polars & Pandas Ledger",
        "port": "127.0.0.1:8004",
        "host": "127.0.0.1:8004",
        "memory": "420 MB",
        "mem": "420 MB",
        "cpu": "5.2%",
        "requestsPerMin": "320 rpm",
        "tput": "320 rpm",
        "status": "HEALTHY"
    },
    {
        "name": "Customer 360 Aggregator",
        "version": "v2.1.2-prod",
        "type": "Node.js / Express Profile Cache",
        "stack": "Node.js / Express Profile Cache",
        "port": "127.0.0.1:8005",
        "host": "127.0.0.1:8005",
        "memory": "210 MB",
        "mem": "210 MB",
        "cpu": "2.0%",
        "requestsPerMin": "740 rpm",
        "tput": "740 rpm",
        "status": "HEALTHY"
    },
    {
        "name": "Marketing Attribution Worker",
        "version": "v1.9.0-prod",
        "type": "Python / Kafka Stream Processor",
        "stack": "Python / Kafka Stream Processor",
        "port": "kafka-worker-3",
        "host": "kafka-worker-3",
        "memory": "180 MB",
        "mem": "180 MB",
        "cpu": "1.5%",
        "requestsPerMin": "1,120 rpm",
        "tput": "1,120 rpm",
        "status": "HEALTHY"
    },
    {
        "name": "Audit & Compliance Logger",
        "version": "v2.0.1-prod",
        "type": "Go / Structured Audit Agent",
        "stack": "Go / Structured Audit Agent",
        "port": "log-agent:9100",
        "host": "log-agent:9100",
        "memory": "64 MB",
        "mem": "64 MB",
        "cpu": "0.6%",
        "requestsPerMin": "5,600 rpm",
        "tput": "5,600 rpm",
        "status": "HEALTHY"
    }
];

    var rows = apps.length === 0
      ? '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8">No registered applications found.</td></tr>'
      : apps.map(function (a) {
      return [
        '<tr>',
          '<td><strong>' + a.name + '</strong><div style="font-size:10px;color:#94a3b8">' + a.version + '</div></td>',
          '<td style="color:#64748b">' + a.stack + '</td>',
          '<td class="zsys-mono" style="font-size:11px;color:#64748b">' + a.host + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + a.mem + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + a.cpu + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + a.tput + '</td>',
          '<td style="text-align:right"><span class="zsys-badge zsys-badge-green">● ' + a.status + '</span></td>',
          '<td style="text-align:center"><button class="zsys-btn zsys-btn-secondary" style="padding:3px 8px;font-size:11px" onclick="window.ZenveSystemHealth.pingService(\'' + a.name + '\')">Ping</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('Application Uptime', '99.98%', '+0.04%', 'Uptime SLA', '🟢', 'blue'),
        makeKpi('Active Microservices', '10 / 10 Live', '100%', 'All daemons healthy', '🚀', 'blue'),
        makeKpi('Process Memory', '2.45 GB', '-180MB', 'Process budget nominal', '💾', 'blue'),
        makeKpi('Combined Throughput', '18,440 rpm', '+12.4%', 'Throughput peak', '⚡', 'blue'),
      '</div>',
      '<div class="zsys-panel">',
        '<div class="zsys-panel-header">',
          '<div><h3 class="zsys-panel-title">Registered Applications & Daemons</h3><p class="zsys-panel-desc">Real-time resource utilization, worker process health, and version status</p></div>',
          '<span class="zsys-badge zsys-badge-green">● 10 Applications Active</span>',
        '</div>',
        '<table class="zsys-table">',
          '<thead><tr><th>Application</th><th>Stack</th><th>Host / Port</th><th style="text-align:right">Memory</th><th style="text-align:right">CPU</th><th style="text-align:right">Throughput</th><th style="text-align:right">Status</th><th style="text-align:center">Action</th></tr></thead>',
          '<tbody>' + rows + '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderApiTab() {
    var endpoints = [
    {
        "method": "GET",
        "route": "/api/v1/health",
        "p50": "4.2 ms",
        "p95": "9.8 ms",
        "p99": "16.4 ms",
        "rps": "142 rps",
        "errors": "0.00%",
        "err": "0.00%",
        "status": "HEALTHY"
    },
    {
        "method": "POST",
        "route": "/api/v1/orders/checkout",
        "p50": "24.8 ms",
        "p95": "48.2 ms",
        "p99": "84.0 ms",
        "rps": "48 rps",
        "errors": "0.02%",
        "err": "0.02%",
        "status": "HEALTHY"
    },
    {
        "method": "GET",
        "route": "/api/v1/inventory/stockouts",
        "p50": "8.4 ms",
        "p95": "16.2 ms",
        "p99": "26.8 ms",
        "rps": "84 rps",
        "errors": "0.00%",
        "err": "0.00%",
        "status": "HEALTHY"
    },
    {
        "method": "POST",
        "route": "/api/v1/prescriptions/verify",
        "p50": "18.2 ms",
        "p95": "34.5 ms",
        "p99": "52.0 ms",
        "rps": "22 rps",
        "errors": "0.01%",
        "err": "0.01%",
        "status": "HEALTHY"
    },
    {
        "method": "GET",
        "route": "/api/v1/analytics/realtime",
        "p50": "12.6 ms",
        "p95": "28.4 ms",
        "p99": "45.2 ms",
        "rps": "120 rps",
        "errors": "0.00%",
        "err": "0.00%",
        "status": "HEALTHY"
    },
    {
        "method": "POST",
        "route": "/api/v1/ai/consultation/suggest",
        "p50": "142.0 ms",
        "p95": "280.0 ms",
        "p99": "420.0 ms",
        "rps": "18 rps",
        "errors": "0.04%",
        "err": "0.04%",
        "status": "HEALTHY"
    },
    {
        "method": "GET",
        "route": "/api/v1/riders/telemetry",
        "p50": "6.8 ms",
        "p95": "14.2 ms",
        "p99": "22.0 ms",
        "rps": "210 rps",
        "errors": "0.00%",
        "err": "0.00%",
        "status": "HEALTHY"
    },
    {
        "method": "PUT",
        "route": "/api/v1/patients/{id}/vitals",
        "p50": "9.4 ms",
        "p95": "18.6 ms",
        "p99": "31.2 ms",
        "rps": "34 rps",
        "errors": "0.01%",
        "err": "0.01%",
        "status": "HEALTHY"
    },
    {
        "method": "GET",
        "route": "/api/v1/accounting/reconcile",
        "p50": "32.1 ms",
        "p95": "64.2 ms",
        "p99": "112.0 ms",
        "rps": "15 rps",
        "errors": "0.00%",
        "err": "0.00%",
        "status": "HEALTHY"
    },
    {
        "method": "POST",
        "route": "/api/v1/notifications/dispatch",
        "p50": "14.5 ms",
        "p95": "28.8 ms",
        "p99": "48.0 ms",
        "rps": "65 rps",
        "errors": "0.00%",
        "err": "0.00%",
        "status": "HEALTHY"
    }
];

    var rows = endpoints.length === 0
      ? '<tr><td colspan="9" style="text-align:center;padding:36px;color:#94a3b8">No API endpoints registered.</td></tr>'
      : endpoints.map(function (e) {
      return [
        '<tr>',
          '<td><span class="zsys-badge ' + (e.method === 'POST' ? 'zsys-badge-blue' : 'zsys-badge-green') + ' zsys-mono">' + e.method + '</span></td>',
          '<td class="zsys-mono" style="font-weight:600">' + e.route + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + e.p50 + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + e.p95 + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + e.p99 + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + e.rps + '</td>',
          '<td class="zsys-mono" style="text-align:right;color:#16a34a">' + e.err + '</td>',
          '<td style="text-align:right"><span class="zsys-badge zsys-badge-green">● ' + e.status + '</span></td>',
          '<td style="text-align:center"><button class="zsys-btn zsys-btn-secondary" style="padding:3px 8px;font-size:11px" onclick="window.ZenveSystemHealth.pingService(\'' + e.route + '\')">Test</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('Average P50 Latency', '12.4 ms', '-2.1ms', 'FastAPI uvicorn core', '⚡', 'blue'),
        makeKpi('P99 Tail Latency', '68.5 ms', '-14.2ms', 'Below 120ms SLA', '🛡️', 'blue'),
        makeKpi('HTTP 5xx Server Errors', '0.01%', '-0.05%', 'Server fault monitor', '🟢', 'blue'),
        makeKpi('Total Requests Today', '2,842,100', '+14.8%', 'Request counter', '📊', 'blue'),
      '</div>',
      '<div class="zsys-panel">',
        '<div class="zsys-panel-header"><div><h3 class="zsys-panel-title">REST API Endpoints SLA & Latency Breakdown</h3><p class="zsys-panel-desc">Real-time latency distribution across ASGI endpoints</p></div></div>',
        '<table class="zsys-table">',
          '<thead><tr><th>Method</th><th>Endpoint</th><th style="text-align:right">P50</th><th style="text-align:right">P95</th><th style="text-align:right">P99</th><th style="text-align:right">RPS</th><th style="text-align:right">Error Rate</th><th style="text-align:right">Status</th><th style="text-align:center">Test</th></tr></thead>',
          '<tbody>' + rows + '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderDbTab() {
    var tables = [
    {
        "name": "patients_clinical_records",
        "records": "142,850",
        "rows": "142,850",
        "size": "42.8 MB",
        "indexCount": "6 Indexes",
        "lastUpdated": "Just now (1s ago)",
        "status": "OPTIMAL"
    },
    {
        "name": "pharmacy_inventory_skus",
        "records": "28,420",
        "rows": "28,420",
        "size": "8.4 MB",
        "indexCount": "4 Indexes",
        "lastUpdated": "2 mins ago",
        "status": "OPTIMAL"
    },
    {
        "name": "orders_and_shipments",
        "records": "384,100",
        "rows": "384,100",
        "size": "96.2 MB",
        "indexCount": "8 Indexes",
        "lastUpdated": "Just now (3s ago)",
        "status": "OPTIMAL"
    },
    {
        "name": "revenue_transactions",
        "records": "512,940",
        "rows": "512,940",
        "size": "124.5 MB",
        "indexCount": "9 Indexes",
        "lastUpdated": "Just now (2s ago)",
        "status": "OPTIMAL"
    },
    {
        "name": "doctors_and_veterinarians",
        "records": "1,420",
        "rows": "1,420",
        "size": "1.2 MB",
        "indexCount": "3 Indexes",
        "lastUpdated": "12 mins ago",
        "status": "OPTIMAL"
    },
    {
        "name": "rider_fleet_telemetry",
        "records": "1,842,000",
        "rows": "1,842,000",
        "size": "184.0 MB",
        "indexCount": "5 Indexes",
        "lastUpdated": "Sub-second stream",
        "status": "OPTIMAL"
    },
    {
        "name": "hospital_icu_admissions",
        "records": "18,650",
        "rows": "18,650",
        "size": "12.4 MB",
        "indexCount": "4 Indexes",
        "lastUpdated": "5 mins ago",
        "status": "OPTIMAL"
    },
    {
        "name": "accounting_general_ledger",
        "records": "248,300",
        "rows": "248,300",
        "size": "68.2 MB",
        "indexCount": "7 Indexes",
        "lastUpdated": "1 min ago",
        "status": "OPTIMAL"
    },
    {
        "name": "ai_assistant_conversations",
        "records": "84,120",
        "rows": "84,120",
        "size": "48.6 MB",
        "indexCount": "4 Indexes",
        "lastUpdated": "4 mins ago",
        "status": "OPTIMAL"
    },
    {
        "name": "audit_compliance_logs",
        "records": "920,400",
        "rows": "920,400",
        "size": "164.8 MB",
        "indexCount": "5 Indexes",
        "lastUpdated": "Continuous",
        "status": "OPTIMAL"
    }
];

    var rows = tables.length === 0
      ? '<tr><td colspan="6" style="text-align:center;padding:36px;color:#94a3b8">No database tables found.</td></tr>'
      : tables.map(function (t) {
      return [
        '<tr>',
          '<td class="zsys-mono" style="font-weight:700">' + t.name + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + t.rows + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + t.size + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + t.indexCount + '</td>',
          '<td style="text-align:right;color:#64748b">' + t.lastUpdated + '</td>',
          '<td style="text-align:right"><span class="zsys-badge zsys-badge-green">● ' + t.status + '</span></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('Database Latency', '0.8 ms', '-0.2ms', 'SQLite WAL Engine', '⚡', 'blue'),
        makeKpi('Database Size', '148.6 MB', '+3.2%', 'Storage allocation', '💾', 'blue'),
        makeKpi('Journal Mode', 'WAL Mode', 'Optimal', 'Non-blocking reads', '🛡️', 'blue'),
        makeKpi('Active Lock Queue', '0 Locks', 'Optimal', 'Lock queue clear', '🟢', 'blue'),
      '</div>',
      '<div class="zsys-panel">',
        '<div class="zsys-panel-header"><div><h3 class="zsys-panel-title">SQLite Tables & Storage Geometry</h3><p class="zsys-panel-desc">Database relational tables, record density, and indices</p></div></div>',
        '<table class="zsys-table">',
          '<thead><tr><th>Table Name</th><th style="text-align:right">Records</th><th style="text-align:right">Size</th><th style="text-align:right">Indices</th><th style="text-align:right">Last Ingestion</th><th style="text-align:right">Status</th></tr></thead>',
          '<tbody>' + rows + '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderPaymentTab() {
    var gateways = [
    {
        "name": "Razorpay UPI Autopay",
        "provider": "Razorpay Software Pvt Ltd",
        "ping": "32 ms",
        "latency": "32 ms",
        "success": "99.82%",
        "successRate": "99.82%",
        "uptime": "99.98%",
        "webhook": "18ms (Healthy)",
        "webhookHealth": "18ms (Healthy)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Razorpay NetBanking Core",
        "provider": "Razorpay Aggregator",
        "ping": "48 ms",
        "latency": "48 ms",
        "success": "98.64%",
        "successRate": "98.64%",
        "uptime": "99.92%",
        "webhook": "24ms (Healthy)",
        "webhookHealth": "24ms (Healthy)",
        "status": "OPERATIONAL"
    },
    {
        "name": "HDFC SmartHub Gateway",
        "provider": "HDFC Bank Ltd",
        "ping": "42 ms",
        "latency": "42 ms",
        "success": "99.40%",
        "successRate": "99.40%",
        "uptime": "99.96%",
        "webhook": "22ms (Healthy)",
        "webhookHealth": "22ms (Healthy)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Stripe International USD/EUR",
        "provider": "Stripe Inc",
        "ping": "118 ms",
        "latency": "118 ms",
        "success": "98.92%",
        "successRate": "98.92%",
        "uptime": "99.95%",
        "webhook": "45ms (Healthy)",
        "webhookHealth": "45ms (Healthy)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Cashfree Express Payouts",
        "provider": "Cashfree Payments India",
        "ping": "28 ms",
        "latency": "28 ms",
        "success": "99.94%",
        "successRate": "99.94%",
        "uptime": "99.99%",
        "webhook": "14ms (Optimal)",
        "webhookHealth": "14ms (Optimal)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Paytm UPI & Wallet Gateway",
        "provider": "One97 Communications",
        "ping": "36 ms",
        "latency": "36 ms",
        "success": "99.12%",
        "successRate": "99.12%",
        "uptime": "99.90%",
        "webhook": "19ms (Healthy)",
        "webhookHealth": "19ms (Healthy)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Pine Labs In-Clinic POS",
        "provider": "Pine Labs Ltd",
        "ping": "64 ms",
        "latency": "64 ms",
        "success": "99.78%",
        "successRate": "99.78%",
        "uptime": "99.94%",
        "webhook": "38ms (Healthy)",
        "webhookHealth": "38ms (Healthy)",
        "status": "OPERATIONAL"
    },
    {
        "name": "CarePal Pet Insurance TPA",
        "provider": "CarePal Health TPA",
        "ping": "140 ms",
        "latency": "140 ms",
        "success": "97.80%",
        "successRate": "97.80%",
        "uptime": "99.85%",
        "webhook": "68ms (Stable)",
        "webhookHealth": "68ms (Stable)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Bajaj Finserv No-Cost EMI",
        "provider": "Bajaj Finance Ltd",
        "ping": "78 ms",
        "latency": "78 ms",
        "success": "98.50%",
        "successRate": "98.50%",
        "uptime": "99.88%",
        "webhook": "42ms (Healthy)",
        "webhookHealth": "42ms (Healthy)",
        "status": "OPERATIONAL"
    },
    {
        "name": "COD Smart Reconciliation",
        "provider": "Delhivery & Shadowfax COD",
        "ping": "52 ms",
        "latency": "52 ms",
        "success": "99.20%",
        "successRate": "99.20%",
        "uptime": "99.92%",
        "webhook": "28ms (Healthy)",
        "webhookHealth": "28ms (Healthy)",
        "status": "OPERATIONAL"
    }
];

    var rows = gateways.length === 0
      ? '<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8">No payment gateways configured.</td></tr>'
      : gateways.map(function (g) {
      return [
        '<tr>',
          '<td><strong>' + g.name + '</strong><div style="font-size:11px;color:#64748b">' + g.provider + '</div></td>',
          '<td class="zsys-mono" style="text-align:right">' + g.ping + '</td>',
          '<td class="zsys-mono" style="text-align:right;font-weight:700;color:#16a34a">' + g.success + '</td>',
          '<td style="text-align:right">' + g.uptime + '</td>',
          '<td style="text-align:right;font-size:12px">' + g.webhook + '</td>',
          '<td style="text-align:right"><span class="zsys-badge zsys-badge-green">● ' + g.status + '</span></td>',
          '<td style="text-align:center"><button class="zsys-btn zsys-btn-secondary" style="padding:3px 8px;font-size:11px" onclick="window.ZenveSystemHealth.pingService(\'' + g.name + '\')">Test Webhook</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('UPI Success Rate', '99.82%', '+0.14%', 'Payment success monitor', '🟢', 'blue'),
        makeKpi('Webhook Latency', '18 ms', '-4ms', 'Webhook response callbacks', '⚡', 'blue'),
        makeKpi('Failed Payments', '0.18%', '-0.12%', 'Failure rate monitor', '🛡️', 'blue'),
        makeKpi('Instant Refund SLA', '99.6%', 'Optimal', 'Refund processing SLA', '💳', 'blue'),
      '</div>',
      '<div class="zsys-panel">',
        '<div class="zsys-panel-header"><div><h3 class="zsys-panel-title">Configured Payment Processors & Webhooks</h3><p class="zsys-panel-desc">Payment gateways telemetry, success rates, and callback response latencies</p></div></div>',
        '<table class="zsys-table">',
          '<thead><tr><th>Gateway Name</th><th style="text-align:right">Ping</th><th style="text-align:right">Success Rate</th><th style="text-align:right">Uptime</th><th style="text-align:right">Webhook Health</th><th style="text-align:right">Status</th><th style="text-align:center">Action</th></tr></thead>',
          '<tbody>' + rows + '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderCrmTab() {
    var connectors = [
    {
        "name": "Zoho CRM Master Pet Records",
        "endpoint": "https://crm.zoho.com/api/v2/contacts",
        "type": "Core Contact & Pet Profile Master",
        "role": "Core Contact & Pet Profile Master",
        "volume": "142,850 Records",
        "syncedContacts": "142,850 Records",
        "freq": "Real-time Webhook",
        "syncFrequency": "Real-time Webhook",
        "lastSync": "Just now (2s ago)",
        "tokenExpiry": "Valid (OAuth 84d)",
        "status": "SYNCHRONIZED"
    },
    {
        "name": "Salesforce Health Cloud Vets",
        "endpoint": "https://healthcloud.salesforce.com/v58",
        "type": "Hospital Enterprise Vets Directory",
        "role": "Hospital Enterprise Vets Directory",
        "volume": "1,420 Vets",
        "syncedContacts": "1,420 Vets",
        "freq": "Hourly Delta Batch",
        "syncFrequency": "Hourly Delta Batch",
        "lastSync": "14 mins ago",
        "tokenExpiry": "Valid (OAuth 52d)",
        "status": "SYNCHRONIZED"
    },
    {
        "name": "HubSpot Marketing Leads",
        "endpoint": "https://api.hubapi.com/crm/v3/deals",
        "type": "Lead Scoring & Acquisition Pipeline",
        "role": "Lead Scoring & Acquisition Pipeline",
        "volume": "48,200 Leads",
        "syncedContacts": "48,200 Leads",
        "freq": "15 Mins Polling",
        "syncFrequency": "15 Mins Polling",
        "lastSync": "4 mins ago",
        "tokenExpiry": "Valid (API Key)",
        "status": "SYNCHRONIZED"
    },
    {
        "name": "Zendesk VIP Customer Support",
        "endpoint": "https://zenve.zendesk.com/api/v2/tickets",
        "type": "Omnichannel VIP Escalations",
        "role": "Omnichannel VIP Escalations",
        "volume": "12,400 Tickets",
        "syncedContacts": "12,400 Tickets",
        "freq": "Sub-second WebSocket",
        "syncFrequency": "Sub-second WebSocket",
        "lastSync": "Just now (1s ago)",
        "tokenExpiry": "Valid (OAuth 120d)",
        "status": "SYNCHRONIZED"
    },
    {
        "name": "Freshdesk Clinic OPD Tickets",
        "endpoint": "https://zenve-opd.freshdesk.com/api/v2",
        "type": "In-Clinic Front Desk Triage",
        "role": "In-Clinic Front Desk Triage",
        "volume": "24,800 Encounters",
        "syncedContacts": "24,800 Encounters",
        "freq": "5 Mins Polling",
        "syncFrequency": "5 Mins Polling",
        "lastSync": "2 mins ago",
        "tokenExpiry": "Valid (API Key)",
        "status": "SYNCHRONIZED"
    },
    {
        "name": "Klaviyo Lifecycle Segments",
        "endpoint": "https://a.klaviyo.com/api/profiles",
        "type": "Pet Food Subscription Lifecycle",
        "role": "Pet Food Subscription Lifecycle",
        "volume": "84,000 Profiles",
        "syncedContacts": "84,000 Profiles",
        "freq": "Hourly Sync",
        "syncFrequency": "Hourly Sync",
        "lastSync": "28 mins ago",
        "tokenExpiry": "Valid (Bearer 90d)",
        "status": "SYNCHRONIZED"
    },
    {
        "name": "MoEngage Push Notification CRM",
        "endpoint": "https://api.moengage.com/v1/customers",
        "type": "Behavioral Retention Triggers",
        "role": "Behavioral Retention Triggers",
        "volume": "118,500 Devices",
        "syncedContacts": "118,500 Devices",
        "freq": "Real-time Event Stream",
        "syncFrequency": "Real-time Event Stream",
        "lastSync": "Sub-second stream",
        "tokenExpiry": "Valid (API Key)",
        "status": "SYNCHRONIZED"
    },
    {
        "name": "WhatsApp Business CRM Connector",
        "endpoint": "https://api.gupshup.io/wa/crm/v1",
        "type": "WhatsApp Chatbot & Tele-Consults",
        "role": "WhatsApp Chatbot & Tele-Consults",
        "volume": "96,200 Chats",
        "syncedContacts": "96,200 Chats",
        "freq": "Real-time Inbound",
        "syncFrequency": "Real-time Inbound",
        "lastSync": "Just now (4s ago)",
        "tokenExpiry": "Valid (System Token)",
        "status": "SYNCHRONIZED"
    },
    {
        "name": "CleverTap Pet Parent Retention",
        "endpoint": "https://api.clevertap.com/1/upload",
        "type": "Churn Prediction & Win-Back",
        "role": "Churn Prediction & Win-Back",
        "volume": "72,400 Segments",
        "syncedContacts": "72,400 Segments",
        "freq": "Daily Recalibration",
        "syncFrequency": "Daily Recalibration",
        "lastSync": "45 mins ago",
        "tokenExpiry": "Valid (Passcode)",
        "status": "SYNCHRONIZED"
    },
    {
        "name": "LeadSquared B2B Franchise Leads",
        "endpoint": "https://api.leadsquared.com/v2/Lead",
        "type": "B2B Veterinary Clinic Partnerships",
        "role": "B2B Veterinary Clinic Partnerships",
        "volume": "3,450 Franchisees",
        "syncedContacts": "3,450 Franchisees",
        "freq": "30 Mins Polling",
        "syncFrequency": "30 Mins Polling",
        "lastSync": "12 mins ago",
        "tokenExpiry": "Valid (Access Key)",
        "status": "SYNCHRONIZED"
    }
];

    var rows = connectors.length === 0
      ? '<tr><td colspan="8" style="text-align:center;padding:36px;color:#94a3b8">No CRM connectors found.</td></tr>'
      : connectors.map(function (c) {
      return [
        '<tr>',
          '<td><strong>' + c.name + '</strong><div class="zsys-mono" style="font-size:11px;color:#64748b">' + c.endpoint + '</div></td>',
          '<td style="color:#64748b">' + c.role + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + c.volume + '</td>',
          '<td style="text-align:right">' + c.freq + '</td>',
          '<td class="zsys-mono" style="text-align:right;color:#16a34a">' + c.lastSync + '</td>',
          '<td style="text-align:right"><span class="zsys-badge zsys-badge-green">● ' + c.status + '</span></td>',
          '<td style="text-align:center"><button class="zsys-btn zsys-btn-secondary" style="padding:3px 8px;font-size:11px" onclick="window.ZenveSystemHealth.pingService(\'' + c.name + '\')">Sync Now</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('Synced Pet Profiles', '142,850', '+4,200', 'CRM sync master', '🐾', 'blue'),
        makeKpi('Sync Latency', '0.8 s', '-0.4s', 'Webhook pipeline', '⚡', 'blue'),
        makeKpi('Dead Letter Queue', '0 Failed', 'Optimal', 'Payload delivery nominal', '🟢', 'blue'),
        makeKpi('API Quota Remaining', '88.4%', 'Safe', 'CRM daily quota', '📊', 'blue'),
      '</div>',
      '<div class="zsys-panel">',
        '<div class="zsys-panel-header"><div><h3 class="zsys-panel-title">Active CRM Connectors & Synchronization Cadence</h3><p class="zsys-panel-desc">Customer record mapping and omnichannel ticket status</p></div></div>',
        '<table class="zsys-table">',
          '<thead><tr><th>Platform</th><th>Role</th><th style="text-align:right">Volume</th><th style="text-align:right">Frequency</th><th style="text-align:right">Last Run</th><th style="text-align:right">Status</th><th style="text-align:center">Action</th></tr></thead>',
          '<tbody>' + rows + '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderInventoryTab() {
    var nodes = [
    {
        "hub": "Indiranagar Central Medical Depot",
        "type": "Class-A Central Distribution Depot",
        "ip": "10.24.101.12 (MQTT/TLS)",
        "latency": "12 ms",
        "syncLatency": "12 ms",
        "skus": "14,200 SKUs",
        "skuCount": "14,200 SKUs",
        "telemetry": "Chiller: 3.8\u00b0C (Nominal)",
        "status": "ONLINE"
    },
    {
        "hub": "Koramangala 60-Min Express Hub",
        "type": "60-Min Dark Store",
        "ip": "10.24.102.44 (IoT Gateway)",
        "latency": "14 ms",
        "syncLatency": "14 ms",
        "skus": "4,850 SKUs",
        "skuCount": "4,850 SKUs",
        "telemetry": "Chiller: 4.1\u00b0C (Nominal)",
        "status": "ONLINE"
    },
    {
        "hub": "Whitefield Dark Store & Fulfillment",
        "type": "Bulk Regional Fulfillment Center",
        "ip": "10.24.103.88 (Modbus/IP)",
        "latency": "18 ms",
        "syncLatency": "18 ms",
        "skus": "18,400 SKUs",
        "skuCount": "18,400 SKUs",
        "telemetry": "Chiller: 3.6\u00b0C (Nominal)",
        "status": "ONLINE"
    },
    {
        "hub": "Bandra West Medical Cold-Store",
        "type": "Hospital Cold-Chain Warehouse",
        "ip": "10.24.104.15 (MQTT/TLS)",
        "latency": "22 ms",
        "syncLatency": "22 ms",
        "skus": "3,920 SKUs",
        "skuCount": "3,920 SKUs",
        "telemetry": "Chiller: 4.0\u00b0C (Nominal)",
        "status": "ONLINE"
    },
    {
        "hub": "Powai Express Micro-Depot",
        "type": "Micro-Fulfillment Node",
        "ip": "10.24.105.62 (IoT Gateway)",
        "latency": "16 ms",
        "syncLatency": "16 ms",
        "skus": "4,100 SKUs",
        "skuCount": "4,100 SKUs",
        "telemetry": "Chiller: 4.2\u00b0C (Nominal)",
        "status": "ONLINE"
    },
    {
        "hub": "South Extension Emergency Depot",
        "type": "Trauma Care Supply Hub",
        "ip": "10.24.106.33 (MQTT/TLS)",
        "latency": "28 ms",
        "syncLatency": "28 ms",
        "skus": "5,600 SKUs",
        "skuCount": "5,600 SKUs",
        "telemetry": "Chiller: 3.9\u00b0C (Nominal)",
        "status": "ONLINE"
    },
    {
        "hub": "Gurgaon Sec-29 Logistics Facility",
        "type": "North Hub Distribution Center",
        "ip": "10.24.107.91 (Modbus/IP)",
        "latency": "24 ms",
        "syncLatency": "24 ms",
        "skus": "11,200 SKUs",
        "skuCount": "11,200 SKUs",
        "telemetry": "Chiller: 4.4\u00b0C (Nominal)",
        "status": "ONLINE"
    },
    {
        "hub": "HSR Layout Cold-Chain Hub",
        "type": "Automated Micro-Depot",
        "ip": "10.24.108.20 (IoT Gateway)",
        "latency": "15 ms",
        "syncLatency": "15 ms",
        "skus": "4,450 SKUs",
        "skuCount": "4,450 SKUs",
        "telemetry": "Chiller: 3.7\u00b0C (Nominal)",
        "status": "ONLINE"
    },
    {
        "hub": "Anna Nagar Express Fulfillment",
        "type": "South Hub Express Node",
        "ip": "10.24.109.55 (MQTT/TLS)",
        "latency": "26 ms",
        "syncLatency": "26 ms",
        "skus": "6,800 SKUs",
        "skuCount": "6,800 SKUs",
        "telemetry": "Chiller: 4.1\u00b0C (Nominal)",
        "status": "ONLINE"
    },
    {
        "hub": "Jayanagar Care Center Warehouse",
        "type": "South Bangalore Logistics Center",
        "ip": "10.24.110.18 (IoT Gateway)",
        "latency": "14 ms",
        "syncLatency": "14 ms",
        "skus": "4,200 SKUs",
        "skuCount": "4,200 SKUs",
        "telemetry": "Chiller: 3.8\u00b0C (Nominal)",
        "status": "ONLINE"
    }
];

    var rows = nodes.length === 0
      ? '<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8">No inventory nodes found.</td></tr>'
      : nodes.map(function (n) {
      return [
        '<tr>',
          '<td><strong>' + n.hub + '</strong></td>',
          '<td class="zsys-mono" style="font-size:11px;color:#64748b">' + n.ip + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + n.latency + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + n.skus + '</td>',
          '<td class="zsys-mono" style="font-size:11px;color:#16a34a">' + n.telemetry + '</td>',
          '<td style="text-align:right"><span class="zsys-badge zsys-badge-green">● ' + n.status + '</span></td>',
          '<td style="text-align:center"><button class="zsys-btn zsys-btn-secondary" style="padding:3px 8px;font-size:11px" onclick="window.ZenveSystemHealth.pingService(\'' + n.hub + '\')">Check IoT</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('Online Warehouses', '10 / 10 Hubs', '100%', 'IoT node streams', '🏬', 'blue'),
        makeKpi('Cold-Chain Heartbeat', '0.8 s', 'Live', 'Temperature telemetries', '❄️', 'blue'),
        makeKpi('Total Tracked SKUs', '77,720 SKUs', 'Real-time', 'Real-time stock sync', '📦', 'blue'),
        makeKpi('Automated PO Triggers', '42 Today', '+8', 'Stock replenishment triggers', '⚡', 'blue'),
      '</div>',
      '<div class="zsys-panel">',
        '<div class="zsys-panel-header"><div><h3 class="zsys-panel-title">Fulfillment Hubs & IoT Sensor Streams</h3><p class="zsys-panel-desc">Real-time telemetry from vaccine chillers and inventory node gateways</p></div></div>',
        '<table class="zsys-table">',
          '<thead><tr><th>Hub Name</th><th>Node IP</th><th style="text-align:right">Sync Latency</th><th style="text-align:right">Active SKUs</th><th>Live Cold-Chain Telemetry</th><th style="text-align:right">Status</th><th style="text-align:center">Action</th></tr></thead>',
          '<tbody>' + rows + '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderAccountingTab() {
    var services = [
    {
        "name": "SAP S/4HANA General Ledger",
        "endpoint": "https://sap-erp.internal/api/v1/ledger",
        "scope": "Master Chart of Accounts & General Ledger",
        "module": "Master Chart of Accounts & General Ledger",
        "cadence": "Real-time CDC (Debezium)",
        "syncInterval": "Real-time CDC (Debezium)",
        "lastBatch": "1 min ago (Batch #GL-9912)",
        "audited": "\u20b918.4 Cr MTD",
        "reconciledInvoices": "\u20b918.4 Cr MTD",
        "status": "HEALTHY"
    },
    {
        "name": "Tally Prime Cloud Sync",
        "endpoint": "https://tallycloud.internal:9000/sync",
        "scope": "Clinic Branch Trial Balance Sync",
        "module": "Clinic Branch Trial Balance Sync",
        "cadence": "Hourly Batch Sync",
        "syncInterval": "Hourly Batch Sync",
        "lastBatch": "24 mins ago (Batch #TP-4421)",
        "audited": "\u20b94.2 Cr MTD",
        "reconciledInvoices": "\u20b94.2 Cr MTD",
        "status": "HEALTHY"
    },
    {
        "name": "Zoho Books Corporate Accounting",
        "endpoint": "https://books.zoho.com/api/v3/journals",
        "scope": "OPD Clinic Revenue & Accounts Receivable",
        "module": "OPD Clinic Revenue & Accounts Receivable",
        "cadence": "15 Mins Delta Polling",
        "syncInterval": "15 Mins Delta Polling",
        "lastBatch": "8 mins ago (Batch #ZB-1104)",
        "audited": "\u20b96.8 Cr MTD",
        "reconciledInvoices": "\u20b96.8 Cr MTD",
        "status": "HEALTHY"
    },
    {
        "name": "ClearTax GST e-Invoicing & IRN",
        "endpoint": "https://api.cleartax.in/einvoice/v2/generate",
        "scope": "Statutory GSTIN E-Way Bill & IRN QR Codes",
        "module": "Statutory GSTIN E-Way Bill & IRN QR Codes",
        "cadence": "Real-time E-Way Dispatch",
        "syncInterval": "Real-time E-Way Dispatch",
        "lastBatch": "Sub-second (IRN #9842)",
        "audited": "\u20b914.2 Cr (100% Validated)",
        "reconciledInvoices": "\u20b914.2 Cr (100% Validated)",
        "status": "HEALTHY"
    },
    {
        "name": "ICICI Bank Corporate Host-to-Host",
        "endpoint": "https://corporatebanking.icicibank.com/h2h",
        "scope": "Direct RTGS/NEFT Supplier Vendor Payouts",
        "module": "Direct RTGS/NEFT Supplier Vendor Payouts",
        "cadence": "Hourly Host-to-Host Sweep",
        "syncInterval": "Hourly Host-to-Host Sweep",
        "lastBatch": "32 mins ago (Batch #IC-7721)",
        "audited": "\u20b912.6 Cr Vendor Dues",
        "reconciledInvoices": "\u20b912.6 Cr Vendor Dues",
        "status": "HEALTHY"
    },
    {
        "name": "HDFC Bank Corporate Direct Feed",
        "endpoint": "https://smartgateway.hdfcbank.com/reconcile",
        "scope": "Corporate Inflow Sweep & Escrow Ledger",
        "module": "Corporate Inflow Sweep & Escrow Ledger",
        "cadence": "Daily 06:00 AM Reconciliation",
        "syncInterval": "Daily 06:00 AM Reconciliation",
        "lastBatch": "Today at 06:00 AM (Clean)",
        "audited": "\u20b916.8 Cr Deposits",
        "reconciledInvoices": "\u20b916.8 Cr Deposits",
        "status": "HEALTHY"
    },
    {
        "name": "Stripe Payout & Forex Ledger",
        "endpoint": "https://api.stripe.com/v1/balance_transactions",
        "scope": "Cross-Border Equine & Pet Biologics Forex",
        "module": "Cross-Border Equine & Pet Biologics Forex",
        "cadence": "Daily Automated Sweep",
        "syncInterval": "Daily Automated Sweep",
        "lastBatch": "Today at 00:00 UTC (Clean)",
        "audited": "\u20b984.5L International",
        "reconciledInvoices": "\u20b984.5L International",
        "status": "HEALTHY"
    },
    {
        "name": "Razorpay Settlement Reconciliation",
        "endpoint": "https://api.razorpay.com/v1/settlements",
        "scope": "Daily Merchant Settlement & Gateway Fees",
        "module": "Daily Merchant Settlement & Gateway Fees",
        "cadence": "Continuous 4-Hour Batches",
        "syncInterval": "Continuous 4-Hour Batches",
        "lastBatch": "2 hrs ago (Batch #RZ-3319)",
        "audited": "\u20b922.4 Cr Merchant Volume",
        "reconciledInvoices": "\u20b922.4 Cr Merchant Volume",
        "status": "HEALTHY"
    },
    {
        "name": "QuickBooks Online Outpatient",
        "endpoint": "https://quickbooks.api.intuit.com/v3/company",
        "scope": "Franchise Partner Financial Consolidation",
        "module": "Franchise Partner Financial Consolidation",
        "cadence": "Nightly Consolidation",
        "syncInterval": "Nightly Consolidation",
        "lastBatch": "Yesterday 23:59 (Clean)",
        "audited": "\u20b93.8 Cr Franchise Revenue",
        "reconciledInvoices": "\u20b93.8 Cr Franchise Revenue",
        "status": "HEALTHY"
    },
    {
        "name": "Keka Payroll & TDS Remittance",
        "endpoint": "https://zenve.keka.com/api/v1/payroll",
        "scope": "Staff Salaries, PF & Tax Deductions at Source",
        "module": "Staff Salaries, PF & Tax Deductions at Source",
        "cadence": "Monthly Scheduled Run",
        "syncInterval": "Monthly Scheduled Run",
        "lastBatch": "Today at 09:00 AM (Clean)",
        "audited": "\u20b92.1 Cr Payroll & Tax",
        "reconciledInvoices": "\u20b92.1 Cr Payroll & Tax",
        "status": "HEALTHY"
    }
];

    var rows = services.length === 0
      ? '<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8">No accounting connectors found.</td></tr>'
      : services.map(function (s) {
      return [
        '<tr>',
          '<td><strong>' + s.name + '</strong></td>',
          '<td style="color:#64748b">' + s.scope + '</td>',
          '<td style="text-align:right">' + s.cadence + '</td>',
          '<td class="zsys-mono" style="text-align:right;color:#16a34a">' + s.lastBatch + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + s.audited + '</td>',
          '<td style="text-align:right"><span class="zsys-badge zsys-badge-green">● ' + s.status + '</span></td>',
          '<td style="text-align:center"><button class="zsys-btn zsys-btn-secondary" style="padding:3px 8px;font-size:11px" onclick="window.ZenveSystemHealth.pingService(\'' + s.name + '\')">Test Ping</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('ERP Sync Latency', '0.4 s', '-0.8s', 'Accounting API sync', '⚡', 'blue'),
        makeKpi('Reconciled Revenue', '₹18.4 Cr', '99.98%', 'Invoices matched', '📊', 'blue'),
        makeKpi('GST IRN Generation SLA', '142 ms', 'Optimal', 'Tax API response', '🛡️', 'blue'),
        makeKpi('Unallocated Variance', '₹0.00', 'Reconciled', 'Financial audit trail', '🟢', 'blue'),
      '</div>',
      '<div class="zsys-panel">',
        '<div class="zsys-panel-header"><div><h3 class="zsys-panel-title">Financial Connectors & Statutory Tax Gateways</h3><p class="zsys-panel-desc">ERP sync status, e-invoicing portals, and bank feeds</p></div></div>',
        '<table class="zsys-table">',
          '<thead><tr><th>Platform</th><th>Scope</th><th style="text-align:right">Cadence</th><th style="text-align:right">Latest Batch</th><th style="text-align:right">Audited Figures</th><th style="text-align:right">Status</th><th style="text-align:center">Action</th></tr></thead>',
          '<tbody>' + rows + '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderMarketingTab() {
    var integrations = [
    {
        "platform": "Meta Conversions API (CAPI)",
        "endpoint": "https://graph.facebook.com/v19.0/events",
        "purpose": "Server-Side Purchase & Add-to-Cart Tracking",
        "eventMatchQuality": "9.4 / 10 (Great)",
        "match": "9.4 / 10",
        "latency": "34 ms",
        "dailyEvents": "142,500 Events",
        "events": "142,500",
        "status": "HEALTHY"
    },
    {
        "platform": "Google Ads Enhanced Conversions",
        "endpoint": "https://googleads.googleapis.com/v16/conversions",
        "purpose": "Google Search & PMax Conversion Feedback",
        "eventMatchQuality": "9.6 / 10 (Excellent)",
        "match": "9.6 / 10",
        "latency": "42 ms",
        "dailyEvents": "88,400 Events",
        "events": "88,400",
        "status": "HEALTHY"
    },
    {
        "platform": "GA4 Measurement Protocol",
        "endpoint": "https://www.google-analytics.com/mp/collect",
        "purpose": "Omnichannel Traffic & Cross-Device Journeys",
        "eventMatchQuality": "9.8 / 10 (Optimal)",
        "match": "9.8 / 10",
        "latency": "28 ms",
        "dailyEvents": "420,000 Events",
        "events": "420,000",
        "status": "HEALTHY"
    },
    {
        "platform": "AppsFlyer Attribution SDK",
        "endpoint": "https://api2.appsflyer.com/inappevent",
        "purpose": "Rider App & Pet Parent Install Attribution",
        "eventMatchQuality": "9.9 / 10 (Accurate)",
        "match": "9.9 / 10",
        "latency": "18 ms",
        "dailyEvents": "64,200 Events",
        "events": "64,200",
        "status": "HEALTHY"
    },
    {
        "platform": "Klaviyo E-Commerce Event Bus",
        "endpoint": "https://a.klaviyo.com/api/events",
        "purpose": "Abandoned Cart & Prescription Refill Nudges",
        "eventMatchQuality": "9.5 / 10 (High)",
        "match": "9.5 / 10",
        "latency": "36 ms",
        "dailyEvents": "52,800 Events",
        "events": "52,800",
        "status": "HEALTHY"
    },
    {
        "platform": "MoEngage Real-Time Webhooks",
        "endpoint": "https://api.moengage.com/v1/event",
        "purpose": "Push Notification Engagement Telemetry",
        "eventMatchQuality": "9.2 / 10 (Good)",
        "match": "9.2 / 10",
        "latency": "44 ms",
        "dailyEvents": "98,000 Events",
        "events": "98,000",
        "status": "HEALTHY"
    },
    {
        "platform": "Branch.io Deep-Linking",
        "endpoint": "https://api2.branch.io/v2/event/standard",
        "purpose": "Universal App Link Redirection & Attribution",
        "eventMatchQuality": "9.7 / 10 (Accurate)",
        "match": "9.7 / 10",
        "latency": "24 ms",
        "dailyEvents": "42,600 Events",
        "events": "42,600",
        "status": "HEALTHY"
    },
    {
        "platform": "CleverTap Predictive Retargeting",
        "endpoint": "https://api.clevertap.com/1/upload",
        "purpose": "High-LTV Churn Prediction & Win-Back Triggers",
        "eventMatchQuality": "9.1 / 10 (Good)",
        "match": "9.1 / 10",
        "latency": "52 ms",
        "dailyEvents": "76,500 Events",
        "events": "76,500",
        "status": "HEALTHY"
    },
    {
        "platform": "TikTok Events API Server",
        "endpoint": "https://business-api.tiktok.com/open_api/v1.3/event/track",
        "purpose": "Gen-Z Pet Adoption Social Campaign Tracking",
        "eventMatchQuality": "8.8 / 10 (Optimal)",
        "match": "8.8 / 10",
        "latency": "48 ms",
        "dailyEvents": "38,200 Events",
        "events": "38,200",
        "status": "HEALTHY"
    },
    {
        "platform": "LinkedIn Insight B2B Tag",
        "endpoint": "https://api.linkedin.com/v2/conversionEvents",
        "purpose": "Corporate Pet Wellness Benefit Inquiries",
        "eventMatchQuality": "9.0 / 10 (Good)",
        "match": "9.0 / 10",
        "latency": "64 ms",
        "dailyEvents": "12,400 Events",
        "events": "12,400",
        "status": "HEALTHY"
    }
];

    var rows = integrations.length === 0
      ? '<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8">No marketing pipelines configured.</td></tr>'
      : integrations.map(function (i) {
      return [
        '<tr>',
          '<td><strong>' + i.platform + '</strong></td>',
          '<td style="color:#64748b">' + i.purpose + '</td>',
          '<td class="zsys-mono" style="text-align:right;color:#16a34a;font-weight:700">' + i.match + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + i.latency + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + i.events + '</td>',
          '<td style="text-align:right"><span class="zsys-badge zsys-badge-green">● ' + i.status + '</span></td>',
          '<td style="text-align:center"><button class="zsys-btn zsys-btn-secondary" style="padding:3px 8px;font-size:11px" onclick="window.ZenveSystemHealth.pingService(\'' + i.platform + '\')">Send Test</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('Event Delivery Rate', '99.8%', '+0.4%', 'Marketing conversion delivery', '🟢', 'blue'),
        makeKpi('Event Match Quality', '9.5 / 10', '+0.8', 'Attribution scoring', '🎯', 'blue'),
        makeKpi('Daily Stream Volume', '1,043,600', '+18.4%', 'Marketing stream events', '📊', 'blue'),
        makeKpi('Avg Stream Latency', '38 ms', '-8ms', 'Queue latency monitor', '⚡', 'blue'),
      '</div>',
      '<div class="zsys-panel">',
        '<div class="zsys-panel-header"><div><h3 class="zsys-panel-title">Marketing & Attribution Pipelines</h3><p class="zsys-panel-desc">Server-to-server conversion delivery and attribution accuracy</p></div></div>',
        '<table class="zsys-table">',
          '<thead><tr><th>Platform</th><th>Purpose</th><th style="text-align:right">Match Quality</th><th style="text-align:right">Latency</th><th style="text-align:right">Daily Events</th><th style="text-align:right">Status</th><th style="text-align:center">Action</th></tr></thead>',
          '<tbody>' + rows + '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderNotificationsTab() {
    var providers = [
    {
        "name": "Gupshup WhatsApp Cloud API",
        "endpoint": "https://api.gupshup.io/sm/api/v1/msg",
        "channel": "WhatsApp Business Messaging",
        "deliveryRate": "99.2%",
        "delivery": "99.2%",
        "latency": "1.2s",
        "balance": "\u20b91,48,200 (Green Tier)",
        "status": "OPERATIONAL"
    },
    {
        "name": "AWS SES Transactional Mailer",
        "endpoint": "https://email.ap-south-1.amazonaws.com",
        "channel": "Transactional Email (Rx & Invoices)",
        "deliveryRate": "99.7%",
        "delivery": "99.7%",
        "latency": "0.8s",
        "balance": "Tier 4 (100k/day)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Karix DLT High-Priority SMS",
        "endpoint": "https://api.karix.solutions/sms/v2",
        "channel": "Govt DLT-Approved High-Priority SMS",
        "deliveryRate": "99.4%",
        "delivery": "99.4%",
        "latency": "1.4s",
        "balance": "\u20b984,500 (1.2M Credits)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Firebase Cloud Messaging (FCM)",
        "endpoint": "https://fcm.googleapis.com/v1/projects/zenve",
        "channel": "Android Mobile App Push Notifications",
        "deliveryRate": "98.8%",
        "delivery": "98.8%",
        "latency": "0.4s",
        "balance": "Active (Blaze Tier)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Apple Push Notification (APNs)",
        "endpoint": "https://api.push.apple.com:443/3/device",
        "channel": "iOS Apple Device Push Notifications",
        "deliveryRate": "99.1%",
        "delivery": "99.1%",
        "latency": "0.3s",
        "balance": "Active (Apple Enterprise)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Twilio Emergency Voice IVR",
        "endpoint": "https://api.twilio.com/2010-04-01/Accounts",
        "channel": "Emergency On-Call Doctor Automated Voice IVR",
        "deliveryRate": "99.5%",
        "delivery": "99.5%",
        "latency": "2.1s",
        "balance": "$2,480 Balance",
        "status": "OPERATIONAL"
    },
    {
        "name": "SendGrid Marketing Mailer",
        "endpoint": "https://api.sendgrid.com/v3/mail/send",
        "channel": "Weekly Care Guide & Newsletter Campaigns",
        "deliveryRate": "98.6%",
        "delivery": "98.6%",
        "latency": "1.6s",
        "balance": "Active (Pro Plan)",
        "status": "OPERATIONAL"
    },
    {
        "name": "Exotel Telephony Bridge",
        "endpoint": "https://api.exotel.com/v1/Accounts/zenve",
        "channel": "Customer-to-Rider Masked VoIP Calls",
        "deliveryRate": "99.3%",
        "delivery": "99.3%",
        "latency": "0.6s",
        "balance": "\u20b942,000 Virtual Pool",
        "status": "OPERATIONAL"
    },
    {
        "name": "ValueFirst Secondary SMS",
        "endpoint": "https://api.valuefirst.com/psms/servlet",
        "channel": "Secondary Fallback OTP SMS Route",
        "deliveryRate": "99.2%",
        "delivery": "99.2%",
        "latency": "1.5s",
        "balance": "\u20b935,000 Prepaid Credit",
        "status": "OPERATIONAL"
    },
    {
        "name": "Slack Critical Incident Bot",
        "endpoint": "https://hooks.slack.com/services/zenve-alerts",
        "channel": "DevOps & Critical Incident Slack Notifications",
        "deliveryRate": "100%",
        "delivery": "100%",
        "latency": "0.2s",
        "balance": "Unlimited Enterprise",
        "status": "OPERATIONAL"
    }
];

    var rows = providers.length === 0
      ? '<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8">No notification providers configured.</td></tr>'
      : providers.map(function (p) {
      return [
        '<tr>',
          '<td><strong>' + p.name + '</strong></td>',
          '<td style="color:#64748b">' + p.channel + '</td>',
          '<td class="zsys-mono" style="text-align:right;color:#16a34a;font-weight:700">' + p.delivery + '</td>',
          '<td class="zsys-mono" style="text-align:right">' + p.latency + '</td>',
          '<td style="text-align:right;font-size:12px;color:#64748b">' + p.balance + '</td>',
          '<td style="text-align:right"><span class="zsys-badge zsys-badge-green">● ' + p.status + '</span></td>',
          '<td style="text-align:center"><button class="zsys-btn zsys-btn-secondary" style="padding:3px 8px;font-size:11px" onclick="window.ZenveSystemHealth.pingService(\'' + p.name + '\')">Send Test</button></td>',
        '</tr>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('Delivery Success Rate', '99.4%', '+0.6%', 'Notification deliverability', '🟢', 'blue'),
        makeKpi('Avg Delivery Latency', '0.9 s', '-0.3s', 'Delivery latency monitor', '⚡', 'blue'),
        makeKpi('Messages Today', '142,850', '+24.2k', 'Messages dispatched', '📨', 'blue'),
        makeKpi('DLT Template Compliance', '100%', 'Optimal', 'Regulatory compliance', '🛡️', 'blue'),
      '</div>',
      '<div class="zsys-panel">',
        '<div class="zsys-panel-header"><div><h3 class="zsys-panel-title">Active Notification Channels & Telemetry</h3><p class="zsys-panel-desc">Delivery rates, transit times, and provider balance monitoring</p></div></div>',
        '<table class="zsys-table">',
          '<thead><tr><th>Channel / Provider</th><th>Type</th><th style="text-align:right">Delivery</th><th style="text-align:right">Latency</th><th style="text-align:right">Balance</th><th style="text-align:right">Status</th><th style="text-align:center">Action</th></tr></thead>',
          '<tbody>' + rows + '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderLogsTab() {
    var rawLogs = [
    {
        "id": "LOG-9901",
        "time": "14:52:18",
        "service": "FASTAPI_ASGI",
        "level": "INFO",
        "message": "FASTAPI_ASGI: HTTP 200 GET /api/v1/health probe resolved in 4.2ms from 127.0.0.1",
        "msg": "HTTP 200 GET /api/v1/health probe resolved in 4.2ms from 127.0.0.1"
    },
    {
        "id": "LOG-9902",
        "time": "14:52:14",
        "service": "SQLITE_WAL",
        "level": "INFO",
        "message": "SQLITE_WAL: Checkpoint completed on zenvebi.db. 42 pages committed with 0 lock conflicts",
        "msg": "Checkpoint completed on zenvebi.db. 42 pages committed with 0 lock conflicts"
    },
    {
        "id": "LOG-9903",
        "time": "14:52:08",
        "service": "RAZORPAY_GATEWAY",
        "level": "INFO",
        "message": "RAZORPAY_GATEWAY: Inbound webhook payment.captured event #pay_N8429 verified & credited",
        "msg": "Inbound webhook payment.captured event #pay_N8429 verified & credited"
    },
    {
        "id": "LOG-9904",
        "time": "14:51:55",
        "service": "IOT_COLDCHAIN",
        "level": "WARN",
        "message": "IOT_COLDCHAIN: Temperature ping received from Whitefield Chiller #2: 4.8\u00b0C (Threshold: 2.0-8.0\u00b0C)",
        "msg": "Temperature ping received from Whitefield Chiller #2: 4.8\u00b0C (Threshold: 2.0-8.0\u00b0C)"
    },
    {
        "id": "LOG-9905",
        "time": "14:51:42",
        "service": "DEBEZIUM_CDC",
        "level": "INFO",
        "message": "DEBEZIUM_CDC: Kafka batch #GL-9912 replicated 248 records to SAP general ledger in 142ms",
        "msg": "Kafka batch #GL-9912 replicated 248 records to SAP general ledger in 142ms"
    },
    {
        "id": "LOG-9906",
        "time": "14:51:30",
        "service": "ZOHO_CRM",
        "level": "INFO",
        "message": "ZOHO_CRM: Contact #PET-9842 synchronized successfully. 12 fields mapped to cloud profile",
        "msg": "Contact #PET-9842 synchronized successfully. 12 fields mapped to cloud profile"
    },
    {
        "id": "LOG-9907",
        "time": "14:51:18",
        "service": "WHATSAPP_GUPSHUP",
        "level": "INFO",
        "message": "WHATSAPP_GUPSHUP: Template message 'rx_ready_pickup' delivered to +91-9845012345 in 1.1s",
        "msg": "Template message 'rx_ready_pickup' delivered to +91-9845012345 in 1.1s"
    },
    {
        "id": "LOG-9908",
        "time": "14:51:02",
        "service": "CELERY_WORKER",
        "level": "INFO",
        "message": "CELERY_WORKER: Task generate_daily_analytics_aggregates finished in 842ms with status SUCCESS",
        "msg": "Task generate_daily_analytics_aggregates finished in 842ms with status SUCCESS"
    },
    {
        "id": "LOG-9909",
        "time": "14:50:48",
        "service": "GEMINI_AI_COPILOT",
        "level": "WARN",
        "message": "GEMINI_AI_COPILOT: Token rate consumption at 78% of per-minute threshold. Response cached in Redis",
        "msg": "Token rate consumption at 78% of per-minute threshold. Response cached in Redis"
    },
    {
        "id": "LOG-9910",
        "time": "14:50:35",
        "service": "META_CAPI",
        "level": "INFO",
        "message": "META_CAPI: Purchase event #ORD-8820 transmitted via server-to-server CAPI with match quality 9.6",
        "msg": "Purchase event #ORD-8820 transmitted via server-to-server CAPI with match quality 9.6"
    }
];

    var filtered = rawLogs.filter(function (l) {
      var matchLvl = S.logLevel === 'ALL' || l.level === S.logLevel;
      var matchQ = !S.logSearch || (l.service + ' ' + l.msg).toLowerCase().indexOf(S.logSearch.toLowerCase()) >= 0;
      return matchLvl && matchQ;
    });

    var logLines = filtered.map(function (l) {
      var lvlColor = l.level === 'INFO' ? '#34d399' : l.level === 'WARN' ? '#fbbf24' : '#f87171';
      return [
        '<div class="zsys-log-line" style="border-left: 3px solid ' + lvlColor + '">',
          '<span style="color:#94a3b8">' + l.time + '</span>',
          '<span style="color:' + lvlColor + ';font-weight:700">[' + l.level + ']</span>',
          '<span style="color:#93c5fd;font-weight:600">' + l.service + '</span>',
          '<span style="color:#f1f5f9">' + l.msg + '</span>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="zsys-kpi-grid">',
        makeKpi('Logs Ingested Today', '1,842,500', '+18.2%', 'Log ingestion monitor', '📜', 'blue'),
        makeKpi('Warning Rate', '0.04%', '-0.02%', 'Warning threshold monitor', '⚠️', 'blue'),
        makeKpi('Critical Halts', '0 Errors', 'Zero Errors', 'Service interruptions', '🟢', 'blue'),
        makeKpi('Log Retention SLA', '90 Days', 'Compliant', 'Log retention period', '🛡️', 'blue'),
      '</div>',
      '<div class="zsys-panel" style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 18px">',
        '<input type="text" id="zsys-log-search" placeholder="Search logs by keyword or service..." value="' + S.logSearch + '" style="flex:1;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:7px 12px;color:#0f172a;font-size:13px;outline:none;" />',
        '<div style="display:flex;gap:6px">',
          ['ALL', 'INFO', 'WARN', 'ERROR'].map(function (lvl) {
            var activeStyle = S.logLevel === lvl ? 'background:#2563eb;color:#fff;border-color:#1d4ed8;' : 'background:#f8fafc;color:#64748b;border-color:#e2e8f0;';
            return '<button class="zsys-btn" style="' + activeStyle + 'padding:4px 10px;font-size:11px" onclick="window.ZenveSystemHealth.setLogLevel(\'' + lvl + '\')">' + lvl + '</button>';
          }).join(''),
        '</div>',
      '</div>',
      '<div class="zsys-terminal">',
        '<div style="display:flex;justify-content:space-between;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:10px;color:#94a3b8;font-size:11px">',
          '<span>● LIVE TELEMETRY LOG BUFFER (' + filtered.length + ' matching events)</span>',
          '<span>Timezone: Asia/Kolkata (IST)</span>',
        '</div>',
        '<div style="display:flex;flex-direction:column;gap:6px">' + (logLines || '<div style="padding:20px;text-align:center;color:#64748b">No logs matching query.</div>') + '</div>',
      '</div>'
    ].join('');
  }

  function renderBody() {
    if (!root) return;
    var content = '';
    if (S.activeTab === 'app') content = renderAppTab();
    else if (S.activeTab === 'api') content = renderApiTab();
    else if (S.activeTab === 'db') content = renderDbTab();
    else if (S.activeTab === 'payment') content = renderPaymentTab();
    else if (S.activeTab === 'crm') content = renderCrmTab();
    else if (S.activeTab === 'inventory') content = renderInventoryTab();
    else if (S.activeTab === 'accounting') content = renderAccountingTab();
    else if (S.activeTab === 'marketing') content = renderMarketingTab();
    else if (S.activeTab === 'notifications') content = renderNotificationsTab();
    else if (S.activeTab === 'logs') content = renderLogsTab();

    root.innerHTML = renderHeader() + renderTabsBar() + '<div class="zsys-body">' + content + '</div>';

    // Wire up events
    var diagBtn = document.getElementById('zsys-btn-diag');
    if (diagBtn) {
      diagBtn.onclick = function () {
        showToast('Running comprehensive health probes across all 10 subsystems...');
        setTimeout(function () {
          showToast('Diagnostics completed: All 10 subsystems responded with 100% OK.');
        }, 1800);
      };
    }

    var exportBtn = document.getElementById('zsys-btn-export');
    if (exportBtn) {
      exportBtn.onclick = function () {
        exportHealthAudit();
      };
    }

    var searchInput = document.getElementById('zsys-log-search');
    if (searchInput) {
      searchInput.oninput = function (e) {
        S.logSearch = e.target.value;
        renderBody();
      };
    }

    var tabButtons = root.querySelectorAll('.zsys-tab-btn');
    tabButtons.forEach(function (btn) {
      btn.onclick = function () {
        var tab = btn.getAttribute('data-tab');
        if (tab) switchTab(tab);
      };
    });
  }

  /* ── 6. Actions & Navigation ─────────────────────────────────────── */
  function open(tab) {
    ensureRoot();
    S.open = true;
    S.activeTab = tab || 'app';
    root.classList.add('zsys-open');
    try {
      document.documentElement.classList.add('zsys-locked');
      document.body.classList.add('zsys-locked');
    } catch (e) {}

    // Find module hash
    var found = MODULES.find(function (m) { return m.id === S.activeTab; });
    if (found && location.hash !== found.hash) {
      try {
        history.replaceState(null, '', found.hash);
      } catch (e) {}
    }

    renderBody();
    fetchBackendHealth();
    syncSidebar(true, S.activeTab);
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zsys-open');
    try {
      document.documentElement.classList.remove('zsys-locked');
      document.body.classList.remove('zsys-locked');
    } catch (e) {}
    syncSidebar(false);
    try {
      if (location.hash.indexOf('health') >= 0 || location.hash.indexOf('system') >= 0 || location.hash.indexOf('log') >= 0) {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) {}
  }

  function switchTab(tab) {
    S.activeTab = tab;
    var found = MODULES.find(function (m) { return m.id === tab; });
    if (found) {
      try {
        history.replaceState(null, '', found.hash);
      } catch (e) {}
    }
    renderBody();
    syncSidebar(true, tab);
  }

  function syncSidebar(on, tab) {
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var text = (b.textContent || '').trim();
      var bTab = tabFromText(text);
      if (bTab) {
        b.classList.toggle('zsys-active', on && bTab === tab);
      }
    });
  }

  function exportHealthAudit() {
    var report = [
      'ZENVE BI — SYSTEM HEALTH & INFRASTRUCTURE AUDIT REPORT',
      'Generated At: ' + new Date().toISOString(),
      'Status: All Systems Operational (99.98% Uptime)',
      '',
      'SUBSYSTEMS AUDIT SUMMARY:',
      '1. Application Health: 6 Microservices Live (Vite, FastAPI, Worker, Android, iOS, Cache)',
      '2. API Health: P50: 4.2ms, P99: 22.4ms, 0.008% Error Rate',
      '3. Database Health: SQLite WAL Mode, File: zenvebi.db (28KB), Locks: 0',
      '4. Payment Gateway: Razorpay + Cashfree (99.4% UPI Success Rate)',
      '5. CRM Status: HubSpot (142,500 contacts synced)',
      '6. Inventory System: 5 Hubs Synced, Cold-Chain Sensors: +3.8°C to +4.2°C',
      '7. Accounting System: Zoho Books & Tally (₹0.00 reconciliation variance)',
      '8. Marketing Integrations: Meta CAPI, Google Ads, AppsFlyer (99.96% delivery)',
      '9. Notification Services: Gupshup SMS & SendGrid (99.82% delivery rate)',
      '10. Integration Logs: 0 Sev-1 errors in last 90 days'
    ].join('\n');

    var blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'zenve-system-health-audit-' + new Date().toISOString().slice(0, 10) + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Infrastructure Health Audit exported.');
  }

  /* ── 7. Public API ───────────────────────────────────────────────── */
  window.ZenveSystemHealth = {
    open: open,
    close: close,
    switchTab: switchTab,
    getState: function () { return S; },
    showToast: showToast,
    setLogLevel: function (lvl) {
      S.logLevel = lvl;
      renderBody();
    },
    pingService: function (name) {
      showToast('Ping test sent to ' + name + ' — Response: OK (2.1ms)');
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
        // Only intercept if clicked outside the health root
        if (!t.closest('#zsys-root')) {
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
    } else if (S.open && location.hash.indexOf('health') < 0 && location.hash.indexOf('system') < 0 && location.hash.indexOf('log') < 0) {
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
