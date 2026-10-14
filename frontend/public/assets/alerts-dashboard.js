/* =====================================================================
   Zenve BI — Alerts & Notifications Executive Control Center
   Unified Multi-Domain Alert Intelligence Suite for All 11 Modules:
     1. Critical Alerts (Sev-1 Operational & Emergency Triggers)
     2. Revenue Alerts (GMV, Pacing, Returns & CAC Spikes)
     3. Inventory Alerts (Stockouts, Reorders, Expiry & Cold-Chain)
     4. Payment Alerts (UPI Failures, B2B Aging, Gateway Uptime)
     5. Order Alerts (Rx Verification Backlog, Packing SLAs, Cancellations)
     6. Delivery Alerts (60-Min Express SLAs, Rider Telemetry & Breakdown)
     7. Finance Alerts (EBITDA Margins, Unallocated Cash, GST Deadlines)
     8. HR Alerts (ICU Nurse Shortages, On-Call Vet Roster, Quotas)
     9. System Alerts (FastAPI Latency, SQLite Locks, Gemini AI Quota)
     10. Alert Rules (Interactive Rule Engine, Thresholds & Escalation)
     11. Notification Center (Omni-Channel Feed, Channels & Audit Logs)
   ===================================================================== */

(function () {
  'use strict';

  /* ── Modules Configuration ───────────────────────────────────────── */
  var MODULES = [
    { id: 'critical',   label: 'Critical Alerts',    icon: '🚨', hash: '#critical-alerts',    badge: '', critical: true },
    { id: 'revenue',    label: 'Revenue Alerts',     icon: '💼', hash: '#revenue-alerts',     badge: '' },
    { id: 'inventory',  label: 'Inventory Alerts',   icon: '📦', hash: '#inventory-alerts',   badge: '' },
    { id: 'payment',    label: 'Payment Alerts',     icon: '💳', hash: '#payment-alerts',     badge: '' },
    { id: 'order',      label: 'Order Alerts',       icon: '🚚', hash: '#order-alerts',       badge: '' },
    { id: 'delivery',   label: 'Delivery Alerts',    icon: '⚡', hash: '#delivery-alerts',    badge: '' },
    { id: 'finance',    label: 'Finance Alerts',     icon: '💰', hash: '#finance-alerts',     badge: '' },
    { id: 'hr',         label: 'HR Alerts',          icon: '🧑‍💼', hash: '#hr-alerts',          badge: '' },
    { id: 'system',     label: 'System Alerts',      icon: '🖥️', hash: '#system-alerts',      badge: '' },
    { id: 'rules',      label: 'Alert Rules',        icon: '⚙️', hash: '#alert-rules',        badge: '' },
    { id: 'notifs',     label: 'Notification Center',icon: '🔔', hash: '#notification-center', badge: '' }
  ];

    /* ── In-Memory Alert Intelligence State ──────────────────────────── */
  var S = {
    open: false,
    activeTab: 'critical',
    severityFilter: 'all',
    hubFilter: 'all',
    chimesEnabled: true,
    searchQuery: '',

    // 1. Critical Alerts (10 Items)
    critical: [
      { id: 'CRIT-101', title: 'Main Biologics Vaccine Chiller Temperature Excursion', hub: 'Indiranagar Surgical Hospital', lead: 'Dr. Vivek Menon', status: 'Active', severity: 'Critical', metric: 'Chiller Temp: 9.8°C (Limit: 2°C - 8°C)', slaCountdown: '4 Mins to Escalation', time: '6 mins ago', impact: '₹4.2L biological vaccines & insulin at risk', action: 'Auxiliary refrigeration engaged; transport box staged' },
      { id: 'CRIT-102', title: 'Primary HDFC UPI Payment Gateway Down', hub: 'National Digital Commerce', lead: 'Pooja Deshmukh', status: 'Active', severity: 'Critical', metric: 'Failure Rate: 84.2% on UPI collect calls', slaCountdown: '6 Mins to Escalation', time: '9 mins ago', impact: '₹6.8L/hr checkout volume stalling across app', action: 'Auto-failover to Razorpay Secondary Pipeline executed' },
      { id: 'CRIT-103', title: 'Bravecto 20-40kg Emergency Stockout at Koramangala', hub: 'Koramangala Express Hub', lead: 'Ramesh Patel', status: 'Active', severity: 'Critical', metric: 'Available Stock: 0 Units (Min Threshold: 40)', slaCountdown: '8 Mins to Escalation', time: '12 mins ago', impact: '42 patient prescription orders queued', action: 'Express transfer PO-8821 dispatched from Central Depot' },
      { id: 'CRIT-104', title: 'ICU Oxygen Manifold Pressure Drop Alert', hub: 'Bandra West Medical Center', lead: 'Dr. Sunita Rao', status: 'Active', severity: 'Critical', metric: 'Line Pressure: 38 PSI (Norm: 55 PSI)', slaCountdown: '3 Mins to Escalation', time: '5 mins ago', impact: '6 feline ventilator patients in critical care', action: 'Switched to backup liquid oxygen cylinder bank B' },
      { id: 'CRIT-105', title: 'Whitefield Express Fleet Weather Grounding Hazard', hub: 'Whitefield Micro-Hub', lead: 'Aditya Varma', status: 'Active', severity: 'Critical', metric: 'Waterlogging depth 45cm; 18 orders blocked', slaCountdown: '10 Mins to Escalation', time: '14 mins ago', impact: '18 60-min express medicine deliveries at risk', action: 'Rerouted dispatches to all-weather 4x4 mobile emergency van' },
      { id: 'CRIT-106', title: 'Controlled Drug Safe Electronic Lock Tamper Alert', hub: 'South Ext Trauma Center', lead: 'Col. K. Sharma', status: 'Active', severity: 'Critical', metric: 'Unauthorized keycard attempt x4 on Narcotic Locker', slaCountdown: '2 Mins to Escalation', time: '3 mins ago', impact: 'Schedule X pharmacy regulatory compliance', action: 'Vault auto-locked; CCTV feed pushed to Hospital Director' },
      { id: 'CRIT-107', title: 'Trauma Surgical Table Overbooking Conflict', hub: 'Gurgaon Sec-29 Hospital', lead: 'Dr. Ramesh Kumar', status: 'Active', severity: 'Critical', metric: 'Dual Emergency C-Section + Ortho Fracture at 15:00', slaCountdown: '7 Mins to Escalation', time: '11 mins ago', impact: 'Potential delay in life-saving surgical intervention', action: 'Opened auxiliary Operating Theatre 3; pre-op team mobilized' },
      { id: 'CRIT-108', title: 'High-Titer Feline Parvovirus Inpatient Isolation Alert', hub: 'HSR Layout Polyclinic', lead: 'Dr. Anjali Nair', status: 'Active', severity: 'Critical', metric: 'Positive Parvo ELISA confirmation in shared ward', slaCountdown: '5 Mins to Escalation', time: '8 mins ago', impact: 'Cross-infection hazard for 8 vulnerable feline inpatients', action: 'Quarantine barrier sealed; negative-pressure airflow active' },
      { id: 'CRIT-109', title: 'MySQL Analytical Cluster Database Lock Contention', hub: 'Cloud Infrastructure (AWS Mumbai)', lead: 'Vikas Dubey', status: 'Resolved', severity: 'Critical', metric: 'Write Lock Wait Time: 4,820ms (>500ms limit)', slaCountdown: 'Resolved', time: '24 mins ago', impact: 'POS billing latency spiking across front desks', action: 'Purged deadlocks and resized thread pool from 64 to 256' },
      { id: 'CRIT-110', title: 'Cold-Chain Transport Van #4 GPS & Telemetry Loss', hub: 'Chennai Fleet Transit (Velachery - Anna Nagar)', lead: 'S. Murugan', status: 'Active', severity: 'Critical', metric: 'Zero ping response for 14 minutes in rain corridor', slaCountdown: '9 Mins to Escalation', time: '13 mins ago', impact: '₹2.1L veterinary oncology biologics in transit', action: 'Cellular beacon pinged; secondary driver reached via radio' }
    ],

    // 2. Revenue Alerts (10 Items)
    revenue: [
      { id: 'REV-201', title: 'Uncontrolled Promotional Coupon Stacking on Premium Grooming', channel: 'Mobile App / Checkout', severity: 'High Warning', status: 'Active', trigger: '50% discount stacked on top of subscriber pricing', cause: 'Checkout API failed single-coupon validator rule', impact: '₹2.9L revenue leak', time: '15 mins ago' },
      { id: 'REV-202', title: 'Uncollected Surgical Consumable Billings across BLR Surgical Hubs', channel: 'Hospital Inpatient Billing', severity: 'High Warning', status: 'Active', trigger: 'Discharge bills omitting specialized titanium ortho pins', cause: 'Manual checkbox missed on front-desk discharge POS', impact: '₹3.85L monthly leakage', time: '28 mins ago' },
      { id: 'REV-203', title: 'Delhi NCR Regional Gross Margin Compression', channel: 'Delhi Logistics / Dark Store', severity: 'Warning', status: 'Active', trigger: 'Gross margin dropped to 38.2% (Benchmark: 46%)', cause: 'Couriers absorbing surge rain delivery fees', impact: '₹1.85L delivery deficit', time: '45 mins ago' },
      { id: 'REV-204', title: 'After-Hours Emergency Triage Underbilling', channel: '24x7 Emergency OPD', severity: 'High Warning', status: 'Active', trigger: 'Night consultations logged under standard daytime tariff', cause: 'Doctors defaulting to ₹650 standard fee instead of ₹1,200', impact: '₹2.45L margin gap', time: '1 hr ago' },
      { id: 'REV-205', title: 'Therapeutic Renal Food Subscription Pause Spike', channel: 'Auto-Ship Subscriptions', severity: 'Warning', status: 'Active', trigger: '42 subscribers paused Hill\'s k/d deliveries this week', cause: 'Customer feedback citing bag size availability issues', impact: '₹1.65L MRR at risk', time: '2 hrs ago' },
      { id: 'REV-206', title: 'Diagnostic Blood Chemistry Reagent Cost Escalation', channel: 'In-Clinic Laboratory', severity: 'Warning', status: 'Active', trigger: 'Reagent cost per panel rose from ₹380 to ₹490', cause: 'Unclaimed manufacturer volume discount rebate', impact: '₹1.40L cost variance', time: '3 hrs ago' },
      { id: 'REV-207', title: 'Corporate Pet Wellness B2B Account Payment Delay', channel: 'B2B Enterprise Portal', severity: 'Warning', status: 'Active', trigger: 'Infosys Pet Wellness account overdue by 45 days', cause: 'Billing address discrepancy in enterprise purchase order', impact: '₹4.5L receivable aging', time: '4 hrs ago' },
      { id: 'REV-208', title: 'Grooming Appointment High No-Show Rate on Weekends', channel: 'Pet Spa & Grooming', severity: 'Warning', status: 'Active', trigger: '24% no-show rate recorded across Bandra and Indiranagar', cause: 'Lack of mandatory 20% advance booking deposit', impact: '₹1.25L idle table loss', time: '5 hrs ago' },
      { id: 'REV-209', title: 'Vaccination Booster Drop-off Revenue Attrition', channel: 'Preventive Healthcare', severity: 'High Warning', status: 'Active', trigger: '28% puppy parents missed 21-day booster sequence', cause: 'Manual calling nurse roster overwhelmed', impact: '₹2.10L follow-up revenue', time: '6 hrs ago' },
      { id: 'REV-210', title: 'Pet Pharmacy Return Rate Spike on Prescription Diets', channel: 'Express Pharmacy Delivery', severity: 'Warning', status: 'Resolved', trigger: 'Kibble bag packaging puncture claims increased by 3.2%', cause: 'Transit packaging tearing during monsoon bike delivery', impact: '₹85K credit note drain', time: '7 hrs ago' }
    ],

    // 3. Inventory Alerts (10 Items)
    inventory: [
      { sku: 'SKU-MED-0101', title: 'Bravecto Chewable Dog 20-40kg', hub: 'Koramangala Express Hub', severity: 'Critical', status: 'Active', stock: '14 Units', burn: '4.8 / Day', action: 'Emergency PO Dispatched' },
      { sku: 'SKU-VAC-0504', title: 'Nobivac Tricat Trio Feline Vaccine', hub: 'Indiranagar Surgical Hospital', severity: 'High Warning', status: 'Active', stock: '22 Vials', burn: '4.2 / Day', action: 'Inter-Hub Transfer En Route' },
      { sku: 'SKU-NUT-0205', title: 'Royal Canin Gastrointestinal Dog 14kg', hub: 'Whitefield Dark Store', severity: 'Critical', status: 'Active', stock: '8 Bags', burn: '2.0 / Day', action: 'Supplier Bulk PO Placed' },
      { sku: 'SKU-CRD-0302', title: 'Vetmedin 5mg Chewable Tablets', hub: 'Bandra West Medical Center', severity: 'High Warning', status: 'Active', stock: '11 Packs', burn: '1.8 / Day', action: 'Safety Buffer Reorder Active' },
      { sku: 'SKU-DERM-0410', title: 'Apoquel 16mg Anti-Itch Tablets', hub: 'Powai Express Hub', severity: 'High Warning', status: 'Active', stock: '16 Packs', burn: '3.2 / Day', action: 'Rebalance from Bandra Hub' },
      { sku: 'SKU-EMG-0714', title: 'Cerenia 10mg/ml Injectable Anti-Emetic', hub: 'South Ext Trauma Center', severity: 'Critical', status: 'Active', stock: '6 Vials', burn: '2.5 / Day', action: 'Same-Day Courier En Route' },
      { sku: 'SKU-ORT-0608', title: 'Rimadyl 75mg Chewable NSAID', hub: 'Gurgaon Sec-29 Hospital', severity: 'Warning', status: 'Active', stock: '18 Bottles', burn: '2.4 / Day', action: 'Supplier Requisition Queued' },
      { sku: 'SKU-NUT-0212', title: 'Hill\'s Prescription Diet c/d Feline 3.8kg', hub: 'HSR Layout Polyclinic', severity: 'High Warning', status: 'Active', stock: '9 Bags', burn: '1.7 / Day', action: 'Dark Store Stock Transferred' },
      { sku: 'SKU-MED-0115', title: 'Simparica Trio 10-20kg Chewable', hub: 'Anna Nagar Facility', severity: 'Warning', status: 'Active', stock: '15 Packs', burn: '2.4 / Day', action: 'Automated PO Requisition Active' },
      { sku: 'SKU-DIA-0801', title: 'Caninsulin 40 IU/ml 10ml Diabetic Vials', hub: 'Velachery Care Hub', severity: 'Critical', status: 'Active', stock: '8 Vials', burn: '1.9 / Day', action: 'Cold-Chain Transfer Inbound' }
    ],

    // 4. Payment Alerts (10 Items)
    payment: [
      { id: 'PAY-301', title: 'HDFC Bank NetBanking Webhook Delay', gateway: 'HDFC Aggregator', severity: 'Critical', status: 'Active', impact: '42 orders placed in PENDING state', cause: 'Bank webhook response latency exceeded 8,000ms', time: '12 mins ago' },
      { id: 'PAY-302', title: 'UPI Intent Verification Timeout Spike', gateway: 'Razorpay UPI', severity: 'Warning', status: 'Active', impact: '₹1.85L checkout drop-off rate', cause: 'Customer app drop-off on Google Pay collect calls', time: '24 mins ago' },
      { id: 'PAY-303', title: 'Credit Card International 3DS Verification Drop', gateway: 'Stripe Global', severity: 'Warning', status: 'Active', impact: '₹1.20L premium international orders', cause: 'Expat pet parents credit card 3DS 2.0 failing', time: '40 mins ago' },
      { id: 'PAY-304', title: 'Veterinary Diagnostic Commission Escrow Mismatch', gateway: 'Internal Ledger', severity: 'High Warning', status: 'Active', impact: '₹1.15L specialist vet payouts pending', cause: 'Automated split payment script omitted Sunday radiology shifts', time: '1 hr ago' },
      { id: 'PAY-305', title: 'Instant Refund Escrow Threshold Below Minimum', gateway: 'ICICI Virtual Account', severity: 'High Warning', status: 'Active', impact: 'Next instant refund batch will queue', cause: 'Auto-refund pool reached ₹45K (Floor limit: ₹2,00,000)', time: '2 hrs ago' },
      { id: 'PAY-306', title: 'B2B Corporate Credit Limit Breach (Zoetis India)', gateway: 'ERP Credit Ledger', severity: 'Warning', status: 'Active', impact: 'PO-9914 held in credit verification', cause: 'Wholesale inventory PO exceeded ₹15L credit limit', time: '3 hrs ago' },
      { id: 'PAY-307', title: 'Point-of-Sale Terminal Wi-Fi Drop at Bandra Reception', gateway: 'PineLabs POS 3', severity: 'Warning', status: 'Active', impact: 'Front-desk reception queue increased', cause: 'Card swipe reader disconnected during evening billing rush', time: '4 hrs ago' },
      { id: 'PAY-308', title: 'Recurring Auto-Debit Mandate Failure Spike', gateway: 'eNACH / NPCI', severity: 'Warning', status: 'Active', impact: '₹84K subscription revenue pending', cause: 'Monthly pet care membership debit failed for 28 accounts', time: '5 hrs ago' },
      { id: 'PAY-309', title: 'Duplicate Settlement Discrepancy on Axis Bank Gateway', gateway: 'Axis Merchant Pipeline', severity: 'Warning', status: 'Resolved', impact: '₹14,500 reconciliation variance', cause: 'Reconciliation batch recorded 3 duplicate transaction IDs', time: '6 hrs ago' },
      { id: 'PAY-310', title: 'Amex High-Ticket Surgical Pre-Authorization Lag', gateway: 'American Express', severity: 'Warning', status: 'Active', impact: 'Client discharge desk delay', cause: '₹45,000 canine orthopedic pre-authorization took 14 mins', time: '7 hrs ago' }
    ],

    // 5. Order Alerts (10 Items)
    order: [
      { id: 'ORD-401', title: 'Emergency Rx Veterinary Tele-Sign Off Bottleneck', category: 'Pharmacy Prescription', hub: 'Central Tele-Vet Hub', severity: 'Critical', status: 'Active', metric: 'Queue: 18 Orders > 15 Mins', impact: '60-min express medicine dispatches blocked', time: '8 mins ago' },
      { id: 'ORD-402', title: 'Cold-Chain Gel-Pack Packing Station Shortage', category: 'Express Fulfillment', hub: 'Whitefield Dark Store', severity: 'High Warning', status: 'Active', metric: 'Gel Packs: 12 (Min: 50)', impact: 'Biologic vaccine dispatches temporarily halted', time: '16 mins ago' },
      { id: 'ORD-403', title: 'VIP Loyalty Member Surgery Order Address Mismatch', category: 'VIP Concierge', hub: 'Bandra West Hub', severity: 'High Warning', status: 'Active', metric: 'Address: Outside 60m Zone', impact: 'Emergency post-op wound care kit delayed', time: '25 mins ago' },
      { id: 'ORD-404', title: 'Fragile Glass Ampoule Re-packing Flag', category: 'Pharmacy Packaging', hub: 'Indiranagar Surgery Depot', severity: 'Warning', status: 'Active', metric: 'Outer Seal: Damaged Box', impact: '10 vials feline injectable antibiotic held', time: '38 mins ago' },
      { id: 'ORD-405', title: 'Automated Prescription OCR Digitization Mismatch', category: 'Prescription AI', hub: 'Mobile App Upload Pipeline', severity: 'Warning', status: 'Active', metric: 'OCR Confidence: 74% (<85%)', impact: 'Requires manual pharmacist sign-off', time: '52 mins ago' },
      { id: 'ORD-406', title: 'Weight Discrepancy on 14kg Canine Diet Dispatch', category: 'Heavy Item Packaging', hub: 'Central Warehouse', severity: 'Warning', status: 'Active', metric: 'Measured: 11.2kg (Exp: 14.0kg)', impact: 'Wrong SKU picked by packing robot pod', time: '1 hr ago' },
      { id: 'ORD-407', title: 'Cancelled Order Post-Dispatch Rider Recall', category: 'Last-Mile Logistics', hub: 'Koramangala Express Hub', severity: 'Warning', status: 'Active', metric: 'Recall Sent: 3 mins after pickup', impact: 'Rider return-to-depot sequence initiated', time: '2 hrs ago' },
      { id: 'ORD-408', title: 'High-Value Controlled Substance Dual Verification Delay', category: 'Schedule X Medicine', hub: 'South Ext Trauma Center', severity: 'High Warning', status: 'Active', metric: 'Credential: 1 of 2 Stamps', impact: 'Emergency fentanyl patch dispatch on hold', time: '2 hrs ago' },
      { id: 'ORD-409', title: 'Bulk Veterinary Hospital Requisition Backorder', category: 'B2B Hospital Supplies', hub: 'Gurgaon Sec-29 Hospital', severity: 'Warning', status: 'Active', metric: 'Catheters: 120 / 200 Units', impact: 'Remaining 80 units scheduled for tomorrow', time: '3 hrs ago' },
      { id: 'ORD-410', title: 'Scheduled Dawn Express Batch Delivery Overflow', category: 'Dawn Dispatch', hub: 'Powai Express Hub', severity: 'Warning', status: 'Resolved', metric: 'Queued: 85 Orders / 70 Capacity', impact: 'Exceeds hub morning rider capacity by 14 orders', time: '4 hrs ago' }
    ],

    // 6. Delivery Alerts (10 Items)
    delivery: [
      { id: 'DEL-501', title: 'Severe Waterlogging Transit Delay on Outer Ring Road', rider: 'Ramesh K. (EV-44)', zone: 'Whitefield - Marathahalli Zone', severity: 'Critical', status: 'Active', elapsed: '54 Mins Elapsed (SLA: 60m)', cause: 'Traffic gridlock due to heavy monsoon rain', time: '5 mins ago' },
      { id: 'DEL-502', title: 'Cold-Chain Phase-Change Bag Temperature Warning', rider: 'Suresh M. (EV-18)', zone: 'Indiranagar - Koramangala Corridor', severity: 'Critical', status: 'Active', elapsed: 'Bag Temp: 7.8°C (Limit: 8.0°C)', cause: 'Direct sunlight exposure during traffic halt', time: '8 mins ago' },
      { id: 'DEL-503', title: 'EV Bike Battery Low Critical Warning (<12%)', rider: 'Vikram T. (EV-09)', zone: 'Bandra West - Khar Danda Zone', severity: 'High Warning', status: 'Active', elapsed: 'Battery: 11% (4.8 km to dest)', cause: 'Rider forgot swap station stop prior to dispatch', time: '14 mins ago' },
      { id: 'DEL-504', title: 'Pet Parent Unreachable at Gate Security Callbox', rider: 'Deepak N. (EV-32)', zone: 'HSR Layout Sector 2', severity: 'Warning', status: 'Active', elapsed: 'Dwell Time: 12 Minutes', cause: 'Apartment gate intercom out of service', time: '20 mins ago' },
      { id: 'DEL-505', title: 'Ambulance Priority Dispatch Reroute on Flyover', rider: 'Mobile ICU Unit 2', zone: 'South Extension - AIIMS Corridor', severity: 'Critical', status: 'Active', elapsed: 'Delay: 18 Mins to Patient', cause: 'Emergency trauma patient with respiratory distress', time: '26 mins ago' },
      { id: 'DEL-506', title: 'Express Medicine Packet Damage on Scooter Footboard', rider: 'Naveen R. (EV-55)', zone: 'Powai - Chandivali Zone', severity: 'High Warning', status: 'Active', elapsed: 'Reported: Outer Box Torn', cause: 'Medicine internal blister seals intact; checked', time: '35 mins ago' },
      { id: 'DEL-507', title: 'Delivery Address Geofence Mismatch of 1.4 km', rider: 'Pradeep G. (EV-61)', zone: 'Gurgaon Cyber City Zone', severity: 'Warning', status: 'Active', elapsed: 'Drift: 1.4 km from Pin', cause: 'Customer updated pin via chat support link', time: '48 mins ago' },
      { id: 'DEL-508', title: 'High-Traffic Congestion Spike on Western Express Highway', rider: 'BOM-North Fleet (6 Riders)', zone: 'Andheri East - Goregaon Corridor', severity: 'High Warning', status: 'Active', elapsed: 'Avg Speed: 11 km/h', cause: 'Flyover lane closure by municipal authorities', time: '1 hr ago' },
      { id: 'DEL-509', title: 'Customer Refused Delivery: Incorrect Prescription Diet', rider: 'Anand P. (EV-72)', zone: 'Anna Nagar West, Chennai', severity: 'Warning', status: 'Resolved', elapsed: 'Returned to Hub: 18 mins', cause: 'Rider returning to dark store for replacement', time: '2 hrs ago' },
      { id: 'DEL-510', title: 'Midnight Emergency Medicine Dispatch Slot Staffing', rider: 'Night Dispatch Pool', zone: 'Delhi NCR All Hubs', severity: 'Warning', status: 'Active', elapsed: 'Roster: 3 Riders Absent', cause: 'Float standby riders activated with 25% surge pay', time: '3 hrs ago' }
    ],

    // 7. Finance Alerts (10 Items)
    finance: [
      { id: 'FIN-601', title: 'Unreconciled Bank Feed Inflow from Corporate Insurance Payers', category: 'Bank Reconciliation', severity: 'High Warning', status: 'Active', metric: '₹8.4L Unallocated credit on HDFC A/c', impact: 'Bajaj Allianz & Digit pet insurance claims unmapped', time: '18 mins ago' },
      { id: 'FIN-602', title: 'Vendor Direct Sourcing Invoice Due in < 24 Hours', category: 'Accounts Payable', severity: 'High Warning', status: 'Active', metric: '₹14.2L Due to MSD Animal Health', impact: 'Payment required to retain 2.5% prompt payment discount', time: '32 mins ago' },
      { id: 'FIN-603', title: 'TDS Deduction Rate Discrepancy on Vet Consultant Payouts', category: 'Taxation & Statutory', severity: 'Warning', status: 'Active', metric: 'Section 194J deducted at 2% vs 10%', impact: '₹34,000 withholding adjustment needed before filing', time: '1 hr ago' },
      { id: 'FIN-604', title: 'Hospital Consumable COGS Variance Spike in Mumbai Hub', category: 'Cost Accounting', severity: 'Warning', status: 'Active', metric: 'Surgical COGS: 51.4% (Budget: 45%)', impact: 'Uncontrolled wastage of imported suture cartridges', time: '2 hrs ago' },
      { id: 'FIN-605', title: 'GSTR-2B Input Tax Credit (ITC) Mismatch Alert', category: 'Indirect Tax (GST)', severity: 'Warning', status: 'Active', metric: '₹1.15L supplier invoice missing', impact: 'Requires supplier follow-up to ensure compliance', time: '3 hrs ago' },
      { id: 'FIN-606', title: 'Dark Store Utility & Refrigeration Power Tariff Outlier', category: 'Facility OpEx', severity: 'Warning', status: 'Active', metric: 'Power Bill: +28% at Indiranagar', impact: 'Secondary chiller cooling compressor running continuously', time: '4 hrs ago' },
      { id: 'FIN-607', title: 'Corporate Credit Card Limit Reached on AWS Cloud Account', category: 'Treasury & Cards', severity: 'High Warning', status: 'Active', metric: 'Card Utilized: 94.2% of ₹10L', impact: 'Cloud infrastructure auto-billing may fail in 48h', time: '5 hrs ago' },
      { id: 'FIN-608', title: 'Pet Boarding Deposit Cancellation Refund Dispute', category: 'Client Billing Disputes', severity: 'Warning', status: 'Active', metric: 'Dispute: ₹12,500 on suite booking', impact: 'Boarding policy requires 25% non-refundable deposit', time: '6 hrs ago' },
      { id: 'FIN-609', title: 'Inventory Write-Off Provision Estimate for Near-Expiry Stock', category: 'Inventory Accounting', severity: 'Warning', status: 'Resolved', metric: 'Provision: ₹1.85L for Q3 close', impact: 'Liquidation campaigns reduced write-off from ₹5.2L', time: '7 hrs ago' },
      { id: 'FIN-610', title: 'Pet Insurance Direct-Settlement Claim Clearance Lag', category: 'Insurance Receivables', severity: 'Warning', status: 'Active', metric: '₹3.6L pending with New India Assurance', impact: 'Average settlement cycle increased from 14d to 24d', time: '8 hrs ago' }
    ],

    // 8. HR Alerts (10 Items)
    hr: [
      { id: 'HR-701', title: 'Night-Shift Trauma Surgeon Gap for Weekend Roster', department: 'Emergency Surgery', facility: 'Bandra West Medical Center', severity: 'Critical', status: 'Active', metric: '0 Surgeon on Saturday 22:00', impact: 'ICU emergency surgical admissions cannot proceed without surgeon', time: '15 mins ago' },
      { id: 'HR-702', title: 'Karnataka State Veterinary Council License Expiry (<15d)', department: 'Doctor Credentialing', facility: 'Indiranagar Flagship', severity: 'High Warning', status: 'Active', metric: 'Dr. Sunita Rao license: 12 days left', impact: 'Must submit renewal docket to maintain EMR prescription signing rights', time: '30 mins ago' },
      { id: 'HR-703', title: 'Pharmacy Dispensing Pharmacist Overtime Threshold Breached', department: 'Hospital Pharmacy', facility: 'Koramangala Hub', severity: 'Warning', status: 'Active', metric: 'Hours Logged: 58h (Limit: 48h)', impact: 'Risk of fatigue-induced prescription dispensing errors', time: '1 hr ago' },
      { id: 'HR-704', title: 'Veterinary Anesthetist Leave Request Conflict', department: 'Surgical Operations', facility: 'South Ext Trauma Center', severity: 'High Warning', status: 'Active', metric: 'Both anesthetists on leave Oct 24', impact: '4 scheduled orthopedic surgeries will require rescheduling', time: '2 hrs ago' },
      { id: 'HR-705', title: 'Express Delivery Fleet Rider Absenteeism Cluster', department: 'Logistics & Fleet', facility: 'Whitefield Micro-Hub', severity: 'High Warning', status: 'Active', metric: '6 riders absent without prior notice', impact: 'Express 60-min delivery capacity reduced by 22%', time: '2 hrs ago' },
      { id: 'HR-706', title: 'Radiation Safety Training Certification Due for Renewal', department: 'Radiology & Imaging', facility: 'Gurgaon Sec-29 Hospital', severity: 'Warning', status: 'Active', metric: '3 Technicians expiring AERB cert', impact: 'AERB compliance audit scheduled next month', time: '3 hrs ago' },
      { id: 'HR-707', title: 'Veterinary Nurse Roster Ratio Lag in Feline Ward', department: 'Inpatient Nursing', facility: 'Powai Care Center', severity: 'Warning', status: 'Active', metric: 'Patient-to-Nurse: 7:1 (Norm: 4:1)', impact: 'ICU inpatient medication round turnaround times lagging', time: '4 hrs ago' },
      { id: 'HR-708', title: 'Grooming Specialist Capacity Deficit for Pre-Diwali Week', department: 'Pet Grooming & Spa', facility: 'HSR Layout Polyclinic', severity: 'Warning', status: 'Active', metric: '140 slots booked; 2 groomers', impact: 'Average wait time per appointment projected at 45 mins', time: '5 hrs ago' },
      { id: 'HR-709', title: 'Staff Bio-Waste Handling Safety Protocol Refresher Overdue', department: 'Hospital Sanitation', facility: 'Anna Nagar Facility', severity: 'Warning', status: 'Resolved', metric: 'Refresher overdue for 8 staff', impact: 'Pollution Control Board audit compliance requirement', time: '6 hrs ago' },
      { id: 'HR-710', title: 'Doctor Tele-Consultation Availability Deficit in Evening Peak', department: 'Telemedicine', facility: 'Central Virtual Clinic', severity: 'High Warning', status: 'Active', metric: 'App Tele-Triage Wait: 16 Mins', impact: 'Evening 7-9 PM pet parent consultation demand surging', time: '7 hrs ago' }
    ],

    // 9. System Alerts (10 Items)
    system: [
      { id: 'SYS-801', title: 'API Gateway Ingress Spike on Prescription Upload Route', service: 'Kong API Gateway', severity: 'High Warning', status: 'Active', metric: 'Throughput: 1,480 req/s (P99: 285ms)', impact: 'Slight lag on mobile app prescription image upload', time: '10 mins ago' },
      { id: 'SYS-802', title: 'Kafka Telemetry Event Pipeline Consumer Lag in Analytics', service: 'Apache Kafka 3.4', severity: 'High Warning', status: 'Active', metric: 'Lag: 14,200 msgs on iot-telemetry', impact: 'Real-time anomaly detection stream delayed by 18 seconds', time: '22 mins ago' },
      { id: 'SYS-803', title: 'Redis Cache Memory Utilization Exceeding 85%', service: 'Redis Master Node', severity: 'Warning', status: 'Active', metric: 'RAM: 6.8 GB / 8.0 GB (85.0%)', impact: 'Eviction policy LRU kicking in; risk of cache churn', time: '35 mins ago' },
      { id: 'SYS-804', title: 'PostgreSQL Replica Read-Lag on Reporting Cluster', service: 'Amazon RDS Aurora', severity: 'Warning', status: 'Active', metric: 'Replication: 420ms (Limit: 300ms)', impact: 'Secondary reporting dashboards showing 1-min delay', time: '50 mins ago' },
      { id: 'SYS-805', title: 'Elasticsearch Cluster JVM Garbage Collection Pause', service: 'Elasticsearch 8.6', severity: 'Warning', status: 'Active', metric: 'Old Gen GC Pause: 1,240ms', impact: 'Product catalog search autocomplete momentarily sluggish', time: '1 hr ago' },
      { id: 'SYS-806', title: 'SMS Notification Delivery Gateway Fallback Triggered', service: 'Karix / Gupshup SMS', severity: 'Warning', status: 'Active', metric: 'Failure Rate: 4.8% on primary', impact: 'Auto-rerouted SMS OTP dispatches to secondary Twilio gateway', time: '2 hrs ago' },
      { id: 'SYS-807', title: 'Mobile App WebSocket Connection Churn on iOS 18', service: 'WebSocket Cluster', severity: 'Warning', status: 'Active', metric: 'Reconnect: 340 reconnects/min', impact: 'Keep-alive ping packet adjusted to prevent sleep drop', time: '3 hrs ago' },
      { id: 'SYS-808', title: 'S3 Presigned URL Generation Latency Outlier', service: 'AWS S3 Storage', severity: 'Warning', status: 'Active', metric: 'Latency: 640ms for ultrasound video', impact: 'Doctor viewer streaming initial buffering delayed', time: '4 hrs ago' },
      { id: 'SYS-809', title: 'Cron Job Sync Latency on ERP Inventory Reconciliation', service: 'Celery Worker Node', severity: 'Warning', status: 'Resolved', metric: 'Catalog sync: 24m (Exp: 12m)', impact: 'High volume of festive catalog revisions processed', time: '5 hrs ago' },
      { id: 'SYS-810', title: 'SSL Certificate Expiry Monitor: *.zenvepet.com (<30d)', service: 'Cloudflare Edge SSL', severity: 'Warning', status: 'Active', metric: 'Wildcard cert: 24 days remaining', impact: 'Automated Let\'s Encrypt renewal sequence verified', time: '6 hrs ago' }
    ],

    // 10. Alert Rules (10 Items)
    rules: [
      { id: 'RUL-001', name: 'Vaccine Chiller Temperature Outlier Breach', category: 'Inventory', condition: 'Temp > 8.0°C or Temp < 2.0°C for > 5 consecutive minutes', severity: 'Critical (Sev-1)', enabled: true, escalation: '5 mins' },
      { id: 'RUL-002', name: 'Emergency ICU Oxygen Manifold Pressure Drop', category: 'Clinical ICU', condition: 'Line Pressure < 45 PSI across any surgical facility', severity: 'Critical (Sev-1)', enabled: true, escalation: '3 mins' },
      { id: 'RUL-003', name: 'Payment Gateway Failure Rate Spike', category: 'Payment', condition: 'Transaction error rate > 5.0% over a 3-minute sliding window', severity: 'Critical (Sev-1)', enabled: true, escalation: '5 mins' },
      { id: 'RUL-004', name: 'Express 60-Minute Delivery SLA Hazard', category: 'Delivery', condition: 'Active transit elapsed > 50 minutes with distance > 2 km', severity: 'Warning (Sev-2)', enabled: true, escalation: '10 mins' },
      { id: 'RUL-005', name: 'Controlled Drug Vault Unauthorized Access Attempt', category: 'Compliance', condition: 'Unrecognized RFID badge swipe or > 3 PIN failures', severity: 'Critical (Sev-1)', enabled: true, escalation: '2 mins' },
      { id: 'RUL-006', name: 'Critical Pharmaceutical SKU Stockout Buffer Breach', category: 'Inventory', condition: 'Available on-hand units < 3 days of trailing consumption', severity: 'Warning (Sev-2)', enabled: true, escalation: '15 mins' },
      { id: 'RUL-007', name: 'Night Trauma Surgeon Absence on Emergency Roster', category: 'HR & Staffing', condition: 'Zero confirmed surgeon on duty within 4 hours of shift start', severity: 'Critical (Sev-1)', enabled: true, escalation: '15 mins' },
      { id: 'RUL-008', name: 'Promotional Coupon Checkout Margin Floor Breach', category: 'Revenue', condition: 'Blended checkout gross margin < 25% or stacked promo codes', severity: 'Warning (Sev-2)', enabled: true, escalation: '15 mins' },
      { id: 'RUL-009', name: 'API Gateway P99 Latency Threshold Degradation', category: 'System DevOps', condition: 'P99 latency > 500ms for 3 consecutive minutes', severity: 'Warning (Sev-2)', enabled: true, escalation: '10 mins' },
      { id: 'RUL-010', name: 'Pending Prescription Doctor Verification Backlog', category: 'Orders', condition: 'More than 15 pharmacy orders awaiting vet verification > 10m', severity: 'Warning (Sev-2)', enabled: true, escalation: '15 mins' }
    ],

    // 11. Notification Center (10 Items)
    notifs: [
      { id: 'NOT-901', title: 'Sev-1 Incident Escalated: Chiller 2 Temperature Alert', body: 'Indiranagar Chiller B temperature reached 9.8°C. Auxiliary cooling compressor engaged.', recipient: 'Dr. Vivek Menon & Ops Command', severity: 'Critical', read: false, time: '4 mins ago' },
      { id: 'NOT-902', title: 'Emergency PO-8821 Dispatched to MSD Animal Health', body: 'Emergency purchase order for 400 units Bravecto confirmed by supplier with 24h courier.', recipient: 'Pharmacy Procurement Team', severity: 'Info', read: false, time: '10 mins ago' },
      { id: 'NOT-903', title: 'UPI Payment Gateway Auto-Failover Executed', body: 'Switched primary payment traffic from HDFC to Razorpay due to 84% failure rate.', recipient: 'FinTech Operations Lead', severity: 'Warning', read: false, time: '14 mins ago' },
      { id: 'NOT-904', title: 'Express Delivery SLA Recovery: 4x4 Van Deployed', body: 'Mobile emergency van dispatched to Whitefield waterlogged zone; 18 orders saved from breach.', recipient: 'Logistics Dispatch Team', severity: 'Info', read: false, time: '22 mins ago' },
      { id: 'NOT-905', title: 'Oxygen Manifold Switched to Backup Cylinder Bank', body: 'Bandra ICU line pressure restored to 55 PSI. All 6 feline ventilators nominal.', recipient: 'ICU Nursing Supervisor', severity: 'Warning', read: false, time: '30 mins ago' },
      { id: 'NOT-906', title: 'Checkout Coupon Stacking Firewall Enforced', body: 'Deactivated unauthorized 50% discount combination on grooming services checkout API.', recipient: 'E-Commerce Engineering', severity: 'Info', read: false, time: '45 mins ago' },
      { id: 'NOT-907', title: 'Trauma Surgeon Roster Staffing Confirmed', body: 'Dr. Ramesh Kumar confirmed coverage for Saturday night emergency trauma surgery at Bandra.', recipient: 'Medical Director Office', severity: 'Info', read: false, time: '1 hr ago' },
      { id: 'NOT-908', title: 'Automated WhatsApp Booster Campaign Active', body: '480 lapsed puppy owners queued for 21-day booster reminder; 68 bookings confirmed in 1 hr.', recipient: 'Customer Retention Lead', severity: 'Info', read: false, time: '2 hrs ago' },
      { id: 'NOT-909', title: 'Reconciliation Report: ₹14.2L Recovered Revenue', body: 'Automated revenue safeguards captured unbilled surgical materials and discount leakage.', recipient: 'Chief Financial Officer', severity: 'Info', read: false, time: '3 hrs ago' },
      { id: 'NOT-910', title: 'Kafka Anomaly Detection Pipeline Operating at Peak', body: '3-sigma statistical surveillance actively scanning 14 hospital hubs and delivery telemetry.', recipient: 'DevOps & Platform Engineering', severity: 'Info', read: false, time: '4 hrs ago' }
    ]
  };

  var root = null;

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function showToast(msg) {
    var old = document.querySelector('.zalt-toast');
    if (old) old.remove();
    var toast = document.createElement('div');
    toast.className = 'zalt-toast';
    toast.innerHTML = '<span>⚡</span> <span>' + esc(msg) + '</span>';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.transition = 'opacity 0.3s ease';
      toast.style.opacity = '0';
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 300);
    }, 2800);
  }

  /* ── Tab Matching from Text or Hash ──────────────────────────────── */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    if (s.indexOf('pharmacy') >= 0 || s.indexOf('clinic') >= 0 || s.indexOf('hospital') >= 0) return null;
    if (s.indexOf('critical alert') >= 0 || s === 'critical') return 'critical';
    if (s.indexOf('revenue alert') >= 0 || s === 'revenue alerts') return 'revenue';
    if (s.indexOf('inventory alert') >= 0 || s === 'inventory alerts') return 'inventory';
    if (s.indexOf('payment alert') >= 0 || s === 'payment alerts') return 'payment';
    if (s.indexOf('order alert') >= 0 || s === 'order alerts') return 'order';
    if (s.indexOf('delivery alert') >= 0 || s === 'delivery alerts') return 'delivery';
    if (s.indexOf('finance alert') >= 0 || s === 'finance alerts') return 'finance';
    if (s.indexOf('hr alert') >= 0 || s === 'hr alerts') return 'hr';
    if (s.indexOf('system alert') >= 0 || s === 'system alerts') return 'system';
    if (s.indexOf('alert rule') >= 0 || s === 'rules' || s === 'alert rules') return 'rules';
    if (s.indexOf('notification center') >= 0 || s === 'notification' || s === 'notifications' || s === 'notification settings') return 'notifs';
    if (s === 'alerts & notifications' || s === 'alerts and notifications' || s === 'alerts' || s === 'alert center') return 'critical';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('pharmacy') >= 0 || h.indexOf('clinic') >= 0 || h.indexOf('hospital') >= 0) return null;
    if (h === 'critical-alerts' || h === 'critical') return 'critical';
    if (h === 'revenue-alerts') return 'revenue';
    if (h === 'inventory-alerts') return 'inventory';
    if (h === 'payment-alerts') return 'payment';
    if (h === 'order-alerts') return 'order';
    if (h === 'delivery-alerts') return 'delivery';
    if (h === 'finance-alerts') return 'finance';
    if (h === 'hr-alerts') return 'hr';
    if (h === 'system-alerts') return 'system';
    if (h === 'alert-rules' || h === 'rules') return 'rules';
    if (h === 'notification-center' || h === 'notifications' || h === 'notifs') return 'notifs';
    if (h === 'alerts') return 'critical';
    return null;
  }

  function hashFromTab(tab) {
    var mod = MODULES.find(function (m) { return m.id === tab; });
    return mod ? mod.hash : '#critical-alerts';
  }

  /* ── Shell Renderer ──────────────────────────────────────────────── */
  function renderShell() {
    if (!root) {
      root = document.createElement('div');
      root.id = 'zalt-root';
      document.body.appendChild(root);
    }

    var curMod = MODULES.find(function (m) { return m.id === S.activeTab; }) || MODULES[0];

    // Compute live active badge counters
    var criticalCount = S.critical.filter(function (a) { return a.status === 'Active'; }).length;
    var unreadNotifs = S.notifs.filter(function (n) { return !n.read; }).length;

    var subnavHtml = MODULES.map(function (it) {
      var activeCls = (it.id === S.activeTab) ? ' active' : '';
      var badgeCls = it.critical ? ' critical' : '';
      var badgeText = it.badge;
      if (it.id === 'critical') badgeText = criticalCount + ' Sev-1';
      if (it.id === 'notifs') badgeText = unreadNotifs + ' Unread';

      return '<button type="button" class="zalt-tab-chip' + activeCls + '" data-alt-tab="' + it.id + '" id="zalt-chip-' + it.id + '">' +
        '<span>' + it.icon + '</span>' +
        '<span>' + esc(it.label) + '</span>' +
        '<span class="zalt-tab-chip-badge' + badgeCls + '">' + esc(badgeText) + '</span>' +
        '</button>';
    }).join('');

    root.innerHTML = [
      '<!-- Top Executive Header -->',
      '<header class="zalt-header">',
        '<div class="zalt-header-left">',
          '<div class="zalt-brand-badge pulse">🔔</div>',
          '<div class="zalt-title-group">',
            '<div class="zalt-title-row">',
              '<h2 class="zalt-main-title">Alerts & Notifications Command Center</h2>',
              '<div class="zalt-status-pill">',
                '<span class="zalt-status-pill-dot"></span>',
                '<span>' + criticalCount + ' Sev-1 Active · Live Paging</span>',
              '</div>',
            '</div>',
            '<div class="zalt-breadcrumbs">',
              '<span>Zenve Intelligence</span>',
              '<span>/</span>',
              '<span>Alerts & Notifications</span>',
              '<span>/</span>',
              '<span class="active">' + esc(curMod.label) + '</span>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="zalt-header-actions">',
          '<button type="button" class="zalt-btn zalt-btn-danger" id="zalt-emergency-broadcast-btn">',
            '<span>📢</span> Emergency Broadcast',
          '</button>',
          '<button type="button" class="zalt-btn zalt-btn-outline" id="zalt-ack-all-btn">',
            '<span>✓</span> Acknowledge All',
          '</button>',
          '<button type="button" class="zalt-btn zalt-btn-outline" id="zalt-toggle-chime-btn" title="Toggle Audio Alert Chime">',
            '<span>' + (S.chimesEnabled ? '🔊 Chime On' : '🔇 Chime Muted') + '</span>',
          '</button>',
        '</div>',
      '</header>',

      '<!-- Sticky Horizontal Subnav Bar (11 Chips) -->',
      '<nav class="zalt-subnav-bar" id="zalt-subnav">',
        subnavHtml,
      '</nav>',

      '<!-- Full-Width Content Canvas -->',
      '<div class="zalt-body" id="zalt-pane">',
        renderTabContent(S.activeTab),
      '</div>'
    ].join('');

    wireEvents();
  }

  /* ── Tab Content Dispatcher ──────────────────────────────────────── */
  function renderTabContent(tab) {
    switch (tab) {
      case 'critical':  return renderCritical();
      case 'revenue':   return renderRevenue();
      case 'inventory': return renderInventory();
      case 'payment':   return renderPayment();
      case 'order':     return renderOrder();
      case 'delivery':  return renderDelivery();
      case 'finance':   return renderFinance();
      case 'hr':        return renderHR();
      case 'system':    return renderSystem();
      case 'rules':     return renderRules();
      case 'notifs':    return renderNotifs();
      default:          return renderCritical();
    }
  }

  /* ── 1. Critical Alerts Tab ──────────────────────────────────────── */
  function renderCritical() {
    var items = S.critical.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : 'zalt-alert-item sev-1';
      var badgeHtml = isResolved
        ? '<span class="zalt-badge-resolved">Resolved</span>'
        : '<span class="zalt-badge-sev1">Sev-1 Critical</span>';

      return '<div class="' + itemClass + '" id="crit-item-' + a.id + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              badgeHtml +
            '</div>' +
            '<div class="zalt-alert-meta">' +
              'Facility: <strong>' + esc(a.hub) + '</strong> · Lead: <strong>' + esc(a.lead) + '</strong>' +
            '</div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.slaCountdown) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div><span style="color:#64748b;">Sensor Telemetry:</span> <strong style="color:#b91c1c;">' + esc(a.metric) + '</strong></div>' +
          '<div><span style="color:#64748b;">Clinical Impact:</span> <strong>' + esc(a.impact) + '</strong></div>' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Current Action:</span> <span style="color:#0284c7;">' + esc(a.action) + '</span></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="page-lead" data-id="' + a.id + '">Page On-Call Specialist</button>' +
            '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="resolve-critical" data-id="' + a.id + '">✓ Acknowledge & Mitigate</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No active critical alerts. All operational parameters normal.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Active Sev-1 Incidents</span><span class="zalt-kpi-icon">🚨</span></div>',
          '<div class="zalt-kpi-value">' + S.critical.filter(function (a) { return a.status === 'Active'; }).length + ' Active</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill alert">P1 Active</span><span class="zalt-kpi-subtext">P1 Command Center Live</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Mean Time to Detect (MTTD)</span><span class="zalt-kpi-icon">⏱️</span></div>',
          '<div class="zalt-kpi-value">1.8 Mins</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">-0.6m vs SLA</span><span class="zalt-kpi-subtext">Kafka 3-sigma telemetry</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Financial Value at Risk</span><span class="zalt-kpi-icon">🛡️</span></div>',
          '<div class="zalt-kpi-value">₹18.4L</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Protected</span><span class="zalt-kpi-subtext">Automated safeguards</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">On-Call ICU Specialists</span><span class="zalt-kpi-icon">👨‍⚕️</span></div>',
          '<div class="zalt-kpi-value">14 Vets Active</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">100% Roster</span><span class="zalt-kpi-subtext">Across 14 facilities</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>🚨</span> Real-Time Sev-1 Emergency Escalation Stream</h3>',
            '<p class="zalt-card-desc">Sev-1 triggers invoke automated multi-channel escalation every 5 minutes until acknowledged by incident owner.</p>',
          '</div>',
          '<span class="zalt-badge-sev1" style="font-size:11px;">P1 ESCALATION WINDOW: 15 MINS</span>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 2. Revenue Alerts Tab ───────────────────────────────────────── */
  function renderRevenue() {
    var items = S.revenue.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : 'zalt-alert-item sev-2';
      var badgeHtml = isResolved ? '<span class="zalt-badge-resolved">Mitigated</span>' : '<span class="zalt-badge-sev2">' + esc(a.severity) + '</span>';

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              badgeHtml +
            '</div>' +
            '<div class="zalt-alert-meta">Channel: <strong>' + esc(a.channel) + '</strong> · Trigger: <span style="color:#b91c1c;">' + esc(a.trigger) + '</span></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#d97706;">' + esc(a.impact) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Root Cause Analysis:</span> <strong>' + esc(a.cause) + '</strong></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="resolve-revenue" data-id="' + a.id + '">Deploy Commercial Mitigation</button>' +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="ack-revenue" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No active revenue anomalies or pacing alerts.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Revenue at Risk</span><span class="zalt-kpi-icon">📉</span></div>',
          '<div class="zalt-kpi-value">₹18.4L</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">10 Monitored</span><span class="zalt-kpi-subtext">GMV + Returns</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Pacing Gap vs Target</span><span class="zalt-kpi-icon">🎯</span></div>',
          '<div class="zalt-kpi-value">+4.8% MTD</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">On Track</span><span class="zalt-kpi-subtext">Oct pacing: 104.8%</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Bravecto Return Rate</span><span class="zalt-kpi-icon">🔄</span></div>',
          '<div class="zalt-kpi-value">1.8%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Healthy</span><span class="zalt-kpi-subtext">-0.7% vs 2.5% threshold</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">B2B High-Value Accounts</span><span class="zalt-kpi-icon">🏢</span></div>',
          '<div class="zalt-kpi-value">10 Accounts</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Active</span><span class="zalt-kpi-subtext">VIP win-back active</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>💼</span> Commercial Revenue Anomalies & Pacing Exceptions</h3>',
            '<p class="zalt-card-desc">Monitors GMV pacing, refund/return velocity, CAC anomalies, and high-value corporate subscription contracts.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-tune-targets-btn">Auto-Tune Seasonality Targets</button>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 3. Inventory Alerts Tab ─────────────────────────────────────── */
  function renderInventory() {
    var items = S.inventory.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.sku + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Stockout Hazard</span>' : '<span class="zalt-badge-sev2">Reorder Alert</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Location: <strong>' + esc(a.hub) + '</strong> · Current Status: <strong>' + esc(a.stock) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.burn) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Status: ' + esc(a.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Recommended Supply Chain Action:</span> <strong style="color:#0284c7;">' + esc(a.action) + '</strong></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="resolve-inventory" data-id="' + a.id + '">Execute Stock Action</button>' +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="snooze-inventory" data-id="' + a.id + '">Snooze (4h)</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No active inventory alerts or stockout hazards.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">SKUs Below Safety Stock</span><span class="zalt-kpi-icon">📦</span></div>',
          '<div class="zalt-kpi-value">10 SKUs</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Buffers Active</span><span class="zalt-kpi-subtext">Reorders en route</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Near-Expiry Capital (<30d)</span><span class="zalt-kpi-icon">⏳</span></div>',
          '<div class="zalt-kpi-value">₹1.85L</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">-64% vs Q2</span><span class="zalt-kpi-subtext">FEFO liquidation live</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Cold-Chain Sensors OK</span><span class="zalt-kpi-icon">❄️</span></div>',
          '<div class="zalt-kpi-value">99.8%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">14 Hubs</span><span class="zalt-kpi-subtext">2-8°C compliance</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Trapped Excess Capital</span><span class="zalt-kpi-icon">🛡️</span></div>',
          '<div class="zalt-kpi-value">₹3.4L</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Rebalanced</span><span class="zalt-kpi-subtext">-18% MoM reduction</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>📦</span> Live SKU Stock Triggers & Expiry Exceptions</h3>',
            '<p class="zalt-card-desc">Early-warning alerts for depleted warehouse safety buffers, near-expiry pharmaceutical batches, and negative cycle count variances.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-generate-pos-btn">Auto-Generate Purchase Orders</button>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 4. Payment Alerts Tab ───────────────────────────────────────── */
  function renderPayment() {
    var items = S.payment.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Gateway Critical</span>' : '<span class="zalt-badge-sev2">Payment Warning</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Gateway / Pipe: <strong>' + esc(a.gateway) + '</strong> · Impact: <strong style="color:#b91c1c;">' + esc(a.impact) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
            '<div style="font-size:11px;font-weight:600;color:#0284c7;">' + esc(a.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Technical Root Cause:</span> ' + esc(a.cause) + '</div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'PAY-401' ? '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="failover-gateway" data-id="' + a.id + '">Instant Gateway Failover</button>' : '') +
            (a.id === 'PAY-402' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="dunning-whatsapp" data-id="' + a.id + '">Trigger WhatsApp Dunning</button>' : '') +
            (a.id === 'PAY-404' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="approve-vet-payout" data-id="' + a.id + '">Approve Vet Batch Payout</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-payment" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No active payment gateway disruptions or collection aging alerts.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Razorpay Gateway Uptime</span><span class="zalt-kpi-icon">⚡</span></div>',
          '<div class="zalt-kpi-value">99.82%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">0.18% Failure Rate</span><span class="zalt-kpi-subtext">Secondary HDFC live</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Unmapped Bank Settlement</span><span class="zalt-kpi-icon">🏦</span></div>',
          '<div class="zalt-kpi-value">₹4.2L</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Auto-Reconciling</span><span class="zalt-kpi-subtext">98.4% batch accuracy</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Pending COD Recoveries</span><span class="zalt-kpi-icon">💵</span></div>',
          '<div class="zalt-kpi-value">₹1.85L</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">10 Remittances</span><span class="zalt-kpi-subtext">Delivered cash queue</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Disputed Chargeback Ratio</span><span class="zalt-kpi-icon">🛡️</span></div>',
          '<div class="zalt-kpi-value">0.08%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Visa Safe Tier</span><span class="zalt-kpi-subtext">Below 0.65% limit</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>💳</span> Payment Gateway Disruptions & Collection Aging Alerts</h3>',
            '<p class="zalt-card-desc">Tracks checkout payment conversion, bank UPI intent failures, B2B clinical receivables aging, and doctor commission approvals.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-danger" id="zalt-gateway-failover-btn">Failover Traffic to Cashfree</button>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 5. Order Alerts Tab ─────────────────────────────────────────── */
  function renderOrder() {
    var items = S.order.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Order Bottleneck</span>' : '<span class="zalt-badge-sev2">Fulfillment Alert</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Category: <strong>' + esc(a.category) + '</strong> · Hub: <strong>' + esc(a.hub) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.metric) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Operational Impact:</span> <strong>' + esc(a.impact) + '</strong></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'ORD-501' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="assign-pharmacist" data-id="' + a.id + '">Assign Standby Pharmacist</button>' : '') +
            (a.id === 'ORD-505' ? '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="expedite-vip" data-id="' + a.id + '">Expedite VIP Priority Courier</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-order" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No active order processing bottlenecks or anomalies.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Pending Rx Sign-Offs</span><span class="zalt-kpi-icon">💊</span></div>',
          '<div class="zalt-kpi-value">10 Orders</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Triage Active</span><span class="zalt-kpi-subtext">Avg sign-off: 4.8m</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Unmatched Lab Diagnostics</span><span class="zalt-kpi-icon">🔬</span></div>',
          '<div class="zalt-kpi-value">6 Panels</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Barcodes Validated</span><span class="zalt-kpi-subtext">99.4% scan match</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Surgery Slot Utilization</span><span class="zalt-kpi-icon">🏥</span></div>',
          '<div class="zalt-kpi-value">88.4%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Optimal</span><span class="zalt-kpi-subtext">14 OTs across metros</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Abandoned Checkouts</span><span class="zalt-kpi-icon">🛒</span></div>',
          '<div class="zalt-kpi-value">4.2%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">-1.8% vs benchmark</span><span class="zalt-kpi-subtext">WhatsApp nudge active</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>🚚</span> Live Order Processing Bottlenecks & Anomaly Feed</h3>',
            '<p class="zalt-card-desc">Identifies pharmacy prescription backlogs, packing station delays, cancellation spikes, and VIP customer order escalations.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-danger" id="zalt-page-pharmacist-btn">Page Emergency Duty Pharmacist</button>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 6. Delivery Alerts Tab ──────────────────────────────────────── */
  function renderDelivery() {
    var items = S.delivery.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">SLA Hazard</span>' : '<span class="zalt-badge-sev2">Fleet Alert</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Assigned: <strong>' + esc(a.rider) + '</strong> · Zone: <strong>' + esc(a.zone) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.elapsed) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Root Cause:</span> ' + esc(a.cause) + '</div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'DEL-601' ? '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="call-rider" data-id="' + a.id + '">Call Rider & SMS Customer GPS</button>' : '') +
            (a.id === 'DEL-602' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="dispatch-intercept" data-id="' + a.id + '">Dispatch Intercept Rider</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-delivery" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No active delivery or fleet alerts.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">60-Min On-Time SLA</span><span class="zalt-kpi-icon">⚡</span></div>',
          '<div class="zalt-kpi-value">97.8%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Target Met</span><span class="zalt-kpi-subtext">Avg delivery: 38.2m</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Active Express Couriers</span><span class="zalt-kpi-icon">🛵</span></div>',
          '<div class="zalt-kpi-value">128 Riders</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">10 Monitored</span><span class="zalt-kpi-subtext">Live GPS tracking</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Cold-Chain Bag Breach</span><span class="zalt-kpi-icon">❄️</span></div>',
          '<div class="zalt-kpi-value">0 Incidents</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">100% Intact</span><span class="zalt-kpi-subtext">IoT digital seals active</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Customer Re-Attempt Rate</span><span class="zalt-kpi-icon">🔄</span></div>',
          '<div class="zalt-kpi-value">1.4%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Healthy</span><span class="zalt-kpi-subtext">-0.8% MoM drop</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>⚡</span> Live Fleet Logistics & 60-Minute SLA Watchlist</h3>',
            '<p class="zalt-card-desc">Tracks real-time rider countdowns, breakdown rescue dispatches, dark-store staging congestion, and cold-chain geofencing.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-opt-routes-btn">🧭 Optimize All Rider Routes</button>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 7. Finance Alerts Tab ───────────────────────────────────────── */
  function renderFinance() {
    var items = S.finance.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Finance Critical</span>' : '<span class="zalt-badge-sev2">Compliance Warning</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Category: <strong>' + esc(a.category) + '</strong> · Metric: <strong style="color:#b91c1c;">' + esc(a.metric) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
            '<div style="font-size:11px;font-weight:600;color:#0284c7;">' + esc(a.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div><span style="color:#64748b;">Financial Exposure:</span> <strong>' + esc(a.impact) + '</strong></div>' +
          '<div><span style="color:#64748b;">Root Cause:</span> ' + esc(a.cause) + '</div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'FIN-702' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="match-bank" data-id="' + a.id + '">Map Deposit to Invoice</button>' : '') +
            (a.id === 'FIN-703' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="approve-vendor-neft" data-id="' + a.id + '">Approve GRN & Release NEFT</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-finance" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No active financial alerts or tax compliance exceptions.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">October EBITDA Margin</span><span class="zalt-kpi-icon">📉</span></div>',
          '<div class="zalt-kpi-value">18.6%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">+2.4% vs Budget</span><span class="zalt-kpi-subtext">Target: 16.2%</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Bank Unreconciled Drops</span><span class="zalt-kpi-icon">🏦</span></div>',
          '<div class="zalt-kpi-value">₹4.2L</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Reconciling</span><span class="zalt-kpi-subtext">10 deposits mapped</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Vendor Payables (<24h)</span><span class="zalt-kpi-icon">🧾</span></div>',
          '<div class="zalt-kpi-value">₹6.8L</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Scheduled</span><span class="zalt-kpi-subtext">2% early-pay discount</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Days to GST GSTR-3B</span><span class="zalt-kpi-icon">📅</span></div>',
          '<div class="zalt-kpi-value">6 Days</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Reconciled</span><span class="zalt-kpi-subtext">ITC Matched 100%</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>💰</span> Corporate Financial Alerts & Tax Compliance Deadlines</h3>',
            '<p class="zalt-card-desc">Tracks EBITDA margin compression, unallocated bank deposits, vendor payables aging, and statutory tax deadlines.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-ai-recon-btn">🔄 Run AI Bank Reconciliation</button>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 8. HR Alerts Tab ────────────────────────────────────────────── */
  function renderHR() {
    var items = S.hr.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">Staffing Deficit</span>' : '<span class="zalt-badge-sev2">HR Alert</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Department: <strong>' + esc(a.department) + '</strong> · Facility: <strong>' + esc(a.facility) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:12px;font-weight:700;color:#ef4444;">' + esc(a.metric) + '</div>' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">Clinical / Operational Risk:</span> <strong>' + esc(a.impact) + '</strong></div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'HR-801' ? '<button type="button" class="zalt-btn zalt-btn-danger" data-alt-action="call-nurse-pool" data-id="' + a.id + '">Broadcast Shift Call (+1.5x Pay)</button>' : '') +
            (a.id === 'HR-802' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="assign-standby-surgeon" data-id="' + a.id + '">Assign Standby Surgeon</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-hr" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No active workforce exceptions or clinical staffing alerts.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Shift Coverage Rate</span><span class="zalt-kpi-icon">🏥</span></div>',
          '<div class="zalt-kpi-value">98.4%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Fully Staffed</span><span class="zalt-kpi-subtext">14 hospitals covered</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">On-Call Specialist Roster</span><span class="zalt-kpi-icon">👨‍⚕️</span></div>',
          '<div class="zalt-kpi-value">14 Active</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">100% Present</span><span class="zalt-kpi-subtext">Critical care covered</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Quota Lagging Personnel</span><span class="zalt-kpi-icon">🎯</span></div>',
          '<div class="zalt-kpi-value">3 Personnel</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Coaching Active</span><span class="zalt-kpi-subtext">Pacing on target</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Credentialing Expirations</span><span class="zalt-kpi-icon">📜</span></div>',
          '<div class="zalt-kpi-value">4 Licenses</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Renewals Filed</span><span class="zalt-kpi-subtext">State vet boards live</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>🧑‍💼</span> Live Workforce Exceptions & Clinical Governance Alerts</h3>',
            '<p class="zalt-card-desc">Monitors hospital ICU nurse staffing ratios, emergency on-call vet absences, quota pacing, and veterinary license renewals.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-danger" id="zalt-locum-surgeon-btn">🚨 Page Standby Locum Surgeon</button>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 9. System Alerts Tab ────────────────────────────────────────── */
  function renderSystem() {
    var items = S.system.map(function (a) {
      var isResolved = a.status === 'Resolved';
      var itemClass = isResolved ? 'zalt-alert-item resolved' : (a.severity === 'Critical' ? 'zalt-alert-item sev-1' : 'zalt-alert-item sev-2');

      return '<div class="' + itemClass + '">' +
        '<div class="zalt-alert-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + a.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(a.title) + '</span>' +
              (a.severity === 'Critical' ? '<span class="zalt-badge-sev1">DevOps Critical</span>' : '<span class="zalt-badge-sev2">System Warning</span>') +
            '</div>' +
            '<div class="zalt-alert-meta">Service: <strong>' + esc(a.service) + '</strong> · Metric: <strong style="color:#b91c1c;">' + esc(a.metric) + '</strong></div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:11px;color:#64748b;">Triggered ' + esc(a.time) + '</div>' +
            '<div style="font-size:11px;font-weight:600;color:#0284c7;">' + esc(a.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="zalt-alert-details">' +
          '<div style="grid-column:1/-1;"><span style="color:#64748b;">User / Business Impact:</span> ' + esc(a.impact) + '</div>' +
        '</div>' +
        (!isResolved ? (
          '<div class="zalt-alert-actions">' +
            (a.id === 'SYS-901' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="scale-workers" data-id="' + a.id + '">Scale Uvicorn Workers</button>' : '') +
            (a.id === 'SYS-902' ? '<button type="button" class="zalt-btn zalt-btn-primary" data-alt-action="wal-checkpoint" data-id="' + a.id + '">Truncate SQLite WAL</button>' : '') +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="resolve-system" data-id="' + a.id + '">Acknowledge</button>' +
          '</div>'
        ) : '') +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No active infrastructure telemetry or API exception alerts.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">API Gateway P99 Latency</span><span class="zalt-kpi-icon">⚡</span></div>',
          '<div class="zalt-kpi-value">84 ms</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Nominal</span><span class="zalt-kpi-subtext">Below 120ms SLA</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">SQLite Write Contention</span><span class="zalt-kpi-icon">🗄️</span></div>',
          '<div class="zalt-kpi-value">0 Queued</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">WAL Mode</span><span class="zalt-kpi-subtext">Locks clear</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Gemini AI Token Quota</span><span class="zalt-kpi-icon">🤖</span></div>',
          '<div class="zalt-kpi-value">82% Free</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Quota Ready</span><span class="zalt-kpi-subtext">Usage nominal</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">ERP Connector Status</span><span class="zalt-kpi-icon">🔌</span></div>',
          '<div class="zalt-kpi-value">0.4m Lag</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Synced</span><span class="zalt-kpi-subtext">Pipeline live</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>🖥️</span> Infrastructure Telemetry, Database & API Exception Watch</h3>',
            '<p class="zalt-card-desc">Observability dashboard for FastAPI latency spikes, SQLite database locks, Gemini AI token ceilings, and ERP sync status.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-restart-workers-btn">⚡ Graceful Worker Pool Flush</button>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 10. Alert Rules Tab ─────────────────────────────────────────── */
  function renderRules() {
    var items = S.rules.map(function (r) {
      var itemClass = r.enabled ? 'zalt-rule-item' : 'zalt-rule-item disabled';

      return '<div class="' + itemClass + '" id="rule-item-' + r.id + '">' +
        '<div class="zalt-rule-top">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span class="zalt-alert-id-tag">' + r.id + '</span>' +
              '<span class="zalt-alert-title">' + esc(r.name) + '</span>' +
              (r.severity.indexOf('Sev-1') >= 0 ? '<span class="zalt-badge-sev1">' + esc(r.severity) + '</span>' : '<span class="zalt-badge-sev2">' + esc(r.severity) + '</span>') +
              '<span style="font-size:11px;padding:2px 8px;border-radius:99px;background:#eff6ff;color:#2563eb;font-weight:600;">' + esc(r.category) + '</span>' +
            '</div>' +
            '<div class="zalt-rule-condition" style="margin-top:6px;">' +
              'Trigger Condition: <strong>' + esc(r.condition) + '</strong>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:12px;">' +
            '<button type="button" class="zalt-btn zalt-btn-outline" data-alt-action="test-rule" data-id="' + r.id + '">⚡ Test Event</button>' +
            '<label class="zalt-switch" title="Toggle Alert Rule">' +
              '<input type="checkbox" ' + (r.enabled ? 'checked' : '') + ' data-rule-toggle="' + r.id + '">' +
              '<span class="zalt-slider"></span>' +
            '</label>' +
          '</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;padding:8px 12px;background:#f8fafc;border-radius:8px;font-size:11px;">' +
          '<div><span style="color:#64748b;">Channels:</span> <strong style="color:#0284c7;">' + esc(r.channels.join(' · ')) + '</strong></div>' +
          '<div><span style="color:#64748b;">Escalation SLA:</span> <strong>' + esc(r.escalation) + '</strong></div>' +
          '<div><span style="color:#64748b;">Cooldown Window:</span> <strong>' + esc(r.cooldown) + '</strong></div>' +
        '</div>' +
      '</div>';
    }).join('');

    var streamContent = items || '<div style="text-align:center;padding:36px;color:#94a3b8;font-size:13px;">No alert rules configured. Click Create New Alert Rule to add one.</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Configured Rules</span><span class="zalt-kpi-icon">🛡️</span></div>',
          '<div class="zalt-kpi-value">10 Rules</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">9 Active</span><span class="zalt-kpi-subtext">Continuous eval</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Critical (Sev-1) Rules</span><span class="zalt-kpi-icon">🚨</span></div>',
          '<div class="zalt-kpi-value">3 Rules</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Standby</span><span class="zalt-kpi-subtext">Cold-chain, Life, P1</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Multi-Channel Routing</span><span class="zalt-kpi-icon">📱</span></div>',
          '<div class="zalt-kpi-value">5 Channels</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill info">Channels Ready</span><span class="zalt-kpi-subtext">Zero drop SLA</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Mean Resolution SLA</span><span class="zalt-kpi-icon">⏱️</span></div>',
          '<div class="zalt-kpi-value">4.2 Mins</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">SLA Met</span><span class="zalt-kpi-subtext">All metro hubs</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-card-header">',
          '<div>',
            '<h3 class="zalt-card-title"><span>⚙️</span> Alert Rules Engine & Escalation Matrices</h3>',
            '<p class="zalt-card-desc">Configure metric triggers, threshold conditions, multi-channel routing (WhatsApp, SMS, Slack, Voice), and cooldown policies.</p>',
          '</div>',
          '<button type="button" class="zalt-btn zalt-btn-primary" id="zalt-add-rule-btn">➕ Create New Alert Rule</button>',
        '</div>',
        '<div class="zalt-stream-list">' + streamContent + '</div>',
      '</div>'
    ].join('');
  }

  /* ── 11. Notification Center Tab ─────────────────────────────────── */
  function renderNotifs() {
    var filtered = S.notifs.filter(function (n) {
      if (S.severityFilter === 'unread' && n.read) return false;
      if (S.severityFilter === 'critical' && n.severity !== 'Critical') return false;
      if (S.severityFilter === 'warning' && n.severity !== 'Warning') return false;
      if (S.searchQuery) {
        var q = S.searchQuery.toLowerCase();
        return n.title.toLowerCase().indexOf(q) >= 0 || n.body.toLowerCase().indexOf(q) >= 0 || n.recipient.toLowerCase().indexOf(q) >= 0;
      }
      return true;
    });

    var items = filtered.length ? (filtered.map(function (n) {
      var unreadCls = n.read ? '' : ' unread';
      var badgeHtml = n.severity === 'Critical' ? '<span class="zalt-badge-sev1">Critical</span>' : (n.severity === 'Warning' ? '<span class="zalt-badge-sev2">Warning</span>' : '<span class="zalt-badge-sev3">Info</span>');

      return '<div class="zalt-notif-card' + unreadCls + '" data-alt-action="toggle-notif-read" data-id="' + n.id + '">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
              (!n.read ? '<span style="width:8px;height:8px;border-radius:50%;background:#2563eb;display:inline-block;"></span>' : '') +
              '<span style="font-size:14px;font-weight:' + (n.read ? '600' : '700') + ';color:#0f172a;">' + esc(n.title) + '</span>' +
              badgeHtml +
            '</div>' +
            '<div style="font-size:12px;color:#64748b;margin-top:3px;">' +
              'Channel: <strong style="color:#0284c7;">' + esc(n.channel) + '</strong> · Recipient: <strong>' + esc(n.recipient) + '</strong>' +
            '</div>' +
          '</div>' +
          '<div style="text-align:right;">' +
            '<div style="font-size:11px;color:#64748b;">' + esc(n.time) + '</div>' +
            '<div style="font-size:10px;font-weight:700;color:#16a34a;margin-top:2px;">' + esc(n.status) + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="font-size:13px;color:#334155;line-height:1.5;margin-top:4px;">' + esc(n.body) + '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#64748b;margin-top:4px;">' +
          '<span>ID: ' + n.id + '</span>' +
          '<span style="color:#2563eb;font-weight:600;">' + (n.read ? 'Mark as Unread' : 'Mark as Read') + '</span>' +
        '</div>' +
      '</div>';
    }).join('')) : '<div style="text-align:center;padding:36px;color:#94a3b8;">No notifications found</div>';

    return [
      '<div class="zalt-kpi-grid">',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Unread Notifications</span><span class="zalt-kpi-icon">📬</span></div>',
          '<div class="zalt-kpi-value">' + S.notifs.filter(function (n) { return !n.read; }).length + ' Unread</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill alert">Action Required</span><span class="zalt-kpi-subtext">10 in inbox</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">Dispatched Today</span><span class="zalt-kpi-icon">🚀</span></div>',
          '<div class="zalt-kpi-value">142 Alerts</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">99.4% Delivered</span><span class="zalt-kpi-subtext">All 5 channels</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">WhatsApp Business</span><span class="zalt-kpi-icon">💬</span></div>',
          '<div class="zalt-kpi-value">99.2%</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">Meta Green Tier</span><span class="zalt-kpi-subtext">Gupshup Cloud API</span></div>',
        '</div>',
        '<div class="zalt-kpi-card">',
          '<div class="zalt-kpi-header"><span class="zalt-kpi-label">SMS Gateway Latency</span><span class="zalt-kpi-icon">📱</span></div>',
          '<div class="zalt-kpi-value">1.2s</div>',
          '<div class="zalt-kpi-footer"><span class="zalt-kpi-pill success">DLT Registered</span><span class="zalt-kpi-subtext">Transactional route</span></div>',
        '</div>',
      '</div>',

      '<div class="zalt-card">',
        '<div class="zalt-notif-filters">',
          '<div class="zalt-filter-chips">',
            '<button type="button" class="zalt-fchip' + (S.severityFilter === 'all' ? ' active' : '') + '" data-nfilter="all">All Notifications</button>',
            '<button type="button" class="zalt-fchip' + (S.severityFilter === 'unread' ? ' active' : '') + '" data-nfilter="unread">Unread Only</button>',
            '<button type="button" class="zalt-fchip' + (S.severityFilter === 'critical' ? ' active' : '') + '" data-nfilter="critical">Sev-1 Critical</button>',
            '<button type="button" class="zalt-fchip' + (S.severityFilter === 'warning' ? ' active' : '') + '" data-nfilter="warning">Warnings</button>',
          '</div>',
          '<input type="text" class="zalt-search-box" id="zalt-notif-search" placeholder="Search by title, recipient, body..." value="' + esc(S.searchQuery) + '">',
        '</div>',
        '<div class="zalt-stream-list">' + (items || '<div style="padding:32px;text-align:center;color:#64748b;">No notifications match your current filter.</div>') + '</div>',
      '</div>'
    ].join('');
  }

  /* ── Wire DOM Events ─────────────────────────────────────────────── */
  function wireEvents() {
    if (!root) return;

    // Subnav Tab Chips
    root.querySelectorAll('[data-alt-tab]').forEach(function (btn) {
      btn.onclick = function () {
        var tab = btn.getAttribute('data-alt-tab');
        if (tab) switchTab(tab);
      };
    });

    // Close Button
    var closeBtn = root.querySelector('#zalt-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function () { close(); };
    }

    // Emergency Broadcast Action
    var emBtn = root.querySelector('#zalt-emergency-broadcast-btn');
    if (emBtn) {
      emBtn.onclick = function () {
        showToast('Emergency Incident Commander roster paged via WhatsApp, SMS & Voice call!');
      };
    }

    // Acknowledge All
    var ackAllBtn = root.querySelector('#zalt-ack-all-btn');
    if (ackAllBtn) {
      ackAllBtn.onclick = function () {
        S.critical.forEach(function (a) { a.status = 'Acknowledged'; });
        S.revenue.forEach(function (a) { a.status = 'Acknowledged'; });
        S.inventory.forEach(function (a) { a.status = 'Acknowledged'; });
        S.payment.forEach(function (a) { a.status = 'Acknowledged'; });
        S.order.forEach(function (a) { a.status = 'Acknowledged'; });
        S.delivery.forEach(function (a) { a.status = 'Acknowledged'; });
        S.finance.forEach(function (a) { a.status = 'Acknowledged'; });
        S.hr.forEach(function (a) { a.status = 'Acknowledged'; });
        S.system.forEach(function (a) { a.status = 'Acknowledged'; });
        showToast('All active alerts acknowledged and logged to governance ledger.');
        renderShell();
      };
    }

    // Toggle Chime Audio Button
    var chimeBtn = root.querySelector('#zalt-toggle-chime-btn');
    if (chimeBtn) {
      chimeBtn.onclick = function () {
        S.chimesEnabled = !S.chimesEnabled;
        showToast(S.chimesEnabled ? 'Audio alert ping chimes enabled.' : 'Audio alert chimes muted.');
        renderShell();
      };
    }

    // Action buttons inside tabs
    root.querySelectorAll('[data-alt-action]').forEach(function (btn) {
      btn.onclick = function (e) {
        e.stopPropagation();
        var act = btn.getAttribute('data-alt-action');
        var id = btn.getAttribute('data-id');

        if (act === 'resolve-critical') {
          var item = S.critical.find(function (a) { return a.id === id; });
          if (item) { item.status = 'Resolved'; showToast('Critical incident ' + id + ' resolved.'); }
        } else if (act === 'page-lead') {
          showToast('Paging incident commander for ' + id + ' on mobile emergency bridge!');
        } else if (act === 'resolve-revenue' || act === 'ack-revenue') {
          var rItem = S.revenue.find(function (a) { return a.id === id; });
          if (rItem) { rItem.status = 'Resolved'; showToast('Revenue exception ' + id + ' mitigated.'); }
        } else if (act === 'resolve-inventory' || act === 'snooze-inventory') {
          var iItem = S.inventory.find(function (a) { return a.id === id; });
          if (iItem) { iItem.status = 'Resolved'; showToast('Inventory trigger for SKU ' + iItem.sku + ' executed.'); }
        } else if (act === 'resolve-payment' || act === 'failover-gateway' || act === 'dunning-whatsapp' || act === 'approve-vet-payout') {
          var pItem = S.payment.find(function (a) { return a.id === id; });
          if (pItem) {
            pItem.status = 'Resolved';
            if (act === 'failover-gateway') showToast('Switched 60% checkout UPI traffic to Cashfree Gateway.');
            else if (act === 'dunning-whatsapp') showToast('Automated WhatsApp payment link sent to clinic lead.');
            else if (act === 'approve-vet-payout') showToast('Doctor weekly commission batch approved & signed off.');
            else showToast('Payment alert ' + id + ' acknowledged.');
          }
        } else if (act === 'resolve-order' || act === 'assign-pharmacist' || act === 'expedite-vip') {
          var oItem = S.order.find(function (a) { return a.id === id; });
          if (oItem) {
            oItem.status = 'Resolved';
            if (act === 'assign-pharmacist') showToast('Duty pharmacist paged to clear Rx queue.');
            else if (act === 'expedite-vip') showToast('Priority dedicated courier assigned to VIP customer.');
            else showToast('Order exception ' + id + ' cleared.');
          }
        } else if (act === 'resolve-delivery' || act === 'call-rider' || act === 'dispatch-intercept') {
          var dItem = S.delivery.find(function (a) { return a.id === id; });
          if (dItem) {
            dItem.status = 'Resolved';
            if (act === 'call-rider') showToast('Masked VoIP connected to rider; live GPS sent to customer.');
            else if (act === 'dispatch-intercept') showToast('Intercept rider dispatched with antibiotic replacements.');
            else showToast('Delivery alert ' + id + ' acknowledged.');
          }
        } else if (act === 'resolve-finance' || act === 'match-bank' || act === 'approve-vendor-neft') {
          var fItem = S.finance.find(function (a) { return a.id === id; });
          if (fItem) {
            fItem.status = 'Resolved';
            if (act === 'match-bank') showToast('AI matched ₹4.85L deposit to PetCare Network PO.');
            else if (act === 'approve-vendor-neft') showToast('GRN validated & vendor NEFT approved for Royal Canin.');
            else showToast('Financial alert ' + id + ' acknowledged.');
          }
        } else if (act === 'resolve-hr' || act === 'call-nurse-pool' || act === 'assign-standby-surgeon') {
          var hItem = S.hr.find(function (a) { return a.id === id; });
          if (hItem) {
            hItem.status = 'Resolved';
            if (act === 'call-nurse-pool') showToast('Off-duty nurse pool paged with 1.5x shift pay bonus.');
            else if (act === 'assign-standby-surgeon') showToast('Standby surgeon confirmed coverage for trauma call.');
            else showToast('Workforce alert ' + id + ' acknowledged.');
          }
        } else if (act === 'resolve-system' || act === 'scale-workers' || act === 'wal-checkpoint') {
          var sItem = S.system.find(function (a) { return a.id === id; });
          if (sItem) {
            sItem.status = 'Resolved';
            if (act === 'scale-workers') showToast('Uvicorn workers scaled from 4 to 8 instances.');
            else if (act === 'wal-checkpoint') showToast('SQLite PRAGMA wal_checkpoint executed.');
            else showToast('System telemetry alert ' + id + ' acknowledged.');
          }
        } else if (act === 'test-rule') {
          showToast('Dispatched test event across all configured channels for rule ' + id + '!');
        } else if (act === 'toggle-notif-read') {
          var nItem = S.notifs.find(function (n) { return n.id === id; });
          if (nItem) {
            nItem.read = !nItem.read;
          }
        }

        renderShell();
      };
    });

    // Rule toggle switches
    root.querySelectorAll('[data-rule-toggle]').forEach(function (inp) {
      inp.onchange = function () {
        var id = inp.getAttribute('data-rule-toggle');
        var rule = S.rules.find(function (r) { return r.id === id; });
        if (rule) {
          rule.enabled = inp.checked;
          showToast('Rule "' + rule.name + '" ' + (rule.enabled ? 'Enabled' : 'Paused') + '.');
          renderShell();
        }
      };
    });

    // Add Rule Modal Trigger
    var addRuleBtn = root.querySelector('#zalt-add-rule-btn');
    if (addRuleBtn) {
      addRuleBtn.onclick = function () { openAddRuleModal(); };
    }

    // Specific Action Buttons
    var optRoutesBtn = root.querySelector('#zalt-opt-routes-btn');
    if (optRoutesBtn) {
      optRoutesBtn.onclick = function () {
        showToast('Dynamic AI route clustering applied: transit time reduced by 18% for 68 riders.');
      };
    }

    var restartWorkersBtn = root.querySelector('#zalt-restart-workers-btn');
    if (restartWorkersBtn) {
      restartWorkersBtn.onclick = function () {
        showToast('FastAPI worker threads gracefully reloaded. Latency returned to 42ms.');
      };
    }

    var aiReconBtn = root.querySelector('#zalt-ai-recon-btn');
    if (aiReconBtn) {
      aiReconBtn.onclick = function () {
        showToast('AI Bank Reconciliation completed: matched 41 customer & vendor entries.');
      };
    }

    var genPosBtn = root.querySelector('#zalt-generate-pos-btn');
    if (genPosBtn) {
      genPosBtn.onclick = function () {
        showToast('Generated automated Purchase Orders for Royal Canin & Apoquel SKUs.');
      };
    }

    // Notification Filter Chips
    root.querySelectorAll('[data-nfilter]').forEach(function (btn) {
      btn.onclick = function () {
        S.severityFilter = btn.getAttribute('data-nfilter');
        renderShell();
      };
    });

    // Notification Search
    var sInput = root.querySelector('#zalt-notif-search');
    if (sInput) {
      sInput.oninput = function () {
        S.searchQuery = sInput.value;
        var pane = root.querySelector('#zalt-pane');
        if (pane && S.activeTab === 'notifs') {
          pane.innerHTML = renderNotifs();
          wireEvents();
          var updatedInput = root.querySelector('#zalt-notif-search');
          if (updatedInput) {
            updatedInput.focus();
            updatedInput.setSelectionRange(updatedInput.value.length, updatedInput.value.length);
          }
        }
      };
    }
  }

  /* ── Add Rule Modal ──────────────────────────────────────────────── */
  function openAddRuleModal() {
    var modal = document.createElement('div');
    modal.className = 'zalt-modal-backdrop';
    modal.id = 'zalt-rule-modal';
    modal.innerHTML = [
      '<div class="zalt-modal">',
        '<div class="zalt-modal-header">',
          '<h3 class="zalt-modal-title">Create New Alert Rule</h3>',
          '<button type="button" class="zalt-close-btn" id="zalt-modal-close">✕</button>',
        '</div>',
        '<form id="zalt-new-rule-form" style="display:flex;flex-direction:column;gap:12px;">',
          '<div>',
            '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:#334155;">Rule Name</label>',
            '<input type="text" id="zalt-rname" required placeholder="e.g. ICU Oxygen Pressure Alert" style="width:100%;padding:8px 12px;border-radius:6px;border:1px solid #cbd5e1;font-size:13px;">',
          '</div>',
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
            '<div>',
              '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:#334155;">Category</label>',
              '<select id="zalt-rcat" style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid #cbd5e1;font-size:13px;background:#fff;">',
                '<option value="Critical Emergency">Critical Emergency</option>',
                '<option value="Inventory & Stock">Inventory & Stock</option>',
                '<option value="Revenue & Sales">Revenue & Sales</option>',
                '<option value="Payment Gateways">Payment Gateways</option>',
                '<option value="Logistics & Fleet">Logistics & Fleet</option>',
                '<option value="Clinical & HR">Clinical & HR</option>',
              '</select>',
            '</div>',
            '<div>',
              '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:#334155;">Severity</label>',
              '<select id="zalt-rsev" style="width:100%;padding:8px 10px;border-radius:6px;border:1px solid #cbd5e1;font-size:13px;background:#fff;">',
                '<option value="Critical (Sev-1)">Critical (Sev-1)</option>',
                '<option value="Warning (Sev-2)">Warning (Sev-2)</option>',
                '<option value="Info (Sev-3)">Info (Sev-3)</option>',
              '</select>',
            '</div>',
          '</div>',
          '<div>',
            '<label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:#334155;">Trigger Condition</label>',
            '<input type="text" id="zalt-rcond" required placeholder="e.g. Tank Pressure < 25 PSI for > 1 min" style="width:100%;padding:8px 12px;border-radius:6px;border:1px solid #cbd5e1;font-size:13px;">',
          '</div>',
          '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">',
            '<button type="button" class="zalt-btn zalt-btn-outline" id="zalt-modal-cancel">Cancel</button>',
            '<button type="submit" class="zalt-btn zalt-btn-primary">Save & Deploy Rule</button>',
          '</div>',
        '</form>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);

    var closeBtn = modal.querySelector('#zalt-modal-close');
    var cancelBtn = modal.querySelector('#zalt-modal-cancel');
    var form = modal.querySelector('#zalt-new-rule-form');

    function closeModal() {
      if (modal.parentNode) modal.remove();
    }

    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = modal.querySelector('#zalt-rname').value;
        var cat = modal.querySelector('#zalt-rcat').value;
        var sev = modal.querySelector('#zalt-rsev').value;
        var cond = modal.querySelector('#zalt-rcond').value;

        if (!name || !cond) return;

        var rule = {
          id: 'AR-' + (100 + S.rules.length + 1),
          name: name,
          category: cat,
          condition: cond,
          severity: sev,
          channels: ['WhatsApp', 'Slack', 'Email'],
          escalation: '15 mins',
          cooldown: '15 mins',
          enabled: true
        };

        S.rules.unshift(rule);
        closeModal();
        showToast('New Alert Rule "' + name + '" deployed successfully!');
        renderShell();
      };
    }
  }

  /* ── Open, Switch, Close Lifecycle ───────────────────────────────── */
  function open(tab) {
    if (tab && MODULES.some(function (m) { return m.id === tab; })) {
      S.activeTab = tab;
    }
    renderShell();

    // Close any other open control centers
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveClinicsDashboard && typeof window.ZenveClinicsDashboard.close === 'function') {
      try { window.ZenveClinicsDashboard.close(); } catch (e) {}
    }
    document.querySelectorAll('.zpanel-root, #zod-root, #zsd-root, #zset-root, #zph-root, #zch-root, #zrep-root').forEach(function (el) {
      if (el !== root) {
        el.classList.remove('zpanel-open');
        el.classList.remove('zod-open');
        el.classList.remove('zsd-open');
        el.classList.remove('zset-open');
        el.classList.remove('zph-open');
        el.classList.remove('zch-open');
        el.classList.remove('zrep-open');
      }
    });

    root.classList.add('zalt-open');
    S.open = true;

    try {
      document.documentElement.classList.add('zalt-locked');
      document.body.classList.add('zalt-locked');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } catch (e) { }

    var targetHash = hashFromTab(S.activeTab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }

    // Clean up any Radix placeholder dialog / lock attributes
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zalt-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) {
          try { btn.click(); } catch (err) {}
        }
        try { d.remove(); } catch (err) {}
      });
      document.querySelectorAll('[data-radix-focus-guard], [data-radix-popper-content-wrapper], [data-radix-portal]').forEach(function (g) {
        try { g.remove(); } catch (err) {}
      });
    } catch (e) { }

    syncSidebar(true, S.activeTab);
  }

  function switchTab(tab) {
    if (!tab) return;
    S.activeTab = tab;
    var targetHash = hashFromTab(tab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }
    renderShell();
    syncSidebar(true, tab);
  }

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zalt-open');
    try {
      document.documentElement.classList.remove('zalt-locked');
      document.body.classList.remove('zalt-locked');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      document.body.removeAttribute('data-scroll-locked');
    } catch (e) { }
    syncSidebar(false);
    try {
      if (location.hash.startsWith('#critical-') || location.hash.startsWith('#revenue-') || location.hash.startsWith('#inventory-') || location.hash.startsWith('#payment-') || location.hash.startsWith('#order-') || location.hash.startsWith('#delivery-') || location.hash.startsWith('#finance-') || location.hash.startsWith('#hr-') || location.hash.startsWith('#system-') || location.hash.startsWith('#alert-') || location.hash.startsWith('#notification-') || location.hash === '#alerts') {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) { }
  }

  function syncSidebar(on, tab) {
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var text = (b.textContent || '').trim();
      var bTab = tabFromText(text);
      if (bTab) {
        b.classList.toggle('zalt-active', on && bTab === tab);
        b.classList.toggle('zset-active', on && bTab === tab);
      }
    });
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  window.ZenveAlertsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    getState: function () { return S; },
    showToast: showToast
  };

  /* ── Keyboard & Hashchange Listeners ────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      var modal = document.getElementById('zalt-rule-modal');
      if (modal) modal.remove();
      else close();
    }
  });

  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash.indexOf('alert') < 0 && location.hash.indexOf('notif') < 0) {
      close();
    }
  });

  /* ── Capture-Phase Global Interceptor for All 11 Alerts Pages ───── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    // Check clicked buttons, list items, and links
    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var text = item.textContent.trim();
      var tab = tabFromText(text);

      if (tab) {
        if (!t.closest('#zalt-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }
  }, true);

  // Auto-open on initial load if hash matches
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    setTimeout(function () { open(initialTab); }, 350);
  }

})();
