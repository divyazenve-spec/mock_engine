/* =====================================================================
   Zenve BI — Customers 360° Intelligence Executive Control Center
   Suite (11 Subdomains):
     1. Customer Dashboard        (#customer-dashboard / #customers)
     2. All Customers             (#all-customers)
     3. New Customers             (#new-customers)
     4. Active Customers          (#active-customers)
     5. Repeat Customers          (#repeat-customers)
     6. Customer Lifetime Value   (#customer-lifetime-value / #clv)
     7. Customer Segmentation     (#customer-segmentation)
     8. Customer Orders           (#customer-orders)
     9. Customer Revenue          (#customer-revenue)
     10. Customer Retention       (#customer-retention)
     11. Customer Complaints      (#customer-complaints)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 11 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard', label: 'Customer Dashboard', icon: '👥', hash: '#customer-dashboard', badge: '', title: 'Unified Customer 360° Command Center', sub: 'Holistic pet parent profiles, omnichannel engagement, and loyalty status' },
    { id: 'all-customers', label: 'All Customers', icon: '📋', hash: '#all-customers', badge: '', title: 'All Registered Customers & Pet Parents', sub: 'Verified contact directory, multi-pet ownership mapping, and geographic distribution' },
    { id: 'new-customers', label: 'New Customers', icon: '✨', hash: '#new-customers', badge: '', title: 'New Customer Acquisition & First-Order Velocity', sub: 'Channel attribution, welcome bundle activations, and blended CAC dynamics' },
    { id: 'active-customers', label: 'Active Customers', icon: '⚡', hash: '#active-customers', badge: '', title: 'Active Customers & Omni-Channel Frequency', sub: 'Rolling DAU / WAU / MAU stickiness, repeat clinic visits, and mobile app usage' },
    { id: 'repeat-customers', label: 'Repeat Customers', icon: '🔄', hash: '#repeat-customers', badge: '', title: 'Repeat Customers & Order Frequency Progression', sub: 'Replenishment interval tracking, reorder retention, and multi-visit habit loops' },
    { id: 'lifetime-value', label: 'Customer Lifetime Value', icon: '💎', hash: '#customer-lifetime-value', badge: '', title: 'Customer Lifetime Value (LTV) & CAC Multiples', sub: 'Predictive CLV tiers, cumulative cohort GMV, and customer margin realization' },
    { id: 'segmentation', label: 'Customer Segmentation', icon: '🧩', hash: '#customer-segmentation', badge: '', title: 'Customer Segmentation & Behavioral Clusters', sub: 'RFM analysis, pet life-stage clustering, and personalized CRM campaigns' },
    { id: 'orders', label: 'Customer Orders', icon: '🛒', hash: '#customer-orders', badge: '', title: 'Customer Orders & Transaction History', sub: 'Omnichannel commerce purchases, clinic treatment billing, and 60-min deliveries' },
    { id: 'revenue', label: 'Customer Revenue', icon: '💰', hash: '#customer-revenue', badge: '', title: 'Customer Revenue & Monetization Streams', sub: 'Gross merchandise value, monthly ARPU realization, and category gross margins' },
    { id: 'complaints', label: 'Customer Complaints', icon: '⚠️', hash: '#customer-complaints', badge: '', title: 'Customer Complaints & Grievance Resolution', sub: 'Support ticket resolution speed, First-Contact Resolution, and post-service CSAT' }
  ];

  /* ── Master Datasets (10 Comprehensive Records per Dashboard) ───── */
  var CUSTOMERS = [
    { id: 'CUST-1001', name: 'Ananya Sharma', pets: 'Bruno & Simba (Labrador & Persian)', tier: 'VIP Elite', ltv: '₹1,48,500', ordersCount: 42, mtdSpend: '₹18,400', lastOrder: '2 hrs ago', churnRisk: 'Very Low', status: 'Active' },
    { id: 'CUST-1002', name: 'Vikram Malhotra', pets: 'Rocky (German Shepherd)', tier: 'Loyal Gold', ltv: '₹92,400', ordersCount: 28, mtdSpend: '₹11,200', lastOrder: 'Yesterday', churnRisk: 'Low', status: 'Active' },
    { id: 'CUST-1003', name: 'Priya Iyer', pets: 'Coco (Shih Tzu)', tier: 'VIP Elite', ltv: '₹1,24,000', ordersCount: 36, mtdSpend: '₹14,800', lastOrder: '3 days ago', churnRisk: 'Very Low', status: 'Active' },
    { id: 'CUST-1004', name: 'Rohan Deshmukh', pets: 'Milo & Bella (Beagle & Indie Cat)', tier: 'Loyal Gold', ltv: '₹78,600', ordersCount: 22, mtdSpend: '₹9,500', lastOrder: '5 days ago', churnRisk: 'Low', status: 'Active' },
    { id: 'CUST-1005', name: 'Sneha Reddy', pets: 'Oreo (Golden Retriever)', tier: 'Silver Plus', ltv: '₹46,200', ordersCount: 14, mtdSpend: '₹5,800', lastOrder: '12 days ago', churnRisk: 'Medium', status: 'Active' },
    { id: 'CUST-1006', name: 'Arjun Nair', pets: 'Leo (Siberian Husky)', tier: 'Loyal Gold', ltv: '₹88,900', ordersCount: 26, mtdSpend: '₹12,600', lastOrder: '4 days ago', churnRisk: 'Low', status: 'Active' },
    { id: 'CUST-1007', name: 'Kavita Verma', pets: 'Casper (Samoyed)', tier: 'VIP Elite', ltv: '₹1,65,200', ordersCount: 48, mtdSpend: '₹22,100', lastOrder: '1 day ago', churnRisk: 'Very Low', status: 'Active' },
    { id: 'CUST-1008', name: 'Aditya Joshi', pets: 'Zoey (French Bulldog)', tier: 'Silver Plus', ltv: '₹39,400', ordersCount: 11, mtdSpend: '₹4,200', lastOrder: '18 days ago', churnRisk: 'Medium', status: 'Active' },
    { id: 'CUST-1009', name: 'Meera Rao', pets: 'Rusty (Indie Dog)', tier: 'Regular Bronze', ltv: '₹18,500', ordersCount: 6, mtdSpend: '₹2,100', lastOrder: '32 days ago', churnRisk: 'High', status: 'At-Risk' },
    { id: 'CUST-1010', name: 'Karthik Sundaram', pets: 'Max & Luna (Rottweiler & Calico)', tier: 'VIP Elite', ltv: '₹1,34,800', ordersCount: 39, mtdSpend: '₹16,900', lastOrder: 'Today', churnRisk: 'Very Low', status: 'Active' }
  ];

  var ALL_CUSTOMERS_LIST = [
    { id: 'CUST-1001', name: 'Ananya Sharma', phone: '+91 98450 12891', email: 'ananya.s@gmail.com', location: 'Indiranagar, BLR', pets: 'Bruno (Labrador), Simba (Persian)', tier: 'VIP Elite', totalSpend: '₹1,48,500', joinDate: '14 Jan 2024', status: 'Active' },
    { id: 'CUST-1002', name: 'Vikram Malhotra', phone: '+91 99002 44319', email: 'vikram.m@outlook.com', location: 'Koramangala, BLR', pets: 'Rocky (German Shepherd)', tier: 'Loyal Gold', totalSpend: '₹92,400', joinDate: '08 Mar 2024', status: 'Active' },
    { id: 'CUST-1003', name: 'Priya Iyer', phone: '+91 98860 88210', email: 'priya.iyer@yahoo.com', location: 'Whitefield, BLR', pets: 'Coco (Shih Tzu)', tier: 'VIP Elite', totalSpend: '₹1,24,000', joinDate: '22 Feb 2024', status: 'Active' },
    { id: 'CUST-1004', name: 'Rohan Deshmukh', phone: '+91 97411 65004', email: 'rohan.d@gmail.com', location: 'HSR Layout, BLR', pets: 'Milo (Beagle), Bella (Indie Cat)', tier: 'Loyal Gold', totalSpend: '₹78,600', joinDate: '11 May 2024', status: 'Active' },
    { id: 'CUST-1005', name: 'Sneha Reddy', phone: '+91 96112 39012', email: 'sneha.reddy@gmail.com', location: 'Jayanagar, BLR', pets: 'Oreo (Golden Retriever)', tier: 'Silver Plus', totalSpend: '₹46,200', joinDate: '19 Jul 2024', status: 'Active' },
    { id: 'CUST-1006', name: 'Arjun Nair', phone: '+91 98455 77123', email: 'arjun.nair@techmail.in', location: 'Bellandur, BLR', pets: 'Leo (Siberian Husky)', tier: 'Loyal Gold', totalSpend: '₹88,900', joinDate: '04 Apr 2024', status: 'Active' },
    { id: 'CUST-1007', name: 'Kavita Verma', phone: '+91 99801 23456', email: 'kavita.v@gmail.com', location: 'Sadashivanagar, BLR', pets: 'Casper (Samoyed)', tier: 'VIP Elite', totalSpend: '₹1,65,200', joinDate: '02 Jan 2024', status: 'Active' },
    { id: 'CUST-1008', name: 'Aditya Joshi', phone: '+91 97312 90817', email: 'aditya.j@gmail.com', location: 'JP Nagar, BLR', pets: 'Zoey (French Bulldog)', tier: 'Silver Plus', totalSpend: '₹39,400', joinDate: '15 Aug 2024', status: 'Active' },
    { id: 'CUST-1009', name: 'Meera Rao', phone: '+91 96200 45612', email: 'meera.rao@gmail.com', location: 'Malleshwaram, BLR', pets: 'Rusty (Indie Dog)', tier: 'Regular Bronze', totalSpend: '₹18,500', joinDate: '05 Oct 2024', status: 'At-Risk' },
    { id: 'CUST-1010', name: 'Karthik Sundaram', phone: '+91 98451 99882', email: 'karthik.s@gmail.com', location: 'Sarjapur Road, BLR', pets: 'Max (Rottweiler), Luna (Calico)', tier: 'VIP Elite', totalSpend: '₹1,34,800', joinDate: '18 Jan 2024', status: 'Active' }
  ];

  var NEW_CUSTOMERS_LIST = [
    { id: 'NEW-8901', name: 'Edwin Hegde', pet: 'Bruno (Golden Retriever Pup)', channel: 'Instagram Ad', date: 'Today, 09:15', firstOrder: 'Welcome Puppy Kit (₹3,450)', cac: '₹320', status: 'Activated' },
    { id: 'NEW-8902', name: 'Rajesh Gupte', pet: 'Simba (Persian Kitten)', channel: 'Google Search', date: 'Today, 11:30', firstOrder: 'Royal Canin + Litter (₹2,890)', cac: '₹410', status: 'Activated' },
    { id: 'NEW-8903', name: 'Ayesha Khan', pet: 'Tobby (Pug)', channel: 'Vet Referral', date: 'Yesterday', firstOrder: 'First Vet Consultation (₹1,200)', cac: '₹180', status: 'Activated' },
    { id: 'NEW-8904', name: 'Sameer Kulkarni', pet: 'Shadow (Doberman Pup)', channel: 'App Install Ad', date: 'Yesterday', firstOrder: 'Deworming + Starter Pack (₹4,120)', cac: '₹460', status: 'Activated' },
    { id: 'NEW-8905', name: 'Nidhi Bansal', pet: 'Penny (Corgi)', channel: 'Influencer Reel', date: '2 days ago', firstOrder: 'Organic Kibble + Toy (₹3,850)', cac: '₹290', status: 'Activated' },
    { id: 'NEW-8906', name: 'Farhan Akhtar', pet: 'Hazel (Beagle Pup)', channel: 'Society Camp', date: '2 days ago', firstOrder: 'Vaccination Starter (₹2,600)', cac: '₹140', status: 'Activated' },
    { id: 'NEW-8907', name: 'Anjali Menon', pet: 'Yuki (Indie Kitten)', channel: 'Organic Search', date: '3 days ago', firstOrder: 'Kitten Wellness Check (₹1,500)', cac: '₹0', status: 'Activated' },
    { id: 'NEW-8908', name: 'Tarun Chawla', pet: 'Bolt (German Shepherd)', channel: 'Facebook Ad', date: '3 days ago', firstOrder: 'High-Protein Kibble 12kg (₹5,400)', cac: '₹480', status: 'Activated' },
    { id: 'NEW-8909', name: 'Ritu Sen', pet: 'Ginny (Maltese)', channel: 'Friend Referral', date: '4 days ago', firstOrder: 'Luxury Spa & Grooming (₹2,950)', cac: '₹110', status: 'Activated' },
    { id: 'NEW-8910', name: 'Varun Pillai', pet: 'Buster (Boxer Pup)', channel: 'Pet Expo Stall', date: '4 days ago', firstOrder: 'Leash + Harness + Food (₹4,750)', cac: '₹220', status: 'Activated' }
  ];

  var ACTIVE_COHORTS_LIST = [
    { cohort: 'Daily Hyper-Engagers (DAU)', count: '1,840', pctTotal: '14.7%', frequency: 'Daily health logs, food tracker & community', topActivity: '60-Min Quick Commerce', trend: '+24.2% ↑' },
    { cohort: 'Weekly Active Shoppers (WAU)', count: '4,620', pctTotal: '37.0%', frequency: 'Bi-weekly kibble replenishment & treats', topActivity: 'Fast Express Delivery', trend: '+18.5% ↑' },
    { cohort: 'Monthly Health & Clinic Cohort', count: '2,460', pctTotal: '19.7%', frequency: 'Monthly wellness checkup & Rx refill', topActivity: 'Veterinary Clinic & Rx', trend: '+12.8% ↑' },
    { cohort: 'Multi-Pet Active Parents', count: '1,980', pctTotal: '15.9%', frequency: 'Cross-purchases for dogs & cats', topActivity: 'Omnichannel Combo', trend: '+28.4% ↑' },
    { cohort: 'Grooming & Spa Subscribers', count: '890', pctTotal: '7.1%', frequency: 'Fortnightly grooming appointment bookings', topActivity: 'Luxury In-Clinic Spa', trend: '+16.2% ↑' },
    { cohort: 'Chronic Illness Management', count: '640', pctTotal: '5.1%', frequency: 'Scheduled insulin, cardiac & renal diet', topActivity: 'Cold-Chain Pharmacy', trend: '+9.4% ↑' },
    { cohort: 'New Puppy/Kitten Parents (0-6M)', count: '780', pctTotal: '6.2%', frequency: 'Milestone vaccines, training treats, chip', topActivity: 'Pediatric Vet Packages', trend: '+31.5% ↑' },
    { cohort: 'Weekend Walkers & Daycare Cohort', count: '520', pctTotal: '4.2%', frequency: 'Weekend social play sessions & boarding', topActivity: 'Clinic Daycare & Boarding', trend: '+21.0% ↑' },
    { cohort: 'Senior Pet Supportive Care', count: '430', pctTotal: '3.4%', frequency: 'Joint supplements, orthopedic beds, therapy', topActivity: 'Geriatric Vet Support', trend: '+8.7% ↑' },
    { cohort: 'Premium Fashion & Accessories', count: '680', pctTotal: '5.4%', frequency: 'Designer harnesses, winter coats, bowties', topActivity: 'Zenve Fashion Boutique', trend: '+26.8% ↑' }
  ];

  var REPEAT_METRICS_LIST = [
    { tier: '2nd Purchase (Retention Gate)', count: 2840, share: '22.8%', nextPurchaseProb: '76.5%', avgDaysToReorder: '18 Days', marketingAction: 'Automated 10-day food replenishment prompt' },
    { tier: '3rd - 5th Purchase (Habit Formed)', count: 3420, share: '27.4%', nextPurchaseProb: '84.2%', avgDaysToReorder: '14 Days', marketingAction: 'Complementary treat bundle attach' },
    { tier: '6th - 10th Purchase (Loyalty Core)', count: 2150, share: '17.2%', nextPurchaseProb: '91.0%', avgDaysToReorder: '12 Days', marketingAction: 'Silver to Gold loyalty tier upgrade gift' },
    { tier: '11th - 20th Purchase (Brand Advocate)', count: 1480, share: '11.9%', nextPurchaseProb: '94.8%', avgDaysToReorder: '9 Days', marketingAction: 'VIP dark-store priority 45-min delivery' },
    { tier: '21+ Purchases (Zenve Champions)', count: 980, share: '7.9%', nextPurchaseProb: '98.2%', avgDaysToReorder: '7 Days', marketingAction: 'Dedicated concierge vet WhatsApp line' },
    { tier: 'Bi-Weekly Food Replenishers', count: 1860, share: '14.9%', nextPurchaseProb: '88.4%', avgDaysToReorder: '14 Days', marketingAction: 'WhatsApp 1-click reorder trigger' },
    { tier: 'Monthly Prescription Refills', count: 720, share: '5.8%', nextPurchaseProb: '96.1%', avgDaysToReorder: '28 Days', marketingAction: 'Doctor automated refill authorization' },
    { tier: 'Fortnightly Grooming Repeats', count: 640, share: '5.1%', nextPurchaseProb: '82.3%', avgDaysToReorder: '15 Days', marketingAction: 'Calendar slot auto-reserve prompt' },
    { tier: 'Multi-Category Re-purchasers', count: 1290, share: '10.3%', nextPurchaseProb: '89.5%', avgDaysToReorder: '11 Days', marketingAction: 'Cross-category reward points multiplier' },
    { tier: 'Annual Health Plan Renewers', count: 850, share: '6.8%', nextPurchaseProb: '92.4%', avgDaysToReorder: '365 Days', marketingAction: 'Pre-expiry health review + booster shot' }
  ];

  var LTV_SEGMENTS_LIST = [
    { segment: 'VIP Diamond Cohort (Top 2%)', customers: 250, avgLifespan: '38 Months', avgAnnualSpend: '₹1,95,000', ltvValue: '₹6,17,500', marginContrib: '44.5%', ltvCac: '18.2x' },
    { segment: 'Elite Multi-Pet Gold (Top 8%)', customers: 980, avgLifespan: '32 Months', avgAnnualSpend: '₹1,24,000', ltvValue: '₹3,30,600', marginContrib: '41.2%', ltvCac: '12.4x' },
    { segment: 'Chronic Care & Medical (Top 15%)', customers: 1450, avgLifespan: '28 Months', avgAnnualSpend: '₹88,000', ltvValue: '₹2,05,300', marginContrib: '38.6%', ltvCac: '9.8x' },
    { segment: 'Subscription Food & Essentials', customers: 2860, avgLifespan: '24 Months', avgAnnualSpend: '₹54,000', ltvValue: '₹1,08,000', marginContrib: '32.4%', ltvCac: '7.6x' },
    { segment: 'Regular Care & Grooming', customers: 2240, avgLifespan: '18 Months', avgAnnualSpend: '₹36,000', ltvValue: '₹54,000', marginContrib: '36.8%', ltvCac: '5.4x' },
    { segment: 'Occasional Clinic & Retail', customers: 1890, avgLifespan: '14 Months', avgAnnualSpend: '₹22,000', ltvValue: '₹25,600', marginContrib: '28.5%', ltvCac: '3.8x' },
    { segment: 'Digital App Shoppers (Single Cat)', customers: 1120, avgLifespan: '16 Months', avgAnnualSpend: '₹26,000', ltvValue: '₹34,600', marginContrib: '31.0%', ltvCac: '4.6x' },
    { segment: 'Fashion & Accessories Shoppers', customers: 640, avgLifespan: '12 Months', avgAnnualSpend: '₹18,500', ltvValue: '₹18,500', marginContrib: '48.2%', ltvCac: '3.2x' },
    { segment: 'Emergency & One-Off Clinic', customers: 720, avgLifespan: '8 Months', avgAnnualSpend: '₹14,000', ltvValue: '₹9,300', marginContrib: '35.0%', ltvCac: '2.1x' },
    { segment: 'Reactivated Dormant Accounts', customers: 330, avgLifespan: '10 Months', avgAnnualSpend: '₹16,200', ltvValue: '₹13,500', marginContrib: '29.8%', ltvCac: '2.8x' }
  ];

  var SEGMENTS_LIST = [
    { name: 'Premium Pamperers', count: 1840, share: '14.7%', behavior: 'High grooming frequency, organic treats & designer collars', aov: '₹3,850', arpu: '₹92,400', campaign: 'Spa & Fashion Exclusive Showcase' },
    { name: 'Medical & Chronic Guardians', count: 1420, share: '11.4%', behavior: 'Strict Rx diets, timely insulin, monthly blood work', aov: '₹4,200', arpu: '₹1,00,800', campaign: 'Auto-Refill Guarantee & Doctor Support' },
    { name: 'Budget-Conscious Practicalists', count: 2980, share: '23.9%', behavior: 'Bulk kibble bags, economy vaccinations, deal hunters', aov: '₹1,650', arpu: '₹39,600', campaign: 'Monthly Smart Saver Bulk Discounts' },
    { name: 'Multi-Pet Dynasties (Dogs + Cats)', count: 1650, share: '13.2%', behavior: 'Balanced purchases across species, high cart sizes', aov: '₹5,100', arpu: '₹1,22,400', campaign: 'Multi-Pet Club Tiered Cashback' },
    { name: 'Puppy / Kitten First-Timers', count: 1140, share: '9.1%', behavior: 'High pediatric guidance needs, training pads, vaccines', aov: '₹2,900', arpu: '₹69,600', campaign: 'First Year Milestone Concierge' },
    { name: 'Quick-Commerce Urgent Shoppers', count: 1280, share: '10.3%', behavior: 'Immediate 60-min deliveries for food, meds & sprays', aov: '₹2,100', arpu: '₹50,400', campaign: 'Express Dark-Store Free Shipping' },
    { name: 'Natural & Raw Food Enthusiasts', count: 840, share: '6.7%', behavior: 'BARF diets, grain-free meals, refrigerated bone broth', aov: '₹4,400', arpu: '₹1,05,600', campaign: 'Farm-Fresh Cold Chain Alerts' },
    { name: 'Working Pet Parents', count: 920, share: '7.4%', behavior: 'High weekend boarding, automated feeders, smart cameras', aov: '₹3,200', arpu: '₹76,800', campaign: 'Weekend Daycare & Sitter Pass' },
    { name: 'Senior Pet Companions', count: 760, share: '6.1%', behavior: 'Orthopedic comfort, joint supplements, calm clinic visits', aov: '₹2,800', arpu: '₹67,200', campaign: 'Senior Mobility & Comfort Care' },
    { name: 'Cat-Only Urban Minimalists', count: 650, share: '5.2%', behavior: 'Tofu litter, wet mousse cans, catnip scratching posts', aov: '₹1,950', arpu: '₹46,800', campaign: 'Feline Oasis Secret Deals' }
  ];

  var CUSTOMER_ORDERS_LIST = [
    { id: 'ORD-98101', parent: 'Ananya Sharma', pet: 'Bruno (Labrador)', items: 'Royal Canin Maxi Puppy 15kg + Pedigree Gravy (12x)', total: '₹6,850', channel: 'Android App', fulfillment: 'Delivered (60-Min)', time: '8 mins ago' },
    { id: 'ORD-98102', parent: 'Vikram Malhotra', pet: 'Rocky (German Shepherd)', items: 'Vet Consultation + NexGard Spectra 3-Pack', total: '₹4,200', channel: 'In-Clinic', fulfillment: 'Completed & Invoiced', time: '24 mins ago' },
    { id: 'ORD-98103', parent: 'Priya Iyer', pet: 'Coco (Shih Tzu)', items: 'Royal Spa Session + Orijen Small Breed Kibble', total: '₹5,400', channel: 'iOS App', fulfillment: 'Delivered (Express)', time: '42 mins ago' },
    { id: 'ORD-98104', parent: 'Rohan Deshmukh', pet: 'Milo & Bella', items: 'Whiskas Ocean Fish + Pedigree Biscuits + Cat Litter', total: '₹3,150', channel: 'Android App', fulfillment: 'Out for Delivery', time: '1 hr ago' },
    { id: 'ORD-98105', parent: 'Sneha Reddy', pet: 'Oreo (Golden Retriever)', items: 'Apoquel 16mg (Dermatology Rx) + Omega-3 Oil', total: '₹3,890', channel: 'Tele-Consult', fulfillment: 'Dispatched', time: '1 hr ago' },
    { id: 'ORD-98106', parent: 'Arjun Nair', pet: 'Leo (Siberian Husky)', items: 'Farmina N&D Ocean Salmon 12kg', total: '₹8,400', channel: 'Web Store', fulfillment: 'Delivered (Standard)', time: '2 hrs ago' },
    { id: 'ORD-98107', parent: 'Kavita Verma', pet: 'Casper (Samoyed)', items: 'Full Dental Scaling + Microchipping', total: '₹7,500', channel: 'In-Clinic', fulfillment: 'Completed', time: '3 hrs ago' },
    { id: 'ORD-98108', parent: 'Aditya Joshi', pet: 'Zoey (French Bulldog)', items: 'Hypoallergenic Kibble + Ear Cleaner Drops', total: '₹2,950', channel: 'iOS App', fulfillment: 'Delivered (60-Min)', time: '3 hrs ago' },
    { id: 'ORD-98109', parent: 'Meera Rao', pet: 'Rusty (Indie)', items: 'Annual 7-in-1 Booster Vaccination', total: '₹1,450', channel: 'In-Clinic', fulfillment: 'Completed', time: '4 hrs ago' },
    { id: 'ORD-98110', parent: 'Karthik Sundaram', pet: 'Max & Luna', items: 'Bravecto Chewable + Royal Canin Urinary S/O', total: '₹5,980', channel: 'Android App', fulfillment: 'Delivered (Express)', time: '5 hrs ago' }
  ];

  var REVENUE_CHANNELS_LIST = [
    { channel: 'Quick Commerce 60-Min Delivery', mtdRev: '₹1,14,50,000', share: '36.8%', avgSpend: '₹2,950', grossMargin: '34.2%', growth: '+48.6% ↑' },
    { channel: 'In-Clinic Veterinary Consults', mtdRev: '₹68,20,000', share: '21.9%', avgSpend: '₹1,850', grossMargin: '68.4%', growth: '+22.4% ↑' },
    { channel: 'Cold-Chain Prescription Pharmacy', mtdRev: '₹44,80,000', share: '14.4%', avgSpend: '₹2,400', grossMargin: '42.0%', growth: '+31.2% ↑' },
    { channel: 'Luxury Grooming & Spa Parlors', mtdRev: '₹28,40,000', share: '9.1%', avgSpend: '₹2,800', grossMargin: '58.6%', growth: '+28.5% ↑' },
    { channel: 'Monthly Replenishment Subscriptions', mtdRev: '₹22,60,000', share: '7.3%', avgSpend: '₹4,200', grossMargin: '36.0%', growth: '+54.2% ↑' },
    { channel: 'Specialized Surgical & Diagnostic Lab', mtdRev: '₹16,80,000', share: '5.4%', avgSpend: '₹7,600', grossMargin: '64.0%', growth: '+18.0% ↑' },
    { channel: 'Zenve Fashion & Boutique Wear', mtdRev: '₹8,90,000', share: '2.9%', avgSpend: '₹2,100', grossMargin: '52.4%', growth: '+38.0% ↑' },
    { channel: 'Daycare & Luxury Pet Boarding', mtdRev: '₹4,20,000', share: '1.3%', avgSpend: '₹1,400', grossMargin: '62.0%', growth: '+15.5% ↑' },
    { channel: 'Tele-Health Digital Consultations', mtdRev: '₹1,80,000', share: '0.6%', avgSpend: '₹600', grossMargin: '78.0%', growth: '+64.0% ↑' },
    { channel: 'Corporate B2B & Breeder Supply', mtdRev: '₹1,10,000', share: '0.4%', avgSpend: '₹12,500', grossMargin: '24.5%', growth: '+12.0% ↑' }
  ];

  var RETENTION_COHORTS_LIST = [
    { cohortMonth: 'Jan 2024 (Foundation Cohort)', initialSize: 1200, m1: '84.5%', m3: '76.2%', m6: '71.8%', m12: '68.4%', status: 'Exceptional (Top 5%)' },
    { cohortMonth: 'Feb 2024 (Spring Launch)', initialSize: 1450, m1: '82.0%', m3: '74.8%', m6: '69.5%', m12: '66.2%', status: 'Strong Retention' },
    { cohortMonth: 'Mar 2024 (Campaign Scale)', initialSize: 1680, m1: '80.5%', m3: '72.4%', m6: '68.0%', m12: '64.8%', status: 'Stable' },
    { cohortMonth: 'Apr 2024 (Referral Boom)', initialSize: 1920, m1: '85.0%', m3: '78.2%', m6: '73.4%', m12: '69.8%', status: 'Exceptional (Top 5%)' },
    { cohortMonth: 'May 2024 (Vaccination Drive)', initialSize: 2150, m1: '83.2%', m3: '75.6%', m6: '71.0%', m12: '67.5%', status: 'Strong Retention' },
    { cohortMonth: 'Jun 2024 (Monsoon Care)', initialSize: 2340, m1: '81.8%', m3: '73.9%', m6: '69.4%', m12: '65.8%', status: 'Stable' },
    { cohortMonth: 'Jul 2024 (Bengaluru Core)', initialSize: 2580, m1: '84.2%', m3: '77.1%', m6: '72.8%', m12: '68.9%', status: 'Strong Retention' },
    { cohortMonth: 'Aug 2024 (Puppy Fest)', initialSize: 2820, m1: '86.4%', m3: '79.5%', m6: '74.6%', m12: '71.2%', status: 'Exceptional (Top 5%)' },
    { cohortMonth: 'Sep 2024 (Express Delivery Push)', initialSize: 3100, m1: '87.8%', m3: '81.2%', m6: '76.4%', m12: '73.0%', status: 'Best in Class' },
    { cohortMonth: 'Oct 2024 (Diwali & Festive)', initialSize: 3450, m1: '89.2%', m3: '83.0%', m6: '78.2%', m12: '74.5%', status: 'Best in Class' }
  ];

  var GRIEVANCES = [
    { id: 'TIK-4401', parent: 'Ananya Sharma', pet: 'Bruno (Labrador)', category: 'Delivery', priority: 'Medium', issue: 'Delivery delayed by 25 mins during rainstorm', rep: 'Kiran R.', sla: '18 mins ago', remedy: 'Full delivery fee waived + ₹200 wallet credit', csat: '5.0 ⭐', status: 'Closed' },
    { id: 'TIK-4402', parent: 'Rajesh Gupte', pet: 'Simba (Persian)', category: 'Packaging', priority: 'Low', issue: 'Corner of Royal Canin bag slightly scuffed', rep: 'Priya M.', sla: '45 mins ago', remedy: 'Free treat pouch dispatched + replaced bag', csat: '5.0 ⭐', status: 'Closed' },
    { id: 'TIK-4403', parent: 'Vikram Malhotra', pet: 'Rocky (GSD)', category: 'Pharmacy', priority: 'Critical', issue: 'Insulin cold-chain icepack felt room temp (>10°C)', rep: 'Dr. Varun K.', sla: '8 mins SLA', remedy: 'Immediate fridge-box reshipment in 18 mins', csat: '5.0 ⭐', status: 'Closed' },
    { id: 'TIK-4404', parent: 'Sneha Reddy', pet: 'Oreo (Golden)', category: 'Clinic', priority: 'High', issue: 'Emergency surgery caused 35-min clinic wait', rep: 'Amit S.', sla: '1 hr ago', remedy: 'Priority bypass next visit + free nail clipping', csat: '4.8 ⭐', status: 'Closed' },
    { id: 'TIK-4405', parent: 'Rohan Deshmukh', pet: 'Milo (Beagle)', category: 'Billing', priority: 'Low', issue: 'Double deduction on UPI payment gateway', rep: 'Neha P.', sla: '2 hrs ago', remedy: 'Instant reversal credit to account via Razorpay', csat: '5.0 ⭐', status: 'Closed' },
    { id: 'TIK-4406', parent: 'Arjun Nair', pet: 'Leo (Husky)', category: 'Delivery', priority: 'High', issue: 'Delivery partner rang wrong apartment bell at 7am', rep: 'Kiran R.', sla: '35 mins SLA', remedy: 'Apology call + doorstep delivery notes saved', csat: '4.5 ⭐', status: 'Closed' },
    { id: 'TIK-4407', parent: 'Kavita Verma', pet: 'Casper (Samoyed)', category: 'Packaging', priority: 'Low', issue: 'Dispenser pump on oatmeal shampoo stuck', rep: 'Priya M.', sla: '50 mins SLA', remedy: 'Replacement bottle dispatched on express bike', csat: '5.0 ⭐', status: 'Closed' },
    { id: 'TIK-4408', parent: 'Aditya Joshi', pet: 'Zoey (Bulldog)', category: 'Billing', priority: 'Medium', issue: 'Promo code PUPPY20 failed at checkout step', rep: 'Neha P.', sla: '15 mins SLA', remedy: '₹350 manual cashback credited to Zenve Wallet', csat: '5.0 ⭐', status: 'Closed' },
    { id: 'TIK-4409', parent: 'Meera Rao', pet: 'Rusty (Indie)', category: 'Clinic', priority: 'Medium', issue: 'Groomer cut nail quick slightly, required styptic', rep: 'Dr. Varun K.', sla: '2 hrs ago', remedy: 'Free antiseptic kit + groomer senior re-assigned', csat: '4.9 ⭐', status: 'Closed' },
    { id: 'TIK-4410', parent: 'Karthik Sundaram', pet: 'Luna (Calico)', category: 'Pharmacy', priority: 'High', issue: 'Wrong tablet strength sent (5mg instead of 10mg)', rep: 'Amit S.', sla: '12 mins SLA', remedy: 'Correct 10mg delivered in 22 mins, apology kit', csat: '5.0 ⭐', status: 'Closed' }
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: '',
    filter: 'ALL',
    complaintFilter: 'ALL',
    complaintSearch: ''
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0 || h.indexOf('subscription') >= 0 || h.indexOf('doctor') >= 0 || h.indexOf('prediction') >= 0 || h.indexOf('ai-assistant') >= 0 || h === 'ai') {
      return null;
    }
    if (h === 'customer-dashboard' || h === 'customers' || h === 'customers-360') return 'dashboard';
    if (h === 'all-customers' || h === 'customers-list') return 'all-customers';
    if (h === 'new-customers' || h === 'customer-acquisition') return 'new-customers';
    if (h === 'active-customers') return 'active-customers';
    if (h === 'repeat-customers') return 'repeat-customers';
    if (h === 'customer-lifetime-value' || h === 'clv' || h === 'ltv') return 'lifetime-value';
    if (h === 'customer-segmentation') return 'segmentation';
    if (h === 'customer-orders') return 'orders';
    if (h === 'customer-revenue') return 'revenue';
    if (h === 'customer-retention') return 'retention';
    if (h.indexOf('complain') >= 0 || h.indexOf('grievance') >= 0) return 'complaints';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('doctor') >= 0 || raw.indexOf('prediction') >= 0 || raw.indexOf('ai assistant') >= 0 || /\bai\b/.test(raw)) return null;

    if (raw === 'customer dashboard' || raw === 'customers 360°' || raw === 'customers') return 'dashboard';
    if (raw === 'all customers') return 'all-customers';
    if (raw === 'new customers') return 'new-customers';
    if (raw === 'active customers') return 'active-customers';
    if (raw === 'repeat customers') return 'repeat-customers';
    if (raw === 'customer lifetime value') return 'lifetime-value';
    if (raw === 'customer segmentation') return 'segmentation';
    if (raw === 'customer orders') return 'orders';
    if (raw === 'customer revenue') return 'revenue';
    if (raw === 'customer retention') return 'retention';
    if (raw.indexOf('complain') >= 0 || raw.indexOf('grievance') >= 0) return 'complaints';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zc360-kpi">',
      '<div class="zc360-kpi-top">',
      '<span class="zc360-kpi-label">' + esc(label) + '</span>',
      '<span class="zc360-kpi-icon">' + esc(icon || '👥') + '</span>',
      '</div>',
      '<div class="zc360-kpi-val">' + esc(val) + '</div>',
      '<div class="zc360-kpi-bottom">',
      '<span class="zc360-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
      '<span class="zc360-subtext">' + esc(subtext) + '</span>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 1. Render Customer Dashboard ────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Total Customer Base', '12,480', '+18.4%', 'up', 'Verified pet parents', '👥'),
      kpiHtml('Active 30-Day Transactors', '8,920', '+22.1%', 'up', 'Purchased or clinic visit', '⚡'),
      kpiHtml('Avg. Lifetime Value (LTV)', '₹42,650', '+14.6%', 'up', 'Across all cohorts', '💎'),
      kpiHtml('Repeat Purchase Rate', '74.8%', '+5.2%', 'up', 'High loyalty stickiness', '🔄'),
      kpiHtml('Customer CSAT Score', '96.4%', '+2.1%', 'up', '4.8/5.0 across 4,200 reviews', '⭐'),
      kpiHtml('Net Churn Rate', '1.8%', '-0.6%', 'up', 'Industry leading retention', '📉'),
      '</div>',

      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">👥 Unified Pet Parent Relationship Matrix</h3>',
      '<p class="zc360-card-sub">Registered pets, historical transaction volume, loyalty tiers, and churn risk (10 records)</p>',
      '</div>',
      '<button class="zc360-btn primary" onclick="ZenveCustomersDashboard.showOnboardModal()">+ Add Customer Profile</button>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>Customer ID</th><th>Pet Parent Name</th><th>Registered Pets</th><th>Loyalty Tier</th><th>Lifetime Value</th><th>Orders</th><th>MTD Spend</th><th>Last Touch</th><th>Risk</th><th>Status</th></tr></thead>',
      '<tbody>',
      CUSTOMERS.map(function (c) {
        var tierClass = c.tier.indexOf('VIP') >= 0 ? 'active' : c.tier.indexOf('Gold') >= 0 ? 'warning' : 'neutral';
        var riskClass = (c.churnRisk === 'Very Low' || c.churnRisk === 'Low') ? 'active' : (c.churnRisk === 'Medium' ? 'warning' : 'critical');
        var statusClass = c.status === 'Active' ? 'active' : 'critical';
        return '<tr>' +
          '<td style="font-family:monospace;font-weight:700;color:#2563eb;">' + esc(c.id) + '</td>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(c.name) + '</td>' +
          '<td style="color:#475569;font-weight:500;">🐾 ' + esc(c.pets) + '</td>' +
          '<td><span class="zc360-pill ' + tierClass + '">' + esc(c.tier) + '</span></td>' +
          '<td style="font-weight:700;color:#059669;">' + esc(c.ltv) + '</td>' +
          '<td style="font-weight:700;">' + c.ordersCount + '</td>' +
          '<td style="font-weight:600;color:#0f172a;">' + esc(c.mtdSpend) + '</td>' +
          '<td style="color:#64748b;font-size:12px;">' + esc(c.lastOrder) + '</td>' +
          '<td><span class="zc360-pill ' + riskClass + '">' + esc(c.churnRisk) + '</span></td>' +
          '<td><span class="zc360-pill ' + statusClass + '">' + esc(c.status) + '</span></td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 2. Render All Customers ─────────────────────────────────────── */
  function renderAllCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Master Customer Profiles', '12,480', '+16.2%', 'up', 'Verified contact records', '📋'),
      kpiHtml('Bengaluru Core Base', '78.4%', '+4.5%', 'up', 'Indiranagar, Koramangala & HSR', '📍'),
      kpiHtml('Multi-Pet Households', '34.2%', '+8.1%', 'up', 'Multi-pet owners (High ARPU)', '🐾'),
      kpiHtml('Verified Email & WhatsApp', '98.6%', '+1.2%', 'up', 'DPDP Act compliant', '🛡️'),
      '</div>',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">📋 Comprehensive Customer Directory</h3>',
      '<p class="zc360-card-sub">Active pet parent directory with verified communications and verified pet patient ownership (10 records)</p>',
      '</div>',
      '<button class="zc360-btn primary" onclick="ZenveCustomersDashboard.showOnboardModal()">+ Add Customer Profile</button>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>Customer ID</th><th>Pet Parent</th><th>Phone</th><th>Email</th><th>Location</th><th>Pets</th><th>Tier</th><th>Total Spend</th><th>Member Since</th><th>Status</th></tr></thead>',
      '<tbody>',
      ALL_CUSTOMERS_LIST.map(function (c) {
        var tierClass = c.tier.indexOf('VIP') >= 0 ? 'active' : c.tier.indexOf('Gold') >= 0 ? 'warning' : 'neutral';
        var statusClass = c.status === 'Active' ? 'active' : 'critical';
        return '<tr>' +
          '<td style="font-family:monospace;font-weight:700;color:#2563eb;">' + esc(c.id) + '</td>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(c.name) + '</td>' +
          '<td style="color:#64748b;font-family:monospace;">' + esc(c.phone) + '</td>' +
          '<td style="color:#475569;">' + esc(c.email) + '</td>' +
          '<td style="font-weight:600;">' + esc(c.location) + '</td>' +
          '<td style="color:#475569;font-size:12px;">🐾 ' + esc(c.pets) + '</td>' +
          '<td><span class="zc360-pill ' + tierClass + '">' + esc(c.tier) + '</span></td>' +
          '<td style="font-weight:700;color:#059669;">' + esc(c.totalSpend) + '</td>' +
          '<td style="color:#64748b;font-size:12px;">' + esc(c.joinDate) + '</td>' +
          '<td><span class="zc360-pill ' + statusClass + '">' + esc(c.status) + '</span></td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 3. Render New Customers ─────────────────────────────────────── */
  function renderNewCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('New Customers (MTD)', '842', '+28.4%', 'up', 'Across organic & paid channels', '✨'),
      kpiHtml('Blended CAC', '₹295', '-14.2%', 'up', 'Efficient referral mix', '📉'),
      kpiHtml('Day-1 Activation Rate', '68.4%', '+6.8%', 'up', 'First purchase within 24h', '⚡'),
      kpiHtml('First Order Avg Basket', '₹3,275', '+12.5%', 'up', 'Welcome bundle attach', '🛒'),
      '</div>',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">✨ Recent New Customer Conversions</h3>',
      '<p class="zc360-card-sub">Real-time first-time pet parent signups, attribution source, and first order values (10 records)</p>',
      '</div>',
      '<span class="zc360-pill active">Real-Time Acquisition Stream</span>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>ID</th><th>Parent</th><th>Pet Details</th><th>Channel</th><th>Signup Date</th><th>First Order</th><th>Attributed CAC</th><th>Status</th></tr></thead>',
      '<tbody>',
      NEW_CUSTOMERS_LIST.map(function (n) {
        return '<tr>' +
          '<td style="font-family:monospace;font-weight:700;color:#2563eb;">' + esc(n.id) + '</td>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(n.name) + '</td>' +
          '<td style="color:#475569;font-weight:500;">🐾 ' + esc(n.pet) + '</td>' +
          '<td><span class="zc360-pill active">' + esc(n.channel) + '</span></td>' +
          '<td style="color:#64748b;font-size:12px;">' + esc(n.date) + '</td>' +
          '<td style="font-weight:700;color:#059669;">' + esc(n.firstOrder) + '</td>' +
          '<td style="color:#64748b;font-weight:600;">' + esc(n.cac) + '</td>' +
          '<td><span class="zc360-pill success">' + esc(n.status) + '</span></td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 4. Render Active Customers ──────────────────────────────────── */
  function renderActiveCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Monthly Active Customers', '8,920', '+22.1%', 'up', 'Transacting or visiting clinics', '⚡'),
      kpiHtml('DAU / MAU Stickiness', '28.6%', '+4.2%', 'up', 'Top quartile consumer health app', '📱'),
      kpiHtml('Avg Order Interval', '14.2 Days', '-2.8 Days', 'up', 'Faster replenishment cycles', '⏱️'),
      kpiHtml('Omni-Channel Engaged', '44.8%', '+9.5%', 'up', 'App + In-Clinic touchpoints', '🏬'),
      '</div>',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">⚡ Active Cadence & Platform Cohorts</h3>',
      '<p class="zc360-card-sub">Engagement frequency tiers, service touchpoint preferences, and velocity tracking (10 records)</p>',
      '</div>',
      '<span class="zc360-pill active">Rolling 30-Day Cohort Analysis</span>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>Engagement Cohort</th><th>Active Count</th><th>Share of Base</th><th>Behavior Profile</th><th>Dominant Service</th><th>Growth Velocity</th></tr></thead>',
      '<tbody>',
      ACTIVE_COHORTS_LIST.map(function (c) {
        return '<tr>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(c.cohort) + '</td>' +
          '<td style="font-weight:700;color:#2563eb;font-family:monospace;">' + esc(c.count) + '</td>' +
          '<td style="font-weight:600;">' + esc(c.pctTotal) + '</td>' +
          '<td style="color:#475569;font-size:12px;">' + esc(c.frequency) + '</td>' +
          '<td style="color:#64748b;font-weight:600;">' + esc(c.topActivity) + '</td>' +
          '<td style="color:#059669;font-weight:700;">' + esc(c.trend) + '</td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 5. Render Repeat Customers ──────────────────────────────────── */
  function renderRepeatCustomers() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Overall Repeat Purchase Rate', '74.8%', '+5.2%', 'up', 'Highest retention tier in market', '🔄'),
      kpiHtml('Repeat Customer Revenue', '₹2.84 Cr MTD', '+19.4%', 'up', 'Predictable recurring baseline', '💰'),
      kpiHtml('Avg Order Count / User', '6.8 Orders', '+1.4', 'up', 'Annualized replenishment rate', '🛒'),
      kpiHtml('Reorder Retention 90D', '81.2%', '+6.5%', 'up', '90-day repurchase frequency', '🛡️'),
      '</div>',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">🔄 Customer Order Frequency Ladder</h3>',
      '<p class="zc360-card-sub">Order progression distribution, reorder likelihood, and automated marketing triggers (10 records)</p>',
      '</div>',
      '<span class="zc360-pill active">Automated Habit Loops Active</span>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>Order Ladder</th><th>Customer Count</th><th>Base Share</th><th>Next Purchase Likelihood</th><th>Days to Reorder</th><th>CRM Trigger</th></tr></thead>',
      '<tbody>',
      REPEAT_METRICS_LIST.map(function (r) {
        return '<tr>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(r.tier) + '</td>' +
          '<td style="font-weight:700;color:#2563eb;font-family:monospace;">' + r.count.toLocaleString() + '</td>' +
          '<td style="font-weight:600;">' + esc(r.share) + '</td>' +
          '<td style="color:#059669;font-weight:700;">' + esc(r.nextPurchaseProb) + '</td>' +
          '<td style="color:#64748b;font-weight:600;">' + esc(r.avgDaysToReorder) + '</td>' +
          '<td style="color:#475569;font-size:12px;">' + esc(r.marketingAction) + '</td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 6. Render Customer Lifetime Value ───────────────────────────── */
  function renderLifetimeValue() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Average Blended LTV', '₹42,650', '+14.6%', 'up', 'Across all customer segments', '💎'),
      kpiHtml('Blended LTV : CAC Multiple', '8.4x', '+1.2x', 'up', 'Top-tier capital efficiency', '📈'),
      kpiHtml('Avg Customer Lifespan', '21.4 Months', '+3.8 Mo', 'up', 'Subscribers & clinic clients', '⏳'),
      kpiHtml('Cumulative Cohort GMV', '₹14.8 Cr', '+26.2%', 'up', 'Realized value since launch', '💰'),
      '</div>',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">💎 Lifetime Value (LTV) Tier Breakdown</h3>',
      '<p class="zc360-card-sub">Predictive CLV tiers, cumulative cohort GMV, and gross margin contribution (10 records)</p>',
      '</div>',
      '<span class="zc360-pill success">High Unit Economics Health</span>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>Tier Segment</th><th>Customers</th><th>Avg Lifespan</th><th>Annual Spend</th><th>Estimated LTV</th><th>Margin %</th><th>LTV:CAC</th></tr></thead>',
      '<tbody>',
      LTV_SEGMENTS_LIST.map(function (s) {
        return '<tr>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(s.segment) + '</td>' +
          '<td style="font-weight:700;color:#2563eb;font-family:monospace;">' + s.customers.toLocaleString() + '</td>' +
          '<td style="color:#64748b;">' + esc(s.avgLifespan) + '</td>' +
          '<td style="font-weight:600;color:#0f172a;">' + esc(s.avgAnnualSpend) + '</td>' +
          '<td style="font-weight:700;color:#059669;">' + esc(s.ltvValue) + '</td>' +
          '<td style="font-weight:600;">' + esc(s.marginContrib) + '</td>' +
          '<td style="font-weight:700;color:#2563eb;">' + esc(s.ltvCac) + '</td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 7. Render Customer Segmentation ─────────────────────────────── */
  function renderSegmentation() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Persona Clusters', '10 Active', '+2 New', 'up', 'Dynamic daily cluster update', '🧩'),
      kpiHtml('Multi-Pet Cluster Share', '28.5%', '+6.4%', 'up', 'Multi-pet owners (High basket)', '🐾'),
      kpiHtml('Senior & Chronic Care', '17.5%', '+4.2%', 'up', 'High recurring predictability', '🩺'),
      kpiHtml('Segment Campaign ROAS', '6.8x', '+1.4x', 'up', 'Hyper-personalized CRM', '🎯'),
      '</div>',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">🧩 Behavioral Cohort Matrix</h3>',
      '<p class="zc360-card-sub">RFM behavioral cohorts, basket composition metrics, and active CRM playbooks (10 records)</p>',
      '</div>',
      '<span class="zc360-pill active">RFM Clustering Live</span>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>Segment Persona</th><th>Count</th><th>Share</th><th>Behavior</th><th>AOV</th><th>Annual ARPU</th><th>Active Campaign</th></tr></thead>',
      '<tbody>',
      SEGMENTS_LIST.map(function (s) {
        return '<tr>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(s.name) + '</td>' +
          '<td style="font-weight:700;color:#2563eb;font-family:monospace;">' + s.count.toLocaleString() + '</td>' +
          '<td style="font-weight:600;">' + esc(s.share) + '</td>' +
          '<td style="color:#475569;font-size:12px;">' + esc(s.behavior) + '</td>' +
          '<td style="font-weight:600;color:#0f172a;">' + esc(s.aov) + '</td>' +
          '<td style="font-weight:700;color:#059669;">' + esc(s.arpu) + '</td>' +
          '<td style="color:#2563eb;font-size:12px;font-weight:600;">' + esc(s.campaign) + '</td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 8. Render Customer Orders ───────────────────────────────────── */
  function renderOrders() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Total Customer Orders', '18,640', '+21.5%', 'up', 'Across app, clinic & web', '🛒'),
      kpiHtml('Average Order Value', '₹3,480', '+8.6%', 'up', 'Combined retail & medical basket', '💰'),
      kpiHtml('60-Min Fast Delivery', '62.4%', '+14.8%', 'up', 'Hyperlocal quick-commerce', '⚡'),
      kpiHtml('Omni-Basket Attach', '38.6%', '+7.2%', 'up', 'Food + Meds + Spa cross-sell', '📦'),
      '</div>',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">🛒 Recent Customer Purchases & Services</h3>',
      '<p class="zc360-card-sub">Live omnichannel transaction stream, clinic invoices, and delivery tracking (10 records)</p>',
      '</div>',
      '<span class="zc360-pill active">Live Order Feed Active</span>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>Order ID</th><th>Pet Parent</th><th>Pet Patient</th><th>Items</th><th>Total</th><th>Channel</th><th>Fulfillment</th><th>Time</th></tr></thead>',
      '<tbody>',
      CUSTOMER_ORDERS_LIST.map(function (o) {
        return '<tr>' +
          '<td style="font-family:monospace;font-weight:700;color:#2563eb;">' + esc(o.id) + '</td>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(o.parent) + '</td>' +
          '<td style="color:#475569;">🐾 ' + esc(o.pet) + '</td>' +
          '<td style="color:#334155;font-size:12px;max-width:280px;white-space:normal;">' + esc(o.items) + '</td>' +
          '<td style="font-weight:700;color:#059669;">' + esc(o.total) + '</td>' +
          '<td><span class="zc360-pill active">' + esc(o.channel) + '</span></td>' +
          '<td><span class="zc360-pill success">' + esc(o.fulfillment) + '</span></td>' +
          '<td style="color:#64748b;font-size:12px;">' + esc(o.time) + '</td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 9. Render Customer Revenue ──────────────────────────────────── */
  function renderRevenue() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Customer Revenue (MTD)', '₹3.11 Cr', '+24.8%', 'up', 'Total billed retail & clinical revenue', '💰'),
      kpiHtml('Monthly User ARPU', '₹3,486', '+11.2%', 'up', 'Across active transacting parents', '📈'),
      kpiHtml('Blended Gross Margin', '44.8%', '+3.6%', 'up', 'Driven by vet care & pharmacy mix', '💎'),
      kpiHtml('Subscription Recurring', '18.2%', '+5.4%', 'up', 'Predictable recurring replenishment', '🔄'),
      '</div>',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">💰 Customer Revenue by Channel</h3>',
      '<p class="zc360-card-sub">Monetization breakdown across quick commerce, clinic consultations, pharmacy & spas (10 records)</p>',
      '</div>',
      '<span class="zc360-pill success">Gross Margin Target Met</span>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>Channel</th><th>MTD Revenue</th><th>Share</th><th>Avg Spend</th><th>Gross Margin</th><th>YoY Growth</th></tr></thead>',
      '<tbody>',
      REVENUE_CHANNELS_LIST.map(function (r) {
        return '<tr>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(r.channel) + '</td>' +
          '<td style="font-weight:700;color:#059669;font-family:monospace;">' + esc(r.mtdRev) + '</td>' +
          '<td style="font-weight:700;color:#2563eb;">' + esc(r.share) + '</td>' +
          '<td style="color:#475569;font-weight:600;">' + esc(r.avgSpend) + '</td>' +
          '<td style="font-weight:600;color:#0f172a;">' + esc(r.grossMargin) + '</td>' +
          '<td style="color:#059669;font-weight:700;">' + esc(r.growth) + '</td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 10. Render Customer Retention ───────────────────────────────── */
  function renderRetention() {
    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Month-1 Cohort Retention', '84.6%', '+3.8%', 'up', 'Day-30 retention benchmark', '🛡️'),
      kpiHtml('Annual Churn Rate', '1.8% / mo', '-0.6%', 'up', 'Subscribers & clinic clients', '📉'),
      kpiHtml('Win-Back Success', '38.4%', '+7.2%', 'up', 'Automated reminder triggers', '🔄'),
      kpiHtml('Net Revenue Retention', '124.6%', '+8.4%', 'up', 'Expansion revenue from existing base', '💎'),
      '</div>',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">🛡️ Longitudinal Cohort Retention Analysis (M1 - M12)</h3>',
      '<p class="zc360-card-sub">Tracking customer longevity, repurchase consistency, and cohort decay across 10 distinct monthly cohorts</p>',
      '</div>',
      '<span class="zc360-pill active">Cohort Decay Stabilized</span>',
      '</div>',
      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead><tr><th>Cohort Inception</th><th>Initial Users</th><th>Month 1</th><th>Month 3</th><th>Month 6</th><th>Month 12</th><th>Status</th></tr></thead>',
      '<tbody>',
      RETENTION_COHORTS_LIST.map(function (c) {
        return '<tr>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(c.cohortMonth) + '</td>' +
          '<td style="font-weight:700;color:#2563eb;font-family:monospace;">' + c.initialSize.toLocaleString() + '</td>' +
          '<td style="color:#059669;font-weight:700;">' + esc(c.m1) + '</td>' +
          '<td style="color:#059669;font-weight:600;">' + esc(c.m3) + '</td>' +
          '<td style="color:#2563eb;font-weight:600;">' + esc(c.m6) + '</td>' +
          '<td style="font-weight:700;color:#0f172a;">' + esc(c.m12) + '</td>' +
          '<td><span class="zc360-pill success">' + esc(c.status) + '</span></td>' +
          '</tr>';
      }).join(''),
      '</tbody>',
      '</table>',
      '</div>',
      '</div>'
    ].join('');
  }

  /* ── 11. Render Customer Complaints ──────────────────────────────── */
  function renderComplaints() {
    var list = GRIEVANCES.slice();
    if (S.complaintFilter && S.complaintFilter !== 'ALL') {
      list = list.filter(function (g) {
        if (S.complaintFilter === 'OPEN') return g.status !== 'Closed';
        if (S.complaintFilter === 'CLOSED') return g.status === 'Closed';
        return g.category.toLowerCase().indexOf(S.complaintFilter.toLowerCase()) >= 0;
      });
    }
    if (S.complaintSearch) {
      var q = S.complaintSearch.toLowerCase();
      list = list.filter(function (g) {
        return g.id.toLowerCase().indexOf(q) >= 0 ||
          g.parent.toLowerCase().indexOf(q) >= 0 ||
          g.pet.toLowerCase().indexOf(q) >= 0 ||
          g.issue.toLowerCase().indexOf(q) >= 0 ||
          g.category.toLowerCase().indexOf(q) >= 0;
      });
    }

    return [
      '<div class="zc360-kpi-grid">',
      kpiHtml('Total Grievance Tickets', '10', '-18.0%', 'up', '100% resolved within SLA', '⚠️'),
      kpiHtml('First Contact Resolution', '92.4%', '+4.8%', 'up', 'Resolved on first interaction', '⚡'),
      kpiHtml('Avg. Resolution Time', '21 mins', '-8 mins', 'up', 'Industry leading turnaround', '⏱️'),
      kpiHtml('Post-Resolution CSAT', '4.9 ⭐', '+0.3', 'up', 'Pet parent verified feedback', '⭐'),
      kpiHtml('Cold-Chain / Rx SLA', '100%', '0.0%', 'neutral', 'Zero temperature deviations', '❄️'),
      kpiHtml('Sentiment Recovery', '98.2%', '+2.4%', 'up', 'At-risk customer retention', '❤️'),
      '</div>',

      '<div class="zc360-grid-2">',
      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<h3 class="zc360-card-title">📊 Grievance Category & Root-Cause Distribution</h3>',
      '<span class="zc360-pill active">Real-Time Telemetry</span>',
      '</div>',
      '<div style="display:flex;flex-direction:column;gap:12px;padding:4px 0;">',
      '<div>',
      '<div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px;">',
      '<span>🚚 Delivery Logistics & Delay (3 tickets)</span><span style="color:#2563eb;">30%</span>',
      '</div>',
      '<div class="zc360-progress-bar"><div class="zc360-progress-fill info" style="width:30%;"></div></div>',
      '</div>',
      '<div>',
      '<div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px;">',
      '<span>📦 Packaging & Seal Integrity (2 tickets)</span><span style="color:#8b5cf6;">20%</span>',
      '</div>',
      '<div class="zc360-progress-bar"><div class="zc360-progress-fill purple" style="width:20%;"></div></div>',
      '</div>',
      '<div>',
      '<div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px;">',
      '<span>❄️ Pharmacy & Cold-Chain SLA (2 tickets)</span><span style="color:#10b981;">20%</span>',
      '</div>',
      '<div class="zc360-progress-bar"><div class="zc360-progress-fill success" style="width:20%;"></div></div>',
      '</div>',
      '<div>',
      '<div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px;">',
      '<span>🏥 Clinic & Appointment Wait (2 tickets)</span><span style="color:#f59e0b;">20%</span>',
      '</div>',
      '<div class="zc360-progress-bar"><div class="zc360-progress-fill warning" style="width:20%;"></div></div>',
      '</div>',
      '<div>',
      '<div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px;">',
      '<span>💳 Billing & Payment Gateway (1 ticket)</span><span style="color:#ef4444;">10%</span>',
      '</div>',
      '<div class="zc360-progress-bar"><div class="zc360-progress-fill danger" style="width:10%;"></div></div>',
      '</div>',
      '</div>',
      '</div>',

      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<h3 class="zc360-card-title">📋 SOP Remedies & Resolution Matrix</h3>',
      '<span class="zc360-pill critical">Strict Tier-1 Protocol</span>',
      '</div>',
      '<div class="zc360-sop-grid">',
      '<div class="zc360-sop-card">',
      '<div class="zc360-sop-badge">🚚 Delivery Delay > 20 Mins</div>',
      '<div class="zc360-sop-rule">Full Delivery Waiver + ₹200 Credit</div>',
      '<div class="zc360-sop-desc">Auto-triggered if rider GPS exceeds 70 mins. Rider lead calls customer with live status ETA.</div>',
      '</div>',
      '<div class="zc360-sop-card">',
      '<div class="zc360-sop-badge">❄️ Cold-Chain > 8°C Deviation</div>',
      '<div class="zc360-sop-rule">Instant Swap + Vet Sign-off</div>',
      '<div class="zc360-sop-desc">Vaccines and insulins replaced at ₹0 fee from nearest dark-store fridge hub within 25 mins.</div>',
      '</div>',
      '<div class="zc360-sop-card">',
      '<div class="zc360-sop-badge">📦 Torn Kibble / Damaged Seal</div>',
      '<div class="zc360-sop-rule">100% Free Swap + Treat Pouch</div>',
      '<div class="zc360-sop-desc">No return pickup required. New sealed pack sent immediately with complimentary treat.</div>',
      '</div>',
      '<div class="zc360-sop-card">',
      '<div class="zc360-sop-badge">🏥 Clinic Reschedule by Hospital</div>',
      '<div class="zc360-sop-rule">VIP Priority Slot + Free Checkup</div>',
      '<div class="zc360-sop-desc">If emergency surgery delays doctor, customer receives guaranteed next-slot bypass + free nails trim.</div>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',

      '<div class="zc360-card">',
      '<div class="zc360-card-head">',
      '<div>',
      '<h3 class="zc360-card-title">⚠️ Live Customer Support & Grievance Register</h3>',
      '<p style="margin:2px 0 0;font-size:12px;color:#64748b;">Active customer complaints, priority triage, SLA countdowns, and resolution logging (10 records)</p>',
      '</div>',
      '<div class="zc360-table-actions">',
      '<input type="text" class="zc360-search" placeholder="Search ticket, parent, pet, or issue..." value="' + esc(S.complaintSearch || '') + '" oninput="ZenveCustomersDashboard.searchGrievances(this.value)" />',
      '<div class="zc360-filter-group">',
      ['ALL', 'Delivery', 'Packaging', 'Billing', 'Clinic', 'Pharmacy', 'OPEN'].map(function (f) {
        var active = (S.complaintFilter === f) ? ' active' : '';
        return '<button class="zc360-filter-btn' + active + '" onclick="ZenveCustomersDashboard.filterGrievances(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '</div>',
      '<button class="zc360-btn primary" onclick="ZenveCustomersDashboard.showGrievanceModal()">+ Log New Grievance</button>',
      '</div>',
      '</div>',

      '<div class="zc360-table-wrap">',
      '<table class="zc360-table">',
      '<thead>',
      '<tr>',
      '<th>Ticket ID</th>',
      '<th>Pet Parent & Pet</th>',
      '<th>Category</th>',
      '<th>Priority</th>',
      '<th>Grievance Issue & Description</th>',
      '<th>Care Rep</th>',
      '<th>SLA Time</th>',
      '<th>Remedy / Outcome</th>',
      '<th>CSAT</th>',
      '<th>Status</th>',
      '<th>Actions</th>',
      '</tr>',
      '</thead>',
      '<tbody>',
      (list.length === 0 ? '<tr><td colspan="11" style="text-align:center;padding:28px;color:#94a3b8;">No customer grievance records found</td></tr>' :
        list.map(function (g) {
          var prioClass = g.priority === 'Critical' ? 'critical' : g.priority === 'High' ? 'warning' : 'active';
          var statusClass = g.status === 'Closed' ? 'active' : 'critical';
          return '<tr>' +
            '<td style="font-family:monospace;font-weight:700;color:#2563eb;">' + esc(g.id) + '</td>' +
            '<td><div style="font-weight:700;color:#0f172a;">' + esc(g.parent) + '</div><div style="font-size:11px;color:#64748b;">🐾 ' + esc(g.pet) + '</div></td>' +
            '<td><span class="zc360-pill">' + esc(g.category) + '</span></td>' +
            '<td><span class="zc360-pill ' + prioClass + '">' + esc(g.priority) + '</span></td>' +
            '<td style="max-width:280px;line-height:1.4;"><div style="font-weight:600;color:#1e293b;">' + esc(g.issue) + '</div></td>' +
            '<td style="font-size:12px;color:#475569;font-weight:600;">' + esc(g.rep) + '</td>' +
            '<td style="font-weight:700;color:#0f172a;">' + esc(g.sla) + '</td>' +
            '<td style="color:#059669;font-weight:600;font-size:12px;">' + esc(g.remedy) + '</td>' +
            '<td style="font-weight:700;color:#eab308;">' + esc(g.csat) + '</td>' +
            '<td><span class="zc360-pill ' + statusClass + '">' + esc(g.status) + '</span></td>' +
            '<td>' +
            (g.status === 'Closed'
              ? '<button class="zc360-btn sm" onclick="alert(\'Ticket ' + g.id + ' is fully resolved.\\nOutcome: ' + g.remedy.replace(/'/g, "\\'") + '\')">View Details</button>'
              : '<button class="zc360-btn sm primary" onclick="ZenveCustomersDashboard.resolveGrievance(\'' + g.id + '\')">Resolve Ticket</button>') +
            '</td>' +
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
      '<header class="zc360-head">',
      '<div class="zc360-head-left">',
      '<div class="zc360-title-row">',
      '<h2 class="zc360-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
      '<span class="zc360-live-badge"><span class="zc360-pulse-dot"></span> Customer 360° · Active</span>',
      '</div>',
      '<p class="zc360-sub">' + esc(currentTab.sub) + '</p>',
      '</div>',
      '<div class="zc360-head-actions">',
      '<button class="zc360-btn primary" onclick="ZenveCustomersDashboard.showOnboardModal()">+ Add Customer</button>',
      '</div>',
      '</header>',

      '<nav class="zc360-tabs-bar">',
      TABS.map(function (t) {
        var active = t.id === S.tab ? ' active' : '';
        return '<button class="zc360-tab' + active + '" onclick="ZenveCustomersDashboard.switchTab(\'' + t.id + '\')">' +
          '<span>' + t.icon + '</span>' +
          '<span>' + esc(t.label) + '</span>' +
          '<span class="zc360-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
      }).join(''),
      '</nav>',

      '<div class="zc360-body">'
    ];

    switch (S.tab) {
      case 'dashboard': html.push(renderDashboard()); break;
      case 'all-customers': html.push(renderAllCustomers()); break;
      case 'new-customers': html.push(renderNewCustomers()); break;
      case 'active-customers': html.push(renderActiveCustomers()); break;
      case 'repeat-customers': html.push(renderRepeatCustomers()); break;
      case 'lifetime-value': html.push(renderLifetimeValue()); break;
      case 'segmentation': html.push(renderSegmentation()); break;
      case 'orders': html.push(renderOrders()); break;
      case 'revenue': html.push(renderRevenue()); break;
      case 'retention': html.push(renderRetention()); break;
      case 'complaints': html.push(renderComplaints()); break;
      default: html.push(renderDashboard());
    }

    html.push('</div>');
    root.innerHTML = html.join('');
  }

  /* ── Modal Mechanics ─────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var modal = document.createElement('div');
    modal.className = 'zc360-modal-overlay';
    modal.id = 'zc360-modal';
    modal.innerHTML = '<div class="zc360-modal-card">' + contentHtml + '</div>';
    document.body.appendChild(modal);
  }

  function closeModal() {
    var modal = document.getElementById('zc360-modal');
    if (modal) modal.remove();
  }

  function showOnboardModal() {
    var formHtml = [
      '<div class="zc360-modal-head">',
      '<h3 class="zc360-modal-title">👥 Create Pet Parent Profile</h3>',
      '<button class="zc360-btn" onclick="ZenveCustomersDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Customer profile created! Welcome kit and referral reward dispatched!\'); ZenveCustomersDashboard.closeModal();">',
      '<div class="zc360-form-group"><label>Pet Parent Full Name</label><input type="text" class="zc360-input" placeholder="e.g. Tanvi Deshmukh" required /></div>',
      '<div class="zc360-form-row">',
      '<div class="zc360-form-group"><label>Mobile Number</label><input type="tel" class="zc360-input" placeholder="+91 98450 99999" required /></div>',
      '<div class="zc360-form-group"><label>City & Neighborhood</label><input type="text" class="zc360-input" placeholder="e.g. Indiranagar, BLR" required /></div>',
      '</div>',
      '<div class="zc360-form-row">',
      '<div class="zc360-form-group"><label>Registered Pet Name & Breed</label><input type="text" class="zc360-input" placeholder="e.g. Sparky (Beagle)" required /></div>',
      '<div class="zc360-form-group"><label>Initial Loyalty Tier</label><select class="zc360-select"><option>New Subscriber</option><option>Occasional Silver</option><option>Loyal Gold</option><option>VIP Elite</option></select></div>',
      '</div>',
      '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
      '<button type="button" class="zc360-btn" onclick="ZenveCustomersDashboard.closeModal()">Cancel</button>',
      '<button type="submit" class="zc360-btn primary">Save & Activate Profile</button>',
      '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function filterGrievances(f) {
    S.complaintFilter = f;
    render();
  }

  function searchGrievances(q) {
    S.complaintSearch = q;
    render();
  }

  function resolveGrievance(id) {
    var ticket = GRIEVANCES.find(function (g) { return g.id === id; });
    if (!ticket) return;
    var remedy = prompt('Enter resolution outcome & compensation for ticket ' + id + ' (' + ticket.parent + '):', 'Full fee refund + ₹200 wallet credit provided');
    if (remedy) {
      ticket.status = 'Closed';
      ticket.remedy = remedy;
      ticket.sla = 'Resolved just now';
      ticket.csat = '5.0 ⭐';
      render();
      alert('Ticket ' + id + ' marked as Resolved & Closed! Pet parent notified via SMS/WhatsApp.');
    }
  }

  function showGrievanceModal() {
    var formHtml = [
      '<div class="zc360-modal-head">',
      '<h3 class="zc360-modal-title">⚠️ Log Customer Grievance</h3>',
      '<button class="zc360-btn" onclick="ZenveCustomersDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); ZenveCustomersDashboard.submitGrievance(this);">',
      '<div class="zc360-form-row">',
      '<div class="zc360-form-group"><label>Pet Parent Name</label><input type="text" name="parent" class="zc360-input" placeholder="e.g. Roshni Kapoor" required /></div>',
      '<div class="zc360-form-group"><label>Pet Name & Breed</label><input type="text" name="pet" class="zc360-input" placeholder="e.g. Bella (Beagle)" required /></div>',
      '</div>',
      '<div class="zc360-form-row">',
      '<div class="zc360-form-group"><label>Complaint Category</label>',
      '<select name="category" class="zc360-select">',
      '<option value="Delivery Delay">Delivery Delay (Dark Store)</option>',
      '<option value="Product Packaging">Product Packaging / Damaged Seal</option>',
      '<option value="Cold-Chain Pharmacy">Cold-Chain Pharmacy (Temperature)</option>',
      '<option value="Clinic Reschedule">Clinic OPD Reschedule</option>',
      '<option value="Billing Query">Billing & Loyalty Coins</option>',
      '<option value="Grooming Service">Grooming Service Issue</option>',
      '</select>',
      '</div>',
      '<div class="zc360-form-group"><label>Priority Level</label>',
      '<select name="priority" class="zc360-select">',
      '<option value="Critical">Critical (Immediate Triage)</option>',
      '<option value="High">High (Within 15 mins)</option>',
      '<option value="Medium" selected>Medium (Standard)</option>',
      '<option value="Low">Low (Informational)</option>',
      '</select>',
      '</div>',
      '</div>',
      '<div class="zc360-form-group"><label>Grievance Description</label><textarea name="issue" class="zc360-input" rows="3" placeholder="Describe customer issue, order ID, and pet parent feedback..." required style="resize:vertical;"></textarea></div>',
      '<div class="zc360-form-row">',
      '<div class="zc360-form-group"><label>Assigned Care Specialist</label><input type="text" name="rep" class="zc360-input" value="Kiran R. (Escalation Lead)" required /></div>',
      '<div class="zc360-form-group"><label>Initial Remedy Offer</label><input type="text" name="remedy" class="zc360-input" placeholder="e.g. Instant replacement + ₹200 wallet bonus" required /></div>',
      '</div>',
      '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
      '<button type="button" class="zc360-btn" onclick="ZenveCustomersDashboard.closeModal()">Cancel</button>',
      '<button type="submit" class="zc360-btn primary">Log & Initiate SLA Timer</button>',
      '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function submitGrievance(form) {
    var newId = 'TICK-' + (4400 + GRIEVANCES.length + 1);
    var newTicket = {
      id: newId,
      parent: form.parent.value,
      pet: form.pet.value,
      category: form.category.value,
      priority: form.priority.value,
      issue: form.issue.value,
      rep: form.rep.value,
      sla: 'Active (Now)',
      remedy: form.remedy.value,
      csat: 'Pending',
      status: 'Investigating'
    };
    GRIEVANCES.unshift(newTicket);
    closeModal();
    render();
    alert('Complaint ' + newId + ' registered! Priority alert dispatched to ' + newTicket.rep);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zc360-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zc360-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zb2b-root', 'zix-root', 'zsub-root', 'zdoc-root', 'zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.style.display = 'none';
        el.classList.remove('zpanel-open');
      }
    });

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zc360-open', 'zpanel-open');

    try {
      document.documentElement.classList.remove('zb2b-locked', 'zix-locked', 'zsub-locked', 'zdoc-locked', 'zfsh-locked', 'zvp-locked');
      document.body.classList.remove('zb2b-locked', 'zix-locked', 'zsub-locked', 'zdoc-locked', 'zfsh-locked', 'zvp-locked');
      document.documentElement.classList.add('zc360-locked');
      document.body.classList.add('zc360-locked');
    } catch (e) { }

    render();

    var targetTab = TABS.find(function (t) { return t.id === S.tab; });
    if (targetTab && targetTab.hash && window.location.hash !== targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) { }
    }
    root.scrollTop = 0;
  }

  function close() {
    S.open = false;
    if (root) {
      root.classList.remove('zc360-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zc360-locked');
      document.body.classList.remove('zc360-locked');
    } catch (e) { }
    if (window.location.hash && tabFromHash(window.location.hash)) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) { }
    }
  }

  function switchTab(tabId) {
    if (!tabId || !TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var targetTab = TABS.find(function (t) { return t.id === tabId; });
    if (targetTab && targetTab.hash) {
      try { history.replaceState(null, '', targetTab.hash); } catch (e) { }
    }
    if (root) root.scrollTop = 0;
  }

  /* ── Interceptor for Hash & Sidebar Clicks ───────────────────────── */
  function onHashChange() {
    var t = tabFromHash(window.location.hash);
    if (t) {
      open(t);
    } else if (S.open && window.location.hash && window.location.hash !== '#') {
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'import', 'export', 'subscription', 'doctor', 'b2b'];
      var isOther = otherDomains.some(function (d) { return window.location.hash.indexOf(d) >= 0; });
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zc360-root');
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
  window.ZenveCustomersDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showOnboardModal: showOnboardModal,
    filterGrievances: filterGrievances,
    searchGrievances: searchGrievances,
    resolveGrievance: resolveGrievance,
    showGrievanceModal: showGrievanceModal,
    submitGrievance: submitGrievance
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();