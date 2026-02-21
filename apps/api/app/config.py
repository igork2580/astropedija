from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Astropedija API"
    debug: bool = False

    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/astropedija"

    geonames_username: str = ""

    cors_origins: list[str] = [
        "http://localhost:3000",
        "https://astropedija.com",
        "https://www.astropedija.com",
    ]

    default_latitude: float = 44.8176
    default_longitude: float = 20.4633
    default_timezone: str = "Europe/Belgrade"

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
