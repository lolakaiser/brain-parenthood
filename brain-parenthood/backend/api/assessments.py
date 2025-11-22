from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import BaselineAssessment as AssessmentModel, User
from schemas import BaselineAssessment, BaselineAssessmentCreate
from auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=BaselineAssessment, status_code=status.HTTP_201_CREATED)
def create_assessment(
    assessment: BaselineAssessmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new baseline assessment for the current user"""
    db_assessment = AssessmentModel(
        user_id=current_user.id,
        module_number=assessment.module_number,
        team_stress_level=assessment.team_stress_level,
        individual_stress_level=assessment.individual_stress_level,
        productivity=assessment.productivity,
        communication=assessment.communication,
        work_life_balance=assessment.work_life_balance,
        team_size=assessment.team_size,
        primary_challenges=assessment.primary_challenges
    )
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

@router.get("/my-assessments", response_model=List[BaselineAssessment])
def get_my_assessments(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all assessments for the current user with pagination"""
    assessments = db.query(AssessmentModel).filter(
        AssessmentModel.user_id == current_user.id
    ).order_by(AssessmentModel.created_at.desc()).offset(skip).limit(limit).all()
    return assessments

@router.get("/latest", response_model=BaselineAssessment)
def get_latest_assessment(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get the latest assessment for the current user"""
    assessment = db.query(AssessmentModel).filter(
        AssessmentModel.user_id == current_user.id
    ).order_by(AssessmentModel.created_at.desc()).first()

    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No assessment found"
        )
    return assessment

@router.get("/{assessment_id}", response_model=BaselineAssessment)
def get_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get a specific assessment by ID (must belong to current user)"""
    assessment = db.query(AssessmentModel).filter(
        AssessmentModel.id == assessment_id,
        AssessmentModel.user_id == current_user.id
    ).first()
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found"
        )
    return assessment
