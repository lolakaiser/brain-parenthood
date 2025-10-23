from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

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
    team_stress_level: int
    individual_stress_level: int
    productivity: int
    communication: int
    work_life_balance: int
    team_size: int
    primary_challenges: str

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
    stress_reduction: str
    productivity_goal: str
    communication_goal: str
    personal_goal: str
    team_goal: str
    success_metrics: str

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
