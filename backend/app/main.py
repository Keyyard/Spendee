from fastapi import FastAPI, Request, Security
from app.routes import auth, transactions, categories, test
from app.middleware.cors import addCorsMiddleware
from app.middleware.rateLimiter import addRateLimiterMiddleware, limiter
from app.middleware.auth import authRequest

app = FastAPI()

# Add Middleware
addCorsMiddleware(app)
addRateLimiterMiddleware(app)

# Include routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(test.router, prefix="/test", tags=["Test"])

@app.get("/")
def home():
    return {"message": "Spendee API is running"}

# uvicorn app.main:app --reload --host 0.0.0.0 --port 8000