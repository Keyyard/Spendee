from fastapi import APIRouter, Depends, Security
from app.schemas.categories import CategorySchema, CategoryUpdateSchema
from app.services.categories import (
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
)
from app.dependencies import getPrisma
from prisma import Prisma
from app.middleware.auth import authRequest

router = APIRouter()

@router.post("/")
async def createCategoryRoute(data: CategorySchema, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await createCategory(data, db)

@router.get("/")
async def getAllCategoriesRoute(db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await getAllCategories(db)

@router.get("/{category_id}")
async def getCategoryRoute(category_id: str, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await getCategory(category_id, db)

@router.put("/{category_id}")
async def updateCategoryRoute(category_id: str, data: CategoryUpdateSchema, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await updateCategory(category_id, data, db)

@router.delete("/{category_id}")
async def deleteCategoryRoute(category_id: str, db: Prisma = Depends(getPrisma), request = Security(authRequest)):
    return await deleteCategory(category_id, db)