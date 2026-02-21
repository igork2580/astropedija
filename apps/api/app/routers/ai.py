"""AI-powered endpoints — chart interpretation and transit weather."""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.db.database import get_db
from app.services.chart_interpreter import interpret_chart
from app.services.transit_weather import get_or_create_transit_weather


router = APIRouter()


class InterpretRequest(BaseModel):
    planets: list[dict]


class InterpretResponse(BaseModel):
    planets: list[dict]


class TransitWeatherResponse(BaseModel):
    date: str
    content: str
    planetary_data: dict


def _require_api_key():
    if not settings.anthropic_api_key:
        raise HTTPException(
            status_code=503,
            detail="AI servis nije konfigurisan (ANTHROPIC_API_KEY nije postavljen)",
        )


@router.post("/interpret", response_model=InterpretResponse)
async def interpret_chart_endpoint(data: InterpretRequest):
    """Generate AI interpretation for each planet placement."""
    _require_api_key()
    interpreted = await interpret_chart(data.planets)
    return InterpretResponse(planets=interpreted)


@router.get("/transit-weather", response_model=TransitWeatherResponse)
async def transit_weather_endpoint(db: AsyncSession = Depends(get_db)):
    """Get today's astrological weather summary."""
    _require_api_key()
    result = await get_or_create_transit_weather(db)
    return TransitWeatherResponse(**result)
