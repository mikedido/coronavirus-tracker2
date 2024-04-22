import pandas as pd
from src.utils.country_code import get_country_code, get_country_name
from src.utils.data import DataUtils

DATA_DAILY_REPORTS_BASE_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/%s.csv"
DATE_TIME_SERIES_BASE_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_%s_global.csv"
INFO_COUNTRY_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv"


frequency_format = {
    "year" : "%Y",
    "month" : "%Y-%m",
    "day" : "%Y-%m-%d",
}

class JHURepository:

    # @staticmethod
    # def _read_data(data_url: str, use_columns: list[str]) -> pd.DataFrame:
    #     return pd.read_csv(
    #         data_url,
    #         usecols=use_columns,
    #     )

    # @staticmethod
    # def _organized_data_by_frequency(data: pd.DataFrame, frequency: str) -> pd.DataFrame:
    #     df_dates = data.drop("country/region", axis=1)

    #     df_dates.columns = pd.to_datetime(df_dates.columns, format="%m/%d/%y").strftime(
    #         frequency
    #     )

    #     df_grouped = df_dates.groupby(df_dates.columns, axis=1).sum()

    #     df_grouped["country/region"] = data["country/region"]

    #     return df_grouped


    def get_daily_report_by_country_code(self, country_code: str, date: str = "03-09-2023"):
        df = pd.read_csv(
            DATA_DAILY_REPORTS_BASE_URL % date,
            usecols=["Country_Region", "Confirmed", "Deaths", "Recovered", "Active", "Incident_Rate", "Case_Fatality_Ratio"],
        )
        df.columns = df.columns.str.lower()
        data = df.groupby("country_region").sum().reset_index()

        data["country_code"] = [
            get_country_code(region) for _, region in data["country_region"].items()
        ]

        if country_code:
            data = data[data["country_code"] == country_code.upper()].iloc[0]
            return data.to_dict()

        return data.to_dict(orient="records")

    def get_global_daily_report(self, date: str):
        df = pd.read_csv(
            DATA_DAILY_REPORTS_BASE_URL % date,
            usecols=["Country_Region", "Confirmed", "Deaths", "Recovered", "Active"],
        )
        df.columns = df.columns.str.lower()
        return df.groupby("country_region").sum().reset_index()


    def get_timeseries_by_country_code_and_category_and_frequency(self, country_name: str, category: str, frequency: str, data_year: str):
        df = pd.read_csv(DATE_TIME_SERIES_BASE_URL % category)
        
        df.columns = df.columns.str.lower()

        df = df.drop(labels=["lat", "long", "province/state"], axis=1)

        data = df.groupby("country/region").sum().reset_index()

        # new_data = JHURepository._organized_data_by_frequency(data, frequency=frequency_format[frequency])
        new_data = DataUtils.organized_data_by_frequency(data, frequency=frequency_format[frequency])

        new_data = new_data[new_data["country/region"] == country_name]

        df_filtered = new_data[[col for col in new_data.columns if col.startswith(data_year)]]

        return df_filtered


    def get_country_info(self, country_code: str):
        df = pd.read_csv(
            INFO_COUNTRY_URL,
            usecols=["iso2", "Country_Region", "Lat", "Long_", "Population"],
        )

        df.columns = df.columns.str.lower()

        new_data = df[df["iso2"] == country_code.upper()].iloc[0]

        return new_data.to_dict()