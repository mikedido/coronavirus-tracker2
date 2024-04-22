from src.schemas.covid19 import CovidCategory, CountryMap
import pandas as pd
from src.utils.country_code import get_country_code, get_country_name


DATA_DAILY_REPORTS_BASE_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/%s.csv"
DATE_TIME_SERIES_BASE_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_%s_global.csv"
INFO_COUNTRY_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv"


def get_daily_reports_by_country_name(country_name: str):
    """
    Returns all the confirmed, deaths, recovered and active by a country name
    """
    df = pd.read_csv(
        DATA_DAILY_REPORTS_BASE_URL % date,
        usecols=["Country_Region", "Confirmed", "Deaths", "Recovered", "Active"],
    )
    df.columns = df.columns.str.lower()
    data = df.groupby("country_region").sum().reset_index()

    row = data[data["country_region"] == country_name]
    result = row.iloc[:, -1]
    return result[0], result.name


def _get_timeseries_by_day_and_by_category(country_code: str, category: CovidCategory):
    country_name = get_country_name(country_code)

    df = pd.read_csv(DATE_TIME_SERIES_BASE_URL % category)
    df.columns = df.columns.str.lower()

    df = df.drop(labels=["lat", "long"], axis=1)

    data = df.groupby("country/region").sum().reset_index()
    row = data[data["country/region"] == country_name]

    data = {
        str(_): int(v)
        for _, v in row.iloc[0].items()
        if _ != "country/region" and _ != "province/state"
    }

    return {"country_region": country_name, "data": data}


def get_timeseries(country_code: str, frequency: str, year: str):
    match frequency:
        case "month":
            return get_timeseries_grouped_by_months(
                country_code=country_code, year=year
            )
        case "day":
            return get_timeseries_frequency_day(country_code=country_code, year=year)
        case "year":
            return get_timeseries_by_frequency(
                country_code=country_code,
                year=year,
                frequency={"name": "year", "format": "%Y"},
            )
        case _:
            raise Exception("Error")


