import { combineReducers } from 'redux';
import neuralNetworksReducer from './neural_networks_reducer';


export default combineReducers({
    neuralNetworks: neuralNetworksReducer
});