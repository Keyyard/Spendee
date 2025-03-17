from fastapi import APIRouter, Depends
from app.utils.auth import get_current_user

router = APIRouter()

@router.get("/me")
async def get_me(user_id: str = Depends(get_current_user)):
    return {"message": "Protected route accessed!", "user_id": user_id}
