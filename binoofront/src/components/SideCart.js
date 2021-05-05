import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import URL from '../config';
import { removeItem, updateItemNumber } from './ManageCart';
//icon & Css
import { MdDeleteForever } from 'react-icons/md';
import './Cart.css';

const SideCart = ({
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
				<td>
					<img
						src={`${URL}/product/photo/${item._id}`}
						alt={item.name}
						className="side-cart-img"
						style={{ height: '100px', width: '90px' }}
					/>
				</td>
				<td>
					<tr scope="row"></tr>
					<tr>
						<span className="side-cart-title">{item.name}</span>
					</tr>
					<tr>${parseFloat(item.price).toFixed(2)}</tr>
					<tr>
						<input
							className="number-input side-cart-data"
							type="number"
							min="1"
							value={count}
							placeholder="1"
							onChange={handleChange(item._id)}
						/>
					</tr>
				</td>
				<td>
					<Link
						className="delete-icon-sidecart"
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

export default SideCart;
