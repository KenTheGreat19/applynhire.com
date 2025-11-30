"""
Test authentication endpoints
"""
from fastapi.testclient import TestClient


def test_health_check(client: TestClient):
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data


def test_signup(client: TestClient):
    """Test user signup"""
    response = client.post(
        "/api/v1/auth/signup",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "password": "testpassword123",
            "role": "applicant"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["name"] == "Test User"
    assert "id" in data


def test_signin(client: TestClient):
    """Test user signin"""
    # First create a user
    client.post(
        "/api/v1/auth/signup",
        json={
            "name": "Test User",
            "email": "signin@example.com",
            "password": "testpassword123",
            "role": "applicant"
        }
    )
    
    # Then sign in
    response = client.post(
        "/api/v1/auth/signin",
        json={
            "email": "signin@example.com",
            "password": "testpassword123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert "user" in data
