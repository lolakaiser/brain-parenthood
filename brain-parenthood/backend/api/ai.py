from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import PersonalizedPlanRequest, PersonalizedPlanResponse
from typing import List

router = APIRouter()

@router.post("/personalized-plan", response_model=PersonalizedPlanResponse)
def generate_personalized_plan(
    request: PersonalizedPlanRequest,
    db: Session = Depends(get_db)
):
    """
    Generate a personalized plan based on baseline assessment and goals.

    NOTE: This is a placeholder implementation using rule-based logic.
    In a future version, this will be replaced with actual AI/ML models.
    """

    recommendations = []
    focus_areas = []
    suggested_modules = [1]  # Always start with Module 1

    # Analyze stress levels
    if request.baseline_assessment.team_stress_level >= 7:
        recommendations.append(
            "High team stress detected. Prioritize stress reduction techniques in Module 2-3."
        )
        focus_areas.append("Stress Reduction")
        suggested_modules.extend([2, 3])

    if request.baseline_assessment.individual_stress_level >= 7:
        recommendations.append(
            "Focus on individual mindfulness practices and self-care routines."
        )

    # Analyze productivity
    if request.baseline_assessment.productivity <= 5:
        recommendations.append(
            "Productivity improvement recommended. Focus on Module 4-5 for resilience building."
        )
        focus_areas.append("Productivity Enhancement")
        suggested_modules.extend([4, 5])

    # Analyze communication
    if request.baseline_assessment.communication <= 5:
        recommendations.append(
            "Communication improvement needed. Module 6-7 will help build psychological safety."
        )
        focus_areas.append("Communication & Trust")
        suggested_modules.extend([6, 7])

    # Analyze work-life balance
    if request.baseline_assessment.work_life_balance <= 4:
        recommendations.append(
            "Consider implementing flexible work hours and boundaries to improve work-life balance."
        )
        focus_areas.append("Work-Life Balance")

    # Default recommendations
    if not recommendations:
        recommendations.append(
            "Great baseline! Continue building on your strengths throughout the 12-week program."
        )
        suggested_modules = [1, 2, 3, 4, 5, 6, 7]

    # Estimate timeline based on focus areas
    weeks_needed = len(set(suggested_modules)) * 1.5
    estimated_timeline = f"{int(weeks_needed)} weeks"

    return PersonalizedPlanResponse(
        recommendations=recommendations,
        focus_areas=list(set(focus_areas)),
        suggested_modules=sorted(list(set(suggested_modules))),
        estimated_timeline=estimated_timeline
    )

@router.get("/recommendations/{user_id}")
def get_user_recommendations(user_id: int, db: Session = Depends(get_db)):
    """
    Get AI-generated recommendations for a user.

    NOTE: Placeholder implementation. Will be enhanced with actual AI in future.
    """
    # Placeholder recommendations
    recommendations = [
        {
            "type": "daily_practice",
            "content": "Start each day with a 5-minute mindfulness exercise",
            "priority": "high"
        },
        {
            "type": "team_activity",
            "content": "Schedule weekly team check-ins to improve communication",
            "priority": "medium"
        },
        {
            "type": "stress_management",
            "content": "Practice deep breathing exercises when feeling overwhelmed",
            "priority": "high"
        }
    ]

    return recommendations

@router.post("/analyze-progress")
def analyze_progress(user_id: int, db: Session = Depends(get_db)):
    """
    Analyze user progress and provide insights.

    NOTE: Placeholder for future AI-powered analytics.
    """
    return {
        "message": "AI-powered progress analysis coming soon!",
        "user_id": user_id,
        "status": "placeholder"
    }
