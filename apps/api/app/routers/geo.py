from fastapi import APIRouter, Query, HTTPException
import httpx
from app.config import settings
from app.models.schemas import GeoSearchResult

router = APIRouter()


@router.get("/search", response_model=list[GeoSearchResult])
async def geo_search(
    q: str = Query(..., min_length=2),
    max_rows: int = Query(default=5, le=10),
):
    if not settings.geonames_username:
        raise HTTPException(
            status_code=503,
            detail="Geocoding service is not configured",
        )

    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://api.geonames.org/searchJSON",
            params={
                "q": q,
                "maxRows": max_rows,
                "username": settings.geonames_username,
                "style": "FULL",
                "lang": "sr",
            },
            timeout=10.0,
        )

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Geocoding service error")

    data = response.json()
    results = []
    for item in data.get("geonames", []):
        results.append(GeoSearchResult(
            name=item.get("name", ""),
            lat=float(item.get("lat", 0)),
            lng=float(item.get("lng", 0)),
            country_name=item.get("countryName", ""),
            timezone=item.get("timezone", {}).get("timeZoneId", "Europe/Belgrade"),
        ))
    return results
