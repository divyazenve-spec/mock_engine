"""Comprehensive Master Database Seeder for Zenve BI.
Extracts and loads ALL mock data from the website into SQLite/MySQL across all 24 tables.
"""
from __future__ import annotations

import os
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

from app.core.database import Base, SessionLocal, engine
import app.models  # Registers all models
from app.models.all_models import (
    DailyMetric,
    Sale,
    Order,
    Product,
    PharmacyMedicine,
    VeterinaryService,
    Appointment,
    Doctor,
    ClinicHospital,
    Customer,
    Pet,
    Employee,
    MarketingCampaign,
    Vendor,
    LogisticsDelivery,
    FashionProduct,
    B2BAccount,
    ImportExportShipment,
    SubscriptionPlan,
    Subscription,
    Report,
    Alert,
    SystemHealth,
    CompanySetting,
)

# Ensure tables exist
Base.metadata.create_all(bind=engine)


# ---------------------------------------------------------------------------
# 1. Critical Operational & Clinical Alerts (from CriticalAlerts.jsx)
# ---------------------------------------------------------------------------
MOCK_ALERTS = [
    {
        "alert_code": "CRIT-101",
        "title": "Main Biologics Vaccine Chiller Temperature Excursion",
        "message": "Chiller Temp: 9.8°C (Limit: 2°C - 8°C). INR 4.2L biological vaccines & insulin at risk at Indiranagar Surgical Hospital.",
        "category": "Cold-Chain / Clinical",
        "severity": "Critical",
        "status": "Active"
    },
    {
        "alert_code": "CRIT-102",
        "title": "Primary HDFC UPI Payment Gateway Down",
        "message": "Failure Rate: 84.2% on UPI collect calls. INR 6.8L/hr checkout volume stalling across National Digital Commerce app.",
        "category": "Payments / Finance",
        "severity": "Critical",
        "status": "Active"
    },
    {
        "alert_code": "CRIT-103",
        "title": "Bravecto 20-40kg Emergency Stockout at Koramangala",
        "message": "Available Stock: 0 Units (Min Threshold: 40). 42 patient prescription orders queued at Koramangala Express Hub.",
        "category": "Inventory / Stockout",
        "severity": "Critical",
        "status": "Active"
    },
    {
        "alert_code": "CRIT-104",
        "title": "ICU Oxygen Manifold Pressure Drop Alert",
        "message": "Line Pressure: 38 PSI (Norm: 55 PSI). 6 feline ventilator patients in critical care at Bandra West Medical Center.",
        "category": "ICU / Healthcare",
        "severity": "Critical",
        "status": "Active"
    },
    {
        "alert_code": "CRIT-105",
        "title": "Whitefield Express Fleet Weather Grounding Hazard",
        "message": "Waterlogging depth 45cm; 18 60-min express medicine deliveries at risk at Whitefield Micro-Hub.",
        "category": "Logistics / Weather",
        "severity": "Critical",
        "status": "Active"
    },
    {
        "alert_code": "CRIT-106",
        "title": "Controlled Drug Safe Electronic Lock Tamper Alert",
        "message": "Unauthorized keycard attempt x4 on Narcotic Locker. Schedule X pharmacy regulatory compliance triggered at South Ext Trauma Center.",
        "category": "Security / Regulatory",
        "severity": "Critical",
        "status": "Active"
    },
    {
        "alert_code": "CRIT-107",
        "title": "Trauma Surgical Table Overbooking Conflict",
        "message": "Dual Emergency C-Section + Ortho Fracture at 15:00 at Gurgaon Sec-29 Hospital. Auxiliary Operating Theatre 3 opened.",
        "category": "Surgical / Operations",
        "severity": "Critical",
        "status": "Active"
    },
    {
        "alert_code": "CRIT-108",
        "title": "High-Titer Feline Parvovirus Inpatient Isolation Alert",
        "message": "Positive Parvo ELISA confirmation in shared ward at HSR Layout Polyclinic. Quarantine barrier sealed.",
        "category": "Clinical / Inpatient",
        "severity": "Critical",
        "status": "Active"
    },
    {
        "alert_code": "CRIT-109",
        "title": "MySQL Analytical Cluster Database Lock Contention",
        "message": "Write Lock Wait Time: 4,820ms (>500ms limit). Deadlocks purged and thread pool resized from 64 to 256.",
        "category": "Infrastructure / IT",
        "severity": "Critical",
        "status": "Resolved"
    },
    {
        "alert_code": "CRIT-110",
        "title": "Cold-Chain Transport Van #4 GPS & Telemetry Loss",
        "message": "Zero ping response for 14 minutes in rain corridor. INR 2.1L veterinary oncology biologics in transit.",
        "category": "Logistics / Telemetry",
        "severity": "Critical",
        "status": "Active"
    }
]


