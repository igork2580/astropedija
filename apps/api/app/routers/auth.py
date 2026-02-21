"""Authentication endpoints — register, login, me."""

from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.services.auth_service import (
    register_user,
    authenticate_user,
    create_access_token,
    decode_access_token,
    get_user_by_id,
)

router = APIRouter()


class RegisterRequest(BaseModel):
    email: str
    name: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    token: str
    user: dict


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    sign_preference: str | None
    is_premium: bool


@router.post("/register", response_model=AuthResponse)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    try:
        user = await register_user(db, data.email, data.name, data.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    token = create_access_token(str(user.id), user.email)
    return AuthResponse(
        token=token,
        user={
            "id": str(user.id),
            "email": user.email,
            "name": user.name,
            "sign_preference": user.sign_preference,
            "is_premium": user.is_premium,
        },
    )


@router.post("/login", response_model=AuthResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Pogrešan email ili lozinka")

    token = create_access_token(str(user.id), user.email)
    return AuthResponse(
        token=token,
        user={
            "id": str(user.id),
            "email": user.email,
            "name": user.name,
            "sign_preference": user.sign_preference,
            "is_premium": user.is_premium,
        },
    )


@router.get("/me", response_model=UserResponse)
async def me(
    authorization: str = Header(...),
    db: AsyncSession = Depends(get_db),
):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Nevažeći token")

    token = authorization[7:]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Nevažeći ili istekao token")

    user = await get_user_by_id(db, payload["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="Korisnik nije pronađen")

    return UserResponse(
        id=str(user.id),
        email=user.email,
        name=user.name,
        sign_preference=user.sign_preference,
        is_premium=user.is_premium,
    )
