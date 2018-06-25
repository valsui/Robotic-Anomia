import { combineReducers } from 'redux';
import neuralNetworksReducer from './neural_networks_reducer';
import testDataReducer from './test_data_reducer';
import outputsReducer from './outputs_reducer';

export default combineReducers({
    neuralNetworks: neuralNetworksReducer,
    testData: testDataReducer,
    outputs: outputsReducer
});