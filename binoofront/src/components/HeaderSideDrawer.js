import React, { useState } from 'react';
import { Menu } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Drawer,
} from '@material-ui/core';
import { Link, NavLink, withRouter } from 'react-router-dom';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	linkText: {
		textDecoration: `none`,
		textTransform: `uppercase`,
		color: `black`,
	},
});

const HeaderSideDrawer = ({ navLinks }) => {
	const [state, setState] = useState({ right: false });

	const classes = useStyles();

	const toggleDrawer = (anchor, open) => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setState({ [anchor]: open });
	};

	const sideDrawerList = anchor => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List component="nav">
				{navLinks.map(({ title, path }) => (
					<Link to={path}>
						<ListItem button>
							<ListItemText primary={title} />
						</ListItem>
					</Link>
				))}
			</List>
		</div>
	);

	return (
		<React.Fragment>
			<IconButton
				edge="start"
				aria-label="menu"
				onClick={toggleDrawer('right', true)}
			>
				<Menu fontSize="large" style={{ color: `white` }} />
			</IconButton>
			<Drawer
				anchor="right"
				open={state.right}
				onOpen={toggleDrawer('right', true)}
				onClose={toggleDrawer('right', false)}
			>
				{sideDrawerList('right')}
			</Drawer>
		</React.Fragment>
	);
};

export default HeaderSideDrawer;
