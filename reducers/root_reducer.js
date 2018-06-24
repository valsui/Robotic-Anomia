import { combineReducers } from 'redux';
import entitiesReducer from './entities_reducer';

export default combineReducers({
    entities: entitiesReducer
})