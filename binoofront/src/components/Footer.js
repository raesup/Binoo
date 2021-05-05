import React from 'react';
import './Footer.css';
import logo from '../images/logo_Original.PNG';
import insta from '../images/instagram.png';
import { Link } from 'react-router-dom';
function Footer() {
	return (
		<nav className="footbar">
			<ul className="menu">
				<li>
					<Link to="/">HOME</Link>
				</li>
				<li>
					<Link to="/about">ABOUT</Link>
				</li>
				<li>
					<Link to="about">CONTACT</Link>
				</li>
				{/* <li>
					<Link to="/refund">REFUND POLICY</Link>
				</li> */}
				<li>
					<div className="icons">
						<a href="https://www.instagram.com/binooandbuffalo/">
							<img className="insta" src={insta} />
						</a>
					</div>
				</li>
			</ul>
		</nav>
	);
}

export default Footer;
