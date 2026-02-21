from fastapi import APIRouter, HTTPException, Path
from app.models.schemas import HoroscopeResponse

router = APIRouter()

VALID_TYPES = {"daily", "weekly", "monthly"}
VALID_SIGNS = {
    "ovan", "bik", "blizanci", "rak", "lav", "devica",
    "vaga", "skorpija", "strelac", "jarac", "vodolija", "ribe",
}


@router.get("/{horo_type}/{sign}", response_model=HoroscopeResponse)
async def get_horoscope(
    horo_type: str = Path(..., pattern="^(daily|weekly|monthly)$"),
    sign: str = Path(...),
):
    if sign not in VALID_SIGNS:
        raise HTTPException(status_code=404, detail=f"Nepoznat znak: {sign}")

    # Placeholder - will be fetched from DB
    return HoroscopeResponse(
        sign=sign,
        type=horo_type,
        content="Horoskop za ovaj period će uskoro biti dostupan.",
        period_start="2026-02-21",
        period_end="2026-02-21",
    )
