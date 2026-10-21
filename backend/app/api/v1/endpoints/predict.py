"""Machine Learning Prediction & Model Management Endpoints.
Provides live inference for Sales Forecasting, Churn Risk, and Inventory Exhaustion,
plus on-demand re-training against project data or newly ingested original datasets.
"""
from __future__ import annotations

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.ml.data_loader import DataLoader
from app.ml.train_all import train_all_models
from app.models.ml_model import (
    get_sales_model,
    get_churn_model,
    get_inventory_model,
    get_model_registry,
    reload_all_models,
)

router = APIRouter()


# ---------------------------------------------------------------------------
# Request Schemas
# ---------------------------------------------------------------------------
class SalesForecastRequest(BaseModel):
    horizon_days: int = Field(default=30, ge=1, le=365, description="Number of days forward to project")
    growth_scenario: float = Field(default=0.0, description="Optional percentage growth multiplier (e.g. 0.15 for +15%)")


class CustomerChurnRequest(BaseModel):
    customer_id: Optional[str] = Field(default=None, description="Specific customer code (e.g. CUST-001) or leave empty for population batch")
    recency_days: Optional[float] = Field(default=None, description="Days since last transaction")
    total_orders: Optional[float] = Field(default=None, description="Total lifetime completed orders")
    total_spent: Optional[float] = Field(default=None, description="Total lifetime gross spend in INR")
    tenure_days: Optional[float] = Field(default=None, description="Customer relationship age in days")
    tier_code: Optional[int] = Field(default=2, description="Customer tier: 1=Bronze, 2=Silver, 3=Gold, 4=Platinum, 5=Diamond")


class InventoryDemandRequest(BaseModel):
    sku: Optional[str] = Field(default=None, description="Specific SKU code or leave empty to evaluate all inventory")
    current_stock: Optional[float] = Field(default=None, description="Units on hand")
    min_stock: Optional[float] = Field(default=None, description="Safety threshold units")
    price: Optional[float] = Field(default=None, description="Retail selling price")
    cost_price: Optional[float] = Field(default=None, description="COGS cost per unit")


class RetrainRequest(BaseModel):
    csv_dir: Optional[str] = Field(default=None, description="Optional path to directory containing original data CSVs (sales.csv, customers.csv, inventory.csv)")


# ---------------------------------------------------------------------------
# 1. Model Registry Status
# ---------------------------------------------------------------------------
@router.get("/models")
@router.get("/status")
def get_models_status():
    """Returns metadata, accuracy metrics, and artifact paths for all trained AI models."""
    return get_model_registry()


