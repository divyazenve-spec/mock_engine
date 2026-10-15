/**
 * Zenve BI — Platform Settings & Enterprise Governance Mock Data
 * Comprehensive configuration datasets across 14 operational and statutory modules:
 * Company Profile, Business Units, Locations, Users, Roles & RBAC,
 * Approval Workflows, Notifications, Dashboard Preferences, Taxes,
 * Payments, Delivery SLAs, API Integrations, Security, and Disaster Recovery.
 */

export const MOCK_COMPANY_SETTINGS = {
  name: 'Zenve Healthcare & Retail Private Limited',
  brand: 'Zenve Pet Wellness & Care',
  cin: 'U85110KA2024PTC189201',
  gstin: '29AABCZ9421H1Z4',
  pan: 'AABCZ9421H',
  email: 'corporate@zenve.in',
  supportEmail: 'care@zenve.in',
  supportPhone: '+91 80 4728 9200',
  address: 'Zenve Health Tower, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103',
  currency: 'INR (₹)',
  fyStart: 'April 01',
  fyEnd: 'March 31',
  timezone: 'Asia/Kolkata (IST, UTC+05:30)',
  drugLicense: '20B/21B/KA-BNG-194208',
  vciAccreditation: 'VCI-IND-2024-00892',
  bioWasteAuth: 'BMW-KSPCB-2024-0492'
};

export const MOCK_BUSINESS_UNITS = [
  {
    id: 'BU-01',
    name: 'Pet Products & Clinical Nutrition',
    code: 'DIV-NUTR',
    lead: 'Rahul Mehta (VP Products)',
    staff: 38,
    revenue: '₹68.4L / mo',
    status: 'Active'
  },
  {
    id: 'BU-02',
    name: 'Veterinary Pharmacy & Therapeutics',
    code: 'DIV-PHARM',
    lead: 'Karthik S. (Head Pharmacist)',
    staff: 28,
    revenue: '₹58.4L / mo',
    status: 'Active'
  },
  {
    id: 'BU-03',
    name: 'Clinical Hospitals & Emergency Surgeries',
    code: 'DIV-CLIN',
    lead: 'Dr. Priya Sharma (CMO)',
    staff: 46,
    revenue: '₹28.2L / mo',
    status: 'Active'
  },
  {
    id: 'BU-04',
    name: 'Tele-Triage & Digital Consultations',
    code: 'DIV-TELE',
    lead: 'Dr. Rajesh K. (Head of Digital Health)',
    staff: 18,
    revenue: '₹14.8L / mo',
    status: 'Active'
  },
  {
    id: 'BU-05',
    name: '60-Minute Hyperlocal Logistics & Dark Stores',
    code: 'DIV-LOG',
    lead: 'Anand Kumar (Head of Ops)',
    staff: 64,
    revenue: '₹12.5L / mo',
    status: 'Active'
  },
  {
    id: 'BU-06',
    name: 'Zenve Pet Fashion & Lifestyle',
    code: 'DIV-FASH',
    lead: 'Neha Kapur (Creative Director)',
    staff: 14,
    revenue: '₹8.4L / mo',
    status: 'Active'
  },
  {
    id: 'BU-07',
    name: 'B2B Institutional Accounts & Breeders',
    code: 'DIV-B2B',
    lead: 'Vikram Sethi (VP Enterprise)',
    staff: 12,
    revenue: '₹14.8L / mo',
    status: 'Active'
  },
  {
    id: 'BU-08',
    name: 'Care Subscriptions & Wellness Passes',
    code: 'DIV-SUBS',
    lead: 'Deepa Nair (VP Growth)',
    staff: 10,
    revenue: '₹5.8L / mo',
    status: 'Active'
  },
  {
    id: 'BU-09',
    name: 'Clinical Diagnostics & Pathology Network',
    code: 'DIV-DIAG',
    lead: 'Dr. Sandeep Verma (Head of Pathology)',
    staff: 16,
    revenue: '₹9.4L / mo',
    status: 'Active'
  },
  {
    id: 'BU-10',
    name: 'Corporate Governance & Shared Services',
    code: 'DIV-CORP',
    lead: 'Siddharth Roy (CFO)',
    staff: 14,
    revenue: 'Overhead / Shared',
    status: 'Active'
  }
];

