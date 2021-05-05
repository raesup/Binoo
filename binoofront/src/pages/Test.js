import React from 'react';
import SideShoppingCart from './SideShoppingCart';

import './CreateProduct.css';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import './ShoppingCart.css';

const useStyles = makeStyles({
	list: {
		width: 450,
	},
	fullList: {
		width: 'auto',
	},
});

const Test = () => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		// top: false,
		// left: false,
		// bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => event => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = anchor => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role="presentation"
			// onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<SideShoppingCart />
				{/* <SideShoppingCart onClick={toggleDrawer(anchor, false)} /> */}
			</List>
		</div>
	);

	return (
		<div className="test">
			{['left', 'right', 'top', 'bottom'].map(anchor => (
				<React.Fragment key={anchor}>
					<Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
					>
						<Button
							className="btn-close"
							onClick={toggleDrawer(anchor, false)}
						>
							Close
						</Button>
						{list(anchor)}
					</SwipeableDrawer>
				</React.Fragment>
			))}
			<div>
				<div className="for-footer"></div>
			</div>
		</div>
	);
};

export default Test;
