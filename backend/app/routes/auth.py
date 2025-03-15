from fastapi import APIRouter, Depends, HTTPException, Header
from starlette.requests import Request
from app.config import supabase

auth_router = APIRouter()

# get user session from frontend token
@auth_router.get("/auth/me")
async def get_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization token")

    # Extract Supabase session token from "Authorization" header
    token = authorization.replace("Bearer ", "")

    # verify user with Supabase
    user = supabase.auth.get_user(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {"user": user}
