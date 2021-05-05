import React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import { makeStyles, Container, Hidden } from '@material-ui/core';
import { Home, Menu } from '@material-ui/icons';

import { Link, NavLink, withRouter } from 'react-router-dom';
import HeaderSideDrawer from './HeaderSideDrawer';

const useStyles = makeStyles({
	navbarDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`,
	},
	navDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`,
	},
	linkText: {
		textDecoration: `none`,
		textTransform: `uppercase`,
		color: `white`,
	},
});

const navLinks = [
	{ title: `shop`, path: `/shop` },
	{ title: `about us`, path: `/about` },
	{ title: `user`, path: `/profile` },
	{ title: `cart`, path: `/cart` },
	{ title: `login`, path: `/login` },
];

const Header = () => {
	const classes = useStyles();

	return (
		<AppBar position="static" style={{ backgroundColor: 'pink' }}>
			<Toolbar>
				<Container maxWidth="md" className={classes.navbarDisplayFlex}>
					<IconButton edge="start" color="white" aria-label="home">
						<NavLink to="/">
							<Home fontSize="large" />
						</NavLink>
					</IconButton>
					<Hidden smDown>
						<List
							component="nav"
							aria-labelledby="main navigation"
							className={classes.navDisplayFlex} // this
						>
							{navLinks.map(({ title, path }) => (
								<NavLink
									to={path}
									style={{ color: 'white' }}
									activeStyle={{
										fontWeight: 'bold',
										color: 'black',
									}}
								>
									<ListItem button>
										<ListItemText primary={title} />
									</ListItem>
								</NavLink>
							))}
						</List>
					</Hidden>
					<Hidden mdUp>
						<HeaderSideDrawer navLinks={navLinks} />
					</Hidden>
				</Container>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
