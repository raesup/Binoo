import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../connections/stripeConn';
import { Link, Redirect } from 'react-router-dom';
import { createOrder } from '../connections/orderConn';
import { isLoginMode } from '../connections/authConn';
import { getAllCartItems } from '../components/ManageCart';

const StripeCheckout = props => {
	const { user, token } = isLoginMode();

	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState('');

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		createPaymentIntent({
			amount: props.amount,
			receipt_email: user.email,
		}).then(res => {
			setClientSecret(res.clientSecret);
		});
	}, [props.amount, props.address]);

	const handleSubmit = async e => {
		e.preventDefault();

		setProcessing(true);

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: e.target.name.value,
				},
			},
			receipt_email: user.email,
		});

		if (payload.error) {
			setError(`Payment failed: ${payload.error.message}`);
			setProcessing(false);
		} else {
			// get result for successfull payment
			// create order and save in database

			const cartItems = getAllCartItems();
			const newOrderData = {
				products: cartItems,
				amount: props.amount,
				address: props.address,
			};

			createOrder(user._id, token, newOrderData);
			// empty user cart from local storage
			setError(null);
			setProcessing(false);
			setSucceeded(true);
		}
	};

	const handleChange = async e => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : '');
	};

	const cartStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	};

	const shouldRedirect = () => {
		return <Redirect to="/payment/success" />;
	};

	const emptyCart = next => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('shoppingCart');
		}
	};

	return (
		<>
			<p className={succeeded ? 'result-message' : 'result-message hidden'}>
				Payment Successful. <Link to="/user/history">View your orders</Link>
				{/* {address} */}
			</p>
			<form
				id="payment-form"
				className="stripe-form"
				onSubmit={handleSubmit}
			>
				<CardElement
					id="card-element"
					options={cartStyle}
					onChange={handleChange}
				/>
				<button
					className="stripe-button"
					disabled={processing || disabled || succeeded}
				>
					<span id="button-text">
						{processing ? (
							<div className="spinner" id="spinner"></div>
						) : (
							'Pay'
						)}
					</span>
				</button>
				<br />
				{error && (
					<div className="card-error" role="alert">
						{error}
					</div>
				)}
			</form>
			<div>
				{succeeded ? emptyCart() : ''}
				{succeeded ? shouldRedirect() : ''}
			</div>
		</>
	);
};

export default StripeCheckout;
