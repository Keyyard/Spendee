from ..dependencies import db
from app.schemas.transactions import TransactionSchema
from fastapi import HTTPException

async def createTransaction(data: TransactionSchema, db):
    # Auto-categorize if category is missing
    if not data.category:
        data.category = "Uncategorized"  # Default category

    transaction = await db.transaction.create(data={
        "userId": data.userId,
        "amount": data.amount,
        "type": data.type,
        "category": data.category,
        "description": data.description,
        "date": data.date
    })
    return transaction

async def getAllTransactions(user_id: str, db):
    transactions = await db.transaction.find_many(where={"userId": user_id})
    return transactions

async def getTransaction(transaction_id: str, db):
    transaction = await db.transaction.find_unique(where={"id": transaction_id})
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

async def updateTransaction(transaction_id: str, data: dict, db):
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