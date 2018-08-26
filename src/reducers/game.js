import {
	REQUEST_COMPUTER_CHOICE,
	RECEIVE_COMPUTER_CHOICE,
	UPDATE_GAME_HISTORY,
	SET_PLAYER_CHOICE,
} from '../actions';

const initialState = {
	computerResponse: {
		isFetching: false,
		choice: '',
	},
	gameHistory: [],
	playerChoice: '',
};

export function gameHistory(state = initialState.gameHistory, action) {
	switch (action.type) {
	case UPDATE_GAME_HISTORY:
		return action.history;
	default:
		return state;
	}
}

export function computerResponse(state = initialState.computerResponse, action) {
	switch (action.type) {
	case REQUEST_COMPUTER_CHOICE:
		return Object.assign({}, state, {
			isFetching: true,
		});
	case RECEIVE_COMPUTER_CHOICE:
		return Object.assign({}, state, {
			isFetching: false,
			choice: action.choice,
			lastUpdated: action.receivedAt
		});
	default:
		return state;
	}
}

export function playerChoice(state = initialState.playerChoice, action) {
	switch(action.type) {
	case SET_PLAYER_CHOICE:
		return action.choice;
	default:
		return state;
	}
}
