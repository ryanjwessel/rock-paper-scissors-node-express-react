import React, { Component } from 'react';
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
	// startGame,
	// updateGameHistory,
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
		const { state } = this.props;
		const { playerChoice } = state;
		const choices = [ 'Rock', 'Paper', 'Scissors' ];

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
					<button
						type="button"
						className="btn btn-warning d-flex flex-column align-items-center"
						disabled={ playerChoice === '' }
						onClick={() => {

						}}
					>
						<img src="images/Play.png" alt="Press button to play against the computer." />
						Play
					</button>
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