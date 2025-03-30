from pydantic import BaseModel, EmailStr

class SignInSchema(BaseModel):
    id: str  # Clerk user ID
    email: EmailStr
    name: str
