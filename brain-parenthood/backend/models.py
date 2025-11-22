from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Text, Index
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    team_memberships = relationship("TeamMember", back_populates="user")
    assessments = relationship("BaselineAssessment", back_populates="user")
    goals = relationship("Goal", back_populates="user")

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    members = relationship("TeamMember", back_populates="team")
    team_assessments = relationship("TeamAssessment", back_populates="team")

class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    team_id = Column(Integer, ForeignKey("teams.id"), index=True)
    role = Column(String, default="member")  # member, admin, owner
    joined_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="team_memberships")
    team = relationship("Team", back_populates="members")

    # Composite index for common queries
    __table_args__ = (
        Index('ix_team_member_user_team', 'user_id', 'team_id'),
    )

class BaselineAssessment(Base):
    __tablename__ = "baseline_assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    module_number = Column(Integer, default=1)

    # Assessment scores (1-10)
    team_stress_level = Column(Integer)
    individual_stress_level = Column(Integer)
    productivity = Column(Integer)
    communication = Column(Integer)
    work_life_balance = Column(Integer)

    # Additional data
    team_size = Column(Integer)
    primary_challenges = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    # Relationships
    user = relationship("User", back_populates="assessments")

    # Composite indexes for common queries
    __table_args__ = (
        Index('ix_assessment_user_module', 'user_id', 'module_number'),
        Index('ix_assessment_user_created', 'user_id', 'created_at'),
    )

class TeamAssessment(Base):
    __tablename__ = "team_assessments"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    module_number = Column(Integer, default=1)

    # Aggregate team scores
    avg_team_stress = Column(Float)
    avg_productivity = Column(Float)
    avg_communication = Column(Float)
    avg_work_life_balance = Column(Float)

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    team = relationship("Team", back_populates="team_assessments")

class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    module_number = Column(Integer, default=1)

    # Goals
    stress_reduction = Column(Text)
    productivity_goal = Column(Text)
    communication_goal = Column(Text)
    personal_goal = Column(Text)
    team_goal = Column(Text)
    success_metrics = Column(Text)

    # Status
    is_achieved = Column(Boolean, default=False, index=True)
    progress_percentage = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="goals")

    # Composite indexes for common queries
    __table_args__ = (
        Index('ix_goal_user_module', 'user_id', 'module_number'),
        Index('ix_goal_user_achieved', 'user_id', 'is_achieved'),
    )

class ModuleProgress(Base):
    __tablename__ = "module_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    module_number = Column(Integer)
    is_completed = Column(Boolean, default=False)
    completion_date = Column(DateTime)
    notes = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    recommendation_type = Column(String)  # personalized_plan, stress_tip, etc.
    content = Column(Text)
    is_read = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
