import React from 'react';
import PropTypes from 'prop-types';

const Choice = ( props ) => {
	const {
		name,
		selectWeapon,
		currentSelection,
	} = props;

	return (
		<button
			type="button"
			className={`btn btn-outline-secondary d-flex flex-column align-items-center ${currentSelection ? 'active' : ''}`}
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
};

export default Choice;