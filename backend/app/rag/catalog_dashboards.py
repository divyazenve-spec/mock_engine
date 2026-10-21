"""Phase 1: Automated Dashboard Inventory & Knowledge Extraction Engine.
Scrapes and parses all 250+ dashboards from frontend/src/pages/, standardizes
their metadata into clean JSON and searchable text documents, and maps live database sources.
"""
from __future__ import annotations

import json
import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional

WORKSPACE_ROOT = Path(__file__).resolve().parent.parent.parent.parent
FRONTEND_PAGES_DIR = WORKSPACE_ROOT / "frontend" / "src" / "pages"
ARTIFACTS_DIR = Path(__file__).resolve().parent.parent.parent / "artifacts"

# Known Table & API Map for Core Domains
TABLE_API_MAP = {
    "alerts": {"table": "alerts", "api": "/api/v1/alerts"},
    "orders": {"table": "orders", "api": "/api/v1/orders"},
    "products": {"table": "products", "api": "/api/v1/products"},
    "inventory": {"table": "products", "api": "/api/v1/products"},
    "pharmacy": {"table": "pharmacy_medicines", "api": "/api/v1/pharmacy/medicines"},
    "medicines": {"table": "pharmacy_medicines", "api": "/api/v1/pharmacy/medicines"},
    "appointments": {"table": "appointments", "api": "/api/v1/veterinary/appointments"},
    "veterinary": {"table": "veterinary_services", "api": "/api/v1/veterinary/services"},
    "services": {"table": "veterinary_services", "api": "/api/v1/veterinary/services"},
    "doctors": {"table": "doctors", "api": "/api/v1/doctors"},
    "clinics": {"table": "clinics_hospitals", "api": "/api/v1/clinics"},
    "hospitals": {"table": "clinics_hospitals", "api": "/api/v1/clinics"},
    "customers": {"table": "customers", "api": "/api/v1/customers"},
    "pets": {"table": "pets", "api": "/api/v1/pets"},
    "employees": {"table": "employees", "api": "/api/v1/employees"},
    "hr": {"table": "employees", "api": "/api/v1/employees"},
    "marketing": {"table": "marketing_campaigns", "api": "/api/v1/marketing/campaigns"},
    "campaigns": {"table": "marketing_campaigns", "api": "/api/v1/marketing/campaigns"},
    "vendors": {"table": "vendors", "api": "/api/v1/vendors"},
    "procurement": {"table": "vendors", "api": "/api/v1/vendors"},
    "logistics": {"table": "logistics_deliveries", "api": "/api/v1/logistics/deliveries"},
    "delivery": {"table": "logistics_deliveries", "api": "/api/v1/logistics/deliveries"},
    "fashion": {"table": "fashion_products", "api": "/api/v1/fashion/products"},
    "b2b": {"table": "b2b_accounts", "api": "/api/v1/b2b/accounts"},
    "enterprise": {"table": "b2b_accounts", "api": "/api/v1/b2b/accounts"},
    "import": {"table": "import_export_shipments", "api": "/api/v1/import-export/shipments"},
    "export": {"table": "import_export_shipments", "api": "/api/v1/import-export/shipments"},
    "subscriptions": {"table": "subscriptions", "api": "/api/v1/subscriptions/subscribers"},
    "plans": {"table": "subscription_plans", "api": "/api/v1/subscriptions/plans"},
    "reports": {"table": "reports", "api": "/api/v1/reports"},
    "sales": {"table": "sales", "api": "/api/v1/data"},
    "revenue": {"table": "sales", "api": "/api/v1/data"},
    "metrics": {"table": "daily_metrics", "api": "/api/v1/data"},
    "system": {"table": "system_health", "api": "/api/v1/system-health"},
    "health": {"table": "system_health", "api": "/api/v1/system-health"},
    "settings": {"table": "company_settings", "api": "/api/v1/settings"},
    "forecast": {"table": "daily_metrics", "api": "/api/v1/predict/sales"},
    "churn": {"table": "customers", "api": "/api/v1/predict/churn"},
}


def sanitize_text(text: str) -> str:
    """Removes excess whitespace, quotes, and React escaping."""
    if not text:
        return ""
    cleaned = re.sub(r"\s+", " ", text)
    cleaned = cleaned.replace('\\"', '"').replace("\\'", "'")
    return cleaned.strip()


