/* =====================================================================
   Zenve BI — Reports & Analytics Executive Command Center
   Comprehensive Multi-Domain Reporting Suite for All 16 Modules:
     1. Sales Reports (Net GMV, Gross Sales, Refunds, AOV & Channel Splits)
     2. Revenue Reports (5 BUs, Target vs Achievement, Margins & ARR)
     3. Customer Reports (142.5k Cohorts, Retention, LTV & RFM Matrix)
     4. Pet Reports (186.4k Pets, Breed Epidemiology & Vaccination)
     5. Doctor Reports (18 Specialist Case Volumes, Ratings & Commissions)
     6. Clinic Reports (5 Super-Specialty Hospitals, Bed Occupancy & OPD)
     7. Product Reports (4,200 SKUs, Pareto ABC Classification & Velocity)
     8. Inventory Reports (₹16.64Cr Valuation, DSI Days & Expiry Batches)
     9. Finance Reports (Audited GAAP P&L, EBITDA & Margin Expansion)
     10. HR Reports (300 Headcount, Payroll ₹1.87Cr, Attendance & Turn)
     11. Marketing Reports (4.7x ROAS, CAC ₹365 & Attribution Funnel)
     12. Operations Reports (96.2% 60-Min SLA, Rider Fleet & Dwell)
     13. Vendor Reports (48 Suppliers, OTIF Fulfillment & Savings)
     14. Custom Reports (Interactive Multi-Dimensional Pivot Builder)
     15. Scheduled Reports (Automated Cron Intelligence Dispatches)
     16. Export Center (10 Curated Raw Enterprise Datasets)
   ===================================================================== */

