import {
	combineReducers
} from 'redux';
import {
	gameHistory,
	computerResponse,
	playerChoice,
	gameErrors,

} from './game';

const rootReducer = combineReducers({
	gameHistory,
	computerResponse,
	playerChoice,
	gameErrors,
});

export default rootReducer;