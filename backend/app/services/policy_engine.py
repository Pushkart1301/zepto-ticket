"""
policy_engine.py
Order-level policy validation rules.

Validates whether a proposed resolution action is consistent with order context.
Uses actual columns from orders_context.csv:
  order_id, items, value_inr, delivery_time_min, delivery_status

Business Rules:
  1. ORDER_NOT_FOUND: order_id must exist in orders_context.
  2. CANCELLED_ORDER: Cancelled orders cannot receive redelivery or refund actions.
  3. HIGH_VALUE_ORDER: Full refunds or redeliveries on orders >= ₹1000 require human review.
  4. UNHANDLED_SLA_BREACH: Deliveries exceeding 45 mins SLA cannot be resolved with apology_no_action alone.
"""

from __future__ import annotations

from dataclasses import dataclass

from .data_loader import get_order_by_id


# Actions that require the order to be delivered
POST_DELIVERY_ONLY_ACTIONS = {
    "partial_refund", "full_refund", "redelivery",
}

# High-value financial risk limit (INR)
HIGH_VALUE_THRESHOLD_INR = 1000.0

# SLA delay threshold (minutes)
SEVERE_SLA_BREACH_MINUTES = 45.0


@dataclass
class PolicyResult:
    is_valid: bool
    reason_code: str | None     # Detailed policy violation reason_code
    violation: str | None       # Explanatory text for logs / reason details
    order_data: dict            # raw order fields for JSON response


def validate_order_action(order_id: str, proposed_action: str) -> PolicyResult:
    """
    Check whether proposed_action is allowed given the real order state.
    Returns PolicyResult; is_valid=False triggers HUMAN_REVIEW in decision engine.
    """
    order = get_order_by_id(order_id)

    if order is None:
        return PolicyResult(
            is_valid=False,
            reason_code="POLICY_VIOLATION: ORDER_NOT_FOUND",
            violation=f"Order ID '{order_id}' not found in order context database",
            order_data={},
        )

    order_dict = {k: (None if (v != v) else v) for k, v in order.to_dict().items()}
    status = str(order_dict.get("delivery_status", "")).lower()

    # Rule 1: Delivery Status Gating
    if status == "cancelled" and proposed_action in POST_DELIVERY_ONLY_ACTIONS:
        return PolicyResult(
            is_valid=False,
            reason_code="POLICY_VIOLATION: CANCELLED_ORDER",
            violation=(
                f"Action '{proposed_action}' is invalid because order status is 'cancelled'"
            ),
            order_data=order_dict,
        )

    # Rule 2: High-Value Financial Guardrail
    try:
        order_val = float(order_dict.get("value_inr", 0) or 0)
    except (ValueError, TypeError):
        order_val = 0.0

    if order_val >= HIGH_VALUE_THRESHOLD_INR and proposed_action in {"full_refund", "redelivery"}:
        return PolicyResult(
            is_valid=False,
            reason_code="POLICY_VIOLATION: HIGH_VALUE_ORDER",
            violation=(
                f"Order value ₹{order_val:.0f} exceeds auto-resolve limit (₹{HIGH_VALUE_THRESHOLD_INR:.0f}) "
                f"for high-impact action '{proposed_action}'"
            ),
            order_data=order_dict,
        )

    # Rule 3: SLA Breach Compensation Policy
    try:
        deliv_time = float(order_dict.get("delivery_time_min", 0) or 0)
    except (ValueError, TypeError):
        deliv_time = 0.0

    if deliv_time > SEVERE_SLA_BREACH_MINUTES and proposed_action == "apology_no_action":
        return PolicyResult(
            is_valid=False,
            reason_code="POLICY_VIOLATION: UNHANDLED_SLA_BREACH",
            violation=(
                f"Delivery time of {deliv_time:.0f}m exceeds severe SLA limit ({SEVERE_SLA_BREACH_MINUTES:.0f}m); "
                f"apology_no_action is insufficient"
            ),
            order_data=order_dict,
        )

    return PolicyResult(is_valid=True, reason_code=None, violation=None, order_data=order_dict)
