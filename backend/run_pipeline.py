"""
run_pipeline.py
Standalone test runner - processes all new tickets, evaluates decisions,
prints summary statistics, and saves full JSON output.

Usage:
    cd backend
    python -X utf8 run_pipeline.py
"""

import json
import sys
import io
from pathlib import Path

# Force UTF-8 stdout so box-drawing / emoji chars don't crash on Windows cp1252
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# Make sure 'app' package is on the path when running from backend/
sys.path.insert(0, str(Path(__file__).parent))

from app.services.decision_engine import process_ticket
from app.services.data_loader import load_new_tickets


def main():
    new_tickets = load_new_tickets()
    ticket_ids = new_tickets["ticket_id"].tolist()

    print("=" * 80)
    print(f"ZEPTO TICKET INTELLIGENCE PIPELINE  -  EVALUATING {len(ticket_ids)} REAL TICKETS")
    print("=" * 80)

    results = []
    reason_code_counts = {}
    status_counts = {"AUTO_RESOLVE": 0, "HUMAN_REVIEW": 0}

    for tid in ticket_ids:
        result = process_ticket(tid)
        results.append(result)

        dec = result["decision"]
        st = dec["status"]
        rc = dec["reason_code"]

        status_counts[st] = status_counts.get(st, 0) + 1
        reason_code_counts[rc] = reason_code_counts.get(rc, 0) + 1

        print(f"\n{'─'*70}")
        print(f"Ticket : {tid}  |  {st}  |  conf={dec['confidence']:.4f}")
        print(f"  desc : {result['ticket']['description']}")
        print(f"  action     : {dec['action']}")
        print(f"  reason_code: {rc}")
        if result["precedents"]:
            print(f"  top precedents:")
            for p in result["precedents"]:
                print(f"    [{p['ticket_id']}] sim={p['similarity']:.4f} "
                      f"action={p['action']}  csat={p['csat']}")

    # ── Summary Statistics ───────────────────────────────────────────────────
    print(f"\n{'='*80}")
    print("SUMMARY STATISTICS")
    print(f"{'='*80}")
    print(f"  AUTO_RESOLVE : {status_counts['AUTO_RESOLVE']} ({status_counts['AUTO_RESOLVE']/len(ticket_ids)*100:.1f}%)")
    print(f"  HUMAN_REVIEW : {status_counts['HUMAN_REVIEW']} ({status_counts['HUMAN_REVIEW']/len(ticket_ids)*100:.1f}%)")
    print(f"  TOTAL        : {len(ticket_ids)}")

    print(f"\n  REASON CODE BREAKDOWN:")
    for code, count in sorted(reason_code_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"    - {code}: {count}")

    # ── Save Full Output JSON ────────────────────────────────────────────────
    out_path = Path(__file__).parent / "data" / "pipeline_output.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, default=str)
    print(f"\n  Full JSON saved → {out_path}")

    # ── Print 3 Sample Tickets for Person 2 Integration ──────────────────────
    print(f"\n{'='*80}")
    print("SAMPLE JSON OUTPUT (first 3 tickets) — ready for Person 2 integration")
    print(f"{'='*80}")
    print(json.dumps(results[:3], indent=2, default=str))


if __name__ == "__main__":
    main()
