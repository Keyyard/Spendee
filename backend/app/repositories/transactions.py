from datetime import datetime
from ..dependencies import getPrisma
from app.schemas.transactions import TransactionSchema
from fastapi import HTTPException, Depends
import logging
import json
from prisma import Prisma

logger = logging.getLogger("transactions")
class TransactionRepo:
    def __init__(self, db: Prisma = Depends(getPrisma)):
        self.db = db

    async def createTransaction(self, data: TransactionSchema):
        if not data.userId or not data.categoryId:
            raise HTTPException(status_code=400, detail="Missing required fields: userId or categoryId")

        category = await self.db.category.find_unique(where={"id": data.categoryId})
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")

        transaction = await self.db.transaction.create(
            data={
                "userId": data.userId,
                "amount": data.amount,
                "type": data.type.lower(),  
                "categoryId": data.categoryId,  
                "description": data.description,
                "date": data.date or datetime.utcnow(),
            },
        )

        logger.info(f"Transaction Created: {transaction}")
        return transaction

    async def getAllTransactions(self, user_id: str):
        try:
            transactions = await self.db.transaction.find_many(
                where={"userId": user_id},
                include={"category": True} 
            )
            logger.info(f"Fetched Transactions: {transactions}")

            return [
                {
                    "id": transaction.id,  
                    "userId": transaction.userId,
                    "amount": transaction.amount,
                    "type": transaction.type.lower(), 
                    "category": transaction.category.name,  
                    "description": transaction.description,
                    "date": transaction.date,
                }
                for transaction in transactions
            ]
        except Exception as e:
            logger.error(f"Error fetching transactions: {e}")
            raise HTTPException(status_code=500, detail="Error fetching transactions")

    async def getTransaction(self, transaction_id: str):
        transaction = await self.db.transaction.find_unique(where={"id": transaction_id})
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        transaction.type = transaction.type.lower() 
        return transaction

    async def updateTransaction(self, transaction_id: str, data: dict):
        transaction = await self.db.transaction.find_unique(where={"id": transaction_id})
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")

        if data.get("categoryId"):
            category = await self.db.category.find_unique(where={"id": data["categoryId"]})
            if not category:
                raise HTTPException(status_code=404, detail="Category not found")

        updated_transaction = await self.db.transaction.update(
            where={"id": transaction_id},
            data={
                "userId": data.get("userId", transaction.userId),
                "amount": data.get("amount", transaction.amount),
                "type": data.get("type", transaction.type).lower(),  
                "categoryId": data.get("categoryId", transaction.categoryId),  
                "description": data.get("description", transaction.description),
                "date": data.get("date", transaction.date),
            },
        )
        return updated_transaction

    async def deleteTransaction(self, transaction_id: str):
        transaction = await self.db.transaction.delete(where={"id": transaction_id})
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        return {"message": "Transaction deleted successfully"}

    async def getLimitedTransactions(self, user_id: str, limit: int):
        try:
            transactions = await self.db.transaction.find_many(
                where={"userId": user_id},
                take=limit,
                order={"date": "desc"} 
            )
            return [
                {
                    "userId": transaction.userId,
                    "amount": transaction.amount,
                    "type": transaction.type.lower(),  
                    "categoryId": transaction.categoryId,
                    "description": transaction.description,
                    "date": transaction.date,
                }
                for transaction in transactions
            ]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching transactions: {str(e)}")