(function () {
  'use strict';

  /* ── 1. Module Registry ──────────────────────────────────────────── */
  var MODULES = [
    { id: 'sales', label: 'Sales Reports', icon: '📊', hash: '#sales-reports', badge: '' },
    { id: 'revenue', label: 'Revenue Reports', icon: '💼', hash: '#revenue-reports', badge: '' },
    { id: 'customer', label: 'Customer Reports', icon: '👥', hash: '#customer-reports', badge: '' },
    { id: 'pet', label: 'Pet Reports', icon: '🐾', hash: '#pet-reports', badge: '' },
    { id: 'doctor', label: 'Doctor Reports', icon: '🩺', hash: '#doctor-reports', badge: '' },
    { id: 'clinic', label: 'Clinic Reports', icon: '🏥', hash: '#clinic-reports', badge: '' },
    { id: 'product', label: 'Product Reports', icon: '🏷️', hash: '#product-reports', badge: '' },
    { id: 'inventory', label: 'Inventory Reports', icon: '📦', hash: '#inventory-reports', badge: '' },
    { id: 'finance', label: 'Finance Reports', icon: '💰', hash: '#finance-reports', badge: '' },
    { id: 'hr', label: 'HR Reports', icon: '🧑‍💼', hash: '#hr-reports', badge: '' },
    { id: 'marketing', label: 'Marketing Reports', icon: '📣', hash: '#marketing-reports', badge: '' },
    { id: 'operations', label: 'Operations Reports', icon: '🚚', hash: '#operations-reports', badge: '' },
    { id: 'vendor', label: 'Vendor Reports', icon: '🤝', hash: '#vendor-reports', badge: '' },
    { id: 'custom', label: 'Custom Reports', icon: '⚙️', hash: '#custom-reports', badge: '' },
    { id: 'scheduled', label: 'Scheduled Reports', icon: '⏰', hash: '#scheduled-reports', badge: '' },
    { id: 'export', label: 'Export Center', icon: '📥', hash: '#export-center', badge: '' }
  ];

  /* ── 2. Data Store ───────────────────────────────────────────────── */
  var D = {
    // 1. Sales Data
    salesSummary: {
      grossSales: '₹1,42,85,900',
      discounts: '₹14,28,500',
      netSales: '₹1,28,57,400',
      refunds: '₹2,14,300',
      aov: '₹2,480',
      ordersCount: '5,184'
    },
    salesChannels: [
      { channel: 'Android App (60-Min Express)', orders: '1,842', gross: '₹51,57,600', net: '₹46,41,840', share: '36.1%' },
      { channel: 'iOS App (Zenve Flagship)', orders: '1,215', gross: '₹37,66,500', net: '₹33,89,850', share: '26.4%' },
      { channel: 'Web eCommerce Portal', orders: '784', gross: '₹19,60,000', net: '₹17,64,000', share: '13.7%' },
      { channel: 'Clinic Walk-in Kiosks', orders: '436', gross: '₹12,20,800', net: '₹10,98,720', share: '8.5%' },
      { channel: 'Veterinary In-Hospital Counter', orders: '312', gross: '₹9,36,000', net: '₹8,42,400', share: '6.6%' },
      { channel: 'Tele-Consultation Direct', orders: '248', gross: '₹4,96,000', net: '₹4,46,400', share: '3.5%' },
      { channel: 'Corporate B2B Wellness', orders: '128', gross: '₹3,84,000', net: '₹3,45,600', share: '2.7%' },
      { channel: 'WhatsApp Rapid Ordering', orders: '96', gross: '₹1,92,000', net: '₹1,72,800', share: '1.3%' },
      { channel: 'Subscription Auto-Renewals', orders: '84', gross: '₹1,17,600', net: '₹1,05,840', share: '0.8%' },
      { channel: 'Partner Hospital Cross-Fulfill', orders: '39', gross: '₹55,400', net: '₹49,950', share: '0.4%' }
    ],

    // 2. Revenue Data
    revenueBUs: [
      { unit: 'Veterinary Clinical Hospitals', target: '₹45,00,000', achieved: '₹48,20,000', attainment: '107.1%', margin: '42.5%', trend: '+14.2% YoY' },
      { unit: 'Pharmacy & Prescription Delivery', target: '₹35,00,000', achieved: '₹36,80,000', attainment: '105.1%', margin: '31.8%', trend: '+22.6% YoY' },
      { unit: 'Pet Diagnostics & Advanced Lab', target: '₹20,00,000', achieved: '₹21,45,000', attainment: '107.2%', margin: '54.0%', trend: '+18.9% YoY' },
      { unit: 'Pet Grooming & Spa Centers', target: '₹15,00,000', achieved: '₹14,90,000', attainment: '99.3%', margin: '48.2%', trend: '+9.4% YoY' },
      { unit: 'Premium Pet Food & Nutrition', target: '₹12,00,000', achieved: '₹13,20,000', attainment: '110.0%', margin: '28.4%', trend: '+31.0% YoY' },
      { unit: 'Pet Care Insurance & Wellness', target: '₹8,00,000', achieved: '₹8,65,000', attainment: '108.1%', margin: '62.0%', trend: '+45.2% YoY' },
      { unit: 'Surgical & Emergency 24x7', target: '₹18,00,000', achieved: '₹19,40,000', attainment: '107.7%', margin: '46.8%', trend: '+16.5% YoY' },
      { unit: 'Exotic Pet Special Care', target: '₹5,00,000', achieved: '₹5,10,000', attainment: '102.0%', margin: '39.5%', trend: '+12.1% YoY' },
      { unit: 'Pet Training & Behavior Therapy', target: '₹4,00,000', achieved: '₹3,95,000', attainment: '98.7%', margin: '58.0%', trend: '+7.8% YoY' },
      { unit: 'Tele-Veterinary Care Network', target: '₹6,00,000', achieved: '₹6,40,000', attainment: '106.6%', margin: '68.5%', trend: '+38.4% YoY' }
    ],

    // 3. Customer Data
    customerCohorts: [
      { cohort: 'Jan 2026 Cohort', users: '1,420', m1: '84.2%', m3: '71.5%', m6: '62.8%', m12: '54.1%', ltv: '₹18,450' },
      { cohort: 'Feb 2026 Cohort', users: '1,560', m1: '85.6%', m3: '73.1%', m6: '64.0%', m12: '55.8%', ltv: '₹19,200' },
      { cohort: 'Mar 2026 Cohort', users: '1,680', m1: '86.4%', m3: '74.8%', m6: '65.2%', m12: '57.0%', ltv: '₹20,100' },
      { cohort: 'Apr 2026 Cohort', users: '1,840', m1: '87.1%', m3: '76.0%', m6: '66.8%', m12: '58.2%', ltv: '₹21,400' },
      { cohort: 'May 2026 Cohort', users: '2,050', m1: '88.3%', m3: '77.5%', m6: '68.1%', m12: '59.6%', ltv: '₹22,800' },
      { cohort: 'Jun 2026 Cohort', users: '2,240', m1: '89.0%', m3: '78.9%', m6: '69.4%', m12: '61.0%', ltv: '₹23,900' },
      { cohort: 'Jul 2026 Cohort', users: '2,480', m1: '89.8%', m3: '80.2%', m6: '71.0%', m12: '62.4%', ltv: '₹24,650' },
      { cohort: 'Aug 2026 Cohort', users: '2,710', m1: '90.5%', m3: '81.4%', m6: '72.5%', m12: '63.8%', ltv: '₹25,800' },
      { cohort: 'Sep 2026 Cohort', users: '2,950', m1: '91.2%', m3: '82.8%', m6: '74.0%', m12: '65.1%', ltv: '₹26,950' },
      { cohort: 'Oct 2026 Cohort', users: '3,240', m1: '92.4%', m3: '84.0%', m6: '75.6%', m12: '66.5%', ltv: '₹28,100' }
    ],

    // 4. Pet Epidemiology
    petBreeds: [
      { breed: 'Golden Retriever', species: 'Dog', count: '42,850', avgAge: '3.4 yrs', topCondition: 'Hip Dysplasia & Skin Allergies', adherence: '94.8%' },
      { breed: 'Persian Cat', species: 'Cat', count: '31,400', avgAge: '2.8 yrs', topCondition: 'Hairballs & Renal Wellness', adherence: '91.2%' },
      { breed: 'German Shepherd', species: 'Dog', count: '28,900', avgAge: '4.1 yrs', topCondition: 'Joint Stiffness & GI Sensitivity', adherence: '93.5%' },
      { breed: 'Shih Tzu', species: 'Dog', count: '24,650', avgAge: '2.5 yrs', topCondition: 'Corneal Ulcer & Tear Staining', adherence: '96.1%' },
      { breed: 'Indie Rescue Breed', species: 'Dog', count: '21,300', avgAge: '3.8 yrs', topCondition: 'Tick Fever & Preventive Care', adherence: '95.4%' },
      { breed: 'Labrador Retriever', species: 'Dog', count: '19,800', avgAge: '4.5 yrs', topCondition: 'Obesity & Ear Canal Infections', adherence: '92.7%' },
      { breed: 'Beagle', species: 'Dog', count: '16,400', avgAge: '3.1 yrs', topCondition: 'Intervertebral Disc & Hypothyroidism', adherence: '90.9%' },
      { breed: 'Siamese Cat', species: 'Cat', count: '14,200', avgAge: '2.9 yrs', topCondition: 'Asthma & Dental Plaque', adherence: '89.6%' },
      { breed: 'Cocker Spaniel', species: 'Dog', count: '12,500', avgAge: '3.6 yrs', topCondition: 'Otitis Externa & Cataracts', adherence: '93.0%' },
      { breed: 'French Bulldog', species: 'Dog', count: '9,800', avgAge: '2.2 yrs', topCondition: 'BOAS & Skin Fold Dermatitis', adherence: '97.2%' }
    ],

    // 5. Doctor Data
    doctors: [
      { name: 'Dr. Edwin .', specialty: 'Veterinary Surgery', consults: '328', surgeries: '42', satisfaction: '4.96', commission: '₹1,48,500' },
      { name: 'Dr. Ananya Deshmukh', specialty: 'Small Animal Medicine', consults: '294', surgeries: '18', satisfaction: '4.94', commission: '₹1,26,400' },
      { name: 'Dr. Vikramaditya Rathore', specialty: 'Orthopedic Surgery', consults: '246', surgeries: '38', satisfaction: '4.93', commission: '₹1,38,900' },
      { name: 'Dr. Priya Sharma', specialty: 'Soft Tissue Surgery', consults: '232', surgeries: '35', satisfaction: '4.95', commission: '₹1,32,000' },
      { name: 'Dr. Rajeshwar Kulkarni', specialty: 'Cardiology & Critical Care', consults: '188', surgeries: '14', satisfaction: '4.95', commission: '₹1,12,800' },
      { name: 'Dr. Shalini Mukherjee', specialty: 'Dermatology & Allergy', consults: '215', surgeries: '8', satisfaction: '4.91', commission: '₹98,600' },
      { name: 'Dr. Siddharth Sen', specialty: 'Emergency & Trauma Care', consults: '198', surgeries: '29', satisfaction: '4.90', commission: '₹1,18,500' },
      { name: 'Dr. Meera Nambiar', specialty: 'Veterinary Dentistry', consults: '172', surgeries: '22', satisfaction: '4.89', commission: '₹94,200' },
      { name: 'Dr. Farhan Qureshi', specialty: 'Exotic Pet & Avian Care', consults: '156', surgeries: '11', satisfaction: '4.88', commission: '₹86,400' },
      { name: 'Dr. Tanvi Venkatesh', specialty: 'Preventive Care & Vaccines', consults: '195', surgeries: '6', satisfaction: '4.87', commission: '₹82,500' }
    ],

    // 6. Clinic Data
    clinicDepartments: [
      { dept: 'Surgical ICU & OR Suites', cases: '482', avgLoS: '2.4 days', bedUtil: '88.5%', nurseRatio: '1:2', nps: '82', infectionRate: '0.02%' },
      { dept: 'Internal Medicine OPD', cases: '1,420', avgLoS: '0.8 days', bedUtil: '76.2%', nurseRatio: '1:4', nps: '78', infectionRate: '0.01%' },
      { dept: 'Emergency & 24x7 Trauma', cases: '640', avgLoS: '1.9 days', bedUtil: '92.0%', nurseRatio: '1:2', nps: '86', infectionRate: '0.03%' },
      { dept: 'Veterinary Orthopedics', cases: '312', avgLoS: '3.1 days', bedUtil: '84.0%', nurseRatio: '1:3', nps: '84', infectionRate: '0.02%' },
      { dept: 'Cardiology & Intensive Care', cases: '215', avgLoS: '2.8 days', bedUtil: '86.4%', nurseRatio: '1:2', nps: '80', infectionRate: '0.04%' },
      { dept: 'Dermatology & Allergy Clinic', cases: '890', avgLoS: '0.2 days', bedUtil: '68.0%', nurseRatio: '1:5', nps: '75', infectionRate: '0.01%' },
      { dept: 'Oncology & Chemotherapy Unit', cases: '148', avgLoS: '1.4 days', bedUtil: '79.5%', nurseRatio: '1:2', nps: '88', infectionRate: '0.02%' },
      { dept: 'Feline Special Care Wing', cases: '530', avgLoS: '1.2 days', bedUtil: '74.2%', nurseRatio: '1:3', nps: '79', infectionRate: '0.01%' },
      { dept: 'Dental Oral Surgery Unit', cases: '380', avgLoS: '0.5 days', bedUtil: '71.0%', nurseRatio: '1:3', nps: '77', infectionRate: '0.02%' },
      { dept: 'Pediatric & Neonatal Nursery', cases: '260', avgLoS: '2.1 days', bedUtil: '81.5%', nurseRatio: '1:2', nps: '85', infectionRate: '0.02%' }
    ],
    clinicSatisfaction: [
      { hub: 'Zenve Central Animal Hospital, Koramangala', nps: '86', csat: '4.95', nabh: 'Accredited', complaint: '0.4%', repeat: '78.4%' },
      { hub: 'Zenve South Multi-Specialty, Indiranagar', nps: '84', csat: '4.92', nabh: 'Accredited', complaint: '0.5%', repeat: '76.1%' },
      { hub: 'Zenve North Surgical Center, Whitefield', nps: '82', csat: '4.90', nabh: 'Accredited', complaint: '0.6%', repeat: '74.5%' },
      { hub: 'Zenve West Specialty Clinic, Malleshwaram', nps: '81', csat: '4.88', nabh: 'Accredited', complaint: '0.7%', repeat: '72.8%' },
      { hub: 'Zenve East 24x7 Trauma Wing, HSR Layout', nps: '85', csat: '4.94', nabh: 'Accredited', complaint: '0.5%', repeat: '77.2%' },
      { hub: 'Zenve Mumbai Flagship Hospital, Bandra', nps: '88', csat: '4.96', nabh: 'Accredited', complaint: '0.3%', repeat: '80.5%' },
      { hub: 'Zenve Delhi NCR Center, CyberCity', nps: '83', csat: '4.91', nabh: 'Accredited', complaint: '0.6%', repeat: '75.0%' },
      { hub: 'Zenve Hyderabad Center, Jubilee Hills', nps: '80', csat: '4.87', nabh: 'Accredited', complaint: '0.8%', repeat: '71.4%' },
      { hub: 'Zenve Chennai Veterinary Hospital, Adyar', nps: '82', csat: '4.89', nabh: 'Accredited', complaint: '0.6%', repeat: '73.2%' },
      { hub: 'Zenve Pune Care Center, Koregaon Park', nps: '81', csat: '4.88', nabh: 'Accredited', complaint: '0.7%', repeat: '72.0%' }
    ],

    // 7. Product Data
    topProducts: [
      { sku: 'ZV-VET-01', name: 'Canine DHPPi+L 9-in-1 Core Vaccine', cat: 'Biologicals', units: '12,450', rev: '₹18,67,500', margin: '48.5%', abc: 'A' },
      { sku: 'ZV-MED-04', name: 'NexGard Spectra Flea & Tick Chewable', cat: 'Antiparasitic', units: '8,920', rev: '₹14,27,200', margin: '38.2%', abc: 'A' },
      { sku: 'ZV-NUT-12', name: 'Royal Canin Veterinary Diet Gastrointestinal', cat: 'Clinical Diet', units: '6,410', rev: '₹12,82,000', margin: '32.0%', abc: 'A' },
      { sku: 'ZV-FEL-02', name: 'Felocell 4 Feline Respiratory Core Vaccine', cat: 'Biologicals', units: '5,840', rev: '₹9,34,400', margin: '52.0%', abc: 'A' },
      { sku: 'ZV-PHA-09', name: 'Bravecto 3-Month Fluralaner Chewable', cat: 'Antiparasitic', units: '4,150', rev: '₹8,30,000', margin: '35.4%', abc: 'B' },
      { sku: 'ZV-SUP-07', name: 'Synoquin EFA Canine Joint Mobility Supplement', cat: 'Joint Care', units: '3,890', rev: '₹6,99,000', margin: '44.0%', abc: 'B' },
      { sku: 'ZV-DER-03', name: 'Apoquel Oclacitinib Anti-Itch Tablet 16mg', cat: 'Dermatology', units: '3,120', rev: '₹6,86,400', margin: '41.2%', abc: 'B' },
      { sku: 'ZV-SUR-15', name: 'Monocryl 3-0 Absorbable Surgical Suture', cat: 'Surgical Supply', units: '2,940', rev: '₹4,70,400', margin: '58.0%', abc: 'B' },
      { sku: 'ZV-GRO-08', name: 'Zenve Pawshion Oatmeal Hypoallergenic Shampoo', cat: 'Grooming', units: '2,480', rev: '₹3,72,000', margin: '62.5%', abc: 'C' },
      { sku: 'ZV-FAS-05', name: 'Royal Heritage Reflective Velvet Harness (Teal)', cat: 'Lifestyle', units: '1,860', rev: '₹2,79,000', margin: '65.0%', abc: 'C' }
    ],

    // 8. Inventory Data
    inventoryDepots: [
      { hub: 'Central Bengaluru Distribution DC (Cold Chain)', skus: '1,840', val: '₹4,25,00,000', dsi: '22 Days', expiryNear: '₹3,20,000', space: '88%' },
      { hub: 'Mumbai Metro Rapid Hub, Bhiwandi', skus: '1,520', val: '₹3,40,00,000', dsi: '24 Days', expiryNear: '₹2,80,000', space: '82%' },
      { hub: 'Delhi NCR Fulfillment Center, Gurugram', skus: '1,410', val: '₹3,15,00,000', dsi: '25 Days', expiryNear: '₹2,40,000', space: '79%' },
      { hub: 'Hyderabad Regional Pharma Hub, Shamshabad', skus: '1,180', val: '₹2,60,00,000', dsi: '26 Days', expiryNear: '₹1,90,000', space: '74%' },
      { hub: 'Chennai Coastal DC, Guindy Industrial', skus: '980', val: '₹2,10,00,000', dsi: '28 Days', expiryNear: '₹1,50,000', space: '71%' },
      { hub: 'Pune Express Dark Store, Hinjawadi', skus: '740', val: '₹1,45,00,000', dsi: '18 Days', expiryNear: '₹95,000', space: '68%' },
      { hub: 'Kolkata East Depot, Rajarhat', skus: '690', val: '₹1,25,00,000', dsi: '30 Days', expiryNear: '₹85,000', space: '65%' },
      { hub: 'Ahmedabad West Logistics Depot, Sanand', skus: '610', val: '₹1,10,00,000', dsi: '29 Days', expiryNear: '₹75,000', space: '63%' },
      { hub: 'Kochi Kerala Distribution Hub, Kalamassery', skus: '540', val: '₹95,00,000', dsi: '32 Days', expiryNear: '₹60,000', space: '60%' },
      { hub: 'Chandigarh North Depot, Mohali', skus: '480', val: '₹85,00,000', dsi: '31 Days', expiryNear: '₹50,000', space: '58%' }
    ],

    // 9. Finance GAAP P&L
    financePnL: [
      { line: 'Gross Billed Revenue', mtd: '₹1,42,85,900', qtd: '₹4,12,60,000', pct: '111.1%', note: 'Across clinical, pharmacy, nutrition & services' },
      { line: 'Promotional Discounts & Deductions', mtd: '-₹14,28,500', qtd: '-₹41,20,000', pct: '-11.1%', note: 'Marketing and welcome promotional subsidies' },
      { line: 'Net Operating Revenue (GMV)', mtd: '₹1,28,57,400', qtd: '₹3,71,40,000', pct: '100.0%', note: 'Recognized net revenue under Ind-AS standards' },
      { line: 'Cost of Goods Sold (COGS & Vaccines)', mtd: '-₹68,14,400', qtd: '-₹1,96,80,000', pct: '-53.0%', note: 'Procured inventory, active salts & surgical consumables' },
      { line: 'Gross Profit Contribution', mtd: '₹60,43,000', qtd: '₹1,74,60,000', pct: '47.0%', note: 'Blended gross profit across all revenue streams' },
      { line: 'Clinical Doctor Fees & Staff Payroll', mtd: '-₹24,80,000', qtd: '-₹71,60,000', pct: '-19.3%', note: 'Fixed staff salary, incentives & night-shift OR pool' },
      { line: 'Last-Mile Delivery & Dark Store Ops', mtd: '-₹9,45,000', qtd: '-₹27,20,000', pct: '-7.3%', note: 'EV rider fleets, fuel, dispatch dwell & battery swaps' },
      { line: 'Marketing, Performance Ad Spend & CAC', mtd: '-₹8,60,000', qtd: '-₹24,80,000', pct: '-6.7%', note: 'Performance campaigns with 4.7x blended ROAS' },
      { line: 'Operating EBITDA', mtd: '₹17,58,000', qtd: '₹51,00,000', pct: '13.7%', note: 'Operating cash earnings before financing costs' },
      { line: 'Net Profit Before Tax (PBT)', mtd: '₹14,92,000', qtd: '₹43,20,000', pct: '11.6%', note: 'Net accounting profitability after depreciation' }
    ],

    // 10. HR & Workforce
    hrDepartments: [
      { dept: 'Veterinary Surgery & Clinical Medicine', count: '48', payroll: '₹38,40,000', attendance: '98.4%', turn: '1.2%' },
      { dept: 'Clinical Nursing & ICU Inpatient Care', count: '64', payroll: '₹22,40,000', attendance: '96.8%', turn: '2.1%' },
      { dept: 'Rapid Pharmacy Fulfillment & Dispensing', count: '38', payroll: '₹15,20,000', attendance: '97.5%', turn: '1.8%' },
      { dept: 'Last-Mile Logistics & EV Rider Fleet', count: '52', payroll: '₹18,20,000', attendance: '95.6%', turn: '3.4%' },
      { dept: 'Customer Success & VIP Concierge', count: '28', payroll: '₹12,60,000', attendance: '98.2%', turn: '1.5%' },
      { dept: 'Diagnostics & Pathology Laboratory', count: '22', payroll: '₹13,20,000', attendance: '99.1%', turn: '0.8%' },
      { dept: 'Pet Grooming, Spa & Wellness', count: '26', payroll: '₹9,80,000', attendance: '96.0%', turn: '2.4%' },
      { dept: 'Procurement, SCM & Cold Chain', count: '18', payroll: '₹11,70,000', attendance: '97.8%', turn: '1.1%' },
      { dept: 'Software Engineering, AI & BI Engine', count: '24', payroll: '₹24,00,000', attendance: '99.5%', turn: '0.5%' },
      { dept: 'Finance, Compliance & Corporate Admin', count: '14', payroll: '₹10,50,000', attendance: '98.9%', turn: '0.9%' }
    ],

    // 11. Marketing Attribution
    marketingChannels: [
      { channel: 'Google Search & Pet Health Intent Ads', spend: '₹2,40,000', rev: '₹12,48,000', roas: '5.2x', cac: '₹310', newUsers: '774' },
      { channel: 'Meta (Instagram & Facebook Pet Parents)', spend: '₹2,10,000', rev: '₹9,87,000', roas: '4.7x', cac: '₹345', newUsers: '608' },
      { channel: 'In-Hospital Clinic Reception Referrals', spend: '₹80,000', rev: '₹5,76,000', roas: '7.2x', cac: '₹180', newUsers: '444' },
      { channel: 'App Store & Play Store Apple Search Ads', spend: '₹1,50,000', rev: '₹6,45,000', roas: '4.3x', cac: '₹390', newUsers: '384' },
      { channel: 'Pet Influencer & Breeder Co-Branding', spend: '₹75,000', rev: '₹3,45,000', roas: '4.6x', cac: '₹320', newUsers: '234' },
      { channel: 'Direct Push Notifications & In-App CRM', spend: '₹25,000', rev: '₹2,80,000', roas: '11.2x', cac: '₹65', newUsers: '385' },
      { channel: 'Corporate B2B Employee Pet Care Days', spend: '₹40,000', rev: '₹2,48,000', roas: '6.2x', cac: '₹210', newUsers: '190' },
      { channel: 'Veterinary Society CME & Direct Outreach', spend: '₹30,000', rev: '₹1,95,000', roas: '6.5x', cac: '₹195', newUsers: '154' },
      { channel: 'Local Community Pet Adoption Drives', spend: '₹20,000', rev: '₹1,40,000', roas: '7.0x', cac: '₹140', newUsers: '142' },
      { channel: 'Organic SEO & Breed Care Knowledge Base', spend: '₹15,000', rev: '₹1,85,000', roas: '12.3x', cac: '₹45', newUsers: '333' }
    ],

    // 12. Operations & Delivery SLAs
    operationsHubs: [
      { hub: 'Koramangala Super Hub, Bengaluru', orders: '1,420', avgMins: '38 mins', slaPass: '97.8%', activeRiders: '18', rating: '4.95' },
      { hub: 'Indiranagar Express Depot, Bengaluru', orders: '1,180', avgMins: '41 mins', slaPass: '96.5%', activeRiders: '15', rating: '4.92' },
      { hub: 'Whitefield Tech Corridor Hub, Bengaluru', orders: '960', avgMins: '44 mins', slaPass: '95.8%', activeRiders: '12', rating: '4.89' },
      { hub: 'HSR Layout 24x7 Dark Store, Bengaluru', orders: '840', avgMins: '36 mins', slaPass: '98.2%', activeRiders: '11', rating: '4.96' },
      { hub: 'Bandra West Premium Hub, Mumbai', orders: '1,250', avgMins: '42 mins', slaPass: '96.1%', activeRiders: '16', rating: '4.93' },
      { hub: 'Gurugram Cyber City Node, Delhi NCR', orders: '1,050', avgMins: '45 mins', slaPass: '95.2%', activeRiders: '14', rating: '4.88' },
      { hub: 'Jubilee Hills Hub, Hyderabad', orders: '780', avgMins: '39 mins', slaPass: '97.0%', activeRiders: '10', rating: '4.91' },
      { hub: 'Adyar Express Center, Chennai', orders: '690', avgMins: '43 mins', slaPass: '95.5%', activeRiders: '9', rating: '4.87' },
      { hub: 'Koregaon Park Delivery Depot, Pune', orders: '620', avgMins: '40 mins', slaPass: '96.8%', activeRiders: '8', rating: '4.90' },
      { hub: 'Salt Lake Sector V Hub, Kolkata', orders: '540', avgMins: '46 mins', slaPass: '94.8%', activeRiders: '7', rating: '4.85' }
    ],

    // 13. Vendor Scorecards
    vendors: [
      { name: 'Zoetis Animal Health India', category: 'Biologicals & Vaccines', poVolume: '₹28,50,000', fillRate: '98.4%', otif: '97.2%', rebate: '4.5%' },
      { name: 'Boehringer Ingelheim Vetmedica', category: 'Therapeutics & Parasiticides', poVolume: '₹22,40,000', fillRate: '97.8%', otif: '96.5%', rebate: '4.0%' },
      { name: 'Virbac Animal Health India', category: 'Specialty Pharmaceuticals', poVolume: '₹18,60,000', fillRate: '96.9%', otif: '95.8%', rebate: '3.8%' },
      { name: 'Royal Canin India Pvt Ltd', category: 'Veterinary Prescription Diets', poVolume: '₹16,20,000', fillRate: '98.1%', otif: '97.0%', rebate: '5.0%' },
      { name: 'MSD Animal Health (Merck)', category: 'Biologicals & Parasiticides', poVolume: '₹15,40,000', fillRate: '97.5%', otif: '96.2%', rebate: '4.2%' },
      { name: 'Elanco India Animal Health', category: 'Companion Animal Meds', poVolume: '₹12,80,000', fillRate: '96.2%', otif: '94.8%', rebate: '3.5%' },
      { name: 'Himalaya Wellness (Animal Health)', category: 'Herbal Care & Supplements', poVolume: '₹9,50,000', fillRate: '99.0%', otif: '98.2%', rebate: '6.0%' },
      { name: 'Vetoquinol India Animal Health', category: 'Pain & Joint Mobility', poVolume: '₹8,40,000', fillRate: '95.8%', otif: '94.2%', rebate: '3.2%' },
      { name: 'B. Braun Medical India', category: 'Surgical Sutures & IV Fluids', poVolume: '₹7,20,000', fillRate: '98.6%', otif: '97.5%', rebate: '4.8%' },
      { name: 'Zenve Pawshion Textile Mill', category: 'Pet Apparel & Accessories', poVolume: '₹5,80,000', fillRate: '99.2%', otif: '98.8%', rebate: '8.5%' }
    ],

    // 14. Scheduled Reports
    schedules: [
      { id: 'SCH-01', title: 'Daily Executive Sales & GMV Flash', cron: '0 08:00 * * *', recipients: 'c-suite@zenve.care', format: 'CSV + Executive PDF', lastRun: 'Today 08:00 AM', active: true },
      { id: 'SCH-02', title: 'Weekly Business Unit Margin Attainment', cron: '0 09:00 * * 1', recipients: 'bu-heads@zenve.care', format: 'XLSX Spreadsheet', lastRun: 'Monday 09:00 AM', active: true },
      { id: 'SCH-03', title: 'Monthly Clinical Quality & NABH Audit', cron: '0 10:00 1 * *', recipients: 'medical-directors@zenve.care', format: 'Audited PDF Pack', lastRun: '01 Oct 10:00 AM', active: true },
      { id: 'SCH-04', title: 'Cold-Chain Depot Near-Expiry & DSI Report', cron: '0 07:30 * * 1', recipients: 'supplychain@zenve.care', format: 'CSV', lastRun: 'Monday 07:30 AM', active: true },
      { id: 'SCH-05', title: '60-Min Express Fulfillment SLA Scorecard', cron: '0 08:30 * * *', recipients: 'logistics-leads@zenve.care', format: 'CSV + Slack Webhook', lastRun: 'Today 08:30 AM', active: true },
      { id: 'SCH-06', title: 'Marketing ROAS & Multi-Touch CAC Digest', cron: '0 09:30 * * *', recipients: 'growth-team@zenve.care', format: 'CSV', lastRun: 'Today 09:30 AM', active: true },
      { id: 'SCH-07', title: 'Doctor Consultation & OR Caseload Ledger', cron: '0 18:00 * * 5', recipients: 'doctor-payroll@zenve.care', format: 'XLSX', lastRun: 'Friday 06:00 PM', active: true },
      { id: 'SCH-08', title: 'Customer Churn & 60-Day Cohort Retention', cron: '0 10:00 * * 1', recipients: 'crm-analytics@zenve.care', format: 'CSV', lastRun: 'Monday 10:00 AM', active: true },
      { id: 'SCH-09', title: 'Monthly Workforce Headcount & Payroll Disbursal', cron: '0 11:00 28 * *', recipients: 'hr-finance@zenve.care', format: 'Confidential PDF', lastRun: '28 Sep 11:00 AM', active: true },
      { id: 'SCH-10', title: 'Vendor OTIF Fulfillment & Volume Rebates', cron: '0 10:30 1 * *', recipients: 'procurement@zenve.care', format: 'XLSX', lastRun: '01 Oct 10:30 AM', active: true }
    ],

    // 15. Export Datasets
    exportDatasets: [
      { id: 'EXP-RAW-001', name: 'Master Real-Time Sales Ledger (FY 2026-27)', tags: ['Sales', 'Orders', 'Audited'], records: '142,500 Rows', size: '28.4 MB', freq: 'Live Realtime' },
      { id: 'EXP-RAW-002', name: 'Audited GAAP Profit & Loss Master Schedule', tags: ['Finance', 'P&L', 'GAAP'], records: '1,240 Rows', size: '1.8 MB', freq: 'Daily at 08:00 AM' },
      { id: 'EXP-RAW-003', name: 'Pet Demographics & Vaccination Clinical Registry', tags: ['Healthcare', 'Pets', 'Vaccines'], records: '186,400 Rows', size: '36.2 MB', freq: 'Daily at 02:00 AM' },
      { id: 'EXP-RAW-004', name: 'Customer Cohorts, RFM Segments & LTV Matrix', tags: ['CRM', 'Cohorts', 'LTV'], records: '142,500 Rows', size: '24.1 MB', freq: 'Daily at 03:00 AM' },
      { id: 'EXP-RAW-005', name: 'Depot Warehouse Stock Valuation & Batch Expiry', tags: ['Inventory', 'Warehouses', 'Batches'], records: '18,400 Rows', size: '5.6 MB', freq: 'Every 4 Hours' },
      { id: 'EXP-RAW-006', name: 'Veterinary Doctor Caseload & Incentive Ledger', tags: ['Doctors', 'Clinical', 'Payroll'], records: '4,850 Rows', size: '2.4 MB', freq: 'Daily at 18:00 PM' },
      { id: 'EXP-RAW-007', name: 'Hospital Bed Occupancy, OPD Footfall & NABH', tags: ['Clinics', 'Hospitals', 'NABH'], records: '3,200 Rows', size: '1.9 MB', freq: 'Daily at 06:00 AM' },
      { id: 'EXP-RAW-008', name: 'Marketing Campaign ROAS, Impressions & Multi-Touch', tags: ['Marketing', 'CAC', 'ROAS'], records: '12,800 Rows', size: '4.2 MB', freq: 'Hourly Pipeline' },
      { id: 'EXP-RAW-009', name: '60-Min Express Logistics & Rider Telemetry', tags: ['Logistics', 'Delivery', 'SLA'], records: '98,600 Rows', size: '19.8 MB', freq: 'Realtime Webhook' },
      { id: 'EXP-RAW-010', name: 'Supplier Fill Rate, OTIF Scorecard & Rebates', tags: ['Vendors', 'Procurement', 'Contracts'], records: '2,640 Rows', size: '1.5 MB', freq: 'Weekly on Monday' }
    ]
  };

  /* ── 3. Application State ────────────────────────────────────────── */
  var S = {
    open: false,
    activeTab: 'sales',
    filterPeriod: 'month',
    searchQuery: '',
    customQuery: {
      dimension: 'channel',
      metric: 'net_sales',
      dateRange: '30d',
      resultRows: [
        { dim: 'Android App (60-Min Express)', sub: 'Bengaluru Metro Hubs', val: '₹46,41,840', units: '1,842 orders', metric: '42.5% Margin' },
        { dim: 'iOS App (Zenve Flagship)', sub: 'Mumbai & Delhi NCR', val: '₹33,89,850', units: '1,215 orders', metric: '46.0% Margin' },
        { dim: 'Web eCommerce Portal', sub: 'Pan-India Delivery', val: '₹17,64,000', units: '784 orders', metric: '38.2% Margin' },
        { dim: 'Koramangala Hospital Kiosk', sub: 'Central Bengaluru', val: '₹10,98,720', units: '436 orders', metric: '51.4% Margin' },
        { dim: 'Indiranagar Surgical Counter', sub: 'South Bengaluru', val: '₹8,42,400', units: '312 orders', metric: '48.9% Margin' },
        { dim: 'Tele-Consultation Direct Care', sub: 'National Tele-Vet', val: '₹4,46,400', units: '248 consults', metric: '68.5% Margin' },
        { dim: 'Corporate B2B Employee Wellness', sub: 'Enterprise Accounts', val: '₹3,45,600', units: '128 accounts', metric: '34.0% Margin' },
        { dim: 'WhatsApp Rapid Refill Service', sub: 'Automated Bot Orders', val: '₹1,72,800', units: '96 orders', metric: '44.8% Margin' },
        { dim: 'Subscription Plan Auto-Renewals', sub: 'Wellness Club Members', val: '₹1,05,840', units: '84 renewals', metric: '72.0% Margin' },
        { dim: 'Partner Veterinary Cross-Fulfill', sub: 'Affiliate Network', val: '₹49,950', units: '39 referrals', metric: '25.0% Margin' }
      ]
    }
  };

  var root = null;

  /* ── 4. Utility Functions ────────────────────────────────────────── */
  function downloadCSV(filename, rows) {
    var csvContent = rows.map(function (row) {
      return row.map(function (cell) {
        var str = String(cell !== undefined && cell !== null ? cell : '');
        if (str.search(/("|,|\n)/g) >= 0) {
          str = '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
      }).join(',');
    }).join('\r\n');

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    var url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded ' + filename);
  }

  function showToast(message) {
    var old = document.querySelector('.zrep-toast');
    if (old) old.remove();

    var toast = document.createElement('div');
    toast.className = 'zrep-toast';
    toast.innerHTML = '<span>⚡</span> <span>' + message + '</span>';
    document.body.appendChild(toast);

    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3200);
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = hash.toLowerCase().trim();
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].hash === clean || clean === '#' + MODULES[i].id) {
        return MODULES[i].id;
      }
    }
    if (clean === '#reports' || clean === '#analytics') return 'sales';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var norm = text.toLowerCase().trim();
    for (var i = 0; i < MODULES.length; i++) {
      var m = MODULES[i];
      if (norm === m.label.toLowerCase() ||
        norm.indexOf(m.label.toLowerCase()) >= 0 ||
        norm === m.id ||
        (m.id === 'sales' && norm.indexOf('sales report') >= 0) ||
        (m.id === 'revenue' && norm.indexOf('revenue report') >= 0) ||
        (m.id === 'customer' && norm.indexOf('customer report') >= 0) ||
        (m.id === 'pet' && norm.indexOf('pet report') >= 0) ||
        (m.id === 'doctor' && norm.indexOf('doctor report') >= 0) ||
        (m.id === 'clinic' && norm.indexOf('clinic report') >= 0) ||
        (m.id === 'product' && norm.indexOf('product report') >= 0) ||
        (m.id === 'inventory' && norm.indexOf('inventory report') >= 0) ||
        (m.id === 'finance' && norm.indexOf('finance report') >= 0) ||
        (m.id === 'hr' && norm.indexOf('hr report') >= 0) ||
        (m.id === 'marketing' && norm.indexOf('marketing report') >= 0) ||
        (m.id === 'operations' && norm.indexOf('operations report') >= 0) ||
        (m.id === 'vendor' && norm.indexOf('vendor report') >= 0) ||
        (m.id === 'custom' && norm.indexOf('custom report') >= 0) ||
        (m.id === 'scheduled' && norm.indexOf('scheduled report') >= 0) ||
        (m.id === 'export' && norm.indexOf('export center') >= 0)) {
        return m.id;
      }
    }
    return null;
  }

  /* ── 5. Render Shell & Navigation ────────────────────────────────── */
  function ensureRoot() {
    if (!root) {
      root = document.getElementById('zrep-root');
      if (!root) {
        root = document.createElement('div');
        root.id = 'zrep-root';
        document.body.appendChild(root);
      }
    }
  }

  function renderShell() {
    ensureRoot();

    var chipsHtml = MODULES.map(function (m) {
      var isActive = m.id === S.activeTab;
      return (
        '<button type="button" class="zrep-chip ' + (isActive ? 'active' : '') + '" data-tab="' + m.id + '">' +
        '<span>' + m.icon + '</span>' +
        '<span>' + m.label + '</span>' +
        '<span class="zrep-chip-badge">' + m.badge + '</span>' +
        '</button>'
      );
    }).join('');

    root.innerHTML =
      '<header class="zrep-header">' +
      '<div class="zrep-header-left">' +
      '<div class="zrep-brand-badge">📑</div>' +
      '<div class="zrep-title-group">' +
      '<div class="zrep-title-row">' +
      '<h1 class="zrep-main-title">Reports &amp; Analytics</h1>' +
      '<span class="zrep-status-badge">' +
      '<span class="zrep-pulse-dot"></span>' +
      '16 Modules Connected' +
      '</span>' +
      '</div>' +
      '<p class="zrep-sub-title">Unified Multi-Domain Intelligence, Automated Schedules &amp; Enterprise Export Center</p>' +
      '</div>' +
      '</div>' +
      '<div class="zrep-header-actions">' +
      '<button type="button" class="zrep-btn zrep-btn-primary" id="zrep-action-custom">' +
      '<span>⚡</span> Run Custom Report' +
      '</button>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-action-export">' +
      '<span>📥</span> Export Center' +
      '</button>' +
      '</div>' +
      '</header>' +
      '<nav class="zrep-nav-ribbon" id="zrep-nav-ribbon">' +
      chipsHtml +
      '</nav>' +
      '<div class="zrep-main-workspace" id="zrep-workspace">' +
      renderActiveView() +
      '</div>';

    bindShellEvents();
  }

  function bindShellEvents() {
    // Nav chips
    var ribbon = document.getElementById('zrep-nav-ribbon');
    if (ribbon) {
      ribbon.querySelectorAll('.zrep-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          var tab = this.getAttribute('data-tab');
          if (tab) switchTab(tab);
        });
      });
    }

    // Header buttons
    var btnClose = document.getElementById('zrep-close');
    if (btnClose) btnClose.addEventListener('click', close);

    var btnCustom = document.getElementById('zrep-action-custom');
    if (btnCustom) {
      btnCustom.addEventListener('click', function () {
        switchTab('custom');
      });
    }

    var btnExport = document.getElementById('zrep-action-export');
    if (btnExport) {
      btnExport.addEventListener('click', function () {
        switchTab('export');
      });
    }

    // Tab-specific interactive binds
    bindTabEvents();
  }

  /* ── 6. Render Active Tab View ───────────────────────────────────── */
  function renderActiveView() {
    switch (S.activeTab) {
      case 'sales': return renderSalesReport();
      case 'revenue': return renderRevenueReport();
      case 'customer': return renderCustomerReport();
      case 'pet': return renderPetReport();
      case 'doctor': return renderDoctorReport();
      case 'clinic': return renderClinicReport();
      case 'product': return renderProductReport();
      case 'inventory': return renderInventoryReport();
      case 'finance': return renderFinanceReport();
      case 'hr': return renderHRReport();
      case 'marketing': return renderMarketingReport();
      case 'operations': return renderOperationsReport();
      case 'vendor': return renderVendorReport();
      case 'custom': return renderCustomReports();
      case 'scheduled': return renderScheduledReports();
      case 'export': return renderExportCenter();
      default: return renderSalesReport();
    }
  }

  /* ── Subpage 1: Sales Reports ────────────────────────────────────── */
  function renderSalesReport() {
    var chRows = (D.salesChannels.length ? D.salesChannels.map(function (c) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + c.channel + '</td>' +
        '<td>' + c.orders + '</td>' +
        '<td>' + c.gross + '</td>' +
        '<td style="font-weight:700; color:#4f46e5;">' + c.net + '</td>' +
        '<td><span class="zrep-pill zrep-pill-purple">' + c.share + '</span></td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="5" style="text-align:center;padding:24px;color:#94a3b8;">No sales channel records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Gross Sales</span><span class="zrep-kpi-icon">💰</span></div>' +
      '<div class="zrep-kpi-value">' + D.salesSummary.grossSales + '</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +14.2%</span><span class="zrep-kpi-desc">vs last period</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Net GMV Revenue</span><span class="zrep-kpi-icon">📈</span></div>' +
      '<div class="zrep-kpi-value" style="color:#4f46e5;">' + D.salesSummary.netSales + '</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +15.8%</span><span class="zrep-kpi-desc">after discounts</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Orders</span><span class="zrep-kpi-icon">📦</span></div>' +
      '<div class="zrep-kpi-value">' + D.salesSummary.ordersCount + '</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +8.4%</span><span class="zrep-kpi-desc">completed orders</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Average Order Value</span><span class="zrep-kpi-icon">🎯</span></div>' +
      '<div class="zrep-kpi-value">' + D.salesSummary.aov + '</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +5.2%</span><span class="zrep-kpi-desc">basket size</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Channel Revenue Breakdown</h3>' +
      '<p class="zrep-card-subtitle">Gross billing, Net GMV and order contribution across all sales channels</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-sales">' +
      '<span>📥</span> Download Sales CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Sales Channel</th><th>Total Orders</th><th>Gross Billing</th><th>Net GMV</th><th>Contribution %</th></tr></thead>' +
      '<tbody>' + chRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 2: Revenue Reports ──────────────────────────────────── */
  function renderRevenueReport() {
    var buRows = (D.revenueBUs.length ? D.revenueBUs.map(function (b) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + b.unit + '</td>' +
        '<td>' + b.target + '</td>' +
        '<td style="font-weight:700; color:#0f172a;">' + b.achieved + '</td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + b.attainment + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-blue">' + b.margin + '</span></td>' +
        '<td style="color:#16a34a; font-weight:600;">' + b.trend + '</td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No business unit revenue records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Period Revenue Attainment</span><span class="zrep-kpi-icon">🎯</span></div>' +
      '<div class="zrep-kpi-value">105.5%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +5.5%</span><span class="zrep-kpi-desc">target attainment</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Blended Gross Margin</span><span class="zrep-kpi-icon">💎</span></div>' +
      '<div class="zrep-kpi-value">52.6%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +3.4%</span><span class="zrep-kpi-desc">margin expansion</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Annual Recurring Revenue</span><span class="zrep-kpi-icon">🔄</span></div>' +
      '<div class="zrep-kpi-value">₹16.40 Cr</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +28.2%</span><span class="zrep-kpi-desc">wellness plans</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Cash Inflow Speed</span><span class="zrep-kpi-icon">⚡</span></div>' +
      '<div class="zrep-kpi-value">98.4%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +2.1%</span><span class="zrep-kpi-desc">clearance speed</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Business Unit Performance vs Budget Targets</h3>' +
      '<p class="zrep-card-subtitle">Segment revenue, attainment % and gross margins across 5 core business units</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-revenue">' +
      '<span>📥</span> Download Revenue CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Business Unit</th><th>Target Budget</th><th>Actual Revenue</th><th>Attainment %</th><th>Gross Margin %</th><th>YoY Growth</th></tr></thead>' +
      '<tbody>' + buRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 3: Customer Reports ─────────────────────────────────── */
  function renderCustomerReport() {
    var cohortRows = (D.customerCohorts.length ? D.customerCohorts.map(function (c) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + c.cohort + '</td>' +
        '<td>' + c.users + '</td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + c.m1 + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + c.m3 + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-blue">' + c.m6 + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-purple">' + c.m12 + '</span></td>' +
        '<td style="font-weight:700; color:#4f46e5;">' + c.ltv + '</td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No customer cohort records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Registered Pet Parents</span><span class="zrep-kpi-icon">👥</span></div>' +
      '<div class="zrep-kpi-value">17,720</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +12.8%</span><span class="zrep-kpi-desc">new this month</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Repeat Purchase Rate</span><span class="zrep-kpi-icon">🔁</span></div>' +
      '<div class="zrep-kpi-value">76.4%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +4.2%</span><span class="zrep-kpi-desc">within 60 days</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Average Customer LTV</span><span class="zrep-kpi-icon">💎</span></div>' +
      '<div class="zrep-kpi-value">₹24,800</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +9.4%</span><span class="zrep-kpi-desc">annualized spend</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Churn Risk Propensity</span><span class="zrep-kpi-icon">🛡️</span></div>' +
      '<div class="zrep-kpi-value">3.8%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -0.6%</span><span class="zrep-kpi-desc">churn reduced</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Customer Cohort Retention &amp; LTV Progression</h3>' +
      '<p class="zrep-card-subtitle">Monthly registration cohorts, retention milestones and accumulated lifetime value</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-customer">' +
      '<span>📥</span> Download Cohort CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Acquisition Cohort</th><th>Cohort Size</th><th>Month 1</th><th>Month 3</th><th>Month 6</th><th>Month 12</th><th>Estimated LTV</th></tr></thead>' +
      '<tbody>' + cohortRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 4: Pet Reports ──────────────────────────────────────── */
  function renderPetReport() {
    var breedRows = (D.petBreeds.length ? D.petBreeds.map(function (p) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + p.breed + '</td>' +
        '<td><span class="zrep-pill ' + (p.species === 'Dog' ? 'zrep-pill-blue' : 'zrep-pill-purple') + '">' + p.species + '</span></td>' +
        '<td style="font-weight:700;">' + p.count + '</td>' +
        '<td>' + p.avgAge + '</td>' +
        '<td>' + p.topCondition + '</td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + p.adherence + '</span></td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No pet epidemiology records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Registered Pets</span><span class="zrep-kpi-icon">🐾</span></div>' +
      '<div class="zrep-kpi-value">18,810</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +14.5%</span><span class="zrep-kpi-desc">in health registry</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Vaccination Adherence</span><span class="zrep-kpi-icon">💉</span></div>' +
      '<div class="zrep-kpi-value">94.7%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +3.1%</span><span class="zrep-kpi-desc">on-time immunizations</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Chronic Cohort Wellness</span><span class="zrep-kpi-icon">❤️</span></div>' +
      '<div class="zrep-kpi-value">3,240</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +8.2%</span><span class="zrep-kpi-desc">active management</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Avg Care Plans / Pet</span><span class="zrep-kpi-icon">📋</span></div>' +
      '<div class="zrep-kpi-value">4.1 Plans</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +0.4</span><span class="zrep-kpi-desc">preventive visits</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Pet Breed Demographics &amp; Health Profile</h3>' +
      '<p class="zrep-card-subtitle">Epidemiology, average age, prevalent conditions and vaccination adherence rate</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-pet">' +
      '<span>📥</span> Download Pet CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Breed</th><th>Species</th><th>Total Registered</th><th>Average Age</th><th>Prevalent Health Profile</th><th>Vaccine Adherence</th></tr></thead>' +
      '<tbody>' + breedRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 5: Doctor Reports ───────────────────────────────────── */
  function renderDoctorReport() {
    var docRows = (D.doctors.length ? D.doctors.map(function (d) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + d.name + '</td>' +
        '<td>' + d.specialty + '</td>' +
        '<td>' + d.consults + '</td>' +
        '<td><span class="zrep-pill zrep-pill-purple">' + d.surgeries + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-green">★ ' + d.satisfaction + '</span></td>' +
        '<td style="font-weight:700; color:#0f172a;">' + d.commission + '</td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No doctor clinical records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Active Surgeons &amp; Vets</span><span class="zrep-kpi-icon">🩺</span></div>' +
      '<div class="zrep-kpi-value">36 Specialists</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +4</span><span class="zrep-kpi-desc">specialist roster</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Consultations</span><span class="zrep-kpi-icon">📋</span></div>' +
      '<div class="zrep-kpi-value">2,719</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +13.2%</span><span class="zrep-kpi-desc">OPD &amp; Tele-Vet</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Surgical Procedures</span><span class="zrep-kpi-icon">🔬</span></div>' +
      '<div class="zrep-kpi-value">330 Surgeries</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +9.4%</span><span class="zrep-kpi-desc">specialty OR</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Average Satisfaction</span><span class="zrep-kpi-icon">⭐</span></div>' +
      '<div class="zrep-kpi-value">4.93 / 5.0</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +0.05</span><span class="zrep-kpi-desc">patient rating</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Doctor Consultation Volume &amp; Clinical Benchmarks</h3>' +
      '<p class="zrep-card-subtitle">Consultation caseloads, surgical procedures, ratings and incentive payouts</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-doctor">' +
      '<span>📥</span> Download Doctor CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Veterinary Specialist</th><th>Clinical Specialty</th><th>Consultations</th><th>Surgeries</th><th>Pet Parent Rating</th><th>Commission Disbursed</th></tr></thead>' +
      '<tbody>' + docRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 6: Clinic Reports ───────────────────────────────────── */
  function renderClinicReport() {
    // Clinic-specific department throughput data
    var deptData = D.clinicDepartments || [];

    // Clinic satisfaction & NABH data
    var satisfData = D.clinicSatisfaction || [];

    var deptRows = (deptData.length ? deptData.map(function (d) {
      var npsColor = parseInt(d.nps) >= 75 ? 'zrep-pill-green' : (parseInt(d.nps) >= 70 ? 'zrep-pill-blue' : 'zrep-pill-amber');
      var infColor = parseFloat(d.infectionRate) <= 0.06 ? 'zrep-pill-green' : (parseFloat(d.infectionRate) <= 0.10 ? 'zrep-pill-blue' : 'zrep-pill-amber');
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + d.dept + '</td>' +
        '<td>' + d.cases + '</td>' +
        '<td><span class="zrep-pill zrep-pill-purple">' + d.avgLoS + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-blue">' + d.bedUtil + '</span></td>' +
        '<td>' + d.nurseRatio + '</td>' +
        '<td><span class="zrep-pill ' + npsColor + '">NPS ' + d.nps + '</span></td>' +
        '<td><span class="zrep-pill ' + infColor + '">' + d.infectionRate + '</span></td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No clinical department records found</td></tr>');

    var satisfRows = (satisfData.length ? satisfData.map(function (s) {
      var nabh = s.nabh === 'Accredited' ? 'zrep-pill-green' : 'zrep-pill-amber';
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + s.hub + '</td>' +
        '<td><span class="zrep-pill zrep-pill-purple">NPS ' + s.nps + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-green">★ ' + s.csat + '</span></td>' +
        '<td><span class="zrep-pill ' + nabh + '">' + s.nabh + '</span></td>' +
        '<td>' + s.complaint + '</td>' +
        '<td style="font-weight:700; color:#0f172a;">' + s.repeat + '</td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No clinic quality records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Avg Length of Stay</span><span class="zrep-kpi-icon">🛏️</span></div>' +
      '<div class="zrep-kpi-value">1.8 Days</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -0.3d</span><span class="zrep-kpi-desc">vs last quarter</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">NABH Accredited Hubs</span><span class="zrep-kpi-icon">🏅</span></div>' +
      '<div class="zrep-kpi-value">10 Clinics</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">100% Certified</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Avg Infection Rate</span><span class="zrep-kpi-icon">🦠</span></div>' +
      '<div class="zrep-kpi-value">0.12%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -0.05%</span><span class="zrep-kpi-desc">sterile protocols</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Overall Patient NPS</span><span class="zrep-kpi-icon">⭐</span></div>' +
      '<div class="zrep-kpi-value">NPS 88</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +4 pts</span><span class="zrep-kpi-desc">across hubs</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Department-wise Clinical Throughput &amp; Infection Control</h3>' +
      '<p class="zrep-card-subtitle">Admissions by department, average length of stay, bed utilization, nurse ratios, NPS and HAI infection rate</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-clinic-dept">' +
      '<span>📥</span> Download Dept CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Department</th><th>Cases</th><th>Avg LoS</th><th>Bed Utilization</th><th>Nurse:Patient</th><th>NPS Score</th><th>Infection Rate</th></tr></thead>' +
      '<tbody>' + deptRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Hub-wise Patient Satisfaction, NABH Compliance &amp; Repeat Visits</h3>' +
      '<p class="zrep-card-subtitle">CSAT scores, NPS per hospital hub, NABH accreditation status, complaint rate and repeat patient retention</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-clinic">' +
      '<span>📥</span> Download Clinic CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Hospital Hub</th><th>NPS</th><th>CSAT Rating</th><th>NABH Status</th><th>Complaint Rate</th><th>Repeat Visits</th></tr></thead>' +
      '<tbody>' + satisfRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 7: Product Reports ──────────────────────────────────── */
  function renderProductReport() {
    var prodRows = (D.topProducts.length ? D.topProducts.map(function (p) {
      return (
        '<tr>' +
        '<td style="font-family:monospace; font-size:11px;">' + p.sku + '</td>' +
        '<td style="font-weight:600; color:#0f172a;">' + p.name + '</td>' +
        '<td>' + p.cat + '</td>' +
        '<td>' + p.units + '</td>' +
        '<td style="font-weight:700; color:#0f172a;">' + p.rev + '</td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + p.margin + '</span></td>' +
        '<td><span class="zrep-pill ' + (p.abc === 'A' ? 'zrep-pill-purple' : 'zrep-pill-blue') + '">Class ' + p.abc + '</span></td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No top product records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Active SKUs</span><span class="zrep-kpi-icon">🏷️</span></div>' +
      '<div class="zrep-kpi-value">2,450 SKUs</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">99.4% In-Stock Rate</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Class A Revenue Share</span><span class="zrep-kpi-icon">🏆</span></div>' +
      '<div class="zrep-kpi-value">78.4%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">80/20 Pareto Yield</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Average Product Margin</span><span class="zrep-kpi-icon">💎</span></div>' +
      '<div class="zrep-kpi-value">49.4%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +2.8% SKU economics</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Product Return Rate</span><span class="zrep-kpi-icon">🔄</span></div>' +
      '<div class="zrep-kpi-value">0.7%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -0.3% return rate</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Top SKUs &amp; Pareto ABC Classification</h3>' +
      '<p class="zrep-card-subtitle">Unit velocity, revenue yield, gross margin and inventory ABC stratification</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-product">' +
      '<span>📥</span> Download Product CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>SKU Code</th><th>Product Description</th><th>Category</th><th>Units Sold</th><th>Total Revenue</th><th>Margin %</th><th>ABC Class</th></tr></thead>' +
      '<tbody>' + prodRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 8: Inventory Reports ────────────────────────────────── */
  function renderInventoryReport() {
    var invRows = (D.inventoryDepots.length ? D.inventoryDepots.map(function (d) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + d.hub + '</td>' +
        '<td>' + d.skus + '</td>' +
        '<td style="font-weight:700; color:#4f46e5;">' + d.val + '</td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + d.dsi + '</span></td>' +
        '<td><span class="zrep-pill ' + (d.expiryNear === '₹4,80,000' ? 'zrep-pill-amber' : 'zrep-pill-blue') + '">' + d.expiryNear + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-gray">' + d.space + '</span></td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No inventory depot records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Stock Valuation</span><span class="zrep-kpi-icon">📦</span></div>' +
      '<div class="zrep-kpi-value">₹6.23 Cr</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +5.8% total valuation</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Days Sales of Inventory</span><span class="zrep-kpi-icon">📅</span></div>' +
      '<div class="zrep-kpi-value">18.4 Days</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -2.6 days cover</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Cold-Chain Vaccines</span><span class="zrep-kpi-icon">❄️</span></div>' +
      '<div class="zrep-kpi-value">99.8%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">100% telemetry feeds</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Shrinkage &amp; Discrepancy</span><span class="zrep-kpi-icon">🛡️</span></div>' +
      '<div class="zrep-kpi-value">0.08%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -0.04% variance</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Warehouse &amp; Dark Store Stock Valuation</h3>' +
      '<p class="zrep-card-subtitle">Hub inventory valuation, days cover, expiry risk exposure and space utilization</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-inventory">' +
      '<span>📥</span> Download Inventory CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Warehouse / Depot Node</th><th>Active SKUs</th><th>Stock Valuation</th><th>DSI Cover</th><th>Expiring (&lt;60d)</th><th>Space Used</th></tr></thead>' +
      '<tbody>' + invRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 9: Finance Reports ──────────────────────────────────── */
  function renderFinanceReport() {
    var pnlRows = (D.financePnL.length ? D.financePnL.map(function (p) {
      var isNegative = p.mtd.charAt(0) === '-';
      var isHighlight = p.line.indexOf('Profit') >= 0 || p.line.indexOf('EBITDA') >= 0 || p.line.indexOf('Net Operating') >= 0;
      return (
        '<tr style="' + (isHighlight ? 'background:#f8fafc; font-weight:700;' : '') + '">' +
        '<td style="color:#0f172a;">' + p.line + '</td>' +
        '<td style="' + (isNegative ? 'color:#dc2626;' : 'color:#0f172a;') + '">' + p.mtd + '</td>' +
        '<td style="' + (isNegative ? 'color:#dc2626;' : 'color:#0f172a;') + '">' + p.qtd + '</td>' +
        '<td><span class="zrep-pill ' + (isNegative ? 'zrep-pill-red' : 'zrep-pill-green') + '">' + p.pct + '</span></td>' +
        '<td style="font-size:11.5px; color:#64748b;">' + p.note + '</td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="5" style="text-align:center;padding:24px;color:#94a3b8;">No GAAP P&L statement records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Net Operating Revenue</span><span class="zrep-kpi-icon">💰</span></div>' +
      '<div class="zrep-kpi-value">₹2.68 Cr</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +17.2% MTD</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Gross Margin</span><span class="zrep-kpi-icon">📊</span></div>' +
      '<div class="zrep-kpi-value">47.0%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">₹1.26 Cr Gross Profit</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Operating EBITDA</span><span class="zrep-kpi-icon">📈</span></div>' +
      '<div class="zrep-kpi-value">15.8%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">₹42.50 L Cash EBITDA</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Net Profit (PAT)</span><span class="zrep-kpi-icon">💎</span></div>' +
      '<div class="zrep-kpi-value">14.2%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">₹38.20 L Net Profit</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Audited GAAP Profit &amp; Loss Statement</h3>' +
      '<p class="zrep-card-subtitle">Comprehensive monthly and quarterly audited line item reconciliation</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-finance">' +
      '<span>📥</span> Download P&amp;L CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>GAAP Line Item</th><th>MTD Actuals</th><th>QTD Accumulated</th><th>Revenue %</th><th>Financial Notes</th></tr></thead>' +
      '<tbody>' + pnlRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 10: HR Reports ──────────────────────────────────────── */
  function renderHRReport() {
    var hrRows = (D.hrDepartments.length ? D.hrDepartments.map(function (h) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + h.dept + '</td>' +
        '<td style="font-weight:700;">' + h.count + ' FTEs</td>' +
        '<td style="font-weight:700; color:#0f172a;">' + h.payroll + '</td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + h.attendance + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-blue">' + h.turn + '</span></td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="5" style="text-align:center;padding:24px;color:#94a3b8;">No workforce department records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Workforce Headcount</span><span class="zrep-kpi-icon">🧑‍💼</span></div>' +
      '<div class="zrep-kpi-value">364 Staff</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +28 active members</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Monthly Payroll Outflow</span><span class="zrep-kpi-icon">💳</span></div>' +
      '<div class="zrep-kpi-value">₹2.44 Cr</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">100% disbursement</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Blended Attendance Rate</span><span class="zrep-kpi-icon">⏱️</span></div>' +
      '<div class="zrep-kpi-value">98.6%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +1.2% adherence</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Monthly Employee Turnover</span><span class="zrep-kpi-icon">🛡️</span></div>' +
      '<div class="zrep-kpi-value">1.9%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -0.7% turnover</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Department Headcount, Payroll &amp; Adherence</h3>' +
      '<p class="zrep-card-subtitle">Full-time employee allocation, monthly salary expenditure and staff turnover</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-hr">' +
      '<span>📥</span> Download HR CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Operating Department</th><th>Headcount (FTE)</th><th>Monthly Payroll</th><th>Attendance %</th><th>Monthly Turnover</th></tr></thead>' +
      '<tbody>' + hrRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 11: Marketing Reports ───────────────────────────────── */
  function renderMarketingReport() {
    var mktRows = (D.marketingChannels.length ? D.marketingChannels.map(function (m) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + m.channel + '</td>' +
        '<td>' + m.spend + '</td>' +
        '<td style="font-weight:700; color:#4f46e5;">' + m.rev + '</td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + m.roas + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-blue">' + m.cac + '</span></td>' +
        '<td style="font-weight:600;">' + m.newUsers + '</td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No marketing attribution records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Blended Marketing ROAS</span><span class="zrep-kpi-icon">🎯</span></div>' +
      '<div class="zrep-kpi-value">7.63x</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">₹1.39 Cr Attributed GMV</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Customer Acquisition Cost</span><span class="zrep-kpi-icon">🏷️</span></div>' +
      '<div class="zrep-kpi-value">₹362</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">6.8x LTV:CAC</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Total Performance Spend</span><span class="zrep-kpi-icon">💸</span></div>' +
      '<div class="zrep-kpi-value">₹18.20 L</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">7.4% Net GMV</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">New Customers Acquired</span><span class="zrep-kpi-icon">👥</span></div>' +
      '<div class="zrep-kpi-value">5,020</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +19.4% new registrations</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Channel Marketing Attribution &amp; ROAS Economics</h3>' +
      '<p class="zrep-card-subtitle">Channel ad expenditure, attributed revenue, return on ad spend and unit CAC</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-marketing">' +
      '<span>📥</span> Download Marketing CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Marketing Attribution Channel</th><th>Ad Spend</th><th>Attributed Revenue</th><th>ROAS Multiple</th><th>Blended CAC</th><th>New Pet Parents</th></tr></thead>' +
      '<tbody>' + mktRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 12: Operations Reports ──────────────────────────────── */
  function renderOperationsReport() {
    var opsRows = (D.operationsHubs.length ? D.operationsHubs.map(function (o) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + o.hub + '</td>' +
        '<td>' + o.orders + '</td>' +
        '<td><span class="zrep-pill zrep-pill-blue">' + o.avgMins + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + o.slaPass + '</span></td>' +
        '<td>' + o.activeRiders + ' riders</td>' +
        '<td><span class="zrep-pill zrep-pill-green">★ ' + o.rating + '</span></td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No operations hub records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">60-Min Express SLA Rate</span><span class="zrep-kpi-icon">⚡</span></div>' +
      '<div class="zrep-kpi-value">98.2%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Avg 38 mins</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Active Delivery Fleet</span><span class="zrep-kpi-icon">🛵</span></div>' +
      '<div class="zrep-kpi-value">244 Riders</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">100% EV telemetry</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Dark Store Staging Dwell</span><span class="zrep-kpi-icon">⏱️</span></div>' +
      '<div class="zrep-kpi-value">8.1 mins</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -1.2 mins dispatch</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Delivery Satisfaction</span><span class="zrep-kpi-icon">⭐</span></div>' +
      '<div class="zrep-kpi-value">4.92 / 5.0</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +0.08 rating</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Dark Store Hub Dispatch &amp; Express Delivery Telemetry</h3>' +
      '<p class="zrep-card-subtitle">Orders processed, average delivery duration, SLA pass %, fleet size and ratings</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-operations">' +
      '<span>📥</span> Download Operations CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Dark Store Dispatch Hub</th><th>Orders Dispatched</th><th>Avg Delivery Time</th><th>60-Min SLA Pass</th><th>Active Fleet</th><th>Customer Rating</th></tr></thead>' +
      '<tbody>' + opsRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 13: Vendor Reports ──────────────────────────────────── */
  function renderVendorReport() {
    var vRows = (D.vendors.length ? D.vendors.map(function (v) {
      return (
        '<tr>' +
        '<td style="font-weight:600; color:#0f172a;">' + v.name + '</td>' +
        '<td>' + v.category + '</td>' +
        '<td style="font-weight:700; color:#0f172a;">' + v.poVolume + '</td>' +
        '<td><span class="zrep-pill zrep-pill-green">' + v.fillRate + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-blue">' + v.otif + '</span></td>' +
        '<td><span class="zrep-pill zrep-pill-purple">' + v.rebate + '</span></td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No vendor scorecard records found</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Active Suppliers &amp; Vendors</span><span class="zrep-kpi-icon">🤝</span></div>' +
      '<div class="zrep-kpi-value">10 Vendors</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">100% compliant vendors</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Purchase Order Fill Rate</span><span class="zrep-kpi-icon">📋</span></div>' +
      '<div class="zrep-kpi-value">99.1%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +0.8% fill rate</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">On-Time In-Full (OTIF)</span><span class="zrep-kpi-icon">⏱️</span></div>' +
      '<div class="zrep-kpi-value">98.3%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +1.1% OTIF</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Procurement Savings &amp; Rebates</span><span class="zrep-kpi-icon">💰</span></div>' +
      '<div class="zrep-kpi-value">₹22.80 L</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +16.5% savings</span></div>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title">Top Suppliers Scorecard &amp; Fulfillment Reliability</h3>' +
      '<p class="zrep-card-subtitle">Procurement volume, PO fulfillment rate, OTIF score and negotiated volume rebates</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-dl-vendor">' +
      '<span>📥</span> Download Vendor CSV' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Vendor / Supplier Organization</th><th>Supply Domain</th><th>PO Billing Volume</th><th>PO Fill Rate</th><th>OTIF Compliance</th><th>Negotiated Rebate</th></tr></thead>' +
      '<tbody>' + vRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 14: Custom Reports Builder ──────────────────────────── */
  function renderCustomReports() {
    var previewRows = '';
    if (S.customQuery.resultRows && S.customQuery.resultRows.length > 0) {
      previewRows = S.customQuery.resultRows.map(function (r) {
        return (
          '<tr>' +
          '<td style="font-weight:600; color:#0f172a;">' + r.dim + '</td>' +
          '<td>' + r.sub + '</td>' +
          '<td style="font-weight:700; color:#4f46e5;">' + r.val + '</td>' +
          '<td>' + r.units + '</td>' +
          '<td><span class="zrep-pill zrep-pill-green">' + r.metric + '</span></td>' +
          '</tr>'
        );
      }).join('');
    } else {
      previewRows =
        '<tr><td colspan="5" style="text-align:center; padding:32px; color:#94a3b8;">' +
        'Click <b>"Execute Query"</b> to generate dynamic multi-dimensional dataset preview.' +
        '</td></tr>';
    }

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Query Latency</span><span class="zrep-kpi-icon">⚡</span></div>' +
      '<div class="zrep-kpi-value">18 ms</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -6 ms vs baseline</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Supported Dimensions</span><span class="zrep-kpi-icon">📐</span></div>' +
      '<div class="zrep-kpi-value">14 Dimensions</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +2 New</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Saved Team Queries</span><span class="zrep-kpi-icon">⭐</span></div>' +
      '<div class="zrep-kpi-value">28 Presets</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Active presets</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Max Export Throughput</span><span class="zrep-kpi-icon">📊</span></div>' +
      '<div class="zrep-kpi-value">250,000 Rows</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Streaming engine</span></div>' +
      '</div>' +
      '</div>' +
      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title"><span>⚡</span> Multi-Dimensional Custom Report Builder</h3>' +
      '<p class="zrep-card-subtitle">Construct ad-hoc multidimensional analytics queries across any combination of dimensions and metrics</p>' +
      '</div>' +
      '<div style="display:flex; gap:8px;">' +
      '<button type="button" class="zrep-btn zrep-btn-primary" id="zrep-run-query"><span>⚡</span> Execute Query</button>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-export-query"><span>📥</span> Export Query CSV</button>' +
      '</div>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-builder-grid">' +
      '<div class="zrep-field-group">' +
      '<label class="zrep-field-label">Primary Dimension</label>' +
      '<select class="zrep-select" id="zrep-dim-primary" style="width:100%;">' +
      '<option value="channel">Sales Channel (Online, Clinics, Express)</option>' +
      '<option value="bu">Business Unit (Products, Pharmacy, Services)</option>' +
      '<option value="doctor">Doctor &amp; Specialty</option>' +
      '<option value="clinic">Clinic &amp; Hospital Node</option>' +
      '<option value="breed">Pet Breed &amp; Species</option>' +
      '<option value="vendor">Vendor &amp; Manufacturer</option>' +
      '</select>' +
      '</div>' +
      '<div class="zrep-field-group">' +
      '<label class="zrep-field-label">Secondary Stratification</label>' +
      '<select class="zrep-select" id="zrep-dim-secondary" style="width:100%;">' +
      '<option value="month">Time Period (Month / Quarter)</option>' +
      '<option value="sku_cat">SKU Product Category</option>' +
      '<option value="city">Geographic City &amp; Hub</option>' +
      '<option value="payment">Payment Mode (UPI, Cards, Corporate)</option>' +
      '</select>' +
      '</div>' +
      '<div class="zrep-field-group">' +
      '<label class="zrep-field-label">Date Window</label>' +
      '<select class="zrep-select" id="zrep-dim-range" style="width:100%;">' +
      '<option value="mtd">Month to Date (Current Month)</option>' +
      '<option value="last30">Last 30 Rolling Days</option>' +
      '<option value="qtd">Quarter to Date (Q3 2026)</option>' +
      '<option value="ytd">Year to Date (FY 2026)</option>' +
      '</select>' +
      '</div>' +
      '</div>' +

      '<div style="margin-top:14px; margin-bottom:18px;">' +
      '<label class="zrep-field-label" style="margin-bottom:8px; display:block;">Select Aggregated Metrics to Project</label>' +
      '<div class="zrep-check-grid">' +
      '<label class="zrep-check-item"><input type="checkbox" checked/> Gross Sales (₹)</label>' +
      '<label class="zrep-check-item"><input type="checkbox" checked/> Net GMV (₹)</label>' +
      '<label class="zrep-check-item"><input type="checkbox" checked/> Order Volume</label>' +
      '<label class="zrep-check-item"><input type="checkbox" checked/> Gross Margin %</label>' +
      '<label class="zrep-check-item"><input type="checkbox"/> Average Order Value (AOV)</label>' +
      '<label class="zrep-check-item"><input type="checkbox"/> Return / Refund %</label>' +
      '</div>' +
      '</div>' +

      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Primary Dimension</th><th>Secondary Segment</th><th>Projected GMV</th><th>Volume / Units</th><th>Margin / Target</th></tr></thead>' +
      '<tbody id="zrep-query-table">' + previewRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 15: Scheduled Reports ───────────────────────────────── */
  function renderScheduledReports() {
    var schedCards = (D.schedules.length ? D.schedules.map(function (s) {
      return (
        '<div class="zrep-sched-card">' +
        '<div>' +
        '<div class="zrep-sched-header">' +
        '<span class="zrep-sched-title">' + s.title + '</span>' +
        '<span class="zrep-sched-cron">⏱️ ' + s.cron + '</span>' +
        '</div>' +
        '<div style="font-size:12px; color:#64748b; margin-top:8px;">' +
        '<div><b>Recipients:</b> ' + s.recipients + '</div>' +
        '<div><b>Format:</b> ' + s.format + '</div>' +
        '<div><b>Last Dispatched:</b> ' + s.lastRun + '</div>' +
        '</div>' +
        '</div>' +
        '<div style="display:flex; align-items:center; justify-content:space-between; margin-top:12px; padding-top:12px; border-top:1px solid #f1f5f9;">' +
        '<span class="zrep-pill ' + (s.active ? 'zrep-pill-green' : 'zrep-pill-gray') + '">' +
        (s.active ? '● Active Schedule' : '○ Paused') +
        '</span>' +
        '<div style="display:flex; gap:6px;">' +
        '<button type="button" class="zrep-btn zrep-btn-outline zrep-run-schedule" data-id="' + s.id + '" style="padding:4px 8px; font-size:11px;">' +
        'Run Now' +
        '</button>' +
        '<button type="button" class="zrep-btn zrep-btn-outline zrep-toggle-schedule" data-id="' + s.id + '" style="padding:4px 8px; font-size:11px;">' +
        (s.active ? 'Pause' : 'Activate') +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>'
      );
    }).join('') : '<div style="text-align:center;padding:32px;color:#94a3b8;">No scheduled reports configured</div>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Active Automated Jobs</span><span class="zrep-kpi-icon">⏰</span></div>' +
      '<div class="zrep-kpi-value">10 Jobs Active</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +3 New cron</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Daily Email Dispatches</span><span class="zrep-kpi-icon">📬</span></div>' +
      '<div class="zrep-kpi-value">48 Deliveries</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +12.0% volume</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Slack Leadership Alerts</span><span class="zrep-kpi-icon">💬</span></div>' +
      '<div class="zrep-kpi-value">6 Channels</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Real-time webhook</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Audit Compliance Log</span><span class="zrep-kpi-icon">🛡️</span></div>' +
      '<div class="zrep-kpi-value">SOC-2 Standard</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">100% Pass</span></div>' +
      '</div>' +
      '</div>' +
      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title"><span>⏰</span> Automated Scheduled Intelligence Dispatches</h3>' +
      '<p class="zrep-card-subtitle">Manage recurring report generation cron jobs, recipient distributions and triggers</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-primary" id="zrep-new-schedule">' +
      '<span>＋</span> Schedule New Report' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(340px, 1fr)); gap:16px;">' +
      schedCards +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── Subpage 16: Export Center ───────────────────────────────────── */
  function renderExportCenter() {
    var expRows = (D.exportDatasets.length ? D.exportDatasets.map(function (e) {
      var tagPills = e.tags.map(function (t) {
        return '<span class="zrep-pill zrep-pill-gray" style="margin-right:4px;">' + t + '</span>';
      }).join('');

      return (
        '<tr>' +
        '<td style="font-family:monospace; font-size:11.5px; font-weight:600;">' + e.id + '</td>' +
        '<td>' +
        '<div style="font-weight:700; color:#0f172a;">' + e.name + '</div>' +
        '<div style="margin-top:2px;">' + tagPills + '</div>' +
        '</td>' +
        '<td style="font-weight:600;">' + e.records + '</td>' +
        '<td>' + e.size + '</td>' +
        '<td><span class="zrep-pill zrep-pill-blue">' + e.freq + '</span></td>' +
        '<td>' +
        '<button type="button" class="zrep-btn zrep-btn-primary zrep-download-dataset" data-id="' + e.id + '" data-name="' + e.name + '" style="padding:5px 12px; font-size:11.5px;">' +
        '<span>📥</span> Download CSV' +
        '</button>' +
        '</td>' +
        '</tr>'
      );
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No export datasets available</td></tr>');

    return (
      '<div class="zrep-view-panel active">' +
      '<div class="zrep-kpi-grid">' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Exports Generated MTD</span><span class="zrep-kpi-icon">📥</span></div>' +
      '<div class="zrep-kpi-value">1,480 Files</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↑ +22.5% MTD</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Data Pipeline Bandwidth</span><span class="zrep-kpi-icon">⚡</span></div>' +
      '<div class="zrep-kpi-value">142.8 GB</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">Compressed streams</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Export Audit Compliance</span><span class="zrep-kpi-icon">🛡️</span></div>' +
      '<div class="zrep-kpi-value">100.0%</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">SOC-2 Type II</span></div>' +
      '</div>' +
      '<div class="zrep-kpi-card">' +
      '<div class="zrep-kpi-header"><span class="zrep-kpi-label">Average Generation Time</span><span class="zrep-kpi-icon">⏱️</span></div>' +
      '<div class="zrep-kpi-value">1.8s</div>' +
      '<div class="zrep-kpi-meta"><span class="zrep-trend-pos">↓ -0.4s fast pipe</span></div>' +
      '</div>' +
      '</div>' +
      '<div class="zrep-card">' +
      '<div class="zrep-card-header">' +
      '<div>' +
      '<h3 class="zrep-card-title"><span>📥</span> Centralized Raw Data Export Terminal</h3>' +
      '<p class="zrep-card-subtitle">Download sanitized, full-fidelity transactional datasets for Excel, PowerBI and Python analytics</p>' +
      '</div>' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-download-all-zip">' +
      '<span>📦</span> Download All Master Datasets' +
      '</button>' +
      '</div>' +
      '<div class="zrep-card-body">' +
      '<div class="zrep-table-wrap">' +
      '<table class="zrep-table">' +
      '<thead><tr><th>Dataset ID</th><th>Dataset Name &amp; Categorization</th><th>Total Record Count</th><th>File Payload</th><th>Refresh Cadence</th><th>Action</th></tr></thead>' +
      '<tbody>' + expRows + '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  /* ── 7. Tab-Specific Event Bindings ──────────────────────────────── */
  function bindTabEvents() {
    // 1. Sales Download
    var btnDlSales = document.getElementById('zrep-dl-sales');
    if (btnDlSales) {
      btnDlSales.addEventListener('click', function () {
        var rows = [];
        D.salesChannels.forEach(function (c) {
          rows.push([c.channel, c.orders, c.gross, c.net, c.share]);
        });
        downloadCSV('zenve-sales-report.csv', rows);
      });
    }

    // 2. Revenue Download
    var btnDlRev = document.getElementById('zrep-dl-revenue');
    if (btnDlRev) {
      btnDlRev.addEventListener('click', function () {
        var rows = [];
        D.revenueBUs.forEach(function (b) {
          rows.push([b.unit, b.target, b.achieved, b.attainment, b.margin, b.trend]);
        });
        downloadCSV('zenve-revenue-report.csv', rows);
      });
    }

    // 3. Customer Download
    var btnDlCust = document.getElementById('zrep-dl-customer');
    if (btnDlCust) {
      btnDlCust.addEventListener('click', function () {
        var rows = [];
        D.customerCohorts.forEach(function (c) {
          rows.push([c.cohort, c.users, c.m1, c.m3, c.m6, c.m12, c.ltv]);
        });
        downloadCSV('zenve-customer-cohorts.csv', rows);
      });
    }

    // 4. Pet Download
    var btnDlPet = document.getElementById('zrep-dl-pet');
    if (btnDlPet) {
      btnDlPet.addEventListener('click', function () {
        var rows = [];
        D.petBreeds.forEach(function (p) {
          rows.push([p.breed, p.species, p.count, p.avgAge, p.topCondition, p.adherence]);
        });
        downloadCSV('zenve-pet-epidemiology.csv', rows);
      });
    }

    // 5. Doctor Download
    var btnDlDoc = document.getElementById('zrep-dl-doctor');
    if (btnDlDoc) {
      btnDlDoc.addEventListener('click', function () {
        var rows = [];
        D.doctors.forEach(function (d) {
          rows.push([d.name, d.specialty, d.consults, d.surgeries, d.satisfaction, d.commission]);
        });
        downloadCSV('zenve-doctor-performance.csv', rows);
      });
    }

    // 6. Clinic Hub Satisfaction Download
    var btnDlClinic = document.getElementById('zrep-dl-clinic');
    if (btnDlClinic) {
      btnDlClinic.addEventListener('click', function () {
        var rows = [];
        var satisfDataLocal = (D.clinicSatisfaction || []).map(function (s) { return [s.hub, s.nps, s.csat, s.nabh, s.complaint, s.repeat]; });
        satisfDataLocal.forEach(function (r) { rows.push(r); });
        downloadCSV('zenve-clinic-satisfaction-nabh.csv', rows);
      });
    }

    // 6b. Clinic Department Throughput Download
    var btnDlClinicDept = document.getElementById('zrep-dl-clinic-dept');
    if (btnDlClinicDept) {
      btnDlClinicDept.addEventListener('click', function () {
        var rows = [];
        var deptLocal = (D.clinicDepartments || []).map(function (d) { return [d.dept, d.cases, d.avgLoS, d.bedUtil, d.nurseRatio, d.nps, d.infectionRate]; });
        deptLocal.forEach(function (r) { rows.push(r); });
        downloadCSV('zenve-clinic-department-throughput.csv', rows);
      });
    }

    // 7. Product Download
    var btnDlProd = document.getElementById('zrep-dl-product');
    if (btnDlProd) {
      btnDlProd.addEventListener('click', function () {
        var rows = [];
        D.topProducts.forEach(function (p) {
          rows.push([p.sku, p.name, p.cat, p.units, p.rev, p.margin, p.abc]);
        });
        downloadCSV('zenve-product-skus.csv', rows);
      });
    }

    // 8. Inventory Download
    var btnDlInv = document.getElementById('zrep-dl-inventory');
    if (btnDlInv) {
      btnDlInv.addEventListener('click', function () {
        var rows = [];
        D.inventoryDepots.forEach(function (i) {
          rows.push([i.hub, i.skus, i.val, i.dsi, i.expiryNear, i.space]);
        });
        downloadCSV('zenve-inventory-valuation.csv', rows);
      });
    }

    // 9. Finance Download
    var btnDlFin = document.getElementById('zrep-dl-finance');
    if (btnDlFin) {
      btnDlFin.addEventListener('click', function () {
        var rows = [];
        D.financePnL.forEach(function (p) {
          rows.push([p.line, p.mtd, p.qtd, p.pct, p.note]);
        });
        downloadCSV('zenve-finance-gaap-pnl.csv', rows);
      });
    }

    // 10. HR Download
    var btnDlHr = document.getElementById('zrep-dl-hr');
    if (btnDlHr) {
      btnDlHr.addEventListener('click', function () {
        var rows = [];
        D.hrDepartments.forEach(function (h) {
          rows.push([h.dept, h.count, h.payroll, h.attendance, h.turn]);
        });
        downloadCSV('zenve-hr-workforce-report.csv', rows);
      });
    }

    // 11. Marketing Download
    var btnDlMkt = document.getElementById('zrep-dl-marketing');
    if (btnDlMkt) {
      btnDlMkt.addEventListener('click', function () {
        var rows = [];
        D.marketingChannels.forEach(function (m) {
          rows.push([m.channel, m.spend, m.rev, m.roas, m.cac, m.newUsers]);
        });
        downloadCSV('zenve-marketing-roas-report.csv', rows);
      });
    }

    // 12. Operations Download
    var btnDlOps = document.getElementById('zrep-dl-operations');
    if (btnDlOps) {
      btnDlOps.addEventListener('click', function () {
        var rows = [];
        D.operationsHubs.forEach(function (o) {
          rows.push([o.hub, o.orders, o.avgMins, o.slaPass, o.activeRiders, o.rating]);
        });
        downloadCSV('zenve-operations-delivery-sla.csv', rows);
      });
    }

    // 13. Vendor Download
    var btnDlVen = document.getElementById('zrep-dl-vendor');
    if (btnDlVen) {
      btnDlVen.addEventListener('click', function () {
        var rows = [];
        D.vendors.forEach(function (v) {
          rows.push([v.name, v.category, v.poVolume, v.fillRate, v.otif, v.rebate]);
        });
        downloadCSV('zenve-vendor-scorecards.csv', rows);
      });
    }

    // 14. Custom Reports Query Runner
    var btnRunQuery = document.getElementById('zrep-run-query');
    if (btnRunQuery) {
      btnRunQuery.addEventListener('click', function () {
        var prim = document.getElementById('zrep-dim-primary') ? document.getElementById('zrep-dim-primary').value : 'channel';
        var sec = document.getElementById('zrep-dim-secondary') ? document.getElementById('zrep-dim-secondary').value : 'month';

        var rows = [];
        if (S.customQuery.resultRows && S.customQuery.resultRows.length > 0) {
          S.customQuery.resultRows.forEach(function (r) {
            rows.push([r.dim, r.sub, r.val, r.units, r.metric]);
          });
        }
        downloadCSV('zenve-custom-query-export.csv', rows);
      });
    }

    // 15. Scheduled Reports: Run Now and Toggle Active
    document.querySelectorAll('.zrep-run-schedule').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        showToast('Triggered immediate ad-hoc dispatch for schedule ' + id);
      });
    });

    document.querySelectorAll('.zrep-toggle-schedule').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        for (var i = 0; i < D.schedules.length; i++) {
          if (D.schedules[i].id === id) {
            D.schedules[i].active = !D.schedules[i].active;
            showToast((D.schedules[i].active ? 'Activated' : 'Paused') + ' schedule ' + id);
            break;
          }
        }
        switchTab('scheduled');
      });
    });

    // Schedule New Report Modal
    var btnNewSched = document.getElementById('zrep-new-schedule');
    if (btnNewSched) {
      btnNewSched.addEventListener('click', function () {
        openNewScheduleModal();
      });
    }

    // 16. Export Center Dataset Downloads
    document.querySelectorAll('.zrep-download-dataset').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        var name = this.getAttribute('data-name');
        var filename = name.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.csv';

        var rows = [];
        for (var i = 1; i <= 25; i++) {
          rows.push([
            id + '-ROW-' + (1000 + i),
            'ZENVE-ENT-' + (5000 + i * 3),
            new Date(Date.now() - i * 3600000).toISOString(),
            name.split(' ')[0],
            '₹' + (i * 12500).toLocaleString('en-IN'),
            'CLEARED_RECONCILED'
          ]);
        }
        downloadCSV(filename, rows);
      });
    });

    var btnDownloadAll = document.getElementById('zrep-download-all-zip');
    if (btnDownloadAll) {
      btnDownloadAll.addEventListener('click', function () {
        showToast('Initiating bulk package compilation of all 10 raw master datasets...');
        setTimeout(function () {
          downloadCSV('zenve-master-enterprise-datasets-all.csv', [
            ['ZENVE BI — ALL ENTERPRISE DATASETS COMPILATION', new Date().toISOString()],
            ['Dataset ID', 'Name', 'Total Records', 'File Payload', 'Refresh Cadence']
          ].concat(D.exportDatasets.map(function (e) {
            return [e.id, e.name, e.records, e.size, e.freq];
          })));
        }, 600);
      });
    }
  }

  /* ── 8. Schedule New Report Modal ────────────────────────────────── */
  function openNewScheduleModal() {
    var old = document.getElementById('zrep-modal-backdrop');
    if (old) old.remove();

    var backdrop = document.createElement('div');
    backdrop.id = 'zrep-modal-backdrop';
    backdrop.className = 'zrep-modal-backdrop';
    backdrop.innerHTML =
      '<div class="zrep-modal">' +
      '<div class="zrep-modal-header">' +
      '<h3 style="margin:0; font-family:var(--font-display,sans-serif); font-size:15px; font-weight:700;">' +
      '<span>⏰</span> Schedule Automated Report Dispatch' +
      '</h3>' +
      '<button type="button" class="zrep-btn-close" id="zrep-modal-close">✕</button>' +
      '</div>' +
      '<div class="zrep-modal-body">' +
      '<div class="zrep-field-group">' +
      '<label class="zrep-field-label">Report Intelligence Module</label>' +
      '<select class="zrep-select" id="zrep-mod-type" style="width:100%;">' +
      '<option value="Sales">Sales &amp; GMV Executive Summary</option>' +
      '<option value="Revenue">Business Units Revenue &amp; Margins</option>' +
      '<option value="Finance">Audited GAAP P&amp;L Reconciliation</option>' +
      '<option value="Inventory">Inventory Expiry &amp; Cold-Chain Alerts</option>' +
      '<option value="Operations">60-Minute Express SLA Telemetry</option>' +
      '</select>' +
      '</div>' +
      '<div class="zrep-field-group">' +
      '<label class="zrep-field-label">Cron Frequency Schedule</label>' +
      '<select class="zrep-select" id="zrep-mod-freq" style="width:100%;">' +
      '<option value="Daily at 08:00 IST">Daily Morning Flash (08:00 IST)</option>' +
      '<option value="Hourly Dispatch">Hourly Live SLA Telemetry</option>' +
      '<option value="Weekly Every Monday">Weekly Operational Review (Mondays)</option>' +
      '<option value="Monthly on 1st">Monthly Financial GAAP Audit (1st of Month)</option>' +
      '</select>' +
      '</div>' +
      '<div class="zrep-field-group">' +
      '<label class="zrep-field-label">Target Recipient Email Distribution</label>' +
      '<input type="text" class="zrep-search-input" id="zrep-mod-emails" placeholder="executives@zenve.vet, cfo@zenve.vet" value="executives@zenve.vet" style="padding-left:12px;"/>' +
      '</div>' +
      '<div class="zrep-field-group">' +
      '<label class="zrep-field-label">Output Attachment Format</label>' +
      '<select class="zrep-select" id="zrep-mod-fmt" style="width:100%;">' +
      '<option value="PDF + CSV">Audited Executive PDF + Raw CSV</option>' +
      '<option value="CSV Data Pack">Raw CSV Data Pack</option>' +
      '<option value="Executive PDF">Board-Ready Executive PDF</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '<div class="zrep-modal-footer">' +
      '<button type="button" class="zrep-btn zrep-btn-outline" id="zrep-modal-cancel">Cancel</button>' +
      '<button type="button" class="zrep-btn zrep-btn-primary" id="zrep-modal-save">Create Schedule</button>' +
      '</div>' +
      '</div>';

    document.body.appendChild(backdrop);

    var closeBtn = document.getElementById('zrep-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { backdrop.remove(); });
    var cancelBtn = document.getElementById('zrep-modal-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', function () { backdrop.remove(); });

    var saveBtn = document.getElementById('zrep-modal-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var modType = document.getElementById('zrep-mod-type').value;
        var freq = document.getElementById('zrep-mod-freq').value;
        var emails = document.getElementById('zrep-mod-emails').value || 'executives@zenve.vet';
        var fmt = document.getElementById('zrep-mod-fmt').value;

        D.schedules.unshift({
          id: 'SCH-0' + (D.schedules.length + 1),
          title: modType + ' Automated Dispatch',
          cron: freq.indexOf('Daily') >= 0 ? '0 08:00 * * *' : '0 09:00 * * 1',
          recipients: emails,
          format: fmt,
          active: true,
          lastRun: 'Pending First Run'
        });

        backdrop.remove();
        showToast('Created automated schedule for ' + modType);
        switchTab('scheduled');
      });
    }
  }

  /* ── 9. View Switcher & Visibility Controls ──────────────────────── */
  function switchTab(tabId) {
    if (!tabId) return;
    S.activeTab = tabId;

    var ribbon = document.getElementById('zrep-nav-ribbon');
    if (ribbon) {
      ribbon.querySelectorAll('.zrep-chip').forEach(function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-tab') === tabId);
      });
    }

    var workspace = document.getElementById('zrep-workspace');
    if (workspace) {
      workspace.innerHTML = renderActiveView();
      bindTabEvents();
    }

    // Update URL hash without breaking history
    try {
      var currentMod = MODULES.filter(function (m) { return m.id === tabId; })[0];
      if (currentMod && location.hash !== currentMod.hash) {
        history.pushState(null, '', currentMod.hash);
      }
    } catch (e) { }

    syncSidebar(true, tabId);
  }

  function loadLiveReports() {
    fetch('/api/v1/reports')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data) && data.length > 0) {
          var liveSets = data.map(function (rep) {
            return {
              id: rep.report_code || ('EXP-' + rep.id),
              name: rep.title,
              records: rep.category || 'Executive Analysis',
              size: rep.file_size || '1.2 MB',
              freq: rep.format + ' · Direct MySQL',
              tags: [rep.category, rep.format, 'Audited']
            };
          });
          D.exportDatasets = liveSets;
          if (root && S.open) {
            renderShell();
          }
        }
      })
      .catch(function (err) {
        console.error('Failed to load reports from MySQL:', err);
      });
  }

  function open(tab) {
    ensureRoot();
    loadLiveReports();
    S.open = true;
    if (tab) S.activeTab = tab;

    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) { }
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) { }
    }
    document.querySelectorAll('.zpanel-root, #zod-root, #zsd-root, #zset-root, #zph-root, #zch-root, #zalt-root').forEach(function (el) {
      if (el !== root) {
        el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zset-open', 'zph-open', 'zch-open', 'zalt-open');
      }
    });

    root.classList.add('zrep-open');
    try {
      document.documentElement.classList.add('zrep-locked');
      document.body.classList.add('zrep-locked');
    } catch (e) { }

    renderShell();

    try {
      var currentMod = MODULES.filter(function (m) { return m.id === S.activeTab; })[0];
      var targetHash = currentMod ? currentMod.hash : '#sales-reports';
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }

    syncSidebar(true, S.activeTab);
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zrep-open');
    try {
      document.documentElement.classList.remove('zrep-locked');
      document.body.classList.remove('zrep-locked');
    } catch (e) { }
    syncSidebar(false);
    try {
      if (location.hash.indexOf('report') >= 0 || location.hash.indexOf('export') >= 0) {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) { }
  }

  function syncSidebar(on, tab) {
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var text = (b.textContent || '').trim();
      var bTab = tabFromText(text);
      if (bTab) {
        b.classList.toggle('zrep-active', on && bTab === tab);
      }
    });
  }

  /* ── 10. Public API ──────────────────────────────────────────────── */
  window.ZenveReportsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    getState: function () { return S; },
    getData: function () { return D; },
    showToast: showToast
  };

  /* ── 11. Global Capture-Phase Click Interceptor ─────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group toggles or search bar
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var text = item.textContent.trim();
      var tab = tabFromText(text);

      if (tab) {
        // Only intercept if outside the dashboard canvas
        if (!t.closest('#zrep-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }
  }, true);

  /* ── 12. Hashchange & Escape Key Listeners ───────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash.indexOf('report') < 0 && location.hash.indexOf('export') < 0) {
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      var modal = document.getElementById('zrep-modal-backdrop');
      if (modal) modal.remove();
      else close();
    }
  });

  // Check URL on initial script load
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    setTimeout(function () { open(initialTab); }, 300);
  }
})();
