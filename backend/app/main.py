from fastapi import FastAPI
from app.middleware.cors import add_cors_middleware

app = FastAPI()

# Middlewares
add_cors_middleware(app)

@app.get("/")
def root():
    return {"message": "Welcome to Spendee API"}
