from pydantic import BaseModel
from typing import List, Optional

class InsightRequest(BaseModel):
    userId: str
    month: Optional[int] = None  # 0-11, optional for filtering
    year: Optional[int] = None
    question: Optional[str] = None  # For conversational assistant

class InsightResponse(BaseModel):
    summary: str
