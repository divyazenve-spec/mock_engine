/* =====================================================================
   Zenve BI — Import & Export Executive Control Center & Dashboards
   Suite (9 Subdomains):
     1. Import Dashboard           (#import-dashboard / #import-export)
     2. Export Dashboard           (#export-dashboard)
     3. Import Orders              (#import-orders)
     4. Export Orders              (#export-orders)
     5. Suppliers                  (#suppliers / #global-suppliers)
     6. Buyers                     (#buyers / #international-buyers)
     7. Customs & Documentation    (#customs-documentation / #customs)
     8. Logistics                  (#trade-logistics / #import-export-logistics)
     9. Import/Export Profitability (#import-export-profitability / #trade-profitability)
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
    { id: 'import-dashboard', label: 'Import Dashboard',        icon: '🌐', hash: '#import-dashboard',          badge: '10', title: 'Global Import Procurement & Supply', sub: 'International procurement manifests, ocean & air cargo shipments, CDSCO veterinary drug clearance, and customs duty tracking' },
    { id: 'export-dashboard', label: 'Export Dashboard',        icon: '🛫', hash: '#export-dashboard',          badge: '10', title: 'International Export Sales & Global Trade', sub: 'Overseas market shipments, foreign exchange (Forex) remittances, Letter of Credit (LC) execution, and export duty incentives' },
    { id: 'import-orders',    label: 'Import Orders',           icon: '📑', hash: '#import-orders',             badge: '10', title: 'International Purchase Orders (IPO) & LC Pipeline', sub: 'Cross-border procurement orders, commercial proforma invoices, forex hedging contracts, and port ETA milestones' },
    { id: 'export-orders',    label: 'Export Orders',           icon: '📦', hash: '#export-orders',             badge: '10', title: 'International Export Sales Orders & Invoicing', sub: 'Overseas commercial sales orders, foreign bank letters of credit, customs shipping bill filings, and cargo manifests' },
    { id: 'suppliers',        label: 'Suppliers',               icon: '🌍', hash: '#suppliers',                 badge: '10', title: 'Global Veterinary & Raw Material Suppliers', sub: 'International manufacturer registry, CDSCO import licenses, country of origin compliance, and quality certifications' },
    { id: 'buyers',           label: 'Buyers',                  icon: '🤝', hash: '#buyers',                    badge: '10', title: 'International Buyers & Distribution Partners', sub: 'Overseas retail chains, international veterinary hospital groups, luxury boutique distributors, and credit limits' },
    { id: 'customs',          label: 'Customs & Documentation', icon: '🏛️', hash: '#customs-documentation',    badge: '10', title: 'Customs Compliance, Bill of Entry & Shipping Bills', sub: 'DGFT import export code (IEC), CDSCO drug controller permits, ICEGATE electronic filings, and animal quarantine NOCs' },
    { id: 'logistics',        label: 'Logistics',               icon: '🚢', hash: '#trade-logistics',           badge: '10', title: 'Multimodal Reefer, Ocean & Air Corridors', sub: 'Cross-border freight forwarding, maritime vessel telemetry, cold-chain flight routes, and container yard milestones' },
    { id: 'profitability',    label: 'Import/Export Profit',    icon: '💎', hash: '#import-export-profitability', badge: '10', title: 'Landed Cost Economics & Cross-Border Margins', sub: 'Total landed cost breakdown (CIF, customs duty, IGST, clearing, cold freight) and net international export arbitrage' }
  ];

  /* ── Master Datasets (10 Items in Each Subdomain) ─────────────────── */
  var IMPORTS = [
    { bl: 'BL-DE-99214', origin: 'Germany', product: 'Veterinary Monoclonal Antibodies & Antigens', port: 'Nhava Sheva (JNPT)', value: '₹84,50,000', customs: 'Customs Cleared (RMS)', eta: '12 Oct 2026', status: 'Received' },
    { bl: 'AWB-US-48102', origin: 'United States', product: 'Canine Rabies & Core Vaccines (Cold-Chain 2-8°C)', port: 'BLR Air Cargo Hub', value: '₹62,00,000', customs: 'CDSCO NOC Approved', eta: '14 Oct 2026', status: 'In Transit' },
    { bl: 'BL-NL-33109', origin: 'Netherlands', product: 'Bovine Synthetic Hormones & Somatotropins', port: 'Chennai Port', value: '₹48,20,000', customs: 'Duty Paid - Out of Charge', eta: '10 Oct 2026', status: 'Received' },
    { bl: 'AWB-FR-77120', origin: 'France', product: 'Veterinary Dental Scaling Ultrasonic Systems', port: 'BOM Air Cargo Complex', value: '₹39,80,000', customs: 'In Assessment (Icegate)', eta: '16 Oct 2026', status: 'In Customs' },
    { bl: 'BL-JP-19044', origin: 'Japan', product: 'Digital Radiography DR Flat Panels & Sensor Heads', port: 'Nhava Sheva (JNPT)', value: '₹92,40,000', customs: 'Customs Cleared', eta: '08 Oct 2026', status: 'Received' },
    { bl: 'AWB-CH-66231', origin: 'Switzerland', product: 'Cardiology Inotropic Chewables & Vetmedin', port: 'DEL Air Cargo Hub', value: '₹34,10,000', customs: 'AQCS Quarantine Clearance', eta: '15 Oct 2026', status: 'In Transit' },
    { bl: 'BL-DK-55102', origin: 'Denmark', product: 'Canine Recombinant Insulin & Glucose Monitors', port: 'Chennai Port', value: '₹53,90,000', customs: 'Under Examination', eta: '17 Oct 2026', status: 'In Customs' },
    { bl: 'AWB-AU-82910', origin: 'Australia', product: 'Injectable NSAIDs & Flunixin Meglumine', port: 'HYD Air Cargo Hub', value: '₹27,60,000', customs: 'Duty Debited via Icegate', eta: '11 Oct 2026', status: 'Received' },
    { bl: 'BL-UK-40291', origin: 'United Kingdom', product: 'Veterinary Ophthalmic Micro-Surgical Sets', port: 'Nhava Sheva (JNPT)', value: '₹21,80,000', customs: 'RMS Facilitation Approved', eta: '18 Oct 2026', status: 'In Transit' },
    { bl: 'AWB-IT-11928', origin: 'Italy', product: 'MyLab Equine Color Doppler Ultrasound Units', port: 'BLR Air Cargo Hub', value: '₹58,00,000', customs: 'Under Inspection (Sec 47)', eta: '19 Oct 2026', status: 'In Customs' }
  ];

  var EXPORTS = [
    { sb: 'SB-EXP-88102', dest: 'Dubai, UAE', client: 'Al-Khail Falcon & Equine Hospital', items: 'Endoscopic Orthopedic Kits & Equine Implants', fob: '₹58,40,000', clearance: 'LEO Issued', date: '10 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88103', dest: 'Singapore', client: 'SingaVet Specialist Animal Hospitals', items: 'Canine Surgical Drapes & Micro-Cannulas', fob: '₹42,20,000', clearance: 'Icegate E-BRC Active', date: '12 Oct 2026', status: 'In Transit' },
    { sb: 'SB-EXP-88104', dest: 'London, UK', client: 'Cotswolds Pet Healthcare Group', items: 'Herbal Hepato-Protective Vet Suspensions', fob: '₹36,50,000', clearance: 'Customs Cleared', date: '08 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88105', dest: 'Sydney, Australia', client: 'Outback Equine & Canine Centers', items: 'Stainless Titanium Bone Plates & Screws', fob: '₹49,80,000', clearance: 'Let Export Order', date: '14 Oct 2026', status: 'In Transit' },
    { sb: 'SB-EXP-88106', dest: 'Doha, Qatar', client: 'Royal Falcon & Exotic Hospital', items: 'Avian Critical Care Antibiotics & Fluids', fob: '₹31,10,000', clearance: 'LEO Issued', date: '11 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88107', dest: 'Toronto, Canada', client: 'Maple Leaf Vet Specialty Clinics', items: 'Ayurvedic Joint Support Soft Chews', fob: '₹28,70,000', clearance: 'Customs Inspection Cleared', date: '15 Oct 2026', status: 'In Transit' },
    { sb: 'SB-EXP-88108', dest: 'Riyadh, Saudi Arabia', client: 'Najd Veterinary PolyClinic LLC', items: 'Large Animal Infusion Pumps & Sets', fob: '₹45,60,000', clearance: 'LEO Issued', date: '09 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88109', dest: 'Nairobi, Kenya', client: 'Serengeti Wildlife Conservation Trust', items: 'Darting Sedative Reversible Formulations', fob: '₹22,90,000', clearance: 'Port Gate-in Completed', date: '16 Oct 2026', status: 'In Transit' },
    { sb: 'SB-EXP-88110', dest: 'Frankfurt, Germany', client: 'EuroPet Tierarzt Distributoren', items: 'Bio-degradable Vet Sutures & Polyglycolic', fob: '₹33,40,000', clearance: 'Customs Cleared', date: '07 Oct 2026', status: 'Delivered' },
    { sb: 'SB-EXP-88111', dest: 'Kuala Lumpur, Malaysia', client: 'PetCare ASEAN Distribution Sdn Bhd', items: 'Veterinary Probiotic Electrolyte Blends', fob: '₹16,50,000', clearance: 'ICEGATE Filed (Ready)', date: '17 Oct 2026', status: 'Pending Dispatch' }
  ];

  var IMPORT_ORDERS = [
    { po: 'IPO-2026-001', supplier: 'Boehringer Ingelheim Vet (Germany)', goods: 'Metacam Anti-inflammatory Injectables (5,000 vials)', val: '$78,500 (₹65,15,500)', terms: 'CIF Nhava Sheva', orderDate: '28 Sep 2026', eta: '18 Oct 2026', status: 'In Transit' },
    { po: 'IPO-2026-002', supplier: 'Zoetis Global LLC (USA)', goods: 'Apoquel & Cytopoint Canine Monoclonals', val: '$112,000 (₹92,96,000)', terms: 'CIP BLR Airport', orderDate: '02 Oct 2026', eta: '16 Oct 2026', status: 'In Transit' },
    { po: 'IPO-2026-003', supplier: 'MSD Animal Health B.V. (Netherlands)', goods: 'Nobivac Tricat & Rabies Biological Batches', val: '€54,200 (₹48,78,000)', terms: 'DAP Chennai Hub', orderDate: '01 Oct 2026', eta: '15 Oct 2026', status: 'In Customs' },
    { po: 'IPO-2026-004', supplier: 'Virbac Laboratories (France)', goods: 'Milpro & Epiotic Dermatological Solutions', val: '€38,900 (₹35,01,000)', terms: 'FOB Marseille', orderDate: '25 Sep 2026', eta: '12 Oct 2026', status: 'Delivered' },
    { po: 'IPO-2026-005', supplier: 'Esaote SpA Diagnostic (Italy)', goods: 'Vet Dedicated Color Ultrasound Probes', val: '€44,000 (₹39,60,000)', terms: 'CIF Mumbai Air', orderDate: '05 Oct 2026', eta: '20 Oct 2026', status: 'In Transit' },
    { po: 'IPO-2026-006', supplier: 'Canon Medical Vet (Japan)', goods: 'CXDI Flat Panel Wireless Vet Detectors', val: '¥12.8M (₹71,68,000)', terms: 'CIF JNPT Port', orderDate: '22 Sep 2026', eta: '11 Oct 2026', status: 'Delivered' },
    { po: 'IPO-2026-007', supplier: 'Elanco Switzerland GmbH (Switzerland)', goods: 'Galliprant & Credelio Chewable Tablets', val: '$49,300 (₹40,91,900)', terms: 'CIP DEL Airport', orderDate: '03 Oct 2026', eta: '19 Oct 2026', status: 'In Transit' },
    { po: 'IPO-2026-008', supplier: 'NovoVet Biologicals ApS (Denmark)', goods: 'Caninsulin & Vet Glucose Monitoring Kits', val: '€42,100 (₹37,89,000)', terms: 'CIF Chennai Port', orderDate: '29 Sep 2026', eta: '17 Oct 2026', status: 'In Customs' },
    { po: 'IPO-2026-009', supplier: 'Troy Laboratories Pty Ltd (Australia)', goods: 'Ilium Anesthetic Formulations & Sedatives', val: 'A$62,000 (₹34,10,000)', terms: 'CIF Mumbai Port', orderDate: '20 Sep 2026', eta: '10 Oct 2026', status: 'Delivered' },
    { po: 'IPO-2026-010', supplier: 'Dechra Veterinary Products Ltd (UK)', goods: 'Vetoryl Capsules (Trilostane 10/30/60mg)', val: '£51,000 (₹57,63,000)', terms: 'CIP BOM Airport', orderDate: '06 Oct 2026', eta: '22 Oct 2026', status: 'In Transit' }
  ];

  var EXPORT_ORDERS = [
    { expPo: 'XPO-2026-101', buyer: 'Al-Khail Equine Center LLC', country: 'United Arab Emirates', items: 'Specialized Equine Arthroscopy Packs & Implants', val: '$64,000 (₹53,12,000)', payment: 'Confirmed LC at Sight', dispatch: '08 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-102', buyer: 'SingaVet Specialist Clinics Pte', country: 'Singapore', items: 'Canine Micro-surgical Sutures & Haemostats', val: '$48,500 (₹40,25,500)', payment: 'Advance Wire TT (50/50)', dispatch: '11 Oct 2026', status: 'In Transit' },
    { expPo: 'XPO-2026-103', buyer: 'Cotswolds Pet Healthcare Group', country: 'United Kingdom', items: 'Herbal Liver Tonics & Omega Vet Formulations', val: '£32,000 (₹36,16,000)', payment: 'Irrevocable LC 60 Days', dispatch: '06 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-104', buyer: 'Outback Vet Centers Australia', country: 'Australia', items: 'Titanium Locking Bone Plate Surgical Systems', val: 'A$78,000 (₹42,90,000)', payment: 'Advance TT Wire (100%)', dispatch: '13 Oct 2026', status: 'In Transit' },
    { expPo: 'XPO-2026-105', buyer: 'Royal Falcon Care Hospital', country: 'Qatar', items: 'Avian Respiratory Chelation & Nutriceuticals', val: '$35,000 (₹29,05,000)', payment: 'Confirmed LC at Sight', dispatch: '09 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-106', buyer: 'Maple Leaf Pet Specialty Clinics', country: 'Canada', items: 'Ayurvedic Turmeric-Curcumin Joint Chews', val: 'C$46,000 (₹28,52,000)', payment: 'CAD TT Bank Transfer', dispatch: '14 Oct 2026', status: 'In Transit' },
    { expPo: 'XPO-2026-107', buyer: 'Najd Veterinary PolyClinics', country: 'Saudi Arabia', items: 'Veterinary Infusion Warmer Pumps & Sensors', val: '$52,000 (₹43,16,000)', payment: '100% Irrevocable LC', dispatch: '07 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-108', buyer: 'Serengeti Wildlife Hospital', country: 'Kenya', items: 'Wild Animal Immobilization & Reversal Syringes', val: '$26,000 (₹21,58,000)', payment: 'NGO Grant TT Transfer', dispatch: '15 Oct 2026', status: 'In Transit' },
    { expPo: 'XPO-2026-109', buyer: 'EuroPet Tierarzt Distributoren', country: 'Germany', items: 'Surgical Absorbable Polyglycolic Sutures', val: '€36,000 (₹32,40,000)', payment: 'Net 30 CAD Bank Wire', dispatch: '05 Oct 2026', status: 'Delivered' },
    { expPo: 'XPO-2026-110', buyer: 'PetCare ASEAN Distribution', country: 'Malaysia', items: 'Probiotic Vet Electrolytes (Sachets 100g)', val: '$18,000 (₹14,94,000)', payment: 'LC at Sight', dispatch: '16 Oct 2026', status: 'Pending Dispatch' }
  ];

  var SUPPLIERS = [
    { code: 'SUP-GLB-01', name: 'Boehringer Ingelheim Animal Health', country: 'Germany', cat: 'Biologicals & NSAIDs', terms: 'Irrevocable LC 60 Days', annualVol: '₹8.40 Cr', cdsco: 'CDSCO Form 10 Approved', rating: '9.9 / 10' },
    { code: 'SUP-GLB-02', name: 'Zoetis Global Manufacturing LLC', country: 'United States', cat: 'Monoclonal Antibodies & Vaccines', terms: 'Confirmed LC 90 Days', annualVol: '₹12.20 Cr', cdsco: 'CDSCO Form 11 Cleared', rating: '9.8 / 10' },
    { code: 'SUP-GLB-03', name: 'MSD Animal Health B.V.', country: 'Netherlands', cat: 'Endoparasiticides & Vaccines', terms: 'Net 45 CAD', annualVol: '₹7.80 Cr', cdsco: 'EU GMP & CDSCO Valid', rating: '9.7 / 10' },
    { code: 'SUP-GLB-04', name: 'Virbac SA', country: 'France', cat: 'Dermatology & Parasiticides', terms: 'Advance TT Wire (30/70)', annualVol: '₹6.10 Cr', cdsco: 'CDSCO Form 10 Approved', rating: '9.6 / 10' },
    { code: 'SUP-GLB-05', name: 'Canon Medical Systems Vet', country: 'Japan', cat: 'Imaging & Diagnostic DR', terms: '100% Sight LC', annualVol: '₹9.50 Cr', cdsco: 'AERB / CDSCO Compliant', rating: '9.9 / 10' },
    { code: 'SUP-GLB-06', name: 'Elanco Switzerland GmbH', country: 'Switzerland', cat: 'Cardiovascular & Pain Mgmt', terms: 'Net 60 Days TT', annualVol: '₹5.40 Cr', cdsco: 'Swissmedic & CDSCO NOC', rating: '9.7 / 10' },
    { code: 'SUP-GLB-07', name: 'NovoVet Biologicals ApS', country: 'Denmark', cat: 'Veterinary Endocrine Solutions', terms: 'Irrevocable LC 45 Days', annualVol: '₹4.90 Cr', cdsco: 'CDSCO Cold-Chain Certified', rating: '9.8 / 10' },
    { code: 'SUP-GLB-08', name: 'Troy Laboratories Pty Ltd', country: 'Australia', cat: 'Anesthetics & Surgical Sedatives', terms: 'Sight TT Wire', annualVol: '₹3.80 Cr', cdsco: 'APVMA & CDSCO Form 10', rating: '9.5 / 10' },
    { code: 'SUP-GLB-09', name: 'Dechra Veterinary Products Ltd', country: 'United Kingdom', cat: 'Endocrinology & Ophthalmic', terms: 'LC 30 Days', annualVol: '₹6.70 Cr', cdsco: 'VMD UK & CDSCO Cleared', rating: '9.8 / 10' },
    { code: 'SUP-GLB-10', name: 'Esaote SpA Diagnostic', country: 'Italy', cat: 'Color Doppler Vet Ultrasounds', terms: 'LC at Sight', annualVol: '₹5.90 Cr', cdsco: 'CE Vet & CDSCO Registered', rating: '9.6 / 10' }
  ];

  var BUYERS = [
    { code: 'BUY-INT-01', name: 'Al-Khail Falcon & Equine Healthcare LLC', country: 'Dubai, UAE', type: 'Premier Equine Hospital Group', contractVal: '₹9.20 Cr ($1.1M)', paymentTerms: 'Irrevocable LC at Sight', rep: 'Tariq Mansoor', status: 'Active Tier-1' },
    { code: 'BUY-INT-02', name: 'SingaVet Hospital Networks Pte', country: 'Singapore', type: 'Specialty Vet Chain (14 clinics)', contractVal: '₹6.40 Cr ($770K)', paymentTerms: 'Net 30 TT Wire', rep: 'Mei Ling Tan', status: 'Active Tier-1' },
    { code: 'BUY-INT-03', name: 'Cotswolds Pet Healthcare Ltd', country: 'United Kingdom', type: 'High-End Companion Animal Group', contractVal: '₹5.80 Cr ($700K)', paymentTerms: 'Irrevocable LC 60 Days', rep: 'Oliver Sterling', status: 'Active Tier-1' },
    { code: 'BUY-INT-04', name: 'Outback Equine & Canine Centers', country: 'Australia', type: 'Large Animal & Livestock Consortium', contractVal: '₹7.50 Cr ($900K)', paymentTerms: 'Sight Bank Wire', rep: 'Liam Hemsworth', status: 'Active Tier-1' },
    { code: 'BUY-INT-05', name: 'Royal Falcon Care Medical Hospital', country: 'Qatar', type: 'Royal Falcon & Avian Specialty', contractVal: '₹4.80 Cr ($580K)', paymentTerms: '100% Confirmed LC', rep: 'Fahad Al-Thani', status: 'Active Tier-1' },
    { code: 'BUY-INT-06', name: 'Maple Leaf Vet Specialty Partners', country: 'Canada', type: 'Emergency & Critical Care Chain', contractVal: '₹4.20 Cr ($505K)', paymentTerms: 'Net 45 Bank Wire', rep: 'Jean-Luc Dubois', status: 'Active' },
    { code: 'BUY-INT-07', name: 'Najd Veterinary PolyClinics', country: 'Saudi Arabia', type: 'Livestock & Camel Care Network', contractVal: '₹6.90 Cr ($830K)', paymentTerms: 'Irrevocable LC at Sight', rep: 'Abdullah Al-Dosari', status: 'Active Tier-1' },
    { code: 'BUY-INT-08', name: 'Serengeti Wildlife Conservation Trust', country: 'Kenya', type: 'Sanctuary Wildlife Medical Supplies', contractVal: '₹2.90 Cr ($350K)', paymentTerms: 'Advance NGO TT', rep: 'Dr. Jane Odhiambo', status: 'Active' },
    { code: 'BUY-INT-09', name: 'EuroPet Tierarzt Distributoren GmbH', country: 'Germany', type: 'DACH Region Veterinary Wholesale', contractVal: '₹5.30 Cr ($640K)', paymentTerms: 'CAD Bank Transfer', rep: 'Klaus Fischer', status: 'Active' },
    { code: 'BUY-INT-10', name: 'PetCare ASEAN Distribution Sdn Bhd', country: 'Malaysia', type: 'Southeast Asia Pet Retail Distributor', contractVal: '₹3.40 Cr ($410K)', paymentTerms: 'LC 30 Days', rep: 'Zulkepli Hassan', status: 'Active' }
  ];

  var CUSTOMS_DOCS = [
    { docId: 'BE-ICE-99214', type: 'Bill of Entry (Import)', port: 'JNPT Nhava Sheva', hsn: 'HSN 3004.90', assessableVal: '₹84,50,000', duty: 'Duty: ₹8,45,000 (Paid)', agency: 'CDSCO & Customs', status: 'Out of Charge (Cleared)' },
    { docId: 'SB-ICE-88102', type: 'Shipping Bill (Export)', port: 'Air Cargo BOM', hsn: 'HSN 9018.90', assessableVal: '₹58,40,000', duty: 'Drawback: ₹1,75,200', agency: 'DGFT & Customs', status: 'LEO Issued' },
    { docId: 'BE-ICE-48102', type: 'Bill of Entry (Import)', port: 'BLR Air Cargo', hsn: 'HSN 3002.20', assessableVal: '₹62,00,000', duty: 'Duty: ₹3,10,000 (Exempt Concession)', agency: 'CDSCO Drug Controller', status: 'RMS Facilitated' },
    { docId: 'SB-ICE-88103', type: 'Shipping Bill (Export)', port: 'Chennai Sea Port', hsn: 'HSN 3004.10', assessableVal: '₹42,20,000', duty: 'RoDTEP: ₹84,400', agency: 'Customs Export Cell', status: 'Let Export Order (LEO)' },
    { docId: 'BE-ICE-33109', type: 'Bill of Entry (Import)', port: 'Chennai Port', hsn: 'HSN 2937.19', assessableVal: '₹48,20,000', duty: 'Duty: ₹5,78,400 (Paid)', agency: 'Animal Quarantine (AQCS)', status: 'Out of Charge (Cleared)' },
    { docId: 'SB-ICE-88104', type: 'Shipping Bill (Export)', port: 'DEL Air Cargo', hsn: 'HSN 2309.90', assessableVal: '₹36,50,000', duty: 'Duty Drawback: ₹1,09,500', agency: 'DGFT / ICEGATE', status: 'LEO Cleared' },
    { docId: 'BE-ICE-77120', type: 'Bill of Entry (Import)', port: 'BOM Air Cargo', hsn: 'HSN 9018.50', assessableVal: '₹39,80,000', duty: 'Duty: ₹4,37,800 (Pending)', agency: 'CDSCO Medical Devices', status: 'In Assessment' },
    { docId: 'SB-ICE-88105', type: 'Shipping Bill (Export)', port: 'JNPT Nhava Sheva', hsn: 'HSN 9021.10', assessableVal: '₹49,80,000', duty: 'RoDTEP: ₹99,600', agency: 'Customs Division', status: 'Vessel Gate-In' },
    { docId: 'BE-ICE-19044', type: 'Bill of Entry (Import)', port: 'JNPT Nhava Sheva', hsn: 'HSN 9022.14', assessableVal: '₹92,40,000', duty: 'Duty: ₹10,16,400 (Paid)', agency: 'AERB / CDSCO NOC', status: 'Out of Charge (Cleared)' },
    { docId: 'SB-ICE-88106', type: 'Shipping Bill (Export)', port: 'BLR Air Cargo', hsn: 'HSN 3004.20', assessableVal: '₹31,10,000', duty: 'Drawback: ₹93,300', agency: 'Air Customs Commissioner', status: 'LEO Issued' }
  ];

  var LOGISTICS_CORRIDORS = [
    { track: 'COR-EU-IN-01', route: 'Hamburg -> Nhava Sheva (JNPT)', carrier: 'Maersk Line (MV Madrid Maersk)', mode: 'Ocean Reefer 40ft', temp: '4.2°C (Optimal 2-8°C)', transitTime: '18 Days', currentLoc: 'Arabian Sea (18.9°N, 72.8°E)', status: 'In Transit' },
    { track: 'COR-US-IN-02', route: 'Chicago ORD -> Bengaluru BLR', carrier: 'Lufthansa Cargo (LH 8220)', mode: 'Air Cold-Chain Pallet', temp: '3.8°C (Optimal 2-8°C)', transitTime: '22 Hours', currentLoc: 'BLR Cold Storage Terminal', status: 'Arrived & Cleared' },
    { track: 'COR-NL-IN-03', route: 'Rotterdam -> Chennai Port', carrier: 'MSC Mediterranean (MSC Oscar)', mode: 'Ocean Dry Container 20ft', temp: 'Ambient (21.4°C)', transitTime: '21 Days', currentLoc: 'Bay of Bengal (Port Approach)', status: 'Berthing Scheduled' },
    { track: 'COR-FR-IN-04', route: 'Paris CDG -> Mumbai BOM', carrier: 'Air France Cargo (AF 6734)', mode: 'Air Express Cargo', temp: 'Ambient (20.1°C)', transitTime: '14 Hours', currentLoc: 'BOM Air Cargo Vault', status: 'In Inspection Yard' },
    { track: 'COR-JP-IN-05', route: 'Yokohama -> JNPT Nhava Sheva', carrier: 'ONE Ocean Network (ONE Apus)', mode: 'High-Cube 40ft Flat-Rack', temp: 'Controlled Ambient', transitTime: '14 Days', currentLoc: 'JNPT Dedicated Corridor', status: 'Customs Clearance Gate' },
    { track: 'COR-IN-ME-06', route: 'Mumbai BOM -> Dubai DXB', carrier: 'Emirates SkyCargo (EK 505)', mode: 'Air Freight Envirotainer', temp: '4.5°C (Validated)', transitTime: '3.5 Hours', currentLoc: 'Dubai DWC Logistics Park', status: 'Delivered' },
    { track: 'COR-IN-SG-07', route: 'Chennai MAA -> Singapore SIN', carrier: 'Singapore Airlines Cargo (SQ 7287)', mode: 'Air Cargo Container (LD3)', temp: 'Ambient (22.0°C)', transitTime: '4.2 Hours', currentLoc: 'Changi Airport Cargo Complex', status: 'Delivered' },
    { track: 'COR-IN-UK-08', route: 'Nhava Sheva -> Southampton', carrier: 'CMA CGM (MV Palais Royal)', mode: 'Ocean Container 40ft', temp: 'Ambient (19.5°C)', transitTime: '24 Days', currentLoc: 'Suez Canal Transit (Port Said)', status: 'In Maritime Transit' },
    { track: 'COR-IN-AU-09', route: 'BLR Bengaluru -> Sydney SYD', carrier: 'Qantas Freight (QF 7552)', mode: 'Air Heavy Cargo Pallet', temp: 'Controlled (18.0°C)', transitTime: '16 Hours', currentLoc: 'Sydney Kingsford Smith Hub', status: 'In Transit' },
    { track: 'COR-IN-QA-10', route: 'Mumbai BOM -> Doha DOH', carrier: 'Qatar Airways Cargo (QR 8411)', mode: 'Air Temperature Controlled', temp: '3.9°C (Continuous Log)', transitTime: '3.8 Hours', currentLoc: 'Hamad International Cargo Hub', status: 'Delivered' }
  ];

  var PROFITABILITY_LINES = [
    { lane: 'Germany MAb Biologicals (Inbound JNPT)', grossCost: '₹68,20,000', landedLanded: '₹84,50,000', revenue: '₹1,32,00,000', grossProfit: '₹47,50,000', margin: '36.0%', status: 'High Yield ★★★★★' },
    { lane: 'USA Canine Core Vaccines Cold-Chain', grossCost: '₹49,60,000', landedLanded: '₹62,00,000', revenue: '₹1,05,40,000', grossProfit: '₹43,40,000', margin: '41.2%', status: 'Prime Margin ★★★★★' },
    { lane: 'Japan Digital Flat-Panel DR Imaging', grossCost: '₹76,00,000', landedLanded: '₹92,40,000', revenue: '₹1,44,00,000', grossProfit: '₹51,60,000', margin: '35.8%', status: 'High Yield ★★★★★' },
    { lane: 'Netherlands Synthetic Bovine Hormones', grossCost: '₹39,50,000', landedLanded: '₹48,20,000', revenue: '₹72,30,000', grossProfit: '₹24,10,000', margin: '33.3%', status: 'Stable ★★★★☆' },
    { lane: 'France Ultrasonic Dental Veterinary Sets', grossCost: '₹31,00,000', landedLanded: '₹39,80,000', revenue: '₹61,80,000', grossProfit: '₹22,00,000', margin: '35.6%', status: 'Strong ★★★★☆' },
    { lane: 'Outbound UAE Equine Orthopedic Implants', grossCost: '₹34,00,000', landedLanded: '₹38,20,000', revenue: '₹58,40,000', grossProfit: '₹20,20,000', margin: '34.6%', status: 'Export Prime ★★★★★' },
    { lane: 'Outbound Australia Titanium Bone Plates', grossCost: '₹27,80,000', landedLanded: '₹31,50,000', revenue: '₹49,80,000', grossProfit: '₹18,30,000', margin: '36.7%', status: 'Export Prime ★★★★★' },
    { lane: 'Outbound UK Herbal Hepato-Tonics', grossCost: '₹19,20,000', landedLanded: '₹22,10,000', revenue: '₹36,50,000', grossProfit: '₹14,40,000', margin: '39.5%', status: 'High Arbitrage ★★★★★' },
    { lane: 'Outbound Singapore Micro-Surgical Sutures', grossCost: '₹23,40,000', landedLanded: '₹26,80,000', revenue: '₹42,20,000', grossProfit: '₹15,40,000', margin: '36.5%', status: 'Export Prime ★★★★★' },
    { lane: 'Outbound Qatar Avian Specialty Medicines', grossCost: '₹17,50,000', landedLanded: '₹19,80,000', revenue: '₹31,10,000', grossProfit: '₹11,30,000', margin: '36.3%', status: 'High Yield ★★★★★' }
  ];

  /* ── State ───────────────────────────────────────────────────────── */
  var S = {
    open: false,
    tab: 'import-dashboard',
    search: ''
  };

  var root = null;

  /* ── Route Resolution ────────────────────────────────────────────── */
  function tabFromHash(hash) {
    if (!hash) return null;
    var h = (hash.startsWith('#') ? hash.slice(1) : hash).toLowerCase();
    if (h.indexOf('report') >= 0 || h.indexOf('alert') >= 0 || h.indexOf('vendor') >= 0 || h.indexOf('fashion') >= 0 || h.indexOf('b2b') >= 0 || h.indexOf('enterprise') >= 0 || h.indexOf('subscription') >= 0) {
      return null;
    }
    if (h === 'import-dashboard' || h === 'import-export' || h === 'import' || h === 'trade') return 'import-dashboard';
    if (h === 'export-dashboard' || h === 'export') return 'export-dashboard';
    if (h === 'import-orders' || h === 'ipo') return 'import-orders';
    if (h === 'export-orders' || h === 'xpo') return 'export-orders';
    if (h === 'suppliers' || h === 'global-suppliers') return 'suppliers';
    if (h === 'buyers' || h === 'international-buyers') return 'buyers';
    if (h === 'customs-documentation' || h === 'customs' || h === 'customs-docs') return 'customs';
    if (h === 'trade-logistics' || h === 'import-export-logistics') return 'logistics';
    if (h === 'import-export-profitability' || h === 'trade-profitability') return 'profitability';
    return null;
  }

  function tabFromText(txt) {
    if (!txt) return null;
    var raw = txt.replace(/\s+/g, ' ').trim().toLowerCase();
    if (raw.indexOf('report') >= 0 || raw.indexOf('alert') >= 0 || raw.indexOf('vendor') >= 0 || raw.indexOf('b2b') >= 0) return null;

    if (raw === 'import dashboard' || raw === 'import & export') return 'import-dashboard';
    if (raw === 'export dashboard') return 'export-dashboard';
    if (raw === 'import orders') return 'import-orders';
    if (raw === 'export orders') return 'export-orders';
    if (raw === 'suppliers') return 'suppliers';
    if (raw === 'buyers') return 'buyers';
    if (raw === 'customs & documentation' || raw === 'customs') return 'customs';
    if (raw === 'logistics' && raw.indexOf('delivery') < 0) return 'logistics';
    if (raw === 'import/export profitability' || raw === 'import export profitability') return 'profitability';
    return null;
  }

  /* ── KPI Helper ──────────────────────────────────────────────────── */
  function kpiHtml(label, val, delta, trend, subtext, icon) {
    return [
      '<div class="zix-kpi">',
        '<div class="zix-kpi-top">',
          '<span class="zix-kpi-label">' + esc(label) + '</span>',
          '<span class="zix-kpi-icon">' + esc(icon || '🌐') + '</span>',
        '</div>',
        '<div class="zix-kpi-val">' + esc(val) + '</div>',
        '<div class="zix-kpi-bottom">',
          '<span class="zix-delta ' + (trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'neutral') + '">' + (trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• ') + esc(delta) + '</span>',
          '<span class="zix-subtext">' + esc(subtext) + '</span>',
        '</div>',
      '</div>'
    ].join('');
  }

  /* ── Render Subdomains (10 Records Rendered for Each) ─────────────── */
  function renderImportDashboard() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Import Procurement (MTD)', '₹4.82 Cr', '+18.4% YoY', 'up', 'CIF Invoiced Valuation', '🚢'),
        kpiHtml('Avg Customs Clearance', '1.4 Days', '0.6 days via advance BE', 'up', 'Advance filing protocol', '⚡'),
        kpiHtml('Cold-Chain Marine Reefers', '6 Containers', '100% In-Range (2-8°C)', 'up', 'IoT Marine Telemetry', '❄️'),
        kpiHtml('Customs Duty & IGST Paid', '₹68.4 L', 'Tariff code 3004 / 3002', 'neutral', 'Auto-debited via ICEGATE', '🏛️'),
        kpiHtml('CDSCO / Quarantine NOC', '100%', 'Zero compliance holds', 'up', 'Veterinary drug permits', '🛡️'),
        kpiHtml('Global OEM Suppliers', '10 Partners', 'Direct contracts', 'up', 'Exclusive distribution', '🌍'),
      '</div>',

      '<div class="zix-card">',
        '<div class="zix-card-head">',
          '<div>',
            '<h3 class="zix-card-title">🌐 Active Inbound Import Consignments & Clearances (' + IMPORTS.length + ' Records)</h3>',
            '<p class="zix-card-sub">Bill of Lading status, port of entry, and customs clearance milestones</p>',
          '</div>',
          '<button class="zix-btn primary" onclick="ZenveImportExportDashboard.showNewConsignmentModal()">+ New Consignment</button>',
        '</div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>B/L or AWB #</th><th>Origin Country</th><th>Consignment Description</th><th>Port of Entry</th><th>CIF Value</th><th>Customs Clearance</th><th>ETA / Delivery</th><th>Status</th></tr></thead>',
            '<tbody>',
              IMPORTS.map(function(s) {
                var pillCls = (s.status === 'Received' ? 'cleared' : s.status === 'In Customs' ? 'customs' : 'transit');
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(s.bl) + '</td>' +
                  '<td style="font-weight:600;">' + esc(s.origin) + '</td>' +
                  '<td>' + esc(s.product) + '</td>' +
                  '<td>' + esc(s.port) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(s.value) + '</td>' +
                  '<td>' + esc(s.customs) + '</td>' +
                  '<td>' + esc(s.eta) + '</td>' +
                  '<td><span class="zix-pill ' + pillCls + '">' + esc(s.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExportDashboard() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Export Revenue (MTD)', '₹3.65 Cr', '+24.6% YoY', 'up', 'FOB Realization ($438K USD)', '🛫'),
        kpiHtml('Overseas Export Markets', '8 Countries', '10 active trade lanes', 'up', 'Middle East, APAC, Europe', '🌍'),
        kpiHtml('LC Execution Adherence', '100%', 'Zero default history', 'up', 'Backed by Tier-1 Banks', '📑'),
        kpiHtml('Duty Drawback / RoDTEP', '₹14.8 L', '100% incentive realized', 'up', 'Bank direct credit', '💵'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head">',
          '<div><h3 class="zix-card-title">🛫 Outbound Export Consignments & Trade Orders (' + EXPORTS.length + ' Records)</h3><p class="zix-card-sub">Shipping bills, destination clearance, and cargo dispatch telemetry</p></div>',
          '<button class="zix-btn primary" onclick="ZenveImportExportDashboard.showExportBookingModal()">+ Book Export</button>',
        '</div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Shipping Bill</th><th>Destination</th><th>Foreign Importer</th><th>Product Line</th><th>FOB Value</th><th>Customs Clearance</th><th>Dispatch Date</th><th>Status</th></tr></thead>',
            '<tbody>',
              EXPORTS.map(function(e) {
                var pillCls = (e.status === 'Delivered' ? 'cleared' : e.status === 'In Transit' ? 'trade' : 'warning');
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(e.sb) + '</td>' +
                  '<td style="font-weight:600;">' + esc(e.dest) + '</td>' +
                  '<td>' + esc(e.client) + '</td>' +
                  '<td>' + esc(e.items) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(e.fob) + '</td>' +
                  '<td>' + esc(e.clearance) + '</td>' +
                  '<td>' + esc(e.date) + '</td>' +
                  '<td><span class="zix-pill ' + pillCls + '">' + esc(e.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderImportOrders() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Open Import POs', '10 Consignments', '₹5.24 Cr value', 'up', 'Inbound global trade', '📑'),
        kpiHtml('Average Lead Time', '16 Days', '-2.4 days variance', 'up', 'Factory dispatch to hub', '⏱️'),
        kpiHtml('Forex Hedging Coverage', '92.5%', 'Forward contracts active', 'up', 'Protected vs USD/EUR surge', '🔒'),
        kpiHtml('Port Demurrage Days', '0 Days', 'DPD Direct Delivery', 'up', 'Zero demurrage charges', '⚡'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">📑 International Purchase Orders (IPO) Master (' + IMPORT_ORDERS.length + ' Records)</h3><p class="zix-card-sub">Foreign currencies, incoterms, and customs milestones</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>IPO #</th><th>Supplier</th><th>Goods Description</th><th>Forex & INR Value</th><th>Incoterms</th><th>Order Date</th><th>ETA</th><th>Status</th></tr></thead>',
            '<tbody>',
              IMPORT_ORDERS.map(function(o) {
                var pillCls = (o.status === 'Delivered' ? 'cleared' : o.status === 'In Customs' ? 'customs' : 'transit');
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(o.po) + '</td>' +
                  '<td style="font-weight:600;">' + esc(o.supplier) + '</td>' +
                  '<td>' + esc(o.goods) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(o.val) + '</td>' +
                  '<td>' + esc(o.terms) + '</td>' +
                  '<td>' + esc(o.orderDate) + '</td>' +
                  '<td>' + esc(o.eta) + '</td>' +
                  '<td><span class="zix-pill ' + pillCls + '">' + esc(o.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderExportOrders() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Active Export Orders', '10 Consignments', '₹3.42 Cr Value', 'up', 'Middle East & APAC', '📦'),
        kpiHtml('Order Realization', '98.4%', 'LC + Advance wire', 'up', 'Zero bad debt risk', '🛡️'),
        kpiHtml('Avg Export Ticket', '₹34.2 L', '+14.2% YoY', 'up', 'High-margin bespoke lines', '💰'),
        kpiHtml('Export Airway TAT', '2.1 Days', 'Direct express flights', 'up', 'BOM/BLR to DXB/SIN', '⚡'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">📦 International Export Orders Stream (' + EXPORT_ORDERS.length + ' Records)</h3><p class="zix-card-sub">Foreign buyers, contract terms, and dispatch progress</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Export Order</th><th>Buyer Entity</th><th>Country</th><th>Items</th><th>Forex Value</th><th>Payment Terms</th><th>Dispatch</th><th>Status</th></tr></thead>',
            '<tbody>',
              EXPORT_ORDERS.map(function(o) {
                var pillCls = (o.status === 'Delivered' ? 'cleared' : o.status === 'In Transit' ? 'trade' : 'warning');
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(o.expPo) + '</td>' +
                  '<td style="font-weight:600;">' + esc(o.buyer) + '</td>' +
                  '<td>' + esc(o.country) + '</td>' +
                  '<td>' + esc(o.items) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(o.val) + '</td>' +
                  '<td>' + esc(o.payment) + '</td>' +
                  '<td>' + esc(o.dispatch) + '</td>' +
                  '<td><span class="zix-pill ' + pillCls + '">' + esc(o.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderSuppliers() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Global OEM Suppliers', '10 Manufacturers', 'Tier-1 global networks', 'up', 'Direct exclusive contracts', '🌍'),
        kpiHtml('CDSCO Registered', '100%', 'Form 10 / 11 active', 'up', 'Biologicals clearance', '🛡️'),
        kpiHtml('Avg Import Lead Time', '4.8 Days', 'Via direct air corridors', 'up', 'Corridor optimization', '⏱️'),
        kpiHtml('Pre-Shipment QA Score', '99.4%', 'Zero batch rejections', 'up', 'Certificate of Analysis (COA)', '✅'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">🌍 Global Supplier Master Registry (' + SUPPLIERS.length + ' Records)</h3><p class="zix-card-sub">OEM manufacturers, CDSCO registrations, and annual volumes</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Supplier Code</th><th>Company Name</th><th>Country</th><th>Category</th><th>Payment Terms</th><th>Annual Volume</th><th>Regulatory Status</th><th>Rating</th></tr></thead>',
            '<tbody>',
              SUPPLIERS.map(function(s) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(s.code) + '</td>' +
                  '<td style="font-weight:600;">' + esc(s.name) + '</td>' +
                  '<td>' + esc(s.country) + '</td>' +
                  '<td>' + esc(s.cat) + '</td>' +
                  '<td>' + esc(s.terms) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(s.annualVol) + '</td>' +
                  '<td><span class="zix-pill cleared">' + esc(s.cdsco) + '</span></td>' +
                  '<td style="font-weight:600;">' + esc(s.rating) + '</td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderBuyers() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Active Global Buyers', '10 Accounts', 'Across 8 countries', 'up', 'Direct export frameworks', '🤝'),
        kpiHtml('Annualized Export Demand', '₹56.4 Cr', '+28.5% YoY', 'up', '$6.8M USD equivalent', '💰'),
        kpiHtml('Buyer Payment Record', '100%', 'Zero defaults', 'up', 'Bank LC backed', '🛡️'),
        kpiHtml('Target Markets', '8 Regions', 'Regulatory clearances active', 'up', 'Expansion pipeline', '🌍'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">🤝 International Buyers Master Ledger (' + BUYERS.length + ' Records)</h3><p class="zix-card-sub">Foreign distributor chains, hospital networks, and contract values</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Buyer Code</th><th>Organization Name</th><th>Country</th><th>Channel Profile</th><th>Annual Value</th><th>Payment Terms</th><th>Account Lead</th><th>Status</th></tr></thead>',
            '<tbody>',
              BUYERS.map(function(b) {
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(b.code) + '</td>' +
                  '<td style="font-weight:600;">' + esc(b.name) + '</td>' +
                  '<td>' + esc(b.country) + '</td>' +
                  '<td>' + esc(b.type) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(b.contractVal) + '</td>' +
                  '<td>' + esc(b.paymentTerms) + '</td>' +
                  '<td>' + esc(b.rep) + '</td>' +
                  '<td><span class="zix-pill trade">' + esc(b.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderCustoms() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('ICEGATE Filings', '10 Active', '100% digital e-Sanchit', 'up', 'Direct port clearance', '🏛️'),
        kpiHtml('Clearance Turnaround', '1.2 Days', '-0.8 days improvement', 'up', 'Advance filing protocol', '⚡'),
        kpiHtml('Tariff Compliance', '100%', 'Zero penalty notices', 'up', 'Certified CHA audited', '🛡️'),
        kpiHtml('Drawback Claimed', '₹24.5 L', '100% export incentive', 'up', 'Credited to bank', '💵'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">🏛️ Customs Declarations (Bill of Entry & Shipping Bills) (' + CUSTOMS_DOCS.length + ' Records)</h3><p class="zix-card-sub">HSN tariff codes, assessable values, duty amounts, and clearance status</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Filing #</th><th>Type</th><th>Port</th><th>HSN Code</th><th>Declared Value</th><th>Duty / Drawback</th><th>Regulatory Agency</th><th>Status</th></tr></thead>',
            '<tbody>',
              CUSTOMS_DOCS.map(function(d) {
                var pillCls = d.status.indexOf('Cleared') >= 0 || d.status.indexOf('LEO') >= 0 ? 'cleared' : d.status.indexOf('In Assessment') >= 0 ? 'customs' : 'trade';
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(d.docId) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.type) + '</td>' +
                  '<td>' + esc(d.port) + '</td>' +
                  '<td style="font-family:monospace;">' + esc(d.hsn) + '</td>' +
                  '<td style="font-weight:600;">' + esc(d.assessableVal) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(d.duty) + '</td>' +
                  '<td>' + esc(d.agency) + '</td>' +
                  '<td><span class="zix-pill ' + pillCls + '">' + esc(d.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderLogistics() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Multimodal Trade Legs', '10 Corridors', 'Ocean & Air Freight', 'up', 'Direct OEM routing', '🚢'),
        kpiHtml('Marine Cold-Chain IoT', '100% In-Range', 'Continuous telemetry', 'up', 'Zero temperature excursions', '❄️'),
        kpiHtml('Air Cargo Transit Time', '16.4 Hours', 'Direct corridors', 'up', 'CDG/FRA to BLR/BOM', '✈️'),
        kpiHtml('Port DPD Clearance', '18 Hours', 'Direct Port Delivery', 'up', 'Zero port container delay', '⚡'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">🚢 Live Cross-Border Multimodal Telematics (' + LOGISTICS_CORRIDORS.length + ' Records)</h3><p class="zix-card-sub">Vessel positions, flight numbers, temperature telemetry, and port arrival</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Corridor</th><th>Route</th><th>Carrier & Vessel</th><th>Mode</th><th>Temperature</th><th>Transit Time</th><th>Current Location</th><th>Status</th></tr></thead>',
            '<tbody>',
              LOGISTICS_CORRIDORS.map(function(l) {
                var pillCls = (l.status === 'Delivered' || l.status.indexOf('Cleared') >= 0 ? 'cleared' : l.status.indexOf('Transit') >= 0 ? 'trade' : 'customs');
                return '<tr>' +
                  '<td style="font-family:monospace;font-weight:600;">' + esc(l.track) + '</td>' +
                  '<td style="font-weight:600;">' + esc(l.route) + '</td>' +
                  '<td>' + esc(l.carrier) + '</td>' +
                  '<td>' + esc(l.mode) + '</td>' +
                  '<td style="color:#0891b2;font-weight:600;">' + esc(l.temp) + '</td>' +
                  '<td>' + esc(l.transitTime) + '</td>' +
                  '<td>' + esc(l.currentLoc) + '</td>' +
                  '<td><span class="zix-pill ' + pillCls + '">' + esc(l.status) + '</span></td>' +
                '</tr>';
              }).join(''),
            '</tbody>',
          '</table>',
        '</div>',
      '</div>'
    ].join('');
  }

  function renderProfitability() {
    return [
      '<div class="zix-kpi-grid">',
        kpiHtml('Blended Trade Margin', '38.6%', '+4.2% YoY', 'up', 'Direct OEM arbitrage', '💎'),
        kpiHtml('Landed Cost Multiplier', '1.28x CIF', 'Duty + Freight + Clearing', 'up', 'Lean cross-border supply', '📈'),
        kpiHtml('Export Net Contribution', '₹1.41 Cr', '36.8% export margin', 'up', 'Specialty veterinary margin', '💰'),
        kpiHtml('Forex Gain / Arbitrage', '₹18.2 L', 'Forward locked', 'up', 'Treasury forward contracts', '🌐'),
      '</div>',
      '<div class="zix-card">',
        '<div class="zix-card-head"><div><h3 class="zix-card-title">💎 Trade Lane Unit Economics & Landed Cost Margins (' + PROFITABILITY_LINES.length + ' Records)</h3><p class="zix-card-sub">Procurement cost, landed duties, realized sales, and gross profit</p></div></div>',
        '<div class="zix-table-wrap">',
          '<table class="zix-table">',
            '<thead><tr><th>Trade Lane Description</th><th>Procurement</th><th>Landed Cost</th><th>Realized Revenue</th><th>Gross Profit</th><th>Margin</th><th>Status</th></tr></thead>',
            '<tbody>',
              PROFITABILITY_LINES.map(function(l) {
                return '<tr>' +
                  '<td style="font-weight:600;">' + esc(l.lane) + '</td>' +
                  '<td>' + esc(l.grossCost) + '</td>' +
                  '<td style="color:#64748b;">' + esc(l.landedLanded) + '</td>' +
                  '<td style="font-weight:600;color:#0f172a;">' + esc(l.revenue) + '</td>' +
                  '<td style="font-weight:600;color:#059669;">' + esc(l.grossProfit) + '</td>' +
                  '<td style="font-weight:600;color:#0891b2;">' + esc(l.margin) + '</td>' +
                  '<td><span class="zix-pill cleared">' + esc(l.status) + '</span></td>' +
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
      '<header class="zix-head">',
        '<div class="zix-head-left">',
          '<div class="zix-title-row">',
            '<h2 class="zix-title">' + currentTab.icon + ' ' + esc(currentTab.title) + '</h2>',
            '<span class="zix-live-badge"><span class="zix-pulse-dot"></span> Cross-Border Trade · Live</span>',
          '</div>',
          '<p class="zix-sub">' + esc(currentTab.sub) + '</p>',
        '</div>',
        '<div class="zix-head-actions">',
          '<button class="zix-btn" onclick="ZenveImportExportDashboard.showExportBookingModal()">+ Book Export</button>',
          '<button class="zix-btn primary" onclick="ZenveImportExportDashboard.showNewConsignmentModal()">+ New Consignment</button>',
        '</div>',
      '</header>',

      '<nav class="zix-tabs-bar">',
        TABS.map(function (t) {
          var active = t.id === S.tab ? ' active' : '';
          return '<button class="zix-tab' + active + '" onclick="ZenveImportExportDashboard.switchTab(\'' + t.id + '\')">' +
            '<span>' + t.icon + '</span>' +
            '<span>' + esc(t.label) + '</span>' +
            '<span class="zix-tab-badge">' + esc(t.badge) + '</span>' +
          '</button>';
        }).join(''),
      '</nav>',

      '<main class="zix-body">'
    ];

    switch (S.tab) {
      case 'import-dashboard': html.push(renderImportDashboard()); break;
      case 'export-dashboard': html.push(renderExportDashboard()); break;
      case 'import-orders':    html.push(renderImportOrders()); break;
      case 'export-orders':    html.push(renderExportOrders()); break;
      case 'suppliers':        html.push(renderSuppliers()); break;
      case 'buyers':           html.push(renderBuyers()); break;
      case 'customs':          html.push(renderCustoms()); break;
      case 'logistics':        html.push(renderLogistics()); break;
      case 'profitability':    html.push(renderProfitability()); break;
      default:                 html.push(renderImportDashboard());
    }

    html.push('</main>');
    root.innerHTML = html.join('');
  }

  /* ── Modals & Actions ────────────────────────────────────────────── */
  function showModal(contentHtml) {
    closeModal();
    var backdrop = document.createElement('div');
    backdrop.id = 'zix-active-modal';
    backdrop.className = 'zix-modal-backdrop';
    backdrop.innerHTML = '<div class="zix-modal">' + contentHtml + '</div>';
    backdrop.onclick = function (e) {
      if (e.target === backdrop) closeModal();
    };
    document.body.appendChild(backdrop);
  }

  function closeModal() {
    var existing = document.getElementById('zix-active-modal');
    if (existing) existing.remove();
  }

  function showNewConsignmentModal() {
    var formHtml = [
      '<div class="zix-modal-head">',
        '<h3 class="zix-modal-title">🚢 Create Inbound Import Consignment</h3>',
        '<button class="zix-btn" onclick="ZenveImportExportDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Consignment created. Advance Bill of Entry generated for ICEGATE filing!\'); ZenveImportExportDashboard.closeModal();">',
        '<div class="zix-form-group"><label>International Supplier</label><select class="zix-select"><option>Boehringer Ingelheim Animal Health (Germany)</option><option>Zoetis Global Manufacturing LLC (USA)</option><option>MSD Animal Health B.V. (Netherlands)</option><option>Virbac SA (France)</option><option>Canon Medical Systems Vet (Japan)</option></select></div>',
        '<div class="zix-form-group"><label>Consignment Description / B/L</label><input type="text" class="zix-input" placeholder="e.g. 2 x 40ft HQ Reefer Container Nobivac DHPPi" required /></div>',
        '<div class="zix-form-row">',
          '<div class="zix-form-group"><label>CIF Value (USD / EUR)</label><input type="text" class="zix-input" placeholder="€52,000 (~₹46.8L)" required /></div>',
          '<div class="zix-form-group"><label>Port of Entry</label><select class="zix-select"><option>Nhava Sheva (JNPT)</option><option>Bengaluru Air Cargo (BLR)</option><option>Mumbai Air Cargo (BOM)</option><option>Chennai Port (MAA)</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zix-btn" onclick="ZenveImportExportDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zix-btn primary">Submit Consignment</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  function showExportBookingModal() {
    var formHtml = [
      '<div class="zix-modal-head">',
        '<h3 class="zix-modal-title">🛫 Book Overseas Export Flight / Vessel</h3>',
        '<button class="zix-btn" onclick="ZenveImportExportDashboard.closeModal()">✕</button>',
      '</div>',
      '<form onsubmit="event.preventDefault(); alert(\'Export booking confirmed. Shipping Bill auto-generated!\'); ZenveImportExportDashboard.closeModal();">',
        '<div class="zix-form-group"><label>Foreign Importer / Destination</label><input type="text" class="zix-input" placeholder="e.g. Royal Pets Hospital LLC (Dubai, UAE)" required /></div>',
        '<div class="zix-form-row">',
          '<div class="zix-form-group"><label>FOB Value (INR)</label><input type="text" class="zix-input" placeholder="₹14,50,000" required /></div>',
          '<div class="zix-form-group"><label>Mode of Export</label><select class="zix-select"><option>Air Cargo (Emirates)</option><option>Air Express (DHL)</option><option>Ocean Container (FCL)</option></select></div>',
        '</div>',
        '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">',
          '<button type="button" class="zix-btn" onclick="ZenveImportExportDashboard.closeModal()">Cancel</button>',
          '<button type="submit" class="zix-btn primary">Confirm Export Booking</button>',
        '</div>',
      '</form>'
    ].join('');
    showModal(formHtml);
  }

  /* ── Open & Close Mechanics ──────────────────────────────────────── */
  function build() {
    root = document.getElementById('zix-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'zix-root';
      root.className = 'zpanel-root';
      document.body.appendChild(root);
    }
  }

  function open(tab) {
    // Close other domain overlays
    ['zfa-root', 'zmkt-dashboard-root', 'zvp-root', 'zfsh-root', 'zb2b-root', 'zsub-root', 'zod-root', 'zsd-root', 'zpid-root', 'zph-root', 'zch-root', 'zrep-root', 'zalt-root', 'zset-root', 'zhr-root', 'zsys-root'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zb2b-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        el.style.display = 'none';
      }
    });
    if (document.querySelectorAll) {
      document.querySelectorAll('.zpanel-root').forEach(function(el) {
        if (el.id !== 'zix-root') {
          el.style.display = 'none';
          el.classList.remove('zfa-open', 'zmkt-open', 'zvp-open', 'zfsh-open', 'zb2b-open', 'zsub-open', 'zod-open', 'zsd-open', 'zpid-open', 'zph-open', 'zch-open', 'zrep-open', 'zalt-open', 'zset-open', 'zhr-open', 'zsys-open', 'zpanel-open');
        }
      });
    }

    if (tab && TABS.some(function (t) { return t.id === tab; })) {
      S.tab = tab;
    } else if (!S.tab) {
      S.tab = 'import-dashboard';
    }

    build();
    S.open = true;
    root.style.display = 'block';
    root.classList.add('zix-open', 'zpanel-open');
    try {
      document.documentElement.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zb2b-locked', 'zsub-locked');
      document.body.classList.remove('zfsh-locked', 'zvp-locked', 'zalt-locked', 'zb2b-locked', 'zsub-locked');
      document.documentElement.classList.add('zix-locked');
      document.body.classList.add('zix-locked');
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
      root.classList.remove('zix-open', 'zpanel-open');
      root.style.display = 'none';
    }
    try {
      document.documentElement.classList.remove('zix-locked');
      document.body.classList.remove('zix-locked');
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
      var otherDomains = ['sales', 'operations', 'inventory', 'pharmacy', 'clinics', 'doctors', 'reports', 'alerts', 'settings', 'finance', 'marketing', 'vendors', 'procurement', 'fashion', 'b2b', 'enterprise', 'subscription'];
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

      var isSidebar = !!el.closest('aside, [class*="sidebar"]') && !el.closest('#zix-root');
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
  window.ZenveImportExportDashboard = {
    open: open,
    close: close,
    switchTab: switchTab,
    closeModal: closeModal,
    showNewConsignmentModal: showNewConsignmentModal,
    showExportBookingModal: showExportBookingModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInterception);
  } else {
    initInterception();
  }
})();
