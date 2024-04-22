
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './index.css';

const CardLabel = styled.div`
    display: flex;
    float: left;
    flex-direction: column;
    background-color: white;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    width: 150px;
`;

const CardImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 15px;
    background-color: #e2e3e9;
    border-radius: 5px;
    transition: 200ms;
    margin: 10px 20px 20px 30px;
`;

const CardTitle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px 0 0 25px;
`

const CountryName = styled.div`
    text-align: left;
    font-weight: bold;
    size: 16px;
    text-transform: uppercase;
`

function CardCountry({country_code, countryName, deaths, confirmed, active, recovered, incident_rate, fatality_ratio}) {
    return (
        <div>
             <CardTitle>
                <div class="card_wrapper">
                    <div class="card_flag">
                        <img src={'https://flagsapi.com/'+country_code+'/flat/64.png'} alt=""/> 
                    </div>
                    <div class="card_country_name">
                        <CountryName>{countryName}</CountryName>
                    </div>
                 </div>
            </CardTitle>
            <CardWrapper>
                <CardLabel>
                    <p>Total confirmed</p> 
                    <p>{confirmed}</p>
                </CardLabel>
                <CardLabel>
                    <p>Total deaths</p> 
                    <p>{deaths}</p>
                </CardLabel>
                <CardLabel>
                    <p>Total active</p>
                    <p>{active}</p>
                </CardLabel>
                <CardLabel>
                    <p>Total recovered</p>
                    <p>{recovered}</p>
                </CardLabel>
                <CardLabel>
                    <p>Fatality ratio</p>
                    <p>{fatality_ratio}</p>
                </CardLabel>
                <CardLabel>
                    <p>Incident rate</p>
                    <p>{incident_rate}</p>
                </CardLabel>
            </CardWrapper>
        </div>
       
    )
}

CardCountry.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string
}

//les props par defauts
CardCountry.defaultProps = {
    title: 'Titre par defaut'
}

export default CardCountry