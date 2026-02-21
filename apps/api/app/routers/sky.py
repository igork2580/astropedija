from datetime import datetime
from fastapi import APIRouter, Query
from app.models.schemas import CurrentSkyResponse, CurrentSkyPlanet, MoonPhaseResponse
from app.services.chart_service import _translate_sign, _translate_planet, PLANET_ATTRS
from app.services.transit_alert_service import get_upcoming_transits
from app.config import settings

router = APIRouter()


@router.get("/current", response_model=CurrentSkyResponse)
async def current_sky(
    lat: float = Query(default=settings.default_latitude),
    lng: float = Query(default=settings.default_longitude),
    tz: str = Query(default=settings.default_timezone),
):
    from kerykeion import AstrologicalSubject

    now = datetime.now()
    subject = AstrologicalSubject(
        "Trenutno nebo", now.year, now.month, now.day, now.hour, now.minute,
        city="Belgrade", lng=lng, lat=lat, tz_str=tz,
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

    return CurrentSkyResponse(
        planets=planets,
        timestamp=now.isoformat(),
    )


@router.get("/transits/upcoming")
async def upcoming_transits(days: int = Query(default=7, ge=1, le=30)):
    """Get upcoming transit events (sign ingresses, retrograde stations)."""
    return get_upcoming_transits(days_ahead=days)


@router.get("/moon-phases", response_model=list[MoonPhaseResponse])
async def moon_phases(
    year: int = Query(default=2026),
    month: int = Query(default=1, ge=1, le=12),
):
    # Placeholder - will be populated from DB or calculated
    return []
