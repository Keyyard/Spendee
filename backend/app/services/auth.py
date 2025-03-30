from prisma import Prisma
from app.schemas.auth import SignInSchema
from fastapi import HTTPException

async def signIn(data: SignInSchema, db: Prisma):
    user = await db.user.find_first(where={"id": data.id})
    
    if not user:
        # If user doesn't exist, create it using Clerk's data
        user = await db.user.create(data={
            "id": data.id,  # Clerk's user id will be used as user id
            "email": data.email,
            "name": data.name
        })
    
    return {"message": "Signed in successfully", "user": user}

