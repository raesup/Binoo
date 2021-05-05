import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import './Spinner.css';

const Spinner = props => {
	return (
		<div className="spinner">
			<CircleLoader loading={props.loading} color="#36D7B7" size={200} />
		</div>
	);
};

export default Spinner;
