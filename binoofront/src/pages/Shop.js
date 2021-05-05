import React, { useState, useEffect } from 'react';
import { allProducts, getOneProduct } from '../connections/coreConn';
import './Shop.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import URL from '../config';
import { Link, Redirect } from 'react-router-dom';
import outOfStock from '../images/outofstock.PNG';
import * as IoIcon from 'react-icons/io5';

//seol-add
import SideShoppingCart from './SideShoppingCart';
import './Detail.css';
import './CreateProduct.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { addItem } from '../components/ManageCart';
import { isLoginMode } from '../connections/authConn';

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

const Shop = ({ match, history }) => {
	console.log(history);
	const categoryId = match.params.categoryId ? match.params.categoryId : '';
	const [items, setItems] = useState([]);
	const [category, setCategory] = useState('');

	//Seol - add
	const classes = useStyles();
	const [state, setState] = useState({
		right: false,
	});
	const [redirect, setRedirect] = useState(false);

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

	const addToCart = product => {
		addItem(product);
		if (isLoginMode()) {
			setRedirect(true);
			setState({ right: true });
		} else {
			history.push('/login');
		}
	};

	const [error, setError] = useState(false);

	const handleChange = event => {
		setCategory(event.target.value);
		loadProduct(event.target.value);
	};

	const loadProduct = category => {
		setCategory(category);
		allProducts(category).then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setItems(data);
			}
		});
	};

	useEffect(() => {
		loadProduct(categoryId);
	}, [match]);

	return (
		<div className="page">
			<div className="categoryTabAll">
				<h2 className="htext">SHOP</h2>
				<div className="categoryTab">
					<ul>
						<li>
							<input
								onChange={handleChange}
								value=""
								type="radio"
								name="categoryTab"
								id="categoryTab1"
								checked={category === ''}
							/>
							<label for="categoryTab1">All</label>
						</li>
						<li>
							<input
								onChange={handleChange}
								value="1"
								type="radio"
								name="categoryTab"
								id="categoryTab2"
								checked={category === '1'}
							/>
							<label for="categoryTab2">Natural Soap</label>
						</li>
						<li>
							<input
								onChange={handleChange}
								value="2"
								type="radio"
								name="categoryTab"
								id="categoryTab3"
								checked={category === '2'}
							/>
							<label for="categoryTab3">Bath Tea</label>
						</li>
						<li>
							<input
								onChange={handleChange}
								value="3"
								type="radio"
								name="categoryTab"
								id="categoryTab4"
								checked={category === '3'}
							/>
							<label for="categoryTab4">Scrub</label>
						</li>
						<li>
							<input
								onChange={handleChange}
								value="4"
								type="radio"
								name="categoryTab"
								id="categoryTab5"
								checked={category === '4'}
							/>
							<label for="categoryTab5">Bar</label>
						</li>
						<li>
							<input
								onChange={handleChange}
								value="5"
								type="radio"
								name="categoryTab"
								id="categoryTab6"
								checked={category === '5'}
							/>
							<label for="categoryTab6">Candle</label>
						</li>
					</ul>
				</div>
			</div>
			<div className="productLayout">
				<p>
					<br />
				</p>
				<div className="productWrap">
					<div className="product">
						{items.map((product, i) => (
							<div
								className="card1"
								kdy={product._id}
								style={{ width: 20 + 'rem' }}
							>
								{product.quantity === 0 ? (
									<img src={outOfStock} alt="" />
								) : (
									<Link to={`/product/${product._id}`}>
										<img
											src={`${URL}/product/photo/${product._id}`}
											alt=""
										/>
									</Link>
								)}
								<div className="content">
									{product.quantity === 0 ? (
										<p style={{ fontSize: '20px' }}>
											<b>Sold out</b>
										</p>
									) : (
										<p style={{ fontSize: '20px' }}>
											<b>{product.name}</b>
										</p>
									)}
									{product.quantity === 0 ? (
										<h6>-</h6>
									) : (
										<h6>${parseFloat(product.price).toFixed(2)}</h6>
									)}
									{product.quantity === 0 ? (
										<button
											disabled={true}
											style={{ background: '#aaaaaa' }}
										>
											Sold Out
										</button>
									) : (
										<button
											onClick={() => {
												addToCart(product);
											}}
										>
											Add To Cart
										</button>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
				<p>
					<br />
				</p>
			</div>
			{redirect ? (
				<SwipeableDrawer
					className={classes.sideCartBP}
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
	);
};

export default Shop;
