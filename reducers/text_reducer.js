import { RECEIVE_TEXT, CLOSE_MODAL } from '../actions/modal_actions';

const textReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TEXT:
            return state.concat([action.text]);
        case CLOSE_MODAL: 
            return [];
        default:
            return state;
    }
}

export default textReducer;