# ---------------------------------------------------------------------------
# 2. Live Clinical Appointments (from Appointments.jsx)
# ---------------------------------------------------------------------------
MOCK_APPOINTMENTS = [
    {
        "appointment_code": "APT-1081",
        "pet_name": "Bruno (Golden Retriever, 4y)",
        "pet_type": "Dog",
        "parent_name": "Aditya Vikram Birla",
        "parent_phone": "+91 98450 12345",
        "doctor_name": "Dr. Rajeshwari Swaminathan",
        "service_name": "Orthopedic Joint Evaluation & TPLO Followup",
        "appointment_date": date.today(),
        "appointment_time": "09:00 AM",
        "status": "In Session",
        "clinic_name": "Indiranagar Central Hospital"
    },
    {
        "appointment_code": "APT-1082",
        "pet_name": "Simba (Persian Cat, 2y)",
        "pet_type": "Cat",
        "parent_name": "Pooja Singhania",
        "parent_phone": "+91 98201 23456",
        "doctor_name": "Dr. Sneha Nair",
        "service_name": "Feline Urinalysis & Renal Ultrasound",
        "appointment_date": date.today(),
        "appointment_time": "09:30 AM",
        "status": "Arrived / Checked In",
        "clinic_name": "Indiranagar Central Hospital"
    },
    {
        "appointment_code": "APT-1083",
        "pet_name": "Max (German Shepherd, 6y)",
        "pet_type": "Dog",
        "parent_name": "Rohan Deshmukh",
        "parent_phone": "+91 98110 34567",
        "doctor_name": "Dr. Vikramaditya Rathore",
        "service_name": "Emergency GDV Decompression & Pre-Op",
        "appointment_date": date.today(),
        "appointment_time": "10:00 AM",
        "status": "Confirmed",
        "clinic_name": "Bandra Trauma Centre"
    },
    {
        "appointment_code": "APT-1084",
        "pet_name": "Bella (Labrador Retriever, 3y)",
        "pet_type": "Dog",
        "parent_name": "Sneha Kulkarni",
        "parent_phone": "+91 98400 56789",
        "doctor_name": "Dr. Divya Reddy",
        "service_name": "Dermatology Skin Scraping & Allergy Test",
        "appointment_date": date.today(),
        "appointment_time": "10:30 AM",
        "status": "Confirmed",
        "clinic_name": "Bandra Trauma Centre"
    },
    {
        "appointment_code": "APT-1085",
        "pet_name": "Leo (Shih Tzu, 1.5y)",
        "pet_type": "Dog",
        "parent_name": "Kunal Kapoor",
        "parent_phone": "+91 98220 67890",
        "doctor_name": "Dr. Maya Chandran",
        "service_name": "Gastroenterology IV Infusion & Vitals Check",
        "appointment_date": date.today(),
        "appointment_time": "11:00 AM",
        "status": "Confirmed",
        "clinic_name": "DLF CyberCity Hospital"
    },
    {
        "appointment_code": "APT-1086",
        "pet_name": "Coco (Beagle, 5y)",
        "pet_type": "Dog",
        "parent_name": "Ananya Sen",
        "parent_phone": "+91 98490 45678",
        "doctor_name": "Dr. Siddharth Verma",
        "service_name": "Color Doppler Echocardiogram Screening",
        "appointment_date": date.today(),
        "appointment_time": "11:30 AM",
        "status": "Confirmed",
        "clinic_name": "DLF CyberCity Hospital"
    },
    {
        "appointment_code": "APT-1087",
        "pet_name": "Rocky (Rottweiler, 4y)",
        "pet_type": "Dog",
        "parent_name": "Tarun Mathur",
        "parent_phone": "+91 98300 78901",
        "doctor_name": "Dr. Anirudh Sen",
        "service_name": "Neurology Spinal Myelography & Reflex Test",
        "appointment_date": date.today(),
        "appointment_time": "12:00 PM",
        "status": "Confirmed",
        "clinic_name": "Jubilee Hills Center"
    },
    {
        "appointment_code": "APT-1088",
        "pet_name": "Milo (British Shorthair, 3y)",
        "pet_type": "Cat",
        "parent_name": "Meera Nambiar",
        "parent_phone": "+91 98250 89012",
        "doctor_name": "Dr. Karthik Sundaram",
        "service_name": "Slit Lamp Ophthalmic Staining Exam",
        "appointment_date": date.today(),
        "appointment_time": "02:00 PM",
        "status": "Confirmed",
        "clinic_name": "Alwarpet Community Clinic"
    },
    {
        "appointment_code": "APT-1089",
        "pet_name": "Oskar (Siberian Husky, 2.5y)",
        "pet_type": "Dog",
        "parent_name": "Vikram Merchant",
        "parent_phone": "+91 98470 90123",
        "doctor_name": "Dr. Rohan Kulkarni",
        "service_name": "Fine Needle Aspirate (FNA) Oncology Biopsy",
        "appointment_date": date.today(),
        "appointment_time": "02:30 PM",
        "status": "Confirmed",
        "clinic_name": "Koregaon Park Hospital"
    },
    {
        "appointment_code": "APT-1090",
        "pet_name": "Zoe (Indie Rescue, 1y)",
        "pet_type": "Dog",
        "parent_name": "Dr. Rajeshwari Swaminathan",
        "parent_phone": "+91 98140 01234",
        "doctor_name": "Dr. Gaurav Sharma",
        "service_name": "Nobivac Comprehensive Annual Booster",
        "appointment_date": date.today(),
        "appointment_time": "03:00 PM",
        "status": "Confirmed",
        "clinic_name": "Koramangala Care Clinic"
    }
]


