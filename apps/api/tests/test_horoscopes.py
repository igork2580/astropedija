"""Tests for /api/v1/horoscopes endpoints."""

import pytest


ALL_SIGNS = [
    "ovan", "bik", "blizanci", "rak", "lav", "devica",
    "vaga", "skorpija", "strelac", "jarac", "vodolija", "ribe",
]


@pytest.mark.asyncio
@pytest.mark.parametrize("sign", ALL_SIGNS)
async def test_daily_horoscope_all_signs(client, sign):
    res = await client.get(f"/api/v1/horoscopes/daily/{sign}")
    assert res.status_code == 200
    data = res.json()
    assert data["sign"] == sign
    assert data["type"] == "daily"
    assert "content" in data
    assert "period_start" in data
    assert "period_end" in data


@pytest.mark.asyncio
@pytest.mark.parametrize("horo_type", ["daily", "weekly", "monthly"])
async def test_horoscope_types(client, horo_type):
    res = await client.get(f"/api/v1/horoscopes/{horo_type}/ovan")
    assert res.status_code == 200
    data = res.json()
    assert data["type"] == horo_type


@pytest.mark.asyncio
async def test_horoscope_invalid_sign(client):
    res = await client.get("/api/v1/horoscopes/daily/invalid")
    assert res.status_code == 404


@pytest.mark.asyncio
async def test_horoscope_invalid_type(client):
    res = await client.get("/api/v1/horoscopes/yearly/ovan")
    assert res.status_code == 422  # Path regex validation
