import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { isLoginMode } from '../connections/authConn';
import { allProducts, deleteOneProduct } from '../connections/adminConn';

//css
import './ProductList.css';

//icons
import { MdDeleteForever } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';

const ProductList = () => {
	const { user, token } = isLoginMode();
	const [products, setProducts] = useState([]);
	const [successMessage, setSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [loadFail, setLoadFail] = useState(false);

	const displayProducts = () => {
		allProducts(user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
				setLoadFail(true);
			} else {
				setProducts(data);
			}
		});
	};

	const deleteProduct = productId => {
		deleteOneProduct(productId, user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
				setErrorMessage(true);
			} else {
				displayProducts();
				console.log('data', data);
				setSuccessMessage(true);
			}
		});
	};

	const categoryName = categoryNum => {
		switch (categoryNum) {
			case 1:
				return 'Soap';
			case 2:
				return 'Bath';
			case 3:
				return 'Scrub';
			case 4:
				return 'Laundry Bar';
			case 5:
				return 'Candle';
			default:
				return 'n/a';
		}
	};

	useEffect(() => {
		if (isLoginMode()) {
			displayProducts();
		}
	}, []);

	return (
		<div className="b-container-prod-list">
			<div class="row">
				<div className="side-container">
					<Sidebar />
				</div>
				<div className="edit-container prod-list-container">
					<h3 className="prod-list-title">Edit Products</h3>
					<div class="t-container">
						{successMessage ? (
							<h6 className=" alert alert-info ">
								Product is deleted successfully!
							</h6>
						) : null}
						{errorMessage ? (
							<h6 className="text-danger alert alert-danger space">
								Fail to delete the product.
								<br />
							</h6>
						) : null}
						{loadFail ? (
							<h6 className="text-danger alert alert-danger space">
								Fail to load Products. Try it again
								<br />
							</h6>
						) : null}
						<table class="table table-dark table-hover custom-table">
							<thead>
								<tr>
									<th>#</th>
									<th scope="col">Product</th>
									<th scope="col">Category</th>
									<th scope="col">Quantity</th>
									<th scope="col">Edit</th>
									<th scope="col">Delete</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => (
									<tr>
										<th scope="row" key={index} className="td-align">
											{index + 1}
										</th>
										<td className="td-align">{product.name}</td>
										<td className="td-align">
											{categoryName(product.category)}
										</td>
										<td className="td-align">{product.quantity}</td>
										<td className="td-align">
											<Link
												className="edit"
												to={`/admin/product/update/${product._id}`}
											>
												<BiEditAlt />
											</Link>
										</td>
										<td className="del">
											<Link
												className="del"
												onClick={() => {
													deleteProduct(product._id);
												}}
											>
												<MdDeleteForever />
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className="for-footer-plist"></div>
		</div>
	);
};

export default ProductList;
