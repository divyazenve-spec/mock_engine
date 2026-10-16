/* =====================================================================
   Zenve BI — Logistics & Delivery Executive Control Center
   Sidebar: Logistics & Delivery Suite (9 Subcategories)
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var root = null;
  var S = {
    open: false,
    tab: 'overview',
    searchQuery: '',
    statusFilter: 'ALL',
    toastTimeout: null
  };

  /* ── 9 Subcategories Configuration ────────────────────────────────── */
  var MODULES = [
    { id: 'overview',               label: 'Logistics Dashboard',   icon: '⚡', hash: '#logistics-dashboard',   title: 'Rapid Logistics & Cold-Chain Dispatch Control Center', sub: 'Hyperlocal rapid dispatch, refrigerated vaccine cold-chain monitoring, and rider SLAs across 14 urban micro-hubs' },
    { id: 'delivery-orders',        label: 'Delivery Orders',        icon: '📦', hash: '#delivery-orders',        title: 'Live Delivery Orders & Manifest Stream', sub: 'Real-time parcel dispatch status, rider allocation, hyperlocal express tracking, and cold-chain temperature telemetry' },
    { id: 'delivery-partners',      label: 'Delivery Partners',      icon: '🛵', hash: '#delivery-partners',      title: 'Fleet & 3PL Logistics Delivery Partners', sub: 'Dedicated electric vehicle (EV) rider fleets, contracted hyperlocal 3PLs, bulk hub transfers, and SLA scorecards' },
    { id: 'delivery-tracking',      label: 'Delivery Tracking',      icon: '📍', hash: '#delivery-tracking',      title: 'Live GPS Fleet Telematics & Cold-Chain Tracking', sub: 'Real-time rider coordinates, IoT Bluetooth cold-box temperature telemetry, EV battery state, and route milestones' },
    { id: 'sixty-minute-delivery',  label: '60-Minute Delivery',     icon: '⏱️', hash: '#60-minute-delivery',     title: 'Hyperlocal 60-Minute Rapid Delivery SLA', sub: 'Guaranteed sub-60 minute order-to-doorstep dispatch for critical pet medications, diets, and emergency supplies' },
    { id: 'delivery-sla',           label: 'Delivery SLA',           icon: '🛡️', hash: '#delivery-sla',           title: 'Delivery Service Level Agreements (SLA) & Compliance', sub: 'Fulfillment SLA adherence, breach root causes, temperature cold-chain compliance, and first-attempt success' },
    { id: 'delivery-cost',          label: 'Delivery Cost',          icon: '💰', hash: '#delivery-cost',          title: 'Delivery Cost Economics & Per-Drop Efficiency', sub: 'Unit economics of last-mile delivery, EV vs ICE cost comparison, packaging expenses, and hub efficiency' },
    { id: 'failed-deliveries',       label: 'Failed Deliveries',      icon: '⚠️', hash: '#failed-deliveries',      title: 'Non-Delivery Reports (NDR) & Failed Delivery Analytics', sub: 'Failed first-attempt analysis, doorstep reachability, Return to Origin (RTO) prevention, and recovery velocity' },
    { id: 'delivery-performance',   label: 'Delivery Performance',   icon: '🏆', hash: '#delivery-performance',   title: 'Rider & Fleet Delivery Performance Scorecards', sub: 'Fulfillment efficiency rankings, doorstep customer satisfaction (CSAT), cold-chain compliance, and safety scorecards' }
  ];

  /* ── Master Datasets ──────────────────────────────────────────────── */
    var ORDERS = [
    { id: 'ORD-9281', customer: 'Neha Sharma', pet: 'Bruno (Golden Retriever)', hub: 'Indiranagar Micro-Hub', rider: 'Rohan Deshmukh (EV-04)', items: 'Vanguard Plus 5/CV-L Vaccine + Apoquel 16mg', type: '60-Min Express', temp: '3.8°C', status: 'Delivered', eta: '24 mins' },
    { id: 'ORD-9282', customer: 'Rajesh Sundaram', pet: 'Milo (Persian Cat)', hub: 'Koramangala 24x7 Hub', rider: 'Suresh Kumar (EV-11)', items: 'Royal Canin Renal Diet 4kg + FortiFlora', type: '60-Min Express', temp: 'Ambient', status: 'Out for Delivery', eta: '12 mins' },
    { id: 'ORD-9283', customer: 'Dr. Amitava Roy', pet: 'Leo (German Shepherd)', hub: 'Whitefield Hub', rider: 'Vinod Nair (EV-19)', items: 'Bravecto Chewable 20-40kg + Ear Cleanser', type: 'Same-Day Standard', temp: 'Ambient', status: 'In Transit', eta: '38 mins' },
    { id: 'ORD-9284', customer: 'Sunita Agarwal', pet: 'Coco (Shih Tzu)', hub: 'Bandra West Hub', rider: 'Sachin Kadam (EV-08)', items: 'Nobivac Rabies 10 Vials + Syringes (Clinical)', type: '60-Min Express', temp: '4.2°C', status: 'In Transit', eta: '18 mins' },
    { id: 'ORD-9285', customer: 'Vikramaditya Sen', pet: 'Simba (Labrador)', hub: 'HSR Layout Hub', rider: 'Ajay Gowda (EV-23)', items: 'Farmina N&D Pumpkin 12kg + Joint Treats', type: 'Same-Day Standard', temp: 'Ambient', status: 'Delivered', eta: '35 mins' },
    { id: 'ORD-9286', customer: 'Meera Nambiar', pet: 'Bella (Beagle)', hub: 'Saket Micro-Hub', rider: 'Pradeep Singh (EV-31)', items: 'Metacam Oral 1.5mg/ml + Vetmedin 5mg', type: '60-Min Express', temp: 'Ambient', status: 'Out for Delivery', eta: '9 mins' },
    { id: 'ORD-9287', customer: 'Tanmay Joshi', pet: 'Oreo (French Bulldog)', hub: 'Andheri West Hub', rider: 'Ganesh More (EV-14)', items: 'Zoetis Cerenia Anti-Emetic + IV Cannula', type: '60-Min Express', temp: 'Ambient', status: 'In Transit', eta: '22 mins' },
    { id: 'ORD-9288', customer: 'Ananya Bhattacharya', pet: 'Whiskey (Indie Dog)', hub: 'JP Nagar Care Hub', rider: 'Manjunath R (EV-27)', items: 'Malaseb Medicated Shampoo + Ceftriaxone', type: 'Same-Day Standard', temp: 'Ambient', status: 'Dispatched', eta: '45 mins' },
    { id: 'ORD-9289', customer: 'Harish Pillai', pet: 'Rocky (Rottweiler)', hub: 'Indiranagar Micro-Hub', rider: 'Rohan Deshmukh (EV-04)', items: 'TPLO Post-Op Dressing Kit + Pain Meds', type: '60-Min Express', temp: 'Ambient', status: 'Delivered', eta: '28 mins' },
    { id: 'ORD-9290', customer: 'Pooja Varma', pet: 'Ginger (Tabby Cat)', hub: 'Gurugram DLF Hub', rider: 'Deepak Yadav (EV-42)', items: "Hill's Prescription Diet k/d 5kg", type: '60-Min Express', temp: 'Ambient', status: 'Failed Attempt', eta: 'Re-attempting' }
  ];

    var PARTNERS = [
    { name: 'Zenve Direct EV Fleet', type: 'Dedicated In-House EV', fleetSize: '76 EVs', activeNow: 38, onTimeSla: '99.4%', avgCost: '₹46.50', coldChainReady: 'Yes (IoT Smart Box)', rating: '4.94 / 5', status: 'Primary' },
    { name: 'Shadowfax Hyperlocal', type: 'Contracted 3PL Hyperlocal', fleetSize: '45 On-Demand', activeNow: 24, onTimeSla: '97.8%', avgCost: '₹62.00', coldChainReady: 'Yes (Gel-Packs)', rating: '4.82 / 5', status: 'Primary' },
    { name: 'Dunzo for Business', type: 'B2B Quick Courier', fleetSize: '35 On-Demand', activeNow: 18, onTimeSla: '96.9%', avgCost: '₹65.00', coldChainReady: 'Yes (Insulated)', rating: '4.78 / 5', status: 'Active' },
    { name: 'Porter Enterprise', type: 'Inter-Hub Bulk Transfer', fleetSize: '16 Mini Trucks', activeNow: 11, onTimeSla: '98.5%', avgCost: '₹140.00', coldChainReady: 'Yes (Reefer Van)', rating: '4.89 / 5', status: 'Primary' },
    { name: 'Blitz Express Electric', type: 'Green EV Partner Fleet', fleetSize: '25 EV Bikes', activeNow: 14, onTimeSla: '98.2%', avgCost: '₹51.00', coldChainReady: 'Yes (IoT Box)', rating: '4.86 / 5', status: 'Active' },
    { name: 'BlueDart Cold-Chain Express', type: 'National Cold Chain Air', fleetSize: 'Scheduled Lines', activeNow: 6, onTimeSla: '99.8%', avgCost: '₹220.00', coldChainReady: 'Yes (Dry Ice/2-8°C)', rating: '4.95 / 5', status: 'Primary' },
    { name: 'Borzo Delivery', type: 'Emergency Surge Fleet', fleetSize: '20 On-Demand', activeNow: 8, onTimeSla: '95.4%', avgCost: '₹68.00', coldChainReady: 'No (Dry Cargo Only)', rating: '4.65 / 5', status: 'Active' },
    { name: 'Loadshare Networks', type: 'Regional Intra-City Hubs', fleetSize: '18 Vans', activeNow: 9, onTimeSla: '97.1%', avgCost: '₹95.00', coldChainReady: 'Yes (Insulated Boxes)', rating: '4.74 / 5', status: 'Active' },
    { name: 'Zypp Electric Logistics', type: 'Leased Commercial EV Fleet', fleetSize: '20 EV Scooters', activeNow: 12, onTimeSla: '98.0%', avgCost: '₹48.00', coldChainReady: 'Yes (Smart Box)', rating: '4.83 / 5', status: 'Active' },
    { name: 'Delhivery Flash', type: 'Inter-City Express', fleetSize: 'Scheduled Air/Surface', activeNow: 5, onTimeSla: '98.4%', avgCost: '₹115.00', coldChainReady: 'Yes (Gel Pack Shippers)', rating: '4.88 / 5', status: 'Active' }
  ];

    var TRACKING_STREAMS = [
    { trackerId: 'TRK-01', rider: 'Rohan Deshmukh (EV-04)', location: 'Indiranagar 100ft Rd, BLR', temp: '3.8°C', battery: '82%', eta: '7 mins' },
    { trackerId: 'TRK-02', rider: 'Suresh Kumar (EV-11)', location: 'Koramangala 4th Block, BLR', temp: 'Ambient', battery: '76%', eta: '12 mins' },
    { trackerId: 'TRK-03', rider: 'Sachin Kadam (EV-08)', location: 'Hill Road, Bandra West, BOM', temp: '4.2°C', battery: '89%', eta: '15 mins' },
    { trackerId: 'TRK-04', rider: 'Vinod Nair (EV-19)', location: 'ITPL Main Rd, Whitefield, BLR', temp: 'Ambient', battery: '64%', eta: '21 mins' },
    { trackerId: 'TRK-05', rider: 'Pradeep Singh (EV-31)', location: 'Saket District Centre, DEL', temp: 'Ambient', battery: '78%', eta: '9 mins' },
    { trackerId: 'TRK-06', rider: 'Ajay Gowda (EV-23)', location: '27th Main Rd, HSR Layout, BLR', temp: 'Ambient', battery: '91%', eta: '18 mins' },
    { trackerId: 'TRK-07', rider: 'Ganesh More (EV-14)', location: 'Lokhandwala Complex, BOM', temp: '3.6°C', battery: '71%', eta: '14 mins' },
    { trackerId: 'TRK-08', rider: 'Manjunath R (EV-27)', location: '15th Cross, JP Nagar, BLR', temp: 'Ambient', battery: '84%', eta: '25 mins' },
    { trackerId: 'TRK-09', rider: 'Deepak Yadav (EV-42)', location: 'DLF Phase 4, Gurugram', temp: 'Ambient', battery: '68%', eta: '19 mins' },
    { trackerId: 'TRK-10', rider: 'Farhan Akhtar (EV-06)', location: 'Jubilee Hills Checkpost, HYD', temp: '4.0°C', battery: '95%', eta: '11 mins' }
  ];

    var HUBS_60M = [
    { hub: 'Indiranagar Micro-Hub', city: 'Bengaluru', orders60m: '84 Orders', avgFulfillment: '24 mins', dispatchTime: '4.2 mins', breachCount: 0, slaCompliance: '99.6%', peakCapacity: '12 EVs' },
    { hub: 'Koramangala 24x7 Hub', city: 'Bengaluru', orders60m: '96 Orders', avgFulfillment: '26 mins', dispatchTime: '4.8 mins', breachCount: 1, slaCompliance: '99.0%', peakCapacity: '14 EVs' },
    { hub: 'Bandra West Micro-Hub', city: 'Mumbai', orders60m: '72 Orders', avgFulfillment: '29 mins', dispatchTime: '5.1 mins', breachCount: 1, slaCompliance: '98.6%', peakCapacity: '10 EVs' },
    { hub: 'HSR Layout Hub', city: 'Bengaluru', orders60m: '58 Orders', avgFulfillment: '27 mins', dispatchTime: '4.5 mins', breachCount: 0, slaCompliance: '99.4%', peakCapacity: '8 EVs' },
    { hub: 'Whitefield Care Hub', city: 'Bengaluru', orders60m: '52 Orders', avgFulfillment: '32 mins', dispatchTime: '5.4 mins', breachCount: 2, slaCompliance: '97.8%', peakCapacity: '8 EVs' },
    { hub: 'Andheri West Hub', city: 'Mumbai', orders60m: '64 Orders', avgFulfillment: '31 mins', dispatchTime: '5.2 mins', breachCount: 1, slaCompliance: '98.4%', peakCapacity: '9 EVs' },
    { hub: 'Saket Care Micro-Hub', city: 'Delhi-NCR', orders60m: '48 Orders', avgFulfillment: '34 mins', dispatchTime: '5.6 mins', breachCount: 2, slaCompliance: '97.2%', peakCapacity: '7 EVs' },
    { hub: 'JP Nagar Hub', city: 'Bengaluru', orders60m: '42 Orders', avgFulfillment: '28 mins', dispatchTime: '4.6 mins', breachCount: 0, slaCompliance: '99.2%', peakCapacity: '6 EVs' },
    { hub: 'Gurugram DLF Hub', city: 'Delhi-NCR', orders60m: '38 Orders', avgFulfillment: '33 mins', dispatchTime: '5.3 mins', breachCount: 1, slaCompliance: '97.9%', peakCapacity: '6 EVs' },
    { hub: 'Jubilee Hills Hub', city: 'Hyderabad', orders60m: '36 Orders', avgFulfillment: '29 mins', dispatchTime: '4.9 mins', breachCount: 0, slaCompliance: '99.1%', peakCapacity: '5 EVs' }
  ];

    var SLA_DATA = [
    { tier: '60-Minute Urgent Rx', target: '< 60 mins', actual: '26.4 mins', volume: '8,820 orders', breaches: 14, compliance: '99.4%', status: 'World Class' },
    { tier: 'Refrigerated Vaccine Express', target: '< 45 mins (2-8°C)', actual: '22.8 mins', volume: '3,450 orders', breaches: 2, compliance: '99.8%', status: 'World Class' },
    { tier: 'Same-Day Prescription Diets', target: '< 4 hours', actual: '2.1 hours', volume: '7,640 orders', breaches: 18, compliance: '98.8%', status: 'World Class' },
    { tier: 'Surgical Emergency Fast-Track', target: '< 30 mins', actual: '19.2 mins', volume: '620 orders', breaches: 0, compliance: '100%', status: 'World Class' },
    { tier: 'Standard Next-Day Supplies', target: '< 24 hours', actual: '14.2 hours', volume: '4,100 orders', breaches: 11, compliance: '99.1%', status: 'World Class' },
    { tier: 'Inter-Hub Emergency Transfer', target: '< 90 mins', actual: '54.0 mins', volume: '840 orders', breaches: 3, compliance: '98.9%', status: 'World Class' },
    { tier: 'Specialty Compounded Rx', target: '< 3 hours', actual: '1.9 hours', volume: '510 orders', breaches: 4, compliance: '98.2%', status: 'Exceeding' },
    { tier: 'Clinical Pathology Sample Pickup', target: '< 45 mins', actual: '28.4 mins', volume: '1,280 orders', breaches: 2, compliance: '99.6%', status: 'World Class' },
    { tier: 'Senior Pet Palliative Care Kits', target: '< 90 mins', actual: '42.0 mins', volume: '480 orders', breaches: 1, compliance: '99.5%', status: 'World Class' },
    { tier: 'Suburban Extended Radius', target: '< 120 mins', actual: '78.5 mins', volume: '920 orders', breaches: 2, compliance: '98.7%', status: 'Exceeding' }
  ];

    var COST_DATA = [
    { component: 'Rider Fuel / Power per Drop', internalEv: '₹2.80 (Electric)', partner3pl: '₹14.50 (Petrol ICE)', variance: '-80.7% EV Advantage', shareOfCost: '16.2%' },
    { component: 'Rider Payout / Base Fare', internalEv: '₹28.00', partner3pl: '₹36.00', variance: '-22.2% EV Advantage', shareOfCost: '54.5%' },
    { component: 'Insulated & Cold-Box Amortization', internalEv: '₹3.40', partner3pl: '₹6.20', variance: '-45.2% Own Assets', shareOfCost: '7.8%' },
    { component: 'Packaging, Ice-Gel Packs & Tamper Seal', internalEv: '₹4.20', partner3pl: '₹4.20', variance: '0.0% Standardized', shareOfCost: '7.2%' },
    { component: 'GPS Telematics, SIM & IoT Sensors', internalEv: '₹1.10', partner3pl: '₹2.80', variance: '-60.7% Central IoT', shareOfCost: '2.8%' },
    { component: 'Hub Sortation, Pick & Pack Labor', internalEv: '₹3.60', partner3pl: '₹3.60', variance: '0.0% Fixed Darkstore', shareOfCost: '6.4%' },
    { component: 'Transit Spoilage & Breakage Loss', internalEv: '₹0.40', partner3pl: '₹1.80', variance: '-77.8% Secure Pods', shareOfCost: '1.2%' },
    { component: 'Doorstep Re-attempt & NDR Reverse', internalEv: '₹0.80', partner3pl: '₹2.40', variance: '-66.7% WhatsApp Bot', shareOfCost: '1.8%' },
    { component: 'Dispatch Software & Route Optimization', internalEv: '₹1.20', partner3pl: '₹2.50', variance: '-52.0% Internal Tech', shareOfCost: '2.1%' },
    { component: 'Total Blended Cost per Drop', internalEv: '₹46.50', partner3pl: '₹68.00', variance: '-31.6% EV Fleet Edge', shareOfCost: '100.0%' }
  ];

    var FAILED_CAUSES = [
    { cause: 'Customer Unavailable / Door Locked', incidents: 38, pct: '44.2%', avgResolution: 'Automated IVR + 15m wait timer + Neighbor drop', rtoImpact: '0.1% RTO' },
    { cause: 'Incorrect / Incomplete Street Address', incidents: 16, pct: '18.6%', avgResolution: 'WhatsApp live GPS pin sharing + Map update', rtoImpact: '0.2% RTO' },
    { cause: 'Customer Requested Reschedule', incidents: 12, pct: '14.0%', avgResolution: 'One-click evening slot lock via app push', rtoImpact: '0.0% RTO' },
    { cause: 'Gated Community / Security Access Delay', incidents: 7, pct: '8.1%', avgResolution: 'Digital visitor pre-authorization token (MyGate)', rtoImpact: '0.0% RTO' },
    { cause: 'Heavy Rain / Flash Waterlogging', incidents: 5, pct: '5.8%', avgResolution: 'Alternative waterproof pod dispatch + Surge SLA banner', rtoImpact: '0.0% RTO' },
    { cause: 'OTP Verification Delay at Doorstep', incidents: 3, pct: '3.5%', avgResolution: 'Fallback SMS OTP + Call verification backup', rtoImpact: '0.0% RTO' },
    { cause: 'Pet Parent Emergency Vet Transit', incidents: 2, pct: '2.3%', avgResolution: 'Rerouted directly to clinic emergency reception desk', rtoImpact: '0.0% RTO' },
    { cause: 'Customer Cancelled at Doorstep', incidents: 1, pct: '1.2%', avgResolution: 'Reverse pickup to micro-hub cold-chain within 20m', rtoImpact: '100% RTO' },
    { cause: 'Rider EV Flat Tyre / Mechanical', incidents: 1, pct: '1.2%', avgResolution: 'Immediate secondary rider handover via SOS telematics', rtoImpact: '0.0% RTO' },
    { cause: 'Cold-Box Seal Sensor Trigger (Precautionary)', incidents: 1, pct: '1.2%', avgResolution: 'Automatic rejection and instant fresh batch dispatch', rtoImpact: '0.0% Spoilage' }
  ];

    var TOP_RIDERS = [
    { rank: 1, name: 'Rohan Deshmukh', vehicleId: 'EV-BLR-04', hub: 'Indiranagar Hub', deliveries: '448 Drops', onTime: '99.6%', avgSpeed: '27.4 km/h', csat: '4.98 / 5', badge: 'Diamond Speedstar' },
    { rank: 2, name: 'Suresh Kumar', vehicleId: 'EV-BLR-11', hub: 'Koramangala Hub', deliveries: '432 Drops', onTime: '99.4%', avgSpeed: '26.8 km/h', csat: '4.96 / 5', badge: 'Gold Master Courier' },
    { rank: 3, name: 'Sachin Kadam', vehicleId: 'EV-BOM-08', hub: 'Bandra West Hub', deliveries: '416 Drops', onTime: '99.1%', avgSpeed: '25.2 km/h', csat: '4.95 / 5', badge: 'Cold-Chain Champion' },
    { rank: 4, name: 'Ajay Gowda', vehicleId: 'EV-BLR-23', hub: 'HSR Layout Hub', deliveries: '404 Drops', onTime: '98.9%', avgSpeed: '28.1 km/h', csat: '4.94 / 5', badge: 'Hyperlocal Ace' },
    { rank: 5, name: 'Vinod Nair', vehicleId: 'EV-BLR-19', hub: 'Whitefield Hub', deliveries: '392 Drops', onTime: '98.6%', avgSpeed: '29.0 km/h', csat: '4.92 / 5', badge: 'Zero Incident Star' },
    { rank: 6, name: 'Pradeep Singh', vehicleId: 'EV-DEL-31', hub: 'Saket Micro-Hub', deliveries: '388 Drops', onTime: '98.4%', avgSpeed: '27.5 km/h', csat: '4.91 / 5', badge: 'Capital Express' },
    { rank: 7, name: 'Ganesh More', vehicleId: 'EV-BOM-14', hub: 'Andheri West Hub', deliveries: '376 Drops', onTime: '98.2%', avgSpeed: '24.8 km/h', csat: '4.90 / 5', badge: 'Monsoon Hero' },
    { rank: 8, name: 'Manjunath R', vehicleId: 'EV-BLR-27', hub: 'JP Nagar Hub', deliveries: '364 Drops', onTime: '98.5%', avgSpeed: '26.2 km/h', csat: '4.89 / 5', badge: 'Precision Deliverer' },
    { rank: 9, name: 'Deepak Yadav', vehicleId: 'EV-DEL-42', hub: 'Gurugram Hub', deliveries: '352 Drops', onTime: '97.9%', avgSpeed: '28.8 km/h', csat: '4.88 / 5', badge: 'Speed Specialist' },
    { rank: 10, name: 'Farhan Akhtar', vehicleId: 'EV-HYD-06', hub: 'Jubilee Hills Hub', deliveries: '344 Drops', onTime: '98.3%', avgSpeed: '27.1 km/h', csat: '4.87 / 5', badge: 'Deccan Ace' }
  ];

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function showToast(msg) {
    var old = document.querySelector('.zlog-toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'zlog-toast';
    t.innerHTML = '<span>⚡</span> <span>' + msg + '</span>';
    document.body.appendChild(t);
    clearTimeout(S.toastTimeout);
    S.toastTimeout = setTimeout(function () {
      if (t.parentNode) t.remove();
    }, 3200);
  }

  function closeOthers() {
    var otherRoots = ['#zmkt-dashboard-root', '#zvp-dashboard-root', '#zhr-dashboard-root', '#zod-root', '#zsd-root'];
    otherRoots.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) {
        el.classList.remove('zpanel-open');
        el.style.display = 'none';
      }
    });
  }

  function tabFromHash(hash) {
    if (!hash) return null;
    var clean = hash.toLowerCase();
    for (var i = 0; i < MODULES.length; i++) {
      if (clean === MODULES[i].hash.toLowerCase()) {
        return MODULES[i].id;
      }
    }
    if (clean === '#logistics' || clean === '#logistics-dashboard' || clean === '#logistics-delivery' || clean === '#delivery') return 'overview';
    if (clean === '#delivery-orders' || clean === '#deliveryorders') return 'delivery-orders';
    if (clean === '#delivery-partners' || clean === '#deliverypartners') return 'delivery-partners';
    if (clean === '#delivery-tracking' || clean === '#deliverytracking') return 'delivery-tracking';
    if (clean === '#60-minute-delivery' || clean === '#60-minute' || clean === '#60min') return 'sixty-minute-delivery';
    if (clean === '#delivery-sla' || clean === '#deliverysla') return 'delivery-sla';
    if (clean === '#delivery-cost' || clean === '#deliverycost') return 'delivery-cost';
    if (clean === '#failed-deliveries' || clean === '#faileddeliveries') return 'failed-deliveries';
    if (clean === '#delivery-performance' || clean === '#deliveryperformance') return 'delivery-performance';
    return null;
  }

  function tabFromText(text) {
    if (!text) return null;
    var t = text.trim().toLowerCase();
    if (t === 'logistics dashboard' || t === 'logistics & delivery' || t === 'logistics & deliveries' || t === 'logistics' || t === 'rapid logistics & cold-chain dispatch') return 'overview';
    if (t === 'delivery orders' || t === 'orders dispatch') return 'delivery-orders';
    if (t === 'delivery partners' || t === 'fleet partners' || t === 'partners') return 'delivery-partners';
    if (t === 'delivery tracking' || t === 'telematics' || t === 'live tracking') return 'delivery-tracking';
    if (t === '60-minute delivery' || t === '60-minute rapid delivery' || t === '60 min delivery') return 'sixty-minute-delivery';
    if (t === 'delivery sla' || t === 'sla compliance' || t === 'sla') return 'delivery-sla';
    if (t === 'delivery cost' || t === 'delivery economics' || t === 'cost per drop') return 'delivery-cost';
    if (t === 'failed deliveries' || t === 'failed delivery' || t === 'ndr reports') return 'failed-deliveries';
    if (t === 'delivery performance' || t === 'rider performance' || t === 'fleet performance') return 'delivery-performance';
    return null;
  }

  /* ── Shell Renderer ───────────────────────────────────────────────── */
  function render() {
    if (!root) return;

    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];

    // Build chip navigation
    var chipsHtml = MODULES.map(function (m) {
      var isActive = S.tab === m.id;
      var count = '';
      if (m.id === 'delivery-orders') count = '<span class="zlog-chip-count">' + ORDERS.length + '</span>';
      else if (m.id === 'delivery-partners') count = '<span class="zlog-chip-count">' + PARTNERS.length + '</span>';
      else if (m.id === 'sixty-minute-delivery') count = '';
      else if (m.id === 'delivery-sla') count = '';

      return [
        '<button type="button" class="zlog-chip ' + (isActive ? 'active' : '') + '" data-tab="' + m.id + '">',
        '  <span>' + m.icon + '</span>',
        '  <span>' + m.label + '</span>',
        count,
        '</button>'
      ].join('');
    }).join('');

    root.innerHTML = [
      '<header class="zlog-header">',
      '  <div class="zlog-header-left">',
      '    <div class="zlog-brand-badge">⚡</div>',
      '    <div class="zlog-title-group">',
      '      <div class="zlog-title-row">',
      '        <h1 class="zlog-main-title">' + curMod.title + '</h1>',
      '        <div class="zlog-status-badge"><span class="zlog-status-dot"></span> Cold Chain & Fleet Live</div>',
      '      </div>',
      '      <div class="zlog-subtitle">' + curMod.sub + '</div>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-header-right">',
      '    <button type="button" class="zlog-btn zlog-btn-secondary" id="zlog-export-btn">📊 Export CSV</button>',
      '    <button type="button" class="zlog-btn zlog-btn-secondary" id="zlog-track-btn">📍 Live Telematics</button>',
      '    <button type="button" class="zlog-btn zlog-btn-primary" id="zlog-dispatch-btn">+ Fast Dispatch</button>',
      '  </div>',
      '</header>',
      '<nav class="zlog-nav-bar">' + chipsHtml + '</nav>',
      '<div class="zlog-content" id="zlog-body-content"></div>'
    ].join('');

    wireHeaderEvents();
    renderTabContent();
  }

  function wireHeaderEvents() {
    // Subcategory chip clicks
    var chips = root.querySelectorAll('.zlog-chip');
    chips.forEach(function (c) {
      c.onclick = function () {
        var t = c.getAttribute('data-tab');
        switchTab(t);
      };
    });

    // Close button
    var closeBtn = root.querySelector('#zlog-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function () { close(); };
    }

    // Fast dispatch modal
    var dispatchBtn = root.querySelector('#zlog-dispatch-btn');
    if (dispatchBtn) {
      dispatchBtn.onclick = function () { showDispatchModal(); };
    }

    // Telematics modal
    var trackBtn = root.querySelector('#zlog-track-btn');
    if (trackBtn) {
      trackBtn.onclick = function () { showTelematicsModal(); };
    }

    // Export CSV
    var expBtn = root.querySelector('#zlog-export-btn');
    if (expBtn) {
      expBtn.onclick = function () { exportTabCSV(); };
    }
  }

  /* ── Tab Content Renderer ─────────────────────────────────────────── */
  function renderTabContent() {
    var c = root.querySelector('#zlog-body-content');
    if (!c) return;

    if (S.tab === 'overview') c.innerHTML = renderOverview();
    else if (S.tab === 'delivery-orders') c.innerHTML = renderDeliveryOrders();
    else if (S.tab === 'delivery-partners') c.innerHTML = renderDeliveryPartners();
    else if (S.tab === 'delivery-tracking') c.innerHTML = renderDeliveryTracking();
    else if (S.tab === 'sixty-minute-delivery') c.innerHTML = renderSixtyMinuteDelivery();
    else if (S.tab === 'delivery-sla') c.innerHTML = renderDeliverySLA();
    else if (S.tab === 'delivery-cost') c.innerHTML = renderDeliveryCost();
    else if (S.tab === 'failed-deliveries') c.innerHTML = renderFailedDeliveries();
    else if (S.tab === 'delivery-performance') c.innerHTML = renderDeliveryPerformance();

    wireTabSpecificEvents();
  }

  /* ── Individual Subcategory Views ─────────────────────────────────── */
  function renderOverview() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Active Hyperlocal Fleet</span><span class="zlog-kpi-icon">🛵</span></div>',
      '    <div class="zlog-kpi-val">76 EV Riders</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 100% Electric</span><span class="zlog-subtext">38 active now on road</span></div>',
      '  </div>',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Fulfillment Speed</span><span class="zlog-kpi-icon">⚡</span></div>',
      '    <div class="zlog-kpi-val">31 mins</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Target &lt; 60m</span><span class="zlog-subtext">Order to doorstep</span></div>',
      '  </div>',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Cold-Chain Integrity</span><span class="zlog-kpi-icon">❄️</span></div>',
      '    <div class="zlog-kpi-val">100.0%</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Constant 2-8°C</span><span class="zlog-subtext">Zero vaccine excursion</span></div>',
      '  </div>',
      '  <div class="zlog-kpi">',
      '    <div class="zlog-kpi-top"><span class="zlog-kpi-label">Delivery Failure Rate</span><span class="zlog-kpi-icon">🎯</span></div>',
      '    <div class="zlog-kpi-val">0.8%</div>',
      '    <div class="zlog-kpi-bottom"><span class="zlog-delta up">↓ Benchmark &lt; 3.5%</span><span class="zlog-subtext">First-attempt OTP success</span></div>',
      '  </div>',
      '</div>',

      '<div class="zlog-grid-2">',
      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">🗺️ Live Fleet Dispatch Streams</h3>',
      '        <p class="zlog-card-sub">Urban micro-hub delivery cluster velocity across metro areas</p>',
      '      </div>',
      '      <button class="zlog-btn zlog-btn-secondary" onclick="ZenveLogisticsDashboard.switchTab(\'delivery-tracking\')">Open Full Map</button>',
      '    </div>',
      '    <div style="height:210px;background:linear-gradient(135deg, #0f172a, #1e293b);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#38bdf8;text-align:center;padding:16px;">',
      '      <div style="font-size:36px;margin-bottom:8px;">🗺️</div>',
      '      <div style="font-size:13px;font-weight:700;color:#f8fafc;">Bengaluru Central (28m avg) • South Mumbai (34m avg) • Delhi-NCR (39m avg)</div>',
      '      <div style="font-size:11px;color:#94a3b8;margin-top:6px;">62 active EV riders communicating live telemetry via Bluetooth Cold-Box IoT sensors</div>',
      '    </div>',
      '  </div>',

      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">⚡ Quick Logistics Subcategories</h3>',
      '        <p class="zlog-card-sub">Access dedicated dashboards across the delivery lifecycle</p>',
      '      </div>',
      '    </div>',
      '    <div style="padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
      MODULES.slice(1).map(function (m) {
        return [
          '<button type="button" class="zlog-chip" style="justify-content:flex-start;padding:10px 12px;" onclick="ZenveLogisticsDashboard.switchTab(\'' + m.id + '\')">',
          '  <span style="font-size:16px;">' + m.icon + '</span>',
          '  <div style="text-align:left;">',
          '    <div style="font-weight:700;font-size:12px;color:#0f172a;">' + m.label + '</div>',
          '    <div style="font-size:10px;color:#64748b;">Direct Subcategory View</div>',
          '  </div>',
          '</button>'
        ].join('');
      }).join(''),
      '    </div>',
      '  </div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">📦 Recent High-Priority Dispatches</h3>',
      '      <p class="zlog-card-sub">Active medical prescriptions and express deliveries in-flight</p>',
      '    </div>',
      '    <button class="zlog-btn zlog-btn-secondary" onclick="ZenveLogisticsDashboard.switchTab(\'delivery-orders\')">View All Manifests</button>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Order ID</th><th>Customer & Pet</th><th>Hub</th><th>Rider</th><th>Items</th><th>Cold Chain</th><th>Status</th></tr></thead>',
      '      <tbody>',
      ORDERS.slice(0, 5).map(function (o) {
        return [
          '<tr>',
          '  <td style="font-weight:700;font-family:monospace;color:#0f172a;">' + o.id + '</td>',
          '  <td><strong>' + o.customer + '</strong><br><span style="color:#64748b;font-size:11px;">' + o.pet + '</span></td>',
          '  <td>' + o.hub + '</td>',
          '  <td style="color:#0284c7;font-weight:600;">' + o.rider + '</td>',
          '  <td style="max-width:200px;color:#475569;">' + o.items + '</td>',
          '  <td>' + (o.temp !== 'Ambient' ? '<span class="zlog-tag cyan">❄️ ' + o.temp + '</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>',
          '  <td><span class="zlog-tag ' + (o.status === 'Delivered' ? 'green' : o.status === 'Failed Attempt' ? 'red' : 'yellow') + '">' + o.status + ' (' + o.eta + ')</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryOrders() {
    var filtered = ORDERS.filter(function (o) {
      var matchF = S.statusFilter === 'ALL' || o.status === S.statusFilter;
      var matchQ = !S.searchQuery ||
        o.id.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0 ||
        o.customer.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0 ||
        o.hub.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0 ||
        o.rider.toLowerCase().indexOf(S.searchQuery.toLowerCase()) >= 0;
      return matchF && matchQ;
    });

    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Dispatched Today</span><span class="zlog-kpi-icon">📦</span></div><div class="zlog-kpi-val">482 Orders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +18.4% vs yday</span><span class="zlog-subtext">Across 14 micro-hubs</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Active In-Transit</span><span class="zlog-kpi-icon">🛵</span></div><div class="zlog-kpi-val">38 Parcels</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Live Now</span><span class="zlog-subtext">Avg speed 26.8 km/h</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">60-Min Express Tier</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">294 Orders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 61% mix</span><span class="zlog-subtext">Rapid medication dispatch</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Doorstep OTP Rate</span><span class="zlog-kpi-icon">🎯</span></div><div class="zlog-kpi-val">99.2%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.4% MoM</span><span class="zlog-subtext">Verified handoffs</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Orders Manifest & Dispatch Console</h3>',
      '      <p class="zlog-card-sub">Real-time status of orders handled by Zenve EV Fleet and partner delivery networks</p>',
      '    </div>',
      '    <div style="display:flex;gap:10px;align-items:center;">',
      '      <input type="text" class="zlog-input" id="zlog-order-search" placeholder="Search order, pet parent, rider, hub..." value="' + S.searchQuery + '" style="min-width:240px;"/>',
      '      <select class="zlog-select" id="zlog-order-status" style="min-width:140px;">',
      '        <option value="ALL"' + (S.statusFilter === 'ALL' ? ' selected' : '') + '>All status</option>',
      '        <option value="In Transit"' + (S.statusFilter === 'In Transit' ? ' selected' : '') + '>In Transit</option>',
      '        <option value="Out for Delivery"' + (S.statusFilter === 'Out for Delivery' ? ' selected' : '') + '>Out for Delivery</option>',
      '        <option value="Dispatched"' + (S.statusFilter === 'Dispatched' ? ' selected' : '') + '>Dispatched</option>',
      '        <option value="Delivered"' + (S.statusFilter === 'Delivered' ? ' selected' : '') + '>Delivered</option>',
      '        <option value="Failed Attempt"' + (S.statusFilter === 'Failed Attempt' ? ' selected' : '') + '>Failed Attempt</option>',
      '      </select>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Order ID</th><th>Customer & Companion</th><th>Origin Hub</th><th>Rider</th><th>Items</th><th>Tier</th><th>Cold Chain</th><th>Status / ETA</th></tr></thead>',
      '      <tbody>',
      filtered.map(function (o) {
        return [
          '<tr>',
          '  <td style="font-weight:700;font-family:monospace;color:#0f172a;">' + o.id + '</td>',
          '  <td><strong>' + o.customer + '</strong><div style="font-size:11px;color:#64748b;">' + o.pet + '</div></td>',
          '  <td>' + o.hub + '</td>',
          '  <td style="color:#0284c7;font-weight:600;">' + o.rider + '</td>',
          '  <td style="color:#475569;max-width:210px;">' + o.items + '</td>',
          '  <td><span class="zlog-tag ' + (o.type.indexOf('60-Min') >= 0 ? 'blue' : 'yellow') + '">' + o.type + '</span></td>',
          '  <td>' + (o.temp !== 'Ambient' ? '<span class="zlog-tag cyan">❄️ ' + o.temp + '</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>',
          '  <td><span class="zlog-tag ' + (o.status === 'Delivered' ? 'green' : o.status === 'Failed Attempt' ? 'red' : 'yellow') + '">' + o.status + ' (' + o.eta + ')</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryPartners() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Dedicated Fleet</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">76 EV Riders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 100% Electric</span><span class="zlog-subtext">Zero carbon emissions</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Active On Road</span><span class="zlog-kpi-icon">🛵</span></div><div class="zlog-kpi-val">117 Riders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ High Capacity</span><span class="zlog-subtext">Zenve + 3PL partners</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Blended On-Time SLA</span><span class="zlog-kpi-icon">⏱️</span></div><div class="zlog-kpi-val">98.6%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.8% MoM</span><span class="zlog-subtext">Weighted network avg</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Fleet Rating</span><span class="zlog-kpi-icon">⭐</span></div><div class="zlog-kpi-val">4.86 / 5</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Exceptional</span><span class="zlog-subtext">Doorstep pet parent CSAT</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Partners & Fleet Roster</h3>',
      '      <p class="zlog-card-sub">Fleet model, rider volume, on-time SLA metrics, and cold-chain compliance</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Partner Name</th><th>Fleet Model</th><th>Fleet Size</th><th>Active Now</th><th>On-Time SLA</th><th>Drop Cost</th><th>Cold-Chain Ready</th><th>CSAT Rating</th><th>Status</th></tr></thead>',
      '      <tbody>',
      PARTNERS.map(function (p) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + p.name + '</td>',
          '  <td style="color:#64748b;">' + p.type + '</td>',
          '  <td style="font-weight:600;">' + p.fleetSize + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + p.activeNow + ' on road</td>',
          '  <td style="color:#2563eb;font-weight:700;font-family:monospace;">' + p.onTimeSla + '</td>',
          '  <td style="font-family:monospace;color:#475569;">' + p.avgCost + '</td>',
          '  <td><span class="zlog-tag ' + (p.coldChainReady.indexOf('Yes') >= 0 ? 'cyan' : 'yellow') + '">' + p.coldChainReady + '</span></td>',
          '  <td style="color:#d97706;font-weight:700;">' + p.rating + '</td>',
          '  <td><span class="zlog-tag ' + (p.status === 'Primary' ? 'green' : 'blue') + '">' + p.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryTracking() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Live Tracked Riders</span><span class="zlog-kpi-icon">📡</span></div><div class="zlog-kpi-val">38 Active</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 100% Lock</span><span class="zlog-subtext">Sub-second GPS updates</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Refrigerated Parcels</span><span class="zlog-kpi-icon">❄️</span></div><div class="zlog-kpi-val">14 Boxes</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 2-8°C Safe</span><span class="zlog-subtext">IoT Bluetooth sensors</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Average Speed</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">26.8 km/h</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Optimal</span><span class="zlog-subtext">Zero traffic infractions</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Fleet Battery Health</span><span class="zlog-kpi-icon">🔋</span></div><div class="zlog-kpi-val">74% Avg</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ All &gt; 30%</span><span class="zlog-subtext">Fast-swap ready</span></div></div>',
      '</div>',

      '<div class="zlog-grid-2">',
      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">🗺️ Real-Time Fleet GPS Geofence</h3>',
      '        <p class="zlog-card-sub">Active EV rider positions and delivery route telemetry</p>',
      '      </div>',
      '    </div>',
      '    <div style="height:240px;background:linear-gradient(135deg, #0f172a, #1e293b);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#38bdf8;position:relative;">',
      '      <div style="font-size:38px;margin-bottom:8px;">📍</div>',
      '      <div style="font-size:14px;font-weight:700;color:#f8fafc;">Live Urban Telematics Radar</div>',
      '      <div style="font-size:11px;color:#94a3b8;margin-top:4px;">0 active couriers pinging GPS</div>',
      '      <div style="position:absolute;bottom:12px;left:12px;background:rgba(15,23,42,0.85);padding:4px 10px;border-radius:6px;border:1px solid #334155;font-size:11px;color:#94a3b8;">● WebSocket Telemetry: Idle</div>',
      '    </div>',
      '  </div>',

      '  <div class="zlog-card">',
      '    <div class="zlog-card-head">',
      '      <div>',
      '        <h3 class="zlog-card-title">Live Rider Telematics Stream</h3>',
      '        <p class="zlog-card-sub">Current GPS waypoint, cold-box temp & destination ETA</p>',
      '      </div>',
      '    </div>',
      '    <div class="zlog-table-wrap">',
      '      <table class="zlog-table">',
      '        <thead><tr><th>Rider</th><th>Location</th><th>Cold Box</th><th>Battery</th><th>ETA</th></tr></thead>',
      '        <tbody>',
      TRACKING_STREAMS.map(function (s) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + s.rider + '</td>',
          '  <td style="color:#475569;">' + s.location + '</td>',
          '  <td>' + (s.temp !== 'Ambient' ? '<span class="zlog-tag cyan">❄️ ' + s.temp + '</span>' : '<span style="color:#94a3b8;">Ambient</span>') + '</td>',
          '  <td style="color:#16a34a;font-weight:600;">' + s.battery + '</td>',
          '  <td style="color:#2563eb;font-weight:700;">' + s.eta + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '        </tbody>',
      '      </table>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderSixtyMinuteDelivery() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Doorstep Speed</span><span class="zlog-kpi-icon">⏱️</span></div><div class="zlog-kpi-val">28.4 mins</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ -3.2m vs SLA</span><span class="zlog-subtext">Benchmark &lt; 60m</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Rapid SLA Compliance</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">98.8%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.6% MoM</span><span class="zlog-subtext">Across 10 urban hubs</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Pick & Pack Velocity</span><span class="zlog-kpi-icon">📦</span></div><div class="zlog-kpi-val">4.9 mins</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ -0.8m faster</span><span class="zlog-subtext">Darkstore barcode binning</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">60-Min Volume</span><span class="zlog-kpi-icon">🚀</span></div><div class="zlog-kpi-val">8,820 Orders</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 61% of total</span><span class="zlog-subtext">Monthly express dispatches</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Micro-Hub 60-Minute Performance Benchmark</h3>',
      '      <p class="zlog-card-sub">Fulfillment speed, dispatch velocity, and breach prevention across urban dark stores</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Hub Location</th><th>City</th><th>60M Orders</th><th>Avg Doorstep Time</th><th>Pack Time</th><th>Breaches</th><th>SLA Compliance</th><th>Active EV Pool</th></tr></thead>',
      '      <tbody>',
      HUBS_60M.map(function (h) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + h.hub + '</td>',
          '  <td style="color:#64748b;">' + h.city + '</td>',
          '  <td style="font-weight:600;font-family:monospace;">' + h.orders60m + '</td>',
          '  <td style="color:#2563eb;font-weight:700;font-family:monospace;">' + h.avgFulfillment + '</td>',
          '  <td style="color:#16a34a;font-weight:600;">' + h.dispatchTime + '</td>',
          '  <td style="color:' + (h.breachCount > 0 ? '#dc2626' : '#475569') + ';font-weight:600;">' + h.breachCount + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + h.slaCompliance + '</td>',
          '  <td><span class="zlog-tag green">' + h.peakCapacity + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliverySLA() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Overall SLA Rate</span><span class="zlog-kpi-icon">🛡️</span></div><div class="zlog-kpi-val">99.1%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.9% MoM</span><span class="zlog-subtext">Target: 95.0%</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Cold-Chain SLA</span><span class="zlog-kpi-icon">❄️</span></div><div class="zlog-kpi-val">100.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Zero spoilage</span><span class="zlog-subtext">2-8°C constant</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">First Attempt SLA</span><span class="zlog-kpi-icon">🎯</span></div><div class="zlog-kpi-val">99.2%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.3% MoM</span><span class="zlog-subtext">Doorstep OTP success</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Total Breaches (MTD)</span><span class="zlog-kpi-icon">📉</span></div><div class="zlog-kpi-val">57 Breaches</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↓ -18.2% vs last mo</span><span class="zlog-subtext">Across 26,630 orders</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Tier SLA Adherence Matrix</h3>',
      '      <p class="zlog-card-sub">Contractual targets, actual speed metrics, breach counts, and performance status</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Delivery Tier</th><th>SLA Target</th><th>Actual Speed</th><th>Monthly Volume</th><th>Total Breaches</th><th>SLA Compliance</th><th>Status</th></tr></thead>',
      '      <tbody>',
      SLA_DATA.map(function (s) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + s.tier + '</td>',
          '  <td style="color:#64748b;">' + s.target + '</td>',
          '  <td style="color:#2563eb;font-weight:700;font-family:monospace;">' + s.actual + '</td>',
          '  <td style="font-weight:600;font-family:monospace;">' + s.volume + '</td>',
          '  <td style="color:' + (s.breaches > 20 ? '#dc2626' : '#475569') + ';font-weight:600;">' + s.breaches + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + s.compliance + '</td>',
          '  <td><span class="zlog-tag ' + (s.status === 'World Class' ? 'blue' : 'green') + '">' + s.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryCost() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Blended Cost / Drop</span><span class="zlog-kpi-icon">💰</span></div><div class="zlog-kpi-val">₹54.20</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↓ -₹6.40 vs FY25</span><span class="zlog-subtext">Target &lt; ₹60</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Internal EV Fleet Cost</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">₹46.50</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↓ 31.6% cheaper</span><span class="zlog-subtext">Own electric fleet</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">3PL Partner Cost</span><span class="zlog-kpi-icon">🛵</span></div><div class="zlog-kpi-val">₹68.00</div><div class="zlog-kpi-bottom"><span class="zlog-delta neutral">• Flex on-demand</span><span class="zlog-subtext">Surge & overflow</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Monthly Fleet Spend</span><span class="zlog-kpi-icon">📉</span></div><div class="zlog-kpi-val">₹14.42 Lakhs</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↓ -8.4% vs budget</span><span class="zlog-subtext">26,600 deliveries</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Delivery Cost Component Breakdown</h3>',
      '      <p class="zlog-card-sub">Per-drop line item analysis: Internal EV Fleet vs Partner 3PL comparison</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Cost Component</th><th>Internal EV Fleet</th><th>Partner 3PL</th><th>Variance (EV Advantage)</th><th>Share of Cost</th></tr></thead>',
      '      <tbody>',
      COST_DATA.map(function (c) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + c.component + '</td>',
          '  <td style="font-family:monospace;color:#16a34a;font-weight:700;">' + c.internalEv + '</td>',
          '  <td style="font-family:monospace;color:#dc2626;font-weight:700;">' + c.partner3pl + '</td>',
          '  <td style="color:#2563eb;font-weight:600;">' + c.variance + '</td>',
          '  <td style="font-family:monospace;color:#475569;font-weight:700;">' + c.shareOfCost + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderFailedDeliveries() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Failed Attempt Rate</span><span class="zlog-kpi-icon">🎯</span></div><div class="zlog-kpi-val">0.8%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↓ -0.3% MoM</span><span class="zlog-subtext">Benchmark: 3.5%</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">NDR Recovery Rate</span><span class="zlog-kpi-icon">🔄</span></div><div class="zlog-kpi-val">94.8%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +2.1% MoM</span><span class="zlog-subtext">Re-delivered same day</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Return to Origin (RTO)</span><span class="zlog-kpi-icon">📦</span></div><div class="zlog-kpi-val">0.08%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↓ Ultra-low</span><span class="zlog-subtext">Only 21 orders / mo</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Re-attempt Speed</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">42 mins</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Fast loop</span><span class="zlog-subtext">Automated WhatsApp bot</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Failed Delivery Root Cause Diagnostics</h3>',
      '      <p class="zlog-card-sub">Exception classification and automated SOP recovery workflows</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Failure Root Cause</th><th>Incidents</th><th>% of Failures</th><th>Automated SOP & Resolution</th><th>RTO Impact</th></tr></thead>',
      '      <tbody>',
      FAILED_CAUSES.map(function (f) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + f.cause + '</td>',
          '  <td style="font-weight:700;color:#dc2626;font-family:monospace;">' + f.incidents + '</td>',
          '  <td style="font-weight:600;font-family:monospace;">' + f.pct + '</td>',
          '  <td style="color:#475569;font-size:11px;">' + f.avgResolution + '</td>',
          '  <td><span class="zlog-tag ' + (f.rtoImpact.indexOf('100%') >= 0 ? 'red' : 'green') + '">' + f.rtoImpact + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDeliveryPerformance() {
    return [
      '<div class="zlog-kpi-grid">',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Network CSAT Score</span><span class="zlog-kpi-icon">⭐</span></div><div class="zlog-kpi-val">4.92 / 5</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Exceptional</span><span class="zlog-subtext">14,280 pet parent reviews</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">On-Time Delivery Rate</span><span class="zlog-kpi-icon">⏱️</span></div><div class="zlog-kpi-val">98.8%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ +0.6% MoM</span><span class="zlog-subtext">Across 76 EV couriers</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Avg Fleet Velocity</span><span class="zlog-kpi-icon">⚡</span></div><div class="zlog-kpi-val">26.8 km/h</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ Optimal city pace</span><span class="zlog-subtext">Zero traffic infractions</span></div></div>',
      '  <div class="zlog-kpi"><div class="zlog-kpi-top"><span class="zlog-kpi-label">Cold-Chain Audit Pass</span><span class="zlog-kpi-icon">❄️</span></div><div class="zlog-kpi-val">100.0%</div><div class="zlog-kpi-bottom"><span class="zlog-delta up">↑ 2-8°C Verified</span><span class="zlog-subtext">3,450 vaccine drops</span></div></div>',
      '</div>',

      '<div class="zlog-card">',
      '  <div class="zlog-card-head">',
      '    <div>',
      '      <h3 class="zlog-card-title">Top Rider Leaderboard & Performance Scorecards</h3>',
      '      <p class="zlog-card-sub">Rankings based on on-time delivery rates, pet parent feedback, and cold-chain compliance</p>',
      '    </div>',
      '  </div>',
      '  <div class="zlog-table-wrap">',
      '    <table class="zlog-table">',
      '      <thead><tr><th>Rank</th><th>Rider Name</th><th>EV Unit</th><th>Base Hub</th><th>Deliveries (MTD)</th><th>On-Time %</th><th>Avg Speed</th><th>Doorstep CSAT</th><th>Achievement Badge</th></tr></thead>',
      '      <tbody>',
      TOP_RIDERS.map(function (r) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#f59e0b;">#' + r.rank + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + r.name + '</td>',
          '  <td style="font-family:monospace;color:#64748b;">' + r.vehicleId + '</td>',
          '  <td style="color:#475569;">' + r.hub + '</td>',
          '  <td style="font-weight:700;color:#0f172a;font-family:monospace;">' + r.deliveries + '</td>',
          '  <td style="color:#16a34a;font-weight:700;font-family:monospace;">' + r.onTime + '</td>',
          '  <td style="color:#2563eb;font-weight:600;">' + r.avgSpeed + '</td>',
          '  <td style="color:#d97706;font-weight:700;">' + r.csat + '</td>',
          '  <td><span class="zlog-tag blue">' + r.badge + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function wireTabSpecificEvents() {
    // Delivery orders search
    var ordSearch = root.querySelector('#zlog-order-search');
    if (ordSearch) {
      ordSearch.oninput = function () {
        S.searchQuery = ordSearch.value;
        renderTabContent();
        var newInp = root.querySelector('#zlog-order-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }

    // Delivery orders status filter
    var ordStatus = root.querySelector('#zlog-order-status');
    if (ordStatus) {
      ordStatus.onchange = function () {
        S.statusFilter = ordStatus.value;
        renderTabContent();
      };
    }
  }

  /* ── Modals & Actions ─────────────────────────────────────────────── */
  function showDispatchModal() {
    var modal = document.createElement('div');
    modal.className = 'zlog-modal-backdrop';
    modal.innerHTML = [
      '<div class="zlog-modal-box">',
      '  <div class="zlog-modal-head">',
      '    <h3>⚡ Fast Dispatch Emergency Delivery</h3>',
      '    <button type="button" class="zlog-btn-close" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zlog-modal-body">',
      '    <div class="zlog-form-group"><label class="zlog-label">Pet Parent Name & Phone</label><input class="zlog-input" id="m-cname" placeholder="e.g. Shalini Roy (98765-43210)" required></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Pet Companion (Breed & Urgency)</label><input class="zlog-input" id="m-pet" placeholder="e.g. Beagle (Post-Op Urgent Pain Relief)" required></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Origin Micro-Hub</label><select class="zlog-select" id="m-hub"><option value="Koramangala Hub (BLR)">Koramangala Hub (BLR)</option><option value="Indiranagar Hub (BLR)">Indiranagar Hub (BLR)</option><option value="Whitefield Hub (BLR)">Whitefield Hub (BLR)</option><option value="Bandra West Hub (BOM)">Bandra West Hub (BOM)</option><option value="Gurugram Hub (DEL)">Gurugram Hub (DEL)</option></select></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Delivery SLA Tier</label><select class="zlog-select" id="m-tier"><option value="60-Min Express">60-Min Express Guaranteed</option><option value="Scheduled Slot">Scheduled Same-Day Slot</option><option value="Emergency Vet Telehealth">Emergency Vet Telehealth (30m)</option></select></div>',
      '    <div class="zlog-form-group"><label class="zlog-label">Cold-Chain Temperature Requirement</label><select class="zlog-select" id="m-cold"><option value="Ambient">Standard Ambient (Food/Care)</option><option value="3.5°C">Refrigerated Vaccine (2°C - 8°C IoT Box)</option></select></div>',
      '  </div>',
      '  <div class="zlog-modal-foot">',
      '    <button type="button" class="zlog-btn zlog-btn-secondary" id="m-cancel">Cancel</button>',
      '    <button type="button" class="zlog-btn zlog-btn-primary" id="m-save">Dispatch Rider</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#m-close').onclick = closeM;
    modal.querySelector('#m-cancel').onclick = closeM;
    modal.querySelector('#m-save').onclick = function () {
      var cname = document.getElementById('m-cname').value;
      var pet = document.getElementById('m-pet').value;
      var hub = document.getElementById('m-hub').value;
      var tier = document.getElementById('m-tier').value;
      var cold = document.getElementById('m-cold').value;
      if (!cname || !pet) { alert('Please enter pet parent and pet companion details.'); return; }

      ORDERS.unshift({
        id: 'ORD-DL-' + (9820 + ORDERS.length + 1),
        customer: cname,
        pet: pet,
        hub: hub,
        rider: 'Kiran Kumar (EV-44)',
        items: 'Emergency Rx Medicine Package',
        time: 'Just now',
        eta: '25 mins',
        type: tier,
        temp: cold,
        status: 'In Transit'
      });

      showToast('Fast Dispatch initiated for ' + cname + '! Rider assigned.');
      closeM();
      S.tab = 'delivery-orders';
      render();
    };
  }

  function showTelematicsModal() {
    var modal = document.createElement('div');
    modal.className = 'zlog-modal-backdrop';
    modal.innerHTML = [
      '<div class="zlog-modal-box" style="max-width:540px;">',
      '  <div class="zlog-modal-head">',
      '    <h3>📍 Fleet Telematics & Cold-Chain Radar</h3>',
      '    <button type="button" class="zlog-btn-close" id="m-close">✕</button>',
      '  </div>',
      '  <div class="zlog-modal-body">',
      '    <div style="background:#0f172a;color:#38bdf8;padding:16px;border-radius:10px;font-family:monospace;font-size:12px;margin-bottom:14px;">',
      '      <div>[SYSTEM] IoT Telematics Gateway: READY</div>',
      '      <div>[GPS] 0 Active EV 2-Wheelers transmitting coordinates</div>',
      '      <div>[SENSORS] 0 Bluetooth Cold Boxes reporting safe telemetry</div>',
      '      <div>[PING] WebSocket latency: --</div>',
      '    </div>',
      '    <p style="font-size:12px;color:#64748b;margin:0 0 10px;">Urban dispatch clusters currently idle with zero active deliveries in-flight.</p>',
      '  </div>',
      '  <div class="zlog-modal-foot">',
      '    <button type="button" class="zlog-btn zlog-btn-primary" id="m-close2">Dismiss Radar</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    modal.querySelector('#m-close').onclick = function () { modal.remove(); };
    modal.querySelector('#m-close2').onclick = function () { modal.remove(); };
  }

  function exportTabCSV() {
    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Zenve BI Logistics & Delivery Intelligence Export - " + curMod.label + "\n";
    csvContent += "Export Date: " + new Date().toISOString() + "\n\n";

    if (S.tab === 'delivery-orders') {
      csvContent += "Order ID,Customer,Pet,Hub,Rider,Items,Tier,Cold Chain,Status,ETA\n";
      ORDERS.forEach(function (o) {
        csvContent += [o.id, '"' + o.customer + '"', '"' + o.pet + '"', '"' + o.hub + '"', '"' + o.rider + '"', '"' + o.items + '"', o.type, o.temp, o.status, o.eta].join(',') + "\n";
      });
    } else if (S.tab === 'delivery-partners') {
      csvContent += "Partner Name,Fleet Model,Fleet Size,Active Now,On-Time SLA,Drop Cost,Cold-Chain,CSAT,Status\n";
      PARTNERS.forEach(function (p) {
        csvContent += ['"' + p.name + '"', '"' + p.type + '"', p.fleetSize, p.activeNow, p.onTimeSla, p.avgCost, p.coldChainReady, p.rating, p.status].join(',') + "\n";
      });
    } else {
      csvContent += "Category,Metric,Value,Note\n";
      csvContent += "Logistics Performance,Avg Doorstep Speed,--,No delivery records\n";
      csvContent += "Cold-Chain Integrity,Compliance Rate,0.0%,0 refrigerated boxes\n";
      csvContent += "Doorstep Success,First Attempt Delivery,0.0%,0 attempts\n";
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "zenve_logistics_" + S.tab + "_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Downloaded ' + curMod.label + ' CSV report.');
  }

  /* ── Navigation & Control ─────────────────────────────────────────── */
  function open(tab) {
    closeOthers();
    init();
    if (tab) S.tab = tab;
    S.open = true;
    render();
    root.classList.add('zpanel-open');
    markSidebar(true, S.tab);
    var targetHash = (MODULES.find(function(m){ return m.id === S.tab; }) || {}).hash || '#logistics-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
  }

  function markSidebar(on, tab) {
    var targetTab = tab || S.tab || 'overview';
    document.querySelectorAll('.sidebar-scope li button, .sidebar-scope button, .sidebar-scope a').forEach(function (b) {
      var txt = b.textContent ? b.textContent.trim() : '';
      var bTab = tabFromText(txt);
      if (bTab) {
        b.classList.toggle('zpanel-active', on && bTab === targetTab);
        b.classList.toggle('zsd-active', on && bTab === targetTab);
      }
    });
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    markSidebar(false);
    var h = window.location.hash;
    if (h.startsWith('#logistics') || h.startsWith('#delivery') || h.startsWith('#60-minute') || h.startsWith('#failed')) {
      try { history.pushState(null, '', window.location.pathname + window.location.search); } catch (e) {}
    }
  }

  function switchTab(tab) {
    if (!tab) return;
    S.tab = tab;
    markSidebar(true, tab);
    var targetHash = (MODULES.find(function(m){ return m.id === tab; }) || {}).hash || '#logistics-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
    render();
  }

  function init() {
    root = document.getElementById('zlog-dashboard-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zlog-dashboard-root';
      root.className = 'zpanel-root zlog-root';
      document.body.appendChild(root);
    }
  }

  /* ── Interceptor for Sidebar ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group headers or search input
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var txt = item.textContent.trim();
      var tab = tabFromText(txt);

      // Disambiguation for "Delivery Performance" and "60-Minute Delivery"
      // Check if inside Logistics & Delivery section
      if (tab === 'sixty-minute-delivery' || tab === 'delivery-performance') {
        var parentUl = item.closest('ul');
        var groupBtn = parentUl ? parentUl.previousElementSibling : null;
        var groupText = groupBtn ? (groupBtn.textContent || '') : '';
        // If explicitly under Orders & Operations, do not intercept here
        if (groupText.indexOf('Orders & Operations') >= 0 || groupText.indexOf('Orders') >= 0) {
          return;
        }
      }

      if (tab) {
        if (!t.closest('#zlog-dashboard-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }
    }
  }, true);

  // Keyboard Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) close();
  });

  // Hashchange Listener
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(window.location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && !window.location.hash.startsWith('#logistics') && !window.location.hash.startsWith('#delivery') && !window.location.hash.startsWith('#60-minute') && !window.location.hash.startsWith('#failed')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenveLogisticsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    showDispatchModal: showDispatchModal,
    showTelematicsModal: showTelematicsModal,
    exportTabCSV: exportTabCSV
  };

  /* ── Boot ─────────────────────────────────────────────────────────── */
  function boot() {
    init();
    var initialTab = tabFromHash(window.location.hash);
    if (initialTab) {
      setTimeout(function () { open(initialTab); }, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
