from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from fastapi import FastAPI

def addRateLimiterMiddleware(app: FastAPI):
    app.state.limiter = limiter
    app.add_middleware(SlowAPIMiddleware)

limiter = Limiter(key_func=get_remote_address, default_limits=["100/minute"])
