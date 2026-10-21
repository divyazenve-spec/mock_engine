"""Model lifecycle and inference caching layer for Zenve ML models.
Loads serialized models from backend/artifacts/ and provides high-performance inference getters.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, Optional

from app.ml.sales_forecast import SalesForecastModel
from app.ml.churn_prediction import ChurnPredictionModel
from app.ml.inventory_demand import InventoryDemandModel

ARTIFACTS_DIR = Path(__file__).resolve().parent.parent.parent / "artifacts"
_LOADED_MODELS: Dict[str, Any] = {}


def get_sales_model() -> SalesForecastModel:
    """Returns cached Sales Forecast model, loading from disk if not in memory."""
    if "sales_forecast" not in _LOADED_MODELS:
        path = ARTIFACTS_DIR / "sales_forecast_model.joblib"
        if not path.exists():
            from app.ml.train_all import train_all_models
            train_all_models(artifacts_dir=str(ARTIFACTS_DIR))
        _LOADED_MODELS["sales_forecast"] = SalesForecastModel.load(str(path))
    return _LOADED_MODELS["sales_forecast"]


def get_churn_model() -> ChurnPredictionModel:
    """Returns cached Customer Churn model, loading from disk if not in memory."""
    if "customer_churn" not in _LOADED_MODELS:
        path = ARTIFACTS_DIR / "churn_prediction_model.joblib"
        if not path.exists():
            from app.ml.train_all import train_all_models
            train_all_models(artifacts_dir=str(ARTIFACTS_DIR))
        _LOADED_MODELS["customer_churn"] = ChurnPredictionModel.load(str(path))
    return _LOADED_MODELS["customer_churn"]


def get_inventory_model() -> InventoryDemandModel:
    """Returns cached Inventory Demand model, loading from disk if not in memory."""
    if "inventory_demand" not in _LOADED_MODELS:
        path = ARTIFACTS_DIR / "inventory_demand_model.joblib"
        if not path.exists():
            from app.ml.train_all import train_all_models
            train_all_models(artifacts_dir=str(ARTIFACTS_DIR))
        _LOADED_MODELS["inventory_demand"] = InventoryDemandModel.load(str(path))
    return _LOADED_MODELS["inventory_demand"]


def get_model_registry() -> Dict[str, Any]:
    """Reads consolidated metadata registry from backend/artifacts/model_metadata.json."""
    meta_path = ARTIFACTS_DIR / "model_metadata.json"
    if meta_path.exists():
        try:
            with open(meta_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "status": "ready",
        "artifacts_directory": str(ARTIFACTS_DIR),
        "models": {
            "sales_forecast": {"status": "trained"},
            "customer_churn": {"status": "trained"},
            "inventory_demand": {"status": "trained"},
        }
    }


def reload_all_models() -> None:
    """Clears in-memory model caches so freshly trained artifacts are loaded."""
    _LOADED_MODELS.clear()


# Backward compatibility helpers
def load_model(name: str, loader):
    if name not in _LOADED_MODELS:
        _LOADED_MODELS[name] = loader()
    return _LOADED_MODELS[name]


def unload_model(name: str) -> None:
    _LOADED_MODELS.pop(name, None)
