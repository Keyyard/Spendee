from fastapi import APIRouter, Depends
from prisma import Prisma
from app.schemas.auth import SignInSchema
from app.dependencies import getPrisma
from app.services.auth import signIn

router = APIRouter()

@router.post("/signin")
async def signInRoute(data: SignInSchema, prisma: Prisma = Depends(getPrisma)):
    return await signIn(data, prisma)
