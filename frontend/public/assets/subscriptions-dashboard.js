/* =====================================================================
   Zenve BI — Subscriptions Executive Control Center & Dashboards
   Suite (8 Subdomains):
     1. Subscription Dashboard    (#subscription-dashboard / #subscriptions)
     2. Active Subscriptions      (#active-subscriptions)
     3. New Subscriptions         (#new-subscriptions)
     4. Renewals                  (#renewals / #subscription-renewals)
     5. Expiring Subscriptions    (#expiring-subscriptions)
     6. Churn                     (#churn / #subscription-churn)
     7. Subscription Revenue      (#subscription-revenue)
     8. Subscription Analytics    (#subscription-analytics)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 8 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',   label: 'Subscription Dashboard', icon: '🔄', hash: '#subscription-dashboard', badge: '10', title: 'Recurring Subscriptions & Pet Wellness Memberships', sub: 'Monthly recurring revenue (MRR), automated doorstep auto-shipments, preventive wellness plans, and subscriber cohorts' },
    { id: 'active',      label: 'Active Subscriptions',   icon: '✅', hash: '#active-subscriptions',   badge: '10', title: 'Active Member Roster & Auto-Debit Mandates', sub: 'Live subscriber cohort, e-mandate banking authorizations, recurring fulfillment status, and pet health profiles' },
    { id: 'new',         label: 'New Subscriptions',      icon: '✨', hash: '#new-subscriptions',      badge: '10', title: 'New Subscriber Acquisition & Channel Velocity', sub: 'Monthly new subscriber signups, acquisition channel conversion, customer acquisition cost (CAC), and payback period' },
    { id: 'renewals',    label: 'Renewals',               icon: '🔄', hash: '#renewals',               badge: '10', title: 'Automated Billing Cycles & Renewal Rates', sub: 'Monthly automated debit execution, dunning management, card & UPI retry algorithms, and successful collection velocity' },
    { id: 'expiring',    label: 'Expiring Subscriptions', icon: '⏳', hash: '#expiring-subscriptions', badge: '10', title: 'Upcoming Expiries & Proactive Retention Alerts', sub: 'Annual membership renewals due in 30 days, token expiration mitigation, and concierge outreach pipeline' },
    { id: 'churn',       label: 'Churn',                  icon: '📉', hash: '#churn',                  badge: '10', title: 'Subscriber Churn Analytics & Root Cause Mitigation', sub: 'Voluntary and involuntary churn analysis, exit survey insights, revenue attrition, and win-back campaigns' },
    { id: 'revenue',     label: 'Subscription Revenue',   icon: '💵', hash: '#subscription-revenue',   badge: '10', title: 'Recurring Revenue (MRR / ARR) Trajectory', sub: 'Monthly recurring revenue breakdown, annualized contract run rates, expansion revenue, and gross margins' },
    { id: 'analytics',   label: 'Subscription Analytics', icon: '📊', hash: '#subscription-analytics', badge: '10', title: 'Cohort Retention & Lifetime Value (LTV) Deep-Dive', sub: 'Multi-month retention heatmaps, customer lifetime value expansion, payback velocity, and subscriber health scores' }
  ];

  /* ── Master Datasets (10 Items in Each Subdomain) ─────────────────── */
  var PLANS = [
    { id: 'SUB-PLN-01', name: 'Puppy & Kitten Complete Wellness', price: '₹1,499 / mo', activeSubscribers: 184, mrr: '₹2,75,816', renewalRate: '97.4%', churn: '0.6%', benefits: 'Unlimited Vet Consults, Vaccinations & Deworming' },
    { id: 'SUB-PLN-02', name: 'Adult Canine Preventive Care', price: '₹1,999 / mo', activeSubscribers: 212, mrr: '₹4,23,788', renewalRate: '96.8%', churn: '0.8%', benefits: 'Annual Blood Panel, Dental Scaling & Flea/Tick' },
    { id: 'SUB-PLN-03', name: 'Senior Pet Chronic Care & Mobility', price: '₹2,999 / mo', activeSubscribers: 96, mrr: '₹2,87,904', renewalRate: '98.2%', churn: '0.5%', benefits: 'Joint Supplements, Renal Screens & Physiotherapy' },
    { id: 'SUB-PLN-04', name: 'Feline Essential Health & Nutrition', price: '₹1,299 / mo', activeSubscribers: 145, mrr: '₹1,88,355', renewalRate: '96.2%', churn: '0.9%', benefits: 'Core FVRCP, Dental Checkups & Wet Food Delivery' },
    { id: 'SUB-PLN-05', name: 'Zenve Prime Fresh Nutrition Auto-Ship', price: '₹3,499 / mo', activeSubscribers: 168, mrr: '₹5,87,832', renewalRate: '98.8%', churn: '0.4%', benefits: 'Custom Fresh Food Pouches & Probiotics Bi-weekly' },
    { id: 'SUB-PLN-06', name: 'Dermatology & Allergy Relief Care', price: '₹2,499 / mo', activeSubscribers: 82, mrr: '₹2,04,918', renewalRate: '95.9%', churn: '1.1%', benefits: 'Cytopoint/Apoquel Injections, Medicated Baths & Diet' },
    { id: 'SUB-PLN-07', name: 'Telehealth 24/7 Digital Concierge', price: '₹699 / mo', activeSubscribers: 340, mrr: '₹2,37,660', renewalRate: '94.5%', churn: '1.2%', benefits: 'Unlimited Video Consults & 1-Hr Prescription Delivery' },
    { id: 'SUB-PLN-08', name: 'Equine Elite Stables Wellness', price: '₹8,999 / mo', activeSubscribers: 28, mrr: '₹2,51,972', renewalRate: '99.1%', churn: '0.3%', benefits: 'On-site Equine Vet Visits, Parasite Control & Injections' },
    { id: 'SUB-PLN-09', name: 'Avian & Exotic Specialist Membership', price: '₹1,799 / mo', activeSubscribers: 54, mrr: '₹97,146', renewalRate: '95.4%', churn: '1.0%', benefits: 'Specialist Avian Consults, Beak Trimming & Vitamins' },
    { id: 'SUB-PLN-10', name: 'Multi-Pet Family Platinum Care', price: '₹4,499 / mo', activeSubscribers: 75, mrr: '₹3,37,425', renewalRate: '98.5%', churn: '0.5%', benefits: 'Covers up to 3 Pets, Free Clinic Emergencies & Grooming' }
  ];

  var SUBSCRIBERS = [
    { subId: 'SUB-ACT-1001', petName: 'Rocky (Golden Retriever)', parent: 'Arunachalam Murthy', plan: 'Puppy & Kitten Complete Wellness', autoDebit: 'UPI AutoPay (HDFC)', monthlyFee: '₹1,499', nextRenewal: '18 Oct 2026', status: 'Active' },
    { subId: 'SUB-ACT-1002', petName: 'Bella (Persian Cat)', parent: 'Pooja Venkatesh', plan: 'Feline Essential Health & Nutrition', autoDebit: 'Credit Card E-Mandate (ICICI)', monthlyFee: '₹1,299', nextRenewal: '20 Oct 2026', status: 'Active' },
    { subId: 'SUB-ACT-1003', petName: 'Bruno (German Shepherd)', parent: 'Vikramaditya Rao', plan: 'Zenve Prime Fresh Nutrition Auto-Ship', autoDebit: 'UPI AutoPay (Google Pay / SBI)', monthlyFee: '₹3,499', nextRenewal: '22 Oct 2026', status: 'Active' },
    { subId: 'SUB-ACT-1004', petName: 'Max (Labrador 9yr)', parent: 'Sunita Deshmukh', plan: 'Senior Pet Chronic Care & Mobility', autoDebit: 'E-NACH Mandate (Axis Bank)', monthlyFee: '₹2,999', nextRenewal: '16 Oct 2026', status: 'Active' },
    { subId: 'SUB-ACT-1005', petName: 'Leo (Shih Tzu)', parent: 'Kavita Singhania', plan: 'Dermatology & Allergy Relief Care', autoDebit: 'Debit Card Mandate (Kotak)', monthlyFee: '₹2,499', nextRenewal: '19 Oct 2026', status: 'Active' },
    { subId: 'SUB-ACT-1006', petName: 'Milo & Oscar (Beagles)', parent: 'Rajesh Kulkarni', plan: 'Multi-Pet Family Platinum Care', autoDebit: 'Credit Card E-Mandate (HDFC)', monthlyFee: '₹4,499', nextRenewal: '25 Oct 2026', status: 'Active' },
    { subId: 'SUB-ACT-1007', petName: 'Simba (Indie Pup)', parent: 'Ananya Sharma', plan: 'Puppy & Kitten Complete Wellness', autoDebit: 'UPI AutoPay (PhonePe / Axis)', monthlyFee: '₹1,499', nextRenewal: '21 Oct 2026', status: 'Active' },
    { subId: 'SUB-ACT-1008', petName: 'Zara (Siberian Husky)', parent: 'Aditya Malhotra', plan: 'Adult Canine Preventive Care', autoDebit: 'Credit Card Mandate (Amex)', monthlyFee: '₹1,999', nextRenewal: '24 Oct 2026', status: 'Active' },
    { subId: 'SUB-ACT-1009', petName: 'Shadow (British Shorthair)', parent: 'Meera Nambiar', plan: 'Telehealth 24/7 Digital Concierge', autoDebit: 'UPI AutoPay (Paytm / ICICI)', monthlyFee: '₹699', nextRenewal: '28 Oct 2026', status: 'Active' },
    { subId: 'SUB-ACT-1010', petName: 'Thunderbolt (Stallion)', parent: 'Captain R. S. Rathore', plan: 'Equine Elite Stables Wellness', autoDebit: 'Corporate RTGS Standing Mandate', monthlyFee: '₹8,999', nextRenewal: '30 Oct 2026', status: 'Active' }
  ];

  var ACQUISITIONS = [
    { channel: 'In-Clinic Vet Doctor Referrals', newSubs: 142, cac: '₹420', conversion: '42.8%', mrrAdded: '₹2,98,000', payback: '14 Days' },
    { channel: 'Puppy Vaccination Drive Camp', newSubs: 98, cac: '₹580', conversion: '36.4%', mrrAdded: '₹1,68,000', payback: '18 Days' },
    { channel: 'Doorstep Vet Home Visit Upsell', newSubs: 76, cac: '₹490', conversion: '31.2%', mrrAdded: '₹1,74,000', payback: '16 Days' },
    { channel: 'Zenve Mobile App Onboarding Flow', newSubs: 115, cac: '₹310', conversion: '24.5%', mrrAdded: '₹1,85,000', payback: '12 Days' },
    { channel: 'Instagram Pet Influencer Campaign', newSubs: 64, cac: '₹780', conversion: '18.6%', mrrAdded: '₹1,32,000', payback: '28 Days' },
    { channel: 'Partner Pet Grooming Salons', newSubs: 52, cac: '₹620', conversion: '22.4%', mrrAdded: '₹1,18,000', payback: '21 Days' },
    { channel: 'Google Search High-Intent Ads', newSubs: 88, cac: '₹890', conversion: '28.0%', mrrAdded: '₹1,94,000', payback: '26 Days' },
    { channel: 'Corporate Pet Wellness (B2B Perks)', newSubs: 65, cac: '₹350', conversion: '48.2%', mrrAdded: '₹1,42,000', payback: '11 Days' },
    { channel: 'Pet Adoption Shelter Welcome Kit', newSubs: 43, cac: '₹260', conversion: '38.5%', mrrAdded: '₹68,000', payback: '9 Days' },
    { channel: 'WhatsApp Concierge Reactivation Bot', newSubs: 39, cac: '₹180', conversion: '29.4%', mrrAdded: '₹76,000', payback: '7 Days' }
  ];

  var RENEWALS = [
    { cohort: 'Cycle-2026-10-A (1st-5th)', scheduled: 420, successful: '408 Success (97.1%)', retryQueue: '10 In Retry', failed: '2 Failed', rate: '97.1%', processedRev: '₹8,74,000' },
    { cohort: 'Cycle-2026-10-B (6th-10th)', scheduled: 380, successful: '369 Success (97.1%)', retryQueue: '8 In Retry', failed: '3 Failed', rate: '97.1%', processedRev: '₹7,92,000' },
    { cohort: 'Cycle-2026-09-C (21st-25th)', scheduled: 350, successful: '341 Success (97.4%)', retryQueue: '6 In Retry', failed: '3 Failed', rate: '97.4%', processedRev: '₹7,28,000' },
    { cohort: 'Cycle-2026-09-B (11th-15th)', scheduled: 395, successful: '385 Success (97.5%)', retryQueue: '7 In Retry', failed: '3 Failed', rate: '97.5%', processedRev: '₹8,22,000' },
    { cohort: 'Cycle-2026-09-A (1st-5th)', scheduled: 410, successful: '399 Success (97.3%)', retryQueue: '8 In Retry', failed: '3 Failed', rate: '97.3%', processedRev: '₹8,52,000' },
    { cohort: 'Cycle-2026-08-D (26th-31st)', scheduled: 320, successful: '312 Success (97.5%)', retryQueue: '6 In Retry', failed: '2 Failed', rate: '97.5%', processedRev: '₹6,65,000' },
    { cohort: 'Cycle-2026-08-C (16th-20th)', scheduled: 360, successful: '350 Success (97.2%)', retryQueue: '8 In Retry', failed: '2 Failed', rate: '97.2%', processedRev: '₹7,48,000' },
    { cohort: 'Cycle-2026-08-B (6th-10th)', scheduled: 375, successful: '365 Success (97.3%)', retryQueue: '7 In Retry', failed: '3 Failed', rate: '97.3%', processedRev: '₹7,80,000' },
    { cohort: 'Cycle-2026-08-A (1st-5th)', scheduled: 390, successful: '381 Success (97.7%)', retryQueue: '6 In Retry', failed: '3 Failed', rate: '97.7%', processedRev: '₹8,12,000' },
    { cohort: 'Cycle-2026-07-D (26th-31st)', scheduled: 310, successful: '302 Success (97.4%)', retryQueue: '5 In Retry', failed: '3 Failed', rate: '97.4%', processedRev: '₹6,45,000' }
  ];

  var EXPIRING = [
    { subId: 'SUB-EXP-301', petName: 'Simba (Golden Retriever)', parent: 'Rahul Khanna', plan: 'Annual Preventive Care Plan', expiryDate: 'Expiring in 3 Days (16 Oct)', val: '₹21,999 / yr', action: 'Automated WhatsApp Notice Sent' },
    { subId: 'SUB-EXP-302', petName: 'Cookie (Cocker Spaniel)', parent: 'Divya Sundaram', plan: 'Senior Canine Health Comprehensive', expiryDate: 'Expiring in 5 Days (18 Oct)', val: '₹32,999 / yr', action: 'Concierge Call Completed - Confirmed' },
    { subId: 'SUB-EXP-303', petName: 'Bella (Persian Cat)', parent: 'Naveen Chhabra', plan: 'Feline Complete Annual Care', expiryDate: 'Expiring in 7 Days (20 Oct)', val: '₹14,999 / yr', action: 'Card Token Expiry - Update Link Sent' },
    { subId: 'SUB-EXP-304', petName: 'Zeus (Rottweiler)', parent: 'Gaurav Aggarwal', plan: 'Adult Canine Preventive Care', expiryDate: 'Expiring in 9 Days (22 Oct)', val: '₹23,999 / yr', action: 'Renewal Discount Code Activated (10%)' },
    { subId: 'SUB-EXP-305', petName: 'Milo (Beagle)', parent: 'Deepika Raman', plan: 'Zenve Nutrition Annual Subscription', expiryDate: 'Expiring in 12 Days (25 Oct)', val: '₹38,400 / yr', action: 'Auto-Renewal Pre-Approved' },
    { subId: 'SUB-EXP-306', petName: 'Cleo (Siamese Cat)', parent: 'Sneha Kothari', plan: 'Feline Essential Health Care', expiryDate: 'Expiring in 14 Days (27 Oct)', val: '₹14,999 / yr', action: 'Reminder WhatsApp & SMS Delivered' },
    { subId: 'SUB-EXP-307', petName: 'Tiger (German Shepherd)', parent: 'Siddharth Verma', plan: 'Multi-Pet Family Platinum Care', expiryDate: 'Expiring in 18 Days (31 Oct)', val: '₹48,999 / yr', action: 'Clinic Nurse Consultation Scheduled' },
    { subId: 'SUB-EXP-308', petName: 'Oreo (Shih Tzu)', parent: 'Pooja Hegde', plan: 'Dermatology Allergy Long-Term Plan', expiryDate: 'Expiring in 21 Days (03 Nov)', val: '₹27,499 / yr', action: 'Vet Follow-up Visit Arranged' },
    { subId: 'SUB-EXP-309', petName: 'Shadow (Labrador)', parent: 'Karan Mehra', plan: 'Puppy Year-1 Graduation Renewal', expiryDate: 'Expiring in 24 Days (06 Nov)', val: '₹17,999 / yr', action: 'Adult Plan Upgrade Recommendation Sent' },
    { subId: 'SUB-EXP-310', petName: 'Rusty (Indie Hound)', parent: 'Tanvi Shah', plan: 'Preventive Healthcare & Vaccination', expiryDate: 'Expiring in 28 Days (10 Nov)', val: '₹12,999 / yr', action: 'Doorstep Vet Visit Booked' }
  ];

  var CHURN_REASONS = [
    { reason: 'Relocated to City Without Zenve Clinic', pct: '24.2%', count: 18, mrrLost: '₹38,400', preventable: 'No (Geographic)', action: 'Offered Telehealth + Courier Medicine Delivery' },
    { reason: 'Pet Passed Away (Bereavement)', pct: '19.5%', count: 14, mrrLost: '₹42,800', preventable: 'No (Life Event)', action: 'Sent Memorial Care Hamper & Paused Records' },
    { reason: 'Financial Hardship / Cost Cutting', pct: '18.0%', count: 13, mrrLost: '₹28,600', preventable: 'Yes (High)', action: 'Downgrade Offer to Telehealth Tier (₹699)' },
    { reason: 'Pet Picky with Food Texture (Nutrition)', pct: '12.4%', count: 9, mrrLost: '₹31,500', preventable: 'Yes (High)', action: 'Free Flavor Consultation & Custom Recipe Switch' },
    { reason: 'Infrequent Clinic Visits (Underutilized)', pct: '10.2%', count: 7, mrrLost: '₹16,400', preventable: 'Yes (Medium)', action: 'Proactive Doorstep Vet Checkup Outreach' },
    { reason: 'Payment Card Expired / Involuntary Drop', pct: '6.8%', count: 5, mrrLost: '₹12,200', preventable: 'Yes (High)', action: 'NPCI Auto-Token Fetch & WhatsApp Mandate Link' },
    { reason: 'Switched to Local Neighborhood Vet', pct: '4.1%', count: 3, mrrLost: '₹8,900', preventable: 'Yes (Medium)', action: 'Matched Service Offer + Free Home Delivery' },
    { reason: 'Temporary Travel / Pet with Relative', pct: '2.8%', count: 2, mrrLost: '₹5,400', preventable: 'Yes (High)', action: 'Enabled Free 90-Day Subscription Pause Mode' },
    { reason: 'Pet Adopted Out / Transferred Ownership', pct: '1.2%', count: 1, mrrLost: '₹2,500', preventable: 'No (Transfer)', action: 'Transferred Subscription Profile to New Owner' },
    { reason: 'Technical App Glitch during Booking', pct: '0.8%', count: 1, mrrLost: '₹1,500', preventable: 'Yes (Critical)', action: 'Resolved in 2 Hours + 1 Month Free Service' }
  ];

  var TIER_REVENUES = [
    { name: 'Zenve Prime Fresh Nutrition Auto-Ship', share: '20.3%', mrr: '₹5,87,832', arr: '₹70,53,984', arpu: '₹3,499', margin: '64.2%', growth: '+38.4% YoY' },
    { name: 'Adult Canine Preventive Care', share: '14.7%', mrr: '₹4,23,788', arr: '₹50,85,456', arpu: '₹1,999', margin: '72.5%', growth: '+24.6% YoY' },
    { name: 'Multi-Pet Family Platinum Care', share: '11.7%', mrr: '₹3,37,425', arr: '₹40,49,100', arpu: '₹4,499', margin: '76.8%', growth: '+42.1% YoY' },
    { name: 'Senior Pet Chronic Care & Mobility', share: '10.0%', mrr: '₹2,87,904', arr: '₹34,54,848', arpu: '₹2,999', margin: '78.4%', growth: '+29.5% YoY' },
    { name: 'Puppy & Kitten Complete Wellness', share: '9.5%', mrr: '₹2,75,816', arr: '₹33,09,792', arpu: '₹1,499', margin: '71.0%', growth: '+18.8% YoY' },
    { name: 'Equine Elite Stables Wellness', share: '8.7%', mrr: '₹2,51,972', arr: '₹30,23,664', arpu: '₹8,999', margin: '82.5%', growth: '+15.2% YoY' },
    { name: 'Telehealth 24/7 Digital Concierge', share: '8.2%', mrr: '₹2,37,660', arr: '₹28,51,920', arpu: '₹699', margin: '88.6%', growth: '+55.0% YoY' },
    { name: 'Dermatology & Allergy Relief Care', share: '7.1%', mrr: '₹2,04,918', arr: '₹24,59,016', arpu: '₹2,499', margin: '74.1%', growth: '+31.2% YoY' },
    { name: 'Feline Essential Health & Nutrition', share: '6.5%', mrr: '₹1,88,355', arr: '₹22,60,260', arpu: '₹1,299', margin: '69.4%', growth: '+22.4% YoY' },
    { name: 'Avian & Exotic Specialist Membership', share: '3.4%', mrr: '₹97,146', arr: '₹11,65,752', arpu: '₹1,799', margin: '79.0%', growth: '+19.0% YoY' }
  ];

  var COHORTS = [
    { cohort: 'Cohort Oct 2025', startingUsers: 180, m3Ret: '94.4%', m6Ret: '91.2%', m9Ret: '88.5%', cumulativeLtv: '₹36,400', ltvCacRatio: '5.2x LTV/CAC' },
    { cohort: 'Cohort Nov 2025', startingUsers: 210, m3Ret: '95.2%', m6Ret: '92.0%', m9Ret: '89.1%', cumulativeLtv: '₹34,200', ltvCacRatio: '4.8x LTV/CAC' },
    { cohort: 'Cohort Dec 2025', startingUsers: 245, m3Ret: '94.8%', m6Ret: '91.5%', m9Ret: '88.0%', cumulativeLtv: '₹32,800', ltvCacRatio: '4.6x LTV/CAC' },
    { cohort: 'Cohort Jan 2026', startingUsers: 220, m3Ret: '96.0%', m6Ret: '93.1%', m9Ret: '89.8%', cumulativeLtv: '₹31,500', ltvCacRatio: '5.1x LTV/CAC' },
    { cohort: 'Cohort Feb 2026', startingUsers: 195, m3Ret: '95.5%', m6Ret: '92.8%', m9Ret: '89.2%', cumulativeLtv: '₹28,600', ltvCacRatio: '4.9x LTV/CAC' },
    { cohort: 'Cohort Mar 2026', startingUsers: 260, m3Ret: '96.4%', m6Ret: '93.5%', m9Ret: '90.2%', cumulativeLtv: '₹26,400', ltvCacRatio: '5.4x LTV/CAC' },
    { cohort: 'Cohort Apr 2026', startingUsers: 230, m3Ret: '95.8%', m6Ret: '92.6%', m9Ret: '89.5%', cumulativeLtv: '₹22,800', ltvCacRatio: '4.7x LTV/CAC' },
    { cohort: 'Cohort May 2026', startingUsers: 275, m3Ret: '96.2%', m6Ret: '93.4%', m9Ret: '90.1%', cumulativeLtv: '₹19,500', ltvCacRatio: '5.0x LTV/CAC' },
    { cohort: 'Cohort Jun 2026', startingUsers: 290, m3Ret: '96.8%', m6Ret: '94.0%', m9Ret: '90.8%', cumulativeLtv: '₹16,200', ltvCacRatio: '5.3x LTV/CAC' },
    { cohort: 'Cohort Jul 2026', startingUsers: 310, m3Ret: '97.1%', m6Ret: '94.5%', m9Ret: '91.4%', cumulativeLtv: '₹12,800', ltvCacRatio: '5.6x LTV/CAC' }
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: ''
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('b2b') >= 0 || h.indexOf('enterprise') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0) {
      return null;
    }
    if (h === 'subscription-dashboard' || h === 'subscriptions' || h === 'subscription') return 'dashboard';
    if (h === 'active-subscriptions' || h === 'active-subs') return 'active';
    if (h === 'new-subscriptions' || h === 'new-subs') return 'new';
    if (h === 'renewals' || h === 'subscription-renewals') return 'renewals';
    if (h === 'expiring-subscriptions' || h === 'expiring') return 'expiring';
    if (h === 'churn' || h === 'subscription-churn') return 'churn';
    if (h === 'subscription-revenue' || h === 'mrr') return 'revenue';
    if (h === 'subscription-analytics') return 'analytics';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('fashion') >= 0 || raw.indexOf('b2b') >= 0) return null;

    if (raw === 'subscription dashboard' || raw === 'subscriptions') return 'dashboard';
    if (raw === 'active subscriptions') return 'active';
    if (raw === 'new subscriptions') return 'new';
    if (raw === 'renewals') return 'renewals';
    if (raw === 'expiring subscriptions') return 'expiring';
    if (raw === 'churn') return 'churn';
    if (raw === 'subscription revenue') return 'revenue';
    if (raw === 'subscription analytics') return 'analytics';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zsub-kpi">',
        '<div class="zsub-kpi-top">',
          '<span class="zsub-kpi-label">' + esc(label) + '</span>',
          '<span class="zsub-kpi-icon">' + esc(icon || '🔄') + '</span>',
        '</div>',
        '<div class="zsub-kpi-val">' + esc(val) + '</div>',
        '<div class="zsub-kpi-bottom">',
          '<span class="zsub-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'neutral') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zsub-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains (10 Records Rendered in Each) ──────────────── */
  function renderDashboard() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Monthly Recurring Rev (MRR)', '₹28.92 L', '+14.6% MoM', 'up', 'Annualized ARR: ₹3.47 Cr', '🔄'),
        kpiHtml('Active Paying Subscribers', '1,388 Pets', 'Across 10 recurring plans', 'up', 'Recurring subscriber base', '👥'),
        kpiHtml('Subscriber Renewal Rate', '97.2%', 'Automated UPI / Card mandates', 'up', 'Auto-debit adherence', '🛡️'),
        kpiHtml('Gross Monthly Churn', '0.7%', '-0.3% vs Q2 benchmark', 'up', 'Monthly churn metrics', '📉'),
        kpiHtml('Average Revenue / User (ARPU)', '₹2,084 / mo', '+8.4% YoY', 'up', 'Multi-tier add-ons', '💎'),
        kpiHtml('Customer Lifetime Value (LTV)', '₹31,260', 'LTV/CAC ratio: 5.1x', 'up', 'Lifetime customer value', '⭐'),
      '</div>',

      '<div class="zsub-card">',
        '<div class="zsub-card-head">',
          '<div>',
            '<h3 class="zsub-card-title">🔄 Recurring Membership Plans & MRR Performance (' + PLANS.length + ' Plans)</h3>',
            '<p class="zsub-card-sub">Active subscriber counts, recurring revenue contribution, and plan benefits</p>',
          '</div>',
          '<button class="zsub-btn primary" onclick="ZenveSubscriptionsDashboard.showNewPlanModal()">+ New Plan</button>',
        '</div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Plan Code</th><th>Plan Name</th><th>Monthly Price</th><th>Active Pets</th><th>MRR Contribution</th><th>Renewal Rate</th><th>Monthly Churn</th><th>Status</th></tr></thead>',
            '<tbody>',
              PLANS.map(function(p) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(p.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(p.name) + '</td>' +
                  '<td style="font-weight:600;color:#6d28d9;">' + esc(p.price) + '</td>' +
                  '<td style="font-weight:600;">' + esc(p.activeSubscribers) + ' Pets</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(p.mrr) + '</td>' +
                  '<td>' + esc(p.renewalRate) + '</td>' +
                  '<td><span class="zsub-pill active">' + esc(p.churn) + '</span></td>' +
                  '<td><span class="zsub-pill sub">Live Plan</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderActive() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Total Active Subscriptions', '1,388 Pets', 'Across all 10 tier plans', 'up', 'Active roster count', '✅'),
        kpiHtml('Auto-Debit Mandate Success', '97.4%', 'NPCI UPI & E-NACH', 'up', 'Automated tokenization', '💳'),
        kpiHtml('Subscriber Longevity', '18.4 Months', 'High customer stickiness', 'up', 'Average membership lifespan', '⏱️'),
        kpiHtml('Collected Active MRR', '₹28.92 L', '98.6% collectable', 'up', 'Recurring revenue realized', '💰'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">✅ Live Active Members Master Roster (' + SUBSCRIBERS.length + ' Records)</h3><p class="zsub-card-sub">Subscribed pets, parent details, mandate rails, and renewal dates</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Sub ID</th><th>Pet Patient</th><th>Parent Name</th><th>Plan</th><th>Mandate Rail</th><th>Monthly Rate</th><th>Next Billing</th><th>Status</th></tr></thead>',
            '<tbody>',
              SUBSCRIBERS.map(function(s) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(s.subId) + '</td>' +
                  '<td style="font-weight:600;">' + esc(s.petName) + '</td>' +
                  '<td>' + esc(s.parent) + '</td>' +
                  '<td>' + esc(s.plan) + '</td>' +
                  '<td>' + esc(s.autoDebit) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(s.monthlyFee) + '</td>' +
                  '<td>' + esc(s.nextRenewal) + '</td>' +
                  '<td><span class="zsub-pill active">' + esc(s.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderNew() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('New Subscriptions (MTD)', '184 Signups', '+22.4% MoM', 'up', 'Target: 160 signups', '✨'),
        kpiHtml('Blended Acquisition CAC', '₹490', '-18.5% YoY reduction', 'up', 'Clinic referral efficiency', '🎯'),
        kpiHtml('New MRR Added', '₹3.84 L', '+26.8% MoM', 'up', 'Pure ARR expansion', '💰'),
        kpiHtml('Avg Payback Period', '14.2 Days', 'First month margin positive', 'up', 'Payback duration', '⏱️'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">✨ New Subscriber Acquisition Channels (' + ACQUISITIONS.length + ' Channels)</h3><p class="zsub-card-sub">Acquisition velocity, CAC, conversion rate, and payback days</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Channel</th><th>Signups</th><th>CAC</th><th>Conversion</th><th>New MRR</th><th>Payback</th></tr></thead>',
            '<tbody>',
              ACQUISITIONS.map(function(a) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(a.channel) + '</td>' +
                  '<td style="font-weight:600;color:#6d28d9;">' + esc(a.newSubs) + ' Subs</td>' +
                  '<td>' + esc(a.cac) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(a.conversion) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.mrrAdded) + '</td>' +
                  '<td><span class="zsub-pill active">' + esc(a.payback) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderRenewals() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('First-Pass Renewal Rate', '97.3%', '+1.8% vs Q2', 'up', 'Automated mandate execution', '🔄'),
        kpiHtml('Smart Dunning Recovery', '88.5%', 'WhatsApp prompt + retry', 'up', 'Dunning recovery rate', '⚡'),
        kpiHtml('Processed Renewal Funds', '₹28.14 L', 'MTD collected', 'up', 'Direct bank settlement', '💰'),
        kpiHtml('Involuntary Churn', '0.4%', '-0.2% vs target', 'up', 'Payment failure churn', '📉'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">🔄 Monthly Renewal Batches & Auto-Debit Performance (' + RENEWALS.length + ' Batches)</h3><p class="zsub-card-sub">Scheduled debits, success rates, retry recovery, and collected funds</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Billing Cohort</th><th>Scheduled</th><th>Success</th><th>Retry Queue</th><th>Renewal Rate</th><th>Collected Value</th></tr></thead>',
            '<tbody>',
              RENEWALS.map(function(r) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(r.cohort) + '</td>' +
                  '<td>' + esc(r.scheduled) + ' Debits</td>' +
                  '<td style="color:#059669;font-weight:600;">' + esc(r.successful) + '</td>' +
                  '<td style="color:#d97706;">' + esc(r.retryQueue) + '</td>' +
                  '<td><span class="zsub-pill active">' + esc(r.rate) + '</span></td>' +
                  '<td style="font-weight:600;color:#6d28d9;">' + esc(r.processedRev) + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExpiring() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Expiries in 30 Days', '10 Plans', '₹2.88 L Annualized', 'up', 'Annual membership plans', '⏳'),
        kpiHtml('Pre-Renewal Confirmation', '91.4%', 'Automated outreach response', 'up', 'Renewal confirmations', '✅'),
        kpiHtml('Token Expirations', '14 Cards', 'Mandate update in progress', 'neutral', 'NPCI notification', '💳'),
        kpiHtml('Concierge Retention Rate', '94.2%', 'Direct vet nurse call', 'up', 'Retention outreach saves', '🛡️'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">⏳ Proactive Expiration Watchlist & Action Queue (' + EXPIRING.length + ' Subscriptions)</h3><p class="zsub-card-sub">Subscriptions expiring within 30 days and automated retention actions</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Sub ID</th><th>Pet Patient</th><th>Parent</th><th>Plan</th><th>Expiry Timeline</th><th>Value</th><th>Action Taken</th></tr></thead>',
            '<tbody>',
              EXPIRING.map(function(e) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(e.subId) + '</td>' +
                  '<td style="font-weight:600;">' + esc(e.petName) + '</td>' +
                  '<td>' + esc(e.parent) + '</td>' +
                  '<td>' + esc(e.plan) + '</td>' +
                  '<td style="color:#d97706;font-weight:600;">' + esc(e.expiryDate) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(e.val) + '</td>' +
                  '<td><span class="zsub-pill sub">' + esc(e.action) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderChurn() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Gross Monthly Churn', '0.7%', '-0.3% MoM reduction', 'up', '10 categorizations monitored', '📉'),
        kpiHtml('Net Revenue Retention (NRR)', '114.8%', '+4.2% YoY', 'up', 'Expansion > Churn', '📈'),
        kpiHtml('Preventable Churn Ratio', '78.5%', 'Mitigated via downgrades', 'up', 'Exit mitigation rate', '🛡️'),
        kpiHtml('Win-Back Campaign Rate', '34.2%', 'Targeted re-activation', 'up', 'Re-subscribed in 90D', '🔄'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">📉 Root Cause Churn Analysis & Remediation (' + CHURN_REASONS.length + ' Categories)</h3><p class="zsub-card-sub">Stated exit reasons, lost MRR, and automated retention workflows</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Stated Cancellation Reason</th><th>Share</th><th>Cancelled Accounts</th><th>Lost Monthly MRR</th><th>Preventable?</th><th>Remediation Action</th></tr></thead>',
            '<tbody>',
              CHURN_REASONS.map(function(c) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(c.reason) + '</td>' +
                  '<td style="color:#6d28d9;font-weight:600;">' + esc(c.pct) + '</td>' +
                  '<td>' + esc(c.count) + ' Pets</td>' +
                  '<td style="font-weight:600;color:#dc2626;">' + esc(c.mrrLost) + '</td>' +
                  '<td>' + esc(c.preventable) + '</td>' +
                  '<td style="color:#059669;">' + esc(c.action) + '</td>' +
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
      '<div class="zsub-kpi-grid">',
        kpiHtml('Annual Recurring Revenue (ARR)', '₹3.47 Cr', '+32.4% YoY', 'up', 'Current MRR x 12', '💵'),
        kpiHtml('Monthly Recurring Rev (MRR)', '₹28.92 L', '+14.6% MoM', 'up', '100% contracted debits', '🔄'),
        kpiHtml('Subscription Gross Margin', '74.2%', '+3.8% YoY', 'up', 'High digital & telehealth mix', '📈'),
        kpiHtml('Expansion / Upsell MRR', '₹4.65 L', '+21.5% MoM', 'up', 'Nutrition tier upgrades', '🚀'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">💵 Recurring Revenue Contribution by Tier (' + TIER_REVENUES.length + ' Tiers)</h3><p class="zsub-card-sub">Revenue realization, ARR velocity, ARPU, and plan margins</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Plan Tier</th><th>MRR Share</th><th>Monthly MRR</th><th>Annualized ARR</th><th>Gross Margin</th><th>YoY Growth</th></tr></thead>',
            '<tbody>',
              TIER_REVENUES.map(function(t) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(t.name) + '</td>' +
                  '<td>' + esc(t.share) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(t.mrr) + '</td>' +
                  '<td style="font-weight:600;color:#6d28d9;">' + esc(t.arr) + '</td>' +
                  '<td style="font-weight:600;color:#0891b2;">' + esc(t.margin) + '</td>' +
                  '<td><span class="zsub-pill active">' + esc(t.growth) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAnalytics() {
    return [
      '<div class="zsub-kpi-grid">',
        kpiHtml('Blended LTV / CAC', '5.1x', 'World-class > 3.0x', 'up', 'Healthy acquisition engine', '📊'),
        kpiHtml('Avg Customer Lifetime', '18.4 Months', '+2.6 mo vs FY25', 'up', 'Long-term pet relationship', '⏱️'),
        kpiHtml('Quick Ratio (Growth / Churn)', '4.8x', 'New MRR vs Lost MRR', 'up', 'Growth vs churn velocity', '🚀'),
        kpiHtml('Net Revenue Retention (NRR)', '114.8%', '+14.8% expansion', 'up', 'Net revenue retention rate', '📈'),
      '</div>',
      '<div class="zsub-card">',
        '<div class="zsub-card-head"><div><h3 class="zsub-card-title">📊 Subscriber Cohort Retention Longevity (' + COHORTS.length + ' Cohorts)</h3><p class="zsub-card-sub">Month-over-month cohort retention longevity and cumulative LTV</p></div></div>',
        '<div class="zsub-table-wrap">',
          '<table class="zsub-table">',
            '<thead><tr><th>Signup Cohort</th><th>Starting Pets</th><th>Month 3 Ret.</th><th>Month 6 Ret.</th><th>Cumulative LTV</th><th>LTV / CAC</th></tr></thead>',
            '<tbody>',
              COHORTS.map(function(c) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(c.cohort) + '</td>' +
                  '<td>' + esc(c.startingUsers) + ' Pets</td>' +
                  '<td style="color:#059669;font-weight:600;">' + esc(c.m3Ret) + '</td>' +
                  '<td style="color:#059669;font-weight:600;">' + esc(c.m6Ret) + '</td>' +
                  '<td style="font-weight:600;color:#6d28d9;">' + esc(c.cumulativeLtv) + '</td>' +
                  '<td><span class="zsub-pill active">' + esc(c.ltvCacRatio) + '</span></td>' +
                '</tr>';
              }).join(''),
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
      '<header class="zsub-head">',
        '<div class="zsub-head-left">',
          '<div class="zsub-title-row">',
            '<h2 class="zsub-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
            '<span class="zsub-live-badge"><span class="zsub-pulse-dot"></span> Subscriptions · Active</span>',
          '</div>',
          '<p class="zsub-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zsub-head-actions">',
          '<button class="zsub-btn primary" onclick="ZenveSubscriptionsDashboard.showNewPlanModal()">+ New Plan</button>',
        '</div>',
      '</header>',

      '<nav class="zsub-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zsub-tab' + active + '" onclick="ZenveSubscriptionsDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zsub-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zsub-body">'
    ];

    switch (S.tab) {
      case 'dashboard': html.push(renderDashboard()); break;
      case 'active':    html.push(renderActive()); break;
      case 'new':       html.push(renderNew()); break;
      case 'renewals':  html.push(renderRenewals()); break;
      case 'expiring':  html.push(renderExpiring()); break;
      case 'churn':     html.push(renderChurn()); break;
      case 'revenue':   html.push(renderRevenue()); break;
      case 'analytics': html.push(renderAnalytics()); break;
      default:          html.push(renderDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zsub-active-modal';
    backdrop.className = 'zsub-modal-backdrop';
    backdrop.innerHTML = '<div class="zsub-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zsub-active-modal');
    if (existing) existing.remove();
  }

  function showNewPlanModal() {
    var formHtml = [
      '<div class="zsub-modal-head">',
        '<h3 class="zsub-modal-title">🔄 Create New Recurring Wellness Plan</h3>',
        '<button class="zsub-btn" onclick="ZenveSubscriptionsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Subscription plan created and published to Zenve SuperApp!\'); ZenveSubscriptionsDashboard.closeModal();">',
        '<div class="zsub-form-group"><label>Subscription Plan Title</label><input type="text" class="zsub-input" placeholder="e.g. Feline Renal Care & Monthly Diet Subscription" required /></div>',
        '<div class="zsub-form-row">',
          '<div class="zsub-form-group"><label>Monthly Price (INR)</label><input type="text" class="zsub-input" placeholder="₹1,850" required /></div>',
          '<div class="zsub-form-group"><label>Billing Frequency</label><select class="zsub-select"><option>Monthly Auto-Debit</option><option>Quarterly Advance</option><option>Annual Prepaid</option></select></div>',
        '</div>',
        '<div class="zsub-form-group"><label>Included Benefits & Inclusions</label><input type="text" class="zsub-input" placeholder="e.g. Free 60-min delivery + 2 vet consults + monthly kibble" required /></div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zsub-btn" onclick="ZenveSubscriptionsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zsub-btn primary">Publish Subscription</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zsub-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zsub-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zb2b-root', 'zix-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zb2b-open', 'zix-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zsub-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zb2b-open', 'zix-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
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
    root.classList.add('zsub-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zb2b-locked', 'zix-locked');
      document.body.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zb2b-locked', 'zix-locked');
      document.documentElement.classList.add('zsub-locked');
      document.body.classList.add('zsub-locked');
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
      root.classList.remove('zsub-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zsub-locked');
      document.body.classList.remove('zsub-locked');
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
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'b2b', 'enterprise', 'import', 'export'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zsub-root');
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
  window.ZenveSubscriptionsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showNewPlanModal: showNewPlanModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
