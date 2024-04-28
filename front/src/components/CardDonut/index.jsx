import { useFetch } from "../../hooks/useFetch";
import Loader from '../../utils/Loader'
import Styled from 'styled-components'
import { donutData } from '../Donut/data'
import DonutChart from '../Donut/index'

import './index.css'


const LoaderWrapper = Styled.div`
  display: flex;
  justify-content: center;
`

const CardDonut = () => {

    const { data, isLoading, error } = useFetch("http://127.0.0.1:8085/v1/jhu/global/daily");

    if (error) {
        return <span data-testid="error">{error}</span>
    }

    donutData[0].value = data.recovered
    donutData[1].value = data.deaths
    donutData[2].value = data.active

    return(
        isLoading ? (
            <LoaderWrapper>
                <Loader data-testid="loader"/>
            </LoaderWrapper>
        ) : (
        <div class="">
            <div class="confirmed">
                <p>World</p>
                <p>{data.confirmed}</p>
                <p> Total confirmed</p>
            </div>
            <div class="donut">
                <DonutChart data={donutData} width={250} height={250} />
            </div>
            <div class="result">
                <p>{data.active}</p>
                <p>Active</p>
                <div id="wrapper">
                    <div id="first">
                        <p>{data.deaths}</p>
                        <p>Deaths</p>
                    </div>
                    <div id="second">
                        <p>{data.recovered}</p>
                        <p>Recovered</p>
                    </div>
                </div>
            </div>
        </div>)
    )
};

export default CardDonut;