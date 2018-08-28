import React from 'react';
import PropTypes from 'prop-types';

const Choice = ( props ) => {
	const {
		name,
		selectWeapon,
		currentSelection,
		viewOnly,
	} = props;

	if(viewOnly) {
		return (
			<div
				className='d-flex flex-column align-items-center justify-content-center computer-choice'
			>
				<img src={`images/${name}.png`} alt={`${name} icon`} />
				{ name }
			</div>
		);
	}
	
	return (
		<button
			type="button"
			className={`btn btn-outline-primary d-flex flex-column align-items-center ${currentSelection ? 'active' : ''}`}
			onClick={ () => {
				selectWeapon(name);
			}}
		>
			<img src={`images/${name}.png`} alt={`${name} icon`} />
			{ name }
		</button>
	);
};

Choice.propTypes = {
	name: PropTypes.string.isRequired,
	selectWeapon: PropTypes.func.isRequired,
	currentSelection: PropTypes.bool.isRequired,
	viewOnly: PropTypes.bool,
};

export default Choice;