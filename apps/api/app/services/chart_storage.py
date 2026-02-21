import secrets
from datetime import datetime, timedelta
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import SavedChart


def generate_share_slug() -> str:
    """Generate a random 8-char alphanumeric slug."""
    return secrets.token_urlsafe(6)  # produces 8 chars


async def save_chart(
    db: AsyncSession,
    chart_type: str,
    input_data: dict,
    chart_data: dict,
    svg: str,
    expires_days: int = 90,
) -> SavedChart:
    """Save a chart to the database and return it with a share slug."""
    slug = generate_share_slug()
    chart = SavedChart(
        chart_type=chart_type,
        input_data=input_data,
        chart_data=chart_data,
        svg=svg,
        share_slug=slug,
        expires_at=datetime.utcnow() + timedelta(days=expires_days),
    )
    db.add(chart)
    await db.commit()
    await db.refresh(chart)
    return chart


async def get_chart_by_slug(db: AsyncSession, slug: str) -> SavedChart | None:
    """Retrieve a saved chart by its share slug."""
    stmt = select(SavedChart).where(
        SavedChart.share_slug == slug,
    )
    result = await db.execute(stmt)
    return result.scalar_one_or_none()
