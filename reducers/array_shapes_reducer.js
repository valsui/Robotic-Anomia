import { RECEIVE_ARRAY_SHAPES } from '../actions/test_data_actions';


const arrayShapesReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ARRAY_SHAPES:
            return action.data;
        default:
            return state;
    }
}

export default arrayShapesReducer;