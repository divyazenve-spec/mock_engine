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
    Order,
    Pet,
    Product,
    Sale,
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
                vaccination_status="Up to date",
                last_visit_date=today_date - timedelta(days=random.randint(2, 20))
            )
            db.add(pet_obj)

        db.commit()
        print("All domain tables successfully seeded in MySQL!")

    finally:
        db.close()


if __name__ == "__main__":
    seed_all()
