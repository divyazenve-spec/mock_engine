/* =====================================================================
   Zenve BI — Doctors & Clinical Medical Board Executive Control Center
   Suite (9 Subdomains):
     1. Doctors Dashboard     (#doctors-dashboard / #doctors)
     2. All Doctors           (#all-doctors)
     3. Doctor Performance    (#doctor-performance)
     4. Doctor Revenue        (#doctor-revenue)
     5. Doctor Patients       (#doctor-patients)
     6. Doctor Orders         (#doctor-orders)
     7. Doctor Commissions    (#doctor-commissions)
     8. Doctor Activity       (#doctor-activity)
     9. Doctor Network        (#doctor-network)
   ===================================================================== */

(function () {
  'use strict';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 9 Subdomains Configuration ─────────────────────────────────── */
  var TABS = [
    { id: 'dashboard',   label: 'Doctors Dashboard',  icon: '👨‍⚕️', hash: '#doctors-dashboard',   badge: '',   title: 'Veterinary Medical Board & Practitioners', sub: 'Clinical quotas, consultation volumes, physician performance, and departmental economics' },
    { id: 'all-doctors', label: 'All Doctors',        icon: '📋', hash: '#all-doctors',         badge: '',   title: 'All Registered Veterinary Practitioners', sub: 'Complete clinical directory, state veterinary board licensing, and center affiliations' },
    { id: 'performance', label: 'Doctor Performance', icon: '⭐', hash: '#doctor-performance',  badge: '',   title: 'Doctor Clinical Performance & Quota Attainment', sub: 'Physician consultation pacing, patient NPS ratings, wait-time SLA, and surgical outcomes' },
    { id: 'revenue',     label: 'Doctor Revenue',     icon: '💰', hash: '#doctor-revenue',      badge: '',   title: 'Doctor Revenue & Financial Attribution', sub: 'Consultation fee realization, surgical billing shares, and prescription attach revenue' },
    { id: 'patients',    label: 'Doctor Patients',    icon: '🐾', hash: '#doctor-patients',     badge: '',  title: 'Doctor Patients & Treatment Logs', sub: 'Active patient caseloads, clinical case histories, diagnoses, and scheduled follow-ups' },
    { id: 'orders',      label: 'Doctor Orders',      icon: '📦', hash: '#doctor-orders',       badge: '', title: 'Doctor Prescriptions & Pharmacy Order Tracking', sub: 'In-house digital Rx dispensary, surgical consumables requisitions, and formulary adherence' },
    { id: 'commissions', label: 'Doctor Commissions', icon: '💵', hash: '#doctor-commissions',  badge: '',  title: 'Doctor Commissions & Compensation Settlement', sub: 'Bi-weekly incentive disbursements, surgical bonus slabs, and statutory TDS deduction ledgers' },
    { id: 'activity',    label: 'Doctor Activity',    icon: '⚡', hash: '#doctor-activity',     badge: '',  title: 'Doctor Real-Time Activity & Shift Telemetry', sub: 'Real-time OT monitoring, ongoing outpatient consults, and emergency duty rosters' },
    { id: 'network',     label: 'Doctor Network',     icon: '🌐', hash: '#doctor-network',      badge: '',       title: 'Doctor Network & Hospital Affiliations', sub: 'Hospital staffing distributions, inter-facility specialty referrals, and bed utilization' }
  ];

    /* ── Master Datasets ─────────────────────────────────────────────── */
  var DOCTORS = [
    { id: 'DOC-2026-01', name: 'Dr. Rajeshwari Swaminathan', spec: 'Orthopedic Surgery & TPLO', qual: 'BVSc & AH, MVSc (Surgery), Dipl. ACVS', exp: '15 Yrs', vci: 'KVC-90214-A', clinic: 'Indiranagar Central Hospital', days: 'Mon, Wed, Fri', patientsMtd: 142, revMtd: '₹18.40 L', comm: '₹2.76 L', rating: '4.9', status: 'On Duty' },
    { id: 'DOC-2026-02', name: 'Dr. Vikramaditya Rathore', spec: 'Emergency & Critical Care', qual: 'BVSc & AH, MVSc, FCCM Fellow', exp: '13 Yrs', vci: 'MVC-81492-B', clinic: 'Bandra Trauma Centre', days: 'Tue, Thu, Sat', patientsMtd: 138, revMtd: '₹16.90 L', comm: '₹2.53 L', rating: '4.9', status: 'In Surgery' },
    { id: 'DOC-2026-03', name: 'Dr. Pooja Mehta', spec: 'Feline Medicine & Nephrology', qual: 'BVSc & AH, MVSc, ISFM AdvCert', exp: '11 Yrs', vci: 'MVC-78931-F', clinic: 'Bandra Trauma Centre', days: 'Mon, Tue, Thu, Sat', patientsMtd: 156, revMtd: '₹14.25 L', comm: '₹2.13 L', rating: '5.0', status: 'On Duty' },
    { id: 'DOC-2026-04', name: 'Dr. Anirudh Sen', spec: 'General Surgery & Laparoscopy', qual: 'BVSc & AH, MVSc (Surgery)', exp: '14 Yrs', vci: 'TSVC-64210-S', clinic: 'Jubilee Hills Center', days: 'Mon to Fri', patientsMtd: 148, revMtd: '₹15.10 L', comm: '₹2.26 L', rating: '4.8', status: 'On Duty' },
    { id: 'DOC-2026-05', name: 'Dr. Siddharth Verma', spec: 'Cardiology & Echocardiography', qual: 'BVSc & AH, MVSc, Dip. ECVIM-CA', exp: '12 Yrs', vci: 'DVC-51982-C', clinic: 'DLF CyberCity Hospital', days: 'Tue, Wed, Fri, Sat', patientsMtd: 124, revMtd: '₹13.80 L', comm: '₹2.07 L', rating: '4.9', status: 'On Call' },
    { id: 'DOC-2026-06', name: 'Dr. Rohan Kulkarni', spec: 'Surgical Oncology & Soft Tissue', qual: 'BVSc & AH, MVSc, F.Surg.Onc', exp: '10 Yrs', vci: 'MVC-94511-O', clinic: 'Koregaon Park Hospital', days: 'Mon, Wed, Thu, Sat', patientsMtd: 118, revMtd: '₹12.60 L', comm: '₹1.89 L', rating: '4.8', status: 'In Surgery' },
    { id: 'DOC-2026-07', name: 'Dr. Gaurav Sharma', spec: 'Spine Neurosurgery & Trauma', qual: 'BVSc & AH, MVSc, AOVET Spine', exp: '9 Yrs', vci: 'DVC-73204-N', clinic: 'DLF CyberCity Hospital', days: 'Mon, Tue, Thu, Fri', patientsMtd: 132, revMtd: '₹13.40 L', comm: '₹2.01 L', rating: '4.9', status: 'On Duty' },
    { id: 'DOC-2026-08', name: 'Dr. Sneha Nair', spec: 'Ophthalmology & Microsurgery', qual: 'BVSc & AH, MVSc, Cert. Vet. Ophthal', exp: '8 Yrs', vci: 'KVC-88741-E', clinic: 'Indiranagar Central Hospital', days: 'Wed to Sun', patientsMtd: 126, revMtd: '₹10.90 L', comm: '₹1.63 L', rating: '4.9', status: 'On Duty' },
    { id: 'DOC-2026-09', name: 'Dr. Divya Reddy', spec: 'Critical Care & Neonatology', qual: 'BVSc & AH, MVSc, VECCS Fellow', exp: '7 Yrs', vci: 'TSVC-91230-P', clinic: 'Jubilee Hills Center', days: 'Mon, Tue, Wed, Fri', patientsMtd: 140, revMtd: '₹11.85 L', comm: '₹1.77 L', rating: '4.8', status: 'On Duty' },
    { id: 'DOC-2026-10', name: 'Dr. Maya Chandran', spec: 'Gastroenterology & Endoscopy', qual: 'BVSc & AH, MVSc, SA Gastro Fellow', exp: '11 Yrs', vci: 'KVC-75412-G', clinic: 'Koramangala Care Clinic', days: 'Mon to Fri', patientsMtd: 152, revMtd: '₹13.60 L', comm: '₹2.04 L', rating: '4.9', status: 'On Duty' }
  ];

  var PERFORMANCE = [
    { name: 'Dr. Rajeshwari Swaminathan', spec: 'Orthopedic Surgery & TPLO', target: 130, actual: 142, attainment: '109.2%', nps: '94.2', waitTime: '5.2 mins', success: '99.6%', grade: 'A+' },
    { name: 'Dr. Vikramaditya Rathore', spec: 'Emergency & Critical Care', target: 125, actual: 138, attainment: '110.4%', nps: '92.8', waitTime: '4.8 mins', success: '99.2%', grade: 'A+' },
    { name: 'Dr. Pooja Mehta', spec: 'Feline Medicine & Nephrology', target: 140, actual: 156, attainment: '111.4%', nps: '96.5', waitTime: '6.1 mins', success: '100.0%', grade: 'A+' },
    { name: 'Dr. Anirudh Sen', spec: 'General Surgery & Laparoscopy', target: 135, actual: 148, attainment: '109.6%', nps: '90.4', waitTime: '5.9 mins', success: '99.1%', grade: 'A+' },
    { name: 'Dr. Siddharth Verma', spec: 'Cardiology & Echocardiography', target: 115, actual: 124, attainment: '107.8%', nps: '93.6', waitTime: '6.8 mins', success: '99.5%', grade: 'A+' },
    { name: 'Dr. Rohan Kulkarni', spec: 'Surgical Oncology & Soft Tissue', target: 110, actual: 118, attainment: '107.3%', nps: '89.9', waitTime: '7.1 mins', success: '98.9%', grade: 'A' },
    { name: 'Dr. Gaurav Sharma', spec: 'Spine Neurosurgery & Trauma', target: 120, actual: 132, attainment: '110.0%', nps: '91.5', waitTime: '5.5 mins', success: '99.3%', grade: 'A+' },
    { name: 'Dr. Sneha Nair', spec: 'Ophthalmology & Microsurgery', target: 115, actual: 126, attainment: '109.5%', nps: '93.1', waitTime: '6.0 mins', success: '99.5%', grade: 'A+' },
    { name: 'Dr. Divya Reddy', spec: 'Critical Care & Neonatology', target: 125, actual: 140, attainment: '112.0%', nps: '92.4', waitTime: '5.1 mins', success: '99.0%', grade: 'A+' },
    { name: 'Dr. Maya Chandran', spec: 'Gastroenterology & Endoscopy', target: 135, actual: 152, attainment: '112.6%', nps: '94.8', waitTime: '5.6 mins', success: '99.4%', grade: 'A+' }
  ];

  var REVENUE_STREAMS = [
    { doctor: 'Dr. Rajeshwari Swaminathan', spec: 'Orthopedics & Surgery', consultsRev: '₹2.84 L', procRev: '₹11.20 L', medsRev: '₹4.36 L', totalRev: '₹18.40 L', margin: '68%', share: '15.6%' },
    { doctor: 'Dr. Vikramaditya Rathore', spec: 'Trauma & Critical Care', consultsRev: '₹2.48 L', procRev: '₹10.60 L', medsRev: '₹3.82 L', totalRev: '₹16.90 L', margin: '66%', share: '14.3%' },
    { doctor: 'Dr. Pooja Mehta', spec: 'Feline Medicine', consultsRev: '₹3.12 L', procRev: '₹6.85 L', medsRev: '₹4.28 L', totalRev: '₹14.25 L', margin: '71%', share: '12.1%' },
    { doctor: 'Dr. Anirudh Sen', spec: 'General Surgery', consultsRev: '₹2.66 L', procRev: '₹9.14 L', medsRev: '₹3.30 L', totalRev: '₹15.10 L', margin: '69%', share: '12.8%' },
    { doctor: 'Dr. Siddharth Verma', spec: 'Cardiology', consultsRev: '₹2.72 L', procRev: '₹7.88 L', medsRev: '₹3.20 L', totalRev: '₹13.80 L', margin: '73%', share: '11.7%' },
    { doctor: 'Dr. Rohan Kulkarni', spec: 'Surgical Oncology', consultsRev: '₹2.12 L', procRev: '₹7.96 L', medsRev: '₹2.52 L', totalRev: '₹12.60 L', margin: '67%', share: '10.7%' },
    { doctor: 'Dr. Gaurav Sharma', spec: 'Spine Neurosurgery', consultsRev: '₹2.38 L', procRev: '₹8.44 L', medsRev: '₹2.58 L', totalRev: '₹13.40 L', margin: '70%', share: '11.4%' },
    { doctor: 'Dr. Sneha Nair', spec: 'Ophthalmology', consultsRev: '₹2.27 L', procRev: '₹6.18 L', medsRev: '₹2.45 L', totalRev: '₹10.90 L', margin: '74%', share: '9.2%' },
    { doctor: 'Dr. Divya Reddy', spec: 'Critical Care', consultsRev: '₹2.52 L', procRev: '₹6.45 L', medsRev: '₹2.88 L', totalRev: '₹11.85 L', margin: '68%', share: '10.0%' },
    { doctor: 'Dr. Maya Chandran', spec: 'Gastroenterology', consultsRev: '₹2.74 L', procRev: '₹7.82 L', medsRev: '₹3.04 L', totalRev: '₹13.60 L', margin: '72%', share: '11.5%' }
  ];

  var PATIENT_LOGS = [
    { name: 'Bruno', breed: 'Golden Retriever, 4y', owner: 'Vikramaditya Malhotra', doctor: 'Dr. Rajeshwari Swaminathan', diagnosis: 'TPLO Cruciate Ligament Rupture', plan: 'Post-op rehab & Carprofen 75mg', nextVisit: '2026-10-22', status: 'Post-Op Recovery' },
    { name: 'Milo', breed: 'Persian Cat, 3y', owner: 'Sunita Kothari', doctor: 'Dr. Pooja Mehta', diagnosis: 'FLUTD Urinary Obstruction', plan: 'Catheterization & Hills c/d diet', nextVisit: '2026-10-18', status: 'Inpatient ICU' },
    { name: 'Simba', breed: 'German Shepherd, 6y', owner: 'Raghavendra Rao', doctor: 'Dr. Vikramaditya Rathore', diagnosis: 'Gastric Dilatation-Volvulus (GDV)', plan: 'Gastropexy post-care & IV fluids', nextVisit: '2026-10-24', status: 'Post-Op Recovery' },
    { name: 'Bella', breed: 'Shih Tzu, 5y', owner: 'Meera Kapoor', doctor: 'Dr. Anirudh Sen', diagnosis: 'Emergency Pyometra Resection', plan: 'Ceftriaxone & analgesia protocol', nextVisit: '2026-10-20', status: 'Stable Ward' },
    { name: 'Leo', breed: 'Beagle, 2y', owner: 'Ananya Sharma', doctor: 'Dr. Maya Chandran', diagnosis: 'Gastric Foreign Body (Sox)', plan: 'Endoscopic extraction post-care', nextVisit: '2026-10-19', status: 'Discharged Today' },
    { name: 'Coco', breed: 'Labrador, 7y', owner: 'Amit Deshmukh', doctor: 'Dr. Rohan Kulkarni', diagnosis: 'Splenic Mass Resection', plan: 'Histopathology & Yunnan Baiyao', nextVisit: '2026-10-25', status: 'Inpatient Ward' },
    { name: 'Zoe', breed: 'Siberian Husky, 1y', owner: 'Kabir Bedi', doctor: 'Dr. Gaurav Sharma', diagnosis: 'Diaphragmatic Hernia Repair', plan: 'ICU oxygen & thoracic drainage', nextVisit: '2026-10-23', status: 'Critical ICU' },
    { name: 'Oreo', breed: 'Indie Dog, 3y', owner: 'Divya Pillai', doctor: 'Dr. Gaurav Sharma', diagnosis: 'Comminuted Femur Fracture', plan: '3.5mm LCP plate fixation & rest', nextVisit: '2026-10-28', status: 'Post-Op Recovery' },
    { name: 'Luna', breed: 'British Shorthair, 4y', owner: 'Priya Nambiar', doctor: 'Dr. Sneha Nair', diagnosis: 'Deep Corneal Ulceration', plan: 'Conjunctival flap & ofloxacin', nextVisit: '2026-10-21', status: 'Outpatient Care' },
    { name: 'Rocky', breed: 'Rottweiler, 5y', owner: 'Varun Tej', doctor: 'Dr. Siddharth Verma', diagnosis: 'Dilated Cardiomyopathy (DCM)', plan: 'Pimobendan 5mg BID & Furosemide', nextVisit: '2026-10-26', status: 'Monitored Stable' }
  ];

  var CLINICAL_ORDERS = [
    { id: 'ORD-DOC-701', doctor: 'Dr. Rajeshwari Swaminathan', patient: 'Bruno (Golden Retriever)', items: 'Cefpodoxime 200mg, Carprofen 75mg, Joint Support (90 tabs)', center: 'Indiranagar Central Hospital', amount: '₹4,850', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-702', doctor: 'Dr. Pooja Mehta', patient: 'Milo (Persian Cat)', items: 'Buprenorphine 0.3mg, Royal Canin Urinary S/O (2kg), Prazosin', center: 'Bandra Trauma Centre', amount: '₹3,920', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-703', doctor: 'Dr. Vikramaditya Rathore', patient: 'Simba (German Shepherd)', items: 'Metronidazole IV, Pantoprazole 40mg, Surgical Abdominal Pack', center: 'DLF CyberCity Hospital', amount: '₹8,400', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-704', doctor: 'Dr. Anirudh Sen', patient: 'Bella (Shih Tzu)', items: 'Amoxicillin-Clav 375mg, Tramadol Drops, Chlorhexidine Scrub', center: 'Jubilee Hills Center', amount: '₹3,150', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-705', doctor: 'Dr. Maya Chandran', patient: 'Leo (Beagle)', items: 'Sucralfate Oral Susp, Metoclopramide, GI Recovery Wet Food (12 cans)', center: 'Koramangala Care Clinic', amount: '₹2,880', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-706', doctor: 'Dr. Rohan Kulkarni', patient: 'Coco (Labrador)', items: 'Yunnan Baiyao, Ondansetron IV, Surgical Hemostatic Sponges', center: 'Koregaon Park Hospital', amount: '₹5,620', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-707', doctor: 'Dr. Gaurav Sharma', patient: 'Zoe (Siberian Husky)', items: 'Butorphanol, Meropenem 500mg, Thoracic Trocar Catheter', center: 'DLF CyberCity Hospital', amount: '₹9,200', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-708', doctor: 'Dr. Gaurav Sharma', patient: 'Oreo (Indie Dog)', items: '3.5mm Titanium Locking Screws, Cefazolin IV, Robenacoxib 20mg', center: 'Bandra Trauma Centre', amount: '₹7,450', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-709', doctor: 'Dr. Sneha Nair', patient: 'Luna (British Shorthair)', items: 'Tobramycin Ophthalmic, Atropine 1%, Ocular Lubricant Gel', center: 'Indiranagar Central Hospital', amount: '₹2,100', status: 'Dispensed & Billed' },
    { id: 'ORD-DOC-710', doctor: 'Dr. Siddharth Verma', patient: 'Rocky (Rottweiler)', items: 'Vetmedin (Pimobendan 5mg), Torsemide, Cardipro Omega-3', center: 'DLF CyberCity Hospital', amount: '₹6,750', status: 'Dispensed & Billed' }
  ];

  var SETTLEMENTS = [
    { id: 'SET-DOC-901', doctor: 'Dr. Rajeshwari Swaminathan', spec: 'Orthopedics & Surgery', billed: '₹18,40,000', rate: '15%', gross: '₹2,76,000', tds: '₹27,600', net: '₹2,48,400', status: 'Settled' },
    { id: 'SET-DOC-902', doctor: 'Dr. Vikramaditya Rathore', spec: 'Trauma & Emergency', billed: '₹16,90,000', rate: '15%', gross: '₹2,53,500', tds: '₹25,350', net: '₹2,28,150', status: 'Settled' },
    { id: 'SET-DOC-903', doctor: 'Dr. Pooja Mehta', spec: 'Feline Medicine', billed: '₹14,25,000', rate: '15%', gross: '₹2,13,750', tds: '₹21,375', net: '₹1,92,375', status: 'Settled' },
    { id: 'SET-DOC-904', doctor: 'Dr. Anirudh Sen', spec: 'General Surgery', billed: '₹15,10,000', rate: '15%', gross: '₹2,26,500', tds: '₹22,650', net: '₹2,03,850', status: 'Settled' },
    { id: 'SET-DOC-905', doctor: 'Dr. Siddharth Verma', spec: 'Cardiology', billed: '₹13,80,000', rate: '15%', gross: '₹2,07,000', tds: '₹20,700', net: '₹1,86,300', status: 'Approved' },
    { id: 'SET-DOC-906', doctor: 'Dr. Rohan Kulkarni', spec: 'Surgical Oncology', billed: '₹12,60,000', rate: '15%', gross: '₹1,89,000', tds: '₹18,900', net: '₹1,70,100', status: 'Settled' },
    { id: 'SET-DOC-907', doctor: 'Dr. Gaurav Sharma', spec: 'Orthopedics & Spine', billed: '₹13,40,000', rate: '15%', gross: '₹2,01,000', tds: '₹20,100', net: '₹1,80,900', status: 'Settled' },
    { id: 'SET-DOC-908', doctor: 'Dr. Sneha Nair', spec: 'Ophthalmology', billed: '₹10,90,000', rate: '15%', gross: '₹1,63,500', tds: '₹16,350', net: '₹1,47,150', status: 'Approved' },
    { id: 'SET-DOC-909', doctor: 'Dr. Divya Reddy', spec: 'Critical Care & Neonatal', billed: '₹11,85,000', rate: '15%', gross: '₹1,77,750', tds: '₹17,775', net: '₹1,59,975', status: 'Settled' },
    { id: 'SET-DOC-910', doctor: 'Dr. Maya Chandran', spec: 'Gastroenterology', billed: '₹13,60,000', rate: '15%', gross: '₹2,04,000', tds: '₹20,400', net: '₹1,83,600', status: 'Settled' }
  ];

  var LIVE_ACTIVITIES = [
    { time: '10:30 AM', doctor: 'Dr. Rajeshwari Swaminathan', type: 'TPLO Cruciate Ligament Repair', patient: 'Bruno (Golden Retriever)', location: 'Indiranagar Central - OT 1', vitals: 'HR 118, SpO2 99%, Stable', duration: '45 mins', state: 'In Surgery' },
    { time: '10:45 AM', doctor: 'Dr. Vikramaditya Rathore', type: 'Emergency Thoracic Drainage', patient: 'Zoe (Siberian Husky)', location: 'Bandra Trauma - Emergency OT', vitals: 'HR 135, BP 110/70, Critical', duration: '25 mins', state: 'In Surgery' },
    { time: '11:15 AM', doctor: 'Dr. Pooja Mehta', type: 'Ultrasound Renal & Doppler', patient: 'Milo (Persian Cat)', location: 'Bandra Trauma - Bay 2', vitals: 'Stable, Alert', duration: '15 mins', state: 'In Consultation' },
    { time: '11:30 AM', doctor: 'Dr. Anirudh Sen', type: 'Post-Op Wound & Drain Check', patient: 'Bella (Shih Tzu)', location: 'Jubilee Hills - Post-Op Ward', vitals: 'Normal Afebrile', duration: '20 mins', state: 'Post-Op Round' },
    { time: '11:45 AM', doctor: 'Dr. Siddharth Verma', type: '2D Echocardiography & Doppler', patient: 'Rocky (Rottweiler)', location: 'DLF CyberCity - Echo Lab', vitals: 'FS 18%, DCM Monitored', duration: '30 mins', state: 'Diagnostic Scan' },
    { time: '12:00 PM', doctor: 'Dr. Maya Chandran', type: 'Upper GI Video Endoscopy', patient: 'Leo (Beagle)', location: 'Koramangala - Minor OT', vitals: 'Foreign Body Extracted', duration: '35 mins', state: 'Procedure Complete' },
    { time: '12:15 PM', doctor: 'Dr. Rohan Kulkarni', type: 'Tumor Margin Cryo-Cauterization', patient: 'Coco (Labrador)', location: 'Koregaon Park - OT 2', vitals: 'Margin Clear, Hemostasis Ok', duration: '40 mins', state: 'In Surgery' },
    { time: '12:30 PM', doctor: 'Dr. Gaurav Sharma', type: 'Post-Fixation X-Ray Review', patient: 'Oreo (Indie Dog)', location: 'DLF CyberCity - Radiology Wing', vitals: 'Anatomical Alignment 100%', duration: '15 mins', state: 'Imaging Review' },
    { time: '12:45 PM', doctor: 'Dr. Sneha Nair', type: 'Slit-Lamp Biomicroscopy', patient: 'Luna (British Shorthair)', location: 'Indiranagar - Ophthalmic Suite', vitals: 'IOP 14 mmHg, Healing', duration: '20 mins', state: 'In Consultation' },
    { time: '01:00 PM', doctor: 'Dr. Divya Reddy', type: 'Pediatric Incubator Triage', patient: 'Kitten Litter (4 Kittens)', location: 'Jubilee Hills - Neonatal ICU', vitals: 'Temp 38.1°C, Feeding Well', duration: '25 mins', state: 'Active Monitoring' }
  ];

  var NETWORKS = [
    { name: 'Zenve Indiranagar Central Hospital', location: 'Bengaluru, KA', doctors: '12 Senior Doctors', specialties: 'Orthopedics, Trauma, Ophthalmology, ICU', ots: '3 Modular OTs', beds: '28 Inpatient Beds (6 ICU)', capacity: '1,200 Pets / Mo', status: 'Operational 24x7' },
    { name: 'Zenve Bandra West Trauma Centre', location: 'Mumbai, MH', doctors: '10 Senior Doctors', specialties: 'Emergency, Critical Care, Feline Medicine, Surgery', ots: '2 Modular OTs', beds: '24 Inpatient Beds (5 ICU)', capacity: '1,050 Pets / Mo', status: 'Operational 24x7' },
    { name: 'Zenve DLF CyberCity Critical Care', location: 'Delhi NCR', doctors: '14 Senior Doctors', specialties: 'Cardiology, Neurosurgery, Critical Care, Oncology', ots: '3 Modular OTs', beds: '32 Inpatient Beds (8 ICU)', capacity: '1,400 Pets / Mo', status: 'Operational 24x7' },
    { name: 'Zenve Jubilee Hills Specialty Center', location: 'Hyderabad, TS', doctors: '8 Senior Doctors', specialties: 'General Surgery, Neonatology, Critical Care', ots: '2 Modular OTs', beds: '22 Inpatient Beds (4 ICU)', capacity: '900 Pets / Mo', status: 'Operational 24x7' },
    { name: 'Zenve Koregaon Park Veterinary Hospital', location: 'Pune, MH', doctors: '7 Senior Doctors', specialties: 'Soft Tissue Surgery, Oncology, Rehabilitation', ots: '2 Modular OTs', beds: '20 Inpatient Beds (4 ICU)', capacity: '850 Pets / Mo', status: 'Operational 24x7' },
    { name: 'Zenve Koramangala Care Clinic', location: 'Bengaluru, KA', doctors: '5 Senior Doctors', specialties: 'Primary OPD, Endoscopy, Preventive Care', ots: '1 Minor OT', beds: '6 Daycare Pods', capacity: '650 Pets / Mo', status: 'Daytime & Emergency' },
    { name: 'Zenve Andheri Link Rd Clinic', location: 'Mumbai, MH', doctors: '4 Senior Doctors', specialties: 'Dermatology, Internal Medicine, Minor Procedures', ots: '1 Minor OT', beds: '8 Daycare Pods', capacity: '580 Pets / Mo', status: 'Daytime & Emergency' },
    { name: 'Zenve Saket Pet Wellness & Diagnostics', location: 'Delhi NCR', doctors: '4 Senior Doctors', specialties: 'Pediatric Health, Routine Vaccinations, Ultrasound', ots: '1 Minor OT', beds: '6 Daycare Pods', capacity: '540 Pets / Mo', status: 'Daytime & Emergency' },
    { name: 'Zenve Anna Nagar Care Clinic', location: 'Chennai, TN', doctors: '4 Senior Doctors', specialties: 'Primary Healthcare, Dental Prophylaxis, Lab', ots: '1 Minor OT', beds: '6 Daycare Pods', capacity: '510 Pets / Mo', status: 'Daytime & Emergency' },
    { name: 'Zenve Salt Lake City Polyclinic', location: 'Kolkata, WB', doctors: '4 Senior Doctors', specialties: 'General OPD, Geriatric Care, Clinical Lab', ots: '1 Minor OT', beds: '6 Daycare Pods', capacity: '480 Pets / Mo', status: 'Daytime & Emergency' }
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'dashboard',
    search: '',
    filter: 'ALL'
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('import') >= 0 || h.indexOf('export') >= 0 || h.indexOf('subscription') >= 0 || h.indexOf('customer') >= 0) {
      return null;
    }
    if (h === 'doctors-dashboard' || h === 'doctors' || h === 'doctor-dashboard') return 'dashboard';
    if (h === 'all-doctors' || h === 'doctors-list') return 'all-doctors';
    if (h === 'doctor-performance' || h === 'doctors-performance') return 'performance';
    if (h === 'doctor-revenue' || h === 'doctors-revenue') return 'revenue';
    if (h === 'doctor-patients' || h === 'doctors-patients') return 'patients';
    if (h === 'doctor-orders' || h === 'doctors-orders') return 'orders';
    if (h === 'doctor-commissions' || h === 'doctors-commissions') return 'commissions';
    if (h === 'doctor-activity' || h === 'doctors-activity') return 'activity';
    if (h === 'doctor-network' || h === 'doctors-network') return 'network';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('customer') >= 0) return null;

    if (raw === 'doctors dashboard' || raw === 'doctors') return 'dashboard';
    if (raw === 'all doctors') return 'all-doctors';
    if (raw === 'doctor performance') return 'performance';
    if (raw === 'doctor revenue') return 'revenue';
    if (raw === 'doctor patients') return 'patients';
    if (raw === 'doctor orders') return 'orders';
    if (raw === 'doctor commissions') return 'commissions';
    if (raw === 'doctor activity') return 'activity';
    if (raw === 'doctor network') return 'network';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zdoc-kpi">',
        '<div class="zdoc-kpi-top">',
          '<span class="zdoc-kpi-label">' + esc(label) + '</span>',
          '<span class="zdoc-kpi-icon">' + esc(icon || '👨‍⚕️') + '</span>',
        '</div>',
        '<div class="zdoc-kpi-val">' + esc(val) + '</div>',
        '<div class="zdoc-kpi-bottom">',
          '<span class="zdoc-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'warn') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zdoc-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains ───────────────────────────────────────────── */
  function renderDashboard() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Active Veterinary Doctors', '42 Clinicians', '+6 YoY', 'up', 'Across 10 clinic centers', '👨‍⚕️'),
        kpiHtml('Monthly Patient Consults', '3,480 Consults', '+14.2%', 'up', '142 daily consult average', '🐾'),
        kpiHtml('Doctor Attributed Revenue', '₹1.18 Cr', '+18.5%', 'up', 'Consults, meds & surgery', '💰'),
        kpiHtml('Doctor Commissions Paid', '₹18.45 L', '100%', 'up', 'Settled bi-weekly direct', '📋'),
        kpiHtml('Avg. Patient Satisfaction', '4.9 / 5.0', '1,840 ratings', 'up', 'Verified pet parents', '⭐'),
        kpiHtml('Surgical Success Rate', '99.4%', '482 procedures', 'up', 'Zero cross-contamination', '🛡️'),
      '</div>',

      '<div class="zdoc-card">',
        '<div class="zdoc-card-head">',
          '<div>',
            '<h3 class="zdoc-card-title">👨‍⚕️ Active Medical Practitioner Roster</h3>',
            '<p class="zdoc-card-sub">Clinical accreditation, consultation volume, and real-time on-duty status</p>',
          '</div>',
          '<button class="zdoc-btn primary" onclick="ZenveDoctorsDashboard.showOnboardModal()">+ Add New Clinician</button>',
        '</div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor ID</th><th>Practitioner Name</th><th>Specialty</th><th>Center Clinic</th><th>MTD Patients</th><th>Attributed Revenue</th><th>Commissions</th><th>Rating</th><th>Status</th></tr></thead>',
            '<tbody>',
              DOCTORS.map(function(d) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(d.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.name) + '</td>' +
                  '<td>' + esc(d.spec) + '</td>' +
                  '<td style="color:#64748b;">' + esc(d.clinic) + '</td>' +
                  '<td style="font-weight:600;">' + d.patientsMtd + ' pets</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(d.revMtd) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.comm) + '</td>' +
                  '<td style="color:#d97706;font-weight:600;">★ ' + esc(d.rating) + '</td>' +
                  '<td><span class="zdoc-pill ' + (d.status === 'On Duty' ? 'active' : d.status === 'In Surgery' ? 'warning' : 'critical') + '">' + esc(d.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderAllDoctors() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Total Board Clinicians', '42 Clinicians', '+6 YoY', 'up', 'All state board registered', '👨‍⚕️'),
        kpiHtml('Primary Specialties', '8 Disciplines', '100% active', 'up', 'Full tertiary care coverage', '🩺'),
        kpiHtml('Avg Clinical Experience', '11.4 Yrs', 'Senior board', 'up', 'Board certified clinicians', '🎓'),
        kpiHtml('Clinic Shifts Scheduled', '100.0%', 'Zero absence', 'up', 'Zero doctor absence backlog', '📅'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">📋 Practitioner Directory & Licensing Master</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor ID</th><th>Clinician Name</th><th>Specialty</th><th>Qualifications</th><th>Experience</th><th>State VCI License</th><th>Primary Clinic Hub</th><th>OPD Days</th><th>Status</th></tr></thead>',
            '<tbody>',
              DOCTORS.map(function(d) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(d.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.name) + '</td>' +
                  '<td>' + esc(d.spec) + '</td>' +
                  '<td style="color:#64748b;">' + esc(d.qual) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.exp) + '</td>' +
                  '<td style="font-family:monospace;color:#0369a1;">' + esc(d.vci) + '</td>' +
                  '<td>' + esc(d.clinic) + '</td>' +
                  '<td style="color:#475569;">' + esc(d.days) + '</td>' +
                  '<td><span class="zdoc-pill ' + (d.status === 'On Duty' ? 'active' : d.status === 'In Surgery' ? 'warning' : 'critical') + '">' + esc(d.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPerformance() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Overall Quota Attainment', '108.4%', '+8.4%', 'up', 'All practitioners above goal', '🎯'),
        kpiHtml('Clinical Net Promoter Score', '91.8 NPS', '+4.2%', 'up', '1,840 verified surveys', '⭐'),
        kpiHtml('Avg. Consultation Wait Time', '6.2 mins', '-2.1 mins', 'up', 'Strict appointment pacing', '⏱️'),
        kpiHtml('Overall Surgical Success', '99.4%', '+0.3%', 'up', 'NABH protocol compliant', '🛡️'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">⭐ Physician Performance Scorecard & Quality Index</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor Name</th><th>Specialty</th><th>Target</th><th>Actual</th><th>Attainment %</th><th>Patient NPS</th><th>Wait Time</th><th>Surgical Success</th><th>Clinical Grade</th></tr></thead>',
            '<tbody>',
              PERFORMANCE.map(function(p) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(p.name) + '</td>' +
                  '<td style="color:#64748b;">' + esc(p.spec) + '</td>' +
                  '<td>' + p.target + ' consults</td>' +
                  '<td style="font-weight:600;">' + p.actual + ' consults</td>' +
                  '<td style="color:#059669;font-weight:700;">' + esc(p.attainment) + '</td>' +
                  '<td style="color:#d97706;font-weight:600;">★ ' + esc(p.nps) + '</td>' +
                  '<td>' + esc(p.waitTime) + '</td>' +
                  '<td style="font-weight:600;">' + esc(p.success) + '</td>' +
                  '<td><span class="zdoc-pill active">' + esc(p.grade) + '</span></td>' +
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
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Doctor Billed Revenue', '₹1.18 Cr', '+18.5%', 'up', 'Direct physician billing', '💰'),
        kpiHtml('Procedure Billings', '₹54.80 L', '+22.4%', 'up', 'Surgeries & diagnostics', '🩺'),
        kpiHtml('Consultation Fees', '₹38.25 L', '+12.8%', 'up', 'Outpatient OPD fee', '📋'),
        kpiHtml('Pharmacy & Rx Uplift', '₹25.40 L', '+16.1%', 'up', 'Prescriptions filled in-house', '💊'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">💰 Clinician Revenue Matrix & Departmental Contribution</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Doctor Name</th><th>Department</th><th>Consult Fees</th><th>Procedures & Surgery</th><th>Rx Medicines</th><th>Total Attributed</th><th>Operating Margin</th><th>Revenue Share</th></tr></thead>',
            '<tbody>',
              REVENUE_STREAMS.map(function(r) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(r.doctor) + '</td>' +
                  '<td style="color:#64748b;">' + esc(r.spec) + '</td>' +
                  '<td>' + esc(r.consultsRev) + '</td>' +
                  '<td>' + esc(r.procRev) + '</td>' +
                  '<td>' + esc(r.medsRev) + '</td>' +
                  '<td style="font-weight:700;color:#059669;">' + esc(r.totalRev) + '</td>' +
                  '<td style="font-weight:600;">' + esc(r.margin) + '</td>' +
                  '<td style="color:#4f46e5;font-weight:600;">' + esc(r.share) + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderPatients() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Active Patient Caseload', '840 Pets', '+16.2%', 'up', 'Inpatients & OPD caseload', '🐾'),
        kpiHtml('Repeat Pet Consults', '68.4%', '+5.8%', 'up', 'High parent trust retention', '🔄'),
        kpiHtml('Chronic Care Monitored', '286 Pets', 'Active telemetry', 'up', 'Regular maintenance', '🩺'),
        kpiHtml('Follow-Up Adherence', '94.2%', '+3.4%', 'up', 'Automated reminder sync', '📅'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">🐾 Active Clinical Cases & Follow-Up Regimens</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Patient Name & Breed</th><th>Pet Parent</th><th>Attending Doctor</th><th>Primary Diagnosis</th><th>Treatment Plan</th><th>Next Follow-Up</th><th>Clinical Status</th></tr></thead>',
            '<tbody>',
              PATIENT_LOGS.map(function(p) {
                var pillCls = p.status.indexOf('ICU') >= 0 || p.status.indexOf('Critical') >= 0 ? 'critical' : p.status.indexOf('Recovery') >= 0 ? 'warning' : 'active';
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(p.name) + ' <span style="color:#64748b;font-weight:400;">(' + esc(p.breed) + ')</span></td>' +
                  '<td>' + esc(p.owner) + '</td>' +
                  '<td style="font-weight:600;">' + esc(p.doctor) + '</td>' +
                  '<td style="color:#dc2626;font-weight:600;">' + esc(p.diagnosis) + '</td>' +
                  '<td>' + esc(p.plan) + '</td>' +
                  '<td style="font-family:monospace;">' + esc(p.nextVisit) + '</td>' +
                  '<td><span class="zdoc-pill ' + pillCls + '">' + esc(p.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderOrders() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Physician Orders Raised', '1,240 Orders', '+15.6%', 'up', 'Prescriptions & consumables', '📦'),
        kpiHtml('Order Fulfillment Rate', '99.1%', '+0.8%', 'up', 'Express in-clinic dispensary', '⚡'),
        kpiHtml('Order Value Generated', '₹34.80 L', '+17.2%', 'up', 'Direct pharmacy attach', '💰'),
        kpiHtml('Formulary Adherence', '97.8%', '+1.2%', 'up', 'NABH quality standards', '🛡️'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">📦 Clinical Dispensary & Requisition Log</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Order ID</th><th>Attending Clinician</th><th>Pet Patient</th><th>Prescribed Drugs & Supplies</th><th>Dispensary Center</th><th>Total Amount</th><th>Fulfillment Status</th></tr></thead>',
            '<tbody>',
              CLINICAL_ORDERS.map(function(o) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(o.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(o.doctor) + '</td>' +
                  '<td>' + esc(o.patient) + '</td>' +
                  '<td style="color:#64748b;">' + esc(o.items) + '</td>' +
                  '<td>' + esc(o.center) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(o.amount) + '</td>' +
                  '<td><span class="zdoc-pill active">' + esc(o.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCommissions() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Total Commission Disbursed', '₹18.45 L', '+18.5%', 'up', 'Bi-weekly direct transfer', '💵'),
        kpiHtml('Avg. Physician Earning', '₹1.84 L', '+12.4%', 'up', 'Incentive & surgery share', '📈'),
        kpiHtml('TDS Deducted (Sec 194J)', '₹1.84 L', '10% standard', 'neutral', 'Form 16A filed auto', '🏛️'),
        kpiHtml('Payment Reconciliation', '100.0%', 'Zero dispute', 'up', 'Automated audit reconciled', '✅'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">💵 Clinician Settlement Ledger & TDS Withholding</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Settlement ID</th><th>Doctor Name</th><th>Specialty</th><th>Gross Billed</th><th>Slab</th><th>Gross Comm.</th><th>TDS</th><th>Net Remitted</th><th>Status</th></tr></thead>',
            '<tbody>',
              SETTLEMENTS.map(function(s) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(s.id) + '</td>' +
                  '<td style="font-weight:600;">' + esc(s.doctor) + '</td>' +
                  '<td style="color:#64748b;">' + esc(s.spec) + '</td>' +
                  '<td>' + esc(s.billed) + '</td>' +
                  '<td>' + esc(s.rate) + '</td>' +
                  '<td>' + esc(s.gross) + '</td>' +
                  '<td style="color:#dc2626;">' + esc(s.tds) + '</td>' +
                  '<td style="font-weight:700;color:#059669;">' + esc(s.net) + '</td>' +
                  '<td><span class="zdoc-pill active">' + esc(s.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderActivity() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Doctors Currently On Duty', '28 Clinicians', '10 Centers', 'up', 'Full day-shift coverage', '👨‍⚕️'),
        kpiHtml('Surgeries in Progress', '6 Active OTs', 'Modular suites', 'up', 'Sterile positive-pressure', '🩺'),
        kpiHtml('OPD Consults Today', '164 Consults', 'Pacing 18/hr', 'up', 'Zero patient backlog', '📋'),
        kpiHtml('Tele-Consult Queue', '4 Waiting', '<4 mins wait', 'up', 'Video consultation active', '📱'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">⚡ Live Physician Activity & Case Audit Stream</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Timestamp</th><th>Doctor Name</th><th>Activity Type</th><th>Patient / Case</th><th>Clinic / OT Location</th><th>Vitals / Alert Status</th><th>Duration</th><th>Current State</th></tr></thead>',
            '<tbody>',
              LIVE_ACTIVITIES.map(function(a) {
                var pillCls = a.state.indexOf('Surgery') >= 0 ? 'warning' : a.state.indexOf('Monitoring') >= 0 || a.state.indexOf('Complete') >= 0 ? 'active' : 'active';
                return '<tr>' +
                  '<td style="font-family:monospace;">' + esc(a.time) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.doctor) + '</td>' +
                  '<td>' + esc(a.type) + '</td>' +
                  '<td style="font-weight:600;">' + esc(a.patient) + '</td>' +
                  '<td style="color:#64748b;">' + esc(a.location) + '</td>' +
                  '<td>' + esc(a.vitals) + '</td>' +
                  '<td>' + esc(a.duration) + '</td>' +
                  '<td><span class="zdoc-pill ' + pillCls + '">' + esc(a.state) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderNetwork() {
    return [
      '<div class="zdoc-kpi-grid">',
        kpiHtml('Affiliated Hospital Hubs', '10 Centers', '5 Hosp + 5 Clin', 'up', 'Key metropolitan coverage', '🏥'),
        kpiHtml('Total Medical Staff', '148 Staff', '+18 YoY', 'up', 'Doctors, nurses & techs', '👨‍⚕️'),
        kpiHtml('Inter-Hospital Referrals', '184 Referrals', '+24.0%', 'up', 'Specialty cross-referrals', '🔄'),
        kpiHtml('Network Bed Utilization', '82.5%', '+6.2%', 'up', 'Emergency surge ready', '🛏️'),
      '</div>',
      '<div class="zdoc-card">',
        '<div class="zdoc-card-head"><h3 class="zdoc-card-title">🌐 Hospital Network Staffing & Facility Profile</h3></div>',
        '<div class="zdoc-table-wrap">',
          '<table class="zdoc-table">',
            '<thead><tr><th>Hospital Center</th><th>Location</th><th>Senior Doctors</th><th>Specialty Wings</th><th>Operating Theaters</th><th>Inpatient Beds</th><th>Monthly Capacity</th><th>Status</th></tr></thead>',
            '<tbody>',
              NETWORKS.map(function(n) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(n.name) + '</td>' +
                  '<td style="color:#64748b;">' + esc(n.location) + '</td>' +
                  '<td style="font-weight:600;">' + esc(n.doctors) + '</td>' +
                  '<td>' + esc(n.specialties) + '</td>' +
                  '<td>' + esc(n.ots) + '</td>' +
                  '<td>' + esc(n.beds) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(n.capacity) + '</td>' +
                  '<td><span class="zdoc-pill active">' + esc(n.status) + '</span></td>' +
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
      '<header class="zdoc-head">',
        '<div class="zdoc-head-left">',
          '<div class="zdoc-title-row">',
            '<h2 class="zdoc-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
            '<span class="zdoc-live-badge"><span class="zdoc-pulse-dot"></span> Clinical Board · Active</span>',
          '</div>',
          '<p class="zdoc-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zdoc-head-actions">',
          '<button class="zdoc-btn primary" onclick="ZenveDoctorsDashboard.showOnboardModal()">+ Add Clinician</button>',
        '</div>',
      '</header>',

      '<nav class="zdoc-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zdoc-tab' + active + '" onclick="ZenveDoctorsDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zdoc-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<div class="zdoc-body">'
    ];

    switch (S.tab) {
      case 'dashboard':   html.push(renderDashboard()); break;
      case 'all-doctors': html.push(renderAllDoctors()); break;
      case 'performance': html.push(renderPerformance()); break;
      case 'revenue':     html.push(renderRevenue()); break;
      case 'patients':    html.push(renderPatients()); break;
      case 'orders':      html.push(renderOrders()); break;
      case 'commissions': html.push(renderCommissions()); break;
      case 'activity':    html.push(renderActivity()); break;
      case 'network':     html.push(renderNetwork()); break;
      default:            html.push(renderDashboard());
    }

    html.push('</div>');
    root.innerHTML = html.join('');
  }

  /* ── Modal Mechanics ─────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var modal = document.createElement('div');
    modal.className = 'zdoc-modal-overlay';
    modal.id = 'zdoc-modal';
    modal.innerHTML = '<div class="zdoc-modal-card">' + contentHtml + '</div>';
    document.body.appendChild(modal);
  }

  function closeModal() {
    var modal = document.getElementById('zdoc-modal');
    if (modal) modal.remove();
  }

  function showOnboardModal() {
    var formHtml = [
      '<div class="zdoc-modal-head">',
        '<h3 class="zdoc-modal-title">👨‍⚕️ Register Veterinary Doctor</h3>',
        '<button class="zdoc-btn" onclick="ZenveDoctorsDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Practitioner successfully accredited and assigned to clinical schedule!\'); ZenveDoctorsDashboard.closeModal();">',
        '<div class="zdoc-form-group"><label>Doctor Full Name</label><input type="text" class="zdoc-input" placeholder="e.g. Dr. Rajesh Pillai" required /></div>',
        '<div class="zdoc-form-row">',
          '<div class="zdoc-form-group"><label>Veterinary Council Reg No.</label><input type="text" class="zdoc-input" placeholder="KVC-9821" required /></div>',
          '<div class="zdoc-form-group"><label>Primary Specialty</label><select class="zdoc-select"><option>Surgery & Critical Care</option><option>Cardiology</option><option>Neurology & Ortho</option><option>Pediatrics & Neonatal</option><option>Dermatology</option><option>Exotics & Avian</option></select></div>',
        '</div>',
        '<div class="zdoc-form-row">',
          '<div class="zdoc-form-group"><label>Primary Hospital Center</label><select class="zdoc-select"><option>Indiranagar Flagship</option><option>Koramangala Trauma</option><option>Whitefield Specialty</option><option>Jayanagar Wellness</option><option>HSR Layout Clinic</option></select></div>',
          '<div class="zdoc-form-group"><label>Commission Slab</label><select class="zdoc-select"><option>20% Standard</option><option>25% Senior Consultant</option><option>30% Specialist Surgeon</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zdoc-btn" onclick="ZenveDoctorsDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zdoc-btn primary">Complete Onboarding</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zdoc-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zdoc-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zb2b-root', 'zix-root', 'zsub-root', 'zc360-root', 'zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
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
    root.classList.add('zdoc-open', 'zpanel-open');

    try {
      document.documentElement.classList.remove('zb2b-locked', 'zix-locked', 'zsub-locked', 'zc360-locked', 'zfsh-locked', 'zvp-locked');
      document.body.classList.remove('zb2b-locked', 'zix-locked', 'zsub-locked', 'zc360-locked', 'zfsh-locked', 'zvp-locked');
      document.documentElement.classList.add('zdoc-locked');
      document.body.classList.add('zdoc-locked');
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
      root.classList.remove('zdoc-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zdoc-locked');
      document.body.classList.remove('zdoc-locked');
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
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'import', 'export', 'subscription', 'customer', 'b2b'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zdoc-root');
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
  window.ZenveDoctorsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showOnboardModal: showOnboardModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
