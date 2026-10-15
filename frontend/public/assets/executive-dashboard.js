/* =====================================================================
   Zenve BI — Executive Dashboard & CEO Control Center Suite
   Subdomains (4):
     1. Executive Dashboard (#executive-dashboard / #executive)
     2. CEO Control Center   (#ceo-control-center)
     3. Business Overview    (#business-overview)
     4. KPI Dashboard        (#kpi-dashboard)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var TABS = [
    { id: 'dashboard',   label: 'Executive Dashboard', icon: '🏛️', hash: '#overview', badge: '', title: 'Zenve Executive Control Center', sub: 'Complete business intelligence for healthier, happier pets across all healthcare and commerce operations' },
    { id: 'ceo-control', label: 'CEO Control Center',  icon: '👔', hash: '#ceo-control-center',   badge: '', title: 'CEO Strategic Command & Governance', sub: 'Strategic enterprise OKRs, multi-entity performance pacing, capital allocation decisions, and risk governance sentinel' },
    { id: 'overview',    label: 'Business Overview',   icon: '📊', hash: '#business-overview',    badge: '', title: 'Business Overview & Segment Economics', sub: 'Multi-entity profit margins, geographic revenue distribution, and unit economics' },
    { id: 'kpi',         label: 'KPI Dashboard',       icon: '🎯', hash: '#kpi-dashboard',        badge: '', title: 'Master Enterprise KPI Scorecard', sub: 'Balanced scorecard covering financial, clinical quality, customer sentiment, and logistics' }
  ];

  var S = {
    open: false,
    tab: 'ceo-control'
  };

  var root = null;

  function redirectToHomeDashboard() {
    close();
    ['#zexec-root', '#zcust-root', '#zclinics-root', '#zpharma-root', '#zsales-root', '#zsettings-root'].forEach(function (sel) {
      var node = document.querySelector(sel);
      if (node) node.style.display = 'none';
    });
    document.documentElement.classList.remove('zexec-locked');
    document.body.classList.remove('zexec-locked');

    if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#overview') {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (err) {
        window.location.hash = '';
      }
    }

    var homeEl = document.getElementById('overview') || document.querySelector('main');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (window.ZenveSalesDropAnalysis && typeof window.ZenveSalesDropAnalysis.mount === 'function') {
      window.ZenveSalesDropAnalysis.mount();
    }
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('customer') >= 0 || h.indexOf('doctor') >= 0 || h.indexOf('ai') >= 0) {
      return null;
    }
    if (h === 'ceo-control-center' || h === 'ceo-control' || h === 'ceo' || h.indexOf('ceo') >= 0) return 'ceo-control';
    if (h === 'business-overview' || h === 'business') return 'overview';
    if (h === 'kpi-dashboard' || h === 'kpi' || h === 'kpis') return 'kpi';
    if (h === 'executive-dashboard' || h === 'executive' || h === 'exec-dashboard' || h === 'overview') {
      redirectToHomeDashboard();
      return null;
    }
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('doctor') >= 0 || raw.indexOf('ai') >= 0) return null;

    if (raw.indexOf('ceo control center') >= 0 || raw.indexOf('ceo control') >= 0 || raw === 'ceo') return 'ceo-control';
    if (raw.indexOf('business overview') >= 0) return 'overview';
    if (raw.indexOf('kpi dashboard') >= 0 || raw === 'kpis') return 'kpi';
    if (raw === 'executive dashboard' || raw === 'executive') return 'dashboard';
    return null;
  }

  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zexec-kpi">',
        '<div class="zexec-kpi-top">',
          '<span class="zexec-kpi-label">' + esc(label) + '</span>',
          '<span class="zexec-kpi-icon">' + esc(icon || '🏛️') + '</span>',
        '</div>',
        '<div class="zexec-kpi-val">' + esc(val) + '</div>',
        '<div class="zexec-kpi-bottom">',
          '<span class="zexec-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zexec-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExecutiveDashboard() {
    var segments = [
      { name: 'Pet Products & Nutrition', rev: '₹68.4L', pacing: '102.4%', margin: '28.6%', volume: '18,450 Orders', health: 'Outperforming' },
      { name: 'Veterinary Pharmacy & Rx', rev: '₹58.4L', pacing: '108.4%', margin: '34.8%', volume: '842 e-Rx Filled', health: 'Outperforming' },
      { name: 'Clinical Care & Surgeries', rev: '₹28.2L', pacing: '104.2%', margin: '62.4%', volume: '3,420 Consults', health: 'Healthy' },
      { name: 'Veterinary Diagnostics & Pathology', rev: '₹21.6L', pacing: '106.5%', margin: '58.2%', volume: '2,180 Lab Panels', health: 'Outperforming' },
      { name: 'Emergency & 24/7 ICU Trauma', rev: '₹16.5L', pacing: '112.0%', margin: '65.0%', volume: '480 Trauma Cases', health: 'High Growth' },
      { name: 'B2B Enterprise & Institutional', rev: '₹14.8L', pacing: '94.0%', margin: '22.4%', volume: '42 Accounts', health: 'Stable' },
      { name: 'Preventive Care Subscriptions & Wellness', rev: '₹12.8L', pacing: '118.5%', margin: '78.5%', volume: '8,420 Members', health: 'High Growth' },
      { name: 'Pet Grooming & Spa Services', rev: '₹9.4L', pacing: '97.2%', margin: '44.0%', volume: '1,260 Sessions', health: 'On Track' },
      { name: 'Pet Fashion, Travel & Lifestyle', rev: '₹8.4L', pacing: '98.5%', margin: '48.2%', volume: '1,840 Items', health: 'On Track' },
      { name: 'Digital Telehealth & Remote Monitoring', rev: '₹5.5L', pacing: '105.0%', margin: '82.0%', volume: '920 Tele-consults', health: 'High Growth' }
    ];

    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Consolidated Revenue (MTD)', '₹1.84 Cr', '+24.2% YoY', 'up', '₹1.72 Cr Net Recognized', '💰'),
        kpiHtml('Gross Profit Margin', '40.1%', '+1.6% vs benchmark', 'up', 'Blended enterprise margin', '📈'),
        kpiHtml('Active Healthcare Members', '42,850', '+1,840 this month', 'up', '94.2% engagement rate', '🐾'),
        kpiHtml('Operating EBITDA', '₹18.9L', '11.0% margin', 'up', '+₹3.2L vs forecast', '⚡'),
        kpiHtml('Clinical Consultations', '3,420', '98.5% fulfillment', 'up', '148 network veterinarians', '👨‍⚕️'),
        kpiHtml('Blended Customer CAC', '₹420', '-12.4% vs benchmark', 'up', '4.8x LTV/CAC ratio', '🎯'),
      '</div>',

      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Business Unit Financial Contribution</h3>',
            '<p class="zexec-card-sub">MTD performance breakdown across clinical, pharmaceutical, commerce, and diagnostic segments</p>',
          '</div>',
          '<span class="zexec-badge success">Audit Certified · 6 Units</span>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Business Segment</th>',
                '<th>MTD Revenue</th>',
                '<th>Target Pacing</th>',
                '<th>Gross Margin</th>',
                '<th>Active Volume</th>',
                '<th>Segment Health</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              segments.map(function(s) {
                return '<tr>' +
                  '<td><b>' + esc(s.name) + '</b></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#0f172a;">' + esc(s.rev) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#10b981;font-weight:600;">' + esc(s.pacing) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;font-weight:600;">' + esc(s.margin) + '</td>' +
                  '<td style="color:#64748b;">' + esc(s.volume) + '</td>' +
                  '<td><span class="zexec-badge ' + (s.health === 'Outperforming' || s.health === 'High Growth' ? 'success' : 'info') + '">' + esc(s.health) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCeoControlCenter() {
    var approved = S.approvedDecisions || {};

    var okrs = [
      { title: 'Multi-City Hospital Network Expansion', lead: 'Dr. Priya Sharma (VP Clinical)', current: '5 Hubs Operational', target: '5 Hubs', pct: 100, status: 'Completed', color: '#2563eb' },
      { title: '60-Minute Hyperlocal Delivery SLA', lead: 'Anand Kumar (Head of Logistics)', current: '96.8% On-Time', target: '95.0% SLA', pct: 102, status: 'Exceeded', color: '#10b981' },
      { title: 'Cold-Chain IoT Telemetry & Zero Spoilage', lead: 'Karthik S. (Chief Pharmacist)', current: '100% Sensors Online (4.1°C)', target: '100% Probes', pct: 100, status: 'Completed', color: '#06b6d4' },
      { title: 'Pet Care Preventive Wellness Subscriptions', lead: 'Deepa Nair (VP Growth)', current: '8,420 Active Subscribers', target: '10,000 Pets', pct: 84.2, status: 'On Track', color: '#8b5cf6' },
      { title: 'Blended Gross Margin Optimization', lead: 'Siddharth Roy (CFO)', current: '40.1% Margin', target: '38.5% Benchmark', pct: 104, status: 'Exceeded', color: '#10b981' },
      { title: 'Veterinary Specialist Retention & Culture', lead: 'Ananya Mehra (VP HR)', current: '95.4% Retention', target: '>92.0% Retention', pct: 104, status: 'On Track', color: '#10b981' },
      { title: 'Digital e-Prescriptions & VCI Audit Trail', lead: 'Dr. Rajesh K (Medical Director)', current: '842 MTD Signed e-Rx', target: '100% Verifiable', pct: 100, status: 'Completed', color: '#2563eb' },
      { title: 'LTV to CAC Ratio Optimization', lead: 'Rohan Mehra (VP Marketing)', current: '4.8x Ratio', target: '>4.2x Target', pct: 114, status: 'Exceeded', color: '#10b981' },
      { title: 'Direct Manufacturer Margin SRA Partnerships', lead: 'Vikram Sethi (VP Procurement)', current: '10 Partner Brands', target: '12 Brands', pct: 83.3, status: 'On Track', color: '#f59e0b' },
      { title: 'Emergency Trauma Triage Response Speed', lead: 'Dr. Sandeep Verma (Chief of Surgery)', current: '7.4 Mins Average', target: '<10 Mins Target', pct: 126, status: 'Exceeded', color: '#10b981' }
    ];

    var businessUnits = [
      { name: 'Pet Products & Nutrition', lead: 'Rahul Mehta', revenue: '₹68.4L', pacing: '102.4%', margin: '28.6%', growth: '+22.1% YoY', status: 'Outperforming' },
      { name: 'Veterinary Pharmacy & Rx', lead: 'Karthik S.', revenue: '₹58.4L', pacing: '108.4%', margin: '34.8%', growth: '+32.4% YoY', status: 'Outperforming' },
      { name: 'Clinical Care & Surgeries', lead: 'Dr. Priya Sharma', revenue: '₹28.2L', pacing: '104.2%', margin: '62.4%', growth: '+28.5% YoY', status: 'Healthy' },
      { name: 'Veterinary Diagnostics & Pathology', lead: 'Dr. Rajesh K', revenue: '₹21.6L', pacing: '106.5%', margin: '58.2%', growth: '+29.4% YoY', status: 'Outperforming' },
      { name: 'Emergency & 24/7 ICU Trauma', lead: 'Dr. Vikramaditya Rathore', revenue: '₹16.5L', pacing: '112.0%', margin: '65.0%', growth: '+35.2% YoY', status: 'High Growth' },
      { name: 'B2B Enterprise & Breeders', lead: 'Vikram Sethi', revenue: '₹14.8L', pacing: '94.0%', margin: '22.4%', growth: '+18.2% YoY', status: 'Stable' },
      { name: 'Preventive Care Subscriptions & Wellness', lead: 'Deepa Nair', revenue: '₹12.8L', pacing: '118.5%', margin: '78.5%', growth: '+54.0% YoY', status: 'High Growth' },
      { name: 'Pet Grooming & Spa Services', lead: 'Sneha Kapoor', revenue: '₹9.4L', pacing: '97.2%', margin: '44.0%', growth: '+14.5% YoY', status: 'On Track' },
      { name: 'Pet Fashion, Travel & Lifestyle', lead: 'Neha Kapur', revenue: '₹8.4L', pacing: '98.5%', margin: '48.2%', growth: '+16.8% YoY', status: 'On Track' },
      { name: 'Digital Telehealth & Remote Monitoring', lead: 'Dr. Divya Reddy', revenue: '₹5.5L', pacing: '105.0%', margin: '82.0%', growth: '+42.0% YoY', status: 'High Growth' }
    ];

    var decisions = [
      { id: 'DEC-2026-081', action: 'Capex Authorization: Automated Cold Reefer & Storage Expansion in Mumbai MMR Hub', owner: 'Anand Kumar (Logistics)', capital: '₹24.5L Capex', priority: 'High' },
      { id: 'DEC-2026-082', action: 'Board Ratification: Form 20/21 Statutory Schedule H Narcotic Register Protocol', owner: 'Karthik S. (Pharmacy)', capital: 'Statutory Policy', priority: 'Completed' },
      { id: 'DEC-2026-083', action: 'Lease Commitment: Electronic City 24/7 Veterinary Trauma Hospital Annex', owner: 'Dr. Priya Sharma (Clinical)', capital: '₹18.0L Annual Lease', priority: 'High' },
      { id: 'DEC-2026-084', action: 'Software Procurement: Multi-Region Cloud Disaster Recovery & DB Replication', owner: 'Tarun V. (Engineering)', capital: '₹8.2L / yr SaaS', priority: 'Medium' },
      { id: 'DEC-2026-085', action: 'Master SRA Contract: Direct Pharmaceutical Margin Terms with Zoetis India', owner: 'Vikram Sethi (Procurement)', capital: '₹45.0L Quarterly PO', priority: 'Completed' },
      { id: 'DEC-2026-086', action: 'Clinical ESOP Pool Allocation: Retention Incentives for Chief Surgeons', owner: 'Ananya Mehra (HR)', capital: '2.5% Equity Pool', priority: 'Approved' },
      { id: 'DEC-2026-087', action: 'Hyperlocal Fleet Underwriting: Group Accident Insurance for 120 Delivery Riders', owner: 'Anand Kumar (Logistics)', capital: '₹6.4L Annual Premium', priority: 'Completed' },
      { id: 'DEC-2026-088', action: 'Laboratory Equipment Lease: Advanced Hematology & PCR Thermal Cycler', owner: 'Dr. Rajesh K (Diagnostics)', capital: '₹14.2L Equipment', priority: 'Medium' },
      { id: 'DEC-2026-089', action: 'Enterprise Fulfillment Depot: 25,000 sq ft Logistics Hub in Bhiwandi Corridor', owner: 'Anand Kumar (Logistics)', capital: '₹32.0L Capex', priority: 'High' },
      { id: 'DEC-2026-090', action: 'Board Dividend & Retained Earnings: Q3 Operating Solvency Reinvestment Plan', owner: 'Siddharth Roy (CFO)', capital: '₹50.0L Retained', priority: 'Approved' }
    ];

    var capitalPillars = [
      { pillar: 'Hospital Facilities & Clinical Capex', allocation: '₹1.20 Cr', deployed: '₹84.5L', solvency: '2.8x Coverage' },
      { pillar: 'Working Capital (Formulary & Stock)', allocation: '₹80.0L', deployed: '₹52.4L', solvency: '3.4x Coverage' },
      { pillar: 'Technology & AI Infrastructure', allocation: '₹45.0L', deployed: '₹32.8L', solvency: '4.1x Coverage' },
      { pillar: 'Marketing & Pet Parent Acquisition', allocation: '₹35.0L', deployed: '₹24.2L', solvency: '3.8x Coverage' }
    ];

    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Consolidated Run Rate (ARR)', '₹22.1 Cr', '+28.5% YoY', 'up', 'Annualized revenue pacing', '🚀'),
        kpiHtml('Operating EBITDA Run Rate', '11.0%', '+1.4% QoQ', 'up', '₹2.27 Cr EBITDA run-rate', '📈'),
        kpiHtml('Liquid Treasury & Runway', '28 Months', '₹4.85 Cr in treasuries', 'up', 'Zero long-term debt', '🏦'),
        kpiHtml('Board OKR Execution', '95.2%', '9 of 10 On Track', 'up', 'Q3 Board Review Cycle', '🎯'),
        kpiHtml('Enterprise Headcount', '248 Staff', '148 Specialists', 'up', '95.4% retention rate', '👥'),
        kpiHtml('Blended Gross Margin', '40.1%', '+1.6% vs benchmark', 'up', 'Across all 6 divisions', '💎'),
      '</div>',

      /* Master OKRs Tracker */
      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Master Board OKR Execution Matrix (FY25-26)</h3>',
            '<p class="zexec-card-sub">Key strategic objectives and quarterly milestones monitored directly by the Office of the CEO</p>',
          '</div>',
          '<div style="display:flex;gap:8px;">',
            '<button class="zexec-btn" onclick="alert(\'Downloading OKR Executive Packet (PDF)...\')">📑 Export OKR Brief</button>',
            '<button class="zexec-btn primary" onclick="alert(\'Syncing OKR milestones with Enterprise Project Management Suite...\')">🔄 Sync Status</button>',
          '</div>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Strategic Objective</th>',
                '<th>Executive Lead</th>',
                '<th>Current Pacing</th>',
                '<th>Quarterly Target</th>',
                '<th>Confidence</th>',
                '<th>Status</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              okrs.map(function(okr) {
                return '<tr>' +
                  '<td><b>' + esc(okr.title) + '</b></td>' +
                  '<td style="color:#64748b;">' + esc(okr.lead) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#0f172a;">' + esc(okr.current) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#64748b;">' + esc(okr.target) + '</td>' +
                  '<td><span style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + okr.pct + '%</span></td>' +
                  '<td><span class="zexec-badge ' + (okr.status === 'Completed' || okr.status === 'Exceeded' ? 'success' : 'warn') + '">' + esc(okr.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      /* Multi-Entity Business Unit Pacing */
      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Business Unit Contribution & Strategic Pacing</h3>',
            '<p class="zexec-card-sub">Consolidated operational pacing and gross margins across Zenve operating entities</p>',
          '</div>',
          '<span class="zexec-badge success">All 6 Divisions Operating</span>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Business Segment</th>',
                '<th>Executive Lead</th>',
                '<th>MTD Revenue</th>',
                '<th>Target Pacing</th>',
                '<th>Gross Margin</th>',
                '<th>YoY Growth</th>',
                '<th>Strategic Status</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              businessUnits.map(function(bu) {
                return '<tr>' +
                  '<td><b>' + esc(bu.name) + '</b></td>' +
                  '<td style="color:#64748b;">' + esc(bu.lead) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#0f172a;">' + esc(bu.revenue) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#10b981;font-weight:600;">' + esc(bu.pacing) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;font-weight:600;">' + esc(bu.margin) + '</td>' +
                  '<td style="color:#059669;font-weight:700;">' + esc(bu.growth) + '</td>' +
                  '<td><span class="zexec-badge ' + (bu.status === 'Outperforming' || bu.status === 'High Growth' ? 'success' : 'info') + '">' + esc(bu.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      /* 2-Column: Governance Decision Log & Capital Runway Waterfall */
      '<div class="zexec-grid-2">',
        /* Decision Log */
        '<div class="zexec-card">',
          '<div class="zexec-card-head">',
            '<div>',
              '<h3 class="zexec-card-title">Executive Decision & Capital Governance Log</h3>',
              '<p class="zexec-card-sub">Action items requiring Chief Executive Officer or Board authorization</p>',
            '</div>',
            '<span class="zexec-badge info">' + decisions.length + ' Items Logged</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            decisions.map(function(dec) {
              return '<div style="padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">' +
                '<div style="display:flex;justify-content:space-between;margin-bottom:4px;">' +
                  '<span style="font-family:IBM Plex Mono,monospace;font-size:11px;font-weight:700;color:#2563eb;">' + esc(dec.id) + '</span>' +
                  '<span class="zexec-badge ' + (dec.priority === 'Completed' || dec.priority === 'Approved' ? 'success' : 'warn') + '">' + esc(dec.priority) + '</span>' +
                '</div>' +
                '<div style="font-size:12px;font-weight:600;color:#0f172a;line-height:1.4;">' + esc(dec.action) + '</div>' +
                '<div style="display:flex;justify-content:space-between;font-size:11px;color:#64748b;margin-top:6px;">' +
                  '<span>Owner: ' + esc(dec.owner) + '</span>' +
                  '<span style="font-weight:600;color:#0f172a;">' + esc(dec.capital) + '</span>' +
                '</div>' +
              '</div>';
            }).join(''),
          '</div>',
        '</div>',

        /* Capital Allocation & Treasury Waterfall */
        '<div class="zexec-card">',
          '<div class="zexec-card-head">',
            '<div>',
              '<h3 class="zexec-card-title">Capital Allocation & Treasury Waterfall</h3>',
              '<p class="zexec-card-sub">Liquid balance sheet strength and capital deployment efficiency</p>',
            '</div>',
            '<span class="zexec-badge success">Self-Sustaining</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:16px;">',
            '<div style="padding:16px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">',
              '<div>',
                '<span style="font-size:12px;color:#64748b;font-weight:600;">Liquid Treasury Reserves</span>',
                '<h2 style="margin:4px 0 0;font-size:24px;font-weight:800;color:#0f172a;">₹4,85,00,000</h2>',
                '<span style="font-size:11px;color:#059669;font-weight:700;">+₹18.9L Monthly Operational Surplus</span>',
              '</div>',
              '<div style="text-align:right;">',
                '<span class="zexec-badge success" style="font-size:13px;padding:6px 12px;">28 Months Runway</span>',
                '<p style="margin:6px 0 0;font-size:11px;color:#64748b;">Zero Long-Term Debt</p>',
              '</div>',
            '</div>',
            '<table class="zexec-table">',
              '<thead>',
                '<tr>',
                  '<th>Capital Pillar</th>',
                  '<th>Allocation</th>',
                  '<th>Deployed (MTD)</th>',
                  '<th>Solvency Ratio</th>',
                '</tr>',
              '</thead>',
              '<tbody>',
                capitalPillars.map(function(p) {
                  return '<tr>' +
                    '<td><b>' + esc(p.pillar) + '</b></td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;">' + esc(p.allocation) + '</td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;color:#10b981;font-weight:600;">' + esc(p.deployed) + '</td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">' + esc(p.solvency) + '</td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
            '</table>',
            '<div style="padding:12px 14px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;font-size:12px;color:#1e40af;line-height:1.4;">',
              '<strong>💡 Executive Capital Note:</strong> Cash generation from Clinical Services and Pharmacy offsets expansion capital expenditure, maintaining 28-month liquid solvency.',
            '</div>',
          '</div>',
        '</div>',
      '</div>',

      /* Enterprise Risk Radar & Early Warning Sentinel */
      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Enterprise Risk Radar & Governance Sentinel</h3>',
            '<p class="zexec-card-sub">Continuous monitoring across veterinary clinical safety, supply chain integrity, regulatory audits, and human capital</p>',
          '</div>',
          '<span class="zexec-badge success">All Vectors Nominal</span>',
        '</div>',
        '<div class="zexec-risk-grid">',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Clinical Quality & Compliance</span>',
              '<span class="zexec-badge success">Nominal</span>',
            '</div>',
            '<div class="zexec-risk-val">0 Open Audits</div>',
            '<p class="zexec-risk-desc">All 5 hospital hubs passed NABH and VCI inspection protocols.</p>',
          '</div>',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Cold-Chain & Pharmacy</span>',
              '<span class="zexec-badge success">Nominal</span>',
            '</div>',
            '<div class="zexec-risk-val">4.1°C Avg (100% Online)</div>',
            '<p class="zexec-risk-desc">12 IoT probes continuously logging zero temperature excursions.</p>',
          '</div>',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Specialist Retention</span>',
              '<span class="zexec-badge success">Optimal</span>',
            '</div>',
            '<div class="zexec-risk-val">95.4% Retained</div>',
            '<p class="zexec-risk-desc">148 clinicians active with 0 unscheduled doctor exits.</p>',
          '</div>',
          '<div class="zexec-risk-card">',
            '<div class="zexec-risk-head">',
              '<span>Cybersecurity & Records</span>',
              '<span class="zexec-badge success">Secured</span>',
            '</div>',
            '<div class="zexec-risk-val">ISO 27001 Ready</div>',
            '<p class="zexec-risk-desc">256-bit encrypted pet health record vault with zero breach flags.</p>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderBusinessOverview() {
    var regions = [
      { name: 'Bengaluru Central & South (HQ)', rev: '₹74.8L', hubs: '18 Centers', pets: '18,420 Pets', mom: '+18.4%', pos: 'Dominant' },
      { name: 'Mumbai MMR & Western Suburban', rev: '₹46.2L', hubs: '10 Centers', pets: '11,280 Pets', mom: '+22.1%', pos: 'Co-Leader' },
      { name: 'Delhi NCR (Gurgaon & South Delhi)', rev: '₹34.5L', hubs: '6 Centers', pets: '8,420 Pets', mom: '+26.5%', pos: 'Rapid Expansion' },
      { name: 'Hyderabad Cyberabad & Gachibowli', rev: '₹17.4L', hubs: '4 Centers', pets: '4,680 Pets', mom: '+31.0%', pos: 'Fast Scaling' },
      { name: 'Pune Urban (Koregaon & Baner)', rev: '₹11.1L', hubs: '3 Centers', pets: '3,120 Pets', mom: '+34.2%', pos: 'High Growth' },
      { name: 'Chennai OMR & Adyar Hub', rev: '₹9.8L', hubs: '2 Centers', pets: '2,840 Pets', mom: '+28.0%', pos: 'Scaling' },
      { name: 'Kolkata Salt Lake & New Town', rev: '₹7.2L', hubs: '2 Centers', pets: '1,950 Pets', mom: '+24.5%', pos: 'New Launch' },
      { name: 'Ahmedabad SG Highway Center', rev: '₹6.5L', hubs: '2 Centers', pets: '1,820 Pets', mom: '+32.1%', pos: 'New Launch' },
      { name: 'Chandigarh Tri-City Corridor', rev: '₹5.2L', hubs: '1 Center', pets: '1,410 Pets', mom: '+29.0%', pos: 'Emerging' },
      { name: 'Kochi Coastal Marine Drive Center', rev: '₹4.3L', hubs: '1 Center', pets: '1,180 Pets', mom: '+38.5%', pos: 'Emerging' }
    ];

    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Active Operating Hubs', '5 Hubs', '38 Centers', 'up', 'Bengaluru, Mumbai, Delhi, Hyd, Pune', '📍'),
        kpiHtml('Network Doctors & Staff', '248 Personnel', '148 Clinicians', 'up', 'Active across all facilities', '👥'),
        kpiHtml('Avg Basket Order Value', '₹2,480', '+8.4% YoY', 'up', '2.8 items / consultation', '🛒'),
        kpiHtml('Digital App Orders', '68.4%', '+14.2% MoM', 'up', '60-min rapid doorstep delivery', '📱'),
      '</div>',

      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Geographic Market Share & Economics</h3>',
            '<p class="zexec-card-sub">Metropolitan territory performance and local clinic footprint</p>',
          '</div>',
          '<span class="zexec-badge success">5 Metros Operational</span>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Metropolitan Market</th>',
                '<th>Monthly Revenue</th>',
                '<th>Clinics / Hubs</th>',
                '<th>Active Pets</th>',
                '<th>MoM Growth</th>',
                '<th>Market Position</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              regions.map(function(r) {
                return '<tr>' +
                  '<td><b>' + esc(r.name) + '</b></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#0f172a;">' + esc(r.rev) + '</td>' +
                  '<td>' + esc(r.hubs) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + esc(r.pets) + '</td>' +
                  '<td style="color:#059669;font-weight:700;">' + esc(r.mom) + '</td>' +
                  '<td><span class="zexec-badge success">' + esc(r.pos) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderKpiDashboard() {
    var scorecard = [
      { cat: 'Financial', kpi: 'Monthly Enterprise Revenue', target: '₹1.75 Cr', actual: '₹1.84 Cr', variance: '+5.1%', status: 'Target Met' },
      { cat: 'Financial', kpi: 'Operating EBITDA Margin', target: '10.0%', actual: '11.0%', variance: '+1.0%', status: 'Target Met' },
      { cat: 'Financial', kpi: 'Blended Gross Margin', target: '38.5%', actual: '40.1%', variance: '+1.6%', status: 'Target Met' },
      { cat: 'Operational', kpi: '60-Minute Rapid Delivery SLA', target: '95.0%', actual: '96.8%', variance: '+1.8%', status: 'Target Met' },
      { cat: 'Operational', kpi: 'Pharmacy Formulary Stockout Rate', target: '<2.5%', actual: '1.4%', variance: '-1.1%', status: 'Target Met' },
      { cat: 'Clinical', kpi: 'Veterinary Consultation Volume', target: '3,200', actual: '3,420', variance: '+6.9%', status: 'Target Met' },
      { cat: 'Clinical', kpi: 'Antibiotic Stewardship Compliance', target: '100.0%', actual: '100.0%', variance: '0.0%', status: 'Target Met' },
      { cat: 'Customer', kpi: 'Pet Parent Net Promoter Score (NPS)', target: '72', actual: '78', variance: '+6 pts', status: 'Target Met' },
      { cat: 'Customer', kpi: '12-Month Chronic Refill Retention', target: '70.0%', actual: '74.2%', variance: '+4.2%', status: 'Target Met' },
      { cat: 'Growth', kpi: 'Active Wellness Club Subscribers', target: '8,000', actual: '8,420', variance: '+5.3%', status: 'Target Met' }
    ];

    return [
      '<div class="zexec-kpi-grid">',
        kpiHtml('Operating Efficiency Ratio', '96.8%', '10 of 10 Met', 'up', 'All balanced pillars nominal', '⚙️'),
        kpiHtml('Clinical NPS Rating', '78 / 100', '+6 pts QoQ', 'up', 'Top tier veterinary benchmark', '⭐'),
        kpiHtml('Inventory Turnover', '7.2x / Year', '+0.6x YoY', 'up', '48.2 days inventory on hand', '📦'),
        kpiHtml('Pet Parent Retention (12M)', '74.2%', '+4.2% YoY', 'up', 'Chronic refill & membership', '🔄'),
      '</div>',

      '<div class="zexec-card">',
        '<div class="zexec-card-head">',
          '<div>',
            '<h3 class="zexec-card-title">Enterprise Master Scorecard (Balanced KPIs)</h3>',
            '<p class="zexec-card-sub">Holistic performance indicators across Financial, Customer, Internal Process, and Growth</p>',
          '</div>',
          '<button class="zexec-btn" onclick="alert(\'Printing Executive Scorecard PDF...\')">🖨️ Print Scorecard</button>',
        '</div>',
        '<div class="zexec-table-wrap">',
          '<table class="zexec-table">',
            '<thead>',
              '<tr>',
                '<th>Category</th>',
                '<th>Indicator</th>',
                '<th>Actual (MTD)</th>',
                '<th>Target</th>',
                '<th>Variance</th>',
                '<th>Health</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              scorecard.map(function(k) {
                return '<tr>' +
                  '<td><span style="font-size:11px;color:#64748b;font-weight:600;">' + esc(k.cat) + '</span></td>' +
                  '<td><b>' + esc(k.kpi) + '</b></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#0f172a;">' + esc(k.actual) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#64748b;">' + esc(k.target) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(k.variance) + '</td>' +
                  '<td><span class="zexec-badge success">● ' + esc(k.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function getActiveTabConfig() {
    for (var i = 0; i < TABS.length; i++) {
      if (TABS[i].id === S.tab) return TABS[i];
    }
    return TABS[1];
  }

  function renderTabsBar() {
    return TABS.map(function (t) {
      var isActive = t.id === S.tab;
      return [
        '<button type="button" class="zexec-tab ' + (isActive ? 'active' : '') + '" data-tab="' + t.id + '">',
          '<span>' + t.icon + '</span>',
          '<span>' + esc(t.label) + '</span>',
          (t.badge ? '<span class="zexec-tab-badge">' + esc(t.badge) + '</span>' : ''),
        '</button>'
      ].join('');
    }).join('');
  }

  function renderBody() {
    switch (S.tab) {
      case 'ceo-control': return renderCeoControlCenter();
      case 'overview':    return renderBusinessOverview();
      case 'kpi':         return renderKpiDashboard();
      case 'dashboard':
      default:            return renderExecutiveDashboard();
    }
  }

  function render() {
    if (!root) return;
    var current = getActiveTabConfig();

    root.innerHTML = [
      '<header class="zexec-head">',
        '<div class="zexec-head-left">',
          '<div class="zexec-title-row">',
            '<h1 class="zexec-title">' + esc(current.title) + '</h1>',
            '<span class="zexec-live-badge"><span class="zexec-pulse-dot"></span> Live Enterprise</span>',
          '</div>',
          '<p class="zexec-sub">' + esc(current.sub) + '</p>',
        '</div>',
        '<div class="zexec-head-actions">',
          '<button class="zexec-btn" onclick="alert(\'Syncing enterprise financials with ERP ledgers...\')">🔄 Sync Ledgers</button>',
          '<button class="zexec-btn primary" onclick="alert(\'Executive Board Brief downloaded (PDF).\')">📊 Download Board Brief</button>',
          '<button class="zexec-btn" id="zexec-close-btn" title="Close Executive Dashboard">✕</button>',
        '</div>',
      '</header>',
      '<nav class="zexec-tabs-bar">',
        renderTabsBar(),
      '</nav>',
      '<div class="zexec-body">',
        renderBody(),
      '</div>'
    ].join('');

    bindEvents();
  }

  function bindEvents() {
    if (!root) return;

    var tabs = root.querySelectorAll('.zexec-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function () {
        var tid = this.getAttribute('data-tab');
        switchTab(tid);
      });
    }

    var approveBtns = root.querySelectorAll('[data-approve-dec]');
    for (var j = 0; j < approveBtns.length; j++) {
      approveBtns[j].addEventListener('click', function (ev) {
        ev.stopPropagation();
        var decId = this.getAttribute('data-approve-dec');
        S.approvedDecisions = S.approvedDecisions || {};
        S.approvedDecisions[decId] = true;
        render();
      });
    }

    var closeBtn = root.querySelector('#zexec-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        redirectToHomeDashboard();
      });
    }
  }

  function switchTab(tid) {
    if (tid === 'dashboard' || tid === 'home') {
      redirectToHomeDashboard();
      return;
    }
    S.tab = tid;
    var current = getActiveTabConfig();
    if (window.location.hash !== current.hash) {
      try {
        history.replaceState(null, '', current.hash);
      } catch (e) {
        window.location.hash = current.hash;
      }
    }
    render();
    root.scrollTop = 0;
  }

  function open(tabId) {
    if (tabId === 'dashboard' || tabId === 'home') {
      redirectToHomeDashboard();
      return;
    }
    if (!root) {
      root = document.createElement('div');
      root.id = 'zexec-root';
      document.body.appendChild(root);
    }
    if (tabId) S.tab = tabId;
    else if (!S.tab || S.tab === 'dashboard') S.tab = 'ceo-control';
    S.open = true;
    root.style.display = 'block';
    document.documentElement.classList.add('zexec-locked');
    document.body.classList.add('zexec-locked');
    render();
  }

  function close() {
    if (!root) return;
    root.style.display = 'none';
    S.open = false;
    document.documentElement.classList.remove('zexec-locked');
    document.body.classList.remove('zexec-locked');
    if (window.ZenveSalesDropAnalysis && typeof window.ZenveSalesDropAnalysis.mount === 'function') {
      window.ZenveSalesDropAnalysis.mount();
    }
  }

  function onHashChange() {
    var h = (window.location.hash || '').toLowerCase();
    if (h === '#overview' || h === '#home') {
      redirectToHomeDashboard();
      return;
    }
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'import', 'export', 'subscription', 'customer', 'doctor', 'ai', 'b2b'];
      var isOther = otherDomains.some(function(d) { return window.location.hash.indexOf(d) >= 0; });
      if (isOther) close();
    }
  }

  function initInterception() {
    document.addEventListener('click', function (e) {
      var accordionBtn = e.target.closest('button[aria-expanded]');
      if (accordionBtn) return;

      var el = e.target.closest('button, a, [data-go], [role="button"], li');
      if (!el) return;

      var href = el.getAttribute('href');
      var t = tabFromHash(href);
      if (t) {
        e.preventDefault();
        open(t);
        return;
      }

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zexec-root');
      if (isSidebar) {
        var txt = el.textContent || '';
        var t2 = tabFromText(txt);
        if (t2) {
          e.preventDefault();
          e.stopPropagation();
          open(t2);
        }
      }
    }, true);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && S.open) redirectToHomeDashboard();
    });

    window.addEventListener('hashchange', onHashChange);

    if (window.location.hash) {
      var initial = tabFromHash(window.location.hash);
      if (initial) {
        setTimeout(function () { open(initial); }, 150);
      }
    }
  }

  window.ZenveExecutiveDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    redirectToHome: redirectToHomeDashboard
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
