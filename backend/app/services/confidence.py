"""
confidence.py
Calculates a robust, explainable confidence score from precedent evidence.

Score components (weighted combination):
  1. top1_similarity  – similarity score of the top-1 precedent (weight 0.40)
  2. avg_similarity   – mean similarity of top-3 precedents (weight 0.20)
  3. action_consensus – proportion of top-3 precedents recommending dominant action (weight 0.25)
  4. csat_factor      – normalized mean CSAT (1-5 scale mapped to 0-1) (weight 0.15)

Threshold & Reason Rules:
  - top1_sim < 0.40 or avg_sim < 0.30 → WEAK_SIMILARITY
  - consensus < 0.60 (3-way action split) → CONFLICTING_ACTIONS
  - score >= 0.65 → STRONG_EVIDENCE
  - score < 0.65 → LOW_CONFIDENCE
"""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass
from typing import List

from .similarity import Precedent

# ── Thresholds ────────────────────────────────────────────────────────────────
MIN_AUTO_RESOLVE_CONFIDENCE = 0.65     # Overall threshold required for AUTO_RESOLVE
MIN_TOP1_SIMILARITY = 0.40            # Below this → WEAK_SIMILARITY
MIN_AVG_SIMILARITY = 0.30             # Below this → WEAK_SIMILARITY
MIN_CONSENSUS = 0.60                  # Below this (e.g. 1/3 split) → CONFLICTING_ACTIONS

# Component weights (Sum = 1.0)
W_TOP1_SIM  = 0.40
W_AVG_SIM   = 0.20
W_CONSENSUS = 0.25
W_CSAT      = 0.15

CSAT_MAX = 5.0   # Rating scale is 1 to 5


@dataclass
class ConfidenceResult:
    score: float                # 0.0 – 1.0
    top1_similarity: float
    avg_similarity: float
    action_consensus: float
    avg_csat: float | None
    dominant_action: str | None
    reason_code: str


def calculate_confidence(precedents: List[Precedent]) -> ConfidenceResult:
    """
    Derive confidence from real historical precedents.
    Returns a ConfidenceResult with score and explicit reason_code.
    """
    if not precedents:
        return ConfidenceResult(
            score=0.0,
            top1_similarity=0.0,
            avg_similarity=0.0,
            action_consensus=0.0,
            avg_csat=None,
            dominant_action=None,
            reason_code="NO_PRECEDENTS_FOUND",
        )

    n = len(precedents)
    top1_sim = precedents[0].similarity
    avg_sim = sum(p.similarity for p in precedents) / n

    # 2. Action consensus (fraction agreeing on top action)
    action_counts = Counter(p.action for p in precedents)
    dominant_action, dominant_count = action_counts.most_common(1)[0]
    consensus = dominant_count / n

    # 3. CSAT factor
    csat_vals = [p.csat for p in precedents if p.csat is not None]
    avg_csat_raw = sum(csat_vals) / len(csat_vals) if csat_vals else None
    csat_norm = (avg_csat_raw / CSAT_MAX) if avg_csat_raw is not None else 0.70

    # Calculate weighted confidence score
    raw_score = (
        W_TOP1_SIM  * top1_sim +
        W_AVG_SIM   * avg_sim +
        W_CONSENSUS * consensus +
        W_CSAT      * csat_norm
    )
    score = round(min(max(raw_score, 0.0), 1.0), 4)

    # Determine explicit reason code
    if top1_sim < MIN_TOP1_SIMILARITY or avg_sim < MIN_AVG_SIMILARITY:
        reason_code = "WEAK_SIMILARITY"
    elif consensus < MIN_CONSENSUS:
        reason_code = "CONFLICTING_ACTIONS"
    elif score >= MIN_AUTO_RESOLVE_CONFIDENCE:
        reason_code = "STRONG_EVIDENCE"
    else:
        reason_code = "LOW_CONFIDENCE"

    return ConfidenceResult(
        score=score,
        top1_similarity=round(top1_sim, 4),
        avg_similarity=round(avg_sim, 4),
        action_consensus=round(consensus, 4),
        avg_csat=round(avg_csat_raw, 2) if avg_csat_raw is not None else None,
        dominant_action=dominant_action,
        reason_code=reason_code,
    )
