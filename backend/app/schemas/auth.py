from pydantic import BaseModel

class SignInSchema(BaseModel):
    id: str
