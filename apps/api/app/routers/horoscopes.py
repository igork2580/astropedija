"""Horoscope endpoints — get and generate daily/weekly/monthly horoscopes."""

from datetime import date, timedelta

from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db.models import Horoscope
from app.models.schemas import HoroscopeResponse
from app.services.horoscope_generator import (
    generate_horoscopes_if_missing,
    ZODIAC_SIGNS,
)

router = APIRouter()

VALID_TYPES = {"daily", "weekly", "monthly"}


def _get_period(horo_type: str, target: date | None = None) -> tuple[date, date]:
    """Return (period_start, period_end) for a given horoscope type."""
    if target is None:
        target = date.today()
    if horo_type == "daily":
        return target, target
    elif horo_type == "weekly":
        # Week starts Monday
        start = target - timedelta(days=target.weekday())
        return start, start + timedelta(days=6)
    else:  # monthly
        start = target.replace(day=1)
        # Last day of month
        if target.month == 12:
            end = target.replace(year=target.year + 1, month=1, day=1) - timedelta(days=1)
        else:
            end = target.replace(month=target.month + 1, day=1) - timedelta(days=1)
        return start, end


@router.get("/{horo_type}/{sign}", response_model=HoroscopeResponse)
async def get_horoscope(
    horo_type: str = Path(..., pattern="^(daily|weekly|monthly)$"),
    sign: str = Path(...),
    db: AsyncSession = Depends(get_db),
):
    if sign not in ZODIAC_SIGNS:
        raise HTTPException(status_code=404, detail=f"Nepoznat znak: {sign}")

    period_start, period_end = _get_period(horo_type)

    result = await db.execute(
        select(Horoscope).where(
            Horoscope.sign == sign,
            Horoscope.type == horo_type,
            Horoscope.period_start == period_start,
        )
    )
    horoscope = result.scalar_one_or_none()

    if horoscope is None:
        return HoroscopeResponse(
            sign=sign,
            type=horo_type,
            content="Horoskop za ovaj period ce uskoro biti dostupan. Vratite se malo kasnije.",
            period_start=str(period_start),
            period_end=str(period_end),
        )

    return HoroscopeResponse(
        sign=horoscope.sign,
        type=horoscope.type,
        content=horoscope.content,
        period_start=str(horoscope.period_start),
        period_end=str(horoscope.period_end),
    )


@router.post("/generate/{horo_type}")
async def generate_horoscopes(
    horo_type: str = Path(..., pattern="^(daily|weekly|monthly)$"),
    secret: str = Query(...),
    db: AsyncSession = Depends(get_db),
):
    """Generate horoscopes for all 12 signs. Protected by a secret query param."""
    from app.config import settings
    if secret != settings.jwt_secret:
        raise HTTPException(status_code=403, detail="Invalid secret")

    count = await generate_horoscopes_if_missing(db, horo_type)
    return {"generated": count, "type": horo_type}
