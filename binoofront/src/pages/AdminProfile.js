import React from 'react';
import Sidebar from '../components/Sidebar';
import { isLoginMode } from '../connections/authConn';

//css
import './Profile.css';

const AdimProfile = () => {
	const {
		user: { name, email },
	} = isLoginMode();
	return (
		<div className="b-container-admin-profile">
			<div className="row">
				<div className="side-container-admin-profile">
					<Sidebar />
				</div>
				<div className="edit-container-admin-profile">
					<h3 className="admin-title">Admin Account</h3>
					<div className="admin-profile-table">
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
					</div>

					<div className="for-footer-admin"></div>
				</div>
			</div>
		</div>
	);
};

export default AdimProfile;
