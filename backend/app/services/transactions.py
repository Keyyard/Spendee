from datetime import datetime
from ..dependencies import db
from app.schemas.transactions import TransactionSchema, TransactionUpdateSchema
from fastapi import HTTPException
import logging
import app.repositories.transactions as Repo

logger = logging.getLogger("transactions")

async def createTransaction(data: TransactionSchema, db):
    repo = Repo.TransactionRepo(db)
    return await repo.createTransaction(data)

async def getAllTransactions(userId: str, db):
    repo = Repo.TransactionRepo(db)
    return await repo.getAllTransactions(userId)
    
async def getTransaction(transactionId: str, db):
    repo = Repo.TransactionRepo(db)
    return await repo.getTransaction(transactionId)

async def updateTransaction(transactionId: str, data: TransactionUpdateSchema, db):
    repo = Repo.TransactionRepo(db)
    return await repo.updateTransaction(transactionId, data)

async def deleteTransaction(transactionId: str, db):
    repo = Repo.TransactionRepo(db)
    return await repo.deleteTransaction(transactionId)

async def getLimitedTransactions(userId: str, limit: int, db):
    repo = Repo.TransactionRepo(db)
    return await repo.getLimitedTransactions(userId, limit)
    
async def calculateBudget(user_id: str, db):
    transactions = await db.transaction.find_many(where={"userId": user_id})
    income = sum(t.amount for t in transactions if t.type.lower() == "income")
    expenses = sum(t.amount for t in transactions if t.type.lower() == "expense")
    budget = income - expenses

    return budget