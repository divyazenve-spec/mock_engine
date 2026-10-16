"""Comprehensive database seeder for all Zenve Engine MySQL domains."""
import json
import random
from datetime import date, datetime, timedelta
from pathlib import Path

from app.core.database import SessionLocal
from app.models.all_models import (
    ClinicHospital,
    Customer,
    DailyMetric,
    Doctor,
    Employee,
    LogisticsDelivery,
    MarketingCampaign,
    Order,
    Pet,
    PharmacyMedicine,
    Product,
    Report,
    Sale,
    Vendor,
    VeterinaryService,
)

# 10 Customers
MOCK_CUSTOMERS = [
    ("Ananya Deshmukh", "ananya.d@zenve.in", "+91 98450 12345", "Bengaluru", "Leo (Golden Retriever)", 24, 184500.0, "Diamond"),
    ("Vikramaditya Singhania", "vikram.s@zenve.in", "+91 98201 23456", "Mumbai", "Milo (Persian Cat)", 19, 156200.0, "Diamond"),
    ("Rohan Kapoor", "rohan.k@zenve.in", "+91 98110 34567", "Delhi NCR", "Thor (German Shepherd)", 18, 138900.0, "Diamond"),
    ("Meera Nambiar", "meera.n@zenve.in", "+91 98490 45678", "Hyderabad", "Buddy (Beagle)", 15, 112400.0, "Diamond"),
    ("Kavita Iyer", "kavita.i@zenve.in", "+91 98400 56789", "Chennai", "Bruno (Labrador)", 14, 98600.0, "Gold"),
    ("Dr. Siddharth Malhotra", "siddharth.m@zenve.in", "+91 98220 67890", "Pune", "Charlie (Cocker Spaniel)", 12, 87400.0, "Gold"),
    ("Pooja Verma", "pooja.v@zenve.in", "+91 98300 78901", "Kolkata", "Ghost (Siberian Husky)", 11, 76800.0, "Gold"),
    ("Farhan Akhtar", "farhan.a@zenve.in", "+91 98250 89012", "Ahmedabad", "Coco (French Bulldog)", 9, 64500.0, "Gold"),
    ("Deepa Swamy", "deepa.s@zenve.in", "+91 98470 90123", "Kochi", "Bella (Shih Tzu)", 8, 52300.0, "Silver"),
    ("Tanvi Chatterjee", "tanvi.c@zenve.in", "+91 98140 01234", "Chandigarh", "Sheru (Indie Rescue)", 7, 41900.0, "Silver")
]

# 10 Doctors
MOCK_DOCTORS = [
    ("DOC-01", "Dr. Divya Balasubramanian", "Veterinary Surgery", "BVSc & AH, MVSc", 12, "+91 98450 11101", "divya.b@zenve.care", "Zenve Central, Koramangala", 328, 4.96),
    ("DOC-02", "Dr. Ananya Deshmukh", "Small Animal Medicine", "BVSc, MVSc Med", 9, "+91 98450 11102", "ananya.d@zenve.care", "Zenve South, Indiranagar", 294, 4.94),
    ("DOC-03", "Dr. Vikramaditya Rathore", "Orthopedic Surgery", "MVSc Surgery", 11, "+91 98450 11103", "vikram.r@zenve.care", "Zenve North, Whitefield", 246, 4.93),
    ("DOC-04", "Dr. Priya Sharma", "Soft Tissue Surgery", "BVSc & AH", 8, "+91 98450 11104", "priya.s@zenve.care", "Zenve Central, Koramangala", 232, 4.95),
    ("DOC-05", "Dr. Rajeshwar Kulkarni", "Cardiology & Critical Care", "MVSc Cardiology", 10, "+91 98450 11105", "rajesh.k@zenve.care", "Zenve West, Malleshwaram", 188, 4.95),
    ("DOC-06", "Dr. Shalini Mukherjee", "Dermatology & Allergy", "MVSc Dermatology", 7, "+91 98450 11106", "shalini.m@zenve.care", "Zenve South, Jayanagar", 215, 4.91),
    ("DOC-07", "Dr. Siddharth Sen", "Emergency & Trauma Care", "BVSc, MVSc", 9, "+91 98450 11107", "siddharth.s@zenve.care", "Zenve 24x7 Trauma Center", 198, 4.90),
    ("DOC-08", "Dr. Meera Nambiar", "Veterinary Dentistry", "BVSc & AH", 6, "+91 98450 11108", "meera.n@zenve.care", "Zenve Central, Koramangala", 172, 4.89),
    ("DOC-09", "Dr. Farhan Qureshi", "Exotic Pet & Avian Care", "MVSc Wildlife", 8, "+91 98450 11109", "farhan.q@zenve.care", "Zenve North, Whitefield", 156, 4.88),
    ("DOC-10", "Dr. Tanvi Venkatesh", "Preventive Care & Vaccines", "BVSc", 5, "+91 98450 11110", "tanvi.v@zenve.care", "Zenve South, HSR Layout", 195, 4.87)
]

