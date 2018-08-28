import 'whatwg-fetch';

export const SET_PLAYER_CHOICE = 'SET_PLAYER_CHOICE';
export const REQUEST_COMPUTER_CHOICE = 'REQUEST_COMPUTER_CHOICE';
export const RECEIVE_COMPUTER_CHOICE = 'RECEIVE_COMPUTER_CHOICE';
export const UPDATE_GAME_HISTORY = 'UPDATE_GAME_HISTORY';
export const UPDATE_GAME_ERROR = 'UPDATE_GAME_ERROR';

export function updateGameError(error) {
	return {
		type: UPDATE_GAME_ERROR,
		error,
	};
}

function sendGameHistoryToReducer(history) {
	return {
		type: UPDATE_GAME_HISTORY,
		history
	};
}

function updateGameHistory(gameResult) {
	return (dispatch, getState) => {
		// Here is where I push the most recent result onto the array of games in the history, and perhaps provide a unique identifier for each?
		const state = getState();
		
		const updatedHistory = {
			...state.gameHistory,
			[ state.computerResponse.lastUpdated ]: gameResult,
		};

		dispatch(sendGameHistoryToReducer((updatedHistory)));
	};
}

function requestComputerChoice() {
	return {
		type: REQUEST_COMPUTER_CHOICE
	};
}

function receiveComputerChoice(choice) {
	return {
		type: RECEIVE_COMPUTER_CHOICE,
		choice,
		receivedAt: Date.now()
	};
}

export function startGame(playerChoice) {
	return dispatch => {
		dispatch(requestComputerChoice());
		dispatch(updateGameError('')); // Reset game errors so UI reflects new game attempt.
		
		fetch('/match', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({choice:playerChoice.toLowerCase()}),
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((gameResult) => {
				dispatch(receiveComputerChoice(gameResult.computerChoice));
				dispatch(updateGameHistory(gameResult));
			})
			.catch((error) => {
				dispatch(updateGameError(error));
			});
	};
}

function sendPlayerChoiceToReducer(choice) {
	return {
		type: SET_PLAYER_CHOICE,
		choice,
	};
}

export function setPlayerChoice(choice) {
	return (dispatch, getState) => {
		const state = getState();

		// If the user clicks the same button again then remove that choice.
		const updatedChoice = (state.playerChoice !== choice) ? choice : '';

		dispatch(sendPlayerChoiceToReducer(updatedChoice));
	};
}
