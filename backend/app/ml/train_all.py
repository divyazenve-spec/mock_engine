"""Central Training Pipeline for Zenve BI Multi-Model Machine Learning Suite.
Extracts training sets, trains all 3 models, verifies accuracy, and serializes
production artifacts to backend/artifacts/.
"""
from __future__ import annotations

import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Optional
from sqlalchemy.orm import Session

from app.ml.data_loader import DataLoader
from app.ml.sales_forecast import SalesForecastModel
from app.ml.churn_prediction import ChurnPredictionModel
from app.ml.inventory_demand import InventoryDemandModel

ARTIFACTS_DIR = Path(__file__).resolve().parent.parent.parent / "artifacts"


def train_all_models(
    db: Optional[Session] = None,
    csv_dir: Optional[str] = None,
    artifacts_dir: Optional[str] = None,
) -> Dict[str, Any]:
    """Orchestrates end-to-end training of Sales, Churn, and Inventory models."""
    out_dir = Path(artifacts_dir) if artifacts_dir else ARTIFACTS_DIR
    out_dir.mkdir(parents=True, exist_ok=True)

    loader = DataLoader(db=db)

    # 1. SALES FORECAST MODEL
    print(">>> [1/3] Extracting features and training Sales Forecast Model...")
    sales_csv = os.path.join(csv_dir, "sales.csv") if csv_dir else None
    df_sales = loader.load_sales_features(csv_path=sales_csv)
    sales_model = SalesForecastModel()
    sales_metrics = sales_model.fit(df_sales)
    sales_model_path = out_dir / "sales_forecast_model.joblib"
    sales_model.save(str(sales_model_path))
    print(f"    [OK] Sales Model saved to {sales_model_path.name} | R2: {sales_metrics.get('r2_score')} | MAE: INR {sales_metrics.get('mae')}")

    # 2. CUSTOMER CHURN MODEL
    print(">>> [2/3] Extracting features and training Customer Churn Radar...")
    churn_csv = os.path.join(csv_dir, "customers.csv") if csv_dir else None
    df_churn = loader.load_churn_features(csv_path=churn_csv)
    churn_model = ChurnPredictionModel()
    churn_metrics = churn_model.fit(df_churn)
    churn_model_path = out_dir / "churn_prediction_model.joblib"
    churn_model.save(str(churn_model_path))
    print(f"    [OK] Churn Model saved to {churn_model_path.name} | Accuracy: {churn_metrics.get('accuracy') * 100:.1f}% | ROC-AUC: {churn_metrics.get('roc_auc')}")

    # 3. INVENTORY DEMAND MODEL
    print(">>> [3/3] Extracting features and training Inventory Demand Model...")
    inv_csv = os.path.join(csv_dir, "inventory.csv") if csv_dir else None
    df_inv = loader.load_inventory_features(csv_path=inv_csv)
    inv_model = InventoryDemandModel()
    inv_metrics = inv_model.fit(df_inv)
    inv_model_path = out_dir / "inventory_demand_model.joblib"
    inv_model.save(str(inv_model_path))
    print(f"    [OK] Inventory Model saved to {inv_model_path.name} | Burn MAE: {inv_metrics.get('mae_burn_rate')} | R2: {inv_metrics.get('r2_score')}")

    # Consolidated Metadata Registry
    metadata = {
        "status": "ready",
        "last_trained_at": datetime.utcnow().isoformat() + "Z",
        "artifacts_directory": str(out_dir),
        "models": {
            "sales_forecast": {
                "algorithm": "RandomForestRegressor + StandardScaler",
                "framework": "scikit-learn",
                "artifact": sales_model_path.name,
                "metrics": sales_metrics,
                "features": sales_model.feature_names,
            },
            "customer_churn": {
                "algorithm": "RandomForestClassifier (Balanced) + StandardScaler",
                "framework": "scikit-learn",
                "artifact": churn_model_path.name,
                "metrics": churn_metrics,
                "features": churn_model.feature_names,
            },
            "inventory_demand": {
                "algorithm": "RandomForestRegressor + Multi-Tier Calibration",
                "framework": "scikit-learn",
                "artifact": inv_model_path.name,
                "metrics": inv_metrics,
                "features": inv_model.feature_names,
            },
        },
    }

    metadata_path = out_dir / "model_metadata.json"
    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print(f"\n[SUCCESS] All 3 AI models successfully trained and serialized to: {out_dir}")
    print(f"   Registry metadata saved to: {metadata_path.name}")
    return metadata


if __name__ == "__main__":
    train_all_models()
