import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import URL from '../config';
import { removeItem, updateItemNumber } from '../components/ManageCart';
//icon & Css
import { MdDeleteForever } from 'react-icons/md';
import './Cart.css';

const CartPayment = ({
	item,
	setReRenderParent = func => func,
	reRenderParent = undefined,
}) => {
	const [count, setCount] = useState(item.count);

	const handleChange = productId => event => {
		setReRenderParent(!reRenderParent);
		const updatedNumber = event.target.value;
		setCount(updatedNumber);
		updateItemNumber(productId, updatedNumber);
	};

	return (
		<React.Fragment>
			<tr scope="row item-summary-data">
				<td className="td-align">
					<img
						src={`${URL}/product/photo/${item._id}`}
						alt={item.name}
						className="payment-prod-img"
					/>
				</td>
				<td className="td-align">{item.name}</td>
				<td className="td-align">
					${parseFloat(item.price).toFixed(2)}/p.u
				</td>
				<td className="td-align">{count}</td>
				<td className="td-align">
					${parseFloat(count * item.price).toFixed(2)}
				</td>
			</tr>
		</React.Fragment>
	);
};

export default CartPayment;
