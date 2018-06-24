import { RECEIVE_NEURAL_NETWORK } from '../actions/neural_network_actions';
import net from '../javascripts/trained_net';


// On intialization, it will create a neural network object called "trainedNet" users can access this trainedNet to run test on whether or not their canvas is recognizable.
// Users should not be able modify the training data in this neural network.  

const initialState = {
    trainedNet: net,
    dumbNet: null
}

const neuralNetworksReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch ( action.type ) {
        case RECEIVE_NEURAL_NETWORK:
        // Returns an the untrained neural network as "dumbNet"  Whenever users add training data to dumbNet, you should pull dumbNet from the store, do something like 'dumbNet.train(data)' and then dispatch the new dumbNet back into this reducer.
            return Object.assign({}, state, { dumbNet: action.net });
        default:
            return state;
    }
}

export default neuralNetworksReducer;