import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Components
import Choice from './Choice.jsx';
import PlayButton from './PlayButton.jsx';

const GameBoard = (props) => {
	const {
		state: {
			gameErrors,
			gameHistory,
			computerResponse,
		},
		gameResult,
	} = props;

	if(gameErrors !== '') {
		return (
			<Fragment>
				<div className="col-12 game-error">
					<p className="alert alert-danger">We&apos;re sorry, the Computer was not able to make a decision due to server issues.</p>
				</div>
				<PlayButton { ...props } />
			</Fragment>	
		);
	} else if(!computerResponse.isFetching) {
		return (
			<Fragment>
				{ (computerResponse.choice !== '' && gameHistory.mostRecentResult !== '') ? (
					<div className="col-12 text-center">
						<h2>The Computer Chose</h2>
						<Choice
							name={ computerResponse.choice }
							viewOnly={ true }
						/>
						<h2>You <span style={ { textTransform: 'capitalize' } }>{ gameResult }</span>!</h2>
					</div>
				) : (
					<div className="col-12 text-center game-intro-copy">
						<h2>Choose Your Weapon...</h2>
						<h2>Then Press Play.</h2>
					</div>
				)}
				<div className="col-12 text-center">
					<PlayButton { ...props } />
				</div>
			</Fragment>
		);
	}

	return (
		<div className="loader" />
	);
};

GameBoard.propTypes = {
	state: PropTypes.object.isRequired,
	gameResult: PropTypes.string.isRequired,
};

export default GameBoard;
