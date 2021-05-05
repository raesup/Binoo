import React, { useEffect, useState } from 'react';
import Card from '../components/Card.js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { MdSettingsInputAntenna } from 'react-icons/md';

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

const LoginMain = () => {
	const classes = useStyles();
	const [successOpen, setSuccessOpen] = useState(true);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSuccessOpen(false);
	};

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

	return (
		<div>
			<Card />;{showSuccess()}
		</div>
	);
};

export default LoginMain;
