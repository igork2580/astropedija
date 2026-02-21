from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    PlanetPositionRequest,
    PlanetPositionResponse,
    AscendantResponse,
    SunAscMoonResponse,
)
from app.services.planet_service import (
    get_planet_position,
    get_ascendant,
    get_sun_asc_moon,
)

router = APIRouter()


@router.post("/planet-position", response_model=PlanetPositionResponse)
async def planet_position(data: PlanetPositionRequest):
    try:
        return get_planet_position(
            data.planet,
            data.year, data.month, data.day,
            data.hour, data.minute,
            data.latitude, data.longitude, data.timezone,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/ascendant", response_model=AscendantResponse)
async def ascendant(data: PlanetPositionRequest):
    try:
        return get_ascendant(
            data.year, data.month, data.day,
            data.hour, data.minute,
            data.latitude, data.longitude, data.timezone,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/sun-asc-moon", response_model=SunAscMoonResponse)
async def sun_asc_moon(data: PlanetPositionRequest):
    try:
        return get_sun_asc_moon(
            data.year, data.month, data.day,
            data.hour, data.minute,
            data.latitude, data.longitude, data.timezone,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/midheaven", response_model=AscendantResponse)
async def midheaven(data: PlanetPositionRequest):
    try:
        from kerykeion import AstrologicalSubject
        from app.services.chart_service import _translate_sign

        subject = AstrologicalSubject(
            "Korisnik", data.year, data.month, data.day,
            data.hour, data.minute,
            city="Belgrade", lng=data.longitude, lat=data.latitude,
            tz_str=data.timezone,
        )
        house_10 = getattr(subject, "tenth_house", None)
        if house_10:
            return AscendantResponse(
                sign=_translate_sign(house_10.sign),
                degree=round(house_10.position, 2),
            )
        return AscendantResponse(sign="", degree=0)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
