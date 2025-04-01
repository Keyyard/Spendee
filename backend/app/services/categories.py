from ..dependencies import db
from app.schemas.categories import CategorySchema, CategoryUpdateSchema
from fastapi import HTTPException

async def createCategory(data: CategorySchema, db):
    category = await db.category.create(data={
        "userId": data.userId,
        "name": data.name,
    })
    return category

async def getAllCategories(db):
    categories = await db.category.find_many()
    return categories

async def getCategory(category_id: str, db):
    category = await db.category.find_unique(where={"id": category_id})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

async def updateCategory(category_id: str, data: CategoryUpdateSchema, db):
    category = await db.category.update(
        where={"id": category_id},
        data={"name": data.name}
    )
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

async def deleteCategory(category_id: str, db):
    category = await db.category.delete(where={"id": category_id})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}