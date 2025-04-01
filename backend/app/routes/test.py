from fastapi import APIRouter, Depends, HTTPException, Request, Security
from prisma import Prisma
from app.middleware.cors import addCorsMiddleware
from app.middleware.rateLimiter import addRateLimiterMiddleware, limiter
from app.middleware.auth import authRequest
router = APIRouter()

@router.get("/limited")
def limitedRoute(request: Request):  
    return {"message": "This is a limited route"}

@router.get("/protected")
async def protected_route(user_id: str = Security(authRequest)):
    return {"message": f"This is a protected route accessed!"}

@router.get("/public")
def public_route():
    return {"message": "This is a public endpoint accessible without authentication."}