from fastapi import HTTPException
from app.schemas.insight import InsightRequest
from app.dependencies import getPrisma
from app.services.extractDate import extractDate
from app.services.prompt_builder import build_spending_insight_prompt
from app.services.openai_client import OpenAIClient

async def getUserTransactions(userId: str, db, question: str = None):
    filters = {"userId": userId}
    allTransactions = await db.transaction.find_many(where=filters)
    if not allTransactions:
        return []
    if question:
        date_range = await extractDate(question)
        if date_range:
            start, end = date_range
            filtered = [t for t in allTransactions if start <= t.date <= end]
            return filtered
    return allTransactions

async def generateSpendingInsight(insightReq: InsightRequest, db):
    transactions = await getUserTransactions(insightReq.userId, db, insightReq.question)
    if not transactions:
        return "No transactions found for this user."
    tx_data = [
        {"amount": t.amount, "type": t.type, "category": t.category, "description": t.description, "date": str(t.date)}
        for t in transactions
    ]
    prompt = build_spending_insight_prompt(insightReq.question, tx_data)
    client = OpenAIClient()
    return await client.get_spending_insight(prompt)

__all__ = [
    "getUserTransactions",
    "generateSpendingInsight",
]
