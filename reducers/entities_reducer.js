import { combineReducers } from 'redux';
import neuralNetworksReducer from './neural_networks_reducer';
import testDataReducer from './test_data_reducer';

export default combineReducers({
    neuralNetworks: neuralNetworksReducer,
    testData: testDataReducer
});