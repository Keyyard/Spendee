from app.schemas.auth import SignInSchema
from ..dependencies import db

DEFAULT_CATEGORIES = [
    "Food", "Transport", "Shopping", "Entertainment", "Health", "Education", "Bills", "Uncategorized"
]

async def signIn(data: SignInSchema, db):
    user = await db.user.find_first(where={"id": data.id})

    if not user:
        # If user doesn't exist, create it using Clerk's data
        user = await db.user.create(data={
            "id": data.id
        })

        # Create default categories for the user
        for category in DEFAULT_CATEGORIES:
            await db.category.create(data={
                "name": category,
                "userId": user.id
            })

    return {"message": "Signed in successfully", "user": user}

