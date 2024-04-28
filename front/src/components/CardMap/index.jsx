import { useFetch } from "../../hooks/useFetch"
import Loader from "../../utils/Loader"
import Map from '../../components/Map/Map'
import { geoData } from '../../components/Map/data'
import Styled from "styled-components"


const LoaderWrapper = Styled.div`
  display: flex;
  justify-content: center;
`

const CardMap = () => {

    const width = window.innerWidth * 0.75;
    const height = window.innerHeight * 0.9
    const { data, isLoading, error } = useFetch("http://127.0.0.1:8085/v1/jhu/countries/daily");

    if (error) {
        return <span data-testid="error">{error}</span>
    }

    return(
        isLoading ? (
            <LoaderWrapper>
                <Loader data-testid="loader"/>
            </LoaderWrapper>
        ) : (
            <div>
                <Map data={geoData} width={width} height={height} numData={data} />
            </div>
        )

    )
};

export default CardMap;