# ---------------------------------------------------------------------------
# 2. Sales & Revenue Forecast Inference
# ---------------------------------------------------------------------------
@router.post("/sales")
def predict_sales(req: SalesForecastRequest = SalesForecastRequest(), db: Session = Depends(get_db)):
    """Generates probabilistic revenue trajectory projections (p10, p50, p90) using the trained Random Forest model."""
    try:
        loader = DataLoader(db=db)
        df_hist = loader.load_sales_features()
        model = get_sales_model()
        return model.forecast(
            historical_df=df_hist,
            horizon_days=req.horizon_days,
            growth_rate=req.growth_scenario,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Sales forecast inference error: {str(exc)}")


# ---------------------------------------------------------------------------
# 3. Customer Churn Radar Inference
# ---------------------------------------------------------------------------
@router.post("/churn")
def predict_churn(req: CustomerChurnRequest = CustomerChurnRequest(), db: Session = Depends(get_db)):
    """Predicts customer churn probability and triggers proactive retention playbooks."""
    try:
        model = get_churn_model()
        loader = DataLoader(db=db)
        
        # If explicit features provided in payload
        if req.recency_days is not None and req.total_orders is not None:
            features = {
                "customer_id": req.customer_id or "CUSTOM-USER",
                "total_orders": req.total_orders,
                "total_spent": req.total_spent or (req.total_orders * 2500),
                "recency_days": req.recency_days,
                "tenure_days": req.tenure_days or max(30, req.recency_days + 15),
                "aov": (req.total_spent or 2500) / max(1, req.total_orders),
                "orders_per_month": req.total_orders / max(1.0, (req.tenure_days or 90) / 30.0),
                "tier_code": req.tier_code or 2,
            }
            return model.predict_single(features)

        # Otherwise evaluate from active database
        df_customers = loader.load_churn_features()
        if req.customer_id:
            match = df_customers[df_customers["customer_id"] == req.customer_id]
            if not match.empty:
                return model.predict_single(match.iloc[0].to_dict())

        # Batch scoring of all customers
        ranked = model.predict_batch(df_customers)
        return {
            "total_customers_scored": len(ranked),
            "high_risk_count": sum(1 for c in ranked if c["risk_tier"] in ("CRITICAL", "HIGH")),
            "cohorts": ranked,
            "model": "RandomForestClassifier (Scikit-Learn)",
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Churn prediction inference error: {str(exc)}")


# ---------------------------------------------------------------------------
# 4. Inventory Exhaustion & Stockout Inference
# ---------------------------------------------------------------------------
@router.post("/inventory")
def predict_inventory(req: InventoryDemandRequest = InventoryDemandRequest(), db: Session = Depends(get_db)):
    """Predicts daily burn rate, days-of-inventory runway, and flags critical stockouts."""
    try:
        model = get_inventory_model()
        loader = DataLoader(db=db)

        if req.current_stock is not None and req.price is not None:
            cost = req.cost_price or (req.price * 0.6)
            margin = ((req.price - cost) / req.price * 100) if req.price > 0 else 0
            features = {
                "sku": req.sku or "CUSTOM-SKU",
                "current_stock": req.current_stock,
                "min_stock": req.min_stock or 15,
                "price": req.price,
                "cost_price": cost,
                "margin_pct": margin,
            }
            return model.predict_single(features)

        df_inv = loader.load_inventory_features()
        if req.sku:
            match = df_inv[df_inv["sku"] == req.sku]
            if not match.empty:
                return model.predict_single(match.iloc[0].to_dict())

        ranked = model.predict_batch(df_inv)
        return {
            "total_items_analyzed": len(ranked),
            "critical_items_count": sum(1 for item in ranked if item["risk_level"] == "CRITICAL"),
            "high_risk_count": sum(1 for item in ranked if item["risk_level"] == "HIGH"),
            "inventory_risks": ranked,
            "model": "RandomForestRegressor + Multi-Tier Calibration",
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Inventory demand inference error: {str(exc)}")


# ---------------------------------------------------------------------------
# 5. On-Demand Re-Training Pipeline (For Current or Original Ingested Data)
# ---------------------------------------------------------------------------
@router.post("/train")
def trigger_retraining(req: RetrainRequest = RetrainRequest(), db: Session = Depends(get_db)):
    """Triggers end-to-end model training against current DB records or original external CSV data."""
    try:
        summary = train_all_models(
            db=db,
            csv_dir=req.csv_dir,
        )
        reload_all_models()
        return {
            "status": "success",
            "message": "All 3 AI models successfully retrained and hot-reloaded into memory.",
            "registry": summary,
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Training pipeline execution failed: {str(exc)}")


# ---------------------------------------------------------------------------
# 6. Legacy Endpoint Backward Compatibility
# ---------------------------------------------------------------------------
@router.post("")
@router.get("")
def predict_legacy(request: Request, db: Session = Depends(get_db)):
    """Legacy predictor endpoint returning unified intelligence snapshot."""
    registry = get_model_registry()
    return {
        "status": "ready",
        "message": "Zenve AI Multi-Model Inference Engine is active and serving.",
        "models": registry.get("models", {}),
        "endpoints": {
            "sales_forecast": "/api/v1/predict/sales",
            "churn_prediction": "/api/v1/predict/churn",
            "inventory_demand": "/api/v1/predict/inventory",
            "retrain_models": "/api/v1/predict/train",
            "model_metadata": "/api/v1/predict/models",
        }
    }
