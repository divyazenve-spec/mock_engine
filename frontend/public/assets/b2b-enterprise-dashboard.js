/* =====================================================================
   Zenve BI — B2B / Enterprise Executive Control Center & Dashboards
   Suite (9 Subdomains):
     1. B2B Dashboard        (#b2b-dashboard / #b2b / #b2b-enterprise)
     2. Enterprise Customers  (#enterprise-customers)
     3. Corporate Accounts    (#corporate-accounts)
     4. B2B Orders            (#b2b-orders)
     5. B2B Sales             (#b2b-sales)
     6. B2B Revenue           (#b2b-revenue)
     7. Contracts             (#contracts / #b2b-contracts)
     8. Enterprise Pricing    (#enterprise-pricing)
     9. B2B Receivables       (#b2b-receivables)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 9 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',    label: 'B2B Dashboard',        icon: '🏢', hash: '#b2b-dashboard',       badge: '',    title: 'B2B Enterprise & Institutional Accounts', sub: 'Corporate kennels, breeder partnerships, institutional hospital contracts, and wholesale volume receivables' },
    { id: 'customers',    label: 'Enterprise Customers', icon: '👥', hash: '#enterprise-customers', badge: '',   title: 'Enterprise Key Decision Makers & Stakeholders', sub: 'Corporate buyer hierarchy, authorized procurement officers, and institutional account owners' },
    { id: 'accounts',     label: 'Corporate Accounts',   icon: '🏛️', hash: '#corporate-accounts',   badge: '', title: 'Corporate Account Master & Credit Sanctions', sub: 'Corporate KYC compliance, GSTIN master, revolving credit sanctions, and relationship manager assignments' },
    { id: 'orders',       label: 'B2B Orders',           icon: '📦', hash: '#b2b-orders',           badge: '',    title: 'B2B Purchase Orders & Bulk Fulfillment', sub: 'Institutional purchase orders, batch fulfillment allocations, warehouse dispatch manifests, and invoice linking' },
    { id: 'sales',        label: 'B2B Sales',            icon: '💼', hash: '#b2b-sales',            badge: '',    title: 'Enterprise Sales Pipeline & Performance', sub: 'Deal stage velocity, relationship manager quotas, RFP win-loss ratios, and qualified corporate pipeline' },
    { id: 'revenue',      label: 'B2B Revenue',          icon: '💰', hash: '#b2b-revenue',          badge: '',    title: 'B2B Revenue Trajectory & Unit Economics', sub: 'Institutional revenue breakdowns, channel contribution margins, contract run rates, and fiscal projections' },
    { id: 'contracts',    label: 'Contracts',            icon: '📜', hash: '#contracts',            badge: '', title: 'Master Services Agreements (MSA) & Deeds', sub: 'Corporate legal master deeds, SLA penalty terms, renewal milestones, and compliance tracking' },
    { id: 'pricing',      label: 'Enterprise Pricing',   icon: '🏷️', hash: '#enterprise-pricing',   badge: '', title: 'Enterprise Tiered Pricing & Rate Cards', sub: 'Volume discount tiers, institutional master rate cards, MOQs, and corporate price lock guarantees' },
    { id: 'receivables',  label: 'B2B Receivables',      icon: '💳', hash: '#b2b-receivables',      badge: '',   title: 'B2B Accounts Receivable & Aging Ledger', sub: 'Corporate invoice aging buckets, DSO tracking, collections follow-up, and institutional credit risk' }
  ];

  /* ── Master Datasets (10 Mock Records Each) ───────────────────────── */
  var ACCOUNTS = [
    { id: 'B2B-101', name: 'Apollo Veterinary Super-Speciality Hospitals Pvt Ltd', category: 'Veterinary Hospital Chain', contractVal: '₹48,00,000', mtdOrders: '₹3,85,000', terms: 'Net 45 Days', creditLimit: '₹25,00,000', rm: 'Vikram Mehta (VP)', status: 'Active · Tier 1', gst: '29AAACP8912K1Z8', usedCredit: '₹8,45,000', risk: 'Low Risk' },
    { id: 'B2B-102', name: 'Max Pet Healthcare & Emergency Centers', category: 'Veterinary Hospital Chain', contractVal: '₹36,50,000', mtdOrders: '₹2,95,000', terms: 'Net 30 Days', creditLimit: '₹20,00,000', rm: 'Sneha Rao (Senior RM)', status: 'Active · Tier 1', gst: '27AABCM4532P1ZQ', usedCredit: '₹6,20,000', risk: 'Low Risk' },
    { id: 'B2B-103', name: 'Central Armed Police Forces (CAPF) K9 Breeding Center', category: 'Security & Government', contractVal: '₹55,00,000', mtdOrders: '₹4,20,000', terms: 'Net 60 Days', creditLimit: '₹30,00,000', rm: 'Vikram Mehta (VP)', status: 'Active · Govt Contract', gst: '07AAACT9921D1ZO', usedCredit: '₹12,80,000', risk: 'Low Risk' },
    { id: 'B2B-104', name: 'Canine Club of India & Certified Breeders Federation', category: 'Breeder Network', contractVal: '₹28,00,000', mtdOrders: '₹2,10,000', terms: 'Net 30 Days', creditLimit: '₹15,00,000', rm: 'Aarav Sen (RM)', status: 'Active · Tier 2', gst: '33AABCC7712M1ZT', usedCredit: '₹4,10,000', risk: 'Low Risk' },
    { id: 'B2B-105', name: 'Infosys Technologies Corporate Pet Wellness Club', category: 'Corporate Benefits', contractVal: '₹22,50,000', mtdOrders: '₹1,75,000', terms: 'Net 30 Days', creditLimit: '₹10,00,000', rm: 'Priya Sharma (RM)', status: 'Active · Corporate', gst: '29AAACI4321E1Z3', usedCredit: '₹3,50,000', risk: 'Low Risk' },
    { id: 'B2B-106', name: 'Wipro Welfare Trust - Paws at Work Program', category: 'Corporate Benefits', contractVal: '₹18,00,000', mtdOrders: '₹1,40,000', terms: 'Net 30 Days', creditLimit: '₹8,00,000', rm: 'Priya Sharma (RM)', status: 'Active · Corporate', gst: '29AAACW6543F1Z1', usedCredit: '₹2,80,000', risk: 'Low Risk' },
    { id: 'B2B-107', name: 'Karnataka State Police CID Dog Squad Wing', category: 'Security & Government', contractVal: '₹32,00,000', mtdOrders: '₹2,60,000', terms: 'Net 60 Days', creditLimit: '₹18,00,000', rm: 'Vikram Mehta (VP)', status: 'Active · Govt Contract', gst: '29AAAGK8765G1Z9', usedCredit: '₹5,20,000', risk: 'Low Risk' },
    { id: 'B2B-108', name: 'Royal Canin Institutional Distribution Hub', category: 'Breeder Network', contractVal: '₹42,00,000', mtdOrders: '₹3,40,000', terms: 'Net 45 Days', creditLimit: '₹22,00,000', rm: 'Aarav Sen (RM)', status: 'Active · Wholesale', gst: '27AAACR1234H1Z5', usedCredit: '₹7,40,000', risk: 'Low Risk' },
    { id: 'B2B-109', name: 'Sanjeevani Animal Welfare & Referral Trust', category: 'Veterinary Hospital Chain', contractVal: '₹26,50,000', mtdOrders: '₹1,95,000', terms: 'Net 30 Days', creditLimit: '₹12,00,000', rm: 'Sneha Rao (Senior RM)', status: 'Active · Non-Profit', gst: '36AAATS5678J1Z7', usedCredit: '₹3,90,000', risk: 'Medium Risk' },
    { id: 'B2B-110', name: 'TCS Maitree Foundation Pet Support Initiative', category: 'Corporate Benefits', contractVal: '₹15,00,000', mtdOrders: '₹1,15,000', terms: 'Net 30 Days', creditLimit: '₹8,00,000', rm: 'Priya Sharma (RM)', status: 'Active · Corporate', gst: '27AAACT9876K1Z2', usedCredit: '₹2,30,000', risk: 'Low Risk' }
  ];

  var CUSTOMERS = [
    { id: 'CUST-B2B-01', name: 'Dr. Rajesh K. Varma', company: 'Apollo Veterinary Super-Speciality Hospitals', tier: 'Tier 1 Enterprise', locations: '14 Centers', annualSpend: '₹48,00,000', contact: 'procurement@apollovethospitals.com' },
    { id: 'CUST-B2B-02', name: 'Ananya Deshmukh', company: 'Max Pet Healthcare & Emergency Centers', tier: 'Tier 1 Enterprise', locations: '8 Centers', annualSpend: '₹36,50,000', contact: 'sourcing@maxpethealthcare.in' },
    { id: 'CUST-B2B-03', name: 'Col. R. S. Bhardwaj', company: 'CAPF K9 Breeding & Training Center', tier: 'Government Contract', locations: '5 Bases', annualSpend: '₹55,00,000', contact: 'dir.k9@capf.gov.in' },
    { id: 'CUST-B2B-04', name: 'Hormuzd C. Batliwala', company: 'Canine Club of India Federation', tier: 'Tier 2 Wholesale', locations: '22 Kennels', annualSpend: '₹28,00,000', contact: 'federation@canineclubindia.org' },
    { id: 'CUST-B2B-05', name: 'Kavita Narang', company: 'Infosys Technologies (Employee Wellness)', tier: 'Corporate Wellness', locations: '6 Campuses', annualSpend: '₹22,50,000', contact: 'benefits.petcare@infosys.com' },
    { id: 'CUST-B2B-06', name: 'Siddharth Menon', company: 'Wipro Welfare Trust (Paws at Work)', tier: 'Corporate Wellness', locations: '4 Campuses', annualSpend: '₹18,00,000', contact: 'wellness.trust@wipro.com' },
    { id: 'CUST-B2B-07', name: 'DySP M. Venkatesh Murthy', company: 'Karnataka State Police Dog Squad', tier: 'Government Contract', locations: '3 Hubs', annualSpend: '₹32,00,000', contact: 'cid.k9unit@ksp.gov.in' },
    { id: 'CUST-B2B-08', name: 'Gaurav Malhotra', company: 'Royal Canin Institutional Distribution Hub', tier: 'Tier 2 Wholesale', locations: '1 Central Hub', annualSpend: '₹42,00,000', contact: 'b2b.orders@royalcanin.co.in' },
    { id: 'CUST-B2B-09', name: 'Dr. Nandini Sundaram', company: 'Sanjeevani Animal Welfare & Referral Trust', tier: 'Tier 1 Enterprise', locations: '3 Shelters', annualSpend: '₹26,50,000', contact: 'trustee@sanjeevanianimalcare.org' },
    { id: 'CUST-B2B-10', name: 'Deepak K. Shinde', company: 'TCS Maitree Foundation', tier: 'Corporate Wellness', locations: '5 Facilities', annualSpend: '₹15,00,000', contact: 'maitree.pets@tcs.com' }
  ];

  var ORDERS = [
    { po: 'PO-2026-B2B-001', client: 'Apollo Veterinary Super-Speciality Hospitals', items: '500x Nobivac DHPPi + 150x Bravecto 20-40kg', val: '₹4,85,000', orderDate: '2026-10-02', dispatchDate: '2026-10-04', status: 'Delivered' },
    { po: 'PO-2026-B2B-002', client: 'Max Pet Healthcare & Emergency Centers', items: '200x Ringer Lactate 500ml + 80x Amoxicillin Tabs', val: '₹2,95,000', orderDate: '2026-10-03', dispatchDate: '2026-10-05', status: 'Delivered' },
    { po: 'PO-2026-B2B-003', client: 'Central Armed Police Forces (CAPF) K9 Center', items: '300x High-Protein Working K9 Ration 20kg + 100x First-Aid', val: '₹6,40,000', orderDate: '2026-10-05', dispatchDate: '2026-10-08', status: 'Delivered' },
    { po: 'PO-2026-B2B-004', client: 'Canine Club of India Federation', items: '250x Microchip Syringe Packs + 500x Deworming Tabs', val: '₹1,95,000', orderDate: '2026-10-06', dispatchDate: '2026-10-09', status: 'Delivered' },
    { po: 'PO-2026-B2B-005', client: 'Infosys Technologies Pet Wellness Club', items: '350x Annual Pet Wellness Member Welcome Kits', val: '₹2,62,500', orderDate: '2026-10-07', dispatchDate: '2026-10-10', status: 'Delivered' },
    { po: 'PO-2026-B2B-006', client: 'Karnataka State Police CID Dog Squad', items: '120x Tactical Working Dog Harnesses + 60x Tracking Leashes', val: '₹3,15,000', orderDate: '2026-10-08', dispatchDate: '2026-10-11', status: 'Dispatched' },
    { po: 'PO-2026-B2B-007', client: 'Royal Canin Institutional Hub', items: '400x Gastrointestinal Veterinary Diet 14kg Bags', val: '₹5,80,000', orderDate: '2026-10-09', dispatchDate: '2026-10-12', status: 'Dispatched' },
    { po: 'PO-2026-B2B-008', client: 'Wipro Welfare Trust (Paws at Work)', items: '200x Preventive Flea/Tick Spot-On 6-Packs', val: '₹1,85,000', orderDate: '2026-10-10', dispatchDate: '2026-10-13', status: 'Dispatched' },
    { po: 'PO-2026-B2B-009', client: 'Sanjeevani Animal Welfare Trust', items: '150x Surgical Suture Boxes + 300x Sterile Gauze Bundles', val: '₹2,10,000', orderDate: '2026-10-11', dispatchDate: '2026-10-14', status: 'Processing' },
    { po: 'PO-2026-B2B-010', client: 'TCS Maitree Foundation Pet Support', items: '180x Comprehensive Preventive Care Kits', val: '₹1,45,000', orderDate: '2026-10-12', dispatchDate: '2026-10-15', status: 'Processing' }
  ];

  var SALES_REPS = [
    { rep: 'Vikram Mehta (VP - Enterprise Sales)', accounts: 11, quota: '₹75,00,000', actual: '₹84,50,000', attainment: '112.7%', pipeline: '₹38,00,000', commission: '₹4,22,500' },
    { rep: 'Sneha Rao (Senior Enterprise RM)', accounts: 9, quota: '₹60,00,000', actual: '₹65,20,000', attainment: '108.7%', pipeline: '₹32,50,000', commission: '₹3,26,000' },
    { rep: 'Aarav Sen (Regional Key Accounts Lead)', accounts: 10, quota: '₹55,00,000', actual: '₹58,90,000', attainment: '107.1%', pipeline: '₹28,00,000', commission: '₹2,94,500' },
    { rep: 'Priya Sharma (Corporate Wellness RM)', accounts: 8, quota: '₹45,00,000', actual: '₹48,60,000', attainment: '108.0%', pipeline: '₹24,50,000', commission: '₹2,43,000' },
    { rep: 'Karan Singhania (Institutional Govt Lead)', accounts: 6, quota: '₹65,00,000', actual: '₹69,40,000', attainment: '106.8%', pipeline: '₹35,00,000', commission: '₹3,47,000' },
    { rep: 'Ananya Ghosh (Hospital Alliances Manager)', accounts: 8, quota: '₹50,00,000', actual: '₹52,80,000', attainment: '105.6%', pipeline: '₹26,00,000', commission: '₹2,64,000' },
    { rep: 'Rohit Kulkarni (Breeder & Kennel Lead)', accounts: 12, quota: '₹40,00,000', actual: '₹43,10,000', attainment: '107.8%', pipeline: '₹21,50,000', commission: '₹2,15,500' },
    { rep: 'Meera Nambiar (South Regional Enterprise RM)', accounts: 7, quota: '₹48,00,000', actual: '₹49,90,000', attainment: '104.0%', pipeline: '₹23,00,000', commission: '₹2,49,500' },
    { rep: 'Siddharth Joshi (West Regional Enterprise RM)', accounts: 8, quota: '₹52,00,000', actual: '₹54,60,000', attainment: '105.0%', pipeline: '₹27,50,000', commission: '₹2,73,000' },
    { rep: 'Divya Nair (Strategic RFP & Contracts Lead)', accounts: 9, quota: '₹58,00,000', actual: '₹61,40,000', attainment: '105.9%', pipeline: '₹31,00,000', commission: '₹3,07,000' }
  ];

  var REVENUE_STREAMS = [
    { stream: 'Institutional Vaccine Consignments (DHPPi, Rabies)', share: '24.5%', mtd: '₹14,20,000', ytd: '₹1,45,00,000', margin: '38.5%', status: 'Strong Growth' },
    { stream: 'Prescription Veterinary Diets & Nutrition Wholesale', share: '21.0%', mtd: '₹12,15,00,000', ytd: '₹1,24,50,000', margin: '32.0%', status: 'Steady High Volume' },
    { stream: 'Diagnostic Rapid Test Kits & Laboratory Reagents', share: '14.2%', mtd: '₹8,25,000', ytd: '₹84,00,000', margin: '46.5%', status: 'Expanding' },
    { stream: 'Surgical Disposables, Sutures & Sterile Consumables', share: '11.8%', mtd: '₹6,85,000', ytd: '₹70,00,000', margin: '41.2%', status: 'Consistent Run Rate' },
    { stream: 'Corporate Pet Wellness Employee Subscriptions', share: '8.5%', mtd: '₹4,95,000', ytd: '₹50,50,000', margin: '62.0%', status: 'Rapid Adoption' },
    { stream: 'Kennel Biosecurity & Professional Disinfection', share: '6.2%', mtd: '₹3,60,000', ytd: '₹36,80,000', margin: '44.0%', status: 'Contract Locked' },
    { stream: 'Parasiticide & Flea/Tick Preventive Bulk Batches', share: '5.4%', mtd: '₹3,15,000', ytd: '₹32,00,000', margin: '36.8%', status: 'High Seasonal Demand' },
    { stream: 'Microchipping & RFID Pet Registration Kits', share: '3.6%', mtd: '₹2,10,000', ytd: '₹21,50,000', margin: '52.0%', status: 'Regulatory Mandate' },
    { stream: 'Specialized Orthopedic & Dental Surgical Packs', share: '2.8%', mtd: '₹1,65,000', ytd: '₹16,80,000', margin: '48.5%', status: 'High Margin Niche' },
    { stream: 'Post-Operative Rehabilitation & Mobility Aids', share: '2.0%', mtd: '₹1,15,000', ytd: '₹11,90,000', margin: '39.0%', status: 'Emerging Segment' }
  ];

  var CONTRACTS = [
    { id: 'MSA-2026-001', title: 'Master Veterinary Clinical Supply Deed', entity: 'Apollo Veterinary Super-Speciality Hospitals Pvt Ltd', validFrom: '2025-04-01', validTo: '2027-03-31', value: '₹96,00,000', slaPenalty: '1.5% deduction per 24h dispatch delay', status: 'Active · 2-Year Term' },
    { id: 'MSA-2026-002', title: 'Emergency Care Consumables Framework Agreement', entity: 'Max Pet Healthcare & Emergency Centers', validFrom: '2025-06-01', validTo: '2027-05-31', value: '₹73,00,000', slaPenalty: '2.0% deduction on stockout of critical line items', status: 'Active · Multi-Year' },
    { id: 'MSA-2026-003', title: 'Government K9 Working Ration & Medical Deed', entity: 'CAPF K9 Breeding & Training Center', validFrom: '2024-11-01', validTo: '2026-10-31', value: '₹1,10,00,000', slaPenalty: 'Govt tender default clauses & warranty forfeiture', status: 'Under Renewal Milestone' },
    { id: 'MSA-2026-004', title: 'Breeders National Nutrition Wholesale Deed', entity: 'Canine Club of India Federation', validFrom: '2025-01-01', validTo: '2026-12-31', value: '₹56,00,000', slaPenalty: 'Rebate forfeiture on monthly minimum dip', status: 'Active · Annual Term' },
    { id: 'MSA-2026-005', title: 'Corporate Wellness & Doorstep Benefit Deed', entity: 'Infosys Technologies Limited', validFrom: '2025-08-01', validTo: '2027-07-31', value: '₹45,00,000', slaPenalty: 'Credit adjustment on delayed employee kits', status: 'Active · 2-Year Term' },
    { id: 'MSA-2026-006', title: 'Paws-at-Work Employee Healthcare Covenant', entity: 'Wipro Welfare Trust', validFrom: '2025-09-01', validTo: '2026-08-31', value: '₹36,00,000', slaPenalty: 'Standard Net 30 late fulfillment penalty', status: 'Active · Annual Term' },
    { id: 'MSA-2026-007', title: 'State Police Tactical K9 Healthcare Deed', entity: 'Karnataka State Police CID Wing', validFrom: '2025-03-01', validTo: '2027-02-28', value: '₹64,00,000', slaPenalty: 'Department audit compliance requirement', status: 'Active · Multi-Year' },
    { id: 'MSA-2026-008', title: 'Institutional Master Wholesale Distribution Deed', entity: 'Royal Canin Institutional Distribution Hub', validFrom: '2025-02-01', validTo: '2027-01-31', value: '₹84,00,000', slaPenalty: 'Minimum volume shortfall compensatory adjustment', status: 'Active · 2-Year Term' },
    { id: 'MSA-2026-009', title: 'Non-Profit Animal Healthcare Subsidy Deed', entity: 'Sanjeevani Animal Welfare & Referral Trust', validFrom: '2025-05-01', validTo: '2026-04-30', value: '₹26,50,000', slaPenalty: 'Subsidized terms tied to non-profit verification', status: 'Under Renewal Milestone' },
    { id: 'MSA-2026-010', title: 'Corporate Social Responsibility Pet Care Deed', entity: 'TCS Maitree Foundation', validFrom: '2025-07-01', validTo: '2026-06-30', value: '₹30,00,000', slaPenalty: 'Quarterly compliance and impact reporting SLA', status: 'Active · Annual Term' }
  ];

  var PRICING_TIERS = [
    { tier: 'Tier 1 Elite Enterprise', minOrder: '₹5,00,000+', discount: '28% Off MRP', paymentTerms: 'Net 45 Days', freight: 'Free Express Air Cargo', rebate: '4.5% Annual Rebate' },
    { tier: 'Tier 2 Hospital Chain', minOrder: '₹2,50,000', discount: '22% Off MRP', paymentTerms: 'Net 30 Days', freight: 'Free Doorstep Surface', rebate: '3.0% Annual Rebate' },
    { tier: 'Tier 3 Breeder Network', minOrder: '₹1,00,000', discount: '18% Off MRP', paymentTerms: 'Net 15 Days', freight: 'Free Surface above ₹1.5L', rebate: '2.0% Annual Rebate' },
    { tier: 'Tier 4 Government & Police K9', minOrder: '₹3,00,000', discount: '25% Off MRP', paymentTerms: 'Net 60 Days', freight: 'Direct Depot Delivery', rebate: 'Government Fixed Price' },
    { tier: 'Tier 5 Corporate Wellness Benefit', minOrder: '₹1,50,000', discount: '20% Off MRP', paymentTerms: 'Net 30 Days', freight: 'Consolidated Monthly', rebate: '2.5% Annual Rebate' },
    { tier: 'Tier 6 Referral Clinic Alliance', minOrder: '₹75,000', discount: '15% Off MRP', paymentTerms: 'Net 15 Days', freight: 'Standard Flat ₹499', rebate: '1.5% Annual Rebate' },
    { tier: 'Tier 7 Animal Shelter & NGO Partner', minOrder: '₹50,000', discount: '30% At-Cost Subsidized', paymentTerms: 'Net 30 Days', freight: 'Free Sponsored Delivery', rebate: 'N/A (Subsidized)' },
    { tier: 'Tier 8 Emergency 24/7 Supply Pool', minOrder: '₹1,25,000', discount: '16% Off MRP', paymentTerms: 'Net 21 Days', freight: 'Priority 2-Hour Hot-Dispatch', rebate: '1.0% Annual Rebate' },
    { tier: 'Tier 9 Academic Veterinary Research', minOrder: '₹80,000', discount: '24% Off MRP', paymentTerms: 'Net 45 Days', freight: 'Free Surface', rebate: 'Educational Grant 3%' },
    { tier: 'Tier 10 Regional Sub-Wholesaler', minOrder: '₹10,00,000+', discount: '32% Off MRP', paymentTerms: 'Letter of Credit / Net 30', freight: 'Container Truckload Free', rebate: '5.0% Annual Rebate' }
  ];

  var RATE_CARDS = [
    { sku: 'SKU-B2B-VAC-01', name: 'Nobivac DHPPi + L4 Canine Core Vaccine (50-Vial Pack)', retailMrp: '₹18,500', tier1: '₹13,320', tier2: '₹14,430', tier3: '₹15,170', minQty: '5 Packs' },
    { sku: 'SKU-B2B-PAR-02', name: 'Bravecto Chewable Tablets 20-40kg (Box of 12)', retailMrp: '₹26,400', tier1: '₹19,008', tier2: '₹20,592', tier3: '₹21,648', minQty: '3 Boxes' },
    { sku: 'SKU-B2B-DIE-03', name: 'Royal Canin Veterinary Diet Gastrointestinal 14kg Bulk Bag', retailMrp: '₹9,800', tier1: '₹7,056', tier2: '₹7,644', tier3: '₹8,036', minQty: '10 Bags' },
    { sku: 'SKU-B2B-SUR-04', name: 'Surgical Monofilament Suture Kit USP 3-0 Box of 36', retailMrp: '₹4,500', tier1: '₹3,240', tier2: '₹3,510', tier3: '₹3,690', minQty: '8 Boxes' },
    { sku: 'SKU-B2B-DIA-05', name: 'Canine Parvovirus (CPV) Antigen Rapid Test Cassette Box of 25', retailMrp: '₹8,750', tier1: '₹6,300', tier2: '₹6,825', tier3: '₹7,175', minQty: '4 Boxes' },
    { sku: 'SKU-B2B-ANT-06', name: 'Amoxicillin + Clavulanate 500mg Tabs Veterinary 100-Pack', retailMrp: '₹3,200', tier1: '₹2,304', tier2: '₹2,496', tier3: '₹2,624', minQty: '12 Packs' },
    { sku: 'SKU-B2B-MIC-07', name: 'ISO Standard 134.2kHz RFID Microchip Syringe Implant 50-Pack', retailMrp: '₹14,000', tier1: '₹10,080', tier2: '₹10,920', tier3: '₹11,480', minQty: '2 Packs' },
    { sku: 'SKU-B2B-FLUID-08', name: "Ringer's Lactate Infusion Solution 500ml IV Case of 40", retailMrp: '₹2,800', tier1: '₹2,016', tier2: '₹2,184', tier3: '₹2,296', minQty: '15 Cases' },
    { sku: 'SKU-B2B-ORT-09', name: 'Veterinary Orthopedic Bone Plate & Screw Set Stainless Steel', retailMrp: '₹42,000', tier1: '₹30,240', tier2: '₹32,760', tier3: '₹34,440', minQty: '1 Set' },
    { sku: 'SKU-B2B-DEN-10', name: 'Veterinary Ultrasonic Dental Scaler Prophylaxis Tip Pack of 6', retailMrp: '₹7,500', tier1: '₹5,400', tier2: '₹5,850', tier3: '₹6,150', minQty: '4 Packs' }
  ];

  var RECEIVABLES = [
    { inv: 'INV-B2B-2026-081', client: 'Apollo Veterinary Super-Speciality Hospitals', amt: '₹4,85,000', dueDate: '2026-11-16', aging: '0-30 Days', terms: 'Net 45 Days', status: 'Current · On Schedule' },
    { inv: 'INV-B2B-2026-082', client: 'Max Pet Healthcare & Emergency Centers', amt: '₹2,95,000', dueDate: '2026-11-02', aging: '0-30 Days', terms: 'Net 30 Days', status: 'Current · On Schedule' },
    { inv: 'INV-B2B-2026-083', client: 'CAPF K9 Breeding & Training Center', amt: '₹6,40,000', dueDate: '2026-12-04', aging: '0-30 Days', terms: 'Net 60 Days', status: 'Govt Treasury Voucher Raised' },
    { inv: 'INV-B2B-2026-084', client: 'Canine Club of India Federation', amt: '₹1,95,000', dueDate: '2026-11-05', aging: '0-30 Days', terms: 'Net 30 Days', status: 'Current · Scheduled for Auto-Debit' },
    { inv: 'INV-B2B-2026-085', client: 'Infosys Technologies Pet Wellness Club', amt: '₹2,62,500', dueDate: '2026-11-06', aging: '0-30 Days', terms: 'Net 30 Days', status: 'Corporate Clearing Pending' },
    { inv: 'INV-B2B-2026-086', client: 'Karnataka State Police CID Dog Squad', amt: '₹5,20,000', dueDate: '2026-10-28', aging: '31-60 Days', terms: 'Net 60 Days', status: 'Department Sanction Approved' },
    { inv: 'INV-B2B-2026-087', client: 'Royal Canin Institutional Distribution Hub', amt: '₹4,40,000', dueDate: '2026-10-25', aging: '31-60 Days', terms: 'Net 45 Days', status: 'First Notice Sent · RM Follow-up' },
    { inv: 'INV-B2B-2026-088', client: 'Wipro Welfare Trust (Paws at Work)', amt: '₹2,80,000', dueDate: '2026-10-22', aging: '31-60 Days', terms: 'Net 30 Days', status: 'Grace Period Extension (10 Days)' },
    { inv: 'INV-B2B-2026-089', client: 'Sanjeevani Animal Welfare & Referral Trust', amt: '₹3,90,000', dueDate: '2026-10-15', aging: '31-60 Days', terms: 'Net 30 Days', status: 'Trustee Board Approval in Review' },
    { inv: 'INV-B2B-2026-090', client: 'TCS Maitree Foundation Pet Support', amt: '₹2,30,000', dueDate: '2026-09-28', aging: '61-90 Days', terms: 'Net 30 Days', status: 'Escalated to Corporate Sponsoring RM' }
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: '',
    filter: 'ALL'
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0 || h.indexOf('subscription') >= 0) {
      return null;
    }
    if (h === 'b2b-dashboard' || h === 'b2b' || h === 'b2b-enterprise' || h === 'enterprise') return 'dashboard';
    if (h === 'enterprise-customers' || h === 'b2b-customers') return 'customers';
    if (h === 'corporate-accounts' || h === 'b2b-accounts') return 'accounts';
    if (h === 'b2b-orders' || h === 'enterprise-orders') return 'orders';
    if (h === 'b2b-sales' || h === 'enterprise-sales') return 'sales';
    if (h === 'b2b-revenue' || h === 'enterprise-revenue') return 'revenue';
    if (h === 'contracts' || h === 'b2b-contracts' || h === 'enterprise-contracts') return 'contracts';
    if (h === 'enterprise-pricing' || h === 'b2b-pricing') return 'pricing';
    if (h === 'b2b-receivables' || h === 'enterprise-receivables') return 'receivables';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('fashion') >= 0) return null;

    if (raw === 'b2b dashboard' || raw === 'b2b / enterprise') return 'dashboard';
    if (raw === 'enterprise customers') return 'customers';
    if (raw === 'corporate accounts') return 'accounts';
    if (raw === 'b2b orders') return 'orders';
    if (raw === 'b2b sales') return 'sales';
    if (raw === 'b2b revenue') return 'revenue';
    if (raw === 'contracts') return 'contracts';
    if (raw === 'enterprise pricing') return 'pricing';
    if (raw === 'b2b receivables') return 'receivables';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zb2b-kpi">',
        '<div class="zb2b-kpi-top">',
          '<span class="zb2b-kpi-label">' + esc(label) + '</span>',
          '<span class="zb2b-kpi-icon">' + esc(icon || '🏢') + '</span>',
        '</div>',
        '<div class="zb2b-kpi-val">' + esc(val) + '</div>',
        '<div class="zb2b-kpi-bottom">',
          '<span class="zb2b-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : trend === 'neutral' ? 'neutral' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zb2b-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains (10 Mock Records in Each Dashboard) ──────── */
  function renderDashboard() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('B2B Gross Revenue (MTD)', '₹24,40,000', '14.8%', 'up', 'vs last month', '🏢'),
        kpiHtml('Active Corporate Clients', '10 Accounts', '+2 New', 'up', '100% compliant', '📑'),
        kpiHtml('Avg. Contract Value (ACV)', '₹32,45,000', '8.2%', 'up', 'Annualized', '💼'),
        kpiHtml('Outstanding Receivables', '₹39,85,000', 'DSO 34d', 'neutral', 'Within credit terms', '💰'),
        kpiHtml('Wholesale Gross Margin', '36.8%', '2.4%', 'up', 'Target 35%', '📈'),
        kpiHtml('Contract Renewal Rate', '98.5%', '1.5%', 'up', 'Industry leading', '🛡️'),
      '</div>',

      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div>',
            '<h3 class="zb2b-card-title">🏢 Major Enterprise & Institutional Accounts (10 Active)</h3>',
            '<p class="zb2b-card-sub">Commercial standing, contracted commitments, and active credit utilization</p>',
          '</div>',
          '<button class="zb2b-btn primary" onclick="ZenveB2BDashboard.showOnboardModal()">+ Onboard Client</button>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Account ID</th><th>Organization Name</th><th>Category</th><th>Annual Contract</th><th>MTD Run Rate</th><th>Credit Terms</th><th>Account RM</th><th>Status</th></tr></thead>',
            '<tbody>',
              (ACCOUNTS.map(function(a) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(a.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.name) + '</td>' +
                  '<td>' + esc(a.category) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.contractVal) + '</td>' +
                  '<td style="color:#059669;font-weight:600;">' + esc(a.mtdOrders) + '</td>' +
                  '<td>' + esc(a.terms) + ' (' + esc(a.creditLimit) + ')</td>' +
                  '<td>' + esc(a.rm) + '</td>' +
                  '<td><span class="zb2b-pill active">' + esc(a.status) + '</span></td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCustomers() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Enterprise Stakeholders', '10 Key Contacts', '+3 Added', 'up', 'Authorized procurement heads', '👥'),
        kpiHtml('Tier 1 Enterprise Clients', '5 Accounts', '50.0%', 'up', 'High-volume clinical buyers', '⭐'),
        kpiHtml('Corporate Account NPS', '84 NPS', '+6 pts', 'up', 'Quarterly client survey', '🎯'),
        kpiHtml('Avg Client Tenure', '3.4 Years', '0.8y', 'up', 'Multi-year commitments', '📅'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">👥 Enterprise Decision Makers Directory (10 Stakeholders)</h3><p class="zb2b-card-sub">Procurement heads, authorized signatories, and annual spend allocation</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Contact ID</th><th>Procurement Head</th><th>Enterprise Organization</th><th>Classification</th><th>Locations</th><th>Annual Spend</th><th>Contact Details</th></tr></thead>',
            '<tbody>',
              (CUSTOMERS.map(function(c) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(c.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(c.name) + '</td>' +
                  '<td>' + esc(c.company) + '</td>' +
                  '<td><span class="zb2b-pill active">' + esc(c.tier) + '</span></td>' +
                  '<td>' + esc(c.locations) + '</td>' +
                  '<td style="color:#059669;font-weight:600;">' + esc(c.annualSpend) + '</td>' +
                  '<td style="font-family:monospace;font-size:11px;">' + esc(c.contact) + '</td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAccounts() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Total Sanctioned Credit', '₹1,78,00,000', '10 Accounts', 'up', 'Board approved credit limits', '🏛️'),
        kpiHtml('Credit Utilization', '44.6%', '₹79.4L drawn', 'neutral', 'Safe operating buffer', '📊'),
        kpiHtml('Avg Payment Terms', '38.5 Days', '-3.5d', 'up', 'Weighted invoice collection', '⏱️'),
        kpiHtml('GST & E-Invoicing', '100.0%', '10/10 verified', 'up', 'Fully tax compliant', '✅'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">🏛️ Corporate Credit Sanctions & Risk Ledger (10 Accounts)</h3><p class="zb2b-card-sub">Assigned credit limits, drawn balances, GSTINs, and risk grades</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Account Code</th><th>Corporate Entity</th><th>GSTIN</th><th>Sanctioned Limit</th><th>Used Credit</th><th>Terms</th><th>Account RM</th><th>Risk Grade</th></tr></thead>',
            '<tbody>',
              (ACCOUNTS.map(function(a) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(a.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.name) + '</td>' +
                  '<td style="font-family:monospace;font-size:11px;">' + esc(a.gst) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.creditLimit) + '</td>' +
                  '<td style="color:#4338ca;font-weight:600;">' + esc(a.usedCredit) + '</td>' +
                  '<td>' + esc(a.terms) + '</td>' +
                  '<td>' + esc(a.rm) + '</td>' +
                  '<td><span class="zb2b-pill ' + (a.risk === 'Low Risk' ? 'active' : 'warning') + '">' + esc(a.risk) + '</span></td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('B2B Orders (MTD)', '28 Orders', '18.2%', 'up', 'Institutional order volume', '📦'),
        kpiHtml('Order Value Realized', '₹38,70,000', '22.4%', 'up', 'MTD dispatched revenue', '💵'),
        kpiHtml('On-Time Dispatch SLA', '98.2%', '1.2%', 'up', 'Dispatched within 24-48h', '⚡'),
        kpiHtml('Open Warehouse POs', '3 Orders', '₹8.4L Value', 'neutral', 'Packing & QC allocation', '⏳'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">📦 Live Institutional Purchase Orders (10 Orders)</h3><p class="zb2b-card-sub">Active corporate purchase orders, item allocation, and logistics status</p></div>',
          '<button class="zb2b-btn primary" onclick="ZenveB2BDashboard.showPOModal()">+ Create B2B Order</button>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>PO Number</th><th>Client Entity</th><th>Line Items Description</th><th>PO Value</th><th>Order Date</th><th>Dispatch ETA</th><th>Status</th></tr></thead>',
            '<tbody>',
              (ORDERS.map(function(o) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(o.po) + '</td>' +
                  '<td style="font-weight:600;">' + esc(o.client) + '</td>' +
                  '<td>' + esc(o.items) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(o.val) + '</td>' +
                  '<td>' + esc(o.orderDate) + '</td>' +
                  '<td>' + esc(o.dispatchDate) + '</td>' +
                  '<td><span class="zb2b-pill ' + (o.status === 'Delivered' ? 'active' : o.status === 'Dispatched' ? 'corporate' : 'warning') + '">' + esc(o.status) + '</span></td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSales() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Quarterly Closed Bookings', '₹6,42,80,000', '16.5%', 'up', 'Q4 corporate pipeline', '💼'),
        kpiHtml('Active Qualified Pipeline', '₹2,95,00,000', '14 Deals', 'up', 'Weighted pipeline coverage', '📈'),
        kpiHtml('Deal Win Rate', '76.4%', '5.2%', 'up', 'Institutional RFP wins', '🏆'),
        kpiHtml('Avg Enterprise Sales Cycle', '32 Days', '-6 Days', 'up', 'Proposal to signed deed', '⚡'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">💼 Enterprise Account Executives Scorecard (10 Executives)</h3><p class="zb2b-card-sub">Sales quotas, year-to-date closed bookings, and live pipeline coverage</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Sales Lead</th><th>Assigned Accounts</th><th>Quota Target</th><th>Closed Bookings</th><th>Attainment %</th><th>Live Pipeline</th><th>Commissions</th></tr></thead>',
            '<tbody>',
              (SALES_REPS.map(function(r) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(r.rep) + '</td>' +
                  '<td>' + esc(r.accounts) + ' Accounts</td>' +
                  '<td>' + esc(r.quota) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(r.actual) + '</td>' +
                  '<td><span class="zb2b-pill active">' + esc(r.attainment) + '</span></td>' +
                  '<td style="color:#4338ca;font-weight:600;">' + esc(r.pipeline) + '</td>' +
                  '<td>' + esc(r.commission) + '</td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Annualized B2B Run Rate', '₹4,28,00,000', '21.4%', 'up', 'ARR expansion trajectory', '💰'),
        kpiHtml('Blended B2B Gross Margin', '37.2%', '3.1%', 'up', 'Weighted product margin', '📈'),
        kpiHtml('Monthly Revenue per Account', '₹3,56,000', '12.0%', 'up', 'ARPU commercial volume', '🏢'),
        kpiHtml('Repeat Contract Revenue', '91.8%', '4.2%', 'up', 'Recurring purchase covenants', '🔄'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">💰 B2B Revenue Streams & Margin Analysis (10 Streams)</h3><p class="zb2b-card-sub">Channel realization, contribution margin, and year-over-year momentum</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Revenue Stream</th><th>B2B Share</th><th>MTD Realized</th><th>YTD Realized</th><th>Gross Margin</th><th>Trajectory</th></tr></thead>',
            '<tbody>',
              (REVENUE_STREAMS.map(function(s) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(s.stream) + '</td>' +
                  '<td>' + esc(s.share) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(s.mtd) + '</td>' +
                  '<td>' + esc(s.ytd) + '</td>' +
                  '<td style="font-weight:600;color:#4338ca;">' + esc(s.margin) + '</td>' +
                  '<td><span class="zb2b-pill active">' + esc(s.status) + '</span></td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderContracts() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Active Commercial MSAs', '10 Contracts', '₹4.12 Cr', 'up', 'Binding bilateral deeds', '📜'),
        kpiHtml('Contracts Expiring in 90D', '2 Contracts', 'Renewal in flight', 'warn', 'Proactive legal follow-up', '⏳'),
        kpiHtml('Legal SLA Compliance', '99.2%', '0.5%', 'up', 'Zero penalty disputes', '🛡️'),
        kpiHtml('Avg Contract Tenure', '2.6 Years', '0.4y', 'up', 'Multi-year lock-in agreements', '📅'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">📜 Master Services Agreements (MSA) Ledger (10 Deeds)</h3><p class="zb2b-card-sub">Active corporate contracts, tenure validity, and committed volumes</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Contract ID</th><th>Agreement Name</th><th>Client Entity</th><th>Validity Period</th><th>Committed Value</th><th>SLA Default Terms</th><th>Status</th></tr></thead>',
            '<tbody>',
              (CONTRACTS.map(function(c) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(c.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(c.title) + '</td>' +
                  '<td>' + esc(c.entity) + '</td>' +
                  '<td>' + esc(c.validFrom) + ' to ' + esc(c.validTo) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(c.value) + '</td>' +
                  '<td style="font-size:11px;color:#64748b;">' + esc(c.slaPenalty) + '</td>' +
                  '<td><span class="zb2b-pill ' + (c.status.indexOf('Active') >= 0 ? 'active' : 'warning') + '">' + esc(c.status) + '</span></td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPricing() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Avg Volume Discount', '22.5%', 'Scale based', 'neutral', 'Tiered volume brackets', '🏷️'),
        kpiHtml('Price-Locked Master SKUs', '10 Core SKUs', '12-Mo lock', 'up', 'Contract guaranteed rates', '🔒'),
        kpiHtml('Volume Rebates Issued', '₹14,80,000', 'YTD total', 'neutral', 'Performance based rebates', '💵'),
        kpiHtml('Minimum Order Value (MOQ)', '₹50,000', 'Base MOQ', 'neutral', 'Wholesale fulfillment floor', '📦'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">🏷️ Tiered Volume Pricing & Commercial Matrix (10 Tiers)</h3><p class="zb2b-card-sub">Discount brackets, minimum order commitments, and payment credit rules</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Tier Classification</th><th>Min Order Value</th><th>Discount Off MRP</th><th>Credit Terms</th><th>Freight Policy</th><th>Rebate Schedule</th></tr></thead>',
            '<tbody>',
              (PRICING_TIERS.map(function(t) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(t.tier) + '</td>' +
                  '<td style="font-weight:600;color:#4338ca;">' + esc(t.minOrder) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(t.discount) + '</td>' +
                  '<td>' + esc(t.paymentTerms) + '</td>' +
                  '<td>' + esc(t.freight) + '</td>' +
                  '<td style="color:#64748b;">' + esc(t.rebate) + '</td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',
      '<div class="zb2b-card" style="margin-top:20px;">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">📦 High-Velocity Master SKU Rate Card (10 Products)</h3><p class="zb2b-card-sub">Contracted bulk unit pricing across Tier 1, Tier 2, and Tier 3</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>SKU Code</th><th>Product Description</th><th>Standard MRP</th><th>Tier 1 Price</th><th>Tier 2 Price</th><th>Tier 3 Price</th><th>MOQ</th></tr></thead>',
            '<tbody>',
              (RATE_CARDS.map(function(s) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(s.sku) + '</td>' +
                  '<td style="font-weight:600;">' + esc(s.name) + '</td>' +
                  '<td style="color:#64748b;">' + esc(s.retailMrp) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(s.tier1) + '</td>' +
                  '<td style="font-weight:600;color:#4338ca;">' + esc(s.tier2) + '</td>' +
                  '<td style="font-weight:600;">' + esc(s.tier3) + '</td>' +
                  '<td>' + esc(s.minQty) + '</td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderReceivables() {
    return [
      '<div class="zb2b-kpi-grid">',
        kpiHtml('Total B2B Receivables', '₹39,85,000', '10 Invoices', 'neutral', 'Current active ledger', '💳'),
        kpiHtml('Days Sales Outstanding (DSO)', '34.2 Days', '-4.1 Days', 'up', 'Healthy collection velocity', '⏱️'),
        kpiHtml('Current Dues (0-30 Days)', '₹28,45,000', '71.4%', 'up', 'Within normal payment cycle', '✅'),
        kpiHtml('Overdue Dues (> 60 Days)', '₹2,90,000', '7.3%', 'warn', 'Under RM active recovery', '⚠️'),
      '</div>',
      '<div class="zb2b-card">',
        '<div class="zb2b-card-head">',
          '<div><h3 class="zb2b-card-title">💳 Corporate Receivables Aging Ledger (10 Invoices)</h3><p class="zb2b-card-sub">Invoiced amounts, aging buckets, due dates, and collection status</p></div>',
        '</div>',
        '<div class="zb2b-table-wrap">',
          '<table class="zb2b-table">',
            '<thead><tr><th>Invoice #</th><th>Corporate Client</th><th>Amount</th><th>Due Date</th><th>Aging Bucket</th><th>Payment Terms</th><th>Recovery Status</th></tr></thead>',
            '<tbody>',
              (RECEIVABLES.map(function(r) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(r.inv) + '</td>' +
                  '<td style="font-weight:600;">' + esc(r.client) + '</td>' +
                  '<td style="font-weight:600;color:#0f172a;">' + esc(r.amt) + '</td>' +
                  '<td>' + esc(r.dueDate) + '</td>' +
                  '<td><span class="zb2b-pill ' + (r.aging === '0-30 Days' ? 'active' : r.aging === '31-60 Days' ? 'warning' : 'danger') + '">' + esc(r.aging) + '</span></td>' +
                  '<td>' + esc(r.terms) + '</td>' +
                  '<td>' + esc(r.status) + '</td>' +
                '</tr>';
              }).join('')),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;
    var currentTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    var html = [
      '<header class="zb2b-head">',
        '<div class="zb2b-head-left">',
          '<div class="zb2b-title-row">',
            '<h2 class="zb2b-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
            '<span class="zb2b-live-badge"><span class="zb2b-pulse-dot"></span> B2B Enterprise · Active</span>',
          '</div>',
          '<p class="zb2b-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zb2b-head-actions">',
          '<button class="zb2b-btn" onclick="ZenveB2BDashboard.showPOModal()">+ New PO</button>',
          '<button class="zb2b-btn primary" onclick="ZenveB2BDashboard.showOnboardModal()">+ Onboard Client</button>',
        '</div>',
      '</header>',

      '<nav class="zb2b-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zb2b-tab' + active + '" onclick="ZenveB2BDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zb2b-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zb2b-body">'
    ];

    switch (S.tab) {
      case 'dashboard':   html.push(renderDashboard()); break;
      case 'customers':   html.push(renderCustomers()); break;
      case 'accounts':    html.push(renderAccounts()); break;
      case 'orders':      html.push(renderOrders()); break;
      case 'sales':       html.push(renderSales()); break;
      case 'revenue':     html.push(renderRevenue()); break;
      case 'contracts':   html.push(renderContracts()); break;
      case 'pricing':     html.push(renderPricing()); break;
      case 'receivables': html.push(renderReceivables()); break;
      default:            html.push(renderDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zb2b-active-modal';
    backdrop.className = 'zb2b-modal-backdrop';
    backdrop.innerHTML = '<div class="zb2b-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zb2b-active-modal');
    if (existing) existing.remove();
  }

  function showPOModal() {
    var formHtml = [
      '<div class="zb2b-modal-head">',
        '<h3 class="zb2b-modal-title">📦 Issue Institutional Purchase Order</h3>',
        '<button class="zb2b-btn" onclick="ZenveB2BDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'B2B Purchase order generated and linked to ERP!\'); ZenveB2BDashboard.closeModal();">',
        '<div class="zb2b-form-group"><label>Client Corporate Organization</label><select class="zb2b-select">' +
          (ACCOUNTS.length ? ACCOUNTS.map(function(a){ return '<option>' + esc(a.name) + '</option>'; }).join('') : '<option value="">No registered accounts</option>') +
        '</select></div>',
        '<div class="zb2b-form-group"><label>Order Description & Line Items</label><input type="text" class="zb2b-input" placeholder="e.g. 500 vials Nobivac DHPPi + 40 boxes Bravecto" required /></div>',
        '<div class="zb2b-form-row">',
          '<div class="zb2b-form-group"><label>PO Total Value (INR)</label><input type="text" class="zb2b-input" placeholder="₹3,45,000" required /></div>',
          '<div class="zb2b-form-group"><label>Credit Payment Terms</label><select class="zb2b-select"><option>Net 30 Days</option><option>Net 45 Days</option><option>Net 60 Days</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zb2b-btn" onclick="ZenveB2BDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zb2b-btn primary">Generate & Confirm Order</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showOnboardModal() {
    var formHtml = [
      '<div class="zb2b-modal-head">',
        '<h3 class="zb2b-modal-title">🏢 Onboard New Enterprise Account</h3>',
        '<button class="zb2b-btn" onclick="ZenveB2BDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Enterprise client onboarded. Master Services Agreement generated!\'); ZenveB2BDashboard.closeModal();">',
        '<div class="zb2b-form-group"><label>Organization Legal Entity Name</label><input type="text" class="zb2b-input" placeholder="e.g. Apollo Veterinary Hospitals Pvt Ltd" required /></div>',
        '<div class="zb2b-form-row">',
          '<div class="zb2b-form-group"><label>Corporate GSTIN</label><input type="text" class="zb2b-input" placeholder="29AAACP8912K1Z8" required /></div>',
          '<div class="zb2b-form-group"><label>Enterprise Category</label><select class="zb2b-select"><option>Veterinary Hospital Chain</option><option>Security & Govt Kennels</option><option>Breeder Co-op</option><option>Corporate Benefits</option></select></div>',
        '</div>',
        '<div class="zb2b-form-row">',
          '<div class="zb2b-form-group"><label>Approved Credit Limit (INR)</label><input type="text" class="zb2b-input" placeholder="₹25,00,000" required /></div>',
          '<div class="zb2b-form-group"><label>Assigned Relationship Manager</label><select class="zb2b-select"><option>Vikram Mehta (VP)</option><option>Sneha Rao (Senior RM)</option><option>Aarav Sen</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zb2b-btn" onclick="ZenveB2BDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zb2b-btn primary">Complete Onboarding</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zb2b-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zb2b-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zix-root', 'zsub-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zix-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zb2b-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zix-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
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
    root.classList.add('zb2b-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zix-locked', 'zsub-locked');
      document.body.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zix-locked', 'zsub-locked');
      document.documentElement.classList.add('zb2b-locked');
      document.body.classList.add('zb2b-locked');
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
      root.classList.remove('zb2b-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zb2b-locked');
      document.body.classList.remove('zb2b-locked');
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
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'import', 'export', 'subscription'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zb2b-root');
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
  window.ZenveB2BDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showPOModal: showPOModal,
    showOnboardModal: showOnboardModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
