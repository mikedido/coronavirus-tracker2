import pandas as pd


class DataUtils:
    @staticmethod
    def get_data(data_url: str, use_columns: list[str]) -> pd.DataFrame:
        return pd.read_csv(
            data_url,
            usecols=use_columns,
        )

    @staticmethod
    def organized_data_by_frequency(data: pd.DataFrame, frequency: str) -> pd.DataFrame:
        droped_column = "country/region"
        df_dates = data.drop(droped_column, axis=1)

        df_dates.columns = pd.to_datetime(df_dates.columns, format="%m/%d/%y").strftime(
            frequency
        )

        df_grouped = df_dates.groupby(df_dates.columns, axis=1).sum()

        df_grouped[droped_column] = data[droped_column]

        return df_grouped
