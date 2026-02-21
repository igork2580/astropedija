"""Tests for /api/v1/calculate endpoints."""

import pytest


@pytest.mark.asyncio
async def test_planet_position(client, planet_request):
    res = await client.post("/api/v1/calculate/planet-position", json=planet_request)
    assert res.status_code == 200
    data = res.json()
    assert "planet" in data
    assert "sign" in data
    assert "degree" in data
    assert "retrograde" in data


@pytest.mark.asyncio
async def test_ascendant(client, planet_request):
    res = await client.post("/api/v1/calculate/ascendant", json=planet_request)
    assert res.status_code == 200
    data = res.json()
    assert "sign" in data
    assert "degree" in data
    assert len(data["sign"]) > 0


@pytest.mark.asyncio
async def test_sun_asc_moon(client, planet_request):
    res = await client.post("/api/v1/calculate/sun-asc-moon", json=planet_request)
    assert res.status_code == 200
    data = res.json()
    assert "sun" in data
    assert "ascendant" in data
    assert "moon" in data
    assert data["sun"]["sign"]
    assert data["moon"]["sign"]
    assert data["ascendant"]["sign"]


@pytest.mark.asyncio
async def test_midheaven(client, planet_request):
    res = await client.post("/api/v1/calculate/midheaven", json=planet_request)
    assert res.status_code == 200
    data = res.json()
    assert "sign" in data
    assert "degree" in data