# 10 Employees
MOCK_EMPLOYEES = [
    ("EMP-01", "Dr. Priya Sharma", "priya.sharma@zenve.in", "+91 98451 00001", "Veterinary Surgery", "Chief Lead Surgeon", 145000.0),
    ("EMP-02", "Karthik Sundaram", "karthik.s@zenve.in", "+91 98451 00002", "Clinical Operations", "Senior Care Manager", 115000.0),
    ("EMP-03", "Dr. Rajesh Nair", "rajesh.nair@zenve.in", "+91 98451 00003", "Veterinary Medicine", "Senior Internist", 135000.0),
    ("EMP-04", "Ananya Sen", "ananya.sen@zenve.in", "+91 98451 00004", "Pet Nutrition & Diet", "Lead Nutritionist", 95000.0),
    ("EMP-05", "Dr. Shalini Verma", "shalini.v@zenve.in", "+91 98451 00005", "Dermatology & Allergy", "Senior Dermatologist", 125000.0),
    ("EMP-06", "Vivek Joshi", "vivek.joshi@zenve.in", "+91 98451 00006", "Teleconsultation", "Care Lead Coordinator", 85000.0),
    ("EMP-07", "Dr. Arun Kulkarni", "arun.kulkarni@zenve.in", "+91 98451 00007", "Dental & Ortho", "Veterinary Dentist", 120000.0),
    ("EMP-08", "Sneha Pillai", "sneha.pillai@zenve.in", "+91 98451 00008", "Diagnostics & Labs", "Pathology Lead", 90000.0),
    ("EMP-09", "Rohan Mehta", "rohan.mehta@zenve.in", "+91 98451 00009", "Rapid Pharmacy", "Fulfillment Operations", 80000.0),
    ("EMP-10", "Meenakshi Rao", "meenakshi.rao@zenve.in", "+91 98451 00010", "Wellness & Grooming", "Spa & Wellness Director", 85000.0)
]

# 10 Products
MOCK_PRODUCTS = [
    ("SKU-RC-GI-10K", "Royal Canin Veterinary Diet (Gastrointestinal 10kg)", "Prescription Nutrition", "Royal Canin", 7680.0, 4915.0, 380, 25),
    ("SKU-HC-FULL-01", "Comprehensive Full Pet Health Checkup & Diagnostics", "Clinical Diagnostic", "Zenve Care", 3500.0, 840.0, 710, 50),
    ("SKU-BRV-TICK-L", "Bravecto Chewable Flea & Tick Treatment (20-40kg)", "Preventive Pharmacy", "MSD Animal Health", 2450.0, 1420.0, 580, 30),
    ("SKU-NXG-SPEC-M", "NexGard Spectra Multi-Parasite Chew for Dogs", "Prescription Pharmacy", "Boehringer Ingelheim", 2980.0, 1668.0, 490, 30),
    ("SKU-HIL-CD-F4K", "Hill's Prescription Diet c/d Multicare Feline", "Prescription Nutrition", "Hill's Pet", 8200.0, 5330.0, 220, 15),
    ("SKU-VAC-7IN1-C", "Canine Core 7-in-1 Annual Booster Vaccination", "Immunization", "Zoetis", 1850.0, 592.0, 660, 40),
    ("SKU-VAC-TRIO-F", "Feline Tricat Trio Core Vaccine Protocol", "Immunization", "Intervet", 1600.0, 480.0, 480, 35),
    ("SKU-DEN-SCAL-0", "Veterinary Dental Ultrasonic Scaling & Polishing", "Surgical & Dental", "Zenve Clinical", 5800.0, 1624.0, 145, 10),
    ("SKU-SUP-GLYC-P", "Orthopedic Joint Support Supplement (Glycoflex Plus)", "Wellness & Supplements", "VetriScience", 3200.0, 1664.0, 340, 25),
    ("SKU-CHW-CALM-O", "Zenve Calming Anti-Anxiety Chews (Organic Chamomile)", "OTC Wellness", "Zenve Organics", 1450.0, 652.0, 650, 45)
]

