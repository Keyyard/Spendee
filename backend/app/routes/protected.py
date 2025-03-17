from fastapi import APIRouter, Depends, HTTPException
from app.utils.auth import oauth2_scheme, decode_token

router = APIRouter()

@router.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {"message": "You have access!"}
