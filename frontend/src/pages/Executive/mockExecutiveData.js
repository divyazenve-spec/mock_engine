/**
 * Zenve BI — Executive Dashboard & CEO Control Center Mock Data
 * Comprehensive cross-divisional enterprise metrics, Board OKRs, business unit economics,
 * capital governance, and balanced scorecard performance indicators.
 */

export const MOCK_EXECUTIVE_KPIS = {
  grossRevenue: '₹1.84 Cr',
  revenueGrowth: '+24.2% YoY',
  netRevenue: '₹1.72 Cr',
  netMargin: '93.3% Net',
  ebitda: '₹18.9L',
  ebitdaMargin: '11.0% EBITDA',
  registeredPetParents: '42,850',
  petParentsGrowth: '+1,840 MTD',
  clinicalPractitioners: '148',
  cliniciansOnDuty: '112 Active Today',
  slaVelocity: '96.8%',
  slaAverageTime: '38.4 mins avg'
};

export const MOCK_DIVISIONAL_CONTRIBUTION = [
  { name: 'Pet Products & Nutrition', pct: 37.2, rev: '₹68.4L', color: '#3b82f6' },
  { name: 'Veterinary Pharmacy & Rx', pct: 31.7, rev: '₹58.4L', color: '#10b981' },
  { name: 'Clinical Care & Surgeries', pct: 15.3, rev: '₹28.2L', color: '#8b5cf6' },
  { name: 'B2B Enterprise & Institutional', pct: 8.0, rev: '₹14.8L', color: '#f59e0b' },
  { name: 'Pet Fashion & Lifestyle', pct: 4.6, rev: '₹8.4L', color: '#ec4899' },
  { name: 'Care Subscriptions & Wellness', pct: 3.2, rev: '₹5.8L', color: '#06b6d4' }
];

export const MOCK_BOARD_OKRS = [
  {
    title: 'Multi-City Hospital Network Expansion',
    lead: 'Dr. Priya Sharma (VP Clinical Services)',
    current: '5 Hubs Operational',
    target: '5 Hubs',
    pct: 100,
    status: 'Completed',
    color: '#2563eb'
  },
  {
    title: '60-Minute Hyperlocal Delivery SLA',
    lead: 'Anand Kumar (Head of Logistics & Ops)',
    current: '96.8% On-Time',
    target: '95.0% SLA',
    pct: 102,
    status: 'Exceeded',
    color: '#10b981'
  },
  {
    title: 'Cold-Chain IoT Telemetry & Zero Spoilage',
    lead: 'Karthik S. (Chief Pharmacist)',
    current: '100% Sensors Online (4.1°C)',
    target: '100% Probes',
    pct: 100,
    status: 'Completed',
    color: '#06b6d4'
  },
  {
    title: 'Pet Care Preventive Wellness Subscriptions',
    lead: 'Deepa Nair (VP Growth & Subscriptions)',
    current: '8,420 Active Subscribers',
    target: '10,000 Pets',
    pct: 84.2,
    status: 'On Track',
    color: '#8b5cf6'
  },
  {
    title: 'Blended Gross Margin Optimization',
    lead: 'Siddharth Roy (Chief Financial Officer)',
    current: '40.1% Margin',
    target: '38.5% Benchmark',
    pct: 104,
    status: 'Exceeded',
    color: '#10b981'
  },
  {
    title: 'Veterinary Specialist Retention & Culture',
    lead: 'Ananya Mehra (VP Human Capital)',
    current: '95.4% Retention',
    target: '>92.0% Retention',
    pct: 104,
    status: 'On Track',
    color: '#10b981'
  },
  {
    title: 'Digital e-Prescriptions & VCI Audit Trail',
    lead: 'Dr. Rajesh K (Medical Director)',
    current: '842 MTD Signed e-Rx',
    target: '100% Verifiable',
    pct: 100,
    status: 'Completed',
    color: '#2563eb'
  },
  {
    title: 'LTV to CAC Ratio Optimization',
    lead: 'Rohan Mehra (VP Marketing)',
    current: '4.8x Ratio',
    target: '>4.2x Target',
    pct: 114,
    status: 'Exceeded',
    color: '#10b981'
  },
  {
    title: 'Direct Manufacturer Margin SRA Partnerships',
    lead: 'Vikram Sethi (VP Procurement)',
    current: '10 Partner Brands',
    target: '12 Brands',
    pct: 83.3,
    status: 'On Track',
    color: '#f59e0b'
  },
  {
    title: 'Emergency Trauma Triage Response Speed',
    lead: 'Dr. Sandeep Verma (Chief of Surgery)',
    current: '7.4 Mins Average',
    target: '<10 Mins Target',
    pct: 126,
    status: 'Exceeded',
    color: '#10b981'
  }
];

