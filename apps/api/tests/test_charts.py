"""Tests for /api/v1/charts endpoints."""

import pytest


# -- Helpers ---------------------------------------------------------------

def assert_chart_response(data: dict, expect_svg: bool = True):
    """Validate the shape of a ChartResponse."""
    assert "chart_data" in data
    cd = data["chart_data"]
    assert "planets" in cd
    assert "houses" in cd
    assert "elements" in cd
    assert "qualities" in cd

    # Planets
    assert len(cd["planets"]) >= 10  # Sun through Pluto + Node
    for p in cd["planets"]:
        assert "name" in p
        assert "sign" in p
        assert "degree" in p
        assert "house" in p
        assert "retrograde" in p

    # Houses
    assert len(cd["houses"]) == 12
    for h in cd["houses"]:
        assert h["number"] >= 1
        assert h["number"] <= 12

    # Elements
    for el in ["Vatra", "Zemlja", "Vazduh", "Voda"]:
        assert el in cd["elements"]

    # Qualities
    for q in ["Kardinalan", "Fiksan", "Mutabilan"]:
        assert q in cd["qualities"]

    # SVG
    if expect_svg:
        assert len(data.get("svg", "")) > 0


# -- Natal -----------------------------------------------------------------

@pytest.mark.asyncio
async def test_natal_chart(client, birth_data):
    res = await client.post("/api/v1/charts/natal", json=birth_data)
    assert res.status_code == 200
    assert_chart_response(res.json())


@pytest.mark.asyncio
async def test_natal_chart_invalid_date(client, birth_data):
    birth_data["month"] = 13
    res = await client.post("/api/v1/charts/natal", json=birth_data)
    assert res.status_code == 422  # Pydantic validation


@pytest.mark.asyncio
async def test_natal_chart_missing_fields(client):
    res = await client.post("/api/v1/charts/natal", json={"name": "Test"})
    assert res.status_code == 422


# -- Synastry --------------------------------------------------------------

@pytest.mark.asyncio
async def test_synastry_chart(client, dual_birth_data):
    res = await client.post("/api/v1/charts/synastry", json=dual_birth_data)
    assert res.status_code == 200
    assert_chart_response(res.json())


# -- Composite -------------------------------------------------------------

@pytest.mark.asyncio
async def test_composite_chart(client, dual_birth_data):
    res = await client.post("/api/v1/charts/composite", json=dual_birth_data)
    assert res.status_code == 200
    assert_chart_response(res.json())


# -- Transit ---------------------------------------------------------------

@pytest.mark.asyncio
async def test_transit_chart(client, birth_data):
    res = await client.post("/api/v1/charts/transit", json=birth_data)
    assert res.status_code == 200
    assert_chart_response(res.json())


# -- Solar Return ----------------------------------------------------------

@pytest.mark.asyncio
async def test_solar_return_chart(client, birth_data):
    res = await client.post("/api/v1/charts/solar-return", json=birth_data)
    assert res.status_code == 200
    assert_chart_response(res.json())


# -- Progressed ------------------------------------------------------------

@pytest.mark.asyncio
async def test_progressed_chart(client, birth_data):
    res = await client.post("/api/v1/charts/progressed", json=birth_data)
    assert res.status_code == 200
    data = res.json()
    assert_chart_response(data, expect_svg=False)


# -- Davison ---------------------------------------------------------------

@pytest.mark.asyncio
async def test_davison_chart(client, dual_birth_data):
    res = await client.post("/api/v1/charts/davison", json=dual_birth_data)
    assert res.status_code == 200
    assert_chart_response(res.json())


# -- Natal Full (with patterns) -------------------------------------------

@pytest.mark.asyncio
async def test_natal_full(client, birth_data):
    res = await client.post("/api/v1/charts/natal-full", json=birth_data)
    assert res.status_code == 200
    data = res.json()
    assert "chart_data" in data
    assert "svg" in data
    assert "patterns" in data
    assert isinstance(data["patterns"], list)


# -- Compatibility ---------------------------------------------------------

@pytest.mark.asyncio
async def test_compatibility(client):
    res = await client.get("/api/v1/charts/compatibility/ovan/vaga")
    assert res.status_code == 200
    data = res.json()
    assert "score" in data
    assert 0 <= data["score"] <= 100
    assert "description" in data


@pytest.mark.asyncio
async def test_compatibility_same_sign(client):
    res = await client.get("/api/v1/charts/compatibility/lav/lav")
    assert res.status_code == 200
    data = res.json()
    assert data["score"] > 0
