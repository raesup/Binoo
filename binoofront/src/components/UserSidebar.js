import React from 'react';
import SubSidebar from './SubSidebar';
import { IconContext } from 'react-icons/lib';
import UserSidebarData from './UserSidebarData';

//css
import './Sidebar.css';

const UserSidebar = () => {
	return (
		<IconContext.Provider value={{ color: '#23b8c9' }}>
			<div className="sidebarContainer">
				<div className="wrapper">
					{UserSidebarData.map((item, index) => {
						return <SubSidebar item={item} key={index} />;
					})}
				</div>
			</div>
		</IconContext.Provider>
	);
};

export default UserSidebar;
