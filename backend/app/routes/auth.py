from fastapi import APIRouter, HTTPException, Depends
from prisma import Prisma
from app.utils.auth import hash_password, verify_password, create_access_token
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from app.dependencies import get_db
from app.schemas.auth import SignUpSchema
router = APIRouter()

@router.post("/sign-up")
async def sign_up(data: SignUpSchema, db: Prisma = Depends(get_db)):
    username = data.username
    email = data.email
    password = data.password

    existing_user = await db.user.find_first(where={"username": username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed_pw = hash_password(password)
    await db.user.create(data={"email": email, "username": username, "password": hashed_pw})
    
    return {"message": "User created successfully"}

@router.post("/token")
async def sign_in(form_data: OAuth2PasswordRequestForm = Depends(), db: Prisma = Depends(get_db)):
    user = await db.user.find_first(where={"username": form_data.username})
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(user.id, user.username)
    return {"access_token": access_token, "token_type": "bearer"}
