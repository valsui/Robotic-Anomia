import { RECEIVE_OUTPUT_DATA } from '../actions/test_data_actions';


const outputsReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_OUTPUT_DATA:
            return [].concat(action.data);
        default:
            return state;
    }
}

export default outputsReducer;