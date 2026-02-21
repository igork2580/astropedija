from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import charts, calculate, sky, horoscopes, geo, share, auth

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(charts.router, prefix="/api/v1/charts", tags=["charts"])
app.include_router(calculate.router, prefix="/api/v1/calculate", tags=["calculate"])
app.include_router(sky.router, prefix="/api/v1/sky", tags=["sky"])
app.include_router(horoscopes.router, prefix="/api/v1/horoscopes", tags=["horoscopes"])
app.include_router(geo.router, prefix="/api/v1/geo", tags=["geo"])
app.include_router(share.router, prefix="/api/v1/share", tags=["share"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])


@app.get("/health")
async def health_check():
    return {"status": "ok", "service": settings.app_name}