export const MOCK_LOCATIONS = [
  {
    id: 'LOC-BLR-01',
    name: 'Indiranagar Super-Specialty Hospital & Micro-Hub',
    area: '100ft Road, Indiranagar',
    type: '24/7 Trauma Hospital',
    city: 'Bengaluru',
    radius: '12 km Express',
    manager: 'Dr. Priya Sharma',
    phone: '+91 80 4728 9201',
    status: 'Active'
  },
  {
    id: 'LOC-BLR-02',
    name: 'Koramangala Cold-Chain Micro-Fulfillment Node',
    area: '4th Block, Koramangala',
    type: 'Cold-Chain Dark Store',
    city: 'Bengaluru',
    radius: '8 km Express',
    manager: 'Suresh Nair',
    phone: '+91 80 4728 9202',
    status: 'Active'
  },
  {
    id: 'LOC-BLR-03',
    name: 'Whitefield Veterinary Clinic & Express Hub',
    area: 'ITPL Main Road, Whitefield',
    type: 'Daycare & Outpatient Clinic',
    city: 'Bengaluru',
    radius: '10 km Express',
    manager: 'Dr. Ananya Sen',
    phone: '+91 80 4728 9203',
    status: 'Active'
  },
  {
    id: 'LOC-BLR-04',
    name: 'Electronic City Emergency Surgery Annex',
    area: 'Phase 1 Tech Corridor',
    type: '24/7 Trauma Center',
    city: 'Bengaluru',
    radius: '14 km Express',
    manager: 'Dr. Sandeep Verma',
    phone: '+91 80 4728 9204',
    status: 'Active'
  },
  {
    id: 'LOC-BOM-01',
    name: 'Bandra West Veterinary Care & Cold Hub',
    area: 'Linking Road, Bandra West',
    type: 'Super-Specialty Hospital',
    city: 'Mumbai MMR',
    radius: '10 km Express',
    manager: 'Dr. Farhan Merchant',
    phone: '+91 22 6829 4101',
    status: 'Active'
  },
  {
    id: 'LOC-BOM-02',
    name: 'Andheri MIDC Central Warehouse & Formulary',
    area: 'MIDC Industrial Area, Andheri East',
    type: 'Central Distribution Center',
    city: 'Mumbai MMR',
    radius: '25 km Regional',
    manager: 'Rakesh Solanki',
    phone: '+91 22 6829 4102',
    status: 'Active'
  },
  {
    id: 'LOC-BOM-03',
    name: 'Thane City Express Dark Store',
    area: 'Ghodbunder Road, Thane West',
    type: 'Cold-Chain Micro-Hub',
    city: 'Mumbai MMR',
    radius: '8 km Express',
    manager: 'Vijay Deshmukh',
    phone: '+91 22 6829 4103',
    status: 'Active'
  },
  {
    id: 'LOC-DEL-01',
    name: 'Gurgaon Golf Course Road Hospital Hub',
    area: 'Sector 54, Golf Course Road',
    type: '24/7 Veterinary Hospital',
    city: 'Delhi NCR',
    radius: '15 km Express',
    manager: 'Dr. Rajiv Malhotra',
    phone: '+91 124 492 8101',
    status: 'Active'
  },
  {
    id: 'LOC-DEL-02',
    name: 'Noida Sector 62 Regional Logistics Hub',
    area: 'Electronic City Road, Sector 62',
    type: 'Regional Dark Store',
    city: 'Delhi NCR',
    radius: '20 km Regional',
    manager: 'Amit Tyagi',
    phone: '+91 120 488 9201',
    status: 'Active'
  },
  {
    id: 'LOC-HYD-01',
    name: 'Hitec City Veterinary Hospital & Express Hub',
    area: 'Madhapur Cyberabad',
    type: 'Trauma Center & Dark Store',
    city: 'Hyderabad',
    radius: '12 km Express',
    manager: 'Dr. Srinivas Rao',
    phone: '+91 40 6820 9401',
    status: 'Active'
  }
];

