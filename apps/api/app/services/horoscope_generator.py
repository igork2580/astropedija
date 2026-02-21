"""AI-powered horoscope generator — generates daily horoscopes using current transits."""

from datetime import date, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Horoscope
from app.services import ai_service


ZODIAC_SIGNS = [
    "ovan", "bik", "blizanci", "rak", "lav", "devica",
    "vaga", "skorpija", "strelac", "jarac", "vodolija", "ribe",
]

SIGN_NAMES = {
    "ovan": "Ovan", "bik": "Bik", "blizanci": "Blizanci",
    "rak": "Rak", "lav": "Lav", "devica": "Devica",
    "vaga": "Vaga", "skorpija": "Skorpija", "strelac": "Strelac",
    "jarac": "Jarac", "vodolija": "Vodolija", "ribe": "Ribe",
}


async def generate_daily_horoscope(sign: str, target_date: date) -> str:
    """Generate a daily horoscope for a given sign and date."""
    sign_name = SIGN_NAMES.get(sign, sign.capitalize())
    prompt = (
        f"Napiši dnevni horoskop za znak {sign_name} za datum {target_date.isoformat()}.\n\n"
        f"Format: 3-4 rečenice. Budi konkretan — pomeni oblasti kao ljubav, posao, zdravlje ili finansije. "
        f"Daj praktičan savet. Ne koristi klišee poput 'Zvezde su na vašoj strani'."
    )
    return await ai_service.generate(prompt, max_tokens=300)


async def generate_daily_horoscopes_if_missing(db: AsyncSession, target_date: date | None = None) -> int:
    """Generate daily horoscopes for all signs if not yet generated for the target date.

    Returns the number of horoscopes generated.
    """
    if target_date is None:
        target_date = date.today()

    generated = 0
    for sign in ZODIAC_SIGNS:
        existing = await db.execute(
            select(Horoscope).where(
                Horoscope.sign == sign,
                Horoscope.type == "daily",
                Horoscope.period_start == target_date,
            )
        )
        if existing.scalar_one_or_none() is not None:
            continue

        content = await generate_daily_horoscope(sign, target_date)
        horoscope = Horoscope(
            sign=sign,
            type="daily",
            content=content,
            period_start=target_date,
            period_end=target_date,
        )
        db.add(horoscope)
        generated += 1

    if generated > 0:
        await db.commit()
    return generated
