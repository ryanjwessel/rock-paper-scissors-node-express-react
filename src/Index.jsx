import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

// Store
import configureStore from './store/configureStore';
const store = configureStore();

// Components
import Choice from './components/Choice.jsx';

// Styles
import './styles/main.scss';

import {
	setPlayerChoice,
	startGame,
} from './actions';

class App extends Component {
	constructor(props) {
		super(props);

		this.selectWeapon = this.selectWeapon.bind(this);
	}

	selectWeapon(playerChoice) {
		const { dispatch } = this.props;

		dispatch(setPlayerChoice(playerChoice));
	}

	render() {
		const { state, dispatch } = this.props;
		const { playerChoice, computerResponse, gameErrors, gameHistory } = state;
		const choices = [ 'Rock', 'Paper', 'Scissors' ];

		const getGameResult = () => {
			if(gameHistory.hasOwnProperty(computerResponse.lastUpdated)) {
				return gameHistory[computerResponse.lastUpdated].result;
			} else {
				return '';
			}
		};

		const PlayButton = () => {
			const buttonCopy = (Object.keys(gameHistory).length > 0 || gameErrors !== '') ? 'Play Again?' : 'Play';

			return (
				<button
					type="button"
					className="btn btn-danger d-flex flex-column align-items-center"
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
		
		return (
			<div className="container">
				<div className="d-flex flex-column justify-content-center align-items-center">
					<h1>Rock Paper Scissors!</h1>
					<h2>Choose your weapon...</h2>
				</div>
				<div className="d-flex justify-content-center align-items-center player-choices-wrapper">
					{
						choices.map( item => {
							return (
								<Choice
									key={ item }
									name={ item }
									selectWeapon={ this.selectWeapon }
									currentSelection={ playerChoice === item }
								/>
							);
						})
					}
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center game-section-wrapper">
				
					{ gameErrors !== '' ? (
						<Fragment>
							<p>We&apos;re sorry, the Computer was not able to make a decision due to server issues.</p>
							<PlayButton />
						</Fragment>						
					) : (!computerResponse.isFetching) ? (
						<Fragment>
							{ computerResponse.choice !== '' &&
								<Fragment>
									<h2>The Computer chose</h2>
									<Choice
										name={ computerResponse.choice }
										viewOnly={ true }
									/>
									<h2>You { getGameResult() }!</h2>
								</Fragment>
							}
							<PlayButton />
						</Fragment>
					) : (
						<div className="loader" />
					) }

				</div>
				{ Object.keys(gameHistory).length > 0 &&
					<div className="d-flex flex-column justify-content-center align-items-center game-section-wrapper">
						<h2>Scoreboard</h2>

						{
							Object.keys(gameHistory).map(game => {
								<p>{ gameHistory[game].result }</p>;
							})
						}
					</div>
				}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		state,
	};
}

const RootHOCWrapper = connect(mapStateToProps)(App);

render(
	<Provider store={store}>
		<RootHOCWrapper />
	</Provider>,
	document.getElementById('root')
);