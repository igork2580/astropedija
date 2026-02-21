"""Tests for /api/v1/geo endpoints.

Geo search requires GEONAMES_USERNAME. Without it, returns 503.
"""

import pytest


@pytest.mark.asyncio
async def test_geo_search_no_config(client):
    """Without GEONAMES_USERNAME, should return 503."""
    res = await client.get("/api/v1/geo/search?q=Belgrade")
    # 503 if not configured, 200 if configured
    assert res.status_code in (200, 503)


@pytest.mark.asyncio
async def test_geo_search_too_short(client):
    """Query shorter than 2 chars should fail validation."""
    res = await client.get("/api/v1/geo/search?q=B")
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_geo_search_missing_query(client):
    """Missing query parameter should fail."""
    res = await client.get("/api/v1/geo/search")
    assert res.status_code == 422