def parse_jsx_file(filepath: Path) -> Dict[str, Any]:
    """Extracts UI layout, title, subtitles, KPIs, and table columns from JSX code."""
    try:
        content = filepath.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return {}

    # Extract DashboardLayout attributes
    cat_match = re.search(r'category=["\']([^"\']+)["\']', content)
    subcat_match = re.search(r'subcategory=["\']([^"\']+)["\']', content)
    title_match = re.search(r'title=["\']([^"\']+)["\']', content)
    subtitle_match = re.search(r'subtitle=["\']([^"\']+)["\']', content)
    badge_match = re.search(r'badge=["\']([^"\']+)["\']', content)
    icon_match = re.search(r'icon=["\']([^"\']+)["\']', content)

    # Extract KpiCards
    kpis = []
    kpi_patterns = re.findall(
        r'<KpiCard\s+[^>]*label=["\']([^"\']+)["\'](?:\s+value=["\']([^"\']*)["\'])?',
        content
    )
    for label, val in kpi_patterns:
        kpis.append({"label": sanitize_text(label), "sample_value": sanitize_text(val)})

    # Extract Table Headers
    th_matches = re.findall(r'<th[^>]*>([^<]+)</th>', content)
    headers = [sanitize_text(h) for h in th_matches if sanitize_text(h)]

    # Extract Filter Buttons
    btn_matches = re.findall(r'<button[^>]*>([^<]+)</button>', content)
    buttons = [sanitize_text(b) for b in btn_matches if sanitize_text(b) and len(sanitize_text(b)) < 30]

    filename = filepath.stem
    rel_path = filepath.relative_to(FRONTEND_PAGES_DIR).as_posix()
    category = cat_match.group(1) if cat_match else filepath.parent.name
    subcategory = subcat_match.group(1) if subcat_match else filename
    title = title_match.group(1) if title_match else f"{subcategory} Dashboard"
    subtitle = subtitle_match.group(1) if subtitle_match else f"Operational telemetry and analytical controls for {title}"

    # Determine database mapping
    search_str = f"{category} {subcategory} {title} {filename}".lower()
    matched_table = "general_telemetry"
    matched_api = "/api/v1/data"
    for key, info in TABLE_API_MAP.items():
        if key in search_str:
            matched_table = info["table"]
            matched_api = info["api"]
            break

    # Build semantic route hash
    slug = re.sub(r"[^a-z0-9]+", "-", f"{category}-{subcategory}".lower()).strip("-")
    route_hash = f"#{slug}"

    return {
        "dashboard_id": f"dash_{re.sub(r'[^a-zA-Z0-9_]', '_', filename).lower()}",
        "component_name": filename,
        "relative_file": rel_path,
        "category": sanitize_text(category),
        "subcategory": sanitize_text(subcategory),
        "title": sanitize_text(title),
        "subtitle": sanitize_text(subtitle),
        "badge": badge_match.group(1) if badge_match else "",
        "icon": icon_match.group(1) if icon_match else "📊",
        "route_hash": route_hash,
        "kpis": kpis,
        "table_columns": headers[:10],
        "active_filters": buttons[:6],
        "data_source": {
            "primary_table": matched_table,
            "api_endpoint": matched_api,
            "integration_type": "Direct SQL & REST"
        }
    }


def extract_all_dashboards() -> List[Dict[str, Any]]:
    """Iterates through all JSX dashboard components in frontend/src/pages/."""
    dashboards = []
    if not FRONTEND_PAGES_DIR.exists():
        print(f"[!] Warning: Pages directory not found at {FRONTEND_PAGES_DIR}")
        return []

    for root, _, files in os.walk(FRONTEND_PAGES_DIR):
        for file in files:
            if file.endswith(".jsx") and file != "index.jsx":
                jsx_path = Path(root) / file
                # Skip shared components
                if "shared" in jsx_path.parts:
                    continue
                d_meta = parse_jsx_file(jsx_path)
                if d_meta:
                    dashboards.append(d_meta)

    # Sort deterministically
    dashboards.sort(key=lambda d: (d["category"], d["subcategory"]))
    return dashboards


