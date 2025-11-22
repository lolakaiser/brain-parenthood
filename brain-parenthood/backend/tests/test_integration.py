"""
Integration Tests for Brain Parenthood API

Tests the complete workflow including authentication, assessments, and goals.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app
from database import Base, get_db

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="function")
def client():
    """Create test database and client"""
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as test_client:
        yield test_client
    Base.metadata.drop_all(bind=engine)

class TestAuthenticationFlow:
    """Test complete authentication workflow"""

    def test_signup_login_flow(self, client):
        """Test user signup and login"""
        # Signup
        signup_data = {
            "email": "test@example.com",
            "password": "testpassword123",
            "name": "Test User"
        }
        response = client.post("/api/users/signup", json=signup_data)
        assert response.status_code == 201
        user_data = response.json()
        assert user_data["email"] == "test@example.com"
        assert user_data["name"] == "Test User"
        assert "id" in user_data

        # Login
        login_data = {
            "email": "test@example.com",
            "password": "testpassword123"
        }
        response = client.post("/api/users/login", json=login_data)
        assert response.status_code == 200
        token_data = response.json()
        assert "access_token" in token_data
        assert token_data["token_type"] == "bearer"

        return token_data["access_token"]

    def test_signup_duplicate_email(self, client):
        """Test signup with duplicate email fails"""
        signup_data = {
            "email": "duplicate@example.com",
            "password": "password123",
            "name": "User One"
        }
        response1 = client.post("/api/users/signup", json=signup_data)
        assert response1.status_code == 201

        # Try to signup again with same email
        response2 = client.post("/api/users/signup", json=signup_data)
        assert response2.status_code == 400

    def test_login_invalid_credentials(self, client):
        """Test login with invalid credentials fails"""
        login_data = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
        response = client.post("/api/users/login", json=login_data)
        assert response.status_code == 401

    def test_password_validation(self, client):
        """Test password must be at least 8 characters"""
        signup_data = {
            "email": "short@example.com",
            "password": "short",
            "name": "Test User"
        }
        response = client.post("/api/users/signup", json=signup_data)
        assert response.status_code == 422  # Validation error

class TestAssessmentFlow:
    """Test assessment creation and retrieval"""

    def test_create_and_get_assessment(self, client):
        """Test complete assessment workflow"""
        # Signup and login
        signup_data = {
            "email": "assess@example.com",
            "password": "password123",
            "name": "Assessment User"
        }
        client.post("/api/users/signup", json=signup_data)

        login_response = client.post("/api/users/login", json={
            "email": "assess@example.com",
            "password": "password123"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Create assessment
        assessment_data = {
            "module_number": 1,
            "team_stress_level": 7,
            "individual_stress_level": 6,
            "productivity": 5,
            "communication": 8,
            "work_life_balance": 4,
            "team_size": 10,
            "primary_challenges": "High workload and tight deadlines"
        }
        response = client.post("/api/assessments/", json=assessment_data, headers=headers)
        assert response.status_code == 201
        created_assessment = response.json()
        assert created_assessment["team_stress_level"] == 7
        assert created_assessment["module_number"] == 1

        # Get assessments
        response = client.get("/api/assessments/my-assessments", headers=headers)
        assert response.status_code == 200
        assessments = response.json()
        assert len(assessments) == 1
        assert assessments[0]["team_stress_level"] == 7

        # Get latest assessment
        response = client.get("/api/assessments/latest", headers=headers)
        assert response.status_code == 200
        latest = response.json()
        assert latest["team_stress_level"] == 7

    def test_assessment_validation(self, client):
        """Test assessment field validation"""
        # Signup and login
        signup_data = {
            "email": "validate@example.com",
            "password": "password123",
            "name": "Validation User"
        }
        client.post("/api/users/signup", json=signup_data)

        login_response = client.post("/api/users/login", json={
            "email": "validate@example.com",
            "password": "password123"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Try to create assessment with invalid stress level
        invalid_assessment = {
            "module_number": 1,
            "team_stress_level": 15,  # Invalid: > 10
            "individual_stress_level": 6,
            "productivity": 5,
            "communication": 8,
            "work_life_balance": 4,
            "team_size": 10,
            "primary_challenges": "Test"
        }
        response = client.post("/api/assessments/", json=invalid_assessment, headers=headers)
        assert response.status_code == 422  # Validation error

class TestGoalFlow:
    """Test goal creation and progress tracking"""

    def test_create_and_update_goal(self, client):
        """Test complete goal workflow"""
        # Signup and login
        signup_data = {
            "email": "goals@example.com",
            "password": "password123",
            "name": "Goals User"
        }
        client.post("/api/users/signup", json=signup_data)

        login_response = client.post("/api/users/login", json={
            "email": "goals@example.com",
            "password": "password123"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Create goal
        goal_data = {
            "module_number": 1,
            "stress_reduction": "Reduce team stress from 7 to 4",
            "productivity_goal": "Increase productivity by 20%",
            "communication_goal": "Daily standups",
            "personal_goal": "Learn stress management techniques",
            "team_goal": "Improve work-life balance",
            "success_metrics": "Lower stress scores and higher productivity"
        }
        response = client.post("/api/goals/", json=goal_data, headers=headers)
        assert response.status_code == 201
        created_goal = response.json()
        assert created_goal["stress_reduction"] == "Reduce team stress from 7 to 4"
        assert created_goal["progress_percentage"] == 0
        assert created_goal["is_achieved"] == False
        goal_id = created_goal["id"]

        # Update progress
        progress_data = {"progress_percentage": 50}
        response = client.put(f"/api/goals/{goal_id}/progress", json=progress_data, headers=headers)
        assert response.status_code == 200
        updated_goal = response.json()
        assert updated_goal["progress_percentage"] == 50
        assert updated_goal["is_achieved"] == False

        # Complete goal
        progress_data = {"progress_percentage": 100}
        response = client.put(f"/api/goals/{goal_id}/progress", json=progress_data, headers=headers)
        assert response.status_code == 200
        completed_goal = response.json()
        assert completed_goal["progress_percentage"] == 100
        assert completed_goal["is_achieved"] == True

    def test_goal_progress_validation(self, client):
        """Test goal progress percentage validation"""
        # Signup and login
        signup_data = {
            "email": "progress@example.com",
            "password": "password123",
            "name": "Progress User"
        }
        client.post("/api/users/signup", json=signup_data)

        login_response = client.post("/api/users/login", json={
            "email": "progress@example.com",
            "password": "password123"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Create goal
        goal_data = {
            "module_number": 1,
            "stress_reduction": "Test",
            "productivity_goal": "Test",
            "communication_goal": "Test",
            "personal_goal": "Test",
            "team_goal": "Test",
            "success_metrics": "Test"
        }
        response = client.post("/api/goals/", json=goal_data, headers=headers)
        goal_id = response.json()["id"]

        # Try invalid progress (> 100)
        invalid_progress = {"progress_percentage": 150}
        response = client.put(f"/api/goals/{goal_id}/progress", json=invalid_progress, headers=headers)
        assert response.status_code == 422  # Validation error

        # Try invalid progress (< 0)
        invalid_progress = {"progress_percentage": -10}
        response = client.put(f"/api/goals/{goal_id}/progress", json=invalid_progress, headers=headers)
        assert response.status_code == 422  # Validation error

class TestAuthorizationFlow:
    """Test authorization and access control"""

    def test_unauthorized_access(self, client):
        """Test endpoints require authentication"""
        # Try to access protected endpoints without token
        response = client.get("/api/users/me")
        assert response.status_code == 403  # Forbidden

        response = client.get("/api/assessments/my-assessments")
        assert response.status_code == 403

        response = client.get("/api/goals/my-goals")
        assert response.status_code == 403

    def test_user_data_isolation(self, client):
        """Test users can only access their own data"""
        # Create two users
        user1_data = {"email": "user1@example.com", "password": "password123", "name": "User 1"}
        user2_data = {"email": "user2@example.com", "password": "password123", "name": "User 2"}

        client.post("/api/users/signup", json=user1_data)
        client.post("/api/users/signup", json=user2_data)

        # Login as user1
        login1 = client.post("/api/users/login", json={"email": "user1@example.com", "password": "password123"})
        token1 = login1.json()["access_token"]
        headers1 = {"Authorization": f"Bearer {token1}"}

        # Login as user2
        login2 = client.post("/api/users/login", json={"email": "user2@example.com", "password": "password123"})
        token2 = login2.json()["access_token"]
        headers2 = {"Authorization": f"Bearer {token2}"}

        # User1 creates assessment
        assessment_data = {
            "module_number": 1,
            "team_stress_level": 7,
            "individual_stress_level": 6,
            "productivity": 5,
            "communication": 8,
            "work_life_balance": 4,
            "team_size": 10,
            "primary_challenges": "Test"
        }
        response = client.post("/api/assessments/", json=assessment_data, headers=headers1)
        assessment_id = response.json()["id"]

        # User2 should not be able to access User1's assessment
        response = client.get(f"/api/assessments/{assessment_id}", headers=headers2)
        assert response.status_code == 404  # Not found (due to user_id filter)

        # User1 should be able to access their own assessment
        response = client.get(f"/api/assessments/{assessment_id}", headers=headers1)
        assert response.status_code == 200

class TestPaginationAndPerformance:
    """Test pagination functionality"""

    def test_assessment_pagination(self, client):
        """Test assessment list pagination"""
        # Signup and login
        signup_data = {
            "email": "pagination@example.com",
            "password": "password123",
            "name": "Pagination User"
        }
        client.post("/api/users/signup", json=signup_data)

        login_response = client.post("/api/users/login", json={
            "email": "pagination@example.com",
            "password": "password123"
        })
        token = login_response.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Create 5 assessments
        for i in range(5):
            assessment_data = {
                "module_number": 1,
                "team_stress_level": i + 1,
                "individual_stress_level": 5,
                "productivity": 5,
                "communication": 5,
                "work_life_balance": 5,
                "team_size": 10,
                "primary_challenges": f"Challenge {i}"
            }
            client.post("/api/assessments/", json=assessment_data, headers=headers)

        # Test pagination
        response = client.get("/api/assessments/my-assessments?skip=0&limit=2", headers=headers)
        assert response.status_code == 200
        page1 = response.json()
        assert len(page1) == 2

        response = client.get("/api/assessments/my-assessments?skip=2&limit=2", headers=headers)
        page2 = response.json()
        assert len(page2) == 2

        response = client.get("/api/assessments/my-assessments?skip=4&limit=2", headers=headers)
        page3 = response.json()
        assert len(page3) == 1

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
