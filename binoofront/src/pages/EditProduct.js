import React, { useState, useEffect } from 'react';
import { isLoginMode } from '../connections/authConn';
import { editProduct } from '../connections/adminConn';
import Sidebar from '../components/Sidebar';
import { getOneProduct } from '../connections/coreConn';
import URL from '../config';
import { withRouter } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

//css
import './EditProduct.css';

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

const EditProduct = ({ match }) => {
	const classes = useStyles();
	const [errorOpen, setErrorOpen] = useState(false);
	const [successOpen, setSuccessOpen] = useState(false);
	const productId = match.params.productId;
	let counter = 0;

	const [successMessage, setSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [oldImage, setOldImage] = useState(true);
	const [preview, setPreview] = useState(false);
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

	const { user, token } = isLoginMode();

	const [values, setValues] = useState({
		name: '',
		description: '',
		price: '',
		category: 0,
		quantity: '',
		visibility: '',
		photo: '',
		photoPreviewURL: '',
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

	const showCurrentPhoto = counter => {
		return (
			<img
				src={`${URL}/product/photo/${match.params.productId}?v=${counter}`}
				alt=""
				style={{ width: '200px', height: '200px' }}
			/>
		);
	};

	const getOldData = () => {
		getOneProduct(productId).then(data => {
			if (data.error) {
			} else {
				setValues(data);
			}
		});
	};

	useEffect(() => {
		getOldData();
		createFormData();
	}, []);

	const handleChange = name => event => {
		const value = event.target.value;
		setValues({ ...values, [name]: value });
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setErrorOpen(false);
		setSuccessOpen(false);
	};

	const handleSubmit = event => {
		event.preventDefault();

		const formData = new FormData();
		if (values.photo) {
			formData.append('photo', values.photo);
		}
		formData.append('name', values.name);
		formData.append('description', values.description);
		formData.append('price', values.price);
		formData.append('category', values.category);
		formData.append('quantity', values.quantity);
		formData.append('visibility', visibility);

		//Check data in formData
		//for (var value of formData.values()) {
		//	console.log(value);
		//}

		editProduct(productId, user._id, token, formData).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
				setErrorOpen(true);
			} else {
				console.log(data);
				setValues({
					...values,
					name: '',
					description: '',
					photo: '',
					price: '',
					quantity: '',
					visibility: '',
					category: '',
					success: data.name,
					redirect: true,
				});
				counter = counter + 1;
				getOldData();
				setOldImage(false);
				setPreview(false);
				setSuccessMessage(true);
				setSuccessOpen(true);
			}
		});
	};

	return (
		<div className="b-container-1p">
			<div class="row">
				<div className="sidebar-container-1p">
					<Sidebar />
				</div>
				<div className="edit-container-1p">
					<div className="p-container-1p">
						<h3 className="title-1p">Edit Product</h3>
						{/* display success message if product is created */}
						{successOpen ? (
							<div className={classes.root}>
								<Snackbar
									open={successOpen}
									autoHideDuration={6000}
									onClose={handleClose}
								>
									<Alert onClose={handleClose} severity="success">
										Successfully changed product!
									</Alert>
								</Snackbar>
							</div>
						) : null}
						{/* display error message if fail to create product */}
						{errorMessage ? (
							<h6 className="text-danger alert alert-danger space">
								Fail to edit '{values.success}' product.
								{values.error}
								<br />
							</h6>
						) : null}
						<form onSubmit={handleSubmit}>
							<div className="preview-1p">
								{preview ? (
									<img
										className="prodImg-1p"
										src={values.photoPreviewURL}
										alt="preview"
										style={{ width: '200px', height: '200px' }}
									></img>
								) : oldImage ? (
									showCurrentPhoto()
								) : (
									<img
										src={`${URL}/product/photo/${match.params.productId}?v=${counter}`}
										alt=""
										style={{ width: '200px', height: '200px' }}
										className="prodImg-1p"
									/>
								)}
							</div>
							<div {...getRootProps()}>
								<input {...getInputProps()}></input>
								{isDragActive ? (
									<p className="image-container-1p">
										<b>Drop the image here..</b>
									</p>
								) : (
									<p className="image-container-1p">
										<b>Drag & Drop</b> image here or <b>click</b> here
										to select image
									</p>
								)}
							</div>

							<div className="form-group">
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
									value={parseFloat(price).toFixed(2)}
									required
									min="1"
									step="0.1"
								/>
							</div>

							<div className="form-group">
								<label className="text-muted">Category</label>
								<select
									onChange={handleChange('category')}
									className="form-control"
									required
								>
									<option value="1" selected={category === 1}>
										Natural Soap
									</option>
									<option value="2" selected={category === 2}>
										Bath Tea
									</option>
									<option value="3" selected={category === 3}>
										Scrub
									</option>
									<option value="4" selected={category === 4}>
										Laundry Bar / Dish Bar
									</option>
									<option value="5" selected={category === 5}>
										Other
									</option>
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
									value={visibility}
									onChange={handleChange('visibility')}
									className="form-control"
									required
								>
									<option value="visible">Visible</option>
									<option value="invisible">Invisible</option>
								</select>
							</div>

							<button className="btn btn-dark">Edit Product</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(EditProduct);
