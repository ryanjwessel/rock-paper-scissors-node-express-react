import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
	clearGameHistory,
} from '../actions';

const Scoreboard = (props) => {
	const {
		state: {
			gameHistory,
		},
		dispatch,
	} = props;

	return (
		<Fragment>
			<div className="col-12 text-center">
				<h2>Scoreboard</h2>
			</div>
			<div className="col-6 text-center">
				<p>Player Score:</p>
			</div>
			<div className="col-6 text-center">
				<p>Computer Score:</p>
			</div>
			<div className="col-6 text-center">
				<p>{ gameHistory.playerScore }</p>
			</div>
			<div className="col-6 text-center">
				<p>{ gameHistory.computerScore }</p>
			</div>
			<button
				type="button"
				className="btn btn-outline-danger reset-button"
				onClick={() => {
					dispatch(clearGameHistory());
				}}
			>
				Reset Scoreboard
			</button>
		</Fragment>
	);
};

Scoreboard.propTypes = {
	state: PropTypes.object.isRequired,
	dispatch: PropTypes.object.isRequired,
};

export default Scoreboard;
