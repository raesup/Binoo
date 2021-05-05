import URL from '../config';

// Get order all lists - for admin
const allOrderLists = (userId, token) => {
	return fetch(`${URL}/order/list/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

// Get a client's purchase history
const getClientPurchaseLists = (userId, token) => {
	return fetch(`${URL}/orders/by/user/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then(response => {
			console.log('response in Conn method', response);
			return response.json();
		})
		.catch(err => console.log(err));
};

// create order after payment
const createOrder = (userId, token, createOrderData) => {
	return fetch(`${URL}/order/create/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ order: createOrderData }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

// Shipping status
const updateShippingStatus = (userId, token, orderId, status) => {
	return fetch(`${URL}/order/${orderId}/status/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ status, orderId }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

// load status - 쓸지 안쓸지는 잘 모르겠네요
const getStatusValues = (userId, token) => {
	return fetch(`${URL}/order/status-values/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export {
	allOrderLists,
	getClientPurchaseLists,
	createOrder,
	updateShippingStatus,
};
