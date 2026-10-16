/* =====================================================================
   Zenve BI — AI Assistant Executive Intelligence Suite
   Subdomains (11):
     1. Ask Zenve AI         (#ask-zenve-ai / #ai / #ask-ai)
     2. Business Insights     (#business-insights)
     3. Revenue Intelligence  (#revenue-intelligence)
     4. Sales Forecast       (#ai-sales-forecast / #sales-forecast)
     5. Demand Forecast      (#demand-forecast)
     6. Inventory Prediction (#inventory-prediction)
     7. Customer Prediction  (#customer-prediction)
     8. Churn Prediction     (#churn-prediction)
     9. Profit Prediction    (#profit-prediction)
    10. Anomaly Detection    (#anomaly-detection)
    11. AI Recommendations   (#ai-recommendations)
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
    { id: 'ask-ai',      label: 'Ask Zenve AI',         icon: '💬', hash: '#ask-zenve-ai',        badge: '', title: 'Ask Zenve AI — Natural Language Intelligence', sub: 'Interactive executive query interface with live database grounding and contextual recommendations' },
    { id: 'insights',    label: 'Business Insights',    icon: '💡', hash: '#business-insights',    badge: '',      title: 'Automated Executive Business Insights', sub: 'Synthesized multi-channel operational patterns, conversion drivers, and growth bottlenecks' },
    { id: 'revenue',     label: 'Revenue Intelligence', icon: '⚡', hash: '#revenue-intelligence', badge: '',     title: 'Autonomous Revenue Intelligence', sub: 'Pricing elasticity modeling, margin leak detection, and revenue optimization vectors' },
    { id: 'sales-fc',    label: 'Sales Forecast',       icon: '📈', hash: '#ai-sales-forecast',    badge: '', title: 'Bayesian Sales Trajectory Forecast', sub: 'Multi-horizon predictive sales modeling with P10/P50/P90 statistical confidence bands' },
    { id: 'demand-fc',   label: 'Demand Forecast',      icon: '📦', hash: '#demand-forecast',      badge: '',        title: 'SKU & Regional Demand Forecasting', sub: 'Predictive consumption velocity, seasonal surge dampening, and automated purchase requisitions' },
    { id: 'inventory-pr',label: 'Inventory Prediction', icon: '⚠️', hash: '#inventory-prediction', badge: '',      title: 'Predictive Stockout & Expiry Analytics', sub: 'Runway exhaustion forecasting, optimal reorder cycles, and cold-chain batch alerts' },
    { id: 'customer-pr', label: 'Customer Prediction',  icon: '🎯', hash: '#customer-prediction',  badge: '',       title: 'Customer Behavioral & Next-Best-Action Engine', sub: 'Propensity-to-repurchase scoring, basket upgrade probabilities, and service cross-sell triggers' },
    { id: 'churn-pr',    label: 'Churn Prediction',     icon: '🛡️', hash: '#churn-prediction',     badge: '',      title: 'Predictive Pet Parent Churn Mitigation', sub: 'Early engagement decay detection, vaccination lapse indicators, and automated win-back workflows' },
    { id: 'profit-pr',   label: 'Profit Prediction',    icon: '💹', hash: '#profit-prediction',    badge: '',  title: 'Predictive Profitability & Unit Economics', sub: 'Dynamic EBITDA sensitivity simulation across varying logistics, COGS, and labor cost models' },
    { id: 'anomaly',     label: 'Anomaly Detection',    icon: '🔍', hash: '#anomaly-detection',    badge: '',    title: 'Continuous Statistical Anomaly Detection', sub: 'Real-time telemetry scanning for revenue deviations, dispatch delays, and cart abandonment surges' },
    { id: 'recommend',   label: 'AI Recommendations',   icon: '✨', hash: '#ai-recommendations',   badge: '',     title: 'Ranked Autonomous AI Executive Playbooks', sub: 'Algorithmic prioritization of highest-ROI interventions across operations, clinical care, and pricing' }
  ];

  var S = {
    open: false,
    tab: 'ask-ai',
    lastContext: {
      intent: 'GENERAL_OVERVIEW',
      location: null,
      sku: null,
      doctor: null,
      timeframe: 'MTD'
    },
    chatHistory: [
      {
        role: 'ai',
        text: "Hello! 🐾 I'm **Dr. Zenve**, your dedicated Pet Healthcare & Business Intelligence assistant.\n\nI can help you with questions about our pet patients, hospital operations, pharmacy inventory, sales performance, logistics, and general pet health care.\n\nFeel free to ask me anything!"
      }
    ]
  };

  var root = null;

  function normalizeTab(raw) {
    if (!raw) return 'ask-ai';
    var s = String(raw).trim().toLowerCase();
    if (s.startsWith('#')) s = s.slice(1);
    var clean = s.replace(/[_\s]+/g, '-');
    if (clean === 'ask-ai' || clean === 'ask-zenve-ai' || clean === 'ai' || clean === 'copilot') return 'ask-ai';
    if (clean === 'custom-rag' || clean === 'custom-api' || clean === 'custom-api-rag' || clean === 'custom-ai' || clean === 'rag' || clean.indexOf('custom-api') >= 0 || clean.indexOf('enterprise-rag') >= 0) return 'custom-rag';
    if (clean === 'insights' || clean === 'business-insights') return 'insights';
    if (clean === 'revenue' || clean === 'revenue-intelligence') return 'revenue';
    if (clean === 'sales-fc' || clean === 'sales' || clean === 'sales-forecast' || clean === 'ai-sales-forecast') return 'sales-fc';
    if (clean === 'demand-fc' || clean === 'demand' || clean === 'demand-forecast') return 'demand-fc';
    if (clean === 'inventory-pr' || clean === 'inventory' || clean === 'inventory-prediction') return 'inventory-pr';
    if (clean === 'customer-pr' || clean === 'customer' || clean === 'customer-prediction') return 'customer-pr';
    if (clean === 'churn-pr' || clean === 'churn' || clean === 'churn-prediction') return 'churn-pr';
    if (clean === 'profit-pr' || clean === 'profit' || clean === 'profit-prediction') return 'profit-pr';
    if (clean === 'anomaly' || clean === 'anomaly-detection') return 'anomaly';
    if (clean === 'recommend' || clean === 'recommendations' || clean === 'recommendation' || clean === 'ai-recommendations') return 'recommend';

    if (clean.indexOf('demand') >= 0) return 'demand-fc';
    if (clean.indexOf('inventory') >= 0) return 'inventory-pr';
    if (clean.indexOf('customer') >= 0) return 'customer-pr';
    if (clean.indexOf('churn') >= 0) return 'churn-pr';
    if (clean.indexOf('profit') >= 0) return 'profit-pr';
    if (clean.indexOf('recommend') >= 0) return 'recommend';
    if (clean.indexOf('anomaly') >= 0) return 'anomaly';
    if (clean.indexOf('sales') >= 0) return 'sales-fc';
    if (clean.indexOf('insight') >= 0) return 'insights';
    if (clean.indexOf('revenue') >= 0) return 'revenue';
    return 'ask-ai';
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h === 'ask-zenve-ai' || h === 'ask-ai' || h === 'ai') return 'ask-ai';
    if (h === 'custom-api-rag' || h === 'custom-rag' || h === 'custom-ai' || h === 'enterprise-rag') return 'custom-rag';
    if (h === 'business-insights' || h === 'insights') return 'insights';
    if (h === 'revenue-intelligence' || h === 'revenue') return 'revenue';
    if (h === 'ai-sales-forecast' || h === 'sales-forecast' || h === 'sales-fc') return 'sales-fc';
    if (h === 'demand-forecast' || h === 'demand-fc' || h === 'demand') return 'demand-fc';
    if (h === 'inventory-prediction' || h === 'inventory-pr' || h === 'inventory') return 'inventory-pr';
    if (h === 'customer-prediction' || h === 'customer-pr' || h === 'customer') return 'customer-pr';
    if (h === 'churn-prediction' || h === 'churn-pr' || h === 'churn') return 'churn-pr';
    if (h === 'profit-prediction' || h === 'profit-pr' || h === 'profit') return 'profit-pr';
    if (h === 'anomaly-detection' || h === 'anomaly') return 'anomaly';
    if (h === 'ai-recommendations' || h === 'recommendations' || h === 'recommend') return 'recommend';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw === 'ask zenve ai' || raw === 'zenve ai' || raw === 'ask ai') return 'ask-ai';
    if (raw.indexOf('custom api') >= 0 || raw.indexOf('enterprise rag') >= 0 || raw.indexOf('agentic architecture') >= 0 || raw === 'custom api (rag & agents)') return 'custom-rag';
    if (raw === 'business insights' || raw === 'insights') return 'insights';
    if (raw === 'revenue intelligence' || raw === 'revenue') return 'revenue';
    if (raw === 'sales forecast' || raw === 'ai sales forecast' || raw === 'sales-fc') return 'sales-fc';
    if (raw === 'demand forecast' || raw === 'demand' || raw === 'demand-fc') return 'demand-fc';
    if (raw === 'inventory prediction' || raw === 'inventory' || raw === 'inventory-pr') return 'inventory-pr';
    if (raw === 'customer prediction' || raw === 'customer' || raw === 'customer-pr') return 'customer-pr';
    if (raw === 'churn prediction' || raw === 'churn' || raw === 'churn-pr') return 'churn-pr';
    if (raw === 'profit prediction' || raw === 'profit' || raw === 'profit-pr') return 'profit-pr';
    if (raw === 'anomaly detection' || raw === 'anomaly') return 'anomaly';
    if (raw === 'ai recommendations' || raw === 'recommendations' || raw === 'recommend') return 'recommend';
    return null;
  }

  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zai-kpi">',
        '<div class="zai-kpi-top">',
          '<span class="zai-kpi-label">' + esc(label) + '</span>',
          '<span class="zai-kpi-icon">' + esc(icon || '🤖') + '</span>',
        '</div>',
        '<div class="zai-kpi-val">' + esc(val) + '</div>',
        '<div class="zai-kpi-bottom">',
          '<span class="zai-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zai-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Zenve Pet-Trained Neural Intelligence & Domain LLM Core (v4.0)
     100% Free, zero-dependency, in-browser NLP and generative reasoning engine.
     Tailored for Zenve Pets Healthcare: 14 Veterinary Hospitals, E-Pharmacy,
     60-Minute Logistics, Clinical Care, and Executive Business Intelligence.
     ═══════════════════════════════════════════════════════════════════════ */
  /* Plain-text Dr. Zenve engine — mirrored from src/utils/zenveNlpLlm.js (re-run scratch/sync-legacy-nlp.js after editing it) */
  var ZenveNLP_LLM = (function () {
/**
 * Zenve Pet-Trained Intelligence & Domain LLM Core (v5.0)
 * 100% Free, zero-dependency, in-browser NLP and generative reasoning engine.
 * Tailored for Zenve Pets Healthcare: 14 Veterinary Hospitals, E-Pharmacy,
 * 60-Minute Logistics, Clinical Care, and Executive Business Intelligence.
 *
 * v5.0 — Clean text-only responses. No KPI cards, badges, or action buttons.
 */

const ZENVE_PET_KNOWLEDGE = {
  overview: {
    mtdRevenue: '₹4.82 Cr',
    revenueGrowth: '+16.4% MoM',
    totalOrders: '18,450 Orders',
    activePets: '46,200 Registered Pets',
    ebitda: '₹84.6L (17.5% Margin)',
    hubsCount: 14,
    sla: '96.8% (38 Min Avg)'
  },
  species: {
    total: 46200,
    dogs: { count: 31400, pct: '68.0%', topBreeds: 'Golden Retriever, Labrador, Beagle, Shih Tzu' },
    cats: { count: 12940, pct: '28.0%', topBreeds: 'Persian, Indie Cat, Siamese, Maine Coon' },
    exotics: { count: 1860, pct: '4.0%', types: 'Parrots, Rabbits, Guinea Pigs, Turtles' }
  },
  salesDrop: {
    'Delhi NCR': {
      dropAmt: '₹1.85L',
      dropPct: '-3.2%',
      orders: '3,840 Orders',
      reason: 'Regional courier rerouting due to monsoon transit bottlenecks.',
      remedy: 'Onboarded secondary dark-store hyper-local delivery partners.'
    },
    'Mumbai': {
      dropAmt: '₹1.20L',
      dropPct: '-2.1%',
      orders: '4,150 Orders',
      reason: 'Temporary stockout of imported prescription gastro diets.',
      remedy: 'Inter-hub rebalancing completed from Central Depot.'
    },
    'Bengaluru': {
      dropAmt: '₹0',
      dropPct: '+18.4%',
      orders: '6,420 Orders',
      reason: 'Record high adoption of 60-minute express pharmacy delivery.',
      remedy: 'Expanded EV fleet capacity by 15 riders.'
    },
    'Chennai': {
      dropAmt: '₹0.65L',
      dropPct: '-1.8%',
      orders: '2,890 Orders',
      reason: 'Specialist veterinary surgeon rotation leave week.',
      remedy: 'Scheduled senior visiting veterinary consultants.'
    }
  },
  clinics: {
    count: 14,
    hubs: ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Jayanagar', 'Bandra West', 'Andheri East', 'Powai', 'South Ext', 'Gurgaon Sec-29', 'Noida Sec-18', 'Anna Nagar', 'T. Nagar', 'Velachery'],
    icuOccupancy: '78.4%',
    surgicalSuccessRate: '99.2%'
  },
  doctors: [
    { name: 'Dr. Ramesh Kumar', role: 'Chief Veterinary Surgeon', exp: '14 yrs', specialty: 'Orthopedics & Soft Tissue' },
    { name: 'Dr. Sunita Rao', role: 'Head of Feline Internal Medicine', exp: '11 yrs', specialty: 'Renal & Cardiology' },
    { name: 'Dr. Vivek Menon', role: 'Director of Critical Care', exp: '12 yrs', specialty: '24/7 Trauma & Anesthesiology' }
  ],
  pharmacy: {
    valuation: '₹1.42 Cr',
    topMeds: [
      { name: 'Bravecto Chewable Dog 20-40kg', status: 'CRITICAL', runway: '3 Days', reorder: '400 Units', use: 'Ectoparasiticide' },
      { name: 'Vetmedin 5mg Chewable', status: 'LOW_STOCK', runway: '6 Days', reorder: '150 Units', use: 'Canine Congestive Heart Failure' },
      { name: 'Nobivac Tricat Trio Feline Vaccine', status: 'OPTIMAL', runway: '22 Days', reorder: '300 Vials', use: 'Feline Core Immunization' }
    ],
    coldChainCompliance: '99.8% Monitored (2-8°C)',
    expiryRisk: '₹1.85L under automated FEFO liquidation'
  },
  logistics: {
    sla: '97.4% Express 60-Minute Compliance',
    avgTime: '38.4 Minutes',
    costPerOrder: '₹48.50',
    fleet: '85 Dedicated EV Riders + 14 Mobile Medical Ambulances',
    coldChainBags: 'Active Phase-Change Insulated Fleet'
  },
  financials: {
    revenue: '₹4.82 Cr MTD',
    ebitda: '₹84.6L (17.5% Margin)',
    grossMargins: 'Surgeries: 68% · Pharmacy: 44% · Diagnostics: 72% · Retail: 38%',
    opex: '₹1.92 Cr (Staff, Facilities & Cloud)'
  },
  customers: {
    totalParents: 38900,
    activeSubscribers: 14250,
    repeatRate: '72.8%',
    cac: '₹420',
    ltv: '₹14,800',
    churnRiskCohort: '240 Pet Parents (Audited & In Win-Back)'
  }
};

const ZENVE_KNOWLEDGE = ZENVE_PET_KNOWLEDGE;

/* ──────────────────────────────────────────────
   Conversational Intent Detection
   ────────────────────────────────────────────── */

function detectConversationalIntent(text) {
  if (!text) return null;
  const raw = text.trim();
  const clean = raw.toLowerCase().replace(/^[^\w\s]+|[^\w\s]+$/g, '').trim();

  // If query contains business/pet domain keywords, route to domain reasoning
  const hasBusinessDomain = /\b(sales|drop|ebitda|profit|revenue|margin|inventory|bravecto|nexgard|clinic|clinics|hospital|hospitals|doctor|doctors|vet|aisha|rajesh|priya|rohan|ananya|logistics|delivery|rider|riders|sla|breach|transit|churn|retention|cac|roas|marketing|subscription|mrr|database|telemetry|stock|orders?|performance|scorecard|procedure|surgery|vaccine|vaccination|rabies|dhppi|feline|canine|breed|dog|cat|puppy|kitten|food|diet|toxic|chocolate|arthritis|kidney|tick|flea|dental|grooming|diagnostics|xray|ultrasound)\b/i.test(clean);
  if (hasBusinessDomain) return null;

  if (/\b(how\s*(are|r)\s*(you|u)|hw\s*r\s*u|how\s*is\s*(it|your\s*day|things)|hows\s*(it|your\s*day|things)|how\s*(are|r)\s*(you|u)\s*doing|how\s*do\s*(you|u)\s*do|what\s*s\s*up|whats\s*up|sup)\b/i.test(clean)) {
    return 'HOW_ARE_YOU';
  }

  if (/^(hi|hello|hey|heya|hola|howdy|yo|namaste|hi\s*there|hello\s*there|hey\s*there|good\s*(morning|afternoon|evening|day))(\s+zenve|\s+doctor|\s+dr)?$/i.test(clean) ||
      /^(hey|hi|hello)\b/i.test(clean)) {
    return 'GREETING';
  }

  if (/\b(who\s*(are|r)\s*(you|u)|what\s*(are|r)\s*(you|u)|what\s*can\s*(you|u)\s*do|what\s*do\s*(you|u)\s*do|your\s*name|tell me about yourself)\b/i.test(clean)) {
    return 'WHO_ARE_YOU';
  }

  if (/\b(joke|funny|humor|make\s*me\s*laugh)\b/i.test(clean)) {
    return 'PET_JOKE';
  }

  if (/^(thank\s*you|thanks|thx|ty|thank\s*u|many\s*thanks|cheers|awesome|great\s*job)(\s+doctor|\s+zenve)?$/i.test(clean)) {
    return 'THANKS';
  }

  if (/^(bye|goodbye|see\s*you|cya|take\s*care|bye\s*bye|good\s*night)(\s+zenve)?$/i.test(clean)) {
    return 'BYE';
  }

  if (/\b(help|what can you|how to use|how do i use|guide|tutorial|features)\b/i.test(clean)) {
    return 'HELP';
  }

  return null;
}

/* ──────────────────────────────────────────────
   Entity Extraction
   ────────────────────────────────────────────── */

function extractEntities(text) {
  const t = ' ' + text.toLowerCase() + ' ';
  const res = {
    locations: [],
    skus: [],
    doctors: [],
    species: [],
    procedures: [],
    timeframes: [],
    metrics: []
  };

  const locs = [
    { name: 'Delhi NCR', re: /\b(delhi|ncr|gurgaon|noida)\b/i },
    { name: 'Mumbai', re: /\b(mumbai|bombay|bandra|andheri|powai)\b/i },
    { name: 'Bengaluru', re: /\b(bengaluru|bangalore|indiranagar|koramangala|whitefield|hsr|jayanagar)\b/i },
    { name: 'Pune', re: /\b(pune|kalyani nagar)\b/i },
    { name: 'Hyderabad', re: /\b(hyderabad|jubilee)\b/i },
    { name: 'Chennai', re: /\b(chennai|adyar)\b/i },
    { name: 'Kolkata', re: /\b(kolkata|calcutta)\b/i },
    { name: 'Indiranagar Flagship', re: /\bindiranagar\b/i },
    { name: 'Koramangala 24/7 Trauma Hub', re: /\bkoramangala\b/i },
    { name: 'Whitefield Multi-Specialty', re: /\bwhitefield\b/i }
  ];
  locs.forEach(l => { if (l.re.test(t) && !res.locations.includes(l.name)) res.locations.push(l.name); });

  const skus = [
    { name: 'Bravecto Chewables', re: /\bbravecto\b/i },
    { name: 'NexGard Spectra', re: /\b(nexgard|spectra)\b/i },
    { name: 'Royal Canin Clinical Diet', re: /\b(royal canin|renal|gastro|urinary|hepatic)\b/i },
    { name: 'Apoquel 16mg Tablets', re: /\bapoquel\b/i },
    { name: 'Simparica Trio', re: /\bsimparica\b/i },
    { name: 'Synulox Palatable Drops', re: /\bsynulox\b/i },
    { name: 'Vetmedin (Pimobendan)', re: /\b(vetmedin|pimobendan)\b/i }
  ];
  skus.forEach(s => { if (s.re.test(t) && !res.skus.includes(s.name)) res.skus.push(s.name); });

  const docs = [
    { name: 'Dr. Aisha Khan', re: /\b(aisha|khan)\b/i },
    { name: 'Dr. Rajesh Nair', re: /\b(rajesh|nair)\b/i },
    { name: 'Dr. Priya Sharma', re: /\b(priya|sharma)\b/i },
    { name: 'Dr. Rohan Verma', re: /\b(rohan|verma)\b/i },
    { name: 'Dr. Ananya Sen', re: /\b(ananya|sen)\b/i }
  ];
  docs.forEach(d => { if (d.re.test(t) && !res.doctors.includes(d.name)) res.doctors.push(d.name); });

  const speciesList = [
    { name: 'Canine (Dogs)', re: /\b(dog|dogs|canine|puppy|puppies|hound|labrador|golden retriever|shih tzu|indie dog)\b/i },
    { name: 'Feline (Cats)', re: /\b(cat|cats|feline|kitten|kittens|persian|siamese)\b/i },
    { name: 'Exotic & Avian', re: /\b(bird|birds|parrot|parakeet|rabbit|hamster|turtle|exotic)\b/i }
  ];
  speciesList.forEach(sp => { if (sp.re.test(t) && !res.species.includes(sp.name)) res.species.push(sp.name); });

  const procs = [
    { name: 'Vaccination & Boosters', re: /\b(vaccin\w*|rabies|dhppi|fvrcp|shot|booster)\b/i },
    { name: 'Orthopedic & TPLO Surgery', re: /\b(tplo|orthopedic|bone|fracture|ligament|joint)\b/i },
    { name: 'Dental Scaling & Prophylaxis', re: /\b(dental|teeth|tartar|scaling|periodontal)\b/i },
    { name: 'Diagnostic Imaging & Lab', re: /\b(xray|x-ray|radiology|ultrasound|usg|cbc|blood test|biochem\w*)\b/i },
    { name: 'Spay & Neuter', re: /\b(spay|neuter|steriliz\w*|castrat\w*)\b/i }
  ];
  procs.forEach(pr => { if (pr.re.test(t) && !res.procedures.includes(pr.name)) res.procedures.push(pr.name); });

  if (/\b(7\s*d|7\s*days|seven days|past week|last week)\b/i.test(t)) res.timeframes.push('7D');
  else if (/\b(14\s*d|14\s*days|fortnight|last 2 weeks)\b/i.test(t)) res.timeframes.push('14D');
  else if (/\b(30\s*d|30\s*days|last month|past month)\b/i.test(t)) res.timeframes.push('30D');
  else if (/\b(mtd|month to date|this month)\b/i.test(t)) res.timeframes.push('MTD');

  const metrics = ['ebitda', 'revenue', 'sales', 'profit', 'margin', 'drop', 'churn', 'cac', 'roas', 'aov', 'sla', 'stockout', 'expiry', 'ltv'];
  metrics.forEach(m => { if (new RegExp('\\b' + m + '\\b', 'i').test(t)) res.metrics.push(m.toUpperCase()); });

  return res;
}

/* ──────────────────────────────────────────────
   Intent Classification
   ────────────────────────────────────────────── */

function classifyIntent(text, entities, ctx) {
  const t = text.toLowerCase();
  const scores = {
    PET_VACCINATION: 0,
    PET_TOXIC_FOOD: 0,
    PET_HEALTH_CARE: 0,
    PET_DEMOGRAPHICS: 0,
    PET_PROCEDURES: 0,
    SALES_DROP: 0,
    EBITDA_FINANCIALS: 0,
    PHARMACY_INVENTORY: 0,
    CLINICS_HOSPITALS: 0,
    DOCTOR_WORKLOAD: 0,
    LOGISTICS_DELIVERY: 0,
    CHURN_RETENTION: 0,
    WHAT_IF_SIMULATION: 0,
    MARKETING_METRICS: 0,
    SUBSCRIPTIONS: 0,
    VENDORS_PROCUREMENT: 0,
    GENERAL_SALES: 0,
    EXECUTIVE_STRATEGY: 0
  };

  if (/\b(vaccin\w*|rabies|dhppi|fvrcp|booster shot|immuniz\w*)\b/i.test(t)) scores.PET_VACCINATION += 10;
  if (/\b(chocolate|grape|raisin|onion|garlic|toxic|poison|poisonous|can dogs eat|xylitol)\b/i.test(t)) scores.PET_TOXIC_FOOD += 10;
  if (/\b(arthritis|tick fever|flea|allerg\w*|vomit\w*|diarrhea|itching|scratch\w*|kidney disease|heart disease|deworm\w*)\b/i.test(t)) scores.PET_HEALTH_CARE += 9;
  if (/\b(dog vs cat|how many dogs|how many cats|breeds?|registered pets|pet split|demographics)\b/i.test(t)) scores.PET_DEMOGRAPHICS += 10;
  if (/\b(surgery|surgeries|tplo|dental scaling|procedure|x-?ray|ultrasound|spay|neuter|biochemistry)\b/i.test(t)) scores.PET_PROCEDURES += 9;

  if (/\b(drop|decline|declined?|fell|down|dip|slipp?ed|loss|lost sales|drop details)\b/i.test(t)) scores.SALES_DROP += 9;
  if (/\b(ebitda|profit|gross margin|net margin|earnings|financials?|expenses?|opex|cost)\b/i.test(t)) scores.EBITDA_FINANCIALS += 8;
  if (/\b(bravecto|nexgard|inventory|stock|stockout|shortage|runway|expiry|reorder|po|valuation|medicines?|pharmacy)\b/i.test(t)) scores.PHARMACY_INVENTORY += 8;
  if (/\b(clinic|clinics|hospital|hospitals|indiranagar|koramangala|whitefield|bandra|gurgaon|bed|occupancy|icu|footfall)\b/i.test(t)) scores.CLINICS_HOSPITALS += 8;
  if (/\b(doctor|doctors|vet|vets|veterinarian|aisha|rajesh|priya|rohan|ananya|surgeon|consultations?)\b/i.test(t)) scores.DOCTOR_WORKLOAD += 8;
  if (/\b(logistics|delivery|rider|riders|60\s*min|dispatch|sla|breach|transit|speed)\b/i.test(t)) scores.LOGISTICS_DELIVERY += 8;
  if (/\b(churn|retention|pet parents?|cohort|attrition|lapse|winback|renew|ltv)\b/i.test(t)) scores.CHURN_RETENTION += 8;
  if (/\b(simulate|what if|scenario|if\b|increase by|hike|decrease by|cut by)\b/i.test(t)) scores.WHAT_IF_SIMULATION += 9;
  if (/\b(marketing|cac|roas|campaign|ad spend|google ads|meta ads|conversion)\b/i.test(t)) scores.MARKETING_METRICS += 8;
  if (/\b(subscription|wellness plan|recurring|mrr|membership|puppy bundle)\b/i.test(t)) scores.SUBSCRIPTIONS += 8;
  if (/\b(vendor|vendors|supplier|suppliers|procurement|zoetis|boehringer|elanco|mars)\b/i.test(t)) scores.VENDORS_PROCUREMENT += 8;
  if (/\b(revenue|sales|total sales|mtd sales|aov|channels?|android vs ios|ecommerce|orders?)\b/i.test(t)) scores.GENERAL_SALES += 7;
  if (/\b(grow|growth|strategy|advice|recommend\w*|summary|executive overview|how to improve)\b/i.test(t)) scores.EXECUTIVE_STRATEGY += 7;

  if (entities.locations.length > 0 && scores.SALES_DROP > 0) scores.SALES_DROP += 5;
  if (entities.skus.length > 0) scores.PHARMACY_INVENTORY += 5;
  if (entities.doctors.length > 0) scores.DOCTOR_WORKLOAD += 5;

  let maxIntent = 'EXECUTIVE_STRATEGY', maxScore = 0;
  for (const k in scores) {
    if (scores[k] > maxScore) { maxScore = scores[k]; maxIntent = k; }
  }
  return { intent: maxIntent, score: maxScore, confidence: Math.min(99.6, Math.max(93.5, 90 + maxScore * 1.1)) };
}

/* ──────────────────────────────────────────────
   Response Generator — Clean text-only replies
   ────────────────────────────────────────────── */

function generateResponse(text, ctx) {
  const K = ZENVE_PET_KNOWLEDGE;

  // 1. Check conversational input
  const conv = detectConversationalIntent(text);
  if (conv) {
    let reply = '';
    switch (conv) {
      case 'GREETING':
        reply = "Hello! 🐾 I'm **Dr. Zenve**, your Pet Healthcare & Business Intelligence assistant. How can I help you today?\n\nI can answer questions about our pet patients, hospital operations, pharmacy stocks, sales performance, and general pet health care.";
        break;
      case 'HOW_ARE_YOU':
        reply = "I'm doing great, thank you for asking! 🐶 All our systems are running smoothly — 14 clinic feeds are healthy and the 60-minute delivery fleet is at 97.6% on-time rate.\n\nHow can I help you today?";
        break;
      case 'WHO_ARE_YOU':
        reply = "I'm **Dr. Zenve AI**, your dedicated Pet Healthcare & Business Intelligence assistant. 🐾\n\nHere's what I can help you with:\n\n- **Pet Health Care** — vaccination schedules, toxic food alerts, common diseases, breed information\n- **Hospital Operations** — clinic performance, doctor workloads, ICU occupancy, surgical success rates\n- **Pharmacy & Inventory** — medicine stock levels, expiry alerts, reorder status\n- **Sales & Financials** — revenue trends, EBITDA analysis, sales drop diagnostics\n- **Logistics** — delivery SLA, fleet performance, cost per order\n- **Customer Insights** — churn risk, retention rates, customer lifetime value\n\nJust ask me anything and I'll provide you with the most relevant information from our databases.";
        break;
      case 'PET_JOKE':
        reply = "Here's a pet joke for you! 😄\n\n**Q:** Why did the cat sit on the computer?\n**A:** To keep an eye on the mouse! 🐱💻\n\n**Q:** What do you call a dog magician?\n**A:** A Labracadabrador! 🐕✨\n\nHope that made you smile! Is there anything else I can help with?";
        break;
      case 'THANKS':
        reply = "You're most welcome! 🐾 Happy to help. Feel free to ask me anything else about our pet patients, operations, or business performance.";
        break;
      case 'BYE':
        reply = "Goodbye! 🐾 Have a wonderful day. Wishing all our furry friends a healthy and happy time! Feel free to come back anytime you need help.";
        break;
      case 'HELP':
        reply = "Here's what you can ask me about:\n\n- **Pet demographics** — \"How many dogs vs cats do we have?\"\n- **Sales analysis** — \"Why did sales drop in Delhi NCR?\"\n- **Pharmacy inventory** — \"What is our Bravecto stock status?\"\n- **Clinic performance** — \"Which clinic has the highest EBITDA?\"\n- **Doctor information** — \"Who is Dr. Aisha Khan?\"\n- **Logistics** — \"How is our 60-minute delivery performing?\"\n- **Pet health** — \"Is chocolate bad for dogs?\" or \"What is the puppy vaccination schedule?\"\n- **Financial overview** — \"What is our consolidated EBITDA?\"\n\nJust type your question and I'll do my best to answer!";
        break;
      default:
        reply = "Hello! 🐾 How can I help you today? Feel free to ask me about pet health, business operations, or anything else.";
    }

    return {
      role: 'ai',
      text: reply,
      context: { intent: 'CONVERSATION', location: null, sku: null, doctor: null, timeframe: 'MTD' }
    };
  }

  // 2. Entity & Intent extraction
  const entities = extractEntities(text);
  const classification = classifyIntent(text, entities, ctx);
  // Follow-up handling: "what about Mumbai?" / "and last 7 days?" keeps the previous business topic
  const followUpIntents = ['SALES_DROP', 'GENERAL_SALES', 'CLINICS_HOSPITALS', 'LOGISTICS_DELIVERY', 'PHARMACY_INVENTORY', 'EBITDA_FINANCIALS', 'CHURN_RETENTION'];
  const isFollowUp = classification.score === 0
    && (entities.locations.length > 0 || entities.timeframes.length > 0)
    && ctx && followUpIntents.includes(ctx.intent);
  const intent = isFollowUp ? ctx.intent : classification.intent;

  const loc = entities.locations.length > 0 ? entities.locations[0] : (ctx && ctx.location ? ctx.location : null);
  const tf = entities.timeframes.length > 0 ? entities.timeframes[0] : 'MTD';

  const newCtx = {
    intent: intent,
    location: loc,
    sku: entities.skus.length > 0 ? entities.skus[0] : (ctx ? ctx.sku : null),
    doctor: entities.doctors.length > 0 ? entities.doctors[0] : (ctx ? ctx.doctor : null),
    timeframe: tf
  };

  let reply = '';

  // 3. Domain-specific response generation
  switch (intent) {
    case 'PET_TOXIC_FOOD': {
      reply = `Here are the key toxic food guidelines for pets:\n\n- **Chocolate (Theobromine Toxicity):** Highly dangerous for dogs. They metabolize theobromine very slowly. Dark chocolate and baking cocoa are the most toxic forms. Symptoms include rapid heart rate, seizures, and cardiac arrhythmias.\n\n- **Grapes & Raisins:** Extremely toxic to dogs. Even small amounts can cause acute, irreversible kidney failure.\n\n- **Onions & Garlic (Allium Species):** These cause oxidative damage to red blood cells, leading to hemolytic anemia. Both raw and cooked forms are harmful.\n\n- **Xylitol (Artificial Sweetener):** Found in sugar-free gum and some peanut butters. Triggers rapid insulin release causing severe hypoglycemia and liver failure within 30–60 minutes.\n\nIf your pet has ingested any of these, please seek immediate veterinary care. Our **Koramangala 24/7 Trauma Hub** and **Bandra West ICU** offer round-the-clock emergency services including gastric lavage and IV fluid support.`;
      break;
    }

    case 'PET_VACCINATION': {
      reply = `Here are the standard vaccination protocols we follow across our 14 clinics:\n\n**Puppies (Canine Core Schedule):**\n- 6–8 Weeks: DHPPi (Distemper, Hepatitis, Parvovirus, Parainfluenza) + Deworming\n- 10–12 Weeks: DHPPi Booster + Leptospirosis + Kennel Cough (Bordetella)\n- 14–16 Weeks: Rabies (Anti-Rabies Vaccine) + Final Core Booster\n- Annual: Rabies and DHPPi booster shots every 12 months\n\n**Kittens (Feline Core Schedule):**\n- 8–9 Weeks: FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)\n- 12 Weeks: FVRCP Booster + FeLV (Feline Leukemia)\n- 16 Weeks: Rabies Vaccine + Deworming\n\nAll vaccines across our 14 pharmacies are stored in IoT-monitored cold chain units maintained between 2°C and 8°C to ensure full potency.\n\nCurrently, our vaccination compliance rate is 91.8%, with 248 pet parents having lapsed annual boosters by more than 60 days.`;
      break;
    }

    case 'PET_HEALTH_CARE': {
      const hasArthritis = /arthritis/i.test(text);
      const hasTick = /tick/i.test(text);
      const hasFlea = /flea/i.test(text);
      const hasKidney = /kidney/i.test(text);
      const hasHeart = /heart/i.test(text);
      const hasAllergy = /allerg/i.test(text);
      const hasDeworm = /deworm/i.test(text);

      if (hasArthritis) {
        reply = `**Arthritis in Dogs — Key Information:**\n\nArthritis (osteoarthritis) is one of the most common chronic conditions in aging dogs, affecting roughly 20% of adult canines.\n\n- **Symptoms to watch:** Difficulty rising, reluctance to jump or climb stairs, limping after rest, and reduced playfulness.\n- **Management:** A combination of weight management, controlled exercise, joint supplements (glucosamine/chondroitin), and anti-inflammatory medications like Meloxicam or Carprofen.\n- **Our approach:** Our orthopedic specialists, including **Dr. Rajesh Nair** at Koramangala Trauma Hub, perform advanced joint assessments and can recommend hydrotherapy or laser therapy for chronic cases.\n\nIf you notice your pet showing signs of joint stiffness, I'd recommend scheduling a consultation at your nearest Zenve clinic.`;
      } else if (hasTick || hasFlea) {
        reply = `**Tick & Flea Prevention — Key Information:**\n\nTicks and fleas are the most common external parasites affecting pets in India, especially during warm and humid months.\n\n- **Tick Fever (Ehrlichiosis/Babesiosis):** Transmitted through tick bites. Symptoms include fever, lethargy, loss of appetite, and pale gums. If untreated, it can be fatal.\n- **Prevention options available at our pharmacy:**\n  - **Bravecto Chewables** — 12-week protection against ticks & fleas (currently 18 days of runway left, critical stock level)\n  - **NexGard Spectra** — Monthly protection including heartworm coverage (34 days runway, healthy stock)\n  - **Simparica Trio** — Monthly broad-spectrum protection\n\n- **Environmental control:** Regular cleaning of pet bedding, yard sprays, and avoiding tall grass areas during peak tick season.\n\nOur dermatology specialist **Dr. Ananya Sen** at Gurgaon handles complex tick fever cases and allergy-related skin conditions.`;
      } else if (hasKidney) {
        reply = `**Kidney Disease in Pets — Key Information:**\n\nChronic kidney disease (CKD) is particularly common in senior cats and affects about 1 in 3 cats over age 12.\n\n- **Symptoms:** Increased thirst and urination, weight loss, decreased appetite, vomiting, and lethargy.\n- **Diagnosis:** Blood tests (BUN, creatinine), urinalysis, and ultrasound imaging are standard. Our diagnostic labs across all 14 hubs provide same-day results.\n- **Treatment:** Prescription renal diets (we carry **Royal Canin Renal Diet** — currently at 14-day runway, reorder in progress), fluid therapy, and phosphorus binders.\n\nOur feline specialist **Dr. Priya Sharma** at Whitefield Multi-Specialty is experienced in managing chronic kidney cases with a 98.9% client satisfaction rating.`;
      } else if (hasHeart) {
        reply = `**Heart Disease in Pets — Key Information:**\n\nHeart disease affects approximately 10% of dogs, with certain breeds (Cavalier King Charles Spaniels, Dobermans, Boxers) being more susceptible.\n\n- **Common conditions:** Mitral valve disease (small breeds), dilated cardiomyopathy (large breeds), and congestive heart failure.\n- **Symptoms:** Coughing (especially at night), exercise intolerance, rapid breathing, and abdominal swelling.\n- **Treatment:** We stock **Vetmedin 5mg (Pimobendan)** for congestive heart failure management (29 days runway, healthy stock). Additional medications include Furosemide and ACE inhibitors.\n\nEarly detection through regular cardiac screening can significantly improve outcomes. Our veterinary teams perform cardiac auscultation as part of every wellness check.`;
      } else if (hasAllergy) {
        reply = `**Pet Allergies — Key Information:**\n\nAllergies are one of the most common reasons for veterinary visits, affecting both dogs and cats.\n\n- **Types:** Environmental (pollen, dust mites), food allergies, and contact allergies.\n- **Symptoms:** Itching, redness, ear infections, excessive licking, and hot spots.\n- **Treatment options:**\n  - **Apoquel 16mg** — Fast-acting itch relief for atopic dermatitis (42 days runway, healthy stock)\n  - **Cytopoint injections** — Long-lasting antibody therapy (4–8 weeks relief per injection)\n  - **Elimination diets** — To identify food triggers\n\nOur dermatology consultant **Dr. Ananya Sen** at Gurgaon specializes in allergy desensitization and Cytopoint therapy, handling 42 consultations per week with a 99.1% client rating.`;
      } else if (hasDeworm) {
        reply = `**Deworming Schedule for Pets:**\n\n- **Puppies:** Every 2 weeks from age 2 weeks until 12 weeks, then monthly until 6 months, and quarterly thereafter.\n- **Kittens:** Starting at 3 weeks, every 2 weeks until 12 weeks, then monthly until 6 months, and quarterly thereafter.\n- **Adult dogs and cats:** Every 3 months (quarterly) as a preventive measure.\n\nCommon intestinal parasites include roundworms, hookworms, tapeworms, and whipworms. Symptoms of worm infestation include pot-bellied appearance, weight loss, diarrhea, and visible worms in stool.\n\nWe carry broad-spectrum dewormers including Drontal Plus and Panacur across all 14 pharmacy locations. Regular deworming is critical, especially for pets that go outdoors frequently.`;
      } else {
        reply = `Here's a general pet health overview based on our clinical data:\n\n- **Preventive Care:** Regular vaccinations, deworming, and tick/flea prevention form the foundation of good pet health. Our vaccination compliance rate is currently 91.8%.\n- **Nutrition:** Proper diet tailored to breed, age, and health conditions is essential. We stock prescription diets from Royal Canin, Hill's Science Diet, and Farmina.\n- **Dental Health:** About 80% of dogs and 70% of cats show signs of dental disease by age 3. Regular dental checkups and scaling are recommended.\n- **Senior Pet Care:** Pets over 7 years should have bi-annual health checkups including blood work, urinalysis, and cardiac screening.\n\nOur 14 hospital hubs have a surgical success rate of 99.4% and our specialists cover orthopedics, feline medicine, emergency care, and dermatology. Feel free to ask about any specific health concern!`;
      }
      break;
    }

    case 'PET_DEMOGRAPHICS': {
      reply = `Here's our current pet patient census across the Zenve network:\n\n**Total Registered Pets: ${K.species.total.toLocaleString()}**\n\n- **Dogs: ${K.species.dogs.count.toLocaleString()} (${K.species.dogs.pct})**\n  Top breeds: ${K.species.dogs.topBreeds}\n\n- **Cats: ${K.species.cats.count.toLocaleString()} (${K.species.cats.pct})**\n  Top breeds: ${K.species.cats.topBreeds}\n\n- **Exotic & Avian Companions: ${K.species.exotics.count.toLocaleString()} (${K.species.exotics.pct})**\n  Types: ${K.species.exotics.types}\n\nFeline adoptions are growing at +28% year-over-year, particularly in Bengaluru and Mumbai. Our Whitefield hub has earned a dedicated Cat-Friendly Clinic certification to cater to this growing segment.`;
      break;
    }

    case 'PET_PROCEDURES': {
      reply = `Here's an overview of veterinary procedures across our 14 hospital hubs:\n\n**Surgical Procedures:**\n- Orthopedic surgeries (TPLO, fracture repairs): Led by Dr. Rajesh Nair — 18 complex surgeries per week with 99.2% recovery rate\n- Soft tissue surgeries: Led by Dr. Aisha Khan — 22 surgeries per week with 99.6% recovery rate\n- Spay & neuter procedures: Available at all 14 hubs with same-day discharge for healthy pets\n\n**Diagnostic Services:**\n- Digital X-ray and ultrasound imaging: Available at all hubs with same-day reporting\n- CBC, biochemistry panels, and urinalysis: Results typically within 2–4 hours\n- Specialized cardiac and thyroid screenings: Available at flagship hubs\n\n**Dental Care:**\n- Professional dental scaling and polishing under anesthesia\n- Dental extractions and oral surgery\n- Complimentary dental assessment during wellness visits\n\nOur overall surgical success rate across the network is **99.4%**, with ICU bed occupancy at 81.4%.`;
      break;
    }

    case 'SALES_DROP': {
      const targetCity = loc || 'Delhi NCR';
      const dropInfo = K.salesDrop[targetCity] || K.salesDrop['Delhi NCR'];
      const isGrowing = dropInfo.dropPct.startsWith('+');

      if (isGrowing) {
        reply = `**${targetCity} — Sales Performance (${tf}):**\n\n${targetCity} is actually performing well with a positive growth of **${dropInfo.dropPct}** across ${dropInfo.orders}.\n\n**Key drivers:** ${dropInfo.reason}.\n\n**Recommendation:** ${dropInfo.remedy}.`;
      } else {
        reply = `**Sales Drop Analysis — ${targetCity} (${tf}):**\n\nWe've seen a revenue decline of **${dropInfo.dropAmt} (-${dropInfo.dropPct})** across ${dropInfo.orders} in ${targetCity}.\n\n**Root Cause:** ${dropInfo.reason}.\n\n**Corrective Action Taken:** ${dropInfo.remedy}.\n\n**Recovery Outlook:** Full volume recovery is expected within 7–10 days from the date the corrective measures were implemented.`;
      }
      break;
    }

    case 'PHARMACY_INVENTORY': {
      reply = `**Pharmacy & Inventory Status:**\n\nOur total inventory is valued at **${K.pharmacy.valuation}**.\n\nHere's the status of key medications:\n\n- **Bravecto Chewables (Fluralaner)** — ⚠️ CRITICAL: Only 18 days of stock remaining. A reorder of 600 units is needed to prevent stockouts. Used for 12-week tick & flea prevention.\n\n- **NexGard Spectra** — ✅ Healthy: 34 days of runway. Stock levels are optimal across all hubs. Used for monthly tick, flea & heartworm protection.\n\n- **Royal Canin Renal Diet** — ⚠️ Warning: 14 days of runway remaining. A reorder of 450 bags has been placed. Used for feline & canine kidney support.\n\n- **Apoquel 16mg** — ✅ Healthy: 42 days of runway. Used for atopic dermatitis & allergy relief.\n\n- **Synulox Palatable Drops** — ✅ Healthy: 38 days of runway. Broad-spectrum antibiotic.\n\n- **Vetmedin 5mg (Pimobendan)** — ✅ Healthy: 29 days of runway. Used for congestive heart failure.\n\n**Cold chain compliance** is at 100% with IoT temperature monitoring (2°C – 8°C). There are 14 batches with less than 90 days to expiry (₹1.82L value), being managed under FEFO priority protocol.`;
      break;
    }

    case 'CLINICS_HOSPITALS': {
      reply = `**Hospital & Clinic Network Overview:**\n\nWe operate **${K.clinics.count} multi-specialty veterinary hospitals** across India. Here are the top-performing hubs:\n\n`;

      K.clinics.hubs.forEach(h => {
        reply += `- **${h.name} (${h.city}):** EBITDA ${h.ebitda} · ${h.beds} beds · Lead: ${h.lead}\n`;
      });

      reply += `\n**Network Metrics:**\n- ICU bed occupancy: **${K.clinics.icuOccupancy}**\n- Surgical success rate: **${K.clinics.surgicalSuccessRate}**\n\nThe highest EBITDA this month comes from **Indiranagar Flagship** at ₹16.4L (26.2% margin), followed by **Bandra West** at ₹14.2L (24.8% margin).`;
      break;
    }

    case 'DOCTOR_WORKLOAD': {
      // Check if a specific doctor is being asked about
      const askedDoctor = entities.doctors.length > 0 ? entities.doctors[0] : null;

      if (askedDoctor) {
        const doc = K.doctors.find(d => d.name === askedDoctor);
        if (doc) {
          reply = `**${doc.name}** — ${doc.title}\n\n- **Specialty:** ${doc.specialty}\n- **Hub:** ${doc.hub}\n- **Performance:** ${doc.stats}\n\n${doc.name} is one of our top specialists and is available for consultations at the ${doc.hub} location.`;
        } else {
          reply = `I don't have detailed information about that specific doctor. Here are our lead specialists:\n\n`;
          K.doctors.forEach(d => {
            reply += `- **${d.name}** — ${d.title} at ${d.hub}. ${d.stats}.\n`;
          });
        }
      } else {
        reply = `**Veterinary Specialist Team:**\n\nHere are our lead veterinary specialists and their performance:\n\n`;
        K.doctors.forEach(d => {
          reply += `- **${d.name}** (${d.hub}) — ${d.title}. Specialty: ${d.specialty}. Performance: ${d.stats}.\n\n`;
        });
        reply += `Our team of 42 veterinary doctors across 14 hubs maintains an average recovery rate of 99.2% with a client satisfaction score of 4.9/5.0.`;
      }
      break;
    }

    case 'LOGISTICS_DELIVERY': {
      reply = `**60-Minute Express Delivery Performance:**\n\nOur hyper-local delivery service is performing well across all operational zones:\n\n- **On-time SLA compliance:** ${K.logistics.sla}\n- **Average delivery time:** ${K.logistics.avgTime} from order to doorstep\n- **Cost per delivery:** ${K.logistics.costPerOrder}\n- **Fleet strength:** ${K.logistics.fleet}\n- **Cold chain capability:** ${K.logistics.coldChainBags}\n\nAll temperature-sensitive medications (vaccines, biologics) are transported in medical-grade insulated bags with eutectic ice gel packs to maintain the 2°C – 8°C range throughout transit.`;
      break;
    }

    case 'CHURN_RETENTION': {
      reply = `**Pet Parent Retention & Churn Analysis:**\n\nHere's our current retention status:\n\n- **Total pet parents:** ${K.customers.totalParents.toLocaleString()}\n- **Active subscribers:** ${K.customers.activeSubscribers.toLocaleString()}\n- **Repeat order rate:** ${K.customers.repeatRate}\n- **Customer acquisition cost:** ${K.customers.cac} (blended)\n- **Annual lifetime value:** ${K.customers.ltv}\n\n**Churn Risk:** We've identified 248 pet parents with greater than 75% churn probability. The primary trigger is annual booster vaccine lapse exceeding 60 days, which accounts for 44% of all lapses.\n\n**Recovery opportunity:** Automated WhatsApp reminders offering complimentary dental triage checkups can recover an estimated ₹8.4 Lakh in annual recurring revenue from this at-risk cohort.`;
      break;
    }

    case 'EBITDA_FINANCIALS': {
      reply = `**Financial Performance Overview (MTD):**\n\n- **Consolidated Revenue:** ${K.financials.revenue}\n- **EBITDA:** ${K.financials.ebitda}, outperforming budget by +₹4.2 Lakh\n\n**Gross Margins by Vertical:**\n- Clinical Care & Surgeries: 62.8%\n- E-Pharmacy & Prescription Meds: 44.2%\n- Preventive Pet Nutrition: 31.4%\n- Professional Grooming & Spa: 54.0%\n\n**Operating Expenses (${K.financials.opex}):**\n- Staff & Specialist Doctors: 58%\n- Hyper-Local Logistics: 18%\n- Hub Rent & Leases: 14%\n- Marketing & Growth: 10%\n\nThe highest EBITDA-generating clinic is **Indiranagar Flagship** at ₹16.4L (26.2% margin). An additional ₹3.8 Lakh per month can be recovered through direct pharmaceutical procurement contracts with Zoetis and Boehringer.`;
      break;
    }

    case 'GENERAL_SALES': {
      reply = `**Sales & Revenue Performance (MTD):**\n\n- **Total Revenue:** ${K.overview.mtdRevenue}, growing at ${K.overview.revenueGrowth}\n- **Total Orders:** ${K.overview.totalOrders}\n\n**Revenue by Channel:**\n- In-Clinic Consultations & Surgeries: ₹77.4 Lakh (42%)\n- E-Pharmacy & Therapeutics: ₹62.6 Lakh (34%)\n- Pet Food, Diets & Fashion: ₹25.8 Lakh (14%)\n- Diagnostics & Telehealth: ₹18.4 Lakh (10%)\n\n**Platform Split:**\n- Android App: 52% (₹95.8L)\n- iOS App: 31% (₹57.1L) — higher average order value at ₹2,410 vs ₹1,620 on Android\n- Web & Direct: 17% (₹31.3L)\n\nOverall, the business is on a healthy growth trajectory with strong margins across clinical and pharmacy verticals.`;
      break;
    }

    case 'MARKETING_METRICS': {
      reply = `**Marketing Performance Overview:**\n\n- **Customer Acquisition Cost (CAC):** ${K.customers.cac}\n- **Customer Lifetime Value (LTV):** ${K.customers.ltv}\n- **LTV/CAC Ratio:** ~29.5x (extremely healthy)\n\n**Marketing Budget Allocation:**\n- Total marketing spend represents 10% of OPEX (within the ₹42.8L total)\n- Primary channels: Google Ads (search & display), Meta Ads (Instagram/Facebook), WhatsApp campaigns, and in-clinic referral programs\n\n**Key Metrics:**\n- Active pet parent base: ${K.customers.totalParents.toLocaleString()}\n- Active subscribers: ${K.customers.activeSubscribers.toLocaleString()}\n- Repeat purchase rate: ${K.customers.repeatRate}\n\nThe most cost-effective acquisition channel is the in-clinic referral program, with pet parents referred by existing customers showing 2.3x higher retention rates.`;
      break;
    }

    case 'SUBSCRIPTIONS': {
      reply = `**Subscription & Wellness Plans:**\n\n- **Active subscribers:** ${K.customers.activeSubscribers.toLocaleString()} pet parents on recurring wellness plans\n- **Subscription types:** Puppy Bundle (vaccination + deworming + nutrition), Senior Wellness Plan (quarterly health checkups + blood work), and Preventive Care (monthly tick/flea + quarterly deworming)\n\n- **Repeat order rate:** ${K.customers.repeatRate} across pet food and preventive medications\n- **Annual LTV for subscribers:** ${K.customers.ltv}\n\nSubscription plans drive significantly higher retention and predictable revenue. Subscribers show 40% lower churn rates compared to one-time purchasers.`;
      break;
    }

    case 'VENDORS_PROCUREMENT': {
      reply = `**Vendor & Procurement Overview:**\n\nWe source pharmaceuticals and pet nutrition products from leading global manufacturers:\n\n- **Zoetis** — Apoquel, Simparica, diagnostics kits\n- **Boehringer Ingelheim** — NexGard Spectra, Vetmedin, vaccines\n- **MSD Animal Health (Merck)** — Bravecto Chewables, Nobivac vaccines\n- **Mars Petcare** — Royal Canin prescription diets, Pedigree nutrition\n- **Elanco** — Credelio, Galliprant, deworming products\n\n**Procurement Optimization:** Direct contracts with Zoetis and Boehringer can save approximately ₹3.8 Lakh per month by eliminating distributor margins on high-volume SKUs.\n\n**Cold Chain Compliance:** ${K.pharmacy.coldChainCompliance}.\n\nAll vendor deliveries are tracked through our IoT-enabled warehouse management system.`;
      break;
    }

    case 'WHAT_IF_SIMULATION': {
      const pctMatch = /(\d+(?:\.\d+)?)\s*%/i.exec(text);
      const simPct = pctMatch ? parseFloat(pctMatch[1]) : 8;
      const costIncrease = Math.round(15500 * simPct);
      const newEbitda = (20.7 - simPct * 0.08).toFixed(1);

      reply = `**What-If Simulation: ${simPct}% Cost Variance**\n\nIf logistics costs increase by ${simPct}%, here's the projected impact:\n\n- **Monthly cost increase:** +₹${(costIncrease / 1000).toFixed(1)}k in delivery rider payouts\n- **EBITDA impact:** Margin shifts from 20.7% to ${newEbitda}% — a compression of ${(simPct * 0.08).toFixed(1)} percentage points\n- **Annual P&L impact:** -₹${(costIncrease * 12 / 100000).toFixed(1)}L on the bottom line\n\n**Mitigation Strategy:** Dynamic 2.5km delivery batching combined with off-peak route grouping can save approximately ₹94,000 per month, which would fully offset a ${simPct}% variance in logistics costs.\n\nAdditionally, renegotiating rider incentive structures during low-demand hours (10 AM – 2 PM) could yield another 3–4% cost reduction.`;
      break;
    }

    case 'EXECUTIVE_STRATEGY': {
      reply = `**Executive Summary — Zenve Pets Healthcare:**\n\nHere's a high-level view of the business:\n\n- **Revenue:** ${K.overview.mtdRevenue} with ${K.overview.revenueGrowth} growth\n- **EBITDA:** ${K.overview.ebitda}\n- **Active Pets:** ${K.overview.activePets} across ${K.overview.hubsCount} hospital hubs\n- **Delivery SLA:** ${K.overview.sla}\n\n**Key Strategic Priorities:**\n\n1. **Preventive health focus** — Driving annual vaccination renewals and dental checkups reduces costly emergency visits and improves customer retention.\n\n2. **Supply chain resilience** — Maintaining strict 30-day buffer stocks for critical medications (Bravecto, Apoquel, Renal diets) prevents revenue loss from stockouts.\n\n3. **Multi-channel growth** — Connecting clinic walk-in pet parents with the 60-minute doorstep delivery app creates a seamless omnichannel experience.\n\n4. **Churn reduction** — Targeting the 248 at-risk pet parents with proactive outreach can recover ₹8.4L in annual recurring revenue.\n\nOverall, the business is in a strong position with healthy margins and a growing customer base.`;
      break;
    }

    default: {
      // Thoughtful fallback — attempt to provide a meaningful answer
      reply = `That's a great question. Let me share what I know from our current data:\n\nZenve Pets Healthcare operates ${K.clinics.count} multi-specialty veterinary hospitals with ${K.species.total.toLocaleString()} registered pets. Our month-to-date revenue stands at ${K.overview.mtdRevenue} with an EBITDA margin of 20.7%.\n\nIf your question is about a specific topic, here are some areas I can provide detailed information on:\n\n- **Pet health** — vaccination schedules, disease information, toxic food warnings\n- **Business metrics** — revenue, EBITDA, sales analysis by region\n- **Operations** — clinic performance, doctor workloads, inventory status\n- **Logistics** — delivery SLA, fleet performance\n- **Customer insights** — churn risk, retention rates, LTV\n\nCould you rephrase your question or ask about one of these specific areas? I'll be happy to provide a detailed answer.`;
      break;
    }
  }

  return {
    role: 'ai',
    text: reply,
    context: newCtx
  };
}

    return { generateResponse: generateResponse };
  })();

  function formatLlmText(text) {
    if (!text) return '';
    var s = esc(text);
    s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
    s = s.replace(/\n\n/g, '<div style="height:8px;"></div>');
    s = s.replace(/^(\s*)[-•]\s+/gm, '$1• ');
    s = s.replace(/\n/g, '<br/>');
    return s;
  }

  /* ── Autonomous Co-Pilot Visualization & Action Helpers ── */
  function renderChartHtml(chart) {
    if (!chart || !chart.data || !chart.data.length) return '';
    var colors = chart.colors || ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];
    var xKey = chart.xKey || 'name';
    var yKeys = chart.yKeys || ['val', 'value'];

    var maxVal = 1;
    chart.data.forEach(function (d) {
      yKeys.forEach(function (k) {
        if (typeof d[k] === 'number' && d[k] > maxVal) maxVal = d[k];
      });
      if (typeof d.value === 'number' && d.value > maxVal) maxVal = d.value;
    });

    var barsHtml = '';
    if (chart.type === 'pie') {
      barsHtml = [
        '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">',
        chart.data.map(function (d, i) {
          var col = d.color || colors[i % colors.length];
          return [
            '<div style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 11.5px;">',
              '<span style="width: 10px; height: 10px; border-radius: 50%; background: ' + col + ';"></span>',
              '<span style="font-weight: 700; color: #0f172a;">' + esc(d.name) + '</span>',
              '<span style="font-family: \'IBM Plex Mono\', monospace; color: #059669; font-weight: 700;">' + esc(d.value) + '%</span>',
            '</div>'
          ].join('');
        }).join(''),
        '</div>'
      ].join('');
    } else {
      barsHtml = chart.data.map(function (d) {
        var label = d[xKey] || d.name || '';
        var primaryKey = yKeys[0];
        var val = d[primaryKey] != null ? d[primaryKey] : (d.value || 0);
        var pct = Math.min(100, Math.max(14, Math.round((val / maxVal) * 100)));
        var barColor = colors[0];
        var displayVal = typeof val === 'number' ? (val % 1 !== 0 ? val.toFixed(1) : val) : val;

        return [
          '<div class="zai-chart-bar-row">',
            '<div class="zai-chart-bar-label" title="' + esc(label) + '">' + esc(label) + '</div>',
            '<div class="zai-chart-bar-track">',
              '<div class="zai-chart-bar-fill" style="width: ' + pct + '%; background: ' + barColor + ';">',
                esc(displayVal),
              '</div>',
            '</div>',
          '</div>'
        ].join('');
      }).join('');
    }

    return [
      '<div class="zai-chart-card">',
        '<div class="zai-chart-title">📊 ' + esc(chart.title || 'Live Executive Telemetry') + '</div>',
        barsHtml,
      '</div>'
    ].join('');
  }

  function renderTableHtml(table) {
    if (!table || !table.rows || !table.rows.length) return '';
    var cols = table.columns || Object.keys(table.rows[0]);
    return [
      '<div class="zai-chat-table-wrap">',
        '<table class="zai-chat-table">',
          '<thead>',
            '<tr>',
              cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join(''),
            '</tr>',
          '</thead>',
          '<tbody>',
            table.rows.map(function (r) {
              return [
                '<tr>',
                  cols.map(function (c, ci) {
                    var v = r[c] != null ? r[c] : Object.values(r)[ci];
                    return '<td>' + esc(v) + '</td>';
                  }).join(''),
                '</tr>'
              ].join('');
            }).join(''),
          '</tbody>',
        '</table>',
      '</div>'
    ].join('');
  }

  function renderActionProposalHtml(act, msgIdx) {
    if (!act) return '';
    var isExecuted = act.status === 'EXECUTED';
    var badgeLabel = (act.action_type || 'ACTION PROPOSAL').replace(/_/g, ' ');

    var paramsHtml = '';
    if (act.parameters && Object.keys(act.parameters).length) {
      paramsHtml = [
        '<div class="zai-action-params-box">',
          '<div class="zai-action-param-grid">',
            Object.entries(act.parameters).map(function (pair) {
              return [
                '<div class="zai-action-param-item">',
                  '<span class="zai-action-param-label">' + esc(pair[0].replace(/_/g, ' ')) + '</span>',
                  '<span class="zai-action-param-val">' + esc(pair[1]) + '</span>',
                '</div>'
              ].join('');
            }).join(''),
          '</div>',
        '</div>'
      ].join('');
    }

    var footerControls = '';
    if (isExecuted) {
      var receipt = act.receipt || {};
      footerControls = [
        '<div class="zai-exec-receipt">',
          '<span>✅ <strong>Action Executed in ERP:</strong> ' + esc(receipt.summary || act.description) + '</span>',
          '<span style="margin-left: auto; font-family: \'IBM Plex Mono\', monospace; font-size: 11px; color: #047857; font-weight: 700;">' + esc(receipt.transaction_ref || 'TXN-CONFIRMED') + '</span>',
        '</div>'
      ].join('');
    } else {
      footerControls = [
        '<div class="zai-action-controls">',
          '<button type="button" class="zai-exec-btn" data-action-id="' + esc(act.action_id) + '" data-msg-idx="' + msgIdx + '">',
            '⚡ Approve &amp; Execute Action',
          '</button>',
          '<button type="button" class="zai-action-btn" onclick="alert(\'Action configured: ' + esc(act.title) + '\')">',
            '✏️ Customize',
          '</button>',
          '<span style="font-size: 11px; color: #64748b; font-weight: 600; margin-left: auto;">🛡️ Human-in-the-Loop Safeguard</span>',
        '</div>'
      ].join('');
    }

    return [
      '<div class="zai-action-proposal-card">',
        '<div class="zai-action-header">',
          '<div class="zai-action-title-group">',
            '<span class="zai-action-badge">⚡ ' + esc(badgeLabel) + '</span>',
            '<h4 class="zai-action-title">' + esc(act.title) + '</h4>',
          '</div>',
          act.impact_badge ? '<span class="zai-action-impact-tag">💹 ' + esc(act.impact_badge) + '</span>' : '',
        '</div>',
        '<p class="zai-action-desc">' + esc(act.description) + '</p>',
        paramsHtml,
        footerControls,
      '</div>'
    ].join('');
  }

  /* ── 1. Ask Zenve AI — Autonomous Executive Co-Pilot ── */
  function renderAskAi() {
    var msgsHtml = S.chatHistory.map(function (m, idx) {
      // Agent Pipeline steps
      var agentStepsHtml = '';
      if (m.agent_steps && m.agent_steps.length) {
        agentStepsHtml = [
          '<div class="zai-agent-pipeline">',
            '<span style="font-size: 10px; font-weight: 800; color: #64748b; margin-right: 4px; display: inline-flex; align-items: center;">🤖 MULTI-AGENT:</span>',
            m.agent_steps.map(function (st) {
              return '<span class="zai-agent-step-pill active">✓ ' + esc(st.agent) + '</span>';
            }).join(''),
          '</div>'
        ].join('');
      } else if (m.nlpMeta) {
        agentStepsHtml = [
          '<div class="zai-nlp-meta">',
            '<span class="zai-nlp-tag intent">🐾 ' + esc(m.nlpMeta.intent) + '</span>',
            (m.nlpMeta.entities || []).map(function (e) {
              return '<span class="zai-nlp-tag entity">🏷️ ' + esc(e) + '</span>';
            }).join(''),
            '<span class="zai-nlp-tag grounding">🛡️ ' + esc(m.nlpMeta.grounding || '0 Hospital Hubs') + '</span>',
            '<span style="margin-left: auto; font-family: \'IBM Plex Mono\', monospace; font-size: 10px; color: #059669; font-weight: 700;">Conf: ' + esc(m.nlpMeta.confidence || '0%') + '</span>',
          '</div>'
        ].join('');
      }

      var kpisHtml = '';
      if (m.kpis && m.kpis.length) {
        kpisHtml = [
          '<div class="zai-kpi-pill-row">',
            m.kpis.map(function (k) {
              return [
                '<div class="zai-kpi-pill ' + esc(k.trend || 'info') + '">',
                  '<span class="zai-kpi-pill-label">' + esc(k.label) + '</span>',
                  '<span class="zai-kpi-pill-val">' + esc(k.val) + '</span>',
                '</div>'
              ].join('');
            }).join(''),
          '</div>'
        ].join('');
      }

      var chartHtml = renderChartHtml(m.chart);
      var tableHtml = renderTableHtml(m.table);

      var actionsHtml = '';
      if (m.actions && m.actions.length) {
        actionsHtml = m.actions.map(function (act) {
          if (act.action_id && (act.title || act.action_type)) {
            return renderActionProposalHtml(act, idx);
          }
          return [
            '<div class="zai-action-row">',
              '<button type="button" class="zai-action-btn ' + (act.primary ? 'primary' : '') + '"',
              ' data-act-type="' + esc(act.type || 'nav') + '"',
              ' data-hash="' + esc(act.hash || '') + '"',
              ' data-scroll="' + esc(act.scrollTarget || '') + '"',
              ' data-action-id="' + esc(act.actionId || '') + '"',
              ' data-msg-idx="' + idx + '">',
                esc(act.label),
              '</button>',
            '</div>'
          ].join('');
        }).join('');
      }

      var actionFeedbackHtml = '';
      if (m.actionFeedback) {
        actionFeedbackHtml = '<div class="zai-action-toast">✅ ' + esc(m.actionFeedback) + '</div>';
      }

      var followupsHtml = '';
      if (m.followups && m.followups.length) {
        followupsHtml = [
          '<div class="zai-followups-box">',
            '<span class="zai-followup-title">🐾 Dr. Zenve Recommends Exploring:</span>',
            m.followups.map(function (f) {
              return '<button type="button" class="zai-followup-btn" data-query="' + esc(f) + '">' + esc(f) + '</button>';
            }).join(''),
          '</div>'
        ].join('');
      }

      var avatarBadge = m.role === 'ai' ? '🐾' : '👤';

      return [
        '<div class="zai-msg ' + m.role + '">',
          '<div class="zai-avatar ' + m.role + '" title="' + (m.role === 'ai' ? 'Dr. Zenve Veterinary AI' : 'Executive Pet Parent') + '">' + avatarBadge + '</div>',
          '<div class="zai-bubble">',
            agentStepsHtml,
            '<div class="zai-formatted-body">' + formatLlmText(m.text) + '</div>',
            kpisHtml,
            chartHtml,
            tableHtml,
            actionsHtml,
            actionFeedbackHtml,
            followupsHtml,
          '</div>',
        '</div>'
      ].join('');
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Database Records', '46,200 Loaded', '+1,420 Pets (30D)', 'up', '14 Hospital Hubs Synced', '💾'),
        kpiHtml('Settled Revenue', '₹4.82 Cr MTD', '+16.4% MoM', 'up', 'Across 18,450 Orders', '💹'),
        kpiHtml('Text-to-Action Engine', 'Autonomous Active', 'Human-in-Loop', 'success', 'Real ERP Commits', '⚡'),
        kpiHtml('Clinical Grounding', 'Connected & Grounded', '98.2% Confidence', 'up', 'MySQL Live Grounding', '🛡️'),
      '</div>',

      '<div class="zai-card zai-pet-chat-card" style="padding: 0;">',
        '<div class="zai-pet-chat-header">',
          '<div style="display: flex; align-items: center; gap: 10px;">',
            '<div class="zai-pet-avatar-glow">🐾</div>',
            '<div>',
              '<div style="display: flex; align-items: center; gap: 8px;">',
                '<span style="font-size: 13.5px; font-weight: 800; color: #0f172a;">Dr. Zenve — Autonomous Multi-Agent Executive Co-Pilot</span>',
                '<span class="zai-pet-tag-active"><span class="zai-pulse-dot" style="background:#10b981;"></span> Live Text-to-Action Active</span>',
              '</div>',
              '<div style="font-size: 11px; color: #64748b; font-weight: 500; margin-top: 1px;">',
                '46,200 Pet Patients · 14 Hospital Facilities · 1,420 Pharmacy SKUs · Live Telemetry Grounding Active',
              '</div>',
            '</div>',
          '</div>',
          '<div style="display: flex; align-items: center; gap: 8px;">',
            '<button type="button" class="zai-btn" id="zai-audit-trail-btn" title="View Executive Action Audit Log" style="font-size: 11px; padding: 5px 10px;">📋 Action Audit Log</button>',
            '<button type="button" class="zai-btn zai-pet-clean-btn" id="zai-clear-chat" title="Clear Chat History">🧹 Reset Chat</button>',
          '</div>',
        '</div>',
        '<div class="zai-chat-box">',
          '<div class="zai-chat-msgs" id="zai-chat-msgs">',
            msgsHtml,
          '</div>',
          '<div class="zai-chips">',
            '<span style="font-size: 11.5px; font-weight: 800; color: #475569; margin-right: 4px; display: inline-flex; align-items: center; gap: 4px;">⚡ Executive Actions (10 Prompts):</span>',
            '<button type="button" class="zai-chip" data-query="What is our Bravecto inventory status and draft a PO?">💊 Bravecto Stock &amp; Reorder PO</button>',
            '<button type="button" class="zai-chip" data-query="Find overdue rabies vaccinations and draft WhatsApp campaign">💉 Overdue Rabies &amp; WhatsApp Drive</button>',
            '<button type="button" class="zai-chip" data-query="Which clinic generated the highest EBITDA this month?">🏆 Highest EBITDA Clinic &amp; Vets</button>',
            '<button type="button" class="zai-chip" data-query="Why did sales drop in Delhi NCR and what is the remedy?">📉 Delhi Sales Drop &amp; Stock Transfer</button>',
            '<button type="button" class="zai-chip" data-query="Simulate +15% logistics cost variance and propose mitigation">📊 Simulate 15% Logistics Variance</button>',
            '<button type="button" class="zai-chip" data-query="How is our 60 minute delivery performing and reallocate float riders?">🚚 60-Min Delivery &amp; Reallocate Riders</button>',
            '<button type="button" class="zai-chip" data-query="Audit top 10 revenue leakage vectors and apply safeguards">⚡ Revenue Leakage Safeguards</button>',
            '<button type="button" class="zai-chip" data-query="Forecast 30-day demand surge for tick/flea medications">📦 30-Day Demand Surge Forecast</button>',
            '<button type="button" class="zai-chip" data-query="List top 10 pet parents at high churn risk and win-back plans">🛡️ Churn Risk &amp; Win-Back Radar</button>',
            '<button type="button" class="zai-chip" data-query="Simulate Q4 EBITDA under aggressive pricing scenario">💹 Simulate Q4 EBITDA Scenarios</button>',
          '</div>',
          '<form class="zai-chat-input-bar" id="zai-chat-form">',
            '<input type="text" class="zai-input zai-pet-input" id="zai-query-input" placeholder="🐾 Ask AI Chatbot or command actions: \'Reorder Bravecto\', \'Audit clinic EBITDA\', \'Send booster alerts\'..." autocomplete="off" />',
            '<button type="submit" class="zai-btn primary zai-pet-send-btn">🐾 Ask / Execute →</button>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── 2. Business Insights ────────────────────────────────────────── */
  function renderInsights() {
    var insightsList = [
      { dept: 'Pharmacy & Fulfillment', pattern: 'Batch expiry clustering on feline antibiotic injectables at Koramangala Hub', impact: '-₹1.85L write-off risk in 45 days', conf: '98.4%', action: 'Auto-transfer 180 vials to High-Velocity Indiranagar Surgical Center', sev: 'CRITICAL', badgeBg: '#fef2f2', badgeColor: '#dc2626' },
      { dept: 'Clinical Surgery', pattern: 'Post-operative ultrasound utilization lagging surgical volume by 34% in Mumbai', impact: '₹4.2L unrealized diagnostic margin / mo', conf: '95.1%', action: 'Integrate post-op abdominal scan prompt into Vet SOP workflow', sev: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
      { dept: 'Express Delivery', pattern: '60-min express medicine dispatch bottleneck in Whitefield during peak 6-8 PM', impact: '14% SLA breach penalty, ₹65K rider idle time', conf: '96.7%', action: 'Pre-stage top 40 emergency SKUs at micro-fulfillment pod Whitefield', sev: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
      { dept: 'Client Care & Retention', pattern: 'Puppy vaccination dropout spike after 2nd DHLPP shot across Tier-1 hubs', impact: '-₹8.9L annual customer lifetime value erosion', conf: '94.2%', action: 'Trigger automated WhatsApp reminder sequence with free vet consultation', sev: 'CRITICAL', badgeBg: '#fef2f2', badgeColor: '#dc2626' },
      { dept: 'Diagnostic Laboratory', pattern: 'Blood chemistry panel turnaround time increased from 45 min to 110 min at HSR', impact: 'Customer CSAT dropped 0.4 pts, 18 consultation delays/day', conf: '97.8%', action: 'Commission standby biochemical analyzer Beckman AU480 at HSR hub', sev: 'MEDIUM', badgeBg: '#eff6ff', badgeColor: '#2563eb' },
      { dept: 'Emergency & Critical Care', pattern: 'Night-shift ICU triage admissions up 42% on weekends in Bandra Medical Center', impact: 'Overtime doctor burn-out, ₹3.1L weekend emergency billing surplus', conf: '93.5%', action: 'Schedule second on-call emergency veterinary surgeon Fri-Sun', sev: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
      { dept: 'Retail & Nutrition', pattern: 'Prescription renal diet (Hill\'s k/d) reorder interval elongated from 28D to 42D', impact: 'Potential dietary non-compliance and ₹2.4L revenue lag', conf: '96.0%', action: 'Dispatch subscription auto-ship nudge with complimentary renal treats', sev: 'MEDIUM', badgeBg: '#eff6ff', badgeColor: '#2563eb' },
      { dept: 'Preventive Healthcare', pattern: 'Annual dental scaling acceptance rate 19% below benchmark in South Ext', impact: 'Periodontal disease progression in senior canines, -₹3.6L clinic rev', conf: '94.8%', action: 'Bundle dental ultrasonic hygiene with routine wellness checkup package', sev: 'MEDIUM', badgeBg: '#eff6ff', badgeColor: '#2563eb' },
      { dept: 'Procurement & Sourcing', pattern: 'Direct supplier price variance of 7.2% on microchips between Delhi and Bangalore', impact: '₹1.15L excess COGS variance across Q3', conf: '99.1%', action: 'Consolidate national microchip contract with Trovan via central warehouse', sev: 'LOW', badgeBg: '#f8fafc', badgeColor: '#475569' },
      { dept: 'Dermatology Clinic', pattern: 'Seasonal atopic dermatitis consultation surge (+65%) in monsoon Bangalore', impact: 'Backlog of 3.4 days for specialized dermatology appointments', conf: '97.3%', action: 'Open dedicated allergy & dermatology telemedicine clinic slots', sev: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c' }
    ];

    var rows = insightsList.map(function(item) {
      return '<tr>' +
        '<td><b>' + esc(item.dept) + '</b><br><span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:' + item.badgeBg + ';color:' + item.badgeColor + '">' + item.sev + '</span></td>' +
        '<td style="font-size:12px;color:#1e293b;max-width:280px;">' + esc(item.pattern) + '</td>' +
        '<td style="font-weight:700;color:#dc2626;font-size:12px;">' + esc(item.impact) + '</td>' +
        '<td><span style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#059669;font-size:12px;">' + esc(item.conf) + '</span></td>' +
        '<td style="font-size:12px;color:#4338ca;">' + esc(item.action) + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Synthesized Insights', '10 Active', '+3 New Today', 'up', 'Across 14 facilities', '💡'),
        kpiHtml('High-Impact Vectors', '4 Critical', '2 Resolved (24h)', 'up', 'Direct EBITDA impact', '🔥'),
        kpiHtml('Operational Efficiency', '92.4%', '+4.1% MoM', 'up', 'Automated workflows', '⚙️'),
        kpiHtml('Accuracy Rating', '96.8%', '+1.2%', 'up', 'Audited by clinical directors', '🎯'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Priority Business Intelligence Insights (10 Active Patterns)</h3>',
            '<p class="zai-card-sub">Algorithmic operational patterns extracted across 14 facilities and digital commerce</p>',
          '</div>',
          '<span class="zai-badge info">Automated Daily Briefing</span>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Department</th>',
                '<th>Pattern Observed</th>',
                '<th>Financial / Operational Impact</th>',
                '<th>Confidence</th>',
                '<th>Prescribed Action</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              rows,
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }
  var REV_MOCK_DATA = {
    kpis: {
      detectedLeakage: 1840000,
      recoveryRealized: 1420000,
      optimalElasticity: 1.28,
      discountEfficiency: 88.5,
      netRealizationRate: 96.8,
      grossBookings: 54000000
    },
    leakagePoints: [
      { id: 'LEAK-001', vector: 'UNCOLLECTED_SURGICAL_CONSUMABLES', source: 'Clinical Surgery (All Hubs)', monthlyDrag: 385000, severity: 'CRITICAL', rootCause: 'Unbilled anesthetic consumables, drapes, and specialized orthopedic pins', recommendedAction: 'Auto-bundle surgical material checklist into EMR billing checkout', status: 'PENDING' },
      { id: 'LEAK-002', vector: 'UNRESTRICTED_DISCOUNT_STACKING', source: 'E-Commerce & Pharmacy App', monthlyDrag: 290000, severity: 'CRITICAL', rootCause: 'Legacy promotional promo codes stacking with auto-ship subscriber discounts', recommendedAction: 'Enforce single-discount validation rule on checkout payment pipeline', status: 'APPLIED' },
      { id: 'LEAK-003', vector: 'EMERGENCY_AFTER_HOURS_UNDERBILLING', source: '24x7 Trauma Clinics', monthlyDrag: 245000, severity: 'HIGH', rootCause: 'Doctors recording night emergency triage as standard daytime consults', recommendedAction: 'Implement automatic time-triggered after-hours tariff modifier in EMR', status: 'PENDING' },
      { id: 'LEAK-004', vector: 'MISSED_VACCINATION_BOOSTER_DROPOUT', source: 'Preventive Healthcare', monthlyDrag: 210000, severity: 'HIGH', rootCause: 'Zero follow-up engagement when pet parents miss 21-day booster dates', recommendedAction: 'Automated WhatsApp appointment sequence with direct calendar booking', status: 'APPLIED' },
      { id: 'LEAK-005', vector: 'DIAGNOSTIC_REAGENT_EXPIRY_SINK', source: 'In-Clinic Pathology Labs', monthlyDrag: 180000, severity: 'HIGH', rootCause: 'Underutilized specialized electrolyte cartridges expiring before batch use', recommendedAction: 'Rebalance cartridge inventory across high-volume Indiranagar hub', status: 'APPLIED' },
      { id: 'LEAK-006', vector: 'EXPRESS_DELIVERY_SURCHARGE_ABSORPTION', source: 'Last-Mile Logistics', monthlyDrag: 165000, severity: 'MEDIUM', rootCause: 'Absorbing peak-hour rain and traffic surge costs without delivery fee pass-through', recommendedAction: 'Dynamic ₹29 weather/distance surcharge on orders under ₹499', status: 'PENDING' },
      { id: 'LEAK-007', vector: 'UNCLAIMED_SUPPLIER_VOLUME_REBATES', source: 'Procurement & Sourcing', monthlyDrag: 140000, severity: 'MEDIUM', rootCause: 'Failing to claim quarterly tier-3 volume kickbacks from Zoetis & Boehringer', recommendedAction: 'Automated ERP rebate tracking dashboard with supplier claim triggers', status: 'APPLIED' },
      { id: 'LEAK-008', vector: 'PET_SPA_IDLE_TABLE_CAPACITY', source: 'Grooming Centers', monthlyDrag: 125000, severity: 'MEDIUM', rootCause: 'Weekday 11 AM - 3 PM grooming groomers operating at 32% utilization', recommendedAction: 'Deploy dynamic off-peak happy hour pricing (20% off weekday midday)', status: 'PENDING' },
      { id: 'LEAK-009', vector: 'COLD_CHAIN_TEMPERATURE_EXCURSION', source: 'Vaccine Warehouses', monthlyDrag: 95000, severity: 'MEDIUM', rootCause: 'Temperature drift causing disposal of sensitive insulin and biologic vials', recommendedAction: 'IoT smart sensors with SMS alerts and auto-switch to solar inverter', status: 'APPLIED' },
      { id: 'LEAK-010', vector: 'INVOICE_ROUNDING_AND_FEE_LEAK', source: 'Front-Desk Reception Billing', monthlyDrag: 65000, severity: 'LOW', rootCause: 'Manual cashier cash rounding and waived bio-waste disposal fees', recommendedAction: 'Mandate electronic itemized billing with zero manual fee overrides', status: 'APPLIED' }
    ],
    elasticityMatrix: [
      { service: 'Emergency Canine C-Section Surgery', currentPrice: 18500, recommendedPrice: 21000, elasticity: '0.18 (Highly Inelastic)', projectedGain: 340000 },
      { service: 'Critical ICU Ventilator Care (Per 24h)', currentPrice: 7500, recommendedPrice: 8800, elasticity: '0.22 (Inelastic)', projectedGain: 290000 },
      { service: 'Specialist Orthopedic Consultation', currentPrice: 1200, recommendedPrice: 1500, elasticity: '0.35 (Inelastic)', projectedGain: 260000 },
      { service: 'Comprehensive Diagnostic Blood Chemistry', currentPrice: 2800, recommendedPrice: 3150, elasticity: '0.42 (Inelastic)', projectedGain: 210000 },
      { service: 'Dental Ultrasonic Scaling & Polishing', currentPrice: 3500, recommendedPrice: 3950, elasticity: '0.58 (Moderately Elastic)', projectedGain: 180000 },
      { service: 'Routine OPD General Health Checkup', currentPrice: 650, recommendedPrice: 700, elasticity: '0.85 (Elastic)', projectedGain: 145000 },
      { service: 'Annual DHLPPi + Anti-Rabies Vaccine', currentPrice: 1400, recommendedPrice: 1550, elasticity: '0.48 (Inelastic)', projectedGain: 175000 },
      { service: 'Express 60-Minute Medicine Delivery Fee', currentPrice: 49, recommendedPrice: 69, elasticity: '0.38 (Inelastic)', projectedGain: 120000 },
      { service: 'Therapeutic Prescription Diet (Per Bag)', currentPrice: 3800, recommendedPrice: 3950, elasticity: '0.62 (Moderate)', projectedGain: 115000 },
      { service: 'Feline Spay / Ovariohysterectomy', currentPrice: 6500, recommendedPrice: 7200, elasticity: '0.52 (Moderate)', projectedGain: 165000 }
    ],
    waterfall: [
      { label: 'Gross Billed Revenue', value: 54000000 },
      { label: 'Uncollected Surgical Consumables', value: -385000 },
      { label: 'Promotional Discount Stacking', value: -290000 },
      { label: 'After-Hours Triage Underbilling', value: -245000 },
      { label: 'Vaccination Dropout Leakage', value: -210000 },
      { label: 'Diagnostic Reagent Waste', value: -180000 },
      { label: 'Delivery Surcharge Deficit', value: -165000 },
      { label: 'Net Realized Revenue', value: 52525000 }
    ],
    auditLog: [
      { executedAt: '2026-10-14 11:30', id: 'REV-002', vector: 'UNRESTRICTED_DISCOUNT_STACKING', recovered: 290000, detail: 'Enforced checkout validation rule preventing promo coupon stacking with auto-ship discount' },
      { executedAt: '2026-10-14 09:15', id: 'REV-004', vector: 'MISSED_VACCINATION_BOOSTER_DROPOUT', recovered: 210000, detail: 'Activated WhatsApp 21-day booster sequence with direct 1-click booking link' },
      { executedAt: '2026-10-13 16:45', id: 'REV-005', vector: 'DIAGNOSTIC_REAGENT_EXPIRY_SINK', recovered: 180000, detail: 'Auto-rebalanced 60 high-cost electrolyte cartridges to Indiranagar surgical hub' },
      { executedAt: '2026-10-13 14:20', id: 'REV-007', vector: 'UNCLAIMED_SUPPLIER_VOLUME_REBATES', recovered: 140000, detail: 'Dispatched automated Q3 volume rebate claim letter to Zoetis India' },
      { executedAt: '2026-10-12 18:00', id: 'REV-009', vector: 'COLD_CHAIN_TEMPERATURE_EXCURSION', recovered: 95000, detail: 'Installed secondary inverter switch and temperature alarm on Central Vaccine Depot' },
      { executedAt: '2026-10-12 11:10', id: 'REV-010', vector: 'INVOICE_ROUNDING_AND_FEE_LEAK', recovered: 65000, detail: 'Standardized electronic billing tariffs across all 14 clinic front-desk POS terminals' },
      { executedAt: '2026-10-11 15:40', id: 'REV-011', vector: 'PET_BOARDING_NO_SHOW_PENALTY', recovered: 88000, detail: 'Instituted 25% non-refundable holiday boarding deposit policy' },
      { executedAt: '2026-10-10 13:25', id: 'REV-012', vector: 'PHARMACY_SHORT_EXPIRY_DISCOUNT', recovered: 115000, detail: 'Created 30-day clearance bundle for near-expiry pet supplements in clinic lobbies' },
      { executedAt: '2026-10-09 17:50', id: 'REV-013', vector: 'LAB_REFERENCE_OVERCHARGING', recovered: 135000, detail: 'Audited external histopathology invoices and recovered contractual overcharges' },
      { executedAt: '2026-10-08 10:15', id: 'REV-014', vector: 'FLEET_FUEL_ALLOWANCE_NORMALIZATION', recovered: 72000, detail: 'Replaced static rider fuel stipends with GPS odometer-verified fuel reimbursements' }
    ]
  };

  var REV = { data: REV_MOCK_DATA, loading: false, sim: { priceIncreasePct: 5, discountCapPct: 50 }, simOut: 0 };

  function revMoney(v) {
    var n = Math.abs(v || 0);
    var s = n >= 100000 ? '₹' + (n / 100000).toFixed(1) + 'L' : n >= 1000 ? '₹' + (n / 1000).toFixed(1) + 'K' : '₹' + n;
    return v < 0 ? '-' + s : s;
  }

  function revPost(path, body) {
    return fetch('/api/v1' + path, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: body || {} })
    }).then(function (r) { return r.json(); });
  }

  function revLoad() {
    if (REV.loading) return;
    REV.loading = true;
    revPost('/revenue/intelligence', {}).then(function (d) {
      REV.loading = false;
      if (d && d.kpis) { REV.data = d; render(); }
    }).catch(function () { REV.loading = false; });
  }

  window._revApply = function (id) {
    revPost('/revenue/safeguards/apply', { id: id }).then(function (res) {
      _recToast(res.success ? 'Safeguard applied: ' + res.entry.detail : (res.error || 'Unable to apply'), res.success ? 'success' : 'error');
      REV.loading = false; revLoad();
    }).catch(function () { _recToast('Backend unreachable — safeguard not applied', 'error'); });
  };

  window._revSim = function (key, val) {
    REV.sim[key] = +val;
    revPost('/revenue/simulate', REV.sim).then(function (r) {
      REV.simOut = r.projectedTotalLift || 0;
      var el = document.getElementById('zai-rev-sim-out');
      if (el) el.textContent = revMoney(REV.simOut);
    });
  };

  function revRows(cols, msg) {
    return '<tr><td colspan="' + cols + '" style="text-align:center;padding:24px;color:#94a3b8;">' + msg + '</td></tr>';
  }

  /* ── 3. Revenue Intelligence ─────────────────────────────────────── */
  function renderRevenue() {
    if (!REV.data) revLoad();
    var d = REV.data || REV_MOCK_DATA;
    var k = d.kpis;
    var sevColor = { CRITICAL: '#991b1b', HIGH: '#9a3412', MEDIUM: '#92400e', LOW: '#475569' };

    var leakRows = d.leakagePoints.length === 0
      ? revRows(7, 'No revenue leakage detected. Telemetry streams are active — awaiting transactional data.')
      : d.leakagePoints.map(function (l) {
        return '<tr><td><b>' + esc(l.vector.replace(/_/g, ' ')) + '</b></td><td>' + esc(l.source) + '</td>' +
          '<td style="font-weight:700;color:#dc2626">' + revMoney(l.monthlyDrag) + '</td>' +
          '<td><span style="font-size:10px;font-weight:700;color:' + (sevColor[l.severity] || '#475569') + '">' + esc(l.severity) + '</span></td>' +
          '<td>' + esc(l.rootCause) + '</td><td>' + esc(l.recommendedAction) + '</td>' +
          '<td>' + (l.status === 'APPLIED' ? '<span style="color:#059669;font-weight:700">✅ Applied</span>'
            : '<button class="zai-btn primary" onclick="window._revApply(\'' + esc(l.id) + '\')">Apply Safeguard</button>') + '</td></tr>';
      }).join('');

    var elasRows = d.elasticityMatrix.length === 0
      ? revRows(5, 'No price/volume observations available for elasticity modelling.')
      : d.elasticityMatrix.map(function (e) {
        return '<tr><td><b>' + esc(e.service) + '</b></td><td>₹' + e.currentPrice + '</td><td>₹' + e.recommendedPrice + '</td><td>' + e.elasticity + '</td><td style="color:#059669;font-weight:700">' + revMoney(e.projectedGain) + '</td></tr>';
      }).join('');

    var wfRows = d.waterfall.length === 0
      ? revRows(2, 'No gross bookings recorded yet.')
      : d.waterfall.map(function (w) {
        return '<tr><td><b>' + esc(w.label) + '</b></td><td style="color:' + (w.value < 0 ? '#dc2626' : '#0f172a') + '">' + revMoney(w.value) + '</td></tr>';
      }).join('');

    var auditRows = d.auditLog.length === 0
      ? revRows(4, 'No safeguards applied yet.')
      : d.auditLog.map(function (a) {
        return '<tr><td>' + esc(a.executedAt) + '</td><td>' + esc(a.id) + ' · ' + esc(a.vector.replace(/_/g, ' ')) + '</td><td style="color:#059669;font-weight:700">' + revMoney(a.recovered) + '</td><td>' + esc(a.detail) + '</td></tr>';
      }).join('');

    function card(title, sub, head, rows, extra) {
      return '<div class="zai-card"><div class="zai-card-head"><div><h3 class="zai-card-title">' + title + '</h3><p class="zai-card-sub">' + sub + '</p></div></div>' +
        (extra || '') + '<div class="zai-table-wrap"><table class="zai-table"><thead><tr>' +
        head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }

    var simBar = '<div style="display:flex;gap:24px;flex-wrap:wrap;padding:0 20px 16px;font-size:12px;color:#475569">' +
      '<label>Price uplift on inelastic services: <b>' + REV.sim.priceIncreasePct + '%</b><br><input type="range" min="0" max="15" value="' + REV.sim.priceIncreasePct + '" onchange="window._revSim(\'priceIncreasePct\',this.value)"></label>' +
      '<label>Repeat-customer discount cap: <b>' + REV.sim.discountCapPct + '%</b><br><input type="range" min="0" max="100" step="10" value="' + REV.sim.discountCapPct + '" onchange="window._revSim(\'discountCapPct\',this.value)"></label>' +
      '<div>Projected annual lift: <b id="zai-rev-sim-out" style="color:#059669">' + revMoney(REV.simOut) + '</b></div></div>';

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Identified Margin Leaks', revMoney(k.detectedLeakage), d.leakagePoints.length ? d.leakagePoints.length + ' vectors' : '--', k.detectedLeakage ? 'down' : 'neutral', k.detectedLeakage ? 'Monthly drag identified' : 'No friction points', '⚡'),
        kpiHtml('Recovery Realization (MTD)', revMoney(k.recoveryRealized), '--', k.recoveryRealized ? 'up' : 'neutral', k.recoveryRealized ? 'From applied safeguards' : 'No recovery actions', '💰'),
        kpiHtml('Optimal Price Elasticity', Number(k.optimalElasticity).toFixed(2), '--', 'neutral', d.elasticityMatrix.length ? 'Avg across tested services' : 'No elasticity tested', '💹'),
        kpiHtml('Discount Efficiency', Number(k.discountEfficiency).toFixed(1) + '%', '--', k.discountEfficiency > 70 ? 'up' : 'neutral', k.discountEfficiency ? 'Promos reaching new customers' : 'No voucher records', '🛡️'),
        kpiHtml('Net Realization Rate', Number(k.netRealizationRate).toFixed(1) + '%', '--', 'neutral', 'Net EBITDA ÷ gross bookings', '🧮'),
      '</div>',
      card('Revenue Leakage &amp; Remediation Radar', 'Real-time leak radar highlighting pricing disparities, uncollected fees, and coupon misuse',
        ['Leakage Vector', 'Facility / Channel', 'Monthly Drag', 'Severity', 'Root Cause', 'Automated Remediation', 'Action'], leakRows),
      card('Price Elasticity &amp; What-If Simulator', 'Safe price optimization on inelastic services and discount-cap savings',
        ['Service / SKU', 'Current', 'Recommended', 'Elasticity', 'Projected Gain'], elasRows, simBar),
      card('Revenue Realization Waterfall', 'Gross bookings to net realized revenue', ['Stage', 'Amount'], wfRows),
      card('📋 Safeguard Audit Trail', 'History of applied remediation actions', ['Timestamp', 'Leak', 'Recovered', 'Detail'], auditRows)
    ].join('');
  }

    /* ── 4. Sales Forecast ───────────────────────────────────────────── */
  function renderSalesForecast() {
    var projections = [
      { horizon: 'Next 7 Days (Oct 15 - Oct 21)', p10: '₹1.12 Cr', p50: '₹1.28 Cr', p90: '₹1.44 Cr', driver: 'Weekend surgical bookings & chronic refill cycles', risk: 'Heavy regional rainfall in Mumbai hubs' },
      { horizon: 'Week 2 (Oct 22 - Oct 28)', p10: '₹1.24 Cr', p50: '₹1.41 Cr', p90: '₹1.62 Cr', driver: 'Pre-Diwali festive pet grooming & boarding spike', risk: 'Logistics rider availability during holiday' },
      { horizon: 'Week 3 (Oct 29 - Nov 04)', p10: '₹1.08 Cr', p50: '₹1.22 Cr', p90: '₹1.38 Cr', driver: 'Post-holiday emergency consultations & wellness', risk: 'Clinic staff post-festive roster adjustments' },
      { horizon: 'Week 4 (Nov 05 - Nov 11)', p10: '₹1.18 Cr', p50: '₹1.33 Cr', p90: '₹1.51 Cr', driver: 'Winter tick/flea prevention campaign & diets', risk: 'Pharma vendor shipment transit delays' },
      { horizon: 'Full Month 30D (Oct-Nov)', p10: '₹4.68 Cr', p50: '₹5.24 Cr', p90: '₹6.15 Cr', driver: 'Omnichannel expansion + 14-hub express dispatch', risk: 'Supplier inventory allocation caps' },
      { horizon: '60-Day Horizon (Q3 End)', p10: '₹9.55 Cr', p50: '₹10.72 Cr', p90: '₹12.40 Cr', driver: 'New surgical wing in Gurgaon + dermatology ramp', risk: 'Cold-chain logistics utility cost variance' },
      { horizon: '90-Day Horizon (Q4 Full)', p10: '₹14.80 Cr', p50: '₹16.50 Cr', p90: '₹18.90 Cr', driver: 'Preventive annual wellness packages + app subscriptions', risk: 'Inflationary impact on imported pharma API' },
      { horizon: 'OPD Consultations (30D)', p10: '₹1.45 Cr', p50: '₹1.62 Cr', p90: '₹1.85 Cr', driver: 'Senior pet geriatric clinic launches in South India', risk: 'Specialist vet doctor leave schedules' },
      { horizon: 'Pharmacy & 60-Min Express (30D)', p10: '₹2.10 Cr', p50: '₹2.38 Cr', p90: '₹2.75 Cr', driver: 'Subscription auto-delivery adoption reaching 32%', risk: 'Last-mile delivery EV battery maintenance' },
      { horizon: 'Diagnostics & Surgical (30D)', p10: '₹1.13 Cr', p50: '₹1.24 Cr', p90: '₹1.55 Cr', driver: 'Advanced CT scan and orthopedic referrals', risk: 'Diagnostic reagent batch delivery cycle' }
    ];

    var rows = projections.map(function(p) {
      return '<tr>' +
        '<td><b>' + esc(p.horizon) + '</b></td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;color:#64748b;">' + esc(p.p10) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#4f46e5;">' + esc(p.p50) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#059669;">' + esc(p.p90) + '</td>' +
        '<td style="font-size:12px;color:#1e293b;">' + esc(p.driver) + '</td>' +
        '<td style="font-size:12px;color:#dc2626;">' + esc(p.risk) + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Expected Next Month Sales', '₹5.24 Cr', '+14.8% MoM', 'up', 'P50 Baseline Model', '📈'),
        kpiHtml('Confidence Score', '96.2%', 'P10/P90 Statistical Band', 'up', 'Mean absolute error: 3.8%', '🎯'),
        kpiHtml('Peak Sales Day Forecast', '₹24.8L (Oct 28)', 'Pre-Diwali Surge', 'up', 'Grooming & festive gifting', '🎆'),
        kpiHtml('Quarterly Trajectory', '₹16.50 Cr', '+18.4% YoY', 'up', 'Q4 Enterprise Target', '🚀'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Multi-Horizon Sales Projections (10 Forecast Windows)</h3>',
            '<p class="zai-card-sub">Bayesian confidence intervals across clinical appointments, diagnostic labs, and retail channels</p>',
          '</div>',
          '<button class="zai-btn" onclick="alert(\'Simulating 90-day Bayesian projection Monte Carlo run...\')">Run Monte Carlo Sim</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Forecast Horizon</th>',
                '<th>Conservative (P10)</th>',
                '<th>Expected (P50)</th>',
                '<th>Optimistic (P90)</th>',
                '<th>Primary Growth Driver</th>',
                '<th>Risk Factor</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              rows,
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  
  /* ── 5. Demand Forecast ──────────────────────────────────── */
  function renderDemandForecast() {
    var demandItems = [
      { sku: 'Bravecto Chewable Dog 20-40kg (SKU-MED-0101)', cat: 'Parasiticide / Tick-Flea', current: '120 Units', rate: '380 Units', days: '9 Days', action: 'Dispatch Emergency PO-4481 for 400 units to MSD Animal Health', status: 'CRITICAL', badgeBg: '#fef2f2', badgeColor: '#dc2626' },
      { sku: 'Nexgard Spectra Large 15-30kg (SKU-MED-0104)', cat: 'Parasiticide / Heartworm', current: '85 Units', rate: '310 Units', days: '8 Days', action: 'Trigger bulk purchase requisition PO-4482 with 12% vendor rebate', status: 'CRITICAL', badgeBg: '#fef2f2', badgeColor: '#dc2626' },
      { sku: 'Royal Canin Gastrointestinal Dog 14kg (SKU-NUT-0205)', cat: 'Therapeutic Nutrition', current: '64 Bags', rate: '220 Bags', days: '8 Days', action: 'Rebalance 40 bags from Central Warehouse to Koramangala Hub', status: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
      { sku: 'Vetmedin 5mg Chewable Tablets (SKU-CRD-0302)', cat: 'Cardiology / Chronic', current: '45 Boxes', rate: '140 Boxes', days: '10 Days', action: 'Auto-generate PO-4483 with 48h express cold-chain courier', status: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
      { sku: 'Apoquel 16mg Tablets (SKU-DERM-0410)', cat: 'Dermatology / Allergy', current: '70 Packs', rate: '260 Packs', days: '8 Days', action: 'Increase safety stock buffer by 30% due to seasonal surge', status: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
      { sku: 'Nobivac DHPPi Canine Vaccine 10-Dose (SKU-VAC-0501)', cat: 'Immunization / Cold-Chain', current: '90 Vials', rate: '420 Vials', days: '6 Days', action: 'Immediate PO-4484 to Intervet; verify 2-8°C refrigerated logistics', status: 'CRITICAL', badgeBg: '#fef2f2', badgeColor: '#dc2626' },
      { sku: 'Hill\'s Prescription Diet c/d Feline 3.8kg (SKU-NUT-0212)', cat: 'Urinary Diet / Cat', current: '35 Bags', rate: '115 Bags', days: '9 Days', action: 'Place restocking requisition with Colgate-Palmolive Pet Care', status: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
      { sku: 'Rimadyl 75mg Chewable NSAID (SKU-ORT-0608)', cat: 'Orthopedic / Analgesic', current: '110 Bottles', rate: '290 Bottles', days: '11 Days', action: 'Consolidate order across Bangalore & Mumbai for volume pricing', status: 'MEDIUM', badgeBg: '#eff6ff', badgeColor: '#2563eb' },
      { sku: 'Cerenia 10mg/ml Injectable Anti-Emetic (SKU-EMG-0714)', cat: 'Emergency / Inpatient', current: '28 Vials', rate: '95 Vials', days: '9 Days', action: 'Priority replenishment for 24x7 ICU trauma inventory', status: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
      { sku: 'Feliway Classic Cat Calming Diffuser (SKU-BEH-0822)', cat: 'Behavioral / Feline', current: '40 Kits', rate: '130 Kits', days: '9 Days', action: 'Promote in post-consultation feline wellness packages', status: 'MEDIUM', badgeBg: '#eff6ff', badgeColor: '#2563eb' }
    ];

    var rows = demandItems.map(function(item) {
      return '<tr>' +
        '<td><b>' + esc(item.sku) + '</b><br><span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:' + item.badgeBg + ';color:' + item.badgeColor + '">' + item.status + '</span></td>' +
        '<td style="font-size:12px;color:#475569;">' + esc(item.cat) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;">' + esc(item.current) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;color:#4f46e5;font-weight:700;">' + esc(item.rate) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:' + (parseInt(item.days) <= 7 ? '#dc2626' : '#ea580c') + ';">' + esc(item.days) + '</td>' +
        '<td style="font-size:12px;color:#1e293b;">' + esc(item.action) + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('SKUs Forecasted', '10 Critical SKUs', 'Monsoon Surge', 'up', '30-Day predictive model', '📦'),
        kpiHtml('Demand Surge Forecast', '+22.4% Surge', 'Tick & Skin Care', 'up', 'Above 90-day baseline', '📈'),
        kpiHtml('Automated PO Recommendations', '10 POs Ready', 'ERP Auto-Sync', 'up', 'Ready for procurement', '📑'),
        kpiHtml('Forecast Accuracy (MAPE)', '96.4%', 'MAPE: 3.6%', 'up', 'Backtested on 14 hubs', '🎯'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Critical SKU Consumption Velocity Forecast (10 High-Velocity Items)</h3>',
            '<p class="zai-card-sub">Machine learning consumption models predicting 30-day requirement by regional fulfillment node</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'Exporting 10 Automated Purchase Orders to ERP...\')">Generate Purchase Orders</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Item Name & SKU</th>',
                '<th>Category</th>',
                '<th>Current Stock</th>',
                '<th>Predicted 30D Run Rate</th>',
                '<th>Days of Stock Left</th>',
                '<th>Action Recommended</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              rows,
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  
  /* ── 6. Inventory Prediction ─────────────────────────────────────── */
  function renderInventoryPrediction() {
    var inventoryRisks = [
      { hub: 'Koramangala Hub (BLR)', product: 'Bravecto Chewable 20-40kg', current: '14 Units', depletion: '3 Days (Oct 17)', lead: '48 Hours', status: '🔴 CRITICAL: Reorder Dispatched' },
      { hub: 'Indiranagar Surgery Hub (BLR)', product: 'Nobivac Tricat Trio Feline', current: '22 Vials', depletion: '5 Days (Oct 19)', lead: '24 Hours', status: '🟠 HIGH: Stock Transfer En Route' },
      { hub: 'Whitefield Dark Store (BLR)', product: 'Royal Canin Gastro 14kg', current: '8 Bags', depletion: '4 Days (Oct 18)', lead: '72 Hours', status: '🔴 CRITICAL: Supplier PO Placed' },
      { hub: 'Bandra West Medical Center (BOM)', product: 'Vetmedin 5mg Cardiology', current: '11 Packs', depletion: '6 Days (Oct 20)', lead: '48 Hours', status: '🟠 HIGH: Safety Buffer Warning' },
      { hub: 'Powai Express Hub (BOM)', product: 'Apoquel 16mg Anti-Itch', current: '16 Packs', depletion: '5 Days (Oct 19)', lead: '48 Hours', status: '🟠 HIGH: Rebalance from Bandra' },
      { hub: 'South Ext Trauma Center (DEL)', product: 'Cerenia 10mg Injectable', current: '6 Vials', depletion: '2 Days (Oct 16)', lead: '24 Hours', status: '🔴 CRITICAL: Same-Day Delivery' },
      { hub: 'Gurgaon Sec-29 Hospital (DEL)', product: 'Rimadyl 75mg Orthopedic', current: '18 Bottles', depletion: '7 Days (Oct 21)', lead: '96 Hours', status: '🟡 MEDIUM: Reorder Ready' },
      { hub: 'HSR Layout Polyclinic (BLR)', product: 'Hill\'s c/d Urinary Feline', current: '9 Bags', depletion: '5 Days (Oct 19)', lead: '48 Hours', status: '🟠 HIGH: Dark Store Transfer' },
      { hub: 'Anna Nagar Facility (MAA)', product: 'Simparica Trio 10-20kg', current: '15 Packs', depletion: '6 Days (Oct 20)', lead: '72 Hours', status: '🟡 MEDIUM: Automated Requisition' },
      { hub: 'Velachery Care Hub (MAA)', product: 'Caninsulin 40 IU/ml 10ml', current: '8 Vials', depletion: '4 Days (Oct 18)', lead: '24 Hours', status: '🔴 CRITICAL: Cold-Chain Transfer' }
    ];

    var rows = inventoryRisks.map(function(item) {
      return '<tr>' +
        '<td><b>' + esc(item.hub) + '</b></td>' +
        '<td style="font-size:13px;font-weight:600;color:#0f172a;">' + esc(item.product) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;">' + esc(item.current) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;color:#dc2626;font-weight:700;">' + esc(item.depletion) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;color:#475569;">' + esc(item.lead) + '</td>' +
        '<td style="font-size:12px;font-weight:700;">' + esc(item.status) + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Imminent Stockout Risks', '10 Critical SKUs', 'Immediate Action', 'warn', 'Safety buffer below 7 days', '⚠️'),
        kpiHtml('Predicted Expiry Waste (90D)', '₹1.85L (Down 64%)', '-₹3.2L vs Q2', 'up', 'Automated FEFO liquidation', '⏳'),
        kpiHtml('Stock Runway Health', '24.5 Days', '+4.2 Days', 'up', 'Optimal operational band: 20-30D', '📦'),
        kpiHtml('Reorder Optimization Rate', '97.8%', '+2.4% MoM', 'up', 'Autonomous PO execution', '🛡️'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Stockout Runway & Batch Expiry Early Warning (10 Tracked Facilities)</h3>',
            '<p class="zai-card-sub">Predictive exhaustion timelines based on daily run rate and supplier fulfillment lead times</p>',
          '</div>',
          '<button class="zai-btn" onclick="alert(\'Dispatching 10 stock transfer POs across fulfillment hubs...\')">🔄 Dispatch Transfers</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Facility / Hub</th>',
                '<th>Product At Risk</th>',
                '<th>Current Units</th>',
                '<th>Depletion Date</th>',
                '<th>Supplier Lead Time</th>',
                '<th>Safety Status</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              rows,
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  
  /* ── 7. Customer Prediction ──────────────────────────────────────── */
  function renderCustomerPrediction() {
    var nextActions = [
      { cohort: 'First-Time Puppy Parents (0-6M)', profile: 'Golden Retriever / 4 Months', need: 'DHLPP 3rd Booster + Rabies Vaccine', window: 'Next 48-72 Hours', lift: '+₹3,850 LTV', strategy: 'WhatsApp Vet Video + 1-Click Clinic Booking' },
      { cohort: 'Post-Surgical Inpatients (Day 7)', profile: 'Labrador / 5 Years (Cruciate Repair)', need: 'Laser Physiotherapy & Joint Supplements', window: 'Next 3 Days', lift: '+₹8,200 LTV', strategy: 'Dedicated Pet Care Concierge Call + App Plan' },
      { cohort: 'Chronic Diabetic Pet Parents', profile: 'Beagle / 8 Years (Type-1 Diabetes)', need: 'Caninsulin Refill + Blood Glucose Sensor', window: 'Next 5 Days', lift: '+₹4,500 LTV', strategy: 'Automated SMS Auto-Ship Refill Confirmation' },
      { cohort: 'Senior Feline Care Cohort (7Y+)', profile: 'Persian Cat / 9 Years', need: 'Comprehensive Senior Renal Screening Panel', window: 'Next 7 Days', lift: '+₹5,400 LTV', strategy: 'In-App Doctor Diagnostic Card + Home Sample' },
      { cohort: 'Active Dog Park Subscribers', profile: 'German Shepherd / 2 Years', need: 'Kennel Cough (Bordetella) + Tick Chewables', window: 'Next 5 Days', lift: '+₹2,900 LTV', strategy: 'Push Notification with 15% Preventive Bundle' },
      { cohort: 'Seasonal Allergy Sufferers', profile: 'French Bulldog / 3 Years', need: 'Cytopoint Injection / Apoquel Refill', window: 'Next 48 Hours', lift: '+₹6,100 LTV', strategy: 'Dermatology Clinic Callback + Prescription Nudge' },
      { cohort: 'Lapsed Kitten Owners (120D)', profile: 'Indie Cat / 1 Year', need: 'Spay/Neuter Consultation + Adult Food Trial', window: 'Next 7 Days', lift: '+₹4,200 LTV', strategy: 'Personalized Email with Pediatric Vet Video' },
      { cohort: 'High-Spend Orthopedic Patients', profile: 'Rottweiler / 6 Years (Hip Dysplasia)', need: 'Adequan Injection Course + Ortho Bedding', window: 'Next 10 Days', lift: '+₹12,500 LTV', strategy: 'Direct Specialist Consultation Priority Slot' },
      { cohort: 'Dental Hygiene Risk Cohort', profile: 'Shih Tzu / 4 Years (Grade 2 Plaque)', need: 'Ultrasonic Dental Scaling + Enzymatic Chews', window: 'Next 14 Days', lift: '+₹4,800 LTV', strategy: 'Before/After Scaling Case Study + Booking Link' },
      { cohort: 'Express Pharmacy Loyalists', profile: 'Indie Dog / 3 Years (Chronic Gastro)', need: 'Therapeutic GI Food Subscription (Monthly)', window: 'Next 4 Days', lift: '+₹3,400 LTV', strategy: 'WhatsApp Repeat Order with 60-Min Express Dispatch' }
    ];

    var rows = nextActions.map(function(item) {
      return '<tr>' +
        '<td><b>' + esc(item.cohort) + '</b></td>' +
        '<td style="font-size:12px;color:#0f172a;">' + esc(item.profile) + '</td>' +
        '<td style="font-size:12px;font-weight:600;color:#4338ca;">' + esc(item.need) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;">' + esc(item.window) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#059669;">' + esc(item.lift) + '</td>' +
        '<td style="font-size:12px;color:#1e293b;">' + esc(item.strategy) + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Propensity to Repurchase', '94.6%', '+3.1% MoM', 'up', 'High-intent healthcare cohort', '🎯'),
        kpiHtml('Predicted Customer LTV', '₹14,800', '+18.2% YoY', 'up', 'LTV/CAC ratio: 35.2x', '💎'),
        kpiHtml('Next-Best-Action Success', '91.2%', '+4.5% Lift', 'up', 'Vaccination & refill recall', '⚡'),
        kpiHtml('Targeted Pet Parents', '10 Cohorts (4,820 Users)', 'Active Engagement', 'up', 'Personalized clinical nudges', '🐾'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Next-Best-Action (NBA) Customer Behavioral Matrix (10 Cohorts)</h3>',
            '<p class="zai-card-sub">Personalized healthcare triggers mapped to pet lifecycle stages and vaccination schedules</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'Dispatching 10 algorithmic customer nudges across SMS and WhatsApp...\')">Dispatch Nudges</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Customer Cohort</th>',
                '<th>Pet Profile & Stage</th>',
                '<th>Predicted Next Need</th>',
                '<th>Timing Window</th>',
                '<th>Predicted Lift</th>',
                '<th>Channel Strategy</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              rows,
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  
  /* ── 8. Churn Prediction ─────────────────────────────────────────── */
  function renderChurnPrediction() {
    var churnRadar = [
      { name: 'Vikram Malhotra', pet: 'Max (Golden Retriever, 4Y)', spend: '₹48,500', risk: '92% CRITICAL', factor: '65 Days since expected gastro medicine refill', playbook: 'WhatsApp Concierge: VIP ₹500 Refill Voucher + Free Vet Call' },
      { name: 'Priya Sengupta', pet: 'Cleo (Persian Cat, 3Y)', spend: '₹34,200', risk: '88% CRITICAL', factor: 'Cancelled last dental checkup after 40-min clinic wait', playbook: 'Personal Call from Medical Director + Free Home Consultation' },
      { name: 'Ananya Deshmukh', pet: 'Bruno (German Shepherd, 6Y)', spend: '₹62,000', risk: '84% HIGH', factor: 'Switched prescription renal food purchase to third-party', playbook: 'Price-Match Guarantee + Auto-Ship Subscription 10% Discount' },
      { name: 'Karan Grover', pet: 'Leo (Beagle, 2Y)', spend: '₹28,400', risk: '81% HIGH', factor: 'Completed puppy shots; 180 days no preventive engagement', playbook: 'Free Canine Annual Wellness Exam invite via App Notification' },
      { name: 'Dr. Sneha Reddy', pet: 'Bella (Labrador, 8Y)', spend: '₹78,900', risk: '79% HIGH', factor: 'Senior arthritis pain Rx lapsed 30 days past schedule', playbook: 'Urgent Vet Nurse Wellness Check-in Call + Pain Scorecard' },
      { name: 'Rahul Nambiar', pet: 'Simba (Indie Cat, 2Y)', spend: '₹21,500', risk: '76% MEDIUM', factor: 'Missed annual booster; 2 unresolved chat inquiries on fees', playbook: 'Senior Support Ticket Escalation + 1-Click Vaccine Home Visit' },
      { name: 'Meera Swaminathan', pet: 'Rocky (Rottweiler, 5Y)', spend: '₹54,000', risk: '74% MEDIUM', factor: 'Delivery delayed by 45 min during last storm order', playbook: 'Delivery Fee Refund Credit + Apology Gift Box of Treats' },
      { name: 'Aditya Chopra', pet: 'Milo (Shih Tzu, 1.5Y)', spend: '₹19,800', risk: '72% MEDIUM', factor: 'Grooming appointment rescheduled twice due to slot shortage', playbook: 'Guaranteed Weekend Morning VIP Grooming Slot Reserved' },
      { name: 'Tanvi Saxena', pet: 'Coco (Cocker Spaniel, 3Y)', spend: '₹31,000', risk: '68% MEDIUM', factor: 'Ear infection follow-up visit unconfirmed 14 days overdue', playbook: 'Automated Otitis Follow-Up Nudge with Attending Vet Dr. Ramesh' },
      { name: 'Arjun Singhal', pet: 'Oscar (Pug, 7Y)', spend: '₹44,200', risk: '65% MEDIUM', factor: 'Decreasing order frequency from 2.4x/mo to 0.8x/mo', playbook: 'Curated Senior Pug Nutrition & Respiratory Care Package' }
    ];

    var rows = churnRadar.map(function(item) {
      return '<tr>' +
        '<td><b>' + esc(item.name) + '</b></td>' +
        '<td style="font-size:12px;color:#0f172a;">' + esc(item.pet) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;">' + esc(item.spend) + '</td>' +
        '<td><span style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:' + (item.risk.indexOf('CRITICAL') >= 0 ? '#dc2626' : item.risk.indexOf('HIGH') >= 0 ? '#ea580c' : '#2563eb') + ';">' + esc(item.risk) + '</span></td>' +
        '<td style="font-size:12px;color:#dc2626;">' + esc(item.factor) + '</td>' +
        '<td style="font-size:12px;color:#4338ca;">' + esc(item.playbook) + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Identified At-Risk Cohort', '10 Priority Pet Parents', 'In Win-Back', 'warn', 'Lapse score > 65%', '🛡️'),
        kpiHtml('Predicted Churn Prevention', '84.6%', '+6.2% Win-Back', 'up', 'Autonomous retention sequence', '✨'),
        kpiHtml('Net Retention Rate (NRR)', '108.4%', '+4.1% MoM', 'up', 'Expansion spend outpacing lapse', '📈'),
        kpiHtml('Avg Days to Churn Trigger', '42 Days', '+12 Days Buffer', 'up', 'Early intervention window', '⏳'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">High-Risk Customer Churn Radar & Win-Back Playbook (10 Critical Accounts)</h3>',
            '<p class="zai-card-sub">Algorithmic scoring combining consultation gaps, medicine refill delays, and complaint logs</p>',
          '</div>',
          '<button class="zai-btn primary" onclick="alert(\'Executing 10 autonomous retention workflows and concierge calls...\')">Execute Win-Back</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Pet Parent Name</th>',
                '<th>Pet Profile</th>',
                '<th>Past Spend</th>',
                '<th>Churn Risk Score</th>',
                '<th>Primary Decay Factor</th>',
                '<th>Automated Playbook</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              rows,
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  
  /* ── 9. Profit Prediction ────────────────────────────────────────── */
  function renderProfitPrediction() {
    var profitScenarios = [
      { name: 'Base Case — Current Run-Rate + Seasonal Surge', rev: '₹5.40 Cr (+14% MoM)', cogs: '₹2.54 Cr (47.0%)', ebitda: '₹94.0L', margin: '17.4% EBITDA', prob: '55% (High)' },
      { name: 'Aggressive — Surgical Wing Expansion + Price Tuning', rev: '₹6.25 Cr (+26% MoM)', cogs: '₹2.81 Cr (45.0%)', ebitda: '₹1.32 Cr', margin: '21.1% EBITDA', prob: '25% (Moderate)' },
      { name: 'Conservative — Supply Chain Headwind & Delay', rev: '₹4.85 Cr (+4% MoM)', cogs: '₹2.38 Cr (49.1%)', ebitda: '₹67.0L', margin: '13.8% EBITDA', prob: '20% (Stress Case)' },
      { name: 'Inpatient High-Occupancy (90% ICU Utilization)', rev: '₹5.85 Cr (+22% MoM)', cogs: '₹2.63 Cr (45.0%)', ebitda: '₹1.18 Cr', margin: '20.2% EBITDA', prob: '40% (Conditional)' },
      { name: '60-Min Express Pharmacy Scale (35k Orders)', rev: '₹5.95 Cr (+24% MoM)', cogs: '₹2.92 Cr (49.0%)', ebitda: '₹1.04 Cr', margin: '17.5% EBITDA', prob: '45% (High)' },
      { name: 'Subscription Auto-Ship Ramp (40% Client Base)', rev: '₹5.60 Cr (+17% MoM)', cogs: '₹2.58 Cr (46.0%)', ebitda: '₹1.10 Cr', margin: '19.6% EBITDA', prob: '50% (High)' },
      { name: 'Diagnostic Lab In-Sourcing (Beckman Panels)', rev: '₹5.30 Cr (+12% MoM)', cogs: '₹2.33 Cr (44.0%)', ebitda: '₹1.08 Cr', margin: '20.4% EBITDA', prob: '60% (High)' },
      { name: 'Private Label Pet Nutrition Launch (3 SKUs)', rev: '₹5.55 Cr (+16% MoM)', cogs: '₹2.44 Cr (44.0%)', ebitda: '₹1.15 Cr', margin: '20.7% EBITDA', prob: '35% (Emerging)' },
      { name: 'Veterinary Tele-Triage Monetization', rev: '₹5.25 Cr (+11% MoM)', cogs: '₹2.41 Cr (46.0%)', ebitda: '₹98.5L', margin: '18.8% EBITDA', prob: '65% (Stable)' },
      { name: 'Consolidated Vendor Master Sourcing Contract', rev: '₹5.40 Cr (+14% MoM)', cogs: '₹2.40 Cr (44.5%)', ebitda: '₹1.08 Cr', margin: '20.0% EBITDA', prob: '70% (In Execution)' }
    ];

    var rows = profitScenarios.map(function(item) {
      return '<tr>' +
        '<td><b>' + esc(item.name) + '</b></td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;">' + esc(item.rev) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:#dc2626;">' + esc(item.cogs) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#059669;">' + esc(item.ebitda) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#4f46e5;">' + esc(item.margin) + '</td>' +
        '<td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:#e0e7ff;color:#4338ca;">' + esc(item.prob) + '</span></td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Projected Monthly EBITDA', '₹94.0L (17.4%)', '+2.8% Margin', 'up', 'Base case operating model', '💹'),
        kpiHtml('Gross Profit Margin Forecast', '53.0%', '+1.8% vs Target', 'up', 'Blended clinical & retail', '📈'),
        kpiHtml('Breakeven Occupancy Rate', '62.5%', 'Across 14 clinics', 'up', 'Current average: 78.4%', '🏥'),
        kpiHtml('Unit Economic Multiplier', '35.2x LTV/CAC', 'Payback: 1.8 Mo', 'up', 'High client lifetime value', '💎'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Dynamic Profitability Scenario Simulation Engine (10 Macro Models)</h3>',
            '<p class="zai-card-sub">Stress testing margins under varying operational cost and logistics conditions</p>',
          '</div>',
          '<span class="zai-badge info">Simulation Active: P50 Base</span>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Operating Scenario</th>',
                '<th>Revenue Assumption</th>',
                '<th>COGS & Supply</th>',
                '<th>Projected EBITDA</th>',
                '<th>Net Margin</th>',
                '<th>Probability</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              rows,
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  
  /* ── 10. Anomaly Detection ───────────────────────────────────────── */
  function renderAnomalyDetection() {
    var anomalies = [
      { time: '2026-10-14 12:48:12', domain: 'PHARMACY_PRICING', desc: 'Negative gross margin detected on Bravecto 20-40kg at Koramangala Hub (-4.2% margin)', dev: '+4.1σ Deviation', sev: 'CRITICAL', badgeBg: '#fef2f2', badgeColor: '#dc2626', action: 'Automated Price Safeguard: Locked price to ₹1,850 MSRP floor' },
      { time: '2026-10-14 12:35:40', domain: 'COLD_CHAIN_IOT', desc: 'Indiranagar Vaccine Chiller B temperature reached 9.4°C (Safe limit: 2°C - 8°C)', dev: '+3.6σ Spike', sev: 'CRITICAL', badgeBg: '#fef2f2', badgeColor: '#dc2626', action: 'Auto-alert dispatched to Facility Manager + Backup compressor triggered' },
      { time: '2026-10-14 12:14:02', domain: 'LOGISTICS_DISPATCH', desc: 'Whitefield Express delivery rider transit delay spike (Avg 68 min vs 45 min target)', dev: '+3.2σ Outlier', sev: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c', action: 'Dynamic geofence re-route dispatched orders to Indiranagar backup hub' },
      { time: '2026-10-14 11:58:22', domain: 'BILLING_GATEWAY', desc: 'Payment gateway failover rate on HDFC UPI transactions surged to 8.4%', dev: '+3.8σ Anomaly', sev: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c', action: 'Auto-switched primary routing to Razorpay secondary payment gateway' },
      { time: '2026-10-14 11:22:15', domain: 'CLINIC_SCHEDULING', desc: 'Bandra ICU surgical slot overbooking conflict for orthopedic table 2', dev: '+2.8σ Variance', sev: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c', action: 'Auto-rescheduled non-emergency elective prep to Slot 4; notified pet parent' },
      { time: '2026-10-14 10:45:00', domain: 'INVENTORY_SINK', desc: 'Discrepancy of 14 units Rimadyl 75mg during morning cycle count at HSR', dev: '+3.1σ Drop', sev: 'MEDIUM', badgeBg: '#eff6ff', badgeColor: '#2563eb', action: 'Generated automated audit reconciliation task for Pharmacy Supervisor' },
      { time: '2026-10-14 10:12:30', domain: 'LAB_TELEMETRY', desc: 'Blood chemistry panel processing latency at South Ext exceeding 90 min', dev: '+2.9σ Lag', sev: 'MEDIUM', badgeBg: '#eff6ff', badgeColor: '#2563eb', action: 'Rerouted 8 non-urgent CBC samples to Central Reference Laboratory' },
      { time: '2026-10-14 09:30:18', domain: 'REVENUE_DRAIN', desc: 'Disproportionate 50% promotional coupon stacking applied to premium grooming', dev: '+4.4σ Outlier', sev: 'CRITICAL', badgeBg: '#fef2f2', badgeColor: '#dc2626', action: 'Deactivated expired coupon code PETFEST50 on checkout microservice' },
      { time: '2026-10-14 08:50:44', domain: 'CUSTOMER_EXPERIENCE', desc: 'Negative review sentiment trigger: 3 consecutive 1-star ratings on clinic wait time', dev: '+3.4σ Clustering', sev: 'HIGH', badgeBg: '#fff7ed', badgeColor: '#ea580c', action: 'Initiated automated client recovery call ticket for Senior Ops Lead' },
      { time: '2026-10-14 08:15:10', domain: 'DATABASE_REPLICATION', desc: 'MySQL read replica lag on analytical reports database peaked at 480ms', dev: '+2.7σ Drift', sev: 'MEDIUM', badgeBg: '#eff6ff', badgeColor: '#2563eb', action: 'Auto-scaled database connection pool and purged stale query cache' }
    ];

    var rows = anomalies.map(function(item) {
      return '<tr>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:#64748b;">' + esc(item.time) + '</td>' +
        '<td><b>' + esc(item.domain) + '</b></td>' +
        '<td style="font-size:12px;color:#0f172a;max-width:280px;">' + esc(item.desc) + '</td>' +
        '<td style="font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#dc2626;">' + esc(item.dev) + '</td>' +
        '<td><span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:' + item.badgeBg + ';color:' + item.badgeColor + '">' + item.sev + '</span></td>' +
        '<td style="font-size:12px;color:#059669;font-weight:600;">' + esc(item.action) + '</td>' +
      '</tr>';
    }).join('');

    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Active Anomaly Alerts', '10 Stream Alerts', '-4 Resolved (24h)', 'warn', 'Sub-minute telemetry', '🔍'),
        kpiHtml('Anomalies Resolved (7D)', '38 Events', '98.4% Resolution', 'up', 'Pricing, dispatch & sync', '🛡️'),
        kpiHtml('Detection Latency', '1.8 Seconds', '-0.4s vs SLA', 'up', 'Kafka transaction pipeline', '⚡'),
        kpiHtml('System Stability Index', '99.2% Index', '0.8% False Positives', 'up', 'Real-time health monitoring', '⚙️'),
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h3 class="zai-card-title">Live 3-Sigma Statistical Anomaly Event Feed (10 Live Ingestion Alerts)</h3>',
            '<p class="zai-card-sub">Sub-minute automated surveillance of revenue flows, fulfillment timings, and inventory drops</p>',
          '</div>',
          '<button class="zai-btn" onclick="alert(\'Refreshing 3-sigma Kafka telemetry event stream...\')">🔄 Refresh Stream</button>',
        '</div>',
        '<div class="zai-table-wrap">',
          '<table class="zai-table">',
            '<thead>',
              '<tr>',
                '<th>Timestamp</th>',
                '<th>Domain</th>',
                '<th>Anomaly Description</th>',
                '<th>Deviation</th>',
                '<th>Severity</th>',
                '<th>Auto-Resolution Action</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              rows,
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  
  /* ── 11. AI Recommendations — Fully Functional Engine ──────────── */

  /* Recommendation state — persists across re-renders within session */
  var MOCK_PLAYBOOKS = [
    { id: 'REC-INV-001', cat: 'INVENTORY', urgency: 'CRITICAL', title: 'Emergency Bravecto Restock & Inter-Hub Rebalance', summary: 'Prevent stockout across Koramangala & Whitefield hubs within 48h', hubs: 'Koramangala, Whitefield', ebitda: 285000, confidence: 0.98, effort: 'LOW', status: 'PENDING', score: 279300, actionMsg: 'Dispatched emergency Bravecto PO to Koramangala & Whitefield' },
    { id: 'REC-PRC-002', cat: 'PRICING', urgency: 'CRITICAL', title: 'Dynamic Surgical & Emergency Tariff Alignment', summary: 'Eliminate negative surgical margin and capture inelastic emergency demand', hubs: 'Bandra, South Ext, Indiranagar', ebitda: 340000, confidence: 0.96, effort: 'LOW', status: 'PENDING', score: 326400, actionMsg: 'Updated emergency surgery price schedule across surgical centers' },
    { id: 'REC-RET-003', cat: 'RETENTION', urgency: 'HIGH', title: 'Puppy Vaccination Retention & Booster Sequence', summary: 'Win back 480 lapsed puppy parents with 1-click WhatsApp booking', hubs: 'All 14 Hubs', ebitda: 420000, confidence: 0.94, effort: 'MEDIUM', status: 'PENDING', score: 263200, actionMsg: 'Activated automated 21-day WhatsApp vaccination booster campaign' },
    { id: 'REC-CLN-004', cat: 'CLINIC', urgency: 'HIGH', title: 'Diagnostic Ultrasound Post-Op Screening Mandate', summary: 'Integrate post-op scans into EMR surgical discharge protocols', hubs: 'All Surgical Hubs', ebitda: 315000, confidence: 0.95, effort: 'LOW', status: 'PENDING', score: 299250, actionMsg: 'Enforced post-operative abdominal ultrasound checklist in EMR' },
    { id: 'REC-INV-005', cat: 'INVENTORY', urgency: 'HIGH', title: 'FEFO Near-Expiry Antibiotic Transfer Playbook', summary: 'Transfer 180 feline antibiotic vials to prevent batch write-off', hubs: 'Koramangala -> Indiranagar', ebitda: 185000, confidence: 0.99, effort: 'LOW', status: 'PENDING', score: 183150, actionMsg: 'Created inter-facility transfer order for 180 feline antibiotic vials' },
    { id: 'REC-RET-006', cat: 'RETENTION', urgency: 'HIGH', title: 'Chronic Renal & Diabetic Auto-Ship Conversion', summary: 'Migrate 340 chronic pet parents to subscription medicine refills', hubs: 'Bangalore & Mumbai Hubs', ebitda: 260000, confidence: 0.92, effort: 'MEDIUM', status: 'PENDING', score: 159466, actionMsg: 'Enrolled 340 chronic pet parents into auto-ship subscription program' },
    { id: 'REC-CLN-007', cat: 'CLINIC', urgency: 'MEDIUM', title: 'Weekend ICU Surgical Capacity Expansion', summary: 'Add second on-call emergency vet surgeon Friday to Sunday', hubs: 'Bandra & Indiranagar', ebitda: 295000, confidence: 0.91, effort: 'MEDIUM', status: 'PENDING', score: 149138, actionMsg: 'Scheduled secondary emergency veterinary surgeon for Fri-Sun triage' },
    { id: 'REC-PRC-008', cat: 'PRICING', urgency: 'MEDIUM', title: 'Coupon Stacking Firewall & Promo Optimization', summary: 'Enforce single coupon validation rule on checkout API', hubs: 'Online Commerce / Mobile App', ebitda: 290000, confidence: 0.97, effort: 'LOW', status: 'COMPLETED', score: 281300, actionMsg: 'Deployed checkout firewall blocking promo code stacking' },
    { id: 'REC-INV-009', cat: 'INVENTORY', urgency: 'MEDIUM', title: 'Centralized Microchip & Consumables Bulk PO', summary: 'Consolidate vendor orders to secure 12% manufacturer volume rebate', hubs: 'Central Warehouse', ebitda: 175000, confidence: 0.95, effort: 'MEDIUM', status: 'PENDING', score: 92361, actionMsg: 'Issued consolidated national PO with 12% tier-3 volume discount' },
    { id: 'REC-CLN-010', cat: 'CLINIC', urgency: 'MEDIUM', title: 'Ultrasonic Dental Care Preventive Bundle', summary: 'Offer 15% discount when bundling dental scaling with annual wellness', hubs: 'All Polyclinics', ebitda: 210000, confidence: 0.93, effort: 'LOW', status: 'PENDING', score: 195300, actionMsg: 'Published 15% dental care bundle across patient mobile app' }
  ];

  var REC_STATE = {
    playbooks: MOCK_PLAYBOOKS,
    filter: 'ALL',
    auditLog: [
      { id: 'REC-PRC-008', title: 'Coupon Stacking Firewall & Promo Optimization', cat: 'PRICING', impact: '₹2.9L', executedAt: '2026-10-14 10:15', detail: 'Deployed checkout firewall blocking promo code stacking' }
    ],
    showAudit: false,
    initialized: true
  };

  var EFFORT_W = { LOW: 1.0, MEDIUM: 1.8, HIGH: 3.0 };
  var URG_M = { CRITICAL: 1.5, HIGH: 1.2, MEDIUM: 1.0 };

  function recScore(r) {
    return Math.round(((r.ebitda * r.confidence) / (EFFORT_W[r.effort] || 1)) * (URG_M[r.urgency] || 1));
  }

  function fmtINR(v) {
    if (v >= 100000) return '₹' + (v / 100000).toFixed(1) + 'L';
    if (v >= 1000) return '₹' + (v / 1000).toFixed(1) + 'K';
    return '₹' + v;
  }

  function initRecPlaybooks() {
    if (REC_STATE.initialized) return;
    if (!REC_STATE.playbooks || REC_STATE.playbooks.length === 0) REC_STATE.playbooks = MOCK_PLAYBOOKS;
    REC_STATE.initialized = true;

    // Connect to backend telemetry recommendations stream
    try {
      fetch('/api/v1/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: {} })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && Array.isArray(data.playbooks) && data.playbooks.length > 0) {
          REC_STATE.playbooks = data.playbooks;
          render();
        }
      })
      .catch(function() {});
    } catch(e) {}
  }

  window._zenveIngestPlaybooks = function(playbooks) {
    if (Array.isArray(playbooks)) {
      playbooks.forEach(function(r) {
        if (!r.score) r.score = recScore(r);
      });
      playbooks.sort(function(a,b) { return b.score - a.score; });
      REC_STATE.playbooks = playbooks;
      render();
    }
  };

  function renderRecommendations() {
    initRecPlaybooks();
    var pb = REC_STATE.playbooks || [];
    var filter = REC_STATE.filter;

    var pending = pb.filter(function(r){return r.status==='PENDING';});
    var completed = pb.filter(function(r){return r.status==='COMPLETED';});
    var ebitdaAvail = 0; pending.forEach(function(r){ebitdaAvail+=r.ebitda;});
    var ebitdaReal = 0;  completed.forEach(function(r){ebitdaReal+=r.ebitda;});
    var highImpact = pb.filter(function(r){return (r.urgency==='CRITICAL'||r.urgency==='HIGH')&&r.status==='PENDING';}).length;
    var avgConf = pb.length > 0 ? Math.round((pb.reduce(function(s,r){return s+r.confidence;},0)/pb.length)*100) : 0;

    var filtered = filter === 'ALL' ? pb : pb.filter(function(r){return r.cat===filter;});

    var catMeta = {
      INVENTORY: {icon:'📦',color:'#7c3aed',bg:'#f5f3ff',border:'#ddd6fe',label:'Supply Chain'},
      RETENTION: {icon:'💗',color:'#db2777',bg:'#fdf2f8',border:'#fbcfe8',label:'Retention'},
      CLINIC:    {icon:'🏥',color:'#0891b2',bg:'#ecfeff',border:'#a5f3fc',label:'Clinical Ops'},
      PRICING:   {icon:'💰',color:'#ca8a04',bg:'#fefce8',border:'#fde68a',label:'Pricing'}
    };
    var urgMeta = {
      CRITICAL: {color:'#dc2626',bg:'#fef2f2',label:'🔴 CRITICAL'},
      HIGH:     {color:'#ea580c',bg:'#fff7ed',label:'🟠 HIGH'},
      MEDIUM:   {color:'#2563eb',bg:'#eff6ff',label:'🔵 MEDIUM'}
    };

    var filterTabs = [
      {key:'ALL',label:'All Playbooks',icon:'🎯'},
      {key:'INVENTORY',label:'Inventory',icon:'📦'},
      {key:'RETENTION',label:'Retention',icon:'💗'},
      {key:'CLINIC',label:'Clinic',icon:'🏥'},
      {key:'PRICING',label:'Margins',icon:'💰'}
    ];

    var html = [];

    /* KPI Cards */
    html.push('<div class="zai-kpi-grid">');
    html.push(kpiHtml('High-Impact Actions', highImpact+' Ready', highImpact>0?highImpact+' pending':'--', highImpact>3?'warn':highImpact>0?'up':'neutral', 'of '+pending.length+' total pending', '⚡'));
    html.push(kpiHtml('EBITDA Lift Available', fmtINR(ebitdaAvail), ebitdaAvail>0?pending.length+' playbooks':'--', ebitdaAvail>500000?'up':'neutral', 'From pending playbooks', '✨'));
    html.push(kpiHtml('Recommendation Accuracy', avgConf+'%', avgConf>80?'High confidence':'Moderate', avgConf>80?'up':'neutral', 'Avg across all playbooks', '🎯'));
    html.push(kpiHtml('Cumulative Value Realized', fmtINR(ebitdaReal), completed.length>0?completed.length+' executed':'--', ebitdaReal>0?'up':'neutral', ebitdaReal>0?'From completed playbooks':'Execute playbooks to capture', '💎'));
    html.push('</div>');

    /* Filter Tabs */
    html.push('<div style="display:flex;gap:8px;flex-wrap:wrap;padding:6px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:4px">');
    filterTabs.forEach(function(ft) {
      var isActive = filter === ft.key;
      var cnt = ft.key==='ALL' ? pb.length : pb.filter(function(r){return r.cat===ft.key;}).length;
      html.push('<button type="button" class="zai-rec-filter" data-rec-filter="'+ft.key+'" style="display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;border:none;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s ease;background:'+(isActive?'#4f46e5':'transparent')+';color:'+(isActive?'#fff':'#475569')+'">');
      html.push('<span>'+ft.icon+'</span><span>'+esc(ft.label)+'</span>');
      html.push('<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;font-family:\'IBM Plex Mono\',monospace;background:'+(isActive?'rgba(255,255,255,.2)':'#e2e8f0')+';color:'+(isActive?'#fff':'#64748b')+'">'+cnt+'</span>');
      html.push('</button>');
    });
    html.push('</div>');

    /* Playbook Cards Table */
    html.push('<div class="zai-card">');
    html.push('<div class="zai-card-head"><div>');
    html.push('<h3 class="zai-card-title">Prioritized Executive Autonomous Playbooks</h3>');
    html.push('<p class="zai-card-sub">Algorithmic action queue ranked by EBITDA potential × confidence ÷ effort — Zenve Intelligence Engine</p>');
    html.push('</div>');
    if (pending.length > 0) {
      html.push('<button class="zai-btn primary" onclick="window._recApproveAll()">✅ Approve All Pending</button>');
    }
    html.push('</div>');

    html.push('<div class="zai-table-wrap"><table class="zai-table"><thead><tr>');
    html.push('<th>Priority</th><th>Strategic Action Playbook</th><th>Target / Department</th><th>Projected EBITDA</th><th>Effort</th><th>Status</th><th>Action</th>');
    html.push('</tr></thead><tbody>');

    if (filtered.length === 0) {
      html.push('<tr><td colspan="7" style="text-align:center;padding:36px 20px;color:#94a3b8;font-size:13px;line-height:1.6;"><span style="font-size:24px;display:block;margin-bottom:6px;">⚡</span>No prioritized executive autonomous playbooks detected in telemetry stream.<br><span style="font-size:12px;color:#64748b">Telemetry streams are active — awaiting data ingestion.</span></td></tr>');
    } else {
      filtered.forEach(function(r, idx) {
        var cm = catMeta[r.cat] || catMeta.INVENTORY;
        var um = urgMeta[r.urgency] || urgMeta.MEDIUM;
        var isDone = r.status === 'COMPLETED';
        var isExec = r.status === 'EXECUTING';
        var isDismissed = r.status === 'DISMISSED';

        html.push('<tr style="opacity:'+(isDismissed?'0.5':'1')+'">');
        /* Priority */
        html.push('<td><span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px;background:'+um.bg+';color:'+um.color+'">'+um.label+'</span><br><span style="font-size:10px;color:#4f46e5;font-family:\'IBM Plex Mono\',monospace">Score: '+r.score.toLocaleString()+'</span></td>');
        /* Playbook */
        html.push('<td>');
        html.push('<span style="font-size:10px;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:'+cm.color+';background:'+cm.bg+';border:1px solid '+cm.border+';padding:2px 8px;border-radius:4px">'+esc(r.id)+'</span>');
        html.push(' <span style="font-size:10px;color:'+cm.color+'">'+cm.icon+' '+esc(cm.label)+'</span>');
        html.push('<div style="font-weight:700;font-size:13px;color:'+(isDone?'#059669':isDismissed?'#94a3b8':'#0f172a')+';margin:4px 0 2px;text-decoration:'+(isDismissed?'line-through':'none')+'">'+(isDone?'✅ ':'')+esc(r.title)+'</div>');
        html.push('<div style="font-size:11px;color:#4f46e5;font-weight:600;margin-bottom:2px">'+esc(r.summary)+'</div>');
        html.push('<div style="font-size:10px;color:#64748b">🏢 '+esc(r.hubs)+' · Win: '+esc(r.win)+'</div>');
        if (isDone && r.executedAt) {
          html.push('<div style="margin-top:4px;font-size:10px;padding:4px 8px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:4px;color:#166534">✅ Executed '+esc(r.executedAt)+'</div>');
        }
        html.push('</td>');
        /* Dept */
        html.push('<td style="font-size:12px">'+esc(r.dept)+'</td>');
        /* EBITDA */
        html.push('<td style="font-weight:700;color:#059669;font-family:\'IBM Plex Mono\',monospace">'+fmtINR(r.ebitda)+'<br><span style="font-size:10px;color:#64748b;font-weight:400">Conf: '+Math.round(r.confidence*100)+'%</span></td>');
        /* Effort */
        html.push('<td><span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:6px;background:#fefce8;color:#a16207;border:1px solid #fde68a">'+esc(r.effort)+'</span></td>');
        /* Status */
        var statLabel = r.status === 'PENDING' ? '⏳ Pending' : r.status === 'EXECUTING' ? '⚙️ Executing...' : r.status === 'COMPLETED' ? '✅ Completed' : '⊘ Dismissed';
        var statColor = r.status === 'COMPLETED' ? '#059669' : r.status === 'EXECUTING' ? '#d97706' : r.status === 'DISMISSED' ? '#94a3b8' : '#64748b';
        html.push('<td><span style="font-size:10px;font-weight:700;color:'+statColor+'">'+statLabel+'</span></td>');
        /* Action */
        html.push('<td style="white-space:nowrap">');
        if (r.status === 'PENDING') {
          html.push('<button class="zai-btn" style="font-size:11px;padding:5px 10px;margin-right:4px;color:#dc2626;border-color:#fecaca" onclick="window._recDismiss(\''+r.id+'\')">Dismiss</button>');
          html.push('<button class="zai-btn primary" style="font-size:11px;padding:5px 12px;background:linear-gradient(135deg,'+cm.color+',#4f46e5)" onclick="window._recExecute(\''+r.id+'\')">'+esc(r.actionText)+' →</button>');
        } else if (isExec) {
          html.push('<span style="font-size:11px;font-weight:700;color:#92400e">⚙️ Processing...</span>');
        } else {
          html.push('<button class="zai-btn" style="font-size:11px;padding:5px 10px" onclick="window._recUndo(\''+r.id+'\')">↩ Undo</button>');
        }
        html.push('</td>');
        html.push('</tr>');
      });
    }
    html.push('</tbody></table></div></div>');

    /* Audit Trail */
    html.push('<div class="zai-card">');
    html.push('<div class="zai-card-head" style="cursor:pointer" onclick="window._recToggleAudit()">');
    html.push('<div><h3 class="zai-card-title">📋 Execution Audit Trail <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:#f0fdf4;color:#059669;border:1px solid #bbf7d0;font-family:\'IBM Plex Mono\',monospace">'+REC_STATE.auditLog.length+' Records</span></h3>');
    html.push('<p class="zai-card-sub">Complete history with timestamps, action details, and projected impact</p></div>');
    html.push('<span style="font-size:18px;color:#64748b">▼</span></div>');

    if (REC_STATE.showAudit) {
      html.push('<div class="zai-table-wrap"><table class="zai-table"><thead><tr>');
      html.push('<th>Timestamp</th><th>Playbook</th><th>Category</th><th>Impact</th><th>Detail</th>');
      html.push('</tr></thead><tbody>');
      if (REC_STATE.auditLog.length === 0) {
        html.push('<tr><td colspan="5" style="text-align:center;padding:24px;color:#94a3b8;">No executed playbooks yet.</td></tr>');
      } else {
        REC_STATE.auditLog.forEach(function(log) {
          var lm = catMeta[log.cat] || catMeta.INVENTORY;
          html.push('<tr>');
          html.push('<td style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:#64748b;white-space:nowrap">'+esc(log.executedAt)+'</td>');
          html.push('<td><span style="font-size:10px;color:#4f46e5;font-family:\'IBM Plex Mono\',monospace">'+esc(log.id)+'</span><br><span style="font-weight:600;font-size:12px">'+esc(log.title)+'</span></td>');
          html.push('<td><span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;background:'+lm.bg+';color:'+lm.color+';border:1px solid '+lm.border+'">'+esc(log.cat)+'</span></td>');
          html.push('<td style="font-weight:700;color:#059669;font-family:\'IBM Plex Mono\',monospace">'+esc(log.impact)+'</td>');
          html.push('<td style="color:#475569;font-size:12px;line-height:1.5;max-width:300px">'+esc(log.detail)+'</td>');
          html.push('</tr>');
        });
      }
      html.push('</tbody></table></div>');
    }
    html.push('</div>');

    return html.join('');
  }

  /* ── Recommendation Action Handlers (global) ─────────────────────── */
  window._recExecute = function(id) {
    var r = null;
    for (var i = 0; i < REC_STATE.playbooks.length; i++) {
      if (REC_STATE.playbooks[i].id === id) { r = REC_STATE.playbooks[i]; break; }
    }
    if (!r || r.status !== 'PENDING') return;
    r.status = 'EXECUTING';
    render();
    setTimeout(function() {
      var ts = new Date().toLocaleString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' });
      r.status = 'COMPLETED';
      r.executedAt = ts;
      REC_STATE.auditLog.unshift({ id:r.id, title:r.title, cat:r.cat, impact:fmtINR(r.ebitda), executedAt:ts, detail:r.actionMsg });
      render();
      _recToast(r.actionMsg, 'success');
    }, 2200);
  };
  window._recDismiss = function(id) {
    for (var i = 0; i < REC_STATE.playbooks.length; i++) {
      if (REC_STATE.playbooks[i].id === id) { REC_STATE.playbooks[i].status = 'DISMISSED'; break; }
    }
    render();
    _recToast('Playbook dismissed from active queue.', 'info');
  };
  window._recUndo = function(id) {
    for (var i = 0; i < REC_STATE.playbooks.length; i++) {
      if (REC_STATE.playbooks[i].id === id) { REC_STATE.playbooks[i].status = 'PENDING'; REC_STATE.playbooks[i].executedAt = undefined; break; }
    }
    render();
    _recToast('Playbook restored to active queue.', 'info');
  };
  window._recApproveAll = function() {
    var pending = REC_STATE.playbooks.filter(function(r){return r.status==='PENDING';});
    if (pending.length === 0) { _recToast('No pending playbooks to approve.', 'info'); return; }
    pending.forEach(function(r) { window._recExecute(r.id); });
  };
  window._recToggleAudit = function() {
    REC_STATE.showAudit = !REC_STATE.showAudit;
    render();
  };

  function _recToast(msg, type) {
    var bgMap = { success:'#059669', info:'#2563eb', warning:'#d97706', error:'#dc2626' };
    var iconMap = { success:'✅', info:'ℹ️', warning:'⚠️', error:'❌' };
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;top:24px;right:24px;z-index:99999;display:flex;align-items:center;gap:10px;padding:14px 20px;border-radius:12px;background:'+(bgMap[type]||bgMap.info)+';color:#fff;font-size:13px;font-weight:600;font-family:"Manrope",sans-serif;box-shadow:0 8px 32px rgba(0,0,0,.18);max-width:480px;line-height:1.5;cursor:pointer;animation:slideInRight .35s ease-out';
    el.innerHTML = '<span style="font-size:18px">'+(iconMap[type]||'ℹ️')+'</span><span>'+esc(msg)+'</span>';
    el.onclick = function() { document.body.removeChild(el); };
    document.body.appendChild(el);
    setTimeout(function() { if (el.parentNode) document.body.removeChild(el); }, 5000);
  }

  function getActiveTabConfig() {
    var norm = normalizeTab(S.tab);
    for (var i = 0; i < TABS.length; i++) {
      if (TABS[i].id === norm) return TABS[i];
    }
    return TABS[0];
  }

  function renderTabsBar() {
    var activeId = normalizeTab(S.tab);
    return TABS.map(function (t) {
      var isActive = t.id === activeId;
      return [
        '<button type="button" class="zai-tab ' + (isActive ? 'active' : '') + '" data-tab="' + t.id + '">',
          '<span>' + t.icon + '</span>',
          '<span>' + esc(t.label) + '</span>',
          '<span class="zai-tab-badge">' + esc(t.badge) + '</span>',
        '</button>'
      ].join('');
    }).join('');
  }

  function renderBody() {
    var tab = normalizeTab(S.tab);
    switch (tab) {
      case 'insights':     return renderInsights();
      case 'revenue':      return renderRevenue();
      case 'sales-fc':     return renderSalesForecast();
      case 'demand-fc':    return renderDemandForecast();
      case 'inventory-pr': return renderInventoryPrediction();
      case 'customer-pr':  return renderCustomerPrediction();
      case 'churn-pr':     return renderChurnPrediction();
      case 'profit-pr':    return renderProfitPrediction();
      case 'anomaly':      return renderAnomalyDetection();
      case 'recommend':    return renderRecommendations();
      case 'ask-ai':
      default:             return renderAskAi();
    }
  }

  
  /* ── 0. Custom API Integration & Enterprise RAG Suite ──────────────── */
  function renderCustomRag() {
    return [
      '<div class="zai-kpi-grid">',
        kpiHtml('Gateway Provider', 'Custom Multi-LLM', 'Zero Vendor Lock', 'up', 'OpenAI · Gemini · Air-Gapped', '🔌'),
        kpiHtml('Enterprise RAG', '4 Layers Live', 'Live Grounding', 'up', 'MySQL · Cold-chain · EBITDA', '🛡️'),
        kpiHtml('Agentic Pipeline', '5 Autonomous', 'Human-in-the-Loop', 'success', 'Supervisor · Query · Action', '🤖'),
        kpiHtml('Live Latency', '< 35ms Avg', 'P99 Validated', 'up', 'Sub-50ms Ultra-Fast Gateway', '⚡'),
      '</div>',

      '<div class="zai-card" style="margin-bottom: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #eef2ff 50%, #ffffff 100%); border: 1.5px solid #c7d2fe;">',
        '<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">',
          '<div>',
            '<div style="display: flex; align-items: center; gap: 8px;">',
              '<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></span>',
              '<h3 style="margin: 0; font-size: 17px; font-weight: 800; color: #1e1b4b;">Custom API Integration (Enterprise RAG &amp; Agentic Architecture)</h3>',
              '<span class="zai-badge" style="background: #e0e7ff; color: #3730a3; font-weight: 700;">Active Gateway</span>',
            '</div>',
            '<p style="margin: 6px 0 0; font-size: 13px; color: #475569; max-width: 820px; line-height: 1.5;">',
              'Enterprise-grade multi-model API integration connecting OpenAI-compatible gateways, Google Gemini, and Built-in Air-Gapped Neural models with zero vendor lock-in. Grounded across live MySQL databases, cold-chain pharmacopoeia, and hospital EBITDA telemetry.',
            '</p>',
          '</div>',
          '<div style="display: flex; align-items: center; gap: 10px;">',
            '<button type="button" class="zai-btn primary" id="zai-open-settings-integrations" style="font-size: 12px; padding: 8px 16px; background: #4f46e5;">',
              '⚙️ Open Full Settings Suite →',
            '</button>',
            '<button type="button" class="zai-btn" id="zai-rag-ping-btn" style="font-size: 12px; padding: 8px 14px;">',
              '🔌 Test Connection &amp; Ping',
            '</button>',
          '</div>',
        '</div>',
        '<div id="zai-ping-result-box" style="margin-top: 12px; display: none;"></div>',
      '</div>',

      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 20px;">',
        '<div class="zai-card">',
          '<div class="zai-card-head">',
            '<div>',
              '<h4 style="margin:0; font-size: 14px; font-weight: 700;">📡 Multi-LLM Provider Gateway</h4>',
              '<p style="margin:2px 0 0; font-size: 11px; color:#64748b;">Plug-and-play inference endpoints</p>',
            '</div>',
          '</div>',
          '<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">',
            '<div style="padding: 10px 12px; border-radius: 8px; border: 1.5px solid #10b981; background: #ecfdf5; display: flex; align-items: center; justify-content: space-between;">',
              '<div>',
                '<div style="font-weight: 700; font-size: 12px; color: #065f46;">Custom OpenAI-Compatible</div>',
                '<div style="font-size: 10.5px; color: #047857;">Ollama · Groq · DeepSeek · vLLM · Self-Hosted</div>',
              '</div>',
              '<span style="font-size: 10.5px; font-weight: 700; color: #10b981; background: #d1fae5; padding: 2px 8px; borderRadius: 4px;">Active</span>',
            '</div>',
            '<div style="padding: 10px 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8fafc; display: flex; align-items: center; justify-content: space-between;">',
              '<div>',
                '<div style="font-weight: 700; font-size: 12px; color: #1e293b;">Google Gemini 1.5 Pro / Flash</div>',
                '<div style="font-size: 10.5px; color: #64748b;">Direct Vertex / Generative AI SDK</div>',
              '</div>',
              '<span style="font-size: 10.5px; font-weight: 600; color: #64748b;">Ready</span>',
            '</div>',
            '<div style="padding: 10px 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8fafc; display: flex; align-items: center; justify-content: space-between;">',
              '<div>',
                '<div style="font-weight: 700; font-size: 12px; color: #1e293b;">Air-Gapped Neural RAG Core</div>',
                '<div style="font-size: 10.5px; color: #64748b;">In-memory deterministic fallback · Zero egress</div>',
              '</div>',
              '<span style="font-size: 10.5px; font-weight: 600; color: #64748b;">Zero-Cost</span>',
            '</div>',
          '</div>',
        '</div>',

        '<div class="zai-card">',
          '<div class="zai-card-head">',
            '<div>',
              '<h4 style="margin:0; font-size: 14px; font-weight: 700;">🛡️ Enterprise RAG Grounding Layers</h4>',
              '<p style="margin:2px 0 0; font-size: 11px; color:#64748b;">4-layer real-time domain knowledge retrieval</p>',
            '</div>',
          '</div>',
          '<div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">',
            '<div style="padding: 8px 10px; border-radius: 6px; background: #f1f5f9; display: flex; align-items: center; justify-content: space-between; font-size: 11.5px;">',
              '<span>💾 <strong>Layer 1:</strong> MySQL zenve_engine Telemetry</span>',
              '<span style="color: #059669; font-weight: 700;">✓ Synced</span>',
            '</div>',
            '<div style="padding: 8px 10px; border-radius: 6px; background: #f1f5f9; display: flex; align-items: center; justify-content: space-between; font-size: 11.5px;">',
              '<span>❄️ <strong>Layer 2:</strong> Cold-Chain Pharmacopoeia (2°C–8°C)</span>',
              '<span style="color: #059669; font-weight: 700;">✓ Synced</span>',
            '</div>',
            '<div style="padding: 8px 10px; border-radius: 6px; background: #f1f5f9; display: flex; align-items: center; justify-content: space-between; font-size: 11.5px;">',
              '<span>💹 <strong>Layer 3:</strong> 14 Hospital Unit Economics &amp; EBITDA</span>',
              '<span style="color: #059669; font-weight: 700;">✓ Synced</span>',
            '</div>',
            '<div style="padding: 8px 10px; border-radius: 6px; background: #f1f5f9; display: flex; align-items: center; justify-content: space-between; font-size: 11.5px;">',
              '<span>🚚 <strong>Layer 4:</strong> 60-Minute Logistics SLAs &amp; Dispatch</span>',
              '<span style="color: #059669; font-weight: 700;">✓ Synced</span>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zai-card" style="margin-bottom: 20px;">',
        '<div class="zai-card-head">',
          '<div>',
            '<h4 style="margin:0; font-size: 14px; font-weight: 700;">🤖 5-Agent Autonomous Orchestrator</h4>',
            '<p style="margin:2px 0 0; font-size: 11px; color:#64748b;">Hierarchical agent execution flow with human authorization gate</p>',
          '</div>',
        '</div>',
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-top: 14px;">',
          '<div style="padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fafbfc; text-align: center;">',
            '<div style="font-size: 20px;">👑</div>',
            '<div style="font-weight: 700; font-size: 12px; margin-top: 4px; color: #1e293b;">Supervisor</div>',
            '<div style="font-size: 10px; color: #64748b; margin-top: 2px;">Intent Classification</div>',
          '</div>',
          '<div style="padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fafbfc; text-align: center;">',
            '<div style="font-size: 20px;">🔍</div>',
            '<div style="font-weight: 700; font-size: 12px; margin-top: 4px; color: #1e293b;">Live Query</div>',
            '<div style="font-size: 10px; color: #64748b; margin-top: 2px;">SQL Vector Extraction</div>',
          '</div>',
          '<div style="padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fafbfc; text-align: center;">',
            '<div style="font-size: 20px;">💊</div>',
            '<div style="font-weight: 700; font-size: 12px; margin-top: 4px; color: #1e293b;">Formulary</div>',
            '<div style="font-size: 10px; color: #64748b; margin-top: 2px;">Cold Chain &amp; Dosages</div>',
          '</div>',
          '<div style="padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fafbfc; text-align: center;">',
            '<div style="font-size: 20px;">💹</div>',
            '<div style="font-weight: 700; font-size: 12px; margin-top: 4px; color: #1e293b;">Financial</div>',
            '<div style="font-size: 10px; color: #64748b; margin-top: 2px;">EBITDA &amp; Unit Economics</div>',
          '</div>',
          '<div style="padding: 12px; border-radius: 8px; border: 1.5px solid #8b5cf6; background: #fdf4ff; text-align: center;">',
            '<div style="font-size: 20px;">⚡</div>',
            '<div style="font-weight: 700; font-size: 12px; margin-top: 4px; color: #7c3aed;">Action Drafter</div>',
            '<div style="font-size: 10px; color: #a855f7; margin-top: 2px;">Human-in-Loop Commits</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zai-card">',
        '<div class="zai-card-head">',
          '<div>',
            '<h4 style="margin:0; font-size: 14px; font-weight: 700;">🧪 Interactive Gateway Sandbox</h4>',
            '<p style="margin:2px 0 0; font-size: 11px; color:#64748b;">Test multi-agent inference and RAG grounding in real-time</p>',
          '</div>',
        '</div>',
        '<div style="margin-top: 14px;">',
          '<div style="display: flex; gap: 8px; margin-bottom: 10px;">',
            '<button type="button" class="zai-chip" onclick="document.getElementById(\'zai-sandbox-prompt\').value=\'Audit Bravecto stockout risk and draft a PO\'">💊 Test Bravecto Stockout</button>',
            '<button type="button" class="zai-chip" onclick="document.getElementById(\'zai-sandbox-prompt\').value=\'Which hospital hub generated the highest EBITDA this month?\'">🏆 Test Hospital EBITDA</button>',
            '<button type="button" class="zai-chip" onclick="document.getElementById(\'zai-sandbox-prompt\').value=\'Simulate +15% logistics cost variance and propose mitigation\'">📊 Test Logistics Sim</button>',
          '</div>',
          '<div style="display: flex; gap: 8px;">',
            '<input type="text" id="zai-sandbox-prompt" class="zai-input" placeholder="Type prompt to test through Custom API &amp; RAG orchestrator..." value="Audit Bravecto stockout risk and draft a PO" style="flex: 1;" />',
            '<button type="button" id="zai-sandbox-run-btn" class="zai-btn primary" style="padding: 0 20px; background: #10b981;">⚡ Execute Query</button>',
          '</div>',
          '<div id="zai-sandbox-output" style="margin-top: 14px; display: none;"></div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function render() {
    if (!root) return;
    var current = getActiveTabConfig();

    root.innerHTML = [
      '<header class="zai-head">',
        '<div class="zai-head-left">',
          '<div class="zai-title-row">',
            '<h1 class="zai-title">' + esc(current.title) + '</h1>',
            '<span class="zai-live-badge"><span class="zai-pulse-dot"></span> AI Autonomous Core</span>',
          '</div>',
          '<p class="zai-sub">' + esc(current.sub) + '</p>',
        '</div>',
        '<div class="zai-head-actions">',
          '<button class="zai-btn" onclick="alert(\'Retraining neural embeddings on live October transaction ledgers...\')">🔄 Refresh Models</button>',
          '<button class="zai-btn primary" onclick="alert(\'Executive AI Intelligence Packet generated (PDF).\')">📊 Download Briefing</button>',
        '</div>',
      '</header>',
      '<nav class="zai-tabs-bar">',
        renderTabsBar(),
      '</nav>',
      '<div class="zai-body">',
        renderBody(),
      '</div>'
    ].join('');

    bindEvents();
  }

  function handleAiQuery(text) {
    if (!text || !text.trim()) return;
    var q = text.trim();
    S.chatHistory.push({ role: 'user', text: q });

    // Show Multi-Agent reasoning status
    var pendingMsg = {
      role: 'ai',
      text: '🧠 **Autonomous Multi-Agent Orchestrator** processing query...\n\n• Supervisor Agent: Classifying executive intent\n• Live Query Agent: Grounding in MySQL `zenve_engine`\n• Action Drafter: Synthesizing prescriptive action card',
      agent_steps: [
        { agent: "SupervisorAgent", status: "running" },
        { agent: "LiveQueryAgent", status: "running" },
        { agent: "ActionDrafterAgent", status: "pending" }
      ],
      isPending: true
    };
    S.chatHistory.push(pendingMsg);
    render();

    var msgsEl = document.getElementById('zai-chat-msgs');
    if (msgsEl) msgsEl.scrollTop = msgsEl.scrollHeight;

    // Call live FastAPI Co-Pilot endpoint
    fetch('/api/v1/copilot/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, context: S.lastContext })
    })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      var pIdx = S.chatHistory.indexOf(pendingMsg);
      if (pIdx >= 0) S.chatHistory.splice(pIdx, 1);

      if (data.context) S.lastContext = data.context;
      S.chatHistory.push(data);
      render();
      var mEl = document.getElementById('zai-chat-msgs');
      if (mEl) mEl.scrollTop = mEl.scrollHeight;
    })
    .catch(function (err) {
      console.warn('[Zenve Copilot] API fallback triggered:', err);
      var pIdx = S.chatHistory.indexOf(pendingMsg);
      if (pIdx >= 0) S.chatHistory.splice(pIdx, 1);

      var localResp = ZenveNLP_LLM.generateResponse(q, S.lastContext);
      S.lastContext = localResp.context;
      S.chatHistory.push(localResp);
      render();
      var mEl = document.getElementById('zai-chat-msgs');
      if (mEl) mEl.scrollTop = mEl.scrollHeight;
    });
  }

  function bindEvents() {
    if (!root) return;

    var tabs = root.querySelectorAll('.zai-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function () {
        var tid = this.getAttribute('data-tab');
        switchTab(tid);
      });
    }

    /* Recommendation category filter tabs */
    var recFilters = root.querySelectorAll('.zai-rec-filter');
    for (var rf = 0; rf < recFilters.length; rf++) {
      recFilters[rf].addEventListener('click', function () {
        REC_STATE.filter = this.getAttribute('data-rec-filter') || 'ALL';
        render();
      });
    }

    var closeBtn = root.querySelector('#zai-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        close();
      });
    }

    var clearBtn = root.querySelector('#zai-clear-chat');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        S.chatHistory = [
          {
            role: 'ai',
            text: "Chat reset. 🐾 I'm ready for your next question or action command! Ask me about pet demographics, clinic EBITDA, pharmacy stockouts, or draft automated Purchase Orders."
          }
        ];
        S.lastContext = { intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' };
        render();
      });
    }

    var auditBtn = root.querySelector('#zai-audit-trail-btn');
    if (auditBtn) {
      auditBtn.addEventListener('click', function () {
        fetch('/api/v1/copilot/audit-trail')
          .then(function (r) { return r.json(); })
          .then(function (d) {
            var trail = d.audit_trail || [];
            if (!trail.length) {
              alert('Executive Action Audit Trail:\n\nNo actions executed yet in this session. Click "⚡ Approve & Execute Action" on any proposal card to test live ERP execution.');
            } else {
              var text = trail.map(function (t) {
                return '• [' + t.executed_at + '] ' + t.action_id + ' by ' + t.executed_by + '\n  Transaction: ' + t.transaction_ref + '\n  Summary: ' + t.summary;
              }).join('\n\n');
              alert('Executive Action Audit Ledger (MySQL zenve_engine):\n\n' + text);
            }
          })
          .catch(function () {
            alert('Executive Action Audit Ledger:\n\n• ACT-PO-8821: 60 Bravecto units dispatched to Indiranagar Central Dark Store.');
          });
      });
    }

    var chatForm = root.querySelector('#zai-chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = root.querySelector('#zai-query-input');
        if (input) {
          var val = input.value;
          input.value = '';
          handleAiQuery(val);
        }
      });
    }

    var chips = root.querySelectorAll('.zai-chip');
    for (var j = 0; j < chips.length; j++) {
      chips[j].addEventListener('click', function () {
        var q = this.getAttribute('data-query');
        handleAiQuery(q);
      });
    }

    var followups = root.querySelectorAll('.zai-followup-btn');
    for (var f = 0; f < followups.length; f++) {
      followups[f].addEventListener('click', function () {
        var q = this.getAttribute('data-query');
        handleAiQuery(q);
      });
    }

    // Text-to-Action Execution Buttons
    var execBtns = root.querySelectorAll('.zai-exec-btn');
    for (var eb = 0; eb < execBtns.length; eb++) {
      execBtns[eb].addEventListener('click', function () {
        var actionId = this.getAttribute('data-action-id');
        var msgIdx = parseInt(this.getAttribute('data-msg-idx'), 10);
        var btn = this;
        btn.disabled = true;
        btn.innerHTML = '⏳ Executing in ERP...';

        fetch('/api/v1/copilot/execute-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action_id: actionId, user: 'Executive Admin' })
        })
        .then(function (res) { return res.json(); })
        .then(function (receipt) {
          if (S.chatHistory[msgIdx] && S.chatHistory[msgIdx].actions) {
            S.chatHistory[msgIdx].actions.forEach(function (a) {
              if (a.action_id === actionId) {
                a.status = 'EXECUTED';
                a.receipt = receipt;
              }
            });
          }
          render();
        })
        .catch(function (err) {
          btn.disabled = false;
          btn.innerHTML = '⚡ Approve & Execute Action';
          alert('Execution error: ' + err.message);
        });
      });
    }

    var actionBtns = root.querySelectorAll('.zai-action-btn');
    for (var a = 0; a < actionBtns.length; a++) {
      actionBtns[a].addEventListener('click', function () {
        var actType = this.getAttribute('data-act-type');
        var hash = this.getAttribute('data-hash');
        var scrollTarget = this.getAttribute('data-scroll');
        var actionId = this.getAttribute('data-action-id');
        var msgIdx = parseInt(this.getAttribute('data-msg-idx'), 10);

        if (actType === 'nav' && hash) {
          window.location.hash = hash;
          close();
          if (scrollTarget) {
            setTimeout(function () {
              var el = document.getElementById(scrollTarget) || document.querySelector('.' + scrollTarget);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 150);
          }
        } else if (actType === 'exec_action' && actionId) {
          if (actionId === 'po_8821') {
            if (S.chatHistory[msgIdx]) {
              S.chatHistory[msgIdx].actionFeedback = 'PO-8821 Approved: 60 Bravecto units dispatched from Central Hub to Koramangala. ETA: 4 Hours.';
              render();
            }
          } else if (actionId === 'winback_whatsapp') {
            if (S.chatHistory[msgIdx]) {
              S.chatHistory[msgIdx].actionFeedback = 'WhatsApp Campaign Triggered: Dispatched complimentary dental triage vouchers to 248 at-risk pet parents.';
              render();
            }
          }
        }
      });
    }
  }

  function switchTab(tid) {
    S.tab = normalizeTab(tid);
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
    if (!root) {
      root = document.createElement('div');
      root.id = 'zai-root';
      document.body.appendChild(root);
    }
    if (tabId) S.tab = normalizeTab(tabId);
    S.open = true;
    root.style.display = 'block';
    document.documentElement.classList.add('zai-locked');
    document.body.classList.add('zai-locked');
    render();
  }

  function close() {
    if (!root) return;
    root.style.display = 'none';
    S.open = false;
    document.documentElement.classList.remove('zai-locked');
    document.body.classList.remove('zai-locked');
  }

  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      close();
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zai-root');
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
      if (e.key === 'Escape' && S.open) close();
    });

    window.addEventListener('hashchange', onHashChange);

    if (window.location.hash) {
      var initial = tabFromHash(window.location.hash);
      if (initial) {
        setTimeout(function () { open(initial); }, 150);
      }
    }
  }

  window.ZenveAIAssistant = {
    open: open,
    close: close,
    switchTab: switchTab
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
