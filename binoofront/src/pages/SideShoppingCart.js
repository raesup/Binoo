import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCartItems } from '../components/ManageCart';
import SideCart from '../components/SideCart';

//css
import './ShoppingCart.css';

const SideShoppingCart = () => {
	const [products, setProducts] = useState([]);
	const [reRenderParent, setReRenderParent] = useState(false);

	const getTotal = () => {
		return products.reduce((current, next) => {
			let calcTotal = current + next.count * next.price;
			return calcTotal;
		}, 0);
	};

	useEffect(() => {
		setProducts(getAllCartItems());
	}, [reRenderParent]);

	return (
		<div className="sidecart-body-container">
			{products.length <= 0 ? (
				<div class="container no-item">
					<h3 className="side-title">Shopping Cart</h3>
					<h4 className="no-item-margin">
						There are no items in your Shopping Cart. <br />
						<Link to="/shop">Continue Shopping</Link>
					</h4>
				</div>
			) : (
				<div class="row">
					<div class="sidecart-container">
						<h3 className="title sidecart-title">Shopping Cart</h3>
						<div class="table-wrapper-scroll-y my-custom-scrollbar">
							<table class="table side-cart-table">
								<tbody>
									{products.map((item, index) => (
										<SideCart
											key={index}
											item={item}
											cartUpdate={true}
											setReRenderParent={setReRenderParent}
											reRenderParent={reRenderParent}
										/>
									))}
								</tbody>
							</table>
						</div>
						<div className="buttom-align-side">
							<h5 className="total">
								Subtotal: ${parseFloat(getTotal()).toFixed(2)}
							</h5>
							<p className="total">
								Tax included and shipping calculated at checkout
							</p>
							<Link to="/payment">
								<button className="btn btn-dark btn-align">
									Check Out
								</button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SideShoppingCart;
