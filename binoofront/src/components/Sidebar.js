import React from 'react';
import { SidebarData } from './SidebarData';
import SubSidebar from './SubSidebar';
import { IconContext } from 'react-icons/lib';
import { isLoginMode } from '../connections/authConn';

//css
import './Sidebar.css';

const Sidebar = () => {
	const { user } = isLoginMode();

	return (
		<IconContext.Provider value={{ color: '#23b8c9' }}>
			<div className="sidebarContainer">
				<div className="wrapper">
					{SidebarData.map((item, index) => {
						return <SubSidebar item={item} key={index} />;
					})}
				</div>
			</div>
		</IconContext.Provider>
	);
};

export default Sidebar;
