from app.schemas.auth import SignInSchema
from fastapi import HTTPException
from ..dependencies import db
async def signIn(data: SignInSchema, db):
    user = await db.user.find_first(where={"id": data.id})
    
    if not user:
        # If user doesn't exist, create it using Clerk's data
        user = await db.user.create(data={
            "id": data.id
        })
    
    return {"message": "Signed in successfully", "user": user}

