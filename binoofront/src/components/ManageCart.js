// addItem into cart
const addItem = (item = [], count = 0, total = 0, next = func => func) => {
	let cart = [];

	if (typeof window !== 'undefined') {
		const existCart = localStorage.getItem('shoppingCart');
		if (existCart) {
			cart = JSON.parse(existCart);
		}

		cart.push({
			...item,
			count: 1,
		});

		cart = Array.from(new Set(cart.map(prod => prod._id))).map(id => {
			return cart.find(prod => prod._id === id);
		});

		localStorage.setItem('shoppingCart', JSON.stringify(cart));
		next();
	}
};

//Count total number of items in the cart in LocalStorage
const cartLength = () => {
	if (typeof window !== 'undefined') {
		const existCart = localStorage.getItem('shoppingCart');
		if (existCart) {
			return JSON.parse(existCart).length;
		}
	}
	return 0;
};

//Get all items in the cart
const getAllCartItems = () => {
	if (typeof window !== 'undefined') {
		const existCart = localStorage.getItem('shoppingCart');
		if (existCart) {
			return JSON.parse(existCart);
		}
	}
	return [];
};

//Update item in the cart
const updateItemNumber = (productId, count) => {
	let cart = [];
	if (typeof window !== 'undefined') {
		const existCart = localStorage.getItem('shoppingCart');
		if (existCart) {
			cart = JSON.parse(existCart);
		}

		cart.map((item, index) => {
			if (item._id === productId) {
				cart[index].count = count;
				item.total = item.count * item.price;
			}
		});

		localStorage.setItem('shoppingCart', JSON.stringify(cart));
	}
};

//Remove items in the cart
const removeItem = productId => {
	let cart = [];
	if (typeof window !== 'undefined') {
		const existCart = localStorage.getItem('shoppingCart');
		if (existCart) {
			cart = JSON.parse(existCart);
		}

		cart.map((item, index) => {
			if (item._id === productId) {
				cart.splice(index, 1);
			}
		});

		localStorage.setItem('shoppingCart', JSON.stringify(cart));
	}
	return cart;
};

//After Payout, empty out the cart
const emptyCart = next => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('shoppingCart');
		next();
	}
};

export {
	addItem,
	cartLength,
	getAllCartItems,
	updateItemNumber,
	removeItem,
	emptyCart,
};
