import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { throttle } from 'lodash';
import rootReducer from '../reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
	const persistedState = loadState();

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
		rootReducer,
		persistedState,
		composeEnhancers(
			applyMiddleware(thunk)
		)
	);

	store.subscribe(throttle(() => {
		saveState({
			computerResponse: store.getState().computerResponse,
			gameHistory: store.getState().gameHistory,
		});
	}, 1000));

	return store;
};

export default configureStore;