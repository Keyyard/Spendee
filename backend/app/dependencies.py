from prisma import Prisma

db = Prisma()

async def get_db():
    await db.connect()
    try:
        yield db
    finally:
        await db.disconnect()
