"""Tests for /api/v1/sky endpoints."""

import pytest


@pytest.mark.asyncio
async def test_current_sky(client):
    res = await client.get("/api/v1/sky/current")
    assert res.status_code == 200
    data = res.json()
    assert "planets" in data
    assert "timestamp" in data
    assert len(data["planets"]) >= 10
    for p in data["planets"]:
        assert "name" in p
        assert "sign" in p
        assert "degree" in p
        assert "retrograde" in p


@pytest.mark.asyncio
async def test_current_sky_custom_location(client):
    res = await client.get("/api/v1/sky/current?lat=48.8566&lng=2.3522&tz=Europe/Paris")
    assert res.status_code == 200
    data = res.json()
    assert len(data["planets"]) >= 10


@pytest.mark.asyncio
async def test_upcoming_transits(client):
    res = await client.get("/api/v1/sky/transits/upcoming")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    # May or may not have transits in next 7 days
    for alert in data:
        assert "type" in alert
        assert alert["type"] in ("ingress", "retrograde", "direct")
        assert "title" in alert
        assert "description" in alert
        assert "days_until" in alert
        assert alert["days_until"] >= 1


@pytest.mark.asyncio
async def test_upcoming_transits_custom_days(client):
    res = await client.get("/api/v1/sky/transits/upcoming?days=3")
    assert res.status_code == 200
    data = res.json()
    for alert in data:
        assert alert["days_until"] <= 3


@pytest.mark.asyncio
async def test_moon_phases(client):
    res = await client.get("/api/v1/sky/moon-phases?year=2026&month=2")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
