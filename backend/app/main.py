from fastapi import FastAPI
from app.routes import transactions, categories, test, auth, insight
from app.middleware.cors import addCorsMiddleware
from app.middleware.rateLimiter import addRateLimiterMiddleware

app = FastAPI()

# Add Middleware
addCorsMiddleware(app)
addRateLimiterMiddleware(app)

# Include routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(test.router, prefix="/test", tags=["Test"])
app.include_router(insight.router, prefix="/insight", tags=["Insight"])

@app.get("/")
def home():
    return {"message": "Spendee API is running"}
