"""Phase 3: AI Brain & Multi-Tool Agentic Reasoning Orchestrator.
Connects user questions to static dashboard knowledge (RAG Vector Store),
live database telemetry (SQLAlchemy), and predictive machine learning models.
"""
from __future__ import annotations

import json
import re
from datetime import date, datetime
from typing import Any, Dict, List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.core.database import SessionLocal
from app.rag.vector_store import VectorStore
from app.models.ml_model import (
    get_sales_model,
    get_churn_model,
    get_inventory_model,
)
from app.models.all_models import (
    Alert,
    Appointment,
    B2BAccount,
    ClinicHospital,
    Customer,
    DailyMetric,
    Doctor,
    Employee,
    FashionProduct,
    ImportExportShipment,
    LogisticsDelivery,
    MarketingCampaign,
    Order,
    Pet,
    PharmacyMedicine,
    Product,
    Report,
    Sale,
    Subscription,
    SubscriptionPlan,
    SystemHealth,
    Vendor,
    VeterinaryService,
)


SYSTEM_PROMPT = """You are Zenve Executive AI Copilot — the intelligent enterprise decision and operational assistant for Zenve Pets Healthcare & Retail BI Platform.

Your Core Capabilities:
1. Navigational Intelligence: Guide users across all 263 dashboards, explaining what KPIs they track and providing direct links.
2. Live Grounded Telemetry: Pull real-time operational data from the 24 database domain tables (Alerts, Appointments, Inventory, Subscriptions, Sales, etc.).
3. Autonomous Predictions: Trigger time-series sales forecasting, customer churn risk scoring, and inventory stockout runway predictions.

Response Guidelines:
- Be executive, precise, and authoritative.
- Always cite the relevant dashboard route hash (e.g. #alerts-critical) and live database metrics.
- When critical risks are identified (e.g. temperature excursions, low stock, payment drop), recommend proactive playbooks.
"""


