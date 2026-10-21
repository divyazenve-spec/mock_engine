"""Automated Test Suite for Zenve AI Multi-Model Machine Learning Pipeline.
Tests data loaders, model fitting, serialization, forward forecasts, and FastAPI endpoints.
"""
import sys
from pathlib import Path
from fastapi.testclient import TestClient

backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from app.main import app
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

client = TestClient(app)


def test_data_loader():
    """Verify that DataLoader correctly queries the database and extracts feature matrices."""
    loader = DataLoader()

    df_sales = loader.load_sales_features()
    assert not df_sales.empty, "Sales dataframe should not be empty"
    assert "sales_total" in df_sales.columns
    assert "day_of_week" in df_sales.columns
    assert "sales_rolling_7d" in df_sales.columns

    df_churn = loader.load_churn_features()
    assert not df_churn.empty, "Churn dataframe should not be empty"
    assert "recency_days" in df_churn.columns
    assert "total_orders" in df_churn.columns
    assert "churned" in df_churn.columns

    df_inv = loader.load_inventory_features()
    assert not df_inv.empty, "Inventory dataframe should not be empty"
    assert "current_stock" in df_inv.columns
    assert "burn_rate" in df_inv.columns
    assert "runway_days" in df_inv.columns


def test_sales_forecast_model_lifecycle():
    """Verify fitting, saving, loading, and forward forecasting."""
    loader = DataLoader()
    df_sales = loader.load_sales_features()

    model = SalesForecastModel()
    metrics = model.fit(df_sales)
    assert "mae" in metrics
    assert "r2_score" in metrics

    # Test 30-day forward forecast
    forecast_res = model.forecast(df_sales, horizon_days=30)
    assert forecast_res["horizon_days"] == 30
    assert len(forecast_res["daily_projections"]) == 30
    assert forecast_res["summary"]["projected_revenue_p50"] > 0
    assert "p10" in forecast_res["daily_projections"][0]
    assert "p90" in forecast_res["daily_projections"][0]


def test_churn_prediction_model_lifecycle():
    """Verify churn classification, probability calibration, and retention routing."""
    loader = DataLoader()
    df_churn = loader.load_churn_features()

    model = ChurnPredictionModel()
    metrics = model.fit(df_churn)
    assert "accuracy" in metrics
    assert "f1_score" in metrics

    # Test individual customer scoring
    sample_feat = {
        "customer_id": "TEST-001",
        "name": "Test Pet Parent",
        "total_orders": 1,
        "total_spent": 1200.0,
        "recency_days": 65.0,
        "tenure_days": 80.0,
        "aov": 1200.0,
        "orders_per_month": 0.4,
        "tier_code": 1,
    }
    pred = model.predict_single(sample_feat)
    assert 0.0 <= pred["churn_probability"] <= 1.0
    assert pred["risk_tier"] in ("CRITICAL", "HIGH", "MEDIUM", "LOW")
    assert "recommended_playbook" in pred


def test_inventory_demand_model_lifecycle():
    """Verify inventory burn prediction and runway days estimation."""
    loader = DataLoader()
    df_inv = loader.load_inventory_features()

    model = InventoryDemandModel()
    metrics = model.fit(df_inv)
    assert "mae_burn_rate" in metrics

    # Test individual SKU
    sample_sku = {
        "sku": "TEST-MED-01",
        "name": "Test Antibiotic",
        "current_stock": 5,
        "min_stock": 20,
        "price": 850.0,
        "cost_price": 500.0,
        "margin_pct": 41.2,
    }
    pred = model.predict_single(sample_sku)
    assert pred["risk_level"] in ("CRITICAL", "HIGH", "MEDIUM", "LOW")
    assert "predicted_runway_days" in pred
    assert "recommended_action" in pred


def test_fastapi_predict_endpoints():
    """Verify all FastAPI /api/v1/predict REST endpoints."""
    # 1. Models Status
    res = client.get("/api/v1/predict/models")
    assert res.status_code == 200
    data = res.json()
    assert "models" in data
    assert "sales_forecast" in data["models"]

    # 2. Sales Forecast Endpoint
    res = client.post("/api/v1/predict/sales", json={"horizon_days": 14, "growth_scenario": 0.10})
    assert res.status_code == 200
    sales_data = res.json()
    assert sales_data["horizon_days"] == 14
    assert len(sales_data["daily_projections"]) == 14

    # 3. Churn Endpoint (Batch)
    res = client.post("/api/v1/predict/churn", json={})
    assert res.status_code == 200
    churn_data = res.json()
    assert "cohorts" in churn_data
    assert len(churn_data["cohorts"]) > 0

    # 4. Inventory Endpoint (Batch)
    res = client.post("/api/v1/predict/inventory", json={})
    assert res.status_code == 200
    inv_data = res.json()
    assert "inventory_risks" in inv_data
    assert len(inv_data["inventory_risks"]) > 0

    # 5. Legacy Endpoint
    res = client.post("/api/v1/predict", json={})
    assert res.status_code == 200
    legacy_data = res.json()
    assert legacy_data["status"] == "ready"


if __name__ == "__main__":
    test_data_loader()
    print("[PASS] DataLoader tests passed.")
    test_sales_forecast_model_lifecycle()
    print("[PASS] SalesForecastModel tests passed.")
    test_churn_prediction_model_lifecycle()
    print("[PASS] ChurnPredictionModel tests passed.")
    test_inventory_demand_model_lifecycle()
    print("[PASS] InventoryDemandModel tests passed.")
    test_fastapi_predict_endpoints()
    print("[PASS] FastAPI prediction endpoint tests passed.")
    print("\nALL MACHINE LEARNING PIPELINE TESTS COMPLETED SUCCESSFULLY!")
