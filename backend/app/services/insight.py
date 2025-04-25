import os
import openai
from fastapi import HTTPException
from app.schemas.insight import InsightRequest
from app.dependencies import getPrisma
from datetime import datetime
import re
from dateutil.relativedelta import relativedelta
from dateutil import parser as date_parser
import calendar
from app.services.extractDate import extractDate

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
    txData = [
        {"amount": t.amount, "type": t.type, "category": t.category, "description": t.description, "date": str(t.date)}
        for t in transactions
    ]
    prompt = (
        "You are a smart financial assistant. Analyze the user's transactions and provide a concise, insightful summary. "
        "Highlight spending patterns, trends, anomalies, and offer actionable suggestions for better budgeting. "
        "If the user asked about a specific period (e.g., last month), use that context. "
        "If no period is specified, infer the most relevant period from the user's question and the transaction dates. "
        "You may filter the transactions as needed to answer the user's intent. "
        "Extract any relevant date or period from the user's question and filter the transactions accordingly. "
        "If the user's question is ambiguous, use your best judgment to select a relevant period. "
        f"User's question (if any): {insightReq.question}\n"
        f"Transactions: {txData}"
    )
    try:
        from openai import AsyncOpenAI
        import os
        client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = await client.responses.create(
            model="gpt-4o",
            input=prompt,
        )
        return response.output_text.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI error: {str(e)}")

async def conversationalAssistant(insightReq: InsightRequest, db):
    transactions = await getUserTransactions(insightReq.userId, db, insightReq.question)
    txData = [
        {"amount": t.amount, "type": t.type, "category": t.category, "description": t.description, "date": str(t.date)}
        for t in transactions
    ]
    prompt = (
        "You are a helpful financial assistant. Answer the user's question about their spending, using the provided transactions. "
        "If the question refers to a time period (like 'last month'), use your reasoning to focus on that period. "
        "If no period is specified, infer the most relevant period from the user's question and the transaction dates. "
        "You may filter the transactions as needed to answer the user's intent. "
        "Extract any relevant date or period from the user's question and filter the transactions accordingly. "
        "If the user's question is ambiguous, use your best judgment to select a relevant period. "
        "Be specific, concise, and provide actionable insights if possible.\n"
        f"User's question: {insightReq.question}\n"
        f"Transactions: {txData}"
    )
    try:
        from openai import AsyncOpenAI
        import os
        client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        response = await client.responses.create(
            model="gpt-4o",
            input=prompt,
        )
        return response.output_text.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI error: {str(e)}")

__all__ = [
    "getUserTransactions",
    "generateSpendingInsight",
    "conversationalAssistant"
]
