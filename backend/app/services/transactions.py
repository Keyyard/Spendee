from datetime import datetime
from ..dependencies import db
from app.schemas.transactions import TransactionSchema
from fastapi import HTTPException
import logging
import app.repositories.transactions as Repo

logger = logging.getLogger("transactions")

async def createTransaction(data: TransactionSchema, db):
    repo = Repo.TransactionRepo(db)
    return await repo.createTransaction(data)

async def getAllTransactions(user_id: str, db):
    repo = Repo.TransactionRepo(db)
    return await repo.getAllTransactions(user_id)
    
async def getTransaction(transaction_id: str, db):
    repo = Repo.TransactionRepo(db)
    return await repo.getTransaction(transaction_id)

async def updateTransaction(transaction_id: str, data: dict, db):
    repo = Repo.TransactionRepo(db)
    return await repo.updateTransaction(transaction_id, data)

async def deleteTransaction(transaction_id: str, db):
    repo = Repo.TransactionRepo(db)
    return await repo.deleteTransaction(transaction_id)

async def getLimitedTransactions(user_id: str, limit: int, db):
    repo = Repo.TransactionRepo(db)
    return await repo.getLimitedTransactions(user_id, limit)
    
async def calculateBudget(user_id: str, db):
    transactions = await db.transaction.find_many(where={"userId": user_id})
    income = sum(t.amount for t in transactions if t.type.lower() == "income")
    expenses = sum(t.amount for t in transactions if t.type.lower() == "expense")
    budget = income - expenses

    return budget