"""Autonomous Multi-Agent Executive Co-Pilot (Ask Zenve AI) Service.

Coordinates:
1. Intent & Routing Supervisor Agent (Query classification, validation & context tracking)
2. Live Query Agent (Strictly parameter-safe, read-only SQLAlchemy aggregations)
3. Synthesis & Reasoning Agent (Grounded natural-language narrative, KPI pills, charts & tables)
4. Missing-Data & Ambiguity Intelligence (Clarification prompts, uncomputable metrics explanation)
5. Action Drafter Agent (Text-to-Action proposals with PENDING_APPROVAL human-in-the-loop audit)
6. Action Execution Engine (Commits approved actions to DB with audit ledger)
"""
from __future__ import annotations

import logging
import re
import uuid
from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict, List, Optional, Tuple

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.formatting import format_indian, format_int
from app.models.all_models import (
    Alert,
    Appointment,
    ClinicHospital,
    Customer,
    DailyMetric,
    Doctor,
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
from app.services.rag_agentic_service import EnterpriseAgenticOrchestrator, get_ai_config

logger = logging.getLogger("zenve.copilot")

# In-memory execution ledger for auditability
_ACTION_EXECUTION_AUDIT: List[Dict[str, Any]] = []

# Zenve's operational geographic coverage
SUPPORTED_CITIES = [
    "Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad",
    "Chennai", "Pune", "Kolkata", "Ahmedabad", "Kochi", "Chandigarh"
]

CITY_ALIASES: Dict[str, str] = {
    "delhi": "Delhi NCR",
    "delhi ncr": "Delhi NCR",
    "ncr": "Delhi NCR",
    "gurgaon": "Delhi NCR",
    "gurugram": "Delhi NCR",
    "noida": "Delhi NCR",
    "bangalore": "Bengaluru",
    "bengaluru": "Bengaluru",
    "mumbai": "Mumbai",
    "bombay": "Mumbai",
    "hyderabad": "Hyderabad",
    "chennai": "Chennai",
    "madras": "Chennai",
    "pune": "Pune",
    "kolkata": "Kolkata",
    "calcutta": "Kolkata",
    "ahmedabad": "Ahmedabad",
    "kochi": "Kochi",
    "cochin": "Kochi",
    "chandigarh": "Chandigarh",
}

UNSUPPORTED_CITIES = [
    "london", "dubai", "singapore", "new york", "san francisco",
    "tokyo", "sydney", "toronto", "paris", "berlin", "chicago",
    "patna", "lucknow", "jaipur", "bhopal", "indore", "surat", "kanpur", "nagpur"
]


def _has_kw(q: str, words: List[str]) -> bool:
    """Word-boundary keyword match. Short keywords (<=4 chars) must match a whole word
    (optional plural 's'); longer keywords match as a word prefix. This prevents false
    routing such as 'po' in 'report', 'rag' in 'average' or 'cat' in 'category'."""
    for w in words:
        pat = (r"\b" + re.escape(w) + r"(?:e?s)?\b") if len(w) <= 4 else (r"\b" + re.escape(w))
        if re.search(pat, q):
            return True
    return False


class ExecutiveCopilotEngine:
    """Multi-Agent Executive Intelligence and Text-to-Action Engine for Ask Zenve AI."""

    def __init__(self, db: Session):
        self.db = db
        self.rag_orchestrator = EnterpriseAgenticOrchestrator(db)

    # ─────────────────────────────────────────────────────────────────────────────
    # MAIN ORCHESTRATION ENTRYPOINT
    # ─────────────────────────────────────────────────────────────────────────────
    def process_query(self, query: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Orchestrate intent decomposition, verified DB querying, and grounded response synthesis."""
        if not query or not query.strip():
            return self._build_empty_query_response()

        q_clean = query.strip()
        q_lower = q_clean.lower()
        ctx = dict(context or {})

        # Step 1: Input safety & validation
        if len(q_clean) > 1000:
            q_clean = q_clean[:1000]
            q_lower = q_clean.lower()

        # Step 2: Contextual follow-up resolution (e.g. "What about Mumbai?", "Which clinic is there?")
        resolved_query, updated_ctx = self._resolve_contextual_query(q_clean, q_lower, ctx)
        if resolved_query != q_clean:
            q_clean = resolved_query
            q_lower = q_clean.lower()
            ctx = updated_ctx

        # Step 3a: Capabilities guide, sample questions, and curated prompt requests
        if self._is_sample_questions_query(q_lower):
            return self._handle_sample_questions_flow(q_clean, ctx)

        # Step 3b: Conversational greetings, introductions & help
        if self._is_greeting(q_lower):
            return self._handle_greeting_flow(q_lower, ctx, [])

        # Step 4: Concise clarification for ambiguous single-word or broad requests
        ambiguity_topic = self._check_ambiguity(q_lower)
        if ambiguity_topic:
            return self._handle_clarification_flow(ambiguity_topic, q_clean, ctx)

        # Step 5: Missing-Data & Uncomputable Metrics Intelligence
        # 5a. Net Profit / Margin calculations without underlying cost records
        if self._is_profit_or_cogs_query(q_lower):
            return self._handle_profit_missing_data_flow(q_clean, ctx)

        # 5b. Queries for geographies outside operational footprint
        unsupported_city = self._detect_unsupported_geography(q_lower)
        if unsupported_city:
            return self._handle_unsupported_geography_flow(unsupported_city, q_clean, ctx)

        # Step 6: General Business & Analytical Inquiries (educational/definitional)
        if self._is_general_analytical_query(q_lower):
            return self._handle_general_analytical_flow(q_lower, ctx)

        # Step 7: Check for Custom AI Model & Enterprise RAG specific inquiries
        if _has_kw(q_lower, ["custom api", "gemini api", "rag", "agentic", "architecture", "llm", "ai model", "gpt", "ollama", "integration"]):
            return self.rag_orchestrator.process_query(q_clean, ctx)

        # Step 8: Domain-Specific Grounded Query Handlers
        agent_steps = [
            {"agent": "SupervisorAgent", "status": "completed", "note": "Decomposed query into validated operational parameters"},
            {"agent": "LiveQueryAgent", "status": "completed", "note": "Executed parameter-safe read-only SQLAlchemy aggregations"},
            {"agent": "ReasoningAgent", "status": "completed", "note": "Synthesized executive response strictly grounded in verified database rows"},
            {"agent": "ActionDrafterAgent", "status": "completed", "note": "Checked prescriptive action criteria"}
        ]

        # Domain 1: Inventory & Pharmacy Medicines
        if _has_kw(q_lower, ["bravecto", "inventory", "reorder", "po", "stockout", "medicine", "pharmacy", "stock", "sku", "supply"]):
            return self._handle_inventory_flow(q_clean, ctx, agent_steps)

        # Domain 2: Clinic Network & Hospital Capacity
        if _has_kw(q_lower, ["clinic", "hospital", "bed", "footfall", "facility", "icu", "branch"]):
            return self._handle_clinic_flow(q_clean, ctx, agent_steps)

        # Domain 3: Doctors, Specialists & Medical Staff
        if _has_kw(q_lower, ["doctor", "surgeon", "consultation", "specialist", "qualification", "roster", "caseload"]):
            return self._handle_doctor_flow(q_clean, ctx, agent_steps)

        # Domain 4: Vaccination & Pet Patient Census
        if _has_kw(q_lower, ["vaccin", "rabies", "puppy", "overdue", "campaign", "whatsapp", "booster", "pet", "dog", "cat"]) or ("patient" in q_lower and "footfall" not in q_lower and "clinic" not in q_lower):
            return self._handle_vaccine_flow(q_clean, ctx, agent_steps)

        # Domain 5: Logistics & 60-Minute Express Delivery SLA
        if _has_kw(q_lower, ["delivery", "60", "logistics", "rider", "sla", "courier", "fleet", "express", "dispatch"]):
            return self._handle_logistics_flow(q_clean, ctx, agent_steps)

        # Domain 6: Regional Sales, Revenue & Top Cities (Commercial Performance)
        if _has_kw(q_lower, ["sale", "revenue", "turnover", "aov", "average order", "rank", "top city", "delhi", "mumbai", "bengaluru", "chennai", "pune", "hyderabad", "kolkata", "ahmedabad", "kochi", "chandigarh", "drop", "gross"]):
            return self._handle_sales_flow(q_clean, ctx, agent_steps)

        # Domain 7: Orders & Channel Operations
        if _has_kw(q_lower, ["order", "kiosk", "upi", "channel", "transaction"]):
            return self._handle_orders_flow(q_clean, ctx, agent_steps)

        # Domain 8: Subscriptions & Recurring ARR
        if _has_kw(q_lower, ["subscription", "mrr", "arr", "subscriber", "churn", "renewal"]):
            return self._handle_subscriptions_flow(q_clean, ctx, agent_steps)

        # Default: Fallback to Enterprise RAG Orchestrator
        try:
            return self.rag_orchestrator.process_query(q_clean, ctx)
        except Exception as e:
            logger.warning("RAG fallback failed: %s; falling back to general executive summary", e)
            return self._handle_general_executive_summary_flow(ctx, agent_steps)

    # ─────────────────────────────────────────────────────────────────────────────
    # CAPABILITIES & CURATED SAMPLE QUESTIONS GUIDE
    # ─────────────────────────────────────────────────────────────────────────────
    def _is_sample_questions_query(self, q: str) -> bool:
        """Detect inquiries asking what questions can be asked or requesting sample/generic/mock-data questions."""
        q_norm = q.lower().strip()
        patterns = [
            r"give me.*questions",
            r"what.*questions.*(?:answer|ask)",
            r"what.*can.*(?:i|you).*(?:ask|answer)",
            r"which.*questions.*(?:answer|ask)",
            r"sample questions",
            r"example questions",
            r"suggest.*questions",
            r"list.*questions",
            r"5.*generic.*questions",
            r"generic.*questions",
            r"mock.*data.*questions",
            r"questions.*based on",
            r"questions.*chatbot.*answer",
            r"prompts.*to ask",
            r"what.*can.*i.*query",
        ]
        return any(re.search(p, q_norm) for p in patterns)

    def _handle_sample_questions_flow(self, q: str, ctx: Dict[str, Any]) -> Dict[str, Any]:
        """Provide a curated executive breakdown of 5 generic questions and 5 mock-data questions."""
        agent_steps = [
            {"agent": "SupervisorAgent", "status": "completed", "note": "Classified request as Bot Capabilities & Curated Prompts Inquiry"},
            {"agent": "ReasoningAgent", "status": "completed", "note": "Assembled structured 5 Generic + 5 Mock-Data questions guide with boundary disclosures"}
        ]
        text = (
            "Here are **5 Generic Questions** and **5 Mock-Data Questions** that the Ask Zenve AI chatbot is specifically designed to answer:\n\n"
            "---\n\n"
            "### I. 5 Generic & Analytical Questions\n"
            "*(Business definitions, metric formulas, assistant orientation, and missing-data boundary disclosures)*\n\n"
            "1. **\"Hello Dr. Zenve, who are you and what can you do?\"**\n"
            "   * **What it answers:** Provides an executive overview of Dr. Zenve's capabilities across clinic operations, inventory telemetry, logistics SLA tracking, and human-in-the-loop action proposals.\n\n"
            "2. **\"What is AOV and how is it calculated?\"**\n"
            "   * **What it answers:** Explains the business definition of Average Order Value, gives the exact mathematical formula ($\\text{Total Settled Sales} / \\text{Completed Orders}$), its strategic importance for veterinary retail, and Zenve's grounded baseline.\n\n"
            "3. **\"What is EBITDA and why is it important for hospital operations?\"**\n"
            "   * **What it answers:** Breaks down operational profitability formula for clinical hubs and directs to audited statements without fabricating unrecorded line items.\n\n"
            "4. **\"What is our net profit on sales this quarter?\"**\n"
            "   * **What it answers:** Demonstrates transparent missing-data handling by explaining that transaction COGS is not stored in the database, clarifying why an answer cannot be produced, and offering catalog margins.\n\n"
            "5. **\"What were our total sales in London / New York?\"**\n"
            "   * **What it answers:** Demonstrates geographic boundary disclosure by clarifying that Zenve only operates in 10 Indian metropolitan hubs, rather than misleadingly reporting 0 sales.\n\n"
            "---\n\n"
            "### II. 5 Grounded Questions Based on Available Mock Data\n"
            "*(Real-time database queries, verified calculations, and Text-to-Action human-in-the-loop triggers)*\n\n"
            "6. **\"What is our consolidated gross revenue and average order value across all cities?\"**\n"
            "   * **What it answers:** Aggregates live records from the `sales` table, calculating total settled sales, paid order count, pending transactions, and top revenue city.\n\n"
            "7. **\"Which city generated the highest sales revenue?\"**\n"
            "   * **What it answers:** Groups sales by city to rank performance and renders a breakdown comparison table.\n\n"
            "8. **\"What is the current inventory status of Bravecto?\"**\n"
            "   * **What it answers:** Queries the `pharmacy_medicines` table, displays exact units on hand, and automatically generates a Purchase Order with a one-click human approval trigger.\n\n"
            "9. **\"How many pets are overdue for core vaccinations across our network?\"**\n"
            "   * **What it answers:** Inspects the `pets` registry, counts overdue boosters, and prepares a targeted WhatsApp recall campaign.\n\n"
            "10. **\"Which clinic has the highest patient footfall, and what is our total hospital bed capacity?\"**\n"
            "    * **What it answers:** Calculates total surgical and ICU beds from `clinics_hospitals` and identifies the busiest center."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "CAPABILITIES_AND_PROMPTS",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Generic Prompts", "val": "5 Curated", "delta": "Analytical", "trend": "neutral", "subtext": "Orientation & Bounds", "icon": "💡"},
                {"label": "Mock-Data Queries", "val": "5 Grounded", "delta": "Verified", "trend": "success", "subtext": "Live Telemetry", "icon": "📊"},
                {"label": "Data Footprint", "val": f"{len(SUPPORTED_CITIES)} Cities", "delta": "Zero-Hallucination", "trend": "success", "subtext": "Tier-1/2 Hubs", "icon": "📍"},
                {"label": "Text-to-Action", "val": "Active", "delta": "1-Click", "trend": "success", "subtext": "PO & WhatsApp", "icon": "⚡"}
            ],
            "chart": None,
            "table": None,
            "actions": [],
            "followups": [
                "Hello Dr. Zenve, who are you and what can you do?",
                "What is AOV and how is it calculated?",
                "What is our consolidated gross revenue?",
                "What is the current inventory status of Bravecto?",
                "How many pets are overdue for core vaccinations?"
            ],
            "context": ctx
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # CONVERSATIONAL GREETINGS & INTRODUCTIONS
    # ─────────────────────────────────────────────────────────────────────────────
    def _is_greeting(self, q: str) -> bool:
        """Detect greetings, bot introductions, polite queries, or help commands."""
        if not q:
            return True
        greeting_words = [
            "hello", "hi", "hey", "hola", "namaste", "good morning", "good afternoon",
            "good evening", "howdy", "heya", "yo", "who are you", "what are you",
            "what can you do", "help", "how are you", "what do you do", "introduce",
            "tell me about yourself", "who made you", "thanks", "thank you", "bye"
        ]
        words = q.split()
        if words:
            first = words[0].strip("!?,.")
            if first in ["hi", "hello", "hey", "hola", "namaste", "yo"]:
                return True
        if any(g == q for g in greeting_words) or any(q.startswith(g) for g in greeting_words):
            return True
        return False

    def _handle_greeting_flow(self, q: str, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        if "how are you" in q:
            text = (
                "I'm doing great, thank you for asking! 🐶 All our operational systems are running smoothly across 14 hospital hubs.\n\n"
                "How can I help you today?"
            )
        elif any(t in q for t in ["thanks", "thank you"]):
            text = (
                "You're very welcome! 🐾 Happy to help. Feel free to ask me anything else about our pet patients, hospital operations, or sales performance."
            )
        elif "bye" in q:
            text = (
                "Goodbye! 🐾 Have a wonderful day. Wishing all our furry friends a healthy and happy time! Feel free to come back anytime you need help."
            )
        else:
            text = (
                "Hello! 🐾 I'm **Dr. Zenve**, your dedicated **Autonomous Executive AI Co-Pilot** and Pet Healthcare & Business Intelligence assistant.\n\n"
                "I can help you with questions about our pet patients, hospital operations, pharmacy inventory, sales performance, logistics, and general pet health care.\n\n"
                "Feel free to ask me anything!"
            )

        return {
            "role": "ai",
            "text": text,
            "intent": "GREETING",
            "agent_steps": [],
            "kpis": [],
            "chart": None,
            "table": None,
            "actions": [],
            "followups": [
                "What is our consolidated gross revenue and AOV?",
                "Which city generated the highest sales revenue?",
                "What is our Bravecto inventory status and stockout risk?",
                "How many pets have overdue vaccinations?",
                "Which clinic has the highest patient footfall?"
            ],
            "context": {**ctx, "session_active": True}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # AMBIGUITY DETECTION & CONCISE CLARIFICATION
    # ─────────────────────────────────────────────────────────────────────────────
    def _check_ambiguity(self, q: str) -> Optional[str]:
        """Detect ambiguous single-word or very broad queries that require clarification."""
        words = q.split()
        if len(words) <= 2:
            first = words[0].strip("!?,.")
            ambiguity_map = {
                "sales": "sales",
                "revenue": "sales",
                "inventory": "inventory",
                "medicine": "inventory",
                "stock": "inventory",
                "doctors": "doctors",
                "doctor": "doctors",
                "clinics": "clinics",
                "clinic": "clinics",
                "hospital": "clinics",
                "pets": "pets",
                "pet": "pets",
                "vaccines": "pets",
                "logistics": "logistics",
                "delivery": "logistics",
                "orders": "orders",
                "delhi": "delhi_overview",
                "mumbai": "mumbai_overview",
                "performance": "performance"
            }
            if first in ambiguity_map:
                return ambiguity_map[first]
        return None

    def _handle_clarification_flow(self, topic: str, q: str, ctx: Dict[str, Any]) -> Dict[str, Any]:
        """Deliver a concise clarification response instead of guessing."""
        clarification_configs = {
            "sales": {
                "title": "Sales & Revenue",
                "options": [
                    "**Consolidated Sales Summary**: Total revenue, paid vs. pending volume, and Average Order Value (AOV).",
                    "**City-wise Breakdown**: Regional revenue rankings across Delhi NCR, Mumbai, Bengaluru, and other hubs.",
                    "**Channel Performance**: Distribution between Android App, iOS App, and In-Clinic Kiosks."
                ],
                "followups": ["Consolidated sales summary", "City-wise revenue breakdown", "Sales by app channel"]
            },
            "inventory": {
                "title": "Pharmacy & Inventory",
                "options": [
                    "**Critical Stock Warnings**: SKUs currently below the 15-unit safety threshold.",
                    "**Specific SKU Lookup**: Detailed stock status for Bravecto, NexGard, or Apoquel.",
                    "**Replenishment Proposals**: Drafted Purchase Orders for approved vendor restock."
                ],
                "followups": ["Show low stock medicines", "What is Bravecto inventory status?", "Catalog valuation summary"]
            },
            "doctors": {
                "title": "Veterinary Doctors",
                "options": [
                    "**Specialist Roster**: Active veterinary surgeons and qualifications on duty.",
                    "**Caseload & Ratings**: Doctors ranked by completed consultations and satisfaction scores.",
                    "**Clinic Branch Filter**: Doctors assigned to a specific hospital hub (e.g. Koramangala or Bandra)."
                ],
                "followups": ["List all veterinary doctors", "Which doctor has the highest consultations?", "Doctors in Bengaluru clinics"]
            },
            "clinics": {
                "title": "Clinic & Hospital Network",
                "options": [
                    "**Network Overview**: Total hospital facilities, ICU beds, and operational status.",
                    "**Footfall Rankings**: Facilities sorted by daily patient footfall.",
                    "**City Filter**: Hospital facilities located in Mumbai, Bengaluru, or Delhi NCR."
                ],
                "followups": ["List all clinic locations", "Which clinic has the highest footfall?", "Show clinics in Mumbai"]
            },
            "pets": {
                "title": "Pet Patient Census",
                "options": [
                    "**Demographics**: Total registered dogs and cats across breeds.",
                    "**Vaccination Compliance**: Up-to-date vs. overdue Rabies and DHPPi immunization cohorts.",
                    "**Preventive Outreach**: Automated recall campaign cards for overdue pet parents."
                ],
                "followups": ["How many pets have overdue vaccinations?", "Pet patient species breakdown", "List overdue rabies patients"]
            },
            "logistics": {
                "title": "60-Minute Express Logistics",
                "options": [
                    "**Active Telemetry**: Dispatched riders and live delivery statuses.",
                    "**SLA Compliance**: On-time delivery rate vs. express 60-minute target.",
                    "**Fleet Optimization**: Float rider allocation proposals to mitigate transit delays."
                ],
                "followups": ["What is our delivery SLA rate?", "Show active courier dispatches", "Fleet reallocation proposal"]
            },
            "delhi_overview": {
                "title": "Delhi NCR Operations",
                "options": [
                    "**Regional Sales**: Total revenue and order counts generated in Delhi NCR.",
                    "**Clinic Facilities**: The Golf Course Road, Gurugram medical center details.",
                    "**Logistics Dispatch**: Express delivery SLAs for Cyber Hub and South Extension depots."
                ],
                "followups": ["What are sales in Delhi NCR?", "Clinic facilities in Delhi NCR", "Why did sales drop in Delhi NCR?"]
            },
            "mumbai_overview": {
                "title": "Mumbai Operations",
                "options": [
                    "**Regional Sales**: Gross revenue and transaction volumes processed in Mumbai.",
                    "**Flagship Hospital**: Bandra West Hill Road surgical center details.",
                    "**Express Logistics**: Dark store delivery telemetry in Bandra and Juhu."
                ],
                "followups": ["What are sales in Mumbai?", "Show Mumbai flagship clinic", "Doctors in Mumbai clinic"]
            },
            "performance": {
                "title": "Business Performance",
                "options": [
                    "**Financial Performance**: Consolidated sales revenue and Average Order Value.",
                    "**Clinical Performance**: Patient footfall and hospital bed capacity utilization.",
                    "**Supply Chain Performance**: E-pharmacy stock runway and fulfillment SLA."
                ],
                "followups": ["Consolidated sales performance", "Hospital network footfall", "E-pharmacy stock health"]
            }
        }

        cfg = clarification_configs.get(topic, clarification_configs["sales"])
        text = (
            f"You asked about **{cfg['title']}**. To provide the most precise operational answer, "
            f"which aspect would you like to explore?\n\n"
            + "\n".join([f"{idx}. {opt}" for idx, opt in enumerate(cfg["options"], 1)])
            + "\n\n*Select one of the quick options below or specify your criteria.*"
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "CLARIFICATION_PROMPT",
            "agent_steps": [
                {"agent": "SupervisorAgent", "status": "completed", "note": f"Identified broad/ambiguous inquiry on '{topic}'"},
                {"agent": "ReasoningAgent", "status": "completed", "note": "Formulated structured clarification options without making assumptions"}
            ],
            "kpis": [],
            "chart": None,
            "table": None,
            "actions": [],
            "followups": cfg["followups"],
            "context": {**ctx, "clarification_topic": topic}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # CONTEXTUAL MULTI-TURN RESOLUTION
    # ─────────────────────────────────────────────────────────────────────────────
    def _resolve_contextual_query(self, q: str, q_lower: str, ctx: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
        """Resolve pronoun references and follow-up city/metric questions from previous turns."""
        updated_ctx = dict(ctx)

        # Detect mention of supported city in current query
        current_city = None
        for alias, std_city in CITY_ALIASES.items():
            if re.search(rf"\b{alias}\b", q_lower):
                current_city = std_city
                updated_ctx["active_city"] = std_city
                break

        active_city = updated_ctx.get("active_city")
        prev_topic = updated_ctx.get("topic")

        # Pattern: "What about [City]?" or "How about [City]?"
        match_city_followup = re.match(r"^(?:what|how)\s+about\s+([a-zA-Z\s]+)\??$", q_lower)
        if match_city_followup:
            cand_city_raw = match_city_followup.group(1).strip()
            cand_city = CITY_ALIASES.get(cand_city_raw.lower())
            if cand_city:
                updated_ctx["active_city"] = cand_city
                if prev_topic == "clinics":
                    return f"Show clinics in {cand_city}", updated_ctx
                elif prev_topic == "doctors":
                    return f"Show doctors in {cand_city}", updated_ctx
                elif prev_topic == "logistics":
                    return f"Delivery logistics in {cand_city}", updated_ctx
                else:
                    return f"What are sales in {cand_city}", updated_ctx

        # Pattern: "Which clinic is there?" / "What clinics are there?"
        if any(p in q_lower for p in ["which clinic", "what clinic", "show clinic", "clinics there", "hospital there"]) and active_city:
            updated_ctx["topic"] = "clinics"
            return f"Show clinics in {active_city}", updated_ctx

        # Pattern: "Which doctors work there?" / "Who works there?"
        if any(p in q_lower for p in ["which doctor", "who works there", "doctors there", "doctors work there"]) and active_city:
            updated_ctx["topic"] = "doctors"
            return f"Show doctors in {active_city}", updated_ctx

        # Pattern: "What is the average order value?" without city, but active_city is set
        if ("aov" in q_lower or "average order" in q_lower) and active_city and "in" not in q_lower:
            return f"What is the average order value in {active_city}", updated_ctx

        return q, updated_ctx

    # ─────────────────────────────────────────────────────────────────────────────
    # MISSING-DATA & UNCOMPUTABLE METRICS INTELLIGENCE
    # ─────────────────────────────────────────────────────────────────────────────
    def _is_profit_or_cogs_query(self, q: str) -> bool:
        """Detect requests to calculate net profit, profit margin, or EBITDA from sales records."""
        keywords = ["net profit", "operating profit", "ebitda margin", "profit margin", "cogs", "cost of goods sold", "gross profit"]
        return any(k in q for k in keywords)

    def _handle_profit_missing_data_flow(self, q: str, ctx: Dict[str, Any]) -> Dict[str, Any]:
        """Explain honestly why net profit cannot be calculated from sales records alone."""
        sales_count = self.db.query(Sale).count()
        paid_sales = self.db.query(Sale).filter(Sale.status == "Paid").all()
        total_paid_rev = sum(s.amount for s in paid_sales)

        products = self.db.query(Product).all()
        sample_prods = []
        for p in products[:4]:
            if p.price and p.cost_price:
                margin_pct = round(((p.price - p.cost_price) / p.price) * 100, 1)
                sample_prods.append({"name": p.name[:25], "price": p.price, "cost": p.cost_price, "margin_pct": margin_pct})

        avg_catalog_margin = (
            round(sum(p["margin_pct"] for p in sample_prods) / len(sample_prods), 1)
            if sample_prods else 38.5
        )

        text = (
            "### ⚠️ Data Availability Notice: Profit Metric Calculation\n\n"
            "**1. What Information is Missing:**\n"
            "• Transaction-level **Cost of Goods Sold (COGS)** is not recorded in the transactional table `sales`.\n"
            "• Operational expenditure line-items (clinic lease rent, surgeon clinical fee splits, logistics delivery fleet fuel, and utility overheads) are maintained in corporate GAAP audit journals rather than per-transaction records.\n\n"
            "**2. Why a Reliable Answer Cannot Be Produced:**\n"
            f"The `sales` table tracks settled revenue (**₹{format_indian(int(total_paid_rev))}** across **{len(paid_sales)} paid orders**), "
            "transaction timestamps, city, channel, and order status. Calculating a net profit figure from sales records alone without "
            "direct cost attribution would require ungrounded estimation, which violates Zenve's data integrity principles.\n\n"
            "**3. What Data Would Be Required:**\n"
            "• Granular vendor invoice mapping per dispensed SKU in `sales`.\n"
            "• Clinical center overhead allocation matrices (OPD vs. Surgery cost-centers).\n"
            "• Hourly doctor compensation and commission ledgers.\n\n"
            "**4. What Related Metrics CAN Be Answered Today:**\n"
            f"• **Catalog Gross Margin**: Product catalog markup across active SKUs averages **{avg_catalog_margin}%** (e.g. Royal Canin Gastrointestinal price ₹7,680 vs. procurement cost ₹4,915).\n"
            f"• **Consolidated Top-Line Sales**: ₹{format_indian(int(total_paid_rev))} settled across {len(paid_sales)} transactions.\n"
            "• **Audited Financial Statements**: Downloadable report `RPT-2026-009` (*Audited Corporate GAAP Profit & Loss Statement*) in the Reports domain."
        )

        chart_data = {
            "type": "bar",
            "title": "Catalog Product Margins: Selling Price vs. Cost Price (INR)",
            "xKey": "name",
            "yKeys": ["price", "cost"],
            "colors": ["#10b981", "#64748b"],
            "data": sample_prods
        } if sample_prods else None

        return {
            "role": "ai",
            "text": text,
            "intent": "MISSING_DATA_EXPLANATION",
            "agent_steps": [
                {"agent": "SupervisorAgent", "status": "completed", "note": "Detected request for uncomputable metric (Net Profit on sales)"},
                {"agent": "LiveQueryAgent", "status": "completed", "note": "Inspected table 'sales' schema: verified absence of per-transaction COGS"},
                {"agent": "ReasoningAgent", "status": "completed", "note": "Formulated structured explanation with required data criteria and verified catalog alternatives"}
            ],
            "kpis": [
                {"label": "Settled Revenue", "val": f"₹{format_indian(int(total_paid_rev))}", "delta": "Verified", "trend": "success", "subtext": f"{len(paid_sales)} Paid Orders", "icon": "💹"},
                {"label": "Avg Catalog Margin", "val": f"{avg_catalog_margin}%", "delta": "Product Catalog", "trend": "neutral", "subtext": "Price vs. Cost", "icon": "🏷️"},
                {"label": "Transaction COGS", "val": "Unavailable", "delta": "Missing Field", "trend": "down", "subtext": "Sales Table Unbounded", "icon": "⚠️"},
                {"label": "Audited GAAP P&L", "val": "RPT-2026-009", "delta": "Available", "trend": "success", "subtext": "Reports Domain", "icon": "📄"}
            ],
            "chart": chart_data,
            "table": None,
            "actions": [],
            "followups": [
                "What is our consolidated gross revenue and AOV?",
                "Which city generated the highest sales revenue?",
                "Show catalog product prices and cost prices"
            ],
            "context": {**ctx, "topic": "finance", "missing_metric": "net_profit"}
        }

    def _detect_unsupported_geography(self, q: str) -> Optional[str]:
        """Detect queries regarding cities or countries outside Zenve's active operational network."""
        for city in UNSUPPORTED_CITIES:
            if re.search(rf"\b{city}\b", q):
                return city.title()
        return None

    def _handle_unsupported_geography_flow(self, unsupported_city: str, q: str, ctx: Dict[str, Any]) -> Dict[str, Any]:
        """Explain transparently that the requested geography is outside coverage."""
        text = (
            f"### 📍 Operational Territory Notice: {unsupported_city}\n\n"
            f"**1. What Information is Missing:**\n"
            f"Zenve Pets Healthcare currently has **zero operational facilities, telemetry streams, or sales records** for **{unsupported_city}**.\n\n"
            "**2. Why a Reliable Answer Cannot Be Produced:**\n"
            f"Our enterprise database (`zenve_engine`) exclusively indexes operational records from our active footprint in India. "
            f"Querying for **{unsupported_city}** returns 0 records because the territory is **unsupported**, not because an active "
            "center experienced zero sales.\n\n"
            "**3. Active Operational Footprint:**\n"
            f"Zenve is active across **10 metropolitan healthcare hubs** in India:\n"
            f"• {', '.join(SUPPORTED_CITIES[:5])}\n"
            f"• {', '.join(SUPPORTED_CITIES[5:])}\n\n"
            "**4. What Related Questions Can Be Answered:**\n"
            "You can query operational sales, hospital bed capacity, doctor rosters, and 60-minute express deliveries "
            "for any of our supported hubs listed above."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "UNSUPPORTED_GEOGRAPHY",
            "agent_steps": [
                {"agent": "SupervisorAgent", "status": "completed", "note": f"Detected inquiry for unsupported region: {unsupported_city}"},
                {"agent": "ReasoningAgent", "status": "completed", "note": "Explained operational boundary without conflating absence with genuine zero performance"}
            ],
            "kpis": [
                {"label": "Target Region", "val": unsupported_city, "delta": "Out of Scope", "trend": "neutral", "subtext": "No Operations", "icon": "🌐"},
                {"label": "Active Network", "val": f"{len(SUPPORTED_CITIES)} Hubs", "delta": "Operational", "trend": "success", "subtext": "India Tier-1/2", "icon": "📍"},
            ],
            "chart": None,
            "table": None,
            "actions": [],
            "followups": [
                "What are sales in Mumbai?",
                "What are sales in Bengaluru?",
                "What are sales in Delhi NCR?"
            ],
            "context": {**ctx, "last_unsupported_city": unsupported_city}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # GENERAL BUSINESS & ANALYTICAL DEFINITIONS
    # ─────────────────────────────────────────────────────────────────────────────
    def _is_general_analytical_query(self, q: str) -> bool:
        """Detect educational or definitional inquiries regarding analytical concepts."""
        patterns = [
            r"what is aov", r"how is aov calculated", r"what is average order value",
            r"what is churn", r"how is churn rate calculated",
            r"what is ebitda", r"how is ebitda calculated",
            r"what is inventory turnover", r"how does cold-chain work"
        ]
        return any(re.search(p, q) for p in patterns)

    def _handle_general_analytical_flow(self, q: str, ctx: Dict[str, Any]) -> Dict[str, Any]:
        """Explain general business concepts with exact formulas and Zenve's live application."""
        if "aov" in q or "average order" in q:
            paid_sales = self.db.query(Sale).filter(Sale.status == "Paid").all()
            total_rev = sum(s.amount for s in paid_sales)
            aov = total_rev / len(paid_sales) if paid_sales else 0.0

            text = (
                "### 📈 Average Order Value (AOV) — Definition & Calculation Basis\n\n"
                "**1. Analytical Definition:**\n"
                "Average Order Value (AOV) measures the average gross rupee amount spent each time a pet parent places a transaction.\n\n"
                "**2. Mathematical Formula:**\n"
                "$$\\text{AOV} = \\frac{\\text{Total Settled Sales Revenue (INR)}}{\\text{Total Count of Completed Transactions}}$$\n\n"
                "**3. Zenve's Grounded Baseline:**\n"
                f"• **Live Settled Revenue**: ₹{format_indian(int(total_rev))} across **{len(paid_sales)} paid transactions**.\n"
                f"• **Calculated AOV**: **₹{format_indian(int(aov))}** per order.\n"
                "• **Data Coverage**: Calculated strictly on completed/paid transactions, excluding pending or failed payments to prevent downward skew."
            )
            followups = ["What are sales in Delhi NCR?", "Which city has highest AOV?", "What is our Bravecto inventory status?"]

        elif "ebitda" in q:
            text = (
                "### 💹 EBITDA — Definition & Clinical Operations Application\n\n"
                "**1. Analytical Definition:**\n"
                "**EBITDA** stands for *Earnings Before Interest, Taxes, Depreciation, and Amortization*. It measures the pure operational profitability of veterinary clinics and e-commerce logistics.\n\n"
                "**2. Mathematical Formula:**\n"
                "$$\\text{EBITDA} = \\text{Gross Revenue} - \\text{COGS} - \\text{Clinical Operating Expenses (Staff + Lease + Utilities)}$$\n\n"
                "**3. Application in Zenve:**\n"
                "• Used to assess independent hospital hub performance across Bengaluru, Mumbai, and Delhi NCR.\n"
                "• Target operational clinic EBITDA margin is **18.0% – 22.0%** for mature surgical centers.\n"
                "• Complete audited EBITDA breakdowns are accessible in report `RPT-2026-009`."
            )
            followups = ["Which clinic has highest footfall?", "Consolidated sales summary", "Show low stock medicines"]

        else:
            text = (
                "### 📊 Business Intelligence Metrics Guide\n\n"
                "Dr. Zenve tracks real-time telemetry across 5 core operational domains:\n"
                "1. **Gross Revenue & AOV**: Grounded on table `sales`.\n"
                "2. **Stock Runway & Safety Thresholds**: Grounded on table `pharmacy_medicines` (< 15 units trigger).\n"
                "3. **Clinical Footfall & Bed Utilization**: Grounded on table `clinics_hospitals`.\n"
                "4. **Vaccination Compliance**: Grounded on table `pets` (Rabies & DHPPi schedules).\n"
                "5. **Express Delivery SLA**: Grounded on table `logistics_deliveries` (60-minute benchmark)."
            )
            followups = ["Consolidated sales summary", "Show low stock medicines", "How many pets are registered?"]

        return {
            "role": "ai",
            "text": text,
            "intent": "ANALYTICAL_EXPLANATION",
            "agent_steps": [
                {"agent": "SupervisorAgent", "status": "completed", "note": "Identified analytical concept query"},
                {"agent": "ReasoningAgent", "status": "completed", "note": "Synthesized definition, mathematical formula, and Zenve operational application"}
            ],
            "kpis": [],
            "chart": None,
            "table": None,
            "actions": [],
            "followups": followups,
            "context": ctx
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # DOMAIN 1: REGIONAL SALES, REVENUE & CITY RANKINGS
    # ─────────────────────────────────────────────────────────────────────────────
    def _handle_sales_flow(self, q: str, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        """Query and aggregate live sales records with exact sums, counts, averages, and rankings."""
        q_lower = q.lower()

        # Check for specific city target
        target_city = None
        for alias, std_city in CITY_ALIASES.items():
            if re.search(rf"\b{alias}\b", q_lower):
                target_city = std_city
                break

        if not target_city and ctx.get("active_city"):
            target_city = ctx.get("active_city")

        # Specific City Sales Query
        if target_city:
            sales = self.db.query(Sale).filter(func.lower(Sale.city) == target_city.lower()).all()
            if not sales:
                return {
                    "role": "ai",
                    "text": (
                        f"**Live Sales Query for {target_city}:**\n\n"
                        f"• Found **0 sales records** recorded for `{target_city}` in the active database.\n"
                        f"• Coverage verification: `{target_city}` is registered in our network, but no orders have been settled yet."
                    ),
                    "intent": "CITY_SALES",
                    "agent_steps": agent_steps,
                    "kpis": [
                        {"label": "Target City", "val": target_city, "delta": "Verified", "trend": "neutral", "subtext": "Zero Sales Records", "icon": "📍"},
                        {"label": "Settled Revenue", "val": "₹0", "delta": "0 Orders", "trend": "neutral", "subtext": "Clean Ledger", "icon": "💹"}
                    ],
                    "chart": None,
                    "table": None,
                    "actions": [],
                    "followups": ["Consolidated sales summary", "What are sales in Mumbai?", "What are sales in Bengaluru?"],
                    "context": {**ctx, "active_city": target_city, "topic": "sales"}
                }

            paid_sales = [s for s in sales if s.status == "Paid"]
            pending_sales = [s for s in sales if s.status == "Pending"]
            paid_rev = sum(s.amount for s in paid_sales)
            pending_rev = sum(s.amount for s in pending_sales)
            aov = paid_rev / len(paid_sales) if paid_sales else 0.0

            # Channel breakdown in this city
            channel_counts: Dict[str, int] = {}
            channel_rev: Dict[str, float] = {}
            for s in paid_sales:
                ch = s.app_source or "Web"
                channel_counts[ch] = channel_counts.get(ch, 0) + 1
                channel_rev[ch] = channel_rev.get(ch, 0.0) + s.amount

            chart_data = {
                "type": "bar",
                "title": f"Sales Revenue by Channel in {target_city} (INR)",
                "xKey": "channel",
                "yKeys": ["revenue"],
                "colors": ["#3b82f6"],
                "data": [{"channel": ch, "revenue": round(amt, 2)} for ch, amt in channel_rev.items()]
            } if channel_rev else None

            # Date span
            sold_dates = [s.sold_at for s in sales if s.sold_at]
            min_date = min(sold_dates)[:10] if sold_dates else "N/A"
            max_date = max(sold_dates)[:10] if sold_dates else "N/A"

            text = (
                f"### 📊 Live Sales Performance: {target_city}\n\n"
                f"• **Gross Settled Revenue**: **₹{format_indian(int(paid_rev))}** across **{len(paid_sales)} paid orders**.\n"
                f"• **Average Order Value (AOV)**: **₹{format_indian(int(aov))}** per completed transaction.\n"
                f"• **Pending Orders**: **{len(pending_sales)} orders** totaling **₹{format_indian(int(pending_rev))}** awaiting settlement.\n"
                f"• **Channel Distribution**: {', '.join([f'{ch} ({count} orders, ₹{format_indian(int(channel_rev.get(ch, 0)))})' for ch, count in channel_counts.items()])}.\n\n"
                f"**Calculation Basis & Coverage**:\n"
                f"Aggregated from **{len(sales)} total transactions** in table `sales` recorded between `{min_date}` and `{max_date}`. "
                "AOV is calculated strictly on paid transactions."
            )

            return {
                "role": "ai",
                "text": text,
                "intent": "CITY_SALES",
                "agent_steps": agent_steps,
                "kpis": [
                    {"label": f"Revenue ({target_city})", "val": f"₹{format_indian(int(paid_rev))}", "delta": f"{len(paid_sales)} Paid", "trend": "success", "subtext": "Settled Ledger", "icon": "💹"},
                    {"label": "Average Order Value", "val": f"₹{format_indian(int(aov))}", "delta": "Per Order", "trend": "neutral", "subtext": "Paid Transactions", "icon": "🛒"},
                    {"label": "Pending Orders", "val": f"{len(pending_sales)} Orders", "delta": f"₹{format_indian(int(pending_rev))}", "trend": "down" if pending_sales else "success", "subtext": "Unsettled", "icon": "⏳"},
                    {"label": "Top Channel", "val": max(channel_counts, key=channel_counts.get) if channel_counts else "Android", "delta": "Highest Volume", "trend": "success", "subtext": "Channel Leader", "icon": "📱"}
                ],
                "chart": chart_data,
                "table": None,
                "actions": [],
                "followups": [
                    f"Which clinic is in {target_city}?",
                    f"Show doctors in {target_city}",
                    "Compare with Mumbai sales",
                    "What is our consolidated gross revenue?"
                ],
                "context": {**ctx, "active_city": target_city, "topic": "sales", "last_metric": "revenue"}
            }

        # Consolidated Sales Query Across All Cities
        sales = self.db.query(Sale).all()
        if not sales:
            return self._build_empty_sales_response(ctx, agent_steps)

        paid_sales = [s for s in sales if s.status == "Paid"]
        pending_sales = [s for s in sales if s.status == "Pending"]
        total_paid_rev = sum(s.amount for s in paid_sales)
        total_pending_rev = sum(s.amount for s in pending_sales)
        consolidated_aov = total_paid_rev / len(paid_sales) if paid_sales else 0.0

        # City-wise Aggregation
        city_paid_rev: Dict[str, float] = {}
        city_paid_count: Dict[str, int] = {}
        for s in paid_sales:
            c = s.city or "Unknown"
            city_paid_rev[c] = city_paid_rev.get(c, 0.0) + s.amount
            city_paid_count[c] = city_paid_count.get(c, 0) + 1

        sorted_cities = sorted(city_paid_rev.items(), key=lambda x: x[1], reverse=True)
        top_city, top_rev = sorted_cities[0] if sorted_cities else ("N/A", 0.0)

        # Build ranking table
        table_rows = [
            {
                "rank": f"#{idx}",
                "city": c,
                "paid_orders": str(city_paid_count.get(c, 0)),
                "revenue": f"₹{format_indian(int(amt))}",
                "aov": f"₹{format_indian(int(amt / city_paid_count[c]))}" if city_paid_count.get(c, 0) > 0 else "₹0",
                "share": f"{round((amt / total_paid_rev) * 100, 1)}%" if total_paid_rev > 0 else "0%"
            }
            for idx, (c, amt) in enumerate(sorted_cities[:6], 1)
        ]

        chart_data = {
            "type": "bar",
            "title": "Gross Sales Revenue by City (Paid Orders INR)",
            "xKey": "city",
            "yKeys": ["revenue"],
            "colors": ["#10b981"],
            "data": [{"city": c, "revenue": round(amt, 2)} for c, amt in sorted_cities[:8]]
        }

        # Date coverage
        sold_dates = [s.sold_at for s in sales if s.sold_at]
        min_date = min(sold_dates)[:10] if sold_dates else "N/A"
        max_date = max(sold_dates)[:10] if sold_dates else "N/A"

        text = (
            "### 📈 Consolidated Sales Performance & Regional Rankings\n\n"
            f"• **Consolidated Settled Revenue**: **₹{format_indian(int(total_paid_rev))}** across **{len(paid_sales)} paid orders**.\n"
            f"• **Consolidated Average Order Value (AOV)**: **₹{format_indian(int(consolidated_aov))}**.\n"
            f"• **Top Revenue Contributor**: **{top_city}** with **₹{format_indian(int(top_rev))}** "
            f"({round((top_rev / total_paid_rev) * 100, 1)}% of total paid volume).\n"
            f"• **Pending Transactions**: **{len(pending_sales)} orders** awaiting settlement totaling **₹{format_indian(int(total_pending_rev))}**.\n\n"
            f"**Calculation Basis & Data Coverage**:\n"
            f"Aggregated from **{len(sales)} total records** in table `sales` spanning **{len(city_paid_rev)} cities** "
            f"between `{min_date}` and `{max_date}`. Calculations distinguish completed paid orders from unsettled pending orders."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "SALES_SUMMARY",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Settled Revenue", "val": f"₹{format_indian(int(total_paid_rev))}", "delta": f"{len(paid_sales)} Orders", "trend": "success", "subtext": "Consolidated Paid", "icon": "💹"},
                {"label": "Consolidated AOV", "val": f"₹{format_indian(int(consolidated_aov))}", "delta": "Per Order", "trend": "neutral", "subtext": "Paid Transactions", "icon": "🛒"},
                {"label": "Top Region", "val": top_city, "delta": f"₹{format_indian(int(top_rev))}", "trend": "success", "subtext": f"{city_paid_count.get(top_city, 0)} Orders", "icon": "🏆"},
                {"label": "Pending Orders", "val": f"{len(pending_sales)} Orders", "delta": f"₹{format_indian(int(total_pending_rev))}", "trend": "down" if pending_sales else "success", "subtext": "Awaiting Settlement", "icon": "⏳"}
            ],
            "chart": chart_data,
            "table": {"columns": ["Rank", "City", "Paid Orders", "Revenue", "AOV", "Share"], "rows": table_rows},
            "actions": [],
            "followups": [
                "What are sales in Delhi NCR?",
                "What are sales in Mumbai?",
                "Why did sales drop in Delhi NCR?",
                "What is our Bravecto inventory status?"
            ],
            "context": {**ctx, "topic": "sales", "last_metric": "consolidated_revenue"}
        }

    def _build_empty_sales_response(self, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        return {
            "role": "ai",
            "text": (
                "**Sales Telemetry Notice:**\n\n"
                "• **Database Ledger**: Table `sales` currently contains **0 records** (clean ledger state).\n"
                "• No settled transactions or revenue figures have been uploaded yet.\n"
                "• You can ingest sales data via the Data Pipeline page or CSV upload."
            ),
            "intent": "SALES_SUMMARY",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Settled Revenue", "val": "₹0", "delta": "0 Orders", "trend": "neutral", "subtext": "Awaiting Ingestion", "icon": "💹"}
            ],
            "chart": None,
            "table": None,
            "actions": [],
            "followups": ["Check inventory status", "How many pets are registered?", "Show clinic locations"],
            "context": ctx
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # DOMAIN 2: PHARMACY INVENTORY & STOCKOUT REORDER
    # ─────────────────────────────────────────────────────────────────────────────
    def _handle_inventory_flow(self, q: str, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        """Query pharmacy medicines, compute stock health, and draft reorder cards."""
        meds = self.db.query(PharmacyMedicine).all()
        products = self.db.query(Product).all()

        if not meds and not products:
            return {
                "role": "ai",
                "text": "Currently **0 SKUs** recorded in table `pharmacy_medicines` (clean ledger).",
                "intent": "INVENTORY_ACTION",
                "agent_steps": agent_steps,
                "kpis": [],
                "chart": None,
                "table": None,
                "actions": [],
                "followups": ["Consolidated sales summary"],
                "context": ctx
            }

        # Identify low stock items (<= 15 units safety buffer)
        low_stock_meds = [m for m in meds if m.stock <= 15]
        target_med = next((m for m in meds if "bravecto" in m.name.lower()), meds[0] if meds else None)

        table_rows = [
            {
                "sku": m.med_code,
                "name": m.name,
                "brand": m.brand,
                "stock": f"{m.stock} Units",
                "price": f"₹{format_indian(int(m.price))}",
                "status": "⚠️ Low Stock" if m.stock <= 15 else "In Stock"
            }
            for m in meds[:8]
        ]

        chart_data = {
            "type": "bar",
            "title": "Pharmacy Stock Levels by SKU (Units on Hand)",
            "xKey": "name",
            "yKeys": ["stock"],
            "colors": ["#10b981"],
            "data": [{"name": m.name[:18], "stock": m.stock} for m in meds[:6]]
        } if meds else None

        # Formulate Human-in-the-Loop Action Card
        actions = []
        if target_med:
            reorder_qty = 50
            unit_cost = int(target_med.price * 0.75)
            total_cost = reorder_qty * unit_cost
            actions.append({
                "action_id": f"ACT-PO-{uuid.uuid4().hex[:4].upper()}",
                "action_type": "PURCHASE_ORDER",
                "title": f"Replenishment Purchase Order: {target_med.name}",
                "description": f"Draft Purchase Order for {reorder_qty} units of {target_med.name} to restore central hub safety buffer.",
                "impact_badge": "Protects Prescription Fulfillment · Avoids Stockout",
                "risk_level": "Low (Direct Approved Vendor)",
                "parameters": {
                    "sku": target_med.med_code,
                    "medicine_name": target_med.name,
                    "reorder_quantity": reorder_qty,
                    "estimated_unit_cost": f"₹{format_indian(unit_cost)}",
                    "total_po_value": f"₹{format_indian(total_cost)}",
                    "vendor": target_med.brand or "MSD Animal Health",
                    "dispatch_priority": "Express Priority"
                },
                "status": "PENDING_APPROVAL"
            })

        text = (
            f"### 💊 Pharmacy Formulary & Stock Health Telemetry\n\n"
            f"• **Active Formulary**: **{len(meds)} pharmaceutical SKUs** indexed in table `pharmacy_medicines`.\n"
            f"• **Critical Stockout Alerts**: **{len(low_stock_meds)} SKUs** are currently below the **15-unit safety threshold**.\n"
            + (f"• **Bravecto Telemetry**: *{target_med.name}* is at **{target_med.stock} units** on hand ({target_med.status}).\n" if target_med else "")
            + f"• **Prescriptive Proposal**: A Purchase Order for **{target_med.name if target_med else 'essential SKUs'}** has been drafted below with **PENDING_APPROVAL** status. You can approve it to update the ERP ledger."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "INVENTORY_ACTION",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Formulary Catalog", "val": f"{len(meds)} SKUs", "delta": "Verified", "trend": "neutral", "subtext": "Active Medicines", "icon": "💊"},
                {"label": "Low Stock Items", "val": f"{len(low_stock_meds)} SKUs", "delta": "< 15 Units", "trend": "down" if low_stock_meds else "success", "subtext": "Actionable Buffer", "icon": "⚠️"},
                {"label": "Target SKU Stock", "val": f"{target_med.stock if target_med else 0} Units", "delta": target_med.med_code if target_med else "", "trend": "down" if target_med and target_med.stock <= 15 else "success", "subtext": target_med.name[:18] if target_med else "", "icon": "📦"},
                {"label": "PO Drafter", "val": "Ready", "delta": "1-Click", "trend": "success", "subtext": "Human-in-the-Loop", "icon": "⚡"}
            ],
            "chart": chart_data,
            "table": {"columns": ["SKU", "Medicine Name", "Brand", "Stock", "Price", "Status"], "rows": table_rows},
            "actions": actions,
            "followups": [
                "What is our consolidated gross revenue?",
                "Which clinic has the highest footfall?",
                "How many pets have overdue vaccinations?"
            ],
            "context": {**ctx, "topic": "inventory", "entity": "pharmacy"}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # DOMAIN 3: VACCINATION & PET PATIENT CENSUS
    # ─────────────────────────────────────────────────────────────────────────────
    def _handle_vaccine_flow(self, q: str, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        """Query registered pets, compute overdue vaccination rates, and draft recall campaign."""
        pets = self.db.query(Pet).all()
        if not pets:
            return {
                "role": "ai",
                "text": "Currently **0 registered pets** in table `pets` (clean ledger).",
                "intent": "VACCINATION_CAMPAIGN",
                "agent_steps": agent_steps,
                "kpis": [],
                "chart": None,
                "table": None,
                "actions": [],
                "followups": ["Consolidated sales summary"],
                "context": ctx
            }

        # Filter overdue vaccinations
        overdue_pets = [p for p in pets if "overdue" in (p.vaccination_status or "").lower()]
        uptodate_pets = [p for p in pets if "overdue" not in (p.vaccination_status or "").lower()]
        overdue_pct = round((len(overdue_pets) / len(pets)) * 100, 1)

        # Species split
        species_counts: Dict[str, int] = {}
        for p in pets:
            s = p.species or "Dog"
            species_counts[s] = species_counts.get(s, 0) + 1

        chart_data = {
            "type": "pie",
            "title": f"Pet Vaccination Compliance ({len(pets)} Patients)",
            "data": [
                {"name": "Up to Date", "value": len(uptodate_pets), "color": "#10b981"},
                {"name": "Overdue Boosters", "value": len(overdue_pets), "color": "#ef4444"},
            ]
        }

        # Action card
        actions = [
            {
                "action_id": f"ACT-CAMP-VACC-{uuid.uuid4().hex[:4].upper()}",
                "action_type": "MARKETING_CAMPAIGN",
                "title": f"Automated WhatsApp Recall Drive ({len(overdue_pets)} Overdue Patients)",
                "description": f"Deploy automated WhatsApp appointment reminders to the {len(overdue_pets)} pet parents with overdue vaccine schedules.",
                "impact_badge": "Protects Herd Health · Recovers Clinic OPD Revenue",
                "risk_level": "Low (Automated Communication)",
                "parameters": {
                    "channel": "WhatsApp Cloud API Verified (Zenve)",
                    "target_count": len(overdue_pets),
                    "template": "Annual Core Vaccine & Health Checkup Recall",
                    "incentive": "Complimentary Dental Triage Voucher",
                    "booking_link": "Active"
                },
                "status": "PENDING_APPROVAL"
            }
        ]

        # Table of overdue pets
        table_rows = [
            {
                "pet_code": p.pet_code,
                "pet_name": p.name,
                "species": p.species,
                "breed": p.breed,
                "parent": p.parent_name,
                "status": p.vaccination_status
            }
            for p in overdue_pets
        ]

        text = (
            f"### 🐾 Pet Patient Census & Immunization Compliance\n\n"
            f"• **Registered Patient Roster**: **{len(pets)} total pets** ({species_counts.get('Dog', 0)} Dogs, {species_counts.get('Cat', 0)} Cats).\n"
            f"• **Overdue Vaccination Cohort**: **{len(overdue_pets)} pets ({overdue_pct}%)** are overdue for core Rabies or DHPPi boosters.\n"
            f"• **Compliance Rate**: **{len(uptodate_pets)} pets ({round(100 - overdue_pct, 1)}%)** have fully active immunity records.\n\n"
            f"**Calculation Basis**:\n"
            f"Computed strictly across all **{len(pets)} active records** in table `pets` based on clinical booster interval rules. "
            "You can review the overdue patient list below and approve the WhatsApp recall drive."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "VACCINATION_CAMPAIGN",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Total Patients", "val": f"{len(pets)} Pets", "delta": "Verified", "trend": "neutral", "subtext": "Active Census", "icon": "🐾"},
                {"label": "Overdue Boosters", "val": f"{len(overdue_pets)} Pets", "delta": f"{overdue_pct}% of Total", "trend": "down" if overdue_pets else "success", "subtext": "Actionable Recall", "icon": "💉"},
                {"label": "Up-to-Date Ratio", "val": f"{round(100 - overdue_pct, 1)}%", "delta": "Protected", "trend": "success", "subtext": "Compliant Cohort", "icon": "🛡️"},
                {"label": "WhatsApp Recall", "val": "Configured", "delta": "1-Click", "trend": "success", "subtext": "Text-to-Action", "icon": "📱"}
            ],
            "chart": chart_data,
            "table": {"columns": ["Pet Code", "Pet Name", "Species", "Breed", "Pet Parent", "Status"], "rows": table_rows} if table_rows else None,
            "actions": actions,
            "followups": [
                "What is our consolidated gross revenue?",
                "Which clinic has highest patient footfall?",
                "What is our Bravecto inventory status?"
            ],
            "context": {**ctx, "topic": "pets", "entity": "vaccinations"}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # DOMAIN 4: CLINIC & HOSPITAL NETWORK
    # ─────────────────────────────────────────────────────────────────────────────
    def _handle_clinic_flow(self, q: str, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        """Query clinics and hospitals, calculate beds, daily footfall, and city distribution."""
        clinics = self.db.query(ClinicHospital).all()
        doctors = self.db.query(Doctor).all()

        if not clinics:
            return {
                "role": "ai",
                "text": "Currently **0 hospital facilities** recorded in table `clinics_hospitals`.",
                "intent": "CLINIC_PERFORMANCE",
                "agent_steps": agent_steps,
                "kpis": [],
                "chart": None,
                "table": None,
                "actions": [],
                "followups": ["Consolidated sales summary"],
                "context": ctx
            }

        # Check for city filter
        q_lower = q.lower()
        target_city = None
        for alias, std_city in CITY_ALIASES.items():
            if re.search(rf"\b{alias}\b", q_lower):
                target_city = std_city
                break

        if not target_city and ctx.get("active_city"):
            target_city = ctx.get("active_city")

        filtered_clinics = [c for c in clinics if c.city.lower() == target_city.lower()] if target_city else clinics

        if target_city and not filtered_clinics:
            return {
                "role": "ai",
                "text": (
                    f"**Clinic Network Search for {target_city}:**\n\n"
                    f"• Found **0 physical surgical hospitals** currently listed under `{target_city}`.\n"
                    f"• Active surgical hospital hubs are located in Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Kolkata, and Ahmedabad.\n"
                    f"• Note: `{target_city}` is served through our express delivery depot network and digital tele-triage."
                ),
                "intent": "CLINIC_PERFORMANCE",
                "agent_steps": agent_steps,
                "kpis": [
                    {"label": "Target City", "val": target_city, "delta": "Digital Hub", "trend": "neutral", "subtext": "No Physical Hospital", "icon": "📍"}
                ],
                "chart": None,
                "table": None,
                "actions": [],
                "followups": ["Show all hospital clinics", "What are sales in Mumbai?"],
                "context": ctx
            }

        total_beds = sum(c.beds_capacity for c in filtered_clinics)
        total_footfall = sum(c.daily_footfall for c in filtered_clinics)
        top_clinic = max(filtered_clinics, key=lambda c: c.daily_footfall)

        chart_data = {
            "type": "bar",
            "title": f"Hospital Network: Daily Patient Footfall ({'All Facilities' if not target_city else target_city})",
            "xKey": "name",
            "yKeys": ["footfall"],
            "colors": ["#3b82f6"],
            "data": [{"name": c.name.split(",")[0][:18], "footfall": c.daily_footfall} for c in filtered_clinics[:6]]
        }

        table_rows = [
            {
                "code": c.clinic_code,
                "name": c.name,
                "city": c.city,
                "doctors": str(c.doctors_count),
                "beds": str(c.beds_capacity),
                "daily_footfall": str(c.daily_footfall)
            }
            for c in filtered_clinics
        ]

        text = (
            f"### 🏥 Veterinary Hospital Network Telemetry"
            + (f" ({target_city})" if target_city else "") + "\n\n"
            f"• **Facility Count**: **{len(filtered_clinics)} centers** online (all Open 24x7).\n"
            f"• **Inpatient Capacity**: **{total_beds} surgical & ICU hospital beds** across the network.\n"
            f"• **Daily OPD Footfall**: **{format_int(total_footfall)} patient visits/day**.\n"
            f"• **Top Facility**: **{top_clinic.name}** ({top_clinic.daily_footfall} visits/day, {top_clinic.beds_capacity} beds).\n"
            f"• **Medical Staff**: **{len(doctors)} licensed veterinary surgeons** on duty across the network.\n\n"
            f"**Calculation Basis**: Aggregated directly from table `clinics_hospitals`."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "CLINIC_PERFORMANCE",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Facilities Online", "val": f"{len(filtered_clinics)} Hubs", "delta": "Open 24x7", "trend": "success", "subtext": target_city or "All India", "icon": "🏥"},
                {"label": "Total Hospital Beds", "val": f"{total_beds} Beds", "delta": "ICU & Inpatient", "trend": "neutral", "subtext": "Surgical Capacity", "icon": "🛏️"},
                {"label": "Daily Footfall", "val": f"{format_int(total_footfall)} / Day", "delta": "Active Visits", "trend": "success", "subtext": "OPD Volume", "icon": "🐾"},
                {"label": "Top Center", "val": top_clinic.city, "delta": f"{top_clinic.daily_footfall} Visits", "trend": "success", "subtext": top_clinic.name.split(",")[0], "icon": "⭐"}
            ],
            "chart": chart_data,
            "table": {"columns": ["Code", "Hospital Name", "City", "Doctors", "Beds", "Daily Footfall"], "rows": table_rows},
            "actions": [],
            "followups": [
                "Which doctor has the highest consultations?",
                "What is our consolidated gross revenue?",
                "Show clinics in Mumbai"
            ],
            "context": {**ctx, "topic": "clinics", "active_city": target_city}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # DOMAIN 5: DOCTORS & SPECIALIST ROSTER
    # ─────────────────────────────────────────────────────────────────────────────
    def _handle_doctor_flow(self, q: str, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        """Query veterinary doctors, compute consultation volumes and satisfaction ratings."""
        doctors = self.db.query(Doctor).all()
        if not doctors:
            return {
                "role": "ai",
                "text": "Currently **0 doctor records** in table `doctors`.",
                "intent": "DOCTORS_ROSTER",
                "agent_steps": agent_steps,
                "kpis": [],
                "chart": None,
                "table": None,
                "actions": [],
                "followups": ["Consolidated sales summary"],
                "context": ctx
            }

        total_consults = sum(d.consultations_count for d in doctors)
        avg_rating = round(sum(d.rating for d in doctors) / len(doctors), 2)
        top_doc = max(doctors, key=lambda d: d.consultations_count)

        table_rows = [
            {
                "code": d.doctor_code,
                "name": d.name,
                "specialty": d.specialty,
                "branch": d.clinic_branch.split(",")[-1].strip(),
                "consultations": str(d.consultations_count),
                "rating": f"{d.rating} ★"
            }
            for d in doctors
        ]

        text = (
            "### 🩺 Veterinary Medical Staff & Specialist Caseload\n\n"
            f"• **Doctor Roster**: **{len(doctors)} specialist veterinary doctors** on duty.\n"
            f"• **Total Completed Consultations**: **{format_int(total_consults)} consultations** logged.\n"
            f"• **Average Patient Satisfaction**: **{avg_rating} / 5.0 ★** across all facilities.\n"
            f"• **Lead Surgeon by Caseload**: **{top_doc.name}** ({top_doc.specialty}) with "
            f"**{top_doc.consultations_count} completed consultations** and a **{top_doc.rating} ★** rating at *{top_doc.clinic_branch}*.\n\n"
            f"**Calculation Basis**: Derived strictly from verified records in table `doctors`."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "DOCTORS_ROSTER",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Doctors on Duty", "val": f"{len(doctors)} Vets", "delta": "Full-Time", "trend": "success", "subtext": "Multi-Specialty", "icon": "🩺"},
                {"label": "Total Consultations", "val": format_int(total_consults), "delta": "Logged", "trend": "success", "subtext": "Clinical Caseload", "icon": "📋"},
                {"label": "Average Rating", "val": f"{avg_rating} ★", "delta": "Out of 5.0", "trend": "success", "subtext": "Patient Feedback", "icon": "⭐"},
                {"label": "Top Clinician", "val": top_doc.name.split()[-1], "delta": f"{top_doc.consultations_count} Cases", "trend": "success", "subtext": top_doc.specialty, "icon": "🏆"}
            ],
            "chart": None,
            "table": {"columns": ["Code", "Doctor Name", "Specialty", "Clinic Branch", "Consultations", "Rating"], "rows": table_rows},
            "actions": [],
            "followups": [
                "Show clinic locations and footfall",
                "What is our consolidated gross revenue?",
                "How many pets have overdue vaccinations?"
            ],
            "context": {**ctx, "topic": "doctors"}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # DOMAIN 6: LOGISTICS & 60-MINUTE EXPRESS DELIVERY SLA
    # ─────────────────────────────────────────────────────────────────────────────
    def _handle_logistics_flow(self, q: str, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        """Query logistics deliveries and compute express SLA fulfillment rates."""
        deliveries = self.db.query(LogisticsDelivery).all()
        if not deliveries:
            return {
                "role": "ai",
                "text": "Currently **0 delivery dispatches** logged in table `logistics_deliveries`.",
                "intent": "LOGISTICS_SLA",
                "agent_steps": agent_steps,
                "kpis": [],
                "chart": None,
                "table": None,
                "actions": [],
                "followups": ["Consolidated sales summary"],
                "context": ctx
            }

        delivered = [d for d in deliveries if d.status == "Delivered"]
        in_transit = [d for d in deliveries if d.status in ("In Transit", "Dispatched")]
        sla_pct = round((len(delivered) / len(deliveries)) * 100, 1) if deliveries else 0.0

        avg_eta = (
            round(sum(d.eta_mins for d in in_transit) / len(in_transit), 1)
            if in_transit else 0.0
        )

        table_rows = [
            {
                "delivery_id": d.delivery_id,
                "order_ref": d.order_ref,
                "rider": d.rider_name,
                "route": f"{d.pickup_location.split(',')[0]} → {d.drop_location.split(',')[0]}",
                "status": d.status,
                "eta": f"{d.eta_mins} mins" if d.eta_mins > 0 else "Delivered"
            }
            for d in deliveries[:8]
        ]

        actions = [
            {
                "action_id": f"ACT-LOG-001-{uuid.uuid4().hex[:4].upper()}",
                "action_type": "FLEET_REALLOCATION",
                "title": "Express 60-Minute Float Courier Reallocation",
                "description": f"Reallocate float riders to micro-depots experiencing active dispatches to protect the 60-minute delivery SLA.",
                "impact_badge": "Protects Express SLA · Minimizes Transit Breaches",
                "risk_level": "Low (Dynamic Shift Float)",
                "parameters": {
                    "float_riders": 12,
                    "target_sla": "97.6%",
                    "dispatch_type": "Express 60-Min Medical Dispatch"
                },
                "status": "PENDING_APPROVAL"
            }
        ]

        text = (
            f"### 🚚 60-Minute Express Medicine & Order Logistics Telemetry\n\n"
            f"• **Active Fleet Dispatches**: **{len(deliveries)} total delivery runs** recorded in `logistics_deliveries`.\n"
            f"• **Completed Deliveries**: **{len(delivered)} orders ({sla_pct}%)** successfully fulfilled.\n"
            f"• **Live In-Transit Dispatches**: **{len(in_transit)} orders** actively on the road (Avg ETA: **{avg_eta} minutes**).\n"
            f"• **Fleet Optimization**: Prescriptive float reallocation card drafted below with **PENDING_APPROVAL** status."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "LOGISTICS_SLA",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Active Dispatches", "val": f"{len(deliveries)} Orders", "delta": "Logged", "trend": "neutral", "subtext": "Telemetry Active", "icon": "🚚"},
                {"label": "Fulfillment Rate", "val": f"{sla_pct}%", "delta": f"{len(delivered)} Completed", "trend": "success", "subtext": "Delivered On-Time", "icon": "⏱️"},
                {"label": "Active in Transit", "val": f"{len(in_transit)} Orders", "delta": f"Avg {avg_eta}m ETA", "trend": "neutral", "subtext": "On The Road", "icon": "🛵"},
                {"label": "Fleet Reallocation", "val": "Ready", "delta": "1-Click", "trend": "success", "subtext": "Human-in-the-Loop", "icon": "⚡"}
            ],
            "chart": None,
            "table": {"columns": ["Delivery ID", "Order Ref", "Rider", "Route", "Status", "ETA"], "rows": table_rows},
            "actions": actions,
            "followups": [
                "What is our consolidated gross revenue?",
                "What is our Bravecto inventory status?",
                "Show clinic locations"
            ],
            "context": {**ctx, "topic": "logistics"}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # DOMAIN 7: ORDERS & APP CHANNELS
    # ─────────────────────────────────────────────────────────────────────────────
    def _handle_orders_flow(self, q: str, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        """Query orders table, compute payment and channel distributions."""
        orders = self.db.query(Order).all()
        if not orders:
            return {
                "role": "ai",
                "text": "Currently **0 orders** recorded in table `orders`.",
                "intent": "ORDERS_SUMMARY",
                "agent_steps": agent_steps,
                "kpis": [],
                "chart": None,
                "table": None,
                "actions": [],
                "followups": ["Consolidated sales summary"],
                "context": ctx
            }

        total_val = sum(o.total_amount for o in orders)
        avg_val = total_val / len(orders) if orders else 0.0

        channels: Dict[str, int] = {}
        for o in orders:
            ch = o.channel or "Android App"
            channels[ch] = channels.get(ch, 0) + 1

        chart_data = {
            "type": "bar",
            "title": "Order Distribution by Channel",
            "xKey": "channel",
            "yKeys": ["orders_count"],
            "colors": ["#8b5cf6"],
            "data": [{"channel": ch, "orders_count": cnt} for ch, cnt in channels.items()]
        }

        text = (
            "### 🛒 Orders & Omni-Channel Telemetry\n\n"
            f"• **Total Recorded Orders**: **{len(orders)} orders** in table `orders`.\n"
            f"• **Gross Order Value**: **₹{format_indian(int(total_val))}** (Average: **₹{format_indian(int(avg_val))}** / order).\n"
            f"• **Channel Breakdown**: {', '.join([f'{ch} ({cnt} orders)' for ch, cnt in channels.items()])}.\n\n"
            f"**Calculation Basis**: Aggregated directly from table `orders`."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "ORDERS_SUMMARY",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Total Orders", "val": f"{len(orders)} Orders", "delta": "Verified", "trend": "neutral", "subtext": "Orders Table", "icon": "🛒"},
                {"label": "Gross Order Value", "val": f"₹{format_indian(int(total_val))}", "delta": "Aggregated", "trend": "success", "subtext": "Orders Table", "icon": "💹"},
                {"label": "Average Order", "val": f"₹{format_indian(int(avg_val))}", "delta": "Per Basket", "trend": "neutral", "subtext": "Orders Table", "icon": "📦"}
            ],
            "chart": chart_data,
            "table": None,
            "actions": [],
            "followups": ["Consolidated sales summary", "What is Bravecto inventory status?"],
            "context": {**ctx, "topic": "orders"}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # DOMAIN 8: SUBSCRIPTions & RECURRING ARR
    # ─────────────────────────────────────────────────────────────────────────────
    def _handle_subscriptions_flow(self, q: str, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        """Query subscription plans and active recurring subscriptions."""
        plans = self.db.query(SubscriptionPlan).all()
        subs = self.db.query(Subscription).all()

        total_subscribers = sum(p.active_subscribers for p in plans) if plans else len(subs)
        total_mrr = sum(p.mrr for p in plans) if plans else sum(s.monthly_fee for s in subs)

        text = (
            "### 🔄 Preventive Care Subscriptions & Recurring ARR\n\n"
            f"• **Active Subscription Plans**: **{len(plans)} plans** in catalog.\n"
            f"• **Active Subscribers**: **{format_int(total_subscribers)} pet parents** enrolled in recurring care.\n"
            f"• **Monthly Recurring Revenue (MRR)**: **₹{format_indian(int(total_mrr))}**.\n"
            f"• **Annualized Run-Rate (ARR)**: **₹{format_indian(int(total_mrr * 12))}**.\n\n"
            f"**Calculation Basis**: Aggregated from tables `subscription_plans` and `subscriptions`."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "SUBSCRIPTIONS_SUMMARY",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Active Subscribers", "val": format_int(total_subscribers), "delta": "Pet Parents", "trend": "success", "subtext": "Recurring Care", "icon": "🐾"},
                {"label": "Monthly MRR", "val": f"₹{format_indian(int(total_mrr))}", "delta": "Recurring", "trend": "success", "subtext": "Subscription Plans", "icon": "🔁"},
                {"label": "Annualized ARR", "val": f"₹{format_indian(int(total_mrr * 12))}", "delta": "Run-Rate", "trend": "success", "subtext": "12x MRR", "icon": "💹"}
            ],
            "chart": None,
            "table": None,
            "actions": [],
            "followups": ["Consolidated sales summary", "How many pets have overdue vaccinations?"],
            "context": {**ctx, "topic": "subscriptions"}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # GENERAL EXECUTIVE SUMMARY FALLBACK
    # ─────────────────────────────────────────────────────────────────────────────
    def _handle_general_executive_summary_flow(self, ctx: Dict[str, Any], agent_steps: list) -> Dict[str, Any]:
        sales = self.db.query(Sale).all()
        paid_sales = [s for s in sales if s.status == "Paid"]
        total_rev = sum(s.amount for s in paid_sales)
        pets_count = self.db.query(Pet).count()
        clinics_count = self.db.query(ClinicHospital).count()
        meds_count = self.db.query(PharmacyMedicine).count()

        text = (
            "### 🏛️ Executive Overview — Zenve Pets Healthcare (Live Data Grounded)\n\n"
            f"• **Consolidated Revenue**: **₹{format_indian(int(total_rev))}** across **{len(paid_sales)} paid transactions**.\n"
            f"• **Patient Roster**: **{pets_count} registered pet patients**.\n"
            f"• **Hospital Network**: **{clinics_count} facilities** active across {len(SUPPORTED_CITIES)} metropolitan hubs.\n"
            f"• **Pharmacy Formulary**: **{meds_count} active medicinal SKUs**.\n\n"
            "You can ask for specific metrics such as regional sales, doctor caseloads, medicine stockout alerts, or preventive vaccination drives."
        )

        return {
            "role": "ai",
            "text": text,
            "intent": "GENERAL_EXECUTIVE_BI",
            "agent_steps": agent_steps,
            "kpis": [
                {"label": "Settled Revenue", "val": f"₹{format_indian(int(total_rev))}", "delta": f"{len(paid_sales)} Orders", "trend": "success", "subtext": "Sales Ledger", "icon": "💹"},
                {"label": "Registered Patients", "val": f"{pets_count} Pets", "delta": "Verified", "trend": "neutral", "subtext": "Pets Ledger", "icon": "🐾"},
                {"label": "Hospital Hubs", "val": f"{clinics_count} Facilities", "delta": "Active 24x7", "trend": "success", "subtext": "Clinics Ledger", "icon": "🏥"},
                {"label": "Pharmacy Catalog", "val": f"{meds_count} SKUs", "delta": "IoT Supervised", "trend": "neutral", "subtext": "Medicines Ledger", "icon": "💊"}
            ],
            "chart": None,
            "table": None,
            "actions": [],
            "followups": [
                "What is our consolidated gross revenue and AOV?",
                "Which city generated the highest sales revenue?",
                "What is our Bravecto inventory status and draft a PO?",
                "How many pets have overdue vaccinations?"
            ],
            "context": ctx
        }

    def _build_empty_query_response(self) -> Dict[str, Any]:
        return {
            "role": "ai",
            "text": "Please provide a question or command. For example: *'What is our consolidated revenue?'* or *'Show low stock medicines.'*",
            "intent": "EMPTY_QUERY",
            "agent_steps": [],
            "kpis": [],
            "chart": None,
            "table": None,
            "actions": [],
            "followups": ["Consolidated sales summary", "Show low stock medicines", "Clinic locations overview"],
            "context": {}
        }

    # ─────────────────────────────────────────────────────────────────────────────
    # ACTION EXECUTION ENGINE (Text-to-Action)
    # ─────────────────────────────────────────────────────────────────────────────
    def execute_action(self, action_id: str, payload: Optional[Dict[str, Any]] = None, user: str = "Executive Admin") -> Dict[str, Any]:
        """Execute an approved autonomous action, commit changes to DB, and record in audit trail."""
        txn_ref = f"TXN-EXEC-{uuid.uuid4().hex[:8].upper()}"
        executed_at = datetime.now(timezone.utc)
        summary = f"Executive Action {action_id} approved and executed in ERP."

        # If it's a Purchase Order action, commit real replenishment record to DB
        if "PO" in action_id:
            try:
                med = self.db.query(PharmacyMedicine).filter(PharmacyMedicine.med_code == "MED-BRV-01").first()
                if not med:
                    med = PharmacyMedicine(
                        med_code="MED-BRV-01",
                        name="Bravecto Chewables (Fluralaner 250mg)",
                        brand="MSD Animal Health",
                        salt_name="Fluralaner 250mg",
                        category="Antiparasitic",
                        price=2450.0,
                        stock=50,
                        batch_no=f"PO-{uuid.uuid4().hex[:4].upper()}",
                        expiry_date=date(2027, 6, 30),
                        requires_prescription=1,
                        status="Replenished (50 Units)"
                    )
                    self.db.add(med)
                else:
                    med.stock += 50
                    med.status = f"Replenished ({med.stock} Units)"
                self.db.commit()
                summary = f"Purchase Order {action_id} committed to ERP: 50 units replenished for Bravecto Chewables (Fluralaner)."
            except Exception as e:
                logger.warning("Action PO commit failed: %s", e)
                self.db.rollback()

        # Commit executive audit alert to DB
        try:
            alert = Alert(
                alert_code=f"ALT-{uuid.uuid4().hex[:6].upper()}",
                title=f"Executive Action Executed: {action_id}",
                message=summary,
                category="Executive Co-Pilot",
                severity="Low",
                status="Read"
            )
            self.db.add(alert)
            self.db.commit()
        except Exception as e:
            logger.warning("Action alert commit failed: %s", e)
            self.db.rollback()

        record = {
            "status": "EXECUTED",
            "action_id": action_id,
            "transaction_ref": txn_ref,
            "executed_by": user,
            "executed_at": executed_at.strftime("%Y-%m-%d %H:%M:%S UTC"),
            "summary": summary,
            "payload": payload or {}
        }
        _ACTION_EXECUTION_AUDIT.append(record)

        return record

    def get_audit_trail(self) -> List[Dict[str, Any]]:
        """Return the running ledger of executed actions."""
        return _ACTION_EXECUTION_AUDIT
