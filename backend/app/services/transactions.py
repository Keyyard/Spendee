from ..dependencies import db
from app.schemas.transactions import TransactionSchema
from fastapi import HTTPException
import logging
import json

logger = logging.getLogger("transactions")

async def createTransaction(data: TransactionSchema, db):
    if not data.userId or not data.categoryId:
        raise HTTPException(status_code=400, detail="Missing required fields: userId or categoryId")

    # Find the category by ID
    category = await db.category.find_unique(where={"id": data.categoryId})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    # Create the transaction and link it to the category
    transaction = await db.transaction.create(
        data={
            "userId": data.userId,
            "amount": data.amount,
            "type": data.type.lower(),  # Normalize type to lowercase
            "categoryId": data.categoryId,  # Use categoryId instead of category name
            "description": data.description,
            "date": data.date or datetime.utcnow(),
        },
    )

    logger.info(f"Transaction Created: {transaction}")
    return transaction

async def getAllTransactions(user_id: str, db):
    try:
        transactions = await db.transaction.find_many(
            where={"userId": user_id},
            include={"category": True}  # Include the category relationship
        )
        logger.info(f"Fetched Transactions: {transactions}")

        return [
            {
                "id": transaction.id,  # Include the id field
                "userId": transaction.userId,
                "amount": transaction.amount,
                "type": transaction.type.lower(),  # Normalize type to lowercase
                "category": transaction.category.name,  # Include category name
                "description": transaction.description,
                "date": transaction.date,
            }
            for transaction in transactions
        ]
    except Exception as e:
        logger.error(f"Error fetching transactions: {e}")
        raise HTTPException(status_code=500, detail="Error fetching transactions")

async def getTransaction(transaction_id: str, db):
    transaction = await db.transaction.find_unique(where={"id": transaction_id})
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    transaction.type = transaction.type.lower()  # Normalize type to lowercase
    return transaction

async def updateTransaction(transaction_id: str, data: dict, db):
    if "type" in data:
        data["type"] = data["type"].lower()  # Normalize type to lowercase
    transaction = await db.transaction.update(
        where={"id": transaction_id},
        data=data
    )
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

async def deleteTransaction(transaction_id: str, db):
    transaction = await db.transaction.delete(where={"id": transaction_id})
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"message": "Transaction deleted successfully"}

async def getLimitedTransactions(user_id: str, limit: int, db):
    try:
        transactions = await db.transaction.find_many(
            where={"userId": user_id},
            take=limit,
            order={"date": "desc"} 
        )
        return [
            {
                "userId": transaction.userId,
                "amount": transaction.amount,
                "type": transaction.type.lower(),  # Normalize type to lowercase
                "categoryId": transaction.categoryId,
                "description": transaction.description,
                "date": transaction.date,
            }
            for transaction in transactions
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching transactions: {str(e)}")

async def calculateBudget(user_id: str, db):
    transactions = await db.transaction.find_many(where={"userId": user_id})
    income = sum(t.amount for t in transactions if t.type.lower() == "income")
    expenses = sum(t.amount for t in transactions if t.type.lower() == "expense")
    budget = income - expenses

    return budget