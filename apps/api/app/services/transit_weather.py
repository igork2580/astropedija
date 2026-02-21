"""Daily astrological weather — summarizes current planetary transits."""

from datetime import date

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import TransitWeather
from app.services import ai_service
from app.services.planet_service import get_current_sky_positions


async def generate_transit_weather(target_date: date, planetary_data: dict) -> str:
    """Generate a short astrological weather summary based on current planetary positions."""
    positions_text = "\n".join(
        f"- {p['name']} u {p['sign']}" + (" (retrogradna)" if p.get("retrograde") else "")
        for p in planetary_data.get("planets", [])
    )
    prompt = (
        f"Napiši kratak astrološki pregled dana za {target_date.isoformat()} (astrološko vreme).\n\n"
        f"Trenutni položaji planeta:\n{positions_text}\n\n"
        f"Format: 2-3 rečenice koje sumiraju energiju dana. "
        f"Pomeni najvažnije aspekte i kako mogu uticati na sve znakove. "
        f"Budi konkretan i praktičan."
    )
    return await ai_service.generate(prompt, max_tokens=300)


async def get_or_create_transit_weather(db: AsyncSession, target_date: date | None = None) -> dict:
    """Get today's transit weather from DB, or generate it if missing."""
    if target_date is None:
        target_date = date.today()

    existing = await db.execute(
        select(TransitWeather).where(TransitWeather.date == target_date)
    )
    weather = existing.scalar_one_or_none()

    if weather is not None:
        return {
            "date": weather.date.isoformat(),
            "content": weather.content,
            "planetary_data": weather.planetary_data,
        }

    # Generate new weather
    sky = get_current_sky_positions()
    planetary_data = {
        "planets": [
            {"name": p.name, "sign": p.sign, "degree": p.degree, "retrograde": p.retrograde}
            for p in sky
        ],
    }
    content = await generate_transit_weather(target_date, planetary_data)

    tw = TransitWeather(
        date=target_date,
        content=content,
        planetary_data=planetary_data,
    )
    db.add(tw)
    await db.commit()

    return {
        "date": target_date.isoformat(),
        "content": content,
        "planetary_data": planetary_data,
    }