# 10 Orders
MOCK_ORDERS = [
    ("ORD-9021", "Ananya Deshmukh", "+91 98450 12345", 2, 7680.0, "Delivered", "UPI", "Android App", "60-Minute Rapid", "Bengaluru"),
    ("ORD-9020", "Vikramaditya Singhania", "+91 98201 23456", 1, 14500.0, "Completed", "Credit Card", "In-Clinic Kiosk", "Clinic Session", "Mumbai"),
    ("ORD-9019", "Rohan Kapoor", "+91 98110 34567", 1, 3420.0, "Delivered", "Net Banking", "iOS App", "Same Day", "Delhi NCR"),
    ("ORD-9018", "Meera Nambiar", "+91 98490 45678", 1, 1850.0, "Completed", "UPI", "Web Portal", "Digital Telehealth", "Hyderabad"),
    ("ORD-9017", "Kavita Iyer", "+91 98400 56789", 3, 4900.0, "Delivered", "UPI", "Partner Clinic", "Clinic Pickup", "Chennai"),
    ("ORD-9016", "Dr. Siddharth Malhotra", "+91 98220 67890", 1, 5800.0, "Completed", "Debit Card", "Android App", "Clinic Procedure", "Pune"),
    ("ORD-9015", "Pooja Verma", "+91 98300 78901", 2, 2650.0, "Delivered", "UPI", "WhatsApp Care", "Express Delivery", "Kolkata"),
    ("ORD-9014", "Farhan Akhtar", "+91 98250 89012", 1, 3200.0, "Completed", "Credit Card", "iOS App", "Clinic Session", "Ahmedabad"),
    ("ORD-9013", "Deepa Swamy", "+91 98470 90123", 2, 2100.0, "Delivered", "UPI", "Android App", "Standard Delivery", "Kochi"),
    ("ORD-9012", "Tanvi Chatterjee", "+91 98140 01234", 1, 6400.0, "Completed", "Net Banking", "Direct Dispatch", "Emergency Care", "Chandigarh")
]

# 10 Clinics
MOCK_CLINICS = [
    ("CLN-01", "Zenve Central Animal Hospital, Koramangala", "80ft Road, 4th Block, Koramangala", "Bengaluru", "Karnataka", "+91 80 4123 0001", 12, 25, 145),
    ("CLN-02", "Zenve South Specialist Clinic, Indiranagar", "100ft Road, HAL 2nd Stage, Indiranagar", "Bengaluru", "Karnataka", "+91 80 4123 0002", 8, 15, 95),
    ("CLN-03", "Zenve North Hospital & ICU, Whitefield", "ITPL Main Road, Whitefield", "Bengaluru", "Karnataka", "+91 80 4123 0003", 10, 20, 110),
    ("CLN-04", "Zenve Mumbai Flagship, Bandra West", "Hill Road, Bandra West", "Mumbai", "Maharashtra", "+91 22 2640 0001", 10, 20, 120),
    ("CLN-05", "Zenve Delhi NCR Center, Gurugram", "Golf Course Road, Sector 54", "Delhi NCR", "Haryana", "+91 124 456 0001", 8, 16, 85),
    ("CLN-06", "Zenve Hyderabad Hub, Jubilee Hills", "Road No. 36, Jubilee Hills", "Hyderabad", "Telangana", "+91 40 2355 0001", 7, 14, 70),
    ("CLN-07", "Zenve Chennai Care, Alwarpet", "TTK Road, Alwarpet", "Chennai", "Tamil Nadu", "+91 44 2499 0001", 6, 12, 60),
    ("CLN-08", "Zenve Pune Clinic, Koregaon Park", "North Main Road, Koregaon Park", "Pune", "Maharashtra", "+91 20 2615 0001", 6, 10, 55),
    ("CLN-09", "Zenve Kolkata Center, Salt Lake", "Sector V, Salt Lake City", "Kolkata", "West Bengal", "+91 33 2357 0001", 5, 10, 45),
    ("CLN-10", "Zenve Ahmedabad Hub, Bodakdev", "SG Highway, Bodakdev", "Ahmedabad", "Gujarat", "+91 79 2685 0001", 5, 8, 40)
]