export const MOCK_USERS = [
  {
    id: 'USR-001',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@zenve.in',
    role: 'Clinical Director & CMO',
    unit: 'Clinical Hospitals',
    location: 'Indiranagar Super-Specialty',
    mfa: 'Enforced',
    status: 'Active'
  },
  {
    id: 'USR-002',
    name: 'Karthik S.',
    email: 'karthik.s@zenve.in',
    role: 'Head Pharmacist',
    unit: 'Veterinary Pharmacy',
    location: 'Koramangala Node',
    mfa: 'Enforced',
    status: 'Active'
  },
  {
    id: 'USR-003',
    name: 'Siddharth Roy',
    email: 'siddharth.roy@zenve.in',
    role: 'Chief Financial Officer',
    unit: 'Corporate Governance',
    location: 'Bengaluru HQ',
    mfa: 'Enforced',
    status: 'Active'
  },
  {
    id: 'USR-004',
    name: 'Anand Kumar',
    email: 'anand.kumar@zenve.in',
    role: 'Operations & Dispatch Lead',
    unit: '60-Min Hyperlocal',
    location: 'Koramangala Node',
    mfa: 'Enforced',
    status: 'Active'
  },
  {
    id: 'USR-005',
    name: 'Dr. Rajesh K.',
    email: 'rajesh.k@zenve.in',
    role: 'Senior Veterinarian',
    unit: 'Telemedicine',
    location: 'Whitefield Clinic',
    mfa: 'Enforced',
    status: 'Active'
  },
  {
    id: 'USR-006',
    name: 'Tarun Verma',
    email: 'tarun.verma@zenve.in',
    role: 'Super Administrator',
    unit: 'Technology & DevOps',
    location: 'Bengaluru HQ',
    mfa: 'Enforced',
    status: 'Active'
  },
  {
    id: 'USR-007',
    name: 'Dr. Farhan Merchant',
    email: 'farhan.merchant@zenve.in',
    role: 'Senior Veterinarian',
    unit: 'Clinical Hospitals',
    location: 'Bandra West Hospital',
    mfa: 'Enforced',
    status: 'Active'
  },
  {
    id: 'USR-008',
    name: 'Vikram Sethi',
    email: 'vikram.sethi@zenve.in',
    role: 'Financial Auditor',
    unit: 'B2B Enterprise',
    location: 'Bengaluru HQ',
    mfa: 'Enforced',
    status: 'Active'
  },
  {
    id: 'USR-009',
    name: 'Ananya Mehra',
    email: 'ananya.mehra@zenve.in',
    role: 'HR & Personnel Lead',
    unit: 'Corporate Governance',
    location: 'Bengaluru HQ',
    mfa: 'Enforced',
    status: 'Active'
  },
  {
    id: 'USR-010',
    name: 'Dr. Rajiv Malhotra',
    email: 'rajiv.malhotra@zenve.in',
    role: 'Senior Veterinarian',
    unit: 'Clinical Hospitals',
    location: 'Gurgaon Golf Course Hub',
    mfa: 'Enforced',
    status: 'Active'
  }
];

export const MOCK_ROLES = [
  { name: 'Super Administrator', desc: 'Full root access to all system configurations, cloud databases, and clinical audit logs', users: 3 },
  { name: 'Clinical Director & CMO', desc: 'Medical governance, prescription approval, surgical scheduling, and clinical protocol sign-offs', users: 2 },
  { name: 'Senior Veterinarian', desc: 'Patient diagnosis, prescriptions, surgical telemetry, and verified medical chart sign-offs', users: 18 },
  { name: 'Operations & Dispatch Lead', desc: 'Order fulfillment, rider assignment, 60-min delivery SLAs, and dark store inventory transfers', users: 12 },
  { name: 'Head Pharmacist', desc: 'Schedule-H/X narcotic drug dispensing, cold-chain temperature verification, and batch audits', users: 6 },
  { name: 'Financial Auditor', desc: 'GST computation, P&L reporting, customer refunds, and ledger reconciliation sign-offs', users: 4 }
];

export const MOCK_PERMISSIONS = [
  { module: 'Clinical Patient Records (EHR)', view: true, create: true, edit: true, del: false, exp: true, app: true },
  { module: 'Veterinary Prescriptions (Rx)', view: true, create: true, edit: true, del: false, exp: true, app: true },
  { module: 'Orders & 60-Min Delivery Command', view: true, create: true, edit: true, del: false, exp: true, app: true },
  { module: 'Cold-Chain Pharmacy & Batch Inventory', view: true, create: true, edit: true, del: false, exp: true, app: true },
  { module: 'Financial Ledgers & Tax Reports', view: true, create: false, edit: false, del: false, exp: true, app: true },
  { module: 'User Management & Security Access', view: true, create: true, edit: true, del: true, exp: true, app: true },
  { module: 'System API & Webhook Configuration', view: true, create: true, edit: true, del: false, exp: true, app: true }
];

