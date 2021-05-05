import React from 'react';
import {
	SidebarContainer,
	Icon,
	CloseIcon,
	SidebarWrapper,
	SidebarMenu,
	SidebarLink,
	SideBtnWrap,
	SidebarRoute,
	LoginSidebarMenu,
} from './MobileNavBtStyle';
import { isLoginMode, logout } from '../connections/authConn';

const MobileNavBt = ({ isOpen, toggle }) => {
	const showLoginCheck = () => {
		if (isLoginMode()) {
			const {
				user: { role, _id },
			} = isLoginMode();

			if (role === 1) {
				return (
					<SidebarWrapper>
						<LoginSidebarMenu>
							<SidebarLink to="/cart">Cart</SidebarLink>

							<SidebarLink to="/admin/profile">Profile</SidebarLink>

							<SideBtnWrap>
								<SidebarRoute onClick={() => logout()} to="/">
									Logout
								</SidebarRoute>
							</SideBtnWrap>
						</LoginSidebarMenu>
					</SidebarWrapper>
				);
			} else {
				return (
					<SidebarWrapper>
						<LoginSidebarMenu>
							<SidebarLink to="/cart">Cart</SidebarLink>

							<SidebarLink to={`/profile/${_id}`}>Profile</SidebarLink>

							<SideBtnWrap>
								<SidebarRoute onClick={() => logout()} to="/">
									Logout
								</SidebarRoute>
							</SideBtnWrap>
						</LoginSidebarMenu>
					</SidebarWrapper>
				);
			}
		} else {
			return (
				<SideBtnWrap>
					<SidebarRoute className="loginBT" to="/Login">
						Login
					</SidebarRoute>
				</SideBtnWrap>
			);
		}
	};

	return (
		<SidebarContainer isOpen={isOpen} onClick={toggle}>
			<Icon onClick={toggle}>
				<CloseIcon />
			</Icon>

			<SidebarWrapper>
				<SidebarMenu>
					<SidebarLink to="/shop">Shop</SidebarLink>

					<SidebarLink to="/about">About</SidebarLink>
					{showLoginCheck()}
				</SidebarMenu>
			</SidebarWrapper>
		</SidebarContainer>
	);
};

export default MobileNavBt;
