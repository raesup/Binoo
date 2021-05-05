import URL from '../config';

const read = (userId, token) => {
	return fetch(`${URL}/user/${userId}`, {
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

const update = (userId, token, userObject) => {
	return fetch(`${URL}/user/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(userObject),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

const updatePassword = (userId, token, passwordObject) => {
	return fetch(`${URL}/user/pass/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(passwordObject),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

const updateUser = (user, next) => {
	if (typeof window !== 'undefined') {
		const tokenNuser = localStorage.getItem('jwtNuser');
		if (tokenNuser) {
			let auth = JSON.parse(tokenNuser);
			auth.user = user;
			localStorage.setItem('jwtNuser', JSON.stringify(auth));
			next();
		}
	}
};

export { read, update, updateUser, updatePassword };
