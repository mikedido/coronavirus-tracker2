import pandas as pd
from src.schemas.covid19 import CovidCategory, CountryMap
from src.repositories.jhu import JHURepository
from src.utils.country_code import get_country_code, get_country_name


class Covid19Service:
    def __init__(self, jhu_repository: JHURepository):
        self.jhu_repository = jhu_repository

    def get_timeseries(self, country_code: str, frequency: str, data_year: str):
        country_name = get_country_name(country_code)

        confirmed_timeseries = self.jhu_repository.get_timeseries_by_country_code_and_category_and_frequency(
            category=CovidCategory.CONFIRMED.value,
            country_name=country_name,
            data_year=data_year,
            frequency=frequency,
        )
        death_timeseries = self.jhu_repository.get_timeseries_by_country_code_and_category_and_frequency(
            category=CovidCategory.DEATHS.value,
            country_name=country_name,
            data_year=data_year,
            frequency=frequency,
        )
        recovered_timeseries = self.jhu_repository.get_timeseries_by_country_code_and_category_and_frequency(
            category=CovidCategory.RECOVERED.value,
            country_name=country_name,
            data_year=data_year,
            frequency=frequency,
        )

        frames = [confirmed_timeseries, death_timeseries, recovered_timeseries]
        concated_frames = pd.concat(frames, keys=["confirmed", "deaths", "recovered"])

        test = [v for _, v in concated_frames.to_dict(orient="index").items()]
        result = []

        for key, value in test[0].items():
            result.append(
                {
                    frequency: key,
                    "confirmed": value,
                    "death": test[1][key],
                    "recovered": test[2][key],
                }
            )

        return {"country_name": country_name, "data": result}

    def get_daily_reports_by_country_code(self, country_code: str):
        """
        Returns all the confirmed, deaths, recovered and active of all countries.
        """
        return self.jhu_repository.get_daily_report_by_country_code(
            country_code=country_code
        )

    def get_daily_reports_global(self, daily_date: str = "03-09-2023"):
        """
        Returns global world confirmed, deaths, recovered and active.
        """
        data = self.jhu_repository.get_global_daily_report(date=daily_date)

        return {
            "country_region": "world",
            "confirmed": int(data["confirmed"].sum()),
            "deaths": int(data["deaths"].sum()),
            "recovered": int(data["recovered"].sum()),
            "active": int(data["active"].sum()),
        }

    def get_country_information(self, country_code: str):
        return self.jhu_repository.get_country_info(country_code=country_code)
