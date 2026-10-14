/* =====================================================================
   Zenve BI — Pharmacy Domain Control Center & Subdomain Suite
   All 10 Subdomains:
     1. Pharmacy Dashboard      (#pharmacy-dashboard)
     2. Pharmacy Sales          (#pharmacy-sales)
     3. Medicines               (#medicines)
     4. Prescriptions           (#prescriptions)
     5. Pharmacy Orders         (#pharmacy-orders)
     6. Batch Management        (#batch-management)
     7. Expiry Tracking         (#expiry-tracking)
     8. Pharmacy Inventory      (#pharmacy-inventory)
     9. Pharmacy Revenue        (#pharmacy-revenue)
     10. Pharmacy Profitability (#pharmacy-profitability)
   ===================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function inr(n) {
    n = Number(n) || 0;
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2) + ' L';
    if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + n.toLocaleString('en-IN');
  }

  /* ── 10 Tabs Definition ────────────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',     label: 'Pharmacy Dashboard',     icon: '💊', hash: '#pharmacy-dashboard',     badge: '' },
    { id: 'sales',         label: 'Pharmacy Sales',         icon: '💰', hash: '#pharmacy-sales',         badge: '' },
    { id: 'medicines',     label: 'Medicines',              icon: '📚', hash: '#medicines',              badge: '' },
    { id: 'prescriptions', label: 'Prescriptions',          icon: '📋', hash: '#prescriptions',          badge: '' },
    { id: 'orders',        label: 'Pharmacy Orders',        icon: '🚚', hash: '#pharmacy-orders',        badge: '' },
    { id: 'batches',       label: 'Batch Management',       icon: '🏷️', hash: '#batch-management',       badge: '' },
    { id: 'expiry',        label: 'Expiry Tracking',        icon: '⏳', hash: '#expiry-tracking',        badge: '' },
    { id: 'inventory',     label: 'Pharmacy Inventory',     icon: '📦', hash: '#pharmacy-inventory',     badge: '' },
    { id: 'revenue',       label: 'Pharmacy Revenue',       icon: '💎', hash: '#pharmacy-revenue',       badge: '' },
    { id: 'profitability', label: 'Pharmacy Profitability', icon: '📈', hash: '#pharmacy-profitability', badge: '' }
  ];

  /* ── Datasets ─────────────────────────────────────────────────── */
  var MEDICINES = [
    { sku: 'ZV-DRUG-001', name: 'Bravecto Chewable Tablet (20-40kg)', generic: 'Fluralaner 500mg', form: 'Chewable Tablet', brand: 'MSD Animal Health', schedule: 'OTC Pet Health', cold: false, ptr: 1650, mrp: 2450, stock: 145, rop: 30, zone: 'A-01 Dry Ambient' },
    { sku: 'ZV-DRUG-002', name: 'NexGard Spectra Chewable (7.5-15kg)', generic: 'Afoxolaner 37.5mg + Milbemycin 7.5mg', form: 'Chewable Tablet', brand: 'Boehringer Ingelheim', schedule: 'OTC Pet Health', cold: false, ptr: 1980, mrp: 2980, stock: 24, rop: 40, zone: 'A-02 Dry Ambient' },
    { sku: 'ZV-DRUG-003', name: 'Nobivac DHPPi Core Vaccine Kit', generic: 'Live Attenuated Viral Antigen', form: 'Lyophilized Vial + Diluent', brand: 'MSD Animal Health', schedule: 'Schedule H', cold: true, ptr: 520, mrp: 850, stock: 85, rop: 50, zone: 'C-01 Cold Reefer (2-8°C)' },
    { sku: 'ZV-DRUG-004', name: 'Felocell 4 Feline Core Vaccine', generic: 'Feline Rhinotracheitis-Calici-Panleukopenia', form: 'Lyophilized Vial', brand: 'Zoetis', schedule: 'Schedule H', cold: true, ptr: 740, mrp: 1200, stock: 45, rop: 20, zone: 'C-02 Cold Reefer (2-8°C)' },
    { sku: 'ZV-DRUG-005', name: 'Clavamox Drops 15ml', generic: 'Amoxicillin + Clavulanate 62.5mg/ml', form: 'Oral Suspension', brand: 'Zoetis', schedule: 'Schedule H', cold: false, ptr: 310, mrp: 495, stock: 120, rop: 25, zone: 'B-01 Regulated Vault' },
    { sku: 'ZV-DRUG-006', name: 'Vetmedin 5mg Chewable Tablets', generic: 'Pimobendan 5mg (Inodilator)', form: 'Flavored Chewable Tablet', brand: 'Boehringer Ingelheim', schedule: 'Schedule H', cold: false, ptr: 2200, mrp: 3250, stock: 68, rop: 20, zone: 'B-02 Regulated Vault' },
    { sku: 'ZV-DRUG-007', name: 'Apoquel 16mg Tablets', generic: 'Oclacitinib Maleate 16mg', form: 'Film-coated Tablet', brand: 'Zoetis', schedule: 'Schedule H', cold: false, ptr: 2850, mrp: 4100, stock: 92, rop: 25, zone: 'B-03 Regulated Vault' },
    { sku: 'ZV-DRUG-008', name: 'Douxo S3 PYO Antiseptic Mousse', generic: 'Ophytrium 0.75% + Chlorhexidine 3%', form: 'Leave-on Foam 150ml', brand: 'Ceva Sante Animale', schedule: 'OTC Pet Health', cold: false, ptr: 1100, mrp: 1680, stock: 18, rop: 20, zone: 'A-03 OTC Shelf' },
    { sku: 'ZV-DRUG-009', name: 'Synoquin EFA Large Breed Tablets', generic: 'Glucosamine + Chondroitin + Dexahan', form: 'Chewable Tablet 120s', brand: 'VetPlus UK', schedule: 'OTC Pet Health', cold: false, ptr: 2450, mrp: 3650, stock: 75, rop: 15, zone: 'A-04 OTC Shelf' },
    { sku: 'ZV-DRUG-010', name: 'Royal Canin Renal Liquid 200ml', generic: 'Enteral Tube Support Diet', form: 'Liquid Diet 3x200ml', brand: 'Royal Canin', schedule: 'OTC Pet Health', cold: false, ptr: 1350, mrp: 1950, stock: 52, rop: 15, zone: 'A-05 Clinical Diet' }
  ];

  var PRESCRIPTIONS = [
    { id: 'RX-2026-9401', pet: 'Bruno', species: 'Canine (Golden, 32kg)', vet: 'Dr. Priya Sharma', meds: 'Vetmedin 5mg #60 + Lasix 40mg', status: 'Dispensed', time: '12 mins ago', notes: 'Dilated Cardiomyopathy (Stage C)' },
    { id: 'RX-2026-9402', pet: 'Milo', species: 'Feline (Persian, 4.2kg)', vet: 'Dr. Ananya Rao', meds: 'Clavamox Drops 15ml x 2', status: 'Dispensed', time: '28 mins ago', notes: 'Feline Upper Respiratory Infection' },
    { id: 'RX-2026-9403', pet: 'Simba', species: 'Canine (Shih Tzu, 6.8kg)', vet: 'Dr. Rajesh K', meds: 'Apoquel 16mg #30 + Douxo S3', status: 'Dispensed', time: '45 mins ago', notes: 'Atopic Dermatitis & Malassezia Flare' },
    { id: 'RX-2026-9404', pet: 'Luna', species: 'Canine (Labrador, 28kg)', vet: 'Dr. Priya Sharma', meds: 'Bravecto Chewable (20-40kg) #1', status: 'Dispensed', time: '1.2 hrs ago', notes: 'Tick-borne Babesiosis Prophylaxis' },
    { id: 'RX-2026-9405', pet: 'Oreo', species: 'Feline (Domestic, 3.8kg)', vet: 'Dr. Sandeep Verma', meds: 'Felocell 4 Vaccine Kit #1', status: 'Dispensed', time: '2.1 hrs ago', notes: 'Annual Booster Vaccination' },
    { id: 'RX-2026-9406', pet: 'Rocky', species: 'Canine (GSD, 36kg)', vet: 'Dr. Priya Sharma', meds: 'Synoquin EFA Large Breed #120', status: 'Pending Review', time: '2.8 hrs ago', notes: 'Hip Dysplasia & Osteoarthritis' },
    { id: 'RX-2026-9407', pet: 'Bella', species: 'Canine (Beagle, 12kg)', vet: 'Dr. Ananya Rao', meds: 'NexGard Spectra (7.5-15kg) #3', status: 'Dispensed', time: '3.5 hrs ago', notes: 'Preventive Flea/Tick & Deworming' },
    { id: 'RX-2026-9408', pet: 'Leo', species: 'Canine (Rottweiler, 42kg)', vet: 'Dr. Rajesh K', meds: 'Nobivac DHPPi Kit #1 Dose', status: 'Dispensed', time: '4.2 hrs ago', notes: 'Core Vaccine Booster Program' },
    { id: 'RX-2026-9409', pet: 'Coco', species: 'Feline (Siamese, 3.5kg)', vet: 'Dr. Sandeep Verma', meds: 'Royal Canin Renal Liquid x 3', status: 'Dispensed', time: '5.1 hrs ago', notes: 'Chronic Kidney Disease (IRIS 2)' },
    { id: 'RX-2026-9410', pet: 'Zoe', species: 'Canine (Indie, 18kg)', vet: 'Dr. Priya Sharma', meds: 'Apoquel 5.4mg #60 + Meloxicam', status: 'Pending Review', time: '5.8 hrs ago', notes: 'Allergic Pruritus & Pododermatitis' }
  ];

  var ORDERS = [
    { id: 'PH-ORD-881', customer: 'Rohan Kapoor (Bruno)', address: 'Indiranagar, BLR', items: 'Vetmedin 5mg #60 + Lasix 40mg', channel: 'App Express', cold: false, sla: '24 mins left', status: 'Out for Delivery', value: 4250 },
    { id: 'PH-ORD-882', customer: 'Sneha Nair (Milo)', address: 'Koramangala, BLR', items: 'Clavamox Drops 15ml x 2', channel: '60-Min Rapid', cold: false, sla: '12 mins left', status: 'Out for Delivery', value: 990 },
    { id: 'PH-ORD-883', customer: 'Vikram Mehta (Simba)', address: 'Bandra West, BOM', items: 'Apoquel 16mg #30 + Douxo S3 Mousse', channel: 'In-Clinic Counter', cold: false, sla: 'Completed', status: 'Delivered', value: 5780 },
    { id: 'PH-ORD-884', customer: 'Pooja Hegde (Luna)', address: 'Whitefield, BLR', items: 'Bravecto Chewable (20-40kg) #1', channel: 'Scheduled Courier', cold: false, sla: 'Delivered', status: 'Delivered', value: 2450 },
    { id: 'PH-ORD-885', customer: 'Karan Johar (Oreo)', address: 'Vasant Kunj, DEL', items: 'Felocell 4 Vaccine Kit (Reefer)', channel: 'Cold Chain Express', cold: true, sla: '38 mins left', status: 'Out for Delivery', value: 1200 },
    { id: 'PH-ORD-886', customer: 'Aditya Roy (Rocky)', address: 'Jayanagar, BLR', items: 'Synoquin EFA Large Breed #120', channel: 'App Express', cold: false, sla: 'Preparing', status: 'Processing', value: 3650 },
    { id: 'PH-ORD-887', customer: 'Meera Nambiar (Bella)', address: 'HSR Layout, BLR', items: 'NexGard Spectra (7.5-15kg) #3', channel: 'Subscription Refill', cold: false, sla: 'Delivered', status: 'Delivered', value: 2980 },
    { id: 'PH-ORD-888', customer: 'Sameer Joshi (Leo)', address: 'Andheri East, BOM', items: 'Nobivac DHPPi Kit (Cold Pack)', channel: 'Cold Chain Express', cold: true, sla: '45 mins left', status: 'Out for Delivery', value: 850 },
    { id: 'PH-ORD-889', customer: 'Farhan Akhtar (Coco)', address: 'Cyber City, GGN', items: 'Royal Canin Renal Liquid x 3', channel: '60-Min Rapid', cold: false, sla: '18 mins left', status: 'Out for Delivery', value: 1950 },
    { id: 'PH-ORD-890', customer: 'Divya Swaminathan (Zoe)', address: 'MG Road, BLR', items: 'Apoquel 5.4mg #60 + Meloxicam', channel: 'In-Clinic Counter', cold: false, sla: 'Ready at Counter', status: 'Ready for Pickup', value: 4890 }
  ];

  var BATCHES = [
    { batchNo: 'BAT-BRV-8821', name: 'Bravecto Chewable (20-40kg)', vendor: 'MSD Animal Health', mfg: '2025-02-10', exp: '2027-08-15', hub: 'Bengaluru Central Hub', zone: 'A-01 Dry Ambient', qty: 200, balance: 145, qc: 'QC Passed' },
    { batchNo: 'BAT-NXG-4419', name: 'NexGard Spectra (7.5-15kg)', vendor: 'Boehringer Ingelheim', mfg: '2025-01-15', exp: '2026-11-20', hub: 'Mumbai West Hub', zone: 'A-02 Dry Ambient', qty: 150, balance: 24, qc: 'QC Passed' },
    { batchNo: 'BAT-NBV-9932', name: 'Nobivac DHPPi Vaccine Kit', vendor: 'MSD Animal Health', mfg: '2024-11-05', exp: '2026-11-12', hub: 'Bengaluru Central Hub', zone: 'C-01 Cold Reefer', qty: 120, balance: 85, qc: 'QC Passed' },
    { batchNo: 'BAT-FLC-7714', name: 'Felocell 4 Feline Vaccine', vendor: 'Zoetis India', mfg: '2025-03-01', exp: '2027-02-28', hub: 'Delhi NCR Hub', zone: 'C-02 Cold Reefer', qty: 100, balance: 45, qc: 'QC Passed' },
    { batchNo: 'BAT-CLM-3302', name: 'Clavamox Drops 15ml', vendor: 'Zoetis India', mfg: '2025-04-12', exp: '2027-04-10', hub: 'Bengaluru Central Hub', zone: 'B-01 Vault', qty: 250, balance: 120, qc: 'QC Passed' },
    { batchNo: 'BAT-VTM-5511', name: 'Vetmedin 5mg Chewable', vendor: 'Boehringer Ingelheim', mfg: '2024-12-01', exp: '2026-12-15', hub: 'Bengaluru Central Hub', zone: 'B-02 Vault', qty: 100, balance: 68, qc: 'QC Passed' },
    { batchNo: 'BAT-APQ-6629', name: 'Apoquel 16mg Tablets', vendor: 'Zoetis India', mfg: '2025-02-18', exp: '2027-06-30', hub: 'Mumbai West Hub', zone: 'B-03 Vault', qty: 150, balance: 92, qc: 'QC Passed' },
    { batchNo: 'BAT-DXS-1194', name: 'Douxo S3 PYO Mousse', vendor: 'Ceva Sante Animale', mfg: '2025-01-20', exp: '2026-11-25', hub: 'Pune Micro-Hub', zone: 'A-03 OTC Shelf', qty: 80, balance: 18, qc: 'QC Passed' },
    { batchNo: 'BAT-SYN-2281', name: 'Synoquin EFA Large Breed', vendor: 'VetPlus UK / Alivira', mfg: '2025-03-10', exp: '2027-09-30', hub: 'Bengaluru Central Hub', zone: 'A-04 OTC Shelf', qty: 120, balance: 75, qc: 'QC Passed' },
    { batchNo: 'BAT-RC-RNL08', name: 'Royal Canin Renal Liquid', vendor: 'Mars Petcare India', mfg: '2025-04-05', exp: '2026-12-30', hub: 'Delhi NCR Hub', zone: 'A-05 Clinical Diet', qty: 90, balance: 52, qc: 'Quarantine Review' }
  ];

  var EXPIRY_ITEMS = [
    { batchNo: 'BAT-NBV-9932', name: 'Nobivac DHPPi Vaccine Kit', exp: '2026-11-12', daysLeft: 28, horizon: 'Critical (<30d)', hub: 'Bengaluru Central Hub', balance: 85, cost: 44200, action: 'Quarantine / SRA Claim' },
    { batchNo: 'BAT-NXG-4419', name: 'NexGard Spectra (7.5-15kg)', exp: '2026-11-20', daysLeft: 36, horizon: 'High Alert (30–60d)', hub: 'Mumbai West Hub', balance: 24, cost: 47520, action: 'Refill Discount' },
    { batchNo: 'BAT-DXS-1194', name: 'Douxo S3 PYO Mousse', exp: '2026-11-25', daysLeft: 41, horizon: 'High Alert (30–60d)', hub: 'Pune Micro-Hub', balance: 18, cost: 19800, action: 'Clinic Bundle Markdown' },
    { batchNo: 'BAT-VTM-5511', name: 'Vetmedin 5mg Chewable', exp: '2026-12-15', daysLeft: 61, horizon: 'Moderate (60-90d)', hub: 'Bengaluru Central Hub', balance: 68, cost: 149600, action: 'Chronic Refill Queue' },
    { batchNo: 'BAT-RC-RNL08', name: 'Royal Canin Renal Liquid', exp: '2026-12-30', daysLeft: 76, horizon: 'Moderate (60-90d)', hub: 'Delhi NCR Hub', balance: 52, cost: 70200, action: 'ICU Allocation' },
    { batchNo: 'BAT-FLC-7714', name: 'Felocell 4 Feline Vaccine', exp: '2027-02-28', daysLeft: 136, horizon: 'Safe (>90d)', hub: 'Delhi NCR Hub', balance: 45, cost: 33300, action: 'Normal FEFO' },
    { batchNo: 'BAT-CLM-3302', name: 'Clavamox Drops 15ml', exp: '2027-04-10', daysLeft: 177, horizon: 'Safe (>90d)', hub: 'Bengaluru Central Hub', balance: 120, cost: 37200, action: 'Normal FEFO' },
    { batchNo: 'BAT-APQ-6629', name: 'Apoquel 16mg Tablets', exp: '2027-06-30', daysLeft: 258, horizon: 'Safe (>90d)', hub: 'Mumbai West Hub', balance: 92, cost: 262200, action: 'Normal FEFO' },
    { batchNo: 'BAT-BRV-8821', name: 'Bravecto Chewable (20-40kg)', exp: '2027-08-15', daysLeft: 304, horizon: 'Safe (>90d)', hub: 'Bengaluru Central Hub', balance: 145, cost: 239250, action: 'Normal FEFO' },
    { batchNo: 'BAT-SYN-2281', name: 'Synoquin EFA Large Breed', exp: '2027-09-30', daysLeft: 350, horizon: 'Safe (>90d)', hub: 'Bengaluru Central Hub', balance: 75, cost: 183750, action: 'Normal FEFO' }
  ];

  /* ── State ─────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: '',
    categoryFilter: 'ALL',
    scheduleFilter: 'ALL',
    qcFilter: 'ALL',
    zoneFilter: 'ALL',
    statusFilter: 'ALL'
  };

  var root = null;

  /* ── Tab Resolver from Text or Hash ───────────────────────────── */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    // Exclude other domains: Clinics & Hospitals, Doctors, Products, Reports
    if (s.indexOf('clinic') >= 0 || s.indexOf('hospital') >= 0 || s.indexOf('doctor') >= 0 || s.indexOf('report') >= 0 || s.indexOf('alert') >= 0) return null;
    if (s === 'pharmacy' || s.indexOf('pharmacy dashboard') >= 0) return 'dashboard';
    if (s.indexOf('pharmacy sales') >= 0) return 'sales';
    if (s === 'medicines' || s.indexOf('medicines') >= 0) return 'medicines';
    if (s === 'prescriptions' || s.indexOf('prescriptions') >= 0) return 'prescriptions';
    if (s.indexOf('pharmacy orders') >= 0) return 'orders';
    if (s.indexOf('batch management') >= 0 || s === 'batches') return 'batches';
    if (s.indexOf('expiry tracking') >= 0 || s === 'expiry') return 'expiry';
    if (s.indexOf('pharmacy inventory') >= 0) return 'inventory';
    if (s.indexOf('pharmacy revenue') >= 0) return 'revenue';
    if (s.indexOf('pharmacy profitability') >= 0 || s.indexOf('pharmacy margins') >= 0) return 'profitability';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('clinic') >= 0 || h.indexOf('hospital') >= 0 || h.indexOf('doctor') >= 0) return null;
    if (h === 'pharmacy-dashboard' || h === 'pharmacy') return 'dashboard';
    if (h === 'pharmacy-sales') return 'sales';
    if (h === 'medicines') return 'medicines';
    if (h === 'prescriptions') return 'prescriptions';
    if (h === 'pharmacy-orders') return 'orders';
    if (h === 'batch-management' || h === 'batches') return 'batches';
    if (h === 'expiry-tracking' || h === 'expiry') return 'expiry';
    if (h === 'pharmacy-inventory') return 'inventory';
    if (h === 'pharmacy-revenue') return 'revenue';
    if (h === 'pharmacy-profitability' || h === 'pharmacy-margins') return 'profitability';
    return null;
  }

  /* ── UI Builders ──────────────────────────────────────────────── */
  function build() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'zph-root';
    document.body.appendChild(root);
  }

  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'zph-toast';
    t.innerHTML = '<span>✓</span> ' + esc(msg);
    document.body.appendChild(t);
    setTimeout(function () {
      if (t.parentNode) t.parentNode.removeChild(t);
    }, 3500);
  }

  function render() {
    if (!root) build();
    var cur = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var tabsHtml = TABS.map(function (t) {
      var active = t.id === S.tab ? 'active' : '';
      var bClass = t.dangerBadge ? 'danger' : (t.warnBadge ? 'warn' : '');
      return '<button type="button" class="zph-tab ' + active + '" data-tab="' + t.id + '">' +
        '<span>' + t.icon + '</span> ' + esc(t.label) +
        (t.badge ? ' <span class="zph-tab-badge ' + bClass + '">' + esc(t.badge) + '</span>' : '') +
        '</button>';
    }).join('');

    var bodyHtml = '';
    if (S.tab === 'dashboard') bodyHtml = renderDashboard();
    else if (S.tab === 'sales') bodyHtml = renderSales();
    else if (S.tab === 'medicines') bodyHtml = renderMedicines();
    else if (S.tab === 'prescriptions') bodyHtml = renderPrescriptions();
    else if (S.tab === 'orders') bodyHtml = renderOrders();
    else if (S.tab === 'batches') bodyHtml = renderBatches();
    else if (S.tab === 'expiry') bodyHtml = renderExpiry();
    else if (S.tab === 'inventory') bodyHtml = renderInventory();
    else if (S.tab === 'revenue') bodyHtml = renderRevenue();
    else if (S.tab === 'profitability') bodyHtml = renderProfitability();

    root.innerHTML = [
      '<div class="zph-head">',
        '<div class="zph-head-left">',
          '<div class="zph-title-row">',
            '<h1 class="zph-title">' + cur.icon + ' Pharmacy Domain: ' + esc(cur.label) + '</h1>',
            '<span class="zph-live-badge"><span class="zph-pulse-dot"></span> Schedule H Licensed</span>',
          '</div>',
          '<p class="zph-sub">Comprehensive Veterinary Pharmacy Management & Regulatory Intelligence</p>',
        '</div>',
        '<div class="zph-head-actions">',
          '<button type="button" class="zph-btn primary" id="zph-action-verify"><span>📋</span> Verify e-Rx</button>',
          '<button type="button" class="zph-btn" id="zph-action-export"><span>📥</span> Export Report</button>',
        '</div>',
      '</div>',
      '<div class="zph-tabs-bar">' + tabsHtml + '</div>',
      '<div class="zph-body">' + bodyHtml + '</div>'
    ].join('');

    attachListeners();
  }

  /* ── Tab Renderers ────────────────────────────────────────────── */

  function renderDashboard() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Pharmacy Revenue', '₹58.4L', '+18.4%', 'up', '32.5% of total revenue', '💊'),
        kpiHtml('Prescriptions Filled', '842 Rx', '+14.2%', 'up', '812 digitally signed', '📋'),
        kpiHtml('Avg Dispensary Ticket', '₹2,480', '+6.8%', 'up', '2.8 meds / ticket', '💰'),
        kpiHtml('Formulary Active SKUs', '10 SKUs', '+2 new', 'up', '4 dispensaries', '📦'),
        kpiHtml('Near-Expiry Alerts', '2 Batches', '30–60d', 'warning', '2 alerts under FEFO', '⏳'),
        kpiHtml('Cold Chain Integrity', '100.0%', 'Optimal', 'up', '32 IoT probes verified', '❄️'),
      '</div>',
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:18px;">',
        '<div class="zph-card">',
          '<div class="zph-card-head">',
            '<div><h3 class="zph-card-title">Therapeutic Categories & Margins</h3><p class="zph-card-sub">Top volume pharmaceutical classes</p></div>',
            '<span class="zph-pill success">Blended Margin 34.8%</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            catRow('Antiparasitics & Dewormers', '₹18,40,000', '31.5%', '38.5% margin', '🪱'),
            catRow('Antibiotics & Anti-Infectives', '₹12,20,000', '20.9%', '34.2% margin', '💊'),
            catRow('Chronic Wellness & Cardiac', '₹9,80,000', '16.8%', '36.0% margin', '❤️'),
            catRow('Vaccines & Cold Chain', '₹7,60,000', '13.0%', '28.5% margin', '❄️'),
            catRow('Dermatologicals & Shampoos', '₹6,10,000', '10.4%', '42.0% margin', '🧴'),
            catRow('Nutraceuticals & Joint Care', '₹4,30,000', '7.4%', '45.0% margin', '🦴'),
          '</div>',
        '</div>',
        '<div class="zph-card">',
          '<div class="zph-card-head">',
            '<div><h3 class="zph-card-title">Schedule H Regulatory Compliance</h3><p class="zph-card-sub">Statutory audit trail & narcotic registry</p></div>',
            '<span class="zph-pill success">100% Compliant</span>',
          '</div>',
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">',
            statBox('VCI Registered Vets', '18 / 18 Active', '100% licenses verified', '#38bdf8'),
            statBox('Digital Rx Archival', '100% Retained', '842 e-records signed', '#10b981'),
            statBox('Cold Chain IoT Probes', '12 Sensors', '12 / 12 online 4.1°C avg', '#06b6d4'),
            statBox('Next Drug Inspection', 'Passed (Q3 Audit)', '0 non-conformities', '#f59e0b'),
          '</div>',
          '<div style="padding:12px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.25);border-radius:8px;font-size:12px;color:#93c5fd;">',
            '<strong>Pharmacist Stewardship Note:</strong> Every veterinary antibiotic dispense requires mandatory weight-adjusted dosage checks to prevent antimicrobial resistance.',
          '</div>',
        '</div>',
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Live Pharmacy Dispensary Stream</h3><p class="zph-card-sub">Real-time prescription clearance and counter dispensing</p></div>',
          '<span class="zph-pill info">Real-time Feed</span>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Rx ID</th><th>Pet Patient</th><th>Prescribing Vet</th><th>Prescribed Medicine</th><th>Status</th><th>Timestamp</th></tr></thead>',
            '<tbody>',
              PRESCRIPTIONS.slice(0, 5).map(function (rx) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(rx.id) + '</td>' +
                  '<td><b>' + esc(rx.pet) + '</b> <span style="font-size:10px;color:#64748b;">(' + esc(rx.species) + ')</span></td>' +
                  '<td>' + esc(rx.vet) + '</td>' +
                  '<td>' + esc(rx.meds) + '</td>' +
                  '<td><span class="zph-pill ' + (rx.status === 'Dispensed' ? 'success' : (rx.status.indexOf('Pending') >= 0 ? 'warning' : 'info')) + '">' + esc(rx.status) + '</span></td>' +
                  '<td style="color:#64748b;">' + esc(rx.time) + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSales() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Total Pharmacy Sales', '₹58.4L', '+18.4%', 'up', '842 billing transactions', '💵'),
        kpiHtml('Rx Prescription Sales', '₹40.0L', '68.5% Share', 'up', '577 Rx authorized', '📋'),
        kpiHtml('OTC Health Sales', '₹18.4L', '31.5% Share', 'up', '265 OTC checkouts', '🛍️'),
        kpiHtml('Avg Dispensary Ticket', '₹2,480', '+6.8%', 'up', '2.8 meds / ticket', '🧾'),
        kpiHtml('Total Units Dispensed', '1,420 Units', '+12.5%', 'up', '842 orders filled', '📦'),
        kpiHtml('Chronic Refill Rate', '74.2%', '+5.1%', 'up', '248 recurrent patients', '🔄'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Pharmacy Sales & Billing Ledger</h3><p class="zph-card-sub">Itemized transaction register with attending doctor attribution</p></div>',
          '<button class="zph-btn primary" onclick="alert(\'Printing daily sales day-end Z-report...\')">Print Day-End Z-Report</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Order ID</th><th>Customer & Pet</th><th>Attending Vet</th><th>Channel</th><th>Dispensed Medications</th><th>Payment Mode</th><th style="text-align:right;">Amount</th></tr></thead>',
            '<tbody>',
              ORDERS.map(function (o) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(o.id) + '</td>' +
                  '<td><b>' + esc(o.customer) + '</b></td>' +
                  '<td style="color:#94a3b8;">Dr. Priya Sharma</td>' +
                  '<td><span class="zph-pill info">' + esc(o.channel) + '</span></td>' +
                  '<td>' + esc(o.items) + '</td>' +
                  '<td>UPI / Card</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹' + o.value.toLocaleString('en-IN') + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderMedicines() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Formulated Medicines', '10 SKUs', '+2 new', 'up', '10 active formulary SKUs', '📚'),
        kpiHtml('Schedule H Drugs', '5 SKUs', 'Regulated', 'neutral', '5 mandatory Rx records', '⚠️'),
        kpiHtml('Cold Chain Biologics', '2 SKUs', '2°C–8°C', 'up', '2 temperature sensitive', '❄️'),
        kpiHtml('Average Gross Margin', '34.8%', '+1.8%', 'up', '34.8% blended formulary margin', '📈'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Veterinary Medicine Formulary</h3><p class="zph-card-sub">Active ingredient (API), Schedule classification, PTR cost, and retail MRP</p></div>',
          '<button class="zph-btn primary" id="zph-btn-add-drug"><span>+</span> Add Medicine</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>SKU & Name</th><th>Active Salt / Formulation</th><th>Brand / Mfr</th><th>Schedule</th><th>Storage</th><th style="text-align:right;">Cost (PTR)</th><th style="text-align:right;">MRP</th><th style="text-align:right;">Margin</th><th style="text-align:center;">Stock</th></tr></thead>',
            '<tbody>',
              MEDICINES.map(function (m) {
                var margin = (((m.mrp - m.ptr) / m.mrp) * 100).toFixed(1);
                var isLow = m.stock <= m.rop;
                return '<tr>' +
                  '<td><b>' + esc(m.name) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(m.sku) + '</span></td>' +
                  '<td>' + esc(m.generic) + '<br><span style="font-size:10px;color:#64748b;">' + esc(m.form) + '</span></td>' +
                  '<td style="color:#94a3b8;">' + esc(m.brand) + '</td>' +
                  '<td><span class="zph-pill ' + (m.schedule === 'Schedule H' ? 'danger' : 'success') + '">' + esc(m.schedule) + '</span></td>' +
                  '<td>' + (m.cold ? '<span style="color:#38bdf8;font-weight:600;">❄️ 2°C–8°C</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹' + m.ptr + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">₹' + m.mrp + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#10b981;font-weight:600;">' + margin + '%</td>' +
                  '<td style="text-align:center;"><span class="zph-pill ' + (isLow ? 'danger' : 'success') + '">' + m.stock + (isLow ? ' ⚠️' : '') + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPrescriptions() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Prescriptions MTD', '842 Rx', '+14.2%', 'up', '100% verifiable e-Rx', '📋'),
        kpiHtml('Pending Pharmacist Review', '2 Rx', '2 in queue', 'warning', 'Est review < 8 mins', '⏳'),
        kpiHtml('Dispensed Today', '48 Rx', '+8.5%', 'up', '48 cleared today', '✅'),
        kpiHtml('Flagged Safety Alerts', '0 Rx', '0 alerts', 'up', 'Zero drug interactions', '⚠️'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Digital e-Prescription Queue</h3><p class="zph-card-sub">Pharmacist review & Schedule H dispensing authorization</p></div>',
          '<span class="zph-pill success">VCI Licensure Live</span>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Rx ID</th><th>Pet Patient</th><th>Prescribing Veterinarian</th><th>Prescribed Regimen</th><th>Clinical Diagnosis</th><th>Status</th><th style="text-align:center;">Action</th></tr></thead>',
            '<tbody>',
              PRESCRIPTIONS.map(function (rx) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(rx.id) + '</td>' +
                  '<td><b>' + esc(rx.pet) + '</b><br><span style="font-size:10px;color:#64748b;">' + esc(rx.species) + '</span></td>' +
                  '<td><b>' + esc(rx.vet) + '</b></td>' +
                  '<td>' + esc(rx.meds) + '</td>' +
                  '<td style="color:#cbd5e1;font-size:11px;">' + esc(rx.notes) + '</td>' +
                  '<td><span class="zph-pill ' + (rx.status === 'Dispensed' ? 'success' : (rx.status.indexOf('Pending') >= 0 ? 'warning' : 'danger')) + '">' + esc(rx.status) + '</span></td>' +
                  '<td style="text-align:center;"><button class="zph-btn primary" onclick="window.ZenvePharmacyDashboard.verifyRx(\'' + esc(rx.id) + '\')">Verify & Approve</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Active Pharmacy Orders', '10 Orders', '10 active', 'up', '5 metro hubs active', '🚚'),
        kpiHtml('60-Min Rapid Express', '3 Orders', 'SLA < 45m', 'up', '3 rapid dispatches', '⚡'),
        kpiHtml('In-Clinic Counter Pickup', '2 Orders', 'Ready', 'up', '2 counter pickups ready', '🏥'),
        kpiHtml('Cold Chain Dispatched', '2 Orders', 'Active Ice Pack', 'up', '2 monitored with temp-strip', '❄️'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Pharmacy Orders & Rapid Fulfillment Board</h3><p class="zph-card-sub">Packaging checklist, tamper-evident seals, and delivery manifests</p></div>',
          '<button class="zph-btn primary" onclick="alert(\'Printing batch shipping thermal labels...\')">Print Dispatch Labels</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Order ID</th><th>Customer & Destination</th><th>Prescribed Medications</th><th>Channel</th><th>Cold Chain</th><th>SLA Timer</th><th>Status</th><th style="text-align:right;">Amount</th></tr></thead>',
            '<tbody>',
              ORDERS.map(function (o) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(o.id) + '</td>' +
                  '<td><b>' + esc(o.customer) + '</b><br><span style="font-size:10px;color:#64748b;">' + esc(o.address) + '</span></td>' +
                  '<td>' + esc(o.items) + '</td>' +
                  '<td><span class="zph-pill info">' + esc(o.channel) + '</span></td>' +
                  '<td>' + (o.cold ? '<span style="color:#38bdf8;font-weight:600;">❄️ Insulated</span>' : '<span style="color:#64748b;">Ambient</span>') + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#f59e0b;">' + esc(o.sla) + '</td>' +
                  '<td><span class="zph-pill ' + (o.status === 'Delivered' ? 'success' : 'info') + '">' + esc(o.status) + '</span></td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">₹' + o.value.toLocaleString('en-IN') + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderBatches() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Active Tracked Batches', '10 Batches', '100%', 'up', '10 verified batches', '🏷️'),
        kpiHtml('QC Passed & Released', '9 Batches', '90.0%', 'up', '9 COA certificates approved', '✅'),
        kpiHtml('Quarantine Hold Bay', '1 Batch', '1 hold', 'warning', '1 in re-testing (B7709)', '⏳'),
        kpiHtml('Recalled / Frozen', '0 Batches', '0 flags', 'up', 'Zero safety recalls', '🚫'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Pharmaceutical Batch Traceability</h3><p class="zph-card-sub">Inward GRN, manufacturer batch number, manufacturing date, and expiry timeline</p></div>',
          '<button class="zph-btn primary" onclick="window.ZenvePharmacyDashboard.showInwardModal()"><span>+</span> Inward New Batch (GRN)</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Batch Code</th><th>Medicine Name</th><th>Supplier / Mfr</th><th>Mfg Date</th><th>Expiry Date</th><th>Hub & Zone</th><th style="text-align:right;">Inward</th><th style="text-align:right;">Balance</th><th>QC Status</th></tr></thead>',
            '<tbody>',
              BATCHES.map(function (b) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(b.batchNo) + '</td>' +
                  '<td><b>' + esc(b.name) + '</b></td>' +
                  '<td style="color:#94a3b8;">' + esc(b.vendor) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#94a3b8;">' + esc(b.mfg) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#cbd5e1;">' + esc(b.exp) + '</td>' +
                  '<td>' + esc(b.hub) + '<br><span style="font-size:10px;color:#38bdf8;">' + esc(b.zone) + '</span></td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;">' + b.qty + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:' + (b.balance < 25 ? '#f87171' : '#10b981') + ';">' + b.balance + '</td>' +
                  '<td><span class="zph-pill ' + (b.qc === 'QC Passed' ? 'success' : (b.qc.indexOf('Quarantine') >= 0 ? 'warning' : 'danger')) + '">' + esc(b.qc) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExpiry() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Near-Expiry Exposure', '₹1,11,750', '2.8% of stock', 'warning', '₹1.11L across 10 batches', '⏳'),
        kpiHtml('Critical (<30 Days)', '1 Batch', 'Immediate action', 'danger', '1 batch under FEFO clear', '🚨'),
        kpiHtml('High Alert (30–60 Days)', '2 Batches', 'FEFO priority', 'warning', '2 batches in auto-promo', '⚠️'),
        kpiHtml('Salvage Recovery Rate', '96.4%', '+2.1%', 'up', '96.4% returned or liquidated', '♻️'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Early Warning Expiry Watchlist & FEFO Engine</h3><p class="zph-card-sub">First-Expiry-First-Out rotation, auto-liquidation, and supplier returns</p></div>',
          '<button class="zph-btn primary" onclick="alert(\'Exporting Supplier Return Authorization (SRA) documents to MSD and Zoetis...\')">Generate Bulk SRA Claims</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Batch Code</th><th>Medicine Name</th><th>Expiry Date</th><th>Days Left</th><th>Risk Zone</th><th>Hub</th><th style="text-align:right;">Remaining</th><th style="text-align:right;">Cost Value</th><th style="text-align:center;">Salvage Action</th></tr></thead>',
            '<tbody>',
              EXPIRY_ITEMS.map(function (e) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(e.batchNo) + '</td>' +
                  '<td><b>' + esc(e.name) + '</b></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(e.exp) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:' + (e.daysLeft <= 30 ? '#f87171' : '#fbbf24') + ';">' + e.daysLeft + ' days</td>' +
                  '<td><span class="zph-pill ' + (e.daysLeft <= 30 ? 'danger' : 'warning') + '">' + esc(e.horizon) + '</span></td>' +
                  '<td style="color:#94a3b8;">' + esc(e.hub) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">' + e.balance + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹' + e.cost.toLocaleString('en-IN') + '</td>' +
                  '<td style="text-align:center;"><button class="zph-btn" onclick="alert(\'SRA Credit Note Claim initiated for ' + esc(e.batchNo) + '\')">' + esc(e.action) + '</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderInventory() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Inventory at Cost', '₹11.45L', '+8.2%', 'up', '₹11.45L active asset valuation', '💰'),
        kpiHtml('Valuation at Retail (MRP)', '₹16.82L', '31.9% margin', 'up', '₹16.82L retail realization', '💎'),
        kpiHtml('Cold Chain Stock', '2 SKUs', '2°C–8°C', 'up', '40 total cold units', '❄️'),
        kpiHtml('Inventory Turnover', '7.2x / yr', '+0.6x', 'up', '48 days inventory on hand', '⚡'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Perpetual Stock & Buffer Levels</h3><p class="zph-card-sub">Real-time stock on hand, reorder points (ROP), and days of supply</p></div>',
          '<button class="zph-btn primary" onclick="alert(\'Starting physical cycle count audit...\')">Initiate Cycle Count</button>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>SKU & Name</th><th>Storage Zone</th><th style="text-align:right;">Stock on Hand</th><th style="text-align:right;">Reorder Point</th><th style="text-align:right;">Cost Value</th><th style="text-align:right;">MRP Value</th><th style="text-align:center;">Action</th></tr></thead>',
            '<tbody>',
              MEDICINES.map(function (m) {
                var isLow = m.stock <= m.rop;
                return '<tr>' +
                  '<td><b>' + esc(m.name) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(m.sku) + '</span></td>' +
                  '<td>' + esc(m.zone) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:' + (isLow ? '#f87171' : '#fff') + ';">' + m.stock + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#94a3b8;">' + m.rop + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;">₹' + (m.stock * m.ptr).toLocaleString('en-IN') + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;color:#10b981;">₹' + (m.stock * m.mrp).toLocaleString('en-IN') + '</td>' +
                  '<td style="text-align:center;">' + (isLow ? '<button class="zph-btn primary" onclick="alert(\'Expedited Reorder PO generated for ' + esc(m.sku) + '\')">+ Reorder PO</button>' : '<span style="color:#64748b;font-size:11px;">Healthy ✓</span>') + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Gross Pharmacy Sales', '₹62.5L', '+19.2%', 'up', '842 billed transactions', '💵'),
        kpiHtml('Discounts & Schemes', '-₹4.1L', '6.6% discount rate', 'neutral', 'Loyalty & refill savings', '🏷️'),
        kpiHtml('Net Realized Revenue', '₹58.4L', '+18.4%', 'up', '103.2% of monthly target', '💎'),
        kpiHtml('Insurance Cashless', '₹6.2L', '10.6% of revenue', 'up', '42 cashless pet claims', '🛡️'),
      '</div>',
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));gap:18px;">',
        '<div class="zph-card">',
          '<div class="zph-card-head">',
            '<div><h3 class="zph-card-title">Gross-to-Net Revenue Waterfall</h3><p class="zph-card-sub">Realized cash collection and margin retainment</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            catRow('Gross Pharmacy Billing (MRP)', '₹62,50,000', '', '100% Baseline', '💰'),
            catRow('Chronic Patient Loyalty Discounts', '- ₹3,20,000', '', '5.1% patient discount', '🏷️'),
            catRow('Returns & Breakage Adjustments', '- ₹90,000', '', '1.4% return/loss rate', '📦'),
            '<div style="padding:12px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);border-radius:8px;display:flex;justify-content:space-between;color:#10b981;font-weight:700;">' +
              '<span>Net Recognized Revenue</span><span style="font-family:IBM Plex Mono,monospace;font-size:16px;">₹58,40,000</span>' +
            '</div>',
          '</div>',
        '</div>',
        '<div class="zph-card">',
          '<div class="zph-card-head">',
            '<div><h3 class="zph-card-title">Regional Revenue Distribution</h3><p class="zph-card-sub">City hubs contribution & growth velocity</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            catRow('Bengaluru Central (HQ)', '₹22,40,000', '38.4%', '+19.8% YoY', '🏙️'),
            catRow('Mumbai MMR Hub', '₹15,20,000', '26.0%', '+16.5% YoY', '🌊'),
            catRow('Delhi NCR Fulfillment', '₹10,80,000', '18.5%', '+21.2% YoY', '🏛️'),
            catRow('Hyderabad Hub', '₹5,80,000', '9.9%', '+14.0% YoY', '💎'),
            catRow('Pune Micro-Hub', '₹4,20,000', '7.2%', '+24.5% YoY', '🌿'),
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderProfitability() {
    var marginData = [
      { cat: 'Antiparasitics & Dewormers', rev: '₹18,40,000', cogs: '₹11,31,600', gp: '₹7,08,400', margin: '38.5%', rebate: '₹95,000' },
      { cat: 'Antibiotics & Anti-Infectives', rev: '₹12,20,000', cogs: '₹8,02,760', gp: '₹4,17,240', margin: '34.2%', rebate: '₹58,000' },
      { cat: 'Chronic Wellness & Cardiac', rev: '₹9,80,000', cogs: '₹6,27,200', gp: '₹3,52,800', margin: '36.0%', rebate: '₹44,000' },
      { cat: 'Vaccines & Cold Chain', rev: '₹7,60,000', cogs: '₹5,43,400', gp: '₹2,16,600', margin: '28.5%', rebate: '₹36,000' },
      { cat: 'Dermatologicals & Shampoos', rev: '₹6,10,000', cogs: '₹3,53,800', gp: '₹2,56,200', margin: '42.0%', rebate: '₹28,000' },
      { cat: 'Nutraceuticals & Joint Care', rev: '₹4,30,000', cogs: '₹2,36,500', gp: '₹1,93,500', margin: '45.0%', rebate: '₹19,000' }
    ];

    return [
      '<div class="zph-kpi-grid">',
        kpiHtml('Gross Pharmaceutical Profit', '₹20.3L', '+21.4%', 'up', '34.8% gross margin', '💰'),
        kpiHtml('Net Contribution Margin', '₹14.5L', '24.8% Net', 'up', 'After ops & fulfillment', '💎'),
        kpiHtml('Vendor Volume Rebates', '+₹2.8L', '+15.2%', 'up', 'MSD, Zoetis, Boehringer', '🤝'),
        kpiHtml('Shrinkage & Breakage', '-₹32K', '0.28% of COGS', 'up', 'Industry benchmark < 0.5%', '📉'),
      '</div>',
      '<div class="zph-card">',
        '<div class="zph-card-head">',
          '<div><h3 class="zph-card-title">Category Margins & Procurement Cost Analysis</h3><p class="zph-card-sub">Sales realization, COGS, and vendor volume rebates</p></div>',
          '<span class="zph-pill success">Total COGS: ₹36,95,260</span>',
        '</div>',
        '<div class="zph-table-wrap">',
          '<table class="zph-table">',
            '<thead><tr><th>Therapeutic Category</th><th style="text-align:right;">Revenue</th><th style="text-align:right;">COGS</th><th style="text-align:right;">Gross Profit</th><th style="text-align:right;">Gross Margin</th><th style="text-align:right;">Vendor Rebates</th></tr></thead>',
            '<tbody>',
              marginData.map(function(row) {
                return '<tr>' +
                  '<td><b>' + esc(row.cat) + '</b></td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(row.rev) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#94a3b8;">' + esc(row.cogs) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(row.gp) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#38bdf8;font-weight:600;">' + esc(row.margin) + '</td>' +
                  '<td style="text-align:right;font-family:IBM Plex Mono,monospace;color:#a855f7;">' + esc(row.rebate) + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Helper Components ────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, sub, icon) {
    return [
      '<div class="zph-kpi">',
        '<div class="zph-kpi-top">',
          '<span class="zph-kpi-label">' + esc(label) + '</span>',
          '<span class="zph-kpi-icon">' + icon + '</span>',
        '</div>',
        '<div class="zph-kpi-val">' + esc(val) + '</div>',
        '<div class="zph-kpi-bottom">',
          '<span class="zph-delta ' + trend + '">' + esc(delta) + '</span>',
          '<span class="zph-subtext">' + esc(sub) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  function catRow(name, rev, margin, share, icon) {
    return [
      '<div style="padding:10px 12px;background:rgba(255,255,255,0.02);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">',
        '<span style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;"><span>' + icon + '</span> ' + esc(name) + '</span>',
        '<div style="text-align:right;">',
          '<div style="font-family:IBM Plex Mono,monospace;font-weight:700;">' + esc(rev) + '</div>',
          '<div style="font-size:11px;color:#94a3b8;">' + (margin ? 'Margin: <b style="color:#10b981;">' + esc(margin) + '</b> · ' : '') + esc(share) + '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function statBox(title, val, sub, col) {
    return [
      '<div style="padding:12px;background:rgba(0,0,0,0.25);border-radius:8px;">',
        '<span style="font-size:11px;color:#94a3b8;">' + esc(title) + '</span>',
        '<div style="font-size:17px;font-weight:700;margin-top:4px;color:' + col + ';">' + esc(val) + '</div>',
        '<div style="font-size:10px;color:#64748b;margin-top:2px;">' + esc(sub) + '</div>',
      '</div>'
    ].join('');
  }

  /* ── Interactive Actions & Modal Handlers ─────────────────────── */
  function attachListeners() {
    var closeBtn = document.getElementById('zph-close-btn');
    if (closeBtn) closeBtn.onclick = close;

    var verifyBtn = document.getElementById('zph-action-verify');
    if (verifyBtn) verifyBtn.onclick = function () { switchTab('prescriptions'); };

    var exportBtn = document.getElementById('zph-action-export');
    if (exportBtn) exportBtn.onclick = function () {
      toast('Pharmacy Ledger & Schedule H Register exported to CSV');
    };

    var addDrugBtn = document.getElementById('zph-btn-add-drug');
    if (addDrugBtn) addDrugBtn.onclick = showAddDrugModal;

    var tabs = root.querySelectorAll('.zph-tab');
    tabs.forEach(function (btn) {
      btn.onclick = function () {
        var tId = btn.getAttribute('data-tab');
        if (tId) switchTab(tId);
      };
    });
  }

  function open(tab) {
    // Coordinate with other dashboards so they cleanly close
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveOperationsDashboard && typeof window.ZenveOperationsDashboard.close === 'function') {
      try { window.ZenveOperationsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveProductsInventory && typeof window.ZenveProductsInventory.close === 'function') {
      try { window.ZenveProductsInventory.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveReportsDashboard && typeof window.ZenveReportsDashboard.close === 'function') {
      try { window.ZenveReportsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveAlertsDashboard && typeof window.ZenveAlertsDashboard.close === 'function') {
      try { window.ZenveAlertsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveFinanceDashboard && typeof window.ZenveFinanceDashboard.close === 'function') {
      try { window.ZenveFinanceDashboard.close(); } catch (e) {}
    }
    if (window.ZenveSettingsDashboard && typeof window.ZenveSettingsDashboard.close === 'function') {
      try { window.ZenveSettingsDashboard.close(); } catch (e) {}
    }
    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zph-root') el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zpid-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zfa-open');
    });

    // Dismiss any Radix placeholder dialog
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zph-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) btn.click();
      });
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.classList.add('zph-open');
    render();

    var targetHash = TABS.find(function (t) { return t.id === S.tab; })?.hash;
    if (targetHash && location.hash !== targetHash) {
      try { history.replaceState(null, '', targetHash); } catch (e) {}
    }
  }

  function close() {
    S.open = false;
    if (root) root.classList.remove('zph-open');
    if (TABS.some(function (t) { return t.hash === location.hash; })) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var t = TABS.find(function (it) { return it.id === tabId; });
    if (t && t.hash) {
      try { history.replaceState(null, '', t.hash); } catch (e) {}
    }
  }

  function verifyRx(rxId) {
    var rx = PRESCRIPTIONS.find(function (p) { return p.id === rxId; });
    if (rx) {
      rx.status = 'Verified & Ready';
      render();
      toast('Prescription ' + rxId + ' verified by Registered Pharmacist. Dispensing authorized!');
    }
  }

  function showAddDrugModal() {
    var modalHtml = [
      '<div class="zph-modal-backdrop" id="zph-drug-modal">',
        '<div class="zph-modal">',
          '<div class="zph-modal-head">',
            '<h3 style="margin:0;font-size:18px;font-weight:700;">Add Drug to Veterinary Formulary</h3>',
            '<button type="button" class="zph-btn" onclick="document.getElementById(\'zph-drug-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zph-add-drug-form" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px;">',
            '<div style="grid-column:span 2;"><label style="display:block;color:#94a3b8;margin-bottom:4px;">Commercial Brand Name</label><input required class="zph-input" style="width:100%;" id="drug-name" placeholder="e.g. Apoquel 16mg Chewable" /></div>',
            '<div style="grid-column:span 2;"><label style="display:block;color:#94a3b8;margin-bottom:4px;">Generic Active Salt (API)</label><input required class="zph-input" style="width:100%;" id="drug-salt" placeholder="e.g. Oclacitinib Maleate 16mg" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Manufacturer / Brand</label><input required class="zph-input" style="width:100%;" id="drug-brand" placeholder="e.g. Zoetis India" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Therapeutic Category</label><select class="zph-select" style="width:100%;" id="drug-cat"><option>Antiparasitic</option><option>Antibiotics</option><option>Cardiac & Renal</option><option>Dermatology</option><option>Vaccines</option><option>Supplements</option></select></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Schedule Classification</label><select class="zph-select" style="width:100%;" id="drug-sch"><option>Schedule H</option><option>OTC</option><option>Schedule X</option></select></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Storage Mode</label><select class="zph-select" style="width:100%;" id="drug-cold"><option value="false">Ambient (Room Temp)</option><option value="true">Cold Chain (2°C–8°C)</option></select></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Cost Price (₹ PTR)</label><input type="number" required class="zph-input" style="width:100%;" id="drug-ptr" placeholder="1200" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Retail MRP (₹)</label><input type="number" required class="zph-input" style="width:100%;" id="drug-mrp" placeholder="1850" /></div>',
            '<div style="grid-column:span 2;display:flex;justify-content:flex-end;gap:8px;margin-top:14px;">',
              '<button type="button" class="zph-btn" onclick="document.getElementById(\'zph-drug-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zph-btn primary">Save Medicine</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zph-add-drug-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('drug-name').value;
        var generic = document.getElementById('drug-salt').value;
        var brand = document.getElementById('drug-brand').value;
        var cat = document.getElementById('drug-cat').value;
        var sch = document.getElementById('drug-sch').value;
        var cold = document.getElementById('drug-cold').value === 'true';
        var ptr = Number(document.getElementById('drug-ptr').value) || 1000;
        var mrp = Number(document.getElementById('drug-mrp').value) || 1500;

        MEDICINES.unshift({
          sku: 'DRG-VET-0' + (MEDICINES.length + 1),
          name: name,
          generic: generic,
          brand: brand,
          form: 'Tablets',
          category: cat,
          schedule: sch,
          cold: cold,
          mrp: mrp,
          ptr: ptr,
          stock: 50,
          rop: 20,
          zone: cold ? 'Cold Chiller' : 'Ambient Rack'
        });

        document.getElementById('zph-drug-modal').remove();
        render();
        toast('New medicine ' + name + ' added to formulary!');
      };
    }
  }

  function showInwardModal() {
    var modalHtml = [
      '<div class="zph-modal-backdrop" id="zph-inward-modal">',
        '<div class="zph-modal">',
          '<div class="zph-modal-head">',
            '<h3 style="margin:0;font-size:18px;font-weight:700;">Inward Batch to Quarantine Bay (GRN)</h3>',
            '<button type="button" class="zph-btn" onclick="document.getElementById(\'zph-inward-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zph-inward-form" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px;">',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Manufacturer Batch No</label><input required class="zph-input" style="width:100%;" id="batch-code" placeholder="e.g. BT-2026-APQ01" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Medicine SKU</label><select class="zph-select" style="width:100%;" id="batch-sku">' +
              MEDICINES.map(function (m) { return '<option value="' + esc(m.sku) + '">' + esc(m.name) + '</option>'; }).join('') +
            '</select></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Manufacturing Date</label><input type="date" required class="zph-input" style="width:100%;" id="batch-mfg" value="2025-06-01" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Expiry Date</label><input type="date" required class="zph-input" style="width:100%;" id="batch-exp" value="2027-05-31" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Inward Quantity</label><input type="number" required class="zph-input" style="width:100%;" id="batch-qty" value="100" /></div>',
            '<div><label style="display:block;color:#94a3b8;margin-bottom:4px;">Receiving Hub</label><select class="zph-select" style="width:100%;" id="batch-hub"><option>Bengaluru Central</option><option>Mumbai West</option><option>Delhi NCR Hub</option></select></div>',
            '<div style="grid-column:span 2;display:flex;justify-content:flex-end;gap:8px;margin-top:14px;">',
              '<button type="button" class="zph-btn" onclick="document.getElementById(\'zph-inward-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zph-btn primary">Record Batch GRN</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zph-inward-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var code = document.getElementById('batch-code').value;
        var sku = document.getElementById('batch-sku').value;
        var med = MEDICINES.find(function (m) { return m.sku === sku; });
        var mfg = document.getElementById('batch-mfg').value;
        var exp = document.getElementById('batch-exp').value;
        var qty = Number(document.getElementById('batch-qty').value) || 100;
        var hub = document.getElementById('batch-hub').value;

        BATCHES.unshift({
          batchNo: code,
          sku: sku,
          name: med ? med.name : 'Veterinary Drug',
          vendor: med ? med.brand : 'Vendor',
          mfg: mfg,
          exp: exp,
          qty: qty,
          balance: qty,
          hub: hub,
          qc: 'QC Passed',
          zone: 'Inward Bay 1'
        });

        document.getElementById('zph-inward-modal').remove();
        render();
        toast('Batch ' + code + ' inwarded into ' + hub + ' inventory!');
      };
    }
  }

  /* ── Hash-change listener ─────────────────────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      if (!S.open) open(tab);
      else switchTab(tab);
    } else if (S.open) {
      close();
    }
  });

  /* ── Check initial hash on load ───────────────────────────────── */
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    var go = function () { setTimeout(function () { open(initialTab); }, 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go);
  }

  /* ── Global Click Interception & Wire Sidebar ─────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group toggles or search bar
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        if (!t.closest('#zph-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }

    if (S.open) {
      if (t.closest('#zph-root')) return;
      var b = t.closest('.sidebar-scope button, .sidebar-scope a, nav button, nav a, aside button, aside a');
      if (!b) return;
      if (b.getAttribute('aria-label') === 'Search menu') return;
      if (b.getAttribute('aria-expanded') !== null) return;
      if (b.textContent && tabFromText(b.textContent.trim())) return;

      close();
    }
  }, true);

  document.addEventListener('pointerdown', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('.sidebar-scope button, .sidebar-scope a, nav button, nav a, aside button, aside a');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        e.stopPropagation();
      }
    }
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      close();
    }
  });

  function wireSidebar() {
    document.querySelectorAll(
      '.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a, ' +
      '[data-sidebar] button, [data-sidebar] a, nav button, nav a, aside button, aside a'
    ).forEach(function (btn) {
      if (btn._zphWired) return;
      btn._zphWired = true;
      btn.addEventListener('click', function (e) {
        var tab = tabFromText(btn.textContent ? btn.textContent.trim() : '');
        if (tab) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }, true);
    });
    setTimeout(wireSidebar, 1500);
  }

  /* ── Public API ───────────────────────────────────────────────── */
  window.ZenvePharmacyDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    verifyRx: verifyRx,
    showAddDrugModal: showAddDrugModal,
    showInwardModal: showInwardModal
  };

  /* ── Boot ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); wireSidebar(); });
  } else {
    build();
    wireSidebar();
  }

})();
