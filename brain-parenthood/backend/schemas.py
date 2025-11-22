from pydantic import BaseModel, EmailStr, Field, validator
from datetime import datetime
from typing import Optional, List
from enum import Enum

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters")

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Team schemas
class TeamBase(BaseModel):
    name: str
    description: Optional[str] = None

class TeamCreate(TeamBase):
    pass

class Team(TeamBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Baseline Assessment schemas
class BaselineAssessmentBase(BaseModel):
    team_stress_level: int = Field(..., ge=1, le=10, description="Team stress level (1-10)")
    individual_stress_level: int = Field(..., ge=1, le=10, description="Individual stress level (1-10)")
    productivity: int = Field(..., ge=1, le=10, description="Productivity level (1-10)")
    communication: int = Field(..., ge=1, le=10, description="Communication quality (1-10)")
    work_life_balance: int = Field(..., ge=1, le=10, description="Work-life balance (1-10)")
    team_size: int = Field(..., ge=1, le=1000, description="Number of team members")
    primary_challenges: str = Field(..., min_length=1, max_length=2000, description="Primary challenges")

class BaselineAssessmentCreate(BaselineAssessmentBase):
    module_number: int = 1

class BaselineAssessment(BaselineAssessmentBase):
    id: int
    user_id: int
    module_number: int
    created_at: datetime

    class Config:
        from_attributes = True

# Goal schemas
class GoalBase(BaseModel):
    stress_reduction: str = Field(..., min_length=1, max_length=500)
    productivity_goal: str = Field(..., min_length=1, max_length=500)
    communication_goal: str = Field(..., min_length=1, max_length=500)
    personal_goal: str = Field(..., min_length=1, max_length=1000)
    team_goal: str = Field(..., min_length=1, max_length=1000)
    success_metrics: str = Field(..., min_length=1, max_length=1000)

class GoalCreate(GoalBase):
    module_number: int = 1

class Goal(GoalBase):
    id: int
    user_id: int
    module_number: int
    is_achieved: bool
    progress_percentage: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class GoalProgressUpdate(BaseModel):
    progress_percentage: int = Field(..., ge=0, le=100, description="Progress percentage (0-100)")

# AI Recommendation schemas
class AIRecommendationBase(BaseModel):
    recommendation_type: str
    content: str

class AIRecommendation(AIRecommendationBase):
    id: int
    user_id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

class PersonalizedPlanRequest(BaseModel):
    baseline_assessment: BaselineAssessmentBase
    goals: GoalBase

class PersonalizedPlanResponse(BaseModel):
    recommendations: List[str]
    focus_areas: List[str]
    suggested_modules: List[int]
    estimated_timeline: str

# Authentication schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Team member role enum
class TeamRole(str, Enum):
    MEMBER = "member"
    ADMIN = "admin"
    OWNER = "owner"

class AddTeamMemberRequest(BaseModel):
    role: TeamRole = Field(default=TeamRole.MEMBER, description="Role of the team member")
