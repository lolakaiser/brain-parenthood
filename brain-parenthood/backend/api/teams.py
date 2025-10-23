from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Team as TeamModel, TeamMember
from schemas import Team, TeamCreate

router = APIRouter()

@router.post("/", response_model=Team, status_code=status.HTTP_201_CREATED)
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    """Create a new team"""
    db_team = TeamModel(
        name=team.name,
        description=team.description
    )
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team

@router.get("/", response_model=List[Team])
def get_teams(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all teams"""
    teams = db.query(TeamModel).offset(skip).limit(limit).all()
    return teams

@router.get("/{team_id}", response_model=Team)
def get_team(team_id: int, db: Session = Depends(get_db)):
    """Get a specific team by ID"""
    team = db.query(TeamModel).filter(TeamModel.id == team_id).first()
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    return team

@router.post("/{team_id}/members/{user_id}")
def add_team_member(team_id: int, user_id: int, role: str = "member", db: Session = Depends(get_db)):
    """Add a user to a team"""
    # Check if team exists
    team = db.query(TeamModel).filter(TeamModel.id == team_id).first()
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )

    # Check if already a member
    existing = db.query(TeamMember).filter(
        TeamMember.team_id == team_id,
        TeamMember.user_id == user_id
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already a team member"
        )

    # Add member
    member = TeamMember(
        team_id=team_id,
        user_id=user_id,
        role=role
    )
    db.add(member)
    db.commit()
    return {"message": "Member added successfully"}
