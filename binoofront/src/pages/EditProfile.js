import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';
import { isLoginMode } from '../connections/authConn';
import { read, update, updateUser } from '../connections/userConn';

//css
import './EditUserProfile.css';

const EditProfile = ({ match }) => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		error: false,
		success: false,
		address: '',
		errorMessage: '',
	});

	const [successMessage, setSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);

	const { name, email, address, error, success } = values;
	const { token } = isLoginMode();
	const init = userId => {
		read(userId, token).then(data => {
			if (data.error) {
				setValues({
					...values,
					error: true,
					errorMessage: data.error.value,
				});
			} else {
				setValues({
					...values,
					name: data.name,
					email: data.email,
					address: data.address,
				});

				updateUser(data, () => {
					setSuccessMessage(true);
				});
			}
		});
	};

	useEffect(() => {
		init(match.params.userId);
	}, []);

	const handleChange = name => e => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const clickSubmit = e => {
		e.preventDefault();
		update(match.params.userId, token, {
			name,
			address,
		}).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({
					...values,
					name: data.name,
					email: data.email,
					success: true,
					address: data.address,
				});
			}
		});
	};

	const redirectUser = success => {
		if (success) {
			return (
				<Redirect to={`/profile/${match.params.userId}?success=true`} />
			);
		}
	};

	return (
		<div className="b-container-edit-user">
			<div class="row">
				<div className="side-container-edit-user">
					<UserSidebar />
				</div>
				<div className="edit-container-edit-user">
					<h3 className="user-profile-title">Edit User Profile</h3>
					<div class="profile-container-edit-user">
						<div className="form-group">
							<label for="floatingInputValue" className="label-top">
								Name
							</label>
							<input
								type="text"
								id="floatingInputValue"
								onChange={handleChange('name')}
								className="form-control "
								value={name}
							/>
						</div>

						<div className="form-group">
							<label for="floatingInputValue" className="label-top">
								Address
							</label>
							<textarea
								id="floatingInputValue"
								onChange={handleChange('address')}
								className="form-control "
								value={address}
							/>
						</div>
						<button
							onClick={clickSubmit}
							className="btn btn-secondary user-acct-edit-btn"
						>
							Submit
						</button>
						{redirectUser(success)}
						{/* display error message if fail to create product */}
						{error ? (
							<h6 className="text-danger alert alert-danger space">
								Fail to edit profile. {errorMessage}
								<br />
							</h6>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