def generate_searchable_documents(dashboards: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Transforms raw metadata into clean textual RAG documents with rich context."""
    documents = []
    for d in dashboards:
        kpi_str = ", ".join([f"{k['label']} ({k['sample_value']})" if k['sample_value'] else k['label'] for k in d["kpis"]]) or "Standard Operational KPIs"
        cols_str = ", ".join(d["table_columns"]) if d["table_columns"] else "General data records"
        filters_str = ", ".join(d["active_filters"]) if d["active_filters"] else "Standard time range & status"

        doc_text = (
            f"Dashboard Name: {d['title']}\n"
            f"Category: {d['category']} > {d['subcategory']}\n"
            f"Navigation Route Hash: {d['route_hash']}\n"
            f"Component File: {d['relative_file']}\n"
            f"Primary Purpose & Subtitle: {d['subtitle']}\n"
            f"Key Performance Indicators (KPIs): {kpi_str}\n"
            f"Data Grid Columns: {cols_str}\n"
            f"Active UI Filters: {filters_str}\n"
            f"Database Source Table: {d['data_source']['primary_table']}\n"
            f"Backend API Endpoint: {d['data_source']['api_endpoint']}\n"
            f"Keywords: {d['category']}, {d['subcategory']}, {d['title']}, {d['data_source']['primary_table']}"
        )

        documents.append({
            "id": d["dashboard_id"],
            "title": d["title"],
            "category": d["category"],
            "route_hash": d["route_hash"],
            "primary_table": d["data_source"]["primary_table"],
            "api_endpoint": d["data_source"]["api_endpoint"],
            "document_text": doc_text,
            "metadata": {
                "category": d["category"],
                "subcategory": d["subcategory"],
                "icon": d["icon"],
                "route": d["route_hash"],
                "api": d["data_source"]["api_endpoint"],
                "table": d["data_source"]["primary_table"],
            }
        })
    return documents


def run_extraction() -> Dict[str, Any]:
    """Orchestrates Phase 1: inventories all dashboards, saves catalog and text documents."""
    print("=================================================================")
    print("  PHASE 1: DASHBOARD EXTRACTION, INVENTORY & PREPARATION")
    print("=================================================================")
    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)

    dashboards = extract_all_dashboards()
    print(f"[*] Scanned and parsed {len(dashboards)} dashboard components from frontend/src/pages/.")

    # 1. Save Structured Catalog JSON
    catalog_path = ARTIFACTS_DIR / "zenve_dashboard_catalog.json"
    with open(catalog_path, "w", encoding="utf-8") as f:
        json.dump(dashboards, f, indent=2)
    print(f"    [OK] Saved Structured Catalog -> {catalog_path.name} ({len(dashboards)} entries)")

    # 2. Save Standardized Searchable Text Documents
    documents = generate_searchable_documents(dashboards)
    docs_path = ARTIFACTS_DIR / "zenve_dashboard_documents.json"
    with open(docs_path, "w", encoding="utf-8") as f:
        json.dump(documents, f, indent=2)
    print(f"    [OK] Saved Standardized Text Documents -> {docs_path.name} ({len(documents)} docs)")

    # 3. Save Data Source Matrix
    source_matrix = {}
    for d in dashboards:
        tbl = d["data_source"]["primary_table"]
        if tbl not in source_matrix:
            source_matrix[tbl] = {
                "table_name": tbl,
                "api_endpoint": d["data_source"]["api_endpoint"],
                "dashboards_count": 0,
                "dashboards": []
            }
        source_matrix[tbl]["dashboards_count"] += 1
        source_matrix[tbl]["dashboards"].append({
            "title": d["title"],
            "route_hash": d["route_hash"],
            "category": d["category"]
        })

    matrix_path = ARTIFACTS_DIR / "zenve_data_source_matrix.json"
    with open(matrix_path, "w", encoding="utf-8") as f:
        json.dump(source_matrix, f, indent=2)
    print(f"    [OK] Saved Live Data Source Matrix -> {matrix_path.name} ({len(source_matrix)} unique table mappings)")

    print(f"\n[SUCCESS] Phase 1 Foundation successfully generated in: {ARTIFACTS_DIR}")
    return {
        "dashboards_count": len(dashboards),
        "documents_count": len(documents),
        "tables_mapped": len(source_matrix),
        "catalog_file": str(catalog_path),
        "documents_file": str(docs_path),
        "matrix_file": str(matrix_path),
    }


if __name__ == "__main__":
    run_extraction()