# 10 Services
MOCK_SERVICES = [
    ("SRV-01", "Comprehensive Full Pet Health Checkup & Diagnostics", "Clinical Diagnostic", 45, 3500.0, "Dr. Priya Sharma"),
    ("SRV-02", "Veterinary Surgery & Soft Tissue Procedures", "Surgery", 90, 14500.0, "Dr. Divya Balasubramanian"),
    ("SRV-03", "Canine Core 7-in-1 Annual Booster Vaccination", "Immunization", 20, 1850.0, "Dr. Tanvi Venkatesh"),
    ("SRV-04", "Feline Tricat Trio Core Vaccine Protocol", "Immunization", 20, 1600.0, "Dr. Tanvi Venkatesh"),
    ("SRV-05", "Veterinary Dental Ultrasonic Scaling & Polishing", "Dental", 60, 5800.0, "Dr. Meera Nambiar"),
    ("SRV-06", "Orthopedic Consultation & Joint Radiography", "Orthopedic", 45, 3200.0, "Dr. Vikramaditya Rathore"),
    ("SRV-07", "Canine & Feline Dermatology & Skin Scraping", "Dermatology", 30, 2500.0, "Dr. Shalini Mukherjee"),
    ("SRV-08", "Veterinary Cardiology ECG & Echocardiogram", "Cardiology", 60, 4800.0, "Dr. Rajeshwar Kulkarni"),
    ("SRV-09", "Exotic Pet & Avian Specialized Consultation", "Exotics", 30, 2500.0, "Dr. Farhan Qureshi"),
    ("SRV-10", "Tele-Health Instant Video Triage Consultation", "Telehealth", 20, 1200.0, "Dr. Siddharth Sen")
]

# 10 Medicines
MOCK_MEDICINES = [
    ("MED-BRV-01", "Bravecto Chewables (Fluralaner 250mg)", "MSD Animal Health", "Fluralaner", "Antiparasitic", 2450.0, 8, "BATCH-BRV-2026A", date(2027, 6, 30), 1, "Low Stock Warning"),
    ("MED-NXG-02", "NexGard Spectra Chewable Tablets (Medium Dog)", "Boehringer Ingelheim", "Afoxolaner + Milbemycin Oxime", "Antiparasitic", 2980.0, 12, "BATCH-NXG-882", date(2027, 8, 15), 1, "Low Stock Warning"),
    ("MED-APQ-03", "Apoquel 16mg Allergy Tablets", "Zoetis", "Oclacitinib Maleate", "Dermatology", 3850.0, 45, "BATCH-APQ-104", date(2027, 4, 30), 1, "In Stock"),
    ("MED-VTM-04", "Vetmedin 5mg Heart Chewable Tablets", "Boehringer Ingelheim", "Pimobendan", "Cardiology", 4200.0, 34, "BATCH-VTM-502", date(2027, 12, 31), 1, "In Stock"),
    ("MED-CLV-05", "Clavam Pet 250mg Antibiotic Suspension", "Intas Pharmaceuticals", "Amoxicillin + Clavulanic Acid", "Anti-Infective", 480.0, 85, "BATCH-CLV-773", date(2026, 11, 30), 1, "In Stock"),
    ("MED-MLX-06", "Meloxicam Oral Anti-Inflammatory 100ml", "Virbac", "Meloxicam 1.5mg/ml", "Analgesic & NSAID", 650.0, 60, "BATCH-MLX-901", date(2027, 3, 31), 1, "In Stock"),
    ("MED-CYT-07", "Cytopoint 30mg Monoclonal Antibody Injection", "Zoetis", "Lokivetmab", "Dermatology", 5200.0, 14, "BATCH-CYT-330", date(2026, 12, 15), 1, "Low Stock Warning"),
    ("MED-PRO-08", "Pro-Kolin Advanced Digestive Paste 30ml", "Protexin Veterinary", "Enterococcus faecium + Kaolin", "Gastrointestinal", 1450.0, 52, "BATCH-PRO-662", date(2027, 9, 30), 0, "In Stock"),
    ("MED-DEX-09", "Dextrose Normal Saline IV Infusion 500ml", "Baxter Healthcare", "Dextrose 5% + NaCl 0.9%", "Critical Care & Fluids", 180.0, 120, "BATCH-DNS-118", date(2028, 1, 1), 1, "In Stock"),
    ("MED-CAN-10", "Caninsulin 40 IU/ml Intermediate Insulin 10ml", "MSD Animal Health", "Purified Porcine Insulin", "Endocrinology", 1680.0, 22, "BATCH-INS-445", date(2026, 10, 31), 1, "In Stock"),
]

