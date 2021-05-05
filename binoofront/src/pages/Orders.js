import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Sidebar from '../components/Sidebar';
import { isLoginMode } from '../connections/authConn';
import { allOrderLists, updateShippingStatus } from '../connections/orderConn';
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

const Orders = () => {
	const [expanded, setExpanded] = React.useState('panel0');
	const [orders, setOrders] = useState([]);
	const { user, token } = isLoginMode();
	const classes = useStyles();

	const loadOrders = () => {
		allOrderLists(user._id, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
			}
		});
	};

	useEffect(() => {
		loadOrders();
	}, []);

	const extentionChange = panel => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const showOrdersQty = () => {
		if (orders.length > 0) {
			return <h4>Total orders: {orders.length}</h4>;
		} else {
			return <h3 className="text-danger">No orders founded</h3>;
		}
	};

	const showInput = (key, value) => (
		<div className="input-group mb-2 mr-sm-2">
			<div className="input-group-prepend">
				<div className="input-group-text">{key}</div>
				<input
					type="text"
					value={value}
					className="form-control"
					readOnly
				/>
			</div>
		</div>
	);

	const handleStatusChange = (e, orderId) => {
		updateShippingStatus(user._id, token, orderId, e.target.value).then(
			data => {
				if (data.error) {
					console.log('Status update failed');
				} else {
					loadOrders();
				}
			}
		);
	};

	const showStatus = o => (
		<div className="form-group">
			<h4>Status: {o.status}</h4>
			<select onChange={e => handleStatusChange(e, o._id)}>
				<option>Update Status</option>

				<option value="Not processed"> Not processed</option>
				<option value="Processing">Processing</option>
				<option value="Shipped"> Shipped</option>
				<option value="Delivered"> Delivered</option>
				<option value="Cancelled"> Cancelled</option>
			</select>
		</div>
	);

	return (
		<div className="b-container">
			<div class="row">
				<div className="side-container">
					<Sidebar />
				</div>
				<div className="edit-container">
					<div class="o-container">
						<h3 className="order-title">User Orders</h3>
						{showOrdersQty()}
						{orders.map((o, i) => {
							return (
								<Accordion
									square
									expanded={expanded === `panel${i}`}
									onChange={extentionChange(`panel${i}`)}
								>
									<AccordionSummary
										aria-controls="panel1d-content"
										id="panel1d-header"
									>
										<Typography gutterBottom>
											Order ID: {o._id}
											<br />
											Order Date:{' '}
											{moment(o.createdAt).format('MMM Do YYYY')}
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
													{o.products.map((p, pIndex) => (
														<TableRow key={pIndex}>
															<TableCell
																component="th"
																scope="row"
															>
																{p.name}
															</TableCell>
															<TableCell align="right">
																{p.count}
															</TableCell>
															<TableCell align="right">
																{parseFloat(p.price).toFixed(2)}
															</TableCell>
															<TableCell align="right">
																{showStatus(o)}
															</TableCell>
															<TableCell align="right">
																$
																{parseFloat(
																	p.price * p.count
																).toFixed(2)}
															</TableCell>
														</TableRow>
													))}
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

export default Orders;
