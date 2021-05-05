import React, { useState, useEffect } from 'react';
import moment from 'moment';
import UserSidebar from '../components/UserSidebar';
import { getClientPurchaseLists } from '../connections/orderConn';
import { isLoginMode } from '../connections/authConn';
import URL from '../config';

import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';

//css
import './Order.css';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const Accordion = withStyles({
	root: {
		border: '1px solid rgba(0, 0, 0, .125)',
		boxShadow: 'none',
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
	root: {
		backgroundColor: 'rgba(0, 0, 0, .03)',
		borderBottom: '1px solid rgba(0, 0, 0, .125)',
		marginBottom: -1,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiAccordionDetails);

const UserOrder = () => {
	const [expanded, setExpanded] = React.useState('panel0');
	const { user, token } = isLoginMode();
	const [orders, setOrders] = useState([]);
	const classes = useStyles();

	const loadOrders = () => {
		getClientPurchaseLists(user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
	};

	const handleChange = panel => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	useEffect(() => {
		loadOrders();
	}, []);

	return (
		<div className="b-container-user-order">
			<div class="row">
				<div className="side-container">
					<UserSidebar />
				</div>
				<div className="edit-container-user-order">
					<div class="user-o-container">
						<h3 className="userorder-title">User Orders</h3>
						{orders.map((o, i) => {
							return (
								<Accordion
									square
									expanded={expanded === `panel${i}`}
									onChange={handleChange(`panel${i}`)}
								>
									<AccordionSummary
										aria-controls="panel1d-content"
										id="panel1d-header"
									>
										<Typography>
											Order #: {o._id}
											<br />
											Order Date:
											{moment(o.createdAt).format(
												'MMM Do YYYY'
											)}{' '}
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<TableContainer component={Paper}>
											<Table
												className={classes.table}
												aria-label="simple table"
											>
												<TableHead>
													<TableRow>
														<TableCell>Product</TableCell>
														<TableCell></TableCell>
														<TableCell align="right">
															Quantity
														</TableCell>
														<TableCell align="right">
															Price
														</TableCell>
														<TableCell align="right">
															Status
														</TableCell>
														<TableCell align="right">
															Total
														</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{o.products.map(
														(product, productIndex) => (
															<TableRow key={productIndex}>
																<TableCell
																	component="th"
																	scope="row"
																>
																	<img
																		src={`${URL}/product/photo/${product._id}`}
																		alt={product.name}
																		className="mb-3"
																		style={{
																			height: '70px',
																			width: '70px',
																		}}
																	/>
																</TableCell>
																<TableCell align="right">
																	{product.name}
																</TableCell>
																<TableCell align="right">
																	{product.count}
																</TableCell>
																<TableCell align="right">
																	$
																	{parseFloat(
																		product.price
																	).toFixed(2)}
																</TableCell>
																<TableCell align="right">
																	{o.status}
																</TableCell>
																<TableCell align="right">
																	$
																	{parseFloat(
																		product.price *
																			product.count
																	).toFixed(2)}
																</TableCell>
															</TableRow>
														)
													)}
												</TableBody>
											</Table>
										</TableContainer>
									</AccordionDetails>
								</Accordion>
							);
						})}
					</div>
				</div>
			</div>
			<div className="for-footer-order"></div>
		</div>
	);
};

export default UserOrder;
