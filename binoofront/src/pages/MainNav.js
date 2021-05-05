import React, { useState } from 'react';
import MobileNavBt from '../components/MobileNavBt';
import Navbar from '../components/Navbar';

const MainNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<MobileNavBt isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} />
		</>
	);
};

export default MainNav;
