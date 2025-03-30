from pydantic import BaseModel

class CategorySchema(BaseModel):
    userId: str
    name: str

class CategoryUpdateSchema(BaseModel):
    name: str