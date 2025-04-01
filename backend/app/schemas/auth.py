from pydantic import BaseModel, EmailStr

class SignInSchema(BaseModel):
    id: str  
    email: EmailStr
    username: str
