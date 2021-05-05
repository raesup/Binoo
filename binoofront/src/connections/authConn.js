import URL from '../config';

const header = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

const signup = ({ name, email, password }) => {
	console.log(email, password);
	return fetch(`${URL}/signup`, {
		method: 'POST',
		headers: header,
		body: JSON.stringify({ name, email, password }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

const login = ({ email, password }) => {
	return fetch(`${URL}/login`, {
		method: 'POST',
		headers: header,
		body: JSON.stringify({ email, password }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		});
};

const logout = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('jwtNuser');
		localStorage.removeItem('shoppingCart');

		return fetch(`${URL}/logout`, {
			method: 'GET',
		})
			.then(response => {
				console.log('logout', response);
			})
			.catch(err => console.log);
	}
};

const checkPass = (userId, token, passObject) => {
	return fetch(`${URL}/user/pass/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(passObject),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

const jwtNuserToLocalStorage = (data, next) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('jwtNuser', JSON.stringify(data));
		next();
	}
};

const isLoginMode = () => {
	if (window.localStorage.length == 0) {
		return false;
	}

	if (localStorage.getItem('jwtNuser')) {
		return JSON.parse(localStorage.getItem('jwtNuser'));
	} else {
		return false;
	}
};

export {
	signup,
	login,
	logout,
	jwtNuserToLocalStorage,
	isLoginMode,
	checkPass,
};