# ---------------------------------------------------------------------------
# 3. Luxury Pet Fashion & Lifestyle (from FashionProducts.jsx)
# ---------------------------------------------------------------------------
MOCK_FASHION = [
    {
        "item_code": "ZFS-0101",
        "name": "Royal Brocade Pet Sherwani",
        "category": "Formal Atelier",
        "size_range": "S, M, L, XL",
        "material": "Benarasi Silk & Gold Zari",
        "price": 4850.0,
        "stock": 38,
        "collection": "Royal Heritage 2026",
        "status": "In Stock"
    },
    {
        "item_code": "ZFS-0102",
        "name": "Italian Nappa Leather Ergonomic Harness",
        "category": "Ergonomic Harnesses",
        "size_range": "S, M, L",
        "material": "Full-Grain Nappa & Brass",
        "price": 3650.0,
        "stock": 52,
        "collection": "Milano Atelier 2026",
        "status": "In Stock"
    },
    {
        "item_code": "ZFS-0103",
        "name": "Himalayan Cashmere Cable-Knit Sweater",
        "category": "Winter Knits",
        "size_range": "XS, S, M, L",
        "material": "100% Grade-A Cashmere",
        "price": 2950.0,
        "stock": 44,
        "collection": "Highland Winter Warmth",
        "status": "In Stock"
    },
    {
        "item_code": "ZFS-0104",
        "name": "Alpine StormShield Waterproof Trench",
        "category": "Weatherwear",
        "size_range": "S, M, L, XL, XXL",
        "material": "3-Layer GORE-TEX Membrane",
        "price": 4200.0,
        "stock": 65,
        "collection": "Alpine All-Weather",
        "status": "In Stock"
    },
    {
        "item_code": "ZFS-0105",
        "name": "Florentine Calfskin Collar & Leash Set",
        "category": "Collars & Leashes",
        "size_range": "XS, S, M, L",
        "material": "Tuscan Vegetable Leather",
        "price": 3200.0,
        "stock": 78,
        "collection": "Florence Heritage",
        "status": "In Stock"
    },
    {
        "item_code": "ZFS-0106",
        "name": "Monaco Riviera Linen Sailor Polo",
        "category": "Loungewear",
        "size_range": "XS, S, M, L",
        "material": "Organic French Flax Linen",
        "price": 2150.0,
        "stock": 30,
        "collection": "Riviera Summer Cruise",
        "status": "In Stock"
    },
    {
        "item_code": "ZFS-0107",
        "name": "Velvet Evening Tuxedo with Silk Bowtie",
        "category": "Formal Atelier",
        "size_range": "S, M, L, XL",
        "material": "Italian Velvet & Mulberry Silk",
        "price": 5400.0,
        "stock": 22,
        "collection": "Met Gala Canine Edition",
        "status": "Low Stock"
    },
    {
        "item_code": "ZFS-0108",
        "name": "All-Terrain Orthopedic Rain Booties",
        "category": "Footwear",
        "size_range": "S, M, L, XL",
        "material": "Natural Vulcanized Rubber",
        "price": 1850.0,
        "stock": 85,
        "collection": "PawShield Tactical",
        "status": "In Stock"
    },
    {
        "item_code": "ZFS-0109",
        "name": "24K Gold-Plated Bespoke ID Medallion",
        "category": "Accessories",
        "size_range": "One Size",
        "material": "Solid Brass with 24K Gold",
        "price": 2450.0,
        "stock": 96,
        "collection": "Royal Insignia",
        "status": "In Stock"
    },
    {
        "item_code": "ZFS-0110",
        "name": "Merino Wool Thermal Base Layer",
        "category": "Winter Knits",
        "size_range": "XS, S, M",
        "material": "100% Australian Merino Wool",
        "price": 2250.0,
        "stock": 40,
        "collection": "Alpine Warmth",
        "status": "In Stock"
    }
]


