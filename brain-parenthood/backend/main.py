from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from api import users, assessments, goals, teams, ai
from database import engine, Base
import os

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Brain Parenthood API",
    description="Backend API for Brain Parenthood - A 12-Week Resilience Toolkit",
    version="1.0.0"
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Determine allowed origins from environment or use defaults
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:3001"
).split(",")

# Configure CORS with specific origins (no wildcards)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["Content-Type", "Authorization"],
)

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(teams.router, prefix="/api/teams", tags=["teams"])
app.include_router(assessments.router, prefix="/api/assessments", tags=["assessments"])
app.include_router(goals.router, prefix="/api/goals", tags=["goals"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])

@app.get("/")
@limiter.limit("60/minute")
def read_root(request: Request):
    return {
        "message": "Welcome to Brain Parenthood API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
@limiter.limit("120/minute")
def health_check(request: Request):
    return {"status": "healthy"}
