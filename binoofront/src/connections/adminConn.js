import URL from '../config';

//Products CRUD

//Create Product
const addProduct = (userId, token, product) => {
	for (var value of product.values()) {
		console.log(value);
	}

	return fetch(`${URL}/product/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

// Read Products (for admin, no images)
const allProducts = (userId, token) => {
	return fetch(`${URL}/products/admin/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

//Delete
const deleteOneProduct = (productId, userId, token) => {
	return fetch(`${URL}/product/${productId}/${userId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

//Update Product
const editProduct = (productId, userId, token, product) => {
	return fetch(`${URL}/product/${productId}/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export { addProduct, allProducts, deleteOneProduct, editProduct };
