"""
test_pipeline.py
Unit and integration tests for Person 1 Ticket Intelligence Pipeline.

Tests:
  1. TF-IDF retrieval quality & text normalization.
  2. Confidence scoring formulation & weak similarity/consensus thresholds.
  3. Policy engine rules (Cancelled orders, High-value orders, SLA breaches).
  4. Decision engine rule evaluation & JSON contract structure.
"""

import unittest
from app.services.similarity import find_similar_tickets, Precedent
from app.services.confidence import calculate_confidence, ConfidenceResult
from app.services.policy_engine import validate_order_action
from app.services.decision_engine import process_ticket, DecisionStatus


class TestTicketPipeline(unittest.TestCase):

    def test_tfidf_retrieval(self):
        """Test TF-IDF similarity returns relevant historical precedents."""
        precedents = find_similar_tickets("milk packet missing from my order", top_k=3)
        self.assertGreater(len(precedents), 0)
        self.assertGreater(precedents[0].similarity, 0.50)
        self.assertIn("missing", precedents[0].resolution_note.lower())

    def test_weak_similarity_threshold(self):
        """Weak similarity should trigger WEAK_SIMILARITY reason code."""
        # Precedents with very low similarity
        weak_precedents = [
            Precedent(ticket_id="H-9999", similarity=0.15, action="refund", resolution_note="test", csat=3.0)
        ]
        conf = calculate_confidence(weak_precedents)
        self.assertEqual(conf.reason_code, "WEAK_SIMILARITY")

    def test_conflicting_actions_threshold(self):
        """Precedents with 3 completely different actions should trigger CONFLICTING_ACTIONS."""
        conflicting = [
            Precedent(ticket_id="H-1", similarity=0.85, action="redelivery", resolution_note="resold", csat=5.0),
            Precedent(ticket_id="H-2", similarity=0.85, action="full_refund", resolution_note="refunded", csat=5.0),
            Precedent(ticket_id="H-3", similarity=0.85, action="coupon", resolution_note="coupon", csat=5.0),
        ]
        conf = calculate_confidence(conflicting)
        self.assertEqual(conf.reason_code, "CONFLICTING_ACTIONS")

    def test_policy_cancelled_order(self):
        """Attempting refund/redelivery on cancelled order should fail policy."""
        res = validate_order_action("ORD-9900", "full_refund")
        self.assertFalse(res.is_valid)
        self.assertEqual(res.reason_code, "POLICY_VIOLATION: CANCELLED_ORDER")

    def test_policy_high_value_order(self):
        """High-value order (>= ₹1000) full refund should require human review."""
        res = validate_order_action("ORD-9909", "full_refund")
        self.assertFalse(res.is_valid)
        self.assertEqual(res.reason_code, "POLICY_VIOLATION: HIGH_VALUE_ORDER")

    def test_policy_unhandled_sla_breach(self):
        """Apology for delivery time > 45 mins should fail policy."""
        res = validate_order_action("ORD-9903", "apology_no_action")
        self.assertFalse(res.is_valid)
        self.assertEqual(res.reason_code, "POLICY_VIOLATION: UNHANDLED_SLA_BREACH")

    def test_process_ticket_contract(self):
        """Verify process_ticket JSON contract structure."""
        result = process_ticket("N-005")
        self.assertIn("ticket", result)
        self.assertIn("decision", result)
        self.assertIn("order", result)
        self.assertIn("precedents", result)

        self.assertEqual(result["ticket"]["ticket_id"], "N-005")
        self.assertIn(result["decision"]["status"], ["AUTO_RESOLVE", "HUMAN_REVIEW"])
        self.assertIsInstance(result["decision"]["confidence"], float)
        self.assertIsInstance(result["decision"]["reason_code"], str)


if __name__ == "__main__":
    unittest.main()
