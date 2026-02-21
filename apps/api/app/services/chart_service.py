import re
from kerykeion import AstrologicalSubject, KerykeionChartSVG, SynastryAspects
from app.models.schemas import (
    ChartPlanetResponse,
    ChartHouseResponse,
    ChartAspectResponse,
    ChartDataResponse,
    ChartResponse,
)
from app.utils.svg_processor import process_svg


SIGN_NAMES_SR = {
    "Ari": "Ovan", "Tau": "Bik", "Gem": "Blizanci", "Can": "Rak",
    "Leo": "Lav", "Vir": "Devica", "Lib": "Vaga", "Sco": "Skorpija",
    "Sag": "Strelac", "Cap": "Jarac", "Aqu": "Vodolija", "Pis": "Ribe",
}

PLANET_NAMES_SR = {
    "Sun": "Sunce", "Moon": "Mesec", "Mercury": "Merkur", "Venus": "Venera",
    "Mars": "Mars", "Jupiter": "Jupiter", "Saturn": "Saturn", "Uranus": "Uran",
    "Neptune": "Neptun", "Pluto": "Pluton", "True_Node": "Severni čvor",
    "True_North_Lunar_Node": "Severni čvor",
    "Mean_Node": "Severni čvor", "Chiron": "Hiron",
}

ASPECT_NAMES_SR = {
    "conjunction": "Konjunkcija", "opposition": "Opozicija",
    "trine": "Trigon", "square": "Kvadrat", "sextile": "Sekstil",
    "quincunx": "Kvinkunks", "semi-sextile": "Semi-sekstil",
    "semi-square": "Semi-kvadrat",
}

PLANET_ATTRS = [
    "sun", "moon", "mercury", "venus", "mars",
    "jupiter", "saturn", "uranus", "neptune", "pluto",
    "true_north_lunar_node",
]

HOUSE_NAME_TO_NUM = {
    "First_House": 1, "Second_House": 2, "Third_House": 3,
    "Fourth_House": 4, "Fifth_House": 5, "Sixth_House": 6,
    "Seventh_House": 7, "Eighth_House": 8, "Ninth_House": 9,
    "Tenth_House": 10, "Eleventh_House": 11, "Twelfth_House": 12,
}


def _translate_sign(sign_abbr: str) -> str:
    return SIGN_NAMES_SR.get(sign_abbr, sign_abbr)


def _translate_planet(name: str) -> str:
    return PLANET_NAMES_SR.get(name, name)


def _extract_planets(subject: AstrologicalSubject) -> list[ChartPlanetResponse]:
    planets = []
    for attr in PLANET_ATTRS:
        planet_obj = getattr(subject, attr, None)
        if planet_obj is None:
            continue
        house_raw = getattr(planet_obj, "house", 0)
        house_num = HOUSE_NAME_TO_NUM.get(house_raw, house_raw) if isinstance(house_raw, str) else (house_raw or 0)
        planets.append(ChartPlanetResponse(
            name=_translate_planet(planet_obj.name),
            sign=_translate_sign(planet_obj.sign),
            degree=round(planet_obj.position, 2),
            house=house_num,
            retrograde=bool(getattr(planet_obj, "retrograde", False)),
        ))
    return planets


HOUSE_ORDINALS = [
    "first", "second", "third", "fourth", "fifth", "sixth",
    "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
]


def _extract_houses(subject: AstrologicalSubject) -> list[ChartHouseResponse]:
    houses_list = []
    for i, ordinal in enumerate(HOUSE_ORDINALS, 1):
        house_obj = getattr(subject, f"{ordinal}_house", None)
        if house_obj:
            houses_list.append(ChartHouseResponse(
                number=i,
                sign=_translate_sign(house_obj.sign),
                degree=round(house_obj.position, 2),
            ))
    return houses_list


def _count_elements(planets: list[ChartPlanetResponse]) -> dict[str, int]:
    element_map = {
        "Ovan": "Vatra", "Lav": "Vatra", "Strelac": "Vatra",
        "Bik": "Zemlja", "Devica": "Zemlja", "Jarac": "Zemlja",
        "Blizanci": "Vazduh", "Vaga": "Vazduh", "Vodolija": "Vazduh",
        "Rak": "Voda", "Skorpija": "Voda", "Ribe": "Voda",
    }
    counts: dict[str, int] = {"Vatra": 0, "Zemlja": 0, "Vazduh": 0, "Voda": 0}
    for p in planets:
        el = element_map.get(p.sign)
        if el:
            counts[el] += 1
    return counts


