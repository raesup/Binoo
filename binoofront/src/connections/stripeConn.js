import URL from '../config';

const createPaymentIntent = amount => {
	return fetch(`${URL}/create-payment-intent`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		// body: JSON.stringify({ amount: 500 }),
		body: JSON.stringify(amount),
	})
		.then(res => {
			console.log(res);
			return res.json();
		})
		.catch(err => console.log(err));
};

export { createPaymentIntent };