# ---------------------------------------------------------------------------
# 4. Import & Export Shipments (from ImportOrders.jsx)
# ---------------------------------------------------------------------------
MOCK_SHIPMENTS = [
    {
        "shipment_code": "IPO-2026-001",
        "origin_country": "Germany",
        "destination_country": "India",
        "carrier": "DHL Global Forwarding",
        "tracking_no": "DHL-EXP-9921-DE",
        "goods_description": "Metacam Anti-inflammatory Injectables (5,000 vials)",
        "shipment_value": 6515500.0,
        "customs_status": "In Transit",
        "eta_date": date.today() + timedelta(days=5)
    },
    {
        "shipment_code": "IPO-2026-002",
        "origin_country": "USA",
        "destination_country": "India",
        "carrier": "FedEx Air Freight",
        "tracking_no": "FDX-7741-JFK-BLR",
        "goods_description": "Apoquel & Cytopoint Canine Monoclonal Antibodies",
        "shipment_value": 9296000.0,
        "customs_status": "In Transit",
        "eta_date": date.today() + timedelta(days=3)
    },
    {
        "shipment_code": "IPO-2026-003",
        "origin_country": "Netherlands",
        "destination_country": "India",
        "carrier": "KLM Cargo Air",
        "tracking_no": "KLM-AMS-MAA-04",
        "goods_description": "Nobivac Tricat & Rabies Biological Cold Batches",
        "shipment_value": 4878000.0,
        "customs_status": "In Customs",
        "eta_date": date.today() + timedelta(days=2)
    },
    {
        "shipment_code": "IPO-2026-004",
        "origin_country": "France",
        "destination_country": "India",
        "carrier": "Air France Cargo",
        "tracking_no": "AF-PAR-BOM-12",
        "goods_description": "Milpro & Epiotic Dermatological Ear Solutions",
        "shipment_value": 3501000.0,
        "customs_status": "Cleared Customs",
        "eta_date": date.today() - timedelta(days=1)
    },
    {
        "shipment_code": "IPO-2026-005",
        "origin_country": "Italy",
        "destination_country": "India",
        "carrier": "Emirates SkyCargo",
        "tracking_no": "EK-MXP-DXB-BOM",
        "goods_description": "Vet Dedicated Color Ultrasound Probes & Probes",
        "shipment_value": 3960000.0,
        "customs_status": "In Transit",
        "eta_date": date.today() + timedelta(days=7)
    },
    {
        "shipment_code": "IPO-2026-006",
        "origin_country": "Japan",
        "destination_country": "India",
        "carrier": "Nippon Express Maritime",
        "tracking_no": "NE-TYO-JNPT-88",
        "goods_description": "CXDI Flat Panel Wireless Vet X-Ray Detectors",
        "shipment_value": 7168000.0,
        "customs_status": "Cleared Customs",
        "eta_date": date.today() - timedelta(days=2)
    },
    {
        "shipment_code": "IPO-2026-007",
        "origin_country": "Switzerland",
        "destination_country": "India",
        "carrier": "Swiss WorldCargo",
        "tracking_no": "LX-ZRH-DEL-55",
        "goods_description": "Galliprant & Credelio Chewable Tablets",
        "shipment_value": 4091900.0,
        "customs_status": "In Transit",
        "eta_date": date.today() + timedelta(days=6)
    },
    {
        "shipment_code": "IPO-2026-008",
        "origin_country": "Denmark",
        "destination_country": "India",
        "carrier": "Maersk Cold-Chain Line",
        "tracking_no": "MSK-CPH-MAA-91",
        "goods_description": "Caninsulin & Vet Glucose Monitoring Sensor Kits",
        "shipment_value": 3789000.0,
        "customs_status": "In Customs",
        "eta_date": date.today() + timedelta(days=4)
    },
    {
        "shipment_code": "IPO-2026-009",
        "origin_country": "Australia",
        "destination_country": "India",
        "carrier": "Qantas Freight Direct",
        "tracking_no": "QF-SYD-BOM-34",
        "goods_description": "Ilium Anesthetic Formulations & Sedatives",
        "shipment_value": 3410000.0,
        "customs_status": "Cleared Customs",
        "eta_date": date.today() - timedelta(days=3)
    },
    {
        "shipment_code": "IPO-2026-010",
        "origin_country": "United Kingdom",
        "destination_country": "India",
        "carrier": "British Airways World Cargo",
        "tracking_no": "BA-LHR-BOM-07",
        "goods_description": "Vetoryl Capsules (Trilostane 10/30/60mg)",
        "shipment_value": 5763000.0,
        "customs_status": "In Transit",
        "eta_date": date.today() + timedelta(days=9)
    }
]


