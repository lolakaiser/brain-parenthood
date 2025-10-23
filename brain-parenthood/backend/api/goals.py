from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Goal as GoalModel
from schemas import Goal, GoalCreate

router = APIRouter()

@router.post("/", response_model=Goal, status_code=status.HTTP_201_CREATED)
def create_goal(
    user_id: int,
    goal: GoalCreate,
    db: Session = Depends(get_db)
):
    """Create new goals for a user"""
    db_goal = GoalModel(
        user_id=user_id,
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

@router.get("/user/{user_id}", response_model=List[Goal])
def get_user_goals(user_id: int, db: Session = Depends(get_db)):
    """Get all goals for a specific user"""
    goals = db.query(GoalModel).filter(GoalModel.user_id == user_id).all()
    return goals

@router.get("/{goal_id}", response_model=Goal)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    """Get a specific goal by ID"""
    goal = db.query(GoalModel).filter(GoalModel.id == goal_id).first()
    if not goal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Goal not found"
        )
    return goal

@router.put("/{goal_id}/progress")
def update_goal_progress(
    goal_id: int,
    progress_percentage: int,
    db: Session = Depends(get_db)
):
    """Update the progress of a goal"""
    goal = db.query(GoalModel).filter(GoalModel.id == goal_id).first()
    if not goal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Goal not found"
        )

    goal.progress_percentage = progress_percentage
    if progress_percentage >= 100:
        goal.is_achieved = True

    db.commit()
    db.refresh(goal)
    return goal
