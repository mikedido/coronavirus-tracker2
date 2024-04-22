
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './index.css' 


// const CardLabel = styled.span`
//     color: #5843e4;
//     font-size: 14px;
//     font-weight: bold;
// `;

// const CardImage = styled.img`
//     height: 80px;
//     width: 80px;
//     border-radius: 50%;
// `;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: #e2e3e9;
    border-radius: 5px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`;

const CardTitle = styled.div`
`

function Card({country_code, countryName, deaths, confirmed, active, recovered}) {
    return (
        <div>
             <CardTitle>
                <div class="card_wrapper">
                    <div class="card_flag">
                        <img src={'https://flagsapi.com/'+country_code+'/flat/32.png'} alt="" /> 
                    </div>
                    <div class="card_country_name">
                        {countryName}
                    </div>
                 </div>
            </CardTitle>
            <CardWrapper>
                <table>
                    <tbody>
                        <tr>
                        <th scope="row">Total cases</th>
                        <td class='confirmed'>{confirmed.toLocaleString()}</td>
                        </tr>
                        <tr>
                        <th scope="row">Deaths</th>
                        <td class='death'>{deaths.toLocaleString()}</td>
                        </tr>
                        <tr>
                        <th scope="row">Active</th>
                        <td class='active'>{active.toLocaleString()}</td>
                        </tr>
                        <tr>
                        <th scope="row">Recovered</th>
                        <td class='recovered'>{recovered.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </CardWrapper>
        </div>
    )
}

Card.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string
}

//les props par defauts
Card.defaultProps = {
    title: 'Titre par defaut'
}

export default Card