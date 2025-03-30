from prisma import Prisma

db = Prisma()

async def getPrisma():
    await db.connect()
    try:
        yield db
    finally:
        await db.disconnect()
