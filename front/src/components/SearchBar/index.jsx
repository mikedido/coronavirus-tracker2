import { useFetch } from "../../hooks/useFetch";
import Loader from "../../utils/Loader";
import Styled from 'styled-components';
import './index.css'
import { useState } from "react";
import { Link } from 'react-router-dom'

const LoaderWrapper = Styled.div`
  display: flex;
  justify-content: center;
`

const SearchBar = () => {
    const [query, setQuery] = useState("")
    const [value, setValue] = useState()
    const {data, isLoading, error } = useFetch('http://127.0.0.1:8085/v1/jhu/countries/daily')

    const handleClearList = () => {
        data = ''
    }

    if (error) {
        return <span data-testid="error">{error}</span>
    }

    return (
        isLoading ? (
            <LoaderWrapper>
                <Loader data-testid="loader"/>
            </LoaderWrapper>
        ) : (
            <div className="search">
                <input placeholder="Search country" onChange={event => setQuery(event.target.value)} />
                {
                    (
                        data.filter((post) => {
                            if (query === '') {
                                return '';
                            } else if (post.country_region.toLowerCase().includes(query.toLowerCase())) {
                                return post;
                            }
                          })
                    ).map((item) => {
                        return (
                            <Link  style={{ textDecoration: 'none' }} to = {`/country/${item.country_code}`}>
                                <div className="box" key={`${item.country_region}-${item.country_code}`} onClick={event => setQuery("")}>
                                    <div class="card_flag">
                                        <img src={'https://flagsapi.com/'+item.country_code+'/flat/32.png'} alt="" /> 
                                    </div>
                                    <div class="card_country_name">
                                        {item.country_region}
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    )
}

export default SearchBar;