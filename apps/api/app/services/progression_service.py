"""Secondary Progressions (day-for-a-year method).

Each day after birth represents one year of life. So for a person
aged N years, we calculate a chart for birth_date + N days.
"""

from datetime import datetime, timedelta
from kerykeion import AstrologicalSubject
from app.services.chart_service import _extract_chart_data, ChartResponse


def create_progressed_chart(
    name: str,
    year: int,
    month: int,
    day: int,
    hour: int,
    minute: int,
    lat: float,
    lng: float,
    tz: str,
    city: str,
    target_year: int | None = None,
) -> ChartResponse:
    """Create a secondary progressed chart.

    If *target_year* is not given, defaults to the current year.
    """
    birth_date = datetime(year, month, day, hour, minute)
    target = target_year or datetime.now().year
    age_years = target - year

    # Day-for-a-year: advance birth date by age_years days
    progressed_date = birth_date + timedelta(days=age_years)

    subject = AstrologicalSubject(
        f"{name or 'Korisnik'} (P)",
        progressed_date.year,
        progressed_date.month,
        progressed_date.day,
        progressed_date.hour,
        progressed_date.minute,
        city=city or "Belgrade",
        lng=lng,
        lat=lat,
        tz_str=tz,
    )

    chart_data = _extract_chart_data(subject)
    # No SVG for progressed charts — data-only
    return ChartResponse(chart_data=chart_data, svg="")
