from fastapi import APIRouter, Depends, Security
from app.schemas.transactions import TransactionSchema, TransactionUpdateSchema
from app.services.transactions import get_transaction_service
from app.middleware.auth import authRequest
import logging

logger = logging.getLogger("transactions")

router = APIRouter()

@router.post("/")
async def createTransactionRoute(
    data: TransactionSchema,
    service=Depends(get_transaction_service),
    request = Security(authRequest)
):
    return await service.create_transaction(data)

@router.get("/")
async def getAllTransactionsRoute(
    userId: str,
    service=Depends(get_transaction_service),
    request = Security(authRequest)
):
    return await service.get_all_transactions(userId)

@router.get("/limited")
async def getLimitedTransactionsRoute(
    userId: str,
    limit: int,
    service=Depends(get_transaction_service),
    request = Security(authRequest)
):
    return await service.get_limited_transactions(userId, limit)

@router.get("/budget")
async def get_budget(
    userId: str,
    service=Depends(get_transaction_service)
):
    return await service.calculate_budget(userId)

@router.get("/{transactionId}")
async def getTransactionRoute(
    transactionId: str,
    service=Depends(get_transaction_service),
    request = Security(authRequest)
):
    return await service.get_transaction(transactionId)

@router.put("/{transactionId}")
async def updateTransactionRoute(
    transactionId: str,
    data: TransactionUpdateSchema,
    service=Depends(get_transaction_service),
    request = Security(authRequest)
):
    return await service.update_transaction(transactionId, data)

@router.delete("/{transactionId}")
async def deleteTransactionRoute(
    transactionId: str,
    service=Depends(get_transaction_service),
    request = Security(authRequest)
):
    return await service.delete_transaction(transactionId)