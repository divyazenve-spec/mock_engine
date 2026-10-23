/* =====================================================================
   Zenve BI — Veterinary Services Executive Control Center
   Sidebar: Veterinary Services Suite (9 Subdomains)
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var MODULES = [
    { id: 'overview', label: 'Services Dashboard', icon: '🩺', hash: '#services-dashboard', title: 'Veterinary Clinical Operations Control Center', sub: 'Master clinical floor dashboard: consultations throughput, triage queues, surgeries, and revenue' },
    { id: 'consultations', label: 'Consultations', icon: '👨‍⚕️', hash: '#consultations', title: 'Outpatient Consultations & Clinical Triage', sub: 'In-clinic encounters, video telehealth consults, chief complaints, diagnostic triage, and doctor allocations' },
    { id: 'appointments', label: 'Appointments', icon: '📅', hash: '#appointments', title: 'Appointment Scheduling & Clinic Capacity', sub: 'Calendar capacity, slot utilization, doctor availability, walk-in queues, and no-show prevention' },
    { id: 'treatments', label: 'Treatments', icon: '💊', hash: '#treatments', title: 'Inpatient Care, ICU & Chronic Treatment Regimens', sub: 'Ward bed occupancy, fluid therapy rates, surgical recovery milestones, chronic medical protocols, and discharge ready' },
    { id: 'vaccinations', label: 'Vaccinations', icon: '💉', hash: '#vaccinations', title: 'Immunization Schedules & Biological Lot Tracking', sub: 'Canine & feline vaccination schedules, IoT cold-chain batch tracking, booster recalls, and digital health pass generation' },
    { id: 'diagnostics', label: 'Diagnostics', icon: '🔬', hash: '#diagnostics', title: 'Clinical Pathology, In-House Lab & Advanced Imaging', sub: 'Hematology CBC, dry biochemistry panels, digital X-Ray DR, ultrasound Doppler, and rapid PCR panels' },
    { id: 'procedures', label: 'Procedures', icon: '✂️', hash: '#procedures', title: 'Surgical Operations & Sterile Theater Suite', sub: 'Sterile OT occupancy, orthopedic/soft tissue surgeries, inhalation anesthesia logs, and recovery PACU' },
    { id: 'revenue', label: 'Service Revenue', icon: '💰', hash: '#service-revenue', title: 'Clinical Revenue & Specialty Billings', sub: 'Financial billings by medical specialty, multi-clinic branch contributions, doctor splits, and average case value' },
    { id: 'profitability', label: 'Service Profitability', icon: '📈', hash: '#service-profitability', title: 'Clinical Unit Economics & Margin Diagnostics', sub: 'Gross contribution margins per service line, doctor commission expense analysis, and EBITDA contribution' }
  ];

  var S = {
    open: false,
    tab: 'overview',
    searchQuery: '',
    filterVal: 'ALL'
  };

  var root = null;

  /* ── Master Mock Clinical Datasets ────────────────────────────────── */
  var CONSULTATIONS = [
    { id: 'CNS-2026-081', pet: 'Bruno (Golden Retriever, 4y)', parent: 'Aditya Vikram Birla', doctor: 'Dr. Rajeshwari Swaminathan', specialty: 'Orthopedics', mode: 'In-Clinic', diagnosis: 'Cranial Cruciate Ligament (CCL) Rupture', fee: '₹1,500', status: 'Completed' },
    { id: 'CNS-2026-082', pet: 'Simba (Persian Cat, 2y)', parent: 'Pooja Singhania', doctor: 'Dr. Sneha Nair', specialty: 'Feline Medicine', mode: 'In-Clinic', diagnosis: 'Feline Lower Urinary Tract Disease (FLUTD)', fee: '₹1,200', status: 'Completed' },
    { id: 'CNS-2026-083', pet: 'Max (German Shepherd, 6y)', parent: 'Rohan Deshmukh', doctor: 'Dr. Vikramaditya Rathore', specialty: 'Critical Care', mode: 'In-Clinic', diagnosis: 'Gastric Dilatation-Volvulus (GDV) Triage', fee: '₹2,500', status: 'Under Observation' },
    { id: 'CNS-2026-084', pet: 'Bella (Labrador Retriever, 3y)', parent: 'Sneha Kulkarni', doctor: 'Dr. Edwin Reddy', specialty: 'Dermatology', mode: 'Video Telehealth', diagnosis: 'Atopic Dermatitis & Malassezia', fee: '₹850', status: 'Completed' },
    { id: 'CNS-2026-085', pet: 'Leo (Shih Tzu, 1.5y)', parent: 'Kunal Kapoor', doctor: 'Dr. Maya Chandran', specialty: 'Internal Medicine', mode: 'In-Clinic', diagnosis: 'Acute Hemorrhagic Gastroenteritis', fee: '₹1,400', status: 'In Consultation' },
    { id: 'CNS-2026-086', pet: 'Coco (Beagle, 5y)', parent: 'Ananya Sen', doctor: 'Dr. Siddharth Verma', specialty: 'Cardiology', mode: 'In-Clinic', diagnosis: 'Mitral Valve Disease (Stage B1)', fee: '₹1,800', status: 'Completed' },
    { id: 'CNS-2026-087', pet: 'Rocky (Rottweiler, 4y)', parent: 'Tarun Mathur', doctor: 'Dr. Anirudh Sen', specialty: 'Neurology', mode: 'In-Clinic', diagnosis: 'Thoracolumbar IVDD (Grade 3)', fee: '₹2,000', status: 'Completed' },
    { id: 'CNS-2026-088', pet: 'Milo (British Shorthair, 3y)', parent: 'Meera Nambiar', doctor: 'Dr. Sneha Nair', specialty: 'Ophthalmology', mode: 'Home Visit', diagnosis: 'Corneal Ulceration & Keratitis', fee: '₹1,800', status: 'Completed' },
    { id: 'CNS-2026-089', pet: 'Oskar (Siberian Husky, 2.5y)', parent: 'Vikram Merchant', doctor: 'Dr. Rohan Kulkarni', specialty: 'Oncology', mode: 'Video Telehealth', diagnosis: 'Cutaneous Histiocytoma (Benign)', fee: '₹850', status: 'Completed' },
    { id: 'CNS-2026-090', pet: 'Zoe (Indie Rescue, 1y)', parent: 'Dr. Rajeshwari Swaminathan', doctor: 'Dr. Gaurav Sharma', specialty: 'Preventive Care', mode: 'In-Clinic', diagnosis: 'Wellness & Tick Fever Screening', fee: '₹1,000', status: 'Completed' }
  ];

  var APPOINTMENTS = [
    { id: 'APT-1081', time: '09:00 AM', duration: '30m', pet: 'Bruno (Golden Retriever, 4y)', parent: 'Aditya Vikram Birla', doctor: 'Dr. Rajeshwari Swaminathan', clinic: 'Indiranagar Central Hospital', service: 'Orthopedic Joint Evaluation & TPLO', slotType: 'Scheduled Slot', status: 'In Session' },
    { id: 'APT-1082', time: '09:30 AM', duration: '20m', pet: 'Simba (Persian Cat, 2y)', parent: 'Pooja Singhania', doctor: 'Dr. Sneha Nair', clinic: 'Indiranagar Central Hospital', service: 'Feline Urinalysis & Ultrasound', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1083', time: '10:00 AM', duration: '45m', pet: 'Max (German Shepherd, 6y)', parent: 'Rohan Deshmukh', doctor: 'Dr. Vikramaditya Rathore', clinic: 'Bandra Trauma Centre', service: 'Emergency GDV Decompression', slotType: 'Emergency Triage', status: 'Confirmed' },
    { id: 'APT-1084', time: '10:30 AM', duration: '20m', pet: 'Bella (Labrador Retriever, 3y)', parent: 'Sneha Kulkarni', doctor: 'Dr. Edwin Reddy', clinic: 'Bandra Trauma Centre', service: 'Dermatology Skin Scraping & Allergy', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1085', time: '11:00 AM', duration: '30m', pet: 'Leo (Shih Tzu, 1.5y)', parent: 'Kunal Kapoor', doctor: 'Dr. Maya Chandran', clinic: 'DLF CyberCity Hospital', service: 'Gastroenterology IV Infusion', slotType: 'Walk-In Priority', status: 'Confirmed' },
    { id: 'APT-1086', time: '11:30 AM', duration: '30m', pet: 'Coco (Beagle, 5y)', parent: 'Ananya Sen', doctor: 'Dr. Siddharth Verma', clinic: 'DLF CyberCity Hospital', service: 'Color Doppler Echocardiogram', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1087', time: '12:00 PM', duration: '40m', pet: 'Rocky (Rottweiler, 4y)', parent: 'Tarun Mathur', doctor: 'Dr. Anirudh Sen', clinic: 'Jubilee Hills Center', service: 'Neurology Spinal Myelography', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1088', time: '02:00 PM', duration: '20m', pet: 'Milo (British Shorthair, 3y)', parent: 'Meera Nambiar', doctor: 'Dr. Karthik Sundaram', clinic: 'Alwarpet Community Clinic', service: 'Slit Lamp Ophthalmic Staining', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1089', time: '02:30 PM', duration: '25m', pet: 'Oskar (Siberian Husky, 2.5y)', parent: 'Vikram Merchant', doctor: 'Dr. Rohan Kulkarni', clinic: 'Koregaon Park Hospital', service: 'FNA Oncology Biopsy', slotType: 'Scheduled Slot', status: 'Confirmed' },
    { id: 'APT-1090', time: '03:00 PM', duration: '20m', pet: 'Zoe (Indie Rescue, 1y)', parent: 'Dr. Rajeshwari Swaminathan', doctor: 'Dr. Gaurav Sharma', clinic: 'Koramangala Care Clinic', service: 'Annual Core Booster Vaccination', slotType: 'Walk-In Priority', status: 'Confirmed' }
  ];

  var TREATMENTS = [
    { id: 'TRT-401', pet: 'Max (G. Shepherd, 6y)', parent: 'Rohan Deshmukh', ward: 'Critical Care ICU Bed-02', days: 2, vet: 'Dr. Vikramaditya Rathore', protocol: 'Post-Op Gastropexy & Fluid Decompression', progress: '78%', status: 'Stable Recovery' },
    { id: 'TRT-402', pet: 'Bruno (G. Retriever, 4y)', parent: 'Aditya Vikram Birla', ward: 'Orthopedic Recovery Bed-04', days: 1, vet: 'Dr. Rajeshwari Swaminathan', protocol: 'Post-TPLO Cryotherapy & Cold-Compression', progress: '88%', status: 'Discharge Ready' },
    { id: 'TRT-403', pet: 'Simba (Persian Cat, 2y)', parent: 'Pooja Singhania', ward: 'Feline Special Care Bed-01', days: 3, vet: 'Dr. Sneha Nair', protocol: 'Urinary Catheterization & Acid-Base Balance', progress: '92%', status: 'Discharge Ready' },
    { id: 'TRT-404', pet: 'Leo (Shih Tzu, 1.5y)', parent: 'Kunal Kapoor', ward: 'Isolation Ward Bed-03', days: 2, vet: 'Dr. Maya Chandran', protocol: 'Targeted Rehydration & Antiemetic Line', progress: '65%', status: 'Under Observation' },
    { id: 'TRT-405', pet: 'Rocky (Rottweiler, 4y)', parent: 'Tarun Mathur', ward: 'Neurology HDU Bed-01', days: 4, vet: 'Dr. Anirudh Sen', protocol: 'High-Dose Methylprednisolone & Cage Rest', progress: '82%', status: 'Stable Recovery' },
    { id: 'TRT-406', pet: 'Bella (Labrador, 3y)', parent: 'Sneha Kulkarni', ward: 'Daycare Suite Bed-06', days: 1, vet: 'Dr. Edwin Reddy', protocol: 'Apoquel Induction & Medicated Wash', progress: '95%', status: 'Discharge Ready' },
    { id: 'TRT-407', pet: 'Coco (Beagle, 5y)', parent: 'Ananya Sen', ward: 'Cardiology Telemetry Bed-02', days: 2, vet: 'Dr. Siddharth Verma', protocol: 'Pimobendan Support & Enalapril Titration', progress: '85%', status: 'Stable Recovery' },
    { id: 'TRT-408', pet: 'Oskar (S. Husky, 2.5y)', parent: 'Vikram Merchant', ward: 'Surgical Day Bed-05', days: 1, vet: 'Dr. Rohan Kulkarni', protocol: 'Excisional Biopsy Healing & Laser Therapy', progress: '90%', status: 'Discharge Ready' },
    { id: 'TRT-409', pet: 'Milo (B. Shorthair, 3y)', parent: 'Meera Nambiar', ward: 'Feline Day Ward Bed-03', days: 1, vet: 'Dr. Karthik Sundaram', protocol: 'Autologous Serum Eye Drops & Terramycin', progress: '84%', status: 'Discharge Ready' },
    { id: 'TRT-410', pet: 'Zoe (Indie Rescue, 1y)', parent: 'Dr. Rajeshwari Swaminathan', ward: 'Observation Nursery Bed-08', days: 1, vet: 'Dr. Gaurav Sharma', protocol: 'Doxycycline Course for Ehrlichia', progress: '96%', status: 'Discharge Ready' }
  ];

  var VACCINATIONS = [
    { id: 'VAC-2026-901', pet: 'Zoe (Indie, 1y)', species: 'Canine', vaccine: 'Nobivac DHPPi + L4 (6-in-1)', batch: 'MSD-NOB-9842A', date: '14 Oct 2026', nextDue: '14 Oct 2027', temp: '4.2°C', cert: 'Issued' },
    { id: 'VAC-2026-902', pet: 'Bruno (G. Retriever, 4y)', species: 'Canine', vaccine: 'Nobivac Rabies (1ml Sterile)', batch: 'MSD-RAB-1102B', date: '14 Oct 2026', nextDue: '14 Oct 2027', temp: '3.8°C', cert: 'Issued' },
    { id: 'VAC-2026-903', pet: 'Simba (Persian, 2y)', species: 'Feline', vaccine: 'Felocell 4 (FVRCP + Chlamydia)', batch: 'ZTS-FEL-4421C', date: '13 Oct 2026', nextDue: '13 Oct 2027', temp: '4.5°C', cert: 'Issued' },
    { id: 'VAC-2026-904', pet: 'Coco (Beagle, 5y)', species: 'Canine', vaccine: 'Nobivac KC (Bordetella Intranasal)', batch: 'MSD-KC-8841E', date: '13 Oct 2026', nextDue: '13 Apr 2027', temp: '4.1°C', cert: 'Issued' },
    { id: 'VAC-2026-905', pet: 'Milo (B. Shorthair, 3y)', species: 'Feline', vaccine: 'Defensor 3 (Feline Rabies)', batch: 'ZTS-DEF-3019D', date: '12 Oct 2026', nextDue: '12 Oct 2027', temp: '3.9°C', cert: 'Issued' },
    { id: 'VAC-2026-906', pet: 'Bella (Labrador, 3y)', species: 'Canine', vaccine: 'Vanguard Plus 5/L (Zoetis)', batch: 'ZTS-VAN-5520A', date: '12 Oct 2026', nextDue: '12 Oct 2027', temp: '4.0°C', cert: 'Issued' },
    { id: 'VAC-2026-907', pet: 'Oskar (S. Husky, 2.5y)', species: 'Canine', vaccine: 'Nobivac DHPPi Booster', batch: 'MSD-NOB-9842A', date: '11 Oct 2026', nextDue: '11 Oct 2027', temp: '4.3°C', cert: 'Issued' },
    { id: 'VAC-2026-908', pet: 'Leo (Shih Tzu, 1.5y)', species: 'Canine', vaccine: 'Canigen DHPPi/L (Virbac)', batch: 'VRB-CAN-7128F', date: '10 Oct 2026', nextDue: '10 Oct 2027', temp: '4.4°C', cert: 'Issued' },
    { id: 'VAC-2026-909', pet: 'Rocky (Rottweiler, 4y)', species: 'Canine', vaccine: 'Nobivac Rabies Annual Booster', batch: 'MSD-RAB-1102B', date: '09 Oct 2026', nextDue: '09 Oct 2027', temp: '3.7°C', cert: 'Issued' },
    { id: 'VAC-2026-910', pet: 'Max (G. Shepherd, 6y)', species: 'Canine', vaccine: 'Megavac-6 Core Adult', batch: 'IIL-MEG-6602K', date: '08 Oct 2026', nextDue: '08 Oct 2027', temp: '4.1°C', cert: 'Issued' }
  ];

  var DIAGNOSTICS = [
    { id: 'DX-2026-301', pet: 'Bruno (G. Retriever, 4y)', test: 'Digital Radiography (Stifle Joint AP/Lat)', modality: 'Digital X-Ray', vet: 'Dr. Rajeshwari Swaminathan', tat: '15 mins', flag: 'Cruciate Rupture & Effusion', status: 'Report Signed' },
    { id: 'DX-2026-302', pet: 'Simba (Persian, 2y)', test: 'Abdominal Color Ultrasound (Doppler)', modality: 'Ultrasound', vet: 'Dr. Sneha Nair', tat: '24 mins', flag: 'Cystic Calculi 4mm', status: 'Report Signed' },
    { id: 'DX-2026-303', pet: 'Max (G. Shepherd, 6y)', test: 'Emergency Blood Gas & Lactate Panel', modality: 'Biochemistry', vet: 'Dr. Vikramaditya Rathore', tat: '8 mins', flag: 'High Lactate (6.2 mmol/L)', status: 'Report Signed' },
    { id: 'DX-2026-304', pet: 'Bella (Labrador, 3y)', test: 'Skin Cytology & Deep Scrape Microscopy', modality: 'Biochemistry', vet: 'Dr. Edwin Reddy', tat: '20 mins', flag: 'Malassezia > 15/HPF', status: 'Report Signed' },
    { id: 'DX-2026-305', pet: 'Coco (Beagle, 5y)', test: 'Echocardiogram 2D & M-Mode', modality: 'Ultrasound', vet: 'Dr. Siddharth Verma', tat: '30 mins', flag: 'LA/Ao Ratio 1.8 Mild', status: 'Report Signed' },
    { id: 'DX-2026-306', pet: 'Leo (Shih Tzu, 1.5y)', test: 'Canine Parvovirus & Giardia Rapid PCR', modality: 'Biochemistry', vet: 'Dr. Maya Chandran', tat: '12 mins', flag: 'Giardia Positive', status: 'Report Signed' },
    { id: 'DX-2026-307', pet: 'Rocky (Rottweiler, 4y)', test: 'High-Field MRI (Spine T10-L3)', modality: 'Digital X-Ray', vet: 'Dr. Anirudh Sen', tat: '45 mins', flag: 'Extruded Disc (Grade 3)', status: 'Report Signed' },
    { id: 'DX-2026-308', pet: 'Oskar (S. Husky, 2.5y)', test: 'Fine Needle Aspiration (FNA) Pathology', modality: 'Biochemistry', vet: 'Dr. Rohan Kulkarni', tat: '36 mins', flag: 'Benign Histiocytoma', status: 'Report Signed' },
    { id: 'DX-2026-309', pet: 'Milo (B. Shorthair, 3y)', test: 'Fluorescein Stain & Intraocular Pressure', modality: 'Ultrasound', vet: 'Dr. Karthik Sundaram', tat: '10 mins', flag: 'Corneal Ulcer Positive', status: 'Report Signed' },
    { id: 'DX-2026-310', pet: 'Zoe (Indie, 1y)', test: 'Complete Blood Count (CBC) & 4Dx Plus', modality: 'Biochemistry', vet: 'Dr. Gaurav Sharma', tat: '18 mins', flag: 'Ehrlichia Ab Positive', status: 'Report Signed' }
  ];

  var PROCEDURES = [
    { id: 'SRG-801', patient: 'Bruno (G. Retriever, 4y)', procedure: 'Tibial Plateau Leveling Osteotomy (TPLO)', theater: 'Sterile OT-1 (Orthopedic)', surgeon: 'Dr. Rajeshwari Swaminathan', duration: '95 mins', anesthesia: 'Isoflurane + Epidural', status: 'Completed' },
    { id: 'SRG-802', patient: 'Max (G. Shepherd, 6y)', procedure: 'Emergency Laparotomy & Incisional Gastropexy', theater: 'Emergency Surgical Suite-2', surgeon: 'Dr. Vikramaditya Rathore', duration: '120 mins', anesthesia: 'Sevoflurane + Fentanyl', status: 'Completed' },
    { id: 'SRG-803', patient: 'Rocky (Rottweiler, 4y)', procedure: 'Hemilaminectomy Decompression (T13-L1)', theater: 'Sterile OT-1 (Neuro)', surgeon: 'Dr. Anirudh Sen', duration: '140 mins', anesthesia: 'Isoflurane + Ketamine', status: 'Completed' },
    { id: 'SRG-804', patient: 'Simba (Persian, 2y)', procedure: 'Cystotomy for Bladder Urolith Removal', theater: 'Sterile OT-3 (Soft Tissue)', surgeon: 'Dr. Sneha Nair', duration: '55 mins', anesthesia: 'Propofol + Isoflurane', status: 'Completed' },
    { id: 'SRG-805', patient: 'Bella (Labrador, 3y)', procedure: 'Laparoscopic Preventive Gastropexy', theater: 'Laparoscopic OT', surgeon: 'Dr. Anirudh Sen', duration: '60 mins', anesthesia: 'Sevoflurane + Bupivacaine', status: 'Completed' },
    { id: 'SRG-806', patient: 'Oskar (S. Husky, 2.5y)', procedure: 'Wide Local Excision of Pinna Mass', theater: 'Sterile OT-3 (Soft Tissue)', surgeon: 'Dr. Rohan Kulkarni', duration: '45 mins', anesthesia: 'Isoflurane Inhalation', status: 'Completed' },
    { id: 'SRG-807', patient: 'Coco (Beagle, 5y)', procedure: 'Ultrasonic Dental Scaling & Polishing', theater: 'Dental Suite', surgeon: 'Dr. Pooja Mehta', duration: '40 mins', anesthesia: 'Cuffed ET + Isoflurane', status: 'Completed' },
    { id: 'SRG-808', patient: 'Leo (Shih Tzu, 1.5y)', procedure: 'GI Video Endoscopy & Foreign Body', theater: 'Endoscopy Suite', surgeon: 'Dr. Maya Chandran', duration: '35 mins', anesthesia: 'Propofol Infusion TIVA', status: 'Completed' },
    { id: 'SRG-809', patient: 'Milo (B. Shorthair, 3y)', procedure: 'Corneal Grid Keratotomy & 3rd Eyelid Flap', theater: 'Ophthalmic OT', surgeon: 'Dr. Karthik Sundaram', duration: '50 mins', anesthesia: 'Isoflurane + Tetracaine', status: 'Completed' },
    { id: 'SRG-810', patient: 'Zoe (Indie, 1y)', procedure: 'Pediatric Ovariohysterectomy (Spay)', theater: 'Sterile OT-3 (Soft Tissue)', surgeon: 'Dr. Gaurav Sharma', duration: '30 mins', anesthesia: 'Isoflurane + Meloxicam', status: 'Completed' }
  ];

  var REVENUE_DATA = [
    { specialty: 'Orthopedics & TPLO Surgery', rev: '₹34,80,000', cases: 88, aov: '₹39,545', share: '23.5%', margin: '48.2%' },
    { specialty: 'General & Laparoscopic Surgery', rev: '₹26,40,000', cases: 142, aov: '₹18,591', share: '17.8%', margin: '42.6%' },
    { specialty: 'Emergency, ICU & Critical Care', rev: '₹22,10,000', cases: 114, aov: '₹19,386', share: '14.9%', margin: '52.4%' },
    { specialty: 'Clinical Outpatient Consults', rev: '₹18,50,000', cases: 1240, aov: '₹1,492', share: '12.5%', margin: '68.0%' },
    { specialty: 'In-House Diagnostics & Labs', rev: '₹16,20,000', cases: 820, aov: '₹1,975', share: '10.9%', margin: '58.5%' },
    { specialty: 'Cardiology & Echocardiography', rev: '₹11,40,000', cases: 94, aov: '₹12,127', share: '7.7%', margin: '54.2%' },
    { specialty: 'Preventive Vaccines & Certs', rev: '₹8,90,000', cases: 540, aov: '₹1,648', share: '6.0%', margin: '41.0%' },
    { specialty: 'Dental Prophylaxis & Scaling', rev: '₹4,80,000', cases: 62, aov: '₹7,742', share: '3.2%', margin: '62.5%' },
    { specialty: 'Feline Internal Medicine', rev: '₹3,40,000', cases: 48, aov: '₹7,083', share: '2.3%', margin: '46.8%' },
    { specialty: 'Neurology & Spinal Therapy', rev: '₹1,80,000', cases: 22, aov: '₹8,182', share: '1.2%', margin: '50.0%' }
  ];

  var PROFIT_DATA = [
    { service: 'Orthopedic & TPLO Surgery', rev: '₹34,80,000', cogs: '₹14,20,000', gp: '₹20,60,000', margin: '59.2%', tier: 'Highest Margin' },
    { service: 'General & Laparoscopy Surgery', rev: '₹26,40,000', cogs: '₹11,60,000', gp: '₹14,80,000', margin: '56.1%', tier: 'Highest Margin' },
    { service: 'Emergency, ICU & Critical Care', rev: '₹22,10,000', cogs: '₹10,50,000', gp: '₹11,60,000', margin: '52.5%', tier: 'High Margin' },
    { service: 'Clinical Outpatient Consultations', rev: '₹18,50,000', cogs: '₹4,80,000', gp: '₹13,70,000', margin: '74.1%', tier: 'Highest Margin' },
    { service: 'In-House Diagnostics & Labs', rev: '₹16,20,000', cogs: '₹5,80,000', gp: '₹10,40,000', margin: '64.2%', tier: 'High Margin' },
    { service: 'Cardiology & Ultrasound', rev: '₹11,40,000', cogs: '₹3,90,000', gp: '₹7,50,000', margin: '65.8%', tier: 'High Margin' },
    { service: 'Preventive Vaccines & Certs', rev: '₹8,90,000', cogs: '₹4,40,000', gp: '₹4,50,000', margin: '50.6%', tier: 'Healthy Margin' },
    { service: 'Dental Prophylaxis & Scaling', rev: '₹4,80,000', cogs: '₹1,50,000', gp: '₹3,30,000', margin: '68.8%', tier: 'Highest Margin' },
    { service: 'Feline Internal Medicine', rev: '₹3,40,000', cogs: '₹1,60,000', gp: '₹1,80,000', margin: '52.9%', tier: 'Healthy Margin' },
    { service: 'Neurology & Spinal Therapy', rev: '₹1,80,000', cogs: '₹80,000', gp: '₹1,00,000', margin: '55.6%', tier: 'Healthy Margin' }
  ];

  var HOSPITAL_FLOORS = [
    { id: 'FLR-101', facility: 'Indiranagar Central Hospital', floor: 'Floor 3 (ICU & Critical Care)', dept: 'Canine Intensive Care Unit', capacity: 12, occupied: 10, available: 2, rate: '83.3%', status: 'High Demand', tag: 'yellow', lead: 'Dr. Vikramaditya Rathore' },
    { id: 'FLR-102', facility: 'Indiranagar Central Hospital', floor: 'Floor 2 (Surgical Suites)', dept: 'Sterile OT 1 - 4 (Orthopedic & Soft Tissue)', capacity: 4, occupied: 3, available: 1, rate: '75.0%', status: 'Active Surgeries', tag: 'blue', lead: 'Dr. Rajeshwari Swaminathan' },
    { id: 'FLR-103', facility: 'Bandra Trauma Centre', floor: 'Level 1 (Emergency Wing)', dept: 'Trauma Resuscitation & Crash Bays', capacity: 8, occupied: 7, available: 1, rate: '87.5%', status: 'High Demand', tag: 'yellow', lead: 'Dr. Maya Chandran' },
    { id: 'FLR-104', facility: 'Bandra Trauma Centre', floor: 'Level 2 (Inpatient Recovery)', dept: 'Post-Op High Dependency Unit (HDU)', capacity: 16, occupied: 13, available: 3, rate: '81.3%', status: 'Optimal Load', tag: 'green', lead: 'Dr. Sneha Nair' },
    { id: 'FLR-105', facility: 'DLF CyberCity Multispecialty', floor: 'Floor 1 (Outpatient OPD)', dept: 'Specialist Consultation Suites', capacity: 10, occupied: 9, available: 1, rate: '90.0%', status: 'Peak OPD Hours', tag: 'blue', lead: 'Dr. Anirudh Sen' },
    { id: 'FLR-106', facility: 'DLF CyberCity Multispecialty', floor: 'Ground Floor (Advanced Imaging)', dept: 'CT Scanner, Echocardiography & Digital DR', capacity: 4, occupied: 4, available: 0, rate: '100.0%', status: 'Fully Booked', tag: 'blue', lead: 'Dr. Siddharth Verma' },
    { id: 'FLR-107', facility: 'Jubilee Hills Center', floor: 'Floor 2 (Specialty Care)', dept: 'Chemotherapy & Oncology Infusion Ward', capacity: 6, occupied: 4, available: 2, rate: '66.7%', status: 'Optimal Load', tag: 'green', lead: 'Dr. Rohan Kulkarni' },
    { id: 'FLR-108', facility: 'Koregaon Park Hospital', floor: 'Floor 1 (Rehabilitation)', dept: 'Physical Therapy & Hydrotherapy Pool', capacity: 8, occupied: 6, available: 2, rate: '75.0%', status: 'Active Sessions', tag: 'blue', lead: 'Dr. Edwin Reddy' },
    { id: 'FLR-109', facility: 'Alwarpet Community Clinic', floor: 'Ground Floor (Primary Care)', dept: 'General Health & Ophthalmic Exam Rooms', capacity: 6, occupied: 4, available: 2, rate: '66.7%', status: 'Available', tag: 'green', lead: 'Dr. Karthik Sundaram' },
    { id: 'FLR-110', facility: 'Koramangala Care Clinic', floor: 'Ground Floor (Preventive Bay)', dept: 'Immunization, Microchipping & Triage', capacity: 5, occupied: 3, available: 2, rate: '60.0%', status: 'Available', tag: 'green', lead: 'Dr. Gaurav Sharma' }
  ];

  /* ── Tab Helpers ──────────────────────────────────────────────────── */
  function tabFromText(t) {
    if (!t) return null;
    t = t.toLowerCase().trim();
    if (t === 'services dashboard' || t === 'veterinary services' || t === 'veterinary' || t === 'clinical operations') return 'overview';
    if (t === 'consultations') return 'consultations';
    if (t === 'appointments') return 'appointments';
    if (t === 'treatments') return 'treatments';
    if (t === 'vaccinations') return 'vaccinations';
    if (t === 'diagnostics') return 'diagnostics';
    if (t === 'procedures') return 'procedures';
    if (t === 'service revenue') return 'revenue';
    if (t === 'service profitability') return 'profitability';
    return null;
  }

  function tabFromHash(h) {
    if (!h) return null;
    h = h.toLowerCase().trim();
    if (h === '#services-dashboard' || h === '#veterinary-services' || h === '#veterinary') return 'overview';
    if (h === '#consultations') return 'consultations';
    if (h === '#appointments') return 'appointments';
    if (h === '#treatments') return 'treatments';
    if (h === '#vaccinations') return 'vaccinations';
    if (h === '#diagnostics') return 'diagnostics';
    if (h === '#procedures') return 'procedures';
    if (h === '#service-revenue') return 'revenue';
    if (h === '#service-profitability') return 'profitability';
    return null;
  }

  /* ── Close Other Overlay Panels ───────────────────────────────────── */
  function closeOthers() {
    var ids = [
      'zsd-root', 'zod-root', 'zpid-root', 'zph-root', 'zch-root',
      'zfa-root', 'zset-root', 'zalt-root', 'zrep-root', 'zsh-root',
      'zhr-dashboard-root', 'zmkt-dashboard-root', 'zvp-root',
      'zfsh-root', 'zlog-dashboard-root'
    ];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.style.display = 'none';
        el.classList.remove('zpanel-open');
      }
    });
  }

  /* ── Master HTML Renderer ─────────────────────────────────────────── */
  function render() {
    if (!root) return;
    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];

    var chipsHtml = MODULES.map(function (m) {
      var activeCls = m.id === S.tab ? ' active' : '';
      return '<button type="button" class="zvs-chip' + activeCls + '" data-tab="' + m.id + '">' +
        '<span>' + m.icon + '</span>' +
        '<span>' + m.label + '</span>' +
        '</button>';
    }).join('');

    root.innerHTML = [
      '<header class="zvs-header">',
      '  <div class="zvs-header-left">',
      '    <div class="zvs-brand-badge">🩺</div>',
      '    <div class="zvs-title-group">',
      '      <div class="zvs-title-row">',
      '        <h1 class="zvs-main-title">' + curMod.title + '</h1>',
      '        <div class="zvs-status-badge"><span class="zvs-status-dot"></span> 6 Hospitals Connected</div>',
      '      </div>',
      '      <div class="zvs-subtitle">' + curMod.sub + '</div>',
      '    </div>',
      '  </div>',
      '  <div class="zvs-header-right">',
      '    <button type="button" class="zvs-btn zvs-btn-secondary" id="zvs-export-btn">📊 Export CSV</button>',
      '    <button type="button" class="zvs-btn zvs-btn-secondary" id="zvs-order-lab-btn">🔬 Order Diagnostic</button>',
      '    <button type="button" class="zvs-btn zvs-btn-primary" id="zvs-book-apt-btn">+ Book Appointment</button>',
      '  </div>',
      '</header>',
      '<nav class="zvs-nav-bar">' + chipsHtml + '</nav>',
      '<div class="zvs-content" id="zvs-body-content"></div>'
    ].join('');

    wireHeaderEvents();
    renderTabContent();
  }

  function wireHeaderEvents() {
    var chips = root.querySelectorAll('.zvs-chip');
    chips.forEach(function (c) {
      c.onclick = function () {
        var t = c.getAttribute('data-tab');
        switchTab(t);
      };
    });

    var expBtn = root.querySelector('#zvs-export-btn');
    if (expBtn) expBtn.onclick = function () { exportTabCSV(); };

    var bookBtn = root.querySelector('#zvs-book-apt-btn');
    if (bookBtn) bookBtn.onclick = function () { showBookModal(); };

    var labBtn = root.querySelector('#zvs-order-lab-btn');
    if (labBtn) labBtn.onclick = function () { showLabModal(); };
  }

  /* ── Tab Views ────────────────────────────────────────────────────── */
  function renderTabContent() {
    var container = root.querySelector('#zvs-body-content');
    if (!container) return;

    if (S.tab === 'overview') container.innerHTML = renderOverview();
    else if (S.tab === 'consultations') container.innerHTML = renderConsultations();
    else if (S.tab === 'appointments') container.innerHTML = renderAppointments();
    else if (S.tab === 'treatments') container.innerHTML = renderTreatments();
    else if (S.tab === 'vaccinations') container.innerHTML = renderVaccinations();
    else if (S.tab === 'diagnostics') container.innerHTML = renderDiagnostics();
    else if (S.tab === 'procedures') container.innerHTML = renderProcedures();
    else if (S.tab === 'revenue') container.innerHTML = renderRevenue();
    else if (S.tab === 'profitability') container.innerHTML = renderProfitability();

    wireTabSpecificEvents();
  }

  function renderOverview() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Clinical Revenue (MTD)</span><span class="zvs-kpi-icon">💰</span></div><div class="zvs-kpi-val">₹1.48 Cr</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +18.4% MoM</span><span class="zvs-subtext">Across 6 surgical hubs</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Total Consultations</span><span class="zvs-kpi-icon">🩺</span></div><div class="zvs-kpi-val">1,842 Cases</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +12.6% YoY</span><span class="zvs-subtext">Outpatient, video & home</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgical Procedures</span><span class="zvs-kpi-icon">✂️</span></div><div class="zvs-kpi-val">284 Surgeries</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">100% Sterility</span><span class="zvs-subtext">Orthopedic & soft tissue</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Clinical Profit Margin</span><span class="zvs-kpi-icon">📈</span></div><div class="zvs-kpi-val">44.8%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +2.3% YoY</span><span class="zvs-subtext">High margin surgical core</span></div></div>',
      '</div>',

      '<div class="zvs-grid-2">',
      '  <div class="zvs-card">',
      '    <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Hospital Floor Status & Capacity</h3><p class="zvs-card-sub">Real-time patient intake and facility load across all 6 clinical hospitals</p></div></div>',
      '    <div style="padding:16px 20px 12px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">OUTPATIENT CLINICS</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">48 Consults Today</div><div style="font-size:11px;color:#16a34a;font-weight:600;">● 18 Vets On Duty</div></div>',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">STERILE THEATERS (OT)</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">6 OTs Active</div><div style="font-size:11px;color:#2563eb;font-weight:600;">● 14 Surgeries Scheduled</div></div>',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">INPATIENT & ICU WARDS</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">26 Beds Occupied</div><div style="font-size:11px;color:#ea580c;font-weight:600;">● 81.2% Bed Occupancy</div></div>',
      '      <div style="padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><div style="font-size:11px;color:#64748b;font-weight:700;">PATHOLOGY DIAGNOSTICS</div><div style="font-size:22px;font-weight:800;color:#0f172a;margin:4px 0;">384 Tests MTD</div><div style="font-size:11px;color:#059669;font-weight:600;">● 28m Avg Turnaround</div></div>',
      '    </div>',
      '    <div style="padding:0 20px 20px 20px;">',
      '      <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">',
      '        <span>HOSPITAL FACILITY OCCUPANCY SNAPSHOT</span>',
      '        <span style="font-size:11px;color:#059669;font-weight:600;">● Live Bed Telemetry</span>',
      '      </div>',
      '      <div class="zvs-table-wrap" style="max-height:260px;overflow-y:auto;">',
      '        <table class="zvs-table" style="font-size:12px;">',
      '          <thead><tr><th>Facility & Wing</th><th>Beds</th><th>Occ.</th><th>Rate</th><th>Status</th></tr></thead>',
      '          <tbody>',
      HOSPITAL_FLOORS.slice(0, 6).map(function (f) {
        return '<tr>' +
          '<td style="font-weight:600;color:#0f172a;">' + f.facility + '<br><span style="font-size:11px;color:#64748b;">' + f.floor + '</span></td>' +
          '<td style="font-family:monospace;font-weight:700;text-align:center;">' + f.capacity + '</td>' +
          '<td style="font-family:monospace;font-weight:700;color:#0f172a;text-align:center;">' + f.occupied + '</td>' +
          '<td style="font-weight:700;color:' + (parseFloat(f.rate) > 85 ? '#dc2626' : parseFloat(f.rate) > 75 ? '#d97706' : '#16a34a') + ';">' + f.rate + '</td>' +
          '<td><span class="zvs-tag ' + f.tag + '">' + f.status + '</span></td>' +
          '</tr>';
      }).join(''),
      '          </tbody>',
      '        </table>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="zvs-card">',
      '    <div class="zvs-card-head"><div><h3 class="zvs-card-title">Veterinary Services Subdomains Directory</h3><p class="zvs-card-sub">Dedicated operational suites for specialized clinical functions</p></div></div>',
      '    <div style="padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
      MODULES.slice(1).map(function (m) {
        return '<button type="button" class="zvs-btn zvs-btn-secondary" onclick="window.ZenveVeterinaryDashboard.switchTab(\'' + m.id + '\')" style="justify-content:flex-start;padding:12px;font-size:12px;text-align:left;">' +
          '<span style="font-size:16px;">' + m.icon + '</span>' +
          '<span style="font-weight:600;color:#0f172a;">' + m.label + '</span>' +
          '</button>';
      }).join(''),
      '    </div>',
      '  </div>',
      '</div>',
      '<div class="zvs-card" style="margin-top:16px;">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Hospital Floor Status & Capacity Roster</h3><p class="zvs-card-sub">Real-time facility capacity, bed occupancy, ICU readiness, and department charge leads across all 6 hospitals</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Floor ID</th><th>Hospital Facility</th><th>Floor & Wing</th><th>Department / Specialty</th><th>Total Capacity</th><th>Occupied</th><th>Available</th><th>Occupancy %</th><th>Clinical In-Charge</th><th>Status</th></tr></thead>',
      '      <tbody>',
      HOSPITAL_FLOORS.map(function (f) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + f.id + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + f.facility + '</td>',
          '  <td style="font-weight:600;color:#475569;">' + f.floor + '</td>',
          '  <td style="color:#0f172a;">' + f.dept + '</td>',
          '  <td style="font-family:monospace;font-weight:700;text-align:center;">' + f.capacity + ' Units</td>',
          '  <td style="font-family:monospace;font-weight:700;color:#0f172a;text-align:center;">' + f.occupied + '</td>',
          '  <td style="font-family:monospace;font-weight:700;color:#16a34a;text-align:center;">' + f.available + '</td>',
          '  <td><div style="display:flex;align-items:center;gap:8px;"><div style="flex:1;background:#e2e8f0;border-radius:4px;height:6px;overflow:hidden;min-width:60px;"><div style="background:' + (parseFloat(f.rate) > 85 ? '#ef4444' : parseFloat(f.rate) > 75 ? '#f59e0b' : '#10b981') + ';width:' + f.rate + ';height:100%;"></div></div><span style="font-size:11px;font-weight:700;min-width:38px;">' + f.rate + '</span></div></td>',
          '  <td style="font-weight:600;color:#0f172a;">' + f.lead + '</td>',
          '  <td><span class="zvs-tag ' + f.tag + '">' + f.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderConsultations() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Consultations Today</span><span class="zvs-kpi-icon">🩺</span></div><div class="zvs-kpi-val">58 Cases</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +14.2% YoY</span><span class="zvs-subtext">42 Clinic • 12 Video • 4 Home</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Encounter Time</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">22.4 mins</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Target: 20m</span><span class="zvs-subtext">Diagnostic triage thorough</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Active Triage Queue</span><span class="zvs-kpi-icon">🏥</span></div><div class="zvs-kpi-val">3 Patients</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Avg wait: 6m</span><span class="zvs-subtext">Zero critical backlog</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Consultation CSAT</span><span class="zvs-kpi-icon">⭐</span></div><div class="zvs-kpi-val">4.96 / 5</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +0.04 MoM</span><span class="zvs-subtext">482 verified reviews</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-filter-bar">',
      '    <div><h3 class="zvs-card-title">Live Outpatient Encounters & Triage Records</h3></div>',
      '    <input class="zvs-input" id="zvs-cns-search" placeholder="Search pet, doctor, diagnosis..." value="' + S.searchQuery + '" style="width:260px;">',
      '  </div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Encounter ID</th><th>Pet & Companion</th><th>Pet Parent</th><th>Attending Veterinarian</th><th>Mode</th><th>Diagnosis</th><th>Fee</th><th>Status</th></tr></thead>',
      '      <tbody>',
      CONSULTATIONS.filter(function (c) {
        if (!S.searchQuery) return true;
        var q = S.searchQuery.toLowerCase();
        return c.pet.toLowerCase().indexOf(q) >= 0 || c.doctor.toLowerCase().indexOf(q) >= 0 || c.diagnosis.toLowerCase().indexOf(q) >= 0;
      }).map(function (c) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + c.id + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + c.pet + '</td>',
          '  <td style="color:#475569;">' + c.parent + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + c.doctor + ' <span style="font-size:11px;color:#64748b;">(' + c.specialty + ')</span></td>',
          '  <td><span class="zvs-tag ' + (c.mode === 'Video Telehealth' ? 'blue' : c.mode === 'Home Visit' ? 'purple' : 'green') + '">' + c.mode + '</span></td>',
          '  <td style="font-weight:600;color:#0f172a;">' + c.diagnosis + '</td>',
          '  <td style="font-family:monospace;font-weight:700;color:#0f172a;">' + c.fee + '</td>',
          '  <td><span class="zvs-tag ' + (c.status === 'Completed' ? 'green' : c.status === 'In Consultation' ? 'blue' : 'yellow') + '">' + c.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderAppointments() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Booked Slots Today</span><span class="zvs-kpi-icon">📅</span></div><div class="zvs-kpi-val">94 Slots</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">91.2% Cap</span><span class="zvs-subtext">Across 6 urban hospitals</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Walk-In Intake</span><span class="zvs-kpi-icon">🚶</span></div><div class="zvs-kpi-val">18 Patients</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Fast Triage</span><span class="zvs-subtext">Fast-track buffer</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">No-Show Rate</span><span class="zvs-kpi-icon">📉</span></div><div class="zvs-kpi-val">1.8%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↓ -0.9% MoM</span><span class="zvs-subtext">WhatsApp 2h alerts</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Doctor Punctuality</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">98.4%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">SLA Met</span><span class="zvs-subtext">On-time start</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Master Appointment Roster & Slot Schedule</h3><p class="zvs-card-sub">Real-time scheduling grid with patient assignments and clinic room allocation</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Time & Slot</th><th>Pet & Patient</th><th>Parent</th><th>Doctor</th><th>Hospital Branch</th><th>Requested Service</th><th>Status</th></tr></thead>',
      '      <tbody>',
      APPOINTMENTS.map(function (a) {
        return [
          '<tr>',
          '  <td style="font-weight:700;font-family:monospace;color:#0f172a;">' + a.time + ' <span style="font-size:10px;color:#64748b;">(' + a.id + ')</span></td>',
          '  <td style="font-weight:700;color:#0f172a;">' + a.pet + '</td>',
          '  <td style="color:#475569;">' + a.parent + '</td>',
          '  <td style="font-weight:600;color:#2563eb;">' + a.doctor + '</td>',
          '  <td style="color:#334155;">' + a.clinic + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + a.service + '</td>',
          '  <td><span class="zvs-tag ' + (a.status === 'Confirmed' ? 'green' : a.status === 'In Session' ? 'blue' : 'yellow') + '">' + a.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderTreatments() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Active Inpatient Ward</span><span class="zvs-kpi-icon">🏥</span></div><div class="zvs-kpi-val">26 Patients</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">81.2% Cap</span><span class="zvs-subtext">6 ICU • 14 Post-Op • 6 Ward</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Treatment Recovery Rate</span><span class="zvs-kpi-icon">🎯</span></div><div class="zvs-kpi-val">98.4%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">SLA Met</span><span class="zvs-subtext">On-time start</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Hospital Stay</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">2.1 Days</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Target < 3d</span><span class="zvs-subtext">Optimized recovery</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Discharge Ready</span><span class="zvs-kpi-icon">🏡</span></div><div class="zvs-kpi-val">7 Pets Today</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Vitals normal</span><span class="zvs-subtext">Discharge cleared</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Inpatient Ward Management & Daily Clinical Progress</h3><p class="zvs-card-sub">Active therapy lines, intravenous fluids, vital signs monitoring, and attending physician notes</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Patient & Case</th><th>Ward Bed</th><th>Attending Vet</th><th>Clinical Regimen</th><th>Stay Duration</th><th>Recovery</th><th>Status</th></tr></thead>',
      '      <tbody>',
      TREATMENTS.map(function (t) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + t.pet + ' <span style="font-size:11px;color:#64748b;">(' + t.id + ')</span></td>',
          '  <td><span class="zvs-tag ' + (t.ward.indexOf('ICU') >= 0 ? 'red' : 'blue') + '">' + t.ward + '</span></td>',
          '  <td style="font-weight:600;color:#2563eb;">' + t.vet + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + t.protocol + '</td>',
          '  <td style="font-family:monospace;color:#475569;">Day ' + t.days + '</td>',
          '  <td style="font-weight:700;color:#16a34a;font-family:monospace;">' + t.progress + '</td>',
          '  <td><span class="zvs-tag ' + (t.status === 'Discharge Ready' ? 'green' : 'blue') + '">' + t.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderVaccinations() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Vaccines Administered MTD</span><span class="zvs-kpi-icon">💉</span></div><div class="zvs-kpi-val">482 Doses</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +8.6% MoM</span><span class="zvs-subtext">Core & lifestyle schedule</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Cold-Chain Adherence</span><span class="zvs-kpi-icon">❄️</span></div><div class="zvs-kpi-val">98.4%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">SLA Met</span><span class="zvs-subtext">On-time start</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Booster Recall Rate</span><span class="zvs-kpi-icon">📲</span></div><div class="zvs-kpi-val">94.2%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">WhatsApp CRM</span><span class="zvs-subtext">Zero rabies lapse</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Digital Passports Issued</span><span class="zvs-kpi-icon">🛡️</span></div><div class="zvs-kpi-val">1,840 Certs</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">QR signed</span><span class="zvs-subtext">Tamper-proof pass</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Official Immunization Registry & Cold-Chain Vials</h3><p class="zvs-card-sub">Biological product lot tracking, refrigeration temperature logs, and expiry management</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Cert ID</th><th>Pet & Species</th><th>Vaccine Product</th><th>Batch / Lot No</th><th>Date</th><th>Next Booster</th><th>Cold Chain</th><th>Status</th></tr></thead>',
      '      <tbody>',
      VACCINATIONS.map(function (v) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + v.id + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + v.pet + ' <span style="font-size:11px;color:#64748b;">(' + v.species + ')</span></td>',
          '  <td style="font-weight:600;color:#0f172a;">' + v.vaccine + '</td>',
          '  <td style="font-family:monospace;color:#334155;">' + v.batch + '</td>',
          '  <td style="color:#475569;">' + v.date + '</td>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + v.nextDue + '</td>',
          '  <td><span class="zvs-tag cyan">❄️ ' + v.temp + '</span></td>',
          '  <td><span class="zvs-tag ' + (v.cert === 'Issued' ? 'green' : 'yellow') + '">' + v.cert + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderDiagnostics() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Tests Processed MTD</span><span class="zvs-kpi-icon">🔬</span></div><div class="zvs-kpi-val">1,420 Tests</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +16.8% YoY</span><span class="zvs-subtext">In-house analyzers</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Turnaround Time</span><span class="zvs-kpi-icon">⏱️</span></div><div class="zvs-kpi-val">21.5 mins</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Point-of-care</span><span class="zvs-subtext">Fast dry biochemistry</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Critical Lab Alerts</span><span class="zvs-kpi-icon">⚠️</span></div><div class="zvs-kpi-val">18 Alerts</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Escalated</span><span class="zvs-subtext">Doctor notified</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Digital Imaging Usage</span><span class="zvs-kpi-icon">🩻</span></div><div class="zvs-kpi-val">98.2%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">PACS Synced</span><span class="zvs-subtext">Direct cloud DICOM</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Clinical Lab Pipeline & Imaging Orders</h3><p class="zvs-card-sub">Hematology analyzers, dry chemistry rotors, radiography, and pathologist validations</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Order ID</th><th>Pet & Patient</th><th>Investigation / Panel</th><th>Modality</th><th>Referral Vet</th><th>Turnaround</th><th>Findings</th><th>Status</th></tr></thead>',
      '      <tbody>',
      DIAGNOSTICS.map(function (d) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + d.id + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + d.pet + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + d.test + '</td>',
          '  <td><span class="zvs-tag ' + (d.modality === 'Biochemistry' ? 'green' : d.modality === 'Ultrasound' ? 'purple' : 'blue') + '">' + d.modality + '</span></td>',
          '  <td style="color:#475569;">' + d.vet + '</td>',
          '  <td style="font-family:monospace;color:#334155;">' + d.tat + '</td>',
          '  <td><span class="zvs-tag ' + (d.flag.indexOf('High') >= 0 ? 'red' : 'yellow') + '">' + d.flag + '</span></td>',
          '  <td><span class="zvs-tag ' + (d.status === 'Report Signed' ? 'green' : 'blue') + '">' + d.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderProcedures() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgeries Today</span><span class="zvs-kpi-icon">✂️</span></div><div class="zvs-kpi-val">14 Surgeries</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">+2 over plan</span><span class="zvs-subtext">6 sterile OTs active</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">OT Theater Utilization</span><span class="zvs-kpi-icon">🏥</span></div><div class="zvs-kpi-val">88.4%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Peak Cap</span><span class="zvs-subtext">Zero idle gap</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Anesthesia Safety Record</span><span class="zvs-kpi-icon">🫁</span></div><div class="zvs-kpi-val">99.98%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ Multi-parameter monitoring</span><span class="zvs-subtext">Capnography & ECG logging</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgical Infection Rate</span><span class="zvs-kpi-icon">🛡️</span></div><div class="zvs-kpi-val">98.4%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">SLA Met</span><span class="zvs-subtext">On-time start</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Live Surgical Theater Manifest & Operation Log</h3><p class="zvs-card-sub">Sterile theater assignments, procedure duration, lead surgeon, and anesthesia protocols</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Surgical ID</th><th>Patient</th><th>Procedure Details</th><th>Theater</th><th>Lead Surgeon</th><th>Duration</th><th>Anesthesia</th><th>Status</th></tr></thead>',
      '      <tbody>',
      PROCEDURES.map(function (p) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#2563eb;font-family:monospace;">' + p.id + '</td>',
          '  <td style="font-weight:700;color:#0f172a;">' + p.patient + '</td>',
          '  <td style="font-weight:600;color:#0f172a;">' + p.procedure + '</td>',
          '  <td><span class="zvs-tag blue">' + p.theater + '</span></td>',
          '  <td style="font-weight:600;color:#2563eb;">' + p.surgeon + '</td>',
          '  <td style="font-family:monospace;color:#475569;">' + p.duration + '</td>',
          '  <td style="font-size:11px;color:#334155;">' + p.anesthesia + '</td>',
          '  <td><span class="zvs-tag ' + (p.status === 'Completed' ? 'green' : p.status === 'In Procedure' ? 'red' : 'yellow') + '">' + p.status + '</span></td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderRevenue() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Gross Clinical Revenue</span><span class="zvs-kpi-icon">💰</span></div><div class="zvs-kpi-val">₹1.48 Cr</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +18.4% MoM</span><span class="zvs-subtext">100% collected</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Avg Revenue per Case</span><span class="zvs-kpi-icon">💳</span></div><div class="zvs-kpi-val">₹8,050</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +4.2% YoY</span><span class="zvs-subtext">Blended realization</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Surgery Billings</span><span class="zvs-kpi-icon">✂️</span></div><div class="zvs-kpi-val">₹61.20 L</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">41.3% share</span><span class="zvs-subtext">High value surgery</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Collection Rate</span><span class="zvs-kpi-icon">🎯</span></div><div class="zvs-kpi-val">98.4%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">SLA Met</span><span class="zvs-subtext">On-time start</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Clinical Revenue Breakdown by Medical Specialty</h3><p class="zvs-card-sub">Monthly procedure billings, case volumes, and average case realizations</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Specialty</th><th>Monthly Billings</th><th>Cases</th><th>Avg Realization (AOV)</th><th>Share of Clinical Billings</th><th>Gross Margin</th></tr></thead>',
      '      <tbody>',
      REVENUE_DATA.map(function (r) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + r.specialty + '</td>',
          '  <td style="font-weight:700;color:#16a34a;font-family:monospace;">' + r.rev + '</td>',
          '  <td style="font-family:monospace;color:#334155;">' + r.cases + '</td>',
          '  <td style="color:#64748b;font-family:monospace;">' + r.aov + '</td>',
          '  <td style="font-weight:600;color:#2563eb;">' + r.share + '</td>',
          '  <td style="font-weight:700;color:#16a34a;">' + r.margin + '</td>',
          '</tr>'
        ].join('');
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function renderProfitability() {
    return [
      '<div class="zvs-kpi-grid">',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Blended Gross Margin</span><span class="zvs-kpi-icon">📈</span></div><div class="zvs-kpi-val">60.3%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +2.8% YoY</span><span class="zvs-subtext">Benchmark: 55.0%</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Clinical Gross Profit</span><span class="zvs-kpi-icon">💰</span></div><div class="zvs-kpi-val">₹89.20 L</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">↑ +19.4% MoM</span><span class="zvs-subtext">From ₹1.48 Cr revenue</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">Doctor Commission Split</span><span class="zvs-kpi-icon">👨‍⚕️</span></div><div class="zvs-kpi-val">15.2%</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">Accretive</span><span class="zvs-subtext">Incentive aligned</span></div></div>',
      '  <div class="zvs-kpi"><div class="zvs-kpi-top"><span class="zvs-kpi-label">EBITDA Contribution</span><span class="zvs-kpi-icon">💎</span></div><div class="zvs-kpi-val">₹48.60 L</div><div class="zvs-kpi-bottom"><span class="zvs-delta up">32.8% Net</span><span class="zvs-subtext">Operating EBITDA</span></div></div>',
      '</div>',

      '<div class="zvs-card">',
      '  <div class="zvs-card-head"><div><h3 class="zvs-card-title">Clinical Unit Economics & Direct Expense Margins</h3><p class="zvs-card-sub">Contribution profit per clinical line after surgeon fees, anesthesia gases, implants, and consumables</p></div></div>',
      '  <div class="zvs-table-wrap">',
      '    <table class="zvs-table">',
      '      <thead><tr><th>Service Line</th><th>Revenue</th><th>Direct Cost / COGS</th><th>Gross Profit</th><th>Margin %</th><th>Margin Tier</th></tr></thead>',
      '      <tbody>',
      PROFIT_DATA.map(function (p) {
        return [
          '<tr>',
          '  <td style="font-weight:700;color:#0f172a;">' + p.service + '</td>',
          '  <td style="font-weight:600;color:#0f172a;font-family:monospace;">' + p.rev + '</td>',
          '  <td style="color:#dc2626;font-family:monospace;">' + p.cogs + '</td>',
          '  <td style="font-weight:700;color:#16a34a;font-family:monospace;">' + p.profit + '</td>',
          '  <td style="font-weight:700;color:#2563eb;">' + p.margin + '</td>',
          '  <td><span class="zvs-tag ' + (p.tier.indexOf('Highest') >= 0 ? 'green' : 'blue') + '">' + p.tier + '</span></td>',
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
    var cnsSearch = root.querySelector('#zvs-cns-search');
    if (cnsSearch) {
      cnsSearch.oninput = function () {
        S.searchQuery = cnsSearch.value;
        renderTabContent();
        var newInp = root.querySelector('#zvs-cns-search');
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      };
    }
  }

  /* ── Modals & Actions ─────────────────────────────────────────────── */
  function showBookModal() {
    var modal = document.createElement('div');
    modal.className = 'zvs-modal-backdrop';
    modal.innerHTML = [
      '<div class="zvs-modal-box">',
      '  <div class="zvs-modal-head">',
      '    <h3>🩺 Book Veterinary Appointment</h3>',
      '    <button type="button" class="zvs-btn-close" id="vm-close">✕</button>',
      '  </div>',
      '  <div class="zvs-modal-body">',
      '    <div class="zvs-form-group"><label class="zvs-label">Pet Parent Name & Phone</label><input class="zvs-input" id="vm-parent" placeholder="e.g. Shalini Roy (98765-43210)" required style="width:100%;"></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Pet Companion Details (Breed & Age)</label><input class="zvs-input" id="vm-pet" placeholder="e.g. Bruno (Labrador, 3 years)" required style="width:100%;"></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Hospital Branch</label><select class="zvs-select" id="vm-clinic" style="width:100%;"><option value="Koramangala Pet Hospital">Koramangala Pet Hospital (BLR)</option><option value="Indiranagar Care Center">Indiranagar Care Center (BLR)</option><option value="Whitefield Specialty OT">Whitefield Specialty OT (BLR)</option><option value="Bandra West Super-Clinic">Bandra West Super-Clinic (BOM)</option><option value="Gurugram Central Hospital">Gurugram Central Hospital (DEL)</option></select></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Consulting Veterinarian</label><select class="zvs-select" id="vm-doc" style="width:100%;"><option value="Dr. Priya Sharma">Dr. Priya Sharma (General Medicine)</option><option value="Dr. Rahul Mehta">Dr. Rahul Mehta (Orthopedic Surgeon)</option><option value="Dr. Aisha Khan">Dr. Aisha Khan (Feline Specialist)</option><option value="Dr. Karan Patel">Dr. Karan Patel (Dermatologist)</option><option value="Dr. Neha Singh">Dr. Neha Singh (Cardiologist)</option></select></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Reason for Visit / Chief Complaint</label><input class="zvs-input" id="vm-reason" placeholder="e.g. Annual vaccination booster & ear checkup" required style="width:100%;"></div>',
      '  </div>',
      '  <div class="zvs-modal-foot">',
      '    <button type="button" class="zvs-btn zvs-btn-secondary" id="vm-cancel">Cancel</button>',
      '    <button type="button" class="zvs-btn zvs-btn-primary" id="vm-save">Confirm Booking</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#vm-close').onclick = closeM;
    modal.querySelector('#vm-cancel').onclick = closeM;
    modal.querySelector('#vm-save').onclick = function () {
      var p = document.getElementById('vm-parent').value;
      var pet = document.getElementById('vm-pet').value;
      var c = document.getElementById('vm-clinic').value;
      var d = document.getElementById('vm-doc').value;
      var r = document.getElementById('vm-reason').value;
      if (!p || !pet) { alert('Please enter pet parent and pet companion details.'); return; }

      APPOINTMENTS.unshift({
        id: 'APT-' + (1050 + APPOINTMENTS.length),
        time: 'Just Now',
        pet: pet,
        parent: p,
        doctor: d,
        clinic: c,
        service: r || 'General Clinical Consultation',
        type: 'Express Booking',
        status: 'Confirmed'
      });

      showToast('Appointment booked for ' + pet + '! Slot confirmed.');
      closeM();
      switchTab('appointments');
    };
  }

  function showLabModal() {
    var modal = document.createElement('div');
    modal.className = 'zvs-modal-backdrop';
    modal.innerHTML = [
      '<div class="zvs-modal-box">',
      '  <div class="zvs-modal-head">',
      '    <h3>🔬 Order In-House Diagnostic Panel</h3>',
      '    <button type="button" class="zvs-btn-close" id="lm-close">✕</button>',
      '  </div>',
      '  <div class="zvs-modal-body">',
      '    <div class="zvs-form-group"><label class="zvs-label">Pet Name & ID</label><input class="zvs-input" id="lm-pet" placeholder="e.g. Bruno (Golden Retriever - #PET-920)" required style="width:100%;"></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Diagnostic Investigation</label><select class="zvs-select" id="lm-test" style="width:100%;"><option value="18-Parameter Biochemistry + Electrolytes">18-Parameter Biochemistry + Electrolytes</option><option value="Complete Blood Count (CBC) with Reticulocytes">Complete Blood Count (CBC) with Reticulocytes</option><option value="Digital Abdominal Ultrasonography (Full Doppler)">Digital Abdominal Ultrasonography (Full Doppler)</option><option value="Orthopedic Digital Radiography (DR X-Ray)">Orthopedic Digital Radiography (DR X-Ray)</option><option value="Echocardiography & Color Doppler">Echocardiography & Color Doppler</option><option value="Rapid CPV / CCV Antigen PCR Immunoassay">Rapid CPV / CCV Antigen PCR Immunoassay</option></select></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Ordering Clinician</label><select class="zvs-select" id="lm-vet" style="width:100%;"><option value="Dr. Priya Sharma">Dr. Priya Sharma</option><option value="Dr. Rahul Mehta">Dr. Rahul Mehta</option><option value="Dr. Aisha Khan">Dr. Aisha Khan</option><option value="Dr. Karan Patel">Dr. Karan Patel</option><option value="Dr. Neha Singh">Dr. Neha Singh</option></select></div>',
      '    <div class="zvs-form-group"><label class="zvs-label">Clinical Indication & Urgency</label><input class="zvs-input" id="lm-urgency" placeholder="e.g. Pre-anesthetic screening / Stat acute renal" required style="width:100%;"></div>',
      '  </div>',
      '  <div class="zvs-modal-foot">',
      '    <button type="button" class="zvs-btn zvs-btn-secondary" id="lm-cancel">Cancel</button>',
      '    <button type="button" class="zvs-btn zvs-btn-primary" id="lm-save">Dispatch to Lab</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    function closeM() { modal.remove(); }
    modal.querySelector('#lm-close').onclick = closeM;
    modal.querySelector('#lm-cancel').onclick = closeM;
    modal.querySelector('#lm-save').onclick = function () {
      var pet = document.getElementById('lm-pet').value;
      var test = document.getElementById('lm-test').value;
      var vet = document.getElementById('lm-vet').value;
      if (!pet) { alert('Please enter pet name.'); return; }

      DIAGNOSTICS.unshift({
        id: 'LAB-' + (5110 + DIAGNOSTICS.length),
        pet: pet,
        test: test,
        modality: test.indexOf('CBC') >= 0 ? 'Hematology' : test.indexOf('Radiography') >= 0 ? 'Digital X-Ray' : test.indexOf('Ultra') >= 0 ? 'Ultrasound' : 'Biochemistry',
        vet: vet,
        tat: '30 mins',
        flag: 'Sample in Processing',
        status: 'Processing'
      });

      showToast('Lab test ' + test + ' ordered for ' + pet + '!');
      closeM();
      switchTab('diagnostics');
    };
  }

  function exportTabCSV() {
    var curMod = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Zenve BI Veterinary Services Intelligence Export - " + curMod.label + "\n";
    csvContent += "Export Date: " + new Date().toISOString() + "\n\n";

    if (S.tab === 'consultations') {
      csvContent += "ID,Pet,Parent,Doctor,Specialty,Mode,Diagnosis,Fee,Status\n";
      CONSULTATIONS.forEach(function (c) {
        csvContent += [c.id, '"' + c.pet + '"', '"' + c.parent + '"', '"' + c.doctor + '"', c.specialty, c.mode, '"' + c.diagnosis + '"', c.fee, c.status].join(',') + "\n";
      });
    } else if (S.tab === 'appointments') {
      csvContent += "ID,Time,Pet,Parent,Doctor,Clinic,Service,Status\n";
      APPOINTMENTS.forEach(function (a) {
        csvContent += [a.id, a.time, '"' + a.pet + '"', '"' + a.parent + '"', '"' + a.doctor + '"', '"' + a.clinic + '"', '"' + a.service + '"', a.status].join(',') + "\n";
      });
    } else {
      csvContent += "Specialty,Billings,Cases,AOV,Share,Margin\n";
      REVENUE_DATA.forEach(function (r) {
        csvContent += ['"' + r.specialty + '"', r.rev, r.cases, r.aov, r.share, r.margin].join(',') + "\n";
      });
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "zenve_veterinary_" + S.tab + "_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Downloaded ' + curMod.label + ' CSV report.');
  }

  function showToast(msg) {
    var toast = document.createElement('div');
    toast.className = 'zvs-toast';
    toast.innerHTML = '<span>🩺</span><span>' + msg + '</span>';
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3200);
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
    var targetHash = (MODULES.find(function (m) { return m.id === S.tab; }) || {}).hash || '#services-dashboard';
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
        b.classList.toggle('zvs-active', on && bTab === targetTab);
      }
    });
  }

  function close() {
    if (root) root.classList.remove('zpanel-open');
    S.open = false;
    markSidebar(false);
    var h = window.location.hash;
    if (h.startsWith('#services') || h.startsWith('#consult') || h.startsWith('#appoint') || h.startsWith('#treat') || h.startsWith('#vaccin') || h.startsWith('#diagnos') || h.startsWith('#procedure')) {
      try { history.pushState(null, '', window.location.pathname + window.location.search); } catch (e) { }
    }
  }

  function switchTab(tab) {
    if (!tab) return;
    S.tab = tab;
    markSidebar(true, tab);
    var targetHash = (MODULES.find(function (m) { return m.id === tab; }) || {}).hash || '#services-dashboard';
    if (window.location.hash !== targetHash) {
      try { history.pushState(null, '', targetHash); } catch (e) { window.location.hash = targetHash; }
    }
    render();
  }

  function init() {
    root = document.getElementById('zvs-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zvs-root';
      root.className = 'zpanel-root zvs-root';
      document.body.appendChild(root);
    }
  }

  /* ── Interceptor for Sidebar ──────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    if (t.closest('[aria-expanded]') || t.closest('button[aria-expanded]') || t.closest('[aria-label="Search menu"]')) return;

    var item = t.closest('button, [data-go], a, [role="button"], li');
    if (item && item.textContent) {
      var txt = item.textContent.trim();
      var tab = tabFromText(txt);

      // Verify item belongs under Veterinary Services or global matching
      if (tab) {
        var parentUl = item.closest('ul');
        var groupBtn = parentUl ? parentUl.previousElementSibling : null;
        var groupText = groupBtn ? (groupBtn.textContent || '') : '';
        // If explicitly under another category, ignore
        if (groupText && groupText.indexOf('Veterinary') === -1 && groupText.indexOf('Services') === -1 && !t.closest('#zvs-root')) {
          // If not Veterinary Services header, continue only if unique tab
          if (tab !== 'consultations' && tab !== 'treatments' && tab !== 'vaccinations' && tab !== 'diagnostics' && tab !== 'procedures') {
            return;
          }
        }

        if (!t.closest('#zvs-root')) {
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
    } else if (S.open && !window.location.hash.startsWith('#services') && !window.location.hash.startsWith('#consult') && !window.location.hash.startsWith('#appoint') && !window.location.hash.startsWith('#treat') && !window.location.hash.startsWith('#vaccin') && !window.location.hash.startsWith('#diagnos') && !window.location.hash.startsWith('#procedure')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenveVeterinaryDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    showBookModal: showBookModal,
    showLabModal: showLabModal,
    exportTabCSV: exportTabCSV
  };

  // Auto-launch if hash matches
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      var tab = tabFromHash(window.location.hash);
      if (tab) setTimeout(function () { open(tab); }, 300);
    });
  } else {
    var tab = tabFromHash(window.location.hash);
    if (tab) setTimeout(function () { open(tab); }, 300);
  }
})();
