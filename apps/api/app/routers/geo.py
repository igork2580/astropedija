from fastapi import APIRouter, Query, HTTPException
import httpx
from app.models.schemas import GeoSearchResult
from timezonefinder import TimezoneFinder

router = APIRouter()

_tf = TimezoneFinder()


@router.get("/search", response_model=list[GeoSearchResult])
async def geo_search(
    q: str = Query(..., min_length=2),
    max_rows: int = Query(default=5, le=10),
):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://nominatim.openstreetmap.org/search",
            params={
                "q": q,
                "format": "json",
                "limit": max_rows,
                "accept-language": "sr-Latn",
                "addressdetails": 1,
            },
            headers={"User-Agent": "AstroPut/1.0"},
            timeout=10.0,
        )

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Geocoding service error")

    data = response.json()
    results = []
    for item in data:
        lat = float(item.get("lat", 0))
        lng = float(item.get("lon", 0))
        address = item.get("address", {})
        country = address.get("country", "")
        name = item.get("display_name", "").split(",")[0]

        tz = _tf.timezone_at(lat=lat, lng=lng) or "Europe/Belgrade"

        results.append(GeoSearchResult(
            name=name,
            lat=lat,
            lng=lng,
            country_name=country,
            timezone=tz,
        ))
    return results
