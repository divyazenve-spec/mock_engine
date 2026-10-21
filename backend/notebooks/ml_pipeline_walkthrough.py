"""Interactive Walkthrough & Reference: Zenve BI Machine Learning Pipeline.

This script demonstrates:
1. Feature extraction from project tables (Sales, Customer RFM, Inventory).
2. Fitting, scoring, and saving the 3 ML models (Sales, Churn, Inventory).
3. Running live inference with confidence intervals & risk playbooks.
4. How to switch to ORIGINAL (production) data seamlessly.
"""
from pathlib import Path
import sys

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from app.ml.data_loader import DataLoader
from app.ml.sales_forecast import SalesForecastModel
from app.ml.churn_prediction import ChurnPredictionModel
from app.ml.inventory_demand import InventoryDemandModel
from app.ml.train_all import train_all_models
from app.models.ml_model import (
    get_sales_model,
    get_churn_model,
    get_inventory_model,
    get_model_registry,
)


def run_walkthrough():
    print("=" * 70)
    print("  ZENVE BI AI/ML PIPELINE: TRAINING & INFERENCE DEMO")
    print("=" * 70)

    # 1. DATA EXTRACTION
    print("\n--- 1. FEATURE EXTRACTION ---")
    loader = DataLoader()
    df_sales = loader.load_sales_features()
    df_churn = loader.load_churn_features()
    df_inv = loader.load_inventory_features()

    print(f"Sales Data:     {len(df_sales)} daily time-series records")
    print(f"Customer Data:  {len(df_churn)} customer RFM profiles")
    print(f"Inventory Data: {len(df_inv)} catalog inventory items")

    # 2. RUN INFERENCE USING THE TRAINED ARTIFACTS
    print("\n--- 2. SALES REVENUE FORECAST (FORWARD 30 DAYS) ---")
    sales_model = get_sales_model()
    forecast_30d = sales_model.forecast(df_sales, horizon_days=30)
    summary = forecast_30d["summary"]
    print(f"Projected 30-Day Revenue (p50): INR {summary['projected_revenue_p50']:,.2f}")
    print(f"Conservative Bound (p10):      INR {summary['projected_revenue_p10']:,.2f}")
    print(f"Optimistic Upside (p90):       INR {summary['projected_revenue_p90']:,.2f}")
    print(f"Projected Daily Run-rate:      INR {summary['daily_average_p50']:,.2f}/day")

    print("\n--- 3. CUSTOMER CHURN RISK SCORING ---")
    churn_model = get_churn_model()
    churn_cohorts = churn_model.predict_batch(df_churn)
    print(f"Total Evaluated: {len(churn_cohorts)} pet parents")
    for idx, c in enumerate(churn_cohorts[:3]):
        print(f"  [{c['risk_tier']}] {c['customer_name']} (Risk: {c['churn_risk_percentage']})")
        print(f"      Decay:  {c['primary_decay_cause']}")
        print(f"      Action: {c['recommended_playbook']}")

    print("\n--- 4. INVENTORY STOCKOUT & BURN RADAR ---")
    inv_model = get_inventory_model()
    inv_risks = inv_model.predict_batch(df_inv)
    print(f"Total Catalog SKUs Analyzed: {len(inv_risks)}")
    for idx, item in enumerate(inv_risks[:3]):
        print(f"  [{item['risk_level']}] {item['sku']} - {item['name'][:35]}")
        print(f"      Burn Rate: {item['predicted_daily_burn_rate']} | Runway: {item['predicted_runway_days']}")
        print(f"      Action:    {item['recommended_action']}")

    print("\n" + "=" * 70)
    print("  HOW TO IMPLEMENT FOR YOUR ORIGINAL DATA:")
    print("=" * 70)
    print("""
Option A: When Original Data is in MySQL / Database:
  1. Update backend/.env DATABASE_URL to your production MySQL instance.
  2. Run: python train_models.py
  -> The models will immediately train on your real records!

Option B: When Original Data is in CSV / Excel:
  1. Export your tables as sales.csv, customers.csv, inventory.csv into a folder (e.g., ./original_data/).
  2. Run: python train_models.py --data-dir ./original_data
  -> The models will train directly on your CSV files and update artifacts!

Option C: Live API Re-Training:
  Send a POST request to http://localhost:8000/api/v1/predict/train
  with optional JSON: {"csv_dir": "path/to/original_data"}
""")


if __name__ == "__main__":
    run_walkthrough()
