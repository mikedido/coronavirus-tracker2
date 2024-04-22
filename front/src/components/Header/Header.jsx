import SearchBar from '../SearchBar/index'
import './Header.css'


function Header() {
    return (
        <div className='lmj-banner'>
            <SearchBar />
            <p className='lmj-title'>COVID 19 TRACKER</p>
        </div> 
    )
}

export default Header