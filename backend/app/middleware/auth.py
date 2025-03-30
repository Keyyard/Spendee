import httpx
from fastapi import Request, HTTPException
from clerk_backend_api import Clerk
from clerk_backend_api.jwks_helpers import AuthenticateRequestOptions
from app.config import clerk 

async def authRequest(request: Request):
    try:
        # Use Clerk's authentication helper
        request_state = clerk.authenticate_request(
            request, 
            AuthenticateRequestOptions(
                authorized_parties=["*"]  
            )
        )
        
        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="Unauthorized")

        return request_state
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid authentication token")
