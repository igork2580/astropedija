"""Transit Alert Service — detects upcoming sign ingresses,
retrograde stations, and major planetary aspects."""

from datetime import datetime, timedelta
from kerykeion import AstrologicalSubject

PLANET_NAMES_SR = {
    "Sun": "Sunce", "Moon": "Mesec", "Mercury": "Merkur", "Venus": "Venera",
    "Mars": "Mars", "Jupiter": "Jupiter", "Saturn": "Saturn", "Uranus": "Uran",
    "Neptune": "Neptun", "Pluto": "Pluton",
}

SIGN_NAMES_SR = {
    "Ari": "Ovan", "Tau": "Bik", "Gem": "Blizanci", "Can": "Rak",
    "Leo": "Lav", "Vir": "Devica", "Lib": "Vaga", "Sco": "Skorpija",
    "Sag": "Strelac", "Cap": "Jarac", "Aqu": "Vodolija", "Pis": "Ribe",
}

PLANET_ATTRS = ["sun", "moon", "mercury", "venus", "mars",
                "jupiter", "saturn", "uranus", "neptune", "pluto"]


def _get_positions(dt: datetime):
    """Get planet positions for a given datetime."""
    subject = AstrologicalSubject(
        "Transit",
        dt.year, dt.month, dt.day, dt.hour, dt.minute,
        city="Belgrade", lng=20.4489, lat=44.7866, tz_str="Europe/Belgrade",
    )
    positions = {}
    for attr in PLANET_ATTRS:
        p = getattr(subject, attr, None)
        if p:
            positions[attr] = {
                "name": PLANET_NAMES_SR.get(p.name, p.name),
                "sign": SIGN_NAMES_SR.get(p.sign, p.sign),
                "degree": round(p.position, 2),
                "retrograde": getattr(p, "retrograde", False),
            }
    return positions


def get_upcoming_transits(days_ahead: int = 7) -> list[dict]:
    """Detect noteworthy transits in the next N days."""
    alerts: list[dict] = []
    now = datetime.now()
    today_positions = _get_positions(now)

    for day_offset in range(1, days_ahead + 1):
        future_dt = now + timedelta(days=day_offset)
        future_positions = _get_positions(future_dt)
        target_date = future_dt.strftime("%d.%m.%Y")

        for attr in PLANET_ATTRS:
            if attr not in today_positions or attr not in future_positions:
                continue

            curr = today_positions[attr]
            fut = future_positions[attr]
            planet_name = curr["name"]

            # Sign ingress detection
            if curr["sign"] != fut["sign"]:
                alerts.append({
                    "type": "ingress",
                    "date": target_date,
                    "days_until": day_offset,
                    "title": f"{planet_name} ulazi u znak {fut['sign']}",
                    "description": f"{planet_name} prelazi iz znaka {curr['sign']} u {fut['sign']}.",
                    "planet": planet_name,
                })

            # Retrograde station detection
            if curr["retrograde"] != fut["retrograde"]:
                if fut["retrograde"]:
                    alerts.append({
                        "type": "retrograde",
                        "date": target_date,
                        "days_until": day_offset,
                        "title": f"{planet_name} retrograda",
                        "description": f"{planet_name} počinje retrogradno kretanje u znaku {fut['sign']}.",
                        "planet": planet_name,
                    })
                else:
                    alerts.append({
                        "type": "direct",
                        "date": target_date,
                        "days_until": day_offset,
                        "title": f"{planet_name} direktno",
                        "description": f"{planet_name} se vraća na direktno kretanje u znaku {fut['sign']}.",
                        "planet": planet_name,
                    })

        # Update today_positions for next iteration comparison
        today_positions = future_positions

    # Sort by days_until
    alerts.sort(key=lambda a: a["days_until"])
    return alerts
