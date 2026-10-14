/* =====================================================================
   Zenve BI — Vendors & Procurement Domain Control Center & Subdomain Dashboards
   Suite (10 Subdomains):
     1. Vendor Dashboard     (#vendor-dashboard / #vendors-procurement)
     2. All Vendors          (#all-vendors)
     3. Vendor Performance   (#vendor-performance)
     4. Vendor Payments      (#vendor-payments)
     5. Purchase Orders      (#purchase-orders)
     6. Procurement          (#procurement)
     7. Purchase History     (#purchase-history)
     8. Supplier Pricing     (#supplier-pricing)
     9. Supplier Performance (#supplier-performance)
     10. Procurement Savings (#procurement-savings)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 10 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',         label: 'Vendor Dashboard',     icon: '🤝', hash: '#vendor-dashboard',     badge: '',   title: 'Vendors & Procurement Command Center', sub: 'Master supplier network, active purchase orders, fulfillment compliance, and network-wide procurement savings' },
    { id: 'all-vendors',       label: 'All Vendors',          icon: '🏭', hash: '#all-vendors',          badge: '', title: 'Complete Vendor Directory & Supplier Registry', sub: 'Registered suppliers with contacts, spend totals, quality ratings, and GSTIN verification status' },
    { id: 'vendor-perf',       label: 'Vendor Performance',   icon: '📊', hash: '#vendor-performance',   badge: '',    title: 'Vendor Performance Scorecards & SLA Analytics', sub: 'On-time delivery SLA, fill rate, defect rate, lead times, and composite vendor performance scores' },
    { id: 'vendor-pay',        label: 'Vendor Payments',      icon: '💳', hash: '#vendor-payments',      badge: '',   title: 'Vendor Accounts Payable & Payment Scheduling', sub: 'Outstanding invoice aging, 2/10 Net 30 cash discounts, bank UTR disbursements, and payment terms' },
    { id: 'purchase-orders',   label: 'Purchase Orders',      icon: '📑', hash: '#purchase-orders',      badge: '',    title: 'Purchase Order Management & Tracking', sub: 'PO lifecycle tracking: draft creation, department approval, dispatch, transit, and GRN verification' },
    { id: 'procurement',       label: 'Procurement',          icon: '🔄', hash: '#procurement',          badge: '', title: 'Procurement Workflow & Requisition Pipeline', sub: 'End-to-end procurement lifecycle: requisition → approval → vendor negotiation → PO → GRN → 3-way match → payment' },
    { id: 'purchase-history',  label: 'Purchase History',     icon: '📜', hash: '#purchase-history',     badge: '10 POs', title: 'Purchase History & Fulfilled Order Archive', sub: 'Complete ledger of historical purchase orders, fulfillment timelines, invoice audit trail, and multi-hub spend' },
    { id: 'supplier-pricing',  label: 'Supplier Pricing',     icon: '🏷️', hash: '#supplier-pricing',     badge: '',   title: 'Contracted Supplier Pricing & Rate Benchmarking', sub: 'Master SKU pricing schedules, negotiated discounts against MSRP, volume tier rebates, and price lock validity' },
    { id: 'supplier-perf',     label: 'Supplier Performance', icon: '🎯', hash: '#supplier-performance', badge: '',   title: 'Supplier Quality Engineering & SLA Scorecards', sub: 'On-time in-full (OTIF), cold-chain compliance, defect rates (PPM), invoice accuracy, and GMP audit certifications' },
    { id: 'savings',           label: 'Procurement Savings',  icon: '💰', hash: '#procurement-savings',  badge: '', title: 'Procurement Cost Savings & Value Realization', sub: 'Negotiated price variances, bulk volume consolidation rebates, generic substitution arbitrage, and cash discounts' }
  ];

  /* ── Master Datasets ─────────────────────────────────────────────── */
    var VENDORS = [
    { id: 'VEN-001', name: 'Zoetis Animal Health India', gstin: '27AAACZ0821G1ZX', category: 'Vaccines & Biologics', contact: 'Dr. Rajesh Nair', city: 'Mumbai HQ', spend: '₹12,45,000', pos: 14, rating: 'AAA', status: 'Preferred', since: '2022-04', onTime: 99.2, quality: 99.8, fillRate: 98.6, defect: 0.02, lead: '2.1d', compliance: 100, score: 99.2, trend: 'up' },
    { id: 'VEN-002', name: 'MSD Animal Health Pvt Ltd', gstin: '29AABCM4512H1ZQ', category: 'Antiparasitics & Vaccines', contact: 'Priya Sreenivasan', city: 'Bengaluru', spend: '₹10,80,000', pos: 12, rating: 'AAA', status: 'Preferred', since: '2022-06', onTime: 98.9, quality: 99.5, fillRate: 98.2, defect: 0.03, lead: '2.4d', compliance: 100, score: 98.7, trend: 'up' },
    { id: 'VEN-003', name: 'Royal Canin India Pvt Ltd', gstin: '27AABCR8830M1Z5', category: 'Clinical Veterinary Diets', contact: 'Anand Kulkarni', city: 'Mumbai', spend: '₹8,95,000', pos: 16, rating: 'AAA', status: 'Preferred', since: '2022-03', onTime: 98.4, quality: 99.6, fillRate: 97.8, defect: 0.04, lead: '3.2d', compliance: 99, score: 98.1, trend: 'up' },
    { id: 'VEN-004', name: 'Boehringer Ingelheim Vet', gstin: '27AABCB9120N1ZV', category: 'Rx Therapeutics & NSAIDs', contact: 'Vikram Deshmukh', city: 'Mumbai', spend: '₹6,70,000', pos: 10, rating: 'AA+', status: 'Preferred', since: '2022-08', onTime: 98.1, quality: 99.4, fillRate: 97.4, defect: 0.03, lead: '2.8d', compliance: 99, score: 97.8, trend: 'up' },
    { id: 'VEN-005', name: "Hill's Pet Nutrition India", gstin: '06AABCH3391K1ZY', category: 'Clinical Nutrition & Care', contact: 'Neha Malhotra', city: 'Gurugram', spend: '₹5,40,000', pos: 8, rating: 'AA+', status: 'Preferred', since: '2023-01', onTime: 97.8, quality: 99.1, fillRate: 96.9, defect: 0.05, lead: '3.5d', compliance: 98, score: 97.2, trend: 'up' },
    { id: 'VEN-006', name: 'Synthes Vet Orthopedics', gstin: '29AABCS6724L1ZS', category: 'Surgical Implants & Hardware', contact: 'Arvind Sharma', city: 'Bengaluru', spend: '₹4,10,000', pos: 6, rating: 'AA', status: 'Active', since: '2023-03', onTime: 96.5, quality: 99.7, fillRate: 95.8, defect: 0.04, lead: '4.1d', compliance: 98, score: 96.4, trend: 'neutral' },
    { id: 'VEN-007', name: 'Farmina Pet Foods India', gstin: '29AABCF9943P1Z3', category: 'Veterinary Nutrition', contact: 'Rohan Nambiar', city: 'Bengaluru', spend: '₹3,65,000', pos: 7, rating: 'AA', status: 'Active', since: '2023-05', onTime: 97.2, quality: 98.9, fillRate: 96.2, defect: 0.06, lead: '3.0d', compliance: 97, score: 96.1, trend: 'up' },
    { id: 'VEN-008', name: 'Virbac Animal Health India', gstin: '27AABCV1034D1ZU', category: 'Dermatologicals & Anti-Infectives', contact: 'Sameer Patil', city: 'Mumbai', spend: '₹2,95,000', pos: 9, rating: 'AA', status: 'Active', since: '2023-07', onTime: 97.5, quality: 99.0, fillRate: 96.5, defect: 0.05, lead: '2.7d', compliance: 98, score: 96.3, trend: 'up' },
    { id: 'VEN-009', name: 'Intas Pharmaceuticals Vet', gstin: '24AABCI7840E1ZT', category: 'Injectables & Critical Care', contact: 'Harish Solanki', city: 'Ahmedabad', spend: '₹2,15,000', pos: 8, rating: 'A+', status: 'Active', since: '2023-09', onTime: 96.8, quality: 98.7, fillRate: 95.4, defect: 0.07, lead: '3.8d', compliance: 97, score: 95.6, trend: 'neutral' },
    { id: 'VEN-010', name: 'Purina PetCare India', gstin: '06AABCP2290R1ZW', category: 'Clinical Probiotics & Diets', contact: 'Divya Kapoor', city: 'Gurugram', spend: '₹1,65,000', pos: 5, rating: 'A+', status: 'Active', since: '2024-02', onTime: 96.1, quality: 98.5, fillRate: 94.8, defect: 0.08, lead: '4.2d', compliance: 96, score: 95.1, trend: 'up' }
  ];

    var PURCHASE_ORDERS = [
    { id: 'PO-2026-9401', poNumber: 'PO-2026-9401', vendor: 'Zoetis Animal Health India', items: 'Vanguard Plus 5/CV-L Vaccines (500 vials) + Apoquel 16mg (60 btls)', qty: '560 units', value: '₹3,85,000', amount: '₹3,85,000', raised: '2026-10-02', createdDate: '2026-10-02', delivery: '2026-10-06', deliveryEta: '2026-10-06', rcvd: '2026-10-05', approver: 'Dr. Ananya Sen', clinicHub: 'Koramangala Central Hub', priority: 'High', status: 'Fulfilled' },
    { id: 'PO-2026-9402', poNumber: 'PO-2026-9402', vendor: 'MSD Animal Health Pvt Ltd', items: 'Bravecto Chewable 20-40kg (120 packs) + Nobivac Rabies (800 doses)', qty: '920 units', value: '₹4,50,000', amount: '₹4,50,000', raised: '2026-10-04', createdDate: '2026-10-04', delivery: '2026-10-08', deliveryEta: '2026-10-08', rcvd: '2026-10-07', approver: 'Dr. Vikram Deshmukh', clinicHub: 'Indiranagar Hub', priority: 'High', status: 'Fulfilled' },
    { id: 'PO-2026-9403', poNumber: 'PO-2026-9403', vendor: 'Synthes Vet Orthopedics', items: 'Titanium TPLO Locking Plates 3.5mm + Cortical Screws (Kit of 40)', qty: '40 kits', value: '₹2,75,000', amount: '₹2,75,000', raised: '2026-10-06', createdDate: '2026-10-06', delivery: '2026-10-10', deliveryEta: '2026-10-10', rcvd: '2026-10-09', approver: 'Dr. Rajesh K', clinicHub: 'Indiranagar Surgery Hub', priority: 'Critical', status: 'GRN Verified' },
    { id: 'PO-2026-9404', poNumber: 'PO-2026-9404', vendor: 'Royal Canin India Pvt Ltd', items: 'Gastrointestinal High Energy 15kg (80 bags) + Hepatic Vet Diet (50 bags)', qty: '130 bags', value: '₹5,40,000', amount: '₹5,40,000', raised: '2026-10-08', createdDate: '2026-10-08', delivery: '2026-10-12', deliveryEta: '2026-10-12', rcvd: 'In Transit', approver: 'Priya Sharma', clinicHub: 'Central Warehouse Bengaluru', priority: 'Standard', status: 'Dispatched' },
    { id: 'PO-2026-9405', poNumber: 'PO-2026-9405', vendor: 'Boehringer Ingelheim Vet', items: 'NexGard Spectra 15-30kg (150 boxes) + Metacam 1.5mg/ml Oral (80 btls)', qty: '230 units', value: '₹3,15,000', amount: '₹3,15,000', raised: '2026-10-09', createdDate: '2026-10-09', delivery: '2026-10-13', deliveryEta: '2026-10-13', rcvd: 'In Transit', approver: 'Dr. Ananya Sen', clinicHub: 'Whitefield Hub', priority: 'High', status: 'Dispatched' },
    { id: 'PO-2026-9406', poNumber: 'PO-2026-9406', vendor: "Hill's Pet Nutrition India", items: 'Prescription Diet k/d Renal Health 12kg (60 bags) + c/d Urinary (50 bags)', qty: '110 bags', value: '₹3,90,000', amount: '₹3,90,000', raised: '2026-10-10', createdDate: '2026-10-10', delivery: '2026-10-14', deliveryEta: '2026-10-14', rcvd: 'Awaiting Dispatch', approver: 'Priya Sharma', clinicHub: 'Central Warehouse Bengaluru', priority: 'Standard', status: 'Approved' },
    { id: 'PO-2026-9407', poNumber: 'PO-2026-9407', vendor: 'Virbac Animal Health India', items: 'Clavamox Palatable Drops (100 btls) + Epiotic Ear Cleanser (200 btls)', qty: '300 btls', value: '₹1,85,000', amount: '₹1,85,000', raised: '2026-10-11', createdDate: '2026-10-11', delivery: '2026-10-15', deliveryEta: '2026-10-15', rcvd: 'Processing', approver: 'Dr. Vikram Deshmukh', clinicHub: 'HSR Layout Hub', priority: 'Medium', status: 'Approved' },
    { id: 'PO-2026-9408', poNumber: 'PO-2026-9408', vendor: 'Intas Pharmaceuticals Vet', items: 'Melonex Plus Inj 100ml (150 vials) + Ceftriaxone Vet 3g (250 vials)', qty: '400 vials', value: '₹1,45,000', amount: '₹1,45,000', raised: '2026-10-11', createdDate: '2026-10-11', delivery: '2026-10-16', deliveryEta: '2026-10-16', rcvd: 'Order Confirmed', approver: 'Dr. Rajesh K', clinicHub: 'Malleshwaram Hub', priority: 'Standard', status: 'Approved' },
    { id: 'PO-2026-9409', poNumber: 'PO-2026-9409', vendor: 'Farmina Pet Foods India', items: 'Vet Life Gastrointestinal 10kg (40 bags) + Vet Life Obesity (30 bags)', qty: '70 bags', value: '₹2,10,000', amount: '₹2,10,000', raised: '2026-10-12', createdDate: '2026-10-12', delivery: '2026-10-17', deliveryEta: '2026-10-17', rcvd: 'Stock Allocated', approver: 'Priya Sharma', clinicHub: 'JP Nagar Hub', priority: 'Standard', status: 'Approved' },
    { id: 'PO-2026-9410', poNumber: 'PO-2026-9410', vendor: 'Purina PetCare India', items: 'Pro Plan Veterinary Diets FortiFlora Probiotic (120 boxes) + HA Diet (25 bags)', qty: '145 units', value: '₹1,65,000', amount: '₹1,65,000', raised: '2026-10-13', createdDate: '2026-10-13', delivery: '2026-10-18', deliveryEta: '2026-10-18', rcvd: 'In Transit', approver: 'Dr. Ananya Sen', clinicHub: 'Koramangala Central Hub', priority: 'Medium', status: 'Dispatched' }
  ];

    var PAYMENTS = [
    { id: 'PAY-8901', invoiceNo: 'INV-ZOE-9102', vendor: 'Zoetis Animal Health India', poRef: 'PO-2026-9401', po: 'PO-2026-9401', amount: '₹3,85,000', gst: '₹69,300', tds: '₹7,700', due: '2026-10-20', dueDate: '2026-10-20', cashDiscount: '₹7,700', terms: '2/10 Net 30', bank: 'HDFC Bank', bankRef: 'HDFCR52026101201', method: 'RTGS', status: 'Paid' },
    { id: 'PAY-8902', invoiceNo: 'INV-MSD-4419', vendor: 'MSD Animal Health Pvt Ltd', poRef: 'PO-2026-9402', po: 'PO-2026-9402', amount: '₹4,50,000', gst: '₹81,000', tds: '₹9,000', due: '2026-10-22', dueDate: '2026-10-22', cashDiscount: '₹9,000', terms: '2/10 Net 30', bank: 'ICICI Bank', bankRef: 'ICICN0926101402', method: 'NEFT', status: 'Paid' },
    { id: 'PAY-8903', invoiceNo: 'INV-SYN-1109', vendor: 'Synthes Vet Orthopedics', poRef: 'PO-2026-9403', po: 'PO-2026-9403', amount: '₹2,75,000', gst: '₹49,500', tds: '₹5,500', due: '2026-10-24', dueDate: '2026-10-24', cashDiscount: '₹5,500', terms: '2/10 Net 30', bank: 'HDFC CMS', bankRef: 'CMS-SCH-9403', method: 'RTGS', status: 'Scheduled' },
    { id: 'PAY-8904', invoiceNo: 'INV-RC-5520', vendor: 'Royal Canin India Pvt Ltd', poRef: 'PO-2026-9404', po: 'PO-2026-9404', amount: '₹5,40,000', gst: '₹97,200', tds: '₹10,800', due: '2026-10-26', dueDate: '2026-10-26', cashDiscount: '₹10,800', terms: '2/10 Net 30', bank: 'HDFC CMS', bankRef: 'CMS-SCH-9404', method: 'RTGS', status: 'Scheduled' },
    { id: 'PAY-8905', invoiceNo: 'INV-BI-7712', vendor: 'Boehringer Ingelheim Vet', poRef: 'PO-2026-9405', po: 'PO-2026-9405', amount: '₹3,15,000', gst: '₹56,700', tds: '₹6,300', due: '2026-10-28', dueDate: '2026-10-28', cashDiscount: '₹6,300', terms: 'Net 30', bank: 'ICICI Bank', bankRef: 'CMS-PEND-9405', method: 'NEFT', status: 'Pending' },
    { id: 'PAY-8906', invoiceNo: 'INV-HIL-8841', vendor: "Hill's Pet Nutrition India", poRef: 'PO-2026-9406', po: 'PO-2026-9406', amount: '₹3,90,000', gst: '₹70,200', tds: '₹7,800', due: '2026-10-30', dueDate: '2026-10-30', cashDiscount: '₹7,800', terms: 'Net 30', bank: 'HDFC CMS', bankRef: 'CMS-PEND-9406', method: 'NEFT', status: 'Pending' },
    { id: 'PAY-8907', invoiceNo: 'INV-VIR-3301', vendor: 'Virbac Animal Health India', poRef: 'PO-2026-9407', po: 'PO-2026-9407', amount: '₹1,85,000', gst: '₹33,300', tds: '₹3,700', due: '2026-11-02', dueDate: '2026-11-02', cashDiscount: '₹3,700', terms: 'Net 30', bank: 'Axis Bank', bankRef: 'CMS-PEND-9407', method: 'NEFT', status: 'Pending' },
    { id: 'PAY-8908', invoiceNo: 'INV-INT-9904', vendor: 'Intas Pharmaceuticals Vet', poRef: 'PO-2026-9408', po: 'PO-2026-9408', amount: '₹1,45,000', gst: '₹26,100', tds: '₹2,900', due: '2026-11-04', dueDate: '2026-11-04', cashDiscount: '₹2,900', terms: 'Net 30', bank: 'HDFC Bank', bankRef: 'CMS-PEND-9408', method: 'RTGS', status: 'Pending' },
    { id: 'PAY-8909', invoiceNo: 'INV-FAR-6623', vendor: 'Farmina Pet Foods India', poRef: 'PO-2026-9409', po: 'PO-2026-9409', amount: '₹2,10,000', gst: '₹37,800', tds: '₹4,200', due: '2026-11-06', dueDate: '2026-11-06', cashDiscount: '₹4,200', terms: 'Net 30', bank: 'ICICI Bank', bankRef: 'CMS-PEND-9409', method: 'NEFT', status: 'Pending' },
    { id: 'PAY-8910', invoiceNo: 'INV-PUR-2218', vendor: 'Purina PetCare India', poRef: 'PO-2026-9410', po: 'PO-2026-9410', amount: '₹1,65,000', gst: '₹29,700', tds: '₹3,300', due: '2026-11-08', dueDate: '2026-11-08', cashDiscount: '₹3,300', terms: 'Net 30', bank: 'HDFC CMS', bankRef: 'CMS-PEND-9410', method: 'NEFT', status: 'Pending' }
  ];

    var REQUISITIONS = [
    { id: 'REQ-2026-0501', department: 'Surgery OT — Indiranagar', item: 'Titanium Orthopedic Bone Plates 2.7mm/3.5mm', qty: '25 kits', urgency: 'Critical', requestedBy: 'Dr. Rajesh K', created: '2026-10-10', status: 'PO Raised' },
    { id: 'REQ-2026-0502', department: '24x7 Emergency & ICU — Koramangala', item: 'Ceftriaxone + Sulbactam 3.0g Injectable Vials', qty: '200 vials', urgency: 'Critical', requestedBy: 'Dr. Ananya Sen', created: '2026-10-11', status: 'PO Raised' },
    { id: 'REQ-2026-0503', department: 'Pharmacy Central Hub — Bengaluru', item: 'Bravecto Chewable Tablets for Dogs (All Weight Bands)', qty: '150 packs', urgency: 'High', requestedBy: 'K. Sunder', created: '2026-10-11', status: 'PO Raised' },
    { id: 'REQ-2026-0504', department: 'Clinical Pathology Lab — Indiranagar', item: 'IDEXX Catalyst Chemistry Reagent Clips (Chem 17 + Lyte 4)', qty: '40 boxes', urgency: 'High', requestedBy: 'Dr. Meera N', created: '2026-10-12', status: 'In Approval' },
    { id: 'REQ-2026-0505', department: 'Inpatient & Critical Care — Whitefield', item: 'Ringers Lactate + Normal Saline IV Fluids 500ml', qty: '500 bottles', urgency: 'High', requestedBy: 'Nurse Supriya', created: '2026-10-12', status: 'In Approval' },
    { id: 'REQ-2026-0506', department: 'Nutrition & Preventive Wellness — HSR Hub', item: 'Royal Canin Hypoallergenic Hydrolyzed Protein 7kg', qty: '45 bags', urgency: 'Medium', requestedBy: 'Dr. Sneha V', created: '2026-10-12', status: 'Received' },
    { id: 'REQ-2026-0507', department: 'Dermatology OPD — JP Nagar Hub', item: 'Apoquel (Oclacitinib) 5.4mg & 16mg Tablets', qty: '80 bottles', urgency: 'High', requestedBy: 'Dr. Kavita Rao', created: '2026-10-13', status: 'In Approval' },
    { id: 'REQ-2026-0508', department: 'Dental Suite — Malleshwaram Hub', item: 'Ultrasonic Scaler Inserts & Dental Prophy Paste', qty: '15 sets', urgency: 'Medium', requestedBy: 'Dr. Arjun Patel', created: '2026-10-13', status: 'Pending' },
    { id: 'REQ-2026-0509', department: 'Grooming & Medicated Spa — Indiranagar', item: 'Malaseb Medicated Antifungal Shampoo 250ml', qty: '120 bottles', urgency: 'Low', requestedBy: 'Pooja Nair', created: '2026-10-14', status: 'Pending' },
    { id: 'REQ-2026-0510', department: 'Cardiology & Imaging — Koramangala', item: 'Vetmedin (Pimobendan) 1.25mg & 5mg Chewable', qty: '60 boxes', urgency: 'High', requestedBy: 'Dr. Vikram Deshmukh', created: '2026-10-14', status: 'Pending' }
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    vendorFilter: 'ALL',
    vendorSearch: '',
    perfSort: 'score',
    poFilter: 'ALL',
    poSearch: '',
    historySearch: '',
    pricingCategory: 'ALL',
    pricingSearch: '',
    supplierQbrFilter: 'ALL',
    savingsLeverFilter: 'ALL'
  };

  var root = null;

  /* ── Routing Resolution ──────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('clinic') >= 0 || h.indexOf('pharmacy') >= 0 || h.indexOf('finance') >= 0 || h.indexOf('marketing') >= 0) {
      return null;
    }
    if (h === 'vendor-dashboard' || h === 'vendors-procurement' || h === 'vendor' || h === 'vendors' || h === 'procurement-dashboard') return 'dashboard';
    if (h === 'all-vendors' || h === 'vendors-list' || h === 'vendor-list') return 'all-vendors';
    if (h === 'vendor-performance' || h === 'vendor-sla') return 'vendor-perf';
    if (h === 'vendor-payments' || h === 'vendor-payment') return 'vendor-pay';
    if (h === 'purchase-orders' || h === 'purchase-order' || h === 'po') return 'purchase-orders';
    if (h === 'procurement' || h === 'requisitions') return 'procurement';
    if (h === 'purchase-history' || h === 'po-history') return 'purchase-history';
    if (h === 'supplier-pricing' || h === 'pricing') return 'supplier-pricing';
    if (h === 'supplier-performance' || h === 'supplier-perf') return 'supplier-perf';
    if (h === 'procurement-savings' || h === 'savings') return 'savings';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('finance') >= 0 || raw.indexOf('marketing') >= 0) return null;

    if (raw === 'vendor dashboard' || raw === 'vendors & procurement' || raw === 'vendors and procurement' || raw === 'vendor relations & procurement') return 'dashboard';
    if (raw === 'all vendors' || raw === 'vendor directory') return 'all-vendors';
    if (raw === 'vendor performance') return 'vendor-perf';
    if (raw === 'vendor payments') return 'vendor-pay';
    if (raw === 'purchase orders' || raw === 'purchase order') return 'purchase-orders';
    if (raw === 'procurement') return 'procurement';
    if (raw === 'purchase history') return 'purchase-history';
    if (raw === 'supplier pricing') return 'supplier-pricing';
    if (raw === 'supplier performance') return 'supplier-perf';
    if (raw === 'procurement savings') return 'savings';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zvp-kpi">',
        '<div class="zvp-kpi-top">',
          '<span class="zvp-kpi-label">' + esc(label) + '</span>',
          '<span class="zvp-kpi-icon">' + esc(icon || '🤝') + '</span>',
        '</div>',
        '<div class="zvp-kpi-val">' + esc(val) + '</div>',
        '<div class="zvp-kpi-bottom">',
          '<span class="zvp-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zvp-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab Renderers ───────────────────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Active Suppliers', '24 Vendors', '+3 YoY', 'up', '6 Preferred / 18 Active', '🏭'),
        kpiHtml('Open Purchase Orders', '₹14.85 Lakhs', '6 Active POs', 'up', '4 in transit to hubs', '📑'),
        kpiHtml('Procurement Savings', '₹6.42 Lakhs', '+12.1% of spend', 'up', '5 strategic levers', '💰'),
        kpiHtml('Vendor On-Time SLA', '98.4%', '+1.2% MoM', 'up', 'Delivery compliance', '⏱️'),
        kpiHtml('3-Way Match Rate', '99.2%', '+0.4% MoM', 'up', 'PO-GRN-Invoice matched', '🎯'),
        kpiHtml('Upcoming AP Payouts', '₹8.15 Lakhs', 'Next 7 days', 'neutral', 'Cash discounts captured', '💳'),
      '</div>',

      '<div class="zvp-grid-2">',
        '<div class="zvp-card">',
          '<div class="zvp-card-head">',
            '<div>',
              '<h3 class="zvp-card-title">🏢 Primary Pharmaceutical & Surgical Partners</h3>',
              '<p class="zvp-card-sub">Top suppliers driving 78% of Zenve Pets clinical inventory spend</p>',
            '</div>',
            '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showPOModal()">+ New PO</button>',
          '</div>',
          '<div class="zvp-table-wrap">',
            '<table class="zvp-table">',
              '<thead><tr><th>Supplier</th><th>Category</th><th>Spend (YTD)</th><th>Active POs</th><th>Rating</th><th>Status</th></tr></thead>',
              '<tbody>',
                (VENDORS.length ? VENDORS.slice(0, 5).map(function (v) {
                  return '<tr>' +
                    '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(v.name) + '</td>' +
                    '<td style="color:var(--muted-foreground,#64748b);">' + esc(v.category) + '</td>' +
                    '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(v.spend) + '</td>' +
                    '<td style="color:var(--foreground,#334155);">' + esc(v.pos) + ' POs</td>' +
                    '<td><span class="zvp-tag purple">' + esc(v.rating) + '</span></td>' +
                    '<td><span class="zvp-tag green">' + esc(v.status) + '</span></td>' +
                  '</tr>';
                }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No supplier partner records found</td></tr>'),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',

        '<div class="zvp-card">',
          '<div class="zvp-card-head">',
            '<div>',
              '<h3 class="zvp-card-title">🔄 Active Procurement Pipeline</h3>',
              '<p class="zvp-card-sub">Requisition velocity and fulfillment milestones across all clinic hubs</p>',
            '</div>',
            '<button class="zvp-btn" onclick="ZenveVendorsDashboard.switchTab(\'procurement\')">View Requisitions</button>',
          '</div>',
          '<div style="display:grid;gap:10px;">',
            '<div class="zvp-pipeline-stage" style="border-left-color:#a78bfa;">',
              '<div style="display:flex;justify-content:space-between;font-size:12px;"><strong>Stage 1: Requisitions</strong><span style="color:#a78bfa;font-weight:700;">3 Requests · ₹4,10,000</span></div>',
              '<div style="font-size:11px;color:var(--muted-foreground,#64748b);">Surgery OT, Koramangala 24x7, and Central Hub approvals pending</div>',
            '</div>',
            '<div class="zvp-pipeline-stage" style="border-left-color:#38bdf8;">',
              '<div style="display:flex;justify-content:space-between;font-size:12px;"><strong>Stage 2: POs Issued & Dispatched</strong><span style="color:#38bdf8;font-weight:700;">4 POs · ₹12,10,000</span></div>',
              '<div style="font-size:11px;color:var(--muted-foreground,#64748b);">Direct-to-hub shipments in transit from Mumbai, Bengaluru, and Hyderabad</div>',
            '</div>',
            '<div class="zvp-pipeline-stage" style="border-left-color:#34d399;">',
              '<div style="display:flex;justify-content:space-between;font-size:12px;"><strong>Stage 3: GRN Verification & 3-Way Match</strong><span style="color:#34d399;font-weight:700;">3 POs · ₹11,10,000</span></div>',
              '<div style="font-size:11px;color:var(--muted-foreground,#64748b);">Barcode scanned, cold chain integrity verified (2°C - 8°C), invoice matched</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAllVendors() {
    var search = S.vendorSearch.toLowerCase();
    var filtered = VENDORS.filter(function (v) {
      if (S.vendorFilter !== 'ALL' && v.status !== S.vendorFilter) return false;
      if (search && (v.name.toLowerCase().indexOf(search) === -1 && v.category.toLowerCase().indexOf(search) === -1 && v.city.toLowerCase().indexOf(search) === -1 && v.gstin.toLowerCase().indexOf(search) === -1)) return false;
      return true;
    });

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Registered Vendors', '24 Vendors', '12 cities covered', 'up', 'Nationwide network', '🏭'),
        kpiHtml('Preferred AAA Vendors', '6 Suppliers', 'AAA & AA+ rated', 'up', 'Priority allocation', '⭐'),
        kpiHtml('Active Geographies', '12 Hub Cities', 'Across 4 zones', 'up', 'Cold chain enabled', '📍'),
        kpiHtml('Avg. Supplier Tenure', '22 Months', 'Low turnover (<4%)', 'up', 'Strategic alliances', '🤝'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">🏭 Verified Supplier Directory</h3>',
            '<p class="zvp-card-sub">Master vendor records with GSTIN verification, contact leads, spend and SLA rating</p>',
          '</div>',
          '<div class="zvp-filter-row">',
            '<input type="text" class="zvp-input" placeholder="Search supplier, GSTIN, city..." value="' + esc(S.vendorSearch) + '" oninput="ZenveVendorsDashboard.setVendorSearch(this.value)" />',
            '<select class="zvp-select" onchange="ZenveVendorsDashboard.setVendorFilter(this.value)">',
              '<option value="ALL"' + (S.vendorFilter === 'ALL' ? ' selected' : '') + '>All Statuses</option>',
              '<option value="Preferred"' + (S.vendorFilter === 'Preferred' ? ' selected' : '') + '>Preferred</option>',
              '<option value="Active"' + (S.vendorFilter === 'Active' ? ' selected' : '') + '>Active</option>',
            '</select>',
            '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showRegisterVendorModal()">+ Register Vendor</button>',
          '</div>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>Vendor ID</th><th>Company Name</th><th>GSTIN</th><th>Category</th><th>Key Contact</th><th>Hub City</th><th>Spend (YTD)</th><th>Rating</th><th>Status</th></tr></thead>',
            '<tbody>',
              (filtered.length ? filtered.map(function (v) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;">' + esc(v.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(v.name) + '</td>' +
                  '<td style="font-family:monospace;color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(v.gstin) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(v.category) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(v.contact) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(v.city) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(v.spend) + '</td>' +
                  '<td><span class="zvp-tag purple">' + esc(v.rating) + '</span></td>' +
                  '<td><span class="zvp-tag ' + (v.status === 'Preferred' ? 'green' : 'blue') + '">' + esc(v.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="9" style="text-align:center;padding:24px;color:#94a3b8;">No registered vendor records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderVendorPerformance() {
    var sorted = VENDORS.slice().sort(function (a, b) {
      return b[S.perfSort] - a[S.perfSort];
    });

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Avg. On-Time Delivery', '98.4%', '+1.2% MoM', 'up', 'Benchmark: 95.0%', '⏱️'),
        kpiHtml('Avg. Fill Rate', '97.2%', '+0.8% MoM', 'up', 'Complete deliveries', '📦'),
        kpiHtml('Avg. Quality Defect Rate', '0.04%', '-0.02% MoM', 'up', 'Pharma & sterile specs', '🎯'),
        kpiHtml('Avg. Order Lead Time', '3.1 Days', '-0.5d improvement', 'up', 'Direct to hub SLA', '🚛'),
        kpiHtml('Top Tier SLA Score', '99.2 / 100', 'Zoetis India', 'up', 'Rank #1 composite', '⭐'),
        kpiHtml('Below Target Vendors', '0 Vendors', 'All >= 95%', 'up', '100% compliance', '✅'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">📊 Vendor Composite Scoreboard</h3>',
            '<p class="zvp-card-sub">Composite Score = On-Time Delivery (35%) + Quality (30%) + Fill Rate (25%) + Regulatory Compliance (10%)</p>',
          '</div>',
          '<div class="zvp-filter-row">',
            '<span style="font-size:12px;color:var(--muted-foreground,#64748b);">Sort by:</span>',
            '<button class="zvp-btn ' + (S.perfSort === 'score' ? 'primary' : '') + '" onclick="ZenveVendorsDashboard.setPerfSort(\'score\')">Composite Score</button>',
            '<button class="zvp-btn ' + (S.perfSort === 'onTime' ? 'primary' : '') + '" onclick="ZenveVendorsDashboard.setPerfSort(\'onTime\')">On-Time %</button>',
            '<button class="zvp-btn ' + (S.perfSort === 'quality' ? 'primary' : '') + '" onclick="ZenveVendorsDashboard.setPerfSort(\'quality\')">Quality %</button>',
            '<button class="zvp-btn ' + (S.perfSort === 'fillRate' ? 'primary' : '') + '" onclick="ZenveVendorsDashboard.setPerfSort(\'fillRate\')">Fill Rate %</button>',
          '</div>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>Vendor Name</th><th>Category</th><th>On-Time %</th><th>Quality %</th><th>Fill Rate %</th><th>Composite Score</th><th>Rating</th><th>SLA Action</th></tr></thead>',
            '<tbody>',
              (sorted.length ? sorted.map(function (v) {
                var scoreColor = v.score >= 98 ? '#34d399' : v.score >= 95 ? '#38bdf8' : '#fbbf24';
                return '<tr>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(v.name) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(v.category) + '</td>' +
                  '<td style="font-weight:700;color:var(--foreground,#334155);">' + esc(v.onTime) + '%</td>' +
                  '<td style="font-weight:700;color:var(--foreground,#334155);">' + esc(v.quality) + '%</td>' +
                  '<td style="font-weight:700;color:var(--foreground,#334155);">' + esc(v.fillRate) + '%</td>' +
                  '<td style="font-family:monospace;font-size:13px;font-weight:800;color:' + scoreColor + ';">' + esc(v.score) + ' / 100</td>' +
                  '<td><span class="zvp-tag purple">' + esc(v.rating) + '</span></td>' +
                  '<td><button class="zvp-btn" style="height:26px;padding:2px 8px;font-size:11px;" onclick="alert(\'Detailed scorecard audit for ' + esc(v.name) + ' generated.\')">Audit Review</button></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="8" style="text-align:center;padding:24px;color:#94a3b8;">No vendor performance records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderVendorPayments() {
    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Total Outstanding AP', '₹22.25 Lakhs', '8 Invoices', 'neutral', 'Current billing cycle', '💳'),
        kpiHtml('Due This Week (<7d)', '₹8.15 Lakhs', '3 Invoices', 'neutral', 'Scheduled for payment', '⏳'),
        kpiHtml('Cash Discounts Captured', '₹68,000', '92.5% captured', 'up', '2/10 Net 30 terms', '⚡'),
        kpiHtml('Avg. Payment Cycle (DPO)', '26.4 Days', '-3.6d vs terms', 'up', 'Contractual Net 30', '⏱️'),
        kpiHtml('Electronic Payment SLA', '100%', 'RTGS & NEFT CMS', 'up', 'Zero cheque payouts', '🏦'),
        kpiHtml('Pending 3-Way Match', '₹0', '100% verified', 'up', 'Zero invoice holds', '📑'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">💳 Accounts Payable & Disbursement Schedule</h3>',
            '<p class="zvp-card-sub">Verified vendor tax invoices, contractual credit terms, and cash discount realization</p>',
          '</div>',
          '<button class="zvp-btn success" onclick="alert(\'Initiating HDFC CMS batch payout for scheduled invoices (₹9,97,000)...\')">⚡ Authorize Batch Payout</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>Invoice No</th><th>Vendor Name</th><th>PO Ref</th><th>Invoice Amount</th><th>Due Date</th><th>Cash Discount</th><th>Credit Terms</th><th>Bank UTR / Rail</th><th>Status</th></tr></thead>',
            '<tbody>',
              (PAYMENTS.length ? PAYMENTS.map(function (p) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;font-weight:600;">' + esc(p.invoiceNo) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(p.vendor) + '</td>' +
                  '<td style="font-family:monospace;color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(p.poRef) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:var(--foreground,#0f172a);">' + esc(p.amount) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(p.dueDate) + '</td>' +
                  '<td style="color:#34d399;font-weight:600;">' + esc(p.cashDiscount) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(p.terms) + '</td>' +
                  '<td style="font-family:monospace;color:#a78bfa;font-size:11px;">' + esc(p.bankRef) + '</td>' +
                  '<td><span class="zvp-tag ' + (p.status === 'Scheduled' ? 'blue' : p.status === 'Approved' ? 'green' : 'amber') + '">' + esc(p.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="9" style="text-align:center;padding:24px;color:#94a3b8;">No vendor payment records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPurchaseOrders() {
    var search = S.poSearch.toLowerCase();
    var filtered = PURCHASE_ORDERS.filter(function (po) {
      if (S.poFilter !== 'ALL' && po.status !== S.poFilter) return false;
      if (search && (po.poNumber.toLowerCase().indexOf(search) === -1 && po.vendor.toLowerCase().indexOf(search) === -1 && po.items.toLowerCase().indexOf(search) === -1 && po.clinicHub.toLowerCase().indexOf(search) === -1)) return false;
      return true;
    });

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Open Purchase Orders', '6 Active POs', '₹14.85 Lakhs', 'up', 'Oct 2026 active pipeline', '📑'),
        kpiHtml('POs in Transit', '3 POs', '₹10.20 Lakhs', 'up', 'En route to hubs', '🚛'),
        kpiHtml('GRN Verified (MTD)', '4 POs', '100% audit pass', 'up', 'Cold chain verified', '✅'),
        kpiHtml('Urgent OT Ortho Orders', '1 PO', '₹2.75 Lakhs', 'up', 'Synthes TPLO implants', '🚨'),
        kpiHtml('Avg. Approval Duration', '1.8 Hours', '-0.6h improvement', 'up', 'Paperless ERP approval', '⏱️'),
        kpiHtml('Fulfillment Accuracy', '99.4%', 'Zero wrong SKUs', 'up', 'Barcode scan validation', '🎯'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">📑 Purchase Order Ledger & Tracking</h3>',
            '<p class="zvp-card-sub">Live status of orders issued to pharmaceutical, dietary, and surgical implant vendors</p>',
          '</div>',
          '<div class="zvp-filter-row">',
            '<input type="text" class="zvp-input" placeholder="Search PO, vendor, item, hub..." value="' + esc(S.poSearch) + '" oninput="ZenveVendorsDashboard.setPoSearch(this.value)" />',
            '<select class="zvp-select" onchange="ZenveVendorsDashboard.setPoFilter(this.value)">',
              '<option value="ALL"' + (S.poFilter === 'ALL' ? ' selected' : '') + '>All Statuses</option>',
              '<option value="Dispatched"' + (S.poFilter === 'Dispatched' ? ' selected' : '') + '>Dispatched</option>',
              '<option value="Approved"' + (S.poFilter === 'Approved' ? ' selected' : '') + '>Approved</option>',
              '<option value="GRN Verified"' + (S.poFilter === 'GRN Verified' ? ' selected' : '') + '>GRN Verified</option>',
              '<option value="Fulfilled"' + (S.poFilter === 'Fulfilled' ? ' selected' : '') + '>Fulfilled</option>',
            '</select>',
            '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showPOModal()">+ Create PO</button>',
          '</div>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>PO Number</th><th>Vendor Name</th><th>Line Items Description</th><th>Total Value</th><th>Created Date</th><th>Delivery ETA</th><th>Receiving Hub</th><th>Priority</th><th>Status</th></tr></thead>',
            '<tbody>',
              (filtered.length ? filtered.map(function (po) {
                var priColor = po.priority === 'Critical' ? 'red' : po.priority === 'High' ? 'amber' : 'gray';
                var statColor = po.status === 'Fulfilled' ? 'green' : po.status === 'Dispatched' ? 'blue' : po.status === 'GRN Verified' ? 'purple' : 'amber';
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;font-weight:600;">' + esc(po.poNumber) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(po.vendor) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(po.items) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(po.amount) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(po.createdDate) + '</td>' +
                  '<td style="color:var(--foreground,#334155);font-weight:500;">' + esc(po.deliveryEta) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(po.clinicHub) + '</td>' +
                  '<td><span class="zvp-tag ' + priColor + '">' + esc(po.priority) + '</span></td>' +
                  '<td><span class="zvp-tag ' + statColor + '">' + esc(po.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="9" style="text-align:center;padding:24px;color:#94a3b8;">No purchase order records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderProcurement() {
    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Total Requisitions', '43 Requests', '+8 vs last month', 'up', 'Cross 6 clinic hubs', '📋'),
        kpiHtml('POs Issued (MTD)', '18 POs', '₹38.5 Lakhs value', 'up', 'Oct 2026 cycle', '📑'),
        kpiHtml('Requisition to PO Time', '1.6 Days', '-0.8d improvement', 'up', 'Fast-track workflows', '⏱️'),
        kpiHtml('3-Way Match Rate', '99.2%', '+0.4% MoM', 'up', 'PO-GRN-Invoice matched', '🎯'),
        kpiHtml('Urgent Requisitions', '2 Urgent', 'OT & ICU fast-track', 'up', '100% on schedule', '🚨'),
        kpiHtml('Cycle Cost Savings', '₹6.42 Lakhs', '+12.1% of spend', 'up', 'Negotiation & volume', '💰'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">📋 Active Department Requisitions</h3>',
            '<p class="zvp-card-sub">Clinical departments and pharmacy hub requests undergoing procurement review</p>',
          '</div>',
          '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showRequisitionModal()">+ New Requisition</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>Req ID</th><th>Department</th><th>Requested Item</th><th>Qty</th><th>Urgency</th><th>Requested By</th><th>Created</th><th>Status</th><th>Action</th></tr></thead>',
            '<tbody>',
              (REQUISITIONS.length ? REQUISITIONS.map(function (r) {
                var urgClass = r.urgency === 'Critical' ? 'red' : r.urgency === 'High' ? 'amber' : r.urgency === 'Medium' ? 'blue' : 'gray';
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;font-weight:600;">' + esc(r.id) + '</td>' +
                  '<td style="font-weight:500;color:var(--foreground,#334155);">' + esc(r.department) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(r.item) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(r.qty) + '</td>' +
                  '<td><span class="zvp-tag ' + urgClass + '">' + esc(r.urgency) + '</span></td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(r.requestedBy) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(r.created) + '</td>' +
                  '<td><span class="zvp-tag ' + (r.status === 'Received' ? 'green' : r.status === 'PO Raised' ? 'blue' : 'purple') + '">' + esc(r.status) + '</span></td>' +
                  '<td><button class="zvp-btn" style="height:26px;padding:2px 8px;font-size:11px;" onclick="alert(\'Requisition ' + esc(r.id) + ' approved and routed to PO creation.\')">Approve</button></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="9" style="text-align:center;padding:24px;color:#94a3b8;">No requisition records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPurchaseHistory() {
    var historyList = [
      { po: 'PO-2024-8801', vendor: 'Zoetis Animal Health India', cat: 'Vaccines & Biologics', val: '₹4,85,000', delivered: '2024-08-12', hub: 'Bengaluru Indiranagar Hub', inv: 'INV-ZOE-9102', paid: '2024-08-22', status: 'Settled & Audited' },
      { po: 'PO-2024-8802', vendor: 'MSD Animal Health Pvt Ltd', cat: 'Vaccines & Biologics', val: '₹6,20,000', delivered: '2024-08-10', hub: 'Bengaluru Koramangala Hub', inv: 'INV-MSD-4419', paid: '2024-08-20', status: 'Settled & Audited' },
      { po: 'PO-2024-8803', vendor: 'Boehringer Ingelheim Vet', cat: 'Rx Pharmaceuticals', val: '₹3,40,000', delivered: '2024-08-05', hub: 'Bengaluru Whitefield Hub', inv: 'INV-BI-7712', paid: '2024-08-15', status: 'Settled & Audited' },
      { po: 'PO-2024-8804', vendor: 'Royal Canin India Pvt Ltd', cat: 'Rx Diet Foods', val: '₹8,90,000', delivered: '2024-07-28', hub: 'Bengaluru Central Warehouse', inv: 'INV-RC-5520', paid: '2024-08-07', status: 'Settled & Audited' },
      { po: 'PO-2024-8805', vendor: 'Virbac Animal Health India', cat: 'Broad Spectrum Rx', val: '₹2,95,000', delivered: '2024-07-20', hub: 'Bengaluru HSR Layout Hub', inv: 'INV-VIR-3301', paid: '2024-07-30', status: 'Settled & Audited' },
      { po: 'PO-2024-8806', vendor: "Hill's Pet Nutrition India", cat: 'Rx Diet Foods', val: '₹5,75,000', delivered: '2024-07-15', hub: 'Bengaluru Central Warehouse', inv: 'INV-HIL-8841', paid: '2024-07-25', status: 'Settled & Audited' },
      { po: 'PO-2024-8807', vendor: 'Synthes Vet Orthopedics', cat: 'Surgical Implants', val: '₹4,10,000', delivered: '2024-07-10', hub: 'Bengaluru Indiranagar Surgery Hub', inv: 'INV-SYN-1109', paid: '2024-07-20', status: 'Settled & Audited' },
      { po: 'PO-2024-8808', vendor: 'Farmina Pet Foods India', cat: 'Veterinary Nutrition', val: '₹6,40,000', delivered: '2024-07-02', hub: 'Bengaluru JP Nagar Hub', inv: 'INV-FAR-6623', paid: '2024-07-12', status: 'Settled & Audited' },
      { po: 'PO-2024-8809', vendor: 'Intas Pharmaceuticals Vet', cat: 'Broad Spectrum Rx', val: '₹3,15,000', delivered: '2024-06-25', hub: 'Bengaluru Malleshwaram Hub', inv: 'INV-INT-9904', paid: '2024-07-05', status: 'Settled & Audited' },
      { po: 'PO-2024-8810', vendor: 'Purina PetCare India', cat: 'Veterinary Nutrition', val: '₹4,80,000', delivered: '2024-06-18', hub: 'Bengaluru Central Warehouse', inv: 'INV-PUR-2218', paid: '2024-06-28', status: 'Settled & Audited' }
    ];

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Cumulative Spend (FYTD)', '₹50.5 Lakhs', '+18.4% YoY', 'up', '10 Audited POs', '💰'),
        kpiHtml('Fulfilled Orders', '10', '100% GRN', 'up', 'Across 6 Bengaluru hubs', '📦'),
        kpiHtml('Avg. Order Ticket', '₹5,05,000', '+6.2%', 'up', 'Consolidated direct batch', '📊'),
        kpiHtml('Historical Fulfillment SLA', '98.8%', 'Within 48h', 'up', 'Cold-chain & dry freight', '⏱️'),
        kpiHtml('Invoice Match Accuracy', '99.6%', '3-way matched', 'up', 'ERP vs GRN vs invoice', '🛡️'),
        kpiHtml('Direct Manufacturer Mix', '90.0%', 'Tier 1 & OEMs', 'up', 'Direct authorized partners', '🏭'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">📜 Fulfilled Purchase Order Ledger & Audit Archive</h3>',
            '<p class="zvp-card-sub">Historical PO records with delivery locations, invoice audit numbers, and settlement dates</p>',
          '</div>',
          '<button class="zvp-btn" onclick="alert(\'Exporting full FYTD purchase history ledger (CSV)...\')">📥 Export Audit CSV</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>PO Number</th><th>Vendor Name</th><th>Category</th><th>Order Value</th><th>Delivered Date</th><th>Receiving Hub</th><th>Invoice Ref</th><th>Paid Date</th><th>Status</th></tr></thead>',
            '<tbody>',
              historyList.map(function (h) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;font-weight:600;">' + esc(h.po) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(h.vendor) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(h.cat) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(h.val) + '</td>' +
                  '<td style="color:#64748b;font-size:11px;">' + esc(h.delivered) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(h.hub) + '</td>' +
                  '<td style="font-family:monospace;color:#a78bfa;font-size:11px;">' + esc(h.inv) + '</td>' +
                  '<td style="color:#64748b;font-size:11px;">' + esc(h.paid) + '</td>' +
                  '<td><span class="zvp-tag green">' + esc(h.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSupplierPricing() {
    var skus = [
      { sku: 'SKU-ZOE-01', name: 'Vanguard Plus 5/CV-L (25 Doses)', vendor: 'Zoetis Animal Health', cat: 'Vaccines & Biologics', msrp: '₹8,500', contracted: '₹6,120', disc: '28.0%', moq: '20 packs', lock: '2027-03-31', parity: 'Best Price' },
      { sku: 'SKU-ZOE-02', name: 'Apoquel 16mg (100 Tabs)', vendor: 'Zoetis Animal Health', cat: 'Rx Therapeutics', msrp: '₹6,200', contracted: '₹4,650', disc: '25.0%', moq: '10 btls', lock: '2027-03-31', parity: 'Exclusive' },
      { sku: 'SKU-MSD-01', name: 'Bravecto Chewable 20-40kg', vendor: 'MSD Animal Health', cat: 'Ectoparasiticides', msrp: '₹2,850', contracted: '₹2,080', disc: '27.0%', moq: '30 packs', lock: '2027-03-31', parity: 'Best Price' },
      { sku: 'SKU-MSD-02', name: 'Nobivac DHPPi + Lepto (50 Doses)', vendor: 'MSD Animal Health', cat: 'Vaccines & Biologics', msrp: '₹12,000', contracted: '₹8,760', disc: '27.0%', moq: '15 packs', lock: '2027-03-31', parity: 'Best Price' },
      { sku: 'SKU-RC-01', name: 'Royal Canin Gastrointestinal 15kg', vendor: 'Royal Canin India', cat: 'Clinical Diets', msrp: '₹10,200', contracted: '₹7,750', disc: '24.0%', moq: '25 bags', lock: '2026-12-31', parity: 'Review Due' },
      { sku: 'SKU-RC-02', name: 'Royal Canin Hepatic Canine 12kg', vendor: 'Royal Canin India', cat: 'Clinical Diets', msrp: '₹8,900', contracted: '₹6,850', disc: '23.0%', moq: '20 bags', lock: '2026-12-31', parity: 'Review Due' },
      { sku: 'SKU-BI-01', name: 'NexGard Spectra Large 15-30kg', vendor: 'Boehringer Ingelheim', cat: 'Parasiticides', msrp: '₹3,100', contracted: '₹2,290', disc: '26.1%', moq: '25 packs', lock: '2027-06-30', parity: 'Best Price' },
      { sku: 'SKU-SYN-01', name: 'TPLO Titanium Locking Plate 3.5mm', vendor: 'Synthes Vet Ortho', cat: 'Surgical Implants', msrp: '₹14,500', contracted: '₹10,440', disc: '28.0%', moq: '5 kits', lock: '2027-06-30', parity: 'Exclusive' },
      { sku: 'SKU-HIL-01', name: "Hill's Prescription Diet k/d 12kg", vendor: "Hill's Pet Nutrition", cat: 'Clinical Diets', msrp: '₹9,400', contracted: '₹7,240', disc: '23.0%', moq: '20 bags', lock: '2027-03-31', parity: 'Negotiated' },
      { sku: 'SKU-INT-01', name: 'Melonex Oral Suspension 100ml', vendor: 'Intas Pharmaceuticals', cat: 'Generic NSAID', msrp: '₹420', contracted: '₹265', disc: '36.9%', moq: '50 btls', lock: '2027-03-31', parity: 'Best Price' }
    ];

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Contracted SKUs', '1,420 Items', '100% price locked', 'up', 'Under master agreements', '📋'),
        kpiHtml('Avg. Discount vs MSRP', '26.8%', '+2.4% vs FY25', 'up', 'Network-wide average', '🏷️'),
        kpiHtml('Active Price Locks', '94.2%', 'Protected thru FY27', 'up', 'Inflation hedge', '🔒'),
        kpiHtml('Price Reviews Due (<60d)', '2 Agreements', 'Royal Canin & Farmina', 'neutral', 'Scheduled for Q4', '⏳'),
        kpiHtml('Generic Arbitrage Margin', '35.3%', '+12.8% vs branded', 'up', 'Meloxicam & Ceftriaxone', '💊'),
        kpiHtml('Volume Rebates Earned', '₹1.68 Lakhs', 'Tier 2 & 3 bonuses', 'up', 'Consolidated volume', '💵'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">🏷️ Master SKU Price Schedule & MSRP Benchmarking</h3>',
            '<p class="zvp-card-sub">Live contracted prices compared to market MSRP, MOQ thresholds, and price lock validity</p>',
          '</div>',
          '<button class="zvp-btn primary" onclick="alert(\'Benchmark pricing scan initiated across 5,000+ national veterinary SKUs.\')">⚖️ Benchmark Scan</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>SKU Code</th><th>Product Description</th><th>Vendor</th><th>Category</th><th>MSRP List</th><th>Contracted</th><th>Discount %</th><th>MOQ</th><th>Price Lock Until</th><th>Parity Status</th></tr></thead>',
            '<tbody>',
              (skus.length ? skus.map(function (s) {
                var pColor = s.parity === 'Best Price' ? 'green' : s.parity === 'Exclusive' ? 'purple' : s.parity === 'Review Due' ? 'amber' : 'blue';
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;">' + esc(s.sku) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(s.name) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.vendor) + '</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);">' + esc(s.cat) + '</td>' +
                  '<td style="color:#64748b;text-decoration:line-through;">' + esc(s.msrp) + '</td>' +
                  '<td style="font-family:monospace;font-weight:700;color:#34d399;">' + esc(s.contracted) + '</td>' +
                  '<td style="font-weight:700;color:#a78bfa;">-' + esc(s.disc) + '</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.moq) + '</td>' +
                  '<td style="color:#64748b;font-size:11px;">' + esc(s.lock) + '</td>' +
                  '<td><span class="zvp-tag ' + pColor + '">' + esc(s.parity) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="10" style="text-align:center;padding:24px;color:#94a3b8;">No contracted SKU pricing records found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSupplierPerformance() {
    var supList = [
      { id: 'SUP-01', name: 'Zoetis Animal Health India', tier: 'Tier 1 Strategic', otif: 99.2, coldChain: 100, ppm: 18, invAcc: 99.8, lead: 2.1, cert: 'WHO-GMP & USFDA', status: 'Excellent' },
      { id: 'SUP-02', name: 'MSD Animal Health Pvt Ltd', tier: 'Tier 1 Strategic', otif: 98.9, coldChain: 100, ppm: 24, invAcc: 99.6, lead: 2.4, cert: 'WHO-GMP & EMA', status: 'Excellent' },
      { id: 'SUP-03', name: 'Royal Canin India Pvt Ltd', tier: 'Tier 1 Strategic', otif: 98.4, coldChain: 99.4, ppm: 32, invAcc: 99.2, lead: 3.2, cert: 'ISO 22000 & HACCP', status: 'Excellent' },
      { id: 'SUP-04', name: 'Boehringer Ingelheim Vet', tier: 'Tier 1 Strategic', otif: 98.1, coldChain: 99.6, ppm: 28, invAcc: 99.4, lead: 2.8, cert: 'WHO-GMP & EU-GMP', status: 'Excellent' },
      { id: 'SUP-05', name: "Hill's Pet Nutrition India", tier: 'Tier 2 Approved', otif: 97.8, coldChain: 99.1, ppm: 45, invAcc: 99.0, lead: 3.5, cert: 'SQF Level 3 & ISO', status: 'Good' },
      { id: 'SUP-06', name: 'Synthes Vet Orthopedics', tier: 'Tier 2 Approved', otif: 96.5, coldChain: 99.8, ppm: 35, invAcc: 98.8, lead: 4.1, cert: 'ISO 13485 Med-Device', status: 'Good' },
      { id: 'SUP-07', name: 'Farmina Pet Foods India', tier: 'Tier 2 Approved', otif: 97.2, coldChain: 98.9, ppm: 52, invAcc: 98.6, lead: 3.0, cert: 'ISO 9001 & Cruelty-Free', status: 'Good' },
      { id: 'SUP-08', name: 'Virbac Animal Health India', tier: 'Tier 2 Approved', otif: 97.5, coldChain: 99.2, ppm: 48, invAcc: 99.1, lead: 2.7, cert: 'WHO-GMP & cGMP', status: 'Good' },
      { id: 'SUP-09', name: 'Intas Pharmaceuticals Vet', tier: 'Tier 3 Qualified', otif: 96.8, coldChain: 98.8, ppm: 64, invAcc: 98.4, lead: 3.8, cert: 'WHO-GMP Certified', status: 'Good' },
      { id: 'SUP-10', name: 'Purina PetCare India', tier: 'Tier 3 Qualified', otif: 96.1, coldChain: 98.5, ppm: 72, invAcc: 98.1, lead: 4.2, cert: 'FSSC 22000 & ISO', status: 'Acceptable' }
    ];

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Network OTIF Delivery Rate', '98.4%', '+1.4% MoM', 'up', 'On-Time In-Full benchmark', '⏱️'),
        kpiHtml('Cold-Chain Compliance', '100%', 'Zero breaches YTD', 'up', '2°C - 8°C vaccine integrity', '❄️'),
        kpiHtml('Avg. Defect PPM', '38 PPM', '-14 PPM vs target', 'up', 'World-class pharma spec', '🛡️'),
        kpiHtml('Invoice Match Accuracy', '99.2%', 'Three-way match', 'up', 'Discrepancy < 0.8%', '📑'),
        kpiHtml('Strategic Tier 1 Partners', '4 Suppliers', '68% total spend', 'up', 'Zoetis, MSD, RC, BI', '⭐'),
        kpiHtml('Audit Certifications', '100% Passed', '10 of 10 certified', 'up', 'WHO-GMP & ISO 13485', '📜'),
      '</div>',

      '<div class="zvp-card">',
        '<div class="zvp-card-head">',
          '<div>',
            '<h3 class="zvp-card-title">🎯 Supplier Quality Engineering & Regulatory Scorecards</h3>',
            '<p class="zvp-card-sub">Fulfillment reliability, cold-chain temperature logger integrity, and defect PPM tracking</p>',
          '</div>',
          '<button class="zvp-btn" onclick="alert(\'Scheduling Q4 Supplier Quality Audit Review...\')">🩺 Schedule QBR Audit</button>',
        '</div>',

        '<div class="zvp-table-wrap">',
          '<table class="zvp-table">',
            '<thead><tr><th>ID</th><th>Supplier Name</th><th>QBR Tier</th><th>OTIF Rate</th><th>Cold Chain SLA</th><th>Defect PPM</th><th>Invoice Match</th><th>Lead Time</th><th>GMP & Certifications</th><th>Status</th></tr></thead>',
            '<tbody>',
              (supList.length ? supList.map(function (s) {
                return '<tr>' +
                  '<td style="font-family:monospace;color:#38bdf8;font-size:11px;">' + esc(s.id) + '</td>' +
                  '<td style="font-weight:600;color:var(--foreground,#0f172a);">' + esc(s.name) + '</td>' +
                  '<td style="color:#a78bfa;font-weight:600;">' + esc(s.tier) + '</td>' +
                  '<td style="font-weight:700;color:#34d399;">' + esc(s.otif) + '%</td>' +
                  '<td style="color:#38bdf8;">' + esc(s.coldChain) + '%</td>' +
                  '<td style="font-family:monospace;color:#34d399;">' + esc(s.ppm) + ' PPM</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.invAcc) + '%</td>' +
                  '<td style="color:var(--foreground,#334155);">' + esc(s.lead) + ' days</td>' +
                  '<td style="color:var(--muted-foreground,#64748b);font-size:11px;">' + esc(s.cert) + '</td>' +
                  '<td><span class="zvp-tag ' + (s.status === 'Excellent' ? 'green' : s.status === 'Good' ? 'blue' : 'amber') + '">' + esc(s.status) + '</span></td>' +
                '</tr>';
              }).join('') : '<tr><td colspan="10" style="text-align:center;padding:24px;color:#94a3b8;">No supplier scorecards found</td></tr>'),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSavings() {
    var levers = [
      { lever: 'Direct Manufacturer Master Contracting', realized: '₹2,45,000', target: '₹3,00,000', achievement: '81.7%', color: '#34d399', desc: 'Disintermediating regional sub-distributors across Zoetis, MSD, and BI for direct national factory invoicing.' },
      { lever: 'Centralized Bulk Volume Aggregation', realized: '₹1,68,000', target: '₹2,00,000', achievement: '84.0%', color: '#38bdf8', desc: 'Consolidating prescription diets and surgical consumable demand across all 6 clinic hubs into bi-weekly orders.' },
      { lever: 'Branded-to-Generic Substitution Arbitrage', realized: '₹1,18,000', target: '₹1,50,000', achievement: '78.7%', color: '#a78bfa', desc: 'Formulating clinical protocols to use bioequivalent generic NSAIDs and antibiotics without impacting care quality.' },
      { lever: 'Early Payment Cash Discounts (2/10 Net 30)', realized: '₹68,000', target: '₹80,000', achievement: '85.0%', color: '#f59e0b', desc: 'Leveraging healthy treasury float to capture 2% upfront cash settlement discount on invoices cleared in 10 days.' },
      { lever: 'Surgical Implant Tray Rationalization', realized: '₹43,000', target: '₹60,000', achievement: '71.7%', color: '#10b981', desc: 'Standardizing on Synthes TPLO locking screw diameters to eliminate obsolete non-standard sterile kits.' }
    ];

    return [
      '<div class="zvp-kpi-grid">',
        kpiHtml('Realized Savings (FYTD)', '₹6.42 Lakhs', '+108.2% vs target', 'up', 'Across all 5 levers', '💰'),
        kpiHtml('Savings % of Spend', '12.1%', '+2.3% YoY', 'up', 'Addressable clinical spend', '📉'),
        kpiHtml('Cost Avoidance (Inflation)', '₹3.80 Lakhs', 'Price locks preserved', 'up', 'Market inflation hedge', '🛡️'),
        kpiHtml('Generic Substitution Arbitrage', '₹1.18 Lakhs', '35.3% lower unit cost', 'up', 'Pharma & antibiotics', '💊'),
        kpiHtml('Early Pay Discounts Captured', '₹68,000', '92.5% capture rate', 'up', '2/10 Net 30 terms', '⚡'),
        kpiHtml('Savings in Pipeline (H2)', '₹4.50 Lakhs', '3 major RFPs active', 'up', 'Targeted for closure', '🎯'),
      '</div>',

      '<div class="zvp-card">',
        '<h3 class="zvp-card-title" style="margin-bottom:16px;">🎯 Procurement Savings by Strategic Lever</h3>',
        '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:14px;">',
          (levers.length ? levers.map(function (l) {
            return '<div style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:16px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                '<strong style="font-size:13px;color:var(--foreground,#0f172a);">' + esc(l.lever) + '</strong>' +
                '<span style="font-size:11px;font-weight:700;color:' + l.color + ';">' + esc(l.achievement) + '</span>' +
              '</div>' +
              '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">' +
                '<span style="font-size:20px;font-weight:800;color:' + l.color + ';">' + esc(l.realized) + '</span>' +
                '<span style="font-size:11px;color:#64748b;">Target: ' + esc(l.target) + '</span>' +
              '</div>' +
              '<p style="margin:0;font-size:11px;color:var(--muted-foreground,#64748b);line-height:1.4;">' + esc(l.desc) + '</p>' +
            '</div>';
          }).join('') : '<div style="text-align:center;padding:28px;color:#94a3b8;">No procurement savings levers found</div>'),
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render Function ──────────────────────────────────────── */
  function render() {
    if (!root) return;
    var currentTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var html = [
      '<header class="zvp-head">',
        '<div class="zvp-head-left">',
          '<div class="zvp-title-row">',
            '<h1 class="zvp-title">' + esc(currentTab.title) + '</h1>',
            '<span class="zvp-live-badge"><span class="zvp-pulse-dot"></span>' + esc(currentTab.badge) + '</span>',
          '</div>',
          '<p class="zvp-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zvp-head-actions">',
          '<button class="zvp-btn" onclick="ZenveVendorsDashboard.showPOModal()">+ New PO</button>',
          '<button class="zvp-btn primary" onclick="ZenveVendorsDashboard.showRegisterVendorModal()">+ Register Vendor</button>',
        '</div>',
      '</header>',

      '<nav class="zvp-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zvp-tab' + active + '" onclick="ZenveVendorsDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zvp-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zvp-body">'
    ];

    switch (S.tab) {
      case 'dashboard':        html.push(renderDashboard()); break;
      case 'all-vendors':      html.push(renderAllVendors()); break;
      case 'vendor-perf':      html.push(renderVendorPerformance()); break;
      case 'vendor-pay':       html.push(renderVendorPayments()); break;
      case 'purchase-orders':  html.push(renderPurchaseOrders()); break;
      case 'procurement':      html.push(renderProcurement()); break;
      case 'purchase-history': html.push(renderPurchaseHistory()); break;
      case 'supplier-pricing': html.push(renderSupplierPricing()); break;
      case 'supplier-perf':    html.push(renderSupplierPerformance()); break;
      case 'savings':          html.push(renderSavings()); break;
      default:                 html.push(renderDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zvp-active-modal';
    backdrop.className = 'zvp-modal-backdrop';
    backdrop.innerHTML = '<div class="zvp-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zvp-active-modal');
    if (existing) existing.remove();
  }

  function showPOModal() {
    var formHtml = [
      '<div class="zvp-modal-head">',
        '<h3 class="zvp-modal-title">📑 Issue New Purchase Order</h3>',
        '<button class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Purchase order successfully created, signed, and dispatched to supplier!\'); ZenveVendorsDashboard.closeModal();">',
        '<div class="zvp-form-group"><label>Supplier Name</label><select class="zvp-select">' +
          VENDORS.map(function(v){ return '<option>' + esc(v.name) + ' (' + esc(v.category) + ')</option>'; }).join('') +
        '</select></div>',
        '<div class="zvp-form-group"><label>Order Description / Line Items</label><input type="text" class="zvp-input" placeholder="e.g. 500 vials Nobivac DHPPi + 20 packs Bravecto" required /></div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>Total Order Value (INR)</label><input type="text" class="zvp-input" placeholder="₹1,85,000" required /></div>',
          '<div class="zvp-form-group"><label>Receiving Hub</label><select class="zvp-select"><option>Koramangala Central Hub</option><option>Bandra Specialty OT Hub</option><option>Whitefield Care Hub</option><option>Okhla Clinic Hub</option></select></div>',
        '</div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>Delivery ETA</label><input type="date" class="zvp-input" value="2026-10-12" required /></div>',
          '<div class="zvp-form-group"><label>Priority</label><select class="zvp-select"><option>High</option><option>Critical (Surgery OT)</option><option>Standard</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zvp-btn primary">Issue & Sign PO</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showRegisterVendorModal() {
    var formHtml = [
      '<div class="zvp-modal-head">',
        '<h3 class="zvp-modal-title">🏭 Register New Supplier</h3>',
        '<button class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Vendor registration submitted. GSTIN verified and added to registry!\'); ZenveVendorsDashboard.closeModal();">',
        '<div class="zvp-form-group"><label>Company Legal Name</label><input type="text" class="zvp-input" placeholder="e.g. Abbott Animal Health India Pvt Ltd" required /></div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>GSTIN (15 Digits)</label><input type="text" class="zvp-input" placeholder="29AABCA1234F1Z5" required /></div>',
          '<div class="zvp-form-group"><label>Category</label><select class="zvp-select"><option>Vaccines & Biologics</option><option>Antiparasitic & Rx</option><option>Surgical Implants</option><option>Veterinary Nutrition</option><option>Diagnostics & Reagents</option></select></div>',
        '</div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>Key Contact Name</label><input type="text" class="zvp-input" placeholder="e.g. Ramesh Iyer" required /></div>',
          '<div class="zvp-form-group"><label>HQ City</label><input type="text" class="zvp-input" placeholder="e.g. Bengaluru" required /></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zvp-btn primary">Complete Registration</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showRequisitionModal() {
    var formHtml = [
      '<div class="zvp-modal-head">',
        '<h3 class="zvp-modal-title">🔄 Submit Procurement Requisition</h3>',
        '<button class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Requisition submitted for medical director & finance review!\'); ZenveVendorsDashboard.closeModal();">',
        '<div class="zvp-form-group"><label>Department / Clinic</label><select class="zvp-select"><option>Surgery OT — Bandra Hub</option><option>Pharmacy — Koramangala 24x7</option><option>Clinical Pathology Lab — Andheri</option><option>Nutrition Counseling — Indiranagar</option></select></div>',
        '<div class="zvp-form-group"><label>Item Description</label><input type="text" class="zvp-input" placeholder="e.g. Orthopedic Titanium Bone Screws 2.4mm" required /></div>',
        '<div class="zvp-form-row">',
          '<div class="zvp-form-group"><label>Required Quantity</label><input type="text" class="zvp-input" placeholder="e.g. 50 units" required /></div>',
          '<div class="zvp-form-group"><label>Urgency Level</label><select class="zvp-select"><option>High</option><option>Critical (Surgery OT)</option><option>Medium</option><option>Low</option></select></div>',
        '</div>',
        '<div class="zvp-form-group"><label>Requested By</label><input type="text" class="zvp-input" placeholder="e.g. Dr. Vikram Singh" required /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zvp-btn" onclick="ZenveVendorsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zvp-btn primary">Submit Requisition</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zvp-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zvp-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close any other active domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zfsh-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zfsh-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zvp-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zfsh-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        }
      });
    }

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zvp-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zfsh-locked', 'zalt-locked');
      document.body.classList.remove('zfsh-locked', 'zalt-locked');
      document.documentElement.classList.add('zvp-locked');
      document.body.classList.add('zvp-locked');
    } catch (e) {}
    render();

    var targetTab = TABS.find(function (t) { return t.id === S.tab; });
    if (targetTab && targetTab.hash && window.location.hash !== targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    root.scrollTop = 0;
  }

  function close() {
    S.open = false;
    if (root) {
      root.classList.remove('zvp-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zvp-locked');
      document.body.classList.remove('zvp-locked');
    } catch (e) {}
    if (window.location.hash && tabFromHash(window.location.hash)) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!tabId || !TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var targetTab = TABS.find(function (t) { return t.id === tabId; });
    if (targetTab && targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) {}
    }
    if (root) root.scrollTop = 0;
  }

  /* ── Interceptor for Hash & Sidebar Clicks ───────────────────────── */
  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'fashion'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zvp-root');
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

  /* ── Public API ──────────────────────────────────────────────────── */
  window.ZenveVendorsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showPOModal: showPOModal,
    showRegisterVendorModal: showRegisterVendorModal,
    showRequisitionModal: showRequisitionModal,
    setVendorSearch: function (q) { S.vendorSearch = q; render(); },
    setVendorFilter: function (f) { S.vendorFilter = f; render(); },
    setPerfSort: function (s) { S.perfSort = s; render(); },
    setPoSearch: function (q) { S.poSearch = q; render(); },
    setPoFilter: function (f) { S.poFilter = f; render(); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
