import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCartItems } from '../components/ManageCart';
import Cart from '../components/Cart';

//css
import './ShoppingCart.css';

const ShoppingCart = () => {
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
		<div className="outer-container">
			{products.length <= 0 ? (
				<div class="container no-item">
					<h3 className="shop-cart-title">SHOPPING CART</h3>
					<h4 className="no-item-margin">
						There are no items in your Shopping Cart. <br />
						<Link to="/shop">Continue Shopping</Link>
					</h4>
				</div>
			) : (
				<div class="row">
					<div class="cart-container">
						<h3 className="shop-cart-title">SHOPPING CART</h3>
						<div className="table-align1">
							<table class="table table-hover table-align ">
								<thead>
									<tr>
										<th scope="col" className="item">
											Item
										</th>
										<th scope="col"></th>
										<th scope="col">Price</th>
										<th scope="col">Quantity</th>
										<th scope="col">Total</th>
										<th scope="col">Remove</th>
									</tr>
								</thead>
								<tbody>
									{products.map((item, index) => (
										<Cart
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
						<div className="buttom-align">
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

export default ShoppingCart;
