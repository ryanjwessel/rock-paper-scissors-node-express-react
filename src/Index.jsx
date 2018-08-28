import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Store
import configureStore from './store/configureStore';
const store = configureStore();

// Components
import Choice from './components/Choice.jsx';
import GameBoard from './components/GameBoard.jsx';
import Scoreboard from './components/Scoreboard.jsx';

// Styles
import './styles/main.scss';

import {
	setPlayerChoice,
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
		const { playerChoice, gameHistory } = state;
		const choices = [ 'Rock', 'Paper', 'Scissors' ];

		const getGameResult = () => {
			if(gameHistory.hasOwnProperty('mostRecentResult')) {
				return gameHistory.mostRecentResult;
			} else {
				return '';
			}
		};
		
		return (
			<div className="container">
				<div className="d-flex flex-column justify-content-center align-items-center">
					<h1>Rock Paper Scissors!</h1>
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
					<GameBoard { ...this.props } gameResult={ getGameResult() } />
				</div>
				<div className="row justify-content-center align-items-center scoreboard-wrapper">
					<Scoreboard { ...this.props } />
				</div>
			</div>
		);
	}
}

App.propTypes = {
	state: PropTypes.object.isRequired,
	dispatch: PropTypes.object.isRequired,
};

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