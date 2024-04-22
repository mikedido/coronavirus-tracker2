import pytest
from fastapi import status
from fastapi.testclient import TestClient
from src.schemas.covid19 import TimeseriesFrequency


base_url = "/v1/jhu"


def test_get_country_timeseries_frequency(test_client: TestClient):
    params = {
        'country_code' : 'dz',
        'frequency': TimeseriesFrequency.DAY.value,
        'year' : '2020'
    }
    
    response = test_client.get(url= base_url + '/countries/timeseries', params=params)

    assert response.status_code == status.HTTP_200_OK
    assert response.json() is not None


def test_get_timeseries(test_client: TestClient):
    
    response = test_client.get(base_url + "/countries/daily")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() is not None


def test_get_timeseries_with_country_code(test_client: TestClient):
    params = {
        "country_code": "FR"
    }
    response = test_client.get(base_url + "/countries/daily", params=params)

    assert response.status_code == status.HTTP_200_OK
    assert response.json() is not None
