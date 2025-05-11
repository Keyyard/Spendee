from prisma import Prisma

# Singleton Prisma client instance
db = Prisma()

async def getPrisma():
    if not db.is_connected():
        await db.connect()
    try:
        yield db
    except Exception as e:
        raise e
    finally:
        # Do not disconnect here to avoid repeated connection issues
        pass
