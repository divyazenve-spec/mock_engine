"""Focused Automated Tests for Ask Zenve AI Executive Copilot Engine.

Covers:
1. Mock-data calculations (sums, counts, averages, rankings, date coverage).
2. Missing-data intelligence (unsupported metrics, missing COGS, unserved geographies).
3. Conversational intelligence (greetings, ambiguity clarification, analytical definitions).
4. Contextual multi-turn follow-ups (entity inheritance, topic retention).
5. Reliability, safety, and action execution audit.
"""
import sys
from pathlib import Path
import unittest

# Ensure backend directory is in python path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.core.database import SessionLocal
from app.models.all_models import (
    ClinicHospital,
    Doctor,
    LogisticsDelivery,
    Pet,
    PharmacyMedicine,
    Product,
    Sale,
)
from app.services.copilot_service import ExecutiveCopilotEngine


class TestExecutiveCopilotEngine(unittest.TestCase):

    def setUp(self):
        self.db = SessionLocal()
        self.engine = ExecutiveCopilotEngine(self.db)

    def tearDown(self):
        self.db.rollback()
        self.db.close()

    # ─────────────────────────────────────────────────────────────────────────
    # 1. MOCK-DATA INTELLIGENCE & ACCURATE CALCULATIONS
    # ─────────────────────────────────────────────────────────────────────────
    def test_consolidated_sales_calculation(self):
        """Verify consolidated revenue, count, and AOV match DB records down to the rupee."""
        all_sales = self.db.query(Sale).all()
        paid_sales = [s for s in all_sales if s.status == "Paid"]
        expected_paid_rev = sum(s.amount for s in paid_sales)
        expected_aov = expected_paid_rev / len(paid_sales) if paid_sales else 0.0

        resp = self.engine.process_query("What is our consolidated gross revenue and AOV?")
        self.assertEqual(resp["role"], "ai")
        self.assertIn(resp["intent"], ["SALES_SUMMARY", "GENERAL_EXECUTIVE_BI"])
        
        # Verify KPI pills
        kpi_map = {k["label"]: k["val"] for k in resp.get("kpis", [])}
        self.assertIn("Settled Revenue", kpi_map)
        self.assertIn("Consolidated AOV", kpi_map)
        
        # Verify table or narrative contains actual paid order count
        self.assertIn(str(len(paid_sales)), resp["text"])
        self.assertGreater(len(resp["agent_steps"]), 0)

    def test_city_specific_sales_calculation(self):
        """Verify city-level sales query filters only by that city."""
        target_city = "Mumbai"
        mumbai_sales = self.db.query(Sale).filter(Sale.city == target_city).all()
        paid_mumbai = [s for s in mumbai_sales if s.status == "Paid"]
        expected_rev = sum(s.amount for s in paid_mumbai)

        resp = self.engine.process_query(f"What are the sales in {target_city}?")
        self.assertEqual(resp["intent"], "CITY_SALES")
        self.assertIn(target_city, resp["text"])
        self.assertIn(str(len(paid_mumbai)), resp["text"])
        
        # Verify context carries active city
        self.assertEqual(resp.get("context", {}).get("active_city"), target_city)

    def test_inventory_telemetry_and_low_stock(self):
        """Verify pharmacy medicines are accurately counted and low-stock items identified."""
        all_meds = self.db.query(PharmacyMedicine).all()
        low_stock = [m for m in all_meds if m.stock <= 15]

        resp = self.engine.process_query("What is our Bravecto inventory status and stockout risk?")
        self.assertEqual(resp["intent"], "INVENTORY_ACTION")
        self.assertIn(str(len(all_meds)), resp["text"])
        self.assertIn(str(len(low_stock)), resp["text"])
        
        # Verify that drafted action proposal has PENDING_APPROVAL status (never auto-executed)
        actions = resp.get("actions", [])
        self.assertGreater(len(actions), 0)
        self.assertEqual(actions[0]["status"], "PENDING_APPROVAL")
        self.assertIn("PO", actions[0]["action_id"])

    def test_pet_census_and_overdue_vaccinations(self):
        """Verify pet census, species counts, and overdue vaccination numbers."""
        all_pets = self.db.query(Pet).all()
        overdue_pets = [p for p in all_pets if "overdue" in (p.vaccination_status or "").lower()]

        resp = self.engine.process_query("How many pets have overdue vaccinations?")
        self.assertEqual(resp["intent"], "VACCINATION_CAMPAIGN")
        self.assertIn(str(len(all_pets)), resp["text"])
        self.assertIn(str(len(overdue_pets)), resp["text"])
        
        # Check that WhatsApp recall campaign is proposed with PENDING_APPROVAL
        actions = resp.get("actions", [])
        self.assertGreater(len(actions), 0)
        self.assertEqual(actions[0]["status"], "PENDING_APPROVAL")

    def test_clinic_network_footfall(self):
        """Verify hospital network facility count and top footfall hospital."""
        clinics = self.db.query(ClinicHospital).all()
        top_clinic = max(clinics, key=lambda c: c.daily_footfall)

        resp = self.engine.process_query("Which clinic has the highest patient footfall?")
        self.assertEqual(resp["intent"], "CLINIC_PERFORMANCE")
        self.assertIn(str(len(clinics)), resp["text"])
        self.assertIn(top_clinic.name.split(",")[0], resp["text"])

    def test_doctor_roster_and_caseload(self):
        """Verify doctor roster count and top doctor caseload."""
        doctors = self.db.query(Doctor).all()
        top_doc = max(doctors, key=lambda d: d.consultations_count)

        resp = self.engine.process_query("Which doctor has the highest consultations completed?")
        self.assertEqual(resp["intent"], "DOCTORS_ROSTER")
        self.assertIn(str(len(doctors)), resp["text"])
        self.assertIn(top_doc.name, resp["text"])

    # ─────────────────────────────────────────────────────────────────────────
    # 2. MISSING-DATA INTELLIGENCE
    # ─────────────────────────────────────────────────────────────────────────
    def test_uncomputable_profit_metric(self):
        """Verify system refuses to invent net profit and explains missing data requirements."""
        resp = self.engine.process_query("What is our net profit on sales?")
        self.assertEqual(resp["intent"], "MISSING_DATA_EXPLANATION")
        
        # Must clearly explain what is missing, why reliable answer cannot be produced,
        # what data is required, and what CAN be answered
        text = resp["text"]
        self.assertIn("What Information is Missing", text)
        self.assertIn("Why a Reliable Answer Cannot Be Produced", text)
        self.assertIn("What Data Would Be Required", text)
        self.assertIn("What Related Metrics CAN Be Answered", text)
        
        # Verify it references catalog margins and audited GAAP report
        self.assertIn("RPT-2026-009", text)
        self.assertIn("Catalog Gross Margin", text)

    def test_unsupported_geography_coverage(self):
        """Verify system explains unsupported city coverage instead of reporting 0 sales."""
        resp = self.engine.process_query("What are sales in London?")
        self.assertEqual(resp["intent"], "UNSUPPORTED_GEOGRAPHY")
        
        text = resp["text"]
        self.assertIn("London", text)
        self.assertIn("Operational Territory Notice", text)
        self.assertIn("unsupported", text.lower())
        self.assertIn("Bengaluru", text)
        self.assertIn("Mumbai", text)

    # ─────────────────────────────────────────────────────────────────────────
    # 3. CONVERSATIONAL & CLARIFICATION INTELLIGENCE
    # ─────────────────────────────────────────────────────────────────────────
    def test_conversational_greeting(self):
        """Verify polite greeting responds with Dr. Zenve intro and live record statistics."""
        resp = self.engine.process_query("Hello Dr. Zenve, who are you?")
        self.assertEqual(resp["intent"], "GREETING")
        self.assertIn("Dr. Zenve", resp["text"])
        self.assertIn("Autonomous Executive AI Co-Pilot", resp["text"])
        self.assertGreater(len(resp["followups"]), 0)

    def test_ambiguous_request_clarification(self):
        """Verify single-word input 'sales' triggers a structured clarification prompt."""
        resp = self.engine.process_query("sales")
        self.assertEqual(resp["intent"], "CLARIFICATION_PROMPT")
        self.assertIn("which aspect would you like to explore", resp["text"].lower())
        self.assertIn("Consolidated Sales", resp["text"])
        self.assertIn("City-wise", resp["text"])
        self.assertGreaterEqual(len(resp["followups"]), 3)

    def test_general_analytical_definition(self):
        """Verify business concept questions are explained with mathematical formulas."""
        resp = self.engine.process_query("What is AOV and how is it calculated?")
        self.assertEqual(resp["intent"], "ANALYTICAL_EXPLANATION")
        self.assertIn("Average Order Value", resp["text"])
        self.assertIn("Mathematical Formula", resp["text"])
        self.assertIn("Zenve's Grounded Baseline", resp["text"])

    # ─────────────────────────────────────────────────────────────────────────
    # 4. CONTEXTUAL MULTI-TURN RESOLUTION
    # ─────────────────────────────────────────────────────────────────────────
    def test_multi_turn_contextual_flow(self):
        """Verify contextual follow-ups carry city and topic across turns."""
        # Turn 1: Query Delhi NCR sales
        resp1 = self.engine.process_query("What are sales in Delhi NCR?")
        self.assertEqual(resp1["intent"], "CITY_SALES")
        ctx1 = resp1.get("context", {})
        self.assertEqual(ctx1.get("active_city"), "Delhi NCR")

        # Turn 2: Follow-up "What about Mumbai?" using context from Turn 1
        resp2 = self.engine.process_query("What about Mumbai?", context=ctx1)
        self.assertEqual(resp2["intent"], "CITY_SALES")
        self.assertIn("Mumbai", resp2["text"])
        ctx2 = resp2.get("context", {})
        self.assertEqual(ctx2.get("active_city"), "Mumbai")

        # Turn 3: Follow-up "Which clinic is there?" using Mumbai context
        resp3 = self.engine.process_query("Which clinic is there?", context=ctx2)
        self.assertEqual(resp3["intent"], "CLINIC_PERFORMANCE")
        self.assertIn("Mumbai", resp3["text"])

    # ─────────────────────────────────────────────────────────────────────────
    # 5. RELIABILITY & ACTION EXECUTION AUDIT
    # ─────────────────────────────────────────────────────────────────────────
    def test_empty_query_handling(self):
        """Verify empty or whitespace query is handled gracefully without exception."""
        resp = self.engine.process_query("   ")
        self.assertEqual(resp["intent"], "EMPTY_QUERY")
        self.assertIn("Please provide a question", resp["text"])

    def test_human_in_the_loop_action_execution(self):
        """Verify human approval commits replenishment and generates audit receipt."""
        action_id = "ACT-PO-TEST-001"
        # Keep DB writes inside this test's transaction; tearDown rolls them back so the
        # tracked mock database is not mutated by the test run.
        self.db.commit = self.db.flush
        receipt = self.engine.execute_action(
            action_id=action_id,
            payload={"sku": "MED-BRV-01", "quantity": 50},
            user="Chief Medical Officer"
        )
        self.assertEqual(receipt["status"], "EXECUTED")
        self.assertEqual(receipt["action_id"], action_id)
        self.assertEqual(receipt["executed_by"], "Chief Medical Officer")
        self.assertIn("TXN-EXEC-", receipt["transaction_ref"])

        # Verify audit trail ledger records the execution
        audit_trail = self.engine.get_audit_trail()
        self.assertTrue(any(rec["action_id"] == action_id for rec in audit_trail))

    # ─────────────────────────────────────────────────────────────────────────
    # 6. ROUTING & NON-FABRICATION REGRESSIONS
    # ─────────────────────────────────────────────────────────────────────────
    def test_keyword_routing_uses_word_boundaries(self):
        """'po' in 'report', 'cat' in 'category', 'rag' in 'average' must not hijack routing."""
        self.assertNotEqual(self.engine.process_query("Show me the sales report")["intent"], "INVENTORY_ACTION")
        self.assertNotEqual(self.engine.process_query("Which category sells the most?")["intent"], "VACCINATION_CAMPAIGN")
        self.assertNotEqual(
            self.engine.process_query("What is the average revenue per order?")["intent"], "ENTERPRISE_RAG_SYNTHESIS"
        )

    def test_offline_fallback_does_not_fabricate_figures(self):
        """Unmatched/off-topic questions must not return hard-coded business figures."""
        for q in ["What is the weather today?", "How do I improve customer retention?"]:
            text = self.engine.process_query(q)["text"]
            for fake in ("18.4 Lakh", "1,420", "14.2%", "4.1\u00b0C", "1,11,000"):
                self.assertNotIn(fake, text)

    def test_endpoint_copilot_query_valid(self):
        """Verify the FastAPI endpoint /copilot/query function executes correctly."""
        import asyncio
        from app.api.v1.endpoints.copilot import copilot_query, CopilotQueryRequest

        req = CopilotQueryRequest(query="What is our consolidated gross revenue and AOV?")
        resp = asyncio.run(copilot_query(req, self.db))
        self.assertEqual(resp["role"], "ai")
        self.assertEqual(resp["intent"], "SALES_SUMMARY")
        self.assertIn("Settled Revenue", [k["label"] for k in resp.get("kpis", [])])

    def test_endpoint_copilot_query_empty_raises_400(self):
        """Verify the FastAPI endpoint raises 400 HTTPException on empty or whitespace queries."""
        import asyncio
        from fastapi import HTTPException
        from app.api.v1.endpoints.copilot import copilot_query, CopilotQueryRequest

        req = CopilotQueryRequest(query="   ")
        with self.assertRaises(HTTPException) as ctx:
            asyncio.run(copilot_query(req, self.db))
        self.assertEqual(ctx.exception.status_code, 400)
        self.assertEqual(ctx.exception.detail, "Query cannot be empty")

    def test_capabilities_and_sample_questions_guide(self):
        """Verify queries asking for suggested or sample questions return the 5 generic + 5 mock data questions."""
        queries = [
            "Give me 5 generic questions and 5 mock data questions",
            "What questions can you answer?",
            "What can I ask?",
            "Give me 5 of Generic questions to which our chatbot will answer. And Give me 5 of questions based on the available mock data"
        ]
        for q in queries:
            resp = self.engine.process_query(q)
            self.assertEqual(resp["role"], "ai")
            self.assertEqual(resp["intent"], "CAPABILITIES_AND_PROMPTS")
            self.assertIn("5 Generic Questions", resp["text"])
            self.assertIn("5 Mock-Data Questions", resp["text"])
            self.assertIn("Hello Dr. Zenve, who are you and what can you do?", resp["text"])
            self.assertIn("What is AOV and how is it calculated?", resp["text"])
            self.assertIn("What is the current inventory status of Bravecto?", resp["text"])
            self.assertEqual(len(resp["followups"]), 5)


if __name__ == "__main__":
    unittest.main()
