from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TransactionSchema(BaseModel):
    userId: str
    amount: float
    type: str 
    categoryIdx: str
    description: Optional[str] = None
    date: Optional[datetime] = datetime.utcnow()