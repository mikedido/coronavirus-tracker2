import pytest
from fastapi.testclient import TestClient
from src.app import get_application


@pytest.fixture
def data():
    return {
        "test": 'hello'
    }


@pytest.fixture
def test_client() -> TestClient:
    app = get_application()
    return TestClient(app)