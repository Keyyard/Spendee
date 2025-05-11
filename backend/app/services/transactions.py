from app.dependencies import getPrisma
from app.schemas.transactions import TransactionSchema, TransactionUpdateSchema
from fastapi import Depends
import logging
import app.repositories.transactions as Repo

logger = logging.getLogger("transactions")

class TransactionService:
    def __init__(self, db):
        self.repo = Repo.TransactionRepo(db)
        self.db = db

    async def create_transaction(self, data: TransactionSchema):
        return await self.repo.createTransaction(data)

    async def get_all_transactions(self, userId: str):
        return await self.repo.getAllTransactions(userId)

    async def get_transaction(self, transactionId: str):
        return await self.repo.getTransaction(transactionId)

    async def update_transaction(self, transactionId: str, data: TransactionUpdateSchema):
        return await self.repo.updateTransaction(transactionId, data)

    async def delete_transaction(self, transactionId: str):
        return await self.repo.deleteTransaction(transactionId)

    async def get_limited_transactions(self, userId: str, limit: int):
        return await self.repo.getLimitedTransactions(userId, limit)

    async def calculate_budget(self, user_id: str):
        transactions = await self.db.transaction.find_many(where={"userId": user_id})
        income = sum(t.amount for t in transactions if t.type.lower() == "income")
        expenses = sum(t.amount for t in transactions if t.type.lower() == "expense")
        budget = income - expenses

        return budget

def get_transaction_service(db=Depends(getPrisma)):
    return TransactionService(db)
