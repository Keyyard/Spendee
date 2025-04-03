from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TransactionSchema(BaseModel):
    userId: str
    amount: float
    type: str  # Ensure this is validated as 'INCOME' or 'EXPENSE' in the application logic
    categoryId: str 
    description: Optional[str] = None
    date: Optional[datetime] = datetime.utcnow()