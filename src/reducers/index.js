import {
	combineReducers
} from 'redux';
import {
	gameHistory,
	computerResponse,
	playerChoice,

} from './game';

const rootReducer = combineReducers({
	gameHistory,
	computerResponse,
	playerChoice,
});

export default rootReducer;