# 5 Vendors
MOCK_VENDORS = [
    ("VEN-01", "MSD Animal Health India Pvt Ltd", "Pharmaceuticals", "Dr. Alok Verma", "+91 22 6789 0001", "supply.msd@zenve.in", "Mumbai", 4.9, "Net 30", "Approved"),
    ("VEN-02", "Boehringer Ingelheim Vetmedica", "Pharmaceuticals", "Sangeeta Rao", "+91 22 6789 0002", "supply.boehringer@zenve.in", "Mumbai", 4.8, "Net 45", "Approved"),
    ("VEN-03", "Zoetis India Limited", "Immunization & Oncology", "Karan Malhotra", "+91 80 4455 0001", "supply.zoetis@zenve.in", "Bengaluru", 4.95, "Net 30", "Approved"),
    ("VEN-04", "Intas Animal Health Division", "Generics & Anti-Infectives", "Nitin Patel", "+91 79 3344 0001", "supply.intas@zenve.in", "Ahmedabad", 4.75, "Net 60", "Approved"),
    ("VEN-05", "Virbac Animal Health India", "Dermatology & Nutrition", "Sunita Nair", "+91 22 5566 0001", "supply.virbac@zenve.in", "Mumbai", 4.85, "Net 30", "Approved"),
]

# 10 Logistics Deliveries
MOCK_DELIVERIES = [
    ("DEL-60-001", "ORD-9021", "Zenve Express 60-Min", "Mahesh Kumar", "+91 98450 77001", "Indiranagar Hub, Bengaluru", "Koramangala 4th Block, Bengaluru", "Delivered", 0, "Express 60-Min"),
    ("DEL-60-002", "ORD-9019", "Zenve Express 60-Min", "Suraj Yadav", "+91 98110 77002", "Cyber Hub Dark Store, Gurgaon", "DLF Phase 5, Gurgaon", "Delivered", 0, "Express 60-Min"),
    ("DEL-60-003", "ORD-9017", "Zenve Express 60-Min", "Selvam R", "+91 98400 77003", "Alwarpet Clinic Depot, Chennai", "Boat Club Road, Chennai", "Delivered", 0, "Express 60-Min"),
    ("DEL-60-004", "ORD-9015", "Zenve Express 60-Min", "Subhash Bose", "+91 98300 77004", "Salt Lake Fulfillment Hub, Kolkata", "New Town Action Area 1, Kolkata", "Delivered", 0, "Express 60-Min"),
    ("DEL-60-005", "ORD-9013", "Zenve Express 60-Min", "Anil Varma", "+91 98470 77005", "Panampilly Nagar Depot, Kochi", "Marine Drive, Kochi", "Delivered", 0, "Express 60-Min"),
    ("DEL-60-006", "ORD-9022", "Zenve Express 60-Min", "Ramesh Gowda", "+91 98450 77006", "HSR Dark Store, Bengaluru", "Bellandur Green Glen, Bengaluru", "In Transit", 18, "Express 60-Min"),
    ("DEL-60-007", "ORD-9023", "Zenve Express 60-Min", "Vikram Shinde", "+91 98201 77007", "Bandra Flagship Hub, Mumbai", "Juhu Scheme, Mumbai", "In Transit", 24, "Express 60-Min"),
    ("DEL-60-008", "ORD-9024", "Zenve Express 60-Min", "Deepak Sharma", "+91 98110 77008", "South Extension Hub, Delhi", "Greater Kailash 1, Delhi", "In Transit", 32, "Express 60-Min"),
    ("DEL-60-009", "ORD-9025", "Zenve Express 60-Min", "Ganesh Reddy", "+91 98490 77009", "Jubilee Hills Depot, Hyderabad", "Banjara Hills Road 12, Hyderabad", "Dispatched", 42, "Express 60-Min"),
    ("DEL-60-010", "ORD-9026", "Zenve Express 60-Min", "Pravin Kulkarni", "+91 98220 77010", "Koregaon Park Depot, Pune", "Kalyani Nagar, Pune", "Dispatched", 48, "Express 60-Min"),
]

