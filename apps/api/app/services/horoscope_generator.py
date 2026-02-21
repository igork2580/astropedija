"""AI-powered horoscope generator — generates daily/weekly/monthly horoscopes."""

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

SYSTEM_PROMPT = (
    "Ti si iskusan astrolog koji pise horoskope na srpskom jeziku. "
    "Pisi konkretno i prakticno — pomeni oblasti kao ljubav, posao, zdravlje, finansije. "
    "Daj bar jedan konkretan savet. Ne koristi klisee poput 'Zvezde su na vasoj strani' "
    "ili 'Univerzum vam salje poruku'. Svaki horoskop mora biti razlicit od prethodnih. "
    "Ne koristi emoji. Pisi latinicnim pismom bez dijakritika (c umesto c sa kvacicama)."
)


async def _generate_horoscope(sign: str, horo_type: str, period_start: date, period_end: date) -> str:
    """Generate a single horoscope via AI."""
    sign_name = SIGN_NAMES[sign]

    if horo_type == "daily":
        prompt = (
            f"Napisi dnevni horoskop za {sign_name} za {period_start.isoformat()}.\n\n"
            f"Format:\n"
            f"**{sign_name.upper()} - [datum]**\n\n"
            f"**Posao:** 1-2 recenice.\n\n"
            f"**Ljubav:** 1-2 recenice.\n\n"
            f"**Savet dana:** Jedna konkretna, prakticna preporuka.\n\n"
            f"Budi konkretan i direktan. Svaka sekcija u novom pasusu."
        )
        max_tokens = 400
    elif horo_type == "weekly":
        prompt = (
            f"Napisi nedeljni horoskop za {sign_name} za period "
            f"{period_start.isoformat()} do {period_end.isoformat()}.\n\n"
            f"Format:\n"
            f"**{sign_name.upper()} - [datumi]**\n\n"
            f"**Posao i finansije:** 2-3 recenice.\n\n"
            f"**Ljubav:** 2-3 recenice.\n\n"
            f"**Zdravlje:** 1-2 recenice.\n\n"
            f"**Savet nedelje:** Jedna konkretna preporuka.\n\n"
            f"Svaka sekcija u novom pasusu. Budi konkretan — pomeni dane u nedelji."
        )
        max_tokens = 500
    else:  # monthly
        prompt = (
            f"Napisi mesecni horoskop za {sign_name} za mesec koji pocinje "
            f"{period_start.isoformat()}.\n\n"
            f"Format:\n"
            f"**{sign_name.upper()} - [mesec godina]**\n\n"
            f"**Opsti ton meseca:** 2-3 recenice.\n\n"
            f"**Karijera i finansije:** 2-3 recenice sa konkretnim datumima.\n\n"
            f"**Ljubav i odnosi:** 2-3 recenice sa konkretnim periodima.\n\n"
            f"**Zdravlje:** 1-2 recenice.\n\n"
            f"**Savet meseca:** Jedna konkretna, prakticna preporuka.\n\n"
            f"Svaka sekcija u novom pasusu. Pomeni konkretne datume i periode."
        )
        max_tokens = 800

    return await ai_service.generate(prompt, system=SYSTEM_PROMPT, max_tokens=max_tokens)


def _get_period(horo_type: str, target: date | None = None) -> tuple[date, date]:
    """Return (period_start, period_end) for a given type."""
    if target is None:
        target = date.today()
    if horo_type == "daily":
        return target, target
    elif horo_type == "weekly":
        start = target - timedelta(days=target.weekday())
        return start, start + timedelta(days=6)
    else:  # monthly
        start = target.replace(day=1)
        if target.month == 12:
            end = target.replace(year=target.year + 1, month=1, day=1) - timedelta(days=1)
        else:
            end = target.replace(month=target.month + 1, day=1) - timedelta(days=1)
        return start, end


async def generate_horoscopes_if_missing(
    db: AsyncSession,
    horo_type: str,
    target_date: date | None = None,
) -> int:
    """Generate horoscopes for all 12 signs if not already in DB.

    Returns the number of horoscopes generated.
    """
    period_start, period_end = _get_period(horo_type, target_date)

    generated = 0
    for sign in ZODIAC_SIGNS:
        existing = await db.execute(
            select(Horoscope).where(
                Horoscope.sign == sign,
                Horoscope.type == horo_type,
                Horoscope.period_start == period_start,
            )
        )
        if existing.scalar_one_or_none() is not None:
            continue

        content = await _generate_horoscope(sign, horo_type, period_start, period_end)
        horoscope = Horoscope(
            sign=sign,
            type=horo_type,
            content=content,
            period_start=period_start,
            period_end=period_end,
        )
        db.add(horoscope)
        generated += 1

    if generated > 0:
        await db.commit()
    return generated
