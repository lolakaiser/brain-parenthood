from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Team as TeamModel, TeamMember, User
from schemas import Team, TeamCreate, AddTeamMemberRequest
from auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=Team, status_code=status.HTTP_201_CREATED)
def create_team(
    team: TeamCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new team (requires authentication)"""
    db_team = TeamModel(
        name=team.name,
        description=team.description
    )
    db.add(db_team)
    db.commit()
    db.refresh(db_team)

    # Add creator as owner
    member = TeamMember(
        team_id=db_team.id,
        user_id=current_user.id,
        role="owner"
    )
    db.add(member)
    db.commit()

    return db_team

@router.get("/", response_model=List[Team])
def get_teams(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all teams (requires authentication)"""
    teams = db.query(TeamModel).offset(skip).limit(limit).all()
    return teams

@router.get("/{team_id}", response_model=Team)
def get_team(
    team_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get a specific team by ID (requires authentication)"""
    team = db.query(TeamModel).filter(TeamModel.id == team_id).first()
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    return team

@router.post("/{team_id}/members/{user_id}")
def add_team_member(
    team_id: int,
    user_id: int,
    member_request: AddTeamMemberRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Add a user to a team (requires authentication and team admin/owner role)"""
    # Check if team exists
    team = db.query(TeamModel).filter(TeamModel.id == team_id).first()
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )

    # Check if current user is admin or owner of the team
    current_member = db.query(TeamMember).filter(
        TeamMember.team_id == team_id,
        TeamMember.user_id == current_user.id
    ).first()
    if not current_member or current_member.role not in ["admin", "owner"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only team admins or owners can add members"
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
        role=member_request.role.value
    )
    db.add(member)
    db.commit()
    return {"message": "Member added successfully"}
