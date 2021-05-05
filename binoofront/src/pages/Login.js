import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
	login,
	jwtNuserToLocalStorage,
	isLoginMode,
} from '../connections/authConn';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';

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

const Login = () => {
	const classes = useStyles();
	const [errorOpen, setErrorOpen] = useState(false);
	const [successOpen, setSuccessOpen] = useState(false);
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: false,
		success: false,
		loading: false,
		emailError: false,
	});

	const {
		email,
		password,
		loading,
		error,
		success,
		redirectToReferrer,
		emailError,
	} = values;
	const { user } = isLoginMode();

	const checkEmail = () => {
		const re = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

		if (email === '') {
			setValues({ ...values, emailError: false });
		} else {
			if (re.test(String(email).toLowerCase())) {
				setValues({ ...values, emailError: false });
			} else {
				setValues({ ...values, emailError: true });
			}
		}
	};

	useEffect(() => {
		checkEmail();
	}, [emailError, email, redirectToReferrer]);

	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = event => {
		console.log(user);
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		login({ email, password }).then(data => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
				setErrorOpen(true);
			} else {
				jwtNuserToLocalStorage(data, () => {
					setValues({
						...values,
						success: true,
						redirectToReferrer: true,
					});
					setSuccessOpen(true);
				});
				window.location.reload();
			}
		});
	};

	const loginUpForm = () => (
		<div className="container">
			<div className="signin">
				<form>
					<h3 className="login-title">LOGIN</h3>
					<div className="form-group">
						<label className="text-muted">Email</label>
						<input
							onChange={handleChange('email')}
							type="email"
							className="form-control"
							value={email}
						/>
						{emailError ? (
							<span style={{ color: 'red' }}>Email must contain @</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label className="text-muted">Password</label>
						<input
							onChange={handleChange('password')}
							type="password"
							className="form-control"
							value={password}
						/>
					</div>

					<button
						disabled={emailError || password === ''}
						onClick={clickSubmit}
						className="btn_login"
					>
						Login
					</button>

					<div className="form-group">
						Don't have an account? <Link to="/Signup">Sign up</Link>
					</div>
				</form>
			</div>
		</div>
	);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setErrorOpen(false);
		setSuccessOpen(false);
	};

	const showError = () => (
		<div className={classes.root}>
			<Snackbar
				open={errorOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="error">
					Error logging in...{error}
				</Alert>
			</Snackbar>
		</div>
	);

	const showSuccess = () => (
		<div className={classes.root}>
			<Snackbar
				open={successOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="success">
					Successfully logged in!
				</Alert>
			</Snackbar>
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="alert alert-info">
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		if (redirectToReferrer) {
			if (user && user.role === 1) {
				return <Redirect to="/afterlogin" />;
			} else {
				return <Redirect to="/afterlogin" />;
			}
		}
	};

	return (
		<div className="sub">
			{showLoading()}
			{showError()}
			{showSuccess()}
			{loginUpForm()}
			{redirectUser()}
		</div>
	);
};

export default Login;
