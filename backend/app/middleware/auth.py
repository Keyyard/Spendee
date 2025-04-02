import logging
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer
from app.dependencies import getPrisma
from prisma import Prisma
from ..services.auth import signIn
from app.schemas.auth import SignInSchema

security = HTTPBearer()

async def authRequest(user_id: str = Security(security), db: Prisma = Depends(getPrisma)):
    try:
        user_id = user_id.credentials
        logging.info(f"Received userId: {user_id}")

        if not user_id:
            raise HTTPException(status_code=401, detail="Missing userId")

        # Check if the user exists in the database
        user = await db.user.find_first(where={"id": user_id})
        if not user:
            # Create a SignInSchema object and pass it to signIn
            sign_in_data = SignInSchema(id=user_id)
            await signIn(sign_in_data, db)

        logging.info(f"Authenticated userId: {user_id}")
        return user_id

    except Exception as e:
        logging.error(f"Authentication error: {e}")
        raise HTTPException(status_code=401, detail="Authentication failed")