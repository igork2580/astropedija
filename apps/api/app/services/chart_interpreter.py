"""AI-powered chart interpretation — generates per-planet interpretations in Serbian."""

from app.services import ai_service


async def interpret_planet(planet_name: str, sign: str, house: int, retrograde: bool) -> str:
    """Generate a 2-3 sentence interpretation for a single planet placement."""
    retro_note = " (retrogradna)" if retrograde else ""
    prompt = (
        f"Napiši kratku interpretaciju (2-3 rečenice) za sledeći položaj u natalnoj karti:\n"
        f"Planeta: {planet_name}{retro_note}\n"
        f"Znak: {sign}\n"
        f"Kuća: {house}. kuća\n\n"
        f"Objasni šta ovaj položaj znači za osobu — njihov karakter, talente ili izazove. "
        f"Budi konkretan i koristan, ne generičan."
    )
    return await ai_service.generate(prompt, max_tokens=256)


async def interpret_chart(planets: list[dict]) -> list[dict]:
    """Generate interpretations for all planets in a chart.

    Each planet dict should have: name, sign, house, retrograde.
    Returns the same list with an added 'interpretation' field.
    """
    results = []
    for p in planets:
        interpretation = await interpret_planet(
            planet_name=p["name"],
            sign=p["sign"],
            house=p["house"],
            retrograde=p.get("retrograde", False),
        )
        results.append({**p, "interpretation": interpretation})
    return results
