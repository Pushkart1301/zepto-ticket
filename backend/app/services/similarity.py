"""
similarity.py
Improved TF-IDF vectorisation + cosine similarity to find top-K historical precedents.

Corpus: resolved_tickets.csv
Query:  new_tickets.csv descriptions

Key field mapping (actual CSV columns):
  resolved_tickets → category + description → TF-IDF corpus text
  resolved_tickets → resolution_action      → action in Precedent
  resolved_tickets → resolution_note        → resolution_note in Precedent
  resolved_tickets → csat                   → csat in Precedent

Improvements:
  - Text normalization & cleaning (lowercasing, punctuation removal)
  - English stop-words removal to eliminate noise matches ("in", "my", "from")
  - Unigram, bigram, & trigram features (ngram_range=(1, 3))
  - Sublinear term frequency scaling + L2 normalization
"""

from __future__ import annotations

import re
import numpy as np
import pandas as pd
from dataclasses import dataclass
from typing import List

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity as sklearn_cosine

from .data_loader import load_resolved_tickets


@dataclass
class Precedent:
    ticket_id: str
    similarity: float
    action: str          # = resolution_action from resolved_tickets
    resolution_note: str
    csat: float | None


# ── Module-level cache so we fit TF-IDF once per process ─────────────────────
_vectorizer: TfidfVectorizer | None = None
_matrix = None          # sparse TF-IDF matrix of resolved corpus
_resolved_df: pd.DataFrame | None = None


def _clean_text(text: str) -> str:
    """Normalize text: lowercase, remove non-alphanumeric punctuation, clean spaces."""
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def _build_index() -> None:
    """Fit TF-IDF on all resolved ticket descriptions. Idempotent."""
    global _vectorizer, _matrix, _resolved_df
    if _vectorizer is not None:
        return

    _resolved_df = load_resolved_tickets()

    # Combine category + description for richer signal
    corpus_raw = (
        _resolved_df["category"].fillna("") + " " +
        _resolved_df["description"].fillna("")
    ).tolist()

    corpus = [_clean_text(doc) for doc in corpus_raw]

    _vectorizer = TfidfVectorizer(
        strip_accents="unicode",
        lowercase=True,
        stop_words="english",
        ngram_range=(1, 3),     # unigrams, bigrams, trigrams
        min_df=1,
        max_df=0.95,
        sublinear_tf=True,      # log(1+tf) dampening
        norm="l2",
    )
    _matrix = _vectorizer.fit_transform(corpus)


def find_similar_tickets(
    query_text: str,
    category: str = "",
    top_k: int = 3,
) -> List[Precedent]:
    """
    Vectorise query_text with the fitted TF-IDF model and return the
    top_k most similar resolved tickets as Precedent objects.

    Never returns fake precedents — results come exclusively from
    the resolved_tickets CSV.
    """
    _build_index()

    combined_query = _clean_text(f"{category} {query_text}")
    query_vec = _vectorizer.transform([combined_query])

    sims = sklearn_cosine(query_vec, _matrix).flatten()

    top_indices = np.argsort(sims)[::-1][:top_k]

    precedents: List[Precedent] = []
    for idx in top_indices:
        sim_score = float(sims[idx])
        if sim_score < 0.01:
            continue
        row = _resolved_df.iloc[idx]
        csat_val = row.get("csat")
        precedents.append(
            Precedent(
                ticket_id=str(row["ticket_id"]),
                similarity=round(sim_score, 4),
                action=str(row["resolution_action"]),
                resolution_note=str(row["resolution_note"]),
                csat=float(csat_val) if pd.notna(csat_val) else None,
            )
        )

    return precedents


def rebuild_index() -> None:
    """Force TF-IDF rebuild (call after loading fresh CSVs)."""
    global _vectorizer, _matrix, _resolved_df
    _vectorizer = _matrix = _resolved_df = None
    _build_index()