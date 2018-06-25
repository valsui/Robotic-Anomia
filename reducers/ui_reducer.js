import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

const initialState = {
    modal: null
}

const uiReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch ( action.type ) {
        case OPEN_MODAL:
            return Object.assign({}, state, { modal: action.component });
        case CLOSE_MODAL: 
            return Object.assign({}, state, { modal: null });
        default: 
            return state;
    }
}

export default uiReducer;