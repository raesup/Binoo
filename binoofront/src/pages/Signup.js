import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../connections/authConn';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './Signup.css';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const Signup = () => {
	const classes = useStyles();

	const [errorOpen, setErrorOpen] = useState(false);
	const [successOpen, setSuccessOpen] = useState(false);

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState(false);
	const [nameErrorMessage, setNameErrorMessage] = useState('');
	const [initialNameRender, setInitialNameRender] = useState(true);

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [initialEmailRender, setInitialEmailRender] = useState(true);

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [initialPasswordRender, setInitialPasswordRender] = useState(true);

	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [
		confirmPasswordErrorMessage,
		setConfirmPasswordErrorMessage,
	] = useState('');
	const [
		initialConfirmPasswordRender,
		setInitialConfirmPasswordRender,
	] = useState(true);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleNameChange = e => {
		setName(e.target.value);
		setInitialNameRender(false);
	};

	const handleEmailChange = e => {
		setEmail(e.target.value);
		setInitialEmailRender(false);
	};

	const handlePasswordChange = e => {
		setPassword(e.target.value);
		setInitialPasswordRender(false);
	};

	const handleConfirmPasswordChange = e => {
		setConfirmPassword(e.target.value);
		setInitialConfirmPasswordRender(false);
	};

	const checkName = () => {
		if (name === '') {
			setNameError(true);
			setNameErrorMessage('Name cannot be empty');
		} else {
			setNameError(false);
			setNameErrorMessage('');
		}
	};

	const checkEmail = () => {
		const re = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		if (email === '') {
			setEmailError(true);
			setEmailErrorMessage('Email cannot be empty');
		} else if (!re.test(email)) {
			setEmailError(true);
			setEmailErrorMessage('Invalid email');
		} else {
			setEmailError(false);
			setEmailErrorMessage('');
		}
	};

	const checkPassword = () => {
		const re = /[0-9]/;
		if (password === '') {
			setPasswordError(true);
			setPasswordErrorMessage('Password cannot be empty');
		} else if (password.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage('Password must be more than 6 letters');
		} else if (!re.test(password)) {
			setPasswordError(true);
			setPasswordErrorMessage('Password must contain a digit');
		} else {
			setPasswordError(false);
			setPasswordErrorMessage('');
		}
	};

	const checkConfirmPassword = () => {
		if (password !== confirmPassword) {
			setConfirmPasswordError(true);
			setConfirmPasswordErrorMessage('The passwords do not match');
		} else {
			setConfirmPasswordError(false);
			setConfirmPasswordErrorMessage('');
		}
	};

	useEffect(() => {
		if (initialNameRender) {
		} else {
			checkName();
		}

		if (initialEmailRender) {
		} else {
			checkEmail();
		}

		if (initialPasswordRender) {
		} else {
			checkPassword();
		}

		if (initialConfirmPasswordRender) {
		} else {
			checkConfirmPassword();
		}
	}, [
		name,
		initialNameRender,
		email,
		initialEmailRender,
		password,
		initialPasswordRender,
		confirmPassword,
		initialConfirmPasswordRender,
	]);

	const clickSubmit = event => {
		event.preventDefault();
		const signupObject = {
			name: name,
			email: email,
			password: password,
		};
		signup(signupObject).then(data => {
			if (data.error) {
				setError(data.error);
				setErrorOpen(true);
				setSuccess(false);
			} else {
				setName('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');
				setInitialNameRender(true);
				setInitialEmailRender(true);
				setInitialPasswordRender(true);
				setInitialConfirmPasswordRender(true);
				setError('');
				setSuccess(true);
				setSuccessOpen(true);
			}
		});
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setErrorOpen(false);
		setSuccessOpen(false);
	};

	const signUpForm = () => (
		<div className="container">
			<div className="signup">
				<form>
					<h3 className="signup-title">SIGN UP</h3>
					<div className="form-group">
						<label className="text-muted">Name</label>
						<input
							onChange={handleNameChange}
							type="name"
							className="form-control"
							value={name}
						/>
						{nameError ? (
							<span style={{ color: 'red' }}>{nameErrorMessage}</span>
						) : (
							''
						)}
					</div>
					<div className="form-group">
						<label className="text-muted">Email</label>
						<input
							onChange={handleEmailChange}
							type="email"
							className="form-control"
							value={email}
						/>
						{emailError ? (
							<span style={{ color: 'red' }}>{emailErrorMessage}</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label className="text-muted">Password</label>
						<input
							onChange={handlePasswordChange}
							type="password"
							className="form-control"
							value={password}
						/>
						{passwordError ? (
							<span style={{ color: 'red' }}>
								{passwordErrorMessage}
							</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label className="text-muted">Confirm Password</label>
						<input
							onChange={handleConfirmPasswordChange}
							type="password"
							className="form-control"
							value={confirmPassword}
						/>
						{confirmPasswordError ? (
							<span style={{ color: 'red' }}>
								{confirmPasswordErrorMessage}
							</span>
						) : (
							''
						)}
					</div>
					<button
						disabled={
							nameError ||
							emailError ||
							passwordError ||
							confirmPasswordError ||
							initialNameRender ||
							initialEmailRender ||
							initialPasswordRender ||
							initialConfirmPasswordRender
						}
						onClick={clickSubmit}
						className="btn_signup"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);

	const showError = () => (
		<div className={classes.root}>
			<Snackbar
				open={errorOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="error">
					Oops... {error}
				</Alert>
			</Snackbar>
		</div>

		// <div
		// 	className="alert alert-danger"
		// 	style={{ display: error ? '' : 'none' }}
		// >
		// 	{error}
		// </div>
	);

	const showSuccess = () => (
		<div className={classes.root}>
			<Snackbar
				open={successOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success">
					Sign up successful! Welcome!{' '}
					<Link style={{ color: 'skyblue' }} to="/login">
						Please Login
					</Link>
				</Alert>
			</Snackbar>
		</div>

		// <div
		// 	className="alert alert-info"
		// 	style={{ display: success ? '' : 'none' }}
		// >
		// 	New account is created. Please <Link to="/login">Login</Link>
		// </div>
	);

	return (
		<div className="sub">
			{showSuccess()}
			{showError()}
			{signUpForm()}
		</div>
	);
};

export default Signup;
