"""
Comprehensive Verification Suite for Zenve AI/ML & RAG Copilot (Phases 1 - 4)
-----------------------------------------------------------------------------
1. Phase 1: Dashboard Catalog & Data Source Mapping Verification
2. Phase 2: Vector Space & Semantic Similarity Retrieval Verification
3. Phase 3: AI Brain Grounding & Live MySQL / ML Tool Routing Verification
4. Phase 4: End-to-End API Endpoints & Copilot Navigation Action Card Verification
"""

import os
import sys
import json
import urllib.request
import urllib.error

# Ensure app can be imported
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from app.rag.vector_store import get_vector_store
from app.rag.ai_brain import get_ai_brain

ARTIFACTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "artifacts")
API_BASE = "http://127.0.0.1:8000/api/v1"

def test_phase_1():
    print("=== [PHASE 1] Checking Extracted Dashboard Catalog & Data Matrix ===")
    cat_path = os.path.join(ARTIFACTS_DIR, "zenve_dashboard_catalog.json")
    doc_path = os.path.join(ARTIFACTS_DIR, "zenve_dashboard_documents.json")
    mat_path = os.path.join(ARTIFACTS_DIR, "zenve_data_source_matrix.json")

    assert os.path.exists(cat_path), "Missing zenve_dashboard_catalog.json"
    assert os.path.exists(doc_path), "Missing zenve_dashboard_documents.json"
    assert os.path.exists(mat_path), "Missing zenve_data_source_matrix.json"

    with open(cat_path, "r", encoding="utf-8") as f:
        catalog = json.load(f)
    with open(mat_path, "r", encoding="utf-8") as f:
        matrix = json.load(f)

    print(f"  [OK] Extracted {len(catalog)} dashboard components.")
    print(f"  [OK] Mapped {len(matrix)} database domain tables.")
    assert len(catalog) >= 250, f"Expected at least 250 dashboards, found {len(catalog)}"
    assert len(matrix) >= 20, f"Expected at least 20 domain tables, found {len(matrix)}"

def test_phase_2():
    print("\n=== [PHASE 2] Checking Vector Index & Semantic Search ===")
    vs = get_vector_store()
    assert vs.matrix is not None, "Vector store should be built and loaded"
    print(f"  [OK] Vector store loaded with {len(vs.documents)} indexed dashboards.")

    # Test semantic queries
    test_queries = [
        ("show critical alerts and notifications", "alerts"),
        ("pet appointment schedule and veterinary consultations", "appointment"),
        ("pharmacy medicine inventory stockout", "pharmacy"),
        ("monthly sales revenue and billing", "sales"),
    ]

    for q, keyword in test_queries:
        hits = vs.search(q, top_k=3)
        assert len(hits) > 0, f"No results for '{q}'"
        top = hits[0]
        print(f"  Query: '{q}' -> Top hit: '{top['title']}' (Score: {top['similarity_score']:.3f}, Route: {top['route_hash']})")
        assert top["similarity_score"] > 0.05, f"Low similarity score for {q}"

def test_phase_3():
    print("\n=== [PHASE 3] Checking AI Brain Reasoning & Live DB Grounding ===")
    brain = get_ai_brain()

    # Query 1: Critical Alerts (Live DB grounding)
    ans1 = brain.ask("How many critical alerts are currently open?")
    print(f"  AI Brain Alerts Response: {ans1['answer'][:120]}...")
    assert "alerts" in ans1["answer"].lower() or "alert" in ans1["answer"].lower()
    assert len(ans1.get("suggested_dashboards", [])) > 0

    # Query 2: Appointments
    ans2 = brain.ask("Show me upcoming appointments")
    print(f"  AI Brain Appointments Response: {ans2['answer'][:120]}...")
    assert len(ans2.get("suggested_dashboards", [])) > 0

    # Query 3: Sales forecast
    ans3 = brain.ask("Predict next month sales revenue")
    print(f"  AI Brain Sales ML Response: {ans3['answer'][:120]}...")
    assert "forecast" in ans3["answer"].lower() or "sales" in ans3["answer"].lower()

def test_phase_4():
    print("\n=== [PHASE 4] Checking Live REST Endpoints & Copilot Navigation Actions ===")

    # Test 4a: POST /api/v1/custom-ai/search-dashboards
    req_data = json.dumps({"query": "inventory stockout", "top_k": 3}).encode("utf-8")
    req = urllib.request.Request(
        f"{API_BASE}/custom-ai/search-dashboards",
        data=req_data,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        count = len(res) if isinstance(res, list) else res.get("count", len(res.get("results", [])))
        print(f"  [OK] /custom-ai/search-dashboards returned {count} results.")
        assert count > 0

    # Test 4b: POST /api/v1/custom-ai/ask
    req_data = json.dumps({"query": "critical alerts count"}).encode("utf-8")
    req = urllib.request.Request(
        f"{API_BASE}/custom-ai/ask",
        data=req_data,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        ans_text = res.get("response") or res.get("answer") or ""
        print(f"  [OK] /custom-ai/ask answered: {ans_text[:100]}...")
        assert len(ans_text) > 0

    # Test 4c: POST /api/v1/copilot/query (Autonomous Multi-Agent Copilot with Navigational RAG)
    req_data = json.dumps({"query": "open critical alerts dashboard"}).encode("utf-8")
    req = urllib.request.Request(
        f"{API_BASE}/copilot/query",
        data=req_data,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print(f"  [OK] /copilot/query intent: {res.get('intent')}")
        print(f"  [OK] /copilot/query text: {res.get('text')[:100]}...")
        print(f"  [OK] /copilot/query citations: {res.get('rag_citations')}")
        intent = res.get("intent")
        assert intent in ("NAVIGATE_DASHBOARD", "NAVIGATIONAL_RAG"), f"Expected navigation intent, got {intent}"
        actions = res.get("actions", [])
        assert len(actions) > 0, "Expected navigation action card in response"
        assert actions[0].get("action_type") == "NAVIGATE_DASHBOARD" or actions[0].get("type") == "NAVIGATE"
        route = actions[0].get("parameters", {}).get("route") or actions[0].get("route")
        print(f"  [OK] Action Card Title: '{actions[0].get('title')}' -> Route: '{route}'")

if __name__ == "__main__":
    try:
        test_phase_1()
        test_phase_2()
        test_phase_3()
        test_phase_4()
        print("\n==================================================================")
        print("ALL PHASES (1, 2, 3, 4) VERIFIED AND OPERATIONAL SUCCESSFULLY! 100%")
        print("==================================================================")
    except Exception as e:
        print(f"\n[FAIL] Test encountered error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
