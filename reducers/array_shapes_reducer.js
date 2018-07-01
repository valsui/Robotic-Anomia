import { RECEIVE_ARRAY_SHAPES, RESET_OUTPUT_DATA } from '../actions/test_data_actions';


const arrayShapesReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ARRAY_SHAPES:
            return action.data;
        case RESET_OUTPUT_DATA:
            return [];
        default:
            return state;
    }
}

export default arrayShapesReducer;