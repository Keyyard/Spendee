from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TransactionSchema(BaseModel):
    userId: str
    amount: float
    type: str # 'income' or 'expense'
    categoryId: str 
    description: Optional[str] = None
    date: Optional[datetime] = None

class TransactionUpdateSchema(BaseModel):
    amount: Optional[float] = None
    categoryId: Optional[str] = None 
    description: Optional[str] = None
    date: Optional[datetime] = None
