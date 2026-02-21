from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "AstroPut API"
    debug: bool = False

    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/astroput"

    geonames_username: str = ""
    anthropic_api_key: str = ""
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 24

    cors_origins: list[str] = [
        "http://localhost:3000",
        "https://astroput.com",
        "https://www.astroput.com",
    ]

    default_latitude: float = 44.8176
    default_longitude: float = 20.4633
    default_timezone: str = "Europe/Belgrade"

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
