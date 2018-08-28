import React from 'react';
import PropTypes from 'prop-types';

import {
	startGame,
} from '../actions';

const PlayButton = (props) => {
	const {
		state: {
			playerChoice,
			gameHistory,
			gameErrors,
		},
		dispatch,
	} = props;

	const buttonCopy = (gameHistory.mostRecentResult !== '' || gameErrors !== '') ? 'Play Again?' : 'Play';

	return (
		<button
			type="button"
			className="btn btn-danger d-flex flex-column align-items-center mx-auto"
			disabled={ playerChoice === '' }
			onClick={() => {
				dispatch(startGame(playerChoice));
			}}
		>
			<img src="images/Play.png" alt="Press button to play against the computer." />
			{ buttonCopy }
		</button>
	);
};

PlayButton.propTypes = {
	state: PropTypes.object.isRequired,
	dispatch: PropTypes.object.isRequired,
	startGame: PropTypes.func.isRequired,
};

export default PlayButton;