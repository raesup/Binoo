import React, { useState, useEffect } from 'react';
import { getOneProduct } from '../connections/coreConn';
import { addItem } from '../components/ManageCart';
import { Redirect, Switch } from 'react-router-dom';
import URL from '../config';
import Login from './Login';
import { isLoginMode } from '../connections/authConn';
//css
import './Detail.css';
//add
import SideShoppingCart from './SideShoppingCart';

import './CreateProduct.css';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import './ShoppingCart.css';

const useStyles = makeStyles(theme => ({
	list: {
		width: 450,
		[theme.breakpoints.down('xs')]: {
			width: 300,
		},
	},
	fullList: {
		width: 'auto',
	},
}));

const Detail = props => {
	console.log(props);
	const [product, setProduct] = useState({});
	const [error, setError] = useState(false);
	const [redirect, setRedirect] = useState(false);

	//ADD
	const classes = useStyles();
	const [state, setState] = useState({
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

		setState({ [anchor]: open });
	};

	const list = anchor => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role="presentation"
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<SideShoppingCart />
			</List>
		</div>
	);

	const addToCart = () => {
		addItem(product);
		if (isLoginMode()) {
			setRedirect(true);
			setState({ right: true });
		} else {
			props.history.push('/login');
		}
	};

	const displayOneItem = productId => {
		getOneProduct(productId).then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setProduct(data);
			}
		});
	};

	useEffect(() => {
		const productId = props.match.params.productId;
		displayOneItem(productId);
	}, [props]);

	return (
		<div className="out-container">
			<div className="inner-container">
				<div className="title">{error ? <h3>{error}</h3> : null}</div>				
				<div class="img-col ">
					<img
						src={`${URL}/product/photo/${product._id}`}
						alt={product.name}
						className="product-img"
					/>
				</div>
				<div class=" desc-col ">
					<div className="table-detail">
						<table>
							<tr>
								<td className="productName-container">
									<h4 className="productName">{product.name}</h4>
								</td>
							</tr>
							<tr>
								<td>
									<h5 className="desc">{product.description}</h5>
								</td>
							</tr>
							<tr className="price-container">
								<td>
									<h5 className="price">
										$ {parseFloat(product.price).toFixed(2)}
									</h5>
								</td>
							</tr>
						</table>
						{product.quantity < 6 && product.quantity !== 0 ? (
							<p className="low-stock">
								Low in stock.. only {product.quantity} left
							</p>
						) : (
							''
						)}
						<button className="btn btn-dark add-btn" onClick={addToCart}>
							Add to Cart
						</button>
					</div>
				</div>
				
				{redirect ? (
					<SwipeableDrawer
						anchor="right"
						open={state['right']}
						onClose={toggleDrawer('right', false)}
						onOpen={toggleDrawer('right', true)}
					>
						<Button
							className="btn-close"
							onClick={toggleDrawer('right', false)}
						>
							Close
						</Button>
						{list('right')}
					</SwipeableDrawer>
				) : null}
			</div>
		</div>
	);
};

export default Detail;
