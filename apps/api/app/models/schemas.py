from pydantic import BaseModel, Field


class BirthDataRequest(BaseModel):
    name: str = ""
    year: int = Field(..., ge=1900, le=2100)
    month: int = Field(..., ge=1, le=12)
    day: int = Field(..., ge=1, le=31)
    hour: int = Field(12, ge=0, le=23)
    minute: int = Field(0, ge=0, le=59)
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    timezone: str = "Europe/Belgrade"
    city: str = ""


class DualBirthDataRequest(BaseModel):
    person1: BirthDataRequest
    person2: BirthDataRequest


class PlanetPositionRequest(BaseModel):
    year: int = Field(..., ge=1900, le=2100)
    month: int = Field(..., ge=1, le=12)
    day: int = Field(..., ge=1, le=31)
    hour: int = Field(12, ge=0, le=23)
    minute: int = Field(0, ge=0, le=59)
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    timezone: str = "Europe/Belgrade"
    planet: str = ""


class ChartPlanetResponse(BaseModel):
    name: str
    sign: str
    degree: float
    house: int
    retrograde: bool


class ChartHouseResponse(BaseModel):
    number: int
    sign: str
    degree: float


class ChartAspectResponse(BaseModel):
    planet1: str
    planet2: str
    aspect: str
    angle: float
    orb: float


class ChartDataResponse(BaseModel):
    planets: list[ChartPlanetResponse]
    houses: list[ChartHouseResponse]
    aspects: list[ChartAspectResponse]
    elements: dict[str, int]
    qualities: dict[str, int]


class ChartResponse(BaseModel):
    chart_data: ChartDataResponse
    svg: str


class PlanetPositionResponse(BaseModel):
    planet: str
    sign: str
    degree: float
    house: int
    retrograde: bool


class AscendantResponse(BaseModel):
    sign: str
    degree: float


class SunAscMoonResponse(BaseModel):
    sun: PlanetPositionResponse
    ascendant: AscendantResponse
    moon: PlanetPositionResponse


class CurrentSkyPlanet(BaseModel):
    name: str
    sign: str
    degree: float
    retrograde: bool


class CurrentSkyResponse(BaseModel):
    planets: list[CurrentSkyPlanet]
    timestamp: str


class MoonPhaseResponse(BaseModel):
    date: str
    phase_name: str
    illumination: float
    moon_sign: str
    moon_degree: float


class GeoSearchResult(BaseModel):
    name: str
    lat: float
    lng: float
    country_name: str
    timezone: str


class HoroscopeResponse(BaseModel):
    sign: str
    type: str
    content: str
    period_start: str
    period_end: str


class SaveChartRequest(BaseModel):
    chart_type: str
    input_data: dict
    chart_data: dict
    svg: str


class SavedChartResponse(BaseModel):
    share_slug: str
    chart_type: str
    chart_data: dict
    svg: str
    created_at: str
