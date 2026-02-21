from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.models.schemas import SaveChartRequest, SavedChartResponse
from app.services.chart_storage import save_chart, get_chart_by_slug

router = APIRouter()


@router.post("/save", response_model=SavedChartResponse)
async def save_chart_endpoint(data: SaveChartRequest, db: AsyncSession = Depends(get_db)):
    chart = await save_chart(
        db=db,
        chart_type=data.chart_type,
        input_data=data.input_data,
        chart_data=data.chart_data,
        svg=data.svg,
    )
    return SavedChartResponse(
        share_slug=chart.share_slug,
        chart_type=chart.chart_type,
        chart_data=chart.chart_data,
        svg=chart.svg,
        created_at=chart.created_at.isoformat(),
    )


@router.get("/{slug}", response_model=SavedChartResponse)
async def get_shared_chart(slug: str, db: AsyncSession = Depends(get_db)):
    chart = await get_chart_by_slug(db, slug)
    if not chart:
        raise HTTPException(status_code=404, detail="Chart not found")
    if chart.expires_at and chart.expires_at < __import__("datetime").datetime.utcnow():
        raise HTTPException(status_code=410, detail="Chart has expired")
    return SavedChartResponse(
        share_slug=chart.share_slug,
        chart_type=chart.chart_type,
        chart_data=chart.chart_data,
        svg=chart.svg,
        created_at=chart.created_at.isoformat(),
    )