# ---------------------------------------------------------------------------
# 5. System Health Microservices (from SystemHealthDashboard.jsx)
# ---------------------------------------------------------------------------
MOCK_SYSTEM_HEALTH = [
    {
        "service_name": "FastAPI ASGI Gateway Engine",
        "service_type": "Python 3.12 / Uvicorn ASGI",
        "status": "Healthy",
        "uptime_pct": 99.98,
        "latency_ms": 14
    },
    {
        "service_name": "Analytical Database Store (SQLite/MySQL)",
        "service_type": "Relational Engine / WAL Mode",
        "status": "Healthy",
        "uptime_pct": 100.0,
        "latency_ms": 1
    },
    {
        "service_name": "Redis Session & Cache Cluster",
        "service_type": "In-Memory Key-Value Cache",
        "status": "Healthy",
        "uptime_pct": 99.99,
        "latency_ms": 1
    },
    {
        "service_name": "Razorpay Webhook & Payment Listener",
        "service_type": "Fintech Inbound Callback Service",
        "status": "Healthy",
        "uptime_pct": 99.95,
        "latency_ms": 38
    },
    {
        "service_name": "Zoho CRM & Leads Pipeline Sync",
        "service_type": "REST Webhook Bidirectional Sync",
        "status": "Healthy",
        "uptime_pct": 99.90,
        "latency_ms": 142
    },
    {
        "service_name": "Cold-Chain IoT Chiller Telemetry Broker",
        "service_type": "MQTT / TLS Chiller Sensor Broker",
        "status": "Healthy",
        "uptime_pct": 99.96,
        "latency_ms": 22
    },
    {
        "service_name": "Twilio WhatsApp Care & Notification Gateway",
        "service_type": "Cloud Communications Gateway",
        "status": "Healthy",
        "uptime_pct": 99.95,
        "latency_ms": 65
    },
    {
        "service_name": "AWS S3 Electronic Prescription Vault",
        "service_type": "HIPAA/GDPR Encrypted Object Store",
        "status": "Healthy",
        "uptime_pct": 100.0,
        "latency_ms": 18
    },
    {
        "service_name": "Celery Asynchronous Task Worker Pool",
        "service_type": "Distributed Background Worker Cluster",
        "status": "Healthy",
        "uptime_pct": 99.97,
        "latency_ms": 5
    },
    {
        "service_name": "Cloudflare CDN Edge & WAF Security Shield",
        "service_type": "Edge Network Reverse Proxy & DDoS",
        "status": "Healthy",
        "uptime_pct": 100.0,
        "latency_ms": 8
    }
]


