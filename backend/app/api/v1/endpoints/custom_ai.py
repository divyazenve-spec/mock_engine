"""FastAPI Endpoints for Custom API Integration & Enterprise RAG/Agentic Architecture."""
from __future__ import annotations

from typing import Any, Dict, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.services.rag_agentic_service import (
    CustomAIClient,
    EnterpriseAgenticOrchestrator,
    get_ai_config,
    update_ai_config,
)

router = APIRouter()


class AIConfigUpdateRequest(BaseModel):
    provider: Optional[str] = Field(default=None, description="openai_compatible, gemini, azure, ollama, or built_in")
    api_url: Optional[str] = Field(default=None, description="Custom API endpoint base URL (e.g., https://api.openai.com/v1)")
    api_key: Optional[str] = Field(default=None, description="Bearer token or API key for custom API")
    model: Optional[str] = Field(default=None, description="Model identifier (e.g., gpt-4o, gpt-4o-mini, gemini-1.5-flash, llama-3.3-70b)")
    gemini_api_key: Optional[str] = Field(default=None, description="Google Gemini API key")
    temperature: Optional[float] = Field(default=None, description="Sampling temperature (0.0 to 1.0)")
    rag_enabled: Optional[bool] = Field(default=None, description="Enable live enterprise database & domain RAG grounding")
    agentic_workflow_enabled: Optional[bool] = Field(default=None, description="Enable 5-Agent collaborative orchestration")
    system_prompt: Optional[str] = Field(default=None, description="Executive system persona prompt")


class AIQueryRequest(BaseModel):
    query: str = Field(..., description="Executive question or operational command")
    context: Optional[Dict[str, Any]] = Field(default=None, description="Session context")


@router.get("/status")
def get_status(db: Session = Depends(get_db)):
    """Retrieve active AI model configuration, provider status, and RAG knowledge metrics."""
    cfg = get_ai_config()
    client = CustomAIClient(cfg)
    connection_test = client.test_connection()
    return {
        "config": cfg,
        "connection": connection_test,
        "rag_status": {
            "enabled": cfg.get("rag_enabled", True),
            "layers": [
                "Supervisor & Safety Guardrail Agent",
                "LiveQuery SQL Grounding Agent (zenve_engine)",
                "Veterinary Formulary & Clinical Knowledge Agent",
                "Custom Model Reasoning & Synthesis Agent",
                "Text-to-Action Human-in-the-Loop Agent"
            ]
        }
    }


@router.post("/config")
def set_config(req: AIConfigUpdateRequest):
    """Save or update Custom API integration and Enterprise RAG settings."""
    payload = req.model_dump(exclude_unset=True)
    updated = update_ai_config(payload, persist_to_env=True)
    return {"message": "AI configuration updated successfully", "config": updated}


@router.post("/test-connection")
def test_connection(req: Optional[AIConfigUpdateRequest] = None):
    """Send live test ping to custom API or Gemini endpoint and report latency & model response."""
    test_cfg = get_ai_config()
    if req:
        updates = req.model_dump(exclude_unset=True)
        test_cfg.update(updates)
    
    client = CustomAIClient(test_cfg)
    result = client.test_connection()
    return result


@router.post("/query")
def execute_rag_agentic_query(req: AIQueryRequest, db: Session = Depends(get_db)):
    """Run full Enterprise RAG & 5-Agent workflow for given query."""
    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    # 1. Run semantic dashboard search
    from app.rag.vector_store import VectorStore
    store = VectorStore.load()
    matched_dashboards = store.search(req.query, top_k=3)

    # 2. Run orchestrator
    orchestrator = EnterpriseAgenticOrchestrator(db)
    res = orchestrator.process_query(req.query, req.context)
    res["relevant_dashboards"] = matched_dashboards
    return res


class DashboardSearchRequest(BaseModel):
    query: str
    top_k: int = 5
    category: Optional[str] = None


@router.post("/search-dashboards")
def search_dashboards(req: DashboardSearchRequest):
    """Semantic vector search across all 263 Zenve BI dashboards (Phase 2 RAG)."""
    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Search query cannot be empty")
    from app.rag.vector_store import VectorStore
    store = VectorStore.load()
    return store.search(req.query, top_k=req.top_k, category=req.category)


@router.get("/dashboards/catalog")
def get_dashboard_catalog():
    """Retrieve structured metadata catalog for all 263 dashboards (Phase 1 Inventory)."""
    import json
    from pathlib import Path
    cat_file = Path(__file__).resolve().parent.parent.parent.parent / "artifacts" / "zenve_dashboard_catalog.json"
    if cat_file.exists():
        with open(cat_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


@router.post("/ask")
def ask_ai_brain(req: AIQueryRequest, db: Session = Depends(get_db)):
    """Phase 3 AI Brain: Multi-tool reasoning with RAG search, live database telemetry, and ML forecasts."""
    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    from app.rag.ai_brain import AIBrain
    brain = AIBrain()
    return brain.process_query(req.query, db)
