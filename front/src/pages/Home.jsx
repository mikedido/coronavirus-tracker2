import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import DataList from '../components/DataList/DataList'
import CardMap from '../components/CardMap/index'
import CardDonut from '../components/CardDonut/index'

import './Home.css'

function Home() {
    return (
        <div class="container">    
            <Header />
            <div class="wrapper">
                <div class="nav">
                    {/* <CardDonut /> */}
                    <DataList />
                </div>
                <div class="scrollable">
                    <CardMap />
                </div>    
            </div>    
            <Footer />
        </div> 
	)
}

export default Home