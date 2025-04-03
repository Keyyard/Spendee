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
async def getAllTransactionsRoute(user_id: str, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await getAllTransactions(user_id, db)

@router.get("/budget")
async def get_budget(user_id: str, db=Depends(getPrisma)):
    return await calculateBudget(user_id, db)