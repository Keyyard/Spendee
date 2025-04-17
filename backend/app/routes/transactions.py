from fastapi import APIRouter, Depends, Security
from app.schemas.transactions import TransactionSchema
from app.services.transactions import (
    createTransaction,
    getAllTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getLimitedTransactions,
    calculateBudget
)
from app.middleware.auth import authRequest
from app.dependencies import getPrisma
from prisma import Prisma

router = APIRouter()

@router.post("/")
async def createTransactionRoute(data: TransactionSchema, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await createTransaction(data, db)

@router.get("/")
async def getAllTransactionsRoute(userId: str, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await getAllTransactions(userId, db)

@router.get("/limited")
async def getLimitedTransactionsRoute(userId: str, limit: int, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await getLimitedTransactions(userId, limit)

@router.get("/budget")
async def get_budget(userId: str, db=Depends(getPrisma)):
    return await calculateBudget(userId, db)

@router.get("/{transactionId}")
async def getTransactionRoute(transactionId: str, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await getTransaction(transactionId, db)

@router.put("/{transactionId}")
async def updateTransactionRoute(transactionId: str, data: TransactionSchema, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await updateTransaction(transactionId, data, db)

@router.delete("/{transactionId}")
async def deleteTransactionRoute(transactionId: str, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await deleteTransaction(transactionId, db)