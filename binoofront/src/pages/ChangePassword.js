import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';
import { isLoginMode } from '../connections/authConn';
import { read, updatePassword } from '../connections/userConn';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { checkPass } from '../connections/authConn';
import { Redirect } from 'react-router-dom';

import './EditUserProfile.css';

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			// width: '80ch',
			justifyContent: 'center',
		},
	},
}));

const ChangePassword = ({ match }) => {
	const classes = useStyles();
	const userInfo = isLoginMode();

	const [success, setSuccess] = useState(false);

	const [currPassword, setCurrPassword] = useState('');
	const [currError, setCurrError] = useState(false);
	const [currPasswordInitialRender, setCurrPasswordInitialRender] = useState(
		true
	);

	const [newPassword, setNewPassword] = useState('');
	const [newError, setNewError] = useState(false);
	const [newErrorMessage, setNewErrorMessage] = useState('');
	const [newPasswordInitialRender, setNewPasswordInitialRender] = useState(
		true
	);

	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmError, setConfirmError] = useState(false);
	const [confirmErrorMessage, setConfirmErrorMessage] = useState('');
	const [
		confirmPasswordInitialRender,
		setConfirmPasswordInitialRender,
	] = useState(true);

	const checkNewPass = () => {
		if (currPassword && newPassword && currPassword === newPassword) {
			setNewError(true);
			setNewErrorMessage(
				'The new password must be different from the current password'
			);
		}
	};

	const comparePasswords = () => {
		if (confirmPassword && newPassword && confirmPassword === newPassword) {
			setConfirmError(false);
		} else {
			setConfirmError(true);
			setConfirmErrorMessage('The passwords do not match');
		}
	};

	useEffect(() => {
		if (!newPasswordInitialRender) {
			checkNewPass();
		}
		if (!newPasswordInitialRender && !confirmPasswordInitialRender) {
			comparePasswords();
		}
	}, [currPassword, confirmPassword, newPassword]);

	const handleCurrChange = e => {
		setCurrPassword(e.target.value);
		setCurrPasswordInitialRender(false);
		checkPass(userInfo.user._id, userInfo.token, {
			password: e.target.value,
		}).then(data => {
			if (data && data.password === 'true') {
				setCurrError(false);
			} else {
				setCurrError(true);
			}
		});
	};

	const clickSubmit = e => {
		e.preventDefault();
		const { token } = isLoginMode();
		updatePassword(match.params.userId, token, {
			password: newPassword,
		}).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setSuccess(true);
			}
		});
	};

	const handleNewChange = async e => {
		setNewPassword(e.target.value);
		setNewPasswordInitialRender(false);

		const reg = {
			digit: /[0-9]/,
		};
		if (e.target.value.length < 6) {
			setNewError(true);
			setNewErrorMessage('Password must be longer than 6 characters');
			return;
		} else {
			if (!reg.digit.test(e.target.value)) {
				setNewError(true);
				setNewErrorMessage('Password must contain a digit');
				return;
			} else {
				setNewError(false);
			}
		}
	};

	const handleConfirmChange = e => {
		setConfirmPasswordInitialRender(false);
		setConfirmPassword(e.target.value);
	};

	const redirectUser = success => {
		if (success) {
			return (
				<Redirect to={`/profile/${match.params.userId}?password=true`} />
			);
		}
	};

	return (
		<div className="b-container-pw">
			<div class="row">
				<div class="side-container-pw">
					<UserSidebar />
				</div>
				<div class="edit-container-pw">
					<h3 className="user-password-title">Change Password</h3>
					<div class="password-container"></div>
					<form className={classes.root}>
						<div className="intput-pw">
							<TextField
								error={currError}
								type="password"
								helperText={currError && 'Password is incorrect'}
								id="currentPassword"
								label="Enter Current Password"
								variant="outlined"
								onChange={handleCurrChange}
								fullWidth={true}
							/>
						</div>
						<div className="intput-pw">
							<TextField
								error={newError}
								type="password"
								helperText={newError && newErrorMessage}
								id="newPassword"
								label="Enter new password"
								variant="outlined"
								onChange={handleNewChange}
								fullWidth={true}
							/>
						</div>
						<div className="intput-pw">
							<TextField
								error={confirmError}
								type="password"
								helperText={confirmError && confirmErrorMessage}
								onChange={handleConfirmChange}
								id="confirmPassword"
								label="Confirm new password"
								variant="outlined"
								fullWidth={true}
							/>
						</div>
						<div className="intput-pw btn-mg">
							<Button
								disabled={
									currError ||
									newError ||
									confirmError ||
									currPasswordInitialRender ||
									newPasswordInitialRender ||
									confirmPasswordInitialRender
								}
								fullWidth={true}
								// className={clsx(classes.root, className)}
								onClick={clickSubmit}
								variant="contained"
							>
								Change Password
							</Button>
						</div>
						{redirectUser(success)}
					</form>
				</div>
			</div>
			{/* <div className="for-footer-user-password"></div> */}
		</div>
	);
};

export default ChangePassword;
