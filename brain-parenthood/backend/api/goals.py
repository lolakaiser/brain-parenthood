from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Goal as GoalModel, User
from schemas import Goal, GoalCreate, GoalProgressUpdate
from auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=Goal, status_code=status.HTTP_201_CREATED)
def create_goal(
    goal: GoalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create new goals for the current user"""
    db_goal = GoalModel(
        user_id=current_user.id,
        module_number=goal.module_number,
        stress_reduction=goal.stress_reduction,
        productivity_goal=goal.productivity_goal,
        communication_goal=goal.communication_goal,
        personal_goal=goal.personal_goal,
        team_goal=goal.team_goal,
        success_metrics=goal.success_metrics
    )
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

@router.get("/my-goals", response_model=List[Goal])
def get_my_goals(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all goals for the current user with pagination"""
    goals = db.query(GoalModel).filter(
        GoalModel.user_id == current_user.id
    ).order_by(GoalModel.created_at.desc()).offset(skip).limit(limit).all()
    return goals

@router.get("/{goal_id}", response_model=Goal)
def get_goal(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get a specific goal by ID (must belong to current user)"""
    goal = db.query(GoalModel).filter(
        GoalModel.id == goal_id,
        GoalModel.user_id == current_user.id
    ).first()
    if not goal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Goal not found"
        )
    return goal

@router.put("/{goal_id}/progress", response_model=Goal)
def update_goal_progress(
    goal_id: int,
    progress_update: GoalProgressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update the progress of a goal (must belong to current user)"""
    goal = db.query(GoalModel).filter(
        GoalModel.id == goal_id,
        GoalModel.user_id == current_user.id
    ).first()
    if not goal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Goal not found"
        )

    goal.progress_percentage = progress_update.progress_percentage
    if progress_update.progress_percentage >= 100:
        goal.is_achieved = True

    db.commit()
    db.refresh(goal)
    return goal
