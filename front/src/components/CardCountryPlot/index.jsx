// import { data } from '../BarPlot/data'
import { useFetch } from '../../hooks/useFetch'
import Loader from '../../utils/Loader'
import Styled from 'styled-components'
import BarPlot from '../BarPlot'
import { useState } from 'react'
import "./index.css"


import React, { PureComponent } from 'react';
import { LineChart, Line, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart } from 'recharts';
const LoaderWrapper = Styled.div`
  display: flex;
  justify-content: center;
`

// const CardCountryPlot = ({country_code}) => {

//     // ”La folie, c'est de faire toujours la même chose et de s'attendre à un résultat différent“
//     const [year, setYear] = useState(2020)

//     const {data, error, isLoading} = useFetch("http://127.0.0.1:8085/v1/jhu/countries/timeseries?frequency=month&country_code="+country_code+"&year="+year)

//     if (error) {
//         return <span data-testid="error">{error}</span>
//     }
    
//     return (
//         isLoading ? (
//             <LoaderWrapper>
//                 <Loader data-testid="loader"/>
//             </LoaderWrapper>
//         ) : (
//             <div class="card-plot">
//                 <div>
//                     <select class="selector-year" onChange={(e) => setYear(e.target.value) }>
//                         <option value="2020">2020</option>
//                         <option value="2021">2021</option>
//                         <option value="2022">2022</option>
//                         <option value="2023">2023</option>
//                     </select>
//                     <BarPlot data={data.data} width={600} height={600} />
//                 </div>
//             </div>
//         )
//     )
// }

// export default CardCountryPlot;

const CardCountryPlot = ({country_code}) => {

    const width = window.innerWidth * 0.40;
    const height = window.innerHeight * 0.6

    const [year, setYear] = useState(2020)
    const {data, error, isLoading} = useFetch("http://127.0.0.1:8085/v1/jhu/countries/timeseries?frequency=month&country_code="+country_code+"&year="+year)

    if (error) {
        return <span data-testid="error">{error}</span>
    }

    return (
        isLoading ? (
            <LoaderWrapper>
                <Loader data-testid="loader"/>
            </LoaderWrapper>
        ) : (
            <div class="card-plot">
                <select class="selector-year" onChange={(e) => setYear(e.target.value) }>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
                <div class="chart">
                    <BarChart
                        width={width}
                        height={height}
                        data={data.data}
                        margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="confirmed" stackId="a" fill="red" />
                        <Bar dataKey="death" stackId="a" fill="orange" />
                        <Bar dataKey="recovered" stackId="a" fill="#82ca9d" />
                    </BarChart>
                    <LineChart
                        width={width}
                        height={height}
                        data={data.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="confirmed" stroke="red" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="death" stroke="orange" />
                        <Line type="monotone" dataKey="recovered" stroke="#82ca9d" />
                    </LineChart>
                </div>
            </div>
          )
      );
};

export default CardCountryPlot;
