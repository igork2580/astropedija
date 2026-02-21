"""Aspect pattern detection — Grand Trine, T-Square, Grand Cross, Yod, Stellium, Kite."""

from dataclasses import dataclass


@dataclass
class AspectPattern:
    name: str
    name_sr: str
    planets: list[str]
    description: str


def _find_aspects_between(aspects: list[dict], p1: str, p2: str, target: str) -> dict | None:
    """Find a specific aspect type between two planets."""
    for a in aspects:
        if a.get("aspect") == target:
            names = {a["planet1"], a["planet2"]}
            if p1 in names and p2 in names:
                return a
    return None


def _get_trine_partners(planet: str, aspects: list[dict]) -> list[str]:
    """Get all planets in trine to the given planet."""
    partners = []
    for a in aspects:
        if a.get("aspect") == "Trigon":
            if a["planet1"] == planet:
                partners.append(a["planet2"])
            elif a["planet2"] == planet:
                partners.append(a["planet1"])
    return partners


def _get_square_partners(planet: str, aspects: list[dict]) -> list[str]:
    partners = []
    for a in aspects:
        if a.get("aspect") == "Kvadrat":
            if a["planet1"] == planet:
                partners.append(a["planet2"])
            elif a["planet2"] == planet:
                partners.append(a["planet1"])
    return partners


def _get_opposition_partners(planet: str, aspects: list[dict]) -> list[str]:
    partners = []
    for a in aspects:
        if a.get("aspect") == "Opozicija":
            if a["planet1"] == planet:
                partners.append(a["planet2"])
            elif a["planet2"] == planet:
                partners.append(a["planet1"])
    return partners


def detect_patterns(planets: list[dict], aspects: list[dict]) -> list[dict]:
    """Detect major aspect patterns in a chart.

    Returns list of dicts with: name, name_sr, planets, description.
    """
    patterns: list[AspectPattern] = []
    planet_names = [p["name"] for p in planets]

    # --- Grand Trine: three mutual trines ---
    checked_trines: set[tuple] = set()
    for p in planet_names:
        trine_partners = _get_trine_partners(p, aspects)
        for i, t1 in enumerate(trine_partners):
            for t2 in trine_partners[i + 1:]:
                if _find_aspects_between(aspects, t1, t2, "Trigon"):
                    key = tuple(sorted([p, t1, t2]))
                    if key not in checked_trines:
                        checked_trines.add(key)
                        patterns.append(AspectPattern(
                            name="Grand Trine",
                            name_sr="Veliki Trigon",
                            planets=list(key),
                            description="Harmoničan tok energije između tri planete. Označava prirodne talente i oblasti u kojima sve teče lako.",
                        ))

    # --- T-Square: two squares + one opposition ---
    checked_tsquares: set[tuple] = set()
    for p in planet_names:
        sq_partners = _get_square_partners(p, aspects)
        for i, s1 in enumerate(sq_partners):
            for s2 in sq_partners[i + 1:]:
                if _find_aspects_between(aspects, s1, s2, "Opozicija"):
                    key = tuple(sorted([p, s1, s2]))
                    if key not in checked_tsquares:
                        checked_tsquares.add(key)
                        patterns.append(AspectPattern(
                            name="T-Square",
                            name_sr="T-Kvadrat",
                            planets=list(key),
                            description="Dinamičan obrazac koji stvara napetost i motivaciju za akciju. Fokusna planeta (vrh T) pokazuje oblast rasta.",
                        ))

    # --- Grand Cross: four squares + two oppositions ---
    checked_crosses: set[tuple] = set()
    for p in planet_names:
        sq = _get_square_partners(p, aspects)
        opp = _get_opposition_partners(p, aspects)
        for o in opp:
            o_sq = _get_square_partners(o, aspects)
            common = set(sq) & set(o_sq)
            if len(common) >= 2:
                cross_planets = sorted([p, o] + list(common)[:2])
                key = tuple(cross_planets)
                if key not in checked_crosses:
                    checked_crosses.add(key)
                    patterns.append(AspectPattern(
                        name="Grand Cross",
                        name_sr="Veliki Krst",
                        planets=list(key),
                        description="Intenzivan obrazac sa četiri planete u kvadratima i opozicijama. Donosi izazove, ali i ogromnu snagu kada se energija integriše.",
                    ))

    # --- Stellium: 3+ planets in same sign ---
    sign_groups: dict[str, list[str]] = {}
    for p in planets:
        sign = p.get("sign", "")
        if sign not in sign_groups:
            sign_groups[sign] = []
        sign_groups[sign].append(p["name"])
    for sign, group in sign_groups.items():
        if len(group) >= 3:
            patterns.append(AspectPattern(
                name="Stellium",
                name_sr="Stelij",
                planets=group,
                description=f"Koncentracija {len(group)} planeta u znaku {sign}. Pojačava osobine tog znaka i čini ga dominantnim u karti.",
            ))

    return [
        {"name": p.name, "name_sr": p.name_sr, "planets": p.planets, "description": p.description}
        for p in patterns
    ]
