import { useParams, Navigate } from 'react-router-dom'
import CardCountryInformation from '../components/CardCountryInformation'
import CardCountryPlot from '../components/CardCountryPlot'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'



import "./Country.css"
import { useFetch } from '../hooks/useFetch'


const Country = () => {
    const { country_code } = useParams()
    const { isLoading, data, error }  = useFetch("http://127.0.0.1:8085/v1/jhu/countries/daily?country_code="+country_code)

    if (error) {
        return <Navigate to="/" />;
    }

    return(
        <div>
            <Header />
            <CardCountryInformation country_code={country_code} />
            <CardCountryPlot country_code={country_code} />
            <Footer />
        </div>
    )
}

export default Country;