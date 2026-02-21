"""Shared fixtures for API tests.

Uses FastAPI TestClient with the real app — no DB required for
chart/sky/calculate/horoscope endpoints (they use Kerykeion directly).

Auth/share/AI tests are skipped if the DB is not available.
"""

import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


# -- Sample birth data used across tests ----------------------------------

BELGRADE_BIRTH = {
    "name": "Test",
    "year": 1990,
    "month": 6,
    "day": 15,
    "hour": 14,
    "minute": 30,
    "latitude": 44.8176,
    "longitude": 20.4633,
    "timezone": "Europe/Belgrade",
    "city": "Belgrade",
}

NOVI_SAD_BIRTH = {
    "name": "Test2",
    "year": 1985,
    "month": 3,
    "day": 22,
    "hour": 9,
    "minute": 0,
    "latitude": 45.2671,
    "longitude": 19.8335,
    "timezone": "Europe/Belgrade",
    "city": "Novi Sad",
}


@pytest.fixture
def birth_data():
    return BELGRADE_BIRTH.copy()


@pytest.fixture
def dual_birth_data():
    return {
        "person1": BELGRADE_BIRTH.copy(),
        "person2": NOVI_SAD_BIRTH.copy(),
    }


@pytest.fixture
def planet_request():
    return {
        "year": 1990,
        "month": 6,
        "day": 15,
        "hour": 14,
        "minute": 30,
        "latitude": 44.8176,
        "longitude": 20.4633,
        "timezone": "Europe/Belgrade",
        "planet": "Sun",
    }


@pytest.fixture
async def client():
    """Async HTTPX client wired to the FastAPI app."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c
