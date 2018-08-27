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
		const { playerChoice } = state;
		const choices = [ 'Rock', 'Paper', 'Scissors' ];

		const PlayButton = () => {
			return (
				<button
					type="button"
					className="btn btn-warning d-flex flex-column align-items-center"
					disabled={ playerChoice === '' }
					onClick={() => {
						dispatch(startGame(playerChoice));
					}}
				>
					<img src="images/Play.png" alt="Press button to play against the computer." />
					Play
				</button>
			);
		};
		
		return (
			<div className="container">
				<div className="row justify-content-center text-center">
					<div className="col">
						<h1>Rock Paper Scissors!</h1>
						<h2>Choose your weapon...</h2>
					</div>
				</div>
				<div className="row justify-content-center text-center player-choices-wrapper">
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
				<div className="row justify-content-center play-button-wrapper">
				
					{ state.gameErrors !== '' ? (
						<Fragment>
							<p>We&apos;re sorry, the Computer was not able to make a decision due to server issues.</p>
							<PlayButton />
						</Fragment>						
					) : (!state.computerResponse.isFetching) ? (
						<Fragment>
							{ state.computerResponse.choice !== '' &&
								<div className="col-12">
									<p>The Computer chose</p>
									<Choice
										name={ state.computerResponse.choice }
										viewOnly={ true }
									/>
								</div>
							}
							<div className="col-12">
								<PlayButton />
							</div>
						</Fragment>
					) : (
						<div className="loader" />
					) }

				</div>
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