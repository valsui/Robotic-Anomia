import rootReducer from '../reducers/root_reducer';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, applyMiddleware(logger))
};

export default configureStore;