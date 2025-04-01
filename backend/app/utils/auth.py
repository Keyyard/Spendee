# from datetime import datetime, timedelta
# from jose import JWTError, jwt
# from fastapi import HTTPException, Depends, Request
# from fastapi.security import OAuth2PasswordBearer
# from passlib.context import CryptContext
# from uuid import uuid4
# import os

# SECRET_KEY = os.getenv("SECRET_KEY", str(uuid4()))
# REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY", str(uuid4()))
# ALGORITHM = "HS256"

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/sign-in")


# def hash_password(password: str) -> str:
#     return pwd_context.hash(password)


# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)


# def create_access_token(data: dict, expires_delta: timedelta):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + expires_delta
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# def create_refresh_token(data: dict, expires_delta: timedelta):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + expires_delta
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)


# def decode_token(token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except PyJWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")