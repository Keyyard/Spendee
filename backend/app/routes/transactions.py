from fastapi import APIRouter, Depends, Security
from app.schemas.transactions import TransactionSchema
from app.services.transactions import (
    createTransaction,
    getAllTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
)
from app.middleware.auth import authRequest
from app.dependencies import getPrisma
from prisma import Prisma

router = APIRouter()


@router.post("/")
async def createTransactionRoute(data: TransactionSchema, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await createTransaction(data, db)

@router.get("/")
async def getAllTransactionsRoute(user_id: str, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await getAllTransactions(user_id, db)

@router.get("/{transaction_id}")
async def getTransactionRoute(transaction_id: str, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await getTransaction(transaction_id, db)

@router.put("/{transaction_id}")
async def updateTransactionRoute(transaction_id: str, data: dict, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await updateTransaction(transaction_id, data, db)

@router.delete("/{transaction_id}")
async def deleteTransactionRoute(transaction_id: str, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await deleteTransaction(transaction_id, db)