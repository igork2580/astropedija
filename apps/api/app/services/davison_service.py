"""Davison Relationship Chart.

The Davison chart uses the midpoint in time and space between two
birth charts. The midpoint date/time is the average of the two birth
timestamps, and the midpoint location is the average of the two
latitudes and longitudes.
"""

from datetime import datetime
from kerykeion import AstrologicalSubject, KerykeionChartSVG
from app.services.chart_service import _extract_chart_data, ChartResponse
from app.utils.svg_processor import process_svg


def _midpoint_datetime(dt1: datetime, dt2: datetime) -> datetime:
    """Return the midpoint between two datetimes."""
    delta = abs((dt2 - dt1).total_seconds()) / 2
    earlier = min(dt1, dt2)
    return earlier + __import__("datetime").timedelta(seconds=delta)


def create_davison_chart(
    p1_name: str, p1_year: int, p1_month: int, p1_day: int,
    p1_hour: int, p1_minute: int, p1_lat: float, p1_lng: float,
    p1_tz: str, p1_city: str,
    p2_name: str, p2_year: int, p2_month: int, p2_day: int,
    p2_hour: int, p2_minute: int, p2_lat: float, p2_lng: float,
    p2_tz: str, p2_city: str,
) -> ChartResponse:
    """Create a Davison relationship chart from two sets of birth data."""
    dt1 = datetime(p1_year, p1_month, p1_day, p1_hour, p1_minute)
    dt2 = datetime(p2_year, p2_month, p2_day, p2_hour, p2_minute)

    mid_dt = _midpoint_datetime(dt1, dt2)
    mid_lat = (p1_lat + p2_lat) / 2
    mid_lng = (p1_lng + p2_lng) / 2

    composite_name = f"{p1_name or 'Osoba 1'} & {p2_name or 'Osoba 2'}"

    subject = AstrologicalSubject(
        composite_name,
        mid_dt.year, mid_dt.month, mid_dt.day,
        mid_dt.hour, mid_dt.minute,
        city=p1_city or "Belgrade",
        lng=mid_lng, lat=mid_lat,
        tz_str=p1_tz,
    )

    chart = KerykeionChartSVG(subject)
    svg = process_svg(chart.makeTemplate())
    chart_data = _extract_chart_data(subject)

    return ChartResponse(chart_data=chart_data, svg=svg)
