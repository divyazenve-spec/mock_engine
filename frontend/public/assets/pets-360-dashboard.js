/* =====================================================================
   Zenve BI — Pets 360° Executive Control Center
   Sidebar: Pets 360° Suite (9 Subcategories)
   Pure Light Executive Design System
   ===================================================================== */

(function () {
  'use strict';

  var MODULES = [
    { id: 'all-pets', label: 'All Pets', icon: '🐕', hash: '#all-pets', title: 'Master Pet Registry & Census', sub: 'Comprehensive database of registered companion animals, pet parents, microchip IDs, and longitudinal health statuses' },
    { id: 'pet-profiles', label: 'Pet Profiles', icon: '📋', hash: '#pet-profiles', title: 'Longitudinal Pet Profiles & Biometrics', sub: 'Holistic biometric identifiers, ownership records, insurance policies, clinical notes, and nutritional profiles' },
    { id: 'pet-health-records', label: 'Pet Health Records', icon: '🩺', hash: '#pet-health-records', title: 'Electronic Health Records (EHR) & Clinical Timeline', sub: 'Longitudinal medical history, physical examination findings, vital signs trends, and clinical diagnosis logs' },
    { id: 'vaccination-records', label: 'Vaccination Records', icon: '💉', hash: '#vaccination-records', title: 'Digital Vaccination Passports & Biological Records', sub: 'Verifiable immunization records, vaccine manufacturer lot tracing, expiry recalls, and digital health passports' },
    { id: 'treatment-history', label: 'Treatment History', icon: '💊', hash: '#treatment-history', title: 'Inpatient Protocols, ICU & Surgical Recovery Logs', sub: 'Historical treatment regimens, emergency interventions, surgical procedures, and discharge outcome tracking' },
    { id: 'prescription-history', label: 'Prescription History', icon: '🧪', hash: '#prescription-history', title: 'Veterinary Rx & Medication Dispensation History', sub: 'Digital prescription records, pharmaceutical dosages, chronic maintenance refills, and drug interaction audits' },
    { id: 'purchase-history', label: 'Purchase History', icon: '🛍️', hash: '#purchase-history', title: 'Pet Nutrition, Pharmacy & Merchandise Purchases', sub: 'Complete ledger of food, prescription diets, tick & flea treatments, and accessories purchased across omni-channels' },
    { id: 'pet-analytics', label: 'Pet Analytics', icon: '📊', hash: '#pet-analytics', title: 'Population Demographics & Epidemiological Analytics', sub: 'Species segmentation, breed distribution, age cohort epidemiology, and preventive wellness indices' },
    { id: 'pet-health-insights', label: 'Pet Health Insights', icon: '🧠', hash: '#pet-health-insights', title: 'Zenve AI Pet Health Intelligence & Predictive Insights', sub: 'Epidemiological signal detection, breed health risk surveillance, preventive reminders, and clinical wellness alerts' }
  ];

  var S = {
    open: false,
    tab: 'all-pets',
    searchQuery: '',
    filterVal: 'ALL'
  };

  var root = null;

  /* ── Master Mock Datasets (10 Records Each for All Sub-Domains) ──── */
  var PETS = [
    { id: 'PET-101', name: 'Max', species: 'Canine', breed: 'Golden Retriever', age: '3 yrs 2 mos', dob: 'Nov 2021', gender: 'Neutered Male', weight: '32.4 kg (Optimal)', color: 'Dark Golden', parent: 'Priya Sharma', phone: '+91 98450 12345', email: 'priya.sharma@gmail.com', city: 'Bengaluru (Indiranagar)', address: '12th Main, HAL 2nd Stage, Indiranagar', clinic: 'Zenve Koramangala Super Clinic', primaryVet: 'Dr. Tanya S. (BVSc & AH)', healthScore: 94, vaxStatus: 'Up to Date', microchip: '982000412891201', diet: 'Royal Canin Maxi Adult (380g/day) + Salmon Omega-3', allergies: 'Chicken byproduct (mild contact pruritus)', notes: 'Bilateral hip palpation clear; teeth pristine post annual scaling; cardiac auscultation grade 0.', insurance: 'PetCover Gold Shield (#PCG-881920)', avatar: '🐕' },
    { id: 'PET-102', name: 'Bella', species: 'Feline', breed: 'Persian Longhair', age: '2 yrs 4 mos', dob: 'Sep 2022', gender: 'Spayed Female', weight: '4.1 kg (Ideal)', color: 'Pure White / Copper Eyes', parent: 'Rahul Verma', phone: '+91 97312 98765', email: 'rahul.verma@techmail.com', city: 'Bengaluru (Koramangala)', address: '4th Block, Koramangala, Bengaluru', clinic: 'Zenve Koramangala Super Clinic', primaryVet: 'Dr. Vikram Rao (Feline Specialist)', healthScore: 91, vaxStatus: 'Up to Date', microchip: '982000412891202', diet: 'Royal Canin Persian Adult + Hairball Control Pastes', allergies: 'Synthetic flea collars (pyrethroid sensitivity)', notes: 'Feline renal SDMA normal; tear ducts flushed cleanly; coat combed without matting.', insurance: 'PawProtect Silver Plus (#PPS-331042)', avatar: '🐈' },
    { id: 'PET-103', name: 'Coco', species: 'Canine', breed: 'Shih Tzu', age: '1 yr 6 mos', dob: 'Jul 2023', gender: 'Intact Female', weight: '6.2 kg (Ideal)', color: 'Tri-color (Gold, White & Black)', parent: 'Ananya Iyer', phone: '+91 99001 54321', email: 'ananya.iyer@outlook.com', city: 'Bengaluru (HSR Layout)', address: 'Sector 2, HSR Layout, Bengaluru', clinic: 'Zenve HSR Clinic & Spa', primaryVet: 'Dr. Ananya Roy (Dermatology)', healthScore: 89, vaxStatus: 'Due in 14d', microchip: '982000412891203', diet: 'Farmina N&D Small Breed Pumpkin & Lamb', allergies: 'Pollen seasonal allergic contact dermatitis', notes: 'Ear canal cytology clear of Malassezia; patellar score Grade 0 bilaterally.', insurance: 'Care4Pets Shield (#C4P-552910)', avatar: '🐕' },
    { id: 'PET-104', name: 'Rocky', species: 'Canine', breed: 'German Shepherd', age: '4 yrs 1 mo', dob: 'Dec 2020', gender: 'Neutered Male', weight: '38.6 kg (Athletic)', color: 'Black & Tan Saddle', parent: 'Vikram Malhotra', phone: '+91 98860 11223', email: 'v.malhotra@corp.in', city: 'Bengaluru (Whitefield)', address: 'Prestige Ozone, Whitefield, Bengaluru', clinic: 'Zenve Whitefield Specialty Hospital', primaryVet: 'Dr. Rajesh Patel (Orthopedic Surgeon)', healthScore: 92, vaxStatus: 'Up to Date', microchip: '982000412891204', diet: 'Taste of the Wild High Prairie + Joint Synovial Chews', allergies: 'Wheat gluten & corn meal fillers', notes: 'Right TPLO surgical follow-up shows 100% bone union; gait symmetrical on pressure plate.', insurance: 'Zenve Elite Lifetime (#ZEL-109284)', avatar: '🐕' },
    { id: 'PET-105', name: 'Milo', species: 'Canine', breed: 'Beagle', age: '2 yrs 8 mos', dob: 'May 2022', gender: 'Neutered Male', weight: '14.2 kg (BCS 5)', color: 'Classic Tri-color Hound', parent: 'Deepika Nair', phone: '+91 96118 77665', email: 'deepika.nair@biotech.res', city: 'Bengaluru (Jayanagar)', address: '4th T Block, Jayanagar, Bengaluru', clinic: 'Zenve Jayanagar Clinic', primaryVet: 'Dr. Priya Desai (Internal Medicine)', healthScore: 86, vaxStatus: 'Up to Date', microchip: '982000412891205', diet: 'Hill\'s Science Diet Light Adult (Caloric Controlled)', allergies: 'Beef liver jerky treats', notes: 'Weight successfully lowered from 15.4 kg to 14.2 kg; fasting glucose 88 mg/dL.', insurance: 'PetCover Gold Shield (#PCG-882411)', avatar: '🐕' },
    { id: 'PET-106', name: 'Leo', species: 'Canine', breed: 'Labrador Retriever', age: '5 yrs 3 mos', dob: 'Oct 2019', gender: 'Neutered Male', weight: '34.8 kg (Ideal)', color: 'Chocolate Brown', parent: 'Siddharth Rao', phone: '+91 94480 33445', email: 'sid.rao@fintech.io', city: 'Bengaluru (JP Nagar)', address: 'Brigade Millennium, JP Nagar 7th Phase', clinic: 'Zenve Jayanagar Clinic', primaryVet: 'Dr. Tanya S. (BVSc & AH)', healthScore: 90, vaxStatus: 'Up to Date', microchip: '982000412891206', diet: 'Orijen Six Fish Grain-Free + Glucosamine-Chondroitin', allergies: 'Soy protein isolate', notes: 'Cardiorespiratory stamina excellent; routine ultrasound clean; thyroid profile T4 normal.', insurance: 'PawProtect Silver Plus (#PPS-338901)', avatar: '🐕' },
    { id: 'PET-107', name: 'Luna', species: 'Canine', breed: 'Siberian Husky', age: '3 yrs 0 mos', dob: 'Jan 2022', gender: 'Spayed Female', weight: '21.5 kg (Lean)', color: 'Silver & White / Bi-eyed', parent: 'Kavita Menon', phone: '+91 98200 66778', email: 'kavita.menon@designhub.in', city: 'Bengaluru (Bellandur)', address: 'Green Glen Layout, Bellandur, Bengaluru', clinic: 'Zenve HSR Clinic & Spa', primaryVet: 'Dr. Ananya Roy (Dermatology)', healthScore: 93, vaxStatus: 'Up to Date', microchip: '982000412891207', diet: 'Acana Wild Prairie + Zinc Methionine Supplements', allergies: 'Humid heat rash (prescribed cool indoor climate)', notes: 'Dermal barrier reinforced with ceramide shampoos; coat density optimal.', insurance: 'Care4Pets Shield (#C4P-559021)', avatar: '🐕' },
    { id: 'PET-108', name: 'Simba', species: 'Canine', breed: 'Indie Hound Cross', age: '1 yr 2 mos', dob: 'Nov 2023', gender: 'Neutered Male', weight: '18.2 kg (Vigorous)', color: 'Fawn & Tan Short Coat', parent: 'Arjun Kapoor', phone: '+91 97401 22334', email: 'arjun.k@venturecap.co', city: 'Bengaluru (Sadashivnagar)', address: 'Armane Nagar, Sadashivnagar, Bengaluru', clinic: 'Zenve Central Animal Hospital', primaryVet: 'Dr. Tanya S. (BVSc & AH)', healthScore: 97, vaxStatus: 'Up to Date', microchip: '982000412891208', diet: 'Fresh Home-cooked Chicken, Rice, Pumpkin & Bone Broth', allergies: 'None known (robust native immunity)', notes: 'Complete vaccination series finalized; CBC parameters perfect; high athletic stamina.', insurance: 'Zenve Elite Lifetime (#ZEL-104920)', avatar: '🐕' },
    { id: 'PET-109', name: 'Oreo', species: 'Canine', breed: 'French Bulldog', age: '2 yrs 1 mo', dob: 'Dec 2022', gender: 'Intact Male', weight: '11.8 kg (Stocky)', color: 'Black & White Pied', parent: 'Meera Nambiar', phone: '+91 96325 88990', email: 'meera.nambiar@gmail.com', city: 'Bengaluru (Hebbal)', address: 'Godrej Woodsman Estate, Hebbal, Bengaluru', clinic: 'Zenve Central Animal Hospital', primaryVet: 'Dr. Rajesh Patel (Airway Specialist)', healthScore: 88, vaxStatus: 'Due in 14d', microchip: '982000412891209', diet: 'Royal Canin French Bulldog Adult + Digest Zen', allergies: 'Dust mites & synthetic room fragrances', notes: 'Stenotic nares evaluate BOAS Grade 1 (mild); soft palate unobstructed; no exercise distress.', insurance: 'PetCover Gold Shield (#PCG-889102)', avatar: '🐕' },
    { id: 'PET-110', name: 'Bruno', species: 'Canine', breed: 'Rottweiler', age: '3 yrs 6 mos', dob: 'Jul 2021', gender: 'Neutered Male', weight: '46.2 kg (Powerful)', color: 'Mahogany & Black', parent: 'Rohan Gupta', phone: '+91 98110 44556', email: 'rohan.g@startupnest.in', city: 'Bengaluru (Electronic City)', address: 'Neeladri Nagar, Phase 1, Electronic City', clinic: 'Zenve Koramangala Super Clinic', primaryVet: 'Dr. Rajesh Patel (Orthopedic Surgeon)', healthScore: 91, vaxStatus: 'Up to Date', microchip: '982000412891210', diet: 'Farmina N&D Maxi Pumpkin, Lamb & Blueberry + Joint Chews', allergies: 'Dairy milk proteins (lactose intolerant)', notes: 'Elbow dysplasia screen clear; cardiac echo verified 0 murmur; temperament calm.', insurance: 'Zenve Elite Lifetime (#ZEL-108845)', avatar: '🐕' }
  ];

  var HEALTH_RECORDS = [
    { id: 'EHR-8801', date: '10 Oct 2026', pet: 'Max (Golden Retriever)', type: 'Annual Wellness & ECG', vitals: 'Temp: 38.6°C • HR: 88 bpm • Wt: 32.4 kg', diagnosis: 'Comprehensive Wellness Clearance', notes: 'Cardiac ECG shows normal sinus rhythm; dentition Grade 0; clear corneas.', vet: 'Dr. Tanya S.', status: 'Resolved' },
    { id: 'EHR-8802', date: '08 Oct 2026', pet: 'Bella (Persian Cat)', type: 'Renal Biomarker Screening', vitals: 'Temp: 38.2°C • HR: 140 bpm • Wt: 4.1 kg', diagnosis: 'Feline Renal SDMA Normal Screening', notes: 'Creatinine 1.2 mg/dL, SDMA 9 ug/dL (Well below reference threshold of 14).', vet: 'Dr. Vikram Rao', status: 'Resolved' },
    { id: 'EHR-8803', date: '05 Oct 2026', pet: 'Coco (Shih Tzu)', type: 'Dermatology Cytology Exam', vitals: 'Temp: 38.4°C • HR: 110 bpm • Wt: 6.2 kg', diagnosis: 'Mild Atopic Allergic Pruritus', notes: 'Tape strip cytology confirmed zero yeast; prescribed hypoallergenic chlorhexidine rinse.', vet: 'Dr. Ananya Roy', status: 'Under Regimen' },
    { id: 'EHR-8804', date: '01 Oct 2026', pet: 'Rocky (German Shepherd)', type: 'Orthopedic Digital Radiography', vitals: 'Temp: 38.5°C • HR: 76 bpm • Wt: 38.6 kg', diagnosis: 'Post-TPLO 12-Month Osseous Consolidation', notes: 'Digital X-ray confirms 100% cortical bridging; full weight bearing on hindlimb.', vet: 'Dr. Rajesh Patel', status: 'Resolved' },
    { id: 'EHR-8805', date: '28 Sep 2026', pet: 'Milo (Beagle)', type: 'Metabolic & Thyroid Evaluation', vitals: 'Temp: 38.7°C • HR: 92 bpm • Wt: 14.2 kg', diagnosis: 'Canine Dietary Obesity - In Remission', notes: 'Loss of 1.2 kg achieved via portion control; fasting triglycerides normalized.', vet: 'Dr. Priya Desai', status: 'Under Regimen' },
    { id: 'EHR-8806', date: '25 Sep 2026', pet: 'Leo (Labrador Retriever)', type: 'Senior Wellness & Ultrasound', vitals: 'Temp: 38.3°C • HR: 80 bpm • Wt: 34.8 kg', diagnosis: 'Age-Appropriate Hepatosplenic Scan', notes: 'Abdominal ultrasound shows homogenous liver & spleen parenchyma; no cystic lesions.', vet: 'Dr. Tanya S.', status: 'Resolved' },
    { id: 'EHR-8807', date: '22 Sep 2026', pet: 'Luna (Siberian Husky)', type: 'Dermal Barrier Follow-up', vitals: 'Temp: 38.5°C • HR: 84 bpm • Wt: 21.5 kg', diagnosis: 'Seasonal Humidity Erythema Resolved', notes: 'Skin lesion completely epithelized; full hair regrowth noted on ventral abdomen.', vet: 'Dr. Ananya Roy', status: 'Resolved' },
    { id: 'EHR-8808', date: '18 Sep 2026', pet: 'Simba (Indie Hound)', type: 'Juvenile Vitality & Microchipping', vitals: 'Temp: 38.4°C • HR: 96 bpm • Wt: 18.2 kg', diagnosis: 'Juvenile Health Passport Certification', notes: 'ISO 11784 RFID transponder implanted in left interscapular space; verified with scanner.', vet: 'Dr. Tanya S.', status: 'Resolved' },
    { id: 'EHR-8809', date: '14 Sep 2026', pet: 'Oreo (French Bulldog)', type: 'Upper Airway BOAS Assessment', vitals: 'Temp: 38.8°C • HR: 104 bpm • Wt: 11.8 kg', diagnosis: 'BOAS Grade 1 (Stable Non-Surgical)', notes: 'Pharyngeal airway unobstructed; heat tolerance testing passed with 15-min trot.', vet: 'Dr. Rajesh Patel', status: 'Chronic Monitoring' },
    { id: 'EHR-8810', date: '10 Sep 2026', pet: 'Bruno (Rottweiler)', type: 'Cardiology Echo & Holter Screen', vitals: 'Temp: 38.5°C • HR: 72 bpm • Wt: 46.2 kg', diagnosis: 'Cardiovascular Clearance Screening', notes: 'Left ventricular fractional shortening 36% (Normal: 28-40%); zero premature contractions.', vet: 'Dr. Rajesh Patel', status: 'Resolved' }
  ];

  var VACCINATIONS = [
    { passId: 'VAX-901', pet: 'Max (Golden Retriever)', vaccine: 'Nobivac DHPPiL + Lepto 4', manufacturer: 'MSD Animal Health', batch: 'MSD-DH9821', administeredOn: '12 Jan 2026', nextDue: '12 Jan 2027', vet: 'Dr. Tanya S.', status: 'Valid Pass' },
    { passId: 'VAX-902', pet: 'Bella (Persian Cat)', vaccine: 'Felocell 4 (FVRCP + Chlamydia)', manufacturer: 'Zoetis Biologicals', batch: 'ZOE-FC4419', administeredOn: '14 Feb 2026', nextDue: '14 Feb 2027', vet: 'Dr. Vikram Rao', status: 'Valid Pass' },
    { passId: 'VAX-903', pet: 'Coco (Shih Tzu)', vaccine: 'Defensor 3 (Rabies Inactivated)', manufacturer: 'Zoetis Biologicals', batch: 'ZOE-RB8830', administeredOn: '25 Oct 2025', nextDue: '25 Oct 2026', vet: 'Dr. Ananya Roy', status: 'Due in 14d' },
    { passId: 'VAX-904', pet: 'Rocky (German Shepherd)', vaccine: 'Nobivac KC (Bordetella Intranasal)', manufacturer: 'MSD Animal Health', batch: 'MSD-KC1290', administeredOn: '04 Mar 2026', nextDue: '04 Mar 2027', vet: 'Dr. Rajesh Patel', status: 'Valid Pass' },
    { passId: 'VAX-905', pet: 'Milo (Beagle)', vaccine: 'Vanguard Plus 5/L (Canine Core)', manufacturer: 'Zoetis Biologicals', batch: 'ZOE-VG6620', administeredOn: '20 Apr 2026', nextDue: '20 Apr 2027', vet: 'Dr. Priya Desai', status: 'Valid Pass' },
    { passId: 'VAX-906', pet: 'Leo (Labrador Retriever)', vaccine: 'Nobivac Rabies (Monovalent 3-Yr)', manufacturer: 'MSD Animal Health', batch: 'MSD-RB7710', administeredOn: '18 May 2025', nextDue: '18 May 2027', vet: 'Dr. Tanya S.', status: 'Valid Pass' },
    { passId: 'VAX-907', pet: 'Luna (Siberian Husky)', vaccine: 'Nobivac DHPPiL (Core 7-in-1)', manufacturer: 'MSD Animal Health', batch: 'MSD-DH3342', administeredOn: '05 Jun 2026', nextDue: '05 Jun 2027', vet: 'Dr. Ananya Roy', status: 'Valid Pass' },
    { passId: 'VAX-908', pet: 'Simba (Indie Hound)', vaccine: 'Vanguard Plus 5/CV-L (9-in-1 Combo)', manufacturer: 'Zoetis Biologicals', batch: 'ZOE-VG9901', administeredOn: '08 Jul 2026', nextDue: '08 Jul 2027', vet: 'Dr. Tanya S.', status: 'Valid Pass' },
    { passId: 'VAX-909', pet: 'Oreo (French Bulldog)', vaccine: 'Nobivac Canine Parvovirus Pro', manufacturer: 'MSD Animal Health', batch: 'MSD-PV5520', administeredOn: '28 Oct 2025', nextDue: '28 Oct 2026', vet: 'Dr. Rajesh Patel', status: 'Due in 14d' },
    { passId: 'VAX-910', pet: 'Bruno (Rottweiler)', vaccine: 'Defensor 3 + Leptomune Booste', manufacturer: 'Zoetis Biologicals', batch: 'ZOE-DL8810', administeredOn: '15 Aug 2026', nextDue: '15 Aug 2027', vet: 'Dr. Rajesh Patel', status: 'Valid Pass' }
  ];

  var TREATMENTS = [
    { id: 'TRT-701', date: '04 Oct 2026', pet: 'Max (Golden Retriever)', condition: 'Supragingival Calculus & Tartar', procedure: 'Ultrasonic Piezo Dental Scaling & Fluoride Polish', duration: '45 mins (Day Care)', vet: 'Dr. Tanya S.', cost: '₹4,500', outcome: 'Resolved & Clean' },
    { id: 'TRT-702', date: '01 Oct 2026', pet: 'Bella (Persian Cat)', condition: 'Nasolacrimal Duct Hyper-Secretions', procedure: 'Atraumatic Tear Duct Hydro-Flushing', duration: '30 mins (Outpatient)', vet: 'Dr. Vikram Rao', cost: '₹2,800', outcome: 'Full Recovery' },
    { id: 'TRT-703', date: '28 Sep 2026', pet: 'Coco (Shih Tzu)', condition: 'Acute Grass Burr Foreign Body', procedure: 'Otoscopic Aural Extraction + Soothing Wash', duration: '20 mins (Outpatient)', vet: 'Dr. Ananya Roy', cost: '₹1,950', outcome: 'Resolved' },
    { id: 'TRT-704', date: '24 Sep 2026', pet: 'Rocky (German Shepherd)', condition: 'Right Hind Cranial Cruciate Rupture', procedure: 'Tibial Plateau Leveling Osteotomy (TPLO)', duration: '120 mins (2d ICU)', vet: 'Dr. Rajesh Patel', cost: '₹38,000', outcome: 'Discharged & Mobile' },
    { id: 'TRT-705', date: '20 Sep 2026', pet: 'Milo (Beagle)', condition: 'Dietary Indiscretion Vomiting', procedure: 'IV Ringer Lactate Hydration + Maropitant', duration: '4 hrs (Day Inpatient)', vet: 'Dr. Priya Desai', cost: '₹3,400', outcome: 'Fully Recovered' },
    { id: 'TRT-706', date: '15 Sep 2026', pet: 'Leo (Labrador Retriever)', condition: 'Bilateral Stifle Osteoarthritis', procedure: 'Intra-articular Hyaluronic Acid Infiltration', duration: '40 mins (Outpatient)', vet: 'Dr. Rajesh Patel', cost: '₹8,500', outcome: 'Discharged' },
    { id: 'TRT-707', date: '10 Sep 2026', pet: 'Luna (Siberian Husky)', condition: 'Interdigital Furunculosis', procedure: 'Warm Antiseptic Hydro-therapy & Debridement', duration: '25 mins (Outpatient)', vet: 'Dr. Ananya Roy', cost: '₹2,200', outcome: 'Resolved' },
    { id: 'TRT-708', date: '05 Sep 2026', pet: 'Simba (Indie Hound)', condition: 'Routine Population Control', procedure: 'Pre-Scrotal Closed Orchiectomy (Neutering)', duration: '35 mins (Day Care)', vet: 'Dr. Tanya S.', cost: '₹5,500', outcome: 'Full Recovery' },
    { id: 'TRT-709', date: '01 Sep 2026', pet: 'Oreo (French Bulldog)', condition: 'Stenotic Nares (Airway Narrowing)', procedure: 'CO2 Laser Wedge Rhinoplasty Resection', duration: '50 mins (Day Care)', vet: 'Dr. Rajesh Patel', cost: '₹14,000', outcome: 'Discharged & Clear' },
    { id: 'TRT-710', date: '25 Aug 2026', pet: 'Bruno (Rottweiler)', condition: 'Benign Histiocytoma on Left Flank', procedure: 'Cryosurgical Cryo-Probe Ablation', duration: '30 mins (Outpatient)', vet: 'Dr. Rajesh Patel', cost: '₹6,200', outcome: 'Resolved' }
  ];

  var PRESCRIPTIONS = [
    { id: 'RX-5501', date: '10 Oct 2026', pet: 'Max (Golden Retriever)', medicine: 'NexGard Spectra (15-30kg)', dosage: '1 Chewable Tablet monthly orally', indication: 'Heartworm & Tick Prevention', prescriber: 'Dr. Tanya S.', pharmacyStatus: 'Dispensed' },
    { id: 'RX-5502', date: '08 Oct 2026', pet: 'Bella (Persian Cat)', medicine: 'Revolution Plus Feline (2.5-5kg)', dosage: '1 Topical Pipette monthly transdermal', indication: 'Feline Ecto/Endoparasite Shield', prescriber: 'Dr. Vikram Rao', pharmacyStatus: 'Dispensed' },
    { id: 'RX-5503', date: '05 Oct 2026', pet: 'Coco (Shih Tzu)', medicine: 'Apoquel (Oclacitinib) 3.6mg', dosage: '0.5 Tablet twice daily for 7 days', indication: 'Atopic Dermatitis Pruritus Relief', prescriber: 'Dr. Ananya Roy', pharmacyStatus: 'Active Refill' },
    { id: 'RX-5504', date: '01 Oct 2026', pet: 'Rocky (German Shepherd)', medicine: 'Synoquin EFA Large Breed', dosage: '2 Tablets daily with morning kibble', indication: 'Joint Cartilage Repair Post-Op', prescriber: 'Dr. Rajesh Patel', pharmacyStatus: 'Active Refill' },
    { id: 'RX-5505', date: '28 Sep 2026', pet: 'Milo (Beagle)', medicine: 'Caninsulin (Purified Porcine)', dosage: '4 IU twice daily SQ with meals', indication: 'Canine Diabetes Mellitus Support', prescriber: 'Dr. Priya Desai', pharmacyStatus: 'Active Refill' },
    { id: 'RX-5506', date: '25 Sep 2026', pet: 'Leo (Labrador Retriever)', medicine: 'Carprofen (Rimadyl) 75mg', dosage: '1 Tablet once daily for 5 days post-exercise', indication: 'Hip Arthritic Analgesic Care', prescriber: 'Dr. Tanya S.', pharmacyStatus: 'Dispensed' },
    { id: 'RX-5507', date: '22 Sep 2026', pet: 'Luna (Siberian Husky)', medicine: 'Nutricoat Advance Omega Tonic', dosage: '5 ml orally daily mixed with meals', indication: 'Arctic Coat Density & Dermal Shield', prescriber: 'Dr. Ananya Roy', pharmacyStatus: 'Dispensed' },
    { id: 'RX-5508', date: '18 Sep 2026', pet: 'Simba (Indie Hound)', medicine: 'Bravecto Chewable (10-20kg)', dosage: '1 Tablet every 12 weeks orally', indication: 'Extended Tick & Flea Protection', prescriber: 'Dr. Tanya S.', pharmacyStatus: 'Dispensed' },
    { id: 'RX-5509', date: '14 Sep 2026', pet: 'Oreo (French Bulldog)', medicine: 'Optixcare L-Lysine Eye Lube', dosage: '1 Drop twice daily in both eyes', indication: 'Brachycephalic Corneal Hydration', prescriber: 'Dr. Rajesh Patel', pharmacyStatus: 'Dispensed' },
    { id: 'RX-5510', date: '10 Sep 2026', pet: 'Bruno (Rottweiler)', medicine: 'Hepatosyl Plus Liver Support', dosage: '2 Capsules daily before food', indication: 'Hepatic Metabolic Optimization', prescriber: 'Dr. Rajesh Patel', pharmacyStatus: 'Active Refill' }
  ];

  var PURCHASES = [
    { id: 'ORD-8811', date: '11 Oct 2026', pet: 'Max (Golden Retriever)', item: 'Royal Canin Maxi Adult Dog Food 15kg', category: 'Food & Nutrition', channel: 'Zenve App (Instant 60m)', parent: 'Priya Sharma', amount: '₹9,850', status: 'Delivered' },
    { id: 'ORD-8812', date: '09 Oct 2026', pet: 'Bella (Persian Cat)', item: 'Royal Canin Persian Adult Cat Food 4kg', category: 'Food & Nutrition', channel: 'Zenve App (AutoShip)', parent: 'Rahul Verma', amount: '₹3,750', status: 'Delivered' },
    { id: 'ORD-8813', date: '07 Oct 2026', pet: 'Coco (Shih Tzu)', item: 'Apoquel 3.6mg (20 Tabs) + Shampoo', category: 'Pharmacy & Wellness', channel: 'Zenve HSR Clinic Pharmacy', parent: 'Ananya Iyer', amount: '₹2,650', status: 'Delivered' },
    { id: 'ORD-8814', date: '05 Oct 2026', pet: 'Rocky (German Shepherd)', item: 'Orthopedic Memory Foam Bed (XL)', category: 'Merchandise & Gear', channel: 'Zenve Web Store', parent: 'Vikram Malhotra', amount: '₹6,400', status: 'Delivered' },
    { id: 'ORD-8815', date: '03 Oct 2026', pet: 'Milo (Beagle)', item: 'Caninsulin Cold-Chain Cartridge (10ml)', category: 'Prescription Diet', channel: 'Express Cold-Chain Van', parent: 'Deepika Nair', amount: '₹2,400', status: 'Delivered' },
    { id: 'ORD-8816', date: '01 Oct 2026', pet: 'Leo (Labrador Retriever)', item: 'Orijen Six Fish Grain-Free 11.4kg', category: 'Food & Nutrition', channel: 'Zenve App (AutoShip)', parent: 'Siddharth Rao', amount: '₹12,400', status: 'Delivered' },
    { id: 'ORD-8817', date: '29 Sep 2026', pet: 'Luna (Siberian Husky)', item: 'Furminator Deshedding Tool + Omega Tonic', category: 'Pharmacy & Wellness', channel: 'Zenve Web Store', parent: 'Kavita Menon', amount: '₹3,200', status: 'Delivered' },
    { id: 'ORD-8818', date: '26 Sep 2026', pet: 'Simba (Indie Hound)', item: 'Bravecto Chewable 10-20kg (1 Tab)', category: 'Pharmacy & Wellness', channel: 'Central Hospital Counter', parent: 'Arjun Kapoor', amount: '₹1,950', status: 'Delivered' },
    { id: 'ORD-8819', date: '24 Sep 2026', pet: 'Oreo (French Bulldog)', item: 'Royal Canin French Bulldog Adult 9kg', category: 'Food & Nutrition', channel: 'Zenve App (Instant 60m)', parent: 'Meera Nambiar', amount: '₹6,800', status: 'Delivered' },
    { id: 'ORD-8820', date: '20 Sep 2026', pet: 'Bruno (Rottweiler)', item: 'Heavy-Duty K9 Tactical Harness & Leash', category: 'Merchandise & Gear', channel: 'Zenve Web Store', parent: 'Rohan Gupta', amount: '₹4,500', status: 'Delivered' }
  ];

  var INSIGHTS = [
    { id: 'INS-01', category: 'Critical Outbreak', severity: 'Critical', title: 'Seasonal Canine Kennel Cough (Bordetella) Cluster in Indiranagar Hub', timeframe: 'Last 7 Days', metric: '14 Active Cases (Cluster)', preventable: '98% Vaccine Shield', description: 'Surveillance telemetry detects a 3.4x spike in canine acute tracheobronchitis cases centered within a 4km radius of Indiranagar dog parks.', recommendation: 'Trigger priority WhatsApp alert advising parents of socialized dogs to verify Nobivac KC intranasal booster status.', cohort: 'Indiranagar & Koramangala Canines (n=184)', impact: 'Averts 85% secondary hospital admissions', actionLabel: 'Broadcast Vaccine Recall Alert' },
    { id: 'INS-02', category: 'Breed Genetic Risk', severity: 'Warning', title: 'Brachycephalic Airway (BOAS) Early Warning for French Bulldogs & Pugs', timeframe: 'Ongoing 2026', metric: '68% Stenotic Risk', preventable: 'Early Laser Correction', description: 'Patients under 24 months exhibiting audible stertor or thermal distress during midday periods require endoscopic upper respiratory assessment.', recommendation: 'Schedule prophylactic soft palate & nares screening at 6-month wellness visits to prevent irreversible laryngeal collapse.', cohort: 'Brachycephalic Breeds (Frenchies, Pugs, Shih Tzus)', impact: 'Reduces emergency heat-stroke interventions by 75%', actionLabel: 'Schedule Airway Screenings' },
    { id: 'INS-03', category: 'Clinical Warning', severity: 'Warning', title: 'Subclinical SDMA Biomarker Elevation Detected in Senior Felines (>7 Yrs)', timeframe: 'MTD Analysis', metric: '18 Felines Flagged', preventable: 'Renal Diet Prescribed', description: 'Biomarker panels reveal SDMA levels between 14-18 ug/dL prior to serum creatinine elevation, identifying early Stage-1 chronic kidney disease.', recommendation: 'Switch immediately to renal-protective wet formulas (low phosphorus) and start automated home hydration monitoring.', cohort: 'Felines Aged 7+ Years Across Bengaluru Hubs', impact: 'Extends median renal lifespan by 3.2 years', actionLabel: 'Deploy Renal Diet Protocol' },
    { id: 'INS-04', category: 'Wellness Milestone', severity: 'Milestone', title: 'Annual Core Immunization Adherence Reaches 94.2% Network Milestone', timeframe: 'YTD 2026', metric: '94.2% Herd Immunity', preventable: 'Zero Rabies Breaches', description: 'Digital health passports and automated WhatsApp 14-day countdown reminders have successfully minimized vaccine defaults across Bengaluru.', recommendation: 'Issue loyalty tier bonus points (₹250 Zenve Wellness Credit) to pet parents with continuous 3-year vaccination compliance.', cohort: 'All Verified Microchipped Patients (n=1,240)', impact: 'Sustains city-wide herd immunity barrier', actionLabel: 'Issue Compliance Credits' },
    { id: 'INS-05', category: 'Clinical Warning', severity: 'Warning', title: 'Canine Atopic Dermatitis Surge Linked to Post-Monsoon Pollen Spores', timeframe: 'Past 14 Days', metric: '28 Cases Reported', preventable: 'Cytology Cleared', description: 'Elevated atmospheric humidity combined with pollen counts has provoked bilateral paw licking and ventral erythema in sensitive breeds.', recommendation: 'Prescribe ceramide-infused antiseptic baths and Apoquel short-course interventions before secondary pyoderma manifests.', cohort: 'Labradors, Golden Retrievers & Shih Tzus', impact: 'Eliminates 90% severe secondary bacterial infections', actionLabel: 'Send Dermal Care Guide' },
    { id: 'INS-06', category: 'Breed Genetic Risk', severity: 'Warning', title: 'Large Breed Hip Dysplasia Surveillance & Early Synovial Radiography', timeframe: 'Q3-Q4 2026', metric: '42 Candidates Screened', preventable: 'PennHIP Certified', description: 'Large breeds over 25 kg entering their 12th month require distraction index hip screening to evaluate joint laxity and prevent osteoarthritis.', recommendation: 'Recommend weight optimization (BCS 4-5) and initiate daily EPA/DHA Omega-3 supplementation combined with collagen peptides.', cohort: 'German Shepherds, Rottweilers, Labradors (1-2 yrs)', impact: 'Delays joint degradation onset by up to 5 years', actionLabel: 'Initiate Joint Care Protocol' },
    { id: 'INS-07', category: 'Critical Outbreak', severity: 'Critical', title: 'Canine Parvovirus Alert: Unvaccinated Pediatric Puppies Under 6 Months', timeframe: 'Active Surveillance', metric: '5 Suspected Cases', preventable: '100% Core Vax Efficacy', description: 'Gastrointestinal PCR diagnostics identified 5 viral enteritis cases in newly purchased pet shop puppies lacking cold-chain vaccine validation.', recommendation: 'Activate strict emergency isolation protocol in Whitefield & Central clinics; enforce mandatory cold-chain verification.', cohort: 'Unvaccinated / Incomplete Puppy Series (< 6 mos)', impact: 'Prevents transmission in hospital lobbies', actionLabel: 'Lock Down ICU Isolation' },
    { id: 'INS-08', category: 'Wellness Milestone', severity: 'Milestone', title: 'Dental Prophylaxis Awareness Campaign Reduces Periodontal Disease by 32%', timeframe: 'Past 60 Days', metric: '32% Morbidity Drop', preventable: 'Ultrasonic Scaling', description: 'Pet parents booking ultrasonic dental prophylaxis have increased by 48%, significantly reducing Grade 3-4 calculus and bacteremia risk.', recommendation: 'Expand dental checkup vouchers for senior dogs during their routine biannual wellness appointments.', cohort: 'Adult Dogs (Ages 3-8 Yrs)', impact: 'Prevents systemic cardiac valve endocarditis', actionLabel: 'Issue Dental Vouchers' },
    { id: 'INS-09', category: 'Clinical Warning', severity: 'Warning', title: 'Feline Lower Urinary Tract (FLUTD) Risk in Dry-Food Exclusive Diets', timeframe: 'Past 30 Days', metric: '12 Male Cats Treated', preventable: 'Hydration Therapy', description: 'Male adult cats fed exclusively dry kibble with low water intake show microscopic struvite crystal formation in urinalysis sediment.', recommendation: 'Instruct pet parents to transition 50% of caloric intake to wet pouches and install continuous running-water cat fountains.', cohort: 'Indoor Felines on Dry Kibble Regimens', impact: 'Averts emergency urethral obstruction surgeries', actionLabel: 'Send FLUTD Prevention Plan' },
    { id: 'INS-10', category: 'Wellness Milestone', severity: 'Milestone', title: 'Microchip RFID 100% Identification Rate for Lost Companion Recovery', timeframe: 'Year-to-Date', metric: '100% Reunited Rate', preventable: 'ISO 11784 RFID Standard', description: 'All 8 stray or lost companion animals presented to Zenve network hospitals with microchips were reunited with verified parents in < 3 hours.', recommendation: 'Offer subsidized microchipping during every primary puppy vaccination visit across all Bengaluru partner clinics.', cohort: 'All Un-chipped Enrolled Pets', impact: 'Guarantees lifetime identification and recovery safety', actionLabel: 'Promote Microchip Subsidies' }
  ];

  /* ── UI Initialization ────────────────────────────────────────────── */
  function ensureRoot() {
    if (root && document.body.contains(root)) return;
    var existing = document.getElementById('zpet-root');
    if (existing) { root = existing; return; }

    root = document.createElement('div');
    root.id = 'zpet-root';
    root.innerHTML = [
      '<header class="zpet-header" id="zpet-header-bar">',
      '  <div class="zpet-header-left">',
      '    <div class="zpet-brand-badge">🐾</div>',
      '    <div class="zpet-title-group">',
      '      <div class="zpet-title-row">',
      '        <h2 class="zpet-main-title" id="zpet-header-title">Pets 360° Control Center</h2>',
      '        <span class="zpet-status-badge"><span class="zpet-status-dot"></span> 10 Registered Patients</span>',
      '      </div>',
      '      <p class="zpet-subtitle" id="zpet-header-sub">Master census, digital vaccination passports, longitudinal EHRs, and AI health intelligence</p>',
      '    </div>',
      '  </div>',
      '  <div class="zpet-header-right">',
      '    <button type="button" class="zpet-btn zpet-btn-secondary" onclick="window.ZenvePetsDashboard.showAddModal()">➕ Add Pet</button>',
      '    <button type="button" class="zpet-btn zpet-btn-primary" onclick="window.ZenvePetsDashboard.exportTabCSV()">⬇️ Export CSV</button>',
      '  </div>',
      '</header>',
      '<nav class="zpet-nav-bar" id="zpet-nav-chips"></nav>',
      '<div class="zpet-content" id="zpet-body-content"></div>',
      '<div class="zpet-toast" id="zpet-toast-msg"></div>'
    ].join('\n');

    document.body.appendChild(root);
  }

  function renderNav() {
    var nav = root.querySelector('#zpet-nav-chips');
    if (!nav) return;
    var html = MODULES.map(function (m) {
      var active = (m.id === S.tab) ? ' active' : '';
      return '<button type="button" class="zpet-chip' + active + '" onclick="window.ZenvePetsDashboard.switchTab(\'' + m.id + '\')">' +
        m.icon + ' ' + m.label +
        '</button>';
    }).join('');
    nav.innerHTML = html;
  }

  function showToast(msg) {
    var toast = root.querySelector('#zpet-toast-msg');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3000);
  }

  /* ── Tab Content Renderers ────────────────────────────────────────── */
  function renderContent() {
    var container = root.querySelector('#zpet-body-content');
    if (!container) return;

    var cur = MODULES.find(function (m) { return m.id === S.tab; }) || MODULES[0];
    root.querySelector('#zpet-header-title').textContent = cur.title;
    root.querySelector('#zpet-header-sub').textContent = cur.sub;

    renderNav();

    if (S.tab === 'all-pets') {
      renderAllPets(container);
    } else if (S.tab === 'pet-profiles') {
      renderProfiles(container);
    } else if (S.tab === 'pet-health-records') {
      renderHealthRecords(container);
    } else if (S.tab === 'vaccination-records') {
      renderVaccinations(container);
    } else if (S.tab === 'treatment-history') {
      renderTreatments(container);
    } else if (S.tab === 'prescription-history') {
      renderPrescriptions(container);
    } else if (S.tab === 'purchase-history') {
      renderPurchases(container);
    } else if (S.tab === 'pet-analytics') {
      renderAnalytics(container);
    } else if (S.tab === 'pet-health-insights') {
      renderInsights(container);
    }
  }

  /* ── 1. All Pets ── */
  function renderAllPets(container) {
    var q = S.searchQuery.toLowerCase();
    var list = PETS.filter(function (p) {
      var matchesFilter = (S.filterVal === 'ALL' || p.species === S.filterVal || p.vaxStatus.includes(S.filterVal));
      var matchesSearch = p.name.toLowerCase().includes(q) ||
        p.breed.toLowerCase().includes(q) ||
        p.parent.toLowerCase().includes(q) ||
        p.microchip.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Total Registered Pets</span><span class="zpet-kpi-icon">🐾</span></div><div class="zpet-kpi-val">10</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+100%</span> Active Census</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Canine Share</span><span class="zpet-kpi-icon">🐕</span></div><div class="zpet-kpi-val">90.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">9 Dogs</span> Active Patients</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Feline Share</span><span class="zpet-kpi-icon">🐈</span></div><div class="zpet-kpi-val">10.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-neu">1 Cat</span> Bella (Persian)</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Vaccine Compliance</span><span class="zpet-kpi-icon">💉</span></div><div class="zpet-kpi-val">100.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">8 Up to Date</span> 2 Due in 14d</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Microchip Enrolled</span><span class="zpet-kpi-icon">🏷️</span></div><div class="zpet-kpi-val">100.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">10 / 10 Chipped</span> ISO 11784 RFID</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search by pet name, breed, parent, microchip ID..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Canine', 'Feline', 'Avian', 'Up to Date', 'Due in 14d', 'Overdue'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr>',
      '          <th>Pet</th>',
      '          <th>Species & Breed</th>',
      '          <th>Age & Gender</th>',
      '          <th>Pet Parent & Contact</th>',
      '          <th>City</th>',
      '          <th>Health Score</th>',
      '          <th>Vaccine Status</th>',
      '          <th>Microchip RFID</th>',
      '        </tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (p) {
        var vaxCls = p.vaxStatus === 'Up to Date' ? 'zpet-pill-green' : p.vaxStatus.includes('Due') ? 'zpet-pill-blue' : 'zpet-pill-red';
        return '<tr>' +
          '  <td style="font-weight:700;"><div style="display:flex;align-items:center;gap:8px;"><span style="font-size:18px;">' + p.avatar + '</span><div><div>' + p.name + '</div><div style="font-size:11px;color:#94a3b8;font-family:monospace;">' + p.id + '</div></div></div></td>' +
          '  <td><b>' + p.species + '</b><div style="font-size:11px;color:#64748b;">' + p.breed + '</div></td>' +
          '  <td>' + p.age + '<div style="font-size:11px;color:#64748b;">' + p.gender + '</div></td>' +
          '  <td><b>' + p.parent + '</b><div style="font-size:11px;color:#64748b;">' + p.phone + '</div></td>' +
          '  <td>' + p.city + '</td>' +
          '  <td><b style="color:' + (p.healthScore >= 90 ? '#059669' : '#2563eb') + ';">' + p.healthScore + '/100</b></td>' +
          '  <td><span class="zpet-pill-badge ' + vaxCls + '">' + p.vaxStatus + '</span></td>' +
          '  <td style="font-family:monospace;font-size:11px;color:#64748b;">' + p.microchip + '</td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 2. Pet Profiles ── */
  function renderProfiles(container) {
    var p = PETS[0];
    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Selected Profile</span><span class="zpet-kpi-icon">🐕</span></div><div class="zpet-kpi-val">' + p.name + '</div><div class="zpet-kpi-sub">' + p.breed + ' (' + p.id + ')</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Body Condition</span><span class="zpet-kpi-icon">⚖️</span></div><div class="zpet-kpi-val">BCS 5 / 9</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">' + p.weight + '</span> Weight optimal</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Biological Passport</span><span class="zpet-kpi-icon">💉</span></div><div class="zpet-kpi-val">' + p.healthScore + ' / 100</div><div class="zpet-kpi-sub">' + p.vaxStatus + ' • All cores valid</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Primary Physician</span><span class="zpet-kpi-icon">👨‍⚕️</span></div><div class="zpet-kpi-val">Dr. Tanya S.</div><div class="zpet-kpi-sub">' + p.clinic + '</div></div>',
      '</div>',
      '<div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;">',
      '  <div class="zpet-card" style="padding:24px;">',
      '    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f1f5f9;padding-bottom:16px;margin-bottom:18px;">',
      '      <div style="display:flex;align-items:center;gap:12px;">',
      '        <div style="width:48px;height:48px;border-radius:12px;background:#eff6ff;display:grid;placeItems:center;font-size:24px;">🐕</div>',
      '        <div><h3 style="margin:0;font-size:17px;font-weight:700;">' + p.name + '’s Complete Medical Dossier</h3><p style="margin:2px 0 0;font-size:12px;color:#64748b;">' + p.species + ' • ' + p.breed + ' • 3 yrs 2 mos</p></div>',
      '      </div>',
      '      <span class="zpet-pill-badge zpet-pill-green">ACTIVE BIO-PASSPORT</span>',
      '    </div>',
      '    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:13px;">',
      '      <div><div style="font-size:11px;color:#94a3b8;font-weight:700;">MICROCHIP RFID</div><div style="font-family:monospace;font-weight:700;color:#0f172a;margin-top:2px;">' + p.microchip + '</div></div>',
      '      <div><div style="font-size:11px;color:#94a3b8;font-weight:700;">GENDER & SPAY STATUS</div><div style="font-weight:600;color:#0f172a;margin-top:2px;">' + p.gender + '</div></div>',
      '      <div><div style="font-size:11px;color:#94a3b8;font-weight:700;">CURRENT WEIGHT</div><div style="font-weight:600;color:#0f172a;margin-top:2px;">32.4 kg (Monthly Audited)</div></div>',
      '      <div><div style="font-size:11px;color:#94a3b8;font-weight:700;">COAT COLOR & MARKINGS</div><div style="font-weight:600;color:#0f172a;margin-top:2px;">Dark Golden / Dense Coat</div></div>',
      '      <div style="grid-column:span 2;"><div style="font-size:11px;color:#94a3b8;font-weight:700;">NUTRITION REGIMEN</div><div style="font-weight:600;color:#0f172a;margin-top:2px;">Royal Canin Maxi Adult (380g/day) + Salmon Omega-3 Supplement</div></div>',
      '      <div style="grid-column:span 2;"><div style="font-size:11px;color:#94a3b8;font-weight:700;">KNOWN ALLERGIES</div><div style="font-weight:600;color:#dc2626;margin-top:2px;">⚠️ Chicken byproduct (causes mild contact pruritus)</div></div>',
      '    </div>',
      '  </div>',
      '  <div style="display:flex;flex-direction:column;gap:16px;">',
      '    <div class="zpet-card" style="padding:20px;">',
      '      <h4 style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;">👤 Pet Parent</h4>',
      '      <div style="font-size:13px;line-height:1.6;">',
      '        <div style="font-weight:700;color:#0f172a;font-size:15px;">' + p.parent + '</div>',
      '        <div style="color:#475569;">📞 ' + p.phone + '</div>',
      '        <div style="color:#64748b;font-size:12px;margin-top:6px;">📍 Powai, Mumbai - 400076</div>',
      '      </div>',
      '    </div>',
      '    <div class="zpet-card" style="padding:20px;">',
      '      <h4 style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;">🛡️ Insurance Coverage</h4>',
      '      <div style="font-size:13px;line-height:1.6;">',
      '        <div style="font-weight:700;color:#059669;">PetCover Gold Shield</div>',
      '        <div style="color:#64748b;font-size:12px;">Policy #PCG-881920 (Covered up to ₹1,50,000)</div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 3. Pet Health Records ── */
  function renderHealthRecords(container) {
    var q = S.searchQuery.toLowerCase();
    var list = HEALTH_RECORDS.filter(function (r) {
      return (S.filterVal === 'ALL' || r.status === S.filterVal) &&
        (r.pet.toLowerCase().includes(q) || r.diagnosis.toLowerCase().includes(q) || r.vet.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Cumulative EHRs</span><span class="zpet-kpi-icon">📋</span></div><div class="zpet-kpi-val">10</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+100%</span> Longitudinal Logs</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Monthly Admissions</span><span class="zpet-kpi-icon">📅</span></div><div class="zpet-kpi-val">10</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">Active</span> Current Cycle</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Active Chronic Regimens</span><span class="zpet-kpi-icon">💊</span></div><div class="zpet-kpi-val">3</div><div class="zpet-kpi-sub">Renal, cardiac, endocrine</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Vitals Compliance</span><span class="zpet-kpi-icon">🩺</span></div><div class="zpet-kpi-val">100.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">10 / 10 Checked</span> Complete Telemetry</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search EHRs by pet, diagnosis, doctor..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Resolved', 'Under Regimen', 'Post-Op Rehab', 'Chronic Monitoring'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>Record ID</th><th>Date</th><th>Pet Patient</th><th>Encounter Type</th><th>Recorded Vitals</th><th>Diagnosis & Notes</th><th>Attending Vet</th><th>Outcome</th></tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (r) {
        var stCls = (r.status === 'Resolved' || r.status === 'Fully Recovered') ? 'zpet-pill-green' : 'zpet-pill-blue';
        return '<tr>' +
          '  <td style="font-family:monospace;color:#2563eb;font-weight:700;">' + r.id + '</td>' +
          '  <td>' + r.date + '</td>' +
          '  <td><b>' + r.pet + '</b></td>' +
          '  <td>' + r.type + '</td>' +
          '  <td style="font-family:monospace;font-size:11px;">' + r.vitals + '</td>' +
          '  <td><b>' + r.diagnosis + '</b><div style="font-size:11px;color:#64748b;">' + r.notes + '</div></td>' +
          '  <td style="color:#2563eb;font-weight:600;">' + r.vet + '</td>' +
          '  <td><span class="zpet-pill-badge ' + stCls + '">' + r.status + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 4. Vaccination Records ── */
  function renderVaccinations(container) {
    var q = S.searchQuery.toLowerCase();
    var list = VACCINATIONS.filter(function (v) {
      return (S.filterVal === 'ALL' || v.status.includes(S.filterVal)) &&
        (v.pet.toLowerCase().includes(q) || v.vaccine.toLowerCase().includes(q) || v.batch.toLowerCase().includes(q) || v.passId.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Immunization Doses</span><span class="zpet-kpi-icon">💉</span></div><div class="zpet-kpi-val">10</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+100%</span> YTD Administered</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Herd Immunity Rate</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">94.2%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">10 Verified</span> Protected Cohort</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Due Within 30d</span><span class="zpet-kpi-icon">🔔</span></div><div class="zpet-kpi-val">2</div><div class="zpet-kpi-sub">Coco & Oreo (WhatsApp notified)</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Cold-Chain Verified</span><span class="zpet-kpi-icon">❄️</span></div><div class="zpet-kpi-val">100.0%</div><div class="zpet-kpi-sub">Temperature monitored (2-8°C)</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search vaccines by pet, brand, batch ID..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Valid', 'Due', 'Overdue'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>Pet Patient</th><th>Vaccine Brand</th><th>Manufacturer</th><th>Batch / Lot ID</th><th>Administered</th><th>Next Due</th><th>Clinician</th><th>Status</th></tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (v) {
        var stCls = v.status.includes('Valid') ? 'zpet-pill-green' : v.status.includes('Due') ? 'zpet-pill-blue' : 'zpet-pill-red';
        return '<tr>' +
          '  <td><b>' + v.pet + '</b><div style="font-family:monospace;font-size:11px;color:#2563eb;">' + v.passId + '</div></td>' +
          '  <td><b>' + v.vaccine + '</b></td>' +
          '  <td>' + v.manufacturer + '</td>' +
          '  <td style="font-family:monospace;font-size:11px;">' + v.batch + '</td>' +
          '  <td>' + v.administeredOn + '</td>' +
          '  <td style="font-weight:600;">' + v.nextDue + '</td>' +
          '  <td style="color:#2563eb;">' + v.vet + '</td>' +
          '  <td><span class="zpet-pill-badge ' + stCls + '">' + v.status + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 5. Treatment History ── */
  function renderTreatments(container) {
    var q = S.searchQuery.toLowerCase();
    var list = TREATMENTS.filter(function (t) {
      return (S.filterVal === 'ALL' || t.outcome.includes(S.filterVal)) &&
        (t.pet.toLowerCase().includes(q) || t.condition.toLowerCase().includes(q) || t.procedure.toLowerCase().includes(q) || t.vet.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Treatments Logged</span><span class="zpet-kpi-icon">💊</span></div><div class="zpet-kpi-val">10</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+100%</span> Medical & Surgical</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Recovery Rate</span><span class="zpet-kpi-icon">📈</span></div><div class="zpet-kpi-val">98.5%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">10 / 10 Discharged</span> Zero Complications</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Avg Inpatient Stay</span><span class="zpet-kpi-icon">⏱️</span></div><div class="zpet-kpi-val">1.2 Days</div><div class="zpet-kpi-sub">Day care & ICU optimized</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Surgical Sepsis Rate</span><span class="zpet-kpi-icon">🏥</span></div><div class="zpet-kpi-val">0.0%</div><div class="zpet-kpi-sub">Zero surgical site sepsis</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search treatments by pet, condition, clinician..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Resolved', 'Discharged', 'Rehab', 'Full Recovery'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>ID & Date</th><th>Pet Patient</th><th>Condition</th><th>Protocol Executed</th><th>Duration</th><th>Clinician</th><th>Cost</th><th>Outcome</th></tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (t) {
        var outCls = t.outcome.includes('Resolved') || t.outcome.includes('Full Recovery') ? 'zpet-pill-green' : 'zpet-pill-blue';
        return '<tr>' +
          '  <td style="font-family:monospace;color:#2563eb;font-weight:700;">' + t.id + '<div style="font-size:11px;color:#64748b;">' + t.date + '</div></td>' +
          '  <td><b>' + t.pet + '</b></td>' +
          '  <td><b>' + t.condition + '</b></td>' +
          '  <td style="color:#475569;">' + t.procedure + '</td>' +
          '  <td>' + t.duration + '</td>' +
          '  <td style="color:#2563eb;font-weight:600;">' + t.vet + '</td>' +
          '  <td style="font-family:monospace;font-weight:700;">' + t.cost + '</td>' +
          '  <td><span class="zpet-pill-badge ' + outCls + '">' + t.outcome + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 6. Prescription History ── */
  function renderPrescriptions(container) {
    var q = S.searchQuery.toLowerCase();
    var list = PRESCRIPTIONS.filter(function (p) {
      return (S.filterVal === 'ALL' || p.pharmacyStatus === S.filterVal) &&
        (p.pet.toLowerCase().includes(q) || p.medicine.toLowerCase().includes(q) || p.indication.toLowerCase().includes(q) || p.prescriber.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Rx Generated</span><span class="zpet-kpi-icon">💊</span></div><div class="zpet-kpi-val">10</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+100%</span> Tamper-Proof Digital</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Chronic Refills</span><span class="zpet-kpi-icon">🔄</span></div><div class="zpet-kpi-val">4 Active</div><div class="zpet-kpi-sub">Auto-scheduled delivery</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Dispense SLA</span><span class="zpet-kpi-icon">⏱️</span></div><div class="zpet-kpi-val">18 Mins</div><div class="zpet-kpi-sub">In-house pharmacy SLA</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Drug Interaction Check</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">100.0%</div><div class="zpet-kpi-sub">AI species/weight verified</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search prescriptions by drug, pet, indication..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Dispensed', 'Active Refill'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>Rx ID</th><th>Date</th><th>Pet Patient</th><th>Prescribed Medicine</th><th>Dosage & Frequency</th><th>Indication</th><th>Prescriber</th><th>Status</th></tr>',
      '      </thead>',
      '      <tbody>',
      list.map(function (p) {
        var stCls = (p.pharmacyStatus === 'Dispensed') ? 'zpet-pill-green' : 'zpet-pill-blue';
        return '<tr>' +
          '  <td style="font-family:monospace;color:#2563eb;font-weight:700;">' + p.id + '</td>' +
          '  <td>' + p.date + '</td>' +
          '  <td><b>' + p.pet + '</b></td>' +
          '  <td><b>' + p.medicine + '</b></td>' +
          '  <td style="font-family:monospace;font-size:11px;">' + p.dosage + '</td>' +
          '  <td style="color:#64748b;">' + p.indication + '</td>' +
          '  <td style="color:#2563eb;font-weight:600;">' + p.prescriber + '</td>' +
          '  <td><span class="zpet-pill-badge ' + stCls + '">' + p.pharmacyStatus + '</span></td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 7. Purchase History ── */
  function renderPurchases(container) {
    var q = S.searchQuery.toLowerCase();
    var list = PURCHASES.filter(function (p) {
      return (S.filterVal === 'ALL' || p.category === S.filterVal || p.status === S.filterVal) &&
        (p.pet.toLowerCase().includes(q) || p.item.toLowerCase().includes(q) || p.parent.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Cumulative Orders</span><span class="zpet-kpi-icon">🛍️</span></div><div class="zpet-kpi-val">10</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">100% Fulfilled</span> Total: ₹53,900</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Avg Pet Spend / Yr</span><span class="zpet-kpi-icon">💰</span></div><div class="zpet-kpi-val">₹40,165</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+18.4%</span> Annualized LTV</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Rx Diet Penetration</span><span class="zpet-kpi-icon">🥗</span></div><div class="zpet-kpi-val">42.5%</div><div class="zpet-kpi-sub">High margin nutrition</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Auto-Ship Subscribers</span><span class="zpet-kpi-icon">🔄</span></div><div class="zpet-kpi-val">80.0%</div><div class="zpet-kpi-sub">8 active monthly AutoShips</div></div>',
      '</div>',
      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search orders by item, pet, parent..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Food & Nutrition', 'Prescription Diet', 'Pharmacy & Wellness', 'Delivered'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',
      '<div class="zpet-card">',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead>',
      '        <tr><th>Order ID</th><th>Date</th><th>Pet Consumer</th><th>Item / SKU</th><th>Category</th><th>Channel</th><th>Parent</th><th>Amount</th><th>Status</th></tr>',
      '      </thead>',
      '      <tbody>',
      (list.length === 0 ? '<tr><td colspan="9" style="text-align:center;padding:36px 16px;color:#94a3b8;">No purchase history records found</td></tr>' :
      list.map(function (p) {
        var stCls = (p.status === 'Delivered' || p.status === 'Fulfilled') ? 'zpet-pill-green' : 'zpet-pill-blue';
        return '<tr>' +
          '  <td style="font-family:monospace;color:#2563eb;font-weight:700;">' + p.id + '</td>' +
          '  <td>' + p.date + '</td>' +
          '  <td><b>' + p.pet + '</b></td>' +
          '  <td><b>' + p.item + '</b></td>' +
          '  <td style="color:#64748b;">' + p.category + '</td>' +
          '  <td style="color:#2563eb;font-weight:600;">' + p.channel + '</td>' +
          '  <td>' + p.parent + '</td>' +
          '  <td style="font-family:monospace;font-weight:700;">' + p.amount + '</td>' +
          '  <td><span class="zpet-pill-badge ' + stCls + '">' + p.status + '</span></td>' +
          '</tr>';
      }).join('')),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 8. Pet Analytics ── */
  var BREEDS_ANALYTICS = [
    { breed: 'Golden Retriever', species: 'Canine', count: 184, pct: 18.4, avgAge: '3.6 Yrs', vaxRate: '96.2%', microchipRate: '98.0%', riskTier: 'Mod Risk (Hip Laxity)' },
    { breed: 'Labrador Retriever', species: 'Canine', count: 162, pct: 16.2, avgAge: '4.2 Yrs', vaxRate: '95.1%', microchipRate: '96.5%', riskTier: 'Mod Risk (Obesity)' },
    { breed: 'German Shepherd', species: 'Canine', count: 128, pct: 12.8, avgAge: '3.8 Yrs', vaxRate: '94.8%', microchipRate: '97.2%', riskTier: 'High Risk (Dysplasia/TPLO)' },
    { breed: 'Shih Tzu', species: 'Canine', count: 112, pct: 11.2, avgAge: '2.4 Yrs', vaxRate: '92.4%', microchipRate: '94.0%', riskTier: 'Mod Risk (Atopic Skin)' },
    { breed: 'Beagle', species: 'Canine', count: 96, pct: 9.6, avgAge: '3.1 Yrs', vaxRate: '93.5%', microchipRate: '95.2%', riskTier: 'Mod Risk (Endocrine/Weight)' },
    { breed: 'Persian Longhair', species: 'Feline', count: 88, pct: 8.8, avgAge: '2.8 Yrs', vaxRate: '91.8%', microchipRate: '92.4%', riskTier: 'High Risk (Renal PKD/FLUTD)' },
    { breed: 'Indie Hound Cross', species: 'Canine', count: 82, pct: 8.2, avgAge: '2.1 Yrs', vaxRate: '97.5%', microchipRate: '98.8%', riskTier: 'Low Risk (Native Hardy)' },
    { breed: 'French Bulldog', species: 'Canine', count: 64, pct: 6.4, avgAge: '2.0 Yrs', vaxRate: '90.5%', microchipRate: '93.0%', riskTier: 'High Risk (BOAS Airway)' },
    { breed: 'Siberian Husky', species: 'Canine', count: 48, pct: 4.8, avgAge: '3.4 Yrs', vaxRate: '94.0%', microchipRate: '96.0%', riskTier: 'Mod Risk (Thermal Stress)' },
    { breed: 'Rottweiler', species: 'Canine', count: 36, pct: 3.6, avgAge: '3.9 Yrs', vaxRate: '95.8%', microchipRate: '97.0%', riskTier: 'High Risk (Cardiac/Elbow)' }
  ];

  var REGIONAL_HUBS = [
    { city: 'Zenve Koramangala Super Clinic', pets: 342, share: '34.2%', visits: '4.6 / yr', vaxRate: '96.4%', plan: 'Zenve Care+ (68%)' },
    { city: 'Zenve Indiranagar Specialty Hub', pets: 228, share: '22.8%', visits: '4.2 / yr', vaxRate: '95.2%', plan: 'Zenve Care+ (64%)' },
    { city: 'Zenve HSR Clinic & Spa', pets: 165, share: '16.5%', visits: '3.9 / yr', vaxRate: '93.8%', plan: 'Zenve Care+ (58%)' },
    { city: 'Zenve Whitefield Specialty Hospital', pets: 144, share: '14.4%', visits: '4.8 / yr', vaxRate: '97.1%', plan: 'Zenve Care+ (72%)' },
    { city: 'Zenve Jayanagar Clinic', pets: 72, share: '7.2%', visits: '3.8 / yr', vaxRate: '94.5%', plan: 'Zenve Care+ (52%)' },
    { city: 'Zenve Central Animal Hospital', pets: 49, share: '4.9%', visits: '5.2 / yr', vaxRate: '98.0%', plan: 'Zenve Care+ (80%)' }
  ];

  function renderAnalytics(container) {
    var q = S.searchQuery.toLowerCase();
    var filteredBreeds = BREEDS_ANALYTICS.filter(function (b) {
      var matchSpecies = (S.filterVal === 'ALL' || b.species === S.filterVal);
      var matchText = b.breed.toLowerCase().includes(q) || b.riskTier.toLowerCase().includes(q) || b.species.toLowerCase().includes(q);
      return matchSpecies && matchText;
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Registered Cohort</span><span class="zpet-kpi-icon">📊</span></div><div class="zpet-kpi-val">10</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">1,000 Sample</span> Active Population</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Sterilization Rate</span><span class="zpet-kpi-icon">✂️</span></div><div class="zpet-kpi-val">80.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">8 / 10 Pets</span> Desexed</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Microchip RFID Rate</span><span class="zpet-kpi-icon">📡</span></div><div class="zpet-kpi-val">100.0%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">10 / 10 Pets</span> ISO 11784 Tagged</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Avg Body Condition</span><span class="zpet-kpi-icon">⚖️</span></div><div class="zpet-kpi-val">BCS 4.8</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">Optimal</span> 1-9 Scale</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Preventive Adherence</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">96.4%</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+4.2%</span> Annual Checkups</div></div>',
      '</div>',

      '<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:20px;margin-bottom:20px;">',
      '  <div class="zpet-card" style="padding:20px;">',
      '    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">',
      '      <div><h3 style="margin:0;font-size:15px;font-weight:700;">Life-Stage & Age Cohort Epidemiology</h3><p style="margin:2px 0 0;font-size:12px;color:#64748b;">Population pyramid across developmental life stages</p></div>',
      '      <span style="font-size:11px;background:#f1f5f9;padding:4px 8px;border-radius:4px;font-weight:600;color:#475569;">Median: 3.1 Yrs</span>',
      '    </div>',
      '    <div style="display:flex;flex-direction:column;gap:14px;">',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Pediatric / Puppy & Kitten (&lt; 1 yr)</span><span style="color:#2563eb;">2 pets (20.0%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:20%;height:100%;background:#2563eb;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Primary DHPPiL/Tricat series, microchipping, puppy socialization, nutritional formulas</div>',
      '      </div>',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Young Adult (1 – 3 yrs)</span><span style="color:#10b981;">5 pets (50.0%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:50%;height:100%;background:#10b981;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Annual booster immunization, dental prophylaxis scaling, flea & tick prevention, desexing</div>',
      '      </div>',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Mature Adult (4 – 6 yrs)</span><span style="color:#f59e0b;">2 pets (20.0%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:20%;height:100%;background:#f59e0b;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Caloric weight tracking, baseline blood chemistry & urinalysis, joint mobility supplements</div>',
      '      </div>',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Senior Companion (7 – 10 yrs)</span><span style="color:#8b5cf6;">1 pet (10.0%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:10%;height:100%;background:#8b5cf6;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Geriatric screening, renal SDMA biomarker panels, cardiac doppler ultrasound, arthritis analgesia</div>',
      '      </div>',
      '      <div style="padding:12px 14px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;margin-bottom:6px;"><span>Super Senior / Geriatric (11+ yrs)</span><span style="color:#ef4444;">0 pets (0.0%)</span></div>',
      '        <div style="width:100%;height:7px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:8px;"><div style="width:0%;height:100%;background:#ef4444;"></div></div>',
      '        <div style="font-size:11px;color:#64748b;"><b>Clinical Focus:</b> Cognitive dysfunction support, palliative comfort protocols, sub-Q hydration therapy</div>',
      '      </div>',
      '    </div>',
      '  </div>',

      '  <div style="display:flex;flex-direction:column;gap:20px;">',
      '    <div class="zpet-card" style="padding:20px;">',
      '      <h3 style="margin:0 0 4px;font-size:15px;font-weight:700;">Body Condition Score (BCS 1–9)</h3>',
      '      <p style="margin:0 0 14px;font-size:12px;color:#64748b;">Nutritional stratification across registered population</p>',
      '      <div style="display:flex;flex-direction:column;gap:10px;">',
      '        <div style="padding:10px 12px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:4px;"><span>BCS 1-3 (Underweight)</span><span style="color:#3b82f6;">1 pet (10.0%)</span></div>',
      '          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:4px;"><div style="width:10%;height:100%;background:#3b82f6;"></div></div>',
      '          <div style="font-size:11px;color:#64748b;">High-density caloric nutrition & deworming</div>',
      '        </div>',
      '        <div style="padding:10px 12px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:4px;"><span>BCS 4-5 (Ideal & Optimal)</span><span style="color:#10b981;">7 pets (70.0%)</span></div>',
      '          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:4px;"><div style="width:70%;height:100%;background:#10b981;"></div></div>',
      '          <div style="font-size:11px;color:#64748b;">Balanced maintenance diet & regular exercise</div>',
      '        </div>',
      '        <div style="padding:10px 12px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:4px;"><span>BCS 6-7 (Overweight)</span><span style="color:#f59e0b;">2 pets (20.0%)</span></div>',
      '          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:4px;"><div style="width:20%;height:100%;background:#f59e0b;"></div></div>',
      '          <div style="font-size:11px;color:#64748b;">Caloric restriction & portion management</div>',
      '        </div>',
      '        <div style="padding:10px 12px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;">',
      '          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:4px;"><span>BCS 8-9 (Clinically Obese)</span><span style="color:#ef4444;">0 pets (0.0%)</span></div>',
      '          <div style="width:100%;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;margin-bottom:4px;"><div style="width:0%;height:100%;background:#ef4444;"></div></div>',
      '          <div style="font-size:11px;color:#64748b;">Satiety metabolic diet & endocrinology workup</div>',
      '        </div>',
      '      </div>',
      '    </div>',

      '    <div class="zpet-card" style="padding:20px;">',
      '      <h3 style="margin:0 0 12px;font-size:14px;font-weight:700;">Gender & Reproductive Status</h3>',
      '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">',
      '        <div style="padding:10px;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe;text-align:center;"><div style="font-size:18px;font-weight:800;color:#1d4ed8;">6</div><div style="font-size:11px;font-weight:600;color:#1e40af;">Neutered Males (60%)</div></div>',
      '        <div style="padding:10px;background:#fdf2f8;border-radius:8px;border:1px solid #fbcfe8;text-align:center;"><div style="font-size:18px;font-weight:800;color:#be185d;">2</div><div style="font-size:11px;font-weight:600;color:#9d174d;">Spayed Females (20%)</div></div>',
      '        <div style="padding:10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;text-align:center;"><div style="font-size:18px;font-weight:800;color:#475569;">1</div><div style="font-size:11px;font-weight:600;color:#64748b;">Intact Male (10%)</div></div>',
      '        <div style="padding:10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;text-align:center;"><div style="font-size:18px;font-weight:800;color:#475569;">1</div><div style="font-size:11px;font-weight:600;color:#64748b;">Intact Female (10%)</div></div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',

      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search breed demographics or risk factors..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Canine', 'Feline', 'Avian'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',

      '<div class="zpet-card" style="margin-bottom:20px;">',
      '  <div class="zpet-card-header"><h3 class="zpet-card-title">Breed Demographics & Genetic Predisposition Matrix</h3><span style="font-size:12px;color:#64748b;">0 Breeds Tracked</span></div>',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead><tr><th>Breed & Species</th><th>Census Count</th><th>Share %</th><th>Avg Age</th><th>Vaccine %</th><th>Microchipped %</th><th>Predisposed Risk Tier</th></tr></thead>',
      '      <tbody>',
      (filteredBreeds.length === 0 ? '<tr><td colspan="7" style="text-align:center;padding:36px 16px;color:#94a3b8;">No breed records found</td></tr>' :
      filteredBreeds.map(function (b) {
        var rCls = b.riskTier.includes('High') ? 'zpet-pill-red' : b.riskTier.includes('Mod') ? 'zpet-pill-yellow' : 'zpet-pill-green';
        return '<tr>' +
          '  <td><b>' + b.breed + '</b> <span style="font-size:11px;color:#64748b;">(' + b.species + ')</span></td>' +
          '  <td style="font-weight:700;">' + b.count + '</td>' +
          '  <td><b>' + b.pct + '%</b></td>' +
          '  <td>' + b.avgAge + '</td>' +
          '  <td style="color:#059669;font-weight:700;">' + b.vaxRate + '</td>' +
          '  <td style="color:#2563eb;font-weight:700;">' + b.microchipRate + '</td>' +
          '  <td><span class="zpet-pill-badge ' + rCls + '">' + b.riskTier + '</span></td>' +
          '</tr>';
      }).join('')),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>',

      '<div class="zpet-card" style="padding:20px;">',
      '  <h3 style="margin:0 0 4px;font-size:15px;font-weight:700;">Regional Clinic Hub Distribution & Health Plan Adoption</h3>',
      '  <p style="margin:0 0 16px;font-size:12px;color:#64748b;">Active cohort concentration, clinic visit cadence, and care plan adoption</p>',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead><tr><th>Regional Clinic Hub</th><th>Enrolled Cohort</th><th>National Share</th><th>Avg Visits / Pet / Yr</th><th>Vaccine Adherence</th><th>Care+ Plan Adoption</th></tr></thead>',
      '      <tbody>',
      (REGIONAL_HUBS.length === 0 ? '<tr><td colspan="6" style="text-align:center;padding:36px 16px;color:#94a3b8;">No regional clinic hub records found</td></tr>' :
      REGIONAL_HUBS.map(function (rh) {
        return '<tr>' +
          '  <td><b>' + rh.city + '</b></td>' +
          '  <td style="color:#2563eb;font-weight:700;">' + rh.pets + '</td>' +
          '  <td>' + rh.share + '</td>' +
          '  <td>' + rh.visits + '</td>' +
          '  <td style="color:#059669;font-weight:700;">' + rh.vaxRate + '</td>' +
          '  <td><span class="zpet-pill-badge zpet-pill-blue">' + rh.plan + '</span></td>' +
          '</tr>';
      }).join('')),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── 9. Pet Health Insights ── */
  var BIOMARKERS = [
    { test: 'Feline Symmetric Dimethylarginine (SDMA)', indication: 'Early Renal GFR Loss (>25% Loss)', tested: 248, normal: '218 (87.9%)', atRisk: '22 Borderline', pathological: '8 Confirmed', action: 'Prescribe Renal-Specific Ultra Diet' },
    { test: 'Canine NT-proBNP Biomarker', indication: 'Myocardial Wall Stress / Dilated Cardio', tested: 186, normal: '162 (87.1%)', atRisk: '16 Elevated', pathological: '8 High Severity', action: 'Full Doppler Echocardiogram' },
    { test: 'Canine Spec cPL (Pancreatic Lipase)', indication: 'Acute Necrotizing Pancreatitis', tested: 142, normal: '124 (87.3%)', atRisk: '12 Borderline', pathological: '6 Active Pancreatitis', action: 'Low-Fat Gastro Diet + IV Fluid Protocol' },
    { test: 'Total T4 & Free T4 Equilibrium Dialysis', indication: 'Canine Hypothyroidism / Feline Hyper-T', tested: 195, normal: '171 (87.7%)', atRisk: '15 Equivocal', pathological: '9 Confirmed Endocrine', action: 'Levothyroxine Sodium Replacement' },
    { test: 'Fecal Antigen ELISA (Giardia & Crypto)', indication: 'Refractory Enteric Protozoan Zoonosis', tested: 160, normal: '144 (90.0%)', atRisk: '6 Subclinical', pathological: '10 Positive Cyst Shedding', action: 'Fenbendazole Course + Sanitization' },
    { test: 'Canine High-Sensitivity CRP (C-Reactive)', indication: 'Systemic Inflammation / Sepsis', tested: 110, normal: '92 (83.6%)', atRisk: '11 Moderately Elevated', pathological: '7 Acute Sepsis Spike', action: 'Broad-Spectrum Antimicrobial Triage' },
    { test: 'Bile Acids Pre/Post Prandial Assay', indication: 'Portosystemic Hepatic Shunts & Cirrhosis', tested: 84, normal: '74 (88.1%)', atRisk: '6 Mild Elevation', pathological: '4 Hepatic Shunt Risk', action: 'Hepatic Ultrasound & Lactulose Regimen' },
    { test: 'Urine Protein:Creatinine Ratio (UPC)', indication: 'Glomerulonephropathy & Proteinuria', tested: 135, normal: '118 (87.4%)', atRisk: '12 Micro-Proteinuria', pathological: '5 Macro-Proteinuria', action: 'ACE Inhibitor (Benazepril) Titration' },
    { test: 'Canine Troponin I (cTnI) High Sensitivity', indication: 'Acute Myocardial Ischemic Injury', tested: 78, normal: '68 (87.2%)', atRisk: '6 Minor Injury', pathological: '4 Severe Ischemia', action: 'ICU Telemetry & Oxygen Therapy' },
    { test: 'Serum Cortisol Post-ACTH Stimulation', indication: 'Adrenal Hyper / Hypoadrenocorticism', tested: 65, normal: '56 (86.2%)', atRisk: '5 Equivocal', pathological: '4 Cushing / Addisonian', action: 'Trilostane / Fludrocortisone Titration' }
  ];

  function renderInsights(container) {
    var q = S.searchQuery.toLowerCase();
    var list = INSIGHTS.filter(function (ins) {
      var matchFilter = (S.filterVal === 'ALL' || ins.severity === S.filterVal || ins.category === S.filterVal);
      var matchText = ins.title.toLowerCase().includes(q) || ins.description.toLowerCase().includes(q) || ins.cohort.toLowerCase().includes(q);
      return matchFilter && matchText;
    });

    container.innerHTML = [
      '<div class="zpet-kpi-grid">',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Population Health Index</span><span class="zpet-kpi-icon">🧠</span></div><div class="zpet-kpi-val">91.8</div><div class="zpet-kpi-sub"><span class="zpet-badge-pos">+3.4%</span> Low Morbidity Band</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Active Surveillance</span><span class="zpet-kpi-icon">🚨</span></div><div class="zpet-kpi-val">10 Signals</div><div class="zpet-kpi-sub">2 Critical, 5 Warnings, 3 Milestones</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Early Morbidity Staging</span><span class="zpet-kpi-icon">🛡️</span></div><div class="zpet-kpi-val">94.5%</div><div class="zpet-kpi-sub">Averts Late Hospitalization</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Parent Recall Action</span><span class="zpet-kpi-icon">📱</span></div><div class="zpet-kpi-val">88.4%</div><div class="zpet-kpi-sub">WhatsApp & In-App Response</div></div>',
      '  <div class="zpet-kpi"><div class="zpet-kpi-top"><span class="zpet-kpi-label">Chronic Care Cohort</span><span class="zpet-kpi-icon">🩺</span></div><div class="zpet-kpi-val">4 Enrolled</div><div class="zpet-kpi-sub">Remote Health Telemetry</div></div>',
      '</div>',

      '<div class="zpet-toolbar">',
      '  <div class="zpet-search-wrap">',
      '    <span>🔍</span>',
      '    <input type="text" class="zpet-search-input" placeholder="Search insights by condition, breed, symptom..." value="' + S.searchQuery + '" oninput="window.ZenvePetsDashboard.setSearch(this.value)">',
      '  </div>',
      '  <div class="zpet-filter-pills">',
      ['ALL', 'Critical', 'Warning', 'Milestone'].map(function (f) {
        var act = (S.filterVal === f) ? ' active' : '';
        return '<button type="button" class="zpet-pill' + act + '" onclick="window.ZenvePetsDashboard.setFilter(\'' + f + '\')">' + f + '</button>';
      }).join(''),
      '  </div>',
      '</div>',

      '<div style="display:flex;flex-direction:column;gap:16px;margin-bottom:24px;">',
      list.map(function (ins) {
        var sevCls = (ins.severity === 'Critical') ? 'zpet-pill-red' : (ins.severity === 'Warning') ? 'zpet-pill-yellow' : 'zpet-pill-green';
        return '<div class="zpet-card" style="padding:22px 24px;">' +
          '  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:10px;">' +
          '    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
          '      <span class="zpet-pill-badge ' + sevCls + '">' + ins.category + '</span>' +
          '      <h3 style="margin:0;font-size:15px;font-weight:700;">' + ins.title + '</h3>' +
          '      <span style="font-size:11px;color:#64748b;background:#f1f5f9;padding:2px 8px;border-radius:4px;">' + ins.timeframe + '</span>' +
          '    </div>' +
          '    <div style="display:flex;align-items:center;gap:10px;">' +
          '      <span style="font-family:monospace;font-weight:700;font-size:13px;color:#2563eb;background:#eff6ff;padding:4px 10px;border-radius:6px;">' + ins.metric + '</span>' +
          '      <span style="font-size:11px;font-weight:600;color:#059669;background:#ecfdf5;padding:4px 8px;border-radius:6px;">' + ins.preventable + '</span>' +
          '    </div>' +
          '  </div>' +
          '  <p style="margin:0 0 14px;font-size:13px;color:#475569;line-height:1.6;">' + ins.description + '</p>' +
          '  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">' +
          '    <div style="flex:1;min-width:280px;">' +
          '      <div style="font-size:13px;color:#0f172a;margin-bottom:4px;"><strong style="color:#2563eb;">💡 Recommended Protocol:</strong> ' + ins.recommendation + '</div>' +
          '      <div style="font-size:11px;color:#64748b;">Target Cohort: <strong style="color:#334155;">' + ins.cohort + '</strong> • Impact: <strong style="color:#334155;">' + ins.impact + '</strong></div>' +
          '    </div>' +
          '    <div style="display:flex;gap:8px;">' +
          '      <button type="button" class="zpet-btn zpet-btn-primary" style="font-size:12px;padding:8px 14px;" onclick="window.ZenvePetsDashboard.triggerInsightById(\'' + ins.id + '\', \'primary\')">⚡ ' + ins.actionLabel + '</button>' +
          '      <button type="button" class="zpet-btn zpet-btn-secondary" style="font-size:12px;padding:8px 12px;" onclick="window.ZenvePetsDashboard.triggerInsightById(\'' + ins.id + '\', \'export\')">Export Cohort</button>' +
          '    </div>' +
          '  </div>' +
          '</div>';
      }).join(''),
      '</div>',

      '<div class="zpet-card" style="padding:20px;">',
      '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">',
      '    <div><h3 style="margin:0;font-size:15px;font-weight:700;">Biomarker Surveillance & Subclinical Pathology Clustering</h3><p style="margin:2px 0 0;font-size:12px;color:#64748b;">Early diagnostic biomarker testing across registered patients</p></div>',
      '    <span style="font-size:11px;color:#2563eb;font-weight:600;background:#eff6ff;padding:4px 10px;border-radius:4px;">1,149 Panels Screened</span>',
      '  </div>',
      '  <div class="zpet-table-wrap">',
      '    <table class="zpet-table">',
      '      <thead><tr><th>Diagnostic Biomarker</th><th>Clinical Indication</th><th>Tested Count</th><th>Normal Cohort</th><th>At-Risk / Borderline</th><th>Pathological</th><th>Proactive Intervention</th></tr></thead>',
      '      <tbody>',
      BIOMARKERS.map(function (bm) {
        return '<tr>' +
          '  <td><b>' + bm.test + '</b></td>' +
          '  <td style="color:#64748b;">' + bm.indication + '</td>' +
          '  <td style="font-weight:600;">' + bm.tested + '</td>' +
          '  <td style="color:#059669;font-weight:700;">' + bm.normal + '</td>' +
          '  <td style="color:#d97706;font-weight:700;"><span class="zpet-pill-badge zpet-pill-yellow">' + bm.atRisk + '</span></td>' +
          '  <td style="color:#dc2626;font-weight:700;"><span class="zpet-pill-badge zpet-pill-red">' + bm.pathological + '</span></td>' +
          '  <td style="color:#2563eb;font-weight:600;font-size:12px;">' + bm.action + '</td>' +
          '</tr>';
      }).join(''),
      '      </tbody>',
      '    </table>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  function triggerInsightById(id, type) {
    var ins = INSIGHTS.find(function(item) { return item.id === id; });
    if (!ins) return;
    var label = (type === 'primary') ? ins.actionLabel : 'Export Patient Cohort EHRs';
    triggerInsightAction(ins.title, label);
  }

  function triggerInsightAction(title, actionLabel) {
    var toast = document.createElement('div');
    toast.className = 'zpet-toast';
    toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:999999;background:#0f172a;color:#ffffff;padding:14px 22px;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 10px 25px rgba(0,0,0,0.25);display:flex;align-items:center;gap:10px;border-left:4px solid #2563eb;animation:fadeIn 0.2s ease;';
    toast.innerHTML = '<span>⚡</span><span><b>Action Executed:</b> ' + actionLabel + ' for <em>' + title + '</em></span>';
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.style.transition = 'opacity 0.4s ease';
      toast.style.opacity = '0';
      setTimeout(function() { toast.remove(); }, 400);
    }, 3500);
  }

  /* ── Tab Switching & Open/Close ───────────────────────────────────── */
  function open(tab) {
    ensureRoot();
    if (tab && MODULES.some(function (m) { return m.id === tab; })) {
      S.tab = tab;
    }
    S.open = true;
    root.classList.add('zpanel-open');
    renderContent();

    var targetHash = (MODULES.find(function (m) { return m.id === S.tab; }) || {}).hash || '#all-pets';
    if (window.location.hash !== targetHash) {
      history.pushState(null, '', targetHash);
    }
  }

  function close() {
    if (!root) return;
    S.open = false;
    root.classList.remove('zpanel-open');
    if (window.location.hash.startsWith('#pet') || window.location.hash.startsWith('#all-pet') || window.location.hash.startsWith('#vaccin') || window.location.hash.startsWith('#treatment') || window.location.hash.startsWith('#prescription') || window.location.hash.startsWith('#purchase')) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }

  function switchTab(tab) {
    if (!MODULES.some(function (m) { return m.id === tab; })) return;
    S.tab = tab;
    S.searchQuery = '';
    S.filterVal = 'ALL';
    renderContent();
    var targetHash = (MODULES.find(function (m) { return m.id === tab; }) || {}).hash || '#all-pets';
    history.pushState(null, '', targetHash);
  }

  function setSearch(val) {
    S.searchQuery = val;
    renderContent();
  }

  function setFilter(val) {
    S.filterVal = val;
    renderContent();
  }

  /* ── Modals & CSV Export ─────────────────────────────────────────── */
  function showAddModal() {
    var modalHtml = [
      '<div class="zpet-modal-overlay open" id="zpet-add-modal">',
      '  <div class="zpet-modal">',
      '    <div class="zpet-modal-head">',
      '      <h3 class="zpet-modal-title">➕ Enroll New Companion Animal</h3>',
      '      <button type="button" class="zpet-btn-close" onclick="document.getElementById(\'zpet-add-modal\').remove()">✕</button>',
      '    </div>',
      '    <div class="zpet-modal-body">',
      '      <div class="zpet-form-group"><label>Pet Name</label><input type="text" id="zm-name" class="zpet-form-control" placeholder="e.g. Leo"></div>',
      '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '        <div class="zpet-form-group"><label>Species</label><select id="zm-species" class="zpet-form-control"><option>Canine</option><option>Feline</option><option>Avian</option><option>Exotic</option></select></div>',
      '        <div class="zpet-form-group"><label>Breed</label><input type="text" id="zm-breed" class="zpet-form-control" placeholder="e.g. Beagle"></div>',
      '      </div>',
      '      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">',
      '        <div class="zpet-form-group"><label>Age</label><input type="text" id="zm-age" class="zpet-form-control" placeholder="e.g. 1 yr 4 mos"></div>',
      '        <div class="zpet-form-group"><label>Gender</label><select id="zm-gender" class="zpet-form-control"><option>Male (Neutered)</option><option>Male (Intact)</option><option>Female (Spayed)</option><option>Female (Intact)</option></select></div>',
      '      </div>',
      '      <div class="zpet-form-group"><label>Pet Parent Name & Phone</label><input type="text" id="zm-parent" class="zpet-form-control" placeholder="e.g. Sameer Joshi (+91 98201 00000)"></div>',
      '      <div class="zpet-form-group"><label>Microchip RFID (ISO 11784/11785)</label><input type="text" id="zm-chip" class="zpet-form-control" placeholder="e.g. 981098102344199"></div>',
      '    </div>',
      '    <div class="zpet-modal-foot">',
      '      <button type="button" class="zpet-btn zpet-btn-secondary" onclick="document.getElementById(\'zpet-add-modal\').remove()">Cancel</button>',
      '      <button type="button" class="zpet-btn zpet-btn-primary" onclick="window.ZenvePetsDashboard.submitAddPet()">Save & Generate Passport</button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');

    var wrap = document.createElement('div');
    wrap.innerHTML = modalHtml;
    document.body.appendChild(wrap.firstElementChild);
  }

  function submitAddPet() {
    var name = document.getElementById('zm-name').value;
    var species = document.getElementById('zm-species').value;
    var breed = document.getElementById('zm-breed').value;
    var age = document.getElementById('zm-age').value;
    var gender = document.getElementById('zm-gender').value;
    var parent = document.getElementById('zm-parent').value;
    var chip = document.getElementById('zm-chip').value;

    if (!name || !breed || !parent) {
      alert('Please fill out pet name, breed, and parent details.');
      return;
    }

    var newId = 'PET-' + (100 + PETS.length + 1);
    var avatar = species === 'Canine' ? '🐕' : species === 'Feline' ? '🐈' : species === 'Avian' ? '🦜' : '🐾';

    PETS.unshift({
      id: newId,
      name: name,
      species: species,
      breed: breed,
      age: age || '1 yr',
      gender: gender,
      parent: parent,
      phone: '+91 98000 00000',
      city: 'Bengaluru',
      healthScore: 98,
      vaxStatus: 'Up to Date',
      microchip: chip || '981098102344' + Math.floor(100 + Math.random() * 900),
      avatar: avatar
    });

    var modal = document.getElementById('zpet-add-modal');
    if (modal) modal.remove();

    renderContent();
    showToast('Enrolled ' + name + ' into Pets 360° master database (' + newId + ')');
  }

  function exportTabCSV() {
    var rows = [];
    var filename = 'zenve-pets-360-' + S.tab + '.csv';

    if (S.tab === 'all-pets') {
      rows.push(['Pet ID', 'Name', 'Species', 'Breed', 'Age', 'Gender', 'Parent', 'Phone', 'City', 'Health Score', 'Vaccine Status', 'Microchip']);
      PETS.forEach(function (p) {
        rows.push([p.id, p.name, p.species, p.breed, p.age, p.gender, p.parent, p.phone, p.city, p.healthScore, p.vaxStatus, p.microchip]);
      });
    } else if (S.tab === 'pet-health-records') {
      rows.push(['Record ID', 'Date', 'Pet', 'Type', 'Vitals', 'Diagnosis', 'Attending Vet', 'Status']);
      HEALTH_RECORDS.forEach(function (r) {
        rows.push([r.id, r.date, r.pet, r.type, r.vitals, r.diagnosis, r.vet, r.status]);
      });
    } else if (S.tab === 'vaccination-records') {
      rows.push(['Pass ID', 'Pet', 'Vaccine', 'Manufacturer', 'Batch', 'Administered', 'Next Due', 'Vet', 'Status']);
      VACCINATIONS.forEach(function (v) {
        rows.push([v.passId, v.pet, v.vaccine, v.manufacturer, v.batch, v.administeredOn, v.nextDue, v.vet, v.status]);
      });
    } else if (S.tab === 'treatment-history') {
      rows.push(['Treatment ID', 'Date', 'Pet', 'Condition', 'Procedure', 'Duration', 'Clinician', 'Cost', 'Outcome']);
      TREATMENTS.forEach(function (t) {
        rows.push([t.id, t.date, t.pet, t.condition, t.procedure, t.duration, t.vet, t.cost, t.outcome]);
      });
    } else if (S.tab === 'prescription-history') {
      rows.push(['Rx ID', 'Date', 'Pet', 'Medicine', 'Dosage', 'Indication', 'Prescriber', 'Pharmacy Status']);
      PRESCRIPTIONS.forEach(function (p) {
        rows.push([p.id, p.date, p.pet, p.medicine, p.dosage, p.indication, p.prescriber, p.pharmacyStatus]);
      });
    } else {
      rows.push(['Order ID', 'Date', 'Pet', 'Item', 'Category', 'Channel', 'Parent', 'Amount', 'Status']);
      PURCHASES.forEach(function (p) {
        rows.push([p.id, p.date, p.pet, p.item, p.category, p.channel, p.parent, p.amount, p.status]);
      });
    }

    var csvContent = 'data:text/csv;charset=utf-8,' + rows.map(function (e) {
      return e.map(function (item) { return '"' + String(item).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Exported ' + filename);
  }

  /* ── Hash & Navigation Handlers ───────────────────────────────────── */
  function tabFromHash(h) {
    if (!h) return null;
    var clean = h.toLowerCase().trim();
    if (clean === '#all-pets' || clean === '#all-pet' || clean === '#pets' || clean === '#pets-360' || clean === '#pets360' || clean === '#pet-360') return 'all-pets';
    if (clean === '#pet-profiles' || clean === '#profiles') return 'pet-profiles';
    if (clean === '#pet-health-records' || clean === '#health-records' || clean === '#ehr') return 'pet-health-records';
    if (clean === '#vaccination-records' || clean === '#vaccines' || clean === '#vaccine-passports') return 'vaccination-records';
    if (clean === '#treatment-history' || clean === '#treatments-history') return 'treatment-history';
    if (clean === '#prescription-history' || clean === '#prescriptions') return 'prescription-history';
    if (clean === '#purchase-history' || clean === '#pet-purchases') return 'purchase-history';
    if (clean === '#pet-analytics' || clean === '#pet-demographics') return 'pet-analytics';
    if (clean === '#pet-health-insights' || clean === '#health-insights') return 'pet-health-insights';
    return null;
  }

  // Global Click Interception for Sidebar Items
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t) return;
    var btn = t.closest('button, a, li');
    if (!btn) return;
    var text = (btn.textContent || '').trim().toLowerCase();

    var map = {
      'all pets': 'all-pets',
      'pets 360°': 'all-pets',
      'pets 360': 'all-pets',
      'pet 360': 'all-pets',
      'pet profiles': 'pet-profiles',
      'pet health records': 'pet-health-records',
      'vaccination records': 'vaccination-records',
      'treatment history': 'treatment-history',
      'prescription history': 'prescription-history',
      'purchase history': 'purchase-history',
      'pet analytics': 'pet-analytics',
      'pet health insights': 'pet-health-insights'
    };

    for (var key in map) {
      if (text === key || text.startsWith(key + ' ') || (btn.getAttribute('href') && btn.getAttribute('href').includes(key.replace(/ /g, '-')))) {
        var group = btn.closest('div, section, nav');
        var groupText = group ? group.textContent : '';
        if (groupText && groupText.indexOf('Pets 360') === -1 && groupText.indexOf('Pet') === -1 && !t.closest('#zpet-root')) {
          if (map[key] !== 'pet-health-records' && map[key] !== 'vaccination-records' && map[key] !== 'prescription-history' && map[key] !== 'treatment-history') {
            return;
          }
        }

        if (!t.closest('#zpet-root')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          open(map[key]);
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
    } else if (S.open && !window.location.hash.startsWith('#pet') && !window.location.hash.startsWith('#all-pet') && !window.location.hash.startsWith('#vaccin') && !window.location.hash.startsWith('#treatment') && !window.location.hash.startsWith('#prescription') && !window.location.hash.startsWith('#purchase')) {
      close();
    }
  });

  /* ── Export Global API ────────────────────────────────────────────── */
  window.ZenvePetsDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    setSearch: setSearch,
    setFilter: setFilter,
    showAddModal: showAddModal,
    submitAddPet: submitAddPet,
    exportTabCSV: exportTabCSV,
    triggerInsightAction: triggerInsightAction,
    triggerInsightById: triggerInsightById
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