class AIBrain:
    """Central AI Reasoning & Dispatch Engine."""

    def __init__(self, vector_store: Optional[VectorStore] = None):
        self.vector_store = vector_store or VectorStore.load()

    # -------------------------------------------------------------------------
    # Tool 1: Live Database Grounding Engine
    # -------------------------------------------------------------------------
    def query_live_data(self, query: str, db: Session) -> Dict[str, Any]:
        """Queries active database domain tables based on entities mentioned in user query."""
        q = query.lower()
        live_info: Dict[str, Any] = {}

        # 1. Alerts
        if any(w in q for w in ("alert", "incident", "emergency", "chiller", "oxygen", "escalat")):
            active_alerts = db.query(Alert).filter(Alert.status == "Active").all()
            live_info["alerts"] = {
                "active_count": len(active_alerts),
                "items": [{
                    "code": a.alert_code,
                    "title": a.title,
                    "severity": a.severity,
                    "category": a.category,
                    "message": a.message
                } for a in active_alerts[:5]]
            }

        # 2. Appointments
        if any(w in q for w in ("appointment", "booking", "schedule", "opd", "consult", "queue")):
            apps = db.query(Appointment).order_by(Appointment.id.desc()).all()
            live_info["appointments"] = {
                "total_count": len(apps),
                "upcoming": [{
                    "code": a.appointment_code,
                    "pet": a.pet_name,
                    "doctor": a.doctor_name,
                    "service": a.service_name,
                    "time": a.appointment_time,
                    "status": a.status
                } for a in apps[:5]]
            }

        # 3. Subscriptions & MRR
        if any(w in q for w in ("subscription", "subscriber", "mrr", "plan", "renewal", "wellness plan")):
            plans = db.query(SubscriptionPlan).all()
            total_subscribers = sum(p.active_subscribers for p in plans)
            total_mrr = sum(p.mrr for p in plans)
            live_info["subscriptions"] = {
                "total_active_subscribers": total_subscribers,
                "total_monthly_mrr": round(total_mrr, 2),
                "plans": [{
                    "name": p.name,
                    "price": p.price,
                    "subscribers": p.active_subscribers,
                    "mrr": p.mrr
                } for p in plans[:4]]
            }

        # 4. Sales & Revenue
        if any(w in q for w in ("sale", "revenue", "gmv", "income", "money", "earning")):
            recent_sales = db.query(Sale).filter(Sale.status == "Paid").all()
            total_sales = sum(s.amount for s in recent_sales)
            live_info["sales"] = {
                "total_settled_revenue": round(total_sales, 2),
                "total_paid_orders": len(recent_sales),
                "average_order_value": round(total_sales / max(1, len(recent_sales)), 2)
            }

        # 5. Inventory & Stockouts
        if any(w in q for w in ("inventory", "stock", "stockout", "medicine", "pharmacy", "reorder", "runway")):
            prods = db.query(Product).all()
            meds = db.query(PharmacyMedicine).all()
            low_stock_prods = [p for p in prods if p.stock <= p.min_stock]
            low_stock_meds = [m for m in meds if m.stock <= 15 or m.status == "Low Stock Warning"]
            live_info["inventory"] = {
                "total_products": len(prods),
                "total_medicines": len(meds),
                "low_stock_items": len(low_stock_prods) + len(low_stock_meds),
                "critical_skus": [{
                    "sku": m.med_code,
                    "name": m.name,
                    "stock": m.stock,
                    "status": m.status
                } for m in low_stock_meds[:4]]
            }

        # 6. Customers & Churn
        if any(w in q for w in ("customer", "pet parent", "client", "retention", "churn", "ltv")):
            custs = db.query(Customer).all()
            live_info["customers"] = {
                "total_registered": len(custs),
                "top_pet_parents": [{
                    "name": c.name,
                    "city": c.city,
                    "tier": c.tier,
                    "total_orders": c.total_orders,
                    "total_spent": c.total_spent
                } for c in custs[:4]]
            }

        # 7. System Health
        if any(w in q for w in ("health", "uptime", "latency", "system", "microservice", "server")):
            services = db.query(SystemHealth).all()
            live_info["system_health"] = {
                "total_services": len(services),
                "all_healthy": all(s.status == "Healthy" for s in services),
                "services": [{
                    "name": s.service_name,
                    "status": s.status,
                    "uptime": f"{s.uptime_pct}%",
                    "latency": f"{s.latency_ms}ms"
                } for s in services[:4]]
            }

        return live_info

    # -------------------------------------------------------------------------
    # Tool 2: Machine Learning Prediction Dispatch
    # -------------------------------------------------------------------------
    def run_predictions(self, query: str, db: Session) -> Optional[Dict[str, Any]]:
        """Invokes trained Scikit-Learn models when predictive questions are asked."""
        q = query.lower()
        if any(w in q for w in ("forecast", "predict sales", "revenue projection", "future revenue")):
            from app.ml.data_loader import DataLoader
            loader = DataLoader(db=db)
            df_hist = loader.load_sales_features()
            sales_model = get_sales_model()
            forecast = sales_model.forecast(df_hist, horizon_days=30)
            return {"type": "sales_forecast", "result": forecast}

        if any(w in q for w in ("churn risk", "predict churn", "who is churning", "at risk customers")):
            from app.ml.data_loader import DataLoader
            loader = DataLoader(db=db)
            df_churn = loader.load_churn_features()
            churn_model = get_churn_model()
            ranked = churn_model.predict_batch(df_churn)
            return {"type": "churn_prediction", "result": ranked[:5]}

        if any(w in q for w in ("stockout risk", "inventory runway", "burn rate", "predict stockout")):
            from app.ml.data_loader import DataLoader
            loader = DataLoader(db=db)
            df_inv = loader.load_inventory_features()
            inv_model = get_inventory_model()
            ranked = inv_model.predict_batch(df_inv)
            return {"type": "inventory_demand", "result": ranked[:5]}

        return None

    # -------------------------------------------------------------------------
    # Central Agentic Execution Pipeline
    # -------------------------------------------------------------------------
    def process_query(self, user_query: str, db: Optional[Session] = None) -> Dict[str, Any]:
        """Main entry point: classifies intent, searches vector store, queries DB, and generates reply."""
        session = db or SessionLocal()
        try:
            # Step 1: Semantic Search against 263 Dashboards (RAG)
            matched_dashboards = self.vector_store.search(user_query, top_k=4)

            # Step 2: Live Grounded Telemetry
            live_data = self.query_live_data(user_query, session)

            # Step 3: Predictive ML Trigger
            prediction = self.run_predictions(user_query, session)

            # Step 4: Intelligent Synthesis
            response_text = self._synthesize_response(user_query, matched_dashboards, live_data, prediction)

            return {
                "query": user_query,
                "response": response_text,
                "relevant_dashboards": matched_dashboards,
                "live_telemetry_grounded": bool(live_data),
                "live_data": live_data,
                "prediction": prediction,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        finally:
            if db is None:
                session.close()

    def ask(self, user_query: str, db: Optional[Session] = None) -> Dict[str, Any]:
        """Convenience wrapper returning answer and suggested_dashboards."""
        res = self.process_query(user_query, db)
        return {
            "query": user_query,
            "answer": res["response"],
            "suggested_dashboards": res["relevant_dashboards"],
            "live_data": res["live_data"],
            "prediction": res["prediction"],
        }

    def _synthesize_response(
        self,
        query: str,
        dashboards: List[Dict[str, Any]],
        live_data: Dict[str, Any],
        prediction: Optional[Dict[str, Any]]
    ) -> str:
        """Constructs an executive, rich-markdown response grounded in live records."""
        lines = []

        # If Predictive Trigger
        if prediction:
            ptype = prediction["type"]
            if ptype == "sales_forecast":
                fc = prediction["result"]["summary"]
                lines.append(f"### 📈 Predictive Sales & Revenue Trajectory (30-Day Horizon)")
                lines.append(f"Based on the trained time-series regression model on Zenve daily metrics:")
                lines.append(f"- **Expected Revenue (p50)**: **₹{fc['projected_revenue_p50']:,.2f}**")
                lines.append(f"- **Conservative Downside (p10)**: ₹{fc['projected_revenue_p10']:,.2f}")
                lines.append(f"- **Optimistic Upside (p90)**: ₹{fc['projected_revenue_p90']:,.2f}")
                lines.append(f"- **Projected Daily Run-rate**: ₹{fc['daily_average_p50']:,.2f} / day")
                lines.append(f"\nTrack probabilistic scenarios in the [Sales Forecast]({dashboards[0]['route_hash'] if dashboards else '#revenue-sales-forecast'}) dashboard.")
                return "\n".join(lines)

            elif ptype == "churn_prediction":
                cohorts = prediction["result"]
                lines.append(f"### 🛡️ Customer Churn Radar & Next-Best-Action")
                lines.append(f"Scored against customer transaction recency and order frequency:")
                for c in cohorts[:3]:
                    lines.append(f"- **[{c['risk_tier']}] {c['customer_name']}** (Risk: {c['churn_risk_percentage']})")
                    lines.append(f"  *Decay Cause*: {c['primary_decay_cause']}")
                    lines.append(f"  *Recommended Playbook*: {c['recommended_playbook']}")
                return "\n".join(lines)

            elif ptype == "inventory_demand":
                items = prediction["result"]
                lines.append(f"### ⚠️ Imminent Inventory Exhaustion & Reorder Radar")
                for it in items[:3]:
                    lines.append(f"- **[{it['risk_level']}] {it['sku']}** ({it['name']})")
                    lines.append(f"  *Burn Rate*: {it['predicted_daily_burn_rate']} | *Runway*: {it['predicted_runway_days']}")
                    lines.append(f"  *Action*: {it['recommended_action']}")
                return "\n".join(lines)

        # Standard RAG & Live Query
        top_dash = dashboards[0] if dashboards else None
        if top_dash and top_dash["similarity_score"] > 0.15:
            lines.append(f"### 📍 Recommended Dashboard: {top_dash['title']}")
            lines.append(f"**Category**: {top_dash['category']} | **Route**: `{top_dash['route_hash']}`")
            lines.append(f"{top_dash['summary']}\n")

        # Include Live Database Metrics
        if live_data:
            lines.append("#### ⚡ Live Enterprise Telemetry Grounding:")
            if "alerts" in live_data:
                al = live_data["alerts"]
                lines.append(f"- **Active Critical Alerts**: {al['active_count']} active incidents")
                for item in al["items"][:2]:
                    lines.append(f"  • *[{item['code']}] {item['title']}*: {item['message']}")
            if "appointments" in live_data:
                ap = live_data["appointments"]
                lines.append(f"- **Clinical Appointments Today**: {ap['total_count']} scheduled slots across network")
                for it in ap["upcoming"][:2]:
                    lines.append(f"  • *{it['time']}*: {it['pet']} with {it['doctor']} ({it['service']}) — Status: **{it['status']}**")
            if "subscriptions" in live_data:
                sub = live_data["subscriptions"]
                lines.append(f"- **Active Subscribers**: {sub['total_active_subscribers']:,} pet parents on recurring care")
                lines.append(f"- **Monthly Recurring Revenue (MRR)**: ₹{sub['total_monthly_mrr']:,.2f}")
            if "sales" in live_data:
                sl = live_data["sales"]
                lines.append(f"- **Total Settled Sales**: ₹{sl['total_settled_revenue']:,.2f} across {sl['total_paid_orders']} paid orders (AOV: ₹{sl['average_order_value']:,.2f})")
            if "inventory" in live_data:
                inv = live_data["inventory"]
                lines.append(f"- **Catalog Health**: {inv['total_products']} products, {inv['total_medicines']} pharmaceuticals ({inv['low_stock_items']} items flagged at low stock)")

        # Deep-links
        if dashboards and len(dashboards) > 1:
            lines.append("\n#### 🔗 Related Dashboards:")
            for d in dashboards[1:4]:
                lines.append(f"- [{d['title']}]({d['route_hash']}) — *{d['category']}*")

        if not lines:
            lines.append("I searched the Zenve Intelligence Engine knowledge base. You can explore relevant domains in the top navigation or ask me specific questions about Sales, Alerts, Inventory, Appointments, or Subscriptions.")

        return "\n".join(lines)


_AI_BRAIN_INSTANCE: Optional[AIBrain] = None


def get_ai_brain() -> AIBrain:
    """Returns singleton instance of AIBrain."""
    global _AI_BRAIN_INSTANCE
    if _AI_BRAIN_INSTANCE is None:
        _AI_BRAIN_INSTANCE = AIBrain()
    return _AI_BRAIN_INSTANCE

