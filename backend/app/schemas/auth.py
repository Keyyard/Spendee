from pydantic import BaseModel, EmailStr

class SignUpSchema(BaseModel):
    email: EmailStr
    username: str
    password: str
