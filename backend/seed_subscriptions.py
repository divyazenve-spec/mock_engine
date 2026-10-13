import sys
import os
from datetime import date, datetime

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal
from app.models.all_models import SubscriptionPlan, Subscription

plans_data = [
    {
        "id": 1,
        "plan_code": "SUB-PLN-01",
        "name": "Puppy & Kitten Complete Wellness",
        "price": 1499.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 184,
        "mrr": 275816.0,
        "renewal_rate": "97.4%",
        "churn_rate": "0.6%",
        "benefits": "Unlimited Vet Consults, Vaccinations & Deworming",
        "status": "Active"
    },
    {
        "id": 2,
        "plan_code": "SUB-PLN-02",
        "name": "Adult Canine Preventive Care",
        "price": 1999.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 212,
        "mrr": 423788.0,
        "renewal_rate": "96.8%",
        "churn_rate": "0.8%",
        "benefits": "Annual Blood Panel, Dental Scaling & Flea/Tick",
        "status": "Active"
    },
    {
        "id": 3,
        "plan_code": "SUB-PLN-03",
        "name": "Senior Pet Chronic Care & Mobility",
        "price": 2999.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 96,
        "mrr": 287904.0,
        "renewal_rate": "98.2%",
        "churn_rate": "0.5%",
        "benefits": "Joint Supplements, Renal Screens & Physiotherapy",
        "status": "Active"
    },
    {
        "id": 4,
        "plan_code": "SUB-PLN-04",
        "name": "Feline Essential Health & Nutrition",
        "price": 1299.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 145,
        "mrr": 188355.0,
        "renewal_rate": "96.2%",
        "churn_rate": "0.9%",
        "benefits": "Core FVRCP, Dental Checkups & Wet Food Delivery",
        "status": "Active"
    },
    {
        "id": 5,
        "plan_code": "SUB-PLN-05",
        "name": "Zenve Prime Fresh Nutrition Auto-Ship",
        "price": 3499.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 168,
        "mrr": 587832.0,
        "renewal_rate": "98.8%",
        "churn_rate": "0.4%",
        "benefits": "Custom Fresh Food Pouches & Probiotics Bi-weekly",
        "status": "Active"
    },
    {
        "id": 6,
        "plan_code": "SUB-PLN-06",
        "name": "Dermatology & Allergy Relief Care",
        "price": 2499.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 82,
        "mrr": 204918.0,
        "renewal_rate": "95.9%",
        "churn_rate": "1.1%",
        "benefits": "Cytopoint/Apoquel Injections, Medicated Baths & Diet",
        "status": "Active"
    },
    {
        "id": 7,
        "plan_code": "SUB-PLN-07",
        "name": "Telehealth 24/7 Digital Concierge",
        "price": 699.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 340,
        "mrr": 237660.0,
        "renewal_rate": "94.5%",
        "churn_rate": "1.2%",
        "benefits": "Unlimited Video Consults & 1-Hr Prescription Delivery",
        "status": "Active"
    },
    {
        "id": 8,
        "plan_code": "SUB-PLN-08",
        "name": "Equine Elite Stables Wellness",
        "price": 8999.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 28,
        "mrr": 251972.0,
        "renewal_rate": "99.1%",
        "churn_rate": "0.3%",
        "benefits": "On-site Equine Vet Visits, Parasite Control & Injections",
        "status": "Active"
    },
    {
        "id": 9,
        "plan_code": "SUB-PLN-09",
        "name": "Avian & Exotic Specialist Membership",
        "price": 1799.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 54,
        "mrr": 97146.0,
        "renewal_rate": "95.4%",
        "churn_rate": "1.0%",
        "benefits": "Specialist Avian Consults, Beak Trimming & Vitamins",
        "status": "Active"
    },
    {
        "id": 10,
        "plan_code": "SUB-PLN-10",
        "name": "Multi-Pet Family Platinum Care",
        "price": 4499.0,
        "billing_cycle": "Monthly",
        "active_subscribers": 75,
        "mrr": 337425.0,
        "renewal_rate": "98.5%",
        "churn_rate": "0.5%",
        "benefits": "Covers up to 3 Pets, Free Clinic Emergencies & Grooming",
        "status": "Active"
    }
]

