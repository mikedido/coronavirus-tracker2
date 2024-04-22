from typing import Optional
from fastapi import APIRouter, status, Response
from src.schemas.covid19 import CovidCategory, CovidRegion, TimeseriesFrequency
import pandas as pd
from src.services.covid19 import Covid19Service
from src.repositories.jhu import JHURepository


router = APIRouter()
covid_service = Covid19Service(JHURepository())


@router.get("/countries/timeseries")
def get_all_category_grouped_by_country(
    frequency: TimeseriesFrequency,
    year: str,
    country_code: str,
    response: Response,
):
    response.status_code = status.HTTP_200_OK
    return covid_service.get_timeseries(country_code, frequency.value, year)


@router.get("/global/daily")
def get_daily_report(
    response: Response,
) -> CovidRegion:
    response.status_code = status.HTTP_200_OK
    return covid_service.get_daily_reports_global()


@router.get("/countries/daily")
def get_daily_report(
    response: Response,
    country_code: str | None = None,
) -> list[CovidRegion] | CovidRegion:
    response.status_code = status.HTTP_200_OK
    return covid_service.get_daily_reports_by_country_code(country_code)


@router.get("/countries/informations")
def get_population_by_country(country_code: str, response: Response):
    response.status_code = status.HTTP_200_OK
    return covid_service.get_country_information(country_code=country_code)
