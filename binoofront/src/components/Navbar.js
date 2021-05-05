import React, { useState, useEffect } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import logo from '../images/logo_Black.PNG';
import { IoPerson, IoMenu } from 'react-icons/io5';
import './Navbar.css';
import { isLoginMode, logout } from '../connections/authConn';
import { cartLength, getAllCartItems } from '../components/ManageCart';
import { Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const Navbar = ({ toggle }) => {
	const classes = useStyles();
	const [successOpen, setSuccessOpen] = useState(false);

	const showSuccess = () => (
		<div className={classes.root}>
			<Snackbar
				open={successOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success">
					Logged out! Hope to see you soon!
				</Alert>
			</Snackbar>
		</div>
	);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSuccessOpen(false);
	};

	const showLoginCheck = () => {
		if (isLoginMode()) {
			const {
				user: { role, _id },
			} = isLoginMode();

			const cartBadgeCount = cartLength();

			if (role === 1) {
				return (
					<div className="loginedTabs">
						<NavLink
							exact
							activeStyle={{ color: 'rgb(36, 29, 29)' }}
							to="/cart"
						>
							<Badge badgeContent={cartBadgeCount} color="secondary">
								<ShoppingCartIcon />
							</Badge>
						</NavLink>

						<NavLink
							exact
							activeStyle={{ color: 'rgb(36, 29, 29)' }}
							to="/admin/profile"
						>
							<IoPerson />
						</NavLink>

						<NavLink
							className="loginoutBt"
							onClick={() => logout()}
							to="/"
						>
							Logout
						</NavLink>
					</div>
				);
			} else {
				return (
					<div className="loginedTabs">
						<NavLink
							exact
							activeStyle={{ color: 'rgb(36, 29, 29)' }}
							to="/cart"
						>
							<Badge badgeContent={cartBadgeCount} color="secondary">
								<ShoppingCartIcon />
							</Badge>
						</NavLink>

						<NavLink
							exact
							activeStyle={{ color: 'rgb(36, 29, 29)' }}
							to={`/profile/${_id}`}
						>
							<IoPerson />
						</NavLink>

						<NavLink
							onClick={() => logout().then(setSuccessOpen(true))}
							to="/"
						>
							Logout
						</NavLink>
					</div>
				);
			}
		} else {
			return (
				<NavLink
					className="loginBt"
					exact
					activeStyle={{ color: 'rgb(36, 29, 29)' }}
					to="/login"
				>
					Login
				</NavLink>
			);
		}
	};

	return (
		<div className="nav-main">
			{showSuccess()}
			<div className="nav-menu">
				<div className="mobileMenu" onClick={toggle}>
					<IoMenu />
				</div>

				<NavLink
					className="shopBt"
					exact
					activeStyle={{ color: 'rgb(36, 29, 29)' }}
					to="/shop"
				>
					Shop
				</NavLink>
				<NavLink
					className="aboutBt"
					exact
					activeStyle={{ color: 'rgb(36, 29, 29)' }}
					to="/about"
				>
					About
				</NavLink>

				<div className="nav-logo">
					<NavLink
						exact
						activeStyle={{ color: 'rgb(36, 29, 29)', position: 'center' }}
						to="/"
					>
						<img src={logo} alt="" width="120" height="100" />
					</NavLink>
				</div>

				{showLoginCheck()}
			</div>
		</div>
	);
};

export default withRouter(Navbar);
