import React from 'react';
import { Link } from 'react-router-dom';
import { isLoginMode } from '../connections/authConn';
import './Shop.css';
import UserOrder from './UserOrder';

const AfterPayment = () => {
	const { user } = isLoginMode();

	return (
		<div>
			<h2 className="htext">
				Thank
				<br /> You!
			</h2>

			<div className="thanksMessage">
				<div className="continue">
					<Link to={`/shop`}>
						<button>Continue Shopping</button>
					</Link>
				</div>

				<div className="order">
					{user.role === 1 ? (
						<Link to={`/admin/orders`}>
							<button>Check Order</button>
						</Link>
					) : (
						<Link to={`/profile/orders`}>
							<button>Check Order</button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default AfterPayment;