# ---------------------------------------------------------------------------
# 6. Enterprise Company Settings (from mockSettingsData.js)
# ---------------------------------------------------------------------------
MOCK_COMPANY_SETTINGS = [
    ("company_legal_name", "Zenve Healthcare & Retail Private Limited", "Company Profile", "Registered statutory legal name"),
    ("brand_name", "Zenve Pet Wellness & Care", "Company Profile", "Public consumer brand insignia"),
    ("cin", "U85110KA2024PTC189201", "Compliance", "Corporate Identification Number (MCA)"),
    ("gstin", "29AABCZ9421H1Z4", "Taxation", "Goods & Services Tax Identification Number"),
    ("pan", "AABCZ9421H", "Taxation", "Permanent Account Number"),
    ("corporate_email", "corporate@zenve.in", "Company Profile", "Official executive contact mailbox"),
    ("support_email", "care@zenve.in", "Support", "24x7 Customer Care concierge email"),
    ("support_phone", "+91 80 4728 9200", "Support", "Toll-free customer hotline"),
    ("headquarters_address", "Zenve Health Tower, Outer Ring Road, Bellandur, Bengaluru 560103", "Company Profile", "Registered corporate headquarters"),
    ("primary_currency", "INR", "Financial", "Base operating accounting currency"),
    ("fiscal_year", "April 01 to March 31", "Financial", "Indian corporate statutory financial year"),
    ("timezone", "Asia/Kolkata (IST, UTC+05:30)", "Localization", "System timestamp standard timezone"),
    ("drug_license", "20B/21B/KA-BNG-194208", "Compliance", "Karnataka State Drug Controller Pharmacy License"),
    ("vci_accreditation", "VCI-IND-2024-00892", "Compliance", "Veterinary Council of India Accreditation"),
    ("biowaste_auth", "BMW-KSPCB-2024-0492", "Compliance", "Biomedical Waste Management Authorization"),
    ("bu_nutrition_lead", "Rahul Mehta (VP Products) - DIV-NUTR", "Business Units", "Pet Products & Clinical Nutrition Division"),
    ("bu_pharmacy_lead", "Karthik S. (Head Pharmacist) - DIV-PHARM", "Business Units", "Veterinary Pharmacy & Therapeutics Division"),
    ("bu_clinical_lead", "Dr. Priya Sharma (CMO) - DIV-CLIN", "Business Units", "Clinical Hospitals & Emergency Surgeries Division"),
    ("bu_telehealth_lead", "Dr. Rajesh K. (Head Digital Health) - DIV-TELE", "Business Units", "Tele-Triage & Digital Consultations Division")
]


