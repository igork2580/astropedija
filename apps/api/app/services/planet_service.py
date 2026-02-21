from datetime import datetime

from kerykeion import AstrologicalSubject
from app.models.schemas import PlanetPositionResponse, AscendantResponse, SunAscMoonResponse, CurrentSkyPlanet
from app.services.chart_service import _translate_sign, _translate_planet, PLANET_ATTRS, HOUSE_NAME_TO_NUM
from app.config import settings


PLANET_SLUG_TO_ATTR = {
    "sunce": "sun", "mesec": "moon", "merkur": "mercury",
    "venera": "venus", "mars": "mars", "jupiter": "jupiter",
    "saturn": "saturn", "uran": "uranus", "neptun": "neptune",
    "pluton": "pluto", "severni-mesecov-cvor": "true_north_lunar_node",
    # English names
    "sun": "sun", "moon": "moon", "mercury": "mercury",
    "venus": "venus", "uranus": "uranus", "neptune": "neptune",
    "pluto": "pluto", "true_node": "true_north_lunar_node",
}


def _house_num(val) -> int:
    if isinstance(val, str):
        return HOUSE_NAME_TO_NUM.get(val, 0)
    return val or 0


def _create_subject(
    year: int, month: int, day: int,
    hour: int, minute: int,
    lat: float, lng: float, tz: str, city: str = "",
) -> AstrologicalSubject:
    return AstrologicalSubject(
        "Korisnik", year, month, day, hour, minute,
        city=city or "Belgrade", lng=lng, lat=lat, tz_str=tz,
    )


def get_planet_position(
    planet_slug: str,
    year: int, month: int, day: int,
    hour: int, minute: int,
    lat: float, lng: float, tz: str, city: str = "",
) -> PlanetPositionResponse:
    subject = _create_subject(year, month, day, hour, minute, lat, lng, tz, city)
    attr_name = PLANET_SLUG_TO_ATTR.get(planet_slug.lower(), planet_slug)
    planet_obj = getattr(subject, attr_name, None)
    if planet_obj is None:
        raise ValueError(f"Unknown planet: {planet_slug}")

    return PlanetPositionResponse(
        planet=_translate_planet(planet_obj.name),
        sign=_translate_sign(planet_obj.sign),
        degree=round(planet_obj.position, 2),
        house=_house_num(getattr(planet_obj, "house", 0)),
        retrograde=bool(getattr(planet_obj, "retrograde", False)),
    )


def get_ascendant(
    year: int, month: int, day: int,
    hour: int, minute: int,
    lat: float, lng: float, tz: str, city: str = "",
) -> AscendantResponse:
    subject = _create_subject(year, month, day, hour, minute, lat, lng, tz, city)
    first_house = getattr(subject, "first_house", None)
    if first_house:
        return AscendantResponse(
            sign=_translate_sign(first_house.sign),
            degree=round(first_house.position, 2),
        )
    return AscendantResponse(sign="", degree=0)


def get_sun_asc_moon(
    year: int, month: int, day: int,
    hour: int, minute: int,
    lat: float, lng: float, tz: str, city: str = "",
) -> SunAscMoonResponse:
    subject = _create_subject(year, month, day, hour, minute, lat, lng, tz, city)

    sun_obj = subject.sun
    moon_obj = subject.moon

    sun = PlanetPositionResponse(
        planet=_translate_planet(sun_obj.name),
        sign=_translate_sign(sun_obj.sign),
        degree=round(sun_obj.position, 2),
        house=_house_num(getattr(sun_obj, "house", 0)),
        retrograde=False,
    )
    moon = PlanetPositionResponse(
        planet=_translate_planet(moon_obj.name),
        sign=_translate_sign(moon_obj.sign),
        degree=round(moon_obj.position, 2),
        house=_house_num(getattr(moon_obj, "house", 0)),
        retrograde=False,
    )
    asc = get_ascendant(year, month, day, hour, minute, lat, lng, tz, city)

    return SunAscMoonResponse(sun=sun, ascendant=asc, moon=moon)


def get_current_sky_positions() -> list[CurrentSkyPlanet]:
    """Get current planetary positions for Belgrade (default location)."""
    now = datetime.now()
    subject = AstrologicalSubject(
        "Trenutno nebo", now.year, now.month, now.day, now.hour, now.minute,
        city="Belgrade",
        lng=settings.default_longitude,
        lat=settings.default_latitude,
        tz_str=settings.default_timezone,
    )
    planets = []
    for attr in PLANET_ATTRS:
        planet_obj = getattr(subject, attr, None)
        if planet_obj is None:
            continue
        planets.append(CurrentSkyPlanet(
            name=_translate_planet(planet_obj.name),
            sign=_translate_sign(planet_obj.sign),
            degree=round(planet_obj.position, 2),
            retrograde=getattr(planet_obj, "retrograde", False),
        ))
    return planets
