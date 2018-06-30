import { OPEN_MODAL, CLOSE_MODAL, RECEIVE_TEXT } from '../actions/modal_actions';
import { SELECT_TRAINED_NETWORK, SELECT_NEW_NETWORK, RESET_CURRENT_NETWORK } from '../actions/neural_network_actions';

const initialState = {
    modal: null,
    currentNetwork: null
}

const uiReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch ( action.type ) {
        case OPEN_MODAL:
            return Object.assign({}, state, { modal: action.component });
        case CLOSE_MODAL: 
            return Object.assign({}, state, { modal: null });
        case RECEIVE_TEXT: 
            return Object.assign({}, state, { modal: "text" })
        case SELECT_TRAINED_NETWORK:
            return Object.assign({}, state, { currentNetwork: "trainedNet" });
        case SELECT_NEW_NETWORK: 
            return Object.assign({}, state, { currentNetwork: "dumbNet" });
        case RESET_CURRENT_NETWORK:
            return Object.assign({}, state, { currentNetwork: null });
        default: 
            return state;
    }
}

export default uiReducer;