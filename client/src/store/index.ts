import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reduxThunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import shift from './reducers/shift';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  shift
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk, promiseMiddleware))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;