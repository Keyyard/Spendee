import logging
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer
from app.dependencies import getPrisma
from prisma import Prisma
from ..services.auth import signIn
from app.schemas.auth import SignInSchema

security = HTTPBearer()

async def authRequest(userId: str = Security(security), db: Prisma = Depends(getPrisma)):
    try:
        userId = userId.credentials
        logging.info(f"Received userId: {userId}")

        if not userId:
            raise HTTPException(status_code=401, detail="Missing userId")

        # Check if the user exists in the database
        user = await db.user.find_first(where={"id": userId})
        if not user:
            sign_in_data = SignInSchema(id=userId)
            await signIn(sign_in_data, db)

        logging.info(f"Authenticated userId: {userId}")
        return userId

    except Exception as e:
        logging.error(f"Authentication error: {e}")
        raise HTTPException(status_code=401, detail="Authentication failed")
