from fastapi import APIRouter, HTTPException, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from prisma import Prisma
from app.utils.auth import (
    hash_password, verify_password, create_access_token, create_refresh_token, decode_token
)
from app.dependencies import get_db
from app.schemas.auth import SignUpSchema
from datetime import timedelta

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

@router.post("/sign-up")
async def sign_up(data: SignUpSchema, db: Prisma = Depends(get_db)):
    """Registers a new user with schema validation."""
    existing_user = await db.user.find_first(where={"username": data.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed_pw = hash_password(data.password)
    await db.user.create(data={"email": data.email, "username": data.username, "password": hashed_pw})

    return {"message": "User created successfully"}


@router.post("/sign-in")
async def sign_in(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Prisma = Depends(get_db)):
    """Authenticates a user and returns both access & refresh tokens."""
    user = await db.user.find_first(where={"username": form_data.username})
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": user.username}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_refresh_token({"sub": user.username}, expires_delta=timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))

    # Securely store refresh token in HTTP-only cookie
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, samesite="Lax")

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/refresh")
async def refresh_token(response: Response, db: Prisma = Depends(get_db), refresh_token: str = Depends(decode_token)):
    username = refresh_token.get("sub")
    if not username:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user = await db.user.find_first(where={"username": username})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    new_access_token = create_access_token({"sub": username}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    new_refresh_token = create_refresh_token({"sub": username}, expires_delta=timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))

    # token rotation
    response.set_cookie(key="refresh_token", value=new_refresh_token, httponly=True, samesite="Lax")

    return {"access_token": new_access_token, "token_type": "bearer"}
