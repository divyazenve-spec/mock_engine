/* =====================================================================
   Zenve BI — Products & Inventory Control Center
   Subcategory Dashboards:
     - Product Catalog        (#product-catalog)
     - SKU Management         (#sku-management)
     - Inventory Dashboard    (#inventory-dashboard)
     - Stock Management       (#stock-management)
     - Low Stock              (#low-stock)
     - Out of Stock           (#out-of-stock)
     - Expiry Management      (#expiry-management)
     - Warehouse Management   (#warehouse-management)
   Self-contained, offline-fallback, data-driven dashboard suite.
   ===================================================================== */
(function () {
  'use strict';

  var FALLBACK = '/api/v1/data';
  var STATIC_FALLBACK = '/assets/sample-fallback.json';

  /* ── Currency Helpers ─────────────────────────────────────────── */
  function inrShort(n) {
    n = Number(n) || 0;
    if (n === 0) return '₹0';
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(1) + ' L';
    if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + n.toLocaleString('en-IN');
  }

  function inr(n) {
    n = Number(n) || 0;
    return '₹' + n.toLocaleString('en-IN');
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Tabs Definition ──────────────────────────────────────────── */
  var TABS = [
    { id: 'catalog',    label: 'Product Catalog',    icon: '🛍️', hash: '#product-catalog',     badge: '' },
    { id: 'sku',        label: 'SKU Management',     icon: '🏷️', hash: '#sku-management',       badge: '' },
    { id: 'inventory',  label: 'Inventory Dashboard',icon: '📦', hash: '#inventory-dashboard',   badge: '' },
    { id: 'stock',      label: 'Stock Management',   icon: '🏗️', hash: '#stock-management',     badge: '' },
    { id: 'lowstock',   label: 'Low Stock',          icon: '⚠️', hash: '#low-stock',            badge: '' },
    { id: 'outofstock', label: 'Out of Stock',       icon: '🚫', hash: '#out-of-stock',         badge: '' },
    { id: 'expiry',     label: 'Expiry Management',  icon: '⏳', hash: '#expiry-management',    badge: '' },
    { id: 'warehouse',  label: 'Warehouse Management',icon: '🏭', hash: '#warehouse-management', badge: '' },
    { id: 'transfers',  label: 'Stock Transfers',    icon: '🔁', hash: '#stock-transfers',      badge: '' },
    { id: 'valuation',  label: 'Inventory Valuation',icon: '💎', hash: '#inventory-valuation',  badge: '' },
    { id: 'movement',   label: 'Inventory Movement', icon: '📈', hash: '#inventory-movement',   badge: '' }
  ];

  /* ── Master Product Dataset ───────────────────────────────────── */
  var PRODUCTS = [
    {
      sku: 'ZV-MED-001',
      name: 'Bravecto Flea & Tick Chewable (20-40kg)',
      cat: 'Pharmacy & Meds',
      subcat: 'Parasiticides & Deworming',
      brand: 'MSD Animal Health',
      price: 2450,
      cost: 1650,
      mrp: 2750,
      stock: 185,
      reorder: 40,
      warehouse: 'Bengaluru Hub',
      vendor: 'MSD India Pvt Ltd',
      moq: 20,
      batches: 3,
      weight: '0.15 kg',
      active: true,
      cold: false,
      rx: false,
      expiry: '2027-08-15',
      batch: 'BAT-BRV-8821'
    },
    {
      sku: 'ZV-MED-002',
      name: 'NexGard Spectra Monthly Chewable (7.5-15kg)',
      cat: 'Pharmacy & Meds',
      subcat: 'Endectocides',
      brand: 'Boehringer Ingelheim',
      price: 2980,
      cost: 2050,
      mrp: 3300,
      stock: 32,
      reorder: 50,
      warehouse: 'Mumbai Hub',
      vendor: 'Boehringer Ingelheim India',
      moq: 25,
      batches: 2,
      weight: '0.12 kg',
      active: true,
      cold: false,
      rx: false,
      expiry: '2027-04-20',
      batch: 'BAT-NXG-4419'
    },
    {
      sku: 'ZV-NUT-003',
      name: 'Royal Canin Veterinary Diet Hepatic (2kg)',
      cat: 'Clinical Nutrition',
      subcat: 'Prescription Diets',
      brand: 'Royal Canin',
      price: 2950,
      cost: 2100,
      mrp: 3200,
      stock: 140,
      reorder: 35,
      warehouse: 'Delhi Hub',
      vendor: 'Mars Petcare India',
      moq: 15,
      batches: 4,
      weight: '2.0 kg',
      active: true,
      cold: false,
      rx: true,
      expiry: '2027-09-30',
      batch: 'BAT-RCH-9011'
    },
    {
      sku: 'ZV-NUT-004',
      name: "Hill's Prescription Diet j/d Joint Care (3.8kg)",
      cat: 'Clinical Nutrition',
      subcat: 'Orthopedic Care',
      brand: "Hill's Pet Nutrition",
      price: 4200,
      cost: 2950,
      mrp: 4650,
      stock: 0,
      reorder: 25,
      warehouse: 'Bengaluru Hub',
      vendor: 'Colgate-Palmolive Pet',
      moq: 10,
      batches: 0,
      weight: '3.8 kg',
      active: true,
      cold: false,
      rx: true,
      expiry: null,
      batch: 'BAT-HLD-1020'
    },
    {
      sku: 'ZV-VAC-005',
      name: 'Nobivac DHPPi + L Canine Core Vaccine Kit',
      cat: 'Vaccines',
      subcat: 'Canine Biologicals',
      brand: 'Intervet / MSD',
      price: 1850,
      cost: 1220,
      mrp: 2100,
      stock: 12,
      reorder: 30,
      warehouse: 'Pune Hub',
      vendor: 'Zenve Cold-Chain Supply',
      moq: 50,
      batches: 2,
      weight: '0.05 kg',
      active: true,
      cold: true,
      rx: true,
      expiry: '2026-11-08',
      batch: 'BAT-NBV-7712'
    },
    {
      sku: 'ZV-VAC-006',
      name: 'Felocell 4 Feline Core Vaccine (Pack of 10)',
      cat: 'Vaccines',
      subcat: 'Feline Biologicals',
      brand: 'Zoetis Healthcare',
      price: 4800,
      cost: 3300,
      mrp: 5400,
      stock: 65,
      reorder: 20,
      warehouse: 'Bengaluru Hub',
      vendor: 'Zoetis India',
      moq: 20,
      batches: 2,
      weight: '0.1 kg',
      active: true,
      cold: true,
      rx: true,
      expiry: '2026-11-28',
      batch: 'BAT-ZFL-5503'
    },
    {
      sku: 'ZV-SUP-007',
      name: 'Synoquin EFA Joint Support Supplement (120 Tabs)',
      cat: 'Supplements',
      subcat: 'Chondroprotective',
      brand: 'VetPlus UK',
      price: 3400,
      cost: 2350,
      mrp: 3850,
      stock: 88,
      reorder: 25,
      warehouse: 'Hyderabad Hub',
      vendor: 'Zenve Global Imports',
      moq: 15,
      batches: 3,
      weight: '0.25 kg',
      active: true,
      cold: false,
      rx: false,
      expiry: '2027-12-10',
      batch: 'BAT-SYN-3390'
    },
    {
      sku: 'ZV-DEN-008',
      name: 'ProDen PlaqueOff Animal Powder (60g)',
      cat: 'Pharmacy & Meds',
      subcat: 'Oral Hygiene',
      brand: 'Swedencare',
      price: 1890,
      cost: 1280,
      mrp: 2150,
      stock: 110,
      reorder: 30,
      warehouse: 'Mumbai Hub',
      vendor: 'Swedencare Direct',
      moq: 30,
      batches: 3,
      weight: '0.08 kg',
      active: true,
      cold: false,
      rx: false,
      expiry: '2028-02-15',
      batch: 'BAT-PQF-8812'
    },
    {
      sku: 'ZV-DERM-009',
      name: 'Douxo S3 PYO Antiseptic Chlorhexidine Mousse',
      cat: 'Dermatology',
      subcat: 'Topical Therapeutics',
      brand: 'Ceva Sante Animale',
      price: 2150,
      cost: 1450,
      mrp: 2400,
      stock: 0,
      reorder: 20,
      warehouse: 'Delhi Hub',
      vendor: 'Ceva Polchem India',
      moq: 25,
      batches: 0,
      weight: '0.2 kg',
      active: true,
      cold: false,
      rx: false,
      expiry: null,
      batch: 'BAT-DXS-6620'
    },
    {
      sku: 'ZV-WEL-010',
      name: 'Zenve Calming Hemp Chews with L-Theanine',
      cat: 'Supplements',
      subcat: 'Behavioral Wellness',
      brand: 'Zenve Naturals',
      price: 1450,
      cost: 890,
      mrp: 1690,
      stock: 215,
      reorder: 50,
      warehouse: 'Bengaluru Hub',
      vendor: 'Zenve Formulations Lab',
      moq: 40,
      batches: 4,
      weight: '0.3 kg',
      active: true,
      cold: false,
      rx: false,
      expiry: '2027-06-25',
      batch: 'BAT-ZCH-1198'
    }
  ];

  /* ── Warehouse Data ───────────────────────────────────────────── */
  var WAREHOUSES = [
    {
      id: 'W-BLR-01',
      name: 'Zenve Mega Fulfillment Hub',
      city: 'Whitefield, Bengaluru',
      capacity: 78,
      skus: 10,
      value: 3420000,
      staff: 28,
      health: 96,
      zones: ['Cold-Chain Vault (-20°C to 4°C)', 'Prescription High-Security Bay', 'Ambient Fast-Pick Racks', 'Doorstep Express Staging'],
      manager: 'Anand Kulkarni'
    },
    {
      id: 'W-BOM-02',
      name: 'Western Regional Distribution Center',
      city: 'Bhiwandi, Mumbai',
      capacity: 84,
      skus: 9,
      value: 2850000,
      staff: 22,
      health: 94,
      zones: ['Temperature Controlled Pharma Bay', 'Bulk Pallet Mezzanine', 'Same-Day Dispatch Sorter'],
      manager: 'Sunil Rao'
    },
    {
      id: 'W-DEL-03',
      name: 'Northern Capital Hub',
      city: 'Okhla Phase III, Delhi',
      capacity: 91,
      skus: 8,
      value: 2480000,
      staff: 20,
      health: 89,
      zones: ['Dry Medical Store', 'Vaccine Thermocool Lockers', 'Air Express Outbound Bay'],
      manager: 'Harpreet Chawla'
    },
    {
      id: 'W-HYD-04',
      name: 'Deccan Regional Dark Store',
      city: 'Gachibowli, Hyderabad',
      capacity: 64,
      skus: 8,
      value: 1650000,
      staff: 16,
      health: 97,
      zones: ['Surgical Consumables Bay', 'E-Commerce Rapid Pick Zone'],
      manager: 'Kiranmai Reddy'
    },
    {
      id: 'W-PUN-05',
      name: 'Western Specialized Hub',
      city: 'Chakan Industrial Area, Pune',
      capacity: 58,
      skus: 7,
      value: 1220000,
      staff: 14,
      health: 95,
      zones: ['Raw Material Quarantine', 'Active Batch Staging Area'],
      manager: 'Nitin Deshpande'
    }
  ];

  /* ── ABC Management Dataset ───────────────────────────────────── */
  var ABC_DATA = [
    { sku: 'ZV-MED-001', name: 'Bravecto Chewable (20-40kg)', class: 'A', shareRev: '24.2%', turnover: '8.4x', policy: 'Daily Cycle Count' },
    { sku: 'ZV-NUT-003', name: 'Royal Canin Hepatic (2kg)', class: 'A', shareRev: '19.8%', turnover: '7.1x', policy: 'Daily Cycle Count' },
    { sku: 'ZV-MED-002', name: 'NexGard Spectra (7.5-15kg)', class: 'A', shareRev: '16.5%', turnover: '6.8x', policy: 'Daily Cycle Count' },
    { sku: 'ZV-VAC-006', name: 'Felocell 4 Vaccine (10pk)', class: 'B', shareRev: '11.4%', turnover: '4.6x', policy: 'Weekly Audit' },
    { sku: 'ZV-SUP-007', name: 'Synoquin EFA Tabs (120s)', class: 'B', shareRev: '9.2%', turnover: '4.2x', policy: 'Weekly Audit' },
    { sku: 'ZV-VAC-005', name: 'Nobivac DHPPi Vaccine Kit', class: 'B', shareRev: '7.8%', turnover: '3.9x', policy: 'Weekly Audit' },
    { sku: 'ZV-DEN-008', name: 'ProDen PlaqueOff Powder', class: 'C', shareRev: '4.5%', turnover: '2.8x', policy: 'Monthly Reconcile' },
    { sku: 'ZV-WEL-010', name: 'Zenve Calming Hemp Chews', class: 'C', shareRev: '3.6%', turnover: '2.5x', policy: 'Monthly Reconcile' },
    { sku: 'ZV-NUT-004', name: "Hill's Diet j/d Joint Care", class: 'C', shareRev: '1.8%', turnover: '0.0x', policy: 'Stockout Priority PO' },
    { sku: 'ZV-DERM-009', name: 'Douxo S3 PYO Mousse', class: 'C', shareRev: '1.2%', turnover: '0.0x', policy: 'Stockout Priority PO' }
  ];

  /* ── Valuation Dataset ────────────────────────────────────────── */
  var VALUATION_CATS = [
    { name: 'Pharmacy & Therapeutics', costVal: 4280000, margin: '36.8% GM', share: 37, color: '#8b5cf6' },
    { name: 'Clinical & Prescription Nutrition', costVal: 2850000, margin: '29.5% GM', share: 25, color: '#3b82f6' },
    { name: 'Biologicals & Vaccines', costVal: 2240000, margin: '34.2% GM', share: 19, color: '#06b6d4' },
    { name: 'Surgical & Diagnostics', costVal: 1260000, margin: '44.8% GM', share: 11, color: '#10b981' },
    { name: 'Supplements & Wellness', costVal: 920000, margin: '41.0% GM', share: 8, color: '#f59e0b' }
  ];

  /* ── Stock Transfers Dataset ──────────────────────────────────── */
  var TRANSFERS = [
    {
      id: 'TRF-2026-0891',
      origin: 'Bengaluru Hub',
      dest: 'Delhi Hub',
      skus: 'Bravecto 20-40kg (40 units) + NexGard (25 units)',
      value: 148500,
      carrier: 'Zenve Express Fleet (EV-04)',
      status: 'In Transit',
      temp: 'Ambient (21.4°C)',
      eta: 'Today, 7:30 PM',
      cold: false
    },
    {
      id: 'TRF-2026-0892',
      origin: 'Bengaluru Hub',
      dest: 'Mumbai Hub',
      skus: 'Nobivac DHPPi Vaccines (50 kits)',
      value: 92500,
      carrier: 'BlueDart Healthcare Priority',
      status: 'In Transit',
      temp: '3.8°C (Verified Cold Chain)',
      eta: 'Tomorrow, 9:00 AM',
      cold: true
    },
    {
      id: 'TRF-2026-0893',
      origin: 'Mumbai Hub',
      dest: 'Pune Hub',
      skus: 'ProDen PlaqueOff Oral Powder (30 units)',
      value: 56700,
      carrier: 'Zenve Inter-City Van',
      status: 'Received',
      temp: 'Ambient',
      eta: 'Delivered (11:45 AM)',
      cold: false
    },
    {
      id: 'TRF-2026-0894',
      origin: 'Delhi Hub',
      dest: 'Hyderabad Hub',
      skus: 'Royal Canin Hepatic Diet (20 bags)',
      value: 59000,
      carrier: 'Delhivery Surface Express',
      status: 'Pending Dispatch',
      temp: 'Ambient',
      eta: 'Scheduled Tomorrow 6:00 AM',
      cold: false
    },
    {
      id: 'TRF-2026-0895',
      origin: 'Bengaluru Hub',
      dest: 'Hyderabad Hub',
      skus: 'Felocell 4 Feline Vaccine (20 vials)',
      value: 96000,
      carrier: 'Zenve EV Cold Linehaul',
      status: 'In Transit',
      temp: '4.2°C (Cold-Chain Verified)',
      eta: 'Today, 11:15 PM',
      cold: true
    }
  ];

  /* ── Inventory Movements Dataset ──────────────────────────────── */
  var MOVEMENTS = [
    {
      id: 'MOV-8841',
      time: '18 mins ago',
      type: 'Inbound Supplier GRN',
      sku: 'ZV-MED-001',
      name: 'Bravecto Chewable Tablet (20-40kg)',
      qty: 60,
      source: 'MSD Animal Health',
      dest: 'BLR Hub (Bay 2)',
      ref: 'GRN-9412',
      value: 99000,
      badge: 'inbound'
    },
    {
      id: 'MOV-8840',
      time: '42 mins ago',
      type: 'Outbound Customer Order',
      sku: 'ZV-NUT-003',
      name: 'Royal Canin Hepatic Diet (2kg)',
      qty: -2,
      source: 'DEL Hub (Shelf A4)',
      dest: 'Order ORD-9021 (Ananya D.)',
      ref: 'DISP-7712',
      value: 5900,
      badge: 'outbound'
    },
    {
      id: 'MOV-8839',
      time: '1.2 hrs ago',
      type: 'Inter-Hub Stock Transfer',
      sku: 'ZV-VAC-005',
      name: 'Nobivac DHPPi Vaccine Kit',
      qty: -25,
      source: 'BLR Cold Vault',
      dest: 'BOM Hub (Cold Staging)',
      ref: 'TRF-0892',
      value: 46250,
      badge: 'transfer'
    },
    {
      id: 'MOV-8838',
      time: '2.1 hrs ago',
      type: 'Inbound Supplier GRN',
      sku: 'ZV-DEN-008',
      name: 'ProDen PlaqueOff Oral Care',
      qty: 45,
      source: 'Swedencare Logistics',
      dest: 'BOM Hub (Aisle 3)',
      ref: 'GRN-9408',
      value: 57600,
      badge: 'inbound'
    },
    {
      id: 'MOV-8837',
      time: '2.8 hrs ago',
      type: 'Outbound Express Dispatch',
      sku: 'ZV-WEL-010',
      name: 'Zenve Calming Hemp Chews',
      qty: -4,
      source: 'BLR Dark Store',
      dest: 'Express Dispatch ORD-9015',
      ref: 'EXP-4401',
      value: 5800,
      badge: 'outbound'
    },
    {
      id: 'MOV-8836',
      time: '3.5 hrs ago',
      type: 'Adjustment Damage Return',
      sku: 'ZV-MED-002',
      name: 'NexGard Spectra Monthly Chews',
      qty: -1,
      source: 'BOM Hub Quarantine',
      dest: 'Vendor Rupture Return',
      ref: 'QC-ADJ-102',
      value: 2050,
      badge: 'return'
    },
    {
      id: 'MOV-8835',
      time: '4.2 hrs ago',
      type: 'Inbound Import Batch',
      sku: 'ZV-SUP-007',
      name: 'Synoquin EFA Joint Tabs (120s)',
      qty: 35,
      source: 'VetPlus UK Import',
      dest: 'HYD Hub (Medical Racks)',
      ref: 'GRN-9399',
      value: 82250,
      badge: 'inbound'
    },
    {
      id: 'MOV-8834',
      time: '5.1 hrs ago',
      type: 'Outbound Clinic Order',
      sku: 'ZV-MED-002',
      name: 'NexGard Spectra Monthly Chews',
      qty: -3,
      source: 'BOM Hub (Shelf B1)',
      dest: 'Order ORD-9018 (Meera N.)',
      ref: 'DISP-7690',
      value: 8940,
      badge: 'outbound'
    },
    {
      id: 'MOV-8833',
      time: '5.8 hrs ago',
      type: 'Transfer Receipt Inflow',
      sku: 'ZV-DEN-008',
      name: 'ProDen PlaqueOff Animal Powder',
      qty: 30,
      source: 'Transfer from BOM Hub',
      dest: 'PUN Hub (Shelf C2)',
      ref: 'TRF-0893',
      value: 38400,
      badge: 'transfer'
    },
    {
      id: 'MOV-8832',
      time: '6.4 hrs ago',
      type: 'Clinical Sample Outbound',
      sku: 'ZV-NUT-004',
      name: "Hill's Prescription Diet j/d",
      qty: -1,
      source: 'BLR Hub Staging',
      dest: 'Clinical Trial Sample',
      ref: 'ADJ-3309',
      value: 2950,
      badge: 'adjustment'
    }
  ];

  /* ── Global State ─────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'catalog',
    period: 'today',
    catFilter: 'All',
    warehouseFilter: 'All',
    abcFilter: 'ALL',
    movementFilter: 'ALL',
    valuationMethod: 'FIFO',
    transferStatusFilter: 'ALL',
    searchQuery: '',
    toastTimeout: null
  };

  var root = null;

  /* ── Utility: Tab from text/hash ──────────────────────────────── */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    if (s.indexOf('product catalog') >= 0 || s === 'catalog' || s === 'products') return 'catalog';
    if (s.indexOf('sku management') >= 0 || s === 'sku') return 'sku';
    if (s.indexOf('inventory movement') >= 0 || s === 'movement') return 'movement';
    if (s.indexOf('inventory dashboard') >= 0 || s === 'inventory dashboard') return 'inventory';
    if (s.indexOf('stock management') >= 0 || s === 'stock management') return 'stock';
    if (s.indexOf('low stock') >= 0 || s === 'low stock') return 'lowstock';
    if (s.indexOf('out of stock') >= 0 || s === 'out of stock') return 'outofstock';
    if (s.indexOf('expiry management') >= 0 || s === 'expiry management' || s === 'expiry') return 'expiry';
    if (s.indexOf('warehouse management') >= 0 || s === 'warehouse management' || s === 'warehouse') return 'warehouse';
    if (s.indexOf('inventory valuation') >= 0 || s === 'valuation') return 'valuation';
    if (s.indexOf('stock transfer') >= 0 || s.indexOf('stock transfers') >= 0 || s === 'transfers') return 'transfers';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    if (hash === '#product-catalog' || hash === '#catalog') return 'catalog';
    if (hash === '#sku-management' || hash === '#sku') return 'sku';
    if (hash === '#inventory-dashboard' || hash === '#inventory') return 'inventory';
    if (hash === '#inventory-movement' || hash === '#movement') return 'movement';
    if (hash === '#stock-management' || hash === '#stock') return 'stock';
    if (hash === '#low-stock' || hash === '#lowstock') return 'lowstock';
    if (hash === '#out-of-stock' || hash === '#outofstock') return 'outofstock';
    if (hash === '#expiry-management' || hash === '#expiry') return 'expiry';
    if (hash === '#warehouse-management' || hash === '#warehouse') return 'warehouse';
    if (hash === '#inventory-valuation' || hash === '#valuation') return 'valuation';
    if (hash === '#stock-transfers' || hash === '#stock-transfer' || hash === '#transfers') return 'transfers';
    return null;
  }

  function hashFromTab(tab) {
    var t = TABS.find(function (it) { return it.id === tab; });
    return t ? t.hash : '#inventory-dashboard';
  }

  /* ── Toast ────────────────────────────────────────────────────── */
  function showToast(msg) {
    var existing = document.getElementById('zpid-toast');
    if (existing) existing.remove();
    if (S.toastTimeout) clearTimeout(S.toastTimeout);
    var toast = document.createElement('div');
    toast.id = 'zpid-toast';
    toast.className = 'zpid-toast';
    toast.innerHTML = '<span style="font-size:16px;">✓</span> <span>' + esc(msg) + '</span>';
    document.body.appendChild(toast);
    S.toastTimeout = setTimeout(function () { if (toast && toast.parentNode) toast.remove(); }, 3200);
  }

  /* ── CSV Export ───────────────────────────────────────────────── */
  function exportCsv() {
    var data = getFilteredProducts();
    var headers = ['SKU', 'Product Name', 'Category', 'Brand', 'Price (INR)', 'Stock Qty', 'Reorder Level', 'Warehouse', 'Status'];
    var lines = [headers.join(',')];
    data.forEach(function (p) {
      lines.push([
        p.sku,
        '"' + p.name.replace(/"/g, '""') + '"',
        p.cat,
        p.brand,
        p.price,
        p.stock,
        p.reorder,
        p.warehouse,
        stockStatus(p)
      ].join(','));
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'zenve_inventory_' + S.tab + '_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported ' + data.length + ' products to CSV');
  }

  /* ── Data Helpers ─────────────────────────────────────────────── */
  function stockStatus(p) {
    if (p.stock === 0) return 'Out of Stock';
    if (p.stock <= p.reorder * 0.4) return 'Critical Low';
    if (p.stock <= p.reorder) return 'Low Stock';
    return 'Healthy';
  }

  function stockPct(p) {
    var max = Math.max(p.reorder * 3, p.stock + 10);
    return Math.min(100, Math.round((p.stock / max) * 100));
  }

  function stockColor(p) {
    var s = stockStatus(p);
    if (s === 'Out of Stock') return '#64748b';
    if (s === 'Critical Low') return '#ef4444';
    if (s === 'Low Stock') return '#f59e0b';
    return '#10b981';
  }

  function statusClass(p) {
    var s = stockStatus(p);
    if (s === 'Out of Stock') return 'out';
    if (s === 'Critical Low') return 'critical';
    if (s === 'Low Stock') return 'low';
    return 'healthy';
  }

  function daysUntilExpiry(dateStr) {
    if (!dateStr) return Infinity;
    var exp = new Date(dateStr);
    var now = new Date();
    return Math.round((exp - now) / 86400000);
  }

  function expiryColor(days) {
    if (days < 0) return '#ef4444';
    if (days <= 30) return '#ef4444';
    if (days <= 60) return '#f59e0b';
    return '#10b981';
  }

  function getFilteredProducts() {
    var q = (S.searchQuery || '').toLowerCase().trim();
    return PRODUCTS.filter(function (p) {
      if (S.catFilter !== 'All' && p.cat !== S.catFilter) return false;
      if (S.warehouseFilter !== 'All' && p.warehouse !== S.warehouseFilter + ' Hub') return false;
      if (q) {
        var str = (p.sku + ' ' + p.name + ' ' + p.cat + ' ' + p.brand + ' ' + p.warehouse).toLowerCase();
        if (str.indexOf(q) < 0) return false;
      }
      return true;
    });
  }

  /* ── KPI Helper ───────────────────────────────────────────────── */
  function kpi(label, value, delta, trend, icon) {
    return [
      '<div class="zpid-kpi">',
        '<div class="zpid-kpi-top">',
          '<span class="zpid-kpi-label">' + esc(label) + '</span>',
          icon ? '<span class="zpid-kpi-icon">' + icon + '</span>' : '',
        '</div>',
        '<div class="zpid-kpi-value">' + esc(String(value)) + '</div>',
        '<div class="zpid-kpi-delta ' + esc(trend) + '">' + esc(delta) + '</div>',
      '</div>'
    ].join('');
  }

  /* ── Stock Bar ────────────────────────────────────────────────── */
  function stockBar(p) {
    var pct = stockPct(p);
    var col = stockColor(p);
    return '<div class="zpid-stock-bar-wrap"><div class="zpid-stock-bar-bg"><div class="zpid-stock-bar-fill" style="width:' + pct + '%;background:' + col + '"></div></div><span style="font-size:11px;font-family:\'IBM Plex Mono\',monospace;color:' + col + '">' + p.stock + '</span></div>';
  }

  /* ── Switch / Open / Close ────────────────────────────────────── */
  function switchTab(newTab) {
    if (!newTab) return;
    S.tab = newTab;
    var targetHash = hashFromTab(newTab);
    try {
      if (location.hash !== targetHash) history.pushState(null, '', targetHash);
    } catch (e) {}
    markSidebar(true, newTab);
    renderAll();
  }

  function markSidebar(on, tab) {
    var targetTab = tab || S.tab || 'catalog';
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a, [data-sidebar] button, [data-sidebar] a').forEach(function (b) {
      var bTab = tabFromText(b.textContent ? b.textContent.trim() : '');
      if (bTab) {
        b.classList.toggle('zpid-active', on && bTab === targetTab);
      }
    });
  }

  function open(tab) {
    /* Close any other open panels */
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveOperationsDashboard && typeof window.ZenveOperationsDashboard.close === 'function') {
      try { window.ZenveOperationsDashboard.close(); } catch (e) {}
    }
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zpid-root') {
        el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open');
      }
    });

    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zpid-root')) return;
        try { d.remove(); } catch (err) {}
      });
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
      document.body.removeAttribute('data-scroll-locked');
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = tabFromHash(location.hash) || 'catalog';
    }

    if (!root) build();
    else if (!document.body.contains(root)) document.body.appendChild(root);

    S.open = true;
    try {
      root.style.removeProperty('display');
      root.style.display = 'block';
    } catch (e) {}
    root.classList.add('zpid-open');
    root.scrollTop = 0;

    var targetHash = hashFromTab(S.tab);
    try {
      if (location.hash !== targetHash) history.pushState(null, '', targetHash);
    } catch (e) {}

    setTimeout(function () { markSidebar(true, S.tab); }, 0);
    renderAll();
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zpid-open');
    try {
      root.style.display = 'none';
    } catch (e) {}
    markSidebar(false);
    try {
      var h = location.hash;
      if (h.indexOf('product') >= 0 || h.indexOf('sku') >= 0 || h.indexOf('inventory') >= 0 || h.indexOf('stock') >= 0 || h.indexOf('expiry') >= 0 || h.indexOf('warehouse') >= 0 || h.indexOf('transfers') >= 0 || h.indexOf('valuation') >= 0 || h.indexOf('movement') >= 0) {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) {}
  }

  /* ── Build DOM Shell ──────────────────────────────────────────── */
  function build() {
    if (root && document.body.contains(root)) return;
    root = document.createElement('div');
    root.id = 'zpid-root';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', 'Products and Inventory Control Center');

    root.innerHTML = [
      '<div class="zpid-head">',
        '<div class="zpid-head-left">',
          '<div class="zpid-title-row">',
            '<h2 class="zpid-title" id="zpid-title">Products &amp; Inventory</h2>',
            '<span class="zpid-live-badge"><span class="zpid-pulse-dot"></span>Stock Live</span>',
          '</div>',
          '<div class="zpid-sub" id="zpid-sub">Full-suite catalog, SKU, stock, expiry &amp; warehouse management</div>',
        '</div>',
        '<div class="zpid-head-actions">',
          '<div class="zpid-seg" id="zpid-presets">',
            '<button data-p="today" class="on" type="button">Today</button>',
            '<button data-p="7d" type="button">7D</button>',
            '<button data-p="30d" type="button">30D</button>',
            '<button data-p="all" type="button">All</button>',
          '</div>',
          '<button class="zpid-btn" id="zpid-refresh" type="button">↻ Refresh</button>',
          '<button class="zpid-btn" id="zpid-export" type="button">⭳ Export CSV</button>',
          '<button class="zpid-btn primary" id="zpid-back" type="button">← Executive Dashboard</button>',
        '</div>',
      '</div>',
      '<div class="zpid-tabs-bar" id="zpid-tabs-bar"></div>',
      '<div class="zpid-body" id="zpid-content"></div>'
    ].join('');

    document.body.appendChild(root);

    root.querySelector('#zpid-back').onclick = close;
    root.querySelector('#zpid-refresh').onclick = function () { renderAll(); showToast('Stock levels and pricing refreshed'); };
    root.querySelector('#zpid-export').onclick = exportCsv;

    var presets = root.querySelector('#zpid-presets');
    if (presets) {
      presets.onclick = function (e) {
        var b = e.target.closest('button[data-p]');
        if (!b) return;
        presets.querySelectorAll('button').forEach(function (btn) { btn.classList.remove('on'); });
        b.classList.add('on');
        S.period = b.getAttribute('data-p');
        renderAll();
      };
    }
  }

  /* ── Render Tabs Bar ──────────────────────────────────────────── */
  function renderTabs() {
    var bar = root.querySelector('#zpid-tabs-bar');
    if (!bar) return;
    bar.innerHTML = TABS.map(function (t) {
      var isOn = t.id === S.tab;
      var badgeCls = t.dangerBadge ? ' danger' : (t.warnBadge ? ' warn' : '');
      return [
        '<button type="button" class="zpid-tab' + (isOn ? ' on' : '') + '" data-tab="' + t.id + '">',
          '<span>' + t.icon + '</span>',
          '<span>' + t.label + '</span>',
          '<span class="zpid-tab-badge' + badgeCls + '">' + t.badge + '</span>',
        '</button>'
      ].join('');
    }).join('');
    bar.querySelectorAll('.zpid-tab').forEach(function (btn) {
      btn.onclick = function () {
        var tid = btn.getAttribute('data-tab');
        if (tid) switchTab(tid);
      };
    });
  }

  /* ── Render Dispatcher ────────────────────────────────────────── */
  function renderAll() {
    if (!root) return;
    renderTabs();
    var curTab = TABS.find(function (t) { return t.id === S.tab; });
    var titleEl = root.querySelector('#zpid-title');
    if (titleEl && curTab) titleEl.textContent = 'Products & Inventory — ' + curTab.label;

    var container = root.querySelector('#zpid-content');
    if (!container) return;

    if (S.tab === 'catalog')    container.innerHTML = renderCatalogView();
    else if (S.tab === 'sku')   container.innerHTML = renderSkuView();
    else if (S.tab === 'inventory') container.innerHTML = renderInventoryView();
    else if (S.tab === 'stock') container.innerHTML = renderStockView();
    else if (S.tab === 'lowstock') container.innerHTML = renderLowStockView();
    else if (S.tab === 'outofstock') container.innerHTML = renderOutOfStockView();
    else if (S.tab === 'expiry') container.innerHTML = renderExpiryView();
    else if (S.tab === 'warehouse') container.innerHTML = renderWarehouseView();
    else if (S.tab === 'valuation') container.innerHTML = renderValuationView();
    else if (S.tab === 'transfers') container.innerHTML = renderTransfersView();
    else if (S.tab === 'movement')  container.innerHTML = renderMovementView();

    wireEvents(container);
  }

  /* ── Wire interactive events ──────────────────────────────────── */
  function wireEvents(container) {
    var search = container.querySelector('#zpid-search-input');
    if (search) {
      search.oninput = function () {
        S.searchQuery = search.value;
        renderAll();
      };
    }
    var catFilter = container.querySelector('#zpid-cat-filter');
    if (catFilter) {
      catFilter.onchange = function () {
        S.catFilter = catFilter.value;
        renderAll();
      };
    }
    var wFilter = container.querySelector('#zpid-wh-filter');
    if (wFilter) {
      wFilter.onchange = function () {
        S.warehouseFilter = wFilter.value;
        renderAll();
      };
    }
    container.querySelectorAll('[data-tab-jump]').forEach(function (btn) {
      btn.onclick = function () { switchTab(btn.getAttribute('data-tab-jump')); };
    });
    container.querySelectorAll('.zpid-expiry-action').forEach(function (btn) {
      btn.onclick = function () { showToast('Quarantine request raised for ' + btn.getAttribute('data-sku')); };
    });
    container.querySelectorAll('.zpid-abc-chip').forEach(function (btn) {
      btn.onclick = function () {
        S.abcFilter = btn.getAttribute('data-abc') || 'ALL';
        renderAll();
      };
    });
    container.querySelectorAll('.zpid-mov-chip').forEach(function (btn) {
      btn.onclick = function () {
        S.movementFilter = btn.getAttribute('data-mov') || 'ALL';
        renderAll();
      };
    });
    container.querySelectorAll('.zpid-val-method-btn').forEach(function (btn) {
      btn.onclick = function () {
        S.valuationMethod = btn.getAttribute('data-method') || 'FIFO';
        renderAll();
      };
    });
    container.querySelectorAll('.zpid-trf-status-btn').forEach(function (btn) {
      btn.onclick = function () {
        S.transferStatusFilter = btn.getAttribute('data-status') || 'ALL';
        renderAll();
      };
    });
    var newTrfBtn = container.querySelector('#zpid-new-transfer-btn');
    if (newTrfBtn) {
      newTrfBtn.onclick = function () {
        showNewTransferModal();
      };
    }
  }

  /* ── CATEGORIES for filter ─────────────────────────────────────── */
  var CATS = ['All', 'Pharmacy & Meds', 'Clinical Nutrition', 'Vaccines', 'Accessories', 'Pet Nutrition', 'Dermatology', 'Supplements', 'Pet Tech', 'Fashion & Apparel'];
  var WHS  = ['All', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];

  function catOptions() {
    return CATS.map(function (c) { return '<option value="' + esc(c) + '"' + (S.catFilter === c ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('');
  }
  function whOptions() {
    return WHS.map(function (w) { return '<option value="' + esc(w) + '"' + (S.warehouseFilter === w ? ' selected' : '') + '>' + esc(w) + '</option>'; }).join('');
  }

  /* ── SVG: Stock Trend Sparkline ───────────────────────────────── */
  function renderStockTrendSvg() {
    var W = 600, H = 160;
    var months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    var vals = [4, 5, 6, 8, 8, 9, 10];
    var max = Math.max.apply(null, vals);
    var min = Math.min.apply(null, vals);
    var pad = { t: 20, r: 20, b: 30, l: 50 };
    var iW = W - pad.l - pad.r;
    var iH = H - pad.t - pad.b;

    function px(i) { return pad.l + (i / (vals.length - 1)) * iW; }
    function py(v) { return pad.t + (1 - (v - min) / (max - min || 1)) * iH; }

    var pts = vals.map(function (v, i) { return px(i) + ',' + py(v); }).join(' ');
    var areaPath = 'M ' + pts.split(' ').join(' L ') + ' L ' + px(vals.length - 1) + ',' + (pad.t + iH) + ' L ' + pad.l + ',' + (pad.t + iH) + ' Z';

    var circles = vals.map(function (v, i) {
      return '<circle cx="' + px(i) + '" cy="' + py(v) + '" r="4" fill="#8b5cf6" stroke="var(--background,#090d16)" stroke-width="2"/>';
    }).join('');
    var xLabels = months.map(function (m, i) {
      return '<text x="' + px(i) + '" y="' + (pad.t + iH + 18) + '" text-anchor="middle" font-size="10" fill="#64748b">' + m + '</text>';
    }).join('');
    var yLabels = [min, Math.round((min + max) / 2), max].map(function (v) {
      var y = py(v);
      return '<text x="' + (pad.l - 6) + '" y="' + (y + 4) + '" text-anchor="end" font-size="10" fill="#64748b">' + v + '</text>' +
             '<line x1="' + pad.l + '" y1="' + y + '" x2="' + (pad.l + iW) + '" y2="' + y + '" stroke="rgba(255,255,255,0.05)" stroke-dasharray="3,3"/>';
    }).join('');

    return [
      '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">',
        '<defs><linearGradient id="zpid-grad1" x1="0" y1="0" x2="0" y2="1">',
          '<stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/>',
          '<stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>',
        '</linearGradient></defs>',
        yLabels,
        '<path d="' + areaPath + '" fill="url(#zpid-grad1)"/>',
        '<polyline points="' + pts + '" fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-linejoin="round"/>',
        circles,
        xLabels,
      '</svg>'
    ].join('');
  }

  /* ── SVG: Category Donut ──────────────────────────────────────── */
  function renderDonutSvg() {
    return [
      '<div class="zpid-donut-wrap" style="justify-content:center;padding:16px 0;gap:20px;display:flex;align-items:center;flex-wrap:wrap">',
        '<svg viewBox="0 0 160 160" width="140" height="140" style="flex-shrink:0">',
          '<circle cx="80" cy="80" r="49" fill="none" stroke="#8b5cf6" stroke-width="22" stroke-dasharray="92 308" stroke-dashoffset="0"/>',
          '<circle cx="80" cy="80" r="49" fill="none" stroke="#3b82f6" stroke-width="22" stroke-dasharray="61 308" stroke-dashoffset="-92"/>',
          '<circle cx="80" cy="80" r="49" fill="none" stroke="#06b6d4" stroke-width="22" stroke-dasharray="61 308" stroke-dashoffset="-153"/>',
          '<circle cx="80" cy="80" r="49" fill="none" stroke="#f59e0b" stroke-width="22" stroke-dasharray="61 308" stroke-dashoffset="-214"/>',
          '<circle cx="80" cy="80" r="49" fill="none" stroke="#10b981" stroke-width="22" stroke-dasharray="31 308" stroke-dashoffset="-275"/>',
          '<text x="80" y="76" text-anchor="middle" font-size="16" font-weight="700" fill="#f8fafc">10</text>',
          '<text x="80" y="91" text-anchor="middle" font-size="9" fill="#94a3b8">TOTAL SKUs</text>',
        '</svg>',
        '<div class="zpid-donut-legend" style="display:flex;flex-direction:column;gap:6px;font-size:11px">',
          '<div><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#8b5cf6;margin-right:6px"></span>Pharmacy &amp; Meds: <strong>3 SKUs (30%)</strong></div>',
          '<div><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#3b82f6;margin-right:6px"></span>Clinical Nutrition: <strong>2 SKUs (20%)</strong></div>',
          '<div><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#06b6d4;margin-right:6px"></span>Vaccines: <strong>2 SKUs (20%)</strong></div>',
          '<div><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#f59e0b;margin-right:6px"></span>Supplements: <strong>2 SKUs (20%)</strong></div>',
          '<div><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#10b981;margin-right:6px"></span>Dermatology: <strong>1 SKU (10%)</strong></div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── SVG: Warehouse Capacity Bar ──────────────────────────────── */
  function renderCapacitySvg() {
    var W = 600, H = 140;
    var whs = WAREHOUSES;
    if (whs.length === 0) {
      return '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">No warehouse capacity records found</div>';
    }
    var barH = 18, gapY = 24;
    var labelW = 160, padL = 170, padR = 80, padT = 10;

    var bars = whs.map(function (w, i) {
      var y = padT + i * (barH + gapY);
      var barW = ((W - padL - padR) * w.capacity / 100);
      var col = w.capacity > 85 ? '#f59e0b' : w.capacity > 70 ? '#10b981' : '#0ea5e9';
      return [
        '<text x="' + (padL - 8) + '" y="' + (y + barH / 2 + 4) + '" text-anchor="end" font-size="11" fill="#94a3b8">' + esc(w.city.split(',')[1].trim()) + ' ' + w.id + '</text>',
        '<rect x="' + padL + '" y="' + y + '" width="' + (W - padL - padR) + '" height="' + barH + '" rx="4" fill="rgba(255,255,255,0.05)"/>',
        '<rect x="' + padL + '" y="' + y + '" width="' + barW + '" height="' + barH + '" rx="4" fill="' + col + '" opacity="0.8"/>',
        '<text x="' + (padL + barW + 6) + '" y="' + (y + barH / 2 + 4) + '" font-size="11" fill="' + col + '" font-family="\'IBM Plex Mono\',monospace">' + w.capacity + '%</text>'
      ].join('');
    }).join('');

    return [
      '<svg viewBox="0 0 ' + W + ' ' + (padT + whs.length * (barH + gapY)) + '" xmlns="http://www.w3.org/2000/svg">',
        bars,
      '</svg>'
    ].join('');
  }

  /* =====================================================================
     VIEW 1: Product Catalog
     ===================================================================== */
  function renderCatalogView() {
    var products = getFilteredProducts();
    var cats = {};
    products.forEach(function (p) { cats[p.cat] = (cats[p.cat] || 0) + 1; });
    var totalVal = PRODUCTS.reduce(function (sum, p) { return sum + (p.stock * p.price); }, 0);
    var avgMargin = Math.round(PRODUCTS.reduce(function (sum, p) { return sum + ((p.price - p.cost) / p.price * 100); }, 0) / PRODUCTS.length);
    var catCount = Object.keys(cats).length;

    return [
      '<div class="zpid-kpis">',
        kpi('Total Active SKUs', String(PRODUCTS.length), '+2 this month', 'up', '🛍️'),
        kpi('Total SKU Value', inrShort(totalVal), '+12.4% MoM', 'up', '💰'),
        kpi('Categories', String(catCount), '5 major verticals', 'neutral', '📂'),
        kpi('Avg. Gross Margin', avgMargin + '%', '+1.8% vs target', 'up', '📊'),
        kpi('New Listings (MTD)', '2', 'Bravecto & Nobivac', 'up', '✨'),
        kpi('Discontinued', '0', '0 archived', 'neutral', '🗃️'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>📋 Product Catalog</h3><small>Full SKU registry — search, filter, and manage all active listings</small></div>',
          '<span class="zpid-badge purple">' + products.length + ' products shown</span>',
        '</div>',
        '<div class="zpid-search-wrap">',
          '<input type="text" id="zpid-search-input" class="zpid-search" placeholder="Search by SKU, name, brand, category…" value="' + esc(S.searchQuery) + '"/>',
          '<select id="zpid-cat-filter" class="zpid-filter-select">' + catOptions() + '</select>',
          '<select id="zpid-wh-filter" class="zpid-filter-select">' + whOptions() + '</select>',
        '</div>',
        '<div class="zpid-table-wrap" style="margin-top:8px">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU</th><th>Product Name</th><th>Category</th><th>Brand</th>',
              '<th style="text-align:right">Price</th><th style="text-align:right">MRP</th>',
              '<th>Stock Level</th><th style="text-align:right">Margin</th>',
              '<th>Warehouse</th><th>Flags</th><th style="text-align:right">Status</th>',
            '</tr></thead>',
            '<tbody>',
              products.length === 0 ? '<tr><td colspan="11" style="padding:24px;text-align:center;color:#94a3b8">No products found</td></tr>' : products.map(function (p) {
                var margin = Math.round(((p.price - p.cost) / p.price) * 100);
                var flags = '';
                if (p.cold) flags += '<span class="zpid-badge blue" style="margin-right:4px">❄ Cold</span>';
                if (p.rx)   flags += '<span class="zpid-badge amber">Rx</span>';
                return [
                  '<tr>',
                    '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                    '<td class="zpid-bold" style="max-width:220px">' + esc(p.name) + '</td>',
                    '<td class="zpid-muted">' + esc(p.cat) + '</td>',
                    '<td class="zpid-muted">' + esc(p.brand) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">₹' + p.price.toLocaleString('en-IN') + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#64748b">₹' + p.mrp.toLocaleString('en-IN') + '</td>',
                    '<td>' + stockBar(p) + '</td>',
                    '<td style="text-align:right"><span class="zpid-kpi-delta ' + (margin >= 40 ? 'up' : margin >= 25 ? 'warn' : 'down') + '">' + margin + '%</span></td>',
                    '<td class="zpid-muted">' + esc(p.warehouse.replace(' Hub', '')) + '</td>',
                    '<td>' + (flags || '—') + '</td>',
                    '<td style="text-align:right"><span class="zpid-pill ' + statusClass(p) + '">' + esc(stockStatus(p)) + '</span></td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      '<div class="zpid-grid-2">',
        '<div class="zpid-card">',
          '<div class="zpid-ph"><div><h3>📊 SKUs by Category</h3><small>Distribution of active product listings</small></div></div>',
          renderDonutSvg(),
        '</div>',
        '<div class="zpid-card">',
          '<div class="zpid-ph"><div><h3>📈 Active SKU Count Trend</h3><small>Monthly catalog growth over past 7 months</small></div></div>',
          '<div class="zpid-chart-wrap">' + renderStockTrendSvg() + '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 2: SKU Management
     ===================================================================== */
  function renderSkuView() {
    var products = getFilteredProducts();
    var totalSkus = PRODUCTS.length;
    var activeSkus = PRODUCTS.filter(function (p) { return p.active; }).length;
    var coldSkus   = PRODUCTS.filter(function (p) { return p.cold; }).length;
    var rxSkus     = PRODUCTS.filter(function (p) { return p.rx; }).length;
    var totalBatches = PRODUCTS.reduce(function (sum, p) { return sum + (p.batches || 0); }, 0);
    var avgBatches = (totalBatches / totalSkus).toFixed(1);

    return [
      '<div class="zpid-kpis">',
        kpi('Total SKUs', String(totalSkus), activeSkus + ' active listings', 'up', '🏷️'),
        kpi('Cold Chain SKUs', String(coldSkus), '2–8°C thermo-monitored', 'neutral', '❄️'),
        kpi('Rx (Prescription) SKUs', String(rxSkus), 'Doctor authorization req.', 'neutral', '📋'),
        kpi('Avg. Batches/SKU', avgBatches, totalBatches + ' total lots tracked', 'neutral', '📦'),
        kpi('Multi-Vendor SKUs', '10', 'Across 8 audited suppliers', 'up', '🤝'),
        kpi('Inactive SKUs', String(totalSkus - activeSkus), 'Zero inactive SKUs', 'neutral', '🗃️'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🏷️ SKU Master Registry</h3><small>Detailed specification sheet for every product unit in the catalog</small></div>',
          '<span class="zpid-badge purple">Live</span>',
        '</div>',
        '<div class="zpid-search-wrap">',
          '<input type="text" id="zpid-search-input" class="zpid-search" placeholder="Search SKU, product, vendor…" value="' + esc(S.searchQuery) + '"/>',
          '<select id="zpid-cat-filter" class="zpid-filter-select">' + catOptions() + '</select>',
        '</div>',
        '<div class="zpid-table-wrap" style="margin-top:8px">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU Code</th><th>Product Name</th><th>Subcategory</th>',
              '<th style="text-align:right">Unit Cost</th><th style="text-align:right">Sell Price</th>',
              '<th>MOQ</th><th>Batches</th><th>Vendor</th><th>Weight</th><th>Flags</th><th>Status</th>',
            '</tr></thead>',
            '<tbody>',
              products.length === 0 ? '<tr><td colspan="11" style="padding:24px;text-align:center;color:#94a3b8">No SKUs found</td></tr>' : products.map(function (p) {
                var flags = [];
                if (p.cold) flags.push('❄ Cold Chain');
                if (p.rx)   flags.push('📋 Rx Required');
                return [
                  '<tr>',
                    '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                    '<td class="zpid-bold">' + esc(p.name) + '</td>',
                    '<td class="zpid-muted">' + esc(p.subcat) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">₹' + p.cost.toLocaleString('en-IN') + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">₹' + p.price.toLocaleString('en-IN') + '</td>',
                    '<td class="zpid-mono">' + p.moq + '</td>',
                    '<td class="zpid-mono">' + p.batches + '</td>',
                    '<td class="zpid-muted" style="max-width:160px;font-size:11px">' + esc(p.vendor) + '</td>',
                    '<td class="zpid-muted">' + esc(p.weight) + '</td>',
                    '<td>' + (flags.length ? flags.map(function (f) { return '<div style="font-size:10px;color:#94a3b8">' + esc(f) + '</div>'; }).join('') : '—') + '</td>',
                    '<td><span class="zpid-pill ' + (p.active ? 'healthy' : 'out') + '">' + (p.active ? 'Active' : 'Inactive') + '</span></td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph"><div><h3>📦 Vendor-to-SKU Distribution</h3><small>Top vendors by number of active SKUs supplied</small></div></div>',
        '<div class="zpid-progress-row">',
          '<div style="padding:16px 18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">',
            '<div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid rgba(255,255,255,0.08)"><strong>MSD Animal Health</strong><div style="font-size:11px;color:#94a3b8;margin-top:2px">2 SKUs · Parasiticides & Vaccines</div></div>',
            '<div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid rgba(255,255,255,0.08)"><strong>Boehringer Ingelheim</strong><div style="font-size:11px;color:#94a3b8;margin-top:2px">1 SKU · Endectocides</div></div>',
            '<div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid rgba(255,255,255,0.08)"><strong>Mars Petcare / Royal Canin</strong><div style="font-size:11px;color:#94a3b8;margin-top:2px">1 SKU · Clinical Diets</div></div>',
            '<div style="padding:10px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid rgba(255,255,255,0.08)"><strong>Zoetis Healthcare</strong><div style="font-size:11px;color:#94a3b8;margin-top:2px">1 SKU · Feline Biologicals</div></div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 3: Inventory Dashboard
     ===================================================================== */
  function renderInventoryView() {
    var total = PRODUCTS.reduce(function (a, p) { return a + p.stock * p.cost; }, 0);
    var lowCount = PRODUCTS.filter(function (p) { return p.stock > 0 && p.stock <= p.reorder; }).length;
    var outCount = PRODUCTS.filter(function (p) { return p.stock === 0; }).length;
    var expiryCount = PRODUCTS.filter(function (p) { return p.expiry && daysUntilExpiry(p.expiry) <= 30 && daysUntilExpiry(p.expiry) >= 0; }).length;
    var activeCount = PRODUCTS.filter(function (p) { return p.active; }).length;

    return [
      '<div class="zpid-kpis">',
        kpi('Total Stock Value', inrShort(total), '+8.6% MoM', 'up', '💰'),
        kpi('Active SKUs', String(activeCount), '10 live catalog', 'up', '🏷️'),
        kpi('Low Stock Items', String(lowCount), 'Replenishment triggered', 'warn', '⚠️'),
        kpi('Out of Stock', String(outCount), '2 zero inventory SKUs', 'down', '🚫'),
        kpi('Expiring in 30 Days', expiryCount + ' batch', 'Nobivac Vaccine Alert', 'down', '⏳'),
        kpi('Inventory Turnover', '6.4x', '+0.8x vs Q2', 'up', '🔄'),
      '</div>',

      '<div class="zpid-grid-2">',
        '<div class="zpid-card">',
          '<div class="zpid-ph"><div><h3>📈 SKU Count Trend</h3><small>Active SKUs by month — catalog growth trajectory</small></div></div>',
          '<div class="zpid-chart-wrap">' + renderStockTrendSvg() + '</div>',
        '</div>',
        '<div class="zpid-card">',
          '<div class="zpid-ph"><div><h3>🏢 Warehouse Capacity Utilisation</h3><small>Current fill rate across all 5 regional hubs</small></div></div>',
          '<div class="zpid-chart-wrap">' + renderCapacitySvg() + '</div>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>⚡ Inventory Quick Actions</h3><small>Navigate to specific inventory management views</small></div>',
        '</div>',
        '<div style="display:flex;flex-wrap:wrap;gap:10px;padding:16px 18px">',
          actionCard('⚠️ Low Stock Alert', lowCount + ' SKUs need reorder', 'lowstock', 'amber'),
          actionCard('🚫 Out of Stock', outCount + ' SKUs — zero units', 'outofstock', 'red'),
          actionCard('⏳ Expiry Management', expiryCount + ' batch near expiry', 'expiry', 'orange'),
          actionCard('🏭 Warehouse View', WAREHOUSES.length + ' hubs online', 'warehouse', 'purple'),
          actionCard('🛍️ Product Catalog', PRODUCTS.length + ' SKU registry', 'catalog', 'blue'),
          actionCard('🏷️ SKU Management', 'Specs & vendor data', 'sku', 'green'),
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>📦 Category-wise Stock Value</h3><small>Inventory value distribution by product category</small></div>',
          '<span class="zpid-badge purple">Total: ' + inrShort(total) + '</span>',
        '</div>',
        '<div class="zpid-progress-row">',
          '<div style="padding:16px 18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">',
            '<div style="padding:12px;background:rgba(139,92,246,0.08);border-radius:8px;border:1px solid rgba(139,92,246,0.2)"><strong>Pharmacy &amp; Meds</strong><div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹5,11,850</div><div style="font-size:10px;color:#94a3b8">327 units on hand</div></div>',
            '<div style="padding:12px;background:rgba(59,130,246,0.08);border-radius:8px;border:1px solid rgba(59,130,246,0.2)"><strong>Clinical Nutrition</strong><div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹2,94,000</div><div style="font-size:10px;color:#94a3b8">140 units on hand</div></div>',
            '<div style="padding:12px;background:rgba(6,182,212,0.08);border-radius:8px;border:1px solid rgba(6,182,212,0.2)"><strong>Vaccines &amp; Biologics</strong><div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹2,29,140</div><div style="font-size:10px;color:#94a3b8">77 units cold-chain</div></div>',
            '<div style="padding:12px;background:rgba(245,158,11,0.08);border-radius:8px;border:1px solid rgba(245,158,11,0.2)"><strong>Supplements &amp; Wellness</strong><div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹3,98,150</div><div style="font-size:10px;color:#94a3b8">303 units on hand</div></div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function actionCard(icon_label, sub, tab, color) {
    var colors = { amber: '#f59e0b', red: '#f87171', orange: '#fb923c', purple: '#a78bfa', blue: '#38bdf8', green: '#10b981' };
    var col = colors[color] || '#a78bfa';
    return [
      '<button data-tab-jump="' + tab + '" style="',
        'display:flex;flex-direction:column;gap:6px;padding:14px 16px;',
        'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);',
        'border-radius:10px;cursor:pointer;text-align:left;min-width:150px;flex:1;',
        'transition:border-color 0.15s;color:inherit;',
        '" onmouseover="this.style.borderColor=\'' + col + '40\'" onmouseout="this.style.borderColor=\'rgba(255,255,255,0.08)\'">',
        '<span style="font-size:20px">' + icon_label.split(' ')[0] + '</span>',
        '<span style="font-size:13px;font-weight:700">' + esc(icon_label.split(' ').slice(1).join(' ')) + '</span>',
        '<span style="font-size:11px;color:#94a3b8">' + esc(sub) + '</span>',
      '</button>'
    ].join('');
  }

  /* =====================================================================
     VIEW 4: Stock Management
     ===================================================================== */
  function renderStockView() {
    var products = getFilteredProducts();
    var totalUnits = PRODUCTS.reduce(function (sum, p) { return sum + p.stock; }, 0);
    var reorderCount = PRODUCTS.filter(function (p) { return p.stock <= p.reorder; }).length;
    var estReorderVal = PRODUCTS.filter(function (p) { return p.stock <= p.reorder; }).reduce(function (sum, p) { return sum + ((p.reorder * 2 - p.stock) * p.cost); }, 0);

    return [
      '<div class="zpid-kpis">',
        kpi('Total Units On-Hand', totalUnits.toLocaleString('en-IN'), 'Across 5 regional hubs', 'up', '🏗️'),
        kpi('Reorder Required', String(reorderCount), 'Below safety threshold', 'warn', '🔔'),
        kpi('Reorder Value (Est.)', inrShort(estReorderVal), 'Pending procurement POs', 'neutral', '💸'),
        kpi('Avg. Days of Cover', '24.2 days', 'Optimal holding target', 'up', '📅'),
        kpi('Over-Stocked SKUs', '1', 'Zenve Calming Chews (42d)', 'neutral', '📦'),
        kpi('Pending POs', '4', '₹2.8L in procurement', 'neutral', '📋'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🏗️ Stock Level Management</h3><small>Real-time stock against reorder and safety levels — sortable and searchable</small></div>',
          '<span class="zpid-badge amber">0 Action Items</span>',
        '</div>',
        '<div class="zpid-search-wrap">',
          '<input type="text" id="zpid-search-input" class="zpid-search" placeholder="Filter products…" value="' + esc(S.searchQuery) + '"/>',
          '<select id="zpid-cat-filter" class="zpid-filter-select">' + catOptions() + '</select>',
          '<select id="zpid-wh-filter" class="zpid-filter-select">' + whOptions() + '</select>',
        '</div>',
        '<div class="zpid-table-wrap" style="margin-top:8px">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU</th><th>Product</th><th>Category</th>',
              '<th style="text-align:right">On-Hand</th><th style="text-align:right">Reorder At</th>',
              '<th>Stock Level</th><th style="text-align:right">Days Cover</th>',
              '<th style="text-align:right">Est. Reorder Value</th><th>Warehouse</th><th>Action</th>',
            '</tr></thead>',
            '<tbody>',
              products.length === 0 ? '<tr><td colspan="10" style="padding:24px;text-align:center;color:#94a3b8">No stock records found</td></tr>' : products.map(function (p) {
                var daysOfCover = p.stock > 0 ? Math.round(p.stock / Math.max(1, p.reorder / 14)) : 0;
                var reorderVal = Math.max(0, (p.reorder * 2 - p.stock)) * p.cost;
                var needsAction = p.stock <= p.reorder;
                return [
                  '<tr>',
                    '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                    '<td class="zpid-bold">' + esc(p.name) + '</td>',
                    '<td class="zpid-muted">' + esc(p.cat) + '</td>',
                    '<td style="text-align:right;font-weight:700;font-family:\'IBM Plex Mono\',monospace;color:' + stockColor(p) + '">' + p.stock + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#64748b">' + p.reorder + '</td>',
                    '<td>' + stockBar(p) + '</td>',
                    '<td style="text-align:right"><span class="zpid-kpi-delta ' + (daysOfCover > 20 ? 'up' : daysOfCover > 7 ? 'warn' : 'down') + '">' + daysOfCover + 'd</span></td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:' + (reorderVal > 0 ? '#f59e0b' : '#10b981') + '">' + (reorderVal > 0 ? inrShort(reorderVal) : '—') + '</td>',
                    '<td class="zpid-muted">' + esc(p.warehouse.replace(' Hub', '')) + '</td>',
                    '<td>' + (needsAction ? '<button class="zpid-expiry-action" style="background:rgba(139,92,246,0.15);color:#a78bfa" onclick="window.ZenveProductsInventory && showToast(\'PO raised for ' + esc(p.sku) + '\')">Raise PO</button>' : '<span class="zpid-muted">OK</span>') + '</td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 5: Low Stock
     ===================================================================== */
  function renderLowStockView() {
    var lowItems = PRODUCTS.filter(function (p) { return p.stock > 0 && p.stock <= p.reorder; });
    var critItems = PRODUCTS.filter(function (p) { return p.stock > 0 && p.stock <= p.reorder * 0.4; });
    var estReorderVal = lowItems.reduce(function (acc, p) { return acc + (p.reorder * 2 - p.stock) * p.cost; }, 0);

    var catsMap = {};
    lowItems.forEach(function (p) { catsMap[p.cat] = (catsMap[p.cat] || 0) + 1; });
    var catKeys = Object.keys(catsMap);

    return [
      '<div class="zpid-kpis">',
        kpi('Low Stock SKUs', lowItems.length, critItems.length + ' critical', 'down', '⚠️'),
        kpi('Critical (< 40% Reorder)', critItems.length, 'Immediate action needed', 'down', '🔴'),
        kpi('Est. Stockout in 7 Days', critItems.length + ' SKUs', 'High velocity risk', 'warn', '📉'),
        kpi('Reorder Value Required', inrShort(estReorderVal), 'Estimated replenishment', 'warn', '💸'),
        kpi('POs Pending', '2', '2 auto-generated', 'neutral', '📋'),
        kpi('Suppliers Alerted', '3', 'Automated EDI sent', 'up', '📡'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>⚠️ Low Stock Alert Centre</h3><small>Products below reorder threshold — sorted by criticality</small></div>',
          '<span class="zpid-badge amber">' + lowItems.length + ' SKUs Flagged</span>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU</th><th>Product Name</th><th>Category</th>',
              '<th style="text-align:right">On-Hand</th><th style="text-align:right">Reorder At</th>',
              '<th>Stock Level</th><th>Vendor</th><th style="text-align:right">Reorder Value</th><th>Priority</th>',
            '</tr></thead>',
            '<tbody>',
              lowItems.length === 0 ? '<tr><td colspan="9" style="padding:24px;text-align:center;color:#94a3b8">No low stock items</td></tr>' : lowItems.sort(function (a, b) { return a.stock - b.stock; }).map(function (p) {
                var reorderVal = (p.reorder * 2 - p.stock) * p.cost;
                var isCrit = p.stock <= p.reorder * 0.4;
                return [
                  '<tr>',
                    '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                    '<td class="zpid-bold">' + esc(p.name) + '</td>',
                    '<td class="zpid-muted">' + esc(p.cat) + '</td>',
                    '<td style="text-align:right;font-weight:700;font-family:\'IBM Plex Mono\',monospace;color:' + stockColor(p) + '">' + p.stock + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#64748b">' + p.reorder + '</td>',
                    '<td>' + stockBar(p) + '</td>',
                    '<td class="zpid-muted" style="font-size:11px">' + esc(p.vendor) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#f59e0b">' + inrShort(reorderVal) + '</td>',
                    '<td><span class="zpid-pill ' + (isCrit ? 'critical' : 'low') + '">' + (isCrit ? '🔴 Critical' : '🟡 Low') + '</span></td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph"><div><h3>📋 Category-wise Low Stock Summary</h3><small>Aggregate low-stock impact by category</small></div></div>',
        '<div class="zpid-progress-row">',
          catKeys.length === 0 ? '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">No low stock categories</div>' : catKeys.map(function (ck) {
            var cnt = catsMap[ck];
            var pct = Math.min(100, Math.round((cnt / (lowItems.length || 1)) * 100));
            return [
              '<div class="zpid-progress-item">',
                '<div class="zpid-progress-label"><span style="font-weight:600">' + esc(ck) + '</span><span>' + cnt + ' SKU(s) (' + pct + '%)</span></div>',
                '<div class="zpid-progress-track"><div class="zpid-progress-fill" style="width:' + pct + '%;background:#f59e0b"></div></div>',
              '</div>'
            ].join('');
          }).join(''),
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 6: Out of Stock
     ===================================================================== */
  function renderOutOfStockView() {
    var outItems = PRODUCTS.filter(function (p) { return p.stock === 0; });
    var totalLostDaily = outItems.reduce(function (sum, p) { return sum + Math.round(p.reorder / 14) * p.price; }, 0);

    return [
      '<div class="zpid-kpis">',
        kpi('Out of Stock SKUs', outItems.length, 'Zero inventory', 'down', '🚫'),
        kpi('Est. Revenue Lost (MTD)', inrShort(totalLostDaily * 30), 'Based on run-rate', 'down', '📉'),
        kpi('Orders Impacted', '18', 'Unfulfillable cart lines', 'warn', '📦'),
        kpi('Avg. Days Out-of-Stock', '4.5 days', 'Supply chain lead delay', 'warn', '📅'),
        kpi('POs Placed', '2', 'Expedited shipments', 'neutral', '📋'),
        kpi('Customer Backorders', '12', 'Pending restock', 'warn', '🔔'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🚫 Out of Stock Products</h3><small>Zero-inventory SKUs — replenishment urgency and lost revenue analysis</small></div>',
          '<span class="zpid-badge red">' + outItems.length + ' SKUs Unavailable</span>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>SKU</th><th>Product Name</th><th>Category</th>',
              '<th>Warehouse</th><th style="text-align:right">Reorder Level</th>',
              '<th style="text-align:right">Est. Daily Demand</th>',
              '<th style="text-align:right">Lost Rev/Day</th>',
              '<th>Vendor</th><th>Urgency</th>',
            '</tr></thead>',
            '<tbody>',
              outItems.length === 0 ? '<tr><td colspan="9" style="padding:24px;text-align:center;color:#94a3b8">No out of stock items</td></tr>' : outItems.map(function (p, i) {
                var dailyDemand = Math.max(1, Math.round(p.reorder / 14));
                var lostRev = dailyDemand * p.price;
                var urgency = p.rx ? 'critical' : p.cold ? 'critical' : (i < 2 ? 'critical' : 'low');
                return [
                  '<tr>',
                    '<td class="zpid-mono">' + esc(p.sku) + '</td>',
                    '<td class="zpid-bold">' + esc(p.name) + '</td>',
                    '<td class="zpid-muted">' + esc(p.cat) + '</td>',
                    '<td class="zpid-muted">' + esc(p.warehouse.replace(' Hub', '')) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">' + p.reorder + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">' + dailyDemand + ' units/day</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;color:#ef4444">' + inrShort(lostRev) + '/day</td>',
                    '<td class="zpid-muted" style="font-size:11px">' + esc(p.vendor) + '</td>',
                    '<td><span class="zpid-pill ' + urgency + '">' + (urgency === 'critical' ? '🔴 Critical' : '🟡 Standard') + '</span></td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph"><div><h3>📊 Out-of-Stock Root Cause Analysis</h3><small>Replenishment bottleneck breakdown</small></div></div>',
        '<div class="zpid-progress-row">',
          '<div class="zpid-progress-item">',
            '<div class="zpid-progress-label"><span style="font-weight:600">Supplier Manufacturing Batch Delay (Royal Canin)</span><span>60% Impact</span></div>',
            '<div class="zpid-progress-track"><div class="zpid-progress-fill" style="width:60%;background:#ef4444"></div></div>',
          '</div>',
          '<div class="zpid-progress-item">',
            '<div class="zpid-progress-label"><span style="font-weight:600">Cold-Chain Reefer Truck Route Congestion (Virbac)</span><span>40% Impact</span></div>',
            '<div class="zpid-progress-track"><div class="zpid-progress-fill" style="width:40%;background:#f59e0b"></div></div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 7: Expiry Management
     ===================================================================== */
  function renderExpiryView() {
    var expiryItems = PRODUCTS.filter(function (p) { return p.expiry; })
      .map(function (p) { return Object.assign({}, p, { days: daysUntilExpiry(p.expiry) }); })
      .sort(function (a, b) { return a.days - b.days; });

    var critical = expiryItems.filter(function (p) { return p.days <= 30; });
    var soon     = expiryItems.filter(function (p) { return p.days > 30 && p.days <= 60; });
    var ok       = expiryItems.filter(function (p) { return p.days > 60; });

    function expiryRow(p) {
      var col = expiryColor(p.days);
      return [
        '<div class="zpid-expiry-item">',
          '<div class="zpid-expiry-days" style="color:' + col + '">' + (p.days < 0 ? 'EXP' : p.days) + '</div>',
          '<div class="zpid-expiry-info">',
            '<div class="zpid-expiry-name">' + esc(p.name) + '</div>',
            '<div class="zpid-expiry-meta">' + esc(p.sku) + ' · ' + esc(p.cat) + ' · ' + esc(p.warehouse) + ' · Expires: ' + esc(p.expiry) + ' · ' + p.batches + ' batch(es) · Stock: ' + p.stock + ' units</div>',
          '</div>',
          '<span class="zpid-pill ' + (p.days < 0 ? 'critical' : p.days <= 30 ? 'critical' : 'expiring') + '">' + (p.days < 0 ? 'Expired' : p.days <= 30 ? '🔴 Critical' : '🟡 Expiring Soon') + '</span>',
          '<button class="zpid-expiry-action" data-sku="' + esc(p.sku) + '" style="margin-left:8px">Quarantine</button>',
        '</div>'
      ].join('');
    }

    var coldBatches = PRODUCTS.filter(function (p) { return p.cold; }).length;
    var disposalRisk = critical.reduce(function (sum, p) { return sum + (p.stock * p.cost); }, 0);

    return [
      '<div class="zpid-kpis">',
        kpi('Expiring ≤ 30 Days', critical.length + ' batches', 'Immediate action required', 'down', '🔴'),
        kpi('Expiring ≤ 60 Days', soon.length + ' batches', 'Schedule discounts/returns', 'warn', '🟡'),
        kpi('Healthy (> 60 Days)', ok.length + ' SKUs', 'Normal lifecycle', 'up', '✅'),
        kpi('Cold-Chain Batches', coldBatches + ' batches', '2°C–8°C logged', 'neutral', '❄️'),
        kpi('FEFO Compliance', '99.2%', '+0.4% vs SLA', 'up', '📋'),
        kpi('Disposal Risk Value', inrShort(disposalRisk), 'Actionable quarantine', 'warn', '💸'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🔴 Critical — Expiring within 30 Days</h3><small>Immediate markdown, return-to-vendor, or quarantine action required</small></div>',
          '<span class="zpid-badge red">' + critical.length + ' Batches</span>',
        '</div>',
        critical.map(expiryRow).join(''),
        critical.length === 0 ? '<div style="padding:20px 18px;color:#94a3b8;font-size:13px">✅ No critical expiry items in current filter view</div>' : '',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🟡 Expiring in 31–60 Days</h3><small>Plan promotional discounts or vendor return for these batches</small></div>',
          '<span class="zpid-badge amber">' + soon.length + ' Batches</span>',
        '</div>',
        soon.map(expiryRow).join(''),
        soon.length === 0 ? '<div style="padding:20px 18px;color:#94a3b8;font-size:13px">✅ No upcoming expiry items</div>' : '',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>✅ Healthy Stock (> 60 Days Remaining)</h3><small>Normal lifecycle — no action required</small></div>',
          '<span class="zpid-badge green">' + ok.length + ' SKUs</span>',
        '</div>',
        ok.map(expiryRow).join(''),
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 8: Warehouse Management
     ===================================================================== */
  function renderWarehouseView() {
    var totalVal = WAREHOUSES.reduce(function (s, w) { return s + w.value; }, 0);
    var avgCap = Math.round(WAREHOUSES.reduce(function (s, w) { return s + w.capacity; }, 0) / (WAREHOUSES.length || 1));
    var totalStaff = WAREHOUSES.reduce(function (s, w) { return s + w.staff; }, 0);

    return [
      '<div class="zpid-kpis">',
        kpi('Active Warehouses', WAREHOUSES.length + ' Hubs', 'All facilities online', 'up', '🏭'),
        kpi('Total Warehouse Value', inrShort(totalVal), 'Network stock valuation', 'up', '💰'),
        kpi('Avg. Hub Capacity Used', avgCap + '%', 'Optimal threshold < 85%', 'neutral', '📊'),
        kpi('Cold Chain Zones', '8 Zones', 'Fully certified', 'up', '❄️'),
        kpi('Total Warehouse Staff', totalStaff + ' members', 'Across 5 hubs', 'neutral', '👷'),
        kpi('Dispatch SLA', '98.8%', 'Same-day turnaround', 'up', '⚡'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🏭 Warehouse Capacity Utilisation</h3><small>Fill rate comparison across all regional fulfillment hubs</small></div>',
          '<span class="zpid-badge purple">' + WAREHOUSES.length + ' Hubs Online</span>',
        '</div>',
        '<div class="zpid-chart-wrap">' + renderCapacitySvg() + '</div>',
      '</div>',

      '<div class="zpid-grid-3">',
        WAREHOUSES.length === 0 ? '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;grid-column:1/-1;">No warehouse facilities registered</div>' : WAREHOUSES.map(function (w) {
          var capColor = w.capacity > 85 ? '#f59e0b' : w.capacity > 70 ? '#10b981' : '#0ea5e9';
          return [
            '<div class="zpid-hub-card">',
              '<div style="display:flex;align-items:flex-start;justify-content:space-between">',
                '<div>',
                  '<div class="zpid-hub-name">🏭 ' + esc(w.name) + '</div>',
                  '<div style="font-size:11px;color:#94a3b8;margin-top:3px">' + esc(w.city) + '</div>',
                '</div>',
                '<span class="zpid-badge ' + (w.health > 92 ? 'green' : w.health > 85 ? 'amber' : 'red') + '">' + w.health + '% Health</span>',
              '</div>',
              '<div style="display:flex;flex-direction:column;gap:4px">',
                '<div style="display:flex;justify-content:space-between;font-size:11px">',
                  '<span>Capacity Used</span>',
                  '<span style="font-family:\'IBM Plex Mono\',monospace;color:' + capColor + '">' + w.capacity + '%</span>',
                '</div>',
                '<div class="zpid-progress-track">',
                  '<div class="zpid-progress-fill" style="width:' + w.capacity + '%;background:' + capColor + '"></div>',
                '</div>',
              '</div>',
              '<div class="zpid-hub-meta">',
                '<span class="zpid-hub-chip">📦 ' + w.skus + ' SKUs</span>',
                '<span class="zpid-hub-chip">💰 ' + inrShort(w.value) + '</span>',
                '<span class="zpid-hub-chip">👷 ' + w.staff + ' Staff</span>',
              '</div>',
              '<div>',
                '<div style="font-size:10px;color:#64748b;font-family:\'IBM Plex Mono\',monospace;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px">Storage Zones</div>',
                w.zones.map(function (z) {
                  return '<div style="font-size:11px;padding:3px 0;display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,0.04)">' +
                    '<span style="width:6px;height:6px;border-radius:50%;background:' + capColor + ';flex-shrink:0;display:inline-block"></span>' +
                    esc(z) + '</div>';
                }).join(''),
              '</div>',
              '<div style="font-size:11px;color:#64748b">Hub Manager: <span style="color:#94a3b8;font-weight:600">' + esc(w.manager) + '</span></div>',
            '</div>'
          ].join('');
        }).join(''),
      '</div>'
    ].join('');
  }


  /* =====================================================================
     VIEW 10: Inventory Valuation
     ===================================================================== */
  function renderValuationView() {
    var multiplier = S.valuationMethod === 'Weighted Avg' ? 1.02 : S.valuationMethod === 'LIFO' ? 0.96 : 1.0;
    var totalCost = Math.round(11620000 * multiplier);
    var totalRetail = Math.round(16240000 * multiplier);
    var marginPct = (((totalRetail - totalCost) / totalRetail) * 100).toFixed(1);
    var totalWhVal = WAREHOUSES.reduce(function (s, w) { return s + w.value; }, 0);

    return [
      '<div class="zpid-kpis">',
        kpi('Total Asset Valuation', inrShort(totalCost), S.valuationMethod + ' GAAP method', 'up', '💰'),
        kpi('Projected Retail Value', inrShort(totalRetail), 'Current MRP realization', 'up', '🏷️'),
        kpi('Unrealized Gross Margin', marginPct + '%', inrShort(totalRetail - totalCost) + ' profit', 'up', '📈'),
        kpi('Holding Carrying Cost', '14.2%', inrShort(totalCost * 0.012) + ' monthly run-rate', 'neutral', '🛡️'),
        kpi('FIFO Verified Batches', '34 Batches', '100% audit records', 'up', '✅'),
        kpi('At-Risk Aging Value', '₹42,500', '0.36% of portfolio', 'warn', '⏳'),
      '</div>',

      '<div class="zpid-grid-2">',
        '<div class="zpid-card">',
          '<div class="zpid-ph">',
            '<div><h3>💎 Category Asset Breakdown</h3><small>Balance sheet cost vs retail realization by category</small></div>',
            '<div style="display:flex;gap:4px">',
              ['FIFO', 'Weighted Avg', 'LIFO'].map(function (m) {
                return '<button type="button" class="zpid-cat-chip zpid-val-method-btn' + (S.valuationMethod === m ? ' on' : '') + '" data-method="' + m + '">' + m + '</button>';
              }).join(''),
            '</div>',
          '</div>',
          '<div class="zpid-progress-row">',
            VALUATION_CATS.length === 0
              ? '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:12px;">No category asset records found</div>'
              : VALUATION_CATS.map(function (cat) {
                  return [
                    '<div class="zpid-progress-item">',
                      '<div class="zpid-progress-label">',
                        '<span style="font-weight:600">' + esc(cat.name) + '</span>',
                        '<span>' + inrShort(cat.costVal * multiplier) + ' <span style="color:#10b981">(' + cat.margin + ')</span></span>',
                      '</div>',
                      '<div class="zpid-progress-track"><div class="zpid-progress-fill" style="width:' + (cat.share * 2.8) + '%;background:' + cat.color + '"></div></div>',
                    '</div>'
                  ].join('');
                }).join(''),
          '</div>',
        '</div>',

        '<div class="zpid-card">',
          '<div class="zpid-ph">',
            '<div><h3>⏳ Aging Breakdown &amp; Reserves</h3><small>Shelf-life valuation risk &amp; write-down reserves</small></div>',
            '<span class="zpid-badge green">Reserve Adequate</span>',
          '</div>',
          '<div style="padding:16px 18px;display:grid;grid-template-columns:1fr 1fr;gap:10px">',
            '<div style="padding:12px;border-radius:8px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2)">',
              '<div style="font-size:11px;color:#10b981;font-weight:600">Fresh (0–30 Days)</div>',
              '<div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹72.4L (62%)</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Peak turnover velocity</div>',
            '</div>',
            '<div style="padding:12px;border-radius:8px;background:rgba(14,165,233,0.08);border:1px solid rgba(14,165,233,0.2)">',
              '<div style="font-size:11px;color:#0ea5e9;font-weight:600">Active (31–60 Days)</div>',
              '<div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹29.8L (26%)</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Normal consumption</div>',
            '</div>',
            '<div style="padding:12px;border-radius:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2)">',
              '<div style="font-size:11px;color:#f59e0b;font-weight:600">Slow Moving (61–90d)</div>',
              '<div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹9.7L (8%)</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Review markdown plan</div>',
            '</div>',
            '<div style="padding:12px;border-radius:8px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2)">',
              '<div style="font-size:11px;color:#ef4444;font-weight:600">At Risk (&gt;90 Days)</div>',
              '<div style="font-size:16px;font-weight:700;color:#f8fafc;margin-top:2px">₹4.3L (4%)</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Full reserve: ₹42,500</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🏭 Warehouse Holding Asset Valuation</h3><small>Facility-level stock valuation and inventory accuracy audit status</small></div>',
          '<span class="zpid-badge purple">' + WAREHOUSES.length + ' Facilities Reconciled</span>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>Warehouse Facility</th><th style="text-align:right">Stock Units</th>',
              '<th style="text-align:right">Asset Valuation (' + S.valuationMethod + ')</th>',
              '<th style="text-align:right">Network Share</th><th>Hub Manager</th>',
              '<th style="text-align:right">Audit Reconciliation</th>',
            '</tr></thead>',
            '<tbody>',
              WAREHOUSES.length === 0
                ? '<tr><td colspan="6" style="padding:24px;text-align:center;color:#94a3b8">No warehouse valuation records found</td></tr>'
                : WAREHOUSES.map(function (w) {
                    var val = inrShort(w.value * multiplier);
                    var share = totalWhVal > 0 ? ((w.value / totalWhVal) * 100).toFixed(1) : '20.0';
                    return [
                      '<tr>',
                        '<td><strong>🏭 ' + esc(w.name) + '</strong></td>',
                        '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">' + (w.skus * 12).toLocaleString() + '</td>',
                        '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700;color:#10b981">' + val + '</td>',
                        '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace">' + share + '%</td>',
                        '<td style="color:#94a3b8">' + esc(w.manager) + '</td>',
                        '<td style="text-align:right"><span class="zpid-badge green">✓ Audit Reconciled</span></td>',
                      '</tr>'
                    ].join('');
                  }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* =====================================================================
     VIEW 11: Stock Transfers
     ===================================================================== */
  function renderTransfersView() {
    var filtered = S.transferStatusFilter === 'ALL' ? TRANSFERS : TRANSFERS.filter(function (t) { return t.status === S.transferStatusFilter; });
    var inTransit = TRANSFERS.filter(function (t) { return t.status === 'In Transit'; });
    var inTransitVal = inTransit.reduce(function (s, t) { return s + t.value; }, 0);
    var completed = TRANSFERS.filter(function (t) { return t.status === 'Received'; });

    return [
      '<div class="zpid-kpis">',
        kpi('Active In-Transit', inTransit.length + ' Transfers', inrShort(inTransitVal) + ' in transit', 'neutral', '🚚'),
        kpi('Completed (MTD)', (completed.length + 18) + ' Shipments', '98.5% on-time SLA', 'up', '✅'),
        kpi('Avg Transit Lead Time', '14.2 Hours', 'Express inter-hub lane', 'up', '⚡'),
        kpi('Cold Chain Integrity', '100.0%', '0 breach alerts', 'up', '❄️'),
        kpi('Network Hubs', WAREHOUSES.length + ' Facilities', 'All connected', 'neutral', '🏭'),
        kpi('Transfer Accuracy', '99.6%', 'Barcode verified', 'up', '🎯'),
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>🔁 Inter-Warehouse Stock Transfer Manifests</h3><small>Multi-hub replenishment shipments, live route status &amp; cold-chain custody</small></div>',
          '<div style="display:flex;align-items:center;gap:8px">',
            '<div style="display:flex;gap:4px">',
              ['ALL', 'In Transit', 'Pending Dispatch', 'Received'].map(function (st) {
                return '<button type="button" class="zpid-cat-chip zpid-trf-status-btn' + (S.transferStatusFilter === st ? ' on' : '') + '" data-status="' + st + '">' + (st === 'ALL' ? 'All Status' : st) + '</button>';
              }).join(''),
            '</div>',
            '<button type="button" id="zpid-new-transfer-btn" class="zpid-btn primary" style="font-size:11px;padding:6px 12px">+ Initiate Transfer</button>',
          '</div>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>Manifest ID</th><th>Route (Origin ➔ Destination)</th><th>Contents / SKUs</th>',
              '<th style="text-align:right">Transfer Value</th><th>Carrier / Fleet</th>',
              '<th>Telemetry / Temp</th><th>Status &amp; ETA</th><th style="text-align:right">Actions</th>',
            '</tr></thead>',
            '<tbody>',
              filtered.length === 0 ? '<tr><td colspan="8" style="padding:24px;text-align:center;color:#94a3b8">No transfer manifests found</td></tr>' : filtered.map(function (t) {
                var statusCls = t.status === 'In Transit' ? 'purple' : t.status === 'Received' ? 'green' : 'amber';
                return [
                  '<tr>',
                    '<td style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;font-size:11px">' + esc(t.id) + '</td>',
                    '<td><span class="zpid-route-tag">' + esc(t.origin) + ' <span style="color:#3b82f6">➔</span> ' + esc(t.dest) + '</span></td>',
                    '<td style="color:#94a3b8;font-size:11px;max-width:260px">' + esc(t.skus) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:700">' + inrShort(t.value) + '</td>',
                    '<td style="font-size:11px">' + esc(t.carrier) + '</td>',
                    '<td>',
                      t.cold ? '<span class="zpid-telemetry-pill cold">❄️ ' + esc(t.temp) + '</span>' : '<span class="zpid-telemetry-pill ambient">Ambient</span>',
                    '</td>',
                    '<td>',
                      '<span class="zpid-badge ' + statusCls + '">' + esc(t.status) + '</span>',
                      '<div style="font-size:10px;color:#94a3b8;margin-top:2px">' + esc(t.eta) + '</div>',
                    '</td>',
                    '<td style="text-align:right">',
                      '<button type="button" class="zpid-btn" style="font-size:10px;padding:3px 8px" onclick="window.ZenveProductsInventory.showManifest(\'' + esc(t.id) + '\')">Manifest</button>',
                    '</td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Modal: New Stock Transfer ────────────────────────────────── */
  function showNewTransferModal() {
    var existing = document.getElementById('zpid-modal-root');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.id = 'zpid-modal-root';
    div.className = 'zpid-modal-overlay';
    div.innerHTML = [
      '<div class="zpid-modal-card">',
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">',
          '<h3 style="margin:0;font-size:16px;font-weight:700">🔁 Initiate Stock Transfer</h3>',
          '<button type="button" id="zpid-close-modal-btn" style="background:transparent;border:none;color:#94a3b8;font-size:18px;cursor:pointer">✕</button>',
        '</div>',
        '<p style="font-size:12px;color:#94a3b8;margin:0 0 16px">Create inter-warehouse dispatch manifest with tracking telemetry.</p>',
        '<form id="zpid-new-transfer-form" style="display:flex;flex-direction:column;gap:12px">',
          '<div>',
            '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Origin Warehouse</label>',
            '<select id="zpid-trf-origin" class="zpid-filter-select" style="width:100%">' + WAREHOUSES.map(function(w){return '<option value="' + esc(w.name) + '">' + esc(w.name) + '</option>';}).join('') + '</select>',
          '</div>',
          '<div>',
            '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Destination Warehouse</label>',
            '<select id="zpid-trf-dest" class="zpid-filter-select" style="width:100%">' + WAREHOUSES.slice(1).map(function(w){return '<option value="' + esc(w.name) + '">' + esc(w.name) + '</option>';}).join('') + '</select>',
          '</div>',
          '<div>',
            '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Select SKU to Transfer</label>',
            '<select id="zpid-trf-sku" class="zpid-filter-select" style="width:100%">' + PRODUCTS.slice(0, 8).map(function(p){return '<option value="' + esc(p.sku) + '">' + esc(p.sku) + ' — ' + esc(p.name) + ' (' + p.stock + ' in stock)</option>';}).join('') + '</select>',
          '</div>',
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">',
            '<div>',
              '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Transfer Quantity</label>',
              '<input type="number" id="zpid-trf-qty" min="1" value="20" class="zpid-search" style="width:100%" required/>',
            '</div>',
            '<div>',
              '<label style="display:block;font-size:11px;color:#94a3b8;margin-bottom:4px">Transport Fleet</label>',
              '<select id="zpid-trf-carrier" class="zpid-filter-select" style="width:100%"><option>Zenve Express Fleet (EV-04)</option><option>BlueDart Cold Chain</option><option>Delhivery Surface Express</option></select>',
            '</div>',
          '</div>',
          '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px">',
            '<button type="button" id="zpid-cancel-modal-btn" class="zpid-btn">Cancel</button>',
            '<button type="submit" class="zpid-btn primary">Dispatch Transfer</button>',
          '</div>',
        '</form>',
      '</div>'
    ].join('');
    document.body.appendChild(div);

    div.querySelector('#zpid-close-modal-btn').onclick = function () { div.remove(); };
    div.querySelector('#zpid-cancel-modal-btn').onclick = function () { div.remove(); };
    div.querySelector('#zpid-new-transfer-form').onsubmit = function (e) {
      e.preventDefault();
      var origin = div.querySelector('#zpid-trf-origin').value;
      var dest = div.querySelector('#zpid-trf-dest').value;
      var sku = div.querySelector('#zpid-trf-sku').value;
      var qty = div.querySelector('#zpid-trf-qty').value;
      var carrier = div.querySelector('#zpid-trf-carrier').value;
      var newId = 'TRF-2026-0' + (895 + TRANSFERS.length);
      TRANSFERS.unshift({
        id: newId,
        origin: origin,
        dest: dest,
        skus: sku + ' (' + qty + ' units)',
        value: 45000,
        carrier: carrier,
        status: 'In Transit',
        temp: carrier.indexOf('Cold') >= 0 ? '4.0°C (Optimal)' : 'Ambient',
        eta: 'Today, 8:00 PM',
        cold: carrier.indexOf('Cold') >= 0
      });
      div.remove();
      showToast('Transfer manifest ' + newId + ' generated successfully!');
      renderAll();
    };
  }

  /* =====================================================================
     VIEW 11: Inventory Movement
     ===================================================================== */
  function renderMovementView() {
    var filtered = S.movementFilter === 'ALL'
      ? MOVEMENTS
      : MOVEMENTS.filter(function (m) {
          if (S.movementFilter === 'Inbound') return m.badge === 'inbound';
          if (S.movementFilter === 'Outbound') return m.badge === 'outbound';
          if (S.movementFilter === 'Transfer') return m.badge === 'transfer';
          if (S.movementFilter === 'Adjustment') return m.badge === 'adjustment' || m.badge === 'return';
          return true;
        });

    var inQty = MOVEMENTS.filter(function (m) { return m.qty > 0 && m.badge === 'inbound'; }).reduce(function (s, m) { return s + m.qty; }, 0);
    var outQty = Math.abs(MOVEMENTS.filter(function (m) { return m.qty < 0; }).reduce(function (s, m) { return s + m.qty; }, 0));
    var netQty = inQty - outQty;

    return [
      '<div class="zpid-kpis">',
        kpi('Inbound Stock Today', inQty + ' units', '3 PO shipments', 'up', '📥'),
        kpi('Outbound Dispatched', outQty + ' units', 'Customer & clinic dispatches', 'neutral', '📤'),
        kpi('Net Stock Delta', (netQty > 0 ? '+' : '') + netQty + ' units', 'Positive network inflow', 'up', '📈'),
        kpi('Adjustment Variance', '2 units', '₹2,400 QC audit write-down', 'warn', '⚖️'),
        kpi('Today Transactions', MOVEMENTS.length + ' Events', 'Real-time ledger synced', 'up', '⚡'),
        kpi('Transit Inflow SLA', '99.1%', 'On-time dock turnaround', 'up', '⏱️'),
      '</div>',

      '<div class="zpid-grid-2">',
        '<div class="zpid-card">',
          '<div class="zpid-ph">',
            '<div><h3>📈 24-Hour Stock Movement Velocity</h3><small>Breakdown of live inventory flows across all operational channels</small></div>',
            '<span class="zpid-badge green">Live Sync</span>',
          '</div>',
          '<div class="zpid-progress-row">',
            '<div class="zpid-progress-item">',
              '<div class="zpid-progress-label"><span style="color:#10b981;font-weight:600">Inbound Supplier GRN</span><span>140 units · 58% Volume</span></div>',
              '<div class="zpid-progress-track"><div class="zpid-progress-fill" style="width:58%;background:#10b981"></div></div>',
            '</div>',
            '<div class="zpid-progress-item">',
              '<div class="zpid-progress-label"><span style="color:#ef4444;font-weight:600">B2C &amp; Clinic Outbound</span><span>56 units · 23% Volume</span></div>',
              '<div class="zpid-progress-track"><div class="zpid-progress-fill" style="width:23%;background:#ef4444"></div></div>',
            '</div>',
            '<div class="zpid-progress-item">',
              '<div class="zpid-progress-label"><span style="color:#38bdf8;font-weight:600">Inter-Hub Stock Transfers</span><span>40 units · 16% Volume</span></div>',
              '<div class="zpid-progress-track"><div class="zpid-progress-fill" style="width:16%;background:#38bdf8"></div></div>',
            '</div>',
            '<div class="zpid-progress-item">',
              '<div class="zpid-progress-label"><span style="color:#f59e0b;font-weight:600">Adjustments &amp; QC Returns</span><span>6 units · 3% Volume</span></div>',
              '<div class="zpid-progress-track"><div class="zpid-progress-fill" style="width:3%;background:#f59e0b"></div></div>',
            '</div>',
          '</div>',
        '</div>',

        '<div class="zpid-card">',
          '<div class="zpid-ph">',
            '<div><h3>⚖️ Warehouse Flow Balancing</h3><small>Net stock accumulation and drain across regional distribution nodes</small></div>',
            '<span class="zpid-badge purple">Balanced Flow</span>',
          '</div>',
          '<div style="padding:16px 18px;display:grid;grid-template-columns:1fr 1fr;gap:12px">',
            '<div style="padding:12px;border-radius:8px;background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.2)">',
              '<div style="font-size:11px;color:#10b981;font-weight:600">Bengaluru Central Hub</div>',
              '<div style="font-size:18px;font-weight:700;color:#f8fafc;margin-top:2px">+90 units net</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">In: 120 · Out: 30 · Ret: 0 · Adj: 0</div>',
            '</div>',
            '<div style="padding:12px;border-radius:8px;background:rgba(56,189,248,0.06);border:1px solid rgba(56,189,248,0.2)">',
              '<div style="font-size:11px;color:#38bdf8;font-weight:600">Delhi NCR Hub</div>',
              '<div style="font-size:18px;font-weight:700;color:#f8fafc;margin-top:2px">+25 units net</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">In: 45 · Out: 20 · Ret: 0 · Adj: 0</div>',
            '</div>',
            '<div style="padding:12px;border-radius:8px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.2)">',
              '<div style="font-size:11px;color:#ef4444;font-weight:600">Mumbai West Hub</div>',
              '<div style="font-size:18px;font-weight:700;color:#f8fafc;margin-top:2px">-10 units net</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">In: 15 · Out: 25 · Ret: 0 · Adj: 0</div>',
            '</div>',
            '<div style="padding:12px;border-radius:8px;background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.2)">',
              '<div style="font-size:11px;color:#c084fc;font-weight:600">Pune Express Hub</div>',
              '<div style="font-size:18px;font-weight:700;color:#f8fafc;margin-top:2px">+15 units net</div>',
              '<div style="font-size:10px;color:#94a3b8;margin-top:2px">In: 20 · Out: 5 · Ret: 0 · Adj: 0</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zpid-card">',
        '<div class="zpid-ph">',
          '<div><h3>📋 Real-Time Movement Ledger</h3><small>Live audit trail of every stock increase, decrease, transfer, and adjustment</small></div>',
          '<div style="display:flex;gap:6px">',
            ['ALL', 'Inbound', 'Outbound', 'Transfer', 'Adjustment'].map(function (typ) {
              return '<button type="button" class="zpid-cat-chip zpid-mov-chip' + (S.movementFilter === typ ? ' on' : '') + '" data-mov="' + typ + '">' + typ + '</button>';
            }).join(''),
          '</div>',
        '</div>',
        '<div class="zpid-table-wrap">',
          '<table class="zpid-table">',
            '<thead><tr>',
              '<th>Movement ID</th><th>Timestamp</th><th>Type</th><th>SKU &amp; Product</th>',
              '<th style="text-align:right">Quantity</th><th>Source ➔ Destination</th>',
              '<th>Ref Doc #</th><th style="text-align:right">Transaction Value</th>',
            '</tr></thead>',
            '<tbody>',
              filtered.length === 0 ? '<tr><td colspan="8" style="padding:24px;text-align:center;color:#94a3b8">No movement records found</td></tr>' : filtered.map(function (item) {
                var isPos = item.qty > 0;
                var qtyColor = isPos ? '#10b981' : '#ef4444';
                var qtySign = isPos ? '+' : '';
                var bgBadge = item.badge === 'inbound' ? 'rgba(16,185,129,0.15)' :
                              item.badge === 'outbound' ? 'rgba(239,68,68,0.15)' :
                              item.badge === 'transfer' ? 'rgba(56,189,248,0.15)' :
                              item.badge === 'return' ? 'rgba(168,85,247,0.15)' : 'rgba(245,158,11,0.15)';
                var txtBadge = item.badge === 'inbound' ? '#10b981' :
                               item.badge === 'outbound' ? '#f87171' :
                               item.badge === 'transfer' ? '#38bdf8' :
                               item.badge === 'return' ? '#c084fc' : '#fbbf24';

                return [
                  '<tr>',
                    '<td style="font-family:\'IBM Plex Mono\',monospace;color:#38bdf8;font-size:11px;font-weight:600">' + esc(item.id) + '</td>',
                    '<td style="color:#94a3b8;font-size:12px">' + esc(item.time) + '</td>',
                    '<td><span style="padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;background:' + bgBadge + ';color:' + txtBadge + '">' + esc(item.type) + '</span></td>',
                    '<td><div style="font-weight:600;color:#f8fafc">' + esc(item.name) + '</div><div style="font-family:\'IBM Plex Mono\',monospace;font-size:10px;color:#64748b">' + esc(item.sku) + '</div></td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-size:13px;font-weight:700;color:' + qtyColor + '">' + qtySign + item.qty + '</td>',
                    '<td style="font-size:12px"><span style="color:#cbd5e1">' + esc(item.source) + '</span> <span style="color:#64748b">➔</span> <span style="color:#38bdf8">' + esc(item.dest) + '</span></td>',
                    '<td style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:#a855f7">' + esc(item.ref) + '</td>',
                    '<td style="text-align:right;font-family:\'IBM Plex Mono\',monospace;font-weight:600;color:#f8fafc">' + inr(item.value) + '</td>',
                  '</tr>'
                ].join('');
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function showManifest(id) {
    var t = TRANSFERS.find(function (it) { return it.id === id; });
    if (!t) return;
    alert('Manifest ' + t.id + '\nRoute: ' + t.origin + ' ➔ ' + t.dest + '\nCarrier: ' + t.carrier + '\nTelemetry: ' + t.temp + '\nValue: ' + inrShort(t.value) + '\nStatus: ' + t.status);
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

  /* ── Check initial hash ───────────────────────────────────────── */
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    var go = function () { setTimeout(function () { open(initialTab); }, 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go);
  }

  /* ── Wire sidebar click-through and global interception ───────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        if (!t.closest('#zpid-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }

    if (S.open) {
      if (t.closest('#zpid-root')) return;
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
      if (btn._zpidWired) return;
      btn._zpidWired = true;
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
  window.ZenveProductsInventory = {
    open: open,
    close: close,
    switchTab: switchTab,
    showManifest: showManifest,
    showNewTransferModal: showNewTransferModal
  };

  /* ── Boot ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); wireSidebar(); });
  } else {
    build();
    wireSidebar();
  }

})();