def _count_qualities(planets: list[ChartPlanetResponse]) -> dict[str, int]:
    quality_map = {
        "Ovan": "Kardinalan", "Rak": "Kardinalan", "Vaga": "Kardinalan", "Jarac": "Kardinalan",
        "Bik": "Fiksan", "Lav": "Fiksan", "Skorpija": "Fiksan", "Vodolija": "Fiksan",
        "Blizanci": "Mutabilan", "Devica": "Mutabilan", "Strelac": "Mutabilan", "Ribe": "Mutabilan",
    }
    counts: dict[str, int] = {"Kardinalan": 0, "Fiksan": 0, "Mutabilan": 0}
    for p in planets:
        q = quality_map.get(p.sign)
        if q:
            counts[q] += 1
    return counts


def _extract_chart_data(subject: AstrologicalSubject) -> ChartDataResponse:
    planets = _extract_planets(subject)
    houses = _extract_houses(subject)
    return ChartDataResponse(
        planets=planets,
        houses=houses,
        aspects=[],
        elements=_count_elements(planets),
        qualities=_count_qualities(planets),
    )


def create_natal_chart(
    name: str, year: int, month: int, day: int,
    hour: int, minute: int, lat: float, lng: float,
    tz: str, city: str,
) -> ChartResponse:
    subject = AstrologicalSubject(
        name or "Korisnik",
        year, month, day, hour, minute,
        city=city or "Belgrade",
        lng=lng, lat=lat,
        tz_str=tz,
    )
    chart = KerykeionChartSVG(subject)
    svg = process_svg(chart.makeTemplate())
    chart_data = _extract_chart_data(subject)
    return ChartResponse(chart_data=chart_data, svg=svg)


def create_synastry_chart(
    p1_name: str, p1_year: int, p1_month: int, p1_day: int,
    p1_hour: int, p1_minute: int, p1_lat: float, p1_lng: float,
    p1_tz: str, p1_city: str,
    p2_name: str, p2_year: int, p2_month: int, p2_day: int,
    p2_hour: int, p2_minute: int, p2_lat: float, p2_lng: float,
    p2_tz: str, p2_city: str,
) -> ChartResponse:
    subject1 = AstrologicalSubject(
        p1_name or "Osoba 1", p1_year, p1_month, p1_day, p1_hour, p1_minute,
        city=p1_city or "Belgrade", lng=p1_lng, lat=p1_lat, tz_str=p1_tz,
    )
    subject2 = AstrologicalSubject(
        p2_name or "Osoba 2", p2_year, p2_month, p2_day, p2_hour, p2_minute,
        city=p2_city or "Belgrade", lng=p2_lng, lat=p2_lat, tz_str=p2_tz,
    )
    chart = KerykeionChartSVG(subject1, chart_type="Synastry", second_obj=subject2)
    svg = process_svg(chart.makeTemplate())

    data1 = _extract_chart_data(subject1)
    data2 = _extract_chart_data(subject2)

    return ChartResponse(chart_data=data1, svg=svg)


def create_transit_chart(
    name: str, year: int, month: int, day: int,
    hour: int, minute: int, lat: float, lng: float,
    tz: str, city: str,
) -> ChartResponse:
    from datetime import datetime

    subject = AstrologicalSubject(
        name or "Korisnik", year, month, day, hour, minute,
        city=city or "Belgrade", lng=lng, lat=lat, tz_str=tz,
    )
    now = datetime.now()
    transit_subject = AstrologicalSubject(
        "Tranzit", now.year, now.month, now.day, now.hour, now.minute,
        city=city or "Belgrade", lng=lng, lat=lat, tz_str=tz,
    )
    chart = KerykeionChartSVG(subject, chart_type="Transit", second_obj=transit_subject)
    svg = process_svg(chart.makeTemplate())
    chart_data = _extract_chart_data(subject)
    return ChartResponse(chart_data=chart_data, svg=svg)
