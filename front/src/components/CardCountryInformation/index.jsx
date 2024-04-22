import { useFetch } from "../../hooks/useFetch";
import Loader from '../../utils/Loader'
import Styled from 'styled-components'
import CardCountry from "../CardCountry";


const LoaderWrapper = Styled.div`
  display: flex;
  justify-content: center;
`

const CardCountryInformation = ({country_code}) => {

    const {data, error, isLoading} = useFetch("http://127.0.0.1:8085/v1/jhu/countries/daily?country_code="+country_code)

    if (error) {
        return <span data-testid="error">{error}</span>
    }

    return (
        isLoading ? (
            <LoaderWrapper>
                <Loader data-testid="loader"/>
            </LoaderWrapper>
        ) : (
            <div>
                <div>
                    <div>
                        <CardCountry key= {data.country_region}
                            countryName={data.country_region}
                            deaths={data.deaths}
                            confirmed={data.confirmed}
                            active={data.active}
                            recovered={data.recovered}
                            country_code={data.country_code}
                            incident_rate={data.incident_rate}
                            fatality_ratio={data.case_fatality_ratio}/>
                    </div>
                </div>
            </div>
        )
    )
}

export default CardCountryInformation;