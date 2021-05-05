import React from 'react';

//icons
import { FaShoppingCart } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { IoReceiptSharp } from 'react-icons/io5';

const UserSidebarData = [
	{
		title: 'User Info',
		path: '/profile',
		icon: <RiAdminFill />,
	},
	{
		title: 'Shopping Cart',
		path: '/cart',
		icon: <FaShoppingCart />,
	},
	{
		title: 'Orders',
		path: '/profile/orders',
		icon: <IoReceiptSharp />,
	},
];

export default UserSidebarData;
