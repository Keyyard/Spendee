from ..dependencies import db
from app.schemas.transactions import TransactionSchema
from fastapi import HTTPException

async def createTransaction(data: TransactionSchema, db):
    if not data.userId:
        raise HTTPException(status_code=400, detail="Missing required fields: userId")

    # Auto-categorize if category is missing
    if not data.category:
        data.category = "Uncategorized"  # Default category

    # Find or create the category
    category = await db.category.find_first(where={"name": data.category, "userId": data.userId})
    if not category:
        category = await db.category.create(data={"name": data.category, "userId": data.userId})

    # Create the transaction and link it to the category
    transaction = await db.transaction.create(
        data={
            "userId": data.userId,
            "amount": data.amount,
            "type": data.type,
            "category": category.name,  # Use the category name
            "description": data.description,
            "date": data.date or datetime.utcnow(),  # Use current date if not provided
        },
        include={
            "user": True,  # Include the full User object
            "Category": True,  # Include the related Category objects
        },
    )
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