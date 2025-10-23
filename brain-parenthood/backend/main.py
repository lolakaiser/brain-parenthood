from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import users, assessments, goals, teams, ai
from database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Brain Parenthood API",
    description="Backend API for Brain Parenthood - A 12-Week Resilience Toolkit",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(teams.router, prefix="/api/teams", tags=["teams"])
app.include_router(assessments.router, prefix="/api/assessments", tags=["assessments"])
app.include_router(goals.router, prefix="/api/goals", tags=["goals"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Brain Parenthood API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