export const MOCK_BUSINESS_UNITS = [
  {
    name: 'Pet Products & Nutrition',
    lead: 'Rahul Mehta',
    revenue: '₹68.4L',
    pacing: '102.4%',
    margin: '28.6%',
    growth: '+22.1% YoY',
    status: 'On Track'
  },
  {
    name: 'Veterinary Pharmacy & Rx',
    lead: 'Karthik S.',
    revenue: '₹58.4L',
    pacing: '108.4%',
    margin: '34.8%',
    growth: '+32.4% YoY',
    status: 'Outperforming'
  },
  {
    name: 'Clinical Care & Surgeries',
    lead: 'Dr. Priya Sharma',
    revenue: '₹28.2L',
    pacing: '104.2%',
    margin: '62.4%',
    growth: '+28.5% YoY',
    status: 'Healthy'
  },
  {
    name: 'B2B Enterprise & Breeders',
    lead: 'Vikram Sethi',
    revenue: '₹14.8L',
    pacing: '94.0%',
    margin: '22.4%',
    growth: '+18.2% YoY',
    status: 'Stable'
  },
  {
    name: 'Pet Fashion & Lifestyle',
    lead: 'Neha Kapur',
    revenue: '₹8.4L',
    pacing: '98.5%',
    margin: '48.2%',
    growth: '+16.8% YoY',
    status: 'On Track'
  },
  {
    name: 'Care Subscriptions & Wellness',
    lead: 'Deepa Nair',
    revenue: '₹5.8L',
    pacing: '112.0%',
    margin: '78.5%',
    growth: '+54.0% YoY',
    status: 'High Growth'
  }
];

export const MOCK_EXECUTIVE_DECISIONS = [
  {
    id: 'DEC-2026-081',
    action: 'Capex Authorization: Automated Cold Reefer & Storage Expansion in Mumbai MMR Hub',
    owner: 'Anand Kumar (Logistics)',
    capital: '₹24.5L Capex',
    priority: 'High'
  },
  {
    id: 'DEC-2026-082',
    action: 'Board Ratification: Form 20/21 Statutory Schedule H Narcotic Register Protocol',
    owner: 'Karthik S. (Pharmacy)',
    capital: 'Statutory Policy',
    priority: 'Completed'
  },
  {
    id: 'DEC-2026-083',
    action: 'Lease Commitment: Electronic City 24/7 Veterinary Trauma Hospital Annex',
    owner: 'Dr. Priya Sharma (Clinical)',
    capital: '₹18.0L Annual Lease',
    priority: 'High'
  },
  {
    id: 'DEC-2026-084',
    action: 'Software Procurement: Multi-Region Cloud Disaster Recovery & DB Replication',
    owner: 'Tarun V. (Engineering)',
    capital: '₹8.2L / yr SaaS',
    priority: 'Medium'
  },
  {
    id: 'DEC-2026-085',
    action: 'Master SRA Contract: Direct Pharmaceutical Margin Terms with Zoetis India',
    owner: 'Vikram Sethi (Procurement)',
    capital: '₹45.0L Quarterly PO',
    priority: 'Completed'
  },
  {
    id: 'DEC-2026-086',
    action: 'Clinical ESOP Pool Allocation: Retention Incentives for Chief Surgeons',
    owner: 'Ananya Mehra (HR)',
    capital: '2.5% Equity Pool',
    priority: 'Approved'
  },
  {
    id: 'DEC-2026-087',
    action: 'Hyperlocal Fleet Underwriting: Group Accident Insurance for 120 Delivery Riders',
    owner: 'Anand Kumar (Logistics)',
    capital: '₹6.4L Annual Premium',
    priority: 'Completed'
  },
  {
    id: 'DEC-2026-088',
    action: 'Laboratory Equipment Lease: Advanced Hematology & PCR Thermal Cycler',
    owner: 'Dr. Rajesh K (Diagnostics)',
    capital: '₹14.2L Equipment',
    priority: 'Medium'
  }
];

