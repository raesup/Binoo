import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';
import { isLoginMode } from '../connections/authConn';
import { read } from '../connections/userConn';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//css
import './Profile.css';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Profile = ({ match }) => {
	const [values, setValues] = useState({
		_id: '',
		name: '',
		email: '',
		address: '',
	});

	const [successMessage, setSuccessMessage] = useState(false);
	const [errorOpen, setErrorOpen] = useState(false);
	const [successOpen, setSuccessOpen] = useState(false);

	const { _id, name, email, address } = values;

	const init = () => {
		const userInfo = isLoginMode();

		read(userInfo.user._id, userInfo.token).then(data => {
			const success = new URLSearchParams(window.location.search).get(
				'success'
			);
			const password = new URLSearchParams(window.location.search).get(
				'password'
			);
			if (success && success === 'true' && setSuccessOpen(true));
			if (password && password === 'true' && setSuccessOpen(true));
			setValues({
				...values,
				_id: data._id,
				name: data.name,
				email: data.email,
				address: data.address,
			});
		});
	};

	useEffect(() => {
		init();
	}, [match.params.userId]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setErrorOpen(false);
		setSuccessOpen(false);
	};

	return (
		<div className="b-container-user-profile">
			<div class="row">
				<div className="side-container-user-profile">
					<UserSidebar />
				</div>
				<div className="edit-container-user-account">
					<h3 className="user-title">User Account</h3>
					<div class="user-account-container">
						<div>
							<label for="floatingInputValue" className="label-top">
								Email
							</label>
							<input
								type="email"
								class="form-control"
								id="floatingInputValue"
								value={email}
							/>
							<label for="floatingInputValue" className="label-top">
								Name
							</label>
							<input
								type="text"
								class="form-control"
								id="floatingInputValue"
								value={name}
							/>
							<label for="floatingInputValue" className="label-top">
								Address
							</label>
							<textarea
								type="text"
								class="form-control"
								id="floatingInputValue"
								value={address}
							/>
						</div>

						<div className="btn-container-user">
							<div className="btn-display">
								<Link to={`/profile/edit/${_id}`}>
									<button className="btn btn-secondary btn-lg user-acct-btn">
										Edit Account
									</button>
								</Link>
							</div>
							<div className="btn-display">
								<Link to={`/profile/edit/pass/${_id}`}>
									<button className="btn btn-secondary btn-lg user-acct-btn">
										Change Password
									</button>
								</Link>
							</div>
						</div>
						<div>
							{successOpen ? (
								<div>
									<Snackbar
										open={successOpen}
										autoHideDuration={6000}
										onClose={handleClose}
									>
										<Alert onClose={handleClose} severity="success">
											Profile successfully changed!
										</Alert>
									</Snackbar>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