# 5 Marketing Campaigns
MOCK_CAMPAIGNS = [
    ("CMP-01", "Automated WhatsApp Rabies Booster Reminder Drive", "WhatsApp Business", 75000.0, 42000.0, 318000.0, 184, 7.57, "Active", date(2026, 9, 1)),
    ("CMP-02", "Puppy & Kitten First-Year Wellness Shield", "Meta & Instagram Ads", 150000.0, 118000.0, 542000.0, 290, 4.59, "Active", date(2026, 9, 15)),
    ("CMP-03", "Senior Canine Mobility & Arthritis Care Month", "Google Search & Display", 120000.0, 94000.0, 415000.0, 165, 4.41, "Active", date(2026, 10, 1)),
    ("CMP-04", "Monsoon Tick & Flea Prevention Drive (Bravecto/NexGard)", "In-App Push & SMS", 50000.0, 31000.0, 280000.0, 210, 9.03, "Active", date(2026, 8, 1)),
    ("CMP-05", "Veterinary Dental Health Checkup Drive", "Clinic Kiosk & Email", 40000.0, 28000.0, 168000.0, 95, 6.00, "Completed", date(2026, 8, 15)),
]



def seed_all():
    db = SessionLocal()
    try:
        now = datetime(2026, 10, 13, 16, 30, 0)
        today_date = now.date()

        print("1. Seeding Customers...")
        db.query(Customer).delete()
        for idx, (cname, cemail, cphone, ccity, cpet, corders, cspent, ctier) in enumerate(MOCK_CUSTOMERS, 1):
            cust = Customer(
                customer_code=f"CUST-{idx:03d}",
                name=cname,
                email=cemail,
                phone=cphone,
                city=ccity,
                pet_names=cpet,
                total_orders=corders,
                total_spent=cspent,
                tier=ctier,
                status="Active",
                joined_date=today_date - timedelta(days=idx * 45)
            )
            db.add(cust)

        print("2. Seeding Doctors...")
        db.query(Doctor).delete()
        for dcode, dname, dspec, dqual, dexp, dphone, demail, dclinic, dconsults, drating in MOCK_DOCTORS:
            doc = Doctor(
                doctor_code=dcode,
                name=dname,
                specialty=dspec,
                qualification=dqual,
                experience_years=dexp,
                phone=dphone,
                email=demail,
                clinic_branch=dclinic,
                status="On Duty",
                consultations_count=dconsults,
                rating=drating
            )
            db.add(doc)

        print("3. Seeding Employees...")
        db.query(Employee).delete()
        for idx, (ecode, ename, eemail, ephone, edept, erole, esalary) in enumerate(MOCK_EMPLOYEES, 1):
            emp = Employee(
                employee_code=ecode,
                name=ename,
                email=eemail,
                phone=ephone,
                department=edept,
                designation=erole,
                joining_date=today_date - timedelta(days=idx * 60),
                salary=esalary,
                status="Active"
            )
            db.add(emp)

        print("4. Seeding Products...")
        db.query(Product).delete()
        for psku, pname, pcat, pbrand, pprice, pcost, pstock, pmin in MOCK_PRODUCTS:
            prod = Product(
                sku=psku,
                name=pname,
                category=pcat,
                brand=pbrand,
                price=pprice,
                cost_price=pcost,
                stock=pstock,
                min_stock=pmin,
                unit="Pack / Unit",
                status="In Stock"
            )
            db.add(prod)

        print("5. Seeding Orders...")
        db.query(Order).delete()
        for ocode, ocust, ophone, ocount, oamount, ostatus, opay, ochannel, oslot, ocity in MOCK_ORDERS:
            ord_obj = Order(
                order_id=ocode,
                customer_name=ocust,
                customer_phone=ophone,
                items_count=ocount,
                total_amount=oamount,
                status=ostatus,
                payment_method=opay,
                channel=ochannel,
                delivery_slot=oslot,
                city=ocity
            )
            db.add(ord_obj)

        print("6. Seeding Clinics...")
        db.query(ClinicHospital).delete()
        for ccode, cname, caddr, ccity, cstate, cphone, cdoc, cbed, cfoot in MOCK_CLINICS:
            clinic = ClinicHospital(
                clinic_code=ccode,
                name=cname,
                address=caddr,
                city=ccity,
                state=cstate,
                phone=cphone,
                doctors_count=cdoc,
                beds_capacity=cbed,
                daily_footfall=cfoot,
                operational_status="Open 24x7"
            )
            db.add(clinic)

        print("7. Seeding Veterinary Services...")
        db.query(VeterinaryService).delete()
        for scode, sname, scat, sdur, sprice, sdoc in MOCK_SERVICES:
            svc = VeterinaryService(
                service_code=scode,
                name=sname,
                category=scat,
                duration_mins=sdur,
                price=sprice,
                doctor_in_charge=sdoc,
                status="Active",
                active_bookings=random.randint(12, 35)
            )
            db.add(svc)

        print("8. Seeding Pets...")
        db.query(Pet).delete()
        for idx, (cname, _, cphone, _, cpet, _, _, _) in enumerate(MOCK_CUSTOMERS, 1):
            pname_clean = cpet.split("(")[0].strip()
            pbreed_clean = cpet.split("(")[1].replace(")", "").strip() if "(" in cpet else "Golden Retriever"
            pet_obj = Pet(
                pet_code=f"PET-{idx:03d}",
                name=pname_clean,
                species="Cat" if "Cat" in cpet else "Dog",
                breed=pbreed_clean,
                age_years=float(random.randint(1, 7)),
                gender="Female" if idx % 2 == 0 else "Male",
                weight_kg=float(random.randint(5, 32)),
                parent_name=cname,
                parent_phone=cphone,
                vaccination_status="Overdue (Rabies)" if idx in (3, 7) else ("Overdue (DHPPi Booster)" if idx == 5 else "Up to date"),
                last_visit_date=today_date - timedelta(days=random.randint(2, 20))
            )
            db.add(pet_obj)

        print("9. Seeding Reports & Analytics...")
        db.query(Report).delete()
        mock_reports_data = [
            ("RPT-2026-001", "Executive Sales Performance & Channel Gross GMV", "Sales Reports", "CSV", "Daily Financial Audit Cron", "2.4 MB", "/exports/sales_mtd_oct2026.csv"),
            ("RPT-2026-002", "Business Unit Margins & Recurring Subscription ARR", "Revenue Reports", "XLSX", "Chief Financial Officer", "1.8 MB", "/exports/revenue_bu_q3.xlsx"),
            ("RPT-2026-003", "Customer Demographics, LTV & Cohort Retention", "Customer Reports", "CSV", "CRM Data Pipeline", "4.1 MB", "/exports/customer_cohorts_2026.csv"),
            ("RPT-2026-004", "Pet Breed Demographics & Vaccination Registry", "Pet Reports", "CSV", "Clinical Informatics System", "3.2 MB", "/exports/pet_demographics_census.csv"),
            ("RPT-2026-005", "Veterinary Doctor Caseload & Incentive Ledger", "Doctor Reports", "PDF", "Medical Operations Audit", "1.5 MB", "/exports/doctor_caseload_payouts.pdf"),
            ("RPT-2026-006", "Clinic Network ICU Utilization & OPD Throughput", "Clinic Reports", "CSV", "Hospital Director Console", "2.1 MB", "/exports/clinic_network_occupancy.csv"),
            ("RPT-2026-007", "Product Catalog Velocity & Pareto ABC Matrix", "Product Reports", "CSV", "Merchandising Analytics", "5.6 MB", "/exports/product_abc_matrix.csv"),
            ("RPT-2026-008", "Cold-Chain Depot Stock Valuation & Batch Expiry", "Inventory Reports", "XLSX", "Supply Chain Automated Cron", "3.8 MB", "/exports/depot_inventory_valuation.xlsx"),
            ("RPT-2026-009", "Audited Corporate GAAP Profit & Loss Statement", "Finance Reports", "PDF", "Ernst & Young Audit Sync", "1.9 MB", "/exports/gaap_pl_audited_statement.pdf"),
            ("RPT-2026-010", "60-Min Express Fulfillment & Dark Store SLAs", "Operations Reports", "CSV", "Logistics Telemetry Hub", "4.7 MB", "/exports/express_logistics_sla.csv")
        ]
        for rcode, rtitle, rcat, rfmt, rgen, rsize, rurl in mock_reports_data:
            rep = Report(
                report_code=rcode,
                title=rtitle,
                category=rcat,
                format=rfmt,
                generated_by=rgen,
                file_size=rsize,
                download_url=rurl
            )
            db.add(rep)

        print("10. Seeding Pharmacy Medicines...")
        db.query(PharmacyMedicine).delete()
        for mcode, mname, mbrand, msalt, mcat, mprice, mstock, mbatch, mexp, mpresc, mstat in MOCK_MEDICINES:
            med = PharmacyMedicine(
                med_code=mcode,
                name=mname,
                brand=mbrand,
                salt_name=msalt,
                category=mcat,
                price=mprice,
                stock=mstock,
                batch_no=mbatch,
                expiry_date=mexp,
                requires_prescription=mpresc,
                status=mstat
            )
            db.add(med)

        print("11. Seeding Vendors...")
        db.query(Vendor).delete()
        for vcode, vname, vcat, vcontact, vphone, vemail, vcity, vrate, vterms, vstat in MOCK_VENDORS:
            ven = Vendor(
                vendor_code=vcode,
                name=vname,
                category=vcat,
                contact_person=vcontact,
                phone=vphone,
                email=vemail,
                city=vcity,
                rating=vrate,
                payment_terms=vterms,
                status=vstat
            )
            db.add(ven)

        print("12. Seeding Logistics Deliveries...")
        db.query(LogisticsDelivery).delete()
        for did, dorder, dpartner, drider, dphone, dpickup, ddrop, dstat, deta, dtype in MOCK_DELIVERIES:
            delivery = LogisticsDelivery(
                delivery_id=did,
                order_ref=dorder,
                partner_name=dpartner,
                rider_name=drider,
                rider_phone=dphone,
                pickup_location=dpickup,
                drop_location=ddrop,
                status=dstat,
                eta_mins=deta,
                delivery_type=dtype,
                dispatched_at=datetime.utcnow() - timedelta(minutes=random.randint(10, 50))
            )
            db.add(delivery)

        print("13. Seeding Marketing Campaigns...")
        db.query(MarketingCampaign).delete()
        for ccode, cname, cchannel, cbud, cspd, crev, cleads, croas, cstat, cstart in MOCK_CAMPAIGNS:
            camp = MarketingCampaign(
                campaign_code=ccode,
                name=cname,
                channel=cchannel,
                budget=cbud,
                spent=cspd,
                revenue_generated=crev,
                leads_count=cleads,
                roas=croas,
                status=cstat,
                start_date=cstart
            )
            db.add(camp)

        db.commit()
        print("All domain tables successfully seeded in MySQL / SQLite!")

    finally:
        db.close()


if __name__ == "__main__":
    seed_all()
