from fastapi.testclient import TestClient
from src.app import get_application


app = get_application()
client = TestClient(app)

def test_route_hello():
    url = "/healthcheck"
    response = client.get(url)

    assert response.status_code == 200
    assert response.json() == {'message': 'API UP!'} 
