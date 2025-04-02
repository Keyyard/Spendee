from pydantic import BaseModel, EmailStr

class SignInSchema(BaseModel):
    id: str
