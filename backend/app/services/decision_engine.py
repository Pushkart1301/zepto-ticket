"""
decision_engine.py
Orchestrates the ticket intelligence pipeline and exposes process_ticket(ticket_id) → dict.

Pipeline:
  CSV → Cleaned TF-IDF → Top-3 similar resolved tickets
      → Multi-factor Confidence → Order Policy Validation
      → AUTO_RESOLVE / HUMAN_REVIEW
      → Standardized JSON result
"""

from __future__ import annotations

from enum import Enum

from .data_loader import get_ticket_by_id
from .similarity import find_similar_tickets
from .confidence import calculate_confidence, MIN_AUTO_RESOLVE_CONFIDENCE
from .policy_engine import validate_order_action


class DecisionStatus(str, Enum):
    AUTO_RESOLVE = "AUTO_RESOLVE"
    HUMAN_REVIEW = "HUMAN_REVIEW"


def process_ticket(ticket_id: str) -> dict:
    """
    Full intelligence pipeline for a single ticket.

    Returns a JSON-serialisable dictionary following the exact specification:
    {
      "ticket": { ticket_id, description, order_id },
      "decision": { status, confidence, action, reason_code },
      "order": { ...order fields or {} },
      "precedents": [{ ticket_id, similarity, action, resolution_note, csat }, ...]
    }
    """

    # ── Step 1: Load ticket ───────────────────────────────────────────────────
    ticket = get_ticket_by_id(ticket_id)
    if ticket is None:
        return _build_result(
            ticket_payload={"ticket_id": ticket_id, "description": "", "order_id": ""},
            status=DecisionStatus.HUMAN_REVIEW,
            confidence=0.0,
            action=None,
            reason_code="TICKET_NOT_FOUND",
            order_data={},
            precedents=[],
        )

    ticket_payload = {
        "ticket_id":   str(ticket["ticket_id"]),
        "description": str(ticket["description"]),
        "order_id":    str(ticket["order_id"]),
    }
    description = ticket_payload["description"]
    order_id    = ticket_payload["order_id"]

    # ── Step 2: Retrieve Top-3 similar resolved tickets via TF-IDF ───────────
    precedents = find_similar_tickets(description, category="", top_k=3)

    # ── Step 3: Calculate multi-factor confidence & check precedent signals ──
    conf_result = calculate_confidence(precedents)

    # ── Step 4: Priority Decision Evaluation ──────────────────────────────────
    # Rule 1: No precedents found
    if not precedents:
        return _build_result(
            ticket_payload=ticket_payload,
            status=DecisionStatus.HUMAN_REVIEW,
            confidence=0.0,
            action=None,
            reason_code="NO_PRECEDENTS_FOUND",
            order_data={},
            precedents=[],
        )

    # Rule 2: Weak Similarity (top match < 0.40 or avg < 0.30)
    if conf_result.reason_code == "WEAK_SIMILARITY":
        return _build_result(
            ticket_payload=ticket_payload,
            status=DecisionStatus.HUMAN_REVIEW,
            confidence=conf_result.score,
            action=conf_result.dominant_action,
            reason_code="WEAK_SIMILARITY",
            order_data={},
            precedents=_serialize_precedents(precedents),
        )

    # Rule 3: Conflicting Actions (top 3 split with no majority)
    if conf_result.reason_code == "CONFLICTING_ACTIONS":
        return _build_result(
            ticket_payload=ticket_payload,
            status=DecisionStatus.HUMAN_REVIEW,
            confidence=conf_result.score,
            action=conf_result.dominant_action,
            reason_code="CONFLICTING_ACTIONS",
            order_data={},
            precedents=_serialize_precedents(precedents),
        )

    # Rule 4: Order Policy Validation
    proposed_action = conf_result.dominant_action or "unknown"
    policy = validate_order_action(order_id, proposed_action)

    if not policy.is_valid:
        return _build_result(
            ticket_payload=ticket_payload,
            status=DecisionStatus.HUMAN_REVIEW,
            confidence=conf_result.score,
            action=proposed_action,
            reason_code=policy.reason_code or f"POLICY_VIOLATION: {policy.violation}",
            order_data=policy.order_data,
            precedents=_serialize_precedents(precedents),
        )

    # Rule 5: Confidence below auto-resolve threshold
    if conf_result.score < MIN_AUTO_RESOLVE_CONFIDENCE:
        return _build_result(
            ticket_payload=ticket_payload,
            status=DecisionStatus.HUMAN_REVIEW,
            confidence=conf_result.score,
            action=proposed_action,
            reason_code="LOW_CONFIDENCE",
            order_data=policy.order_data,
            precedents=_serialize_precedents(precedents),
        )

    # ── Rule 6: All checks passed → AUTO_RESOLVE ──────────────────────────────
    return _build_result(
        ticket_payload=ticket_payload,
        status=DecisionStatus.AUTO_RESOLVE,
        confidence=conf_result.score,
        action=proposed_action,
        reason_code="STRONG_EVIDENCE",
        order_data=policy.order_data,
        precedents=_serialize_precedents(precedents),
    )


# ── Serialization Helpers ────────────────────────────────────────────────────

def _serialize_precedents(precedents) -> list[dict]:
    return [
        {
            "ticket_id":       p.ticket_id,
            "similarity":      p.similarity,
            "action":          p.action,
            "resolution_note": p.resolution_note,
            "csat":            p.csat,
        }
        for p in precedents
    ]


def _build_result(
    ticket_payload: dict,
    status: DecisionStatus,
    confidence: float,
    action: str | None,
    reason_code: str,
    order_data: dict,
    precedents: list,
) -> dict:
    clean_order = {}
    for k, v in order_data.items():
        if v is None:
            clean_order[k] = None
        else:
            try:
                import math
                if isinstance(v, float) and math.isnan(v):
                    clean_order[k] = None
                elif hasattr(v, "item"):
                    clean_order[k] = v.item()
                else:
                    clean_order[k] = v
            except (TypeError, ValueError):
                clean_order[k] = str(v)

    return {
        "ticket": ticket_payload,
        "decision": {
            "status":      status.value,
            "confidence":  round(float(confidence), 4),
            "action":      action,
            "reason_code": reason_code,
        },
        "order":      clean_order,
        "precedents": precedents,
    }