import uuid
from datetime import datetime, date
from sqlalchemy import String, Text, Date, DateTime, Float, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.db.database import Base


class Horoscope(Base):
    __tablename__ = "horoscopes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    sign: Mapped[str] = mapped_column(String(20), index=True)
    type: Mapped[str] = mapped_column(String(10), index=True)  # daily, weekly, monthly
    content: Mapped[str] = mapped_column(Text)
    period_start: Mapped[date] = mapped_column(Date)
    period_end: Mapped[date] = mapped_column(Date)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class SavedChart(Base):
    __tablename__ = "saved_charts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chart_type: Mapped[str] = mapped_column(String(20))  # natal, synastry, composite, transit, solar
    input_data: Mapped[dict] = mapped_column(JSONB)
    chart_data: Mapped[dict] = mapped_column(JSONB)
    svg: Mapped[str] = mapped_column(Text)
    share_slug: Mapped[str] = mapped_column(String(12), unique=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    expires_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class MoonPhase(Base):
    __tablename__ = "moon_phases"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    date: Mapped[date] = mapped_column(Date, unique=True, index=True)
    phase_name: Mapped[str] = mapped_column(String(30))
    illumination: Mapped[float] = mapped_column(Float)
    moon_sign: Mapped[str] = mapped_column(String(20))
    moon_degree: Mapped[float] = mapped_column(Float)


class AstroEvent(Base):
    __tablename__ = "astro_events"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    date: Mapped[date] = mapped_column(Date, index=True)
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text)
    planets: Mapped[str] = mapped_column(String(100), nullable=True)
    aspect_type: Mapped[str] = mapped_column(String(30), nullable=True)
    sign: Mapped[str] = mapped_column(String(20), nullable=True)


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(200))
    message: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