export const MOCK_CAPITAL_ALLOCATION = [
  {
    pillar: 'Hospital Facilities & Clinical Capex',
    allocation: '₹1.20 Cr',
    deployed: '₹84.5L',
    solvency: '2.8x Coverage'
  },
  {
    pillar: 'Working Capital (Formulary & Stock)',
    allocation: '₹80.0L',
    deployed: '₹52.4L',
    solvency: '3.4x Coverage'
  },
  {
    pillar: 'Technology & AI Infrastructure',
    allocation: '₹45.0L',
    deployed: '₹32.8L',
    solvency: '4.1x Coverage'
  },
  {
    pillar: 'Marketing & Pet Parent Acquisition',
    allocation: '₹35.0L',
    deployed: '₹24.2L',
    solvency: '3.8x Coverage'
  }
];

export const MOCK_PL_STATEMENT = [
  { label: 'Gross Billed Revenue (MRP)', val: '₹1,84,00,000', bold: true, hl: false, neg: false },
  { label: 'Customer Schemes & Loyalty Discounts', val: '- ₹12,40,000', bold: false, hl: false, neg: true },
  { label: 'Net Recognized Revenue', val: '₹1,71,60,000', bold: true, hl: true, neg: false },
  { label: 'Cost of Goods Sold (Medicines & Pet Essentials)', val: '- ₹1,02,80,000', bold: false, hl: false, neg: true },
  { label: 'Gross Operating Margin (40.1%)', val: '₹68,80,000', bold: true, hl: false, neg: false },
  { label: 'Clinical, Veterinary & Ops Payroll', val: '- ₹28,50,000', bold: false, hl: false, neg: true },
  { label: 'Logistics Fleet & 60-Minute Last-Mile', val: '- ₹9,20,000', bold: false, hl: false, neg: true },
  { label: 'Hospital Facility Leases & Utilities', val: '- ₹8,40,000', bold: false, hl: false, neg: true },
  { label: 'Cloud Infrastructure & AI Systems', val: '- ₹3,80,000', bold: false, hl: false, neg: true },
  { label: 'Consolidated EBITDA (11.0%)', val: '₹18,90,000', bold: true, hl: true, neg: false }
];

export const MOCK_GEOGRAPHIC_CLUSTERS = [
  { name: 'Bengaluru Central & South (HQ)', rev: '₹74.8L', pct: 40.7, footfall: '18,420 Visits' },
  { name: 'Mumbai MMR & Thane Corridor', rev: '₹46.2L', pct: 25.1, footfall: '11,280 Visits' },
  { name: 'Delhi NCR (Gurgaon & Noida)', rev: '₹34.5L', pct: 18.8, footfall: '8,420 Visits' },
  { name: 'Hyderabad Cyberabad Hub', rev: '₹17.4L', pct: 9.5, footfall: '4,680 Visits' },
  { name: 'Pune Urban & PCMC Cluster', rev: '₹11.1L', pct: 6.0, footfall: '3,120 Visits' }
];

export const MOCK_BALANCED_KPIS = [
  { category: 'Financial', metric: 'Monthly Enterprise Revenue', target: '₹1.75 Cr', actual: '₹1.84 Cr', variance: '+5.1%', status: 'Target Met' },
  { category: 'Financial', metric: 'Operating EBITDA Margin', target: '10.0%', actual: '11.0%', variance: '+1.0%', status: 'Target Met' },
  { category: 'Financial', metric: 'Blended Gross Margin', target: '38.5%', actual: '40.1%', variance: '+1.6%', status: 'Target Met' },
  { category: 'Operational', metric: '60-Minute Rapid Delivery SLA', target: '95.0%', actual: '96.8%', variance: '+1.8%', status: 'Target Met' },
  { category: 'Operational', metric: 'Pharmacy Formulary Stockout Rate', target: '<2.5%', actual: '1.4%', variance: '-1.1%', status: 'Target Met' },
  { category: 'Clinical', metric: 'Veterinary Consultation Volume', target: '3,200', actual: '3,420', variance: '+6.9%', status: 'Target Met' },
  { category: 'Clinical', metric: 'Antibiotic Stewardship Compliance', target: '100.0%', actual: '100.0%', variance: '0.0%', status: 'Target Met' },
  { category: 'Customer', metric: 'Pet Parent Net Promoter Score (NPS)', target: '72', actual: '78', variance: '+6 pts', status: 'Target Met' },
  { category: 'Customer', metric: '12-Month Chronic Refill Retention', target: '70.0%', actual: '74.2%', variance: '+4.2%', status: 'Target Met' },
  { category: 'Growth', metric: 'Active Wellness Club Subscribers', target: '8,000', actual: '8,420', variance: '+5.3%', status: 'Target Met' }
];
