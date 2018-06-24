import { RECEIVE_NEURAL_NETWORK } from '../actions/neural_network_actions';
import net from '../javascripts/trained_net';

const initialState = {
    trainedNet: net
}

const neuralNetworksReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch ( action.type ) {
        case RECEIVE_NEURAL_NETWORK:
            return Object.assign({}, state, action.net);
        default:
            return state;
    }
}

export default neuralNetworksReducer;