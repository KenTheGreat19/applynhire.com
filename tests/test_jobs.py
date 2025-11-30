"""
Test job endpoints
"""
from fastapi.testclient import TestClient


def test_list_jobs(client: TestClient):
    """Test listing jobs"""
    response = client.get("/api/v1/jobs")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
