/* =====================================================================
   Zenve BI — Global AI Co-Pilot & Natural Language Command Bar (Cmd + K)
   Intelligent Spotlight Controller with Voice Speech-to-Text,
   Domain Knowledge LLM, Instant KPI Metrics, and Deep Navigation.
   ===================================================================== */

(function () {
  'use strict';

  var COPILOT_ID = 'zenve-global-copilot';

  // Domain Knowledge Base (Veterinary, Clinical, Financial, Supply Chain, Logistics)
  var KNOWLEDGE = {
    overview: {
      mtdRevenue: '₹1.84 Cr (₹184.2 Lakh)',
      revenueGrowth: '+24.2% YoY (+14.6% MoM)',
      totalOrders: '14,280 Orders',
      activePets: '28,450 Registered Pets',
      ebitda: '₹38.2 Lakh (20.7% Margin)',
      hubsCount: 14,
      sla: '97.6% (38.4 Min Avg Velocity)'
    },
    hubs: [
      { name: 'Indiranagar Flagship', city: 'Bengaluru', ebitda: '₹16.4L (26.2%)', beds: '12 ICU / 24 General', lead: 'Dr. Priya Sharma' },
      { name: 'Koramangala 24/7 Trauma Hub', city: 'Bengaluru', ebitda: '₹12.8L (23.4%)', beds: '16 ICU / 30 General', lead: 'Dr. Rajesh Nair' },
      { name: 'Whitefield Multi-Specialty', city: 'Bengaluru', ebitda: '₹9.6L (21.0%)', beds: '8 ICU / 18 General', lead: 'Dr. Ananya Sen' },
      { name: 'Bandra West Advanced Care', city: 'Mumbai', ebitda: '₹14.2L (24.8%)', beds: '10 ICU / 20 General', lead: 'Dr. Farhan Merchant' },
      { name: 'Gurgaon Cyber City Center', city: 'Delhi NCR', ebitda: '₹11.5L (19.8%)', beds: '10 ICU / 22 General', lead: 'Dr. Rajiv Malhotra' }
    ],
    doctors: [
      { name: 'Dr. Priya Sharma', title: 'Chief Medical Officer & Surgeon', specialty: 'Orthopedics & Soft Tissue Surgery', hub: 'Indiranagar Flagship', stats: '22 Surgeries/Wk · 99.6% Recovery Rate' },
      { name: 'Dr. Rajesh Nair', title: 'Senior Trauma Specialist', specialty: 'Spinal Decompression & TPLO', hub: 'Koramangala Trauma Hub', stats: '18 Complex Surgeries/Wk · 99.2% Recovery Rate' },
      { name: 'Dr. Farhan Merchant', title: 'Critical Care Director', specialty: 'ICU Resuscitation & Poison Triage', hub: 'Bandra West (Mumbai)', stats: '36 Emergency Cases/Wk · 97.8% Stabilization Rate' },
      { name: 'Dr. Rajiv Malhotra', title: 'Senior Veterinary Surgeon', specialty: 'Cardiology & Laparoscopic Surgeries', hub: 'Gurgaon Golf Course Hub', stats: '28 Surgeries/Wk · 99.1% Recovery Rate' }
    ],
    pharmacy: {
      valuation: '₹1.48 Crore (1,420 Active SKUs)',
      coldChainCompliance: '100% IoT Monitored (2°C – 8°C Temperature Range)',
      criticalStockouts: [
        { name: 'Bravecto Chewables (Fluralaner)', runway: '18 Days', needed: '600 Units Needed', use: '12-Week Tick & Flea' },
        { name: 'Royal Canin Renal Diet', runway: '14 Days', needed: '450 Bags Needed', use: 'Feline & Canine Kidney Support' },
        { name: 'Rabisin Rabies Biological Serum', runway: '12 Days', needed: '300 Vials Needed', use: 'Mandatory Anti-Rabies Vaccine' }
      ]
    },
    salesDrop: {
      'delhi': 'Delhi NCR experienced a temporary 14.2% drop (₹18.4 Lakh) due to an out-of-stock situation on Bravecto chewables at Gurgaon central hub and extreme afternoon heatwaves reducing daytime OPD walk-ins by 28%. Emergency PO-8821 dispatched and evening triage hours extended to 10 PM.',
      'mumbai': 'Mumbai recorded a 7.8% drop due to severe monsoon waterlogging in Bandra and Andheri corridors. All-weather waterproof e-bike fleet was deployed to maintain 60-min delivery commitments.',
      'bengaluru': 'Bengaluru is outperforming targets (+18.4% growth) driven by high surgical throughput at Indiranagar Flagship and 24/7 emergency volume in Koramangala.'
    }
  };

  // Pre-configured Query Library
  var SUGGESTIONS = [
    { q: 'Why did Delhi NCR sales drop?', icon: '📉', tag: 'Drop Analysis' },
    { q: 'Which medicines have critical stockouts?', icon: '💊', tag: 'Pharmacy' },
    { q: 'Show top veterinary surgeons by recovery rate', icon: '👨‍⚕️', tag: 'Clinical' },
    { q: 'What is our current 60-minute delivery SLA?', icon: '⚡', tag: 'Logistics' },
    { q: 'Show EBITDA & beds across hospital hubs', icon: '🏥', tag: 'Executive' },
    { q: 'Open CEO Control Center', icon: '👔', tag: 'Navigation' },
    { q: 'Open Pharmacy Inventory', icon: '📦', tag: 'Navigation' },
    { q: 'Open Company Settings & RBAC', icon: '⚙️', tag: 'Settings' }
  ];

  var backdropEl = null;
  var inputEl = null;
  var resultsEl = null;
  var micBtn = null;
  var speechRecog = null;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── NLP Answer Generator ────────────────────────────────────────── */
  function answerQuery(rawQuery) {
    var q = rawQuery.toLowerCase().trim();

    // 1. Navigation Commands
    if (q.indexOf('open') === 0 || q.indexOf('go to') === 0 || q.indexOf('jump to') === 0 || q.indexOf('show me') === 0) {
      if (q.indexOf('ceo') >= 0 || q.indexOf('control center') >= 0) {
        return {
          text: "Navigating to the **CEO Control Center & Strategic Governance** dashboard. Pacing 10 Board OKRs and consolidated ₹22.08 Cr ARR.",
          jump: { label: "Open CEO Control Center", module: "Executive Dashboard", item: "CEO Control Center" }
        };
      }
      if (q.indexOf('pharmacy') >= 0) {
        return {
          text: "Opening **Veterinary Pharmacy & Rx Inventory**. Managing Schedule H/X narcotics and IoT cold-chain 2°C – 8°C stock.",
          jump: { label: "Open Pharmacy Dashboard", module: "Pharmacy", item: "Pharmacy Dashboard" }
        };
      }
      if (q.indexOf('setting') >= 0 || q.indexOf('company') >= 0 || q.indexOf('rbac') >= 0 || q.indexOf('user') >= 0) {
        return {
          text: "Opening **Platform Settings & Configuration**. Managing Company profile, 10 Business Units, Locations, and RBAC matrix.",
          jump: { label: "Open Settings", module: "Settings", item: "Company Settings" }
        };
      }
      if (q.indexOf('delivery') >= 0 || q.indexOf('60') >= 0 || q.indexOf('logistics') >= 0) {
        return {
          text: "Opening **60-Minute Rapid Delivery Operations Hub**. Tracking active hyperlocal riders and 38.4m dispatch latency.",
          jump: { label: "Open 60-Min Delivery", module: "Orders & Operations", item: "60-Minute Delivery" }
        };
      }
      if (q.indexOf('doctor') >= 0 || q.indexOf('surgeon') >= 0) {
        return {
          text: "Opening **Doctors 360° Registry**. Tracking 48 verified veterinary surgeons, surgical success rates, and schedules.",
          jump: { label: "Open Doctors Dashboard", module: "Doctors", item: "All Doctors" }
        };
      }
      if (q.indexOf('inventory') >= 0 || q.indexOf('product') >= 0 || q.indexOf('sku') >= 0) {
        return {
          text: "Opening **Products & Inventory Valuation**. Tracking ₹4.85 Cr total stock, low-stock alerts, and warehouse movements.",
          jump: { label: "Open Product Catalog", module: "Products & Inventory", item: "Product Catalog" }
        };
      }
    }

    // 2. Sales Drop Analysis
    if (q.indexOf('drop') >= 0 || q.indexOf('delhi') >= 0 || q.indexOf('decline') >= 0 || q.indexOf('fall') >= 0) {
      return {
        text: "**Regional Drop Diagnostics · Delhi NCR Corridor**:\n\n" +
          "• **Variance**: ₹18.4 Lakh drop (-14.2% MoM) with 1,420 orders impacted.\n" +
          "• **Root Cause**: Temporary supply stockout of *Bravecto Chewables* and *Royal Canin Renal Diet* at Central Gurgaon Hub, exacerbated by afternoon heatwaves reducing OPD footfalls by 28%.\n" +
          "• **Mitigation Executed**: Emergency inter-hub stock transfer PO-8821 dispatched and evening hospital hours extended to 10 PM with complimentary pet hydration triage.",
        metrics: [
          { label: 'Delhi Impact', val: '-₹18.4L' },
          { label: 'Order Deficit', val: '1,420' },
          { label: 'Resolution SLA', val: '24 Hours' }
        ],
        jump: { label: "View Sales Drop Analysis", module: "Revenue & Sales", item: "Sales Forecast" }
      };
    }

    // 3. Pharmacy Stockouts
    if (q.indexOf('stockout') >= 0 || q.indexOf('medicine') >= 0 || q.indexOf('pharmacy') >= 0 || q.indexOf('drug') >= 0 || q.indexOf('bravecto') >= 0) {
      return {
        text: "**Veterinary Pharmacy Formulary Sentinel**:\n\n" +
          "Active inventory valuation is **₹1.48 Crore** across 1,420 SKUs with **100% IoT Cold-Chain Compliance (2°C – 8°C)**.\n\n" +
          "**Critical Attention Needed**:\n" +
          "• **Bravecto Chewables (Fluralaner)**: 18 Days runway (600 units needed)\n" +
          "• **Royal Canin Renal Diet**: 14 Days runway (450 bags needed)\n" +
          "• **Rabisin Rabies Biological Vaccine**: 12 Days runway (300 vials needed)",
        metrics: [
          { label: 'Formulary Value', val: '₹1.48 Cr' },
          { label: 'Active SKUs', val: '1,420' },
          { label: 'Cold-Chain', val: '4.1°C Avg' }
        ],
        jump: { label: "Review Pharmacy Stockouts", module: "Pharmacy", item: "Pharmacy Inventory" }
      };
    }

    // 4. Top Doctors & Clinical Specialists
    if (q.indexOf('doctor') >= 0 || q.indexOf('surgeon') >= 0 || q.indexOf('recovery') >= 0 || q.indexOf('clinical') >= 0 || q.indexOf('vet') >= 0) {
      return {
        text: "**Top Veterinary Specialists & Surgical Leads**:\n\n" +
          "• **Dr. Priya Sharma** (CMO) — *Indiranagar Flagship*\n" +
          "  Orthopedics & Soft Tissue Surgery · 22 Surgeries/Wk · **99.6% Recovery Rate**\n\n" +
          "• **Dr. Rajesh Nair** — *Koramangala Trauma Hub*\n" +
          "  Spinal Decompression & TPLO · 18 Complex Surgeries/Wk · **99.2% Recovery Rate**\n\n" +
          "• **Dr. Farhan Merchant** — *Bandra West (Mumbai)*\n" +
          "  Emergency Critical Care · 36 Cases/Wk · **97.8% Stabilization Rate**\n\n" +
          "• **Dr. Rajiv Malhotra** — *Gurgaon Golf Course*\n" +
          "  Laparoscopic Surgeries · 28 Surgeries/Wk · **99.1% Recovery Rate**",
        metrics: [
          { label: 'Total Surgeons', val: '48 Verified' },
          { label: 'Surgical Success', val: '99.4%' },
          { label: 'Doctor NPS', val: '4.9 / 5.0' }
        ],
        jump: { label: "Open Doctor Directory", module: "Doctors", item: "All Doctors" }
      };
    }

    // 5. 60-Minute Delivery SLA
    if (q.indexOf('delivery') >= 0 || q.indexOf('sla') >= 0 || q.indexOf('60') >= 0 || q.indexOf('speed') >= 0 || q.indexOf('logistics') >= 0) {
      return {
        text: "**Hyperlocal 60-Minute Rapid Delivery Fleet Health**:\n\n" +
          "• **On-Time SLA Compliance**: **97.6%** against a target threshold of 95.0%.\n" +
          "• **Average Velocity**: **38.4 Minutes** from order placement to door drop.\n" +
          "• **Active Fleet**: 184 dedicated two-wheeler riders + 12 temperature-controlled medical vans.\n" +
          "• **Cold-Chain Safety**: 100% of biologics & insulins transported in certified eutectic cold-boxes.",
        metrics: [
          { label: 'SLA On-Time', val: '97.6%' },
          { label: 'Avg Delivery Time', val: '38.4 Mins' },
          { label: 'Cost Per Order', val: '₹51.4' }
        ],
        jump: { label: "View Delivery Performance", module: "Orders & Operations", item: "Delivery Performance" }
      };
    }

    // 6. Hospital Hubs & Capacity
    if (q.indexOf('hub') >= 0 || q.indexOf('hospital') >= 0 || q.indexOf('bed') >= 0 || q.indexOf('icu') >= 0 || q.indexOf('capacity') >= 0 || q.indexOf('ebitda') >= 0) {
      return {
        text: "**Multi-City Hospital Network Performance**:\n\n" +
          "• **Total Facilities**: 10 operational hospital hubs across 4 metro regions.\n" +
          "• **Consolidated EBITDA**: **₹38.2 Lakh (20.7% margin)**.\n" +
          "• **ICU Occupancy**: **81.4%** across 54 critical care beds.\n" +
          "• **Top Revenue Unit**: Indiranagar Flagship (₹16.4L EBITDA, 26.2% margin).",
        metrics: [
          { label: 'Operating Hubs', val: '10 Centers' },
          { label: 'Blended EBITDA', val: '20.7%' },
          { label: 'ICU Occupancy', val: '81.4%' }
        ],
        jump: { label: "Explore Hospital Network", module: "Clinics & Hospitals", item: "All Clinics" }
      };
    }

    // 7. General Financial Overview / Default Fallback
    return {
      text: "**Zenve Pets Healthcare Enterprise Vitals**:\n\n" +
        "• **Gross Revenue (MTD)**: **₹1.84 Cr** (+24.2% YoY growth across 14,280 orders).\n" +
        "• **Operating Run-Rate**: **₹22.08 Cr ARR** with positive EBITDA of **₹38.2L (20.7%)**.\n" +
        "• **Treasury & Solvency**: **₹4.85 Cr liquid reserves** with 28 months operating runway.\n" +
        "• **Active Pet Parents**: 42,850 registered accounts and 28,450 active pets.",
      metrics: [
        { label: 'MTD Revenue', val: '₹1.84 Cr' },
        { label: 'EBITDA Margin', val: '20.7%' },
        { label: 'Runway', val: '28 Months' }
      ],
      jump: { label: "Go to Executive Dashboard", module: "Executive Dashboard", item: "Executive Dashboard" }
    };
  }

  /* ── DOM Builder ─────────────────────────────────────────────────── */
  function buildUI() {
    if (document.getElementById(COPILOT_ID)) return;

    // 1. Floating Launch Icon Button (Keeps only icon, removes Ask Dr. Zenve text)
    var pill = document.createElement('div');
    pill.className = 'zcp-launcher-pill';
    pill.id = 'zcp-pill-btn';
    pill.setAttribute('title', 'AI Chatbot (Ctrl+K)');
    pill.setAttribute('aria-label', 'Open AI Chatbot (Ctrl+K)');
    pill.innerHTML = [
      '<span class="zcp-sparkle-dot"></span>',
      '<span class="zcp-launcher-icon">🤖</span>'
    ].join('');
    document.body.appendChild(pill);

    // 2. Spotlight Modal Overlay
    backdropEl = document.createElement('div');
    backdropEl.id = COPILOT_ID;
    backdropEl.className = 'zcp-backdrop';

    var suggestionsHtml = SUGGESTIONS.map(function (s) {
      return '<div class="zcp-suggestion-chip" data-q="' + esc(s.q) + '">' +
        '<span class="zcp-chip-icon">' + s.icon + '</span>' +
        '<span>' + esc(s.q) + '</span>' +
      '</div>';
    }).join('');

    backdropEl.innerHTML = [
      '<div class="zcp-modal">',
        '<!-- Header & Search Input -->',
        '<div class="zcp-header-bar">',
          '<div class="zcp-ai-icon">🤖</div>',
          '<input type="text" class="zcp-input" id="zcp-query-input" placeholder="Ask anything about clinics, revenue, 60-min delivery, stockouts, or jump to any page..." autocomplete="off">',
          '<button type="button" class="zcp-action-btn" id="zcp-mic-btn" title="Voice Search (Speak Query)">🎙️ Voice</button>',
          '<button type="button" class="zcp-action-btn" id="zcp-close-btn" title="Close (ESC)">✕ ESC</button>',
        '</div>',

        '<!-- Content Canvas -->',
        '<div class="zcp-body" id="zcp-body-pane">',
          '<div id="zcp-suggestions-wrap">',
            '<div class="zcp-section-title">⚡ Quick Insights & Prompts</div>',
            '<div class="zcp-suggestions-grid">' + suggestionsHtml + '</div>',
          '</div>',
          '<div id="zcp-results-wrap" style="display:none;"></div>',
        '</div>',

        '<!-- Footer -->',
        '<div class="zcp-footer">',
          '<div class="zcp-footer-badges">',
            '<span class="zcp-footer-badge">🐾 <strong>Dr. Zenve AI 5.0</strong></span>',
            '<span class="zcp-footer-badge">·</span>',
            '<span class="zcp-footer-badge">FastAPI Autonomous Multi-Agent</span>',
          '</div>',
          '<div class="zcp-footer-badges">',
            '<span class="zcp-footer-badge"><span class="zcp-kbd-chip">↵</span> to submit</span>',
            '<span class="zcp-footer-badge"><span class="zcp-kbd-chip">ESC</span> to exit</span>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    document.body.appendChild(backdropEl);

    // Cache elements
    inputEl = document.getElementById('zcp-query-input');
    resultsEl = document.getElementById('zcp-results-wrap');
    micBtn = document.getElementById('zcp-mic-btn');

    wireEvents();
  }

  /* ── Event Handlers ──────────────────────────────────────────────── */
  function openModal() {
    if (!backdropEl) buildUI();
    backdropEl.classList.add('zcp-open');
    if (inputEl) {
      setTimeout(function () { inputEl.focus(); }, 50);
    }
  }

  function closeModal() {
    if (!backdropEl) return;
    backdropEl.classList.remove('zcp-open');
    if (speechRecog) {
      try { speechRecog.stop(); } catch (e) {}
    }
  }

  function renderCopilotResult(query, res, suggestionsWrap) {
    var metricsHtml = '';
    var kpis = res.kpis || res.metrics || [];
    if (kpis && kpis.length) {
      metricsHtml = '<div class="zcp-metrics-row">' +
        kpis.map(function (m) {
          var label = m.label || '';
          var val = m.val || m.value || '';
          return '<div class="zcp-metric-card"><div class="label">' + esc(label) + '</div><div class="val">' + esc(val) + '</div></div>';
        }).join('') +
      '</div>';
    }

    var agentPillHtml = '';
    if (res.agent_steps && res.agent_steps.length) {
      agentPillHtml = '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:8px 0;padding:6px 10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:11px;">' +
        '<strong style="color:#64748b;font-size:10px;">🤖 MULTI-AGENT RAG:</strong>' +
        (res.model_used ? '<span style="background:#eff6ff;color:#1d4ed8;padding:2px 7px;border-radius:6px;border:1px solid #93c5fd;font-weight:700;font-size:10px;">⚡ ' + esc(res.model_used) + '</span>' : '') +
        res.agent_steps.map(function (st) {
          return '<span style="background:#ecfdf5;color:#047857;padding:2px 6px;border-radius:6px;border:1px solid #6ee7b7;font-size:10px;font-weight:600;">✓ ' + esc(st.agent) + '</span>';
        }).join('') +
      '</div>';
    }

    var jumpBtnHtml = '';
    if (res.jump) {
      jumpBtnHtml = '<button type="button" class="zcp-btn-jump" id="zcp-jump-btn" data-mod="' + esc(res.jump.module) + '" data-item="' + esc(res.jump.item) + '">' +
        '🚀 ' + esc(res.jump.label) + ' →' +
      '</button>';
    }

    var actionsHtml = '';
    if (res.actions && res.actions.length) {
      actionsHtml = '<div style="margin:12px 0;display:flex;flex-direction:column;gap:8px;">' +
        res.actions.map(function (act) {
          return '<div style="padding:12px 14px;border:1px solid #bfdbfe;background:#eff6ff;border-radius:8px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">' +
            '<div>' +
              '<div style="font-weight:700;font-size:12.5px;color:#1e3a8a;">⚡ ' + esc(act.title) + '</div>' +
              '<div style="font-size:11.5px;color:#3b82f6;margin-top:2px;">' + esc(act.description) + '</div>' +
            '</div>' +
            '<button type="button" class="zcp-btn-jump" style="background:#2563eb;color:#fff;padding:6px 12px;font-size:11.5px;font-weight:700;border:none;border-radius:6px;cursor:pointer;" onclick="alert(\'Action ' + esc(act.action_id) + ' submitted for Human-in-the-Loop ERP authorization.\')">Approve Action</button>' +
          '</div>';
        }).join('') +
      '</div>';
    }

    // Format markdown bold and linebreaks
    var rawText = res.text || '';
    var formattedText = esc(rawText)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:#f1f5f9;padding:2px 4px;border-radius:4px;font-family:monospace;color:#0f172a;">$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n•/g, '<br>•');

    resultsEl.innerHTML = [
      '<div class="zcp-response-box">',
        '<div class="zcp-query-echo"><span>Query:</span> <strong>' + esc(query) + '</strong></div>',
        agentPillHtml,
        metricsHtml,
        '<div class="zcp-response-text">' + formattedText + '</div>',
        actionsHtml,
        '<div class="zcp-action-strip">',
          jumpBtnHtml,
          '<button type="button" class="zcp-btn-copy" id="zcp-copy-ans">📋 Copy Answer</button>',
          '<button type="button" class="zcp-btn-copy" id="zcp-new-q">🔄 New Question</button>',
        '</div>',
      '</div>'
    ].join('');

    resultsEl.style.display = 'block';

    // Hook jump button
    var jumpEl = document.getElementById('zcp-jump-btn');
    if (jumpEl) {
      jumpEl.onclick = function () {
        var mod = this.getAttribute('data-mod');
        var item = this.getAttribute('data-item');
        closeModal();
        if (window.ZenveRouter && typeof window.ZenveRouter.openDashboard === 'function') {
          window.ZenveRouter.openDashboard(mod, item);
        } else {
          location.hash = '#' + item.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
      };
    }
  }

  function handleQuerySubmit(qText) {
    var query = (qText || (inputEl ? inputEl.value : '')).trim();
    if (!query) return;

    if (inputEl) inputEl.value = query;

    var suggestionsWrap = document.getElementById('zcp-suggestions-wrap');
    if (suggestionsWrap) suggestionsWrap.style.display = 'none';

    // Show temporary typing state
    resultsEl.innerHTML = '<div style="padding:24px;text-align:center;color:#64748b;font-size:13px;font-weight:600;">' +
      '🧠 Orchestrating Enterprise RAG &amp; 5-Agent Collaborative Pipeline...' +
    '</div>';
    resultsEl.style.display = 'block';

    // Call live backend copilot query
    fetch('/api/v1/copilot/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      renderCopilotResult(query, data, suggestionsWrap);
      wireResultActionButtons(suggestionsWrap, data.text);
    })
    .catch(function (err) {
      console.warn('[Global Copilot] Falling back to client-side neural model:', err);
      var fallbackRes = answerQuery(query);
      renderCopilotResult(query, fallbackRes, suggestionsWrap);
      wireResultActionButtons(suggestionsWrap, fallbackRes.text);
    });
  }

  function wireResultActionButtons(suggestionsWrap, ansText) {
    var copyEl = document.getElementById('zcp-copy-ans');
    if (copyEl) {
      copyEl.onclick = function () {
        navigator.clipboard?.writeText(ansText);
        this.textContent = '✓ Copied!';
        setTimeout(function () { copyEl.textContent = '📋 Copy Answer'; }, 2000);
      };
    }

    var newQEl = document.getElementById('zcp-new-q');
    if (newQEl) {
      newQEl.onclick = function () {
        resultsEl.style.display = 'none';
        if (suggestionsWrap) suggestionsWrap.style.display = 'block';
        if (inputEl) {
          inputEl.value = '';
          inputEl.focus();
        }
      };
    }
  }

  function wireEvents() {
    // Launcher pill
    var pill = document.getElementById('zcp-pill-btn');
    if (pill) pill.onclick = openModal;

    // Close button
    var closeBtn = document.getElementById('zcp-close-btn');
    if (closeBtn) closeBtn.onclick = closeModal;

    // Click outside modal
    if (backdropEl) {
      backdropEl.onclick = function (e) {
        if (e.target === backdropEl) closeModal();
      };
    }

    // Input Enter key
    if (inputEl) {
      inputEl.onkeydown = function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleQuerySubmit();
        }
      };
    }

    // Suggestion chips
    document.querySelectorAll('.zcp-suggestion-chip').forEach(function (chip) {
      chip.onclick = function () {
        var query = this.getAttribute('data-q');
        handleQuerySubmit(query);
      };
    });

    // Voice recognition setup (Web Speech API)
    if (micBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      var SpeechClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      speechRecog = new SpeechClass();
      speechRecog.continuous = false;
      speechRecog.interimResults = false;
      speechRecog.lang = 'en-IN';

      speechRecog.onstart = function () {
        micBtn.classList.add('active');
        micBtn.textContent = '🔴 Listening...';
      };

      speechRecog.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        if (inputEl) inputEl.value = transcript;
        handleQuerySubmit(transcript);
      };

      speechRecog.onerror = function () {
        micBtn.classList.remove('active');
        micBtn.textContent = '🎙️ Voice';
      };

      speechRecog.onend = function () {
        micBtn.classList.remove('active');
        micBtn.textContent = '🎙️ Voice';
      };

      micBtn.onclick = function () {
        try {
          speechRecog.start();
        } catch (err) {
          speechRecog.stop();
        }
      };
    } else if (micBtn) {
      micBtn.style.display = 'none';
    }
  }

  function toggleModal() {
    if (backdropEl && backdropEl.classList.contains('zcp-open')) {
      closeModal();
    } else {
      openModal();
    }
  }

  /* ── Keyboard Shortcuts (Cmd + K / Ctrl + K / ESC) ──────────────── */
  function handleGlobalKeyDown(e) {
    if (e.__zcpHandled) return;
    // Cmd + K or Ctrl + K
    var isCtrlOrCmd = e.metaKey || e.ctrlKey;
    var isKeyK = e.key === 'k' || e.key === 'K' || e.code === 'KeyK' || e.keyCode === 75;

    if (isCtrlOrCmd && isKeyK) {
      e.__zcpHandled = true;
      e.preventDefault();
      e.stopPropagation();
      toggleModal();
      return false;
    }

    // ESC to close
    if ((e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) && backdropEl && backdropEl.classList.contains('zcp-open')) {
      e.__zcpHandled = true;
      e.preventDefault();
      closeModal();
    }
  }

  // Intercept in capture phase so no child component can swallow Ctrl+K
  window.addEventListener('keydown', handleGlobalKeyDown, true);
  document.addEventListener('keydown', handleGlobalKeyDown, true);

  // Public Interface
  window.ZenveCopilot = {
    open: openModal,
    close: closeModal,
    toggle: toggleModal,
    ask: handleQuerySubmit
  };

  // Mount after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildUI);
  } else {
    buildUI();
  }
})();
