import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from "@fortawesome/free-solid-svg-icons";


function Footer() {
	const currentYear = new Date().getFullYear();

    return (
		<footer className='lmj-footer'>
			<div className='lmj-footer-elem'>
				Last updated data: 03-09-2023 | 
				Copyright©{currentYear} created by 
				<a href="https://www.linkedin.com/in/mahdi-gueffaz-43814838/">
					<FontAwesomeIcon  icon={faHouse} />
				</a>
			</div>
		</footer>
	)
}

export default Footer