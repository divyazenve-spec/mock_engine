"""Seed script to populate MySQL / SQLite with realistic mock data."""
import json
import random
from datetime import date, datetime, timedelta
from pathlib import Path

from app.core.database import SessionLocal
from app.models import DailyMetric, Sale

CUSTOMERS = [
    ("Ananya Deshmukh", "Bengaluru"),
    ("Vikramaditya Singhania", "Mumbai"),
    ("Rohan Kapoor", "Delhi NCR"),
    ("Meera Nambiar", "Hyderabad"),
    ("Kavita Iyer", "Chennai"),
    ("Dr. Siddharth Malhotra", "Pune"),
    ("Pooja Verma", "Kolkata"),
    ("Farhan Akhtar", "Ahmedabad"),
    ("Deepa Swamy", "Kochi"),
    ("Tanvi Chatterjee", "Chandigarh")
]

SERVICES = [
    ("Royal Canin Veterinary Diet", 7680),
    ("Full Pet Health Checkup", 3500),
    ("Bravecto Flea & Tick", 2450),
    ("NexGard Spectra Chew", 2980),
    ("Hill's Prescription Diet", 8200),
    ("Core 7-in-1 Vaccine", 1850),
    ("Feline Tricat Trio Vaccine", 1600),
    ("Ultrasonic Dental Scaling", 5800),
    ("Orthopedic Joint Care", 3200),
    ("Calming Wellness Chews", 1450)
]

CHANNELS = ["Android", "iOS", "Web", "Other"]

DOCTORS = [
    "Dr. Edwin .",
    "Dr. Ananya Deshmukh",
    "Dr. Vikramaditya Rathore",
    "Dr. Priya Sharma",
    "Dr. Rajeshwar Kulkarni",
    "Dr. Shalini Mukherjee",
    "Dr. Siddharth Sen",
    "Dr. Meera Nambiar",
    "Dr. Farhan Qureshi",
    "Dr. Tanvi Venkatesh"
]

EMPLOYEES = [
    "Dr. Priya Sharma",
    "Karthik Sundaram",
    "Dr. Rajesh Nair",
    "Ananya Sen",
    "Dr. Shalini Verma",
    "Vivek Joshi",
    "Dr. Arun Kulkarni",
    "Sneha Pillai",
    "Rohan Mehta",
    "Meenakshi Rao"
]


def run_seed():
    db = SessionLocal()
    try:
        print("Clearing existing sales & metrics...")
        db.query(Sale).delete()
        db.query(DailyMetric).delete()
        db.commit()

        now = datetime(2026, 10, 21, 16, 30, 0)
        sales_records = []
        metrics_by_date = {}

        # Generate 300 sales spread across the last 60 days
        for i in range(300):
            days_ago = random.randint(0, 59)
            sale_dt = now - timedelta(days=days_ago, hours=random.randint(0, 23), minutes=random.randint(0, 59))
            cust_name, cust_city = random.choice(CUSTOMERS)
            svc_name, base_amount = random.choice(SERVICES)
            amount = round(base_amount * random.uniform(0.85, 1.35), 2)
            app_ch = random.choice(CHANNELS)
            status = "Paid" if random.random() < 0.94 else "Pending"

            sale = Sale(
                sale_id=f"sale-seed-{i+1:04d}",
                transaction_ref=f"TXN-{9000 + i}",
                sold_at=sale_dt.strftime("%Y-%m-%dT%H:%M:%S"),
                source=svc_name,
                person=cust_name,
                city=cust_city,
                amount=amount,
                status=status,
                app_source=app_ch,
                is_demo=1
            )
            db.add(sale)

            dt_key = sale_dt.strftime("%Y-%m-%d")
            if dt_key not in metrics_by_date:
                metrics_by_date[dt_key] = {"sales_total": 0.0, "android_dl": 0, "ios_dl": 0}
            if status == "Paid":
                metrics_by_date[dt_key]["sales_total"] += amount

            sales_records.append({
                "id": sale.sale_id,
                "transaction_ref": sale.transaction_ref,
                "sold_at": sale.sold_at,
                "source": sale.source,
                "person": sale.person,
                "city": sale.city,
                "amount": sale.amount,
                "status": sale.status,
                "app_source": sale.app_source,
                "is_demo": bool(sale.is_demo)
            })

        # Generate DailyMetrics for each of the last 60 days
        metrics_records = []
        for d in range(60):
            b_date = (now - timedelta(days=59 - d)).date()
            dt_key = b_date.strftime("%Y-%m-%d")
            existing_sales = metrics_by_date.get(dt_key, {}).get("sales_total", 0.0)
            sales_total = existing_sales if existing_sales > 0 else round(random.uniform(95000, 185000), 2)
            android_dl = random.randint(85, 160)
            ios_dl = random.randint(60, 120)

            metric = DailyMetric(
                business_date=b_date,
                sales_total=sales_total,
                android_downloads=android_dl,
                ios_downloads=ios_dl
            )
            db.add(metric)

            metrics_records.append({
                "business_date": str(metric.business_date),
                "sales_total": metric.sales_total,
                "android_downloads": metric.android_downloads,
                "ios_downloads": metric.ios_downloads
            })

        db.commit()
        print(f"Successfully seeded {len(sales_records)} sales and {len(metrics_records)} metrics into DB!")

        # Write to sample-fallback.json
        fallback_path = Path(__file__).resolve().parents[1] / "frontend" / "public" / "assets" / "sample-fallback.json"
        with open(fallback_path, "w", encoding="utf-8") as fh:
            json.dump({
                "sales": sales_records,
                "metrics": metrics_records,
                "mode": "live"
            }, fh, indent=2)
        print(f"Updated {fallback_path}!")

    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
