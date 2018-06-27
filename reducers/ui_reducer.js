import { OPEN_MODAL, CLOSE_MODAL, RECEIVE_TEXT } from '../actions/modal_actions';

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
        case RECEIVE_TEXT: 
            return Object(assign({}, state, { modal: "text" }))
        default: 
            return state;
    }
}

export default uiReducer;