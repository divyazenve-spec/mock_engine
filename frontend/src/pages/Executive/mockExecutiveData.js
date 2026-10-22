/**
 * Zenve BI — Executive Dashboard & CEO Control Center Mock Data
 * Comprehensive cross-divisional enterprise metrics, Board OKRs, business unit economics,
 * capital governance, and balanced scorecard performance indicators.
 */

export const MOCK_EXECUTIVE_KPIS = {
  grossRevenue: '₹1,42,85,000',
  revenueGrowth: '+18.4% YoY',
  netRevenue: '₹26,10,200',
  netMargin: '18.3% PAT',
  ebitda: '₹34,28,400',
  ebitdaMargin: '24.0% EBITDA',
  registeredPetParents: '12,480',
  petParentsGrowth: '+18.4% YoY',
  clinicalPractitioners: '42 Clinicians',
  cliniciansOnDuty: 'Across 10 Centers',
  slaVelocity: '98.8%',
  slaAverageTime: '28.4 mins avg'
};

export const MOCK_DIVISIONAL_CONTRIBUTION = [
  { name: 'Pet Products & Nutrition', pct: 37.2, rev: '₹68.4L', color: '#3b82f6' },
  { name: 'Veterinary Pharmacy & Rx', pct: 31.7, rev: '₹58.4L', color: '#10b981' },
  { name: 'Clinical Care & Surgeries', pct: 15.3, rev: '₹28.2L', color: '#8b5cf6' },
  { name: 'Veterinary Diagnostics & Pathology', pct: 11.7, rev: '₹21.6L', color: '#06b6d4' },
  { name: 'Emergency & 24/7 ICU Trauma', pct: 9.0, rev: '₹16.5L', color: '#f43f5e' },
  { name: 'B2B Enterprise & Institutional', pct: 8.0, rev: '₹14.8L', color: '#f59e0b' },
  { name: 'Preventive Care Subscriptions', pct: 7.0, rev: '₹12.8L', color: '#6366f1' },
  { name: 'Pet Grooming & Spa Services', pct: 5.1, rev: '₹9.4L', color: '#a855f7' },
  { name: 'Pet Fashion & Lifestyle', pct: 4.6, rev: '₹8.4L', color: '#ec4899' },
  { name: 'Digital Telehealth & Remote Monitoring', pct: 3.0, rev: '₹5.5L', color: '#14b8a6' }
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
    volume: '18,450 Orders',
    growth: '+22.1% YoY',
    status: 'Outperforming'
  },
  {
    name: 'Veterinary Pharmacy & Rx',
    lead: 'Karthik S.',
    revenue: '₹58.4L',
    pacing: '108.4%',
    margin: '34.8%',
    volume: '842 e-Rx Filled',
    growth: '+32.4% YoY',
    status: 'Outperforming'
  },
  {
    name: 'Clinical Care & Surgeries',
    lead: 'Dr. Priya Sharma',
    revenue: '₹28.2L',
    pacing: '104.2%',
    margin: '62.4%',
    volume: '3,420 Consults',
    growth: '+28.5% YoY',
    status: 'Healthy'
  },
  {
    name: 'Veterinary Diagnostics & Pathology',
    lead: 'Dr. Rajesh K',
    revenue: '₹21.6L',
    pacing: '106.5%',
    margin: '58.2%',
    volume: '2,180 Lab Panels',
    growth: '+29.4% YoY',
    status: 'Outperforming'
  },
  {
    name: 'Emergency & 24/7 ICU Trauma',
    lead: 'Dr. Vikramaditya Rathore',
    revenue: '₹16.5L',
    pacing: '112.0%',
    margin: '65.0%',
    volume: '480 Trauma Cases',
    growth: '+35.2% YoY',
    status: 'High Growth'
  },
  {
    name: 'B2B Enterprise & Breeders',
    lead: 'Vikram Sethi',
    revenue: '₹14.8L',
    pacing: '94.0%',
    margin: '22.4%',
    volume: '42 Accounts',
    growth: '+18.2% YoY',
    status: 'Stable'
  },
  {
    name: 'Preventive Care Subscriptions & Wellness',
    lead: 'Deepa Nair',
    revenue: '₹12.8L',
    pacing: '118.5%',
    margin: '78.5%',
    volume: '8,420 Pets Active',
    growth: '+54.0% YoY',
    status: 'High Growth'
  },
  {
    name: 'Pet Grooming & Spa Services',
    lead: 'Sneha Kapoor',
    revenue: '₹9.4L',
    pacing: '97.2%',
    margin: '44.0%',
    volume: '1,260 Sessions',
    growth: '+14.5% YoY',
    status: 'On Track'
  },
  {
    name: 'Pet Fashion, Travel & Lifestyle',
    lead: 'Neha Kapur',
    revenue: '₹8.4L',
    pacing: '98.5%',
    margin: '48.2%',
    volume: '1,840 Items',
    growth: '+16.8% YoY',
    status: 'On Track'
  },
  {
    name: 'Digital Telehealth & Remote Monitoring',
    lead: 'Dr. Divya Reddy',
    revenue: '₹5.5L',
    pacing: '105.0%',
    margin: '82.0%',
    volume: '920 Tele-consults',
    growth: '+42.0% YoY',
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
  },
  {
    id: 'DEC-2026-089',
    action: 'Enterprise Fulfillment Depot: 25,000 sq ft Logistics Hub in Bhiwandi Corridor',
    owner: 'Anand Kumar (Logistics)',
    capital: '₹32.0L Capex',
    priority: 'High'
  },
  {
    id: 'DEC-2026-090',
    action: 'Board Dividend & Retained Earnings: Q3 Operating Solvency Reinvestment Plan',
    owner: 'Siddharth Roy (CFO)',
    capital: '₹50.0L Retained',
    priority: 'Approved'
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
  { label: 'Gross Invoiced Revenue', val: '₹1,42,85,000', bold: true, hl: false, neg: false },
  { label: 'Direct Cost of Goods Sold (COGS)', val: '- ₹62,85,000', bold: false, hl: false, neg: true },
  { label: 'Gross Operating Margin (56.0%)', val: '₹80,00,000', bold: true, hl: false, neg: false },
  { label: 'Clinical Salaries & Doctor Fees', val: '- ₹24,80,000', bold: false, hl: false, neg: true },
  { label: 'Hospital Facility Leases (14 Units)', val: '- ₹11,50,000', bold: false, hl: false, neg: true },
  { label: 'Utilities, Digital Infrastructure & EHR', val: '- ₹9,41,600', bold: false, hl: false, neg: true },
  { label: 'Total Operating Expenses (OPEX)', val: '- ₹45,71,600', bold: false, hl: false, neg: true },
  { label: 'Consolidated EBITDA (24.0%)', val: '₹34,28,400', bold: true, hl: true, neg: false },
  { label: 'Depreciation, Amortization & Finance', val: '- ₹4,98,133', bold: false, hl: false, neg: true },
  { label: 'Net Profit After Tax (PAT: 18.3%)', val: '₹26,10,200', bold: true, hl: true, neg: false }
];

