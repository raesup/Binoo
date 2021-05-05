import React, { useState, useEffect } from 'react';
import { getAllCartItems } from '../components/ManageCart';
import CartPayment from '../components/CartPayment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import './Payment.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
	const [products, setProducts] = useState([]);

	const [address, setAddress] = useState('');

	const [amount, setAmount] = useState('');

	const getTotal = () => {
		return products.reduce((current, next) => {
			let calcTotal = current + next.count * next.price;
			return calcTotal;
		}, 0);
	};

	const handleChange = name => e => {
		setAddress(e.target.value);
	};

	useEffect(() => {
		setProducts(getAllCartItems());
		setAmount(getTotal());
	}, [amount]);

	return (
		<div className="checkContainer">
			<h2 className="htext payment-title">CHECKOUT</h2>
			<div class="row">
				<div class="leftContainer">
					<div className="container_Addr">
						<h4>
							<label className="text-muted">Shipping Address</label>
						</h4>
						<form>
							<div className="form-group">
								<textarea
									className="form-control address-input"
									placeholder="Enter your address for delivery."
									onChange={handleChange('address')}
									value={address}
								/>
							</div>
						</form>
					</div>
					<div className="container_Table">
						<h4>
							<label className="text-muted">Item Summary</label>
						</h4>
						<table class="table table-hover pmt-table">
							<thead>
								<tr>
									<th scope="col">Item </th>
									<th scope="col"></th>
									<th scope="col">Price</th>
									<th scope="col">Quantity</th>
									<th scope="col">Total</th>
								</tr>
							</thead>
							<tbody>
								{products.map((item, index) => (
									<CartPayment key={index} item={item} />
								))}
							</tbody>
						</table>
						<div>
							<table className="subtotal">
								<tr>
									<td>
										Subtotal
										<span>${parseFloat(getTotal()).toFixed(2)}</span>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="rightContainer">
					<div class="container_Stripe">
						<h4>
							<label className="text-muted sub-payment-title">
								Payment Information
							</label>
						</h4>
						<Elements stripe={promise}>
							<div>
								<StripeCheckout address={address} amount={getTotal()} />
							</div>
						</Elements>
						<div>{/* <StripeCheckout succeeded /> */}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
