"""Zodiac sign compatibility scoring — element, quality, and ruler based."""

SIGN_ELEMENTS = {
    "ovan": "vatra", "lav": "vatra", "strelac": "vatra",
    "bik": "zemlja", "devica": "zemlja", "jarac": "zemlja",
    "blizanci": "vazduh", "vaga": "vazduh", "vodolija": "vazduh",
    "rak": "voda", "skorpija": "voda", "ribe": "voda",
}

SIGN_QUALITIES = {
    "ovan": "kardinalan", "rak": "kardinalan", "vaga": "kardinalan", "jarac": "kardinalan",
    "bik": "fiksan", "lav": "fiksan", "skorpija": "fiksan", "vodolija": "fiksan",
    "blizanci": "mutabilan", "devica": "mutabilan", "strelac": "mutabilan", "ribe": "mutabilan",
}

SIGN_RULERS = {
    "ovan": "mars", "bik": "venera", "blizanci": "merkur",
    "rak": "mesec", "lav": "sunce", "devica": "merkur",
    "vaga": "venera", "skorpija": "pluton", "strelac": "jupiter",
    "jarac": "saturn", "vodolija": "uran", "ribe": "neptun",
}

COMPATIBLE_ELEMENTS = {
    ("vatra", "vatra"): 40, ("vatra", "vazduh"): 35,
    ("zemlja", "zemlja"): 40, ("zemlja", "voda"): 35,
    ("vazduh", "vazduh"): 40, ("vazduh", "vatra"): 35,
    ("voda", "voda"): 40, ("voda", "zemlja"): 35,
    ("vatra", "zemlja"): 15, ("vatra", "voda"): 10,
    ("zemlja", "vazduh"): 15, ("vazduh", "voda"): 10,
}


def _element_score(e1: str, e2: str) -> int:
    """Score element compatibility (0-40 points)."""
    key = (e1, e2) if (e1, e2) in COMPATIBLE_ELEMENTS else (e2, e1)
    return COMPATIBLE_ELEMENTS.get(key, 20)


def _quality_score(q1: str, q2: str) -> int:
    """Score quality compatibility (0-30 points)."""
    if q1 == q2:
        return 15  # Same quality = tension
    return 25  # Different qualities complement


def _ruler_score(r1: str, r2: str) -> int:
    """Score ruler compatibility (0-30 points)."""
    if r1 == r2:
        return 30  # Same ruler = strong affinity
    # Benefic rulers together
    benefics = {"venera", "jupiter"}
    if r1 in benefics and r2 in benefics:
        return 25
    # Malefic rulers together
    malefics = {"mars", "saturn", "pluton"}
    if r1 in malefics and r2 in malefics:
        return 10
    return 18  # Neutral


def calculate_compatibility(sign1: str, sign2: str) -> dict:
    """Calculate compatibility score between two zodiac signs.

    Returns dict with: score (0-100), element_score, quality_score, ruler_score, description.
    """
    sign1 = sign1.lower()
    sign2 = sign2.lower()

    e1 = SIGN_ELEMENTS.get(sign1, "")
    e2 = SIGN_ELEMENTS.get(sign2, "")
    q1 = SIGN_QUALITIES.get(sign1, "")
    q2 = SIGN_QUALITIES.get(sign2, "")
    r1 = SIGN_RULERS.get(sign1, "")
    r2 = SIGN_RULERS.get(sign2, "")

    es = _element_score(e1, e2)
    qs = _quality_score(q1, q2)
    rs = _ruler_score(r1, r2)
    total = es + qs + rs

    if total >= 80:
        desc = "Izvanredna kompatibilnost! Vaše energije se prirodno nadopunjuju."
    elif total >= 60:
        desc = "Dobra kompatibilnost sa jakim potencijalom za harmoničnu vezu."
    elif total >= 40:
        desc = "Umerena kompatibilnost — uspeh zahteva svesno prilagođavanje."
    else:
        desc = "Izazovna kombinacija koja može doneti rast kroz prevazilaženje razlika."

    return {
        "sign1": sign1,
        "sign2": sign2,
        "score": total,
        "element_score": es,
        "quality_score": qs,
        "ruler_score": rs,
        "description": desc,
    }
