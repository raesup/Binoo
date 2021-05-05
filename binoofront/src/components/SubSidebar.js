import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//css
import './SubSidebar.css';

const SubSidebar = ({ item }) => {
	const [subnav, setSubnav] = useState(false);
	const showSubnav = () => setSubnav(!subnav);

	return (
		<div>
			<Link
				className="link"
				to={item.path}
				onClick={item.subNav && showSubnav}
			>
				<div>
					{item.icon}
					<span>{item.title}</span>
				</div>
				<div>
					{item.subNav && subnav
						? item.iconOpened
						: item.subNav
						? item.iconClosed
						: null}
				</div>
			</Link>
			{subnav &&
				item.subNav.map((subItem, index) => {
					return (
						<Link
							className="subLink"
							to={{ pathname: subItem.path, state: true }}
							key={index}
						>
							{subItem.icon}
							<span>{subItem.title}</span>
						</Link>
					);
				})}
		</div>
	);
};

export default SubSidebar;