def get_daily_reports_by_country_code(
    country_code: str = None, date: str = "03-09-2023"
):
    """
    Returns all the confirmed, deaths, recovered and active of all countries.
    """
    df = pd.read_csv(
        DATA_DAILY_REPORTS_BASE_URL % date,
        usecols=[
            "Country_Region",
            "Confirmed",
            "Deaths",
            "Recovered",
            "Active",
            "Incident_Rate",
            "Case_Fatality_Ratio",
        ],
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


def get_daily_reports_global(date: str = "03-09-2023"):
    """
    Returns global world confirmed, deaths, recovered and active.
    """
    df = pd.read_csv(
        DATA_DAILY_REPORTS_BASE_URL % date,
        usecols=["Country_Region", "Confirmed", "Deaths", "Recovered", "Active"],
    )
    df.columns = df.columns.str.lower()
    data = df.groupby("country_region").sum().reset_index()

    return {
        "country_region": "world",
        "confirmed": int(data["confirmed"].sum()),
        "deaths": int(data["deaths"].sum()),
        "recovered": int(data["recovered"].sum()),
        "active": int(data["active"].sum()),
    }


def get_timeseries_by_frequency(
    country_code: str = "FR",
    year: str = "2023",
    frequency={"name": "year", "format": "%Y"},
):
    country_name = get_country_name(country_code)

    confirmed_timeseries = _get_timeseries_grouped_by_frequency_and_by_category(
        category=CovidCategory.CONFIRMED.value,
        country_code=country_code,
        year=year,
        frequency=frequency,
    )
    death_timeseries = _get_timeseries_grouped_by_frequency_and_by_category(
        CovidCategory.DEATHS.value, country_code, year, frequency=frequency
    )
    recovered_timeseries = _get_timeseries_grouped_by_frequency_and_by_category(
        CovidCategory.RECOVERED.value, country_code, year, frequency=frequency
    )

    frames = [confirmed_timeseries, death_timeseries, recovered_timeseries]
    concated_frames = pd.concat(frames, keys=["confirmed", "deaths", "recovered"])

    test = [v for _, v in concated_frames.to_dict(orient="index").items()]
    result = []

    for key, value in test[0].items():
        result.append(
            {
                frequency["name"]: key,
                "confirmed": value,
                "death": test[1][key],
                "recovered": test[2][key],
            }
        )

    return {"country_name": country_name, "data": result}


def get_timeseries_grouped_by_months(country_code: str = "FR", year: str = "2023"):
    country_name = get_country_name(country_code)

    confirmed_timeseries = _get_timeseries_grouped_by_months_and_by_category(
        category=CovidCategory.CONFIRMED.value, country_name=country_name, year=year
    )
    death_timeseries = _get_timeseries_grouped_by_months_and_by_category(
        CovidCategory.DEATHS.value, country_name, year
    )
    recovered_timeseries = _get_timeseries_grouped_by_months_and_by_category(
        CovidCategory.RECOVERED.value, country_name, year
    )

    frames = [confirmed_timeseries, death_timeseries, recovered_timeseries]
    concated_frames = pd.concat(frames, keys=["confirmed", "deaths", "recovered"])

    test = [v for _, v in concated_frames.to_dict(orient="index").items()]
    result = []

    for key, value in test[0].items():
        result.append(
            {
                "month": key,
                "confirmed": value,
                "death": test[1][key],
                "recovered": test[2][key],
            }
        )

    return {"country_name": country_name, "data": result}


def get_timeseries_frequency_day(country_code: str = "FR", year: str = "2023"):
    country_name = get_country_name(country_code)

    confirmed_timeseries = _get_timeseries_grouped_by_day_and_by_category(
        category=CovidCategory.CONFIRMED.value, country_code=country_code, year=year
    )
    death_timeseries = _get_timeseries_grouped_by_day_and_by_category(
        CovidCategory.DEATHS.value, country_code, year
    )
    recovered_timeseries = _get_timeseries_grouped_by_day_and_by_category(
        CovidCategory.RECOVERED.value, country_code, year
    )

    frames = [confirmed_timeseries, death_timeseries, recovered_timeseries]
    concated_frames = pd.concat(frames, keys=["confirmed", "deaths", "recovered"])

    test = [v for _, v in concated_frames.to_dict(orient="index").items()]
    result = []

    for key, value in test[0].items():
        result.append(
            {
                "day": key,
                "confirmed": value,
                "death": test[1][key],
                "recovered": test[2][key],
            }
        )

    return {"country_name": country_name, "data": result}


def _get_timeseries_grouped_by_months_and_by_category(
    category: CovidCategory, country_name: str, year: str = "2023"
):
    df = pd.read_csv(DATE_TIME_SERIES_BASE_URL % category)
    df.columns = df.columns.str.lower()

    df = df.drop(labels=["lat", "long", "province/state"], axis=1)

    data = df.groupby("country/region").sum().reset_index()

    new_data = _get_time_series_by_month(data)
    new_data = new_data[new_data["country/region"] == country_name]

    df_filtered = new_data[[col for col in new_data.columns if col.startswith(year)]]

    return df_filtered


def _get_timeseries_grouped_by_day_and_by_category(
    category: CovidCategory, country_code: str = "FR", year: str = "2023"
):
    country_name = get_country_name(country_code)

    df = pd.read_csv(DATE_TIME_SERIES_BASE_URL % category)
    df.columns = df.columns.str.lower()

    df = df.drop(labels=["lat", "long", "province/state"], axis=1)

    data = df.groupby("country/region").sum().reset_index()

    new_data = _get_time_series_by_day(data)

    new_data = new_data[new_data["country/region"] == country_name]

    df_filtered = new_data[[col for col in new_data.columns if col.startswith(year)]]

    return df_filtered


def _get_timeseries_grouped_by_frequency_and_by_category(
    category: CovidCategory,
    country_code: str = "FR",
    year: str = "2023",
    frequency={"name": "year", "format": "%Y"},
):
    """
    la fonction générique
    """
    country_name = get_country_name(country_code)

    df = pd.read_csv(DATE_TIME_SERIES_BASE_URL % category)
    df.columns = df.columns.str.lower()

    df = df.drop(labels=["lat", "long", "province/state"], axis=1)

    data = df.groupby("country/region").sum().reset_index()

    new_data = _organized_data_by_frequency(data, frequency=frequency["format"])

    new_data = new_data[new_data["country/region"] == country_name]

    df_filtered = new_data[[col for col in new_data.columns if col.startswith(year)]]

    return df_filtered


def _get_time_series_by_month(data: pd.DataFrame) -> pd.DataFrame:
    df_dates = data.drop("country/region", axis=1)

    df_dates.columns = pd.to_datetime(df_dates.columns, format="%m/%d/%y").strftime(
        "%Y-%m"
    )

    df_grouped = df_dates.groupby(df_dates.columns, axis=1).sum()

    df_grouped["country/region"] = data["country/region"]

    return df_grouped


def _get_time_series_by_day(data: pd.DataFrame) -> pd.DataFrame:
    df_dates = data.drop("country/region", axis=1)

    df_dates.columns = pd.to_datetime(df_dates.columns, format="%m/%d/%y").strftime(
        "%Y-%m-%d"
    )

    df_grouped = df_dates.groupby(df_dates.columns, axis=1).sum()

    df_grouped["country/region"] = data["country/region"]

    return df_grouped


def _organized_data_by_frequency(data: pd.DataFrame, frequency: str) -> pd.DataFrame:
    df_dates = data.drop("country/region", axis=1)

    df_dates.columns = pd.to_datetime(df_dates.columns, format="%m/%d/%y").strftime(
        frequency
    )

    df_grouped = df_dates.groupby(df_dates.columns, axis=1).sum()

    df_grouped["country/region"] = data["country/region"]

    return df_grouped


def get_country_information(country_code: str):
    df = pd.read_csv(
        INFO_COUNTRY_URL,
        usecols=["iso2", "Country_Region", "Lat", "Long_", "Population"],
    )

    df.columns = df.columns.str.lower()

    new_data = df[df["iso2"] == country_code.upper()].iloc[0]

    return new_data.to_dict()
