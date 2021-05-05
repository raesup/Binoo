import React, { useState, useEffect } from 'react';
import { isLoginMode } from '../connections/authConn';
import { addProduct } from '../connections/adminConn';
import Sidebar from '../components/Sidebar';
import { useDropzone } from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
//css
import './CreateProduct.css';

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

const CreateProduct = ({ location, history }) => {
	const classes = useStyles();
	if (!location.state) {
		history.push('/');
	}
	
	const [successMessage, setSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [preview, setPreview] = useState(false);

	const [errorOpen, setErrorOpen] = useState(false);
	const [successOpen, setSuccessOpen] = useState(false);

	const { user, token } = isLoginMode();

	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		category: '',
		quantity: '',
		photo: '',
		visibility: 'visible',
		success: '',
		formData: '',
		error: '',
	});

	const {
		name,
		description,
		price,
		category,
		quantity,
		visibility,
		success,
		photo,
		error,
	} = values;

	const createFormData = () => {
		setValues({
			...values,
			formData: new FormData(),
		});
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setErrorOpen(false);
		setSuccessOpen(false);
	};

	useEffect(() => {
		console.log('visibility: ', visibility);
		createFormData();
	}, [visibility]);

	//Photo upload
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/*',
		onDrop: acceptedFiles => {
			console.log(acceptedFiles[0]);
			setValues({
				...values,
				photo: acceptedFiles[0],
				photoPreviewURL: global.URL.createObjectURL(acceptedFiles[0]),
			});
			setPreview(true);

			console.log(acceptedFiles[0]);
		},
	});

	const handleChange = name => event => {
		const value = event.target.value;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = event => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('photo', photo);
		formData.append('name', name);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('category', category);
		formData.append('quantity', quantity);
		formData.append('visibility', visibility);

		//checking purpose
		// for (var value of formData.values()) {
		// 	console.log(value);
		// }

		addProduct(user._id, token, formData).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
				setErrorMessage(true);
				setErrorOpen(true);
			} else {
				setValues({
					...values,
					name: '',
					description: '',
					photo: '',
					price: '',
					quantity: '',
					visibility: 'visible',
					success: data.name,
				});
				setSuccessMessage(true);
				setSuccessOpen(true);
			}
		});
	};

	return (
		<div className="b-container">
			<div className="row">
				<div className="side-container sidebar-container">
					<Sidebar />
				</div>
				<div className="edit-container">
					
					<h3 className="add-title">Add Product</h3>
					
					<div className="p-container">
						{/* display success message if product is created */}
						{successMessage ? (
							<div className={classes.root}>
								<Snackbar
									open={successOpen}
									autoHideDuration={6000}
									onClose={handleClose}
								>
									<Alert onClose={handleClose} severity="success">
										Successfully created product!
									</Alert>
								</Snackbar>
							</div>
						) : 
						null}
						{/* display error message if fail to create product */}
						{errorMessage ? (
							<div className={classes.root}>
								<Snackbar
									open={errorOpen}
									autoHideDuration={6000}
									onClose={handleClose}
								>
									<Alert onClose={handleClose} severity="error">
										Error creating a product
									</Alert>
								</Snackbar>
							</div>
						) : 
						null}

						<form
							className="form-group-create-prod"
							onSubmit={handleSubmit}
						>
							<div className="preview">
								{preview ? (
									<img
										className="prodImg"
										src={values.photoPreviewURL}
										alt="preview"
										style={{ width: '200px', height: '200px' }}
									></img>
								) : null}
							</div>
							<div {...getRootProps()}>
								<input {...getInputProps()}></input>
								{isDragActive ? (
									<p className="image-container-ep">
										<b>Drop the image here..</b>
									</p>
								) : (
									<p className="image-container-ep">
										<b>Drag & Drop</b> image here or <b>click</b> here
										to select image
									</p>
								)}
							</div>

							<div className="form-group ">
								<label className="text-muted">Name</label>
								<input
									onChange={handleChange('name')}
									type="text"
									className="form-control"
									value={name}
									required
								/>
							</div>

							<div className="form-group">
								<label className="text-muted">Description</label>
								<textarea
									onChange={handleChange('description')}
									className="form-control"
									value={description}
									required
								/>
							</div>

							<div className="form-group">
								<label className="text-muted">Price</label>
								<input
									onChange={handleChange('price')}
									type="number"
									className="form-control"
									value={price}
									required
									min="1"
									step="0.01"
								/>
							</div>

							<div className="form-group">
								<label className="text-muted">Category</label>
								<select
									onChange={handleChange('category')}
									className="form-control"
									required
								>
									<option>Please select</option>
									<option value="1">Natural Soap</option>
									<option value="2">Bath Tea</option>
									<option value="3">Scrub</option>
									<option value="4">Laundry Bar / Dish Bar</option>
									<option value="5">Candle</option>
								</select>
							</div>

							<div className="form-group">
								<label className="text-muted">Quantity</label>
								<input
									onChange={handleChange('quantity')}
									type="number"
									className="form-control"
									value={quantity}
									required
									min="1"
								/>
							</div>

							<div className="form-group">
								<label className="text-muted">Visibility</label>
								<br />
								<select
									onChange={handleChange('visibility')}
									className="form-control"
									required
								>
									<option value="visible">Visible</option>
									<option value="invisible">Invisible</option>
								</select>
							</div>
							<div className="btn-container">
								<button className="btn btn-dark">Create Product</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;
