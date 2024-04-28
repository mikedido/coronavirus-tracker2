import Styled from 'styled-components'
import Card from '../Card/index'
import { useFetch } from '../../hooks/useFetch'
import Loader from '../../utils/Loader'
import { Link } from 'react-router-dom'

// Styled Components
const CardsContainer = Styled.div`
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;

  overflow-y: scroll;
  height: 65%;
  overflow-y: scroll;
  display: block;
`
 
const LoaderWrapper = Styled.div`
  display: flex;
  justify-content: center;
`

function DataList() {
    const { data, isLoading, error } = useFetch('http://127.0.0.1:8085/v1/jhu/countries/daily');

    if (error) {
        return <span data-testid="error">{error}</span>
    }

    return (
        isLoading ? (
            <LoaderWrapper>
                <Loader data-testid="loader"/>
            </LoaderWrapper>
        ) : (
            <CardsContainer>
                {data?.map((region) => 
                    <Link  style={{ textDecoration: 'none' }} to = {`/country/${region.country_code}`}>
                        <Card
                            key={`${region.country_region}-${region.country_code}`}
                            countryName={region.country_region}
                            deaths={region.deaths}
                            confirmed={region.confirmed}
                            active={region.active}
                            recovered={region.recovered}
                            country_code={region.country_code}
                        />
                    </Link>
                )}
            </CardsContainer>
        )
    )
}

export default DataList