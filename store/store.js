import rootReducer from '../reducers/root_reducer';
import logger from 'redux-logger';
import { createStore } from 'redux';

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState)
};

export default configureStore;