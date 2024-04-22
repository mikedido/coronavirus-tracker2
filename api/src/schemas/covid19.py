from enum import Enum
from pydantic import BaseModel


class TimeseriesFrequency(str, Enum):
    YEAR = "year"
    MONTH = "month"
    DAY = "day"


class CovidCategory(str, Enum):
    NONE = ""
    DEATHS = "deaths"
    CONFIRMED = "confirmed"
    RECOVERED = "recovered"


class CovidRegion(BaseModel):
    country_region: str
    confirmed: int
    deaths: int
    recovered: int
    active: int
    incident_rate: float | None = None
    case_fatality_ratio: float | None = None
    country_code: str | None = None



class CountryMap(BaseModel):
    country_region: str
    country_code: str
    confirmed: int
    deaths: int
    active: int
    recovered: int
