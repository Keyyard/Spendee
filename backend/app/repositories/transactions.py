from datetime import datetime
from ..dependencies import getPrisma
from app.schemas.transactions import TransactionSchema, TransactionUpdateSchema
from fastapi import HTTPException, Depends
import logging
import json
from prisma import Prisma
from .base_transaction_repository import BaseTransactionRepository

logger = logging.getLogger("transactions")
class TransactionRepo(BaseTransactionRepository):
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

    async def getAllTransactions(self, userId: str):
        try:
            transactions = await self.db.transaction.find_many(
                where={"userId": userId},
                include={"category": True}, 
                order={"date": "desc"},
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

    async def getTransaction(self, transactionId: str):
        transaction = await self.db.transaction.find_unique(
            where={"id": transactionId},
            include={"category": True},
        )
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        transaction.type = transaction.type.lower() 
        transaction.category.name = transaction.category.name
        return transaction

    async def updateTransaction(self, transactionId: str, data: TransactionUpdateSchema):
        transaction = await self.db.transaction.find_unique(where={"id": transactionId})
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")

        if data.categoryId:
            category = await self.db.category.find_unique(where={"id": data.categoryId})
            if not category:
                raise HTTPException(status_code=404, detail="Category not found")

        update_data = {
            "amount": data.amount,
            "categoryId": data.categoryId,
            "description": data.description,
            "date": data.date,
        }

        update_data = {key: value for key, value in update_data.items() if value is not None}

        updated_transaction = await self.db.transaction.update(
            where={"id": transactionId},
            data=update_data,
        )
        return updated_transaction

    async def deleteTransaction(self, transactionId: str):
        transaction = await self.db.transaction.delete(
                where={"id": transactionId}
        )
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        return {"message": "Transaction deleted successfully"}

    async def getLimitedTransactions(self, userId: str, limit: int):
        try:
            transactions = await self.db.transaction.find_many(
                where={"userId": userId},
                take=limit,
                order={"date": "desc"} ,
                include={"category": True},
                select={
                    "id": True,
                    "amount": True,
                    "type": True,
                    "category": {"select": {"name": True}},
                    "description": True,
                    "date": True,
                },

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
