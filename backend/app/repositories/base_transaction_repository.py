from abc import ABC, abstractmethod
from app.schemas.transactions import TransactionSchema, TransactionUpdateSchema

class BaseTransactionRepository(ABC):
    @abstractmethod
    async def createTransaction(self, data: TransactionSchema):
        pass

    @abstractmethod
    async def getAllTransactions(self, userId: str):
        pass

    @abstractmethod
    async def getTransaction(self, transactionId: str):
        pass

    @abstractmethod
    async def updateTransaction(self, transactionId: str, data: TransactionUpdateSchema):
        pass

    @abstractmethod
    async def deleteTransaction(self, transactionId: str):
        pass

    @abstractmethod
    async def getLimitedTransactions(self, userId: str, limit: int):
        pass
