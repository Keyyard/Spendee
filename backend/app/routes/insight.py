from fastapi import APIRouter, Depends, Security
from app.schemas.insight import InsightRequest, InsightResponse
from app.services.insight import generateSpendingInsight
from app.dependencies import getPrisma
from app.middleware.auth import authRequest
from prisma import Prisma

router = APIRouter()

@router.post("/", response_model=InsightResponse)
async def get_spending_summary(
    req: InsightRequest,
    db: Prisma = Depends(getPrisma),
    request = Security(authRequest)
):
    summary = await generateSpendingInsight(req, db)
    return InsightResponse(summary=summary)
