"""Data Loader and Feature Extraction for Zenve Machine Learning Pipelines.
Pulls records from SQLAlchemy (SQLite / MySQL) or raw CSV files and prepares
clean feature matrices for training and inference.
"""
from __future__ import annotations

import os
from datetime import datetime, date, timedelta
from typing import Optional, Tuple
import pandas as pd
import numpy as np
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models import DailyMetric, Sale, Customer, Order, Product, PharmacyMedicine


class DataLoader:
    """Extracts, cleans, and transforms raw domain tables into ML feature datasets."""

    def __init__(self, db: Optional[Session] = None):
        self._db = db

    def get_session(self) -> Session:
        if self._db is not None:
            return self._db
        return SessionLocal()

    # -------------------------------------------------------------------------
    # 1. SALES FORECAST DATA
    # -------------------------------------------------------------------------
    def load_sales_features(self, csv_path: Optional[str] = None) -> pd.DataFrame:
        """Loads daily revenue telemetry and creates temporal & rolling lag features."""
        if csv_path and os.path.exists(csv_path):
            df_raw = pd.read_csv(csv_path)
            # Standardize date column
            date_col = next((c for c in df_raw.columns if "date" in c.lower() or "time" in c.lower()), df_raw.columns[0])
            rev_col = next((c for c in df_raw.columns if "sale" in c.lower() or "amount" in c.lower() or "rev" in c.lower()), df_raw.columns[1])
            df_raw["business_date"] = pd.to_datetime(df_raw[date_col]).dt.date
            df_raw["sales_total"] = pd.to_numeric(df_raw[rev_col], errors="coerce").fillna(0.0)
            df = df_raw[["business_date", "sales_total"]].groupby("business_date", as_index=False).sum()
            df["android_downloads"] = df_raw.get("android_downloads", 100)
            df["ios_downloads"] = df_raw.get("ios_downloads", 80)
        else:
            session = self.get_session()
            try:
                # Query daily_metrics first
                metrics = session.query(DailyMetric).order_by(DailyMetric.business_date.asc()).all()
                if metrics:
                    records = []
                    for m in metrics:
                        records.append({
                            "business_date": m.business_date,
                            "sales_total": float(m.sales_total or 0.0),
                            "android_downloads": int(m.android_downloads or 0),
                            "ios_downloads": int(m.ios_downloads or 0),
                        })
                    df = pd.DataFrame(records)
                else:
                    # Fallback to aggregating sales table
                    sales = session.query(Sale).all()
                    if not sales:
                        # Synthetic bootstrap if completely empty
                        base_d = date.today() - timedelta(days=30)
                        records = [{
                            "business_date": base_d + timedelta(days=i),
                            "sales_total": float(15000 + (i % 7) * 4500 + (i * 300)),
                            "android_downloads": int(120 + i * 2),
                            "ios_downloads": int(90 + i * 2),
                        } for i in range(30)]
                        df = pd.DataFrame(records)
                    else:
                        daily_agg = {}
                        for s in sales:
                            d_str = (s.sold_at or "")[:10]
                            try:
                                d_val = datetime.strptime(d_str, "%Y-%m-%d").date()
                            except Exception:
                                d_val = date.today()
                            amt = float(s.amount or 0.0) if s.status == "Paid" else 0.0
                            daily_agg[d_val] = daily_agg.get(d_val, 0.0) + amt

                        records = [{"business_date": k, "sales_total": v, "android_downloads": 100, "ios_downloads": 80}
                                   for k, v in sorted(daily_agg.items())]
                        df = pd.DataFrame(records)
            finally:
                if self._db is None:
                    session.close()

        # Feature Engineering for Time Series
        df["business_date"] = pd.to_datetime(df["business_date"])
        df = df.sort_values("business_date").reset_index(drop=True)
        df["total_downloads"] = df["android_downloads"] + df["ios_downloads"]
        df["day_of_week"] = df["business_date"].dt.dayofweek
        df["day_of_month"] = df["business_date"].dt.day
        df["is_weekend"] = df["day_of_week"].apply(lambda x: 1 if x >= 5 else 0)
        df["month"] = df["business_date"].dt.month
        
        # Rolling averages & lags
        df["sales_rolling_3d"] = df["sales_total"].rolling(window=3, min_periods=1).mean().shift(1).fillna(df["sales_total"].mean())
        df["sales_rolling_7d"] = df["sales_total"].rolling(window=7, min_periods=1).mean().shift(1).fillna(df["sales_total"].mean())
        df["sales_lag_1"] = df["sales_total"].shift(1).fillna(df["sales_total"].mean())
        df["sales_lag_7"] = df["sales_total"].shift(7).fillna(df["sales_total"].mean())
        df["downloads_lag_1"] = df["total_downloads"].shift(1).fillna(df["total_downloads"].mean())

        return df

    # -------------------------------------------------------------------------
    # 2. CUSTOMER CHURN & RETENTION DATA
    # -------------------------------------------------------------------------
    def load_churn_features(self, csv_path: Optional[str] = None) -> pd.DataFrame:
        """Loads customer behavioral RFM profiles and derives churn labels."""
        if csv_path and os.path.exists(csv_path):
            df = pd.read_csv(csv_path)
        else:
            session = self.get_session()
            try:
                customers = session.query(Customer).all()
                sales = session.query(Sale).all()
                orders = session.query(Order).all()

                # Build sales aggregation per customer
                sales_by_person = {}
                ref_date = date.today()
                for s in sales:
                    p = s.person or ""
                    d_str = (s.sold_at or "")[:10]
                    try:
                        d_val = datetime.strptime(d_str, "%Y-%m-%d").date()
                    except Exception:
                        d_val = ref_date - timedelta(days=60)
                    
                    if p not in sales_by_person:
                        sales_by_person[p] = {"spent": 0.0, "count": 0, "last_date": d_val}
                    sales_by_person[p]["spent"] += float(s.amount or 0.0)
                    sales_by_person[p]["count"] += 1
                    if d_val > sales_by_person[p]["last_date"]:
                        sales_by_person[p]["last_date"] = d_val

                rows = []
                for idx, c in enumerate(customers):
                    c_name = c.name or f"Customer-{idx}"
                    s_info = sales_by_person.get(c_name, {})
                    total_spent = float(c.total_spent or s_info.get("spent", 5000.0))
                    total_orders = int(c.total_orders or s_info.get("count", 2))
                    last_date = s_info.get("last_date", ref_date - timedelta(days=20))
                    recency_days = max(1, (ref_date - last_date).days)
                    
                    # Tenure days
                    j_date = c.joined_date if hasattr(c, "joined_date") and c.joined_date else (ref_date - timedelta(days=120))
                    tenure_days = max(1, (ref_date - j_date).days)

                    # Churn heuristic for mock/seed ground truth:
                    # If recency > 30 days and order count <= 2 or tier == 'Silver', risk of churn is higher
                    is_churned = 1 if (recency_days > 25 and total_orders <= 3) or (c.status and c.status.lower() in ("churned", "inactive")) else 0

                    rows.append({
                        "customer_id": c.customer_code or f"CUST-{idx+1:03d}",
                        "name": c_name,
                        "city": c.city or "Bengaluru",
                        "tier": c.tier or "Silver",
                        "total_orders": total_orders,
                        "total_spent": total_spent,
                        "recency_days": recency_days,
                        "tenure_days": tenure_days,
                        "aov": (total_spent / max(1, total_orders)),
                        "orders_per_month": (total_orders / max(1.0, tenure_days / 30.0)),
                        "churned": is_churned
                    })

                if not rows:
                    # Provide realistic baseline if empty
                    for i in range(25):
                        rec = 5 + (i * 3)
                        orders_cnt = max(1, int(15 - i * 0.5))
                        rows.append({
                            "customer_id": f"CUST-{i+1:03d}",
                            "name": f"Pet Parent {i+1}",
                            "city": "Bengaluru" if i % 2 == 0 else "Mumbai",
                            "tier": "Gold" if i < 8 else ("Silver" if i < 18 else "Platinum"),
                            "total_orders": orders_cnt,
                            "total_spent": float(orders_cnt * 2400 + i * 500),
                            "recency_days": rec,
                            "tenure_days": 100 + i * 5,
                            "aov": float(2400 + i * 50),
                            "orders_per_month": float(orders_cnt / 4.0),
                            "churned": 1 if rec > 30 else 0
                        })

                df = pd.DataFrame(rows)
            finally:
                if self._db is None:
                    session.close()

        # Encoding and scaling preparation
        tier_map = {"Bronze": 1, "Silver": 2, "Gold": 3, "Platinum": 4, "Diamond": 5}
        df["tier_code"] = df["tier"].map(tier_map).fillna(2).astype(int)
        return df

    # -------------------------------------------------------------------------
    # 3. INVENTORY & STOCKOUT DEMAND DATA
    # -------------------------------------------------------------------------
    def load_inventory_features(self, csv_path: Optional[str] = None) -> pd.DataFrame:
        """Loads catalog items, current on-hand units, and burn velocity."""
        if csv_path and os.path.exists(csv_path):
            df = pd.read_csv(csv_path)
        else:
            session = self.get_session()
            try:
                products = session.query(Product).all()
                medicines = session.query(PharmacyMedicine).all()

                items = []
                for p in products:
                    stock = max(0, int(p.stock or 0))
                    min_stock = max(5, int(p.min_stock or 15))
                    # Daily burn rate estimate based on sales velocity
                    burn_rate = round(max(0.5, (min_stock * 0.2) + (stock * 0.02)), 2)
                    runway_days = round(stock / max(0.1, burn_rate), 1)
                    
                    # Risk label
                    if runway_days <= 3.0 or stock <= 10:
                        risk_level = "CRITICAL"
                        risk_code = 3
                    elif runway_days <= 7.0 or stock <= min_stock:
                        risk_level = "HIGH"
                        risk_code = 2
                    elif runway_days <= 14.0:
                        risk_level = "MEDIUM"
                        risk_code = 1
                    else:
                        risk_level = "LOW"
                        risk_code = 0

                    items.append({
                        "sku": p.sku or f"SKU-PROD-{len(items)+1}",
                        "name": p.name or "Pet Health Product",
                        "category": p.category or "General Care",
                        "price": float(p.price or 0.0),
                        "cost_price": float(p.cost_price or (p.price * 0.6 if p.price else 0.0)),
                        "current_stock": stock,
                        "min_stock": min_stock,
                        "burn_rate": burn_rate,
                        "runway_days": runway_days,
                        "risk_level": risk_level,
                        "risk_code": risk_code
                    })

                for m in medicines:
                    stock = max(0, int(m.stock or 0))
                    min_stock = 15
                    burn_rate = round(max(0.8, (stock * 0.05) + 1.2), 2)
                    runway_days = round(stock / max(0.1, burn_rate), 1)
                    if runway_days <= 3.0 or stock <= 10:
                        risk_level = "CRITICAL"
                        risk_code = 3
                    elif runway_days <= 7.0 or stock <= min_stock:
                        risk_level = "HIGH"
                        risk_code = 2
                    elif runway_days <= 14.0:
                        risk_level = "MEDIUM"
                        risk_code = 1
                    else:
                        risk_level = "LOW"
                        risk_code = 0

                    items.append({
                        "sku": m.med_code or f"SKU-MED-{len(items)+1}",
                        "name": m.name or "Veterinary Prescription Medicine",
                        "category": m.category or "Pharmaceutical",
                        "price": float(m.price or 0.0),
                        "cost_price": float(m.price * 0.55 if m.price else 0.0),
                        "current_stock": stock,
                        "min_stock": min_stock,
                        "burn_rate": burn_rate,
                        "runway_days": runway_days,
                        "risk_level": risk_level,
                        "risk_code": risk_code
                    })

                if not items:
                    for i in range(15):
                        stk = 5 + (i * 12)
                        burn = round(1.5 + (i % 4) * 0.8, 2)
                        runway = round(stk / burn, 1)
                        risk_lvl = "CRITICAL" if runway <= 3 else ("HIGH" if runway <= 7 else "LOW")
                        items.append({
                            "sku": f"SKU-BOOT-{i+1:03d}",
                            "name": f"Zenve Item {i+1}",
                            "category": "Therapeutic Diet" if i % 2 == 0 else "Vaccine",
                            "price": float(1200 + i * 350),
                            "cost_price": float(750 + i * 200),
                            "current_stock": stk,
                            "min_stock": 20,
                            "burn_rate": burn,
                            "runway_days": runway,
                            "risk_level": risk_lvl,
                            "risk_code": 3 if runway <= 3 else (2 if runway <= 7 else 0)
                        })

                df = pd.DataFrame(items)
            finally:
                if self._db is None:
                    session.close()

        # Compute margin percentage
        df["margin_pct"] = np.where(
            df["price"] > 0,
            ((df["price"] - df["cost_price"]) / df["price"]) * 100.0,
            0.0
        )
        return df
