from fastapi import FastAPI
from app.middleware.cors import add_cors_middleware
from app.routes.auth import router as auth_router
from app.routes.protected import router as protected_router

app = FastAPI()

# Middlewares
add_cors_middleware(app)

# Routers
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(protected_router, prefix="/protected", tags=["Protected"])

@app.get("/")
def root():
    return {"message": "Welcome to Spendee API"}
