import URL from '../config';

// Get one product by product id
const getOneProduct = productId => {
	return fetch(`${URL}/product/${productId}`, {
		method: 'GET',
	})
		.then(response => {
			return response.json();
		})
		.catch(error => console.log(error));
};

// Get All Products
const allProducts = category => {
	return fetch(`${URL}/products?category=${category}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(error => console.log(error));
};

export { getOneProduct, allProducts };