export const MOCK_GEOGRAPHIC_CLUSTERS = [
  { name: 'Bengaluru Central & South (HQ)', rev: '₹74.8L', pct: 40.7, hubs: '18 Centers', footfall: '18,420 Visits', mom: '+18.4%', pos: 'Dominant' },
  { name: 'Mumbai MMR & Western Suburban', rev: '₹46.2L', pct: 25.1, hubs: '10 Centers', footfall: '11,280 Visits', mom: '+22.1%', pos: 'Co-Leader' },
  { name: 'Delhi NCR (Gurgaon & South Delhi)', rev: '₹34.5L', pct: 18.8, hubs: '6 Centers', footfall: '8,420 Visits', mom: '+26.5%', pos: 'Rapid Expansion' },
  { name: 'Hyderabad Cyberabad & Gachibowli', rev: '₹17.4L', pct: 9.5, hubs: '4 Centers', footfall: '4,680 Visits', mom: '+31.0%', pos: 'Fast Scaling' },
  { name: 'Pune Urban (Koregaon & Baner)', rev: '₹11.1L', pct: 6.0, hubs: '3 Centers', footfall: '3,120 Visits', mom: '+34.2%', pos: 'High Growth' },
  { name: 'Chennai OMR & Adyar Hub', rev: '₹9.8L', pct: 5.3, hubs: '2 Centers', footfall: '2,840 Visits', mom: '+28.0%', pos: 'Scaling' },
  { name: 'Kolkata Salt Lake & New Town', rev: '₹7.2L', pct: 3.9, hubs: '2 Centers', footfall: '1,950 Visits', mom: '+24.5%', pos: 'New Launch' },
  { name: 'Ahmedabad SG Highway Center', rev: '₹6.5L', pct: 3.5, hubs: '2 Centers', footfall: '1,820 Visits', mom: '+32.1%', pos: 'New Launch' },
  { name: 'Chandigarh Tri-City Corridor', rev: '₹5.2L', pct: 2.8, hubs: '1 Center', footfall: '1,410 Visits', mom: '+29.0%', pos: 'Emerging' },
  { name: 'Kochi Coastal Marine Drive Center', rev: '₹4.3L', pct: 2.3, hubs: '1 Center', footfall: '1,180 Visits', mom: '+38.5%', pos: 'Emerging' }
];

export const MOCK_BALANCED_KPIS = [
  { category: 'Financial', metric: 'Monthly Enterprise Revenue', target: '₹1.35 Cr', actual: '₹1,42,85,000', variance: '+5.8%', status: 'Target Met' },
  { category: 'Financial', metric: 'Operating EBITDA Margin', target: '20.0%', actual: '24.0%', variance: '+4.0%', status: 'Target Met' },
  { category: 'Financial', metric: 'Blended Gross Margin', target: '50.0%', actual: '56.0%', variance: '+6.0%', status: 'Target Met' },
  { category: 'Operational', metric: '60-Minute Rapid Delivery SLA', target: '95.0%', actual: '98.8%', variance: '+3.8%', status: 'Target Met' },
  { category: 'Operational', metric: 'Pharmacy Formulary Stockout Rate', target: '<2.5%', actual: '1.4%', variance: '-1.1%', status: 'Target Met' },
  { category: 'Clinical', metric: 'Veterinary Consultation Volume', target: '3,200', actual: '3,480', variance: '+8.8%', status: 'Target Met' },
  { category: 'Clinical', metric: 'Antibiotic Stewardship Compliance', target: '100.0%', actual: '100.0%', variance: '0.0%', status: 'Target Met' },
  { category: 'Customer', metric: 'Pet Parent Customer CSAT Score', target: '92.0%', actual: '96.4%', variance: '+4.4%', status: 'Target Met' },
  { category: 'Customer', metric: '12-Month Chronic Refill Retention', target: '70.0%', actual: '74.8%', variance: '+4.8%', status: 'Target Met' },
  { category: 'Growth', metric: 'Active Total Customer Base', target: '10,000', actual: '12,480', variance: '+24.8%', status: 'Target Met' }
];
