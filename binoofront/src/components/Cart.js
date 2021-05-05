import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import URL from '../config';
import { removeItem, updateItemNumber } from '../components/ManageCart';
//icon & Css
import { MdDeleteForever } from 'react-icons/md';
import './Cart.css';

const Cart = ({
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
			<tr scope="row">
				<td className="prod">
					<img
						src={`${URL}/product/photo/${item._id}`}
						alt={item.name}
						className="prod-img"
					/>
				</td>
				<td className="td-align">{item.name}</td>
				<td className="td-align">
					${parseFloat(item.price).toFixed(2)}/p.u
				</td>
				<td className="td-align">
					<input
						className="number-input"
						type="number"
						min="1"
						value={count}
						placeholder="1"
						onChange={handleChange(item._id)}
					/>
				</td>
				<td className="td-align">
					${parseFloat(count * item.price).toFixed(2)}
				</td>
				<td className="del td-align">
					<Link
						className="delete-icon"
						onClick={() => {
							removeItem(item._id);
							setReRenderParent(!reRenderParent);
						}}
					>
						<MdDeleteForever />
					</Link>
				</td>
			</tr>
		</React.Fragment>
	);
};

export default Cart;