def run_seed():
    db = SessionLocal()
    try:
        print("=================================================================")
        print("  ZENVE BI — COMPREHENSIVE MOCK DATA POPULATOR")
        print("=================================================================")

        # 1. Base Seeding from seed_all_domains.py (Customers, Doctors, Products, Orders, etc.)
        from seed_all_domains import seed_all as seed_base_domains
        print("\n[*] [1/7] Seeding core domain entities (Customers, Doctors, Products, etc.)...")
        seed_base_domains()

        # 2. B2B Accounts
        print("\n[*] [2/7] Seeding Enterprise B2B Accounts...")
        from seed_b2b import accounts_data
        db.query(B2BAccount).delete()
        for b in accounts_data:
            acc = B2BAccount(
                account_code=b["account_code"],
                company_name=b["company_name"],
                contact_name=b["contact_name"],
                email=b["email"],
                phone=b["phone"],
                city=b["city"],
                credit_limit=float(b["credit_limit"]),
                outstanding_balance=float(b["outstanding_balance"]),
                contract_status=b["contract_status"],
                annual_deal_value=float(b["annual_deal_value"])
            )
            db.add(acc)
        db.commit()
        print(f"    [OK] Seeded {len(accounts_data)} B2B Accounts.")

        # 3. Subscriptions & Subscription Plans
        print("\n[*] [3/7] Seeding Subscription Plans & Subscribers...")
        from seed_subscriptions import plans_data, subscribers_data
        db.query(Subscription).delete()
        db.query(SubscriptionPlan).delete()
        for p in plans_data:
            plan = SubscriptionPlan(
                plan_code=p["plan_code"],
                name=p["name"],
                price=float(p["price"]),
                billing_cycle=p.get("billing_cycle", "Monthly"),
                active_subscribers=int(p.get("active_subscribers", 100)),
                mrr=float(p.get("mrr", p["price"] * 100)),
                renewal_rate=p.get("renewal_rate", "97.4%"),
                churn_rate=p.get("churn_rate", "0.6%"),
                benefits=p.get("benefits", "Standard Benefits"),
                status=p.get("status", "Active")
            )
            db.add(plan)
        for s in subscribers_data:
            nb = s.get("next_billing_date")
            if isinstance(nb, str):
                try:
                    nb_date = datetime.strptime(nb, "%Y-%m-%d").date()
                except Exception:
                    nb_date = date.today() + timedelta(days=20)
            elif isinstance(nb, date):
                nb_date = nb
            else:
                nb_date = date.today() + timedelta(days=20)

            sub = Subscription(
                subscription_code=s["subscription_code"],
                plan_name=s["plan_name"],
                pet_name=s["pet_name"],
                parent_name=s["parent_name"],
                parent_phone=s["parent_phone"],
                monthly_fee=float(s["monthly_fee"]),
                payment_method=s.get("payment_method", "UPI AutoPay (HDFC)"),
                next_billing_date=nb_date,
                status=s.get("status", "Active")
            )
            db.add(sub)
        db.commit()
        print(f"    [OK] Seeded {len(plans_data)} Subscription Plans and {len(subscribers_data)} Active Subscribers.")

        # 4. Live Appointments
        print("\n[*] [4/7] Seeding Live Clinical Appointments...")
        db.query(Appointment).delete()
        for a in MOCK_APPOINTMENTS:
            app = Appointment(
                appointment_code=a["appointment_code"],
                pet_name=a["pet_name"],
                pet_type=a["pet_type"],
                parent_name=a["parent_name"],
                parent_phone=a["parent_phone"],
                doctor_name=a["doctor_name"],
                service_name=a["service_name"],
                appointment_date=a["appointment_date"],
                appointment_time=a["appointment_time"],
                status=a["status"],
                clinic_name=a["clinic_name"]
            )
            db.add(app)
        db.commit()
        print(f"    [OK] Seeded {len(MOCK_APPOINTMENTS)} Clinical Appointments.")

        # 5. Critical Alerts
        print("\n[*] [5/7] Seeding Operational & Clinical Critical Alerts...")
        db.query(Alert).delete()
        for alt in MOCK_ALERTS:
            al_obj = Alert(
                alert_code=alt["alert_code"],
                title=alt["title"],
                message=alt["message"],
                category=alt["category"],
                severity=alt["severity"],
                status=alt["status"]
            )
            db.add(al_obj)
        db.commit()
        print(f"    [OK] Seeded {len(MOCK_ALERTS)} Critical Alerts.")

        # 6. Fashion Products & Import/Export Shipments
        print("\n[*] [6/7] Seeding Haute Couture Fashion Catalog & International Shipments...")
        db.query(FashionProduct).delete()
        for f in MOCK_FASHION:
            fp = FashionProduct(
                item_code=f["item_code"],
                name=f["name"],
                category=f["category"],
                size_range=f["size_range"],
                material=f["material"],
                price=f["price"],
                stock=f["stock"],
                collection=f["collection"],
                status=f["status"]
            )
            db.add(fp)

        db.query(ImportExportShipment).delete()
        for sh in MOCK_SHIPMENTS:
            ship = ImportExportShipment(
                shipment_code=sh["shipment_code"],
                origin_country=sh["origin_country"],
                destination_country=sh["destination_country"],
                carrier=sh["carrier"],
                tracking_no=sh["tracking_no"],
                goods_description=sh["goods_description"],
                shipment_value=sh["shipment_value"],
                customs_status=sh["customs_status"],
                eta_date=sh["eta_date"]
            )
            db.add(ship)
        db.commit()
        print(f"    [OK] Seeded {len(MOCK_FASHION)} Fashion Products and {len(MOCK_SHIPMENTS)} Import Consignments.")

        # 7. System Health Services & Company Settings
        print("\n[*] [7/7] Seeding Infrastructure Health Metrics & Enterprise Settings...")
        db.query(SystemHealth).delete()
        for sh in MOCK_SYSTEM_HEALTH:
            health = SystemHealth(
                service_name=sh["service_name"],
                service_type=sh["service_type"],
                status=sh["status"],
                uptime_pct=sh["uptime_pct"],
                latency_ms=sh["latency_ms"]
            )
            db.add(health)

        db.query(CompanySetting).delete()
        for k, v, cat, desc_text in MOCK_COMPANY_SETTINGS:
            setting = CompanySetting(
                setting_key=k,
                setting_value=v,
                category=cat,
                description=desc_text
            )
            db.add(setting)
        db.commit()
        print(f"    [OK] Seeded {len(MOCK_SYSTEM_HEALTH)} Microservices and {len(MOCK_COMPANY_SETTINGS)} Enterprise Settings.")

        # Verification count
        print("\n=================================================================")
        print("  VERIFYING TOTAL DATABASE POPULATION ACROSS ALL DOMAINS:")
        print("=================================================================")
        models_map = [
            ("Daily Metrics", DailyMetric),
            ("Sales Transactions", Sale),
            ("Orders & Operations", Order),
            ("Products & Catalog", Product),
            ("Pharmacy Medicines", PharmacyMedicine),
            ("Veterinary Services", VeterinaryService),
            ("Clinical Appointments", Appointment),
            ("Doctors & Specialists", Doctor),
            ("Clinics & Hospitals", ClinicHospital),
            ("Customer Pet Parents", Customer),
            ("Companion Pets", Pet),
            ("Employees & HR Staff", Employee),
            ("Marketing Campaigns", MarketingCampaign),
            ("Procurement Vendors", Vendor),
            ("Logistics Deliveries", LogisticsDelivery),
            ("Fashion Apparel", FashionProduct),
            ("B2B Enterprise Accounts", B2BAccount),
            ("Import/Export Consignments", ImportExportShipment),
            ("Subscription Plans", SubscriptionPlan),
            ("Active Subscribers", Subscription),
            ("Reports & Analytics", Report),
            ("Critical Alerts", Alert),
            ("System Health Services", SystemHealth),
            ("Enterprise Settings", CompanySetting),
        ]

        total_records = 0
        for label, model in models_map:
            cnt = db.query(model).count()
            total_records += cnt
            print(f"  • {label:32}: {cnt:4d} rows")
        print("-----------------------------------------------------------------")
        print(f"  TOTAL LIVE DATABASE RECORDS POPULATED: {total_records}")
        print("=================================================================")

    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
