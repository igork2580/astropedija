from fastapi import APIRouter, HTTPException
from app.models.schemas import BirthDataRequest, DualBirthDataRequest, ChartResponse
from app.services.chart_service import (
    create_natal_chart,
    create_synastry_chart,
    create_transit_chart,
)
from app.services.pattern_service import detect_patterns
from app.services.compatibility_service import calculate_compatibility
from app.services.progression_service import create_progressed_chart
from app.services.davison_service import create_davison_chart

router = APIRouter()


@router.post("/natal", response_model=ChartResponse)
async def natal_chart(data: BirthDataRequest):
    try:
        return create_natal_chart(
            data.name, data.year, data.month, data.day,
            data.hour, data.minute, data.latitude, data.longitude,
            data.timezone, data.city,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/synastry", response_model=ChartResponse)
async def synastry_chart(data: DualBirthDataRequest):
    try:
        p1, p2 = data.person1, data.person2
        return create_synastry_chart(
            p1.name, p1.year, p1.month, p1.day, p1.hour, p1.minute,
            p1.latitude, p1.longitude, p1.timezone, p1.city,
            p2.name, p2.year, p2.month, p2.day, p2.hour, p2.minute,
            p2.latitude, p2.longitude, p2.timezone, p2.city,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/composite", response_model=ChartResponse)
async def composite_chart(data: DualBirthDataRequest):
    try:
        # Composite uses midpoints - for now delegate to synastry
        p1, p2 = data.person1, data.person2
        return create_synastry_chart(
            p1.name, p1.year, p1.month, p1.day, p1.hour, p1.minute,
            p1.latitude, p1.longitude, p1.timezone, p1.city,
            p2.name, p2.year, p2.month, p2.day, p2.hour, p2.minute,
            p2.latitude, p2.longitude, p2.timezone, p2.city,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/transit", response_model=ChartResponse)
async def transit_chart(data: BirthDataRequest):
    try:
        return create_transit_chart(
            data.name, data.year, data.month, data.day,
            data.hour, data.minute, data.latitude, data.longitude,
            data.timezone, data.city,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/natal-full")
async def natal_chart_full(data: BirthDataRequest):
    """Natal chart with aspect pattern detection."""
    try:
        result = create_natal_chart(
            data.name, data.year, data.month, data.day,
            data.hour, data.minute, data.latitude, data.longitude,
            data.timezone, data.city,
        )
        planets_dicts = [
            {"name": p.name, "sign": p.sign, "degree": p.degree, "house": p.house, "retrograde": p.retrograde}
            for p in result.chart_data.planets
        ]
        aspects_dicts = [
            {"planet1": a.planet1, "planet2": a.planet2, "aspect": a.aspect, "angle": a.angle, "orb": a.orb}
            for a in result.chart_data.aspects
        ]
        patterns = detect_patterns(planets_dicts, aspects_dicts)
        return {
            "chart_data": result.chart_data,
            "svg": result.svg,
            "patterns": patterns,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/compatibility/{sign1}/{sign2}")
async def compatibility_score(sign1: str, sign2: str):
    """Get compatibility score between two zodiac signs."""
    try:
        return calculate_compatibility(sign1, sign2)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/solar-return", response_model=ChartResponse)
async def solar_return_chart(data: BirthDataRequest):
    try:
        # Solar return = natal chart for current year's birthday
        from datetime import datetime
        now = datetime.now()
        return create_natal_chart(
            data.name, now.year, data.month, data.day,
            data.hour, data.minute, data.latitude, data.longitude,
            data.timezone, data.city,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/progressed", response_model=ChartResponse)
async def progressed_chart(data: BirthDataRequest):
    """Secondary progressed chart (day-for-a-year)."""
    try:
        return create_progressed_chart(
            data.name, data.year, data.month, data.day,
            data.hour, data.minute, data.latitude, data.longitude,
            data.timezone, data.city,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/davison", response_model=ChartResponse)
async def davison_chart(data: DualBirthDataRequest):
    """Davison relationship chart (midpoint in time/space)."""
    try:
        p1, p2 = data.person1, data.person2
        return create_davison_chart(
            p1.name, p1.year, p1.month, p1.day, p1.hour, p1.minute,
            p1.latitude, p1.longitude, p1.timezone, p1.city,
            p2.name, p2.year, p2.month, p2.day, p2.hour, p2.minute,
            p2.latitude, p2.longitude, p2.timezone, p2.city,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
