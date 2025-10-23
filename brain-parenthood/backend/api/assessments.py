from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import BaselineAssessment as AssessmentModel
from schemas import BaselineAssessment, BaselineAssessmentCreate

router = APIRouter()

@router.post("/", response_model=BaselineAssessment, status_code=status.HTTP_201_CREATED)
def create_assessment(
    user_id: int,
    assessment: BaselineAssessmentCreate,
    db: Session = Depends(get_db)
):
    """Create a new baseline assessment for a user"""
    db_assessment = AssessmentModel(
        user_id=user_id,
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

@router.get("/user/{user_id}", response_model=List[BaselineAssessment])
def get_user_assessments(user_id: int, db: Session = Depends(get_db)):
    """Get all assessments for a specific user"""
    assessments = db.query(AssessmentModel).filter(
        AssessmentModel.user_id == user_id
    ).all()
    return assessments

@router.get("/{assessment_id}", response_model=BaselineAssessment)
def get_assessment(assessment_id: int, db: Session = Depends(get_db)):
    """Get a specific assessment by ID"""
    assessment = db.query(AssessmentModel).filter(
        AssessmentModel.id == assessment_id
    ).first()
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found"
        )
    return assessment

@router.get("/user/{user_id}/latest", response_model=BaselineAssessment)
def get_latest_assessment(user_id: int, db: Session = Depends(get_db)):
    """Get the latest assessment for a user"""
    assessment = db.query(AssessmentModel).filter(
        AssessmentModel.user_id == user_id
    ).order_by(AssessmentModel.created_at.desc()).first()

    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No assessment found for this user"
        )
    return assessment