export const MOCK_WORKFLOWS = [
  {
    id: 'WF-01',
    name: 'Schedule H / X Narcotic Prescription Sign-Off',
    trigger: 'Rx contains Controlled Drug',
    steps: 'Consulting Vet -> Head Pharmacist Verification',
    timeout: '15 Mins SLA',
    status: 'Active'
  },
  {
    id: 'WF-02',
    name: 'High-Value Patient Refund Authorization (> ₹2,500)',
    trigger: 'Refund Request > ₹2,500',
    steps: 'Customer Support Lead -> Finance Manager',
    timeout: '2 Hours SLA',
    status: 'Active'
  },
  {
    id: 'WF-03',
    name: 'Wholesale Pharmaceutical PO Approval (> ₹1,00,000)',
    trigger: 'Vendor Purchase Order Issued',
    steps: 'Procurement Lead -> Chief Financial Officer',
    timeout: '24 Hours SLA',
    status: 'Active'
  },
  {
    id: 'WF-04',
    name: 'Emergency Surgical Room Allocation Override',
    trigger: 'Trauma Triage Flag: Critical',
    steps: 'Emergency Vet -> Chief Surgeon Confirmation',
    timeout: '5 Mins SLA',
    status: 'Active'
  },
  {
    id: 'WF-05',
    name: 'Cold-Chain Temperature Deviation Spoilage Protocol',
    trigger: 'Sensor Temp > 8°C for > 20 Mins',
    steps: 'IoT Sentinel -> Quality Lead -> Stock Write-Off',
    timeout: '30 Mins SLA',
    status: 'Active'
  },
  {
    id: 'WF-06',
    name: 'New Veterinary Specialist Onboarding & Credentialing',
    trigger: 'New Practitioner Account Created',
    steps: 'HR Verification -> Medical Director VCI Audit',
    timeout: '48 Hours SLA',
    status: 'Active'
  },
  {
    id: 'WF-07',
    name: 'Commercial B2B Credit Limit Override (> ₹5,00,000)',
    trigger: 'Enterprise PO on Credit Terms',
    steps: 'Account Executive -> VP Enterprise -> CFO',
    timeout: '12 Hours SLA',
    status: 'Active'
  },
  {
    id: 'WF-08',
    name: 'Expired Pharmaceutical Destruction Audit',
    trigger: 'Batch Expired Quarantine Action',
    steps: 'Pharmacist -> Pollution Control Board Witness Form',
    timeout: '72 Hours SLA',
    status: 'Active'
  },
  {
    id: 'WF-09',
    name: 'Emergency Delivery Courier Fee Waiver',
    trigger: 'Courier Charge Waiver Requested',
    steps: 'Operations Lead Approval',
    timeout: '10 Mins SLA',
    status: 'Active'
  },
  {
    id: 'WF-10',
    name: 'Production API Key Generation & IP Whitelist Change',
    trigger: 'New API Key or Subnet Addition',
    steps: 'Engineering Lead -> Super Administrator Sign-Off',
    timeout: '4 Hours SLA',
    status: 'Active'
  }
];

export const MOCK_PENDING_APPROVALS = [
  {
    id: 'APP-1042',
    title: 'Controlled Phenobarbital Rx Authorization',
    amount: '₹1,240',
    orderId: 'ORD-2026-9428',
    requester: 'Dr. Farhan Merchant',
    date: '12 mins ago'
  },
  {
    id: 'APP-1043',
    title: 'Damaged Reefer Cargo Write-Off (Batch #BOM-V2)',
    amount: '₹34,500',
    orderId: 'PO-2026-081',
    requester: 'Rakesh Solanki',
    date: '45 mins ago'
  },
  {
    id: 'APP-1044',
    title: 'Customer Refund: Chronic Renal Prescription Diet',
    amount: '₹4,850',
    orderId: 'RET-2026-049',
    requester: 'Care Support Lead',
    date: '1 hour ago'
  },
  {
    id: 'APP-1045',
    title: 'Zoetis Direct Manufacturer Bulk Serum PO',
    amount: '₹4,20,000',
    orderId: 'PO-2026-094',
    requester: 'Vikram Sethi',
    date: '2 hours ago'
  },
  {
    id: 'APP-1046',
    title: 'Emergency Ultrasound Probe Equipment Lease',
    amount: '₹1,45,000',
    orderId: 'CAP-2026-018',
    requester: 'Dr. Priya Sharma',
    date: '3 hours ago'
  }
];

export const MOCK_NOTIFICATIONS = {
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
};

export const MOCK_DASHBOARD_SETTINGS = {
  defaultLanding: 'Executive Control Center',
  refreshInterval: '30s',
  boardroomPrivacy: false,
  theme: 'Dark Executive',
  showKpis: true,
  highPrecisionNumbers: true
};

export const MOCK_TAXES = [
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
];

export const MOCK_PAYMENTS = {
  primaryGateway: 'Razorpay Enterprise Route (UPI / Netbanking)',
  secondaryGateway: 'Cashfree Instant Payouts API',
  internationalGateway: 'Stripe Global Express',
  upiAutoPay: true,
  codEnabled: true,
  maxCodValue: '₹3,000',
  settlementAccount: 'HDFC Bank Corporate — A/C ending 9421'
};

export const MOCK_DELIVERY = {
  expressRadiusKm: 12,
  expressSlaMins: 60,
  dispatchThresholdMins: 5,
  freeDeliveryMinOrder: 499,
  standardDeliveryFee: 49,
  coldChainEnforced: true,
  primaryFleet: 'Shadowfax Quick & Dunzo for Business',
  secondaryFleet: 'Zenve Dedicated Hyperlocal Courier Team'
};

export const MOCK_INTEGRATIONS = [
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
];

export const MOCK_SECURITY = {
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
};

export const MOCK_BACKUP = {
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
};
