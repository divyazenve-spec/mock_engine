/* =====================================================================
   Zenve BI — Clinics & Hospitals Domain Control Center & Subdomain Suite
   All 10 Subdomains:
     1. Clinics Dashboard     (#clinics-dashboard)
     2. All Clinics           (#all-clinics)
     3. Hospitals             (#hospitals)
     4. Clinic Performance    (#clinic-performance)
     5. Clinic Revenue        (#clinic-revenue)
     6. Clinic Orders         (#clinic-orders)
     7. Clinic Patients       (#clinic-patients)
     8. Clinic Doctors        (#clinic-doctors)
     9. Clinic Commissions    (#clinic-commissions)
     10. Clinic Network       (#clinic-network)
   ===================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function inr(n) {
    n = Number(n) || 0;
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2) + ' L';
    if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
    return '₹' + n.toLocaleString('en-IN');
  }

  /* ── 10 Tabs Definition with Explicit Titles & Subtitles ────────── */
  var TABS = [
    { id: 'dashboard',   label: 'Clinics Dashboard',   icon: '🏥', hash: '#clinics-dashboard',   badge: 'Command Center', title: 'Clinics Dashboard', sub: 'Veterinary Hospitals & Clinics Command Center — Healthcare delivery, inpatient census, and OT utilization' },
    { id: 'all-clinics', label: 'All Clinics',         icon: '🏨', hash: '#all-clinics',         badge: '', title: 'All Clinics', sub: 'Outpatient Care Directory — Daycare suites, lead veterinarians, diagnostics tier, and daily footfall' },
    { id: 'hospitals',   label: 'Hospitals',           icon: '🚨', hash: '#hospitals',           badge: '', title: 'Hospitals', sub: '24x7 Tertiary Care Referral Centers — Modular OTs, ICU pods, isolation bays, blood bank, and imaging' },
    { id: 'performance', label: 'Clinic Performance',  icon: '📊', hash: '#clinic-performance',  badge: '', title: 'Clinic Performance', sub: 'Clinical Quality & Operational Benchmarking — OPD throughput, wait times, bed turnaround, and CSAT' },
    { id: 'revenue',     label: 'Clinic Revenue',      icon: '💎', hash: '#clinic-revenue',      badge: '', title: 'Clinic Revenue', sub: 'Healthcare Financials & Department Billings — Departmental billing realization, surgical monetization, and diagnostics' },
    { id: 'orders',      label: 'Clinic Orders',       icon: '📦', hash: '#clinic-orders',       badge: '', title: 'Clinic Orders', sub: 'Clinical Supply Requisitions & Purchase Orders — Titanium implants, inhalation gases, and suture packs' },
    { id: 'patients',    label: 'Clinic Patients',     icon: '🐾', hash: '#clinic-patients',     badge: '', title: 'Clinic Patients', sub: 'Inpatient Ward Census & Telemetry Roster — Admitted pets, ICU monitoring, surgical recovery, and vitals' },
    { id: 'doctors',     label: 'Clinic Doctors',      icon: '👨‍⚕️', hash: '#clinic-doctors',      badge: '', title: 'Clinic Doctors', sub: 'Veterinary Clinicians, Surgeons, Specialists & Rosters — Registered clinicians, VCI licenses, and shifts' },
    { id: 'commissions', label: 'Clinic Commissions',  icon: '🤝', hash: '#clinic-commissions',  badge: '', title: 'Clinic Commissions', sub: 'B2B Partner Clinic Referrals & Specialist Settlements — 10% statutory TDS, gross commission, and disbursement' },
    { id: 'network',     label: 'Clinic Network',      icon: '🌐', hash: '#clinic-network',      badge: '', title: 'Clinic Network', sub: 'Regional Hub-and-Spoke Infrastructure — Metro clusters, ALS veterinary ambulances, and expansion pipeline' }
  ];

  /* ── Datasets ─────────────────────────────────────────────────── */
  var FACILITIES = [
    { id: 'FAC-01', name: 'Zenve Indiranagar Central Hospital', type: 'Tertiary 24x7 Referral Hospital', city: 'Bengaluru', beds: '28 Beds (6 ICU)', ot: '3 Modular OTs', rev: '₹28.40 L', status: 'Operational', lead: 'Dr. Rajeshwari Swaminathan' },
    { id: 'FAC-02', name: 'Zenve Bandra West Trauma Centre', type: 'Tertiary 24x7 Referral Hospital', city: 'Mumbai', beds: '24 Beds (5 ICU)', ot: '2 Modular OTs', rev: '₹25.10 L', status: 'Operational', lead: 'Dr. Vikramaditya Rathore' },
    { id: 'FAC-03', name: 'Zenve DLF CyberCity Critical Care', type: 'Tertiary 24x7 Referral Hospital', city: 'Delhi NCR', beds: '32 Beds (8 ICU)', ot: '3 Modular OTs', rev: '₹31.25 L', status: 'Operational', lead: 'Dr. Maya Chandran' },
    { id: 'FAC-04', name: 'Zenve Jubilee Hills Specialty Center', type: 'Tertiary 24x7 Referral Hospital', city: 'Hyderabad', beds: '22 Beds (4 ICU)', ot: '2 Modular OTs', rev: '₹21.60 L', status: 'Operational', lead: 'Dr. Anirudh Sen' },
    { id: 'FAC-05', name: 'Zenve Koregaon Park Veterinary Hospital', type: 'Tertiary 24x7 Referral Hospital', city: 'Pune', beds: '20 Beds (4 ICU)', ot: '2 Modular OTs', rev: '₹18.90 L', status: 'Operational', lead: 'Dr. Rohan Kulkarni' },
    { id: 'FAC-06', name: 'Zenve Koramangala Care Clinic', type: 'Primary OPD & Diagnostics', city: 'Bengaluru', beds: '6 Daycare Pods', ot: '1 Minor OT', rev: '₹9.40 L', status: 'Operational', lead: 'Dr. Sneha Nair' },
    { id: 'FAC-07', name: 'Zenve Andheri Link Rd Clinic', type: 'Secondary Care Clinic', city: 'Mumbai', beds: '8 Daycare Pods', ot: '1 Minor OT', rev: '₹11.20 L', status: 'Operational', lead: 'Dr. Pooja Mehta' },
    { id: 'FAC-08', name: 'Zenve Saket Pet Wellness & Diagnostics', type: 'Primary OPD & Diagnostics', city: 'Delhi NCR', beds: '6 Daycare Pods', ot: '1 Minor OT', rev: '₹8.85 L', status: 'Operational', lead: 'Dr. Gaurav Sharma' },
    { id: 'FAC-09', name: 'Zenve Gachibowli Daycare & Dental', type: 'Secondary Care Clinic', city: 'Hyderabad', beds: '8 Daycare Pods', ot: '1 Minor OT', rev: '₹10.15 L', status: 'Operational', lead: 'Dr. Divya Reddy' },
    { id: 'FAC-10', name: 'Zenve Alwarpet Community Pet Clinic', type: 'Primary OPD & Diagnostics', city: 'Chennai', beds: '5 Daycare Pods', ot: '1 Minor OT', rev: '₹7.90 L', status: 'Operational', lead: 'Dr. Karthik Sundaram' }
  ];

  var LIVE_ADMISSIONS = [
    { id: 'ADM-401', pet: 'Bruno (Golden Retriever, 4y)', reason: 'TPLO Cruciate Ligament Rupture', facility: 'Indiranagar Central Hospital', doctor: 'Dr. Rajeshwari Swaminathan', bed: 'ICU Pod-02', status: 'In Surgery' },
    { id: 'ADM-402', pet: 'Milo (Persian Cat, 3y)', reason: 'Feline Lower Urinary Tract Obstruction', facility: 'Bandra Trauma Centre', doctor: 'Dr. Pooja Mehta', bed: 'Critical Ward-04', status: 'Admitted' },
    { id: 'ADM-403', pet: 'Simba (German Shepherd, 6y)', reason: 'Gastric Dilatation-Volvulus (GDV)', facility: 'DLF CyberCity Hospital', doctor: 'Dr. Vikramaditya Rathore', bed: 'OT Suite-01', status: 'In Surgery' },
    { id: 'ADM-404', pet: 'Bella (Shih Tzu, 5y)', reason: 'Pyometra Emergency Ovariohysterectomy', facility: 'Jubilee Hills Center', doctor: 'Dr. Anirudh Sen', bed: 'Recovery Ward-03', status: 'Post-Op' },
    { id: 'ADM-405', pet: 'Leo (Beagle, 2y)', reason: 'Foreign Body Endoscopic Retrieval', facility: 'Indiranagar Central Hospital', doctor: 'Dr. Maya Chandran', bed: 'Prep Bay-01', status: 'Admitted' },
    { id: 'ADM-406', pet: 'Coco (Labrador, 7y)', reason: 'Splenic Hemangiosarcoma Resection', facility: 'Koregaon Park Hospital', doctor: 'Dr. Rohan Kulkarni', bed: 'OT Suite-02', status: 'In Surgery' },
    { id: 'ADM-407', pet: 'Zoe (Siberian Husky, 1y)', reason: 'Diaphragmatic Hernia Repair', facility: 'Bandra Trauma Centre', doctor: 'Dr. Vikramaditya Rathore', bed: 'ICU Pod-01', status: 'In Surgery' },
    { id: 'ADM-408', pet: 'Oreo (Indie Dog, 3y)', reason: 'Femoral Fracture Locking Plate', facility: 'DLF CyberCity Hospital', doctor: 'Dr. Gaurav Sharma', bed: 'Trauma Bay-02', status: 'Admitted' },
    { id: 'ADM-409', pet: 'Luna (British Shorthair, 4y)', reason: 'Corneal Ulcer Conjunctival Flap', facility: 'Indiranagar Central Hospital', doctor: 'Dr. Sneha Nair', bed: 'Minor OT-01', status: 'Post-Op' },
    { id: 'ADM-410', pet: 'Rocky (Rottweiler, 5y)', reason: 'Acute Pancreatitis & Ketoacidosis', facility: 'Jubilee Hills Center', doctor: 'Dr. Divya Reddy', bed: 'ICU Pod-03', status: 'Admitted' }
  ];

  var INPATIENTS = [
    { id: 'INP-8801', pet: 'Max (Labrador, 5y)', owner: 'Vikram Malhotra', admitDate: '12 Oct 2026', facility: 'Indiranagar Central Hospital', bed: 'ICU Pod-01', dx: 'Post-TPLO Recovery & Pain Mgt', doc: 'Dr. Rajeshwari Swaminathan', vitals: 'HR: 104 bpm | Temp: 38.6°C | SpO2: 98%', status: 'Stable Recovery' },
    { id: 'INP-8802', pet: 'Cleo (Siamese Cat, 2y)', owner: 'Ananya Iyer', admitDate: '13 Oct 2026', facility: 'Bandra Trauma Centre', bed: 'Feline Isolation Bay-2', dx: 'FLUTD De-obstruction & IV Fluids', doc: 'Dr. Pooja Mehta', vitals: 'HR: 160 bpm | Temp: 38.2°C | SpO2: 99%', status: 'High Dependency' },
    { id: 'INP-8803', pet: 'Thor (Great Dane, 4y)', owner: 'Kabir Deshmukh', admitDate: '11 Oct 2026', facility: 'DLF CyberCity Hospital', bed: 'ICU Large Ward-03', dx: 'Post-GDV Gastropexy Telemetry', doc: 'Dr. Vikramaditya Rathore', vitals: 'HR: 92 bpm | Temp: 38.5°C | SpO2: 97%', status: 'Critical Care' },
    { id: 'INP-8804', pet: 'Cookie (Cocker Spaniel, 6y)', owner: 'Meera Nambiar', admitDate: '13 Oct 2026', facility: 'Jubilee Hills Center', bed: 'Step-Down Ward-05', dx: 'Acute Hemorrhagic Gastroenteritis', doc: 'Dr. Anirudh Sen', vitals: 'HR: 112 bpm | Temp: 38.8°C | SpO2: 98%', status: 'Stable Recovery' },
    { id: 'INP-8805', pet: 'Shadow (Doberman, 3y)', owner: 'Arjun Singhania', admitDate: '10 Oct 2026', facility: 'Indiranagar Central Hospital', bed: 'Surgical Ward-02', dx: 'External Fixation Radius-Ulna', doc: 'Dr. Maya Chandran', vitals: 'HR: 88 bpm | Temp: 38.4°C | SpO2: 99%', status: 'Stable Recovery' },
    { id: 'INP-8806', pet: 'Whiskey (Beagle, 4y)', owner: 'Rohit Verma', admitDate: '13 Oct 2026', facility: 'Koregaon Park Hospital', bed: 'ICU Pod-02', dx: 'Parvoviral Enteritis & Sepsis', doc: 'Dr. Rohan Kulkarni', vitals: 'HR: 128 bpm | Temp: 39.2°C | SpO2: 96%', status: 'Critical Care' },
    { id: 'INP-8807', pet: 'Bella (Persian Cat, 5y)', owner: 'Sunita Agarwal', admitDate: '12 Oct 2026', facility: 'Andheri Care Clinic', bed: 'Daycare Suite-01', dx: 'Full Mouth Extractions Fluid Therapy', doc: 'Dr. Sneha Nair', vitals: 'HR: 155 bpm | Temp: 38.3°C | SpO2: 98%', status: 'Stable Recovery' },
    { id: 'INP-8808', pet: 'Tiger (Indie Dog, 2y)', owner: 'Karan Kapoor', admitDate: '14 Oct 2026', facility: 'Bandra Trauma Centre', bed: 'Trauma Bay-03', dx: 'Pelvic Fracture Post-RTA', doc: 'Dr. Vikramaditya Rathore', vitals: 'HR: 118 bpm | Temp: 38.1°C | SpO2: 95%', status: 'High Dependency' },
    { id: 'INP-8809', pet: 'Mia (Golden Retriever, 7y)', owner: 'Pooja Hegde', admitDate: '11 Oct 2026', facility: 'Indiranagar Central Hospital', bed: 'Oncology Bay-01', dx: 'Post-Mastectomy & Chemo Infusion', doc: 'Dr. Rajeshwari Swaminathan', vitals: 'HR: 96 bpm | Temp: 38.7°C | SpO2: 99%', status: 'Stable Recovery' },
    { id: 'INP-8810', pet: 'Casper (Spitz, 8y)', owner: 'Aditya Menon', admitDate: '14 Oct 2026', facility: 'DLF CyberCity Hospital', bed: 'Cardiac Ward-02', dx: 'CHF Acute Pulmonary Edema', doc: 'Dr. Gaurav Sharma', vitals: 'HR: 135 bpm | Temp: 38.4°C | SpO2: 94%', status: 'Critical Care' }
  ];

  var DOCTORS = [
    { id: 'DOC-01', name: 'Dr. Rajeshwari Swaminathan', qual: 'B.V.Sc & A.H, M.V.Sc (Surgery & Rad)', vci: 'VCI-KAR-2012-0891', spec: 'Orthopedic Surgery & TPLO', base: 'Indiranagar Central Hospital', shift: 'Morning (08:00 – 16:00)', consults: 1420, surgeries: 284, csat: '4.98 ★', status: 'In Surgery', bio: 'Senior orthopedic veterinary surgeon with 14+ years in canine cruciate repair, arthroscopy, and complex osteosynthesis.', gradYear: 2012 },
    { id: 'DOC-02', name: 'Dr. Vikramaditya Rathore', qual: 'B.V.Sc & A.H, M.V.Sc, Dipl. ECVS', vci: 'VCI-MAH-2010-0412', spec: 'Trauma & Soft Tissue Surgery', base: 'Bandra Trauma Centre', shift: 'Emergency 24x7 Rotation', consults: 1680, surgeries: 312, csat: '4.96 ★', status: 'On Duty', bio: 'Trauma and critical care specialist pioneering emergency GDV decompressions, thoracic trauma repair, and microvascular surgery.', gradYear: 2010 },
    { id: 'DOC-03', name: 'Dr. Maya Chandran', qual: 'B.V.Sc & A.H, M.V.Sc (Internal Med)', vci: 'VCI-DEL-2014-1104', spec: 'Internal Medicine & Oncology', base: 'DLF CyberCity Hospital', shift: 'Morning (09:00 – 17:00)', consults: 2140, surgeries: 48, csat: '4.95 ★', status: 'On Duty', bio: 'Specialist in companion animal nephrology, endocrinology, hematologic malignancies, and targeted chemotherapy protocols.', gradYear: 2014 },
    { id: 'DOC-04', name: 'Dr. Anirudh Sen', qual: 'B.V.Sc & A.H, M.V.Sc, PhD (Neuro)', vci: 'VCI-TEL-2013-0678', spec: 'Neurosurgery & Spine', base: 'Jubilee Hills Center', shift: 'Morning (08:00 – 16:00)', consults: 1120, surgeries: 164, csat: '4.97 ★', status: 'On Duty', bio: 'Veterinary neurosurgeon specializing in hemilaminectomy, ventral slot decompression, and spinal trauma restoration.', gradYear: 2013 },
    { id: 'DOC-05', name: 'Dr. Sneha Nair', qual: 'B.V.Sc & A.H, MRCVS', vci: 'VCI-KAR-2017-2034', spec: 'Feline Medicine & Dentistry', base: 'Koramangala Care Clinic', shift: 'General (10:00 – 18:00)', consults: 1890, surgeries: 86, csat: '4.94 ★', status: 'On Duty', bio: 'ISFM Certified feline practitioner specializing in stress-free handling, geriatric feline renal care, and maxillofacial dentistry.', gradYear: 2017 },
    { id: 'DOC-06', name: 'Dr. Rohan Kulkarni', qual: 'B.V.Sc & A.H, M.V.Sc (Clinical Med)', vci: 'VCI-MAH-2015-1445', spec: 'Critical Care & Emergency', base: 'Koregaon Park Hospital', shift: 'Night Shift (20:00 – 08:00)', consults: 1340, surgeries: 72, csat: '4.92 ★', status: 'On Call', bio: 'Emergency & Critical Care clinician leading the 24x7 intensive care unit, mechanical ventilation, and CPR protocols.', gradYear: 2015 },
    { id: 'DOC-07', name: 'Dr. Pooja Mehta', qual: 'B.V.Sc & A.H, PGD-Surg', vci: 'VCI-MAH-2018-2490', spec: 'Soft Tissue Surgery', base: 'Andheri Link Rd Clinic', shift: 'Evening (14:00 – 22:00)', consults: 1210, surgeries: 118, csat: '4.93 ★', status: 'On Duty', bio: 'Experienced in minimally invasive laparoscopic spays, intestinal resections, and reconstructive skin flaps.', gradYear: 2018 },
    { id: 'DOC-08', name: 'Dr. Gaurav Sharma', qual: 'B.V.Sc & A.H, M.V.Sc (Surgery)', vci: 'VCI-DEL-2016-1782', spec: 'Orthopedics & Arthroscopy', base: 'Saket Pet Wellness', shift: 'Morning (08:00 – 16:00)', consults: 1460, surgeries: 134, csat: '4.91 ★', status: 'On Duty', bio: 'Expert in juvenile orthopedic conditions, patellar luxation correction, and stifle stabilization.', gradYear: 2016 },
    { id: 'DOC-09', name: 'Dr. Divya Reddy', qual: 'B.V.Sc & A.H, M.V.Sc (Dermatology)', vci: 'VCI-TEL-2017-2190', spec: 'Dermatology & Allergy', base: 'Gachibowli Daycare', shift: 'General (09:30 – 17:30)', consults: 1980, surgeries: 24, csat: '4.96 ★', status: 'On Duty', bio: 'Dermatology fellow focusing on allergic dermatitis, immunotherapy, deep otitis management, and videootoscopy.', gradYear: 2017 },
    { id: 'DOC-10', name: 'Dr. Karthik Sundaram', qual: 'B.V.Sc & A.H, M.V.Sc (Ophthalmology)', vci: 'VCI-TN-2015-1329', spec: 'Ophthalmology', base: 'Alwarpet Community Clinic', shift: 'General (10:00 – 18:00)', consults: 1530, surgeries: 94, csat: '4.95 ★', status: 'On Duty', bio: 'Ophthalmic microsurgeon performing phacoemulsification for cataracts, conjunctival flaps, and glaucoma shunt implants.', gradYear: 2015 }
  ];

  var CLINIC_ORDERS = [
    { po: 'PO-CLIN-4011', facility: 'Indiranagar Central Hospital', item: 'Titanium Locking Bone Plates 3.5mm Set', vendor: 'Synthes Vet India', qty: '4 Kits', cost: '₹1,84,000', priority: 'Critical', status: 'Approved & Dispatched' },
    { po: 'PO-CLIN-4012', facility: 'Bandra Trauma Centre', item: 'Isoflurane Inhalation Anesthetic 250ml', vendor: 'Abbott Healthcare', qty: '20 Units', cost: '₹76,500', priority: 'High', status: 'Delivered' },
    { po: 'PO-CLIN-4013', facility: 'DLF CyberCity Hospital', item: 'Medical Grade Liquid Oxygen Cylinder Refill', vendor: 'Inox Air Products', qty: '2 Cryo Cyl', cost: '₹48,000', priority: 'Critical', status: 'Delivered' },
    { po: 'PO-CLIN-4014', facility: 'Jubilee Hills Center', item: 'Ethicon Monocryl/Vicryl Absorbable Sutures', vendor: 'Johnson & Johnson Med', qty: '15 Boxes', cost: '₹54,200', priority: 'High', status: 'Approved' },
    { po: 'PO-CLIN-4015', facility: 'Indiranagar Central Hospital', item: 'Rabies & DHPPiL Vaccine Cold Chain (500 Doses)', vendor: 'Zoetis Animal Health', qty: '500 Vials', cost: '₹1,95,000', priority: 'Critical', status: 'Delivered' },
    { po: 'PO-CLIN-4016', facility: 'Koregaon Park Hospital', item: 'Microflex Vet IV Infusion Pumps & Sets', vendor: 'B. Braun Medical', qty: '6 Units', cost: '₹1,12,000', priority: 'High', status: 'Approved' },
    { po: 'PO-CLIN-4017', facility: 'Andheri Link Rd Clinic', item: 'Digital Dental X-Ray Sensor Size 2', vendor: 'Carestream Dental', qty: '1 Set', cost: '₹82,000', priority: 'Routine', status: 'Delivered' },
    { po: 'PO-CLIN-4018', facility: 'Saket Pet Wellness', item: 'Rapid In-Clinic FeLV/FIV & Parvo Combo Tests', vendor: 'IDEXX Laboratories', qty: '100 Tests', cost: '₹68,500', priority: 'High', status: 'Approved & Dispatched' },
    { po: 'PO-CLIN-4019', facility: 'Gachibowli Daycare', item: 'VetScan Comprehensive Chemistry Rotor Discs', vendor: 'Zoetis Diagnostics', qty: '50 Rotors', cost: '₹92,400', priority: 'Routine', status: 'Delivered' },
    { po: 'PO-CLIN-4020', facility: 'Alwarpet Community Clinic', item: 'Ophthalmic Microsurgical Trephines & Blades', vendor: 'Fine Science Tools', qty: '2 Kits', cost: '₹43,800', priority: 'Routine', status: 'Pending Approval' }
  ];

  var COMMISSIONS = [
    { id: 'COM-2026-901', partner: 'Dr. Arvind Pet Care Clinic, HSR Layout', type: 'Referring Primary Clinic', cases: 18, val: '₹4,85,000', rate: '12%', comm: '₹58,200', tds: '₹5,820', net: '₹52,380', status: 'Paid' },
    { id: 'COM-2026-902', partner: 'Paws & Claws Specialty, Juhu', type: 'Referring Primary Clinic', cases: 22, val: '₹6,40,000', rate: '12%', comm: '₹76,800', tds: '₹7,680', net: '₹69,120', status: 'Approved' },
    { id: 'COM-2026-903', partner: 'Dr. Roy Imaging & Ultrasound Lab, Gurgaon', type: 'Diagnostic Partner', cases: 35, val: '₹3,90,000', rate: '10%', comm: '₹39,000', tds: '₹3,900', net: '₹35,100', status: 'Paid' },
    { id: 'COM-2026-904', partner: 'Canine Care Centre, Banjara Hills', type: 'Referring Primary Clinic', cases: 14, val: '₹3,65,000', rate: '12%', comm: '₹43,800', tds: '₹4,380', net: '₹39,420', status: 'Approved' },
    { id: 'COM-2026-905', partner: 'Dr. Meenakshi Sundaram (Visiting Cardiologist)', type: 'Visiting Specialist', cases: 12, val: '₹5,20,000', rate: '25%', comm: '₹1,30,000', tds: '₹13,000', net: '₹1,17,000', status: 'Approved' },
    { id: 'COM-2026-906', partner: 'Aundh Pet Clinic & Daycare, Pune', type: 'Referring Primary Clinic', cases: 16, val: '₹3,45,000', rate: '12%', comm: '₹41,400', tds: '₹4,140', net: '₹37,260', status: 'Paid' },
    { id: 'COM-2026-907', partner: 'Velachery Veterinary Center, Chennai', type: 'Referring Primary Clinic', cases: 11, val: '₹2,80,000', rate: '12%', comm: '₹33,600', tds: '₹3,360', net: '₹30,240', status: 'Pending' },
    { id: 'COM-2026-908', partner: 'Dr. Kapoor Oncology Consultancy, Vasant Kunj', type: 'Visiting Specialist', cases: 9, val: '₹4,95,000', rate: '25%', comm: '₹1,23,750', tds: '₹12,375', net: '₹1,11,375', status: 'Approved' },
    { id: 'COM-2026-909', partner: 'South Mumbai Pet Hospital Network', type: 'Corporate Referral', cases: 28, val: '₹8,10,000', rate: '10%', comm: '₹81,000', tds: '₹8,100', net: '₹72,900', status: 'Paid' },
    { id: 'COM-2026-910', partner: 'Kalyan Nagar Pet Polyclinic, Bengaluru', type: 'Referring Primary Clinic', cases: 15, val: '₹3,75,000', rate: '12%', comm: '₹45,000', tds: '₹4,500', net: '₹40,500', status: 'Approved' }
  ];

  var AMBULANCE_FLEET = [
    { vehicle: 'KA-03-AG-4412', id: 'AMB-BLR-01', status: 'In Transit (Emergency)', base: 'Indiranagar Central Hospital', medic: 'Paramedic Harish B. & Vet Tech Anitha', equipment: 'Onboard O2 Concentrator, Defibrillator & Neonatal Incubator', eta: '8 mins (HAL Airport Rd)' },
    { vehicle: 'MH-02-DN-7731', id: 'AMB-BOM-01', status: 'Dispatched to Scene', base: 'Bandra Trauma Centre', medic: 'Paramedic Nilesh Shinde & Dr. Rathore', equipment: 'Mobile Suction, Multipara Monitor, Splint Kits', eta: '12 mins (Linking Road)' },
    { vehicle: 'DL-01-ZA-9920', id: 'AMB-NCR-01', status: 'Standby at Base', base: 'DLF CyberCity Hospital', medic: 'Paramedic Rakesh Tanwar & Vet Tech Neetu', equipment: 'Advanced Life Support ICU, Cryo Oxygen, Syringe Drivers', eta: 'Immediate Base Ready' },
    { vehicle: 'TS-09-EV-3345', id: 'AMB-HYD-01', status: 'Returning to Base', base: 'Jubilee Hills Center', medic: 'Paramedic Santosh K. & Vet Tech Praveen', equipment: 'Crash Cart, Portable Ultrasound, Hydraulic Pet Stretcher', eta: '15 mins (Road No. 36)' },
    { vehicle: 'MH-12-PQ-8812', id: 'AMB-PUN-01', status: 'In Transit (Inter-Hospital)', base: 'Koregaon Park Hospital', medic: 'Paramedic Vaibhav J. & Vet Tech Meena', equipment: 'Ventilator Support, Heated Recovery Pod, IV Infusion', eta: '20 mins (Viman Nagar)' },
    { vehicle: 'KA-04-MK-1190', id: 'AMB-BLR-02', status: 'Standby at Base', base: 'Koramangala Care Clinic', medic: 'Paramedic Suresh G. & Vet Tech Deepa', equipment: 'Basic Emergency Trauma Kit, Oxygen Resuscitation Bag', eta: 'Immediate Base Ready' }
  ];

  /* ── State ─────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    docSearch: '',
    docSpecialty: 'ALL',
    docDuty: 'ALL'
  };

  var root = null;

  /* ── Tab resolution from Hash and Sidebar Text ──────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('pharmacy') >= 0 || h.indexOf('medicines') >= 0 || h.indexOf('prescriptions') >= 0) return null;
    if (h === 'clinics-dashboard' || h === 'clinics') return 'dashboard';
    if (h === 'all-clinics') return 'all-clinics';
    if (h === 'hospitals') return 'hospitals';
    if (h === 'clinic-performance') return 'performance';
    if (h === 'clinic-revenue') return 'revenue';
    if (h === 'clinic-orders') return 'orders';
    if (h === 'clinic-patients') return 'patients';
    if (h === 'clinic-doctors') return 'doctors';
    if (h === 'clinic-commissions') return 'commissions';
    if (h === 'clinic-network') return 'network';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    // Exclude other domains
    if (raw.indexOf('pharmacy') !== -1 || raw.indexOf('medicines') !== -1 || raw.indexOf('prescriptions') !== -1 || raw.indexOf('batch') !== -1 || raw.indexOf('expiry') !== -1 || raw.indexOf('report') !== -1 || raw.indexOf('alert') !== -1) {
      return null;
    }
    if (raw.indexOf('revenue by') !== -1 || raw.indexOf('sales by') !== -1 || raw === 'doctors dashboard' || raw === 'all doctors' || raw === 'doctor performance' || raw === 'doctor revenue' || raw === 'doctor patients' || raw === 'doctor orders' || raw === 'doctor commissions') {
      return null;
    }
    // Never match the parent category / domain accordion header ("Clinics & Hospitals", etc.)
    if (raw.indexOf('clinics & hospitals') !== -1 || raw.indexOf('clinics & hospit') !== -1 || raw.indexOf('clinics and hospitals') !== -1 || raw.startsWith('clinics &') || raw.startsWith('clinics and')) {
      return null;
    }
    if (raw === 'clinics dashboard' || raw.indexOf('clinics dashboard') >= 0 || raw === 'hospital command center') return 'dashboard';
    if (raw === 'all clinics' || raw.indexOf('all clinics') >= 0 || raw === 'outpatient clinics') return 'all-clinics';
    if (raw === 'hospitals' || raw === 'tertiary hospitals' || raw === '24x7 hospitals' || (raw.indexOf('hospitals') >= 0 && raw.indexOf('clinic') === -1 && raw.indexOf('&') === -1)) return 'hospitals';
    if (raw === 'clinic performance' || raw.indexOf('clinic performance') >= 0) return 'performance';
    if (raw === 'clinic revenue' || raw.indexOf('clinic revenue') >= 0 || raw === 'hospital revenue') return 'revenue';
    if (raw === 'clinic orders' || raw.indexOf('clinic orders') >= 0 || raw === 'clinical orders') return 'orders';
    if (raw === 'clinic patients' || raw.indexOf('clinic patients') >= 0 || raw === 'inpatients' || raw === 'ward patients') return 'patients';
    if (raw === 'clinic doctors' || raw.indexOf('clinic doctors') >= 0 || raw === 'clinicians' || raw === 'hospital doctors') return 'doctors';
    if (raw === 'clinic commissions' || raw.indexOf('clinic commissions') >= 0) return 'commissions';
    if (raw === 'clinic network' || raw.indexOf('clinic network') >= 0 || raw === 'facilities network') return 'network';
    return null;
  }

  /* ── Helper Renderers ─────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zch-kpi">',
        '<div class="zch-kpi-top">',
          '<span class="zch-kpi-label">' + esc(label) + '</span>',
          '<span class="zch-kpi-icon">' + esc(icon || '🏥') + '</span>',
        '</div>',
        '<div class="zch-kpi-val">' + esc(val) + '</div>',
        '<div class="zch-kpi-bottom">',
          '<span class="zch-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zch-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 1: Clinics Dashboard ─────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Network Inpatients', '64 Beds', '+8.2%', 'up', '82% occupancy (10 centers)', '🛏️'),
        kpiHtml('Active Surgical Theatres', '12 Suites', '100%', 'up', 'Laminar flow modular OTs', '🩺'),
        kpiHtml('Clinical Quality Index', '99.4%', '+0.4%', 'up', 'Zero hospital-acquired infections', '🛡️'),
        kpiHtml('Emergency Admissions', '28 Today', '+12.5%', 'up', 'Critical care triage', '🚨'),
        kpiHtml('Network Monthly Revenue', '₹1.53 Cr', '+16.8%', 'up', 'Exceeding budget by ₹18.5L', '💎'),
        kpiHtml('Emergency Ambulances', '6 ALS Units', '100%', 'up', 'Avg urban response: 11 mins', '🚑'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🚨 Real-Time Emergency Triage & Inpatient Admissions</h3><p class="zch-card-sub">Live feed from tertiary trauma desks and surgical intake</p></div>',
            '<span class="zch-badge green">LIVE STREAM</span>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Case & Pet</th><th>Clinical Indication</th><th>Facility</th><th>Attending Surgeon</th><th>Status</th></tr></thead>',
              '<tbody>',
                LIVE_ADMISSIONS.map(function (a) {
                  return '<tr>' +
                    '<td><b>' + esc(a.pet) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(a.id) + '</span></td>' +
                    '<td style="color:#f8fafc;">' + esc(a.reason) + '</td>' +
                    '<td style="color:#94a3b8;">' + esc(a.facility) + '</td>' +
                    '<td><span style="color:#cbd5e1;font-weight:600;">' + esc(a.doctor) + '</span><br><span style="font-size:10px;color:#64748b;">' + esc(a.bed) + '</span></td>' +
                    '<td><span class="zch-badge ' + (a.status === 'In Surgery' ? 'red' : a.status === 'Admitted' ? 'blue' : 'green') + '">' + esc(a.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🏥 Facility Census & Inpatient Bed Capacity</h3><p class="zch-card-sub">Real-time status of high-dependency and surgical units</p></div>',
            '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.switchTab(\'hospitals\')">View All Hospitals →</button>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Facility</th><th>City</th><th>Occupancy</th><th>OT Load</th><th>Status</th></tr></thead>',
              '<tbody>',
                FACILITIES.slice(0, 5).map(function (f) {
                  return '<tr>' +
                    '<td><b>' + esc(f.name) + '</b><br><span style="font-size:11px;color:#94a3b8;">' + esc(f.type) + '</span></td>' +
                    '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                    '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(f.beds) + '</td>' +
                    '<td><span style="color:#38bdf8;font-weight:600;">' + esc(f.ot) + '</span></td>' +
                    '<td><span class="zch-badge green">' + esc(f.status) + '</span></td>' +
                  '</tr>';
                }).join(''),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 2: All Clinics ───────────────────────────────────────── */
  function renderAllClinics() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Outpatient Facilities', '10 Centers', '+2 YoY', 'up', '5 Tertiary + 5 Outpatient Care', '🏨'),
        kpiHtml('Daily OPD Footfall', '485 Pets', '+14.6%', 'up', 'Canine, Feline & Exotic consults', '👥'),
        kpiHtml('Average Consultation Time', '24 mins', '-3 mins', 'up', 'Thorough clinical diagnosis', '⏱️'),
        kpiHtml('Outpatient Revenue', '₹39.80 L', '+18.2%', 'up', 'Monthly consultation realized', '💰'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Outpatient Clinics Directory & Care Centers</h3><p class="zch-card-sub">Daycare suites, lead veterinarians, diagnostic equipment, and patient volume</p></div>',
          '<div style="display:flex;gap:8px;">',
            '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showNewClinicModal()">+ Register New Clinic</button>',
          '</div>',
        '</div>',

        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Clinic Name & Code</th><th>City Cluster</th><th>Tier & Focus</th><th>Lead Veterinarian</th><th>Inpatient/Daycare</th><th>OT Capability</th><th>Status</th><th>Actions</th></tr></thead>',
            '<tbody>',
              FACILITIES.filter(function (f) { return !f.type.includes('Tertiary'); }).map(function (f) {
                return '<tr>' +
                  '<td><b>' + esc(f.name) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(f.id) + '</span></td>' +
                  '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                  '<td><div style="font-weight:600;color:#f8fafc;">' + esc(f.type) + '</div><div style="font-size:10px;color:#94a3b8;">Preventive & Daycare</div></td>' +
                  '<td><div style="font-weight:600;color:#cbd5e1;">' + esc(f.lead) + '</div></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(f.beds) + '</td>' +
                  '<td><span style="color:#38bdf8;">' + esc(f.ot) + '</span></td>' +
                  '<td><span class="zch-badge green">' + esc(f.status) + '</span></td>' +
                  '<td><button class="zch-btn" onclick="alert(\'Viewing telemetry for ' + esc(f.name) + '\')">Details</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 3: Hospitals ─────────────────────────────────────────── */
  function renderHospitals() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Tertiary Referral Hospitals', '5 Flagships', '24x7', 'up', 'BLR, BOM, DEL, HYD, PUN', '🚨'),
        kpiHtml('Total Licensed Beds', '126 Beds', '82.5%', 'up', '27 High-Dependency & ICU pods', '🛏️'),
        kpiHtml('Modular Operating Theatres', '12 Suites', '100%', 'up', 'Laminar Flow & C-Arm imaging', '🩺'),
        kpiHtml('Emergency Blood Bank', '48 Units', '+12 Units', 'up', 'Canine DEA 1.1 & Feline blood', '🩸'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">24x7 Tertiary Flagship Hospitals</h3><p class="zch-card-sub">Advanced diagnostic imaging (CT/MRI), blood banking, and multi-specialty surgery</p></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
            (FACILITIES.filter(function (f) { return f.type.includes('Tertiary'); }).length === 0 ?
              '<div style="text-align:center;padding:28px;color:#94a3b8;">No hospital records found</div>' :
              FACILITIES.filter(function (f) { return f.type.includes('Tertiary'); }).map(function (h) {
                return '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;">' +
                  '<div style="display:flex;justify-content:space-between;align-items:flex-start;">' +
                    '<div>' +
                      '<span style="font-size:10px;color:#38bdf8;font-weight:700;text-transform:uppercase;">' + esc(h.city) + ' REGIONAL HUB</span>' +
                      '<h4 style="margin:2px 0 4px;font-size:15px;color:#fff;">' + esc(h.name) + '</h4>' +
                      '<div style="font-size:12px;color:#94a3b8;">Medical Director: <strong style="color:#cbd5e1;">' + esc(h.lead) + '</strong></div>' +
                    '</div>' +
                    '<span class="zch-badge green">24x7 Active</span>' +
                  '</div>' +
                  '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;">' +
                    '<div><span style="color:#64748b;">Bed Census:</span><div style="font-weight:700;color:#fff;font-family:IBM Plex Mono,monospace;">' + esc(h.beds) + '</div></div>' +
                    '<div><span style="color:#64748b;">Surgical OT:</span><div style="font-weight:700;color:#38bdf8;font-family:IBM Plex Mono,monospace;">' + esc(h.ot) + '</div></div>' +
                    '<div><span style="color:#64748b;">Daily Revenue:</span><div style="font-weight:700;color:#10b981;font-family:IBM Plex Mono,monospace;">' + esc(h.rev) + '</div></div>' +
                  '</div>' +
                '</div>';
              }).join('')),
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Live Surgical Theatre Schedule</h3><p class="zch-card-sub">Active and upcoming operations across tertiary facilities</p></div>',
            '<span class="zch-badge blue">OT ROSTER</span>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Patient & Surgery</th><th>OT Suite</th><th>Surgeon</th><th>Anesthetist</th><th>Schedule</th></tr></thead>',
              '<tbody>',
                                '<tr>' +
                  '<td><b>Bruno</b> (Golden Retriever)<br><span style="font-size:10px;color:#38bdf8;">TPLO Cruciate Ligament Repair</span></td>' +
                  '<td><span class="zch-badge blue">OT Suite 1 (Laminar Flow)</span></td>' +
                  '<td><b style="color:#fff;">Dr. Rajeshwari Swaminathan</b></td>' +
                  '<td><span style="color:#94a3b8;">Dr. Anirudh Sen</span></td>' +
                  '<td><span class="zch-badge red">In Progress (10:30–12:30)</span></td>' +
                '</tr>' +
                '<tr>' +
                  '<td><b>Simba</b> (German Shepherd)<br><span style="font-size:10px;color:#38bdf8;">Emergency GDV Gastropexy</span></td>' +
                  '<td><span class="zch-badge red">OT Suite 2 (Emergency)</span></td>' +
                  '<td><b style="color:#fff;">Dr. Vikramaditya Rathore</b></td>' +
                  '<td><span style="color:#94a3b8;">Dr. Rohan Kulkarni</span></td>' +
                  '<td><span class="zch-badge red">In Progress (11:15–13:45)</span></td>' +
                '</tr>' +
                '<tr>' +
                  '<td><b>Coco</b> (Labrador Retriever)<br><span style="font-size:10px;color:#38bdf8;">Splenectomy & Biopsy</span></td>' +
                  '<td><span class="zch-badge blue">OT Suite 1</span></td>' +
                  '<td><b style="color:#fff;">Dr. Rohan Kulkarni</b></td>' +
                  '<td><span style="color:#94a3b8;">Dr. Sneha Nair</span></td>' +
                  '<td><span class="zch-badge amber">Next Up (13:30–15:00)</span></td>' +
                '</tr>' +
                '<tr>' +
                  '<td><b>Bella</b> (Shih Tzu)<br><span style="font-size:10px;color:#38bdf8;">Pyometra Ovariohysterectomy</span></td>' +
                  '<td><span class="zch-badge blue">OT Suite 3</span></td>' +
                  '<td><b style="color:#fff;">Dr. Maya Chandran</b></td>' +
                  '<td><span style="color:#94a3b8;">Dr. Pooja Mehta</span></td>' +
                  '<td><span class="zch-badge green">Scheduled (14:00–15:30)</span></td>' +
                '</tr>' +
                '<tr>' +
                  '<td><b>Luna</b> (British Shorthair)<br><span style="font-size:10px;color:#38bdf8;">Corneal Conjunctival Graft</span></td>' +
                  '<td><span class="zch-badge purple">Minor OT 1</span></td>' +
                  '<td><b style="color:#fff;">Dr. Karthik Sundaram</b></td>' +
                  '<td><span style="color:#94a3b8;">Dr. Gaurav Sharma</span></td>' +
                  '<td><span class="zch-badge green">Scheduled (15:00–16:00)</span></td>' +
                '</tr>' ,
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 4: Clinic Performance ────────────────────────────────── */
  function renderPerformance() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Surgical Success Rate', '99.2%', '+0.5%', 'up', 'Complex ortho, soft tissue & neuro', '🩺'),
        kpiHtml('Client CSAT Score', '4.95 ★', '+0.04', 'up', '4,200+ verified pet parent ratings', '⭐'),
        kpiHtml('Average Wait Time', '8.5 mins', '-4.2 mins', 'up', 'Digital token & triage system', '⏱️'),
        kpiHtml('Clinical Audit Compliance', '98.8%', '+1.2%', 'up', 'NABH/VCI safety standards', '📋'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Network Facilities Performance Benchmarking</h3><p class="zch-card-sub">OPD throughput, surgical volume, bed turnaround, and patient experience ratings</p></div>',
          '<button class="zch-btn" onclick="alert(\'Exporting Clinical Quality Audit PDF report...\')">Download Quality Audit PDF</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Facility</th><th>City</th><th>Monthly Surgeries</th><th>OPD Visits</th><th>Bed Turnaround</th><th>Infection Rate</th><th>Client CSAT</th><th>Performance Index</th></tr></thead>',
            '<tbody>',
              FACILITIES.map(function (f, i) {
                var surg = 45 - (i * 3);
                var opd = 520 - (i * 35);
                var turn = (1.8 + (i * 0.1)).toFixed(1) + ' days';
                var csat = (4.96 - (i * 0.02)).toFixed(2);
                return '<tr>' +
                  '<td><b>' + esc(f.name) + '</b></td>' +
                  '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + (surg > 10 ? surg : 12) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + opd + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + turn + '</td>' +
                  '<td><span style="color:#10b981;font-weight:600;">0.0%</span></td>' +
                  '<td style="color:#fbbf24;font-weight:700;">' + csat + ' ★</td>' +
                  '<td><span class="zch-badge green">9' + (8 - i % 3) + '% Top Tier</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 5: Clinic Revenue ────────────────────────────────────── */
  function renderRevenue() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Total Network Revenue', '₹1,53,35,000', '+16.8%', 'up', 'Current month billings', '💰'),
        kpiHtml('Surgeries & Procedures', '₹58,40,000', '38.1%', 'up', 'Ortho, Neuro & Soft Tissue', '🩺'),
        kpiHtml('Outpatient Consultations', '₹39,80,000', '25.9%', 'up', 'Specialist & preventive OPD', '👥'),
        kpiHtml('Diagnostic Imaging & Lab', '₹19,90,000', '13.0%', 'up', 'CT, X-ray, Ultrasound & Path', '🔬'),
        kpiHtml('Inpatient ICU & Wards', '₹27,60,000', '18.0%', 'up', 'High-dependency recovery care', '🛏️'),
        kpiHtml('Avg Ticket Size / Pet', '₹3,160', '+9.4%', 'up', 'Comprehensive care bundling', '📈'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Departmental Revenue Contribution</h3><p class="zch-card-sub">Clinical billing distribution across major practice streams</p></div>',
          '</div>',
                    '<div style="display:flex;flex-direction:column;gap:14px;padding:8px 0;">' +
            '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:#fff;font-weight:600;">Surgeries & Specialized Procedures</span><strong style="color:#10b981;font-family:IBM Plex Mono,monospace;">₹58,40,000 (38.1%)</strong></div><div class="zch-progress-bar"><div class="zch-progress-fill" style="width:38.1%;background:#10b981;"></div></div></div>' +
            '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:#fff;font-weight:600;">Outpatient Consultations & Vaccinations</span><strong style="color:#38bdf8;font-family:IBM Plex Mono,monospace;">₹39,80,000 (25.9%)</strong></div><div class="zch-progress-bar"><div class="zch-progress-fill" style="width:25.9%;background:#38bdf8;"></div></div></div>' +
            '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:#fff;font-weight:600;">Inpatient ICU, Wards & Daycare Stays</span><strong style="color:#a855f7;font-family:IBM Plex Mono,monospace;">₹27,60,000 (18.0%)</strong></div><div class="zch-progress-bar"><div class="zch-progress-fill" style="width:18.0%;background:#a855f7;"></div></div></div>' +
            '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:#fff;font-weight:600;">Diagnostic Imaging (CT/X-Ray) & Pathology Lab</span><strong style="color:#f59e0b;font-family:IBM Plex Mono,monospace;">₹19,90,000 (13.0%)</strong></div><div class="zch-progress-bar"><div class="zch-progress-fill" style="width:13.0%;background:#f59e0b;"></div></div></div>' +
            '<div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:#fff;font-weight:600;">Emergency Mobile ICU & Hospital Pharmacy</span><strong style="color:#ec4899;font-family:IBM Plex Mono,monospace;">₹7,65,000 (5.0%)</strong></div><div class="zch-progress-bar"><div class="zch-progress-fill" style="width:5.0%;background:#ec4899;"></div></div></div>' +
          '</div>' ,
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Facility Monthly Billing League</h3><p class="zch-card-sub">Top revenue centers across India clusters</p></div>',
          '</div>',
          '<div class="zch-table-wrap">',
            '<table class="zch-table">',
              '<thead><tr><th>Facility</th><th>City</th><th>Monthly Billings</th><th>Growth YoY</th></tr></thead>',
              '<tbody>',
                (FACILITIES.length === 0 ?
                  '<tr><td colspan="4" style="text-align:center;padding:28px;color:#94a3b8;">No facility revenue records found</td></tr>' :
                  FACILITIES.map(function (f) {
                    return '<tr>' +
                      '<td><b>' + esc(f.name) + '</b></td>' +
                      '<td><span class="zch-badge blue">' + esc(f.city) + '</span></td>' +
                      '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(f.rev) + '</td>' +
                      '<td><span style="color:#10b981;font-weight:600;">+14.2%</span></td>' +
                    '</tr>';
                  }).join('')),
              '</tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 6: Clinic Orders ─────────────────────────────────────── */
  function renderOrders() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Clinical PO Volume', '₹24,85,000', '+11.2%', 'up', '48 clinical purchase orders', '📦'),
        kpiHtml('Critical Implants & Ortho', '28 Kits', '100%', 'up', 'Synthes titanium locking plates', '🔩'),
        kpiHtml('Medical Gases (O2 & N2O)', '18 Cyl', 'Zero Stockout', 'up', 'Cryo & Liquid O2 backup', '💨'),
        kpiHtml('Pending Approvals', '3 POs', '₹1.85 L', 'warn', 'Requires Medical Director sign-off', '⏳'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Clinical Supply Requisitions & Purchase Orders</h3><p class="zch-card-sub">Surgical implants, anesthesia supplies, diagnostic reagents, and surgical packs</p></div>',
          '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showNewOrderModal()">+ Create Requisition PO</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>PO Number</th><th>Target Facility</th><th>Clinical Item Description</th><th>Vendor / Supplier</th><th>Qty</th><th>Value</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead>',
            '<tbody>',
              CLINIC_ORDERS.map(function (o) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(o.po) + '</td>' +
                  '<td><b>' + esc(o.facility) + '</b></td>' +
                  '<td>' + esc(o.item) + '</td>' +
                  '<td style="color:#94a3b8;">' + esc(o.vendor) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + esc(o.qty) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#f8fafc;">' + esc(o.cost) + '</td>' +
                  '<td><span class="zch-badge ' + (o.priority === 'Critical' ? 'red' : o.priority === 'High' ? 'amber' : 'blue') + '">' + esc(o.priority) + '</span></td>' +
                  '<td><span class="zch-badge ' + (o.status.includes('Approved') ? 'green' : o.status.includes('Delivered') ? 'blue' : 'amber') + '">' + esc(o.status) + '</span></td>' +
                  '<td><button class="zch-btn" onclick="alert(\'Viewing invoice and tracking for ' + esc(o.po) + '\')">Inspect</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 7: Clinic Patients ───────────────────────────────────── */
  function renderPatients() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Active Inpatients', '64 Pets', '82.5%', 'up', '10 facilities nationwide', '🐾'),
        kpiHtml('Critical Care ICU', '18 Pets', 'Continuous', 'up', 'Post-op & emergency trauma pods', '❤️'),
        kpiHtml('Average Length of Stay', '2.4 Days', '-0.3 days', 'up', 'Optimal clinical recovery cycle', '📅'),
        kpiHtml('Discharges Planned Today', '14 Pets', 'Post-Op Ready', 'up', 'Home care protocols delivered', '🏠'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">Inpatient Ward Census & Telemetry Roster</h3><p class="zch-card-sub">Admitted pets, diagnosis, attending clinical lead, and real-time vital status</p></div>',
          '<button class="zch-btn primary" onclick="alert(\'Opening Inpatient Admission Form...\')">+ Admit Inpatient</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Patient & Code</th><th>Pet Parent</th><th>Admission Date</th><th>Facility & Bed</th><th>Clinical Diagnosis</th><th>Attending Doctor</th><th>Current Vitals</th><th>Care Status</th><th>Discharge</th></tr></thead>',
            '<tbody>',
              INPATIENTS.map(function (p) {
                return '<tr>' +
                  '<td><b>' + esc(p.pet) + '</b><br><span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(p.id) + '</span></td>' +
                  '<td style="color:#cbd5e1;">' + esc(p.owner) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + esc(p.admitDate) + '</td>' +
                  '<td><b>' + esc(p.facility) + '</b><br><span style="color:#38bdf8;font-size:11px;">' + esc(p.bed) + '</span></td>' +
                  '<td style="color:#f8fafc;">' + esc(p.dx) + '</td>' +
                  '<td style="color:#cbd5e1;font-weight:600;">' + esc(p.doc) + '</td>' +
                  '<td><span style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#34d399;">' + esc(p.vitals) + '</span></td>' +
                  '<td><span class="zch-badge ' + (p.status.includes('Critical') ? 'red' : p.status.includes('High') ? 'amber' : 'green') + '">' + esc(p.status) + '</span></td>' +
                  '<td><button class="zch-btn" onclick="alert(\'Discharge protocol initiated for ' + esc(p.pet) + '\')">Discharge</button></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 8: Clinic Doctors (Comprehensive & Dedicated) ────────── */
  function renderDoctors() {
    var search = (S.docSearch || '').toLowerCase().trim();
    var specialty = S.docSpecialty || 'ALL';
    var duty = S.docDuty || 'ALL';

    var filtered = DOCTORS.filter(function (d) {
      if (specialty !== 'ALL' && d.spec.toLowerCase().indexOf(specialty.toLowerCase()) === -1) return false;
      if (duty !== 'ALL' && d.status !== duty) return false;
      if (search) {
        var str = (d.name + ' ' + d.qual + ' ' + d.spec + ' ' + d.base + ' ' + d.vci).toLowerCase();
        if (str.indexOf(search) === -1) return false;
      }
      return true;
    });

    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Registered Veterinary Doctors', '28 Clinicians', '+4 YoY', 'up', '100% VCI licensed & verified', '👨‍⚕️'),
        kpiHtml('Specialist Surgeons', '12 Specialists', 'Diplomates', 'up', 'Ortho, Neuro, Trauma & Onco', '🔪'),
        kpiHtml('Clinicians On-Duty Now', '18 Doctors', 'Full Shift', 'up', 'All OPD & triage desks active', '⚡'),
        kpiHtml('In Surgery Right Now', '4 Surgeons', 'Live OTs', 'up', 'Tertiary modular theatres', '🩺'),
        kpiHtml('Doctor Patient CSAT', '4.95 ★', '+0.03', 'up', '3,850+ verified consultations', '⭐'),
        kpiHtml('Monthly Consultations', '4,850 Pets', '+15.2%', 'up', 'Network-wide patient volume', '🐾'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div>',
            '<h3 class="zch-card-title">Veterinary Medical Staff & Surgical Specialist Registry</h3>',
            '<p class="zch-card-sub">State Veterinary Council (VCI) registrations, hospital assignments, shift rosters, and surgical performance</p>',
          '</div>',
          '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">',
            '<button class="zch-btn" onclick="alert(\'Exporting weekly doctor duty roster...\')">📅 Export Shift Schedule</button>',
            '<button class="zch-btn primary" onclick="ZenveClinicsDashboard.showAddDoctorModal()">+ Register New Doctor</button>',
          '</div>',
        '</div>',

        '<div class="zch-filters">',
          '<input type="text" class="zch-input" style="min-width:240px;" placeholder="Search doctor, hospital, license, specialty..." value="' + esc(S.docSearch) + '" oninput="ZenveClinicsDashboard.filterDoctors(this.value, null, null)" />',
          '<select class="zch-select" onchange="ZenveClinicsDashboard.filterDoctors(null, this.value, null)">',
            '<option value="ALL"' + (specialty === 'ALL' ? ' selected' : '') + '>All Clinical Specialties</option>',
            '<option value="Orthopedic"' + (specialty === 'Orthopedic' ? ' selected' : '') + '>Orthopedics & TPLO</option>',
            '<option value="Neuro"' + (specialty === 'Neuro' ? ' selected' : '') + '>Neurosurgery</option>',
            '<option value="Oncology"' + (specialty === 'Oncology' ? ' selected' : '') + '>Veterinary Oncology</option>',
            '<option value="Internal"' + (specialty === 'Internal' ? ' selected' : '') + '>Internal Medicine</option>',
            '<option value="Feline"' + (specialty === 'Feline' ? ' selected' : '') + '>Feline Medicine</option>',
            '<option value="Emergency"' + (specialty === 'Emergency' ? ' selected' : '') + '>Critical Care & Emergency</option>',
            '<option value="Ophthalmology"' + (specialty === 'Ophthalmology' ? ' selected' : '') + '>Ophthalmology</option>',
          '</select>',
          '<select class="zch-select" onchange="ZenveClinicsDashboard.filterDoctors(null, null, this.value)">',
            '<option value="ALL"' + (duty === 'ALL' ? ' selected' : '') + '>All Duty Status</option>',
            '<option value="On Duty"' + (duty === 'On Duty' ? ' selected' : '') + '>On Duty</option>',
            '<option value="In Surgery"' + (duty === 'In Surgery' ? ' selected' : '') + '>In Surgery</option>',
            '<option value="On Call"' + (duty === 'On Call' ? ' selected' : '') + '>On Call Emergency</option>',
            '<option value="Off Duty"' + (duty === 'Off Duty' ? ' selected' : '') + '>Off Duty</option>',
          '</select>',
          '<span style="font-size:12px;color:#94a3b8;margin-left:auto;">Showing <b>' + filtered.length + '</b> of ' + DOCTORS.length + ' Clinicians</span>',
        '</div>',

        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead>',
              '<tr>',
                '<th>Doctor Name & Code</th>',
                '<th>Specialization & Degrees</th>',
                '<th>VCI License</th>',
                '<th>Hospital / Facility Base</th>',
                '<th>Current Duty Shift</th>',
                '<th style="text-align:right;">Consults</th>',
                '<th style="text-align:right;">Surgeries</th>',
                '<th style="text-align:right;">Client CSAT</th>',
                '<th>Status</th>',
                '<th style="text-align:center;">Action</th>',
              '</tr>',
            '</thead>',
            '<tbody>',
              filtered.length === 0
                ? '<tr><td colspan="10" style="text-align:center;padding:32px;color:#94a3b8;">No registered doctor records found</td></tr>'
                : filtered.map(function (d) {
                    var statusClass = d.status === 'On Duty' ? 'green' : d.status === 'In Surgery' ? 'red' : d.status === 'On Call' ? 'amber' : 'purple';
                    return '<tr>' +
                      '<td>' +
                        '<div style="display:flex;align-items:center;gap:10px;">' +
                          '<div style="width:32px;height:32px;border-radius:50%;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;">' + esc(d.name.split(' ').map(function(n){ return n[0]; }).join('').replace('D', '')) + '</div>' +
                          '<div>' +
                            '<b style="color:#fff;">' + esc(d.name) + '</b>' +
                            '<div style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#38bdf8;">' + esc(d.id) + '</div>' +
                          '</div>' +
                        '</div>' +
                      '</td>' +
                      '<td>' +
                        '<div style="font-weight:600;color:#60a5fa;">' + esc(d.spec) + '</div>' +
                        '<div style="font-size:11px;color:#94a3b8;">' + esc(d.qual) + '</div>' +
                      '</td>' +
                      '<td style="font-family:IBM Plex Mono,monospace;color:#c084fc;font-weight:600;">' + esc(d.vci) + '</td>' +
                      '<td><span class="zch-badge blue">' + esc(d.base) + '</span></td>' +
                      '<td><span style="color:#cbd5e1;font-size:11px;">' + esc(d.shift) + '</span></td>' +
                      '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(d.consults) + '</td>' +
                      '<td style="text-align:right;font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(d.surgeries) + '</td>' +
                      '<td style="text-align:right;color:#fbbf24;font-weight:700;">' + esc(d.csat) + '</td>' +
                      '<td><span class="zch-badge ' + statusClass + '">' + esc(d.status) + '</span></td>' +
                      '<td style="text-align:center;">' +
                        '<button class="zch-btn" onclick="ZenveClinicsDashboard.showDoctorBioModal(\'' + esc(d.id) + '\')">View Bio</button>' +
                      '</td>' +
                    '</tr>';
                  }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>',

      /* Surgical & Emergency On-Call Rostering Split */
      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">🚨 Emergency & 24x7 Night Trauma Roster</h3><p class="zch-card-sub">Immediate on-call coverage for critical emergency surgical interventions</p></div>',
            '<span class="zch-badge green">ACTIVE 24x7</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
                      '<div style="display:flex;flex-direction:column;gap:10px;">' +
            '<div style="background:#090e17;border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">' +
              '<div><b style="color:#fff;font-size:13px;">Dr. Vikramaditya Rathore</b> <span class="zch-badge red">Primary Trauma On-Call</span><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Bandra Trauma Centre • Cell: +91 98201 44102</div></div>' +
              '<span style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#38bdf8;font-weight:600;">Active 24x7</span>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">' +
              '<div><b style="color:#fff;font-size:13px;">Dr. Rohan Kulkarni</b> <span class="zch-badge blue">Critical Care & Vent</span><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Koregaon Park Hospital • Cell: +91 98450 88219</div></div>' +
              '<span style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#38bdf8;font-weight:600;">Active 24x7</span>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(168,85,247,0.2);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;">' +
              '<div><b style="color:#fff;font-size:13px;">Dr. Anirudh Sen</b> <span class="zch-badge purple">Emergency Spine Decompression</span><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Jubilee Hills Center • Cell: +91 99890 12055</div></div>' +
              '<span style="font-family:IBM Plex Mono,monospace;font-size:11px;color:#38bdf8;font-weight:600;">On-Call</span>' +
            '</div>' +
          '</div>' ,
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">📚 Continuing Veterinary Medical Education (CME)</h3><p class="zch-card-sub">Clinical accreditation status, surgical simulations, and peer case audits</p></div>',
            '<span class="zch-badge green">98.4% COMPLIANT</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;padding:4px 0;">',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Small Animal Arthroscopy & TPLO Hands-on</span><strong style="color:#38bdf8;">8/10 Surgeons Certified</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:80%;background:#38bdf8;"></div></div>',
            '</div>',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Feline Friendly Clinical Handling Protocol</span><strong style="color:#34d399;">10/10 Clinicians Completed</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:100%;background:#34d399;"></div></div>',
            '</div>',
            '<div>',
              '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;"><span>Antimicrobial Stewardship & Infection Control</span><strong style="color:#c084fc;">Annual Audit Score: 98.4%</strong></div>',
              '<div class="zch-progress-bar"><div class="zch-progress-fill" style="width:98.4%;background:#c084fc;"></div></div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 9: Clinic Commissions ────────────────────────────────── */
  function renderCommissions() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Total Partner Payouts', '₹5,48,225', '+14.5%', 'up', 'Net disbursed this month', '🤝'),
        kpiHtml('Referral Cases Handled', '190 Cases', '+24 MoM', 'up', 'Tertiary surgical referrals', '🔄'),
        kpiHtml('Average Commission Rate', '13.8%', 'Tiered', 'up', '10%–25% based on specialty', '📊'),
        kpiHtml('Statutory TDS Deducted', '₹60,912', '10% Sec 194J', 'up', 'Directly remitted to Traces', '🏛️'),
      '</div>',

      '<div class="zch-card">',
        '<div class="zch-card-head">',
          '<div><h3 class="zch-card-title">B2B Clinic Referrals & Visiting Specialist Settlements</h3><p class="zch-card-sub">Transparent revenue sharing, patient referral volume, 10% TDS withholding, and disbursement status</p></div>',
          '<button class="zch-btn primary" onclick="alert(\'Bulk NEFT Bank Transfer initiated for approved commissions!\')">Process Approved Payouts</button>',
        '</div>',
        '<div class="zch-table-wrap">',
          '<table class="zch-table">',
            '<thead><tr><th>Settlement ID</th><th>Partner Clinic / Consultant</th><th>Affiliation Type</th><th>Cases Referred</th><th>Total Case Value</th><th>Comm %</th><th>Gross Comm</th><th>10% TDS</th><th>Net Payable</th><th>Status</th></tr></thead>',
            '<tbody>',
              COMMISSIONS.map(function (c) {
                return '<tr>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;color:#38bdf8;">' + esc(c.id) + '</td>' +
                  '<td><b>' + esc(c.partner) + '</b></td>' +
                  '<td><span class="zch-badge blue">' + esc(c.type) + '</span></td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + c.cases + ' cases</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;">' + esc(c.val) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#38bdf8;">' + esc(c.rate) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:600;">' + esc(c.comm) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;color:#f87171;">' + esc(c.tds) + '</td>' +
                  '<td style="font-family:IBM Plex Mono,monospace;font-weight:700;color:#10b981;">' + esc(c.net) + '</td>' +
                  '<td><span class="zch-badge ' + (c.status === 'Paid' ? 'green' : c.status === 'Approved' ? 'blue' : 'amber') + '">' + esc(c.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Tab 10: Clinic Network ───────────────────────────────────── */
  function renderNetwork() {
    return [
      '<div class="zch-kpi-grid">',
        kpiHtml('Active Network Facilities', '10 Centers', '+3 pipeline', 'up', '5 Flagships + 5 Outpatient Clinics', '🌐'),
        kpiHtml('ALS Pet Ambulance Fleet', '6 Units', '100% Active', 'up', 'Mobile intensive care ICU', '🚑'),
        kpiHtml('Inter-Facility Transfers', '42 Transfers', '+18.2%', 'up', 'Clinic to Tertiary Hospital', '🔄'),
        kpiHtml('Avg Emergency Transit Time', '11.4 mins', '-2.1 mins', 'up', 'Fastest urban pet response', '⏱️'),
        kpiHtml('Cloud Tele-PACS Sync', '99.8%', 'Zero Latency', 'up', 'CT / X-ray multi-center access', '📶'),
        kpiHtml('Expansion Pipeline', '4 Hubs', 'Q1-Q2 2027', 'up', 'Kolkata, Ahmedabad, Kochi, Chd', '🏗️'),
      '</div>',

      '<div class="zch-grid-2">',
        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">Hub-and-Spoke Regional Corridors</h3><p class="zch-card-sub">Tertiary hubs anchor specialized neuro, ortho, and oncologic care</p></div>',
            '<span class="zch-badge green">99.8% TELEMED SYNC</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:12px;">',
                      '<div style="display:flex;flex-direction:column;gap:12px;">' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                '<b style="color:#fff;font-size:13px;">South Corridor (Bengaluru Metro Hub)</b>' +
                '<span class="zch-badge green">99.8% Sync</span>' +
              '</div>' +
              '<div style="font-size:12px;color:#94a3b8;">Indiranagar Central (Hub) ↔ Koramangala Care ↔ Whitefield Diagnostics</div>' +
              '<div style="font-size:11px;color:#38bdf8;margin-top:4px;">18 Inter-facility transfers • 2 Ambulances active</div>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                '<b style="color:#fff;font-size:13px;">West Corridor (Mumbai MMR Hub)</b>' +
                '<span class="zch-badge green">99.5% Sync</span>' +
              '</div>' +
              '<div style="font-size:12px;color:#94a3b8;">Bandra Trauma Centre (Hub) ↔ Andheri Link Rd ↔ Powai Satellite</div>' +
              '<div style="font-size:11px;color:#38bdf8;margin-top:4px;">12 Inter-facility transfers • 1 Ambulance active</div>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                '<b style="color:#fff;font-size:13px;">North Corridor (Delhi NCR Hub)</b>' +
                '<span class="zch-badge green">99.9% Sync</span>' +
              '</div>' +
              '<div style="font-size:12px;color:#94a3b8;">DLF CyberCity (Hub) ↔ Saket Diagnostics ↔ Noida Care Unit</div>' +
              '<div style="font-size:11px;color:#38bdf8;margin-top:4px;">10 Inter-facility transfers • 1 Ambulance active</div>' +
            '</div>' +
            '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                '<b style="color:#fff;font-size:13px;">Deccan Corridor (Hyderabad Hub)</b>' +
                '<span class="zch-badge green">99.2% Sync</span>' +
              '</div>' +
              '<div style="font-size:12px;color:#94a3b8;">Jubilee Hills Center (Hub) ↔ Gachibowli Daycare & Dental</div>' +
              '<div style="font-size:11px;color:#38bdf8;margin-top:4px;">8 Inter-facility transfers • 1 Ambulance active</div>' +
            '</div>' +
          '</div>' ,
          '</div>',
        '</div>',

        '<div class="zch-card">',
          '<div class="zch-card-head">',
            '<div><h3 class="zch-card-title">24x7 ALS Mobile ICU Pet Ambulances</h3><p class="zch-card-sub">GPS tracked veterinary emergency response units</p></div>',
            '<span class="zch-badge red">6 UNITS LIVE</span>',
          '</div>',
          '<div style="display:flex;flex-direction:column;gap:10px;">',
            (AMBULANCE_FLEET.length ? AMBULANCE_FLEET.map(function (amb) {
              return '<div style="background:#090e17;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">' +
                  '<div><b style="color:#fff;font-size:13px;">🚑 ' + esc(amb.vehicle) + '</b> <span style="font-family:IBM Plex Mono,monospace;font-size:10px;color:#64748b;">(' + esc(amb.id) + ')</span></div>' +
                  '<span class="zch-badge ' + (amb.status.includes('Transit') || amb.status.includes('Emergency') || amb.status.includes('Dispatched') ? 'red' : 'green') + '">' + esc(amb.status) + '</span>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-bottom:4px;">' +
                  '<span>Base: <strong style="color:#cbd5e1;">' + esc(amb.base) + '</strong></span>' +
                  '<span>Crew: <strong style="color:#cbd5e1;">' + esc(amb.medic) + '</strong></span>' +
                '</div>' +
                '<div style="font-size:10px;color:#64748b;margin-bottom:6px;">Equipment: ' + esc(amb.equipment) + '</div>' +
                '<div style="display:flex;justify-content:space-between;background:rgba(255,255,255,0.02);padding:4px 8px;border-radius:4px;font-size:11px;">' +
                  '<span style="color:#94a3b8;">ETA to destination:</span>' +
                  '<span style="color:#38bdf8;font-weight:700;font-family:IBM Plex Mono,monospace;">' + esc(amb.eta) + '</span>' +
                '</div>' +
              '</div>';
            }).join('') : '<div style="text-align:center;padding:32px;color:#94a3b8;font-size:12px;">No active ambulance units</div>'),
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Master Render Function with Dynamic Header Updates ───────── */
  function render() {
    if (!root) return;

    var activeTab = TABS.find(function (t) { return t.id === S.tab; }) || TABS[0];

    // Update Header Content Dynamically
    var titleEl = root.querySelector('.zch-title');
    if (titleEl) titleEl.textContent = activeTab.title || activeTab.label;

    var subEl = root.querySelector('.zch-sub');
    if (subEl) subEl.textContent = activeTab.sub || '';

    var badgeEl = root.querySelector('.zch-live-badge');
    if (badgeEl) {
      badgeEl.innerHTML = '<span class="zch-pulse-dot"></span> ' + esc(activeTab.badge || 'Active');
    }

    // Contextual Action Button in Header
    var actionBtn = root.querySelector('.zch-context-action');
    if (actionBtn) {
      if (S.tab === 'doctors') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Register Doctor';
        actionBtn.onclick = function() { ZenveClinicsDashboard.showAddDoctorModal(); };
      } else if (S.tab === 'all-clinics' || S.tab === 'dashboard') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Add Facility';
        actionBtn.onclick = function() { ZenveClinicsDashboard.showNewClinicModal(); };
      } else if (S.tab === 'orders') {
        actionBtn.style.display = 'inline-flex';
        actionBtn.textContent = '+ Create PO';
        actionBtn.onclick = function() { ZenveClinicsDashboard.showNewOrderModal(); };
      } else {
        actionBtn.style.display = 'none';
      }
    }

    // Render Tabs Bar
    var tabsBar = root.querySelector('.zch-tabs-bar');
    if (tabsBar) {
      tabsBar.innerHTML = TABS.map(function (t) {
        var isActive = t.id === S.tab;
        return [
          '<button class="zch-tab ' + (isActive ? 'active' : '') + '" onclick="ZenveClinicsDashboard.switchTab(\'' + t.id + '\')">',
            '<span>' + t.icon + '</span>',
            '<span>' + esc(t.label) + '</span>',
            t.badge ? '<span class="zch-tab-badge ' + (t.warnBadge ? 'warn' : '') + '">' + esc(t.badge) + '</span>' : '',
          '</button>'
        ].join('');
      }).join('');
    }

    // Render Content Area
    var body = root.querySelector('.zch-body');
    if (body) {
      switch (S.tab) {
        case 'dashboard': body.innerHTML = renderDashboard(); break;
        case 'all-clinics': body.innerHTML = renderAllClinics(); break;
        case 'hospitals': body.innerHTML = renderHospitals(); break;
        case 'performance': body.innerHTML = renderPerformance(); break;
        case 'revenue': body.innerHTML = renderRevenue(); break;
        case 'orders': body.innerHTML = renderOrders(); break;
        case 'patients': body.innerHTML = renderPatients(); break;
        case 'doctors': body.innerHTML = renderDoctors(); break;
        case 'commissions': body.innerHTML = renderCommissions(); break;
        case 'network': body.innerHTML = renderNetwork(); break;
        default: body.innerHTML = renderDashboard(); break;
      }
    }
  }

  /* ── Build Shell ──────────────────────────────────────────────── */
  function build() {
    if (root) return;
    root = document.createElement('div');
    root.id = 'zch-root';
    root.innerHTML = [
      '<header class="zch-head">',
        '<div class="zch-head-left">',
          '<div class="zch-title-row">',
            '<h1 class="zch-title">Clinics Dashboard</h1>',
            '<span class="zch-live-badge"><span class="zch-pulse-dot"></span> Active</span>',
          '</div>',
          '<p class="zch-sub">Veterinary Hospitals & Clinics Command Center</p>',
        '</div>',
        '<div class="zch-head-actions">',
          '<button class="zch-btn" onclick="alert(\'Refreshing live clinical census...\')">🔄 Refresh Vitals</button>',
          '<button class="zch-btn primary zch-context-action">+ Add Facility</button>',
        '</div>',
      '</header>',
      '<nav class="zch-tabs-bar" aria-label="Clinics & Hospitals Subdomains"></nav>',
      '<div class="zch-body"></div>'
    ].join('');
    document.body.appendChild(root);
  }

  /* ── Open / Close / Switch ────────────────────────────────────── */
  function open(tab) {
    // Close other domain overlays cleanly
    if (window.ZenveSalesDashboard && typeof window.ZenveSalesDashboard.close === 'function') {
      try { window.ZenveSalesDashboard.close(); } catch (e) {}
    }
    if (window.ZenveOperationsDashboard && typeof window.ZenveOperationsDashboard.close === 'function') {
      try { window.ZenveOperationsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveProductsInventory && typeof window.ZenveProductsInventory.close === 'function') {
      try { window.ZenveProductsInventory.close(); } catch (e) {}
    }
    if (window.ZenvePharmacyDashboard && typeof window.ZenvePharmacyDashboard.close === 'function') {
      try { window.ZenvePharmacyDashboard.close(); } catch (e) {}
    }
    if (window.ZenveReportsDashboard && typeof window.ZenveReportsDashboard.close === 'function') {
      try { window.ZenveReportsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveAlertsDashboard && typeof window.ZenveAlertsDashboard.close === 'function') {
      try { window.ZenveAlertsDashboard.close(); } catch (e) {}
    }
    if (window.ZenveFinanceDashboard && typeof window.ZenveFinanceDashboard.close === 'function') {
      try { window.ZenveFinanceDashboard.close(); } catch (e) {}
    }
    if (window.ZenveSettingsDashboard && typeof window.ZenveSettingsDashboard.close === 'function') {
      try { window.ZenveSettingsDashboard.close(); } catch (e) {}
    }

    document.querySelectorAll('.zpanel-root, [id$="-root"]').forEach(function (el) {
      if (el.id !== 'zch-root') el.classList.remove('zpanel-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zrep-open', 'zalt-open', 'zset-open', 'zfa-open');
    });

    // Dismiss any Radix placeholder dialog
    try {
      document.querySelectorAll('[role="dialog"]').forEach(function (d) {
        if (d.closest('#zch-root')) return;
        var btn = d.querySelector('button[aria-label*="close" i], button:last-child');
        if (btn) btn.click();
      });
    } catch (e) {}

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'dashboard';
    }

    build();
    S.open = true;
    root.classList.add('zch-open');
    render();

    var targetHash = TABS.find(function (t) { return t.id === S.tab; })?.hash;
    if (targetHash && location.hash !== targetHash) {
      try { history.replaceState(null, '', targetHash); } catch (e) {}
    }
  }

  function close() {
    S.open = false;
    if (root) root.classList.remove('zch-open');
    if (TABS.some(function (t) { return t.hash === location.hash; })) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }
  }

  function switchTab(tabId) {
    if (!TABS.some(function (t) { return t.id === tabId; })) return;
    S.tab = tabId;
    render();
    var t = TABS.find(function (it) { return it.id === tabId; });
    if (t && t.hash) {
      try { history.replaceState(null, '', t.hash); } catch (e) {}
    }
  }

  function filterDoctors(search, specialty, duty) {
    if (search !== null && search !== undefined) S.docSearch = search;
    if (specialty !== null && specialty !== undefined) S.docSpecialty = specialty;
    if (duty !== null && duty !== undefined) S.docDuty = duty;
    var body = root ? root.querySelector('.zch-body') : null;
    if (body && S.tab === 'doctors') {
      body.innerHTML = renderDoctors();
    }
  }

  /* ── Interactive Modals ────────────────────────────────────────── */
  function showDoctorBioModal(docId) {
    var d = DOCTORS.find(function (it) { return it.id === docId; });
    if (!d) return;
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-doc-bio-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<div style="display:flex;align-items:center;gap:12px;">',
              '<div style="width:40px;height:40px;border-radius:50%;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">👨‍⚕️</div>',
              '<div>',
                '<h3 class="zch-modal-title">' + esc(d.name) + '</h3>',
                '<span style="font-size:11px;color:#94a3b8;font-family:IBM Plex Mono,monospace;">' + esc(d.id) + ' • ' + esc(d.vci) + '</span>',
              '</div>',
            '</div>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-bio-modal\').remove()">✕</button>',
          '</div>',
          '<div class="zch-modal-body">',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:rgba(255,255,255,0.02);padding:14px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);font-size:12px;">',
              '<div><span style="color:#64748b;">Clinical Specialization:</span><div style="font-weight:600;color:#38bdf8;">' + esc(d.spec) + '</div></div>',
              '<div><span style="color:#64748b;">Primary Facility Base:</span><div style="font-weight:600;color:#fff;">' + esc(d.base) + '</div></div>',
              '<div><span style="color:#64748b;">Degrees & Credentials:</span><div style="color:#cbd5e1;">' + esc(d.qual) + '</div></div>',
              '<div><span style="color:#64748b;">Current Active Shift:</span><div style="color:#10b981;font-weight:600;">' + esc(d.shift) + '</div></div>',
              '<div><span style="color:#64748b;">Lifetime Consultations:</span><div style="font-weight:700;font-family:IBM Plex Mono,monospace;">' + esc(d.consults) + ' Patients</div></div>',
              '<div><span style="color:#64748b;">Surgical Procedures:</span><div style="font-weight:700;font-family:IBM Plex Mono,monospace;color:#10b981;">' + esc(d.surgeries) + ' OTs</div></div>',
            '</div>',
            '<div>',
              '<h4 style="margin:0 0 6px;font-size:13px;color:#f8fafc;">Clinical Bio & Expertise</h4>',
              '<p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">' + esc(d.bio) + '</p>',
            '</div>',
            '<div style="display:flex;justify-content:space-between;align-items:center;background:rgba(251,191,36,0.1);padding:10px 14px;border-radius:8px;border:1px solid rgba(251,191,36,0.25);">',
              '<span style="font-size:12px;color:#cbd5e1;">Verified Patient Satisfaction (CSAT):</span>',
              '<span style="font-size:14px;font-weight:700;color:#fbbf24;">' + esc(d.csat) + ' (99.4% Positive Feedback)</span>',
            '</div>',
          '</div>',
          '<div class="zch-modal-foot">',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-bio-modal\').remove()">Close</button>',
            '<button type="button" class="zch-btn primary" onclick="alert(\'Roster modification requested for ' + esc(d.name) + '\')">Modify Shift Assignment</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function showNewClinicModal() {
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-clinic-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<h3 class="zch-modal-title">Register New Facility in Zenve Network</h3>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-clinic-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zch-add-clinic-form" class="zch-modal-body">',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Facility Commercial Name</label><input required class="zch-input" style="width:100%;" id="clinic-name" placeholder="e.g. Zenve Care Center Whitefield" /></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">City Cluster</label><select class="zch-select" style="width:100%;" id="clinic-city"><option>Bengaluru</option><option>Mumbai</option><option>Delhi NCR</option><option>Hyderabad</option><option>Pune</option></select></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Facility Tier</label><select class="zch-select" style="width:100%;" id="clinic-tier"><option>Primary OPD & Diagnostics</option><option>Secondary Care Clinic</option><option>Tertiary 24x7 Hospital</option></select></div>',
            '</div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Inpatient Beds</label><input class="zch-input" style="width:100%;" id="clinic-beds" placeholder="e.g. 6 Daycare Bays" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">OT Specification</label><input class="zch-input" style="width:100%;" id="clinic-ot" placeholder="e.g. Minor Surgical Suite" /></div>',
            '</div>',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Lead Attending Veterinarian</label><input required class="zch-input" style="width:100%;" id="clinic-lead" placeholder="e.g. Dr. Sneha Nair, BVSc" /></div>',
            '<div class="zch-modal-foot">',
              '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-clinic-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zch-btn primary">Commission Facility</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zch-add-clinic-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('clinic-name').value;
        var city = document.getElementById('clinic-city').value;
        var tier = document.getElementById('clinic-tier').value;
        var beds = document.getElementById('clinic-beds').value || '4 Pods';
        var ot = document.getElementById('clinic-ot').value || 'Minor OT';
        var lead = document.getElementById('clinic-lead').value;

        FACILITIES.push({
          id: 'FAC-0' + (FACILITIES.length + 1),
          name: name,
          type: tier,
          city: city,
          beds: beds,
          ot: ot,
          rev: '₹1.50 L',
          status: 'Operational',
          lead: lead
        });

        document.getElementById('zch-clinic-modal').remove();
        render();
        alert('Facility ' + name + ' registered successfully in ' + city + '!');
      };
    }
  }

  function showNewOrderModal() {
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-order-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<h3 class="zch-modal-title">Create Clinical Supply Requisition</h3>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-order-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zch-add-order-form" class="zch-modal-body">',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Target Healthcare Facility</label><select class="zch-select" style="width:100%;" id="order-fac">' +
              FACILITIES.map(function(f){ return '<option>' + esc(f.name) + '</option>'; }).join('') +
            '</select></div>',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Item Description (Implants, Gases, Consumables)</label><input required class="zch-input" style="width:100%;" id="order-item" placeholder="e.g. Titanium Locking Screws 3.5mm" /></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Vendor</label><input required class="zch-input" style="width:100%;" id="order-vendor" placeholder="e.g. Synthes Vet India" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Quantity</label><input required class="zch-input" style="width:100%;" id="order-qty" placeholder="e.g. 10 Kits" /></div>',
            '</div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Estimated Value (₹)</label><input type="number" required class="zch-input" style="width:100%;" id="order-val" placeholder="45000" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Priority</label><select class="zch-select" style="width:100%;" id="order-priority"><option>High</option><option>Critical</option><option>Routine</option></select></div>',
            '</div>',
            '<div class="zch-modal-foot">',
              '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-order-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zch-btn primary">Issue Requisition PO</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zch-add-order-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var fac = document.getElementById('order-fac').value;
        var item = document.getElementById('order-item').value;
        var vendor = document.getElementById('order-vendor').value;
        var qty = document.getElementById('order-qty').value;
        var val = Number(document.getElementById('order-val').value) || 25000;
        var prio = document.getElementById('order-priority').value;

        CLINIC_ORDERS.unshift({
          po: 'PO-CLIN-40' + (CLINIC_ORDERS.length + 80),
          facility: fac,
          item: item,
          vendor: vendor,
          qty: qty,
          cost: '₹' + val.toLocaleString('en-IN'),
          status: 'Pending Approval',
          priority: prio
        });

        document.getElementById('zch-order-modal').remove();
        render();
        alert('Requisition issued for ' + item + ' (' + fac + ')');
      };
    }
  }

  function showAddDoctorModal() {
    var modalHtml = [
      '<div class="zch-modal-backdrop" id="zch-doc-modal">',
        '<div class="zch-modal">',
          '<div class="zch-modal-head">',
            '<h3 class="zch-modal-title">Register Veterinary Clinician / Surgeon</h3>',
            '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-modal\').remove()">✕</button>',
          '</div>',
          '<form id="zch-add-doc-form" class="zch-modal-body">',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Doctor Full Name</label><input required class="zch-input" style="width:100%;" id="doc-name" placeholder="e.g. Dr. Siddharth Roy" /></div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Degrees & Qualifications</label><input required class="zch-input" style="width:100%;" id="doc-qual" placeholder="e.g. B.V.Sc & A.H, M.V.Sc (Vet Surgery)" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">VCI License No.</label><input required class="zch-input" style="width:100%;" id="doc-vci" placeholder="e.g. VCI-KAR-2021-512" /></div>',
            '</div>',
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Clinical Specialty</label><input required class="zch-input" style="width:100%;" id="doc-spec" placeholder="e.g. Orthopedic Surgery & TPLO" /></div>',
              '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Hospital Base</label><select class="zch-select" style="width:100%;" id="doc-base">' +
                FACILITIES.map(function(f){ return '<option>' + esc(f.name) + '</option>'; }).join('') +
              '</select></div>',
            '</div>',
            '<div><label style="display:block;color:#94a3b8;font-size:12px;margin-bottom:4px;">Clinical Biography / Special Achievements</label><textarea class="zch-input" style="width:100%;height:60px;" id="doc-bio" placeholder="e.g. Gold medalist surgeon with extensive experience in small animal soft-tissue surgery..."></textarea></div>',
            '<div class="zch-modal-foot">',
              '<button type="button" class="zch-btn" onclick="document.getElementById(\'zch-doc-modal\').remove()">Cancel</button>',
              '<button type="submit" class="zch-btn primary">Add to Clinical Roster</button>',
            '</div>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    var form = document.getElementById('zch-add-doc-form');
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var name = document.getElementById('doc-name').value;
        var qual = document.getElementById('doc-qual').value;
        var vci = document.getElementById('doc-vci').value;
        var spec = document.getElementById('doc-spec').value;
        var base = document.getElementById('doc-base').value;
        var bio = document.getElementById('doc-bio').value || 'Registered veterinarian practicing small animal medicine.';

        DOCTORS.unshift({
          id: 'DOC-0' + (DOCTORS.length + 1),
          name: name,
          qual: qual,
          vci: vci,
          spec: spec,
          base: base,
          shift: 'Morning (08:00 – 16:00)',
          csat: '5.00 ★',
          consults: 0,
          surgeries: 0,
          status: 'On Duty',
          bio: bio
        });

        document.getElementById('zch-doc-modal').remove();
        render();
        alert('Clinician ' + name + ' registered in roster!');
      };
    }
  }

  /* ── Hash-change listener ─────────────────────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      if (!S.open) open(tab);
      else switchTab(tab);
    } else if (S.open) {
      close();
    }
  });

  /* ── Check initial hash on load ───────────────────────────────── */
  var initialTab = tabFromHash(location.hash);
  if (initialTab) {
    var go = function () { setTimeout(function () { open(initialTab); }, 400); };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go);
  }

  /* ── Global Click Interception & Wire Sidebar ─────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Never intercept accordion group toggles or search bar
    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        if (!t.closest('#zch-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
          return;
        }
      }
    }

    if (S.open) {
      if (t.closest('#zch-root')) return;
      var b = t.closest('.sidebar-scope button, .sidebar-scope a, nav button, nav a, aside button, aside a');
      if (!b) return;
      if (b.getAttribute('aria-label') === 'Search menu') return;
      if (b.getAttribute('aria-expanded') !== null) return;
      if (b.textContent && tabFromText(b.textContent.trim())) return;

      close();
    }
  }, true);

  document.addEventListener('pointerdown', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('.sidebar-scope li button, .sidebar-scope li a, nav li button, nav li a');
    if (item && item.textContent) {
      var tab = tabFromText(item.textContent.trim());
      if (tab) {
        e.stopPropagation();
      }
    }
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && S.open) {
      close();
    }
  });

  /* ── Hashchange Listener ───────────────────────────────────────── */
  window.addEventListener('hashchange', function () {
    var tab = tabFromHash(location.hash);
    if (tab) {
      open(tab);
    } else if (S.open && location.hash && !location.hash.startsWith('#clinic') && !location.hash.startsWith('#all-clinic') && !location.hash.startsWith('#hospital')) {
      close();
    }
  });

  function wireSidebar() {
    document.querySelectorAll(
      '.sidebar-scope li button, .sidebar-scope li a, ' +
      '[data-sidebar] li button, [data-sidebar] li a, nav li button, nav li a'
    ).forEach(function (btn) {
      if (btn.getAttribute('aria-expanded') !== null || btn.closest('[aria-expanded]') || btn.closest('button[aria-expanded]')) return;
      if (btn._zchWired) return;
      btn._zchWired = true;
      btn.addEventListener('click', function (e) {
        if (btn.getAttribute('aria-expanded') !== null || btn.closest('[aria-expanded]') || btn.closest('button[aria-expanded]')) return;
        var tab = tabFromText(btn.textContent ? btn.textContent.trim() : '');
        if (tab) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(tab);
        }
      }, true);
    });
    setTimeout(wireSidebar, 1500);
  }

  /* ── Public API ───────────────────────────────────────────────── */
  window.ZenveClinicsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    filterDoctors: filterDoctors,
    showNewClinicModal: showNewClinicModal,
    showNewOrderModal: showNewOrderModal,
    showAddDoctorModal: showAddDoctorModal,
    showDoctorBioModal: showDoctorBioModal
  };

  /* ── Boot ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); wireSidebar(); });
  } else {
    build();
    wireSidebar();
  }

})();