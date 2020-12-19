import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import history from './history';
import rootReducers from './reducers';

const middleware = [routerMiddleware(history), thunk];

const store = createStore(
	rootReducers,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;