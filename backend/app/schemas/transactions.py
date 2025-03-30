from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TransactionSchema(BaseModel):
    userId: str
    amount: float
    type: str 
    category: str
    description: Optional[str] = None