subscribers_data = [
    {
        "id": 1,
        "subscription_code": "SUB-ACT-1001",
        "plan_name": "Puppy & Kitten Complete Wellness",
        "pet_name": "Rocky (Golden Retriever)",
        "parent_name": "Arunachalam Murthy",
        "parent_phone": "+91 98450 22119",
        "monthly_fee": 1499.0,
        "payment_method": "UPI AutoPay (HDFC)",
        "next_billing_date": date(2026, 10, 18),
        "status": "Active"
    },
    {
        "id": 2,
        "subscription_code": "SUB-ACT-1002",
        "plan_name": "Feline Essential Health & Nutrition",
        "pet_name": "Bella (Persian Cat)",
        "parent_name": "Pooja Venkatesh",
        "parent_phone": "+91 98220 44551",
        "monthly_fee": 1299.0,
        "payment_method": "Credit Card E-Mandate (ICICI)",
        "next_billing_date": date(2026, 10, 20),
        "status": "Active"
    },
    {
        "id": 3,
        "subscription_code": "SUB-ACT-1003",
        "plan_name": "Zenve Prime Fresh Nutrition Auto-Ship",
        "pet_name": "Bruno (German Shepherd)",
        "parent_name": "Vikramaditya Rao",
        "parent_phone": "+91 98800 66772",
        "monthly_fee": 3499.0,
        "payment_method": "UPI AutoPay (Google Pay / SBI)",
        "next_billing_date": date(2026, 10, 22),
        "status": "Active"
    },
    {
        "id": 4,
        "subscription_code": "SUB-ACT-1004",
        "plan_name": "Senior Pet Chronic Care & Mobility",
        "pet_name": "Max (Labrador 9yr)",
        "parent_name": "Sunita Deshmukh",
        "parent_phone": "+91 98401 77883",
        "monthly_fee": 2999.0,
        "payment_method": "E-NACH Mandate (Axis Bank)",
        "next_billing_date": date(2026, 10, 16),
        "status": "Active"
    },
    {
        "id": 5,
        "subscription_code": "SUB-ACT-1005",
        "plan_name": "Dermatology & Allergy Relief Care",
        "pet_name": "Leo (Shih Tzu)",
        "parent_name": "Kavita Singhania",
        "parent_phone": "+91 98110 88994",
        "monthly_fee": 2499.0,
        "payment_method": "Debit Card Mandate (Kotak)",
        "next_billing_date": date(2026, 10, 19),
        "status": "Active"
    },
    {
        "id": 6,
        "subscription_code": "SUB-ACT-1006",
        "plan_name": "Multi-Pet Family Platinum Care",
        "pet_name": "Milo & Oscar (Beagles)",
        "parent_name": "Rajesh Kulkarni",
        "parent_phone": "+91 98660 11335",
        "monthly_fee": 4499.0,
        "payment_method": "Credit Card E-Mandate (HDFC)",
        "next_billing_date": date(2026, 10, 25),
        "status": "Active"
    },
    {
        "id": 7,
        "subscription_code": "SUB-ACT-1007",
        "plan_name": "Puppy & Kitten Complete Wellness",
        "pet_name": "Simba (Indie Pup)",
        "parent_name": "Ananya Sharma",
        "parent_phone": "+91 98330 22446",
        "monthly_fee": 1499.0,
        "payment_method": "UPI AutoPay (PhonePe / Axis)",
        "next_billing_date": date(2026, 10, 21),
        "status": "Active"
    },
    {
        "id": 8,
        "subscription_code": "SUB-ACT-1008",
        "plan_name": "Adult Canine Preventive Care",
        "pet_name": "Zara (Siberian Husky)",
        "parent_name": "Aditya Malhotra",
        "parent_phone": "+91 98990 33557",
        "monthly_fee": 1999.0,
        "payment_method": "Credit Card Mandate (Amex)",
        "next_billing_date": date(2026, 10, 24),
        "status": "Active"
    },
    {
        "id": 9,
        "subscription_code": "SUB-ACT-1009",
        "plan_name": "Telehealth 24/7 Digital Concierge",
        "pet_name": "Shadow (British Shorthair)",
        "parent_name": "Meera Nambiar",
        "parent_phone": "+91 98770 44668",
        "monthly_fee": 699.0,
        "payment_method": "UPI AutoPay (Paytm / ICICI)",
        "next_billing_date": date(2026, 10, 28),
        "status": "Active"
    },
    {
        "id": 10,
        "subscription_code": "SUB-ACT-1010",
        "plan_name": "Equine Elite Stables Wellness",
        "pet_name": "Thunderbolt (Stallion)",
        "parent_name": "Captain R. S. Rathore",
        "parent_phone": "+91 98100 55779",
        "monthly_fee": 8999.0,
        "payment_method": "Corporate RTGS Standing Mandate",
        "next_billing_date": date(2026, 10, 30),
        "status": "Active"
    }
]

def seed():
    db = SessionLocal()
    try:
        # Seed Plans
        for p in plans_data:
            existing = db.query(SubscriptionPlan).filter(SubscriptionPlan.id == p["id"]).first()
            if not existing:
                plan = SubscriptionPlan(**p)
                db.add(plan)
            else:
                for k, v in p.items():
                    setattr(existing, k, v)
        db.commit()

        # Seed Subscribers
        for s in subscribers_data:
            existing = db.query(Subscription).filter(Subscription.id == s["id"]).first()
            if not existing:
                sub = Subscription(**s)
                db.add(sub)
            else:
                for k, v in s.items():
                    setattr(existing, k, v)
        db.commit()
        print("Successfully seeded 10 Subscription Plans and 10 Subscribers into zenvebi.db")
    except Exception as e:
        db.rollback()
        print(f"Error seeding subscriptions: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed()
