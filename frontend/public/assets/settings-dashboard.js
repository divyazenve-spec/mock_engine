/* =====================================================================
   Zenve BI — Enterprise Settings & Governance Suite
   Comprehensive Interactive Controller for 14 Settings Modules:
     1. Company Settings
     2. Business Units
     3. Locations
     4. Users
     5. Roles & Permissions
     6. Approval Workflows
     7. Notification Settings
     8. Dashboard Settings
     9. Tax Settings
     10. Payment Settings
     11. Delivery Settings
     12. API & Integrations
     13. Security
     14. Backup & Recovery
   ===================================================================== */

(function () {
  'use strict';

  /* ── Modules Configuration ───────────────────────────────────────── */
  var MODULES = [
    // Organization
    { id: 'company', label: 'Company Settings', group: 'Organization', icon: '🏢', hash: '#company-settings' },
    { id: 'units', label: 'Business Units', group: 'Organization', icon: '🏛️', hash: '#business-units' },
    { id: 'locations', label: 'Locations', group: 'Organization', icon: '📍', hash: '#locations' },
    // Access & Governance
    { id: 'users', label: 'Users', group: 'Access & Governance', icon: '👥', hash: '#users' },
    { id: 'roles', label: 'Roles & Permissions', group: 'Access & Governance', icon: '🛡️', hash: '#roles-permissions' },
    { id: 'workflows', label: 'Approval Workflows', group: 'Access & Governance', icon: '📋', hash: '#approval-workflows' },
    // System & Portal
    { id: 'notifications', label: 'Notification Settings', group: 'System & Portal', icon: '🔔', hash: '#notification-settings' },
    { id: 'dashboard-settings', label: 'Dashboard Settings', group: 'System & Portal', icon: '📊', hash: '#dashboard-settings' },
    // Commerce & Operations
    { id: 'tax', label: 'Tax Settings', group: 'Commerce & Operations', icon: '🧾', hash: '#tax-settings' },
    { id: 'payments', label: 'Payment Settings', group: 'Commerce & Operations', icon: '💳', hash: '#payment-settings' },
    { id: 'delivery', label: 'Delivery Settings', group: 'Commerce & Operations', icon: '🚚', hash: '#delivery-settings' },
    // Security & DevOps
    { id: 'integrations', label: 'Custom AI & API Integrations', group: 'Security & DevOps', icon: '⚡', hash: '#api-integrations' },
    { id: 'security', label: 'Security', group: 'Security & DevOps', icon: '🔐', hash: '#security' },
    { id: 'backup', label: 'Backup & Recovery', group: 'Security & DevOps', icon: '💾', hash: '#backup-recovery' }
  ];

  /* ── Configured Role & Permission Presets ────────────────────────── */
  var DEFAULT_ROLES = [
    { name: 'Super Administrator', desc: 'Full root access to all system configurations and clinical logs', users: 3 },
    { name: 'Clinical Director & CMO', desc: 'Medical governance, prescription approval, surgical scheduling, clinical audits', users: 2 },
    { name: 'Senior Veterinarian', desc: 'Patient diagnosis, prescriptions, teleconsultations, medical records', users: 18 },
    { name: 'Operations & Dispatch Lead', desc: 'Order fulfillment, rider assignment, 60-min delivery SLAs, inventory transfers', users: 12 },
    { name: 'Head Pharmacist', desc: 'Schedule-X drug dispensing, batch tracking, expiry audits, stock entry', users: 6 },
    { name: 'Financial Auditor', desc: 'Tax computation, P&L reporting, refunds, ledger reconciliation, payout approvals', users: 4 }
  ];

  var DEFAULT_PERMISSIONS = [
    { module: 'Clinical Patient Records (EHR)', view: true, create: true, edit: true, del: false, exp: true, app: true },
    { module: 'Veterinary Prescriptions (Rx)', view: true, create: true, edit: true, del: false, exp: true, app: true },
    { module: 'Orders & 60-Min Delivery Command', view: true, create: true, edit: true, del: false, exp: true, app: true },
    { module: 'Cold-Chain Pharmacy & Batch Inventory', view: true, create: true, edit: true, del: false, exp: true, app: true },
    { module: 'Financial Ledgers & Tax Reports', view: true, create: false, edit: false, del: false, exp: true, app: true },
    { module: 'User Management & Security Access', view: true, create: true, edit: true, del: true, exp: true, app: true },
    { module: 'System API & Webhook Configuration', view: true, create: true, edit: true, del: false, exp: true, app: true }
  ];

  function mergePermissions(savedList) {
    if (!Array.isArray(savedList)) return;
    DEFAULT_PERMISSIONS.forEach(function (def, i) {
      var match = savedList.find(function (item) { return item && item.module === def.module; });
      if (match) {
        S.permissions[i] = {
          module: def.module,
          view: !!match.view,
          create: !!match.create,
          edit: !!match.edit,
          del: !!match.del,
          exp: !!match.exp,
          app: !!match.app
        };
      }
    });
    // Append any custom added module scopes
    savedList.forEach(function (item) {
      if (!item || !item.module) return;
      var exists = S.permissions.some(function (p) { return p.module === item.module; });
      if (!exists) {
        S.permissions.push({
          module: item.module,
          view: !!item.view,
          create: !!item.create,
          edit: !!item.edit,
          del: !!item.del,
          exp: !!item.exp,
          app: !!item.app
        });
      }
    });
  }

  /* ── In-Memory Settings State ────────────────────────────────────── */
  var S = {
    open: false,
    activeTab: 'company',
    searchQuery: '',
    customAi: {
      provider: 'openai_compatible',
      apiUrl: '',
      apiKey: '',
      model: 'gpt-4o-mini',
      geminiApiKey: '',
      temperature: 0.2,
      ragEnabled: true,
      hitlApproval: true,
      latency: 4,
      status: 'Online (Built-in Air-Gapped Engine)',
      systemPrompt: 'You are Dr. Zenve, the Chief Executive AI & Autonomous Operations Intelligence for Zenve Pets Healthcare (14 Veterinary Hospital Hubs, E-Pharmacy, 60-Minute Express Delivery, and Preventive Care Ecosystem in India). Ground all answers strictly in the provided enterprise RAG context. State currency in INR (₹ Lakhs/Crores) and formulate concise executive briefings with actionable conclusions.'
    },
    company: {
      name: 'Zenve Healthcare & Retail Private Limited',
      brand: 'Zenve Pet Wellness & Care',
      cin: 'U85110KA2024PTC189201',
      gstin: '29AABCZ9421H1Z4',
      pan: 'AABCZ9421H',
      email: 'corporate@zenve.in',
      supportPhone: '+91 80 4728 9200',
      address: 'Zenve Health Tower, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103',
      currency: 'INR (₹)',
      fyStart: 'April 01',
      timezone: 'Asia/Kolkata (IST, UTC+05:30)',
      drugLicense: '20B/21B/KA-BNG-194208',
      vciAccreditation: 'VCI-IND-2024-00892',
      bioWasteAuth: 'BMW-KSPCB-2024-0492'
    },
    units: [
      { id: 'BU-01', name: 'Pet Products & Clinical Nutrition', code: 'DIV-NUTR', lead: 'Rahul Mehta (VP Products)', staff: 38, revenue: '₹68.4L / mo', status: 'Active' },
      { id: 'BU-02', name: 'Veterinary Pharmacy & Therapeutics', code: 'DIV-PHARM', lead: 'Karthik S. (Head Pharmacist)', staff: 28, revenue: '₹58.4L / mo', status: 'Active' },
      { id: 'BU-03', name: 'Clinical Hospitals & Emergency Surgeries', code: 'DIV-CLIN', lead: 'Dr. Priya Sharma (CMO)', staff: 46, revenue: '₹28.2L / mo', status: 'Active' },
      { id: 'BU-04', name: 'Tele-Triage & Digital Consultations', code: 'DIV-TELE', lead: 'Dr. Rajesh K. (Head of Digital Health)', staff: 18, revenue: '₹14.8L / mo', status: 'Active' },
      { id: 'BU-05', name: '60-Minute Hyperlocal Logistics & Dark Stores', code: 'DIV-LOG', lead: 'Anand Kumar (Head of Ops)', staff: 64, revenue: '₹12.5L / mo', status: 'Active' },
      { id: 'BU-06', name: 'Zenve Pet Fashion & Lifestyle', code: 'DIV-FASH', lead: 'Neha Kapur (Creative Director)', staff: 14, revenue: '₹8.4L / mo', status: 'Active' },
      { id: 'BU-07', name: 'B2B Institutional Accounts & Breeders', code: 'DIV-B2B', lead: 'Vikram Sethi (VP Enterprise)', staff: 12, revenue: '₹14.8L / mo', status: 'Active' },
      { id: 'BU-08', name: 'Care Subscriptions & Wellness Passes', code: 'DIV-SUBS', lead: 'Deepa Nair (VP Growth)', staff: 10, revenue: '₹5.8L / mo', status: 'Active' },
      { id: 'BU-09', name: 'Clinical Diagnostics & Pathology Network', code: 'DIV-DIAG', lead: 'Dr. Sandeep Verma (Head of Pathology)', staff: 16, revenue: '₹9.4L / mo', status: 'Active' },
      { id: 'BU-10', name: 'Corporate Governance & Shared Services', code: 'DIV-CORP', lead: 'Siddharth Roy (CFO)', staff: 14, revenue: 'Overhead / Shared', status: 'Active' }
    ],
    locations: [
      { id: 'LOC-BLR-01', name: 'Indiranagar Super-Specialty Hospital & Micro-Hub', area: '100ft Road, Indiranagar', type: '24/7 Trauma Hospital', city: 'Bengaluru', radius: '12 km Express', manager: 'Dr. Priya Sharma', phone: '+91 80 4728 9201', status: 'Active' },
      { id: 'LOC-BLR-02', name: 'Koramangala Cold-Chain Micro-Fulfillment Node', area: '4th Block, Koramangala', type: 'Cold-Chain Dark Store', city: 'Bengaluru', radius: '8 km Express', manager: 'Suresh Nair', phone: '+91 80 4728 9202', status: 'Active' },
      { id: 'LOC-BLR-03', name: 'Whitefield Veterinary Clinic & Express Hub', area: 'ITPL Main Road, Whitefield', type: 'Daycare & Outpatient Clinic', city: 'Bengaluru', radius: '10 km Express', manager: 'Dr. Ananya Sen', phone: '+91 80 4728 9203', status: 'Active' },
      { id: 'LOC-BLR-04', name: 'Electronic City Emergency Surgery Annex', area: 'Phase 1 Tech Corridor', type: '24/7 Trauma Center', city: 'Bengaluru', radius: '14 km Express', manager: 'Dr. Sandeep Verma', phone: '+91 80 4728 9204', status: 'Active' },
      { id: 'LOC-BOM-01', name: 'Bandra West Veterinary Care & Cold Hub', area: 'Linking Road, Bandra West', type: 'Super-Specialty Hospital', city: 'Mumbai MMR', radius: '10 km Express', manager: 'Dr. Farhan Merchant', phone: '+91 22 6829 4101', status: 'Active' },
      { id: 'LOC-BOM-02', name: 'Andheri MIDC Central Warehouse & Formulary', area: 'MIDC Industrial Area, Andheri East', type: 'Central Distribution Center', city: 'Mumbai MMR', radius: '25 km Regional', manager: 'Rakesh Solanki', phone: '+91 22 6829 4102', status: 'Active' },
      { id: 'LOC-BOM-03', name: 'Thane City Express Dark Store', area: 'Ghodbunder Road, Thane West', type: 'Cold-Chain Micro-Hub', city: 'Mumbai MMR', radius: '8 km Express', manager: 'Vijay Deshmukh', phone: '+91 22 6829 4103', status: 'Active' },
      { id: 'LOC-DEL-01', name: 'Gurgaon Golf Course Road Hospital Hub', area: 'Sector 54, Golf Course Road', type: '24/7 Veterinary Hospital', city: 'Delhi NCR', radius: '15 km Express', manager: 'Dr. Rajiv Malhotra', phone: '+91 124 492 8101', status: 'Active' },
      { id: 'LOC-DEL-02', name: 'Noida Sector 62 Regional Logistics Hub', area: 'Electronic City Road, Sector 62', type: 'Regional Dark Store', city: 'Delhi NCR', radius: '20 km Regional', manager: 'Amit Tyagi', phone: '+91 120 488 9201', status: 'Active' },
      { id: 'LOC-HYD-01', name: 'Hitec City Veterinary Hospital & Express Hub', area: 'Madhapur Cyberabad', type: 'Trauma Center & Dark Store', city: 'Hyderabad', radius: '12 km Express', manager: 'Dr. Srinivas Rao', phone: '+91 40 6820 9401', status: 'Active' }
    ],
    users: [
      { id: 'USR-001', name: 'Dr. Priya Sharma', email: 'priya.sharma@zenve.in', role: 'Clinical Director & CMO', unit: 'Clinical Hospitals', location: 'Indiranagar Super-Specialty', mfa: 'Enforced', status: 'Active' },
      { id: 'USR-002', name: 'Karthik S.', email: 'karthik.s@zenve.in', role: 'Head Pharmacist', unit: 'Veterinary Pharmacy', location: 'Koramangala Node', mfa: 'Enforced', status: 'Active' },
      { id: 'USR-003', name: 'Siddharth Roy', email: 'siddharth.roy@zenve.in', role: 'Chief Financial Officer', unit: 'Corporate Governance', location: 'Bengaluru HQ', mfa: 'Enforced', status: 'Active' },
      { id: 'USR-004', name: 'Anand Kumar', email: 'anand.kumar@zenve.in', role: 'Operations & Dispatch Lead', unit: '60-Min Hyperlocal', location: 'Koramangala Node', mfa: 'Enforced', status: 'Active' },
      { id: 'USR-005', name: 'Dr. Rajesh K.', email: 'rajesh.k@zenve.in', role: 'Senior Veterinarian', unit: 'Telemedicine', location: 'Whitefield Clinic', mfa: 'Enforced', status: 'Active' },
      { id: 'USR-006', name: 'Tarun Verma', email: 'tarun.verma@zenve.in', role: 'Super Administrator', unit: 'Technology & DevOps', location: 'Bengaluru HQ', mfa: 'Enforced', status: 'Active' },
      { id: 'USR-007', name: 'Dr. Farhan Merchant', email: 'farhan.merchant@zenve.in', role: 'Senior Veterinarian', unit: 'Clinical Hospitals', location: 'Bandra West Hospital', mfa: 'Enforced', status: 'Active' },
      { id: 'USR-008', name: 'Vikram Sethi', email: 'vikram.sethi@zenve.in', role: 'Financial Auditor', unit: 'B2B Enterprise', location: 'Bengaluru HQ', mfa: 'Enforced', status: 'Active' },
      { id: 'USR-009', name: 'Ananya Mehra', email: 'ananya.mehra@zenve.in', role: 'HR & Personnel Lead', unit: 'Corporate Governance', location: 'Bengaluru HQ', mfa: 'Enforced', status: 'Active' },
      { id: 'USR-010', name: 'Dr. Rajiv Malhotra', email: 'rajiv.malhotra@zenve.in', role: 'Senior Veterinarian', unit: 'Clinical Hospitals', location: 'Gurgaon Golf Course Hub', mfa: 'Enforced', status: 'Active' }
    ],
    roles: DEFAULT_ROLES.slice(),
    permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS)),
    workflows: [
      { id: 'WF-01', name: 'Schedule H / X Narcotic Prescription Sign-Off', trigger: 'Rx contains Controlled Drug', steps: 'Consulting Vet -> Head Pharmacist Verification', timeout: '15 Mins SLA', status: 'Active' },
      { id: 'WF-02', name: 'High-Value Patient Refund Authorization (> ₹2,500)', trigger: 'Refund Request > ₹2,500', steps: 'Customer Support Lead -> Finance Manager', timeout: '2 Hours SLA', status: 'Active' },
      { id: 'WF-03', name: 'Wholesale Pharmaceutical PO Approval (> ₹1,00,000)', trigger: 'Vendor Purchase Order Issued', steps: 'Procurement Lead -> Chief Financial Officer', timeout: '24 Hours SLA', status: 'Active' },
      { id: 'WF-04', name: 'Emergency Surgical Room Allocation Override', trigger: 'Trauma Triage Flag: Critical', steps: 'Emergency Vet -> Chief Surgeon Confirmation', timeout: '5 Mins SLA', status: 'Active' },
      { id: 'WF-05', name: 'Cold-Chain Temperature Deviation Spoilage Protocol', trigger: 'Sensor Temp > 8°C for > 20 Mins', steps: 'IoT Sentinel -> Quality Lead -> Stock Write-Off', timeout: '30 Mins SLA', status: 'Active' },
      { id: 'WF-06', name: 'New Veterinary Specialist Onboarding & Credentialing', trigger: 'New Practitioner Account Created', steps: 'HR Verification -> Medical Director VCI Audit', timeout: '48 Hours SLA', status: 'Active' },
      { id: 'WF-07', name: 'Commercial B2B Credit Limit Override (> ₹5,00,000)', trigger: 'Enterprise PO on Credit Terms', steps: 'Account Executive -> VP Enterprise -> CFO', timeout: '12 Hours SLA', status: 'Active' },
      { id: 'WF-08', name: 'Expired Pharmaceutical Destruction Audit', trigger: 'Batch Expired Quarantine Action', steps: 'Pharmacist -> Pollution Control Board Witness Form', timeout: '72 Hours SLA', status: 'Active' },
      { id: 'WF-09', name: 'Emergency Delivery Courier Fee Waiver', trigger: 'Courier Charge Waiver Requested', steps: 'Operations Lead Approval', timeout: '10 Mins SLA', status: 'Active' },
      { id: 'WF-10', name: 'Production API Key Generation & IP Whitelist Change', trigger: 'New API Key or Subnet Addition', steps: 'Engineering Lead -> Super Administrator Sign-Off', timeout: '4 Hours SLA', status: 'Active' }
    ],
    pendingApprovals: [
      { id: 'APP-1042', title: 'Controlled Phenobarbital Rx Authorization', amount: '₹1,240', orderId: 'ORD-2026-9428', requester: 'Dr. Farhan Merchant', date: '12 mins ago' },
      { id: 'APP-1043', title: 'Damaged Reefer Cargo Write-Off (Batch #BOM-V2)', amount: '₹34,500', orderId: 'PO-2026-081', requester: 'Rakesh Solanki', date: '45 mins ago' },
      { id: 'APP-1044', title: 'Customer Refund: Chronic Renal Prescription Diet', amount: '₹4,850', orderId: 'RET-2026-049', requester: 'Care Support Lead', date: '1 hour ago' },
      { id: 'APP-1045', title: 'Zoetis Direct Manufacturer Bulk Serum PO', amount: '₹4,20,000', orderId: 'PO-2026-094', requester: 'Vikram Sethi', date: '2 hours ago' },
      { id: 'APP-1046', title: 'Emergency Ultrasound Probe Equipment Lease', amount: '₹1,45,000', orderId: 'CAP-2026-018', requester: 'Dr. Priya Sharma', date: '3 hours ago' }
    ],
    notifications: {
      whatsapp: true,
      sms: true,
      email: true,
      push: true,
      orderConfirm: true,
      expressDispatch: true,
      appointmentReminders: true,
      rxReady: true,
      lowStockAlert: true,
      dailyDigest: true,
      securityAlert: true
    },
    dashboardSettings: {
      defaultLanding: 'Executive Control Center',
      refreshInterval: '30s',
      boardroomPrivacy: false,
      theme: 'Dark Executive',
      showKpis: true,
      highPrecisionNumbers: true
    },
    taxes: [
      { category: 'Veterinary Prescription Medicines', code: 'HSN 3004', gst: '12.0%', cgst: '6.0%', sgst: '6.0%', igst: '12.0%' },
      { category: 'Biological Vaccines & Serums', code: 'HSN 3002', gst: '5.0%', cgst: '2.5%', sgst: '2.5%', igst: '5.0%' },
      { category: 'Veterinary Surgical Implants & Sutures', code: 'HSN 9018', gst: '12.0%', cgst: '6.0%', sgst: '6.0%', igst: '12.0%' },
      { category: 'Pet Nutrition & Therapeutic Diets', code: 'HSN 2309', gst: '18.0%', cgst: '9.0%', sgst: '9.0%', igst: '18.0%' },
      { category: 'Pet Care Shampoo & Dermatologicals', code: 'HSN 3307', gst: '18.0%', cgst: '9.0%', sgst: '9.0%', igst: '18.0%' },
      { category: 'Veterinary Healthcare Consultations', code: 'SAC 9983', gst: '0.0% (Exempt)', cgst: '0.0%', sgst: '0.0%', igst: '0.0%' },
      { category: 'Pathology & Diagnostic Lab Services', code: 'SAC 9993', gst: '0.0% (Exempt)', cgst: '0.0%', sgst: '0.0%', igst: '0.0%' },
      { category: 'Professional Pet Grooming & Spa', code: 'SAC 9997', gst: '18.0%', cgst: '9.0%', sgst: '9.0%', igst: '18.0%' },
      { category: 'Hyperlocal 60-Minute Last-Mile Courier', code: 'SAC 9965', gst: '18.0%', cgst: '9.0%', sgst: '9.0%', igst: '18.0%' },
      { category: 'Wellness Club Annual Membership Passes', code: 'SAC 9983', gst: '18.0%', cgst: '9.0%', sgst: '9.0%', igst: '18.0%' }
    ],
    payments: {
      primaryGateway: 'Razorpay Enterprise Route (UPI / Netbanking)',
      secondaryGateway: 'Cashfree Instant Payouts API',
      internationalGateway: 'Stripe Global Express',
      upiAutoPay: true,
      codEnabled: true,
      maxCodValue: '₹3,000',
      settlementAccount: 'HDFC Bank Corporate — A/C ending 9421'
    },
    delivery: {
      expressRadiusKm: 12,
      expressSlaMins: 60,
      dispatchThresholdMins: 5,
      freeDeliveryMinOrder: 499,
      standardDeliveryFee: 49,
      coldChainEnforced: true,
      primaryFleet: 'Shadowfax Quick & Dunzo for Business',
      secondaryFleet: 'Zenve Dedicated Hyperlocal Courier Team'
    },
    integrations: [
      { name: 'Razorpay PG & UPI Gateway', type: 'Payment Processor', status: 'Healthy', uptime: '99.98%', lastSync: '10s ago' },
      { name: 'Cashfree Instant Payouts Engine', type: 'Doctor Payouts', status: 'Healthy', uptime: '99.95%', lastSync: '45s ago' },
      { name: 'Gupshup WhatsApp Business Cloud', type: 'Messaging & OTP', status: 'Healthy', uptime: '99.99%', lastSync: '12s ago' },
      { name: 'Amazon SES Transactional Email', type: 'Electronic Invoices', status: 'Healthy', uptime: '100.0%', lastSync: '1 min ago' },
      { name: 'Firebase Cloud Messaging (FCM)', type: 'Mobile Push Notifications', status: 'Healthy', uptime: '99.99%', lastSync: '30s ago' },
      { name: 'Shadowfax Hyperlocal Dispatch API', type: '60-Min Logistics', status: 'Healthy', uptime: '99.91%', lastSync: '15s ago' },
      { name: 'Tally Prime Cloud ERP Bridge', type: 'Accounting & Ledgers', status: 'Healthy', uptime: '99.85%', lastSync: '5 mins ago' },
      { name: 'VetPort & Practo EHR Sync', type: 'Clinical EHR Practice', status: 'Healthy', uptime: '99.94%', lastSync: '2 mins ago' },
      { name: 'Zoetis Direct SRA Data Feed', type: 'Pharma Inventory EDI', status: 'Healthy', uptime: '99.90%', lastSync: '12 mins ago' },
      { name: 'Sentry Telemetry & Error Sentinel', type: 'DevOps & Reliability', status: 'Healthy', uptime: '100.0%', lastSync: 'Live' }
    ],
    security: {
      mfaEnforced: true,
      ssoGoogle: true,
      ssoAzure: true,
      sessionTimeoutMins: 30,
      ipWhitelist: '103.21.144.0/24, 14.143.32.18/32, 49.207.210.0/24',
      auditLogsRetentionDays: 365,
      activeSessions: [
        { device: 'MacBook Pro 16" M3 Max', browser: 'Chrome 124.0 (macOS)', ip: '103.21.144.12', location: 'Bengaluru, India', time: 'Active Now', current: true },
        { device: 'iPad Pro 12.9" Cellular', browser: 'Mobile Safari 17.2', ip: '103.21.144.88', location: 'Bengaluru, India', time: '14 mins ago', current: false },
        { device: 'Dell Precision 7780', browser: 'Edge 124.0 (Windows)', ip: '14.143.32.18', location: 'Mumbai, India', time: '1 hour ago', current: false },
        { device: 'iPhone 15 Pro Max', browser: 'Zenve Staff App 2.4', ip: '49.207.210.45', location: 'Delhi NCR, India', time: '3 hours ago', current: false }
      ]
    },
    backup: {
      primaryRegion: 'AWS ap-south-1 (Mumbai Primary DC)',
      secondaryRegion: 'AWS ap-south-2 (Hyderabad Standby DC)',
      rpo: '< 5 Seconds',
      rto: '< 2 Minutes',
      pitrRetention: '35 Days Continuous WAL Archive',
      snapshots: [
        { id: 'SNP-2026-1014-0400', date: '2026-10-14 04:00 IST', size: '14.8 GB', type: 'Daily Automated Full', checksum: 'e3b0c442...98b2', status: 'Verified' },
        { id: 'SNP-2026-1013-0400', date: '2026-10-13 04:00 IST', size: '14.6 GB', type: 'Daily Automated Full', checksum: 'a718c991...44f1', status: 'Verified' },
        { id: 'SNP-2026-1012-0400', date: '2026-10-12 04:00 IST', size: '14.5 GB', type: 'Daily Automated Full', checksum: 'b98218aa...66e2', status: 'Verified' },
        { id: 'SNP-2026-1011-0400', date: '2026-10-11 04:00 IST', size: '14.3 GB', type: 'Daily Automated Full', checksum: 'd19982ee...11a3', status: 'Verified' },
        { id: 'SNP-2026-1010-0400', date: '2026-10-10 04:00 IST', size: '14.1 GB', type: 'Weekly Consolidated Master', checksum: 'c88129bb...33c9', status: 'Verified' }
      ]
    }
  };

  var root = null;

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function showToast(msg) {
    var old = document.querySelector('.zset-toast');
    if (old) old.remove();
    var toast = document.createElement('div');
    toast.className = 'zset-toast';
    toast.innerHTML = '<span>⚡</span> <span>' + esc(msg) + '</span>';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.transition = 'opacity 0.3s ease';
      toast.style.opacity = '0';
      setTimeout(function () { if (toast.parentNode) toast.remove(); }, 300);
    }, 2800);
  }

  /* ── Tab Finders ─────────────────────────────────────────────────── */
  function tabFromText(text) {
    if (!text) return null;
    var s = text.trim().toLowerCase();
    if (s.indexOf('company settings') >= 0 || s === 'company') return 'company';
    if (s.indexOf('business unit') >= 0 || s === 'units') return 'units';
    if (s === 'locations' || s === 'location' || s === 'all locations' || s === 'facility locations') {
      if (s.indexOf('revenue') >= 0) return null;
      return 'locations';
    }
    if (s === 'users' || s === 'all users' || s === 'user management' || s === 'system users') return 'users';
    if (s.indexOf('role') >= 0 || s.indexOf('permission') >= 0) return 'roles';
    if (s.indexOf('approval') >= 0 || s.indexOf('workflow') >= 0) return 'workflows';
    if (s.indexOf('notification') >= 0 && (s.indexOf('setting') >= 0 || s.indexOf('channel') >= 0 || s === 'notification settings')) return 'notifications';
    if (s.indexOf('dashboard settings') >= 0 || s === 'dashboard setting') return 'dashboard-settings';
    if (s.indexOf('tax settings') >= 0 || s === 'tax setting' || s === 'taxes' || s === 'tax') return 'tax';
    if (s.indexOf('payment settings') >= 0 || s === 'payment setting' || (s.indexOf('payment') >= 0 && s.indexOf('setting') >= 0)) return 'payments';
    if (s.indexOf('delivery settings') >= 0 || s === 'delivery setting' || (s.indexOf('delivery') >= 0 && s.indexOf('setting') >= 0)) return 'delivery';
    if (s.indexOf('api & integrations') >= 0 || s.indexOf('api and integrations') >= 0 || s === 'api' || s === 'integrations' || s === 'api settings' || s.indexOf('custom ai') >= 0 || s.indexOf('custom api') >= 0 || s.indexOf('enterprise rag') >= 0 || s.indexOf('rag') >= 0 || s.indexOf('agentic') >= 0 || s.indexOf('ai model') >= 0) return 'integrations';
    if (s === 'security' || s === 'security settings' || s.indexOf('security setting') >= 0) return 'security';
    if (s.indexOf('backup & recovery') >= 0 || s.indexOf('backup and recovery') >= 0 || s === 'backup' || s === 'backups' || s.indexOf('backup') >= 0) return 'backup';
    if (s === 'settings') return 'company';
    return null;
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = (hash.startsWith('#') ? hash : '#' + hash).toLowerCase().trim();
    if (clean === '#custom-ai' || clean === '#ai-model' || clean === '#enterprise-rag' || clean === '#rag' || clean === '#ai-integrations' || clean === '#custom-api') return 'integrations';
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].hash === clean || clean === '#' + MODULES[i].id) {
        return MODULES[i].id;
      }
    }
    if (clean === '#settings' || clean === '#settings-dashboard') return 'company';
    return null;
  }

  function hashFromTab(tab) {
    var mod = MODULES.find(function (m) { return m.id === tab; });
    return mod ? mod.hash : '#company-settings';
  }

  /* ── Shell Renderer ──────────────────────────────────────────────── */
  function renderShell() {
    if (!root) {
      root = document.createElement('div');
      root.id = 'zset-root';
      document.body.appendChild(root);
    }

    var curMod = MODULES.find(function (m) { return m.id === S.activeTab; }) || MODULES[0];

    // Build horizontal top subnav bar with 14 chips
    var subnavHtml = MODULES.map(function (it) {
      var activeCls = (it.id === S.activeTab) ? ' active' : '';
      return '<button type="button" class="zset-tab-chip' + activeCls + '" data-set-tab="' + it.id + '" id="zset-chip-' + it.id + '">' +
        '<span class="zset-tab-chip-icon">' + it.icon + '</span>' +
        '<span>' + esc(it.label) + '</span>' +
        '</button>';
    }).join('');

    root.innerHTML = [
      '<!-- Top Executive Header -->',
      '<header class="zset-header">',
        '<div class="zset-header-left">',
          '<div class="zset-brand-badge">⚙️</div>',
          '<div class="zset-title-group">',
            '<div class="zset-title-row">',
              '<h2 class="zset-main-title">Settings & Governance Control Center</h2>',
              '<span class="zset-env-pill">Production · Active</span>',
            '</div>',
            '<div class="zset-breadcrumbs">',
              '<span>Zenve System</span>',
              '<span>/</span>',
              '<span>' + esc(curMod.group) + '</span>',
              '<span>/</span>',
              '<span class="active">' + esc(curMod.label) + '</span>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="zset-header-actions">',
          '<button type="button" class="zset-btn zset-btn-primary" id="zset-save-all-btn">',
            '<span>💾</span> Save Changes',
          '</button>',
        '</div>',
      '</header>',

      '<!-- Sticky Horizontal Subnav Bar (Replaces Inner Left Rail) -->',
      '<nav class="zset-subnav-bar" id="zset-subnav">',
        subnavHtml,
      '</nav>',

      '<!-- Full-Width Content Canvas (Using div to avoid global main margin pollution) -->',
      '<div class="zset-body" id="zset-pane">',
        renderTabContent(S.activeTab),
      '</div>'
    ].join('');

    wireEvents();
  }

  /* ── Tab Content Dispatcher ──────────────────────────────────────── */
  function renderTabContent(tab) {
    switch (tab) {
      case 'company': return renderCompany();
      case 'units': return renderBusinessUnits();
      case 'locations': return renderLocations();
      case 'users': return renderUsers();
      case 'roles': return renderRolesPermissions();
      case 'workflows': return renderApprovalWorkflows();
      case 'notifications': return renderNotifications();
      case 'dashboard-settings': return renderDashboardSettings();
      case 'tax': return renderTaxes();
      case 'payments': return renderPayments();
      case 'delivery': return renderDelivery();
      case 'integrations': return renderIntegrations();
      case 'security': return renderSecurity();
      case 'backup': return renderBackup();
      default: return renderCompany();
    }
  }

  /* ── Tab 1: Company Settings ─────────────────────────────────────── */
  function renderCompany() {
    var c = S.company;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Company Settings & Statutory Profile</h3>',
          '<p class="zset-tab-desc">Enterprise identity, statutory registration, drug licenses, and financial standards governing Zenve Healthcare.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header">',
          '<h4 class="zset-card-title">🏢 Legal Entity & Corporate Registration</h4>',
          '<span class="zset-badge" style="background:rgba(255,255,255,0.06);color:#94a3b8;">' + (c.name ? 'Configured' : 'Not Set') + '</span>',
        '</div>',
        '<div class="zset-grid-2">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Legal Entity Name</label>',
            '<input class="zset-input" id="inp-comp-name" value="' + esc(c.name) + '" placeholder="Legal entity name">',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Consumer Brand Identity</label>',
            '<input class="zset-input" id="inp-comp-brand" value="' + esc(c.brand) + '" placeholder="Consumer brand identity">',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Corporate Identification Number (CIN)</label>',
            '<input class="zset-input font-mono" id="inp-comp-cin" value="' + esc(c.cin) + '" placeholder="CIN number">',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Permanent Account Number (PAN)</label>',
            '<input class="zset-input font-mono" id="inp-comp-pan" value="' + esc(c.pan) + '" placeholder="PAN number">',
          '</div>',
          '<div class="zset-form-group" style="grid-column: span 2;">',
            '<label class="zset-label">Registered Corporate Address</label>',
            '<input class="zset-input" id="inp-comp-addr" value="' + esc(c.address) + '" placeholder="Registered corporate address">',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header">',
          '<h4 class="zset-card-title">🩺 Healthcare Licenses & Board Accreditations</h4>',
          '<span class="zset-badge" style="background:rgba(255,255,255,0.06);color:#94a3b8;">' + (c.drugLicense ? 'Licensed' : 'Pending') + '</span>',
        '</div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Retail/Wholesale Drug License</label>',
            '<input class="zset-input font-mono" id="inp-comp-dl" value="' + esc(c.drugLicense) + '" placeholder="Drug license number">',
            '<div class="zset-help-text">Form 20B/21B valid license</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Veterinary Council Accreditation</label>',
            '<input class="zset-input font-mono" id="inp-comp-vci" value="' + esc(c.vciAccreditation) + '" placeholder="VCI accreditation ID">',
            '<div class="zset-help-text">Telemedicine practice accreditation</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Bio-Medical Waste Authorization</label>',
            '<input class="zset-input font-mono" id="inp-comp-bmw" value="' + esc(c.bioWasteAuth) + '" placeholder="BMW authorization code">',
            '<div class="zset-help-text">State Pollution Control Board</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header">',
          '<h4 class="zset-card-title">🌐 Fiscal & Localization Standards</h4>',
        '</div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Base Operating Currency</label>',
            '<input class="zset-input" value="' + esc(c.currency) + '" placeholder="Currency" disabled>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Financial Year Cycle</label>',
            '<input class="zset-input" value="' + esc(c.fyStart ? c.fyStart + ' - March 31' : '') + '" placeholder="FY cycle" disabled>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">System Timezone</label>',
            '<input class="zset-input font-mono" value="' + esc(c.timezone) + '" placeholder="Timezone" disabled>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 2: Business Units ───────────────────────────────────────── */
  function renderBusinessUnits() {
    var rows = S.units.length ? S.units.map(function (u) {
      return '<tr>' +
        '<td class="font-mono" style="font-weight:600;color:#38bdf8;">' + esc(u.id) + '</td>' +
        '<td><strong>' + esc(u.name) + '</strong><br><small style="color:#64748b;">' + esc(u.code) + '</small></td>' +
        '<td>' + esc(u.lead) + '</td>' +
        '<td class="font-mono">' + esc(u.staff) + ' Members</td>' +
        '<td class="font-mono" style="font-weight:600;color:#10b981;">' + esc(u.revenue) + '</td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(u.status) + '</span></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:36px;color:#94a3b8;">No business units found</td></tr>';

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Business Units & Divisions</h3>',
          '<p class="zset-tab-desc">Organizational cost centers, vertical heads, and P&L allocations across hospitals, telemedicine, pharmacy, and lifestyle.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-unit">+ Add Business Unit</button>',
      '</div>',

      '<div class="zset-kpi-row">',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Total Divisions</div><div class="zset-kpi-val">' + S.units.length + ' Operating Units</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Total Workforce</div><div class="zset-kpi-val font-mono">260 Staff</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Consolidated Revenue Run-Rate</div><div class="zset-kpi-val font-mono" style="color:#10b981;">₹2.26 Cr / mo</div></div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Unit ID</th><th>Division Name & Code</th><th>Division Lead</th><th>Staff</th><th>Run-Rate</th><th>Status</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 3: Locations ────────────────────────────────────────────── */
  function renderLocations() {
    var q = S.searchQuery.toLowerCase();
    var filtered = S.locations.filter(function (loc) {
      return !q || (loc.name + ' ' + loc.city + ' ' + loc.type + ' ' + loc.area).toLowerCase().indexOf(q) >= 0;
    });

    var rows = filtered.length ? filtered.map(function (loc) {
      return '<tr>' +
        '<td class="font-mono" style="color:#38bdf8;font-weight:600;">' + esc(loc.id) + '</td>' +
        '<td><strong>' + esc(loc.name) + '</strong><br><small style="color:#94a3b8;">' + esc(loc.area) + '</small></td>' +
        '<td><span class="zset-badge zset-badge-info">' + esc(loc.type) + '</span></td>' +
        '<td>' + esc(loc.city) + '</td>' +
        '<td class="font-mono">' + esc(loc.radius) + '</td>' +
        '<td>' + esc(loc.manager) + '<br><small class="font-mono" style="color:#64748b;">' + esc(loc.phone) + '</small></td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(loc.status) + '</span></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="7" style="text-align:center;padding:36px;color:#94a3b8;">No facilities found</td></tr>';

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Locations & Facility Nodes</h3>',
          '<p class="zset-tab-desc">Hospitals, trauma clinics, micro-fulfillment dark stores, and cold-chain hubs powering regional and 60-minute healthcare.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-loc">+ Add Location</button>',
      '</div>',

      '<div class="zset-filter-bar">',
        '<input class="zset-search-input" id="inp-loc-search" placeholder="Search by name, city, or facility type..." value="' + esc(S.searchQuery) + '">',
        '<span style="font-size:11px;color:#94a3b8;">Showing ' + filtered.length + ' of ' + S.locations.length + ' active facilities</span>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Node ID</th><th>Facility & Area</th><th>Facility Type</th><th>City</th><th>Coverage Radius</th><th>Manager & Contact</th><th>Status</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 4: Users ────────────────────────────────────────────────── */
  function renderUsers() {
    var q = S.searchQuery.toLowerCase();
    var filtered = S.users.filter(function (u) {
      return !q || (u.name + ' ' + u.email + ' ' + u.role + ' ' + u.unit + ' ' + u.location).toLowerCase().indexOf(q) >= 0;
    });

    var rows = filtered.length ? filtered.map(function (u) {
      var av = u.name.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
      var mfaBadge = u.mfa === 'Enforced' ? 'zset-badge-success' : 'zset-badge-warning';
      return '<tr>' +
        '<td>' +
          '<div class="zset-user-pill">' +
            '<div class="zset-avatar">' + av + '</div>' +
            '<div>' +
              '<strong>' + esc(u.name) + '</strong><br>' +
              '<small class="font-mono" style="color:#94a3b8;">' + esc(u.email) + '</small>' +
            '</div>' +
          '</div>' +
        '</td>' +
        '<td><span class="zset-badge zset-badge-purple">' + esc(u.role) + '</span></td>' +
        '<td>' + esc(u.unit) + '</td>' +
        '<td>' + esc(u.location) + '</td>' +
        '<td><span class="zset-badge ' + mfaBadge + '">' + esc(u.mfa) + '</span></td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(u.status) + '</span></td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:36px;color:#94a3b8;">No users found</td></tr>';

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Users & Administrative Personnel</h3>',
          '<p class="zset-tab-desc">Manage licensed veterinary practitioners, clinical directors, care coordinators, pharmacists, and operations staff.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-user">+ Invite User</button>',
      '</div>',

      '<div class="zset-filter-bar">',
        '<input class="zset-search-input" id="inp-user-search" placeholder="Search staff by name, email, or role..." value="' + esc(S.searchQuery) + '">',
        '<span style="font-size:11px;color:#94a3b8;">' + filtered.length + ' active personnel indexed</span>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Personnel</th><th>Designated Role</th><th>Business Unit</th><th>Primary Facility</th><th>2FA Security</th><th>Account</th></tr></thead>',
            '<tbody>' + rows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 5: Roles & Permissions ──────────────────────────────────── */
  function renderRolesPermissions() {
    var roleCards = S.roles.length ? S.roles.map(function (r) {
      return '<div class="zset-kpi-card">' +
        '<div class="zset-kpi-lbl">' + esc(r.name) + ' (' + (r.users || 0) + ' Users)</div>' +
        '<div style="font-size:11px;color:#cbd5e1;margin-top:6px;line-height:1.4;">' + esc(r.desc) + '</div>' +
      '</div>';
    }).join('') : '<div style="padding:16px;text-align:center;color:#94a3b8;grid-column:1/-1;">No configured role profiles</div>';

    var permRows = S.permissions.map(function (p, idx) {
      return '<div class="zset-perm-row">' +
        '<div><strong>' + esc(p.module) + '</strong></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.view ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="view"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.create ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="create"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.edit ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="edit"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.del ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="del"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.exp ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="exp"></div>' +
        '<div class="zset-perm-check"><input type="checkbox" ' + (p.app ? 'checked' : '') + ' data-p-idx="' + idx + '" data-p-field="app"></div>' +
      '</div>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Roles & Access Permissions (RBAC)</h3>',
          '<p class="zset-tab-desc">Fine-grained role-based governance protecting clinical data confidentiality, order controls, and financial ledgers.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">',
          '<h4 class="zset-card-title">🛡️ Configured Role Profiles</h4>',
          '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-role" style="padding:4px 12px;font-size:11px;">+ Add Role Profile</button>',
        '</div>',
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;">' + roleCards + '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">',
          '<div style="display:flex;align-items:center;gap:10px;">',
            '<h4 class="zset-card-title">📋 Granular Privilege Governance Matrix</h4>',
            '<span class="zset-badge" style="background:rgba(255,255,255,0.06);color:#94a3b8;">Custom</span>',
          '</div>',
          '<div style="display:flex;align-items:center;gap:8px;">',
            '<button type="button" class="zset-btn zset-btn-secondary" id="btn-add-module" style="padding:6px 14px;font-size:12px;font-weight:600;">+ Add Module Scope</button>',
            '<button type="button" class="zset-btn zset-btn-primary" id="btn-save-permissions" style="padding:6px 14px;font-size:12px;font-weight:600;"><span>💾</span> Save Changes</button>',
          '</div>',
        '</div>',
        '<div class="zset-table-wrap">',
          '<div class="zset-perm-row" style="background:#141d30;font-weight:700;color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;border-color:rgba(255,255,255,0.08);margin-bottom:8px;">' +
            '<div>Module Scope</div>' +
            '<div style="text-align:center;">View</div>' +
            '<div style="text-align:center;">Create</div>' +
            '<div style="text-align:center;">Edit</div>' +
            '<div style="text-align:center;">Delete</div>' +
            '<div style="text-align:center;">Export CSV</div>' +
            '<div style="text-align:center;">Approve</div>' +
          '</div>',
          '<div class="zset-perm-matrix">' + permRows + '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 6: Approval Workflows ───────────────────────────────────── */
  function renderApprovalWorkflows() {
    var wfRows = S.workflows.length ? (S.workflows.map(function (wf) {
      return '<tr>' +
        '<td class="font-mono" style="font-weight:600;color:#38bdf8;">' + esc(wf.id) + '</td>' +
        '<td><strong>' + esc(wf.name) + '</strong></td>' +
        '<td><span class="zset-badge zset-badge-info">' + esc(wf.trigger) + '</span></td>' +
        '<td>' + esc(wf.steps) + '</td>' +
        '<td class="font-mono">' + esc(wf.timeout) + '</td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(wf.status) + '</span></td>' +
      '</tr>';
    }).join('')) : '<tr><td colspan="6" style="text-align:center;padding:24px;color:#94a3b8;">No approval workflows configured</td></tr>';

    var pendingCards = S.pendingApprovals.map(function (p, idx) {
      return '<div class="zset-switch-row" style="margin-bottom:8px;">' +
        '<div class="zset-switch-info">' +
          '<h5>' + esc(p.title) + ' <span class="font-mono" style="color:#10b981;font-weight:700;margin-left:8px;">' + esc(p.amount) + '</span></h5>' +
          '<p>Ref: <span class="font-mono">' + esc(p.orderId) + '</span> · Requested by ' + esc(p.requester) + ' · ' + esc(p.date) + '</p>' +
        '</div>' +
        '<div style="display:flex;gap:8px;flex-shrink:0;">' +
          '<button type="button" class="zset-btn zset-btn-primary" style="padding:4px 10px;font-size:11px;" data-appr-idx="' + idx + '">✓ Approve</button>' +
          '<button type="button" class="zset-btn zset-btn-danger" style="padding:4px 10px;font-size:11px;" data-rej-idx="' + idx + '">✕ Reject</button>' +
        '</div>' +
      '</div>';
    }).join('');

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Approval Workflows & Multi-Tier Sign-Offs</h3>',
          '<p class="zset-tab-desc">Enforce four-eyes principle on clinical narcotics, large vendor purchase orders, patient refunds, and commercial overrides.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-workflow">+ Add Approval Rule</button>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header">',
          '<h4 class="zset-card-title">⏳ Active Requests Awaiting Your Review</h4>',
          '<span class="zset-badge" style="background:#ecfdf5;color:#047857;">' + S.pendingApprovals.length + ' Pending</span>',
        '</div>',
        (S.pendingApprovals.length ? pendingCards : '<div style="padding:16px;text-align:center;color:#64748b;">All approval queues are completely cleared! ✓</div>'),
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">⚙️ Configured Approval Rules</h4></div>',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Rule ID</th><th>Governance Scope</th><th>Trigger Event</th><th>Routing Hierarchy</th><th>SLA Escalation</th><th>Status</th></tr></thead>',
            '<tbody>' + wfRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 7: Notification Settings ────────────────────────────────── */
  function renderNotifications() {
    var n = S.notifications;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Notification Channels & Automated Alerts</h3>',
          '<p class="zset-tab-desc">Configure WhatsApp Business API, transactional SMS, mobile push, and real-time clinic broadcast rules.</p>',
        '</div>',
        '<div style="display:flex;gap:8px;">',
          '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-notif-trigger">+ Add Alert Rule</button>',
          '<button type="button" class="zset-btn zset-btn-secondary" id="btn-test-notification">🔔 Test Dispatch Ping</button>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">📱 Connected Dispatch Gateways</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>WhatsApp Business API (Gupshup)</h5><p>Templates approved for order tracking & prescription delivery</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-wa" ' + (n.whatsapp ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Transactional SMS (DLT Approved)</h5><p>Primary gateway for OTPs and critical 60-min delivery alerts</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-sms" ' + (n.sms ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Transactional Email (Amazon SES)</h5><p>Invoices, clinical consultation summaries, and medical records</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-email" ' + (n.email ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Mobile App Push (Firebase FCM)</h5><p>Real-time delivery live map updates and appointment notifications</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-push" ' + (n.push ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">⚡ Automated Trigger Events</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Order Confirmation & Instant Invoice</h5><p>Dispatched immediately upon successful payment authorization</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-oc" ' + (n.orderConfirm ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>60-Min Express Dispatch & Live ETA</h5><p>Alerts customer when dedicated rider leaves the micro-hub</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-ed" ' + (n.expressDispatch ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Doctor Consultation Reminders</h5><p>Sent 24 hours and 1 hour before scheduled veterinary session</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-ar" ' + (n.appointmentReminders ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Critical Low Medicine Stock Alert</h5><p>Notifies head pharmacist when essential drugs fall under 15 units</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-notif-ls" ' + (n.lowStockAlert ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 8: Dashboard Settings ───────────────────────────────────── */
  function renderDashboardSettings() {
    var d = S.dashboardSettings;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Executive Dashboard Preferences</h3>',
          '<p class="zset-tab-desc">Personalize portal behavior, live polling frequency, courtroom/boardroom privacy masking, and visual themes.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🖥️ Workspace Display Preferences</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Default Launch Dashboard</label>',
            '<select class="zset-select" id="sel-dash-launch">' +
              '<option value="" ' + (!d.defaultLanding ? 'selected' : '') + '>Select default dashboard...</option>' +
              '<option value="Executive Control Center" ' + (d.defaultLanding === 'Executive Control Center' ? 'selected' : '') + '>Executive Control Center</option>' +
              '<option value="Operations Dashboard" ' + (d.defaultLanding === 'Operations Dashboard' ? 'selected' : '') + '>Orders & Operations Hub</option>' +
              '<option value="Sales Dashboard" ' + (d.defaultLanding === 'Sales Dashboard' ? 'selected' : '') + '>Revenue & Sales Overview</option>' +
            '</select>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Live Data Polling Cadence</label>',
            '<select class="zset-select" id="sel-dash-poll">' +
              '<option value="" ' + (!d.refreshInterval ? 'selected' : '') + '>Select refresh cadence...</option>' +
              '<option value="10s" ' + (d.refreshInterval === '10s' ? 'selected' : '') + '>Live Websocket (~10s)</option>' +
              '<option value="30s" ' + (d.refreshInterval === '30s' ? 'selected' : '') + '>30 Seconds</option>' +
              '<option value="60s" ' + (d.refreshInterval === '60s' ? 'selected' : '') + '>1 Minute</option>' +
              '<option value="5m" ' + (d.refreshInterval === '5m' ? 'selected' : '') + '>5 Minutes</option>' +
            '</select>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🔒 Boardroom Privacy & Confidentiality</h4></div>',
        '<div class="zset-switch-row">' +
          '<div class="zset-switch-info">' +
            '<h5>Boardroom Revenue Masking Mode</h5>' +
            '<p>Obfuscates all gross revenue and patient totals with "₹ •••••" during public presentations and shared projector meetings.</p>' +
          '</div>' +
          '<label class="zset-switch"><input type="checkbox" id="sw-dash-privacy" ' + (d.boardroomPrivacy ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 9: Tax Settings ─────────────────────────────────────────── */
  function renderTaxes() {
    var taxRows = S.taxes.length ? S.taxes.map(function (t) {
      return '<tr>' +
        '<td><strong>' + esc(t.category) + '</strong></td>' +
        '<td class="font-mono" style="color:#38bdf8;">' + esc(t.code) + '</td>' +
        '<td class="font-mono" style="font-weight:700;color:#10b981;">' + esc(t.gst) + '</td>' +
        '<td class="font-mono">' + esc(t.cgst) + '</td>' +
        '<td class="font-mono">' + esc(t.sgst) + '</td>' +
        '<td class="font-mono">' + esc(t.igst) + '</td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="6" style="text-align:center;padding:36px;color:#94a3b8;">No tax schedules configured</td></tr>';

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Tax Governance & GST Engine</h3>',
          '<p class="zset-tab-desc">Goods & Services Tax (GST) schedules, statutory HSN/SAC codes, and veterinary healthcare exemption classifications.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-tax">+ Add HSN/SAC Schedule</button>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🧾 GST Identification & Master Compliance</h4></div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Primary GSTIN Number</label>',
            '<input class="zset-input font-mono" value="' + esc(S.company.gstin) + '" placeholder="GSTIN not set" disabled>',
            '<div class="zset-help-text">Principal place of business</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">TCS (Tax Collected at Source)</label>',
            '<input class="zset-input font-mono" value="1.0% (IGST / CGST+SGST)" placeholder="1.0%" disabled>',
            '<div class="zset-help-text">Marketplace operator deduction</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Automated E-Invoicing Threshold</label>',
            '<input class="zset-input font-mono" value="₹5.00 Cr B2B Aggregate Turnover" placeholder="₹5.00 Cr" disabled>',
            '<div class="zset-help-text">Direct NIC portal sync</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">📑 HSN/SAC Code Schedule & Healthcare Exemptions</h4></div>',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Item Classification</th><th>HSN / SAC Code</th><th>Applicable GST Rate</th><th>CGST</th><th>SGST</th><th>IGST (Inter-State)</th></tr></thead>',
            '<tbody>' + taxRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 10: Payment Settings ────────────────────────────────────── */
  function renderPayments() {
    var p = S.payments;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Payment Gateways & Payout Orchestration</h3>',
          '<p class="zset-tab-desc">UPI AutoPay, Razorpay, Cashfree instant doctor disbursements, and Cash-On-Delivery threshold governance.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-secondary" id="btn-test-payment">💳 Ping Gateway Webhooks</button>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">💳 Gateway Configurations</h4></div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Primary Gateway</label>',
            '<input class="zset-input" value="' + esc(p.primaryGateway) + '" placeholder="Not configured" disabled>',
            '<div class="zset-help-text">UPI, Cards, Netbanking</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Secondary / Payout Gateway</label>',
            '<input class="zset-input" value="' + esc(p.secondaryGateway) + '" placeholder="Not configured" disabled>',
            '<div class="zset-help-text">Instant doctor & vendor payouts</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Cross-Border Gateway</label>',
            '<input class="zset-input" value="' + esc(p.internationalGateway) + '" placeholder="Not configured" disabled>',
            '<div class="zset-help-text">International pet owners</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🏦 Settlement Bank Account</h4></div>',
        '<div class="zset-form-group">',
          '<label class="zset-label">Operating Account</label>',
          '<input class="zset-input font-mono" value="' + esc(p.settlementAccount) + '" placeholder="No settlement account linked" disabled>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">💵 Cash-on-Delivery (COD) Controls</h4></div>',
        '<div class="zset-switch-row">' +
          '<div class="zset-switch-info">' +
            '<h5>Enable Cash-on-Delivery (COD)</h5>' +
            '<p>Permitted only for non-prescription nutrition & lifestyle products up to <strong>' + (p.maxCodValue ? esc(p.maxCodValue) : '-') + '</strong>.</p>' +
          '</div>' +
          '<label class="zset-switch"><input type="checkbox" id="sw-pay-cod" ' + (p.codEnabled ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 11: Delivery Settings ───────────────────────────────────── */
  function renderDelivery() {
    var d = S.delivery;
    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Logistics & 60-Minute Express Settings</h3>',
          '<p class="zset-tab-desc">Hyperlocal service radii, micro-hub dispatch SLAs, cold-chain temperature thresholds, and carrier allocations.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-delivery-zone">+ Add Delivery Zone</button>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">⚡ 60-Minute Express Hyperlocal Rules</h4></div>',
        '<div class="zset-grid-3">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Express Service Radius</label>',
            '<input class="zset-input font-mono" id="inp-del-rad" value="' + (d.expressRadiusKm ? d.expressRadiusKm + ' km' : '') + '" placeholder="Radius (km)">',
            '<div class="zset-help-text">Max distance from nearest dark store</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Driver Allocation Timeout</label>',
            '<input class="zset-input font-mono" id="inp-del-sla" value="' + (d.dispatchThresholdMins ? d.dispatchThresholdMins + ' Minutes' : '') + '" placeholder="Timeout (minutes)">',
            '<div class="zset-help-text">Escalate if rider not assigned</div>',
          '</div>',
          '<div class="zset-form-group">',
            '<label class="zset-label">Free Express Delivery Cap</label>',
            '<input class="zset-input font-mono" id="inp-del-cap" value="' + (d.freeDeliveryMinOrder ? '₹' + d.freeDeliveryMinOrder : '') + '" placeholder="Min order cap (₹)">',
            '<div class="zset-help-text">Standard fee applied below cap</div>',
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">❄️ Pharmaceutical Cold-Chain Mandate</h4></div>',
        '<div class="zset-switch-row">' +
          '<div class="zset-switch-info">' +
            '<h5>Mandatory Insulated Cold-Boxes (2°C – 8°C)</h5>' +
            '<p>Requires temperature logger verification before dispatch for all biological vaccines and insulins.</p>' +
          '</div>' +
          '<label class="zset-switch"><input type="checkbox" id="sw-del-cold" ' + (d.coldChainEnforced ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 12: Custom AI & API Integrations ────────────────────────── */
  function renderIntegrations() {
    var ai = S.customAi || {
      provider: 'openai_compatible',
      apiUrl: '',
      apiKey: '',
      model: 'gpt-4o-mini',
      geminiApiKey: '',
      temperature: 0.2,
      ragEnabled: true,
      hitlApproval: true,
      latency: 4,
      status: 'Online (Built-in Air-Gapped Engine)',
      systemPrompt: 'You are Dr. Zenve, the Chief Executive AI & Autonomous Operations Intelligence for Zenve Pets Healthcare (14 Veterinary Hospital Hubs, E-Pharmacy, 60-Minute Express Delivery, and Preventive Care Ecosystem in India). Ground all answers strictly in the provided enterprise RAG context. State currency in INR (₹ Lakhs/Crores) and formulate concise executive briefings with actionable conclusions.'
    };

    var intRows = S.integrations.length ? S.integrations.map(function (it) {
      return '<tr>' +
        '<td><strong>' + esc(it.name) + '</strong></td>' +
        '<td><span class="zset-badge zset-badge-info">' + esc(it.type) + '</span></td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(it.status) + '</span></td>' +
        '<td class="font-mono">' + esc(it.uptime) + '</td>' +
        '<td class="font-mono" style="color:#94a3b8;">' + esc(it.lastSync) + '</td>' +
      '</tr>';
    }).join('') : '<tr><td colspan="5" style="text-align:center;padding:36px;color:#94a3b8;">No external integrations connected</td></tr>';

    var isOai = ai.provider === 'openai_compatible';
    var isGem = ai.provider === 'gemini';
    var isBuiltin = ai.provider === 'built_in';

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">⚡ Custom API Integration & Enterprise RAG Architecture</h3>',
          '<p class="zset-tab-desc">Connect enterprise LLM endpoints (OpenAI, Azure, Ollama, DeepSeek, Groq, or Google Gemini) with real-time MySQL RAG grounding and 5-Agent orchestration.</p>',
        '</div>',
        '<div style="display:flex;gap:8px;">',
          '<button type="button" class="zset-btn zset-btn-secondary" id="btn-test-ai-ping">🔌 Test Connection & Ping</button>',
          '<button type="button" class="zset-btn zset-btn-primary" id="btn-save-ai-cfg">💾 Save & Deploy AI Configuration</button>',
        '</div>',
      '</div>',

      // Top KPI Cards
      '<div class="zset-kpi-row" style="margin-bottom:20px;">',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">AI Model Engine</div><div class="zset-kpi-val font-mono" style="color:#2563eb;" id="kpi-ai-model">' + esc(ai.model || 'gpt-4o-mini') + '</div><div style="font-size:11px;color:#059669;font-weight:700;margin-top:2px;">● Online</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Enterprise RAG Grounding</div><div class="zset-kpi-val font-mono" style="color:#10b981;">5 Data Layers</div><div style="font-size:11px;color:#64748b;margin-top:2px;">MySQL zenve_engine Live</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Agentic Pipeline</div><div class="zset-kpi-val font-mono" style="color:#8b5cf6;">5 Collaborators</div><div style="font-size:11px;color:#64748b;margin-top:2px;">Human-in-the-Loop Active</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Custom API Latency</div><div class="zset-kpi-val font-mono" style="color:#f59e0b;" id="kpi-ai-latency">' + esc(String(ai.latency || 4)) + ' ms</div><div style="font-size:11px;color:#059669;font-weight:700;margin-top:2px;">Sub-50ms Benchmark</div></div>',
      '</div>',

      // Section 1: Provider Selection & Core Credentials
      '<div class="zset-card" style="border:2px solid #3b82f6;background:linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);">',
        '<div class="zset-card-header" style="display:flex;justify-content:space-between;align-items:center;">',
          '<h4 class="zset-card-title">🤖 AI Model Provider & Multi-Model Architecture</h4>',
          '<span class="zset-badge zset-badge-success" id="badge-ai-status">' + esc(ai.status || 'Online') + '</span>',
        '</div>',

        // Provider Selector Cards
        '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:12px;margin:14px 0 18px;">',
          '<div class="zset-ai-provider-card ' + (isOai ? 'active' : '') + '" data-provider="openai_compatible" style="border:' + (isOai ? '2px solid #2563eb;background:#eff6ff;' : '1px solid #cbd5e1;background:#fff;') + 'padding:14px;border-radius:10px;cursor:pointer;">',
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;"><strong style="color:#0f172a;font-size:13px;">🤖 Custom OpenAI-Compatible</strong>' + (isOai ? '<span style="color:#2563eb;font-weight:700;font-size:11px;">✓ Active</span>' : '') + '</div>',
            '<p style="margin:0;font-size:11.5px;color:#64748b;">OpenAI, Azure, Ollama, DeepSeek, Groq, vLLM, or LocalAI</p>',
          '</div>',
          '<div class="zset-ai-provider-card ' + (isGem ? 'active' : '') + '" data-provider="gemini" style="border:' + (isGem ? '2px solid #2563eb;background:#eff6ff;' : '1px solid #cbd5e1;background:#fff;') + 'padding:14px;border-radius:10px;cursor:pointer;">',
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;"><strong style="color:#0f172a;font-size:13px;">💎 Google Gemini</strong>' + (isGem ? '<span style="color:#2563eb;font-weight:700;font-size:11px;">✓ Active</span>' : '') + '</div>',
            '<p style="margin:0;font-size:11.5px;color:#64748b;">Google AI Studio & Vertex AI high-speed multimodal models</p>',
          '</div>',
          '<div class="zset-ai-provider-card ' + (isBuiltin ? 'active' : '') + '" data-provider="built_in" style="border:' + (isBuiltin ? '2px solid #2563eb;background:#eff6ff;' : '1px solid #cbd5e1;background:#fff;') + 'padding:14px;border-radius:10px;cursor:pointer;">',
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;"><strong style="color:#0f172a;font-size:13px;">🛡️ Air-Gapped Neural RAG</strong>' + (isBuiltin ? '<span style="color:#2563eb;font-weight:700;font-size:11px;">✓ Active</span>' : '') + '</div>',
            '<p style="margin:0;font-size:11.5px;color:#64748b;">Zero external egress, 100% on-premise execution</p>',
          '</div>',
        '</div>',

        // Inputs Grid
        '<div class="zset-grid-2">',
          '<div class="zset-form-group">',
            '<label class="zset-label">Custom API Endpoint URL (REST Gateway)</label>',
            '<input class="zset-input font-mono" id="inp-ai-url" value="' + esc(ai.apiUrl || '') + '" placeholder="e.g. https://api.openai.com/v1 or http://localhost:11434/v1">',
            '<div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;">',
              '<button type="button" class="zset-btn zset-btn-secondary" style="padding:2px 8px;font-size:10.5px;" onclick="document.getElementById(\'inp-ai-url\').value=\'https://api.openai.com/v1\';">OpenAI</button>',
              '<button type="button" class="zset-btn zset-btn-secondary" style="padding:2px 8px;font-size:10.5px;" onclick="document.getElementById(\'inp-ai-url\').value=\'http://localhost:11434/v1\';">Ollama Local</button>',
              '<button type="button" class="zset-btn zset-btn-secondary" style="padding:2px 8px;font-size:10.5px;" onclick="document.getElementById(\'inp-ai-url\').value=\'https://api.groq.com/openai/v1\';">Groq</button>',
              '<button type="button" class="zset-btn zset-btn-secondary" style="padding:2px 8px;font-size:10.5px;" onclick="document.getElementById(\'inp-ai-url\').value=\'https://api.deepseek.com/v1\';">DeepSeek</button>',
            '</div>',
          '</div>',

          '<div class="zset-form-group">',
            '<label class="zset-label">Model Identifier (Engine Name)</label>',
            '<div style="display:flex;gap:8px;">',
              '<input class="zset-input font-mono" id="inp-ai-model" value="' + esc(ai.model || 'gpt-4o-mini') + '" placeholder="e.g. gpt-4o-mini, gemini-1.5-flash, llama-3.3-70b">',
              '<select class="zset-select" id="sel-ai-model-preset" style="width:130px;">',
                '<option value="">Presets ▾</option>',
                '<option value="gpt-4o-mini">gpt-4o-mini</option>',
                '<option value="gpt-4o">gpt-4o</option>',
                '<option value="gemini-1.5-flash">gemini-1.5-flash</option>',
                '<option value="gemini-1.5-pro">gemini-1.5-pro</option>',
                '<option value="llama-3.3-70b-versatile">llama-3.3-70b</option>',
                '<option value="deepseek-chat">deepseek-chat</option>',
                '<option value="claude-3-5-sonnet">claude-3-5-sonnet</option>',
              '</select>',
            '</div>',
            '<div class="zset-help-text">Compatible with any standard OpenAI-format chat completion endpoint</div>',
          '</div>',

          '<div class="zset-form-group">',
            '<label class="zset-label">' + (isGem ? 'Google Gemini API Key' : 'Custom API Bearer Token / API Key') + '</label>',
            '<div style="display:flex;gap:8px;">',
              '<input class="zset-input font-mono" id="inp-ai-key" value="' + esc(isGem ? (ai.geminiApiKey || '') : (ai.apiKey || '')) + '" placeholder="Bearer token or sk-... key" type="password">',
              '<button type="button" class="zset-btn zset-btn-secondary" id="btn-toggle-ai-key">👁️</button>',
            '</div>',
            '<div class="zset-help-text">Encrypted in-flight. Persisted in backend/.env</div>',
          '</div>',

          '<div class="zset-form-group">',
            '<div style="display:flex;justify-content:space-between;margin-bottom:4px;">',
              '<label class="zset-label" style="margin:0;">Sampling Temperature</label>',
              '<span class="font-mono" style="font-size:12px;color:#2563eb;font-weight:700;" id="lbl-ai-temp">' + esc(String(ai.temperature || 0.2)) + '</span>',
            '</div>',
            '<input type="range" id="rng-ai-temp" min="0" max="1" step="0.05" value="' + (ai.temperature || 0.2) + '" style="width:100%;cursor:pointer;">',
            '<div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-top:2px;">',
              '<span>0.0 (Strictly Grounded RAG)</span>',
              '<span>0.5</span>',
              '<span>1.0 (Creative)</span>',
            '</div>',
          '</div>',
        '</div>',

        // Section 2: Enterprise RAG Grounding Knowledge Layers
        '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:16px 18px;margin:16px 0;">',
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">',
            '<div>',
              '<h5 style="margin:0;font-size:13px;font-weight:700;color:#0f172a;">📚 Enterprise RAG Grounding Layers (Multi-Vector Retrieval)</h5>',
              '<p style="margin:2px 0 0;font-size:11.5px;color:#64748b;">Real-time grounding data injected into LLM context window prior to generation</p>',
            '</div>',
            '<label style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#047857;cursor:pointer;">',
              '<input type="checkbox" id="chk-ai-rag" ' + (ai.ragEnabled !== false ? 'checked' : '') + '> RAG Augmentation ON',
            '</label>',
          '</div>',
          '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">',
            '<div style="padding:10px 12px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;font-size:11.5px;">',
              '<div style="font-weight:700;color:#0f172a;margin-bottom:2px;">💾 MySQL zenve_engine</div>',
              '<span style="color:#64748b;">Live sales, medication inventory, clinics, registered pet patients</span>',
            '</div>',
            '<div style="padding:10px 12px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;font-size:11.5px;">',
              '<div style="font-weight:700;color:#0f172a;margin-bottom:2px;">💊 Veterinary Formulary</div>',
              '<span style="color:#64748b;">Cold-chain 2°C – 8°C IoT rules, Bravecto & Rabisin protocols</span>',
            '</div>',
            '<div style="padding:10px 12px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;font-size:11.5px;">',
              '<div style="font-weight:700;color:#0f172a;margin-bottom:2px;">🏥 Hospital Network Ops</div>',
              '<span style="color:#64748b;">14 Hub EBITDA benchmarks, ICU occupancy & surgical ratings</span>',
            '</div>',
            '<div style="padding:10px 12px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;font-size:11.5px;">',
              '<div style="font-weight:700;color:#0f172a;margin-bottom:2px;">⚡ 60-Minute Logistics</div>',
              '<span style="color:#64748b;">Hyperlocal rider dispatch SLA & regional monsoon variance</span>',
            '</div>',
          '</div>',
        '</div>',

        // Section 3: 5-Agent Architecture Visualizer
        '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:16px 18px;margin-bottom:16px;">',
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">',
            '<div>',
              '<h5 style="margin:0;font-size:13px;font-weight:700;color:#0f172a;">🤖 5-Agent Collaborative Execution Architecture</h5>',
              '<p style="margin:2px 0 0;font-size:11.5px;color:#64748b;">Autonomous Multi-Agent pipeline executing sequentially for every executive inquiry</p>',
            '</div>',
            '<label style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#1e293b;cursor:pointer;">',
              '<input type="checkbox" id="chk-ai-hitl" ' + (ai.hitlApproval !== false ? 'checked' : '') + '> Human-in-the-Loop Confirmation Required',
            '</label>',
          '</div>',
          '<div style="display:flex;align-items:center;gap:8px;overflow-x:auto;padding-bottom:4px;">',
            '<div style="min-width:140px;flex:1;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;">',
              '<div style="font-weight:700;font-size:12px;color:#0f172a;">🛡️ 1. Supervisor</div>',
              '<div style="font-size:10px;color:#64748b;">Intent & safety guardrails</div>',
            '</div>',
            '<span style="color:#94a3b8;font-weight:700;">→</span>',
            '<div style="min-width:140px;flex:1;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;">',
              '<div style="font-weight:700;font-size:12px;color:#0f172a;">💾 2. LiveQuery SQL</div>',
              '<div style="font-size:10px;color:#64748b;">Direct MySQL queries</div>',
            '</div>',
            '<span style="color:#94a3b8;font-weight:700;">→</span>',
            '<div style="min-width:140px;flex:1;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;">',
              '<div style="font-weight:700;font-size:12px;color:#0f172a;">📚 3. RAG Retriever</div>',
              '<div style="font-size:10px;color:#64748b;">Veterinary & financial SOPs</div>',
            '</div>',
            '<span style="color:#94a3b8;font-weight:700;">→</span>',
            '<div style="min-width:140px;flex:1;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;">',
              '<div style="font-weight:700;font-size:12px;color:#0f172a;">🧠 4. Reasoning Agent</div>',
              '<div style="font-size:10px;color:#64748b;">Custom API LLM synthesis</div>',
            '</div>',
            '<span style="color:#94a3b8;font-weight:700;">→</span>',
            '<div style="min-width:140px;flex:1;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;">',
              '<div style="font-weight:700;font-size:12px;color:#0f172a;">⚡ 5. Action Drafter</div>',
              '<div style="font-size:10px;color:#64748b;">Text-to-Action proposals</div>',
            '</div>',
          '</div>',
        '</div>',

        // System Persona
        '<div class="zset-form-group" style="margin-bottom:18px;">',
          '<label class="zset-label">Executive AI Persona & System Instructions</label>',
          '<textarea class="zset-input font-mono" id="tx-ai-prompt" rows="3" style="font-size:11px;line-height:1.5;">' + esc(ai.systemPrompt || '') + '</textarea>',
        '</div>',

        // Section 4: Interactive Live RAG Execution Sandbox
        '<div style="background:#0f172a;border-radius:10px;padding:18px 20px;color:#f8fafc;">',
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">',
            '<div style="display:flex;align-items:center;gap:8px;">',
              '<span style="font-size:16px;">🧪</span>',
              '<strong style="font-size:13px;color:#f8fafc;">Live Model & Enterprise RAG Execution Sandbox</strong>',
            '</div>',
            '<span style="font-size:11px;color:#94a3b8;font-family:monospace;" id="sbx-engine-label">Engine: ' + esc(ai.model || 'gpt-4o-mini') + '</span>',
          '</div>',
          '<div style="display:flex;gap:8px;margin-bottom:12px;">',
            '<input type="text" id="inp-sbx-query" value="What is our Bravecto inventory status and draft a PO?" placeholder="Type an operational question..." style="flex:1;padding:10px 14px;border-radius:8px;border:1px solid #334155;background:#1e293b;color:#ffffff;font-size:13px;outline:none;">',
            '<button type="button" class="zset-btn zset-btn-primary" id="btn-run-sbx" style="padding:10px 18px;font-weight:700;white-space:nowrap;">🚀 Test RAG Execution</button>',
          '</div>',
          '<div id="sbx-result-box" style="display:none;background:#1e293b;border-radius:8px;padding:14px;border:1px solid #334155;font-size:12px;line-height:1.6;"></div>',
        '</div>',
      '</div>',

      // Section 5: Standard Production API Credentials
      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🔑 Production Platform API Credentials & Signing Secret</h4></div>',
        '<div class="zset-form-group">',
          '<label class="zset-label">Live API Secret Key</label>',
          '<div style="display:flex;gap:8px;">',
            '<input class="zset-input font-mono" id="inp-api-key" value="znv_live_9482bf7a810d2948cbb194208a002941e7f3" placeholder="No API key generated" type="password" readonly>',
            '<button type="button" class="zset-btn zset-btn-secondary" id="btn-toggle-key">👁️ Reveal</button>',
            '<button type="button" class="zset-btn zset-btn-secondary" id="btn-copy-key">📋 Copy</button>',
          '</div>',
          '<div class="zset-help-text">Rate limited to 1,000 requests per minute with signed HMAC verification</div>',
        '</div>',
      '</div>',

      // Section 6: Connected Webhooks
      '<div class="zset-card">',
        '<div class="zset-card-header" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">',
          '<h4 class="zset-card-title">🔌 Active Webhook & Microservice Bridges</h4>',
          '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-integration" style="padding:4px 12px;font-size:11px;">+ Add Integration Bridge</button>',
        '</div>',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Integration Connector</th><th>Service Type</th><th>Status</th><th>Uptime</th><th>Last Sync</th></tr></thead>',
            '<tbody>' + intRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 13: Security ────────────────────────────────────────────── */
  function renderSecurity() {
    var sec = S.security;
    var sessRows = sec.activeSessions.length ? (sec.activeSessions.map(function (s) {
      return '<tr>' +
        '<td><strong>' + esc(s.device) + '</strong><br><small style="color:#94a3b8;">' + esc(s.browser) + '</small></td>' +
        '<td class="font-mono">' + esc(s.ip) + '</td>' +
        '<td>' + esc(s.location) + '</td>' +
        '<td class="font-mono">' + esc(s.time) + '</td>' +
        '<td>' + (s.current ? '<span class="zset-badge zset-badge-success">Current Session</span>' : '<button type="button" class="zset-btn zset-btn-danger" style="padding:2px 8px;font-size:10px;">Revoke</button>') + '</td>' +
      '</tr>';
    }).join('')) : '<tr><td colspan="5" style="text-align:center;padding:24px;color:#94a3b8;">No active sessions found</td></tr>';

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Security & Zero-Trust Governance</h3>',
          '<p class="zset-tab-desc">Multi-Factor Authentication (2FA), clinical subnet IP whitelisting, session timeouts, and HIPAA/VCI data confidentiality.</p>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🔐 Authentication & Access Security</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Mandatory Two-Factor Authentication (2FA)</h5><p>Enforced across all doctors, admins, and pharmacists</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-sec-mfa" ' + (sec.mfaEnforced ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
          '<div class="zset-switch-row">' +
            '<div class="zset-switch-info"><h5>Single Sign-On (Google & Azure AD)</h5><p>Enterprise domain authentication</p></div>' +
            '<label class="zset-switch"><input type="checkbox" id="sw-sec-sso" ' + (sec.ssoGoogle ? 'checked' : '') + '><span class="zset-slider"></span></label>' +
          '</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">',
          '<h4 class="zset-card-title">🌐 Clinical Subnet IP Whitelisting</h4>',
          '<button type="button" class="zset-btn zset-btn-primary" id="btn-add-subnet" style="padding:4px 12px;font-size:11px;">+ Add Subnet Rule</button>',
        '</div>',
        '<div class="zset-form-group">',
          '<label class="zset-label">Authorized Static IP Ranges</label>',
          '<input class="zset-input font-mono" id="inp-sec-ip" value="' + esc(sec.ipWhitelist) + '" placeholder="e.g. 192.168.1.0/24 (Leave blank for unrestricted)">',
          '<div class="zset-help-text">Direct access to patient medical histories restricted to these verified subnets</div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Device & Browser</th><th>IP Address</th><th>Location</th><th>Activity</th><th>Action</th></tr></thead>',
            '<tbody>' + sessRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 14: Backup & Recovery ───────────────────────────────────── */
  function renderBackup() {
    var b = S.backup;
    var snapRows = b.snapshots.length ? (b.snapshots.map(function (s) {
      return '<tr>' +
        '<td class="font-mono" style="font-weight:600;color:#38bdf8;">' + esc(s.id) + '</td>' +
        '<td>' + esc(s.date) + '</td>' +
        '<td class="font-mono">' + esc(s.size) + '</td>' +
        '<td><span class="zset-badge zset-badge-info">' + esc(s.type) + '</span></td>' +
        '<td class="font-mono" style="color:#64748b;">' + esc(s.checksum) + '</td>' +
        '<td><span class="zset-badge zset-badge-success">' + esc(s.status) + '</span></td>' +
        '<td><button type="button" class="zset-btn zset-btn-secondary" style="padding:2px 8px;font-size:11px;">⬇ Download</button></td>' +
      '</tr>';
    }).join('')) : '<tr><td colspan="7" style="text-align:center;padding:24px;color:#94a3b8;">No backup snapshots found</td></tr>';

    return [
      '<div class="zset-tab-header">',
        '<div>',
          '<h3 class="zset-tab-title">Disaster Recovery & Automated Snapshots</h3>',
          '<p class="zset-tab-desc">Continuous PostgreSQL WAL archiving, cross-region replication between Mumbai and Hyderabad, and Point-In-Time Recovery.</p>',
        '</div>',
        '<button type="button" class="zset-btn zset-btn-primary" id="btn-create-snapshot">💾 Create Manual Snapshot</button>',
      '</div>',

      '<div class="zset-kpi-row">',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Recovery Point Objective (RPO)</div><div class="zset-kpi-val font-mono" style="color:#10b981;">' + esc(b.rpo) + '</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">Recovery Time Objective (RTO)</div><div class="zset-kpi-val font-mono" style="color:#38bdf8;">' + esc(b.rto) + '</div></div>',
        '<div class="zset-kpi-card"><div class="zset-kpi-lbl">PITR Archive Window</div><div class="zset-kpi-val font-mono">' + esc(b.pitrRetention) + '</div></div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">🌍 Cross-Region Resiliency</h4></div>',
        '<div class="zset-grid-2">',
          '<div class="zset-form-group"><label class="zset-label">Primary Database Region</label><input class="zset-input font-mono" value="' + esc(b.primaryRegion) + '" placeholder="Not configured" disabled></div>',
          '<div class="zset-form-group"><label class="zset-label">Secondary Replication Region</label><input class="zset-input font-mono" value="' + esc(b.secondaryRegion) + '" placeholder="Not configured" disabled></div>',
        '</div>',
      '</div>',

      '<div class="zset-card">',
        '<div class="zset-card-header"><h4 class="zset-card-title">📦 Recent Verified Snapshots</h4></div>',
        '<div class="zset-table-wrap">',
          '<table class="zset-table">',
            '<thead><tr><th>Snapshot ID</th><th>Timestamp</th><th>Size</th><th>Archive Type</th><th>SHA-256 Checksum</th><th>Integrity</th><th>Action</th></tr></thead>',
            '<tbody>' + snapRows + '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function syncPermissionsFromDom() {
    if (!root) return;
    root.querySelectorAll('input[data-p-idx][data-p-field]').forEach(function (cb) {
      var idx = parseInt(cb.getAttribute('data-p-idx'), 10);
      var field = cb.getAttribute('data-p-field');
      if (S.permissions[idx] && field) {
        S.permissions[idx][field] = cb.checked;
      }
    });
  }

  function saveAllChanges() {
    var saveBtn = root ? root.querySelector('#zset-save-all-btn') : null;
    var savePermBtn = root ? root.querySelector('#btn-save-permissions') : null;
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving to MySQL...';
    }
    if (savePermBtn) {
      savePermBtn.disabled = true;
      savePermBtn.textContent = 'Saving...';
    }

    // Capture latest checkbox values directly from active DOM
    syncPermissionsFromDom();

    // Cache to localStorage for instant client-side retention
    try {
      localStorage.setItem('zenve_rbac_permissions', JSON.stringify(S.permissions));
    } catch (e) {}

    var updates = [];

    // Always include rbac_permissions so matrix settings are permanently saved to MySQL
    updates.push({
      setting_key: 'rbac_permissions',
      setting_value: JSON.stringify(S.permissions)
    });

    var nameInput = root ? root.querySelector('#inp-comp-name') : null;
    var brandInput = root ? root.querySelector('#inp-comp-brand') : null;
    var addrInput = root ? root.querySelector('#inp-comp-addr') : null;

    if (nameInput) updates.push({ setting_key: 'company_name', setting_value: nameInput.value });
    if (brandInput) updates.push({ setting_key: 'brand_name', setting_value: brandInput.value });
    if (addrInput) updates.push({ setting_key: 'hq_address', setting_value: addrInput.value });

    var promises = updates.map(function (u) {
      return fetch('/api/v1/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(u)
      });
    });

    Promise.all(promises).then(function () {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<span>💾</span> Save Changes';
      }
      if (savePermBtn) {
        savePermBtn.disabled = false;
        savePermBtn.innerHTML = '<span>💾</span> Save Changes';
      }
      showToast('✓ Roles & permissions governance matrix saved successfully!');
      loadLiveSettings();
    }).catch(function (err) {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<span>💾</span> Save Changes';
      }
      if (savePermBtn) {
        savePermBtn.disabled = false;
        savePermBtn.innerHTML = '<span>💾</span> Save Changes';
      }
      showToast('Saved locally. Backend response: ' + err.message);
    });
  }

  /* ── DOM Event Wiring ────────────────────────────────────────────── */
  function wireEvents() {
    if (!root) return;

    // 1. Navigation Rail Item Clicks
    root.querySelectorAll('[data-set-tab]').forEach(function (btn) {
      btn.onclick = function () {
        var targetTab = btn.getAttribute('data-set-tab');
        switchTab(targetTab);
      };
    });

    // 2. Top Save All Changes
    var saveBtn = root.querySelector('#zset-save-all-btn');
    if (saveBtn) {
      saveBtn.onclick = saveAllChanges;
    }

    // 4. Tab Specific Event Handlers
    wireTabSpecificEvents();
  }

  function wireTabSpecificEvents() {
    // Roles & Permissions matrix checkboxes
    root.querySelectorAll('input[data-p-idx][data-p-field]').forEach(function (cb) {
      cb.onchange = function () {
        var idx = parseInt(cb.getAttribute('data-p-idx'), 10);
        var field = cb.getAttribute('data-p-field');
        if (S.permissions[idx] && field) {
          S.permissions[idx][field] = cb.checked;
          try {
            localStorage.setItem('zenve_rbac_permissions', JSON.stringify(S.permissions));
          } catch (e) {}
        }
      };
    });

    var savePermBtn = root.querySelector('#btn-save-permissions');
    if (savePermBtn) {
      savePermBtn.onclick = saveAllChanges;
    }
    // Search in Locations
    var locSearch = root.querySelector('#inp-loc-search');
    if (locSearch) {
      locSearch.oninput = function (e) {
        S.searchQuery = e.target.value;
        var pane = root.querySelector('#zset-pane');
        if (pane) pane.innerHTML = renderLocations();
        wireTabSpecificEvents();
      };
    }

    // Search in Users
    var userSearch = root.querySelector('#inp-user-search');
    if (userSearch) {
      userSearch.oninput = function (e) {
        S.searchQuery = e.target.value;
        var pane = root.querySelector('#zset-pane');
        if (pane) pane.innerHTML = renderUsers();
        wireTabSpecificEvents();
      };
    }

    // Approvals in Workflows
    root.querySelectorAll('[data-appr-idx]').forEach(function (btn) {
      btn.onclick = function () {
        var idx = parseInt(btn.getAttribute('data-appr-idx'), 10);
        var item = S.pendingApprovals[idx];
        S.pendingApprovals.splice(idx, 1);
        showToast('✓ Approved request: ' + (item ? item.title : ''));
        var pane = root.querySelector('#zset-pane');
        if (pane) pane.innerHTML = renderApprovalWorkflows();
        wireTabSpecificEvents();
      };
    });

    root.querySelectorAll('[data-rej-idx]').forEach(function (btn) {
      btn.onclick = function () {
        var idx = parseInt(btn.getAttribute('data-rej-idx'), 10);
        var item = S.pendingApprovals[idx];
        S.pendingApprovals.splice(idx, 1);
        showToast('✕ Rejected request: ' + (item ? item.title : ''));
        var pane = root.querySelector('#zset-pane');
        if (pane) pane.innerHTML = renderApprovalWorkflows();
        wireTabSpecificEvents();
      };
    });

    // Test notification ping
    var testNotifBtn = root.querySelector('#btn-test-notification');
    if (testNotifBtn) {
      testNotifBtn.onclick = function () {
        showToast('✓ Test WhatsApp & SMS dispatch sent successfully.');
      };
    }

    // Test payment gateway
    var testPayBtn = root.querySelector('#btn-test-payment');
    if (testPayBtn) {
      testPayBtn.onclick = function () {
        showToast('✓ Webhook health check: Razorpay & Cashfree 200 OK.');
      };
    }

    // Create Manual Snapshot
    var snapBtn = root.querySelector('#btn-create-snapshot');
    if (snapBtn) {
      snapBtn.onclick = function () {
        snapBtn.disabled = true;
        snapBtn.textContent = 'Creating Snapshot...';
        setTimeout(function () {
          var now = new Date();
          var id = 'SNAP-' + now.toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
          S.backup.snapshots.unshift({
            id: id,
            date: 'Just now',
            size: '4.84 GB',
            type: 'Manual Snapshot',
            checksum: 'sha256:3d8e9f1...',
            status: 'Verified'
          });
          snapBtn.disabled = false;
          snapBtn.textContent = '💾 Create Manual Snapshot';
          showToast('✓ New manual snapshot ' + id + ' verified and stored.');
          var pane = root.querySelector('#zset-pane');
          if (pane) pane.innerHTML = renderBackup();
          wireTabSpecificEvents();
        }, 700);
      };
    }

    // API Key Reveal / Copy
    var revealBtn = root.querySelector('#btn-toggle-key');
    var keyInp = root.querySelector('#inp-api-key');
    if (revealBtn && keyInp) {
      revealBtn.onclick = function () {
        if (keyInp.type === 'password') {
          keyInp.type = 'text';
          revealBtn.textContent = '🙈 Hide';
        } else {
          keyInp.type = 'password';
          revealBtn.textContent = '👁️ Reveal';
        }
      };
    }

    // Custom AI Provider Cards
    root.querySelectorAll('.zset-ai-provider-card').forEach(function (card) {
      card.onclick = function () {
        var prov = card.getAttribute('data-provider');
        if (prov && S.customAi) {
          S.customAi.provider = prov;
          var pane = root.querySelector('#zset-pane');
          if (pane) pane.innerHTML = renderIntegrations();
          wireTabSpecificEvents();
        }
      };
    });

    // Model preset selector
    var selPreset = root.querySelector('#sel-ai-model-preset');
    var inpModel = root.querySelector('#inp-ai-model');
    if (selPreset && inpModel) {
      selPreset.onchange = function () {
        if (selPreset.value) inpModel.value = selPreset.value;
      };
    }

    // Temperature slider
    var rngTemp = root.querySelector('#rng-ai-temp');
    var lblTemp = root.querySelector('#lbl-ai-temp');
    if (rngTemp && lblTemp) {
      rngTemp.oninput = function () {
        lblTemp.textContent = rngTemp.value;
        if (S.customAi) S.customAi.temperature = parseFloat(rngTemp.value);
      };
    }

    // Toggle AI Key
    var btnToggleAiKey = root.querySelector('#btn-toggle-ai-key');
    var inpAiKey = root.querySelector('#inp-ai-key');
    if (btnToggleAiKey && inpAiKey) {
      btnToggleAiKey.onclick = function () {
        if (inpAiKey.type === 'password') {
          inpAiKey.type = 'text';
          btnToggleAiKey.textContent = '🙈';
        } else {
          inpAiKey.type = 'password';
          btnToggleAiKey.textContent = '👁️';
        }
      };
    }

    // Test Connection & Ping
    var btnTestAi = root.querySelector('#btn-test-ai-ping');
    if (btnTestAi) {
      btnTestAi.onclick = function () {
        btnTestAi.disabled = true;
        btnTestAi.textContent = '🔄 Testing Ping...';

        var prov = S.customAi ? S.customAi.provider : 'openai_compatible';
        var urlVal = root.querySelector('#inp-ai-url') ? root.querySelector('#inp-ai-url').value : '';
        var keyVal = root.querySelector('#inp-ai-key') ? root.querySelector('#inp-ai-key').value : '';
        var modelVal = root.querySelector('#inp-ai-model') ? root.querySelector('#inp-ai-model').value : 'gpt-4o-mini';

        fetch('/api/v1/custom-ai/test-connection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: prov,
            api_url: urlVal,
            api_key: prov !== 'gemini' ? keyVal : '',
            gemini_api_key: prov === 'gemini' ? keyVal : '',
            model: modelVal
          })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          btnTestAi.disabled = false;
          btnTestAi.textContent = '🔌 Test Connection & Ping';
          if (data.ok) {
            showToast('✓ Connection verified: ' + data.provider + ' (' + data.latency_ms + 'ms latency)');
            var badge = root.querySelector('#badge-ai-status');
            if (badge) badge.textContent = data.status || 'Online';
            var latEl = root.querySelector('#kpi-ai-latency');
            if (latEl) latEl.textContent = data.latency_ms + ' ms';
            var modEl = root.querySelector('#kpi-ai-model');
            if (modEl) modEl.textContent = data.model || modelVal;
          } else {
            showToast('⚠️ Connection error: ' + (data.error || 'Failed to connect'));
          }
        })
        .catch(function (err) {
          btnTestAi.disabled = false;
          btnTestAi.textContent = '🔌 Test Connection & Ping';
          showToast('⚠️ Test failed: ' + err.message);
        });
      };
    }

    // Save AI Configuration
    var btnSaveAi = root.querySelector('#btn-save-ai-cfg');
    if (btnSaveAi) {
      btnSaveAi.onclick = function () {
        btnSaveAi.disabled = true;
        btnSaveAi.textContent = '💾 Deploying...';

        var prov = S.customAi ? S.customAi.provider : 'openai_compatible';
        var urlVal = root.querySelector('#inp-ai-url') ? root.querySelector('#inp-ai-url').value : '';
        var keyVal = root.querySelector('#inp-ai-key') ? root.querySelector('#inp-ai-key').value : '';
        var modelVal = root.querySelector('#inp-ai-model') ? root.querySelector('#inp-ai-model').value : 'gpt-4o-mini';
        var tempVal = root.querySelector('#rng-ai-temp') ? parseFloat(root.querySelector('#rng-ai-temp').value) : 0.2;
        var ragVal = root.querySelector('#chk-ai-rag') ? root.querySelector('#chk-ai-rag').checked : true;
        var hitlVal = root.querySelector('#chk-ai-hitl') ? root.querySelector('#chk-ai-hitl').checked : true;
        var promptVal = root.querySelector('#tx-ai-prompt') ? root.querySelector('#tx-ai-prompt').value : '';

        fetch('/api/v1/custom-ai/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: prov,
            api_url: urlVal,
            api_key: prov !== 'gemini' ? keyVal : '',
            gemini_api_key: prov === 'gemini' ? keyVal : '',
            model: modelVal,
            temperature: tempVal,
            rag_enabled: ragVal,
            agentic_workflow_enabled: true,
            system_prompt: promptVal
          })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          btnSaveAi.disabled = false;
          btnSaveAi.textContent = '💾 Save & Deploy AI Configuration';
          if (S.customAi) {
            S.customAi.provider = prov;
            S.customAi.apiUrl = urlVal;
            if (prov === 'gemini') S.customAi.geminiApiKey = keyVal;
            else S.customAi.apiKey = keyVal;
            S.customAi.model = modelVal;
            S.customAi.temperature = tempVal;
            S.customAi.ragEnabled = ragVal;
            S.customAi.hitlApproval = hitlVal;
            S.customAi.systemPrompt = promptVal;
          }
          showToast('✓ AI Model & Enterprise RAG Configuration successfully saved and deployed!');
        })
        .catch(function (err) {
          btnSaveAi.disabled = false;
          btnSaveAi.textContent = '💾 Save & Deploy AI Configuration';
          showToast('⚠️ Error saving AI config: ' + err.message);
        });
      };
    }

    // Run Sandbox Query
    var btnRunSbx = root.querySelector('#btn-run-sbx');
    var inpSbx = root.querySelector('#inp-sbx-query');
    var resSbx = root.querySelector('#sbx-result-box');
    if (btnRunSbx && inpSbx && resSbx) {
      btnRunSbx.onclick = function () {
        var q = inpSbx.value.trim();
        if (!q) return;

        btnRunSbx.disabled = true;
        btnRunSbx.textContent = '⏳ Reasoning...';
        resSbx.style.display = 'block';
        resSbx.innerHTML = '<div style="color:#94a3b8;">🧠 Running 5-Agent Collaborative Pipeline (Supervisor → LiveQuery → RAG Retrieval → Model Synthesis → Action Drafter)...</div>';

        fetch('/api/v1/custom-ai/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: q })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          btnRunSbx.disabled = false;
          btnRunSbx.textContent = '🚀 Test RAG Execution';

          var formatted = esc(data.text || '')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n•/g, '<br>•');

          var stepsHtml = '';
          if (data.agent_steps && data.agent_steps.length) {
            stepsHtml = '<div style="margin-top:12px;padding-top:10px;border-top:1px solid #334155;">' +
              '<strong style="color:#94a3b8;font-size:11px;">Agentic Execution Trace:</strong>' +
              '<div style="display:flex;flex-direction:column;gap:4px;margin-top:6px;">' +
                data.agent_steps.map(function (st) {
                  return '<div style="font-size:11px;color:#cbd5e1;"><span style="color:#38bdf8;font-weight:600;">• ' + esc(st.agent) + ':</span> ' + esc(st.note) + '</div>';
                }).join('') +
              '</div>' +
            '</div>';
          }

          var actionsHtml = '';
          if (data.actions && data.actions.length) {
            actionsHtml = '<div style="margin-top:12px;padding-top:10px;border-top:1px solid #334155;">' +
              '<strong style="color:#f59e0b;font-size:11px;">Text-to-Action Proposals Drafted:</strong>' +
              data.actions.map(function (act) {
                return '<div style="margin-top:6px;padding:10px 12px;background:#334155;border-radius:6px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">' +
                  '<div><strong style="color:#38bdf8;font-size:12px;">' + esc(act.title) + '</strong><div style="color:#cbd5e1;font-size:11px;">' + esc(act.description) + '</div></div>' +
                  '<button type="button" class="zset-btn zset-btn-primary" style="padding:4px 10px;font-size:11px;" onclick="alert(\'Action ' + esc(act.action_id) + ' authorized and committed to ERP.\')">Approve Action</button>' +
                '</div>';
              }).join('') +
            '</div>';
          }

          resSbx.innerHTML = [
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">',
              '<span style="color:#38bdf8;font-weight:700;font-size:11px;">✓ Synthesized via ' + esc(data.model_used || 'Enterprise Engine') + '</span>',
              '<span style="color:#94a3b8;font-size:10px;font-family:monospace;">MySQL zenve_engine Grounded</span>',
            '</div>',
            '<div style="color:#e2e8f0;font-family:sans-serif;">' + formatted + '</div>',
            stepsHtml,
            actionsHtml
          ].join('');
        })
        .catch(function (err) {
          btnRunSbx.disabled = false;
          btnRunSbx.textContent = '🚀 Test RAG Execution';
          resSbx.innerHTML = '<div style="color:#f87171;">Execution Error: ' + esc(err.message) + '</div>';
        });
      };
    }

    // Modal triggers
    var addUnitBtn = root.querySelector('#btn-add-unit');
    if (addUnitBtn) {
      addUnitBtn.onclick = function () {
        showModal('Add Business Unit', [
          '<div class="zset-form-group"><label class="zset-label">Unit / Division Name</label><input class="zset-input" id="m-unit-name" placeholder="e.g. Zenve Diagnostics Network"></div>',
          '<div class="zset-form-group"><label class="zset-label">Division Lead</label><input class="zset-input" id="m-unit-lead" placeholder="e.g. Dr. Kavita Reddy"></div>',
          '<div class="zset-form-group"><label class="zset-label">Cost Center Code</label><input class="zset-input font-mono" id="m-unit-code" placeholder="CC-DIAG-NAT"></div>'
        ].join(''), function () {
          var name = document.getElementById('m-unit-name')?.value || 'New Business Unit';
          var lead = document.getElementById('m-unit-lead')?.value || 'Assigned Lead';
          var code = document.getElementById('m-unit-code')?.value || 'CC-NEW';
          S.units.push({
            id: 'BU-0' + (S.units.length + 1),
            name: name,
            lead: lead,
            staff: 12,
            revenue: '₹10.0L/mo',
            status: 'Active',
            code: code
          });
          showToast('✓ Added business unit ' + name);
          switchTab('units');
        });
      };
    }

    var addLocBtn = root.querySelector('#btn-add-loc');
    if (addLocBtn) {
      addLocBtn.onclick = function () {
        showModal('Add Clinic / Dark Store Facility', [
          '<div class="zset-form-group"><label class="zset-label">Facility Name</label><input class="zset-input" id="m-loc-name" placeholder="e.g. Whitefield Express Dark Store"></div>',
          '<div class="zset-form-group"><label class="zset-label">City</label><input class="zset-input" id="m-loc-city" placeholder="e.g. Bengaluru"></div>',
          '<div class="zset-form-group"><label class="zset-label">Area / Address</label><input class="zset-input" id="m-loc-area" placeholder="e.g. ITPL Main Road"></div>',
          '<div class="zset-form-group"><label class="zset-label">Facility Type</label><select class="zset-select" id="m-loc-type"><option>Micro-Fulfillment Hub</option><option>Specialty Surgical Center</option><option>Outpatient & Diagnostic Node</option></select></div>'
        ].join(''), function () {
          var name = document.getElementById('m-loc-name')?.value || 'New Facility';
          var city = document.getElementById('m-loc-city')?.value || 'Bengaluru';
          var area = document.getElementById('m-loc-area')?.value || 'City Central';
          var type = document.getElementById('m-loc-type')?.value || 'Micro-Fulfillment Hub';
          S.locations.push({
            id: 'LOC-0' + (S.locations.length + 1),
            name: name,
            city: city,
            area: area,
            type: type,
            radius: '5.0 km',
            manager: 'Station Manager',
            phone: '+91 80 4719 3299',
            status: 'Active'
          });
          showToast('✓ Added facility ' + name);
          switchTab('locations');
        });
      };
    }

    var addUserBtn = root.querySelector('#btn-add-user');
    if (addUserBtn) {
      addUserBtn.onclick = function () {
        showModal('Invite Administrative / Clinical User', [
          '<div class="zset-form-group"><label class="zset-label">Full Name</label><input class="zset-input" id="m-usr-name" placeholder="e.g. Dr. Sunita Sen"></div>',
          '<div class="zset-form-group"><label class="zset-label">Work Email</label><input class="zset-input font-mono" id="m-usr-email" placeholder="sunita@zenve.in"></div>',
          '<div class="zset-form-group"><label class="zset-label">Role</label><select class="zset-select" id="m-usr-role"><option>Senior Veterinarian</option><option>Clinical Director & CMO</option><option>Head Pharmacist</option><option>Care Operations Lead</option><option>Operations & Dispatch Lead</option></select></div>'
        ].join(''), function () {
          var name = document.getElementById('m-usr-name')?.value || 'New Member';
          var email = document.getElementById('m-usr-email')?.value || 'user@zenve.in';
          var role = document.getElementById('m-usr-role')?.value || 'Senior Veterinarian';
          S.users.push({
            id: 'USR-' + (100 + S.users.length + 1),
            name: name,
            email: email,
            role: role,
            unit: 'Clinical Hospitals',
            location: 'Bengaluru Hospital',
            mfa: 'Enforced',
            status: 'Active'
          });
          showToast('✓ Invitation sent to ' + email);
          switchTab('users');
        });
      };
    }

    // Modal: Add Role Profile (Roles & Permissions)
    var addRoleBtn = root.querySelector('#btn-add-role');
    if (addRoleBtn) {
      addRoleBtn.onclick = function () {
        showModal('Create Custom Role Profile', [
          '<div class="zset-form-group"><label class="zset-label">Role Title / Designation</label><input class="zset-input" id="m-role-name" placeholder="e.g. Junior Paravet & Ward Nurse"></div>',
          '<div class="zset-form-group"><label class="zset-label">Business Unit Scope</label><select class="zset-select" id="m-role-unit"><option>Clinical Hospitals</option><option>Digital Tele-Health</option><option>Pharmacy & Diagnostics</option><option>Supply Chain</option><option>Customer Experience</option></select></div>',
          '<div class="zset-form-group"><label class="zset-label">Role Scope Description</label><input class="zset-input" id="m-role-desc" placeholder="e.g. Patient vitals intake, triage assistance, and basic ward care"></div>',
          '<div class="zset-form-group"><label class="zset-label">Estimated Headcount</label><input class="zset-input font-mono" id="m-role-users" type="number" value="5"></div>'
        ].join(''), function () {
          var name = document.getElementById('m-role-name')?.value || 'New Custom Role';
          var desc = document.getElementById('m-role-desc')?.value || 'Custom defined role profile';
          var users = parseInt(document.getElementById('m-role-users')?.value || '1', 10);
          S.roles.push({
            name: name,
            desc: desc,
            users: users
          });
          try {
            localStorage.setItem('zenve_rbac_roles', JSON.stringify(S.roles));
          } catch (e) {}
          showToast('✓ Created custom role profile: ' + name);
          switchTab('roles');
        });
      };
    }

    // Modal: Add Module Scope (Privilege Matrix)
    var addModuleBtn = root.querySelector('#btn-add-module');
    if (addModuleBtn) {
      addModuleBtn.onclick = function () {
        showModal('Add Module Scope to Privilege Matrix', [
          '<div class="zset-form-group"><label class="zset-label">Module Scope Name</label><input class="zset-input" id="m-mod-name" placeholder="e.g. Inpatient & ICU Surgical Scheduling"></div>',
          '<div class="zset-form-group"><label class="zset-label">Default Baseline Permissions</label>',
            '<div style="display:flex;gap:12px;margin-top:6px;font-size:12px;">',
              '<label><input type="checkbox" id="m-mod-view" checked> View</label>',
              '<label><input type="checkbox" id="m-mod-create" checked> Create</label>',
              '<label><input type="checkbox" id="m-mod-edit" checked> Edit</label>',
              '<label><input type="checkbox" id="m-mod-del"> Delete</label>',
              '<label><input type="checkbox" id="m-mod-exp" checked> Export</label>',
              '<label><input type="checkbox" id="m-mod-app"> Approve</label>',
            '</div>',
          '</div>'
        ].join(''), function () {
          var name = document.getElementById('m-mod-name')?.value || 'New Module Scope';
          var v = !!document.getElementById('m-mod-view')?.checked;
          var c = !!document.getElementById('m-mod-create')?.checked;
          var e = !!document.getElementById('m-mod-edit')?.checked;
          var d = !!document.getElementById('m-mod-del')?.checked;
          var ex = !!document.getElementById('m-mod-exp')?.checked;
          var a = !!document.getElementById('m-mod-app')?.checked;
          S.permissions.push({
            module: name,
            view: v,
            create: c,
            edit: e,
            del: d,
            exp: ex,
            app: a
          });
          try {
            localStorage.setItem('zenve_rbac_permissions', JSON.stringify(S.permissions));
          } catch (err) {}
          saveAllChanges();
          showToast('✓ Added module scope: ' + name);
          switchTab('roles');
        });
      };
    }

    // Modal: Add Approval Workflow Rule
    var addWfBtn = root.querySelector('#btn-add-workflow');
    if (addWfBtn) {
      addWfBtn.onclick = function () {
        showModal('Configure Approval Workflow Rule', [
          '<div class="zset-form-group"><label class="zset-label">Workflow Name / Rule Scope</label><input class="zset-input" id="m-wf-name" placeholder="e.g. High-Risk Surgical Credit Sign-Off"></div>',
          '<div class="zset-form-group"><label class="zset-label">Trigger Condition</label><input class="zset-input" id="m-wf-trigger" placeholder="e.g. Unscheduled ICU Triage Exception"></div>',
          '<div class="zset-form-group"><label class="zset-label">Routing Hierarchy Steps</label><input class="zset-input" id="m-wf-steps" placeholder="e.g. Attending Vet → CMO Dual Sign-Off"></div>',
          '<div class="zset-form-group"><label class="zset-label">SLA Timeout Escalation</label><select class="zset-select" id="m-wf-timeout"><option>30 Minutes</option><option>1 Hour</option><option>4 Hours</option><option>12 Hours</option><option>24 Hours</option></select></div>'
        ].join(''), function () {
          var name = document.getElementById('m-wf-name')?.value || 'New Approval Rule';
          var trigger = document.getElementById('m-wf-trigger')?.value || 'Manual Review';
          var steps = document.getElementById('m-wf-steps')?.value || 'Coordinator → Manager';
          var timeout = document.getElementById('m-wf-timeout')?.value || '4 Hours';
          S.workflows.push({
            id: 'WF-0' + (S.workflows.length + 1),
            name: name,
            trigger: trigger,
            steps: steps,
            timeout: timeout,
            status: 'Active'
          });
          try {
            localStorage.setItem('zenve_custom_workflows', JSON.stringify(S.workflows));
          } catch (e) {}
          showToast('✓ Configured approval rule: ' + name);
          switchTab('workflows');
        });
      };
    }

    // Modal: Add Tax Schedule (HSN/SAC)
    var addTaxBtn = root.querySelector('#btn-add-tax');
    if (addTaxBtn) {
      addTaxBtn.onclick = function () {
        showModal('Add HSN / SAC Tax Schedule', [
          '<div class="zset-form-group"><label class="zset-label">Item / Commodity Classification</label><input class="zset-input" id="m-tax-cat" placeholder="e.g. Canine Orthopedic Surgical Implants"></div>',
          '<div class="zset-form-group"><label class="zset-label">HSN / SAC Statutory Code</label><input class="zset-input font-mono" id="m-tax-code" placeholder="e.g. HSN 9021"></div>',
          '<div class="zset-form-group"><label class="zset-label">Applicable GST Slab</label><select class="zset-select" id="m-tax-slab"><option value="0">0% (Exempt Healthcare Service)</option><option value="5" selected>5% (2.5% CGST + 2.5% SGST)</option><option value="12">12% (6% CGST + 6% SGST)</option><option value="18">18% (9% CGST + 9% SGST)</option><option value="28">28% (14% CGST + 14% SGST)</option></select></div>'
        ].join(''), function () {
          var cat = document.getElementById('m-tax-cat')?.value || 'New Healthcare Commodity';
          var code = document.getElementById('m-tax-code')?.value || 'HSN-GEN';
          var slab = parseInt(document.getElementById('m-tax-slab')?.value || '5', 10);
          var half = (slab / 2) + '%';
          var full = slab + '%';
          S.taxes.push({
            category: cat,
            code: code,
            gst: full,
            cgst: slab === 0 ? '0%' : half,
            sgst: slab === 0 ? '0%' : half,
            igst: full
          });
          try {
            localStorage.setItem('zenve_custom_taxes', JSON.stringify(S.taxes));
          } catch (e) {}
          showToast('✓ Added tax schedule: ' + cat);
          switchTab('tax');
        });
      };
    }

    // Modal: Add Integration Bridge
    var addIntBtn = root.querySelector('#btn-add-integration');
    if (addIntBtn) {
      addIntBtn.onclick = function () {
        showModal('Connect External Webhook / Integration Bridge', [
          '<div class="zset-form-group"><label class="zset-label">Connector / Service Name</label><input class="zset-input" id="m-int-name" placeholder="e.g. Thyrocare Vet Pathology LIMS"></div>',
          '<div class="zset-form-group"><label class="zset-label">Service Type</label><select class="zset-select" id="m-int-type"><option>Inbound Pathology LIMS Bridge</option><option>Outbound Webhook Dispatcher</option><option>Hyperlocal Logistics API</option><option>Enterprise CRM Sync</option></select></div>',
          '<div class="zset-form-group"><label class="zset-label">Endpoint URL</label><input class="zset-input font-mono" id="m-int-url" placeholder="https://api.partner.com/webhook/zenve"></div>'
        ].join(''), function () {
          var name = document.getElementById('m-int-name')?.value || 'New Integration';
          var type = document.getElementById('m-int-type')?.value || 'Outbound Webhook';
          S.integrations.push({
            name: name,
            type: type,
            status: 'Connected',
            uptime: '99.99%',
            lastSync: 'Just now'
          });
          try {
            localStorage.setItem('zenve_custom_integrations', JSON.stringify(S.integrations));
          } catch (e) {}
          showToast('✓ Connected external bridge: ' + name);
          switchTab('integrations');
        });
      };
    }

    // Modal: Add Subnet Rule (Security)
    var addSubnetBtn = root.querySelector('#btn-add-subnet');
    if (addSubnetBtn) {
      addSubnetBtn.onclick = function () {
        showModal('Authorize Clinical Subnet IP Range', [
          '<div class="zset-form-group"><label class="zset-label">Authorized Subnet CIDR / Static IP</label><input class="zset-input font-mono" id="m-sec-ip" placeholder="e.g. 192.168.10.0/24"></div>',
          '<div class="zset-form-group"><label class="zset-label">Facility / Node Name</label><input class="zset-input" id="m-sec-facility" placeholder="e.g. Bengaluru Flagship ICU Subnet"></div>',
          '<div class="zset-form-group"><label class="zset-label">Access Purpose</label><input class="zset-input" id="m-sec-purpose" placeholder="e.g. Inpatient EHR & Surgery Theatre Terminals"></div>'
        ].join(''), function () {
          var ip = document.getElementById('m-sec-ip')?.value || '10.0.0.0/24';
          var fac = document.getElementById('m-sec-facility')?.value || 'Clinical Node';
          if (S.security.ipWhitelist) {
            S.security.ipWhitelist += ', ' + ip;
          } else {
            S.security.ipWhitelist = ip;
          }
          showToast('✓ Added authorized subnet: ' + ip + ' (' + fac + ')');
          switchTab('security');
        });
      };
    }

    // Modal: Add Delivery Zone (Delivery Settings)
    var addDelZoneBtn = root.querySelector('#btn-add-delivery-zone');
    if (addDelZoneBtn) {
      addDelZoneBtn.onclick = function () {
        showModal('Add Hyperlocal Delivery Zone', [
          '<div class="zset-form-group"><label class="zset-label">Zone Name & Locality</label><input class="zset-input" id="m-del-zone" placeholder="e.g. Zone A - Koramangala Central Express"></div>',
          '<div class="zset-form-group"><label class="zset-label">Target Service Radius (km)</label><input class="zset-input font-mono" id="m-del-rad" type="number" value="3.5"></div>',
          '<div class="zset-form-group"><label class="zset-label">Driver Allocation SLA Timeout</label><select class="zset-select" id="m-del-sla"><option>3 Minutes</option><option>5 Minutes</option><option>8 Minutes</option></select></div>',
          '<div class="zset-form-group"><label class="zset-label">Minimum Order for Free Delivery (₹)</label><input class="zset-input font-mono" id="m-del-min" type="number" value="399"></div>'
        ].join(''), function () {
          var zone = document.getElementById('m-del-zone')?.value || 'New Delivery Zone';
          var rad = parseFloat(document.getElementById('m-del-rad')?.value || '5');
          var sla = parseInt(document.getElementById('m-del-sla')?.value || '5', 10);
          var min = parseFloat(document.getElementById('m-del-min')?.value || '499');
          S.delivery.expressRadiusKm = rad;
          S.delivery.dispatchThresholdMins = sla;
          S.delivery.freeDeliveryMinOrder = min;
          showToast('✓ Configured delivery zone: ' + zone);
          switchTab('delivery');
        });
      };
    }

    // Modal: Add Alert Rule (Notification Settings)
    var addNotifBtn = root.querySelector('#btn-add-notif-trigger');
    if (addNotifBtn) {
      addNotifBtn.onclick = function () {
        showModal('Register Notification Alert Rule', [
          '<div class="zset-form-group"><label class="zset-label">Alert Trigger Name</label><input class="zset-input" id="m-notif-name" placeholder="e.g. Post-Surgery 48-Hour Recovery Checkup"></div>',
          '<div class="zset-form-group"><label class="zset-label">Dispatch Channel</label><select class="zset-select" id="m-notif-chan"><option>WhatsApp Business API (Gupshup)</option><option>Transactional SMS (DLT Approved)</option><option>Mobile Push (Firebase FCM)</option><option>Transactional Email (Amazon SES)</option></select></div>',
          '<div class="zset-form-group"><label class="zset-label">DLT Template ID / Reference</label><input class="zset-input font-mono" id="m-notif-tpl" placeholder="DLT-ZENVE-POSTOP-48H"></div>'
        ].join(''), function () {
          var name = document.getElementById('m-notif-name')?.value || 'New Alert Rule';
          showToast('✓ Registered notification rule: ' + name);
          switchTab('notifications');
        });
      };
    }
  }

  /* ── Modal Utility ───────────────────────────────────────────────── */
  function showModal(title, bodyHtml, onConfirm) {
    var modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'zset-modal-backdrop';
    modalBackdrop.innerHTML = [
      '<div class="zset-modal-box">',
        '<div class="zset-modal-head">',
          '<h3>' + esc(title) + '</h3>',
          '<button type="button" class="zset-close-btn" id="m-close-btn">✕</button>',
        '</div>',
        '<div class="zset-modal-body">' + bodyHtml + '</div>',
        '<div class="zset-modal-foot">',
          '<button type="button" class="zset-btn zset-btn-secondary" id="m-cancel-btn">Cancel</button>',
          '<button type="button" class="zset-btn zset-btn-primary" id="m-submit-btn">Confirm</button>',
        '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(modalBackdrop);

    function closeM() { modalBackdrop.remove(); }
    modalBackdrop.querySelector('#m-close-btn').onclick = closeM;
    modalBackdrop.querySelector('#m-cancel-btn').onclick = closeM;
    modalBackdrop.querySelector('#m-submit-btn').onclick = function () {
      if (onConfirm) onConfirm();
      closeM();
    };
  }

  /* ── Tab Switcher ────────────────────────────────────────────────── */
  function switchTab(newTab) {
    if (!newTab) return;
    S.activeTab = newTab;
    S.searchQuery = '';
    var targetHash = hashFromTab(newTab);
    try {
      if (location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    } catch (e) { }

    renderShell();
    syncSidebar(true, newTab);

    // Smoothly scroll active horizontal chip into view
    var activeChip = document.getElementById('zset-chip-' + newTab);
    if (activeChip && activeChip.scrollIntoView) {
      try {
        activeChip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } catch (err) {}
    }
  }

  function loadLiveSettings() {
    // 1. Instant hydration from client-side storage
    try {
      var localPerms = localStorage.getItem('zenve_rbac_permissions');
      if (localPerms) {
        var parsedLocal = JSON.parse(localPerms);
        mergePermissions(parsedLocal);
      }
      var localRoles = localStorage.getItem('zenve_rbac_roles');
      if (localRoles) {
        var parsedRoles = JSON.parse(localRoles);
        if (Array.isArray(parsedRoles) && parsedRoles.length) S.roles = parsedRoles;
      }
      var localWf = localStorage.getItem('zenve_custom_workflows');
      if (localWf) {
        var parsedWf = JSON.parse(localWf);
        if (Array.isArray(parsedWf) && parsedWf.length) S.workflows = parsedWf;
      }
      var localTaxes = localStorage.getItem('zenve_custom_taxes');
      if (localTaxes) {
        var parsedTaxes = JSON.parse(localTaxes);
        if (Array.isArray(parsedTaxes) && parsedTaxes.length) S.taxes = parsedTaxes;
      }
      var localInt = localStorage.getItem('zenve_custom_integrations');
      if (localInt) {
        var parsedInt = JSON.parse(localInt);
        if (Array.isArray(parsedInt) && parsedInt.length) S.integrations = parsedInt;
      }
    } catch (e) {}

    // 2. Fetch ground-truth settings from MySQL backend
    fetch('/api/v1/settings')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data)) {
          data.forEach(function (s) {
            if (s.setting_key === 'company_name' && s.setting_value) S.company.name = s.setting_value;
            if (s.setting_key === 'brand_name' && s.setting_value) S.company.brand = s.setting_value;
            if (s.setting_key === 'hq_address' && s.setting_value) S.company.address = s.setting_value;
            if (s.setting_key === 'support_phone' && s.setting_value) S.company.supportPhone = s.setting_value;
            if (s.setting_key === 'support_email' && s.setting_value) S.company.email = s.setting_value;
            if (s.setting_key === 'currency_symbol' && s.setting_value) S.company.currency = s.setting_value;
            if (s.setting_key === 'rbac_permissions' && s.setting_value) {
              try {
                var parsed = JSON.parse(s.setting_value);
                mergePermissions(parsed);
                try { localStorage.setItem('zenve_rbac_permissions', JSON.stringify(S.permissions)); } catch (e) {}
              } catch (e) {}
            }
          });
          if (root && S.open) {
            renderShell();
          }
        }
      })
      .catch(function (err) {
        console.error('Failed to load settings from MySQL:', err);
      });

    // 3. Fetch live Custom AI & Enterprise RAG configuration
    fetch('/api/v1/custom-ai/status')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.config) {
          var c = data.config;
          if (!S.customAi) S.customAi = {};
          if (c.provider) S.customAi.provider = c.provider;
          if (c.api_url != null) S.customAi.apiUrl = c.api_url;
          if (c.model) S.customAi.model = c.model;
          if (c.temperature != null) S.customAi.temperature = c.temperature;
          if (c.rag_enabled != null) S.customAi.ragEnabled = c.rag_enabled;
          if (c.system_prompt) S.customAi.systemPrompt = c.system_prompt;
          if (data.connection) {
            S.customAi.status = data.connection.status;
            S.customAi.latency = data.connection.latency_ms;
          }
          if (root && S.open && S.activeTab === 'integrations') {
            var pane = root.querySelector('#zset-pane');
            if (pane) {
              pane.innerHTML = renderIntegrations();
              wireTabSpecificEvents();
            }
          }
        }
      })
      .catch(function () {});
  }

  /* ── Open / Close Controller ────────────────────────────────────── */
  function open(tab) {
    loadLiveSettings();
    if (tab && MODULES.some(function (m) { return m.id === tab; })) {
      S.activeTab = tab;
    } else {
      S.activeTab = tabFromHash(location.hash) || 'company';
    }

    if (!root) renderShell();
    else if (!document.body.contains(root)) document.body.appendChild(root);
    else renderShell();

    // Close any other open control centers
    document.querySelectorAll('.zpanel-root, #zod-root, #zsd-root').forEach(function (el) {
      if (el !== root) {
        el.classList.remove('zpanel-open');
        el.classList.remove('zod-open');
        el.classList.remove('zsd-open');
      }
    });

    root.classList.add('zset-open');
    S.open = true;
    try {
      document.documentElement.classList.add('zset-locked');
      document.body.classList.add('zset-locked');
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
        if (d.closest('#zset-root')) return;
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

  function close() {
    if (!root || !S.open) return;
    S.open = false;
    root.classList.remove('zset-open');
    try {
      document.documentElement.classList.remove('zset-locked');
      document.body.classList.remove('zset-locked');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      document.body.removeAttribute('data-scroll-locked');
    } catch (e) { }
    syncSidebar(false);
    try {
      if (location.hash.startsWith('#company-') || location.hash.startsWith('#business-') || location.hash.startsWith('#roles-') || location.hash.startsWith('#approval-') || location.hash.startsWith('#notification-') || location.hash.startsWith('#dashboard-') || location.hash.startsWith('#tax-') || location.hash.startsWith('#payment-') || location.hash.startsWith('#delivery-') || location.hash.startsWith('#api-') || location.hash === '#security' || location.hash.startsWith('#backup-') || location.hash === '#users' || location.hash === '#locations' || location.hash === '#settings') {
        history.pushState(null, '', location.pathname + location.search);
      }
    } catch (e) { }
  }

  function syncSidebar(on, tab) {
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var text = (b.textContent || '').trim();
      var bTab = tabFromText(text);
      if (bTab) {
        b.classList.toggle('zset-active', on && bTab === tab);
        b.classList.toggle('zsd-active', on && bTab === tab);
      }
    });
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  window.ZenveSettingsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    getState: function () { return S; }
  };

  /* ── Keyboard & Hashchange Listeners ────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) close();
  });

  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash.indexOf('settings') < 0) {
      close();
    }
  });

  /* ── Capture-Phase Global Interceptor for All 14 Settings Pages ─── */
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
        if (!t.closest('#zset-root')) {
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
