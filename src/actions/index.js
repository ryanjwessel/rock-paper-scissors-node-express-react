export const SET_PLAYER_CHOICE = 'SET_PLAYER_CHOICE';
export const REQUEST_COMPUTER_CHOICE = 'REQUEST_COMPUTER_CHOICE';
export const RECEIVE_COMPUTER_CHOICE = 'RECEIVE_COMPUTER_CHOICE';
export const UPDATE_GAME_HISTORY = 'UPDATE_GAME_HISTORY';

function sendGameHistoryToReducer(updatedHistory) {
	return {
		type: UPDATE_GAME_HISTORY,
		updatedHistory
	};
}

export function updateGameHistory() {
	return (dispatch, getState) => {
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
		// return fire.database().ref(portfolioType).once('value').then((returnedItems) => {
		dispatch(receiveComputerChoice(playerChoice));
		// });
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
